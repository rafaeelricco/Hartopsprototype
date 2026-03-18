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
} from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/shared/components/ui/card";
import { getEventById, type CancellationReason } from "./events-data";
import { mockEducators } from "./educator-roster-data";

/* --- Phase Badge --- */

const phaseBadge: Record<string, { bg: string; text: string; label: string }> =
  {
    Upcoming: {
      bg: "bg-blue-500/10 border-blue-500/30",
      text: "text-blue-600",
      label: "Upcoming",
    },
    Live: {
      bg: "bg-green-500/10 border-green-500/30",
      text: "text-green-600",
      label: "● Live Now",
    },
    Completed: {
      bg: "bg-amber-500/10 border-amber-500/30",
      text: "text-amber-600",
      label: "Completed — Awaiting Review",
    },
    Finalized: {
      bg: "bg-muted border-border",
      text: "text-muted-foreground",
      label: "Finalized",
    },
  };

const eventTypeBadgeColors: Record<string, string> = {
  Tasting: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  Demo: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  Activation: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Promo: "bg-pink-500/10 text-pink-600 border-pink-500/20",
};

/* --- Lifecycle Indicator --- */

const lifecycleSteps = ["Upcoming", "Live", "Completed", "Finalized"];

function LifecycleIndicator({ currentPhase }: { currentPhase: string }) {
  const currentIndex = lifecycleSteps.indexOf(currentPhase);

  return (
    <div className="flex items-center gap-0 w-full max-w-lg">
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
                {isPast ? "✓" : i + 1}
              </div>
              <span
                className={`${
                  isActive
                    ? "text-foreground font-semibold"
                    : isPast
                      ? "text-muted-foreground font-medium"
                      : "text-muted-foreground"
                }`}
                style={{ fontSize: "0.6875rem" }}
              >
                {step}
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

/* --- Cancellation Modal --- */

const cancellationReasons: CancellationReason[] = [
  "Weather",
  "Illness",
  "Car Accident",
  "Retailer Cancellation",
  "Other",
];

function CancellationPanel({
  onCancel,
  onClose,
}: {
  onCancel: (reason: CancellationReason) => void;
  onClose: () => void;
}) {
  const [selectedReason, setSelectedReason] =
    useState<CancellationReason | null>(null);

  return (
    <Card className="gap-0 border-destructive/30">
      <CardHeader className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <Ban className="w-4 h-4 text-destructive" />
          <CardTitle style={{ fontSize: "1rem", fontWeight: 600 }}>
            Cancel Event
          </CardTitle>
        </div>
        <CardDescription style={{ fontSize: "0.8125rem" }}>
          Select a reason for cancellation. This will unassign the current
          educator and notify them.
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
            variant="destructive"
            className="cursor-pointer"
          >
            Confirm Cancellation
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
}: {
  icon?: React.ElementType;
  label: string;
  value: React.ReactNode;
  accent?: string;
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
  const [showCancellation, setShowCancellation] = useState(false);
  const [finalized, setFinalized] = useState(false);
  const [assignedEducator, setAssignedEducator] = useState(
    event?.educatorName || null,
  );

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

  const phaseKey = finalized
    ? "Finalized"
    : event.status === "Completed" && event.finalizedAt
      ? "Finalized"
      : event.status;
  const badge = phaseBadge[phaseKey] ?? phaseBadge["Upcoming"]!;

  const handleFinalize = () => {
    setFinalized(true);
    setShowFinalizeConfirm(false);
  };

  const handleAssign = (name: string) => {
    setAssignedEducator(name);
    setShowAssignment(false);
  };

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
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1
                className="text-foreground"
                style={{ fontSize: "1.5rem", fontWeight: 600 }}
              >
                {event.name}
              </h1>
              {/* Phase badge */}
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 font-semibold ${badge.bg} ${badge.text}`}
                style={{ fontSize: "0.75rem" }}
              >
                {badge.label}
              </span>
              {/* Event type badge */}
              <span
                className={`inline-flex items-center rounded-full border px-2 py-0.5 ${eventTypeBadgeColors[event.eventType]}`}
                style={{ fontSize: "0.6875rem", fontWeight: 500 }}
              >
                {event.eventType}
              </span>
            </div>
            <div
              className="flex items-center gap-3 text-muted-foreground flex-wrap"
              style={{ fontSize: "0.875rem" }}
            >
              <span>{event.campaignName}</span>
              <span className="text-border">·</span>
              <span className="font-medium text-foreground">
                {event.brandName}
              </span>
              <span className="text-border">·</span>
              <span>{event.clientName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lifecycle Indicator */}
      <Card className="gap-0">
        <CardContent className="px-5 py-4">
          <LifecycleIndicator currentPhase={phaseKey} />
        </CardContent>
      </Card>

      {/* Info Cards Grid */}
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
            assignedEducator || (
              <span className="text-amber-500">Not Assigned</span>
            )
          }
          action={
            event.status === "Upcoming" ? (
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

      {/* Educator Assignment Panel */}
      {showAssignment && event.status === "Upcoming" && (
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
                      <p
                        className="text-foreground"
                        style={{ fontSize: "0.875rem", fontWeight: 500 }}
                      >
                        {edu.name}
                      </p>
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

      {/* Notes */}
      {event.notes && (
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

      {/* Live monitoring section */}
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
          <div className="grid gap-4 md:grid-cols-4">
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
                  {event.checkInTime || "—"}
                </p>
              </CardContent>
            </Card>
            <MetricCard
              icon={ShoppingCart}
              label="Samples"
              value={event.liveMetrics.samplesDistributed}
            />
            <MetricCard
              icon={User}
              label="Interactions"
              value={event.liveMetrics.consumerInteractions}
            />
            <MetricCard
              icon={Camera}
              label="Photos"
              value={event.photoCount || 0}
            />
          </div>
        </div>
      )}

      {/* Post-event finalization section */}
      {event.status === "Completed" && event.finalStats && (
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

          {/* Stats grid */}
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
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

          {/* Photo gallery */}
          {event.photoUrls && event.photoUrls.length > 0 && (
            <Card className="gap-0">
              <CardHeader className="px-5 pt-5 pb-3">
                <div className="flex items-center gap-2">
                  <Image className="w-4 h-4 text-muted-foreground" />
                  <CardTitle style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                    Event Photos
                  </CardTitle>
                  <span
                    className="text-muted-foreground"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    ({event.photoUrls.length})
                  </span>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {event.photoUrls.map((_, i) => (
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

          {/* Approve & Finalize */}
          {!finalized && !event.finalizedAt && (
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
                          educator's editing window immediately.
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

      {/* Cancellation Section (Upcoming events only) */}
      {event.status === "Upcoming" && !showCancellation && (
        <div className="flex items-center justify-end pt-2">
          <Button
            variant="outline"
            onClick={() => setShowCancellation(true)}
            className="cursor-pointer text-destructive border-destructive/30 hover:bg-destructive/5"
          >
            <Ban className="w-4 h-4 mr-1.5" />
            Cancel Event
          </Button>
        </div>
      )}

      {showCancellation && event.status === "Upcoming" && (
        <CancellationPanel
          onCancel={(_reason) => {
            setShowCancellation(false);
          }}
          onClose={() => setShowCancellation(false)}
        />
      )}
    </div>
  );
}
