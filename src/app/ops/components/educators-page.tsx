import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowUpDown,
} from "lucide-react";
import { Card, CardContent } from "../../shared/components/ui/card";
import { Badge } from "../../shared/components/ui/badge";
import { Button } from "../../shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shared/components/ui/select";
import { Input } from "@/app/shared/components/ui/input";

import { MOCK_EDUCATORS } from "./educator-data";
import type { Educator } from "../../shared/data/shared-types";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-green-50 text-green-700 border-green-200";
    case "inactive":
      return "bg-muted text-muted-foreground border-border";
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "";
  }
}

function getScoreColor(score: number) {
  if (score >= 90) return "text-green-600";
  if (score >= 80) return "text-amber-600";
  return "text-red-500";
}

function TrendIcon({ trend }: { trend: Educator["trend"] }) {
  switch (trend) {
    case "up":
      return <TrendingUp className="size-3.5 text-green-600" />;
    case "down":
      return <TrendingDown className="size-3.5 text-red-500" />;
    case "stable":
      return <Minus className="size-3.5 text-muted-foreground" />;
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const STATES = Array.from(new Set(MOCK_EDUCATORS.map((e) => e.state))).sort();

const ALL_SPECIALTIES = Array.from(
  new Set(MOCK_EDUCATORS.flatMap((e) => e.specialties)),
).sort();

const PAGE_SIZE = 8;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function EducatorsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [page, setPage] = useState(1);

  /* ---- Filtering ---- */
  const filtered = useMemo(() => {
    let result = [...MOCK_EDUCATORS];
    const q = search.toLowerCase().trim();
    if (q) {
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.state.toLowerCase().includes(q) ||
          e.specialties.some((s) => s.toLowerCase().includes(q)),
      );
    }
    if (statusFilter !== "all") {
      result = result.filter(
        (e) => e.status.toLowerCase() === statusFilter.toLowerCase(),
      );
    }
    if (locationFilter !== "all") {
      result = result.filter((e) => e.state === locationFilter);
    }
    if (specialtyFilter !== "all") {
      result = result.filter((e) => e.specialties.includes(specialtyFilter));
    }
    return result;
  }, [search, statusFilter, locationFilter, specialtyFilter]);

  /* ---- Pagination ---- */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  // Reset page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [search, statusFilter, locationFilter, specialtyFilter]);

  const hasActiveFilters =
    statusFilter !== "all" ||
    locationFilter !== "all" ||
    specialtyFilter !== "all";

  const clearFilters = () => {
    setStatusFilter("all");
    setLocationFilter("all");
    setSpecialtyFilter("all");
    setSearch("");
  };

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      <div>
        <h1 className="text-foreground">Educators</h1>
        <p
          className="text-muted-foreground mt-1"
          style={{ fontSize: "0.875rem" }}
        >
          Manage educator roster, availability, and assignments.
        </p>
      </div>

      {/* Summary Stats Bar */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Educators"
          value={totalEducators}
          accent={false}
        />
        <StatCard
          icon={Shield}
          label="Active"
          value={activeCount}
          accent={false}
        />
        <StatCard
          icon={Clock}
          label="Pending Approval"
          value={pendingCount}
          accent={true}
        />
        <StatCard
          icon={Star}
          label="Avg Quality Score"
          value={Number(avgQualityScore.toFixed(1))}
          accent={false}
        />
      </div> */}

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search educators..."
            className="pl-9"
          />
        </div>

        {/* Status filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger
            className="w-[140px] cursor-pointer"
            style={{ fontSize: "0.8125rem" }}
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        {/* Location filter */}
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger
            className="w-[140px] cursor-pointer"
            style={{ fontSize: "0.8125rem" }}
          >
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            {STATES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Specialty filter */}
        <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
          <SelectTrigger
            className="w-[180px] cursor-pointer"
            style={{ fontSize: "0.8125rem" }}
          >
            <SelectValue placeholder="Specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            {ALL_SPECIALTIES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
            style={{ fontSize: "0.75rem" }}
          >
            <X className="size-3 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Educator Table */}
      <Card className="gap-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {[
                    "Educator",
                    "Location",
                    "Status",
                    "Quality Score",
                    "Events Completed",
                    "Specialties",
                    "Last Event",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-muted-foreground"
                      style={{ fontSize: "0.75rem", fontWeight: 500 }}
                    >
                      <span className="inline-flex items-center gap-1">
                        {h}
                        <ArrowUpDown className="size-3" />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center">
                      <p
                        className="text-muted-foreground"
                        style={{ fontSize: "0.875rem" }}
                      >
                        No educators match your filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  paged.map((educator) => (
                    <tr
                      key={educator.id}
                      onClick={() =>
                        navigate(`/ops/dashboard/educators/${educator.id}`)
                      }
                      className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      {/* Educator name + id */}
                      <td className="px-5 py-3">
                        <div className="min-w-[180px]">
                          <span
                            className="text-foreground block"
                            style={{ fontSize: "0.875rem", fontWeight: 500 }}
                          >
                            {educator.name}
                          </span>
                          <span
                            className="text-muted-foreground"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {educator.id}
                          </span>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2 min-w-[130px]">
                          <div className="flex items-center justify-center size-6 rounded bg-muted shrink-0">
                            <MapPin className="size-3 text-muted-foreground" />
                          </div>
                          <span
                            className="text-foreground"
                            style={{ fontSize: "0.8125rem" }}
                          >
                            {educator.city}, {educator.state}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3">
                        <Badge
                          variant="secondary"
                          className={getStatusColor(educator.status)}
                          style={{ fontSize: "0.6875rem" }}
                        >
                          {educator.status === "active" && (
                            <span className="inline-block size-1.5 rounded-full bg-green-500 mr-1" />
                          )}
                          {educator.status.charAt(0).toUpperCase() +
                            educator.status.slice(1)}
                        </Badge>
                      </td>

                      {/* Quality Score */}
                      <td className="px-5 py-3">
                        {educator.qualityScore > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`tabular-nums ${getScoreColor(educator.qualityScore)}`}
                              style={{
                                fontSize: "0.875rem",
                                fontWeight: 600,
                              }}
                            >
                              {educator.qualityScore}
                            </span>
                            <TrendIcon trend={educator.trend} />
                          </div>
                        ) : (
                          <span
                            className="text-muted-foreground"
                            style={{ fontSize: "0.8125rem" }}
                          >
                            —
                          </span>
                        )}
                      </td>

                      {/* Events Completed */}
                      <td className="px-5 py-3">
                        <span
                          className="text-foreground tabular-nums"
                          style={{ fontSize: "0.8125rem" }}
                        >
                          {educator.eventsCompleted}
                        </span>
                      </td>

                      {/* Specialties */}
                      <td className="px-5 py-3">
                        <div className="flex flex-wrap gap-1 min-w-[160px]">
                          {educator.specialties.map((spec) => (
                            <Badge
                              key={spec}
                              variant="secondary"
                              className="bg-slate-100 text-slate-600 border-slate-200"
                              style={{ fontSize: "0.625rem" }}
                            >
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </td>

                      {/* Last Event */}
                      <td className="px-5 py-3">
                        <span
                          className="text-foreground"
                          style={{ fontSize: "0.8125rem" }}
                        >
                          {formatDate(educator.lastEventDate)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-border">
              <span
                className="text-muted-foreground"
                style={{ fontSize: "0.75rem" }}
              >
                Showing {(safePage - 1) * PAGE_SIZE + 1}–
                {Math.min(safePage * PAGE_SIZE, filtered.length)} of{" "}
                {filtered.length} educators
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={safePage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="cursor-pointer"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Button
                      key={p}
                      variant={p === safePage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(p)}
                      className={
                        p === safePage
                          ? "bg-[#7D152D] hover:bg-[#7D152D]/90 cursor-pointer"
                          : "cursor-pointer"
                      }
                      style={{ fontSize: "0.75rem", minWidth: "2rem" }}
                    >
                      {p}
                    </Button>
                  ),
                )}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="cursor-pointer"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stat Card                                                           */
/* ------------------------------------------------------------------ */
