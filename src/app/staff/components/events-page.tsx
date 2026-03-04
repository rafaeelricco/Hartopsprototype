// =============================================================================
// Event Monitoring — MM-UI-004
// Dual-view events page: List View (tabular, default) + Calendar View toggle.
// Supports filtering by status, campaign, search, and sorting by date.
// =============================================================================

import { useState, useMemo } from "react";
import { Link } from "react-router";
import { PageHeader } from "../../shared/components/layouts/page-header";
import {
  List,
  CalendarDays,
  Search,
  MapPin,
  ChevronRight,
  ChevronLeft,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { useCampaignContext } from "./campaign-context";
import { type EventItem } from "./event-data";

// ── Constants ────────────────────────────────────────────────────────────────

const STATUS_META: Record<
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

const PHASE_META: Record<string, { label: string; color: string; bg: string }> =
  {
    draft: { label: "Editable", color: "#64748B", bg: "#F1F5F9" },
    scheduled: { label: "Editable", color: "#1D4ED8", bg: "#EFF6FF" },
    active: { label: "Live Feed", color: "#0F766E", bg: "#ECFDF5" },
    completed: { label: "Locked", color: "#B91C1C", bg: "#FEF2F2" },
  };

const STATUS_FILTERS: (EventItem["status"] | "all")[] = [
  "all",
  "draft",
  "scheduled",
  "active",
  "completed",
];

type SortDir = "asc" | "desc";
type ViewMode = "list" | "calendar";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Extract short city/state from a location string, e.g. "Chicago IL" */
function shortGeo(location: string): string {
  const parts = location.split(",");
  if (parts.length >= 2) {
    return parts[parts.length - 1]?.trim() ?? location;
  }
  return location.length > 16 ? location.slice(0, 14) + "…" : location;
}

// ── Main component ───────────────────────────────────────────────────────────

export function EventsPage() {
  const { events, campaigns, getCampaign } = useCampaignContext();

  const [view, setView] = useState<ViewMode>("list");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<EventItem["status"] | "all">(
    "all",
  );
  const [campaignFilter, setCampaignFilter] = useState<string>("all");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Calendar state
  const [calMonth, setCalMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  // Unique campaigns that have events
  const campaignsWithEvents = useMemo(() => {
    const ids = new Set(events.map((e) => e.campaignId));
    return campaigns.filter((c) => ids.has(c.id));
  }, [events, campaigns]);

  // Filtered events
  const filtered = useMemo(() => {
    let result = events;
    if (statusFilter !== "all") {
      result = result.filter((e) => e.status === statusFilter);
    }
    if (campaignFilter !== "all") {
      result = result.filter((e) => e.campaignId === campaignFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q),
      );
    }
    return result;
  }, [events, statusFilter, campaignFilter, search]);

  // Sorted list (for list view)
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const cmp = a.date.localeCompare(b.date);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortDir]);

  // Events indexed by date (for calendar view)
  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const e of filtered) {
      const arr = map.get(e.date) ?? [];
      arr.push(e);
      map.set(e.date, arr);
    }
    return map;
  }, [filtered]);

  const totalCount = events.length;
  const filteredCount = filtered.length;

  return (
    <div className="p-6 font-[Inter]">
      {/* Header */}
      <PageHeader
        title="Events"
        subtitle="Monitor and manage events across all campaigns."
        actions={
          <div className="flex items-center bg-[#F1F5F9] rounded-lg p-1">
            <button
              onClick={() => setView("list")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md transition-all ${
                view === "list"
                  ? "bg-white text-[#0F172A] shadow-sm"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
              style={{ fontSize: "0.8125rem" }}
            >
              <List size={15} />
              List
            </button>
            <button
              onClick={() => setView("calendar")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md transition-all ${
                view === "calendar"
                  ? "bg-white text-[#0F172A] shadow-sm"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
              style={{ fontSize: "0.8125rem" }}
            >
              <CalendarDays size={15} />
              Calendar
            </button>
          </div>
        }
      />

      {/* Stat summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {(
          [
            {
              key: "draft" as const,
              label: "Draft / Editable",
              color: "#64748B",
            },
            { key: "scheduled" as const, label: "Scheduled", color: "#1D4ED8" },
            {
              key: "active" as const,
              label: "Active / Live",
              color: "#0F766E",
            },
            {
              key: "completed" as const,
              label: "Completed / Locked",
              color: "#B91C1C",
            },
          ] as const
        ).map((s) => {
          const count = events.filter((e) => e.status === s.key).length;
          return (
            <button
              key={s.key}
              onClick={() =>
                setStatusFilter(statusFilter === s.key ? "all" : s.key)
              }
              className={`bg-white rounded-xl border px-4 py-3 text-left transition-all hover:shadow-sm ${
                statusFilter === s.key
                  ? "border-[#7D152D] ring-1 ring-[#7D152D]/20"
                  : "border-[#E2E8F0]"
              }`}
            >
              <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>{s.label}</p>
              <p
                style={{ fontSize: "1.25rem", color: s.color }}
                className="mt-0.5"
              >
                {count}
              </p>
            </button>
          );
        })}
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#E2E8F0] bg-white focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 transition-colors"
            style={{ fontSize: "0.875rem" }}
          />
        </div>

        {/* Status filter pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {STATUS_FILTERS.map((f) => {
            const isActive = statusFilter === f;
            const label = f === "all" ? "All" : (STATUS_META[f]?.label ?? f);
            return (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-[#64748B] bg-[#F1F5F9] hover:bg-[#E2E8F0]"
                }`}
                style={
                  isActive
                    ? { background: "#7D152D", fontSize: "0.8125rem" }
                    : { fontSize: "0.8125rem" }
                }
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Campaign filter */}
        <div className="relative">
          <select
            value={campaignFilter}
            onChange={(e) => setCampaignFilter(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-2.5 rounded-lg border border-[#E2E8F0] bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 transition-colors"
            style={{ fontSize: "0.8125rem", color: "#0F172A" }}
          >
            <option value="all">All Campaigns</option>
            {campaignsWithEvents.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <Filter
            size={13}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#94A3B8]"
          />
        </div>

        {/* Sort (list view only) */}
        {view === "list" && (
          <button
            onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-[#64748B] bg-[#F1F5F9] hover:bg-[#E2E8F0] transition-colors flex-shrink-0"
            style={{ fontSize: "0.8125rem" }}
          >
            <ArrowUpDown size={13} />
            Date {sortDir === "desc" ? "newest" : "oldest"}
          </button>
        )}
      </div>

      {/* Result count */}
      {filteredCount !== totalCount && (
        <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }} className="mb-3">
          Showing {filteredCount} of {totalCount} events
        </p>
      )}

      {/* ── View content ─────────────────────────────────────────────── */}
      {view === "list" ? (
        <EventTableView events={sorted} getCampaign={getCampaign} />
      ) : (
        <EventCalendarView
          eventsByDate={eventsByDate}
          calMonth={calMonth}
          setCalMonth={setCalMonth}
        />
      )}
    </div>
  );
}

// =============================================================================
// Tabular List View
// =============================================================================

function EventTableView({
  events,
  getCampaign,
}: {
  events: EventItem[];
  getCampaign: (id: string) => { name: string } | undefined;
}) {
  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 flex flex-col items-center text-center">
        <CalendarDays size={28} style={{ color: "#94A3B8" }} className="mb-3" />
        <p style={{ fontSize: "0.9375rem", color: "#0F172A" }} className="mb-1">
          No events match your filters
        </p>
        <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
          Try adjusting the status or campaign filter.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
      <div className="overflow-x-auto">
        <table
          className="w-full min-w-[780px]"
          style={{ borderCollapse: "separate", borderSpacing: 0 }}
        >
          <thead>
            <tr className="border-b border-[#E2E8F0]">
              {[
                "Event Name",
                "Campaign",
                "Location",
                "Date",
                "Status",
                "Phase",
                "Modules",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left"
                  style={{
                    fontSize: "0.6875rem",
                    color: "#94A3B8",
                    letterSpacing: "0.04em",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              const st = STATUS_META[event.status] ?? STATUS_META["draft"];
              const ph = PHASE_META[event.status] ?? PHASE_META["draft"];
              const campaign = getCampaign(event.campaignId);
              return (
                <tr
                  key={event.id}
                  className="border-b border-[#F8FAFC] last:border-0 group hover:bg-[#FAFBFC] transition-colors"
                >
                  {/* Name */}
                  <td className="px-4 py-3.5">
                    <Link
                      to={`/events/${event.id}`}
                      className="no-underline group-hover:text-[#7D152D] transition-colors truncate block max-w-[220px]"
                      style={{ fontSize: "0.8125rem", color: "#0F172A" }}
                      title={event.name}
                    >
                      {event.name}
                    </Link>
                  </td>
                  {/* Campaign */}
                  <td className="px-4 py-3.5">
                    {campaign ? (
                      <span
                        className="truncate block max-w-[140px]"
                        style={{ fontSize: "0.75rem", color: "#7D152D" }}
                        title={campaign.name}
                      >
                        {campaign.name}
                      </span>
                    ) : (
                      <span style={{ fontSize: "0.75rem", color: "#CBD5E1" }}>
                        —
                      </span>
                    )}
                  </td>
                  {/* Location */}
                  <td className="px-4 py-3.5">
                    <span
                      className="flex items-center gap-1 truncate max-w-[180px]"
                      style={{ fontSize: "0.75rem", color: "#64748B" }}
                      title={event.location}
                    >
                      <MapPin
                        size={11}
                        className="flex-shrink-0"
                        style={{ color: "#94A3B8" }}
                      />
                      {event.location}
                    </span>
                  </td>
                  {/* Date */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span style={{ fontSize: "0.75rem", color: "#64748B" }}>
                      {new Date(event.date + "T12:00:00").toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md whitespace-nowrap"
                      style={{
                        fontSize: "0.6875rem",
                        background: st!.bg,
                        color: st!.text,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
                        style={{ background: st!.dot }}
                      />
                      {st!.label}
                    </span>
                  </td>
                  {/* Phase */}
                  <td className="px-4 py-3.5">
                    <span
                      className="inline-block px-2 py-0.5 rounded-md whitespace-nowrap"
                      style={{
                        fontSize: "0.6875rem",
                        background: ph!.bg,
                        color: ph!.color,
                      }}
                    >
                      {ph!.label}
                    </span>
                  </td>
                  {/* Modules */}
                  <td className="px-4 py-3.5 text-center">
                    <span style={{ fontSize: "0.75rem", color: "#0F172A" }}>
                      {event.dataModules.length + event.advancedModules.length}
                    </span>
                  </td>
                  {/* Arrow */}
                  <td className="px-3 py-3.5">
                    <Link to={`/events/${event.id}`} className="no-underline">
                      <ChevronRight size={15} style={{ color: "#CBD5E1" }} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =============================================================================
// Calendar View  (with geo hints + Today button)
// =============================================================================

function EventCalendarView({
  eventsByDate,
  calMonth,
  setCalMonth,
}: {
  eventsByDate: Map<string, EventItem[]>;
  calMonth: { year: number; month: number };
  setCalMonth: React.Dispatch<
    React.SetStateAction<{ year: number; month: number }>
  >;
}) {
  const { year, month } = calMonth;

  // Build calendar grid
  const firstDay = new Date(year, month, 1);
  const startDow = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const monthLabel = firstDay.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function goMonth(delta: number) {
    setCalMonth((prev) => {
      let m = prev.month + delta;
      let y = prev.year;
      if (m < 0) {
        m = 11;
        y--;
      }
      if (m > 11) {
        m = 0;
        y++;
      }
      return { year: y, month: m };
    });
  }

  function goToday() {
    const now = new Date();
    setCalMonth({ year: now.getFullYear(), month: now.getMonth() });
  }

  function dateStr(day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
      {/* Month header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => goMonth(-1)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => goMonth(1)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] transition-colors"
          >
            <ChevronRight size={18} />
          </button>
          <span style={{ fontSize: "1rem", color: "#0F172A" }} className="ml-1">
            {monthLabel}
          </span>
        </div>
        {!isCurrentMonth && (
          <button
            onClick={goToday}
            className="px-3 py-1.5 rounded-lg text-[#7D152D] bg-[#7D152D0A] hover:bg-[#7D152D14] transition-colors"
            style={{ fontSize: "0.75rem" }}
          >
            Today
          </button>
        )}
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-[#F1F5F9]">
        {DAYS.map((d, i) => {
          const isWeekend = i === 0 || i === 6;
          return (
            <div
              key={d}
              className="py-2.5 text-center"
              style={{
                fontSize: "0.75rem",
                color: isWeekend ? "#7D152D" : "#94A3B8",
                background: isWeekend ? "#7D152D06" : "transparent",
              }}
            >
              {d}
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (day === null) {
            const isWeekend = idx % 7 === 0 || idx % 7 === 6;
            return (
              <div
                key={`empty-${idx}`}
                className="min-h-[100px] border-b border-r border-[#F8FAFC]"
                style={{ background: isWeekend ? "#FAFBFC" : "transparent" }}
              />
            );
          }

          const ds = dateStr(day);
          const dayEvents = eventsByDate.get(ds) ?? [];
          const dow = idx % 7;
          const isWeekend = dow === 0 || dow === 6;
          const isToday = ds === todayStr;

          return (
            <div
              key={ds}
              className="min-h-[100px] border-b border-r border-[#F8FAFC] p-1.5 flex flex-col"
              style={{
                background: isWeekend
                  ? dayEvents.length > 0
                    ? "#7D152D08"
                    : "#FAFBFC"
                  : "transparent",
              }}
            >
              {/* Day number */}
              <div className="flex items-center justify-between mb-1">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    fontSize: "0.75rem",
                    color: isToday ? "#FFF" : isWeekend ? "#7D152D" : "#64748B",
                    background: isToday ? "#7D152D" : "transparent",
                  }}
                >
                  {day}
                </span>
                {dayEvents.length > 2 && (
                  <span style={{ fontSize: "0.5625rem", color: "#94A3B8" }}>
                    {dayEvents.length} events
                  </span>
                )}
              </div>

              {/* Event pills with geographic hint */}
              <div className="flex flex-col gap-0.5 flex-1">
                {dayEvents.slice(0, 3).map((ev) => {
                  const st = STATUS_META[ev.status] ?? STATUS_META["draft"];
                  const geo = shortGeo(ev.location);
                  return (
                    <Link
                      key={ev.id}
                      to={`/events/${ev.id}`}
                      className="block truncate px-1.5 py-0.5 rounded no-underline hover:opacity-80 transition-opacity"
                      style={{
                        fontSize: "0.5625rem",
                        background: st!.bg,
                        color: st!.text,
                      }}
                      title={`${ev.name} — ${ev.location}`}
                    >
                      <span className="truncate">{ev.name}</span>
                      <span style={{ color: st!.text, opacity: 0.6 }}>
                        {" "}
                        · {geo}
                      </span>
                    </Link>
                  );
                })}
                {dayEvents.length > 3 && (
                  <span
                    className="px-1.5"
                    style={{ fontSize: "0.5625rem", color: "#94A3B8" }}
                  >
                    +{dayEvents.length - 3} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekend clustering legend */}
      <div className="px-5 py-3 border-t border-[#E2E8F0] flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ background: "#7D152D10" }}
          />
          <span style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
            Weekend
          </span>
        </div>
        {Object.entries(STATUS_META).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ background: val.bg }}
            />
            <span style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
              {val.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
