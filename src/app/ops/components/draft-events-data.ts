/* ------------------------------------------------------------------ */
/* Draft Events – mock data for the ops draft review pipeline          */
/* ------------------------------------------------------------------ */

export type DraftSource = "Email" | "Excel Upload" | "Manual";
export type DraftStatus = "pending" | "approved" | "rejected";

export interface ReviewChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface DraftEventRecord {
  id: string;
  name: string;
  organization: string;
  orgId: number;
  campaignName: string;
  type: "In-Person" | "Virtual" | "Hybrid";
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  description: string;
  source: DraftSource;
  submittedAt: string;
  submittedBy: string;
  submittedByEmail: string;
  missingFields: string[];
  notes: string;
  status: DraftStatus;
  reviewChecklist: ReviewChecklistItem[];
  products: string[];
  venueType: string;
}

function makeChecklist(overrides?: Partial<Record<string, boolean>>): ReviewChecklistItem[] {
  const items: { id: string; label: string }[] = [
    { id: "account", label: "Account exists in Account Master" },
    { id: "date", label: "Date and time confirmed with client" },
    { id: "products", label: "Products linked to campaign" },
    { id: "educator", label: "Educator assignment needed" },
    { id: "budget", label: "Budget allocation confirmed" },
  ];
  return items.map((it) => ({
    ...it,
    checked: overrides?.[it.id] ?? false,
  }));
}

export const MOCK_DRAFT_EVENTS: DraftEventRecord[] = [
  {
    id: "DRAFT-001",
    name: "Jameson St. Patrick's Tasting — Murray's Tavern",
    organization: "Acme Corp",
    orgId: 1,
    campaignName: "Jameson St. Patrick's 2026",
    type: "In-Person",
    date: "Mar 28, 2026",
    startTime: "6:00 PM",
    endTime: "9:00 PM",
    location: "Murray's Tavern, 123 W Broadway, New York, NY",
    capacity: 50,
    description: "Off-premise sampling event at Murray's Tavern for St. Patrick's week campaign. Jameson Original and Cold Brew.",
    source: "Email",
    submittedAt: "Mar 21, 2026 10:14 AM",
    submittedBy: "Tom Bradley",
    submittedByEmail: "tom.bradley@pernod-ricard.com",
    missingFields: [],
    notes: "Client confirmed 2 hours setup time before event start.",
    status: "pending",
    reviewChecklist: makeChecklist({ account: true, date: true, products: true }),
    products: ["Jameson Original", "Jameson Cold Brew"],
    venueType: "Bar / Tavern",
  },
  {
    id: "DRAFT-002",
    name: "Absolut Summer Kick-Off — BevMo Westside",
    organization: "Vanguard LLC",
    orgId: 2,
    campaignName: "Absolut Summer Series",
    type: "In-Person",
    date: "Apr 2, 2026",
    startTime: "3:00 PM",
    endTime: "7:00 PM",
    location: "BevMo #412, 8901 Pico Blvd, Los Angeles, CA",
    capacity: 80,
    description: "In-store demo and tasting for Absolut Vodka summer flavors launch.",
    source: "Excel Upload",
    submittedAt: "Mar 20, 2026 3:45 PM",
    submittedBy: "Bulk Upload – Sarah Chen",
    submittedByEmail: "sarah.chen@vanguardllc.com",
    missingFields: ["educator"],
    notes: "Part of batch upload (12 events). Educator assignment pending — LA market.",
    status: "pending",
    reviewChecklist: makeChecklist({ account: true, date: true, products: true }),
    products: ["Absolut Original", "Absolut Watermelon", "Absolut Mango"],
    venueType: "Retail / Off-Premise",
  },
  {
    id: "DRAFT-003",
    name: "Hendrick's Gin Dinner — The Capital Grille",
    organization: "Zenith Group",
    orgId: 3,
    campaignName: "Hendrick's On-Premise Q2",
    type: "In-Person",
    date: "Apr 5, 2026",
    startTime: "7:00 PM",
    endTime: "10:00 PM",
    location: "The Capital Grille, 155 E 42nd St, New York, NY",
    capacity: 30,
    description: "Exclusive cocktail dinner pairing Hendrick's Gin with 4-course meal. White tablecloth event.",
    source: "Email",
    submittedAt: "Mar 22, 2026 9:30 AM",
    submittedBy: "Margaret Liu",
    submittedByEmail: "margaret.liu@william-grant.com",
    missingFields: ["budget"],
    notes: "Client wants premium educator with cocktail certification. Budget TBD — awaiting approval from brand manager.",
    status: "pending",
    reviewChecklist: makeChecklist({ account: true, date: true }),
    products: ["Hendrick's Gin", "Hendrick's Neptunia"],
    venueType: "Restaurant / On-Premise",
  },
  {
    id: "DRAFT-004",
    name: "Espolòn Tequila Tasting — Total Wine Midtown",
    organization: "Acme Corp",
    orgId: 1,
    campaignName: "Espolòn Spring Campaign",
    type: "In-Person",
    date: "Mar 29, 2026",
    startTime: "1:00 PM",
    endTime: "5:00 PM",
    location: "Total Wine & More, 234 5th Ave, New York, NY",
    capacity: 100,
    description: "Weekend in-store demo for Espolòn Blanco and Reposado at Total Wine flagship.",
    source: "Email",
    submittedAt: "Mar 22, 2026 2:15 PM",
    submittedBy: "Carlos Mendez",
    submittedByEmail: "carlos.mendez@campari.com",
    missingFields: [],
    notes: "Repeat event from last month. Same setup. Educator Maria Santos requested by client.",
    status: "pending",
    reviewChecklist: makeChecklist({ account: true, date: true, products: true, educator: true, budget: true }),
    products: ["Espolòn Blanco", "Espolòn Reposado"],
    venueType: "Retail / Off-Premise",
  },
  {
    id: "DRAFT-005",
    name: "Grey Goose VIP Lounge — Barclays Center",
    organization: "Nova Systems",
    orgId: 4,
    campaignName: "",
    type: "In-Person",
    date: "Apr 10, 2026",
    startTime: "5:00 PM",
    endTime: "11:00 PM",
    location: "Barclays Center, 620 Atlantic Ave, Brooklyn, NY",
    capacity: 200,
    description: "VIP lounge activation during Brooklyn Nets game. Pour bar service with Grey Goose cocktails.",
    source: "Manual",
    submittedAt: "Mar 23, 2026 8:00 AM",
    submittedBy: "Admin Hart",
    submittedByEmail: "admin@hartops.com",
    missingFields: ["products", "budget"],
    notes: "One-off event — no campaign. Need 4 educators minimum. Premium event rates apply.",
    status: "pending",
    reviewChecklist: makeChecklist({ account: true, date: true }),
    products: [],
    venueType: "Venue / Arena",
  },
  {
    id: "DRAFT-006",
    name: "Maker's Mark Bourbon Tasting — Whole Foods Columbus Circle",
    organization: "Meridian Partners",
    orgId: 6,
    campaignName: "Maker's Mark Spring Tour",
    type: "In-Person",
    date: "Mar 30, 2026",
    startTime: "2:00 PM",
    endTime: "6:00 PM",
    location: "Whole Foods, 10 Columbus Circle, New York, NY",
    capacity: 60,
    description: "In-store bourbon tasting and education event. Focus on Maker's Mark 46 and Private Select.",
    source: "Excel Upload",
    submittedAt: "Mar 20, 2026 3:45 PM",
    submittedBy: "Bulk Upload – Sarah Chen",
    submittedByEmail: "sarah.chen@vanguardllc.com",
    missingFields: [],
    notes: "Part of batch upload (12 events). All fields verified. Ready for review.",
    status: "pending",
    reviewChecklist: makeChecklist({ account: true, date: true, products: true, educator: true, budget: true }),
    products: ["Maker's Mark Original", "Maker's Mark 46", "Maker's Mark Private Select"],
    venueType: "Retail / Off-Premise",
  },
  {
    id: "DRAFT-007",
    name: "Virtual Mixology Class — Campari Group",
    organization: "Catalyst Inc.",
    orgId: 7,
    campaignName: "Campari Virtual Series",
    type: "Virtual",
    date: "Apr 8, 2026",
    startTime: "6:30 PM",
    endTime: "8:00 PM",
    location: "Zoom (Online)",
    capacity: 40,
    description: "Virtual cocktail-making class showcasing Campari and Aperol spritz recipes for trade accounts.",
    source: "Email",
    submittedAt: "Mar 21, 2026 4:50 PM",
    submittedBy: "Nina Rossi",
    submittedByEmail: "nina.rossi@camparigroup.com",
    missingFields: ["educator"],
    notes: "Need educator with virtual event experience. Client will ship kits to attendees.",
    status: "pending",
    reviewChecklist: makeChecklist({ date: true, products: true, budget: true }),
    products: ["Campari", "Aperol"],
    venueType: "Virtual",
  },
  {
    id: "DRAFT-008",
    name: "Woodford Reserve Derby Preview — The Oak Room",
    organization: "Pinnacle Ventures",
    orgId: 8,
    campaignName: "",
    type: "In-Person",
    date: "Apr 15, 2026",
    startTime: "5:00 PM",
    endTime: "9:00 PM",
    location: "The Oak Room, 768 5th Ave, New York, NY",
    capacity: 45,
    description: "Pre-Kentucky Derby cocktail event featuring Woodford Reserve signature mint julep and old fashioned.",
    source: "Email",
    submittedAt: "Mar 23, 2026 11:20 AM",
    submittedBy: "David Park",
    submittedByEmail: "david.park@brown-forman.com",
    missingFields: ["account", "date"],
    notes: "Venue not yet confirmed — pending contract. Tentative date. Do NOT approve until venue lock.",
    status: "pending",
    reviewChecklist: makeChecklist(),
    products: ["Woodford Reserve Bourbon", "Woodford Reserve Rye"],
    venueType: "Restaurant / On-Premise",
  },
];
