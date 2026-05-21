# Auth guards

Every command and query has an `authGuard` field. Auth in HartAgency is two-stage: `resolve` runs async to load any domain data needed for the decision, then `authorize` runs sync and pure to produce the allow-or-deny result. The shape lives in [`app/backend/src/app/authGuard.ts`](../../../../app/backend/src/app/authGuard.ts).

→ Skeleton for resolve-with-dependencies: [`templates.md#10-new-auth-guard-with-resolve-dependencies`](../templates.md#10-new-auth-guard-with-resolve-dependencies).

## The core types

```ts
type AuthGuardResult =
  | { result: "allow" }
  | { result: "deny"; status: 401 | 403; message: string };

type AuthGuard<
  Dependencies = void,
  Result extends AuthGuardResult = AuthGuardResult,
> = {
  resolve: (v: {
    auth: AuthContext;
    req: Request;
    projections: Projections;
  }) => Promise<Dependencies>;
  authorize: (v: { auth: AuthContext; dependencies: Dependencies }) => Result;
};
```

**`Result` is the actual narrow return type of your `authorize` function**, not the wide `AuthGuardResult` union. The handler then sees `Extract<Result, {result: "allow"}>` as its `auth` parameter — including any custom fields you returned on the allow branch.

## `AuthContext` and privileges

`resolveAuth` produces an `AuthContext` for every request:

```ts
type AuthContext = {
  actor: Actor;
  privileges: Privilege[]; // derived from the actor's roles
};
type Actor =
  | { type: "Anonymous" }
  | { type: "User"; userId: Id<User>; impersonatedBy?: Id<User> }
  | { type: "System" };
```

**Always check `actor.type` first.** Accessing `auth.actor.userId` on an anonymous actor is a TypeScript error — the union narrowing is what protects you.

**Authorize on privileges, not roles.** Privileges (`"ManageOrgs"`, `"ManageOperators"`, `"AssumeRole"`, etc.) are the public capability surface. Roles (`"Operator"`, `"Developer"`, ...) are the assignment mechanism that maps to privileges. If a new endpoint needs a new capability, add a new privilege in `domain/auth/privileges.ts` rather than checking a role directly.

## The three canonical patterns

### 1. Public — anyone can call

The simplest case. Used by [`whoAmI`](../../../../app/backend/src/domain/auth/query/whoAmI.ts), `signIn`, `requestPasswordReset`, etc.

```ts
const authorize: AuthResolver = () => ({ result: "allow" });
type Result = ReturnType<typeof authorize>;
```

`AuthResolver` is the typed shape of the synchronous `authorize` stage; the annotation removes the need for per-return `as const`. The handler receives `auth: {result: "allow"}` — no extra info. The handler then does whatever check it needs (often: branch on `actor.type` to differentiate anonymous from signed-in callers).

### 2. Signed-in user with privilege

The most common pattern. Three branches in order: not authenticated → 401; authenticated but lacks privilege → 403; authenticated with privilege → allow + `userId` hoisted to the handler.

→ Full example in [`templates.md#1-new-command-api-controller`](../templates.md#1-new-command-api-controller) (the `createOrg` reference). The order matters — return 401 before 403 (otherwise anonymous callers leak that the privilege exists).

The `userId` field on the allow branch is a convenience: instead of re-checking `auth.actor.type === "User"` inside the handler, the guard passes it down already typed. The handler reads `auth.userId` directly.

### 3. Resource ownership (uses `resolve`)

When the authorization decision depends on a domain fact (e.g. "is this user a member of the org?"), do the fetch in `resolve` and the decision in `authorize`. **There is no canonical example in the current HartAgency codebase** — every existing controller has `resolve: async () => {}`. The template form is in [`templates.md#10-new-auth-guard-with-resolve-dependencies`](../templates.md#10-new-auth-guard-with-resolve-dependencies).

Two things to notice when you ship the first one:

- **`resolve` is currently passed the raw express `req`, not the decoded payload.** The framework already decoded `req.body` against the endpoint schema before `resolve` runs (a decode failure short-circuits to 400, so `resolve` never sees malformed bodies), but the decoded `payload` is only handed to the handler. Read what you need off `req.body` — the values match the schema, they're just not statically typed in this scope. The endpoint framework is expected to pass an already-validated payload to `resolve` in the future; when that lands, switch `resolve`'s signature to consume the typed payload directly.
- **`CommandController` becomes four-parameterized** — `<Req, Res, Result, Deps>` instead of the default three. The `Deps` slot is the return type of `resolve`.

## Cross-cutting rules

> The `AuthResolver` type alias is the recommended shape for new auth guards. Existing files may still use the older `() => ({...}) as const` form during migration — both compile, and the rule below tells you which to reach for.

### When to annotate with `AuthResolver` vs. when to use `as const`

Two cases, decided by what the allow branch returns:

- **Allow branch carries no extra fields → annotate with `: AuthResolver`.** The contextual type from the annotation keeps the discriminants (`"allow"`, `"deny"`, `401`, `403`) narrow without `as const`. Example:
  ```ts
  const authorize: AuthResolver = () => ({ result: "allow" });
  ```
- **Allow branch hoists fields to the handler (e.g. `userId`, `actor`) → keep `as const`.** The annotation widens `ReturnType<typeof authorize>` to `AuthGuardResult`, which has no `userId`/`actor`. `as const` lets the inferred return type preserve those fields so the handler can read them. Example:
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
  ```

### `type Result = ReturnType<typeof authorize>` is the right way to derive the type

Don't write the type by hand. The whole point of the pattern is that the handler's view of `auth` is **automatically** the narrow allow-branch, including any custom fields you decided to attach.

### Don't put data fetching in `authorize`

`authorize` is synchronous and pure. If you need to read from a projection, put it in `resolve`. The split is what lets the framework batch / cache / optimize the auth path later if needed.

### Match `actor.type` before accessing actor-typed fields

`auth.actor.userId` only exists on `{type: "User"}`. Without narrowing the union, TypeScript flags it.

### Pick the right HTTP status

- **401 Unauthorized** — caller is anonymous (or otherwise can't be authenticated). The right move is "log in and try again".
- **403 Forbidden** — caller is authenticated but lacks the privilege or relationship to the resource. The right move is "ask an admin".
- **404 Not Found** is reserved for the handler; never returned by the auth guard. (You may convert a 403 to a 404 inside the handler to avoid leaking resource existence — that's a downstream choice.)

## How privilege denies look in the handler

The handler never sees a denied auth result — by the time the handler runs, the framework has already converted any `{result: "deny", ...}` to an HTTP response and short-circuited the chain. The handler's `auth` parameter is `Extract<Result, {result: "allow"}>`, which TypeScript knows is the allow branch.

This is why payload-carrying allow branches keep `as const` — without it, the type system loses the custom fields the handler relies on.

## Privileges vs roles

`domain/auth/privileges.ts` exports the `Privilege` union and the mapping from roles to privileges. A `System` actor has all privileges by default (rights-amplified internal operations). `User` actors get the union of privileges from their assigned roles.

To add a new privilege:

1. Add the literal to the `Privilege` type.
2. Update the role-to-privilege map so existing roles get the new privilege as appropriate.
3. Use `auth.privileges.includes("MyNewPrivilege")` in the auth guard.

## Common mistakes

- **Annotating a payload-carrying handler with `: AuthResolver`** — the annotation widens the return type and erases the custom allow-branch fields. Use `as const` whenever the allow branch hoists `userId`, `actor`, or any other field.
- **Checking roles instead of privileges** — couples the endpoint to the role-vocabulary, which can change.
- **Returning 403 before 401** — leaks that the privilege exists to anonymous callers. 401 first.
- **Making `authorize` async** — it's sync by design; any async work should be done in `resolve`.
- **Accessing `auth.actor.userId` without narrowing `auth.actor.type === "User"`** — TypeScript will flag it.

## Quality gates specific to auth

- [ ] If the allow branch hoists fields, every return literal ends with `as const`. Otherwise the function is annotated `const authorize: AuthResolver = ...`.
- [ ] `type Result = ReturnType<typeof authorize>` is declared.
- [ ] Order of branches in `authorize`: 401 (anonymous) → 403 (insufficient privilege / missing relationship) → allow.
- [ ] Capability checks use `auth.privileges.includes(...)`, not roles.
- [ ] If `resolve` is non-empty, the controller declares the four-parameter form `CommandController<Req, Res, Result, Dependencies>` (or the matching query variant).
- [ ] No data fetching in `authorize`.
