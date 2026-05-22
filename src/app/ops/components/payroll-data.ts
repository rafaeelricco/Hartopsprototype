// =============================================================================
// R2 — Payroll workspace seed data
// Feeds the Hart Ops Payroll Workspace (mm-ui-013). Seed shapes a complete
// bi-weekly cycle: Missing Payments → Approve → Export → Locked + Awaiting
// Kayla. Includes one override badge (links to mm-ui-008 override reason), one
// cancellation pay row, and one recurring-event regression requiring inline
// recalc confirmation.
// =============================================================================

import type {
  GeneratedReport,
  PayrollCycle,
  PayrollLineItem,
} from "../../shared/data/billing-types";

// ---------------------------------------------------------------------------
// Current open cycle
// ---------------------------------------------------------------------------

export const CURRENT_PAYROLL_CYCLE: PayrollCycle = {
  id: "pcyc-2026-05a",
  windowStart: "2026-05-08",
  windowEnd: "2026-05-21",
  territory: "Metro NY",
  status: "in-progress",
};

// ---------------------------------------------------------------------------
// Payroll line items for the current cycle
// ---------------------------------------------------------------------------

export let MOCK_PAYROLL_LINE_ITEMS: PayrollLineItem[] = [
  // 1. Awaiting manager approval — no green check yet. Blocks export.
  {
    id: "pli-001",
    activityId: "act-bill-001",
    activityType: "event",
    activityName: "Absolut Vodka Tasting — Total Wine NY",
    date: "2026-05-12",
    accountName: "Total Wine & More",
    educatorId: "edu-1",
    educatorName: "Ana Martinez",
    hours: 4,
    standardRate: 40,
    rateEffectiveDate: "2026-01-01",
    override: {
      rate: 50,
      reason: "Extended Event",
      note: "Extended floor coverage past 7pm.",
    },
    finalPay: 200,
    manager: "Manager — Metro Region",
    billingEntity: "Hart Wine and Spirits",
    status: "missing",
  },
  // 2. Already approved.
  {
    id: "pli-002",
    activityId: "act-bill-001",
    activityType: "event",
    activityName: "Absolut Vodka Tasting — Total Wine NY",
    date: "2026-05-12",
    accountName: "Total Wine & More",
    educatorId: "edu-4",
    educatorName: "David Kim",
    hours: 4,
    standardRate: 45,
    rateEffectiveDate: "2025-10-01",
    finalPay: 180,
    manager: "Manager — Metro Region",
    billingEntity: "Hart Wine and Spirits",
    status: "approved",
  },
  // 3. Cancellation pay row — cancelled event, territory cancellation rate.
  {
    id: "pli-003",
    activityId: "act-bill-002",
    activityType: "event",
    activityName: "Jameson Whiskey Promo — Dead Rabbit",
    date: "2026-05-14",
    accountName: "The Dead Rabbit",
    educatorId: "edu-2",
    educatorName: "Sarah Chen",
    hours: 0,
    standardRate: 38,
    rateEffectiveDate: "2025-12-01",
    override: {
      rate: 50,
      reason: "Cancellation Rate",
      note: "Day-of cancellation; territory cancellation rate applied.",
    },
    finalPay: 50,
    manager: "Manager — North Jersey",
    billingEntity: "Hart Agency",
    status: "pending-manager",
    isCancellation: true,
  },
  // 4. Recurring-event regression — Approve must trigger inline recalc.
  {
    id: "pli-004",
    activityId: "act-bill-003",
    activityType: "event",
    activityName: "Avion Tequila — Recurring Sunday Tasting",
    date: "2026-05-17",
    accountName: "Moxy Times Square (Magic Hour)",
    educatorId: "edu-1",
    educatorName: "Ana Martinez",
    hours: 4,
    standardRate: 40,
    rateEffectiveDate: "2026-01-01",
    finalPay: 160,
    manager: "Manager — Metro Region",
    billingEntity: "Hart Agency",
    status: "missing",
    recurringRecalcRequired: {
      previousEducatorCount: 2,
      currentEducatorCount: 3,
      previousFinalPay: 240, // when 2 educators split a single bonus pool
      newFinalPay: 160,
    },
  },
  // 5. Second educator on recurring event, also unapproved.
  {
    id: "pli-005",
    activityId: "act-bill-003",
    activityType: "event",
    activityName: "Avion Tequila — Recurring Sunday Tasting",
    date: "2026-05-17",
    accountName: "Moxy Times Square (Magic Hour)",
    educatorId: "edu-4",
    educatorName: "David Kim",
    hours: 4,
    standardRate: 45,
    rateEffectiveDate: "2025-10-01",
    override: {
      rate: 55,
      reason: "Special Skill",
      note: "Lead pourer + closing duties.",
    },
    finalPay: 220,
    manager: "Manager — Metro Region",
    billingEntity: "Hart Agency",
    status: "missing",
  },
  // 6. Third educator on recurring event.
  {
    id: "pli-006",
    activityId: "act-bill-003",
    activityType: "event",
    activityName: "Avion Tequila — Recurring Sunday Tasting",
    date: "2026-05-17",
    accountName: "Moxy Times Square (Magic Hour)",
    educatorId: "edu-6",
    educatorName: "Emily Park",
    hours: 4,
    standardRate: 40,
    rateEffectiveDate: "2025-05-22",
    finalPay: 160,
    manager: "Manager — Outer Boroughs",
    billingEntity: "Hart Agency",
    status: "pending-manager",
  },
  // 7. Cross-entity row — Hart Agency Whole Foods event.
  {
    id: "pli-007",
    activityId: "act-bill-004",
    activityType: "event",
    activityName: "Glenlivet Founders Reserve — Whole Foods",
    date: "2026-05-15",
    accountName: "Whole Foods Market — Brooklyn",
    educatorId: "edu-6",
    educatorName: "Emily Park",
    hours: 4,
    standardRate: 40,
    rateEffectiveDate: "2025-05-22",
    finalPay: 160,
    manager: "Manager — Outer Boroughs",
    billingEntity: "Hart Agency",
    status: "approved",
  },
  // 8. Upstate NY row.
  {
    id: "pli-008",
    activityId: "act-bill-005",
    activityType: "event",
    activityName: "Avion Reposado — Pearl Street Pub",
    date: "2026-05-19",
    accountName: "Pearl Street Pub",
    educatorId: "edu-8",
    educatorName: "Lisa Thompson",
    hours: 4,
    standardRate: 38,
    rateEffectiveDate: "2025-12-02",
    finalPay: 152,
    manager: "Manager — Upstate NY",
    billingEntity: "Upstate NY",
    status: "approved",
  },
  // 9. Non-event activity — Survey. Per-completion rate proves the activity-
  //    as-billable generalisation in the payroll surface too.
  {
    id: "pli-009",
    activityId: "act-bill-006",
    activityType: "survey",
    activityName: "Trade Channel Reset Survey — May Wave",
    date: "2026-05-16",
    accountName: "Total Wine & More",
    educatorId: "edu-5",
    educatorName: "Maria Santos",
    hours: 2, // displayed as completions × rate; hours field holds count for survey rows
    standardRate: 15, // per-completion rate
    rateEffectiveDate: "2025-11-05",
    finalPay: 120, // 8 completions × $15
    manager: "Manager — North Jersey",
    billingEntity: "Hart Wine and Spirits",
    status: "approved",
  },
];

// ---------------------------------------------------------------------------
// Past payroll cycles (History tab)
// ---------------------------------------------------------------------------

export const HISTORICAL_PAYROLL_CYCLES: PayrollCycle[] = [
  {
    id: "pcyc-2026-04b",
    windowStart: "2026-04-24",
    windowEnd: "2026-05-07",
    territory: "Metro NY",
    status: "awaiting-kayla",
    exportedAt: "2026-05-08T14:20:00Z",
    totalPay: 4280,
    educatorsPaid: 18,
  },
  {
    id: "pcyc-2026-04a",
    windowStart: "2026-04-10",
    windowEnd: "2026-04-23",
    territory: "Metro NY",
    status: "awaiting-accountant",
    exportedAt: "2026-04-24T14:15:00Z",
    totalPay: 3960,
    educatorsPaid: 16,
  },
  {
    id: "pcyc-2026-03b",
    windowStart: "2026-03-27",
    windowEnd: "2026-04-09",
    territory: "Metro NY",
    status: "complete",
    exportedAt: "2026-04-10T14:10:00Z",
    totalPay: 4120,
    educatorsPaid: 17,
  },
];

// ---------------------------------------------------------------------------
// Generated reports (Reports tab)
// ---------------------------------------------------------------------------

export const MOCK_PAYROLL_REPORTS: GeneratedReport[] = [
  {
    id: "rep-pay-001",
    name: "Payroll Report — April Cycle B",
    kind: "Payroll Report — Complete",
    cycleId: "pcyc-2026-04b",
    generatedAt: "2026-05-08T14:25:00Z",
    format: "Excel",
  },
  {
    id: "rep-pay-002",
    name: "Override Summary — April Cycle B",
    kind: "Override Summary",
    cycleId: "pcyc-2026-04b",
    generatedAt: "2026-05-08T14:30:00Z",
    format: "PDF",
  },
  {
    id: "rep-pay-003",
    name: "Missing Educator Payments — April Cycle A",
    kind: "Missing Educator Payments",
    cycleId: "pcyc-2026-04a",
    generatedAt: "2026-04-23T11:00:00Z",
    format: "CSV",
  },
];

// ---------------------------------------------------------------------------
// Mutators
// ---------------------------------------------------------------------------

export function approvePayrollItems(ids: string[]): void {
  MOCK_PAYROLL_LINE_ITEMS = MOCK_PAYROLL_LINE_ITEMS.map((p) =>
    ids.includes(p.id) ? { ...p, status: "approved" } : p,
  );
}

export function rejectPayrollItem(id: string): void {
  MOCK_PAYROLL_LINE_ITEMS = MOCK_PAYROLL_LINE_ITEMS.map((p) =>
    p.id === id ? { ...p, status: "rejected" } : p,
  );
}

export function acknowledgeRecurringRecalc(id: string): void {
  MOCK_PAYROLL_LINE_ITEMS = MOCK_PAYROLL_LINE_ITEMS.map((p) => {
    if (p.id !== id || !p.recurringRecalcRequired) return p;
    const { recurringRecalcRequired, ...rest } = p;
    return {
      ...rest,
      finalPay: recurringRecalcRequired.newFinalPay,
    };
  });
}
