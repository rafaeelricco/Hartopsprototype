import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { AuthLayout } from "./auth-layout";
import { AuthInput } from "./auth-input";
import { Loader2 } from "lucide-react";

export function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<"name" | "email" | "password" | "confirm", string>>
  >({});
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const e: Partial<
      Record<"name" | "email" | "password" | "confirm", string>
    > = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8)
      e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    navigate("/staff/dashboard");
  };

  return (
    <AuthLayout
      heading="Create your account"
      subheading="Get started with Hart Agency in seconds"
    >
      <form onSubmit={handleSubmit} noValidate>
        <AuthInput
          label="Full name"
          type="text"
          placeholder="Jane Smith"
          value={form.name}
          onChange={set("name")}
          error={errors.name}
          autoComplete="name"
        />
        <AuthInput
          label="Email address"
          type="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={set("email")}
          error={errors.email}
          autoComplete="email"
        />
        <AuthInput
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          value={form.password}
          onChange={set("password")}
          error={errors.password}
          autoComplete="new-password"
        />
        <AuthInput
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          value={form.confirm}
          onChange={set("confirm")}
          error={errors.confirm}
          autoComplete="new-password"
        />

        <div className="mb-6">
          <label
            className="flex items-start gap-2 cursor-pointer"
            style={{ fontSize: "0.8125rem" }}
          >
            <input
              type="checkbox"
              className="w-4 h-4 mt-0.5 rounded border-[#E2E8F0] accent-[#7D152D]"
            />
            <span style={{ color: "#64748B" }}>
              I agree to Hart Agency's{" "}
              <span
                className="underline cursor-pointer"
                style={{ color: "#0F766E" }}
              >
                Terms of Service
              </span>{" "}
              and{" "}
              <span
                className="underline cursor-pointer"
                style={{ color: "#0F766E" }}
              >
                Privacy Policy
              </span>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg text-white transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ background: "#7D152D", fontSize: "0.9375rem" }}
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p
        className="mt-8 text-center"
        style={{ fontSize: "0.875rem", color: "#64748B" }}
      >
        Already have an account?{" "}
        <Link to="/" className="hover:underline" style={{ color: "#0F766E" }}>
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
