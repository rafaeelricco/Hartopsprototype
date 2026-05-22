// =============================================================================
// Recurring Recalc Dialog (mm-ui-013)
// Active guard when an operator tries to approve a payroll row whose source
// event is a recurring instance with a changed educator count. Shows previous
// vs new pay totals so the operator confirms the recalc explicitly — no silent
// recalc, no buried badge.
// =============================================================================

import { RefreshCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/shared/components/ui/dialog";
import { Button } from "@/app/shared/components/ui/button";
import type { PayrollLineItem } from "@/app/shared/data/billing-types";

interface RecurringRecalcDialogProps {
  open: boolean;
  onClose: () => void;
  item: PayrollLineItem | null;
  onConfirm: (id: string) => void;
}

function fmt(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function RecurringRecalcDialog({
  open,
  onClose,
  item,
  onConfirm,
}: RecurringRecalcDialogProps) {
  if (!item?.recurringRecalcRequired) {
    return null;
  }
  const r = item.recurringRecalcRequired;

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : onClose())}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Recalculate recurring pay</DialogTitle>
          <DialogDescription>
            This recurring event's educator count changed. Confirm the new pay
            before approving.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div
            className="rounded-lg p-3 space-y-2"
            style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
          >
            <div
              className="flex items-center justify-between"
              style={{ fontSize: "0.8125rem", color: "#64748B" }}
            >
              <span>Educator count</span>
              <span>
                <strong style={{ color: "#0F172A" }}>
                  {r.previousEducatorCount}
                </strong>{" "}
                →{" "}
                <strong style={{ color: "#7D152D" }}>
                  {r.currentEducatorCount}
                </strong>
              </span>
            </div>
            <div
              className="flex items-center justify-between"
              style={{ fontSize: "0.8125rem", color: "#64748B" }}
            >
              <span>Final pay</span>
              <span>
                <strong style={{ color: "#0F172A" }}>
                  {fmt(r.previousFinalPay)}
                </strong>{" "}
                →{" "}
                <strong style={{ color: "#7D152D" }}>
                  {fmt(r.newFinalPay)}
                </strong>
              </span>
            </div>
          </div>

          <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
            Educator: {item.educatorName} · {item.activityName}
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onConfirm(item.id)}>
            <RefreshCcw size={14} className="mr-1.5" />
            Confirm new pay & approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
