// =============================================================================
// Mock campaign data and types for MM-UI-002 Campaign Management.
// =============================================================================

export interface Campaign {
  id: string;
  name: string;
  description: string;
  eventCount: number;
  status: "active" | "draft" | "completed";
  createdAt: string;
}

let nextId = 9;
export function generateId(): string {
  return `camp-${nextId++}`;
}

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: "camp-1",
    name: "Summer Seltzer Launch",
    description:
      "Nationwide sampling campaign for the new Hard Seltzer line across 12 metro areas.",
    eventCount: 18,
    status: "active",
    createdAt: "2026-01-15",
  },
  {
    id: "camp-2",
    name: "Q1 Retail Activation",
    description:
      "In-store tasting events at partner retail locations to drive trial and purchase.",
    eventCount: 24,
    status: "active",
    createdAt: "2026-01-03",
  },
  {
    id: "camp-3",
    name: "Music Festival Sponsorship",
    description:
      "Brand activation booths and sampling at three major music festivals.",
    eventCount: 6,
    status: "active",
    createdAt: "2025-12-20",
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
  },
];
