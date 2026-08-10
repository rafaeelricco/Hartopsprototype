// =============================================================================
// Reports (reporting brief §5)
// =============================================================================
// The deliverable is the mechanism, not the reports. This page is generated
// from the registry: catalogue cards, an archive of what has been run, and a
// small landing summary. A new report appears here for free.
//
// What used to live here — a Performance Trend area chart and a Campaign
// Comparison bar chart — has been removed. Reporting visualisations are scoped
// to workflow management this cycle (§7, §9), and §12 requires that no chart
// appears anywhere in the reporting UI. The quick stats and the proof-photo
// gallery are kept as the landing summary, per §2.
// =============================================================================

import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Camera,
  Download,
  Eye,
  FileText,
  Images,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
} from "@/app/shared/components/ui/card";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/shared/components/ui/dialog";
import { getQuickStats, PROOF_PHOTOS } from "./reports-data";
import { reportsByCategory } from "@/app/shared/data/report-registry";
import {
  REPORT_ARCHIVE,
  subscribeArchive,
  type ArchiveEntry,
} from "@/app/shared/data/report-archive";
import { useSyncExternalStore } from "react";

export function ReportsPage() {
  const stats = useMemo(() => getQuickStats("all"), []);
  const catalogue = useMemo(() => reportsByCategory(), []);
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState<ArchiveEntry | null>(null);

  const archive = useSyncExternalStore(
    subscribeArchive,
    () => REPORT_ARCHIVE.entries,
    () => REPORT_ARCHIVE.entries,
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalogue;
    return catalogue
      .map((g) => ({
        ...g,
        reports: g.reports.filter(
          (r) =>
            r.name.toLowerCase().includes(q) ||
            r.description.toLowerCase().includes(q) ||
            (r.legacyName ?? "").toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.reports.length > 0);
  }, [catalogue, query]);

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-foreground">Reports</h1>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontSize: "0.875rem" }}
          >
            Generate and download operational and sales reports
          </p>
        </div>
        <div className="relative">
          <Search className="size-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a report"
            className="pl-8 w-[220px]"
            aria-label="Find a report"
          />
        </div>
      </div>

      {/* Landing summary — kept from the previous page (§2). Text only. */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Activities", value: stats.events.toLocaleString("en-US") },
          { label: "Samples", value: stats.samples.toLocaleString("en-US") },
          {
            label: "Consumer reach",
            value: stats.consumerReach.toLocaleString("en-US"),
          },
          {
            label: "Proof photos",
            value: stats.photoCount.toLocaleString("en-US"),
          },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div
                className="text-muted-foreground"
                style={{ fontSize: "0.75rem" }}
              >
                {s.label}
              </div>
              <div
                className="text-foreground tabular-nums mt-0.5"
                style={{ fontSize: "1.5rem", fontWeight: 600 }}
              >
                {s.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Catalogue — generated from the registry ─────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-baseline gap-2">
          <h2
            className="text-foreground"
            style={{ fontSize: "1rem", fontWeight: 600 }}
          >
            Catalogue
          </h2>
          <span
            className="text-muted-foreground"
            style={{ fontSize: "0.75rem" }}
          >
            {filtered.reduce((n, g) => n + g.reports.length, 0)} reports
          </span>
        </div>

        {filtered.length === 0 && (
          <Card>
            <CardContent
              className="p-8 text-center"
              style={{ color: "var(--muted-foreground)" }}
            >
              No report matches “{query}”.
            </CardContent>
          </Card>
        )}

        {filtered.map((group) => (
          <div key={group.category} className="space-y-2">
            <div
              className="text-muted-foreground"
              style={{
                fontSize: "0.6875rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {group.category}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {group.reports.map((r) => (
                <Card
                  key={r.id}
                  className="hover:border-primary/40 transition-colors"
                >
                  <CardContent className="p-4 flex flex-col h-full gap-2">
                    <div className="flex items-start gap-2">
                      <div className="flex items-center justify-center size-8 rounded-md bg-[#7d152d]/8 shrink-0">
                        <FileText className="size-4 text-[#7d152d]" />
                      </div>
                      <div className="min-w-0">
                        <div
                          className="text-foreground"
                          style={{ fontSize: "0.875rem", fontWeight: 600 }}
                        >
                          {r.name}
                        </div>
                        {r.legacyName && r.legacyName !== r.name && (
                          <div
                            className="text-muted-foreground"
                            style={{ fontSize: "0.6875rem" }}
                          >
                            HEMS 1.0: {r.legacyName}
                          </div>
                        )}
                      </div>
                    </div>
                    <p
                      className="text-muted-foreground flex-1"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {r.description}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="text-muted-foreground"
                        style={{ fontSize: "0.6875rem" }}
                      >
                        {r.formats.join(" · ")}
                      </span>
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/staff/reports/${r.id}`}>
                          Run
                          <ArrowRight className="size-3.5 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Archive ─────────────────────────────────────────────────────── */}
      <section className="space-y-2">
        <div className="flex items-baseline gap-2">
          <h2
            className="text-foreground"
            style={{ fontSize: "1rem", fontWeight: 600 }}
          >
            Archive
          </h2>
          <span
            className="text-muted-foreground"
            style={{ fontSize: "0.75rem" }}
          >
            recently generated
          </span>
        </div>
        <Card>
          <CardContent className="p-0">
            {archive.length === 0 ? (
              <div
                className="p-8 text-center"
                style={{ color: "var(--muted-foreground)" }}
              >
                Nothing generated yet. Run a report from the catalogue above.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {archive.map((e) => (
                  <div
                    key={e.id}
                    className="flex items-center justify-between gap-3 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <div
                        className="text-foreground truncate"
                        style={{ fontSize: "0.875rem", fontWeight: 500 }}
                      >
                        {e.reportName}
                      </div>
                      {/* Every entry states what it covers without opening the
                          file — the §4 self-describing rule. */}
                      <div
                        className="text-muted-foreground truncate"
                        style={{ fontSize: "0.75rem" }}
                        title={e.parameterSummary}
                      >
                        {e.generatedLabel} · {e.parameterSummary}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className="rounded px-1.5 py-0.5"
                        style={{
                          fontSize: "0.6875rem",
                          background: "#f1f5f9",
                          color: "#475569",
                        }}
                      >
                        {e.format}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setPreview(e)}
                        title="Preview"
                      >
                        <Eye className="size-3.5" />
                      </Button>
                      <Button size="sm" variant="ghost" title="Download">
                        <Download className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* ── Proof photo gallery — kept per §2 ───────────────────────────── */}
      <section className="space-y-2">
        <div className="flex items-center gap-2">
          <Images className="size-4 text-[#7d152d]" />
          <h2
            className="text-foreground"
            style={{ fontSize: "1rem", fontWeight: 600 }}
          >
            Proof photos
          </h2>
          <span
            className="text-muted-foreground"
            style={{ fontSize: "0.75rem" }}
          >
            {PROOF_PHOTOS.length} from recent activities
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {PROOF_PHOTOS.slice(0, 12).map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group relative rounded-lg overflow-hidden border"
              style={{ borderColor: "var(--border)", aspectRatio: "4 / 3" }}
              title={`${p.eventName} — ${p.location}`}
            >
              <img
                src={p.url}
                alt={p.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div
                className="absolute inset-x-0 bottom-0 px-1.5 py-1 truncate"
                style={{
                  fontSize: "0.625rem",
                  color: "#fff",
                  background: "linear-gradient(transparent, rgba(0,0,0,.7))",
                }}
              >
                {p.campaignName}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Archive preview — the same tabular confirmation the runner shows. */}
      <Dialog open={!!preview} onOpenChange={(v) => (v ? null : setPreview(null))}>
        <DialogContent className="!max-w-[min(96vw,1100px)] w-[min(96vw,1100px)]">
          <DialogHeader>
            <DialogTitle>{preview?.reportName}</DialogTitle>
            <DialogDescription>
              {preview?.generatedLabel} · {preview?.parameterSummary} ·{" "}
              {preview?.format}
            </DialogDescription>
          </DialogHeader>
          <div
            className="rounded-lg border overflow-auto"
            style={{ borderColor: "var(--border)", maxHeight: 420 }}
          >
            <table className="w-full" style={{ fontSize: "0.75rem" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {preview?.columns.map((c) => (
                    <th
                      key={c}
                      className="text-left px-2 py-1.5 whitespace-nowrap"
                      style={{ color: "#64748b", fontWeight: 500 }}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview?.sampleRows.map((row, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: "#f1f5f9" }}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-2 py-1.5 whitespace-nowrap">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p
            className="flex items-center gap-1.5 text-muted-foreground"
            style={{ fontSize: "0.75rem" }}
          >
            <Camera className="size-3.5" />
            Mock export preview — the generated file is not produced in the
            prototype.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
