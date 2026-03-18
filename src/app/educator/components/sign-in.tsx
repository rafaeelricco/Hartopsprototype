import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { AuthLayout } from "@/app/ops/components/auth-layout";
import { PasswordInput } from "@/app/ops/components/password-input";
import { Input } from "@/app/shared/components/ui/input";
import { Button } from "@/app/shared/components/ui/button";

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("manager@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [errors, setErrors] = useState<{
    email?: string | undefined;
    password?: string | undefined;
    general?: string | undefined;
  }>({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    // Simulate auth call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (email === "manager@gmail.com" && password === "12345678") {
      navigate("/educator/dashboard");
    } else if (email === "locked@hartagency.com") {
      setErrors({
        general:
          "Your account is locked. Please contact your administrator for assistance.",
      });
    } else {
      setErrors({ general: "Invalid email or password. Please try again." });
    }

    setLoading(false);
  };

  return (
    <AuthLayout
      title="Educator Manager Sign In"
      subtitle="Welcome back. Sign in to manage your team."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div
            className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-destructive"
            style={{ fontSize: "0.875rem" }}
          >
            {errors.general}
          </div>
        )}

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-foreground">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email)
                setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-destructive" style={{ fontSize: "0.8125rem" }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-foreground">
              Password
            </label>
            <Link
              to="/educator/forgot-password"
              className="text-primary hover:opacity-80 transition-opacity"
              style={{ fontSize: "0.8125rem" }}
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            error={errors.password}
          />
          {errors.password && (
            <p className="text-destructive" style={{ fontSize: "0.8125rem" }}>
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 cursor-pointer"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </AuthLayout>
  );
}
