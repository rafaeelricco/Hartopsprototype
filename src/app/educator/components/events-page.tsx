import { useState } from "react";
import { Link } from "react-router";
import {
  CalendarDays,
  List,
  Clock,
  MapPin,
  User,
  ChevronRight,
  ChevronLeft,
  Search,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import { mockEvents, type EventStatus, type EventItem } from "./events-data";

type ViewMode = "list" | "calendar";
type FilterTab = "All" | EventStatus;

const filterTabs: FilterTab[] = ["All", "Upcoming", "Live", "Completed"];

const statusColors: Record<string, string> = {
  Upcoming: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Live: "bg-green-500/10 text-green-400 border-green-500/20",
  Completed: "bg-muted text-muted-foreground border-border",
};

const statusDotColors: Record<string, string> = {
  Upcoming: "bg-blue-400",
  Live: "bg-green-400 animate-pulse",
  Completed: "bg-muted-foreground",
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

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
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onPrevMonth} className="cursor-pointer">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h3 className="font-semibold text-foreground">
          {MONTHS[month]} {year}
        </h3>
        <Button variant="ghost" size="icon" onClick={onNextMonth} className="cursor-pointer">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7">
        {DAYS.map((d) => (
          <div
            key={d}
            className="p-2 text-center text-muted-foreground font-medium border-b border-border"
            style={{ fontSize: "0.75rem" }}
          >
            {d}
          </div>
        ))}
        {cells.map((day, idx) => {
          const dayEvents = day ? getEventsForDay(day) : [];
          return (
            <div
              key={idx}
              className={`min-h-[100px] p-1.5 border-b border-r border-border ${
                day ? "bg-card" : "bg-muted/30"
              }`}
            >
              {day && (
                <>
                  <span
                    className="text-muted-foreground font-medium"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {day}
                  </span>
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.slice(0, 3).map((evt) => (
                      <Link
                        key={evt.id}
                        to={`/educator/events/${evt.id}`}
                        className="block rounded px-1 py-0.5 truncate hover:opacity-80 transition-opacity"
                        style={{ fontSize: "0.625rem" }}
                      >
                        <span className="flex items-center gap-1">
                          <span
                            className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusDotColors[evt.status]}`}
                          />
                          <span className="truncate text-foreground">
                            {evt.name}
                          </span>
                        </span>
                      </Link>
                    ))}
                    {dayEvents.length > 3 && (
                      <span
                        className="text-muted-foreground px-1"
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
    </div>
  );
}

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
        (e.educatorName || "").toLowerCase().includes(search.toLowerCase()),
    );

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
          <h1 className="text-2xl font-semibold text-foreground">Events</h1>
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

      {/* Filters + Search */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {filterTabs.map((tab) => (
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
                className="ml-1.5 text-muted-foreground"
                style={{ fontSize: "0.75rem" }}
              >
                {tab === "All"
                  ? mockEvents.length
                  : mockEvents.filter((e) => e.status === tab).length}
              </span>
            </button>
          ))}
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
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
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {/* Table header */}
          <div
            className="grid grid-cols-[1fr_150px_1fr_180px_100px] gap-4 px-4 py-3 border-b border-border bg-muted/30 text-muted-foreground font-medium"
            style={{ fontSize: "0.75rem" }}
          >
            <span>Event</span>
            <span>Date</span>
            <span>Venue</span>
            <span>Educator</span>
            <span>Status</span>
          </div>
          {/* Table rows */}
          {filteredEvents.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No events match your filters.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredEvents.map((event) => (
                <Link
                  key={event.id}
                  to={`/educator/events/${event.id}`}
                  className="grid grid-cols-[1fr_150px_1fr_180px_100px] gap-4 px-4 py-3.5 items-center hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-foreground font-medium truncate">
                      {event.name}
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
                  <span
                    className="text-muted-foreground flex items-center gap-1"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    {event.date}
                  </span>
                  <span
                    className="text-muted-foreground flex items-center gap-1 truncate"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    {event.venue}
                  </span>
                  <span
                    className="text-muted-foreground flex items-center gap-1"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    <User className="w-3.5 h-3.5" />
                    {event.educatorName || (
                      <span className="text-amber-500">Unassigned</span>
                    )}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 font-medium w-fit ${statusColors[event.status]}`}
                    style={{ fontSize: "0.6875rem" }}
                  >
                    {event.status === "Live" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse mr-1.5" />
                    )}
                    {event.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
