import React from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const LOGO_URL =
  "https://lirp.cdn-website.com/516d69f6/dms3rep/multi/opt/hart-2Bagency-2Blogo-217w.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
  subheading?: string;
}

export function AuthLayout({ children, heading, subheading }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex font-[Inter]" style={{ background: "#F8FAFC" }}>
      {/* Left branding panel – hidden on mobile */}
      <div
        className="hidden lg:flex lg:w-[480px] xl:w-[540px] flex-col justify-between p-10"
        style={{ background: "linear-gradient(160deg, #7D152D 0%, #5a0f20 100%)" }}
      >
        <div>
          <ImageWithFallback
            src={LOGO_URL}
            alt="Hart Agency Logo"
            className="h-12 w-auto brightness-0 invert mb-16"
          />
          <h1 className="text-white/95 mb-4" style={{ fontSize: "2rem", lineHeight: 1.25 }}>
            Promotional Marketing,&nbsp;Simplified.
          </h1>
          <p className="text-white/70" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
            Access your campaigns, track performance, and manage brand assets — all from one
            centralized dashboard.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-auto pt-12">
          <div className="h-px flex-1 bg-white/20" />
          <span className="text-white/50" style={{ fontSize: "0.8125rem" }}>
            &copy; {new Date().getFullYear()} Hart Agency
          </span>
          <div className="h-px flex-1 bg-white/20" />
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <ImageWithFallback src={LOGO_URL} alt="Hart Agency Logo" className="h-10 w-auto" />
          </div>

          <div className="mb-8">
            <h2 style={{ fontSize: "1.5rem", color: "#0F172A" }}>{heading}</h2>
            {subheading && (
              <p className="mt-2" style={{ color: "#64748B", fontSize: "0.9375rem" }}>
                {subheading}
              </p>
            )}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
