import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Megaphone,
  CalendarDays,
  Activity,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../shared/components/ui/card";
import { Badge } from "../../shared/components/ui/badge";
import { Button } from "../../shared/components/ui/button";
import { Progress } from "../../shared/components/ui/progress";
import {
  ORGANIZATIONS,
  ORG_CAMPAIGNS,
  ORG_EVENTS,
  CampaignStatusBadge,
} from "./organization-detail-page";

/* ------------------------------------------------------------------ */
/* Helper: event type badge                                            */
/* ------------------------------------------------------------------ */

function EventTypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    "In-Person": "bg-purple-50 text-purple-700 border-purple-200",
    Virtual: "bg-blue-50 text-blue-700 border-blue-200",
    Hybrid: "bg-amber-50 text-amber-700 border-amber-200",
  };
  return (
    <Badge
      variant="secondary"
      className={styles[type] ?? ""}
      style={{ fontSize: "0.6875rem" }}
    >
      {type}
    </Badge>
  );
}

function EventStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Upcoming: "bg-green-50 text-green-700 border-green-200",
    Completed: "bg-muted text-muted-foreground border-border",
  };
  return (
    <Badge
      variant="secondary"
      className={styles[status] ?? ""}
      style={{ fontSize: "0.6875rem" }}
    >
      {status}
    </Badge>
  );
}

/* ------------------------------------------------------------------ */
/* Campaign Detail Page                                                */
/* ------------------------------------------------------------------ */

export function CampaignDetailPage() {
  const { id, campaignId } = useParams<{ id: string; campaignId: string }>();
  const navigate = useNavigate();

  const orgId = Number(id);
  const campId = Number(campaignId);
  const org = ORGANIZATIONS[orgId];
  const campaigns = ORG_CAMPAIGNS[orgId] ?? [];
  const campaign = campaigns.find((c) => c.id === campId);

  const backPath = `/ops/dashboard/organizations/${id}`;

  if (!org || !campaign) {
    return (
      <div className="p-6 w-full">
        <Button
          variant="ghost"
          onClick={() =>
            navigate(org ? backPath : "/ops/dashboard/organizations")
          }
          className="cursor-pointer mb-4"
        >
          <ArrowLeft className="size-4 mr-2" />{" "}
          {org ? `Back to ${org.name}` : "Back to Organizations"}
        </Button>
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>
            {!org ? "Organization not found." : "Campaign not found."}
          </p>
        </div>
      </div>
    );
  }

  /* Associated events: take first N from org events where N = campaign.events */
  const allOrgEvents = ORG_EVENTS[orgId] ?? [];
  const associatedEvents = allOrgEvents.slice(0, campaign.events);

  /* Duration calculation */
  const start = new Date(campaign.startDate);
  const end = new Date(campaign.endDate);
  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const durationLabel =
    diffDays >= 30
      ? `${Math.round(diffDays / 30)} month${Math.round(diffDays / 30) !== 1 ? "s" : ""}`
      : `${diffDays} day${diffDays !== 1 ? "s" : ""}`;

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Back + Header */}
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate(backPath)}
          className="-ml-3 mb-3"
          style={{ fontSize: "0.8125rem" }}
        >
          <ArrowLeft className="size-4 mr-1" /> {org.name}
        </Button>

        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center size-12 rounded-lg bg-muted border border-border shrink-0">
            <Megaphone className="size-6 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-foreground">{campaign.name}</h1>
              <CampaignStatusBadge status={campaign.status} />
            </div>
            <p
              className="text-muted-foreground mt-1"
              style={{ fontSize: "0.8125rem" }}
            >
              {org.name} &middot; {campaign.startDate} — {campaign.endDate}
            </p>
            <div className="flex items-center gap-2 mt-3 max-w-xs">
              <Progress value={campaign.progress} className="h-2 flex-1" />
              <span
                className="text-muted-foreground tabular-nums"
                style={{ fontSize: "0.75rem" }}
              >
                {campaign.progress}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Events",
            value: campaign.events,
            icon: Activity,
          },
          {
            label: "Progress",
            value: `${campaign.progress}%`,
            icon: Activity,
          },
          {
            label: "Status",
            value: campaign.status,
            icon: Clock,
          },
          {
            label: "Duration",
            value: durationLabel,
            icon: CalendarDays,
          },
        ].map((stat) => (
          <Card key={stat.label} className="gap-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className="size-3.5 text-muted-foreground" />
                <span
                  className="text-muted-foreground"
                  style={{ fontSize: "0.75rem" }}
                >
                  {stat.label}
                </span>
              </div>
              <p
                className="text-foreground"
                style={{ fontSize: "1.25rem", fontWeight: 600 }}
              >
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Associated Events */}
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-4">
          <CardTitle style={{ fontSize: "1rem", fontWeight: 600 }}>
            Associated Events
          </CardTitle>
          <CardDescription style={{ fontSize: "0.8125rem" }}>
            {associatedEvents.length} event
            {associatedEvents.length !== 1 ? "s" : ""} in this campaign
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {associatedEvents.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <p
                className="text-muted-foreground"
                style={{ fontSize: "0.875rem" }}
              >
                No events associated with this campaign.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-y border-border">
                    {["Event", "Type", "Date", "Attendees", "Status"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left px-5 py-3 text-muted-foreground"
                          style={{ fontSize: "0.75rem", fontWeight: 500 }}
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {associatedEvents.map((e) => (
                    <tr
                      key={e.id}
                      className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <span
                          className="text-foreground"
                          style={{ fontSize: "0.875rem", fontWeight: 500 }}
                        >
                          {e.name}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <EventTypeBadge type={e.type} />
                      </td>
                      <td
                        className="px-5 py-3 text-muted-foreground"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        {e.date}
                      </td>
                      <td
                        className="px-5 py-3 text-muted-foreground tabular-nums"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        {e.attendees}
                      </td>
                      <td className="px-5 py-3">
                        <EventStatusBadge status={e.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
