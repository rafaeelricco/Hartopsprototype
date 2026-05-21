# Hart Agency Backend

HartAgency's backend is an event-sourced Express service at [`/app/backend`](../../../app/backend/). Postgres holds the append-only event store; MongoDB holds the projection read views. Endpoints are split into a client-safe `.api.ts` (schemas + endpoint definition) and a server-only controller `.ts` (handler + auth guard), aggregated by a central [`api.ts`](../../../app/backend/src/api.ts) that frontend and mobile import directly.

This folder documents the conventions, the registration touch-points, and the runtime-only gotchas that TypeScript won't catch.

## Where to start

| I want to…                                                               | Go to…                                                                                                                                              |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Learn the mental model and conventions                                   | [`conventions.md`](conventions.md) — one-page reference: layers, naming, handler signatures, registration tables.                                   |
| Copy-paste a skeleton for a new endpoint / event / projection / reaction | [`templates.md`](templates.md) — every "add new X" task has a labeled skeleton with an "also do this" footer.                                       |
| Add a new command                                                        | [`reference/commands.md`](reference/commands.md) — controller shape, auth guard wiring, error mapping.                                              |
| Add a new query                                                          | [`reference/queries.md`](reference/queries.md) — read-only handler, the `mobileMe` cross-classification.                                            |
| Add a new event or aggregate                                             | [`reference/domain.md`](reference/domain.md) — aggregates, creation vs transformation events, the `evaluate` generator, registering in `events.ts`. |
| Add a projection or reaction                                             | [`reference/consumers.md`](reference/consumers.md) — `accept([...])` decoder, repo wiring, Ambar at-least-once.                                     |
| Add or extend an auth guard                                              | [`reference/auth.md`](reference/auth.md) — `AuthGuardResult` branches, `resolve` vs `authorize`, privileges.                                        |
| Add an external service or env var                                       | [`reference/services.md`](reference/services.md) — `Services` type wiring, null-guarding, env var registration.                                     |
| Write a unit test                                                        | [`reference/testing.md`](reference/testing.md) — fakes for event store and projection repos.                                                        |
| Consume backend endpoints from mobile or frontend                        | [`reference/client-usage.md`](reference/client-usage.md) — `import { api } from "@be/api"`.                                                         |
| AI agent / Claude Code                                                   | [`SKILL.md`](SKILL.md) is the skill manifest.                                                                                                       |

## Layout

```
hart-agency-backend/
├── README.md           ← you are here
├── SKILL.md            ← Claude Code skill manifest
├── conventions.md      ← Mental model + naming + registration cheat sheet
├── templates.md        ← Copy-paste skeletons for every "add new X" task
└── reference/          ← Per-topic deep dives
    ├── commands.md
    ├── queries.md
    ├── domain.md       ← Aggregates + events + the evaluate generator
    ├── consumers.md    ← Projections + reactions
    ├── auth.md
    ├── services.md
    ├── testing.md
    └── client-usage.md
```

## Drift hygiene

The HartAgency backend has three registries that TypeScript won't keep in sync for you. When you add a new thing, register it in the right place — same PR, same commit if possible:

- **New event class** → [`app/backend/src/app/events.ts`](../../../app/backend/src/app/events.ts). Forgetting this surfaces as runtime "Unknown event type" the first time the event flows through.
- **New projection** → [`app/backend/src/app/projections.ts`](../../../app/backend/src/app/projections.ts) (both `initializeRepositories` AND `allProjections`) plus the consumers map in [`index.ts`](../../../app/backend/src/index.ts). A repo missing from `allProjections` produces a runtime "Repository not initialized" when a handler tries to read.
- **New endpoint** → [`app/backend/src/api.ts`](../../../app/backend/src/api.ts) AND the inline `implementation` in [`index.ts`](../../../app/backend/src/index.ts). Mismatched keys break the `Implementation<typeof api>` constraint at compile time — that one TypeScript does catch.

Pictographically: aggregates and endpoints are TypeScript-enforced; events and projections are author-enforced. Treat the registration step as part of the task, not a follow-up.
