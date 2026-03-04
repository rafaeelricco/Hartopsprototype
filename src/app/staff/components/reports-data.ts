// =============================================================================
// Mock data for MM-UI-005 Reports & Analytics.
// Derived from campaign / event data to keep numbers realistic.
// Supports scoped aggregation by date range (change #1, #8).
// =============================================================================

export type ReportScope = "all" | "30d" | "3m" | "6m";

export const REPORT_SCOPES: { value: ReportScope; label: string }[] = [
  { value: "all", label: "All Time" },
  { value: "30d", label: "Last 30 Days" },
  { value: "3m", label: "3 Months" },
  { value: "6m", label: "6 Months" },
];

// ── Campaign Metrics ────────────────────────────────────────────────────────

export interface CampaignMetrics {
  campaignId: string;
  campaignName: string;
  status: string;
  events: number;
  samples: number;
  consumerReach: number;
  totalSales: number;
  conversionRate: number;
  avgEngagement: number;
  socialMentions: number;
  photoCount: number;
}

export const CAMPAIGN_METRICS: CampaignMetrics[] = [
  {
    campaignId: "camp-1",
    campaignName: "Summer Seltzer Launch",
    status: "active",
    events: 18,
    samples: 8_420,
    consumerReach: 62_340,
    totalSales: 18_750,
    conversionRate: 34,
    avgEngagement: 8.4,
    socialMentions: 247,
    photoCount: 86,
  },
  {
    campaignId: "camp-2",
    campaignName: "Q1 Retail Activation",
    status: "active",
    events: 24,
    samples: 6_120,
    consumerReach: 41_890,
    totalSales: 12_480,
    conversionRate: 28,
    avgEngagement: 7.2,
    socialMentions: 134,
    photoCount: 112,
  },
  {
    campaignId: "camp-3",
    campaignName: "Music Festival Sponsorship",
    status: "active",
    events: 6,
    samples: 3_940,
    consumerReach: 38_750,
    totalSales: 6_280,
    conversionRate: 22,
    avgEngagement: 9.1,
    socialMentions: 412,
    photoCount: 64,
  },
  {
    campaignId: "camp-4",
    campaignName: "Holiday Gift Pack Promo",
    status: "completed",
    events: 32,
    samples: 11_280,
    consumerReach: 84_610,
    totalSales: 34_220,
    conversionRate: 41,
    avgEngagement: 7.8,
    socialMentions: 189,
    photoCount: 148,
  },
  {
    campaignId: "camp-5",
    campaignName: "Campus Ambassador Program",
    status: "active",
    events: 12,
    samples: 2_640,
    consumerReach: 19_480,
    totalSales: 4_120,
    conversionRate: 18,
    avgEngagement: 8.9,
    socialMentions: 326,
    photoCount: 52,
  },
  {
    campaignId: "camp-7",
    campaignName: "NFL Tailgate Series",
    status: "completed",
    events: 16,
    samples: 9_870,
    consumerReach: 72_150,
    totalSales: 28_940,
    conversionRate: 38,
    avgEngagement: 8.1,
    socialMentions: 548,
    photoCount: 94,
  },
  {
    campaignId: "camp-8",
    campaignName: "Craft Cocktail Roadshow",
    status: "active",
    events: 9,
    samples: 1_890,
    consumerReach: 14_260,
    totalSales: 7_830,
    conversionRate: 31,
    avgEngagement: 9.3,
    socialMentions: 178,
    photoCount: 48,
  },
];

// ── Quick Stats — scope-aware aggregation ───────────────────────────────────
// Multipliers simulate how narrower windows yield fewer totals.

const SCOPE_MULTIPLIERS: Record<ReportScope, number> = {
  all: 1,
  "6m": 0.72,
  "3m": 0.41,
  "30d": 0.14,
};

export interface QuickStatsResult {
  samples: number;
  consumerReach: number;
  totalSales: number;
  events: number;
  socialMentions: number;
  photoCount: number;
  // Deltas vs prior period (for the hero cards)
  samplesDelta: number;
  reachDelta: number;
  salesDelta: number;
}

export function getQuickStats(scope: ReportScope = "all"): QuickStatsResult {
  const m = SCOPE_MULTIPLIERS[scope];
  const totals = CAMPAIGN_METRICS.reduce(
    (acc, c) => ({
      samples: acc.samples + c.samples,
      consumerReach: acc.consumerReach + c.consumerReach,
      totalSales: acc.totalSales + c.totalSales,
      events: acc.events + c.events,
      socialMentions: acc.socialMentions + c.socialMentions,
      photoCount: acc.photoCount + c.photoCount,
    }),
    {
      samples: 0,
      consumerReach: 0,
      totalSales: 0,
      events: 0,
      socialMentions: 0,
      photoCount: 0,
    },
  );

  return {
    samples: Math.round(totals.samples * m),
    consumerReach: Math.round(totals.consumerReach * m),
    totalSales: Math.round(totals.totalSales * m),
    events: Math.round(totals.events * m),
    socialMentions: Math.round(totals.socialMentions * m),
    photoCount: Math.round(totals.photoCount * m),
    samplesDelta:
      scope === "all"
        ? 18.7
        : scope === "6m"
          ? 24.3
          : scope === "3m"
            ? 12.5
            : 8.2,
    reachDelta:
      scope === "all"
        ? 22.1
        : scope === "6m"
          ? 19.6
          : scope === "3m"
            ? 11.4
            : 6.8,
    salesDelta:
      scope === "all"
        ? 28.9
        : scope === "6m"
          ? 35.1
          : scope === "3m"
            ? 15.3
            : 10.4,
  };
}

// ── Top 3 campaign IDs by total sales — used as the default comparison set ──

export const DEFAULT_COMPARISON_IDS: string[] = CAMPAIGN_METRICS.slice()
  .sort((a, b) => b.totalSales - a.totalSales)
  .slice(0, 3)
  .map((c) => c.campaignId);

// ── Photo Proof Gallery mock data ───────────────────────────────────────────

export interface ProofPhoto {
  id: string;
  url: string;
  eventName: string;
  eventId: string;
  campaignId: string;
  campaignName: string;
  location: string;
  date: string;
  caption: string;
}

export const PROOF_PHOTOS: ProofPhoto[] = [
  {
    id: "photo-1",
    url: "https://images.unsplash.com/photo-1595509449541-0a4f447157be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXZlcmFnZSUyMHNhbXBsaW5nJTIwcmV0YWlsJTIwc3RvcmUlMjBldmVudHxlbnwxfHx8fDE3NzI2NDk1MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    eventName: "Downtown Chicago Sampling",
    eventId: "evt-1",
    campaignId: "camp-1",
    campaignName: "Summer Seltzer Launch",
    location: "Binny's Beverage Depot, Chicago IL",
    date: "2026-02-15",
    caption: "In-store sampling station with branded display",
  },
  {
    id: "photo-2",
    url: "https://images.unsplash.com/photo-1758165532022-a68f291317ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwYmFyJTIwZXZlbmluZyUyMGNvY2t0YWlsJTIwcGFydHl8ZW58MXx8fHwxNzcyNjQ5NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    eventName: "NYC Speakeasy Night",
    eventId: "evt-10",
    campaignId: "camp-8",
    campaignName: "Craft Cocktail Roadshow",
    location: "Please Don't Tell, New York NY",
    date: "2026-02-20",
    caption: "Rooftop cocktail activation — brand ambassador engagement",
  },
  {
    id: "photo-3",
    url: "https://images.unsplash.com/photo-1573463908761-567b9356c64f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwY3Jvd2QlMjBvdXRkb29yJTIwc3RhZ2V8ZW58MXx8fHwxNzcyNjQzOTM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    eventName: "Coachella Brand Booth",
    eventId: "evt-6",
    campaignId: "camp-3",
    campaignName: "Music Festival Sponsorship",
    location: "Empire Polo Club, Indio CA",
    date: "2026-04-10",
    caption: "Festival crowd at main stage — brand booth in background",
  },
  {
    id: "photo-4",
    url: "https://images.unsplash.com/photo-1633111158093-c51d43175b77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwZXZlbnQlMjBhY3RpdmF0aW9ufGVufDF8fHx8MTc3MjY0OTUyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    eventName: "UCLA Welcome Week Activation",
    eventId: "evt-8",
    campaignId: "camp-5",
    campaignName: "Campus Ambassador Program",
    location: "UCLA Campus, Los Angeles CA",
    date: "2026-03-25",
    caption: "Campus quad activation with brand ambassador team",
  },
  {
    id: "photo-5",
    url: "https://images.unsplash.com/photo-1719854941469-9e744df5922e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwdGFzdGluZyUyMGJyZXdlcnklMjBldmVudCUyMGNyb3dkfGVufDF8fHx8MTc3MjY0OTUyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    eventName: "Brooklyn Brewery Tasting",
    eventId: "evt-12",
    campaignId: "camp-1",
    campaignName: "Summer Seltzer Launch",
    location: "Brooklyn Brewery, Brooklyn NY",
    date: "2026-03-07",
    caption: "Brewery tasting event — high foot traffic on opening hour",
  },
  {
    id: "photo-6",
    url: "https://images.unsplash.com/photo-1767009530606-8d597e86a2e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3AlMjB1cCUyMGJyYW5kJTIwZXhwZXJpZW5jZSUyMG91dGRvb3J8ZW58MXx8fHwxNzcyNjQ5NTIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    eventName: "Miami Beach Pop-Up",
    eventId: "evt-2",
    campaignId: "camp-1",
    campaignName: "Summer Seltzer Launch",
    location: "South Beach Boardwalk, Miami FL",
    date: "2026-03-01",
    caption: "Outdoor pop-up experience on the boardwalk",
  },
  {
    id: "photo-7",
    url: "https://images.unsplash.com/photo-1758526348379-6e8a84ae9f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGJhciUyMG1peG9sb2d5JTIwZXZlbnR8ZW58MXx8fHwxNzcyNjQ5NTE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    eventName: "LA Rooftop Mixology",
    eventId: "evt-11",
    campaignId: "camp-8",
    campaignName: "Craft Cocktail Roadshow",
    location: "The Highlight Room, Los Angeles CA",
    date: "2026-03-10",
    caption: "Mixology demonstration with signature cocktails",
  },
  {
    id: "photo-8",
    url: "https://images.unsplash.com/photo-1762088206695-5cae70780ced?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3RvcmUlMjBwcm9tb3Rpb25hbCUyMGRpc3BsYXl8ZW58MXx8fHwxNzcyNjQ5NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    eventName: "Whole Foods Tasting — SF",
    eventId: "evt-4",
    campaignId: "camp-2",
    campaignName: "Q1 Retail Activation",
    location: "Whole Foods Market, San Francisco CA",
    date: "2026-01-20",
    caption: "Retail display setup with sampling station",
  },
  {
    id: "photo-9",
    url: "https://images.unsplash.com/photo-1615484966964-128d59b61ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWlsZ2F0ZSUyMGZvb3RiYWxsJTIwc3RhZGl1bSUyMGZvb2QlMjBzYW1wbGluZ3xlbnwxfHx8fDE3NzI2NDk1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    eventName: "NFL Tailgate Series",
    eventId: "evt-nfl-1",
    campaignId: "camp-7",
    campaignName: "NFL Tailgate Series",
    location: "MetLife Stadium, East Rutherford NJ",
    date: "2025-10-12",
    caption: "Tailgate activation — branded tent and sampling",
  },
  {
    id: "photo-10",
    url: "https://images.unsplash.com/photo-1473444594556-6c20ae662bd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGJvYXJkd2FsayUyMHN1bW1lciUyMGZvb2QlMjB2ZW5kb3J8ZW58MXx8fHwxNzcyNjQ5NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    eventName: "San Diego Waterfront Sampling",
    eventId: "evt-14",
    campaignId: "camp-1",
    campaignName: "Summer Seltzer Launch",
    location: "Seaport Village, San Diego CA",
    date: "2026-03-08",
    caption: "Waterfront sampling with beach boardwalk visibility",
  },
  {
    id: "photo-11",
    url: "https://images.unsplash.com/photo-1770453572726-f51592710ca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmluayUyMHRhc3RpbmclMjBldmVudCUyMHBlb3BsZXxlbnwxfHx8fDE3NzI2NDk1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    eventName: "Total Wine Demo — Denver",
    eventId: "evt-5",
    campaignId: "camp-2",
    campaignName: "Q1 Retail Activation",
    location: "Total Wine & More, Denver CO",
    date: "2026-02-14",
    caption: "Product demonstration at the tasting counter",
  },
];

// ── Unique events appearing in the gallery (for event-level filter) ─────────

export function getGalleryEvents(): { eventId: string; eventName: string }[] {
  const map = new Map<string, string>();
  PROOF_PHOTOS.forEach((p) => map.set(p.eventId, p.eventName));
  return Array.from(map.entries()).map(([eventId, eventName]) => ({
    eventId,
    eventName,
  }));
}

// ── Monthly trend data — scope-aware slicing ────────────────────────────────

export interface TrendPoint {
  month: string;
  samples: number;
  reach: number;
  sales: number;
}

const ALL_MONTHLY_TRENDS: TrendPoint[] = [
  { month: "Apr '25", samples: 2_140, reach: 15_800, sales: 5_420 },
  { month: "May '25", samples: 2_810, reach: 20_300, sales: 7_110 },
  { month: "Jun '25", samples: 3_190, reach: 23_600, sales: 7_890 },
  { month: "Jul '25", samples: 3_410, reach: 25_100, sales: 8_540 },
  { month: "Aug '25", samples: 3_620, reach: 26_900, sales: 8_960 },
  { month: "Sep '25", samples: 3_820, reach: 28_400, sales: 9_120 },
  { month: "Oct '25", samples: 5_640, reach: 41_200, sales: 14_780 },
  { month: "Nov '25", samples: 7_210, reach: 54_900, sales: 21_340 },
  { month: "Dec '25", samples: 4_890, reach: 36_100, sales: 15_630 },
  { month: "Jan '26", samples: 6_340, reach: 48_600, sales: 18_920 },
  { month: "Feb '26", samples: 8_120, reach: 59_800, sales: 24_310 },
  { month: "Mar '26", samples: 8_140, reach: 64_480, sales: 28_530 },
];

const SCOPE_MONTH_COUNT: Record<ReportScope, number> = {
  all: 12,
  "6m": 7,
  "3m": 4,
  "30d": 2, // show last 2 for any visible chart
};

export function getTrendData(scope: ReportScope): TrendPoint[] {
  const count = SCOPE_MONTH_COUNT[scope];
  return ALL_MONTHLY_TRENDS.slice(-count);
}
