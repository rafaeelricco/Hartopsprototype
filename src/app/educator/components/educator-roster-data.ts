// Educator Roster mock data — scoped to authenticated manager's assigned educators
// Quick Stats: avg rating, sales per event, punctuality

export interface Educator {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Pending Invitation";
  avgRating: number;
  salesPerEvent: number;
  punctuality: number; // percentage
  totalEvents: number;
  joinedDate: string;
  distanceMiles?: number; // approximate distance from manager's geography center
  eventsThisMonth: number;
  eventsAssigned: number;
  nextEvent: { id: string; name: string; date: string } | null;
  photoUrl: string | null;
  homeBase: string;
  homeAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    lat?: number;
    lng?: number;
  };
  brandCertifications: string[];
  upcomingEvents: {
    id: string;
    name: string;
    date: string;
    time: string;
    venue: string;
  }[];
  pastEvents: {
    id: string;
    name: string;
    date: string;
    venue: string;
    rating: number;
    salesUnits: number;
    punctualityScore: number;
  }[];
  availability: {
    date: string; // YYYY-MM-DD
    slots: ("morning" | "afternoon" | "evening")[];
  }[];
  // ─── P1 Scoring Metrics ───
  retailSalesAvg: number; // Retail Sales Reported Average (units/event)
  preferredBrands: string[]; // Preferred Brands/Categories
  checkInScore: number; // Check-in Score (0–100)
  eventCompletionAvg: number; // Event Completed to End Time Avg (0–100%)
  retailerSurveyScore: number; // Retailer Survey Score (1–5)
  cancellationRating: number; // Cancellation Rating (0–100, 100 = no cancellations)
  qualityScore: number; // Composite quality score (0–100)
  // ─── Trend tracking (delta vs. previous period) ───
  trends: {
    retailSalesAvg: number;
    checkInScore: number;
    eventCompletionAvg: number;
    retailerSurveyScore: number;
    cancellationRating: number;
    qualityScore: number;
  };
}

// Generate availability for a 14-day window starting 2026-03-18
function generateAvailability(seed: number): Educator["availability"] {
  const start = new Date("2026-03-18");
  const result: Educator["availability"] = [];
  const allSlots: ("morning" | "afternoon" | "evening")[] = [
    "morning",
    "afternoon",
    "evening",
  ];
  for (let i = 0; i < 14; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const dayOfWeek = d.getDay();
    if (dayOfWeek === 0 && seed % 3 !== 0) continue;
    const hash = (seed * 7 + i * 13) % 10;
    let slots: ("morning" | "afternoon" | "evening")[];
    if (hash < 2) {
      continue;
    } else if (hash < 5) {
      slots = allSlots.filter((_, idx) => (hash + idx + seed) % 3 !== 0);
      if (slots.length === 0) slots = ["afternoon"];
    } else {
      slots = [...allSlots];
    }
    const dateStr = d.toISOString().split("T")[0] as string;
    result.push({
      date: dateStr,
      slots,
    });
  }
  return result;
}

export const mockEducators: Educator[] = [
  {
    id: "edu-1",
    name: "Ana Martinez",
    email: "ana.martinez@gmail.com",
    phone: "+1 (212) 555-0101",
    status: "Active",
    avgRating: 4.8,
    salesPerEvent: 14.2,
    punctuality: 98,
    totalEvents: 47,
    joinedDate: "2025-06-15",
    distanceMiles: 8,
    eventsThisMonth: 6,
    eventsAssigned: 3,
    nextEvent: {
      id: "evt-101",
      name: "Absolut Vodka Tasting",
      date: "2026-03-21",
    },
    photoUrl: null,
    homeBase: "Manhattan & SoHo, NY",
    homeAddress: {
      street: "142 Spring St, Apt 3A",
      city: "New York",
      state: "NY",
      zip: "10012",
      lat: 40.723,
      lng: -73.9998,
    },
    brandCertifications: ["Absolut", "Malibu", "Kahlua"],
    upcomingEvents: [
      {
        id: "evt-101",
        name: "Absolut Vodka Tasting",
        date: "2026-03-21",
        time: "2:00 PM",
        venue: "Whole Foods Market — Tribeca",
      },
      {
        id: "evt-108",
        name: "Malibu Summer Promo",
        date: "2026-03-25",
        time: "4:00 PM",
        venue: "BJ's Wholesale — Manhattan",
      },
      {
        id: "evt-112",
        name: "Kahlua Coffee Cocktail Demo",
        date: "2026-03-29",
        time: "1:00 PM",
        venue: "Trader Joe's — Union Square",
      },
    ],
    pastEvents: [
      {
        id: "past-001",
        name: "Absolut Holiday Activation",
        date: "2026-02-14",
        venue: "Costco — Chelsea",
        rating: 4.9,
        salesUnits: 16,
        punctualityScore: 100,
      },
      {
        id: "past-002",
        name: "Malibu Spring Tasting",
        date: "2026-02-28",
        venue: "Total Wine — Flatiron",
        rating: 4.7,
        salesUnits: 13,
        punctualityScore: 98,
      },
      {
        id: "past-003",
        name: "Absolut Citron Launch",
        date: "2026-03-07",
        venue: "Whole Foods — Tribeca",
        rating: 4.8,
        salesUnits: 15,
        punctualityScore: 100,
      },
    ],
    availability: generateAvailability(1),
    retailSalesAvg: 14.2,
    preferredBrands: ["Vodka", "Rum", "Liqueur"],
    checkInScore: 96,
    eventCompletionAvg: 98,
    retailerSurveyScore: 4.7,
    cancellationRating: 100,
    qualityScore: 88,
    trends: {
      retailSalesAvg: 1.3,
      checkInScore: 2,
      eventCompletionAvg: 0,
      retailerSurveyScore: 0.2,
      cancellationRating: 0,
      qualityScore: 2.1,
    },
  },
  {
    id: "edu-2",
    name: "Sarah Chen",
    email: "sarah.chen@gmail.com",
    phone: "+1 (201) 555-0202",
    status: "Active",
    avgRating: 4.6,
    salesPerEvent: 11.8,
    punctuality: 95,
    totalEvents: 32,
    joinedDate: "2025-08-20",
    distanceMiles: 15,
    eventsThisMonth: 4,
    eventsAssigned: 2,
    nextEvent: {
      id: "evt-102",
      name: "Jameson Whiskey Promo",
      date: "2026-03-22",
    },
    photoUrl: null,
    homeBase: "Hoboken & Jersey City, NJ",
    homeAddress: {
      street: "518 Washington St, Unit 2",
      city: "Hoboken",
      state: "NJ",
      zip: "07030",
      lat: 40.744,
      lng: -74.028,
    },
    brandCertifications: ["Jameson", "Glenlivet"],
    upcomingEvents: [
      {
        id: "evt-102",
        name: "Jameson Whiskey Promo",
        date: "2026-03-22",
        time: "3:00 PM",
        venue: "Costco — Hackensack",
      },
      {
        id: "evt-110",
        name: "Glenlivet Scotch Tasting",
        date: "2026-03-28",
        time: "5:00 PM",
        venue: "Total Wine — Paramus",
      },
    ],
    pastEvents: [
      {
        id: "past-004",
        name: "Jameson Black Barrel Demo",
        date: "2026-02-20",
        venue: "BJ's Wholesale — Secaucus",
        rating: 4.5,
        salesUnits: 11,
        punctualityScore: 95,
      },
      {
        id: "past-005",
        name: "Glenlivet 12yr Tasting",
        date: "2026-03-05",
        venue: "Costco — Hackensack",
        rating: 4.7,
        salesUnits: 13,
        punctualityScore: 100,
      },
    ],
    availability: generateAvailability(2),
    retailSalesAvg: 11.8,
    preferredBrands: ["Whiskey", "Scotch"],
    checkInScore: 90,
    eventCompletionAvg: 95,
    retailerSurveyScore: 4.4,
    cancellationRating: 95,
    qualityScore: 81,
    trends: {
      retailSalesAvg: 0.5,
      checkInScore: -1,
      eventCompletionAvg: 1,
      retailerSurveyScore: 0.1,
      cancellationRating: 0,
      qualityScore: 0.8,
    },
  },
  {
    id: "edu-3",
    name: "James Rodriguez",
    email: "james.rodriguez@gmail.com",
    phone: "+1 (718) 555-0303",
    status: "Active",
    avgRating: 4.3,
    salesPerEvent: 9.5,
    punctuality: 88,
    totalEvents: 28,
    joinedDate: "2025-09-10",
    distanceMiles: 22,
    eventsThisMonth: 3,
    eventsAssigned: 1,
    nextEvent: {
      id: "evt-104",
      name: "Beefeater Gin Demo",
      date: "2026-03-24",
    },
    photoUrl: null,
    homeBase: "Brooklyn & Queens, NY",
    homeAddress: {
      street: "87 Atlantic Ave, Apt 5C",
      city: "Brooklyn",
      state: "NY",
      zip: "11201",
      lat: 40.6862,
      lng: -73.977,
    },
    brandCertifications: ["Beefeater", "Absolut"],
    upcomingEvents: [
      {
        id: "evt-104",
        name: "Beefeater Gin Demo",
        date: "2026-03-24",
        time: "1:00 PM",
        venue: "Whole Foods — Gowanus",
      },
    ],
    pastEvents: [
      {
        id: "past-006",
        name: "Absolut Tasting — Brooklyn",
        date: "2026-02-10",
        venue: "Trader Joe's — Cobble Hill",
        rating: 4.2,
        salesUnits: 9,
        punctualityScore: 85,
      },
      {
        id: "past-007",
        name: "Beefeater G&T Activation",
        date: "2026-03-01",
        venue: "BJ's Wholesale — Rego Park",
        rating: 4.4,
        salesUnits: 10,
        punctualityScore: 90,
      },
    ],
    availability: generateAvailability(3),
    retailSalesAvg: 9.5,
    preferredBrands: ["Gin", "Vodka"],
    checkInScore: 78,
    eventCompletionAvg: 85,
    retailerSurveyScore: 3.8,
    cancellationRating: 88,
    qualityScore: 68,
    trends: {
      retailSalesAvg: -0.8,
      checkInScore: -3,
      eventCompletionAvg: -2,
      retailerSurveyScore: -0.3,
      cancellationRating: -5,
      qualityScore: -2.4,
    },
  },
  {
    id: "edu-4",
    name: "David Kim",
    email: "david.kim@gmail.com",
    phone: "+1 (917) 555-0404",
    status: "Active",
    avgRating: 4.9,
    salesPerEvent: 16.1,
    punctuality: 100,
    totalEvents: 53,
    joinedDate: "2025-04-01",
    distanceMiles: 5,
    eventsThisMonth: 7,
    eventsAssigned: 3,
    nextEvent: {
      id: "evt-105",
      name: "Avion Tequila Launch",
      date: "2026-03-20",
    },
    photoUrl: null,
    homeBase: "Midtown & Upper East Side, NY",
    homeAddress: {
      street: "301 E 79th St, Apt 14D",
      city: "New York",
      state: "NY",
      zip: "10075",
      lat: 40.7734,
      lng: -73.956,
    },
    brandCertifications: ["Avion", "Absolut", "Jameson", "Malibu"],
    upcomingEvents: [
      {
        id: "evt-105",
        name: "Avion Tequila Launch",
        date: "2026-03-20",
        time: "5:00 PM",
        venue: "Whole Foods — Columbus Circle",
      },
      {
        id: "evt-109",
        name: "Absolut Elyx Tasting",
        date: "2026-03-26",
        time: "3:00 PM",
        venue: "Costco — East Harlem",
      },
      {
        id: "evt-113",
        name: "Jameson Caskmates Demo",
        date: "2026-03-30",
        time: "2:00 PM",
        venue: "Total Wine — Upper East Side",
      },
    ],
    pastEvents: [
      {
        id: "past-008",
        name: "Avion Silver Tasting",
        date: "2026-02-08",
        venue: "Costco — East Harlem",
        rating: 5.0,
        salesUnits: 18,
        punctualityScore: 100,
      },
      {
        id: "past-009",
        name: "Absolut Citron Launch",
        date: "2026-02-22",
        venue: "Whole Foods — Columbus Circle",
        rating: 4.9,
        salesUnits: 17,
        punctualityScore: 100,
      },
      {
        id: "past-010",
        name: "Malibu Coconut Promo",
        date: "2026-03-08",
        venue: "BJ's Wholesale — Bronx",
        rating: 4.8,
        salesUnits: 15,
        punctualityScore: 100,
      },
    ],
    availability: generateAvailability(4),
    retailSalesAvg: 16.1,
    preferredBrands: ["Tequila", "Vodka", "Whiskey", "Rum"],
    checkInScore: 100,
    eventCompletionAvg: 100,
    retailerSurveyScore: 4.9,
    cancellationRating: 100,
    qualityScore: 92,
    trends: {
      retailSalesAvg: 2.1,
      checkInScore: 0,
      eventCompletionAvg: 0,
      retailerSurveyScore: 0.1,
      cancellationRating: 0,
      qualityScore: 1.5,
    },
  },
  {
    id: "edu-5",
    name: "Maria Santos",
    email: "maria.santos@gmail.com",
    phone: "+1 (551) 555-0505",
    status: "Active",
    avgRating: 4.5,
    salesPerEvent: 12.4,
    punctuality: 92,
    totalEvents: 19,
    joinedDate: "2025-11-05",
    distanceMiles: 28,
    eventsThisMonth: 3,
    eventsAssigned: 2,
    nextEvent: {
      id: "evt-107",
      name: "Kahlua Coffee Promo",
      date: "2026-03-23",
    },
    photoUrl: null,
    homeBase: "Newark & North Jersey, NJ",
    homeAddress: {
      street: "65 Park Pl, Apt 8",
      city: "Newark",
      state: "NJ",
      zip: "07102",
      lat: 40.7357,
      lng: -74.1724,
    },
    brandCertifications: ["Kahlua", "Malibu"],
    upcomingEvents: [
      {
        id: "evt-107",
        name: "Kahlua Coffee Promo",
        date: "2026-03-23",
        time: "11:00 AM",
        venue: "Costco — Wayne",
      },
      {
        id: "evt-111",
        name: "Malibu Pineapple Activation",
        date: "2026-03-27",
        time: "3:00 PM",
        venue: "Total Wine — Livingston",
      },
    ],
    pastEvents: [
      {
        id: "past-011",
        name: "Kahlua Espresso Martini Demo",
        date: "2026-02-15",
        venue: "BJ's Wholesale — Wayne",
        rating: 4.6,
        salesUnits: 12,
        punctualityScore: 95,
      },
      {
        id: "past-012",
        name: "Malibu Rum Tasting",
        date: "2026-03-02",
        venue: "Trader Joe's — Montclair",
        rating: 4.4,
        salesUnits: 11,
        punctualityScore: 90,
      },
    ],
    availability: generateAvailability(5),
    retailSalesAvg: 12.4,
    preferredBrands: ["Liqueur", "Rum"],
    checkInScore: 85,
    eventCompletionAvg: 92,
    retailerSurveyScore: 4.2,
    cancellationRating: 90,
    qualityScore: 75,
    trends: {
      retailSalesAvg: 1.0,
      checkInScore: 3,
      eventCompletionAvg: 2,
      retailerSurveyScore: 0.3,
      cancellationRating: 5,
      qualityScore: 3.2,
    },
  },
  {
    id: "edu-6",
    name: "Emily Park",
    email: "emily.park@gmail.com",
    phone: "+1 (347) 555-0606",
    status: "Active",
    avgRating: 4.7,
    salesPerEvent: 13.0,
    punctuality: 97,
    totalEvents: 41,
    joinedDate: "2025-05-22",
    distanceMiles: 12,
    eventsThisMonth: 5,
    eventsAssigned: 2,
    nextEvent: {
      id: "evt-106",
      name: "Glenlivet Founders Reserve",
      date: "2026-03-22",
    },
    photoUrl: null,
    homeBase: "Williamsburg & Greenpoint, NY",
    homeAddress: {
      street: "221 Bedford Ave, Apt 2F",
      city: "Brooklyn",
      state: "NY",
      zip: "11211",
      lat: 40.7143,
      lng: -73.9614,
    },
    brandCertifications: ["Glenlivet", "Jameson", "Beefeater"],
    upcomingEvents: [
      {
        id: "evt-106",
        name: "Glenlivet Founders Reserve",
        date: "2026-03-22",
        time: "4:00 PM",
        venue: "Whole Foods — Williamsburg",
      },
      {
        id: "evt-114",
        name: "Jameson Orange Tasting",
        date: "2026-03-31",
        time: "2:00 PM",
        venue: "Total Wine — Greenpoint",
      },
    ],
    pastEvents: [
      {
        id: "past-013",
        name: "Beefeater Pink Gin Demo",
        date: "2026-02-12",
        venue: "Trader Joe's — Williamsburg",
        rating: 4.8,
        salesUnits: 14,
        punctualityScore: 100,
      },
      {
        id: "past-014",
        name: "Glenlivet 15yr Tasting",
        date: "2026-02-26",
        venue: "Costco — Sunset Park",
        rating: 4.6,
        salesUnits: 12,
        punctualityScore: 95,
      },
      {
        id: "past-015",
        name: "Jameson Cold Brew Demo",
        date: "2026-03-10",
        venue: "Whole Foods — Williamsburg",
        rating: 4.7,
        salesUnits: 13,
        punctualityScore: 98,
      },
    ],
    availability: generateAvailability(6),
    retailSalesAvg: 13.0,
    preferredBrands: ["Scotch", "Whiskey", "Gin"],
    checkInScore: 94,
    eventCompletionAvg: 97,
    retailerSurveyScore: 4.6,
    cancellationRating: 97,
    qualityScore: 84,
    trends: {
      retailSalesAvg: 0.8,
      checkInScore: 1,
      eventCompletionAvg: 0,
      retailerSurveyScore: 0.0,
      cancellationRating: 0,
      qualityScore: 0.6,
    },
  },
  {
    id: "edu-7",
    name: "Carlos Mendez",
    email: "carlos.mendez@gmail.com",
    phone: "+1 (862) 555-0707",
    status: "Inactive",
    avgRating: 4.1,
    salesPerEvent: 8.2,
    punctuality: 82,
    totalEvents: 15,
    joinedDate: "2025-10-18",
    distanceMiles: 35,
    eventsThisMonth: 0,
    eventsAssigned: 0,
    nextEvent: null,
    photoUrl: null,
    homeBase: "Paterson & Passaic, NJ",
    homeAddress: {
      street: "340 Main St, Suite 1B",
      city: "Paterson",
      state: "NJ",
      zip: "07505",
      lat: 40.9168,
      lng: -74.1718,
    },
    brandCertifications: ["Absolut", "Kahlua"],
    upcomingEvents: [],
    pastEvents: [
      {
        id: "past-016",
        name: "Absolut Lime Promo",
        date: "2026-01-18",
        venue: "Costco — Clifton",
        rating: 4.0,
        salesUnits: 8,
        punctualityScore: 80,
      },
      {
        id: "past-017",
        name: "Kahlua Holiday Demo",
        date: "2026-01-30",
        venue: "BJ's Wholesale — Totowa",
        rating: 4.2,
        salesUnits: 9,
        punctualityScore: 85,
      },
    ],
    availability: [],
    retailSalesAvg: 8.2,
    preferredBrands: ["Vodka", "Liqueur"],
    checkInScore: 72,
    eventCompletionAvg: 78,
    retailerSurveyScore: 3.5,
    cancellationRating: 70,
    qualityScore: 55,
    trends: {
      retailSalesAvg: -1.2,
      checkInScore: -5,
      eventCompletionAvg: -4,
      retailerSurveyScore: -0.4,
      cancellationRating: -8,
      qualityScore: -3.8,
    },
  },
  {
    id: "edu-8",
    name: "Lisa Thompson",
    email: "lisa.thompson@gmail.com",
    phone: "+1 (973) 555-0808",
    status: "Active",
    avgRating: 4.4,
    salesPerEvent: 10.7,
    punctuality: 94,
    totalEvents: 22,
    joinedDate: "2025-12-02",
    distanceMiles: 18,
    eventsThisMonth: 3,
    eventsAssigned: 1,
    nextEvent: {
      id: "evt-115",
      name: "Avion Reposado Tasting",
      date: "2026-03-25",
    },
    photoUrl: null,
    homeBase: "Morristown & Morris County, NJ",
    homeAddress: {
      street: "12 Elm St",
      city: "Morristown",
      state: "NJ",
      zip: "07960",
      lat: 40.7968,
      lng: -74.4815,
    },
    brandCertifications: ["Avion", "Glenlivet"],
    upcomingEvents: [
      {
        id: "evt-115",
        name: "Avion Reposado Tasting",
        date: "2026-03-25",
        time: "1:00 PM",
        venue: "Total Wine — Morristown",
      },
    ],
    pastEvents: [
      {
        id: "past-018",
        name: "Glenlivet Caribbean Reserve",
        date: "2026-02-18",
        venue: "Costco — Morris Plains",
        rating: 4.3,
        salesUnits: 10,
        punctualityScore: 92,
      },
      {
        id: "past-019",
        name: "Avion Silver Promo",
        date: "2026-03-04",
        venue: "Whole Foods — Short Hills",
        rating: 4.5,
        salesUnits: 11,
        punctualityScore: 95,
      },
    ],
    availability: generateAvailability(8),
    retailSalesAvg: 10.7,
    preferredBrands: ["Tequila", "Scotch"],
    checkInScore: 88,
    eventCompletionAvg: 93,
    retailerSurveyScore: 4.3,
    cancellationRating: 92,
    qualityScore: 78,
    trends: {
      retailSalesAvg: 0.6,
      checkInScore: 2,
      eventCompletionAvg: 1,
      retailerSurveyScore: 0.2,
      cancellationRating: 3,
      qualityScore: 1.8,
    },
  },
  {
    id: "edu-9",
    name: "Rachel Torres",
    email: "rachel.torres@gmail.com",
    phone: "+1 (646) 555-0909",
    status: "Pending Invitation",
    avgRating: 0,
    salesPerEvent: 0,
    punctuality: 0,
    totalEvents: 0,
    joinedDate: "2026-03-15",
    distanceMiles: 10,
    eventsThisMonth: 0,
    eventsAssigned: 0,
    nextEvent: null,
    photoUrl: null,
    homeBase: "Lower East Side & East Village, NY",
    homeAddress: {
      street: "198 Rivington St, Apt 6A",
      city: "New York",
      state: "NY",
      zip: "10002",
      lat: 40.7195,
      lng: -73.9831,
    },
    brandCertifications: [],
    upcomingEvents: [],
    pastEvents: [],
    availability: [],
    retailSalesAvg: 0,
    preferredBrands: [],
    checkInScore: 0,
    eventCompletionAvg: 0,
    retailerSurveyScore: 0,
    cancellationRating: 0,
    qualityScore: 0,
    trends: {
      retailSalesAvg: 0,
      checkInScore: 0,
      eventCompletionAvg: 0,
      retailerSurveyScore: 0,
      cancellationRating: 0,
      qualityScore: 0,
    },
  },
];

export function getEducatorById(id: string): Educator | undefined {
  return mockEducators.find((e) => e.id === id);
}
