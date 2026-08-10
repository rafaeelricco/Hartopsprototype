// =============================================================================
// Report page shell (reporting brief §5, revised 2026-08-10)
// =============================================================================
// Each report now has its OWN page under a Reports nav group, so the layout can
// suit the report rather than a generic runner. This shell carries only what
// every report genuinely shares — the date range, the top-level filters, the
// export control and the finalised-only note — and hands the body to the page.
//
// Deliberately NOT here: grain, column pickers, group-by, split-by. A report
// declares its own shape in the registry; the user picks a period and a few
// filters, reads the page, and exports if they want the raw rows.
// =============================================================================

import { useEffect, useMemo, useState } from "react";
import { Check, Download, Info, Loader2, X } from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { Card, CardContent } from "@/app/shared/components/ui/card";
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
  shortcutsFor,
  type ReportDefinition,
} from "@/app/shared/data/report-registry";
import {
  ENTITY_LABELS,
  type EntityType,
  type ReportFormat,
  type ReportParameters,
} from "@/app/shared/data/report-parameters";
import { entityOptions } from "@/app/shared/data/report-data";
import { runReport, type ReportResult } from "@/app/shared/data/report-engine";

const ALL = "__all__";

interface Props {
  def: ReportDefinition;
  /** The report's own body, given the live result and the resolved parameters. */
  children: (ctx: {
    result: ReportResult;
    params: ReportParameters;
  }) => React.ReactNode;
}

export function ReportPageShell({ def, children }: Props) {
  const [params, setParams] = useState<ReportParameters>(() =>
    defaultParameters(def),
  );
  const [generating, setGenerating] = useState(false);
  const [exported, setExported] = useState<string | null>(null);

  // Debounced so dragging a date doesn't recompute on every keystroke.
  const [debounced, setDebounced] = useState(params);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(params), 120);
    return () => clearTimeout(t);
  }, [params]);

  const result = useMemo(() => runReport(def, debounced), [def, debounced]);

  function patch(next: Partial<ReportParameters>) {
    setParams((p) => ({ ...p, ...next }));
    setExported(null);
  }

  function setFilter(entity: EntityType, value: string) {
    setParams((p) => {
      const scope = { ...p.scope };
      if (value === ALL) delete scope[entity];
      else scope[entity] = [value];
      return { ...p, scope };
    });
    setExported(null);
  }

  function handleExport() {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setExported(
        `${result.rowCount.toLocaleString("en-US")} rows exported as ${params.format}.`,
      );
    }, 400);
  }

  const activeFilters = Object.entries(params.scope).filter(
    ([, v]) => v && v.length > 0,
  );

  return (
    <div className="p-6 space-y-4 w-full">
      <div>
        <h1 className="text-foreground">{def.name}</h1>
        <p
          className="text-muted-foreground mt-1"
          style={{ fontSize: "0.875rem" }}
        >
          {def.description}
        </p>
      </div>

      {/* ── Period + top-level filters + export ─────────────────────────── */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <DateRangeControl
            value={{ shortcut: params.shortcut, range: params.range }}
            shortcuts={shortcutsFor(def)}
            onChange={(v) => patch({ shortcut: v.shortcut, range: v.range })}
          />

          <div className="flex flex-wrap items-center gap-2">
            {(def.scopeBy ?? []).map((entity) => {
              const options = entityOptions(
                entity as Parameters<typeof entityOptions>[0],
              );
              return (
                <Select
                  key={entity}
                  value={params.scope[entity]?.[0] ?? ALL}
                  onValueChange={(v) => setFilter(entity, v)}
                >
                  <SelectTrigger
                    className="w-[172px]"
                    aria-label={ENTITY_LABELS[entity]}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>
                      All {ENTITY_LABELS[entity].toLowerCase()}s
                    </SelectItem>
                    {options.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            })}

            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={() => patch({ scope: {} })}
                className="inline-flex items-center gap-1 hover:underline"
                style={{ fontSize: "0.75rem", color: "#7d152d" }}
              >
                <X className="size-3" />
                Clear {activeFilters.length} filter
                {activeFilters.length === 1 ? "" : "s"}
              </button>
            )}

            {/* Export is the secondary action — the page itself is the point. */}
            <div className="ml-auto flex items-center gap-2">
              <Select
                value={params.format}
                onValueChange={(v) => patch({ format: v as ReportFormat })}
              >
                <SelectTrigger className="w-[104px]" aria-label="Format">
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
              <Button
                variant="outline"
                onClick={handleExport}
                disabled={generating || result.rowCount === 0}
              >
                {generating ? (
                  <Loader2 className="size-4 mr-1.5 animate-spin" />
                ) : (
                  <Download className="size-4 mr-1.5" />
                )}
                {generating ? "Exporting…" : "Export"}
              </Button>
            </div>
          </div>

          {exported && (
            <div
              className="flex items-center gap-1.5"
              style={{ fontSize: "0.8125rem", color: "#0f766e" }}
            >
              <Check className="size-4" />
              {exported}
            </div>
          )}
        </CardContent>
      </Card>

      {result.excludedUnapproved > 0 && (
        <div
          className="flex items-start gap-2 rounded-lg p-2.5"
          style={{ background: "#f1f5f9" }}
        >
          <Info
            className="size-3.5 shrink-0 mt-0.5"
            style={{ color: "#64748b" }}
          />
          <p style={{ fontSize: "0.75rem", color: "#475569" }}>
            Only finalised activities feed reports.{" "}
            <strong>{result.excludedUnapproved}</strong> completed but
            unapproved{" "}
            {result.excludedUnapproved === 1 ? "activity is" : "activities are"}{" "}
            excluded.
          </p>
        </div>
      )}

      {result.rowCount === 0 ? (
        <Card>
          <CardContent className="p-10 text-center space-y-1">
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
              {result.emptyReason === "scope-excludes-all"
                ? "The filters exclude everything in this range — try clearing one."
                : "The date range is too narrow — try widening it."}
            </p>
          </CardContent>
        </Card>
      ) : (
        children({ result, params: debounced })
      )}
    </div>
  );
}

/** Shared totals strip. Text only — no charts anywhere in reporting (§7). */
export function TotalsStrip({
  totals,
}: {
  totals: { label: string; value: string }[];
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {totals.map((t) => (
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
  );
}
