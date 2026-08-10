// =============================================================================
// Lanes + row (IMP-1697 §7) — the core of the dashboard
// =============================================================================
// Four collapsible lanes ordered by date so urgency surfaces naturally. Not a
// tab set: a manager should be able to scan all four and see the shape of the
// day. Read-only — every row deep-links into the activity.
//
// One row shape across all four lanes so the eye learns it once.
// =============================================================================

import { Link } from "react-router";
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Flag,
  ShieldAlert,
  Clock3,
} from "lucide-react";
import { Card, CardContent } from "@/app/shared/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/shared/components/ui/tooltip";
import type { Activity } from "./activities-data";
import {
  formatAge,
  formatRelativeDays,
  formatShortDate,
  getBlockingCondition,
  getFlags,
  isUrgent,
  regionForTerritory,
  type FlagKind,
  type LaneId,
  type LaneMeta,
  type Severity,
} from "./dashboard-domain";

/** Rows visible before "Show all" — guards against the "huge 1000 rows" risk. */
export const LANE_VISIBLE_CAP = 8;

const SEVERITY_COLOR: Record<Severity, string> = {
  urgent: "#b91c1c",
  warning: "#b45309",
  neutral: "#475569",
};

const FLAG_ICON: Record<FlagKind, React.ElementType> = {
  "sla-unverified": ShieldAlert,
  "check-in-exception": Flag,
  "recap-overdue": Clock3,
};

// -----------------------------------------------------------------------------
// Row
// -----------------------------------------------------------------------------

function LaneRow({
  activity,
  lane,
  /** The backlog lane reads age, not countdown — ageing is its urgency signal. */
  showAge,
}: {
  activity: Activity;
  lane: LaneId;
  showAge: boolean;
}) {
  const blocking = getBlockingCondition(activity, lane);
  const flags = getFlags(activity);
  const urgent = showAge ? false : isUrgent(activity.date);
  const territory = activity.territory ?? activity.borough ?? "—";
  const region = regionForTerritory(territory);

  return (
    <Link
      to={`/market-manager/activities/${activity.id}`}
      className="flex items-stretch gap-4 px-5 py-3 hover:bg-muted/50 transition-colors group break-inside-avoid"
    >
      {/* Left rail — date + relative urgency. What makes a date-ordered list
          scannable. */}
      <div className="w-[104px] shrink-0">
        <div
          style={{
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "var(--foreground)",
          }}
        >
          {formatShortDate(activity.date)}
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: urgent ? 600 : 400,
            color: urgent ? SEVERITY_COLOR.urgent : "var(--muted-foreground)",
          }}
        >
          {showAge ? formatAge(activity.date) : formatRelativeDays(activity.date)}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        {/* Line 1 — activity and venue */}
        <div className="flex items-baseline gap-2 min-w-0">
          <span
            className="truncate"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--foreground)",
            }}
          >
            {activity.name}
          </span>
          <span
            className="truncate"
            style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)" }}
          >
            — {activity.venue}
          </span>
        </div>

        {/* Line 2 — scope. Quiet. */}
        <div
          className="truncate mt-0.5"
          style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}
        >
          {region} · {territory} · {activity.premiseType ?? "—"} ·{" "}
          {activity.campaignName}
        </div>

        {/* Line 3 — the blocking condition, stated as a fact. The most legible
            thing after the name. */}
        <div
          className="mt-1 flex items-center gap-1.5"
          style={{
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: SEVERITY_COLOR[blocking.severity],
          }}
        >
          <span aria-hidden>▸</span>
          {blocking.text}
        </div>
      </div>

      {/* Flags — so a manager can see an unassigned activity is *also*
          SLA-blocked without leaving the lane. */}
      <div className="flex items-center gap-1.5 shrink-0">
        {flags.map((f) => {
          const Icon = FLAG_ICON[f.kind];
          return (
            <Tooltip key={f.kind}>
              <TooltipTrigger asChild>
                <span
                  className="inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5"
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    background: "#fffbeb",
                    borderColor: "#fde68a",
                    color: "#b45309",
                  }}
                >
                  <Icon className="size-3" />
                  <span className="hidden xl:inline">{f.short}</span>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">{f.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      <ChevronRight className="size-4 self-center text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 print:hidden" />
    </Link>
  );
}

// -----------------------------------------------------------------------------
// Lane
// -----------------------------------------------------------------------------

interface LaneProps {
  meta: LaneMeta;
  activities: Activity[];
  collapsed: boolean;
  expanded: boolean;
  onToggleCollapsed: () => void;
  onToggleExpanded: () => void;
  /** Rendered in the header — e.g. the Finalization Queue entry point. */
  headerAction?: React.ReactNode;
}

export function DashboardLane({
  meta,
  activities,
  collapsed,
  expanded,
  onToggleCollapsed,
  onToggleExpanded,
  headerAction,
}: LaneProps) {
  const count = activities.length;
  const visible = expanded
    ? activities
    : activities.slice(0, LANE_VISIBLE_CAP);
  const hidden = count - visible.length;
  const showAge = meta.id === "awaiting-review";

  return (
    <Card className="gap-0 break-inside-avoid" id={`lane-${meta.id}`}>
      <CardContent className="p-0">
        {/* Header — name, count, sort direction as a quiet label */}
        <div className="flex items-center gap-3 px-5 py-3">
          <button
            type="button"
            onClick={onToggleCollapsed}
            className="flex items-center gap-2 min-w-0 flex-1 text-left"
            aria-expanded={!collapsed}
            aria-controls={`lane-body-${meta.id}`}
          >
            {collapsed ? (
              <ChevronRight className="size-4 text-muted-foreground shrink-0 print:hidden" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground shrink-0 print:hidden" />
            )}
            <h3
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--foreground)",
              }}
            >
              {meta.title}
            </h3>
            <span
              className="tabular-nums"
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: count === 0 ? "#94a3b8" : "#7d152d",
              }}
            >
              ({count})
            </span>
            {/* The backlog lane ignores the date filter — say so, loudly enough
                that nobody thinks narrowing the range emptied it. */}
            {meta.ignoresDateRange && (
              <span
                className="rounded px-1.5 py-0.5"
                style={{
                  fontSize: "0.625rem",
                  fontWeight: 500,
                  background: "#f1f5f9",
                  color: "#475569",
                }}
              >
                all outstanding · ignores date range
              </span>
            )}
          </button>

          <span
            className="shrink-0"
            style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)" }}
          >
            {meta.sortLabel}
          </span>
          {headerAction}
        </div>

        {!collapsed && (
          <div id={`lane-body-${meta.id}`} className="border-t border-border">
            {count === 0 ? (
              // Empty state is a win. Managers should be able to empty a lane
              // and feel it.
              <div className="flex items-center justify-center gap-2 py-7">
                <CheckCircle2 className="size-4" style={{ color: "#0f766e" }} />
                <span style={{ fontSize: "0.8125rem", color: "#0f766e" }}>
                  {meta.emptyLabel}
                </span>
              </div>
            ) : (
              <>
                <div className="divide-y divide-border">
                  {visible.map((a) => (
                    <LaneRow
                      key={a.id}
                      activity={a}
                      lane={meta.id}
                      showAge={showAge}
                    />
                  ))}
                </div>
                {(hidden > 0 || expanded) && (
                  <button
                    type="button"
                    onClick={onToggleExpanded}
                    className="w-full px-5 py-2.5 border-t border-border hover:bg-muted/50 transition-colors print:hidden"
                    style={{ fontSize: "0.8125rem", color: "#7d152d" }}
                  >
                    {expanded ? "Show fewer" : `Show all (${count})`}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
