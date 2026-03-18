import { useState } from "react";
import { Link } from "react-router";
import {
  CalendarDays,
  List,
  MapPin,
  User,
  ChevronRight,
  ChevronLeft,
  Search,
  AlertTriangle,
  Radio,
} from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/shared/components/ui/card";
import {
  mockEvents,
  getEventsRequiringAttention,
  type EventStatus,
  type EventItem,
} from "./events-data";

type ViewMode = "list" | "calendar";
type FilterTab = "All" | EventStatus;

const filterTabs: FilterTab[] = ["All", "Upcoming", "Live", "Completed"];

const statusColors: Record<string, string> = {
  Upcoming: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Live: "bg-green-500/10 text-green-600 border-green-500/20",
  Completed: "bg-muted text-muted-foreground border-border",
};

const statusDotColors: Record<string, string> = {
  Upcoming: "bg-blue-500",
  Live: "bg-green-500 animate-pulse",
  Completed: "bg-muted-foreground",
};

const eventTypeBadgeColors: Record<string, string> = {
  Tasting: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  Demo: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  Activation: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Promo: "bg-pink-500/10 text-pink-600 border-pink-500/20",
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

/* --- Stat Card (matching dashboard pattern) --- */

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  accent?: string;
}) {
  return (
    <Card className="gap-0">
      <CardHeader className="pb-2 pt-5 px-5">
        <div className="flex items-center justify-between">
          <CardDescription style={{ fontSize: "0.8125rem" }}>
            {label}
          </CardDescription>
          <div
            className="flex items-center justify-center size-8 rounded-md"
            style={{ backgroundColor: accent ? `${accent}14` : "#7D152D14" }}
          >
            <Icon
              className="size-4"
              style={{ color: accent || "#7D152D" }}
            />
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
      </CardContent>
    </Card>
  );
}

/* --- Calendar View --- */

function CalendarView({
  events,
  year,
  month,
  onPrevMonth,
  onNextMonth,
}: {
  events: EventItem[];
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const cells: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.date === dateStr);
  };

  return (
    <Card className="gap-0 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevMonth}
          className="cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h3
          className="text-foreground"
          style={{ fontSize: "0.9375rem", fontWeight: 600 }}
        >
          {MONTHS[month]} {year}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNextMonth}
          className="cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7">
        {DAYS.map((d) => (
          <div
            key={d}
            className="px-2 py-2.5 text-muted-foreground font-medium border-b border-border"
            style={{ fontSize: "0.75rem" }}
          >
            {d}
          </div>
        ))}
        {cells.map((day, idx) => {
          const dayEvents = day ? getEventsForDay(day) : [];
          const isToday =
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();
          return (
            <div
              key={idx}
              className={`min-h-[110px] p-2 border-b border-r border-border ${
                day ? "bg-card" : "bg-muted/20"
              }`}
            >
              {day && (
                <>
                  <span
                    className={`inline-flex items-center justify-center size-6 rounded-full font-medium ${
                      isToday
                        ? "bg-[#7D152D] text-white"
                        : "text-muted-foreground"
                    }`}
                    style={{ fontSize: "0.75rem" }}
                  >
                    {day}
                  </span>
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.slice(0, 3).map((evt) => (
                      <Link
                        key={evt.id}
                        to={`/educator/events/${evt.id}`}
                        className="block rounded-md px-1.5 py-0.5 hover:bg-muted/60 transition-colors"
                        style={{ fontSize: "0.6875rem" }}
                      >
                        <span className="flex items-center gap-1.5">
                          <span
                            className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusDotColors[evt.status]}`}
                          />
                          <span className="truncate text-foreground font-medium">
                            {evt.name}
                          </span>
                        </span>
                      </Link>
                    ))}
                    {dayEvents.length > 3 && (
                      <span
                        className="text-muted-foreground px-1.5 font-medium"
                        style={{ fontSize: "0.625rem" }}
                      >
                        +{dayEvents.length - 3} more
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* --- Main Events Page --- */

export function EventsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [search, setSearch] = useState("");
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(2); // March

  const filteredEvents = mockEvents
    .filter((e) => activeFilter === "All" || e.status === activeFilter)
    .filter(
      (e) =>
        !search ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.venue.toLowerCase().includes(search.toLowerCase()) ||
        e.brandName.toLowerCase().includes(search.toLowerCase()) ||
        (e.educatorName || "").toLowerCase().includes(search.toLowerCase()),
    );

  const liveCount = mockEvents.filter((e) => e.status === "Live").length;
  const attentionCount = getEventsRequiringAttention().length;

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

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-foreground" style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            Events
          </h1>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontSize: "0.875rem" }}
          >
            Manage your assigned events across all stages.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="cursor-pointer"
          >
            <List className="w-4 h-4 mr-1.5" />
            List
          </Button>
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("calendar")}
            className="cursor-pointer"
          >
            <CalendarDays className="w-4 h-4 mr-1.5" />
            Calendar
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Events"
          value={mockEvents.length}
          icon={CalendarDays}
        />
        <StatCard
          label="Live Now"
          value={liveCount}
          icon={Radio}
          accent="#16a34a"
        />
        <StatCard
          label="Needs Attention"
          value={attentionCount}
          icon={AlertTriangle}
          accent="#d97706"
        />
      </div>

      {/* Filters + Search */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {filterTabs.map((tab) => {
            const count =
              tab === "All"
                ? mockEvents.length
                : mockEvents.filter((e) => e.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  activeFilter === tab
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontSize: "0.8125rem" }}
              >
                {tab}
                <span
                  className={`ml-1.5 inline-flex items-center justify-center min-w-[1.25rem] h-5 rounded-full px-1 ${
                    activeFilter === tab
                      ? "bg-muted text-muted-foreground"
                      : "bg-background/60 text-muted-foreground"
                  }`}
                  style={{ fontSize: "0.6875rem", fontWeight: 500 }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events, brands..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Content */}
      {viewMode === "calendar" ? (
        <CalendarView
          events={filteredEvents}
          year={calYear}
          month={calMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      ) : (
        <Card className="gap-0 overflow-hidden">
          <CardHeader className="px-5 pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle
                  style={{ fontSize: "1rem", fontWeight: 600 }}
                >
                  All Events
                </CardTitle>
                <CardDescription style={{ fontSize: "0.8125rem" }}>
                  {filteredEvents.length} event
                  {filteredEvents.length !== 1 ? "s" : ""} matching your
                  filters
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            {/* Table header */}
            <div
              className="grid grid-cols-[1fr_100px_100px_1fr_160px_90px] gap-4 px-5 py-3 border-y border-border bg-muted/30 text-muted-foreground font-medium"
              style={{ fontSize: "0.75rem" }}
            >
              <span>Event</span>
              <span>Date</span>
              <span>Time</span>
              <span>Venue</span>
              <span>Educator</span>
              <span>Status</span>
            </div>
            {/* Table rows */}
            {filteredEvents.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
                <p>No events match your filters.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`/educator/events/${event.id}`}
                    className="grid grid-cols-[1fr_100px_100px_1fr_160px_90px] gap-4 px-5 py-3.5 items-center hover:bg-muted/50 transition-colors group"
                  >
                    {/* Event name + type badge */}
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="text-foreground truncate"
                        style={{ fontSize: "0.875rem", fontWeight: 500 }}
                      >
                        {event.name}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full border px-1.5 py-0 flex-shrink-0 ${eventTypeBadgeColors[event.eventType]}`}
                        style={{
                          fontSize: "0.625rem",
                          fontWeight: 500,
                          lineHeight: "1.25rem",
                        }}
                      >
                        {event.eventType}
                      </span>
                      {event.status === "Upcoming" && !event.educatorId && (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      )}
                      {event.status === "Completed" && !event.finalizedAt && (
                        <span
                          className="text-amber-500 flex-shrink-0 font-medium"
                          style={{ fontSize: "0.6875rem" }}
                        >
                          Review
                        </span>
                      )}
                    </div>
                    {/* Date */}
                    <span
                      className="text-muted-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    {/* Time */}
                    <span
                      className="text-muted-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {event.time.split("–")[0]?.trim()}
                    </span>
                    {/* Venue */}
                    <span
                      className="text-muted-foreground flex items-center gap-1.5 truncate"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </span>
                    {/* Educator */}
                    <span
                      className="text-muted-foreground flex items-center gap-1.5"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      <User className="w-3.5 h-3.5 flex-shrink-0" />
                      {event.educatorName || (
                        <span className="text-amber-500 font-medium">
                          Unassigned
                        </span>
                      )}
                    </span>
                    {/* Status */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 font-medium w-fit ${statusColors[event.status]}`}
                        style={{ fontSize: "0.6875rem" }}
                      >
                        {event.status === "Live" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-1.5" />
                        )}
                        {event.status}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
