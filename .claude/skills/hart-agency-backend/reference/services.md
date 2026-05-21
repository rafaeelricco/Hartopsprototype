# Services

Services are HartAgency's wrappers around **external integrations**: SMTP, S3-compatible storage, Qdrant. Each service is constructed once at startup and re-used for the process lifetime. The `Services` type lives in [`app/backend/src/app/integrations.ts`](../../../../app/backend/src/app/integrations.ts).

→ Skeleton: [`templates.md#11-new-service`](../templates.md#11-new-service).

## The `Services` type

```ts
type Services = {
  fileStorage: FileStorageService | null;
  email: EmailService | null;
  vectorDatabase: VectorDatabase | null;
};
```

**Every field is nullable.** A service is `null` when the env vars to configure it are absent. This is intentional — local dev environments without SMTP credentials should boot anyway, and handlers that don't need email work fine.

## The lifecycle

1. **`initializeServices()`** runs once in `configureDependencies`. It calls `initEmail()`, `initFileStorage()`, `initVectorDatabase()`, each of which inspects the relevant env vars:

   ```ts
   function initEmail(): EmailService | null {
     if (!(env.SMTP_HOST.isJust() && env.SMTP_PORT)) return null;
     return new EmailService({ host: ..., port: ..., ... });
   }
   ```

   `env.X.isJust()` is the `Maybe` API — true when the env var is set. If the required pieces aren't present, return `null`.

2. **Services are passed to every handler.** Commands, queries, and reactions all receive `services: Services` in their handler args.

3. **Null-guard at every call site.** TypeScript forces this — calling `services.email.sendEmail(...)` without checking `services.email` is a type error. The standard idiom:

   ```ts
   if (!services.email) throw new Error("Email service is not configured");
   await services.email.sendEmail({ ... });
   ```

   For reactions, the throw becomes `ErrorMustRetry` via `mapRej`, which is the right behavior (Ambar will keep retrying until the service is configured).

## Services vs reactions

A service is **how** to call an external system. A reaction is **when** to call it. The pattern is almost always:

- A command emits a domain event.
- A reaction subscribes to that event.
- The reaction calls a service to perform the side effect.

Don't call services directly from commands when the side effect is meant to follow a domain change — that bypasses the event log and makes the side effect non-idempotent. Use a reaction.

Exceptions where a command calls a service directly:

- The side effect is the _point_ of the command (e.g. a "send test email" admin endpoint).
- The side effect must complete synchronously before the command response (rare — most are eventually-consistent).
- The integration produces data the command needs before emitting an event (e.g. uploading an image and getting back a URL to store).

When in doubt: emit the event, react to it. See [`consumers.md`](./consumers.md) for the reaction pattern.

## Services and transactions

Services live **outside** the event-sourcing transaction. A `withEventStore(...)` rolls back the Postgres event-store transaction but **cannot roll back** an SMS or S3 upload that already happened. This is why side effects belong in reactions: by the time a reaction fires, the event has already committed, so the side effect is responding to a fact, not an intention.

A consequence: services should never be called _inside_ a `withEventStore` generator. The generator is synchronous and the service calls are async — TypeScript will reject it.

## Existing services

| Service                  | Class                                                | File                           | Env vars                                                                       |
| ------------------------ | ---------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------ |
| Email (SMTP)             | `EmailService`                                       | `app/services/email.ts`        | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM`        |
| File Storage (S3)        | `FileStorageService`                                 | `app/services/file-storage.ts` | `S3_ENDPOINT`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_BUCKET_NAME`, `S3_REGION` |
| Vector Database (Qdrant) | `QdrantVectorDatabase` (implements `VectorDatabase`) | `lib/vectorDatabase/Qdrant.ts` | `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`                                 |

The `Services` type's interface (e.g. `VectorDatabase`) is what handlers see. The concrete class (e.g. `QdrantVectorDatabase`) is wired in `initializeServices`. This indirection lets you swap implementations (e.g. a fake for tests) without touching handler code.

## Quality gates specific to services

- [ ] Service class lives in `src/app/services/<name>.ts`.
- [ ] Service field on `Services` is `Service | null`.
- [ ] Env vars use `optionalString` / `optionalMaybe` / `optionalDefault` — the service degrades to `null` when absent.
- [ ] Every call site null-guards the service.
- [ ] Side effects fire from reactions, not commands (unless the side effect is the point of the command).
- [ ] Services are never called inside a `withEventStore` generator.
