---
name: hart-agency-backend
description: Use for any work on the HartAgency Express backend at `app/backend/` — adding or modifying commands, queries, aggregates, events, projections, reactions, auth guards, services, or env vars, and wiring new endpoints into the central `api.ts` registry consumed by frontend and mobile. Triggers on requests like "add an endpoint", "create a command", "wire up a query", "emit a new event", "add a projection", "add a reaction", "extend the auth guard", "add a backend route", "register a new event", or any change that touches `app/backend/src/`. Also triggers for review of existing backend code against conventions. Strongly prefer this skill over guessing — the HartAgency backend has many runtime-only gotchas (forgotten event registration, missing repo wiring, broken idempotency) that TypeScript will not catch. Skip for UI work (use `hart-agency-design`), Docker / deploy / CI, and non-HartAgency repos.
---

# Hart Agency Backend

HartAgency's backend is event-sourced CQRS on Postgres (the event store, append-only) plus MongoDB (projections, derived read views). Endpoints come in two files: a `.api.ts` carrying the `endpoint` definition + request/response schemas (client-safe — frontend and mobile import this directly), and a controller `.ts` carrying the handler and auth guard (server-only). The central [`app/backend/src/api.ts`](../../../app/backend/src/api.ts) aggregates every endpoint; [`app/backend/src/index.ts`](../../../app/backend/src/index.ts) ships an `implementation` paired by key.

Paths here use two forms. `./foo.md` is relative to this skill folder. `@repo:foo/bar` is relative to the repo root — resolve by running `git rev-parse --show-toplevel` and joining. Anything without a prefix is prose, not a literal path.

## Map

| For…                  | Read                                                           |
| --------------------- | -------------------------------------------------------------- |
| Mental model + naming | [`./conventions.md`](./conventions.md)                         |
| Skeleton to copy      | [`./templates.md`](./templates.md)                             |
| Per-topic depth       | [`./reference/`](./reference/) — load only what the task needs |
| Live endpoint list    | `@repo:app/backend/src/api.ts`                                 |
| Event registry        | `@repo:app/backend/src/app/events.ts`                          |
| Projection registry   | `@repo:app/backend/src/app/projections.ts`                     |

Code lives under `app/backend/src/domain/<area>/` by concept: `command/`, `query/`, `aggregate/`, `events/<aggregateName>/`, `projection/`, `reaction/`. Cross-cutting infrastructure (auth guards, env vars, services) lives under `app/backend/src/app/`. See `conventions.md` for the full layer map.

## When to use

- Building, reviewing, or refactoring anything under `app/backend/src/` — endpoints, events, aggregates, projections, reactions, auth guards, services, env vars.
- Wiring an endpoint into the central `api.ts` registry consumed by frontend and mobile.
- Reviewing existing backend code against conventions.

Skip for: frontend / mobile UI work (defer to `hart-agency-design`), Docker / deployment / CI, and anything outside `app/backend/src/`.

## Intake

Run a short intake via `AskUserQuestion` if any of the following is missing from the request:

1. **Scope** — Build new (endpoint · event · aggregate · projection · reaction · service · auth guard · env var) · Review existing · Refactor.
2. **Area** — which domain folder under `app/backend/src/domain/`: `auth`, `user`, `org`, `orgMembership`, `invitation`, `operator`, `passwordReset`, `mobileSession`, or new.
3. **Conditional, only when the answer changes the output:**
   - For a new endpoint: command or query? What auth requirement (public / signed-in user / privilege X / resource ownership)? What events does it emit (commands only)? What projections does it read?
   - For a new event: which aggregate, creation vs transformation, name of the past-tense verb.
   - For a new projection: which events does it consume, what does the document look like, what queries will read it.
   - For a new reaction: which events trigger it, which service does it call, what side effect (email / S3 / Qdrant), is the action idempotent or does it need replay protection.

Propose sensible defaults rather than piling up questions.

## Workflow

1. Read [`./conventions.md`](./conventions.md) — mental model + registration cheat sheet.
2. Run the intake — confirm scope and area before touching files.
3. For each kind of thing being added, read its `reference/<topic>.md` deep dive (see the routing table in [`./README.md`](./README.md)).
4. Pull the matching skeleton from [`./templates.md`](./templates.md). Every skeleton has a real-named example next to it and ends with an "Also do this" footer listing the registration files to touch.
5. Walk the quality gates below, then the [Convention checklist](./conventions.md#convention-checklist).
6. Run `cd app/backend && npx tsc --noEmit`. If the change touches `.api.ts` schemas, also `cd app/frontend && npx tsc --noEmit` and `cd app/mobile && npx tsc --noEmit` — the clients import these types directly.

## Quality gates

The runtime traps `tsc` will not catch — the gates a careful reviewer would still miss.

- [ ] New event class registered in `app/backend/src/app/events.ts` (`new CSchema(...)` for creation, `new TSchema(...)` for transformation). First emit throws "Unknown event type" if missing.
- [ ] New projection registered in three places: `consumers.projections` in `index.ts`, `initializeRepositories` + `allProjections` in `app/projections.ts`. First read throws "Repository not initialized" if missing.
- [ ] New reaction is idempotent (marker event, deterministic key, or `store.doesEventAlreadyExist`). Ambar delivers at-least-once — non-idempotent reactions resend emails on retry.
- [ ] Uniqueness-sentinel aggregates use `Id.deterministicForAggregate(Class, normalizedSeed)`, never `Id.random()`. Otherwise two concurrent callers both succeed and the invariant breaks silently.
- [ ] No `await` inside `function* (store) { ... }`. The generator is driven synchronously; async work goes through `yield* store.*`.
- [ ] Auth-guard: payload-carrying allow branches end every return with `as const` and declare `type Result = ReturnType<typeof authorize>`. Plain-allow guards use `const authorize: AuthResolver = ...`. The `: AuthResolver` annotation on a payload-carrying guard erases the custom allow-branch fields (`userId`, `actor`).
- [ ] Domain errors are typed (`class XError extends Error; this.name = "XError"`) and mapped in the `withEventStore` error handler. Untyped throws fall through to 500.
- [ ] `tsc --noEmit` passes in `app/backend/`. If `.api.ts` schemas changed, also in `app/frontend/` and `app/mobile/`.

Convention-level checks (URL path format, schema imports, value-type reuse, no cross-app imports, key matching across `api.ts`/`index.ts`, `actor.type` guards, `auth.privileges` over raw roles, `mobileMe` cross-classification, aggregate-`type` uniqueness) live in [`./conventions.md`](./conventions.md#convention-checklist) — `tsc` catches some of those and the rest are obvious on review.

## Scope

**In:** everything under `app/backend/src/`. The central `api.ts` registry. `.api.ts` schemas consumed by clients via the `@be/*` tsconfig alias. Tests under `app/backend/tests/`.

**Out:** frontend / mobile UI and styling (defer to `hart-agency-design`). Docker / Compose / Kubernetes / CI. The `@ambarltd/core` package internals. Anything not in the HartAgency repo.

**Cross-skill handoff.** If a backend change requires a matching frontend or mobile update (e.g., adopting a new endpoint at a call site), say so explicitly and recommend `hart-agency-design` for the UI portion.
