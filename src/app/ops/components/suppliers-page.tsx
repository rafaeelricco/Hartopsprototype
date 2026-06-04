// =============================================================================
// Supplier Contacts (brief 2026-06-02 §2)
// =============================================================================
// Per-supplier delivery recipient + CC template. Persisted so it survives
// staff changes. Used when sending invoices, SLA reports, and receipt
// bundles via Power Automate / SharePoint / email.
// =============================================================================

import { useState } from "react";
import { Plus, Pencil, Truck, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/app/shared/components/ui/card";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import { Label } from "@/app/shared/components/ui/label";
import { Textarea } from "@/app/shared/components/ui/textarea";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/shared/components/ui/table";
import { toast } from "sonner";
import type {
  SupplierContact,
  SupplierRecipient,
} from "@/app/shared/data/billing-types";
import {
  MOCK_SUPPLIERS,
  upsertSupplier,
  setSupplierActive,
} from "./billing-data";

interface Draft {
  id: string;
  supplierName: string;
  primaryName: string;
  primaryEmail: string;
  primaryRole: string;
  ccRecipients: SupplierRecipient[];
  notes: string;
  active: boolean;
  createdAt: string;
}

function newDraft(): Draft {
  return {
    id: `sup-${Date.now()}`,
    supplierName: "",
    primaryName: "",
    primaryEmail: "",
    primaryRole: "",
    ccRecipients: [],
    notes: "",
    active: true,
    createdAt: new Date().toISOString(),
  };
}

function draftFromSupplier(s: SupplierContact): Draft {
  return {
    id: s.id,
    supplierName: s.supplierName,
    primaryName: s.primaryRecipient.name,
    primaryEmail: s.primaryRecipient.email,
    primaryRole: s.primaryRecipient.role ?? "",
    ccRecipients: s.ccRecipients.map((r) => ({ ...r })),
    notes: s.notes ?? "",
    active: s.active,
    createdAt: s.createdAt,
  };
}

export function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<SupplierContact[]>([
    ...MOCK_SUPPLIERS,
  ]);
  const [editing, setEditing] = useState<"new" | SupplierContact | null>(null);
  const [draft, setDraft] = useState<Draft>(newDraft);

  function refresh() {
    setSuppliers([...MOCK_SUPPLIERS]);
  }

  function openAdd() {
    setEditing("new");
    setDraft(newDraft());
  }

  function openEdit(s: SupplierContact) {
    setEditing(s);
    setDraft(draftFromSupplier(s));
  }

  function close() {
    setEditing(null);
  }

  function handleSave() {
    if (!draft.supplierName.trim()) {
      toast.error("Supplier name is required");
      return;
    }
    if (!draft.primaryEmail.trim()) {
      toast.error("Primary recipient email is required");
      return;
    }
    const next: SupplierContact = {
      id: draft.id,
      supplierName: draft.supplierName.trim(),
      primaryRecipient: {
        name: draft.primaryName.trim(),
        email: draft.primaryEmail.trim(),
        ...(draft.primaryRole.trim() ? { role: draft.primaryRole.trim() } : {}),
      },
      ccRecipients: draft.ccRecipients
        .filter((r) => r.email.trim())
        .map((r) => ({ name: r.name.trim(), email: r.email.trim() })),
      ...(draft.notes.trim() ? { notes: draft.notes.trim() } : {}),
      active: draft.active,
      createdAt: draft.createdAt,
    };
    upsertSupplier(next);
    refresh();
    close();
    toast.success(
      editing === "new"
        ? `Added ${next.supplierName}`
        : `Updated ${next.supplierName}`,
    );
  }

  function toggleActive(s: SupplierContact) {
    setSupplierActive(s.id, !s.active);
    refresh();
  }

  function addCcRow() {
    setDraft({
      ...draft,
      ccRecipients: [...draft.ccRecipients, { name: "", email: "" }],
    });
  }

  function updateCc(idx: number, patch: Partial<SupplierRecipient>) {
    setDraft({
      ...draft,
      ccRecipients: draft.ccRecipients.map((r, i) =>
        i === idx ? { ...r, ...patch } : r,
      ),
    });
  }

  function removeCc(idx: number) {
    setDraft({
      ...draft,
      ccRecipients: draft.ccRecipients.filter((_, i) => i !== idx),
    });
  }

  return (
    <div className="p-6 space-y-5 font-[Inter] min-w-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1
            className="flex items-center gap-2"
            style={{ fontSize: "1.5rem", color: "#0F172A" }}
          >
            <Truck size={22} style={{ color: "#7D152D" }} />
            Suppliers
          </h1>
          <p
            className="mt-1"
            style={{ fontSize: "0.875rem", color: "#64748B" }}
          >
            Delivery recipient + CC template per supplier. Persisted so it
            survives staff changes; used when sending invoices, SLA reports,
            and receipt bundles via Power Automate / SharePoint / email.
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus size={14} className="mr-1.5" />
          Add supplier
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Primary recipient</TableHead>
                <TableHead>CC</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((s) => (
                <TableRow key={s.id}>
                  <TableCell style={{ fontWeight: 600 }}>
                    {s.supplierName}
                  </TableCell>
                  <TableCell>
                    <div style={{ fontSize: "0.8125rem" }}>
                      {s.primaryRecipient.name}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
                      {s.primaryRecipient.email}
                    </div>
                    {s.primaryRecipient.role && (
                      <div
                        style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
                      >
                        {s.primaryRecipient.role}
                      </div>
                    )}
                  </TableCell>
                  <TableCell style={{ fontSize: "0.75rem", color: "#475569" }}>
                    {s.ccRecipients.length === 0 ? (
                      <span style={{ color: "#94A3B8" }}>—</span>
                    ) : (
                      <div className="flex flex-col gap-0.5">
                        {s.ccRecipients.map((r, i) => (
                          <span key={i} title={r.name}>
                            {r.email}
                          </span>
                        ))}
                      </div>
                    )}
                  </TableCell>
                  <TableCell
                    className="max-w-[260px] truncate"
                    title={s.notes ?? ""}
                    style={{ fontSize: "0.75rem", color: "#64748B" }}
                  >
                    {s.notes ?? "—"}
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      onClick={() => toggleActive(s)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md cursor-pointer"
                      style={{
                        fontSize: "0.75rem",
                        background: s.active ? "#ECFDF5" : "#FEF2F2",
                        color: s.active ? "#0F766E" : "#B91C1C",
                        border: "1px solid",
                        borderColor: s.active ? "#A7F3D0" : "#FCA5A5",
                      }}
                    >
                      {s.active ? (
                        <CheckCircle2 size={11} />
                      ) : (
                        <XCircle size={11} />
                      )}
                      {s.active ? "Active" : "Inactive"}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEdit(s)}
                    >
                      <Pencil size={13} className="mr-1.5" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {suppliers.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center"
                    style={{ color: "#94A3B8" }}
                  >
                    No suppliers yet. Click <strong>Add supplier</strong> to
                    create the first one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={editing !== null} onOpenChange={(v) => (v ? null : close())}>
        <DialogContent className="!max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing === "new" ? "Add supplier" : "Edit supplier"}
            </DialogTitle>
            <DialogDescription>
              Delivery recipient + CC list. Persisted across staff changes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="sup-name">Supplier name</Label>
              <Input
                id="sup-name"
                value={draft.supplierName}
                onChange={(e) =>
                  setDraft({ ...draft, supplierName: e.target.value })
                }
                placeholder="e.g. Pernod Ricard"
              />
            </div>
            <div
              className="rounded-md border p-3 space-y-2"
              style={{ borderColor: "#E2E8F0" }}
            >
              <div
                style={{
                  fontSize: "0.6875rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "#94A3B8",
                }}
              >
                Primary recipient
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="sup-pname">Name</Label>
                  <Input
                    id="sup-pname"
                    value={draft.primaryName}
                    onChange={(e) =>
                      setDraft({ ...draft, primaryName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sup-pemail">Email</Label>
                  <Input
                    id="sup-pemail"
                    type="email"
                    value={draft.primaryEmail}
                    onChange={(e) =>
                      setDraft({ ...draft, primaryEmail: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sup-prole">Role (optional)</Label>
                <Input
                  id="sup-prole"
                  value={draft.primaryRole}
                  onChange={(e) =>
                    setDraft({ ...draft, primaryRole: e.target.value })
                  }
                  placeholder="e.g. Brand Activations Manager"
                />
              </div>
            </div>
            <div
              className="rounded-md border p-3 space-y-2"
              style={{ borderColor: "#E2E8F0" }}
            >
              <div className="flex items-center justify-between">
                <div
                  style={{
                    fontSize: "0.6875rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#94A3B8",
                  }}
                >
                  CC recipients
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addCcRow}
                >
                  <Plus size={12} className="mr-1" />
                  Add CC
                </Button>
              </div>
              {draft.ccRecipients.length === 0 ? (
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#94A3B8",
                  }}
                >
                  No CCs.
                </p>
              ) : (
                draft.ccRecipients.map((cc, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input
                      placeholder="Name"
                      value={cc.name}
                      onChange={(e) =>
                        updateCc(idx, { name: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      value={cc.email}
                      onChange={(e) =>
                        updateCc(idx, { email: e.target.value })
                      }
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => removeCc(idx)}
                      style={{ color: "#B91C1C" }}
                    >
                      <Trash2 size={13} />
                    </Button>
                  </div>
                ))
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sup-notes">Notes (optional)</Label>
              <Textarea
                id="sup-notes"
                value={draft.notes}
                onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                placeholder="Delivery cadence, approver quirks, etc."
                rows={2}
              />
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
