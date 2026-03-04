import React from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Users,
  Activity,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Megaphone,
  BarChart3,
  Clock,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Progress } from "./ui/progress";

/* ------------------------------------------------------------------ */
/* Mock data                                                           */
/* ------------------------------------------------------------------ */

interface Organization {
  id: number;
  name: string;
  industry: string;
  status: "Active" | "Inactive";
  plan: string;
  primaryContact: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  website: string;
  joined: string;
  events: number;
  members: number;
  campaigns: number;
  description: string;
}

const ORGANIZATIONS: Record<number, Organization> = {
  1: {
    id: 1,
    name: "Acme Corp",
    industry: "Technology",
    status: "Active",
    plan: "Enterprise",
    primaryContact: "John Doe",
    contactEmail: "john@acmecorp.com",
    contactPhone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "acmecorp.com",
    joined: "Jan 15, 2025",
    events: 34,
    members: 12,
    campaigns: 8,
    description: "Leading technology solutions provider specializing in enterprise software.",
  },
  2: {
    id: 2,
    name: "Vanguard LLC",
    industry: "Finance",
    status: "Active",
    plan: "Professional",
    primaryContact: "Sarah Chen",
    contactEmail: "sarah@vanguardllc.com",
    contactPhone: "+1 (555) 234-5678",
    location: "New York, NY",
    website: "vanguardllc.com",
    joined: "Feb 3, 2025",
    events: 28,
    members: 8,
    campaigns: 5,
    description: "Financial advisory firm serving mid-market clients.",
  },
  3: {
    id: 3,
    name: "Zenith Group",
    industry: "Healthcare",
    status: "Active",
    plan: "Enterprise",
    primaryContact: "Maria Lopez",
    contactEmail: "maria@zenithgroup.com",
    contactPhone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    website: "zenithgroup.com",
    joined: "Mar 22, 2025",
    events: 22,
    members: 15,
    campaigns: 6,
    description: "Healthcare management group operating across multiple states.",
  },
  4: {
    id: 4,
    name: "Nova Systems",
    industry: "Technology",
    status: "Active",
    plan: "Starter",
    primaryContact: "Alex Kim",
    contactEmail: "alex@novasystems.io",
    contactPhone: "+1 (555) 456-7890",
    location: "Austin, TX",
    website: "novasystems.io",
    joined: "Apr 10, 2025",
    events: 19,
    members: 5,
    campaigns: 3,
    description: "Startup building AI-powered analytics tools for small businesses.",
  },
  5: {
    id: 5,
    name: "Apex Holdings",
    industry: "Finance",
    status: "Inactive",
    plan: "Professional",
    primaryContact: "James Wright",
    contactEmail: "james@apexholdings.com",
    contactPhone: "+1 (555) 567-8901",
    location: "Boston, MA",
    website: "apexholdings.com",
    joined: "May 1, 2025",
    events: 15,
    members: 6,
    campaigns: 2,
    description: "Investment holding company with diversified portfolio.",
  },
  6: {
    id: 6,
    name: "Meridian Partners",
    industry: "Retail",
    status: "Active",
    plan: "Enterprise",
    primaryContact: "Diana Ross",
    contactEmail: "diana@meridianpartners.com",
    contactPhone: "+1 (555) 678-9012",
    location: "Los Angeles, CA",
    website: "meridianpartners.com",
    joined: "Jun 18, 2025",
    events: 12,
    members: 20,
    campaigns: 4,
    description: "Retail consulting and operations management firm.",
  },
  7: {
    id: 7,
    name: "Catalyst Inc.",
    industry: "Education",
    status: "Active",
    plan: "Starter",
    primaryContact: "Ryan Patel",
    contactEmail: "ryan@catalystinc.org",
    contactPhone: "+1 (555) 789-0123",
    location: "Seattle, WA",
    website: "catalystinc.org",
    joined: "Jul 5, 2025",
    events: 8,
    members: 3,
    campaigns: 2,
    description: "EdTech company focused on K-12 digital learning solutions.",
  },
  8: {
    id: 8,
    name: "Pinnacle Ventures",
    industry: "Finance",
    status: "Active",
    plan: "Professional",
    primaryContact: "Emily Thornton",
    contactEmail: "emily@pinnacleventures.com",
    contactPhone: "+1 (555) 890-1234",
    location: "Denver, CO",
    website: "pinnacleventures.com",
    joined: "Aug 12, 2025",
    events: 11,
    members: 7,
    campaigns: 3,
    description: "Venture capital firm investing in clean energy startups.",
  },
};

/* ---- Mock campaigns ---- */
const CAMPAIGNS = [
  { id: 1, name: "Spring Product Launch", status: "Active", startDate: "Mar 1, 2026", endDate: "Apr 15, 2026", events: 6, progress: 62 },
  { id: 2, name: "Q1 Brand Awareness", status: "Completed", startDate: "Jan 5, 2026", endDate: "Mar 1, 2026", events: 12, progress: 100 },
  { id: 3, name: "Customer Appreciation Week", status: "Planned", startDate: "Apr 20, 2026", endDate: "Apr 27, 2026", events: 4, progress: 0 },
  { id: 4, name: "Holiday Season Campaign", status: "Completed", startDate: "Nov 15, 2025", endDate: "Dec 31, 2025", events: 8, progress: 100 },
];

/* ---- Mock events ---- */
const EVENTS = [
  { id: 1, name: "Product Demo Day", type: "In-Person", date: "Mar 4, 2026", attendees: 120, status: "Upcoming" },
  { id: 2, name: "Webinar: Q1 Results", type: "Virtual", date: "Mar 10, 2026", attendees: 85, status: "Upcoming" },
  { id: 3, name: "Partner Mixer", type: "In-Person", date: "Feb 20, 2026", attendees: 65, status: "Completed" },
  { id: 4, name: "Training Workshop", type: "Hybrid", date: "Feb 14, 2026", attendees: 40, status: "Completed" },
  { id: 5, name: "Annual Kickoff", type: "In-Person", date: "Jan 15, 2026", attendees: 200, status: "Completed" },
  { id: 6, name: "Customer Panel", type: "Virtual", date: "Jan 8, 2026", attendees: 150, status: "Completed" },
];

/* ---- Mock team members ---- */
const TEAM_MEMBERS = [
  { id: 1, name: "John Doe", email: "john@acmecorp.com", role: "Admin", status: "Active", lastActive: "Today" },
  { id: 2, name: "Jane Smith", email: "jane@acmecorp.com", role: "Manager", status: "Active", lastActive: "Today" },
  { id: 3, name: "Mike Johnson", email: "mike@acmecorp.com", role: "Member", status: "Active", lastActive: "Yesterday" },
  { id: 4, name: "Lisa Wang", email: "lisa@acmecorp.com", role: "Member", status: "Active", lastActive: "2 days ago" },
  { id: 5, name: "Tom Brown", email: "tom@acmecorp.com", role: "Member", status: "Invited", lastActive: "—" },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function OrganizationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const org = ORGANIZATIONS[Number(id)];

  if (!org) {
    return (
      <div className="p-6 w-full">
        <Button variant="ghost" onClick={() => navigate("/dashboard/organizations")} className="cursor-pointer mb-4">
          <ArrowLeft className="size-4 mr-2" /> Back to Organizations
        </Button>
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>Organization not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Back + Header */}
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard/organizations")}
          className="-ml-3 mb-3 text-muted-foreground hover:text-foreground cursor-pointer"
          style={{ fontSize: "0.8125rem" }}
        >
          <ArrowLeft className="size-4 mr-1" /> Organizations
        </Button>

        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center size-12 rounded-lg bg-muted border border-border shrink-0">
            <Building2 className="size-6 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-foreground">{org.name}</h1>
              <Badge
                variant="secondary"
                className={
                  org.status === "Active"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-600 border-red-200"
                }
                style={{ fontSize: "0.6875rem" }}
              >
                {org.status}
              </Badge>
              <Badge variant="outline" style={{ fontSize: "0.6875rem" }}>
                {org.plan}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1" style={{ fontSize: "0.875rem" }}>
              {org.description}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="border-b border-border bg-transparent rounded-none w-full justify-start gap-0 h-auto p-0">
          {["Overview", "Campaigns", "Events", "Team"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase()}
              className="rounded-none border-b-2 border-transparent bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-[#7D152D] data-[state=active]:text-[#7D152D] data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-[#7D152D] hover:text-foreground px-4 py-2.5 cursor-pointer"
              style={{ fontSize: "0.8125rem" }}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ---- OVERVIEW ---- */}
        <TabsContent value="overview" className="mt-5 space-y-5">
          {/* Quick stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatMini icon={CalendarDays} label="Events" value={String(org.events)} />
            <StatMini icon={Users} label="Members" value={String(org.members)} />
            <StatMini icon={Megaphone} label="Campaigns" value={String(org.campaigns)} />
            <StatMini icon={Activity} label="Plan" value={org.plan} />
          </div>

          {/* Contact info */}
          <Card className="gap-0">
            <CardHeader className="px-5 pt-5 pb-4">
              <CardTitle style={{ fontSize: "1rem", fontWeight: 600 }}>
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow icon={User} label="Primary Contact" value={org.primaryContact} />
                <InfoRow icon={Mail} label="Email" value={org.contactEmail} />
                <InfoRow icon={Phone} label="Phone" value={org.contactPhone} />
                <InfoRow icon={MapPin} label="Location" value={org.location} />
                <InfoRow icon={Globe} label="Website" value={org.website} isLink />
                <InfoRow icon={CalendarDays} label="Joined" value={org.joined} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---- CAMPAIGNS ---- */}
        <TabsContent value="campaigns" className="mt-5 space-y-4">
          <Card className="gap-0">
            <CardHeader className="px-5 pt-5 pb-4">
              <CardTitle style={{ fontSize: "1rem", fontWeight: 600 }}>
                Campaigns
              </CardTitle>
              <CardDescription style={{ fontSize: "0.8125rem" }}>
                All campaigns for this organization
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-y border-border">
                      {["Campaign", "Status", "Date Range", "Events", "Progress"].map((h) => (
                        <th
                          key={h}
                          className="text-left px-5 py-3 text-muted-foreground"
                          style={{ fontSize: "0.75rem", fontWeight: 500 }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CAMPAIGNS.map((c) => (
                      <tr
                        key={c.id}
                        className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-5 py-3">
                          <span className="text-foreground" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                            {c.name}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <CampaignStatusBadge status={c.status} />
                        </td>
                        <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
                          {c.startDate} — {c.endDate}
                        </td>
                        <td className="px-5 py-3 text-muted-foreground tabular-nums" style={{ fontSize: "0.8125rem" }}>
                          {c.events}
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2 min-w-[120px]">
                            <Progress value={c.progress} className="h-1.5 flex-1" />
                            <span className="text-muted-foreground tabular-nums" style={{ fontSize: "0.75rem" }}>
                              {c.progress}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---- EVENTS ---- */}
        <TabsContent value="events" className="mt-5 space-y-4">
          <Card className="gap-0">
            <CardHeader className="px-5 pt-5 pb-4">
              <CardTitle style={{ fontSize: "1rem", fontWeight: 600 }}>
                Events
              </CardTitle>
              <CardDescription style={{ fontSize: "0.8125rem" }}>
                All events for this organization
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-y border-border">
                      {["Event", "Type", "Date", "Attendees", "Status"].map((h) => (
                        <th
                          key={h}
                          className="text-left px-5 py-3 text-muted-foreground"
                          style={{ fontSize: "0.75rem", fontWeight: 500 }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {EVENTS.map((ev) => (
                      <tr
                        key={ev.id}
                        className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-5 py-3">
                          <span className="text-foreground" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                            {ev.name}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <Badge variant="outline" style={{ fontSize: "0.6875rem" }}>
                            {ev.type}
                          </Badge>
                        </td>
                        <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
                          {ev.date}
                        </td>
                        <td className="px-5 py-3 text-muted-foreground tabular-nums" style={{ fontSize: "0.8125rem" }}>
                          {ev.attendees}
                        </td>
                        <td className="px-5 py-3">
                          <Badge
                            variant="secondary"
                            className={
                              ev.status === "Upcoming"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-green-50 text-green-700 border-green-200"
                            }
                            style={{ fontSize: "0.6875rem" }}
                          >
                            {ev.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---- TEAM ---- */}
        <TabsContent value="team" className="mt-5 space-y-4">
          <Card className="gap-0">
            <CardHeader className="px-5 pt-5 pb-4">
              <CardTitle style={{ fontSize: "1rem", fontWeight: 600 }}>
                Team Members
              </CardTitle>
              <CardDescription style={{ fontSize: "0.8125rem" }}>
                Users belonging to this organization
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-y border-border">
                      {["Member", "Role", "Status", "Last Active"].map((h) => (
                        <th
                          key={h}
                          className="text-left px-5 py-3 text-muted-foreground"
                          style={{ fontSize: "0.75rem", fontWeight: 500 }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TEAM_MEMBERS.map((m) => (
                      <tr
                        key={m.id}
                        className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-8 rounded-full bg-muted text-muted-foreground" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                              {m.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <span className="text-foreground block" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                                {m.name}
                              </span>
                              <span className="text-muted-foreground block" style={{ fontSize: "0.75rem" }}>
                                {m.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <Badge variant="outline" style={{ fontSize: "0.6875rem" }}>
                            {m.role}
                          </Badge>
                        </td>
                        <td className="px-5 py-3">
                          <Badge
                            variant="secondary"
                            className={
                              m.status === "Active"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }
                            style={{ fontSize: "0.6875rem" }}
                          >
                            {m.status}
                          </Badge>
                        </td>
                        <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
                          <span className="flex items-center gap-1.5">
                            <Clock className="size-3" />
                            {m.lastActive}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function StatMini({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <Card className="gap-0">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="flex items-center justify-center size-9 rounded-md bg-muted">
          <Icon className="size-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
            {label}
          </p>
          <p className="text-foreground" style={{ fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.2 }}>
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  isLink,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  isLink?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
      <div>
        <p className="text-muted-foreground" style={{ fontSize: "0.6875rem" }}>
          {label}
        </p>
        {isLink ? (
          <a
            href={`https://${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7D152D] hover:underline inline-flex items-center gap-1"
            style={{ fontSize: "0.8125rem" }}
          >
            {value}
            <ExternalLink className="size-3" />
          </a>
        ) : (
          <p className="text-foreground" style={{ fontSize: "0.8125rem" }}>
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

function CampaignStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-green-50 text-green-700 border-green-200",
    Completed: "bg-muted text-muted-foreground border-border",
    Planned: "bg-blue-50 text-blue-700 border-blue-200",
  };
  return (
    <Badge variant="secondary" className={styles[status] ?? ""} style={{ fontSize: "0.6875rem" }}>
      {status}
    </Badge>
  );
}