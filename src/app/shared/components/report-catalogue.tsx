// =============================================================================
// Report catalogue + archive (reporting brief §5) — shared
// =============================================================================
// Rendered identically in Hart Ops and Hart Agency. Both read the same registry
// and the same archive; only the persona's visible categories and the base path
// differ. A new report appears in both for free.
// =============================================================================

import { useMemo, useState, useSyncExternalStore } from "react";
import { Link } from "react-router";
import { ArrowRight, Camera, Download, Eye, FileText, Search } from "lucide-react";
import { Card, CardContent } from "@/app/shared/components/ui/card";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/shared/components/ui/dialog";
import {
  reportsByCategory,
  type ReportCategory,
} from "@/app/shared/data/report-registry";
import {
  REPORT_ARCHIVE,
  subscribeArchive,
  type ArchiveEntry,
} from "@/app/shared/data/report-archive";

interface Props {
  /** Where the runner lives, e.g. `/ops/dashboard/reports`. */
  basePath: string;
  /** Categories this persona can run. Omitted = all of them. */
  categories?: ReportCategory[];
}

export function ReportCatalogue({ basePath, categories }: Props) {
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState<ArchiveEntry | null>(null);

  const archive = useSyncExternalStore(
    subscribeArchive,
    () => REPORT_ARCHIVE.entries,
    () => REPORT_ARCHIVE.entries,
  );

  const catalogue = useMemo(() => {
    const all = reportsByCategory();
    return categories
      ? all.filter((g) => categories.includes(g.category))
      : all;
  }, [categories]);

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

  const visibleIds = useMemo(
    () => new Set(catalogue.flatMap((g) => g.reports.map((r) => r.id))),
    [catalogue],
  );
  const visibleArchive = archive.filter((e) => visibleIds.has(e.reportId));

  return (
    <div className="space-y-6">
      {/* ── Catalogue ────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
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
                        <Link to={`${basePath}/${r.id}`}>
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

      {/* ── Archive ──────────────────────────────────────────────────────── */}
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
            {visibleArchive.length === 0 ? (
              <div
                className="p-8 text-center"
                style={{ color: "var(--muted-foreground)" }}
              >
                Nothing generated yet. Run a report from the catalogue above.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {visibleArchive.map((e) => (
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
                      {/* States what it covers without opening the file (§4). */}
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
                  <tr
                    key={i}
                    className="border-t"
                    style={{ borderColor: "#f1f5f9" }}
                  >
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
