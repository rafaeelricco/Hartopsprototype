import React from "react";
import { useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  FileBarChart,
  Settings,
  LogOut,
  LifeBuoy,
  Search,
  MoreHorizontal,
} from "lucide-react";
import logoImage from "figma:asset/4aefc8a4ebd9ee8a486a9bd5fc1e93239dafa3d3.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const mainNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Organizations", icon: Building2, path: "/dashboard/organizations" },
  { label: "Events", icon: CalendarDays, path: "/dashboard/events" },
];

const documentsNavItems = [
  { label: "Reports", icon: FileBarChart, path: "/dashboard/reports" },
];

const footerNavItems = [
  { label: "Settings", icon: Settings, path: "/dashboard/settings" },
  { label: "Get Help", icon: LifeBuoy, path: "/dashboard/help" },
  { label: "Search", icon: Search, path: "#" },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    if (path === "#") return false;
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      {/* Header — Logo & Name */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-center size-8 rounded-lg bg-[#7D152D] shrink-0">
                <img
                  src={logoImage}
                  alt="Hart Ops"
                  className="h-4 w-auto brightness-0 invert"
                />
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                  Hart Ops
                </span>
                <span className="truncate text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                  Super Admin
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Content */}
      <SidebarContent>
        {/* Platform Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={isActive(item.path)}
                    tooltip={item.label}
                    onClick={() => navigate(item.path)}
                    className="cursor-pointer"
                  >
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Documents Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Documents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {documentsNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={isActive(item.path)}
                    tooltip={item.label}
                    onClick={() => navigate(item.path)}
                    className="cursor-pointer"
                  >
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer — Settings, Help, Search, User */}
      <SidebarFooter>
        <SidebarMenu>
          {footerNavItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                isActive={isActive(item.path)}
                tooltip={item.label}
                onClick={() => item.path !== "#" && navigate(item.path)}
                className="cursor-pointer"
              >
                <item.icon className="size-4" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          {/* User Menu */}
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent cursor-pointer h-12">
                  <Avatar className="size-8 rounded-lg">
                    <AvatarFallback
                      className="rounded-lg text-xs"
                      style={{
                        backgroundColor: "#7D152D",
                        color: "#FFFFFF",
                      }}
                    >
                      AH
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                      Admin Hart
                    </span>
                    <span className="truncate text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                      admin@hartops.com
                    </span>
                  </div>
                  <MoreHorizontal className="ml-auto size-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg"
                side="right"
                align="end"
                sideOffset={4}
              >
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <Avatar className="size-8 rounded-lg">
                    <AvatarFallback
                      className="rounded-lg text-xs"
                      style={{
                        backgroundColor: "#7D152D",
                        color: "#FFFFFF",
                      }}
                    >
                      AH
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left leading-tight">
                    <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Admin Hart</span>
                    <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                      admin@hartops.com
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard/settings")} className="cursor-pointer">
                  <Settings className="size-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <LifeBuoy className="size-4 mr-2" />
                  Get Help
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/")} className="cursor-pointer">
                  <LogOut className="size-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}