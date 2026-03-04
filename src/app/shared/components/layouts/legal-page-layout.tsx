import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";

const LOGO_URL =
  "https://lirp.cdn-website.com/516d69f6/dms3rep/multi/opt/hart-2Bagency-2Blogo-217w.png";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            style={{ fontSize: "0.875rem" }}
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <ImageWithFallback
            src={LOGO_URL}
            alt="Hart Ops"
            className="h-10 w-auto"
          />
        </div>

        <div className="mt-6 rounded-xl border border-border bg-card p-8">
          <h1
            style={{ fontSize: "1.5rem", fontWeight: 700 }}
            className="text-foreground"
          >
            {title}
          </h1>
          <p
            className="mt-1 text-muted-foreground"
            style={{ fontSize: "0.875rem" }}
          >
            Last updated: {lastUpdated}
          </p>

          <hr className="my-6 border-border" />

          <div
            className="space-y-6"
            style={{ fontSize: "0.875rem", lineHeight: "1.625" }}
          >
            {children}
          </div>
        </div>

        <p
          className="mt-6 text-center text-muted-foreground"
          style={{ fontSize: "0.8125rem" }}
        >
          &copy; {new Date().getFullYear()} Hart Agency. All rights reserved.
        </p>
      </div>
    </div>
  );
}
