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
  ChevronDown,
  Building2,
  Tag,
  Timer,
  MessageSquare,
  Image,
  Ban,
  DollarSign,
  Phone,
  Download,
  FileDown,
  ClipboardList,
  Boxes,
  UserX,
  Megaphone,
} from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { Badge } from "@/app/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/shared/components/ui/card";
import {
  getEventById,
  isUpcoming,
  type EventStatus,
  type CancellationReason,
} from "./events-data";
import { mockEducators } from "./educator-roster-data";

/* --- Phase Badge (7 states per mm-ui-006) --- */

const phaseBadge: Record<EventStatus, { bg: string; text: string; label: string }> =
  {
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
        <span className="text-red-600 font-semibold" style={{ fontSize: "0.875rem" }}>
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
  const title = isEducatorCancel ? "Cancel Educator Assignment" : "Cancel Event";
  const description = isEducatorCancel
    ? "Select a reason for cancellation. This will unassign the current educator and return the event to Unassigned status."
    : "Select a reason for cancellation. This is irreversible \u2014 the event will be permanently cancelled.";

  return (
    <Card className={`gap-0 ${isEducatorCancel ? "border-amber-500/30" : "border-destructive/30"}`}>
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
            {isEducatorCancel ? "Confirm & Find Replacement" : "Confirm Cancellation"}
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
          <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
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
          <p className="text-muted-foreground" style={{ fontSize: "0.6875rem" }}>
            {subValue}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/* --- Main Component --- */

export function EventDetailPage() {
  const { eventId } = useParams();
  const event = getEventById(eventId || "");
  const [showAssignment, setShowAssignment] = useState(false);
  const [showFinalizeConfirm, setShowFinalizeConfirm] = useState(false);
  const [showEducatorCancel, setShowEducatorCancel] = useState(false);
  const [showEventCancel, setShowEventCancel] = useState(false);
  const [finalized, setFinalized] = useState(false);
  const [assignedEducator, setAssignedEducator] = useState(
    event?.educatorName || null,
  );
  const [activePhotoTab, setActivePhotoTab] = useState<"all" | "receipts" | "socialMedia" | "venue">("all");

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

  const handleAssign = (name: string) => {
    setAssignedEducator(name);
    setShowAssignment(false);
  };

  const handleEducatorCancel = (_reason: CancellationReason) => {
    setAssignedEducator(null);
    setShowEducatorCancel(false);
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
        <h1 className="text-foreground" style={{ fontSize: "1.5rem", fontWeight: 600 }}>
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
                <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>
                  Reason: {event.cancellationReason || "Not specified"}
                </p>
                {event.cancelledAt && (
                  <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
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
          <InfoCard
            icon={User}
            label="Assigned Educator"
            value={
              assignedEducator ? (
                <span className="flex items-center gap-2">
                  {assignedEducator}
                  {currentPhase === "Pending" && (
                    <span
                      className="inline-flex items-center rounded-full border px-1.5 py-0 bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
                      style={{ fontSize: "0.625rem", fontWeight: 500, lineHeight: "1.125rem" }}
                    >
                      Pending
                    </span>
                  )}
                  {currentPhase === "Confirmed" && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  )}
                </span>
              ) : (
                <span className="text-amber-500">Not Assigned</span>
              )
            }
            action={
              isPreEvent ? (
                <button
                  onClick={() => setShowAssignment(!showAssignment)}
                  className="text-primary hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-1 mt-1"
                  style={{ fontSize: "0.8125rem" }}
                >
                  {assignedEducator ? "Reassign" : "Assign Educator"}{" "}
                  <ChevronDown className="w-3 h-3" />
                </button>
              ) : undefined
            }
          />
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
              <CardContent className="p-4 space-y-1.5">
                <div
                  className="flex items-center gap-2 text-muted-foreground"
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
                <ul className="text-muted-foreground space-y-0.5 mt-1" style={{ fontSize: "0.8125rem" }}>
                  {event.kitMaterials.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="text-border mt-1.5">&bull;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          {event.storeContactName && (
            <InfoCard
              icon={Phone}
              label="Store Contact"
              value={event.storeContactName}
              subValue={
                event.storeContactPhone ? (
                  <a
                    href={`tel:${event.storeContactPhone}`}
                    className="text-primary hover:opacity-80"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {event.storeContactPhone}
                  </a>
                ) : undefined
              }
            />
          )}
        </div>
      )}

      {/* Educator Assignment Panel */}
      {showAssignment && isPreEvent && (
        <Card className="gap-0 border-primary/30">
          <CardHeader className="px-5 pt-5 pb-3">
            <CardTitle style={{ fontSize: "1rem", fontWeight: 600 }}>
              Assign Educator
            </CardTitle>
            <CardDescription style={{ fontSize: "0.8125rem" }}>
              Select an educator from your roster. Ranked by geography proximity
              and performance score.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
              {mockEducators
                .filter((e) => e.status === "Active")
                .map((edu) => (
                  <div
                    key={edu.id}
                    className="flex items-center justify-between p-3.5 hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <p
                          className="text-foreground"
                          style={{ fontSize: "0.875rem", fontWeight: 500 }}
                        >
                          {edu.name}
                        </p>
                        {edu.distanceMiles != null && (
                          <span
                            className="text-muted-foreground"
                            style={{ fontSize: "0.6875rem" }}
                          >
                            ~{edu.distanceMiles} mi
                          </span>
                        )}
                      </div>
                      <div
                        className="flex items-center gap-3 text-muted-foreground"
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
                    </div>
                    <Button
                      size="sm"
                      variant={
                        assignedEducator === edu.name ? "outline" : "default"
                      }
                      onClick={() => handleAssign(edu.name)}
                      className="cursor-pointer"
                    >
                      {assignedEducator === edu.name ? "Assigned" : "Assign"}
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

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
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {/* 1. Check-In */}
            <Card className="gap-0">
              <CardContent className="p-4 space-y-1.5">
                <p
                  className="text-muted-foreground flex items-center gap-1.5"
                  style={{ fontSize: "0.75rem" }}
                >
                  {event.checkInStatus === "checked-in" ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-destructive" />
                  )}
                  Check-In
                </p>
                <p
                  className="text-foreground"
                  style={{ fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.2 }}
                >
                  {event.checkInStatus === "checked-in"
                    ? "Confirmed"
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
            {/* 4. Questionnaires */}
            <MetricCard
              icon={ClipboardList}
              label="Questionnaires"
              value={event.questionnairesCompleted ?? 0}
            />
            {/* 5. Inventory */}
            <MetricCard
              icon={Boxes}
              label="Inventory"
              value={event.inventoryData?.current ?? "\u2014"}
              subValue={event.inventoryData ? `Pre-event: ${event.inventoryData.preEvent}` : undefined}
            />
            {/* 6. Photos */}
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
                  <span className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
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
      {(event.status === "Completed" || currentPhase === "Finalized") && event.finalStats && (
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
            <MetricCard
              label="Sales"
              value={event.finalStats.totalSales}
            />
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
                  <CardTitle style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                    Inventory Comparison
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                      Pre-Event
                    </p>
                    <p className="text-foreground" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                      {event.inventoryComparison.preEvent}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                      Post-Event
                    </p>
                    <p className="text-foreground" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                      {event.inventoryComparison.postEvent}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                      Sold / Used
                    </p>
                    <p className="text-green-600" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                      -{event.inventoryComparison.preEvent - event.inventoryComparison.postEvent}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Educator Notes (final) */}
          {event.educatorNotesFinal && (
            <Card className="gap-0">
              <CardHeader className="px-5 pt-5 pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <CardTitle style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                    Educator Notes
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <p className="text-foreground" style={{ fontSize: "0.875rem" }}>
                  {event.educatorNotesFinal}
                </p>
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
                    <CardTitle style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                      Event Photos
                    </CardTitle>
                    <span
                      className="text-muted-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      ({allPhotos.length})
                    </span>
                  </div>
                  {currentPhase !== "Finalized" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Download All
                    </Button>
                  )}
                </div>
                {/* Photo category tabs */}
                {categorizedPhotos && (
                  <div className="flex gap-1 mt-3">
                    {(
                      [
                        { key: "all" as const, label: "All", count: allPhotos.length },
                        { key: "receipts" as const, label: "Receipts", count: categorizedPhotos.receipts.length },
                        { key: "socialMedia" as const, label: "Social Media", count: categorizedPhotos.socialMedia.length },
                        { key: "venue" as const, label: "Venue", count: categorizedPhotos.venue.length },
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
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5 mr-1.5" />
                Export Event Data
              </Button>
            </div>
          )}

          {/* Approve & Finalize */}
          {!finalized && !event.finalizedAt && event.status === "Completed" && (
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
                          This action is <strong>irreversible</strong>. It will
                          lock the event record for all actors and terminate the
                          educator&apos;s editing window immediately.
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
                        Review the stats above and finalize this event to unlock
                        reporting.
                      </p>
                    </div>
                    <Button
                      onClick={() => setShowFinalizeConfirm(true)}
                      className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Approve & Finalize
                    </Button>
                  </div>
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
      {isPreEvent && !showEducatorCancel && !showEventCancel && (
        <div className="flex items-center justify-end gap-3 pt-2">
          {assignedEducator && (
            <Button
              variant="outline"
              onClick={() => setShowEducatorCancel(true)}
              className="cursor-pointer text-amber-600 border-amber-500/30 hover:bg-amber-500/5"
            >
              <UserX className="w-4 h-4 mr-1.5" />
              Cancel Educator
            </Button>
          )}
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

      {showEducatorCancel && isPreEvent && (
        <CancellationPanel
          mode="educator"
          onCancel={handleEducatorCancel}
          onClose={() => setShowEducatorCancel(false)}
        />
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
    </div>
  );
}
