// =============================================================================
// Resolve SLA Modal (mm-ui-012 SLA flow)
// Conditional render — only appears for SGWS NY activities. Operator verifies
// the liquor licence is active on the event date before the activity can be
// approved for billing.
// =============================================================================

import { useState } from "react";
import { FileBadge, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/shared/components/ui/dialog";
import { Button } from "@/app/shared/components/ui/button";
import { Checkbox } from "@/app/shared/components/ui/checkbox";
import type { BillingActivity } from "@/app/shared/data/billing-types";
import { MOCK_ACCOUNTS } from "@/lib/account-data";

interface ResolveSlaModalProps {
  open: boolean;
  onClose: () => void;
  activity: BillingActivity | null;
  onVerify: (activityId: string) => void;
}

export function ResolveSlaModal({
  open,
  onClose,
  activity,
  onVerify,
}: ResolveSlaModalProps) {
  const [confirmed, setConfirmed] = useState(false);

  const account = activity
    ? MOCK_ACCOUNTS.find((a) => a.id === activity.accountId)
    : undefined;
  const licence = account?.liquorLicence;

  function activeAtEventDate(): boolean {
    if (!licence || !activity) return false;
    return (
      licence.activeFrom <= activity.date && licence.activeTo >= activity.date
    );
  }

  const active = activeAtEventDate();

  function handleVerify() {
    if (!activity) return;
    onVerify(activity.id);
    setConfirmed(false);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : onClose())}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Resolve SLA — verify liquor licence</DialogTitle>
          <DialogDescription>
            {activity?.name ?? ""} · {activity?.accountName ?? ""}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div
            className="rounded-lg p-3 space-y-1.5"
            style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
          >
            <div
              className="flex items-center gap-2"
              style={{ fontSize: "0.75rem", color: "#94A3B8" }}
            >
              <FileBadge size={13} />
              Licence on file
            </div>
            {licence ? (
              <>
                <div style={{ fontSize: "0.875rem", color: "#0F172A" }}>
                  <strong>{licence.number}</strong> · {licence.state}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
                  Active {licence.activeFrom} → {licence.activeTo}
                </div>
                <div
                  className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md"
                  style={{
                    fontSize: "0.75rem",
                    background: active ? "#ECFDF5" : "#FEF2F2",
                    color: active ? "#0F766E" : "#B91C1C",
                  }}
                >
                  <CheckCircle2 size={11} />
                  {active
                    ? "Active on event date"
                    : "Not active on event date"}
                </div>
              </>
            ) : (
              <p style={{ fontSize: "0.8125rem", color: "#B91C1C" }}>
                No liquor licence on file. Add it to the account before
                verifying.
              </p>
            )}
          </div>

          <div
            className="flex items-start gap-2 rounded-md p-3"
            style={{ background: "#FFFBEB" }}
          >
            <p style={{ fontSize: "0.75rem", color: "#92400E" }}>
              This activity will appear in the SLA Report submitted back to SGWS.
              Verification covers: licence number, active status on the event
              date, executor (brandAmbassador), and spend amount.
              <br />
              <strong>AmEx corporate cardholder must be present for the entire
              duration of the bar spend.</strong>
            </p>
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <Checkbox
              checked={confirmed}
              onCheckedChange={(v) => setConfirmed(v === true)}
              disabled={!active}
            />
            <span style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
              I verified the licence is active and authoritative for this
              event.
            </span>
          </label>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleVerify} disabled={!confirmed}>
            Mark as verified
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
