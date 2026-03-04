import React from "react";
import {
  Building2,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Users,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/components/ui/card";
import { Badge } from "../../shared/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../shared/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

// --- Mock Data ---

const growthData = [
  { month: "Jul", orgs: 18, events: 42 },
  { month: "Aug", orgs: 22, events: 58 },
  { month: "Sep", orgs: 28, events: 71 },
  { month: "Oct", orgs: 35, events: 89 },
  { month: "Nov", orgs: 41, events: 103 },
  { month: "Dec", orgs: 46, events: 118 },
  { month: "Jan", orgs: 52, events: 134 },
  { month: "Feb", orgs: 57, events: 152 },
  { month: "Mar", orgs: 64, events: 168 },
];

const topOrgs = [
  { name: "Acme Corp", events: 34, trend: "up" as const },
  { name: "Vanguard LLC", events: 28, trend: "up" as const },
  { name: "Zenith Group", events: 22, trend: "down" as const },
  { name: "Nova Systems", events: 19, trend: "up" as const },
  { name: "Apex Holdings", events: 15, trend: "down" as const },
];

const recentEvents = [
  {
    id: "EVT-2047",
    name: "Annual Charity Gala",
    org: "Acme Corp",
    date: "Mar 2, 2026",
    status: "Active",
  },
  {
    id: "EVT-2046",
    name: "Spring Fundraiser",
    org: "Vanguard LLC",
    date: "Mar 1, 2026",
    status: "Active",
  },
  {
    id: "EVT-2045",
    name: "Corporate Mixer",
    org: "Zenith Group",
    date: "Feb 28, 2026",
    status: "Completed",
  },
  {
    id: "EVT-2044",
    name: "Community Outreach",
    org: "Nova Systems",
    date: "Feb 27, 2026",
    status: "Active",
  },
  {
    id: "EVT-2043",
    name: "Board Meeting",
    org: "Apex Holdings",
    date: "Feb 26, 2026",
    status: "Completed",
  },
];

const weeklyActivity = [
  { day: "Mon", count: 14 },
  { day: "Tue", count: 22 },
  { day: "Wed", count: 18 },
  { day: "Thu", count: 31 },
  { day: "Fri", count: 27 },
  { day: "Sat", count: 9 },
  { day: "Sun", count: 5 },
];

const growthChartConfig: ChartConfig = {
  orgs: {
    label: "Organizations",
    color: "#7D152D",
  },
  events: {
    label: "Events",
    color: "#E2E8F0",
  },
};

const activityChartConfig: ChartConfig = {
  count: {
    label: "Events",
    color: "#7D152D",
  },
};

// --- Stat Card Component ---

function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string;
  change: string;
  changeLabel: string;
  icon: React.ElementType;
  trend: "up" | "down";
}) {
  return (
    <Card className="gap-0">
      <CardHeader className="pb-2 pt-5 px-5">
        <div className="flex items-center justify-between">
          <CardDescription style={{ fontSize: "0.8125rem" }}>
            {title}
          </CardDescription>
          <div className="flex items-center justify-center size-8 rounded-md bg-[#7D152D]/8">
            <Icon className="size-4 text-[#7D152D]" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div
          className="text-foreground"
          style={{
            fontSize: "1.75rem",
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {value}
        </div>
        <div className="flex items-center gap-1 mt-1.5">
          {trend === "up" ? (
            <TrendingUp className="size-3.5 text-green-600" />
          ) : (
            <TrendingDown className="size-3.5 text-red-500" />
          )}
          <span
            className={trend === "up" ? "text-green-600" : "text-red-500"}
            style={{ fontSize: "0.75rem", fontWeight: 500 }}
          >
            {change}
          </span>
          <span
            className="text-muted-foreground"
            style={{ fontSize: "0.75rem" }}
          >
            {changeLabel}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Main Dashboard ---

export function Dashboard() {
  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      <div>
        <h1 className="text-foreground">Dashboard</h1>
        <p
          className="text-muted-foreground mt-1"
          style={{ fontSize: "0.875rem" }}
        >
          Platform overview and key metrics at a glance.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Organizations"
          value="64"
          change="+12.3%"
          changeLabel="from last month"
          icon={Building2}
          trend="up"
        />
        <StatCard
          title="Active Events"
          value="168"
          change="+10.5%"
          changeLabel="from last month"
          icon={CalendarDays}
          trend="up"
        />
        <StatCard
          title="Active Users"
          value="312"
          change="+4.7%"
          changeLabel="from last month"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Avg. Events / Org"
          value="2.6"
          change="-0.3"
          changeLabel="from last month"
          icon={Activity}
          trend="down"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Platform Growth - takes 2 cols */}
        <Card className="lg:col-span-2 gap-0">
          <CardHeader className="px-5 pt-5 pb-0">
            <CardTitle
              style={{
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Platform Growth
            </CardTitle>
            <CardDescription style={{ fontSize: "0.8125rem" }}>
              Organizations and events over the last 9 months
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-4">
            <ChartContainer
              config={growthChartConfig}
              className="h-[260px] w-full"
            >
              <AreaChart
                data={growthData}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="fillOrgs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7D152D" stopOpacity={0.2} />
                    <stop
                      offset="100%"
                      stopColor="#7D152D"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  style={{ fontSize: "0.75rem" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  style={{ fontSize: "0.75rem" }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="events"
                  type="monotone"
                  stroke="#E2E8F0"
                  strokeWidth={1.5}
                  fill="transparent"
                  dot={false}
                />
                <Area
                  dataKey="orgs"
                  type="monotone"
                  stroke="#7D152D"
                  strokeWidth={2}
                  fill="url(#fillOrgs)"
                  dot={false}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Weekly Activity - 1 col */}
        <Card className="gap-0">
          <CardHeader className="px-5 pt-5 pb-0">
            <CardTitle
              style={{
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Weekly Activity
            </CardTitle>
            <CardDescription style={{ fontSize: "0.8125rem" }}>
              Events created this week
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-4">
            <ChartContainer
              config={activityChartConfig}
              className="h-[260px] w-full"
            >
              <BarChart
                data={weeklyActivity}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  style={{ fontSize: "0.75rem" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  style={{ fontSize: "0.75rem" }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="count"
                  fill="#7D152D"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Top Orgs + Recent Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Organizations */}
        <Card className="gap-0">
          <CardHeader className="px-5 pt-5 pb-4">
            <CardTitle
              style={{
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Top Organizations
            </CardTitle>
            <CardDescription style={{ fontSize: "0.8125rem" }}>
              Ranked by event count this month
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="space-y-3">
              {topOrgs.map((org, i) => (
                <div
                  key={org.name}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="flex items-center justify-center size-7 rounded-md bg-muted text-muted-foreground shrink-0"
                      style={{ fontSize: "0.75rem", fontWeight: 500 }}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p
                        className="text-foreground truncate"
                        style={{ fontSize: "0.875rem", fontWeight: 500 }}
                      >
                        {org.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="text-muted-foreground tabular-nums"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {org.events} events
                    </span>
                    {org.trend === "up" ? (
                      <ArrowUpRight className="size-3.5 text-green-600" />
                    ) : (
                      <TrendingDown className="size-3.5 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Events */}
        <Card className="gap-0">
          <CardHeader className="px-5 pt-5 pb-4">
            <CardTitle
              style={{
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Recent Events
            </CardTitle>
            <CardDescription style={{ fontSize: "0.8125rem" }}>
              Latest events across all organizations
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="space-y-3">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p
                        className="text-foreground truncate"
                        style={{ fontSize: "0.875rem", fontWeight: 500 }}
                      >
                        {event.name}
                      </p>
                    </div>
                    <p
                      className="text-muted-foreground truncate"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {event.org} · {event.date}
                    </p>
                  </div>
                  <Badge
                    variant={
                      event.status === "Active" ? "default" : "secondary"
                    }
                    className={
                      event.status === "Active"
                        ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                        : "bg-muted text-muted-foreground"
                    }
                    style={{ fontSize: "0.6875rem" }}
                  >
                    {event.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
