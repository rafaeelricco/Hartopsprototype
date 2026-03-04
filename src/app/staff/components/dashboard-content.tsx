// =============================================================================
// Dashboard page content — 4 Stat Cards + Performance Trend Chart.
// Reads the current timeframe from layout context and derives all data from
// the shared dashboard-data module so everything stays in sync.
// =============================================================================

import { useMemo, useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  getDashboardData,
  type Timeframe,
  type StatCard,
  type ChartPoint,
} from "./dashboard-data";

const STAT_ICONS = [TrendingUp, Users, ShoppingCart, Calendar];

// Custom tooltip
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg border border-[#E2E8F0] shadow-lg px-4 py-3"
      style={{ background: "#FFFFFF" }}
    >
      <p className="mb-1.5" style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
        {label}
      </p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: entry.color }}
          />
          <span style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
            {entry.name}: <strong>{entry.value.toLocaleString()}</strong>
          </span>
        </div>
      ))}
    </div>
  );
}

// Custom legend
function ChartLegend({ payload }: any) {
  if (!payload?.length) return null;
  return (
    <div className="flex items-center justify-center gap-6 mt-2">
      {payload.map((entry: any) => (
        <div key={entry.value} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: entry.color }}
          />
          <span style={{ fontSize: "0.8125rem", color: "#64748B" }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function DashboardContent() {
  const { timeframe } = useOutletContext<{ timeframe: Timeframe }>();

  const data = useMemo(() => getDashboardData(timeframe), [timeframe]);

  // Fade transition on data change
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, [timeframe]);

  return (
    <div
      className="p-6 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* -------------------------------------------------------------- */}
      {/* Stat Cards                                                      */}
      {/* -------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {data.stats.map((card: StatCard, idx: number) => {
          const Icon = STAT_ICONS[idx];
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl border border-[#E2E8F0] p-5 flex flex-col transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <span style={{ fontSize: "0.875rem", color: "#64748B" }}>
                  {card.label}
                </span>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "#7D152D0F" }}
                >
                  <Icon size={19} style={{ color: "#7D152D" }} />
                </div>
              </div>
              <span
                className="mb-1"
                style={{
                  fontSize: "1.75rem",
                  color: "#0F172A",
                  lineHeight: 1.2,
                }}
              >
                {card.value}
              </span>
              <span
                className="flex items-center gap-1"
                style={{ fontSize: "0.8125rem" }}
              >
                {card.up ? (
                  <ArrowUpRight size={14} style={{ color: "#0F766E" }} />
                ) : (
                  <ArrowDownRight size={14} style={{ color: "#EF4444" }} />
                )}
                <span style={{ color: card.up ? "#0F766E" : "#EF4444" }}>
                  {card.change}
                </span>
                <span style={{ color: "#94A3B8" }}>vs previous period</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* -------------------------------------------------------------- */}
      {/* Performance Trend Chart                                         */}
      {/* -------------------------------------------------------------- */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <div className="flex items-center justify-between mb-1">
          <h3 style={{ fontSize: "1.125rem", color: "#0F172A" }}>
            Performance Trend
          </h3>
          <span
            className="px-2.5 py-1 rounded-md"
            style={{
              fontSize: "0.75rem",
              color: "#64748B",
              background: "#F1F5F9",
            }}
          >
            {timeframe}
          </span>
        </div>
        <p className="mb-5" style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
          Campaign reach over time — current vs. previous period
        </p>

        <ResponsiveContainer width="100%" height={320}>
          <AreaChart
            data={data.chart}
            margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7D152D" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#7D152D" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradPrevious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0F766E" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E2E8F0"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#94A3B8" }}
              tickLine={false}
              axisLine={{ stroke: "#E2E8F0" }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94A3B8" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)
              }
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend content={<ChartLegend />} />
            <Area
              type="monotone"
              dataKey="current"
              name="Current Period"
              stroke="#7D152D"
              strokeWidth={2.5}
              fill="url(#gradCurrent)"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
            />
            <Area
              type="monotone"
              dataKey="previous"
              name="Previous Period"
              stroke="#0F766E"
              strokeWidth={2}
              strokeDasharray="6 4"
              fill="url(#gradPrevious)"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
