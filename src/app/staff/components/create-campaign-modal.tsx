// =============================================================================
// Create Campaign modal — MM-UI-002 "Create Campaign Flow".
// Fields:
//   Section 1 (Identity): Name (required, unique), Description (optional)
//   Section 2 (Context):  Supplier, Distributors, Target Markets,
//                         Anticipated Event Count, Objectives, Linked Products
// =============================================================================

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Loader2, Plus } from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import { Textarea } from "@/app/shared/components/ui/textarea";
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
  onClose: () => void;
  onSubmit: (data: CreateCampaignFormData) => string | null;
  existingNames: string[];
}

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
          className="flex-1 px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 h-auto shadow-none"
          style={{ fontSize: "0.875rem", background: "#F8FAFC" }}
        />
        <Button
          type="button"
          variant="ghost"
          onClick={commit}
          disabled={!draft.trim()}
          className="px-3 h-9 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9] disabled:opacity-40 cursor-pointer"
          aria-label="Add"
        >
          <Plus size={15} />
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full"
              style={{
                fontSize: "0.75rem",
                background: "#7D152D0A",
                color: "#7D152D",
              }}
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
  onClose,
  onSubmit,
  existingNames,
}: CreateCampaignModalProps) {
  // Section 1
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Section 2
  const [supplier, setSupplier] = useState("");
  const [distributors, setDistributors] = useState<string[]>([]);
  const [targetMarkets, setTargetMarkets] = useState<string[]>([]);
  const [anticipatedEventCount, setAnticipatedEventCount] = useState<
    string | ""
  >("");
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [productSearch, setProductSearch] = useState("");

  const filteredProducts = MOCK_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()),
  );

  // Reset all state when modal opens
  useEffect(() => {
    if (open) {
      setName("");
      setDescription("");
      setNameError(null);
      setSubmitting(false);
      setSupplier("");
      setDistributors([]);
      setTargetMarkets([]);
      setAnticipatedEventCount("");
      setSelectedObjectives([]);
      setSelectedChannels([]);
      setSelectedProducts([]);
      setProductSearch("");
      setTimeout(() => nameRef.current?.focus(), 100);
    }
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [open]);

  function validateName(value: string): string | null {
    const trimmed = value.trim();
    if (!trimmed) return "Campaign name is required.";
    if (existingNames.includes(trimmed.toLowerCase()))
      return "Name already in use.";
    return null;
  }

  const handleNameChange = useCallback(
    (value: string) => {
      setName(value);
      if (nameError) setNameError(null);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const trimmed = value.trim();
        if (trimmed && existingNames.includes(trimmed.toLowerCase())) {
          setNameError("Name already in use.");
        }
      }, 300);
    },
    [existingNames, nameError],
  );

  function handleNameBlur() {
    if (name.trim()) setNameError(validateName(name));
  }

  function toggleObjective(id: string) {
    setSelectedObjectives((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id],
    );
  }

  function toggleChannel(value: string) {
    setSelectedChannels((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value],
    );
  }

  function toggleProduct(id: string) {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const error = validateName(name);
    if (error) {
      setNameError(error);
      nameRef.current?.focus();
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const serverError = onSubmit({
        name: name.trim(),
        description: description.trim(),
        supplier: supplier.trim() || undefined,
        distributors: distributors.length ? distributors : undefined,
        targetMarkets: targetMarkets.length ? targetMarkets : undefined,
        channels: selectedChannels.length ? selectedChannels : undefined,
        anticipatedEventCount: anticipatedEventCount
          ? parseInt(anticipatedEventCount, 10)
          : undefined,
        objectives: selectedObjectives.length ? selectedObjectives : undefined,
        linkedProductIds: selectedProducts.length
          ? selectedProducts
          : undefined,
      });
      if (serverError) {
        setNameError(serverError);
        setSubmitting(false);
      }
    }, 300);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-xl mx-4 bg-white rounded-xl shadow-xl flex flex-col"
        style={{
          animation: "fadeUp 0.2s ease-out",
          maxHeight: "85vh",
        }}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] flex-shrink-0">
          <h2 style={{ fontSize: "1.125rem", color: "#0F172A" }}>
            Create Campaign
          </h2>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </Button>
        </div>

        {/* ── Scrollable body ─────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
            {/* ━━━ Section 1: Identity ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

            {/* Name */}
            <div>
              <label
                htmlFor="campaign-name"
                style={{ fontSize: "0.875rem", color: "#0F172A" }}
                className="block mb-1.5"
              >
                Name <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <Input
                ref={nameRef}
                id="campaign-name"
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                onBlur={handleNameBlur}
                placeholder="e.g. Summer Seltzer Launch"
                className={`w-full px-3.5 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 h-auto shadow-none ${
                  nameError
                    ? "border-[#EF4444] focus:ring-[#EF4444]/30"
                    : "border-[#E2E8F0] focus:ring-[#7D152D]/30"
                }`}
                style={{ fontSize: "0.9375rem", background: "#F8FAFC" }}
                maxLength={120}
              />
              {nameError && (
                <p
                  className="mt-1.5"
                  style={{ fontSize: "0.8125rem", color: "#EF4444" }}
                >
                  {nameError}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="campaign-description"
                style={{ fontSize: "0.875rem", color: "#0F172A" }}
                className="block mb-1.5"
              >
                Description
              </label>
              <Textarea
                id="campaign-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe the campaign objectives…"
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 resize-none shadow-none"
                style={{ fontSize: "0.9375rem", background: "#F8FAFC" }}
                maxLength={500}
              />
            </div>

            {/* ━━━ Section 2: Campaign Context ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <div className="pt-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-px bg-[#E2E8F0]" />
                <span
                  style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                  className="flex-shrink-0"
                >
                  Campaign Context
                  <span className="ml-1" style={{ color: "#CBD5E1" }}>
                    (optional)
                  </span>
                </span>
                <div className="flex-1 h-px bg-[#E2E8F0]" />
              </div>

              <div className="space-y-5">
                {/* Supplier */}
                <div>
                  <label
                    htmlFor="campaign-supplier"
                    style={{ fontSize: "0.875rem", color: "#0F172A" }}
                    className="block mb-1.5"
                  >
                    Supplier
                  </label>
                  <Input
                    id="campaign-supplier"
                    type="text"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    placeholder="e.g. Beam Suntory"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 h-auto shadow-none"
                    style={{ fontSize: "0.875rem", background: "#F8FAFC" }}
                    maxLength={100}
                  />
                </div>

                {/* Distributors */}
                <div>
                  <label
                    htmlFor="campaign-distributors"
                    style={{ fontSize: "0.875rem", color: "#0F172A" }}
                    className="block mb-1.5"
                  >
                    Distributors
                  </label>
                  <TagInput
                    id="campaign-distributors"
                    tags={distributors}
                    onAdd={(t) => setDistributors((p) => [...p, t])}
                    onRemove={(t) =>
                      setDistributors((p) => p.filter((d) => d !== t))
                    }
                    placeholder="Type a distributor name and press Enter"
                  />
                </div>

                {/* Target Markets */}
                <div>
                  <label
                    htmlFor="campaign-markets"
                    style={{ fontSize: "0.875rem", color: "#0F172A" }}
                    className="block mb-1.5"
                  >
                    Target Markets / Geography
                  </label>
                  <TagInput
                    id="campaign-markets"
                    tags={targetMarkets}
                    onAdd={(t) => setTargetMarkets((p) => [...p, t])}
                    onRemove={(t) =>
                      setTargetMarkets((p) => p.filter((m) => m !== t))
                    }
                    placeholder="Type a city or region and press Enter"
                  />
                </div>

                {/* Channels */}
                <div>
                  <p
                    style={{ fontSize: "0.875rem", color: "#0F172A" }}
                    className="mb-2"
                  >
                    Channels
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CHANNEL_OPTIONS.map((ch) => {
                      const active = selectedChannels.includes(ch.value);
                      return (
                        <button
                          key={ch.value}
                          type="button"
                          onClick={() => toggleChannel(ch.value)}
                          className="px-3 py-2.5 rounded-lg border text-left transition-colors cursor-pointer"
                          style={
                            active
                              ? {
                                  background: "#7D152D",
                                  borderColor: "#7D152D",
                                  color: "#fff",
                                  fontSize: "0.8125rem",
                                }
                              : {
                                  background: "#F8FAFC",
                                  borderColor: "#E2E8F0",
                                  color: "#64748B",
                                  fontSize: "0.8125rem",
                                }
                          }
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
                  {selectedChannels.length > 0 && (
                    <p
                      className="mt-1.5"
                      style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                    >
                      {selectedChannels.length} channel
                      {selectedChannels.length !== 1 ? "s" : ""} selected
                    </p>
                  )}
                </div>

                {/* Anticipated Event Count */}
                <div>
                  <label
                    htmlFor="campaign-event-count"
                    style={{ fontSize: "0.875rem", color: "#0F172A" }}
                    className="block mb-1.5"
                  >
                    Anticipated Event Count
                  </label>
                  <Input
                    id="campaign-event-count"
                    type="number"
                    min={1}
                    value={anticipatedEventCount}
                    onChange={(e) => setAnticipatedEventCount(e.target.value)}
                    placeholder="e.g. 12"
                    className="w-full max-w-[140px] px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 h-auto shadow-none"
                    style={{ fontSize: "0.875rem", background: "#F8FAFC" }}
                  />
                </div>

                {/* Objectives */}
                <div>
                  <p
                    style={{ fontSize: "0.875rem", color: "#0F172A" }}
                    className="mb-2"
                  >
                    Campaign Objectives
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {OBJECTIVES.map((obj) => {
                      const active = selectedObjectives.includes(obj.id);
                      return (
                        <button
                          key={obj.id}
                          type="button"
                          onClick={() => toggleObjective(obj.id)}
                          className="px-3 py-1.5 rounded-lg border transition-colors cursor-pointer"
                          style={
                            active
                              ? {
                                  background: "#7D152D",
                                  borderColor: "#7D152D",
                                  color: "#fff",
                                  fontSize: "0.8125rem",
                                }
                              : {
                                  background: "#F8FAFC",
                                  borderColor: "#E2E8F0",
                                  color: "#64748B",
                                  fontSize: "0.8125rem",
                                }
                          }
                        >
                          {obj.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Linked Products */}
                <div>
                  <p
                    style={{ fontSize: "0.875rem", color: "#0F172A" }}
                    className="mb-2"
                  >
                    Linked Products{" "}
                    <span style={{ color: "#94A3B8", fontSize: "0.8125rem" }}>
                      (from item master)
                    </span>
                  </p>
                  <Input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Filter products…"
                    className="w-full mb-2 px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 h-auto shadow-none"
                    style={{ fontSize: "0.8125rem", background: "#F8FAFC" }}
                  />
                  <div className="rounded-lg border border-[#E2E8F0] overflow-hidden">
                    {filteredProducts.length === 0 ? (
                      <p
                        className="px-4 py-3 text-center"
                        style={{ fontSize: "0.8125rem", color: "#94A3B8" }}
                      >
                        No products match
                      </p>
                    ) : (
                      filteredProducts.map((product, i) => {
                        const checked = selectedProducts.includes(product.id);
                        return (
                          <label
                            key={product.id}
                            className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors hover:bg-[#F8FAFC] ${
                              i < filteredProducts.length - 1
                                ? "border-b border-[#F1F5F9]"
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleProduct(product.id)}
                              className="w-4 h-4 rounded border-[#CBD5E1] cursor-pointer accent-[#7D152D]"
                            />
                            <span
                              style={{
                                fontSize: "0.875rem",
                                color: checked ? "#0F172A" : "#64748B",
                              }}
                            >
                              {product.name}
                            </span>
                          </label>
                        );
                      })
                    )}
                  </div>
                  <p
                    className="mt-1.5"
                    style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                  >
                    {selectedProducts.length} product
                    {selectedProducts.length !== 1 ? "s" : ""} selected
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer ──────────────────────────────────────────────────── */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2E8F0] flex-shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors h-auto cursor-pointer"
              style={{ fontSize: "0.875rem" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-lg text-white transition-opacity disabled:opacity-60 h-auto cursor-pointer"
              style={{ background: "#7D152D", fontSize: "0.875rem" }}
            >
              {submitting && (
                <Loader2 size={14} className="mr-2 animate-spin" />
              )}
              {submitting ? "Creating…" : "Create Campaign"}
            </Button>
          </div>
        </form>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
