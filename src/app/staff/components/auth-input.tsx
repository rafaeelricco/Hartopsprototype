import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | undefined;
}

export function AuthInput({
  label,
  error,
  type,
  className,
  ...props
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="mb-5">
      <label
        className="block mb-1.5"
        style={{ fontSize: "0.875rem", color: "#0F172A" }}
      >
        {label}
      </label>
      <div className="relative">
        <Input
          type={isPassword && showPassword ? "text" : type}
          className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
            error
              ? "border-[#EF4444] focus:ring-[#EF4444]/30"
              : "border-[#E2E8F0] focus:ring-[#7D152D]/30 focus:border-[#7D152D]"
          } ${className ?? ""}`}
          style={{
            background: "#FFFFFF",
            fontSize: "0.9375rem",
            color: "#0F172A",
          }}
          {...props}
        />
        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] transition-colors h-auto w-auto p-1"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        )}
      </div>
      {error && (
        <p className="mt-1" style={{ fontSize: "0.8125rem", color: "#EF4444" }}>
          {error}
        </p>
      )}
    </div>
  );
}
