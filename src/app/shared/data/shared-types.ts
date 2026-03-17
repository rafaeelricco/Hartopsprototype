/* ------------------------------------------------------------------ */
/* Shared types used across ops & staff platforms                       */
/* ------------------------------------------------------------------ */

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
};

export type QuestionnaireQuestion = {
  id: string;
  text: string;
  type: "rating" | "yes-no" | "multiple-choice" | "open-text";
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
