import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import {
  CalendarDays,
  List,
  MapPin,
  User,
  ChevronRight,
  ChevronLeft,
  Search,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Ban,
  ArrowUpDown,
  ListChecks,
  ShoppingCart,
  Camera,
  Star,
  Pencil,
  ClipboardList,
  Filter,
} from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { Checkbox } from "@/app/shared/components/ui/checkbox";
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
  getStatusDisplayGroup,
  type EventStatus,
  type StatusDisplayGroup,
  type EventItem,
} from "./events-data";

type ViewMode = "list" | "calendar";
type FilterTab = "All" | StatusDisplayGroup;
type SortOption = "date" | "status" | "educator";

const filterTabs: FilterTab[] = ["All", "Upcoming", "Live", "Completed"];

// Status badge colors for all 7 lifecycle states (mm-ui-006)
const statusColors: Record<EventStatus, string> = {
  Unassigned: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Pending: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  Confirmed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Live: "bg-green-500/10 text-green-600 border-green-500/20",
  Completed: "bg-muted text-muted-foreground border-border",
  Finalized: "bg-muted/60 text-muted-foreground/70 border-border",
  Cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
};

const statusDotColors: Record<EventStatus, string> = {
  Unassigned: "bg-amber-500",
  Pending: "bg-yellow-500",
  Confirmed: "bg-blue-500",
  Live: "bg-green-500 animate-pulse",
  Completed: "bg-muted-foreground",
  Finalized: "bg-muted-foreground/50",
  Cancelled: "bg-red-500",
};

const eventTypeBadgeColors: Record<string, string> = {
  Tasting: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  Demo: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  Activation: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Promo: "bg-pink-500/10 text-pink-600 border-pink-500/20",
};

// Sort priority: Live first, then Upcoming substates by date, then Completed, Finalized, Cancelled
const STATUS_SORT_ORDER: Record<EventStatus, number> = {
  Live: 0,
  Unassigned: 1,
  Pending: 2,
  Confirmed: 3,
  Completed: 4,
  Finalized: 5,
  Cancelled: 6,
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

function sortEvents(events: EventItem[], sortBy: SortOption): EventItem[] {
  return [...events].sort((a, b) => {
    switch (sortBy) {
      case "status":
        return STATUS_SORT_ORDER[a.status] - STATUS_SORT_ORDER[b.status];
      case "educator":
        return (a.educatorName || "zzz").localeCompare(b.educatorName || "zzz");
      case "date":
      default: {
        // Primary: lifecycle priority, Secondary: date
        const statusDiff =
          STATUS_SORT_ORDER[a.status] - STATUS_SORT_ORDER[b.status];
        if (statusDiff !== 0) return statusDiff;
        return a.date.localeCompare(b.date);
      }
    }
  });
}

function getFilterCount(tab: FilterTab): number {
  if (tab === "All")
    return mockEvents.filter((e) => e.status !== "Cancelled").length;
  return mockEvents.filter((e) => getStatusDisplayGroup(e.status) === tab)
    .length;
}

function matchesFilter(event: EventItem, tab: FilterTab): boolean {
  if (tab === "All") return event.status !== "Cancelled";
  return getStatusDisplayGroup(event.status) === tab;
}

// Human-readable status label for the badge
function getStatusLabel(status: EventStatus): string {
  switch (status) {
    case "Unassigned":
      return "Unassigned";
    case "Pending":
      return "Pending";
    case "Confirmed":
      return "Confirmed";
    case "Live":
      return "Live";
    case "Completed":
      return "Completed";
    case "Finalized":
      return "Finalized";
    case "Cancelled":
      return "Cancelled";
  }
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

/* --- Educator column with assignment status indicator --- */

function EducatorCell({ event }: { event: EventItem }) {
  if (!event.educatorName) {
    return (
      <span
        className="text-muted-foreground flex items-center gap-1.5"
        style={{ fontSize: "0.8125rem" }}
      >
        <User className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="text-amber-500 font-medium">Unassigned</span>
      </span>
    );
  }

  const extraCount =
    event.assignedEducators && event.assignedEducators.length > 1
      ? event.assignedEducators.length - 1
      : 0;

  return (
    <span
      className="text-muted-foreground flex items-center gap-1.5"
      style={{ fontSize: "0.8125rem" }}
    >
      <User className="w-3.5 h-3.5 flex-shrink-0" />
      <span className="truncate">{event.educatorName}</span>
      {extraCount > 0 && (
        <span
          className="inline-flex items-center rounded-full border px-1.5 py-0 flex-shrink-0 bg-primary/10 text-primary border-primary/20"
          style={{ fontSize: "0.5625rem", fontWeight: 500, lineHeight: "1rem" }}
        >
          +{extraCount}
        </span>
      )}
      {event.status === "Pending" && (
        <span
          className="inline-flex items-center rounded-full border px-1.5 py-0 flex-shrink-0 bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
          style={{ fontSize: "0.5625rem", fontWeight: 500, lineHeight: "1rem" }}
        >
          <Clock className="w-2.5 h-2.5 mr-0.5" />
          Pending
        </span>
      )}
      {event.status === "Confirmed" && (
        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
      )}
    </span>
  );
}

/* --- Event name column with indicators --- */

function EventNameCell({ event }: { event: EventItem }) {
  return (
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
      {event.status === "Unassigned" && (
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
      {event.status === "Cancelled" && (
        <Ban className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
      )}
    </div>
  );
}

/* --- Speed-to-Finalize Queue (G8 per mm-ui-002) --- */

function FinalizationQueue({ onExit }: { onExit: () => void }) {
  const pendingEvents = useMemo(
    () => mockEvents.filter((e) => e.status === "Completed" && !e.finalizedAt),
    [],
  );
  const [expandedId, setExpandedId] = useState<string | null>(
    pendingEvents[0]?.id ?? null,
  );
  const [finalized, setFinalized] = useState<Set<string>>(new Set());
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  // Manager edit-before-finalize state — keyed by event ID
  const [editedNotesMap, setEditedNotesMap] = useState<Record<string, string>>(
    () => {
      const initial: Record<string, string> = {};
      pendingEvents.forEach((e) => {
        if (e.educatorNotesFinal) initial[e.id] = e.educatorNotesFinal;
      });
      return initial;
    },
  );
  const [editedResponsesMap, setEditedResponsesMap] = useState<
    Record<string, Record<string, string>>
  >(() => {
    const initial: Record<string, Record<string, string>> = {};
    pendingEvents.forEach((e) => {
      const inner: Record<string, string> = {};
      e.questionnaireResponsesFinal
        ?.filter((r) => r.type === "open-text" || r.type === "dropdown")
        .forEach((r) => {
          inner[r.questionId] = r.answer;
        });
      initial[e.id] = inner;
    });
    return initial;
  });
  const [notesEditedSet, setNotesEditedSet] = useState<Set<string>>(new Set());
  const [responsesEditedMap, setResponsesEditedMap] = useState<
    Record<string, Set<string>>
  >({});
  // Pre-approval checks state — keyed by event ID → set of checked IDs
  const [checksMap, setChecksMap] = useState<Record<string, Set<string>>>({});

  const remaining = pendingEvents.filter((e) => !finalized.has(e.id));

  const handleFinalize = (id: string) => {
    setFinalized((prev) => new Set(prev).add(id));
    setShowConfirm(null);
    // Auto-advance to next
    const nextEvent = remaining.find((e) => e.id !== id);
    if (nextEvent) {
      setExpandedId(nextEvent.id);
    }
  };

  return (
    <div className="p-6 space-y-6 w-full">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-foreground flex items-center gap-2">
            <ListChecks className="w-6 h-6" />
            Finalization Queue
          </h1>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontSize: "0.875rem" }}
          >
            Review and finalize completed events sequentially.{" "}
            <strong>{remaining.length}</strong> event
            {remaining.length !== 1 ? "s" : ""} pending review.
          </p>
        </div>
        <Button variant="outline" onClick={onExit} className="cursor-pointer">
          Back to Events
        </Button>
      </div>

      {remaining.length === 0 ? (
        <Card className="gap-0 border-green-500/30">
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <p
              className="text-foreground"
              style={{ fontWeight: 600, fontSize: "1rem" }}
            >
              All events finalized
            </p>
            <p
              className="text-muted-foreground mt-1"
              style={{ fontSize: "0.875rem" }}
            >
              No more completed events pending review.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {pendingEvents.map((event, idx) => {
            const isFinalized = finalized.has(event.id);
            const isExpanded = expandedId === event.id && !isFinalized;
            return (
              <Card
                key={event.id}
                className={`gap-0 transition-all ${
                  isFinalized
                    ? "opacity-50 border-green-500/20"
                    : isExpanded
                      ? "border-primary/30"
                      : ""
                }`}
              >
                {/* Summary row — always visible */}
                <button
                  onClick={() =>
                    !isFinalized && setExpandedId(isExpanded ? null : event.id)
                  }
                  className="w-full text-left px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
                  disabled={isFinalized}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span
                      className="flex items-center justify-center size-7 rounded-full bg-muted text-muted-foreground flex-shrink-0"
                      style={{ fontSize: "0.75rem", fontWeight: 500 }}
                    >
                      {isFinalized ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        idx + 1
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-foreground truncate"
                        style={{ fontSize: "0.875rem", fontWeight: 500 }}
                      >
                        {event.name}
                      </p>
                      <div
                        className="flex items-center gap-3 text-muted-foreground mt-0.5"
                        style={{ fontSize: "0.75rem" }}
                      >
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.venue}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {event.educatorName || "—"}
                        </span>
                      </div>
                    </div>
                    {/* Inline key stats */}
                    {event.finalStats && (
                      <div className="hidden md:flex items-center gap-4 text-muted-foreground flex-shrink-0">
                        <span
                          className="flex items-center gap-1"
                          style={{ fontSize: "0.75rem" }}
                        >
                          <ShoppingCart className="w-3 h-3" />
                          {event.finalStats.totalSamples} samples
                        </span>
                        <span
                          className="flex items-center gap-1"
                          style={{ fontSize: "0.75rem" }}
                        >
                          <User className="w-3 h-3" />
                          {event.finalStats.totalInteractions}
                        </span>
                        <span
                          className="flex items-center gap-1"
                          style={{ fontSize: "0.75rem" }}
                        >
                          <Star className="w-3 h-3 text-amber-400" />
                          {event.finalStats.rating}
                        </span>
                        <span
                          className="flex items-center gap-1"
                          style={{ fontSize: "0.75rem" }}
                        >
                          <Camera className="w-3 h-3" />
                          {event.finalStats.photosSubmitted}
                        </span>
                      </div>
                    )}
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ml-3 ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {/* Expanded detail — post-event stats inline */}
                {isExpanded && event.finalStats && (
                  <div className="px-5 pb-5 space-y-4 border-t border-border">
                    {/* Stats grid */}
                    <div className="grid gap-3 grid-cols-2 md:grid-cols-4 mt-4">
                      {[
                        {
                          label: "Total Samples",
                          value: event.finalStats.totalSamples,
                        },
                        {
                          label: "Interactions",
                          value: event.finalStats.totalInteractions,
                        },
                        {
                          label: "Sales",
                          value: event.finalStats.totalSales,
                        },
                        {
                          label: "Rating",
                          value: event.finalStats.rating,
                        },
                        {
                          label: "Duration",
                          value: event.finalStats.duration,
                        },
                        {
                          label: "Photos",
                          value: event.finalStats.photosSubmitted,
                        },
                        {
                          label: "Questionnaires",
                          value: event.questionnairesCompletedFinal ?? 0,
                        },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-lg border border-border p-3"
                        >
                          <p
                            className="text-muted-foreground"
                            style={{ fontSize: "0.6875rem" }}
                          >
                            {stat.label}
                          </p>
                          <p
                            className="text-foreground"
                            style={{
                              fontSize: "1.125rem",
                              fontWeight: 600,
                            }}
                          >
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Inventory comparison */}
                    {event.inventoryComparison && (
                      <div className="flex items-center gap-6 text-sm">
                        <span className="text-muted-foreground">
                          Inventory: {event.inventoryComparison.preEvent} →{" "}
                          {event.inventoryComparison.postEvent}
                        </span>
                        <span className="text-green-600 font-medium">
                          -
                          {event.inventoryComparison.preEvent -
                            event.inventoryComparison.postEvent}{" "}
                          sold
                        </span>
                      </div>
                    )}

                    {/* Educator notes — editable before finalize */}
                    {event.educatorNotesFinal && (
                      <div className="rounded-lg border border-border p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <p
                            className="text-muted-foreground"
                            style={{ fontSize: "0.6875rem" }}
                          >
                            Educator Notes
                          </p>
                          {notesEditedSet.has(event.id) && (
                            <span
                              className="inline-flex items-center gap-1 rounded-full border px-1.5 py-0 bg-amber-500/10 text-amber-600 border-amber-500/20"
                              style={{
                                fontSize: "0.5625rem",
                                fontWeight: 500,
                                lineHeight: "1rem",
                              }}
                            >
                              <Pencil className="w-2 h-2" />
                              Edited
                            </span>
                          )}
                        </div>
                        {!isFinalized ? (
                          <textarea
                            value={
                              editedNotesMap[event.id] ??
                              event.educatorNotesFinal
                            }
                            onChange={(e) => {
                              setEditedNotesMap((prev) => ({
                                ...prev,
                                [event.id]: e.target.value,
                              }));
                              if (e.target.value !== event.educatorNotesFinal) {
                                setNotesEditedSet((prev) =>
                                  new Set(prev).add(event.id),
                                );
                              } else {
                                setNotesEditedSet((prev) => {
                                  const next = new Set(prev);
                                  next.delete(event.id);
                                  return next;
                                });
                              }
                            }}
                            rows={3}
                            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors resize-y"
                            style={{ fontSize: "0.8125rem" }}
                          />
                        ) : (
                          <p
                            className="text-foreground"
                            style={{ fontSize: "0.8125rem" }}
                          >
                            {editedNotesMap[event.id] ??
                              event.educatorNotesFinal}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Questionnaire editable responses — open-text & dropdown before finalize */}
                    {event.questionnaireResponsesFinal &&
                      event.questionnaireResponsesFinal.filter(
                        (r) => r.type === "open-text" || r.type === "dropdown",
                      ).length > 0 && (
                        <div className="rounded-lg border border-border p-3 space-y-3">
                          <div className="flex items-center gap-2">
                            <ClipboardList className="w-3.5 h-3.5 text-muted-foreground" />
                            <p
                              className="text-muted-foreground"
                              style={{
                                fontSize: "0.6875rem",
                                fontWeight: 500,
                              }}
                            >
                              Editable Responses
                            </p>
                          </div>
                          {event.questionnaireResponsesFinal
                            .filter(
                              (r) =>
                                r.type === "open-text" || r.type === "dropdown",
                            )
                            .map((response) => {
                              const eventResponses =
                                responsesEditedMap[event.id] ?? new Set();
                              const wasEdited =
                                eventResponses instanceof Set
                                  ? eventResponses.has(response.questionId)
                                  : false;
                              return (
                                <div
                                  key={response.questionId}
                                  className="space-y-1"
                                >
                                  <div className="flex items-center gap-2">
                                    <p
                                      className="text-muted-foreground"
                                      style={{ fontSize: "0.625rem" }}
                                    >
                                      {response.questionText}
                                    </p>
                                    <span
                                      className="inline-flex items-center rounded-full border px-1 py-0 bg-muted text-muted-foreground border-border flex-shrink-0"
                                      style={{
                                        fontSize: "0.5rem",
                                        fontWeight: 500,
                                        lineHeight: "0.875rem",
                                      }}
                                    >
                                      {response.type === "open-text"
                                        ? "Open Text"
                                        : "Dropdown"}
                                    </span>
                                    {wasEdited && (
                                      <span
                                        className="inline-flex items-center gap-0.5 rounded-full border px-1 py-0 bg-amber-500/10 text-amber-600 border-amber-500/20 flex-shrink-0"
                                        style={{
                                          fontSize: "0.5rem",
                                          fontWeight: 500,
                                          lineHeight: "0.875rem",
                                        }}
                                      >
                                        <Pencil className="w-1.5 h-1.5" />
                                        Edited
                                      </span>
                                    )}
                                  </div>
                                  {!isFinalized &&
                                  response.type === "open-text" ? (
                                    <textarea
                                      value={
                                        editedResponsesMap[event.id]?.[
                                          response.questionId
                                        ] ?? response.answer
                                      }
                                      onChange={(e) => {
                                        setEditedResponsesMap((prev) => ({
                                          ...prev,
                                          [event.id]: {
                                            ...(prev[event.id] ?? {}),
                                            [response.questionId]:
                                              e.target.value,
                                          },
                                        }));
                                        if (
                                          e.target.value !== response.answer
                                        ) {
                                          setResponsesEditedMap((prev) => ({
                                            ...prev,
                                            [event.id]: new Set(
                                              prev[event.id] ?? [],
                                            ).add(response.questionId),
                                          }));
                                        } else {
                                          setResponsesEditedMap((prev) => {
                                            const next = new Set(
                                              prev[event.id] ?? [],
                                            );
                                            next.delete(response.questionId);
                                            return {
                                              ...prev,
                                              [event.id]: next,
                                            };
                                          });
                                        }
                                      }}
                                      rows={2}
                                      className="w-full rounded-md border border-border bg-card px-2.5 py-1.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors resize-y"
                                      style={{ fontSize: "0.75rem" }}
                                    />
                                  ) : !isFinalized &&
                                    response.type === "dropdown" ? (
                                    <select
                                      value={
                                        editedResponsesMap[event.id]?.[
                                          response.questionId
                                        ] ?? response.answer
                                      }
                                      onChange={(e) => {
                                        setEditedResponsesMap((prev) => ({
                                          ...prev,
                                          [event.id]: {
                                            ...(prev[event.id] ?? {}),
                                            [response.questionId]:
                                              e.target.value,
                                          },
                                        }));
                                        if (
                                          e.target.value !== response.answer
                                        ) {
                                          setResponsesEditedMap((prev) => ({
                                            ...prev,
                                            [event.id]: new Set(
                                              prev[event.id] ?? [],
                                            ).add(response.questionId),
                                          }));
                                        } else {
                                          setResponsesEditedMap((prev) => {
                                            const next = new Set(
                                              prev[event.id] ?? [],
                                            );
                                            next.delete(response.questionId);
                                            return {
                                              ...prev,
                                              [event.id]: next,
                                            };
                                          });
                                        }
                                      }}
                                      className="w-full rounded-md border border-border bg-card px-2.5 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors cursor-pointer"
                                      style={{ fontSize: "0.75rem" }}
                                    >
                                      {response.options?.map((opt) => (
                                        <option key={opt} value={opt}>
                                          {opt}
                                        </option>
                                      ))}
                                    </select>
                                  ) : (
                                    <p
                                      className="text-foreground"
                                      style={{ fontSize: "0.75rem" }}
                                    >
                                      {editedResponsesMap[event.id]?.[
                                        response.questionId
                                      ] ?? response.answer}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      )}

                    {/* Photo count */}
                    {event.photoCount && event.photoCount > 0 && (
                      <p
                        className="text-muted-foreground flex items-center gap-1"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        <Camera className="w-3.5 h-3.5" />
                        {event.photoCount} photos submitted
                        {event.photoCategories && (
                          <span>
                            {" "}
                            ({
                              event.photoCategories.receipts.length
                            } receipts,{" "}
                            {event.photoCategories.socialMedia.length} social,{" "}
                            {event.photoCategories.venue.length} venue)
                          </span>
                        )}
                      </p>
                    )}

                    {/* Pre-Approval Checklist */}
                    {event.preApprovalChecks &&
                      event.preApprovalChecks.length > 0 && (
                        <div className="rounded-lg border border-border p-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <ClipboardList className="w-3.5 h-3.5 text-muted-foreground" />
                            <p
                              className="text-muted-foreground"
                              style={{
                                fontSize: "0.6875rem",
                                fontWeight: 500,
                              }}
                            >
                              Pre-Approval Checklist
                            </p>
                          </div>
                          {event.preApprovalChecks.map((check) => {
                            const isChecked =
                              checksMap[event.id]?.has(check.id) ?? false;
                            return (
                              <div
                                key={check.id}
                                className="flex items-center gap-2"
                              >
                                <Checkbox
                                  id={`${event.id}-${check.id}`}
                                  checked={isChecked}
                                  onCheckedChange={(checked) => {
                                    setChecksMap((prev) => {
                                      const next = new Set(
                                        prev[event.id] ?? [],
                                      );
                                      if (checked) {
                                        next.add(check.id);
                                      } else {
                                        next.delete(check.id);
                                      }
                                      return { ...prev, [event.id]: next };
                                    });
                                  }}
                                />
                                <label
                                  htmlFor={`${event.id}-${check.id}`}
                                  className="text-foreground cursor-pointer select-none"
                                  style={{ fontSize: "0.8125rem" }}
                                >
                                  {check.label}
                                  {check.required && (
                                    <span className="text-red-500 ml-0.5">
                                      *
                                    </span>
                                  )}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      )}

                    {/* Finalize CTA */}
                    {showConfirm === event.id ? (
                      <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p
                              className="text-foreground"
                              style={{ fontWeight: 600 }}
                            >
                              Confirm Finalization
                            </p>
                            <p
                              className="text-muted-foreground mt-1"
                              style={{ fontSize: "0.875rem" }}
                            >
                              This action is <strong>irreversible</strong>. It
                              will lock the event record and terminate the
                              educator&apos;s editing window.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 ml-8">
                          <Button
                            onClick={() => handleFinalize(event.id)}
                            className="cursor-pointer"
                          >
                            Yes, Approve & Finalize
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setShowConfirm(null)}
                            className="cursor-pointer"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/educator/events/${event.id}`}
                          className="text-primary hover:opacity-80 transition-opacity"
                          style={{ fontSize: "0.8125rem" }}
                        >
                          View full detail →
                        </Link>
                        {(() => {
                          const requiredChecks =
                            event.preApprovalChecks?.filter(
                              (c) => c.required,
                            ) ?? [];
                          const allChecked =
                            requiredChecks.length === 0 ||
                            requiredChecks.every((c) =>
                              checksMap[event.id]?.has(c.id),
                            );
                          return (
                            <div className="flex flex-col items-end gap-1">
                              <Button
                                onClick={() => setShowConfirm(event.id)}
                                className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-white"
                                disabled={!allChecked}
                              >
                                Approve & Finalize
                              </Button>
                              {!allChecked && (
                                <p
                                  className="text-muted-foreground"
                                  style={{ fontSize: "0.6875rem" }}
                                >
                                  Complete all required checks to finalize
                                </p>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* --- Main Events Page --- */

export function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(2); // March

  // Territory filters
  const [filterBorough, setFilterBorough] = useState<string>("All");
  const [filterState, setFilterState] = useState<string>("All");
  const [filterVenueType, setFilterVenueType] = useState<string>("All");

  // Derive unique filter options from event data
  const boroughOptions = useMemo(
    () =>
      Array.from(
        new Set(mockEvents.map((e) => e.borough).filter(Boolean) as string[]),
      ).sort(),
    [],
  );
  const stateOptions = useMemo(
    () => Array.from(new Set(mockEvents.map((e) => e.state))).sort(),
    [],
  );
  const venueTypeOptions = useMemo(
    () => Array.from(new Set(mockEvents.map((e) => e.venueType))).sort(),
    [],
  );

  const isFinalizationMode = searchParams.get("mode") === "finalize";

  const hasActiveFilters =
    filterBorough !== "All" ||
    filterState !== "All" ||
    filterVenueType !== "All";

  const filteredEvents = sortEvents(
    mockEvents
      .filter((e) => matchesFilter(e, activeFilter))
      .filter(
        (e) =>
          !search ||
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.venue.toLowerCase().includes(search.toLowerCase()) ||
          e.brandName.toLowerCase().includes(search.toLowerCase()) ||
          (e.educatorName || "").toLowerCase().includes(search.toLowerCase()),
      )
      .filter((e) => filterBorough === "All" || e.borough === filterBorough)
      .filter((e) => filterState === "All" || e.state === filterState)
      .filter(
        (e) => filterVenueType === "All" || e.venueType === filterVenueType,
      ),
    sortBy,
  );

  const cardTitle =
    activeFilter === "All" ? "All Events" : `${activeFilter} Events`;

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

  const cycleSortOption = () => {
    const options: SortOption[] = ["date", "status", "educator"];
    const currentIdx = options.indexOf(sortBy);
    setSortBy(options[(currentIdx + 1) % options.length]!);
  };

  // G8: Finalization queue mode
  if (isFinalizationMode) {
    return <FinalizationQueue onExit={() => setSearchParams({})} />;
  }

  const completedPendingCount = mockEvents.filter(
    (e) => e.status === "Completed" && !e.finalizedAt,
  ).length;

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-foreground">Events</h1>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontSize: "0.875rem" }}
          >
            Monitor and manage events across all campaigns.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* G8: Finalization queue entry point */}
          {completedPendingCount > 0 && (
            <Button
              variant="outline"
              onClick={() => setSearchParams({ mode: "finalize" })}
              className="cursor-pointer text-amber-600 border-amber-500/30 hover:bg-amber-500/5"
              style={{ fontSize: "0.8125rem" }}
            >
              <ListChecks className="w-4 h-4 mr-1.5" />
              Finalize ({completedPendingCount})
            </Button>
          )}
          <div className="flex items-center bg-[#F1F5F9] rounded-lg p-1">
            <Button
              variant="ghost"
              onClick={() => setViewMode("list")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md transition-all h-auto cursor-pointer ${
                viewMode === "list"
                  ? "bg-white text-[#0F172A] shadow-sm hover:bg-white hover:text-[#0F172A] hover:shadow-sm"
                  : "text-[#64748B] hover:text-[#0F172A] hover:bg-transparent"
              }`}
              style={{ fontSize: "0.8125rem" }}
            >
              <List size={15} />
              List
            </Button>
            <Button
              variant="ghost"
              onClick={() => setViewMode("calendar")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md transition-all h-auto cursor-pointer ${
                viewMode === "calendar"
                  ? "bg-white text-[#0F172A] shadow-sm hover:bg-white hover:text-[#0F172A] hover:shadow-sm"
                  : "text-[#64748B] hover:text-[#0F172A] hover:bg-transparent"
              }`}
              style={{ fontSize: "0.8125rem" }}
            >
              <CalendarDays size={15} />
              Calendar
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Row — search, tabs, sort in one row (matching ops pattern) */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or location..."
            className="pl-9"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {filterTabs.map((tab) => {
            const count = getFilterCount(tab);
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

        {/* Sort */}
        <Button
          variant="outline"
          size="sm"
          onClick={cycleSortOption}
          className="cursor-pointer text-muted-foreground"
        >
          <ArrowUpDown className="w-3.5 h-3.5 mr-1.5" />
          <span style={{ fontSize: "0.8125rem" }}>
            {sortBy === "date"
              ? "Date newest"
              : sortBy === "status"
                ? "Status"
                : "Educator"}
          </span>
        </Button>
      </div>

      {/* Territory Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div
          className="flex items-center gap-1.5 text-muted-foreground"
          style={{ fontSize: "0.75rem" }}
        >
          <Filter className="w-3.5 h-3.5" />
          <span className="font-medium">Territory</span>
        </div>
        <select
          value={filterBorough}
          onChange={(e) => setFilterBorough(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors cursor-pointer"
          style={{ fontSize: "0.8125rem" }}
        >
          <option value="All">All Boroughs</option>
          {boroughOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select
          value={filterState}
          onChange={(e) => setFilterState(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors cursor-pointer"
          style={{ fontSize: "0.8125rem" }}
        >
          <option value="All">All States</option>
          {stateOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={filterVenueType}
          onChange={(e) => setFilterVenueType(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors cursor-pointer"
          style={{ fontSize: "0.8125rem" }}
        >
          <option value="All">All Venue Types</option>
          {venueTypeOptions.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        {hasActiveFilters && (
          <button
            onClick={() => {
              setFilterBorough("All");
              setFilterState("All");
              setFilterVenueType("All");
            }}
            className="text-primary hover:opacity-80 transition-opacity cursor-pointer font-medium"
            style={{ fontSize: "0.75rem" }}
          >
            Clear filters
          </button>
        )}
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
                <CardTitle style={{ fontSize: "1rem", fontWeight: 600 }}>
                  {cardTitle}
                </CardTitle>
                <CardDescription style={{ fontSize: "0.8125rem" }}>
                  {filteredEvents.length} event
                  {filteredEvents.length !== 1 ? "s" : ""} matching your filters
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            {/* Table header */}
            <div
              className="grid grid-cols-[1fr_100px_100px_1fr_180px_100px] gap-4 px-5 py-3 border-y border-border bg-muted/30 text-muted-foreground font-medium"
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
                    className={`grid grid-cols-[1fr_100px_100px_1fr_180px_100px] gap-4 px-5 py-3.5 items-center hover:bg-muted/50 transition-colors group ${
                      event.status === "Cancelled" ? "opacity-60" : ""
                    }`}
                  >
                    <EventNameCell event={event} />
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
                    <EducatorCell event={event} />
                    {/* Status */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 font-medium w-fit ${statusColors[event.status]}`}
                        style={{ fontSize: "0.6875rem" }}
                      >
                        {event.status === "Live" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-1.5" />
                        )}
                        {getStatusLabel(event.status)}
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
