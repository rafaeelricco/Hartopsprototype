import React, { useState } from "react";
import {
  Download,
  FileSpreadsheet,
  TrendingUp,
  TrendingDown,
  Minus,
  Camera,
  MessageSquare,
  Package,
  Building2,
  Megaphone,
  User,
  ArrowUpDown,
  Activity,
  Users,
  CalendarCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Progress } from "./ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

/* ------------------------------------------------------------------ */
/* Mock data — Growth Charts                                           */
/* ------------------------------------------------------------------ */

const MONTHLY_GROWTH = [
  { month: "Sep", events: 42, organizations: 5, users: 120 },
  { month: "Oct", events: 56, organizations: 6, users: 148 },
  { month: "Nov", events: 68, organizations: 6, users: 175 },
  { month: "Dec", events: 51, organizations: 7, users: 192 },
  { month: "Jan", events: 74, organizations: 7, users: 218 },
  { month: "Feb", events: 89, organizations: 8, users: 265 },
  { month: "Mar", events: 34, organizations: 8, users: 280 },
];

const WEEKLY_EVENTS = [
  { week: "W5", events: 18, checkins: 1420 },
  { week: "W6", events: 22, checkins: 1860 },
  { week: "W7", events: 25, checkins: 2100 },
  { week: "W8", events: 20, checkins: 1750 },
  { week: "W9", events: 28, checkins: 2340 },
  { week: "W10", events: 15, checkins: 980 },
];

/* ------------------------------------------------------------------ */
/* Mock data — Top Performers                                          */
/* ------------------------------------------------------------------ */

const TOP_CLIENTS = [
  { rank: 1, name: "Acme Corp", events: 34, qualityScore: 94, trend: "up" as const },
  { rank: 2, name: "Zenith Group", events: 22, qualityScore: 91, trend: "up" as const },
  { rank: 3, name: "Nova Systems", events: 19, qualityScore: 88, trend: "stable" as const },
  { rank: 4, name: "Meridian Partners", events: 12, qualityScore: 86, trend: "up" as const },
  { rank: 5, name: "Vanguard LLC", events: 28, qualityScore: 82, trend: "down" as const },
];

const TOP_CAMPAIGNS = [
  { rank: 1, name: "Spring Product Launch", org: "Multi-org", events: 14, qualityScore: 96, trend: "up" as const },
  { rank: 2, name: "Customer Appreciation Week", org: "Zenith Group", events: 8, qualityScore: 93, trend: "up" as const },
  { rank: 3, name: "Q1 Brand Awareness", org: "Multi-org", events: 12, qualityScore: 89, trend: "stable" as const },
  { rank: 4, name: "Holiday Season Campaign", org: "Multi-org", events: 10, qualityScore: 87, trend: "down" as const },
  { rank: 5, name: "Annual Giving Drive", org: "Acme Corp", events: 6, qualityScore: 84, trend: "stable" as const },
];

const TOP_EDUCATORS = [
  { rank: 1, name: "John Doe", org: "Acme Corp", eventsLed: 12, qualityScore: 97, trend: "up" as const },
  { rank: 2, name: "Maria Lopez", org: "Zenith Group", eventsLed: 9, qualityScore: 95, trend: "up" as const },
  { rank: 3, name: "Sarah Chen", org: "Vanguard LLC", eventsLed: 11, qualityScore: 92, trend: "stable" as const },
  { rank: 4, name: "Alex Kim", org: "Nova Systems", eventsLed: 8, qualityScore: 90, trend: "stable" as const },
  { rank: 5, name: "Diana Ross", org: "Meridian Partners", eventsLed: 7, qualityScore: 88, trend: "down" as const },
];

/* ------------------------------------------------------------------ */
/* Mock data — Data Quality                                            */
/* ------------------------------------------------------------------ */

const PLATFORM_QUALITY = {
  overall: 87,
  photos: 91,
  questions: 84,
  inventory: 86,
  changeFromLastMonth: 2,
};

const QUALITY_TREND = [
  { month: "Sep", photos: 82, questions: 74, inventory: 78, overall: 78 },
  { month: "Oct", photos: 84, questions: 76, inventory: 80, overall: 80 },
  { month: "Nov", photos: 86, questions: 78, inventory: 82, overall: 82 },
  { month: "Dec", photos: 87, questions: 79, inventory: 83, overall: 83 },
  { month: "Jan", photos: 89, questions: 81, inventory: 84, overall: 85 },
  { month: "Feb", photos: 90, questions: 83, inventory: 85, overall: 86 },
  { month: "Mar", photos: 91, questions: 84, inventory: 86, overall: 87 },
];

interface OrgQuality {
  id: number;
  name: string;
  overall: number;
  photos: number;
  questions: number;
  inventory: number;
  trend: "up" | "down" | "stable";
  change: number;
  events: number;
}

const ORG_QUALITY: OrgQuality[] = [
  { id: 1, name: "Acme Corp", overall: 94, photos: 96, questions: 92, inventory: 94, trend: "up", change: 3, events: 34 },
  { id: 3, name: "Zenith Group", overall: 91, photos: 93, questions: 88, inventory: 92, trend: "up", change: 4, events: 22 },
  { id: 4, name: "Nova Systems", overall: 88, photos: 90, questions: 85, inventory: 89, trend: "stable", change: 0, events: 19 },
  { id: 6, name: "Meridian Partners", overall: 86, photos: 89, questions: 82, inventory: 87, trend: "up", change: 2, events: 12 },
  { id: 8, name: "Pinnacle Ventures", overall: 85, photos: 88, questions: 81, inventory: 86, trend: "stable", change: 0, events: 11 },
  { id: 2, name: "Vanguard LLC", overall: 82, photos: 85, questions: 78, inventory: 83, trend: "down", change: -2, events: 28 },
  { id: 7, name: "Catalyst Inc.", overall: 79, photos: 82, questions: 74, inventory: 81, trend: "down", change: -3, events: 8 },
  { id: 5, name: "Apex Holdings", overall: 71, photos: 74, questions: 66, inventory: 73, trend: "down", change: -5, events: 15 },
];

/* ------------------------------------------------------------------ */
/* Mock data — Campaign Quality (change #2)                            */
/* ------------------------------------------------------------------ */

interface CampaignQuality {
  id: number;
  name: string;
  org: string;
  overall: number;
  photos: number;
  questions: number;
  inventory: number;
  trend: "up" | "down" | "stable";
  change: number;
  events: number;
}

const CAMPAIGN_QUALITY: CampaignQuality[] = [
  { id: 1, name: "Spring Product Launch", org: "Multi-org", overall: 96, photos: 98, questions: 94, inventory: 96, trend: "up", change: 3, events: 14 },
  { id: 2, name: "Customer Appreciation Week", org: "Zenith Group", overall: 93, photos: 95, questions: 90, inventory: 94, trend: "up", change: 2, events: 8 },
  { id: 3, name: "Q1 Brand Awareness", org: "Multi-org", overall: 89, photos: 91, questions: 86, inventory: 90, trend: "stable", change: 0, events: 12 },
  { id: 4, name: "Holiday Season Campaign", org: "Multi-org", overall: 87, photos: 90, questions: 83, inventory: 88, trend: "down", change: -2, events: 10 },
  { id: 5, name: "Annual Giving Drive", org: "Acme Corp", overall: 84, photos: 87, questions: 80, inventory: 85, trend: "stable", change: 0, events: 6 },
  { id: 6, name: "Back-to-School Outreach", org: "Vanguard LLC", overall: 78, photos: 80, questions: 73, inventory: 81, trend: "down", change: -4, events: 9 },
  { id: 7, name: "Year-End Review Push", org: "Apex Holdings", overall: 68, photos: 72, questions: 62, inventory: 70, trend: "down", change: -6, events: 5 },
];

/* ------------------------------------------------------------------ */
/* Percentage dataKeys set (change #3 — tooltip fix)                   */
/* ------------------------------------------------------------------ */

const PERCENTAGE_KEYS = new Set([
  "overall", "photos", "questions", "inventory", "qualityScore",
]);

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function TrendIcon({ trend, className = "size-4" }: { trend: "up" | "down" | "stable"; className?: string }) {
  switch (trend) {
    case "up":
      return <TrendingUp className={`${className} text-green-600`} />;
    case "down":
      return <TrendingDown className={`${className} text-red-500`} />;
    case "stable":
      return <Minus className={`${className} text-muted-foreground`} />;
  }
}

function TrendBadge({ trend, change }: { trend: "up" | "down" | "stable"; change: number }) {
  const color =
    trend === "up"
      ? "bg-green-50 text-green-700 border-green-200"
      : trend === "down"
        ? "bg-red-50 text-red-600 border-red-200"
        : "bg-muted text-muted-foreground border-border";

  return (
    <Badge variant="secondary" className={color} style={{ fontSize: "0.6875rem" }}>
      <TrendIcon trend={trend} className="size-3.5" />
      <span className="ml-0.5">
        {trend === "stable" ? "Stable" : `${change > 0 ? "+" : ""}${change}pp`}
      </span>
    </Badge>
  );
}

function getScoreColor(score: number) {
  if (score >= 90) return "text-green-600";
  if (score >= 80) return "text-foreground";
  if (score >= 70) return "text-amber-600";
  return "text-red-600";
}

function getScoreBarColor(score: number) {
  if (score >= 90) return "[&>div]:bg-green-500";
  if (score >= 80) return "[&>div]:bg-[#7D152D]";
  if (score >= 70) return "[&>div]:bg-amber-500";
  return "[&>div]:bg-red-500";
}

/* ------------------------------------------------------------------ */
/* Custom Recharts tooltip (change #3 — fixed operator precedence)     */
/* ------------------------------------------------------------------ */

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2">
      <p className="text-foreground mb-1" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
        {label}
      </p>
      {payload.map((entry: any, i: number) => {
        const isPercentage = PERCENTAGE_KEYS.has(entry.dataKey);
        return (
          <div key={i} className="flex items-center gap-2">
            <span
              className="inline-block size-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground" style={{ fontSize: "0.6875rem" }}>
              {entry.name}: {entry.value}{isPercentage ? "%" : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tab label helpers (change #7 — contextual export labels)            */
/* ------------------------------------------------------------------ */

const TAB_EXPORT_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  "data-quality": "Quality Report",
};

/* ------------------------------------------------------------------ */
/* Main Component                                                      */
/* ------------------------------------------------------------------ */

export function ReportsPage() {
  const [dateRange, setDateRange] = useState("6m");
  const [activeTab, setActiveTab] = useState("dashboard");

  const exportLabel = TAB_EXPORT_LABELS[activeTab] || "Report";

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-foreground">Reports & Data Quality</h1>
          <p className="text-muted-foreground mt-1" style={{ fontSize: "0.875rem" }}>
            Platform-wide performance metrics and data quality monitoring.
          </p>
        </div>
        {/* Change #7: contextual export labels */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            className="cursor-pointer"
            style={{ fontSize: "0.8125rem" }}
          >
            <Download className="size-4" />
            Export {exportLabel} PDF
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer"
            style={{ fontSize: "0.8125rem" }}
          >
            <FileSpreadsheet className="size-4" />
            Export {exportLabel} Excel
          </Button>
        </div>
      </div>

      {/* Change #6: Date range selector above tabs — shared across both */}
      <div className="flex items-center justify-end">
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[160px] cursor-pointer" style={{ fontSize: "0.8125rem" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="12m">Last 12 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start h-auto p-0 gap-0">
          {["Dashboard", "Data Quality"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase().replace(" ", "-")}
              className="rounded-none border-b-2 border-transparent bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-[#7D152D] data-[state=active]:text-[#7D152D] data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-[#7D152D] hover:text-foreground px-4 py-2.5 cursor-pointer"
              style={{ fontSize: "0.8125rem" }}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ============================================================ */}
        {/* Dashboard Tab                                                 */}
        {/* ============================================================ */}
        <TabsContent value="dashboard" className="mt-6 space-y-6">

          {/* Change #1: Platform Health summary row — DQ Score visible on landing */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Primary KPI — Data Quality Score */}
            <Card className="gap-0 border-[#7D152D]/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center justify-center size-8 rounded-lg bg-[#7D152D]/10">
                    <Activity className="size-4 text-[#7D152D]" />
                  </div>
                  <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                    Data Quality Score
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <p
                    className="text-[#7D152D] tabular-nums"
                    style={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.1 }}
                  >
                    {PLATFORM_QUALITY.overall}%
                  </p>
                  <div className="flex items-center gap-1 mb-0.5">
                    <TrendingUp className="size-3 text-green-600" />
                    <span className="text-green-600" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>
                      +{PLATFORM_QUALITY.changeFromLastMonth}pp
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Events */}
            <Card className="gap-0">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center justify-center size-8 rounded-lg bg-[#7D152D]/10">
                    <CalendarCheck className="size-4 text-[#7D152D]" />
                  </div>
                  <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                    Total Events
                  </span>
                </div>
                <p
                  className="text-foreground tabular-nums"
                  style={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.1 }}
                >
                  414
                </p>
              </CardContent>
            </Card>

            {/* Total Organizations */}
            <Card className="gap-0">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center justify-center size-8 rounded-lg bg-[#7D152D]/10">
                    <Building2 className="size-4 text-[#7D152D]" />
                  </div>
                  <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                    Organizations
                  </span>
                </div>
                <p
                  className="text-foreground tabular-nums"
                  style={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.1 }}
                >
                  8
                </p>
              </CardContent>
            </Card>

            {/* Total Users */}
            <Card className="gap-0">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center justify-center size-8 rounded-lg bg-[#7D152D]/10">
                    <Users className="size-4 text-[#7D152D]" />
                  </div>
                  <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                    Active Users
                  </span>
                </div>
                <p
                  className="text-foreground tabular-nums"
                  style={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.1 }}
                >
                  280
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Growth Charts Row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Platform Growth */}
            <Card className="gap-0">
              <CardHeader className="pb-2">
                <CardTitle style={{ fontSize: "0.875rem" }}>Platform Growth</CardTitle>
                <CardDescription style={{ fontSize: "0.75rem" }}>
                  Events, organizations, and users over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={MONTHLY_GROWTH}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94A3B8" />
                      <YAxis tick={{ fontSize: 11 }} stroke="#94A3B8" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        wrapperStyle={{ fontSize: "0.6875rem" }}
                        iconType="circle"
                        iconSize={8}
                      />
                      <Line
                        type="monotone"
                        dataKey="events"
                        name="Events"
                        stroke="#7D152D"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#7D152D" }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="users"
                        name="Users"
                        stroke="#6366F1"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#6366F1" }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="organizations"
                        name="Organizations"
                        stroke="#0EA5E9"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#0EA5E9" }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Event Activity */}
            <Card className="gap-0">
              <CardHeader className="pb-2">
                <CardTitle style={{ fontSize: "0.875rem" }}>Weekly Event Activity</CardTitle>
                <CardDescription style={{ fontSize: "0.75rem" }}>
                  Events held and total check-ins per week
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={WEEKLY_EVENTS}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#94A3B8" />
                      <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#94A3B8" />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#94A3B8" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        wrapperStyle={{ fontSize: "0.6875rem" }}
                        iconType="circle"
                        iconSize={8}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="events"
                        name="Events"
                        fill="#7D152D"
                        radius={[4, 4, 0, 0]}
                        barSize={24}
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="checkins"
                        name="Check-ins"
                        fill="#7D152D"
                        fillOpacity={0.25}
                        radius={[4, 4, 0, 0]}
                        barSize={24}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers — change #4: trend indicators on all tables */}
          <div>
            <p className="text-foreground mb-4" style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
              Top Performers
            </p>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Top Clients */}
              <Card className="gap-0">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="size-4 text-[#7D152D]" />
                    <CardTitle style={{ fontSize: "0.8125rem" }}>Top Clients</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-4 py-2 text-muted-foreground" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>#</th>
                        <th className="text-left px-4 py-2 text-muted-foreground" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>Client</th>
                        <th className="text-right px-4 py-2 text-muted-foreground" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>Score</th>
                        <th className="text-right px-4 py-2 text-muted-foreground" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TOP_CLIENTS.map((c) => (
                        <tr key={c.rank} className="border-b border-border last:border-0">
                          <td className="px-4 py-2.5 text-muted-foreground tabular-nums" style={{ fontSize: "0.75rem" }}>{c.rank}</td>
                          <td className="px-4 py-2.5">
                            <span className="text-foreground" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>{c.name}</span>
                            <span className="text-muted-foreground block" style={{ fontSize: "0.6875rem" }}>{c.events} events</span>
                          </td>
                          <td className={`px-4 py-2.5 text-right tabular-nums ${getScoreColor(c.qualityScore)}`} style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
                            {c.qualityScore}%
                          </td>
                          <td className="px-4 py-2.5 text-right">
                            <TrendIcon trend={c.trend} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* Top Campaigns — change #4: added Trend column */}
              <Card className="gap-0">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Megaphone className="size-4 text-[#7D152D]" />
                    <CardTitle style={{ fontSize: "0.8125rem" }}>Top Campaigns</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-4 py-2 text-muted-foreground" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>#</th>
                        <th className="text-left px-4 py-2 text-muted-foreground" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>Campaign</th>
                        <th className="text-right px-4 py-2 text-muted-foreground" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>Score</th>
                        <th className="text-right px-4 py-2 text-muted-foreground" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TOP_CAMPAIGNS.map((c) => (
                        <tr key={c.rank} className="border-b border-border last:border-0">
                          <td className="px-4 py-2.5 text-muted-foreground tabular-nums" style={{ fontSize: "0.75rem" }}>{c.rank}</td>
                          <td className="px-4 py-2.5">
                            <span className="text-foreground" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>{c.name}</span>
                            <span className="text-muted-foreground block" style={{ fontSize: "0.6875rem" }}>{c.org} · {c.events} events</span>
                          </td>
                          <td className={`px-4 py-2.5 text-right tabular-nums ${getScoreColor(c.qualityScore)}`} style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
                            {c.qualityScore}%
                          </td>
                          <td className="px-4 py-2.5 text-right">
                            <TrendIcon trend={c.trend} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* Top Educators — change #4: added Trend column */}
              <Card className="gap-0">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <User className="size-4 text-[#7D152D]" />
                    <CardTitle style={{ fontSize: "0.8125rem" }}>Top Educators</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-4 py-2 text-muted-foreground" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>#</th>
                        <th className="text-left px-4 py-2 text-muted-foreground" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>Educator</th>
                        <th className="text-right px-4 py-2 text-muted-foreground" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>Score</th>
                        <th className="text-right px-4 py-2 text-muted-foreground" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TOP_EDUCATORS.map((e) => (
                        <tr key={e.rank} className="border-b border-border last:border-0">
                          <td className="px-4 py-2.5 text-muted-foreground tabular-nums" style={{ fontSize: "0.75rem" }}>{e.rank}</td>
                          <td className="px-4 py-2.5">
                            <span className="text-foreground" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>{e.name}</span>
                            <span className="text-muted-foreground block" style={{ fontSize: "0.6875rem" }}>{e.org} · {e.eventsLed} events led</span>
                          </td>
                          <td className={`px-4 py-2.5 text-right tabular-nums ${getScoreColor(e.qualityScore)}`} style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
                            {e.qualityScore}%
                          </td>
                          <td className="px-4 py-2.5 text-right">
                            <TrendIcon trend={e.trend} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ============================================================ */}
        {/* Data Quality Tab                                              */}
        {/* ============================================================ */}
        <TabsContent value="data-quality" className="mt-6 space-y-6">
          {/* Platform-Wide Score */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Overall Score — Anchor */}
            <Card className="gap-0 lg:row-span-1">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground mb-1" style={{ fontSize: "0.75rem" }}>
                  Platform Data Quality Score
                </p>
                <p
                  className="text-[#7D152D] tabular-nums"
                  style={{ fontSize: "3rem", fontWeight: 700, lineHeight: 1.1 }}
                >
                  {PLATFORM_QUALITY.overall}%
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <TrendingUp className="size-3.5 text-green-600" />
                  <span className="text-green-600" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                    +{PLATFORM_QUALITY.changeFromLastMonth}pp from last month
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Dimension Breakdown — change #5: normalized opacity to /10 */}
            <DimensionCard
              icon={Camera}
              label="Photos"
              score={PLATFORM_QUALITY.photos}
              description="Photo upload completeness across all events"
            />
            <DimensionCard
              icon={MessageSquare}
              label="Questions"
              score={PLATFORM_QUALITY.questions}
              description="Survey and question response rates"
            />
            <DimensionCard
              icon={Package}
              label="Inventory"
              score={PLATFORM_QUALITY.inventory}
              description="Inventory tracking data completeness"
            />
          </div>

          {/* Quality Trend Chart */}
          <Card className="gap-0">
            <CardHeader className="pb-2">
              <CardTitle style={{ fontSize: "0.875rem" }}>Quality Score Trend</CardTitle>
              <CardDescription style={{ fontSize: "0.75rem" }}>
                Platform-wide data quality by dimension over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={QUALITY_TREND}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94A3B8" />
                    <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} stroke="#94A3B8" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ fontSize: "0.6875rem" }}
                      iconType="circle"
                      iconSize={8}
                    />
                    <Area
                      type="monotone"
                      dataKey="overall"
                      name="Overall"
                      stroke="#7D152D"
                      fill="#7D152D"
                      fillOpacity={0.08}
                      strokeWidth={2}
                      dot={{ r: 3, fill: "#7D152D" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="photos"
                      name="Photos"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.05}
                      strokeWidth={1.5}
                      dot={{ r: 2, fill: "#8B5CF6" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="questions"
                      name="Questions"
                      stroke="#0EA5E9"
                      fill="#0EA5E9"
                      fillOpacity={0.05}
                      strokeWidth={1.5}
                      dot={{ r: 2, fill: "#0EA5E9" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="inventory"
                      name="Inventory"
                      stroke="#F59E0B"
                      fill="#F59E0B"
                      fillOpacity={0.05}
                      strokeWidth={1.5}
                      dot={{ r: 2, fill: "#F59E0B" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Per-Organization Quality Breakdown */}
          <Card className="gap-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle style={{ fontSize: "0.875rem" }}>Organization Quality Breakdown</CardTitle>
                  <CardDescription style={{ fontSize: "0.75rem" }}>
                    Per-organization data quality scores with trend indicators
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      {["Organization", "Overall", "Photos", "Questions", "Inventory", "Events", "Trend"].map((h) => (
                        <th
                          key={h}
                          className={`px-5 py-3 text-muted-foreground ${h === "Organization" ? "text-left" : "text-right"}`}
                          style={{ fontSize: "0.75rem", fontWeight: 500 }}
                        >
                          <span className="inline-flex items-center gap-1">
                            {h}
                            <ArrowUpDown className="size-3" />
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ORG_QUALITY.map((org) => (
                      <tr
                        key={org.id}
                        className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-7 rounded-md bg-muted shrink-0">
                              <Building2 className="size-3.5 text-muted-foreground" />
                            </div>
                            <span className="text-foreground" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>
                              {org.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span className={`tabular-nums ${getScoreColor(org.overall)}`} style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
                            {org.overall}%
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span className="text-muted-foreground tabular-nums" style={{ fontSize: "0.8125rem" }}>
                            {org.photos}%
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span className="text-muted-foreground tabular-nums" style={{ fontSize: "0.8125rem" }}>
                            {org.questions}%
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span className="text-muted-foreground tabular-nums" style={{ fontSize: "0.8125rem" }}>
                            {org.inventory}%
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right text-muted-foreground tabular-nums" style={{ fontSize: "0.8125rem" }}>
                          {org.events}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <TrendBadge trend={org.trend} change={org.change} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Change #2: Per-Campaign Quality Breakdown */}
          <Card className="gap-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle style={{ fontSize: "0.875rem" }}>Campaign Quality Breakdown</CardTitle>
                  <CardDescription style={{ fontSize: "0.75rem" }}>
                    Per-campaign data quality scores across organizations
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      {["Campaign", "Organization", "Overall", "Photos", "Questions", "Inventory", "Events", "Trend"].map((h) => (
                        <th
                          key={h}
                          className={`px-5 py-3 text-muted-foreground ${h === "Campaign" || h === "Organization" ? "text-left" : "text-right"}`}
                          style={{ fontSize: "0.75rem", fontWeight: 500 }}
                        >
                          <span className="inline-flex items-center gap-1">
                            {h}
                            <ArrowUpDown className="size-3" />
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CAMPAIGN_QUALITY.map((cq) => (
                      <tr
                        key={cq.id}
                        className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-7 rounded-md bg-muted shrink-0">
                              <Megaphone className="size-3.5 text-muted-foreground" />
                            </div>
                            <span className="text-foreground" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>
                              {cq.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
                            {cq.org}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span className={`tabular-nums ${getScoreColor(cq.overall)}`} style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
                            {cq.overall}%
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span className="text-muted-foreground tabular-nums" style={{ fontSize: "0.8125rem" }}>
                            {cq.photos}%
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span className="text-muted-foreground tabular-nums" style={{ fontSize: "0.8125rem" }}>
                            {cq.questions}%
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span className="text-muted-foreground tabular-nums" style={{ fontSize: "0.8125rem" }}>
                            {cq.inventory}%
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right text-muted-foreground tabular-nums" style={{ fontSize: "0.8125rem" }}>
                          {cq.events}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <TrendBadge trend={cq.trend} change={cq.change} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Loop CTA */}
          <Card className="gap-0 border-amber-200 bg-amber-50/50">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="flex items-center justify-center size-9 rounded-lg bg-amber-100 shrink-0 mt-0.5">
                <TrendingDown className="size-4 text-amber-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-foreground" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
                  Quality Attention Required
                </p>
                <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                  {ORG_QUALITY.filter((o) => o.trend === "down").length} organization(s) and{" "}
                  {CAMPAIGN_QUALITY.filter((c) => c.trend === "down").length} campaign(s) show declining
                  data quality scores.{" "}
                  {(() => {
                    const lowOrgs = ORG_QUALITY.filter((o) => o.overall < 75).map((o) => o.name);
                    const lowCampaigns = CAMPAIGN_QUALITY.filter((c) => c.overall < 75).map((c) => c.name);
                    const combined = [...lowOrgs, ...lowCampaigns];
                    if (combined.length === 0) return null;
                    return (
                      <>
                        <strong>{combined.join(", ")}</strong>{" "}
                        {combined.length === 1 ? "is" : "are"} below the 75% threshold
                        and may require investigation.
                      </>
                    );
                  })()}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dimension Card (sub-component) — change #5: normalized bg opacity   */
/* ------------------------------------------------------------------ */

function DimensionCard({
  icon: Icon,
  label,
  score,
  description,
}: {
  icon: React.ElementType;
  label: string;
  score: number;
  description: string;
}) {
  return (
    <Card className="gap-0">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center justify-center size-8 rounded-lg bg-[#7D152D]/10">
            <Icon className="size-4 text-[#7D152D]" />
          </div>
          <span className="text-foreground" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
            {label}
          </span>
        </div>
        <p
          className={`tabular-nums ${getScoreColor(score)}`}
          style={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.1 }}
        >
          {score}%
        </p>
        <div className="mt-3">
          <Progress value={score} className={`h-1.5 ${getScoreBarColor(score)}`} />
        </div>
        <p className="text-muted-foreground mt-2" style={{ fontSize: "0.6875rem" }}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
