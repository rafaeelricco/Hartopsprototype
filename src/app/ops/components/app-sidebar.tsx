"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  FileBarChart,
  Settings,
  GalleryVerticalEnd,
  Store,
  Users,
  CalendarCheck,
  Receipt,
  Wallet,
  ListChecks,
} from "lucide-react";
import { useNavigate } from "react-router";

import { NavMain } from "@/app/shared/components/nav-main";
import { NavUser } from "@/app/shared/components/nav-user";
import { TeamSwitcher } from "@/app/shared/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/app/shared/components/ui/sidebar";

const data = {
  user: {
    name: "Admin Hart",
    email: "admin@hartops.com",
    avatar: "/avatars/admin-hart.jpg",
  },
  teams: [
    {
      name: "Hart Ops",
      logo: GalleryVerticalEnd,
      plan: "Super Admin",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/ops/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Reports",
      url: "/ops/dashboard/reports",
      icon: FileBarChart,
    },
    {
      title: "Organizations",
      url: "/ops/dashboard/organizations",
      icon: Building2,
    },
    {
      title: "Account Master",
      url: "/ops/dashboard/accounts",
      icon: Store,
    },
    {
      title: "Brand Ambassadors",
      url: "/ops/dashboard/brand-ambassadors",
      icon: Users,
    },
    {
      title: "Availability",
      url: "/ops/dashboard/availability",
      icon: CalendarCheck,
    },
    // {
    //   title: "Draft Activities",
    //   url: "/ops/dashboard/draft-activities",
    //   icon: ClipboardCheck,
    // },
    {
      title: "Activities",
      url: "/ops/dashboard/activities",
      icon: CalendarDays,
    },
    {
      title: "Billing",
      url: "/ops/dashboard/billing",
      icon: Receipt,
    },
    {
      title: "Billing codes",
      url: "/ops/dashboard/billing-codes",
      icon: ListChecks,
    },
    {
      title: "Payroll",
      url: "/ops/dashboard/payroll",
      icon: Wallet,
    },
    {
      title: "Settings",
      url: "/ops/dashboard/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} onLogout={() => navigate("/ops")} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
