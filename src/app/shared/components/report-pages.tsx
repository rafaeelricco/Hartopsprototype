// =============================================================================
// The report pages (reporting brief §8, revised 2026-08-10)
// =============================================================================
// One page per report, each free to lay its data out the way that report wants.
// They share the period/filter/export shell and the data engine; everything
// below that is the report's own.
//
// The table IS the page. An earlier pass led with per-activity summary cards
// above the grid; they duplicated the table's content and were dropped. Export
// hands over the raw rows for anyone who wants to dissect them in Excel.
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
  groupBy,
}: {
  columns: { key: string; label: string; align?: "left" | "right" }[];
  rows: ReportRow[];
  limit?: number;
  /**
   * Column key whose value marks a logical group. At product grain one activity
   * spans several rows; a rule between groups stops that reading as duplicated
   * content. Presentational only — the export still carries every value.
   */
  groupBy?: string;
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
              {rows.slice(0, limit).map((row, i, shown) => {
                const startsGroup =
                  !!groupBy &&
                  (i === 0 || shown[i - 1]![groupBy] !== row[groupBy]);
                return (
                <tr
                  key={i}
                  className="border-t"
                  style={{
                    borderColor: startsGroup ? "#cbd5e1" : "#f1f5f9",
                    borderTopWidth: startsGroup && i > 0 ? 2 : 1,
                  }}
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
                );
              })}
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
// One row per product per activity, grouped visually by activity so the
// repeated identity columns don't read as duplicate rows. The export is the
// real artefact here.

export function ActivityDetailReportPage() {
  const def = getReport("activity-detail")!;
  const columns = visibleColumns(def);

  return (
    <ReportPageShell def={def}>
      {({ result }) => (
        <div className="space-y-4">
          <TotalsStrip totals={result.totals} />
          <SectionHeading
            title="Activity detail"
            hint={`${result.rowCount} rows · ${columns.length} columns · one row per product per activity`}
          />
          {/* Grouped by activity so the per-product rows don't read as
              duplicates — the same data the export carries. */}
          <RowTable
            columns={columns}
            rows={result.rows}
            groupBy="activityId"
          />
        </div>
      )}
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
