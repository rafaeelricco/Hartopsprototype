import { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  Star,
  ShoppingCart,
  Clock,
  ArrowUpDown,
} from "lucide-react";
import { Input } from "@/app/shared/components/ui/input";
import { mockEducators } from "./educator-roster-data";

type SortKey = "name" | "avgRating" | "salesPerEvent" | "punctuality";
type SortDir = "asc" | "desc";
type StatusFilter = "All" | "Active" | "Inactive";

const statusColors: Record<string, string> = {
  Active: "bg-green-500/10 text-green-400 border-green-500/20",
  Inactive: "bg-muted text-muted-foreground border-border",
};

export function EducatorsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const filtered = mockEducators
    .filter(
      (e) => statusFilter === "All" || e.status === statusFilter,
    )
    .filter(
      (e) =>
        !search ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.phone.includes(search),
    )
    .sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp =
        typeof aVal === "string"
          ? aVal.localeCompare(bVal as string)
          : (aVal as number) - (bVal as number);
      return sortDir === "asc" ? cmp : -cmp;
    });

  const SortableHeader = ({
    label,
    sortKeyName,
    className = "",
  }: {
    label: string;
    sortKeyName: SortKey;
    className?: string;
  }) => (
    <button
      onClick={() => handleSort(sortKeyName)}
      className={`flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer ${className}`}
    >
      {label}
      <ArrowUpDown className="w-3 h-3" />
      {sortKey === sortKeyName && (
        <span style={{ fontSize: "0.625rem" }}>
          {sortDir === "asc" ? "↑" : "↓"}
        </span>
      )}
    </button>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Educators</h1>
        <p
          className="text-muted-foreground mt-1"
          style={{ fontSize: "0.875rem" }}
        >
          Your assigned educator roster — {mockEducators.length} educators.
        </p>
      </div>

      {/* Filters + Search */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {(["All", "Active", "Inactive"] as StatusFilter[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                statusFilter === tab
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontSize: "0.8125rem" }}
            >
              {tab}
              <span
                className="ml-1.5 text-muted-foreground"
                style={{ fontSize: "0.75rem" }}
              >
                {tab === "All"
                  ? mockEducators.length
                  : mockEducators.filter((e) => e.status === tab).length}
              </span>
            </button>
          ))}
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Roster table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div
          className="grid grid-cols-[1fr_180px_90px_100px_100px_90px] gap-4 px-4 py-3 border-b border-border bg-muted/30 text-muted-foreground font-medium"
          style={{ fontSize: "0.75rem" }}
        >
          <SortableHeader label="Name" sortKeyName="name" />
          <span>Contact</span>
          <span>Status</span>
          <SortableHeader label="Avg Rating" sortKeyName="avgRating" />
          <SortableHeader label="Sales/Event" sortKeyName="salesPerEvent" />
          <SortableHeader label="On-Time" sortKeyName="punctuality" />
        </div>

        {filtered.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No educators match your filters.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((edu) => (
              <Link
                key={edu.id}
                to={`/educator/educators/${edu.id}`}
                className="grid grid-cols-[1fr_180px_90px_100px_100px_90px] gap-4 px-4 py-3.5 items-center hover:bg-muted/50 transition-colors group"
              >
                <span className="text-foreground font-medium">
                  {edu.name}
                </span>
                <span className="text-muted-foreground truncate" style={{ fontSize: "0.8125rem" }}>
                  {edu.email}
                </span>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 font-medium w-fit ${statusColors[edu.status]}`}
                  style={{ fontSize: "0.6875rem" }}
                >
                  {edu.status}
                </span>
                <span className="flex items-center gap-1 text-foreground" style={{ fontSize: "0.875rem" }}>
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  {edu.avgRating}
                </span>
                <span className="flex items-center gap-1 text-foreground" style={{ fontSize: "0.875rem" }}>
                  <ShoppingCart className="w-3.5 h-3.5 text-muted-foreground" />
                  {edu.salesPerEvent}
                </span>
                <span className="flex items-center gap-1 text-foreground" style={{ fontSize: "0.875rem" }}>
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                  {edu.punctuality}%
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
