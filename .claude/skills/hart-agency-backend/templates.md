# Templates

Copy-paste skeletons for every "add new X" task. Each template:

- Marks substitution points with `<PLACEHOLDER>`.
- Uses real imports from real HartAgency modules — these compile if you replace the placeholders.
- Ends with an **Also do this** footer listing every file you also need to touch. This is the part developers forget.

Templates are deliberately minimal — they show the shape, not every edge case. For depth, follow the cross-references to `reference/*.md`.

## Table of contents

1. [New command](#1-new-command-api-controller)
2. [New query](#2-new-query-api-controller)
3. [New cross-classified query that needs `withEventStore` (the `mobileMe` pattern)](#3-new-cross-classified-query-that-needs-witheventstore-the-mobileme-pattern)
4. [New creation event](#4-new-creation-event)
5. [New transformation event](#5-new-transformation-event)
6. [New aggregate (regular)](#6-new-aggregate-regular)
7. [New uniqueness-sentinel aggregate](#7-new-uniqueness-sentinel-aggregate)
8. [New projection](#8-new-projection-document--repo--controller)
9. [New reaction](#9-new-reaction)
10. [New auth guard (with `resolve` dependencies)](#10-new-auth-guard-with-resolve-dependencies)
11. [New service](#11-new-service)
12. [New env var](#12-new-env-var)

---

## 1. New command (`.api.ts` + controller)

Pattern after `app/backend/src/domain/org/command/createOrg.{api.ts,ts}`.

**`src/domain/<area>/command/<verbAndNoun>.api.ts`:**

```ts
export { type Command, type CommandResponse, endpoint };

import * as s from "@ambarltd/core/json/schema";
import { PlainEndpoint } from "@be/app/endpoint";
import { Id } from "@be/lib/eventSourcing/event";
import { <Aggregate> } from "@be/domain/<area>/aggregate/<aggregate>";
// add Email, PhoneNumber, etc. as needed

const endpoint = new PlainEndpoint({
  path: "/api/v1/<area>/command/<kebab-name>",
  method: "post",
  request: s.object({
    // request fields
  }),
  response: s.object({
    // response fields — usually the new resource's id, or { success: boolean }
  }),
});

type Command = s.Infer<typeof endpoint.request>;
type CommandResponse = s.Infer<typeof endpoint.response>;
```

**`src/domain/<area>/command/<verbAndNoun>.ts`:**

```ts
export { controller };

import { type Command, type CommandResponse, endpoint } from "@be/domain/<area>/command/<verbAndNoun>.api";
import { type CommandController, type CommandHandler } from "@be/app/handleGuardedEndpoint";
import { type AuthContext } from "@be/app/resolveAuth";
import { Future } from "@ambarltd/core/future";
import { json } from "@ambarltd/core/router";
// import aggregate + event classes you'll emit

class <DomainError>Error extends Error {
  constructor(message: string) {
    super(message);
    this.name = "<DomainError>Error";
  }
}

// Adjust to match the privilege / actor type this endpoint requires.
// Allow branch carries userId → keep `as const`. See reference/auth.md.
const authorize = ({ auth }: { auth: AuthContext }) => {
  if (auth.actor.type !== "User") return { result: "deny", status: 401, message: "Authentication required" } as const;
  if (auth.privileges.includes("<PrivilegeName>")) return { result: "allow", userId: auth.actor.userId } as const;
  return { result: "deny", status: 403, message: "Requires <PrivilegeName> privilege" } as const;
};

type Result = ReturnType<typeof authorize>;

const handler: CommandHandler<Command, CommandResponse, Result> = ({ payload, auth, withEventStore }) => {
  // pre-store validation: fail fast with 400s before opening the transaction
  // if (something invalid) return Future.reject(json({ status: 400, content: { error: { message: "..." } } }));

  return withEventStore(
    err =>
      err instanceof <DomainError>Error
        ? json({ status: 409, content: { error: { message: err.message } } })
        : json({ status: 500, content: { error: { message: err.message } } }),
    function* (store) {
      // const agg = yield* store.try_find(<Aggregate>, <id>);
      // if (agg == null) throw new <DomainError>Error("not found");
      // yield* store.emit({ aggregate: <Aggregate>, event: new <SomethingHappened>({ type: <SomethingHappened>.type, ... }) });

      return { /* response fields */ };
    },
  );
};

const controller: CommandController<Command, CommandResponse, Result> = {
  endpoint,
  authGuard: {
    resolve: async () => {},
    authorize,
  },
  handler,
};
```

**Also do this:**

1. Add `import { endpoint as <area>_<verbAndNoun> } from "@be/domain/<area>/command/<verbAndNoun>.api";` to `src/api.ts` and add `<area>_<verbAndNoun>` to the `command:` bucket.
2. Add `import { controller as <area>_<verbAndNoun> } from "@be/domain/<area>/command/<verbAndNoun>";` to `src/index.ts` and add `<area>_<verbAndNoun>` to the `command:` bucket of the `implementation` const.
3. If you emitted a new event class, also register it (see template #4 / #5).
4. Run `cd app/backend && npx tsc --noEmit`. Also run it in `app/frontend` and `app/mobile` if the `.api.ts` schemas are consumed by clients.

### Example (real)

From [`app/backend/src/domain/org/command/createOrg.ts`](../../../app/backend/src/domain/org/command/createOrg.ts) — privilege-gated, multi-aggregate, 409 on domain-rule violations:

```ts
class InvalidReservationError extends Error {
  constructor(message: string) { super(message); this.name = "InvalidReservationError"; }
}

// Allow branch carries userId → keep `as const`. See reference/auth.md.
const authorize = ({ auth }: { auth: AuthContext }) => {
  if (auth.actor.type !== "User") return { result: "deny", status: 401, message: "Authentication required" } as const;
  if (auth.privileges.includes("ManageOrgs")) return { result: "allow", userId: auth.actor.userId } as const;
  return { result: "deny", status: 403, message: "Requires ManageOrgs privilege" } as const;
};
type Result = ReturnType<typeof authorize>;

const handler: CommandHandler<Command, CommandResponse, Result> = ({ payload, auth, withEventStore }) =>
  withEventStore(
    err => err instanceof InvalidReservationError
      ? json({ status: 409, content: { error: { message: err.message } } })
      : json({ status: 500, content: { error: { message: err.message } } }),
    function* (store) {
      const orgId = Id.random<Org>();
      yield* store.emit({ aggregate: Org, event: new OrgCreated({ ... }) });
      yield* store.emit({ aggregate: UniqueOrgName, event: new UniqueOrgNameReassigned({ ... }) });
      yield* store.emit({ aggregate: UniqueOrgSlug, event: new UniqueOrgSlugReassigned({ ... }) });
      return { orgId };
    },
  );
```

Full file is 135 lines — read it directly when you need the pre-store validation, the `assertHeldByCurrentUser` helper, or the deterministic-id reservation check.

See [`reference/commands.md`](./reference/commands.md) for depth.

---

## 2. New query (`.api.ts` + controller)

Pattern after `app/backend/src/domain/operator/query/listOperators.{api.ts,ts}` (privilege-gated — the common case). For the rare public query, see `app/backend/src/domain/auth/query/whoAmI.{api.ts,ts}` and the public-access note below.

**`src/domain/<area>/query/<verbAndNoun>.api.ts`:**

```ts
export { type Query, type QueryResponse, endpoint };

import * as s from "@ambarltd/core/json/schema";
import { PlainEndpoint } from "@be/app/endpoint";

const endpoint = new PlainEndpoint({
  path: "/api/v1/<area>/query/<kebab-name>",
  method: "post",
  request: s.object({
    // request fields (often empty for "current user" queries)
  }),
  response: s.object({
    // response shape — discriminated unions via s.discriminatedUnion(...) are fine
  }),
});

type Query = s.Infer<typeof endpoint.request>;
type QueryResponse = s.Infer<typeof endpoint.response>;
```

**`src/domain/<area>/query/<verbAndNoun>.ts`:**

```ts
export { controller };

import { type Query, type QueryResponse, endpoint } from "@be/domain/<area>/query/<verbAndNoun>.api";
import { type QueryController, type QueryHandler } from "@be/app/handleGuardedEndpoint";
import { type AuthResolver } from "@be/app/authGuard";
import { Future } from "@ambarltd/core/future";
import { internalServerError } from "@be/app/responses";
import { Repo<Plural> } from "@be/domain/<area>/projection/<plural>";

// Adjust to match the privilege this endpoint requires.
// Allow branch carries no fields → annotate with `AuthResolver`. See reference/auth.md.
const authorize: AuthResolver = ({ auth }) => {
  if (auth.actor.type !== "User") return { result: "deny", status: 401, message: "Authentication required" };
  if (auth.privileges.includes("<PrivilegeName>")) return { result: "allow" };
  return { result: "deny", status: 403, message: "Requires <PrivilegeName> privilege" };
};

type Result = ReturnType<typeof authorize>;

const handler: QueryHandler<Query, QueryResponse, Result> = ({ actor, projections }) =>
  Future.attemptP<QueryResponse>(async () => {
    const repo = projections[Repo<Plural>.collectionName];
    // const docs = await repo.findSomething(...);
    return { /* response fields */ };
  }).mapRej(() => internalServerError);

const controller: QueryController<Query, QueryResponse, Result> = {
  endpoint,
  authGuard: {
    resolve: async () => {},
    authorize,
  },
  handler,
};
```

**Also do this:**

1. Add `import { endpoint as <area>_query_<noun> } from "..."` to `src/api.ts` `query:` bucket.
2. Add `import { controller as <area>_query_<noun> } from "..."` to `src/index.ts` `query:` bucket of `implementation`.
3. Run `tsc --noEmit` in backend (and clients if applicable).

### Examples (real)

**Privilege-gated (canonical).** From [`app/backend/src/domain/operator/query/listOperators.ts`](../../../app/backend/src/domain/operator/query/listOperators.ts) — gated by the `ManageOperators` system privilege, reads one projection. The allow branch carries no fields, so the handler destructures just `{ projections }`:

```ts
// Requires ManageOperators privilege.
const authorize: AuthResolver = ({ auth }) => {
  if (auth.actor.type !== "User")
    return { result: "deny", status: 401, message: "Authentication required" };
  if (auth.privileges.includes("ManageOperators")) return { result: "allow" };
  return {
    result: "deny",
    status: 403,
    message: "Requires ManageOperators privilege",
  };
};
type Result = ReturnType<typeof authorize>;

const handler: QueryHandler<Query, QueryResponse, Result> = ({ projections }) =>
  Future.attemptP<QueryResponse>(async () => {
    const users = projections[RepoUsers.collectionName];
    const operators = await users.findAllOperators();
    return {
      operators: operators.map((o) => ({ userId: o.userId, email: o.email })),
    };
  }).mapRej(() => internalServerError);
```

**Public (exception).** From [`app/backend/src/domain/auth/query/whoAmI.ts`](../../../app/backend/src/domain/auth/query/whoAmI.ts) — the rare anyone-can-call query. The handler branches on `actor.type` to distinguish anonymous from signed-in callers, and returns a discriminated-union response. See [`reference/auth.md`](./reference/auth.md) "Public — anyone can call" for when this pattern is appropriate:

```ts
const authorize: AuthResolver = () => ({ result: "allow" });
type Result = ReturnType<typeof authorize>;

const handler: QueryHandler<Query, QueryResponse, Result> = ({
  actor,
  projections,
}) =>
  Future.attemptP<QueryResponse>(async () => {
    if (actor.type !== "User") return { type: "Anonymous" };

    const users = projections[RepoUsers.collectionName];
    const memberships = projections[RepoOrgMemberships.collectionName];

    const user = await users.getByUserId(actor.userId);
    if (!user) throw new Error(`User ${actor.userId.value} not found`);

    const orgMemberships = await memberships.findByUserId(actor.userId);
    return { type: "User", userId: user.userId, email: user.email /* ... */ };
  }).mapRej(() => internalServerError);
```

Importing `AuthResolver` for the public case: `import { type AuthResolver } from "@be/app/authGuard";`.

See [`reference/queries.md`](./reference/queries.md) for depth.

---

## 3. New cross-classified query that needs `withEventStore` (the `mobileMe` pattern)

Use this when the endpoint is read-only conceptually but needs event-store access (e.g. session-token validation that hydrates a `MobileSession` aggregate). Pattern after `app/backend/src/domain/auth/query/mobileMe.ts`.

The `.api.ts` file is identical to a regular query (template #2) — type-named `Query` / `QueryResponse`.

**Controller:**

```ts
export { controller };

import { type Query, type QueryResponse, endpoint } from "@be/domain/<area>/query/<name>.api";
import { type CommandController, type CommandHandler } from "@be/app/handleGuardedEndpoint";
//                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                ^^^^^^^^^^^^^^^^^^
//                  Command types, even though the file is under `query/`.
import { type AuthResolver } from "@be/app/authGuard";
// ... domain imports

const authorize: AuthResolver = () => ({ result: "allow" });
type Result = ReturnType<typeof authorize>;

// Registered via api.command bucket so the handler receives withEventStore.
// The endpoint is read-only — no events are emitted.
const handler: CommandHandler<Query, QueryResponse, Result> = ({ req, projections, withEventStore }) =>
  // ... uses withEventStore to look up an aggregate, e.g. session token validation
  ...;

const controller: CommandController<Query, QueryResponse, Result> = {
  endpoint,
  authGuard: { resolve: async () => {}, authorize },
  handler,
};
```

**Also do this:**

1. In `src/api.ts`, add this endpoint under the **`command:` bucket** (not `query:`). Suggested key: `<area>_query_<noun>` so the read-only intent is visible in the key name.
2. In `src/index.ts`, add the controller under `implementation.command`. The `Implementation<typeof api>` type will enforce the match.
3. Add a one-line comment on the controller explaining why it's cross-classified (matches the [`mobileMe.ts`](../../../app/backend/src/domain/auth/query/mobileMe.ts) precedent).

### Example (real)

Only one in the codebase: [`app/backend/src/domain/auth/query/mobileMe.ts`](../../../app/backend/src/domain/auth/query/mobileMe.ts). It calls `requireBearer({ req, withEventStore, projections })` to hydrate a `MobileSession` aggregate via `store.try_find`, which is why it needs the command-side handler args. Registered in `api.ts` under `command:` with the key `auth_query_mobileMe`.

---

## 4. New creation event

Pattern after `app/backend/src/domain/invitation/events/invitation/userInvited.ts`.

**`src/domain/<area>/events/<aggregateName>/<verbedPastTense>.ts`:**

```ts
export { <EventName> };

import { Id, CreationEvent, toSchema } from "@be/lib/eventSourcing/event";
import * as s from "@ambarltd/core/json/schema";
import { POSIX } from "@ambarltd/core/time";
import { <Aggregate> } from "@be/domain/<area>/aggregate/<aggregate>";
// other domain imports as needed

const type = "<EventName>" as const;
const args = s.object({
  type: s.stringLiteral(type),
  aggregateId: Id.schema<<Aggregate>>(),
  // additional event payload fields
});

class <EventName> extends CreationEvent<<Aggregate>> {
  static readonly aggregate = <Aggregate>;
  static readonly type = type;
  static readonly schema = toSchema(this, args);
  readonly values: s.Infer<typeof args>;

  constructor(values: s.Infer<typeof args>) {
    super();
    this.values = values;
  }

  createAggregate(): <Aggregate> {
    return new <Aggregate>({
      aggregateId: this.values.aggregateId,
      aggregateVersion: 0,
      // ... initial field values from this.values
    });
  }
}
```

**Variant — when the aggregate id is deterministic from the event payload** (e.g. `Invitation` is keyed by the token):

```ts
constructor(values: Omit<s.Infer<typeof args>, "aggregateId">) {
  super();
  const aggregateId = Id.deterministicForAggregate(<Aggregate>, values.<seedField>);
  this.values = { ...values, aggregateId };
}
```

**Also do this:**

1. Add `new CSchema(<EventName>.aggregate, <EventName>.schema, <EventName>.type)` to the `schemas` array in `src/app/events.ts`. **Forgetting this is the #1 runtime gotcha** — it surfaces as "Unknown event type" on first emit, not at compile time.
2. If this is the first event for a new aggregate, the aggregate class is referenced indirectly via `static readonly aggregate = <Aggregate>` — make sure that aggregate exists (template #6).

### Example (real)

From [`app/backend/src/domain/invitation/events/invitation/userInvited.ts`](../../../app/backend/src/domain/invitation/events/invitation/userInvited.ts) — uses the deterministic-id variant (aggregate id derived from the invitation token):

```ts
const type = "UserInvited" as const;
const args = s.object({
  type: s.stringLiteral(type),
  aggregateId: Id.schema<Invitation>(),
  email: Email.schema,
  invitationType: schema_invitationType,
  token: s.string,
  invitedBy: schema_actor_userOrSystem,
  expiresAt: POSIX.schema,
});

class UserInvited extends CreationEvent<Invitation> {
  static readonly aggregate = Invitation;
  static readonly type = type;
  static readonly schema = toSchema(this, args);
  readonly values: s.Infer<typeof args>;

  constructor(values: Omit<s.Infer<typeof args>, "aggregateId">) {
    super();
    const aggregateId = Id.deterministicForAggregate(Invitation, values.token);
    this.values = { ...values, aggregateId };
  }

  createAggregate(): Invitation {
    return new Invitation({
      aggregateId: this.values.aggregateId,
      aggregateVersion: 0 /* ... */,
    });
  }
}
```

---

## 5. New transformation event

Pattern after `app/backend/src/domain/user/events/uniqueEmail/uniqueEmailReassigned.ts`.

```ts
export { <EventName> };

import { Id, TransformationEvent, toSchema, EventInfo } from "@be/lib/eventSourcing/event";
import * as s from "@ambarltd/core/json/schema";
import { <Aggregate> } from "@be/domain/<area>/aggregate/<aggregate>";

const type = "<EventName>" as const;
const args = s.object({
  type: s.stringLiteral(type),
  aggregateId: Id.schema<<Aggregate>>(),
  // fields needed to compute the next state
});

class <EventName> extends TransformationEvent<<Aggregate>> {
  static readonly aggregate = <Aggregate>;
  static readonly type = type;
  static readonly schema = toSchema(this, args);
  constructor(readonly values: s.Infer<typeof args>) {
    super();
  }

  transformAggregate(aggregate: <Aggregate>, _info: EventInfo): <Aggregate> {
    return new <Aggregate>({
      ...aggregate.values,
      // override the fields this event changes
    });
  }
}
```

**Also do this:**

1. Add `new TSchema(<EventName>.aggregate, <EventName>.schema, <EventName>.type)` to `src/app/events.ts`. Note: **TSchema** for transformations, **CSchema** for creations. Mixing them up is a registration-time mistake the runtime will catch.

### Example (real)

From [`app/backend/src/domain/user/events/uniqueEmail/uniqueEmailReassigned.ts`](../../../app/backend/src/domain/user/events/uniqueEmail/uniqueEmailReassigned.ts) — mutates the sentinel's `status` while keeping every other field unchanged:

```ts
const type = "UniqueEmailReassigned" as const;
const args = s.object({
  type: s.stringLiteral(type),
  aggregateId: Id.schema<UniqueEmail>(),
  status: schema_uniqueEmailStatus,
});

class UniqueEmailReassigned extends TransformationEvent<UniqueEmail> {
  static readonly aggregate = UniqueEmail;
  static readonly type = type;
  static readonly schema = toSchema(this, args);
  constructor(readonly values: s.Infer<typeof args>) {
    super();
  }

  transformAggregate(aggregate: UniqueEmail, _info: EventInfo): UniqueEmail {
    return new UniqueEmail({ ...aggregate.values, status: this.values.status });
  }
}
```

---

## 6. New aggregate (regular)

Pattern after `app/backend/src/domain/org/aggregate/org.ts`.

```ts
export { <Aggregate> };

import { Aggregate, Id } from "@be/lib/eventSourcing/event";
import { POSIX } from "@ambarltd/core/time";
// other domain imports

class <Aggregate> implements Aggregate<<Aggregate>> {
  static readonly type = "<AggregatePascalName>"; // must be globally unique
  constructor(
    readonly values: {
      readonly aggregateId: Id<<Aggregate>>;
      readonly aggregateVersion: number;
      // domain fields — readonly preferred but not enforced
      field1: string;
      field2: POSIX;
      // ...
    },
  ) {}

  get aggregateId(): Id<<Aggregate>> {
    return this.values.aggregateId;
  }

  get aggregateVersion(): number {
    return this.values.aggregateVersion;
  }
}
```

**Notes:**

- Aggregates are plain value containers. There's no `evolve` method — state mutation happens in `CreationEvent.createAggregate` and `TransformationEvent.transformAggregate`.
- `static readonly type` must be unique across every aggregate in the codebase. The `Schemas` class enforces uniqueness at startup.
- If the aggregate has a status field, model it as a discriminated union: `status: { value: "Active" } | { value: "Archived", archivedAt: POSIX }` — and export a schema for it from a `schema_<aggregate>Status` const so events can reuse it.

### Example (real)

From [`app/backend/src/domain/org/aggregate/org.ts`](../../../app/backend/src/domain/org/aggregate/org.ts) — the canonical "regular aggregate" reference, 31 lines, no business methods:

```ts
class Org implements Aggregate<Org> {
  static readonly type = "Org";
  constructor(
    readonly values: {
      readonly aggregateId: Id<Org>;
      readonly aggregateVersion: number;
      name: string;
      slug: string;
      uniqueNameId: Id<UniqueOrgName>;
      uniqueSlugId: Id<UniqueOrgSlug>;
      createdByUserId: Id<User>;
      createdAt: POSIX;
    },
  ) {}

  get aggregateId(): Id<Org> {
    return this.values.aggregateId;
  }
  get aggregateVersion(): number {
    return this.values.aggregateVersion;
  }
}
```

---

## 7. New uniqueness-sentinel aggregate

Pattern after `app/backend/src/domain/user/aggregate/uniqueEmail.ts` and `app/backend/src/domain/org/aggregate/uniqueOrgName.ts`.

A uniqueness sentinel is an aggregate whose identity is **deterministic from the human-readable value** it guards (e.g. the email string, the normalized org name). Two callers trying to claim the same value produce the same aggregate id and contend on the serializable transaction — one of them loses.

```ts
export { <SentinelName>, schema_<sentinelName>Status, normalize<SentinelName> };

import { Aggregate, Id } from "@be/lib/eventSourcing/event";
import * as s from "@ambarltd/core/json/schema";
// import value type (Email, etc.)

// Discriminated-union status enum showing what (if anything) holds this identity.
type <SentinelName>Status =
  | { value: "Unassigned" }
  | { value: "AssignedTo<Target>"; <targetId>: Id<<Target>> };

const schema_<sentinelName>Status = s.discriminatedUnion([
  s.variant({ value: "Unassigned" }),
  s.variant({ value: "AssignedTo<Target>", <targetId>: Id.schema<<Target>>() }),
]);

class <SentinelName> implements Aggregate<<SentinelName>> {
  static readonly type = "<SentinelPascalName>";
  constructor(
    readonly values: {
      readonly aggregateId: Id<<SentinelName>>;
      readonly aggregateVersion: number;
      <value>: <ValueType>;
      status: <SentinelName>Status;
    },
  ) {}

  get aggregateId(): Id<<SentinelName>> { return this.values.aggregateId; }
  get aggregateVersion(): number { return this.values.aggregateVersion; }
}

// Optional but recommended: normalize the value before using it as the id seed.
function normalize<SentinelName>(value: string): string {
  return value.trim().toLowerCase();
}
```

**Usage in a command:**

```ts
const id = Id.deterministicForAggregate(<SentinelName>, normalize<SentinelName>(input));
const existing = yield* store.try_find(<SentinelName>, id);
if (existing && existing.values.status.value !== "Unassigned") {
  throw new <Domain>Error("...");
}
// emit creation or reassignment event
```

**Also do this:**

1. Create a `CreationEvent` (template #4) that produces the initial `Unassigned` or `AssignedTo<Target>` status — typically `<SentinelName>Assigned`.
2. Create a `TransformationEvent` (template #5) that mutates `status` — typically `<SentinelName>Reassigned`.
3. Register both in `src/app/events.ts`.

### Example (real)

From [`app/backend/src/domain/org/aggregate/uniqueOrgName.ts`](../../../app/backend/src/domain/org/aggregate/uniqueOrgName.ts) — three-state lifecycle (`Unassigned` ⇄ `TemporaryHold` ⇄ `AssignedToOrg`), normalized id seed:

```ts
const schema_uniqueOrgNameStatus = s.discriminatedUnion([
  s.variant({ value: "Unassigned" }),
  s.variant({
    value: "TemporaryHold",
    holder: Id.schema<User>(),
    expires: POSIX.schema,
  }),
  s.variant({ value: "AssignedToOrg", orgId: Id.schema<Org>() }),
]);
type UniqueOrgNameStatus = s.Infer<typeof schema_uniqueOrgNameStatus>;

class UniqueOrgName implements Aggregate<UniqueOrgName> {
  static readonly type = "UniqueOrgName";
  constructor(
    readonly values: {
      readonly aggregateId: Id<UniqueOrgName>;
      readonly aggregateVersion: number;
      normalizedName: string;
      status: UniqueOrgNameStatus;
    },
  ) {}
  // ... aggregateId + aggregateVersion getters
}

function normalizeOrgName(name: string): string {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}
```

A caller then does `Id.deterministicForAggregate(UniqueOrgName, normalizeOrgName(input))` to get the contended-on id.

---

## 8. New projection (document + repo + controller)

Pattern after `app/backend/src/domain/org/projection/orgs.ts`.

```ts
export { controller, Repo<Plural>, type <Singular>Document };

import * as s from "@ambarltd/core/json/schema";
import * as m from "@ambarltd/core/maybe";
import * as d from "@ambarltd/core/json/decoder";
import { Id } from "@be/lib/eventSourcing/event";
import { accept } from "@be/lib/eventSourcing/projection";
import { ProjectionHandler, ProjectionController } from "@be/app/handleProjection";
import { Future } from "@ambarltd/core/future";
import { AmbarResponse, ErrorMustRetry } from "@be/lib/ambar";
import { Repository, Collection, MongoProjectionStore } from "@be/app/projectionStore";
// import event classes this projection consumes
import { <Event1> } from "@be/domain/<area>/events/<aggregateName>/<event1>";
import { <Event2> } from "@be/domain/<area>/events/<aggregateName>/<event2>";

// ------------------------------------------------
// Document + Repo
// ------------------------------------------------

type <Singular>Document = s.Infer<typeof schema_<Singular>Document>;

const schema_<Singular>Document = s.object({
  // fields — typically denormalized for fast reads
});

class Repo<Plural> {
  static collectionName = "<Area>_<Plural>" as const;
  static schema = schema_<Singular>Document;
  static async createIndexes(_collection: Collection<never>) {
    // await _collection.createIndex({ <field>: 1 });   // declare indexes here
    return;
  }
  static toId(doc: <Singular>Document): string {
    return doc.<idField>.value; // determines _id in Mongo
  }

  constructor(
    private repo: Repository<<Singular>Document>,
    private store: MongoProjectionStore,
  ) {}

  async save(doc: <Singular>Document): Promise<void> {
    await this.store.upsert(this.repo, doc);
  }

  async findAll(): Promise<<Singular>Document[]> {
    return this.store.find<<Singular>Document>(this.repo, {});
  }

  // add more reader methods as queries require
}

// ------------------------------------------------
// Projection
// ------------------------------------------------

type Events = m.Infer<d.Infer<typeof decoder>>;

const decoder = accept([<Event1>, <Event2>]);

const handler: ProjectionHandler<Events> = ({ event, projections }): Future<AmbarResponse, void> =>
  Future.attemptP<void>(async () => {
    const repo = projections[Repo<Plural>.collectionName];

    switch (true) {
      case event instanceof <Event1>: {
        await repo.save({ /* derived from event.values */ });
        return;
      }
      case event instanceof <Event2>: {
        // const existing = await repo.getBy...; if (!existing) return;
        await repo.save({ /* ...existing, updated fields */ });
        return;
      }
      default:
        return event satisfies never;
    }
  }).mapRej(err => new ErrorMustRetry(err.message));

const controller: ProjectionController<Events> = { decoder, handler };
```

**Also do this:**

1. Add `"/api/v1/<area>/projection/<plural>": <namespace>.controller` to `consumers.projections` in `src/index.ts` (and `import * as <namespace> from "@be/domain/<area>/projection/<plural>";`).
2. Add `[Repo<Plural>.collectionName]: await mongo.createRepository(Repo<Plural>)` to `initializeRepositories` in `src/app/projections.ts`.
3. Add `[Repo<Plural>.collectionName]: new Repo<Plural>(repos[Repo<Plural>.collectionName], mongo)` to `allProjections` in `src/app/projections.ts`.
4. If this projection should be queryable, add a query (template #2) that reads from `projections[Repo<Plural>.collectionName]`.

### Example (real)

From [`app/backend/src/domain/org/projection/orgs.ts`](../../../app/backend/src/domain/org/projection/orgs.ts) — handles `OrgCreated` (full save), `OrgNameChanged` and `OrgSlugChanged` (read-modify-write the existing doc, no-op if missing):

```ts
const decoder = accept([OrgCreated, OrgNameChanged, OrgSlugChanged]);

const handler: ProjectionHandler<Events> = ({
  event,
  projections,
}): Future<AmbarResponse, void> =>
  Future.attemptP<void>(async () => {
    const repo = projections[RepoOrgs.collectionName];

    switch (true) {
      case event instanceof OrgCreated: {
        await repo.save({
          orgId: event.values.aggregateId,
          name: event.values.name /* ... */,
        });
        return;
      }
      case event instanceof OrgNameChanged: {
        const existing = await repo.getById(event.values.aggregateId);
        if (!existing) return; // creation event hasn't landed yet — Ambar will retry
        await repo.save({ ...existing, name: event.values.name });
        return;
      }
      case event instanceof OrgSlugChanged: {
        /* same shape */ return;
      }
      default:
        return event satisfies never;
    }
  }).mapRej((err) => new ErrorMustRetry(err.message));
```

`RepoOrgs.collectionName = "Org_Orgs"`. The full file includes `findAll` and `getById` reader methods; read it for the document-schema definition and the repo class structure.

See [`reference/consumers.md`](./reference/consumers.md) for depth.

---

## 9. New reaction

Pattern after `app/backend/src/domain/invitation/reaction/emailInvitation.ts`.

```ts
export { controller };

import { Future } from "@ambarltd/core/future";
import * as d from "@ambarltd/core/json/decoder";
import { type Infer } from "@ambarltd/core/maybe";
import { accept } from "@be/lib/eventSourcing/projection";
import { ReactionHandler, ReactionController } from "@be/app/handleReaction";
import { AmbarResponse, ErrorMustRetry } from "@be/lib/ambar";
// import event(s) this reaction consumes, and any follow-up events it emits
import { <TriggerEvent> } from "@be/domain/<area>/events/<aggregateName>/<triggerEvent>";

type Events = Infer<d.Infer<typeof decoder>>;

const decoder = accept([<TriggerEvent>]);

const handler: ReactionHandler<Events> = ({ event, services, withEventStore }): Future<AmbarResponse, void> =>
  Future.attemptP<void>(async () => {
    if (!services.<serviceField>) {
      throw new Error("<ServiceField> service is not configured");
    }
    // perform the side effect — email, file upload, third-party API call, etc.
  })
    .mapRej(error => new ErrorMustRetry(error.message))
    .chain(() =>
      // OPTIONAL: emit a follow-up "marker" event for idempotency
      withEventStore(
        err => new ErrorMustRetry(err.message),
        function* (store) {
          yield* store.emit({
            aggregate: <Aggregate>,
            event: new <FollowUpEvent>({ type: <FollowUpEvent>.type, aggregateId: event.values.aggregateId }),
          });
        },
      ),
    );

const controller: ReactionController<Events> = { decoder, handler };
```

**Also do this:**

1. Add `"/api/v1/<area>/reaction/<name>": <namespace>.controller` to `consumers.reactions` in `src/index.ts`.
2. **Idempotency check** — Ambar delivers at-least-once. Either make the side effect itself safe to retry (e.g. mark "already sent" on the target before sending), or use the follow-up-event pattern above and check `store.doesEventAlreadyExist(deterministicEventId)` at the top of the handler.

### Example (real)

From [`app/backend/src/domain/invitation/reaction/emailInvitation.ts`](../../../app/backend/src/domain/invitation/reaction/emailInvitation.ts) — null-guards the email service, sends the email, then emits `InvitationSent` as a marker event:

```ts
const decoder = accept([UserInvited]);

const handler: ReactionHandler<Events> = ({
  event,
  services,
  withEventStore,
}): Future<AmbarResponse, void> =>
  Future.attemptP<void>(async () => {
    if (!services.email) throw new Error("Email service is not configured");
    const activationUrl = new URL(
      `/activate?token=${event.values.token}`,
      env.APP_URL,
    ).toString();
    const { subject, text, html } = createInvitationEmail({
      activationUrl,
      expiresAt: event.values.expiresAt,
    });
    await services.email.sendEmail({
      to: event.values.email.value,
      subject,
      html,
      text,
    });
  })
    .mapRej((error) => new ErrorMustRetry(error.message))
    .chain(() =>
      withEventStore(
        (err) => new ErrorMustRetry(err.message),
        function* (store) {
          yield* store.emit({
            aggregate: Invitation,
            event: new InvitationSent({
              type: InvitationSent.type,
              aggregateId: event.values.aggregateId,
            }),
          });
        },
      ),
    );
```

See [`reference/consumers.md`](./reference/consumers.md) for depth.

---

## 10. New auth guard (with `resolve` dependencies)

Most controllers use an inline empty `resolve: async () => {}`. Use `resolve` when the authorization check needs to read from a projection (e.g. "is this user a member of the org they're addressing?").

```ts
import { type AuthContext } from "@be/app/resolveAuth";
import { RepoOrgMemberships } from "@be/domain/orgMembership/projection/orgMemberships";
import { Id } from "@be/lib/eventSourcing/event";
import { Org } from "@be/domain/org/aggregate/org";

type Dependencies = { isOrgMember: boolean };

const resolve = async ({
  auth,
  projections,
  req,
}: {
  auth: AuthContext;
  projections: Projections;
  req: express.Request;
}): Promise<Dependencies> => {
  if (auth.actor.type !== "User") return { isOrgMember: false };
  const orgId = new Id<Org>(req.body.orgId);
  const memberships = projections[RepoOrgMemberships.collectionName];
  const membership = await memberships.findByUserAndOrg(
    auth.actor.userId,
    orgId,
  );
  return { isOrgMember: membership != null };
};

// Allow branch carries userId → keep `as const`. See reference/auth.md.
const authorize = ({
  auth,
  dependencies,
}: {
  auth: AuthContext;
  dependencies: Dependencies;
}) => {
  if (auth.actor.type !== "User")
    return {
      result: "deny",
      status: 401,
      message: "Authentication required",
    } as const;
  if (!dependencies.isOrgMember)
    return {
      result: "deny",
      status: 403,
      message: "Not a member of this org",
    } as const;
  return { result: "allow", userId: auth.actor.userId } as const;
};

type Result = ReturnType<typeof authorize>;

// In the controller:
const controller: CommandController<
  Command,
  CommandResponse,
  Result,
  Dependencies
> = {
  endpoint,
  authGuard: { resolve, authorize },
  handler,
};
```

### Example (real)

**No real `resolve`-with-dependencies guard exists in the HartAgency codebase today** — every current controller uses `resolve: async () => {}`. The "is org member?" pattern in the abstract template above is the canonical shape, drawn from common event-sourced CQRS practice. When you ship the first one, drop the example into this section so the next contributor has a reference.

See [`reference/auth.md`](./reference/auth.md) for the full pattern, including the four-param `CommandController<Req, Res, Result, Deps>` type and the `authorize` return-type contract.

---

## 11. New service

Pattern after `app/backend/src/app/services/email.ts`.

**`src/app/services/<name>.ts`:**

```ts
export { <Name>Service };

// Service classes own external integration concerns: HTTP clients, SDK instances,
// connection pools. They're constructed once at startup and re-used for the lifetime
// of the process.

class <Name>Service {
  constructor(private config: {
    // host, port, credentials, etc.
  }) {}

  async <action>(args: {...}): Promise<...> {
    // call out to the external system
  }
}
```

**`src/app/integrations.ts`:**

1. Add `<name>: <Name>Service | null;` to the `Services` type.
2. Add a private `init<Name>(): <Name>Service | null { ... }` function that returns `null` if the required env vars aren't set (graceful degradation).
3. Add `<name>: init<Name>()` to the object returned from `initializeServices()`.

**`src/app/environment.ts`:**

1. Add the new env vars (host, port, key, etc.) to `envDecoder`. Use `optionalMaybe` or `optionalDefault` if the service is optional (matches the existing email / S3 / Qdrant pattern).

**Null-guard at call sites.** Every handler that uses the service must check:

```ts
if (!services.<name>) throw new Error("<Name> service is not configured");
await services.<name>.<action>(...);
```

### Example (real)

From [`app/backend/src/app/services/email.ts`](../../../app/backend/src/app/services/email.ts) — wraps `nodemailer`, exposes `sendEmail` + `verifyConnection`:

```ts
interface EmailServiceConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: { user: string; pass: string };
  defaultFrom?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private config: EmailServiceConfig) {
    this.transporter = nodemailer.createTransport({
      /* ... */
    });
  }

  async sendEmail(options: {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    from?: string;
  }): Promise<void> {
    // call this.transporter.sendMail(...)
  }
}
```

Wired up in `app/integrations.ts` via `initEmail()` which returns `null` if `SMTP_HOST` / `SMTP_PORT` aren't set — that's why every call site null-guards.

See [`reference/services.md`](./reference/services.md) for depth.

---

## 12. New env var

Three or four files, depending on whether the var is secret and whether it ships to staging.

### Step 1 — Add to the decoder

```ts
// app/backend/src/app/environment.ts inside envDecoder
const envDecoder = D.object({
  // ... existing fields
  MY_NEW_VAR: string, // required
  MY_NEW_OPTIONAL: D.optionalMaybe(D.string), // Maybe<string>
  MY_NEW_DEFAULT: D.optionalDefault("default", string), // string with fallback
});
```

Access anywhere as `env.MY_NEW_VAR`. The decoder fails fast at startup with a human-readable message if a required var is missing.

### Step 2 — Wire it into the local manifest

Add an entry to the `hart-backend` workload's `env:` block in [`app/ambar-application-manifest.yaml`](../../../app/ambar-application-manifest.yaml). AmbarCLI interpolates `${VAR}` placeholders by pulling from Infisical at deploy time:

```yaml
env:
  - name: MY_NEW_VAR
    value: ${MY_NEW_VAR} # required — fails if missing in Infisical
  - name: MY_NEW_OPTIONAL
    value: ${MY_NEW_OPTIONAL:-} # optional — falls back to empty string
  - name: MY_NEW_DEFAULT
    value: ${MY_NEW_DEFAULT:-default} # optional — falls back to "default"
```

For values that are the same in every environment (event-store table names, replication user identifiers, etc.), inline the literal instead of using a placeholder — see `EVENT_STORE_CREATE_TABLE_WITH_NAME` in the same file.

### Step 3 — Wire it into the staging manifest (if it ships to staging)

Mirror the same entry in [`app/ambar-application-manifest.staging.yaml`](../../../app/ambar-application-manifest.staging.yaml) under `hart-backend.deploy.env`. Quote the placeholder (`value: "${MY_NEW_VAR}"`) to match the existing style.

### Step 4 — Add the value to Infisical

For each placeholder you introduced, set the actual value in the matching Infisical project / environment. Local development pulls from the `local` Infisical environment; staging deploys pull via the `INFISICAL_CLIENT_ID` / `INFISICAL_CLIENT_SECRET` machine credentials configured in [`deploy-staging-gardener.yml`](../../../.github/workflows/deploy-staging-gardener.yml).

If the value is **not** a secret (a hostname, a feature flag, a literal that's the same everywhere), skip Infisical and inline the literal in the manifests directly. Use Infisical only for secrets and per-environment overrides.

### Example (real)

`SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM` are all `optionalMaybe`/`optionalDefault` in [`environment.ts`](../../../app/backend/src/app/environment.ts) so the backend boots even when email is disabled. They follow a different injection path from a typical env var: in staging the `mail` module is configured with `provider: external` and the credentials land in the `se-first-mail-config` K8s Secret via ESO (External Secrets Operator) pulling from Infisical — see the comment at [`ambar-application-manifest.staging.yaml:49-57`](../../../app/ambar-application-manifest.staging.yaml#L49-L57). That ESO path is module-specific. For a regular new env var, follow Steps 1-4 above.
