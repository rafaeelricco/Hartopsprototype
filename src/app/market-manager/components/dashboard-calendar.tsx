// =============================================================================
// Calendar peer tab (IMP-1697 §8)
// =============================================================================
// Kept for exactly one job — reading the shape of a schedule. It is a peer tab,
// never the landing view: the client was explicit that a combined calendar/date
// view is not how a manager triages.
//
// What makes this a workflow surface rather than a diary: every chip encodes its
// workflow state, so an unassigned activity, an SLA-blocked activity and a fully
// confirmed one are distinguishable at a glance.
//
// House pattern (from the mobile availability calendar work): named chips over
// dots, and a distinct grey treatment for receded states.
// =============================================================================

import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, ShieldAlert } from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { Card, CardContent } from "@/app/shared/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/shared/components/ui/tooltip";
import type { Activity } from "./activities-data";
import {
  TODAY,
  getFlags,
  iso,
  startOfDay,
  type DateRange,
} from "./dashboard-domain";

type CalendarMode = "month" | "week";

// -----------------------------------------------------------------------------
// Chip encoding — workflow state, not just a time and a name
// -----------------------------------------------------------------------------

interface ChipStyle {
  bg: string;
  fg: string;
  border: string;
  /** Finalised work recedes; everything outstanding stays present. */
  recede?: boolean;
  strike?: boolean;
}

function chipStyleFor(a: Activity): ChipStyle {
  switch (a.status) {
    case "Unassigned":
      return { bg: "#fef2f2", fg: "#b91c1c", border: "#fecaca" };
    case "Pending":
      return { bg: "#fffbeb", fg: "#b45309", border: "#fde68a" };
    case "Live":
      return { bg: "#ecfdf5", fg: "#047857", border: "#a7f3d0" };
    case "Completed":
      // Completed-but-unapproved stays visually present — approval is the
      // exception that persists.
      return { bg: "#eff6ff", fg: "#1d4ed8", border: "#bfdbfe" };
    case "Finalized":
      return {
        bg: "#f8fafc",
        fg: "#94a3b8",
        border: "#e2e8f0",
        recede: true,
      };
    case "Cancelled":
      return {
        bg: "#f8fafc",
        fg: "#94a3b8",
        border: "#e2e8f0",
        recede: true,
        strike: true,
      };
    case "Confirmed":
    default:
      return { bg: "#f1f5f9", fg: "#334155", border: "#e2e8f0" };
  }
}

/** Weekend clustering is real — show up to this many before collapsing. */
const CHIPS_PER_CELL = 6;

function Chip({ activity }: { activity: Activity }) {
  const style = chipStyleFor(activity);
  const slaBlocked = getFlags(activity).some(
    (f) => f.kind === "sla-unverified",
  );
  const startTime = activity.time.split("–")[0]?.trim() ?? "";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={`/market-manager/activities/${activity.id}`}
          className="block rounded border px-1.5 py-1 hover:brightness-95 transition-all"
          style={{
            background: style.bg,
            borderColor: slaBlocked ? "#f59e0b" : style.border,
            borderLeftWidth: 3,
            borderLeftColor: slaBlocked ? "#f59e0b" : style.fg,
            opacity: style.recede ? 0.65 : 1,
          }}
        >
          <span
            className="flex items-center gap-1"
            style={{ fontSize: "0.625rem", color: style.fg, fontWeight: 500 }}
          >
            {slaBlocked && <ShieldAlert className="size-2.5 shrink-0" />}
            <span className="truncate">{startTime}</span>
          </span>
          <span
            className="block truncate"
            style={{
              fontSize: "0.6875rem",
              color: style.fg,
              fontWeight: 500,
              textDecoration: style.strike ? "line-through" : "none",
            }}
          >
            {activity.name}
          </span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-[260px]">
        <div style={{ fontWeight: 600 }}>{activity.name}</div>
        <div>{activity.venue}</div>
        <div>
          {activity.time} · {activity.status}
        </div>
        {slaBlocked && <div>SLA approval outstanding</div>}
      </TooltipContent>
    </Tooltip>
  );
}

// -----------------------------------------------------------------------------
// Grid
// -----------------------------------------------------------------------------

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function startOfWeekMon(d: Date): Date {
  const out = startOfDay(d);
  out.setDate(out.getDate() - ((out.getDay() + 6) % 7));
  return out;
}

function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

interface Props {
  activities: Activity[];
  range: DateRange;
}

export function DashboardCalendar({ activities, range }: Props) {
  const [mode, setMode] = useState<CalendarMode>("month");
  // Anchor on the month the active range starts in, so the calendar opens where
  // the manager's window actually is.
  const [anchor, setAnchor] = useState<Date>(() =>
    startOfDay(new Date(`${range.from}T00:00:00`)),
  );

  const byDate = useMemo(() => {
    const map = new Map<string, Activity[]>();
    for (const a of activities) {
      const list = map.get(a.date);
      if (list) list.push(a);
      else map.set(a.date, [a]);
    }
    for (const list of map.values()) {
      list.sort((x, y) => x.time.localeCompare(y.time));
    }
    return map;
  }, [activities]);

  const { cells, title } = useMemo(() => {
    if (mode === "week") {
      const start = startOfWeekMon(anchor);
      return {
        cells: Array.from({ length: 7 }, (_, i) => addDays(start, i)),
        title: `Week of ${start.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
      };
    }
    const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    const gridStart = startOfWeekMon(first);
    const last = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
    const total = Math.ceil(
      (last.getTime() - gridStart.getTime()) / 86_400_000 + 1,
    );
    const weeks = Math.ceil(total / 7);
    return {
      cells: Array.from({ length: weeks * 7 }, (_, i) => addDays(gridStart, i)),
      title: anchor.toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      }),
    };
  }, [anchor, mode]);

  /** Cells chunked into weeks of seven, so print can keep a week intact. */
  const weeks = useMemo(() => {
    const out: Date[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      out.push(cells.slice(i, i + 7));
    }
    return out;
  }, [cells]);

  function shift(direction: -1 | 1) {
    if (mode === "week") {
      setAnchor((d) => addDays(d, direction * 7));
    } else {
      setAnchor((d) => new Date(d.getFullYear(), d.getMonth() + direction, 1));
    }
  }

  const todayIso = iso(TODAY);

  return (
    <Card className="gap-0">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => shift(-1)}
              aria-label="Previous"
              className="print:hidden"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span
              style={{
                fontSize: "0.9375rem",
                fontWeight: 600,
                minWidth: 190,
                textAlign: "center",
              }}
            >
              {title}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => shift(1)}
              aria-label="Next"
              className="print:hidden"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <CalendarLegend />
            <div className="flex rounded-md border overflow-hidden print:hidden">
              {(["month", "week"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className="px-3 py-1.5 transition-colors"
                  style={{
                    fontSize: "0.8125rem",
                    background: mode === m ? "#7d152d" : "transparent",
                    color: mode === m ? "#fff" : "var(--muted-foreground)",
                  }}
                >
                  {m === "month" ? "Month" : "Week"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="bg-card px-2 py-1.5 text-center"
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "var(--muted-foreground)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {d}
            </div>
          ))}

          {weeks.map((week, wi) => (
            // `display: contents` keeps the seven cells in the parent grid on
            // screen; the print sheet turns this wrapper into its own grid so a
            // week never splits across a page boundary.
            <div
              key={`week-${wi}`}
              className="print-calendar-week contents print:grid print:grid-cols-7"
            >
              {week.map((cell) => {
            const cellIso = iso(cell);
            const items = byDate.get(cellIso) ?? [];
            const inMonth =
              mode === "week" || cell.getMonth() === anchor.getMonth();
            // Days outside the active range are dimmed, so an empty cell reads
            // as "outside your window" rather than "nothing scheduled".
            const inRange = cellIso >= range.from && cellIso <= range.to;
            const isToday = cellIso === todayIso;
            const overflow = items.length - CHIPS_PER_CELL;

            return (
              <div
                key={cellIso}
                className="bg-card p-1.5 align-top"
                style={{
                  minHeight: mode === "week" ? 260 : 104,
                  opacity: inMonth ? 1 : 0.4,
                  background: inRange ? undefined : "#fbfcfd",
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="inline-flex items-center justify-center rounded tabular-nums"
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: isToday ? 700 : 500,
                      color: isToday ? "#fff" : "var(--muted-foreground)",
                      background: isToday ? "#7d152d" : "transparent",
                      minWidth: 18,
                      height: 18,
                    }}
                  >
                    {cell.getDate()}
                  </span>
                  {items.length > 3 && (
                    <span
                      className="tabular-nums"
                      style={{ fontSize: "0.625rem", color: "#94a3b8" }}
                    >
                      {items.length}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  {items.slice(0, CHIPS_PER_CELL).map((a) => (
                    <Chip key={a.id} activity={a} />
                  ))}
                  {overflow > 0 && (
                    <div
                      style={{ fontSize: "0.625rem", color: "#94a3b8" }}
                      className="px-1.5"
                    >
                      +{overflow} more
                    </div>
                  )}
                </div>
              </div>
            );
              })}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CalendarLegend() {
  const items: { label: string; color: string }[] = [
    { label: "Unassigned", color: "#b91c1c" },
    { label: "Awaiting BA", color: "#b45309" },
    { label: "Confirmed", color: "#334155" },
    { label: "Live", color: "#047857" },
    { label: "Awaiting review", color: "#1d4ed8" },
    { label: "Finalised", color: "#94a3b8" },
  ];
  return (
    <div className="hidden xl:flex items-center gap-2.5">
      {items.map((i) => (
        <span
          key={i.label}
          className="flex items-center gap-1"
          style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)" }}
        >
          <span
            className="inline-block rounded-sm"
            style={{ width: 3, height: 10, background: i.color }}
          />
          {i.label}
        </span>
      ))}
    </div>
  );
}
