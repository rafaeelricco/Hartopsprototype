import React from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Award,
  Star,
  User,
  AlertTriangle,
  TrendingUp,
  Gauge,
} from "lucide-react";
import { MOCK_EDUCATORS } from "./educator-data";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const statusStyles: Record<string, { bg: string; text: string }> = {
  active: { bg: "#ECFDF5", text: "#0F766E" },
  inactive: { bg: "#F1F5F9", text: "#64748B" },
  pending: { bg: "#FFFBEB", text: "#D97706" },
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getScoreLevel(score: number) {
  if (score >= 80) return "excellent";
  if (score >= 60) return "average";
  return "needs-improvement";
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function InfoCard({
  icon: Icon,
  label,
  value,
  subValue,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  subValue?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col gap-1.5 h-full">
      <div
        className="flex items-center gap-2 text-[#94A3B8]"
        style={{ fontSize: "0.75rem" }}
      >
        <Icon size={14} className="flex-shrink-0" />
        {label}
      </div>
      <div
        className="text-[#0F172A]"
        style={{ fontSize: "0.875rem", fontWeight: 500 }}
      >
        {value}
      </div>
      {subValue && (
        <div className="text-[#64748B]" style={{ fontSize: "0.8125rem" }}>
          {subValue}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mock recent event history per educator                              */
/* ------------------------------------------------------------------ */

interface RecentEvent {
  id: string;
  name: string;
  account: string;
  date: string;
  status: "completed" | "cancelled" | "upcoming";
  salesUnits?: number;
}

const RECENT_EVENTS_BY_EDUCATOR: Record<string, RecentEvent[]> = {
  "EDU-001": [
    {
      id: "EVT-1081",
      name: "Casa Nueva Brand Activation",
      account: "The Dead Rabbit",
      date: "2026-03-14",
      status: "completed",
      salesUnits: 48,
    },
    {
      id: "EVT-1074",
      name: "Patron Tasting Experience",
      account: "Total Wine & More",
      date: "2026-03-07",
      status: "completed",
      salesUnits: 55,
    },
    {
      id: "EVT-1068",
      name: "Aperol Spritz Pop-Up",
      account: "Whole Foods Market",
      date: "2026-02-28",
      status: "completed",
      salesUnits: 32,
    },
    {
      id: "EVT-1092",
      name: "Ketel One Showcase",
      account: "Moxy Times Square",
      date: "2026-03-21",
      status: "upcoming",
    },
  ],
  "EDU-002": [
    {
      id: "EVT-1079",
      name: "Brooklyn Lager Launch",
      account: "Joe's Tavern",
      date: "2026-03-12",
      status: "completed",
      salesUnits: 36,
    },
    {
      id: "EVT-1065",
      name: "Craft Beer Tasting",
      account: "Total Wine & More",
      date: "2026-02-22",
      status: "completed",
      salesUnits: 41,
    },
    {
      id: "EVT-1090",
      name: "Spirits Education Night",
      account: "The Dead Rabbit",
      date: "2026-03-19",
      status: "upcoming",
    },
  ],
  "EDU-003": [
    {
      id: "EVT-1082",
      name: "Malbec Brand Education",
      account: "Whole Foods Market",
      date: "2026-03-15",
      status: "completed",
      salesUnits: 27,
    },
    {
      id: "EVT-1075",
      name: "Champagne Prestige Tasting",
      account: "The Dead Rabbit",
      date: "2026-03-08",
      status: "completed",
      salesUnits: 18,
    },
    {
      id: "EVT-1091",
      name: "Wine Portfolio Showcase",
      account: "Total Wine & More",
      date: "2026-03-22",
      status: "upcoming",
    },
  ],
};

function getDefaultEvents(educatorId: string): RecentEvent[] {
  return [
    {
      id: `EVT-${Math.abs(educatorId.charCodeAt(4) * 100 + 1000)}`,
      name: "Brand Activation Event",
      account: "Total Wine & More",
      date: "2026-03-10",
      status: "completed",
      salesUnits: 30,
    },
  ];
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function EducatorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const educator = MOCK_EDUCATORS.find((e) => e.id === id);

  if (!educator) {
    return (
      <div className="p-6 font-[Inter]">
        <button
          onClick={() => navigate("/ops/dashboard/educators")}
          className="inline-flex items-center gap-1.5 mb-6 bg-transparent border-0 cursor-pointer hover:opacity-80 transition-opacity"
          style={{ fontSize: "0.875rem", color: "#7D152D" }}
        >
          <ArrowLeft size={15} />
          Back to Educators
        </button>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
            style={{ background: "#7D152D0F" }}
          >
            <AlertTriangle size={26} style={{ color: "#7D152D" }} />
          </div>
          <p style={{ fontSize: "1rem", color: "#0F172A" }} className="mb-1">
            Educator not found
          </p>
          <p style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
            No educator with ID &quot;{id}&quot; exists.
          </p>
        </div>
      </div>
    );
  }

  const initials = educator.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const recentEvents =
    RECENT_EVENTS_BY_EDUCATOR[educator.id] ?? getDefaultEvents(educator.id);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const status = (statusStyles[educator.status] ?? statusStyles["inactive"])!;

  return (
    <div className="p-6 space-y-6 font-[Inter]">
      {/* Back link */}
      <button
        onClick={() => navigate("/ops/dashboard/educators")}
        className="inline-flex items-center gap-1.5 bg-transparent border-0 cursor-pointer hover:opacity-80 transition-opacity"
        style={{ fontSize: "0.875rem", color: "#7D152D" }}
      >
        <ArrowLeft size={15} />
        Back to Educators
      </button>

      {/* ---------------------------------------------------------------- */}
      {/* Header card                                                       */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "#7D152D0F" }}
            >
              <span
                className="font-semibold"
                style={{ fontSize: "0.9375rem", color: "#7D152D" }}
              >
                {initials}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 style={{ fontSize: "1.25rem", color: "#0F172A" }}>
                  {educator.name}
                </h2>
                <span
                  className="px-2.5 py-0.5 rounded-md"
                  style={{
                    fontSize: "0.6875rem",
                    background: status.bg,
                    color: status.text,
                  }}
                >
                  {educator.status.charAt(0).toUpperCase() +
                    educator.status.slice(1)}
                </span>
                {educator.qualityScore > 0 && (
                  <span
                    className="px-2.5 py-0.5 rounded-md flex items-center gap-1"
                    style={{
                      fontSize: "0.6875rem",
                      background: "#FFFBEB",
                      color: "#D97706",
                    }}
                  >
                    <Star size={10} fill="#F59E0B" style={{ color: "#F59E0B" }} />
                    {educator.qualityScore} Quality
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <span
                  className="flex items-center gap-1.5"
                  style={{ fontSize: "0.8125rem", color: "#94A3B8" }}
                >
                  <CalendarDays size={13} />
                  {educator.eventsCompleted}{" "}
                  {educator.eventsCompleted === 1 ? "event" : "events"}{" "}
                  completed
                </span>
                <span
                  className="flex items-center gap-1.5"
                  style={{ fontSize: "0.8125rem", color: "#94A3B8" }}
                >
                  <MapPin size={13} />
                  {educator.city}, {educator.state}
                </span>
                <span
                  className="flex items-center gap-1.5"
                  style={{ fontSize: "0.8125rem", color: "#94A3B8" }}
                >
                  {educator.id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Profile Info Grid                                                 */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          icon={MapPin}
          label="Location"
          value={`${educator.city}, ${educator.state}`}
        />

        <InfoCard
          icon={User}
          label="Status"
          value={
            educator.status.charAt(0).toUpperCase() + educator.status.slice(1)
          }
        />

        <InfoCard
          icon={CalendarDays}
          label="Events Completed"
          value={educator.eventsCompleted}
          subValue="total lifetime"
        />

        <InfoCard
          icon={CalendarDays}
          label="Last Event"
          value={
            educator.lastEventDate
              ? formatDate(educator.lastEventDate)
              : "No events yet"
          }
        />

        <InfoCard
          icon={Star}
          label="Quality Score"
          value={educator.qualityScore > 0 ? educator.qualityScore : "—"}
          subValue={
            educator.qualityScore > 0
              ? `${educator.trend === "up" ? "↑" : educator.trend === "down" ? "↓" : "→"} Trending ${educator.trend}`
              : "Not yet scored"
          }
        />

        {/* Specialties */}
        {educator.specialties.length > 0 && (
          <InfoCard
            icon={Award}
            label="Specialties"
            value={
              <div className="flex flex-wrap gap-1.5 mt-1">
                {educator.specialties.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-0.5 rounded-full"
                    style={{
                      fontSize: "0.75rem",
                      background: "#F1F5F9",
                      color: "#475569",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            }
          />
        )}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Performance Scorecard                                             */}
      {/* ---------------------------------------------------------------- */}
      {educator.qualityScore > 0 && (
        <div className="space-y-3">
          <h3
            style={{
              fontSize: "0.8125rem",
              color: "#94A3B8",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Performance Scorecard
          </h3>

          {/* Hero Quality Score */}
          {(() => {
            const level = getScoreLevel(educator.qualityScore);
            const levelLabel =
              level === "excellent"
                ? "Excellent"
                : level === "average"
                  ? "Average"
                  : "Needs Improvement";
            const ringColor =
              level === "excellent"
                ? "#22C55E"
                : level === "average"
                  ? "#F59E0B"
                  : "#EF4444";
            const ringBg =
              level === "excellent"
                ? "#22C55E1A"
                : level === "average"
                  ? "#F59E0B1A"
                  : "#EF44441A";
            return (
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 flex items-center gap-6">
                {/* Circular score indicator */}
                <div
                  className="relative flex-shrink-0 flex items-center justify-center"
                  style={{ width: 80, height: 80 }}
                >
                  <svg
                    viewBox="0 0 36 36"
                    className="w-full h-full"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      stroke={ringColor}
                      strokeWidth="3"
                      strokeDasharray={`${educator.qualityScore * 0.974} 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    className="absolute inset-0 flex items-center justify-center font-bold"
                    style={{ fontSize: "1.25rem", color: ringColor }}
                  >
                    {educator.qualityScore}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Gauge size={16} style={{ color: ringColor }} />
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "#0F172A",
                      }}
                    >
                      Quality Score
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-md font-medium"
                      style={{
                        fontSize: "0.6875rem",
                        background: ringBg,
                        color: ringColor,
                      }}
                    >
                      {levelLabel}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
                    Composite score based on reliability, punctuality, and
                    survey quality. Updated each period.
                  </p>
                  <p
                    className="mt-1 flex items-center gap-1"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    <span
                      className="font-semibold"
                      style={{
                        color:
                          educator.trend === "up"
                            ? "#22C55E"
                            : educator.trend === "down"
                              ? "#EF4444"
                              : "#94A3B8",
                      }}
                    >
                      {educator.trend === "up"
                        ? "↑"
                        : educator.trend === "down"
                          ? "↓"
                          : "→"}{" "}
                      {educator.trend === "up"
                        ? "Improving"
                        : educator.trend === "down"
                          ? "Declining"
                          : "Stable"}
                    </span>
                    <span style={{ color: "#94A3B8" }}>
                      vs. previous period
                    </span>
                  </p>
                </div>
              </div>
            );
          })()}

          {/* Score Breakdown Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Reliability */}
            {(() => {
              const val = Math.min(100, educator.qualityScore + 3);
              const color =
                val >= 80
                  ? "#22C55E"
                  : val >= 60
                    ? "#F59E0B"
                    : "#EF4444";
              return (
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col gap-1.5">
                  <div
                    className="flex items-center gap-2 text-[#94A3B8]"
                    style={{ fontSize: "0.75rem" }}
                  >
                    <CheckCircle2 size={14} /> Reliability
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "#0F172A",
                      }}
                    >
                      {val}%
                    </span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-1.5 mt-1">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${val}%`, background: color }}
                    />
                  </div>
                </div>
              );
            })()}

            {/* On-Time Rate */}
            {(() => {
              const val = Math.max(70, educator.qualityScore - 5);
              const color =
                val >= 80
                  ? "#22C55E"
                  : val >= 60
                    ? "#F59E0B"
                    : "#EF4444";
              return (
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col gap-1.5">
                  <div
                    className="flex items-center gap-2 text-[#94A3B8]"
                    style={{ fontSize: "0.75rem" }}
                  >
                    <TrendingUp size={14} /> On-Time Rate
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "#0F172A",
                      }}
                    >
                      {val}%
                    </span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-1.5 mt-1">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${val}%`, background: color }}
                    />
                  </div>
                </div>
              );
            })()}

            {/* Survey Quality */}
            {(() => {
              const val = Math.min(100, educator.qualityScore + 1);
              const color =
                val >= 80
                  ? "#22C55E"
                  : val >= 60
                    ? "#F59E0B"
                    : "#EF4444";
              return (
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col gap-1.5">
                  <div
                    className="flex items-center gap-2 text-[#94A3B8]"
                    style={{ fontSize: "0.75rem" }}
                  >
                    <Star size={14} /> Survey Quality
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "#0F172A",
                      }}
                    >
                      {val}%
                    </span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-1.5 mt-1">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${val}%`, background: color }}
                    />
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Recent Activity                                                   */}
      {/* ---------------------------------------------------------------- */}
      <div className="space-y-3">
        <h3
          style={{
            fontSize: "0.8125rem",
            color: "#94A3B8",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Recent Activity
        </h3>
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
          <div
            className="grid grid-cols-[1fr_120px_100px_90px_80px] gap-4 px-5 py-3 border-b border-[#E2E8F0] font-medium"
            style={{
              fontSize: "0.75rem",
              color: "#94A3B8",
              background: "#F8FAFC",
            }}
          >
            <span>Event</span>
            <span>Account</span>
            <span>Date</span>
            <span>Status</span>
            <span>Units</span>
          </div>
          <div className="divide-y divide-[#E2E8F0]">
            {recentEvents.map((ev) => (
              <div
                key={ev.id}
                className="grid grid-cols-[1fr_120px_100px_90px_80px] gap-4 px-5 py-3.5 items-center hover:bg-[#F8FAFC] transition-colors"
              >
                <div className="min-w-0">
                  <p
                    className="truncate font-medium"
                    style={{ fontSize: "0.875rem", color: "#0F172A" }}
                  >
                    {ev.name}
                  </p>
                  <p
                    className="truncate"
                    style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                  >
                    {ev.id}
                  </p>
                </div>
                <span style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
                  {ev.account}
                </span>
                <span style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
                  {formatDate(ev.date)}
                </span>
                <span>
                  {ev.status === "completed" ? (
                    <span
                      className="inline-flex items-center gap-1"
                      style={{ fontSize: "0.8125rem", color: "#0F766E" }}
                    >
                      <CheckCircle2 size={13} />
                      Done
                    </span>
                  ) : ev.status === "cancelled" ? (
                    <span
                      className="inline-flex items-center gap-1"
                      style={{ fontSize: "0.8125rem", color: "#DC2626" }}
                    >
                      <XCircle size={13} />
                      Cancelled
                    </span>
                  ) : (
                    <span
                      className="px-2 py-0.5 rounded-md"
                      style={{
                        fontSize: "0.6875rem",
                        background: "#EFF6FF",
                        color: "#2563EB",
                      }}
                    >
                      Upcoming
                    </span>
                  )}
                </span>
                <span style={{ fontSize: "0.875rem", color: "#0F172A" }}>
                  {ev.salesUnits != null ? ev.salesUnits : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info note */}
      <div
        className="rounded-xl border border-[#E2E8F0] p-4 flex items-start gap-3"
        style={{ background: "#F8FAFC" }}
      >
        <AlertTriangle
          size={14}
          className="mt-0.5 flex-shrink-0"
          style={{ color: "#94A3B8" }}
        />
        <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
          This is a read-only educator profile. Assignment management and
          scheduling is handled through the event workflow.
        </p>
      </div>
    </div>
  );
}
