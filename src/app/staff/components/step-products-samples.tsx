// =============================================================================
// Step "Products & Samples" — wizard step for selecting which products are
// sampled at an event and viewing linked brand education documents.
//
// Quantities are intentionally NOT handled here. Per Hart's workflow, physical
// sample quantities live at the kit level (defined when the kit is assembled)
// and the educator captures starting inventory at check-in. The operator's
// job here is product SELECTION only.
// =============================================================================

import { useState, useMemo } from "react";
import {
  Search,
  Package,
  Check,
  Info,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Input } from "@/app/shared/components/ui/input";
import { INITIAL_SKUS, getDocumentsForSku, type SKU } from "./brand-assets-data";
import {
  DOCUMENT_TYPE_STYLES,
  type BrandDocument,
} from "./brand-education-data";
import type { SampleConfig } from "./event-data";

// ── Props ────────────────────────────────────────────────────────────────────

interface StepProductsSamplesProps {
  sampleConfigs: SampleConfig[];
  onChange: (configs: SampleConfig[]) => void;
  inheritedProductIds: string[];
  campaignName: string;
}

// ── Component ────────────────────────────────────────────────────────────────

export function StepProductsSamples({
  sampleConfigs,
  onChange,
  inheritedProductIds,
  campaignName,
}: StepProductsSamplesProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(new Set());

  const activeSkus = useMemo(
    () => INITIAL_SKUS.filter((s) => s.status === "active"),
    [],
  );

  const categories = useMemo(() => {
    const cats = new Set(activeSkus.map((s) => s.category));
    return ["All", ...Array.from(cats).sort()];
  }, [activeSkus]);

  const filteredSkus = useMemo(() => {
    let list = activeSkus;
    if (categoryFilter !== "All") {
      list = list.filter((s) => s.category === categoryFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.productName.toLowerCase().includes(q) ||
          s.skuCode.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q),
      );
    }
    return list;
  }, [activeSkus, categoryFilter, search]);

  const selectedIds = new Set(sampleConfigs.map((c) => c.skuId));

  function toggleProduct(skuId: string) {
    if (selectedIds.has(skuId)) {
      onChange(sampleConfigs.filter((c) => c.skuId !== skuId));
    } else {
      const docs = getDocumentsForSku(skuId);
      onChange([
        ...sampleConfigs,
        {
          skuId,
          brandEducationDocIds: docs.map((d) => d.id),
        },
      ]);
    }
  }

  function toggleDocs(skuId: string) {
    setExpandedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(skuId)) next.delete(skuId);
      else next.add(skuId);
      return next;
    });
  }

  const totalDocs = sampleConfigs.reduce(
    (sum, c) => sum + (c.brandEducationDocIds?.length ?? 0),
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2
          className="font-semibold"
          style={{ fontSize: "1.25rem", color: "#0F172A" }}
        >
          Products & Samples
        </h2>
        <p
          className="mt-1"
          style={{ fontSize: "0.875rem", color: "#64748B" }}
        >
          Select which products will be sampled at this event. Physical sample
          quantities are defined at the kit level and captured by the educator
          at check-in.
        </p>
      </div>

      {/* Inherited products banner */}
      {inheritedProductIds.length > 0 && (
        <div
          className="flex items-start gap-2.5 rounded-lg px-4 py-3"
          style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}
        >
          <Info size={16} className="mt-0.5 shrink-0" style={{ color: "#2563EB" }} />
          <p style={{ fontSize: "0.8125rem", color: "#1E40AF" }}>
            <strong>{inheritedProductIds.length} product{inheritedProductIds.length !== 1 ? "s" : ""}</strong>{" "}
            inherited from <strong>{campaignName}</strong>. You can add or remove
            products below.
          </p>
        </div>
      )}

      {/* Search + filter bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "#94A3B8" }}
          />
          <Input
            placeholder="Search by name, SKU, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 rounded-lg border-[#E2E8F0] text-sm"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-9 rounded-lg border border-[#E2E8F0] px-3 text-sm bg-white text-[#0F172A] cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "All" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product picker grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredSkus.map((sku) => {
          const isSelected = selectedIds.has(sku.id);
          const isInherited = inheritedProductIds.includes(sku.id);
          return (
            <ProductPickerCard
              key={sku.id}
              sku={sku}
              isSelected={isSelected}
              isInherited={isInherited}
              onToggle={() => toggleProduct(sku.id)}
            />
          );
        })}
      </div>

      {filteredSkus.length === 0 && (
        <div
          className="text-center py-8 rounded-lg border border-dashed border-[#E2E8F0]"
          style={{ color: "#94A3B8", fontSize: "0.875rem" }}
        >
          No products match your search.
        </div>
      )}

      {/* Selected products summary */}
      {sampleConfigs.length > 0 && (
        <div className="space-y-3">
          <div
            className="flex items-center justify-between"
            style={{ borderTop: "1px solid #E2E8F0", paddingTop: "1.25rem" }}
          >
            <div className="flex items-center gap-2">
              <Package size={15} style={{ color: "#7D152D" }} />
              <span
                className="font-medium"
                style={{ fontSize: "0.9375rem", color: "#0F172A" }}
              >
                Selected Products ({sampleConfigs.length})
              </span>
            </div>
            {totalDocs > 0 && (
              <span style={{ fontSize: "0.8125rem", color: "#64748B" }}>
                {totalDocs} brand education doc{totalDocs !== 1 ? "s" : ""} linked
              </span>
            )}
          </div>

          <div className="space-y-2">
            {sampleConfigs.map((config) => {
              const sku = INITIAL_SKUS.find((s) => s.id === config.skuId);
              if (!sku) return null;
              const docs = getDocumentsForSku(config.skuId);
              const isExpanded = expandedDocs.has(config.skuId);
              return (
                <SelectedProductRow
                  key={config.skuId}
                  sku={sku}
                  docs={docs}
                  isExpanded={isExpanded}
                  onToggleDocs={() => toggleDocs(config.skuId)}
                  onRemove={() => toggleProduct(config.skuId)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function ProductPickerCard({
  sku,
  isSelected,
  isInherited,
  onToggle,
}: {
  sku: SKU;
  isSelected: boolean;
  isInherited: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative flex flex-col rounded-xl border overflow-hidden text-left transition-all cursor-pointer group"
      style={{
        borderColor: isSelected ? "#7D152D" : "#E2E8F0",
        background: isSelected ? "#FDF2F4" : "#FFFFFF",
        boxShadow: isSelected
          ? "0 0 0 1px #7D152D"
          : "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F8FAFC]">
        <img
          src={sku.imageUrl}
          alt={sku.productName}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        {/* Selection checkbox */}
        <div
          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center transition-colors"
          style={{
            background: isSelected ? "#7D152D" : "rgba(255,255,255,0.9)",
            border: isSelected ? "none" : "1.5px solid #CBD5E1",
          }}
        >
          {isSelected && <Check size={12} className="text-white" />}
        </div>
        {/* Inherited badge */}
        {isInherited && isSelected && (
          <div
            className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-medium"
            style={{
              background: "rgba(37, 99, 235, 0.9)",
              color: "#FFFFFF",
            }}
          >
            Inherited
          </div>
        )}
      </div>
      {/* Info */}
      <div className="px-2.5 py-2">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span
            className="px-1.5 py-0.5 rounded font-mono"
            style={{
              fontSize: "0.625rem",
              background: "#F1F5F9",
              color: "#475569",
            }}
          >
            {sku.skuCode}
          </span>
          {sku.abv !== "0.0%" && (
            <span
              style={{ fontSize: "0.625rem", color: "#94A3B8" }}
            >
              {sku.abv}
            </span>
          )}
        </div>
        <p
          className="font-medium leading-tight line-clamp-1"
          style={{ fontSize: "0.8125rem", color: "#0F172A" }}
        >
          {sku.productName}
        </p>
        <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
          {sku.category} · {sku.unitSize}
        </p>
      </div>
    </button>
  );
}

function SelectedProductRow({
  sku,
  docs,
  isExpanded,
  onToggleDocs,
  onRemove,
}: {
  sku: SKU;
  docs: BrandDocument[];
  isExpanded: boolean;
  onToggleDocs: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      className="rounded-lg border border-[#E2E8F0] overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <div className="flex items-center gap-3 px-3 py-2.5">
        {/* Thumbnail */}
        <img
          src={sku.imageUrl}
          alt={sku.productName}
          className="w-10 h-10 rounded-lg object-cover shrink-0"
        />
        {/* Name + code */}
        <div className="flex-1 min-w-0">
          <p
            className="font-medium truncate"
            style={{ fontSize: "0.8125rem", color: "#0F172A" }}
          >
            {sku.productName}
          </p>
          <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
            {sku.skuCode} · {sku.category}
          </p>
        </div>
        {/* Docs toggle */}
        {docs.length > 0 && (
          <button
            type="button"
            onClick={onToggleDocs}
            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            title="Brand education documents"
          >
            <FileText size={13} style={{ color: "#7D152D" }} />
            <span style={{ fontSize: "0.75rem", color: "#7D152D" }}>
              {docs.length} doc{docs.length !== 1 ? "s" : ""}
            </span>
            {isExpanded ? (
              <ChevronUp size={12} style={{ color: "#7D152D" }} />
            ) : (
              <ChevronDown size={12} style={{ color: "#7D152D" }} />
            )}
          </button>
        )}
        {/* Remove */}
        <button
          type="button"
          onClick={onRemove}
          className="text-xs px-2 py-1 rounded-md hover:bg-[#FEE2E2] transition-colors cursor-pointer"
          style={{ color: "#DC2626", fontSize: "0.75rem" }}
        >
          Remove
        </button>
      </div>
      {/* Expanded brand education docs */}
      {isExpanded && docs.length > 0 && (
        <div
          className="px-3 pb-2.5 space-y-1.5"
          style={{ borderTop: "1px solid #F1F5F9" }}
        >
          <p
            className="pt-2 font-medium"
            style={{ fontSize: "0.75rem", color: "#64748B" }}
          >
            Linked Brand Education
          </p>
          {docs.map((doc) => {
            const style = DOCUMENT_TYPE_STYLES[doc.type];
            const Icon = style.icon;
            return (
              <div
                key={doc.id}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-md"
                style={{ background: style.bg }}
              >
                <Icon size={13} style={{ color: style.text }} />
                <span
                  className="truncate"
                  style={{ fontSize: "0.75rem", color: style.text }}
                >
                  {doc.title}
                </span>
                <span
                  className="ml-auto shrink-0 px-1.5 py-0.5 rounded"
                  style={{
                    fontSize: "0.625rem",
                    background: "rgba(255,255,255,0.6)",
                    color: style.text,
                  }}
                >
                  {doc.type}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
