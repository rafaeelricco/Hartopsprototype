import type {
  QuestionnaireQuestion,
  QuestionnaireTemplate,
} from "../../shared/data/shared-types";

// ── Default questions asked at every event ──────────────────────────────────

export const DEFAULT_QUESTIONS: QuestionnaireQuestion[] = [
  {
    id: "q-1",
    text: "How was the venue setup?",
    type: "rating",
    required: true,
    category: "venue",
  },
  {
    id: "q-2",
    text: "Were all required products available at the venue?",
    type: "yes-no",
    required: true,
    category: "compliance",
  },
  {
    id: "q-3",
    text: "Estimate the foot traffic during the event",
    type: "multiple-choice",
    options: [
      "Low (<50)",
      "Medium (50-150)",
      "High (150-300)",
      "Very High (300+)",
    ],
    required: true,
    category: "venue",
  },
  {
    id: "q-4",
    text: "Describe the consumer demographic",
    type: "multiple-choice",
    options: ["21-25", "26-35", "36-45", "46-55", "55+"],
    required: true,
    category: "consumer",
  },
  {
    id: "q-5",
    text: "Were there any competitor promotions active at the venue?",
    type: "yes-no",
    required: true,
    category: "product",
  },
  {
    id: "q-6",
    text: "Rate the overall consumer engagement",
    type: "rating",
    required: true,
    category: "consumer",
  },
  {
    id: "q-7",
    text: "Any compliance issues to report?",
    type: "open-text",
    required: false,
    category: "compliance",
  },
  {
    id: "q-dd-1",
    text: "How would you describe the venue type?",
    type: "dropdown",
    options: [
      "Bar/Lounge",
      "Liquor Store",
      "Grocery/Supermarket",
      "Restaurant",
      "Event Venue",
      "Convenience Store",
      "Other",
    ],
    required: true,
    category: "venue",
  },
  {
    id: "q-dd-2",
    text: "What was the primary product interest?",
    type: "dropdown",
    options: [
      "Original",
      "Flavored",
      "Premium/Aged",
      "Mixed/Cocktails",
      "No clear preference",
    ],
    required: true,
    category: "product",
  },
  {
    id: "q-dd-3",
    text: "Overall compliance status",
    type: "dropdown",
    options: [
      "Fully Compliant",
      "Minor Issues",
      "Major Issues",
      "Non-Compliant",
    ],
    required: true,
    category: "compliance",
  },
];

// ── Campaign-specific questionnaire templates ───────────────────────────────

export const CAMPAIGN_QUESTIONNAIRES: QuestionnaireTemplate[] = [
  {
    id: "qt-1",
    name: "Summer Seltzer Launch",
    description:
      "Questionnaire for Summer Seltzer Launch events — captures seltzer-specific taste feedback, purchase intent, and competitor presence.",
    campaignId: "camp-1",
    questions: [
      ...DEFAULT_QUESTIONS,
      {
        id: "q-8",
        text: "How did consumers rate the seltzer taste?",
        type: "rating",
        required: true,
        category: "consumer",
      },
      {
        id: "q-9",
        text: "How likely are consumers to purchase the seltzer?",
        type: "multiple-choice",
        options: [
          "Very unlikely",
          "Unlikely",
          "Neutral",
          "Likely",
          "Very likely",
        ],
        required: true,
        category: "consumer",
      },
      {
        id: "q-10",
        text: "Which competitor seltzer brands were present at the venue?",
        type: "open-text",
        required: false,
        category: "product",
      },
    ],
    createdAt: "2025-12-01T00:00:00Z",
  },
  {
    id: "qt-2",
    name: "Q1 Retail Activation",
    description:
      "Questionnaire for Q1 Retail Activation events — covers shelf placement, display compliance, and store manager feedback.",
    campaignId: "camp-2",
    questions: [
      ...DEFAULT_QUESTIONS,
      {
        id: "q-11",
        text: "How would you rate the shelf placement of our products?",
        type: "rating",
        required: true,
        category: "product",
      },
      {
        id: "q-12",
        text: "Was the promotional display set up according to the planogram?",
        type: "yes-no",
        required: true,
        category: "compliance",
      },
      {
        id: "q-13",
        text: "Summarize the store manager's feedback on the activation",
        type: "open-text",
        required: false,
        category: "general",
      },
    ],
    createdAt: "2025-12-01T00:00:00Z",
  },
  {
    id: "qt-3",
    name: "Craft Cocktail Roadshow",
    description:
      "Questionnaire for Craft Cocktail Roadshow events — gathers cocktail recipe feedback, bartender engagement, and menu placement details.",
    campaignId: "camp-8",
    questions: [
      ...DEFAULT_QUESTIONS,
      {
        id: "q-14",
        text: "How did consumers rate the cocktail recipes?",
        type: "rating",
        required: true,
        category: "consumer",
      },
      {
        id: "q-15",
        text: "Rate the bartender's engagement and enthusiasm",
        type: "rating",
        required: true,
        category: "venue",
      },
      {
        id: "q-16",
        text: "Was our product featured on the venue's cocktail menu?",
        type: "yes-no",
        required: true,
        category: "product",
      },
    ],
    createdAt: "2025-12-01T00:00:00Z",
  },
];

// ── Standard (generic) template ─────────────────────────────────────────────

export const STANDARD_QUESTIONNAIRE: QuestionnaireTemplate = {
  id: "qt-4",
  name: "Standard Event Questionnaire",
  description:
    "Default questionnaire applied to events that do not belong to a campaign with a dedicated template.",
  questions: [...DEFAULT_QUESTIONS],
  createdAt: "2025-12-01T00:00:00Z",
};

// ── Helper ──────────────────────────────────────────────────────────────────

export function getQuestionnaireForCampaign(
  campaignId: string,
): QuestionnaireTemplate {
  const match = CAMPAIGN_QUESTIONNAIRES.find(
    (qt) => qt.campaignId === campaignId,
  );
  return match ?? STANDARD_QUESTIONNAIRE;
}
