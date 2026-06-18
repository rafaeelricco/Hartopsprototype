// =============================================================================
// Invoice Details Modal (mm-ui-012)
// Lets the operator drill into an invoice group before export. Shows each
// activity line with edits + a "remove from invoice" action. After export
// (billing-locked) it's read-only.
// =============================================================================

import { useState, useEffect } from "react";
import { Trash2, Pencil, ExternalLink, AlertTriangle, Users, Eye } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/shared/components/ui/table";
import type { BillingActivity } from "@/app/shared/data/billing-types";
import { MOCK_BRAND_AMBASSADORS } from "./brand-ambassador-data";
import { CampaignTag } from "./campaign-tag";

// Billing seeds use short ids ("edu-1"); the canonical roster uses "EDU-001".
// Normalise so the internal view can resolve real ambassador names.
function resolveBaNames(ids: string[]): string[] {
  return ids.map((id) => {
    const num = id.match(/(\d+)/)?.[1];
    const canonical = num ? `EDU-${num.padStart(3, "0")}` : id;
    return (
      MOCK_BRAND_AMBASSADORS.find((b) => b.id === canonical)?.name ?? id
    );
  });
}

// Expense reimbursements (promotion + travel) summed for the single
// "Promotion reimbursements" invoice line.
function reimbursementOf(a: BillingActivity): number {
  return (a.promotionPublicityAmount ?? 0) + (a.travelEntertainmentAmount ?? 0);
}

// Bar spend + its 20% gratuity — shown as one "Bar spend" line.
function barSpendOf(a: BillingActivity): number {
  return (a.barSpend ?? 0) + (a.gratuity ?? 0);
}

// The agreed event rate billed to the client = full line total minus the
// separately-itemised bar spend and promotion reimbursements.
function agreedRateOf(a: BillingActivity): number {
  return a.expectedAmount - barSpendOf(a) - reimbursementOf(a);
}

interface InvoiceDetailsModalProps {
  open: boolean;
  onClose: () => void;
  group: {
    billedTo: string;
    distributor: string;
    activities: BillingActivity[];
  } | null;
  locked: boolean;
  onPatchActivity: (
    id: string,
    patch: { travel?: number; eventAmount?: number },
  ) => void;
  onRemoveActivity: (id: string) => void;
}

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
}

interface RowDraft {
  eventAmount: string;
  travel: string;
}

export function InvoiceDetailsModal({
  open,
  onClose,
  group,
  locked,
  onPatchActivity,
  onRemoveActivity,
}: InvoiceDetailsModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  // Internal = full operator breakdown incl. BA names + pay. External =
  // supplier-facing view: agreed event rate, bar spend, promotion
  // reimbursements only — never brand-ambassador names or pay.
  const [view, setView] = useState<"internal" | "external">("internal");
  const [draft, setDraft] = useState<RowDraft>({
    eventAmount: "",
    travel: "",
  });

  // Reset on group change.
  useEffect(() => {
    setEditingId(null);
  }, [group?.activities.length]);

  if (!group) return null;
  const total = group.activities.reduce((s, a) => s + a.expectedAmount, 0);
  const reimbursementTotal = group.activities.reduce(
    (s, a) => s + reimbursementOf(a),
    0,
  );
  const barSpendTotal = group.activities.reduce((s, a) => s + barSpendOf(a), 0);
  const baPayTotal = group.activities.reduce(
    (s, a) => s + (a.ambassadorAmount ?? 0),
    0,
  );

  function startEdit(a: BillingActivity) {
    setEditingId(a.id);
    setDraft({
      eventAmount: String(a.eventAmount),
      travel: String(a.travel),
    });
  }

  function commitEdit(id: string) {
    onPatchActivity(id, {
      eventAmount: parseFloat(draft.eventAmount) || 0,
      travel: parseFloat(draft.travel) || 0,
    });
    setEditingId(null);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : onClose())}>
      <DialogContent className="!max-w-[min(96vw,1200px)] w-[min(96vw,1200px)]">
        <DialogHeader>
          <DialogTitle>
            Invoice details · {group.billedTo}
          </DialogTitle>
          <DialogDescription>
            {group.billedTo} · {fmt(total)}
          </DialogDescription>
        </DialogHeader>

        {/* Internal / External (supplier) view toggle */}
        <div
          className="inline-flex items-center gap-1 rounded-lg border p-1 self-start"
          style={{ borderColor: "#E2E8F0", background: "#F8FAFC" }}
        >
          {(
            [
              { key: "internal", label: "Internal", icon: Users },
              { key: "external", label: "External (supplier)", icon: Eye },
            ] as const
          ).map((opt) => {
            const active = view === opt.key;
            const Icon = opt.icon;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setView(opt.key)}
                className="inline-flex items-center gap-1.5 rounded-md px-3 h-8 cursor-pointer"
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  background: active ? "#7D152D" : "transparent",
                  color: active ? "white" : "#64748B",
                }}
              >
                <Icon size={13} />
                {opt.label}
              </button>
            );
          })}
        </div>

        {locked && (
          <div
            className="flex items-start gap-2 rounded-md p-3"
            style={{ background: "#F1F5F9" }}
          >
            <AlertTriangle
              size={14}
              style={{ color: "#475569", marginTop: 2 }}
            />
            <p style={{ fontSize: "0.75rem", color: "#475569" }}>
              This invoice is billing-locked. Activity amounts are read-only.
            </p>
          </div>
        )}

        {view === "internal" && (
        <div
          className="rounded-lg border overflow-x-auto"
          style={{ borderColor: "#E2E8F0", maxHeight: 420, overflowY: "auto" }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Account</TableHead>
                <TableHead className="text-right">Activity $</TableHead>
                <TableHead className="text-right">
                  Travel
                  <div
                    style={{ fontSize: "0.625rem", color: "#94A3B8" }}
                  >
                    per-BA × count
                  </div>
                </TableHead>
                <TableHead className="text-right">Line total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {group.activities.map((a) => {
                const editing = editingId === a.id;
                return (
                  <TableRow key={a.id}>
                    <TableCell className="max-w-[240px]">
                      <div className="truncate" title={a.name}>
                        {a.name}
                      </div>
                      <div
                        style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
                      >
                        {a.id}
                      </div>
                      {/* Internal only — brand-ambassador names + pay (cost). */}
                      <div
                        className="flex items-start gap-1 mt-1"
                        style={{ fontSize: "0.6875rem", color: "#64748B" }}
                      >
                        <Users
                          size={11}
                          style={{ marginTop: 2, color: "#94A3B8", flexShrink: 0 }}
                        />
                        <span>
                          {resolveBaNames(a.brandAmbassadorIds).join(", ") ||
                            "—"}
                          {" · "}
                          <span style={{ color: "#475569", fontWeight: 500 }}>
                            BA pay {fmt(a.ambassadorAmount ?? 0)}
                          </span>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <CampaignTag
                        campaignId={a.campaignId}
                        campaignName={a.campaignName}
                        variant="compact"
                      />
                    </TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell
                      className="max-w-[160px] truncate"
                      title={a.accountName}
                    >
                      {a.accountName}
                    </TableCell>
                    <TableCell className="text-right">
                      {editing ? (
                        <Input
                          type="number"
                          className="h-8 w-24 ml-auto"
                          value={draft.eventAmount}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              eventAmount: e.target.value,
                            })
                          }
                        />
                      ) : (
                        fmt(a.eventAmount)
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editing ? (
                        <Input
                          type="number"
                          className="h-8 w-20 ml-auto"
                          value={draft.travel}
                          onChange={(e) =>
                            setDraft({ ...draft, travel: e.target.value })
                          }
                        />
                      ) : (
                        <div>
                          <div>
                            {fmt(a.travel * Math.max(1, a.brandAmbassadorCount))}
                          </div>
                          {a.brandAmbassadorCount > 1 && (
                            <div
                              style={{
                                fontSize: "0.625rem",
                                color: "#94A3B8",
                              }}
                            >
                              {fmt(a.travel)} × {a.brandAmbassadorCount}
                            </div>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {fmt(a.expectedAmount)}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      {locked ? (
                        <span style={{ color: "#94A3B8" }}>—</span>
                      ) : editing ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </Button>{" "}
                          <Button size="sm" onClick={() => commitEdit(a.id)}>
                            Save
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => startEdit(a)}
                            title="Edit amounts"
                          >
                            <Pencil size={13} />
                          </Button>{" "}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Remove "${a.name}" from this invoice? It returns to Update Billing.`,
                                )
                              ) {
                                onRemoveActivity(a.id);
                              }
                            }}
                            title="Remove from invoice"
                          >
                            <Trash2
                              size={13}
                              style={{ color: "#B91C1C" }}
                            />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {group.activities.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-6"
                    style={{ color: "#94A3B8" }}
                  >
                    No activities left in this invoice group.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        )}

        {/* Internal summary — total is what's billed; BA pay is internal cost. */}
        {view === "internal" && (
          <div
            className="rounded-lg border p-3 space-y-1.5"
            style={{ borderColor: "#E2E8F0", background: "#F8FAFC" }}
          >
            {reimbursementTotal > 0 && (
              <div
                className="flex items-center justify-between"
                style={{ fontSize: "0.8125rem", color: "#64748B" }}
              >
                <span>Promotion reimbursements (incl. in line totals)</span>
                <span>{fmt(reimbursementTotal)}</span>
              </div>
            )}
            <div
              className="flex items-center justify-between"
              style={{ fontSize: "0.8125rem", color: "#64748B" }}
            >
              <span>Brand-ambassador pay</span>
              <span>{fmt(baPayTotal)}</span>
            </div>
            <div
              className="flex items-center justify-between pt-1.5"
              style={{ borderTop: "1px solid #E2E8F0" }}
            >
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0F172A" }}>
                Invoice total (billed)
              </span>
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0F172A" }}>
                {fmt(total)}
              </span>
            </div>
          </div>
        )}

        {/* External (supplier) view — agreed event rate per event, bar spend,
            and a single promotion-reimbursements line. No BA names or pay. */}
        {view === "external" && (
          <div
            className="rounded-lg border"
            style={{ borderColor: "#E2E8F0" }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Line item</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.activities.map((a) => (
                  <TableRow key={`ext-${a.id}`}>
                    <TableCell>
                      Event — {a.name}
                      <span style={{ color: "#94A3B8" }}> · {a.date}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      {fmt(agreedRateOf(a))}
                    </TableCell>
                  </TableRow>
                ))}
                {barSpendTotal > 0 && (
                  <TableRow>
                    <TableCell>Bar spend</TableCell>
                    <TableCell className="text-right">
                      {fmt(barSpendTotal)}
                    </TableCell>
                  </TableRow>
                )}
                {reimbursementTotal > 0 && (
                  <TableRow>
                    <TableCell>Promotion reimbursements</TableCell>
                    <TableCell className="text-right">
                      {fmt(reimbursementTotal)}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell
                    style={{ fontWeight: 600, color: "#0F172A" }}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    className="text-right"
                    style={{ fontWeight: 600, color: "#0F172A" }}
                  >
                    {fmt(total)}
                  </TableCell>
                </TableRow>
                {group.activities.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="text-center py-6"
                      style={{ color: "#94A3B8" }}
                    >
                      No activities left in this invoice group.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <p
              className="px-3 py-2"
              style={{ fontSize: "0.6875rem", color: "#64748B" }}
            >
              Supplier view — brand-ambassador costs are internal and never
              shown on the external invoice.
            </p>
          </div>
        )}

        <div
          className="flex items-start gap-2 rounded-md p-3"
          style={{ background: "#FFFBEB" }}
        >
          <ExternalLink size={14} style={{ color: "#92400E", marginTop: 2 }} />
          <p style={{ fontSize: "0.75rem", color: "#92400E" }}>
            For full activity edits (brand ambassadors, date, venue) drill into
            the source activity from Ops → Activities. Amounts here adjust the
            invoice line directly without touching the source.
          </p>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
