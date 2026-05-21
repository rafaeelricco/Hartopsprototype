# Backend conventions

The one-page reference for HartAgency's backend. Mental model, naming rules, handler signatures, and the registration cheat sheet — everything that's true across the whole codebase. Per-topic depth lives under [`reference/`](./reference/); copy-paste skeletons live in [`templates.md`](./templates.md).

## Mental model: event-sourced CQRS

- The **event store** (Postgres, append-only) is the source of truth. Every business fact is an event row keyed by aggregate id + version.
- **Projections** (MongoDB collections) are derived read views. They're eventually consistent — a write goes to Postgres first, then **Ambar** delivers the event to a projection handler that updates Mongo.
- **Commands** write events (they don't touch projections directly). **Queries** read projections (they don't touch the event store). **Reactions** trigger side effects (email, S3, third-party APIs) when events fire.
- Reads are fast and rich (Mongo) but lag behind writes by milliseconds. Don't read your own write inside the same command — read the aggregate from the event store instead.

This is the most important shape to internalize. Everything below follows from it.

## Layer map

```
app/backend/src/
├── api.ts                  ← Central endpoint registry (frontend + mobile import this)
├── index.ts                ← Bootstrap: consumers, implementation, defineAPI, startup seed
├── app/                    ← Cross-cutting infrastructure
│   ├── handleGuardedEndpoint.ts   ← CommandController / QueryController types + dispatch
│   ├── handleProjection.ts        ← Projection dispatch
│   ├── handleReaction.ts          ← Reaction dispatch
│   ├── endpoint.ts                ← PlainEndpoint class (path + method + schemas)
│   ├── authGuard.ts               ← AuthGuardResult + AuthGuard types
│   ├── resolveAuth.ts             ← AuthContext (actor + privileges)
│   ├── events.ts                  ← Event class registry — MUST add new event classes here
│   ├── projections.ts             ← Projection-repo registry — MUST wire new Repos here
│   ├── integrations.ts            ← Services + Postgres + Mongo bootstrap
│   ├── environment.ts             ← envDecoder
│   ├── projectionStore.ts         ← MongoProjectionStore + Repository + Collection
│   ├── infrastructure.ts          ← Raw Express routes (file storage, email send, Qdrant)
│   ├── types.ts                   ← Email, PhoneNumber, Url value types
│   ├── actor.ts                   ← Actor schema + types
│   └── services/                  ← Service classes (email, file-storage, ...)
├── domain/<area>/          ← Business logic by area (auth, user, org, ...)
│   ├── aggregate/
│   ├── events/<aggregateName>/
│   ├── command/
│   ├── query/
│   ├── projection/
│   └── reaction/
└── lib/                    ← Generic primitives — touch sparingly
    ├── eventSourcing/
    │   ├── server.ts              ← Consumers, defineConsumers, defineAPI, Implementation
    │   ├── store.ts               ← Schemas, CSchema, TSchema, evaluate generator
    │   ├── event.ts               ← Aggregate, CreationEvent, TransformationEvent, Id
    │   └── projection.ts          ← accept([...]) decoder helper
    ├── postgres.ts
    ├── mongo.ts
    ├── ambar.ts                   ← AmbarResponse, ErrorMustRetry
    └── Logger.ts
```

Anything that's HartAgency-business-rules goes under `domain/<area>/`. Anything generic enough to belong in a different project goes under `lib/`. The `app/` layer is the glue.

## Naming + path conventions

| Concept              | File path                                                       | URL / collection / key                                                                                     |
| -------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Command (`.api.ts`)  | `src/domain/<area>/command/<verbAndNoun>.api.ts`                | URL: `/api/v1/<area>/command/<kebab-name>` (POST). Registry key: `<area>_<verbAndNoun>`.                   |
| Command (controller) | `src/domain/<area>/command/<verbAndNoun>.ts`                    | Same registry key as above.                                                                                |
| Query (`.api.ts`)    | `src/domain/<area>/query/<verbAndNoun>.api.ts`                  | URL: `/api/v1/<area>/query/<kebab-name>` (POST). Registry key: `<area>_query_<noun>`.                      |
| Query (controller)   | `src/domain/<area>/query/<verbAndNoun>.ts`                      | Same registry key as above.                                                                                |
| Aggregate            | `src/domain/<area>/aggregate/<name>.ts`                         | `static readonly type = "<PascalName>"` — globally unique.                                                 |
| Event                | `src/domain/<area>/events/<aggregateName>/<verbedPastTense>.ts` | `type = "<PastTensePascalName>"` — globally unique.                                                        |
| Projection           | `src/domain/<area>/projection/<plural>.ts`                      | URL: `/api/v1/<area>/projection/<plural>`. Repo class `Repo<Plural>`; `collectionName: "<Area>_<Plural>"`. |
| Reaction             | `src/domain/<area>/reaction/<name>.ts`                          | URL: `/api/v1/<area>/reaction/<kebab-name>`.                                                               |
| Auth-guard helper    | `src/domain/<area>/lib/<helperName>.ts` (when shared)           | n/a                                                                                                        |
| Service              | `src/app/services/<name>.ts`                                    | n/a                                                                                                        |
| Env var              | `src/app/environment.ts` (single source)                        | `process.env.MY_VAR` → typed `env.MY_VAR`.                                                                 |

URL paths use **kebab-case** (e.g. `/api/v1/auth/command/sign-in`). Registry keys in `api.ts` use **snake_case** prefix + camelCase suffix (e.g. `auth_signIn`, `org_query_listOrgs`). The mismatch is intentional — URLs go in headers and logs (kebab reads better there), registry keys go in TypeScript code (camel reads better there).

## The four handler signatures

Every controller in the backend is one of four shapes. Memorize these.

### `CommandHandler<Req, Res, Result>` — writes events

```ts
const handler: CommandHandler<Req, Res, Result> = ({
  actor, // Actor (User | Anonymous | System) from resolveAuth
  payload, // Decoded request body, typed as Req
  auth, // Extract<Result, {result: "allow"}> — the narrow allow-branch from authorize
  req, // express.Request — use sparingly; prefer payload + auth + projections
  projections, // Projections — read access to all MongoDB repos
  services, // Services — external integrations (email, fileStorage, vectorDatabase)
  withEventStore, // WithEventStore — opens a serializable Postgres transaction for the generator
}) => Future<Response, Res>;
```

Commands use `withEventStore(onError, function*(s) { ... })` to read/write the event store inside a serializable transaction.

### `QueryHandler<Req, Res, Result>` — reads projections only

Same parameters as `CommandHandler`, minus `withEventStore`. Queries never touch the event store. (Exception: the `mobileMe` precedent — see [`reference/queries.md`](./reference/queries.md).)

### `ProjectionHandler<Events>` — event → projection write

```ts
const handler: ProjectionHandler<Events> = ({
  event, // The decoded event union (output of accept([...]))
  projections, // Projections — typed by the consuming projection's reads/writes
}): Future<AmbarResponse, void> =>
  Future.attemptP(async () => {
    // switch on event class, write to the projection's own Repo
  }).mapRej((err) => new ErrorMustRetry(err.message));
```

### `ReactionHandler<Events>` — event → side effect

```ts
const handler: ReactionHandler<Events> = ({
  event,           // Decoded event union
  services,        // Services — null-guard! every service can be null
  withEventStore,  // If the reaction needs to emit a follow-up event
}): Future<AmbarResponse, void> => ...;
```

## The `evaluate` event-store generator pattern

Inside a command (or any caller of `withEventStore`), the second argument is a **synchronous generator function**. It receives a pure `EventStore` and yields operations:

```ts
withEventStore(
  err => json({ status: 500, content: { error: { message: err.message } } }),
  function* (store) {
    const agg = yield* store.try_find(Org, payload.orgId);   // null if missing
    if (agg == null) throw new DomainError("Org not found"); // mapped by the err handler above
    yield* store.emit({ aggregate: Org, event: new OrgRenamed({ ... }) });
    return { ok: true };
  },
);
```

Operations available on `store`:

- `yield* store.find(AggClass, id)` — load aggregate; throws if not found.
- `yield* store.try_find(AggClass, id)` — load aggregate; returns `null` if not found.
- `yield* store.emit({ aggregate, event })` — persist the event; cache updates so a subsequent `find` returns the latest version.
- `yield* store.doesEventAlreadyExist(eventId)` — idempotency check (used in reactions).

Three rules:

1. **No async inside the generator.** The generator is driven synchronously by `evaluate`. All async work happens via the `yield*` operations. Don't `await` anything inside `function* (store) { ... }`.
2. **Single serializable transaction.** Every read and write in one `evaluate` call runs in a single Postgres `Serializable` transaction. Multi-aggregate emits are all-or-nothing.
3. **Errors thrown become the response.** Throw a typed `Error` subclass inside the generator; the `onError` mapper passed as the first argument maps it to an HTTP `Response`. Untyped throws fall through to a 500 with the message in the body.

## Registration cheat sheet

The single most-referenced table in this skill. The HartAgency backend has multiple registries that TypeScript will not keep in sync for you. When you add a new thing, also register it.

| When adding a…           | Register in…                                                                                                            | TypeScript catches missing?                                    |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Command / query endpoint | `src/api.ts` (`command:` or `query:`) **and** `src/index.ts` (`implementation`)                                         | **Yes** — `Implementation<typeof api>` mismatch breaks compile |
| Event class              | `src/app/events.ts` (`new CSchema(...)` or `new TSchema(...)`)                                                          | No — runtime "Unknown event type"                              |
| Projection               | `src/index.ts` (`consumers.projections`) **and** `src/app/projections.ts` (`initializeRepositories` + `allProjections`) | No — runtime "Repository not initialized"                      |
| Reaction                 | `src/index.ts` (`consumers.reactions`)                                                                                  | No — silent (event is delivered but nobody handles it)         |
| Service                  | `src/app/integrations.ts` (`Services` type **and** `initializeServices`)                                                | Yes for the `Services` type; no for the init function          |
| Env var                  | `src/app/environment.ts` (`envDecoder`)                                                                                 | Yes — `env.MY_VAR` doesn't exist until added                   |
| Aggregate                | None — referenced from its first event's `static readonly aggregate`. But the event must register.                      | n/a (indirect through events)                                  |

When in doubt: open `src/index.ts`, search for an existing similar thing, and copy its registration touch-points.

## Import rules

- **The backend never imports from `app/frontend/` or `app/mobile/`.** The arrow is one-way.
- **Clients import from `@be/*`** (the `@be/*` tsconfig alias points into `app/backend/src/`). The safe-to-import surface is:
  - `@be/api` — the central endpoint registry.
  - `@be/domain/.../X.api` — individual endpoint definitions + types.
  - `@be/app/endpoint` — the `PlainEndpoint` class (used by the client's `call` helper).
  - `@be/app/types` — `Email`, `PhoneNumber`, `Url`.
  - `@be/lib/eventSourcing/event` — `Id`.
- **Do not import server internals into `.api.ts`.** A `.api.ts` should be schema-only. Pulling in `WithEventStore`, `Postgres`, `RepoOrgs`, or `EmailService` from a `.api.ts` will pollute the client bundle and likely break the client TypeScript build.

If a `.api.ts` needs to reference an aggregate class for `Id.schema<Agg>()`, that's fine — aggregate classes are pure value containers with no server dependencies.

## Pitfalls that aren't compile-time errors

The TypeScript compiler is not your only safety net. These are the runtime traps:

1. **Forgot to register an event class in `app/events.ts`.** First emit or replay of that event throws "Unknown event type — did you forget to register the schema?" Fix: add `new CSchema(...)` or `new TSchema(...)` to the `Schemas` constructor list.
2. **Forgot to wire a `Repo<X>` into `app/projections.ts`.** First handler call that reads from `projections[RepoX.collectionName]` throws "Repository not initialized". Fix: add the entry to BOTH `initializeRepositories` and `allProjections`.
3. **Used `Id.random()` on a uniqueness-sentinel aggregate.** Two callers attempt to claim the same identity, both succeed, the invariant is broken silently. Fix: use `Id.deterministicForAggregate(SentinelClass, seedString)` so both callers hit the same aggregate id and one of them loses the serializable transaction.
4. **Reaction is not idempotent.** Ambar guarantees at-least-once delivery. A reaction that sends an email and crashes before acknowledging will resend on retry. Fix: emit a "marker" event after the side effect (e.g. `InvitationSent`) and check it first, OR use `store.doesEventAlreadyExist(deterministicId)`.
5. **Auth guard with a payload-carrying allow branch (e.g. `userId`, `actor`) loses those fields if you use the `: AuthResolver` annotation** — the annotation widens `ReturnType<typeof authorize>` to `AuthGuardResult`. Fix: keep `as const` on every return literal when the allow arm hoists fields. Use `: AuthResolver` only when the allow arm is `{ result: "allow" }` with no extras.
6. **Backend imported from a client.** Either through a typo (`@fe/...` from a backend file) or by a `.api.ts` that imported a server-only module. The build fails in the client, not the backend. Fix: keep `.api.ts` schema-only.
7. **`auth_query_mobileMe` placed under `api.query`.** Looks right by name, but the controller is typed `CommandController` because it needs `withEventStore`. The `Implementation<typeof api>` type catches this at compile time, but only if the controller's type and the api bucket disagree — same-bucket-wrong-type slips through. Fix: when an endpoint is read-only but needs event-store access, classify under `api.command` and comment why.

## Convention checklist

Things `tsc` mostly catches, or that are obvious on review. Walk this list during code review; the runtime-trap shortlist in `SKILL.md` is the smaller subset that _needs_ attention before merging.

- [ ] URL path follows `/api/v1/<area>/<command|query|projection|reaction>/<kebab-name>`.
- [ ] Registry key in `api.ts` and `index.ts` follows `<area>_<verbAndNoun>` (commands) or `<area>_query_<noun>` (queries). The two files use the same key.
- [ ] `actor.type` checked before reading `auth.actor.userId` — anonymous actors don't have one.
- [ ] Authorization uses `auth.privileges` (the public API), not raw roles (an implementation detail).
- [ ] Request/response schemas use `s.object`, `s.string`, etc. from `@ambarltd/core/json/schema`. No raw Zod / Yup / `as` casts.
- [ ] Reusable value schemas where applicable: `Email.schema`, `PhoneNumber.schema`, `Url.schema` from `@be/app/types`; `Id.schema<Agg>()` from `@be/lib/eventSourcing/event`; `POSIX.schema` from `@ambarltd/core/time`.
- [ ] Backend never imports from `app/frontend/` or `app/mobile/`. Clients import from `@be/*`; the arrow is one-way.
- [ ] `.api.ts` stays schema-only — no `WithEventStore`, no `Postgres`, no `RepoX`, no service classes. Otherwise the client bundle breaks.
- [ ] Read-only endpoint that needs `withEventStore` (the [`mobileMe`](../../../app/backend/src/domain/auth/query/mobileMe.ts) precedent) is classified under `api.command` with a comment noting why.
- [ ] Aggregate `static readonly type` is unique across the whole codebase. The `Schemas` constructor enforces this at startup.
- [ ] Endpoint registered in both `api.ts` (`command:` / `query:`) and `index.ts` (`implementation`). The `Implementation<typeof api>` type breaks compile if a key is missing — fix this _before_ shipping.

## Where to go next

- New endpoint? → [`reference/commands.md`](./reference/commands.md) or [`reference/queries.md`](./reference/queries.md), then [`templates.md`](./templates.md).
- New event or aggregate? → [`reference/domain.md`](./reference/domain.md), then [`templates.md`](./templates.md).
- New projection or reaction? → [`reference/consumers.md`](./reference/consumers.md), then [`templates.md`](./templates.md).
- New or modified auth requirement? → [`reference/auth.md`](./reference/auth.md).
- New service / env var? → [`reference/services.md`](./reference/services.md).
- Adopting an endpoint from mobile or frontend? → [`reference/client-usage.md`](./reference/client-usage.md).
