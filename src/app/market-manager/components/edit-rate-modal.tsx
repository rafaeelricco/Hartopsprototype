// =============================================================================
// Edit Rate Modal (mm-ui-008)
// Used by CompensationPanel. Enforces "no back-dating" (effective date >= today)
// and previews the upcoming events impact before commit.
// =============================================================================

import { useState, useMemo } from "react";
import { Info } from "lucide-react";
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

interface EditRateModalProps {
  open: boolean;
  onClose: () => void;
  brandAmbassadorName: string;
  currentRate: number;
  upcomingEventsCount: number;
  onSave: (input: {
    rate: number;
    effectiveDate: string;
    note: string;
  }) => void;
}

function todayISO(): string {
  // Use the local calendar date — `toISOString()` is UTC and rolls to the next
  // day in US evening hours, which would incorrectly block "today" selections.
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function EditRateModal({
  open,
  onClose,
  brandAmbassadorName,
  currentRate,
  upcomingEventsCount,
  onSave,
}: EditRateModalProps) {
  const [rateInput, setRateInput] = useState(String(currentRate || ""));
  const [effectiveDate, setEffectiveDate] = useState(todayISO());
  const [note, setNote] = useState("");

  const parsedRate = parseFloat(rateInput);
  const rateValid = !isNaN(parsedRate) && parsedRate > 0;
  const dateValid = effectiveDate >= todayISO();
  const formValid = rateValid && dateValid;

  const previewMessage = useMemo(() => {
    if (!rateValid) return null;
    const formattedDate = new Date(
      effectiveDate + "T12:00:00Z",
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `New rate of $${parsedRate.toFixed(2)}/hr takes effect on ${formattedDate} for ${upcomingEventsCount} upcoming ${upcomingEventsCount === 1 ? "activity" : "activities"} already scheduled for ${brandAmbassadorName}.`;
  }, [rateValid, parsedRate, effectiveDate, upcomingEventsCount, brandAmbassadorName]);

  function handleSave() {
    if (!formValid) return;
    onSave({
      rate: parsedRate,
      effectiveDate,
      note: note.trim(),
    });
    // Reset for next open
    setRateInput("");
    setEffectiveDate(todayISO());
    setNote("");
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : onClose())}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update standard rate</DialogTitle>
          <DialogDescription>
            Past payroll cycles aren't affected. Effective date can be today or
            later — no back-dating.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="rate-input">New rate ($/hr)</Label>
            <Input
              id="rate-input"
              type="number"
              step="0.50"
              min="0"
              value={rateInput}
              onChange={(e) => setRateInput(e.target.value)}
              placeholder="40.00"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="effective-date">Effective date</Label>
            <Input
              id="effective-date"
              type="date"
              value={effectiveDate}
              min={todayISO()}
              onChange={(e) => setEffectiveDate(e.target.value)}
            />
            {!dateValid && (
              <p style={{ fontSize: "0.75rem", color: "#EF4444" }}>
                Effective date cannot be in the past.
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="rate-note">Note (optional)</Label>
            <Textarea
              id="rate-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Annual review uplift, performance bonus, etc."
              rows={3}
            />
          </div>

          {previewMessage && (
            <div
              className="flex items-start gap-2 rounded-lg p-3"
              style={{ background: "#F1F5F9" }}
            >
              <Info size={14} style={{ color: "#64748B", marginTop: 2 }} />
              <p style={{ fontSize: "0.8125rem", color: "#475569" }}>
                {previewMessage}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!formValid}>
            Save new rate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
