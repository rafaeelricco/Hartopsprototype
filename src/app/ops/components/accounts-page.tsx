import React, { useState, useMemo, useCallback } from "react";
import {
  MapPin,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Phone,
  Plus,
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/app/shared/components/ui/sheet";
import { MOCK_ACCOUNTS, addAccount } from "@/lib/account-data";
import { Account } from "@/lib/account-types";
import { AddAccountWizard } from "./add-account-wizard";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-50 text-green-700 border-green-200";
    case "inactive":
      return "bg-muted text-muted-foreground border-border";
    case "prospect":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "";
  }
}

function getTypeColor(type: string) {
  switch (type.toLowerCase()) {
    case "on-premise":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "off-premise":
      return "bg-cyan-50 text-cyan-700 border-cyan-200";
    default:
      return "";
  }
}

const PAGE_SIZE = 8;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function AccountsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [, forceUpdate] = useState(0);

  const handleNewAccount = useCallback((account: Account) => {
    addAccount(account);
    forceUpdate((n) => n + 1);
  }, []);

  /* ---- Filtering ---- */
  const filtered = useMemo(() => {
    let result = [...MOCK_ACCOUNTS];
    const q = search.toLowerCase().trim();
    if (q) {
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          (a.chain && a.chain.toLowerCase().includes(q)) ||
          a.city.toLowerCase().includes(q) ||
          a.state.toLowerCase().includes(q) ||
          a.contactName.toLowerCase().includes(q) ||
          a.contactPhone.toLowerCase().includes(q),
      );
    }
    if (typeFilter !== "all") {
      result = result.filter(
        (a) => a.type.toLowerCase() === typeFilter.toLowerCase(),
      );
    }
    if (statusFilter !== "all") {
      result = result.filter(
        (a) => a.status.toLowerCase() === statusFilter.toLowerCase(),
      );
    }
    return result;
  }, [search, typeFilter, statusFilter]);

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
  }, [search, typeFilter, statusFilter]);

  const hasActiveFilters = typeFilter !== "all" || statusFilter !== "all";

  const clearFilters = () => {
    setTypeFilter("all");
    setStatusFilter("all");
    setSearch("");
  };

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Profile Slide-Over */}
      <Sheet
        open={!!selectedAccount}
        onOpenChange={(open) => !open && setSelectedAccount(null)}
      >
        <SheetContent className="overflow-y-auto sm:max-w-md">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-xl">{selectedAccount?.name}</SheetTitle>
            <SheetDescription>
              {selectedAccount?.chain
                ? `Part of ${selectedAccount.chain} chain`
                : "Independent Venue"}
            </SheetDescription>
            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant="secondary"
                className={
                  selectedAccount ? getTypeColor(selectedAccount.type) : ""
                }
              >
                {selectedAccount?.type}
              </Badge>
              <Badge
                variant="secondary"
                className={
                  selectedAccount ? getStatusColor(selectedAccount.status) : ""
                }
              >
                {selectedAccount?.status}
              </Badge>
            </div>
          </SheetHeader>

          {selectedAccount && (
            <div className="space-y-6 px-4 pb-6">
              {/* Contact & Location */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                  Contact & Location
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 shrink-0" />
                    <span>
                      {selectedAccount.address}, {selectedAccount.city},{" "}
                      {selectedAccount.state} {selectedAccount.zipCode}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 shrink-0" />
                    <span>
                      {selectedAccount.contactName} ·{" "}
                      {selectedAccount.contactPhone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Venue Profile */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                  Venue Profile
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <ProfileTile
                    label="Venue Type"
                    value={
                      selectedAccount.profile.venueSubType?.replace(
                        /-/g,
                        " ",
                      ) || "—"
                    }
                    capitalize
                  />
                  <ProfileTile
                    label="Display Units"
                    value={selectedAccount.profile.displayCount ?? "—"}
                  />
                  <ProfileTile
                    label="Cold Boxes"
                    value={selectedAccount.profile.coldBoxCount ?? "—"}
                  />
                  <ProfileTile
                    label="Has Windows"
                    value={selectedAccount.profile.hasWindows ? "Yes" : "No"}
                  />
                  <ProfileTile
                    label="Shelf Facings"
                    value={selectedAccount.profile.shelfFacings ?? "—"}
                  />
                  <ProfileTile
                    label="Traffic Estimate"
                    value={selectedAccount.profile.footTrafficEstimate || "—"}
                    capitalize
                  />
                  <ProfileTile
                    label="Backbar Presence"
                    value={
                      selectedAccount.profile.backbarPresence ? "Yes" : "No"
                    }
                  />
                  <ProfileTile
                    label="Menu Placement"
                    value={selectedAccount.profile.menuPlacement ? "Yes" : "No"}
                  />
                </div>

                {selectedAccount.profile.notes && (
                  <div className="mt-3 p-3 rounded-md border border-border">
                    <div className="text-xs text-muted-foreground mb-1">
                      Survey Notes
                    </div>
                    <div className="text-sm italic text-foreground">
                      {selectedAccount.profile.notes}
                    </div>
                  </div>
                )}
              </div>

              {/* Activity */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                  Activity
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <ProfileTile
                    label="Events Hosted"
                    value={selectedAccount.eventsHosted}
                  />
                  <ProfileTile
                    label="Last Event"
                    value={selectedAccount.lastEventDate || "—"}
                  />
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Add Account Wizard */}
      <AddAccountWizard
        open={addOpen}
        onOpenChange={setAddOpen}
        existingNames={MOCK_ACCOUNTS.map((a) => a.name)}
        onSubmit={handleNewAccount}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground">Account Master</h1>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontSize: "0.875rem" }}
          >
            Centralized venue and account management.
          </p>
        </div>
        <Button
          className="bg-[#7D152D] hover:bg-[#7D152D]/90 cursor-pointer"
          onClick={() => setAddOpen(true)}
        >
          <Plus className="size-4 mr-1" />
          Add Account
        </Button>
      </div>

      {/* Summary Stats Bar */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={Building2}
          label="Total Accounts"
          value={totalAccounts}
          accent={false}
        />
        <StatCard
          icon={Store}
          label="Active"
          value={activeAccounts}
          accent={false}
        />
        <StatCard
          icon={MapPin}
          label="On-Premise / Off-Premise"
          value={`${onPremise} / ${offPremise}`}
          accent={true}
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
            placeholder="Search accounts..."
            className="pl-9"
          />
        </div>

        {/* Type filter */}
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger
            className="w-[160px] cursor-pointer"
            style={{ fontSize: "0.8125rem" }}
          >
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="on-premise">On-Premise</SelectItem>
            <SelectItem value="off-premise">Off-Premise</SelectItem>
          </SelectContent>
        </Select>

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
            <SelectItem value="prospect">Prospect</SelectItem>
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

      {/* Account Table */}
      <Card className="gap-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {[
                    "Account Name",
                    "Type",
                    "Location",
                    "Contact",
                    "Events Hosted",
                    "Status",
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
                        No accounts match your filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  paged.map((account) => (
                    <tr
                      key={account.id}
                      onClick={() => setSelectedAccount(account)}
                      className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <td className="px-5 py-3">
                        <div className="min-w-[180px]">
                          <span
                            className="text-foreground block"
                            style={{ fontSize: "0.875rem", fontWeight: 500 }}
                          >
                            {account.name}
                          </span>
                          {account.chain && (
                            <span
                              className="text-muted-foreground"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {account.chain}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <Badge
                          variant="secondary"
                          className={getTypeColor(account.type)}
                          style={{ fontSize: "0.6875rem" }}
                        >
                          {account.type}
                        </Badge>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2 min-w-[130px]">
                          <div className="flex items-center justify-center size-6 rounded bg-muted shrink-0">
                            <MapPin className="size-3 text-muted-foreground" />
                          </div>
                          <span
                            className="text-foreground"
                            style={{ fontSize: "0.8125rem" }}
                          >
                            {account.city}, {account.state}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2 min-w-[130px]">
                          <Phone className="size-3 text-muted-foreground shrink-0" />
                          <span
                            className="text-foreground"
                            style={{ fontSize: "0.8125rem" }}
                          >
                            {account.contactName} - {account.contactPhone}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className="text-foreground tabular-nums"
                          style={{ fontSize: "0.8125rem" }}
                        >
                          {account.eventsHosted}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <Badge
                          variant="secondary"
                          className={getStatusColor(account.status)}
                          style={{ fontSize: "0.6875rem" }}
                        >
                          {account.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className="text-muted-foreground"
                          style={{ fontSize: "0.8125rem" }}
                        >
                          {account.lastEventDate
                            ? new Date(account.lastEventDate)
                                .toISOString()
                                .split("T")[0]
                            : "—"}
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
                {filtered.length} accounts
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

/* ------------------------------------------------------------------ */
/* Profile Tile (drawer label-value pair)                               */
/* ------------------------------------------------------------------ */

function ProfileTile({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: string | number;
  capitalize?: boolean;
}) {
  return (
    <div className="p-3 rounded-md border border-border">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div
        className={`text-sm font-medium text-foreground ${capitalize ? "capitalize" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}
