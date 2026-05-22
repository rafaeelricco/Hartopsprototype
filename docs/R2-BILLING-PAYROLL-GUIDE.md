# R2 — Billing & Payroll: Testing Guide

This is the prototype anchor for the Ivie controller-transition conversation. Everything is frontend-only with seed data — no backend, no persistence (state resets on page reload).

Dev server: **http://localhost:5173/**

## Quick links

| Surface | URL | Persona |
|---|---|---|
| Hart Ops sign-in | http://localhost:5173/ops | — |
| **Billing Workspace** | http://localhost:5173/ops/dashboard/billing | Finance Operator |
| **Payroll Workspace** | http://localhost:5173/ops/dashboard/payroll | Finance Operator |
| Educator detail — Ops view (rate panel) | http://localhost:5173/ops/dashboard/educators/EDU-001 | Finance Operator |
| Educator detail — Manager view (rate panel) | http://localhost:5173/educator/educators/edu-1 | Educator Manager |
| Event creation wizard | http://localhost:5173/staff/events/create | Client Staff |

The sign-in pages accept anything — click straight through. Hart Ops sidebar now has **Billing** and **Payroll** entries between Events and Settings.

### Persona switcher

A floating **persona switcher** is pinned to the bottom-left of every screen. Click it to jump between Hart Ops, Client Staff, and Educator Manager without re-signing-in. It hard-navigates (resets in-memory state) so it's also useful for restoring seed data after testing.

## What lives where

### Shared types
- `src/app/shared/data/billing-types.ts` — every R2 type (BillingEntity, OverrideReason, ServiceFeeKind, BillingActivity, Invoice, PayrollLineItem, CancellationAdjustment, SlaReportRow, RateHistoryEntry, etc.)

### Mock data
- `src/lib/account-data.ts` — accounts now carry `billingEntity`, `serviceFeeKind`, `liquorLicence`, `billingAddress`. New `acc-7` (Pearl Street Pub) seeds the Upstate NY entity.
- `src/app/educator/components/educator-roster-data.ts` — every educator has `standardRate`, `rateHistory`, `recentOverrides`. Ana Martinez (edu-1) carries the full demo (2 historical rates + 1 upcoming change + 3 overrides).
- `src/app/ops/components/billing-data.ts` — current billing cycle, activities, invoices, SLA Report rows, generated reports archive, cancellation adjustments.
- `src/app/ops/components/payroll-data.ts` — current payroll cycle, line items (with override badges, recurring recalc flags, cancellation row, survey row), historical cycles with handoff states.

### New screens / components
- `src/app/ops/components/billing-workspace-page.tsx` — full billing workspace, all tabs
- `src/app/ops/components/payroll-workspace-page.tsx` — full payroll workspace, all tabs
- `src/app/ops/components/set-partial-bill-modal.tsx` — cancellation flow (replaces the manager-emails-Kim email loop)
- `src/app/ops/components/resolve-sla-modal.tsx` — SGWS NY licence verification
- `src/app/ops/components/qb-export-dialog.tsx` — QuickBooks export with distributor ID picker
- `src/app/ops/components/recurring-recalc-dialog.tsx` — active guard for recurring events with changed educator count
- `src/app/educator/components/compensation-panel.tsx` + `edit-rate-modal.tsx` — BA rate management, mounted on **both** educator detail pages (ops + educator manager). Takes primitive props so the same component renders against either platform's Educator shape.
- `src/app/shared/components/persona-switcher.tsx` — floating dev-only switcher for jumping between Hart Ops / Client Staff / Educator Manager; mounted in `App.tsx`
- `src/app/staff/components/step-billing.tsx` — new billing step inserted as step 4 in the event creation wizard

### Wiring
- `src/app/routes.tsx` — `/ops/dashboard/billing` and `/ops/dashboard/payroll` registered
- `src/app/ops/components/app-sidebar.tsx` — sidebar links added

## Test flows

These are the six golden paths. Each one anchors a specific Ivie-conversation talking point.

### 1. Educator Manager — set a BA's standard rate

1. Open `/educator/educators/edu-1` (Ana Martinez).
2. Scroll to the **Compensation** panel.
3. You should see: current rate $40/hr, rate history with three entries (one upcoming Jun 1 uplift to $42), three recent overrides (Extended Event, Travel, Special Skill), and a "Frequent overrides" amber hint.
4. Click **Edit rate** → modal opens.
5. Try an effective date in the past — gets blocked.
6. Set a new rate (e.g. $44), pick a future date, confirm the "N upcoming events affected" preview, save.
7. New entry should appear at the top of Rate History.

**Talks to:** mm-ui-008. Rate effective-date logic, no back-dating, override visibility.

### 2. Client Staff — billing step in event creation

1. Open `/staff/events/create`.
2. Walk through steps 1–3 (Campaign → Event Basics → Objectives). In Event Basics, **make sure to select a location with a matched account** (e.g. start typing "Total Wine") so billing fields populate.
3. At step 4 (new **Billing** step):
   - Confirm Billed To, Liquor Licence, Distributor ID are auto-filled from the account.
   - SLA-eligibility banner appears for SGWS NY accounts (Total Wine, Whole Foods, Moxy, Pearl Street).
   - Billing entity is defaulted from the account; change it to see the "override is logged" hint.
   - Pick a Lead BA — Pay per Educator auto-fills with their standard rate.
   - Change Pay manually → triggers the Override Reason picklist.
   - Toggle activity type to **Survey** — fields switch to expected completions × per-completion rate, service fee drops to 0.
   - The "Live invoice preview" card at the bottom updates in real time.
4. Continue → Products → Customization → Create Event.

**Talks to:** mm-ui-011. Activity-as-billable generalisation, override badge propagation, distributor-as-billed-party.

### 3. Hart Ops Billing — full cycle

1. Open `/ops/dashboard/billing`.
2. **Overview** tab: three KPIs, cycle progress bar, red alert banner.
3. **Missing Bills** tab: four rows.
   - **SLA row** (Absolut at Total Wine): click **Resolve SLA** → modal shows the on-file licence, "active on event date" status, and a checkbox gate. Tick & confirm. Row drops out of Missing Bills.
   - **Cancellation row** (Jameson at Dead Rabbit): click **Set partial bill** → modal includes the green "this replaces the email to the booker" callout. Fill in reason, kit pickup / travel / time amounts, supplier bill, save. Audit entry is logged.
   - **Recurring regression row** (Avion Sunday Tasting): click **Recalculate** → toast confirms recalc to new educator count.
4. **Update Billing** tab: all activities ready for approval show here.
   - **Billing Entity is a first-class editable dropdown on every row.** Try changing one — "override logged" appears below it.
   - SLA-eligible rows without a verified licence are visibly blocked from approval.
   - Multi-select with the row checkboxes → **Approve selected** (or **Select all eligible**).
5. **Invoices** tab: approved rows group by Billed To + Billing Entity (three entities never mix in one invoice). Each group shows the auto-generated invoice number.
   - Click **Export to QuickBooks** → distributor ID picker (Southern / Empire / None) + Licence Verified checkbox. Confirm → invoice locks, moves to History.
6. **Reports** tab: click **SLA Report** to see the seeded artefact (licence number, active status, executor, spend) — same shape that would go back to SGWS. Cancellation adjustments table below lists the entry from step 3.
7. **History** tab: locked invoices from the current cycle plus two seeded historical cycles.

**Talks to:** mm-ui-012. Improvement-first framing: bulk approval, auto invoice numbers, distributor-as-billed-party in every list, audit-replacing-email loop, billing-lock.

### 4. Hart Ops Payroll — full cycle

1. Open `/ops/dashboard/payroll`.
2. **Overview**: three KPIs, approval progress bar.
3. Notice the red **"Cannot export while educators are awaiting approval"** banner up top — it's a persistent affordance, not a buried tooltip.
4. **Missing Payments** tab: pre-export gate list. Try **Chase manager** (mock toast). **Approve** moves rows out.
5. **Approve** tab: line items grouped by manager.
   - BA standard rate has a dashed-underline tooltip showing the rate's effective date.
   - Override rows show the reason as a badge; hover for the override rate + note.
   - **Recurring regression row** (Ana on the Avion Sunday Tasting): final pay shows ⚠. Click **Approve** → recurring-recalc dialog opens showing previous educator count → new count and previous pay → new pay. Confirm to recalculate AND approve.
   - Bulk-select with checkboxes for normal rows.
6. **Export** tab: pre-export checklist. The **Export payroll CSV** button is disabled while Missing Payments has rows. Once they're cleared, click it → confirm dialog shows totals by billing entity.
7. After export: cycle status badge in the header flips to **Awaiting Kayla** (visually distinct burgundy lock badge — different from billing-lock).
8. **History** tab: previous cycles show **Awaiting Kayla**, **Awaiting Accountant**, and **Complete** handoff states.

**Talks to:** mm-ui-013. Auto-rate calc replaces Larry's external spreadsheet. Override badge visibility. Active recurring-regression guard. Payroll-lock distinct from billing-lock. Handoff status surfaced from History.

### 5. Cross-screen consistency

After running flow #2 with an override, check that the override reason badge would surface in flow #4's Approve tab. (Seed data already has pre-baked overrides — Ana's "Extended Event" badge on the Absolut row is the same shape; the wizard's overrides just don't persist into the in-memory payroll context yet, which is the one open follow-up flagged in the plan.)

### 6. Design audit (quick)

- All new screens use existing primitives from `src/app/shared/components/ui/`.
- Tokens match the existing prototype (Slate borders #E2E8F0, burgundy primary #7D152D, slate background).
- Lucide icons at 1.5px stroke, 12–16–20–24 sizes.
- No raw colors outside `theme.css` other than tone-specific status badges (which mirror existing patterns in events-page / educator-detail-page).

## Seed data cheat sheet

| What | Where | Why it's there |
|---|---|---|
| 1 SGWS NY event | `billing-data.ts` `act-bill-001` | Demos SLA verification flow |
| 1 cancelled event | `billing-data.ts` `act-bill-002` | Demos Set Partial Bill + audit replacement |
| 1 recurring regression | `billing-data.ts` `act-bill-003` + `payroll-data.ts` `pli-004` | Demos active recalc guard |
| Cross-entity invoice group | `act-bill-001` (Hart W&S) + `act-bill-004` (Hart Agency) + `act-bill-005` (Upstate NY) | Demos three-entity governance |
| Survey row | `act-bill-006` + `pli-009` | Demos activity-as-billable generalisation |
| BA with full rate history | `educator-roster-data.ts` edu-1 (Ana) | Demos effective-date + frequent-overrides hint |
| Historical billing invoices | `MOCK_INVOICES` initial values | Populates History tab |
| Historical payroll cycles | `HISTORICAL_PAYROLL_CYCLES` | Surfaces handoff states (Awaiting Kayla / Accountant) |

## Known caveats

1. **No persistence.** Every reload resets seed data. Any approvals/exports/rate edits you make are session-local.
2. **The wizard's billing inputs don't flow into the ops surfaces.** The Hart Ops billing/payroll views run off the seed datasets directly. This is an intentional prototype simplification; wiring the two together is the obvious next step if Ivie wants live data flow.
3. **Schema defaults to challenge in Ivie's session:**
   - Hart entity per account (currently derived from account)
   - Cancellation rate as territory-level (vs BA-level)
   - "Ambassador Amount" = pay + override delta
4. **TypeScript pre-existing errors** in `app-shell.tsx`, `brand-assets-page.tsx`, `settings-page.tsx`. None are from R2; the dev server runs regardless.

## Stopping & restarting the dev server

```sh
cd /Users/joegreen/Ambar/Clients/Hart/Hartopsprototype
pnpm dev
```

Hit Ctrl-C to stop. Vite hot-reloads on file changes.
