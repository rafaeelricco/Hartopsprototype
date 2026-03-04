// =============================================================================
// Mock data for Settings page — Profile, Team, Notifications, Preferences,
// and Integrations. All state is client-side only.
// =============================================================================

// ── Current user profile ────────────────────────────────────────────────────

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl: string;
  timezone: string;
  company: string;
}

export const CURRENT_USER: UserProfile = {
  firstName: "Jane",
  lastName: "Smith",
  email: "jane@hartagency.com",
  phone: "+1 (512) 555-0147",
  role: "Operating Staff",
  avatarUrl:
    "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyNTcxMDg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  timezone: "America/Chicago",
  company: "Hart Agency",
};

// ── Team members ────────────────────────────────────────────────────────────

export type TeamRole = "Admin" | "Operating Staff" | "Field Educator" | "Viewer";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: "active" | "invited" | "deactivated";
  lastActive: string;
  initials: string;
  color: string;
}

export const TEAM_ROLES: TeamRole[] = ["Admin", "Operating Staff", "Field Educator", "Viewer"];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: "tm-1",
    name: "Jane Smith",
    email: "jane@hartagency.com",
    role: "Operating Staff",
    status: "active",
    lastActive: "2026-03-04T09:15:00Z",
    initials: "JS",
    color: "#7D152D",
  },
  {
    id: "tm-2",
    name: "Marcus Chen",
    email: "m.chen@hartagency.com",
    role: "Admin",
    status: "active",
    lastActive: "2026-03-04T08:42:00Z",
    initials: "MC",
    color: "#0F766E",
  },
  {
    id: "tm-3",
    name: "Aisha Johnson",
    email: "aisha.j@hartagency.com",
    role: "Field Educator",
    status: "active",
    lastActive: "2026-03-03T17:20:00Z",
    initials: "AJ",
    color: "#7C3AED",
  },
  {
    id: "tm-4",
    name: "Carlos Rivera",
    email: "c.rivera@hartagency.com",
    role: "Field Educator",
    status: "active",
    lastActive: "2026-03-03T14:05:00Z",
    initials: "CR",
    color: "#D97706",
  },
  {
    id: "tm-5",
    name: "Emily Park",
    email: "emily.p@hartagency.com",
    role: "Operating Staff",
    status: "invited",
    lastActive: "",
    initials: "EP",
    color: "#2563EB",
  },
  {
    id: "tm-6",
    name: "David Okafor",
    email: "d.okafor@hartagency.com",
    role: "Viewer",
    status: "active",
    lastActive: "2026-03-02T11:30:00Z",
    initials: "DO",
    color: "#64748B",
  },
  {
    id: "tm-7",
    name: "Sophia Martinez",
    email: "sophia.m@hartagency.com",
    role: "Field Educator",
    status: "deactivated",
    lastActive: "2026-01-15T09:00:00Z",
    initials: "SM",
    color: "#94A3B8",
  },
];

// ── Notification preferences ────────────────────────────────────────────────

export interface NotificationPref {
  id: string;
  label: string;
  description: string;
  category: string;
  email: boolean;
  push: boolean;
  inApp: boolean;
}

export const INITIAL_NOTIFICATIONS: NotificationPref[] = [
  {
    id: "notif-1",
    label: "Campaign status changes",
    description: "When a campaign is activated, paused, or completed",
    category: "Campaigns",
    email: true,
    push: true,
    inApp: true,
  },
  {
    id: "notif-2",
    label: "New event created",
    description: "When a team member creates a new event under your campaigns",
    category: "Campaigns",
    email: false,
    push: true,
    inApp: true,
  },
  {
    id: "notif-3",
    label: "Event phase transitions",
    description: "When an event moves from draft to scheduled, active, or completed",
    category: "Events",
    email: true,
    push: true,
    inApp: true,
  },
  {
    id: "notif-4",
    label: "Live event alerts",
    description: "Real-time updates during active events (check-ins, milestones)",
    category: "Events",
    email: false,
    push: true,
    inApp: true,
  },
  {
    id: "notif-5",
    label: "Weekly performance digest",
    description: "Summary of campaign metrics delivered every Monday",
    category: "Reports",
    email: true,
    push: false,
    inApp: false,
  },
  {
    id: "notif-6",
    label: "Export completed",
    description: "When a PDF or CSV report export finishes processing",
    category: "Reports",
    email: true,
    push: false,
    inApp: true,
  },
  {
    id: "notif-7",
    label: "SKU changes",
    description: "When products are added, edited, or removed from the library",
    category: "Brand Assets",
    email: false,
    push: false,
    inApp: true,
  },
  {
    id: "notif-8",
    label: "FAQ push confirmations",
    description: "When FAQs are successfully pushed to field educator teams",
    category: "Brand Assets",
    email: true,
    push: true,
    inApp: true,
  },
  {
    id: "notif-9",
    label: "Team member invitations",
    description: "When someone joins or is invited to your team",
    category: "Team",
    email: true,
    push: false,
    inApp: true,
  },
  {
    id: "notif-10",
    label: "Security alerts",
    description: "Login from a new device or password changes",
    category: "Team",
    email: true,
    push: true,
    inApp: true,
  },
];

// ── Integrations ────────────────────────────────────────────────────────────

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji or text glyph
  connected: boolean;
  lastSync: string | null;
  category: string;
}

export const INITIAL_INTEGRATIONS: Integration[] = [
  {
    id: "int-1",
    name: "Educator Mobile App",
    description: "Push FAQs and event assignments to the field educator app",
    icon: "📱",
    connected: true,
    lastSync: "2026-03-04T08:00:00Z",
    category: "Field Teams",
  },
  {
    id: "int-2",
    name: "AI Auto Upload Engine",
    description: "ML-powered product data extraction for SKU imports",
    icon: "🤖",
    connected: true,
    lastSync: "2026-03-02T14:30:00Z",
    category: "Automation",
  },
  {
    id: "int-3",
    name: "Salesforce CRM",
    description: "Sync campaign data and consumer insights to Salesforce",
    icon: "☁️",
    connected: true,
    lastSync: "2026-03-03T22:00:00Z",
    category: "CRM",
  },
  {
    id: "int-4",
    name: "Google Sheets",
    description: "Auto-export report data to shared Google Sheets",
    icon: "📊",
    connected: false,
    lastSync: null,
    category: "Reporting",
  },
  {
    id: "int-5",
    name: "Slack Notifications",
    description: "Send event alerts and campaign updates to Slack channels",
    icon: "💬",
    connected: false,
    lastSync: null,
    category: "Communication",
  },
  {
    id: "int-6",
    name: "Zapier",
    description: "Connect Hart Agency workflows to 5,000+ apps",
    icon: "⚡",
    connected: false,
    lastSync: null,
    category: "Automation",
  },
];

// ── Preferences (defaults) ──────────────────────────────────────────────────

export const TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Phoenix",
  "Pacific/Honolulu",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Tokyo",
] as const;

export const DATE_FORMATS = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"] as const;
export const DASHBOARD_DEFAULTS = ["Last 30 days", "Last 3 months", "Last 6 months", "Last 12 months"] as const;
