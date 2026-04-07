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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/components/ui/select";
import { Bell } from "lucide-react";
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
              <Select
                value={timeframe}
                onValueChange={(v) => setTimeframe(v as Timeframe)}
              >
                <SelectTrigger className="w-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIMEFRAMES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* <Button
              variant="ghost"
              size="icon"
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </Button> */}
          </div>
        </header>
        <div className="flex-1 overflow-auto">
          <Outlet context={{ timeframe }} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
