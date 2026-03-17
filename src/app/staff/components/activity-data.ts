// =============================================================================
// Activity data types and mock data.
// Activities are templates within a Campaign that group a subset of products
// and channel context. Events can optionally reference an activity.
// Hierarchy: Campaign → Activity → Event
// =============================================================================

import type { EventItem } from "./event-data";

export interface Activity {
  id: string;
  campaignId: string;
  name: string;
  description?: string | undefined;
  channels?: string[] | undefined;
  linkedProductIds?: string[] | undefined;
  venueType?: EventItem["venueType"] | undefined;
  createdAt: string;
}

let nextActivityId = 10;
export function generateActivityId(): string {
  return `act-${nextActivityId++}`;
}

// ---------------------------------------------------------------------------
// Mock activities for existing campaigns
// ---------------------------------------------------------------------------

export const INITIAL_ACTIVITIES: Activity[] = [
  // camp-1: Summer Seltzer Launch
  {
    id: "act-1",
    campaignId: "camp-1",
    name: "Absolut Classic Off-Premise",
    description:
      "Off-premise retail sampling focused on Absolut Classic vodka line.",
    channels: ["off-premise-chain"],
    linkedProductIds: ["sku-001"],
    venueType: "off-premises",
    createdAt: "2026-01-16",
  },
  {
    id: "act-2",
    campaignId: "camp-1",
    name: "Absolut Flavors Bar Activations",
    description:
      "On-premise bar activations showcasing the Absolut Flavors range.",
    channels: ["on-premise-independent"],
    linkedProductIds: ["sku-002"],
    venueType: "on-premises",
    createdAt: "2026-01-17",
  },
  // camp-2: Q1 Retail Activation
  {
    id: "act-3",
    campaignId: "camp-2",
    name: "Kahlúa & Malibu Retail Tastings",
    description:
      "In-store tasting events pairing Kahlúa and Malibu products at chain retailers.",
    channels: ["off-premise-chain", "off-premise-independent"],
    linkedProductIds: ["sku-003", "sku-004"],
    venueType: "off-premises",
    createdAt: "2026-01-04",
  },
  {
    id: "act-4",
    campaignId: "camp-2",
    name: "Beefeater Gin Focus",
    description: "Dedicated Beefeater Gin sampling at independent retailers.",
    channels: ["off-premise-independent"],
    linkedProductIds: ["sku-005"],
    venueType: "off-premises",
    createdAt: "2026-01-05",
  },
  // camp-8: Craft Cocktail Roadshow
  {
    id: "act-5",
    campaignId: "camp-8",
    name: "Whiskey Portfolio Bar Nights",
    description:
      "Premium bar activations featuring Jameson and Maker's Mark cocktails.",
    channels: ["on-premise-chain", "on-premise-independent"],
    linkedProductIds: ["sku-006", "sku-007"],
    venueType: "on-premises",
    createdAt: "2026-02-02",
  },
  {
    id: "act-6",
    campaignId: "camp-8",
    name: "Hendrick's Gin Experience",
    description:
      "Specialty mixology events focused on Hendrick's Gin craft cocktails.",
    channels: ["on-premise-independent"],
    linkedProductIds: ["sku-008"],
    venueType: "on-premises",
    createdAt: "2026-02-03",
  },
];
