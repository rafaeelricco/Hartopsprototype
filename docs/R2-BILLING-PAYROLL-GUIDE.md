# R2 — Billing & Payroll: Testing & Demo Guide

This is the prototype anchor for the Hart x Ambar Billing & Payroll demo (May 2026). Everything is frontend-only with seed data — no backend, no persistence (state resets on page reload).

Dev server: **http://localhost:5173/**

To start: `cd /Users/joegreen/Ambar/Clients/Hart/Hartopsprototype && pnpm dev` (Ctrl-C to stop, Vite hot-reloads on file changes).

---

## Terminology — locked for this build

These are the canonical names. They replace earlier prototype labels.

| Old label | New label | Where it shows |
|---|---|---|
| Educator | **Brand Ambassador** (or **BA** in tight UI) | Everywhere |
| Educator Manager | **Market Manager** | Sidebar, persona switcher, routes |
| Event (the umbrella) | **Activity** | Sidebar, nav, page titles |
| Event (as a type) | **Event** (kept as a type label alongside Survey) | Activity type selector |
| Campaign sub-grouping (template) | **Template** | Campaign detail page |

Hierarchy now: **Campaign → Template (optional) → Activity (Event \| Survey)**.

---

## Quick links

| Surface | URL | Persona |
|---|---|---|
| Hart Ops sign-in | http://localhost:5173/ops | — |
| **Billing Workspace** | http://localhost:5173/ops/dashboard/billing | Finance Operator |
| **Payroll Workspace** | http://localhost:5173/ops/dashboard/payroll | Finance Operator |
| Brand Ambassador detail (Ops — rate + pay history) | http://localhost:5173/ops/dashboard/brand-ambassadors/EDU-001 | Finance Operator |
| Brand Ambassador detail (Market Manager — rate + pay history) | http://localhost:5173/market-manager/brand-ambassadors/edu-1 | Market Manager |
| Activity creation wizard | http://localhost:5173/staff/activities/create | Client Staff |
| Activity detail (with payroll-lock demo) | http://localhost:5173/ops/dashboard/activities | Finance Operator |
| Help → Capability Matrix | http://localhost:5173/ops/dashboard/help | Finance Operator |

The sign-in pages accept anything — click straight through.

### Persona switcher

A floating **persona switcher** is pinned to the bottom-left of every screen. Click it to jump between **Hart Ops**, **Client Staff**, and **Market Manager** without re-signing-in. It hard-navigates (resets in-memory state) so it's also useful for restoring seed data after testing.

---

## What's new in this round (since the April 20 demo)

Each item below maps to something Hart explicitly raised in the Larry/Kayla walkthrough.

### P0 — Critical (Larry/Joe called these out explicitly)

1. **Activity-category multi-select filter** on payroll + billing — mirrors Larry's first action at 00:03:27 (checking off "on-premise SLA, beer promotions, on-dedicated…").
2. **Brand Ambassador Pay History tab** on the BA detail page — Larry's wishlist at 00:30:25 ("if there was the ability to build it that it would coincide with the pay cycle").
3. **Max Ambassador Expense + $700 bar-spend ceiling + auto 20% gratuity** in the activity creation wizard — Kayla 01:08:32.

### P1 — Important

4. **Reject cycle & re-open** affordance on locked payroll cycles + locked invoices — Larry's 00:47:46 "forgot Sunday" flow.
5. **Customer Schedule export** — separate from the invoice — labor + max ambassador expense + liquor licence + creator. Kayla 01:26:35.
6. **Activity-edit lockout when payroll-locked** — mirrors the billing-lock that already exists. Leah's action item from 00:46:40.

### P2 — Workflow polish

7. **Cancellation pay breakdown** on the payroll row — kit pickup / travel / time tooltip, matches the Set Partial Bill modal.
8. **Post-activity expenses** (Supplies / Promotion & Publicity / Travel & Entertainment) as first-class fields on the activity → invoice line. Kayla's spreadsheet columns.

### P3 — Workflow refinement

9. **Master Journal printable** — Sarah Scott's reconciliation artefact (00:20:52). Grouped by manager with a Print button.
10. **Territory split-print** — Generate one Payroll Report Complete or Master Journal per territory (Upstate → Buffalo / Hudson Valley / Albany). Larry's 00:25:31.
11. **Second-eyes manager review** flow — Larry sends Upstate report to Leah before final approval (00:23:22). Pending review card with Approve / Changes buttons.

### Plus

- **Schema fix** — default billing entity now derives from the selected account (instead of hardcoded "Hart Agency").
- **PR review fixes** from automated reviewers (Codex + Cursor):
  - Payroll export gate now uses the full cycle (not filters) — operator can't hide unapproved rows to bypass approvals.
  - SLA resolve now actually drops the row out of Missing Bills.
  - Invoice number is **peeked** during render and **consumed** on confirm (no more counter drift).
  - `manualOverride` flag on the invoice now reflects whether the operator edited the auto-number.
  - Step 4 (Billing) validation errors now render on the Billing step (no more dead-end).
  - Export sets cycle status to **Awaiting Kayla** (not the generic "exported") to match the workflow.
  - Rate-modal "today" cutoff is now local-time, not UTC.

---

## Test flows — recommended walkthrough order

Twelve flows total. Each is a 30–90-second click-through. The first six are the high-impact items for the May 25 demo; the remainder are supporting evidence for follow-on conversations.

---

### 1. Brand Ambassador Pay History (P0 #1)

Anchors Larry's wishlist at 00:30:25.

1. Open `/market-manager/brand-ambassadors/edu-1` (Ana Martinez).
2. Scroll past the Compensation panel — new **Pay History** card.
3. Total earned across cycles shown top-right.
4. Click any cycle row to expand — shows date, activity name, category badge, hours, rate, pay per activity.
5. The **current** cycle has an amber "current" badge; historical cycles are seeded for Apr-A and Apr-B.
6. Note: override badges and category labels propagate from the payroll line items.

Also mounted on the **ops side** at `/ops/dashboard/brand-ambassadors/EDU-001` (Maria Santos) — same component, different data shape.

**Talks to:** Larry's "BA wants to know what they got paid this cycle".

---

### 2. Activity-category filter on payroll (P0 #2)

Anchors Larry's first action at 00:03:27.

1. Open `/ops/dashboard/payroll`.
2. Above the tabs: filter bar has a new **"All categories"** popover next to Billing Entity / Manager.
3. Click it — multi-select with: On-Premise SLA, On-Premise, Off-Premise, Beer Promotion, On-Dedicated, Off-Dedicated, On-Trade, Mixology, Health Desk, Warehouse Storage, Payroll Adjustment, Survey.
4. Tick a few (e.g. "On-Premise SLA") — table re-filters in place.
5. Open the **Approve** tab — every row now shows its **Category** as a slate badge between Date and Brand Ambassador.
6. Same control on the **Billing** workspace filter bar (`/ops/dashboard/billing`).

**Talks to:** The first 30 seconds of every payroll run for Larry.

---

### 3. Max Ambassador Expense + $700 bar-spend ceiling + 20% gratuity (P0 #10)

Anchors Kayla 01:08:32.

1. Open `/staff/activities/create`.
2. Walk through Step 1 (Campaign) → Step 2 (Activity Basics — pick **on-premise** venue type and a matched location, e.g. "Total Wine") → Step 3 (Objectives) → Step 4 (Billing).
3. In Step 4 under the BA roster: new **"Max bar spend ($)"** input.
4. Enter `200` → preview below shows "Ceiling $700. 20% gratuity auto-applied ($40 on this max)."
5. Try entering `1000` — input caps at `700` automatically, red note appears: "Capped at the $700 platform ceiling."
6. Scroll to the **Live invoice preview** — it now lists:
   - Max bar spend (ceiling $700)
   - Gratuity (20% of bar)
   - **Max Ambassador Expense (budgeting ceiling)** — sum of labor + max bar spend + gratuity. This is the customer's worst-case budget number.
7. For non-bar venue types (off-premise, special, survey) the bar-spend input is hidden — service fee model takes over.

**Talks to:** Kayla's "customer wants to know if $50K covers 25 promotions" budgeting use case.

---

### 4. Hart Ops Billing — full cycle (existing flow, refreshed)

Anchors the full Ivie controller-transition conversation.

1. Open `/ops/dashboard/billing`.
2. **Overview** tab: KPIs, cycle progress bar, red alert banner.
3. **Missing Bills** tab — four rows:
   - **SLA row** (Absolut at Total Wine): click **Resolve SLA** → modal shows the on-file licence, "active on event date" status, and a checkbox gate. Tick & confirm. **New behavior:** the row now drops out of Missing Bills (was previously stuck — Codex finding).
   - **Cancellation row** (Jameson at Dead Rabbit): click **Set partial bill** → modal includes the green "this replaces the email to the booker" callout. Fill in reason, kit pickup / travel / time amounts, supplier bill, save.
   - **Recurring regression row** (Avion Sunday Tasting): click **Recalculate** → toast confirms recalc to new BA count.
4. **Update Billing** tab: all activities ready for approval. Billing Entity is a first-class editable dropdown per row.
5. **Invoices** tab:
   - Approved rows group by Billed To + Billing Entity (three entities never mix in one invoice).
   - **Auto-number** shown next to the group total now uses a peek-only value during render (no longer drifts on every re-render — Codex finding).
   - Click **Export to QuickBooks** → distributor ID picker + Licence Verified checkbox. Confirm → invoice locks, moves to History. **New behavior:** the invoice now records `manualOverride: true` if you edited the auto-number — visible in the History row metadata.
   - New **"Schedule (Excel)"** button next to QB Export → preview shows the customer-facing budget schedule (P1 #11).
6. **Reports** tab: SLA Report + Cancellation adjustments + the new **Customer Schedule** kind (selectable from Generate Report).
7. **History** tab: locked invoices from the current cycle + two seeded historical cycles. Each row now has a **Reject** action that re-opens the invoice's activities back to ready-to-bill (P1 #5).

**Talks to:** Improvement-first framing: bulk approval, auto invoice numbers, audit-replacing-email loop, billing-lock, plus the new reject-and-rerun.

---

### 5. Hart Ops Payroll — full cycle (existing flow, refreshed)

1. Open `/ops/dashboard/payroll`.
2. **Overview**: three KPIs, approval progress bar.
3. Persistent red banner up top: **"Cannot export while brand ambassadors are awaiting approval"** — visible whenever pending rows remain in the cycle (not just in the filtered view — Codex P1 fix).
4. **Missing Payments** tab: pre-export gate list. Try **Chase manager** (mock toast).
5. **Approve** tab:
   - BA standard rate has a dashed-underline tooltip showing the rate's effective date.
   - Override rows show the reason as a badge; hover for the override rate + note.
   - **Cancellation row** (Sarah Chen — Jameson Whiskey): hover the "cancellation" badge → tooltip shows the kit pickup / travel / time breakdown (P2 #6).
   - **Recurring regression row** (Ana on the Avion Sunday Tasting): final pay shows ⚠. Click **Approve** → recurring-recalc dialog confirms.
   - **Category column** appears between Date and Brand Ambassador (P0 #2).
6. **Export** tab: pre-export checklist. The button is disabled while Missing Payments has rows. Click → confirm dialog shows totals by billing entity.
7. After export: cycle status badge in the header flips to **Awaiting Kayla** (not the generic "exported" — Codex P2 fix). New **"Reject cycle & re-open"** button appears next to the badge (P1 #5).
8. Click **Reject cycle & re-open** → confirmation dialog → cycle returns to in-progress, payroll-lock cleared, ready for re-run.
9. **History** tab: previous cycles show **Awaiting Kayla**, **Awaiting Accountant**, and **Complete** handoff states.

**Talks to:** Auto-rate calc replaces Larry's external spreadsheet. Active recurring-regression guard. Payroll-lock distinct from billing-lock. Reject-and-rerun for the "forgot Sunday" case.

---

### 6. Reports tab — Master Journal, Territory split-prints, Second-eyes review (P3 #7 / #8 / #9)

Anchors Larry's printing workflow + Sarah Scott's master journal + Leah's second-review step.

1. From `/ops/dashboard/payroll`, click the **Reports** tab.
2. Top card: **Second-eyes reviews** (P3 #9).
   - One seeded pending request: Larry → Leah, scope = Albany.
   - Click **Approve** or **Changes** — status updates inline, toast confirms.
   - Click **Request review** → dialog: pick reviewer (default Leah), scope (full cycle or a specific territory), optional note. Submit → new pending row appears at the top.
3. Click **Generate report**:
   - Pick **Master Journal** (or **Payroll Report — Complete**) — note the new **"Split by territory"** checkbox that appears (P3 #8). It lists the territories visible in the current cycle (Manhattan, Brooklyn, Albany, Buffalo, Hudson Valley if you've changed filters to include them).
   - Tick it → generates one report per territory (e.g. "Master Journal — May 22 · Buffalo", "… · Hudson Valley", etc.). Each becomes its own card in the archive.
4. Click the seeded **Master Journal — Current Cycle** card → printable preview opens (P3 #7).
   - Grand total, BAs paid, line items in a top stat bar.
   - Grouped by manager — Manager — Metro Region, North Jersey, Outer Boroughs, Upstate NY.
   - **Print** button in the header invokes `window.print()`.

**Talks to:** Sarah Scott's master journal, Larry's per-Upstate-market printing, Leah's pre-export sign-off.

---

### 7. Activity-edit lockout when payroll-locked (P1 #4)

Anchors Leah's action item from 00:46:40 (current HEMS bug: billing locks names but payroll doesn't).

1. From `/ops/dashboard/activities`, find an activity dated **Feb 28, 2026** (Music Festival — Event Evaluation, or similar).
2. Open the activity detail page.
3. Scroll to the **Brand Ambassador Assignment** section — new red banner: **"Payroll-locked — Brand Ambassador edits disabled"**.
4. No add/remove BA buttons appear. The rest of the page (notes, dashboards) is unaffected.
5. For comparison, open a Live or Upcoming activity — the assign/manage buttons return.

**Talks to:** Mirroring the existing billing-lock for the payroll side.

---

### 8. Set BA standard rate (existing flow, refreshed)

1. Open `/market-manager/brand-ambassadors/edu-1` (Ana Martinez).
2. Scroll to **Compensation** panel.
3. Current rate $40/hr, rate history with three entries (one upcoming Jun 1 uplift to $42), three recent overrides, "Frequent overrides" amber hint.
4. Click **Edit rate** → modal.
5. Try an effective date in the past — gets blocked. (Now correctly uses **local date**, not UTC — Codex P2 fix; relevant if you're testing late evening US time.)
6. Set a new rate (e.g. $44), pick a future date, confirm preview, save.
7. New entry appears at the top of Rate History.

**Talks to:** mm-ui-008. Rate effective-date logic, no back-dating.

---

### 9. Client Staff — activity creation wizard with billing step (existing flow, refreshed)

1. Open `/staff/activities/create`.
2. Walk through Step 1 (Campaign — pick "Summer Seltzer Launch") → Step 2 (Activity Basics — pick a matched location like "Total Wine") → Step 3 (Objectives) → Step 4 (**Billing**).
3. **Step 4 new validation banner** (P2 #6 from review fixes): if you skip past Step 4 without picking a BA, a red banner now renders on the Billing step itself instead of writing into the Location field (which used to be a dead end). Try Continue with no BA → banner appears.
4. **Billing entity** is now defaulted from the selected account (instead of hardcoded Hart Agency — Codex P2 fix). Change the location to "Pearl Street Pub" (Upstate NY) and watch the billing entity auto-sync to Upstate NY.
5. Pick a Lead BA — Pay per Brand Ambassador auto-fills with their standard rate.
6. Change Pay manually → triggers the Override Reason picklist.
7. Toggle activity type to **Survey** — fields switch to expected completions × per-completion rate, service fee drops to 0.
8. **Max bar spend** input only shows for on-premise (bar) activities (see Flow 3).
9. The Live invoice preview updates in real time.
10. Continue → Products → Customization → Create Event.

**Talks to:** mm-ui-011. Activity-as-billable generalisation, account-driven defaults, override badge propagation, distributor-as-billed-party.

---

### 10. Template (campaign sub-grouping)

Was previously called "Activity" — renamed to **Template** to free up "Activity" for the umbrella concept.

1. Open `/staff/campaigns` → click any campaign (e.g. Summer Seltzer Launch).
2. New **Templates** section (formerly "Activities") — pre-configures activity creation with channels + products.
3. Click **+ Activity** on a template card — opens the wizard with the template's products / channels / venue type pre-filled.

**Talks to:** the new hierarchy (Campaign → Template → Activity).

---

### 11. Post-activity expenses (P2 #12)

1. From `/ops/dashboard/billing`, **Invoices** tab.
2. Find the invoice group with the **Upstate NY** entity (Pearl Street Pub).
3. Click **View / Edit** on it.
4. Scroll to the new **"Post-activity expenses (Kayla's columns)"** panel — shows Supplies, Promotion & Publicity, Travel & Entertainment per activity.
5. These amounts roll into the line total automatically.

**Talks to:** Kayla's spreadsheet columns being first-class on the data model.

---

### 12. Design + terminology consistency (quick audit)

- Sidebar in all three personas uses the new terms (Activities, Brand Ambassadors, Market Manager).
- All page titles, table headers, modal copy, and toast messages use the new terms — no stray "Educator" / "Event" / "BrandAmbassador" visible.
- Persona switcher (bottom-left) shows "Market Manager" for the third option.
- Tokens, fonts, icon sizing match the existing prototype.

---

## Hidden but data-model-present

The following features have **data fields and seed values in place**, but their UI is intentionally hidden. They're ready to surface when the team is ready to discuss them.

- **Travel-pay (mileage × rate)** for Upstate — `travelComponent: { miles, ratePerMile, amount }` exists on `BillingActivity` and `PayrollLineItem`. The Upstate seed rows (`pli-008`, `pli-008b`, `pli-008c`) carry it. UI controls in the wizard and the tooltip on the payroll Approve row have been removed; data flows untouched.

These are out of scope for now:

- **Ramp Reimbursements integration** — no UI, no placeholder tab.
- **OCR receipt auto-reading** — wiki-flagged Phase 2; not in the prototype.
- **Configurable reporting for SaaS clients** — wiki-flagged Phase 2+; not in the prototype.

---

## Open schema questions (for the Ivie session, not bugs)

These remain flagged for follow-up — no code change needed, but worth getting alignment:

1. **Hart entity per account** — currently derived from `account.billingEntity`. Confirm this matches Hart's real-world rule.
2. **Cancellation rate** — currently territory-level (e.g. $50 flat). Should this be BA-level?
3. **Ambassador Amount** — defined as pay + override delta. Confirm interpretation.
4. **Payment column** in the CSV export — needs interpretation per Larry / Kayla.

---

## Seed data cheat sheet

| What | Where | Why it's there |
|---|---|---|
| 1 SGWS NY event (SLA-eligible) | `billing-data.ts` `act-bill-001` | SLA verification flow |
| 1 cancelled event | `billing-data.ts` `act-bill-002` + `pli-003` (with cancellation breakdown) | Set Partial Bill + breakdown tooltip |
| 1 recurring regression | `billing-data.ts` `act-bill-003` + `payroll-data.ts` `pli-004` | Recurring recalc guard |
| Cross-entity invoice group | `act-bill-001` (Hart W&S) + `act-bill-004` (Hart Agency) + `act-bill-005` (Upstate NY) | Three-entity governance |
| Survey activity row | `act-bill-006` + `pli-009` | Activity-as-billable generalisation |
| BA with full rate history | `brand-ambassador-roster-data.ts` edu-1 (Ana) | Effective-date + frequent-overrides hint |
| Historical billing invoices | `MOCK_INVOICES` initial values | History tab |
| Historical payroll cycles | `HISTORICAL_PAYROLL_CYCLES` | Handoff states (Awaiting Kayla / Accountant / Complete) |
| Historical pay-history line items | `HISTORICAL_PAYROLL_LINE_ITEMS` (5 rows for Ana + David Kim) | Pay History panel content |
| Upstate territory split | `pli-008` (Albany) + `pli-008b` (Buffalo) + `pli-008c` (Hudson Valley) | Territory split-print demo |
| Bar-spend ceiling demo | `act-bill-003`, `act-bill-005` with `barSpend` + `maxBarSpend` + `gratuity` populated | Bar-spend math on invoice |
| Post-activity expenses | `act-bill-005` (`suppliesAmount`, `promotionPublicityAmount`) | Kayla's columns panel |
| Activity payroll-lock demo | `EVENTS` Feb 28, 2026 row marked `payrollLocked: true` | Lockout banner on activity detail |
| Pending review | `reviewRequests` initial state in payroll-workspace-page.tsx | Second-eyes review card |

---

## Activity categories (for reference)

| Value | Label | When to expect it |
|---|---|---|
| on-premise-sla | On-Premise SLA | SGWS NY activities (Total Wine, Moxy, etc.) |
| on-premise | On-Premise | Generic bar / restaurant venues |
| off-premise | Off-Premise | Retail tastings (Whole Foods, etc.) |
| beer-promotion | Beer Promotion | Beer-specific activations |
| on-dedicated / off-dedicated | On/Off-Dedicated | Brand-dedicated events |
| on-trade | On-Trade | Trade events (industry-only) |
| mixology | Mixology | Specialty cocktail events |
| health-desk | Health Desk | Health-bar / wellness activations |
| warehouse-storage | Warehouse Storage | Internal storage activities |
| payroll-adjustment | Payroll Adjustment | Manual adjustments outside an activity |
| survey | Survey | Non-event activity type |

---

## File layout

### Shared types
- `src/app/shared/data/billing-types.ts` — every R2 type: `BillingEntity`, `OverrideReason`, `ServiceFeeKind`, `ActivityCategory`, `BillingActivity`, `Invoice`, `PayrollLineItem`, `PayrollReviewRequest`, `CancellationAdjustment`, `SlaReportRow`, `RateHistoryEntry`, `TravelComponent`, `BAR_SPEND_CEILING`, `BAR_SPEND_GRATUITY_RATE`, `DEFAULT_MILEAGE_RATE`.

### Mock data
- `src/lib/account-data.ts` — accounts with `billingEntity`, `serviceFeeKind`, `liquorLicence`, `billingAddress`. `acc-7` (Pearl Street Pub) seeds Upstate NY.
- `src/app/market-manager/components/brand-ambassador-roster-data.ts` — BAs with `standardRate`, `rateHistory`, `recentOverrides`. Ana Martinez (`edu-1`) is the rich demo.
- `src/app/ops/components/billing-data.ts` — current billing cycle, activities, invoices, SLA Report rows, cancellation adjustments, invoice counter (peek/consume).
- `src/app/ops/components/payroll-data.ts` — current payroll cycle, line items (with category, override, recurring recalc, cancellation breakdown, travel component), historical line items, historical cycles, generated reports archive.

### Key screens / components
- `src/app/ops/components/billing-workspace-page.tsx` — billing workspace, 5 tabs (Overview, Missing Bills, Update Billing, Invoices, Reports, History).
- `src/app/ops/components/payroll-workspace-page.tsx` — payroll workspace, 6 tabs + Master Journal preview + Request Review dialog + Reject cycle dialog.
- `src/app/ops/components/set-partial-bill-modal.tsx` — cancellation flow (replaces manager-emails-Kim loop).
- `src/app/ops/components/resolve-sla-modal.tsx` — SGWS NY licence verification.
- `src/app/ops/components/qb-export-dialog.tsx` — QuickBooks export with distributor ID picker.
- `src/app/ops/components/recurring-recalc-dialog.tsx` — active guard for recurring activities with changed BA count.
- `src/app/ops/components/invoice-details-modal.tsx` — view/edit invoice line items + post-activity expenses panel.
- `src/app/ops/components/generate-report-dialog.tsx` — Generate Report dialog with split-by-territory option.
- `src/app/market-manager/components/compensation-panel.tsx` + `edit-rate-modal.tsx` — BA rate management.
- `src/app/market-manager/components/pay-history-panel.tsx` — BA pay history grouped by cycle.
- `src/app/staff/components/step-billing.tsx` — billing step in the activity creation wizard.
- `src/app/shared/components/persona-switcher.tsx` — floating persona switcher.

### Routing
- `src/app/routes.tsx` — `/ops/dashboard/billing`, `/payroll`, `/brand-ambassadors`, `/activities`, `/draft-activities`, `/capability-matrix`, plus `/staff/activities/...` and `/market-manager/...`

---

## Known caveats

1. **No persistence.** Every reload resets seed data. Any approvals / exports / rate edits / reviews are session-local.
2. **The wizard's billing inputs don't flow into the ops surfaces.** The Hart Ops views run off the seed datasets directly. Wiring the two together is the obvious next step if Ivie wants live data flow.
3. **TypeScript pre-existing errors** in `app-shell.tsx`, `brand-assets-page.tsx`, `settings-page.tsx`. None are from R2; the dev server runs regardless.
4. **Capability Matrix** at `/ops/dashboard/capability-matrix` is a documentation page (originally Stephanie's request) accessible via Help → Security & Permissions. Kept as-is; not in the main nav.
5. **Travel-pay UI is intentionally hidden.** The data model is still in place and the Upstate seed rows still carry travel components — they just don't render in the wizard or the payroll row tooltip. Easy to re-enable when needed.

---

## Demo arc — suggested 25-minute walkthrough

| Min | Flow | Talking point |
|---|---|---|
| 0–2 | Persona switcher + sidebar terminology | Set the stage: new role names, new hierarchy |
| 2–5 | Flow 2 — Activity-category filter | Larry's first action at 00:03:27 |
| 5–9 | Flow 3 — Max bar spend + 20% gratuity | Kayla's $700 ceiling math at 01:08:32 |
| 9–14 | Flow 4 — Full billing cycle (SLA → approve → QB export → reject) | Improvement-first framing for Ivie |
| 14–19 | Flow 5 — Full payroll cycle (filter → approve → export → reject) | Auto-rate, recurring guard, payroll-lock |
| 19–22 | Flow 6 — Master Journal + territory splits + second-eyes review | Sarah Scott's reconciliation + Leah's pre-export sign-off |
| 22–24 | Flow 1 — BA Pay History tab | Larry's critical wishlist item |
| 24–25 | Flow 7 — Activity-edit lockout | Leah's existing HEMS bug now mirrored |

---

## Stopping & restarting the dev server

```sh
cd /Users/joegreen/Ambar/Clients/Hart/Hartopsprototype
pnpm dev
```

Ctrl-C to stop. Vite hot-reloads on file changes.
