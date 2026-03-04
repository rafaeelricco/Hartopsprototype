import React, { useState } from "react";
import { Link } from "react-router";
import { AuthLayout } from "./auth-layout";
import { AuthInput } from "./auth-input";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <AuthLayout
        heading="Check your email"
        subheading={`We sent a reset link to ${email}`}
      >
        <div className="flex flex-col items-center text-center py-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
            style={{ background: "#0F766E1A" }}
          >
            <CheckCircle2 size={32} style={{ color: "#0F766E" }} />
          </div>
          <p
            className="mb-2"
            style={{ fontSize: "0.9375rem", color: "#0F172A" }}
          >
            Password reset email sent
          </p>
          <p
            className="mb-8"
            style={{ fontSize: "0.875rem", color: "#64748B" }}
          >
            Click the link in the email to reset your password. If you don't see
            it, check your spam folder.
          </p>
          <button
            onClick={() => {
              setSent(false);
              setEmail("");
            }}
            className="mb-4 px-6 py-2.5 rounded-lg text-white transition-all hover:opacity-90"
            style={{ background: "#7D152D", fontSize: "0.9375rem" }}
          >
            Resend email
          </button>
          <Link
            to="/"
            className="flex items-center gap-1.5 hover:underline"
            style={{ fontSize: "0.875rem", color: "#0F766E" }}
          >
            <ArrowLeft size={15} />
            Back to sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      heading="Reset your password"
      subheading="Enter your email and we'll send you a reset link"
    >
      <form onSubmit={handleSubmit} noValidate>
        <AuthInput
          label="Email address"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          autoComplete="email"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg text-white transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          style={{ background: "#7D152D", fontSize: "0.9375rem" }}
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>

      <p className="mt-8 text-center">
        <Link
          to="/"
          className="flex items-center justify-center gap-1.5 hover:underline"
          style={{ fontSize: "0.875rem", color: "#0F766E" }}
        >
          <ArrowLeft size={15} />
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
