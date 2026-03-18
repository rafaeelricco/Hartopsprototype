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
      plan: "Educator Manager",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/educator/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Events",
      url: "/educator/events",
      icon: CalendarDays,
    },
    {
      title: "Educators",
      url: "/educator/educators",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/educator/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  const educatorManagerMenuGroups = [
    {
      items: [
        {
          label: "Account",
          icon: BadgeCheck,
          onClick: () => navigate("/educator/settings?tab=account"),
        },
        {
          label: "Notifications",
          icon: Bell,
          onClick: () => navigate("/educator/settings?tab=notifications"),
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
          menuGroups={educatorManagerMenuGroups}
          onLogout={() => navigate("/educator")}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
