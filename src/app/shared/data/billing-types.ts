// =============================================================================
// R2 — Billing & Payroll shared types
// Consumed by Hart Ops billing/payroll workspaces, Client Staff event creation
// billing step, and Market Manager compensation panel.
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

// Bar-spend rules per Kayla (transcript 01:08:32):
// - Hard ceiling of $700 per activity
// - 20% gratuity auto-applied on top of bar spend (Hart bills it, venue keeps it)
// - 10% service fee Hart earns on top (separate from gratuity — see ServiceFeeKind)
export const BAR_SPEND_CEILING = 700;
export const BAR_SPEND_GRATUITY_RATE = 0.2;

// Travel-pay (Upstate territory). Leah at 00:10:34 asked for mileage × rate
// calc that adds to BA payroll. IRS 2026 standard mileage rate seeded as
// default; configurable per BA / territory in production.
export const DEFAULT_MILEAGE_RATE = 0.67; // $/mi

// Travel semantics (Joe 2026-06-04): travel is captured as a per-BA amount.
// The invoice line and totals multiply by the brand-ambassador count, so a
// $45 travel input across 3 BAs becomes $135 on the bill.
export function travelInvoiceTotal(opts: {
  travel: number;
  brandAmbassadorCount: number;
}): number {
  return (opts.travel ?? 0) * Math.max(1, opts.brandAmbassadorCount ?? 0);
}

// Standard hours per channel (brief 2026-06-02 §2). Used to convert
// shift-based pay to hourly. Editable in Settings when the surface grows,
// but locked in code for the prototype.
export type ActivityChannel = "upstate" | "metro-on-premise" | "off-premise";

export const STANDARD_HOURS_BY_CHANNEL: Record<ActivityChannel, number> = {
  upstate: 2,
  "metro-on-premise": 2.5,
  "off-premise": 3,
};

export const ACTIVITY_CHANNEL_LABELS: Record<ActivityChannel, string> = {
  upstate: "Upstate",
  "metro-on-premise": "Metro on-premise",
  "off-premise": "Off-premise",
};

// Derive an activity channel from its category + region. Used as the
// auto-fill key on the edit-rate modal.
export function inferActivityChannel(opts: {
  category?: string;
  region?: string;
}): ActivityChannel {
  const cat = (opts.category ?? "").toLowerCase();
  const region = (opts.region ?? "").toLowerCase();
  if (region.includes("upstate") || region.includes("albany")) return "upstate";
  if (cat.startsWith("off-")) return "off-premise";
  return "metro-on-premise";
}
export interface TravelComponent {
  miles: number;
  ratePerMile: number; // $/mi
  // Stored amount so manual override is preserved even if rate changes.
  amount: number; // computed: miles × ratePerMile (or manually overridden)
  manualOverride?: boolean;
}

// Reason for overriding the BA standard rate at event creation. The picklist is
// a first-class field (not free-text) so the override badge propagates through
// to the payroll workspace.
export type OverrideReason =
  | "Extended Event"
  | "Travel"
  | "Special Skill"
  | "Location Premium"
  | "Cancellation Rate"
  | "Other";

export const OVERRIDE_REASONS: OverrideReason[] = [
  "Extended Event",
  "Travel",
  "Special Skill",
  "Location Premium",
  "Cancellation Rate",
  "Other",
];

// Location-premium tier pattern (brief 2026-06-02 §2). Hamptons / Fire Island
// $50/hr for first 3 hours, $32/hr after. Modelled as a per-event override
// pattern the operator can apply; the tiered amount is computed and stored
// in `final_pay` (no new schema). Surfaced as a helper in the edit-rate
// modal and on the payroll line so the operator can sanity-check the math.
export interface LocationPremiumTier {
  highRate: number;          // $/hr for tier-1 hours
  highRateHours: number;     // tier-1 cap
  standardRate: number;      // $/hr after tier-1 cap
}

export const HAMPTONS_PREMIUM: LocationPremiumTier = {
  highRate: 50,
  highRateHours: 3,
  standardRate: 32,
};

export function computeLocationPremiumPay(
  hours: number,
  tier: LocationPremiumTier,
): number {
  const tier1 = Math.min(hours, tier.highRateHours) * tier.highRate;
  const tier2 = Math.max(0, hours - tier.highRateHours) * tier.standardRate;
  return tier1 + tier2;
}

// Activity types that flow through billing/payroll. R2 supports Event today;
// Survey is included as a seed/stub to prove the activity-as-billable
// generalisation that mm11 calls out.
export type ActivityType = "event" | "survey";

// Activity categories that Larry checks off as the first step of a payroll
// cycle (transcript 00:03:27). Multi-select filter on Hart Ops payroll &
// billing workspaces.
export type ActivityCategory =
  | "on-premise-sla"
  | "on-premise"
  | "off-premise"
  | "beer-promotion"
  | "on-dedicated"
  | "off-dedicated"
  | "on-trade"
  | "mixology"
  | "health-desk"
  | "warehouse-storage"
  | "payroll-adjustment"
  | "survey";

export const ACTIVITY_CATEGORIES: { value: ActivityCategory; label: string }[] = [
  { value: "on-premise-sla", label: "On-Premise SLA" },
  { value: "on-premise", label: "On-Premise" },
  { value: "off-premise", label: "Off-Premise" },
  { value: "beer-promotion", label: "Beer Promotion" },
  { value: "on-dedicated", label: "On-Dedicated" },
  { value: "off-dedicated", label: "Off-Dedicated" },
  { value: "on-trade", label: "On-Trade" },
  { value: "mixology", label: "Mixology" },
  { value: "health-desk", label: "Health Desk" },
  { value: "warehouse-storage", label: "Warehouse Storage" },
  { value: "payroll-adjustment", label: "Payroll Adjustment" },
  { value: "survey", label: "Survey" },
];

// =============================================================================
// BrandAmbassador rate management (mm-ui-008)
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
// Billing-code eligibility checklist (brief 2026-06-02 §2)
// =============================================================================
//
// Each billing code carries a required-fields config. Before an invoice can
// generate for an activity, the corresponding fields must be complete on
// that activity. The "Events Ready to Bill" dashboard surfaces missing
// requirements grouped by billing code.
//
// Codes are created and edited in HEMS — see the Billing Code Management
// page. Power Automate consumes the resulting taggable artefacts; bundling
// logic lives outside Ambar's stack.

export type BillingChecklistItem =
  | "recap"           // event recap submitted by manager
  | "photos"          // BA mobile uploaded photo evidence
  | "bar-spend"       // bar-spend receipt + total captured (SLA flow)
  | "travel"          // travel expenses logged where applicable
  | "supplier-approval"; // supplier sign-off (if the billing code requires it)

export const BILLING_CHECKLIST_LABELS: Record<BillingChecklistItem, string> = {
  recap: "Recap",
  photos: "Photos",
  "bar-spend": "Bar spend",
  travel: "Travel",
  "supplier-approval": "Supplier approval",
};

// Billing-code definition. Lives in the Billing Code Management page in HEMS;
// modelled here in-memory for the prototype.
export interface BillingCodeDefinition {
  code: string;            // unique identifier (string key)
  description?: string;    // human-readable label
  campaignId?: string;     // optional: pin the code to a campaign
  requiredFields: BillingChecklistItem[];
  active: boolean;         // toggle to retire a code without deleting
  createdAt: string;       // ISO
  createdBy?: string;
}

// Per-activity completion booleans. Derived where possible from existing
// activity state (e.g. `bar-spend` is true when `barSpend > 0`); manager
// can override the derived value to acknowledge an exception.
export type BillingChecklistState = Partial<Record<BillingChecklistItem, boolean>>;

// =============================================================================
// Supplier contacts (brief 2026-06-02 §2)
// =============================================================================
// Each supplier carries a delivery recipient + CC template that survives
// staff changes. Used when sending invoices, SLA reports, and receipt
// bundles to suppliers via Power Automate / SharePoint / email.

export interface SupplierRecipient {
  name: string;
  email: string;
  role?: string;
}

export interface SupplierContact {
  id: string;
  supplierName: string; // canonical key — e.g. "Pernod Ricard"
  primaryRecipient: SupplierRecipient;
  ccRecipients: SupplierRecipient[];
  notes?: string;
  active: boolean;
  createdAt: string;
}

// =============================================================================
// Billing workspace (mm-ui-012)
// =============================================================================

// Reason an activity is sitting in Missing Bills awaiting operator action.
export type MissingBillReason =
  | "Awaiting approval"
  | "Cancelled — partial bill not set"
  | "SLA — licence not verified"
  | "Recurring — brand ambassador count changed";

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
  category: ActivityCategory;
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
  brandAmbassadorCount: number;
  brandAmbassadorIds: string[];
  serviceFeeKind: ServiceFeeKind;
  // Parent campaign — drives the billing-code dropdown (post May-26 ask from
  // Leah) AND acts as the Power Automate joining string for SLA / receipt /
  // manager-report aggregation (Ivie 00:27:43).
  campaignId?: string;
  campaignName?: string;
  // Billing code (manually assigned per HEMS workflow — Kayla 01:07:15).
  // Drawn from the parent campaign's `billingCodes` list; custom is allowed
  // but logged as `billingCodeCustom: true` for audit.
  billingCode?: string;
  billingCodeCustom?: boolean;
  supplier?: string;
  eventAmount: number; // pre-fee, pre-overrides
  ambassadorAmount: number; // pay total
  travel: number;
  travelComponent?: TravelComponent; // P1 #3 — Upstate mileage × rate breakdown
  // Bar-spend tracking (P0 #10). On-premise activities only.
  // `barSpend` is the actual receipt amount the manager logs post-event.
  // `maxBarSpend` is the customer-budgeted ceiling at creation time (≤ $700).
  // `gratuity` is auto-computed as 20% of barSpend at invoice time.
  barSpend?: number;
  maxBarSpend?: number;
  gratuity: number;
  // SLA capture (R2). Output formatting (SGWS submission) defers to August /
  // post-engagement — HEMS 1.0 keeps producing the report. R2 just captures
  // the receipt artefact + free-text colour so the data is queryable.
  // Per Chris/Joe 2026-05-27: minimum-promise scope — single total + receipt
  // image + notes; AmEx-cardholder rule communicated via UI footnote only.
  receiptUrl?: string;
  clarifyingNotes?: string;
  approvingManager?: string; // explicit name captured at bill approval
  // Billing eligibility checklist (brief 2026-06-02 §2). Items required by
  // the activity's billing code; each can be ticked manually or derived
  // from activity state. Missing items appear in the Events Ready to Bill
  // dashboard.
  billingChecklist?: BillingChecklistState;
  // Three independent status tracks (brief 2026-06-02 §2). Controller
  // edits these directly on the row; defaults are derived from workflow
  // state in the seed.
  activityTrackStatus?: ActivityTrackStatus;
  invoiceTrackStatus?: InvoiceTrackStatus;
  paymentTrackStatus?: PaymentTrackStatus;
  // P2 #12 — Post-activity expense columns (Kayla's spreadsheet additions).
  // Stored here so they roll into the invoice and the next billing/payroll export.
  suppliesAmount?: number;
  promotionPublicityAmount?: number;
  travelEntertainmentAmount?: number;
  expectedAmount: number; // total invoice line
  status: BillingActivityStatus;
  missingReason?: MissingBillReason;
  slaEligible: boolean; // SGWS + NY
  licenceVerified?: boolean;
  cancellation?: CancellationAdjustment;
  recurringInstance?: {
    seriesId: string;
    originalBrandAmbassadorCount: number;
    currentBrandAmbassadorCount: number;
    requiresRecalc: boolean;
  };
}

type BillingApprovalInput = Pick<
  BillingActivity,
  "slaEligible" | "licenceVerified" | "receiptUrl" | "approvingManager"
>;

export function getBillingApprovalBlockReason(
  activity: BillingApprovalInput,
): string | null {
  if (!activity.slaEligible) return null;
  if (activity.licenceVerified !== true) return "Resolve SLA licence first";
  if (!activity.receiptUrl?.trim() || !activity.approvingManager?.trim()) {
    return "Complete manager SLA capture first";
  }
  return null;
}

export function isBillingApprovalReady(activity: BillingApprovalInput): boolean {
  return getBillingApprovalBlockReason(activity) == null;
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

// Payment / AR status — Ivie's ask at 00:25:32 for visibility on money-in.
// Brief 2026-06-02: simple AR statuses only — full aging dashboard depends on
// the deferred two-way QB sync (out-of-scope per the 2026-06-01 Chris call).
export type InvoicePaymentStatus =
  | "open"
  | "unpaid"
  | "partially-paid"
  | "paid"
  | "disputed";

export const INVOICE_PAYMENT_STATUSES: {
  value: InvoicePaymentStatus;
  label: string;
}[] = [
  { value: "open", label: "Open" },
  { value: "unpaid", label: "Unpaid" },
  { value: "partially-paid", label: "Partially paid" },
  { value: "paid", label: "Paid" },
  { value: "disputed", label: "Disputed" },
];

// =============================================================================
// Three independent status tracks (brief 2026-06-02 §2)
// =============================================================================
// Operator-editable status per row. Defaults are derived from workflow state
// in the seed, but the controller can override directly on the row or in the
// Edit modal — the tracks are independent by design.

export type ActivityTrackStatus = "completed" | "not-completed";
export const ACTIVITY_TRACK_STATUSES: {
  value: ActivityTrackStatus;
  label: string;
}[] = [
  { value: "completed", label: "Completed" },
  { value: "not-completed", label: "Not completed" },
];

export type InvoiceTrackStatus = "ready" | "not-ready";
export const INVOICE_TRACK_STATUSES: {
  value: InvoiceTrackStatus;
  label: string;
}[] = [
  { value: "ready", label: "Ready" },
  { value: "not-ready", label: "Not ready" },
];

// Re-export `InvoicePaymentStatus` as the canonical payment-track type so the
// three tracks reference one taxonomy and the dropdown / chip code can share
// a single value set per track.
export type PaymentTrackStatus = InvoicePaymentStatus;

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
  // Invoice lifecycle (brief 2026-06-02 §2):
  //   draft               → generated, controller hasn't reviewed yet
  //   approved-for-sending → controller signed off, ready to export
  //   exported            → QBXML written; controller imports into QuickBooks
  //                         manually (one-way export only — no two-way sync)
  //   locked              → no further edits permitted
  status: "draft" | "approved-for-sending" | "exported" | "locked";
  // Stamped when controller marks "approved for sending". Audit trail for the
  // new invoice approval gate.
  approvedForSendingAt?: string; // ISO
  approvedForSendingBy?: string; // operator name
  qbSyncedAt?: string;
  sharepointSentAt?: string;
  // Payment tracking (Ivie's expanded-tracking ask, May-26).
  paymentStatus: InvoicePaymentStatus;
  paymentDueAt?: string; // ISO date — net-30 default
  paidAmount?: number; // for partial payments
  paidAt?: string; // ISO — last payment received
}

export interface BillingCycle {
  id: string;
  windowStart: string; // YYYY-MM-DD
  windowEnd: string; // YYYY-MM-DD
  territory: string;
  status: "open" | "in-progress" | "exported" | "complete";
}

// SLA Report seed artefact. R2 captures these fields against each SLA-eligible
// activity so HEMS 1.0's existing Python/Azure output script can be re-pointed
// at the new system later (output migration deferred to August — Chris,
// 2026-05-27). Rendered as a mock preview from the Reports tab.
export interface SlaReportRow {
  activityId: string;
  activityName: string;
  date: string;
  accountName: string;
  licenceNumber: string;
  licenceActiveAtEventDate: boolean;
  executor: string; // brandAmbassador name
  spendAmount: number; // receipt total
  receiptUrl?: string; // attached screenshot
  clarifyingNotes?: string; // free text for problem accounts / receipts
  approvingManager?: string; // captured at bill approval
}

// =============================================================================
// Payroll adjustments (brief 2026-06-02 §2)
// =============================================================================
// Prior-period corrections processed in the next batch. A correction posts
// into HEMS as an "ADP pay" line on the individual's pay record — modelled
// here as a separate adjustment row that gets applied to a payroll cycle.

export type PayrollAdjustmentStatus = "pending" | "applied" | "voided";

export interface PayrollAdjustment {
  id: string;
  brandAmbassadorId: string;
  brandAmbassadorName: string;
  amount: number;          // signed; positive = pay correction owed, negative = recovery
  reason: string;
  priorCycleId?: string;   // which prior cycle the correction reconciles
  status: PayrollAdjustmentStatus;
  createdAt: string;       // ISO
  createdBy: string;       // operator
  appliedToCycleId?: string; // populated when status becomes "applied"
  appliedAt?: string;        // ISO
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
  activityCategory: ActivityCategory;
  activityName: string;
  cycleId?: string; // populated for historical rows; current cycle is implicit
  territory: string; // P3 #8 — used for territory split-print reports
  travelComponent?: TravelComponent; // P1 #3 — mileage × rate added to final pay
  // P2 #6 — Cancellation pay breakdown mirroring the billing SetPartialBill modal.
  cancellationBreakdown?: {
    kitPickup: number;
    travel: number;
    time: number;
  };
  date: string; // YYYY-MM-DD
  accountName: string;
  brandAmbassadorId: string;
  brandAmbassadorName: string;
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
    previousBrandAmbassadorCount: number;
    currentBrandAmbassadorCount: number;
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
  brandAmbassadorsPaid?: number;
}

// Second-eyes manager review (P3 #9). Larry asks Leah to review the Upstate
// roster before he runs the final export (transcript 00:23:22).
export interface PayrollReviewRequest {
  id: string;
  cycleId: string;
  reviewer: string; // who's being asked
  requestedBy: string; // who's asking
  territory?: string; // optional scope — empty = full cycle
  status: "pending" | "approved" | "changes-requested";
  requestedAt: string;
  completedAt?: string;
  note?: string; // initial note from the requester
  reviewerComment?: string; // comment from the reviewer on Approve / Changes
}

export interface GeneratedReport {
  id: string;
  name: string;
  kind:
    | "Billing Report"
    | "Not in QB Report"
    | "SLA Report"
    | "Cancellation Adjustment Report"
    | "Customer Schedule"
    | "Payroll Report — Complete"
    | "Master Journal"
    | "Missing Brand Ambassador Payments"
    | "Override Summary";
  cycleId: string;
  generatedAt: string;
  format: "Excel" | "PDF" | "CSV";
}
