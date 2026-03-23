import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Building2,
  Tag,
  User,
  Users,
  UserCheck,
  Megaphone,
  Search,
  XCircle,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "../../shared/components/ui/badge";
import { Progress } from "../../shared/components/ui/progress";
import { Card, CardContent } from "../../shared/components/ui/card";
import { Button } from "../../shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import { Checkbox } from "../../shared/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../shared/components/ui/dialog";
import { MOCK_EVENTS } from "./events-page";
import type { EventRecord, AssignedEducatorRecord } from "./events-page";
import { MOCK_EDUCATORS } from "./educator-data";

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

export function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  // Assignment state
  const [showAssignment, setShowAssignment] = useState(false);
  const [assignmentSearch, setAssignmentSearch] = useState("");
  const [assignedEducators, setAssignedEducators] = useState<
    AssignedEducatorRecord[]
  >([]);
  const [draftSelectedIds, setDraftSelectedIds] = useState<Set<string>>(
    new Set(),
  );
  const [initRef, setInitRef] = useState<string | null>(null);

  const event = MOCK_EVENTS.find((e) => e.id === eventId) as
    | EventRecord
    | undefined;

  // Initialize assigned educators from mock data on first render for this event
  if (event && initRef !== event.id) {
    setAssignedEducators(event.assignedEducators);
    setInitRef(event.id);
  }

  if (!event) {
    return (
      <div className="p-6 space-y-4 w-full">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/ops/dashboard/events")}
          className="gap-1 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          Back to Events
        </Button>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg font-semibold text-foreground">
            Event not found
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            No event with ID "{eventId}" exists.
          </p>
        </div>
      </div>
    );
  }

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
    <div className="p-6 space-y-6 w-full">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/ops/dashboard/events")}
        className="gap-1 text-muted-foreground hover:text-foreground cursor-pointer"
      >
        <ArrowLeft className="size-4" />
        Back to Events
      </Button>

      {/* Live Banner */}
      {/* {isLive && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="px-4 py-3 [&:last-child]:pb-3 flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-medium text-green-700">Live Now</span>
            <span className="text-xs text-green-600">
              {event.startTime} – {event.endTime}
            </span>
          </CardContent>
        </Card>
      )} */}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <Badge
            variant="secondary"
            className={`text-xs ${getStatusColor(event.status)}`}
          >
            {isLive && (
              <span className="inline-block size-1.5 rounded-full bg-green-500 mr-1 animate-pulse" />
            )}
            {event.status}
            {isLive && (
              <>
                {" "}
                {event.startTime} – {event.endTime}
              </>
            )}
          </Badge>
          <Badge
            variant="secondary"
            className={`text-xs ${getTypeColor(event.type)}`}
          >
            {event.type}
          </Badge>
        </div>
        <h1 className="text-foreground">{event.name}</h1>
        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1 flex-wrap">
          <span>{event.id}</span>
          <span>·</span>
          <Building2 className="size-3" />
          <span>{event.organization}</span>
          <span>·</span>
          <CalendarDays className="size-3" />
          <span>{event.date}</span>
        </p>
      </div>

      {/* Overview Section */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-foreground">Overview</h2>

        {/* Description */}
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-foreground leading-relaxed">
              {event.description}
            </p>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-3">
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
          <QuickStatCard label="Capacity" value={event.capacity} />
          <QuickStatCard
            label="Capacity %"
            value={capacityPercent}
            subtext="filled"
            progress={capacityPercent}
          />
        </div>

        {/* Key Details */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <DetailRow icon={CalendarDays} label="Date" value={event.date} />
            <DetailRow
              icon={Clock}
              label="Time"
              value={`${event.startTime} – ${event.endTime}`}
            />
            <DetailRow icon={MapPin} label="Location" value={event.location} />
          </CardContent>
        </Card>
      </section>

      {/* Attendance Section */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-foreground">Attendance</h2>

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
                <p className="text-xs text-muted-foreground">Registered</p>
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
                  <p className="text-xs text-muted-foreground">Checked In</p>
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
            <p className="text-sm font-semibold text-foreground">Breakdown</p>
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
              label={showCheckin ? "Registered (not checked in)" : "Registered"}
              value={
                showCheckin ? registeredNotCheckedIn : event.attendeesRegistered
              }
              percentage={
                showCheckin ? registeredNotCheckedInPercent : capacityPercent
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
      </section>

      {/* Educator Assignment Section */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-foreground">
          Educator Assignment
        </h2>

        <Card>
          <CardContent className="p-4">
            {assignedEducators.length === 0 ? (
              <div className="text-center py-6">
                <Users className="size-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No educators assigned yet.
                </p>
                {(event.status === "Upcoming" || event.status === "Live") && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 cursor-pointer"
                    onClick={() => {
                      setDraftSelectedIds(new Set());
                      setAssignmentSearch("");
                      setShowAssignment(true);
                    }}
                  >
                    <Users className="size-4 mr-1.5" />
                    Assign Educators
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {assignedEducators.map((ae) => {
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
                          <span
                            className="text-foreground cursor-pointer hover:underline"
                            onClick={() =>
                              navigate(
                                `/ops/dashboard/educators/${ae.educatorId}`,
                              )
                            }
                          >
                            {ae.name}
                          </span>
                          {ae.status === "Accepted" && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                          )}
                          {ae.status === "Pending" && (
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
                          {ae.status === "Declined" && (
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
                      {(event.status === "Upcoming" ||
                        event.status === "Live") && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setAssignedEducators((prev) =>
                              prev.filter(
                                (e) => e.educatorId !== ae.educatorId,
                              ),
                            )
                          }
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  );
                })}

                {(event.status === "Upcoming" || event.status === "Live") && (
                  <div className="pt-2 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      style={{ fontSize: "0.8125rem" }}
                      onClick={() => {
                        setDraftSelectedIds(
                          new Set(assignedEducators.map((e) => e.educatorId)),
                        );
                        setAssignmentSearch("");
                        setShowAssignment(true);
                      }}
                    >
                      <Users className="size-4 mr-1.5" />
                      Manage Educators
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Assignment Dialog */}
      <Dialog open={showAssignment} onOpenChange={setShowAssignment}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="px-5 pt-5 pb-3 shrink-0 border-b border-border">
            <DialogTitle style={{ fontSize: "1.125rem", fontWeight: 600 }}>
              Manage Educators
            </DialogTitle>
            <DialogDescription style={{ fontSize: "0.875rem" }}>
              Select educators to assign them to this event.
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

          {/* Educator List */}
          <div className="flex-1 overflow-y-auto p-5 pb-0 bg-muted/20">
            <div className="divide-y divide-border rounded-lg border border-border bg-card overflow-hidden">
              {MOCK_EDUCATORS.filter((e) => e.status === "active")
                .filter((e) => {
                  const q = assignmentSearch.toLowerCase().trim();
                  if (!q) return true;
                  return (
                    e.name.toLowerCase().includes(q) ||
                    e.city.toLowerCase().includes(q) ||
                    e.specialties.some((s) => s.toLowerCase().includes(q))
                  );
                })
                .map((educator) => {
                  const isSelected = draftSelectedIds.has(educator.id);
                  return (
                    <div
                      key={educator.id}
                      className={`p-3.5 transition-colors hover:bg-muted/50 ${
                        isSelected
                          ? "bg-primary/5 border-l-2 border-l-primary"
                          : "border-l-2 border-l-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`edu-${educator.id}`}
                          checked={isSelected}
                          className="mt-0.5"
                          onCheckedChange={(checked) => {
                            setDraftSelectedIds((prev) => {
                              const next = new Set(prev);
                              if (checked) next.add(educator.id);
                              else next.delete(educator.id);
                              return next;
                            });
                          }}
                        />
                        <div className="flex items-center justify-between flex-1 min-w-0">
                          <div className="space-y-0.5 flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <label
                                htmlFor={`edu-${educator.id}`}
                                className="text-foreground cursor-pointer"
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: 500,
                                }}
                              >
                                {educator.name}
                              </label>
                            </div>
                            {/* Metrics row */}
                            <div
                              className="flex items-center gap-3 text-muted-foreground"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {educator.qualityScore > 0 && (
                                <span className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-amber-500" />{" "}
                                  {educator.qualityScore}
                                </span>
                              )}
                              <span>
                                {educator.city}, {educator.state}
                              </span>
                              <span>{educator.eventsCompleted} events</span>
                            </div>
                            {/* Brand certifications row (Specialties in ops context) */}
                            {educator.specialties.length > 0 && (
                              <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                                {educator.specialties.map((spec) => (
                                  <span
                                    key={spec}
                                    className="inline-flex items-center rounded-full px-1.5 py-0 border bg-muted text-muted-foreground border-border"
                                    style={{
                                      fontSize: "0.5625rem",
                                      fontWeight: 500,
                                      lineHeight: "1rem",
                                    }}
                                  >
                                    {spec}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-border shrink-0 bg-muted/10 flex items-center justify-between gap-3 rounded-b-lg">
            <span className="text-xs text-muted-foreground">
              {draftSelectedIds.size} educator
              {draftSelectedIds.size !== 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAssignment(false)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                className="bg-[#7D152D] hover:bg-[#7D152D]/90 cursor-pointer"
                onClick={() => {
                  const newAssignments: AssignedEducatorRecord[] = [];
                  draftSelectedIds.forEach((id) => {
                    const existing = assignedEducators.find(
                      (e) => e.educatorId === id,
                    );
                    if (existing) {
                      newAssignments.push(existing);
                    } else {
                      const edu = MOCK_EDUCATORS.find((e) => e.id === id);
                      if (edu) {
                        newAssignments.push({
                          educatorId: id,
                          name: edu.name,
                          status: "Pending",
                        });
                      }
                    }
                  });
                  setAssignedEducators(newAssignments);
                  setShowAssignment(false);
                }}
              >
                Confirm Assignments
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Details Section */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-foreground">Details</h2>

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
            <p className="text-sm font-semibold text-foreground">Schedule</p>
            <DetailRow icon={CalendarDays} label="Date" value={event.date} />
            <DetailRow
              icon={Clock}
              label="Time"
              value={`${event.startTime} – ${event.endTime}`}
            />
            <DetailRow icon={MapPin} label="Location" value={event.location} />
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
            <p className="text-sm font-semibold text-foreground">Provenance</p>
            <DetailRow icon={User} label="Created By" value={event.createdBy} />
            <DetailRow
              icon={CalendarDays}
              label="Created"
              value={event.createdAt}
            />
          </CardContent>
        </Card>

        {/* Tags */}
        <TagsList tags={event.tags} />
      </section>

      {/* Footer note */}
      <div className="border-t border-border pt-4">
        <p className="text-xs text-muted-foreground leading-normal">
          Admin view — assignment changes are reflected across platforms.
        </p>
      </div>
    </div>
  );
}
