---
name: hart-agency-design
description: Use for any UI work on Hart Agency's two surfaces — Hart Web Platforms or the Brand Ambassador Mobile App — including building screens, pages, or components, styling forms and layouts, reviewing existing UI, or extending the design system itself. Triggers even when the user says things like "make this look better" or "tweak the header" without mentioning the design system explicitly. Runs a short intake, flags conflicts between design-system / mental-model / prototype sources, and surfaces a plan before building.
---

# Hart Agency Design System

Hart Agency has two surfaces sharing one token set: **Hart Web Platforms** and the **Brand Ambassador Mobile App**. Brand is Hart Burgundy `#7D152D` on Tailwind Gray neutrals. Elevation-0 by default (shadow-none). No gradients.

Canonical specs:

- [`./design-system.md`](./design-system.md) — tokens, type, spacing, motion, composition.
- [`./educator-mobile.md`](./educator-mobile.md) — mobile chrome, transitions, frame.
- `@repo:app/frontend/src/globals.css` — live tokens (Tailwind v4 `@theme`).

Paths here use two forms. `./foo.md` is relative to this skill folder. `@repo:foo/bar` is relative to the repo root — resolve by running `git rev-parse --show-toplevel` and joining. Anything without a prefix is prose, not a literal path.

## When to use

- Building a screen, page, component, or flow for either surface.
- Reviewing existing UI against the design system.
- Extending the design system (new token, primitive, or pattern).

Skip for backend, data modeling, infra, non-Hart UI, or work that never renders pixels.

## Intake

Two things are required before building or reviewing. Ask via `AskUserQuestion` if either is missing:

1. **Scope** — Build · Review · Design-system extension.
2. **Surface** — Hart Web Platforms · Brand Ambassador Mobile App.

Everything below is conditional. Ask only when the answer actually changes the output. If you can propose a sensible default, do that and move on — don't pile up questions.

- **Build** → ask where the file/folder lives in `@repo:app/frontend/src/` only if it isn't obvious from the request.
- **Review** → ask what to review (screen/flow/component), what to prioritize (design-system compliance · prototype fidelity · UX · other), and which source leads (mental model · prototype · balanced).
- **Design-system extension** → ask what's being extended (token · primitive · pattern), and ask for a location only if there's a real decision to make.

**Context artifacts (optional).** If a mental model or prototype would meaningfully help, ask whether the user has one, both, or neither. For locations, suggest likely paths before asking for manual entry:

- Hart Ops: `models/ui/hart-ops/`, `models/experience/mm6-hart-ops-experience.yml`
- Brand Ambassador Mobile: `models/ui/educator-mobile/`, `models/experience/mm9-educator-mobile-experience.yml`
- Brand Ambassador Manager: `models/ui/educator-manager/`, `models/experience/mm8-educator-manager-experience.yml`
- Client Staff: `models/ui/client-staff/`, `models/experience/mm7-trial-client-staff-experience.yml`

Prototypes can be a repo URL or a local absolute path (may live outside this repo).

**Testing preference.** Ask once, right before presenting the plan: Playwright MCP · another MCP · manual · other.

## When sources conflict

- **Design values must come from `@design/`.** If a prototype uses a color, radius, type size, or spacing not documented in `./design-system.md` or the `@design/` folder, stop and ask — never silently adopt prototype values and never invent a substitute. Tokens drifting from globals.css is how theming breaks across surfaces.
- **Prototype layout and copy aren't automatic winners.** Prototypes carry concrete decisions (spacing, label wording, grouping) but the user may want to deviate. Confirm before locking layout or copy.

## Where code lives

- **Tokens** — `@repo:app/frontend/src/globals.css` (Tailwind v4 `@theme`). Consume via utilities (`bg-primary`, `text-muted-foreground`, `rounded-lg`). Never write raw hex in components.
- **Primitives** — `@repo:app/frontend/src/components/ui/`: `button.tsx`, `card.tsx`, `input.tsx`, `label.tsx`, `select.tsx`. CVA variants, `cn()` from `@fe/lib/utils`. Reuse before inventing.
- **Composite layouts** — `@repo:app/frontend/src/components/layout/` (`auth-layout.tsx`, `ops-layout.tsx`, …), `@repo:app/frontend/src/components/routing/protected-route.tsx`, `@repo:app/frontend/src/components/sidebar/` (nav chrome).
- **Reference wiring** — `@repo:app/frontend/src/pages/todos.tsx`.

## Workflow

1. **Read `./design-system.md`.** Pull supporting detail only as needed — matching files in `./preview/` if you already know which components apply, `./index.html` as a catalog if you don't, or the nearest shadcn primitive if nothing matches. For mobile, also read [`./educator-mobile.md`](./educator-mobile.md).
2. **Run the intake.** Scope and surface are required; everything else is conditional.
3. **Apply the conflict rules, then present the plan for approval** before touching code.
4. **Build or review** inside `@repo:app/frontend/src/`, composing existing primitives rather than inventing new type / color / spacing combos.
5. **Verify** with the chosen testing strategy, then walk the quality gates.

## Editing tokens

Full workflow in [`./design-system.md`](./design-system.md#editing-tokens). Short version: edit `@repo:app/frontend/src/globals.css`, then manually resync `./preview/tokens.css`. No `tokens.json`, no Style Dictionary. These two files are a manual mirror — changing one without the other is the most common drift source in this skill.

## Quality gates

Before reporting done:

- [ ] Colors resolve to tokens from `./design-system.md` — no raw hex outside `globals.css`.
- [ ] Type size, weight, line-height match a recipe in `./design-system.md`.
- [ ] Spacing uses the 4px scale — no arbitrary px.
- [ ] Icons are Lucide, 1.5px stroke, sized 12 / 16 / 20 / 24 / 32.
- [ ] Radius matches the 8 / 10 / 12 / 16 scale.
- [ ] No shadow unless the element is a popover / dialog / tooltip.
- [ ] Container borders are `1px solid var(--color-border)`.
- [ ] Frame matches the surface: 256+64 chrome for Hart Web Platforms, `max-w-md` for Brand Ambassador Mobile.
- [ ] Built on primitives in `@repo:app/frontend/src/components/ui/` where one fits.
- [ ] No emoji, no unicode glyph icons, no gradients, no backdrop-blur — these read as "AI-generated UI" and clash with the restrained Hart aesthetic.

## Scope

**In:** tokens, type, spacing, motion, chrome, shadcn primitives, Hart composites, Lucide icons, Inter, preview cards.

**Out:** backend, auth logic, API wiring, data modeling, non-UI frontend state, illustrations, stock photography.

**Maintainer note.** `./index.html` iframes the canonical `./preview/*.html` shards — deleting a shard breaks the catalog row, so update `index.html` alongside. There is no Figma handoff pipeline and no secondary canonical doc.
