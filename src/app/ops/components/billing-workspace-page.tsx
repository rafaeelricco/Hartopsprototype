// =============================================================================
// Hart Ops Billing Workspace (mm-ui-012)
// Finance operator's billing surface. Six tabs: Overview, Missing Bills,
// Update Billing, Invoices, Reports, History.
// Top-of-page filters (entity / distributor / date range / territory) persist
// across tabs via local state. Inline flows: Set Partial Bill, Resolve SLA,
// QB Export. First-class editable Billing Entity selector on Update Billing.
// =============================================================================

import { useMemo, useState } from "react";
import {
  Receipt,
  AlertTriangle,
  ListTodo,
  FileText,
  CheckCircle2,
  FileBadge,
  RefreshCcw,
  Send,
  Download,
  Lock,
  Filter,
  Pencil,
} from "lucide-react";
import { toast } from "sonner";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/shared/components/ui/tabs";
import { Button } from "@/app/shared/components/ui/button";
import { Badge } from "@/app/shared/components/ui/badge";
import { Checkbox } from "@/app/shared/components/ui/checkbox";
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
import { Card, CardContent } from "@/app/shared/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/shared/components/ui/dialog";
import {
  BILLING_ENTITIES,
  SERVICE_FEE_BY_KIND,
} from "@/app/shared/data/billing-types";
import type {
  BillingActivity,
  BillingEntity,
  CancellationAdjustment,
  GeneratedReport,
  Invoice,
  ServiceFeeKind,
  SlaReportRow,
} from "@/app/shared/data/billing-types";
import {
  MOCK_BILLING_ACTIVITIES,
  MOCK_INVOICES,
  MOCK_BILLING_REPORTS,
  HISTORICAL_BILLING_CYCLES,
  CURRENT_BILLING_CYCLE,
  MOCK_SLA_REPORT,
  CANCELLATION_ADJUSTMENTS,
  updateBillingActivity,
  approveBillingActivities,
  addInvoice,
  lockInvoice,
  logCancellationAdjustment,
  nextInvoiceNumber,
} from "./billing-data";
import { SetPartialBillModal } from "./set-partial-bill-modal";
import { ResolveSlaModal } from "./resolve-sla-modal";
import { QbExportDialog } from "./qb-export-dialog";
import { InvoiceDetailsModal } from "./invoice-details-modal";
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

function feeLabel(kind: ServiceFeeKind): string {
  return `${(SERVICE_FEE_BY_KIND[kind] * 100).toFixed(0)}% (${kind})`;
}

function statusBadge(
  status: BillingActivity["status"],
): { bg: string; fg: string; label: string } {
  switch (status) {
    case "missing":
      return { bg: "#FEF2F2", fg: "#B91C1C", label: "Missing" };
    case "ready-to-bill":
      return { bg: "#FFFBEB", fg: "#92400E", label: "Ready" };
    case "approved":
      return { bg: "#ECFDF5", fg: "#0F766E", label: "Approved" };
    case "invoiced":
      return { bg: "#EFF6FF", fg: "#1D4ED8", label: "Invoiced" };
    case "billing-locked":
      return { bg: "#F1F5F9", fg: "#475569", label: "Locked" };
  }
}

// ---------------------------------------------------------------------------
// Filters bar
// ---------------------------------------------------------------------------

interface FiltersState {
  billingEntity: BillingEntity | "all";
  distributor: string;
  territory: string;
}

const INITIAL_FILTERS: FiltersState = {
  billingEntity: "all",
  distributor: "all",
  territory: "all",
};

function FiltersBar({
  value,
  onChange,
  distributors,
  territories,
}: {
  value: FiltersState;
  onChange: (next: FiltersState) => void;
  distributors: string[];
  territories: string[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div
        className="flex items-center gap-1.5"
        style={{ fontSize: "0.8125rem", color: "#64748B" }}
      >
        <Filter size={14} />
        Filters
      </div>
      <Select
        value={value.billingEntity}
        onValueChange={(v) =>
          onChange({ ...value, billingEntity: v as BillingEntity | "all" })
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
        value={value.distributor}
        onValueChange={(v) => onChange({ ...value, distributor: v })}
      >
        <SelectTrigger className="h-9 w-[200px]">
          <SelectValue placeholder="Distributor" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All distributors</SelectItem>
          {distributors.map((d) => (
            <SelectItem key={d} value={d}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={value.territory}
        onValueChange={(v) => onChange({ ...value, territory: v })}
      >
        <SelectTrigger className="h-9 w-[180px]">
          <SelectValue placeholder="Territory" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All territories</SelectItem>
          {territories.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export function BillingWorkspacePage() {
  const [activities, setActivities] = useState<BillingActivity[]>(
    MOCK_BILLING_ACTIVITIES,
  );
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [cancellations, setCancellations] = useState<CancellationAdjustment[]>(
    CANCELLATION_ADJUSTMENTS,
  );
  const [filters, setFilters] = useState<FiltersState>(INITIAL_FILTERS);

  // Modals
  const [partialBillFor, setPartialBillFor] = useState<BillingActivity | null>(
    null,
  );
  const [resolveSlaFor, setResolveSlaFor] = useState<BillingActivity | null>(
    null,
  );
  const [qbExportFor, setQbExportFor] = useState<{
    billedTo: string;
    billingEntity: BillingEntity;
    distributor: string;
    total: number;
    activityIds: string[];
  } | null>(null);
  const [reportPreview, setReportPreview] = useState<string | null>(null);
  const [invoiceDetailsFor, setInvoiceDetailsFor] = useState<{
    billedTo: string;
    billingEntity: BillingEntity;
    distributor: string;
    activities: BillingActivity[];
    locked: boolean;
  } | null>(null);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [reports, setReports] =
    useState<GeneratedReport[]>(MOCK_BILLING_REPORTS);

  // Apply filters
  const filtered = useMemo(() => {
    return activities.filter((a) => {
      if (
        filters.billingEntity !== "all" &&
        a.billingEntity !== filters.billingEntity
      )
        return false;
      if (filters.distributor !== "all" && a.distributor !== filters.distributor)
        return false;
      if (filters.territory !== "all" && a.territory !== filters.territory)
        return false;
      return true;
    });
  }, [activities, filters]);

  const distributors = useMemo(
    () => Array.from(new Set(activities.map((a) => a.distributor))),
    [activities],
  );
  const territories = useMemo(
    () => Array.from(new Set(activities.map((a) => a.territory))),
    [activities],
  );

  // ----------------------- Handlers ---------------------------------------

  function refreshActivities() {
    setActivities([...MOCK_BILLING_ACTIVITIES]);
  }

  function handleApprove(ids: string[]) {
    approveBillingActivities(ids);
    refreshActivities();
    toast.success(`Approved ${ids.length} activity${ids.length === 1 ? "" : "s"}`);
  }

  function handleSavePartialBill(input: {
    activityId: string;
    reason: string;
    kitPickup: number;
    travel: number;
    time: number;
    partialSupplierAmount: number;
    note: string;
    operator: string;
  }) {
    const adjustment: CancellationAdjustment = {
      id: `canc-${Date.now()}`,
      activityId: input.activityId,
      loggedAt: new Date().toISOString(),
      operator: input.operator,
      reason: input.reason,
      partialPayComponents: {
        kitPickup: input.kitPickup,
        travel: input.travel,
        time: input.time,
      },
      partialSupplierAmount: input.partialSupplierAmount,
      ...(input.note ? { note: input.note } : {}),
      bookerNotified: true,
    };
    logCancellationAdjustment(adjustment);
    setCancellations([adjustment, ...cancellations]);
    const partialPayTotal =
      input.kitPickup + input.travel + input.time;
    updateBillingActivity(input.activityId, {
      status: "ready-to-bill",
      ambassadorAmount: partialPayTotal,
      expectedAmount: input.partialSupplierAmount,
      cancellation: adjustment,
    });
    refreshActivities();
    setPartialBillFor(null);
    toast.success("Partial bill logged — booker notified");
  }

  function handleVerifyLicence(activityId: string) {
    updateBillingActivity(activityId, { licenceVerified: true });
    refreshActivities();
    setResolveSlaFor(null);
    toast.success("Liquor licence verified");
  }

  function handleEntityChange(activityId: string, entity: BillingEntity) {
    updateBillingActivity(activityId, {
      billingEntity: entity,
      billingEntityOverridden: true,
    });
    refreshActivities();
  }

  function handlePatchInvoiceActivity(
    id: string,
    patch: { travel?: number; gratuity?: number; eventAmount?: number },
  ) {
    const existing = MOCK_BILLING_ACTIVITIES.find((a) => a.id === id);
    if (!existing) return;
    const eventAmount = patch.eventAmount ?? existing.eventAmount;
    const travel = patch.travel ?? existing.travel;
    const gratuity = patch.gratuity ?? existing.gratuity;
    const fee = eventAmount * SERVICE_FEE_BY_KIND[existing.serviceFeeKind];
    updateBillingActivity(id, {
      eventAmount,
      travel,
      gratuity,
      expectedAmount: eventAmount + fee + travel + gratuity,
    });
    refreshActivities();
    // Keep the modal in sync.
    setInvoiceDetailsFor((prev) =>
      prev
        ? {
            ...prev,
            activities: prev.activities.map((a) =>
              a.id === id
                ? {
                    ...a,
                    eventAmount,
                    travel,
                    gratuity,
                    expectedAmount: eventAmount + fee + travel + gratuity,
                  }
                : a,
            ),
          }
        : prev,
    );
    toast.success("Invoice line updated");
  }

  function handleRemoveActivityFromInvoice(id: string) {
    // Drop from approved/ready-to-bill back into Update Billing (status =
    // ready-to-bill so it can be re-approved elsewhere).
    updateBillingActivity(id, { status: "ready-to-bill" });
    refreshActivities();
    setInvoiceDetailsFor((prev) =>
      prev
        ? {
            ...prev,
            activities: prev.activities.filter((a) => a.id !== id),
          }
        : prev,
    );
    toast.message("Activity removed from invoice");
  }

  function openQbExport(group: {
    billedTo: string;
    billingEntity: BillingEntity;
    distributor: string;
    activities: BillingActivity[];
  }) {
    const total = group.activities.reduce((s, a) => s + a.expectedAmount, 0);
    setQbExportFor({
      billedTo: group.billedTo,
      billingEntity: group.billingEntity,
      distributor: group.distributor,
      total,
      activityIds: group.activities.map((a) => a.id),
    });
  }

  function handleQbConfirm(input: {
    invoiceNumber: string;
    distributorIdUsed: "Southern" | "Empire" | "None";
    licenceVerified: boolean;
  }) {
    if (!qbExportFor) return;
    const invoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: input.invoiceNumber,
      manualOverride: false,
      billingEntity: qbExportFor.billingEntity,
      billedTo: qbExportFor.billedTo,
      distributor: qbExportFor.distributor,
      distributorIdUsed: input.distributorIdUsed,
      licenceVerified: input.licenceVerified,
      cycleId: CURRENT_BILLING_CYCLE.id,
      generatedAt: new Date().toISOString(),
      total: qbExportFor.total,
      activityIds: qbExportFor.activityIds,
      status: "locked",
      qbSyncedAt: new Date().toISOString(),
      sharepointSentAt: new Date().toISOString(),
    };
    addInvoice(invoice);
    lockInvoice(invoice.id);
    setInvoices([invoice, ...invoices]);
    qbExportFor.activityIds.forEach((id) =>
      updateBillingActivity(id, { status: "billing-locked" }),
    );
    refreshActivities();
    setQbExportFor(null);
    toast.success(
      `Invoice ${invoice.invoiceNumber} exported · locked & sent to SharePoint`,
    );
  }

  // ----------------------- KPIs -------------------------------------------

  const kpiAwaiting = filtered.filter((a) => a.status === "missing").length;
  const kpiNotInQb = filtered.filter(
    (a) => a.status === "approved" || a.status === "ready-to-bill",
  ).length;
  const cycleInvoices = invoices.filter(
    (i) => i.cycleId === CURRENT_BILLING_CYCLE.id,
  );
  const cycleInvoiceTotal = cycleInvoices.reduce((s, i) => s + i.total, 0);

  // Cycle progress
  const totalCycleActivities = filtered.length;
  const lockedActivities = filtered.filter(
    (a) => a.status === "billing-locked",
  ).length;
  const cycleProgressPct =
    totalCycleActivities === 0
      ? 0
      : Math.round((lockedActivities / totalCycleActivities) * 100);

  // Invoice groups — grouped by Billed To + Billing Entity (entities never mix)
  const invoiceGroups = useMemo(() => {
    const approved = filtered.filter(
      (a) => a.status === "approved" || a.status === "ready-to-bill",
    );
    const map = new Map<
      string,
      {
        billedTo: string;
        billingEntity: BillingEntity;
        distributor: string;
        activities: BillingActivity[];
      }
    >();
    for (const a of approved) {
      const key = `${a.billingEntity}::${a.billedTo}`;
      const existing = map.get(key);
      if (existing) {
        existing.activities.push(a);
      } else {
        map.set(key, {
          billedTo: a.billedTo,
          billingEntity: a.billingEntity,
          distributor: a.distributor,
          activities: [a],
        });
      }
    }
    return Array.from(map.values());
  }, [filtered]);

  return (
    <div className="p-6 space-y-6 font-[Inter]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1
            className="flex items-center gap-2"
            style={{ fontSize: "1.5rem", color: "#0F172A" }}
          >
            <Receipt size={22} style={{ color: "#7D152D" }} />
            Billing
          </h1>
          <p
            className="mt-1"
            style={{ fontSize: "0.875rem", color: "#64748B" }}
          >
            Cycle {CURRENT_BILLING_CYCLE.windowStart} →{" "}
            {CURRENT_BILLING_CYCLE.windowEnd} · Territory{" "}
            {CURRENT_BILLING_CYCLE.territory}
          </p>
        </div>
      </div>

      <FiltersBar
        value={filters}
        onChange={setFilters}
        distributors={distributors}
        territories={territories}
      />

      <Tabs defaultValue="overview" className="space-y-5">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="missing">
            Missing Bills
            {kpiAwaiting > 0 && (
              <span
                className="ml-2 px-1.5 py-0 rounded-full"
                style={{
                  fontSize: "0.6875rem",
                  background: "#FEF2F2",
                  color: "#B91C1C",
                }}
              >
                {kpiAwaiting}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="update">Update Billing</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* --------------- Overview ------------------------------------- */}
        <TabsContent value="overview" className="space-y-5">
          <div className="grid gap-4 md:grid-cols-3">
            <KpiCard
              icon={AlertTriangle}
              label="Activities awaiting approval"
              value={String(kpiAwaiting)}
              tone={kpiAwaiting > 0 ? "warn" : "neutral"}
            />
            <KpiCard
              icon={ListTodo}
              label="Activities not in QB"
              value={String(kpiNotInQb)}
              tone="neutral"
            />
            <KpiCard
              icon={FileText}
              label="Invoices generated"
              value={`${cycleInvoices.length} · ${fmt(cycleInvoiceTotal)}`}
              tone="success"
            />
          </div>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div
                className="flex items-center justify-between"
                style={{ fontSize: "0.875rem", color: "#0F172A" }}
              >
                <span>Cycle progress</span>
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
                {lockedActivities} of {totalCycleActivities} activities locked.
              </p>
            </CardContent>
          </Card>

          {kpiAwaiting > 0 && (
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
                  style={{ fontSize: "0.875rem", color: "#7F1D1D" }}
                  className="font-medium"
                >
                  {kpiAwaiting} activities can't be invoiced yet
                </p>
                <p style={{ fontSize: "0.8125rem", color: "#991B1B" }}>
                  Resolve each in <strong>Missing Bills</strong>: verify SLA,
                  set partial bills for cancellations, or reconcile recurring
                  educator-count changes.
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        {/* --------------- Missing Bills -------------------------------- */}
        <TabsContent value="missing" className="space-y-3">
          <div className="flex items-center justify-between">
            <p style={{ fontSize: "0.875rem", color: "#64748B" }}>
              Each row must be resolved before it can be approved for billing.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleApprove(
                  filtered
                    .filter(
                      (a) =>
                        a.status === "missing" &&
                        a.missingReason === "Awaiting approval",
                    )
                    .map((a) => a.id),
                )
              }
            >
              <CheckCircle2 size={14} className="mr-1.5" />
              Bulk approve all
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Distributor</TableHead>
                    <TableHead>Educators</TableHead>
                    <TableHead className="text-right">Expected</TableHead>
                    <TableHead>Missing reason</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered
                    .filter((a) => a.status === "missing")
                    .map((a) => {
                      const badge = statusBadge(a.status);
                      return (
                        <TableRow key={a.id}>
                          <TableCell>
                            <div className="font-medium">{a.name}</div>
                            <div
                              className="flex items-center gap-1.5 mt-0.5"
                              style={{
                                fontSize: "0.75rem",
                                color: "#94A3B8",
                              }}
                            >
                              <span
                                className="px-1.5 py-0 rounded"
                                style={{
                                  background: badge.bg,
                                  color: badge.fg,
                                }}
                              >
                                {badge.label}
                              </span>
                              <span>· {a.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{a.date}</TableCell>
                          <TableCell>{a.accountName}</TableCell>
                          <TableCell>{a.distributor}</TableCell>
                          <TableCell>{a.educatorCount}</TableCell>
                          <TableCell className="text-right">
                            {fmt(a.expectedAmount)}
                          </TableCell>
                          <TableCell>
                            <span
                              style={{
                                fontSize: "0.75rem",
                                color: "#B91C1C",
                              }}
                            >
                              {a.missingReason}
                            </span>
                          </TableCell>
                          <TableCell className="text-right whitespace-nowrap">
                            {a.missingReason ===
                              "Cancelled — partial bill not set" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setPartialBillFor(a)}
                              >
                                Set partial bill
                              </Button>
                            )}
                            {a.missingReason ===
                              "SLA — licence not verified" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setResolveSlaFor(a)}
                              >
                                <FileBadge size={13} className="mr-1.5" />
                                Resolve SLA
                              </Button>
                            )}
                            {a.missingReason ===
                              "Recurring — educator count changed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  if (a.recurringInstance) {
                                    updateBillingActivity(a.id, {
                                      educatorCount:
                                        a.recurringInstance.currentEducatorCount,
                                      status: "ready-to-bill",
                                    });
                                    // Drop the missing reason via the index
                                    // (exactOptionalPropertyTypes prevents
                                    // setting it to undefined here).
                                    const idx =
                                      MOCK_BILLING_ACTIVITIES.findIndex(
                                        (x) => x.id === a.id,
                                      );
                                    if (idx >= 0) {
                                      delete (
                                        MOCK_BILLING_ACTIVITIES[idx] as {
                                          missingReason?: string;
                                        }
                                      ).missingReason;
                                    }
                                    refreshActivities();
                                    toast.success(
                                      `Recalculated for ${a.recurringInstance.currentEducatorCount} educators`,
                                    );
                                  }
                                }}
                              >
                                <RefreshCcw size={13} className="mr-1.5" />
                                Recalculate
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {filtered.filter((a) => a.status === "missing").length ===
                    0 && (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-8"
                        style={{ color: "#94A3B8" }}
                      >
                        Nothing missing. Move on to Update Billing.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --------------- Update Billing ------------------------------- */}
        <TabsContent value="update" className="space-y-3">
          <UpdateBillingTab
            activities={filtered.filter(
              (a) => a.status !== "missing" && a.status !== "billing-locked",
            )}
            onApprove={handleApprove}
            onEntityChange={handleEntityChange}
          />
        </TabsContent>

        {/* --------------- Invoices ------------------------------------- */}
        <TabsContent value="invoices" className="space-y-4">
          {invoiceGroups.length === 0 ? (
            <Card>
              <CardContent
                className="p-8 text-center"
                style={{ color: "#94A3B8" }}
              >
                Approve activities in Update Billing to generate invoices.
              </CardContent>
            </Card>
          ) : (
            invoiceGroups.map((g) => {
              const total = g.activities.reduce(
                (s, a) => s + a.expectedAmount,
                0,
              );
              return (
                <Card key={`${g.billingEntity}-${g.billedTo}`}>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div
                          className="font-medium"
                          style={{ fontSize: "0.9375rem", color: "#0F172A" }}
                        >
                          {g.billedTo}
                        </div>
                        <div
                          className="mt-0.5"
                          style={{ fontSize: "0.75rem", color: "#64748B" }}
                        >
                          Billing entity:{" "}
                          <strong style={{ color: "#7D152D" }}>
                            {g.billingEntity}
                          </strong>{" "}
                          · {g.activities.length} activities
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className="font-semibold"
                          style={{ fontSize: "1.25rem", color: "#0F172A" }}
                        >
                          {fmt(total)}
                        </div>
                        <div
                          className="mt-0.5"
                          style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                        >
                          Auto-number: <strong>{nextInvoiceNumber()}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" onClick={() => openQbExport(g)}>
                        <Send size={13} className="mr-1.5" />
                        Export to QuickBooks
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setInvoiceDetailsFor({
                            billedTo: g.billedTo,
                            billingEntity: g.billingEntity,
                            distributor: g.distributor,
                            activities: g.activities,
                            locked: false,
                          })
                        }
                      >
                        <Pencil size={13} className="mr-1.5" />
                        View / Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          toast.info("Excel export queued (mock).")
                        }
                      >
                        <Download size={13} className="mr-1.5" />
                        Excel
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          toast.info("PDF download queued (mock).")
                        }
                      >
                        <Download size={13} className="mr-1.5" />
                        PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        {/* --------------- Reports -------------------------------------- */}
        <TabsContent value="reports" className="space-y-4">
          <div className="flex items-center justify-between">
            <p style={{ fontSize: "0.875rem", color: "#64748B" }}>
              Reports pull from approved activities in the current cycle. Click
              any entry to preview the artefact.
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
                  onClick={() => setReportPreview(r.kind)}
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

          {cancellations.length > 0 && (
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3
                  className="font-medium"
                  style={{ fontSize: "0.875rem", color: "#0F172A" }}
                >
                  Cancellation adjustments — current cycle
                </h3>
                <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                  Logged entries replace the manager-emails-Kim loop.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Activity</TableHead>
                      <TableHead>Operator</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead className="text-right">
                        Partial pay
                      </TableHead>
                      <TableHead className="text-right">
                        Supplier bill
                      </TableHead>
                      <TableHead>Booker</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cancellations.map((c) => {
                      const partialPay =
                        c.partialPayComponents.kitPickup +
                        c.partialPayComponents.travel +
                        c.partialPayComponents.time;
                      return (
                        <TableRow key={c.id}>
                          <TableCell>{c.activityId}</TableCell>
                          <TableCell>{c.operator}</TableCell>
                          <TableCell
                            className="max-w-[300px] truncate"
                            title={c.reason}
                          >
                            {c.reason}
                          </TableCell>
                          <TableCell className="text-right">
                            {fmt(partialPay)}
                          </TableCell>
                          <TableCell className="text-right">
                            {fmt(c.partialSupplierAmount)}
                          </TableCell>
                          <TableCell>
                            {c.bookerNotified ? (
                              <Badge variant="outline">Notified</Badge>
                            ) : (
                              <Badge variant="outline">Pending</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* --------------- History -------------------------------------- */}
        <TabsContent value="history" className="space-y-3">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cycle</TableHead>
                    <TableHead>Invoice no.</TableHead>
                    <TableHead>Billed To</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>QB sync</TableHead>
                    <TableHead className="text-right">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices
                    .filter((i) => i.status === "locked")
                    .map((i) => {
                      const cycle = HISTORICAL_BILLING_CYCLES.find(
                        (c) => c.id === i.cycleId,
                      );
                      const acts = activities.filter((a) =>
                        i.activityIds.includes(a.id),
                      );
                      return (
                        <TableRow key={i.id}>
                          <TableCell>
                            {cycle
                              ? `${cycle.windowStart} → ${cycle.windowEnd}`
                              : i.cycleId}
                          </TableCell>
                          <TableCell>
                            <strong>{i.invoiceNumber}</strong>
                          </TableCell>
                          <TableCell
                            className="max-w-[260px] truncate"
                            title={i.billedTo}
                          >
                            {i.billedTo}
                          </TableCell>
                          <TableCell>{i.billingEntity}</TableCell>
                          <TableCell className="text-right">
                            {fmt(i.total)}
                          </TableCell>
                          <TableCell>
                            <span
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md"
                              style={{
                                fontSize: "0.75rem",
                                background: "#F1F5F9",
                                color: "#475569",
                              }}
                            >
                              <Lock size={11} />
                              Locked
                            </span>
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "0.75rem",
                              color: "#64748B",
                            }}
                          >
                            {i.qbSyncedAt
                              ? new Date(i.qbSyncedAt).toLocaleString()
                              : "—"}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                setInvoiceDetailsFor({
                                  billedTo: i.billedTo,
                                  billingEntity: i.billingEntity,
                                  distributor: i.distributor,
                                  activities: acts,
                                  locked: true,
                                })
                              }
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <SetPartialBillModal
        open={!!partialBillFor}
        onClose={() => setPartialBillFor(null)}
        activity={partialBillFor}
        operatorName="Ivie (Controller)"
        onSave={handleSavePartialBill}
      />
      <ResolveSlaModal
        open={!!resolveSlaFor}
        onClose={() => setResolveSlaFor(null)}
        activity={resolveSlaFor}
        onVerify={handleVerifyLicence}
      />
      {qbExportFor && (
        <QbExportDialog
          open={true}
          onClose={() => setQbExportFor(null)}
          invoiceNumberDefault={nextInvoiceNumber()}
          billedTo={qbExportFor.billedTo}
          total={qbExportFor.total}
          onConfirm={handleQbConfirm}
        />
      )}

      <InvoiceDetailsModal
        open={!!invoiceDetailsFor}
        onClose={() => setInvoiceDetailsFor(null)}
        group={invoiceDetailsFor}
        locked={invoiceDetailsFor?.locked ?? false}
        onPatchActivity={handlePatchInvoiceActivity}
        onRemoveActivity={handleRemoveActivityFromInvoice}
      />

      <GenerateReportDialog
        open={generateOpen}
        onClose={() => setGenerateOpen(false)}
        workspace="billing"
        cycleId={CURRENT_BILLING_CYCLE.id}
        onGenerate={(report) => {
          setReports([report, ...reports]);
          setGenerateOpen(false);
          toast.success(`${report.kind} generated · ${report.format}`);
        }}
      />

      {/* Report preview modal — renders the SLA Report seed artefact */}
      <Dialog
        open={!!reportPreview}
        onOpenChange={(v) => (v ? null : setReportPreview(null))}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{reportPreview}</DialogTitle>
            <DialogDescription>
              Mock export preview. In production, this is the artefact emailed
              or filed.
            </DialogDescription>
          </DialogHeader>
          {reportPreview === "SLA Report" ? (
            <SlaReportPreview rows={MOCK_SLA_REPORT} />
          ) : reportPreview === "Cancellation Adjustment Report" ? (
            <CancellationReportPreview rows={cancellations} />
          ) : (
            <p
              className="py-6 text-center"
              style={{ color: "#94A3B8", fontSize: "0.875rem" }}
            >
              No preview available for this report yet.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Update Billing tab — broken out for readability
// ---------------------------------------------------------------------------

function UpdateBillingTab({
  activities,
  onApprove,
  onEntityChange,
}: {
  activities: BillingActivity[];
  onApprove: (ids: string[]) => void;
  onEntityChange: (id: string, entity: BillingEntity) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  function approveSelected() {
    onApprove(Array.from(selected));
    setSelected(new Set());
  }

  const eligibleIds = activities
    .filter(
      (a) =>
        a.status !== "approved" &&
        a.status !== "billing-locked" &&
        a.status !== "invoiced" &&
        (!a.slaEligible || a.licenceVerified),
    )
    .map((a) => a.id);

  function selectAll() {
    setSelected(new Set(eligibleIds));
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <p style={{ fontSize: "0.875rem", color: "#64748B" }}>
          {selected.size > 0
            ? `${selected.size} selected`
            : "Approve to release into next QuickBooks export."}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={selectAll}>
            Select all eligible
          </Button>
          <Button
            size="sm"
            onClick={approveSelected}
            disabled={selected.size === 0}
          >
            <CheckCircle2 size={13} className="mr-1.5" />
            Approve selected
          </Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ width: 36 }}></TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Billing entity</TableHead>
                <TableHead>Billed To</TableHead>
                <TableHead>Service fee</TableHead>
                <TableHead className="text-right">Event $</TableHead>
                <TableHead className="text-right">BA $</TableHead>
                <TableHead className="text-right">Travel</TableHead>
                <TableHead className="text-right">Grat.</TableHead>
                <TableHead className="text-right">Invoice total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((a) => {
                const badge = statusBadge(a.status);
                const slaBlock = a.slaEligible && !a.licenceVerified;
                return (
                  <TableRow key={a.id}>
                    <TableCell>
                      <Checkbox
                        checked={selected.has(a.id)}
                        onCheckedChange={() => toggle(a.id)}
                        disabled={slaBlock || a.status === "approved"}
                      />
                    </TableCell>
                    <TableCell className="max-w-[220px] truncate">
                      {a.name}
                    </TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell
                      style={{ fontSize: "0.75rem", color: "#64748B" }}
                    >
                      {a.type}
                    </TableCell>
                    <TableCell className="max-w-[180px] truncate">
                      {a.accountName}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={a.billingEntity}
                        onValueChange={(v) =>
                          onEntityChange(a.id, v as BillingEntity)
                        }
                      >
                        <SelectTrigger className="h-8 w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {BILLING_ENTITIES.map((e) => (
                            <SelectItem key={e} value={e}>
                              {e}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {a.billingEntityOverridden && (
                        <div
                          className="mt-1"
                          style={{ fontSize: "0.6875rem", color: "#D97706" }}
                        >
                          override logged
                        </div>
                      )}
                    </TableCell>
                    <TableCell
                      className="max-w-[220px] truncate"
                      title={a.billedTo}
                    >
                      {a.billedTo}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "0.75rem", color: "#64748B" }}
                    >
                      {feeLabel(a.serviceFeeKind)}
                    </TableCell>
                    <TableCell className="text-right">
                      {fmt(a.eventAmount)}
                    </TableCell>
                    <TableCell className="text-right">
                      {fmt(a.ambassadorAmount)}
                    </TableCell>
                    <TableCell className="text-right">
                      {fmt(a.travel)}
                    </TableCell>
                    <TableCell className="text-right">
                      {fmt(a.gratuity)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {fmt(a.expectedAmount)}
                    </TableCell>
                    <TableCell>
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md"
                        style={{
                          fontSize: "0.6875rem",
                          background: badge.bg,
                          color: badge.fg,
                        }}
                      >
                        {badge.label}
                      </span>
                      {slaBlock && (
                        <div
                          className="mt-1"
                          style={{ fontSize: "0.6875rem", color: "#B91C1C" }}
                        >
                          Resolve SLA first
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {activities.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={14}
                    className="text-center py-8"
                    style={{ color: "#94A3B8" }}
                  >
                    Nothing to update right now.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

// ---------------------------------------------------------------------------
// KPI card
// ---------------------------------------------------------------------------

function KpiCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Receipt;
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

// ---------------------------------------------------------------------------
// Report previews
// ---------------------------------------------------------------------------

function SlaReportPreview({ rows }: { rows: SlaReportRow[] }) {
  return (
    <div
      className="rounded-lg border"
      style={{ borderColor: "#E2E8F0", maxHeight: 400, overflow: "auto" }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Activity</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Licence</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Executor</TableHead>
            <TableHead className="text-right">Spend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.activityId}>
              <TableCell className="max-w-[180px] truncate">
                {r.activityName}
              </TableCell>
              <TableCell>{r.date}</TableCell>
              <TableCell className="max-w-[160px] truncate">
                {r.accountName}
              </TableCell>
              <TableCell>{r.licenceNumber}</TableCell>
              <TableCell>
                {r.licenceActiveAtEventDate ? (
                  <span style={{ color: "#0F766E" }}>Yes</span>
                ) : (
                  <span style={{ color: "#B91C1C" }}>No</span>
                )}
              </TableCell>
              <TableCell>{r.executor}</TableCell>
              <TableCell className="text-right">
                {fmt(r.spendAmount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function CancellationReportPreview({
  rows,
}: {
  rows: CancellationAdjustment[];
}) {
  if (rows.length === 0) {
    return (
      <p
        className="py-6 text-center"
        style={{ color: "#94A3B8", fontSize: "0.875rem" }}
      >
        No cancellation adjustments logged for this cycle.
      </p>
    );
  }
  return (
    <div
      className="rounded-lg border"
      style={{ borderColor: "#E2E8F0", maxHeight: 400, overflow: "auto" }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Activity</TableHead>
            <TableHead>Operator</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead className="text-right">Pay</TableHead>
            <TableHead className="text-right">Supplier</TableHead>
            <TableHead>Logged</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((c) => {
            const pay =
              c.partialPayComponents.kitPickup +
              c.partialPayComponents.travel +
              c.partialPayComponents.time;
            return (
              <TableRow key={c.id}>
                <TableCell>{c.activityId}</TableCell>
                <TableCell>{c.operator}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={c.reason}>
                  {c.reason}
                </TableCell>
                <TableCell className="text-right">{fmt(pay)}</TableCell>
                <TableCell className="text-right">
                  {fmt(c.partialSupplierAmount)}
                </TableCell>
                <TableCell
                  style={{ fontSize: "0.75rem", color: "#64748B" }}
                >
                  {new Date(c.loggedAt).toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
