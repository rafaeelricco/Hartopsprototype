// =============================================================================
// Invoice Details Modal (mm-ui-012)
// Lets the operator drill into an invoice group before export. Shows each
// activity line with edits + a "remove from invoice" action. After export
// (billing-locked) it's read-only.
// =============================================================================

import { useState, useEffect } from "react";
import { Trash2, Pencil, ExternalLink, AlertTriangle } from "lucide-react";
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

interface InvoiceDetailsModalProps {
  open: boolean;
  onClose: () => void;
  group: {
    billedTo: string;
    billingEntity: string;
    distributor: string;
    activities: BillingActivity[];
  } | null;
  locked: boolean;
  onPatchActivity: (
    id: string,
    patch: { travel?: number; gratuity?: number; eventAmount?: number },
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
  gratuity: string;
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
  const [draft, setDraft] = useState<RowDraft>({
    eventAmount: "",
    travel: "",
    gratuity: "",
  });

  // Reset on group change.
  useEffect(() => {
    setEditingId(null);
  }, [group?.activities.length]);

  if (!group) return null;
  const total = group.activities.reduce((s, a) => s + a.expectedAmount, 0);

  function startEdit(a: BillingActivity) {
    setEditingId(a.id);
    setDraft({
      eventAmount: String(a.eventAmount),
      travel: String(a.travel),
      gratuity: String(a.gratuity),
    });
  }

  function commitEdit(id: string) {
    onPatchActivity(id, {
      eventAmount: parseFloat(draft.eventAmount) || 0,
      travel: parseFloat(draft.travel) || 0,
      gratuity: parseFloat(draft.gratuity) || 0,
    });
    setEditingId(null);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : onClose())}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Invoice details · {group.billingEntity}
          </DialogTitle>
          <DialogDescription>
            {group.billedTo} · {fmt(total)}
          </DialogDescription>
        </DialogHeader>

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

        <div
          className="rounded-lg border"
          style={{ borderColor: "#E2E8F0", maxHeight: 420, overflow: "auto" }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Account</TableHead>
                <TableHead className="text-right">Event $</TableHead>
                <TableHead className="text-right">Travel</TableHead>
                <TableHead className="text-right">Grat.</TableHead>
                <TableHead className="text-right">Line total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {group.activities.map((a) => {
                const editing = editingId === a.id;
                return (
                  <TableRow key={a.id}>
                    <TableCell className="max-w-[200px]">
                      <div className="truncate" title={a.name}>
                        {a.name}
                      </div>
                      <div
                        style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
                      >
                        {a.id}
                      </div>
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
                        fmt(a.travel)
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editing ? (
                        <Input
                          type="number"
                          className="h-8 w-20 ml-auto"
                          value={draft.gratuity}
                          onChange={(e) =>
                            setDraft({ ...draft, gratuity: e.target.value })
                          }
                        />
                      ) : (
                        fmt(a.gratuity)
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

        <div
          className="flex items-start gap-2 rounded-md p-3"
          style={{ background: "#FFFBEB" }}
        >
          <ExternalLink size={14} style={{ color: "#92400E", marginTop: 2 }} />
          <p style={{ fontSize: "0.75rem", color: "#92400E" }}>
            For full activity edits (educators, date, venue) drill into the
            source event from Ops → Events. Amounts here adjust the invoice
            line directly without touching the source.
          </p>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
