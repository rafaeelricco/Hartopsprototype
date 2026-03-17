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
} from "lucide-react";
import { useNavigate } from "react-router";

import { NavMain } from "@/app/shared/components/nav-main";
import { NavProjects } from "@/app/shared/components/nav-projects";
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
      title: "Events",
      url: "/ops/dashboard/events",
      icon: CalendarDays,
    },
    {
      title: "Settings",
      url: "/ops/dashboard/settings",
      icon: Settings,
    },
  ],
  projects: [
    {
      name: "Reports",
      url: "/ops/dashboard/reports",
      icon: FileBarChart,
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
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} onLogout={() => navigate("/ops")} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
