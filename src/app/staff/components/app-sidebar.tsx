"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  FileBarChart2,
  Palette,
  Settings,
  AudioWaveform,
  BadgeCheck,
  Bell,
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
    name: "Jane Smith",
    email: "jane@hartagency.com",
    avatar: "/avatars/jane-smith.jpg",
  },
  teams: [
    {
      name: "Hart Agency",
      logo: AudioWaveform,
      plan: "Operating Staff",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/staff/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Campaigns",
      url: "/staff/campaigns",
      icon: Megaphone,
    },
    {
      title: "Activities",
      url: "/staff/activities",
      icon: CalendarDays,
    },
    {
      title: "Brand Assets",
      url: "/staff/brand-assets",
      icon: Palette,
    },
    {
      title: "Settings",
      url: "/staff/settings",
      icon: Settings,
    },
  ],
  reports: [
    {
      name: "Activity Detail",
      url: "/staff/reports/activity-detail",
      icon: FileBarChart2,
    },
    {
      name: "Company Sales",
      url: "/staff/reports/company-sales",
      icon: FileBarChart2,
    },
    {
      name: "Supplier Activities",
      url: "/staff/reports/supplier-based",
      icon: FileBarChart2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  const staffMenuGroups = [
    {
      items: [
        {
          label: "Account",
          icon: BadgeCheck,
          onClick: () => navigate("/staff/settings"),
        },
        {
          label: "Notifications",
          icon: Bell,
          onClick: () => navigate("/staff/settings"),
        },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.reports} label="Reports" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={data.user}
          menuGroups={staffMenuGroups}
          onLogout={() => navigate("/staff")}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
