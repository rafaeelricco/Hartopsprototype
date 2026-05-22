// =============================================================================
// Compensation Panel (mm-ui-008)
// Used by both Educator Manager and Hart Ops educator detail pages. Takes
// primitive rate/history/overrides props so it doesn't couple to either
// platform's Educator shape.
// =============================================================================

import { useState, useMemo } from "react";
import {
  DollarSign,
  Pencil,
  Clock,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import type {
  RateHistoryEntry,
  RecentOverride,
} from "@/app/shared/data/billing-types";
import { EditRateModal } from "./edit-rate-modal";

interface CompensationPanelProps {
  educatorId: string;
  educatorName: string;
  initialStandardRate: number;
  initialEffectiveDate: string; // YYYY-MM-DD
  initialRateHistory: RateHistoryEntry[];
  recentOverrides: RecentOverride[];
  upcomingEventsCount: number;
  // If false, hide the Edit button (e.g. read-only views). Default: editable.
  editable?: boolean;
}

function formatRate(rate: number): string {
  return rate === 0 ? "—" : `$${rate.toFixed(2)}/hr`;
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00Z");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function CompensationPanel({
  educatorId,
  educatorName,
  initialStandardRate,
  initialEffectiveDate,
  initialRateHistory,
  recentOverrides,
  upcomingEventsCount,
  editable = true,
}: CompensationPanelProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [rateHistory, setRateHistory] = useState(initialRateHistory);
  const [currentRate, setCurrentRate] = useState(initialStandardRate);
  const [currentEffectiveDate, setCurrentEffectiveDate] = useState(
    initialEffectiveDate,
  );

  // Frequent-overrides hint: 3+ overrides in last 90 days.
  const frequentOverridesHint = useMemo(() => {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const recent = recentOverrides.filter(
      (o) => new Date(o.date) >= ninetyDaysAgo,
    );
    return recent.length >= 3;
  }, [recentOverrides]);

  function handleSaveRate(input: {
    rate: number;
    effectiveDate: string;
    note: string;
  }) {
    const newEntry: RateHistoryEntry = {
      id: `rh-${educatorId}-${Date.now()}`,
      rate: input.rate,
      effectiveDate: input.effectiveDate,
      setBy: "Current session",
      ...(input.note ? { note: input.note } : {}),
    };
    const todayISO = new Date().toISOString().split("T")[0]!;
    setRateHistory([newEntry, ...rateHistory]);
    if (input.effectiveDate <= todayISO) {
      setCurrentRate(input.rate);
      setCurrentEffectiveDate(input.effectiveDate);
    }
    setEditOpen(false);
  }

  return (
    <div className="space-y-3">
      <h3
        style={{
          fontSize: "0.8125rem",
          color: "#94A3B8",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        Compensation
      </h3>

      <div className="bg-white rounded-xl border border-[#E2E8F0]">
        <div className="p-6 flex items-start justify-between gap-4 border-b border-[#E2E8F0]">
          <div>
            <div
              className="flex items-center gap-1.5 mb-1"
              style={{ fontSize: "0.75rem", color: "#94A3B8" }}
            >
              <DollarSign size={13} />
              Current standard rate
            </div>
            <div
              className="font-semibold"
              style={{ fontSize: "1.875rem", color: "#0F172A" }}
            >
              {formatRate(currentRate)}
            </div>
            <div
              className="mt-1"
              style={{ fontSize: "0.8125rem", color: "#64748B" }}
            >
              Effective {formatDate(currentEffectiveDate)}
            </div>
          </div>
          {editable && (
            <button
              onClick={() => setEditOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#7D152D]/5 transition-colors cursor-pointer"
              style={{ fontSize: "0.8125rem", color: "#7D152D" }}
            >
              <Pencil size={14} />
              Edit rate
            </button>
          )}
        </div>

        {frequentOverridesHint && (
          <div
            className="px-6 py-3 flex items-start gap-2 border-b border-[#E2E8F0]"
            style={{ background: "#FFFBEB" }}
          >
            <AlertTriangle
              size={15}
              style={{ color: "#D97706", marginTop: 2 }}
            />
            <div style={{ fontSize: "0.8125rem", color: "#92400E" }}>
              This educator has had {recentOverrides.length} overrides in the
              last 90 days — consider reviewing the standard rate.
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0]">
          <div className="p-6">
            <div
              className="flex items-center gap-1.5 mb-3"
              style={{ fontSize: "0.75rem", color: "#94A3B8" }}
            >
              <Clock size={13} />
              Rate history
            </div>
            {rateHistory.length === 0 ? (
              <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
                No rate history recorded yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {rateHistory.map((entry) => (
                  <li
                    key={entry.id}
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <div
                        className="font-medium"
                        style={{ fontSize: "0.875rem", color: "#0F172A" }}
                      >
                        {formatRate(entry.rate)}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                        From {formatDate(entry.effectiveDate)} · {entry.setBy}
                      </div>
                      {entry.note && (
                        <div
                          className="mt-1"
                          style={{ fontSize: "0.75rem", color: "#64748B" }}
                        >
                          {entry.note}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-6">
            <div
              className="flex items-center gap-1.5 mb-3"
              style={{ fontSize: "0.75rem", color: "#94A3B8" }}
            >
              <ChevronRight size={13} />
              Recent overrides
            </div>
            {recentOverrides.length === 0 ? (
              <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
                No event-level overrides yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {recentOverrides.slice(0, 10).map((override) => {
                  const delta = override.overrideRate - override.standardRate;
                  return (
                    <li
                      key={override.activityId}
                      className="flex items-start justify-between gap-4"
                    >
                      <div>
                        <div
                          className="font-medium"
                          style={{ fontSize: "0.875rem", color: "#0F172A" }}
                        >
                          {override.activityName}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                          {formatDate(override.date)} · {override.reason}
                        </div>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <div
                          className="font-medium"
                          style={{ fontSize: "0.875rem", color: "#0F172A" }}
                        >
                          {formatRate(override.overrideRate)}
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: delta > 0 ? "#0F766E" : "#94A3B8",
                          }}
                        >
                          {delta > 0 ? "+" : ""}
                          {`$${delta.toFixed(2)}`} vs standard
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      <EditRateModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        educatorName={educatorName}
        currentRate={currentRate}
        upcomingEventsCount={upcomingEventsCount}
        onSave={handleSaveRate}
      />
    </div>
  );
}
