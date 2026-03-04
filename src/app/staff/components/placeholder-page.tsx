// =============================================================================
// Placeholder page for nav items that are out-of-scope for MM-UI-001.
// Shows a clean "coming soon" state so the sidebar navigation feels complete.
// =============================================================================

import { useLocation } from "react-router";
import { Construction } from "lucide-react";

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/staff/campaigns": {
    title: "Campaigns",
    description: "Manage and monitor your promotional campaigns.",
  },
  "/staff/events": {
    title: "Events",
    description: "Track upcoming and past promotional events.",
  },
  "/staff/reports": {
    title: "Reports",
    description: "Generate and export performance reports.",
  },
  "/staff/brand-assets": {
    title: "Brand Assets",
    description: "Access logos, templates, and brand guidelines.",
  },
  "/staff/settings": {
    title: "Settings",
    description: "Configure your account and preferences.",
  },
};

export function PlaceholderPage() {
  const location = useLocation();
  const meta = PAGE_META[location.pathname] ?? {
    title: "Page",
    description: "This section is under construction.",
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6" style={{ minHeight: "calc(100vh - 60px)" }}>
      <div className="text-center max-w-sm">
        <div
          className="mx-auto w-14 h-14 rounded-xl flex items-center justify-center mb-5"
          style={{ background: "#7D152D0F" }}
        >
          <Construction size={26} style={{ color: "#7D152D" }} />
        </div>
        <h2 className="mb-2" style={{ fontSize: "1.25rem", color: "#0F172A" }}>
          {meta.title}
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "#64748B", lineHeight: 1.6 }}>
          {meta.description}
        </p>
        <p className="mt-1" style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
          Coming soon — stay tuned.
        </p>
      </div>
    </div>
  );
}
