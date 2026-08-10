// =============================================================================
// Market Manager workflow dashboard (IMP-1697)
// =============================================================================
// One purpose: replace the act of opening activities one by one to find out what
// needs doing. "They can't go in and out of events — no one has time for that."
//
// Four stacked regions — controls, metrics strip, view switcher, and the view.
//
// Three peer views: Activities (what's on this period), Tasks (what needs me),
// Calendar (the shape of the schedule). Tasks is the landing view — the client
// was explicit that a manager arriving here should see their work queue, not a
// schedule — even though Activities reads first in the switcher.
//
// Desktop-first: managers work on the web platform and do not use mobile for
// changes. Degrades to tablet; mobile is not a target.
// =============================================================================

import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ChevronRight, LayoutList, CalendarDays, Table2 } from "lucide-react";
import { mockEvents } from "./activities-data";
import {
  DEFAULT_SHORTCUT,
  TASK_GROUPS,
  MANAGER_REGIONS,
  formatRange,
  getCampaignOptions,
  getNeedsActionCounts,
  getPeriodCounts,
  matchesScope,
  matchesScopeAndRange,
  resolveShortcut,
  selectTaskGroup,
  type DashboardScope,
  type TaskGroupId,
} from "./dashboard-domain";
import { DashboardControls, type ControlsState } from "./dashboard-controls";
import { DashboardMetrics } from "./dashboard-metrics";
import { DashboardTaskGroup } from "./dashboard-task-group";
import { DashboardCalendar } from "./dashboard-calendar";
import { DashboardActivities } from "./dashboard-activities";

type ViewTab = "activities" | "tasks" | "calendar";

const VIEW_TABS: { id: ViewTab; label: string; icon: React.ElementType; hint: string }[] = [
  {
    id: "activities",
    label: "Activities",
    icon: Table2,
    hint: "Everything on in this period, with its campaign",
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: LayoutList,
    hint: "Your work queue, ordered by urgency",
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: CalendarDays,
    hint: "Schedule shape — workflow state encoded on each chip",
  },
];

const COLLAPSE_KEY = "hart.mm.dashboard.collapsedTaskGroups";

/** Collapse state is preserved across navigation (brief §7). */
function loadCollapsed(): TaskGroupId[] {
  try {
    const raw = window.localStorage.getItem(COLLAPSE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as TaskGroupId[]) : [];
  } catch {
    return [];
  }
}

export function Dashboard() {
  const [controls, setControls] = useState<ControlsState>(() => ({
    shortcut: DEFAULT_SHORTCUT,
    range: resolveShortcut(DEFAULT_SHORTCUT),
    region: null,
    premiseType: null,
    campaign: null,
  }));
  const [view, setView] = useState<ViewTab>("tasks");
  const [collapsed, setCollapsed] = useState<TaskGroupId[]>(loadCollapsed);
  const [expanded, setExpanded] = useState<TaskGroupId[]>([]);

  useEffect(() => {
    try {
      window.localStorage.setItem(COLLAPSE_KEY, JSON.stringify(collapsed));
    } catch {
      /* non-fatal in the prototype */
    }
  }, [collapsed]);

  const scope: DashboardScope = useMemo(
    () => ({
      range: controls.range,
      regions: controls.region ? [controls.region] : MANAGER_REGIONS,
      premiseTypes: controls.premiseType ? [controls.premiseType] : [],
      campaigns: controls.campaign ? [controls.campaign] : [],
    }),
    [controls],
  );

  const campaignOptions = useMemo(
    () => getCampaignOptions(mockEvents),
    [],
  );

  const needsAction = useMemo(
    () => getNeedsActionCounts(mockEvents, scope),
    [scope],
  );
  const period = useMemo(() => getPeriodCounts(mockEvents, scope), [scope]);

  const taskGroupActivities = useMemo(
    () =>
      TASK_GROUPS.map((meta) => ({
        meta,
        activities: selectTaskGroup(meta.id, mockEvents, scope),
      })),
    [scope],
  );

  // The calendar obeys the same scope. It reads the whole scoped set (not the
  // range) so month navigation still shows context; out-of-range days dim.
  const calendarActivities = useMemo(
    () => mockEvents.filter((a) => matchesScope(a, scope)),
    [scope],
  );

  // The Activities table is the period view, so it honours the range as well as
  // the scope — the same set the "This period" card counts.
  const periodActivities = useMemo(
    () => mockEvents.filter((a) => matchesScopeAndRange(a, scope)),
    [scope],
  );

  const toggleCollapsed = useCallback((taskGroup: TaskGroupId) => {
    setCollapsed((prev) =>
      prev.includes(taskGroup) ? prev.filter((l) => l !== taskGroup) : [...prev, taskGroup],
    );
  }, []);

  const toggleExpanded = useCallback((taskGroup: TaskGroupId) => {
    setExpanded((prev) =>
      prev.includes(taskGroup) ? prev.filter((l) => l !== taskGroup) : [...prev, taskGroup],
    );
  }, []);

  /** Strip counters are the navigation — jumping opens and scrolls to a task group. */
  const handleJump = useCallback(
    (target: { kind: "taskGroup"; taskGroup: TaskGroupId } | { kind: "flag"; flag: string }) => {
      setView("tasks");
      const taskGroupId: TaskGroupId =
        target.kind === "taskGroup"
          ? target.taskGroup
          : target.flag === "sla-unverified"
            ? "needs-assignment"
            : "awaiting-review";
      setCollapsed((prev) => prev.filter((l) => l !== taskGroupId));
      // Let the task group expand before scrolling to it.
      window.requestAnimationFrame(() => {
        document
          .getElementById(`task-${taskGroupId}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    [],
  );

  const scopeSummary = [
    controls.region ?? "All my regions",
    controls.premiseType ?? "All premise types",
    controls.campaign ?? "All campaigns",
  ].join(" · ");

  return (
    <div className="p-6 space-y-5 w-full">
      {/* A. Header + controls */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-foreground">Dashboard</h1>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontSize: "0.875rem" }}
          >
            What needs your attention
          </p>
        </div>
      </div>

      <DashboardControls
        state={controls}
        campaignOptions={campaignOptions}
        onChange={setControls}
        onPrint={() => window.print()}
      />

      {/* Print-only header line, so a carried sheet is self-describing. */}
      <div className="hidden print:block">
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>
          Market Manager dashboard —{" "}
          {VIEW_TABS.find((t) => t.id === view)?.label}
        </h1>
        <p style={{ fontSize: "0.8125rem" }}>
          {formatRange(controls.range)} · {scopeSummary}
        </p>
      </div>

      {/* B. Metrics strip */}
      <DashboardMetrics
        needsAction={needsAction}
        period={period}
        onJump={handleJump}
      />

      {/* C. View switcher — three peers. Tasks is the landing view. */}
      <div className="flex items-center gap-2 print:hidden">
        <div className="flex rounded-md border overflow-hidden">
          {VIEW_TABS.map((t) => {
            const Icon = t.icon;
            const active = view === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setView(t.id)}
                className="flex items-center gap-1.5 px-4 py-2 transition-colors"
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: active ? 600 : 400,
                  background: active ? "#7d152d" : "transparent",
                  color: active ? "#fff" : "var(--muted-foreground)",
                }}
              >
                <Icon className="size-4" />
                {t.label}
              </button>
            );
          })}
        </div>
        <span
          className="text-muted-foreground"
          style={{ fontSize: "0.75rem" }}
        >
          {VIEW_TABS.find((t) => t.id === view)?.hint}
        </span>
      </div>

      {/* D. The active view */}
      {view === "activities" ? (
        <DashboardActivities activities={periodActivities} />
      ) : view === "tasks" ? (
        <div className="space-y-3">
          {taskGroupActivities.map(({ meta, activities }) => (
            <DashboardTaskGroup
              key={meta.id}
              meta={meta}
              activities={activities}
              collapsed={collapsed.includes(meta.id)}
              expanded={expanded.includes(meta.id)}
              onToggleCollapsed={() => toggleCollapsed(meta.id)}
              onToggleExpanded={() => toggleExpanded(meta.id)}
              headerAction={
                meta.id === "awaiting-review" ? (
                  <Link
                    to="/market-manager/activities?mode=finalize"
                    className="flex items-center gap-1 shrink-0 hover:opacity-80 transition-opacity print:hidden"
                    style={{ fontSize: "0.75rem", color: "#7d152d" }}
                  >
                    Finalization Queue
                    <ChevronRight className="size-3.5" />
                  </Link>
                ) : undefined
              }
            />
          ))}
        </div>
      ) : (
        <DashboardCalendar
          activities={calendarActivities}
          range={controls.range}
        />
      )}

      {/* Scoped-count footnote — makes the active window legible at the bottom
          of a long page without re-reading the controls. */}
      <p
        className="text-muted-foreground print:hidden"
        style={{ fontSize: "0.75rem" }}
      >
        {mockEvents.filter((a) => matchesScopeAndRange(a, scope)).length}{" "}
        activities in {formatRange(controls.range)} · {scopeSummary}
      </p>
    </div>
  );
}
