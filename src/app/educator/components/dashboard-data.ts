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
