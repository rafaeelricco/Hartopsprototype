import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { AuthLayout } from "./auth-layout";
import { AuthInput } from "./auth-input";
import { Loader2 } from "lucide-react";

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate auth
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    navigate("/staff/dashboard");
  };

  return (
    <AuthLayout
      heading="Welcome back"
      subheading="Sign in to your Hart Agency dashboard"
    >
      <form onSubmit={handleSubmit} noValidate>
        <AuthInput
          label="Email address"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between mb-6">
          <label
            className="flex items-center gap-2 cursor-pointer"
            style={{ fontSize: "0.875rem" }}
          >
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-[#E2E8F0] accent-[#7D152D]"
            />
            <span style={{ color: "#64748B" }}>Remember me</span>
          </label>
          <Link
            to="/staff/forgot-password"
            className="hover:underline"
            style={{ fontSize: "0.875rem", color: "#0F766E" }}
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg text-white transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ background: "#7D152D", fontSize: "0.9375rem" }}
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="mt-8 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#E2E8F0]" />
        <span style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
          or continue with
        </span>
        <div className="h-px flex-1 bg-[#E2E8F0]" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] transition-colors"
          style={{ fontSize: "0.875rem", color: "#0F172A" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] transition-colors"
          style={{ fontSize: "0.875rem", color: "#0F172A" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#0F172A">
            <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.18 0-.36-.02-.53-.06-.01-.12-.02-.25-.02-.38 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.06.3.06.45h.2zm2.033 17.57c-.034-.07.5-1.02.5-1.02.026-.05.49-1.08.49-1.08-1.02-.47-1.637-1.49-1.717-2.56-.085-1.3.614-2.41 1.603-3.07-.87-1.22-2.202-1.37-2.68-1.4-1.17-.1-2.15.68-2.71.68-.58 0-1.44-.65-2.39-.63-1.22.02-2.37.72-3 1.83-1.3 2.24-.33 5.55.92 7.37.62.89 1.36 1.89 2.33 1.86.94-.04 1.29-.6 2.42-.6 1.12 0 1.44.6 2.42.58.99-.02 1.63-.9 2.25-1.79.46-.66.79-1.24.8-1.27z" />
          </svg>
          Apple
        </button>
      </div>

      <p
        className="mt-8 text-center"
        style={{ fontSize: "0.875rem", color: "#64748B" }}
      >
        Don't have an account?{" "}
        <Link
          to="/staff/sign-up"
          className="hover:underline"
          style={{ color: "#0F766E" }}
        >
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
