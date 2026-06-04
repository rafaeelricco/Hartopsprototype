// =============================================================================
// Billing Code Management (brief 2026-06-02 §2)
// =============================================================================
// HEMS is the source of truth for billing codes. Create / edit / ad-hoc add
// here; codes feed the campaign-driven dropdown at activity setup and drive
// the Events Ready to Bill checklist. Codes are not deleted — toggle inactive
// instead so historical activities stay readable.
// =============================================================================

import { useState } from "react";
import {
  Plus,
  Pencil,
  ListChecks,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/app/shared/components/ui/card";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import { Label } from "@/app/shared/components/ui/label";
import { Checkbox } from "@/app/shared/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/shared/components/ui/dialog";
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
import { toast } from "sonner";
import {
  BILLING_CHECKLIST_LABELS,
  type BillingChecklistItem,
  type BillingCodeDefinition,
} from "@/app/shared/data/billing-types";
import {
  MOCK_BILLING_CODES,
  upsertBillingCode,
  setBillingCodeActive,
} from "./billing-data";
import { INITIAL_CAMPAIGNS } from "@/app/staff/components/campaign-data";

const ALL_CHECKLIST_ITEMS: BillingChecklistItem[] = [
  "recap",
  "photos",
  "bar-spend",
  "travel",
  "supplier-approval",
];

interface Draft {
  code: string;
  description: string;
  campaignId: string;
  requiredFields: Set<BillingChecklistItem>;
  active: boolean;
}

function emptyDraft(): Draft {
  return {
    code: "",
    description: "",
    campaignId: "",
    requiredFields: new Set(["recap", "photos"]),
    active: true,
  };
}

function draftFromCode(c: BillingCodeDefinition): Draft {
  return {
    code: c.code,
    description: c.description ?? "",
    campaignId: c.campaignId ?? "",
    requiredFields: new Set(c.requiredFields),
    active: c.active,
  };
}

export function BillingCodesPage() {
  const [codes, setCodes] = useState<BillingCodeDefinition[]>([
    ...MOCK_BILLING_CODES,
  ]);
  const [editingOriginal, setEditingOriginal] = useState<
    BillingCodeDefinition | "new" | null
  >(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);

  function refresh() {
    setCodes([...MOCK_BILLING_CODES]);
  }

  function openAdd() {
    setEditingOriginal("new");
    setDraft(emptyDraft());
  }

  function openEdit(c: BillingCodeDefinition) {
    setEditingOriginal(c);
    setDraft(draftFromCode(c));
  }

  function close() {
    setEditingOriginal(null);
  }

  function handleSave() {
    if (!draft.code.trim()) {
      toast.error("Code is required");
      return;
    }
    const isNew = editingOriginal === "new";
    const existing = isNew
      ? undefined
      : (editingOriginal as BillingCodeDefinition);

    // Prevent silent collision when creating a new code that re-uses an
    // existing key. (Edit is allowed to keep the same key.)
    if (isNew && MOCK_BILLING_CODES.some((c) => c.code === draft.code.trim())) {
      toast.error(`Code "${draft.code}" already exists`);
      return;
    }

    const def: BillingCodeDefinition = {
      code: draft.code.trim(),
      ...(draft.description.trim()
        ? { description: draft.description.trim() }
        : {}),
      ...(draft.campaignId ? { campaignId: draft.campaignId } : {}),
      requiredFields: Array.from(draft.requiredFields),
      active: draft.active,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
      createdBy: existing?.createdBy ?? "Ivie (Controller)",
    };
    upsertBillingCode(def);
    refresh();
    close();
    toast.success(isNew ? `Created ${def.code}` : `Updated ${def.code}`);
  }

  function toggleActive(c: BillingCodeDefinition) {
    setBillingCodeActive(c.code, !c.active);
    refresh();
    toast.success(
      `${c.code} ${!c.active ? "re-activated" : "deactivated"}. Historical activities preserved.`,
    );
  }

  function toggleRequired(item: BillingChecklistItem) {
    const next = new Set(draft.requiredFields);
    if (next.has(item)) next.delete(item);
    else next.add(item);
    setDraft({ ...draft, requiredFields: next });
  }

  return (
    <div className="p-6 space-y-5 font-[Inter] min-w-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1
            className="flex items-center gap-2"
            style={{ fontSize: "1.5rem", color: "#0F172A" }}
          >
            <ListChecks size={22} style={{ color: "#7D152D" }} />
            Billing codes
          </h1>
          <p
            className="mt-1"
            style={{ fontSize: "0.875rem", color: "#64748B" }}
          >
            HEMS is the source of truth. Codes are created and edited here,
            then auto-populate the dropdown on activity setup and drive the
            Events Ready to Bill checklist.
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus size={14} className="mr-1.5" />
          Add code
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Required fields</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {codes.map((c) => {
                const campaign = INITIAL_CAMPAIGNS.find(
                  (cmp) => cmp.id === c.campaignId,
                );
                return (
                  <TableRow key={c.code}>
                    <TableCell
                      style={{
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, monospace",
                        fontWeight: 600,
                      }}
                    >
                      {c.code}
                    </TableCell>
                    <TableCell
                      className="max-w-[280px] truncate"
                      title={c.description ?? ""}
                    >
                      {c.description ?? "—"}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "0.8125rem", color: "#475569" }}
                    >
                      {campaign?.name ?? "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {c.requiredFields.map((f) => (
                          <span
                            key={f}
                            className="px-1.5 py-0 rounded"
                            style={{
                              fontSize: "0.6875rem",
                              background: "#F1F5F9",
                              color: "#475569",
                            }}
                          >
                            {BILLING_CHECKLIST_LABELS[f]}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => toggleActive(c)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md cursor-pointer"
                        style={{
                          fontSize: "0.75rem",
                          background: c.active ? "#ECFDF5" : "#FEF2F2",
                          color: c.active ? "#0F766E" : "#B91C1C",
                          border: "1px solid",
                          borderColor: c.active ? "#A7F3D0" : "#FCA5A5",
                        }}
                        title={
                          c.active
                            ? "Deactivate (historical activities preserved)"
                            : "Re-activate"
                        }
                      >
                        {c.active ? (
                          <CheckCircle2 size={11} />
                        ) : (
                          <XCircle size={11} />
                        )}
                        {c.active ? "Active" : "Inactive"}
                      </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openEdit(c)}
                      >
                        <Pencil size={13} className="mr-1.5" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {codes.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center"
                    style={{ color: "#94A3B8" }}
                  >
                    No billing codes yet. Click <strong>Add code</strong> to
                    create the first one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={editingOriginal !== null}
        onOpenChange={(v) => (v ? null : close())}
      >
        <DialogContent className="!max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingOriginal === "new" ? "Add billing code" : "Edit billing code"}
            </DialogTitle>
            <DialogDescription>
              Codes feed the dropdown at activity setup. Required fields drive
              the Events Ready to Bill checklist.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="bc-code">Code</Label>
              <Input
                id="bc-code"
                value={draft.code}
                onChange={(e) => setDraft({ ...draft, code: e.target.value })}
                placeholder="e.g. SLT-LAUNCH-ON"
                disabled={editingOriginal !== "new"}
                style={{
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, monospace",
                }}
              />
              {editingOriginal !== "new" && (
                <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
                  Code key is immutable — deactivate and create a new one if
                  the key needs to change.
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bc-desc">Description</Label>
              <Input
                id="bc-desc"
                value={draft.description}
                onChange={(e) =>
                  setDraft({ ...draft, description: e.target.value })
                }
                placeholder="e.g. Summer Seltzer Launch · On-premise"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bc-campaign">Campaign (optional)</Label>
              <Select
                value={draft.campaignId === "" ? "__none__" : draft.campaignId}
                onValueChange={(v) =>
                  setDraft({ ...draft, campaignId: v === "__none__" ? "" : v })
                }
              >
                <SelectTrigger id="bc-campaign">
                  <SelectValue placeholder="No campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">— No campaign —</SelectItem>
                  {INITIAL_CAMPAIGNS.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Required fields</Label>
              <div
                className="rounded-md border p-2 space-y-1"
                style={{ borderColor: "#E2E8F0" }}
              >
                {ALL_CHECKLIST_ITEMS.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-[#F8FAFC]"
                  >
                    <Checkbox
                      checked={draft.requiredFields.has(item)}
                      onCheckedChange={() => toggleRequired(item)}
                    />
                    <span style={{ fontSize: "0.8125rem" }}>
                      {BILLING_CHECKLIST_LABELS[item]}
                    </span>
                  </label>
                ))}
              </div>
              <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
                These items must be ticked on each activity before the invoice
                can be sent.
              </p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={draft.active}
                onCheckedChange={(v) =>
                  setDraft({ ...draft, active: v === true })
                }
              />
              <span style={{ fontSize: "0.8125rem" }}>Active</span>
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
