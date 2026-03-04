import React from "react";
import logoImage from "figma:asset/4aefc8a4ebd9ee8a486a9bd5fc1e93239dafa3d3.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center">
        <img
          src={logoImage}
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
        <a href="#" className="text-primary underline hover:opacity-80">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-primary underline hover:opacity-80">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
