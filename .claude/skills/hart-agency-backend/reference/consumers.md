# Consumers: projections and reactions

The two kinds of event consumer in HartAgency. Both subscribe to event classes via `accept([...])`, both run in response to events delivered by Ambar (the event bus), both share the `Consumers` registry shape in [`index.ts`](../../../../app/backend/src/index.ts).

- **Projection**: write to MongoDB. Builds a read view from events. Canonical: [`app/backend/src/domain/org/projection/orgs.ts`](../../../../app/backend/src/domain/org/projection/orgs.ts).
- **Reaction**: trigger a side effect (email, S3 upload, third-party API call). May also emit a follow-up event. Canonical: [`app/backend/src/domain/invitation/reaction/emailInvitation.ts`](../../../../app/backend/src/domain/invitation/reaction/emailInvitation.ts).

→ Skeletons: projection at [`templates.md#8-new-projection-document--repo--controller`](../templates.md#8-new-projection-document--repo--controller); reaction at [`templates.md#9-new-reaction`](../templates.md#9-new-reaction).

## The Ambar delivery model

Ambar is an external event-bus service that reads from the Postgres event store (via logical replication) and POSTs each event to the registered consumer endpoints. It guarantees **at-least-once delivery**: a consumer may see the same event more than once if delivery is retried.

What this means for your code:

- **Projections** are append-idempotent because they use MongoDB `upsert` keyed on the document's `_id`. Re-applying the same event produces the same document. Safe by construction.
- **Reactions** are **not** idempotent by default. Sending an email and crashing before acknowledging will resend on retry. Either make the side effect inherently idempotent OR emit a marker event after the side effect and check it first.

The endpoint signature is what makes a consumer a consumer: it returns an `AmbarResponse`. A successful response acknowledges the event; an `ErrorMustRetry` tells Ambar to redeliver after a backoff.

## Projections

### The three exports

A projection file exports:

1. **`controller`** — `ProjectionController<Events>` bundling a `decoder` and a `handler`.
2. **`Repo<Plural>`** — class wrapping a MongoDB `Repository` + `MongoProjectionStore` with write helpers (`save`) and read helpers (`findAll`, `getById`, `findByFoo`, etc.).
3. **`<Singular>Document` type** — the schema-derived document type written to the collection.

### Collection naming

`collectionName: "<Area>_<Plural>"` — Pascal-cased area, underscore, Pascal-cased plural. Examples: `Org_Orgs`, `User_Users`, `Invitation_Invitations`, `OrgMembership_OrgMemberships`. The underscore separates the area from the plural.

### Indexes

Declare them in `static async createIndexes(_collection)`. The framework calls this once at startup. Use it for:

- Uniqueness invariants enforced at the DB layer (a slug index with `{ unique: true }`).
- Lookups that drive query performance (an index on `userId` for `findByUserId`).

Don't declare indexes that aren't used — Mongo writes still have to maintain them.

### The decoder + handler pattern

- **`accept([Event1, Event2, ...])`** — tells the framework which event types this projection consumes. Only listed events reach the handler.
- **`switch (true) { case event instanceof Event1: ... }`** — canonical dispatch shape. The `default: return event satisfies never;` line is TypeScript-enforced exhaustiveness: if you add an event class to `accept([...])` and forget to handle it, this line fails to compile.
- **`.mapRej(err => new ErrorMustRetry(err.message))`** — converts thrown errors into the retry signal Ambar expects. Without this, an exception escapes as a 500 and Ambar gives up.

### When the target document doesn't exist

For transformation events (e.g. `OrgNameChanged`), you may see a delivery before the creation event has been processed. The `getById` returning `null` is normal — the safe behavior is to no-op (`if (!existing) return`) and let the next retry catch up after the creation event lands. Ambar will eventually reprocess in order, and idempotency on `upsert` makes the eventual state correct.

### Registration touch-points (three places!)

1. **`src/index.ts`** — add `"/api/v1/<area>/projection/<plural>": <namespace>.controller` to `consumers.projections` (and `import * as <namespace> from "..."`).
2. **`src/app/projections.ts`, `initializeRepositories`** — add `[Repo<Plural>.collectionName]: await mongo.createRepository(Repo<Plural>)`.
3. **`src/app/projections.ts`, `allProjections`** — add `[Repo<Plural>.collectionName]: new Repo<Plural>(repos[Repo<Plural>.collectionName], mongo)`.

Missing the consumer entry: events are written but no read view is built. Missing the `initializeRepositories` entry: startup crashes when trying to register the projection. Missing the `allProjections` entry: handlers that try to read this projection throw "Repository not initialized" at first call.

## Reactions

### The shape

A reaction file exports a single `controller` — a `ReactionController<Events>` bundling a decoder and a handler. No repo class, no document type. The handler's job is to trigger a side effect, not maintain a read view.

The handler is typically two phases connected by `.chain`:

1. **`Future.attemptP(async () => { ... })`** — the side effect. Throws if it fails; errors propagate to `mapRej` which converts them into `ErrorMustRetry`.
2. **`.chain(() => withEventStore(...))`** — the follow-up event emission. Runs only if phase 1 succeeded. The marker event records that the side effect fired, which downstream consumers (and the projection) can rely on.

### Null-guarding services

Every service is `Service | null` in the `Services` type — environments without the relevant env vars (e.g. local dev without SMTP) get `null`. **Always null-guard at the top of the handler:**

```ts
if (!services.email) throw new Error("Email service is not configured");
```

Throwing here will become `ErrorMustRetry` after `mapRej`. Ambar will keep retrying — which is correct, because once the service is configured the reaction should fire.

### Idempotency patterns

Ambar delivers at-least-once. Three patterns to make a reaction safe:

**Pattern A — emit a marker event and check it first.** Used in [`emailInvitation.ts`](../../../../app/backend/src/domain/invitation/reaction/emailInvitation.ts). After sending the email, emit `InvitationSent`. On retry, a check on the marker prevents resending — but the codebase doesn't currently use deterministic event ids for reactions, so retries during the failure window do resend the email today; this is a known imperfection.

**Pattern B — make the side effect inherently idempotent.** For S3 uploads with a deterministic key, putting the object twice is a no-op. For HTTP webhook calls, include an idempotency key in the request. For database updates, use upsert.

**Pattern C — `store.doesEventAlreadyExist(deterministicEventId)`.** Build a deterministic id for the marker event and check before doing anything:

```ts
function* (store) {
  const markerId = Id.<...>; // deterministic from the triggering event
  if (yield* store.doesEventAlreadyExist(markerId)) return; // already processed
  // ...do the side effect...
  yield* store.emit({ ..., event_id: markerId });
}
```

The strongest guarantee, but requires running the side effect inside the event-store transaction, which only works for side effects that are themselves transactional.

For a brand-new reaction, **start with Pattern A** (marker event) and accept that retries during the failure window will fire duplicate side effects. Move to Pattern C if duplicate fires are unacceptable.

### Registration

One place: `consumers.reactions` in `src/index.ts`. No projection-repo wiring.

The Ambar config (outside the backend repo) needs to know about the new endpoint URL — Ambar polls registered URLs. Check with the team if a new reaction needs an Ambar config update.

## Shared patterns

### The `accept` decoder

`accept([Event1, Event2, ...])` takes a list of event classes. It produces a `Decoder<Maybe<Event1 | Event2 | ...>>` that the framework uses to deserialize incoming events. Events not in the list return `Nothing` and the consumer is skipped.

Don't put every event in the world in the array — only the ones this consumer actually reacts to. Ambar will deliver all events to all endpoints, but events not in `accept([...])` short-circuit cheaply.

### Switching on event class

```ts
switch (true) {
  case event instanceof Event1: {
    /* ... */ return;
  }
  case event instanceof Event2: {
    /* ... */ return;
  }
  default:
    return event satisfies never;
}
```

The `switch (true)` with `instanceof` cases is the canonical pattern. The `satisfies never` in the default branch is a typescript trick: if you add an event class to `accept([...])` and forget to handle it, `event` is narrowed to the un-handled class type, and `satisfies never` fails to type-check. This is a strong nudge to keep the projection/reaction in sync with its decoder.

## Quality gates specific to consumers

- [ ] Decoder uses `accept([...])` listing only the events this consumer handles.
- [ ] Handler ends with `mapRej(err => new ErrorMustRetry(err.message))` — without it, exceptions don't trigger retry.
- [ ] Exhaustive switch over event classes, with `satisfies never` in the default branch.
- [ ] Reaction either (a) has a marker-event check, (b) uses an inherently idempotent side effect, or (c) uses `doesEventAlreadyExist`.
- [ ] Reaction null-guards every service it uses (`if (!services.X) throw new Error(...)`).
- [ ] Projection registered in THREE places: `consumers.projections` in `index.ts`, `initializeRepositories` in `app/projections.ts`, `allProjections` in `app/projections.ts`.
- [ ] Reaction registered in `consumers.reactions` in `index.ts`.
- [ ] `Repo<Plural>` uses `collectionName: "<Area>_<Plural>" as const` and `static schema = ...` for runtime decoding.
