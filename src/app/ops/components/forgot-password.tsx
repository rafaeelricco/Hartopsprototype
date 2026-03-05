import React, { useState } from "react";
import { Link } from "react-router";
import { AuthLayout } from "./auth-layout";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Input } from "@/app/shared/components/ui/input";
import { Button } from "@/app/shared/components/ui/button";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center text-center space-y-4 py-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h2 className="text-foreground">Check your email</h2>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "0.875rem" }}
            >
              We sent a password reset link to{" "}
              <span className="text-foreground">{email}</span>. Please check
              your inbox.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-primary hover:opacity-80 transition-opacity mt-2"
            style={{ fontSize: "0.875rem" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email and we'll send you a link to reset your password."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
              if (error) setError("");
            }}
            placeholder="you@example.com"
            aria-invalid={!!error}
          />
          {error && (
            <p className="text-destructive" style={{ fontSize: "0.8125rem" }}>
              {error}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 cursor-pointer"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>

        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-primary hover:opacity-80 transition-opacity"
            style={{ fontSize: "0.875rem" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
