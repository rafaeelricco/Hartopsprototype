// =============================================================================
// Campaign Detail — shows campaign header + activities + event list.
// Hierarchy: Campaign → Activity → Event (MM-UI-003).
// =============================================================================
import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router";
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
  Truck,
  Package,
  Globe,
  BarChart2,
  Radio,
  Layers,
  X,
} from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { useCampaignContext } from "./campaign-context";
import { OBJECTIVES, type EventItem } from "./event-data";
import { MOCK_PRODUCTS, CHANNEL_OPTIONS } from "./campaign-data";
import { Input } from "@/app/shared/components/ui/input";

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
  const navigate = useNavigate();
  const {
    getCampaign,
    getEventsForCampaign,
    getActivitiesForCampaign,
    getEventsForActivity,
    createActivity,
  } = useCampaignContext();

  // Gap #6: filtering and sorting state
  const [statusFilter, setStatusFilter] = useState<EventItem["status"] | "all">(
    "all",
  );
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [showCreateActivity, setShowCreateActivity] = useState(false);

  const campaign = getCampaign(id ?? "");
  const allEvents = getEventsForCampaign(id ?? "");
  const campaignActivities = getActivitiesForCampaign(id ?? "");

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
          <div className="flex-shrink-0">
            <Button
              onClick={() => navigate(`/staff/events/create?campaign=${id}`)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-white transition-opacity hover:opacity-90 cursor-pointer h-auto w-full sm:w-auto"
              style={{ background: "#7D152D", fontSize: "0.875rem" }}
            >
              <Plus size={16} strokeWidth={2.5} />
              Create Event
            </Button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Campaign Context panel  (only when fields are present)          */}
      {/* ---------------------------------------------------------------- */}
      {(campaign.supplier ||
        (campaign.distributors?.length ?? 0) > 0 ||
        (campaign.targetMarkets?.length ?? 0) > 0 ||
        (campaign.channels?.length ?? 0) > 0 ||
        campaign.anticipatedEventCount != null ||
        (campaign.objectives?.length ?? 0) > 0 ||
        (campaign.linkedProductIds?.length ?? 0) > 0) && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 mb-6">
          <h3
            className="mb-4"
            style={{
              fontSize: "0.8125rem",
              color: "#94A3B8",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Campaign Context
          </h3>
          <div className="flex flex-col gap-3">
            {/* Supplier */}
            {campaign.supplier && (
              <div className="flex items-start gap-3">
                <Truck
                  size={14}
                  className="mt-1.5 flex-shrink-0"
                  style={{ color: "#94A3B8" }}
                />
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                    Supplier
                  </span>
                  <p style={{ fontSize: "0.875rem", color: "#0F172A" }}>
                    {campaign.supplier}
                  </p>
                </div>
              </div>
            )}

            {/* Distributors */}
            {(campaign.distributors?.length ?? 0) > 0 && (
              <div className="flex items-start gap-3">
                <Package
                  size={14}
                  className="mt-1.5 flex-shrink-0"
                  style={{ color: "#94A3B8" }}
                />
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                    Distributors
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {campaign.distributors!.map((d) => (
                      <span
                        key={d}
                        className="px-2.5 py-0.5 rounded-full"
                        style={{
                          fontSize: "0.75rem",
                          background: "#F1F5F9",
                          color: "#475569",
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Target Markets */}
            {(campaign.targetMarkets?.length ?? 0) > 0 && (
              <div className="flex items-start gap-3">
                <Globe
                  size={14}
                  className="mt-1.5 flex-shrink-0"
                  style={{ color: "#94A3B8" }}
                />
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                    Target Markets
                  </span>
                  <p style={{ fontSize: "0.875rem", color: "#0F172A" }}>
                    {campaign.targetMarkets!.join(" · ")}
                  </p>
                </div>
              </div>
            )}

            {/* Channels */}
            {(campaign.channels?.length ?? 0) > 0 && (
              <div className="flex items-start gap-3">
                <Radio
                  size={14}
                  className="mt-1.5 flex-shrink-0"
                  style={{ color: "#94A3B8" }}
                />
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                    Channels
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {CHANNEL_OPTIONS.filter((ch) =>
                      campaign.channels!.includes(ch.value),
                    ).map((ch) => (
                      <span
                        key={ch.value}
                        className="px-2.5 py-0.5 rounded-full"
                        style={{
                          fontSize: "0.75rem",
                          background: "#F1F5F9",
                          color: "#475569",
                        }}
                      >
                        {ch.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Anticipated Event Count */}
            {campaign.anticipatedEventCount != null && (
              <div className="flex items-start gap-3">
                <BarChart2
                  size={14}
                  className="mt-1.5 flex-shrink-0"
                  style={{ color: "#94A3B8" }}
                />
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                    Anticipated Events
                  </span>
                  <p style={{ fontSize: "0.875rem", color: "#0F172A" }}>
                    {campaign.anticipatedEventCount} planned ·{" "}
                    {allEvents.length} created so far
                  </p>
                </div>
              </div>
            )}

            {/* Objectives */}
            {(campaign.objectives?.length ?? 0) > 0 && (
              <div className="flex items-start gap-3">
                <Target
                  size={14}
                  className="mt-1.5 flex-shrink-0"
                  style={{ color: "#94A3B8" }}
                />
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                    Objectives
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {OBJECTIVES.filter((o) =>
                      campaign.objectives!.includes(o.id),
                    ).map((o) => (
                      <span
                        key={o.id}
                        className="px-2.5 py-0.5 rounded-md"
                        style={{
                          fontSize: "0.75rem",
                          background: "#7D152D0A",
                          color: "#7D152D",
                        }}
                      >
                        {o.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Linked Products */}
            {(campaign.linkedProductIds?.length ?? 0) > 0 && (
              <div className="flex items-start gap-3">
                <Package
                  size={14}
                  className="mt-1.5 flex-shrink-0"
                  style={{ color: "#94A3B8" }}
                />
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                    Linked Products
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {MOCK_PRODUCTS.filter((p) =>
                      campaign.linkedProductIds!.includes(p.id),
                    ).map((p) => (
                      <span
                        key={p.id}
                        className="px-2.5 py-0.5 rounded-md"
                        style={{
                          fontSize: "0.75rem",
                          background: "#F1F5F9",
                          color: "#475569",
                        }}
                      >
                        {p.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Activities Section                                                */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers size={16} style={{ color: "#7D152D" }} />
            <h3 style={{ fontSize: "1rem", color: "#0F172A" }}>Activities</h3>
            <span
              className="px-2 py-0.5 rounded-md"
              style={{
                fontSize: "0.6875rem",
                background: "#F1F5F9",
                color: "#64748B",
              }}
            >
              {campaignActivities.length}
            </span>
          </div>
          <Button
            variant="ghost"
            onClick={() => setShowCreateActivity((p) => !p)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#7D152D] hover:bg-[#7D152D]/5 transition-colors cursor-pointer h-auto"
            style={{ fontSize: "0.8125rem" }}
          >
            {showCreateActivity ? <X size={14} /> : <Plus size={14} />}
            {showCreateActivity ? "Cancel" : "Create Activity"}
          </Button>
        </div>

        {showCreateActivity && (
          <CreateActivityForm
            campaignId={id!}
            campaignChannels={campaign.channels ?? []}
            campaignProductIds={campaign.linkedProductIds ?? []}
            onCreate={(data) => {
              createActivity(data);
              setShowCreateActivity(false);
            }}
          />
        )}

        {campaignActivities.length === 0 && !showCreateActivity ? (
          <div className="text-center py-6">
            <p
              style={{ fontSize: "0.875rem", color: "#94A3B8" }}
              className="mb-1"
            >
              No activities yet
            </p>
            <p style={{ fontSize: "0.8125rem", color: "#CBD5E1" }}>
              Activities let you template event types with specific product
              subsets.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {campaignActivities.map((activity) => {
              const actEvents = getEventsForActivity(activity.id);
              const actProducts = MOCK_PRODUCTS.filter((p) =>
                activity.linkedProductIds?.includes(p.id),
              );
              const actChannels = CHANNEL_OPTIONS.filter((ch) =>
                activity.channels?.includes(ch.value),
              );
              return (
                <div
                  key={activity.id}
                  className="rounded-lg border border-[#E2E8F0] p-4 transition-shadow hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p
                        className="truncate mb-1"
                        style={{ fontSize: "0.9375rem", color: "#0F172A" }}
                      >
                        {activity.name}
                      </p>
                      {activity.description && (
                        <p
                          className="line-clamp-2 mb-2"
                          style={{
                            fontSize: "0.8125rem",
                            color: "#94A3B8",
                            lineHeight: 1.4,
                          }}
                        >
                          {activity.description}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-2">
                        {actChannels.map((ch) => (
                          <span
                            key={ch.value}
                            className="px-2 py-0.5 rounded-md"
                            style={{
                              fontSize: "0.6875rem",
                              background: "#EFF6FF",
                              color: "#1D4ED8",
                            }}
                          >
                            {ch.label}
                          </span>
                        ))}
                        {actProducts.map((p) => (
                          <span
                            key={p.id}
                            className="px-2 py-0.5 rounded-md"
                            style={{
                              fontSize: "0.6875rem",
                              background: "#F1F5F9",
                              color: "#475569",
                            }}
                          >
                            {p.name}
                          </span>
                        ))}
                        <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                          · {actEvents.length} event
                          {actEvents.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        navigate(
                          `/staff/events/create?campaign=${id}&activity=${activity.id}`,
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white hover:opacity-90 transition-opacity cursor-pointer h-auto flex-shrink-0"
                      style={{ background: "#7D152D", fontSize: "0.8125rem" }}
                    >
                      <Plus size={13} />
                      Event
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

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
            onClick={() => navigate(`/staff/events/create?campaign=${id}`)}
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
    </div>
  );
}

// ---------------------------------------------------------------------------
// Event card row
// ---------------------------------------------------------------------------

function EventCard({ event }: { event: EventItem }) {
  const navigate = useNavigate();
  const status = STATUS_LABELS[event.status] ?? STATUS_LABELS["draft"];
  const objectiveLabels = OBJECTIVES.filter((o) =>
    event.objectives.includes(o.id),
  ).map((o) => o.label);

  return (
    <div
      onClick={() => navigate(`/staff/events/${event.id}`)}
      className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 transition-shadow hover:shadow-sm group cursor-pointer"
    >
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

// ---------------------------------------------------------------------------
// Inline Create Activity Form
// ---------------------------------------------------------------------------

import type { Activity } from "./activity-data";

function CreateActivityForm({
  campaignId,
  campaignChannels,
  campaignProductIds,
  onCreate,
}: {
  campaignId: string;
  campaignChannels: string[];
  campaignProductIds: string[];
  onCreate: (data: Omit<Activity, "id" | "createdAt">) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [nameError, setNameError] = useState<string | null>(null);

  const availableChannels = CHANNEL_OPTIONS.filter((ch) =>
    campaignChannels.includes(ch.value),
  );
  const availableProducts = MOCK_PRODUCTS.filter((p) =>
    campaignProductIds.includes(p.id),
  );

  function handleSubmit() {
    if (!name.trim()) {
      setNameError("Activity name is required.");
      return;
    }
    onCreate({
      campaignId,
      name: name.trim(),
      description: description.trim() || undefined,
      channels: selectedChannels.length ? selectedChannels : undefined,
      linkedProductIds: selectedProducts.length ? selectedProducts : undefined,
    });
  }

  return (
    <div
      className="rounded-lg border border-[#7D152D]/20 p-4 mb-4"
      style={{ background: "#FEFBFC" }}
    >
      <p
        style={{ fontSize: "0.875rem", color: "#0F172A", fontWeight: 500 }}
        className="mb-3"
      >
        New Activity
      </p>

      {/* Name */}
      <div className="mb-3">
        <label
          htmlFor="activity-name"
          className="block mb-1"
          style={{ fontSize: "0.8125rem", color: "#64748B" }}
        >
          Name <span style={{ color: "#EF4444" }}>*</span>
        </label>
        <Input
          id="activity-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (nameError) setNameError(null);
          }}
          placeholder="e.g. Smirnoff Flavors On-Premise"
          className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 h-auto shadow-none ${
            nameError ? "border-[#EF4444]" : "border-[#E2E8F0]"
          }`}
          style={{ fontSize: "0.875rem", background: "#FFF" }}
          maxLength={120}
        />
        {nameError && (
          <p className="mt-1" style={{ fontSize: "0.75rem", color: "#EF4444" }}>
            {nameError}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="mb-3">
        <label
          htmlFor="activity-desc"
          className="block mb-1"
          style={{ fontSize: "0.8125rem", color: "#64748B" }}
        >
          Description
        </label>
        <Input
          id="activity-desc"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description..."
          className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 h-auto shadow-none"
          style={{ fontSize: "0.875rem", background: "#FFF" }}
          maxLength={300}
        />
      </div>

      {/* Channel subset */}
      {availableChannels.length > 0 && (
        <div className="mb-3">
          <p
            className="mb-1.5"
            style={{ fontSize: "0.8125rem", color: "#64748B" }}
          >
            Channels{" "}
            <span style={{ color: "#CBD5E1", fontSize: "0.75rem" }}>
              (subset of campaign)
            </span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {availableChannels.map((ch) => {
              const active = selectedChannels.includes(ch.value);
              return (
                <button
                  key={ch.value}
                  type="button"
                  onClick={() =>
                    setSelectedChannels((prev) =>
                      active
                        ? prev.filter((c) => c !== ch.value)
                        : [...prev, ch.value],
                    )
                  }
                  className="px-2.5 py-1 rounded-lg border transition-colors cursor-pointer"
                  style={
                    active
                      ? {
                          background: "#1D4ED8",
                          borderColor: "#1D4ED8",
                          color: "#fff",
                          fontSize: "0.75rem",
                        }
                      : {
                          background: "#F8FAFC",
                          borderColor: "#E2E8F0",
                          color: "#64748B",
                          fontSize: "0.75rem",
                        }
                  }
                >
                  {ch.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Product subset */}
      {availableProducts.length > 0 && (
        <div className="mb-4">
          <p
            className="mb-1.5"
            style={{ fontSize: "0.8125rem", color: "#64748B" }}
          >
            Products{" "}
            <span style={{ color: "#CBD5E1", fontSize: "0.75rem" }}>
              (subset of campaign)
            </span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {availableProducts.map((p) => {
              const active = selectedProducts.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() =>
                    setSelectedProducts((prev) =>
                      active ? prev.filter((x) => x !== p.id) : [...prev, p.id],
                    )
                  }
                  className="px-2.5 py-1 rounded-lg border transition-colors cursor-pointer"
                  style={
                    active
                      ? {
                          background: "#475569",
                          borderColor: "#475569",
                          color: "#fff",
                          fontSize: "0.75rem",
                        }
                      : {
                          background: "#F8FAFC",
                          borderColor: "#E2E8F0",
                          color: "#64748B",
                          fontSize: "0.75rem",
                        }
                  }
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <Button
        onClick={handleSubmit}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 cursor-pointer h-auto"
        style={{ background: "#7D152D", fontSize: "0.8125rem" }}
      >
        Create Activity
      </Button>
    </div>
  );
}
