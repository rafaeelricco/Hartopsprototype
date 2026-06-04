// =============================================================================
// Hart Ops Billing Workspace (mm-ui-012)
// Finance operator's billing surface. Six tabs: Overview, Missing Bills,
// Update Billing, Invoices, Reports, History.
// Top-of-page filters (entity / distributor / date range / territory) persist
// across tabs via local state. Inline flows: Set Partial Bill, Resolve SLA,
// QB Export. Single-entity model (Hart Agency only) post May-26 consolidation.
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/shared/components/ui/popover";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/shared/components/ui/dialog";
import { Label } from "@/app/shared/components/ui/label";
import {
  SERVICE_FEE_BY_KIND,
  ACTIVITY_CATEGORIES,
  INVOICE_PAYMENT_STATUSES,
} from "@/app/shared/data/billing-types";
import type {
  ActivityCategory,
  BillingActivity,
  InvoicePaymentStatus,
  CancellationAdjustment,
  GeneratedReport,
  Invoice,
  ServiceFeeKind,
  SlaReportRow,
} from "@/app/shared/data/billing-types";
import { BILLING_CHECKLIST_LABELS } from "@/app/shared/data/billing-types";
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
  rejectInvoice,
  logCancellationAdjustment,
  peekNextInvoiceNumber,
  consumeNextInvoiceNumber,
  updateInvoicePayment,
  getBillingCodeDefinition,
  getMissingChecklistItems,
  getBillingActivityBlockReasons,
  isBillingActivityReadyForInvoice,
  formatArtefactTag,
} from "./billing-data";
import { SetPartialBillModal } from "./set-partial-bill-modal";
import { ResolveSlaModal } from "./resolve-sla-modal";
import { QbExportDialog } from "./qb-export-dialog";
import { InvoiceDetailsModal } from "./invoice-details-modal";
import { GenerateReportDialog } from "./generate-report-dialog";
import {
  EditActivityBillingModal,
  type EditActivityBillingPatch,
} from "./edit-activity-billing-modal";
import { CampaignTag } from "./campaign-tag";

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

function PaymentStatusBadge({
  status,
}: {
  status: InvoicePaymentStatus;
}) {
  const map: Record<
    InvoicePaymentStatus,
    { bg: string; fg: string; label: string }
  > = {
    open: { bg: "#FFFBEB", fg: "#92400E", label: "Open" },
    "partially-paid": {
      bg: "#EFF6FF",
      fg: "#1D4ED8",
      label: "Partially paid",
    },
    paid: { bg: "#ECFDF5", fg: "#0F766E", label: "Paid" },
    disputed: { bg: "#FEF2F2", fg: "#B91C1C", label: "Disputed" },
  };
  const s = map[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md"
      style={{
        fontSize: "0.75rem",
        background: s.bg,
        color: s.fg,
        fontWeight: 500,
      }}
    >
      {s.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Three-status chip group (brief 2026-06-02 §2) — activity · invoice · payment.
// Renders the three independent tracks for one billing row so the controller
// can see at a glance where the activity sits across the full lifecycle.
// ---------------------------------------------------------------------------

interface ThreeStatusTracksProps {
  activity: BillingActivity;
  invoice?: Invoice | undefined; // matching invoice if one has been generated
}

function ThreeStatusTracks({ activity, invoice }: ThreeStatusTracksProps) {
  // Activity track: rolled up to a binary (completed if it's in the billing
  // queue at all; otherwise we wouldn't see it here).
  const activityTrack: { label: string; bg: string; fg: string } =
    activity.status === "missing" && activity.missingReason
      ? { label: "Completed · awaiting bill", bg: "#FFFBEB", fg: "#92400E" }
      : { label: "Completed", bg: "#ECFDF5", fg: "#0F766E" };

  // Invoice track: not-yet (no invoice or activity status === missing),
  // ready (ready-to-bill/approved), draft/approved-for-sending/exported/locked
  // from the actual Invoice row.
  let invoiceTrack: { label: string; bg: string; fg: string };
  if (!invoice) {
    if (activity.status === "missing") {
      invoiceTrack = { label: "Not ready", bg: "#FEF2F2", fg: "#B91C1C" };
    } else if (activity.status === "ready-to-bill") {
      invoiceTrack = { label: "Ready", bg: "#FFFBEB", fg: "#92400E" };
    } else if (activity.status === "approved") {
      invoiceTrack = { label: "Approved", bg: "#ECFDF5", fg: "#0F766E" };
    } else {
      invoiceTrack = { label: "Not yet", bg: "#F1F5F9", fg: "#475569" };
    }
  } else {
    switch (invoice.status) {
      case "draft":
        invoiceTrack = { label: "Drafted", bg: "#FFFBEB", fg: "#92400E" };
        break;
      case "approved-for-sending":
        invoiceTrack = {
          label: "Approved to send",
          bg: "#ECFDF5",
          fg: "#0F766E",
        };
        break;
      case "exported":
        invoiceTrack = { label: "Exported", bg: "#EFF6FF", fg: "#1D4ED8" };
        break;
      case "locked":
        invoiceTrack = { label: "Locked", bg: "#F1F5F9", fg: "#475569" };
        break;
    }
  }

  // Payment track: only meaningful once an invoice exists.
  let paymentTrack: { label: string; bg: string; fg: string };
  if (!invoice) {
    paymentTrack = { label: "—", bg: "#F8FAFC", fg: "#94A3B8" };
  } else {
    const map: Record<
      InvoicePaymentStatus,
      { label: string; bg: string; fg: string }
    > = {
      open: { label: "Open", bg: "#FFFBEB", fg: "#92400E" },
      "partially-paid": {
        label: "Partial",
        bg: "#EFF6FF",
        fg: "#1D4ED8",
      },
      paid: { label: "Paid", bg: "#ECFDF5", fg: "#0F766E" },
      disputed: { label: "Disputed", bg: "#FEF2F2", fg: "#B91C1C" },
    };
    paymentTrack = map[invoice.paymentStatus];
  }

  return (
    <div className="inline-flex items-center gap-1 flex-wrap">
      <TrackChip prefix="A" {...activityTrack} />
      <TrackChip prefix="I" {...invoiceTrack} />
      <TrackChip prefix="P" {...paymentTrack} />
    </div>
  );
}

function TrackChip({
  prefix,
  label,
  bg,
  fg,
}: {
  prefix: string;
  label: string;
  bg: string;
  fg: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded"
      style={{
        fontSize: "0.625rem",
        background: bg,
        color: fg,
        fontWeight: 500,
        letterSpacing: "0.01em",
      }}
      title={`${prefix === "A" ? "Activity" : prefix === "I" ? "Invoice" : "Payment"} status`}
    >
      <span style={{ opacity: 0.7 }}>{prefix}</span>
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Events Ready to Bill — billing-code grouped dashboard (brief 2026-06-02 §2).
// Sits at the top of the Ready to Bill tab. Summarises activities by their
// billing code so the controller can see at a glance which codes have
// activities blocked by which missing requirements. Replaces HEMS 1.0's
// "Missing Bill" report — same population, sharper organisation.
// ---------------------------------------------------------------------------

interface ReadyToBillCodeGroup {
  code: string;
  description: string;
  total: number;
  ready: number; // activities with all checklist items + status === "ready-to-bill"
  blockedByChecklist: number;
  blockedOther: number; // SLA, cancellation, recurring recalc, etc.
  missingItemsByLabel: Map<string, number>; // checklist item → count blocking
}

function buildReadyToBillGroups(
  activities: BillingActivity[],
): ReadyToBillCodeGroup[] {
  const groups = new Map<string, ReadyToBillCodeGroup>();
  for (const a of activities) {
    // Only count activities that aren't already invoiced / locked.
    if (a.status === "invoiced" || a.status === "billing-locked") continue;
    const code = a.billingCode ?? "(no code)";
    const def = getBillingCodeDefinition(a.billingCode);
    if (!groups.has(code)) {
      groups.set(code, {
        code,
        description: def?.description ?? "Unassigned",
        total: 0,
        ready: 0,
        blockedByChecklist: 0,
        blockedOther: 0,
        missingItemsByLabel: new Map(),
      });
    }
    const g = groups.get(code)!;
    g.total += 1;

    const missing = getMissingChecklistItems(a);
    const hasOtherBlock =
      (a.slaEligible === true && a.licenceVerified !== true) ||
      a.recurringInstance?.requiresRecalc === true ||
      a.status === "missing";

    if (missing.length === 0 && !hasOtherBlock) {
      g.ready += 1;
    } else {
      if (missing.length > 0) {
        g.blockedByChecklist += 1;
        for (const item of missing) {
          const label = BILLING_CHECKLIST_LABELS[item];
          g.missingItemsByLabel.set(
            label,
            (g.missingItemsByLabel.get(label) ?? 0) + 1,
          );
        }
      }
      if (hasOtherBlock && missing.length === 0) {
        g.blockedOther += 1;
      }
    }
  }
  return Array.from(groups.values()).sort((a, b) => {
    // Surface codes with blockers first
    const aBlocked = a.blockedByChecklist + a.blockedOther;
    const bBlocked = b.blockedByChecklist + b.blockedOther;
    if (aBlocked !== bBlocked) return bBlocked - aBlocked;
    return a.code.localeCompare(b.code);
  });
}

function ReadyToBillDashboard({
  activities,
}: {
  activities: BillingActivity[];
}) {
  const groups = useMemo(() => buildReadyToBillGroups(activities), [activities]);

  const totals = useMemo(() => {
    return groups.reduce(
      (acc, g) => {
        acc.total += g.total;
        acc.ready += g.ready;
        acc.blockedByChecklist += g.blockedByChecklist;
        acc.blockedOther += g.blockedOther;
        return acc;
      },
      { total: 0, ready: 0, blockedByChecklist: 0, blockedOther: 0 },
    );
  }, [groups]);

  if (totals.total === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
              Events ready to bill
            </h3>
            <p style={{ fontSize: "0.75rem", color: "#64748B" }}>
              Grouped by billing code · replaces the HEMS 1.0 Missing Bill
              report.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <DashboardKpi
              label="Total"
              value={String(totals.total)}
              color="#475569"
            />
            <DashboardKpi
              label="Ready"
              value={String(totals.ready)}
              color="#0F766E"
            />
            <DashboardKpi
              label="Missing fields"
              value={String(totals.blockedByChecklist)}
              color="#92400E"
            />
            <DashboardKpi
              label="Other blocks"
              value={String(totals.blockedOther)}
              color="#B91C1C"
            />
          </div>
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          {groups.map((g) => (
            <ReadyToBillCodeCard key={g.code} group={g} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardKpi({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-end">
      <span style={{ fontSize: "1.125rem", fontWeight: 600, color }}>
        {value}
      </span>
      <span style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>{label}</span>
    </div>
  );
}

function ReadyToBillCodeCard({ group }: { group: ReadyToBillCodeGroup }) {
  return (
    <div
      className="rounded-md border p-3 space-y-2"
      style={{ borderColor: "#E2E8F0", background: "#FAFAFA" }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div className="min-w-0">
          <div
            className="truncate"
            style={{
              fontSize: "0.8125rem",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontWeight: 600,
              color: "#0F172A",
            }}
            title={group.code}
          >
            {group.code}
          </div>
          <div
            className="truncate"
            style={{ fontSize: "0.6875rem", color: "#64748B" }}
            title={group.description}
          >
            {group.description}
          </div>
        </div>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span
            style={{
              fontSize: "0.6875rem",
              color: "#0F766E",
              background: "#ECFDF5",
              padding: "1px 6px",
              borderRadius: 4,
              fontWeight: 500,
            }}
            title="Ready to invoice"
          >
            {group.ready}/{group.total} ready
          </span>
        </div>
      </div>
      {group.missingItemsByLabel.size > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          <span style={{ fontSize: "0.6875rem", color: "#92400E" }}>
            Missing:
          </span>
          {Array.from(group.missingItemsByLabel.entries()).map(
            ([label, count]) => (
              <span
                key={label}
                className="px-1.5 py-0 rounded"
                style={{
                  fontSize: "0.6875rem",
                  background: "#FFFBEB",
                  color: "#92400E",
                  fontWeight: 500,
                }}
              >
                {label} · {count}
              </span>
            ),
          )}
        </div>
      )}
      {group.blockedOther > 0 && (
        <div
          className="flex items-center gap-1.5"
          style={{ fontSize: "0.6875rem", color: "#B91C1C" }}
        >
          {group.blockedOther} blocked on SLA / recalc / approval
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Filters bar
// ---------------------------------------------------------------------------

interface FiltersState {
  distributor: string;
  territory: string;
  categories: ActivityCategory[];
}

const INITIAL_FILTERS: FiltersState = {
  distributor: "all",
  territory: "all",
  categories: [],
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
      <BillingCategoryMultiSelect
        selected={value.categories}
        onChange={(next) => onChange({ ...value, categories: next })}
      />
    </div>
  );
}

function BillingCategoryMultiSelect({
  selected,
  onChange,
}: {
  selected: ActivityCategory[];
  onChange: (next: ActivityCategory[]) => void;
}) {
  const label =
    selected.length === 0
      ? "All categories"
      : selected.length === 1
        ? ACTIVITY_CATEGORIES.find((c) => c.value === selected[0])?.label ??
          "1 category"
        : `${selected.length} categories`;
  function toggle(value: ActivityCategory) {
    if (selected.includes(value)) onChange(selected.filter((v) => v !== value));
    else onChange([...selected, value]);
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
            style={{
              color: selected.length === 0 ? "#64748B" : "#0F172A",
            }}
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
          {selected.length > 0 && (
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
    distributor: string;
    total: number;
    activityIds: string[];
  } | null>(null);
  const [reportPreview, setReportPreview] = useState<string | null>(null);
  const [invoiceDetailsFor, setInvoiceDetailsFor] = useState<{
    billedTo: string;
    distributor: string;
    activities: BillingActivity[];
    locked: boolean;
  } | null>(null);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [reports, setReports] =
    useState<GeneratedReport[]>(MOCK_BILLING_REPORTS);
  const [schedulePreviewFor, setSchedulePreviewFor] = useState<{
    billedTo: string;
    distributor: string;
    activities: BillingActivity[];
  } | null>(null);
  const [editActivityFor, setEditActivityFor] =
    useState<BillingActivity | null>(null);
  const [historyPaymentFilter, setHistoryPaymentFilter] = useState<
    InvoicePaymentStatus | "all"
  >("all");
  const [updatePaymentFor, setUpdatePaymentFor] = useState<Invoice | null>(
    null,
  );
  const [updatePaymentDraft, setUpdatePaymentDraft] = useState<{
    paymentStatus: InvoicePaymentStatus;
    paidAmount: string;
  }>({ paymentStatus: "open", paidAmount: "" });

  // Billing period filter — Ivie's ask (May-26). Invoices are generated per
  // billing period (default bi-weekly). The operator can also narrow / widen
  // the range, and per-activity checkboxes inside each invoice card let them
  // exclude items from this run for billing in a later period.
  // Default to the current billing cycle window so seeded activities appear.
  const [billingPeriodStart, setBillingPeriodStart] = useState(
    CURRENT_BILLING_CYCLE.windowStart,
  );
  const [billingPeriodEnd, setBillingPeriodEnd] = useState(
    CURRENT_BILLING_CYCLE.windowEnd,
  );
  // Aggregation cadence (brief 2026-06-02 §2). The window dates drive
  // weekly / bi-weekly; "per-event" overrides aggregation so each approved
  // activity becomes its own invoice.
  const [aggregationCadence, setAggregationCadence] = useState<
    "weekly" | "bi-weekly" | "per-event"
  >("bi-weekly");
  const [excludedActivityIds, setExcludedActivityIds] = useState<Set<string>>(
    new Set(),
  );

  function applyPeriodPreset(preset: "this-week" | "last-2-weeks" | "this-month") {
    const today = new Date();
    let start: Date;
    if (preset === "this-week") {
      start = new Date(today);
      const day = start.getDay();
      const diff = (day + 6) % 7; // Monday start
      start.setDate(start.getDate() - diff);
    } else if (preset === "last-2-weeks") {
      start = new Date(today);
      start.setDate(start.getDate() - 14);
    } else {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
    }
    setBillingPeriodStart(start.toISOString().slice(0, 10));
    setBillingPeriodEnd(today.toISOString().slice(0, 10));
  }

  // Shift the current period back / forward by its own length (default ~14d).
  // Operator can step through bi-weekly cycles without re-picking dates.
  function shiftBillingPeriod(direction: -1 | 1) {
    const s = new Date(billingPeriodStart);
    const e = new Date(billingPeriodEnd);
    const span = Math.max(
      1,
      Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1,
    );
    s.setDate(s.getDate() + direction * span);
    e.setDate(e.getDate() + direction * span);
    setBillingPeriodStart(s.toISOString().slice(0, 10));
    setBillingPeriodEnd(e.toISOString().slice(0, 10));
  }

  // Apply filters
  const filtered = useMemo(() => {
    return activities.filter((a) => {
      if (filters.distributor !== "all" && a.distributor !== filters.distributor)
        return false;
      if (filters.territory !== "all" && a.territory !== filters.territory)
        return false;
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(a.category)
      )
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
    if (ids.length === 0) {
      toast.message("No activities selected for approval");
      return;
    }
    const selectedActivities = ids
      .map((id) => activities.find((a) => a.id === id))
      .filter((a): a is BillingActivity => a != null);
    const approvableIds = selectedActivities
      .filter(isBillingActivityReadyForInvoice)
      .map((a) => a.id);
    if (approvableIds.length === 0) {
      const firstBlocker =
        selectedActivities.flatMap(getBillingActivityBlockReasons)[0];
      toast.error(firstBlocker ?? "Resolve billing requirements before approval");
      return;
    }
    approveBillingActivities(approvableIds);
    refreshActivities();
    const skipped = ids.length - approvableIds.length;
    toast.success(
      `Approved ${approvableIds.length} activity${approvableIds.length === 1 ? "" : "s"}`,
    );
    if (skipped > 0) {
      toast.message(
        `${skipped} activit${skipped === 1 ? "y has" : "ies have"} unresolved billing requirements`,
      );
    }
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
    updateBillingActivity(activityId, {
      licenceVerified: true,
      status: "ready-to-bill",
    });
    // Drop the SLA missing-reason so the row exits Missing Bills.
    const idx = MOCK_BILLING_ACTIVITIES.findIndex((a) => a.id === activityId);
    if (idx >= 0) {
      delete (MOCK_BILLING_ACTIVITIES[idx] as { missingReason?: string })
        .missingReason;
    }
    refreshActivities();
    setResolveSlaFor(null);
    toast.success("Liquor licence verified · row moved to Update Billing");
  }

  function handleEditActivitySave(
    id: string,
    patch: EditActivityBillingPatch,
  ) {
    updateBillingActivity(id, patch);
    refreshActivities();
    toast.success("Activity billing updated");
  }

  function handlePatchInvoiceActivity(
    id: string,
    patch: { travel?: number; eventAmount?: number },
  ) {
    const existing = MOCK_BILLING_ACTIVITIES.find((a) => a.id === id);
    if (!existing) return;
    const eventAmount = patch.eventAmount ?? existing.eventAmount;
    const travel = patch.travel ?? existing.travel;
    // Service fee math (May-26 fix): bar = 10% × bar spend, trade = 20% × event amount, mixer = 0.
    const fee =
      existing.serviceFeeKind === "bar"
        ? (existing.barSpend ?? 0) * SERVICE_FEE_BY_KIND.bar
        : existing.serviceFeeKind === "trade"
          ? eventAmount * SERVICE_FEE_BY_KIND.trade
          : 0;
    const barSpend = existing.barSpend ?? 0;
    const gratuity = existing.serviceFeeKind === "bar" ? barSpend * 0.2 : 0;
    const expenseTotals =
      (existing.suppliesAmount ?? 0) +
      (existing.promotionPublicityAmount ?? 0) +
      (existing.travelEntertainmentAmount ?? 0);
    const expected =
      eventAmount + fee + travel + barSpend + gratuity + expenseTotals;
    updateBillingActivity(id, {
      eventAmount,
      travel,
      gratuity, // recomputed, kept in data for SLA form
      expectedAmount: expected,
    });
    refreshActivities();
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
                    expectedAmount: expected,
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
    distributor: string;
    activities: BillingActivity[];
  }) {
    const blocked = group.activities.filter(
      (a) => !isBillingActivityReadyForInvoice(a),
    );
    if (blocked.length > 0) {
      toast.error(
        `${blocked.length} activit${blocked.length === 1 ? "y has" : "ies have"} unresolved billing requirements`,
      );
      return;
    }
    const total = group.activities.reduce((s, a) => s + a.expectedAmount, 0);
    setQbExportFor({
      billedTo: group.billedTo,
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
    const exportActivities = qbExportFor.activityIds
      .map((id) => activities.find((a) => a.id === id))
      .filter((a): a is BillingActivity => a != null);
    if (exportActivities.length !== qbExportFor.activityIds.length) {
      toast.error("Refresh billing activities before exporting this invoice");
      setQbExportFor(null);
      return;
    }
    const blocked = exportActivities.filter(
      (a) => !isBillingActivityReadyForInvoice(a),
    );
    if (blocked.length > 0) {
      toast.error(
        `${blocked.length} activit${blocked.length === 1 ? "y has" : "ies have"} unresolved billing requirements`,
      );
      setQbExportFor(null);
      return;
    }
    const exportTotal = exportActivities.reduce(
      (s, a) => s + a.expectedAmount,
      0,
    );
    // Commit the auto-number from the counter — invoiceCounter only advances
    // when an invoice is actually created, not on every render of the Invoices
    // tab.
    const autoNumber = consumeNextInvoiceNumber();
    const manualOverride = input.invoiceNumber !== autoNumber;
    // Default to net-30 from today. Ivie can update later.
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    // Invoice approval gate (brief 2026-06-02 §2). Confirming this dialog
    // implicitly approves the invoice for sending AND pushes it to QB in one
    // controller action — both audit timestamps are recorded so the gate is
    // present in the data trail even though the action is combined for the
    // prototype's bi-weekly batch flow.
    const nowIso = new Date().toISOString();
    const invoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: input.invoiceNumber,
      manualOverride,
      billingEntity: "Hart Agency",
      billedTo: qbExportFor.billedTo,
      distributor: qbExportFor.distributor,
      paymentStatus: "open",
      paymentDueAt: dueDate.toISOString().slice(0, 10),
      distributorIdUsed: input.distributorIdUsed,
      licenceVerified: input.licenceVerified,
      cycleId: CURRENT_BILLING_CYCLE.id,
      generatedAt: nowIso,
      total: exportTotal,
      activityIds: qbExportFor.activityIds,
      status: "locked",
      approvedForSendingAt: nowIso,
      approvedForSendingBy: "Ivie (Controller)",
      qbSyncedAt: nowIso,
      sharepointSentAt: nowIso,
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

  // Invoice groups — grouped by Billed To (post-consolidation: single Hart
  // entity, no cross-entity split). Per-event cadence (brief 2026-06-02 §2)
  // overrides aggregation so each activity becomes its own invoice row.
  const invoiceGroups = useMemo(() => {
    const approved = filtered.filter(
      (a) =>
        (a.status === "approved" || a.status === "ready-to-bill") &&
        a.date >= billingPeriodStart &&
        a.date <= billingPeriodEnd &&
        isBillingActivityReadyForInvoice(a),
    );
    const map = new Map<
      string,
      {
        billedTo: string;
        distributor: string;
        activities: BillingActivity[];
        includedActivities: BillingActivity[];
      }
    >();
    for (const a of approved) {
      // Per-event: group key is the activity id so each forms its own invoice.
      // Otherwise: group by Billed To (weekly / bi-weekly aggregation).
      const key = aggregationCadence === "per-event" ? a.id : a.billedTo;
      const existing = map.get(key);
      if (existing) {
        existing.activities.push(a);
        if (!excludedActivityIds.has(a.id)) existing.includedActivities.push(a);
      } else {
        map.set(key, {
          billedTo: a.billedTo,
          distributor: a.distributor,
          activities: [a],
          includedActivities: excludedActivityIds.has(a.id) ? [] : [a],
        });
      }
    }
    return Array.from(map.values());
  }, [
    filtered,
    billingPeriodStart,
    billingPeriodEnd,
    excludedActivityIds,
    aggregationCadence,
  ]);

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
            Ready to Bill
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
                  brandAmbassador-count changes.
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        {/* --------------- Ready to Bill -------------------------------- */}
        <TabsContent value="missing" className="space-y-3">
          {/* Events Ready to Bill dashboard (brief 2026-06-02 §2) — billing-
              code grouped summary above the detail table. Replaces HEMS 1.0's
              Missing Bill report. */}
          <ReadyToBillDashboard
            activities={filtered.filter(
              (a) =>
                a.status !== "billing-locked" && a.status !== "invoiced",
            )}
          />
          <div className="flex items-center justify-between">
            <p style={{ fontSize: "0.875rem", color: "#64748B" }}>
              Each row must be resolved before it can be approved for billing.
            </p>
            {(() => {
              const readyMissing = filtered.filter(
                (a) =>
                  a.status === "missing" && isBillingActivityReadyForInvoice(a),
              );
              return (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={readyMissing.length === 0}
                  onClick={() => handleApprove(readyMissing.map((a) => a.id))}
                  title={
                    readyMissing.length === 0
                      ? "No rows are currently ready — resolve blockers above first."
                      : `Approve ${readyMissing.length} ready row${readyMissing.length === 1 ? "" : "s"}`
                  }
                >
                  <CheckCircle2 size={14} className="mr-1.5" />
                  Bulk approve ready (
                  {readyMissing.length})
                </Button>
              );
            })()}
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Distributor</TableHead>
                    <TableHead>Brand Ambassadors</TableHead>
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
                          <TableCell>
                            <CampaignTag
                              campaignId={a.campaignId}
                              campaignName={a.campaignName}
                            />
                          </TableCell>
                          <TableCell>{a.date}</TableCell>
                          <TableCell>{a.accountName}</TableCell>
                          <TableCell>{a.distributor}</TableCell>
                          <TableCell>{a.brandAmbassadorCount}</TableCell>
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
                              "Recurring — brand ambassador count changed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  if (a.recurringInstance) {
                                    updateBillingActivity(a.id, {
                                      brandAmbassadorCount:
                                        a.recurringInstance.currentBrandAmbassadorCount,
                                      recurringInstance: {
                                        ...a.recurringInstance,
                                        requiresRecalc: false,
                                      },
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
                                      `Recalculated for ${a.recurringInstance.currentBrandAmbassadorCount} brandAmbassadors`,
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
                        colSpan={9}
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
            invoices={invoices}
            onApprove={handleApprove}
            onEdit={(a) => setEditActivityFor(a)}
          />
        </TabsContent>

        {/* --------------- Invoices ------------------------------------- */}
        <TabsContent value="invoices" className="space-y-4">
          {/* Billing-period filter (Ivie May-26). Default bi-weekly. */}
          <Card>
            <CardContent className="p-4 flex flex-wrap items-center gap-3">
              <div
                className="flex items-center gap-1.5"
                style={{ fontSize: "0.8125rem", color: "#64748B" }}
              >
                <Filter size={14} />
                Billing period
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => shiftBillingPeriod(-1)}
                title="Previous billing period"
              >
                <ChevronLeft size={14} />
              </Button>
              <input
                type="date"
                className="rounded-md border h-9 px-3"
                style={{
                  fontSize: "0.875rem",
                  borderColor: "#E2E8F0",
                  background: "white",
                }}
                value={billingPeriodStart}
                onChange={(e) => setBillingPeriodStart(e.target.value)}
              />
              <span style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>→</span>
              <input
                type="date"
                className="rounded-md border h-9 px-3"
                style={{
                  fontSize: "0.875rem",
                  borderColor: "#E2E8F0",
                  background: "white",
                }}
                value={billingPeriodEnd}
                onChange={(e) => setBillingPeriodEnd(e.target.value)}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => shiftBillingPeriod(1)}
                title="Next billing period"
              >
                <ChevronRight size={14} />
              </Button>
              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => applyPeriodPreset("this-week")}
                >
                  This week
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => applyPeriodPreset("last-2-weeks")}
                >
                  Last 2 weeks
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => applyPeriodPreset("this-month")}
                >
                  This month
                </Button>
              </div>
              <div
                className="flex items-center gap-1.5 ml-2 pl-3 border-l"
                style={{ borderColor: "#E2E8F0" }}
              >
                <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                  Aggregation
                </span>
                {(
                  ["weekly", "bi-weekly", "per-event"] as const
                ).map((m) => (
                  <Button
                    key={m}
                    size="sm"
                    variant={aggregationCadence === m ? "default" : "outline"}
                    onClick={() => setAggregationCadence(m)}
                    title={
                      m === "per-event"
                        ? "Each activity becomes its own invoice"
                        : `Aggregate activities into a ${m} invoice per billed party`
                    }
                  >
                    {m === "bi-weekly"
                      ? "Bi-weekly"
                      : m === "weekly"
                        ? "Weekly"
                        : "Per-event"}
                  </Button>
                ))}
              </div>
              {excludedActivityIds.size > 0 && (
                <button
                  type="button"
                  onClick={() => setExcludedActivityIds(new Set())}
                  className="ml-auto cursor-pointer hover:underline"
                  style={{ fontSize: "0.75rem", color: "#7D152D" }}
                >
                  Reset {excludedActivityIds.size} excluded
                </button>
              )}
            </CardContent>
          </Card>

          {invoiceGroups.length === 0 ? (
            <Card>
              <CardContent
                className="p-8 text-center"
                style={{ color: "#94A3B8" }}
              >
                No approved activities in this billing period. Approve in
                Update Billing or widen the period above.
              </CardContent>
            </Card>
          ) : (
            invoiceGroups.map((g) => {
              const includedTotal = g.includedActivities.reduce(
                (s, a) => s + a.expectedAmount,
                0,
              );
              const fullTotal = g.activities.reduce(
                (s, a) => s + a.expectedAmount,
                0,
              );
              return (
                <Card key={g.billedTo}>
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
                          {billingPeriodStart} → {billingPeriodEnd} ·{" "}
                          {g.includedActivities.length} of{" "}
                          {g.activities.length} activit
                          {g.activities.length === 1 ? "y" : "ies"} included
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className="font-semibold"
                          style={{ fontSize: "1.25rem", color: "#0F172A" }}
                        >
                          {fmt(includedTotal)}
                        </div>
                        {includedTotal !== fullTotal && (
                          <div
                            className="mt-0.5"
                            style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
                          >
                            (of {fmt(fullTotal)} eligible)
                          </div>
                        )}
                        <div
                          className="mt-0.5"
                          style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                        >
                          Auto-number: <strong>{peekNextInvoiceNumber()}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Per-activity selection — Ivie's "select what to include" ask */}
                    <div
                      className="rounded-md border"
                      style={{ borderColor: "#E2E8F0" }}
                    >
                      {g.activities.map((a) => {
                        const included = !excludedActivityIds.has(a.id);
                        return (
                          <label
                            key={a.id}
                            className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#F8FAFC]"
                            style={{
                              borderBottom: "1px solid #F1F5F9",
                            }}
                          >
                            <Checkbox
                              checked={included}
                              onCheckedChange={() => {
                                setExcludedActivityIds((prev) => {
                                  const next = new Set(prev);
                                  if (next.has(a.id)) next.delete(a.id);
                                  else next.add(a.id);
                                  return next;
                                });
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <div
                                className="flex items-center gap-2 truncate"
                                style={{
                                  fontSize: "0.8125rem",
                                  color: included ? "#0F172A" : "#94A3B8",
                                  textDecoration: included
                                    ? "none"
                                    : "line-through",
                                }}
                              >
                                <span className="truncate">{a.name}</span>
                                <CampaignTag
                                  campaignId={a.campaignId}
                                  campaignName={a.campaignName}
                                  variant="compact"
                                />
                              </div>
                              <div
                                style={{
                                  fontSize: "0.6875rem",
                                  color: "#94A3B8",
                                }}
                              >
                                {a.date} ·{" "}
                                {a.billingCode ?? "no code"}
                              </div>
                            </div>
                            <div
                              style={{
                                fontSize: "0.8125rem",
                                color: included ? "#0F172A" : "#94A3B8",
                                fontWeight: 500,
                              }}
                            >
                              {fmt(a.expectedAmount)}
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          openQbExport({
                            billedTo: g.billedTo,
                            distributor: g.distributor,
                            activities: g.includedActivities,
                          })
                        }
                        disabled={g.includedActivities.length === 0}
                        title="Approve this invoice for sending and push it to QuickBooks in a single confirmation step (brief 2026-06-02 §2 invoice approval gate)."
                      >
                        <Send size={13} className="mr-1.5" />
                        Approve &amp; Export for QuickBooks
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setInvoiceDetailsFor({
                            billedTo: g.billedTo,
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
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSchedulePreviewFor(g)}
                        title="Customer-facing budget schedule (separate from the invoice)"
                      >
                        <FileText size={13} className="mr-1.5" />
                        Schedule (Excel)
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
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-1.5"
              style={{ fontSize: "0.8125rem", color: "#64748B" }}
            >
              <Filter size={14} />
              Payment status
            </div>
            <Select
              value={historyPaymentFilter}
              onValueChange={(v) =>
                setHistoryPaymentFilter(v as InvoicePaymentStatus | "all")
              }
            >
              <SelectTrigger className="h-9 w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {INVOICE_PAYMENT_STATUSES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cycle</TableHead>
                    <TableHead>Invoice no.</TableHead>
                    <TableHead>Billed To</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Payment status</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead>QB sync</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices
                    .filter((i) => i.status === "locked")
                    .filter(
                      (i) =>
                        historyPaymentFilter === "all" ||
                        i.paymentStatus === historyPaymentFilter,
                    )
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
                            <div>
                              <strong>{i.invoiceNumber}</strong>
                            </div>
                            <div
                              className="mt-0.5"
                              style={{
                                fontSize: "0.625rem",
                                fontFamily:
                                  "ui-monospace, SFMono-Regular, Menlo, monospace",
                                color: "#94A3B8",
                              }}
                              title="Power Automate bundling tag"
                            >
                              #{formatArtefactTag("invoice", {
                                cycleId: i.cycleId,
                                invoiceNumber: i.invoiceNumber,
                              })}
                            </div>
                          </TableCell>
                          <TableCell
                            className="max-w-[260px] truncate"
                            title={i.billedTo}
                          >
                            {i.billedTo}
                          </TableCell>
                          <TableCell className="text-right">
                            {fmt(i.total)}
                          </TableCell>
                          <TableCell>
                            <PaymentStatusBadge status={i.paymentStatus} />
                            {i.paymentStatus === "partially-paid" &&
                              i.paidAmount != null && (
                                <div
                                  className="mt-0.5"
                                  style={{
                                    fontSize: "0.6875rem",
                                    color: "#64748B",
                                  }}
                                >
                                  {fmt(i.paidAmount)} / {fmt(i.total)}
                                </div>
                              )}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "0.75rem",
                              color:
                                i.paymentStatus === "disputed"
                                  ? "#B91C1C"
                                  : "#64748B",
                            }}
                          >
                            {i.paymentDueAt ?? "—"}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "0.75rem",
                              color: "#64748B",
                            }}
                          >
                            {i.qbSyncedAt
                              ? new Date(i.qbSyncedAt).toLocaleDateString()
                              : "—"}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                setInvoiceDetailsFor({
                                  billedTo: i.billedTo,
                                  distributor: i.distributor,
                                  activities: acts,
                                  locked: true,
                                })
                              }
                            >
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setUpdatePaymentDraft({
                                  paymentStatus: i.paymentStatus,
                                  paidAmount:
                                    i.paidAmount != null
                                      ? String(i.paidAmount)
                                      : "",
                                });
                                setUpdatePaymentFor(i);
                              }}
                              title="Update payment status"
                            >
                              Update payment
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                const ids = rejectInvoice(i.id);
                                setInvoices(
                                  invoices.filter((x) => x.id !== i.id),
                                );
                                ids.forEach((aid) =>
                                  updateBillingActivity(aid, {
                                    status: "ready-to-bill",
                                  }),
                                );
                                refreshActivities();
                                toast.success(
                                  `Invoice ${i.invoiceNumber} rejected · ${ids.length} activities re-opened`,
                                );
                              }}
                              title="Reject this invoice and re-open its activities"
                              style={{ color: "#B91C1C" }}
                            >
                              <RefreshCcw size={13} className="mr-1.5" />
                              Reject
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
          invoiceNumberDefault={peekNextInvoiceNumber()}
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

      <EditActivityBillingModal
        open={!!editActivityFor}
        onClose={() => setEditActivityFor(null)}
        activity={editActivityFor}
        onSave={handleEditActivitySave}
        onApprove={(id) => handleApprove([id])}
      />

      <GenerateReportDialog
        open={generateOpen}
        onClose={() => setGenerateOpen(false)}
        workspace="billing"
        cycleId={CURRENT_BILLING_CYCLE.id}
        defaultRange={{
          start: CURRENT_BILLING_CYCLE.windowStart,
          end: CURRENT_BILLING_CYCLE.windowEnd,
        }}
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
        <DialogContent className="!max-w-[min(96vw,1100px)] w-[min(96vw,1100px)] overflow-hidden">
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
          ) : reportPreview === "Customer Schedule" ? (
            <CustomerSchedulePreview activities={filtered} />
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

      {/* Customer Schedule preview (P1 #11 — Kayla's customer budget export) */}
      <Dialog
        open={!!schedulePreviewFor}
        onOpenChange={(v) => (v ? null : setSchedulePreviewFor(null))}
      >
        <DialogContent className="!max-w-[min(96vw,1300px)] w-[min(96vw,1300px)]">
          <DialogHeader>
            <DialogTitle>Customer Schedule — {schedulePreviewFor?.billedTo}</DialogTitle>
            <DialogDescription>
              Budget-facing schedule export. Distinct from the invoice — shows
              max ambassador expense per activity so the customer can size their
              spend.
            </DialogDescription>
          </DialogHeader>
          {schedulePreviewFor && (
            <CustomerSchedulePreview activities={schedulePreviewFor.activities} />
          )}
        </DialogContent>
      </Dialog>

      {/* Update payment status — Ivie's expanded tracking */}
      <Dialog
        open={!!updatePaymentFor}
        onOpenChange={(v) => (v ? null : setUpdatePaymentFor(null))}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update payment</DialogTitle>
            <DialogDescription>
              {updatePaymentFor?.invoiceNumber} ·{" "}
              {updatePaymentFor ? fmt(updatePaymentFor.total) : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="up-status">Status</Label>
              <Select
                value={updatePaymentDraft.paymentStatus}
                onValueChange={(v) =>
                  setUpdatePaymentDraft({
                    ...updatePaymentDraft,
                    paymentStatus: v as InvoicePaymentStatus,
                  })
                }
              >
                <SelectTrigger id="up-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INVOICE_PAYMENT_STATUSES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {updatePaymentDraft.paymentStatus === "partially-paid" && (
              <div className="space-y-1.5">
                <Label htmlFor="up-amount">Amount received so far</Label>
                <input
                  id="up-amount"
                  type="number"
                  className="w-full rounded-md border px-3 py-2"
                  style={{
                    fontSize: "0.875rem",
                    borderColor: "#E2E8F0",
                  }}
                  value={updatePaymentDraft.paidAmount}
                  onChange={(e) =>
                    setUpdatePaymentDraft({
                      ...updatePaymentDraft,
                      paidAmount: e.target.value,
                    })
                  }
                  placeholder="e.g. 800"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUpdatePaymentFor(null)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!updatePaymentFor) return;
                const status = updatePaymentDraft.paymentStatus;
                const patch: {
                  paymentStatus: InvoicePaymentStatus;
                  paidAmount?: number;
                  paidAt?: string;
                } = { paymentStatus: status };
                if (status === "paid") {
                  patch.paidAmount = updatePaymentFor.total;
                  patch.paidAt = new Date().toISOString().slice(0, 10);
                } else if (status === "partially-paid") {
                  patch.paidAmount =
                    parseFloat(updatePaymentDraft.paidAmount) || 0;
                  patch.paidAt = new Date().toISOString().slice(0, 10);
                }
                updateInvoicePayment(updatePaymentFor.id, patch);
                setInvoices(
                  invoices.map((x) =>
                    x.id === updatePaymentFor.id ? { ...x, ...patch } : x,
                  ),
                );
                setUpdatePaymentFor(null);
                toast.success(
                  `${updatePaymentFor.invoiceNumber} marked ${status}`,
                );
              }}
            >
              Save
            </Button>
          </DialogFooter>
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
  invoices,
  onApprove,
  onEdit,
}: {
  activities: BillingActivity[];
  invoices: Invoice[];
  onApprove: (ids: string[]) => void;
  onEdit: (activity: BillingActivity) => void;
}) {
  // For the three-status chip group: look up the invoice that contains this
  // activity (if one has been generated).
  const invoiceByActivityId = new Map<string, Invoice>();
  invoices.forEach((inv) => {
    inv.activityIds.forEach((id) => invoiceByActivityId.set(id, inv));
  });
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
        isBillingActivityReadyForInvoice(a),
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
                <TableHead>Campaign</TableHead>
                <TableHead>Billing code</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Billed To</TableHead>
                <TableHead>Service fee</TableHead>
                <TableHead className="text-right">Activity $</TableHead>
                <TableHead className="text-right">BA $</TableHead>
                <TableHead className="text-right">Travel</TableHead>
                <TableHead className="text-right">Invoice total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((a) => {
                const badge = statusBadge(a.status);
                const approvalBlockReason =
                  getBillingActivityBlockReasons(a)[0];
                return (
                  <TableRow key={a.id}>
                    <TableCell>
                      <Checkbox
                        checked={selected.has(a.id)}
                        onCheckedChange={() => toggle(a.id)}
                        disabled={
                          approvalBlockReason != null || a.status === "approved"
                        }
                      />
                    </TableCell>
                    <TableCell className="max-w-[220px] truncate">
                      {a.name}
                    </TableCell>
                    <TableCell>
                      <CampaignTag
                        campaignId={a.campaignId}
                        campaignName={a.campaignName}
                      />
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "0.75rem",
                        color: "#475569",
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, monospace",
                      }}
                    >
                      {a.billingCode ?? "—"}
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
                    <TableCell className="text-right font-medium">
                      {fmt(a.expectedAmount)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md w-fit"
                          style={{
                            fontSize: "0.6875rem",
                            background: badge.bg,
                            color: badge.fg,
                          }}
                        >
                          {badge.label}
                        </span>
                        <ThreeStatusTracks
                          activity={a}
                          invoice={invoiceByActivityId.get(a.id)}
                        />
                        {approvalBlockReason && (
                          <div
                            style={{ fontSize: "0.6875rem", color: "#B91C1C" }}
                          >
                            {approvalBlockReason}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEdit(a)}
                        title="Edit billing details before approving"
                      >
                        <Pencil size={13} className="mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {activities.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={15}
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
    <div className="space-y-3 w-full min-w-0">
      <p
        className="rounded-md px-3 py-2"
        style={{
          fontSize: "0.75rem",
          color: "#92400E",
          background: "#FFFBEB",
          border: "1px solid #FCD34D",
        }}
      >
        R2 scope: capture only. SLA report output continues on HEMS 1.0 until
        R3 (Aug). Fields below mirror the SGWS bar-spend form so the existing
        Azure / Python script can be re-pointed at this data when output
        migrates.
      </p>
      <div
        className="rounded-lg border w-full"
        style={{
          borderColor: "#E2E8F0",
          maxHeight: 400,
          overflowY: "auto",
          overflowX: "auto",
        }}
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
              <TableHead className="text-right">Total spent</TableHead>
              <TableHead>Receipt</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Approver</TableHead>
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
                <TableCell>
                  {r.receiptUrl ? (
                    <span
                      title={r.receiptUrl}
                      style={{ color: "#0F766E", fontSize: "0.75rem" }}
                    >
                      Attached
                    </span>
                  ) : (
                    <span style={{ color: "#94A3B8", fontSize: "0.75rem" }}>
                      —
                    </span>
                  )}
                </TableCell>
                <TableCell
                  className="max-w-[200px] truncate"
                  title={r.clarifyingNotes}
                  style={{ fontSize: "0.75rem", color: "#475569" }}
                >
                  {r.clarifyingNotes || "—"}
                </TableCell>
                <TableCell style={{ fontSize: "0.75rem" }}>
                  {r.approvingManager || "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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

// ---------------------------------------------------------------------------
// CustomerSchedulePreview — P1 #11. Customer-facing budget export distinct
// from the invoice. Shows labor + max ambassador expense, liquor licence,
// distributor IDs, creator info, and TD link placeholders per Kayla 01:26:35.
// ---------------------------------------------------------------------------

function CustomerSchedulePreview({
  activities,
}: {
  activities: BillingActivity[];
}) {
  if (activities.length === 0) {
    return (
      <p
        className="py-6 text-center"
        style={{ color: "#94A3B8", fontSize: "0.875rem" }}
      >
        No activities in the current selection to schedule.
      </p>
    );
  }
  return (
    <div
      className="rounded-lg border"
      style={{ borderColor: "#E2E8F0", maxHeight: 500, overflow: "auto" }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Activity ID</TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead>Billing code</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Distributor</TableHead>
            <TableHead>Liquor licence</TableHead>
            <TableHead className="text-right">Labor</TableHead>
            <TableHead className="text-right">Max bar spend</TableHead>
            <TableHead className="text-right">Max Ambassador Expense</TableHead>
            <TableHead>TD link</TableHead>
            <TableHead>Created by</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((a) => {
            const maxBarSpend = a.maxBarSpend ?? 0;
            const maxGratuity = maxBarSpend * 0.2;
            const maxAmbassadorExpense =
              a.ambassadorAmount + maxBarSpend + maxGratuity;
            return (
              <TableRow key={a.id}>
                <TableCell>{a.id}</TableCell>
                <TableCell
                  className="max-w-[160px] truncate"
                  title={a.campaignName ?? ""}
                  style={{
                    fontSize: "0.75rem",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, monospace",
                    color: "#7D152D",
                  }}
                >
                  {a.campaignId ?? "—"}
                </TableCell>
                <TableCell
                  style={{ fontSize: "0.75rem", color: "#475569" }}
                >
                  {a.billingCode ?? "—"}
                </TableCell>
                <TableCell>{a.date}</TableCell>
                <TableCell
                  className="max-w-[180px] truncate"
                  title={a.accountName}
                >
                  {a.accountName}
                </TableCell>
                <TableCell
                  className="max-w-[140px] truncate"
                  title={a.distributor}
                >
                  {a.distributor}
                </TableCell>
                <TableCell style={{ fontSize: "0.75rem" }}>—</TableCell>
                <TableCell className="text-right">
                  {fmt(a.ambassadorAmount)}
                </TableCell>
                <TableCell className="text-right">
                  {maxBarSpend > 0 ? fmt(maxBarSpend) : "—"}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {fmt(maxAmbassadorExpense)}
                </TableCell>
                <TableCell
                  style={{ fontSize: "0.75rem", color: "#1D4ED8" }}
                >
                  td-{a.id.replace(/[^a-z0-9]/gi, "")}
                </TableCell>
                <TableCell style={{ fontSize: "0.75rem", color: "#64748B" }}>
                  client-staff
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
