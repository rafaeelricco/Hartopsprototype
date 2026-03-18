// Events data for Educator Manager
// Scoped to the manager's assigned educator set only

export type EventStatus = "Upcoming" | "Live" | "Completed";
export type EventType = "Tasting" | "Demo" | "Activation" | "Promo";
export type AccountType = "Retail" | "Wholesale" | "Pop-up";
export type CancellationReason =
  | "Weather"
  | "Illness"
  | "Car Accident"
  | "Retailer Cancellation"
  | "Other";

export interface EventItem {
  id: string;
  name: string;
  campaignName: string;
  brandName: string;
  clientName: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  venueAddress: string;
  accountType: AccountType;
  eventType: EventType;
  educatorId: string | null;
  educatorName: string | null;
  status: EventStatus;
  products: string[];
  instructions: string;
  goals: string;
  notes?: string;
  // Live event fields
  checkInStatus?: "checked-in" | "pending" | "failed";
  checkInTime?: string;
  liveMetrics?: {
    samplesDistributed: number;
    consumerInteractions: number;
    salesGenerated: number;
  };
  photoCount?: number;
  photoUrls?: string[];
  // Completed event fields
  finalStats?: {
    totalSamples: number;
    totalInteractions: number;
    totalSales: number;
    rating: number;
    photosSubmitted: number;
    duration: string;
  };
  completedAt?: string;
  finalizedAt?: string | null;
  // Cancellation
  cancellationReason?: CancellationReason;
  cancelledAt?: string;
}

export const mockEvents: EventItem[] = [
  {
    id: "evt-101",
    name: "Absolut Vodka Tasting",
    campaignName: "Absolut Summer 2026",
    brandName: "Absolut",
    clientName: "Pernod Ricard",
    date: "2026-03-20",
    time: "2:00 PM – 6:00 PM",
    duration: "4h",
    venue: "Whole Foods Market, SoHo",
    venueAddress: "95 E Houston St, New York, NY 10002",
    accountType: "Retail",
    eventType: "Tasting",
    educatorId: null,
    educatorName: null,
    status: "Upcoming",
    products: [
      "Absolut Vodka 750ml",
      "Absolut Citron 750ml",
      "Absolut Elyx 750ml",
    ],
    instructions:
      "Set up tasting station near the spirits aisle. Use provided brand materials and table covers. Offer 0.5oz pours.",
    goals:
      "Sample 80+ consumers, drive 15+ bottle sales, collect consumer profiles.",
    notes:
      "High-traffic location on weekends. Store manager contact: John D. (917-555-0142)",
  },
  {
    id: "evt-102",
    name: "Jameson Whiskey Promo",
    campaignName: "Jameson Spring Push",
    brandName: "Jameson",
    clientName: "Pernod Ricard",
    date: "2026-03-20",
    time: "4:00 PM – 8:00 PM",
    duration: "4h",
    venue: "Total Wine & More, Jersey City",
    venueAddress: "90 Mall Dr W, Jersey City, NJ 07310",
    accountType: "Retail",
    eventType: "Promo",
    educatorId: "edu-2",
    educatorName: "Sarah Chen",
    status: "Live",
    products: ["Jameson Original", "Jameson Black Barrel", "Jameson Cold Brew"],
    instructions:
      "Station near the whiskey endcap. Highlight the Cold Brew for younger consumers.",
    goals: "60+ samplings, 10+ sales, push Cold Brew variant.",
    notes: "Endcap display pre-arranged with store. Backup table in car.",
    checkInStatus: "checked-in",
    checkInTime: "3:52 PM",
    liveMetrics: {
      samplesDistributed: 34,
      consumerInteractions: 28,
      salesGenerated: 6,
    },
    photoCount: 4,
    photoUrls: [
      "/placeholder-photo-1.jpg",
      "/placeholder-photo-2.jpg",
      "/placeholder-photo-3.jpg",
      "/placeholder-photo-4.jpg",
    ],
  },
  {
    id: "evt-103",
    name: "Malibu Rum Summer Launch",
    campaignName: "Malibu Summer Vibes",
    brandName: "Malibu",
    clientName: "Pernod Ricard",
    date: "2026-03-19",
    time: "12:00 PM – 4:00 PM",
    duration: "4h",
    venue: "BevMo!, Hoboken",
    venueAddress: "200 Washington St, Hoboken, NJ 07030",
    accountType: "Retail",
    eventType: "Activation",
    educatorId: "edu-3",
    educatorName: "James Rodriguez",
    status: "Completed",
    products: ["Malibu Original", "Malibu Strawberry", "Malibu Pineapple"],
    instructions:
      "Summer theme setup. Use provided beach-themed table runner.",
    goals: "100+ samplings, 20+ cases sold.",
    notes:
      "Beach-themed POS materials in educator kit. Manager: Lisa T. (201-555-0198)",
    checkInStatus: "checked-in",
    checkInTime: "11:48 AM",
    finalStats: {
      totalSamples: 112,
      totalInteractions: 89,
      totalSales: 18,
      rating: 4.5,
      photosSubmitted: 8,
      duration: "4h 15m",
    },
    completedAt: "2026-03-19T16:15:00",
    finalizedAt: null,
    photoCount: 8,
    photoUrls: [
      "/placeholder-photo-1.jpg",
      "/placeholder-photo-2.jpg",
      "/placeholder-photo-3.jpg",
      "/placeholder-photo-4.jpg",
      "/placeholder-photo-5.jpg",
      "/placeholder-photo-6.jpg",
      "/placeholder-photo-7.jpg",
      "/placeholder-photo-8.jpg",
    ],
  },
  {
    id: "evt-104",
    name: "Kahlúa Coffee Cocktails",
    campaignName: "Kahlúa Mixology Tour",
    brandName: "Kahlúa",
    clientName: "Pernod Ricard",
    date: "2026-03-21",
    time: "11:00 AM – 3:00 PM",
    duration: "4h",
    venue: "Trader Joe's, Williamsburg",
    venueAddress: "400 Grand St, Brooklyn, NY 11211",
    accountType: "Retail",
    eventType: "Demo",
    educatorId: null,
    educatorName: null,
    status: "Upcoming",
    products: ["Kahlúa Original", "Kahlúa Vanilla", "Kahlúa Mint Mocha"],
    instructions:
      "Espresso martini recipe cards on table. Demo the espresso martini prep.",
    goals: "50+ samplings, 12+ bottle sales.",
    notes:
      "Bring portable espresso machine from warehouse. Store has power outlet at endcap.",
  },
  {
    id: "evt-105",
    name: "Beefeater Gin Activation",
    campaignName: "Beefeater London Dry",
    brandName: "Beefeater",
    clientName: "Pernod Ricard",
    date: "2026-03-21",
    time: "1:00 PM – 5:00 PM",
    duration: "4h",
    venue: "Costco, Hackensack",
    venueAddress: "50 S River St, Hackensack, NJ 07601",
    accountType: "Wholesale",
    eventType: "Activation",
    educatorId: "edu-5",
    educatorName: "Maria Santos",
    status: "Upcoming",
    products: ["Beefeater London Dry 1.75L", "Beefeater Pink 750ml"],
    instructions:
      "Use the provided Costco-approved sampling setup. Focus on G&T pairing suggestions.",
    goals: "120+ samplings, 30+ unit sales.",
    notes:
      "Costco requires wristband check for samples. Arrive 30 min early for badge.",
  },
  {
    id: "evt-106",
    name: "Glenlivet Scotch Showcase",
    campaignName: "Glenlivet Prestige Series",
    brandName: "Glenlivet",
    clientName: "Pernod Ricard",
    date: "2026-03-18",
    time: "3:00 PM – 7:00 PM",
    duration: "4h",
    venue: "Wine.com Pop-up, Chelsea",
    venueAddress: "75 9th Ave, New York, NY 10011",
    accountType: "Pop-up",
    eventType: "Tasting",
    educatorId: "edu-4",
    educatorName: "David Kim",
    status: "Completed",
    products: ["Glenlivet 12", "Glenlivet 15 French Oak", "Glenlivet 18"],
    instructions: "Premium setup — use crystal glassware. Neat pours only.",
    goals: "40+ tastings, 8+ bottles sold.",
    notes:
      "VIP-level presentation expected. High-value clientele at this location.",
    checkInStatus: "checked-in",
    checkInTime: "2:45 PM",
    finalStats: {
      totalSamples: 45,
      totalInteractions: 38,
      totalSales: 11,
      rating: 4.8,
      photosSubmitted: 12,
      duration: "4h 10m",
    },
    completedAt: "2026-03-18T19:10:00",
    finalizedAt: null,
    photoCount: 12,
    photoUrls: [
      "/placeholder-photo-1.jpg",
      "/placeholder-photo-2.jpg",
      "/placeholder-photo-3.jpg",
      "/placeholder-photo-4.jpg",
      "/placeholder-photo-5.jpg",
      "/placeholder-photo-6.jpg",
      "/placeholder-photo-7.jpg",
      "/placeholder-photo-8.jpg",
      "/placeholder-photo-9.jpg",
      "/placeholder-photo-10.jpg",
      "/placeholder-photo-11.jpg",
      "/placeholder-photo-12.jpg",
    ],
  },
  {
    id: "evt-107",
    name: "Absolut Elyx Premium",
    campaignName: "Absolut Summer 2026",
    brandName: "Absolut",
    clientName: "Pernod Ricard",
    date: "2026-03-20",
    time: "5:00 PM – 9:00 PM",
    duration: "4h",
    venue: "Astor Wines & Spirits, NoHo",
    venueAddress: "399 Lafayette St, New York, NY 10003",
    accountType: "Retail",
    eventType: "Tasting",
    educatorId: "edu-6",
    educatorName: "Emily Park",
    status: "Live",
    products: ["Absolut Elyx 750ml", "Absolut Elyx 1L"],
    instructions:
      "High-end presentation. Copper pineapple mug displays. Focus on the craft story.",
    goals: "30+ premium tastings, 5+ bottles sold.",
    notes:
      "Store has dedicated tasting corner. Ask for manager Alex on arrival.",
    checkInStatus: "checked-in",
    checkInTime: "4:48 PM",
    liveMetrics: {
      samplesDistributed: 18,
      consumerInteractions: 15,
      salesGenerated: 3,
    },
    photoCount: 6,
    photoUrls: [
      "/placeholder-photo-1.jpg",
      "/placeholder-photo-2.jpg",
      "/placeholder-photo-3.jpg",
      "/placeholder-photo-4.jpg",
      "/placeholder-photo-5.jpg",
      "/placeholder-photo-6.jpg",
    ],
  },
  {
    id: "evt-108",
    name: "Avión Tequila Launch",
    campaignName: "Avión Elevation Campaign",
    brandName: "Avión",
    clientName: "Pernod Ricard",
    date: "2026-03-22",
    time: "2:00 PM – 6:00 PM",
    duration: "4h",
    venue: "Spec's Wines, Union Square",
    venueAddress: "33 Union Square W, New York, NY 10003",
    accountType: "Retail",
    eventType: "Activation",
    educatorId: "edu-7",
    educatorName: "Carlos Mendez",
    status: "Upcoming",
    products: ["Avión Silver", "Avión Reposado", "Avión Añejo"],
    instructions:
      "Taste all three expressions. Lead with Silver, finish with Añejo. Use agave-themed display.",
    goals: "70+ samplings, 15+ bottles sold.",
    notes:
      "Agave plant props available in warehouse kit #12. Confirm pickup day-of.",
  },
];

export function getEventById(id: string): EventItem | undefined {
  return mockEvents.find((e) => e.id === id);
}

export function getEventsByStatus(status: EventStatus): EventItem[] {
  return mockEvents.filter((e) => e.status === status);
}

export function getEventsRequiringAttention(): EventItem[] {
  return mockEvents.filter(
    (e) =>
      (e.status === "Upcoming" && !e.educatorId) ||
      (e.status === "Completed" && !e.finalizedAt),
  );
}
