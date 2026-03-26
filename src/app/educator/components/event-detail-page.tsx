import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  MapPin,
  Clock,
  User,
  Package,
  FileText,
  Target,
  CheckCircle2,
  XCircle,
  Radio,
  Camera,
  Star,
  ShoppingCart,
  AlertTriangle,
  ChevronUp,
  Building2,
  Tag,
  Timer,
  MessageSquare,
  Image,
  Ban,
  DollarSign,
  Phone,
  Mail,
  Download,
  FileDown,
  ClipboardList,
  Boxes,
  UserX,
  Megaphone,
  Award,
  Search,
  Pencil,
} from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { Badge } from "@/app/shared/components/ui/badge";
import { Input } from "@/app/shared/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/shared/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/shared/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/shared/components/ui/dialog";
import { Checkbox } from "@/app/shared/components/ui/checkbox";
import {
  getEventById,
  isUpcoming,
  type EventStatus,
  type EventItem,
  type CancellationReason,
  type AssignedEducator,
} from "./events-data";
import { mockEducators, type Educator } from "./educator-roster-data";
import { CURRENT_EDUCATOR_MANAGER } from "./settings-data";

/* --- Phase Badge (7 states per mm-ui-006) --- */

const phaseBadge: Record<
  EventStatus,
  { bg: string; text: string; label: string }
> = {
  Unassigned: {
    bg: "bg-amber-500/10 border-amber-500/30",
    text: "text-amber-600",
    label: "Unassigned",
  },
  Pending: {
    bg: "bg-yellow-500/10 border-yellow-500/30",
    text: "text-yellow-700",
    label: "Pending Acceptance",
  },
  Confirmed: {
    bg: "bg-blue-500/10 border-blue-500/30",
    text: "text-blue-600",
    label: "Confirmed",
  },
  Live: {
    bg: "bg-green-500/10 border-green-500/30",
    text: "text-green-600",
    label: "\u25CF Live Now",
  },
  Completed: {
    bg: "bg-amber-500/10 border-amber-500/30",
    text: "text-amber-600",
    label: "Completed \u2014 Awaiting Review",
  },
  Finalized: {
    bg: "bg-muted border-border",
    text: "text-muted-foreground",
    label: "Finalized",
  },
  Cancelled: {
    bg: "bg-red-500/10 border-red-500/30",
    text: "text-red-600",
    label: "Cancelled",
  },
};

const eventTypeBadgeColors: Record<string, string> = {
  Tasting: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  Demo: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  Activation: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Promo: "bg-pink-500/10 text-pink-600 border-pink-500/20",
};

/* --- Lifecycle Indicator (6 steps + Cancelled branch per mm-ui-006) --- */

const lifecycleSteps: EventStatus[] = [
  "Unassigned",
  "Pending",
  "Confirmed",
  "Live",
  "Completed",
  "Finalized",
];

const lifecycleLabels: Record<string, string> = {
  Unassigned: "Unassigned",
  Pending: "Pending",
  Confirmed: "Confirmed",
  Live: "Live",
  Completed: "Completed",
  Finalized: "Finalized",
};

function LifecycleIndicator({ currentPhase }: { currentPhase: EventStatus }) {
  if (currentPhase === "Cancelled") {
    return (
      <div className="flex items-center gap-2">
        <Ban className="w-5 h-5 text-red-500" />
        <span
          className="text-red-600 font-semibold"
          style={{ fontSize: "0.875rem" }}
        >
          Event Cancelled
        </span>
      </div>
    );
  }

  const currentIndex = lifecycleSteps.indexOf(currentPhase);

  return (
    <div className="flex items-center gap-0 w-full max-w-2xl">
      {lifecycleSteps.map((step, i) => {
        const isActive = i === currentIndex;
        const isPast = i < currentIndex;
        return (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className={`size-7 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isActive
                    ? "bg-[#7D152D] border-[#7D152D] text-white"
                    : isPast
                      ? "bg-[#7D152D]/10 border-[#7D152D]/30 text-[#7D152D]"
                      : "bg-muted border-border text-muted-foreground"
                }`}
                style={{ fontSize: "0.6875rem", fontWeight: 600 }}
              >
                {isPast ? "\u2713" : i + 1}
              </div>
              <span
                className={`text-center ${
                  isActive
                    ? "text-foreground font-semibold"
                    : isPast
                      ? "text-muted-foreground font-medium"
                      : "text-muted-foreground"
                }`}
                style={{ fontSize: "0.625rem" }}
              >
                {lifecycleLabels[step]}
              </span>
            </div>
            {i < lifecycleSteps.length - 1 && (
              <div
                className={`h-0.5 flex-1 -mt-5 mx-1 rounded-full ${
                  i < currentIndex ? "bg-[#7D152D]/30" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* --- Cancellation Panel (shared for educator & event cancel per mm-ui-006) --- */

const cancellationReasons: CancellationReason[] = [
  "Weather",
  "Illness",
  "Car Accident",
  "Retailer Cancellation",
  "Other",
];

function CancellationPanel({
  mode,
  onCancel,
  onClose,
}: {
  mode: "educator" | "event";
  onCancel: (reason: CancellationReason) => void;
  onClose: () => void;
}) {
  const [selectedReason, setSelectedReason] =
    useState<CancellationReason | null>(null);

  const isEducatorCancel = mode === "educator";
  const title = isEducatorCancel
    ? "Cancel Educator Assignment"
    : "Cancel Event";
  const description = isEducatorCancel
    ? "Select a reason for cancellation. This will unassign the current educator and return the event to Unassigned status."
    : "Select a reason for cancellation. This is irreversible \u2014 the event will be permanently cancelled.";

  return (
    <Card
      className={`gap-0 ${isEducatorCancel ? "border-amber-500/30" : "border-destructive/30"}`}
    >
      <CardHeader className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          {isEducatorCancel ? (
            <UserX className="w-4 h-4 text-amber-600" />
          ) : (
            <Ban className="w-4 h-4 text-destructive" />
          )}
          <CardTitle style={{ fontSize: "1rem", fontWeight: 600 }}>
            {title}
          </CardTitle>
        </div>
        <CardDescription style={{ fontSize: "0.8125rem" }}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-4">
        <div className="grid gap-2">
          {cancellationReasons.map((reason) => (
            <button
              key={reason}
              onClick={() => setSelectedReason(reason)}
              className={`text-left px-4 py-2.5 rounded-lg border transition-colors cursor-pointer ${
                selectedReason === reason
                  ? "border-[#7D152D] bg-[#7D152D]/5 text-foreground"
                  : "border-border hover:bg-muted/50 text-foreground"
              }`}
              style={{ fontSize: "0.875rem" }}
            >
              {reason}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => selectedReason && onCancel(selectedReason)}
            disabled={!selectedReason}
            variant={isEducatorCancel ? "default" : "destructive"}
            className="cursor-pointer"
          >
            {isEducatorCancel
              ? "Confirm & Find Replacement"
              : "Confirm Cancellation"}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="cursor-pointer"
          >
            Go Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* --- Info Card Component --- */

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
    <Card className="gap-0">
      <CardContent className="p-4 space-y-1.5">
        <div
          className="flex items-center gap-2 text-muted-foreground"
          style={{ fontSize: "0.75rem" }}
        >
          <Icon className="w-3.5 h-3.5" />
          {label}
        </div>
        <p
          className="text-foreground"
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          {value}
        </p>
        {subValue && (
          <p
            className="text-muted-foreground"
            style={{ fontSize: "0.8125rem" }}
          >
            {subValue}
          </p>
        )}
        {action}
      </CardContent>
    </Card>
  );
}

/* --- Metric Card --- */

function MetricCard({
  icon: Icon,
  label,
  value,
  accent,
  subValue,
}: {
  icon?: React.ElementType;
  label: string;
  value: React.ReactNode;
  accent?: string;
  subValue?: string | undefined;
}) {
  return (
    <Card className="gap-0">
      <CardContent className="p-4 space-y-1.5">
        <p
          className="text-muted-foreground flex items-center gap-1.5"
          style={{ fontSize: "0.75rem" }}
        >
          {Icon && (
            <Icon
              className="w-3.5 h-3.5"
              style={accent ? { color: accent } : undefined}
            />
          )}
          {label}
        </p>
        <p
          className="text-foreground"
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            lineHeight: 1.2,
            color: accent,
          }}
        >
          {value}
        </p>
        {subValue && (
          <p
            className="text-muted-foreground"
            style={{ fontSize: "0.6875rem" }}
          >
            {subValue}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/* --- Assignment Helpers (G3, G4, G7 per mm-ui-002) --- */

function hasSchedulingConflict(educator: Educator, event: EventItem): boolean {
  return educator.upcomingEvents.some((ue) => ue.date === event.date);
}

function getScoreBreakdown(
  educator: Educator,
  event?: EventItem,
): {
  ratingScore: number;
  salesScore: number;
  punctualityScore: number;
  distancePenalty: number;
  brandBonus: number;
  total: number;
} {
  const ratingScore = Math.round((educator.avgRating / 5) * 40);
  const salesScore = Math.round(Math.min(educator.salesPerEvent / 20, 1) * 25);
  const punctualityScore = Math.round((educator.punctuality / 100) * 20);
  const distancePenalty = Math.round(
    Math.min((educator.distanceMiles ?? 50) / 50, 1) * 10,
  );
  const brandBonus =
    event && educator.brandCertifications.includes(event.brandName) ? 5 : 0;
  const total = Math.min(
    ratingScore + salesScore + punctualityScore - distancePenalty + brandBonus,
    100,
  );
  return {
    ratingScore,
    salesScore,
    punctualityScore,
    distancePenalty,
    brandBonus,
    total,
  };
}

function getCompositeScore(educator: Educator, event?: EventItem): number {
  return getScoreBreakdown(educator, event).total;
}

function getScoreColor(score: number): string {
  if (score >= 80) return "bg-green-500/10 text-green-600 border-green-500/20";
  if (score >= 60) return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  return "bg-red-500/10 text-red-600 border-red-500/20";
}

function rankEducators(educators: Educator[], event: EventItem): Educator[] {
  return [...educators].sort((a, b) => {
    const aConflict = hasSchedulingConflict(a, event);
    const bConflict = hasSchedulingConflict(b, event);
    if (aConflict !== bConflict) return aConflict ? 1 : -1;
    return getCompositeScore(b, event) - getCompositeScore(a, event);
  });
}

/* --- Availability Strip (compact 7-day view for assignment panel, G1) --- */

const SLOT_COLORS: Record<string, string> = {
  morning: "bg-yellow-400/70 text-yellow-900",
  afternoon: "bg-slate-300/70 text-slate-800",
  evening: "bg-purple-400/70 text-purple-900",
};

const SLOT_SHORT: Record<string, string> = {
  morning: "AM",
  afternoon: "PM",
  evening: "Eve",
};

function AvailabilityStrip({
  educator,
  eventDate,
}: {
  educator: Educator;
  eventDate: string;
}) {
  const center = new Date(eventDate);
  const days: { dateStr: string; dayLabel: string; isEventDay: boolean }[] = [];
  for (let i = -2; i <= 4; i++) {
    const d = new Date(center);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split("T")[0] as string;
    days.push({
      dateStr,
      dayLabel: d.toLocaleDateString("en-US", { weekday: "short" }),
      isEventDay: dateStr === eventDate,
    });
  }

  return (
    <div className="mt-2 rounded-lg border border-border bg-muted/30 p-2.5">
      <p
        className="text-muted-foreground mb-1.5 flex items-center gap-1"
        style={{ fontSize: "0.6875rem", fontWeight: 500 }}
      >
        <Clock className="w-3 h-3" /> Availability
      </p>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const avail = educator.availability.find(
            (a) => a.date === day.dateStr,
          );
          return (
            <div
              key={day.dateStr}
              className={`text-center rounded-md p-1 ${
                day.isEventDay ? "ring-1 ring-primary bg-primary/5" : ""
              }`}
            >
              <p
                className={`font-medium ${day.isEventDay ? "text-primary" : "text-muted-foreground"}`}
                style={{ fontSize: "0.5625rem" }}
              >
                {day.dayLabel}
              </p>
              {avail && avail.slots.length > 0 ? (
                <div className="flex flex-col gap-0.5 mt-0.5">
                  {avail.slots.map((slot) => (
                    <span
                      key={slot}
                      className={`rounded px-0.5 py-px ${SLOT_COLORS[slot]}`}
                      style={{ fontSize: "0.5rem", fontWeight: 500 }}
                    >
                      {SLOT_SHORT[slot]}
                    </span>
                  ))}
                </div>
              ) : (
                <span
                  className="text-muted-foreground/50 block mt-0.5"
                  style={{ fontSize: "0.5rem" }}
                >
                  —
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* --- Main Component --- */

export function EventDetailPage() {
  const { eventId } = useParams();
  const event = getEventById(eventId || "");
  const [showAssignment, setShowAssignment] = useState(false);
  const [showFinalizeConfirm, setShowFinalizeConfirm] = useState(false);
  const [showEventCancel, setShowEventCancel] = useState(false);
  const [finalized, setFinalized] = useState(false);
  const [activePhotoTab, setActivePhotoTab] = useState<
    "all" | "receipts" | "socialMedia" | "venue"
  >("all");
  const [assignmentSearch, setAssignmentSearch] = useState("");
  const [expandedEducator, setExpandedEducator] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [assignedEducators, setAssignedEducators] = useState<
    AssignedEducator[]
  >(event?.assignedEducators || []);
  const [draftSelectedIds, setDraftSelectedIds] = useState<Set<string>>(
    new Set(),
  );

  // Manager edit-before-finalize state
  const [editedNotes, setEditedNotes] = useState<string>(
    event?.educatorNotesFinal || "",
  );
  const [editedResponses, setEditedResponses] = useState<
    Record<string, string>
  >(() => {
    const initial: Record<string, string> = {};
    event?.questionnaireResponsesFinal
      ?.filter((r) => r.type === "open-text")
      .forEach((r) => {
        initial[r.questionId] = r.answer;
      });
    return initial;
  });
  const [notesEdited, setNotesEdited] = useState(false);
  const [responsesEdited, setResponsesEdited] = useState<Set<string>>(
    new Set(),
  );
  // Pre-approval checks state
  const [approvalChecks, setApprovalChecks] = useState<Set<string>>(new Set());

  if (!event) {
    return (
      <div className="p-6">
        <Link
          to="/educator/events"
          className="inline-flex items-center gap-1.5 text-primary hover:opacity-80 mb-6"
          style={{ fontSize: "0.875rem" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>
        <div className="text-center py-16">
          <AlertTriangle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Event not found.</p>
        </div>
      </div>
    );
  }

  const currentPhase: EventStatus = finalized
    ? "Finalized"
    : event.status === "Completed" && event.finalizedAt
      ? "Finalized"
      : event.status;
  const badge = phaseBadge[currentPhase];
  const isPreEvent = isUpcoming(currentPhase);

  const handleFinalize = () => {
    setFinalized(true);
    setShowFinalizeConfirm(false);
  };

  const handleOpenAssignment = () => {
    setDraftSelectedIds(new Set(assignedEducators.map((e) => e.educatorId)));
    setShowAssignment(true);
  };

  const handleConfirmAssignments = () => {
    const newAssignments: AssignedEducator[] = [];
    draftSelectedIds.forEach((id) => {
      const existing = assignedEducators.find((e) => e.educatorId === id);
      if (existing) {
        newAssignments.push(existing);
      } else {
        const edu = mockEducators.find((e) => e.id === id);
        if (edu) {
          newAssignments.push({
            educatorId: id,
            educatorName: edu.name,
            assignmentStatus: "Pending",
          });
        }
      }
    });
    setAssignedEducators(newAssignments);
    setShowAssignment(false);
    setActionFeedback(`Educator assignments updated.`);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleRemoveEducator = (educatorId: string) => {
    const educatorToRemove = assignedEducators.find(
      (e) => e.educatorId === educatorId,
    );
    setAssignedEducators((prev) =>
      prev.filter((e) => e.educatorId !== educatorId),
    );
    setActionFeedback(`${educatorToRemove?.educatorName} removed from event.`);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  // Photo gallery helpers
  const allPhotos = event.photoUrls || [];
  const categorizedPhotos = event.photoCategories;
  const displayedPhotos =
    activePhotoTab === "all" || !categorizedPhotos
      ? allPhotos
      : categorizedPhotos[activePhotoTab] || [];

  return (
    <div className="p-6 space-y-6">
      {/* Back + Header */}
      <div>
        <Link
          to="/educator/events"
          className="inline-flex items-center gap-1.5 text-primary hover:opacity-80 mb-4"
          style={{ fontSize: "0.875rem" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>
        <div className="flex items-center gap-2 flex-wrap mb-2">
          {/* Phase badge */}
          <Badge
            variant="secondary"
            className={`text-xs ${badge.bg} ${badge.text} border-transparent`}
          >
            {currentPhase === "Live" && (
              <span className="inline-block size-1.5 rounded-full bg-green-500 mr-1 animate-pulse" />
            )}
            {badge.label}
            {currentPhase === "Live" && (
              <>
                {" "}
                {event.time} – {event.duration}
              </>
            )}
          </Badge>
          {/* Event type badge */}
          <Badge
            variant="secondary"
            className={`text-xs ${eventTypeBadgeColors[event.eventType]} border-transparent`}
          >
            {event.eventType}
          </Badge>
        </div>
        <h1
          className="text-foreground"
          style={{ fontSize: "1.5rem", fontWeight: 600 }}
        >
          {event.name}
        </h1>
        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1 flex-wrap">
          <span>{event.id}</span>
          <span>·</span>
          <Building2 className="size-3" />
          <span>{event.clientName}</span>
          <span>·</span>
          <Megaphone className="size-3" />
          <span>{event.campaignName}</span>
          <span>·</span>
          <Tag className="size-3" />
          <span>{event.brandName}</span>
        </p>
      </div>

      {/* Lifecycle Indicator */}
      <Card className="gap-0">
        <CardContent className="px-5 py-4">
          <LifecycleIndicator currentPhase={currentPhase} />
        </CardContent>
      </Card>

      {/* Cancelled event: minimal detail */}
      {currentPhase === "Cancelled" && (
        <Card className="gap-0 border-red-500/20">
          <CardContent className="px-5 py-5 space-y-3">
            <div className="flex items-center gap-3">
              <Ban className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-foreground" style={{ fontWeight: 600 }}>
                  Event Cancelled
                </p>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "0.875rem" }}
                >
                  Reason: {event.cancellationReason || "Not specified"}
                </p>
                {event.cancelledAt && (
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    Cancelled on{" "}
                    {new Date(event.cancelledAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Cards Grid */}
      {currentPhase !== "Cancelled" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            icon={Clock}
            label="Date & Time"
            value={new Date(event.date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            subValue={
              <span className="flex items-center gap-1.5">
                <Timer className="w-3 h-3" />
                {event.time} ({event.duration})
              </span>
            }
          />
          <InfoCard
            icon={MapPin}
            label="Venue"
            value={event.venue}
            subValue={event.venueAddress}
          />
          {/* Multi-educator cards (G6, G7 per mm-ui-002 §4) */}
          {assignedEducators.length > 0 ? (
            <Card className="gap-0 md:col-span-1">
              <CardContent className="p-4 space-y-2">
                <div
                  className="flex items-center justify-between text-muted-foreground"
                  style={{ fontSize: "0.75rem" }}
                >
                  <span className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    Assigned Educators ({assignedEducators.length})
                  </span>
                  {isPreEvent && (
                    <button
                      onClick={handleOpenAssignment}
                      className="text-primary hover:opacity-80 transition-opacity cursor-pointer font-medium"
                    >
                      Manage
                    </button>
                  )}
                </div>
                {assignedEducators.map((ae) => {
                  const edu = mockEducators.find((e) => e.id === ae.educatorId);
                  return (
                    <div
                      key={ae.educatorId}
                      className="flex items-center justify-between p-2 rounded-md border border-border"
                    >
                      <div className="space-y-0.5">
                        <p
                          className="text-foreground flex items-center gap-2"
                          style={{ fontSize: "0.875rem", fontWeight: 500 }}
                        >
                          {ae.educatorName}
                          {edu?.distanceMiles != null && (
                            <span
                              className="text-muted-foreground"
                              style={{ fontSize: "0.6875rem" }}
                            >
                              ~{edu.distanceMiles} mi
                            </span>
                          )}
                          {ae.assignmentStatus === "Accepted" && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                          )}
                          {ae.assignmentStatus === "Pending" && (
                            <span
                              className="inline-flex items-center rounded-full border px-1.5 py-0 bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
                              style={{
                                fontSize: "0.5625rem",
                                fontWeight: 500,
                                lineHeight: "1rem",
                              }}
                            >
                              Pending
                            </span>
                          )}
                          {ae.assignmentStatus === "Declined" && (
                            <span
                              className="inline-flex items-center rounded-full border px-1.5 py-0 bg-red-500/10 text-red-600 border-red-500/20"
                              style={{
                                fontSize: "0.5625rem",
                                fontWeight: 500,
                                lineHeight: "1rem",
                              }}
                            >
                              Declined
                            </span>
                          )}
                        </p>
                      </div>
                      {isPreEvent && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveEducator(ae.educatorId)}
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ) : (
            <InfoCard
              icon={User}
              label="Assigned Educators"
              value={<span className="text-amber-500">Not Assigned</span>}
              action={
                isPreEvent ? (
                  <button
                    onClick={handleOpenAssignment}
                    className="text-primary hover:opacity-80 transition-opacity cursor-pointer font-medium mt-1"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    Assign Educators
                  </button>
                ) : undefined
              }
            />
          )}
          <InfoCard
            icon={Building2}
            label="Account"
            value={event.venue.split(",")[0]}
            subValue={
              <span
                className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2 py-0.5 mt-1"
                style={{ fontSize: "0.6875rem", fontWeight: 500 }}
              >
                {event.accountType}
              </span>
            }
          />
          <InfoCard
            icon={Package}
            label="Products"
            value={`${event.products.length} product${event.products.length !== 1 ? "s" : ""}`}
            subValue={event.products.join(", ")}
          />
          <InfoCard
            icon={Tag}
            label="Brand & Duration"
            value={event.brandName}
            subValue={`Duration: ${event.duration}`}
          />
        </div>
      )}

      {/* Pre-Event extra sections: Compensation, Kit/Materials, Contact Info */}
      {currentPhase !== "Cancelled" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {event.compensation && (
            <InfoCard
              icon={DollarSign}
              label="Compensation"
              value={event.compensation.rate}
              subValue={event.compensation.notes}
            />
          )}
          {event.kitMaterials && (
            <Card className="gap-0">
              <CardContent className="p-4 space-y-0.5">
                <div
                  className="flex items-center gap-2 text-muted-foreground mb-1.5"
                  style={{ fontSize: "0.75rem" }}
                >
                  <Boxes className="w-3.5 h-3.5" />
                  Kit / Materials
                </div>
                <p
                  className="text-foreground"
                  style={{ fontSize: "0.875rem", fontWeight: 500 }}
                >
                  Pickup: {event.kitMaterials.pickupLocation}
                </p>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="items" className="border-none">
                    <AccordionTrigger
                      className="py-2 hover:no-underline text-primary hover:opacity-80 transition-opacity [&>svg]:text-primary"
                      style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                    >
                      View Items ({event.kitMaterials.items.length})
                    </AccordionTrigger>
                    <AccordionContent className="pb-2">
                      <ul
                        className="text-muted-foreground space-y-1 mt-1"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        {event.kitMaterials.items.map((item) => (
                          <li key={item} className="flex items-start gap-1.5">
                            <span className="text-border mt-0.5">&bull;</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          )}
          {event.storeContactName && (
            <Card className="gap-0">
              <CardContent className="p-4 space-y-1.5">
                <div
                  className="flex items-center gap-2 text-muted-foreground"
                  style={{ fontSize: "0.75rem" }}
                >
                  <Phone className="w-3.5 h-3.5" />
                  Store Contact
                </div>
                <p
                  className="text-foreground"
                  style={{ fontSize: "0.875rem", fontWeight: 500 }}
                >
                  {event.storeContactName}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  {event.storeContactPhone && (
                    <a
                      href={`tel:${event.storeContactPhone}`}
                      className="text-primary hover:opacity-80 flex items-center gap-1"
                      style={{ fontSize: "0.8125rem" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone className="w-3 h-3" />
                      {event.storeContactPhone}
                    </a>
                  )}
                  {event.storeContactEmail && (
                    <a
                      href={`mailto:${event.storeContactEmail}`}
                      className="text-primary hover:opacity-80 flex items-center gap-1"
                      style={{ fontSize: "0.8125rem" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail className="w-3 h-3" />
                      {event.storeContactEmail}
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          {/* G9: Educator Manager contact info (mm-ui-002 §3) */}
          <Card className="gap-0">
            <CardContent className="p-4 space-y-1.5">
              <div
                className="flex items-center gap-2 text-muted-foreground"
                style={{ fontSize: "0.75rem" }}
              >
                <User className="w-3.5 h-3.5" />
                Your Contact Info
              </div>
              <p
                className="text-foreground"
                style={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                {CURRENT_EDUCATOR_MANAGER.firstName}{" "}
                {CURRENT_EDUCATOR_MANAGER.lastName}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={`tel:${CURRENT_EDUCATOR_MANAGER.phone}`}
                  className="text-primary hover:opacity-80 flex items-center gap-1"
                  style={{ fontSize: "0.8125rem" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Phone className="w-3 h-3" />
                  {CURRENT_EDUCATOR_MANAGER.phone}
                </a>
                <a
                  href={`mailto:${CURRENT_EDUCATOR_MANAGER.email}`}
                  className="text-primary hover:opacity-80 flex items-center gap-1"
                  style={{ fontSize: "0.8125rem" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Mail className="w-3 h-3" />
                  {CURRENT_EDUCATOR_MANAGER.email}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Educator Assignment Panel (enhanced per mm-ui-002 §4) */}
      {/* Educator Assignment Modal */}
      <Dialog
        open={showAssignment && isPreEvent}
        onOpenChange={setShowAssignment}
      >
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="px-5 pt-5 pb-3 shrink-0 border-b border-border">
            <DialogTitle style={{ fontSize: "1.125rem", fontWeight: 600 }}>
              Manage Educators
            </DialogTitle>
            <DialogDescription style={{ fontSize: "0.875rem" }}>
              Select educators to assign them to this event. Ranked by
              geography, score, and availability.
            </DialogDescription>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                value={assignmentSearch}
                onChange={(e) => setAssignmentSearch(e.target.value)}
                placeholder="Search educators by name..."
                className="pl-9 h-9"
              />
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-5 pb-0 bg-muted/20">
            <div className="divide-y divide-border rounded-lg border border-border bg-card overflow-hidden">
              {rankEducators(
                mockEducators
                  .filter((e) => e.status === "Active")
                  .filter(
                    (e) =>
                      !assignmentSearch ||
                      e.name
                        .toLowerCase()
                        .includes(assignmentSearch.toLowerCase()),
                  ),
                event,
              ).map((edu) => {
                const conflict = hasSchedulingConflict(edu, event);
                const isBrandCertified = edu.brandCertifications.includes(
                  event.brandName,
                );
                const isExpanded = expandedEducator === edu.id;
                const isSelected = draftSelectedIds.has(edu.id);
                const score = getCompositeScore(edu, event);
                const breakdown = getScoreBreakdown(edu, event);
                return (
                  <div
                    key={edu.id}
                    className={`p-3.5 transition-colors ${
                      conflict ? "bg-muted/30" : "hover:bg-muted/50"
                    } ${
                      isSelected
                        ? "bg-primary/5 border-l-2 border-l-primary"
                        : "border-l-2 border-l-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`edu-${edu.id}`}
                        checked={isSelected}
                        disabled={conflict}
                        className="mt-0.5"
                        onCheckedChange={(checked) => {
                          setDraftSelectedIds((prev) => {
                            const next = new Set(prev);
                            if (checked) next.add(edu.id);
                            else next.delete(edu.id);
                            return next;
                          });
                        }}
                      />
                      <div className="flex items-center justify-between flex-1 min-w-0">
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <label
                              htmlFor={`edu-${edu.id}`}
                              className={`text-foreground cursor-pointer ${conflict ? "opacity-60" : ""}`}
                              style={{
                                fontSize: "0.875rem",
                                fontWeight: 500,
                              }}
                            >
                              {edu.name}
                            </label>
                            {edu.distanceMiles != null && (
                              <span
                                className="text-muted-foreground"
                                style={{ fontSize: "0.6875rem" }}
                              >
                                ~{edu.distanceMiles} mi
                              </span>
                            )}
                            {isBrandCertified && (
                              <span
                                className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0 bg-primary/10 text-primary border border-primary/20"
                                style={{
                                  fontSize: "0.5625rem",
                                  fontWeight: 500,
                                  lineHeight: "1.125rem",
                                }}
                              >
                                <Award className="w-2.5 h-2.5" />
                                {event.brandName}
                              </span>
                            )}
                            {conflict && (
                              <span
                                className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0 bg-red-500/10 text-red-600 border border-red-500/20"
                                style={{
                                  fontSize: "0.5625rem",
                                  fontWeight: 500,
                                  lineHeight: "1.125rem",
                                }}
                              >
                                <AlertTriangle className="w-2.5 h-2.5" />
                                Conflict
                              </span>
                            )}
                            {/* Composite score badge */}
                            <span
                              className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0 border font-semibold ${getScoreColor(score)} ${conflict ? "opacity-60" : ""}`}
                              style={{
                                fontSize: "0.625rem",
                                fontWeight: 600,
                                lineHeight: "1.125rem",
                              }}
                              title={`Score: ${score}/100`}
                            >
                              ★ {score}
                            </span>
                          </div>
                          {/* Metrics row */}
                          <div
                            className={`flex items-center gap-3 text-muted-foreground ${conflict ? "opacity-60" : ""}`}
                            style={{ fontSize: "0.75rem" }}
                          >
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-400" />{" "}
                              {edu.avgRating}
                            </span>
                            <span className="flex items-center gap-1">
                              <ShoppingCart className="w-3 h-3" />{" "}
                              {edu.salesPerEvent}/evt
                            </span>
                            <span>{edu.punctuality}% on-time</span>
                          </div>
                          {/* G2: Brand certifications row */}
                          {edu.brandCertifications.length > 0 && (
                            <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                              {edu.brandCertifications.map((cert) => (
                                <span
                                  key={cert}
                                  className={`inline-flex items-center rounded-full px-1.5 py-0 border ${
                                    cert === event.brandName
                                      ? "bg-primary/10 text-primary border-primary/20"
                                      : "bg-muted text-muted-foreground border-border"
                                  }`}
                                  style={{
                                    fontSize: "0.5625rem",
                                    fontWeight: 500,
                                    lineHeight: "1rem",
                                  }}
                                >
                                  {cert}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-3">
                          {/* G1: Toggle availability strip */}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setExpandedEducator(isExpanded ? null : edu.id)
                            }
                            className="cursor-pointer h-7 px-2 text-muted-foreground"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <Clock className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    {/* G1: Expandable availability calendar strip + score breakdown */}
                    {isExpanded && (
                      <div className="mt-2 ml-8 space-y-2">
                        <AvailabilityStrip
                          educator={edu}
                          eventDate={event.date}
                        />
                        {/* Score breakdown */}
                        <div className="rounded-lg border border-border bg-muted/30 p-2.5">
                          <p
                            className="text-muted-foreground mb-1.5 flex items-center gap-1"
                            style={{ fontSize: "0.6875rem", fontWeight: 500 }}
                          >
                            <Star className="w-3 h-3 text-amber-400" /> Score
                            Breakdown
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 border font-semibold ${getScoreColor(breakdown.total)}`}
                              style={{ fontSize: "0.75rem" }}
                            >
                              {breakdown.total}/100
                            </span>
                            <span
                              className="text-muted-foreground"
                              style={{ fontSize: "0.625rem" }}
                            >
                              Rating {breakdown.ratingScore} + Sales{" "}
                              {breakdown.salesScore} + Punctuality{" "}
                              {breakdown.punctualityScore} − Distance{" "}
                              {breakdown.distancePenalty}
                              {breakdown.brandBonus > 0 &&
                                ` + Brand ${breakdown.brandBonus}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-5 border-t border-border shrink-0 bg-muted/10 flex items-center justify-end gap-3 rounded-b-lg">
            <Button
              variant="outline"
              onClick={() => setShowAssignment(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAssignments}
              className="cursor-pointer"
            >
              Confirm Assignments
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Read-only event details */}
      {currentPhase !== "Cancelled" && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="gap-0">
            <CardHeader className="px-5 pt-5 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <CardTitle style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                  Instructions
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <p className="text-foreground" style={{ fontSize: "0.875rem" }}>
                {event.instructions}
              </p>
            </CardContent>
          </Card>
          <Card className="gap-0">
            <CardHeader className="px-5 pt-5 pb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <CardTitle style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                  Goals
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <p className="text-foreground" style={{ fontSize: "0.875rem" }}>
                {event.goals}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notes */}
      {event.notes && currentPhase !== "Cancelled" && (
        <Card className="gap-0">
          <CardHeader className="px-5 pt-5 pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
              <CardTitle style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                Notes
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <p
              className="text-muted-foreground"
              style={{ fontSize: "0.875rem" }}
            >
              {event.notes}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Live monitoring section (6 data streams per mm-ui-002) */}
      {event.status === "Live" && event.liveMetrics && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-green-500 animate-pulse" />
            <h2
              className="text-foreground"
              style={{ fontSize: "1.125rem", fontWeight: 600 }}
            >
              Live Monitoring
            </h2>
          </div>
          {/* G12: Failed check-in prominent alert */}
          {event.checkInStatus === "failed" && (
            <Card className="gap-0 border-red-500/40 bg-red-500/5">
              <CardContent className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-9 rounded-full bg-red-500/10">
                    <XCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p
                      className="text-red-600"
                      style={{ fontWeight: 600, fontSize: "0.875rem" }}
                    >
                      Failed Check-In — Educator not within geofence radius
                    </p>
                    <p
                      className="text-red-500/70"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      Category 4 notification sent. Contact educator to verify
                      location.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
            {/* 1. Check-In */}
            <Card className="gap-0">
              <CardContent className="p-4 space-y-1.5">
                <p
                  className="text-muted-foreground flex items-center gap-1.5"
                  style={{ fontSize: "0.75rem" }}
                >
                  {event.checkInStatus === "checked-in" ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  ) : event.checkInStatus === "failed" ? (
                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-yellow-500" />
                  )}
                  Check-In
                </p>
                <p
                  className={`${event.checkInStatus === "failed" ? "text-red-600" : "text-foreground"}`}
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  {event.checkInStatus === "checked-in"
                    ? "Confirmed"
                    : event.checkInStatus === "failed"
                      ? "Failed"
                      : "Pending"}
                </p>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "0.75rem" }}
                >
                  {event.checkInTime || "\u2014"}
                </p>
              </CardContent>
            </Card>
            {/* 2. Samples */}
            <MetricCard
              icon={ShoppingCart}
              label="Samples"
              value={event.liveMetrics.samplesDistributed}
            />
            {/* 3. Consumer Interactions */}
            <MetricCard
              icon={User}
              label="Interactions"
              value={event.liveMetrics.consumerInteractions}
            />
            {/* 4. Sales (G13) */}
            <MetricCard
              icon={DollarSign}
              label="Sales"
              value={event.liveMetrics.salesGenerated}
            />
            {/* 5. Questionnaires */}
            <MetricCard
              icon={ClipboardList}
              label="Questionnaires"
              value={event.questionnairesCompleted ?? 0}
            />
            {/* 6. Inventory */}
            <MetricCard
              icon={Boxes}
              label="Inventory"
              value={event.inventoryData?.current ?? "\u2014"}
              subValue={
                event.inventoryData
                  ? `Pre-event: ${event.inventoryData.preEvent}`
                  : undefined
              }
            />
            {/* 7. Photos */}
            <MetricCard
              icon={Camera}
              label="Photos"
              value={event.photoCount || 0}
            />
          </div>

          {/* Educator Live Notes stream */}
          {event.educatorLiveNotes && event.educatorLiveNotes.length > 0 && (
            <Card className="gap-0">
              <CardHeader className="px-5 pt-5 pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <CardTitle style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                    Educator Notes
                  </CardTitle>
                  <span
                    className="text-muted-foreground"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    ({event.educatorLiveNotes.length})
                  </span>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="space-y-2">
                  {event.educatorLiveNotes.map((note, i) => (
                    <p
                      key={i}
                      className="text-foreground pl-3 border-l-2 border-border"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {note}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Post-event finalization section */}
      {(event.status === "Completed" || currentPhase === "Finalized") &&
        event.finalStats && (
          <div className="space-y-4">
            <h2
              className="text-foreground"
              style={{ fontSize: "1.125rem", fontWeight: 600 }}
            >
              Final Stats
            </h2>

            {/* Check-in record */}
            {event.checkInStatus && (
              <Card className="gap-0">
                <CardContent className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {event.checkInStatus === "checked-in" ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                    <div>
                      <p
                        className="text-foreground"
                        style={{ fontSize: "0.875rem", fontWeight: 500 }}
                      >
                        Geo Check-In:{" "}
                        {event.checkInStatus === "checked-in"
                          ? "Confirmed"
                          : "Failed"}
                      </p>
                      <p
                        className="text-muted-foreground"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        {event.checkInTime
                          ? `Arrived at ${event.checkInTime}`
                          : "No check-in recorded"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats grid (expanded per mm-ui-002) */}
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              <MetricCard
                icon={ShoppingCart}
                label="Total Samples"
                value={event.finalStats.totalSamples}
              />
              <MetricCard
                icon={User}
                label="Interactions"
                value={event.finalStats.totalInteractions}
              />
              <MetricCard label="Sales" value={event.finalStats.totalSales} />
              <MetricCard
                icon={Star}
                label="Rating"
                value={event.finalStats.rating}
                accent="#d97706"
              />
              <MetricCard
                icon={ClipboardList}
                label="Questionnaires"
                value={event.questionnairesCompletedFinal ?? 0}
              />
              <MetricCard
                icon={Camera}
                label="Photos"
                value={event.finalStats.photosSubmitted}
              />
              <MetricCard
                icon={Timer}
                label="Actual Duration"
                value={event.finalStats.duration}
              />
            </div>

            {/* Inventory Comparison (pre vs post per mm-ui-002) */}
            {event.inventoryComparison && (
              <Card className="gap-0">
                <CardHeader className="px-5 pt-5 pb-3">
                  <div className="flex items-center gap-2">
                    <Boxes className="w-4 h-4 text-muted-foreground" />
                    <CardTitle
                      style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                    >
                      Inventory Comparison
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p
                        className="text-muted-foreground"
                        style={{ fontSize: "0.75rem" }}
                      >
                        Pre-Event
                      </p>
                      <p
                        className="text-foreground"
                        style={{ fontSize: "1.25rem", fontWeight: 600 }}
                      >
                        {event.inventoryComparison.preEvent}
                      </p>
                    </div>
                    <div className="text-center">
                      <p
                        className="text-muted-foreground"
                        style={{ fontSize: "0.75rem" }}
                      >
                        Post-Event
                      </p>
                      <p
                        className="text-foreground"
                        style={{ fontSize: "1.25rem", fontWeight: 600 }}
                      >
                        {event.inventoryComparison.postEvent}
                      </p>
                    </div>
                    <div className="text-center">
                      <p
                        className="text-muted-foreground"
                        style={{ fontSize: "0.75rem" }}
                      >
                        Sold / Used
                      </p>
                      <p
                        className="text-green-600"
                        style={{ fontSize: "1.25rem", fontWeight: 600 }}
                      >
                        -
                        {event.inventoryComparison.preEvent -
                          event.inventoryComparison.postEvent}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Educator Notes (final) — editable before finalize */}
            {event.educatorNotesFinal != null && (
              <Card className="gap-0">
                <CardHeader className="px-5 pt-5 pb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <CardTitle
                      style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                    >
                      Educator Notes
                    </CardTitle>
                    {notesEdited && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 bg-amber-500/10 text-amber-600 border-amber-500/20"
                        style={{ fontSize: "0.625rem", fontWeight: 500 }}
                      >
                        <Pencil className="w-2.5 h-2.5" />
                        Edited by manager
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  {event.status === "Completed" &&
                  !finalized &&
                  !event.finalizedAt ? (
                    <textarea
                      value={editedNotes}
                      onChange={(e) => {
                        setEditedNotes(e.target.value);
                        if (e.target.value !== event.educatorNotesFinal) {
                          setNotesEdited(true);
                        } else {
                          setNotesEdited(false);
                        }
                      }}
                      rows={4}
                      className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors resize-y"
                      style={{ fontSize: "0.875rem" }}
                    />
                  ) : (
                    <p
                      className="text-foreground"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {editedNotes || event.educatorNotesFinal}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Questionnaire Responses — editable open-text before finalize */}
            {event.questionnaireResponsesFinal &&
              event.questionnaireResponsesFinal.length > 0 && (
                <Card className="gap-0">
                  <CardHeader className="px-5 pt-5 pb-3">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-muted-foreground" />
                      <CardTitle
                        style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                      >
                        Questionnaire Responses
                      </CardTitle>
                      <span
                        className="text-muted-foreground"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        ({event.questionnaireResponsesFinal.length})
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-5 pb-5">
                    <div className="space-y-4">
                      {event.questionnaireResponsesFinal.map((response) => {
                        const isOpenText = response.type === "open-text";
                        const isDropdown = response.type === "dropdown";
                        const canEdit =
                          (isOpenText || isDropdown) &&
                          event.status === "Completed" &&
                          !finalized &&
                          !event.finalizedAt;
                        const wasEdited = responsesEdited.has(
                          response.questionId,
                        );
                        return (
                          <div
                            key={response.questionId}
                            className="rounded-lg border border-border p-3 space-y-1.5"
                          >
                            <div className="flex items-center gap-2">
                              <p
                                className="text-muted-foreground"
                                style={{
                                  fontSize: "0.75rem",
                                  fontWeight: 500,
                                }}
                              >
                                {response.questionText}
                              </p>
                              <span
                                className="inline-flex items-center rounded-full border px-1.5 py-0 bg-muted text-muted-foreground border-border flex-shrink-0"
                                style={{
                                  fontSize: "0.5625rem",
                                  fontWeight: 500,
                                  lineHeight: "1rem",
                                }}
                              >
                                {response.type === "open-text"
                                  ? "Open Text"
                                  : response.type === "yes-no"
                                    ? "Yes / No"
                                    : response.type === "rating"
                                      ? "Rating"
                                      : response.type === "dropdown"
                                        ? "Dropdown"
                                        : "Multiple Choice"}
                              </span>
                              {wasEdited && (
                                <span
                                  className="inline-flex items-center gap-1 rounded-full border px-1.5 py-0 bg-amber-500/10 text-amber-600 border-amber-500/20 flex-shrink-0"
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
                            {canEdit && isOpenText ? (
                              <textarea
                                value={
                                  editedResponses[response.questionId] ??
                                  response.answer
                                }
                                onChange={(e) => {
                                  setEditedResponses((prev) => ({
                                    ...prev,
                                    [response.questionId]: e.target.value,
                                  }));
                                  if (e.target.value !== response.answer) {
                                    setResponsesEdited((prev) =>
                                      new Set(prev).add(response.questionId),
                                    );
                                  } else {
                                    setResponsesEdited((prev) => {
                                      const next = new Set(prev);
                                      next.delete(response.questionId);
                                      return next;
                                    });
                                  }
                                }}
                                rows={3}
                                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors resize-y"
                                style={{ fontSize: "0.8125rem" }}
                              />
                            ) : canEdit && isDropdown ? (
                              <select
                                value={
                                  editedResponses[response.questionId] ??
                                  response.answer
                                }
                                onChange={(e) => {
                                  setEditedResponses((prev) => ({
                                    ...prev,
                                    [response.questionId]: e.target.value,
                                  }));
                                  if (e.target.value !== response.answer) {
                                    setResponsesEdited((prev) =>
                                      new Set(prev).add(response.questionId),
                                    );
                                  } else {
                                    setResponsesEdited((prev) => {
                                      const next = new Set(prev);
                                      next.delete(response.questionId);
                                      return next;
                                    });
                                  }
                                }}
                                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors cursor-pointer"
                                style={{ fontSize: "0.8125rem" }}
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
                                style={{ fontSize: "0.8125rem" }}
                              >
                                {isOpenText
                                  ? (editedResponses[response.questionId] ??
                                    response.answer)
                                  : isDropdown
                                    ? (editedResponses[response.questionId] ??
                                      response.answer)
                                    : response.type === "rating"
                                      ? `${response.answer} / 5`
                                      : response.answer}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

            {/* Photo gallery with categories per mm-ui-002 */}
            {allPhotos.length > 0 && (
              <Card className="gap-0">
                <CardHeader className="px-5 pt-5 pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image className="w-4 h-4 text-muted-foreground" />
                      <CardTitle
                        style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                      >
                        Event Photos
                      </CardTitle>
                      <span
                        className="text-muted-foreground"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        ({allPhotos.length})
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Download All
                    </Button>
                  </div>
                  {/* Photo category tabs */}
                  {categorizedPhotos && (
                    <div className="flex gap-1 mt-3">
                      {(
                        [
                          {
                            key: "all" as const,
                            label: "All",
                            count: allPhotos.length,
                          },
                          {
                            key: "receipts" as const,
                            label: "Receipts",
                            count: categorizedPhotos.receipts.length,
                          },
                          {
                            key: "socialMedia" as const,
                            label: "Social Media",
                            count: categorizedPhotos.socialMedia.length,
                          },
                          {
                            key: "venue" as const,
                            label: "Venue",
                            count: categorizedPhotos.venue.length,
                          },
                        ] as const
                      ).map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setActivePhotoTab(tab.key)}
                          className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                            activePhotoTab === tab.key
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          style={{ fontSize: "0.75rem" }}
                        >
                          {tab.label}
                          <span className="ml-1 text-muted-foreground">
                            {tab.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {displayedPhotos.map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-lg bg-muted border border-border flex items-center justify-center"
                      >
                        <Camera className="w-5 h-5 text-muted-foreground/40" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Export Data button */}
            {(event.status === "Completed" || currentPhase === "Finalized") && (
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <FileDown className="w-3.5 h-3.5 mr-1.5" />
                  Export Event Data
                </Button>
              </div>
            )}

            {/* Pre-Approval Checklist */}
            {event.preApprovalChecks &&
              event.preApprovalChecks.length > 0 &&
              (event.status === "Completed" ||
                currentPhase === "Finalized") && (
                <Card className="gap-0">
                  <CardHeader className="px-5 pt-5 pb-3">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-muted-foreground" />
                      <CardTitle
                        style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                      >
                        Pre-Approval Checklist
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="px-5 pb-5">
                    <div className="space-y-2.5">
                      {event.preApprovalChecks.map((check) => {
                        const isFinalizedView =
                          finalized || !!event.finalizedAt;
                        const isChecked = isFinalizedView
                          ? true
                          : approvalChecks.has(check.id);
                        return (
                          <div
                            key={check.id}
                            className="flex items-center gap-2.5"
                          >
                            <Checkbox
                              id={`detail-${check.id}`}
                              checked={isChecked}
                              disabled={isFinalizedView}
                              onCheckedChange={(checked) => {
                                setApprovalChecks((prev) => {
                                  const next = new Set(prev);
                                  if (checked) {
                                    next.add(check.id);
                                  } else {
                                    next.delete(check.id);
                                  }
                                  return next;
                                });
                              }}
                            />
                            <label
                              htmlFor={`detail-${check.id}`}
                              className={`cursor-pointer select-none ${
                                isFinalizedView
                                  ? "text-muted-foreground"
                                  : "text-foreground"
                              }`}
                              style={{ fontSize: "0.875rem" }}
                            >
                              {check.label}
                              {check.required && !isFinalizedView && (
                                <span className="text-red-500 ml-0.5">
                                  *
                                </span>
                              )}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

            {/* Approve & Finalize */}
            {!finalized &&
              !event.finalizedAt &&
              event.status === "Completed" && (
                <Card
                  className={`gap-0 ${showFinalizeConfirm ? "border-amber-500/40" : "border-amber-500/30"}`}
                >
                  <CardContent className="px-5 py-5">
                    {showFinalizeConfirm ? (
                      <div className="space-y-3">
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
                              will lock the event record for all actors and
                              terminate the educator&apos;s editing window
                              immediately.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 ml-8">
                          <Button
                            onClick={handleFinalize}
                            className="cursor-pointer"
                          >
                            Yes, Approve & Finalize
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setShowFinalizeConfirm(false)}
                            className="cursor-pointer"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      (() => {
                        const requiredChecks =
                          event.preApprovalChecks?.filter(
                            (c) => c.required,
                          ) ?? [];
                        const allChecked =
                          requiredChecks.length === 0 ||
                          requiredChecks.every((c) =>
                            approvalChecks.has(c.id),
                          );
                        return (
                          <div className="flex items-center justify-between">
                            <div>
                              <p
                                className="text-foreground"
                                style={{ fontWeight: 600 }}
                              >
                                Ready for Review
                              </p>
                              <p
                                className="text-muted-foreground"
                                style={{ fontSize: "0.875rem" }}
                              >
                                {allChecked
                                  ? "Review the stats above and finalize this event to unlock reporting."
                                  : "Complete all required pre-approval checks to finalize."}
                              </p>
                            </div>
                            <Button
                              onClick={() => setShowFinalizeConfirm(true)}
                              className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-white"
                              disabled={!allChecked}
                            >
                              Approve & Finalize
                            </Button>
                          </div>
                        );
                      })()
                    )}
                  </CardContent>
                </Card>
              )}

            {(finalized || event.finalizedAt) && (
              <Card className="gap-0 border-green-500/30">
                <CardContent className="px-5 py-5 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-foreground" style={{ fontWeight: 600 }}>
                      Event Finalized
                    </p>
                    <p
                      className="text-muted-foreground"
                      style={{ fontSize: "0.875rem" }}
                    >
                      This event has been finalized and locked. The data is now
                      available for reporting.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

      {/* Cancellation actions (pre-event only, per mm-ui-006 branches) */}
      {isPreEvent && !showEventCancel && (
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => setShowEventCancel(true)}
            className="cursor-pointer text-destructive border-destructive/30 hover:bg-destructive/5"
          >
            <Ban className="w-4 h-4 mr-1.5" />
            Cancel Event
          </Button>
        </div>
      )}

      {showEventCancel && isPreEvent && (
        <CancellationPanel
          mode="event"
          onCancel={(_reason) => {
            setShowEventCancel(false);
          }}
          onClose={() => setShowEventCancel(false)}
        />
      )}

      {/* G15: 24-hour editing window indicator for Completed events */}
      {event.status === "Completed" &&
        !finalized &&
        !event.finalizedAt &&
        event.completedAt && (
          <Card className="gap-0 border-blue-500/20 bg-blue-500/5">
            <CardContent className="px-5 py-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <p className="text-blue-600" style={{ fontSize: "0.8125rem" }}>
                Educator editing window active until{" "}
                <strong>
                  {new Date(
                    new Date(event.completedAt).getTime() + 24 * 60 * 60 * 1000,
                  ).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </strong>
              </p>
            </CardContent>
          </Card>
        )}

      {/* G16: Action feedback banner */}
      {actionFeedback && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-2">
          <Card className="gap-0 border-green-500/30 bg-green-50 shadow-lg">
            <CardContent className="px-4 py-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              <p className="text-green-800" style={{ fontSize: "0.8125rem" }}>
                {actionFeedback}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
