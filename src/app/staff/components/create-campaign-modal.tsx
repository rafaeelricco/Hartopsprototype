// =============================================================================
// Create Campaign modal — MM-UI-002 "Create Campaign Flow".
// Single-step dialog using the shared Dialog system (same design standard as
// AddOrganizationWizard). Fields:
//   Section 1 (Identity): Name (required, unique), Description (optional)
//   Section 2 (Context):  Supplier, Distributors, Target Markets,
//                         Channels, Anticipated Event Count, Objectives,
//                         Linked Products
// =============================================================================

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../shared/components/ui/dialog";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import { Textarea } from "@/app/shared/components/ui/textarea";
import { Check, Plus, X, AlertCircle, Loader2 } from "lucide-react";
import { MOCK_PRODUCTS, CHANNEL_OPTIONS } from "./campaign-data";
import { OBJECTIVES } from "./event-data";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CreateCampaignFormData {
  name: string;
  description: string;
  supplier?: string | undefined;
  distributors?: string[] | undefined;
  targetMarkets?: string[] | undefined;
  channels?: string[] | undefined;
  anticipatedEventCount?: number | undefined;
  linkedProductIds?: string[] | undefined;
  objectives?: string[] | undefined;
}

interface CreateCampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateCampaignFormData) => string | null;
  existingNames: string[];
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

interface FormState {
  name: string;
  description: string;
  supplier: string;
  distributors: string[];
  targetMarkets: string[];
  channels: string[];
  anticipatedEventCount: string;
  objectives: string[];
  linkedProductIds: string[];
  productSearch: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  description: "",
  supplier: "",
  distributors: [],
  targetMarkets: [],
  channels: [],
  anticipatedEventCount: "",
  objectives: [],
  linkedProductIds: [],
  productSearch: "",
};

// ---------------------------------------------------------------------------
// Tag-chip input helper
// ---------------------------------------------------------------------------

function TagInput({
  tags,
  onAdd,
  onRemove,
  placeholder,
  id,
}: {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  placeholder: string;
  id: string;
}) {
  const [draft, setDraft] = useState("");

  function commit() {
    const trimmed = draft.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onAdd(trimmed);
    }
    setDraft("");
  }

  return (
    <div>
      <div className="flex gap-2">
        <Input
          id={id}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commit();
            }
          }}
          placeholder={placeholder}
        />
        <Button
          type="button"
          variant="outline"
          onClick={commit}
          disabled={!draft.trim()}
          className="px-3 cursor-pointer"
          aria-label="Add"
        >
          <Plus className="size-4" />
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#7D152D]/5 text-[#7D152D]"
              style={{ fontSize: "0.75rem" }}
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemove(tag)}
                className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                aria-label={`Remove ${tag}`}
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main modal
// ---------------------------------------------------------------------------

export function CreateCampaignModal({
  open,
  onOpenChange,
  onSubmit,
  existingNames,
}: CreateCampaignModalProps) {
  const [form, setForm] = useState<FormState>({ ...INITIAL_STATE });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ---- helpers --------------------------------------------------- */

  const reset = useCallback(() => {
    setForm({ ...INITIAL_STATE });
    setErrors({});
    setSubmitting(false);
    setSubmitted(false);
  }, []);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) reset();
      onOpenChange(nextOpen);
    },
    [onOpenChange, reset],
  );

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  /* ---- filtered products ---------------------------------------- */

  const filteredProducts = MOCK_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(form.productSearch.toLowerCase()),
  );

  /* ---- validation ------------------------------------------------ */

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    const trimmedName = form.name.trim();
    if (!trimmedName) {
      errs["name"] = "Campaign name is required.";
    } else if (existingNames.includes(trimmedName.toLowerCase())) {
      errs["name"] = "Name already in use.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ---- blur validation for Name --------------------------------- */

  const handleNameBlur = () => {
    const trimmed = form.name.trim();
    if (!trimmed) return;
    if (existingNames.includes(trimmed.toLowerCase())) {
      setErrors((prev) => ({
        ...prev,
        name: "Name already in use.",
      }));
    }
  };

  /* ---- toggle helpers ------------------------------------------- */

  function toggleObjective(id: string) {
    setForm((prev) => ({
      ...prev,
      objectives: prev.objectives.includes(id)
        ? prev.objectives.filter((o) => o !== id)
        : [...prev.objectives, id],
    }));
  }

  function toggleChannel(value: string) {
    setForm((prev) => ({
      ...prev,
      channels: prev.channels.includes(value)
        ? prev.channels.filter((c) => c !== value)
        : [...prev.channels, value],
    }));
  }

  function toggleProduct(id: string) {
    setForm((prev) => ({
      ...prev,
      linkedProductIds: prev.linkedProductIds.includes(id)
        ? prev.linkedProductIds.filter((p) => p !== id)
        : [...prev.linkedProductIds, id],
    }));
  }

  /* ---- submit --------------------------------------------------- */

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      const serverError = onSubmit({
        name: form.name.trim(),
        description: form.description.trim(),
        supplier: form.supplier.trim() || undefined,
        distributors: form.distributors.length ? form.distributors : undefined,
        targetMarkets: form.targetMarkets.length
          ? form.targetMarkets
          : undefined,
        channels: form.channels.length ? form.channels : undefined,
        anticipatedEventCount: form.anticipatedEventCount
          ? parseInt(form.anticipatedEventCount, 10)
          : undefined,
        objectives: form.objectives.length ? form.objectives : undefined,
        linkedProductIds: form.linkedProductIds.length
          ? form.linkedProductIds
          : undefined,
      });
      if (serverError) {
        setErrors({ name: serverError });
        setSubmitting(false);
      } else {
        setSubmitted(true);
        setSubmitting(false);
      }
    }, 300);
  };

  /* ---- render helpers -------------------------------------------- */

  const FieldError = ({ field }: { field: string }) =>
    errors[field] ? (
      <p
        className="flex items-center gap-1 text-destructive mt-1"
        style={{ fontSize: "0.75rem" }}
      >
        <AlertCircle className="size-3 shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  /* ---- success state --------------------------------------------- */

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[480px] shadow-none border border-border">
          <div className="flex flex-col items-center py-6 gap-4 text-center">
            <div className="flex items-center justify-center size-12 rounded-full bg-green-50 border border-green-200">
              <Check className="size-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-foreground">Campaign Created</h3>
              <p
                className="text-muted-foreground mt-1"
                style={{ fontSize: "0.875rem" }}
              >
                <span className="text-foreground" style={{ fontWeight: 500 }}>
                  {form.name}
                </span>{" "}
                has been created successfully.
              </p>
            </div>
            <Button
              className="bg-[#7D152D] hover:bg-[#7D152D]/90 cursor-pointer mt-2"
              onClick={() => handleOpenChange(false)}
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  /* ================================================================ */
  /* MAIN RENDER                                                       */
  /* ================================================================ */

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[560px] shadow-none border border-border gap-0 p-0 max-h-[85vh] flex flex-col">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Create Campaign</DialogTitle>
          <DialogDescription style={{ fontSize: "0.8125rem" }}>
            Set up a new campaign with identity and context details.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="px-6 pb-6 space-y-4 overflow-y-auto flex-1">
          {/* ━━━ Section 1: Identity ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

          {/* Name */}
          <div className="space-y-1.5">
            <label
              className="block text-foreground"
              style={{ fontSize: "0.8125rem" }}
            >
              Name <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              onBlur={handleNameBlur}
              placeholder="e.g. Summer Seltzer Launch"
              aria-invalid={!!errors["name"]}
              maxLength={120}
            />
            <FieldError field="name" />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label
              className="block text-foreground"
              style={{ fontSize: "0.8125rem" }}
            >
              Description
            </label>
            <Textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Briefly describe the campaign objectives…"
              rows={3}
              className="resize-none"
              maxLength={500}
            />
          </div>

          {/* ━━━ Section 2: Campaign Context ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="pt-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px bg-border" />
              <span
                className="text-muted-foreground flex-shrink-0"
                style={{ fontSize: "0.75rem" }}
              >
                Campaign Context
                <span className="ml-1 text-muted-foreground/60">
                  (optional)
                </span>
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="space-y-4">
              {/* Supplier */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Supplier
                </label>
                <Input
                  type="text"
                  value={form.supplier}
                  onChange={(e) => updateField("supplier", e.target.value)}
                  placeholder="e.g. Beam Suntory"
                  maxLength={100}
                />
              </div>

              {/* Distributors */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Distributors
                </label>
                <TagInput
                  id="campaign-distributors"
                  tags={form.distributors}
                  onAdd={(t) =>
                    updateField("distributors", [...form.distributors, t])
                  }
                  onRemove={(t) =>
                    updateField(
                      "distributors",
                      form.distributors.filter((d) => d !== t),
                    )
                  }
                  placeholder="Type a distributor name and press Enter"
                />
              </div>

              {/* Target Markets */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Target Markets / Geography
                </label>
                <TagInput
                  id="campaign-markets"
                  tags={form.targetMarkets}
                  onAdd={(t) =>
                    updateField("targetMarkets", [...form.targetMarkets, t])
                  }
                  onRemove={(t) =>
                    updateField(
                      "targetMarkets",
                      form.targetMarkets.filter((m) => m !== t),
                    )
                  }
                  placeholder="Type a city or region and press Enter"
                />
              </div>

              {/* Channels */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Channels
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CHANNEL_OPTIONS.map((ch) => {
                    const active = form.channels.includes(ch.value);
                    return (
                      <button
                        key={ch.value}
                        type="button"
                        onClick={() => toggleChannel(ch.value)}
                        className={`px-3 py-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                          active
                            ? "bg-[#7D152D] border-[#7D152D] text-white"
                            : "bg-card border-border text-muted-foreground hover:border-[#7D152D]/40"
                        }`}
                        style={{ fontSize: "0.8125rem" }}
                      >
                        <span style={{ fontWeight: 500 }}>{ch.label}</span>
                        <br />
                        <span
                          style={{
                            fontSize: "0.75rem",
                            opacity: active ? 0.8 : 0.7,
                          }}
                        >
                          {ch.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {form.channels.length > 0 && (
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {form.channels.length} channel
                    {form.channels.length !== 1 ? "s" : ""} selected
                  </p>
                )}
              </div>

              {/* Anticipated Event Count */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Anticipated Event Count
                </label>
                <Input
                  type="number"
                  min={1}
                  value={form.anticipatedEventCount}
                  onChange={(e) =>
                    updateField("anticipatedEventCount", e.target.value)
                  }
                  placeholder="e.g. 12"
                  className="max-w-[140px]"
                />
              </div>

              {/* Objectives */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Campaign Objectives
                </label>
                <div className="flex flex-wrap gap-2">
                  {OBJECTIVES.map((obj) => {
                    const active = form.objectives.includes(obj.id);
                    return (
                      <button
                        key={obj.id}
                        type="button"
                        onClick={() => toggleObjective(obj.id)}
                        className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                          active
                            ? "bg-[#7D152D] border-[#7D152D] text-white"
                            : "bg-card border-border text-muted-foreground hover:border-[#7D152D]/40"
                        }`}
                        style={{ fontSize: "0.8125rem" }}
                      >
                        {obj.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Linked Products */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Linked Products{" "}
                  <span className="text-muted-foreground">(from item master)</span>
                </label>
                <Input
                  type="text"
                  value={form.productSearch}
                  onChange={(e) => updateField("productSearch", e.target.value)}
                  placeholder="Filter products…"
                />
                <div className="rounded-lg border border-border overflow-hidden">
                  {filteredProducts.length === 0 ? (
                    <p
                      className="px-4 py-3 text-center text-muted-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      No products match
                    </p>
                  ) : (
                    filteredProducts.map((product, i) => {
                      const checked = form.linkedProductIds.includes(
                        product.id,
                      );
                      return (
                        <label
                          key={product.id}
                          className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors hover:bg-muted/50 ${
                            i < filteredProducts.length - 1
                              ? "border-b border-border"
                              : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleProduct(product.id)}
                            className="w-4 h-4 rounded border-border cursor-pointer accent-[#7D152D]"
                          />
                          <span
                            className={
                              checked
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }
                            style={{ fontSize: "0.875rem" }}
                          >
                            {product.name}
                          </span>
                        </label>
                      );
                    })
                  )}
                </div>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "0.75rem" }}
                >
                  {form.linkedProductIds.length} product
                  {form.linkedProductIds.length !== 1 ? "s" : ""} selected
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 border-t border-border flex-row justify-between sm:justify-between">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            className="bg-[#7D152D] hover:bg-[#7D152D]/90 cursor-pointer"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting && <Loader2 className="size-4 mr-1 animate-spin" />}
            {submitting ? "Creating…" : "Create Campaign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
