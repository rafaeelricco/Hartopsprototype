// =============================================================================
// Metrics strip (IMP-1697 §6)
// =============================================================================
// Two questions, split explicitly:
//   Needs action (left, dominant)  — every counter is a jump. This IS the nav.
//   This period  (right, quiet)    — the health read. Not clickable.
//
// Design rules honoured here:
//   · Zero is a success state — muted, never red. Only non-zero earns colour.
//   · No trend arrows. "+8 vs last week" is a reporting metric.
//   · Compressed: nine counters at full StatCard size would eat the fold, so
//     this is one card with internal dividers plus a lighter inline treatment.
// =============================================================================

import {
  Activity as ActivityIcon,
  CheckCircle2,
  ClipboardCheck,
  Flag,
  Package,
  Radio,
  ShieldAlert,
  UserPlus,
  UserCheck,
} from "lucide-react";
import { Card, CardContent } from "@/app/shared/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/shared/components/ui/tooltip";
import type {
  LaneId,
  NeedsActionCounts,
  PeriodCounts,
} from "./dashboard-domain";

type Target = { kind: "lane"; lane: LaneId } | { kind: "flag"; flag: string };

interface CounterDef {
  key: keyof NeedsActionCounts;
  label: string;
  icon: React.ElementType;
  target: Target;
  /** Flags are visually distinct from lane counts — they ride on activities. */
  isFlag: boolean;
  hint: string;
}

const LANE_COUNTERS: CounterDef[] = [
  {
    key: "needsAssignment",
    label: "Unassigned",
    icon: UserPlus,
    target: { kind: "lane", lane: "needs-assignment" },
    isFlag: false,
    hint: "Activities in range with no Brand Ambassador assigned",
  },
  {
    key: "awaitingAcceptance",
    label: "Awaiting BA",
    icon: UserCheck,
    target: { kind: "lane", lane: "awaiting-acceptance" },
    isFlag: false,
    hint: "Assigned and notified, but not yet accepted",
  },
  {
    key: "kitOutstanding",
    label: "Kit outstanding",
    icon: Package,
    target: { kind: "lane", lane: "kit-outstanding" },
    isFlag: false,
    hint: "Kit not prepared, out of stock, or awaiting collection",
  },
  {
    key: "awaitingReview",
    label: "Review",
    icon: ClipboardCheck,
    target: { kind: "lane", lane: "awaiting-review" },
    isFlag: false,
    hint: "Completed activities waiting on you — full outstanding backlog",
  },
];

const FLAG_COUNTERS: CounterDef[] = [
  {
    key: "slaUnverified",
    label: "SLA unverified",
    icon: ShieldAlert,
    target: { kind: "flag", flag: "sla-unverified" },
    isFlag: true,
    hint: "On-premise SLA approval outstanding — cannot execute until approved",
  },
  {
    key: "checkInExceptions",
    label: "Check-in flags",
    icon: Flag,
    target: { kind: "flag", flag: "check-in-exception" },
    isFlag: true,
    hint: "Failed, out-of-area, or late check-out. Pay is tied to presence.",
  },
  {
    key: "recapOverdue",
    label: "Recap overdue",
    icon: ActivityIcon,
    target: { kind: "flag", flag: "recap-overdue" },
    isFlag: true,
    hint: "The BA's 24-hour edit window lapsed without a submission",
  },
];

function Counter({
  def,
  value,
  onJump,
}: {
  def: CounterDef;
  value: number;
  onJump: (target: Target) => void;
}) {
  const active = value > 0;
  const Icon = def.icon;

  // Zero reads calm. Flags are amber-forward; lane counts use brand burgundy.
  const tint = !active
    ? { bg: "#f1f5f9", fg: "#94a3b8" }
    : def.isFlag
      ? { bg: "#fffbeb", fg: "#b45309" }
      : { bg: "#7d152d14", fg: "#7d152d" };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={() => onJump(def.target)}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors hover:bg-muted/60 w-full"
        >
          <span
            className="flex items-center justify-center size-8 rounded-md shrink-0"
            style={{ background: tint.bg }}
          >
            <Icon className="size-4" style={{ color: tint.fg }} />
          </span>
          <span className="min-w-0">
            <span
              className="block tabular-nums"
              style={{
                fontSize: "1.375rem",
                fontWeight: 600,
                lineHeight: 1.1,
                color: active ? "var(--foreground)" : "#94a3b8",
              }}
            >
              {value}
            </span>
            <span
              className="block truncate"
              style={{
                fontSize: "0.75rem",
                color: "var(--muted-foreground)",
              }}
            >
              {def.label}
            </span>
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-[240px]">
        {def.hint}
      </TooltipContent>
    </Tooltip>
  );
}

interface Props {
  needsAction: NeedsActionCounts;
  period: PeriodCounts;
  onJump: (target: Target) => void;
}

export function DashboardMetrics({ needsAction, period, onJump }: Props) {
  const totalOutstanding =
    needsAction.needsAssignment +
    needsAction.awaitingAcceptance +
    needsAction.kitOutstanding +
    needsAction.awaitingReview;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4">
      {/* ── Needs action ─────────────────────────────────────────────────── */}
      <Card className="gap-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-1">
            <h2
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
              }}
            >
              Needs action
            </h2>
            {totalOutstanding === 0 && (
              <span
                className="flex items-center gap-1.5"
                style={{ fontSize: "0.75rem", color: "#0f766e" }}
              >
                <CheckCircle2 className="size-3.5" />
                All clear
              </span>
            )}
          </div>

          {/* Two-up on tablet so labels keep their words; four-up on desktop. */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {LANE_COUNTERS.map((def) => (
              <Counter
                key={def.key}
                def={def}
                value={needsAction[def.key]}
                onJump={onJump}
              />
            ))}
          </div>

          {/* Flags sit below a rule — they ride on activities in the lanes
              rather than owning a lane of their own. */}
          <div
            className="mt-2 pt-2 grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {FLAG_COUNTERS.map((def) => (
              <Counter
                key={def.key}
                def={def}
                value={needsAction[def.key]}
                onJump={onJump}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── This period ──────────────────────────────────────────────────── */}
      <Card className="gap-0 lg:w-[200px]">
        <CardContent className="p-4">
          <h2
            className="mb-2"
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
            }}
          >
            This period
          </h2>
          <dl className="space-y-1.5">
            <PeriodRow label="scheduled" value={period.scheduled} />
            <PeriodRow
              label="live now"
              value={period.liveNow}
              {...(period.liveNow > 0 ? { icon: Radio } : {})}
            />
            <PeriodRow label="completed" value={period.completed} />
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

function PeriodRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex items-baseline gap-1.5">
      <dd
        className="tabular-nums"
        style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)" }}
      >
        {value}
      </dd>
      <dt
        className="flex items-center gap-1"
        style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)" }}
      >
        {Icon && <Icon className="size-3 text-green-600" />}
        {label}
      </dt>
    </div>
  );
}
