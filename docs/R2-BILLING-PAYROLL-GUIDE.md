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

Billing entity: **Hart Agency** is the only billing entity post May-26 consolidation. Hart W&S and Upstate NY have been folded into Hart Agency across the data model and UI.

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

## What's new since the April 20 demo

Each item below maps to something Hart explicitly raised in the Larry/Kayla walkthrough (April) or in Ivie's May-26 follow-up.

### P0 — Critical (Larry/Joe called these out explicitly)

1. **Activity-category multi-select filter** on payroll + billing — mirrors Larry's first action at 00:03:27.
2. **Brand Ambassador Pay History tab** on the BA detail page — Larry's 00:30:25 wishlist.
3. **Max Ambassador Expense + $700 bar-spend ceiling** in the activity creation wizard — Kayla 01:08:32. The 20% gratuity is bundled inside the ceiling, not a separate input or invoice line.

### P1 — Important

4. **Reject cycle & re-open** affordance on locked payroll cycles + locked invoices — Larry's 00:47:46 "forgot Sunday" flow.
5. **Customer Schedule export** — separate from the invoice — labor + max ambassador expense + liquor licence + creator. Kayla 01:26:35.
6. **Activity-edit lockout when payroll-locked** — mirrors the existing billing-lock. Leah's 00:46:40 item.

### P2 — Workflow polish

7. **Cancellation pay breakdown** on the payroll row — kit pickup / travel / time tooltip.
8. **Post-activity expenses** (Supplies / Promotion & Publicity / Travel & Entertainment) as first-class fields on the activity → invoice line. Kayla's spreadsheet columns.

### P3 — Workflow refinement

9. **Master Journal printable** — Sarah Scott's reconciliation artefact (00:20:52). Grouped by manager with a Print button.
10. **Territory split-print** — one Payroll Report Complete or Master Journal per territory (Upstate → Buffalo / Hudson Valley / Albany).
11. **Second-eyes manager review** flow — Larry sends Upstate report to Leah before final approval (00:23:22).

### May-26 round (post Ivie walkthrough)

- **Hart Agency consolidation** — Hart W&S and Upstate NY removed. Single billing entity throughout the model and UI. No more entity dropdown on Update Billing rows.
- **Service fee math fixed** — 10% bar service fee applies to **bar spend** (not the event amount); 20% trade service fee applies to the event amount. Both recalc from actuals post-activity for bar venues.
- **Gratuity removed as a separate line** — folded into the $700 bar-spend ceiling note ("includes 20% grat."). No gratuity input, no gratuity row in the invoice.
- **BA roster optional at activity creation** — per Leah, the operator may not know who's working yet. Wizard allows continuing with zero BAs assigned.
- **Billing-code dropdown** sourced from the campaign — the Edit Activity Billing modal picks from the campaign's curated codes, with a "Custom code" escape hatch that flags the row as a manual override.
- **Date range filter on Generate Report** — Master Journal / Payroll Report / Customer Schedule can be scoped to an arbitrary date range.
- **Billing periods** on the Invoices tab — start/end date filter with **Previous period** / **Next period** buttons that step through 14-day cycles.
- **Per-activity exclude checkbox** inside invoice groups — operator can exclude individual rows from an invoice without removing them from the cycle.
- **Campaign Tag** surfaced everywhere a billing activity appears — clickable burgundy badge, opens the campaign in a new tab, tooltip shows the Power Automate joining string.
- **Invoice payment status tracking** — `open` / `partially-paid` / `paid` / `overdue` with a column on the Invoices tab, a payment-status filter, and an **Update payment** dialog (with partial-paid amount input).
- **Edit Activity Billing modal** — per-row pencil on the Update Billing tab opens an inline edit: billing code, supplier, amounts, bar spend, post-activity expenses, then Save or Save & Approve.

### PR review fixes (Codex + Cursor)

- Payroll export gate uses the full cycle, not filters (no hiding unapproved rows to bypass approvals).
- SLA resolve actually drops the row out of Missing Bills.
- Invoice number is **peeked** during render, **consumed** on confirm (no counter drift).
- `manualOverride` flag on the invoice reflects whether the operator edited the auto-number.
- Step 4 (Billing) validation errors render on the Billing step.
- Export sets cycle status to **Awaiting Kayla** (not generic "exported").
- Rate-modal "today" cutoff is local-time, not UTC.

---

## Test flows — recommended walkthrough order

Twelve flows. Each is a 30–90-second click-through. The first six are the high-impact items for the May 26 demo; the rest are supporting evidence.

---

### 1. Brand Ambassador Pay History (P0 #1)

Anchors Larry's wishlist at 00:30:25.

1. Open `/market-manager/brand-ambassadors/edu-1` (Ana Martinez).
2. Scroll past the Compensation panel — new **Pay History** card.
3. Total earned across cycles shown top-right.
4. Click any cycle row to expand — shows date, activity name, category badge, hours, rate, pay per activity.
5. The **current** cycle has an amber "current" badge; historical cycles are seeded for Apr-A and Apr-B.
6. Override badges and category labels propagate from the payroll line items.

Also mounted on the **ops side** at `/ops/dashboard/brand-ambassadors/EDU-001` (Maria Santos).

**Talks to:** Larry's "BA wants to know what they got paid this cycle".

---

### 2. Activity-category filter on payroll + billing (P0 #2)

Anchors Larry's first action at 00:03:27.

1. Open `/ops/dashboard/payroll`.
2. Filter bar has an **"All categories"** popover.
3. Multi-select: On-Premise SLA, On-Premise, Off-Premise, Beer Promotion, On-Dedicated, Off-Dedicated, On-Trade, Mixology, Health Desk, Warehouse Storage, Payroll Adjustment, Survey.
4. Tick a few (e.g. "On-Premise SLA") — table re-filters in place.
5. Open the **Approve** tab — every row shows its **Category** as a slate badge between Date and Brand Ambassador.
6. Same control on the **Billing** workspace filter bar (`/ops/dashboard/billing`).

**Talks to:** The first 30 seconds of every payroll run for Larry.

---

### 3. Max Ambassador Expense + $700 bar-spend ceiling (P0 #3)

Anchors Kayla 01:08:32.

1. Open `/staff/activities/create`.
2. Walk through Step 1 (Campaign) → Step 2 (Activity Basics — pick an **on-premise** venue type and a matched location, e.g. "Total Wine") → Step 3 (Objectives) → Step 4 (Billing).
3. In Step 4: new **"Max bar spend ($)"** input.
4. Enter `200` → preview note: "Budget ceiling only · $700 platform max with 20% gratuity bundled. Actual bar spend is logged after the activity from receipts — the 10% service fee and final invoice line both recalculate from that figure, not from this estimate."
5. Try `1000` → input caps at `700` and red note: "Capped at the $700 platform ceiling."
6. Scroll to the **Live invoice preview**:
   - BA pay subtotal
   - Service fee (10% bar — estimate, recalculated from actual bar spend post-activity)
   - Max bar spend (ceiling $700, includes 20% grat.)
   - **Max Ambassador Expense (budgeting ceiling)** — labor + max bar spend (gratuity bundled). This is the customer's worst-case budget number.
7. For non-bar venue types (off-premise, special, survey) the bar-spend input is hidden and the 20% trade service fee applies to the event amount instead.

**Talks to:** Kayla's "customer wants to know if $50K covers 25 promotions" budgeting use case + the May-26 service-fee math fix.

---

### 4. Hart Ops Billing — full cycle (refreshed)

Anchors the full Ivie controller-transition conversation + the May-26 round.

1. Open `/ops/dashboard/billing`.
2. **Overview** tab: KPIs, cycle progress bar, red alert banner.
3. **Missing Bills** tab — four rows. Each row carries a **Campaign Tag** (clickable burgundy badge — opens the campaign in a new tab; hover for the Power Automate joining string).
   - **SLA row** (Absolut at Total Wine): click **Resolve SLA** → modal shows the on-file licence, "active on event date" status, and a checkbox gate. Tick & confirm. The row drops out of Missing Bills.
   - **Cancellation row** (Jameson at Dead Rabbit): click **Set partial bill** → green "this replaces the email to the booker" callout, kit pickup / travel / time amounts, supplier bill, save.
   - **Recurring regression row** (Avion Sunday Tasting): click **Recalculate** → toast confirms recalc to new BA count.
4. **Update Billing** tab:
   - Campaign Tag on every row. No Billing Entity column (single entity).
   - **Pencil** icon on each row → **Edit Activity Billing** modal:
     - Billing code dropdown sourced from the campaign's curated codes (e.g. "SLT-LAUNCH-OFF", "SLT-LAUNCH-ON" for Summer Seltzer Launch). "Custom code" escape hatch flags the row as a manual override.
     - Editable: supplier, distributor, event amount, ambassador amount, travel, bar spend, max bar spend, gratuity, post-activity expenses, expected amount.
     - **Save** updates the row; **Save & Approve** also promotes it to ready-to-invoice.
5. **Invoices** tab:
   - **Billing period** filter (start + end date) with **Previous period** / **Next period** buttons stepping in 14-day cycles. Active period echoed in the group header.
   - Approved rows group by **Billed To + Distributor** (single Hart Agency entity — no entity grouping anymore).
   - Each invoice card carries a **Campaign Tag** column and a **per-activity exclude checkbox** — untick a row to drop it from this invoice without removing it from the cycle.
   - **Auto-number** peeks during render and is consumed only on confirm.
   - **Export to QuickBooks** → distributor ID picker + Licence Verified checkbox. Records `manualOverride: true` if you edited the auto-number.
   - **Schedule (Excel)** button next to QB Export → customer-facing budget schedule preview (P1 #5).
6. **Reports** tab:
   - **Generate report** dialog now includes a **date range** picker (start + end) on top of the report-kind selector.
   - Report kinds: SLA Report, Cancellation Adjustments, Customer Schedule.
7. **History** tab:
   - **Payment status** column on every row: `Open` / `Partially paid` / `Paid` / `Overdue`. Partial rows show the remaining balance below the badge.
   - **Payment status filter** above the table (`All` / `Open` / `Partially paid` / `Paid` / `Overdue`).
   - Each row has an **Update payment** action → dialog with status select, partial-paid amount input (only when `partially-paid` is chosen), and Save.
   - Each row also has a **Reject** action that re-opens the invoice's activities back to ready-to-bill (P1 #4).

**Talks to:** Improvement-first framing for Ivie: bulk approval, auto invoice numbers, audit-replacing-email loop, billing-lock, plus the new edit-row modal, billing periods, payment tracking, and campaign reference surfaced everywhere.

---

### 5. Hart Ops Payroll — full cycle (refreshed)

1. Open `/ops/dashboard/payroll`.
2. **Overview**: three KPIs, approval progress bar.
3. Persistent red banner: **"Cannot export while brand ambassadors are awaiting approval"** — visible whenever pending rows remain in the cycle (not just in the filtered view).
4. **Missing Payments** tab: pre-export gate list. **Chase manager** triggers a mock toast.
5. **Approve** tab:
   - **Group by** dropdown above the table: Manager (default) / Category / Brand Ambassador / Status / None.
   - BA standard rate has a dashed-underline tooltip showing the rate's effective date.
   - Override rows show the reason as a badge; hover for the override rate + note.
   - **Cancellation row** (Sarah Chen — Jameson Whiskey): hover the "cancellation" badge → kit pickup / travel / time breakdown (P2 #7).
   - **Recurring regression row** (Ana on the Avion Sunday Tasting): final pay shows ⚠. Approve → recurring-recalc dialog confirms.
   - **Category column** between Date and Brand Ambassador (P0 #1).
6. **Export** tab: pre-export checklist. Button disabled while Missing Payments has rows. Confirm dialog shows totals by territory.
7. After export: cycle status flips to **Awaiting Kayla**. **Reject cycle & re-open** button appears next to the badge (P1 #4).
8. Click **Reject cycle & re-open** → confirmation → cycle returns to in-progress, payroll-lock cleared.
9. **History** tab: previous cycles show **Awaiting Kayla**, **Awaiting Accountant**, **Complete** handoff states.

**Talks to:** Auto-rate calc replaces Larry's external spreadsheet. Active recurring-regression guard. Payroll-lock distinct from billing-lock. Reject-and-rerun for the "forgot Sunday" case. Group-by for the way Larry mentally scans the cycle.

---

### 6. Reports tab — Master Journal, Territory split, Second-eyes review (P3 #9 / #10 / #11)

1. From `/ops/dashboard/payroll`, click the **Reports** tab.
2. **Second-eyes reviews** card at the top.
   - One seeded pending request: Larry → Leah, scope = Albany.
   - **Approve** or **Changes** — status updates inline, toast confirms.
   - **Request review** → dialog: reviewer (default Leah), scope (full cycle or a specific territory), optional note. Submit → new pending row at the top.
3. Click **Generate report**:
   - **Date range** picker scopes the report (May-26 addition).
   - Pick **Master Journal** (or **Payroll Report — Complete**) — note the **"Split by territory"** checkbox. Lists territories visible in the current cycle.
   - Tick it → one report per territory ("Master Journal — May 22 · Buffalo", "… · Hudson Valley", etc.). Each becomes its own card in the archive.
4. Click the seeded **Master Journal — Current Cycle** card → printable preview.
   - Grand total, BAs paid, line items in a top stat bar.
   - Grouped by manager — Metro Region, North Jersey, Outer Boroughs, Upstate NY.
   - **Print** button invokes `window.print()`.

**Talks to:** Sarah Scott's master journal, Larry's per-Upstate-market printing, Leah's pre-export sign-off.

---

### 7. Activity-edit lockout when payroll-locked (P1 #6)

Anchors Leah's 00:46:40 item (HEMS bug: billing locks names but payroll doesn't).

1. From `/ops/dashboard/activities`, find an activity dated **Feb 28, 2026**.
2. Open the detail page.
3. **Brand Ambassador Assignment** section: red banner **"Payroll-locked — Brand Ambassador edits disabled"**. No add/remove buttons.
4. The rest of the page (notes, dashboards) is unaffected.
5. Open a Live or Upcoming activity — assign/manage buttons return.

**Talks to:** Mirroring the existing billing-lock for the payroll side.

---

### 8. Set BA standard rate (refreshed)

1. Open `/market-manager/brand-ambassadors/edu-1` (Ana Martinez).
2. **Compensation** panel: current rate $40/hr, three-entry rate history (one upcoming Jun 1 uplift to $42), three recent overrides, "Frequent overrides" amber hint.
3. **Edit rate** → modal.
4. Past effective date is blocked (uses local date, not UTC).
5. Set a new rate (e.g. $44), pick a future date, confirm preview, save.
6. New entry at the top of Rate History.

**Talks to:** mm-ui-008. Rate effective-date logic, no back-dating.

---

### 9. Client Staff — activity creation wizard with billing step (refreshed)

1. Open `/staff/activities/create`.
2. Step 1 (Campaign — e.g. "Summer Seltzer Launch") → Step 2 (Activity Basics — matched location, e.g. "Total Wine") → Step 3 (Objectives) → Step 4 (**Billing**).
3. **BA roster is optional** at activity creation (per Leah, May-26). You can continue with zero BAs assigned and add them during scheduling. No "must assign a BA" hard gate.
4. If you do skip Step 4 entirely without filling any required field, a red banner renders on the Billing step itself (validation no longer writes into the Location field).
5. Add a BA — Pay per Brand Ambassador auto-fills with their standard rate.
6. Change Pay manually → triggers the Override Reason picklist.
7. Toggle activity type to **Survey** — fields switch to expected completions × per-completion rate, service fee drops to 0.
8. **Max bar spend** input only shows for on-premise (bar) venues (see Flow 3).
9. **Service fee math** (May-26 fix):
   - Bar venues: 10% × bar spend (estimate, recalc'd post-activity from actuals).
   - Trade venues (off-premise / special): 20% × event amount.
   - Surveys: no service fee.
10. The Live invoice preview updates in real time.
11. Continue → Products → Customization → Create Activity.

**Talks to:** mm-ui-011. Activity-as-billable generalisation, override badge propagation, distributor-as-billed-party, May-26 service-fee math fix, optional BA roster.

---

### 10. Template (campaign sub-grouping)

Previously called "Activity" — renamed to **Template** to free up "Activity" for the umbrella concept.

1. Open `/staff/campaigns` → click any campaign (e.g. Summer Seltzer Launch).
2. New **Templates** section — pre-configures activity creation with channels + products.
3. Click **+ Activity** on a template card — opens the wizard with the template's products / channels / venue type pre-filled.

The campaign detail page also exposes the campaign's **curated billing codes** (e.g. `SLT-LAUNCH-OFF`, `SLT-LAUNCH-ON`, `SLT-LAUNCH-EVT`). These are what the Edit Activity Billing modal pulls from on the ops side.

**Talks to:** the new hierarchy + the May-26 billing-code-from-campaign decision.

---

### 11. Post-activity expenses (P2 #8)

1. From `/ops/dashboard/billing`, **Invoices** tab.
2. Find an invoice group that has post-activity expenses (e.g. Pearl Street Pub line).
3. Click **View / Edit**.
4. **"Post-activity expenses (Kayla's columns)"** panel — Supplies, Promotion & Publicity, Travel & Entertainment per activity.
5. Amounts roll into the line total automatically.
6. The same fields are editable on Update Billing via the pencil → Edit Activity Billing modal.

**Talks to:** Kayla's spreadsheet columns being first-class on the data model.

---

### 12. Campaign Tag + Payment Status (May-26)

A quick scan of the new cross-cutting affordances.

1. **Campaign Tag** — Open `/ops/dashboard/billing`. Every row in Missing Bills, Update Billing, Invoices, and the Invoice Details modal carries a burgundy Campaign Tag. Click it: opens the campaign in a new tab. Hover: tooltip shows the campaign name + the Power Automate joining string (campaign ID).
2. **Invoice payment status** — Switch to the **History** tab.
   - Each row shows a **payment status** badge (Open / Partially paid / Paid / Overdue).
   - Filter the table by status using the dropdown above.
   - Click **Update payment** on any row → dialog: pick the new status, enter a partial-paid amount if applicable, save. Toast confirms; the row updates in place.

**Talks to:** Ivie's May-26 ask that the Power Automate joining string be visible end-to-end + first-class A/R tracking that didn't exist in HEMS.

---

## Hidden but data-model-present

These features have data fields and seed values in place but are intentionally hidden. Easy to re-enable when needed.

- **Travel-pay (mileage × rate)** for Upstate — `travelComponent: { miles, ratePerMile, amount }` exists on `BillingActivity` and `PayrollLineItem`. The Upstate seed rows carry it. The wizard input and the Approve-row tooltip have been removed; data flows are untouched.

Out of scope for now:

- **OCR receipt auto-reading** — Phase 2 in the wiki; not in the prototype.
- **Configurable reporting for SaaS clients** — Phase 2+ in the wiki; not in the prototype.

---

## Open schema questions (for the Ivie session, not bugs)

1. **Cancellation rate** — currently territory-level (e.g. $50 flat). Should this be BA-level?
2. **Ambassador Amount** — defined as pay + override delta. Confirm interpretation.
3. **Payment column** in the CSV export — needs interpretation per Larry / Kayla.

---

## Seed data cheat sheet

| What | Where | Why it's there |
|---|---|---|
| 1 SGWS NY event (SLA-eligible) | `billing-data.ts` `act-bill-001` | SLA verification flow |
| 1 cancelled event | `billing-data.ts` `act-bill-002` + `pli-003` | Set Partial Bill + breakdown tooltip |
| 1 recurring regression | `billing-data.ts` `act-bill-003` + `payroll-data.ts` `pli-004` | Recurring recalc guard |
| Survey activity row | `act-bill-006` + `pli-009` | Activity-as-billable generalisation |
| BA with full rate history | `brand-ambassador-roster-data.ts` edu-1 (Ana) | Effective-date + frequent-overrides hint |
| Historical billing invoices | `MOCK_INVOICES` initial values | History tab + payment status mix (open/partial/paid/overdue) |
| Historical payroll cycles | `HISTORICAL_PAYROLL_CYCLES` | Handoff states |
| Historical pay-history line items | `HISTORICAL_PAYROLL_LINE_ITEMS` (5 rows for Ana + David Kim) | Pay History panel content |
| Upstate territory split | `pli-008` (Albany) + `pli-008b` (Buffalo) + `pli-008c` (Hudson Valley) | Territory split-print demo |
| Bar-spend ceiling demo | `act-bill-003`, `act-bill-005` with `barSpend` + `maxBarSpend` populated | Bar-spend math on invoice |
| Post-activity expenses | `act-bill-005` (`suppliesAmount`, `promotionPublicityAmount`) | Kayla's columns panel + edit modal |
| Activity payroll-lock demo | `EVENTS` Feb 28, 2026 row marked `payrollLocked: true` | Lockout banner |
| Pending review | `reviewRequests` initial state in payroll-workspace-page.tsx | Second-eyes review card |
| Campaign billing codes | `campaign-data.ts` `INITIAL_CAMPAIGNS[*].billingCodes` | Edit Activity Billing code dropdown |

---

## Activity categories (for reference)

| Value | Label | When to expect it |
|---|---|---|
| on-premise-sla | On-Premise SLA | SGWS NY activities (Total Wine, Moxy, etc.) |
| on-premise | On-Premise | Generic bar / restaurant venues |
| off-premise | Off-Premise | Retail tastings |
| beer-promotion | Beer Promotion | Beer-specific activations |
| on-dedicated / off-dedicated | On/Off-Dedicated | Brand-dedicated events |
| on-trade | On-Trade | Trade events |
| mixology | Mixology | Specialty cocktail events |
| health-desk | Health Desk | Wellness activations |
| warehouse-storage | Warehouse Storage | Internal storage activities |
| payroll-adjustment | Payroll Adjustment | Manual adjustments outside an activity |
| survey | Survey | Non-event activity type |

---

## File layout

### Shared types
- `src/app/shared/data/billing-types.ts` — every R2 type: `OverrideReason`, `ServiceFeeKind`, `ActivityCategory`, `BillingActivity`, `Invoice`, `InvoicePaymentStatus`, `PayrollLineItem`, `PayrollReviewRequest`, `CancellationAdjustment`, `SlaReportRow`, `RateHistoryEntry`, `TravelComponent`, `BAR_SPEND_CEILING`, `BAR_SPEND_GRATUITY_RATE`, `DEFAULT_MILEAGE_RATE`, `INVOICE_PAYMENT_STATUSES`.

### Mock data
- `src/lib/account-data.ts` — accounts (single `billingEntity: "Hart Agency"`), `serviceFeeKind`, `liquorLicence`, `billingAddress`.
- `src/app/market-manager/components/brand-ambassador-roster-data.ts` — BAs with `standardRate`, `rateHistory`, `recentOverrides`. Ana Martinez (`edu-1`) is the rich demo.
- `src/app/ops/components/billing-data.ts` — current billing cycle, activities, invoices (with payment status), SLA Report rows, cancellation adjustments, invoice counter (peek/consume), `updateInvoicePayment`.
- `src/app/ops/components/payroll-data.ts` — current payroll cycle, line items, historical line items, historical cycles, generated reports archive.
- `src/app/staff/components/campaign-data.ts` — campaigns + curated `billingCodes` per campaign.

### Key screens / components
- `src/app/ops/components/billing-workspace-page.tsx` — billing workspace: Overview, Missing Bills, Update Billing, Invoices, Reports, History. Billing-period filter, payment-status filter + Update Payment dialog, single-entity grouping.
- `src/app/ops/components/payroll-workspace-page.tsx` — payroll workspace + Master Journal preview + Request Review dialog + Reject cycle dialog + Group-by dropdown.
- `src/app/ops/components/set-partial-bill-modal.tsx` — cancellation flow.
- `src/app/ops/components/resolve-sla-modal.tsx` — SGWS NY licence verification.
- `src/app/ops/components/qb-export-dialog.tsx` — QuickBooks export.
- `src/app/ops/components/recurring-recalc-dialog.tsx` — recurring guard.
- `src/app/ops/components/invoice-details-modal.tsx` — view/edit invoice line items + post-activity expenses panel + per-activity exclude.
- `src/app/ops/components/edit-activity-billing-modal.tsx` — per-row edit on Update Billing, billing-code dropdown from campaign, Save / Save & Approve.
- `src/app/ops/components/campaign-tag.tsx` — reusable burgundy badge with click-through + Power-Automate-string tooltip.
- `src/app/ops/components/generate-report-dialog.tsx` — Generate Report dialog with date range + split-by-territory.
- `src/app/market-manager/components/compensation-panel.tsx` + `edit-rate-modal.tsx` — BA rate management.
- `src/app/market-manager/components/pay-history-panel.tsx` — BA pay history grouped by cycle.
- `src/app/staff/components/step-billing.tsx` — billing step in the activity creation wizard (May-26 service-fee math + optional BA roster).
- `src/app/shared/components/persona-switcher.tsx` — floating persona switcher.

### Routing
- `src/app/routes.tsx` — `/ops/dashboard/billing`, `/payroll`, `/brand-ambassadors`, `/activities`, `/draft-activities`, `/help`, plus `/staff/activities/...` and `/market-manager/...`

### Deployment
- `vercel.json` — SPA rewrite (`/(.*) → /index.html`) so deep links resolve on Vercel.

---

## Known caveats

1. **No persistence.** Every reload resets seed data. Approvals / exports / rate edits / reviews / payment updates are session-local.
2. **The wizard's billing inputs don't flow into the ops surfaces.** The Hart Ops views run off the seed datasets directly.
3. **TypeScript pre-existing errors** in `app-shell.tsx`, `brand-assets-page.tsx`, `settings-page.tsx`. None are from R2; the dev server runs regardless.
4. **Capability Matrix** at `/ops/dashboard/help` is accessible via Help → Security & Permissions. Kept as-is; not in the main nav.
5. **Travel-pay UI is intentionally hidden.** Data model is in place; rendering is removed.

---

## Demo arc — suggested 25-minute walkthrough

| Min | Flow | Talking point |
|---|---|---|
| 0–2 | Persona switcher + sidebar terminology + Hart Agency consolidation | Set the stage |
| 2–5 | Flow 2 — Activity-category filter | Larry's first action at 00:03:27 |
| 5–9 | Flow 3 — Max bar spend + service fee math | Kayla's $700 ceiling + May-26 math fix |
| 9–15 | Flow 4 — Full billing cycle (SLA → edit row → approve → billing periods → QB export → payment status) | Improvement-first framing for Ivie |
| 15–19 | Flow 5 — Full payroll cycle (filter → group-by → approve → export → reject) | Auto-rate, recurring guard, payroll-lock |
| 19–22 | Flow 6 — Master Journal + territory splits + second-eyes | Sarah Scott + Leah |
| 22–24 | Flow 12 — Campaign Tag click-through + History payment status | Power Automate joining string surfaced end-to-end + A/R tracking |
| 24–25 | Flow 1 — BA Pay History tab | Larry's wishlist |

---

## Stopping & restarting the dev server

```sh
cd /Users/joegreen/Ambar/Clients/Hart/Hartopsprototype
pnpm dev
```

Ctrl-C to stop. Vite hot-reloads on file changes.
