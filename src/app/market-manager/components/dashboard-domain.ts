// =============================================================================
// Market Manager dashboard — domain model (IMP-1697)
// =============================================================================
// Pure model + selectors for the workflow dashboard. No React, no data: this
// module answers "which activities are blocked, why, and how urgently".
//
// Deliberately scope-agnostic (brief §12.4): every selector takes the activity
// set and a scope as arguments, so the same spine can serve an admin with wider
// scope (all regions, multi-month default) as configuration rather than a
// rewrite.
// =============================================================================

import type { Activity } from "./activities-data";

// -----------------------------------------------------------------------------
// "Today" anchor
// -----------------------------------------------------------------------------
// Single source of truth for now. Mock activity dates are generated relative to
// this (see activities-data.ts), so the demo always populates and never goes
// stale. To produce byte-reproducible screenshots, pin this to a fixed date:
//   export const TODAY = startOfDay(new Date("2026-08-10T00:00:00"));

export function startOfDay(d: Date): Date {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  return out;
}

export const TODAY: Date = startOfDay(new Date());

/** ISO `YYYY-MM-DD` for a date. */
export function iso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** A date N days from TODAY (negative = past). */
export function daysFromToday(n: number): Date {
  const d = new Date(TODAY);
  d.setDate(d.getDate() + n);
  return d;
}

/** ISO date N days from TODAY. */
export function isoFromToday(n: number): string {
  return iso(daysFromToday(n));
}

/** Whole days between TODAY and an ISO date. Negative = in the past. */
export function daysUntil(isoDate: string): number {
  const target = startOfDay(new Date(`${isoDate}T00:00:00`));
  return Math.round((target.getTime() - TODAY.getTime()) / 86_400_000);
}

// -----------------------------------------------------------------------------
// Regions and territories (client-confirmed, 2026-08-10)
// -----------------------------------------------------------------------------

export type Region =
  | "Metro"
  | "Long Island"
  | "Buffalo"
  | "Syracuse"
  | "Rochester"
  | "North Albany"
  | "Hudson Valley/Rockland";

export const REGIONS: Region[] = [
  "Metro",
  "Long Island",
  "Buffalo",
  "Syracuse",
  "Rochester",
  "North Albany",
  "Hudson Valley/Rockland",
];

// Territory → region. Only Metro and Long Island have territories recorded so
// far; the upstate regions exist but carry none yet.
//
// NOTE: New Jersey territories sit under Metro until dedicated NJ managers
// exist (client, 2026-08-10). Revisit when NJ managers are hired.
export const TERRITORY_TO_REGION: Record<string, Region> = {
  // Metro — the five boroughs
  Manhattan: "Metro",
  Brooklyn: "Metro",
  Queens: "Metro",
  Bronx: "Metro",
  "Staten Island": "Metro",
  // Metro — New Jersey (interim)
  Hoboken: "Metro",
  "Jersey City": "Metro",
  Newark: "Metro",
  Hackensack: "Metro",
  // Long Island
  Nassau: "Long Island",
  Suffolk: "Long Island",
  Westchester: "Long Island",
};

export function regionForTerritory(territory: string | undefined): Region {
  if (!territory) return "Metro";
  return TERRITORY_TO_REGION[territory] ?? "Metro";
}

// -----------------------------------------------------------------------------
// Premise type
// -----------------------------------------------------------------------------
// Built as the flat five-value list the brief specifies (§5).
//
// FLAGGED FOR CLIENT: "cannabis" and "beer" read as product categories rather
// than premise types, so an activity could arguably be both on-premise and
// beer. Built flat as briefed; raised for Katie/Andrea to resolve. If it splits,
// this becomes premise (off / on / on-SLA) + a separate product category.

export type PremiseType =
  | "off-premise"
  | "on-premise"
  | "on-premise SLA"
  | "cannabis"
  | "beer";

export const PREMISE_TYPES: PremiseType[] = [
  "off-premise",
  "on-premise",
  "on-premise SLA",
  "cannabis",
  "beer",
];

// -----------------------------------------------------------------------------
// Workflow state added for the dashboard
// -----------------------------------------------------------------------------

/** Kit & samples lifecycle. Kit collection gates check-in (brief §7 lane 3). */
export type KitStatus =
  | "not-prepared" // samples not yet pulled
  | "out-of-stock" // samples unavailable — escalation, not a delay
  | "prepared" // ready for collection, BA hasn't picked it up
  | "collected"; // cleared — exits the lane

/**
 * Pre-execution SLA approval gate. On-premise-SLA activities carry a red/green
 * approval status and cannot execute until green (brief §6).
 *
 * Distinct from `Activity.slaCapture`, which is the *post-activity* receipt
 * verification surfaced in lane 4. Both exist by design (confirmed 2026-08-10).
 */
export type SlaApproval = "pending" | "approved";

/** Check-in exceptions. Pay is tied to physical presence (brief §6). */
export type CheckInException = "failed" | "out-of-area" | "late-checkout";

/** Hours a Brand Ambassador can edit their recap after completion. */
export const RECAP_WINDOW_HOURS = 24;

// -----------------------------------------------------------------------------
// Scope
// -----------------------------------------------------------------------------

export interface DateRange {
  /** inclusive ISO start */
  from: string;
  /** inclusive ISO end */
  to: string;
}

export interface DashboardScope {
  range: DateRange;
  /** empty = all regions in the viewer's remit */
  regions: Region[];
  /** empty = all premise types */
  premiseTypes: PremiseType[];
  /** empty = all campaigns */
  campaigns: string[];
}

/** Regions this manager covers. Admins would pass the full REGIONS list. */
export const MANAGER_REGIONS: Region[] = ["Metro", "Long Island"];

export const ALL_SHORTCUTS = [
  "this-week",
  "last-week",
  "next-week",
  "this-month",
  "last-month",
  "next-month",
  "plus-3",
  "plus-7",
  "plus-14",
  "rolling-30",
] as const;

export type RangeShortcut = (typeof ALL_SHORTCUTS)[number];

export const SHORTCUT_LABELS: Record<RangeShortcut, string> = {
  "this-week": "This week",
  "last-week": "Last week",
  "next-week": "Next week",
  "this-month": "This month",
  "last-month": "Last month",
  "next-month": "Next month",
  "plus-3": "+3 days",
  "plus-7": "+7 days",
  "plus-14": "+14 days",
  "rolling-30": "Rolling 30 days",
};

/** Manager default (brief §5). Admin surfaces default to a multi-month view. */
export const DEFAULT_SHORTCUT: RangeShortcut = "rolling-30";

/** Monday-start week containing `d`. */
function startOfWeek(d: Date): Date {
  const out = startOfDay(d);
  const dow = out.getDay(); // 0 = Sun
  out.setDate(out.getDate() - ((dow + 6) % 7));
  return out;
}

function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

export function resolveShortcut(shortcut: RangeShortcut): DateRange {
  const weekStart = startOfWeek(TODAY);
  const y = TODAY.getFullYear();
  const m = TODAY.getMonth();

  switch (shortcut) {
    case "this-week":
      return { from: iso(weekStart), to: iso(addDays(weekStart, 6)) };
    case "last-week":
      return {
        from: iso(addDays(weekStart, -7)),
        to: iso(addDays(weekStart, -1)),
      };
    case "next-week":
      return {
        from: iso(addDays(weekStart, 7)),
        to: iso(addDays(weekStart, 13)),
      };
    case "this-month":
      return { from: iso(new Date(y, m, 1)), to: iso(new Date(y, m + 1, 0)) };
    case "last-month":
      return { from: iso(new Date(y, m - 1, 1)), to: iso(new Date(y, m, 0)) };
    case "next-month":
      return {
        from: iso(new Date(y, m + 1, 1)),
        to: iso(new Date(y, m + 2, 0)),
      };
    case "plus-3":
      return { from: isoFromToday(0), to: isoFromToday(2) };
    case "plus-7":
      return { from: isoFromToday(0), to: isoFromToday(6) };
    case "plus-14":
      return { from: isoFromToday(0), to: isoFromToday(13) };
    case "rolling-30":
    default:
      return { from: isoFromToday(0), to: isoFromToday(29) };
  }
}

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** `10 Aug` / `10 Aug 2026` — three-letter months, so Sep never renders "Sept". */
export function formatShortDate(isoDate: string, withYear = false): string {
  const d = new Date(`${isoDate}T00:00:00`);
  const base = `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`;
  return withYear ? `${base} ${d.getFullYear()}` : base;
}

/** `10 Aug – 8 Sep` — shown beside the shortcut so the range is never ambiguous. */
export function formatRange(range: DateRange): string {
  const crossesYear =
    range.from.slice(0, 4) !== range.to.slice(0, 4);
  return `${formatShortDate(range.from, crossesYear)} – ${formatShortDate(range.to, crossesYear)}`;
}

// -----------------------------------------------------------------------------
// Relative urgency
// -----------------------------------------------------------------------------

/** `tomorrow`, `4 days`, `overdue 3 days` — the left-rail urgency read. */
export function formatRelativeDays(isoDate: string): string {
  const n = daysUntil(isoDate);
  if (n === 0) return "today";
  if (n === 1) return "tomorrow";
  if (n === -1) return "overdue 1 day";
  if (n < 0) return `overdue ${Math.abs(n)} days`;
  return `${n} days`;
}

/** Ageing read for the backlog lane — oldest first, so age is the signal. */
export function formatAge(isoDate: string): string {
  const n = Math.abs(daysUntil(isoDate));
  if (n === 0) return "today";
  if (n === 1) return "1 day old";
  return `${n} days old`;
}

/** Rows inside this horizon take the destructive treatment (brief §7 lane 1). */
export const URGENT_HORIZON_DAYS = 3;

export function isUrgent(isoDate: string): boolean {
  const n = daysUntil(isoDate);
  return n <= URGENT_HORIZON_DAYS;
}

// -----------------------------------------------------------------------------
// Scope filtering
// -----------------------------------------------------------------------------

function inRange(isoDate: string, range: DateRange): boolean {
  return isoDate >= range.from && isoDate <= range.to;
}

/**
 * Non-date scope: region, premise, campaign. Applied to every lane — including
 * the backlog lane, which ignores only *dates* (confirmed 2026-08-10).
 */
export function matchesScope(a: Activity, scope: DashboardScope): boolean {
  const regions = scope.regions.length ? scope.regions : MANAGER_REGIONS;
  if (!regions.includes(regionForTerritory(a.territory ?? a.borough)))
    return false;
  if (
    scope.premiseTypes.length &&
    (!a.premiseType || !scope.premiseTypes.includes(a.premiseType))
  )
    return false;
  if (scope.campaigns.length && !scope.campaigns.includes(a.campaignName))
    return false;
  return true;
}

/** Scope + date range. Used by the three forward lanes and the calendar. */
export function matchesScopeAndRange(
  a: Activity,
  scope: DashboardScope,
): boolean {
  return matchesScope(a, scope) && inRange(a.date, scope.range);
}

// -----------------------------------------------------------------------------
// Flags — ride on activities inside the lanes rather than owning a lane
// -----------------------------------------------------------------------------

export type FlagKind = "sla-unverified" | "check-in-exception" | "recap-overdue";

export interface Flag {
  kind: FlagKind;
  label: string;
  /** Short badge text for the row. */
  short: string;
}

/** Has the BA's 24h post-activity edit window lapsed without submission? */
export function isRecapOverdue(a: Activity): boolean {
  if (!a.completedAt || a.recapSubmittedAt) return false;
  const closes =
    new Date(a.completedAt).getTime() + RECAP_WINDOW_HOURS * 3_600_000;
  return Date.now() > closes;
}

/** Hours left in the recap window, or null if closed/submitted/not applicable. */
export function recapHoursRemaining(a: Activity): number | null {
  if (!a.completedAt || a.recapSubmittedAt) return null;
  const closes =
    new Date(a.completedAt).getTime() + RECAP_WINDOW_HOURS * 3_600_000;
  const ms = closes - Date.now();
  return ms > 0 ? Math.max(1, Math.round(ms / 3_600_000)) : null;
}

const CHECK_IN_EXCEPTION_LABELS: Record<CheckInException, string> = {
  failed: "Check-in failed",
  "out-of-area": "Checked in out of area",
  "late-checkout": "Late check-out",
};

export function getFlags(a: Activity): Flag[] {
  const flags: Flag[] = [];

  // Pre-execution SLA gate — a hard blocker.
  if (a.slaEligible && a.slaApproval !== "approved") {
    flags.push({
      kind: "sla-unverified",
      label: "SLA approval outstanding — cannot execute until approved",
      short: "SLA unverified",
    });
  }

  if (a.checkInException) {
    flags.push({
      kind: "check-in-exception",
      label: CHECK_IN_EXCEPTION_LABELS[a.checkInException],
      short: CHECK_IN_EXCEPTION_LABELS[a.checkInException],
    });
  }

  if (isRecapOverdue(a)) {
    flags.push({
      kind: "recap-overdue",
      label: "Recap overdue — edit window closed",
      short: "Recap overdue",
    });
  }

  return flags;
}

// -----------------------------------------------------------------------------
// Lanes
// -----------------------------------------------------------------------------

export type LaneId =
  | "needs-assignment"
  | "awaiting-acceptance"
  | "kit-outstanding"
  | "awaiting-review";

export interface LaneMeta {
  id: LaneId;
  title: string;
  /** Quiet label in the header stating the sort direction. */
  sortLabel: string;
  /** Empty state copy — a win, not a shrug. */
  emptyLabel: string;
  /** True for the backlog lane, which ignores the date range. */
  ignoresDateRange: boolean;
}

export const LANES: LaneMeta[] = [
  {
    id: "needs-assignment",
    title: "Needs assignment",
    sortLabel: "soonest first",
    emptyLabel: "Nothing waiting on assignment",
    ignoresDateRange: false,
  },
  {
    id: "awaiting-acceptance",
    title: "Awaiting BA acceptance",
    sortLabel: "soonest first",
    emptyLabel: "Every assignment has been accepted",
    ignoresDateRange: false,
  },
  {
    id: "kit-outstanding",
    title: "Kit & samples outstanding",
    sortLabel: "soonest first",
    emptyLabel: "All kits prepared and collected",
    ignoresDateRange: false,
  },
  {
    id: "awaiting-review",
    title: "Awaiting review & finalisation",
    sortLabel: "oldest first",
    emptyLabel: "No activities waiting on review",
    ignoresDateRange: true,
  },
];

/** Severity drives the row's blocking-line treatment. */
export type Severity = "urgent" | "warning" | "neutral";

export interface BlockingCondition {
  /** Stated as a fact — the row's reason for existing. */
  text: string;
  severity: Severity;
}

const byDateAsc = (a: Activity, b: Activity) => a.date.localeCompare(b.date);

// ── Lane 1 — Needs assignment ────────────────────────────────────────────────

export function selectNeedsAssignment(
  activities: Activity[],
  scope: DashboardScope,
): Activity[] {
  return activities
    .filter((a) => matchesScopeAndRange(a, scope))
    .filter((a) => a.status === "Unassigned")
    .sort(byDateAsc);
}

// ── Lane 2 — Awaiting BA acceptance ──────────────────────────────────────────

/** Declined outright — the assignment is dead and needs redoing. */
export function isDeclined(a: Activity): boolean {
  const assignments = a.assignedBrandAmbassadors ?? [];
  if (!assignments.length) return false;
  return assignments.some(
    (x) => x.assignmentStatus === "Declined" || x.assignmentStatus === "Withdrawn",
  );
}

export function selectAwaitingAcceptance(
  activities: Activity[],
  scope: DashboardScope,
): Activity[] {
  return activities
    .filter((a) => matchesScopeAndRange(a, scope))
    .filter((a) => a.status === "Pending")
    .sort(byDateAsc);
}

// ── Lane 3 — Kit & samples outstanding ───────────────────────────────────────

const KIT_OUTSTANDING: KitStatus[] = ["not-prepared", "out-of-stock", "prepared"];

/**
 * Kit becomes the blocking condition only once staffing is resolved. An
 * unassigned activity's real blocker is the staffing, and listing it in both
 * lanes would put one activity in two lanes at once — the same duplication the
 * brief avoids for SLA (§12).
 *
 * This is a sequencing rule, not a prep workflow: it says nothing about *how* a
 * kit gets prepared, so it holds up under both Katie's and Andrea's styles (§7).
 */
export function selectKitOutstanding(
  activities: Activity[],
  scope: DashboardScope,
): Activity[] {
  return activities
    .filter((a) => matchesScopeAndRange(a, scope))
    .filter((a) => a.status === "Confirmed" || a.status === "Live")
    .filter((a) => !!a.kitStatus && KIT_OUTSTANDING.includes(a.kitStatus))
    .sort(byDateAsc);
}

// ── Lane 4 — Awaiting review & finalisation ──────────────────────────────────
// Ignores the date range entirely (brief §5): a narrowed window must never hide
// unapproved work. Still respects region / premise / campaign scope.

export function selectAwaitingReview(
  activities: Activity[],
  scope: DashboardScope,
): Activity[] {
  return activities
    .filter((a) => matchesScope(a, scope))
    .filter((a) => a.status === "Completed" && !a.finalizedAt)
    .sort(byDateAsc); // oldest first — ageing is the urgency signal here
}

export function selectLane(
  lane: LaneId,
  activities: Activity[],
  scope: DashboardScope,
): Activity[] {
  switch (lane) {
    case "needs-assignment":
      return selectNeedsAssignment(activities, scope);
    case "awaiting-acceptance":
      return selectAwaitingAcceptance(activities, scope);
    case "kit-outstanding":
      return selectKitOutstanding(activities, scope);
    case "awaiting-review":
      return selectAwaitingReview(activities, scope);
  }
}

// -----------------------------------------------------------------------------
// Blocking conditions — stated as facts, per lane
// -----------------------------------------------------------------------------

function offeredAgo(a: Activity): string | null {
  const offered = (a.assignedBrandAmbassadors ?? []).find(
    (x) => x.assignmentStatus === "Pending",
  )?.offeredAt;
  if (!offered) return null;
  const days = Math.floor(
    (Date.now() - new Date(offered).getTime()) / 86_400_000,
  );
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export function getBlockingCondition(
  a: Activity,
  lane: LaneId,
): BlockingCondition {
  switch (lane) {
    case "needs-assignment":
      return {
        text: "No Brand Ambassador assigned",
        severity: isUrgent(a.date) ? "urgent" : "warning",
      };

    case "awaiting-acceptance": {
      const assignments = a.assignedBrandAmbassadors ?? [];
      const declined = assignments.find(
        (x) =>
          x.assignmentStatus === "Declined" ||
          x.assignmentStatus === "Withdrawn",
      );
      if (declined) {
        return {
          text: `Declined by ${declined.brandAmbassadorName} — needs reassignment`,
          severity: "urgent",
        };
      }
      const pending = assignments.find((x) => x.assignmentStatus === "Pending");
      const ago = offeredAgo(a);
      return {
        text: pending
          ? `Offered to ${pending.brandAmbassadorName}${ago ? ` ${ago}` : ""} — no response`
          : "Awaiting acceptance",
        severity: isUrgent(a.date) ? "urgent" : "warning",
      };
    }

    case "kit-outstanding": {
      if (!a.kitMaterials?.pickupLocation) {
        return { text: "No pickup location set", severity: "urgent" };
      }
      switch (a.kitStatus) {
        case "out-of-stock":
          return {
            text: `Out of stock — ${a.kitOutOfStockItems ?? 1} item${(a.kitOutOfStockItems ?? 1) === 1 ? "" : "s"}`,
            severity: "urgent",
          };
        case "not-prepared":
          return {
            text: "Samples not pulled",
            severity: isUrgent(a.date) ? "urgent" : "warning",
          };
        case "prepared":
          return {
            text: a.kitPreparedAt
              ? `Ready since ${formatShortDate(a.kitPreparedAt.slice(0, 10))} — not collected`
              : "Ready — not collected",
            severity: isUrgent(a.date) ? "urgent" : "neutral",
          };
        default:
          return { text: "Kit outstanding", severity: "warning" };
      }
    }

    case "awaiting-review": {
      // Receipt mismatch on an SLA activity breaks the downstream SLA export.
      if (a.slaEligible && !a.slaCapture?.confirmedAt) {
        return { text: "Receipt data unverified", severity: "urgent" };
      }
      if (isRecapOverdue(a)) {
        const days = a.completedAt
          ? Math.max(
              1,
              Math.floor(
                (Date.now() -
                  (new Date(a.completedAt).getTime() +
                    RECAP_WINDOW_HOURS * 3_600_000)) /
                  86_400_000,
              ),
            )
          : 1;
        return {
          text: `Recap overdue — window closed ${days} day${days === 1 ? "" : "s"} ago`,
          severity: "urgent",
        };
      }
      const hours = recapHoursRemaining(a);
      if (hours != null) {
        // Finalising now cuts the BA's edit window off immediately — the
        // manager needs to know before acting.
        return {
          text: `Recap window open — closes in ${hours}h`,
          severity: "warning",
        };
      }
      const photos = a.photoCount ?? a.finalStats?.photosSubmitted ?? 0;
      if (photos > 0) {
        return {
          text: `${photos} images awaiting approval`,
          severity: "neutral",
        };
      }
      return { text: "Awaiting finalisation", severity: "neutral" };
    }
  }
}

// -----------------------------------------------------------------------------
// Metrics strip
// -----------------------------------------------------------------------------

export interface NeedsActionCounts {
  needsAssignment: number;
  awaitingAcceptance: number;
  kitOutstanding: number;
  awaitingReview: number;
  slaUnverified: number;
  checkInExceptions: number;
  recapOverdue: number;
}

export interface PeriodCounts {
  scheduled: number;
  liveNow: number;
  completed: number;
}

/**
 * Lane counters are computed from the same selectors the lanes render, so a
 * counter can never disagree with its lane.
 */
export function getNeedsActionCounts(
  activities: Activity[],
  scope: DashboardScope,
): NeedsActionCounts {
  // SLA is a forward-looking gate: it blocks an activity from executing, so it
  // is counted inside the range alongside the forward lanes.
  const slaUnverified = activities.filter(
    (a) =>
      matchesScopeAndRange(a, scope) &&
      getFlags(a).some((f) => f.kind === "sla-unverified"),
  ).length;

  // Check-in exceptions and overdue recaps are backlog-shaped — they attach to
  // work that has already run, so a forward range would always report zero.
  // Counted scope-wide, matching the date-independence of lane 4.
  const checkInExceptions = activities.filter(
    (a) =>
      matchesScope(a, scope) &&
      getFlags(a).some((f) => f.kind === "check-in-exception"),
  ).length;

  return {
    needsAssignment: selectNeedsAssignment(activities, scope).length,
    awaitingAcceptance: selectAwaitingAcceptance(activities, scope).length,
    kitOutstanding: selectKitOutstanding(activities, scope).length,
    awaitingReview: selectAwaitingReview(activities, scope).length,
    slaUnverified,
    checkInExceptions,
    recapOverdue: selectAwaitingReview(activities, scope).filter(isRecapOverdue)
      .length,
  };
}

/** The health read, scoped to the range. "Live now" is real-time by nature. */
export function getPeriodCounts(
  activities: Activity[],
  scope: DashboardScope,
): PeriodCounts {
  const inScopeAndRange = activities.filter((a) =>
    matchesScopeAndRange(a, scope),
  );
  return {
    scheduled: inScopeAndRange.filter((a) => a.status !== "Cancelled").length,
    liveNow: activities.filter(
      (a) => matchesScope(a, scope) && a.status === "Live",
    ).length,
    completed: inScopeAndRange.filter(
      (a) => a.status === "Completed" || a.status === "Finalized",
    ).length,
  };
}

/** Campaign options for the scope filter, derived from the activity set. */
export function getCampaignOptions(activities: Activity[]): string[] {
  return Array.from(new Set(activities.map((a) => a.campaignName))).sort();
}
