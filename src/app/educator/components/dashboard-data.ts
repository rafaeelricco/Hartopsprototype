// Dashboard data for Educator Manager
// Scoped to the manager's assigned educators and events only

export interface DashboardStat {
  label: string;
  value: number;
  description: string;
  href: string;
  trend?: { value: number; label: string };
}

export interface UpcomingEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  educator: string | null;
  status: "Upcoming" | "Live" | "Completed";
  requiresAttention: boolean;
  attentionReason?: string;
}

export interface TopEducator {
  name: string;
  eventsThisMonth: number;
  avgRating: number;
  trend: "up" | "down";
}

export const dashboardStats: DashboardStat[] = [
  {
    label: "Total Events This Week",
    value: 12,
    description: "Events scheduled across your assigned educators",
    href: "/educator/events",
    trend: { value: 8, label: "vs last week" },
  },
  {
    label: "Active Events Now",
    value: 2,
    description: "Events currently in progress",
    href: "/educator/events?filter=live",
    trend: { value: 0, label: "steady" },
  },
  {
    label: "Events Requiring Attention",
    value: 5,
    description: "Events needing staffing, review, or action",
    href: "/educator/events?filter=attention",
    trend: { value: -2, label: "vs yesterday" },
  },
];

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: "evt-101",
    name: "Absolut Vodka Tasting — Whole Foods Market",
    date: "2026-03-20",
    time: "2:00 PM – 6:00 PM",
    venue: "Whole Foods Market, SoHo",
    educator: null,
    status: "Upcoming",
    requiresAttention: true,
    attentionReason: "No educator assigned",
  },
  {
    id: "evt-102",
    name: "Jameson Whiskey Promo — Total Wine",
    date: "2026-03-20",
    time: "4:00 PM – 8:00 PM",
    venue: "Total Wine & More, Jersey City",
    educator: "Sarah Chen",
    status: "Live",
    requiresAttention: false,
  },
  {
    id: "evt-103",
    name: "Malibu Rum Summer Launch — BevMo",
    date: "2026-03-19",
    time: "12:00 PM – 4:00 PM",
    venue: "BevMo!, Hoboken",
    educator: "James Rodriguez",
    status: "Completed",
    requiresAttention: true,
    attentionReason: "Awaiting finalization",
  },
  {
    id: "evt-104",
    name: "Kahlúa Coffee Cocktails — Trader Joe's",
    date: "2026-03-21",
    time: "11:00 AM – 3:00 PM",
    venue: "Trader Joe's, Williamsburg",
    educator: null,
    status: "Upcoming",
    requiresAttention: true,
    attentionReason: "No educator assigned",
  },
  {
    id: "evt-105",
    name: "Beefeater Gin Activation — Costco",
    date: "2026-03-21",
    time: "1:00 PM – 5:00 PM",
    venue: "Costco, Hackensack",
    educator: "Maria Santos",
    status: "Upcoming",
    requiresAttention: false,
  },
  {
    id: "evt-106",
    name: "Glenlivet Scotch Showcase — Wine.com Pop-up",
    date: "2026-03-18",
    time: "3:00 PM – 7:00 PM",
    venue: "Wine.com Pop-up, Chelsea",
    educator: "David Kim",
    status: "Completed",
    requiresAttention: true,
    attentionReason: "Awaiting finalization",
  },
  {
    id: "evt-107",
    name: "Absolut Elyx Premium — Astor Wines",
    date: "2026-03-20",
    time: "5:00 PM – 9:00 PM",
    venue: "Astor Wines & Spirits, NoHo",
    educator: "Emily Park",
    status: "Live",
    requiresAttention: false,
  },
  {
    id: "evt-108",
    name: "Avión Tequila Launch — Spec's",
    date: "2026-03-22",
    time: "2:00 PM – 6:00 PM",
    venue: "Spec's Wines, Union Square",
    educator: "Carlos Mendez",
    status: "Upcoming",
    requiresAttention: false,
  },
];

export const attentionEvents = upcomingEvents.filter(
  (e) => e.requiresAttention,
);

// Weekly activity chart data (events per day this week)
export const weeklyActivity = [
  { day: "Mon", count: 3 },
  { day: "Tue", count: 5 },
  { day: "Wed", count: 4 },
  { day: "Thu", count: 6 },
  { day: "Fri", count: 7 },
  { day: "Sat", count: 2 },
  { day: "Sun", count: 1 },
];

// Monthly event trend (last 6 months)
export const eventsTrend = [
  { month: "Oct", events: 28 },
  { month: "Nov", events: 35 },
  { month: "Dec", events: 22 },
  { month: "Jan", events: 41 },
  { month: "Feb", events: 38 },
  { month: "Mar", events: 47 },
];

// Top educators by performance
export const topEducators: TopEducator[] = [
  { name: "Sarah Chen", eventsThisMonth: 14, avgRating: 4.9, trend: "up" },
  { name: "Emily Park", eventsThisMonth: 12, avgRating: 4.8, trend: "up" },
  { name: "Carlos Mendez", eventsThisMonth: 11, avgRating: 4.7, trend: "up" },
  {
    name: "James Rodriguez",
    eventsThisMonth: 9,
    avgRating: 4.5,
    trend: "down",
  },
  { name: "Maria Santos", eventsThisMonth: 8, avgRating: 4.4, trend: "down" },
];
