import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../shared/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../../shared/components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../shared/components/ui/tabs";
import { Badge } from "../../shared/components/ui/badge";
import {
  Check,
  Minus,
  Shield,
  LayoutDashboard,
  Building2,
  CalendarDays,
  Users,
  FileBarChart,
  Palette,
  Settings,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AccessLevel = boolean | string;

type CapabilityRow = {
  capability: string;
  operator: AccessLevel;
  staff: AccessLevel;
  educatorMgr: AccessLevel;
  educator: AccessLevel;
};

type CapabilityCategory = {
  id: string;
  name: string;
  icon: LucideIcon;
  capabilities: CapabilityRow[];
};

// ---------------------------------------------------------------------------
// Role metadata
// ---------------------------------------------------------------------------

const ROLES = [
  {
    name: "Operator",
    subtitle: "Hart Super Admin",
    platform: "/ops",
    icon: Shield,
    description:
      "Full platform oversight — manages organizations, educators, events, reports, and system settings across all agencies.",
  },
  {
    name: "Staff",
    subtitle: "Agency Admin",
    platform: "/staff",
    icon: Building2,
    description:
      "Campaign and event management for their organization — creates events, manages brand assets, and handles billing exports.",
  },
  {
    name: "Educator Manager",
    subtitle: "Team Coordinator",
    platform: "/educator",
    icon: Users,
    description:
      "Coordinates educator assignments, approves cancellations, and manages the field team for their territory.",
  },
  {
    name: "Educator",
    subtitle: "Mobile App User",
    platform: "Mobile",
    icon: Smartphone,
    description:
      "Field-facing user who executes events — checks in/out, profiles consumers, completes venue surveys, and tracks sales.",
  },
];

// ---------------------------------------------------------------------------
// Capability data
// ---------------------------------------------------------------------------

const CATEGORIES: CapabilityCategory[] = [
  {
    id: "dashboard",
    name: "Dashboard & Analytics",
    icon: LayoutDashboard,
    capabilities: [
      {
        capability: "Platform-wide KPI dashboard",
        operator: true,
        staff: false,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "Organization growth analytics",
        operator: true,
        staff: false,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "Campaign performance dashboard",
        operator: false,
        staff: true,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "Event activity dashboard",
        operator: false,
        staff: true,
        educatorMgr: true,
        educator: false,
      },
      {
        capability: "Top educators leaderboard",
        operator: false,
        staff: false,
        educatorMgr: true,
        educator: false,
      },
      {
        capability: "View assigned events",
        operator: false,
        staff: false,
        educatorMgr: false,
        educator: true,
      },
    ],
  },
  {
    id: "organizations",
    name: "Organizations & Accounts",
    icon: Building2,
    capabilities: [
      {
        capability: "View all organizations",
        operator: true,
        staff: false,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "Create / edit organizations",
        operator: true,
        staff: false,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "Organization detail & campaigns",
        operator: true,
        staff: false,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "Manage account master (venues)",
        operator: true,
        staff: false,
        educatorMgr: false,
        educator: false,
      },
    ],
  },
  {
    id: "campaigns-events",
    name: "Campaigns & Events",
    icon: CalendarDays,
    capabilities: [
      {
        capability: "View all events (cross-org)",
        operator: true,
        staff: false,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "View org-scoped events",
        operator: false,
        staff: true,
        educatorMgr: true,
        educator: false,
      },
      {
        capability: "Create / manage campaigns",
        operator: false,
        staff: true,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "Create events",
        operator: false,
        staff: true,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "Edit / cancel events",
        operator: true,
        staff: true,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "Filter by geography / type / status",
        operator: true,
        staff: true,
        educatorMgr: true,
        educator: false,
      },
      {
        capability: "Assign / reassign ambassadors",
        operator: true,
        staff: true,
        educatorMgr: true,
        educator: false,
      },
      {
        capability: "Quick-assign from list view",
        operator: true,
        staff: true,
        educatorMgr: true,
        educator: false,
      },
      {
        capability: "View assigned events only",
        operator: false,
        staff: false,
        educatorMgr: false,
        educator: true,
      },
      {
        capability: "Check in / check out",
        operator: false,
        staff: false,
        educatorMgr: false,
        educator: true,
      },
      {
        capability: "Request cancellation",
        operator: false,
        staff: false,
        educatorMgr: false,
        educator: true,
      },
      {
        capability: "Approve / deny cancellations",
        operator: false,
        staff: false,
        educatorMgr: true,
        educator: false,
      },
    ],
  },
  {
    id: "educators",
    name: "Educators & Availability",
    icon: Users,
    capabilities: [
      {
        capability: "View all educators (cross-org)",
        operator: true,
        staff: false,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "View educator detail & history",
        operator: true,
        staff: false,
        educatorMgr: true,
        educator: false,
      },
      {
        capability: "Manage educator roster",
        operator: false,
        staff: false,
        educatorMgr: true,
        educator: false,
      },
      {
        capability: "Availability calendar (cross-org)",
        operator: true,
        staff: false,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "View own availability",
        operator: false,
        staff: false,
        educatorMgr: false,
        educator: true,
      },
    ],
  },
  {
    id: "reports",
    name: "Reports",
    icon: FileBarChart,
    capabilities: [
      {
        capability: "Platform-wide reports",
        operator: true,
        staff: false,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "Organization-scoped reports",
        operator: false,
        staff: true,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "Export PDF / CSV",
        operator: true,
        staff: true,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "Billing / payroll export",
        operator: false,
        staff: true,
        educatorMgr: false,
        educator: false,
      },
    ],
  },
  {
    id: "brand-field",
    name: "Brand Assets & Field Ops",
    icon: Palette,
    capabilities: [
      {
        capability: "Manage brand assets library",
        operator: false,
        staff: true,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "View brand materials",
        operator: false,
        staff: true,
        educatorMgr: false,
        educator: true,
      },
      {
        capability: "Consumer profiling",
        operator: false,
        staff: false,
        educatorMgr: false,
        educator: true,
      },
      {
        capability: "Venue surveys & photos",
        operator: false,
        staff: false,
        educatorMgr: false,
        educator: true,
      },
      {
        capability: "Sales tracking",
        operator: false,
        staff: false,
        educatorMgr: false,
        educator: true,
      },
    ],
  },
  {
    id: "settings",
    name: "Settings & Administration",
    icon: Settings,
    capabilities: [
      {
        capability: "System settings",
        operator: true,
        staff: false,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "Team management & invitations",
        operator: true,
        staff: true,
        educatorMgr: false,
        educator: false,
      },
      {
        capability: "Profile management",
        operator: true,
        staff: true,
        educatorMgr: true,
        educator: true,
      },
      {
        capability: "Password & security",
        operator: true,
        staff: true,
        educatorMgr: true,
        educator: true,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function AccessIndicator({ value }: { value: AccessLevel }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <Check className="size-4 text-emerald-600" />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <Minus className="size-4 text-muted-foreground/40" />
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <Badge
        variant="outline"
        style={{ fontSize: "0.625rem" }}
        className="whitespace-nowrap"
      >
        {value}
      </Badge>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export function CapabilityMatrixPage() {
  return (
    <div className="p-6 space-y-6 w-full">
      {/* Page Header */}
      <div>
        <h1 className="text-foreground">User Roles & Capability Matrix</h1>
        <p
          className="text-muted-foreground mt-1"
          style={{ fontSize: "0.875rem" }}
        >
          Phase 1 access controls across all platform roles.
        </p>
      </div>

      {/* Role Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ROLES.map((role) => (
          <Card key={role.name} className="gap-0">
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-10 rounded-lg bg-[#7D152D]/10">
                  <role.icon className="size-5 text-[#7D152D]" />
                </div>
                <div>
                  <p
                    className="text-foreground"
                    style={{ fontSize: "0.875rem", fontWeight: 600 }}
                  >
                    {role.name}
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {role.subtitle}
                  </p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="w-fit"
                style={{ fontSize: "0.625rem" }}
              >
                {role.platform}
              </Badge>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "0.8125rem", lineHeight: 1.6 }}
              >
                {role.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Capability Matrix Tabs */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          {CATEGORIES.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="flex items-center gap-1.5 cursor-pointer"
              style={{ fontSize: "0.8125rem" }}
            >
              <cat.icon className="size-3.5" />
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map((cat) => (
          <TabsContent key={cat.id} value={cat.id} className="mt-4">
            <Card className="gap-0">
              <CardHeader className="px-5 pt-5 pb-4">
                <CardTitle style={{ fontSize: "1rem", fontWeight: 600 }}>
                  {cat.name}
                </CardTitle>
                <CardDescription style={{ fontSize: "0.8125rem" }}>
                  Phase 1 capabilities for this area
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="w-[40%]"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        Capability
                      </TableHead>
                      <TableHead
                        className="text-center"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        Operator
                      </TableHead>
                      <TableHead
                        className="text-center"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        Staff
                      </TableHead>
                      <TableHead
                        className="text-center"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        Edu. Manager
                      </TableHead>
                      <TableHead
                        className="text-center"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        Educator
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cat.capabilities.map((row) => (
                      <TableRow key={row.capability}>
                        <TableCell style={{ fontSize: "0.8125rem" }}>
                          {row.capability}
                        </TableCell>
                        <TableCell>
                          <AccessIndicator value={row.operator} />
                        </TableCell>
                        <TableCell>
                          <AccessIndicator value={row.staff} />
                        </TableCell>
                        <TableCell>
                          <AccessIndicator value={row.educatorMgr} />
                        </TableCell>
                        <TableCell>
                          <AccessIndicator value={row.educator} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Phase 1 Disclaimer */}
      <p
        className="text-muted-foreground"
        style={{ fontSize: "0.75rem", lineHeight: 1.6 }}
      >
        This matrix reflects Phase 1 scope. Capabilities may expand in future
        phases as new features are released.
      </p>
    </div>
  );
}
