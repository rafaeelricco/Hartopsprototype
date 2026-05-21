# Hart Agency Design System

The complete Hart Agency design language: brand, color, typography, spacing, and components. This is the single authoritative page. Visual previews live next to each section as links into [`preview/`](preview/) cards; canonical tokens live in [`/app/frontend/src/globals.css`](../app/frontend/src/globals.css).

For the mobile surface spec (frame, primitives, screens), see [`educator-mobile.md`](educator-mobile.md).

---

## Overview

Hart Agency's design language is deliberately **flat, border-based, elevation-0, left-aligned** — closer to Linear or shadcn-default than to a consumer brand. One brand color (Hart Burgundy `#7D152D`) paired with Tailwind's Gray neutrals, Inter at three weights, and a 1-pixel rule on every container. Two product surfaces share a single token set: **Hart Ops** (desktop web) and **Educator Mobile** (PWA).

Hart Ops is the internal operations platform (Dashboard, Account Master, Educators, Events, Availability, Organizations, Reports, Settings). Educator Mobile is the field-facing PWA companion running check-ins, live events, and venue intelligence. Both surfaces diverge mainly in frame constants and motion vocabulary.

### The eleven non-negotiables

- **One brand color.** Hart Burgundy `#7D152D`. No second accent.
- **Neutrals.** Tailwind Gray family only (`#F9FAFB` → `#111827`). Borders `#E5E7EB`, 1px always.
- **Elevation-0 default.** Shadows only on floating overlays (popover, dialog, tooltip).
- **No gradients, patterns, glass, or backdrop-blur.** The area chart fill is the sole exception.
- **Lucide icons only.** 1.5px stroke, sizes 12/16/20/24/32. No emoji, no unicode glyphs, no hand-rolled SVGs.
- **Inter only.** 400 body, 500 UI chrome, 600 titles and metrics.
- **Left-aligned by default.** Numeric columns use `tabular-nums` right-aligned.
- **The 1-pixel rule.** Every container uses `1px solid #E5E7EB`.
- **Corner radius scale.** sm 8 · md 10 · lg 12 · xl 16. Buttons/inputs use md; cards use lg.
- **4px spacing base.** Dominant rhythms `gap-2` (8) · `gap-4` (16) · `p-6` (24) · `space-y-6`.
- **Frame constants.** Hart Ops = 256px sidebar + 64px header. Educator Mobile = `max-w-md` (390px).

---

## Brand language

The brand principles set the tone for every subsequent decision. The logo is always displayed at 64px on the auth screen — the only image surface in chrome. Iconography is Lucide at five canonical sizes, 1.5px stroke.

**Preview:** [`preview/brand-principles.html`](preview/brand-principles.html) · [`preview/brand-logo.html`](preview/brand-logo.html) · [`preview/brand-iconography.html`](preview/brand-iconography.html)

### Logo

Primary mark: [`assets/hart-agency-logo.png`](assets/hart-agency-logo.png) — horizontal lockup, 226×170 px PNG. Auth screen renders at 64px tall (`h-16`). No other display sizes defined. No alternate mark, monogram, or favicon is available.

### Iconography

[Lucide](https://lucide.dev) only — imported as `lucide-react` (0.545.x) via named imports. 1.5px stroke, stroke-only (never filled). Color inherits `currentColor`; tint with semantic text classes.

| Context                             | Size   | Tailwind     |
| ----------------------------------- | ------ | ------------ |
| Dense contexts (badges, xs buttons) | 12     | `size-3`     |
| **Default** (body, buttons, cards)  | **16** | **`size-4`** |
| Sidebar nav                         | 20     | `size-5`     |
| Section headers, icon buttons       | 24     | `size-6`     |
| Stat-card illustrations             | 32     | `size-8`     |

Pair with semantic text classes: `text-muted-foreground` for decorative chrome, `text-primary` for brand-active, `text-destructive` for destructive actions. Never: emoji, unicode glyphs (↑ ✓ ❤ ›), Material/FontAwesome/Heroicons, hand-rolled SVGs for generic concepts.

### Voice and tone

The platform speaks about itself, not to the user. Copy is short, specific, and tool-like — closer to a CLI man page than to marketing. Third-person operational, no "we", minimal "you". No jokes, no exclamation marks, no emoji.

- **Page titles:** noun phrases — "Dashboard", "Account Master", "Educator Detail".
- **Page subtitles:** one short sentence, sentence case, period — "Platform overview and key metrics at a glance."
- **Buttons:** verb-first, 1–2 words — "Sign In", "Add Account", "Continue", "Clear filters".

| Context                    | Rule                     | Examples                                      |
| -------------------------- | ------------------------ | --------------------------------------------- |
| Headings, section titles   | **Sentence case**        | "Platform overview", "Recent events"          |
| Short labels in tables/nav | **Title Case**           | "Account Name", "Events Hosted", "Last Event" |
| Overlines, eyebrow labels  | **UPPERCASE + tracking** | "CONTACT & LOCATION", "VENUE PROFILE"         |
| Status values              | **Title Case**           | "Active", "Inactive", "Prospect", "Trial"     |

- **Empty/zero states:** use an em-dash (`—`), not "N/A" or "None".
- **Numbers:** tabular nums for counts and money. Percent deltas show sign and unit: `+12.3%`, `-0.3`.
- **Error copy:** direct. "Invalid email or password. Please try again." Never hedge with "Something went wrong."
- **Auth footer:** formal-legal. "By clicking continue, you agree to our Terms of Service and Privacy Policy."

Hard rules: no emoji, no unicode decoration (↑ ✓ ❤), icons carry all non-text meaning, no exclamation marks, no hedging language.

---

## Color system

One brand color for primary action, active nav, focus rings, and chart series 1. Everything else is Tailwind Gray. Status uses soft tinted badges. The four semantic colors (success, warning, error, info) are reserved for system feedback.

Every token below is defined in [`globals.css`](../app/frontend/src/globals.css) inside the `@theme { }` block. Line refs are absolute to that file.

### Brand

| Token                        | Hex       | Usage                                                                        |
| ---------------------------- | --------- | ---------------------------------------------------------------------------- |
| `--color-primary`            | `#7D152D` | Primary buttons, active nav, focus rings, chart-1, chip backgrounds at `/8`. |
| `--color-primary-foreground` | `#FFFFFF` | Text on primary backgrounds.                                                 |
| `--color-ring`               | `#7D152D` | Focus-visible ring (paired with 3px + `/50` opacity).                        |

Defined in `globals.css:19–21`. **Preview:** [`preview/colors-brand.html`](preview/colors-brand.html).

### Burgundy scale

10-step burgundy ramp derived from the brand color (50 → 900).

| Step                  | Hex       | Typical use                   |
| --------------------- | --------- | ----------------------------- |
| `--color-primary-50`  | `#f8f3f4` |                               |
| `--color-primary-100` | `#f5e4e8` |                               |
| `--color-primary-200` | `#efc1cc` |                               |
| `--color-primary-300` | `#ec8ca2` |                               |
| `--color-primary-400` | `#ec4a70` |                               |
| `--color-primary-500` | `#7D152D` | = `--color-primary`           |
| `--color-primary-600` | `#b61036` | Hover shade on dense surfaces |
| `--color-primary-700` | `#850d29` |                               |
| `--color-primary-800` | `#5a0b1d` |                               |
| `--color-primary-900` | `#340913` |                               |

Defined in `globals.css:24–33`. **Preview:** [`preview/colors-primary-scale.html`](preview/colors-primary-scale.html).

### Neutrals (Tailwind Gray)

The only neutral family Hart uses. Pure `#000` and `#FFF` live in the base swatch — they aren't steps in this ramp.

| Token                          | Hex       | Usage                                                     |
| ------------------------------ | --------- | --------------------------------------------------------- |
| `--color-background`           | `#F9FAFB` | App background (Gray 50).                                 |
| `--color-foreground`           | `#111827` | Primary text (Gray 900).                                  |
| `--color-card`                 | `#FFFFFF` | Card container fill — always white.                       |
| `--color-card-foreground`      | `#111827` | Text on cards.                                            |
| `--color-popover`              | `#FFFFFF` | Popover/dropdown fill.                                    |
| `--color-popover-foreground`   | `#111827` | Text inside popovers.                                     |
| `--color-secondary`            | `#F3F4F6` | Secondary button fill (Gray 100).                         |
| `--color-secondary-foreground` | `#111827` | Text on secondary.                                        |
| `--color-muted`                | `#F3F4F6` | Muted/hover fill (Gray 100).                              |
| `--color-muted-foreground`     | `#6B7280` | Muted/helper text (Gray 500).                             |
| `--color-accent`               | `#F3F4F6` | Outline/ghost hover fill.                                 |
| `--color-accent-foreground`    | `#111827` | Text on accent hover.                                     |
| `--color-border`               | `#E5E7EB` | **The 1px rule** — every container/card/input (Gray 200). |
| `--color-input`                | `#E5E7EB` | Input border.                                             |
| `--color-input-background`     | `#F9FAFB` | Input fill.                                               |
| `--color-switch-background`    | `#D1D5DB` | Switch off-state (Gray 300).                              |

Defined in `globals.css` (`@theme` neutrals block). Full Gray scale also exposed as `--color-gray-50`…`--color-gray-900` for utility access. **Preview:** [`preview/colors-neutrals.html`](preview/colors-neutrals.html).

### Semantic

Four roles: `success`, `warning`, `error`, `info`. Each maps to a base hue and to a soft tinted slot for badges, alerts, and inline feedback.

| Token                            | Hex       | Usage                             |
| -------------------------------- | --------- | --------------------------------- |
| `--color-destructive`            | `#EF4444` | Destructive actions, error state. |
| `--color-destructive-foreground` | `#FFFFFF` | Text on destructive.              |
| `--color-success`                | `#22C55E` | Confirmations, positive states.   |
| `--color-warning`                | `#F59E0B` | Cautions, pending states.         |
| `--color-info`                   | `#3B82F6` | Informational highlights.         |

Defined in `globals.css:63–67`.

**Status badges (soft-tinted)**

| State                       | Background | Foreground | Usage                |
| --------------------------- | ---------- | ---------- | -------------------- |
| `--color-badge-active-*`    | `#DCFCE7`  | `#16A34A`  | Active / Live        |
| `--color-badge-trial-*`     | `#FEF9C3`  | `#CA8A04`  | Trial / Upcoming     |
| `--color-badge-completed-*` | `#F3F4F6`  | `#6B7280`  | Completed / Inactive |

Defined in `globals.css:70–75`. **Preview:** [`preview/colors-semantic.html`](preview/colors-semantic.html).

### Base colors

Pure white and pure black kept separate from the gray ramp. White is the default surface; black shows up rarely — reserved for true black ink needs (print, logo lockups on light stock). For UI text, use Gray 900 instead. **Preview:** [`preview/colors-base.html`](preview/colors-base.html).

### Opacity conventions

Transparency is expressed via Tailwind modifiers on solid colors — never as separate tokens.

| Pattern               | Use case                                           |
| --------------------- | -------------------------------------------------- |
| `bg-primary/8`        | Active nav chip, brand-tinted backgrounds          |
| `bg-primary/90`       | Primary button hover                               |
| `bg-secondary/80`     | Secondary button hover                             |
| `bg-muted/50`         | List-row hover                                     |
| `ring-primary/50`     | Focus ring (paired with `border-ring` + 3px width) |
| `ring-destructive/20` | Invalid state ring                                 |
| `bg-black/50`         | Modal scrim                                        |

### Retired on desktop (do not use on Hart Web)

- `#0F766E` teal — formerly "accent" per older docs. Dropped from [`globals.css`](../app/frontend/src/globals.css); `--color-accent` maps to neutral gray on web. Educator Mobile still uses `--color-teal` — see [`educator-mobile.md`](educator-mobile.md#mobile-only-tokens).
- `--neutral-50…900` warm neutrals — referenced in earlier drafts but never wired. Not present in `globals.css`.

---

## Typography

**Inter only.** 400 for body, 500 for UI chrome, 600 for titles and metrics. The scale runs 12 / 14 / 16 / 18 / 20 / 24 with 1.5 line-height, tightening to 1 / 1.25 for dense metrics. Overlines — dense uppercase eyebrows at 12/600/0.1em — are the single exception to left-alignment-and-neutral-tracking.

**Preview:** [`preview/type-family.html`](preview/type-family.html) · [`preview/type-scale.html`](preview/type-scale.html) · [`preview/type-recipes.html`](preview/type-recipes.html) · [`preview/type-overline.html`](preview/type-overline.html)

### Family

| Token         | Stack                                                                | Usage                                                             |
| ------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `--font-sans` | `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | **All UI and body copy.**                                         |
| `--font-mono` | `ui-monospace, SFMono-Regular, Menlo, monospace`                     | `<code>` and `<pre>` only. Native mono stack — no custom webfont. |

Defined in `globals.css:78–80`. Inter is loaded as a variable font (weights 100–900, with `opsz` and `ital` axes) via Google Fonts — the `<link>` tags live in [`/app/frontend/index.html`](../app/frontend/index.html). Embed reference at [`assets/fonts.md`](assets/fonts.md).

### Size scale

| Token         | Value      | px  | Typical use                          |
| ------------- | ---------- | --- | ------------------------------------ |
| `--text-xs`   | `0.75rem`  | 12  | Overlines, dense badges, caption     |
| `--text-sm`   | `0.875rem` | 14  | **Body default.** Tables, paragraphs |
| `--text-base` | `1rem`     | 16  | Labels, inputs                       |
| `--text-lg`   | `1.125rem` | 18  | H3, emphasized body                  |
| `--text-xl`   | `1.25rem`  | 20  | H2, subsection titles                |
| `--text-2xl`  | `1.5rem`   | 24  | **H1 / page titles**, stat values    |
| `--text-3xl`  | `1.875rem` | 30  | Rare — only for hero moments         |
| `--text-4xl`  | `2.25rem`  | 36  | Not typically used in-product        |
| `--text-5xl`  | `3rem`     | 48  | Not typically used in-product        |

Defined in `globals.css:83–91`.

### Weight and line-height

| Weight                   | Value | Use                                                                 |
| ------------------------ | ----- | ------------------------------------------------------------------- |
| `--font-weight-normal`   | `400` | Body text                                                           |
| `--font-weight-medium`   | `500` | **UI chrome default** — labels, buttons (secondary), section titles |
| `--font-weight-semibold` | `600` | Dialog titles, stat values, active nav, overlines, button (primary) |
| `--font-weight-bold`     | `700` | Rare. Only for hard emphasis.                                       |

| Line-height        | Value   | Use                             |
| ------------------ | ------- | ------------------------------- |
| `--leading-none`   | `1`     | Single-line labels, stat values |
| `--leading-tight`  | `1.25`  | Dense metrics, compact headings |
| `--leading-snug`   | `1.375` | Secondary headings              |
| `--leading-normal` | `1.5`   | **Body default**                |

Defined in `globals.css:94–103`.

### Semantic recipes

Recurring text treatments. Match one of these rather than inventing new combinations.

| Name                | Size        | Weight | Line-height | Case/tracking                     |
| ------------------- | ----------- | ------ | ----------- | --------------------------------- |
| h1 (page title)     | `2xl` (24)  | 500    | normal      | sentence                          |
| h2 (section)        | `xl` (20)   | 500    | normal      | sentence                          |
| h3                  | `lg` (18)   | 500    | normal      | sentence                          |
| h4                  | `base` (16) | 500    | normal      | sentence                          |
| body                | `base` (16) | 400    | normal      | —                                 |
| body-sm / paragraph | `sm` (14)   | 400    | normal      | —                                 |
| caption / small     | `xs` (12)   | 400    | normal      | muted-foreground                  |
| label               | `base` (16) | 500    | none        | —                                 |
| overline            | `xs` (12)   | 600    | tight       | **UPPERCASE**, `tracking-[0.1em]` |
| stat value          | `2xl`+ (28) | 600    | none        | tabular-nums                      |
| button (primary)    | `sm` (14)   | 600    | none        | —                                 |
| button (secondary)  | `sm` (14)   | 500    | none        | —                                 |

---

## Layout and spacing

4px base scale. Four rhythms dominate: `gap-2` (8), `gap-4` (16), `p-6` (24 card/page padding), `space-y-6` (24 vertical between blocks). Corner radius follows a four-step scale. Elevation sits at zero by default — shadows are reserved for floating overlays only.

**Preview:** [`preview/spacing-scale.html`](preview/spacing-scale.html) · [`preview/radius.html`](preview/radius.html) · [`preview/elevation.html`](preview/elevation.html)

Tailwind v4 derives every `p-*`, `m-*`, `gap-*`, `space-y-*` utility from the 4px base. No custom `--spacing-*` tokens are declared.

### Spacing scale

| Utility | Value | Use                                                          |
| ------- | ----- | ------------------------------------------------------------ |
| `0.5`   | 2px   | Sub-pixel tweaks (rare)                                      |
| `1`     | 4px   | Icon-to-label gap in dense contexts                          |
| `1.5`   | 6px   | Card header title→description gap                            |
| `2`     | 8px   | **Dominant small gap** (`gap-2`)                             |
| `3`     | 12px  | Inline-form label→input                                      |
| `4`     | 16px  | **Dominant medium gap** (`gap-4`)                            |
| `6`     | 24px  | **Page/card padding** (`p-6`), section spacing (`space-y-6`) |
| `8`     | 32px  | Section separator                                            |
| `10`    | 40px  | Page vertical rhythm                                         |
| `12`    | 48px  | Hero spacing                                                 |
| `16`    | 64px  | Mobile footer pad                                            |

Dominant rhythms:

| Pattern          | Where it shows up                                  |
| ---------------- | -------------------------------------------------- |
| `gap-2`          | Inline label + value pairs, icon + text in buttons |
| `gap-4`          | Form fields, grid columns at `md+`                 |
| `p-6`            | Every card. Every page wrapper.                    |
| `space-y-6`      | Vertical rhythm between cards/sections             |
| `px-6 pt-6 pb-6` | Card header / content / footer padding             |

### Layout constants

Hard-coded dimensions, not token-based — anyone re-implementing the frame must use these.

**Desktop (Hart Ops)**

| Element                   | Dimension                              |
| ------------------------- | -------------------------------------- |
| Sidebar expanded          | `16rem` (256px)                        |
| Sidebar collapsed         | `3rem` (48px)                          |
| Header height             | `64px`                                 |
| Header height (collapsed) | `48px`                                 |
| Dialog max-width          | `32rem` (512px)                        |
| Content wrapper           | `p-6 space-y-6 w-full`                 |
| Grid at `sm+`             | `grid-cols-2 gap-4`                    |
| Grid at `lg+`             | `grid-cols-3` or `grid-cols-4` `gap-4` |

**Mobile (Educator Mobile)** — see [`educator-mobile.md`](educator-mobile.md) for the full spec.

### Breakpoints

Tailwind defaults — not customized.

| Token | Value    |
| ----- | -------- |
| `sm`  | `640px`  |
| `md`  | `768px`  |
| `lg`  | `1024px` |
| `xl`  | `1280px` |
| `2xl` | `1536px` |

### Corner radius

| Token                      | Value                              | Use                                |
| -------------------------- | ---------------------------------- | ---------------------------------- |
| `--radius-xs`              | `2px`                              | —                                  |
| `--radius-sm`              | `calc(var(--radius) - 4px)` = 8px  | Small chips, compact badges        |
| `--radius-md`              | `calc(var(--radius) - 2px)` = 10px | **Buttons, inputs, badges**        |
| `--radius` = `--radius-lg` | `0.75rem` = 12px                   | **Cards, alerts, dialogs, sheets** |
| `--radius-xl`              | `calc(var(--radius) + 4px)` = 16px | —                                  |
| `--radius-full`            | `9999px`                           | Avatars, pills                     |

Defined in `globals.css` (`@theme` radius tokens; `--radius: 0.75rem` base).

### Borders and elevation

**The 1-pixel rule:** every container, card, divider, and input uses `1px solid #E5E7EB`. Strong borders (`#D1D5DB`) are reserved for active dividers. Never dashed, never dotted, never thicker than 2px (focus rings use a 3px ring instead).

**Elevation 0 by default for in-flow surfaces.** Buttons and layout containers stay flat. Shadows are used on floating overlays, and on the shadcn Card primitive (legacy default — see [Cards](#cards)):

- `shadow-xs` — inputs, outline buttons (near-invisible 1px hint).
- `shadow-sm` — Card primitive, popovers, dropdowns, floating sidebar.
- `shadow-lg` — dialog, sheet, drawer.
- `shadow-xl` — tooltips, chart tooltips.

No inner shadows anywhere. No glassmorphism, no backdrop-blur.

---

## Motion

Subtle on desktop (hover states, chevron nudges); screen-level on mobile (routing, sheet rise). All motion tokens live in `globals.css` inside `@theme { }`. **Preview:** [`preview/motion.html`](preview/motion.html).

### Durations

| Token               | Value   | Use                                                                   |
| ------------------- | ------- | --------------------------------------------------------------------- |
| `--duration-fast`   | `100ms` | Micro feedback (press flash, focus ring fade)                         |
| `--duration-normal` | `200ms` | **Standard UI transition.** Hover fills, dropdown reveal, color-mode. |
| `--duration-slow`   | `300ms` | Sheet close, cross-fade between panels                                |
| `--duration-slower` | `500ms` | Sheet open (mobile bottom-sheet rise)                                 |

Defined in `globals.css:123–126`. `1000ms` is reserved for caret blink only.

### Easing

| Token           | Value                               | Use                                                           |
| --------------- | ----------------------------------- | ------------------------------------------------------------- |
| `--ease-linear` | `cubic-bezier(0, 0, 1, 1)`          | Sidebar width / position — preserves mechanical feel          |
| `--ease-in`     | `cubic-bezier(0.4, 0, 1, 1)`        | Rare — exit transitions                                       |
| `--ease-out`    | `cubic-bezier(0, 0, 0.2, 1)`        | Entering elements (fade-in, dropdown reveal)                  |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)`      | **Default** for any hover, color transition, layout shift     |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful bumps (success scale, toast slide-in). Use sparingly. |

Defined in `globals.css:128–132`.

### Screen-transition patterns (mobile)

| Pattern               | Transform                        | Duration                 | Easing                               | Use                                       |
| --------------------- | -------------------------------- | ------------------------ | ------------------------------------ | ----------------------------------------- |
| **Forward push**      | `x: 50 → 0` in; `x: 0 → -50` out | 350ms                    | `ease-in-out`                        | Navigating deeper (Home → Event Detail)   |
| **Bottom-sheet rise** | `y: 50 → 0` in; `y: 0 → 50` out  | 500ms open / 300ms close | `ease-spring` open, `ease-out` close | Modals, filters, menus                    |
| **Cross-fade**        | `opacity: 0 → 1` + subtle `y`    | 300ms                    | `ease-in-out`                        | Sibling-screen transitions, tab-switching |
| **Success scale**     | `scale: 0.95 → 1`                | 400ms                    | `ease-spring`                        | Confirmation screens (check-in complete)  |

Press feedback: `whileTap={{ scale: 0.95 }}` for primary tappables, `0.98` for dense targets (list rows, nav items). No haptics.

Desktop hover/press use `transition-colors duration-200 ease-in-out` on the element's wrapper. Opacity-only hovers (primary button → `bg-primary/90`) inherit this implicitly.

`prefers-reduced-motion` is not yet wired. When respected: motion patterns fall back to instantaneous; success scale → opacity fade only; bottom-sheet rise → cross-fade only.

---

## Components

Every container uses the 1-pixel rule. Buttons and inputs share the md radius (10px); cards use xl (16px). Ghost/outline variants hover to `bg-accent`; primary hovers to `bg-primary/90`. Focus-visible is always 3px `ring-ring/50`.

Source of truth for implementation is the shadcn components in [`/app/frontend/src/components/ui/`](../app/frontend/src/components/ui/).

### Buttons

Primary, secondary, outline, ghost, destructive, link. Consumes `--color-primary`, `--color-secondary`, `--color-destructive`. **Preview:** [`preview/components-buttons.html`](preview/components-buttons.html).

**Sizes (desktop)**

| Size          | Height | Px-padding      | Text          | Weight                              |
| ------------- | ------ | --------------- | ------------- | ----------------------------------- |
| `sm`          | 36     | `px-3`          | `sm` (14)     | 500                                 |
| **`default`** | **40** | **`px-4 py-2`** | **`sm` (14)** | **500 (secondary) / 600 (primary)** |
| `lg`          | 44     | `px-8`          | `sm` (14)     | 600                                 |
| `icon`        | 40×40  | —               | —             | —                                   |

Radius: `rounded-md` (10px) for all sizes.

**Variants**

| Variant       | Background       | Text                          | Hover                                          | Border                |
| ------------- | ---------------- | ----------------------------- | ---------------------------------------------- | --------------------- |
| `default`     | `bg-primary`     | `text-primary-foreground`     | `hover:bg-primary/90`                          | none                  |
| `secondary`   | `bg-secondary`   | `text-secondary-foreground`   | `hover:bg-secondary/80`                        | none                  |
| `outline`     | transparent      | `text-foreground`             | `hover:bg-accent hover:text-accent-foreground` | `border border-input` |
| `ghost`       | transparent      | `text-foreground`             | `hover:bg-accent hover:text-accent-foreground` | none                  |
| `destructive` | `bg-destructive` | `text-destructive-foreground` | `hover:bg-destructive/90`                      | none                  |
| `link`        | transparent      | `text-primary`                | `hover:underline`                              | none                  |

**Mobile primary CTA** — 48px height (`h-12`), full width, `rounded-lg` (12px), Inter 15/600, press `whileTap={{ scale: 0.95 }}`. See [`educator-mobile.md`](educator-mobile.md).

### Inputs

**Preview:** [`preview/components-inputs.html`](preview/components-inputs.html).

| Property           | Value                                        |
| ------------------ | -------------------------------------------- |
| Height             | `40px` (`h-10`)                              |
| Horizontal padding | `px-3` (12px)                                |
| Text size          | `sm` (14)                                    |
| Border             | `1px solid var(--color-input)`               |
| Background         | `var(--color-input-background)`              |
| Radius             | `rounded-md` (10px)                          |
| Placeholder color  | `text-muted-foreground`                      |
| Focus ring         | `ring-ring/50` 3px + `border-ring`           |
| Disabled           | `opacity-50` + `cursor-not-allowed`          |
| Invalid            | `border-destructive` + `ring-destructive/20` |

Label: `sm` (14) at weight `500`, gap to input `mb-2` (8px).

### Badges

**Preview:** [`preview/components-badges.html`](preview/components-badges.html).

Radius `rounded-full` (9999), horizontal padding `px-2` (8px), vertical `py-0.5` (2px), text `11px` (`text-[0.6875rem]`), weight `600`.

| Variant     | Background                         | Text                        |
| ----------- | ---------------------------------- | --------------------------- |
| `default`   | `bg-primary`                       | `text-primary-foreground`   |
| `secondary` | `bg-secondary`                     | `text-secondary-foreground` |
| `outline`   | transparent, `border border-input` | `text-foreground`           |
| `active`    | `bg-badge-active-bg`               | `text-badge-active-fg`      |
| `trial`     | `bg-badge-trial-bg`                | `text-badge-trial-fg`       |
| `completed` | `bg-badge-completed-bg`            | `text-badge-completed-fg`   |

### Cards

The dominant container. **Always `rounded-lg` (12px) + `border` + `shadow-sm`.** **Preview:** [`preview/components-card.html`](preview/components-card.html).

```
bg-card text-card-foreground rounded-lg border shadow-sm
```

**Anatomy**

| Part              | Classes                                              |
| ----------------- | ---------------------------------------------------- |
| `CardHeader`      | `flex flex-col space-y-1.5 p-6`                      |
| `CardTitle`       | `text-2xl font-semibold leading-none tracking-tight` |
| `CardDescription` | `text-sm text-muted-foreground`                      |
| `CardContent`     | `p-6 pt-0`                                           |
| `CardFooter`      | `flex items-center p-6 pt-0`                         |

`CardHeader` fills `p-6` on all sides; `CardContent` and `CardFooter` share `p-6 pt-0`, letting the header's 24px bottom flow into the body without doubling the seam.

### Navigation

Sidebar nav (desktop) and bottom nav (mobile) share a two-state pattern. Active indicator is `bg-primary/8` + `text-primary` + weight 600 — the only place the brand color lives in chrome. **Preview:** [`preview/components-nav.html`](preview/components-nav.html).

| State            | Background     | Text                    | Weight |
| ---------------- | -------------- | ----------------------- | ------ |
| **Active**       | `bg-primary/8` | `text-primary`          | 600    |
| Inactive         | transparent    | `text-muted-foreground` | 500    |
| Hover (inactive) | `bg-muted/50`  | `text-foreground`       | 500    |

**Desktop sidebar item** — height 40px, icon 20 (`size-5`), padding `px-3`, gap `gap-3`.

**Mobile bottom-nav item** — icon 22px (1.5px stroke inactive, 2px active), label 10/500 inactive / 10/600 active, stacked `flex flex-col items-center gap-1`.

### Interaction states

All hover/focus/disabled/invalid treatments. **Preview:** [`preview/components-states.html`](preview/components-states.html).

- **Primary button hover:** `bg-primary/90` (opacity shift only).
- **Outline / ghost hover:** `bg-accent` + `text-accent-foreground`.
- **Secondary hover:** `bg-secondary/80`.
- **List-row hover:** `bg-muted/50`.
- **Active nav indicator:** `text-primary` + `bg-primary/8` + weight 600.
- **Focus-visible (all interactive elements):** `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none`.
- **Invalid:** `border-destructive` + `ring-destructive/20`.
- **Disabled:** `disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`.

---

## Frame conventions

Two surfaces share one token set, diverging mainly in frame constants and motion vocabulary.

- **Hart Ops (desktop).** Collapsible sidebar at 256px (expanded) / 48px (collapsed). Sticky header at 64px with bottom border. Content wrapper `p-6 space-y-6 w-full`. Grid defaults to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`.
- **Educator Mobile (PWA).** Single column `w-full max-w-md mx-auto`. Screen header `px-6 pt-14 pb-4` (manual notch allowance). Bottom nav `fixed`, `pb-[max(0.625rem, env(safe-area-inset-bottom))]`. Forward-push transitions at 350ms; bottom-sheet and cross-fade at 300–500ms. Full spec in [`educator-mobile.md`](educator-mobile.md).

**Imagery.** No custom illustrations in code. No stock photography in chrome. The only image in the running app is the logo on the auth screen. Charts are the primary visual accent — area charts with a burgundy fill ramping from 0.2 opacity → 0.02.

**Layout rules.** Left-aligned by default. Right-alignment only for numeric columns (`tabular-nums`) and trailing metadata. Content wrapper `p-6 space-y-6 w-full`. Grids follow `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 (or 4) gap-4`.

---

## Known gaps

- **Mono font.** No custom monospace is loaded; `--font-mono` falls back to the system stack (`ui-monospace, SFMono-Regular, Menlo, monospace`). A branded mono has been discussed but not adopted.
- **Dark mode.** Not shipped on Hart Web Platforms. The shadcn `.dark` block was removed from `globals.css`; revisit when dark mode is a product requirement. Educator Mobile mirrors light tokens in `theme.ts` (`dark: lightTokens`).
- **Teal accent (mobile only).** `#0F766E` is retired on desktop — `--color-accent` maps to neutral gray. Educator Mobile keeps `--color-teal` in [`app/mobile/src/global.css`](../../../app/mobile/src/global.css); see [`educator-mobile.md`](educator-mobile.md#mobile-only-tokens).
- **Monogram/favicon.** Not available in supplied material. Current logo is a single horizontal lockup only.
- **Reduce-motion.** Not yet wired. Behavior when `prefers-reduced-motion` is respected is documented above but not implemented.

## Editing tokens

Semantic colors for shadcn live in **two places** that must stay in sync: the first `@theme { }` block and the `:root` block in [`/app/frontend/src/globals.css`](../app/frontend/src/globals.css). `@theme inline` maps Tailwind utilities (`bg-primary`, etc.) to `:root` vars (`--primary`) — never the reverse. Do **not** write `--primary: var(--color-primary)` in `:root`; that creates a circular reference and breaks all semantic color utilities.

When you change a brand or shell token:

1. Edit the hex in `@theme { }` and the matching `:root` entry (e.g. `--color-primary` and `--primary`).
2. Manually resync [`preview/tokens.css`](preview/tokens.css) for preview HTML cards.
3. Mirror shared tokens in [`app/mobile/src/global.css`](../../../app/mobile/src/global.css) and [`app/mobile/src/lib/theme.ts`](../../../app/mobile/src/lib/theme.ts) when the value applies to both surfaces (keep mobile-only tokens such as teal on mobile only).

Maintainer details: [`app/frontend/DESIGN_TOKENS.md`](../../../app/frontend/DESIGN_TOKENS.md). After `pnpm dlx shadcn add`, re-check that shadcn did not reintroduce a `.dark` block or circular `:root` aliases.

No `tokens.json`, no Style Dictionary, no build step. Drift between `preview/tokens.css` and `globals.css` is a review signal.
