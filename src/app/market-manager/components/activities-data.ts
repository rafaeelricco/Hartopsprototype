// Events data for Market Manager
// Scoped to the manager's assigned brandAmbassador set only
// Status model per mm-ui-006: 7 lifecycle states
import { mockBrandAmbassadors } from "./brand-ambassador-roster-data";
import { isoFromToday } from "./dashboard-domain";
import type {
  CheckInException,
  KitStatus,
  PremiseType,
  SlaApproval,
} from "./dashboard-domain";

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
  | "Activity Space";
export type CancellationReason =
  | "Weather"
  | "Illness"
  | "Car Accident"
  | "Retailer Cancellation"
  | "Other";

// ─── Product & Sales Types ───

export interface CampaignProduct {
  id: string;
  name: string;
  unitPrice?: number;
}

export interface TrackedProductSale {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice?: number;
}

// ─── Venue Classification ───

export type PremiseCategory = "on-premise" | "off-premise";

export function getPremiseCategory(venueType: VenueType): PremiseCategory {
  const onPremise: VenueType[] = ["Bar/Restaurant", "Activity Space"];
  return onPremise.includes(venueType) ? "on-premise" : "off-premise";
}

export function getSalesLabel(venueType: VenueType) {
  const premise = getPremiseCategory(venueType);
  return premise === "on-premise"
    ? { unit: "Drinks", action: "drinks served" }
    : { unit: "Bottles", action: "bottles sold" };
}

export type StatusDisplayGroup =
  | "Upcoming"
  | "Live"
  | "Completed"
  | "Cancelled";

export type AssignmentStatus =
  | "Pending"
  | "Accepted"
  | "Declined"
  | "Withdrawn";

export interface AssignedBrandAmbassador {
  brandAmbassadorId: string;
  brandAmbassadorName: string;
  assignmentStatus: AssignmentStatus;
  offeredAt?: string;
  respondedAt?: string;
  declineReason?: string;
  expiresAt?: string;
}

export function computeEventStatusFromAssignments(
  brandAmbassadors: AssignedBrandAmbassador[],
): EventStatus {
  if (brandAmbassadors.length === 0) return "Unassigned";
  const hasAccepted = brandAmbassadors.some((e) => e.assignmentStatus === "Accepted");
  const allDeclinedOrWithdrawn = brandAmbassadors.every(
    (e) =>
      e.assignmentStatus === "Declined" || e.assignmentStatus === "Withdrawn",
  );
  if (hasAccepted) return "Confirmed";
  if (allDeclinedOrWithdrawn) return "Unassigned";
  return "Pending";
}

export interface QuestionnaireResponse {
  questionId: string;
  questionText: string;
  type: "rating" | "yes-no" | "multiple-choice" | "open-text" | "dropdown";
  answer: string;
  options?: string[];
}

export interface PreApprovalCheck {
  id: string;
  label: string;
  required: boolean;
}

export interface Activity {
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
  venueLat?: number;
  venueLng?: number;
  borough?: string;
  state: string;
  venueType: VenueType;
  accountType: AccountType;
  eventType: EventType;
  brandAmbassadorId: string | null;
  brandAmbassadorName: string | null;
  assignedBrandAmbassadors?: AssignedBrandAmbassador[];
  status: EventStatus;
  products: string[];
  campaignProducts?: CampaignProduct[];
  salesTarget?: number;
  bonusThreshold?: number;
  instructions: string;
  goals: string;
  notes?: string;
  // Pre-event fields (mm-ui-002 Pre-Event Detail View)
  compensation?: { rate: string; notes?: string };
  kitMaterials?: { pickupLocation: string; items: string[] };
  storeContactName?: string;
  storeContactPhone?: string;
  storeContactEmail?: string;
  // ── Workflow dashboard fields (IMP-1697) ──────────────────────────────────
  // Canonical territory. `borough` predates the region model and acts as the
  // fallback for older records; new records set `territory` directly so
  // non-borough territories (Nassau, Suffolk, Westchester) can be expressed.
  territory?: string;
  premiseType?: PremiseType;
  // Kit & samples state. Kit collection gates check-in, so an uncollected kit
  // the day before an activity is a hard blocker.
  kitStatus?: KitStatus;
  kitPreparedAt?: string; // ISO — stamped when samples are pulled
  kitOutOfStockItems?: number;
  // Pre-execution SLA approval gate (red/green). Distinct from `slaCapture`,
  // which is the post-activity receipt verification.
  slaApproval?: SlaApproval;
  checkInException?: CheckInException;
  // Stamped when the BA submits their recap. Absent + window lapsed = overdue.
  recapSubmittedAt?: string;
  // Live event fields
  checkInStatus?: "checked-in" | "pending" | "failed";
  checkInTime?: string;
  // Punctuality tracking (ISO timestamps)
  scheduledStart?: string;
  actualCheckIn?: string;
  scheduledEnd?: string;
  actualCheckOut?: string;
  liveMetrics?: {
    samplesDistributed: number;
    consumerInteractions: number;
    salesGenerated: number;
    salesByProduct?: TrackedProductSale[];
  };
  questionnairesCompleted?: number;
  brandAmbassadorLiveNotes?: string[];
  inventoryData?: { preEvent: number; current: number };
  photoCount?: number;
  photoUrls?: string[];
  // Completed event fields
  finalStats?: {
    totalSamples: number;
    totalInteractions: number;
    totalSales: number;
    salesByProduct?: TrackedProductSale[];
    rating: number;
    photosSubmitted: number;
    duration: string;
  };
  inventoryComparison?: { preEvent: number; postEvent: number };
  questionnairesCompletedFinal?: number;
  questionnaireResponsesFinal?: QuestionnaireResponse[];
  brandAmbassadorNotesFinal?: string;
  photoCategories?: {
    receipts: string[];
    socialMedia: string[];
    venue: string[];
  };
  completedAt?: string;
  finalizedAt?: string | null;
  // Pre-approval checks (manager confirms before finalizing)
  preApprovalChecks?: PreApprovalCheck[];
  // SLA capture (R2 — SGWS / NY bar-spend events). BA uploads receipt at
  // event completion on mobile; market manager confirms here. Read-only on
  // the controller surface. Output (SLA report) deferred to August / R3 —
  // R2 stores the data only. See feedback_beta_scope + project_sla_capture_flow.
  slaEligible?: boolean;
  slaCapture?: {
    receiptUrl?: string;
    total?: number; // dollars; single field — no drinks/tax/surcharge breakdown
    clarifyingNotes?: string;
    approvingManager?: string; // stamped when manager confirms
    confirmedAt?: string; // ISO; stamped when manager confirms
  };
  // Cancellation
  cancellationReason?: CancellationReason;
  cancelledAt?: string;
  // Cancellation request from brandAmbassador (day-of cancel tagging)
  cancellationRequestStatus?:
    | "none"
    | "pending-manager-approval"
    | "approved"
    | "rejected";
  cancellationRequestReason?: CancellationReason;
  cancellationRequestDetail?: string;
  cancellationCommunicationMethod?: "call" | "text" | "chat";
  cancellationRequestedAt?: string;
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

// --- Punctuality helpers ---

/** Threshold in minutes — check-in later than this triggers Late flag */
export const LATE_CHECKIN_THRESHOLD_MIN = 10;

export type PunctualityFlag = "late-checkin" | "early-checkout";

/** Returns active punctuality flags for an event */
export function getPunctualityFlags(event: Activity): PunctualityFlag[] {
  const flags: PunctualityFlag[] = [];
  if (event.scheduledStart && event.actualCheckIn) {
    const diffMin =
      (new Date(event.actualCheckIn).getTime() -
        new Date(event.scheduledStart).getTime()) /
      60000;
    if (diffMin > LATE_CHECKIN_THRESHOLD_MIN) flags.push("late-checkin");
  }
  if (event.scheduledEnd && event.actualCheckOut) {
    const diffMin =
      (new Date(event.scheduledEnd).getTime() -
        new Date(event.actualCheckOut).getTime()) /
      60000;
    if (diffMin > 0) flags.push("early-checkout");
  }
  return flags;
}

/** Minutes late for check-in (null if on-time or missing data) */
export function getLateMinutes(event: Activity): number | null {
  if (!event.scheduledStart || !event.actualCheckIn) return null;
  const diff =
    (new Date(event.actualCheckIn).getTime() -
      new Date(event.scheduledStart).getTime()) /
    60000;
  return diff > LATE_CHECKIN_THRESHOLD_MIN ? Math.round(diff) : null;
}

/** Minutes early for check-out (null if stayed full time or missing data) */
export function getEarlyMinutes(event: Activity): number | null {
  if (!event.scheduledEnd || !event.actualCheckOut) return null;
  const diff =
    (new Date(event.scheduledEnd).getTime() -
      new Date(event.actualCheckOut).getTime()) /
    60000;
  return diff > 0 ? Math.round(diff) : null;
}

// --- Mock data ---

// Seed records. Dates below are authored on the original March-2026 calendar and
// rebased relative to TODAY when `mockEvents` is built — see REBASE_OFFSETS.
const seedEvents: Activity[] = [
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
    venueLat: 40.7243,
    venueLng: -73.9937,
    borough: "Manhattan",
    state: "NY",
    venueType: "Grocery",
    accountType: "Retail",
    eventType: "Tasting",
    brandAmbassadorId: null,
    brandAmbassadorName: null,
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
    venueLat: 40.7281,
    venueLng: -74.0776,
    borough: "Jersey City",
    state: "NJ",
    venueType: "Retail",
    accountType: "Retail",
    eventType: "Promo",
    brandAmbassadorId: "edu-2",
    brandAmbassadorName: "Sarah Chen",
    assignedBrandAmbassadors: [
      {
        brandAmbassadorId: "edu-2",
        brandAmbassadorName: "Sarah Chen",
        assignmentStatus: "Accepted",
        offeredAt: "2026-03-17T09:00:00Z",
        respondedAt: "2026-03-17T10:15:00Z",
      },
    ],
    status: "Live",
    products: ["Jameson Original", "Jameson Black Barrel", "Jameson Cold Brew"],
    campaignProducts: [
      { id: "p-jam-1", name: "Jameson Original", unitPrice: 32 },
      { id: "p-jam-2", name: "Jameson Black Barrel", unitPrice: 45 },
      { id: "p-jam-3", name: "Jameson Cold Brew", unitPrice: 28 },
    ],
    salesTarget: 10,
    bonusThreshold: 20,
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
    // Punctuality: late check-in (22 min late, scheduled 4 PM)
    scheduledStart: "2026-03-20T16:00:00",
    actualCheckIn: "2026-03-20T16:22:00",
    scheduledEnd: "2026-03-20T20:00:00",
    liveMetrics: {
      samplesDistributed: 34,
      consumerInteractions: 28,
      salesGenerated: 6,
      salesByProduct: [
        {
          productId: "p-jam-1",
          productName: "Jameson Original",
          quantity: 2,
          unitPrice: 32,
        },
        {
          productId: "p-jam-2",
          productName: "Jameson Black Barrel",
          quantity: 1,
          unitPrice: 45,
        },
        {
          productId: "p-jam-3",
          productName: "Jameson Cold Brew",
          quantity: 3,
          unitPrice: 28,
        },
      ],
    },
    questionnairesCompleted: 12,
    brandAmbassadorLiveNotes: [
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
    venueLat: 40.7445,
    venueLng: -74.0275,
    borough: "Hoboken",
    state: "NJ",
    venueType: "Retail",
    accountType: "Retail",
    eventType: "Activation",
    brandAmbassadorId: "edu-3",
    brandAmbassadorName: "James Rodriguez",
    status: "Completed",
    products: ["Malibu Original", "Malibu Strawberry", "Malibu Pineapple"],
    campaignProducts: [
      { id: "p-mal-1", name: "Malibu Original", unitPrice: 22 },
      { id: "p-mal-2", name: "Malibu Strawberry", unitPrice: 22 },
      { id: "p-mal-3", name: "Malibu Pineapple", unitPrice: 22 },
    ],
    salesTarget: 15,
    bonusThreshold: 30,
    instructions: "Summer theme setup. Use provided beach-themed table runner.",
    goals: "100+ samplings, 20+ cases sold.",
    notes:
      "Beach-themed POS materials in brand ambassador kit. Manager: Lisa T. (201-555-0198)",
    compensation: { rate: "$35/hr" },
    storeContactName: "Lisa T.",
    storeContactPhone: "201-555-0198",
    storeContactEmail: "lisa.t@bevmo.com",
    checkInStatus: "checked-in",
    checkInTime: "11:48 AM",
    // Punctuality: on time (arrived 12 min early)
    scheduledStart: "2026-03-19T12:00:00",
    actualCheckIn: "2026-03-19T11:48:00",
    scheduledEnd: "2026-03-19T16:00:00",
    actualCheckOut: "2026-03-19T16:15:00",
    finalStats: {
      totalSamples: 112,
      totalInteractions: 89,
      totalSales: 18,
      salesByProduct: [
        {
          productId: "p-mal-1",
          productName: "Malibu Original",
          quantity: 8,
          unitPrice: 22,
        },
        {
          productId: "p-mal-2",
          productName: "Malibu Strawberry",
          quantity: 5,
          unitPrice: 22,
        },
        {
          productId: "p-mal-3",
          productName: "Malibu Pineapple",
          quantity: 5,
          unitPrice: 22,
        },
      ],
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
          "Activity Venue",
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
    brandAmbassadorNotesFinal:
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
    preApprovalChecks: [
      { id: "samples-pickup", label: "Samples Picked Up", required: true },
      {
        id: "evaluations-received",
        label: "Evaluations Received",
        required: true,
      },
    ],
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
    venueLat: 40.7121,
    venueLng: -73.9563,
    borough: "Brooklyn",
    state: "NY",
    venueType: "Grocery",
    accountType: "Retail",
    eventType: "Demo",
    brandAmbassadorId: null,
    brandAmbassadorName: null,
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
    venueLat: 40.8838,
    venueLng: -74.043,
    borough: "Hackensack",
    state: "NJ",
    venueType: "Retail",
    accountType: "Wholesale",
    eventType: "Activation",
    brandAmbassadorId: "edu-5",
    brandAmbassadorName: "Maria Santos",
    assignedBrandAmbassadors: [
      {
        brandAmbassadorId: "edu-5",
        brandAmbassadorName: "Maria Santos",
        assignmentStatus: "Accepted",
        offeredAt: "2026-03-19T08:00:00Z",
        respondedAt: "2026-03-19T09:30:00Z",
      },
      {
        brandAmbassadorId: "edu-8",
        brandAmbassadorName: "Lisa Thompson",
        assignmentStatus: "Pending",
        offeredAt: "2026-03-19T08:00:00Z",
        expiresAt: "2026-03-20T20:00:00Z",
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
    // Demo: brandAmbassador requested cancellation
    cancellationRequestStatus: "pending-manager-approval",
    cancellationRequestReason: "Weather",
    cancellationCommunicationMethod: "call",
    cancellationRequestedAt: "2026-03-21T09:15:00Z",
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
    venueLat: 40.742,
    venueLng: -74.0048,
    borough: "Manhattan",
    state: "NY",
    venueType: "Pop-up",
    accountType: "Pop-up",
    eventType: "Tasting",
    brandAmbassadorId: "edu-4",
    brandAmbassadorName: "David Kim",
    status: "Completed",
    slaEligible: true,
    slaCapture: {
      receiptUrl: "/uploaded/receipt-chelsea-tasting-2026-03-18.jpg",
      total: 412,
      clarifyingNotes:
        "AmEx held by Larry Golus on-site for entire bar-spend window. Receipt total matches the venue printout.",
    },
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
    // Punctuality: early check-out (1h 50m early)
    scheduledStart: "2026-03-18T15:00:00",
    actualCheckIn: "2026-03-18T14:45:00",
    scheduledEnd: "2026-03-18T19:00:00",
    actualCheckOut: "2026-03-18T17:10:00",
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
          "Activity Venue",
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
    brandAmbassadorNotesFinal:
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
    preApprovalChecks: [
      { id: "samples-pickup", label: "Samples Picked Up", required: true },
      {
        id: "evaluations-received",
        label: "Evaluations Received",
        required: true,
      },
    ],
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
    venueLat: 40.7263,
    venueLng: -73.9927,
    borough: "Manhattan",
    state: "NY",
    venueType: "Retail",
    accountType: "Retail",
    eventType: "Tasting",
    brandAmbassadorId: "edu-6",
    brandAmbassadorName: "Emily Park",
    status: "Live",
    products: ["Absolut Elyx 750ml", "Absolut Elyx 1L"],
    campaignProducts: [
      { id: "p-elyx-1", name: "Absolut Elyx 750ml", unitPrice: 45 },
      { id: "p-elyx-2", name: "Absolut Elyx 1L", unitPrice: 55 },
    ],
    salesTarget: 5,
    bonusThreshold: 10,
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
    // Punctuality: late check-in (18 min late)
    scheduledStart: "2026-03-20T17:00:00",
    actualCheckIn: "2026-03-20T17:18:00",
    scheduledEnd: "2026-03-20T21:00:00",
    liveMetrics: {
      samplesDistributed: 18,
      consumerInteractions: 15,
      salesGenerated: 3,
      salesByProduct: [
        {
          productId: "p-elyx-1",
          productName: "Absolut Elyx 750ml",
          quantity: 2,
          unitPrice: 45,
        },
        {
          productId: "p-elyx-2",
          productName: "Absolut Elyx 1L",
          quantity: 1,
          unitPrice: 55,
        },
      ],
    },
    questionnairesCompleted: 7,
    brandAmbassadorLiveNotes: [
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
    venueLat: 40.7362,
    venueLng: -73.9903,
    borough: "Manhattan",
    state: "NY",
    venueType: "Retail",
    accountType: "Retail",
    eventType: "Activation",
    brandAmbassadorId: "edu-7",
    brandAmbassadorName: "Carlos Mendez",
    assignedBrandAmbassadors: [
      {
        brandAmbassadorId: "edu-7",
        brandAmbassadorName: "Carlos Mendez",
        assignmentStatus: "Pending",
        offeredAt: "2026-03-20T14:00:00Z",
        expiresAt: "2026-03-21T20:00:00Z",
      },
      {
        brandAmbassadorId: "edu-3",
        brandAmbassadorName: "Emily Park",
        assignmentStatus: "Declined",
        offeredAt: "2026-03-20T14:00:00Z",
        respondedAt: "2026-03-20T16:45:00Z",
        declineReason: "Schedule conflict",
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
    venueLat: 40.7413,
    venueLng: -73.9898,
    borough: "Manhattan",
    state: "NY",
    venueType: "Bar/Restaurant",
    accountType: "Retail",
    eventType: "Activation",
    brandAmbassadorId: "edu-1",
    brandAmbassadorName: "Ana Martinez",
    status: "Finalized",
    products: [
      "Hendrick's Original",
      "Hendrick's Neptunia",
      "Hendrick's Orbium",
    ],
    campaignProducts: [
      { id: "p-hen-1", name: "Hendrick's Original", unitPrice: 14 },
      { id: "p-hen-2", name: "Hendrick's Neptunia", unitPrice: 16 },
      { id: "p-hen-3", name: "Hendrick's Orbium", unitPrice: 16 },
    ],
    salesTarget: 12,
    bonusThreshold: 24,
    instructions:
      "Garden party theme. Use cucumber garnishes and floral arrangements. Neat and G&T pours.",
    goals: "60+ tastings, 12+ bottles sold.",
    compensation: { rate: "$40/hr" },
    storeContactName: "Marco V.",
    storeContactPhone: "212-555-0621",
    checkInStatus: "checked-in",
    checkInTime: "12:45 PM",
    // Punctuality: on time (arrived 15 min early)
    scheduledStart: "2026-03-15T13:00:00",
    actualCheckIn: "2026-03-15T12:45:00",
    scheduledEnd: "2026-03-15T17:00:00",
    actualCheckOut: "2026-03-15T17:05:00",
    finalStats: {
      totalSamples: 72,
      totalInteractions: 58,
      totalSales: 15,
      salesByProduct: [
        {
          productId: "p-hen-1",
          productName: "Hendrick's Original",
          quantity: 5,
          unitPrice: 14,
        },
        {
          productId: "p-hen-2",
          productName: "Hendrick's Neptunia",
          quantity: 7,
          unitPrice: 16,
        },
        {
          productId: "p-hen-3",
          productName: "Hendrick's Orbium",
          quantity: 3,
          unitPrice: 16,
        },
      ],
      rating: 4.9,
      photosSubmitted: 10,
      duration: "4h 05m",
    },
    inventoryComparison: { preEvent: 40, postEvent: 25 },
    questionnairesCompletedFinal: 28,
    brandAmbassadorNotesFinal:
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
    preApprovalChecks: [
      { id: "samples-pickup", label: "Samples Picked Up", required: true },
      {
        id: "evaluations-received",
        label: "Evaluations Received",
        required: true,
      },
    ],
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
    venueLat: 40.7352,
    venueLng: -74.1687,
    borough: "Newark",
    state: "NJ",
    venueType: "Retail",
    accountType: "Retail",
    eventType: "Tasting",
    brandAmbassadorId: null,
    brandAmbassadorName: null,
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

// =============================================================================
// Date rebasing (IMP-1697)
// =============================================================================
// The seed above was authored against a fixed March-2026 calendar, which put the
// whole dataset ~5 months behind "today" and left every dashboard lane empty.
// Dates are therefore rebased relative to TODAY at module load, so the demo
// always populates and cannot go stale again.
//
// The mapping is explicit rather than a linear shift: it deliberately spreads
// the completed work backwards (so the backlog lane has real ageing) while
// keeping Live activities on today and the first unstaffed activity on tomorrow.
//
// To pin the demo for reproducible screenshots, fix TODAY in dashboard-domain.

const REBASE_OFFSETS: Record<string, number> = {
  "2026-03-15": -26,
  "2026-03-16": -25,
  "2026-03-17": -18,
  "2026-03-18": -11,
  "2026-03-19": -4,
  "2026-03-20": 0,
  "2026-03-21": 1,
  "2026-03-22": 2,
};

/** Shift an ISO date (or ISO timestamp) by the seed's rebase offset. */
function rebaseIso(value: string): string {
  const datePart = value.slice(0, 10);
  const offset = REBASE_OFFSETS[datePart];
  if (offset == null) return value;
  const rebasedDate = isoFromToday(offset);
  return value.length > 10 ? `${rebasedDate}${value.slice(10)}` : rebasedDate;
}

function rebaseActivity(a: Activity): Activity {
  const out: Activity = { ...a, date: rebaseIso(a.date) };
  const timestampKeys = [
    "checkInTime",
    "scheduledStart",
    "actualCheckIn",
    "scheduledEnd",
    "actualCheckOut",
    "completedAt",
    "finalizedAt",
    "cancelledAt",
    "cancellationRequestedAt",
    "kitPreparedAt",
    "recapSubmittedAt",
  ] as const;

  const mutable = out as unknown as Record<string, unknown>;
  for (const key of timestampKeys) {
    const value = mutable[key];
    if (typeof value === "string") {
      mutable[key] = rebaseIso(value);
    }
  }

  if (out.assignedBrandAmbassadors) {
    out.assignedBrandAmbassadors = out.assignedBrandAmbassadors.map((x) => ({
      ...x,
      ...(x.offeredAt ? { offeredAt: rebaseIso(x.offeredAt) } : {}),
      ...(x.respondedAt ? { respondedAt: rebaseIso(x.respondedAt) } : {}),
      ...(x.expiresAt ? { expiresAt: rebaseIso(x.expiresAt) } : {}),
    }));
  }

  if (out.slaCapture?.confirmedAt) {
    out.slaCapture = {
      ...out.slaCapture,
      confirmedAt: rebaseIso(out.slaCapture.confirmedAt),
    };
  }

  return out;
}

// --- Workflow-state backfill -------------------------------------------------
// The seed predates the dashboard's workflow fields. Derive sensible values so
// existing records participate in the lanes without hand-editing all 27.

function backfillWorkflowState(a: Activity): Activity {
  const out = { ...a };

  if (!out.territory) out.territory = out.borough ?? "Manhattan";

  if (!out.premiseType) {
    const onPremise = getPremiseCategory(out.venueType) === "on-premise";
    out.premiseType = out.slaEligible
      ? "on-premise SLA"
      : onPremise
        ? "on-premise"
        : "off-premise";
  }

  // Pre-execution SLA gate: treat a confirmed post-activity capture as evidence
  // the activity was approved to run; otherwise leave it outstanding.
  if (out.slaEligible && !out.slaApproval) {
    out.slaApproval = out.slaCapture?.confirmedAt ? "approved" : "pending";
  }

  // Kit state for activities that haven't run yet.
  if (!out.kitStatus && isUpcoming(out.status)) {
    out.kitStatus = out.status === "Confirmed" ? "prepared" : "not-prepared";
    if (out.kitStatus === "prepared") {
      out.kitPreparedAt = `${isoFromToday(-1)}T09:00:00`;
    }
  }
  if (!out.kitStatus) out.kitStatus = "collected";

  // Completed activities: mark the recap submitted unless the seed implies the
  // BA never filed one (no final notes).
  if (
    !out.recapSubmittedAt &&
    out.completedAt &&
    out.brandAmbassadorNotesFinal
  ) {
    out.recapSubmittedAt = out.completedAt;
  }

  return out;
}

// =============================================================================
// Generated volume
// =============================================================================
// The seed alone cannot exercise the dashboard: the lanes need enough depth to
// show the ~8-row cap and "Show all", and enough geographic spread to make the
// region filter meaningful (the seed is entirely Metro, since NJ sits under
// Metro). These records fill the forward window and the Long Island region.

interface GenSpec {
  offset: number;
  name: string;
  campaign: string;
  brand: string;
  venue: string;
  territory: string;
  state: string;
  venueType: VenueType;
  premiseType: PremiseType;
  status: EventStatus;
  ba?: string;
  assignmentStatus?: AssignmentStatus;
  offeredDaysAgo?: number;
  kitStatus?: KitStatus;
  kitOutOfStockItems?: number;
  noPickupLocation?: boolean;
  slaEligible?: boolean;
  slaApproval?: SlaApproval;
  checkInException?: CheckInException;
  recapSubmitted?: boolean;
}

const GEN_SPECS: GenSpec[] = [
  // ── Needs assignment (unstaffed, spread across the forward window) ─────────
  { offset: 3, name: "Jameson Black Barrel Tasting", campaign: "Jameson Autumn", brand: "Jameson", venue: "Total Wine & More, Westbury", territory: "Nassau", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Unassigned" },
  { offset: 4, name: "Malibu Coconut Sampling", campaign: "Malibu Sunset", brand: "Malibu", venue: "Stew Leonard's, Farmingdale", territory: "Nassau", state: "NY", venueType: "Grocery", premiseType: "off-premise", status: "Unassigned" },
  { offset: 6, name: "Beefeater Gin Pop-up", campaign: "Beefeater Botanical", brand: "Beefeater", venue: "Wine Country, Huntington", territory: "Suffolk", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Unassigned" },
  { offset: 9, name: "Absolut Lime Activation", campaign: "Absolut Summer 2026", brand: "Absolut", venue: "ShopRite, Yonkers", territory: "Westchester", state: "NY", venueType: "Grocery", premiseType: "off-premise", status: "Unassigned" },
  { offset: 12, name: "Kahlúa Espresso Martini Bar", campaign: "Kahlúa Late Night", brand: "Kahlúa", venue: "The Grange, Westchester", territory: "Westchester", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Unassigned", slaEligible: true, slaApproval: "pending" },
  { offset: 15, name: "Avión Reposado Tasting", campaign: "Avión Reserva", brand: "Avión", venue: "Bottle King, Ramsey", territory: "Hackensack", state: "NJ", venueType: "Retail", premiseType: "off-premise", status: "Unassigned" },
  { offset: 18, name: "Absolut Elyx Premium Pour", campaign: "Absolut Summer 2026", brand: "Absolut", venue: "Sherry-Lehmann, Manhattan", territory: "Manhattan", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Unassigned" },
  { offset: 21, name: "Plymouth Gin Trade Showcase", campaign: "Beefeater Botanical", brand: "Plymouth", venue: "The Dead Rabbit, Manhattan", territory: "Manhattan", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Unassigned" },
  { offset: 24, name: "Jameson Cold Brew Sampling", campaign: "Jameson Autumn", brand: "Jameson", venue: "Trader Joe's, Queens", territory: "Queens", state: "NY", venueType: "Grocery", premiseType: "off-premise", status: "Unassigned" },
  { offset: 27, name: "Malibu Beach Series Finale", campaign: "Malibu Sunset", brand: "Malibu", venue: "BevMo!, Staten Island", territory: "Staten Island", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Unassigned" },

  // ── Awaiting BA acceptance (pending + declined) ────────────────────────────
  { offset: 2, name: "Absolut Citron Tasting", campaign: "Absolut Summer 2026", brand: "Absolut", venue: "Whole Foods, Bryant Park", territory: "Manhattan", state: "NY", venueType: "Grocery", premiseType: "off-premise", status: "Pending", ba: "Sarah Chen", assignmentStatus: "Declined" },
  { offset: 5, name: "Glenlivet 12 Showcase", campaign: "Glenlivet Heritage", brand: "Glenlivet", venue: "Astor Wines, NoHo", territory: "Manhattan", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Pending", ba: "Maria Santos", assignmentStatus: "Pending", offeredDaysAgo: 3 },
  { offset: 7, name: "Kahlúa Dessert Pairing", campaign: "Kahlúa Late Night", brand: "Kahlúa", venue: "Union Square Cafe, Manhattan", territory: "Manhattan", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Pending", ba: "David Kim", assignmentStatus: "Pending", offeredDaysAgo: 5 },
  { offset: 10, name: "Beefeater Pink Launch", campaign: "Beefeater Botanical", brand: "Beefeater", venue: "Kings Supermarket, Hoboken", territory: "Hoboken", state: "NJ", venueType: "Grocery", premiseType: "off-premise", status: "Pending", ba: "Emily Park", assignmentStatus: "Declined" },
  { offset: 14, name: "Avión Silver Margarita Bar", campaign: "Avión Reserva", brand: "Avión", venue: "Loosie Rouge, Brooklyn", territory: "Brooklyn", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Pending", ba: "Carlos Mendez", assignmentStatus: "Pending", offeredDaysAgo: 1 },
  { offset: 19, name: "Jameson Trade Tasting", campaign: "Jameson Autumn", brand: "Jameson", venue: "Gramercy Tavern, Manhattan", territory: "Manhattan", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Pending", ba: "Sarah Chen", assignmentStatus: "Pending", offeredDaysAgo: 2 },

  // ── Kit & samples outstanding (all four states, incl. no pickup location) ──
  { offset: 1, name: "Absolut Vanilia Sampling", campaign: "Absolut Summer 2026", brand: "Absolut", venue: "Fairway Market, Brooklyn", territory: "Brooklyn", state: "NY", venueType: "Grocery", premiseType: "off-premise", status: "Confirmed", ba: "Maria Santos", assignmentStatus: "Accepted", kitStatus: "not-prepared" },
  { offset: 2, name: "Glenlivet Nàdurra Pour", campaign: "Glenlivet Heritage", brand: "Glenlivet", venue: "Eataly, Flatiron", territory: "Manhattan", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Confirmed", ba: "David Kim", assignmentStatus: "Accepted", kitStatus: "out-of-stock", kitOutOfStockItems: 2 },
  { offset: 3, name: "Malibu Piña Colada Station", campaign: "Malibu Sunset", brand: "Malibu", venue: "Rockaway Beach Club, Queens", territory: "Queens", state: "NY", venueType: "Activity Space", premiseType: "on-premise", status: "Confirmed", ba: "Emily Park", assignmentStatus: "Accepted", kitStatus: "prepared" },
  { offset: 5, name: "Avión Tequila Flight", campaign: "Avión Reserva", brand: "Avión", venue: "Cantina Rooftop, Manhattan", territory: "Manhattan", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise SLA", status: "Confirmed", ba: "Carlos Mendez", assignmentStatus: "Accepted", kitStatus: "prepared", slaEligible: true, slaApproval: "pending" },
  { offset: 8, name: "Beefeater 24 Tasting", campaign: "Beefeater Botanical", brand: "Beefeater", venue: "Wegmans, Nassau", territory: "Nassau", state: "NY", venueType: "Grocery", premiseType: "off-premise", status: "Confirmed", ba: "Sarah Chen", assignmentStatus: "Accepted", kitStatus: "not-prepared", noPickupLocation: true },
  { offset: 11, name: "Kahlúa Cold Brew Bar", campaign: "Kahlúa Late Night", brand: "Kahlúa", venue: "Devoción, Brooklyn", territory: "Brooklyn", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Confirmed", ba: "Maria Santos", assignmentStatus: "Accepted", kitStatus: "not-prepared" },
  { offset: 16, name: "Jameson Caskmates Tasting", campaign: "Jameson Autumn", brand: "Jameson", venue: "Threes Brewing, Brooklyn", territory: "Brooklyn", state: "NY", venueType: "Bar/Restaurant", premiseType: "beer", status: "Confirmed", ba: "David Kim", assignmentStatus: "Accepted", kitStatus: "prepared" },
  { offset: 20, name: "Absolut Watermelon Launch", campaign: "Absolut Summer 2026", brand: "Absolut", venue: "Stop & Shop, Suffolk", territory: "Suffolk", state: "NY", venueType: "Grocery", premiseType: "off-premise", status: "Confirmed", ba: "Emily Park", assignmentStatus: "Accepted", kitStatus: "not-prepared" },
  { offset: 23, name: "Green Thumb Cannabis Pairing", campaign: "Kahlúa Late Night", brand: "Kahlúa", venue: "Cannabis Collective, Manhattan", territory: "Manhattan", state: "NY", venueType: "Pop-up", premiseType: "cannabis", status: "Confirmed", ba: "Carlos Mendez", assignmentStatus: "Accepted", kitStatus: "prepared" },

  // ── Confirmed and clear (populate the calendar, not the lanes) ─────────────
  { offset: 4, name: "Glenlivet Founder's Reserve", campaign: "Glenlivet Heritage", brand: "Glenlivet", venue: "Zachys, Westchester", territory: "Westchester", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Confirmed", ba: "Sarah Chen", assignmentStatus: "Accepted", kitStatus: "collected" },
  { offset: 6, name: "Malibu Strawberry Sampling", campaign: "Malibu Sunset", brand: "Malibu", venue: "ShopRite, Jersey City", territory: "Jersey City", state: "NJ", venueType: "Grocery", premiseType: "off-premise", status: "Confirmed", ba: "Maria Santos", assignmentStatus: "Accepted", kitStatus: "collected" },
  { offset: 6, name: "Absolut Grapefruit Pop-up", campaign: "Absolut Summer 2026", brand: "Absolut", venue: "Chelsea Market, Manhattan", territory: "Manhattan", state: "NY", venueType: "Pop-up", premiseType: "off-premise", status: "Confirmed", ba: "David Kim", assignmentStatus: "Accepted", kitStatus: "collected" },
  { offset: 6, name: "Jameson Orange Tasting", campaign: "Jameson Autumn", brand: "Jameson", venue: "Bierhaus, Queens", territory: "Queens", state: "NY", venueType: "Bar/Restaurant", premiseType: "beer", status: "Confirmed", ba: "Emily Park", assignmentStatus: "Accepted", kitStatus: "collected" },
  { offset: 13, name: "Avión Cristalino Showcase", campaign: "Avión Reserva", brand: "Avión", venue: "Empire Wines, Newark", territory: "Newark", state: "NJ", venueType: "Retail", premiseType: "off-premise", status: "Confirmed", ba: "Carlos Mendez", assignmentStatus: "Accepted", kitStatus: "collected" },
  { offset: 17, name: "Beefeater Crown Jewel", campaign: "Beefeater Botanical", brand: "Beefeater", venue: "Union Market, Brooklyn", territory: "Brooklyn", state: "NY", venueType: "Grocery", premiseType: "off-premise", status: "Confirmed", ba: "Sarah Chen", assignmentStatus: "Accepted", kitStatus: "collected" },

  // ── Awaiting review backlog (ageing; lane 4 ignores the date range) ────────
  { offset: -31, name: "Absolut Raspberri Sampling", campaign: "Absolut Summer 2026", brand: "Absolut", venue: "Whole Foods, Union Square", territory: "Manhattan", state: "NY", venueType: "Grocery", premiseType: "off-premise", status: "Completed", ba: "Sarah Chen", assignmentStatus: "Accepted", recapSubmitted: true, checkInException: "late-checkout" },
  { offset: -24, name: "Glenlivet Caribbean Reserve", campaign: "Glenlivet Heritage", brand: "Glenlivet", venue: "Grand Wine, Nassau", territory: "Nassau", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Completed", ba: "Maria Santos", assignmentStatus: "Accepted", recapSubmitted: false },
  { offset: -21, name: "Kahlúa Nitro Tasting", campaign: "Kahlúa Late Night", brand: "Kahlúa", venue: "Clover Club, Brooklyn", territory: "Brooklyn", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise SLA", status: "Completed", ba: "David Kim", assignmentStatus: "Accepted", recapSubmitted: true, slaEligible: true, slaApproval: "approved" },
  { offset: -16, name: "Malibu Watermelon Launch", campaign: "Malibu Sunset", brand: "Malibu", venue: "Total Wine, Suffolk", territory: "Suffolk", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Completed", ba: "Emily Park", assignmentStatus: "Accepted", recapSubmitted: false, checkInException: "out-of-area" },
  { offset: -9, name: "Avión Espadín Flight", campaign: "Avión Reserva", brand: "Avión", venue: "Mission Ceviche, Manhattan", territory: "Manhattan", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise SLA", status: "Completed", ba: "Carlos Mendez", assignmentStatus: "Accepted", recapSubmitted: true, slaEligible: true, slaApproval: "approved" },
  { offset: -6, name: "Beefeater Summer Garden", campaign: "Beefeater Botanical", brand: "Beefeater", venue: "Westville, Hoboken", territory: "Hoboken", state: "NJ", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Completed", ba: "Sarah Chen", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -2, name: "Jameson Stout Edition", campaign: "Jameson Autumn", brand: "Jameson", venue: "Other Half, Brooklyn", territory: "Brooklyn", state: "NY", venueType: "Bar/Restaurant", premiseType: "beer", status: "Completed", ba: "Maria Santos", assignmentStatus: "Accepted", recapSubmitted: true, checkInException: "failed" },

  // ── Finalised (recede in the calendar, absent from every lane) ─────────────
  { offset: -12, name: "Absolut Mandrin Tasting", campaign: "Absolut Summer 2026", brand: "Absolut", venue: "Gristedes, Manhattan", territory: "Manhattan", state: "NY", venueType: "Grocery", premiseType: "off-premise", status: "Finalized", ba: "David Kim", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -5, name: "Glenlivet Archive Pour", campaign: "Glenlivet Heritage", brand: "Glenlivet", venue: "Vintry Wine, Manhattan", territory: "Manhattan", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Finalized", ba: "Emily Park", assignmentStatus: "Accepted", recapSubmitted: true },

  // ── Historical finalised work (reporting depth) ────────────────────────────
  // Reports look BACKWARDS — "last month", "last 3 months" — where the triage
  // dashboard looks forwards. Without a real history every report renders empty.
  // These are all Finalized, so they are absent from every task group and only
  // recede in the calendar: reporting depth without disturbing IMP-1697.
  { offset: -13, name: "Absolut Peach Sampling", campaign: "Absolut Summer 2026", brand: "Absolut", venue: "Whole Foods, Union Square", territory: "Manhattan", state: "NY", venueType: "Grocery", premiseType: "off-premise", status: "Finalized", ba: "Sarah Chen", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -15, name: "Jameson Ginger Trade Pour", campaign: "Jameson Spring Push", brand: "Jameson", venue: "Gramercy Tavern, Manhattan", territory: "Manhattan", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Finalized", ba: "Maria Santos", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -17, name: "Malibu Mango Tasting", campaign: "Malibu Summer Vibes", brand: "Malibu", venue: "Stew Leonard's, Farmingdale", territory: "Nassau", state: "NY", venueType: "Grocery", premiseType: "off-premise", status: "Finalized", ba: "David Kim", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -19, name: "Glenlivet 18 Reserve Pour", campaign: "Glenlivet Prestige Series", brand: "Glenlivet", venue: "Astor Wines, NoHo", territory: "Manhattan", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Finalized", ba: "Emily Park", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -22, name: "Avión Añejo Flight", campaign: "Avión Elevation Campaign", brand: "Avión", venue: "Cantina Rooftop, Manhattan", territory: "Manhattan", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise SLA", status: "Finalized", ba: "Carlos Mendez", assignmentStatus: "Accepted", recapSubmitted: true, slaEligible: true, slaApproval: "approved" },
  { offset: -25, name: "Beefeater Blood Orange Pop-up", campaign: "Beefeater London Dry", brand: "Beefeater", venue: "Chelsea Market, Manhattan", territory: "Manhattan", state: "NY", venueType: "Pop-up", premiseType: "off-premise", status: "Finalized", ba: "Sarah Chen", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -27, name: "Kahlúa Salted Caramel Bar", campaign: "Kahlúa Mixology Tour", brand: "Kahlúa", venue: "Clover Club, Brooklyn", territory: "Brooklyn", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Finalized", ba: "Maria Santos", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -29, name: "Hendrick's Lunar Tasting", campaign: "Hendrick's Curiosities", brand: "Hendrick's", venue: "Loosie Rouge, Brooklyn", territory: "Brooklyn", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Finalized", ba: "David Kim", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -30, name: "Maker's Mark Private Select", campaign: "Maker's Mark Spring", brand: "Maker's Mark", venue: "Zachys, Westchester", territory: "Westchester", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Finalized", ba: "Emily Park", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -32, name: "Absolut Lime Trade Showcase", campaign: "Absolut Summer 2026", brand: "Absolut", venue: "The Dead Rabbit, Manhattan", territory: "Manhattan", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise SLA", status: "Finalized", ba: "Carlos Mendez", assignmentStatus: "Accepted", recapSubmitted: true, slaEligible: true, slaApproval: "approved" },
  { offset: -33, name: "Jameson Cold Brew Bar", campaign: "Jameson Spring Push", brand: "Jameson", venue: "Devoción, Brooklyn", territory: "Brooklyn", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Finalized", ba: "Sarah Chen", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -35, name: "Malibu Pineapple Launch", campaign: "Malibu Summer Vibes", brand: "Malibu", venue: "ShopRite, Yonkers", territory: "Westchester", state: "NY", venueType: "Grocery", premiseType: "off-premise", status: "Finalized", ba: "Maria Santos", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -36, name: "Glenlivet Single Cask Pour", campaign: "Glenlivet Prestige Series", brand: "Glenlivet", venue: "Grand Wine, Nassau", territory: "Nassau", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Finalized", ba: "David Kim", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -37, name: "Beefeater Gin & Tonic Garden", campaign: "Beefeater London Dry", brand: "Beefeater", venue: "Westville, Hoboken", territory: "Hoboken", state: "NJ", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Finalized", ba: "Emily Park", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -38, name: "Absolut Original Sampling", campaign: "Absolut Summer 2026", brand: "Absolut", venue: "Whole Foods, Tribeca", territory: "Manhattan", state: "NY", venueType: "Grocery", premiseType: "off-premise", status: "Finalized", ba: "Sarah Chen", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -41, name: "Jameson Caskmates Pour", campaign: "Jameson Spring Push", brand: "Jameson", venue: "Clover Club, Brooklyn", territory: "Brooklyn", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Finalized", ba: "Maria Santos", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -44, name: "Malibu Original Tasting", campaign: "Malibu Summer Vibes", brand: "Malibu", venue: "Stew Leonard's, Yonkers", territory: "Westchester", state: "NY", venueType: "Grocery", premiseType: "off-premise", status: "Finalized", ba: "David Kim", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -47, name: "Glenlivet 15 Showcase", campaign: "Glenlivet Prestige Series", brand: "Glenlivet", venue: "Zachys, Westchester", territory: "Westchester", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Finalized", ba: "Emily Park", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -52, name: "Avión Silver Flight", campaign: "Avión Elevation Campaign", brand: "Avión", venue: "Cantina Rooftop, Manhattan", territory: "Manhattan", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise SLA", status: "Finalized", ba: "Carlos Mendez", assignmentStatus: "Accepted", recapSubmitted: true, slaEligible: true, slaApproval: "approved" },
  { offset: -55, name: "Beefeater London Dry Pop-up", campaign: "Beefeater London Dry", brand: "Beefeater", venue: "Eataly, Flatiron", territory: "Manhattan", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Finalized", ba: "Sarah Chen", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -58, name: "Kahlúa Espresso Bar", campaign: "Kahlúa Mixology Tour", brand: "Kahlúa", venue: "Devoción, Brooklyn", territory: "Brooklyn", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Finalized", ba: "Maria Santos", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -63, name: "Absolut Elyx Trade Tasting", campaign: "Absolut Summer 2026", brand: "Absolut", venue: "Gramercy Tavern, Manhattan", territory: "Manhattan", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Finalized", ba: "David Kim", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -67, name: "Hendrick's Botanical Bar", campaign: "Hendrick's Curiosities", brand: "Hendrick's", venue: "The Dead Rabbit, Manhattan", territory: "Manhattan", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise SLA", status: "Finalized", ba: "Emily Park", assignmentStatus: "Accepted", recapSubmitted: true, slaEligible: true, slaApproval: "approved" },
  { offset: -71, name: "Maker's Mark Cask Tasting", campaign: "Maker's Mark Spring", brand: "Maker's Mark", venue: "Astor Wines, NoHo", territory: "Manhattan", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Finalized", ba: "Carlos Mendez", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -76, name: "Jameson Black Barrel Trade", campaign: "Jameson Spring Push", brand: "Jameson", venue: "Threes Brewing, Brooklyn", territory: "Brooklyn", state: "NY", venueType: "Bar/Restaurant", premiseType: "beer", status: "Finalized", ba: "Sarah Chen", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -82, name: "Malibu Coconut Beach Series", campaign: "Malibu Summer Vibes", brand: "Malibu", venue: "Rockaway Beach Club, Queens", territory: "Queens", state: "NY", venueType: "Activity Space", premiseType: "on-premise", status: "Finalized", ba: "Maria Santos", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -88, name: "Glenlivet Founder's Pour", campaign: "Glenlivet Prestige Series", brand: "Glenlivet", venue: "Grand Wine, Nassau", territory: "Nassau", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Finalized", ba: "David Kim", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -94, name: "Avión Reposado Showcase", campaign: "Avión Elevation Campaign", brand: "Avión", venue: "Mission Ceviche, Manhattan", territory: "Manhattan", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Finalized", ba: "Emily Park", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -101, name: "Beefeater Pink Sampling", campaign: "Beefeater London Dry", brand: "Beefeater", venue: "Kings Supermarket, Hoboken", territory: "Hoboken", state: "NJ", venueType: "Grocery", premiseType: "off-premise", status: "Finalized", ba: "Carlos Mendez", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -108, name: "Absolut Citron Launch", campaign: "Absolut Summer 2026", brand: "Absolut", venue: "ShopRite, Jersey City", territory: "Jersey City", state: "NJ", venueType: "Grocery", premiseType: "off-premise", status: "Finalized", ba: "Sarah Chen", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -115, name: "Kahlúa Dessert Pairing", campaign: "Kahlúa Mixology Tour", brand: "Kahlúa", venue: "Union Square Cafe, Manhattan", territory: "Manhattan", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Finalized", ba: "Maria Santos", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -123, name: "Hendrick's Orbium Tasting", campaign: "Hendrick's Curiosities", brand: "Hendrick's", venue: "Loosie Rouge, Brooklyn", territory: "Brooklyn", state: "NY", venueType: "Bar/Restaurant", premiseType: "on-premise", status: "Finalized", ba: "David Kim", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -131, name: "Maker's Mark 46 Pour", campaign: "Maker's Mark Spring", brand: "Maker's Mark", venue: "Sherry-Lehmann, Manhattan", territory: "Manhattan", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Finalized", ba: "Emily Park", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -140, name: "Jameson Orange Sampling", campaign: "Jameson Spring Push", brand: "Jameson", venue: "Bierhaus, Queens", territory: "Queens", state: "NY", venueType: "Bar/Restaurant", premiseType: "beer", status: "Finalized", ba: "Carlos Mendez", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -152, name: "Malibu Strawberry Launch", campaign: "Malibu Summer Vibes", brand: "Malibu", venue: "Fairway Market, Brooklyn", territory: "Brooklyn", state: "NY", venueType: "Grocery", premiseType: "off-premise", status: "Finalized", ba: "Sarah Chen", assignmentStatus: "Accepted", recapSubmitted: true },
  { offset: -165, name: "Absolut Vanilia Trade Pour", campaign: "Absolut Summer 2026", brand: "Absolut", venue: "Wine Country, Huntington", territory: "Suffolk", state: "NY", venueType: "Retail", premiseType: "off-premise", status: "Finalized", ba: "Maria Santos", assignmentStatus: "Accepted", recapSubmitted: true },
];

const GEN_TIMES: { time: string; duration: string }[] = [
  { time: "11:00 AM – 3:00 PM", duration: "4h" },
  { time: "12:00 PM – 4:00 PM", duration: "4h" },
  { time: "2:00 PM – 6:00 PM", duration: "4h" },
  { time: "4:00 PM – 8:00 PM", duration: "4h" },
  { time: "5:00 PM – 9:00 PM", duration: "4h" },
];

/**
 * Product line-ups a generated activity can carry. Varying the count (1–4) is
 * what makes the reporting grain choice legible: `18 activities × 4 products`
 * only means something if activities differ.
 */
const GEN_PRODUCT_VARIANTS: { variant: string; price: number }[][] = [
  [{ variant: "750ml", price: 28 }],
  [
    { variant: "750ml", price: 28 },
    { variant: "1L", price: 36 },
  ],
  [
    { variant: "750ml", price: 32 },
    { variant: "1L", price: 41 },
    { variant: "375ml", price: 19 },
  ],
  [
    { variant: "750ml", price: 45 },
    { variant: "1L", price: 58 },
    { variant: "375ml", price: 26 },
    { variant: "Gift Pack", price: 62 },
  ],
];

/**
 * Brand → supplier. The real portfolio split, so supplier-scoped reporting has
 * more than one value to group by.
 */
const BRAND_SUPPLIER: Record<string, string> = {
  Absolut: "Pernod Ricard",
  Jameson: "Pernod Ricard",
  Malibu: "Pernod Ricard",
  Kahlúa: "Pernod Ricard",
  Beefeater: "Pernod Ricard",
  Avión: "Pernod Ricard",
  Plymouth: "Pernod Ricard",
  Glenlivet: "William Grant & Sons",
  "Hendrick's": "William Grant & Sons",
  "Maker's Mark": "Beam Suntory",
};

const BA_IDS: Record<string, string> = {
  "Sarah Chen": "edu-2",
  "Maria Santos": "edu-3",
  "David Kim": "edu-4",
  "Emily Park": "edu-5",
  "Carlos Mendez": "edu-6",
};

function buildGenerated(spec: GenSpec, index: number): Activity {
  const date = isoFromToday(spec.offset);
  const slot = GEN_TIMES[index % GEN_TIMES.length]!;
  const isCompleted = spec.status === "Completed" || spec.status === "Finalized";
  const baId = spec.ba ? (BA_IDS[spec.ba] ?? "edu-2") : null;

  const activity: Activity = {
    id: `evt-g${String(index + 1).padStart(3, "0")}`,
    name: spec.name,
    campaignName: spec.campaign,
    brandName: spec.brand,
    clientName: BRAND_SUPPLIER[spec.brand] ?? "Pernod Ricard",
    date,
    time: slot.time,
    duration: slot.duration,
    venue: spec.venue,
    venueAddress: spec.venue,
    borough: spec.territory,
    territory: spec.territory,
    state: spec.state,
    venueType: spec.venueType,
    accountType: spec.venueType === "Pop-up" ? "Pop-up" : "Retail",
    eventType: "Tasting",
    brandAmbassadorId: spec.assignmentStatus === "Accepted" ? baId : null,
    brandAmbassadorName:
      spec.assignmentStatus === "Accepted" ? (spec.ba ?? null) : null,
    status: spec.status,
    products: [`${spec.brand} 750ml`],
    instructions: `Set up the ${spec.brand} station and follow the campaign brief.`,
    goals: "Sample consumers, drive trial, collect consumer profiles.",
    premiseType: spec.premiseType,
    ...(spec.noPickupLocation
      ? { kitMaterials: { pickupLocation: "", items: [`${spec.brand} kit`] } }
      : {
          kitMaterials: {
            pickupLocation: "Hart Ops Warehouse, 120 W 31st St, NYC",
            items: [`${spec.brand} branded table cover`, "Tasting cups (200ct)"],
          },
        }),
    ...(spec.kitStatus ? { kitStatus: spec.kitStatus } : {}),
    ...(spec.kitOutOfStockItems
      ? { kitOutOfStockItems: spec.kitOutOfStockItems }
      : {}),
    ...(spec.kitStatus === "prepared"
      ? { kitPreparedAt: `${isoFromToday(spec.offset - 2)}T09:00:00` }
      : {}),
    ...(spec.slaEligible ? { slaEligible: true } : {}),
    ...(spec.slaApproval ? { slaApproval: spec.slaApproval } : {}),
    ...(spec.checkInException ? { checkInException: spec.checkInException } : {}),
  };

  if (spec.ba && spec.assignmentStatus) {
    activity.assignedBrandAmbassadors = [
      {
        brandAmbassadorId: baId ?? "edu-2",
        brandAmbassadorName: spec.ba,
        assignmentStatus: spec.assignmentStatus,
        ...(spec.offeredDaysAgo != null
          ? { offeredAt: `${isoFromToday(-spec.offeredDaysAgo)}T09:00:00` }
          : {}),
      },
    ];
  }

  if (isCompleted) {
    activity.completedAt = `${date}T20:00:00`;
    activity.photoCount = 8 + (index % 7);

    // Per-product sales. Reporting's product grain (one row per product per
    // activity) is only meaningful if activities actually carry more than one
    // product — a single collapsed count is the legacy behaviour being fixed.
    const variants = GEN_PRODUCT_VARIANTS[index % GEN_PRODUCT_VARIANTS.length]!;
    const totalSales = 15 + (index % 10);
    const salesByProduct: TrackedProductSale[] = variants.map((v, i) => {
      const share = variants.length === 1 ? 1 : (variants.length - i) / ((variants.length * (variants.length + 1)) / 2);
      return {
        productId: `${activity.id}-p${i + 1}`,
        productName: `${spec.brand} ${v.variant}`,
        quantity: Math.max(1, Math.round(totalSales * share)),
        unitPrice: v.price,
      };
    });
    activity.campaignProducts = variants.map((v, i) => ({
      id: `${activity.id}-p${i + 1}`,
      name: `${spec.brand} ${v.variant}`,
      unitPrice: v.price,
    }));
    activity.products = salesByProduct.map((p) => p.productName);

    activity.finalStats = {
      totalSamples: 70 + index,
      totalInteractions: 90 + index,
      totalSales: salesByProduct.reduce((s, p) => s + p.quantity, 0),
      salesByProduct,
      rating: 4.4 + (index % 5) / 10,
      photosSubmitted: 8 + (index % 7),
      duration: slot.duration,
    };
    if (spec.recapSubmitted) {
      activity.recapSubmittedAt = `${date}T21:30:00`;
      activity.brandAmbassadorNotesFinal =
        "Strong footfall; consumers responded well to the sampling script.";
    }
    if (spec.status === "Finalized") {
      activity.finalizedAt = `${isoFromToday(spec.offset + 2)}T10:00:00`;
    } else {
      activity.finalizedAt = null;
    }
    if (spec.slaEligible) {
      activity.slaCapture = {
        total: 420 + index * 5,
        ...(spec.slaApproval === "approved"
          ? {
              approvingManager: "Katie Alvarez",
              confirmedAt: `${isoFromToday(spec.offset + 1)}T11:00:00`,
            }
          : {}),
      };
    }
  }

  return activity;
}

const generatedEvents: Activity[] = GEN_SPECS.map(buildGenerated);

/**
 * The activity set the whole Market Manager surface reads from. Seed records are
 * rebased and backfilled; generated records supply the volume and geographic
 * spread the dashboard needs.
 */
export const mockEvents: Activity[] = [
  ...seedEvents.map((a) => backfillWorkflowState(rebaseActivity(a))),
  ...generatedEvents,
];

// --- Query helpers ---

export function getActivityById(id: string): Activity | undefined {
  const found = mockEvents.find((e) => e.id === id);
  if (found) return found;

  // Fallback for past events defined in the brandAmbassador roster
  if (id.startsWith("past-")) {
    for (const edu of mockBrandAmbassadors) {
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
          brandAmbassadorId: edu.id,
          brandAmbassadorName: edu.name,
          assignedBrandAmbassadors: [
            {
              brandAmbassadorId: edu.id,
              brandAmbassadorName: edu.name,
              assignmentStatus: "Accepted",
            },
          ],
          status: "Finalized",
          products: ["Assorted Products"],
          campaignProducts: [
            { id: `${past.id}-p1`, name: "Product A", unitPrice: 25 },
            { id: `${past.id}-p2`, name: "Product B", unitPrice: 30 },
          ],
          instructions: "Archived instructions.",
          goals: "Archived goals.",
          finalStats: {
            totalSamples: past.salesUnits * 4,
            totalInteractions: past.salesUnits * 6,
            totalSales: past.salesUnits,
            salesByProduct: [
              {
                productId: `${past.id}-p1`,
                productName: "Product A",
                quantity: Math.ceil(past.salesUnits * 0.6),
                unitPrice: 25,
              },
              {
                productId: `${past.id}-p2`,
                productName: "Product B",
                quantity: Math.floor(past.salesUnits * 0.4),
                unitPrice: 30,
              },
            ],
            rating: past.rating,
            photosSubmitted: 4,
            duration: "4h",
          },
          inventoryComparison: {
            preEvent: 30,
            postEvent: 30 - past.salesUnits,
          },
          questionnairesCompletedFinal: Math.floor(past.salesUnits * 1.5),
          brandAmbassadorNotesFinal: "Activity completed successfully. (Archived record)",
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

export function getEventsByStatus(status: EventStatus): Activity[] {
  return mockEvents.filter((e) => e.status === status);
}

export function getUpcomingEvents(): Activity[] {
  return mockEvents.filter((e) => isUpcoming(e.status));
}

export function getEventsRequiringAttention(): Activity[] {
  return mockEvents.filter(
    (e) =>
      e.status === "Unassigned" ||
      (e.status === "Completed" && !e.finalizedAt) ||
      e.status === "Pending",
  );
}

// SLA capture mutator. Manager edits the receipt total + clarifying notes,
// then confirms — Confirm stamps approvingManager + confirmedAt. In-memory
// only (prototype). Returns the updated activity, or undefined if not found.
export function updateActivitySlaCapture(
  id: string,
  patch: Partial<NonNullable<Activity["slaCapture"]>>,
): Activity | undefined {
  const idx = mockEvents.findIndex((e) => e.id === id);
  if (idx < 0) return undefined;
  const next = {
    ...mockEvents[idx]!.slaCapture,
    ...patch,
  };
  mockEvents[idx] = { ...mockEvents[idx]!, slaCapture: next };
  return mockEvents[idx]!;
}
