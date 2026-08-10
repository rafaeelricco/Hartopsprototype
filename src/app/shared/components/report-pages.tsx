// =============================================================================
// The report pages (reporting brief §8, revised 2026-08-10)
// =============================================================================
// One page per report, each free to lay its data out the way that report wants.
// They share the period/filter/export shell and the data engine; everything
// below that is the report's own.
//
// Read-first: the page is meant to be looked at. Export hands over the raw rows
// for anyone who wants to dissect them in Excel.
// =============================================================================

import { Card, CardContent } from "@/app/shared/components/ui/card";
import {
  ReportPageShell,
  TotalsStrip,
} from "@/app/shared/components/report-page-shell";
import { getReport, visibleColumns } from "@/app/shared/data/report-registry";
import { formatCell, type ReportRow } from "@/app/shared/data/report-engine";

const ROWS_ON_SCREEN = 40;

function SectionHeading({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <h2
        className="text-foreground"
        style={{ fontSize: "1rem", fontWeight: 600 }}
      >
        {title}
      </h2>
      {hint && (
        <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
          {hint}
        </span>
      )}
    </div>
  );
}

/** Shared table body — used where a report's job really is a grid of rows. */
function RowTable({
  columns,
  rows,
  limit = ROWS_ON_SCREEN,
}: {
  columns: { key: string; label: string; align?: "left" | "right" }[];
  rows: ReportRow[];
  limit?: number;
}) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-auto" style={{ maxHeight: 520 }}>
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
              {rows.slice(0, limit).map((row, i) => (
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
        {rows.length > limit && (
          <div
            className="px-3 py-2 border-t text-muted-foreground"
            style={{ borderColor: "var(--border)", fontSize: "0.75rem" }}
          >
            Showing first {limit} of {rows.length.toLocaleString("en-US")} rows ·
            export contains every row and column
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// =============================================================================
// Activity Detail — the wide operational export
// =============================================================================
// 47 columns nobody reads on screen, so the page leads with a readable summary
// of each activity and keeps the full grid below for spot-checking. The export
// is the real artefact here.

export function ActivityDetailReportPage() {
  const def = getReport("activity-detail")!;
  const columns = visibleColumns(def);

  return (
    <ReportPageShell def={def}>
      {({ result }) => {
        // Group product rows back under their activity for the on-screen read.
        const byActivity = new Map<string, ReportRow[]>();
        for (const r of result.rows) {
          const key = String(r["activityId"]);
          const bucket = byActivity.get(key);
          if (bucket) bucket.push(r);
          else byActivity.set(key, [r]);
        }

        return (
          <div className="space-y-4">
            <TotalsStrip totals={result.totals} />

            <SectionHeading
              title="Activities"
              hint={`${byActivity.size} in this period`}
            />
            <div className="space-y-2">
              {Array.from(byActivity.values())
                .slice(0, 12)
                .map((rows) => {
                  const a = rows[0]!;
                  const bottles = rows.reduce(
                    (s, r) => s + (Number(r["bottlesSold"]) || 0),
                    0,
                  );
                  const revenue = rows.reduce(
                    (s, r) => s + (Number(r["revenueAtRetail"]) || 0),
                    0,
                  );
                  return (
                    <Card key={String(a["activityId"])}>
                      <CardContent className="p-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div
                              className="text-foreground"
                              style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                            >
                              {String(a["activityName"])}
                            </div>
                            <div
                              className="text-muted-foreground mt-0.5"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {String(a["date"])} · {String(a["account"])} ·{" "}
                              {String(a["region"])} · {String(a["territory"])} ·{" "}
                              {String(a["premiseType"])} ·{" "}
                              {String(a["campaign"])}
                            </div>
                          </div>
                          <div className="flex gap-5 shrink-0">
                            {[
                              {
                                label: "Sampled",
                                value: formatCell(
                                  "consumersSampled",
                                  rows.reduce(
                                    (s, r) =>
                                      s + (Number(r["consumersSampled"]) || 0),
                                    0,
                                  ),
                                ),
                              },
                              { label: "Bottles", value: bottles.toLocaleString("en-US") },
                              {
                                label: "Revenue",
                                value: formatCell("revenueAtRetail", revenue),
                              },
                            ].map((m) => (
                              <div key={m.label} className="text-right">
                                <div
                                  className="text-muted-foreground"
                                  style={{ fontSize: "0.6875rem" }}
                                >
                                  {m.label}
                                </div>
                                <div
                                  className="text-foreground tabular-nums"
                                  style={{ fontSize: "0.875rem", fontWeight: 600 }}
                                >
                                  {m.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Per-product detail — the by-bottle cut Leah asked for. */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {rows.map((r, i) => (
                            <span
                              key={i}
                              className="rounded px-2 py-1"
                              style={{
                                fontSize: "0.6875rem",
                                background: "#f8fafc",
                                border: "1px solid #e2e8f0",
                                color: "#475569",
                              }}
                            >
                              {String(r["productName"])} ·{" "}
                              <strong>{String(r["bottlesSold"])}</strong> sold ·{" "}
                              {formatCell("price", r["price"] ?? 0)}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>

            <SectionHeading
              title="Full detail"
              hint={`${result.rowCount} rows · ${columns.length} columns · what the export contains`}
            />
            <RowTable columns={columns} rows={result.rows} />
          </div>
        );
      }}
    </ReportPageShell>
  );
}

// =============================================================================
// Company Sales — a roll-up, so the page is the table
// =============================================================================

export function CompanySalesReportPage() {
  const def = getReport("company-sales")!;
  const columns = visibleColumns(def);

  return (
    <ReportPageShell def={def}>
      {({ result }) => (
        <div className="space-y-4">
          <TotalsStrip totals={result.totals} />

          {def.provisionalColumns && (
            <div
              className="flex items-start gap-2 rounded-lg border p-3"
              style={{ borderColor: "#fde68a", background: "#fffbeb" }}
            >
              <p style={{ fontSize: "0.75rem", color: "#92400e" }}>
                {def.provisionalColumns}
              </p>
            </div>
          )}

          <SectionHeading
            title="By company"
            hint={`${result.rowCount} companies`}
          />
          <RowTable columns={columns} rows={result.rows} />
        </div>
      )}
    </ReportPageShell>
  );
}

// =============================================================================
// Supplier-Based Activities — registered and paged with no bespoke logic
// =============================================================================

export function SupplierBasedReportPage() {
  const def = getReport("supplier-based")!;
  const columns = visibleColumns(def);

  return (
    <ReportPageShell def={def}>
      {({ result }) => (
        <div className="space-y-4">
          <TotalsStrip totals={result.totals} />
          <SectionHeading
            title="By supplier"
            hint={`${result.rowCount} suppliers`}
          />
          <RowTable columns={columns} rows={result.rows} />
        </div>
      )}
    </ReportPageShell>
  );
}
