// =============================================================================
// Campaign Detail — shows campaign header + event list, with "Create Event"
// wizard (MM-UI-003). Uses shared CampaignContext for state.
// Polish: event filtering/sorting (Gap #6), count consistency (Gap #7).
// =============================================================================

import { useState, useMemo } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  CalendarDays,
  Megaphone,
  Plus,
  MapPin,
  Clock,
  Building2,
  Target,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { useCampaignContext } from "./campaign-context";
import { EventWizard } from "./event-wizard";
import { OBJECTIVES, type EventItem } from "./event-data";

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

const EVENT_STATUS_FILTERS: (EventItem["status"] | "all")[] = [
  "all",
  "draft",
  "scheduled",
  "active",
  "completed",
];

type SortDir = "asc" | "desc";

export function CampaignDetail() {
  const { id } = useParams<{ id: string }>();
  const { getCampaign, getEventsForCampaign } = useCampaignContext();
  const [wizardOpen, setWizardOpen] = useState(false);

  // Gap #6: filtering and sorting state
  const [statusFilter, setStatusFilter] = useState<EventItem["status"] | "all">(
    "all",
  );
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const campaign = getCampaign(id ?? "");
  const allEvents = getEventsForCampaign(id ?? "");

  // Filtered + sorted events
  const events = useMemo(() => {
    let result = allEvents;
    if (statusFilter !== "all") {
      result = result.filter((e) => e.status === statusFilter);
    }
    result = [...result].sort((a, b) => {
      const cmp = a.date.localeCompare(b.date);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [allEvents, statusFilter, sortDir]);

  if (!campaign) {
    return (
      <div className="p-6 font-[Inter]">
        <Link
          to="/staff/campaigns"
          className="inline-flex items-center gap-1.5 mb-6 no-underline transition-colors"
          style={{ fontSize: "0.875rem", color: "#7D152D" }}
        >
          <ArrowLeft size={15} />
          Back to Campaigns
        </Link>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
            style={{ background: "#7D152D0F" }}
          >
            <Megaphone size={26} style={{ color: "#7D152D" }} />
          </div>
          <p style={{ fontSize: "1rem", color: "#0F172A" }} className="mb-1">
            Campaign not found
          </p>
          <p style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
            The campaign you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const campStatus = STATUS_LABELS[campaign.status] ?? STATUS_LABELS["draft"];

  // Event stats (from all events, not filtered)
  const draftEvents = allEvents.filter((e) => e.status === "draft").length;
  const scheduledEvents = allEvents.filter(
    (e) => e.status === "scheduled",
  ).length;
  const activeEvents = allEvents.filter((e) => e.status === "active").length;
  const completedEvents = allEvents.filter(
    (e) => e.status === "completed",
  ).length;

  // Gap #7: Use campaign.eventCount for total, actual array for detail
  const totalEventCount = Math.max(campaign.eventCount, allEvents.length);
  const showingSubset = allEvents.length < totalEventCount;

  return (
    <div className="p-6 font-[Inter]">
      {/* Back link */}
      <Link
        to="/staff/campaigns"
        className="inline-flex items-center gap-1.5 mb-6 no-underline hover:opacity-80 transition-opacity"
        style={{ fontSize: "0.875rem", color: "#7D152D" }}
      >
        <ArrowLeft size={15} />
        Back to Campaigns
      </Link>

      {/* ---------------------------------------------------------------- */}
      {/* Campaign header card                                             */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 style={{ fontSize: "1.25rem", color: "#0F172A" }}>
                {campaign.name}
              </h2>
              <span
                className="px-2.5 py-0.5 rounded-md"
                style={{
                  fontSize: "0.6875rem",
                  background: campStatus!.bg,
                  color: campStatus!.text,
                }}
              >
                {campStatus!.label}
              </span>
            </div>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "#64748B",
                lineHeight: 1.6,
              }}
              className="mb-4"
            >
              {campaign.description || "No description provided."}
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <CalendarDays size={14} style={{ color: "#0F766E" }} />
                {/* Gap #7: Show totalEventCount consistently */}
                <span style={{ fontSize: "0.875rem", color: "#0F172A" }}>
                  {totalEventCount} {totalEventCount === 1 ? "event" : "events"}
                </span>
              </div>
              <span style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
                Created{" "}
                {new Date(campaign.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Create Event CTA */}
          <Button
            onClick={() => setWizardOpen(true)}
            className="inline-flex items-center gap-2 px-4 h-11 rounded-lg text-white transition-opacity hover:opacity-90 flex-shrink-0 cursor-pointer"
            style={{ background: "#7D152D", fontSize: "0.875rem" }}
          >
            <Plus size={16} strokeWidth={2.5} />
            Create Event
          </Button>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Event stats row                                                  */}
      {/* ---------------------------------------------------------------- */}
      {allEvents.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            {
              label: "Draft",
              count: draftEvents,
              color: "#64748B",
              key: "draft" as const,
            },
            {
              label: "Scheduled",
              count: scheduledEvents,
              color: "#1D4ED8",
              key: "scheduled" as const,
            },
            {
              label: "Active",
              count: activeEvents,
              color: "#0F766E",
              key: "active" as const,
            },
            {
              label: "Completed",
              count: completedEvents,
              color: "#B91C1C",
              key: "completed" as const,
            },
          ].map((s) => (
            <Button
              key={s.label}
              variant="ghost"
              onClick={() =>
                setStatusFilter(statusFilter === s.key ? "all" : s.key)
              }
              className={`bg-white rounded-xl border px-4 py-3 text-left transition-all hover:shadow-sm cursor-pointer h-auto flex flex-col items-start ${
                statusFilter === s.key
                  ? "border-[#7D152D] ring-1 ring-[#7D152D]/20 hover:bg-white"
                  : "border-[#E2E8F0] hover:bg-accent/50"
              }`}
            >
              <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>{s.label}</p>
              <p
                style={{ fontSize: "1.25rem", color: s.color }}
                className="mt-0.5"
              >
                {s.count}
              </p>
            </Button>
          ))}
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Events list                                                      */}
      {/* ---------------------------------------------------------------- */}
      {allEvents.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 flex flex-col items-center justify-center text-center min-h-[280px]">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ background: "#0F766E0F" }}
          >
            <CalendarDays size={22} style={{ color: "#0F766E" }} />
          </div>
          <p style={{ fontSize: "1rem", color: "#0F172A" }} className="mb-1">
            No events yet
          </p>
          <p
            style={{ fontSize: "0.875rem", color: "#94A3B8" }}
            className="mb-4"
          >
            Create your first event using the guided wizard.
          </p>
          <Button
            onClick={() => setWizardOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-white transition-opacity hover:opacity-90 cursor-pointer h-auto"
            style={{ background: "#7D152D", fontSize: "0.875rem" }}
          >
            <Plus size={16} strokeWidth={2.5} />
            Create Event
          </Button>
        </div>
      ) : (
        <>
          {/* Gap #6: Filter pills + sort toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-1.5">
              {EVENT_STATUS_FILTERS.map((f) => {
                const isActive = statusFilter === f;
                const label =
                  f === "all" ? "All" : (STATUS_LABELS[f]?.label ?? f);
                return (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStatusFilter(f)}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer h-auto ${
                      isActive
                        ? "text-white hover:bg-[#7D152D] hover:text-white"
                        : "text-[#64748B] bg-[#F1F5F9] hover:bg-[#E2E8F0]"
                    }`}
                    style={
                      isActive
                        ? { background: "#7D152D", fontSize: "0.8125rem" }
                        : { fontSize: "0.8125rem" }
                    }
                  >
                    {label}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="ghost"
              onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#64748B] bg-[#F1F5F9] hover:bg-[#E2E8F0] transition-colors cursor-pointer h-auto"
              style={{ fontSize: "0.8125rem" }}
            >
              {sortDir === "desc" ? (
                <ArrowDown size={13} />
              ) : (
                <ArrowUp size={13} />
              )}
              Date {sortDir === "desc" ? "newest" : "oldest"}
            </Button>
          </div>

          {/* Event cards */}
          {events.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 flex flex-col items-center justify-center text-center">
              <p
                style={{ fontSize: "0.9375rem", color: "#0F172A" }}
                className="mb-1"
              >
                No {statusFilter} events
              </p>
              <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
                Try adjusting the filter to see more events.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}

          {/* Gap #7: "Showing X of Y" when mock data is a subset */}
          {showingSubset && statusFilter === "all" && (
            <div className="mt-4 text-center">
              <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
                Showing {allEvents.length} of {totalEventCount} events
              </p>
            </div>
          )}
        </>
      )}

      {/* Event Creation Wizard */}
      <EventWizard
        campaignId={campaign.id}
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onCreated={() => setWizardOpen(false)}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Event card row
// ---------------------------------------------------------------------------

function EventCard({ event }: { event: EventItem }) {
  const status = STATUS_LABELS[event.status] ?? STATUS_LABELS["draft"];
  const objectiveLabels = OBJECTIVES.filter((o) =>
    event.objectives.includes(o.id),
  ).map((o) => o.label);

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 transition-shadow hover:shadow-sm group cursor-pointer">
      {/* Left — icon */}
      <div
        className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
        style={{ background: "#0F766E0F" }}
      >
        <CalendarDays size={18} style={{ color: "#0F766E" }} />
      </div>

      {/* Middle — details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p
            className="truncate group-hover:text-[#7D152D] transition-colors"
            style={{ fontSize: "0.9375rem", color: "#0F172A" }}
          >
            {event.name}
          </p>
          <span
            className="flex items-center gap-1 flex-shrink-0 px-2 py-0.5 rounded-md"
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
          </span>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="flex items-center gap-1"
            style={{ fontSize: "0.75rem", color: "#94A3B8" }}
          >
            <MapPin size={12} />
            <span className="truncate max-w-[200px]">{event.location}</span>
          </span>
          <span
            className="flex items-center gap-1"
            style={{ fontSize: "0.75rem", color: "#94A3B8" }}
          >
            <CalendarDays size={12} />
            {new Date(event.date + "T12:00:00").toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
          <span
            className="flex items-center gap-1"
            style={{ fontSize: "0.75rem", color: "#94A3B8" }}
          >
            <Clock size={12} />
            {event.duration}
          </span>
          <span
            className="flex items-center gap-1"
            style={{ fontSize: "0.75rem", color: "#94A3B8" }}
          >
            <Building2 size={12} />
            {VENUE_LABELS[event.venueType] || event.venueType}
          </span>
        </div>

        {/* Objectives pills */}
        {objectiveLabels.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <Target size={12} style={{ color: "#94A3B8" }} />
            {objectiveLabels.map((label) => (
              <span
                key={label}
                className="px-2 py-0.5 rounded-md"
                style={{
                  fontSize: "0.6875rem",
                  background: "#7D152D0A",
                  color: "#7D152D",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right — data module count + chevron */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-right hidden sm:block">
          <p style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
            {event.dataModules.length + event.advancedModules.length}
          </p>
          <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>modules</p>
        </div>
        <ChevronRight size={16} style={{ color: "#CBD5E1" }} />
      </div>
    </div>
  );
}
