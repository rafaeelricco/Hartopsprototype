// =============================================================================
// Persistent sidebar + top-bar layout shared by all Operating Staff screens.
// Uses React Router <Outlet> so the sidebar never re-mounts on navigation.
// =============================================================================

import { useState } from "react";
import { useNavigate, useLocation, Link, Outlet } from "react-router";
import {
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  FileBarChart2,
  Palette,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { TIMEFRAMES, type Timeframe } from "./dashboard-data";

const LOGO_URL =
  "https://lirp.cdn-website.com/516d69f6/dms3rep/multi/opt/hart-2Bagency-2Blogo-217w.png";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/staff/dashboard" },
  { icon: Megaphone, label: "Campaigns", path: "/staff/campaigns" },
  { icon: CalendarDays, label: "Events", path: "/staff/events" },
  { icon: FileBarChart2, label: "Reports", path: "/staff/reports" },
  { icon: Palette, label: "Brand Assets", path: "/staff/brand-assets" },
  { icon: Settings, label: "Settings", path: "/staff/settings" },
];

// Page titles keyed by path
const PAGE_TITLES: Record<string, string> = {
  "/staff/dashboard": "Dashboard",
  "/staff/campaigns": "Campaigns",
  "/staff/events": "Events",
  "/staff/reports": "Reports",
  "/staff/brand-assets": "Brand Assets",
  "/staff/settings": "Settings",
};

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeframe, setTimeframe] = useState<Timeframe>(TIMEFRAMES[0]);

  const pageTitle =
    PAGE_TITLES[location.pathname] ??
    (location.pathname.startsWith("/staff/campaigns/") ? "Campaigns" :
     location.pathname.startsWith("/staff/events/") ? "Events" : "Dashboard");
  const isDashboard = location.pathname === "/staff/dashboard";

  return (
    <div className="min-h-screen flex font-[Inter]" style={{ background: "#F8FAFC" }}>
      {/* ------------------------------------------------------------------ */}
      {/* Sidebar                                                            */}
      {/* ------------------------------------------------------------------ */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[260px] flex flex-col border-r border-[#E2E8F0] bg-white transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0]">
          <Link to="/staff/dashboard" onClick={() => setSidebarOpen(false)}>
            <ImageWithFallback
              src={LOGO_URL}
              alt="Hart Agency Logo"
              className="h-9 w-auto"
            />
          </Link>
          <button
            className="lg:hidden text-[#64748B] hover:text-[#0F172A] transition-colors"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p
            className="px-3 mb-2 uppercase tracking-wider"
            style={{ fontSize: "0.6875rem", color: "#94A3B8", letterSpacing: "0.06em" }}
          >
            Menu
          </p>
          {NAV_ITEMS.map((item) => {
            const active =
              location.pathname === item.path ||
              (item.path === "/staff/campaigns" && location.pathname.startsWith("/staff/campaigns/")) ||
              (item.path === "/staff/events" && location.pathname.startsWith("/staff/events/"));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all duration-150 ${
                  active
                    ? "text-white shadow-sm"
                    : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                }`}
                style={
                  active
                    ? { background: "#7D152D", fontSize: "0.9375rem" }
                    : { fontSize: "0.9375rem" }
                }
              >
                <item.icon size={18} strokeWidth={active ? 2.2 : 1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-[#E2E8F0]">
          {/* User pill */}
          <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg bg-[#F8FAFC]">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ background: "#7D152D", fontSize: "0.75rem" }}
            >
              JS
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="truncate"
                style={{ fontSize: "0.8125rem", color: "#0F172A" }}
              >
                Jane Smith
              </p>
              <p
                className="truncate"
                style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
              >
                jane@hartagency.com
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-[#64748B] hover:bg-[#FEF2F2] hover:text-[#EF4444] transition-colors"
            style={{ fontSize: "0.9375rem" }}
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Main area                                                          */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-3.5 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-[#64748B] hover:text-[#0F172A] transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <h1 style={{ fontSize: "1.25rem", color: "#0F172A" }}>{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Timeframe filter — only visible on the Dashboard */}
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

            {/* Notification bell */}
            <button
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: "#EF4444" }}
              />
            </button>
          </div>
        </header>

        {/* Page content — provided by nested route */}
        <div className="flex-1">
          <Outlet context={{ timeframe }} />
        </div>
      </div>
    </div>
  );
}
