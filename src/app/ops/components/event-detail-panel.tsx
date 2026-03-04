import React from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Building2,
  Globe,
  Tag,
  Ticket,
  User,
  Megaphone,
  Radio,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../shared/components/ui/sheet";
import { Badge } from "../../shared/components/ui/badge";
import { Separator } from "../../shared/components/ui/separator";
import { Progress } from "../../shared/components/ui/progress";
import type { EventRecord } from "./events-page";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function getStatusColor(status: string) {
  switch (status) {
    case "Live":
      return "bg-green-50 text-green-700 border-green-200";
    case "Upcoming":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Completed":
      return "bg-muted text-muted-foreground border-border";
    case "Cancelled":
      return "bg-red-50 text-red-600 border-red-200";
    default:
      return "";
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case "In-Person":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "Virtual":
      return "bg-cyan-50 text-cyan-700 border-cyan-200";
    case "Hybrid":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "";
  }
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

interface EventDetailPanelProps {
  event: EventRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDetailPanel({
  event,
  open,
  onOpenChange,
}: EventDetailPanelProps) {
  if (!event) return null;

  const capacityPercent = Math.round(
    (event.attendeesRegistered / event.capacity) * 100,
  );
  const checkinPercent =
    event.attendeesRegistered > 0
      ? Math.round((event.attendeesCheckedIn / event.attendeesRegistered) * 100)
      : 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-[480px] w-full overflow-y-auto p-0"
      >
        <SheetHeader className="px-6 pt-6 pb-0">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <Badge
                  variant="secondary"
                  className={getStatusColor(event.status)}
                  style={{ fontSize: "0.6875rem" }}
                >
                  {event.status === "Live" && (
                    <span className="inline-block size-1.5 rounded-full bg-green-500 mr-1 animate-pulse" />
                  )}
                  {event.status}
                </Badge>
                <Badge
                  variant="secondary"
                  className={getTypeColor(event.type)}
                  style={{ fontSize: "0.6875rem" }}
                >
                  {event.type}
                </Badge>
              </div>
              <SheetTitle
                className="text-foreground"
                style={{ fontSize: "1.125rem" }}
              >
                {event.name}
              </SheetTitle>
              <SheetDescription
                className="text-muted-foreground mt-0.5"
                style={{ fontSize: "0.75rem" }}
              >
                {event.id} · Read-only monitoring view
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="px-6 py-5 space-y-5">
          {/* Description */}
          <div>
            <p
              className="text-foreground"
              style={{ fontSize: "0.8125rem", lineHeight: 1.6 }}
            >
              {event.description}
            </p>
          </div>

          <Separator />

          {/* Attendance Stats */}
          <div>
            <p
              className="text-foreground mb-3"
              style={{ fontSize: "0.8125rem", fontWeight: 600 }}
            >
              Attendance
            </p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <MiniStat label="Registered" value={event.attendeesRegistered} />
              <MiniStat label="Checked In" value={event.attendeesCheckedIn} />
              <MiniStat label="Capacity" value={event.capacity} />
            </div>

            {/* Registration progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className="text-muted-foreground"
                  style={{ fontSize: "0.6875rem" }}
                >
                  Registration
                </span>
                <span
                  className="text-muted-foreground tabular-nums"
                  style={{ fontSize: "0.6875rem" }}
                >
                  {capacityPercent}% of capacity
                </span>
              </div>
              <Progress value={capacityPercent} className="h-1.5" />
            </div>

            {event.status === "Live" || event.status === "Completed" ? (
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between">
                  <span
                    className="text-muted-foreground"
                    style={{ fontSize: "0.6875rem" }}
                  >
                    Check-in Rate
                  </span>
                  <span
                    className="text-muted-foreground tabular-nums"
                    style={{ fontSize: "0.6875rem" }}
                  >
                    {checkinPercent}% of registered
                  </span>
                </div>
                <Progress value={checkinPercent} className="h-1.5" />
              </div>
            ) : null}
          </div>

          <Separator />

          {/* Event Details */}
          <div>
            <p
              className="text-foreground mb-3"
              style={{ fontSize: "0.8125rem", fontWeight: 600 }}
            >
              Details
            </p>
            <div className="space-y-3">
              <DetailRow
                icon={Building2}
                label="Organization"
                value={event.organization}
              />
              <DetailRow icon={CalendarDays} label="Date" value={event.date} />
              <DetailRow
                icon={Clock}
                label="Time"
                value={`${event.startTime} – ${event.endTime}`}
              />
              <DetailRow
                icon={MapPin}
                label="Location"
                value={event.location}
              />
              {event.campaignName && (
                <DetailRow
                  icon={Megaphone}
                  label="Campaign"
                  value={event.campaignName}
                />
              )}
              <DetailRow
                icon={User}
                label="Created By"
                value={event.createdBy}
              />
              <DetailRow
                icon={CalendarDays}
                label="Created"
                value={event.createdAt}
              />
            </div>
          </div>

          {/* Tags */}
          {event.tags.length > 0 && (
            <>
              <Separator />
              <div>
                <p
                  className="text-foreground mb-3"
                  style={{ fontSize: "0.8125rem", fontWeight: 600 }}
                >
                  Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {event.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-muted-foreground"
                      style={{ fontSize: "0.6875rem" }}
                    >
                      <Tag className="size-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Read-only notice */}
          <div className="rounded-lg border border-border bg-muted/50 px-4 py-3 mt-2">
            <p
              className="text-muted-foreground"
              style={{ fontSize: "0.75rem", lineHeight: 1.5 }}
            >
              This is a read-only monitoring view. Event creation and editing is
              managed by the organization's tenant administrators.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-center">
      <p
        className="text-foreground tabular-nums"
        style={{ fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.2 }}
      >
        {value}
      </p>
      <p
        className="text-muted-foreground mt-0.5"
        style={{ fontSize: "0.625rem" }}
      >
        {label}
      </p>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-muted-foreground" style={{ fontSize: "0.6875rem" }}>
          {label}
        </p>
        <p className="text-foreground" style={{ fontSize: "0.8125rem" }}>
          {value}
        </p>
      </div>
    </div>
  );
}
