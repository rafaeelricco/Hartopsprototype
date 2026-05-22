// =============================================================================
// Generate Report Dialog (mm-ui-012 / mm-ui-013)
// Used by both Billing and Payroll Reports tabs. Operator picks a report kind
// + format; on save, a new GeneratedReport entry appends to the archive.
// =============================================================================

import { useState } from "react";
import { FileText, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/shared/components/ui/dialog";
import { Button } from "@/app/shared/components/ui/button";
import { Label } from "@/app/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/components/ui/select";
import type { GeneratedReport } from "@/app/shared/data/billing-types";

type ReportKind = GeneratedReport["kind"];
type ReportFormat = GeneratedReport["format"];

const BILLING_KINDS: ReportKind[] = [
  "Billing Report",
  "Not in QB Report",
  "SLA Report",
  "Cancellation Adjustment Report",
];

const PAYROLL_KINDS: ReportKind[] = [
  "Payroll Report — Complete",
  "Missing Educator Payments",
  "Override Summary",
];

const FORMATS: ReportFormat[] = ["Excel", "PDF", "CSV"];

interface GenerateReportDialogProps {
  open: boolean;
  onClose: () => void;
  workspace: "billing" | "payroll";
  cycleId: string;
  onGenerate: (report: GeneratedReport) => void;
}

export function GenerateReportDialog({
  open,
  onClose,
  workspace,
  cycleId,
  onGenerate,
}: GenerateReportDialogProps) {
  const kinds = workspace === "billing" ? BILLING_KINDS : PAYROLL_KINDS;
  const [kind, setKind] = useState<ReportKind>(kinds[0]!);
  const [format, setFormat] = useState<ReportFormat>("Excel");
  const [generating, setGenerating] = useState(false);

  function handleGenerate() {
    setGenerating(true);
    // Tiny artificial delay to feel like a generation step happened.
    setTimeout(() => {
      const now = new Date();
      const report: GeneratedReport = {
        id: `rep-${workspace}-${Date.now()}`,
        name: `${kind} — generated ${now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}`,
        kind,
        cycleId,
        generatedAt: now.toISOString(),
        format,
      };
      onGenerate(report);
      setGenerating(false);
    }, 400);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : onClose())}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Generate report</DialogTitle>
          <DialogDescription>
            Pulls from the current cycle's data. The generated artefact appears
            in the Reports archive.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="rep-kind">Report type</Label>
            <Select
              value={kind}
              onValueChange={(v) => setKind(v as ReportKind)}
            >
              <SelectTrigger id="rep-kind">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {kinds.map((k) => (
                  <SelectItem key={k} value={k}>
                    {k}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="rep-format">Format</Label>
            <Select
              value={format}
              onValueChange={(v) => setFormat(v as ReportFormat)}
            >
              <SelectTrigger id="rep-format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORMATS.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div
            className="flex items-start gap-2 rounded-md p-3"
            style={{ background: "#F1F5F9" }}
          >
            <FileText size={14} style={{ color: "#64748B", marginTop: 2 }} />
            <p style={{ fontSize: "0.75rem", color: "#475569" }}>
              Reports pull from {workspace === "billing" ? "approved" : "approved"}{" "}
              activities in cycle <strong>{cycleId}</strong>. Click an entry in
              the archive after generation to preview.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={generating}>
            Cancel
          </Button>
          <Button onClick={handleGenerate} disabled={generating}>
            <Download size={14} className="mr-1.5" />
            {generating ? "Generating…" : "Generate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
