// =============================================================================
// Reporting dataset — enrichment layer (reporting brief §8)
// =============================================================================
// The activity seed carries workflow state, not evaluation-form results. This
// module derives what it can and synthesises the rest, so every Include section
// in §8.1 resolves to real values.
//
// ⚠ SYNTHESISED, NOT MODELLED. Demographics (gender / age bands / ethnicity),
// per-product inventory and pricing, and per-activity spend do not exist in the
// platform's data model yet. They are generated here from a deterministic hash
// of the activity id so previews are stable across renders, and so the shape of
// the report can be reviewed before Hart's real evaluation-form schema lands.
// Replace this module with real fields when that schema arrives; nothing
// downstream depends on how the values are produced.
// =============================================================================

import {
  mockEvents,
  type Activity,
} from "@/app/market-manager/components/activities-data";
import {
  TERRITORY_TO_REGION,
  type PremiseType,
  type Region,
} from "@/app/market-manager/components/dashboard-domain";

// -----------------------------------------------------------------------------
// Deterministic pseudo-randomness
// -----------------------------------------------------------------------------
// Keyed on the activity id so a given activity always produces the same
// numbers — a preview that jittered between renders would be unreadable.

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Stable integer in [min, max] for a given key. */
function pick(key: string, min: number, max: number): number {
  return min + (hash(key) % (max - min + 1));
}

function pickFrom<T>(key: string, options: readonly T[]): T {
  return options[hash(key) % options.length]!;
}

// -----------------------------------------------------------------------------
// Shapes
// -----------------------------------------------------------------------------

export interface ReportProduct {
  productName: string;
  size: string;
  startingInventory: number;
  drinksPurchased: number;
  endingInventory: number;
  price: number;
  featuredPrice: number;
  bottlesSold: number;
  revenueAtRetail: number;
}

export interface ReportDemographics {
  consumersSampled: number;
  totalAttendance: number;
  malePct: number;
  femalePct: number;
  age21_29: number;
  age30_39: number;
  age40_49: number;
  age50plus: number;
  ethnicity: string;
}

export interface ReportActivity {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  hours: number;
  premiseType: PremiseType;

  campaign: string;
  supplier: string;
  brand: string;
  distributor: string;
  account: string;
  billedTo: string;

  region: Region;
  territory: string;
  city: string;
  state: string;

  brandAmbassadors: string;
  checkIn: string;
  checkOut: string;

  demographics: ReportDemographics;
  products: ReportProduct[];

  /** Roll-ups across products. */
  bottlesSold: number;
  revenueAtRetail: number;
  /** What the activity cost Hart — drives the two cost KPIs. */
  spend: number;

  barSpend: number;
  consumerEducation: string;
  weather: string;
  doorTraffic: number;
  feedback: string;
  photoCount: number;

  /** Reports cover approved/finalised work only unless explicitly included. */
  approved: boolean;
}

// -----------------------------------------------------------------------------
// Enrichment
// -----------------------------------------------------------------------------

const ETHNICITY_MIXES = [
  "White 44% · Hispanic 24% · Black 18% · Asian 14%",
  "White 38% · Asian 27% · Hispanic 21% · Black 14%",
  "Hispanic 35% · White 33% · Black 20% · Asian 12%",
  "White 51% · Black 19% · Asian 16% · Hispanic 14%",
];

const WEATHER = ["Clear", "Overcast", "Light rain", "Humid", "Cold snap"];

const EDUCATION_NOTES = [
  "Tasting notes and serve suggestions covered",
  "Brand heritage and distillation walkthrough",
  "Cocktail build demonstrated at station",
  "Food pairing guidance given",
];

const FEEDBACK_NOTES = [
  "Strong footfall; staff engaged",
  "Steady traffic, good conversion",
  "Slow start, busy final two hours",
  "Excellent placement near entrance",
  "Competing promotion in aisle",
];

/** Distributor is not on the activity record; derive it stably from state. */
function distributorFor(a: Activity): string {
  if (a.state === "NJ") return "Empire Merchants";
  return pickFrom(`${a.id}-dist`, ["Southern Glazer's", "Empire Merchants"]);
}

function parseTimes(time: string): { start: string; end: string } {
  const [start = "", end = ""] = time.split("–").map((s) => s.trim());
  return { start, end };
}

function parseHours(duration: string): number {
  const n = parseFloat(duration);
  return Number.isFinite(n) ? n : 4;
}

function buildDemographics(a: Activity): ReportDemographics {
  const sampled = a.finalStats?.totalSamples ?? pick(`${a.id}-s`, 40, 120);
  const attendance = sampled + pick(`${a.id}-att`, 10, 90);

  const malePct = pick(`${a.id}-g`, 38, 62);
  // Age bands are forced to total 100 — the evaluation form auto-calculates,
  // so a set that doesn't add up would be visibly wrong to Hart.
  const b1 = pick(`${a.id}-a1`, 18, 40);
  const b2 = pick(`${a.id}-a2`, 20, 38);
  const b3 = pick(`${a.id}-a3`, 12, 28);
  const b4 = Math.max(0, 100 - b1 - b2 - b3);

  return {
    consumersSampled: sampled,
    totalAttendance: attendance,
    malePct,
    femalePct: 100 - malePct,
    age21_29: b1,
    age30_39: b2,
    age40_49: b3,
    age50plus: b4,
    ethnicity: pickFrom(`${a.id}-eth`, ETHNICITY_MIXES),
  };
}

function buildProducts(a: Activity): ReportProduct[] {
  const sales = a.finalStats?.salesByProduct ?? [];
  if (sales.length === 0) {
    // Completed activity with no per-product breakdown: synthesise a single
    // line from the collapsed total so the product grain still resolves.
    const total = a.finalStats?.totalSales ?? 0;
    const price = pick(`${a.id}-p`, 22, 48);
    const starting = total + pick(`${a.id}-inv`, 6, 24);
    return [
      {
        productName: a.products[0] ?? `${a.brandName} 750ml`,
        size: "750ml",
        startingInventory: starting,
        drinksPurchased: total + pick(`${a.id}-dp`, 2, 14),
        endingInventory: Math.max(0, starting - total),
        price,
        featuredPrice: Math.max(1, price - pick(`${a.id}-fp`, 2, 6)),
        bottlesSold: total,
        revenueAtRetail: total * price,
      },
    ];
  }

  return sales.map((s, i) => {
    const key = `${a.id}-${i}`;
    const price = s.unitPrice ?? pick(`${key}-price`, 22, 48);
    const starting = s.quantity + pick(`${key}-inv`, 4, 20);
    const size = s.productName.match(/(\d+ ?m?[lL]|Gift Pack)/)?.[0] ?? "750ml";
    return {
      productName: s.productName,
      size,
      startingInventory: starting,
      drinksPurchased: s.quantity + pick(`${key}-dp`, 1, 10),
      endingInventory: Math.max(0, starting - s.quantity),
      price,
      featuredPrice: Math.max(1, price - pick(`${key}-fp`, 2, 6)),
      bottlesSold: s.quantity,
      revenueAtRetail: s.quantity * price,
    };
  });
}

function enrich(a: Activity): ReportActivity {
  const { start, end } = parseTimes(a.time);
  const hours = parseHours(a.duration);
  const demographics = buildDemographics(a);
  const products = buildProducts(a);

  const bottlesSold = products.reduce((s, p) => s + p.bottlesSold, 0);
  const revenueAtRetail = products.reduce((s, p) => s + p.revenueAtRetail, 0);

  // Spend: what the activity cost Hart. Not modelled on the activity record —
  // BA hours at a nominal rate plus a kit/sample allowance, so cost-per-consumer
  // and cost-per-bottle resolve without reaching into the Ops billing data.
  const baCount = Math.max(1, a.assignedBrandAmbassadors?.length ?? 1);
  const spend =
    hours * baCount * pick(`${a.id}-rate`, 34, 46) +
    pick(`${a.id}-kit`, 40, 180);

  const territory = a.territory ?? a.borough ?? "Manhattan";
  const accountName = a.venue.split(",")[0]?.trim() ?? a.venue;
  const city = a.venue.split(",")[1]?.trim() ?? territory;

  return {
    id: a.id,
    name: a.name,
    date: a.date,
    startTime: start,
    endTime: end,
    duration: a.duration,
    hours,
    premiseType: a.premiseType ?? "off-premise",

    campaign: a.campaignName,
    supplier: a.clientName,
    brand: a.brandName,
    distributor: distributorFor(a),
    account: accountName,
    billedTo: `${a.clientName} — Accounts Payable`,

    region: TERRITORY_TO_REGION[territory] ?? "Metro",
    territory,
    city,
    state: a.state,

    brandAmbassadors:
      a.assignedBrandAmbassadors
        ?.filter((x) => x.assignmentStatus === "Accepted")
        .map((x) => x.brandAmbassadorName)
        .join(", ") ||
      a.brandAmbassadorName ||
      "—",
    checkIn: a.actualCheckIn?.slice(11, 16) ?? start,
    checkOut: a.actualCheckOut?.slice(11, 16) ?? end,

    demographics,
    products,

    bottlesSold,
    revenueAtRetail,
    spend,

    barSpend: a.slaCapture?.total ?? 0,
    consumerEducation: pickFrom(`${a.id}-edu`, EDUCATION_NOTES),
    weather: pickFrom(`${a.id}-w`, WEATHER),
    doorTraffic: demographics.totalAttendance + pick(`${a.id}-door`, 20, 160),
    feedback: pickFrom(`${a.id}-fb`, FEEDBACK_NOTES),
    photoCount: a.photoCount ?? a.finalStats?.photosSubmitted ?? 0,

    approved: a.status === "Finalized",
  };
}

/**
 * Every activity with results. Upcoming, live and cancelled activities have no
 * outcomes to report on, so they never enter the reporting set at all — the
 * approved/unapproved distinction below is only about *completed* work.
 */
export const REPORT_ACTIVITIES: ReportActivity[] = mockEvents
  .filter((a) => a.status === "Completed" || a.status === "Finalized")
  .map(enrich)
  .sort((a, b) => a.date.localeCompare(b.date));

/** Distinct values for an entity dimension, for the scope pickers. */
export function entityOptions(
  key: keyof Pick<
    ReportActivity,
    | "supplier"
    | "brand"
    | "campaign"
    | "account"
    | "distributor"
    | "region"
    | "territory"
    | "premiseType"
  >,
): string[] {
  return Array.from(
    new Set(REPORT_ACTIVITIES.map((a) => String(a[key]))),
  ).sort();
}
