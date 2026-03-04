import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "./auth-layout";
import { PasswordInput } from "./password-input";
import { CheckCircle2 } from "lucide-react";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "1 uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "1 number", test: (v: string) => /[0-9]/.test(v) },
  { label: "1 special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

export function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    password?: string | undefined;
    confirm?: string | undefined;
  }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    const failedRules = PASSWORD_RULES.filter((r) => !r.test(password));
    if (!password) {
      newErrors.password = "Password is required";
    } else if (failedRules.length > 0) {
      newErrors.password = "Password does not meet all requirements";
    }

    if (!confirmPassword) {
      newErrors.confirm = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirm = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSuccess(true);
    setLoading(false);

    setTimeout(() => navigate("/"), 2000);
  };

  if (success) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center text-center space-y-4 py-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h2 className="text-foreground">Password Updated</h2>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "0.875rem" }}
            >
              Your password has been successfully reset. Redirecting to Sign
              In...
            </p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new password for your account."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New Password */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-foreground">
            New Password
          </label>
          <PasswordInput
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            placeholder="Create a password"
            error={errors.password}
          />
          {/* Password requirements */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2">
            {PASSWORD_RULES.map((rule) => {
              const passed = rule.test(password);
              return (
                <div key={rule.label} className="flex items-center gap-1.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      password.length === 0
                        ? "bg-border"
                        : passed
                          ? "bg-green-500"
                          : "bg-destructive"
                    }`}
                  />
                  <span
                    className={`${
                      password.length === 0
                        ? "text-muted-foreground"
                        : passed
                          ? "text-green-600"
                          : "text-destructive"
                    }`}
                    style={{ fontSize: "0.75rem" }}
                  >
                    {rule.label}
                  </span>
                </div>
              );
            })}
          </div>
          {errors.password && (
            <p className="text-destructive" style={{ fontSize: "0.8125rem" }}>
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="block text-foreground">
            Confirm Password
          </label>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirm)
                setErrors((prev) => ({ ...prev, confirm: undefined }));
            }}
            placeholder="Re-enter your password"
            error={errors.confirm}
          />
          {errors.confirm && (
            <p className="text-destructive" style={{ fontSize: "0.8125rem" }}>
              {errors.confirm}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary text-primary-foreground py-2.5 px-4 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
}
