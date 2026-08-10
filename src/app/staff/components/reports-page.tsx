// =============================================================================
// Reports — Hart Agency (reporting brief §5)
// =============================================================================
// The catalogue, runner and archive are shared with Hart Ops; this page only
// supplies the persona's scope and its landing summary. Client Staff run
// activity, sales and workforce reports — billing and payroll are Ops-scoped
// and appear in the Ops catalogue instead.
//
// The Performance Trend and Campaign Comparison charts that used to live here
// are gone: reporting visualisations are scoped to workflow management this
// cycle (§7, §9), and §12 requires no chart anywhere in the reporting UI. The
// quick stats and proof-photo gallery are kept as the landing summary (§2).
// =============================================================================

import { useMemo } from "react";
import { Images } from "lucide-react";
import { Card, CardContent } from "@/app/shared/components/ui/card";
import { ReportCatalogue } from "@/app/shared/components/report-catalogue";
import { ReportRunner } from "@/app/shared/components/report-runner";
import { getQuickStats, PROOF_PHOTOS } from "./reports-data";

export function ReportsPage() {
  const stats = useMemo(() => getQuickStats("all"), []);

  return (
    <div className="p-6 space-y-6 w-full">
      <div>
        <h1 className="text-foreground">Reports</h1>
        <p
          className="text-muted-foreground mt-1"
          style={{ fontSize: "0.875rem" }}
        >
          Generate and download operational and sales reports
        </p>
      </div>

      {/* Landing summary — text only. */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Activities", value: stats.events },
          { label: "Samples", value: stats.samples },
          { label: "Consumer reach", value: stats.consumerReach },
          { label: "Proof photos", value: stats.photoCount },
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
                {s.value.toLocaleString("en-US")}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ReportCatalogue
        basePath="/staff/reports"
        categories={["Activity", "Sales", "Workforce"]}
      />

      {/* Proof photo gallery — kept per §2. */}
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
    </div>
  );
}

/** Route wrapper — the runner itself is shared with Hart Ops. */
export function ReportRunnerPage() {
  return <ReportRunner basePath="/staff/reports" />;
}
