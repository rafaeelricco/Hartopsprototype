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
}

// Generate availability for a 14-day window starting 2026-03-18
function generateAvailability(
  seed: number,
): Educator["availability"] {
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
    brandCertifications: [],
    upcomingEvents: [],
    pastEvents: [],
    availability: [],
  },
];

export function getEducatorById(id: string): Educator | undefined {
  return mockEducators.find((e) => e.id === id);
}
