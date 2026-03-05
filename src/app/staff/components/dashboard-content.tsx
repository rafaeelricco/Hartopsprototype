// =============================================================================
// Dashboard page content — 4 Stat Cards + Performance Trend Chart.
// Reads the current timeframe from layout context and derives all data from
// the shared dashboard-data module so everything stays in sync.
// =============================================================================

import { useMemo, useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/shared/components/ui/card";
import { Badge } from "@/app/shared/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/app/shared/components/ui/chart";
import {
  getDashboardData,
  type Timeframe,
  type StatCard,
} from "./dashboard-data";

const STAT_ICONS = [TrendingUp, Users, ShoppingCart, Calendar];

const performanceChartConfig: ChartConfig = {
  current: { label: "Current Period", color: "#7D152D" },
  previous: { label: "Previous Period", color: "#0F766E" },
};

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
      className="p-6 space-y-6 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Page Header */}
      <div>
        <h1 className="text-foreground">Dashboard</h1>
        <p
          className="text-muted-foreground mt-1"
          style={{ fontSize: "0.875rem" }}
        >
          Campaign performance overview and key metrics.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.stats.map((card: StatCard, idx: number) => {
          const Icon = STAT_ICONS[idx] as React.ComponentType<{
            className?: string;
          }>;
          return (
            <Card key={card.label} className="gap-0">
              <CardHeader className="pb-2 pt-5 px-5">
                <div className="flex items-center justify-between">
                  <CardDescription style={{ fontSize: "0.8125rem" }}>
                    {card.label}
                  </CardDescription>
                  <div className="flex items-center justify-center size-8 rounded-md bg-[#7D152D]/8">
                    <Icon className="size-4 text-[#7D152D]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div
                  className="text-foreground"
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  {card.value}
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  {card.up ? (
                    <TrendingUp className="size-3.5 text-green-600" />
                  ) : (
                    <TrendingDown className="size-3.5 text-red-500" />
                  )}
                  <span
                    className={card.up ? "text-green-600" : "text-red-500"}
                    style={{ fontSize: "0.75rem", fontWeight: 500 }}
                  >
                    {card.change}
                  </span>
                  <span
                    className="text-muted-foreground"
                    style={{ fontSize: "0.75rem" }}
                  >
                    vs previous period
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance Trend Chart */}
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-0">
          <div className="flex items-center justify-between">
            <CardTitle
              style={{
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Performance Trend
            </CardTitle>
            <Badge variant="secondary">{timeframe}</Badge>
          </div>
          <CardDescription style={{ fontSize: "0.8125rem" }}>
            Campaign reach over time — current vs. previous period
          </CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5 pt-4">
          <ChartContainer
            config={performanceChartConfig}
            className="h-[260px] w-full"
          >
            <AreaChart
              data={data.chart}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
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
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                style={{ fontSize: "0.75rem" }}
                interval="preserveStartEnd"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                style={{ fontSize: "0.75rem" }}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)
                }
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
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
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
