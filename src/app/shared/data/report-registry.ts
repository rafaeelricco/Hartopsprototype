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
  type ToggleDef,
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
 * A column in the report's output. `section` ties it to an Include checkbox —
 * columns whose section is unticked drop out of the preview and the file.
 * `grain: "product"` marks columns that only exist at product grain.
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
  /** Entity dimensions this report can be scoped by. Empty = no scope control. */
  scopeBy?: EntityType[];
  /** Offered groupings. Omitted = no grouping control. */
  groupings?: Grouping[];
  defaultGrouping?: Grouping;
  /** True when the report supports the activity/product grain choice. */
  supportsGrain?: boolean;
  defaultGrain?: Grain;
  /** Sections offered as Include checkboxes, and which start ticked. */
  sections?: SectionId[];
  defaultSections?: SectionId[];
  toggles?: ToggleDef[];
  /** Dimensions the report can be split one-file-per-value by. */
  splitBy?: EntityType[];
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
    ...(def.groupings?.length
      ? { grouping: def.defaultGrouping ?? def.groupings[0]! }
      : {}),
    ...(def.supportsGrain ? { grain: def.defaultGrain ?? "activity" } : {}),
    sections: def.defaultSections ?? def.sections ?? [],
    toggles: Object.fromEntries(
      (def.toggles ?? []).map((t) => [t.id, t.default]),
    ),
    splitBy: null,
    format: def.defaultFormat ?? def.formats[0]!,
  };
}

export function shortcutsFor(def: ReportDefinition): RangeShortcut[] {
  return def.shortcuts ?? REPORTING_SHORTCUTS;
}

/** Columns actually emitted for a given parameter set. */
export function visibleColumns(
  def: ReportDefinition,
  params: ReportParameters,
): ReportColumn[] {
  const grain = params.grain ?? "activity";
  return def.columns.filter((c) => {
    if (c.grain && c.grain !== grain) return false;
    // A column with no section is structural and always shown.
    if (!def.sections?.includes(c.section)) return true;
    return params.sections.includes(c.section);
  });
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
  scopeBy: [
    "supplier",
    "brand",
    "campaign",
    "account",
    "distributor",
    "premiseType",
    "region",
    "territory",
  ],
  supportsGrain: true,
  defaultGrain: "activity",
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
  defaultSections: [
    "activity",
    "commercial",
    "geography",
    "staffing",
    "demographics",
    "productResults",
    "kpis",
  ],
  toggles: [
    {
      id: "includePhotos",
      label: "Include photos",
      hint: "Embeds up to 10 images. PDF only.",
      default: false,
    },
    {
      id: "includeUnapproved",
      label: "Include unapproved activities",
      hint: "Reports normally cover approved and finalised activities only.",
      default: false,
    },
  ],
  splitBy: ["region", "territory"],
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

    // Product-grain columns — one row per product per activity.
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
      key: "bottlesSold",
      label: "Bottles sold",
      section: "productResults",
      align: "right",
    },
    // At activity grain the products collapse into one cell — the legacy
    // behaviour Leah is complaining about, kept visible so the contrast is
    // legible when you flip the grain.
    {
      key: "productsCollapsed",
      label: "Products",
      section: "productResults",
      grain: "activity",
    },

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
  scopeBy: [
    "supplier",
    "distributor",
    "account",
    "brand",
    "region",
    "territory",
  ],
  groupings: ["company", "supplier", "distributor", "account", "month"],
  defaultGrouping: "company",
  supportsGrain: true,
  defaultGrain: "activity",
  sections: ["commercial", "geography", "productResults", "kpis"],
  defaultSections: ["commercial", "productResults", "kpis"],
  splitBy: ["region", "territory"],
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
  scopeBy: ["supplier"],
  groupings: ["supplier", "month"],
  defaultGrouping: "supplier",
  sections: ["commercial", "productResults", "kpis"],
  defaultSections: ["commercial", "productResults"],
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
    scopeBy: ["distributor", "supplier", "account", "region", "territory"],
    sections: ["commercial", "geography"],
    defaultSections: ["commercial"],
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
    scopeBy: ["region", "territory"],
    sections: ["staffing", "geography"],
    defaultSections: ["staffing"],
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
    toggles: [
      {
        id: "liquorLicence",
        label: "Include liquor licence details",
        hint: "Mirrors the HEMS 1.0 export toggle.",
        default: true,
      },
    ],
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
    { splitBy: ["region", "territory"] },
  ),
  payrollReport(
    "master-journal",
    "Master Journal",
    "Printable reconciliation journal grouped by manager.",
    { splitBy: ["region", "territory"] },
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
