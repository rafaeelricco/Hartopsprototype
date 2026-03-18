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
} from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { getEventById } from "./events-data";
import { mockEducators } from "./educator-roster-data";

const phaseBadge: Record<string, { bg: string; text: string; label: string }> = {
  Upcoming: {
    bg: "bg-blue-500/10 border-blue-500/30",
    text: "text-blue-400",
    label: "Upcoming",
  },
  Live: {
    bg: "bg-green-500/10 border-green-500/30",
    text: "text-green-400",
    label: "● Live Now",
  },
  Completed: {
    bg: "bg-amber-500/10 border-amber-500/30",
    text: "text-amber-400",
    label: "Completed — Awaiting Review",
  },
  Finalized: {
    bg: "bg-muted border-border",
    text: "text-muted-foreground",
    label: "Finalized",
  },
};

export function EventDetailPage() {
  const { eventId } = useParams();
  const event = getEventById(eventId || "");
  const [showAssignment, setShowAssignment] = useState(false);
  const [showFinalizeConfirm, setShowFinalizeConfirm] = useState(false);
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
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-foreground">
                {event.name}
              </h1>
              {/* Phase indicator badge */}
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 font-semibold ${badge.bg} ${badge.text}`}
                style={{ fontSize: "0.75rem" }}
              >
                {badge.label}
              </span>
            </div>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "0.875rem" }}
            >
              {event.campaignName}
            </p>
          </div>
        </div>
      </div>

      {/* Event info cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: "0.75rem" }}>
            <Clock className="w-3.5 h-3.5" /> Date & Time
          </div>
          <p className="text-foreground font-medium" style={{ fontSize: "0.875rem" }}>
            {event.date}
          </p>
          <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>{event.time}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: "0.75rem" }}>
            <MapPin className="w-3.5 h-3.5" /> Venue
          </div>
          <p className="text-foreground font-medium" style={{ fontSize: "0.875rem" }}>
            {event.venue}
          </p>
          <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
            {event.venueAddress}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: "0.75rem" }}>
            <User className="w-3.5 h-3.5" /> Assigned Educator
          </div>
          <p className="text-foreground font-medium" style={{ fontSize: "0.875rem" }}>
            {assignedEducator || (
              <span className="text-amber-500">Not Assigned</span>
            )}
          </p>
          {event.status === "Upcoming" && (
            <button
              onClick={() => setShowAssignment(!showAssignment)}
              className="text-primary hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-1"
              style={{ fontSize: "0.8125rem" }}
            >
              {assignedEducator ? "Reassign" : "Assign Educator"}{" "}
              <ChevronDown className="w-3 h-3" />
            </button>
          )}
        </div>
        <div className="rounded-xl border border-border bg-card p-4 space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: "0.75rem" }}>
            <Package className="w-3.5 h-3.5" /> Products
          </div>
          <p className="text-foreground font-medium" style={{ fontSize: "0.875rem" }}>
            {event.products.length} product{event.products.length !== 1 ? "s" : ""}
          </p>
          <p className="text-muted-foreground truncate" style={{ fontSize: "0.8125rem" }}>
            {event.products.join(", ")}
          </p>
        </div>
      </div>

      {/* Educator Assignment Panel */}
      {showAssignment && event.status === "Upcoming" && (
        <div className="rounded-xl border border-primary/30 bg-card p-5 space-y-4">
          <h3 className="text-foreground font-semibold">Assign Educator</h3>
          <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
            Select an educator from your roster. Check their availability before confirming.
          </p>
          <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
            {mockEducators
              .filter((e) => e.status === "Active")
              .map((edu) => (
                <div
                  key={edu.id}
                  className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-0.5">
                    <p className="text-foreground font-medium" style={{ fontSize: "0.875rem" }}>
                      {edu.name}
                    </p>
                    <div className="flex items-center gap-3 text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" /> {edu.avgRating}
                      </span>
                      <span className="flex items-center gap-1">
                        <ShoppingCart className="w-3 h-3" /> {edu.salesPerEvent}/evt
                      </span>
                      <span>{edu.punctuality}% on-time</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={assignedEducator === edu.name ? "outline" : "default"}
                    onClick={() => handleAssign(edu.name)}
                    className="cursor-pointer"
                  >
                    {assignedEducator === edu.name ? "Assigned" : "Assign"}
                  </Button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Read-only event details */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground font-medium" style={{ fontSize: "0.8125rem" }}>
            <FileText className="w-4 h-4" /> Instructions
          </div>
          <p className="text-foreground" style={{ fontSize: "0.875rem" }}>
            {event.instructions}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground font-medium" style={{ fontSize: "0.8125rem" }}>
            <Target className="w-4 h-4" /> Goals
          </div>
          <p className="text-foreground" style={{ fontSize: "0.875rem" }}>
            {event.goals}
          </p>
        </div>
      </div>

      {/* Live monitoring section */}
      {event.status === "Live" && event.liveMetrics && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Radio className="w-5 h-5 text-green-400 animate-pulse" />
            Live Monitoring
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-4 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                {event.checkInStatus === "checked-in" ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive" />
                )}
                Check-In
              </div>
              <p className="text-xl font-bold text-foreground">
                {event.checkInStatus === "checked-in" ? "Confirmed" : "Pending"}
              </p>
              <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                {event.checkInTime || "—"}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center space-y-1">
              <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                Samples
              </p>
              <p className="text-xl font-bold text-foreground">
                {event.liveMetrics.samplesDistributed}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center space-y-1">
              <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                Interactions
              </p>
              <p className="text-xl font-bold text-foreground">
                {event.liveMetrics.consumerInteractions}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center space-y-1">
              <p className="text-muted-foreground flex items-center justify-center gap-1" style={{ fontSize: "0.75rem" }}>
                <Camera className="w-3.5 h-3.5" /> Photos
              </p>
              <p className="text-xl font-bold text-foreground">
                {event.photoCount}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Post-event finalization section */}
      {event.status === "Completed" && event.finalStats && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Final Stats</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-4 text-center space-y-1">
              <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                Total Samples
              </p>
              <p className="text-xl font-bold text-foreground">
                {event.finalStats.totalSamples}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center space-y-1">
              <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                Interactions
              </p>
              <p className="text-xl font-bold text-foreground">
                {event.finalStats.totalInteractions}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center space-y-1">
              <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                Sales
              </p>
              <p className="text-xl font-bold text-foreground">
                {event.finalStats.totalSales}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center space-y-1">
              <p className="text-muted-foreground flex items-center justify-center gap-1" style={{ fontSize: "0.75rem" }}>
                <Star className="w-3.5 h-3.5" /> Rating
              </p>
              <p className="text-xl font-bold text-foreground">
                {event.finalStats.rating}
              </p>
            </div>
          </div>

          {/* Approve & Finalize */}
          {!finalized && !event.finalizedAt && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
              {showFinalizeConfirm ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-foreground font-semibold">
                        Confirm Finalization
                      </p>
                      <p
                        className="text-muted-foreground mt-1"
                        style={{ fontSize: "0.875rem" }}
                      >
                        This action is <strong>irreversible</strong>. It will lock
                        the event record for all actors and terminate the
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
                    <p className="text-foreground font-semibold">
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
            </div>
          )}

          {(finalized || event.finalizedAt) && (
            <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-foreground font-semibold">Event Finalized</p>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "0.875rem" }}
                >
                  This event has been finalized and locked. The data is now
                  available for reporting.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
