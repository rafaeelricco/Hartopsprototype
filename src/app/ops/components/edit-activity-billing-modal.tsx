// =============================================================================
// Edit Activity Billing Modal
// Per-row edit affordance on the Update Billing tab. Operator opens this from
// the row to adjust billing code, supplier, amounts, bar spend, and post-
// activity expenses BEFORE approving the row for invoicing.
// Mirrors the HEMS workflow Kayla / Larry described at 01:07:15 + 01:10:10.
// =============================================================================

import { useEffect, useState } from "react";
import { Save, X as XIcon, ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/shared/components/ui/dialog";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import { Label } from "@/app/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/components/ui/select";
import {
  BAR_SPEND_CEILING,
  BAR_SPEND_GRATUITY_RATE,
  SERVICE_FEE_BY_KIND,
  ACTIVITY_TRACK_STATUSES,
  INVOICE_TRACK_STATUSES,
  INVOICE_PAYMENT_STATUSES,
} from "@/app/shared/data/billing-types";
import type {
  ActivityTrackStatus,
  BillingActivity,
  InvoicePaymentStatus,
  InvoiceTrackStatus,
} from "@/app/shared/data/billing-types";
import { INITIAL_CAMPAIGNS } from "@/app/staff/components/campaign-data";
import { CampaignTag } from "./campaign-tag";
import { getBillingActivityBlockReasons } from "./billing-data";

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
}

export interface EditActivityBillingPatch {
  billingCode?: string;
  billingCodeCustom?: boolean;
  supplier?: string;
  distributor?: string;
  eventAmount?: number;
  ambassadorAmount?: number;
  travel?: number;
  barSpend?: number;
  maxBarSpend?: number;
  gratuity?: number;
  suppliesAmount?: number;
  promotionPublicityAmount?: number;
  travelEntertainmentAmount?: number;
  expectedAmount?: number;
  status?: BillingActivity["status"];
  activityTrackStatus?: ActivityTrackStatus;
  invoiceTrackStatus?: InvoiceTrackStatus;
  paymentTrackStatus?: InvoicePaymentStatus;
}

interface Props {
  open: boolean;
  onClose: () => void;
  activity: BillingActivity | null;
  onSave: (id: string, patch: EditActivityBillingPatch) => void;
  onApprove: (id: string) => void;
}

interface Draft {
  billingCode: string;
  supplier: string;
  distributor: string;
  eventAmount: string;
  ambassadorAmount: string;
  travel: string;
  barSpend: string;
  maxBarSpend: string;
  suppliesAmount: string;
  promotionPublicityAmount: string;
  travelEntertainmentAmount: string;
  activityTrackStatus: ActivityTrackStatus;
  invoiceTrackStatus: InvoiceTrackStatus;
  paymentTrackStatus: InvoicePaymentStatus;
}

function makeDraft(a: BillingActivity): Draft {
  return {
    billingCode: a.billingCode ?? "",
    supplier: a.supplier ?? "",
    distributor: a.distributor,
    eventAmount: String(a.eventAmount),
    ambassadorAmount: String(a.ambassadorAmount),
    travel: String(a.travel),
    barSpend: a.barSpend != null ? String(a.barSpend) : "",
    maxBarSpend: a.maxBarSpend != null ? String(a.maxBarSpend) : "",
    suppliesAmount:
      a.suppliesAmount != null ? String(a.suppliesAmount) : "",
    promotionPublicityAmount:
      a.promotionPublicityAmount != null
        ? String(a.promotionPublicityAmount)
        : "",
    travelEntertainmentAmount:
      a.travelEntertainmentAmount != null
        ? String(a.travelEntertainmentAmount)
        : "",
    activityTrackStatus:
      a.activityTrackStatus ??
      (a.status === "missing" ? "not-completed" : "completed"),
    invoiceTrackStatus:
      a.invoiceTrackStatus ??
      (a.status === "missing" ? "not-ready" : "ready"),
    paymentTrackStatus: a.paymentTrackStatus ?? "open",
  };
}

export function EditActivityBillingModal({
  open,
  onClose,
  activity,
  onSave,
  onApprove,
}: Props) {
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    setDraft(activity ? makeDraft(activity) : null);
  }, [activity?.id, activity]);

  if (!activity || !draft) return null;

  const isBar = activity.serviceFeeKind === "bar";
  const feeRate = SERVICE_FEE_BY_KIND[activity.serviceFeeKind];

  // Billing-code dropdown sourced from the parent campaign (Leah 00:19:04).
  const parentCampaign = activity.campaignId
    ? INITIAL_CAMPAIGNS.find((c) => c.id === activity.campaignId)
    : undefined;
  const campaignCodes = parentCampaign?.billingCodes ?? [];
  const codeIsCustom =
    draft.billingCode !== "" && !campaignCodes.includes(draft.billingCode);

  const eventAmt = parseFloat(draft.eventAmount) || 0;
  const travelAmt = parseFloat(draft.travel) || 0;
  const barSpendAmt = parseFloat(draft.barSpend) || 0;
  const cappedBarSpend = Math.min(Math.max(barSpendAmt, 0), BAR_SPEND_CEILING);
  const computedGratuity = isBar
    ? cappedBarSpend * BAR_SPEND_GRATUITY_RATE
    : 0;
  const supplies = parseFloat(draft.suppliesAmount) || 0;
  const promPub = parseFloat(draft.promotionPublicityAmount) || 0;
  const travelEnt = parseFloat(draft.travelEntertainmentAmount) || 0;
  // Service fee math (May-26 fix per Leah):
  //   bar venues → 10% × bar spend
  //   trade venues → 20% × event amount
  //   mixer / survey → 0
  const serviceFee = isBar
    ? cappedBarSpend * feeRate
    : activity.serviceFeeKind === "trade"
      ? eventAmt * feeRate
      : 0;
  const previewTotal =
    eventAmt +
    serviceFee +
    travelAmt +
    cappedBarSpend +
    computedGratuity +
    supplies +
    promPub +
    travelEnt;
  const approvalBlockReason = getBillingActivityBlockReasons(activity)[0];

  function patch(p: Partial<Draft>) {
    setDraft((d) => (d ? { ...d, ...p } : d));
  }

  function buildPatch(): EditActivityBillingPatch {
    if (!activity) return {};
    const out: EditActivityBillingPatch = {};
    if (draft!.billingCode !== (activity.billingCode ?? "")) {
      out.billingCode = draft!.billingCode;
      out.billingCodeCustom = codeIsCustom;
    }
    if (draft!.supplier !== (activity.supplier ?? "")) {
      out.supplier = draft!.supplier;
    }
    if (draft!.distributor !== activity.distributor) {
      out.distributor = draft!.distributor;
    }
    if (eventAmt !== activity.eventAmount) out.eventAmount = eventAmt;
    const ambAmt = parseFloat(draft!.ambassadorAmount) || 0;
    if (ambAmt !== activity.ambassadorAmount) out.ambassadorAmount = ambAmt;
    if (travelAmt !== activity.travel) out.travel = travelAmt;
    if (isBar) {
      out.barSpend = cappedBarSpend;
      out.maxBarSpend = parseFloat(draft!.maxBarSpend) || 0;
      out.gratuity = computedGratuity;
    }
    out.suppliesAmount = supplies;
    out.promotionPublicityAmount = promPub;
    out.travelEntertainmentAmount = travelEnt;
    out.expectedAmount = previewTotal;
    if (draft!.activityTrackStatus !== activity.activityTrackStatus)
      out.activityTrackStatus = draft!.activityTrackStatus;
    if (draft!.invoiceTrackStatus !== activity.invoiceTrackStatus)
      out.invoiceTrackStatus = draft!.invoiceTrackStatus;
    if (draft!.paymentTrackStatus !== activity.paymentTrackStatus)
      out.paymentTrackStatus = draft!.paymentTrackStatus;
    return out;
  }

  function handleSave() {
    onSave(activity!.id, buildPatch());
    onClose();
  }

  function handleSaveAndApprove() {
    if (getBillingActivityBlockReasons(activity!).length > 0) return;
    onSave(activity!.id, { ...buildPatch(), status: "ready-to-bill" });
    onApprove(activity!.id);
    onClose();
  }

  function handleReject() {
    onSave(activity!.id, { status: "missing" });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : onClose())}>
      <DialogContent className="!max-w-[min(96vw,1100px)] w-[min(96vw,1100px)]">
        <DialogHeader>
          <DialogTitle>Edit billing — {activity.name}</DialogTitle>
          <DialogDescription className="flex flex-wrap items-center gap-2">
            <span>
              {activity.date} · {activity.accountName}
            </span>
            <CampaignTag
              campaignId={activity.campaignId}
              campaignName={activity.campaignName}
            />
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Attention flags (brief 2026-06-02 §2) — surface anything that
              should block approval prominently at the top of the modal. */}
          {(activity.recurringInstance?.requiresRecalc ||
            (activity.slaEligible && !activity.licenceVerified)) && (
            <div
              className="rounded-md border p-3 space-y-1.5"
              style={{ borderColor: "#FCA5A5", background: "#FEF2F2" }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#B91C1C",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Attention required before approval
              </div>
              <ul
                className="list-disc pl-5"
                style={{ fontSize: "0.8125rem", color: "#7F1D1D" }}
              >
                {activity.recurringInstance?.requiresRecalc && (
                  <li>
                    Recurring instance — BA count changed from{" "}
                    <strong>
                      {activity.recurringInstance.originalBrandAmbassadorCount}
                    </strong>{" "}
                    to{" "}
                    <strong>
                      {activity.recurringInstance.currentBrandAmbassadorCount}
                    </strong>
                    . Recalculate amounts before approving.
                  </li>
                )}
                {activity.slaEligible && !activity.licenceVerified && (
                  <li>
                    SLA-eligible (SGWS / NY) — liquor licence not yet verified.
                    Resolve SLA before approving.
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Row 1 — Billing identifiers */}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="eb-code">Billing code</Label>
              {campaignCodes.length > 0 ? (
                <>
                  <Select
                    value={
                      codeIsCustom
                        ? "__custom__"
                        : (draft.billingCode || "__none__")
                    }
                    onValueChange={(v) => {
                      if (v === "__custom__") {
                        // Switch to custom mode — clear so user can type
                        patch({ billingCode: "" });
                      } else if (v === "__none__") {
                        patch({ billingCode: "" });
                      } else {
                        patch({ billingCode: v });
                      }
                    }}
                  >
                    <SelectTrigger id="eb-code">
                      <SelectValue placeholder="Pick a code from the campaign" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">— No code —</SelectItem>
                      {campaignCodes.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                      <SelectItem value="__custom__">Custom code…</SelectItem>
                    </SelectContent>
                  </Select>
                  {(codeIsCustom || draft.billingCode === "") && (
                    <Input
                      id="eb-code-custom"
                      value={draft.billingCode}
                      onChange={(e) =>
                        patch({ billingCode: e.target.value })
                      }
                      placeholder="Type a custom billing code"
                      style={{ marginTop: 4 }}
                    />
                  )}
                  {codeIsCustom && (
                    <p style={{ fontSize: "0.6875rem", color: "#D97706" }}>
                      Custom code · not in this campaign's library. Logged as
                      an override.
                    </p>
                  )}
                </>
              ) : (
                <Input
                  id="eb-code"
                  value={draft.billingCode}
                  onChange={(e) => patch({ billingCode: e.target.value })}
                  placeholder="e.g. ENJ-SLA-001"
                />
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="eb-supplier">Supplier</Label>
              <Input
                id="eb-supplier"
                value={draft.supplier}
                onChange={(e) => patch({ supplier: e.target.value })}
                placeholder="e.g. ENJ Gallo"
              />
            </div>
          </div>

          {/* Row 2 — Distributor (full-width) */}
          <div className="space-y-1.5">
            <Label htmlFor="eb-distributor">Distributor (billed party)</Label>
            <Input
              id="eb-distributor"
              value={draft.distributor}
              onChange={(e) => patch({ distributor: e.target.value })}
            />
          </div>

          {/* Row 3 — Amounts */}
          <div
            className="rounded-lg border p-4 space-y-3"
            style={{ borderColor: "#E2E8F0", background: "#F8FAFC" }}
          >
            <div
              style={{
                fontSize: "0.6875rem",
                color: "#94A3B8",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Amounts
            </div>
            <div className="grid gap-3 md:grid-cols-4">
              <div className="space-y-1.5">
                <Label htmlFor="eb-event-amt">Activity $</Label>
                <Input
                  id="eb-event-amt"
                  type="number"
                  value={draft.eventAmount}
                  onChange={(e) => patch({ eventAmount: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="eb-ba-amt">BA $</Label>
                <Input
                  id="eb-ba-amt"
                  type="number"
                  value={draft.ambassadorAmount}
                  onChange={(e) =>
                    patch({ ambassadorAmount: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="eb-travel">Travel</Label>
                <Input
                  id="eb-travel"
                  type="number"
                  value={draft.travel}
                  onChange={(e) => patch({ travel: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Service fee ({(feeRate * 100).toFixed(0)}%)</Label>
                <Input value={fmt(serviceFee)} readOnly disabled />
              </div>
            </div>
            {isBar && (
              <div className="grid gap-3 md:grid-cols-2 pt-1">
                <div className="space-y-1.5">
                  <Label htmlFor="eb-bar-spend">Bar spend (actual)</Label>
                  <Input
                    id="eb-bar-spend"
                    type="number"
                    min={0}
                    max={BAR_SPEND_CEILING}
                    value={draft.barSpend}
                    onChange={(e) => patch({ barSpend: e.target.value })}
                  />
                  <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
                    20% gratuity auto-bundled into the invoice line for SLA
                    reporting.
                  </p>
                  {activity.slaEligible && (
                    <p style={{ fontSize: "0.6875rem", color: "#92400E" }}>
                      AmEx corporate cardholder must be present for the entire
                      duration of the bar spend.
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="eb-max-bar">Max bar spend (budget)</Label>
                  <Input
                    id="eb-max-bar"
                    type="number"
                    min={0}
                    max={BAR_SPEND_CEILING}
                    value={draft.maxBarSpend}
                    onChange={(e) => patch({ maxBarSpend: e.target.value })}
                  />
                </div>
              </div>
            )}
            {isBar && cappedBarSpend !== barSpendAmt && (
              <p style={{ fontSize: "0.6875rem", color: "#B91C1C" }}>
                Bar spend capped at the ${BAR_SPEND_CEILING} platform ceiling.
              </p>
            )}
          </div>

          {/* Row 4 — Post-activity expenses */}
          <div
            className="rounded-lg border p-4 space-y-3"
            style={{ borderColor: "#E2E8F0", background: "#F8FAFC" }}
          >
            <div
              style={{
                fontSize: "0.6875rem",
                color: "#94A3B8",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Post-activity expenses (Kayla's columns)
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="eb-supplies">Supplies</Label>
                <Input
                  id="eb-supplies"
                  type="number"
                  value={draft.suppliesAmount}
                  onChange={(e) =>
                    patch({ suppliesAmount: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="eb-promo">Promotion &amp; Publicity</Label>
                <Input
                  id="eb-promo"
                  type="number"
                  value={draft.promotionPublicityAmount}
                  onChange={(e) =>
                    patch({ promotionPublicityAmount: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="eb-tne">Travel &amp; Entertainment</Label>
                <Input
                  id="eb-tne"
                  type="number"
                  value={draft.travelEntertainmentAmount}
                  onChange={(e) =>
                    patch({ travelEntertainmentAmount: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* SLA capture (R2) — read-only verification surface. Capture
              happens upstream: BA mobile at event completion + market
              manager confirm. Controller verifies only. Output deferred to
              August / R3. */}
          {activity.slaEligible && (
            <div
              className="rounded-lg border p-4 space-y-3"
              style={{ borderColor: "#FCD34D", background: "#FFFBEB" }}
            >
              <div className="flex items-center justify-between">
                <div
                  style={{
                    fontSize: "0.6875rem",
                    color: "#92400E",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  SLA capture (SGWS / NY) · Read-only
                </div>
                {activity.approvingManager ? (
                  <span style={{ fontSize: "0.6875rem", color: "#0F766E" }}>
                    Confirmed by{" "}
                    <strong>{activity.approvingManager}</strong>
                  </span>
                ) : (
                  <span style={{ fontSize: "0.6875rem", color: "#B91C1C" }}>
                    Awaiting manager confirmation
                  </span>
                )}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Receipt screenshot</Label>
                  {activity.receiptUrl ? (
                    <div
                      className="flex items-center gap-2 rounded-md border bg-white p-2"
                      style={{ borderColor: "#FCD34D" }}
                    >
                      <ImageIcon
                        size={14}
                        style={{ color: "#92400E" }}
                      />
                      <span
                        className="truncate"
                        style={{ fontSize: "0.8125rem", maxWidth: 280 }}
                      >
                        {activity.receiptUrl.split("/").pop()}
                      </span>
                    </div>
                  ) : (
                    <p
                      className="rounded-md border bg-white p-2"
                      style={{
                        borderColor: "#FCD34D",
                        fontSize: "0.8125rem",
                        color: "#94A3B8",
                      }}
                    >
                      Not yet attached on manager surface.
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Clarifying notes</Label>
                  <p
                    className="rounded-md border bg-white p-2"
                    style={{
                      borderColor: "#FCD34D",
                      fontSize: "0.8125rem",
                      color: activity.clarifyingNotes ? "#0F172A" : "#94A3B8",
                      minHeight: 60,
                    }}
                  >
                    {activity.clarifyingNotes || "No notes."}
                  </p>
                </div>
              </div>

              <p style={{ fontSize: "0.6875rem", color: "#92400E" }}>
                Source: BA mobile (receipt + total) → market manager (confirm).
                AmEx corporate cardholder must be present for the entire
                duration of the bar spend. R2 stores the data; report output
                continues on HEMS 1.0 until R3.
              </p>
            </div>
          )}

          {/* Status tracks (brief 2026-06-02 §2). Three independent tracks
              editable here as well as on the row. */}
          <div
            className="rounded-lg border p-4 space-y-3"
            style={{ borderColor: "#E2E8F0", background: "#F8FAFC" }}
          >
            <div
              style={{
                fontSize: "0.6875rem",
                color: "#94A3B8",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Status tracks
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="eb-activity-track">Activity</Label>
                <select
                  id="eb-activity-track"
                  value={draft.activityTrackStatus}
                  onChange={(e) =>
                    patch({
                      activityTrackStatus:
                        e.target.value as Draft["activityTrackStatus"],
                    })
                  }
                  className="rounded-md border h-9 w-full px-3"
                  style={{ borderColor: "#E2E8F0", fontSize: "0.875rem" }}
                >
                  {ACTIVITY_TRACK_STATUSES.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="eb-invoice-track">Invoice</Label>
                <select
                  id="eb-invoice-track"
                  value={draft.invoiceTrackStatus}
                  onChange={(e) =>
                    patch({
                      invoiceTrackStatus:
                        e.target.value as Draft["invoiceTrackStatus"],
                    })
                  }
                  className="rounded-md border h-9 w-full px-3"
                  style={{ borderColor: "#E2E8F0", fontSize: "0.875rem" }}
                >
                  {INVOICE_TRACK_STATUSES.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="eb-payment-track">Payment</Label>
                <select
                  id="eb-payment-track"
                  value={draft.paymentTrackStatus}
                  onChange={(e) =>
                    patch({
                      paymentTrackStatus:
                        e.target.value as Draft["paymentTrackStatus"],
                    })
                  }
                  className="rounded-md border h-9 w-full px-3"
                  style={{ borderColor: "#E2E8F0", fontSize: "0.875rem" }}
                >
                  {INVOICE_PAYMENT_STATUSES.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Live invoice total */}
          <div
            className="rounded-lg border p-3 flex items-center justify-between"
            style={{ borderColor: "#7D152D33", background: "#7D152D08" }}
          >
            <span style={{ fontSize: "0.875rem", color: "#7D152D" }}>
              Invoice line total (preview)
            </span>
            <strong style={{ fontSize: "1.125rem", color: "#7D152D" }}>
              {fmt(previewTotal)}
            </strong>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleReject}
            style={{ marginRight: "auto", color: "#B91C1C" }}
          >
            <XIcon size={14} className="mr-1.5" />
            Reject (back to Missing)
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save size={14} className="mr-1.5" />
            Save edits
          </Button>
          <Button
            onClick={handleSaveAndApprove}
            disabled={approvalBlockReason != null}
            title={approvalBlockReason ?? "Save edits and approve for billing"}
          >
            Save &amp; Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
