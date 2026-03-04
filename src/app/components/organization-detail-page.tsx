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
  User,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Briefcase,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Progress } from "./ui/progress";

/* ------------------------------------------------------------------ */
/* Mock data — Organizations                                           */
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
  joinedISO: string;
  events: number;
  members: number;
  campaigns: number;
  description: string;
}

const ORGANIZATIONS: Record<number, Organization> = {
  1: {
    id: 1, name: "Acme Corp", industry: "Technology", status: "Active", plan: "Enterprise",
    primaryContact: "John Doe", contactEmail: "john@acmecorp.com", contactPhone: "+1 (555) 123-4567",
    location: "San Francisco, CA", website: "acmecorp.com", joined: "Jan 15, 2025", joinedISO: "2025-01-15",
    events: 34, members: 12, campaigns: 8,
    description: "Leading technology solutions provider specializing in enterprise software.",
  },
  2: {
    id: 2, name: "Vanguard LLC", industry: "Finance", status: "Active", plan: "Professional",
    primaryContact: "Sarah Chen", contactEmail: "sarah@vanguardllc.com", contactPhone: "+1 (555) 234-5678",
    location: "New York, NY", website: "vanguardllc.com", joined: "Feb 3, 2025", joinedISO: "2025-02-03",
    events: 28, members: 8, campaigns: 5,
    description: "Financial advisory firm serving mid-market clients.",
  },
  3: {
    id: 3, name: "Zenith Group", industry: "Healthcare", status: "Active", plan: "Enterprise",
    primaryContact: "Maria Lopez", contactEmail: "maria@zenithgroup.com", contactPhone: "+1 (555) 345-6789",
    location: "Chicago, IL", website: "zenithgroup.com", joined: "Mar 22, 2025", joinedISO: "2025-03-22",
    events: 22, members: 15, campaigns: 6,
    description: "Healthcare management group operating across multiple states.",
  },
  4: {
    id: 4, name: "Nova Systems", industry: "Technology", status: "Active", plan: "Starter",
    primaryContact: "Alex Kim", contactEmail: "alex@novasystems.io", contactPhone: "+1 (555) 456-7890",
    location: "Austin, TX", website: "novasystems.io", joined: "Apr 10, 2025", joinedISO: "2025-04-10",
    events: 19, members: 5, campaigns: 3,
    description: "Startup building AI-powered analytics tools for small businesses.",
  },
  5: {
    id: 5, name: "Apex Holdings", industry: "Finance", status: "Inactive", plan: "Professional",
    primaryContact: "James Wright", contactEmail: "james@apexholdings.com", contactPhone: "+1 (555) 567-8901",
    location: "Boston, MA", website: "apexholdings.com", joined: "May 1, 2025", joinedISO: "2025-05-01",
    events: 15, members: 6, campaigns: 2,
    description: "Investment holding company with diversified portfolio.",
  },
  6: {
    id: 6, name: "Meridian Partners", industry: "Retail", status: "Active", plan: "Enterprise",
    primaryContact: "Diana Ross", contactEmail: "diana@meridianpartners.com", contactPhone: "+1 (555) 678-9012",
    location: "Los Angeles, CA", website: "meridianpartners.com", joined: "Jun 18, 2025", joinedISO: "2025-06-18",
    events: 12, members: 20, campaigns: 4,
    description: "Retail consulting and operations management firm.",
  },
  7: {
    id: 7, name: "Catalyst Inc.", industry: "Education", status: "Active", plan: "Starter",
    primaryContact: "Ryan Patel", contactEmail: "ryan@catalystinc.org", contactPhone: "+1 (555) 789-0123",
    location: "Seattle, WA", website: "catalystinc.org", joined: "Jul 5, 2025", joinedISO: "2025-07-05",
    events: 8, members: 3, campaigns: 2,
    description: "EdTech company focused on K-12 digital learning solutions.",
  },
  8: {
    id: 8, name: "Pinnacle Ventures", industry: "Finance", status: "Active", plan: "Professional",
    primaryContact: "Emily Thornton", contactEmail: "emily@pinnacleventures.com", contactPhone: "+1 (555) 890-1234",
    location: "Denver, CO", website: "pinnacleventures.com", joined: "Aug 12, 2025", joinedISO: "2025-08-12",
    events: 11, members: 7, campaigns: 3,
    description: "Venture capital firm investing in clean energy startups.",
  },
};

/* ------------------------------------------------------------------ */
/* Mock data — Data Quality per org (change #4)                        */
/* ------------------------------------------------------------------ */

interface OrgQuality {
  overall: number;
  trend: "up" | "down" | "stable";
  change: number;
}

const ORG_QUALITY: Record<number, OrgQuality> = {
  1: { overall: 94, trend: "up", change: 3 },
  2: { overall: 82, trend: "down", change: -2 },
  3: { overall: 91, trend: "up", change: 4 },
  4: { overall: 88, trend: "stable", change: 0 },
  5: { overall: 71, trend: "down", change: -5 },
  6: { overall: 86, trend: "up", change: 2 },
  7: { overall: 79, trend: "down", change: -3 },
  8: { overall: 85, trend: "stable", change: 0 },
};

/* ------------------------------------------------------------------ */
/* Mock data — Per-org campaigns (change #5)                           */
/* ------------------------------------------------------------------ */

interface Campaign {
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  events: number;
  progress: number;
}

const ORG_CAMPAIGNS: Record<number, Campaign[]> = {
  1: [
    { id: 1, name: "Spring Product Launch", status: "Active", startDate: "Mar 1, 2026", endDate: "Apr 15, 2026", events: 6, progress: 62 },
    { id: 2, name: "Q1 Brand Awareness", status: "Completed", startDate: "Jan 5, 2026", endDate: "Mar 1, 2026", events: 12, progress: 100 },
    { id: 3, name: "Holiday Season Push", status: "Completed", startDate: "Nov 15, 2025", endDate: "Dec 31, 2025", events: 8, progress: 100 },
    { id: 4, name: "Developer Conference", status: "Planned", startDate: "May 1, 2026", endDate: "May 3, 2026", events: 4, progress: 0 },
    { id: 5, name: "Customer Success Summit", status: "Planned", startDate: "Jun 10, 2026", endDate: "Jun 12, 2026", events: 0, progress: 0 },
    { id: 6, name: "Q2 Webinar Series", status: "Active", startDate: "Apr 1, 2026", endDate: "Jun 30, 2026", events: 2, progress: 20 },
    { id: 7, name: "Partner Enablement", status: "Completed", startDate: "Sep 1, 2025", endDate: "Oct 31, 2025", events: 2, progress: 100 },
    { id: 8, name: "Year-End Review", status: "Completed", startDate: "Dec 15, 2025", endDate: "Dec 20, 2025", events: 0, progress: 100 },
  ],
  2: [
    { id: 1, name: "Financial Literacy Week", status: "Active", startDate: "Mar 10, 2026", endDate: "Mar 17, 2026", events: 5, progress: 40 },
    { id: 2, name: "Q1 Client Outreach", status: "Completed", startDate: "Jan 10, 2026", endDate: "Feb 28, 2026", events: 10, progress: 100 },
    { id: 3, name: "Annual Investor Day", status: "Planned", startDate: "May 15, 2026", endDate: "May 15, 2026", events: 1, progress: 0 },
    { id: 4, name: "Retirement Planning Series", status: "Completed", startDate: "Oct 1, 2025", endDate: "Dec 15, 2025", events: 8, progress: 100 },
    { id: 5, name: "Wealth Management Webinars", status: "Active", startDate: "Feb 1, 2026", endDate: "Apr 30, 2026", events: 4, progress: 55 },
  ],
  3: [
    { id: 1, name: "Patient Outreach Campaign", status: "Active", startDate: "Feb 15, 2026", endDate: "Apr 30, 2026", events: 6, progress: 45 },
    { id: 2, name: "Healthcare Innovation Summit", status: "Planned", startDate: "Jun 1, 2026", endDate: "Jun 3, 2026", events: 3, progress: 0 },
    { id: 3, name: "Staff Training Rollout", status: "Completed", startDate: "Nov 1, 2025", endDate: "Jan 31, 2026", events: 8, progress: 100 },
    { id: 4, name: "Community Health Fair", status: "Active", startDate: "Mar 1, 2026", endDate: "Mar 15, 2026", events: 2, progress: 70 },
    { id: 5, name: "Telehealth Awareness", status: "Completed", startDate: "Sep 1, 2025", endDate: "Oct 15, 2025", events: 3, progress: 100 },
    { id: 6, name: "Annual Wellness Drive", status: "Completed", startDate: "Jan 5, 2026", endDate: "Feb 10, 2026", events: 0, progress: 100 },
  ],
  4: [
    { id: 1, name: "Beta Launch Campaign", status: "Active", startDate: "Feb 1, 2026", endDate: "Apr 30, 2026", events: 8, progress: 55 },
    { id: 2, name: "Startup Demo Day", status: "Planned", startDate: "May 20, 2026", endDate: "May 20, 2026", events: 1, progress: 0 },
    { id: 3, name: "Early Adopter Outreach", status: "Completed", startDate: "Oct 1, 2025", endDate: "Dec 31, 2025", events: 10, progress: 100 },
  ],
  5: [
    { id: 1, name: "Portfolio Review Series", status: "Completed", startDate: "Jan 10, 2026", endDate: "Feb 28, 2026", events: 8, progress: 100 },
    { id: 2, name: "Year-End Wrap Up", status: "Completed", startDate: "Dec 1, 2025", endDate: "Dec 20, 2025", events: 7, progress: 100 },
  ],
  6: [
    { id: 1, name: "Spring Retail Showcase", status: "Active", startDate: "Mar 5, 2026", endDate: "Apr 20, 2026", events: 4, progress: 30 },
    { id: 2, name: "Consumer Insights Workshop", status: "Completed", startDate: "Jan 15, 2026", endDate: "Feb 15, 2026", events: 3, progress: 100 },
    { id: 3, name: "Partner Onboarding", status: "Completed", startDate: "Oct 1, 2025", endDate: "Nov 30, 2025", events: 3, progress: 100 },
    { id: 4, name: "Holiday Pop-Up Events", status: "Planned", startDate: "Nov 15, 2026", endDate: "Dec 24, 2026", events: 2, progress: 0 },
  ],
  7: [
    { id: 1, name: "K-12 Digital Learning Summit", status: "Active", startDate: "Feb 20, 2026", endDate: "Mar 30, 2026", events: 4, progress: 50 },
    { id: 2, name: "Teacher Training Pilot", status: "Completed", startDate: "Nov 1, 2025", endDate: "Jan 15, 2026", events: 4, progress: 100 },
  ],
  8: [
    { id: 1, name: "Clean Energy Showcase", status: "Active", startDate: "Mar 1, 2026", endDate: "Apr 15, 2026", events: 3, progress: 35 },
    { id: 2, name: "Investor Networking Series", status: "Completed", startDate: "Jan 1, 2026", endDate: "Feb 28, 2026", events: 5, progress: 100 },
    { id: 3, name: "Portfolio Company Demo Day", status: "Planned", startDate: "May 10, 2026", endDate: "May 10, 2026", events: 1, progress: 0 },
  ],
};

/* ------------------------------------------------------------------ */
/* Mock data — Per-org events (change #5)                              */
/* ------------------------------------------------------------------ */

interface OrgEvent {
  id: number;
  name: string;
  type: string;
  date: string;
  attendees: number;
  status: string;
}

const ORG_EVENTS: Record<number, OrgEvent[]> = {
  1: [
    { id: 1, name: "Product Demo Day", type: "In-Person", date: "Mar 4, 2026", attendees: 120, status: "Upcoming" },
    { id: 2, name: "Webinar: Q1 Results", type: "Virtual", date: "Mar 10, 2026", attendees: 85, status: "Upcoming" },
    { id: 3, name: "Partner Mixer", type: "In-Person", date: "Feb 20, 2026", attendees: 65, status: "Completed" },
    { id: 4, name: "Training Workshop", type: "Hybrid", date: "Feb 14, 2026", attendees: 40, status: "Completed" },
    { id: 5, name: "Annual Kickoff", type: "In-Person", date: "Jan 15, 2026", attendees: 200, status: "Completed" },
    { id: 6, name: "Customer Panel", type: "Virtual", date: "Jan 8, 2026", attendees: 150, status: "Completed" },
  ],
  2: [
    { id: 1, name: "Financial Planning Seminar", type: "In-Person", date: "Mar 6, 2026", attendees: 90, status: "Upcoming" },
    { id: 2, name: "Client Appreciation Dinner", type: "In-Person", date: "Feb 28, 2026", attendees: 55, status: "Completed" },
    { id: 3, name: "Tax Strategy Webinar", type: "Virtual", date: "Feb 18, 2026", attendees: 130, status: "Completed" },
    { id: 4, name: "Retirement Planning Q&A", type: "Virtual", date: "Feb 5, 2026", attendees: 78, status: "Completed" },
    { id: 5, name: "Market Outlook 2026", type: "Hybrid", date: "Jan 22, 2026", attendees: 165, status: "Completed" },
  ],
  3: [
    { id: 1, name: "Health & Wellness Fair", type: "In-Person", date: "Mar 12, 2026", attendees: 250, status: "Upcoming" },
    { id: 2, name: "Telehealth Training", type: "Virtual", date: "Mar 3, 2026", attendees: 60, status: "Upcoming" },
    { id: 3, name: "Staff CPR Certification", type: "In-Person", date: "Feb 25, 2026", attendees: 35, status: "Completed" },
    { id: 4, name: "Patient Experience Workshop", type: "Hybrid", date: "Feb 10, 2026", attendees: 45, status: "Completed" },
    { id: 5, name: "Annual Medical Conference", type: "In-Person", date: "Jan 28, 2026", attendees: 180, status: "Completed" },
  ],
  4: [
    { id: 1, name: "Beta Launch Event", type: "Hybrid", date: "Mar 8, 2026", attendees: 75, status: "Upcoming" },
    { id: 2, name: "AI Workshop", type: "Virtual", date: "Feb 22, 2026", attendees: 50, status: "Completed" },
    { id: 3, name: "Startup Pitch Night", type: "In-Person", date: "Feb 1, 2026", attendees: 95, status: "Completed" },
    { id: 4, name: "Product Feedback Session", type: "Virtual", date: "Jan 18, 2026", attendees: 30, status: "Completed" },
  ],
  5: [
    { id: 1, name: "Portfolio Review Meetup", type: "In-Person", date: "Feb 15, 2026", attendees: 40, status: "Completed" },
    { id: 2, name: "Risk Assessment Webinar", type: "Virtual", date: "Jan 30, 2026", attendees: 65, status: "Completed" },
    { id: 3, name: "Year-End Investor Briefing", type: "Hybrid", date: "Dec 18, 2025", attendees: 55, status: "Completed" },
  ],
  6: [
    { id: 1, name: "Retail Innovation Summit", type: "In-Person", date: "Mar 15, 2026", attendees: 180, status: "Upcoming" },
    { id: 2, name: "Visual Merchandising Workshop", type: "Hybrid", date: "Feb 26, 2026", attendees: 35, status: "Completed" },
    { id: 3, name: "Consumer Behavior Webinar", type: "Virtual", date: "Feb 12, 2026", attendees: 95, status: "Completed" },
    { id: 4, name: "Supplier Networking Event", type: "In-Person", date: "Jan 25, 2026", attendees: 70, status: "Completed" },
  ],
  7: [
    { id: 1, name: "EdTech Showcase", type: "Virtual", date: "Mar 5, 2026", attendees: 45, status: "Upcoming" },
    { id: 2, name: "Teacher Workshop: Digital Tools", type: "Hybrid", date: "Feb 15, 2026", attendees: 30, status: "Completed" },
    { id: 3, name: "Parent Info Night", type: "In-Person", date: "Jan 20, 2026", attendees: 60, status: "Completed" },
  ],
  8: [
    { id: 1, name: "Clean Energy Pitch Day", type: "In-Person", date: "Mar 10, 2026", attendees: 80, status: "Upcoming" },
    { id: 2, name: "LP Update Webinar", type: "Virtual", date: "Feb 20, 2026", attendees: 45, status: "Completed" },
    { id: 3, name: "Portfolio Company Demo Day", type: "Hybrid", date: "Feb 5, 2026", attendees: 60, status: "Completed" },
    { id: 4, name: "Startup Scouting Trip", type: "In-Person", date: "Jan 15, 2026", attendees: 25, status: "Completed" },
  ],
};

/* ------------------------------------------------------------------ */
/* Mock data — Per-org team members (change #5)                        */
/* ------------------------------------------------------------------ */

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
}

const ORG_TEAM: Record<number, TeamMember[]> = {
  1: [
    { id: 1, name: "John Doe", email: "john@acmecorp.com", role: "Admin", status: "Active", lastActive: "Today" },
    { id: 2, name: "Jane Smith", email: "jane@acmecorp.com", role: "Manager", status: "Active", lastActive: "Today" },
    { id: 3, name: "Mike Johnson", email: "mike@acmecorp.com", role: "Member", status: "Active", lastActive: "Yesterday" },
    { id: 4, name: "Lisa Wang", email: "lisa@acmecorp.com", role: "Member", status: "Active", lastActive: "2 days ago" },
    { id: 5, name: "Tom Brown", email: "tom@acmecorp.com", role: "Member", status: "Invited", lastActive: "—" },
    { id: 6, name: "Amy Chen", email: "amy@acmecorp.com", role: "Member", status: "Active", lastActive: "3 days ago" },
    { id: 7, name: "David Park", email: "david@acmecorp.com", role: "Member", status: "Active", lastActive: "Today" },
    { id: 8, name: "Rachel Green", email: "rachel@acmecorp.com", role: "Manager", status: "Active", lastActive: "Yesterday" },
    { id: 9, name: "Chris Lee", email: "chris@acmecorp.com", role: "Member", status: "Active", lastActive: "4 days ago" },
    { id: 10, name: "Mia Torres", email: "mia@acmecorp.com", role: "Member", status: "Active", lastActive: "Today" },
    { id: 11, name: "Nathan Price", email: "nathan@acmecorp.com", role: "Member", status: "Active", lastActive: "Yesterday" },
    { id: 12, name: "Sofia Reyes", email: "sofia@acmecorp.com", role: "Member", status: "Invited", lastActive: "—" },
  ],
  2: [
    { id: 1, name: "Sarah Chen", email: "sarah@vanguardllc.com", role: "Admin", status: "Active", lastActive: "Today" },
    { id: 2, name: "Marcus Webb", email: "marcus@vanguardllc.com", role: "Manager", status: "Active", lastActive: "Today" },
    { id: 3, name: "Olivia Hart", email: "olivia@vanguardllc.com", role: "Member", status: "Active", lastActive: "Yesterday" },
    { id: 4, name: "Daniel Kim", email: "daniel@vanguardllc.com", role: "Member", status: "Active", lastActive: "3 days ago" },
    { id: 5, name: "Nina Patel", email: "nina@vanguardllc.com", role: "Member", status: "Active", lastActive: "Today" },
    { id: 6, name: "Jake Morrison", email: "jake@vanguardllc.com", role: "Member", status: "Active", lastActive: "2 days ago" },
    { id: 7, name: "Emma Liu", email: "emma@vanguardllc.com", role: "Member", status: "Active", lastActive: "Yesterday" },
    { id: 8, name: "Ryan Okafor", email: "ryan@vanguardllc.com", role: "Member", status: "Invited", lastActive: "—" },
  ],
  3: [
    { id: 1, name: "Maria Lopez", email: "maria@zenithgroup.com", role: "Admin", status: "Active", lastActive: "Today" },
    { id: 2, name: "David Chen", email: "david@zenithgroup.com", role: "Manager", status: "Active", lastActive: "Today" },
    { id: 3, name: "Amanda Foster", email: "amanda@zenithgroup.com", role: "Manager", status: "Active", lastActive: "Yesterday" },
    { id: 4, name: "Brian Nguyen", email: "brian@zenithgroup.com", role: "Member", status: "Active", lastActive: "Today" },
    { id: 5, name: "Carla Rivera", email: "carla@zenithgroup.com", role: "Member", status: "Active", lastActive: "2 days ago" },
    { id: 6, name: "Eric Walsh", email: "eric@zenithgroup.com", role: "Member", status: "Active", lastActive: "Today" },
    { id: 7, name: "Fatima Al-Hassan", email: "fatima@zenithgroup.com", role: "Member", status: "Active", lastActive: "Yesterday" },
    { id: 8, name: "Greg Thompson", email: "greg@zenithgroup.com", role: "Member", status: "Active", lastActive: "3 days ago" },
    { id: 9, name: "Helen Park", email: "helen@zenithgroup.com", role: "Member", status: "Active", lastActive: "Today" },
    { id: 10, name: "Isaac Brown", email: "isaac@zenithgroup.com", role: "Member", status: "Active", lastActive: "4 days ago" },
    { id: 11, name: "Julia Santos", email: "julia@zenithgroup.com", role: "Member", status: "Active", lastActive: "Yesterday" },
    { id: 12, name: "Kevin O'Brien", email: "kevin@zenithgroup.com", role: "Member", status: "Active", lastActive: "Today" },
    { id: 13, name: "Laura Singh", email: "laura@zenithgroup.com", role: "Member", status: "Invited", lastActive: "—" },
    { id: 14, name: "Mark Davis", email: "mark@zenithgroup.com", role: "Member", status: "Active", lastActive: "2 days ago" },
    { id: 15, name: "Nancy Lee", email: "nancy@zenithgroup.com", role: "Member", status: "Invited", lastActive: "—" },
  ],
  4: [
    { id: 1, name: "Alex Kim", email: "alex@novasystems.io", role: "Admin", status: "Active", lastActive: "Today" },
    { id: 2, name: "Priya Sharma", email: "priya@novasystems.io", role: "Manager", status: "Active", lastActive: "Today" },
    { id: 3, name: "Leo Chang", email: "leo@novasystems.io", role: "Member", status: "Active", lastActive: "Yesterday" },
    { id: 4, name: "Zara Hoffman", email: "zara@novasystems.io", role: "Member", status: "Active", lastActive: "3 days ago" },
    { id: 5, name: "Ethan Moore", email: "ethan@novasystems.io", role: "Member", status: "Invited", lastActive: "—" },
  ],
  5: [
    { id: 1, name: "James Wright", email: "james@apexholdings.com", role: "Admin", status: "Active", lastActive: "5 days ago" },
    { id: 2, name: "Karen Foster", email: "karen@apexholdings.com", role: "Manager", status: "Active", lastActive: "1 week ago" },
    { id: 3, name: "Ben Taylor", email: "ben@apexholdings.com", role: "Member", status: "Active", lastActive: "1 week ago" },
    { id: 4, name: "Laura Mills", email: "laura@apexholdings.com", role: "Member", status: "Active", lastActive: "2 weeks ago" },
    { id: 5, name: "Chris Dunn", email: "chris@apexholdings.com", role: "Member", status: "Active", lastActive: "2 weeks ago" },
    { id: 6, name: "Megan Price", email: "megan@apexholdings.com", role: "Member", status: "Invited", lastActive: "—" },
  ],
  6: [
    { id: 1, name: "Diana Ross", email: "diana@meridianpartners.com", role: "Admin", status: "Active", lastActive: "Today" },
    { id: 2, name: "Frank Miller", email: "frank@meridianpartners.com", role: "Manager", status: "Active", lastActive: "Today" },
    { id: 3, name: "Grace Huang", email: "grace@meridianpartners.com", role: "Manager", status: "Active", lastActive: "Yesterday" },
    { id: 4, name: "Henry Clark", email: "henry@meridianpartners.com", role: "Manager", status: "Active", lastActive: "Today" },
    { id: 5, name: "Irene Santos", email: "irene@meridianpartners.com", role: "Member", status: "Active", lastActive: "2 days ago" },
    { id: 6, name: "Jack Robinson", email: "jack@meridianpartners.com", role: "Member", status: "Active", lastActive: "Today" },
    { id: 7, name: "Kelly Adams", email: "kelly@meridianpartners.com", role: "Member", status: "Active", lastActive: "Yesterday" },
    { id: 8, name: "Liam O'Connor", email: "liam@meridianpartners.com", role: "Member", status: "Active", lastActive: "Today" },
    { id: 9, name: "Monica Perez", email: "monica@meridianpartners.com", role: "Member", status: "Active", lastActive: "3 days ago" },
    { id: 10, name: "Nick Anderson", email: "nick@meridianpartners.com", role: "Member", status: "Active", lastActive: "Yesterday" },
    { id: 11, name: "Olivia Baker", email: "olivia@meridianpartners.com", role: "Member", status: "Active", lastActive: "Today" },
    { id: 12, name: "Paul Young", email: "paul@meridianpartners.com", role: "Member", status: "Active", lastActive: "2 days ago" },
    { id: 13, name: "Quinn Walker", email: "quinn@meridianpartners.com", role: "Member", status: "Active", lastActive: "4 days ago" },
    { id: 14, name: "Ruth Evans", email: "ruth@meridianpartners.com", role: "Member", status: "Active", lastActive: "Today" },
    { id: 15, name: "Sam Harris", email: "sam@meridianpartners.com", role: "Member", status: "Active", lastActive: "Yesterday" },
    { id: 16, name: "Tina Liu", email: "tina@meridianpartners.com", role: "Member", status: "Active", lastActive: "Today" },
    { id: 17, name: "Uma Krishnan", email: "uma@meridianpartners.com", role: "Member", status: "Invited", lastActive: "—" },
    { id: 18, name: "Victor Dang", email: "victor@meridianpartners.com", role: "Member", status: "Invited", lastActive: "—" },
    { id: 19, name: "Wendy Brooks", email: "wendy@meridianpartners.com", role: "Member", status: "Active", lastActive: "3 days ago" },
    { id: 20, name: "Xavier Ruiz", email: "xavier@meridianpartners.com", role: "Member", status: "Invited", lastActive: "—" },
  ],
  7: [
    { id: 1, name: "Ryan Patel", email: "ryan@catalystinc.org", role: "Admin", status: "Active", lastActive: "Today" },
    { id: 2, name: "Emma Wilson", email: "emma@catalystinc.org", role: "Manager", status: "Active", lastActive: "Yesterday" },
    { id: 3, name: "Carlos Mendez", email: "carlos@catalystinc.org", role: "Member", status: "Active", lastActive: "3 days ago" },
  ],
  8: [
    { id: 1, name: "Emily Thornton", email: "emily@pinnacleventures.com", role: "Admin", status: "Active", lastActive: "Today" },
    { id: 2, name: "Andrew Cole", email: "andrew@pinnacleventures.com", role: "Manager", status: "Active", lastActive: "Today" },
    { id: 3, name: "Beth Harper", email: "beth@pinnacleventures.com", role: "Member", status: "Active", lastActive: "Yesterday" },
    { id: 4, name: "Cameron Drake", email: "cameron@pinnacleventures.com", role: "Member", status: "Active", lastActive: "2 days ago" },
    { id: 5, name: "Diane Foster", email: "diane@pinnacleventures.com", role: "Member", status: "Active", lastActive: "Today" },
    { id: 6, name: "Evan Garcia", email: "evan@pinnacleventures.com", role: "Member", status: "Active", lastActive: "3 days ago" },
    { id: 7, name: "Fiona Nash", email: "fiona@pinnacleventures.com", role: "Member", status: "Invited", lastActive: "—" },
  ],
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Change #6: compute relative tenure string */
function getRelativeDuration(isoDate: string): string {
  const now = new Date("2026-03-04"); // today per spec
  const joined = new Date(isoDate);
  const diffMs = now.getTime() - joined.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(totalDays / 30.44);
  if (months < 1) return `${totalDays} days`;
  if (months === 1) return "1 month";
  if (months < 12) return `${months} months`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${years} year${years > 1 ? "s" : ""}`;
  return `${years}y ${rem}mo`;
}

function getScoreColor(score: number) {
  if (score >= 90) return "text-green-600";
  if (score >= 80) return "text-foreground";
  if (score >= 70) return "text-amber-600";
  return "text-red-600";
}

function TrendIndicator({ trend, change }: { trend: "up" | "down" | "stable"; change: number }) {
  if (trend === "up") {
    return (
      <span className="inline-flex items-center gap-0.5 text-green-600" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>
        <TrendingUp className="size-3" /> +{change}pp
      </span>
    );
  }
  if (trend === "down") {
    return (
      <span className="inline-flex items-center gap-0.5 text-red-500" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>
        <TrendingDown className="size-3" /> {change}pp
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 text-muted-foreground" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>
      <Minus className="size-3" /> Stable
    </span>
  );
}

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

  const quality = ORG_QUALITY[org.id];
  const campaigns = ORG_CAMPAIGNS[org.id] ?? [];
  const events = ORG_EVENTS[org.id] ?? [];
  const team = ORG_TEAM[org.id] ?? [];

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
            {/* Change #3: Industry label in header */}
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1.5 text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
                <Briefcase className="size-3.5" />
                {org.industry}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
                {org.location}
              </span>
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
          {/* Quick stats — change #4: includes DQ Score */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Data Quality — Primary KPI */}
            {quality && (
              <Card className="gap-0 border-[#7D152D]/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="flex items-center justify-center size-9 rounded-md bg-[#7D152D]/10">
                    <Activity className="size-4 text-[#7D152D]" />
                  </div>
                  <div>
                    <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                      Data Quality
                    </p>
                    <div className="flex items-center gap-2">
                      <p className={`tabular-nums ${getScoreColor(quality.overall)}`} style={{ fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.2 }}>
                        {quality.overall}%
                      </p>
                      <TrendIndicator trend={quality.trend} change={quality.change} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            <StatMini icon={CalendarDays} label="Events" value={String(org.events)} />
            <StatMini icon={Users} label="Members" value={String(org.members)} />
            <StatMini icon={Megaphone} label="Campaigns" value={String(org.campaigns)} />
            <StatMini icon={Activity} label="Plan" value={org.plan} />
          </div>

          {/* Contact info — change #6: relative duration on Joined */}
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
                <InfoRow
                  icon={CalendarDays}
                  label="Joined"
                  value={`${org.joined} · ${getRelativeDuration(org.joinedISO)}`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---- CAMPAIGNS — change #5: per-org data ---- */}
        <TabsContent value="campaigns" className="mt-5 space-y-4">
          <Card className="gap-0">
            <CardHeader className="px-5 pt-5 pb-4">
              <CardTitle style={{ fontSize: "1rem", fontWeight: 600 }}>
                Campaigns
              </CardTitle>
              <CardDescription style={{ fontSize: "0.8125rem" }}>
                {campaigns.length} campaign{campaigns.length !== 1 ? "s" : ""} for {org.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {campaigns.length === 0 ? (
                <div className="px-5 py-12 text-center">
                  <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>No campaigns yet.</p>
                </div>
              ) : (
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
                      {campaigns.map((c) => (
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---- EVENTS — change #5: per-org data ---- */}
        <TabsContent value="events" className="mt-5 space-y-4">
          <Card className="gap-0">
            <CardHeader className="px-5 pt-5 pb-4">
              <CardTitle style={{ fontSize: "1rem", fontWeight: 600 }}>
                Events
              </CardTitle>
              <CardDescription style={{ fontSize: "0.8125rem" }}>
                {events.length} recent event{events.length !== 1 ? "s" : ""} for {org.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {events.length === 0 ? (
                <div className="px-5 py-12 text-center">
                  <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>No events yet.</p>
                </div>
              ) : (
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
                      {events.map((ev) => (
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---- TEAM — change #5: per-org data ---- */}
        <TabsContent value="team" className="mt-5 space-y-4">
          <Card className="gap-0">
            <CardHeader className="px-5 pt-5 pb-4">
              <CardTitle style={{ fontSize: "1rem", fontWeight: 600 }}>
                Team Members
              </CardTitle>
              <CardDescription style={{ fontSize: "0.8125rem" }}>
                {team.length} member{team.length !== 1 ? "s" : ""} in {org.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {team.length === 0 ? (
                <div className="px-5 py-12 text-center">
                  <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>No team members yet.</p>
                </div>
              ) : (
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
                      {team.map((m) => (
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
              )}
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
