// =============================================================================
// R2 — Billing & Payroll shared types
// Consumed by Hart Ops billing/payroll workspaces, Client Staff event creation
// billing step, and Educator Manager compensation panel.
// =============================================================================

// Three Hart entities that an activity can be billed/paid through.
// Default per-event is derived from the account; operator can override on the
// Update Billing row (mm11-finance-operator flagged the governance rule as a
// pre-R2 schema question — defaulting from account is the sensible R2 default
// to anchor the Ivie conversation).
export type BillingEntity =
  | "Hart Agency"
  | "Hart Wine and Spirits"
  | "Upstate NY";

export const BILLING_ENTITIES: BillingEntity[] = [
  "Hart Agency",
  "Hart Wine and Spirits",
  "Upstate NY",
];

// Service fee % per venue-type bucket. Bar = 10%, Trade = 20%, Mixer = 0%.
export type ServiceFeeKind = "bar" | "trade" | "mixer";

export const SERVICE_FEE_BY_KIND: Record<ServiceFeeKind, number> = {
  bar: 0.1,
  trade: 0.2,
  mixer: 0,
};

// Reason for overriding the BA standard rate at event creation. The picklist is
// a first-class field (not free-text) so the override badge propagates through
// to the payroll workspace.
export type OverrideReason =
  | "Extended Event"
  | "Travel"
  | "Special Skill"
  | "Cancellation Rate"
  | "Other";

export const OVERRIDE_REASONS: OverrideReason[] = [
  "Extended Event",
  "Travel",
  "Special Skill",
  "Cancellation Rate",
  "Other",
];

// Activity types that flow through billing/payroll. R2 supports Event today;
// Survey is included as a seed/stub to prove the activity-as-billable
// generalisation that mm11 calls out.
export type ActivityType = "event" | "survey";

// =============================================================================
// Educator rate management (mm-ui-008)
// =============================================================================

export interface RateHistoryEntry {
  id: string;
  rate: number; // dollars per hour
  effectiveDate: string; // YYYY-MM-DD
  setBy: string;
  note?: string;
}

export interface RecentOverride {
  activityId: string;
  activityName: string;
  date: string; // YYYY-MM-DD
  standardRate: number;
  overrideRate: number;
  reason: OverrideReason;
}

// =============================================================================
// Account billing extensions (mm11)
// =============================================================================

export interface LiquorLicence {
  number: string;
  state: string;
  activeFrom: string; // YYYY-MM-DD
  activeTo: string; // YYYY-MM-DD
}

// =============================================================================
// Billing workspace (mm-ui-012)
// =============================================================================

// Reason an activity is sitting in Missing Bills awaiting operator action.
export type MissingBillReason =
  | "Awaiting approval"
  | "Cancelled — partial bill not set"
  | "SLA — licence not verified"
  | "Recurring — educator count changed";

export type BillingActivityStatus =
  | "missing"
  | "ready-to-bill"
  | "approved"
  | "invoiced"
  | "billing-locked";

// One billable activity (event or survey) flowing through the billing cycle.
export interface BillingActivity {
  id: string; // activity ID
  type: ActivityType;
  name: string;
  date: string; // YYYY-MM-DD
  accountId: string;
  accountName: string;
  distributor: string;
  billedTo: string; // distributor billing address / corporate billed-to
  billingEntity: BillingEntity; // editable per row in Update Billing
  billingEntityOverridden?: boolean;
  region: string;
  territory: string;
  educatorCount: number;
  educatorIds: string[];
  serviceFeeKind: ServiceFeeKind;
  eventAmount: number; // pre-fee, pre-overrides
  ambassadorAmount: number; // pay total
  travel: number;
  gratuity: number;
  expectedAmount: number; // total invoice line
  status: BillingActivityStatus;
  missingReason?: MissingBillReason;
  slaEligible: boolean; // SGWS + NY
  licenceVerified?: boolean;
  cancellation?: CancellationAdjustment;
  recurringInstance?: {
    seriesId: string;
    originalEducatorCount: number;
    currentEducatorCount: number;
    requiresRecalc: boolean;
  };
}

// Cancellation Adjustment audit entry — written when an operator uses the
// Set Partial Bill modal. Explicit replacement for the manager-emails-Kim loop.
export interface CancellationAdjustment {
  id: string;
  activityId: string;
  loggedAt: string; // ISO
  operator: string;
  reason: string;
  partialPayComponents: {
    kitPickup: number;
    travel: number;
    time: number;
  };
  partialSupplierAmount: number;
  note?: string;
  bookerNotified: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // auto-generated default
  manualOverride: boolean;
  billingEntity: BillingEntity;
  billedTo: string;
  distributor: string;
  distributorIdUsed?: "Southern" | "Empire" | "None";
  licenceVerified?: boolean;
  cycleId: string;
  generatedAt: string; // ISO
  total: number;
  activityIds: string[];
  status: "draft" | "exported" | "locked";
  qbSyncedAt?: string;
  sharepointSentAt?: string;
}

export interface BillingCycle {
  id: string;
  windowStart: string; // YYYY-MM-DD
  windowEnd: string; // YYYY-MM-DD
  territory: string;
  status: "open" | "in-progress" | "exported" | "complete";
}

// SLA Report seed artefact (mm11 field set: licence number, active status at
// event date, executor, spend amount). Rendered as a mock preview from the
// Reports tab.
export interface SlaReportRow {
  activityId: string;
  activityName: string;
  date: string;
  accountName: string;
  licenceNumber: string;
  licenceActiveAtEventDate: boolean;
  executor: string; // educator name
  spendAmount: number;
}

// =============================================================================
// Payroll workspace (mm-ui-013)
// =============================================================================

export type PayrollApprovalStatus =
  | "missing" // no manager approval yet
  | "pending-manager" // manager hasn't actioned
  | "override-pending" // override needs review
  | "approved" // green check
  | "rejected"; // red X

export type PayrollCycleStatus =
  | "open"
  | "in-progress"
  | "exported" // payroll-lock engaged
  | "awaiting-kayla"
  | "awaiting-accountant"
  | "complete";

export interface PayrollLineItem {
  id: string;
  activityId: string;
  activityType: ActivityType;
  activityName: string;
  date: string; // YYYY-MM-DD
  accountName: string;
  educatorId: string;
  educatorName: string;
  hours: number;
  standardRate: number; // from BA record, effective on activity date
  rateEffectiveDate: string; // provenance for tooltip
  override?: {
    rate: number;
    reason: OverrideReason;
    note?: string;
  };
  finalPay: number;
  manager: string;
  billingEntity: BillingEntity;
  status: PayrollApprovalStatus;
  recurringRecalcRequired?: {
    previousEducatorCount: number;
    currentEducatorCount: number;
    previousFinalPay: number;
    newFinalPay: number;
  };
  isCancellation?: boolean;
}

export interface PayrollCycle {
  id: string;
  windowStart: string; // YYYY-MM-DD
  windowEnd: string; // YYYY-MM-DD
  territory: string;
  status: PayrollCycleStatus;
  exportedAt?: string;
  totalPay?: number;
  educatorsPaid?: number;
}

export interface GeneratedReport {
  id: string;
  name: string;
  kind:
    | "Billing Report"
    | "Not in QB Report"
    | "SLA Report"
    | "Cancellation Adjustment Report"
    | "Payroll Report — Complete"
    | "Missing Educator Payments"
    | "Override Summary";
  cycleId: string;
  generatedAt: string;
  format: "Excel" | "PDF" | "CSV";
}
