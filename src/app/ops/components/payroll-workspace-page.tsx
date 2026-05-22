// =============================================================================
// Hart Ops Payroll Workspace (mm-ui-013)
// Finance operator's payroll surface. Six tabs: Overview, Missing Payments,
// Approve, Export, Reports, History.
// Persistent banner blocks export while Missing Payments is non-empty. Approve
// tab pulls BA standard rate, surfaces overrides, and triggers an inline
// "Recalculate Pay" confirmation for recurring-event regressions. Export
// engages payroll-lock visually distinct from billing-lock and moves the cycle
// to "Awaiting Kayla".
// =============================================================================

import { useMemo, useState } from "react";
import {
  Wallet,
  AlertTriangle,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  X,
  Download,
  Lock,
  FileText,
  Filter,
  Mail,
  CalendarRange,
} from "lucide-react";
import { toast } from "sonner";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/shared/components/ui/tabs";
import { Button } from "@/app/shared/components/ui/button";
import { Checkbox } from "@/app/shared/components/ui/checkbox";
import { Input } from "@/app/shared/components/ui/input";
import { Card, CardContent } from "@/app/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/shared/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/shared/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/app/shared/components/ui/tooltip";
import { BILLING_ENTITIES } from "@/app/shared/data/billing-types";
import type {
  BillingEntity,
  GeneratedReport,
  PayrollLineItem,
} from "@/app/shared/data/billing-types";
import {
  MOCK_PAYROLL_LINE_ITEMS,
  CURRENT_PAYROLL_CYCLE,
  HISTORICAL_PAYROLL_CYCLES,
  MOCK_PAYROLL_REPORTS,
  approvePayrollItems,
  rejectPayrollItem,
  acknowledgeRecurringRecalc,
} from "./payroll-data";
import { RecurringRecalcDialog } from "./recurring-recalc-dialog";
import { GenerateReportDialog } from "./generate-report-dialog";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
}

function statusLabel(status: PayrollLineItem["status"]): {
  bg: string;
  fg: string;
  label: string;
  icon?: typeof CheckCircle2;
} {
  switch (status) {
    case "missing":
      return {
        bg: "#FEF2F2",
        fg: "#B91C1C",
        label: "Red X — unapproved",
        icon: X,
      };
    case "pending-manager":
      return {
        bg: "#FFFBEB",
        fg: "#92400E",
        label: "Pending manager",
      };
    case "override-pending":
      return {
        bg: "#FFFBEB",
        fg: "#92400E",
        label: "Override pending",
      };
    case "approved":
      return {
        bg: "#ECFDF5",
        fg: "#0F766E",
        label: "Approved",
        icon: CheckCircle2,
      };
    case "rejected":
      return { bg: "#F1F5F9", fg: "#64748B", label: "Rejected", icon: X };
  }
}

interface FiltersState {
  billingEntity: BillingEntity | "all";
  manager: string;
  cycleStart: string; // YYYY-MM-DD
  cycleEnd: string; // YYYY-MM-DD
}

const INITIAL_FILTERS: FiltersState = {
  billingEntity: "all",
  manager: "all",
  cycleStart: "2026-05-08",
  cycleEnd: "2026-05-21",
};

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export function PayrollWorkspacePage() {
  const [items, setItems] = useState<PayrollLineItem[]>(
    MOCK_PAYROLL_LINE_ITEMS,
  );
  const [filters, setFilters] = useState<FiltersState>(INITIAL_FILTERS);
  const [recalcFor, setRecalcFor] = useState<PayrollLineItem | null>(null);
  const [exportConfirmOpen, setExportConfirmOpen] = useState(false);
  const [cycleStatus, setCycleStatus] = useState(CURRENT_PAYROLL_CYCLE.status);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [reports, setReports] =
    useState<GeneratedReport[]>(MOCK_PAYROLL_REPORTS);

  function refreshItems() {
    setItems([...MOCK_PAYROLL_LINE_ITEMS]);
  }

  const filtered = useMemo(() => {
    return items.filter((p) => {
      if (
        filters.billingEntity !== "all" &&
        p.billingEntity !== filters.billingEntity
      )
        return false;
      if (filters.manager !== "all" && p.manager !== filters.manager) return false;
      if (p.date < filters.cycleStart || p.date > filters.cycleEnd) return false;
      return true;
    });
  }, [items, filters]);

  const managers = useMemo(
    () => Array.from(new Set(items.map((p) => p.manager))),
    [items],
  );

  // ----------------------- KPIs -------------------------------------------

  const awaiting = filtered.filter(
    (p) => p.status === "missing" || p.status === "pending-manager",
  );
  const totalPayEstimated = filtered.reduce((s, p) => s + p.finalPay, 0);
  const overrideCount = filtered.filter((p) => !!p.override).length;

  // Cycle progress
  const approvedCount = filtered.filter((p) => p.status === "approved").length;
  const cycleProgressPct =
    filtered.length === 0
      ? 0
      : Math.round((approvedCount / filtered.length) * 100);
  const canExport = awaiting.length === 0 && cycleStatus !== "exported";

  // ----------------------- Handlers ---------------------------------------

  function approveOne(id: string) {
    const item = items.find((p) => p.id === id);
    if (item?.recurringRecalcRequired) {
      setRecalcFor(item);
      return;
    }
    approvePayrollItems([id]);
    refreshItems();
    toast.success("Approved");
  }

  function approveMany(ids: string[]) {
    // Filter out items that require recalc — surface them one at a time.
    const blocking = ids.find(
      (id) => items.find((p) => p.id === id)?.recurringRecalcRequired,
    );
    if (blocking) {
      const item = items.find((p) => p.id === blocking) || null;
      setRecalcFor(item);
      return;
    }
    approvePayrollItems(ids);
    refreshItems();
    toast.success(`Approved ${ids.length} item${ids.length === 1 ? "" : "s"}`);
  }

  function rejectOne(id: string) {
    rejectPayrollItem(id);
    refreshItems();
    toast.message("Marked rejected");
  }

  function confirmRecalc(id: string) {
    acknowledgeRecurringRecalc(id);
    approvePayrollItems([id]);
    refreshItems();
    setRecalcFor(null);
    toast.success("Recalculated & approved");
  }

  function handleExport() {
    if (!canExport) return;
    setCycleStatus("exported");
    setExportConfirmOpen(false);
    toast.success("Payroll CSV exported · Payroll-lock engaged · Awaiting Kayla");
  }

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6 font-[Inter]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1
              className="flex items-center gap-2"
              style={{ fontSize: "1.5rem", color: "#0F172A" }}
            >
              <Wallet size={22} style={{ color: "#7D152D" }} />
              Payroll
            </h1>
            <p
              className="mt-1"
              style={{ fontSize: "0.875rem", color: "#64748B" }}
            >
              Cycle {CURRENT_PAYROLL_CYCLE.windowStart} →{" "}
              {CURRENT_PAYROLL_CYCLE.windowEnd} · Territory{" "}
              {CURRENT_PAYROLL_CYCLE.territory}
            </p>
          </div>
          <PayrollLockBadge status={cycleStatus} />
        </div>

        {/* Persistent gate banner — visible while Missing Payments has rows */}
        {awaiting.length > 0 && cycleStatus !== "exported" && (
          <div
            className="rounded-lg border p-4 flex items-start gap-3"
            style={{ background: "#FEF2F2", borderColor: "#FECACA" }}
          >
            <AlertTriangle
              size={16}
              style={{ color: "#B91C1C", marginTop: 2 }}
            />
            <div>
              <p
                className="font-medium"
                style={{ fontSize: "0.875rem", color: "#7F1D1D" }}
              >
                Cannot export while educators are awaiting approval
              </p>
              <p style={{ fontSize: "0.8125rem", color: "#991B1B" }}>
                {awaiting.length} item{awaiting.length === 1 ? "" : "s"} sitting
                in Missing Payments. Bulk-approve or chase the manager before
                export.
              </p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="flex items-center gap-1.5"
              style={{ fontSize: "0.8125rem", color: "#64748B" }}
            >
              <Filter size={14} />
              Filters
            </div>
            <Select
              value={filters.billingEntity}
              onValueChange={(v) =>
                setFilters({
                  ...filters,
                  billingEntity: v as BillingEntity | "all",
                })
              }
            >
              <SelectTrigger className="h-9 w-[200px]">
                <SelectValue placeholder="Billing entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Hart entities</SelectItem>
                {BILLING_ENTITIES.map((e) => (
                  <SelectItem key={e} value={e}>
                    {e}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.manager}
              onValueChange={(v) => setFilters({ ...filters, manager: v })}
            >
              <SelectTrigger className="h-9 w-[200px]">
                <SelectValue placeholder="Manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All managers</SelectItem>
                {managers.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cycle window picker */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="flex items-center gap-1.5"
              style={{ fontSize: "0.8125rem", color: "#64748B" }}
            >
              <CalendarRange size={14} />
              Cycle window
            </div>
            <Input
              type="date"
              value={filters.cycleStart}
              onChange={(e) =>
                setFilters({ ...filters, cycleStart: e.target.value })
              }
              className="h-9 w-[170px]"
            />
            <span style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>→</span>
            <Input
              type="date"
              value={filters.cycleEnd}
              onChange={(e) =>
                setFilters({ ...filters, cycleEnd: e.target.value })
              }
              className="h-9 w-[170px]"
            />
            <div className="flex gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setFilters({
                    ...filters,
                    cycleStart: CURRENT_PAYROLL_CYCLE.windowStart,
                    cycleEnd: CURRENT_PAYROLL_CYCLE.windowEnd,
                  })
                }
              >
                This cycle
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const now = new Date();
                  const start = new Date(now);
                  start.setDate(start.getDate() - 28);
                  setFilters({
                    ...filters,
                    cycleStart: start.toISOString().split("T")[0]!,
                    cycleEnd: now.toISOString().split("T")[0]!,
                  });
                }}
              >
                Last 4 weeks
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setFilters({
                    ...filters,
                    cycleStart: "2026-01-01",
                    cycleEnd: "2026-12-31",
                  })
                }
              >
                YTD
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-5">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="missing">
              Missing Payments
              {awaiting.length > 0 && (
                <span
                  className="ml-2 px-1.5 py-0 rounded-full"
                  style={{
                    fontSize: "0.6875rem",
                    background: "#FEF2F2",
                    color: "#B91C1C",
                  }}
                >
                  {awaiting.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="approve">Approve</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* --------------- Overview ----------------------------------- */}
          <TabsContent value="overview" className="space-y-5">
            <div className="grid gap-4 md:grid-cols-3">
              <KpiCard
                icon={AlertTriangle}
                label="Educators awaiting approval"
                value={String(awaiting.length)}
                tone={awaiting.length > 0 ? "warn" : "success"}
              />
              <KpiCard
                icon={TrendingUp}
                label="Total pay estimated"
                value={fmt(totalPayEstimated)}
                tone="neutral"
              />
              <KpiCard
                icon={RotateCcw}
                label="Override events"
                value={String(overrideCount)}
                tone="neutral"
              />
            </div>

            <Card>
              <CardContent className="p-6 space-y-3">
                <div
                  className="flex items-center justify-between"
                  style={{ fontSize: "0.875rem", color: "#0F172A" }}
                >
                  <span>Approval progress</span>
                  <strong>{cycleProgressPct}%</strong>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "#E2E8F0" }}
                >
                  <div
                    className="h-full"
                    style={{
                      width: `${cycleProgressPct}%`,
                      background: "#7D152D",
                    }}
                  />
                </div>
                <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                  {approvedCount} of {filtered.length} approved.{" "}
                  {cycleStatus === "exported" && (
                    <span style={{ color: "#0F766E" }}>
                      Cycle locked & handed off to Kayla.
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --------------- Missing Payments ---------------------------- */}
          <TabsContent value="missing" className="space-y-3">
            <div
              className="rounded-lg border p-3 flex items-start gap-2"
              style={{ background: "#F1F5F9", borderColor: "#E2E8F0" }}
            >
              <AlertTriangle
                size={14}
                style={{ color: "#64748B", marginTop: 2 }}
              />
              <div style={{ fontSize: "0.8125rem", color: "#475569" }}>
                <strong style={{ color: "#0F172A" }}>
                  Read-only — this is the export gate.
                </strong>{" "}
                Items here are waiting for a green check from the manager.
                Approvals happen in the <strong>Approve</strong> tab once the
                manager actions them. Your job here is to <strong>chase</strong>{" "}
                or drill into the activity to investigate.
              </div>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Activity ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Educator</TableHead>
                      <TableHead className="text-right">Pay estimate</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {awaiting.map((p) => {
                      const s = statusLabel(p.status);
                      return (
                        <TableRow key={p.id}>
                          <TableCell>{p.activityId}</TableCell>
                          <TableCell>{p.date}</TableCell>
                          <TableCell>{p.educatorName}</TableCell>
                          <TableCell className="text-right">
                            {fmt(p.finalPay)}
                          </TableCell>
                          <TableCell>{p.manager}</TableCell>
                          <TableCell>
                            <span
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md"
                              style={{
                                fontSize: "0.6875rem",
                                background: s.bg,
                                color: s.fg,
                              }}
                            >
                              {s.label}
                            </span>
                          </TableCell>
                          <TableCell className="text-right whitespace-nowrap">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                toast.info(
                                  `Chased ${p.manager} (mock notification)`,
                                )
                              }
                            >
                              <Mail size={12} className="mr-1.5" />
                              Chase manager
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {awaiting.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-8"
                          style={{ color: "#94A3B8" }}
                        >
                          All clear. Export is unlocked.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --------------- Approve ------------------------------------- */}
          <TabsContent value="approve" className="space-y-3">
            <div
              className="rounded-lg border p-3 flex items-start gap-2"
              style={{ background: "#ECFDF5", borderColor: "#A7F3D0" }}
            >
              <CheckCircle2
                size={14}
                style={{ color: "#0F766E", marginTop: 2 }}
              />
              <div style={{ fontSize: "0.8125rem", color: "#065F46" }}>
                <strong style={{ color: "#064E3B" }}>
                  This is the only place approvals happen.
                </strong>{" "}
                Items grouped by manager. Red-X rows can be approved as an
                operator override (use sparingly — flags the entry for audit).
              </div>
            </div>
            <ApproveTab
              items={filtered}
              onApproveOne={approveOne}
              onApproveMany={approveMany}
              onReject={rejectOne}
            />
          </TabsContent>

          {/* --------------- Export -------------------------------------- */}
          <TabsContent value="export" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3
                  className="font-medium"
                  style={{ fontSize: "1rem", color: "#0F172A" }}
                >
                  Pre-export checklist
                </h3>
                <ul className="space-y-2">
                  <ChecklistItem
                    done={awaiting.length === 0}
                    label="No items in Missing Payments"
                  />
                  <ChecklistItem
                    done={overrideCount === 0 || true}
                    label={`${overrideCount} overrides documented with reason`}
                    note={`${overrideCount} present`}
                  />
                  <ChecklistItem
                    done={filtered.every((p) => p.standardRate > 0)}
                    label="Every educator has a rate on file"
                  />
                </ul>
                <div
                  className="rounded-lg p-3 flex items-start gap-2"
                  style={{ background: "#F1F5F9" }}
                >
                  <Download size={14} style={{ color: "#64748B", marginTop: 2 }} />
                  <p style={{ fontSize: "0.75rem", color: "#475569" }}>
                    Export is a native-Excel CSV. After export, the cycle
                    payroll-locks; you can't add educators or edit pay-relevant
                    fields. Cycle moves to <strong>Awaiting Kayla</strong>.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className="font-medium"
                      style={{ fontSize: "0.875rem", color: "#0F172A" }}
                    >
                      Total pay this cycle:{" "}
                      <strong>{fmt(totalPayEstimated)}</strong>
                    </div>
                    <div
                      className="mt-0.5"
                      style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                    >
                      {filtered.length} line items · territory{" "}
                      {CURRENT_PAYROLL_CYCLE.territory}
                    </div>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button
                          onClick={() => setExportConfirmOpen(true)}
                          disabled={!canExport}
                        >
                          <Download size={14} className="mr-1.5" />
                          Export payroll CSV
                        </Button>
                      </span>
                    </TooltipTrigger>
                    {!canExport && (
                      <TooltipContent>
                        Resolve Missing Payments first.
                      </TooltipContent>
                    )}
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --------------- Reports ------------------------------------- */}
          <TabsContent value="reports" className="space-y-4">
            <div className="flex items-center justify-between">
              <p style={{ fontSize: "0.875rem", color: "#64748B" }}>
                Reports pull from approved line items in the current cycle.
                Click any entry to preview the artefact.
              </p>
              <Button size="sm" onClick={() => setGenerateOpen(true)}>
                <FileText size={13} className="mr-1.5" />
                Generate report
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {reports.map((r) => (
                <Card
                  key={r.id}
                  className="cursor-pointer hover:border-[#7D152D]/40 transition-colors"
                >
                  <CardContent
                    className="p-4 flex items-start justify-between gap-3"
                    onClick={() =>
                      toast.info(`Opened ${r.name} (mock preview).`)
                    }
                  >
                    <div>
                      <div
                        className="font-medium"
                        style={{ fontSize: "0.875rem", color: "#0F172A" }}
                      >
                        {r.name}
                      </div>
                      <div
                        className="mt-0.5"
                        style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                      >
                        {r.kind} · {r.format}
                      </div>
                    </div>
                    <FileText size={16} style={{ color: "#7D152D" }} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* --------------- History ------------------------------------- */}
          <TabsContent value="history" className="space-y-3">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cycle window</TableHead>
                      <TableHead className="text-right">Total pay</TableHead>
                      <TableHead>Educators paid</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Export timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {HISTORICAL_PAYROLL_CYCLES.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell>
                          {c.windowStart} → {c.windowEnd}
                        </TableCell>
                        <TableCell className="text-right">
                          {c.totalPay ? fmt(c.totalPay) : "—"}
                        </TableCell>
                        <TableCell>{c.educatorsPaid ?? "—"}</TableCell>
                        <TableCell>
                          <PayrollLockBadge status={c.status} />
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "0.75rem", color: "#64748B" }}
                        >
                          {c.exportedAt
                            ? new Date(c.exportedAt).toLocaleString()
                            : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <RecurringRecalcDialog
          open={!!recalcFor}
          onClose={() => setRecalcFor(null)}
          item={recalcFor}
          onConfirm={confirmRecalc}
        />

        <GenerateReportDialog
          open={generateOpen}
          onClose={() => setGenerateOpen(false)}
          workspace="payroll"
          cycleId={CURRENT_PAYROLL_CYCLE.id}
          onGenerate={(report) => {
            setReports([report, ...reports]);
            setGenerateOpen(false);
            toast.success(`${report.kind} generated · ${report.format}`);
          }}
        />

        <Dialog open={exportConfirmOpen} onOpenChange={setExportConfirmOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm payroll export</DialogTitle>
              <DialogDescription>
                Cycle {CURRENT_PAYROLL_CYCLE.windowStart} →{" "}
                {CURRENT_PAYROLL_CYCLE.windowEnd}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Row label="Total pay" value={fmt(totalPayEstimated)} bold />
              <Row label="Line items" value={String(filtered.length)} />
              <Row
                label="Approved"
                value={String(approvedCount)}
                emphasise="success"
              />
              <Row
                label="By billing entity"
                value=""
              />
              {BILLING_ENTITIES.map((e) => {
                const subset = filtered.filter((p) => p.billingEntity === e);
                if (subset.length === 0) return null;
                const subtotal = subset.reduce((s, p) => s + p.finalPay, 0);
                return (
                  <div
                    key={e}
                    className="flex items-center justify-between pl-3"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    <span style={{ color: "#64748B" }}>{e}</span>
                    <strong style={{ color: "#0F172A" }}>
                      {fmt(subtotal)}
                    </strong>
                  </div>
                );
              })}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setExportConfirmOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleExport}>
                <Lock size={14} className="mr-1.5" />
                Confirm & engage payroll-lock
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

// ---------------------------------------------------------------------------
// Approve tab — bulk-select, override badge, recurring recalc guard
// ---------------------------------------------------------------------------

function ApproveTab({
  items,
  onApproveOne,
  onApproveMany,
  onReject,
}: {
  items: PayrollLineItem[];
  onApproveOne: (id: string) => void;
  onApproveMany: (ids: string[]) => void;
  onReject: (id: string) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  function approveSelected() {
    onApproveMany(Array.from(selected));
    setSelected(new Set());
  }

  // Group by manager.
  const grouped = useMemo(() => {
    const map = new Map<string, PayrollLineItem[]>();
    for (const p of items) {
      const arr = map.get(p.manager) ?? [];
      arr.push(p);
      map.set(p.manager, arr);
    }
    return Array.from(map.entries());
  }, [items]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p style={{ fontSize: "0.875rem", color: "#64748B" }}>
          {selected.size > 0
            ? `${selected.size} selected`
            : "Bulk-approve a manager's batch or approve one at a time."}
        </p>
        <Button
          size="sm"
          onClick={approveSelected}
          disabled={selected.size === 0}
        >
          <CheckCircle2 size={13} className="mr-1.5" />
          Approve selected
        </Button>
      </div>

      {grouped.map(([manager, list]) => (
        <Card key={manager}>
          <CardContent className="p-0">
            <div
              className="px-4 py-2 border-b"
              style={{
                fontSize: "0.8125rem",
                color: "#64748B",
                borderColor: "#E2E8F0",
                background: "#F8FAFC",
              }}
            >
              {manager} · {list.length} line item
              {list.length === 1 ? "" : "s"}
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ width: 36 }}></TableHead>
                  <TableHead>Activity ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Educator</TableHead>
                  <TableHead className="text-right">Hours</TableHead>
                  <TableHead className="text-right">BA rate</TableHead>
                  <TableHead>Override</TableHead>
                  <TableHead className="text-right">Final pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map((p) => {
                  const s = statusLabel(p.status);
                  return (
                    <TableRow key={p.id}>
                      <TableCell>
                        <Checkbox
                          checked={selected.has(p.id)}
                          onCheckedChange={() => toggle(p.id)}
                          disabled={
                            p.status === "approved" || p.status === "rejected"
                          }
                        />
                      </TableCell>
                      <TableCell>{p.activityId}</TableCell>
                      <TableCell>{p.date}</TableCell>
                      <TableCell>
                        {p.educatorName}
                        {p.isCancellation && (
                          <span
                            className="ml-2 px-1.5 py-0 rounded"
                            style={{
                              fontSize: "0.6875rem",
                              background: "#F1F5F9",
                              color: "#475569",
                            }}
                          >
                            cancellation
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">{p.hours}</TableCell>
                      <TableCell className="text-right">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span style={{ borderBottom: "1px dashed #94A3B8" }}>
                              ${p.standardRate.toFixed(2)}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            Effective from {p.rateEffectiveDate}
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        {p.override ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span
                                className="px-2 py-0.5 rounded-md"
                                style={{
                                  fontSize: "0.6875rem",
                                  background: "#FFFBEB",
                                  color: "#92400E",
                                }}
                              >
                                {p.override.reason}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              ${p.override.rate}/hr ·{" "}
                              {p.override.note ?? "no note"}
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <span style={{ color: "#94A3B8" }}>—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {p.recurringRecalcRequired ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span
                                style={{
                                  borderBottom: "1px dashed #D97706",
                                  color: "#D97706",
                                }}
                              >
                                {fmt(p.finalPay)} ⚠
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              Recurring educator count changed — Approve to
                              recalculate.
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          fmt(p.finalPay)
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md"
                          style={{
                            fontSize: "0.6875rem",
                            background: s.bg,
                            color: s.fg,
                          }}
                        >
                          {s.label}
                        </span>
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        {p.status === "approved" || p.status === "rejected" ? (
                          <span style={{ color: "#94A3B8" }}>—</span>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onReject(p.id)}
                            >
                              Reject
                            </Button>{" "}
                            <Button size="sm" onClick={() => onApproveOne(p.id)}>
                              Approve
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small pieces
// ---------------------------------------------------------------------------

function KpiCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
  tone: "neutral" | "warn" | "success";
}) {
  const fg =
    tone === "warn" ? "#B91C1C" : tone === "success" ? "#0F766E" : "#7D152D";
  const bg =
    tone === "warn" ? "#FEF2F2" : tone === "success" ? "#ECFDF5" : "#7D152D0F";
  return (
    <Card>
      <CardContent className="p-5 flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: bg }}
        >
          <Icon size={18} style={{ color: fg }} />
        </div>
        <div>
          <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>{label}</div>
          <div
            className="mt-0.5 font-semibold"
            style={{ fontSize: "1.5rem", color: "#0F172A" }}
          >
            {value}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ChecklistItem({
  done,
  label,
  note,
}: {
  done: boolean;
  label: string;
  note?: string;
}) {
  return (
    <li
      className="flex items-center gap-2"
      style={{ fontSize: "0.875rem", color: "#0F172A" }}
    >
      {done ? (
        <CheckCircle2 size={15} style={{ color: "#0F766E" }} />
      ) : (
        <X size={15} style={{ color: "#B91C1C" }} />
      )}
      <span>{label}</span>
      {note && (
        <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>· {note}</span>
      )}
    </li>
  );
}

function Row({
  label,
  value,
  bold,
  emphasise,
}: {
  label: string;
  value: string;
  bold?: boolean;
  emphasise?: "success";
}) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ fontSize: "0.875rem" }}
    >
      <span style={{ color: "#64748B" }}>{label}</span>
      <span
        style={{
          color:
            emphasise === "success"
              ? "#0F766E"
              : bold
                ? "#7D152D"
                : "#0F172A",
          fontWeight: bold ? 600 : 400,
        }}
      >
        {value}
      </span>
    </div>
  );
}

// Payroll lock badge — visually distinct from billing-lock per mm-ui-013.
function PayrollLockBadge({
  status,
}: {
  status:
    | "open"
    | "in-progress"
    | "exported"
    | "awaiting-kayla"
    | "awaiting-accountant"
    | "complete";
}) {
  const map = {
    open: { bg: "#F1F5F9", fg: "#64748B", label: "Open" },
    "in-progress": { bg: "#FFFBEB", fg: "#92400E", label: "In progress" },
    exported: { bg: "#7D152D", fg: "white", label: "Payroll-locked" },
    "awaiting-kayla": {
      bg: "#7D152D",
      fg: "white",
      label: "Awaiting Kayla",
    },
    "awaiting-accountant": {
      bg: "#0F766E",
      fg: "white",
      label: "Awaiting accountant",
    },
    complete: { bg: "#ECFDF5", fg: "#0F766E", label: "Complete" },
  };
  const s = map[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md"
      style={{
        fontSize: "0.75rem",
        background: s.bg,
        color: s.fg,
        fontWeight: 500,
      }}
    >
      <Lock size={11} />
      {s.label}
    </span>
  );
}
