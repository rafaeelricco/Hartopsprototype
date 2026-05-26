// =============================================================================
// Pay History Panel — Larry's wishlist item from the Apr-20 demo (00:30:25):
// "if there was the ability to build it that it would coincide with the pay cycle"
// Mounted on both the ops BrandAmbassadorDetailPage and the market-manager
// BrandAmbassadorDetailPage. Reads PayrollLineItems filtered by BA id, groups
// by cycle window, and shows per-activity line items.
// =============================================================================

import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Wallet } from "lucide-react";
import { Card, CardContent } from "@/app/shared/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/shared/components/ui/table";
import {
  ACTIVITY_CATEGORIES,
  type PayrollLineItem,
  type PayrollCycle,
} from "@/app/shared/data/billing-types";
import {
  MOCK_PAYROLL_LINE_ITEMS,
  HISTORICAL_PAYROLL_LINE_ITEMS,
  CURRENT_PAYROLL_CYCLE,
  HISTORICAL_PAYROLL_CYCLES,
} from "@/app/ops/components/payroll-data";

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
}

function catLabel(value: string): string {
  return ACTIVITY_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export function PayHistoryPanel({
  brandAmbassadorId,
}: {
  brandAmbassadorId: string;
}) {
  const cyclesById = useMemo(() => {
    const all: PayrollCycle[] = [
      CURRENT_PAYROLL_CYCLE,
      ...HISTORICAL_PAYROLL_CYCLES,
    ];
    const map = new Map<string, PayrollCycle>();
    for (const c of all) map.set(c.id, c);
    return map;
  }, []);

  const grouped = useMemo(() => {
    const all = [
      ...MOCK_PAYROLL_LINE_ITEMS.map((p) => ({
        ...p,
        cycleId: CURRENT_PAYROLL_CYCLE.id,
      })),
      ...HISTORICAL_PAYROLL_LINE_ITEMS,
    ];
    const byCycle = new Map<string, PayrollLineItem[]>();
    for (const p of all) {
      const id = (p as PayrollLineItem & { cycleId?: string }).cycleId;
      if (!id) continue;
      if (p.brandAmbassadorId !== brandAmbassadorId) continue;
      const arr = byCycle.get(id) ?? [];
      arr.push(p);
      byCycle.set(id, arr);
    }
    return Array.from(byCycle.entries())
      .map(([id, items]) => {
        const cycle = cyclesById.get(id);
        const total = items.reduce(
          (s, p) => s + (p.status === "approved" ? p.finalPay : p.finalPay),
          0,
        );
        return { cycle, items, total };
      })
      .filter((g) => g.cycle)
      .sort((a, b) =>
        (b.cycle!.windowStart ?? "").localeCompare(a.cycle!.windowStart ?? ""),
      );
  }, [brandAmbassadorId, cyclesById]);

  const [open, setOpen] = useState<Set<string>>(
    () => new Set(grouped[0] ? [grouped[0].cycle!.id] : []),
  );

  function toggle(id: string) {
    const next = new Set(open);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setOpen(next);
  }

  if (grouped.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3
            className="flex items-center gap-2"
            style={{ fontSize: "1rem", color: "#0F172A" }}
          >
            <Wallet size={16} style={{ color: "#7D152D" }} />
            Pay History
          </h3>
          <p
            className="mt-2"
            style={{ fontSize: "0.875rem", color: "#94A3B8" }}
          >
            No pay history available for this BA yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalEarned = grouped.reduce((s, g) => s + g.total, 0);
  const cycleCount = grouped.length;

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3
              className="flex items-center gap-2"
              style={{ fontSize: "1rem", color: "#0F172A" }}
            >
              <Wallet size={16} style={{ color: "#7D152D" }} />
              Pay History
            </h3>
            <p
              className="mt-1"
              style={{ fontSize: "0.8125rem", color: "#94A3B8" }}
            >
              Earnings by pay cycle · BA-visible from the mobile app.
            </p>
          </div>
          <div className="text-right">
            <div
              className="font-semibold"
              style={{ fontSize: "1.25rem", color: "#0F172A" }}
            >
              {fmt(totalEarned)}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
              across {cycleCount} cycle{cycleCount === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {grouped.map((g) => {
            const isOpen = open.has(g.cycle!.id);
            const isCurrent = g.cycle!.id === CURRENT_PAYROLL_CYCLE.id;
            return (
              <div
                key={g.cycle!.id}
                className="rounded-lg border"
                style={{ borderColor: "#E2E8F0" }}
              >
                <button
                  type="button"
                  onClick={() => toggle(g.cycle!.id)}
                  className="w-full px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#F8FAFC]"
                  style={{ background: isOpen ? "#F8FAFC" : "white" }}
                >
                  <div className="flex items-center gap-2">
                    {isOpen ? (
                      <ChevronDown size={14} style={{ color: "#64748B" }} />
                    ) : (
                      <ChevronRight size={14} style={{ color: "#64748B" }} />
                    )}
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: "#0F172A",
                        fontWeight: 500,
                      }}
                    >
                      {g.cycle!.windowStart} → {g.cycle!.windowEnd}
                    </span>
                    {isCurrent && (
                      <span
                        className="px-1.5 py-0 rounded"
                        style={{
                          fontSize: "0.6875rem",
                          background: "#FFFBEB",
                          color: "#92400E",
                        }}
                      >
                        current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                    >
                      {g.items.length} activity
                      {g.items.length === 1 ? "" : " · activities"}
                    </span>
                    <strong
                      style={{ fontSize: "0.9375rem", color: "#0F172A" }}
                    >
                      {fmt(g.total)}
                    </strong>
                  </div>
                </button>
                {isOpen && (
                  <div
                    className="border-t"
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Activity</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Hours</TableHead>
                          <TableHead className="text-right">Rate</TableHead>
                          <TableHead className="text-right">Pay</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {g.items.map((p) => (
                          <TableRow key={p.id}>
                            <TableCell>{p.date}</TableCell>
                            <TableCell className="max-w-[220px] truncate">
                              {p.activityName}
                              {p.isCancellation && (
                                <span
                                  className="ml-2 px-1.5 py-0 rounded"
                                  style={{
                                    fontSize: "0.6875rem",
                                    background: "#F1F5F9",
                                    color: "#475569",
                                  }}
                                >
                                  cancellation
                                </span>
                              )}
                              {p.override && (
                                <span
                                  className="ml-2 px-1.5 py-0 rounded"
                                  style={{
                                    fontSize: "0.6875rem",
                                    background: "#FFFBEB",
                                    color: "#92400E",
                                  }}
                                  title={p.override.note}
                                >
                                  {p.override.reason}
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              <span
                                className="inline-flex px-2 py-0.5 rounded-md"
                                style={{
                                  fontSize: "0.6875rem",
                                  background: "#F1F5F9",
                                  color: "#475569",
                                }}
                              >
                                {catLabel(p.activityCategory)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              {p.hours}
                            </TableCell>
                            <TableCell className="text-right">
                              ${(p.override?.rate ?? p.standardRate).toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {fmt(p.finalPay)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
