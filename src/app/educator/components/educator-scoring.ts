// Educator Scoring & Metrics utilities
// Composite quality score calculation, color coding, and trend helpers

import type { Educator } from "./educator-roster-data";

/* ─── Composite Quality Score ─────────────────────────────────────────────── */

/**
 * P1 Metric Weights (total = 100%):
 *   Retailer Survey Score:   25%
 *   Retail Sales Avg:        20%
 *   Check-in Score:          20%
 *   Cancellation Rating:     20%
 *   Event Completion Avg:    15%
 */
export function computeQualityScore(educator: Educator): number {
  const retailSalesNorm = Math.min(educator.retailSalesAvg / 20, 1); // 20 units/event = 100%
  const checkInNorm = educator.checkInScore / 100;
  const completionNorm = educator.eventCompletionAvg / 100;
  const surveyNorm = educator.retailerSurveyScore / 5;
  const cancellationNorm = educator.cancellationRating / 100;

  const score =
    retailSalesNorm * 20 +
    checkInNorm * 20 +
    completionNorm * 15 +
    surveyNorm * 25 +
    cancellationNorm * 20;

  return Math.round(Math.min(score, 100));
}

/* ─── Color Coding ────────────────────────────────────────────────────────── */

export type ScoreLevel = "excellent" | "average" | "needs-improvement";

export function getScoreLevel(score: number): ScoreLevel {
  if (score >= 80) return "excellent";
  if (score >= 60) return "average";
  return "needs-improvement";
}

/** Tailwind classes for score badge background + text */
export const scoreLevelStyles: Record<ScoreLevel, { bg: string; text: string; border: string }> = {
  excellent: {
    bg: "bg-green-500/10",
    text: "text-green-600",
    border: "border-green-500/20",
  },
  average: {
    bg: "bg-amber-500/10",
    text: "text-amber-600",
    border: "border-amber-500/20",
  },
  "needs-improvement": {
    bg: "bg-red-500/10",
    text: "text-red-600",
    border: "border-red-500/20",
  },
};

/** Get Tailwind classes for a 0–100 score */
export function getScoreColor(score: number) {
  return scoreLevelStyles[getScoreLevel(score)];
}

/** Get Tailwind classes for a 1–5 scale metric (e.g., Retailer Survey Score) */
export function getMetricColor5(value: number) {
  if (value >= 4.0) return scoreLevelStyles["excellent"];
  if (value >= 3.0) return scoreLevelStyles["average"];
  return scoreLevelStyles["needs-improvement"];
}

/* ─── Trend Helpers ───────────────────────────────────────────────────────── */

export type TrendDirection = "up" | "down" | "flat";

export function getTrendDirection(delta: number): TrendDirection {
  if (delta > 0.5) return "up";
  if (delta < -0.5) return "down";
  return "flat";
}

export function getTrendArrow(delta: number): string {
  const dir = getTrendDirection(delta);
  if (dir === "up") return "↑";
  if (dir === "down") return "↓";
  return "→";
}

export function getTrendColor(delta: number): string {
  const dir = getTrendDirection(delta);
  if (dir === "up") return "text-green-600";
  if (dir === "down") return "text-red-500";
  return "text-muted-foreground";
}

/** Format a trend delta for display (e.g., +2.3, -1.1, —) */
export function formatTrendDelta(delta: number): string {
  if (Math.abs(delta) <= 0.5) return "—";
  const sign = delta > 0 ? "+" : "";
  return `${sign}${delta.toFixed(1)}`;
}

/* ─── Metric Definitions ──────────────────────────────────────────────────── */

export interface MetricDefinition {
  key: string;
  label: string;
  icon: string; // lucide icon name
  format: (value: number) => string;
  getColor: (value: number) => { bg: string; text: string; border: string };
  trendKey: keyof Educator["trends"];
}

export const P1_METRICS: MetricDefinition[] = [
  {
    key: "retailSalesAvg",
    label: "Retail Sales Avg",
    icon: "ShoppingCart",
    format: (v) => `${v.toFixed(1)} units`,
    getColor: (v) => getScoreColor(Math.min(v / 20, 1) * 100),
    trendKey: "retailSalesAvg",
  },
  {
    key: "checkInScore",
    label: "Check-in Score",
    icon: "Clock",
    format: (v) => `${v}%`,
    getColor: getScoreColor,
    trendKey: "checkInScore",
  },
  {
    key: "eventCompletionAvg",
    label: "Event Completion Avg",
    icon: "CheckCircle2",
    format: (v) => `${v}%`,
    getColor: getScoreColor,
    trendKey: "eventCompletionAvg",
  },
  {
    key: "retailerSurveyScore",
    label: "Retailer Survey Score",
    icon: "Star",
    format: (v) => `${v.toFixed(1)} / 5`,
    getColor: getMetricColor5,
    trendKey: "retailerSurveyScore",
  },
  {
    key: "cancellationRating",
    label: "Cancellation Rating",
    icon: "RotateCcw",
    format: (v) => `${v}%`,
    getColor: getScoreColor,
    trendKey: "cancellationRating",
  },
];
