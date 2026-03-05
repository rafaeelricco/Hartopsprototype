import { Outlet, useLocation, Link } from "react-router";
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
import * as React from "react";

export function AppShell() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-border bg-card">
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
                    <Link to="/ops/dashboard">Hart Ops</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {pathnames.slice(1).map((value, index) => {
                  const last = index === pathnames.length - 2;
                  const to = `/${pathnames.slice(0, index + 2).join("/")}`;
                  const label = value.charAt(0).toUpperCase() + value.slice(1);

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
        </header>
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
