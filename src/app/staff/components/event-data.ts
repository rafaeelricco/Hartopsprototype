// =============================================================================
// Event data types, objectives, data-module mappings, and mock events
// for MM-UI-003 Event Creation Workflow.
// =============================================================================

export interface EventItem {
  id: string;
  campaignId: string;
  name: string;
  location: string;
  date: string;
  duration: string;
  venueType: "off-premises" | "on-premises" | "special";
  objectives: string[];
  dataModules: string[];
  advancedModules: string[];
  status: "draft" | "scheduled" | "active" | "completed";
  createdAt: string;
}

// ── Step 1 ──────────────────────────────────────────────────────────────────

export const VENUE_TYPES = [
  { value: "off-premises" as const, label: "Off-Premises", description: "Retail stores, grocery, liquor shops" },
  { value: "on-premises" as const, label: "On-Premises", description: "Bars, restaurants, venues" },
  { value: "special" as const, label: "Special", description: "Festivals, pop-ups, private events" },
];

export const DURATION_OPTIONS = [
  "1 hour",
  "2 hours",
  "3 hours",
  "4 hours",
  "Half day (5h)",
  "Full day (8h)",
];

// ── Step 2: Objectives ──────────────────────────────────────────────────────

export interface Objective {
  id: string;
  label: string;
  description: string;
}

export const OBJECTIVES: Objective[] = [
  { id: "brand-awareness", label: "Brand Awareness", description: "Measure and increase brand visibility at the event location" },
  { id: "drive-sales", label: "Drive Sales", description: "Track sales volume, conversions, and revenue generated" },
  { id: "competitive-intel", label: "Competitive Intel", description: "Monitor competitor presence, pricing, and market positioning" },
  { id: "consumer-engagement", label: "Consumer Engagement", description: "Capture interaction quality, feedback, and social mentions" },
  { id: "product-education", label: "Product Education", description: "Assess knowledge transfer and training completion rates" },
  { id: "market-research", label: "Market Research", description: "Collect surveys, demographics, and trend data" },
];

// ── Step 3: Objective → Data Module mapping ─────────────────────────────────

export interface DataModule {
  id: string;
  label: string;
  description: string;
  sampleValue?: string;
  sampleType?: "score" | "number" | "percent" | "currency" | "text" | "list";
}

export const OBJECTIVE_MODULE_MAP: Record<string, DataModule[]> = {
  "brand-awareness": [
    { id: "brand-visibility", label: "Brand Visibility Score", description: "Aggregate visibility rating based on placement and signage", sampleValue: "8.4", sampleType: "score" },
    { id: "impressions", label: "Impressions Tracker", description: "Estimated foot traffic and eyeball count", sampleValue: "2,340", sampleType: "number" },
    { id: "photo-docs", label: "Photo Documentation", description: "Geo-tagged event photos with timestamps", sampleValue: "12 photos", sampleType: "text" },
  ],
  "drive-sales": [
    { id: "sales-volume", label: "Sales Volume Tracker", description: "Units sold by SKU during the event", sampleValue: "187", sampleType: "number" },
    { id: "conversion-metrics", label: "Conversion Metrics", description: "Sample-to-purchase conversion rates", sampleValue: "34%", sampleType: "percent" },
    { id: "revenue-summary", label: "Revenue Summary", description: "Total revenue and average transaction value", sampleValue: "$4,280", sampleType: "currency" },
  ],
  "competitive-intel": [
    { id: "competitor-log", label: "Competitor Presence Log", description: "Competitor brands and activities observed", sampleValue: "4 brands", sampleType: "text" },
    { id: "price-matrix", label: "Price Comparison Matrix", description: "Side-by-side pricing for key SKUs", sampleValue: "6 SKUs", sampleType: "text" },
    { id: "market-share-notes", label: "Market Share Notes", description: "Qualitative observations on shelf share and positioning", sampleValue: "3 notes", sampleType: "text" },
  ],
  "consumer-engagement": [
    { id: "engagement-metrics", label: "Engagement Metrics", description: "Interaction count, dwell time, and participation rate", sampleValue: "156", sampleType: "number" },
    { id: "consumer-feedback", label: "Consumer Feedback", description: "Structured feedback forms and sentiment scores", sampleValue: "4.6/5", sampleType: "score" },
    { id: "social-mentions", label: "Social Mentions", description: "Hashtag tracking and social media mentions", sampleValue: "28", sampleType: "number" },
  ],
  "product-education": [
    { id: "knowledge-assess", label: "Knowledge Assessment", description: "Pre/post quiz scores for product knowledge", sampleValue: "82%", sampleType: "percent" },
    { id: "qa-log", label: "Q&A Log", description: "Questions asked by consumers and staff responses", sampleValue: "14 Q&As", sampleType: "text" },
    { id: "training-completion", label: "Training Completion", description: "Staff training module completion rates", sampleValue: "96%", sampleType: "percent" },
  ],
  "market-research": [
    { id: "survey-responses", label: "Survey Responses", description: "Structured survey data with response rates", sampleValue: "89", sampleType: "number" },
    { id: "demographics", label: "Demographics Collector", description: "Age, gender, and location data of attendees", sampleValue: "72 profiles", sampleType: "text" },
    { id: "trend-analysis", label: "Trend Analysis", description: "Emerging preferences and consumption patterns", sampleValue: "5 trends", sampleType: "text" },
  ],
};

// Derive all data modules for given objective IDs
export function getDataModulesForObjectives(objectiveIds: string[]): DataModule[] {
  const modules: DataModule[] = [];
  const seen = new Set<string>();
  for (const objId of objectiveIds) {
    const mapped = OBJECTIVE_MODULE_MAP[objId] ?? [];
    for (const mod of mapped) {
      if (!seen.has(mod.id)) {
        seen.add(mod.id);
        modules.push(mod);
      }
    }
  }
  return modules;
}

// ── Step 4: Advanced Customization Modules ──────────────────────────────────

export interface AdvancedModule {
  id: string;
  label: string;
  description: string;
}

export const ADVANCED_MODULES: AdvancedModule[] = [
  { id: "shelf-analysis", label: "Shelf Analysis", description: "Photograph and score shelf placement, facings, and compliance" },
  { id: "menu-analysis", label: "Menu Analysis", description: "Document menu placement, pricing, and feature status" },
  { id: "foot-traffic", label: "Foot Traffic Counter", description: "Automated or manual foot traffic counting at the venue" },
  { id: "weather-impact", label: "Weather Impact Log", description: "Record weather conditions and correlate with event performance" },
  { id: "inventory-audit", label: "Inventory Audit", description: "Pre- and post-event inventory counts for participating SKUs" },
  { id: "pos-integration", label: "POS Integration Data", description: "Pull point-of-sale data from partnered registers" },
];

// ── Mock events for existing campaigns ──────────────────────────────────────

let nextEventId = 50;
export function generateEventId(): string {
  return `evt-${nextEventId++}`;
}

export const INITIAL_EVENTS: EventItem[] = [
  // camp-1: Summer Seltzer Launch (18 events — show 3 representative)
  {
    id: "evt-1", campaignId: "camp-1", name: "Downtown Chicago Sampling",
    location: "Binny's Beverage Depot, Chicago IL", date: "2026-02-15",
    duration: "3 hours", venueType: "off-premises",
    objectives: ["brand-awareness", "drive-sales"],
    dataModules: ["brand-visibility", "impressions", "photo-docs", "sales-volume", "conversion-metrics", "revenue-summary"],
    advancedModules: ["shelf-analysis"], status: "completed", createdAt: "2026-01-20",
  },
  {
    id: "evt-2", campaignId: "camp-1", name: "Miami Beach Pop-Up",
    location: "South Beach Boardwalk, Miami FL", date: "2026-03-01",
    duration: "4 hours", venueType: "special",
    objectives: ["brand-awareness", "consumer-engagement"],
    dataModules: ["brand-visibility", "impressions", "photo-docs", "engagement-metrics", "consumer-feedback", "social-mentions"],
    advancedModules: ["foot-traffic"], status: "scheduled", createdAt: "2026-02-05",
  },
  {
    id: "evt-3", campaignId: "camp-1", name: "Austin Bar Crawl Activation",
    location: "Rainey Street District, Austin TX", date: "2026-03-15",
    duration: "Full day (8h)", venueType: "on-premises",
    objectives: ["drive-sales", "consumer-engagement"],
    dataModules: ["sales-volume", "conversion-metrics", "revenue-summary", "engagement-metrics", "consumer-feedback", "social-mentions"],
    advancedModules: ["menu-analysis"], status: "draft", createdAt: "2026-02-20",
  },
  // camp-2: Q1 Retail Activation (24 events — show 2)
  {
    id: "evt-4", campaignId: "camp-2", name: "Whole Foods Tasting — SF",
    location: "Whole Foods Market, San Francisco CA", date: "2026-01-20",
    duration: "2 hours", venueType: "off-premises",
    objectives: ["drive-sales", "product-education"],
    dataModules: ["sales-volume", "conversion-metrics", "revenue-summary", "knowledge-assess", "qa-log", "training-completion"],
    advancedModules: ["shelf-analysis", "inventory-audit"], status: "completed", createdAt: "2026-01-10",
  },
  {
    id: "evt-5", campaignId: "camp-2", name: "Total Wine Demo — Denver",
    location: "Total Wine & More, Denver CO", date: "2026-02-14",
    duration: "3 hours", venueType: "off-premises",
    objectives: ["drive-sales", "competitive-intel"],
    dataModules: ["sales-volume", "conversion-metrics", "revenue-summary", "competitor-log", "price-matrix", "market-share-notes"],
    advancedModules: ["shelf-analysis"], status: "active", createdAt: "2026-01-25",
  },
  // camp-3: Music Festival Sponsorship (6 events — show 2)
  {
    id: "evt-6", campaignId: "camp-3", name: "Coachella Brand Booth",
    location: "Empire Polo Club, Indio CA", date: "2026-04-10",
    duration: "Full day (8h)", venueType: "special",
    objectives: ["brand-awareness", "consumer-engagement", "market-research"],
    dataModules: ["brand-visibility", "impressions", "photo-docs", "engagement-metrics", "consumer-feedback", "social-mentions", "survey-responses", "demographics", "trend-analysis"],
    advancedModules: ["foot-traffic", "weather-impact"], status: "scheduled", createdAt: "2025-12-28",
  },
  {
    id: "evt-7", campaignId: "camp-3", name: "Lollapalooza VIP Lounge",
    location: "Grant Park, Chicago IL", date: "2026-07-31",
    duration: "Full day (8h)", venueType: "special",
    objectives: ["brand-awareness", "consumer-engagement"],
    dataModules: ["brand-visibility", "impressions", "photo-docs", "engagement-metrics", "consumer-feedback", "social-mentions"],
    advancedModules: ["foot-traffic"], status: "draft", createdAt: "2026-01-15",
  },
  // camp-5: Campus Ambassador Program (12 events — show 2)
  {
    id: "evt-8", campaignId: "camp-5", name: "UCLA Welcome Week Activation",
    location: "UCLA Campus, Los Angeles CA", date: "2026-03-25",
    duration: "Half day (5h)", venueType: "special",
    objectives: ["brand-awareness", "product-education", "market-research"],
    dataModules: ["brand-visibility", "impressions", "photo-docs", "knowledge-assess", "qa-log", "training-completion", "survey-responses", "demographics", "trend-analysis"],
    advancedModules: [], status: "scheduled", createdAt: "2026-02-15",
  },
  {
    id: "evt-9", campaignId: "camp-5", name: "UT Austin Spring Fest",
    location: "University of Texas, Austin TX", date: "2026-04-05",
    duration: "4 hours", venueType: "special",
    objectives: ["consumer-engagement", "market-research"],
    dataModules: ["engagement-metrics", "consumer-feedback", "social-mentions", "survey-responses", "demographics", "trend-analysis"],
    advancedModules: ["foot-traffic"], status: "draft", createdAt: "2026-02-20",
  },
  // camp-8: Craft Cocktail Roadshow (9 events — show 2)
  {
    id: "evt-10", campaignId: "camp-8", name: "NYC Speakeasy Night",
    location: "Please Don't Tell, New York NY", date: "2026-02-20",
    duration: "3 hours", venueType: "on-premises",
    objectives: ["brand-awareness", "drive-sales", "consumer-engagement"],
    dataModules: ["brand-visibility", "impressions", "photo-docs", "sales-volume", "conversion-metrics", "revenue-summary", "engagement-metrics", "consumer-feedback", "social-mentions"],
    advancedModules: ["menu-analysis"], status: "completed", createdAt: "2026-02-05",
  },
  {
    id: "evt-11", campaignId: "camp-8", name: "LA Rooftop Mixology",
    location: "The Highlight Room, Los Angeles CA", date: "2026-03-10",
    duration: "3 hours", venueType: "on-premises",
    objectives: ["brand-awareness", "consumer-engagement"],
    dataModules: ["brand-visibility", "impressions", "photo-docs", "engagement-metrics", "consumer-feedback", "social-mentions"],
    advancedModules: ["menu-analysis", "weather-impact"], status: "scheduled", createdAt: "2026-02-18",
  },
  // ── Weekend-clustered events (March 2026) for calendar density demo ────
  {
    id: "evt-12", campaignId: "camp-1", name: "Brooklyn Brewery Tasting",
    location: "Brooklyn Brewery, Brooklyn NY", date: "2026-03-07",
    duration: "3 hours", venueType: "on-premises",
    objectives: ["brand-awareness", "drive-sales"],
    dataModules: ["brand-visibility", "impressions", "photo-docs", "sales-volume", "conversion-metrics", "revenue-summary"],
    advancedModules: ["menu-analysis"], status: "active", createdAt: "2026-02-25",
  },
  {
    id: "evt-13", campaignId: "camp-2", name: "Trader Joe's Demo — Portland",
    location: "Trader Joe's, Portland OR", date: "2026-03-07",
    duration: "2 hours", venueType: "off-premises",
    objectives: ["drive-sales", "product-education"],
    dataModules: ["sales-volume", "conversion-metrics", "revenue-summary", "knowledge-assess", "qa-log", "training-completion"],
    advancedModules: ["shelf-analysis"], status: "scheduled", createdAt: "2026-02-26",
  },
  {
    id: "evt-14", campaignId: "camp-1", name: "San Diego Waterfront Sampling",
    location: "Seaport Village, San Diego CA", date: "2026-03-08",
    duration: "4 hours", venueType: "special",
    objectives: ["brand-awareness", "consumer-engagement", "market-research"],
    dataModules: ["brand-visibility", "impressions", "photo-docs", "engagement-metrics", "consumer-feedback", "social-mentions", "survey-responses", "demographics", "trend-analysis"],
    advancedModules: ["foot-traffic", "weather-impact"], status: "active", createdAt: "2026-02-27",
  },
  {
    id: "evt-15", campaignId: "camp-8", name: "Nashville Honky-Tonk Mixology",
    location: "Acme Feed & Seed, Nashville TN", date: "2026-03-14",
    duration: "3 hours", venueType: "on-premises",
    objectives: ["brand-awareness", "drive-sales", "consumer-engagement"],
    dataModules: ["brand-visibility", "impressions", "photo-docs", "sales-volume", "conversion-metrics", "revenue-summary", "engagement-metrics", "consumer-feedback", "social-mentions"],
    advancedModules: ["menu-analysis"], status: "scheduled", createdAt: "2026-03-01",
  },
  {
    id: "evt-16", campaignId: "camp-5", name: "USC Game Day Activation",
    location: "USC Campus, Los Angeles CA", date: "2026-03-14",
    duration: "Half day (5h)", venueType: "special",
    objectives: ["brand-awareness", "consumer-engagement", "market-research"],
    dataModules: ["brand-visibility", "impressions", "photo-docs", "engagement-metrics", "consumer-feedback", "social-mentions", "survey-responses", "demographics", "trend-analysis"],
    advancedModules: ["foot-traffic"], status: "draft", createdAt: "2026-03-02",
  },
];