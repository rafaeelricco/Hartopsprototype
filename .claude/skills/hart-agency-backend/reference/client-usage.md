# Client usage: consuming backend endpoints from mobile and frontend

Both [`app/frontend/`](../../../../app/frontend/) and [`app/mobile/`](../../../../app/mobile/) consume the HartAgency backend through the same mechanism: the `@be/*` tsconfig alias points into `app/backend/src/`, and clients import `.api.ts` files (or the central `api.ts`) to get typed access to every endpoint.

This page is for client developers (or AI agents working on a client) who need to wire up a backend call. For depth on `hart-agency-design` (the UI side), defer to that skill.

## The setup

Both clients have this in `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "paths": { "@be/*": ["../backend/src/*"] },
  },
  "include": ["src", "../backend/src"],
}
```

That's the whole wiring. `import { api } from "@be/api"` resolves straight into the backend source. The clients are part of the same TypeScript project graph as the backend — every change to a `.api.ts` shows up immediately in the client compile, no codegen.

## Two ways to import an endpoint

**Pattern A — central `api` (recommended):**

```ts
import { api } from "@be/api";
import { call } from "@/api/request";

await call(api.command.auth_mobileSignIn, { email, password });
const me = await call(api.command.auth_query_mobileMe, {});
```

One import gets you the entire endpoint catalog. IDE autocomplete on `api.command.` shows every command; `api.query.` shows every query.

**Pattern B — per-endpoint import (still works):**

```ts
import { endpoint as mobileSignInEndpoint } from "@be/domain/auth/command/mobileSignIn.api";
await call(mobileSignInEndpoint, { email, password });
```

Use Pattern B when bundle-size matters and you don't want the bundler to pull in metadata for unused endpoints, or when you're already importing types from the same file.

## The `call` helper

Each client has its own `call` helper at `app/<client>/src/api/request.ts`. It accepts a `PlainEndpoint<Req, Res>` and a `Req`, posts the body to `endpoint.path`, validates the response against `endpoint.response`, and returns `Promise<Res>`.

The fact that `call` derives the URL and the response type from the `endpoint` object is why centralizing endpoints in `api.ts` works — call sites only need the endpoint object, not its path.

## Type extraction

```ts
import type { s } from "@ambarltd/core/json/schema";
import { api } from "@be/api";

type SignInRequest = s.Infer<typeof api.command.auth_mobileSignIn.request>;
type SignInResponse = s.Infer<typeof api.command.auth_mobileSignIn.response>;
```

Or from the per-endpoint file:

```ts
import type {
  Command as MobileSignInRequest,
  CommandResponse as MobileSignInResponse,
} from "@be/domain/auth/command/mobileSignIn.api";
```

## Tree-shaking note

Importing the central `api` references every endpoint object by name. Bundlers cannot tree-shake these out, so a client that imports `api` pulls in the metadata for **every** endpoint (currently ~22). The cost is small: each `PlainEndpoint` is a path string and two schema objects. No logic, no DB code, no server internals. Total bundle weight is on the order of kilobytes.

If you're optimizing a hot screen and every kilobyte counts, fall back to per-endpoint imports.

## Schemas are real values at runtime

Unlike TypeScript types (which evaporate at compile time), `@ambarltd/core/json/schema` schemas are runtime objects. The `call` helper uses them to:

- Serialize the request body (e.g. converting `Id<Org>` instances to their string `.value`).
- Validate the response body (rejecting if the server returns a shape that doesn't match `endpoint.response`).

A backend that ships a malformed response gets caught at the client boundary, not at the call site. You don't need to write defensive parsing in your screens — the schema does it.

You can use the same value types on both sides. `Email`, `PhoneNumber`, `Url`, `Id<X>` are classes whose schemas serialize to / deserialize from strings. The client constructs `new Email("...")` to send; the server reads an `Email` instance from `payload`.

## Cross-skill workflow

A client change that _requires_ a backend change is a cross-skill task. Clean handoff order:

1. Switch to `hart-agency-backend` for the backend portion. Add or modify the endpoint.
2. Run `tsc --noEmit` in `app/backend/`.
3. Switch back to client work. The `@be/api` import surfaces the new endpoint immediately.
4. Build the call site against the new endpoint.
5. Run `tsc --noEmit` in the client.

Doing it in this order means the schemas and types flow cleanly. Doing client work first and "we'll wire up the backend later" leads to compile errors and friction.

## Frontend / mobile call-site quality gates

- [ ] Endpoint imported from `@be/api` (preferred) or the matching `.api.ts` file. Never invent a path string.
- [ ] Request body matches the endpoint's request schema. Don't `as` cast — let TypeScript infer from `call(endpoint, ...)`.
- [ ] Errors handled at the call site. The `call` helper rejects on non-2xx responses; pick up the error and surface it in the UI.
- [ ] No schema duplication. Derive types from the endpoint (`s.Infer<typeof api.command.X.request>`) rather than redeclaring.
