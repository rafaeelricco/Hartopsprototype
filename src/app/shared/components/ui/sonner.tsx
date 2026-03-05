"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = (props: ToasterProps) => {
  const { theme: themeOverride, ...rest } = props;
  const { theme: resolvedTheme = "system" } = useTheme();
  const effectiveTheme: NonNullable<ToasterProps["theme"]> =
    themeOverride ??
    (resolvedTheme as NonNullable<ToasterProps["theme"]>) ??
    "system";

  return (
    <Sonner
      theme={effectiveTheme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...rest}
    />
  );
};

export { Toaster };
