import React from "react";

export function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-foreground">Page Not Found</h1>
        <p
          className="text-muted-foreground mt-2"
          style={{ fontSize: "0.875rem" }}
        >
          The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
}
