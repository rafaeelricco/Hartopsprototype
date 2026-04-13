// =============================================================================
// Brand Assets — MM-UI-006  (polished)
// Two tabs: Product Library (SKU management + Auto Upload) and Help Resources.
// Polish pass addresses 8 spec gaps — see conversation for rationale.
// =============================================================================

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
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
  BookOpen,
  FileText,
  Download,
  Link as LinkIcon,
  Tag,
  Upload,
  Building2,
  ClipboardList,
  ImageIcon,
  Copy,
  ArrowUp,
  ArrowDown,
  GripVertical,
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
import {
  INITIAL_DOCUMENTS,
  DOCUMENT_TYPES,
  DOCUMENT_TYPE_STYLES,
  BRAND_LIST,
  FILE_TYPE_LABELS,
  type Brand,
  type BrandDocument,
  type DocumentType,
  type FileType,
} from "./brand-education-data";
import { INITIAL_CAMPAIGNS } from "./campaign-data";
import { INITIAL_EVENTS } from "./event-data";
import {
  CAMPAIGN_QUESTIONNAIRES,
  STANDARD_QUESTIONNAIRE,
} from "./questionnaire-data";
import type {
  QuestionnaireQuestion,
  QuestionnaireTemplate,
} from "../../shared/data/shared-types";

// ── Constants & helpers ──────────────────────────────────────────────────────

type Tab = "brands" | "products" | "education" | "questionnaires" | "help";
type ViewMode = "grid" | "list";
type SKUStatus = "active" | "discontinued" | "draft";

const QUESTION_TYPES = [
  "rating",
  "yes-no",
  "multiple-choice",
  "open-text",
  "dropdown",
] as const;

const QUESTION_CATEGORIES = [
  "venue",
  "consumer",
  "product",
  "compliance",
  "general",
] as const;

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
  const [tab, setTab] = useState<Tab>("brands");
  const [brands, setBrands] = useState<Brand[]>(BRAND_LIST);
  const [skus, setSkus] = useState<SKU[]>(INITIAL_SKUS);
  const [docs, setDocs] = useState<BrandDocument[]>(INITIAL_DOCUMENTS);
  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [templates, setTemplates] = useState<QuestionnaireTemplate[]>(() => [
    STANDARD_QUESTIONNAIRE,
    ...CAMPAIGN_QUESTIONNAIRES,
  ]);

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
        subtitle="Centralised library for brands, products, and the content that feeds your events and field teams."
      />

      {/* Tabs — #5 badges */}
      <div className="flex items-center gap-1 mb-6 border-b border-[#E2E8F0] overflow-x-auto">
        <TabButton
          active={tab === "brands"}
          icon={<Building2 size={15} />}
          label="Brands"
          badge={brands.length}
          onClick={() => setTab("brands")}
        />
        <TabButton
          active={tab === "products"}
          icon={<Package size={15} />}
          label="Product Library"
          badge={skus.length}
          onClick={() => setTab("products")}
        />
        <TabButton
          active={tab === "education"}
          icon={<BookOpen size={15} />}
          label="Brand Education"
          badge={docs.length}
          onClick={() => setTab("education")}
        />
        <TabButton
          active={tab === "questionnaires"}
          icon={<ClipboardList size={15} />}
          label="Questionnaires"
          badge={templates.length}
          onClick={() => setTab("questionnaires")}
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

      {tab === "brands" ? (
        <BrandLibrary
          brands={brands}
          setBrands={setBrands}
          skus={skus}
          setSkus={setSkus}
          docs={docs}
        />
      ) : tab === "products" ? (
        <ProductLibrary
          skus={skus}
          setSkus={setSkus}
          brands={brands}
          setBrands={setBrands}
          docs={docs}
        />
      ) : tab === "education" ? (
        <BrandEducationTab
          docs={docs}
          setDocs={setDocs}
          brands={brands}
          setBrands={setBrands}
        />
      ) : tab === "questionnaires" ? (
        <QuestionnairesTab templates={templates} setTemplates={setTemplates} />
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
// Usage joins — SKU/brand ↔ campaigns/events
// =============================================================================

type SkuUsage = {
  campaigns: { id: string; name: string }[];
  events: { id: string; name: string }[];
};

function getSkuUsage(skuId: string): SkuUsage {
  const campaigns: { id: string; name: string }[] = [];
  for (const c of INITIAL_CAMPAIGNS) {
    if (c.linkedProductIds?.includes(skuId)) {
      campaigns.push({ id: c.id, name: c.name });
    }
  }
  const events: { id: string; name: string }[] = [];
  for (const e of INITIAL_EVENTS) {
    if (e.sampleConfigs?.some((s) => s.skuId === skuId)) {
      events.push({ id: e.id, name: e.name });
    }
  }
  return { campaigns, events };
}

function getBrandUsage(brandId: string, skus: SKU[]): SkuUsage {
  const brandSkuIds = new Set(
    skus.filter((s) => s.brandId === brandId).map((s) => s.id),
  );
  const campaignsMap = new Map<string, string>();
  for (const c of INITIAL_CAMPAIGNS) {
    if (c.linkedProductIds?.some((id) => brandSkuIds.has(id))) {
      campaignsMap.set(c.id, c.name);
    }
  }
  const eventsMap = new Map<string, string>();
  for (const e of INITIAL_EVENTS) {
    if (e.sampleConfigs?.some((s) => brandSkuIds.has(s.skuId))) {
      eventsMap.set(e.id, e.name);
    }
  }
  return {
    campaigns: Array.from(campaignsMap, ([id, name]) => ({ id, name })),
    events: Array.from(eventsMap, ([id, name]) => ({ id, name })),
  };
}

// =============================================================================
// Brand Library (IMP-649 default landing tab)
// =============================================================================

function BrandLibrary({
  brands,
  setBrands,
  skus,
  setSkus,
  docs,
}: {
  brands: Brand[];
  setBrands: React.Dispatch<React.SetStateAction<Brand[]>>;
  skus: SKU[];
  setSkus: React.Dispatch<React.SetStateAction<SKU[]>>;
  docs: BrandDocument[];
}) {
  const [search, setSearch] = useState("");
  const [viewingBrand, setViewingBrand] = useState<Brand | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const filtered = useMemo(() => {
    if (!search) return brands;
    const q = search.toLowerCase();
    return brands.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        (b.supplier ?? "").toLowerCase().includes(q) ||
        (b.tags ?? []).some((t) => t.toLowerCase().includes(q)),
    );
  }, [brands, search]);

  const stats = useMemo(() => {
    const withStory = brands.filter(
      (b) => (b.story ?? "").trim().length > 0,
    ).length;
    const orphanSkus = skus.filter((s) => !s.brandId).length;
    return {
      total: brands.length,
      withStory,
      skus: skus.length,
      orphans: orphanSkus,
    };
  }, [brands, skus]);

  function handleSaveBrand(updated: Brand) {
    setBrands((prev) => {
      const exists = prev.find((b) => b.id === updated.id);
      const next = { ...updated, updatedAt: today() };
      if (exists) return prev.map((b) => (b.id === next.id ? next : b));
      return [next, ...prev];
    });
    // Keep the viewing drawer in sync
    setViewingBrand((prev) =>
      prev && prev.id === updated.id
        ? { ...updated, updatedAt: today() }
        : prev,
    );
  }

  function handleDeleteBrand(id: string) {
    // Detach from SKUs/docs but don't cascade-delete
    setSkus((prev) =>
      prev.map((s) => {
        if (s.brandId !== id) return s;
        const { brandId: _omit, ...rest } = s;
        return rest;
      }),
    );
    setBrands((prev) => prev.filter((b) => b.id !== id));
    setViewingBrand(null);
    toast.success("Brand removed");
  }

  return (
    <>
      {/* Stats */}
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          {
            label: "Brands",
            value: stats.total,
            color: "#0F172A",
            bg: "#F8FAFC",
          },
          {
            label: "With brand story",
            value: stats.withStory,
            color: "#0F766E",
            bg: "#ECFDF5",
          },
          {
            label: "Linked SKUs",
            value: stats.skus,
            color: "#7D152D",
            bg: "#FFF1F3",
          },
          {
            label: "SKUs without brand",
            value: stats.orphans,
            color: stats.orphans > 0 ? "#D97706" : "#94A3B8",
            bg: "#FFFBEB",
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
      </div> */}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "#94A3B8" }}
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brands, suppliers, tags..."
            className="w-full pl-9 pr-8 py-2 rounded-lg border border-[#E2E8F0] bg-white outline-none transition-colors focus:border-[#7D152D]"
            style={{ fontSize: "0.8125rem", color: "#0F172A" }}
          />
        </div>
        <Button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 h-auto cursor-pointer self-start sm:self-auto"
          style={{ background: "#7D152D", fontSize: "0.8125rem" }}
        >
          <Plus size={14} />
          Add Brand
        </Button>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center">
          <Building2
            size={32}
            style={{ color: "#E2E8F0" }}
            className="mx-auto mb-3"
          />
          <p style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
            No brands match your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((brand) => {
            const brandSkus = skus.filter((s) => s.brandId === brand.id);
            const brandDocs = docs.filter((d) => d.brandId === brand.id);
            const hasContent =
              (brand.story ?? "").trim().length > 0 ||
              (brand.keyTalkingPoints ?? []).length > 0;
            return (
              <div
                key={brand.id}
                className="bg-white rounded-xl border border-[#E2E8F0] p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setViewingBrand(brand)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] flex items-center justify-center overflow-hidden flex-shrink-0">
                    {brand.logoUrl ? (
                      <ImageWithFallback
                        src={brand.logoUrl}
                        alt={brand.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building2 size={18} style={{ color: "#94A3B8" }} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate"
                      style={{ fontSize: "0.9375rem", color: "#0F172A" }}
                    >
                      {brand.name}
                    </p>
                    {brand.supplier && (
                      <p
                        className="truncate"
                        style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
                      >
                        {brand.supplier}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2 py-0.5 rounded-md"
                    style={{
                      fontSize: "0.625rem",
                      background: "#F1F5F9",
                      color: "#64748B",
                    }}
                  >
                    {brandSkus.length} SKU{brandSkus.length !== 1 ? "s" : ""}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-md"
                    style={{
                      fontSize: "0.625rem",
                      background: "#F1F5F9",
                      color: "#64748B",
                    }}
                  >
                    {brandDocs.length} doc{brandDocs.length !== 1 ? "s" : ""}
                  </span>
                  {hasContent ? (
                    <span
                      className="px-2 py-0.5 rounded-md inline-flex items-center gap-1"
                      style={{
                        fontSize: "0.625rem",
                        background: "#ECFDF5",
                        color: "#0F766E",
                      }}
                    >
                      <CheckCircle2 size={9} /> Content
                    </span>
                  ) : (
                    <span
                      className="px-2 py-0.5 rounded-md inline-flex items-center gap-1"
                      style={{
                        fontSize: "0.625rem",
                        background: "#FFFBEB",
                        color: "#D97706",
                      }}
                    >
                      <CircleAlert size={9} /> Needs content
                    </span>
                  )}
                </div>
                {brand.updatedAt && (
                  <p style={{ fontSize: "0.625rem", color: "#94A3B8" }}>
                    Updated {fmtDate(brand.updatedAt)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {viewingBrand && (
        <BrandDetailDrawer
          brand={viewingBrand}
          skus={skus.filter((s) => s.brandId === viewingBrand.id)}
          docs={docs.filter((d) => d.brandId === viewingBrand.id)}
          usage={getBrandUsage(viewingBrand.id, skus)}
          onSave={handleSaveBrand}
          onDelete={() => handleDeleteBrand(viewingBrand.id)}
          onClose={() => setViewingBrand(null)}
        />
      )}

      {showCreate && (
        <QuickCreateBrandDialog
          existingBrands={brands}
          onCreate={(brand) => {
            setBrands((prev) => [{ ...brand, updatedAt: today() }, ...prev]);
            setShowCreate(false);
            setViewingBrand(brand);
            toast.success(`Brand "${brand.name}" created`);
          }}
          onCancel={() => setShowCreate(false)}
        />
      )}
    </>
  );
}

// ── Brand Detail Drawer ─────────────────────────────────────────────────────

function BrandDetailDrawer({
  brand,
  skus,
  docs,
  usage,
  onSave,
  onDelete,
  onClose,
}: {
  brand: Brand;
  skus: SKU[];
  docs: BrandDocument[];
  usage: SkuUsage;
  onSave: (b: Brand) => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Brand>({ ...brand });
  const [talkingPointDraft, setTalkingPointDraft] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const dirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(brand),
    [form, brand],
  );

  // Keep form in sync if the brand prop itself changes (e.g. after save).
  useEffect(() => {
    setForm({ ...brand });
  }, [brand]);

  function update<K extends keyof Brand>(key: K, val: Brand[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function handleLogoPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    update("logoUrl", URL.createObjectURL(file));
    toast.success("Logo attached");
  }

  function addTalkingPoint() {
    const val = talkingPointDraft.trim();
    if (!val) return;
    update("keyTalkingPoints", [...(form.keyTalkingPoints ?? []), val]);
    setTalkingPointDraft("");
  }

  function removeTalkingPoint(index: number) {
    const next = (form.keyTalkingPoints ?? []).filter((_, i) => i !== index);
    update("keyTalkingPoints", next);
  }

  function handleSave() {
    if (!form.name.trim()) {
      toast.error("Brand name is required.");
      return;
    }
    onSave(form);
    toast.success("Brand updated");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(15,23,42,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl h-full overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideInRight 0.25s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] flex items-center justify-center overflow-hidden flex-shrink-0">
              {form.logoUrl ? (
                <ImageWithFallback
                  src={form.logoUrl}
                  alt={form.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 size={18} style={{ color: "#94A3B8" }} />
              )}
            </div>
            <div className="min-w-0">
              <h3
                className="truncate"
                style={{ fontSize: "1rem", color: "#0F172A" }}
              >
                {form.name || "New Brand"}
              </h3>
              {form.supplier && (
                <p
                  className="truncate"
                  style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                >
                  {form.supplier}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setConfirmDelete(true)}
              className="p-2 rounded-lg hover:bg-[#FEF2F2] transition-colors h-auto w-auto cursor-pointer"
              aria-label="Remove brand"
            >
              <Trash2 size={14} style={{ color: "#B91C1C" }} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[#F1F5F9] transition-colors h-auto w-auto cursor-pointer"
            >
              <X size={16} style={{ color: "#64748B" }} />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Core fields */}
          <section>
            <h4
              className="mb-3"
              style={{
                fontSize: "0.6875rem",
                color: "#94A3B8",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Brand
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden flex items-center justify-center flex-shrink-0">
                  {form.logoUrl ? (
                    <ImageWithFallback
                      src={form.logoUrl}
                      alt={form.name || "Brand logo"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon size={18} style={{ color: "#CBD5E1" }} />
                  )}
                </div>
                <div>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoPick}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => logoInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors h-auto cursor-pointer"
                    style={{ fontSize: "0.75rem", color: "#0F172A" }}
                  >
                    <Upload size={12} />
                    {form.logoUrl ? "Replace logo" : "Upload logo"}
                  </Button>
                  {form.logoUrl && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => update("logoUrl", "")}
                      className="ml-2 px-2 py-2 rounded-lg hover:bg-[#FEF2F2] h-auto cursor-pointer"
                      style={{ fontSize: "0.6875rem", color: "#B91C1C" }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Name *">
                  <Input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
                    style={{ fontSize: "0.8125rem" }}
                  />
                </FormField>
                <FormField label="Supplier">
                  <Input
                    value={form.supplier ?? ""}
                    onChange={(e) => update("supplier", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
                    style={{ fontSize: "0.8125rem" }}
                    placeholder="e.g. Pernod Ricard"
                  />
                </FormField>
              </div>
            </div>
          </section>

          {/* Product Info — canonical per-brand content */}
          <section>
            <h4
              className="mb-3"
              style={{
                fontSize: "0.6875rem",
                color: "#94A3B8",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Product info (seen by educators)
            </h4>
            <div className="space-y-3">
              <FormField label="Brand story">
                <Textarea
                  value={form.story ?? ""}
                  onChange={(e) => update("story", e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D] resize-y"
                  style={{ fontSize: "0.8125rem", lineHeight: 1.6 }}
                  placeholder="## Heading&#10;**Bold**, *italic* supported. Tell the brand's origin, what makes it distinctive, and the hook educators should open with."
                />
                {form.story && (
                  <div
                    className="mt-2 rounded-lg border border-[#E2E8F0] bg-[#FAFBFC] p-3"
                    style={{
                      fontSize: "0.75rem",
                      color: "#334155",
                      lineHeight: 1.6,
                    }}
                  >
                    <p
                      className="mb-1.5"
                      style={{ fontSize: "0.625rem", color: "#94A3B8" }}
                    >
                      Preview
                    </p>
                    {renderFormattedText(form.story)}
                  </div>
                )}
              </FormField>

              <FormField label="Key talking points">
                <div className="space-y-1.5 mb-2">
                  {(form.keyTalkingPoints ?? []).map((tp, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white"
                      style={{ fontSize: "0.75rem", color: "#334155" }}
                    >
                      <CheckCircle2
                        size={12}
                        style={{ color: "#0F766E" }}
                        className="flex-shrink-0"
                      />
                      <span className="flex-1">{tp}</span>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => removeTalkingPoint(i)}
                        className="h-auto w-auto p-0.5 hover:bg-[#FEF2F2] rounded cursor-pointer"
                      >
                        <X size={10} style={{ color: "#94A3B8" }} />
                      </Button>
                    </div>
                  ))}
                  {(form.keyTalkingPoints ?? []).length === 0 && (
                    <p
                      className="italic"
                      style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
                    >
                      No talking points yet. Add bite-sized facts educators can
                      rattle off under 10 seconds.
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    value={talkingPointDraft}
                    onChange={(e) => setTalkingPointDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTalkingPoint();
                      }
                    }}
                    placeholder="Add a talking point and press Enter"
                    className="flex-1 px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
                    style={{ fontSize: "0.75rem" }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTalkingPoint}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] h-auto cursor-pointer"
                    style={{ fontSize: "0.75rem", color: "#0F172A" }}
                  >
                    <Plus size={12} /> Add
                  </Button>
                </div>
              </FormField>

              <FormField label="Compliance notes">
                <Textarea
                  value={form.complianceNotes ?? ""}
                  onChange={(e) => update("complianceNotes", e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D] resize-none"
                  style={{ fontSize: "0.75rem" }}
                  placeholder="ID requirements, pour limits, venue restrictions..."
                />
              </FormField>
            </div>
          </section>

          {/* Linked SKUs */}
          <section>
            <h4
              className="mb-2 flex items-center justify-between"
              style={{
                fontSize: "0.6875rem",
                color: "#94A3B8",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              <span>Products ({skus.length})</span>
            </h4>
            {skus.length === 0 ? (
              <p
                className="italic"
                style={{ fontSize: "0.75rem", color: "#94A3B8" }}
              >
                No SKUs linked. Assign a brand when creating a product in the
                Products tab.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {skus.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white"
                  >
                    <div className="w-8 h-8 rounded bg-[#F1F5F9] overflow-hidden flex-shrink-0">
                      {s.imageUrl && (
                        <ImageWithFallback
                          src={s.imageUrl}
                          alt={s.productName}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p
                        className="truncate"
                        style={{ fontSize: "0.75rem", color: "#0F172A" }}
                      >
                        {s.productName}
                      </p>
                      <p
                        className="truncate font-mono"
                        style={{ fontSize: "0.625rem", color: "#94A3B8" }}
                      >
                        {s.skuCode}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Linked docs */}
          <section>
            <h4
              className="mb-2"
              style={{
                fontSize: "0.6875rem",
                color: "#94A3B8",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Content ({docs.length})
            </h4>
            {docs.length === 0 ? (
              <p
                className="italic"
                style={{ fontSize: "0.75rem", color: "#94A3B8" }}
              >
                No documents yet. Upload serving guides or scripts from the
                Brand Education tab.
              </p>
            ) : (
              <div className="space-y-1.5">
                {docs.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white"
                    style={{ fontSize: "0.75rem", color: "#334155" }}
                  >
                    <FileText size={12} style={{ color: "#7D152D" }} />
                    <span className="truncate flex-1">{d.title}</span>
                    <span style={{ fontSize: "0.625rem", color: "#94A3B8" }}>
                      {d.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Usage */}
          <section>
            <h4
              className="mb-2"
              style={{
                fontSize: "0.6875rem",
                color: "#94A3B8",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Usage
            </h4>
            <div className="flex items-center gap-3">
              <span
                className="px-2 py-1 rounded-md"
                style={{
                  fontSize: "0.6875rem",
                  background: "#7D152D14",
                  color: "#7D152D",
                }}
              >
                {usage.campaigns.length} campaign
                {usage.campaigns.length !== 1 ? "s" : ""}
              </span>
              <span
                className="px-2 py-1 rounded-md"
                style={{
                  fontSize: "0.6875rem",
                  background: "#0F766E14",
                  color: "#0F766E",
                }}
              >
                {usage.events.length} event
                {usage.events.length !== 1 ? "s" : ""}
              </span>
            </div>
          </section>
        </div>

        {/* Sticky footer */}
        <div className="sticky bottom-0 bg-white border-t border-[#E2E8F0] px-6 py-3 flex items-center justify-between">
          <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
            {brand.updatedAt
              ? `Updated ${fmtDate(brand.updatedAt)}`
              : "Unsaved brand"}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={onClose}
              className="px-4 py-2 rounded-lg hover:bg-[#F1F5F9] h-auto cursor-pointer"
              style={{ fontSize: "0.8125rem", color: "#64748B" }}
            >
              Close
            </Button>
            <Button
              onClick={handleSave}
              disabled={!dirty}
              className="px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 disabled:opacity-50 h-auto cursor-pointer"
              style={{ background: "#7D152D", fontSize: "0.8125rem" }}
            >
              Save changes
            </Button>
          </div>
        </div>
      </div>

      {confirmDelete && (
        <DeleteConfirmDialog
          name={brand.name}
          onConfirm={() => {
            setConfirmDelete(false);
            onDelete();
          }}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </div>
  );
}

// ── Quick Create Brand Dialog ────────────────────────────────────────────────

function QuickCreateBrandDialog({
  existingBrands,
  onCreate,
  onCancel,
}: {
  existingBrands: Brand[];
  onCreate: (brand: Brand) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [supplier, setSupplier] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Brand name is required.");
      return;
    }
    if (
      existingBrands.some(
        (b) => b.name.trim().toLowerCase() === trimmed.toLowerCase(),
      )
    ) {
      toast.error("A brand with that name already exists.");
      return;
    }
    const trimmedSupplier = supplier.trim();
    const brand: Brand = {
      id: `brand-${trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
      name: trimmed,
      updatedAt: today(),
      ...(trimmedSupplier ? { supplier: trimmedSupplier } : {}),
    };
    onCreate(brand);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)" }}
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
          <h3 style={{ fontSize: "1rem", color: "#0F172A" }}>Create brand</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="p-1 hover:bg-[#F1F5F9] rounded-md h-auto w-auto cursor-pointer"
          >
            <X size={16} style={{ color: "#64748B" }} />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          <FormField label="Name *">
            <Input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sunny Ridge Cider"
              className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
              style={{ fontSize: "0.8125rem" }}
            />
          </FormField>
          <FormField label="Supplier">
            <Input
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              placeholder="Optional"
              className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
              style={{ fontSize: "0.8125rem" }}
            />
          </FormField>
          <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
            You can add the brand story, talking points, and logo after creating
            the brand.
          </p>
          <div className="flex items-center justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] h-auto cursor-pointer"
              style={{ fontSize: "0.8125rem", color: "#64748B" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 rounded-lg text-white hover:opacity-90 h-auto cursor-pointer"
              style={{ background: "#7D152D", fontSize: "0.8125rem" }}
            >
              Create brand
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function today(): string {
  return new Date().toISOString().split("T")[0] ?? "";
}

// =============================================================================
// Product Library  (#4 stat cards, #6 detail view, #7 filter chips)
// =============================================================================

function ProductLibrary({
  skus,
  setSkus,
  brands,
  setBrands,
  docs,
}: {
  skus: SKU[];
  setSkus: React.Dispatch<React.SetStateAction<SKU[]>>;
  brands: Brand[];
  setBrands: React.Dispatch<React.SetStateAction<Brand[]>>;
  docs: BrandDocument[];
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
  // const stats = useMemo(() => {
  //   const active = skus.filter((s) => s.status === "active").length;
  //   const draft = skus.filter((s) => s.status === "draft").length;
  //   const disc = skus.filter((s) => s.status === "discontinued").length;
  //   return { total: skus.length, active, draft, disc };
  // }, [skus]);

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
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
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
      </div> */}

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
          brand={brands.find((b) => b.id === viewingSku.brandId)}
          docs={docs.filter((d) => d.brandId === viewingSku.brandId)}
          usage={getSkuUsage(viewingSku.id)}
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
          brands={brands}
          onCreateBrand={(brand) => setBrands((prev) => [...prev, brand])}
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
  brand,
  docs,
  usage,
  onEdit,
  onDelete,
  onClose,
}: {
  sku: SKU;
  brand?: Brand | undefined;
  docs: BrandDocument[];
  usage: SkuUsage;
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

          {/* Brand — inherited content educators will see */}
          {brand && (
            <div className="mb-5 rounded-xl border border-[#E2E8F0] bg-[#FAFBFC] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 size={13} style={{ color: "#7D152D" }} />
                <p style={{ fontSize: "0.75rem", color: "#7D152D" }}>
                  From {brand.name}
                  {brand.supplier ? ` · ${brand.supplier}` : ""}
                </p>
              </div>
              {brand.story ? (
                <div
                  className="mb-3"
                  style={{
                    fontSize: "0.8125rem",
                    color: "#334155",
                    lineHeight: 1.6,
                  }}
                >
                  {renderFormattedText(brand.story)}
                </div>
              ) : (
                <p
                  className="mb-3 italic"
                  style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                >
                  No brand story yet. Add one in the Brands tab so educators see
                  it in the field.
                </p>
              )}
              {brand.keyTalkingPoints && brand.keyTalkingPoints.length > 0 && (
                <div>
                  <p
                    className="mb-1"
                    style={{
                      fontSize: "0.6875rem",
                      color: "#94A3B8",
                      letterSpacing: "0.03em",
                    }}
                  >
                    Key talking points
                  </p>
                  <ul
                    className="list-disc pl-4 space-y-0.5"
                    style={{ fontSize: "0.75rem", color: "#475569" }}
                  >
                    {brand.keyTalkingPoints.map((tp, i) => (
                      <li key={i}>{tp}</li>
                    ))}
                  </ul>
                </div>
              )}
              {brand.complianceNotes && (
                <div
                  className="mt-3 rounded-md px-3 py-2"
                  style={{ background: "#FEF2F2" }}
                >
                  <p
                    className="flex items-start gap-1.5"
                    style={{ fontSize: "0.6875rem", color: "#B91C1C" }}
                  >
                    <AlertTriangle size={11} className="mt-0.5 flex-shrink-0" />
                    <span>{brand.complianceNotes}</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Linked brand education documents */}
          {docs.length > 0 && (
            <div className="mb-5">
              <p
                className="mb-2"
                style={{
                  fontSize: "0.6875rem",
                  color: "#94A3B8",
                  letterSpacing: "0.03em",
                }}
              >
                Brand education ({docs.length})
              </p>
              <div className="space-y-1.5">
                {docs.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white"
                    style={{ fontSize: "0.75rem", color: "#475569" }}
                  >
                    <FileText size={13} style={{ color: "#7D152D" }} />
                    <span className="truncate flex-1">{d.title}</span>
                    <span style={{ fontSize: "0.625rem", color: "#94A3B8" }}>
                      {d.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Usage across campaigns/events */}
          <div className="mb-5">
            <p
              className="mb-2"
              style={{
                fontSize: "0.6875rem",
                color: "#94A3B8",
                letterSpacing: "0.03em",
              }}
            >
              Usage
            </p>
            {usage.campaigns.length === 0 && usage.events.length === 0 ? (
              <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                Not linked to any campaigns or events yet.
              </p>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span
                    className="px-2 py-0.5 rounded-md"
                    style={{
                      fontSize: "0.6875rem",
                      background: "#7D152D14",
                      color: "#7D152D",
                    }}
                  >
                    {usage.campaigns.length} campaign
                    {usage.campaigns.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="px-2 py-0.5 rounded-md"
                    style={{
                      fontSize: "0.6875rem",
                      background: "#0F766E14",
                      color: "#0F766E",
                    }}
                  >
                    {usage.events.length} event
                    {usage.events.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            )}
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
  brands,
  onCreateBrand,
  onSave,
  onClose,
}: {
  sku: SKU;
  isNew: boolean;
  brands: Brand[];
  onCreateBrand: (brand: Brand) => void;
  onSave: (s: SKU) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<SKU>({ ...sku });
  const [showCreateBrand, setShowCreateBrand] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof SKU>(key: K, val: SKU[K]) {
    setForm((prev) => ({
      ...prev,
      [key]: val,
      updatedAt: new Date().toISOString().split("T")[0] ?? "",
    }));
  }

  function handleImagePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Prototype-only: store a blob URL in state. No real upload/persistence.
    const blobUrl = URL.createObjectURL(file);
    update("imageUrl", blobUrl);
    toast.success(`Image "${file.name}" attached`);
  }

  function handleBrandSelectChange(value: string) {
    if (value === "__create__") {
      setShowCreateBrand(true);
      return;
    }
    setForm((prev) => {
      const { brandId: _drop, ...rest } = prev;
      void _drop;
      const next = value ? { ...rest, brandId: value } : rest;
      return { ...next, updatedAt: today() };
    });
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

          <FormField label="Brand">
            <select
              value={form.brandId ?? ""}
              onChange={(e) => handleBrandSelectChange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
              style={{ fontSize: "0.8125rem" }}
            >
              <option value="">No brand</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
              <option value="__create__">+ Create new brand…</option>
            </select>
          </FormField>

          <FormField label="Product Image">
            <div className="flex items-center gap-3">
              <div
                className="w-20 h-20 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden flex items-center justify-center flex-shrink-0"
                aria-label="Product image preview"
              >
                {form.imageUrl ? (
                  <ImageWithFallback
                    src={form.imageUrl}
                    alt={form.productName || "Product image"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={20} style={{ color: "#CBD5E1" }} />
                )}
              </div>
              <div className="flex-1">
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImagePick}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => imageInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors h-auto cursor-pointer"
                  style={{ fontSize: "0.75rem", color: "#0F172A" }}
                >
                  <Upload size={13} />
                  {form.imageUrl ? "Replace image" : "Upload image"}
                </Button>
                {form.imageUrl && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => update("imageUrl", "")}
                    className="ml-2 px-2 py-2 rounded-lg hover:bg-[#FEF2F2] h-auto cursor-pointer"
                    style={{ fontSize: "0.6875rem", color: "#B91C1C" }}
                  >
                    Remove
                  </Button>
                )}
                <p
                  className="mt-1"
                  style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
                >
                  Educators see this in the mobile app. Prototype stores a local
                  preview only.
                </p>
              </div>
            </div>
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

      {showCreateBrand && (
        <QuickCreateBrandDialog
          existingBrands={brands}
          onCreate={(brand) => {
            onCreateBrand(brand);
            update("brandId", brand.id);
            setShowCreateBrand(false);
            toast.success(`Brand "${brand.name}" created`);
          }}
          onCancel={() => setShowCreateBrand(false)}
        />
      )}
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

// Exact headers expected in the CSV template. Order matters.
const TEMPLATE_COLUMNS = [
  "skuCode",
  "productName",
  "description",
  "category",
  "unitSize",
  "abv",
  "unitPrice",
] as const;

/**
 * Parse a CSV file into rows respecting quoted fields. Returns null when the
 * file doesn't match the expected template header exactly — caller should
 * fall back to AI extraction in that case.
 */
function parseTemplateCsv(text: string): string[][] | null {
  const lines = text
    .replace(/\uFEFF/g, "")
    .split(/\r?\n/)
    .filter((l) => l.trim().length > 0);
  if (lines.length === 0) return null;
  const parseRow = (line: string): string[] => {
    const out: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inQuotes) {
        if (ch === '"' && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else if (ch === '"') {
          inQuotes = false;
        } else {
          cur += ch;
        }
      } else {
        if (ch === '"') inQuotes = true;
        else if (ch === ",") {
          out.push(cur);
          cur = "";
        } else cur += ch;
      }
    }
    out.push(cur);
    return out.map((c) => c.trim());
  };
  const header = parseRow(lines[0] ?? "");
  const matches =
    header.length === TEMPLATE_COLUMNS.length &&
    TEMPLATE_COLUMNS.every(
      (col, i) => header[i]?.toLowerCase() === col.toLowerCase(),
    );
  if (!matches) return null;
  return lines.slice(1).map(parseRow);
}

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
  const [templateMatch, setTemplateMatch] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Process file — shared between click-upload and drag-drop.
  // Branches on whether the file matches the official CSV template:
  //   - match → parse directly, skip AI, full confidence
  //   - no match → fall through to mock AI extraction
  const processFile = useCallback((file: File) => {
    setFileName(file.name);
    setStage("processing");
    setProgress(0);

    const applyTemplateResults = (results: AIPrefilledSKU[]) => {
      setTemplateMatch(true);
      setAiResults(results);
      setSelected(new Set(results.map((_, i) => i)));
      setProgress(100);
      setTimeout(() => setStage("review"), 250);
    };

    const applyAiResults = () => {
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
        setTemplateMatch(false);
        setAiResults(results);
        setSelected(new Set(results.map((_, i) => i)));
        setTimeout(() => setStage("review"), 400);
      }, 2800);
    };

    const isCsv = file.name.toLowerCase().endsWith(".csv");
    if (!isCsv) {
      applyAiResults();
      return;
    }

    file
      .text()
      .then((text) => {
        const rows = parseTemplateCsv(text);
        if (!rows || rows.length === 0) {
          applyAiResults();
          return;
        }
        const mapped: AIPrefilledSKU[] = rows.map((row) => ({
          skuCode: row[0] ?? "",
          productName: row[1] ?? "",
          description: row[2] ?? "",
          category: row[3] ?? "",
          unitSize: row[4] ?? "",
          abv: row[5] ?? "",
          confidence: 1,
          lowConfidenceFields: [],
        }));
        applyTemplateResults(mapped);
      })
      .catch(() => applyAiResults());
  }, []);

  function handleDownloadTemplate() {
    // Anchor download — file lives in /public/templates so Vite serves it as-is.
    const a = document.createElement("a");
    a.href = "/templates/products-template.csv";
    a.download = "products-template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Template downloaded");
  }

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
                      ? templateMatch
                        ? "Parsing"
                        : "AI Processing"
                      : "Review"}
                </span>
              </div>
            ))}
          </div>

          {/* ── Upload stage (#3 drag-and-drop) ── */}
          {stage === "upload" && (
            <div>
              <p
                className="mb-3"
                style={{ fontSize: "0.8125rem", color: "#64748B" }}
              >
                Upload a CSV or Excel file containing product data. Matching
                files from our template import instantly; everything else is
                pre-filled by AI for your review.
              </p>
              <div className="mb-4 flex items-center justify-between gap-2 rounded-lg border border-dashed border-[#E2E8F0] px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <FileSpreadsheet size={14} style={{ color: "#0F766E" }} />
                  <p
                    className="truncate"
                    style={{ fontSize: "0.75rem", color: "#64748B" }}
                  >
                    Use the template for a fast, zero-AI import.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDownloadTemplate}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-[#E2E8F0] hover:bg-[#F8FAFC] h-auto cursor-pointer flex-shrink-0"
                  style={{ fontSize: "0.6875rem", color: "#0F172A" }}
                >
                  <Download size={11} />
                  Download template
                </Button>
              </div>
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
                {templateMatch ? "Parsed" : "AI extracted"}{" "}
                <span style={{ color: "#0F172A" }}>
                  {aiResults.length} products
                </span>{" "}
                from your file. Review and correct the pre-filled data below.
              </p>
              <p
                className="mb-4"
                style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
              >
                {templateMatch
                  ? "Template match — every field imported at full confidence. Edit any cell to tweak before importing."
                  : "Click any field to edit. Low-confidence fields are highlighted with an amber border. Uncheck items you don't want to import."}
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
                    setTemplateMatch(false);
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
// Brand Education Tab
// =============================================================================

function BrandEducationTab({
  docs,
  setDocs,
  brands,
  setBrands,
}: {
  docs: BrandDocument[];
  setDocs: React.Dispatch<React.SetStateAction<BrandDocument[]>>;
  brands: Brand[];
  setBrands: React.Dispatch<React.SetStateAction<Brand[]>>;
}) {
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [campaignFilter, setCampaignFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewingDoc, setViewingDoc] = useState<BrandDocument | null>(null);
  const [editingDoc, setEditingDoc] = useState<BrandDocument | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingDoc, setDeletingDoc] = useState<BrandDocument | null>(null);

  const hasFilters =
    search !== "" ||
    brandFilter !== "all" ||
    typeFilter !== "all" ||
    campaignFilter !== "all" ||
    statusFilter !== "all";

  const filtered = useMemo(() => {
    let result = docs;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.brandName.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    if (brandFilter !== "all")
      result = result.filter((d) => d.brandId === brandFilter);
    if (typeFilter !== "all")
      result = result.filter((d) => d.type === typeFilter);
    if (campaignFilter !== "all")
      result = result.filter((d) =>
        d.linkedCampaignIds.includes(campaignFilter),
      );
    if (statusFilter !== "all")
      result = result.filter((d) => d.status === statusFilter);
    return result.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }, [docs, search, brandFilter, typeFilter, campaignFilter, statusFilter]);

  // Stat counts
  const stats = useMemo(() => {
    const byType: Record<string, number> = {};
    for (const t of DOCUMENT_TYPES) byType[t] = 0;
    docs.forEach((d) => {
      byType[d.type] = (byType[d.type] ?? 0) + 1;
    });
    const active = docs.filter((d) => d.status === "active").length;
    const draft = docs.filter((d) => d.status === "draft").length;
    return { total: docs.length, active, draft, byType };
  }, [docs]);

  // Available campaigns from linked docs
  const linkedCampaignIds = useMemo(() => {
    const ids = new Set<string>();
    docs.forEach((d) => d.linkedCampaignIds.forEach((c) => ids.add(c)));
    return Array.from(ids);
  }, [docs]);

  function handleSave(doc: BrandDocument) {
    setDocs((prev) => {
      const exists = prev.find((d) => d.id === doc.id);
      if (exists) return prev.map((d) => (d.id === doc.id ? doc : d));
      return [doc, ...prev];
    });
    setEditingDoc(null);
    setIsCreating(false);
    toast.success(isCreating ? "Document added" : "Document updated");
  }

  function handleDelete(id: string) {
    setDocs((prev) => prev.filter((d) => d.id !== id));
    setDeletingDoc(null);
    setViewingDoc(null);
    toast.success("Document removed");
  }

  function clearFilters() {
    setSearch("");
    setBrandFilter("all");
    setTypeFilter("all");
    setCampaignFilter("all");
    setStatusFilter("all");
  }

  const DOC_STATUS_STYLE: Record<
    string,
    { bg: string; text: string; label: string }
  > = {
    active: { bg: "#ECFDF5", text: "#0F766E", label: "Active" },
    archived: { bg: "#F1F5F9", text: "#64748B", label: "Archived" },
    draft: { bg: "#FFF7ED", text: "#C2410C", label: "Draft" },
  };

  return (
    <>
      {/* Stat cards */}
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          {
            label: "Total Documents",
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
            color: "#C2410C",
            bg: "#FFF7ED",
          },
          {
            label: "Brands Covered",
            value: new Set(docs.map((d) => d.brandId)).size,
            color: "#1D4ED8",
            bg: "#EFF6FF",
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
      </div> */}

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
              placeholder="Search documents..."
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

          {/* Brand filter */}
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white cursor-pointer outline-none"
            style={{ fontSize: "0.8125rem", color: "#64748B" }}
          >
            <option value="all">All Brands</option>
            {BRAND_LIST.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white cursor-pointer outline-none"
            style={{ fontSize: "0.8125rem", color: "#64748B" }}
          >
            <option value="all">All Types</option>
            {DOCUMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Campaign filter */}
          <select
            value={campaignFilter}
            onChange={(e) => setCampaignFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white cursor-pointer outline-none"
            style={{ fontSize: "0.8125rem", color: "#64748B" }}
          >
            <option value="all">All Campaigns</option>
            {linkedCampaignIds.map((cid) => {
              const camp = INITIAL_CAMPAIGNS.find((c) => c.id === cid);
              return (
                <option key={cid} value={cid}>
                  {camp?.name ?? cid}
                </option>
              );
            })}
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
            <option value="archived">Archived</option>
          </select>
        </div>

        <Button
          onClick={() => {
            setIsCreating(true);
            setEditingDoc({
              id: "doc-new-" + Date.now(),
              title: "",
              description: "",
              type: "General",
              fileUrl: "",
              fileName: "",
              fileType: "pdf",
              fileSizeKB: 0,
              brandName: "",
              brandId: "",
              linkedCampaignIds: [],
              linkedEventIds: [],
              tags: [],
              status: "draft",
              createdAt: new Date().toISOString().split("T")[0] ?? "",
              updatedAt: new Date().toISOString().split("T")[0] ?? "",
              createdBy: "Jane Smith",
            });
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 h-auto cursor-pointer"
          style={{ background: "#7D152D", fontSize: "0.8125rem" }}
        >
          <Plus size={14} />
          Add Document
        </Button>
      </div>

      {/* Active filter indicator */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
          {filtered.length} document{filtered.length !== 1 ? "s" : ""} found
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
            {brandFilter !== "all" && (
              <FilterChip
                label={
                  BRAND_LIST.find((b) => b.id === brandFilter)?.name ??
                  brandFilter
                }
                onRemove={() => setBrandFilter("all")}
              />
            )}
            {typeFilter !== "all" && (
              <FilterChip
                label={typeFilter}
                onRemove={() => setTypeFilter("all")}
              />
            )}
            {campaignFilter !== "all" && (
              <FilterChip
                label={
                  INITIAL_CAMPAIGNS.find((c) => c.id === campaignFilter)
                    ?.name ?? campaignFilter
                }
                onRemove={() => setCampaignFilter("all")}
              />
            )}
            {statusFilter !== "all" && (
              <FilterChip
                label={DOC_STATUS_STYLE[statusFilter]?.label ?? statusFilter}
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

      {/* Document list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center">
          <BookOpen
            size={32}
            style={{ color: "#E2E8F0" }}
            className="mx-auto mb-3"
          />
          <p style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
            No documents match your filters.
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
      ) : (
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
          <div className="overflow-x-auto">
            <table
              className="w-full min-w-[900px]"
              style={{ borderCollapse: "separate", borderSpacing: 0 }}
            >
              <thead>
                <tr className="border-b border-[#E2E8F0]">
                  {[
                    "Document",
                    "Type",
                    "Brand",
                    "Campaigns",
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
                {filtered.map((doc) => {
                  const typeStyle = DOCUMENT_TYPE_STYLES[doc.type];
                  const statusStyle = (DOC_STATUS_STYLE[doc.status] ??
                    DOC_STATUS_STYLE["draft"])!;
                  return (
                    <tr
                      key={doc.id}
                      className="border-b border-[#F8FAFC] last:border-0 hover:bg-[#FAFBFC] transition-colors cursor-pointer"
                      onClick={() => setViewingDoc(doc)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: typeStyle.bg }}
                          >
                            {(() => {
                              const Icon = typeStyle.icon;
                              return (
                                <Icon
                                  size={16}
                                  style={{ color: typeStyle.text }}
                                />
                              );
                            })()}
                          </div>
                          <div className="min-w-0">
                            <p
                              className="truncate max-w-[280px]"
                              style={{
                                fontSize: "0.8125rem",
                                color: "#0F172A",
                              }}
                            >
                              {doc.title}
                            </p>
                            <p
                              className="truncate max-w-[280px]"
                              style={{
                                fontSize: "0.625rem",
                                color: "#94A3B8",
                              }}
                            >
                              {doc.fileName} &middot;{" "}
                              {doc.fileSizeKB >= 1000
                                ? `${(doc.fileSizeKB / 1024).toFixed(1)} MB`
                                : `${doc.fileSizeKB} KB`}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="px-2 py-0.5 rounded-md"
                          style={{
                            fontSize: "0.625rem",
                            background: typeStyle.bg,
                            color: typeStyle.text,
                          }}
                        >
                          {doc.type}
                        </span>
                      </td>
                      <td
                        className="px-4 py-3"
                        style={{ fontSize: "0.8125rem", color: "#64748B" }}
                      >
                        {doc.brandName}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 flex-wrap">
                          {doc.linkedCampaignIds.length === 0 ? (
                            <span
                              style={{
                                fontSize: "0.625rem",
                                color: "#CBD5E1",
                              }}
                            >
                              —
                            </span>
                          ) : (
                            doc.linkedCampaignIds.map((cid) => {
                              const camp = INITIAL_CAMPAIGNS.find(
                                (c) => c.id === cid,
                              );
                              return (
                                <span
                                  key={cid}
                                  className="px-1.5 py-0.5 rounded bg-[#F1F5F9]"
                                  style={{
                                    fontSize: "0.5625rem",
                                    color: "#64748B",
                                  }}
                                >
                                  {camp?.name ?? cid}
                                </span>
                              );
                            })
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="px-2 py-0.5 rounded-md"
                          style={{
                            fontSize: "0.6875rem",
                            background: statusStyle.bg,
                            color: statusStyle.text,
                          }}
                        >
                          {statusStyle.label}
                        </span>
                      </td>
                      <td
                        className="px-4 py-3"
                        style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                      >
                        {fmtDate(doc.updatedAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsCreating(false);
                              setEditingDoc(doc);
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
                              setDeletingDoc(doc);
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
      )}

      {/* Document Detail Overlay */}
      {viewingDoc && (
        <DocDetailOverlay
          doc={viewingDoc}
          onEdit={() => {
            setIsCreating(false);
            setEditingDoc(viewingDoc);
            setViewingDoc(null);
          }}
          onDelete={() => {
            setDeletingDoc(viewingDoc);
            setViewingDoc(null);
          }}
          onClose={() => setViewingDoc(null)}
        />
      )}

      {/* Edit/Create Modal */}
      {editingDoc && (
        <DocEditModal
          doc={editingDoc}
          isNew={isCreating}
          brands={brands}
          onCreateBrand={(brand) => setBrands((prev) => [...prev, brand])}
          onSave={handleSave}
          onClose={() => {
            setEditingDoc(null);
            setIsCreating(false);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deletingDoc && (
        <DeleteConfirmDialog
          name={deletingDoc.title}
          onConfirm={() => handleDelete(deletingDoc.id)}
          onCancel={() => setDeletingDoc(null)}
        />
      )}
    </>
  );
}

// ── Document Detail Overlay ──────────────────────────────────────────────────

function DocDetailOverlay({
  doc,
  onEdit,
  onDelete,
  onClose,
}: {
  doc: BrandDocument;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const typeStyle = DOCUMENT_TYPE_STYLES[doc.type];
  const statusStyle: Record<
    string,
    { bg: string; text: string; label: string }
  > = {
    active: { bg: "#ECFDF5", text: "#0F766E", label: "Active" },
    archived: { bg: "#F1F5F9", text: "#64748B", label: "Archived" },
    draft: { bg: "#FFF7ED", text: "#C2410C", label: "Draft" },
  };
  const st = (statusStyle[doc.status] ?? statusStyle["draft"])!;

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
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className="px-2 py-0.5 rounded-md"
                  style={{
                    fontSize: "0.6875rem",
                    background: typeStyle.bg,
                    color: typeStyle.text,
                  }}
                >
                  {(() => {
                    const Icon = typeStyle.icon;
                    return <Icon size={12} style={{ color: typeStyle.text }} />;
                  })()}{" "}
                  {doc.type}
                </span>
                <span
                  className="px-2 py-0.5 rounded-md"
                  style={{
                    fontSize: "0.6875rem",
                    background: st.bg,
                    color: st.text,
                  }}
                >
                  {st.label}
                </span>
              </div>
              <h3 style={{ fontSize: "1.125rem", color: "#0F172A" }}>
                {doc.title}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="p-1 hover:bg-[#F1F5F9] rounded-md transition-colors h-auto w-auto cursor-pointer"
            >
              <X size={16} style={{ color: "#64748B" }} />
            </Button>
          </div>

          {/* Description */}
          <p
            className="mb-5"
            style={{ fontSize: "0.875rem", color: "#334155", lineHeight: 1.65 }}
          >
            {doc.description}
          </p>

          {/* File info card */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] mb-5">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: typeStyle.bg }}
            >
              <FileText size={18} style={{ color: typeStyle.text }} />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="truncate"
                style={{ fontSize: "0.8125rem", color: "#0F172A" }}
              >
                {doc.fileName}
              </p>
              <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
                {FILE_TYPE_LABELS[doc.fileType]} &middot;{" "}
                {doc.fileSizeKB >= 1000
                  ? `${(doc.fileSizeKB / 1024).toFixed(1)} MB`
                  : `${doc.fileSizeKB} KB`}
              </p>
            </div>
            <Button
              variant="outline"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:bg-white transition-colors h-auto cursor-pointer"
              style={{ fontSize: "0.75rem", color: "#0F172A" }}
              onClick={() => toast.success("Download started")}
            >
              <Download size={12} />
              Download
            </Button>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  color: "#94A3B8",
                  letterSpacing: "0.03em",
                }}
              >
                Brand
              </p>
              <p
                className="mt-0.5"
                style={{ fontSize: "0.8125rem", color: "#0F172A" }}
              >
                {doc.brandName || "—"}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  color: "#94A3B8",
                  letterSpacing: "0.03em",
                }}
              >
                Created by
              </p>
              <p
                className="mt-0.5"
                style={{ fontSize: "0.8125rem", color: "#0F172A" }}
              >
                {doc.createdBy}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  color: "#94A3B8",
                  letterSpacing: "0.03em",
                }}
              >
                Created
              </p>
              <p
                className="mt-0.5"
                style={{ fontSize: "0.8125rem", color: "#0F172A" }}
              >
                {fmtDate(doc.createdAt)}
              </p>
            </div>
          </div>

          {/* Linked campaigns */}
          {doc.linkedCampaignIds.length > 0 && (
            <div className="mb-5">
              <p
                className="mb-2"
                style={{
                  fontSize: "0.6875rem",
                  color: "#94A3B8",
                  letterSpacing: "0.03em",
                }}
              >
                Linked Campaigns
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {doc.linkedCampaignIds.map((cid) => {
                  const camp = INITIAL_CAMPAIGNS.find((c) => c.id === cid);
                  return (
                    <span
                      key={cid}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F1F5F9]"
                      style={{ fontSize: "0.6875rem", color: "#64748B" }}
                    >
                      <LinkIcon size={9} />
                      {camp?.name ?? cid}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tags */}
          {doc.tags.length > 0 && (
            <div className="mb-5">
              <p
                className="mb-2"
                style={{
                  fontSize: "0.6875rem",
                  color: "#94A3B8",
                  letterSpacing: "0.03em",
                }}
              >
                Tags
              </p>
              <div className="flex items-center gap-1.5 flex-wrap">
                {doc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]"
                    style={{ fontSize: "0.625rem", color: "#64748B" }}
                  >
                    <Tag size={8} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p
            className="mb-5"
            style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
          >
            Last updated {fmtDate(doc.updatedAt)}
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

// ── Document Edit / Create Modal ─────────────────────────────────────────────

function DocEditModal({
  doc,
  isNew,
  brands,
  onCreateBrand,
  onSave,
  onClose,
}: {
  doc: BrandDocument;
  isNew: boolean;
  brands: Brand[];
  onCreateBrand: (brand: Brand) => void;
  onSave: (d: BrandDocument) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<BrandDocument>({ ...doc });
  const [tagsInput, setTagsInput] = useState(doc.tags.join(", "));
  const [showCreateBrand, setShowCreateBrand] = useState(false);

  // File Upload State
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = (file: File) => {
    setUploadProgress(0);
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const ft: FileType =
      ext === "pdf"
        ? "pdf"
        : ext === "doc" || ext === "docx"
          ? "doc"
          : ext === "xlsx" || ext === "xls"
            ? "spreadsheet"
            : "image";

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setForm((p) => ({
          ...p,
          fileName: file.name,
          fileUrl: `/documents/${file.name}`,
          fileType: ft,
          fileSizeKB: Math.round(file.size / 1024) || 1,
        }));
        setTimeout(() => setUploadProgress(null), 500);
      } else {
        setUploadProgress(progress);
      }
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file) simulateUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) simulateUpload(file);
    }
  };

  function update<K extends keyof BrandDocument>(
    key: K,
    val: BrandDocument[K],
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: val,
      updatedAt: new Date().toISOString().split("T")[0] ?? "",
    }));
  }

  function handleBrandChange(brandId: string) {
    if (brandId === "__create__") {
      setShowCreateBrand(true);
      return;
    }
    const brand = brands.find((b) => b.id === brandId);
    setForm((prev) => ({
      ...prev,
      brandId,
      brandName: brand?.name ?? "",
      updatedAt: new Date().toISOString().split("T")[0] ?? "",
    }));
  }

  function applyNewBrand(brand: Brand) {
    onCreateBrand(brand);
    setForm((prev) => ({
      ...prev,
      brandId: brand.id,
      brandName: brand.name,
      updatedAt: new Date().toISOString().split("T")[0] ?? "",
    }));
    setShowCreateBrand(false);
    toast.success(`Brand "${brand.name}" created`);
  }

  function toggleCampaign(campaignId: string) {
    setForm((prev) => {
      const ids = prev.linkedCampaignIds.includes(campaignId)
        ? prev.linkedCampaignIds.filter((id) => id !== campaignId)
        : [...prev.linkedCampaignIds, campaignId];
      return { ...prev, linkedCampaignIds: ids };
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Document title is required.");
      return;
    }
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    onSave({ ...form, tags });
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
            {isNew ? "Add Document" : "Edit Document"}
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
          <FormField label="Document Title *">
            <Input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
              style={{ fontSize: "0.8125rem" }}
              placeholder="e.g. Absolut Vodka — Serving Guide"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Document Type">
              <select
                value={form.type}
                onChange={(e) => update("type", e.target.value as DocumentType)}
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
                style={{ fontSize: "0.8125rem" }}
              >
                {DOCUMENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Brand">
              <select
                value={form.brandId}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
                style={{ fontSize: "0.8125rem" }}
              >
                <option value="">Select brand...</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
                <option value="__create__">+ Create new brand…</option>
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
              placeholder="Brief description of the document..."
            />
          </FormField>

          {/* File upload area (simulated) */}
          <FormField label="File">
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors relative flex flex-col items-center justify-center min-h-[140px] ${
                isDragging
                  ? "border-[#7D152D] bg-[#7D152D]/5"
                  : "border-[#E2E8F0] hover:border-[#CBD5E1] bg-[#F8FAFC]"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Hidden file input */}
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              />

              {form.fileName ? (
                <div className="flex flex-col items-center w-full max-w-sm mx-auto">
                  <div className="flex items-center justify-between gap-3 w-full bg-white p-3 rounded-lg border border-[#E2E8F0] shadow-sm">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="bg-[#F1F5F9] p-2 rounded text-[#64748B]">
                        <FileText size={20} />
                      </div>
                      <div className="text-left min-w-0">
                        <p className="text-[#0F172A] text-sm font-medium truncate">
                          {form.fileName}
                        </p>
                        <p className="text-[#64748B] text-xs">
                          {form.fileSizeKB >= 1024
                            ? `${(form.fileSizeKB / 1024).toFixed(1)} MB`
                            : `${form.fileSizeKB} KB`}{" "}
                          · {FILE_TYPE_LABELS[form.fileType]}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      type="button"
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          fileName: "",
                          fileUrl: "",
                          fileSizeKB: 0,
                        }))
                      }
                      className="h-8 w-8 text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#FEF2F2] flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ) : uploadProgress !== null ? (
                <div className="w-full max-w-sm mx-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#0F172A]">
                      Uploading...
                    </span>
                    <span className="text-sm text-[#64748B]">
                      {Math.round(uploadProgress)}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#7D152D] transition-all duration-200 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="bg-white p-3 rounded-full shadow-sm mb-3 text-[#94A3B8]">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-medium text-[#0F172A] mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-[#64748B] mb-4">
                    PDF, DOC, XLSX, or images (max 10MB)
                  </p>
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] shadow-sm text-xs h-8"
                  >
                    Select File
                  </Button>
                </div>
              )}
            </div>
          </FormField>

          {/* Campaign linking */}
          <FormField label="Link to Campaigns">
            <div className="flex flex-wrap gap-2 p-2 border border-[#E2E8F0] rounded-lg min-h-[40px]">
              {INITIAL_CAMPAIGNS.filter((c) => c.status === "active").map(
                (camp) => {
                  const isLinked = form.linkedCampaignIds.includes(camp.id);
                  return (
                    <Button
                      key={camp.id}
                      type="button"
                      variant="ghost"
                      onClick={() => toggleCampaign(camp.id)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md transition-colors h-auto cursor-pointer"
                      style={{
                        fontSize: "0.6875rem",
                        background: isLinked ? "#7D152D14" : "#F1F5F9",
                        color: isLinked ? "#7D152D" : "#64748B",
                        border: isLinked
                          ? "1px solid #7D152D40"
                          : "1px solid transparent",
                      }}
                    >
                      {isLinked && <Check size={10} />}
                      {camp.name}
                    </Button>
                  );
                },
              )}
            </div>
          </FormField>

          {/* Tags */}
          <FormField label="Tags (comma-separated)">
            <Input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
              style={{ fontSize: "0.8125rem" }}
              placeholder="vodka, cocktails, serving-guide"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Status">
              <select
                value={form.status}
                onChange={(e) =>
                  update(
                    "status",
                    e.target.value as "active" | "archived" | "draft",
                  )
                }
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
                style={{ fontSize: "0.8125rem" }}
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </FormField>
            <FormField label="File Type">
              <select
                value={form.fileType}
                onChange={(e) => update("fileType", e.target.value as FileType)}
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
                style={{ fontSize: "0.8125rem" }}
              >
                <option value="pdf">PDF</option>
                <option value="doc">Document</option>
                <option value="spreadsheet">Spreadsheet</option>
                <option value="image">Image</option>
              </select>
            </FormField>
          </div>

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
              {isNew ? "Add Document" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>

      {showCreateBrand && (
        <QuickCreateBrandDialog
          existingBrands={brands}
          onCreate={applyNewBrand}
          onCancel={() => setShowCreateBrand(false)}
        />
      )}
    </div>
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
                  className="w-full px-3 py-2 rounded-t-none outline-none resize-none shadow-none"
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

// =============================================================================
// Questionnaires Tab — reusable templates operators pull into campaigns/events
// =============================================================================

function QuestionnairesTab({
  templates,
  setTemplates,
}: {
  templates: QuestionnaireTemplate[];
  setTemplates: React.Dispatch<React.SetStateAction<QuestionnaireTemplate[]>>;
}) {
  const [search, setSearch] = useState("");
  const [viewingId, setViewingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search) return templates;
    const q = search.toLowerCase();
    return templates.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q),
    );
  }, [templates, search]);

  const viewing = viewingId
    ? (templates.find((t) => t.id === viewingId) ?? null)
    : null;

  const usageCountByCampaign = useMemo(() => {
    const counts = new Map<string, number>();
    for (const e of INITIAL_EVENTS) {
      if (!e.campaignId) continue;
      counts.set(e.campaignId, (counts.get(e.campaignId) ?? 0) + 1);
    }
    return counts;
  }, []);

  function handleCreate() {
    const tpl: QuestionnaireTemplate = {
      id: `qt-${Date.now()}`,
      name: "New Template",
      description: "",
      questions: [],
      createdAt: new Date().toISOString(),
    };
    setTemplates((prev) => [tpl, ...prev]);
    setViewingId(tpl.id);
  }

  function handleDuplicate(template: QuestionnaireTemplate) {
    const { campaignId: _dropCampaign, ...rest } = template;
    void _dropCampaign;
    const copy: QuestionnaireTemplate = {
      ...rest,
      id: `qt-${Date.now()}`,
      name: `${template.name} (copy)`,
      createdAt: new Date().toISOString(),
      questions: template.questions.map((q, i) => ({
        ...q,
        id: `${q.id}-copy-${Date.now()}-${i}`,
      })),
    };
    setTemplates((prev) => [copy, ...prev]);
    toast.success(`Duplicated "${template.name}"`);
    setViewingId(copy.id);
  }

  function handleUpdate(updated: QuestionnaireTemplate) {
    setTemplates((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t)),
    );
  }

  function handleDelete(id: string) {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    setViewingId(null);
    toast.success("Template removed");
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "#94A3B8" }}
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questionnaire templates..."
            className="w-full pl-9 py-2 rounded-lg border border-[#E2E8F0] bg-white outline-none focus:border-[#7D152D]"
            style={{ fontSize: "0.8125rem", color: "#0F172A" }}
          />
        </div>
        <Button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 h-auto cursor-pointer self-start sm:self-auto"
          style={{ background: "#7D152D", fontSize: "0.8125rem" }}
        >
          <Plus size={14} />
          New Template
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center">
          <ClipboardList
            size={32}
            style={{ color: "#E2E8F0" }}
            className="mx-auto mb-3"
          />
          <p style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
            No templates match your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => {
            const events = t.campaignId
              ? (usageCountByCampaign.get(t.campaignId) ?? 0)
              : 0;
            return (
              <div
                key={t.id}
                className="bg-white rounded-xl border border-[#E2E8F0] p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setViewingId(t.id)}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate"
                      style={{ fontSize: "0.9375rem", color: "#0F172A" }}
                    >
                      {t.name}
                    </p>
                    {t.campaignId && (
                      <p
                        className="truncate"
                        style={{ fontSize: "0.625rem", color: "#94A3B8" }}
                      >
                        Linked to campaign {t.campaignId}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDuplicate(t);
                    }}
                    className="p-1 rounded hover:bg-[#F1F5F9] h-auto w-auto cursor-pointer"
                    aria-label={`Duplicate ${t.name}`}
                  >
                    <Copy size={12} style={{ color: "#64748B" }} />
                  </Button>
                </div>
                <p
                  className="line-clamp-2 mb-3"
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748B",
                    lineHeight: 1.5,
                  }}
                >
                  {t.description || "No description."}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded-md"
                    style={{
                      fontSize: "0.625rem",
                      background: "#F1F5F9",
                      color: "#64748B",
                    }}
                  >
                    {t.questions.length} question
                    {t.questions.length !== 1 ? "s" : ""}
                  </span>
                  {events > 0 && (
                    <span
                      className="px-2 py-0.5 rounded-md"
                      style={{
                        fontSize: "0.625rem",
                        background: "#0F766E14",
                        color: "#0F766E",
                      }}
                    >
                      Used in {events} event{events !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewing && (
        <TemplateDetailDrawer
          template={viewing}
          onUpdate={handleUpdate}
          onDelete={() => handleDelete(viewing.id)}
          onDuplicate={() => handleDuplicate(viewing)}
          onClose={() => setViewingId(null)}
        />
      )}
    </>
  );
}

function TemplateDetailDrawer({
  template,
  onUpdate,
  onDelete,
  onDuplicate,
  onClose,
}: {
  template: QuestionnaireTemplate;
  onUpdate: (t: QuestionnaireTemplate) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<QuestionnaireTemplate>({ ...template });
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setForm({ ...template });
  }, [template]);

  const dirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(template),
    [form, template],
  );

  function updateField<K extends keyof QuestionnaireTemplate>(
    key: K,
    val: QuestionnaireTemplate[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function updateQuestion(
    index: number,
    updater: (q: QuestionnaireQuestion) => QuestionnaireQuestion,
  ) {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) => (i === index ? updater(q) : q)),
    }));
  }

  function addQuestion() {
    const newQ: QuestionnaireQuestion = {
      id: `q-new-${Date.now()}`,
      text: "",
      type: "rating",
      required: false,
      category: "general",
    };
    setForm((prev) => ({ ...prev, questions: [...prev.questions, newQ] }));
  }

  function removeQuestion(index: number) {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  }

  function moveQuestion(index: number, direction: -1 | 1) {
    setForm((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.questions.length) return prev;
      const next = [...prev.questions];
      const current = next[index];
      const swap = next[target];
      if (!current || !swap) return prev;
      next[index] = swap;
      next[target] = current;
      return { ...prev, questions: next };
    });
  }

  function handleSave() {
    if (!form.name.trim()) {
      toast.error("Template name is required.");
      return;
    }
    onUpdate(form);
    toast.success("Template saved");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(15,23,42,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl h-full overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideInRight 0.25s ease-out" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2 min-w-0">
            <ClipboardList size={16} style={{ color: "#7D152D" }} />
            <h3
              className="truncate"
              style={{ fontSize: "1rem", color: "#0F172A" }}
            >
              {form.name || "New Template"}
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onDuplicate}
              className="p-2 rounded-lg hover:bg-[#F1F5F9] h-auto w-auto cursor-pointer"
              aria-label="Duplicate template"
            >
              <Copy size={14} style={{ color: "#64748B" }} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setConfirmDelete(true)}
              className="p-2 rounded-lg hover:bg-[#FEF2F2] h-auto w-auto cursor-pointer"
              aria-label="Remove template"
            >
              <Trash2 size={14} style={{ color: "#B91C1C" }} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[#F1F5F9] h-auto w-auto cursor-pointer"
            >
              <X size={16} style={{ color: "#64748B" }} />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-3">
            <FormField label="Name *">
              <Input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
                style={{ fontSize: "0.8125rem" }}
              />
            </FormField>
            <FormField label="Description">
              <Textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D] resize-none"
                style={{ fontSize: "0.75rem" }}
                placeholder="When should operators pick this template?"
              />
            </FormField>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4
                style={{
                  fontSize: "0.6875rem",
                  color: "#94A3B8",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Questions ({form.questions.length})
              </h4>
              <Button
                type="button"
                variant="outline"
                onClick={addQuestion}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-[#E2E8F0] hover:bg-[#F8FAFC] h-auto cursor-pointer"
                style={{ fontSize: "0.6875rem", color: "#0F172A" }}
              >
                <Plus size={11} /> Add question
              </Button>
            </div>

            {form.questions.length === 0 ? (
              <p
                className="italic"
                style={{ fontSize: "0.75rem", color: "#94A3B8" }}
              >
                No questions yet. Add one to get started.
              </p>
            ) : (
              <div className="space-y-2">
                {form.questions.map((q, i) => (
                  <QuestionEditor
                    key={q.id}
                    question={q}
                    index={i}
                    total={form.questions.length}
                    onChange={(updater) => updateQuestion(i, updater)}
                    onMove={(dir) => moveQuestion(i, dir)}
                    onRemove={() => removeQuestion(i)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sticky footer */}
        <div className="sticky bottom-0 bg-white border-t border-[#E2E8F0] px-6 py-3 flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            onClick={onClose}
            className="px-4 py-2 rounded-lg hover:bg-[#F1F5F9] h-auto cursor-pointer"
            style={{ fontSize: "0.8125rem", color: "#64748B" }}
          >
            Close
          </Button>
          <Button
            onClick={handleSave}
            disabled={!dirty}
            className="px-4 py-2 rounded-lg text-white hover:opacity-90 disabled:opacity-50 h-auto cursor-pointer"
            style={{ background: "#7D152D", fontSize: "0.8125rem" }}
          >
            Save changes
          </Button>
        </div>
      </div>

      {confirmDelete && (
        <DeleteConfirmDialog
          name={template.name}
          onConfirm={() => {
            setConfirmDelete(false);
            onDelete();
          }}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </div>
  );
}

function QuestionEditor({
  question,
  index,
  total,
  onChange,
  onMove,
  onRemove,
}: {
  question: QuestionnaireQuestion;
  index: number;
  total: number;
  onChange: (
    updater: (q: QuestionnaireQuestion) => QuestionnaireQuestion,
  ) => void;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
}) {
  const [optionsDraft, setOptionsDraft] = useState(
    (question.options ?? []).join("\n"),
  );

  // Sync options draft when question prop changes (e.g. after reorder).
  useEffect(() => {
    setOptionsDraft((question.options ?? []).join("\n"));
  }, [question.id, question.options]);

  function commitOptions() {
    const list = optionsDraft
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    onChange((q) => {
      const { options: _drop, ...rest } = q;
      void _drop;
      return list.length > 0 ? { ...rest, options: list } : rest;
    });
  }

  const needsOptions =
    question.type === "multiple-choice" || question.type === "dropdown";

  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white p-3">
      <div className="flex items-start gap-2 mb-2">
        <GripVertical
          size={14}
          style={{ color: "#CBD5E1" }}
          className="mt-1 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <Input
            value={question.text}
            onChange={(e) => onChange((q) => ({ ...q, text: e.target.value }))}
            placeholder={`Question ${index + 1}`}
            className="w-full px-2 py-1.5 rounded-md border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
            style={{ fontSize: "0.8125rem" }}
          />
        </div>
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            className="p-1 rounded hover:bg-[#F1F5F9] h-auto w-auto cursor-pointer disabled:opacity-30"
            aria-label="Move up"
          >
            <ArrowUp size={11} style={{ color: "#64748B" }} />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            className="p-1 rounded hover:bg-[#F1F5F9] h-auto w-auto cursor-pointer disabled:opacity-30"
            aria-label="Move down"
          >
            <ArrowDown size={11} style={{ color: "#64748B" }} />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={onRemove}
            className="p-1 rounded hover:bg-[#FEF2F2] h-auto w-auto cursor-pointer"
            aria-label="Remove question"
          >
            <Trash2 size={11} style={{ color: "#B91C1C" }} />
          </Button>
        </div>
      </div>

      <div className="ml-6 grid grid-cols-3 gap-2 mb-2">
        <select
          value={question.type}
          onChange={(e) =>
            onChange((q) => ({
              ...q,
              type: e.target.value as QuestionnaireQuestion["type"],
            }))
          }
          className="px-2 py-1.5 rounded-md border border-[#E2E8F0] bg-white outline-none focus:border-[#7D152D]"
          style={{ fontSize: "0.6875rem", color: "#64748B" }}
        >
          {QUESTION_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={question.category}
          onChange={(e) =>
            onChange((q) => ({ ...q, category: e.target.value }))
          }
          className="px-2 py-1.5 rounded-md border border-[#E2E8F0] bg-white outline-none focus:border-[#7D152D]"
          style={{ fontSize: "0.6875rem", color: "#64748B" }}
        >
          {QUESTION_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <label
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-md border border-[#E2E8F0] cursor-pointer"
          style={{ fontSize: "0.6875rem", color: "#64748B" }}
        >
          <input
            type="checkbox"
            checked={question.required}
            onChange={(e) =>
              onChange((q) => ({ ...q, required: e.target.checked }))
            }
            className="cursor-pointer"
          />
          Required
        </label>
      </div>

      {needsOptions && (
        <div className="ml-6">
          <label
            className="block mb-1"
            style={{ fontSize: "0.625rem", color: "#94A3B8" }}
          >
            Options (one per line)
          </label>
          <Textarea
            value={optionsDraft}
            onChange={(e) => setOptionsDraft(e.target.value)}
            onBlur={commitOptions}
            rows={3}
            className="w-full px-2 py-1.5 rounded-md border border-[#E2E8F0] outline-none focus:border-[#7D152D] resize-none"
            style={{ fontSize: "0.6875rem" }}
            placeholder="Option 1&#10;Option 2&#10;Option 3"
          />
        </div>
      )}
    </div>
  );
}
