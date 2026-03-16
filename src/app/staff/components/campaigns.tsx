// =============================================================================
// Campaign Library — MM-UI-002
// Card-based grid view with search, status filters, pagination, and
// "Create Campaign" CTA. Uses shared CampaignContext for state.
// =============================================================================

import { useState, useMemo } from "react";
import { Link } from "react-router";
import { PageHeader } from "../../shared/components/layouts/page-header";
import {
  Plus,
  Search,
  CalendarDays,
  Megaphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { type Campaign } from "./campaign-data";
import { useCampaignContext } from "./campaign-context";
import {
  CreateCampaignModal,
  type CreateCampaignFormData,
} from "./create-campaign-modal";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";

const PAGE_SIZE = 6;

const STATUS_STYLES: Record<
  Campaign["status"],
  { bg: string; text: string; dot: string; label: string }
> = {
  active: { bg: "#ECFDF5", text: "#0F766E", dot: "#0F766E", label: "Active" },
  draft: { bg: "#F1F5F9", text: "#64748B", dot: "#94A3B8", label: "Draft" },
  completed: {
    bg: "#FEF2F2",
    text: "#B91C1C",
    dot: "#B91C1C",
    label: "Completed",
  },
};

const STATUS_FILTERS: Campaign["status"][] = ["active", "draft", "completed"];

export function Campaigns() {
  const { campaigns, createCampaign, existingCampaignNames } =
    useCampaignContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Campaign["status"] | "all">(
    "all",
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Derived: filtered campaigns
  const filtered = useMemo(() => {
    let result = campaigns;
    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q),
      );
    }
    return result;
  }, [campaigns, search, statusFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedCampaigns = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  // Reset to page 1 when filters change
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };
  const handleStatusFilter = (value: Campaign["status"] | "all") => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  function handleCreate(data: CreateCampaignFormData): string | null {
    const error = createCampaign(data);
    if (error) return error;
    setModalOpen(false);
    setCurrentPage(1);
    return null;
  }

  // Stats
  const activeCount = campaigns.filter((c) => c.status === "active").length;
  const totalEvents = campaigns.reduce((sum, c) => sum + c.eventCount, 0);

  return (
    <div className="p-6 font-[Inter]">
      {/* ---------------------------------------------------------------- */}
      {/* Header                                                           */}
      {/* ---------------------------------------------------------------- */}
      <PageHeader
        title="Campaigns"
        subtitle={
          <>
            {campaigns.length} campaigns &middot; {activeCount} active &middot;{" "}
            {totalEvents} total events
          </>
        }
        actions={
          <Button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 h-11 rounded-lg text-white transition-opacity hover:opacity-90 cursor-pointer"
            style={{ background: "#7D152D", fontSize: "0.875rem" }}
          >
            <Plus size={16} strokeWidth={2.5} />
            Create Campaign
          </Button>
        }
      />

      {/* ---------------------------------------------------------------- */}
      {/* Toolbar — search + status pills                                  */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          />
          <Input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search campaigns…"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E2E8F0] bg-white focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 transition-colors h-auto shadow-none"
            style={{ fontSize: "0.875rem" }}
          />
        </div>

        {/* Status filter pills */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            onClick={() => handleStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer h-auto ${
              statusFilter === "all"
                ? "text-white hover:bg-[#7D152D] hover:text-white"
                : "text-[#64748B] bg-[#F1F5F9] hover:bg-[#E2E8F0] hover:text-[#0F172A]"
            }`}
            style={
              statusFilter === "all"
                ? { background: "#7D152D", fontSize: "0.8125rem" }
                : { fontSize: "0.8125rem" }
            }
          >
            All
          </Button>
          {STATUS_FILTERS.map((s) => {
            const meta = STATUS_STYLES[s];
            const isActive = statusFilter === s;
            return (
              <Button
                key={s}
                variant="ghost"
                onClick={() => handleStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer h-auto ${
                  isActive
                    ? "text-white hover:bg-[#7D152D] hover:text-white"
                    : "text-[#64748B] bg-[#F1F5F9] hover:bg-[#E2E8F0] hover:text-[#0F172A]"
                }`}
                style={
                  isActive
                    ? { background: "#7D152D", fontSize: "0.8125rem" }
                    : { fontSize: "0.8125rem" }
                }
              >
                {meta.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Campaign card grid                                               */}
      {/* ---------------------------------------------------------------- */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
            style={{ background: "#7D152D0F" }}
          >
            <Megaphone size={26} style={{ color: "#7D152D" }} />
          </div>
          <p style={{ fontSize: "1rem", color: "#0F172A" }} className="mb-1">
            No campaigns found
          </p>
          <p style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
            {search || statusFilter !== "all"
              ? "Try adjusting your search or filters."
              : "Create your first campaign to get started."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {paginatedCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 pt-5 border-t border-[#F1F5F9]">
              <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
                Showing {(safePage - 1) * PAGE_SIZE + 1}–
                {Math.min(safePage * PAGE_SIZE, filtered.length)} of{" "}
                {filtered.length}
              </p>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safePage <= 1}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant="ghost"
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                        page === safePage
                          ? "text-white hover:bg-[#7D152D] hover:text-white"
                          : "text-[#64748B] hover:bg-[#F1F5F9]"
                      }`}
                      style={
                        page === safePage
                          ? {
                              background: "#7D152D",
                              fontSize: "0.8125rem",
                            }
                          : { fontSize: "0.8125rem" }
                      }
                    >
                      {page}
                    </Button>
                  ),
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={safePage >= totalPages}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
        existingNames={existingCampaignNames}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Card component
// ---------------------------------------------------------------------------

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const status = STATUS_STYLES[campaign.status];

  return (
    <Link
      to={`/staff/campaigns/${campaign.id}`}
      className="bg-white rounded-xl border border-[#E2E8F0] p-5 flex flex-col transition-all hover:shadow-md hover:border-[#CBD5E1] group no-underline"
      style={{ minHeight: 180 }}
    >
      <h3
        className="mb-2 group-hover:text-[#7D152D] transition-colors"
        style={{ fontSize: "1.0625rem", color: "#0F172A", lineHeight: 1.35 }}
      >
        {campaign.name}
      </h3>

      <div className="flex items-center gap-1.5 mb-3">
        <CalendarDays size={14} style={{ color: "#0F766E" }} />
        <span style={{ fontSize: "0.875rem", color: "#0F172A" }}>
          {campaign.eventCount} {campaign.eventCount === 1 ? "event" : "events"}
        </span>
      </div>

      <p
        className="flex-1 mb-4 line-clamp-2"
        style={{ fontSize: "0.8125rem", color: "#94A3B8", lineHeight: 1.55 }}
      >
        {campaign.description || "No description provided."}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9]">
        <span className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ background: status.dot }}
          />
          <span style={{ fontSize: "0.75rem", color: status.text }}>
            {status.label}
          </span>
        </span>
        <span style={{ fontSize: "0.75rem", color: "#CBD5E1" }}>
          {new Date(campaign.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </Link>
  );
}
