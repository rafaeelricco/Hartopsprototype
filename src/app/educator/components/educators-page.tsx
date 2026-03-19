import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Star,
  ShoppingCart,
  Clock,
  ArrowUpDown,
  Mail,
  Phone,
  CalendarDays,
} from "lucide-react";
import { Input } from "@/app/shared/components/ui/input";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/app/shared/components/ui/tooltip";
import { PageHeader } from "@/app/shared/components/layouts/page-header";
import { mockEducators } from "./educator-roster-data";

type SortKey =
  | "name"
  | "avgRating"
  | "salesPerEvent"
  | "punctuality"
  | "totalEvents";
type SortDir = "asc" | "desc";
type StatusFilter = "All" | "Active" | "Inactive";

const statusColors: Record<string, string> = {
  Active: "bg-green-500/10 text-green-400 border-green-500/20",
  Inactive: "bg-muted text-muted-foreground border-border",
  "Pending Invitation": "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

const gridCols = "grid-cols-[1fr_70px_140px_50px_90px_90px_90px_80px]";

export function EducatorsPage() {
  const navigate = useNavigate();
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
    .filter((e) => statusFilter === "All" || e.status === statusFilter)
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
          {sortDir === "asc" ? "\u2191" : "\u2193"}
        </span>
      )}
    </button>
  );

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        <PageHeader
          title="Educators"
          subtitle={`Your assigned educator roster \u2014 ${mockEducators.length} educators.`}
          className="mb-0"
        />

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
        <div className="rounded-xl border border-border bg-card overflow-x-auto">
          <div
            className={`grid ${gridCols} gap-4 px-4 py-3 border-b border-border bg-muted/30 text-muted-foreground font-medium min-w-[720px]`}
            style={{ fontSize: "0.75rem" }}
          >
            <SortableHeader label="Name" sortKeyName="name" />
            <span>Contact</span>
            <span>Next Event</span>
            <SortableHeader label="Completed" sortKeyName="totalEvents" />
            <span>Status</span>
            <SortableHeader label="Rating" sortKeyName="avgRating" />
            <SortableHeader label="Sales" sortKeyName="salesPerEvent" />
            <SortableHeader label="On-Time" sortKeyName="punctuality" />
          </div>

          {filtered.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No educators match your filters.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map((edu) => (
                <div
                  key={edu.id}
                  onClick={() => navigate(`/educator/educators/${edu.id}`)}
                  className={`grid ${gridCols} gap-4 px-4 py-3.5 items-center hover:bg-muted/50 transition-colors group min-w-[720px] cursor-pointer`}
                >
                  {/* Name */}
                  <span className="text-foreground font-medium">
                    {edu.name}
                  </span>

                  {/* Contact icons */}
                  <span className="flex items-center gap-1.5">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={`mailto:${edu.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-md hover:bg-muted transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-muted-foreground hover:text-primary" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <span style={{ fontSize: "0.75rem" }}>{edu.email}</span>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={`tel:${edu.phone.replace(/[^\d+]/g, "")}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-md hover:bg-muted transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-muted-foreground hover:text-primary" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <span style={{ fontSize: "0.75rem" }}>{edu.phone}</span>
                      </TooltipContent>
                    </Tooltip>
                  </span>

                  {/* Next Event */}
                  <span className="min-w-0">
                    {edu.nextEvent ? (
                      <span className="flex flex-col gap-0.5">
                        <span
                          className="text-foreground truncate"
                          style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                        >
                          {edu.nextEvent.name}
                        </span>
                        <span
                          className="text-muted-foreground flex items-center gap-1"
                          style={{ fontSize: "0.6875rem" }}
                        >
                          <CalendarDays className="w-3 h-3" />
                          {new Date(edu.nextEvent.date).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" },
                          )}
                        </span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground/50">&mdash;</span>
                    )}
                  </span>

                  {/* Events Completed count */}
                  <span
                    className="text-foreground text-center"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {edu.totalEvents}
                  </span>

                  {/* Status */}
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 font-medium w-fit ${statusColors[edu.status] || "bg-muted text-muted-foreground border-border"}`}
                    style={{ fontSize: "0.6875rem" }}
                  >
                    {edu.status}
                  </span>

                  {/* Avg Rating */}
                  <span
                    className="flex items-center gap-1 text-foreground"
                    style={{ fontSize: "0.875rem" }}
                  >
                    <Star className="w-3.5 h-3.5 text-amber-400" />
                    {edu.avgRating || "\u2014"}
                  </span>

                  {/* Sales/Event */}
                  <span
                    className="flex items-center gap-1 text-foreground"
                    style={{ fontSize: "0.875rem" }}
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-muted-foreground" />
                    {edu.salesPerEvent || "\u2014"}
                  </span>

                  {/* On-Time */}
                  <span
                    className="flex items-center gap-1 text-foreground"
                    style={{ fontSize: "0.875rem" }}
                  >
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    {edu.punctuality ? `${edu.punctuality}%` : "\u2014"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
