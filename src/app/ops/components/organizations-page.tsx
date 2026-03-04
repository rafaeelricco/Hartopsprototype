import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { Building2, Search, Plus, ArrowUpDown } from "lucide-react";
import { Card, CardContent } from "../../shared/components/ui/card";
import { Badge } from "../../shared/components/ui/badge";
import { Button } from "../../shared/components/ui/button";
import { AddOrganizationWizard } from "./add-organization-wizard";
import { Input } from "@/app/shared/components/ui/input";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface Organization {
  id: number;
  name: string;
  industry: string;
  plan: string;
  status: "Active" | "Inactive";
  events: number;
  members: number;
  joined: string;
}

/* ------------------------------------------------------------------ */
/* Seed data                                                           */
/* ------------------------------------------------------------------ */

const SEED_ORGANIZATIONS: Organization[] = [
  {
    id: 1,
    name: "Acme Corp",
    industry: "Technology",
    plan: "Enterprise",
    status: "Active",
    events: 34,
    members: 12,
    joined: "Jan 15, 2025",
  },
  {
    id: 2,
    name: "Vanguard LLC",
    industry: "Finance",
    plan: "Professional",
    status: "Active",
    events: 28,
    members: 8,
    joined: "Feb 3, 2025",
  },
  {
    id: 3,
    name: "Zenith Group",
    industry: "Healthcare",
    plan: "Enterprise",
    status: "Active",
    events: 22,
    members: 15,
    joined: "Mar 22, 2025",
  },
  {
    id: 4,
    name: "Nova Systems",
    industry: "Technology",
    plan: "Starter",
    status: "Active",
    events: 19,
    members: 5,
    joined: "Apr 10, 2025",
  },
  {
    id: 5,
    name: "Apex Holdings",
    industry: "Finance",
    plan: "Professional",
    status: "Inactive",
    events: 15,
    members: 6,
    joined: "May 1, 2025",
  },
  {
    id: 6,
    name: "Meridian Partners",
    industry: "Retail",
    plan: "Enterprise",
    status: "Active",
    events: 12,
    members: 20,
    joined: "Jun 18, 2025",
  },
  {
    id: 7,
    name: "Catalyst Inc.",
    industry: "Education",
    plan: "Starter",
    status: "Active",
    events: 8,
    members: 3,
    joined: "Jul 5, 2025",
  },
  {
    id: 8,
    name: "Pinnacle Ventures",
    industry: "Finance",
    plan: "Professional",
    status: "Active",
    events: 11,
    members: 7,
    joined: "Aug 12, 2025",
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function OrganizationsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [wizardOpen, setWizardOpen] = useState(false);

  // Change #1: stateful org list so the wizard can persist new entries
  const [organizations, setOrganizations] =
    useState<Organization[]>(SEED_ORGANIZATIONS);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return organizations;
    return organizations.filter(
      (o: Organization) =>
        o.name.toLowerCase().includes(q) ||
        o.industry.toLowerCase().includes(q) ||
        o.plan.toLowerCase().includes(q),
    );
  }, [search, organizations]);

  // Wizard submit handler — creates a new org from the wizard data
  const handleWizardSubmit = useCallback(
    (data: {
      companyName: string;
      industry: string;
      primaryContact: string;
      inviteEmail: string;
    }) => {
      const now = new Date("2026-03-04");
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const joinedStr = `${monthNames[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

      const nextId =
        Math.max(...organizations.map((o: Organization) => o.id), 0) + 1;
      const newOrg: Organization = {
        id: nextId,
        name: data.companyName.trim(),
        industry: data.industry,
        plan: "Starter", // new trial clients start on Starter
        status: "Active",
        events: 0,
        members: 1, // the invited user
        joined: joinedStr,
      };

      setOrganizations((prev: Organization[]) => [newOrg, ...prev]);
    },
    [organizations],
  );

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-foreground">Organizations</h1>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontSize: "0.875rem" }}
          >
            Manage client organizations and their configurations.
          </p>
        </div>
        <Button
          className="bg-[#7D152D] hover:bg-[#7D152D]/90 cursor-pointer"
          onClick={() => setWizardOpen(true)}
        >
          <Plus className="size-4" />
          Add Organization
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search organizations..."
          className="pl-9"
        />
      </div>

      {/* Table */}
      <Card className="gap-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {[
                    "Organization",
                    "Industry",
                    "Plan",
                    "Status",
                    "Events",
                    "Members",
                    "Joined",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-muted-foreground"
                      style={{ fontSize: "0.75rem", fontWeight: 500 }}
                    >
                      <span className="inline-flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors">
                        {h}
                        <ArrowUpDown className="size-3" />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center">
                      <p
                        className="text-muted-foreground"
                        style={{ fontSize: "0.875rem" }}
                      >
                        No organizations match your search.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((org: Organization) => (
                    <tr
                      key={org.id}
                      onClick={() =>
                        navigate(`/dashboard/organizations/${org.id}`)
                      }
                      className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center size-8 rounded-md bg-muted">
                            <Building2 className="size-4 text-muted-foreground" />
                          </div>
                          <span
                            style={{ fontSize: "0.875rem", fontWeight: 500 }}
                            className="text-foreground"
                          >
                            {org.name}
                          </span>
                        </div>
                      </td>
                      <td
                        className="px-5 py-3 text-muted-foreground"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        {org.industry}
                      </td>
                      <td className="px-5 py-3">
                        <Badge
                          variant="outline"
                          style={{ fontSize: "0.6875rem" }}
                        >
                          {org.plan}
                        </Badge>
                      </td>
                      <td className="px-5 py-3">
                        <Badge
                          variant="secondary"
                          className={
                            org.status === "Active"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-red-50 text-red-600 border-red-200"
                          }
                          style={{ fontSize: "0.6875rem" }}
                        >
                          {org.status}
                        </Badge>
                      </td>
                      <td
                        className="px-5 py-3 text-muted-foreground tabular-nums"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        {org.events}
                      </td>
                      <td
                        className="px-5 py-3 text-muted-foreground tabular-nums"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        {org.members}
                      </td>
                      <td
                        className="px-5 py-3 text-muted-foreground"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        {org.joined}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Wizard Dialog */}
      <AddOrganizationWizard
        open={wizardOpen}
        onOpenChange={setWizardOpen}
        onSubmit={handleWizardSubmit}
        existingNames={organizations.map((o: Organization) => o.name)}
      />
    </div>
  );
}
