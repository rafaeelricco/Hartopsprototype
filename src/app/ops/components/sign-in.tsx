import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { AuthLayout } from "./auth-layout";
import { PasswordInput } from "./password-input";

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
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

    // Mock: check for demo credentials
    if (email === "admin@hartops.com" && password === "Password1!") {
      navigate("/ops/dashboard");
    } else if (email === "locked@hartops.com") {
      setErrors({ general: "Account locked. Please contact your administrator." });
    } else {
      setErrors({ general: "Invalid email or password. Please try again." });
    }

    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="space-y-1 mb-6">
        <h2 className="text-foreground">Sign In</h2>
        <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
          Welcome back. Sign in to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-destructive" style={{ fontSize: '0.875rem' }}>
            {errors.general}
          </div>
        )}

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="you@example.com"
            className={`w-full rounded-lg border ${
              errors.email ? "border-destructive" : "border-border"
            } bg-card px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors`}
          />
          {errors.email && (
            <p className="text-destructive" style={{ fontSize: '0.8125rem' }}>{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-foreground">
              Password
            </label>
            <Link
              to="/ops/forgot-password"
              className="text-primary hover:opacity-80 transition-opacity"
              style={{ fontSize: '0.8125rem' }}
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
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            error={errors.password}
          />
          {errors.password && (
            <p className="text-destructive" style={{ fontSize: '0.8125rem' }}>{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary text-primary-foreground py-2.5 px-4 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthLayout>
  );
}