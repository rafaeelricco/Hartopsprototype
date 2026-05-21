# Domain: aggregates, events, and the event store

The three concepts that share files under `app/backend/src/domain/<area>/`. They're interlocking — events transform aggregates, aggregates exist only as projections of their event streams, and the event store is the medium in which both live.

→ Skeletons: aggregate at [`templates.md#6-new-aggregate-regular`](../templates.md#6-new-aggregate-regular) and [`templates.md#7-new-uniqueness-sentinel-aggregate`](../templates.md#7-new-uniqueness-sentinel-aggregate); events at [`templates.md#4-new-creation-event`](../templates.md#4-new-creation-event) and [`templates.md#5-new-transformation-event`](../templates.md#5-new-transformation-event).

## Aggregates

An aggregate groups a **stream of related events** that together model a business process — an org's lifecycle, an invitation's journey from sent to accepted, a password reset. The class itself is a value container: an instance is the current state computed by replaying that stream. HartAgency aggregates don't carry business methods; they expose a `values` bag and the two boilerplate getters required by the `Aggregate<T>` interface — mutation logic lives on the events.

Three rules:

1. **No `evolve` method.** State is set inside `CreationEvent.createAggregate` and mutated inside `TransformationEvent.transformAggregate`. The aggregate itself is dumb.
2. **`static readonly type` is globally unique.** The `Schemas` class at startup verifies this. Pick a Pascal-cased name and stick with it.
3. **`values` is a plain object literal.** Mark fields `readonly` where you can; don't model invariants by hiding fields behind accessors.

## Uniqueness-sentinel aggregates

A specialization used to enforce **global uniqueness** of a human-readable identifier (an email, a slug, a normalized name). Canonical examples: [`UniqueEmail`](../../../../app/backend/src/domain/user/aggregate/uniqueEmail.ts), `UniqueOrgName`, `UniqueOrgSlug`.

The trick: the aggregate's id is **deterministic from the identifier** via `Id.deterministicForAggregate(SentinelClass, normalizedValue)`. Two concurrent transactions trying to claim the same email both compute the same `aggregateId`, both attempt to `emit` on that aggregate, and Postgres's `Serializable` isolation guarantees that one of them rolls back. The "winner" emits successfully; the "loser" retries and now sees the aggregate already exists.

Pattern (from `inviteOperator`):

```ts
const id = Id.deterministicForAggregate(UniqueEmail, email.value);
const existing = yield * store.try_find(UniqueEmail, id);
if (existing && existing.values.status.value !== "Unassigned") {
  throw new EmailAlreadyAssignedError(email.value);
}
// emit UniqueEmailAssigned (creation) or UniqueEmailReassigned (transformation)
```

The aggregate's `status` is a discriminated union: `{value: "Unassigned"} | {value: "AssignedToInvitation", invitationId} | {value: "AssignedToUser", userId}`. The transition rules live in the command that emits the event, not on the aggregate class.

**Always normalize before hashing.** For an email-like sentinel, lowercase first. Otherwise `"Bob@Example.com"` and `"bob@example.com"` produce different ids and the uniqueness invariant breaks. The `normalize<Sentinel>` helper convention (see `normalizeOrgName` in [`uniqueOrgName.ts`](../../../../app/backend/src/domain/org/aggregate/uniqueOrgName.ts)) keeps this in one place.

## Events

Two kinds, one base class each:

- **`CreationEvent<Agg>`** — produces a new aggregate. Implements `createAggregate(_info): Agg`. The first event for any aggregate is always a creation event.
- **`TransformationEvent<Agg>`** — mutates an existing aggregate. Implements `transformAggregate(agg, _info): Agg`. Returns a new `Agg` instance with updated `values`.

### The five must-have parts of an event class

1. **`const type = "..." as const`** — globally unique string id, used by the event store to deserialize.
2. **`const args = s.object({ type: s.stringLiteral(type), aggregateId: Id.schema<Agg>(), ... })`** — the runtime schema. The `type` field is always a literal of the event's `type` constant.
3. **`static readonly aggregate`** — the aggregate class this event belongs to.
4. **`static readonly type`** / **`static readonly schema = toSchema(this, args)`** — referenced by the event registry in `app/events.ts`.
5. **`values: s.Infer<typeof args>`** — runtime payload, typed from the schema.

For a creation event with a deterministic aggregate id (like `UserInvited`), the constructor `Omit`s `aggregateId` from the input and computes it internally. For regular creation/transformation events, the caller supplies `aggregateId` directly.

### Registering an event class

**Forget this and the runtime breaks.** Add a line to the `Schemas` array in [`app/events.ts`](../../../../app/backend/src/app/events.ts):

```ts
new CSchema(UserInvited.aggregate, UserInvited.schema, UserInvited.type),         // creation
new TSchema(InvitationSent.aggregate, InvitationSent.schema, InvitationSent.type), // transformation
```

`CSchema` for `CreationEvent` subclasses, `TSchema` for `TransformationEvent` subclasses. The first emit of an unregistered event throws "Unknown event type — did you forget to register the schema?" — the most common cause of "backend boots fine, then crashes on first command" bug reports.

### Event naming

- **Past tense.** `UserRegistered`, `OrgCreated`, `OrgRenamed`, `InvitationAccepted`. Never `RegisterUser` (that's the command name).
- **One event class per file.** File name matches class name (`userRegistered.ts` for `class UserRegistered`).
- **Folder grouped by aggregate.** `domain/invitation/events/invitation/userInvited.ts` — yes, the doubled `invitation` is intentional: the outer is the _area_, the inner is the _aggregate_. An area can contain events for multiple aggregates (e.g. `domain/user/events/user/...` and `domain/user/events/uniqueEmail/...` both live under `domain/user/`).

## The `evaluate` generator pattern

The bridge between commands and the event store. From [`store.ts`](../../../../app/backend/src/lib/eventSourcing/store.ts):

```ts
withEventStore(
  err => json({ status: 500, content: { error: { message: err.message } } }),
  function* (store) {
    const agg = yield* store.try_find(SomeAgg, someId);
    if (agg == null) { /* ... */ }
    yield* store.emit({ aggregate: SomeAgg, event: new SomethingHappened({ ... }) });
    return { /* response payload */ };
  },
);
```

### Operations

| Operation                              | Signature                                                                             | Behavior                                                                                                                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `store.find(Cls, id)`                  | `yield* store.find(SomeAgg, someId)` returns `SomeAgg`                                | Loads the aggregate by replaying its events. **Throws** if no events exist for that id.                                                               |
| `store.try_find(Cls, id)`              | `yield* store.try_find(SomeAgg, someId)` returns `SomeAgg \| null`                    | Loads or returns `null`. Use this when missing is a valid case.                                                                                       |
| `store.emit({ aggregate, event })`     | `yield* store.emit({ aggregate: SomeAgg, event: new ... })` returns `{ event, info }` | Persists the event. Updates an internal cache so a later `find`/`try_find` on the same aggregate returns the post-emit state without a DB round-trip. |
| `store.doesEventAlreadyExist(eventId)` | `yield* store.doesEventAlreadyExist(someId)` returns `boolean`                        | Idempotency check, typically used in reactions.                                                                                                       |

### Three rules of generators

1. **No `await` inside the generator.** It's a synchronous generator that `evaluate` drives via `gen.next(value)`. All async work happens via `yield* store.<operation>(...)`. An `await` inside the function body will be a TypeScript error.
2. **One serializable transaction per `evaluate` call.** Multi-aggregate emits are atomic. A failure (Postgres rollback or thrown error) reverts every emit in the same generator.
3. **Throw typed `Error` subclasses for domain errors.** Use `instanceof` in the error mapper (first arg to `withEventStore`) to map them to specific HTTP statuses. Untyped throws fall through to the catch-all (typically 500).

### Reading your own write

The internal cache means this works:

```ts
yield* store.emit({ aggregate: SomeAgg, event: new InitialEvent({ aggregateId, ... }) });
const justCreated = yield* store.find(SomeAgg, aggregateId); // returns the aggregate with InitialEvent applied
```

Useful when you need to compose multiple events on the same aggregate within one transaction — the second emit can read the post-first-emit state.

### Reading aggregates outside `evaluate`

For things like seeding (`seedInitialInvitations` in `index.ts`) you can call `evaluate` directly inside a `postgres.withTransactionP`:

```ts
await postgres.withTransactionP(
  { isolation: "Serializable" },
  async (transaction) => {
    const store = createEventStore(
      new PostgresEventStoreDb(transaction, table),
      schemas,
    );
    await evaluate(store, function* (s) {
      /* same generator pattern */
    });
  },
);
```

This is rare outside startup code. In normal handlers, use `withEventStore`.

## Common patterns

### Creating an aggregate with a random id

```ts
const id = Id.random<SomeAgg>();
yield *
  store.emit({
    aggregate: SomeAgg,
    event: new SomeAggCreated({
      type: SomeAggCreated.type,
      aggregateId: id /* other fields */,
    }),
  });
return { someAggId: id };
```

### Mutating an existing aggregate

```ts
const agg = yield * store.find(SomeAgg, payload.someAggId);
yield *
  store.emit({
    aggregate: SomeAgg,
    event: new SomeAggUpdated({
      type: SomeAggUpdated.type,
      aggregateId: agg.aggregateId,
      newField: payload.newField,
    }),
  });
```

### Multi-aggregate atomic operation

```ts
yield* store.emit({ aggregate: OrgAgg, event: new OrgCreated({ ... }) });
yield* store.emit({ aggregate: UniqueOrgName, event: new UniqueOrgNameReassigned({ ... }) });
yield* store.emit({ aggregate: UniqueOrgSlug, event: new UniqueOrgSlugReassigned({ ... }) });
// all three commit together or all three roll back
```

### Checking a uniqueness sentinel before creating

```ts
const sentinelId = Id.deterministicForAggregate(UniqueEmail, email.value);
const existing = yield * store.try_find(UniqueEmail, sentinelId);
if (existing && existing.values.status.value !== "Unassigned") {
  throw new EmailAlreadyAssignedError(email.value);
}
// proceed with the operation, then emit a UniqueEmailAssigned or UniqueEmailReassigned
```

## Quality gates for domain changes

- [ ] New aggregate has `static readonly type` unique across the whole codebase.
- [ ] New event class has `static readonly aggregate`, `static readonly type`, `static readonly schema`, and a constructor that initializes `values: s.Infer<typeof args>`.
- [ ] Creation events extend `CreationEvent<Agg>` and implement `createAggregate`. Transformation events extend `TransformationEvent<Agg>` and implement `transformAggregate`.
- [ ] Event registered in `src/app/events.ts` with the correct `CSchema` / `TSchema` wrapper.
- [ ] Uniqueness sentinels use `Id.deterministicForAggregate(Class, normalizedSeed)`, never `Id.random()`.
- [ ] No `await` inside `function* (store) { ... }`. All async work goes through `yield* store.*`.
- [ ] Domain errors are typed (`class X extends Error` with `this.name = "X"`) and mapped in the `withEventStore` error handler.
