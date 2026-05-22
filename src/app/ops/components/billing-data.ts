// =============================================================================
// R2 — Billing workspace seed data
// Feeds the Hart Ops Billing Workspace (mm-ui-012). Seed is intentionally shaped
// to anchor the Ivie controller-transition conversation: one SLA-eligible event,
// one cancelled event, one recurring-instance regression, one cross-entity
// invoice group, one non-event activity (survey stub), and a populated History
// cycle so billing-lock state is visible.
// =============================================================================

import type {
  BillingActivity,
  BillingCycle,
  CancellationAdjustment,
  GeneratedReport,
  Invoice,
  SlaReportRow,
} from "../../shared/data/billing-types";

// ---------------------------------------------------------------------------
// Current open cycle (the one the operator is working on)
// ---------------------------------------------------------------------------

export const CURRENT_BILLING_CYCLE: BillingCycle = {
  id: "bcyc-2026-05a",
  windowStart: "2026-05-08",
  windowEnd: "2026-05-21",
  territory: "Metro NY",
  status: "in-progress",
};

// ---------------------------------------------------------------------------
// Cancellation Adjustment audit entries (replaces the manager-emails-Kim loop)
// ---------------------------------------------------------------------------

export let CANCELLATION_ADJUSTMENTS: CancellationAdjustment[] = [];

export function logCancellationAdjustment(entry: CancellationAdjustment): void {
  CANCELLATION_ADJUSTMENTS = [entry, ...CANCELLATION_ADJUSTMENTS];
}

// ---------------------------------------------------------------------------
// Billable activities in the current cycle
// ---------------------------------------------------------------------------

export let MOCK_BILLING_ACTIVITIES: BillingActivity[] = [
  // 1. SGWS NY event — SLA-eligible, missing licence verification.
  {
    id: "act-bill-001",
    type: "event",
    name: "Absolut Vodka Tasting — Total Wine NY",
    date: "2026-05-12",
    accountId: "acc-1",
    accountName: "Total Wine & More",
    distributor: "Southern Glazer's Wine & Spirits",
    billedTo: "Southern Glazer's Wine & Spirits, 313 Underhill Blvd, Syosset NY",
    billingEntity: "Hart Wine and Spirits",
    region: "Metro NY",
    territory: "Manhattan",
    educatorCount: 2,
    educatorIds: ["edu-1", "edu-4"],
    serviceFeeKind: "trade",
    eventAmount: 600,
    ambassadorAmount: 320,
    travel: 40,
    gratuity: 0,
    expectedAmount: 720 + 144, // event amount + 20% trade fee
    status: "missing",
    missingReason: "SLA — licence not verified",
    slaEligible: true,
    licenceVerified: false,
  },

  // 2. Cancelled event — awaiting Set Partial Bill.
  {
    id: "act-bill-002",
    type: "event",
    name: "Jameson Whiskey Promo — Dead Rabbit",
    date: "2026-05-14",
    accountId: "acc-2",
    accountName: "The Dead Rabbit",
    distributor: "Empire Merchants",
    billedTo: "Empire Merchants LLC, 2 49th Avenue, Long Island City NY",
    billingEntity: "Hart Agency",
    region: "Metro NY",
    territory: "Manhattan",
    educatorCount: 1,
    educatorIds: ["edu-2"],
    serviceFeeKind: "bar",
    eventAmount: 0,
    ambassadorAmount: 0,
    travel: 0,
    gratuity: 0,
    expectedAmount: 0,
    status: "missing",
    missingReason: "Cancelled — partial bill not set",
    slaEligible: false,
    cancellation: {
      id: "canc-002",
      activityId: "act-bill-002",
      loggedAt: "2026-05-14T09:00:00Z",
      operator: "—",
      reason: "Venue cancelled day-of (private event conflict).",
      partialPayComponents: { kitPickup: 0, travel: 0, time: 0 },
      partialSupplierAmount: 0,
      bookerNotified: false,
    },
  },

  // 3. Recurring event with educator-count regression.
  {
    id: "act-bill-003",
    type: "event",
    name: "Avion Tequila — Recurring Sunday Tasting",
    date: "2026-05-17",
    accountId: "acc-5",
    accountName: "Moxy Times Square (Magic Hour)",
    distributor: "Southern Glazer's Wine & Spirits",
    billedTo: "Southern Glazer's Wine & Spirits, 313 Underhill Blvd, Syosset NY",
    billingEntity: "Hart Agency",
    region: "Metro NY",
    territory: "Manhattan",
    educatorCount: 3,
    educatorIds: ["edu-1", "edu-4", "edu-6"],
    serviceFeeKind: "bar",
    eventAmount: 720,
    ambassadorAmount: 480,
    travel: 60,
    gratuity: 50,
    expectedAmount: 720 + 72 + 60 + 50, // event + 10% bar fee + travel + grat
    status: "missing",
    missingReason: "Recurring — educator count changed",
    slaEligible: true,
    licenceVerified: true,
    recurringInstance: {
      seriesId: "series-avion-sunday",
      originalEducatorCount: 2,
      currentEducatorCount: 3,
      requiresRecalc: true,
    },
  },

  // 4. Cross-entity invoice group: Hart Agency activity at Dead Rabbit (above)
  //    pairs with this Hart Wine and Spirits row at Total Wine, plus the Upstate
  //    NY row below — three separate invoices in the same window prove the
  //    entity-never-mixed rule.
  {
    id: "act-bill-004",
    type: "event",
    name: "Glenlivet Founders Reserve — Whole Foods",
    date: "2026-05-15",
    accountId: "acc-3",
    accountName: "Whole Foods Market — Brooklyn",
    distributor: "Southern Glazer's Wine & Spirits",
    billedTo: "Southern Glazer's Wine & Spirits, 313 Underhill Blvd, Syosset NY",
    billingEntity: "Hart Agency",
    region: "Metro NY",
    territory: "Brooklyn",
    educatorCount: 1,
    educatorIds: ["edu-6"],
    serviceFeeKind: "trade",
    eventAmount: 320,
    ambassadorAmount: 160,
    travel: 25,
    gratuity: 0,
    expectedAmount: 320 + 64 + 25,
    status: "ready-to-bill",
    slaEligible: true,
    licenceVerified: true,
  },

  // 5. Upstate NY entity row.
  {
    id: "act-bill-005",
    type: "event",
    name: "Avion Reposado — Pearl Street Pub",
    date: "2026-05-19",
    accountId: "acc-7",
    accountName: "Pearl Street Pub",
    distributor: "Southern Glazer's Wine & Spirits",
    billedTo: "Southern Glazer's Wine & Spirits, 313 Underhill Blvd, Syosset NY",
    billingEntity: "Upstate NY",
    region: "Upstate NY",
    territory: "Albany",
    educatorCount: 1,
    educatorIds: ["edu-8"],
    serviceFeeKind: "bar",
    eventAmount: 280,
    ambassadorAmount: 152,
    travel: 75,
    gratuity: 0,
    expectedAmount: 280 + 28 + 75,
    status: "ready-to-bill",
    slaEligible: true,
    licenceVerified: true,
  },

  // 6. Non-event activity — Survey stub. Proves the activity-as-billable
  //    generalisation flagged by mm11. Per-completion rate × completions; no
  //    service fee on surveys.
  {
    id: "act-bill-006",
    type: "survey",
    name: "Trade Channel Reset Survey — May Wave",
    date: "2026-05-16",
    accountId: "acc-1",
    accountName: "Total Wine & More",
    distributor: "Southern Glazer's Wine & Spirits",
    billedTo: "Southern Glazer's Wine & Spirits, 313 Underhill Blvd, Syosset NY",
    billingEntity: "Hart Wine and Spirits",
    region: "Metro NY",
    territory: "Manhattan",
    educatorCount: 1,
    educatorIds: ["edu-5"],
    serviceFeeKind: "mixer", // 0% — surveys don't carry a fee
    eventAmount: 120, // 8 completions × $15
    ambassadorAmount: 120,
    travel: 0,
    gratuity: 0,
    expectedAmount: 120,
    status: "ready-to-bill",
    slaEligible: false,
  },
];

// ---------------------------------------------------------------------------
// Invoices (current cycle drafts + one historical cycle in History)
// ---------------------------------------------------------------------------

export let MOCK_INVOICES: Invoice[] = [
  // Historical, fully exported and billing-locked.
  {
    id: "inv-2026-04a-001",
    invoiceNumber: "INV-13301",
    manualOverride: false,
    billingEntity: "Hart Agency",
    billedTo: "Southern Glazer's Wine & Spirits, 313 Underhill Blvd, Syosset NY",
    distributor: "Southern Glazer's Wine & Spirits",
    distributorIdUsed: "Southern",
    licenceVerified: true,
    cycleId: "bcyc-2026-04a",
    generatedAt: "2026-04-22T15:30:00Z",
    total: 2840,
    activityIds: ["act-hist-001", "act-hist-002"],
    status: "locked",
    qbSyncedAt: "2026-04-22T15:35:00Z",
    sharepointSentAt: "2026-04-22T15:40:00Z",
  },
  {
    id: "inv-2026-04a-002",
    invoiceNumber: "INV-13302",
    manualOverride: false,
    billingEntity: "Hart Wine and Spirits",
    billedTo: "Empire Merchants LLC, 2 49th Avenue, Long Island City NY",
    distributor: "Empire Merchants",
    distributorIdUsed: "Empire",
    cycleId: "bcyc-2026-04a",
    generatedAt: "2026-04-22T15:31:00Z",
    total: 1620,
    activityIds: ["act-hist-003"],
    status: "locked",
    qbSyncedAt: "2026-04-22T15:36:00Z",
    sharepointSentAt: "2026-04-22T15:41:00Z",
  },
];

export const HISTORICAL_BILLING_CYCLES: BillingCycle[] = [
  {
    id: "bcyc-2026-04a",
    windowStart: "2026-04-10",
    windowEnd: "2026-04-23",
    territory: "Metro NY",
    status: "complete",
  },
  {
    id: "bcyc-2026-03b",
    windowStart: "2026-03-27",
    windowEnd: "2026-04-09",
    territory: "Metro NY",
    status: "complete",
  },
];

// ---------------------------------------------------------------------------
// SLA Report seed artefact (mm11 field set)
// ---------------------------------------------------------------------------

export const MOCK_SLA_REPORT: SlaReportRow[] = [
  {
    activityId: "act-bill-001",
    activityName: "Absolut Vodka Tasting — Total Wine NY",
    date: "2026-05-12",
    accountName: "Total Wine & More",
    licenceNumber: "NY-LIQ-44218",
    licenceActiveAtEventDate: true,
    executor: "Ana Martinez",
    spendAmount: 864,
  },
  {
    activityId: "act-bill-003",
    activityName: "Avion Tequila — Recurring Sunday Tasting",
    date: "2026-05-17",
    accountName: "Moxy Times Square (Magic Hour)",
    licenceNumber: "NY-LIQ-30992",
    licenceActiveAtEventDate: true,
    executor: "David Kim",
    spendAmount: 902,
  },
];

// ---------------------------------------------------------------------------
// Generated reports archive (Reports tab)
// ---------------------------------------------------------------------------

export const MOCK_BILLING_REPORTS: GeneratedReport[] = [
  {
    id: "rep-bill-001",
    name: "Billing Report — April Cycle A",
    kind: "Billing Report",
    cycleId: "bcyc-2026-04a",
    generatedAt: "2026-04-23T09:15:00Z",
    format: "Excel",
  },
  {
    id: "rep-bill-002",
    name: "SLA Report — April Cycle A",
    kind: "SLA Report",
    cycleId: "bcyc-2026-04a",
    generatedAt: "2026-04-23T09:18:00Z",
    format: "PDF",
  },
  {
    id: "rep-bill-003",
    name: "Cancellation Adjustment Report — April",
    kind: "Cancellation Adjustment Report",
    cycleId: "bcyc-2026-04a",
    generatedAt: "2026-04-23T09:20:00Z",
    format: "PDF",
  },
];

// ---------------------------------------------------------------------------
// Mutators (in-memory; the BillingProvider Context wraps these so React
// re-renders on change).
// ---------------------------------------------------------------------------

export function updateBillingActivity(
  id: string,
  patch: Partial<BillingActivity>,
): void {
  MOCK_BILLING_ACTIVITIES = MOCK_BILLING_ACTIVITIES.map((a) =>
    a.id === id ? { ...a, ...patch } : a,
  );
}

export function approveBillingActivities(ids: string[]): void {
  MOCK_BILLING_ACTIVITIES = MOCK_BILLING_ACTIVITIES.map((a) =>
    ids.includes(a.id) ? { ...a, status: "approved" } : a,
  );
}

export function addInvoice(inv: Invoice): void {
  MOCK_INVOICES = [inv, ...MOCK_INVOICES];
}

export function lockInvoice(id: string): void {
  MOCK_INVOICES = MOCK_INVOICES.map((i) =>
    i.id === id
      ? {
          ...i,
          status: "locked",
          qbSyncedAt: new Date().toISOString(),
          sharepointSentAt: new Date().toISOString(),
        }
      : i,
  );
}

// Auto-generate the next invoice number (continues the historical INV-1330x
// series for prototype realism).
let invoiceCounter = 13302;
export function nextInvoiceNumber(): string {
  invoiceCounter += 1;
  return `INV-${invoiceCounter}`;
}
