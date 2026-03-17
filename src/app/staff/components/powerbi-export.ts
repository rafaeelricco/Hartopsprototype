import { CAMPAIGN_METRICS } from "./reports-data";
import { INITIAL_EVENTS } from "./event-data";
import { INITIAL_CAMPAIGNS } from "./campaign-data";

/** Let's create proper CSV string escaping for values that might contain commas */
function escapeCSV(value: string | number | undefined | null): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/** Utility to download a string as a CSV file in the browser */
export function downloadCSV(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ============================================================================
// 1. Campaign Performance Export
// ============================================================================

export function exportCampaignMetricsCSV() {
  const headers = [
    "Campaign ID",
    "Campaign Name",
    "Status",
    "Events Completed",
    "Samples Distributed",
    "Consumer Reach",
    "Total Sales",
    "Conversion Rate",
    "Engagement Index",
    "Social Mentions",
    "Photos Collected",
  ];

  const rows = CAMPAIGN_METRICS.map((campaign) => [
    campaign.campaignId,
    campaign.campaignName,
    campaign.status,
    campaign.events,
    campaign.samples,
    campaign.consumerReach,
    campaign.totalSales,
    campaign.conversionRate,
    campaign.avgEngagement,
    campaign.socialMentions,
    campaign.photoCount,
  ]);

  const csvContent = [headers.join(",")]
    .concat(rows.map((row) => row.map(escapeCSV).join(",")))
    .join("\n");

  downloadCSV(
    `hart_ops_campaign_metrics_${new Date().toISOString().split("T")[0]}.csv`,
    csvContent,
  );
}

// ============================================================================
// 2. Event Details Export
// ============================================================================

export function exportEventDetailsCSV() {
  const headers = [
    "Event ID",
    "Campaign ID",
    "Campaign Name",
    "Event Name",
    "Date",
    "Location",
    "Venue Type",
    "Duration",
    "Objectives",
    "Status",
    "Created At",
  ];

  const rows = INITIAL_EVENTS.map((event) => {
    // Find the associated campaign to get its name
    const campaign = INITIAL_CAMPAIGNS.find((c) => c.id === event.campaignId);

    return [
      event.id,
      event.campaignId,
      campaign?.name || "Unknown Campaign",
      event.name,
      event.date,
      event.location,
      event.venueType,
      event.duration,
      event.objectives.join("; "),
      event.status,
      event.createdAt,
    ];
  });

  const csvContent = [headers.join(",")]
    .concat(rows.map((row) => row.map(escapeCSV).join(",")))
    .join("\n");

  downloadCSV(
    `hart_ops_event_details_${new Date().toISOString().split("T")[0]}.csv`,
    csvContent,
  );
}

// ============================================================================
// 3. Full Dataset Export (Merged Campaign + Event)
// ============================================================================
// Since CSV is flat, joining Event + Campaign data is the most robust way to
// export the "full dataset" without needing zip files or multiple sheets.

export function exportFullDatasetCSV() {
  const headers = [
    "Event ID",
    "Event Name",
    "Event Date",
    "Location",
    "Venue Type",
    "Event Status",
    "Objectives",
    "Campaign ID",
    "Campaign Name",
    "Campaign Status",
    "Supplier",
    "Target Markets",
    "Channels",
    "Campaign Objectives",
    "Completed Events (Campaign Total)",
    "Samples (Campaign Total)",
    "Sales (Campaign Total)",
  ];

  const rows = INITIAL_EVENTS.map((event) => {
    const campaign = INITIAL_CAMPAIGNS.find((c) => c.id === event.campaignId);
    const metrics = CAMPAIGN_METRICS.find(
      (m) => m.campaignId === event.campaignId,
    );

    return [
      event.id,
      event.name,
      event.date,
      event.location,
      event.venueType,
      event.status,
      event.objectives.join("; "),
      event.campaignId,
      campaign?.name || "",
      campaign?.status || "",
      campaign?.supplier || "",
      campaign?.targetMarkets?.join("; ") || "",
      campaign?.channels?.join("; ") || "",
      campaign?.objectives?.join("; ") || "",
      metrics?.events || 0,
      metrics?.samples || 0,
      metrics?.totalSales || 0,
    ];
  });

  const csvContent = [headers.join(",")]
    .concat(rows.map((row) => row.map(escapeCSV).join(",")))
    .join("\n");

  downloadCSV(
    `hart_ops_full_dataset_${new Date().toISOString().split("T")[0]}.csv`,
    csvContent,
  );
}
