/* ------------------------------------------------------------------ */
/* Shared types used across ops & staff platforms                       */
/* ------------------------------------------------------------------ */

import type { RateHistoryEntry, RecentOverride } from "./billing-types";

export type Educator = {
  id: string;
  name: string;
  city: string;
  state: string;
  status: "active" | "inactive" | "pending";
  qualityScore: number;
  trend: "up" | "down" | "stable";
  eventsCompleted: number;
  specialties: string[];
  lastEventDate: string | null;
  // R2 — Compensation (mm-ui-008). Optional so legacy mock data still
  // compiles; consumers that need comp data should rely on the rate fields
  // below being populated for active educators.
  standardRate?: number;
  standardRateEffectiveDate?: string;
  rateHistory?: RateHistoryEntry[];
  recentOverrides?: RecentOverride[];
};

export type QuestionnaireQuestion = {
  id: string;
  text: string;
  type: "rating" | "yes-no" | "multiple-choice" | "open-text" | "dropdown";
  options?: string[];
  required: boolean;
  category: string;
};

export type QuestionnaireTemplate = {
  id: string;
  name: string;
  description: string;
  campaignId?: string;
  questions: QuestionnaireQuestion[];
  createdAt: string;
};
