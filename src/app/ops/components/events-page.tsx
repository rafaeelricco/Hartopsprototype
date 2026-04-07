import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Building2,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  X,
  UserPlus,
  Pencil,
  Star,
} from "lucide-react";
import { Card, CardContent } from "../../shared/components/ui/card";
import { Badge } from "../../shared/components/ui/badge";
import { Button } from "../../shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shared/components/ui/select";
import { Input } from "@/app/shared/components/ui/input";
import { Checkbox } from "../../shared/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../shared/components/ui/dialog";
import { MOCK_EDUCATORS } from "./educator-data";

/* ------------------------------------------------------------------ */
/* Mock data                                                           */
/* ------------------------------------------------------------------ */

export interface AssignedEducatorRecord {
  educatorId: string;
  name: string;
  status: "Pending" | "Accepted" | "Declined";
}

export interface EventRecord {
  id: string;
  name: string;
  organization: string;
  orgId: number;
  type: "In-Person" | "Virtual" | "Hybrid";
  status: "Live" | "Upcoming" | "Completed" | "Cancelled";
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  attendeesRegistered: number;
  attendeesCheckedIn: number;
  capacity: number;
  description: string;
  campaignName: string;
  tags: string[];
  createdBy: string;
  createdAt: string;
  assignedEducators: AssignedEducatorRecord[];
}

export const MOCK_EVENTS: EventRecord[] = [
  {
    id: "EVT-3001",
    name: "Annual Charity Gala",
    organization: "Acme Corp",
    orgId: 1,
    type: "In-Person",
    status: "Live",
    date: "Mar 4, 2026",
    startTime: "6:00 PM",
    endTime: "11:00 PM",
    location: "Grand Ballroom, Hilton Downtown",
    attendeesRegistered: 250,
    attendeesCheckedIn: 187,
    capacity: 300,
    description:
      "Premier annual fundraising gala featuring live entertainment, silent auction, and keynote address from industry leaders. All proceeds benefit local education initiatives.",
    campaignName: "Spring Product Launch",
    tags: ["fundraiser", "gala", "annual"],
    createdBy: "John Doe",
    createdAt: "Jan 15, 2026",
    assignedEducators: [
      { educatorId: "EDU-001", name: "Maria Santos", status: "Accepted" },
      { educatorId: "EDU-009", name: "Jasmine Williams", status: "Accepted" },
    ],
  },
  {
    id: "EVT-3002",
    name: "Spring Fundraiser Luncheon",
    organization: "Vanguard LLC",
    orgId: 2,
    type: "In-Person",
    status: "Live",
    date: "Mar 4, 2026",
    startTime: "11:30 AM",
    endTime: "2:00 PM",
    location: "Convention Center, Hall B",
    attendeesRegistered: 180,
    attendeesCheckedIn: 142,
    capacity: 200,
    description:
      "Networking luncheon for major donors and partners with a presentation on Q1 impact metrics and upcoming initiatives.",
    campaignName: "Q1 Brand Awareness",
    tags: ["fundraiser", "networking", "donors"],
    createdBy: "Sarah Chen",
    createdAt: "Feb 1, 2026",
    assignedEducators: [
      { educatorId: "EDU-002", name: "James Mitchell", status: "Accepted" },
    ],
  },
  {
    id: "EVT-3003",
    name: "Virtual Wellness Webinar",
    organization: "Zenith Group",
    orgId: 3,
    type: "Virtual",
    status: "Live",
    date: "Mar 4, 2026",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    location: "Zoom (Online)",
    attendeesRegistered: 320,
    attendeesCheckedIn: 289,
    capacity: 500,
    description:
      "Monthly wellness series for healthcare professionals featuring guest speakers and interactive Q&A sessions.",
    campaignName: "Customer Appreciation Week",
    tags: ["webinar", "wellness", "healthcare"],
    createdBy: "Maria Lopez",
    createdAt: "Feb 10, 2026",
    assignedEducators: [],
  },
  {
    id: "EVT-3004",
    name: "Tech Summit 2026",
    organization: "Nova Systems",
    orgId: 4,
    type: "Hybrid",
    status: "Upcoming",
    date: "Mar 8, 2026",
    startTime: "8:00 AM",
    endTime: "5:00 PM",
    location: "Tech Center, Austin",
    attendeesRegistered: 450,
    attendeesCheckedIn: 0,
    capacity: 500,
    description:
      "Full-day technology conference featuring hands-on workshops, panel discussions, and product demonstrations for AI-powered analytics.",
    campaignName: "Spring Product Launch",
    tags: ["conference", "tech", "AI"],
    createdBy: "Alex Kim",
    createdAt: "Jan 20, 2026",
    assignedEducators: [
      { educatorId: "EDU-005", name: "Sophia Rivera", status: "Accepted" },
      { educatorId: "EDU-006", name: "Marcus Taylor", status: "Pending" },
    ],
  },
  {
    id: "EVT-3005",
    name: "Board Strategy Meeting",
    organization: "Apex Holdings",
    orgId: 5,
    type: "In-Person",
    status: "Upcoming",
    date: "Mar 6, 2026",
    startTime: "9:00 AM",
    endTime: "12:00 PM",
    location: "HQ Conference Room, Boston",
    attendeesRegistered: 12,
    attendeesCheckedIn: 0,
    capacity: 20,
    description:
      "Quarterly board meeting to review portfolio performance and discuss strategic initiatives for H2 2026.",
    campaignName: "",
    tags: ["board", "strategy", "quarterly"],
    createdBy: "James Wright",
    createdAt: "Feb 15, 2026",
    assignedEducators: [],
  },
  {
    id: "EVT-3006",
    name: "Retail Innovation Showcase",
    organization: "Meridian Partners",
    orgId: 6,
    type: "In-Person",
    status: "Upcoming",
    date: "Mar 12, 2026",
    startTime: "10:00 AM",
    endTime: "4:00 PM",
    location: "LA Convention Center",
    attendeesRegistered: 380,
    attendeesCheckedIn: 0,
    capacity: 500,
    description:
      "Showcase of innovative retail technologies and consumer experience strategies for partners and clients.",
    campaignName: "Spring Product Launch",
    tags: ["showcase", "retail", "innovation"],
    createdBy: "Diana Ross",
    createdAt: "Feb 5, 2026",
    assignedEducators: [
      { educatorId: "EDU-003", name: "Ashley Chen", status: "Pending" },
    ],
  },
  {
    id: "EVT-3007",
    name: "K-12 EdTech Workshop",
    organization: "Catalyst Inc.",
    orgId: 7,
    type: "Virtual",
    status: "Upcoming",
    date: "Mar 10, 2026",
    startTime: "1:00 PM",
    endTime: "3:00 PM",
    location: "Microsoft Teams (Online)",
    attendeesRegistered: 95,
    attendeesCheckedIn: 0,
    capacity: 150,
    description:
      "Interactive workshop for educators on integrating digital learning tools into K-12 curriculum.",
    campaignName: "Q1 Brand Awareness",
    tags: ["workshop", "education", "K-12"],
    createdBy: "Ryan Patel",
    createdAt: "Feb 20, 2026",
    assignedEducators: [],
  },
  {
    id: "EVT-3008",
    name: "Clean Energy Investor Day",
    organization: "Pinnacle Ventures",
    orgId: 8,
    type: "Hybrid",
    status: "Upcoming",
    date: "Mar 15, 2026",
    startTime: "9:00 AM",
    endTime: "3:00 PM",
    location: "Pinnacle HQ, Denver + Virtual",
    attendeesRegistered: 65,
    attendeesCheckedIn: 0,
    capacity: 100,
    description:
      "Exclusive event for investors and portfolio companies to review clean energy startup progress and market outlook.",
    campaignName: "",
    tags: ["investor", "clean-energy", "venture"],
    createdBy: "Emily Thornton",
    createdAt: "Feb 25, 2026",
    assignedEducators: [],
  },
  {
    id: "EVT-3009",
    name: "Corporate Mixer & Networking",
    organization: "Zenith Group",
    orgId: 3,
    type: "In-Person",
    status: "Completed",
    date: "Feb 28, 2026",
    startTime: "7:00 PM",
    endTime: "10:00 PM",
    location: "Rooftop Lounge, Chicago",
    attendeesRegistered: 95,
    attendeesCheckedIn: 88,
    capacity: 120,
    description:
      "Evening networking mixer bringing together healthcare executives and community partners for relationship building.",
    campaignName: "Customer Appreciation Week",
    tags: ["mixer", "networking"],
    createdBy: "Maria Lopez",
    createdAt: "Jan 30, 2026",
    assignedEducators: [
      { educatorId: "EDU-007", name: "Lauren Nguyen", status: "Accepted" },
      { educatorId: "EDU-010", name: "Kevin O'Brien", status: "Accepted" },
    ],
  },
  {
    id: "EVT-3010",
    name: "Community Outreach Day",
    organization: "Nova Systems",
    orgId: 4,
    type: "In-Person",
    status: "Completed",
    date: "Feb 27, 2026",
    startTime: "10:00 AM",
    endTime: "4:00 PM",
    location: "City Park, Austin",
    attendeesRegistered: 320,
    attendeesCheckedIn: 295,
    capacity: 400,
    description:
      "Community engagement event featuring tech demos, free workshops, and family-friendly activities.",
    campaignName: "Q1 Brand Awareness",
    tags: ["community", "outreach", "family"],
    createdBy: "Alex Kim",
    createdAt: "Jan 25, 2026",
    assignedEducators: [
      { educatorId: "EDU-005", name: "Sophia Rivera", status: "Accepted" },
    ],
  },
  {
    id: "EVT-3011",
    name: "Winter Fundraiser Dinner",
    organization: "Acme Corp",
    orgId: 1,
    type: "In-Person",
    status: "Completed",
    date: "Feb 20, 2026",
    startTime: "6:30 PM",
    endTime: "9:30 PM",
    location: "Four Seasons Ballroom, SF",
    attendeesRegistered: 200,
    attendeesCheckedIn: 192,
    capacity: 220,
    description:
      "Elegant fundraiser dinner supporting local technology education programs with guest speakers and live music.",
    campaignName: "Holiday Season Campaign",
    tags: ["fundraiser", "dinner", "winter"],
    createdBy: "John Doe",
    createdAt: "Jan 5, 2026",
    assignedEducators: [
      { educatorId: "EDU-001", name: "Maria Santos", status: "Accepted" },
      { educatorId: "EDU-012", name: "Tyler Robinson", status: "Accepted" },
    ],
  },
  {
    id: "EVT-3012",
    name: "Financial Literacy Seminar",
    organization: "Vanguard LLC",
    orgId: 2,
    type: "Virtual",
    status: "Completed",
    date: "Feb 18, 2026",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    location: "Webex (Online)",
    attendeesRegistered: 150,
    attendeesCheckedIn: 134,
    capacity: 200,
    description:
      "Educational seminar on personal financial planning and investment strategies for young professionals.",
    campaignName: "Q1 Brand Awareness",
    tags: ["seminar", "finance", "education"],
    createdBy: "Sarah Chen",
    createdAt: "Jan 10, 2026",
    assignedEducators: [],
  },
  {
    id: "EVT-3013",
    name: "Partner Appreciation Reception",
    organization: "Meridian Partners",
    orgId: 6,
    type: "In-Person",
    status: "Completed",
    date: "Feb 14, 2026",
    startTime: "5:00 PM",
    endTime: "8:00 PM",
    location: "Meridian Gallery, LA",
    attendeesRegistered: 75,
    attendeesCheckedIn: 70,
    capacity: 100,
    description:
      "Exclusive reception for top retail partners celebrating Q4 achievements and previewing new collaboration opportunities.",
    campaignName: "Holiday Season Campaign",
    tags: ["reception", "appreciation", "partners"],
    createdBy: "Diana Ross",
    createdAt: "Jan 12, 2026",
    assignedEducators: [],
  },
  {
    id: "EVT-3014",
    name: "Annual Kickoff Town Hall",
    organization: "Acme Corp",
    orgId: 1,
    type: "Hybrid",
    status: "Completed",
    date: "Jan 15, 2026",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    location: "Acme HQ + Zoom",
    attendeesRegistered: 280,
    attendeesCheckedIn: 265,
    capacity: 300,
    description:
      "Company-wide kickoff event presenting 2026 strategy, celebrating achievements, and aligning teams on priorities.",
    campaignName: "",
    tags: ["kickoff", "town-hall", "annual"],
    createdBy: "John Doe",
    createdAt: "Dec 20, 2025",
    assignedEducators: [],
  },
  {
    id: "EVT-3015",
    name: "Customer Panel Discussion",
    organization: "Pinnacle Ventures",
    orgId: 8,
    type: "Virtual",
    status: "Completed",
    date: "Jan 8, 2026",
    startTime: "11:00 AM",
    endTime: "12:30 PM",
    location: "Google Meet (Online)",
    attendeesRegistered: 45,
    attendeesCheckedIn: 40,
    capacity: 60,
    description:
      "Panel featuring portfolio company founders sharing their experiences in clean energy innovation and market challenges.",
    campaignName: "Holiday Season Campaign",
    tags: ["panel", "customers", "discussion"],
    createdBy: "Emily Thornton",
    createdAt: "Dec 15, 2025",
    assignedEducators: [],
  },
  {
    id: "EVT-3016",
    name: "Donor Recognition Brunch",
    organization: "Catalyst Inc.",
    orgId: 7,
    type: "In-Person",
    status: "Cancelled",
    date: "Mar 20, 2026",
    startTime: "10:00 AM",
    endTime: "1:00 PM",
    location: "Seattle Country Club",
    attendeesRegistered: 60,
    attendeesCheckedIn: 0,
    capacity: 80,
    description:
      "Invitation-only brunch to recognize and thank major donors for their contributions to K-12 education programs.",
    campaignName: "Spring Product Launch",
    tags: ["brunch", "donors", "recognition"],
    createdBy: "Ryan Patel",
    createdAt: "Feb 28, 2026",
    assignedEducators: [],
  },
];

const ORGANIZATIONS = [
  "Acme Corp",
  "Vanguard LLC",
  "Zenith Group",
  "Nova Systems",
  "Apex Holdings",
  "Meridian Partners",
  "Catalyst Inc.",
  "Pinnacle Ventures",
];

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

function getAssignmentLabel(educators: AssignedEducatorRecord[]) {
  const lead = educators[0];
  if (!lead) return null;
  const first = lead.name.split(" ");
  const shortName = `${first[0]} ${first[1]?.[0] ?? ""}.`;
  const rest = educators.length - 1;
  return rest > 0 ? `${shortName} +${rest}` : shortName;
}

function getAssignmentFilterValue(educators: AssignedEducatorRecord[]) {
  if (educators.length === 0) return "unassigned";
  if (educators.some((e) => e.status === "Pending")) return "pending";
  return "assigned";
}

const PAGE_SIZE = 8;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function EventsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orgFilter, setOrgFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [assignmentFilter, setAssignmentFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Assignment dialog state
  const [showAssignment, setShowAssignment] = useState(false);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [assignmentSearch, setAssignmentSearch] = useState("");
  const [draftSelectedIds, setDraftSelectedIds] = useState<Set<string>>(
    new Set(),
  );
  const [localAssignments, setLocalAssignments] = useState<
    Record<string, AssignedEducatorRecord[]>
  >({});

  // Get effective assignments for an event (local override or mock data)
  const getAssignments = (event: EventRecord) =>
    localAssignments[event.id] ?? event.assignedEducators;

  const handleOpenAssignment = (eventId: string) => {
    const event = MOCK_EVENTS.find((e) => e.id === eventId);
    if (!event) return;
    const current = getAssignments(event);
    setActiveEventId(eventId);
    setDraftSelectedIds(new Set(current.map((e) => e.educatorId)));
    setAssignmentSearch("");
    setShowAssignment(true);
  };

  const handleConfirmAssignments = () => {
    if (!activeEventId) return;
    const currentEvent = MOCK_EVENTS.find((e) => e.id === activeEventId);
    if (!currentEvent) return;
    const existing = getAssignments(currentEvent);
    const newAssignments: AssignedEducatorRecord[] = [];
    draftSelectedIds.forEach((id) => {
      const prev = existing.find((e) => e.educatorId === id);
      if (prev) {
        newAssignments.push(prev);
      } else {
        const edu = MOCK_EDUCATORS.find((e) => e.id === id);
        if (edu) {
          newAssignments.push({ educatorId: id, name: edu.name, status: "Pending" });
        }
      }
    });
    setLocalAssignments((prev) => ({ ...prev, [activeEventId]: newAssignments }));
    setShowAssignment(false);
    setActiveEventId(null);
  };

  /* ---- Filtering ---- */
  const filtered = useMemo(() => {
    let result = [...MOCK_EVENTS];
    const q = search.toLowerCase().trim();
    if (q) {
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.organization.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q),
      );
    }
    if (statusFilter !== "all") {
      result = result.filter(
        (e) => e.status.toLowerCase() === statusFilter.toLowerCase(),
      );
    }
    if (orgFilter !== "all") {
      result = result.filter((e) => e.organization === orgFilter);
    }
    if (typeFilter !== "all") {
      result = result.filter(
        (e) => e.type.toLowerCase() === typeFilter.toLowerCase(),
      );
    }
    if (assignmentFilter !== "all") {
      result = result.filter((e) => {
        const val = getAssignmentFilterValue(getAssignments(e));
        return val === assignmentFilter;
      });
    }
    return result;
  }, [search, statusFilter, orgFilter, typeFilter, assignmentFilter, localAssignments]);

  /* ---- Pagination ---- */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  // Reset page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [search, statusFilter, orgFilter, typeFilter, assignmentFilter]);

  const hasActiveFilters =
    statusFilter !== "all" || orgFilter !== "all" || typeFilter !== "all" || assignmentFilter !== "all";

  const clearFilters = () => {
    setStatusFilter("all");
    setOrgFilter("all");
    setTypeFilter("all");
    setAssignmentFilter("all");
    setSearch("");
  };

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      <div>
        <h1 className="text-foreground">Events</h1>
        <p
          className="text-muted-foreground mt-1"
          style={{ fontSize: "0.875rem" }}
        >
          Cross-organization event monitoring — the omni view.
        </p>
      </div>

      {/* Summary Stats Bar */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard
          icon={CalendarDays}
          label="Events Today"
          value={eventsToday}
          accent={false}
        />
        <StatCard
          icon={Clock}
          label="Events This Week"
          value={eventsThisWeek}
          accent={false}
        />
        <StatCard icon={Radio} label="Live Now" value={liveNow} accent={true} />
        <div
          className="cursor-pointer transition-transform hover:scale-[1.02]"
          onClick={() => navigate("/ops/dashboard/draft-events")}
        >
          <StatCard
            icon={ClipboardCheck}
            label="Pending Drafts"
            value={pendingDrafts}
            accent={false}
          />
        </div>
      </div> */}

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="pl-9"
          />
        </div>

        {/* Organization filter */}
        <Select value={orgFilter} onValueChange={setOrgFilter}>
          <SelectTrigger
            className="w-[180px] cursor-pointer"
            style={{ fontSize: "0.8125rem" }}
          >
            <SelectValue placeholder="Organization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Organizations</SelectItem>
            {ORGANIZATIONS.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger
            className="w-[140px] cursor-pointer"
            style={{ fontSize: "0.8125rem" }}
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="live">Live</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* Type filter */}
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger
            className="w-[140px] cursor-pointer"
            style={{ fontSize: "0.8125rem" }}
          >
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="in-person">In-Person</SelectItem>
            <SelectItem value="virtual">Virtual</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>

        {/* Assignment filter */}
        <Select value={assignmentFilter} onValueChange={setAssignmentFilter}>
          <SelectTrigger
            className="w-[150px] cursor-pointer"
            style={{ fontSize: "0.8125rem" }}
          >
            <SelectValue placeholder="Assignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assignments</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
            style={{ fontSize: "0.75rem" }}
          >
            <X className="size-3 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Event Table */}
      <Card className="gap-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {[
                    "Event",
                    "Organization",
                    "Type",
                    "Date & Time",
                    "Attendees",
                    "Educators",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-muted-foreground"
                      style={{ fontSize: "0.75rem", fontWeight: 500 }}
                    >
                      <span className="inline-flex items-center gap-1">
                        {h}
                        <ArrowUpDown className="size-3" />
                      </span>
                    </th>
                  ))}
                  <th
                    className="text-left px-5 py-3 text-muted-foreground"
                    style={{ fontSize: "0.75rem", fontWeight: 500 }}
                  >
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center">
                      <p
                        className="text-muted-foreground"
                        style={{ fontSize: "0.875rem" }}
                      >
                        No events match your filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  paged.map((event) => (
                    <tr
                      key={event.id}
                      onClick={() =>
                        navigate(`/ops/dashboard/events/${event.id}`)
                      }
                      className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <td className="px-5 py-3">
                        <div className="min-w-[180px]">
                          <span
                            className="text-foreground block"
                            style={{ fontSize: "0.875rem", fontWeight: 500 }}
                          >
                            {event.name}
                          </span>
                          <span
                            className="text-muted-foreground"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {event.id}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2 min-w-[130px]">
                          <div className="flex items-center justify-center size-6 rounded bg-muted shrink-0">
                            <Building2 className="size-3 text-muted-foreground" />
                          </div>
                          <span
                            className="text-foreground"
                            style={{ fontSize: "0.8125rem" }}
                          >
                            {event.organization}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <Badge
                          variant="secondary"
                          className={getTypeColor(event.type)}
                          style={{ fontSize: "0.6875rem" }}
                        >
                          {event.type}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 min-w-[160px]">
                        <span
                          className="text-foreground block"
                          style={{ fontSize: "0.8125rem" }}
                        >
                          {event.date}
                        </span>
                        <span
                          className="text-muted-foreground"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {event.startTime} – {event.endTime}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className="text-foreground tabular-nums"
                          style={{ fontSize: "0.8125rem" }}
                        >
                          {event.attendeesRegistered}
                        </span>
                        <span
                          className="text-muted-foreground"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {" "}
                          / {event.capacity}
                        </span>
                      </td>
                      {/* Educators column */}
                      <td className="px-5 py-3">
                        {(() => {
                          const educators = getAssignments(event);
                          if (educators.length === 0) {
                            return (
                              <span
                                className="text-muted-foreground"
                                style={{ fontSize: "0.75rem" }}
                              >
                                Unassigned
                              </span>
                            );
                          }
                          const hasPending = educators.some(
                            (e) => e.status === "Pending",
                          );
                          return (
                            <div className="flex items-center gap-1.5 min-w-[120px]">
                              <span
                                className="text-foreground"
                                style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                              >
                                {getAssignmentLabel(educators)}
                              </span>
                              {hasPending && (
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
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-5 py-3">
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
                      </td>
                      {/* Actions column */}
                      <td className="px-5 py-3">
                        {(event.status === "Upcoming" ||
                          event.status === "Live") && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenAssignment(event.id);
                            }}
                            title={
                              getAssignments(event).length === 0
                                ? "Assign educators"
                                : "Reassign educators"
                            }
                          >
                            {getAssignments(event).length === 0 ? (
                              <UserPlus className="size-4" />
                            ) : (
                              <Pencil className="size-3.5" />
                            )}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-border">
              <span
                className="text-muted-foreground"
                style={{ fontSize: "0.75rem" }}
              >
                Showing {(safePage - 1) * PAGE_SIZE + 1}–
                {Math.min(safePage * PAGE_SIZE, filtered.length)} of{" "}
                {filtered.length} events
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={safePage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="cursor-pointer"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Button
                      key={p}
                      variant={p === safePage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(p)}
                      className={
                        p === safePage
                          ? "bg-[#7D152D] hover:bg-[#7D152D]/90 cursor-pointer"
                          : "cursor-pointer"
                      }
                      style={{ fontSize: "0.75rem", minWidth: "2rem" }}
                    >
                      {p}
                    </Button>
                  ),
                )}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="cursor-pointer"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assignment Dialog */}
      <Dialog open={showAssignment} onOpenChange={setShowAssignment}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="px-5 pt-5 pb-3 shrink-0 border-b border-border">
            <DialogTitle style={{ fontSize: "1.125rem", fontWeight: 600 }}>
              {(() => {
                const ev = MOCK_EVENTS.find((e) => e.id === activeEventId);
                if (!ev) return "Manage Educators";
                const current = getAssignments(ev);
                return current.length === 0
                  ? "Assign Educators"
                  : "Reassign Educators";
              })()}
            </DialogTitle>
            <DialogDescription style={{ fontSize: "0.875rem" }}>
              {(() => {
                const ev = MOCK_EVENTS.find((e) => e.id === activeEventId);
                return ev
                  ? `${ev.name} · ${ev.date} · ${ev.location}`
                  : "Select educators to assign to this event.";
              })()}
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
                          id={`list-edu-${educator.id}`}
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
                                htmlFor={`list-edu-${educator.id}`}
                                className="text-foreground cursor-pointer"
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: 500,
                                }}
                              >
                                {educator.name}
                              </label>
                            </div>
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
                onClick={handleConfirmAssignments}
              >
                Confirm Assignments
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
