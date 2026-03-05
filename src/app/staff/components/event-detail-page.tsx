// =============================================================================
// Event Detail — MM-UI-004
// Shows a single event with its 3-phase lifecycle:
//   Phase 1: Editable Configuration  (draft / scheduled)
//   Phase 2: Live Data Feed          (active)  — with real-time simulation
//   Phase 3: Locked Final Report     (completed)
// Phase transitions require explicit confirmation (irreversible).
// =============================================================================

import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Clock,
  Target,
  Megaphone,
  FileText,
  Lock,
  Radio,
  Edit3,
  CheckCircle2,
  Activity,
  BarChart3,
  Camera,
  TrendingUp,
  Pencil,
  Check,
  X,
  AlertTriangle,
  Info,
  Download,
  Loader2,
} from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import { Badge } from "@/app/shared/components/ui/badge";
import { Separator } from "@/app/shared/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/shared/components/ui/dialog";
import { useCampaignContext } from "./campaign-context";
import {
  OBJECTIVES,
  ADVANCED_MODULES,
  OBJECTIVE_MODULE_MAP,
  DURATION_OPTIONS,
  getDataModulesForObjectives,
  type EventItem,
  type DataModule,
} from "./event-data";

// ── Constants ────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<
  string,
  { bg: string; text: string; dot: string; label: string }
> = {
  active: { bg: "#ECFDF5", text: "#0F766E", dot: "#0F766E", label: "Active" },
  draft: { bg: "#F1F5F9", text: "#64748B", dot: "#94A3B8", label: "Draft" },
  completed: {
    bg: "#FEF2F2",
    text: "#B91C1C",
    dot: "#B91C1C",
    label: "Completed",
  },
  scheduled: {
    bg: "#EFF6FF",
    text: "#1D4ED8",
    dot: "#3B82F6",
    label: "Scheduled",
  },
};

const VENUE_LABELS: Record<string, string> = {
  "off-premises": "Off-Premises",
  "on-premises": "On-Premises",
  special: "Special",
};

type LifecyclePhase = 1 | 2 | 3;

function getPhase(status: EventItem["status"]): LifecyclePhase {
  if (status === "draft" || status === "scheduled") return 1;
  if (status === "active") return 2;
  return 3;
}

const PHASE_META: Record<
  LifecyclePhase,
  {
    label: string;
    description: string;
    icon: typeof Edit3;
    color: string;
    bg: string;
  }
> = {
  1: {
    label: "Editable Configuration",
    description: "Event details can be modified before the event starts.",
    icon: Edit3,
    color: "#1D4ED8",
    bg: "#EFF6FF",
  },
  2: {
    label: "Live Data Feed",
    description: "Real-time data is flowing in from field educators.",
    icon: Radio,
    color: "#0F766E",
    bg: "#ECFDF5",
  },
  3: {
    label: "Locked Final Report",
    description: "Report is locked and read-only. Data collection is complete.",
    icon: Lock,
    color: "#B91C1C",
    bg: "#FEF2F2",
  },
};

const LIFECYCLE_PHASES: LifecyclePhase[] = [1, 2, 3];

// ── Live feed mock data pool ─────────────────────────────────────────────────

const FEED_POOL = [
  {
    module: "Brand Visibility Score",
    value: "Score: 8.4/10",
    type: "metric" as const,
  },
  {
    module: "Photo Documentation",
    value: "3 photos uploaded",
    type: "photo" as const,
  },
  {
    module: "Impressions Tracker",
    value: "342 impressions",
    type: "metric" as const,
  },
  {
    module: "Consumer Feedback",
    value: "Rating: 4.7/5 (12 responses)",
    type: "metric" as const,
  },
  {
    module: "Sales Volume Tracker",
    value: "47 units sold",
    type: "metric" as const,
  },
  {
    module: "Photo Documentation",
    value: "2 photos uploaded",
    type: "photo" as const,
  },
  {
    module: "Engagement Metrics",
    value: "89 interactions logged",
    type: "metric" as const,
  },
  {
    module: "Social Mentions",
    value: "6 new mentions",
    type: "metric" as const,
  },
  {
    module: "Brand Visibility Score",
    value: "Updated to 8.7/10",
    type: "metric" as const,
  },
  {
    module: "Sales Volume Tracker",
    value: "63 units sold (+16)",
    type: "metric" as const,
  },
  {
    module: "Photo Documentation",
    value: "5 photos uploaded",
    type: "photo" as const,
  },
  {
    module: "Consumer Feedback",
    value: "Rating: 4.8/5 (19 responses)",
    type: "metric" as const,
  },
  {
    module: "Impressions Tracker",
    value: "518 impressions (+176)",
    type: "metric" as const,
  },
  {
    module: "Engagement Metrics",
    value: "124 interactions (+35)",
    type: "metric" as const,
  },
  {
    module: "Social Mentions",
    value: "11 new mentions (+5)",
    type: "metric" as const,
  },
  {
    module: "Photo Documentation",
    value: "1 photo uploaded",
    type: "photo" as const,
  },
];

function makeTime(index: number): string {
  const baseHour = 10;
  const minutes = index * 7 + Math.floor(index / 3) * 4;
  const h = baseHour + Math.floor(minutes / 60);
  const m = minutes % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

// =============================================================================
// Main Component
// =============================================================================

export function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const { getEvent, getCampaign, updateEventStatus } = useCampaignContext();

  const event = getEvent(eventId ?? "");
  const campaign = event ? getCampaign(event.campaignId) : undefined;

  // Confirmation dialog state
  const [confirmAction, setConfirmAction] = useState<{
    status: EventItem["status"];
    title: string;
    description: string;
    warning: string;
    confirmLabel: string;
    confirmColor: string;
  } | null>(null);

  function requestTransition(
    status: EventItem["status"],
    title: string,
    description: string,
    warning: string,
    confirmLabel: string,
    confirmColor: string,
  ) {
    setConfirmAction({
      status,
      title,
      description,
      warning,
      confirmLabel,
      confirmColor,
    });
  }

  function executeTransition() {
    if (!event || !confirmAction) return;
    updateEventStatus(event.id, confirmAction.status);
    setConfirmAction(null);
  }

  if (!event) {
    return (
      <div className="p-6 font-[Inter]">
        <Link
          to="/staff/events"
          className="inline-flex items-center gap-1.5 mb-6 no-underline transition-colors"
          style={{ fontSize: "0.875rem", color: "#7D152D" }}
        >
          <ArrowLeft size={15} />
          Back to Events
        </Link>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
            style={{ background: "#7D152D0F" }}
          >
            <CalendarDays size={26} style={{ color: "#7D152D" }} />
          </div>
          <p style={{ fontSize: "1rem", color: "#0F172A" }} className="mb-1">
            Event not found
          </p>
          <p style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
            The event you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const phase = getPhase(event.status);
  const [viewingPhase, setViewingPhase] = useState<LifecyclePhase>(phase);
  const [downloading, setDownloading] = useState(false);

  function handleDownloadReport() {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  }

  // Reset viewingPhase when the actual phase changes (transition)
  useEffect(() => {
    setViewingPhase(phase);
  }, [phase]);

  const phaseMeta = PHASE_META[phase];
  const status = STATUS_LABELS[event.status] ?? STATUS_LABELS["draft"];

  const mappedModules = getDataModulesForObjectives(event.objectives);
  const advModules = ADVANCED_MODULES.filter((m) =>
    event.advancedModules.includes(m.id),
  );
  const objectiveDetails = OBJECTIVES.filter((o) =>
    event.objectives.includes(o.id),
  );
  const modulesByObjective = event.objectives.map((objId) => {
    const obj = OBJECTIVES.find((o) => o.id === objId);
    const mods = OBJECTIVE_MODULE_MAP[objId] ?? [];
    return { objectiveId: objId, label: obj?.label ?? objId, modules: mods };
  });

  // Phase transition button config
  const transitionButton =
    phase === 1 && event.status === "draft"
      ? {
          label: "Schedule Event",
          icon: CalendarDays,
          color: "#1D4ED8",
          onClick: () =>
            requestTransition(
              "scheduled",
              "Schedule this event?",
              "This will mark the event as scheduled. It will still be editable until the event starts.",
              "Once the event goes live, you will no longer be able to edit its configuration.",
              "Schedule Event",
              "#1D4ED8",
            ),
        }
      : phase === 1 && event.status === "scheduled"
        ? {
            label: "Start Event",
            icon: Radio,
            color: "#0F766E",
            onClick: () =>
              requestTransition(
                "active",
                "Start this event?",
                "Starting the event transitions it to the Live Data Feed phase. Field educators will begin submitting data.",
                "This action is irreversible. The event configuration will become read-only and cannot be modified.",
                "Start Event",
                "#0F766E",
              ),
          }
        : phase === 2
          ? {
              label: "Lock Report",
              icon: Lock,
              color: "#B91C1C",
              onClick: () =>
                requestTransition(
                  "completed",
                  "Lock this report?",
                  "Locking the report finalizes all collected data and generates the final event report.",
                  "This action is permanent. Once locked, the report cannot be edited or unlocked. All data becomes read-only.",
                  "Lock Report",
                  "#B91C1C",
                ),
            }
          : null;

  return (
    <div className="p-6 font-[Inter]">
      {/* Confirmation dialog (shadcn) */}
      <Dialog
        open={!!confirmAction}
        onOpenChange={(open) => {
          if (!open) setConfirmAction(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#FEF3C7" }}
              >
                <AlertTriangle size={18} style={{ color: "#D97706" }} />
              </div>
              <DialogTitle className="text-base font-medium">
                {confirmAction?.title}
              </DialogTitle>
            </div>
            <DialogDescription className="text-sm text-[#64748B] leading-relaxed">
              {confirmAction?.description}
            </DialogDescription>
          </DialogHeader>
          <div
            className="px-3.5 py-2.5 rounded-lg"
            style={{
              background: "#FEF3C7",
              fontSize: "0.8125rem",
              color: "#92400E",
              lineHeight: 1.5,
            }}
          >
            {confirmAction?.warning}
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setConfirmAction(null)}
              className="px-4 py-2 rounded-lg text-[#64748B] bg-[#F1F5F9] hover:bg-[#E2E8F0] transition-colors h-auto"
              style={{ fontSize: "0.875rem" }}
            >
              Cancel
            </Button>
            <Button
              onClick={executeTransition}
              className="px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 h-auto"
              style={{
                fontSize: "0.875rem",
                background: confirmAction?.confirmColor ?? "#7D152D",
              }}
            >
              {confirmAction?.confirmLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Back link */}
      <Link
        to="/staff/events"
        className="inline-flex items-center gap-1.5 mb-6 no-underline hover:opacity-80 transition-opacity"
        style={{ fontSize: "0.875rem", color: "#7D152D" }}
      >
        <ArrowLeft size={15} />
        Back to Events
      </Link>

      {/* ── Consolidated Header ──────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 mb-6">
        {/* Row 1: Status badge + event name + transition button */}
        <div className="flex items-center gap-3 flex-wrap">
          <Badge
            className="rounded-md border-0 gap-1.5"
            style={{
              fontSize: "0.6875rem",
              background: status!.bg,
              color: status!.text,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: status!.dot }}
            />
            {status!.label}
          </Badge>
          <h2
            className="flex-1 min-w-0"
            style={{ fontSize: "1.25rem", color: "#0F172A" }}
          >
            {event.name}
          </h2>
          {transitionButton && (
            <Button
              onClick={transitionButton.onClick}
              className="inline-flex items-center gap-2 px-4 h-9 rounded-lg text-white transition-opacity hover:opacity-90 flex-shrink-0"
              style={{
                background: transitionButton.color,
                fontSize: "0.8125rem",
              }}
            >
              <transitionButton.icon size={14} />
              {transitionButton.label}
            </Button>
          )}
          {phase === 3 && viewingPhase === 3 && (
            <Button
              onClick={handleDownloadReport}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-4 h-9 rounded-lg text-white transition-opacity hover:opacity-90 flex-shrink-0"
              style={{ background: "#7D152D", fontSize: "0.8125rem" }}
            >
              {downloading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Downloading…
                </>
              ) : (
                <>
                  <Download size={14} />
                  Download Report
                </>
              )}
            </Button>
          )}
        </div>

        {/* Row 2: Campaign link + separator + location */}
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {campaign && (
            <Link
              to={`/campaigns/${event.campaignId}`}
              className="flex items-center gap-1 no-underline hover:underline"
              style={{ fontSize: "0.8125rem", color: "#7D152D" }}
            >
              <Megaphone size={13} />
              {campaign.name}
            </Link>
          )}
          {campaign && (
            <Separator orientation="vertical" className="h-3.5 bg-[#E2E8F0]" />
          )}
          <span
            className="flex items-center gap-1"
            style={{ fontSize: "0.8125rem", color: "#64748B" }}
          >
            <MapPin size={13} />
            {event.location}
          </span>
        </div>

        {/* Row 3: Inline lifecycle dots + current phase label */}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#F1F5F9]">
          <div className="flex items-center gap-0">
            {LIFECYCLE_PHASES.map((p, i) => {
              const pm = PHASE_META[p];
              const isCurrent = p === phase;
              const isDone = p < phase;
              const isViewing = p === viewingPhase && viewingPhase !== phase;
              return (
                <div key={p} className="flex items-center">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{
                      background: isCurrent
                        ? pm.color
                        : isDone
                          ? "#0F766E"
                          : "#CBD5E1",
                      boxShadow: isViewing
                        ? `0 0 0 2px white, 0 0 0 4px ${pm.color}`
                        : "none",
                    }}
                  />
                  {i < 2 && (
                    <div
                      className="w-5 h-px"
                      style={{
                        background: isDone ? "#0F766E" : "#E2E8F0",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <span
            style={{ fontSize: "0.75rem", color: phaseMeta.color }}
            className="flex items-center gap-1.5"
          >
            <phaseMeta.icon size={12} />
            {phaseMeta.label}
          </span>
        </div>

        {/* Phase history tabs (only when phase > 1) */}
        {phase > 1 && (
          <div className="flex items-center gap-1 mt-3 pt-3 border-t border-[#F1F5F9] overflow-x-auto">
            {LIFECYCLE_PHASES.filter((p) => p <= phase).map((p) => {
              const pm = PHASE_META[p];
              const Icon = pm.icon;
              const isActive = p === viewingPhase;
              const isCurrent = p === phase;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setViewingPhase(p)}
                  className="flex items-center gap-1.5 px-3 py-2 transition-colors whitespace-nowrap flex-shrink-0"
                  style={{
                    fontSize: "0.75rem",
                    color: isActive ? "#7D152D" : "#64748B",
                    borderBottom: isActive
                      ? "2px solid #7D152D"
                      : "2px solid transparent",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <Icon size={12} />
                  {pm.label}
                  {isCurrent && " (Current)"}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Viewing history info banner ─────────────────────────────── */}
      {viewingPhase < phase && (
        <div
          className="flex items-start gap-3 px-5 py-3.5 rounded-xl mb-6"
          style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}
        >
          <Info
            size={16}
            className="flex-shrink-0 mt-0.5"
            style={{ color: "#1D4ED8" }}
          />
          <div>
            <p style={{ fontSize: "0.8125rem", color: "#1D4ED8" }}>
              Viewing Phase {viewingPhase} — {PHASE_META[viewingPhase].label}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#64748B" }}>
              This is a read-only snapshot. The event is currently in Phase{" "}
              {phase}.
            </p>
          </div>
        </div>
      )}

      {/* ── Phase-specific content ───────────────────────────────────── */}
      {viewingPhase === 1 && (
        <Phase1Editable
          event={event}
          objectives={objectiveDetails}
          modules={mappedModules}
          advModules={advModules}
          modulesByObjective={modulesByObjective}
          readOnly={viewingPhase < phase ? true : false}
        />
      )}
      {viewingPhase === 2 &&
        (viewingPhase === phase ? (
          <Phase2LiveFeed
            event={event}
            objectives={objectiveDetails}
            modules={mappedModules}
          />
        ) : (
          <Phase2ReadOnly
            modules={mappedModules}
            objectives={objectiveDetails}
          />
        ))}
      {viewingPhase === 3 && (
        <Phase3Locked
          event={event}
          modulesByObjective={modulesByObjective}
          advModules={advModules}
        />
      )}
    </div>
  );
}

// =============================================================================
// Phase 1 — Editable Configuration (with inline editing) — Sidebar Layout
// =============================================================================

function Phase1Editable({
  event,
  objectives,
  modules: _modules,
  advModules,
  modulesByObjective,
  readOnly,
}: {
  event: EventItem;
  objectives: { id: string; label: string; description: string }[];
  modules: DataModule[];
  advModules: { id: string; label: string; description: string }[];
  modulesByObjective: {
    objectiveId: string;
    label: string;
    modules: DataModule[];
  }[];
  readOnly?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      {/* Left — Event Configuration card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center gap-2">
          <Edit3
            size={15}
            style={{ color: readOnly ? "#94A3B8" : "#1D4ED8" }}
          />
          <span style={{ fontSize: "0.9375rem", color: "#0F172A" }}>
            Event Configuration
          </span>
          <span
            className="ml-auto px-2 py-0.5 rounded-md inline-flex items-center gap-1"
            style={{
              fontSize: "0.6875rem",
              background: readOnly ? "#F1F5F9" : "#EFF6FF",
              color: readOnly ? "#64748B" : "#1D4ED8",
            }}
          >
            {readOnly ? (
              <>
                <Lock size={9} />
                Read-only
              </>
            ) : (
              <>
                <Pencil size={9} />
                Editable
              </>
            )}
          </span>
        </div>
        <div className="px-5 py-5 space-y-4">
          <EditableField
            eventId={event.id}
            field="name"
            label="Event Name"
            value={event.name}
            type="text"
            readOnly={readOnly === true}
          />
          <EditableField
            eventId={event.id}
            field="location"
            label="Location"
            value={event.location}
            type="text"
            readOnly={readOnly === true}
          />
          <div className="grid grid-cols-2 gap-4">
            <EditableField
              eventId={event.id}
              field="date"
              label="Date"
              value={event.date}
              type="date"
              readOnly={readOnly === true}
            />
            <EditableField
              eventId={event.id}
              field="duration"
              label="Duration"
              value={event.duration}
              type="select"
              options={DURATION_OPTIONS}
              readOnly={readOnly === true}
            />
          </div>
          <EditableField
            eventId={event.id}
            field="venueType"
            label="Venue Type"
            value={event.venueType}
            type="select"
            options={[
              { value: "off-premises", label: "Off-Premises" },
              { value: "on-premises", label: "On-Premises" },
              { value: "special", label: "Special" },
            ]}
            displayValue={VENUE_LABELS[event.venueType] || event.venueType}
            readOnly={readOnly === true}
          />
        </div>
      </div>

      {/* Right sidebar — Objectives + Data Modules */}
      <div className="space-y-4">
        {/* Objectives card */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
          <div className="px-4 py-3.5 border-b border-[#E2E8F0] flex items-center gap-2">
            <Target size={14} style={{ color: "#7D152D" }} />
            <span style={{ fontSize: "0.875rem", color: "#0F172A" }}>
              Objectives ({objectives.length})
            </span>
          </div>
          <div className="px-4 py-3.5">
            <div className="flex flex-wrap gap-1.5">
              {objectives.map((o) => (
                <span
                  key={o.id}
                  className="px-2.5 py-1 rounded-lg"
                  style={{
                    fontSize: "0.75rem",
                    background: "#7D152D0F",
                    color: "#7D152D",
                  }}
                >
                  {o.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Data Modules card — grouped by objective */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
          <div className="px-4 py-3.5 border-b border-[#E2E8F0] flex items-center gap-2">
            <FileText size={14} style={{ color: "#0F766E" }} />
            <span style={{ fontSize: "0.875rem", color: "#0F172A" }}>
              Data Modules
            </span>
          </div>
          <div className="px-4 py-3 space-y-3">
            {modulesByObjective.map((group) => (
              <div key={group.objectiveId}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#7D152D" }}
                  />
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      color: "#64748B",
                    }}
                    className="uppercase tracking-wider"
                  >
                    {group.label}
                  </span>
                </div>
                <div className="space-y-1 ml-3">
                  {group.modules.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-start gap-2 py-1 px-2 rounded-md bg-[#F8FAFC]"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: "#0F766E" }}
                      />
                      <div className="min-w-0">
                        <p
                          className="truncate"
                          style={{ fontSize: "0.75rem", color: "#0F172A" }}
                        >
                          {m.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {advModules.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#D97706" }}
                  />
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      color: "#64748B",
                    }}
                    className="uppercase tracking-wider"
                  >
                    Advanced
                  </span>
                </div>
                <div className="space-y-1 ml-3">
                  {advModules.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-start gap-2 py-1 px-2 rounded-md bg-[#F8FAFC]"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: "#D97706" }}
                      />
                      <div className="min-w-0">
                        <p
                          className="truncate"
                          style={{ fontSize: "0.75rem", color: "#0F172A" }}
                        >
                          {m.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Inline-editable field component (vertical block layout) ──────────────────

function EditableField({
  eventId,
  field,
  label,
  value,
  type,
  options,
  displayValue,
  readOnly,
}: {
  eventId: string;
  field: "name" | "location" | "date" | "duration" | "venueType";
  label: string;
  value: string;
  type: "text" | "date" | "select";
  options?: (string | { value: string; label: string })[];
  displayValue?: string;
  readOnly?: boolean;
}) {
  const { updateEventFields } = useCampaignContext();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  function startEdit() {
    setDraft(value);
    setEditing(true);
  }

  function save() {
    if (draft.trim() && draft !== value) {
      updateEventFields(eventId, { [field]: draft.trim() } as any);
    }
    setEditing(false);
  }

  function cancel() {
    setDraft(value);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") save();
    if (e.key === "Escape") cancel();
  }

  // Display value for showing
  const shown =
    displayValue ??
    (field === "date"
      ? new Date(value + "T12:00:00").toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : value);

  if (readOnly) {
    return (
      <div>
        <span
          className="block mb-1"
          style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
        >
          {label}
        </span>
        <div className="px-3 py-2">
          <span style={{ fontSize: "0.875rem", color: "#0F172A" }}>
            {shown}
          </span>
        </div>
      </div>
    );
  }

  if (!editing) {
    return (
      <button
        onClick={startEdit}
        className="block w-full text-left group"
        type="button"
      >
        <span
          className="block mb-1"
          style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
        >
          {label}
        </span>
        <div className="flex items-center justify-between rounded-lg border border-transparent group-hover:border-[#E2E8F0] group-hover:bg-[#F8FAFC] px-3 py-2 transition-colors">
          <span style={{ fontSize: "0.875rem", color: "#0F172A" }}>
            {shown}
          </span>
          <Pencil
            size={12}
            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
            style={{ color: "#94A3B8" }}
          />
        </div>
      </button>
    );
  }

  return (
    <div>
      <span
        className="block mb-1"
        style={{ fontSize: "0.6875rem", color: "#1D4ED8" }}
      >
        {label}
      </span>
      <div className="flex items-center gap-1.5">
        {type === "select" ? (
          <select
            ref={inputRef as React.RefObject<HTMLSelectElement>}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-2 rounded-lg border border-[#93C5FD] bg-white focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30"
            style={{ fontSize: "0.875rem", color: "#0F172A" }}
          >
            {options?.map((o) => {
              const val = typeof o === "string" ? o : o.value;
              const lab = typeof o === "string" ? o : o.label;
              return (
                <option key={val} value={val}>
                  {lab}
                </option>
              );
            })}
          </select>
        ) : (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={type}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-2 rounded-lg border border-[#93C5FD] bg-white focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 h-auto shadow-none"
            style={{ fontSize: "0.875rem", color: "#0F172A" }}
          />
        )}
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={save}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#ECFDF5] transition-colors cursor-pointer"
          title="Save"
        >
          <Check size={14} style={{ color: "#0F766E" }} />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={cancel}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#FEF2F2] transition-colors cursor-pointer"
          title="Cancel"
        >
          <X size={14} style={{ color: "#B91C1C" }} />
        </Button>
      </div>
    </div>
  );
}

// =============================================================================
// Phase 2 — Live Data Feed (with real-time simulation)
// =============================================================================

function Phase2LiveFeed({
  event: _event,
  objectives,
  modules,
}: {
  event: EventItem;
  objectives: { id: string; label: string }[];
  modules: DataModule[];
}) {
  const [feedItems, setFeedItems] = useState<
    {
      time: string;
      module: string;
      value: string;
      type: "metric" | "photo";
      id: number;
    }[]
  >([]);
  const nextIdx = useRef(0);
  const [elapsed, setElapsed] = useState(0);

  // Seed initial items + start simulation
  useEffect(() => {
    // Seed first 4 items immediately
    const initial = FEED_POOL.slice(0, 4).map((item, i) => ({
      ...item,
      time: makeTime(i),
      id: i,
    }));
    nextIdx.current = 4;
    setFeedItems(initial);

    // Auto-append new items every ~3.5 seconds
    const feedInterval = setInterval(() => {
      const idx = nextIdx.current;
      if (idx < FEED_POOL.length) {
        const item = FEED_POOL[idx];
        if (item) {
          setFeedItems((prev) => [
            { ...item, time: makeTime(idx), id: idx },
            ...prev,
          ]);
        }
        nextIdx.current = idx + 1;
      }
    }, 3500);

    // Elapsed timer (every second)
    const elapsedInterval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(feedInterval);
      clearInterval(elapsedInterval);
    };
  }, []);

  const completedCount = Math.min(feedItems.length, modules.length);
  const progressPct =
    modules.length > 0
      ? Math.round((completedCount / modules.length) * 100)
      : 0;

  const elapsedMin = Math.floor(elapsed / 60);
  const elapsedSec = elapsed % 60;
  const elapsedLabel =
    elapsedMin > 0
      ? `${elapsedMin}m ${String(elapsedSec).padStart(2, "0")}s`
      : `${elapsedSec}s`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Live feed column */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center gap-2">
          <div className="relative">
            <Radio size={15} style={{ color: "#0F766E" }} />
            <span
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
              style={{
                background: "#0F766E",
                animation: "livePulse 2s ease-in-out infinite",
              }}
            />
          </div>
          <span style={{ fontSize: "0.9375rem", color: "#0F172A" }}>
            Live Data Feed
          </span>
          <span className="ml-auto flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-md"
              style={{
                fontSize: "0.6875rem",
                background: "#ECFDF5",
                color: "#0F766E",
              }}
            >
              Receiving data
            </span>
            <span style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
              {elapsedLabel} elapsed
            </span>
          </span>
        </div>

        {/* Feed entries */}
        <div className="divide-y divide-[#F8FAFC] max-h-[440px] overflow-y-auto">
          {feedItems.map((item) => (
            <div
              key={item.id}
              className="px-5 py-3.5 flex items-start gap-3"
              style={{
                animation:
                  item.id === feedItems[0]?.id
                    ? "feedSlideIn 0.4s ease-out"
                    : "none",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: item.type === "photo" ? "#7D152D0F" : "#0F766E0F",
                }}
              >
                {item.type === "photo" ? (
                  <Camera size={14} style={{ color: "#7D152D" }} />
                ) : (
                  <Activity size={14} style={{ color: "#0F766E" }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
                  {item.module}
                </p>
                <p style={{ fontSize: "0.75rem", color: "#64748B" }}>
                  {item.value}
                </p>
              </div>
              <span
                style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
                className="flex-shrink-0"
              >
                {item.time}
              </span>
            </div>
          ))}
        </div>

        <div className="px-5 py-3 border-t border-[#E2E8F0] bg-[#FAFBFC] flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{
              background: "#0F766E",
              animation: "livePulse 2s ease-in-out infinite",
            }}
          />
          <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
            Simulating near real-time feed from field educators ·{" "}
            {feedItems.length} entries received
          </p>
        </div>
      </div>

      {/* Right sidebar: progress + modules */}
      <div className="space-y-4">
        {/* Collection progress */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
          <p
            style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
            className="uppercase tracking-wider mb-3"
          >
            Collection Progress
          </p>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-14 h-14">
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="4"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="#0F766E"
                  strokeWidth="4"
                  strokeDasharray={`${progressPct * 1.508} 150.8`}
                  strokeLinecap="round"
                  transform="rotate(-90 28 28)"
                  className="transition-all duration-700"
                />
              </svg>
              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{ fontSize: "0.8125rem", color: "#0F172A" }}
              >
                {progressPct}%
              </span>
            </div>
            <div>
              <p style={{ fontSize: "0.9375rem", color: "#0F172A" }}>
                {completedCount} / {modules.length}
              </p>
              <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                modules with data
              </p>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%`, background: "#0F766E" }}
            />
          </div>
        </div>

        {/* Module status */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#E2E8F0]">
            <span style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
              Module Status
            </span>
          </div>
          <div className="px-5 py-3 space-y-2">
            {modules.map((m, i) => {
              const done = i < completedCount;
              return (
                <div
                  key={m.id}
                  className="flex items-center gap-2 transition-all"
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{
                      background: done ? "#0F766E" : "transparent",
                      border: done ? "none" : "2px solid #E2E8F0",
                    }}
                  >
                    {done && (
                      <CheckCircle2 size={10} style={{ color: "#FFF" }} />
                    )}
                  </div>
                  <span
                    className="truncate transition-colors"
                    style={{
                      fontSize: "0.75rem",
                      color: done ? "#64748B" : "#0F172A",
                      textDecoration: done ? "line-through" : "none",
                    }}
                  >
                    {m.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Objectives */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
          <p
            style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
            className="uppercase tracking-wider mb-2"
          >
            Objectives
          </p>
          <div className="flex flex-wrap gap-1.5">
            {objectives.map((o) => (
              <span
                key={o.id}
                className="px-2.5 py-1 rounded-lg"
                style={{
                  fontSize: "0.75rem",
                  background: "#7D152D0F",
                  color: "#7D152D",
                }}
              >
                {o.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes feedSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// =============================================================================
// Phase 2 — Read-Only Snapshot (viewed from Phase 3)
// =============================================================================

function Phase2ReadOnly({
  modules,
  objectives,
}: {
  modules: DataModule[];
  objectives: { id: string; label: string }[];
}) {
  const allItems = FEED_POOL.map((item, i) => ({
    ...item,
    time: makeTime(i),
    id: i,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Feed column */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center gap-2">
          <CheckCircle2 size={15} style={{ color: "#0F766E" }} />
          <span style={{ fontSize: "0.9375rem", color: "#0F172A" }}>
            Data Feed (Complete)
          </span>
          <span
            className="ml-auto px-2.5 py-0.5 rounded-md"
            style={{
              fontSize: "0.6875rem",
              background: "#F1F5F9",
              color: "#64748B",
            }}
          >
            Completed
          </span>
        </div>

        <div className="divide-y divide-[#F8FAFC] max-h-[440px] overflow-y-auto">
          {allItems.map((item) => (
            <div key={item.id} className="px-5 py-3.5 flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: item.type === "photo" ? "#7D152D0F" : "#0F766E0F",
                }}
              >
                {item.type === "photo" ? (
                  <Camera size={14} style={{ color: "#7D152D" }} />
                ) : (
                  <Activity size={14} style={{ color: "#0F766E" }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
                  {item.module}
                </p>
                <p style={{ fontSize: "0.75rem", color: "#64748B" }}>
                  {item.value}
                </p>
              </div>
              <span
                style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
                className="flex-shrink-0"
              >
                {item.time}
              </span>
            </div>
          ))}
        </div>

        <div className="px-5 py-3 border-t border-[#E2E8F0] bg-[#FAFBFC] flex items-center gap-2">
          <CheckCircle2 size={12} style={{ color: "#0F766E" }} />
          <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
            Data collection completed · {FEED_POOL.length} entries received
          </p>
        </div>
      </div>

      {/* Right sidebar: progress + modules */}
      <div className="space-y-4">
        {/* Collection progress — 100% */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
          <p
            style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
            className="uppercase tracking-wider mb-3"
          >
            Collection Progress
          </p>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-14 h-14">
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="4"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="#0F766E"
                  strokeWidth="4"
                  strokeDasharray="150.8 150.8"
                  strokeLinecap="round"
                  transform="rotate(-90 28 28)"
                />
              </svg>
              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{ fontSize: "0.8125rem", color: "#0F172A" }}
              >
                100%
              </span>
            </div>
            <div>
              <p style={{ fontSize: "0.9375rem", color: "#0F172A" }}>
                {modules.length} / {modules.length}
              </p>
              <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                modules with data
              </p>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: "100%", background: "#0F766E" }}
            />
          </div>
        </div>

        {/* Module status — all complete */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#E2E8F0]">
            <span style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
              Module Status
            </span>
          </div>
          <div className="px-5 py-3 space-y-2">
            {modules.map((m) => (
              <div key={m.id} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#0F766E" }}
                >
                  <CheckCircle2 size={10} style={{ color: "#FFF" }} />
                </div>
                <span
                  className="truncate"
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748B",
                    textDecoration: "line-through",
                  }}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Objectives */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
          <p
            style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
            className="uppercase tracking-wider mb-2"
          >
            Objectives
          </p>
          <div className="flex flex-wrap gap-1.5">
            {objectives.map((o) => (
              <span
                key={o.id}
                className="px-2.5 py-1 rounded-lg"
                style={{
                  fontSize: "0.75rem",
                  background: "#7D152D0F",
                  color: "#7D152D",
                }}
              >
                {o.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Phase 3 — Locked Final Report
// =============================================================================

const SECTION_COLORS = [
  "#7D152D",
  "#0F766E",
  "#1D4ED8",
  "#D97706",
  "#7C3AED",
  "#059669",
];

function Phase3Locked({
  event,
  modulesByObjective,
  advModules,
}: {
  event: EventItem;
  modulesByObjective: {
    objectiveId: string;
    label: string;
    modules: DataModule[];
  }[];
  advModules: { id: string; label: string; description: string }[];
}) {
  return (
    <div>
      {/* Locked banner */}
      <div
        className="flex items-center gap-3 px-5 py-3.5 rounded-xl mb-6"
        style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}
      >
        <Lock size={16} style={{ color: "#B91C1C" }} />
        <div>
          <p style={{ fontSize: "0.8125rem", color: "#B91C1C" }}>
            This report is locked and read-only
          </p>
          <p style={{ fontSize: "0.75rem", color: "#64748B" }}>
            Data collection is complete. The report cannot be edited.
          </p>
        </div>
      </div>

      {/* Report document */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div
          className="px-6 py-5 border-b border-[#E2E8F0]"
          style={{
            background: "linear-gradient(135deg, #7D152D 0%, #5C0F21 100%)",
          }}
        >
          <p
            style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.6)" }}
            className="mb-0.5 uppercase tracking-wider"
          >
            Final Event Report
          </p>
          <p style={{ fontSize: "1.125rem", color: "#FFF" }}>{event.name}</p>
          <div className="flex items-center gap-4 mt-2 flex-wrap">
            <span
              className="flex items-center gap-1"
              style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}
            >
              <MapPin size={12} /> {event.location}
            </span>
            <span
              className="flex items-center gap-1"
              style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}
            >
              <CalendarDays size={12} />{" "}
              {new Date(event.date + "T12:00:00").toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span
              className="flex items-center gap-1"
              style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}
            >
              <Clock size={12} /> {event.duration}
            </span>
          </div>
        </div>

        {modulesByObjective.map((group, gi) => (
          <div
            key={group.objectiveId}
            className={
              gi < modulesByObjective.length - 1
                ? "border-b border-[#F1F5F9]"
                : ""
            }
          >
            <div className="px-6 pt-5 pb-2 flex items-center gap-2">
              <div
                className="w-1.5 h-5 rounded-full"
                style={{
                  background: SECTION_COLORS[gi % SECTION_COLORS.length],
                }}
              />
              <span style={{ fontSize: "0.9375rem", color: "#0F172A" }}>
                {group.label}
              </span>
              <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                ({group.modules.length} modules)
              </span>
            </div>

            <div className="px-6 pb-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {group.modules.map((mod) => (
                <LockedModuleCard key={mod.id} mod={mod} />
              ))}
            </div>
          </div>
        ))}

        {advModules.length > 0 && (
          <div className="border-t border-[#F1F5F9]">
            <div className="px-6 pt-5 pb-2 flex items-center gap-2">
              <div
                className="w-1.5 h-5 rounded-full"
                style={{ background: "#D97706" }}
              />
              <span style={{ fontSize: "0.9375rem", color: "#0F172A" }}>
                Advanced Modules
              </span>
              <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                ({advModules.length})
              </span>
            </div>
            <div className="px-6 pb-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {advModules.map((mod) => (
                <div
                  key={mod.id}
                  className="p-3 rounded-lg bg-[#F8FAFC] border border-[#F1F5F9]"
                >
                  <p
                    style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
                    className="mb-1.5"
                  >
                    {mod.label}
                  </p>
                  <p style={{ fontSize: "1rem", color: "#0F172A" }}>
                    Collected
                  </p>
                  <p
                    style={{ fontSize: "0.625rem", color: "#94A3B8" }}
                    className="mt-1"
                  >
                    {mod.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="px-6 py-4 border-t border-[#E2E8F0] bg-[#FAFBFC] flex items-center justify-between">
          <span style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
            Report locked on{" "}
            {new Date(event.date + "T12:00:00").toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
            Hart Agency
          </span>
        </div>
      </div>
    </div>
  );
}

function LockedModuleCard({ mod }: { mod: DataModule }) {
  return (
    <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#F1F5F9]">
      <p
        style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
        className="mb-1.5 truncate"
      >
        {mod.label}
      </p>

      {mod.sampleType === "score" && (
        <div className="flex items-end gap-2">
          <span style={{ fontSize: "1.25rem", color: "#0F172A" }}>
            {mod.sampleValue}
          </span>
          <span style={{ fontSize: "0.625rem", color: "#94A3B8" }}>/10</span>
          <div className="flex-1 flex items-end gap-px ml-1">
            {[0.3, 0.5, 0.7, 0.85, 0.65].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h * 24}px`,
                  background: "#7D152D",
                  opacity: 0.15 + i * 0.15,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {mod.sampleType === "number" && (
        <div className="flex items-end gap-1">
          <span style={{ fontSize: "1.25rem", color: "#0F172A" }}>
            {mod.sampleValue}
          </span>
          <TrendingUp size={14} style={{ color: "#0F766E", marginBottom: 2 }} />
        </div>
      )}

      {mod.sampleType === "percent" && (
        <div>
          <span style={{ fontSize: "1.25rem", color: "#0F172A" }}>
            {mod.sampleValue}
          </span>
          <div className="mt-1.5 h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: mod.sampleValue, background: "#0F766E" }}
            />
          </div>
        </div>
      )}

      {mod.sampleType === "currency" && (
        <div className="flex items-end gap-1">
          <span style={{ fontSize: "1.25rem", color: "#0F172A" }}>
            {mod.sampleValue}
          </span>
          <BarChart3 size={14} style={{ color: "#1D4ED8", marginBottom: 2 }} />
        </div>
      )}

      {mod.sampleType === "text" && (
        <span style={{ fontSize: "1rem", color: "#0F172A" }}>
          {mod.sampleValue}
        </span>
      )}

      {!mod.sampleType && <div className="h-5 w-16 rounded bg-[#E2E8F0]" />}
    </div>
  );
}
