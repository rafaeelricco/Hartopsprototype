// =============================================================================
// Set Partial Bill Modal (mm-ui-012 cancellation flow)
// Inline replacement for the manager-emails-Kim loop. On save, writes a
// Cancellation Adjustment audit entry that surfaces in Reports and on the
// activity drill-in.
// =============================================================================

import { useState } from "react";
import { Info, Mail } from "lucide-react";
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
import { Textarea } from "@/app/shared/components/ui/textarea";
import type { BillingActivity } from "@/app/shared/data/billing-types";

interface SetPartialBillModalProps {
  open: boolean;
  onClose: () => void;
  activity: BillingActivity | null;
  operatorName: string;
  onSave: (input: {
    activityId: string;
    reason: string;
    kitPickup: number;
    travel: number;
    time: number;
    partialSupplierAmount: number;
    note: string;
    operator: string;
  }) => void;
}

export function SetPartialBillModal({
  open,
  onClose,
  activity,
  operatorName,
  onSave,
}: SetPartialBillModalProps) {
  const [reason, setReason] = useState("");
  const [kitPickup, setKitPickup] = useState(0);
  const [travel, setTravel] = useState(0);
  const [time, setTime] = useState(0);
  const [partialSupplierAmount, setPartialSupplierAmount] = useState(0);
  const [note, setNote] = useState("");

  const partialPayTotal = kitPickup + travel + time;
  const formValid = !!activity && reason.trim().length > 0;

  function handleSave() {
    if (!formValid || !activity) return;
    onSave({
      activityId: activity.id,
      reason: reason.trim(),
      kitPickup,
      travel,
      time,
      partialSupplierAmount,
      note: note.trim(),
      operator: operatorName,
    });
    setReason("");
    setKitPickup(0);
    setTravel(0);
    setTime(0);
    setPartialSupplierAmount(0);
    setNote("");
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : onClose())}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Set partial bill for cancellation</DialogTitle>
          <DialogDescription>
            {activity?.name ?? "Cancelled activity"} ·{" "}
            {activity?.accountName ?? ""}
          </DialogDescription>
        </DialogHeader>

        <div
          className="flex items-start gap-2 rounded-md p-3"
          style={{ background: "#ECFDF5" }}
        >
          <Mail size={14} style={{ color: "#0F766E", marginTop: 2 }} />
          <p style={{ fontSize: "0.8125rem", color: "#065F46" }}>
            Logging this replaces the email to the booker. The audit entry is
            visible from the activity drill-in and the Cancellation Adjustment
            report.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="canc-reason">Cancellation reason</Label>
            <Textarea
              id="canc-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Venue cancelled day-of (private event conflict), etc."
              rows={2}
            />
          </div>

          <div>
            <Label className="mb-2 block">Partial educator pay</Label>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="kit"
                  style={{ fontSize: "0.75rem", color: "#64748B" }}
                >
                  Kit pickup ($)
                </Label>
                <Input
                  id="kit"
                  type="number"
                  value={kitPickup}
                  onChange={(e) =>
                    setKitPickup(parseFloat(e.target.value) || 0)
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="canc-travel"
                  style={{ fontSize: "0.75rem", color: "#64748B" }}
                >
                  Travel ($)
                </Label>
                <Input
                  id="canc-travel"
                  type="number"
                  value={travel}
                  onChange={(e) =>
                    setTravel(parseFloat(e.target.value) || 0)
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="time"
                  style={{ fontSize: "0.75rem", color: "#64748B" }}
                >
                  Time ($)
                </Label>
                <Input
                  id="time"
                  type="number"
                  value={time}
                  onChange={(e) => setTime(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            <p
              className="mt-2"
              style={{ fontSize: "0.75rem", color: "#64748B" }}
            >
              Partial pay total: <strong>${partialPayTotal.toFixed(2)}</strong>
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="supplier-amount">Partial supplier bill ($)</Label>
            <Input
              id="supplier-amount"
              type="number"
              value={partialSupplierAmount}
              onChange={(e) =>
                setPartialSupplierAmount(parseFloat(e.target.value) || 0)
              }
            />
            <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
              Amount Hart bills the distributor for this cancellation.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="canc-note">Operator note (optional)</Label>
            <Textarea
              id="canc-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
            />
          </div>

          <div
            className="flex items-start gap-2 rounded-md p-3"
            style={{ background: "#F1F5F9" }}
          >
            <Info size={14} style={{ color: "#64748B", marginTop: 2 }} />
            <p style={{ fontSize: "0.75rem", color: "#475569" }}>
              Logged by: <strong>{operatorName}</strong> ·{" "}
              {new Date().toLocaleString()}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!formValid}>
            Save partial bill
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
