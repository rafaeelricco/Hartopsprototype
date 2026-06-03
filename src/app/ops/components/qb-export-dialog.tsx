// =============================================================================
// QuickBooks Export Dialog (mm-ui-012)
// Distributor ID picker (Southern / Empire / None) + Licence Verified checkbox.
// On confirm: generates invoice number (auto by default), locks the invoice,
// and archives the export.
// =============================================================================

import { useState } from "react";
import { Database, FileText } from "lucide-react";
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
import { Checkbox } from "@/app/shared/components/ui/checkbox";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/app/shared/components/ui/radio-group";

interface QbExportDialogProps {
  open: boolean;
  onClose: () => void;
  invoiceNumberDefault: string;
  billedTo: string;
  total: number;
  onConfirm: (input: {
    invoiceNumber: string;
    distributorIdUsed: "Southern" | "Empire" | "None";
    licenceVerified: boolean;
  }) => void;
}

export function QbExportDialog({
  open,
  onClose,
  invoiceNumberDefault,
  billedTo,
  total,
  onConfirm,
}: QbExportDialogProps) {
  const [invoiceNumber, setInvoiceNumber] = useState(invoiceNumberDefault);
  const [manualOverride, setManualOverride] = useState(false);
  const [distributorId, setDistributorId] = useState<
    "Southern" | "Empire" | "None"
  >("Southern");
  const [licenceVerified, setLicenceVerified] = useState(true);

  function handleConfirm() {
    onConfirm({
      invoiceNumber,
      distributorIdUsed: distributorId,
      licenceVerified,
    });
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : onClose())}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Export to QuickBooks</DialogTitle>
          <DialogDescription>
            {billedTo} · <strong>${total.toFixed(2)}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="inv-num">Invoice number</Label>
            <Input
              id="inv-num"
              value={invoiceNumber}
              onChange={(e) => {
                setInvoiceNumber(e.target.value);
                setManualOverride(e.target.value !== invoiceNumberDefault);
              }}
            />
            <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
              Auto-generated. {manualOverride && "Manual override is logged."}
            </p>
          </div>

          <div>
            <Label className="mb-2 block">Distributor ID to use</Label>
            <RadioGroup
              value={distributorId}
              onValueChange={(v) =>
                setDistributorId(v as "Southern" | "Empire" | "None")
              }
              className="space-y-2"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="Southern" id="dist-southern" />
                <span style={{ fontSize: "0.875rem" }}>
                  Southern Glazer's ID
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="Empire" id="dist-empire" />
                <span style={{ fontSize: "0.875rem" }}>Empire ID</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="None" id="dist-none" />
                <span style={{ fontSize: "0.875rem" }}>None</span>
              </label>
            </RadioGroup>
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <Checkbox
              checked={licenceVerified}
              onCheckedChange={(v) => setLicenceVerified(v === true)}
            />
            <span style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
              Liquor licence verified for this invoice
            </span>
          </label>

          <div
            className="flex items-start gap-2 rounded-md p-3"
            style={{ background: "#F1F5F9" }}
          >
            <Database size={14} style={{ color: "#64748B", marginTop: 2 }} />
            <div style={{ fontSize: "0.75rem", color: "#475569" }}>
              <strong>One-way push.</strong> HEMS exports a QBXML file and the
              invoice PDF to SharePoint; QuickBooks imports the QBXML
              manually (no bidirectional sync). Invoice locks immediately
              after export. Approval-for-sending audit is recorded with this
              action.
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            <FileText size={14} className="mr-1.5" />
            Approve, push QBXML &amp; lock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
