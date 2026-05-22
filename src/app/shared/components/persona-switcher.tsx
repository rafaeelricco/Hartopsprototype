// =============================================================================
// Persona Switcher — dev/demo helper
// Floating bottom-left button that jumps between the three personas without
// re-signing-in. Uses window.location to navigate so it works outside of
// react-router context (it's mounted at the App.tsx root, above RouterProvider).
// =============================================================================

import { useState, useEffect, useRef } from "react";
import { ChevronUp, UserCog, Briefcase, Users } from "lucide-react";

interface Persona {
  id: "ops" | "staff" | "educator";
  label: string;
  description: string;
  dashboardUrl: string;
  icon: typeof UserCog;
  color: string;
}

const PERSONAS: Persona[] = [
  {
    id: "ops",
    label: "Hart Ops",
    description: "Finance Operator · Super Admin",
    dashboardUrl: "/ops/dashboard",
    icon: UserCog,
    color: "#7D152D",
  },
  {
    id: "staff",
    label: "Client Staff",
    description: "Agency Admin",
    dashboardUrl: "/staff/dashboard",
    icon: Briefcase,
    color: "#0F766E",
  },
  {
    id: "educator",
    label: "Educator Manager",
    description: "Territory Manager",
    dashboardUrl: "/educator/dashboard",
    icon: Users,
    color: "#1D4ED8",
  },
];

function detectActivePersona(path: string): Persona["id"] {
  if (path.startsWith("/staff")) return "staff";
  if (path.startsWith("/educator")) return "educator";
  return "ops";
}

export function PersonaSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<Persona["id"]>(() =>
    detectActivePersona(window.location.pathname),
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Re-detect on browser back/forward
  useEffect(() => {
    function onPop() {
      setActiveId(detectActivePersona(window.location.pathname));
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  function switchTo(p: Persona) {
    setOpen(false);
    // Hard navigation — also resets in-memory provider state cleanly.
    window.location.href = p.dashboardUrl;
  }

  const active = PERSONAS.find((p) => p.id === activeId) ?? PERSONAS[0]!;
  const ActiveIcon = active.icon;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        left: 16,
        bottom: 16,
        zIndex: 9999,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {open && (
        <div
          className="mb-2 rounded-xl shadow-lg overflow-hidden"
          style={{
            background: "white",
            border: "1px solid #E2E8F0",
            minWidth: 260,
          }}
        >
          <div
            className="px-3 py-2 border-b"
            style={{
              borderColor: "#E2E8F0",
              fontSize: "0.6875rem",
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Switch persona
          </div>
          {PERSONAS.map((p) => {
            const Icon = p.icon;
            const isActive = p.id === activeId;
            return (
              <button
                key={p.id}
                onClick={() => switchTo(p)}
                className="w-full flex items-start gap-3 px-3 py-2.5 cursor-pointer transition-colors hover:bg-[#F8FAFC]"
                style={{
                  background: isActive ? "#F1F5F9" : "white",
                  textAlign: "left",
                  border: "none",
                }}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: `${p.color}1A` }}
                >
                  <Icon size={14} style={{ color: p.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    style={{
                      fontSize: "0.8125rem",
                      color: "#0F172A",
                      fontWeight: isActive ? 600 : 500,
                    }}
                  >
                    {p.label}
                    {isActive && (
                      <span
                        className="ml-1.5"
                        style={{ fontSize: "0.6875rem", color: "#0F766E" }}
                      >
                        · active
                      </span>
                    )}
                  </div>
                  <div
                    style={{ fontSize: "0.6875rem", color: "#64748B" }}
                  >
                    {p.description}
                  </div>
                </div>
              </button>
            );
          })}
          <div
            className="px-3 py-2 border-t"
            style={{
              borderColor: "#E2E8F0",
              fontSize: "0.6875rem",
              color: "#94A3B8",
              background: "#F8FAFC",
            }}
          >
            Demo tool · resets in-memory state on switch
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-full shadow-md cursor-pointer transition-colors"
        style={{
          background: "white",
          border: `1px solid ${active.color}`,
          color: active.color,
          fontSize: "0.8125rem",
        }}
        title="Switch persona for testing"
      >
        <ActiveIcon size={14} />
        <span style={{ fontWeight: 500 }}>{active.label}</span>
        <ChevronUp
          size={13}
          style={{
            transform: open ? "rotate(180deg)" : undefined,
            transition: "transform 0.15s",
          }}
        />
      </button>
    </div>
  );
}
