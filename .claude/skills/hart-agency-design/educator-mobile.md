# Brand Ambassador Mobile

Brand Ambassador Mobile is the field-facing PWA companion to Hart Ops. It shares the same token set (`/app/frontend/src/globals.css`) but diverges on **frame**, **primitives**, and **motion**. This file documents those three axes — the desktop design language is specified in [`design-system.md`](design-system.md).

The mobile surface is not yet implemented in `/app/frontend/`. Treat this document as the canonical spec until the code ships.

---

## Mobile-only tokens

The mobile surface re-introduces one accent that `design-system.md` retired for desktop. It lives only in [`app/mobile/src/global.css`](../../../app/mobile/src/global.css) and is documented here, not in the canonical desktop spec.

| Token                     | Hex       | Usage                                                                                                                                 |
| ------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `--color-teal`            | `#0F766E` | Confirmation cues in the auth flow: success-screen hero background, password-strength strong state, "view-all"-style secondary links. |
| `--color-teal-foreground` | `#FFFFFF` | Text on solid teal surfaces.                                                                                                          |

Use via NativeWind utilities (`bg-teal`, `text-teal`, `bg-teal/10`, `border-teal/15`). Do not adopt on desktop — the desktop surface treats `#0F766E` as retired.

---

## Frame

A single-column iPhone-class frame. Target device: iPhone 14 / 15 class (390×844 CSS pixels).

| Dimension       | Value                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------- |
| Frame width     | `max-w-md` in Tailwind (`28rem` / 448px), hard-capped at 390px via inline style on the shell |
| Frame height    | 844px on dedicated preview surfaces; `100vh` in-app                                          |
| Outer bezel     | 10px of `#111827` around the viewport (preview only — the running PWA has no bezel)          |
| Viewport radius | 42px                                                                                         |
| Notch           | 120×32, `#111827`, absolutely positioned 10px from top                                       |
| App background  | `#F9FAFB` (matches desktop)                                                                  |

The status bar reserves **54px** (18px top padding + content) and carries `15/600/#111827` time + signal + battery glyphs.

Bottom nav reserves **~72px** at rest (8/12/24 padding + 22px icons + 10px labels). Use safe-area padding: `pb-[max(env(safe-area-inset-bottom),24px)]`.

Available content height: `844 - 54 (status) - 72 (nav) = 718px` on a 14-class device, less on smaller devices.

---

## Chrome primitives

### `StatusBar`

Native-looking 9:41 clock, signal bars, battery icon.

- Height 54px, top padding 18px, horizontal padding 24px.
- `15/600/#111827` on both sides.
- Flex-shrink 0 — never compressed by scrolling content.

### `ScreenHeader`

Appears on every screen except the bottom-nav roots (Home, Profile).

| Property      | Value                                                                       |
| ------------- | --------------------------------------------------------------------------- |
| Padding       | `8px 20px 14px`                                                             |
| Bottom border | `1px solid #F3F4F6` (hairline, not the standard gray-200)                   |
| Background    | `#FFFFFF`                                                                   |
| Back button   | 36×36, `bg-gray-100`, `rounded-[10px]`, Lucide `ArrowLeft` @ 18px           |
| Title         | `17/600/#111827`, left-aligned, `flex: 1`                                   |
| Right slot    | Optional 36×36 trigger — typical content is `MoreVertical` at 20px gray-500 |

### `BottomNav`

Fixed row of 4 items: Home · Events · Check In · Profile.

| Property       | Value                                                                 |
| -------------- | --------------------------------------------------------------------- |
| Border-top     | `1px solid #E5E7EB`                                                   |
| Padding        | `8px 12px 24px` (24 grows to `env(safe-area-inset-bottom)` on device) |
| Background     | `#FFFFFF`                                                             |
| Icon           | 22px Lucide, stroke 1.5 inactive / 2 active                           |
| Label          | `10/500` inactive, `10/600` active                                    |
| Inactive color | `#9CA3AF`                                                             |
| Active color   | `#7D152D` (brand burgundy)                                            |

The active indicator is the color swap — no badge, no dot, no underline. Keep it minimal; the icon + label chroma shift is enough signal.

---

## Action primitives

### `MButton`

Full-width CTA. Taller than desktop buttons (48px vs 36px) to clear the 44-pt Apple hit target.

| Property | Value                               |
| -------- | ----------------------------------- |
| Height   | `48px`                              |
| Padding  | `0 20px`                            |
| Radius   | `rounded-lg` (12px)                 |
| Font     | Inter `15/600`, `letter-spacing: 0` |
| Icon gap | 8px                                 |
| Width    | 100% (always full-row)              |

Variants mirror desktop: `default` (burgundy/white), `secondary` (gray-100/gray-900), `outline` (white/gray-900 with gray-200 border), `ghost` (transparent/gray-900).

Floating CTAs (bottom of the Event detail screen, above the bottom nav) sit on a short gradient from `#F8FAFC` at 40% to transparent — gives the button a clean visual lift without a shadow.

### `MCard`

The sole container primitive on mobile. Matches desktop card geometry exactly.

| Property   | Value                                                                   |
| ---------- | ----------------------------------------------------------------------- |
| Background | `#FFFFFF`                                                               |
| Border     | `1px solid #E5E7EB`                                                     |
| Radius     | `rounded-xl` (16px)                                                     |
| Padding    | `16px` (tighter than desktop's 24px — reclaims mobile horizontal space) |
| Shadow     | None (Elevation 0)                                                      |

Nested lists inside `MCard` use `padding: 14px 16px` per row with `1px solid #F3F4F6` dividers (hairline, not the default gray-200).

---

## Motion vocabulary

Desktop uses subtle transitions (hover states, chevron nudges). Mobile uses screen-level motion to communicate navigation.

| Pattern               | Values                                                                            | Where                                                                 |
| --------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Forward push**      | `x: 50 → 0 → -50`, 350ms, `ease-in-out`                                           | Tapping a list item, entering a detail screen                         |
| **Bottom-sheet rise** | `y: 50 → 0 → 50`, 500ms open / 300ms close, `ease-spring` open / `ease-out` close | Modals, pickers, `vaul` sheets                                        |
| **Cross-fade**        | 300ms, `ease-in-out`                                                              | Cross-flow transitions that aren't hierarchical (e.g., Home ↔ Events) |
| **Success scale**     | `scale: 0.95 → 1`, 400ms, `ease-spring`                                           | Checkmark on the Check-in success screen                              |
| **Press feedback**    | `whileTap={{ scale: 0.95 }}`                                                      | Every interactive element; drop to `0.98` on <40px hit targets        |

No haptics. No page transitions during auth (auth lives on desktop for now).

Tokens: `--duration-slow: 300ms`, `--duration-slower: 500ms`, `--ease-spring` in `globals.css:123-132`.

---

## Screen catalog

Five primary screens, one overlay screen. Copy is illustrative, not final.

### Home

Root of the Home tab.

- **Header:** `"Good morning" (14/400/gray-500)` + `"Sarah Chen" (24/600/gray-900)` on white, 18/20/6 padding.
- **Today section:** overline `11/600/gray-500 UPPERCASE 0.1em` + list of event cards. Each card: 44×44 burgundy-tinted icon tile (`bg-primary/8 · #7D152D`), org overline + event title + `time · venue`, trailing chevron at 18px gray-400.
- **Stats card:** three-column strip inside an `MCard` — Events / Leads / Check-in % — columns separated by vertical gray-200 hairlines.
- **Upcoming section:** overline + `MCard` with zero padding, list rows 14/16 padded, hairline dividers.

Target: capture one day's work at a glance with no tap required to see what's next.

### Event detail

Reached by tapping a Home event card.

- **ScreenHeader:** "Event" title + MoreVertical right slot.
- **Title block:** org overline + event title + status badge (`Upcoming` = yellow) + relative countdown (`Starts in 2h 14m`).
- **Metadata card:** three rows via `Row` helper — Clock / MapPin / Users — each with a 36×36 gray-100 icon tile + primary/secondary text.
- **Checklist card:** four-item pre-event checklist with a 20×20 burgundy-filled checkbox (or gray-300 outline when incomplete). Completed rows dim to gray-400 with strike-through.
- **Floating CTA:** `Start check-in` button, 80px from bottom (clears the nav), on a top-fading gradient protection strip.

### Check-in

Overlay screen (no bottom nav during active scan).

- **ScreenHeader:** "Check in" title + back.
- **Viewfinder:** square, aspect-ratio 1, `bg-gray-900 rounded-[20px]`, four 48×48 burgundy L-brackets at the corners (stroke 4px), dim QR icon + caption at center.
- **Manual entry card:** `MCard` with "Manual entry" title, helper text, and a 44px input (`placeholder="A-000000"`, `bg-gray-50`, 12px radius).
- **Primary CTA:** `Simulate scan` (secondary variant) until a scan completes, then swaps to `Confirm check-in` (default/burgundy).

### Success

Celebrates a completed check-in.

- **Icon:** 80×80 `rounded-full` with `bg-success/12` tint, Lucide `CheckCircle` @ 44/2.
- **Title:** `22/600/gray-900` "Checked in".
- **Subtitle:** two-line `14/400/gray-500 · leading-normal`.
- **Attendee card:** overline + name + email + context line (`Grade 11 · Visiting from Austin`).
- **CTA:** `Continue` — default burgundy, returns to Event detail.

Motion: `scale: 0.95 → 1` spring on mount. No confetti, no sounds.

### Profile

Root of the Profile tab.

- **Header band:** avatar (56×56 burgundy-filled, 20/600 initials) + name + role/location, 24/20 padding.
- **Settings card:** four-row list — My schedule · Availability · Venue intelligence · Notifications — each row: 20px Lucide icon + 14/400 label + trailing chevron at 16px gray-300.
- **Footer:** `Hart Agency · v2.4.1` at gray-400, centered.

---

## What's intentionally out of scope

- **Auth.** Mobile reuses desktop auth — no sign-in flow in this spec.
- **Offline.** PWA offline semantics are deferred until the first real screen ships.
- **Onboarding.** No first-run walkthrough designed yet.
- **Charts.** No chart on mobile at time of writing. If one is added, reuse the desktop chart tokens.

---

## Visual reference

> **TODO:** Recapture screenshots from the original prototype and restore at `design/assets/educator-mobile-*.png`. Files were removed pending a refreshed capture pass.

- `educator-mobile-home.png` — Home screen with today + stats + upcoming. _(pending recapture)_
- `educator-mobile-checkin.png` — Check-in viewfinder with manual entry fallback. _(pending recapture)_
- `educator-mobile-success.png` — Post-check-in confirmation. _(pending recapture)_
