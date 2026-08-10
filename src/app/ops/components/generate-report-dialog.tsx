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
import { Input } from "@/app/shared/components/ui/input";
import { Label } from "@/app/shared/components/ui/label";
import { Checkbox } from "@/app/shared/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/components/ui/select";
import type { GeneratedReport } from "@/app/shared/data/billing-types";
import { REPORTS } from "@/app/shared/data/report-registry";

type ReportKind = GeneratedReport["kind"];
type ReportFormat = GeneratedReport["format"];

// Report kinds come from the shared registry (reporting brief §3.1) rather than
// a list maintained here. Billing and payroll keep their in-workspace Generate
// button, but there is now one source of truth for what reports exist — adding
// one to the registry surfaces it here and in the Reports catalogue at once.
const BILLING_KINDS = REPORTS.filter((r) => r.category === "Billing").map(
  (r) => r.name,
) as ReportKind[];

const PAYROLL_KINDS = REPORTS.filter((r) => r.category === "Payroll").map(
  (r) => r.name,
) as ReportKind[];

const FORMATS: ReportFormat[] = ["Excel", "PDF", "CSV"];

interface GenerateReportDialogProps {
  open: boolean;
  onClose: () => void;
  workspace: "billing" | "payroll";
  cycleId: string;
  // Default date range = current cycle window. Operator can widen / narrow.
  defaultRange?: { start: string; end: string };
  // Optional pool of territories that splittable reports can be split by.
  splittableTerritories?: string[];
  onGenerate: (report: GeneratedReport, territory?: string) => void;
}

// Kinds that support "Split by territory" — Larry prints separate reports per
// Upstate market (Buffalo / Hudson Valley / North Albany).
const SPLITTABLE_KINDS: ReportKind[] = [
  "Payroll Report — Complete",
  "Master Journal",
];

export function GenerateReportDialog({
  open,
  onClose,
  workspace,
  cycleId,
  defaultRange,
  splittableTerritories = [],
  onGenerate,
}: GenerateReportDialogProps) {
  const kinds = workspace === "billing" ? BILLING_KINDS : PAYROLL_KINDS;
  const [kind, setKind] = useState<ReportKind>(kinds[0]!);
  const [format, setFormat] = useState<ReportFormat>("Excel");
  const [splitByTerritory, setSplitByTerritory] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [startDate, setStartDate] = useState(defaultRange?.start ?? "");
  const [endDate, setEndDate] = useState(defaultRange?.end ?? "");

  const canSplit =
    workspace === "payroll" &&
    SPLITTABLE_KINDS.includes(kind) &&
    splittableTerritories.length > 1;

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => {
      const now = new Date();
      const rangeLabel =
        startDate && endDate
          ? ` (${startDate} → ${endDate})`
          : "";
      const baseName = `${kind} — ${now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}${rangeLabel}`;
      if (canSplit && splitByTerritory) {
        splittableTerritories.forEach((t, i) => {
          const report: GeneratedReport = {
            id: `rep-${workspace}-${Date.now()}-${i}`,
            name: `${baseName} · ${t}`,
            kind,
            cycleId,
            generatedAt: now.toISOString(),
            format,
          };
          onGenerate(report, t);
        });
      } else {
        const report: GeneratedReport = {
          id: `rep-${workspace}-${Date.now()}`,
          name: baseName,
          kind,
          cycleId,
          generatedAt: now.toISOString(),
          format,
        };
        onGenerate(report);
      }
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

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="rep-start">Date range — from</Label>
              <Input
                id="rep-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rep-end">to</Label>
              <Input
                id="rep-end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
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

          {canSplit && (
            <label
              className="flex items-start gap-2 rounded-md border p-3 cursor-pointer"
              style={{
                borderColor: splitByTerritory ? "#7D152D" : "#E2E8F0",
                background: splitByTerritory ? "#7D152D08" : "white",
              }}
            >
              <Checkbox
                checked={splitByTerritory}
                onCheckedChange={(v) => setSplitByTerritory(v === true)}
              />
              <div>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    color: "#0F172A",
                    fontWeight: 500,
                  }}
                >
                  Split by territory
                </div>
                <div style={{ fontSize: "0.6875rem", color: "#64748B" }}>
                  Generates one report per territory:{" "}
                  {splittableTerritories.join(", ")}.
                </div>
              </div>
            </label>
          )}

          <div
            className="flex items-start gap-2 rounded-md p-3"
            style={{ background: "#F1F5F9" }}
          >
            <FileText size={14} style={{ color: "#64748B", marginTop: 2 }} />
            <p style={{ fontSize: "0.75rem", color: "#475569" }}>
              Reports pull from approved activities in cycle{" "}
              <strong>{cycleId}</strong>. Click an entry in the archive after
              generation to preview.
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
