import { Link } from "react-router";
import {
  CalendarDays,
  Radio,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Clock,
  MapPin,
  User,
  ChevronRight,
  Star,
  Send,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/shared/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/shared/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import {
  dashboardStats,
  attentionEvents,
  upcomingEvents,
  weeklyActivity,
  eventsTrend,
  topEducators,
  pendingOffersSummary,
} from "./dashboard-data";

// --- Chart Configs ---

const activityChartConfig: ChartConfig = {
  count: {
    label: "Events",
    color: "#7D152D",
  },
};

const trendChartConfig: ChartConfig = {
  events: {
    label: "Events",
    color: "#7D152D",
  },
};

// --- Stat Card Icons ---

const statIcons = [CalendarDays, Radio, AlertTriangle];

// --- Stat Card Component (ops pattern) ---

function StatCard({
  stat,
  icon: Icon,
}: {
  stat: (typeof dashboardStats)[0];
  icon: React.ElementType;
}) {
  return (
    <Link to={stat.href}>
      <Card className="gap-0 hover:border-primary/40 transition-colors">
        <CardHeader className="pb-2 pt-5 px-5">
          <div className="flex items-center justify-between">
            <CardDescription style={{ fontSize: "0.8125rem" }}>
              {stat.label}
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
            {stat.value}
          </div>
          {stat.trend && (
            <div className="flex items-center gap-1 mt-1.5">
              {stat.trend.value > 0 ? (
                <TrendingUp className="size-3.5 text-green-600" />
              ) : stat.trend.value < 0 ? (
                <TrendingDown className="size-3.5 text-red-500" />
              ) : (
                <span
                  className="text-muted-foreground"
                  style={{ fontSize: "0.75rem", fontWeight: 500 }}
                >
                  —
                </span>
              )}
              <span
                className={
                  stat.trend.value > 0
                    ? "text-green-600"
                    : stat.trend.value < 0
                      ? "text-red-500"
                      : "text-muted-foreground"
                }
                style={{ fontSize: "0.75rem", fontWeight: 500 }}
              >
                {stat.trend.value > 0 ? "+" : ""}
                {stat.trend.value !== 0 ? stat.trend.value : ""}
              </span>
              <span
                className="text-muted-foreground"
                style={{ fontSize: "0.75rem" }}
              >
                {stat.trend.label}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

// --- Status Badge Colors ---

const statusColors: Record<string, string> = {
  Upcoming: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Live: "bg-green-500/10 text-green-400 border-green-500/20",
  Completed: "bg-muted text-muted-foreground border-border",
};

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
          What needs your attention right now.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboardStats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} icon={statIcons[index]!} />
        ))}
      </div>

      {/* Pending Offers Summary */}
      {pendingOffersSummary.totalPendingOffers > 0 && (
        <Card className="gap-0 border-yellow-500/20 bg-yellow-500/[0.02]">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Send className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p
                    className="text-foreground"
                    style={{ fontSize: "0.875rem", fontWeight: 600 }}
                  >
                    Pending Offers
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Assignment offers awaiting educator response
                  </p>
                </div>
              </div>
              <Link
                to="/educator/events?filter=pending"
                className="text-primary hover:opacity-80 transition-opacity flex items-center gap-1"
                style={{ fontSize: "0.75rem", fontWeight: 500 }}
              >
                View all
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-3 py-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-3 h-3 text-yellow-600" />
                  <span
                    className="text-yellow-700"
                    style={{ fontSize: "0.625rem", fontWeight: 500 }}
                  >
                    Awaiting
                  </span>
                </div>
                <p
                  className="text-foreground"
                  style={{ fontSize: "1.25rem", fontWeight: 700 }}
                >
                  {pendingOffersSummary.awaitingResponse}
                </p>
              </div>
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span
                    className="text-emerald-700"
                    style={{ fontSize: "0.625rem", fontWeight: 500 }}
                  >
                    Accepted
                  </span>
                </div>
                <p
                  className="text-foreground"
                  style={{ fontSize: "1.25rem", fontWeight: 700 }}
                >
                  {pendingOffersSummary.acceptedToday}
                </p>
              </div>
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <XCircle className="w-3 h-3 text-red-500" />
                  <span
                    className="text-red-600"
                    style={{ fontSize: "0.625rem", fontWeight: 500 }}
                  >
                    Declined
                  </span>
                </div>
                <p
                  className="text-foreground"
                  style={{ fontSize: "1.25rem", fontWeight: 700 }}
                >
                  {pendingOffersSummary.declinedToday}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Events Trend - takes 2 cols */}
        <Card className="lg:col-span-2 gap-0">
          <CardHeader className="px-5 pt-5 pb-0">
            <CardTitle
              style={{
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Events Trend
            </CardTitle>
            <CardDescription style={{ fontSize: "0.8125rem" }}>
              Monthly event volume over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-4">
            <ChartContainer
              config={trendChartConfig}
              className="h-[260px] w-full"
            >
              <AreaChart
                data={eventsTrend}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="fillEvents" x1="0" y1="0" x2="0" y2="1">
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
                  stroke="#7D152D"
                  strokeWidth={2}
                  fill="url(#fillEvents)"
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
              Events this week
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

      {/* Events Requiring Attention */}
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                Events Requiring Attention
              </CardTitle>
              <CardDescription style={{ fontSize: "0.8125rem" }}>
                Unstaffed or awaiting finalization
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/educator/events?mode=finalize"
                className="text-amber-600 hover:opacity-80 transition-opacity flex items-center gap-1"
                style={{ fontSize: "0.8125rem" }}
              >
                Start Finalization Queue
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/educator/events"
                className="text-primary hover:opacity-80 transition-opacity flex items-center gap-1"
                style={{ fontSize: "0.8125rem" }}
              >
                View all events
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          {attentionEvents.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <AlertTriangle className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p>No events requiring attention right now.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {attentionEvents.map((event) => (
                <Link
                  key={event.id}
                  to={`/educator/events/${event.id}`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-foreground font-medium truncate">
                        {event.name}
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 font-medium ${statusColors[event.status]}`}
                        style={{ fontSize: "0.6875rem" }}
                      >
                        {event.status}
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-4 text-muted-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {event.date} · {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.venue}
                      </span>
                      {event.educator && (
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {event.educator}
                        </span>
                      )}
                    </div>
                    {event.attentionReason && (
                      <p
                        className="flex items-center gap-1.5 text-amber-500 font-medium"
                        style={{ fontSize: "0.75rem" }}
                      >
                        <AlertTriangle className="w-3 h-3" />
                        {event.attentionReason}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4" />
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bottom Row: Educator Performance + Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Educator Performance */}
        <Card className="gap-0">
          <CardHeader className="px-5 pt-5 pb-4">
            <CardTitle
              style={{
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Educator Performance
            </CardTitle>
            <CardDescription style={{ fontSize: "0.8125rem" }}>
              Top educators ranked by average rating
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="space-y-3">
              {topEducators.map((edu, i) => (
                <div
                  key={edu.name}
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
                        {edu.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className="flex items-center gap-1 text-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      <Star className="size-3.5 text-amber-400" />
                      {edu.avgRating}
                    </span>
                    <span
                      className="text-muted-foreground tabular-nums"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {edu.eventsThisMonth} events
                    </span>
                    {edu.trend === "up" ? (
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

        {/* Upcoming Events */}
        <Card className="gap-0">
          <CardHeader className="px-5 pt-5 pb-4">
            <CardTitle
              style={{
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Upcoming Events
            </CardTitle>
            <CardDescription style={{ fontSize: "0.8125rem" }}>
              Next scheduled events for your team
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="divide-y divide-border">
              {upcomingEvents
                .filter((e) => e.status === "Upcoming")
                .map((event) => (
                  <Link
                    key={event.id}
                    to={`/educator/events/${event.id}`}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-foreground font-medium truncate">
                        {event.name}
                      </p>
                      <div
                        className="flex items-center gap-4 text-muted-foreground"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {event.date} · {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {event.venue}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {event.educator || "Unassigned"}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4" />
                  </Link>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
