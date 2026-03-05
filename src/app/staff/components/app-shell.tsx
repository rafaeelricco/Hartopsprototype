import { Outlet, useLocation, Link } from "react-router";
import { useState } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/app/shared/components/ui/sidebar";
import { Separator } from "@/app/shared/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/shared/components/ui/breadcrumb";
import { AppSidebar } from "./app-sidebar";
import { Button } from "@/app/shared/components/ui/button";
import { Bell, ChevronDown } from "lucide-react";
import { TIMEFRAMES, type Timeframe } from "./dashboard-data";
import * as React from "react";

export function AppShell() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [timeframe, setTimeframe] = useState<Timeframe>(
    TIMEFRAMES[0] ?? "Last 30 days",
  );

  const isDashboard = location.pathname === "/staff/dashboard";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-border bg-card pr-4">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link to="/staff/dashboard">Hart Agency</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {pathnames.slice(1).map((value, index) => {
                  const last = index === pathnames.length - 2;
                  const to = `/${pathnames.slice(0, index + 2).join("/")}`;
                  const label =
                    value.charAt(0).toUpperCase() +
                    value.slice(1).replace(/-/g, " ");

                  return (
                    <React.Fragment key={to}>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        {last ? (
                          <BreadcrumbPage>{label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={to}>{label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-3">
            {isDashboard && (
              <div className="relative">
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value as Timeframe)}
                  className="appearance-none pl-4 pr-9 py-2 rounded-lg border border-[#E2E8F0] bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 transition-colors"
                  style={{ fontSize: "0.875rem", color: "#0F172A" }}
                >
                  {TIMEFRAMES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#64748B]"
                />
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: "#EF4444" }}
              />
            </Button>
          </div>
        </header>
        <div className="flex-1 overflow-auto">
          <Outlet context={{ timeframe }} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
