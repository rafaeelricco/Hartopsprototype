import { Link } from "react-router";
import {
  CalendarDays,
  Radio,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  MapPin,
  User,
  ChevronRight,
} from "lucide-react";
import {
  dashboardStats,
  attentionEvents,
  upcomingEvents,
} from "./dashboard-data";

const statIcons = [CalendarDays, Radio, AlertTriangle];

const statusColors: Record<string, string> = {
  Upcoming:
    "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Live: "bg-green-500/10 text-green-400 border-green-500/20",
  Completed:
    "bg-muted text-muted-foreground border-border",
};

export function Dashboard() {
  return (
    <div className="p-6 space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1" style={{ fontSize: "0.875rem" }}>
          What needs your attention right now.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {dashboardStats.map((stat, index) => {
          const Icon = statIcons[index]!;
          return (
            <Link
              key={stat.label}
              to={stat.href}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <p
                    className="text-muted-foreground font-medium"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  {stat.trend && (
                    <div className="flex items-center gap-1.5">
                      {stat.trend.value > 0 ? (
                        <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                      ) : stat.trend.value < 0 ? (
                        <TrendingDown className="w-3.5 h-3.5 text-amber-500" />
                      ) : (
                        <Minus className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                      <span
                        className="text-muted-foreground"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {stat.trend.value > 0 ? "+" : ""}
                        {stat.trend.value} {stat.trend.label}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
              <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          );
        })}
      </div>

      {/* Events Requiring Attention */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Events Requiring Attention
          </h2>
          <Link
            to="/educator/events"
            className="text-primary hover:opacity-80 transition-opacity flex items-center gap-1"
            style={{ fontSize: "0.875rem" }}
          >
            View all events
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
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
                  className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group"
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
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Upcoming Events
        </h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="divide-y divide-border">
            {upcomingEvents
              .filter((e) => e.status === "Upcoming")
              .map((event) => (
                <Link
                  key={event.id}
                  to={`/educator/events/${event.id}`}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group"
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
        </div>
      </div>
    </div>
  );
}
