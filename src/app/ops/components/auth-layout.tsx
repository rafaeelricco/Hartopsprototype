import React from "react";

const LOGO_URL = "https://lirp.cdn-website.com/516d69f6/dms3rep/multi/opt/hart-2Bagency-2Blogo-217w.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center">
        <img
          src={LOGO_URL}
          alt="Hart Ops"
          className="h-16 w-auto"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-[420px] bg-card rounded-xl border border-border p-6">
        {children}
      </div>

      {/* Footer */}
      <p className="mt-6 text-center text-muted-foreground" style={{ fontSize: '0.8125rem' }}>
        By clicking continue, you agree to our{" "}
        <br />
        <a href="/ops/terms" className="text-primary underline hover:opacity-80">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/ops/privacy" className="text-primary underline hover:opacity-80">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}