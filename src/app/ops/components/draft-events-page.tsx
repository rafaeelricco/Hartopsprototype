import React, { useState, useMemo, useCallback } from "react";
import {
  Search,
  ClipboardCheck,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle,
  Mail,
  FileSpreadsheet,
  PenLine,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  CalendarDays,
  Building2,
  Package,
  User,
  Inbox,
  Plus,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { Card, CardContent } from "../../shared/components/ui/card";
import { Badge } from "../../shared/components/ui/badge";
import { Button } from "../../shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shared/components/ui/select";
import { Input } from "@/app/shared/components/ui/input";
import { Checkbox } from "../../shared/components/ui/checkbox";
import { Label } from "../../shared/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../shared/components/ui/dialog";
import {
  MOCK_DRAFT_EVENTS,
  type DraftEventRecord,
  type DraftStatus,
} from "./draft-events-data";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function getSourceIcon(source: string) {
  switch (source) {
    case "Email":
      return Mail;
    case "Excel Upload":
      return FileSpreadsheet;
    case "Manual":
      return PenLine;
    default:
      return Mail;
  }
}

function getSourceStyle(source: string) {
  switch (source) {
    case "Email":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Excel Upload":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Manual":
      return "bg-purple-50 text-purple-700 border-purple-200";
    default:
      return "";
  }
}

function getStatusStyle(status: DraftStatus) {
  switch (status) {
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "approved":
      return "bg-green-50 text-green-700 border-green-200";
    case "rejected":
      return "bg-red-50 text-red-600 border-red-200";
  }
}

function getStatusLabel(status: DraftStatus) {
  switch (status) {
    case "pending":
      return "Pending Review";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
  }
}

const PAGE_SIZE = 8;

const ORGANIZATIONS = [
  "Acme Corp",
  "Vanguard LLC",
  "Zenith Group",
  "Nova Systems",
  "Meridian Partners",
  "Catalyst Inc.",
  "Pinnacle Ventures",
];

const VENUE_TYPES = [
  "Bar / Tavern",
  "Restaurant / On-Premise",
  "Retail / Off-Premise",
  "Venue / Arena",
  "Virtual",
  "Hotel / Resort",
  "Other",
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function DraftEventsPage() {
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [orgFilter, setOrgFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Local state for draft events (allows approval/rejection)
  const [drafts, setDrafts] = useState<DraftEventRecord[]>(() =>
    MOCK_DRAFT_EVENTS.map((d) => ({ ...d })),
  );

  // Review panel state
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, Set<string>>>(
    {},
  );
  const [rejectDialogId, setRejectDialogId] = useState<string | null>(null);
  const [approveWarningId, setApproveWarningId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  /* ---- Stats ---- */
  const pendingCount = drafts.filter((d) => d.status === "pending").length;
  const approvedCount = drafts.filter((d) => d.status === "approved").length;
  const rejectedCount = drafts.filter((d) => d.status === "rejected").length;
  const withMissingFields = drafts.filter(
    (d) => d.status === "pending" && d.missingFields.length > 0,
  ).length;

  /* ---- Filtering ---- */
  const filtered = useMemo(() => {
    let result = [...drafts];
    const q = search.toLowerCase().trim();
    if (q) {
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.organization.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q) ||
          e.submittedBy.toLowerCase().includes(q) ||
          e.campaignName.toLowerCase().includes(q),
      );
    }
    if (sourceFilter !== "all") {
      result = result.filter(
        (e) => e.source.toLowerCase() === sourceFilter.toLowerCase(),
      );
    }
    if (orgFilter !== "all") {
      result = result.filter((e) => e.organization === orgFilter);
    }
    return result;
  }, [search, sourceFilter, orgFilter, drafts]);

  /* ---- Pagination ---- */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  React.useEffect(() => {
    setPage(1);
  }, [search, sourceFilter, orgFilter]);

  const hasActiveFilters = sourceFilter !== "all" || orgFilter !== "all";

  const clearFilters = () => {
    setSourceFilter("all");
    setOrgFilter("all");
    setSearch("");
  };

  /* ---- Checklist helpers ---- */
  const getChecked = (draftId: string): Set<string> => {
    if (checkedItems[draftId]) return checkedItems[draftId];
    const d = drafts.find((x) => x.id === draftId);
    if (!d) return new Set();
    const initial = new Set(
      d.reviewChecklist.filter((c) => c.checked).map((c) => c.id),
    );
    return initial;
  };

  const toggleCheckItem = (draftId: string, itemId: string) => {
    setCheckedItems((prev) => {
      const current = getChecked(draftId);
      const next = new Set(current);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return { ...prev, [draftId]: next };
    });
  };

  /* ---- Actions ---- */
  const handleApproveClick = (draftId: string) => {
    const draft = drafts.find((d) => d.id === draftId);
    if (
      draft &&
      (draft.source === "Email" || draft.source === "Excel Upload")
    ) {
      setApproveWarningId(draftId);
    } else {
      confirmApprove(draftId);
    }
  };

  const confirmApprove = (draftId: string) => {
    setDrafts((prev) =>
      prev.map((d) =>
        d.id === draftId ? { ...d, status: "approved" as const } : d,
      ),
    );
    setApproveWarningId(null);
    setExpandedId(null);
  };

  const rejectDraft = (draftId: string, reason: string) => {
    setDrafts((prev) =>
      prev.map((d) =>
        d.id === draftId
          ? { ...d, status: "rejected" as const, notes: `Rejected: ${reason}` }
          : d,
      ),
    );
    setRejectDialogId(null);
    setRejectReason("");
    setExpandedId(null);
  };

  const updateDraftField = useCallback(
    (draftId: string, field: keyof DraftEventRecord, value: unknown) => {
      setDrafts((prev) =>
        prev.map((d) => {
          if (d.id !== draftId) return d;
          const updated = { ...d, [field]: value };
          // Auto-resolve missing fields
          const fieldToMissingMap: Record<string, string> = {
            location: "account",
            date: "date",
            products: "products",
            description: "educator",
            campaignName: "budget",
          };
          const missingKey = fieldToMissingMap[field as string];
          if (missingKey && updated.missingFields.includes(missingKey)) {
            const hasValue = Array.isArray(value)
              ? (value as string[]).length > 0
              : typeof value === "string" && value.trim() !== "";
            if (hasValue) {
              updated.missingFields = updated.missingFields.filter(
                (f) => f !== missingKey,
              );
            }
          }
          return updated;
        }),
      );
    },
    [],
  );

  const addCustomChecklistItem = useCallback(
    (draftId: string, label: string) => {
      setDrafts((prev) =>
        prev.map((d) => {
          if (d.id !== draftId) return d;
          const newItem = {
            id: `custom-${Date.now()}`,
            label,
            checked: false,
          };
          return {
            ...d,
            reviewChecklist: [...d.reviewChecklist, newItem],
          };
        }),
      );
    },
    [],
  );

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      <div>
        <h1 className="text-foreground">Draft Events</h1>
        <p
          className="text-muted-foreground mt-1"
          style={{ fontSize: "0.875rem" }}
        >
          Review, edit, and approve incoming event requests before they go live.
        </p>
      </div>

      {/* Summary Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard
          icon={Clock}
          label="Pending Review"
          value={pendingCount}
          accent={true}
        />
        <StatCard
          icon={CheckCircle2}
          label="Approved"
          value={approvedCount}
          accent={false}
        />
        <StatCard
          icon={XCircle}
          label="Rejected"
          value={rejectedCount}
          accent={false}
        />
        <StatCard
          icon={AlertTriangle}
          label="Missing Fields"
          value={withMissingFields}
          accent={false}
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search drafts..."
            className="pl-9"
          />
        </div>

        {/* Source filter */}
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger
            className="w-[160px] cursor-pointer"
            style={{ fontSize: "0.8125rem" }}
          >
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="excel upload">Excel Upload</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
          </SelectContent>
        </Select>

        {/* Organization filter */}
        <Select value={orgFilter} onValueChange={setOrgFilter}>
          <SelectTrigger
            className="w-[180px] cursor-pointer"
            style={{ fontSize: "0.8125rem" }}
          >
            <SelectValue placeholder="Organization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Organizations</SelectItem>
            {ORGANIZATIONS.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
            style={{ fontSize: "0.75rem" }}
          >
            <X className="size-3 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Draft Events Table */}
      <Card className="gap-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {[
                    "Event",
                    "Organization",
                    "Source",
                    "Submitted",
                    "Issues",
                    "Status",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-muted-foreground"
                      style={{ fontSize: "0.75rem", fontWeight: 500 }}
                    >
                      {h && (
                        <span className="inline-flex items-center gap-1">
                          {h}
                          <ArrowUpDown className="size-3" />
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Inbox className="size-8 text-muted-foreground" />
                        <p
                          className="text-muted-foreground"
                          style={{ fontSize: "0.875rem" }}
                        >
                          No draft events match your filters.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paged.map((draft) => (
                    <React.Fragment key={draft.id}>
                      <tr
                        className={`border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer ${
                          expandedId === draft.id ? "bg-muted/30" : ""
                        }`}
                        onClick={() =>
                          setExpandedId(
                            expandedId === draft.id ? null : draft.id,
                          )
                        }
                      >
                        {/* Event */}
                        <td className="px-5 py-3">
                          <div className="min-w-[200px]">
                            <span
                              className="text-foreground block"
                              style={{
                                fontSize: "0.875rem",
                                fontWeight: 500,
                              }}
                            >
                              {draft.name}
                            </span>
                            <span
                              className="text-muted-foreground"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {draft.id}
                              {draft.campaignName && ` · ${draft.campaignName}`}
                            </span>
                          </div>
                        </td>

                        {/* Organization */}
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2 min-w-[130px]">
                            <div className="flex items-center justify-center size-6 rounded bg-muted shrink-0">
                              <Building2 className="size-3 text-muted-foreground" />
                            </div>
                            <span
                              className="text-foreground"
                              style={{ fontSize: "0.8125rem" }}
                            >
                              {draft.organization}
                            </span>
                          </div>
                        </td>

                        {/* Source */}
                        <td className="px-5 py-3">
                          <Badge
                            variant="secondary"
                            className={getSourceStyle(draft.source)}
                            style={{ fontSize: "0.6875rem" }}
                          >
                            {React.createElement(getSourceIcon(draft.source), {
                              className: "size-3 mr-1",
                            })}
                            {draft.source}
                          </Badge>
                        </td>

                        {/* Submitted */}
                        <td className="px-5 py-3 min-w-[140px]">
                          <span
                            className="text-foreground block"
                            style={{ fontSize: "0.8125rem" }}
                          >
                            {draft.submittedAt.split(",")[0]}
                          </span>
                          <span
                            className="text-muted-foreground"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {draft.submittedBy}
                          </span>
                        </td>

                        {/* Issues */}
                        <td className="px-5 py-3">
                          {draft.missingFields.length > 0 ? (
                            <Badge
                              variant="secondary"
                              className="bg-amber-50 text-amber-700 border-amber-200"
                              style={{ fontSize: "0.6875rem" }}
                            >
                              <AlertTriangle className="size-3 mr-1" />
                              {draft.missingFields.length} missing
                            </Badge>
                          ) : (
                            <span
                              className="text-muted-foreground"
                              style={{ fontSize: "0.75rem" }}
                            >
                              —
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-3">
                          <Badge
                            variant="secondary"
                            className={getStatusStyle(draft.status)}
                            style={{ fontSize: "0.6875rem" }}
                          >
                            {draft.status === "pending" && (
                              <span className="inline-block size-1.5 rounded-full bg-amber-500 mr-1 animate-pulse" />
                            )}
                            {getStatusLabel(draft.status)}
                          </Badge>
                        </td>

                        {/* Expand indicator */}
                        <td className="px-5 py-3">
                          {expandedId === draft.id ? (
                            <ChevronUp className="size-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="size-4 text-muted-foreground" />
                          )}
                        </td>
                      </tr>

                      {/* Expanded Review Panel */}
                      {expandedId === draft.id && (
                        <tr>
                          <td colSpan={7} className="p-0">
                            <ReviewPanel
                              draft={draft}
                              checkedSet={getChecked(draft.id)}
                              onToggleCheck={(itemId) =>
                                toggleCheckItem(draft.id, itemId)
                              }
                              onApprove={() => handleApproveClick(draft.id)}
                              onReject={() => setRejectDialogId(draft.id)}
                              onUpdateField={(field, value) =>
                                updateDraftField(draft.id, field, value)
                              }
                              onAddChecklistItem={(label) =>
                                addCustomChecklistItem(draft.id, label)
                              }
                            />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-border">
              <span
                className="text-muted-foreground"
                style={{ fontSize: "0.75rem" }}
              >
                Showing {(safePage - 1) * PAGE_SIZE + 1}–
                {Math.min(safePage * PAGE_SIZE, filtered.length)} of{" "}
                {filtered.length} drafts
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={safePage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="cursor-pointer"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Button
                      key={p}
                      variant={p === safePage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(p)}
                      className={
                        p === safePage
                          ? "bg-[#7D152D] hover:bg-[#7D152D]/90 cursor-pointer"
                          : "cursor-pointer"
                      }
                      style={{ fontSize: "0.75rem", minWidth: "2rem" }}
                    >
                      {p}
                    </Button>
                  ),
                )}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="cursor-pointer"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reject Reason Dialog */}
      <Dialog
        open={rejectDialogId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setRejectDialogId(null);
            setRejectReason("");
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle style={{ fontSize: "1.125rem", fontWeight: 600 }}>
              Reject Draft Event
            </DialogTitle>
            <DialogDescription style={{ fontSize: "0.875rem" }}>
              Provide a reason for rejecting this draft event. The submitter
              will be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <textarea
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              rows={3}
              placeholder="Reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setRejectDialogId(null);
                  setRejectReason("");
                }}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={!rejectReason.trim()}
                onClick={() => {
                  if (rejectDialogId) {
                    rejectDraft(rejectDialogId, rejectReason.trim());
                  }
                }}
                className="cursor-pointer"
              >
                Reject Draft
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Source Approval Warning Dialog */}
      <Dialog
        open={approveWarningId !== null}
        onOpenChange={(open) => {
          if (!open) setApproveWarningId(null);
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle
              className="flex items-center gap-2"
              style={{ fontSize: "1.125rem", fontWeight: 600 }}
            >
              <ShieldAlert className="size-5 text-amber-600" />
              Confirm Approval
            </DialogTitle>
            <DialogDescription style={{ fontSize: "0.875rem" }}>
              You are about to push this event into the live pipeline.
            </DialogDescription>
          </DialogHeader>

          {approveWarningId &&
            (() => {
              const d = drafts.find((x) => x.id === approveWarningId);
              if (!d) return null;
              return (
                <div className="space-y-4 mt-2">
                  {/* Event summary */}
                  <Card>
                    <CardContent className="p-4 space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        {d.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {d.date} · {d.startTime} – {d.endTime}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {d.location}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {d.organization}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Warning banner */}
                  <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <Sparkles className="size-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">
                        AI-Generated Content Warning
                      </p>
                      <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                        This event was generated from an external source (
                        {d.source === "Email"
                          ? "AI-parsed email"
                          : "Excel bulk upload"}
                        ). Please confirm all fields have been reviewed and
                        corrected before approving.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setApproveWarningId(null)}
                      className="cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-[#7D152D] hover:bg-[#7D152D]/90 cursor-pointer"
                      onClick={() => confirmApprove(approveWarningId)}
                    >
                      <CheckCircle2 className="size-4 mr-1.5" />
                      Confirm & Approve
                    </Button>
                  </div>
                </div>
              );
            })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Review Panel (expanded row) — fully editable for pending drafts     */
/* ------------------------------------------------------------------ */

function ReviewPanel({
  draft,
  checkedSet,
  onToggleCheck,
  onApprove,
  onReject,
  onUpdateField,
  onAddChecklistItem,
}: {
  draft: DraftEventRecord;
  checkedSet: Set<string>;
  onToggleCheck: (itemId: string) => void;
  onApprove: () => void;
  onReject: () => void;
  onUpdateField: (field: keyof DraftEventRecord, value: unknown) => void;
  onAddChecklistItem: (label: string) => void;
}) {
  const isActionable = draft.status === "pending";
  const allChecked = draft.reviewChecklist.every((c) => checkedSet.has(c.id));
  const [newCheckItem, setNewCheckItem] = useState("");
  const [newProduct, setNewProduct] = useState("");

  const isExternalSource =
    draft.source === "Email" || draft.source === "Excel Upload";

  return (
    <div className="bg-muted/20 border-b border-border px-6 py-5 space-y-5">
      {/* External source banner */}
      {isExternalSource && isActionable && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50/70 p-3">
          <Sparkles className="size-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            This draft was generated from{" "}
            <strong>
              {draft.source === "Email"
                ? "AI-parsed email"
                : "Excel bulk upload"}
            </strong>
            . Review and correct all fields before approving.
          </p>
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Event Details (editable for pending) */}
        <div className="space-y-4">
          <h3
            className="text-foreground"
            style={{ fontSize: "0.8125rem", fontWeight: 600 }}
          >
            Event Details
          </h3>

          <Card>
            <CardContent className="p-4 space-y-4">
              {/* Event Name */}
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Event Name
                </Label>
                {isActionable ? (
                  <Input
                    value={draft.name}
                    onChange={(e) => onUpdateField("name", e.target.value)}
                    className="text-sm"
                  />
                ) : (
                  <p className="text-sm text-foreground">{draft.name}</p>
                )}
              </div>

              {/* Date & Times */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <CalendarDays className="size-3" /> Date
                  </Label>
                  {isActionable ? (
                    <Input
                      value={draft.date}
                      onChange={(e) => onUpdateField("date", e.target.value)}
                      className="text-sm"
                      placeholder="e.g. Mar 28, 2026"
                    />
                  ) : (
                    <p className="text-sm text-foreground">{draft.date}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Start</Label>
                  {isActionable ? (
                    <Input
                      value={draft.startTime}
                      onChange={(e) =>
                        onUpdateField("startTime", e.target.value)
                      }
                      className="text-sm"
                      placeholder="6:00 PM"
                    />
                  ) : (
                    <p className="text-sm text-foreground">{draft.startTime}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">End</Label>
                  {isActionable ? (
                    <Input
                      value={draft.endTime}
                      onChange={(e) => onUpdateField("endTime", e.target.value)}
                      className="text-sm"
                      placeholder="9:00 PM"
                    />
                  ) : (
                    <p className="text-sm text-foreground">{draft.endTime}</p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="size-3" /> Location
                </Label>
                {isActionable ? (
                  <Input
                    value={draft.location}
                    onChange={(e) => onUpdateField("location", e.target.value)}
                    className="text-sm"
                  />
                ) : (
                  <p className="text-sm text-foreground">{draft.location}</p>
                )}
              </div>

              {/* Organization */}
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Building2 className="size-3" /> Organization
                </Label>
                {isActionable ? (
                  <Select
                    value={draft.organization}
                    onValueChange={(val) => onUpdateField("organization", val)}
                  >
                    <SelectTrigger className="text-sm cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ORGANIZATIONS.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm text-foreground">
                    {draft.organization}
                  </p>
                )}
              </div>

              {/* Campaign */}
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <ClipboardCheck className="size-3" /> Campaign
                </Label>
                {isActionable ? (
                  <Input
                    value={draft.campaignName}
                    onChange={(e) =>
                      onUpdateField("campaignName", e.target.value)
                    }
                    className="text-sm"
                    placeholder="Link to a campaign..."
                  />
                ) : (
                  <p className="text-sm text-foreground">
                    {draft.campaignName || "—"}
                  </p>
                )}
              </div>

              {/* Venue Type */}
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <User className="size-3" /> Venue Type
                </Label>
                {isActionable ? (
                  <Select
                    value={draft.venueType}
                    onValueChange={(val) => onUpdateField("venueType", val)}
                  >
                    <SelectTrigger className="text-sm cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {VENUE_TYPES.map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm text-foreground">{draft.venueType}</p>
                )}
              </div>

              {/* Products (editable tags) */}
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Package className="size-3" /> Products
                </Label>
                <div className="flex flex-wrap gap-1">
                  {draft.products.map((p) => (
                    <Badge
                      key={p}
                      variant="outline"
                      className="text-xs text-muted-foreground gap-1"
                    >
                      {p}
                      {isActionable && (
                        <button
                          className="ml-0.5 hover:text-red-500 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateField(
                              "products",
                              draft.products.filter((x) => x !== p),
                            );
                          }}
                        >
                          <X className="size-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isActionable && (
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newProduct}
                      onChange={(e) => setNewProduct(e.target.value)}
                      placeholder="Add product..."
                      className="text-xs h-7 flex-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newProduct.trim()) {
                          e.preventDefault();
                          onUpdateField("products", [
                            ...draft.products,
                            newProduct.trim(),
                          ]);
                          setNewProduct("");
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs cursor-pointer"
                      disabled={!newProduct.trim()}
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateField("products", [
                          ...draft.products,
                          newProduct.trim(),
                        ]);
                        setNewProduct("");
                      }}
                    >
                      <Plus className="size-3 mr-1" />
                      Add
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-4 space-y-1">
              <Label className="text-xs text-muted-foreground">
                Description
              </Label>
              {isActionable ? (
                <textarea
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[80px] resize-y"
                  value={draft.description}
                  onChange={(e) => onUpdateField("description", e.target.value)}
                />
              ) : (
                <p className="text-sm text-foreground leading-relaxed">
                  {draft.description}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Source Info (read-only) */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <p className="text-xs text-muted-foreground">Source</p>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={getSourceStyle(draft.source)}
                  style={{ fontSize: "0.6875rem" }}
                >
                  {React.createElement(getSourceIcon(draft.source), {
                    className: "size-3 mr-1",
                  })}
                  {draft.source}
                </Badge>
                <span className="text-sm text-foreground">
                  {draft.submittedBy}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {draft.submittedByEmail} · {draft.submittedAt}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right: Review & Actions */}
        <div className="space-y-4">
          {/* Notes (editable) */}
          <h3
            className="text-foreground"
            style={{ fontSize: "0.8125rem", fontWeight: 600 }}
          >
            Notes
          </h3>
          <Card>
            <CardContent className="p-4">
              {isActionable ? (
                <textarea
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[60px] resize-y"
                  value={draft.notes}
                  onChange={(e) => onUpdateField("notes", e.target.value)}
                  placeholder="Add notes about this draft..."
                />
              ) : (
                <p className="text-sm text-foreground leading-relaxed">
                  {draft.notes || "No notes."}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Missing Fields */}
          {draft.missingFields.length > 0 && (
            <>
              <h3
                className="text-foreground"
                style={{ fontSize: "0.8125rem", fontWeight: 600 }}
              >
                Missing Information
              </h3>
              <Card className="border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="size-4 text-amber-600 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      {draft.missingFields.map((f) => (
                        <p key={f} className="text-sm text-amber-800">
                          {f.charAt(0).toUpperCase() + f.slice(1)} — not yet
                          provided
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Review Checklist */}
          <h3
            className="text-foreground"
            style={{ fontSize: "0.8125rem", fontWeight: 600 }}
          >
            Review Checklist
          </h3>
          <Card>
            <CardContent className="p-4 space-y-3">
              {draft.reviewChecklist.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <Checkbox
                    id={`check-${draft.id}-${item.id}`}
                    checked={checkedSet.has(item.id)}
                    disabled={!isActionable}
                    onCheckedChange={() => onToggleCheck(item.id)}
                  />
                  <label
                    htmlFor={`check-${draft.id}-${item.id}`}
                    className={`text-sm cursor-pointer ${
                      checkedSet.has(item.id)
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </label>
                </div>
              ))}

              {/* Add custom checklist item */}
              {isActionable && (
                <div className="flex gap-2 pt-1">
                  <Input
                    value={newCheckItem}
                    onChange={(e) => setNewCheckItem(e.target.value)}
                    placeholder="Add custom check..."
                    className="text-xs h-7 flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newCheckItem.trim()) {
                        e.preventDefault();
                        onAddChecklistItem(newCheckItem.trim());
                        setNewCheckItem("");
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs cursor-pointer"
                    disabled={!newCheckItem.trim()}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddChecklistItem(newCheckItem.trim());
                      setNewCheckItem("");
                    }}
                  >
                    <Plus className="size-3 mr-1" />
                    Add
                  </Button>
                </div>
              )}

              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  {checkedSet.size} of {draft.reviewChecklist.length} items
                  verified
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {isActionable && (
            <div className="flex items-center gap-3 pt-2">
              <Button
                className="bg-[#7D152D] hover:bg-[#7D152D]/90 cursor-pointer flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onApprove();
                }}
                disabled={!allChecked}
              >
                <CheckCircle2 className="size-4 mr-1.5" />
                Approve → Live
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onReject();
                }}
              >
                <XCircle className="size-4 mr-1.5" />
                Reject
              </Button>
            </div>
          )}
          {isActionable && !allChecked && (
            <p className="text-xs text-muted-foreground">
              Complete all checklist items to enable approval.
            </p>
          )}

          {/* Already actioned */}
          {draft.status === "approved" && (
            <Card className="border-green-200 bg-green-50/50">
              <CardContent className="p-4 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-green-600" />
                <span className="text-sm text-green-700 font-medium">
                  This event has been approved and is now live.
                </span>
              </CardContent>
            </Card>
          )}
          {draft.status === "rejected" && (
            <Card className="border-red-200 bg-red-50/50">
              <CardContent className="p-4 flex items-center gap-2">
                <XCircle className="size-4 text-red-600" />
                <span className="text-sm text-red-700 font-medium">
                  This event has been rejected.
                </span>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  accent: boolean;
}) {
  return (
    <Card className="gap-0">
      <CardContent className="p-4 flex items-center gap-3">
        <div
          className={`flex items-center justify-center size-10 rounded-lg ${
            accent ? "bg-[#7D152D]/10" : "bg-muted"
          }`}
        >
          <Icon
            className={`size-5 ${
              accent ? "text-[#7D152D]" : "text-muted-foreground"
            }`}
          />
        </div>
        <div>
          <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
            {label}
          </p>
          <p
            className={accent ? "text-[#7D152D]" : "text-foreground"}
            style={{ fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.2 }}
          >
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
