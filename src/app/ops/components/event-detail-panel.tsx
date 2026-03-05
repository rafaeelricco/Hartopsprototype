import React from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Building2,
  Tag,
  User,
  Users,
  UserCheck,
  Megaphone,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../shared/components/ui/sheet";
import { Badge } from "../../shared/components/ui/badge";
import { Progress } from "../../shared/components/ui/progress";
import { Card, CardContent } from "../../shared/components/ui/card";
import { ScrollArea } from "../../shared/components/ui/scroll-area";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../shared/components/ui/tabs";
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
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function QuickStatCard({
  label,
  value,
  subtext,
  progress,
}: {
  label: string;
  value: number;
  subtext?: string;
  progress?: number;
}) {
  return (
    <Card>
      <CardContent className="p-3">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold leading-tight tabular-nums text-foreground mt-0.5">
          {value}
        </p>
        {subtext && (
          <p className="text-[0.625rem] text-muted-foreground mt-0.5">
            {subtext}
          </p>
        )}
        {progress !== undefined && (
          <Progress value={progress} className="h-1 mt-2" />
        )}
      </CardContent>
    </Card>
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
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}

function BreakdownRow({
  color,
  label,
  value,
  percentage,
}: {
  color: string;
  label: string;
  value: number;
  percentage: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={`size-2 rounded-full ${color}`} />
        <span className="text-sm text-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium tabular-nums text-foreground">
          {value}
        </span>
        <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
          {percentage}%
        </span>
      </div>
    </div>
  );
}

function TagsList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div>
      <p className="text-sm font-semibold text-foreground mb-2">Tags</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="text-xs text-muted-foreground"
          >
            <Tag className="size-3 mr-1" />
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
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
  const availableSlots = event.capacity - event.attendeesRegistered;
  const availablePercent = Math.round((availableSlots / event.capacity) * 100);
  const registeredNotCheckedIn =
    event.attendeesRegistered - event.attendeesCheckedIn;
  const registeredNotCheckedInPercent =
    event.capacity > 0
      ? Math.round((registeredNotCheckedIn / event.capacity) * 100)
      : 0;
  const checkedInOfCapacityPercent =
    event.capacity > 0
      ? Math.round((event.attendeesCheckedIn / event.capacity) * 100)
      : 0;

  const isLive = event.status === "Live";
  const showCheckin = event.status === "Live" || event.status === "Completed";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-[480px] w-full p-0 flex flex-col"
      >
        {/* Live Indicator Banner */}
        {isLive && (
          <div className="shrink-0 bg-green-50 border-b border-green-200 px-6 py-2 flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-medium text-green-700">Live Now</span>
            <span className="text-xs text-green-600">
              {event.startTime} – {event.endTime}
            </span>
          </div>
        )}

        {/* Header */}
        <SheetHeader className="shrink-0 px-6 pt-5 pb-4 border-b border-border">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Badge
              variant="secondary"
              className={`text-xs ${getStatusColor(event.status)}`}
            >
              {isLive && (
                <span className="inline-block size-1.5 rounded-full bg-green-500 mr-1 animate-pulse" />
              )}
              {event.status}
            </Badge>
            <Badge
              variant="secondary"
              className={`text-xs ${getTypeColor(event.type)}`}
            >
              {event.type}
            </Badge>
          </div>
          <SheetTitle className="text-lg text-foreground">
            {event.name}
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1 flex-wrap">
            <span>{event.id}</span>
            <span>·</span>
            <Building2 className="size-3" />
            <span>{event.organization}</span>
            <span>·</span>
            <CalendarDays className="size-3" />
            <span>{event.date}</span>
          </SheetDescription>
        </SheetHeader>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="flex-1 min-h-0 flex flex-col">
          <TabsList className="shrink-0 border-b border-border bg-transparent rounded-none w-full justify-start gap-0 h-auto p-0 px-6">
            {["Overview", "Attendance", "Details"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="rounded-none border-b-2 border-transparent bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-[#7D152D] data-[state=active]:text-[#7D152D] data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-[#7D152D] hover:text-foreground px-4 py-2.5 cursor-pointer"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Scrollable Tab Content */}
          <ScrollArea className="flex-1 min-h-0">
            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-0 p-6 space-y-5">
              {/* Description */}
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    {event.description}
                  </p>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <QuickStatCard
                  label="Registered"
                  value={event.attendeesRegistered}
                  subtext={`${capacityPercent}% of capacity`}
                  progress={capacityPercent}
                />
                <QuickStatCard
                  label="Checked In"
                  value={event.attendeesCheckedIn}
                  {...(showCheckin && {
                    subtext: `${checkinPercent}% of registered`,
                    progress: checkinPercent,
                  })}
                />
              </div>

              {/* Key Details */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <DetailRow
                    icon={CalendarDays}
                    label="Date"
                    value={event.date}
                  />
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
                </CardContent>
              </Card>

              {/* Tags */}
              <TagsList tags={event.tags} />
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance" className="mt-0 p-6 space-y-5">
              {/* Capacity Overview */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-foreground">
                      Capacity Overview
                    </p>
                    <Badge variant="outline" className="text-xs tabular-nums">
                      {capacityPercent}%
                    </Badge>
                  </div>
                  <Progress value={capacityPercent} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {event.attendeesRegistered} of {event.capacity} slots filled
                  </p>
                </CardContent>
              </Card>

              {/* Registration */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Users className="size-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Registered
                      </p>
                      <p className="text-lg font-semibold leading-tight tabular-nums text-foreground">
                        {event.attendeesRegistered}
                      </p>
                    </div>
                  </div>
                  <Progress value={capacityPercent} className="h-1.5 mt-3" />
                  <p className="text-xs text-muted-foreground mt-1 tabular-nums">
                    {capacityPercent}% of capacity
                  </p>
                </CardContent>
              </Card>

              {/* Check-in (Live/Completed only) */}
              {showCheckin && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                        <UserCheck className="size-4 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">
                          Checked In
                        </p>
                        <p className="text-lg font-semibold leading-tight tabular-nums text-foreground">
                          {event.attendeesCheckedIn}
                        </p>
                      </div>
                    </div>
                    <Progress value={checkinPercent} className="h-1.5 mt-3" />
                    <p className="text-xs text-muted-foreground mt-1 tabular-nums">
                      {checkinPercent}% of registered
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Breakdown */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm font-semibold text-foreground">
                    Breakdown
                  </p>
                  {showCheckin && (
                    <BreakdownRow
                      color="bg-green-500"
                      label="Checked in"
                      value={event.attendeesCheckedIn}
                      percentage={checkedInOfCapacityPercent}
                    />
                  )}
                  <BreakdownRow
                    color="bg-blue-500"
                    label={
                      showCheckin ? "Registered (not checked in)" : "Registered"
                    }
                    value={
                      showCheckin
                        ? registeredNotCheckedIn
                        : event.attendeesRegistered
                    }
                    percentage={
                      showCheckin
                        ? registeredNotCheckedInPercent
                        : capacityPercent
                    }
                  />
                  <BreakdownRow
                    color="bg-gray-300"
                    label="Available slots"
                    value={availableSlots}
                    percentage={availablePercent}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="mt-0 p-6 space-y-5">
              {/* Organization */}
              <Card>
                <CardContent className="p-4">
                  <DetailRow
                    icon={Building2}
                    label="Organization"
                    value={event.organization}
                  />
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm font-semibold text-foreground">
                    Schedule
                  </p>
                  <DetailRow
                    icon={CalendarDays}
                    label="Date"
                    value={event.date}
                  />
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
                </CardContent>
              </Card>

              {/* Campaign (conditional) */}
              {event.campaignName && (
                <Card>
                  <CardContent className="p-4">
                    <DetailRow
                      icon={Megaphone}
                      label="Campaign"
                      value={event.campaignName}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Provenance */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm font-semibold text-foreground">
                    Provenance
                  </p>
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
                </CardContent>
              </Card>

              {/* Tags */}
              <TagsList tags={event.tags} />
            </TabsContent>
          </ScrollArea>
        </Tabs>

        {/* Pinned Footer */}
        <div className="shrink-0 border-t border-border bg-muted/30 px-6 py-3">
          <p className="text-xs text-muted-foreground leading-normal">
            This is a read-only monitoring view. Event creation and editing is
            managed by the organization's tenant administrators.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
