// =============================================================================
// Brand Assets — MM-UI-006  (polished)
// Two tabs: Product Library (SKU management + Auto Upload) and Help Resources.
// Polish pass addresses 8 spec gaps — see conversation for rationale.
// =============================================================================

import { useState, useMemo, useRef, useCallback } from "react";
import { PageHeader } from "../../shared/components/layouts/page-header";
import {
  Package,
  HelpCircle,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Sparkles,
  Send,
  LayoutGrid,
  List,
  ChevronRight,
  CircleDot,
  RotateCcw,
  Check,
  Loader2,
  Eye,
  Bold,
  Italic,
  ListOrdered,
  ListIcon,
  Heading2,
  ChevronsDownUp,
  ChevronsUpDown,
  XCircle,
  CircleAlert,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import { Textarea } from "@/app/shared/components/ui/textarea";
import { ImageWithFallback } from "../../shared/components/ui/ImageWithFallback";
import {
  INITIAL_SKUS,
  INITIAL_FAQS,
  SKU_CATEGORIES,
  FAQ_CATEGORIES,
  mockAIExtractSKUs,
  type SKU,
  type FAQItem,
  type AIPrefilledSKU,
} from "./brand-assets-data";

// ── Constants & helpers ──────────────────────────────────────────────────────

type Tab = "products" | "help";
type ViewMode = "grid" | "list";
type SKUStatus = "active" | "discontinued" | "draft";

const STATUS_STYLE: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  active: { bg: "#ECFDF5", text: "#0F766E", label: "Active" },
  discontinued: { bg: "#FEF2F2", text: "#B91C1C", label: "Discontinued" },
  draft: { bg: "#F1F5F9", text: "#64748B", label: "Draft" },
};

const CONFIDENCE_COLOR = (c: number) =>
  c >= 0.9 ? "#0F766E" : c >= 0.75 ? "#D97706" : "#B91C1C";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Very lightweight markdown-ish renderer for FAQ preview */
function renderFormattedText(text: string) {
  return text.split("\n").map((line, i) => {
    let processed = line
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/^## (.+)/, "<strong style='font-size:0.9375rem'>$1</strong>");
    return (
      <span
        key={i}
        className="block"
        style={{ minHeight: line.trim() === "" ? "0.5em" : undefined }}
        dangerouslySetInnerHTML={{ __html: processed }}
      />
    );
  });
}

// =============================================================================
// Main Component  (#5 — tab badges with counts)
// =============================================================================

export function BrandAssetsPage() {
  const [tab, setTab] = useState<Tab>("products");
  const [skus, setSkus] = useState<SKU[]>(INITIAL_SKUS);
  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);

  const unpushedCount = useMemo(
    () =>
      faqs.filter(
        (f) => !f.pushedAt || new Date(f.updatedAt) > new Date(f.pushedAt),
      ).length,
    [faqs],
  );

  return (
    <div className="p-6 font-[Inter]">
      {/* Header */}
      <PageHeader
        title="Brand Assets"
        subtitle="Manage your product library and help resources for field teams."
      />

      {/* Tabs — #5 badges */}
      <div className="flex items-center gap-1 mb-6 border-b border-[#E2E8F0]">
        <TabButton
          active={tab === "products"}
          icon={<Package size={15} />}
          label="Product Library"
          badge={skus.length}
          onClick={() => setTab("products")}
        />
        <TabButton
          active={tab === "help"}
          icon={<HelpCircle size={15} />}
          label="Help Resources"
          badge={faqs.length}
          alertDot={unpushedCount > 0}
          onClick={() => setTab("help")}
        />
      </div>

      {tab === "products" ? (
        <ProductLibrary skus={skus} setSkus={setSkus} />
      ) : (
        <HelpResources
          faqs={faqs}
          setFaqs={setFaqs}
          unpushedCount={unpushedCount}
        />
      )}
    </div>
  );
}

// ── Tab Button (#5) ──────────────────────────────────────────────────────────

function TabButton({
  active,
  icon,
  label,
  badge,
  alertDot,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  alertDot?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 transition-colors relative rounded-none hover:bg-transparent h-auto cursor-pointer ${active ? "" : "hover:text-[#0F172A]"}`}
      style={{ fontSize: "0.8125rem", color: active ? "#7D152D" : "#64748B" }}
    >
      {icon}
      {label}
      {badge !== undefined && (
        <span
          className="px-1.5 py-0.5 rounded-md relative"
          style={{
            fontSize: "0.625rem",
            background: active ? "#7D152D14" : "#F1F5F9",
            color: active ? "#7D152D" : "#94A3B8",
          }}
        >
          {badge}
          {alertDot && (
            <span
              className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
              style={{ background: "#D97706" }}
            />
          )}
        </span>
      )}
      {active && (
        <span
          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t"
          style={{ background: "#7D152D" }}
        />
      )}
    </Button>
  );
}

// =============================================================================
// Product Library  (#4 stat cards, #6 detail view, #7 filter chips)
// =============================================================================

function ProductLibrary({
  skus,
  setSkus,
}: {
  skus: SKU[];
  setSkus: React.Dispatch<React.SetStateAction<SKU[]>>;
}) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Modals
  const [editingSku, setEditingSku] = useState<SKU | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingSku, setDeletingSku] = useState<SKU | null>(null);
  const [viewingSku, setViewingSku] = useState<SKU | null>(null); // #6
  const [showAutoUpload, setShowAutoUpload] = useState(false);

  const hasFilters =
    search !== "" || categoryFilter !== "all" || statusFilter !== "all";

  const filtered = useMemo(() => {
    let result = skus;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.productName.toLowerCase().includes(q) ||
          s.skuCode.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q),
      );
    }
    if (categoryFilter !== "all")
      result = result.filter((s) => s.category === categoryFilter);
    if (statusFilter !== "all")
      result = result.filter((s) => s.status === statusFilter);
    return result;
  }, [skus, search, categoryFilter, statusFilter]);

  const categories = useMemo(() => {
    const set = new Set(skus.map((s) => s.category));
    return Array.from(set).sort();
  }, [skus]);

  // Stat counts — #4
  const stats = useMemo(() => {
    const active = skus.filter((s) => s.status === "active").length;
    const draft = skus.filter((s) => s.status === "draft").length;
    const disc = skus.filter((s) => s.status === "discontinued").length;
    return { total: skus.length, active, draft, disc };
  }, [skus]);

  // CRUD
  function handleSave(sku: SKU) {
    setSkus((prev) => {
      const exists = prev.find((s) => s.id === sku.id);
      if (exists) return prev.map((s) => (s.id === sku.id ? sku : s));
      return [sku, ...prev];
    });
    setEditingSku(null);
    setIsCreating(false);
    toast.success(isCreating ? "Product added" : "Product updated");
  }

  function handleDelete(id: string) {
    setSkus((prev) => prev.filter((s) => s.id !== id));
    setDeletingSku(null);
    setViewingSku(null);
    toast.success("Product removed from library");
  }

  function handleAutoUploadConfirm(newSkus: SKU[]) {
    setSkus((prev) => [...newSkus, ...prev]);
    setShowAutoUpload(false);
    toast.success(
      `${newSkus.length} product${newSkus.length !== 1 ? "s" : ""} imported via Auto Upload`,
    );
  }

  function clearFilters() {
    setSearch("");
    setCategoryFilter("all");
    setStatusFilter("all");
  }

  return (
    <>
      {/* #4 — Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          {
            label: "Total SKUs",
            value: stats.total,
            color: "#0F172A",
            bg: "#F8FAFC",
          },
          {
            label: "Active",
            value: stats.active,
            color: "#0F766E",
            bg: "#ECFDF5",
          },
          {
            label: "Draft",
            value: stats.draft,
            color: "#64748B",
            bg: "#F1F5F9",
          },
          {
            label: "Discontinued",
            value: stats.disc,
            color: "#B91C1C",
            bg: "#FEF2F2",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl px-4 py-3 border border-[#E2E8F0]"
            style={{ background: s.bg }}
          >
            <p
              style={{
                fontSize: "0.6875rem",
                color: "#94A3B8",
                letterSpacing: "0.03em",
              }}
            >
              {s.label}
            </p>
            <p
              className="mt-0.5"
              style={{ fontSize: "1.25rem", color: s.color }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "#94A3B8" }}
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, SKU, or description..."
              className="w-full pl-9 pr-8 py-2 rounded-lg border border-[#E2E8F0] bg-white outline-none transition-colors focus:border-[#7D152D]"
              style={{ fontSize: "0.8125rem", color: "#0F172A" }}
            />
            {search && (
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 h-auto w-auto p-0 hover:bg-transparent cursor-pointer"
              >
                <X size={12} style={{ color: "#94A3B8" }} />
              </Button>
            )}
          </div>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white cursor-pointer outline-none"
            style={{ fontSize: "0.8125rem", color: "#64748B" }}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white cursor-pointer outline-none"
            style={{ fontSize: "0.8125rem", color: "#64748B" }}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="discontinued">Discontinued</option>
          </select>

          {/* View toggle */}
          <div className="inline-flex rounded-lg border border-[#E2E8F0] overflow-hidden">
            <Button
              variant="ghost"
              onClick={() => setViewMode("grid")}
              className="p-2 transition-colors h-auto rounded-none cursor-pointer"
              style={{
                background: viewMode === "grid" ? "#7D152D" : "#fff",
                color: viewMode === "grid" ? "#fff" : "#94A3B8",
              }}
            >
              <LayoutGrid size={14} />
            </Button>
            <Button
              variant="ghost"
              onClick={() => setViewMode("list")}
              className="p-2 transition-colors h-auto rounded-none cursor-pointer"
              style={{
                background: viewMode === "list" ? "#7D152D" : "#fff",
                color: viewMode === "list" ? "#fff" : "#94A3B8",
              }}
            >
              <List size={14} />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowAutoUpload(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] transition-colors h-auto cursor-pointer"
            style={{ fontSize: "0.8125rem", color: "#0F172A" }}
          >
            <Sparkles size={14} style={{ color: "#0F766E" }} />
            Auto Upload
          </Button>
          <Button
            onClick={() => {
              setIsCreating(true);
              setEditingSku({
                id: "sku-new-" + Date.now(),
                skuCode: "",
                productName: "",
                description: "",
                category: "",
                imageUrl: "",
                unitSize: "",
                abv: "",
                status: "draft",
                createdAt: new Date().toISOString().split("T")[0] ?? "",
                updatedAt: new Date().toISOString().split("T")[0] ?? "",
              });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 h-auto cursor-pointer"
            style={{ background: "#7D152D", fontSize: "0.8125rem" }}
          >
            <Plus size={14} />
            Add Product
          </Button>
        </div>
      </div>

      {/* #7 — Active filter indicator + reset */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        </p>
        {hasFilters && (
          <>
            <span style={{ color: "#E2E8F0" }}>|</span>
            {search && (
              <FilterChip
                label={`"${search}"`}
                onRemove={() => setSearch("")}
              />
            )}
            {categoryFilter !== "all" && (
              <FilterChip
                label={categoryFilter}
                onRemove={() => setCategoryFilter("all")}
              />
            )}
            {statusFilter !== "all" && (
              <FilterChip
                label={STATUS_STYLE[statusFilter]?.label ?? statusFilter}
                onRemove={() => setStatusFilter("all")}
              />
            )}
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={clearFilters}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-[#FEF2F2] transition-colors h-auto w-auto cursor-pointer"
              style={{ fontSize: "0.6875rem", color: "#B91C1C" }}
            >
              <XCircle size={10} />
              Clear all
            </Button>
          </>
        )}
      </div>

      {/* Products */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center">
          <Package
            size={32}
            style={{ color: "#E2E8F0" }}
            className="mx-auto mb-3"
          />
          <p style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
            No products match your filters.
          </p>
          {hasFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="mt-2 inline-flex items-center gap-1 h-auto cursor-pointer"
              style={{ fontSize: "0.8125rem", color: "#7D152D" }}
            >
              <RotateCcw size={12} /> Clear filters
            </Button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((sku) => (
            <SKUGridCard
              key={sku.id}
              sku={sku}
              onClick={() => setViewingSku(sku)} // #6
              onEdit={() => {
                setIsCreating(false);
                setEditingSku(sku);
              }}
              onDelete={() => setDeletingSku(sku)}
            />
          ))}
        </div>
      ) : (
        <SKUListView
          skus={filtered}
          onView={(s) => setViewingSku(s)} // #6
          onEdit={(s) => {
            setIsCreating(false);
            setEditingSku(s);
          }}
          onDelete={(s) => setDeletingSku(s)}
        />
      )}

      {/* #6 — SKU Detail Overlay */}
      {viewingSku && (
        <SKUDetailOverlay
          sku={viewingSku}
          onEdit={() => {
            setIsCreating(false);
            setEditingSku(viewingSku);
            setViewingSku(null);
          }}
          onDelete={() => {
            setDeletingSku(viewingSku);
            setViewingSku(null);
          }}
          onClose={() => setViewingSku(null)}
        />
      )}

      {/* Edit/Create Modal */}
      {editingSku && (
        <SKUEditModal
          sku={editingSku}
          isNew={isCreating}
          onSave={handleSave}
          onClose={() => {
            setEditingSku(null);
            setIsCreating(false);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deletingSku && (
        <DeleteConfirmDialog
          name={deletingSku.productName}
          onConfirm={() => handleDelete(deletingSku.id)}
          onCancel={() => setDeletingSku(null)}
        />
      )}

      {/* Auto Upload Drawer */}
      {showAutoUpload && (
        <AutoUploadDrawer
          onConfirm={handleAutoUploadConfirm}
          onClose={() => setShowAutoUpload(false)}
        />
      )}
    </>
  );
}

// ── Filter chip (#7) ─────────────────────────────────────────────────────────

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F1F5F9]"
      style={{ fontSize: "0.6875rem", color: "#64748B" }}
    >
      {label}
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={onRemove}
        className="hover:text-[#0F172A] transition-colors h-auto w-auto p-0"
      >
        <X size={10} />
      </Button>
    </span>
  );
}

// ── SKU Grid Card (#6 — clickable) ───────────────────────────────────────────

function SKUGridCard({
  sku,
  onClick,
  onEdit,
  onDelete,
}: {
  sku: SKU;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const st = STATUS_STYLE[sku.status] ?? STATUS_STYLE["draft"];
  return (
    <div
      className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden group hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] bg-[#F1F5F9] overflow-hidden">
        <ImageWithFallback
          src={sku.imageUrl}
          alt={sku.productName}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span
          className="absolute top-2 left-2 px-2 py-0.5 rounded-md"
          style={{ fontSize: "0.625rem", background: st!.bg, color: st!.text }}
        >
          {st!.label}
        </span>
        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow transition-colors cursor-pointer"
          >
            <Pencil size={12} style={{ color: "#0F172A" }} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow transition-colors cursor-pointer"
          >
            <Trash2 size={12} style={{ color: "#B91C1C" }} />
          </Button>
        </div>
      </div>
      <div className="p-3.5">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="px-1.5 py-0.5 rounded bg-[#F1F5F9] flex-shrink-0"
            style={{
              fontSize: "0.625rem",
              color: "#64748B",
              fontFamily: "monospace",
            }}
          >
            {sku.skuCode}
          </span>
          {sku.abv !== "0.0%" && (
            <span style={{ fontSize: "0.625rem", color: "#94A3B8" }}>
              {sku.abv}
            </span>
          )}
        </div>
        <p
          className="truncate mb-1"
          style={{ fontSize: "0.8125rem", color: "#0F172A" }}
        >
          {sku.productName}
        </p>
        <p
          className="truncate"
          style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
        >
          {sku.category} &middot; {sku.unitSize}
        </p>
      </div>
    </div>
  );
}

// ── SKU List View (#6 — clickable rows) ──────────────────────────────────────

function SKUListView({
  skus,
  onView,
  onEdit,
  onDelete,
}: {
  skus: SKU[];
  onView: (s: SKU) => void;
  onEdit: (s: SKU) => void;
  onDelete: (s: SKU) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
      <div className="overflow-x-auto">
        <table
          className="w-full min-w-[700px]"
          style={{ borderCollapse: "separate", borderSpacing: 0 }}
        >
          <thead>
            <tr className="border-b border-[#E2E8F0]">
              {[
                "Product",
                "SKU Code",
                "Category",
                "Size",
                "ABV",
                "Status",
                "Updated",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left"
                  style={{
                    fontSize: "0.6875rem",
                    color: "#94A3B8",
                    letterSpacing: "0.04em",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {skus.map((sku) => {
              const st = STATUS_STYLE[sku.status] ?? STATUS_STYLE["draft"];
              return (
                <tr
                  key={sku.id}
                  className="border-b border-[#F8FAFC] last:border-0 hover:bg-[#FAFBFC] transition-colors cursor-pointer"
                  onClick={() => onView(sku)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#F1F5F9] flex-shrink-0">
                        <ImageWithFallback
                          src={sku.imageUrl}
                          alt={sku.productName}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span
                        className="truncate max-w-[180px]"
                        style={{ fontSize: "0.8125rem", color: "#0F172A" }}
                      >
                        {sku.productName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-1.5 py-0.5 rounded bg-[#F1F5F9]"
                      style={{
                        fontSize: "0.6875rem",
                        color: "#64748B",
                        fontFamily: "monospace",
                      }}
                    >
                      {sku.skuCode}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{ fontSize: "0.8125rem", color: "#64748B" }}
                  >
                    {sku.category}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{ fontSize: "0.8125rem", color: "#64748B" }}
                  >
                    {sku.unitSize}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{ fontSize: "0.8125rem", color: "#64748B" }}
                  >
                    {sku.abv}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-md"
                      style={{
                        fontSize: "0.6875rem",
                        background: st!.bg,
                        color: st!.text,
                      }}
                    >
                      {st!.label}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                  >
                    {fmtDate(sku.updatedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(sku);
                        }}
                        className="p-1.5 rounded-md hover:bg-[#F1F5F9] transition-colors h-auto w-auto cursor-pointer"
                      >
                        <Pencil size={13} style={{ color: "#64748B" }} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(sku);
                        }}
                        className="p-1.5 rounded-md hover:bg-[#FEF2F2] transition-colors h-auto w-auto cursor-pointer"
                      >
                        <Trash2 size={13} style={{ color: "#B91C1C" }} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── #6 — SKU Detail Overlay ──────────────────────────────────────────────────

function SKUDetailOverlay({
  sku,
  onEdit,
  onDelete,
  onClose,
}: {
  sku: SKU;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const st = STATUS_STYLE[sku.status] ?? STATUS_STYLE["draft"];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        {sku.imageUrl && (
          <div className="relative aspect-[16/9] bg-[#F1F5F9] overflow-hidden rounded-t-xl">
            <ImageWithFallback
              src={sku.imageUrl}
              alt={sku.productName}
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors h-auto cursor-pointer"
            >
              <X size={16} style={{ color: "#fff" }} />
            </Button>
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="px-2 py-0.5 rounded bg-[#F1F5F9] font-mono"
                  style={{ fontSize: "0.6875rem", color: "#64748B" }}
                >
                  {sku.skuCode}
                </span>
                <span
                  className="px-2 py-0.5 rounded-md"
                  style={{
                    fontSize: "0.6875rem",
                    background: st!.bg,
                    color: st!.text,
                  }}
                >
                  {st!.label}
                </span>
              </div>
              <h3 style={{ fontSize: "1.125rem", color: "#0F172A" }}>
                {sku.productName}
              </h3>
            </div>
            {!sku.imageUrl && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="p-1 hover:bg-[#F1F5F9] rounded-md transition-colors h-auto w-auto cursor-pointer"
              >
                <X size={16} style={{ color: "#64748B" }} />
              </Button>
            )}
          </div>

          {/* Description */}
          <p
            className="mb-5"
            style={{ fontSize: "0.875rem", color: "#334155", lineHeight: 1.65 }}
          >
            {sku.description}
          </p>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Category", value: sku.category },
              { label: "Unit Size", value: sku.unitSize },
              { label: "ABV", value: sku.abv },
              { label: "Created", value: fmtDate(sku.createdAt) },
            ].map((m) => (
              <div key={m.label}>
                <p
                  style={{
                    fontSize: "0.6875rem",
                    color: "#94A3B8",
                    letterSpacing: "0.03em",
                  }}
                >
                  {m.label}
                </p>
                <p
                  className="mt-0.5"
                  style={{ fontSize: "0.8125rem", color: "#0F172A" }}
                >
                  {m.value || "—"}
                </p>
              </div>
            ))}
          </div>

          <p
            className="mb-5"
            style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
          >
            Last updated {fmtDate(sku.updatedAt)}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-4 border-t border-[#E2E8F0]">
            <Button
              variant="outline"
              onClick={onEdit}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors h-auto cursor-pointer"
              style={{ fontSize: "0.8125rem", color: "#0F172A" }}
            >
              <Pencil size={13} /> Edit
            </Button>
            <Button
              variant="outline"
              onClick={onDelete}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#FEE2E2] hover:bg-[#FEF2F2] transition-colors h-auto cursor-pointer"
              style={{ fontSize: "0.8125rem", color: "#B91C1C" }}
            >
              <Trash2 size={13} /> Remove
            </Button>
            <div className="flex-1" />
            <Button
              variant="ghost"
              onClick={onClose}
              className="px-4 py-2 rounded-lg hover:bg-[#F1F5F9] transition-colors h-auto cursor-pointer"
              style={{ fontSize: "0.8125rem", color: "#64748B" }}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SKU Edit/Create Modal ────────────────────────────────────────────────────

function SKUEditModal({
  sku,
  isNew,
  onSave,
  onClose,
}: {
  sku: SKU;
  isNew: boolean;
  onSave: (s: SKU) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<SKU>({ ...sku });

  function update<K extends keyof SKU>(key: K, val: SKU[K]) {
    setForm((prev) => ({
      ...prev,
      [key]: val,
      updatedAt: new Date().toISOString().split("T")[0] ?? "",
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.productName.trim() || !form.skuCode.trim()) {
      toast.error("Product name and SKU code are required.");
      return;
    }
    onSave(form);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
          <h3 style={{ fontSize: "1rem", color: "#0F172A" }}>
            {isNew ? "Add Product" : "Edit Product"}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="p-1 hover:bg-[#F1F5F9] rounded-md transition-colors h-auto w-auto cursor-pointer"
          >
            <X size={16} style={{ color: "#64748B" }} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <FormField label="Product Name *">
            <Input
              value={form.productName}
              onChange={(e) => update("productName", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
              style={{ fontSize: "0.8125rem" }}
              placeholder="e.g. Mango Sunrise Seltzer"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="SKU Code *">
              <Input
                value={form.skuCode}
                onChange={(e) => update("skuCode", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D] font-mono"
                style={{ fontSize: "0.8125rem" }}
                placeholder="SEL-MNG-12"
              />
            </FormField>
            <FormField label="Category">
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
                style={{ fontSize: "0.8125rem" }}
              >
                <option value="">Select...</option>
                {SKU_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <FormField label="Description">
            <Textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D] resize-none"
              style={{ fontSize: "0.8125rem" }}
              placeholder="Brief product description..."
            />
          </FormField>

          <div className="grid grid-cols-3 gap-3">
            <FormField label="Unit Size">
              <Input
                value={form.unitSize}
                onChange={(e) => update("unitSize", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
                style={{ fontSize: "0.8125rem" }}
                placeholder="12 oz can"
              />
            </FormField>
            <FormField label="ABV">
              <Input
                value={form.abv}
                onChange={(e) => update("abv", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
                style={{ fontSize: "0.8125rem" }}
                placeholder="5.0%"
              />
            </FormField>
            <FormField label="Status">
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value as SKUStatus)}
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
                style={{ fontSize: "0.8125rem" }}
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="discontinued">Discontinued</option>
              </select>
            </FormField>
          </div>

          <FormField label="Image URL">
            <Input
              value={form.imageUrl}
              onChange={(e) => update("imageUrl", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
              style={{ fontSize: "0.8125rem" }}
              placeholder="https://..."
            />
          </FormField>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors h-auto cursor-pointer"
              style={{ fontSize: "0.8125rem", color: "#64748B" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 h-auto cursor-pointer"
              style={{ background: "#7D152D", fontSize: "0.8125rem" }}
            >
              {isNew ? "Add Product" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Delete Confirmation ──────────────────────────────────────────────────────

function DeleteConfirmDialog({
  name,
  onConfirm,
  onCancel,
}: {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)" }}
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#FEF2F2" }}
          >
            <AlertTriangle size={18} style={{ color: "#B91C1C" }} />
          </div>
          <div>
            <p style={{ fontSize: "0.9375rem", color: "#0F172A" }}>
              Remove item?
            </p>
            <p
              className="line-clamp-2"
              style={{ fontSize: "0.8125rem", color: "#94A3B8" }}
            >
              &ldquo;{name}&rdquo; will be permanently removed.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors h-auto cursor-pointer"
            style={{ fontSize: "0.8125rem", color: "#64748B" }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 h-auto cursor-pointer"
            style={{ background: "#B91C1C", fontSize: "0.8125rem" }}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Auto Upload Drawer  (#2 inline edit, #3 drag-and-drop)
// =============================================================================

type UploadStage = "upload" | "processing" | "review";
const STAGES: UploadStage[] = ["upload", "processing", "review"];

function AutoUploadDrawer({
  onConfirm,
  onClose,
}: {
  onConfirm: (skus: SKU[]) => void;
  onClose: () => void;
}) {
  const [stage, setStage] = useState<UploadStage>("upload");
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [aiResults, setAiResults] = useState<AIPrefilledSKU[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [dragging, setDragging] = useState(false); // #3
  const fileRef = useRef<HTMLInputElement>(null);

  // Process file — shared between click-upload and drag-drop
  const processFile = useCallback((file: File) => {
    setFileName(file.name);
    setStage("processing");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 18 + 5;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      const results = mockAIExtractSKUs();
      setAiResults(results);
      setSelected(new Set(results.map((_, i) => i)));
      setTimeout(() => setStage("review"), 400);
    }, 2800);
  }, []);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  // #3 — Drag-and-drop handlers
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }
  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }

  function handleConfirm() {
    const now = new Date().toISOString().split("T")[0] ?? "";
    const newSkus: SKU[] = aiResults
      .filter((_, i) => selected.has(i))
      .map((r, i) => ({
        id: `sku-ai-${Date.now()}-${i}`,
        skuCode: r.skuCode,
        productName: r.productName,
        description: r.description,
        category: r.category,
        imageUrl: "",
        unitSize: r.unitSize,
        abv: r.abv,
        status: "draft" as const,
        createdAt: now,
        updatedAt: now,
      }));
    onConfirm(newSkus);
  }

  function toggleItem(idx: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  // #2 — inline edit helper
  function updateAIField(
    idx: number,
    field: keyof AIPrefilledSKU,
    value: string,
  ) {
    setAiResults((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item)),
    );
  }

  const stageIdx = STAGES.indexOf(stage);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(15,23,42,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideInRight 0.25s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <Sparkles size={16} style={{ color: "#0F766E" }} />
            <h3 style={{ fontSize: "1rem", color: "#0F172A" }}>Auto Upload</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="p-1.5 hover:bg-[#F1F5F9] rounded-md transition-colors h-auto w-auto cursor-pointer"
          >
            <X size={16} style={{ color: "#64748B" }} />
          </Button>
        </div>

        <div className="p-6">
          {/* Stage indicator */}
          <div className="flex items-center gap-2 mb-6">
            {STAGES.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                {i > 0 && (
                  <div
                    className="w-8 h-px"
                    style={{
                      background: stageIdx >= i ? "#0F766E" : "#E2E8F0",
                    }}
                  />
                )}
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    fontSize: "0.625rem",
                    background:
                      stageIdx === i
                        ? "#0F766E"
                        : stageIdx > i
                          ? "#ECFDF5"
                          : "#F1F5F9",
                    color:
                      stageIdx === i
                        ? "#fff"
                        : stageIdx > i
                          ? "#0F766E"
                          : "#94A3B8",
                  }}
                >
                  {stageIdx > i ? <Check size={10} /> : i + 1}
                </div>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    color: stageIdx === i ? "#0F172A" : "#94A3B8",
                  }}
                >
                  {s === "upload"
                    ? "Upload"
                    : s === "processing"
                      ? "AI Processing"
                      : "Review"}
                </span>
              </div>
            ))}
          </div>

          {/* ── Upload stage (#3 drag-and-drop) ── */}
          {stage === "upload" && (
            <div>
              <p
                className="mb-4"
                style={{ fontSize: "0.8125rem", color: "#64748B" }}
              >
                Upload a CSV or Excel file containing product data. Our AI will
                extract and pre-fill SKU fields for your review.
              </p>
              <div
                className="border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer"
                style={{
                  borderColor: dragging ? "#0F766E" : "#E2E8F0",
                  background: dragging ? "#ECFDF508" : "transparent",
                }}
                onClick={() => fileRef.current?.click()}
                onDragOver={handleDragOver}
                onDragEnter={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <FileSpreadsheet
                  size={36}
                  style={{ color: dragging ? "#0F766E" : "#94A3B8" }}
                  className="mx-auto mb-3 transition-colors"
                />
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: dragging ? "#0F766E" : "#0F172A",
                  }}
                  className="mb-1"
                >
                  {dragging
                    ? "Drop your file here"
                    : "Drop your file here or click to browse"}
                </p>
                <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                  Accepts .csv, .xlsx, .xls
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
            </div>
          )}

          {/* ── Processing stage ── */}
          {stage === "processing" && (
            <div className="text-center py-8">
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: "#0F766E12" }}
              >
                <Loader2
                  size={28}
                  className="animate-spin"
                  style={{ color: "#0F766E" }}
                />
              </div>
              <p
                style={{ fontSize: "0.9375rem", color: "#0F172A" }}
                className="mb-1"
              >
                AI is extracting product data...
              </p>
              <p
                style={{ fontSize: "0.8125rem", color: "#94A3B8" }}
                className="mb-4"
              >
                Processing <span style={{ color: "#0F172A" }}>{fileName}</span>
              </p>
              <div className="w-full max-w-xs mx-auto h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    background: "#0F766E",
                  }}
                />
              </div>
              <p
                className="mt-2"
                style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
              >
                {Math.min(Math.round(progress), 100)}%
              </p>
            </div>
          )}

          {/* ── Review stage (#2 inline edit) ── */}
          {stage === "review" && (
            <div>
              <p
                className="mb-1"
                style={{ fontSize: "0.8125rem", color: "#64748B" }}
              >
                AI extracted{" "}
                <span style={{ color: "#0F172A" }}>
                  {aiResults.length} products
                </span>{" "}
                from your file. Review and correct the pre-filled data below.
              </p>
              <p
                className="mb-4"
                style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
              >
                Click any field to edit. Low-confidence fields are highlighted
                with an amber border. Uncheck items you don't want to import.
              </p>

              <div className="space-y-3 mb-6">
                {aiResults.map((item, idx) => {
                  const confColor = CONFIDENCE_COLOR(item.confidence);
                  const isSelected = selected.has(idx);
                  const lowFields = item.lowConfidenceFields ?? [];

                  return (
                    <div
                      key={idx}
                      className={`border rounded-xl p-4 transition-colors ${
                        isSelected
                          ? "border-[#0F766E] bg-[#FAFFFE]"
                          : "border-[#E2E8F0] opacity-50"
                      }`}
                    >
                      {/* Row 1: checkbox + name + confidence */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => toggleItem(idx)}
                            className="flex-shrink-0 mt-0.5 h-auto w-auto p-0 hover:bg-transparent cursor-pointer"
                          >
                            {isSelected ? (
                              <CheckCircle2
                                size={18}
                                style={{ color: "#0F766E" }}
                              />
                            ) : (
                              <CircleDot
                                size={18}
                                style={{ color: "#CBD5E1" }}
                              />
                            )}
                          </Button>
                          <div className="flex-1 min-w-0">
                            <InlineEditInput
                              value={item.productName}
                              onChange={(v) =>
                                updateAIField(idx, "productName", v)
                              }
                              style={{
                                fontSize: "0.8125rem",
                                color: "#0F172A",
                              }}
                              warn={lowFields.includes("productName")}
                            />
                            <InlineEditInput
                              value={item.skuCode}
                              onChange={(v) => updateAIField(idx, "skuCode", v)}
                              style={{
                                fontSize: "0.6875rem",
                                color: "#64748B",
                                fontFamily: "monospace",
                              }}
                              warn={lowFields.includes("skuCode")}
                            />
                          </div>
                        </div>
                        <span
                          className="flex items-center gap-1 px-2 py-0.5 rounded-md flex-shrink-0"
                          style={{
                            fontSize: "0.625rem",
                            color: confColor,
                            background: confColor + "12",
                          }}
                        >
                          <Sparkles size={9} />
                          {Math.round(item.confidence * 100)}% match
                        </span>
                      </div>

                      {/* Row 2: description */}
                      <div className="ml-7 mb-2">
                        <InlineEditTextarea
                          value={item.description}
                          onChange={(v) => updateAIField(idx, "description", v)}
                          warn={lowFields.includes("description")}
                        />
                      </div>

                      {/* Row 3: metadata fields */}
                      <div className="ml-7 grid grid-cols-3 gap-2">
                        <InlineEditSelect
                          value={item.category}
                          options={SKU_CATEGORIES as unknown as string[]}
                          onChange={(v) => updateAIField(idx, "category", v)}
                          warn={lowFields.includes("category")}
                          label="Category"
                        />
                        <InlineEditInput
                          value={item.unitSize}
                          onChange={(v) => updateAIField(idx, "unitSize", v)}
                          style={{ fontSize: "0.6875rem", color: "#64748B" }}
                          warn={lowFields.includes("unitSize")}
                          placeholder="Unit size"
                        />
                        <InlineEditInput
                          value={item.abv}
                          onChange={(v) => updateAIField(idx, "abv", v)}
                          style={{ fontSize: "0.6875rem", color: "#64748B" }}
                          warn={lowFields.includes("abv")}
                          placeholder="ABV"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setStage("upload");
                    setFileName(null);
                    setAiResults([]);
                  }}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-[#F1F5F9] transition-colors h-auto cursor-pointer"
                  style={{ fontSize: "0.8125rem", color: "#64748B" }}
                >
                  <RotateCcw size={13} />
                  Upload different file
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={selected.size === 0}
                  className="px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 disabled:opacity-50 h-auto cursor-pointer"
                  style={{ background: "#0F766E", fontSize: "0.8125rem" }}
                >
                  Import {selected.size} product{selected.size !== 1 ? "s" : ""}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// ── #2 — Inline edit primitives for AI review cards ──────────────────────────

function InlineEditInput({
  value,
  onChange,
  style,
  warn,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  style?: React.CSSProperties;
  warn?: boolean;
  placeholder?: string;
}) {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return (
      <Input
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setEditing(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setEditing(false);
        }}
        className="w-full px-1.5 py-0.5 rounded border outline-none h-auto shadow-none"
        style={{
          ...style,
          borderColor: warn ? "#D97706" : "#0F766E",
          background: warn ? "#FFFBEB" : "#fff",
        }}
        placeholder={placeholder}
      />
    );
  }
  return (
    <Button
      variant="ghost"
      onClick={() => setEditing(true)}
      className="text-left w-full px-1.5 py-0.5 rounded transition-colors hover:bg-[#F1F5F9] group/ie h-auto justify-start font-normal cursor-pointer"
      style={{
        ...style,
        borderLeft: warn ? "2px solid #D97706" : "2px solid transparent",
      }}
      title="Click to edit"
    >
      {value || <span style={{ color: "#CBD5E1" }}>{placeholder ?? "—"}</span>}
      {warn && (
        <CircleAlert
          size={10}
          className="inline ml-1"
          style={{ color: "#D97706" }}
        />
      )}
    </Button>
  );
}

function InlineEditTextarea({
  value,
  onChange,
  warn,
}: {
  value: string;
  onChange: (v: string) => void;
  warn?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return (
      <Textarea
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setEditing(false)}
        rows={3}
        className="w-full px-2 py-1 rounded border outline-none resize-none shadow-none"
        style={{
          fontSize: "0.75rem",
          color: "#64748B",
          borderColor: warn ? "#D97706" : "#0F766E",
          background: warn ? "#FFFBEB" : "#fff",
        }}
      />
    );
  }
  return (
    <Button
      variant="ghost"
      onClick={() => setEditing(true)}
      className="text-left w-full px-2 py-1 rounded transition-colors hover:bg-[#F1F5F9] h-auto justify-start font-normal cursor-pointer"
      style={{
        fontSize: "0.75rem",
        color: "#94A3B8",
        borderLeft: warn ? "2px solid #D97706" : "2px solid transparent",
      }}
      title="Click to edit"
    >
      {value}
      {warn && (
        <CircleAlert
          size={10}
          className="inline ml-1"
          style={{ color: "#D97706" }}
        />
      )}
    </Button>
  );
}

function InlineEditSelect({
  value,
  options,
  onChange,
  warn,
  label: _label,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  warn?: boolean;
  label: string;
}) {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return (
      <select
        autoFocus
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setEditing(false);
        }}
        onBlur={() => setEditing(false)}
        className="w-full px-1.5 py-0.5 rounded border outline-none"
        style={{
          fontSize: "0.6875rem",
          borderColor: warn ? "#D97706" : "#0F766E",
          background: warn ? "#FFFBEB" : "#fff",
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }
  return (
    <Button
      variant="ghost"
      onClick={() => setEditing(true)}
      className="text-left w-full px-2 py-0.5 rounded-md bg-[#F1F5F9] transition-colors hover:bg-[#E2E8F0] h-auto justify-start font-normal cursor-pointer"
      style={{
        fontSize: "0.6875rem",
        color: "#64748B",
        borderLeft: warn ? "2px solid #D97706" : "2px solid transparent",
      }}
      title="Click to change"
    >
      {value}
      {warn && (
        <CircleAlert
          size={10}
          className="inline ml-1"
          style={{ color: "#D97706" }}
        />
      )}
    </Button>
  );
}

// =============================================================================
// Help Resources  (#1 rich text editor, #8 expand all/collapse all)
// =============================================================================

function HelpResources({
  faqs,
  setFaqs,
  unpushedCount,
}: {
  faqs: FAQItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQItem[]>>;
  unpushedCount: number;
}) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingFaq, setDeletingFaq] = useState<FAQItem | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [pushingId, setPushingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = faqs;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q),
      );
    }
    if (categoryFilter !== "all")
      result = result.filter((f) => f.category === categoryFilter);
    return result.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }, [faqs, search, categoryFilter]);

  const allExpanded =
    filtered.length > 0 && filtered.every((f) => expandedIds.has(f.id));

  // #8 — Expand all / Collapse all
  function toggleExpandAll() {
    if (allExpanded) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(filtered.map((f) => f.id)));
    }
  }

  function toggleExpanded(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleSave(faq: FAQItem) {
    setFaqs((prev) => {
      const exists = prev.find((f) => f.id === faq.id);
      if (exists)
        return prev.map((f) =>
          f.id === faq.id
            ? {
                ...faq,
                updatedAt: new Date().toISOString(),
                version: f.version + 1,
              }
            : f,
        );
      return [faq, ...prev];
    });
    setEditingFaq(null);
    setIsCreating(false);
    toast.success(isCreating ? "FAQ created" : "FAQ updated");
  }

  function handleDelete(id: string) {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    setDeletingFaq(null);
    toast.success("FAQ removed");
  }

  function handlePush(id: string) {
    setPushingId(id);
    setTimeout(() => {
      setFaqs((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, pushedAt: new Date().toISOString() } : f,
        ),
      );
      setPushingId(null);
      toast.success("FAQ pushed to field teams");
    }, 1200);
  }

  function handlePushAll() {
    setPushingId("all");
    setTimeout(() => {
      const now = new Date().toISOString();
      setFaqs((prev) => prev.map((f) => ({ ...f, pushedAt: now })));
      setPushingId(null);
      toast.success(`All ${faqs.length} FAQs pushed to field teams`);
    }, 2000);
  }

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          <div className="relative flex-1 max-w-xs">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "#94A3B8" }}
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full pl-9 pr-8 py-2 rounded-lg border border-[#E2E8F0] bg-white outline-none transition-colors focus:border-[#7D152D]"
              style={{ fontSize: "0.8125rem", color: "#0F172A" }}
            />
            {search && (
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 h-auto w-auto p-0 cursor-pointer"
              >
                <X size={12} style={{ color: "#94A3B8" }} />
              </Button>
            )}
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white cursor-pointer outline-none"
            style={{ fontSize: "0.8125rem", color: "#64748B" }}
          >
            <option value="all">All Categories</option>
            {FAQ_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* #8 — Expand / Collapse All */}
          {filtered.length > 0 && (
            <Button
              variant="outline"
              onClick={toggleExpandAll}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] transition-colors h-auto cursor-pointer"
              style={{ fontSize: "0.8125rem", color: "#64748B" }}
            >
              {allExpanded ? (
                <ChevronsDownUp size={14} />
              ) : (
                <ChevronsUpDown size={14} />
              )}
              {allExpanded ? "Collapse All" : "Expand All"}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unpushedCount > 0 && (
            <Button
              variant="outline"
              onClick={handlePushAll}
              disabled={pushingId === "all"}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#0F766E] hover:bg-[#ECFDF5] transition-colors disabled:opacity-60 h-auto cursor-pointer"
              style={{ fontSize: "0.8125rem", color: "#0F766E" }}
            >
              {pushingId === "all" ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Send size={14} />
              )}
              Push All ({unpushedCount})
            </Button>
          )}
          <Button
            onClick={() => {
              setIsCreating(true);
              setEditingFaq({
                id: "faq-new-" + Date.now(),
                question: "",
                answer: "",
                category: "",
                updatedAt: new Date().toISOString(),
                pushedAt: null,
                version: 1,
              });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 h-auto cursor-pointer"
            style={{ background: "#7D152D", fontSize: "0.8125rem" }}
          >
            <Plus size={14} />
            Add FAQ
          </Button>
        </div>
      </div>

      {/* Count */}
      <p className="mb-4" style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
        {filtered.length} FAQ{filtered.length !== 1 ? "s" : ""}
        {unpushedCount > 0 && (
          <span style={{ color: "#D97706" }}>
            {" "}
            &middot; {unpushedCount} pending push
          </span>
        )}
      </p>

      {/* FAQ List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center">
          <HelpCircle
            size={32}
            style={{ color: "#E2E8F0" }}
            className="mx-auto mb-3"
          />
          <p style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
            No FAQs match your filters.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((faq) => {
            const isExpanded = expandedIds.has(faq.id);
            const needsPush =
              !faq.pushedAt || new Date(faq.updatedAt) > new Date(faq.pushedAt);

            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden transition-shadow hover:shadow-sm"
              >
                {/* Question row */}
                <Button
                  variant="ghost"
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left h-auto justify-start font-normal cursor-pointer hover:bg-transparent"
                >
                  <ChevronRight
                    size={14}
                    className="flex-shrink-0 transition-transform"
                    style={{
                      color: "#94A3B8",
                      transform: isExpanded ? "rotate(90deg)" : "rotate(0)",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="truncate"
                      style={{ fontSize: "0.8125rem", color: "#0F172A" }}
                    >
                      {faq.question}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="px-1.5 py-0.5 rounded bg-[#F1F5F9]"
                        style={{ fontSize: "0.625rem", color: "#64748B" }}
                      >
                        {faq.category}
                      </span>
                      <span style={{ fontSize: "0.625rem", color: "#94A3B8" }}>
                        v{faq.version} &middot; {fmtDateTime(faq.updatedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {needsPush && (
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: "#D97706" }}
                        title="Needs push to field teams"
                      />
                    )}
                    {faq.pushedAt && !needsPush && (
                      <CheckCircle2
                        size={14}
                        style={{ color: "#0F766E" }}
                        className="flex-shrink-0"
                      />
                    )}
                  </div>
                </Button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-5 pb-4 border-t border-[#F1F5F9]">
                    <div
                      className="py-3 whitespace-pre-wrap"
                      style={{
                        fontSize: "0.8125rem",
                        color: "#334155",
                        lineHeight: 1.65,
                      }}
                    >
                      {renderFormattedText(faq.answer)}
                    </div>

                    <div className="flex items-center gap-4 pt-3 border-t border-[#F1F5F9] flex-wrap">
                      {faq.pushedAt && (
                        <span
                          className="flex items-center gap-1"
                          style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
                        >
                          <Send size={10} />
                          Last pushed {fmtDateTime(faq.pushedAt)}
                        </span>
                      )}
                      <div className="flex items-center gap-1 ml-auto">
                        {needsPush && (
                          <Button
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePush(faq.id);
                            }}
                            disabled={!!pushingId}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-[#ECFDF5] transition-colors disabled:opacity-60 h-auto cursor-pointer"
                            style={{ fontSize: "0.75rem", color: "#0F766E" }}
                          >
                            {pushingId === faq.id ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <Send size={12} />
                            )}
                            Push
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsCreating(false);
                            setEditingFaq(faq);
                          }}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors h-auto cursor-pointer"
                          style={{ fontSize: "0.75rem", color: "#64748B" }}
                        >
                          <Pencil size={12} /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingFaq(faq);
                          }}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-[#FEF2F2] transition-colors h-auto cursor-pointer"
                          style={{ fontSize: "0.75rem", color: "#B91C1C" }}
                        >
                          <Trash2 size={12} /> Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* FAQ Edit Modal — #1 structured content editor */}
      {editingFaq && (
        <FAQEditModal
          faq={editingFaq}
          isNew={isCreating}
          onSave={handleSave}
          onClose={() => {
            setEditingFaq(null);
            setIsCreating(false);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deletingFaq && (
        <DeleteConfirmDialog
          name={deletingFaq.question}
          onConfirm={() => handleDelete(deletingFaq.id)}
          onCancel={() => setDeletingFaq(null)}
        />
      )}
    </>
  );
}

// =============================================================================
// #1 — FAQ Edit Modal with structured content toolbar + live preview
// =============================================================================

function FAQEditModal({
  faq,
  isNew,
  onSave,
  onClose,
}: {
  faq: FAQItem;
  isNew: boolean;
  onSave: (f: FAQItem) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FAQItem>({ ...faq });
  const [showPreview, setShowPreview] = useState(false);
  const answerRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) {
      toast.error("Question and answer are required.");
      return;
    }
    onSave(form);
  }

  // #1 — Formatting helpers insert tokens at cursor
  function insertAtCursor(prefix: string, suffix: string = "") {
    const el = answerRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = form.answer;
    const selected = text.substring(start, end);
    const replacement = prefix + (selected || "text") + suffix;
    const newText =
      text.substring(0, start) + replacement + text.substring(end);
    setForm((p) => ({ ...p, answer: newText }));
    // Restore cursor after React re-render
    requestAnimationFrame(() => {
      el.focus();
      const cursorPos = start + prefix.length;
      el.setSelectionRange(cursorPos, cursorPos + (selected || "text").length);
    });
  }

  function insertLinePrefix(prefix: string) {
    const el = answerRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const text = form.answer;
    // Find start of current line
    const lineStart = text.lastIndexOf("\n", start - 1) + 1;
    const newText =
      text.substring(0, lineStart) + prefix + text.substring(lineStart);
    setForm((p) => ({ ...p, answer: newText }));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length);
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
          <h3 style={{ fontSize: "1rem", color: "#0F172A" }}>
            {isNew ? "Add FAQ" : "Edit FAQ"}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="p-1 hover:bg-[#F1F5F9] rounded-md transition-colors h-auto w-auto cursor-pointer"
          >
            <X size={16} style={{ color: "#64748B" }} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <FormField label="Category">
            <select
              value={form.category}
              onChange={(e) =>
                setForm((p) => ({ ...p, category: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
              style={{ fontSize: "0.8125rem" }}
            >
              <option value="">Select...</option>
              {FAQ_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Question *">
            <Input
              value={form.question}
              onChange={(e) =>
                setForm((p) => ({ ...p, question: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
              style={{ fontSize: "0.8125rem" }}
              placeholder="What should educators know about...?"
            />
          </FormField>

          {/* #1 — Answer with structured content toolbar */}
          <FormField label="Answer *">
            <div className="border border-[#E2E8F0] rounded-lg overflow-hidden focus-within:border-[#7D152D] transition-colors">
              {/* Formatting toolbar */}
              <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-[#E2E8F0] bg-[#FAFBFC]">
                <ToolbarBtn
                  icon={<Bold size={13} />}
                  title="Bold"
                  onClick={() => insertAtCursor("**", "**")}
                />
                <ToolbarBtn
                  icon={<Italic size={13} />}
                  title="Italic"
                  onClick={() => insertAtCursor("*", "*")}
                />
                <div className="w-px h-4 bg-[#E2E8F0] mx-1" />
                <ToolbarBtn
                  icon={<Heading2 size={13} />}
                  title="Heading"
                  onClick={() => insertLinePrefix("## ")}
                />
                <ToolbarBtn
                  icon={<ListIcon size={13} />}
                  title="Bullet list"
                  onClick={() => insertLinePrefix("• ")}
                />
                <ToolbarBtn
                  icon={<ListOrdered size={13} />}
                  title="Numbered list"
                  onClick={() => insertLinePrefix("1) ")}
                />
                <div className="flex-1" />
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-1 px-2 py-1 rounded-md transition-colors h-auto w-auto cursor-pointer"
                  style={{
                    fontSize: "0.625rem",
                    color: showPreview ? "#0F766E" : "#94A3B8",
                    background: showPreview ? "#ECFDF5" : "transparent",
                  }}
                >
                  <Eye size={11} />
                  Preview
                </Button>
              </div>

              {showPreview ? (
                /* Live preview pane */
                <div
                  className="px-3 py-3 min-h-[160px] whitespace-pre-wrap"
                  style={{
                    fontSize: "0.8125rem",
                    color: "#334155",
                    lineHeight: 1.65,
                  }}
                >
                  {form.answer ? (
                    renderFormattedText(form.answer)
                  ) : (
                    <span style={{ color: "#CBD5E1" }}>
                      Preview will appear here...
                    </span>
                  )}
                </div>
              ) : (
                <Textarea
                  ref={answerRef}
                  value={form.answer}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, answer: e.target.value }))
                  }
                  rows={8}
                  className="w-full px-3 py-2 outline-none resize-none shadow-none"
                  style={{ fontSize: "0.8125rem", lineHeight: 1.6 }}
                  placeholder="Provide a clear, detailed answer..."
                />
              )}
            </div>
          </FormField>

          <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
            Use the toolbar to format text. **Bold**, *italic*, • bullets, and
            ## headings are supported.
          </p>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors h-auto cursor-pointer"
              style={{ fontSize: "0.8125rem", color: "#64748B" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 h-auto cursor-pointer"
              style={{ background: "#7D152D", fontSize: "0.8125rem" }}
            >
              {isNew ? "Create FAQ" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Toolbar button ───────────────────────────────────────────────────────────

function ToolbarBtn({
  icon,
  title,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={onClick}
      title={title}
      className="p-1.5 rounded-md hover:bg-[#E2E8F0] transition-colors h-auto w-auto cursor-pointer"
      style={{ color: "#64748B" }}
    >
      {icon}
    </Button>
  );
}

// ── Shared form field ────────────────────────────────────────────────────────

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block mb-1.5"
        style={{
          fontSize: "0.6875rem",
          color: "#64748B",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
