// =============================================================================
// Reports & Analytics — MM-UI-005  (polished)
//
// Changes applied:
//  1. Page-level scope filter controls Quick Stats + Trend chart
//  2. Quick Stats: 3 hero cards (Samples, Reach, Sales) + 3 secondary
//  3. Campaign Comparison defaults to top-3, adds Select All / Clear
//  4. Photo Gallery: event filter, date sort, lazy loading
//  5. Export: sonner toast on completion
//  6. Lightbox: Escape key, prev/next keyboard & button nav
//  7. Live pulse dot on Quick Stats header
//  8. Trend chart is scope-aware
// =============================================================================

import { useState, useMemo, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { PageHeader } from "../../shared/components/layouts/page-header";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Camera,
  Download,
  FileText,
  Table2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  X,
  CalendarDays,
  MapPin,
  Hash,
  Eye,
  ArrowUpDown,
  Megaphone,
  Beaker,
  ChevronLeft,
  ChevronRight,
  ArrowDownUp,
  ListFilter,
} from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { toast } from "sonner";
import { ImageWithFallback } from "../../shared/components/ui/ImageWithFallback";
import {
  CAMPAIGN_METRICS,
  getQuickStats,
  PROOF_PHOTOS,
  getTrendData,
  getGalleryEvents,
  DEFAULT_COMPARISON_IDS,
  REPORT_SCOPES,
  type ProofPhoto,
  type ReportScope,
} from "./reports-data";

// ── Helpers ──────────────────────────────────────────────────────────────────

type SortKey =
  | "campaignName"
  | "events"
  | "samples"
  | "consumerReach"
  | "totalSales"
  | "conversionRate"
  | "avgEngagement";
type SortDir = "asc" | "desc";
type GallerySortDir = "newest" | "oldest";

const STATUS_DOT: Record<string, string> = {
  active: "#0F766E",
  completed: "#B91C1C",
  draft: "#94A3B8",
};

function formatNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(n >= 10_000 ? 0 : 1) + "k";
  return n.toLocaleString();
}

function fmtCurrency(n: number): string {
  return "$" + n.toLocaleString();
}

// =============================================================================
// Main Component
// =============================================================================

export function ReportsPage() {
  // ── Scope (change #1) ───────────────────────────────────────────────────
  const [scope, setScope] = useState<ReportScope>("all");

  // ── Quick Stats (change #2, #7) ─────────────────────────────────────────
  const stats = useMemo(() => getQuickStats(scope), [scope]);

  // ── Trend chart (change #8) ─────────────────────────────────────────────
  const trendData = useMemo(() => getTrendData(scope), [scope]);

  // ── Campaign Comparison (change #3) ─────────────────────────────────────
  const [selectedCampaigns, setSelectedCampaigns] = useState<Set<string>>(
    () => new Set(DEFAULT_COMPARISON_IDS),
  );
  const [sortKey, setSortKey] = useState<SortKey>("totalSales");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const comparisonData = useMemo(() => {
    let rows = CAMPAIGN_METRICS.filter((c) =>
      selectedCampaigns.has(c.campaignId),
    );
    rows = [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string" && typeof bv === "string")
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      return sortDir === "asc"
        ? (av as number) - (bv as number)
        : (bv as number) - (av as number);
    });
    return rows;
  }, [selectedCampaigns, sortKey, sortDir]);

  // ── Gallery (change #4) ─────────────────────────────────────────────────
  const [galleryCampaignFilter, setGalleryCampaignFilter] =
    useState<string>("all");
  const [galleryEventFilter, setGalleryEventFilter] = useState<string>("all");
  const [gallerySortDir, setGallerySortDir] =
    useState<GallerySortDir>("newest");

  // Unique campaigns in photos
  const galleryCampaigns = useMemo(() => {
    const map = new Map<string, string>();
    PROOF_PHOTOS.forEach((p) => map.set(p.campaignId, p.campaignName));
    return Array.from(map.entries());
  }, []);

  // Events available in the current campaign filter
  const galleryEventOptions = useMemo(() => {
    const events = getGalleryEvents();
    if (galleryCampaignFilter === "all") return events;
    return events.filter((e) =>
      PROOF_PHOTOS.some(
        (p) =>
          p.eventId === e.eventId && p.campaignId === galleryCampaignFilter,
      ),
    );
  }, [galleryCampaignFilter]);

  // Reset event filter when campaign filter changes
  useEffect(() => {
    setGalleryEventFilter("all");
  }, [galleryCampaignFilter]);

  const galleryPhotos = useMemo(() => {
    let filtered = PROOF_PHOTOS;
    if (galleryCampaignFilter !== "all")
      filtered = filtered.filter((p) => p.campaignId === galleryCampaignFilter);
    if (galleryEventFilter !== "all")
      filtered = filtered.filter((p) => p.eventId === galleryEventFilter);
    // Sort by date
    filtered = [...filtered].sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return gallerySortDir === "newest" ? -diff : diff;
    });
    return filtered;
  }, [galleryCampaignFilter, galleryEventFilter, gallerySortDir]);

  // ── Lightbox (change #6) ────────────────────────────────────────────────
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxPhoto =
    lightboxIndex !== null ? (galleryPhotos[lightboxIndex] ?? null) : null;

  function openLightbox(idx: number) {
    setLightboxIndex(idx);
  }
  function closeLightbox() {
    setLightboxIndex(null);
  }
  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);
  const goNext = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null && i < galleryPhotos.length - 1 ? i + 1 : i,
    );
  }, [galleryPhotos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goPrev, goNext]);

  // ── Export (change #5) ──────────────────────────────────────────────────
  const [exportOpen, setExportOpen] = useState(false);
  const [exporting, setExporting] = useState<string | null>(null);

  function handleExport(format: "pdf" | "csv") {
    setExporting(format);
    setTimeout(() => {
      setExporting(null);
      setExportOpen(false);
      if (format === "pdf") {
        toast.success("PDF Report downloaded", {
          description: "Branded report with all selected campaign data.",
        });
      } else {
        const evtCount = comparisonData.reduce((s, c) => s + c.events, 0);
        toast.success("CSV exported", {
          description: `${comparisonData.length} campaigns, ${evtCount} events — raw data ready.`,
        });
      }
    }, 1800);
  }

  // ── Campaign Comparison helpers (change #3) ─────────────────────────────
  function toggleCampaign(id: string) {
    setSelectedCampaigns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }
  function selectAllCampaigns() {
    setSelectedCampaigns(new Set(CAMPAIGN_METRICS.map((c) => c.campaignId)));
  }
  function clearCampaigns() {
    setSelectedCampaigns(new Set());
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <div className="p-6 font-[Inter]">
      {/* ── Page Header + Scope + Export ──────────────────────────────── */}
      <PageHeader
        title="Reports & Analytics"
        subtitle="Centralized performance tracking across events and campaigns."
        actions={
          <>
            {/* Scope selector (change #1) */}
            <div className="inline-flex rounded-lg border border-[#E2E8F0] overflow-hidden">
              {REPORT_SCOPES.map((s) => (
                <Button
                  key={s.value}
                  variant="ghost"
                  onClick={() => setScope(s.value)}
                  className="px-3 py-2 transition-colors h-auto rounded-none border-r border-[#E2E8F0] last:border-r-0 cursor-pointer"
                  style={{
                    fontSize: "0.75rem",
                    background: scope === s.value ? "#7D152D" : "#fff",
                    color: scope === s.value ? "#fff" : "#64748B",
                  }}
                >
                  {s.label}
                </Button>
              ))}
            </div>

            {/* Export button */}
            <div className="relative">
              <Button
                onClick={() => setExportOpen(!exportOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 h-auto cursor-pointer"
                style={{ background: "#7D152D", fontSize: "0.8125rem" }}
              >
                <Download size={14} />
                Export
                <ChevronDown
                  size={12}
                  className={`transition-transform ${exportOpen ? "rotate-180" : ""}`}
                />
              </Button>

              {exportOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setExportOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-[#E2E8F0] shadow-lg z-50 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-[#F1F5F9]">
                      <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
                        SELECT FORMAT
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => handleExport("pdf")}
                      disabled={!!exporting}
                      className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#F8FAFC] transition-colors text-left disabled:opacity-60 h-auto cursor-pointer justify-start"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "#7D152D0F" }}
                      >
                        <FileText size={15} style={{ color: "#7D152D" }} />
                      </div>
                      <div>
                        <p style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
                          {exporting === "pdf" ? "Generating..." : "PDF Report"}
                        </p>
                        <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
                          Branded, client-facing
                        </p>
                      </div>
                      {exporting === "pdf" && <Spinner />}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleExport("csv")}
                      disabled={!!exporting}
                      className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#F8FAFC] transition-colors text-left disabled:opacity-60 h-auto cursor-pointer justify-start"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "#0F766E0F" }}
                      >
                        <Table2 size={15} style={{ color: "#0F766E" }} />
                      </div>
                      <div>
                        <p style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
                          {exporting === "csv" ? "Generating..." : "CSV Export"}
                        </p>
                        <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
                          Raw data for analysts
                        </p>
                      </div>
                      {exporting === "csv" && <Spinner />}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </>
        }
      />

      {/* ── Quick Stats — 3 Hero + 3 Secondary (change #2, #7) ───────── */}
      <div className="mb-8">
        {/* Header with live dot */}
        <div className="flex items-center gap-2 mb-3">
          <span
            style={{
              fontSize: "0.6875rem",
              color: "#94A3B8",
              letterSpacing: "0.04em",
            }}
          >
            QUICK STATS
          </span>
          <span className="flex items-center gap-1">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#0F766E" }}
            />
            <span style={{ fontSize: "0.625rem", color: "#0F766E" }}>Live</span>
          </span>
        </div>

        {/* Primary hero row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <HeroStatCard
            icon={<Beaker size={18} />}
            label="Total Samples"
            value={formatNum(stats.samples)}
            delta={stats.samplesDelta}
            color="#7D152D"
          />
          <HeroStatCard
            icon={<Users size={18} />}
            label="Consumer Reach"
            value={formatNum(stats.consumerReach)}
            delta={stats.reachDelta}
            color="#1D4ED8"
          />
          <HeroStatCard
            icon={<DollarSign size={18} />}
            label="Total Sales"
            value={fmtCurrency(stats.totalSales)}
            delta={stats.salesDelta}
            color="#0F766E"
          />
        </div>

        {/* Secondary row */}
        <div className="grid grid-cols-3 gap-3">
          <SecondaryStatCard
            icon={<CalendarDays size={14} />}
            label="Events"
            value={stats.events.toString()}
            color="#D97706"
          />
          <SecondaryStatCard
            icon={<Hash size={14} />}
            label="Social Mentions"
            value={formatNum(stats.socialMentions)}
            color="#7C3AED"
          />
          <SecondaryStatCard
            icon={<Camera size={14} />}
            label="Photos"
            value={stats.photoCount.toString()}
            color="#059669"
          />
        </div>
      </div>

      {/* ── Performance Trend Chart (change #8) ──────────────────────── */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} style={{ color: "#7D152D" }} />
          <span style={{ fontSize: "0.9375rem", color: "#0F172A" }}>
            Performance Trend
          </span>
          <span
            style={{ fontSize: "0.75rem", color: "#94A3B8" }}
            className="ml-1"
          >
            ({REPORT_SCOPES.find((s) => s.value === scope)?.label})
          </span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart
            data={trendData}
            margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradSamples" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7D152D" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#7D152D" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradReach" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0F766E" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#94A3B8", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "#94A3B8", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatNum}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #E2E8F0",
                fontSize: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              formatter={(value: number, name: string) => {
                if (name === "sales") return [fmtCurrency(value), "Sales"];
                if (name === "reach")
                  return [formatNum(value), "Consumer Reach"];
                return [formatNum(value), "Samples"];
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
              formatter={(value: string) => {
                const labels: Record<string, string> = {
                  samples: "Samples",
                  reach: "Consumer Reach",
                  sales: "Sales",
                };
                return labels[value] ?? value;
              }}
            />
            <Area
              type="monotone"
              dataKey="samples"
              stroke="#7D152D"
              strokeWidth={2}
              fill="url(#gradSamples)"
            />
            <Area
              type="monotone"
              dataKey="reach"
              stroke="#1D4ED8"
              strokeWidth={2}
              fill="url(#gradReach)"
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#0F766E"
              strokeWidth={2}
              fill="url(#gradSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Campaign Comparison (change #3) ──────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden mb-8">
        <div className="px-5 py-4 border-b border-[#E2E8F0]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} style={{ color: "#7D152D" }} />
              <span style={{ fontSize: "0.9375rem", color: "#0F172A" }}>
                Campaign Comparison
              </span>
              <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                ({selectedCampaigns.size} of {CAMPAIGN_METRICS.length})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={selectAllCampaigns}
                className="px-2.5 py-1 rounded-md transition-colors hover:bg-[#F1F5F9] h-auto cursor-pointer"
                style={{ fontSize: "0.6875rem", color: "#7D152D" }}
              >
                Select All
              </Button>
              <span style={{ color: "#E2E8F0" }}>|</span>
              <Button
                variant="ghost"
                onClick={clearCampaigns}
                className="px-2.5 py-1 rounded-md transition-colors hover:bg-[#F1F5F9] h-auto cursor-pointer"
                style={{ fontSize: "0.6875rem", color: "#64748B" }}
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Campaign selector chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {CAMPAIGN_METRICS.map((c) => {
              const selected = selectedCampaigns.has(c.campaignId);
              return (
                <Button
                  key={c.campaignId}
                  variant="ghost"
                  onClick={() => toggleCampaign(c.campaignId)}
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 h-auto cursor-pointer ${
                    selected
                      ? "text-white hover:bg-[#7D152D] hover:text-white"
                      : "text-[#64748B] bg-[#F1F5F9] hover:bg-[#E2E8F0]"
                  }`}
                  style={
                    selected
                      ? { background: "#7D152D", fontSize: "0.6875rem" }
                      : { fontSize: "0.6875rem" }
                  }
                  title={c.campaignName}
                >
                  {selected && <CheckCircle2 size={10} />}
                  {c.campaignName.length > 20
                    ? c.campaignName.slice(0, 18) + "..."
                    : c.campaignName}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Table */}
        {selectedCampaigns.size === 0 ? (
          <div className="px-5 py-12 text-center">
            <p style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
              Select campaigns above to compare performance side-by-side.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table
                className="w-full min-w-[860px]"
                style={{ borderCollapse: "separate", borderSpacing: 0 }}
              >
                <thead>
                  <tr className="border-b border-[#E2E8F0]">
                    {[
                      { key: "campaignName" as SortKey, label: "Campaign" },
                      { key: "events" as SortKey, label: "Events" },
                      { key: "samples" as SortKey, label: "Samples" },
                      { key: "consumerReach" as SortKey, label: "Reach" },
                      { key: "totalSales" as SortKey, label: "Total Sales" },
                      { key: "conversionRate" as SortKey, label: "Conv. Rate" },
                      { key: "avgEngagement" as SortKey, label: "Engagement" },
                    ].map((col) => (
                      <th
                        key={col.key}
                        className="px-4 py-3 text-left cursor-pointer select-none group"
                        onClick={() => toggleSort(col.key)}
                      >
                        <span
                          className="inline-flex items-center gap-1"
                          style={{
                            fontSize: "0.6875rem",
                            color: sortKey === col.key ? "#7D152D" : "#94A3B8",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {col.label}
                          <ArrowUpDown
                            size={10}
                            className="opacity-40 group-hover:opacity-100 transition-opacity"
                          />
                          {sortKey === col.key &&
                            (sortDir === "desc" ? (
                              <ChevronDown
                                size={9}
                                style={{ color: "#7D152D" }}
                              />
                            ) : (
                              <ChevronUp
                                size={9}
                                style={{ color: "#7D152D" }}
                              />
                            ))}
                        </span>
                      </th>
                    ))}
                    <th
                      className="px-4 py-3 text-left"
                      style={{
                        fontSize: "0.6875rem",
                        color: "#94A3B8",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Social
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => {
                    const dotColor =
                      STATUS_DOT[row.status] ?? STATUS_DOT["draft"];
                    return (
                      <tr
                        key={row.campaignId}
                        className="border-b border-[#F8FAFC] last:border-0 hover:bg-[#FAFBFC] transition-colors"
                      >
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/campaigns/${row.campaignId}`}
                              className="no-underline hover:text-[#7D152D] truncate max-w-[180px] transition-colors"
                              style={{
                                fontSize: "0.8125rem",
                                color: "#0F172A",
                              }}
                            >
                              {row.campaignName}
                            </Link>
                            <span
                              className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                              style={{ background: dotColor }}
                              title={row.status}
                            />
                          </div>
                        </td>
                        <td
                          className="px-4 py-3.5"
                          style={{ fontSize: "0.8125rem", color: "#0F172A" }}
                        >
                          {row.events}
                        </td>
                        <td
                          className="px-4 py-3.5"
                          style={{ fontSize: "0.8125rem", color: "#0F172A" }}
                        >
                          {row.samples.toLocaleString()}
                        </td>
                        <td
                          className="px-4 py-3.5"
                          style={{ fontSize: "0.8125rem", color: "#0F172A" }}
                        >
                          {row.consumerReach.toLocaleString()}
                        </td>
                        <td
                          className="px-4 py-3.5"
                          style={{ fontSize: "0.8125rem", color: "#0F172A" }}
                        >
                          {fmtCurrency(row.totalSales)}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-14 h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${row.conversionRate}%`,
                                  background: "#0F766E",
                                }}
                              />
                            </div>
                            <span
                              style={{ fontSize: "0.75rem", color: "#0F172A" }}
                            >
                              {row.conversionRate}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className="px-2 py-0.5 rounded-md"
                            style={{
                              fontSize: "0.75rem",
                              background:
                                row.avgEngagement >= 8.5
                                  ? "#ECFDF5"
                                  : row.avgEngagement >= 7
                                    ? "#EFF6FF"
                                    : "#FEF3C7",
                              color:
                                row.avgEngagement >= 8.5
                                  ? "#0F766E"
                                  : row.avgEngagement >= 7
                                    ? "#1D4ED8"
                                    : "#92400E",
                            }}
                          >
                            {row.avgEngagement}/10
                          </span>
                        </td>
                        <td
                          className="px-4 py-3.5"
                          style={{ fontSize: "0.75rem", color: "#64748B" }}
                        >
                          {row.socialMentions.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Totals footer */}
            <div className="px-5 py-3 border-t border-[#E2E8F0] bg-[#FAFBFC] flex items-center gap-6 flex-wrap">
              <span
                style={{
                  fontSize: "0.6875rem",
                  color: "#94A3B8",
                  letterSpacing: "0.04em",
                }}
              >
                TOTALS
              </span>
              <span style={{ fontSize: "0.75rem", color: "#0F172A" }}>
                {comparisonData.reduce((s, c) => s + c.events, 0)} events
              </span>
              <span style={{ fontSize: "0.75rem", color: "#0F172A" }}>
                {comparisonData
                  .reduce((s, c) => s + c.samples, 0)
                  .toLocaleString()}{" "}
                samples
              </span>
              <span style={{ fontSize: "0.75rem", color: "#0F172A" }}>
                {fmtCurrency(
                  comparisonData.reduce((s, c) => s + c.totalSales, 0),
                )}{" "}
                sales
              </span>
              <span style={{ fontSize: "0.75rem", color: "#0F172A" }}>
                {comparisonData
                  .reduce((s, c) => s + c.consumerReach, 0)
                  .toLocaleString()}{" "}
                reach
              </span>
            </div>
          </>
        )}
      </div>

      {/* ── Campaign Comparison Bar Chart ────────────────────────────── */}
      {selectedCampaigns.size > 0 && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={16} style={{ color: "#0F766E" }} />
            <span style={{ fontSize: "0.9375rem", color: "#0F172A" }}>
              Sales by Campaign
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={comparisonData.map((c) => ({
                name:
                  c.campaignName.length > 14
                    ? c.campaignName.slice(0, 12) + "..."
                    : c.campaignName,
                sales: c.totalSales,
                samples: c.samples,
              }))}
              margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#94A3B8", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "#94A3B8", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatNum}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #E2E8F0",
                  fontSize: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
                formatter={(value: number, name: string) => {
                  if (name === "sales")
                    return [fmtCurrency(value), "Total Sales"];
                  return [formatNum(value), "Samples"];
                }}
              />
              <Bar
                dataKey="sales"
                fill="#7D152D"
                radius={[4, 4, 0, 0]}
                barSize={28}
              />
              <Bar
                dataKey="samples"
                fill="#0F766E"
                radius={[4, 4, 0, 0]}
                barSize={28}
                opacity={0.7}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ── Photo Proof Gallery (change #4) ──────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden mb-2">
        <div className="px-5 py-4 border-b border-[#E2E8F0]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Camera size={16} style={{ color: "#7D152D" }} />
              <span style={{ fontSize: "0.9375rem", color: "#0F172A" }}>
                Photo Proof Gallery
              </span>
              <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                ({galleryPhotos.length} photos)
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Date sort toggle */}
              <Button
                variant="ghost"
                onClick={() =>
                  setGallerySortDir((d) =>
                    d === "newest" ? "oldest" : "newest",
                  )
                }
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] transition-colors h-auto cursor-pointer"
                style={{ fontSize: "0.6875rem", color: "#64748B" }}
              >
                <ArrowDownUp size={11} />
                {gallerySortDir === "newest" ? "Newest first" : "Oldest first"}
              </Button>

              {/* Event filter dropdown */}
              {galleryEventOptions.length > 1 && (
                <div className="relative">
                  <select
                    value={galleryEventFilter}
                    onChange={(e) => setGalleryEventFilter(e.target.value)}
                    className="appearance-none pl-7 pr-6 py-1.5 rounded-lg bg-[#F1F5F9] border-0 cursor-pointer hover:bg-[#E2E8F0] transition-colors"
                    style={{ fontSize: "0.6875rem", color: "#64748B" }}
                  >
                    <option value="all">All events</option>
                    {galleryEventOptions.map((e) => (
                      <option key={e.eventId} value={e.eventId}>
                        {e.eventName}
                      </option>
                    ))}
                  </select>
                  <ListFilter
                    size={11}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: "#94A3B8" }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Campaign filter pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Button
              variant="ghost"
              onClick={() => setGalleryCampaignFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-colors h-auto cursor-pointer ${
                galleryCampaignFilter === "all"
                  ? "text-white"
                  : "text-[#64748B] bg-[#F1F5F9] hover:bg-[#E2E8F0]"
              }`}
              style={
                galleryCampaignFilter === "all"
                  ? { background: "#7D152D", fontSize: "0.75rem" }
                  : { fontSize: "0.75rem" }
              }
            >
              All
            </Button>
            {galleryCampaigns.map(([id, name]) => (
              <Button
                key={id}
                variant="ghost"
                onClick={() => setGalleryCampaignFilter(id)}
                className={`px-3 py-1.5 rounded-lg transition-colors h-auto cursor-pointer ${
                  galleryCampaignFilter === id
                    ? "text-white"
                    : "text-[#64748B] bg-[#F1F5F9] hover:bg-[#E2E8F0]"
                }`}
                style={
                  galleryCampaignFilter === id
                    ? { background: "#7D152D", fontSize: "0.75rem" }
                    : { fontSize: "0.75rem" }
                }
              >
                {name.length > 20 ? name.slice(0, 18) + "..." : name}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {galleryPhotos.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
              No photos match the current filters.
            </p>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryPhotos.map((photo, idx) => (
              <Button
                key={photo.id}
                variant="ghost"
                onClick={() => openLightbox(idx)}
                className="group relative rounded-xl overflow-hidden bg-[#F1F5F9] aspect-[4/3] cursor-pointer block p-0 w-full h-full border-0 shadow-none"
              >
                <ImageWithFallback
                  src={photo.url}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
                  <p
                    className="text-white truncate"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {photo.eventName}
                  </p>
                  <p
                    className="text-white/70 truncate"
                    style={{ fontSize: "0.625rem" }}
                  >
                    {photo.location}
                  </p>
                  <p
                    className="text-white/50"
                    style={{ fontSize: "0.5625rem" }}
                  >
                    {new Date(photo.date + "T12:00:00").toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" },
                    )}
                  </p>
                </div>
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye size={13} style={{ color: "#0F172A" }} />
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox (change #6) ─────────────────────────────────────── */}
      {lightboxPhoto && lightboxIndex !== null && (
        <PhotoLightbox
          photo={lightboxPhoto}
          index={lightboxIndex}
          total={galleryPhotos.length}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}

// =============================================================================
// Sub-components
// =============================================================================

/** Hero stat card — primary Quick Stats row (change #2) */
function HeroStatCard({
  icon,
  label,
  value,
  delta,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 flex items-start gap-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: color + "12", color }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p
          style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
          className="mb-1 truncate"
        >
          {label}
        </p>
        <p style={{ fontSize: "1.375rem", color: "#0F172A", lineHeight: 1.2 }}>
          {value}
        </p>
        <span
          className="inline-flex items-center gap-0.5 mt-1"
          style={{
            fontSize: "0.6875rem",
            color: delta >= 0 ? "#0F766E" : "#B91C1C",
          }}
        >
          <TrendingUp size={10} className={delta < 0 ? "rotate-180" : ""} />
          {delta >= 0 ? "+" : ""}
          {delta}% vs prior period
        </span>
      </div>
    </div>
  );
}

/** Secondary stat card — smaller metrics row (change #2) */
function SecondaryStatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] px-4 py-3 flex items-center gap-3">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: color + "0F", color }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p style={{ fontSize: "1rem", color: "#0F172A" }}>{value}</p>
        <p
          style={{ fontSize: "0.625rem", color: "#94A3B8" }}
          className="truncate"
        >
          {label}
        </p>
      </div>
    </div>
  );
}

/** Export spinner */
function Spinner() {
  return (
    <svg
      className="ml-auto w-4 h-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="#E2E8F0" strokeWidth="3" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="#7D152D"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Lightbox with prev/next + keyboard nav (change #6) */
function PhotoLightbox({
  photo,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  photo: ProofPhoto;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const hasPrev = index > 0;
  const hasNext = index < total - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.80)" }}
      onClick={onClose}
    >
      {/* Prev button */}
      {hasPrev && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-colors z-10 h-auto cursor-pointer"
        >
          <ChevronLeft size={20} style={{ color: "#0F172A" }} />
        </Button>
      )}

      {/* Next button */}
      {hasNext && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-colors z-10 h-auto cursor-pointer"
        >
          <ChevronRight size={20} style={{ color: "#0F172A" }} />
        </Button>
      )}

      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <ImageWithFallback
            src={photo.url}
            alt={photo.caption}
            className="w-full aspect-[16/10] object-cover"
          />
          {/* Close */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors h-auto cursor-pointer p-0"
          >
            <X size={16} className="text-white" />
          </Button>
          {/* Counter */}
          <div
            className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg"
            style={{
              background: "rgba(0,0,0,0.55)",
              fontSize: "0.6875rem",
              color: "#fff",
            }}
          >
            {index + 1} / {total}
          </div>
        </div>

        <div className="p-5">
          <p
            style={{ fontSize: "0.9375rem", color: "#0F172A" }}
            className="mb-1"
          >
            {photo.caption}
          </p>
          <div className="flex items-center gap-4 flex-wrap mb-3">
            <Link
              to={`/events/${photo.eventId}`}
              onClick={onClose}
              className="flex items-center gap-1 no-underline hover:underline"
              style={{ fontSize: "0.8125rem", color: "#7D152D" }}
            >
              <CalendarDays size={12} />
              {photo.eventName}
            </Link>
            <span
              className="flex items-center gap-1"
              style={{ fontSize: "0.8125rem", color: "#64748B" }}
            >
              <MapPin size={12} />
              {photo.location}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="px-2.5 py-1 rounded-lg"
              style={{
                fontSize: "0.6875rem",
                background: "#7D152D0F",
                color: "#7D152D",
              }}
            >
              <Megaphone
                size={10}
                className="inline mr-1"
                style={{ verticalAlign: "-1px" }}
              />
              {photo.campaignName}
            </span>
            <span style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
              {new Date(photo.date + "T12:00:00").toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          {/* Keyboard hint */}
          <p
            className="mt-3 pt-3 border-t border-[#F1F5F9]"
            style={{ fontSize: "0.625rem", color: "#CBD5E1" }}
          >
            Use{" "}
            <kbd
              className="px-1 py-0.5 rounded bg-[#F1F5F9] text-[#94A3B8]"
              style={{ fontSize: "0.5625rem" }}
            >
              ←
            </kbd>{" "}
            <kbd
              className="px-1 py-0.5 rounded bg-[#F1F5F9] text-[#94A3B8]"
              style={{ fontSize: "0.5625rem" }}
            >
              →
            </kbd>{" "}
            to navigate &middot;{" "}
            <kbd
              className="px-1 py-0.5 rounded bg-[#F1F5F9] text-[#94A3B8]"
              style={{ fontSize: "0.5625rem" }}
            >
              Esc
            </kbd>{" "}
            to close
          </p>
        </div>
      </div>
    </div>
  );
}
