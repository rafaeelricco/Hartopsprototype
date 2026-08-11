// =============================================================================
// Shared date range — the one range vocabulary (reporting brief §2, §4.1)
// =============================================================================
// Four different date-range vocabularies had grown across the app
// (`all/30d/3m/6m` on staff reports, `3m/6m/12m` on ops reports, free from/to
// in the generate-report dialog, and the manager dashboard's own set). This
// module is the single replacement.
//
// One control, one resolver, one formatter. What differs per surface is only
// *which shortcuts are offered*: triage surfaces look forwards, reporting
// surfaces look backwards. Both draw from the same closed set below.
// =============================================================================

// -----------------------------------------------------------------------------
// "Today" anchor
// -----------------------------------------------------------------------------
// Single source of truth for now. Mock activity dates are generated relative to
// this, so demos always populate and never go stale. To produce
// byte-reproducible screenshots, pin this to a fixed date:
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
// Range
// -----------------------------------------------------------------------------

export interface DateRange {
  /** inclusive ISO start */
  from: string;
  /** inclusive ISO end */
  to: string;
}

/** True when `isoDate` falls inside the inclusive range. */
export function inRange(isoDate: string, range: DateRange): boolean {
  return isoDate >= range.from && isoDate <= range.to;
}

// -----------------------------------------------------------------------------
// Shortcut vocabulary
// -----------------------------------------------------------------------------
// The closed set. Surfaces offer a subset — never a superset — so a shortcut
// always means the same thing wherever it appears.

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
  "last-3-months",
  "last-6-months",
  "last-12-months",
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
  "last-3-months": "Last 3 months",
  "last-6-months": "Last 6 months",
  "last-12-months": "Last 12 months",
};

/**
 * Triage surfaces (manager dashboard) look *forwards* — what is coming and
 * what is stuck. Backward multi-month windows are meaningless there.
 */
export const TRIAGE_SHORTCUTS: RangeShortcut[] = [
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
];

/**
 * Reporting surfaces look *backwards* — reports describe work that has already
 * happened, so forward day-windows are omitted (reporting brief §4.1).
 */
export const REPORTING_SHORTCUTS: RangeShortcut[] = [
  "this-week",
  "last-week",
  "next-week",
  "this-month",
  "last-month",
  "next-month",
  "last-3-months",
  "last-6-months",
  "last-12-months",
];

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
    // Backward windows end today and run whole months back, so "last 3 months"
    // on 10 Aug reads 11 May – 10 Aug rather than a calendar-quarter.
    case "last-3-months":
      return { from: iso(addDays(new Date(y, m - 3, TODAY.getDate()), 1)), to: iso(TODAY) };
    case "last-6-months":
      return { from: iso(addDays(new Date(y, m - 6, TODAY.getDate()), 1)), to: iso(TODAY) };
    case "last-12-months":
      return { from: iso(addDays(new Date(y - 1, m, TODAY.getDate()), 1)), to: iso(TODAY) };
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
  const crossesYear = range.from.slice(0, 4) !== range.to.slice(0, 4);
  return `${formatShortDate(range.from, crossesYear)} – ${formatShortDate(range.to, crossesYear)}`;
}

/**
 * `1 Jul – 31 Jul 2026` — always year-qualified. Used where a range has to be
 * unambiguous out of context: report headers, archive rows, printed sheets.
 */
export function formatRangeLong(range: DateRange): string {
  return `${formatShortDate(range.from, true)} – ${formatShortDate(range.to, true)}`;
}

/** `tomorrow`, `4 days`, `overdue 3 days` — the relative urgency read. */
export function formatRelativeDays(isoDate: string): string {
  const n = daysUntil(isoDate);
  if (n === 0) return "today";
  if (n === 1) return "tomorrow";
  if (n === -1) return "overdue 1 day";
  if (n < 0) return `overdue ${Math.abs(n)} days`;
  return `${n} days`;
}
