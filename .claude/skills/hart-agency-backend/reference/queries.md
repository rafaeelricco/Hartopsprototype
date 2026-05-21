# Queries

A query is a backend endpoint that **reads projections only**. It has access to `projections` and `services` but **not** `withEventStore`. The framework dispatches queries through `handleGuardedQuery`, which never opens an event-store transaction. Canonical example: [`app/backend/src/domain/auth/query/whoAmI.ts`](../../../../app/backend/src/domain/auth/query/whoAmI.ts).

→ Skeleton: [`templates.md#2-new-query-api-controller`](../templates.md#2-new-query-api-controller). For the cross-classified exception, [`templates.md#3-new-cross-classified-query-that-needs-witheventstore-the-mobileme-pattern`](../templates.md#3-new-cross-classified-query-that-needs-witheventstore-the-mobileme-pattern).

## Command vs query at a glance

|                              | Command                               | Query                                        |
| ---------------------------- | ------------------------------------- | -------------------------------------------- |
| HTTP method                  | POST                                  | POST                                         |
| Has `withEventStore`         | yes                                   | no                                           |
| Reads projections            | yes                                   | yes (primary input)                          |
| Emits events                 | yes                                   | no                                           |
| Reads aggregates             | yes (from event store)                | no                                           |
| Auth guard                   | required                              | required (often `() => ({result: "allow"})`) |
| Registered in `api.ts` under | `command:`                            | `query:`                                     |
| URL convention               | `/api/v1/<area>/command/<kebab-name>` | `/api/v1/<area>/query/<kebab-name>`          |

Queries are GET-shaped semantically but POST in transport — they still take a JSON body (even if empty). This is a HartAgency convention that simplifies the schema-decoding pipeline; it diverges from REST orthodoxy.

## The handler

The body is typically a thin wrapper around `Future.attemptP(async () => { ... })` that reads from one or more projection repos. Three patterns:

1. **`Future.attemptP`** wraps an async function and catches thrown errors. Use it instead of `async` directly so the return type is `Future<Error, T>` rather than `Promise<T>`.
2. **`.mapRej(() => internalServerError)`** converts a thrown error into a generic 500. For finer mapping, use `.mapRej(err => err instanceof XError ? json({...}) : internalServerError)`.
3. **Discriminated-union responses** are normal. The `whoAmI` response is `{type: "Anonymous"} | {type: "User", ...}` — define this with `s.discriminatedUnion([s.variant(...), s.variant(...)])` in the `.api.ts`.

## When a query needs `withEventStore` — the `mobileMe` cross-classification

There's exactly one case in the current codebase where a "query" needs event-store access: [`mobileMe.ts`](../../../../app/backend/src/domain/auth/query/mobileMe.ts). The bearer-token validator (`requireBearer`) needs to hydrate a `MobileSession` aggregate via `try_find`, which requires `withEventStore`.

Solution: type the controller as `CommandController`, register the endpoint under `api.command`, and document why with a one-line comment.

```ts
// Registered via the command bucket so the handler receives withEventStore (needed by
// requireBearer to look up MobileSession). The endpoint is still a POST that reads-only.
const handler: CommandHandler<Query, QueryResponse, Result> = ({
  req,
  projections,
  withEventStore,
}) =>
  requireBearer({ req, withEventStore, projections }).chain((auth) =>
    Future.attemptP<QueryResponse>(async () => {
      /* ... */
    }).mapRej(() => internalServerError),
  );

const controller: CommandController<Query, QueryResponse, Result> = {
  endpoint,
  authGuard: { resolve: async () => {}, authorize },
  handler,
};
```

The `.api.ts` file is unchanged — types are still named `Query` and `QueryResponse`. Only the controller crosses over.

**Register under `api.command`.** A natural temptation is to add this to `api.query` because of where the file lives, but the controller is typed as `CommandController` and the `Implementation<typeof api>` constraint will catch the mismatch at compile time. The clean signal of intent is putting the registry key under `command:` and naming it with a `query_` infix (e.g. `auth_query_mobileMe`), so the canonical name still says "this is read-only".

**When to use this pattern.** Only when the read genuinely needs to consult an aggregate that isn't projected (typically: session tokens, in-flight reservations, anything with strong-consistency requirements). For routine reads, stick with `QueryController` and projections.

## Auth patterns for queries

Most queries are either fully public (`() => ({result: "allow"})`) or "must be signed in" (a single `actor.type === "User"` check). The privilege patterns from commands also apply — see [`auth.md`](./auth.md).

If a query needs to filter results by the caller's identity (e.g. "list orgs visible to this user"), do the filtering inside the handler:

```ts
if (actor.type !== "User") return { orgs: [] };
const memberships = projections[RepoOrgMemberships.collectionName];
const myOrgs = await memberships.findByUserId(actor.userId);
return { orgs: myOrgs.map((m) => ({ orgId: m.orgId, roles: m.roles })) };
```

Don't use `resolve` to fetch filtering data — `resolve` is for authorization decisions, not data retrieval. Reading inside the handler is the right shape.

## Caching

Queries are not cached server-side by default. Every request hits MongoDB. If a query becomes a hot path, options in order of preference:

1. Add a MongoDB index that makes the read O(1) (declare in `Repo<X>.createIndexes`).
2. Denormalize: have the projection write a pre-computed shape so the query is a single key lookup.
3. Add an in-memory cache at the repo layer (no examples in the codebase yet — discuss before introducing).

Frontend / mobile caching is the client's problem; the backend should always return fresh data.

## Registration touch-points

→ See [`templates.md#2-new-query-api-controller`](../templates.md#2-new-query-api-controller) "Also do this" footer. Summary: `api.ts` (`query:` bucket — exception: `command:` for the `mobileMe`-style cross-classification), `index.ts` (`implementation.query` or `.command` to match). No `app/events.ts` or `app/projections.ts` changes for the query itself.

## Quality gates specific to queries

- [ ] Controller is typed `QueryController` (or, for the cross-classified exception, `CommandController` with a comment).
- [ ] No `withEventStore` access (unless cross-classified — see above).
- [ ] Reads use `projections[Repo<X>.collectionName]`, not the event store.
- [ ] Filtering by caller identity happens inside the handler, not in `resolve`.
- [ ] Registered in the matching bucket of `api.ts` AND `implementation` in `index.ts`.
