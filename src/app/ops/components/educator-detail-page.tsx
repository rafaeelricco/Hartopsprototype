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
} from "lucide-react";
import { Card, CardContent } from "../../shared/components/ui/card";
import { Badge } from "../../shared/components/ui/badge";
import { Button } from "../../shared/components/ui/button";
import { Progress } from "../../shared/components/ui/progress";
import { MOCK_EDUCATORS } from "./educator-data";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-green-50 text-green-700 border-green-200";
    case "inactive":
      return "bg-muted text-muted-foreground border-border";
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "";
  }
}

function getScoreColor(score: number) {
  if (score >= 90) return "text-green-600";
  if (score >= 80) return "text-amber-600";
  return "text-red-500";
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/* Sub-components (matches event-detail-page patterns)                 */
/* ------------------------------------------------------------------ */

function QuickStatCard({
  label,
  value,
  subtext,
  progress: progressValue,
}: {
  label: string;
  value: number | string;
  subtext?: string;
  progress?: number;
}) {
  return (
    <Card>
      <CardContent className="p-3">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold leading-tight tabular-nums text-foreground mt-0.5">
          {value}
        </p>
        {subtext && (
          <p className="text-[0.625rem] text-muted-foreground mt-0.5">
            {subtext}
          </p>
        )}
        {progressValue !== undefined && (
          <Progress value={progressValue} className="h-1 mt-2" />
        )}
      </CardContent>
    </Card>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="text-sm text-foreground">{value}</div>
      </div>
    </div>
  );
}

function ScoreRow({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span
          className={`text-sm font-medium tabular-nums ${getScoreColor(score)}`}
        >
          {score}
        </span>
        <Progress value={score} className="h-1.5 w-24" />
      </div>
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
      <div className="p-6 space-y-4 w-full">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/ops/dashboard/educators")}
          className="gap-1 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          Back to Educators
        </Button>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg font-semibold text-foreground">
            Educator not found
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            No educator with ID &quot;{id}&quot; exists.
          </p>
        </div>
      </div>
    );
  }

  const recentEvents =
    RECENT_EVENTS_BY_EDUCATOR[educator.id] ?? getDefaultEvents(educator.id);

  const scorePercent =
    educator.qualityScore > 0 ? educator.qualityScore : undefined;

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/ops/dashboard/educators")}
        className="gap-1 text-muted-foreground hover:text-foreground cursor-pointer"
      >
        <ArrowLeft className="size-4" />
        Back to Educators
      </Button>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <Badge
            variant="secondary"
            className={`text-xs ${getStatusColor(educator.status)}`}
          >
            {educator.status === "active" && (
              <span className="inline-block size-1.5 rounded-full bg-green-500 mr-1" />
            )}
            {educator.status.charAt(0).toUpperCase() + educator.status.slice(1)}
          </Badge>
          {educator.qualityScore > 0 && (
            <Badge variant="outline" className="text-xs tabular-nums">
              <Star className="size-3 mr-1 text-amber-400 fill-amber-400" />
              {educator.qualityScore} Quality Score
            </Badge>
          )}
        </div>
        <h1 className="text-foreground">{educator.name}</h1>
        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1 flex-wrap">
          <span>{educator.id}</span>
          <span>·</span>
          <MapPin className="size-3" />
          <span>
            {educator.city}, {educator.state}
          </span>
        </p>
      </div>

      {/* Overview Section */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-foreground">Overview</h2>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-3">
          <QuickStatCard
            label="Events Completed"
            value={educator.eventsCompleted}
            subtext="total lifetime"
          />
          <QuickStatCard
            label="Quality Score"
            value={educator.qualityScore > 0 ? educator.qualityScore : "—"}
            subtext={
              educator.qualityScore > 0
                ? `${educator.trend === "up" ? "↑" : educator.trend === "down" ? "↓" : "→"} trending ${educator.trend}`
                : "not yet scored"
            }
            {...(scorePercent !== undefined ? { progress: scorePercent } : {})}
          />
          <QuickStatCard
            label="Specialties"
            value={educator.specialties.length}
            subtext={educator.specialties.slice(0, 2).join(", ")}
          />
          <QuickStatCard
            label="Last Event"
            value={
              educator.lastEventDate ? formatDate(educator.lastEventDate) : "—"
            }
          />
        </div>

        {/* Key Details */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <DetailRow
              icon={MapPin}
              label="Location"
              value={`${educator.city}, ${educator.state}`}
            />
            <DetailRow
              icon={CalendarDays}
              label="Last Event"
              value={
                educator.lastEventDate
                  ? formatDate(educator.lastEventDate)
                  : "No events yet"
              }
            />
            <DetailRow
              icon={User}
              label="Status"
              value={
                educator.status.charAt(0).toUpperCase() +
                educator.status.slice(1)
              }
            />
          </CardContent>
        </Card>
      </section>

      {/* Specialties */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-foreground">Specialties</h2>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-1.5">
              {educator.specialties.map((s) => (
                <Badge
                  key={s}
                  variant="outline"
                  className="text-xs text-muted-foreground"
                >
                  <Award className="size-3 mr-1" />
                  {s}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quality Score Section */}
      {educator.qualityScore > 0 && (
        <section className="space-y-4">
          <h2 className="text-base font-semibold text-foreground">
            Quality Score
          </h2>

          {/* Score Overview */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-foreground">
                  Overall Score
                </p>
                <Badge variant="outline" className="text-xs tabular-nums">
                  {educator.qualityScore}/100
                </Badge>
              </div>
              <Progress value={educator.qualityScore} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground tabular-nums">
                {educator.trend === "up"
                  ? "Improving"
                  : educator.trend === "down"
                    ? "Declining"
                    : "Stable"}{" "}
                — based on last 90 days
              </p>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <p className="text-sm font-semibold text-foreground">Breakdown</p>
              <ScoreRow
                label="Reliability"
                score={Math.min(100, educator.qualityScore + 3)}
              />
              <ScoreRow
                label="On-Time Rate"
                score={Math.max(70, educator.qualityScore - 5)}
              />
              <ScoreRow
                label="Survey Quality"
                score={Math.min(100, educator.qualityScore + 1)}
              />
            </CardContent>
          </Card>
        </section>
      )}

      {/* Recent Activity */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-foreground">
          Recent Activity
        </h2>
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Event", "Account", "Date", "Status", "Units Sold"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs font-medium text-muted-foreground"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((ev) => (
                  <tr
                    key={ev.id}
                    className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-foreground">
                        {ev.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{ev.id}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">
                        {ev.account}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground tabular-nums">
                        {formatDate(ev.date)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {ev.status === "completed" ? (
                        <span className="inline-flex items-center gap-1 text-green-700 text-sm">
                          <CheckCircle2 className="size-3.5" />
                          Completed
                        </span>
                      ) : ev.status === "cancelled" ? (
                        <span className="inline-flex items-center gap-1 text-red-500 text-sm">
                          <XCircle className="size-3.5" />
                          Cancelled
                        </span>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                        >
                          Upcoming
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground tabular-nums">
                        {ev.salesUnits != null ? ev.salesUnits : "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      {/* Footer note */}
      <div className="border-t border-border pt-4">
        <p className="text-xs text-muted-foreground leading-normal">
          This is a read-only educator profile. Assignment management and
          scheduling is handled through the event workflow.
        </p>
      </div>
    </div>
  );
}
