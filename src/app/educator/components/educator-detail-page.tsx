import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Mail,
  Phone,
  Star,
  ShoppingCart,
  Clock,
  CalendarDays,
  AlertTriangle,
  Pencil,
  MapPin,
  Award,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Gauge,
  CheckCircle2,
  RotateCcw,
  Tag,
} from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/shared/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/app/shared/components/ui/tooltip";
import { getEducatorById } from "./educator-roster-data";
import {
  getScoreColor,
  getTrendArrow,
  getTrendColor,
  formatTrendDelta,
  getScoreLevel,
} from "./educator-scoring";

const statusStyles: Record<string, { bg: string; text: string }> = {
  Active: { bg: "#ECFDF5", text: "#0F766E" },
  Inactive: { bg: "#F1F5F9", text: "#64748B" },
  "Pending Invitation": { bg: "#FFFBEB", text: "#D97706" },
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

// Slot label colors (keys must match lowercase data: "morning" | "afternoon" | "evening")
const SLOT_COLORS: Record<string, { bg: string; text: string }> = {
  morning: { bg: "#FEF3C7", text: "#92400E" },
  afternoon: { bg: "#F1F5F9", text: "#475569" },
  evening: { bg: "#EDE9FE", text: "#5B21B6" },
};

function InfoCard({
  icon: Icon,
  label,
  value,
  subValue,
  action,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  subValue?: React.ReactNode;
  action?: React.ReactNode;
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
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}

export function EducatorDetailPage() {
  const { id } = useParams();
  const educator = getEducatorById(id || "");

  const [editOpen, setEditOpen] = useState(false);
  const [editEmail, setEditEmail] = useState(educator?.email || "");
  const [editPhone, setEditPhone] = useState(educator?.phone || "");

  // Calendar state — default to March 2026
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(2); // 0-indexed: 2 = March

  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
  };
  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
    }
  };

  if (!educator) {
    return (
      <div className="p-6 font-[Inter]">
        <Link
          to="/educator/educators"
          className="inline-flex items-center gap-1.5 mb-6 no-underline hover:opacity-80 transition-opacity"
          style={{ fontSize: "0.875rem", color: "#7D152D" }}
        >
          <ArrowLeft size={15} />
          Back to Educators
        </Link>
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
            The educator you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const initials = educator.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const calCells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calCells.push(d);

  const getAvailabilityForDay = (day: number) => {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const entry = educator.availability.find((a) => a.date === dateStr);
    return entry?.slots || [];
  };

  const status = statusStyles[educator.status] ?? statusStyles["Inactive"];

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6 font-[Inter]">
        {/* Back link */}
        <Link
          to="/educator/educators"
          className="inline-flex items-center gap-1.5 no-underline hover:opacity-80 transition-opacity"
          style={{ fontSize: "0.875rem", color: "#7D152D" }}
        >
          <ArrowLeft size={15} />
          Back to Educators
        </Link>

        {/* ---------------------------------------------------------------- */}
        {/* Header card                                                       */}
        {/* ---------------------------------------------------------------- */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              {educator.photoUrl ? (
                <img
                  src={educator.photoUrl}
                  alt={educator.name}
                  className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                />
              ) : (
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
              )}
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 style={{ fontSize: "1.25rem", color: "#0F172A" }}>
                    {educator.name}
                  </h2>
                  <span
                    className="px-2.5 py-0.5 rounded-md"
                    style={{
                      fontSize: "0.6875rem",
                      background: status!.bg,
                      color: status!.text,
                    }}
                  >
                    {educator.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <span
                    className="flex items-center gap-1.5"
                    style={{ fontSize: "0.8125rem", color: "#94A3B8" }}
                  >
                    <CalendarDays size={13} />
                    {educator.totalEvents}{" "}
                    {educator.totalEvents === 1 ? "event" : "events"} total
                  </span>
                  <span
                    className="flex items-center gap-1.5"
                    style={{ fontSize: "0.8125rem", color: "#94A3B8" }}
                  >
                    <MapPin size={13} />
                    {educator.homeBase}
                    {educator.distanceMiles != null && (
                      <span> · ~{educator.distanceMiles} mi from you</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                onClick={() => setEditOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#7D152D]/5 transition-colors cursor-pointer h-auto"
                style={{ fontSize: "0.8125rem", color: "#7D152D" }}
              >
                <Pencil size={14} />
                Edit Educator
              </Button>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Educator Profile & Performance Grid                               */}
        {/* ---------------------------------------------------------------- */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Email */}
          <InfoCard
            icon={Mail}
            label="Email"
            value={
              <a
                href={`mailto:${educator.email}`}
                className="hover:text-[#7D152D] transition-colors no-underline text-[#0F172A]"
              >
                {educator.email}
              </a>
            }
          />

          {/* Phone */}
          <InfoCard
            icon={Phone}
            label="Phone"
            value={
              <a
                href={`tel:${educator.phone.replace(/[^\d+]/g, "")}`}
                className="hover:text-[#7D152D] transition-colors no-underline text-[#0F172A]"
              >
                {educator.phone}
              </a>
            }
          />

          {/* Home Address */}
          <InfoCard
            icon={MapPin}
            label="Home Address"
            value={
              <span>
                {educator.homeAddress.street}
                <br />
                {educator.homeAddress.city}, {educator.homeAddress.state}{" "}
                {educator.homeAddress.zip}
              </span>
            }
          />

          {/* Avg Rating */}
          <InfoCard
            icon={Star}
            label="Avg Rating"
            value={educator.avgRating || "\u2014"}
          />

          {/* Sales / Event */}
          <InfoCard
            icon={ShoppingCart}
            label="Sales / Event"
            value={educator.salesPerEvent || "\u2014"}
          />

          {/* Punctuality */}
          <InfoCard
            icon={Clock}
            label="Punctuality"
            value={educator.punctuality ? `${educator.punctuality}%` : "\u2014"}
          />

          {/* Events This Month */}
          <InfoCard
            icon={TrendingUp}
            label="Events This Month"
            value={educator.eventsThisMonth}
          />

          {/* Total Events */}
          <InfoCard
            icon={CalendarDays}
            label="Total Events"
            value={educator.totalEvents}
          />

          {/* Brand Certifications */}
          {educator.brandCertifications.length > 0 && (
            <InfoCard
              icon={Award}
              label="Brand Certifications"
              value={
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {educator.brandCertifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-2.5 py-0.5 rounded-full"
                      style={{
                        fontSize: "0.75rem",
                        background: "#F1F5F9",
                        color: "#475569",
                      }}
                    >
                      {cert}
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
              const trendDelta = educator.trends.qualityScore;
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
                      Composite score from 5 weighted metrics. Updated each
                      period.
                    </p>
                    {trendDelta !== 0 && (
                      <p
                        className="mt-1 flex items-center gap-1"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        <span
                          className={`font-semibold ${getTrendColor(trendDelta)}`}
                        >
                          {getTrendArrow(trendDelta)}{" "}
                          {formatTrendDelta(trendDelta)} pts
                        </span>
                        <span style={{ color: "#94A3B8" }}>
                          vs. previous period
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Metric Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Retail Sales Avg */}
              {(() => {
                const val = educator.retailSalesAvg;
                const colors = getScoreColor(Math.min(val / 20, 1) * 100);
                const trend = educator.trends.retailSalesAvg;
                return (
                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-2 text-[#94A3B8]"
                        style={{ fontSize: "0.75rem" }}
                      >
                        <ShoppingCart size={14} /> Retail Sales Avg
                      </div>
                      {trend !== 0 && (
                        <span
                          className={`text-xs font-semibold ${getTrendColor(trend)}`}
                        >
                          {getTrendArrow(trend)} {formatTrendDelta(trend)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: "#0F172A",
                        }}
                      >
                        {val.toFixed(1)}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                        units / event
                      </span>
                    </div>
                    <div className="w-full bg-[#F1F5F9] rounded-full h-1.5 mt-1">
                      <div
                        className={`h-1.5 rounded-full ${colors.bg.replace("/10", "")}`}
                        style={{
                          width: `${Math.min(val / 20, 1) * 100}%`,
                          background: colors.text.includes("green")
                            ? "#22C55E"
                            : colors.text.includes("amber")
                              ? "#F59E0B"
                              : "#EF4444",
                        }}
                      />
                    </div>
                  </div>
                );
              })()}

              {/* Check-in Score */}
              {(() => {
                const val = educator.checkInScore;
                const colors = getScoreColor(val);
                const trend = educator.trends.checkInScore;
                return (
                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-2 text-[#94A3B8]"
                        style={{ fontSize: "0.75rem" }}
                      >
                        <Clock size={14} /> Check-in Score
                      </div>
                      {trend !== 0 && (
                        <span
                          className={`text-xs font-semibold ${getTrendColor(trend)}`}
                        >
                          {getTrendArrow(trend)} {formatTrendDelta(trend)}
                        </span>
                      )}
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
                        style={{
                          width: `${val}%`,
                          background: colors.text.includes("green")
                            ? "#22C55E"
                            : colors.text.includes("amber")
                              ? "#F59E0B"
                              : "#EF4444",
                        }}
                      />
                    </div>
                  </div>
                );
              })()}

              {/* Event Completion Avg */}
              {(() => {
                const val = educator.eventCompletionAvg;
                const colors = getScoreColor(val);
                const trend = educator.trends.eventCompletionAvg;
                return (
                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-2 text-[#94A3B8]"
                        style={{ fontSize: "0.75rem" }}
                      >
                        <CheckCircle2 size={14} /> Event Completion Avg
                      </div>
                      {trend !== 0 && (
                        <span
                          className={`text-xs font-semibold ${getTrendColor(trend)}`}
                        >
                          {getTrendArrow(trend)} {formatTrendDelta(trend)}
                        </span>
                      )}
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
                        style={{
                          width: `${val}%`,
                          background: colors.text.includes("green")
                            ? "#22C55E"
                            : colors.text.includes("amber")
                              ? "#F59E0B"
                              : "#EF4444",
                        }}
                      />
                    </div>
                  </div>
                );
              })()}

              {/* Retailer Survey Score */}
              {(() => {
                const val = educator.retailerSurveyScore;
                const trend = educator.trends.retailerSurveyScore;
                return (
                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-2 text-[#94A3B8]"
                        style={{ fontSize: "0.75rem" }}
                      >
                        <Star size={14} /> Retailer Survey Score
                      </div>
                      {trend !== 0 && (
                        <span
                          className={`text-xs font-semibold ${getTrendColor(trend)}`}
                        >
                          {getTrendArrow(trend)} {formatTrendDelta(trend)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: "#0F172A",
                        }}
                      >
                        {val.toFixed(1)}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                        / 5
                      </span>
                      <div className="flex gap-0.5 ml-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={12}
                            fill={s <= Math.round(val) ? "#F59E0B" : "none"}
                            style={{
                              color:
                                s <= Math.round(val) ? "#F59E0B" : "#E2E8F0",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Cancellation Rating */}
              {(() => {
                const val = educator.cancellationRating;
                const colors = getScoreColor(val);
                const trend = educator.trends.cancellationRating;
                return (
                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-2 text-[#94A3B8]"
                        style={{ fontSize: "0.75rem" }}
                      >
                        <RotateCcw size={14} /> Cancellation Rating
                      </div>
                      {trend !== 0 && (
                        <span
                          className={`text-xs font-semibold ${getTrendColor(trend)}`}
                        >
                          {getTrendArrow(trend)} {formatTrendDelta(trend)}
                        </span>
                      )}
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
                      <span
                        className="px-2 py-0.5 rounded-md font-medium"
                        style={{
                          fontSize: "0.6875rem",
                          background: colors.text.includes("green")
                            ? "#ECFDF5"
                            : colors.text.includes("amber")
                              ? "#FFFBEB"
                              : "#FEF2F2",
                          color: colors.text.includes("green")
                            ? "#0F766E"
                            : colors.text.includes("amber")
                              ? "#D97706"
                              : "#DC2626",
                        }}
                      >
                        {val >= 90
                          ? "Reliable"
                          : val >= 70
                            ? "Fair"
                            : "At Risk"}
                      </span>
                    </div>
                    <div className="w-full bg-[#F1F5F9] rounded-full h-1.5 mt-1">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${val}%`,
                          background: colors.text.includes("green")
                            ? "#22C55E"
                            : colors.text.includes("amber")
                              ? "#F59E0B"
                              : "#EF4444",
                        }}
                      />
                    </div>
                  </div>
                );
              })()}

              {/* Preferred Brands/Categories */}
              {educator.preferredBrands.length > 0 && (
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col gap-1.5">
                  <div
                    className="flex items-center gap-2 text-[#94A3B8]"
                    style={{ fontSize: "0.75rem" }}
                  >
                    <Tag size={14} /> Preferred Brands / Categories
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {educator.preferredBrands.map((brand) => (
                      <span
                        key={brand}
                        className="px-2.5 py-0.5 rounded-full"
                        style={{
                          fontSize: "0.75rem",
                          background: "#F1F5F9",
                          color: "#475569",
                        }}
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Upcoming Events                                                   */}
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
            Upcoming Events
          </h3>
          {educator.upcomingEvents.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 flex flex-col items-center justify-center text-center min-h-[180px]">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "#0F766E0F" }}
              >
                <CalendarDays size={22} style={{ color: "#0F766E" }} />
              </div>
              <p
                style={{ fontSize: "1rem", color: "#0F172A" }}
                className="mb-1"
              >
                No upcoming events
              </p>
              <p style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
                No events are currently assigned to this educator.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {educator.upcomingEvents.map((evt) => (
                <Link
                  key={evt.id}
                  to={`/educator/events/${evt.id}`}
                  className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 flex items-center gap-4 transition-shadow hover:shadow-sm group no-underline"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: "#0F766E0F" }}
                  >
                    <CalendarDays size={18} style={{ color: "#0F766E" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="truncate group-hover:text-[#7D152D] transition-colors"
                      style={{ fontSize: "0.9375rem", color: "#0F172A" }}
                    >
                      {evt.name}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className="flex items-center gap-1"
                        style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                      >
                        <CalendarDays size={12} />
                        {new Date(evt.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        · {evt.time}
                      </span>
                      <span
                        className="flex items-center gap-1"
                        style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                      >
                        <MapPin size={12} />
                        {evt.venue}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    style={{ color: "#CBD5E1" }}
                    className="flex-shrink-0"
                  />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Past Events                                                       */}
        {/* ---------------------------------------------------------------- */}
        {educator.pastEvents.length > 0 && (
          <div className="space-y-3">
            <h3
              style={{
                fontSize: "0.8125rem",
                color: "#94A3B8",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Past Events
            </h3>
            <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
              <div
                className="grid grid-cols-[1fr_90px_70px_60px_70px] gap-4 px-5 py-3 border-b border-[#E2E8F0] font-medium"
                style={{
                  fontSize: "0.75rem",
                  color: "#94A3B8",
                  background: "#F8FAFC",
                }}
              >
                <span>Event</span>
                <span>Date</span>
                <span>Rating</span>
                <span>Sales</span>
                <span>On-Time</span>
              </div>
              <div className="divide-y divide-[#E2E8F0]">
                {educator.pastEvents.map((evt) => (
                  <Link
                    key={evt.id}
                    to={`/educator/events/${evt.id}`}
                    className="grid grid-cols-[1fr_90px_70px_60px_70px] gap-4 px-5 py-3.5 items-center hover:bg-[#F8FAFC] transition-colors no-underline"
                  >
                    <div className="min-w-0">
                      <p
                        className="truncate font-medium"
                        style={{ fontSize: "0.875rem", color: "#0F172A" }}
                      >
                        {evt.name}
                      </p>
                      <p
                        className="truncate"
                        style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                      >
                        {evt.venue}
                      </p>
                    </div>
                    <span style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
                      {new Date(evt.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span
                      className="flex items-center gap-1"
                      style={{ fontSize: "0.875rem", color: "#0F172A" }}
                    >
                      <Star size={12} style={{ color: "#F59E0B" }} />
                      {evt.rating}
                    </span>
                    <span style={{ fontSize: "0.875rem", color: "#0F172A" }}>
                      {evt.salesUnits}
                    </span>
                    <span style={{ fontSize: "0.875rem", color: "#0F172A" }}>
                      {evt.punctualityScore}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Availability Calendar                                             */}
        {/* ---------------------------------------------------------------- */}
        {educator.availability.length > 0 && (
          <div className="space-y-3">
            <h3
              style={{
                fontSize: "0.8125rem",
                color: "#94A3B8",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Availability
            </h3>
            <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
              {/* Month navigation */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevMonth}
                  className="cursor-pointer"
                >
                  <ChevronLeft size={16} style={{ color: "#64748B" }} />
                </Button>
                <h3
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "#0F172A",
                  }}
                >
                  {MONTHS[calMonth]} {calYear}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextMonth}
                  className="cursor-pointer"
                >
                  <ChevronRight size={16} style={{ color: "#64748B" }} />
                </Button>
              </div>
              {/* Day headers */}
              <div className="grid grid-cols-7">
                {DAYS.map((d) => (
                  <div
                    key={d}
                    className="px-2 py-2.5 font-medium border-b border-[#E2E8F0]"
                    style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                  >
                    {d}
                  </div>
                ))}
                {/* Day cells */}
                {calCells.map((day, idx) => {
                  const avail = day ? getAvailabilityForDay(day) : [];
                  const isToday =
                    day === new Date().getDate() &&
                    calMonth === new Date().getMonth() &&
                    calYear === new Date().getFullYear();
                  return (
                    <div
                      key={idx}
                      className="min-h-[90px] p-2 border-b border-r border-[#E2E8F0]"
                      style={{
                        background: day ? "#FFFFFF" : "#F8FAFC",
                      }}
                    >
                      {day && (
                        <>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span
                                className={`inline-flex items-center justify-center size-6 rounded-full font-medium ${
                                  isToday ? "text-white" : ""
                                }`}
                                style={{
                                  fontSize: "0.75rem",
                                  color: isToday ? "#FFFFFF" : "#64748B",
                                  background: isToday
                                    ? "#7D152D"
                                    : "transparent",
                                }}
                              >
                                {day}
                              </span>
                            </TooltipTrigger>
                            {avail.length > 0 && (
                              <TooltipContent>
                                <span style={{ fontSize: "0.75rem" }}>
                                  {avail.join(", ")}
                                </span>
                              </TooltipContent>
                            )}
                          </Tooltip>
                          {avail.length > 0 && (
                            <div className="mt-1 space-y-0.5">
                              {avail.map((slot) => {
                                const slotColor = SLOT_COLORS[slot] ?? {
                                  bg: "#F1F5F9",
                                  text: "#475569",
                                };
                                return (
                                  <span
                                    key={slot}
                                    className="block rounded px-1 py-px truncate"
                                    style={{
                                      fontSize: "0.5625rem",
                                      background: slotColor.bg,
                                      color: slotColor.text,
                                      lineHeight: "1rem",
                                    }}
                                  >
                                    {slot.charAt(0).toUpperCase() +
                                      slot.slice(1)}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* Legend */}
              <div
                className="px-5 py-3 flex items-center gap-4 border-t border-[#E2E8F0]"
                style={{ fontSize: "0.75rem", color: "#94A3B8" }}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "#22C55E" }}
                  />{" "}
                  Fully Available
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "#FBBF24" }}
                  />{" "}
                  Partial
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "#E2E8F0" }}
                  />{" "}
                  Unavailable
                </span>
              </div>
            </div>
          </div>
        )}

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
            As an Educator Manager, you can update contact information (phone
            and email) using the Edit button. All other profile fields,
            certifications, and performance metrics are managed by Hart Ops.
          </p>
        </div>

        {/* Edit Educator Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Educator Contact</DialogTitle>
              <DialogDescription>
                Update phone number or email address for {educator.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label
                  style={{ fontSize: "0.875rem", color: "#0F172A" }}
                  className="font-medium"
                >
                  Email
                </label>
                <Input
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label
                  style={{ fontSize: "0.875rem", color: "#0F172A" }}
                  className="font-medium"
                >
                  Phone
                </label>
                <Input
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  type="tel"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditOpen(false)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setEditOpen(false)}
                className="cursor-pointer text-white"
                style={{ background: "#7D152D" }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
