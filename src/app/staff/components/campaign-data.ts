// =============================================================================
// Mock campaign data and types for MM-UI-002 Campaign Management.
// =============================================================================

// ---------------------------------------------------------------------------
// Channel types — 4 core groupings per Hart's hierarchy
// ---------------------------------------------------------------------------

export interface ChannelOption {
  value: string;
  label: string;
  description: string;
}

export const CHANNEL_OPTIONS: ChannelOption[] = [
  {
    value: "on-premise-chain",
    label: "On-Premise Chain",
    description: "Chain bars, restaurants & venues (e.g. TGI Fridays)",
  },
  {
    value: "on-premise-independent",
    label: "On-Premise Independent",
    description: "Independent bars, lounges & restaurants",
  },
  {
    value: "off-premise-chain",
    label: "Off-Premise Chain",
    description: "Chain retail & liquor stores (e.g. Total Wine, Tesco)",
  },
  {
    value: "off-premise-independent",
    label: "Off-Premise Independent",
    description: "Independent liquor stores & specialty shops",
  },
];

// ---------------------------------------------------------------------------
// Campaign
// ---------------------------------------------------------------------------

export interface Campaign {
  id: string;
  name: string;
  description: string;
  eventCount: number;
  status: "active" | "draft" | "completed";
  createdAt: string;
  // ── Extended context fields (all optional) ──────────────────────────────
  supplier?: string | undefined;
  distributors?: string[] | undefined;
  targetMarkets?: string[] | undefined;
  channels?: string[] | undefined;
  anticipatedEventCount?: number | undefined;
  linkedProductIds?: string[] | undefined;
  objectives?: string[] | undefined;
}

let nextId = 9;
export function generateId(): string {
  return `camp-${nextId++}`;
}

// ---------------------------------------------------------------------------
// Lightweight product list — placeholder until full item master is implemented
// ---------------------------------------------------------------------------

export interface ProductRef {
  id: string;
  name: string;
  brand?: string | undefined;
  line?: string | undefined;
}

export const MOCK_PRODUCTS: ProductRef[] = [
  { id: "sku-001", name: "Absolut Vodka 750ml", brand: "Absolut", line: "Absolut Classic" },
  { id: "sku-002", name: "Absolut Lime 750ml", brand: "Absolut", line: "Absolut Flavors" },
  { id: "sku-003", name: "Kahlúa 700ml", brand: "Kahlúa", line: "Kahlúa Classic" },
  { id: "sku-004", name: "Malibu Coconut Rum 750ml", brand: "Malibu", line: "Malibu Classic" },
  { id: "sku-005", name: "Beefeater Gin 750ml", brand: "Beefeater", line: "Beefeater Classic" },
  { id: "sku-006", name: "Jameson Irish Whiskey 750ml", brand: "Jameson", line: "Jameson Original" },
  { id: "sku-007", name: "Maker's Mark Bourbon 750ml", brand: "Maker's Mark", line: "Maker's Mark Classic" },
  { id: "sku-008", name: "Hendrick's Gin 700ml", brand: "Hendrick's", line: "Hendrick's Classic" },
];

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: "camp-1",
    name: "Summer Seltzer Launch",
    description:
      "Nationwide sampling campaign for the new Hard Seltzer line across 12 metro areas.",
    eventCount: 18,
    status: "active",
    createdAt: "2026-01-15",
    supplier: "Beam Suntory",
    distributors: ["Southern Glazer's", "Republic National"],
    targetMarkets: ["New York", "Los Angeles", "Chicago", "Miami"],
    channels: ["off-premise-chain", "on-premise-independent"],
    anticipatedEventCount: 20,
    linkedProductIds: ["sku-001", "sku-002"],
    objectives: ["brand-awareness", "drive-sales"],
  },
  {
    id: "camp-2",
    name: "Q1 Retail Activation",
    description:
      "In-store tasting events at partner retail locations to drive trial and purchase.",
    eventCount: 24,
    status: "active",
    createdAt: "2026-01-03",
    supplier: "Pernod Ricard",
    distributors: ["Breakthru Beverage"],
    targetMarkets: ["San Francisco", "Denver", "Portland"],
    channels: ["off-premise-chain", "off-premise-independent"],
    anticipatedEventCount: 24,
    linkedProductIds: ["sku-003", "sku-004", "sku-005"],
    objectives: ["drive-sales", "product-education"],
  },
  {
    id: "camp-3",
    name: "Music Festival Sponsorship",
    description:
      "Brand activation booths and sampling at three major music festivals.",
    eventCount: 6,
    status: "active",
    createdAt: "2025-12-20",
    supplier: "Beam Suntory",
    distributors: ["Southern Glazer's"],
    targetMarkets: ["Los Angeles", "Chicago", "Austin"],
    channels: ["on-premise-chain", "on-premise-independent"],
    anticipatedEventCount: 6,
    linkedProductIds: ["sku-001", "sku-006"],
    objectives: ["brand-awareness", "consumer-engagement", "market-research"],
  },
  {
    id: "camp-4",
    name: "Holiday Gift Pack Promo",
    description:
      "Limited-edition holiday gift set promotion with in-store displays and sampling.",
    eventCount: 32,
    status: "completed",
    createdAt: "2025-11-01",
  },
  {
    id: "camp-5",
    name: "Campus Ambassador Program",
    description:
      "Recruiting and managing brand ambassadors at university campuses for peer-to-peer marketing.",
    eventCount: 12,
    status: "active",
    createdAt: "2026-02-10",
    supplier: "Diageo",
    distributors: ["Republic National", "Wirtz Beverage"],
    targetMarkets: ["Los Angeles", "Austin", "Atlanta"],
    channels: ["on-premise-independent", "off-premise-chain"],
    anticipatedEventCount: 15,
    linkedProductIds: ["sku-007", "sku-008"],
    objectives: ["brand-awareness", "product-education", "market-research"],
  },
  {
    id: "camp-6",
    name: "Spring Wellness Tour",
    description:
      "Pop-up wellness events pairing new low-cal product line with fitness influencer meetups.",
    eventCount: 0,
    status: "draft",
    createdAt: "2026-02-28",
  },
  {
    id: "camp-7",
    name: "NFL Tailgate Series",
    description:
      "Tailgate sampling activations across 8 NFL stadiums during the regular season.",
    eventCount: 16,
    status: "completed",
    createdAt: "2025-09-05",
  },
  {
    id: "camp-8",
    name: "Craft Cocktail Roadshow",
    description:
      "Traveling mixology experience featuring signature cocktails at premium bars and lounges.",
    eventCount: 9,
    status: "active",
    createdAt: "2026-02-01",
    supplier: "Brown-Forman",
    distributors: ["Southern Glazer's", "Charmer Industries"],
    targetMarkets: ["New York", "Los Angeles", "Nashville"],
    channels: ["on-premise-chain", "on-premise-independent"],
    anticipatedEventCount: 10,
    linkedProductIds: ["sku-006", "sku-007", "sku-008"],
    objectives: ["brand-awareness", "drive-sales", "consumer-engagement"],
  },
];
