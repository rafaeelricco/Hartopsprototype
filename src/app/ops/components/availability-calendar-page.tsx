import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Sun,
  CloudSun,
  Moon,
  Users,
  Filter,
} from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import {
  mockEducators,
  type Educator,
} from "@/app/educator/components/educator-roster-data";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getWeekDays(anchor: Date): Date[] {
  const start = new Date(anchor);
  start.setDate(start.getDate() - start.getDay() + 1); // Monday
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatWeekRange(days: Date[]): string {
  const first = days[0]!;
  const last = days[6]!;
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const f = first.toLocaleDateString("en-US", opts);
  const l = last.toLocaleDateString("en-US", {
    ...opts,
    year: "numeric",
  });
  return `${f} – ${l}`;
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SLOT_META: Record<
  string,
  {
    label: string;
    short: string;
    icon: typeof Sun;
    bg: string;
    text: string;
    dot: string;
  }
> = {
  morning: {
    label: "Morning",
    short: "AM",
    icon: Sun,
    bg: "#FEF3C7",
    text: "#92400E",
    dot: "#F59E0B",
  },
  afternoon: {
    label: "Afternoon",
    short: "PM",
    icon: CloudSun,
    bg: "#F1F5F9",
    text: "#475569",
    dot: "#94A3B8",
  },
  evening: {
    label: "Evening",
    short: "Eve",
    icon: Moon,
    bg: "#EDE9FE",
    text: "#5B21B6",
    dot: "#8B5CF6",
  },
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

// ─── Main Component ───────────────────────────────────────────────────────────

type StatusFilter = "Active" | "Inactive" | "All";

export function AvailabilityCalendarPage() {
  const navigate = useNavigate();
  const [weekAnchor, setWeekAnchor] = useState(() => new Date());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Active");

  const weekDays = useMemo(() => getWeekDays(weekAnchor), [weekAnchor]);
  const todayKey = toISODate(new Date());

  // Filter educators
  const filteredEducators = useMemo(() => {
    let list =
      statusFilter === "All"
        ? mockEducators
        : mockEducators.filter((e) => e.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.homeBase.toLowerCase().includes(q),
      );
    }
    return list;
  }, [statusFilter, search]);

  const prevWeek = () => {
    const d = new Date(weekAnchor);
    d.setDate(d.getDate() - 7);
    setWeekAnchor(d);
  };

  const nextWeek = () => {
    const d = new Date(weekAnchor);
    d.setDate(d.getDate() + 7);
    setWeekAnchor(d);
  };

  const goThisWeek = () => setWeekAnchor(new Date());

  // Get slots for a given educator+date
  const getSlots = (educator: Educator, dateStr: string): string[] => {
    const entry = educator.availability.find((a) => a.date === dateStr);
    return entry?.slots || [];
  };

  return (
    <div className="p-6 space-y-6 font-[Inter]">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div>
        <h1
          className="text-[#0F172A]"
          style={{ fontSize: "1.5rem", fontWeight: 600 }}
        >
          Educator Availability
        </h1>
        <p className="text-[#94A3B8] mt-1" style={{ fontSize: "0.875rem" }}>
          Centralized view of all educators' weekly availability. Use this to
          plan assignments and identify scheduling gaps.
        </p>
      </div>

      {/* ── Stats ────────────────────────────────────────────────────────
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Active Educators"
          value={mockEducators.filter((e) => e.status === "Active").length}
          accent="#0F172A"
        />
        <StatCard
          label="Available Today"
          value={stats.availableToday}
          accent="#0F766E"
        />
        <StatCard
          label="5+ Days This Week"
          value={stats.fullyAvailableWeek}
          accent="#7D152D"
        />
        <StatCard
          label="Total Educators"
          value={mockEducators.length}
          accent="#64748B"
        />
      </div> */}

      {/* ── Filters & Week Nav ─────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: search + filter */}
        <div className="flex items-center gap-3 flex-1">
          <div className="relative max-w-[280px] flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            />
            <Input
              placeholder="Search educators…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
              style={{ fontSize: "0.8125rem" }}
            />
          </div>
          <div className="flex items-center gap-1 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-0.5">
            {(["Active", "Inactive", "All"] as StatusFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  statusFilter === f
                    ? "bg-white shadow-sm text-[#0F172A] font-medium"
                    : "text-[#94A3B8] hover:text-[#64748B]"
                }`}
                style={{ fontSize: "0.75rem" }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Right: week navigator */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goThisWeek}
            className="cursor-pointer"
            style={{ fontSize: "0.75rem" }}
          >
            This Week
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevWeek}
              className="h-8 w-8 cursor-pointer"
            >
              <ChevronLeft size={16} className="text-[#64748B]" />
            </Button>
            <span
              className="min-w-[160px] text-center text-[#0F172A]"
              style={{ fontSize: "0.875rem", fontWeight: 600 }}
            >
              {formatWeekRange(weekDays)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextWeek}
              className="h-8 w-8 cursor-pointer"
            >
              <ChevronRight size={16} className="text-[#64748B]" />
            </Button>
          </div>
        </div>
      </div>

      {/* ── Availability Grid ──────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        {/* Column headers */}
        <div
          className="grid border-b border-[#E2E8F0]"
          style={{
            gridTemplateColumns: "200px repeat(7, 1fr)",
            background: "#F8FAFC",
          }}
        >
          <div
            className="px-4 py-3 flex items-center gap-2 text-[#94A3B8] border-r border-[#E2E8F0]"
            style={{ fontSize: "0.75rem", fontWeight: 600 }}
          >
            <Users size={14} />
            Educator ({filteredEducators.length})
          </div>
          {weekDays.map((day, i) => {
            const key = toISODate(day);
            const isToday = key === todayKey;
            return (
              <div
                key={key}
                className={`px-2 py-3 text-center border-r border-[#E2E8F0] last:border-r-0 ${
                  isToday ? "bg-[#7D152D]/5" : ""
                }`}
              >
                <p
                  className={isToday ? "text-[#7D152D]" : "text-[#94A3B8]"}
                  style={{ fontSize: "0.6875rem", fontWeight: 600 }}
                >
                  {DAY_LABELS[i]}
                </p>
                <p
                  className={isToday ? "text-[#7D152D]" : "text-[#0F172A]"}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: isToday ? 700 : 500,
                  }}
                >
                  {day.getDate()}
                </p>
              </div>
            );
          })}
        </div>

        {/* Educator rows */}
        {filteredEducators.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "#7D152D0F" }}
            >
              <Filter size={22} style={{ color: "#7D152D" }} />
            </div>
            <p style={{ fontSize: "1rem", color: "#0F172A" }} className="mb-1">
              No educators match
            </p>
            <p style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
              Try adjusting your search or filter.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#E2E8F0]">
            {filteredEducators.map((educator) => {
              const initials = educator.name
                .split(" ")
                .map((n) => n[0])
                .join("");
              const statusColor =
                educator.status === "Active"
                  ? "#0F766E"
                  : educator.status === "Inactive"
                    ? "#94A3B8"
                    : "#D97706";

              return (
                <div
                  key={educator.id}
                  className="grid hover:bg-[#F8FAFC]/50 transition-colors"
                  style={{
                    gridTemplateColumns: "200px repeat(7, 1fr)",
                  }}
                >
                  {/* Educator name column */}
                  <button
                    onClick={() =>
                      navigate(`/ops/dashboard/educators/${educator.id}`)
                    }
                    className="px-4 py-3 flex items-center gap-3 text-left border-r border-[#E2E8F0] hover:bg-[#7D152D]/5 transition-colors cursor-pointer bg-transparent"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "#7D152D0F" }}
                    >
                      <span
                        className="font-semibold"
                        style={{ fontSize: "0.6875rem", color: "#7D152D" }}
                      >
                        {initials}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p
                        className="truncate text-[#0F172A]"
                        style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                      >
                        {educator.name}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: statusColor }}
                        />
                        <span
                          className="text-[#94A3B8] truncate"
                          style={{ fontSize: "0.625rem" }}
                        >
                          {educator.homeBase}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Day cells */}
                  {weekDays.map((day, _dayIdx) => {
                    const dateStr = toISODate(day);
                    const isToday = dateStr === todayKey;
                    const slots = getSlots(educator, dateStr);
                    const hasSlots = slots.length > 0;

                    return (
                      <div
                        key={dateStr}
                        className={`px-1.5 py-2.5 flex flex-col items-center justify-center gap-1 border-r border-[#E2E8F0] last:border-r-0 ${
                          isToday ? "bg-[#7D152D]/[0.02]" : ""
                        }`}
                      >
                        {hasSlots ? (
                          <div className="flex flex-col gap-0.5 w-full">
                            {slots.map((slot) => {
                              const meta = SLOT_META[slot];
                              if (!meta) return null;
                              return (
                                <span
                                  key={slot}
                                  className="block rounded px-1.5 py-px text-center truncate"
                                  style={{
                                    fontSize: "0.5625rem",
                                    fontWeight: 500,
                                    background: meta.bg,
                                    color: meta.text,
                                    lineHeight: "1rem",
                                  }}
                                >
                                  {meta.short}
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <span
                            className="text-[#CBD5E1]"
                            style={{ fontSize: "0.75rem" }}
                          >
                            —
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Legend ──────────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-6 text-[#94A3B8] px-1"
        style={{ fontSize: "0.75rem" }}
      >
        {Object.entries(SLOT_META).map(([key, meta]) => {
          const Icon = meta.icon;
          return (
            <span key={key} className="flex items-center gap-1.5">
              <Icon size={12} style={{ color: meta.dot }} />
              {meta.label}
            </span>
          );
        })}
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded text-center leading-3 text-[#CBD5E1]"
            style={{ fontSize: "0.5rem" }}
          >
            —
          </span>
          Unavailable
        </span>
      </div>
    </div>
  );
}
