// =============================================================================
// Step Billing (mm-ui-011)
// Mandatory billing step in the event creation wizard. Per-BA roster: pick
// each brandAmbassador individually, see their standard rate auto-fill, and override
// per-BA with a reason picklist. Service Fee preview from venue type
// (10% bar / 20% trade / 0% mixer). Activity-type aware: Event vs Survey
// fields differ to prove the activity-as-billable generalisation.
// =============================================================================

import { useMemo } from "react";
import {
  DollarSign,
  Building2,
  FileBadge,
  AlertCircle,
  Receipt,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { Input } from "@/app/shared/components/ui/input";
import { Label } from "@/app/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/components/ui/select";
import { Button } from "@/app/shared/components/ui/button";
import {
  OVERRIDE_REASONS,
  SERVICE_FEE_BY_KIND,
  BAR_SPEND_CEILING,
  BAR_SPEND_GRATUITY_RATE,
} from "@/app/shared/data/billing-types";
import type {
  ActivityType,
  OverrideReason,
  ServiceFeeKind,
} from "@/app/shared/data/billing-types";
import { MOCK_ACCOUNTS } from "@/lib/account-data";
import { mockBrandAmbassadors } from "@/app/market-manager/components/brand-ambassador-roster-data";

export interface BillingStepBa {
  rowId: string; // local UI id
  brandAmbassadorId: string;
  hours: number;
  overrideRate: number; // 0 = no override, use brandAmbassador's standard rate
  overrideReason: OverrideReason | "";
  overrideNote: string;
}

export interface BillingStepData {
  activityType: ActivityType;
  bas: BillingStepBa[];
  travel: number;
  // Bar-spend ceiling (P0 #10). Customer's budgeted bar ceiling for the
  // activity. Capped at BAR_SPEND_CEILING ($700). Auto-computes 20% gratuity
  // and feeds Max Ambassador Expense (labor + maxBarSpend + gratuity on max).
  maxBarSpend: number;
  expectedCompletions: number;
  perCompletionRate: number;
}

function makeRowId(): string {
  return `ba-${Math.random().toString(36).slice(2, 9)}`;
}

export const INITIAL_BILLING: BillingStepData = {
  activityType: "event",
  // Per Leah (May-26): BA assignment is optional at activity creation. The
  // operator may not know who's working yet — they assign during scheduling.
  bas: [],
  travel: 0,
  maxBarSpend: 0,
  expectedCompletions: 8,
  perCompletionRate: 15,
};

interface StepBillingProps {
  accountId: string;
  venueType: string;
  billing: BillingStepData;
  onChange: (next: BillingStepData) => void;
}

function venueTypeToFeeKind(venueType: string): ServiceFeeKind {
  if (venueType === "on-premises") return "bar";
  if (venueType === "off-premises" || venueType === "special") return "trade";
  return "mixer";
}

function fmtMoney(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function StepBilling({
  accountId,
  venueType,
  billing,
  onChange,
}: StepBillingProps) {
  const account = useMemo(
    () => MOCK_ACCOUNTS.find((a) => a.id === accountId),
    [accountId],
  );

  const feeKind: ServiceFeeKind =
    billing.activityType === "survey" ? "mixer" : venueTypeToFeeKind(venueType);
  const feeRate = SERVICE_FEE_BY_KIND[feeKind];
  const slaEligible =
    !!account &&
    account.state === "NY" &&
    !!account.distributorAccountIds &&
    Object.keys(account.distributorAccountIds).some((k) =>
      k.toLowerCase().includes("southern"),
    );

  const activeBrandAmbassadors = mockBrandAmbassadors.filter((e) => e.status === "Active");

  // Per-BA roster math.
  const baRows = billing.bas.map((row) => {
    const brandAmbassador = activeBrandAmbassadors.find((e) => e.id === row.brandAmbassadorId);
    const standardRate = brandAmbassador?.standardRate ?? 0;
    const effectiveRate =
      row.overrideRate > 0 ? row.overrideRate : standardRate;
    const isOverridden = row.overrideRate > 0;
    const subtotal = effectiveRate * row.hours;
    return {
      ...row,
      brandAmbassador,
      standardRate,
      effectiveRate,
      isOverridden,
      subtotal,
    };
  });

  const eventAmount =
    billing.activityType === "survey"
      ? billing.expectedCompletions * billing.perCompletionRate
      : baRows.reduce((s, r) => s + r.subtotal, 0);

  // Bar-spend math (P0 #10). Only applies to on-premise (bar) event activities.
  const isBarVenue =
    billing.activityType === "event" && feeKind === "bar";
  const maxBarSpendCapped = Math.min(
    Math.max(billing.maxBarSpend, 0),
    BAR_SPEND_CEILING,
  );
  const maxGratuity = isBarVenue
    ? maxBarSpendCapped * BAR_SPEND_GRATUITY_RATE
    : 0;

  // Service fee math (May-26 fix per Leah):
  //   bar venues → 10% × bar spend (NOT event amount / BA subtotal)
  //   trade venues → 20% × event amount
  //   mixer / survey → 0
  const serviceFeeAmount = isBarVenue
    ? maxBarSpendCapped * feeRate
    : feeKind === "trade"
      ? eventAmount * feeRate
      : 0;

  // "Max Ambassador Expense" is the customer's worst-case budget number per
  // Kayla — labor + max bar spend + 20% gratuity on the max.
  const maxAmbassadorExpense = isBarVenue
    ? eventAmount + maxBarSpendCapped + maxGratuity
    : eventAmount;

  const total =
    eventAmount +
    serviceFeeAmount +
    billing.travel +
    (isBarVenue ? maxBarSpendCapped + maxGratuity : 0);

  function patch<K extends keyof BillingStepData>(
    key: K,
    value: BillingStepData[K],
  ) {
    onChange({ ...billing, [key]: value });
  }

  function patchBa(rowId: string, next: Partial<BillingStepBa>) {
    onChange({
      ...billing,
      bas: billing.bas.map((b) =>
        b.rowId === rowId ? { ...b, ...next } : b,
      ),
    });
  }

  function addBa() {
    if (billing.bas.length >= 5) return;
    onChange({
      ...billing,
      bas: [
        ...billing.bas,
        {
          rowId: makeRowId(),
          brandAmbassadorId: "",
          hours: 4,
          overrideRate: 0,
          overrideReason: "",
          overrideNote: "",
        },
      ],
    });
  }

  function removeBa(rowId: string) {
    onChange({
      ...billing,
      bas: billing.bas.filter((b) => b.rowId !== rowId),
    });
  }

  // BAs already picked, so we can disable them in other dropdowns and avoid
  // accidentally double-booking the same brandAmbassador.
  const pickedIds = new Set(billing.bas.map((b) => b.brandAmbassadorId).filter(Boolean));

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="font-medium"
          style={{ fontSize: "1.125rem", color: "#0F172A" }}
        >
          Billing
        </h2>
        <p className="mt-1" style={{ fontSize: "0.875rem", color: "#64748B" }}>
          Most of these fields are auto-filled. Confirm or override per-BA before
          continuing — your inputs flow straight through to Hart Ops billing.
        </p>
      </div>

      {/* Activity-type toggle */}
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
        <Label className="mb-2 block" style={{ fontSize: "0.8125rem" }}>
          Activity type
        </Label>
        <div className="flex gap-2">
          {(["event", "survey"] as ActivityType[]).map((t) => {
            const active = billing.activityType === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => patch("activityType", t)}
                className="rounded-lg border px-3 py-2 cursor-pointer transition-colors"
                style={{
                  fontSize: "0.8125rem",
                  borderColor: active ? "#7D152D" : "#E2E8F0",
                  background: active ? "#7D152D0F" : "white",
                  color: active ? "#7D152D" : "#475569",
                }}
              >
                {t === "event" ? "Event" : "Survey"}
              </button>
            );
          })}
        </div>
        <p className="mt-2" style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
          Surveys use a per-completion rate and skip the service fee.
        </p>
      </div>

      {/* Account-driven read-only context */}
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 space-y-3">
        <div
          className="flex items-center gap-1.5"
          style={{ fontSize: "0.75rem", color: "#94A3B8" }}
        >
          <Building2 size={13} />
          Distributor & Billed To
        </div>
        {account ? (
          <>
            <div style={{ fontSize: "0.875rem", color: "#0F172A" }}>
              {Object.keys(account.distributorAccountIds ?? {})[0] ?? "—"}
            </div>
            <div style={{ fontSize: "0.8125rem", color: "#64748B" }}>
              {account.billingAddress
                ? `${account.billingAddress.company}, ${account.billingAddress.street}, ${account.billingAddress.city}, ${account.billingAddress.state} ${account.billingAddress.zip}`
                : "No billing address on file."}
            </div>
            <div
              className="flex flex-wrap gap-x-6 gap-y-1 pt-2"
              style={{ fontSize: "0.75rem", color: "#64748B" }}
            >
              <span>
                Liquor licence:{" "}
                <strong style={{ color: "#0F172A" }}>
                  {account.liquorLicence?.number ?? "Not on file"}
                </strong>
              </span>
              <span>
                Distributor ID:{" "}
                <strong style={{ color: "#0F172A" }}>
                  {Object.values(account.distributorAccountIds ?? {})[0] ??
                    "—"}
                </strong>
              </span>
            </div>
          </>
        ) : (
          <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
            Select a location in Event Basics to populate billing details.
          </p>
        )}
        {slaEligible && (
          <div
            className="flex items-start gap-2 rounded-md p-2.5"
            style={{ background: "#FEF3C7" }}
          >
            <FileBadge size={14} style={{ color: "#92400E", marginTop: 1 }} />
            <p style={{ fontSize: "0.75rem", color: "#92400E" }}>
              SLA-eligible (SGWS NY). Hart Ops will verify the liquor licence
              before this activity is invoiced.
            </p>
          </div>
        )}
      </div>

      {/* Event-mode: per-BA roster */}
      {billing.activityType === "event" && (
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2"
              style={{ fontSize: "0.875rem", color: "#0F172A" }}
            >
              <Users size={14} style={{ color: "#7D152D" }} />
              <strong>BA roster</strong>
              <span style={{ color: "#94A3B8", fontWeight: 400 }}>
                · optional ·{" "}
                {billing.bas.length === 0
                  ? "none assigned"
                  : `${billing.bas.length} of up to 5`}
              </span>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addBa}
              disabled={billing.bas.length >= 5}
            >
              <Plus size={13} className="mr-1.5" />
              Add BA
            </Button>
          </div>

          {baRows.length === 0 && (
            <div
              className="rounded-lg p-4 text-center"
              style={{
                background: "#F8FAFC",
                border: "1px dashed #E2E8F0",
                fontSize: "0.8125rem",
                color: "#64748B",
              }}
            >
              No Brand Ambassadors assigned yet. You can add them now or leave
              this empty and assign during scheduling.
            </div>
          )}

          <div className="space-y-3">
            {baRows.map((row, idx) => (
              <div
                key={row.rowId}
                className="rounded-lg p-3 space-y-3"
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="font-medium"
                    style={{ fontSize: "0.75rem", color: "#64748B" }}
                  >
                    BA #{idx + 1}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeBa(row.rowId)}
                    className="inline-flex items-center gap-1 cursor-pointer transition-colors hover:opacity-80"
                    style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                    title="Remove this BA"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label
                      htmlFor={`ba-${row.rowId}`}
                      style={{ fontSize: "0.75rem", color: "#64748B" }}
                    >
                      BrandAmbassador
                    </Label>
                    <Select
                      value={row.brandAmbassadorId}
                      onValueChange={(v) => patchBa(row.rowId, { brandAmbassadorId: v })}
                    >
                      <SelectTrigger id={`ba-${row.rowId}`}>
                        <SelectValue placeholder="Pick a BA…" />
                      </SelectTrigger>
                      <SelectContent>
                        {activeBrandAmbassadors.map((e) => (
                          <SelectItem
                            key={e.id}
                            value={e.id}
                            disabled={pickedIds.has(e.id) && e.id !== row.brandAmbassadorId}
                          >
                            {e.name} ({fmtMoney(e.standardRate)}/hr)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor={`hours-${row.rowId}`}
                      style={{ fontSize: "0.75rem", color: "#64748B" }}
                    >
                      Hours
                    </Label>
                    <Input
                      id={`hours-${row.rowId}`}
                      type="number"
                      min={0.5}
                      step={0.5}
                      value={row.hours}
                      onChange={(e) =>
                        patchBa(row.rowId, {
                          hours: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor={`rate-${row.rowId}`}
                      style={{ fontSize: "0.75rem", color: "#64748B" }}
                    >
                      Rate ($/hr)
                    </Label>
                    <Input
                      id={`rate-${row.rowId}`}
                      type="number"
                      step={0.5}
                      value={row.effectiveRate}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value) || 0;
                        if (v === row.standardRate || v === 0) {
                          patchBa(row.rowId, {
                            overrideRate: 0,
                            overrideReason: "",
                            overrideNote: "",
                          });
                        } else {
                          patchBa(row.rowId, { overrideRate: v });
                        }
                      }}
                    />
                    <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
                      Standard: {fmtMoney(row.standardRate)}/hr
                      {row.isOverridden && (
                        <span style={{ color: "#D97706" }}> · Overridden</span>
                      )}
                    </p>
                  </div>

                  {row.isOverridden && (
                    <>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor={`reason-${row.rowId}`}
                          style={{ fontSize: "0.75rem", color: "#64748B" }}
                        >
                          Override reason
                        </Label>
                        <Select
                          value={row.overrideReason}
                          onValueChange={(v) =>
                            patchBa(row.rowId, {
                              overrideReason: v as OverrideReason,
                            })
                          }
                        >
                          <SelectTrigger id={`reason-${row.rowId}`}>
                            <SelectValue placeholder="Pick a reason…" />
                          </SelectTrigger>
                          <SelectContent>
                            {OVERRIDE_REASONS.map((r) => (
                              <SelectItem key={r} value={r}>
                                {r}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor={`note-${row.rowId}`}
                          style={{ fontSize: "0.75rem", color: "#64748B" }}
                        >
                          Note (optional)
                        </Label>
                        <Input
                          id={`note-${row.rowId}`}
                          value={row.overrideNote}
                          onChange={(e) =>
                            patchBa(row.rowId, {
                              overrideNote: e.target.value,
                            })
                          }
                        />
                      </div>
                    </>
                  )}
                </div>

                <div
                  className="flex items-center justify-between pt-2"
                  style={{
                    fontSize: "0.8125rem",
                    color: "#0F172A",
                    borderTop: "1px solid #E2E8F0",
                  }}
                >
                  <span style={{ color: "#64748B" }}>
                    BA subtotal · {fmtMoney(row.effectiveRate)} × {row.hours}h
                  </span>
                  <strong>{fmtMoney(row.subtotal)}</strong>
                </div>
              </div>
            ))}
          </div>

          {isBarVenue && (
            <div className="space-y-1.5 pt-2 sm:max-w-[50%]">
              <Label htmlFor="max-bar-spend" style={{ fontSize: "0.8125rem" }}>
                Max bar spend ($)
              </Label>
              <Input
                id="max-bar-spend"
                type="number"
                min={0}
                max={BAR_SPEND_CEILING}
                value={billing.maxBarSpend}
                onChange={(e) => {
                  const raw = parseFloat(e.target.value) || 0;
                  const capped = Math.min(
                    Math.max(raw, 0),
                    BAR_SPEND_CEILING,
                  );
                  patch("maxBarSpend", capped);
                }}
              />
              <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
                Budget ceiling only · ${BAR_SPEND_CEILING} platform max with
                20% gratuity bundled. Actual bar spend is logged after the
                activity from receipts — the 10% service fee and final invoice
                line both recalculate from that figure, not from this estimate.
              </p>
              {billing.maxBarSpend > BAR_SPEND_CEILING && (
                <p style={{ fontSize: "0.6875rem", color: "#B91C1C" }}>
                  Capped at the ${BAR_SPEND_CEILING} platform ceiling.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Survey-mode fields */}
      {billing.activityType === "survey" && (
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="completions" style={{ fontSize: "0.8125rem" }}>
                Expected completions
              </Label>
              <Input
                id="completions"
                type="number"
                min={1}
                value={billing.expectedCompletions}
                onChange={(e) =>
                  patch(
                    "expectedCompletions",
                    parseInt(e.target.value, 10) || 0,
                  )
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="per-completion-rate"
                style={{ fontSize: "0.8125rem" }}
              >
                Rate per completion ($)
              </Label>
              <Input
                id="per-completion-rate"
                type="number"
                step="0.50"
                value={billing.perCompletionRate}
                onChange={(e) =>
                  patch(
                    "perCompletionRate",
                    parseFloat(e.target.value) || 0,
                  )
                }
              />
            </div>
          </div>
          <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
            Surveys don't carry a service fee. The total below is just
            completions × rate.
          </p>
        </div>
      )}

      {/* Live total preview */}
      <div
        className="rounded-xl border p-4 space-y-2"
        style={{ borderColor: "#7D152D33", background: "#7D152D08" }}
      >
        <div
          className="flex items-center gap-1.5"
          style={{ fontSize: "0.75rem", color: "#7D152D" }}
        >
          <Receipt size={13} />
          Live invoice preview
        </div>
        <div className="grid gap-1.5" style={{ fontSize: "0.875rem" }}>
          {billing.activityType === "event" ? (
            baRows.map((row) => (
              <div
                key={row.rowId}
                className="flex items-center justify-between"
              >
                <span style={{ color: "#64748B" }}>
                  {row.brandAmbassador?.name ?? "Unassigned"} ·{" "}
                  {fmtMoney(row.effectiveRate)} × {row.hours}h
                  {row.isOverridden && (
                    <span style={{ color: "#D97706" }}>
                      {" "}
                      · {row.overrideReason || "override"}
                    </span>
                  )}
                </span>
                <span style={{ color: "#0F172A" }}>
                  {fmtMoney(row.subtotal)}
                </span>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-between">
              <span style={{ color: "#64748B" }}>
                {billing.expectedCompletions} ×{" "}
                {fmtMoney(billing.perCompletionRate)}
              </span>
              <strong style={{ color: "#0F172A" }}>{fmtMoney(eventAmount)}</strong>
            </div>
          )}

          {billing.activityType === "event" && (
            <div
              className="flex items-center justify-between pt-1"
              style={{ borderTop: "1px dashed #7D152D33" }}
            >
              <span style={{ color: "#475569" }}>BA pay subtotal</span>
              <strong style={{ color: "#0F172A" }}>{fmtMoney(eventAmount)}</strong>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span style={{ color: "#64748B" }}>
              Service fee ({(feeRate * 100).toFixed(0)}% — {feeKind})
              {isBarVenue && (
                <span
                  style={{
                    fontSize: "0.6875rem",
                    color: "#94A3B8",
                    marginLeft: 6,
                  }}
                >
                  (estimate — recalculated from actual bar spend post-activity)
                </span>
              )}
            </span>
            <span style={{ color: "#0F172A" }}>{fmtMoney(serviceFeeAmount)}</span>
          </div>
          {billing.travel > 0 && (
            <div className="flex items-center justify-between">
              <span style={{ color: "#64748B" }}>Travel</span>
              <span style={{ color: "#0F172A" }}>{fmtMoney(billing.travel)}</span>
            </div>
          )}
          {isBarVenue && maxBarSpendCapped > 0 && (
            <>
              <div className="flex items-center justify-between">
                <span style={{ color: "#64748B" }}>
                  Max bar spend (ceiling ${BAR_SPEND_CEILING}, includes 20% grat.)
                </span>
                <span style={{ color: "#0F172A" }}>
                  {fmtMoney(maxBarSpendCapped + maxGratuity)}
                </span>
              </div>
              <div
                className="flex items-center justify-between pt-1 mt-1"
                style={{ borderTop: "1px dashed #7D152D33" }}
              >
                <span style={{ color: "#7D152D" }}>
                  Max Ambassador Expense (budgeting ceiling)
                </span>
                <strong style={{ color: "#7D152D" }}>
                  {fmtMoney(maxAmbassadorExpense)}
                </strong>
              </div>
            </>
          )}
          <div
            className="pt-2 mt-1 flex items-center justify-between"
            style={{ borderTop: "1px solid #7D152D33" }}
          >
            <span style={{ color: "#7D152D", fontWeight: 500 }}>
              <DollarSign size={13} className="inline" /> Total invoice
            </span>
            <strong style={{ color: "#7D152D", fontSize: "1.125rem" }}>
              {fmtMoney(total)}
            </strong>
          </div>
        </div>
      </div>

      {!account && (
        <div
          className="rounded-lg border p-3 flex items-start gap-2"
          style={{ background: "#FEF3C7", borderColor: "#FDE68A" }}
        >
          <AlertCircle size={14} style={{ color: "#92400E", marginTop: 2 }} />
          <p style={{ fontSize: "0.8125rem", color: "#92400E" }}>
            Set a location with a matched account in Event Basics so billing
            fields populate cleanly.
          </p>
        </div>
      )}
    </div>
  );
}
