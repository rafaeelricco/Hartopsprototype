import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Mail,
  Phone,
  Star,
  ShoppingCart,
  Clock,
  CalendarDays,
  AlertTriangle,
} from "lucide-react";
import { getEducatorById } from "./educator-roster-data";

const statusColors: Record<string, string> = {
  Active: "bg-green-500/10 text-green-400 border-green-500/20",
  Inactive: "bg-muted text-muted-foreground border-border",
};

export function EducatorDetailPage() {
  const { id } = useParams();
  const educator = getEducatorById(id || "");

  if (!educator) {
    return (
      <div className="p-6">
        <Link
          to="/educator/educators"
          className="inline-flex items-center gap-1.5 text-primary hover:opacity-80 mb-6"
          style={{ fontSize: "0.875rem" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Educators
        </Link>
        <div className="text-center py-16">
          <AlertTriangle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Educator not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Back link */}
      <Link
        to="/educator/educators"
        className="inline-flex items-center gap-1.5 text-primary hover:opacity-80"
        style={{ fontSize: "0.875rem" }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Educators
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold text-lg">
                {educator.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                {educator.name}
              </h1>
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-medium mt-1 ${statusColors[educator.status]}`}
                style={{ fontSize: "0.75rem" }}
              >
                {educator.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact links */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <h2 className="text-foreground font-semibold">Contact</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <a
            href={`mailto:${educator.email}`}
            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/50 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "0.75rem" }}
              >
                Email
              </p>
              <p className="text-foreground font-medium group-hover:text-primary transition-colors" style={{ fontSize: "0.875rem" }}>
                {educator.email}
              </p>
            </div>
          </a>
          <a
            href={`tel:${educator.phone.replace(/[^\d+]/g, "")}`}
            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/50 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "0.75rem" }}
              >
                Phone
              </p>
              <p className="text-foreground font-medium group-hover:text-primary transition-colors" style={{ fontSize: "0.875rem" }}>
                {educator.phone}
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="space-y-4">
        <h2 className="text-foreground font-semibold">Quick Stats</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-5 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {educator.avgRating}
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
              Avg Rating
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-lg bg-blue-500/10 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {educator.salesPerEvent}
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
              Sales / Event
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-lg bg-green-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {educator.punctuality}%
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
              Punctuality
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-lg bg-purple-500/10 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {educator.totalEvents}
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
              Total Events
            </p>
          </div>
        </div>
      </div>

      {/* Info note */}
      <div className="rounded-xl border border-border bg-muted/30 p-4 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
          Educator profiles are managed by Hart Ops. As an Educator Manager, you
          have read-only access to contact information and performance metrics.
        </p>
      </div>
    </div>
  );
}
