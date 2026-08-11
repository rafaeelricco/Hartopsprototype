// =============================================================================
// Report registry (reporting brief §3.1)
// =============================================================================
// One declarative list. Each report declares its identity, the parameters it
// supports, its output columns, and the formats it offers.
//
// ADDING A REPORT = ADDING AN ENTRY. No new components. If a new report ever
// needs new UI, the abstraction is wrong — see §8.3, where Supplier-Based
// Events is registered as proof that it doesn't.
// =============================================================================

import {
  type EntityType,
  type Grain,
  type Grouping,
  type ReportFormat,
  type ReportParameters,
  type SectionId,
} from "./report-parameters";
import { REPORTING_SHORTCUTS, resolveShortcut, type RangeShortcut } from "./date-range";

export const REPORT_CATEGORIES = [
  "Activity",
  "Sales",
  "Billing",
  "Payroll",
  "Workforce",
] as const;

export type ReportCategory = (typeof REPORT_CATEGORIES)[number];

/**
 * A column in the report's output. Every column a report declares is emitted:
 * the export is the raw material, and the client slices it in Excel. `section`
 * only groups columns for readability; `grain` marks columns that exist at one
 * grain only.
 */
export interface ReportColumn {
  key: string;
  label: string;
  section: SectionId;
  /** Only emitted at this grain. Omitted = emitted at both. */
  grain?: Grain;
  align?: "left" | "right";
}

export interface ReportDefinition {
  id: string;
  name: string;
  /** One line: what question this report answers. */
  description: string;
  category: ReportCategory;
  /** Legacy HEMS 1.0 name, shown as provenance where one exists. */
  legacyName?: string;

  // ── Declared parameters. Anything omitted is ABSENT from the runner. ──
  /** Shortcuts offered. Defaults to the reporting set. */
  shortcuts?: RangeShortcut[];
  defaultShortcut?: RangeShortcut;
  /** Top-level filters offered. Empty = no filter controls. */
  scopeBy?: EntityType[];
  /**
   * Output shape, DECLARED not asked. Users pick a report, a date range and a
   * few filters — they do not configure grain or grouping. Activity Detail
   * declares product grain so the export carries per-bottle detail; roll-up
   * reports declare a grouping.
   */
  fixedGrain?: Grain;
  fixedGrouping?: Grouping;
  /** Groups columns for readability only — not a user control. */
  sections?: SectionId[];
  formats: ReportFormat[];
  defaultFormat?: ReportFormat;

  /** Output shape. Filtered by section and grain at render time. */
  columns: ReportColumn[];

  /**
   * Flagged where the column set is our proposal rather than a confirmed
   * spec — surfaced in the runner so nobody mistakes it for settled.
   */
  provisionalColumns?: string;
}

// -----------------------------------------------------------------------------
// Defaults
// -----------------------------------------------------------------------------

/** Every parameter has a sane default, so a report runs without being touched. */
export function defaultParameters(def: ReportDefinition): ReportParameters {
  const shortcut = def.defaultShortcut ?? "last-month";
  return {
    shortcut,
    range: resolveShortcut(shortcut),
    scope: {},
    ...(def.fixedGrouping ? { grouping: def.fixedGrouping } : {}),
    ...(def.fixedGrain ? { grain: def.fixedGrain } : {}),
    sections: def.sections ?? [],
    toggles: {},
    splitBy: null,
    format: def.defaultFormat ?? def.formats[0]!,
  };
}

export function shortcutsFor(def: ReportDefinition): RangeShortcut[] {
  return def.shortcuts ?? REPORTING_SHORTCUTS;
}

/**
 * Columns emitted. Every declared column is included — the point of the export
 * is to hand over the data whole, so there is nothing to tick or untick. Only
 * the report's declared grain filters the set.
 */
export function visibleColumns(def: ReportDefinition): ReportColumn[] {
  const grain = def.fixedGrain ?? "activity";
  return def.columns.filter((c) => !c.grain || c.grain === grain);
}

// =============================================================================
// The registry
// =============================================================================

// ── Activity Detail Report (legacy "Event Detailed") ─────────────────────────
// Answers: what happened at each activity, in full.
// Grain matters most here: at activity grain a multi-product activity is one
// row with collapsed product counts — exactly today's complaint.

const ACTIVITY_DETAIL: ReportDefinition = {
  id: "activity-detail",
  name: "Activity Detail Report",
  description:
    "Full per-activity results, demographics and product outcomes.",
  category: "Activity",
  legacyName: "Event Detailed",
  defaultShortcut: "last-month",
  scopeBy: ["campaign", "supplier", "distributor", "premiseType", "region"],
  // Fixed, not asked. Product grain is the finest cut, so the CSV carries
  // per-bottle detail and Excel can roll it up any way the client wants —
  // which is what Leah was asking for, without a control to get wrong.
  fixedGrain: "product",
  sections: [
    "activity",
    "commercial",
    "geography",
    "staffing",
    "demographics",
    "productResults",
    "other",
    "photos",
    "kpis",
  ],
  formats: ["Excel", "CSV", "PDF"],
  defaultFormat: "Excel",
  columns: [
    { key: "activityId", label: "Activity ID", section: "activity" },
    { key: "activityName", label: "Activity", section: "activity" },
    { key: "date", label: "Date", section: "activity" },
    { key: "startTime", label: "Start", section: "activity" },
    { key: "endTime", label: "End", section: "activity" },
    { key: "duration", label: "Duration", section: "activity" },
    { key: "premiseType", label: "Premise type", section: "activity" },

    // Product detail sits directly after the activity identity: at product
    // grain consecutive rows share an activity, so the distinguishing column
    // has to be visible without scrolling.
    {
      key: "productName",
      label: "Product",
      section: "productResults",
      grain: "product",
    },
    {
      key: "productSize",
      label: "Size",
      section: "productResults",
      grain: "product",
    },
    {
      key: "bottlesSold",
      label: "Bottles sold",
      section: "productResults",
      align: "right",
    },
    {
      key: "price",
      label: "Price",
      section: "productResults",
      grain: "product",
      align: "right",
    },
    {
      key: "featuredPrice",
      label: "Featured price",
      section: "productResults",
      grain: "product",
      align: "right",
    },
    {
      key: "startingInventory",
      label: "Starting inv.",
      section: "productResults",
      grain: "product",
      align: "right",
    },
    {
      key: "drinksPurchased",
      label: "Drinks purchased",
      section: "productResults",
      grain: "product",
      align: "right",
    },
    {
      key: "endingInventory",
      label: "Ending inv.",
      section: "productResults",
      grain: "product",
      align: "right",
    },
    {
      key: "productsCollapsed",
      label: "Products",
      section: "productResults",
      grain: "activity",
    },

    { key: "campaign", label: "Campaign", section: "commercial" },
    { key: "supplier", label: "Supplier", section: "commercial" },
    { key: "brand", label: "Brand", section: "commercial" },
    { key: "distributor", label: "Distributor", section: "commercial" },
    { key: "account", label: "Account", section: "commercial" },
    { key: "billedTo", label: "Billed to", section: "commercial" },

    { key: "region", label: "Region", section: "geography" },
    { key: "territory", label: "Territory", section: "geography" },
    { key: "city", label: "City", section: "geography" },
    { key: "state", label: "State", section: "geography" },

    { key: "brandAmbassadors", label: "Brand Ambassador(s)", section: "staffing" },
    { key: "checkIn", label: "Check-in", section: "staffing" },
    { key: "checkOut", label: "Check-out", section: "staffing" },
    { key: "hours", label: "Hours", section: "staffing", align: "right" },

    {
      key: "consumersSampled",
      label: "Consumers sampled",
      section: "demographics",
      align: "right",
    },
    {
      key: "totalAttendance",
      label: "Total attendance",
      section: "demographics",
      align: "right",
    },
    { key: "genderSplit", label: "Gender (M/F)", section: "demographics" },
    { key: "age21_29", label: "21–29 %", section: "demographics", align: "right" },
    { key: "age30_39", label: "30–39 %", section: "demographics", align: "right" },
    { key: "age40_49", label: "40–49 %", section: "demographics", align: "right" },
    { key: "age50plus", label: "50+ %", section: "demographics", align: "right" },
    { key: "ethnicity", label: "Ethnicity mix", section: "demographics" },

    { key: "barSpend", label: "Bar spend", section: "other", align: "right" },
    { key: "consumerEducation", label: "Consumer education", section: "other" },
    { key: "weather", label: "Weather", section: "other" },
    { key: "doorTraffic", label: "Door traffic", section: "other", align: "right" },
    { key: "feedback", label: "Activity feedback", section: "other" },

    { key: "photoCount", label: "Photos", section: "photos", align: "right" },

    {
      key: "conversionRate",
      label: "Conversion %",
      section: "kpis",
      align: "right",
    },
    {
      key: "revenueAtRetail",
      label: "Revenue at retail",
      section: "kpis",
      align: "right",
    },
    {
      key: "costPerConsumer",
      label: "Cost / consumer",
      section: "kpis",
      align: "right",
    },
    {
      key: "costPerBottle",
      label: "Cost / bottle",
      section: "kpis",
      align: "right",
    },
  ],
};

// ── Company Sales Report ─────────────────────────────────────────────────────
// Answers: how much was sold, by whom, over a period.
// ⚠ The legacy column set is not documented in any of our sources. These
// columns are a proposal built from the confirmed billing-export fields.

const COMPANY_SALES: ReportDefinition = {
  id: "company-sales",
  name: "Company Sales Report",
  description: "Sales roll-up by company over a period.",
  category: "Sales",
  legacyName: "Company Sales",
  defaultShortcut: "last-3-months",
  scopeBy: ["campaign", "supplier", "distributor", "premiseType", "region"],
  fixedGrouping: "company",
  sections: ["commercial", "geography", "productResults", "kpis"],
  formats: ["Excel", "CSV", "PDF"],
  defaultFormat: "Excel",
  provisionalColumns:
    "The legacy column set for this report isn't documented in our sources. " +
    "These columns are proposed from the confirmed billing-export fields and " +
    "need Chris's confirmation — expect revision.",
  columns: [
    { key: "groupLabel", label: "Company", section: "commercial" },
    { key: "supplier", label: "Supplier", section: "commercial" },
    { key: "distributor", label: "Distributor", section: "commercial" },
    { key: "account", label: "Account", section: "commercial" },
    { key: "billedTo", label: "Billed to", section: "commercial" },

    { key: "region", label: "Region", section: "geography" },
    { key: "territory", label: "Territory", section: "geography" },

    {
      key: "productName",
      label: "Product",
      section: "productResults",
      grain: "product",
    },
    { key: "activities", label: "Activities", section: "productResults", align: "right" },
    {
      key: "consumersSampled",
      label: "Consumers sampled",
      section: "productResults",
      align: "right",
    },
    {
      key: "bottlesSold",
      label: "Bottles sold",
      section: "productResults",
      align: "right",
    },

    {
      key: "revenueAtRetail",
      label: "Revenue at retail",
      section: "kpis",
      align: "right",
    },
    { key: "spend", label: "Spend", section: "kpis", align: "right" },
    {
      key: "conversionRate",
      label: "Conversion %",
      section: "kpis",
      align: "right",
    },
    {
      key: "costPerBottle",
      label: "Cost / bottle",
      section: "kpis",
      align: "right",
    },
  ],
};

// ── Supplier-Based Events (§8.3 — the scale proof) ───────────────────────────
// Registered with NO new UI. If adding this had taken more than an entry in
// this file, the abstraction would be wrong.

const SUPPLIER_BASED: ReportDefinition = {
  id: "supplier-based",
  name: "Supplier-Based Activities",
  description: "Activity volume and outcomes rolled up by supplier.",
  category: "Activity",
  legacyName: "Supplier-Based Events",
  defaultShortcut: "last-3-months",
  scopeBy: ["campaign", "supplier", "distributor", "premiseType", "region"],
  fixedGrouping: "supplier",
  sections: ["commercial", "productResults", "kpis"],
  formats: ["Excel", "CSV", "PDF"],
  defaultFormat: "Excel",
  columns: [
    { key: "groupLabel", label: "Supplier", section: "commercial" },
    { key: "activities", label: "Activities", section: "productResults", align: "right" },
    {
      key: "consumersSampled",
      label: "Consumers sampled",
      section: "productResults",
      align: "right",
    },
    {
      key: "bottlesSold",
      label: "Bottles sold",
      section: "productResults",
      align: "right",
    },
    {
      key: "revenueAtRetail",
      label: "Revenue at retail",
      section: "kpis",
      align: "right",
    },
    {
      key: "conversionRate",
      label: "Conversion %",
      section: "kpis",
      align: "right",
    },
  ],
};

// ── Billing & payroll kinds ──────────────────────────────────────────────────
// The nine already implemented in the billing/payroll workspaces, registered
// here so they share one catalogue, one archive and one parameter vocabulary.
// Their workspaces keep their own Generate buttons, which now read from these
// same entries.

function billingReport(
  id: string,
  name: string,
  description: string,
  extra: Partial<ReportDefinition> = {},
): ReportDefinition {
  return {
    id,
    name,
    description,
    category: "Billing",
    defaultShortcut: "last-month",
    scopeBy: ["campaign", "supplier", "distributor", "premiseType", "region"],
    formats: ["Excel", "CSV", "PDF"],
    defaultFormat: "Excel",
    columns: [
      { key: "groupLabel", label: "Account", section: "commercial" },
      { key: "distributor", label: "Distributor", section: "commercial" },
      { key: "billedTo", label: "Billed to", section: "commercial" },
      { key: "region", label: "Region", section: "geography" },
      { key: "territory", label: "Territory", section: "geography" },
      { key: "activities", label: "Activities", section: "commercial", align: "right" },
      { key: "spend", label: "Invoice total", section: "commercial", align: "right" },
    ],
    ...extra,
  };
}

function payrollReport(
  id: string,
  name: string,
  description: string,
  extra: Partial<ReportDefinition> = {},
): ReportDefinition {
  return {
    id,
    name,
    description,
    category: "Payroll",
    defaultShortcut: "last-month",
    scopeBy: ["premiseType", "region"],
    formats: ["Excel", "CSV", "PDF"],
    defaultFormat: "Excel",
    columns: [
      { key: "groupLabel", label: "Brand Ambassador", section: "staffing" },
      { key: "activities", label: "Activities", section: "staffing", align: "right" },
      { key: "hours", label: "Hours", section: "staffing", align: "right" },
      { key: "region", label: "Region", section: "geography" },
      { key: "territory", label: "Territory", section: "geography" },
      { key: "spend", label: "Total pay", section: "staffing", align: "right" },
    ],
    ...extra,
  };
}

export const REPORTS: ReportDefinition[] = [
  ACTIVITY_DETAIL,
  COMPANY_SALES,
  SUPPLIER_BASED,

  billingReport(
    "billing-report",
    "Billing Report",
    "Invoiced activity totals for a billing period.",
  ),
  billingReport(
    "not-in-qb",
    "Not in QB Report",
    "Approved activities not yet exported to QuickBooks.",
  ),
  billingReport("sla-report", "SLA Report", "SGWS bar-spend receipts and verification status.", {
    // Ethan flagged Excel as build-relevant for the SLA file specifically.
    formats: ["Excel", "CSV"],
  }),
  billingReport(
    "cancellation-adjustment",
    "Cancellation Adjustment Report",
    "Partial bills and cancellation audit trail.",
  ),
  billingReport(
    "customer-schedule",
    "Customer Schedule",
    "Budget-facing forward schedule by account.",
    { defaultShortcut: "next-month" },
  ),

  payrollReport(
    "payroll-complete",
    "Payroll Report — Complete",
    "Full payroll cycle by Brand Ambassador.",
  ),
  payrollReport(
    "master-journal",
    "Master Journal",
    "Printable reconciliation journal grouped by manager.",
  ),
  payrollReport(
    "missing-payments",
    "Missing Brand Ambassador Payments",
    "Activities with no approved payment in the cycle.",
  ),
  payrollReport(
    "override-summary",
    "Override Summary",
    "Rate overrides with reasons for the period.",
  ),
];

export function getReport(id: string): ReportDefinition | undefined {
  return REPORTS.find((r) => r.id === id);
}

/** Catalogue grouping — categories in declared order, empty ones omitted. */
export function reportsByCategory(): {
  category: ReportCategory;
  reports: ReportDefinition[];
}[] {
  return REPORT_CATEGORIES.map((category) => ({
    category,
    reports: REPORTS.filter((r) => r.category === category),
  })).filter((g) => g.reports.length > 0);
}
