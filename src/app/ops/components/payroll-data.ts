// =============================================================================
// R2 — Payroll workspace seed data
// Feeds the Hart Ops Payroll Workspace (mm-ui-013). Seed shapes a complete
// bi-weekly cycle: Missing Payments → Approve → Export → Locked + Awaiting
// Kayla. Includes one override badge (links to mm-ui-008 override reason) and
// one cancellation pay row (handled via the rate-override mechanism).
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
    activityCategory: "on-premise-sla",
    activityName: "Absolut Vodka Tasting — Total Wine NY",
    date: "2026-05-12",
    accountName: "Total Wine & More",
    brandAmbassadorId: "edu-1",
    brandAmbassadorName: "Ana Martinez",
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
    territory: "Manhattan",
    billingEntity: "Hart Agency",
    status: "missing",
  },
  // 2. Already approved.
  {
    id: "pli-002",
    activityId: "act-bill-001",
    activityType: "event",
    activityCategory: "on-premise-sla",
    activityName: "Absolut Vodka Tasting — Total Wine NY",
    date: "2026-05-12",
    accountName: "Total Wine & More",
    brandAmbassadorId: "edu-4",
    brandAmbassadorName: "David Kim",
    hours: 4,
    standardRate: 45,
    rateEffectiveDate: "2025-10-01",
    finalPay: 180,
    manager: "Manager — Metro Region",
    territory: "Manhattan",
    billingEntity: "Hart Agency",
    status: "approved",
  },
  // 3. Cancellation pay row — cancelled event, territory cancellation rate.
  {
    id: "pli-003",
    activityId: "act-bill-002",
    activityType: "event",
    activityCategory: "on-premise",
    activityName: "Jameson Whiskey Promo — Dead Rabbit",
    date: "2026-05-14",
    accountName: "The Dead Rabbit",
    brandAmbassadorId: "edu-2",
    brandAmbassadorName: "Sarah Chen",
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
    territory: "Brooklyn",
    billingEntity: "Hart Agency",
    status: "pending-manager",
    isCancellation: true,
  },
  // 4. Recurring-event line (Avion Sunday tasting).
  {
    id: "pli-004",
    activityId: "act-bill-003",
    activityType: "event",
    activityCategory: "on-premise-sla",
    activityName: "Avion Tequila — Recurring Sunday Tasting",
    date: "2026-05-17",
    accountName: "Moxy Times Square (Magic Hour)",
    brandAmbassadorId: "edu-1",
    brandAmbassadorName: "Ana Martinez",
    hours: 4,
    standardRate: 40,
    rateEffectiveDate: "2026-01-01",
    finalPay: 160,
    manager: "Manager — Metro Region",
    territory: "Manhattan",
    billingEntity: "Hart Agency",
    status: "missing",
  },
  // 5. Second brandAmbassador on recurring event, also unapproved.
  {
    id: "pli-005",
    activityId: "act-bill-003",
    activityType: "event",
    activityCategory: "on-premise-sla",
    activityName: "Avion Tequila — Recurring Sunday Tasting",
    date: "2026-05-17",
    accountName: "Moxy Times Square (Magic Hour)",
    brandAmbassadorId: "edu-4",
    brandAmbassadorName: "David Kim",
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
    territory: "Manhattan",
    billingEntity: "Hart Agency",
    status: "missing",
  },
  // 6. Third brandAmbassador on recurring event.
  {
    id: "pli-006",
    activityId: "act-bill-003",
    activityType: "event",
    activityCategory: "on-premise-sla",
    activityName: "Avion Tequila — Recurring Sunday Tasting",
    date: "2026-05-17",
    accountName: "Moxy Times Square (Magic Hour)",
    brandAmbassadorId: "edu-6",
    brandAmbassadorName: "Emily Park",
    hours: 4,
    standardRate: 40,
    rateEffectiveDate: "2025-05-22",
    finalPay: 160,
    manager: "Manager — Outer Boroughs",
    territory: "Brooklyn",
    billingEntity: "Hart Agency",
    status: "pending-manager",
  },
  // 7. Cross-entity row — Hart Agency Whole Foods event.
  {
    id: "pli-007",
    activityId: "act-bill-004",
    activityType: "event",
    activityCategory: "off-premise",
    activityName: "Glenlivet Founders Reserve — Whole Foods",
    date: "2026-05-15",
    accountName: "Whole Foods Market — Brooklyn",
    brandAmbassadorId: "edu-6",
    brandAmbassadorName: "Emily Park",
    hours: 4,
    standardRate: 40,
    rateEffectiveDate: "2025-05-22",
    finalPay: 160,
    manager: "Manager — Outer Boroughs",
    territory: "Brooklyn",
    billingEntity: "Hart Agency",
    status: "approved",
  },
  // 8. Upstate NY row — includes travel-pay (mileage × rate per P1 #3).
  {
    id: "pli-008",
    activityId: "act-bill-005",
    activityType: "event",
    activityCategory: "on-premise",
    activityName: "Avion Reposado — Pearl Street Pub",
    date: "2026-05-19",
    accountName: "Pearl Street Pub",
    brandAmbassadorId: "edu-8",
    brandAmbassadorName: "Lisa Thompson",
    hours: 4,
    standardRate: 38,
    rateEffectiveDate: "2025-12-02",
    travelComponent: {
      miles: 112,
      ratePerMile: 0.67,
      amount: 75,
    },
    finalPay: 152 + 75, // labor + travel
    manager: "Manager — Upstate NY",
    territory: "Albany",
    billingEntity: "Hart Agency",
    status: "approved",
  },
  // 8a. Upstate Buffalo row.
  {
    id: "pli-008b",
    activityId: "act-bill-005b",
    activityType: "event",
    activityCategory: "on-premise",
    activityName: "Tito's Tasting — Anchor Bar Buffalo",
    date: "2026-05-17",
    accountName: "Anchor Bar (Buffalo)",
    brandAmbassadorId: "edu-9",
    brandAmbassadorName: "Grace Mitchell",
    hours: 4,
    standardRate: 38,
    rateEffectiveDate: "2025-12-02",
    travelComponent: {
      miles: 38,
      ratePerMile: 0.67,
      amount: 25,
    },
    finalPay: 152 + 25,
    manager: "Manager — Upstate NY",
    territory: "Buffalo",
    billingEntity: "Hart Agency",
    status: "approved",
  },
  // 8b. Upstate Hudson Valley row.
  {
    id: "pli-008c",
    activityId: "act-bill-005c",
    activityType: "event",
    activityCategory: "on-premise",
    activityName: "Beefeater Promo — Mohonk Mountain House",
    date: "2026-05-18",
    accountName: "Mohonk Mountain House",
    brandAmbassadorId: "edu-10",
    brandAmbassadorName: "Henry Park",
    hours: 4,
    standardRate: 38,
    rateEffectiveDate: "2025-12-02",
    travelComponent: {
      miles: 64,
      ratePerMile: 0.67,
      amount: 43,
    },
    finalPay: 152 + 43,
    manager: "Manager — Upstate NY",
    territory: "Hudson Valley",
    billingEntity: "Hart Agency",
    status: "approved",
  },
  // 9. Non-event activity — Survey. Per-completion rate proves the activity-
  //    as-billable generalisation in the payroll surface too.
  {
    id: "pli-009",
    activityId: "act-bill-006",
    activityType: "survey",
    activityCategory: "survey",
    activityName: "Trade Channel Reset Survey — May Wave",
    date: "2026-05-16",
    accountName: "Total Wine & More",
    brandAmbassadorId: "edu-5",
    brandAmbassadorName: "Maria Santos",
    hours: 2, // displayed as completions × rate; hours field holds count for survey rows
    standardRate: 15, // per-completion rate
    rateEffectiveDate: "2025-11-05",
    finalPay: 120, // 8 completions × $15
    manager: "Manager — North Jersey",
    territory: "Brooklyn",
    billingEntity: "Hart Agency",
    status: "approved",
  },
];

// ---------------------------------------------------------------------------
// Historical line items (Pay History tab on BA profile — P0 #1)
// Seeds Ana Martinez (edu-1) and David Kim (edu-4) across two prior cycles so
// the panel has meaningful data to render.
// ---------------------------------------------------------------------------

export const HISTORICAL_PAYROLL_LINE_ITEMS: PayrollLineItem[] = [
  // Cycle pcyc-2026-04b (Apr 24 – May 7) — Ana
  {
    id: "hpli-001",
    cycleId: "pcyc-2026-04b",
    activityId: "act-hist-101",
    activityType: "event",
    activityCategory: "on-premise-sla",
    activityName: "Absolut Tasting — Total Wine",
    date: "2026-04-26",
    accountName: "Total Wine & More",
    brandAmbassadorId: "edu-1",
    brandAmbassadorName: "Ana Martinez",
    hours: 4,
    standardRate: 40,
    rateEffectiveDate: "2026-01-01",
    finalPay: 160,
    manager: "Manager — Metro Region",
    territory: "Manhattan",
    billingEntity: "Hart Agency",
    status: "approved",
  },
  {
    id: "hpli-002",
    cycleId: "pcyc-2026-04b",
    activityId: "act-hist-102",
    activityType: "event",
    activityCategory: "on-premise",
    activityName: "Jameson Whiskey Promo — Dead Rabbit",
    date: "2026-05-02",
    accountName: "The Dead Rabbit",
    brandAmbassadorId: "edu-1",
    brandAmbassadorName: "Ana Martinez",
    hours: 5,
    standardRate: 40,
    rateEffectiveDate: "2026-01-01",
    override: {
      rate: 50,
      reason: "Extended Event",
      note: "Extended floor coverage past 7pm.",
    },
    finalPay: 250,
    manager: "Manager — Metro Region",
    territory: "Manhattan",
    billingEntity: "Hart Agency",
    status: "approved",
  },
  // Cycle pcyc-2026-04a (Apr 10 – Apr 23) — Ana
  {
    id: "hpli-003",
    cycleId: "pcyc-2026-04a",
    activityId: "act-hist-103",
    activityType: "event",
    activityCategory: "off-premise",
    activityName: "Glenlivet Founders Reserve — Whole Foods",
    date: "2026-04-13",
    accountName: "Whole Foods Market — Brooklyn",
    brandAmbassadorId: "edu-1",
    brandAmbassadorName: "Ana Martinez",
    hours: 4,
    standardRate: 40,
    rateEffectiveDate: "2026-01-01",
    finalPay: 160,
    manager: "Manager — Metro Region",
    territory: "Manhattan",
    billingEntity: "Hart Agency",
    status: "approved",
  },
  {
    id: "hpli-004",
    cycleId: "pcyc-2026-04a",
    activityId: "act-hist-104",
    activityType: "event",
    activityCategory: "on-premise-sla",
    activityName: "Avion Sunday Tasting — Moxy",
    date: "2026-04-19",
    accountName: "Moxy Times Square (Magic Hour)",
    brandAmbassadorId: "edu-1",
    brandAmbassadorName: "Ana Martinez",
    hours: 4,
    standardRate: 40,
    rateEffectiveDate: "2026-01-01",
    finalPay: 160,
    manager: "Manager — Metro Region",
    territory: "Manhattan",
    billingEntity: "Hart Agency",
    status: "approved",
  },
  // David Kim historical
  {
    id: "hpli-005",
    cycleId: "pcyc-2026-04b",
    activityId: "act-hist-105",
    activityType: "event",
    activityCategory: "on-premise",
    activityName: "Beefeater Gin Tasting — Bemelmans",
    date: "2026-04-30",
    accountName: "Bemelmans Bar",
    brandAmbassadorId: "edu-4",
    brandAmbassadorName: "David Kim",
    hours: 4,
    standardRate: 45,
    rateEffectiveDate: "2025-10-01",
    finalPay: 180,
    manager: "Manager — Metro Region",
    territory: "Manhattan",
    billingEntity: "Hart Agency",
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
    brandAmbassadorsPaid: 18,
  },
  {
    id: "pcyc-2026-04a",
    windowStart: "2026-04-10",
    windowEnd: "2026-04-23",
    territory: "Metro NY",
    status: "awaiting-accountant",
    exportedAt: "2026-04-24T14:15:00Z",
    totalPay: 3960,
    brandAmbassadorsPaid: 16,
  },
  {
    id: "pcyc-2026-03b",
    windowStart: "2026-03-27",
    windowEnd: "2026-04-09",
    territory: "Metro NY",
    status: "complete",
    exportedAt: "2026-04-10T14:10:00Z",
    totalPay: 4120,
    brandAmbassadorsPaid: 17,
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
    name: "Missing Brand Ambassador Payments — April Cycle A",
    kind: "Missing Brand Ambassador Payments",
    cycleId: "pcyc-2026-04a",
    generatedAt: "2026-04-23T11:00:00Z",
    format: "CSV",
  },
  {
    id: "rep-pay-004",
    name: "Master Journal — Current Cycle",
    kind: "Master Journal",
    cycleId: "pcyc-2026-05a",
    generatedAt: "2026-05-22T09:15:00Z",
    format: "PDF",
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

