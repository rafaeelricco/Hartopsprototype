"use client";

import * as React from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Settings,
  AudioWaveform,
  BadgeCheck,
  Bell,
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
    name: "Maria Lopez",
    email: "maria@hartagency.com",
    avatar: "/avatars/maria-lopez.jpg",
  },
  teams: [
    {
      name: "Hart Agency",
      logo: AudioWaveform,
      plan: "Market Manager",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/market-manager/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Activities",
      url: "/market-manager/activities",
      icon: CalendarDays,
    },
    {
      title: "Brand Ambassadors",
      url: "/market-manager/brand-ambassadors",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/market-manager/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  const brandAmbassadorManagerMenuGroups = [
    {
      items: [
        {
          label: "Account",
          icon: BadgeCheck,
          onClick: () => navigate("/market-manager/settings?tab=account"),
        },
        {
          label: "Notifications",
          icon: Bell,
          onClick: () => navigate("/market-manager/settings?tab=notifications"),
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
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={data.user}
          menuGroups={brandAmbassadorManagerMenuGroups}
          onLogout={() => navigate("/brand ambassador")}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
