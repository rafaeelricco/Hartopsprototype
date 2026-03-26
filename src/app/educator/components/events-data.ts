// Events data for Educator Manager
// Scoped to the manager's assigned educator set only
// Status model per mm-ui-006: 7 lifecycle states
import { mockEducators } from "./educator-roster-data";

export type EventStatus =
  | "Unassigned"
  | "Pending"
  | "Confirmed"
  | "Live"
  | "Completed"
  | "Finalized"
  | "Cancelled";

export type EventType = "Tasting" | "Demo" | "Activation" | "Promo";
export type AccountType = "Retail" | "Wholesale" | "Pop-up";
export type VenueType =
  | "Retail"
  | "Bar/Restaurant"
  | "Pop-up"
  | "Grocery"
  | "Event Space";
export type CancellationReason =
  | "Weather"
  | "Illness"
  | "Car Accident"
  | "Retailer Cancellation"
  | "Other";

export type StatusDisplayGroup =
  | "Upcoming"
  | "Live"
  | "Completed"
  | "Cancelled";

export type AssignmentStatus = "Pending" | "Accepted" | "Declined";

export interface AssignedEducator {
  educatorId: string;
  educatorName: string;
  assignmentStatus: AssignmentStatus;
}

export interface QuestionnaireResponse {
  questionId: string;
  questionText: string;
  type: "rating" | "yes-no" | "multiple-choice" | "open-text" | "dropdown";
  answer: string;
  options?: string[];
}

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
  borough?: string;
  state: string;
  venueType: VenueType;
  accountType: AccountType;
  eventType: EventType;
  educatorId: string | null;
  educatorName: string | null;
  assignedEducators?: AssignedEducator[];
  status: EventStatus;
  products: string[];
  instructions: string;
  goals: string;
  notes?: string;
  // Pre-event fields (mm-ui-002 Pre-Event Detail View)
  compensation?: { rate: string; notes?: string };
  kitMaterials?: { pickupLocation: string; items: string[] };
  storeContactName?: string;
  storeContactPhone?: string;
  storeContactEmail?: string;
  // Live event fields
  checkInStatus?: "checked-in" | "pending" | "failed";
  checkInTime?: string;
  liveMetrics?: {
    samplesDistributed: number;
    consumerInteractions: number;
    salesGenerated: number;
  };
  questionnairesCompleted?: number;
  educatorLiveNotes?: string[];
  inventoryData?: { preEvent: number; current: number };
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
  inventoryComparison?: { preEvent: number; postEvent: number };
  questionnairesCompletedFinal?: number;
  questionnaireResponsesFinal?: QuestionnaireResponse[];
  educatorNotesFinal?: string;
  photoCategories?: {
    receipts: string[];
    socialMedia: string[];
    venue: string[];
  };
  completedAt?: string;
  finalizedAt?: string | null;
  // Cancellation
  cancellationReason?: CancellationReason;
  cancelledAt?: string;
}

// --- Status helpers ---

const PRE_EVENT_STATUSES: EventStatus[] = [
  "Unassigned",
  "Pending",
  "Confirmed",
];

export function isUpcoming(status: EventStatus): boolean {
  return PRE_EVENT_STATUSES.includes(status);
}

export function getStatusDisplayGroup(status: EventStatus): StatusDisplayGroup {
  if (isUpcoming(status)) return "Upcoming";
  if (status === "Live") return "Live";
  if (status === "Cancelled") return "Cancelled";
  return "Completed"; // Completed + Finalized
}

// --- Mock data ---

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
    borough: "Manhattan",
    state: "NY",
    venueType: "Grocery",
    accountType: "Retail",
    eventType: "Tasting",
    educatorId: null,
    educatorName: null,
    status: "Unassigned",
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
    compensation: { rate: "$35/hr", notes: "4-hour minimum" },
    kitMaterials: {
      pickupLocation: "Hart Ops Warehouse, 120 W 31st St, NYC",
      items: [
        "Absolut branded table cover",
        "Tasting cups (200ct)",
        "Recipe cards",
        "Ice bucket + tongs",
      ],
    },
    storeContactName: "John D.",
    storeContactPhone: "917-555-0142",
    storeContactEmail: "john.d@wholefoods.com",
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
    borough: "Jersey City",
    state: "NJ",
    venueType: "Retail",
    accountType: "Retail",
    eventType: "Promo",
    educatorId: "edu-2",
    educatorName: "Sarah Chen",
    assignedEducators: [
      {
        educatorId: "edu-2",
        educatorName: "Sarah Chen",
        assignmentStatus: "Accepted",
      },
    ],
    status: "Live",
    products: ["Jameson Original", "Jameson Black Barrel", "Jameson Cold Brew"],
    instructions:
      "Station near the whiskey endcap. Highlight the Cold Brew for younger consumers.",
    goals: "60+ samplings, 10+ sales, push Cold Brew variant.",
    notes: "Endcap display pre-arranged with store. Backup table in car.",
    compensation: { rate: "$35/hr" },
    storeContactName: "Mike R.",
    storeContactPhone: "201-555-0311",
    storeContactEmail: "mike.r@totalwine.com",
    checkInStatus: "checked-in",
    checkInTime: "3:52 PM",
    liveMetrics: {
      samplesDistributed: 34,
      consumerInteractions: 28,
      salesGenerated: 6,
    },
    questionnairesCompleted: 12,
    educatorLiveNotes: [
      "3:55 PM — Setup complete, good foot traffic already.",
      "4:30 PM — Cold Brew getting strong interest from 25-35 demographic.",
      "5:15 PM — Store manager added endcap signage, helping visibility.",
    ],
    inventoryData: { preEvent: 48, current: 42 },
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
    borough: "Hoboken",
    state: "NJ",
    venueType: "Retail",
    accountType: "Retail",
    eventType: "Activation",
    educatorId: "edu-3",
    educatorName: "James Rodriguez",
    status: "Completed",
    products: ["Malibu Original", "Malibu Strawberry", "Malibu Pineapple"],
    instructions: "Summer theme setup. Use provided beach-themed table runner.",
    goals: "100+ samplings, 20+ cases sold.",
    notes:
      "Beach-themed POS materials in educator kit. Manager: Lisa T. (201-555-0198)",
    compensation: { rate: "$35/hr" },
    storeContactName: "Lisa T.",
    storeContactPhone: "201-555-0198",
    storeContactEmail: "lisa.t@bevmo.com",
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
    inventoryComparison: { preEvent: 60, postEvent: 42 },
    questionnairesCompletedFinal: 34,
    questionnaireResponsesFinal: [
      {
        questionId: "q-1",
        questionText: "How was the venue setup?",
        type: "rating",
        answer: "4",
      },
      {
        questionId: "q-2",
        questionText: "Were all required products available at the venue?",
        type: "yes-no",
        answer: "Yes",
      },
      {
        questionId: "q-3",
        questionText: "Estimate the foot traffic during the event",
        type: "multiple-choice",
        answer: "High (150-300)",
      },
      {
        questionId: "q-4",
        questionText: "Describe the consumer demographic",
        type: "multiple-choice",
        answer: "26-35",
      },
      {
        questionId: "q-5",
        questionText:
          "Were there any competitor promotions active at the venue?",
        type: "yes-no",
        answer: "No",
      },
      {
        questionId: "q-6",
        questionText: "Rate the overall consumer engagement",
        type: "rating",
        answer: "5",
      },
      {
        questionId: "q-7",
        questionText: "Any compliance issues to report?",
        type: "open-text",
        answer:
          "None, everything was good. the store was real nice about letting us set up early and they even helped move some stuff around so we could get the table in a better spot. no issues at all",
      },
      {
        questionId: "q-extra-1",
        questionText: "Describe consumer feedback on the product",
        type: "open-text",
        answer:
          "People loved the pineapple flavor alot. some peple said it was too sweet but most were into it. a couple guys asked if we had any merch or swag to give away which we didnt have. the malibu original was also popular but pineapple was the winner for sure",
      },
      {
        questionId: "q-extra-2",
        questionText: "Any additional notes or observations?",
        type: "open-text",
        answer:
          "store manager lisa was super cool and said she wants to do another one next month. she said the display looked great and drew alot of ppl over. i think we should def come back here its a great location",
      },
      {
        questionId: "q-dd-1",
        questionText: "How would you describe the venue type?",
        type: "dropdown",
        answer: "Liquor Store",
        options: [
          "Bar/Lounge",
          "Liquor Store",
          "Grocery/Supermarket",
          "Restaurant",
          "Event Venue",
          "Convenience Store",
          "Other",
        ],
      },
      {
        questionId: "q-dd-2",
        questionText: "What was the primary product interest?",
        type: "dropdown",
        answer: "Flavored",
        options: [
          "Original",
          "Flavored",
          "Premium/Aged",
          "Mixed/Cocktails",
          "No clear preference",
        ],
      },
      {
        questionId: "q-dd-3",
        questionText: "Overall compliance status",
        type: "dropdown",
        answer: "Fully Compliant",
        options: [
          "Fully Compliant",
          "Minor Issues",
          "Major Issues",
          "Non-Compliant",
        ],
      },
    ],
    educatorNotesFinal:
      "Great event. Pineapple variant was the crowd favorite. Several customers asked about Malibu merch. Store manager offered to extend the activation next month.",
    photoCategories: {
      receipts: ["/placeholder-photo-1.jpg", "/placeholder-photo-2.jpg"],
      socialMedia: ["/placeholder-photo-3.jpg", "/placeholder-photo-4.jpg"],
      venue: [
        "/placeholder-photo-5.jpg",
        "/placeholder-photo-6.jpg",
        "/placeholder-photo-7.jpg",
        "/placeholder-photo-8.jpg",
      ],
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
    borough: "Brooklyn",
    state: "NY",
    venueType: "Grocery",
    accountType: "Retail",
    eventType: "Demo",
    educatorId: null,
    educatorName: null,
    status: "Unassigned",
    products: ["Kahlúa Original", "Kahlúa Vanilla", "Kahlúa Mint Mocha"],
    instructions:
      "Espresso martini recipe cards on table. Demo the espresso martini prep.",
    goals: "50+ samplings, 12+ bottle sales.",
    notes:
      "Bring portable espresso machine from warehouse. Store has power outlet at endcap.",
    compensation: { rate: "$35/hr", notes: "Equipment setup bonus: +$25" },
    kitMaterials: {
      pickupLocation: "Hart Ops Warehouse, 120 W 31st St, NYC",
      items: [
        "Portable espresso machine",
        "Kahlúa branded apron",
        "Recipe cards (100ct)",
        "Cocktail shaker set",
        "Martini glasses (12ct)",
      ],
    },
    storeContactName: "Tom W.",
    storeContactPhone: "718-555-0244",
    storeContactEmail: "tom.w@traderjoes.com",
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
    borough: "Hackensack",
    state: "NJ",
    venueType: "Retail",
    accountType: "Wholesale",
    eventType: "Activation",
    educatorId: "edu-5",
    educatorName: "Maria Santos",
    assignedEducators: [
      {
        educatorId: "edu-5",
        educatorName: "Maria Santos",
        assignmentStatus: "Accepted",
      },
      {
        educatorId: "edu-8",
        educatorName: "Lisa Thompson",
        assignmentStatus: "Pending",
      },
    ],
    status: "Confirmed",
    products: ["Beefeater London Dry 1.75L", "Beefeater Pink 750ml"],
    instructions:
      "Use the provided Costco-approved sampling setup. Focus on G&T pairing suggestions.",
    goals: "120+ samplings, 30+ unit sales.",
    notes:
      "Costco requires wristband check for samples. Arrive 30 min early for badge.",
    compensation: { rate: "$40/hr", notes: "Wholesale venue premium rate" },
    storeContactName: "Dave P.",
    storeContactPhone: "201-555-0477",
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
    borough: "Manhattan",
    state: "NY",
    venueType: "Pop-up",
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
    compensation: { rate: "$45/hr", notes: "Premium brand rate" },
    storeContactName: "Alex M.",
    storeContactPhone: "212-555-0399",
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
    inventoryComparison: { preEvent: 36, postEvent: 25 },
    questionnairesCompletedFinal: 22,
    questionnaireResponsesFinal: [
      {
        questionId: "q-1",
        questionText: "How was the venue setup?",
        type: "rating",
        answer: "5",
      },
      {
        questionId: "q-2",
        questionText: "Were all required products available at the venue?",
        type: "yes-no",
        answer: "Yes",
      },
      {
        questionId: "q-3",
        questionText: "Estimate the foot traffic during the event",
        type: "multiple-choice",
        answer: "Medium (50-150)",
      },
      {
        questionId: "q-4",
        questionText: "Describe the consumer demographic",
        type: "multiple-choice",
        answer: "36-45",
      },
      {
        questionId: "q-5",
        questionText:
          "Were there any competitor promotions active at the venue?",
        type: "yes-no",
        answer: "No",
      },
      {
        questionId: "q-6",
        questionText: "Rate the overall consumer engagement",
        type: "rating",
        answer: "5",
      },
      {
        questionId: "q-7",
        questionText: "Any compliance issues to report?",
        type: "open-text",
        answer:
          "no compliance issues. everything went smooth. venue staff was very professional and accomodating. they had a nice area setup for us already which was great",
      },
      {
        questionId: "q-extra-1",
        questionText: "Describe consumer feedback on the product",
        type: "open-text",
        answer:
          "the 18 year was def the star of the show. alot of corporate types came through and were super impressed. got a few business cards from ppl interested in buying cases. the 12 year was also solid but ppl really gravitated to the premium stuff. one guy said it was the best scotch tasting hes ever been to lol",
      },
      {
        questionId: "q-extra-2",
        questionText: "Any additional notes or observations?",
        type: "open-text",
        answer:
          "this is a amazing venue for prestige brands. the crowd is exactly the right demo. i would strongly suggest we do more events here. the eataly / chelsea market traffic really helps bring ppl in",
      },
      {
        questionId: "q-dd-1",
        questionText: "How would you describe the venue type?",
        type: "dropdown",
        answer: "Restaurant",
        options: [
          "Bar/Lounge",
          "Liquor Store",
          "Grocery/Supermarket",
          "Restaurant",
          "Event Venue",
          "Convenience Store",
          "Other",
        ],
      },
      {
        questionId: "q-dd-2",
        questionText: "What was the primary product interest?",
        type: "dropdown",
        answer: "Premium/Aged",
        options: [
          "Original",
          "Flavored",
          "Premium/Aged",
          "Mixed/Cocktails",
          "No clear preference",
        ],
      },
      {
        questionId: "q-dd-3",
        questionText: "Overall compliance status",
        type: "dropdown",
        answer: "Fully Compliant",
        options: [
          "Fully Compliant",
          "Minor Issues",
          "Major Issues",
          "Non-Compliant",
        ],
      },
    ],
    educatorNotesFinal:
      "Exceptional crowd. Several corporate buyers interested in bulk orders. The 18-year expression was the top seller. Suggest repeating this venue for the next prestige launch.",
    photoCategories: {
      receipts: [
        "/placeholder-photo-1.jpg",
        "/placeholder-photo-2.jpg",
        "/placeholder-photo-3.jpg",
      ],
      socialMedia: [
        "/placeholder-photo-4.jpg",
        "/placeholder-photo-5.jpg",
        "/placeholder-photo-6.jpg",
      ],
      venue: [
        "/placeholder-photo-7.jpg",
        "/placeholder-photo-8.jpg",
        "/placeholder-photo-9.jpg",
        "/placeholder-photo-10.jpg",
        "/placeholder-photo-11.jpg",
        "/placeholder-photo-12.jpg",
      ],
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
    borough: "Manhattan",
    state: "NY",
    venueType: "Retail",
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
    compensation: { rate: "$40/hr" },
    storeContactName: "Alex K.",
    storeContactPhone: "212-555-0188",
    storeContactEmail: "alex.k@astorwines.com",
    checkInStatus: "failed",
    liveMetrics: {
      samplesDistributed: 18,
      consumerInteractions: 15,
      salesGenerated: 3,
    },
    questionnairesCompleted: 7,
    educatorLiveNotes: [
      "4:50 PM — Setup complete. Copper mugs are a hit for display.",
      "5:20 PM — Steady stream of interest. Craft story resonates well.",
    ],
    inventoryData: { preEvent: 24, current: 21 },
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
    borough: "Manhattan",
    state: "NY",
    venueType: "Retail",
    accountType: "Retail",
    eventType: "Activation",
    educatorId: "edu-7",
    educatorName: "Carlos Mendez",
    assignedEducators: [
      {
        educatorId: "edu-7",
        educatorName: "Carlos Mendez",
        assignmentStatus: "Pending",
      },
    ],
    status: "Pending",
    products: ["Avión Silver", "Avión Reposado", "Avión Añejo"],
    instructions:
      "Taste all three expressions. Lead with Silver, finish with Añejo. Use agave-themed display.",
    goals: "70+ samplings, 15+ bottles sold.",
    notes:
      "Agave plant props available in warehouse kit #12. Confirm pickup day-of.",
    compensation: { rate: "$35/hr" },
    kitMaterials: {
      pickupLocation: "Hart Ops Warehouse, 120 W 31st St, NYC",
      items: [
        "Agave plant props (kit #12)",
        "Avión branded table cover",
        "Tasting cups (200ct)",
        "Expression flight cards",
      ],
    },
    storeContactName: "Nina S.",
    storeContactPhone: "212-555-0533",
  },
  // Finalized event — locked, data available for reporting
  {
    id: "evt-109",
    name: "Hendrick's Gin Garden Party",
    campaignName: "Hendrick's Curiosities",
    brandName: "Hendrick's",
    clientName: "William Grant & Sons",
    date: "2026-03-15",
    time: "1:00 PM – 5:00 PM",
    duration: "4h",
    venue: "Eataly, Flatiron",
    venueAddress: "200 5th Ave, New York, NY 10010",
    borough: "Manhattan",
    state: "NY",
    venueType: "Bar/Restaurant",
    accountType: "Retail",
    eventType: "Activation",
    educatorId: "edu-1",
    educatorName: "Ana Martinez",
    status: "Finalized",
    products: [
      "Hendrick's Original",
      "Hendrick's Neptunia",
      "Hendrick's Orbium",
    ],
    instructions:
      "Garden party theme. Use cucumber garnishes and floral arrangements. Neat and G&T pours.",
    goals: "60+ tastings, 12+ bottles sold.",
    compensation: { rate: "$40/hr" },
    storeContactName: "Marco V.",
    storeContactPhone: "212-555-0621",
    checkInStatus: "checked-in",
    checkInTime: "12:45 PM",
    finalStats: {
      totalSamples: 72,
      totalInteractions: 58,
      totalSales: 15,
      rating: 4.9,
      photosSubmitted: 10,
      duration: "4h 05m",
    },
    inventoryComparison: { preEvent: 40, postEvent: 25 },
    questionnairesCompletedFinal: 28,
    educatorNotesFinal:
      "Phenomenal event. The garden party theme drew a lot of attention. Neptunia was the surprise hit — outsold Original 2:1. Several customers asked about future tastings.",
    photoCategories: {
      receipts: ["/placeholder-photo-1.jpg", "/placeholder-photo-2.jpg"],
      socialMedia: [
        "/placeholder-photo-3.jpg",
        "/placeholder-photo-4.jpg",
        "/placeholder-photo-5.jpg",
      ],
      venue: [
        "/placeholder-photo-6.jpg",
        "/placeholder-photo-7.jpg",
        "/placeholder-photo-8.jpg",
        "/placeholder-photo-9.jpg",
        "/placeholder-photo-10.jpg",
      ],
    },
    completedAt: "2026-03-15T17:05:00",
    finalizedAt: "2026-03-16T09:30:00",
    photoCount: 10,
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
    ],
  },
  // Cancelled event — terminal state
  {
    id: "evt-110",
    name: "Maker's Mark Bourbon Tasting",
    campaignName: "Maker's Mark Spring",
    brandName: "Maker's Mark",
    clientName: "Beam Suntory",
    date: "2026-03-17",
    time: "3:00 PM – 7:00 PM",
    duration: "4h",
    venue: "Liquor Barn, Newark",
    venueAddress: "50 Market St, Newark, NJ 07102",
    borough: "Newark",
    state: "NJ",
    venueType: "Retail",
    accountType: "Retail",
    eventType: "Tasting",
    educatorId: null,
    educatorName: null,
    status: "Cancelled",
    products: [
      "Maker's Mark Original",
      "Maker's 46",
      "Maker's Mark Cask Strength",
    ],
    instructions: "Standard bourbon tasting setup. Offer neat pours only.",
    goals: "50+ tastings, 10+ bottles sold.",
    compensation: { rate: "$35/hr" },
    storeContactName: "Ray P.",
    storeContactPhone: "973-555-0744",
    cancellationReason: "Retailer Cancellation",
    cancelledAt: "2026-03-16T14:00:00",
  },
];

// --- Query helpers ---

export function getEventById(id: string): EventItem | undefined {
  const found = mockEvents.find((e) => e.id === id);
  if (found) return found;

  // Fallback for past events defined in the educator roster
  if (id.startsWith("past-")) {
    for (const edu of mockEducators) {
      const past = edu.pastEvents.find((pe) => pe.id === id);
      if (past) {
        return {
          id: past.id,
          name: past.name,
          campaignName: "Archived Campaign",
          brandName: "Archived Brand",
          clientName: "Archived Client",
          date: past.date,
          time: "12:00 PM – 4:00 PM",
          duration: "4h",
          venue: past.venue,
          venueAddress: "Address on file",
          state: "NY",
          venueType: "Retail",
          accountType: "Retail",
          eventType: "Tasting",
          educatorId: edu.id,
          educatorName: edu.name,
          assignedEducators: [
            {
              educatorId: edu.id,
              educatorName: edu.name,
              assignmentStatus: "Accepted",
            },
          ],
          status: "Finalized",
          products: ["Assorted Products"],
          instructions: "Archived instructions.",
          goals: "Archived goals.",
          finalStats: {
            totalSamples: past.salesUnits * 4,
            totalInteractions: past.salesUnits * 6,
            totalSales: past.salesUnits,
            rating: past.rating,
            photosSubmitted: 4,
            duration: "4h",
          },
          inventoryComparison: {
            preEvent: 30,
            postEvent: 30 - past.salesUnits,
          },
          questionnairesCompletedFinal: Math.floor(past.salesUnits * 1.5),
          educatorNotesFinal: "Event completed successfully. (Archived record)",
          photoCategories: {
            receipts: [],
            socialMedia: [],
            venue: [],
          },
          completedAt: `${past.date}T17:00:00`,
          finalizedAt: `${past.date}T18:00:00`,
          photoCount: 0,
          photoUrls: [],
        };
      }
    }
  }

  return undefined;
}

export function getEventsByStatus(status: EventStatus): EventItem[] {
  return mockEvents.filter((e) => e.status === status);
}

export function getUpcomingEvents(): EventItem[] {
  return mockEvents.filter((e) => isUpcoming(e.status));
}

export function getEventsRequiringAttention(): EventItem[] {
  return mockEvents.filter(
    (e) =>
      e.status === "Unassigned" ||
      (e.status === "Completed" && !e.finalizedAt) ||
      e.status === "Pending",
  );
}
