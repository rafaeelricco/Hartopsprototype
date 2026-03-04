import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
        <input
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
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
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
