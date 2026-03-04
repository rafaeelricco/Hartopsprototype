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

const LOGO_URL =
  "https://lirp.cdn-website.com/516d69f6/dms3rep/multi/opt/hart-2Bagency-2Blogo-217w.png";

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
} from "../../shared/components/ui/sidebar";
import { Avatar, AvatarFallback } from "../../shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../shared/components/ui/dropdown-menu";

const mainNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/ops/dashboard" },
  {
    label: "Organizations",
    icon: Building2,
    path: "/ops/dashboard/organizations",
  },
  { label: "Events", icon: CalendarDays, path: "/ops/dashboard/events" },
];

const documentsNavItems = [
  { label: "Reports", icon: FileBarChart, path: "/ops/dashboard/reports" },
];

const footerNavItems = [
  { label: "Settings", icon: Settings, path: "/ops/dashboard/settings" },
  { label: "Get Help", icon: LifeBuoy, path: "/ops/dashboard/help" },
  { label: "Search", icon: Search, path: "#" },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/ops/dashboard")
      return location.pathname === "/ops/dashboard";
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
              onClick={() => navigate("/ops/dashboard")}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-center size-8 shrink-0">
                <img
                  src={LOGO_URL}
                  alt="Hart Ops"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span
                  className="truncate"
                  style={{ fontSize: "0.875rem", fontWeight: 600 }}
                >
                  Hart Ops
                </span>
                <span
                  className="truncate text-muted-foreground"
                  style={{ fontSize: "0.75rem" }}
                >
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
                    <span
                      className="truncate"
                      style={{ fontSize: "0.875rem", fontWeight: 500 }}
                    >
                      Admin Hart
                    </span>
                    <span
                      className="truncate text-muted-foreground"
                      style={{ fontSize: "0.75rem" }}
                    >
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
                    <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                      Admin Hart
                    </span>
                    <span
                      className="text-muted-foreground"
                      style={{ fontSize: "0.75rem" }}
                    >
                      admin@hartops.com
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/ops/dashboard/settings")}
                  className="cursor-pointer"
                >
                  <Settings className="size-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/ops/dashboard/help")}
                  className="cursor-pointer"
                >
                  <LifeBuoy className="size-4 mr-2" />
                  Get Help
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/")}
                  className="cursor-pointer"
                >
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
