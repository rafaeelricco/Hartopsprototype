// =============================================================================
// CampaignTag — non-editable, clickable badge that shows the parent campaign
// of a billing activity. Clicking opens the campaign detail page in a new tab.
// Surfaces the Power Automate joining string (campaign ID) on hover.
//
// Used across the billing experience (Missing Bills, Update Billing, Invoices,
// Invoice details, Edit modal) per Ivie's May-26 feedback that the operator
// should always see the campaign reference.
// =============================================================================

import { ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/shared/components/ui/tooltip";

interface CampaignTagProps {
  campaignId?: string | undefined;
  campaignName?: string | undefined;
  /** "compact" shows just the ID, "default" shows name + tiny ID, "inline" shows name only. */
  variant?: "compact" | "default" | "inline";
}

export function CampaignTag({
  campaignId,
  campaignName,
  variant = "default",
}: CampaignTagProps) {
  if (!campaignId && !campaignName) {
    return (
      <span
        style={{
          fontSize: "0.6875rem",
          color: "#94A3B8",
        }}
      >
        —
      </span>
    );
  }

  const href = campaignId ? `/staff/campaigns/${campaignId}` : undefined;
  const label =
    variant === "compact"
      ? (campaignId ?? campaignName ?? "")
      : (campaignName ?? campaignId ?? "");

  const content = (
    <span
      className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 transition-colors hover:bg-[#7D152D]/15 cursor-pointer"
      style={{
        background: "#7D152D0F",
        color: "#7D152D",
        fontSize: variant === "compact" ? "0.6875rem" : "0.75rem",
        fontWeight: 500,
        maxWidth: variant === "default" ? 200 : undefined,
      }}
    >
      <span className="truncate">{label}</span>
      {variant === "default" && campaignId && (
        <span
          style={{
            fontSize: "0.625rem",
            opacity: 0.55,
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {campaignId}
        </span>
      )}
      <ExternalLink size={10} style={{ opacity: 0.65 }} />
    </span>
  );

  if (!href) return content;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{ textDecoration: "none" }}
        >
          {content}
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <div style={{ fontSize: "0.75rem" }}>
          {campaignName ? (
            <>
              <strong>{campaignName}</strong>
              <div
                style={{
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, monospace",
                  opacity: 0.7,
                  marginTop: 2,
                }}
              >
                {campaignId}
              </div>
            </>
          ) : (
            <span>{campaignId}</span>
          )}
          <div
            style={{
              fontSize: "0.6875rem",
              opacity: 0.7,
              marginTop: 4,
            }}
          >
            Power Automate joining string · click to open campaign
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
