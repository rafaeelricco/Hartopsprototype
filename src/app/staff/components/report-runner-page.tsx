// =============================================================================
// Report runner (reporting brief §6)
// =============================================================================
// One shell for every report: parameterise → preview → export. The report
// changes; the interaction never does.
//
// The runner renders exactly the parameters the selected report declares, in
// the fixed §4 order. Parameters a report doesn't support are ABSENT — never
// disabled or greyed.
// =============================================================================

import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  Check,
  Download,
  Info,
  Loader2,
  TriangleAlert,
  X,
} from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { Card, CardContent } from "@/app/shared/components/ui/card";
import { Checkbox } from "@/app/shared/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/components/ui/select";
import { DateRangeControl } from "@/app/shared/components/date-range-control";
import {
  defaultParameters,
  getReport,
  shortcutsFor,
  visibleColumns,
} from "@/app/shared/data/report-registry";
import {
  ENTITY_LABELS,
  GRAIN_LABELS,
  GROUPING_LABELS,
  SECTION_HINTS,
  SECTION_LABELS,
  type EntityType,
  type Grain,
  type Grouping,
  type ReportFormat,
  type ReportParameters,
  type SectionId,
} from "@/app/shared/data/report-parameters";
import { entityOptions } from "@/app/shared/data/report-data";
import { formatCell, runReport } from "@/app/shared/data/report-engine";
import {
  addArchiveEntry,
  summariseParameters,
} from "@/app/shared/data/report-archive";

const PREVIEW_ROWS = 20;

/** Section label used above each parameter group, so the shape is learnable. */
function ParamGroup({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div
        className="text-foreground"
        style={{ fontSize: "0.8125rem", fontWeight: 600 }}
      >
        {label}
      </div>
      {hint && (
        <p className="text-muted-foreground" style={{ fontSize: "0.6875rem" }}>
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

export function ReportRunnerPage() {
  const { reportId } = useParams();
  const def = reportId ? getReport(reportId) : undefined;

  const [params, setParams] = useState<ReportParameters | null>(
    def ? defaultParameters(def) : null,
  );
  const [generating, setGenerating] = useState(false);
  const [justGenerated, setJustGenerated] = useState<string | null>(null);

  // Reset when navigating between reports.
  useEffect(() => {
    setParams(def ? defaultParameters(def) : null);
    setJustGenerated(null);
  }, [def]);

  // Preview updates live as parameters change — the row counts are the fastest
  // signal that a parameter is wrong (§6). Debounced so typing/dragging in the
  // date inputs doesn't recompute on every keystroke.
  const [debounced, setDebounced] = useState(params);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(params), 120);
    return () => clearTimeout(t);
  }, [params]);

  const result = useMemo(
    () => (def && debounced ? runReport(def, debounced) : null),
    [def, debounced],
  );

  const columns = useMemo(
    () => (def && debounced ? visibleColumns(def, debounced) : []),
    [def, debounced],
  );

  if (!def || !params) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">
          Unknown report.{" "}
          <Link to="/staff/reports" className="text-primary underline">
            Back to Reports
          </Link>
        </p>
      </div>
    );
  }

  function patch(next: Partial<ReportParameters>) {
    setParams((p) => (p ? { ...p, ...next } : p));
    setJustGenerated(null);
  }

  function toggleSection(id: SectionId) {
    setParams((p) => {
      if (!p) return p;
      const has = p.sections.includes(id);
      return {
        ...p,
        sections: has
          ? p.sections.filter((s) => s !== id)
          : [...p.sections, id],
      };
    });
    setJustGenerated(null);
  }

  function toggleScopeValue(entity: EntityType, value: string) {
    setParams((p) => {
      if (!p) return p;
      const current = p.scope[entity] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      const scope = { ...p.scope };
      if (next.length === 0) delete scope[entity];
      else scope[entity] = next;
      return { ...p, scope };
    });
    setJustGenerated(null);
  }

  function handleGenerate() {
    if (!def || !params || !result) return;
    setGenerating(true);
    setTimeout(() => {
      const entry = addArchiveEntry({
        reportId: def.id,
        reportName: def.name,
        parameterSummary: summariseParameters(def, params),
        format: params.format,
        parameters: params,
        columns: columns.map((c) => c.label),
        sampleRows: result.rows
          .slice(0, PREVIEW_ROWS)
          .map((r) => columns.map((c) => formatCell(c.key, r[c.key] ?? ""))),
        rowCount: result.rowCount,
      });
      setGenerating(false);
      // Generate confirms inline and does NOT navigate away — users run several
      // reports in a sitting (§6).
      setJustGenerated(
        params.splitBy
          ? `${def.name} — ${params.format}, split by ${ENTITY_LABELS[params.splitBy].toLowerCase()}. Added to the archive.`
          : `${entry.reportName} — ${entry.format}. Added to the archive.`,
      );
    }, 450);
  }

  const scopeEntities = def.scopeBy ?? [];
  const activeScopeCount = Object.values(params.scope).reduce(
    (n, v) => n + (v?.length ?? 0),
    0,
  );

  return (
    <div className="p-6 space-y-4 w-full">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Button asChild variant="ghost" size="sm" className="mt-0.5">
          <Link to="/staff/reports" aria-label="Back to Reports">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-foreground">{def.name}</h1>
          <p
            className="text-muted-foreground mt-0.5"
            style={{ fontSize: "0.875rem" }}
          >
            {def.description}
          </p>
        </div>
      </div>

      {/* Column set flagged as unconfirmed, where it is. */}
      {def.provisionalColumns && (
        <div
          className="flex items-start gap-2 rounded-lg border p-3"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <TriangleAlert
            className="size-4 shrink-0 mt-0.5"
            style={{ color: "#92400e" }}
          />
          <p style={{ fontSize: "0.75rem", color: "#92400e" }}>
            {def.provisionalColumns}
          </p>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[320px_1fr] items-start">
        {/* ── PARAMETERS — fixed §4 order ──────────────────────────────── */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div
              className="text-muted-foreground"
              style={{
                fontSize: "0.6875rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Parameters
            </div>

            {/* 1 · Date range */}
            <ParamGroup label="Date range">
              <DateRangeControl
                value={{ shortcut: params.shortcut, range: params.range }}
                shortcuts={shortcutsFor(def)}
                stacked
                onChange={(v) =>
                  patch({ shortcut: v.shortcut, range: v.range })
                }
              />
            </ParamGroup>

            {/* 2 · Entity scope */}
            {scopeEntities.length > 0 && (
              <ParamGroup
                label="Scope"
                hint={
                  activeScopeCount === 0
                    ? "Unfiltered — all activities in range."
                    : undefined
                }
              >
                <div className="space-y-2">
                  {scopeEntities.map((entity) => {
                    const options = entityOptions(
                      entity as Parameters<typeof entityOptions>[0],
                    );
                    const selected = params.scope[entity] ?? [];
                    return (
                      <div key={entity}>
                        <Select
                          value=""
                          onValueChange={(v) => toggleScopeValue(entity, v)}
                        >
                          <SelectTrigger
                            className="w-full"
                            aria-label={ENTITY_LABELS[entity]}
                          >
                            <SelectValue
                              placeholder={`${ENTITY_LABELS[entity]}${
                                selected.length > 0
                                  ? ` (${selected.length})`
                                  : ""
                              }`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {options.map((o) => (
                              <SelectItem key={o} value={o}>
                                {selected.includes(o) ? "✓ " : ""}
                                {o}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selected.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selected.map((v) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => toggleScopeValue(entity, v)}
                                className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 hover:opacity-80"
                                style={{
                                  fontSize: "0.6875rem",
                                  background: "#7d152d10",
                                  color: "#7d152d",
                                }}
                              >
                                {v}
                                <X className="size-3" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </ParamGroup>
            )}

            {/* 3 · Grouping */}
            {def.groupings && def.groupings.length > 0 && (
              <ParamGroup label="Group by">
                <Select
                  value={params.grouping ?? def.groupings[0]!}
                  onValueChange={(v) => patch({ grouping: v as Grouping })}
                >
                  <SelectTrigger className="w-full" aria-label="Group by">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {def.groupings.map((g) => (
                      <SelectItem key={g} value={g}>
                        {GROUPING_LABELS[g]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </ParamGroup>
            )}

            {/* 4 · Breakdown grain */}
            {def.supportsGrain && (
              <ParamGroup
                label="Grain"
                hint="By product gives one row per product per activity."
              >
                <div className="flex rounded-md border overflow-hidden">
                  {(["activity", "product"] as Grain[]).map((g) => {
                    const active = (params.grain ?? "activity") === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => patch({ grain: g })}
                        className="flex-1 px-2 py-1.5 transition-colors"
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: active ? 600 : 400,
                          background: active ? "#7d152d" : "transparent",
                          color: active ? "#fff" : "var(--muted-foreground)",
                        }}
                      >
                        {GRAIN_LABELS[g]}
                      </button>
                    );
                  })}
                </div>
              </ParamGroup>
            )}

            {/* 5 · Included sections */}
            {def.sections && def.sections.length > 0 && (
              <ParamGroup label="Include">
                <div className="space-y-1.5">
                  {def.sections.map((s) => (
                    <label
                      key={s}
                      className="flex items-start gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={params.sections.includes(s)}
                        onCheckedChange={() => toggleSection(s)}
                        className="mt-0.5"
                      />
                      <span>
                        <span
                          className="text-foreground"
                          style={{ fontSize: "0.8125rem" }}
                        >
                          {SECTION_LABELS[s]}
                        </span>
                        <span
                          className="block text-muted-foreground"
                          style={{ fontSize: "0.6875rem" }}
                        >
                          {SECTION_HINTS[s]}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </ParamGroup>
            )}

            {/* 6 · Toggles */}
            {def.toggles && def.toggles.length > 0 && (
              <ParamGroup label="Options">
                <div className="space-y-1.5">
                  {def.toggles.map((t) => (
                    <label
                      key={t.id}
                      className="flex items-start gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={params.toggles[t.id] === true}
                        onCheckedChange={(v) =>
                          patch({
                            toggles: { ...params.toggles, [t.id]: v === true },
                          })
                        }
                        className="mt-0.5"
                      />
                      <span>
                        <span
                          className="text-foreground"
                          style={{ fontSize: "0.8125rem" }}
                        >
                          {t.label}
                        </span>
                        {t.hint && (
                          <span
                            className="block text-muted-foreground"
                            style={{ fontSize: "0.6875rem" }}
                          >
                            {t.hint}
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </ParamGroup>
            )}

            {/* 7 · Split by */}
            {def.splitBy && def.splitBy.length > 0 && (
              <ParamGroup
                label="Split"
                hint="Generates one file per value."
              >
                <Select
                  value={params.splitBy ?? "__none__"}
                  onValueChange={(v) =>
                    patch({ splitBy: v === "__none__" ? null : (v as EntityType) })
                  }
                >
                  <SelectTrigger className="w-full" aria-label="Split by">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">Single file</SelectItem>
                    {def.splitBy.map((s) => (
                      <SelectItem key={s} value={s}>
                        One file per {ENTITY_LABELS[s].toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </ParamGroup>
            )}

            {/* 8 · Format */}
            <ParamGroup label="Format">
              <Select
                value={params.format}
                onValueChange={(v) => patch({ format: v as ReportFormat })}
              >
                <SelectTrigger className="w-full" aria-label="Format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {def.formats.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </ParamGroup>
          </CardContent>
        </Card>

        {/* ── PREVIEW — confirmation device, never a reading surface ─────── */}
        <div className="space-y-3">
          {/* Headline totals. Text only — no charts anywhere (§7). */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {result?.totals.map((t) => (
                  <div key={t.label}>
                    <div
                      className="text-muted-foreground"
                      style={{ fontSize: "0.6875rem" }}
                    >
                      {t.label}
                    </div>
                    <div
                      className="text-foreground tabular-nums"
                      style={{ fontSize: "1.125rem", fontWeight: 600 }}
                    >
                      {t.value}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Persistent note — the single most likely source of
              "why isn't my activity in here" (§6). */}
          <div
            className="flex items-start gap-2 rounded-lg p-2.5"
            style={{ background: "#f1f5f9" }}
          >
            <Info
              className="size-3.5 shrink-0 mt-0.5"
              style={{ color: "#64748b" }}
            />
            <p style={{ fontSize: "0.75rem", color: "#475569" }}>
              Only finalised activities feed reports.
              {result && result.excludedUnapproved > 0 && (
                <>
                  {" "}
                  <strong>{result.excludedUnapproved}</strong> completed but
                  unapproved{" "}
                  {result.excludedUnapproved === 1 ? "activity is" : "activities are"}{" "}
                  excluded
                  {def.toggles?.some((t) => t.id === "includeUnapproved")
                    ? " — tick “Include unapproved activities” to add them."
                    : "."}
                </>
              )}
            </p>
          </div>

          <Card>
            <CardContent className="p-0">
              {result && result.rows.length > 0 ? (
                <>
                  <div className="overflow-auto" style={{ maxHeight: 460 }}>
                    <table className="w-full" style={{ fontSize: "0.75rem" }}>
                      <thead className="sticky top-0">
                        <tr style={{ background: "#f8fafc" }}>
                          {columns.map((c) => (
                            <th
                              key={c.key}
                              className={`px-2 py-2 whitespace-nowrap ${
                                c.align === "right" ? "text-right" : "text-left"
                              }`}
                              style={{ color: "#64748b", fontWeight: 500 }}
                            >
                              {c.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {result.rows.slice(0, PREVIEW_ROWS).map((row, i) => (
                          <tr
                            key={i}
                            className="border-t"
                            style={{ borderColor: "#f1f5f9" }}
                          >
                            {columns.map((c) => (
                              <td
                                key={c.key}
                                className={`px-2 py-1.5 whitespace-nowrap ${
                                  c.align === "right" ? "text-right tabular-nums" : ""
                                }`}
                              >
                                {formatCell(c.key, row[c.key] ?? "")}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-t"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <span
                      className="text-muted-foreground"
                      style={{ fontSize: "0.75rem" }}
                    >
                      Showing first{" "}
                      {Math.min(PREVIEW_ROWS, result.rowCount)} of{" "}
                      {result.rowCount.toLocaleString("en-US")} rows
                      {/* Makes the grain choice legible: the row count is the
                          fastest signal that the grain flipped. */}
                      {params.grain === "product" && !params.grouping && (
                        <>
                          {" "}
                          · {result.activityCount} activities ×{" "}
                          {(result.rowCount / Math.max(1, result.activityCount)).toFixed(
                            1,
                          )}{" "}
                          products avg
                        </>
                      )}
                      {" "}· {columns.length} columns
                    </span>
                  </div>
                </>
              ) : (
                // Empty result is a first-class state, with the two most likely
                // causes named (§6).
                <div className="p-10 text-center space-y-1">
                  <p
                    className="text-foreground"
                    style={{ fontSize: "0.875rem", fontWeight: 500 }}
                  >
                    No activities match these parameters
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    {result?.emptyReason === "scope-excludes-all"
                      ? "The scope filters exclude everything in this range — try clearing a filter."
                      : "The date range is too narrow — try widening it."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generate */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
              {summariseParameters(def, params)}
            </div>
            <div className="flex items-center gap-2">
              {justGenerated && (
                <span
                  className="flex items-center gap-1.5"
                  style={{ fontSize: "0.8125rem", color: "#0f766e" }}
                >
                  <Check className="size-4" />
                  {justGenerated}
                </span>
              )}
              <Button
                onClick={handleGenerate}
                disabled={generating || !result || result.rows.length === 0}
              >
                {generating ? (
                  <Loader2 className="size-4 mr-1.5 animate-spin" />
                ) : (
                  <Download className="size-4 mr-1.5" />
                )}
                {generating ? "Generating…" : `Generate ${params.format}`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
