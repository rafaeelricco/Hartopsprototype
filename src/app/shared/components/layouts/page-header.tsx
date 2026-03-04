import React from "react";

export interface PageHeaderProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string; // Optional wrapper class
}

export function PageHeader({
  title,
  subtitle,
  actions,
  className = "mb-6",
}: PageHeaderProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${className}`}
    >
      <div>
        {title && (
          <h2
            style={{ fontSize: "1.25rem", color: "#0F172A" }}
            className={subtitle ? "mb-1" : ""}
          >
            {title}
          </h2>
        )}
        {subtitle && (
          <p
            style={{
              fontSize: "0.875rem",
              color: title ? "#94A3B8" : "#64748B",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-3 flex-wrap">{actions}</div>
      )}
    </div>
  );
}
