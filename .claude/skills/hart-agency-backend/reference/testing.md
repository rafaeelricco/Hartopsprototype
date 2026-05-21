# Testing

HartAgency uses a custom test runner under [`app/backend/tests/unit/`](../../../../app/backend/tests/unit/). No Jest, no Vitest. Tests run against in-memory fakes for the event store and projection repos — no real Postgres or MongoDB at unit-test time.

## The runner

```ts
import { run, group, test, expect } from "@be/tests/unit/lib/test";

run("module name", () => {
  group("scenario", () => {
    test("does the thing", async () => {
      expect(actual).toBe(expected);
    });
  });
});
```

Entry point is [`tests/unit/main.ts`](../../../../app/backend/tests/unit/main.ts) — it imports the test files and runs them. Add new test files to that import list when you create them.

## The fakes

Two fakes do most of the work:

- **`InMemoryEventStoreDatabase`** — implements `EventStoreDatabase` with a plain array. `evaluate` works against it just like real Postgres, but without I/O.
- **`FakeRepo<DocType>`** — implements the read interface of a projection repo (e.g. `FakeRepoUsers`, `FakeRepoOrgMemberships`). Stores documents in a plain `Map`.

The fakes mean you can:

- Emit events into the in-memory store via `emitForDb` and then drive a command/query against it.
- Seed projection documents directly (without going through the event → projection pipeline) when the test cares about the read side, not the write side.

## Helpers in `tests/unit/lib/fakes.ts`

These exist to keep tests short. Use them.

| Helper                                | Use case                                                                                                                           |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `buildWithEventStore(db, schemas)`    | Builds a `WithEventStore` over an `InMemoryEventStoreDatabase`.                                                                    |
| `buildProjections(repos)`             | Builds a `Projections` object over a set of fake repos.                                                                            |
| `seedActiveUser(repos, opts)`         | Inserts a `UserDocument` into the fake `RepoUsers`.                                                                                |
| `seedActiveSession(db, opts)`         | Emits a `MobileSessionIssued` into the in-memory event store.                                                                      |
| `emitForDb(db, { aggregate, event })` | Directly persists an event into the in-memory store (bypasses `evaluate`). Used to set up state without exercising a full command. |
| `promiseOf(future)`                   | Convert a `Future<Error, T>` into a `Promise<T>`.                                                                                  |
| `statusOf(response)`                  | Extract the HTTP status from a handler's `Response`.                                                                               |
| `contentOf(response)`                 | Extract the body from a handler's `Response` for assertion.                                                                        |

## Anatomy of a handler test

Pattern from existing tests:

```ts
test("createOrg succeeds for ManageOrgs user", async () => {
  // Arrange: set up fakes
  const db = new InMemoryEventStoreDatabase();
  const repos = {
    /* fake repos */
  };
  await seedActiveUser(repos, {
    userId,
    email: "alice@example.com",
    systemRoles: ["Operator"],
  });
  // (seed any uniqueness sentinels the command will read)

  const withEventStore = buildWithEventStore(db, schemas);
  const projections = buildProjections(repos);
  const services = { fileStorage: null, email: null, vectorDatabase: null };

  // Act: call the handler
  const handler = controller.handler;
  const result = await promiseOf(
    handler({
      actor,
      payload,
      auth,
      req,
      projections,
      services,
      withEventStore,
    }),
  );

  // Assert: check the response and the resulting events
  expect(statusOf(result)).toBe(200);
  expect(contentOf(result)).toMatchObject({ orgId: expect.anything() });
  // verify events landed in db.events
});
```

Three phases:

1. **Arrange** — set up the in-memory event store, seed any projections the handler reads, build the `WithEventStore` / `Projections` / `Services` it needs.
2. **Act** — call the handler directly (skip the Express middleware). Construct the `auth` argument manually to simulate different actor types and privileges.
3. **Assert** — check the response status and content; for commands, also assert on the emitted events.

## What's not in the test suite today

- **No integration tests** — nothing runs against a real Postgres or MongoDB. Adding integration tests requires a Docker Compose setup or testcontainers; this hasn't been built yet.
- **No projection tests** — projections aren't tested today. Pattern would be: emit events into the in-memory store, run the projection handler, assert on the fake repo's contents.
- **No reaction tests** — reactions are harder to test because they hit real services. Pattern would be: pass a fake `services.email` (or whichever) with a recording method, run the reaction, assert the recorded call.
- **No end-to-end HTTP tests** — handlers are tested directly, not through the Express route layer. Auth-guard `resolve` / `authorize` are called manually in arrange.

If you add tests in any of these categories, document the pattern here so the next contributor can follow it.

## Quality gates for tests

- [ ] Test file imported in `tests/unit/main.ts` so it runs.
- [ ] Uses `run` / `group` / `test` / `expect` from `@be/tests/unit/lib/test`.
- [ ] Uses fakes (`InMemoryEventStoreDatabase`, `FakeRepoXxx`) — no real DB connections.
- [ ] `auth` argument constructed explicitly to match the scenario (don't borrow from a helper that hides the actor type).
- [ ] Assertions on both the response (status / content) AND the event log (`db.events`) for commands that should write.
