# Commands

A command is a backend endpoint that **writes events**. It runs inside a serializable Postgres transaction, has access to `withEventStore` for reading aggregates and emitting events, and may also read projections via the `projections` parameter. Canonical example: [`app/backend/src/domain/org/command/createOrg.ts`](../../../../app/backend/src/domain/org/command/createOrg.ts) plus its sibling `.api.ts`.

→ Skeleton: [`templates.md#1-new-command-api-controller`](../templates.md#1-new-command-api-controller).

## The two-file shape

Every command is two files. The `.api.ts` is client-safe (imported by mobile and frontend); the controller is server-only.

- **`<name>.api.ts`** — `endpoint` + request/response schemas. Schema-only imports — no DB, no event store, no `Services`. `Command` and `CommandResponse` are _derived_ from the endpoint schemas via `s.Infer`. Don't write parallel TypeScript interfaces; they will drift.
- **`<name>.ts`** — controller. Three exports: `authorize` (sometimes `resolve` too), `handler`, and the `controller` const that bundles them.

File path drives the URL and registry key — see [`conventions.md`](../conventions.md#naming--path-conventions).

## `CommandController<Req, Res, Result, Deps>`

```ts
type CommandController<
  Req,
  Res,
  Result extends AuthGuardResult = AuthGuardResult,
  Deps = void,
> = {
  endpoint: PlainEndpoint<Req, Res>;
  authGuard: AuthGuard<Deps, Result>;
  handler: CommandHandler<Req, Res, Result>;
};
```

- **`Req`** / **`Res`** — inferred from `endpoint.request`/`endpoint.response`.
- **`Result`** — the narrow return type of `authorize`. The handler receives `Extract<Result, {result: "allow"}>` as its `auth` parameter, so the handler is statically guaranteed not to run on a denied path. When the allow branch carries custom fields (e.g. `userId`), `as const` on every return literal is what keeps those fields visible to the handler. See [`auth.md`](./auth.md) for the full rule.
- **`Deps`** — what `authGuard.resolve` returns. Defaults to `void` when `resolve` is the empty async function.

## The `authorize` shape

Public (allow branch carries no extra fields → annotate with `AuthResolver`):

```ts
const authorize: AuthResolver = () => ({ result: "allow" });
type Result = ReturnType<typeof authorize>;
```

Privilege-gated, allow branch hoists `userId` (from [`createOrg.ts`](../../../../app/backend/src/domain/org/command/createOrg.ts)) — keep `as const` so the `userId` field survives:

```ts
const authorize = ({ auth }: { auth: AuthContext }) => {
  if (auth.actor.type !== "User")
    return {
      result: "deny",
      status: 401,
      message: "Authentication required",
    } as const;
  if (auth.privileges.includes("ManageOrgs"))
    return { result: "allow", userId: auth.actor.userId } as const;
  return {
    result: "deny",
    status: 403,
    message: "Requires ManageOrgs privilege",
  } as const;
};
type Result = ReturnType<typeof authorize>;
```

Rules:

- **Allow branch with no extras → `: AuthResolver` annotation.** Contextual typing keeps the discriminants narrow without `as const`.
- **Allow branch hoists fields (`userId`, `actor`) → keep `as const`** on every return literal. The annotation would widen `ReturnType<typeof authorize>` to `AuthGuardResult` and erase the extra fields.
- The **`type Result = ReturnType<typeof authorize>`** line is how the controller picks up the exact shape, including any custom fields returned on the allow branch.
- Use **`auth.privileges`**, not raw roles. Privileges are the public API; roles are an implementation detail in `domain/auth/privileges.ts`.

Custom allow fields are useful when the handler needs information the guard already computed (most commonly: `userId`). For the deep dive on resolving dependencies in `resolve`, see [`auth.md`](./auth.md).

## Pre-store validation (fail fast)

Anything checkable without a database round-trip should fail before opening the event-store transaction:

```ts
if (payload.name.trim().length === 0) {
  return Future.reject(
    json({
      status: 400,
      content: { error: { message: "Name cannot be empty" } },
    }),
  );
}
```

This avoids a useless serializable transaction for clearly invalid input.

## Inside `withEventStore`

The second argument is a synchronous generator. The first argument is an error mapper:

```ts
return withEventStore(
  err => err instanceof InvalidReservationError
    ? json({ status: 409, content: { error: { message: err.message } } })
    : json({ status: 500, content: { error: { message: err.message } } }),
  function* (store) {
    const agg = yield* store.try_find(Org, payload.orgId);
    if (agg == null) throw new InvalidReservationError("Org not found");
    yield* store.emit({ aggregate: Org, event: new OrgRenamed({ ... }) });
    return { ok: true };
  },
);
```

- **Error mapper** — `instanceof` on typed `Error` subclasses to map specific domain errors to specific HTTP statuses (typically 409 for conflicts, 404 for not-found, 422 for validation that needed the DB). The fallback maps to 500.
- **Generator** — runs as a single Postgres `Serializable` transaction. Operations: `find`, `try_find`, `emit`, `doesEventAlreadyExist`. See [`domain.md#the-evaluate-generator-pattern`](./domain.md#the-evaluate-generator-pattern).

## Error patterns

| Error                                     | Where to handle                                                               | HTTP status          |
| ----------------------------------------- | ----------------------------------------------------------------------------- | -------------------- |
| Bad request shape (decode failed)         | Framework rejects with 400 automatically                                      | 400                  |
| Pre-store validation (empty name, etc.)   | `Future.reject(json({ status: 400, ... }))` before opening `withEventStore`   | 400                  |
| Domain rule violation (uniqueness, state) | Throw a typed `Error` subclass inside the generator; map in the error handler | typically 409 or 422 |
| Auth denied                               | Return `{result: "deny", status, message}` from `authorize`                   | 401 or 403           |
| Unexpected exception                      | Untyped throw → fallback in the error mapper                                  | 500                  |

Typed error class shape:

```ts
class EmailAlreadyAssignedError extends Error {
  constructor(email: string) {
    super(`Email ${email} is already assigned`);
    this.name = "EmailAlreadyAssignedError";
  }
}
```

The `this.name = "..."` is important for production logs — without it, every domain error shows up as `Error` in stack traces.

## Multi-aggregate transactions

`evaluate` runs a single Postgres `Serializable` transaction. Multiple `emit` calls in one generator all commit together, or none do:

```ts
yield* store.emit({ aggregate: Org, event: new OrgCreated({ ... }) });
yield* store.emit({ aggregate: UniqueOrgName, event: new UniqueOrgNameReassigned({ ... }) });
yield* store.emit({ aggregate: UniqueOrgSlug, event: new UniqueOrgSlugReassigned({ ... }) });
```

If the second or third emit fails (e.g. a concurrent transaction won the slug), the first commit rolls back. This is how the codebase enforces "create org and claim name+slug" as atomic.

## Reads inside a command

- **Aggregates from the event store** — `yield* store.try_find(Agg, id)` inside the generator. Sees uncommitted writes from earlier `emit` calls in the same generator.
- **Projections** — `projections[RepoX.collectionName]` _outside_ the generator (i.e., before the `withEventStore` call). Projection reads aren't in the transaction.

Don't read your own write from a projection inside the same command. The projection lags the event store by milliseconds (or longer under load). If the data was written in this transaction, read it from `store`.

## Common variations

- **Command that doesn't emit events.** Rare but legitimate — e.g. an OAuth-callback that exchanges a code for a token. Skip the `withEventStore` call entirely and `return Future.of({ ... })`. If the operation is read-only AND needs event-store access, see the `mobileMe` pattern in [`queries.md`](./queries.md).
- **Command that needs projection data for auth.** Move the projection read into `authGuard.resolve` — see [`auth.md`](./auth.md). The handler then sees the resolved data via `auth.<customField>`.
- **Command that returns nothing.** Every endpoint returns _something_ — `{ success: true }` is the lazy default and is fine.

## Registration touch-points

→ See [`templates.md#1-new-command-api-controller`](../templates.md#1-new-command-api-controller) "Also do this" footer for the exact lines. Summary: `api.ts` (endpoint key under `command:`), `index.ts` (controller key under `implementation.command`), `app/events.ts` if new event classes were emitted.

## Quality gates specific to commands

- [ ] If the allow branch hoists fields, every `authorize` return literal ends with `as const`. Otherwise the function is annotated `const authorize: AuthResolver = ...`.
- [ ] `type Result = ReturnType<typeof authorize>` is declared and used as the third generic parameter on `CommandController` and `CommandHandler`.
- [ ] Domain errors are typed and mapped in the error mapper passed to `withEventStore`.
- [ ] Pre-store validation lives outside `withEventStore`.
- [ ] Multi-aggregate writes all live in one `evaluate` call (atomic).
- [ ] If the command emits a new event class, it's registered in `src/app/events.ts`.
- [ ] Endpoint registered in both `api.ts` and `index.ts` `implementation`.
