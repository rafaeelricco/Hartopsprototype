// =============================================================================
// Report parameter vocabulary (reporting brief §4)
// =============================================================================
// A closed set of eight reusable parameter types. Every report picks a subset;
// the runner renders exactly what a report declares — nothing more, nothing
// less, always in the same order.
//
// The rules this file enforces:
//   · A report declares a subset. Unsupported parameters are ABSENT, not
//     disabled or greyed.
//   · Consistent order everywhere: date range → entity scope → grouping →
//     grain → sections → toggles → split → format.
//   · Every parameter has a sane default, so any report runs untouched.
//   · The resolved set is serialisable, so saving a configuration later
//     (deferred, §9) is trivial.
// =============================================================================

import type { DateRange, RangeShortcut } from "./date-range";

// -----------------------------------------------------------------------------
// 2. Entity scope
// -----------------------------------------------------------------------------
// The confirmed filter set from the release plan, plus campaign/brand/region/
// territory. A report declares which of these it can be scoped by.

export const ENTITY_TYPES = [
  "premiseType",
  "distributor",
  "supplier",
  "account",
  "campaign",
  "brand",
  "region",
  "territory",
] as const;

export type EntityType = (typeof ENTITY_TYPES)[number];

export const ENTITY_LABELS: Record<EntityType, string> = {
  premiseType: "Premise type",
  distributor: "Distributor",
  supplier: "Supplier",
  account: "Account",
  campaign: "Campaign",
  brand: "Brand",
  region: "Region",
  territory: "Territory",
};

/** Multi-select per entity type. Absent key = unfiltered on that dimension. */
export type EntityScope = Partial<Record<EntityType, string[]>>;

// -----------------------------------------------------------------------------
// 3. Grouping — how rows aggregate
// -----------------------------------------------------------------------------

export const GROUPINGS = [
  "activity",
  "account",
  "supplier",
  "distributor",
  "company",
  "region",
  "territory",
  "month",
] as const;

export type Grouping = (typeof GROUPINGS)[number];

export const GROUPING_LABELS: Record<Grouping, string> = {
  activity: "Activity",
  account: "Account",
  supplier: "Supplier",
  distributor: "Distributor",
  company: "Company",
  region: "Region",
  territory: "Territory",
  month: "Month",
};

// -----------------------------------------------------------------------------
// 4. Breakdown grain — load-bearing
// -----------------------------------------------------------------------------
// Leah: "a lot of clients want to see it by bottle… in Excel or CSV, not just a
// visual pretty little document." Today's export collapses multi-product
// activities into comma-delimited counts, which is the complaint. So the grain
// is an explicit choice, never inferred.

export type Grain = "activity" | "product";

export const GRAIN_LABELS: Record<Grain, string> = {
  activity: "By activity",
  product: "By product / bottle",
};

// -----------------------------------------------------------------------------
// 5. Included sections
// -----------------------------------------------------------------------------
// Grouped by section rather than a flat list of 40 columns.

export const SECTIONS = [
  "activity",
  "commercial",
  "geography",
  "staffing",
  "demographics",
  "productResults",
  "other",
  "photos",
  "kpis",
] as const;

export type SectionId = (typeof SECTIONS)[number];

export const SECTION_LABELS: Record<SectionId, string> = {
  activity: "Activity",
  commercial: "Commercial",
  geography: "Geography",
  staffing: "Staffing",
  demographics: "Demographics",
  productResults: "Product results",
  other: "Other",
  photos: "Photos",
  kpis: "KPIs",
};

/** One-line hint under each section, so the checkbox isn't a mystery. */
export const SECTION_HINTS: Record<SectionId, string> = {
  activity: "ID, name, date, times, duration, premise type",
  commercial: "Campaign, supplier, brand, distributor, account, billed-to",
  geography: "Region, territory, city, state",
  staffing: "Brand Ambassadors, check-in / check-out, hours",
  demographics: "Consumers sampled, attendance, gender, age bands, ethnicity",
  productResults: "Per-product inventory, price, bottles sold",
  other: "Bar spend, consumer education, weather, door traffic, feedback",
  photos: "Up to 10 images — PDF only",
  kpis: "Conversion rate, revenue at retail, cost per consumer, cost per bottle",
};

// -----------------------------------------------------------------------------
// 6. Format
// -----------------------------------------------------------------------------

export const FORMATS = ["Excel", "PDF", "CSV"] as const;
export type ReportFormat = (typeof FORMATS)[number];

// -----------------------------------------------------------------------------
// 8. Toggles — report-specific booleans
// -----------------------------------------------------------------------------

export interface ToggleDef {
  id: string;
  label: string;
  hint?: string;
  default: boolean;
}

// -----------------------------------------------------------------------------
// The resolved parameter set
// -----------------------------------------------------------------------------
// Deliberately a plain serialisable object: saved configurations and scheduled
// delivery are out of scope (§9) but must be cheap to add later.

export interface ReportParameters {
  range: DateRange;
  /** null once the range is hand-edited — it is then custom. */
  shortcut: RangeShortcut | null;
  scope: EntityScope;
  grouping?: Grouping;
  grain?: Grain;
  sections: SectionId[];
  toggles: Record<string, boolean>;
  /** Entity dimension to split one-file-per-value by. null = single file. */
  splitBy: EntityType | null;
  format: ReportFormat;
}

/** Fixed render order (§4). Users learn the shape once. */
export const PARAMETER_ORDER = [
  "range",
  "scope",
  "grouping",
  "grain",
  "sections",
  "toggles",
  "splitBy",
  "format",
] as const;
