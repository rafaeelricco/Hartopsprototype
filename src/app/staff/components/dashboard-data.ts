// =============================================================================
// Centralized mock data for the dashboard, keyed by timeframe.
// Both stat cards and chart series are derived from the same source so they
// stay in sync when the timeframe filter changes (MM-UI-001 implication).
// =============================================================================

export type Timeframe = "Last 30 days" | "3 months" | "6 months" | "12 months";

export const TIMEFRAMES: Timeframe[] = [
  "Last 30 days",
  "3 months",
  "6 months",
  "12 months",
];

export interface StatCard {
  label: string;
  value: string;
  change: string;
  up: boolean;
}

export interface ChartPoint {
  date: string;
  current: number;
  previous: number;
}

interface DashboardData {
  stats: StatCard[];
  chart: ChartPoint[];
}

// ---------------------------------------------------------------------------
// Helper — generate chart points for a given timeframe
// ---------------------------------------------------------------------------

function generateChartPoints(
  count: number,
  labels: string[],
  baseCurrent: number,
  basePrevious: number,
  variance: number,
): ChartPoint[] {
  const points: ChartPoint[] = [];
  let cur = baseCurrent;
  let prev = basePrevious;
  for (let i = 0; i < count; i++) {
    cur += Math.round((Math.random() - 0.35) * variance);
    prev += Math.round((Math.random() - 0.45) * variance * 0.7);
    cur = Math.max(cur, baseCurrent * 0.4);
    prev = Math.max(prev, basePrevious * 0.3);
    points.push({ date: labels[i], current: cur, previous: prev });
  }
  return points;
}

// ---------------------------------------------------------------------------
// 30-day data (daily granularity, show every 5th label)
// ---------------------------------------------------------------------------

const labels30d = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - 29 + i);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
});

const data30d: DashboardData = {
  stats: [
    { label: "Total Samples", value: "24,812", change: "+12.5%", up: true },
    { label: "Consumer Reach", value: "182,493", change: "+8.2%", up: true },
    { label: "Total Sales", value: "$48,290", change: "+15.3%", up: true },
    { label: "Events", value: "34", change: "-2.1%", up: false },
  ],
  chart: generateChartPoints(30, labels30d, 800, 650, 120),
};

// ---------------------------------------------------------------------------
// 3-month data (weekly granularity)
// ---------------------------------------------------------------------------

const labels3m = Array.from({ length: 12 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (11 - i) * 7);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
});

const data3m: DashboardData = {
  stats: [
    { label: "Total Samples", value: "68,430", change: "+18.7%", up: true },
    { label: "Consumer Reach", value: "512,810", change: "+11.4%", up: true },
    { label: "Total Sales", value: "$134,750", change: "+22.1%", up: true },
    { label: "Events", value: "97", change: "+5.8%", up: true },
  ],
  chart: generateChartPoints(12, labels3m, 2200, 1800, 350),
};

// ---------------------------------------------------------------------------
// 6-month data (bi-weekly granularity)
// ---------------------------------------------------------------------------

const labels6m = Array.from({ length: 12 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (11 - i) * 14);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
});

const data6m: DashboardData = {
  stats: [
    { label: "Total Samples", value: "142,975", change: "+24.3%", up: true },
    { label: "Consumer Reach", value: "1,048,320", change: "+19.6%", up: true },
    { label: "Total Sales", value: "$287,410", change: "+28.9%", up: true },
    { label: "Events", value: "186", change: "+12.4%", up: true },
  ],
  chart: generateChartPoints(12, labels6m, 4500, 3600, 600),
};

// ---------------------------------------------------------------------------
// 12-month data (monthly granularity)
// ---------------------------------------------------------------------------

const labels12m = Array.from({ length: 12 }, (_, i) => {
  const d = new Date();
  d.setMonth(d.getMonth() - 11 + i);
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
});

const data12m: DashboardData = {
  stats: [
    { label: "Total Samples", value: "298,614", change: "+31.2%", up: true },
    { label: "Consumer Reach", value: "2,194,780", change: "+26.8%", up: true },
    { label: "Total Sales", value: "$612,340", change: "+35.1%", up: true },
    { label: "Events", value: "412", change: "+18.7%", up: true },
  ],
  chart: generateChartPoints(12, labels12m, 9000, 6800, 1200),
};

// ---------------------------------------------------------------------------
// Lookup
// ---------------------------------------------------------------------------

const DATA_MAP: Record<Timeframe, DashboardData> = {
  "Last 30 days": data30d,
  "3 months": data3m,
  "6 months": data6m,
  "12 months": data12m,
};

export function getDashboardData(timeframe: Timeframe): DashboardData {
  return DATA_MAP[timeframe];
}
