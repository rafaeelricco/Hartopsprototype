// =============================================================================
// Activities tab — the period view (IMP-1697, added 2026-08-10 review)
// =============================================================================
// The third peer view. Tasks answers "what needs me"; the calendar answers
// "what shape is the schedule"; this answers "what is actually on in this
// period" — as a scannable table, with the campaign each activity belongs to
// visible rather than buried in the activity record.
//
// It is the drill-down behind the quiet "This period" card in the metrics strip.
// =============================================================================

import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/app/shared/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/shared/components/ui/table";
import type { Activity } from "./activities-data";
import type { EventStatus } from "./activities-data";
import {
  formatRelativeDays,
  formatShortDate,
  getFlags,
  isUrgent,
  regionForTerritory,
} from "./dashboard-domain";

// Status treatment matches the calendar chips, so the two views read as one
// system rather than two encodings of the same thing.
const STATUS_STYLE: Record<EventStatus, { bg: string; fg: string }> = {
  Unassigned: { bg: "#fef2f2", fg: "#b91c1c" },
  Pending: { bg: "#fffbeb", fg: "#b45309" },
  Confirmed: { bg: "#f1f5f9", fg: "#334155" },
  Live: { bg: "#ecfdf5", fg: "#047857" },
  Completed: { bg: "#eff6ff", fg: "#1d4ed8" },
  Finalized: { bg: "#f8fafc", fg: "#94a3b8" },
  Cancelled: { bg: "#f8fafc", fg: "#94a3b8" },
};

type StatusFilter = "all" | "upcoming" | "live" | "completed";

const STATUS_FILTERS: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "live", label: "Live" },
  { id: "completed", label: "Completed" },
];

function matchesStatusFilter(a: Activity, filter: StatusFilter): boolean {
  switch (filter) {
    case "upcoming":
      return (
        a.status === "Unassigned" ||
        a.status === "Pending" ||
        a.status === "Confirmed"
      );
    case "live":
      return a.status === "Live";
    case "completed":
      return a.status === "Completed" || a.status === "Finalized";
    case "all":
    default:
      return true;
  }
}

interface Props {
  /** Already scoped to the active range, region, premise and campaign. */
  activities: Activity[];
}

export function DashboardActivities({ activities }: Props) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<StatusFilter>("all");

  const rows = useMemo(
    () =>
      activities
        .filter((a) => matchesStatusFilter(a, filter))
        .sort((x, y) => x.date.localeCompare(y.date)),
    [activities, filter],
  );

  const counts = useMemo(() => {
    const c: Record<StatusFilter, number> = {
      all: activities.length,
      upcoming: 0,
      live: 0,
      completed: 0,
    };
    for (const a of activities) {
      if (matchesStatusFilter(a, "upcoming")) c.upcoming++;
      else if (matchesStatusFilter(a, "live")) c.live++;
      else if (matchesStatusFilter(a, "completed")) c.completed++;
    }
    return c;
  }, [activities]);

  return (
    <Card className="gap-0">
      <CardContent className="p-0">
        <div className="flex flex-wrap items-center gap-2 px-5 py-3">
          <div className="flex rounded-md border overflow-hidden print:hidden">
            {STATUS_FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className="px-3 py-1.5 transition-colors"
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: active ? 600 : 400,
                    background: active ? "#7d152d" : "transparent",
                    color: active ? "#fff" : "var(--muted-foreground)",
                  }}
                >
                  {f.label}
                  <span
                    className="ml-1.5 tabular-nums"
                    style={{ opacity: active ? 0.85 : 0.7 }}
                  >
                    {counts[f.id]}
                  </span>
                </button>
              );
            })}
          </div>
          <span
            className="ml-auto text-muted-foreground"
            style={{ fontSize: "0.75rem" }}
          >
            soonest first
          </span>
        </div>

        <div className="border-t border-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[124px]">Date</TableHead>
                <TableHead className="w-[112px]">Time</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Brand Ambassador</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((a) => {
                const style = STATUS_STYLE[a.status];
                const territory = a.territory ?? a.borough ?? "—";
                const flags = getFlags(a);
                const urgent =
                  isUrgent(a.date) &&
                  (a.status === "Unassigned" || a.status === "Pending");

                return (
                  <TableRow
                    key={a.id}
                    onClick={() =>
                      navigate(`/market-manager/activities/${a.id}`)
                    }
                    className="cursor-pointer"
                  >
                    <TableCell>
                      <div style={{ fontWeight: 500 }}>
                        {formatShortDate(a.date)}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: urgent
                            ? "#b91c1c"
                            : "var(--muted-foreground)",
                          fontWeight: urgent ? 600 : 400,
                        }}
                      >
                        {formatRelativeDays(a.date)}
                      </div>
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {a.time}
                    </TableCell>
                    <TableCell className="max-w-[240px]">
                      <div className="truncate" style={{ fontWeight: 500 }}>
                        {a.name}
                      </div>
                      <div
                        className="truncate"
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        {a.venue}
                      </div>
                    </TableCell>
                    {/* The campaign each activity is attached to — the reason
                        this view exists as a table. */}
                    <TableCell className="max-w-[170px]">
                      <span
                        className="inline-block truncate rounded px-1.5 py-0.5"
                        style={{
                          fontSize: "0.75rem",
                          background: "#7d152d0f",
                          color: "#7d152d",
                          maxWidth: "100%",
                        }}
                        title={a.campaignName}
                      >
                        {a.campaignName}
                      </span>
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {regionForTerritory(territory)} · {territory}
                      <div style={{ fontSize: "0.75rem" }}>
                        {a.premiseType ?? "—"}
                      </div>
                    </TableCell>
                    <TableCell style={{ fontSize: "0.8125rem" }}>
                      {a.brandAmbassadorName ?? (
                        <span style={{ color: "#b91c1c" }}>Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="inline-flex items-center rounded-md px-2 py-0.5 whitespace-nowrap"
                          style={{
                            fontSize: "0.6875rem",
                            fontWeight: 500,
                            background: style.bg,
                            color: style.fg,
                          }}
                        >
                          {a.status === "Finalized" ? "Finalised" : a.status}
                        </span>
                        {flags.length > 0 && (
                          <span
                            className="inline-flex items-center rounded-md border px-1.5 py-0.5 whitespace-nowrap"
                            style={{
                              fontSize: "0.625rem",
                              fontWeight: 500,
                              background: "#fffbeb",
                              borderColor: "#fde68a",
                              color: "#b45309",
                            }}
                            title={flags.map((f) => f.label).join(" · ")}
                          >
                            {flags.length === 1
                              ? flags[0]!.short
                              : `${flags.length} flags`}
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}

              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center">
                    <CalendarDays
                      className="mx-auto mb-2 size-5"
                      style={{ color: "#94a3b8" }}
                    />
                    <span
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      No activities in this period. Widen the date range or clear
                      a filter.
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
