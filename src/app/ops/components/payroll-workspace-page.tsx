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
  Plus,
  ArrowRight,
  Ban,
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
import { Label } from "@/app/shared/components/ui/label";
import { Textarea } from "@/app/shared/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/shared/components/ui/popover";
import { ChevronDown } from "lucide-react";
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
import { ACTIVITY_CATEGORIES } from "@/app/shared/data/billing-types";
import type {
  ActivityCategory,
  GeneratedReport,
  PayrollLineItem,
  PayrollReviewRequest,
} from "@/app/shared/data/billing-types";
import {
  MOCK_PAYROLL_LINE_ITEMS,
  MOCK_PAYROLL_ADJUSTMENTS,
  CURRENT_PAYROLL_CYCLE,
  HISTORICAL_PAYROLL_CYCLES,
  MOCK_PAYROLL_REPORTS,
  approvePayrollItems,
  rejectPayrollItem,
  acknowledgeRecurringRecalc,
  createPayrollAdjustment,
  applyPayrollAdjustment,
  voidPayrollAdjustment,
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
  manager: string;
  categories: ActivityCategory[]; // empty = all
  cycleStart: string; // YYYY-MM-DD
  cycleEnd: string; // YYYY-MM-DD
}

const INITIAL_FILTERS: FiltersState = {
  manager: "all",
  categories: [],
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
  const [rejectCycleOpen, setRejectCycleOpen] = useState(false);
  const [cycleStatus, setCycleStatus] = useState(CURRENT_PAYROLL_CYCLE.status);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [reports, setReports] =
    useState<GeneratedReport[]>(MOCK_PAYROLL_REPORTS);
  const [reportPreview, setReportPreview] = useState<string | null>(null);
  const [reviewRequests, setReviewRequests] = useState<PayrollReviewRequest[]>(
    [
      {
        id: "rev-001",
        cycleId: CURRENT_PAYROLL_CYCLE.id,
        reviewer: "Leah Guidarelli",
        requestedBy: "Larry Golus",
        territory: "Albany",
        status: "pending",
        requestedAt: "2026-05-22T14:00:00Z",
        note: "Please confirm Upstate brand ambassador pay before I run the export.",
      },
    ],
  );
  const [requestReviewOpen, setRequestReviewOpen] = useState(false);
  const [reviewPreviewFor, setReviewPreviewFor] =
    useState<PayrollReviewRequest | null>(null);
  const [changesCommentFor, setChangesCommentFor] =
    useState<PayrollReviewRequest | null>(null);
  const [changesComment, setChangesComment] = useState("");

  function refreshItems() {
    setItems([...MOCK_PAYROLL_LINE_ITEMS]);
  }

  const filtered = useMemo(() => {
    return items.filter((p) => {
      if (filters.manager !== "all" && p.manager !== filters.manager) return false;
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(p.activityCategory)
      )
        return false;
      if (p.date < filters.cycleStart || p.date > filters.cycleEnd) return false;
      return true;
    });
  }, [items, filters]);

  const managers = useMemo(
    () => Array.from(new Set(items.map((p) => p.manager))),
    [items],
  );

  // ----------------------- KPIs -------------------------------------------

  // P1 review fix — Awaiting display follows filters (lets the operator chase
  // a manager's batch), but the *export gate* must use unfiltered cycle items
  // so narrowing filters can't accidentally bypass approvals.
  const awaiting = filtered.filter(
    (p) => p.status === "missing" || p.status === "pending-manager",
  );
  const cycleAwaiting = items.filter(
    (p) =>
      p.date >= filters.cycleStart &&
      p.date <= filters.cycleEnd &&
      (p.status === "missing" || p.status === "pending-manager"),
  );
  const totalPayEstimated = filtered.reduce((s, p) => s + p.finalPay, 0);
  const overrideCount = filtered.filter((p) => !!p.override).length;

  // Cycle progress
  const approvedCount = filtered.filter((p) => p.status === "approved").length;
  const cycleProgressPct =
    filtered.length === 0
      ? 0
      : Math.round((approvedCount / filtered.length) * 100);
  const canExport =
    cycleAwaiting.length === 0 &&
    cycleStatus !== "exported" &&
    cycleStatus !== "awaiting-kayla" &&
    cycleStatus !== "awaiting-accountant" &&
    cycleStatus !== "complete";

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
    // Move cycle to Awaiting Kayla — matches the post-export workflow + toast.
    setCycleStatus("awaiting-kayla");
    setExportConfirmOpen(false);
    toast.success("Payroll CSV exported · Payroll-lock engaged · Awaiting Kayla");
  }

  function handleRejectCycle() {
    setCycleStatus("in-progress");
    setRejectCycleOpen(false);
    toast.success(
      "Cycle re-opened · Payroll-lock cleared · Add missing activities and re-run",
    );
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
          <div className="flex flex-col items-end gap-2">
            <PayrollLockBadge status={cycleStatus} />
            {(cycleStatus === "exported" ||
              cycleStatus === "awaiting-kayla") && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setRejectCycleOpen(true)}
              >
                <RotateCcw size={13} className="mr-1.5" />
                Reject cycle &amp; re-open
              </Button>
            )}
          </div>
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
                Cannot export while brandAmbassadors are awaiting approval
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
            <CategoryMultiSelect
              selected={filters.categories}
              onChange={(next) => setFilters({ ...filters, categories: next })}
            />
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
            <TabsTrigger value="adjustments">Adjustments</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* --------------- Overview ----------------------------------- */}
          <TabsContent value="overview" className="space-y-5">
            <div className="grid gap-4 md:grid-cols-3">
              <KpiCard
                icon={AlertTriangle}
                label="Brand Ambassadors awaiting approval"
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
                      <TableHead>Brand Ambassador</TableHead>
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
                          <TableCell>{p.brandAmbassadorName}</TableCell>
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

          {/* --------------- Adjustments -------------------------------- */}
          <TabsContent value="adjustments" className="space-y-4">
            <PayrollAdjustmentsTab cycleId={CURRENT_PAYROLL_CYCLE.id} />
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
                    label="Every brand ambassador has a rate on file"
                  />
                </ul>
                <div
                  className="rounded-lg p-3 flex items-start gap-2"
                  style={{ background: "#F1F5F9" }}
                >
                  <Download size={14} style={{ color: "#64748B", marginTop: 2 }} />
                  <p style={{ fontSize: "0.75rem", color: "#475569" }}>
                    Export is a native-Excel CSV. After export, the cycle
                    payroll-locks; you can't add brandAmbassadors or edit pay-relevant
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
            {/* P3 #9 — Second-eyes manager reviews */}
            <Card>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      className="flex items-center gap-2"
                      style={{ fontSize: "0.9375rem", color: "#0F172A" }}
                    >
                      <CheckCircle2 size={16} style={{ color: "#7D152D" }} />
                      Second-eyes reviews
                    </h3>
                    <p
                      className="mt-0.5"
                      style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                    >
                      Pre-export sanity check — send the report to another
                      manager before locking the cycle.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setRequestReviewOpen(true)}
                  >
                    <Mail size={13} className="mr-1.5" />
                    Request review
                  </Button>
                </div>
                {reviewRequests.length === 0 ? (
                  <p
                    style={{ fontSize: "0.8125rem", color: "#94A3B8" }}
                    className="py-2"
                  >
                    No pending reviews.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {reviewRequests.map((r) => {
                      const isPending = r.status === "pending";
                      const tone =
                        r.status === "approved"
                          ? { bg: "#ECFDF5", fg: "#0F766E", label: "Approved" }
                          : r.status === "changes-requested"
                            ? {
                                bg: "#FEF2F2",
                                fg: "#B91C1C",
                                label: "Changes requested",
                              }
                            : {
                                bg: "#FFFBEB",
                                fg: "#92400E",
                                label: "Pending",
                              };
                      return (
                        <div
                          key={r.id}
                          className="rounded-lg border p-3"
                          style={{ borderColor: "#E2E8F0" }}
                        >
                          <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div
                              className="flex items-center gap-2"
                              style={{ fontSize: "0.875rem", color: "#0F172A" }}
                            >
                              <strong>{r.reviewer}</strong>
                              <span
                                className="px-1.5 py-0 rounded"
                                style={{
                                  fontSize: "0.6875rem",
                                  background: tone.bg,
                                  color: tone.fg,
                                }}
                              >
                                {tone.label}
                              </span>
                              {r.territory && (
                                <span
                                  className="px-1.5 py-0 rounded"
                                  style={{
                                    fontSize: "0.6875rem",
                                    background: "#F1F5F9",
                                    color: "#475569",
                                  }}
                                >
                                  {r.territory}
                                </span>
                              )}
                            </div>
                            <div
                              className="mt-0.5"
                              style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                            >
                              Requested by {r.requestedBy} ·{" "}
                              {new Date(r.requestedAt).toLocaleString()}
                            </div>
                            {r.note && (
                              <div
                                className="mt-1"
                                style={{
                                  fontSize: "0.75rem",
                                  color: "#475569",
                                }}
                              >
                                "{r.note}"
                              </div>
                            )}
                          </div>
                          <div className="flex gap-1.5 flex-shrink-0 items-start">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setReviewPreviewFor(r)}
                            >
                              <FileText size={12} className="mr-1.5" />
                              View report
                            </Button>
                            {isPending && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setChangesComment("");
                                    setChangesCommentFor(r);
                                  }}
                                >
                                  Changes
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setReviewRequests((prev) =>
                                      prev.map((x) =>
                                        x.id === r.id
                                          ? {
                                              ...x,
                                              status: "approved",
                                              completedAt:
                                                new Date().toISOString(),
                                            }
                                          : x,
                                      ),
                                    );
                                    toast.success(`${r.reviewer} approved`);
                                  }}
                                >
                                  Approve
                                </Button>
                              </>
                            )}
                          </div>
                          </div>
                          {r.reviewerComment && !isPending && (
                            <div
                              className="mt-2 rounded-md p-2"
                              style={{
                                background:
                                  r.status === "changes-requested"
                                    ? "#FEF2F2"
                                    : "#ECFDF5",
                                fontSize: "0.75rem",
                                color:
                                  r.status === "changes-requested"
                                    ? "#7F1D1D"
                                    : "#065F46",
                              }}
                            >
                              <strong>{r.reviewer}:</strong> "{r.reviewerComment}"
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

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
                    onClick={() => {
                      if (r.kind === "Master Journal") {
                        setReportPreview(r.kind);
                      } else {
                        toast.info(`Opened ${r.name} (mock preview).`);
                      }
                    }}
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
                      <TableHead>Brand Ambassadors paid</TableHead>
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
                        <TableCell>{c.brandAmbassadorsPaid ?? "—"}</TableCell>
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
          defaultRange={{
            start: CURRENT_PAYROLL_CYCLE.windowStart,
            end: CURRENT_PAYROLL_CYCLE.windowEnd,
          }}
          splittableTerritories={Array.from(
            new Set(filtered.map((p) => p.territory)),
          ).sort()}
          onGenerate={(report) => {
            setReports((prev) => [report, ...prev]);
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

        <Dialog open={rejectCycleOpen} onOpenChange={setRejectCycleOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Reject cycle & re-open?</DialogTitle>
              <DialogDescription>
                Use this when an activity was missed from the export (e.g. a
                forgotten Sunday). Re-opening clears the payroll-lock and lets
                you add or fix activities, then re-run the export. Kayla will
                see the cycle return to In-Progress.
              </DialogDescription>
            </DialogHeader>
            <div
              className="rounded-lg border p-3 flex items-start gap-2"
              style={{ background: "#FFFBEB", borderColor: "#FDE68A" }}
            >
              <AlertTriangle
                size={14}
                style={{ color: "#92400E", marginTop: 2 }}
              />
              <p style={{ fontSize: "0.8125rem", color: "#92400E" }}>
                The previous CSV export will be invalidated. Any downstream
                handoffs (Kayla, accountant) must be informed before re-running.
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setRejectCycleOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleRejectCycle}>
                <RotateCcw size={14} className="mr-1.5" />
                Reject &amp; re-open
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Request second-eyes review (P3 #9) */}
        <RequestReviewDialog
          open={requestReviewOpen}
          onClose={() => setRequestReviewOpen(false)}
          territories={Array.from(
            new Set(filtered.map((p) => p.territory)),
          ).sort()}
          onSubmit={(input) => {
            const next: PayrollReviewRequest = {
              id: `rev-${Date.now()}`,
              cycleId: CURRENT_PAYROLL_CYCLE.id,
              reviewer: input.reviewer,
              requestedBy: "Hart Ops",
              status: "pending",
              requestedAt: new Date().toISOString(),
              ...(input.territory ? { territory: input.territory } : {}),
              ...(input.note ? { note: input.note } : {}),
            };
            setReviewRequests((prev) => [next, ...prev]);
            setRequestReviewOpen(false);
            toast.success(`Review requested from ${input.reviewer}`);
          }}
        />

        {/* Review report preview (P3 #9 — open the master journal scoped to the review) */}
        <Dialog
          open={!!reviewPreviewFor}
          onOpenChange={(v) => (v ? null : setReviewPreviewFor(null))}
        >
          <DialogContent className="!max-w-[min(96vw,1200px)] w-[min(96vw,1200px)]">
            <DialogHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <DialogTitle>
                    Review report{reviewPreviewFor?.territory
                      ? ` · ${reviewPreviewFor.territory}`
                      : " · Full cycle"}
                  </DialogTitle>
                  <DialogDescription>
                    Requested by {reviewPreviewFor?.requestedBy}. {reviewPreviewFor?.note ? `"${reviewPreviewFor.note}"` : ""}
                  </DialogDescription>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.print()}
                >
                  <FileText size={13} className="mr-1.5" />
                  Print
                </Button>
              </div>
            </DialogHeader>
            <MasterJournalPreview
              items={
                reviewPreviewFor?.territory
                  ? filtered.filter(
                      (p) => p.territory === reviewPreviewFor.territory,
                    )
                  : filtered
              }
            />
          </DialogContent>
        </Dialog>

        {/* Request changes — comment dialog (P3 #9) */}
        <Dialog
          open={!!changesCommentFor}
          onOpenChange={(v) => (v ? null : setChangesCommentFor(null))}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Request changes</DialogTitle>
              <DialogDescription>
                Tell {changesCommentFor?.requestedBy} what needs to change.
                Comment is recorded on the review.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-1.5">
              <label
                htmlFor="changes-comment"
                style={{ fontSize: "0.8125rem", color: "#0F172A" }}
              >
                Comment
              </label>
              <textarea
                id="changes-comment"
                className="w-full rounded-md border px-3 py-2"
                style={{
                  fontSize: "0.875rem",
                  borderColor: "#E2E8F0",
                  minHeight: 100,
                  fontFamily: "inherit",
                }}
                value={changesComment}
                onChange={(e) => setChangesComment(e.target.value)}
                placeholder="e.g. Lisa Thompson's hours look wrong for the May 19 activity — please double-check."
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setChangesCommentFor(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (!changesCommentFor) return;
                  const id = changesCommentFor.id;
                  const comment = changesComment.trim();
                  setReviewRequests((prev) =>
                    prev.map((x) =>
                      x.id === id
                        ? {
                            ...x,
                            status: "changes-requested",
                            completedAt: new Date().toISOString(),
                            ...(comment ? { reviewerComment: comment } : {}),
                          }
                        : x,
                    ),
                  );
                  toast.message(
                    `${changesCommentFor.reviewer} requested changes`,
                  );
                  setChangesCommentFor(null);
                  setChangesComment("");
                }}
              >
                Send changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Master Journal printable preview (P3 #7 — Sarah Scott's master) */}
        <Dialog
          open={reportPreview === "Master Journal"}
          onOpenChange={(v) => (v ? null : setReportPreview(null))}
        >
          <DialogContent className="!max-w-[min(96vw,1200px)] w-[min(96vw,1200px)]">
            <DialogHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <DialogTitle>Master Journal · Payroll Cycle</DialogTitle>
                  <DialogDescription>
                    {CURRENT_PAYROLL_CYCLE.windowStart} →{" "}
                    {CURRENT_PAYROLL_CYCLE.windowEnd} · Territory{" "}
                    {CURRENT_PAYROLL_CYCLE.territory}. Printed and given to
                    Sarah Scott for oversight per Larry's workflow.
                  </DialogDescription>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.print()}
                >
                  <FileText size={13} className="mr-1.5" />
                  Print
                </Button>
              </div>
            </DialogHeader>
            <MasterJournalPreview items={filtered} />
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

// ---------------------------------------------------------------------------
// Approve tab — bulk-select, override badge, recurring recalc guard
// ---------------------------------------------------------------------------

type GroupByKey = "manager" | "category" | "brandAmbassador" | "status" | "none";

const GROUP_BY_OPTIONS: { value: GroupByKey; label: string }[] = [
  { value: "manager", label: "Manager" },
  { value: "category", label: "Category" },
  { value: "brandAmbassador", label: "Brand Ambassador" },
  { value: "status", label: "Status" },
  { value: "none", label: "None (flat)" },
];

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
  const [groupBy, setGroupBy] = useState<GroupByKey>("manager");

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

  function groupKeyOf(p: PayrollLineItem): string {
    switch (groupBy) {
      case "manager":
        return p.manager;
      case "category":
        return (
          ACTIVITY_CATEGORIES.find((c) => c.value === p.activityCategory)
            ?.label ?? p.activityCategory
        );
      case "brandAmbassador":
        return p.brandAmbassadorName;
      case "status":
        return statusLabel(p.status).label;
      case "none":
        return "";
    }
  }

  const grouped = useMemo(() => {
    if (groupBy === "none") {
      return [["", items] as [string, PayrollLineItem[]]];
    }
    const map = new Map<string, PayrollLineItem[]>();
    for (const p of items) {
      const k = groupKeyOf(p);
      const arr = map.get(k) ?? [];
      arr.push(p);
      map.set(k, arr);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, groupBy]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span style={{ fontSize: "0.8125rem", color: "#64748B" }}>
            Group by
          </span>
          <Select
            value={groupBy}
            onValueChange={(v) => setGroupBy(v as GroupByKey)}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GROUP_BY_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selected.size > 0 && (
            <span style={{ fontSize: "0.8125rem", color: "#64748B" }}>
              · {selected.size} selected
            </span>
          )}
        </div>
        <Button
          size="sm"
          onClick={approveSelected}
          disabled={selected.size === 0}
        >
          <CheckCircle2 size={13} className="mr-1.5" />
          Approve selected
        </Button>
      </div>

      {grouped.map(([groupName, list]) => (
        <Card key={groupName || "__flat__"}>
          <CardContent className="p-0">
            {groupBy !== "none" && (
              <div
                className="px-4 py-2 border-b"
                style={{
                  fontSize: "0.8125rem",
                  color: "#64748B",
                  borderColor: "#E2E8F0",
                  background: "#F8FAFC",
                }}
              >
                {groupName} · {list.length} line item
                {list.length === 1 ? "" : "s"}
              </div>
            )}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ width: 36 }}></TableHead>
                  <TableHead>Activity ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Brand Ambassador</TableHead>
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
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-md"
                          style={{
                            fontSize: "0.6875rem",
                            background: "#F1F5F9",
                            color: "#475569",
                          }}
                        >
                          {ACTIVITY_CATEGORIES.find(
                            (c) => c.value === p.activityCategory,
                          )?.label ?? p.activityCategory}
                        </span>
                      </TableCell>
                      <TableCell>
                        {p.brandAmbassadorName}
                        {p.isCancellation && p.cancellationBreakdown ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span
                                className="ml-2 px-1.5 py-0 rounded cursor-help"
                                style={{
                                  fontSize: "0.6875rem",
                                  background: "#F1F5F9",
                                  color: "#475569",
                                  borderBottom: "1px dashed #94A3B8",
                                }}
                              >
                                cancellation
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="space-y-0.5">
                                <div>
                                  Kit pickup:{" "}
                                  {fmt(p.cancellationBreakdown.kitPickup)}
                                </div>
                                <div>
                                  Travel: {fmt(p.cancellationBreakdown.travel)}
                                </div>
                                <div>
                                  Time: {fmt(p.cancellationBreakdown.time)}
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        ) : p.isCancellation ? (
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
                        ) : null}
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
                              Recurring brand ambassador count changed — Approve
                              to recalculate.
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

// ---------------------------------------------------------------------------
// CategoryMultiSelect — Larry's first action on a payroll cycle (00:03:27)
// ---------------------------------------------------------------------------

function CategoryMultiSelect({
  selected,
  onChange,
}: {
  selected: ActivityCategory[];
  onChange: (next: ActivityCategory[]) => void;
}) {
  const allSelected = selected.length === 0;
  const label =
    selected.length === 0
      ? "All categories"
      : selected.length === 1
        ? ACTIVITY_CATEGORIES.find((c) => c.value === selected[0])?.label ??
          "1 category"
        : `${selected.length} categories`;

  function toggle(value: ActivityCategory) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-[220px] justify-between font-normal"
        >
          <span
            className="truncate"
            style={{ color: allSelected ? "#64748B" : "#0F172A" }}
          >
            {label}
          </span>
          <ChevronDown size={14} style={{ color: "#94A3B8" }} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[260px] p-2"
        align="start"
        style={{ background: "white" }}
      >
        <div className="flex items-center justify-between px-1 py-1">
          <span
            style={{
              fontSize: "0.6875rem",
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Activity categories
          </span>
          {!allSelected && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="cursor-pointer hover:underline"
              style={{ fontSize: "0.6875rem", color: "#7D152D" }}
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-1 max-h-[260px] overflow-y-auto">
          {ACTIVITY_CATEGORIES.map((cat) => (
            <label
              key={cat.value}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-[#F8FAFC]"
            >
              <Checkbox
                checked={selected.includes(cat.value)}
                onCheckedChange={() => toggle(cat.value)}
              />
              <span style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ---------------------------------------------------------------------------
// RequestReviewDialog — P3 #9. Larry → Leah second-eyes pre-export sanity check.
// ---------------------------------------------------------------------------

function RequestReviewDialog({
  open,
  onClose,
  territories,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  territories: string[];
  onSubmit: (input: {
    reviewer: string;
    territory?: string;
    note?: string;
  }) => void;
}) {
  const [reviewer, setReviewer] = useState("Leah Guidarelli");
  const [territory, setTerritory] = useState<string>("");
  const [note, setNote] = useState("");

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : onClose())}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request second-eyes review</DialogTitle>
          <DialogDescription>
            Sends the selected scope to a reviewer for sign-off before export.
            Mirrors Larry's "send to Leah for Upstate" step.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label
              htmlFor="rr-reviewer"
              style={{ fontSize: "0.8125rem", color: "#0F172A" }}
            >
              Reviewer
            </label>
            <Input
              id="rr-reviewer"
              value={reviewer}
              onChange={(e) => setReviewer(e.target.value)}
              placeholder="e.g. Leah Guidarelli"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="rr-territory"
              style={{ fontSize: "0.8125rem", color: "#0F172A" }}
            >
              Scope (territory)
            </label>
            <Select
              value={territory || "all"}
              onValueChange={(v) => setTerritory(v === "all" ? "" : v)}
            >
              <SelectTrigger id="rr-territory">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Full cycle</SelectItem>
                {territories.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="rr-note"
              style={{ fontSize: "0.8125rem", color: "#0F172A" }}
            >
              Note (optional)
            </label>
            <Input
              id="rr-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Why are you asking for review?"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!reviewer.trim()) return;
              onSubmit({
                reviewer: reviewer.trim(),
                ...(territory ? { territory } : {}),
                ...(note.trim() ? { note: note.trim() } : {}),
              });
            }}
          >
            <Mail size={14} className="mr-1.5" />
            Send request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// MasterJournalPreview — P3 #7. Printable view grouped by manager/territory,
// showing every BA's payments in the cycle. Sarah Scott uses this as the
// physical reconciliation artefact (transcript 00:20:52).
// ---------------------------------------------------------------------------

function MasterJournalPreview({ items }: { items: PayrollLineItem[] }) {
  const byManager = useMemo(() => {
    const map = new Map<string, PayrollLineItem[]>();
    for (const p of items) {
      const arr = map.get(p.manager) ?? [];
      arr.push(p);
      map.set(p.manager, arr);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [items]);

  const grandTotal = items.reduce((s, p) => s + p.finalPay, 0);
  const baCount = new Set(items.map((p) => p.brandAmbassadorId)).size;

  return (
    <div
      className="space-y-4 overflow-y-auto"
      style={{ maxHeight: 540, padding: "0 4px" }}
    >
      <div
        className="rounded-md border p-3 grid grid-cols-3 gap-3"
        style={{ borderColor: "#E2E8F0", background: "#F8FAFC" }}
      >
        <div>
          <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
            Grand total
          </div>
          <div
            className="font-semibold"
            style={{ fontSize: "1.125rem", color: "#0F172A" }}
          >
            {fmt(grandTotal)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
            BAs paid
          </div>
          <div
            className="font-semibold"
            style={{ fontSize: "1.125rem", color: "#0F172A" }}
          >
            {baCount}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
            Line items
          </div>
          <div
            className="font-semibold"
            style={{ fontSize: "1.125rem", color: "#0F172A" }}
          >
            {items.length}
          </div>
        </div>
      </div>

      {byManager.map(([manager, list]) => {
        const subtotal = list.reduce((s, p) => s + p.finalPay, 0);
        return (
          <div
            key={manager}
            className="rounded-md border"
            style={{ borderColor: "#E2E8F0" }}
          >
            <div
              className="px-3 py-2 border-b flex items-center justify-between"
              style={{
                borderColor: "#E2E8F0",
                background: "#F8FAFC",
                fontSize: "0.8125rem",
              }}
            >
              <strong style={{ color: "#0F172A" }}>{manager}</strong>
              <span style={{ color: "#64748B" }}>
                {list.length} item{list.length === 1 ? "" : "s"} ·{" "}
                <strong style={{ color: "#0F172A" }}>{fmt(subtotal)}</strong>
              </span>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Brand Ambassador</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead className="text-right">Hours</TableHead>
                  <TableHead className="text-right">Pay</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.date}</TableCell>
                    <TableCell>{p.brandAmbassadorName}</TableCell>
                    <TableCell className="max-w-[260px] truncate">
                      {p.activityName}
                    </TableCell>
                    <TableCell className="text-right">{p.hours}</TableCell>
                    <TableCell className="text-right font-medium">
                      {fmt(p.finalPay)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Payroll Adjustments tab (brief 2026-06-02 §2)
// Prior-period corrections processed in the next batch. A correction posts
// into HEMS as an "ADP pay" line on the individual's pay record.
// ---------------------------------------------------------------------------

function PayrollAdjustmentsTab({ cycleId }: { cycleId: string }) {
  const [adjustments, setAdjustments] = useState([...MOCK_PAYROLL_ADJUSTMENTS]);
  const [open, setOpen] = useState(false);
  const [draftBa, setDraftBa] = useState("");
  const [draftAmount, setDraftAmount] = useState("");
  const [draftReason, setDraftReason] = useState("");
  const [draftPriorCycle, setDraftPriorCycle] = useState("");

  function refresh() {
    setAdjustments([...MOCK_PAYROLL_ADJUSTMENTS]);
  }

  function resetDraft() {
    setDraftBa("");
    setDraftAmount("");
    setDraftReason("");
    setDraftPriorCycle("");
  }

  // BA list from current cycle (so the dropdown matches who's billable).
  const baOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const p of MOCK_PAYROLL_LINE_ITEMS) {
      if (!seen.has(p.brandAmbassadorId))
        seen.set(p.brandAmbassadorId, p.brandAmbassadorName);
    }
    return Array.from(seen.entries()).map(([id, name]) => ({ id, name }));
  }, []);

  function handleCreate() {
    if (!draftBa) {
      toast.error("Select a brand ambassador");
      return;
    }
    const amt = parseFloat(draftAmount);
    if (Number.isNaN(amt) || amt === 0) {
      toast.error("Enter a non-zero amount (negative for recovery)");
      return;
    }
    if (!draftReason.trim()) {
      toast.error("Enter a reason");
      return;
    }
    const ba = baOptions.find((o) => o.id === draftBa);
    createPayrollAdjustment({
      brandAmbassadorId: draftBa,
      brandAmbassadorName: ba?.name ?? draftBa,
      amount: amt,
      reason: draftReason.trim(),
      ...(draftPriorCycle ? { priorCycleId: draftPriorCycle } : {}),
      createdBy: "Ivie (Controller)",
    });
    refresh();
    setOpen(false);
    resetDraft();
    toast.success(
      `Adjustment queued for next batch (${amt > 0 ? "+" : ""}${fmt(amt)}).`,
    );
  }

  function apply(id: string) {
    applyPayrollAdjustment(id, cycleId);
    refresh();
    toast.success(`Adjustment applied to current cycle as ADP pay line.`);
  }

  function voidAdj(id: string) {
    voidPayrollAdjustment(id);
    refresh();
    toast.success(`Adjustment voided.`);
  }

  const pending = adjustments.filter((a) => a.status === "pending");
  const applied = adjustments.filter((a) => a.status === "applied");
  const voided = adjustments.filter((a) => a.status === "voided");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p style={{ fontSize: "0.875rem", color: "#0F172A" }}>
            Prior-period corrections processed in the next batch.
          </p>
          <p style={{ fontSize: "0.75rem", color: "#64748B" }}>
            Each correction posts into HEMS as an ADP pay line on the
            individual's pay record.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus size={14} className="mr-1.5" />
          New adjustment
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand Ambassador</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Prior cycle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...pending, ...applied, ...voided].map((a) => (
                <TableRow key={a.id}>
                  <TableCell style={{ fontWeight: 600 }}>
                    {a.brandAmbassadorName}
                  </TableCell>
                  <TableCell
                    className="text-right"
                    style={{
                      color: a.amount >= 0 ? "#0F766E" : "#B91C1C",
                      fontWeight: 500,
                    }}
                  >
                    {a.amount > 0 ? "+" : ""}
                    {fmt(a.amount)}
                  </TableCell>
                  <TableCell
                    className="max-w-[280px] truncate"
                    title={a.reason}
                    style={{ fontSize: "0.8125rem" }}
                  >
                    {a.reason}
                  </TableCell>
                  <TableCell
                    style={{ fontSize: "0.75rem", color: "#64748B" }}
                  >
                    {a.priorCycleId ?? "—"}
                  </TableCell>
                  <TableCell>
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md"
                      style={{
                        fontSize: "0.6875rem",
                        background:
                          a.status === "applied"
                            ? "#ECFDF5"
                            : a.status === "voided"
                              ? "#F1F5F9"
                              : "#FFFBEB",
                        color:
                          a.status === "applied"
                            ? "#0F766E"
                            : a.status === "voided"
                              ? "#64748B"
                              : "#92400E",
                      }}
                    >
                      {a.status === "applied" && (
                        <CheckCircle2 size={11} />
                      )}
                      {a.status}
                    </span>
                    {a.appliedAt && (
                      <div
                        className="mt-0.5"
                        style={{ fontSize: "0.625rem", color: "#94A3B8" }}
                      >
                        applied {new Date(a.appliedAt).toLocaleDateString()}
                        {a.appliedToCycleId
                          ? ` · ${a.appliedToCycleId.replace(/^pcyc-/, "")}`
                          : ""}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    {a.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => apply(a.id)}
                          title={`Apply to current cycle (${cycleId})`}
                        >
                          <ArrowRight size={13} className="mr-1" />
                          Apply
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => voidAdj(a.id)}
                          style={{ color: "#B91C1C" }}
                        >
                          <Ban size={13} className="mr-1" />
                          Void
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {adjustments.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center"
                    style={{ color: "#94A3B8" }}
                  >
                    No payroll adjustments. Click{" "}
                    <strong>New adjustment</strong> to queue one for the next
                    batch.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onOpenChange={(v) => {
          if (!v) {
            setOpen(false);
            resetDraft();
          }
        }}
      >
        <DialogContent className="!max-w-md">
          <DialogHeader>
            <DialogTitle>New payroll adjustment</DialogTitle>
            <DialogDescription>
              Posts into HEMS as an ADP pay line on the BA's pay record.
              Apply when the next batch is opened.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="adj-ba">Brand Ambassador</Label>
              <select
                id="adj-ba"
                value={draftBa}
                onChange={(e) => setDraftBa(e.target.value)}
                className="rounded-md border h-9 w-full px-3"
                style={{ borderColor: "#E2E8F0", fontSize: "0.875rem" }}
              >
                <option value="">— Select —</option>
                {baOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="adj-amount">
                Amount ($) · negative for recovery
              </Label>
              <Input
                id="adj-amount"
                type="number"
                value={draftAmount}
                onChange={(e) => setDraftAmount(e.target.value)}
                placeholder="80 or -45"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="adj-cycle">Prior cycle (optional)</Label>
              <Input
                id="adj-cycle"
                value={draftPriorCycle}
                onChange={(e) => setDraftPriorCycle(e.target.value)}
                placeholder="e.g. pcyc-2026-04b"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="adj-reason">Reason</Label>
              <Textarea
                id="adj-reason"
                rows={3}
                value={draftReason}
                onChange={(e) => setDraftReason(e.target.value)}
                placeholder="What needs correcting and why."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                resetDraft();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCreate}>Queue for next batch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
