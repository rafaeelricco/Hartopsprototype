// =============================================================================
// Report engine (reporting brief §6, §7)
// =============================================================================
// One function turns a registry entry plus a resolved parameter set into rows,
// headline totals and counts. Every report runs through it — there is no
// per-report logic here, only the parameter vocabulary applied uniformly.
// =============================================================================

import { inRange } from "./date-range";
import {
  REPORT_ACTIVITIES,
  type ReportActivity,
  type ReportProduct,
} from "./report-data";
import type {
  EntityType,
  Grain,
  ReportParameters,
} from "./report-parameters";
import { visibleColumns, type ReportDefinition } from "./report-registry";

export type CellValue = string | number;
export type ReportRow = Record<string, CellValue>;

export interface ReportResult {
  rows: ReportRow[];
  /** Headline totals — text only. No charts (§7). */
  totals: { label: string; value: string }[];
  activityCount: number;
  rowCount: number;
  /** Completed-but-not-finalised activities held back from the report. */
  excludedUnapproved: number;
  /** Reason the result is empty, if it is. */
  emptyReason: "no-activities-in-range" | "scope-excludes-all" | null;
}

// -----------------------------------------------------------------------------
// Scope
// -----------------------------------------------------------------------------

function entityValue(a: ReportActivity, key: EntityType): string {
  switch (key) {
    case "premiseType":
      return a.premiseType;
    case "distributor":
      return a.distributor;
    case "supplier":
      return a.supplier;
    case "account":
      return a.account;
    case "campaign":
      return a.campaign;
    case "brand":
      return a.brand;
    case "region":
      return a.region;
    case "territory":
      return a.territory;
  }
}

function matchesScope(a: ReportActivity, params: ReportParameters): boolean {
  for (const [key, values] of Object.entries(params.scope)) {
    if (!values || values.length === 0) continue;
    if (!values.includes(entityValue(a, key as EntityType))) return false;
  }
  return true;
}

// -----------------------------------------------------------------------------
// Formatting
// -----------------------------------------------------------------------------

const CURRENCY_KEYS = new Set([
  "revenueAtRetail",
  "spend",
  "costPerConsumer",
  "costPerBottle",
  "price",
  "featuredPrice",
  "barSpend",
]);

const PERCENT_KEYS = new Set([
  "conversionRate",
  "age21_29",
  "age30_39",
  "age40_49",
  "age50plus",
]);

export function formatCell(key: string, value: CellValue): string {
  if (typeof value === "string") return value;
  if (CURRENCY_KEYS.has(key)) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: value < 100 ? 2 : 0,
    });
  }
  if (PERCENT_KEYS.has(key)) return `${value.toFixed(1)}%`;
  return value.toLocaleString("en-US");
}

function money(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n < 100 ? 2 : 0,
  });
}

// -----------------------------------------------------------------------------
// Row construction
// -----------------------------------------------------------------------------

function activityCells(a: ReportActivity): ReportRow {
  const d = a.demographics;
  const conversion =
    d.consumersSampled > 0 ? (a.bottlesSold / d.consumersSampled) * 100 : 0;
  return {
    activityId: a.id,
    activityName: a.name,
    date: a.date,
    startTime: a.startTime,
    endTime: a.endTime,
    duration: a.duration,
    premiseType: a.premiseType,

    campaign: a.campaign,
    supplier: a.supplier,
    brand: a.brand,
    distributor: a.distributor,
    account: a.account,
    billedTo: a.billedTo,

    region: a.region,
    territory: a.territory,
    city: a.city,
    state: a.state,

    brandAmbassadors: a.brandAmbassadors,
    checkIn: a.checkIn,
    checkOut: a.checkOut,
    hours: a.hours,

    consumersSampled: d.consumersSampled,
    totalAttendance: d.totalAttendance,
    genderSplit: `${d.malePct}/${d.femalePct}`,
    age21_29: d.age21_29,
    age30_39: d.age30_39,
    age40_49: d.age40_49,
    age50plus: d.age50plus,
    ethnicity: d.ethnicity,

    // At activity grain the products collapse into one comma-delimited cell —
    // the legacy behaviour the grain switch exists to escape.
    productsCollapsed: a.products
      .map((p) => `${p.productName} (${p.bottlesSold})`)
      .join(", "),
    bottlesSold: a.bottlesSold,

    barSpend: a.barSpend,
    consumerEducation: a.consumerEducation,
    weather: a.weather,
    doorTraffic: a.doorTraffic,
    feedback: a.feedback,
    photoCount: a.photoCount,

    activities: 1,
    revenueAtRetail: a.revenueAtRetail,
    spend: a.spend,
    conversionRate: conversion,
    costPerConsumer: d.consumersSampled > 0 ? a.spend / d.consumersSampled : 0,
    costPerBottle: a.bottlesSold > 0 ? a.spend / a.bottlesSold : 0,
  };
}

function productCells(a: ReportActivity, p: ReportProduct): ReportRow {
  const base = activityCells(a);
  const share = a.bottlesSold > 0 ? p.bottlesSold / a.bottlesSold : 0;
  const sampledShare = Math.round(a.demographics.consumersSampled * share);
  const spendShare = a.spend * share;
  return {
    ...base,
    productName: p.productName,
    productSize: p.size,
    startingInventory: p.startingInventory,
    drinksPurchased: p.drinksPurchased,
    endingInventory: p.endingInventory,
    price: p.price,
    featuredPrice: p.featuredPrice,
    bottlesSold: p.bottlesSold,
    revenueAtRetail: p.revenueAtRetail,
    // Activity-level measures are apportioned by the product's share of
    // volume, so a product row's KPIs are meaningful on their own.
    consumersSampled: sampledShare,
    spend: spendShare,
    conversionRate: sampledShare > 0 ? (p.bottlesSold / sampledShare) * 100 : 0,
    costPerConsumer: sampledShare > 0 ? spendShare / sampledShare : 0,
    costPerBottle: p.bottlesSold > 0 ? spendShare / p.bottlesSold : 0,
  };
}

// -----------------------------------------------------------------------------
// Grouping
// -----------------------------------------------------------------------------

const SUM_KEYS = [
  "activities",
  "consumersSampled",
  "totalAttendance",
  "bottlesSold",
  "revenueAtRetail",
  "spend",
  "hours",
  "doorTraffic",
  "barSpend",
  "photoCount",
  "startingInventory",
  "drinksPurchased",
  "endingInventory",
];

function groupKeyFor(
  a: ReportActivity,
  grouping: string,
): string {
  switch (grouping) {
    case "account":
      return a.account;
    case "supplier":
    case "company":
      return a.supplier;
    case "distributor":
      return a.distributor;
    case "region":
      return a.region;
    case "territory":
      return a.territory;
    case "month":
      return a.date.slice(0, 7);
    default:
      return a.name;
  }
}

function aggregate(rows: ReportRow[]): ReportRow {
  const out: ReportRow = { ...rows[0]! };
  for (const key of SUM_KEYS) {
    if (typeof rows[0]![key] !== "number") continue;
    out[key] = rows.reduce((s, r) => s + (Number(r[key]) || 0), 0);
  }
  // Dimension columns that vary within the group must not silently show the
  // first row's value — a supplier roll-up reading "Rockaway Beach Club" would
  // imply all of that supplier's work happened at one venue.
  if (rows.length > 1) {
    for (const key of Object.keys(out)) {
      if (typeof out[key] !== "string") continue;
      const distinct = new Set(rows.map((r) => String(r[key])));
      if (distinct.size > 1) out[key] = "Multiple";
    }
  }
  // Ratios are recomputed from the summed measures, never averaged — averaging
  // rates across rows of different sizes is the classic reporting bug.
  const sampled = Number(out["consumersSampled"]) || 0;
  const bottles = Number(out["bottlesSold"]) || 0;
  const spend = Number(out["spend"]) || 0;
  out["conversionRate"] = sampled > 0 ? (bottles / sampled) * 100 : 0;
  out["costPerConsumer"] = sampled > 0 ? spend / sampled : 0;
  out["costPerBottle"] = bottles > 0 ? spend / bottles : 0;
  return out;
}

// -----------------------------------------------------------------------------
// Run
// -----------------------------------------------------------------------------

export function runReport(
  def: ReportDefinition,
  params: ReportParameters,
): ReportResult {
  const grain: Grain = params.grain ?? def.defaultGrain ?? "activity";
  const includeUnapproved = params.toggles["includeUnapproved"] === true;

  const inWindow = REPORT_ACTIVITIES.filter((a) => inRange(a.date, params.range));
  const scoped = inWindow.filter((a) => matchesScope(a, params));

  const excludedUnapproved = scoped.filter((a) => !a.approved).length;
  const activities = includeUnapproved ? scoped : scoped.filter((a) => a.approved);

  // Flatten to the requested grain.
  let rows: ReportRow[] =
    grain === "product"
      ? activities.flatMap((a) => a.products.map((p) => productCells(a, p)))
      : activities.map(activityCells);

  // Group when the report declares a grouping other than per-activity.
  const grouping = params.grouping;
  if (grouping && grouping !== "activity") {
    const buckets = new Map<string, { label: string; rows: ReportRow[] }>();
    activities.forEach((a) => {
      const label = groupKeyFor(a, grouping);
      const activityRows =
        grain === "product"
          ? a.products.map((p) => productCells(a, p))
          : [activityCells(a)];
      activityRows.forEach((r) => {
        // At product grain a group splits further by product, so a supplier
        // roll-up still shows which bottle sold.
        const key = grain === "product" ? `${label}||${String(r["productName"])}` : label;
        const bucket = buckets.get(key);
        if (bucket) bucket.rows.push(r);
        else buckets.set(key, { label, rows: [r] });
      });
    });
    rows = Array.from(buckets.values()).map(({ label, rows: rs }) => ({
      ...aggregate(rs),
      groupLabel: label,
      activities: new Set(rs.map((r) => r["activityId"])).size,
    }));
    rows.sort((a, b) =>
      String(a["groupLabel"]).localeCompare(String(b["groupLabel"])),
    );
  }

  // Headline totals. Text, never a chart (§7).
  const totalSampled = activities.reduce(
    (s, a) => s + a.demographics.consumersSampled,
    0,
  );
  const totalBottles = activities.reduce((s, a) => s + a.bottlesSold, 0);
  const totalRevenue = activities.reduce((s, a) => s + a.revenueAtRetail, 0);
  const totalSpend = activities.reduce((s, a) => s + a.spend, 0);
  const conversion = totalSampled > 0 ? (totalBottles / totalSampled) * 100 : 0;

  const totals = [
    { label: "Activities", value: activities.length.toLocaleString("en-US") },
    { label: "Consumers sampled", value: totalSampled.toLocaleString("en-US") },
    { label: "Bottles sold", value: totalBottles.toLocaleString("en-US") },
    { label: "Conversion rate", value: `${conversion.toFixed(1)}%` },
    { label: "Revenue at retail", value: money(totalRevenue) },
    {
      label: "Cost / consumer",
      value: totalSampled > 0 ? money(totalSpend / totalSampled) : "—",
    },
    {
      label: "Cost / bottle",
      value: totalBottles > 0 ? money(totalSpend / totalBottles) : "—",
    },
  ];

  const emptyReason: ReportResult["emptyReason"] =
    rows.length > 0
      ? null
      : inWindow.length === 0
        ? "no-activities-in-range"
        : "scope-excludes-all";

  return {
    rows,
    totals,
    activityCount: activities.length,
    rowCount: rows.length,
    excludedUnapproved,
    emptyReason,
  };
}

/** Columns actually emitted — re-exported so the preview and export agree. */
export { visibleColumns };
