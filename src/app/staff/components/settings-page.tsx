// =============================================================================
// Settings — Completes the Hart Agency Operating Staff dashboard.
// 5 tabs: Profile, Notifications, Team, Preferences, Integrations.
// =============================================================================

import { useState, useMemo } from "react";
import { PageHeader } from "../../shared/components/layouts/page-header";
import {
  User,
  Bell,
  Users,
  SlidersHorizontal,
  Puzzle,
  Pencil,
  Trash2,
  X,
  Plus,
  Search,
  Check,
  Shield,
  Mail,
  Smartphone,
  MonitorSmartphone,
  Copy,
  Eye,
  EyeOff,
  Camera,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Link2,
  Link2Off,
  Lock,
  Clock,
  CalendarDays,
  LayoutDashboard,
  LayoutGrid,
} from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "../../shared/components/ui/ImageWithFallback";
import {
  CURRENT_USER,
  INITIAL_TEAM,
  INITIAL_NOTIFICATIONS,
  INITIAL_INTEGRATIONS,
  TEAM_ROLES,
  TIMEZONES,
  DATE_FORMATS,
  DASHBOARD_DEFAULTS,
  type UserProfile,
  type TeamMember,
  type TeamRole,
  type NotificationPref,
  type Integration,
} from "./settings-data";

// ── Shared helpers ───────────────────────────────────────────────────────────

type SettingsTab =
  | "profile"
  | "notifications"
  | "team"
  | "preferences"
  | "integrations";

function fmtRelative(iso: string) {
  if (!iso) return "Never";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function fmtDateTime(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// =============================================================================
// Main
// =============================================================================

export function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>("profile");

  const TABS: { key: SettingsTab; icon: React.ReactNode; label: string }[] = [
    { key: "profile", icon: <User size={15} />, label: "Profile" },
    { key: "notifications", icon: <Bell size={15} />, label: "Notifications" },
    { key: "team", icon: <Users size={15} />, label: "Team" },
    {
      key: "preferences",
      icon: <SlidersHorizontal size={15} />,
      label: "Preferences",
    },
    { key: "integrations", icon: <Puzzle size={15} />, label: "Integrations" },
  ];

  return (
    <div className="p-6 font-[Inter]">
      {/* Header */}
      <PageHeader
        title="Settings"
        subtitle="Manage your account, team, and application preferences."
      />

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-[#E2E8F0] overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex items-center gap-2 px-4 py-3 transition-colors relative whitespace-nowrap"
            style={{
              fontSize: "0.8125rem",
              color: tab === t.key ? "#7D152D" : "#64748B",
            }}
          >
            {t.icon}
            {t.label}
            {tab === t.key && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t"
                style={{ background: "#7D152D" }}
              />
            )}
          </button>
        ))}
      </div>

      {tab === "profile" && <ProfileTab />}
      {tab === "notifications" && <NotificationsTab />}
      {tab === "team" && <TeamTab />}
      {tab === "preferences" && <PreferencesTab />}
      {tab === "integrations" && <IntegrationsTab />}
    </div>
  );
}

// =============================================================================
// 1. Profile Tab
// =============================================================================

function ProfileTab() {
  const [profile, setProfile] = useState<UserProfile>({ ...CURRENT_USER });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setEditing(false);
      toast.success("Profile updated successfully");
    }, 900);
  }

  function handleCancel() {
    setProfile({ ...CURRENT_USER });
    setEditing(false);
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Avatar + basic info card */}
      <SectionCard>
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="relative group flex-shrink-0">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F1F5F9]">
              <ImageWithFallback
                src={profile.avatarUrl}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() =>
                toast.info(
                  "Avatar upload is simulated — no file will be stored.",
                )
              }
            >
              <Camera size={18} style={{ color: "#fff" }} />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p style={{ fontSize: "1.0625rem", color: "#0F172A" }}>
                {profile.firstName} {profile.lastName}
              </p>
              <span
                className="px-2 py-0.5 rounded-md"
                style={{
                  fontSize: "0.625rem",
                  background: "#7D152D14",
                  color: "#7D152D",
                }}
              >
                {profile.role}
              </span>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "#64748B" }}>
              {profile.email}
            </p>
            <p
              className="mt-0.5"
              style={{ fontSize: "0.75rem", color: "#94A3B8" }}
            >
              {profile.company} &middot;{" "}
              {profile.timezone.replace("America/", "").replace("_", " ")}
            </p>
          </div>

          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors flex-shrink-0"
              style={{ fontSize: "0.8125rem", color: "#0F172A" }}
            >
              <Pencil size={13} /> Edit
            </button>
          )}
        </div>
      </SectionCard>

      {/* Editable fields */}
      {editing && (
        <SectionCard title="Edit Profile">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <FieldGroup label="First name">
                <Input
                  value={profile.firstName}
                  onChange={(v) => setProfile((p) => ({ ...p, firstName: v }))}
                />
              </FieldGroup>
              <FieldGroup label="Last name">
                <Input
                  value={profile.lastName}
                  onChange={(v) => setProfile((p) => ({ ...p, lastName: v }))}
                />
              </FieldGroup>
            </div>
            <FieldGroup label="Email">
              <Input
                value={profile.email}
                onChange={(v) => setProfile((p) => ({ ...p, email: v }))}
                type="email"
              />
            </FieldGroup>
            <FieldGroup label="Phone">
              <Input
                value={profile.phone}
                onChange={(v) => setProfile((p) => ({ ...p, phone: v }))}
                type="tel"
              />
            </FieldGroup>
            <FieldGroup label="Timezone">
              <select
                value={profile.timezone}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, timezone: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D] bg-white"
                style={{ fontSize: "0.8125rem", color: "#0F172A" }}
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz.replace("_", " ")}
                  </option>
                ))}
              </select>
            </FieldGroup>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ background: "#7D152D", fontSize: "0.8125rem" }}
              >
                {saving ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Check size={14} />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors"
                style={{ fontSize: "0.8125rem", color: "#64748B" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </SectionCard>
      )}

      {/* Security */}
      <SectionCard title="Security">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "#F1F5F9" }}
            >
              <Lock size={16} style={{ color: "#64748B" }} />
            </div>
            <div>
              <p style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
                Password
              </p>
              <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                Last changed 45 days ago
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-3 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors"
            style={{ fontSize: "0.8125rem", color: "#0F172A" }}
          >
            Change password
          </button>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F1F5F9]">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "#F1F5F9" }}
            >
              <Shield size={16} style={{ color: "#64748B" }} />
            </div>
            <div>
              <p style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
                Two-factor authentication
              </p>
              <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          <ToggleSwitch
            checked={false}
            onChange={() => toast.info("2FA setup is simulated in this demo.")}
          />
        </div>
      </SectionCard>

      {/* Danger zone */}
      <SectionCard>
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontSize: "0.8125rem", color: "#B91C1C" }}>
              Delete account
            </p>
            <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
              Permanently remove your account and all associated data. This
              action cannot be undone.
            </p>
          </div>
          <button
            onClick={() =>
              toast.error("Account deletion is disabled in this demo.")
            }
            className="px-3 py-2 rounded-lg border border-[#FEE2E2] hover:bg-[#FEF2F2] transition-colors flex-shrink-0"
            style={{ fontSize: "0.8125rem", color: "#B91C1C" }}
          >
            Delete account
          </button>
        </div>
      </SectionCard>

      {/* Password modal */}
      {showPasswordModal && (
        <PasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
}

// ── Password Modal ───────────────────────────────────────────────────────────

function PasswordModal({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!current || !next || !confirm) {
      toast.error("All fields are required.");
      return;
    }
    if (next.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (next !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Password changed successfully");
      onClose();
    }, 1000);
  }

  return (
    <Overlay onClose={onClose}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        <h3 style={{ fontSize: "1rem", color: "#0F172A" }}>Change Password</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-[#F1F5F9] rounded-md transition-colors"
        >
          <X size={16} style={{ color: "#64748B" }} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <FieldGroup label="Current password">
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="w-full px-3 py-2 pr-9 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
              style={{ fontSize: "0.8125rem" }}
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2"
            >
              {showCurrent ? (
                <EyeOff size={14} style={{ color: "#94A3B8" }} />
              ) : (
                <Eye size={14} style={{ color: "#94A3B8" }} />
              )}
            </button>
          </div>
        </FieldGroup>
        <FieldGroup label="New password">
          <div className="relative">
            <input
              type={showNext ? "text" : "password"}
              value={next}
              onChange={(e) => setNext(e.target.value)}
              className="w-full px-3 py-2 pr-9 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
              style={{ fontSize: "0.8125rem" }}
              placeholder="Min. 8 characters"
            />
            <button
              type="button"
              onClick={() => setShowNext(!showNext)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2"
            >
              {showNext ? (
                <EyeOff size={14} style={{ color: "#94A3B8" }} />
              ) : (
                <Eye size={14} style={{ color: "#94A3B8" }} />
              )}
            </button>
          </div>
          {next.length > 0 && <PasswordStrength password={next} />}
        </FieldGroup>
        <FieldGroup label="Confirm new password">
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
            style={{ fontSize: "0.8125rem" }}
          />
        </FieldGroup>
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors"
            style={{ fontSize: "0.8125rem", color: "#64748B" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: "#7D152D", fontSize: "0.8125rem" }}
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </Overlay>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;
  const labels = ["Weak", "Fair", "Good", "Strong"];
  const colors = ["#B91C1C", "#D97706", "#0F766E", "#0F766E"];
  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex gap-1 flex-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full"
            style={{ background: i < score ? colors[score - 1] : "#E2E8F0" }}
          />
        ))}
      </div>
      <span
        style={{ fontSize: "0.625rem", color: colors[score - 1] ?? "#94A3B8" }}
      >
        {labels[score - 1] ?? "Too short"}
      </span>
    </div>
  );
}

// =============================================================================
// 2. Notifications Tab
// =============================================================================

function NotificationsTab() {
  const [prefs, setPrefs] = useState<NotificationPref[]>([
    ...INITIAL_NOTIFICATIONS,
  ]);
  const [saving, setSaving] = useState(false);

  function toggle(id: string, channel: "email" | "push" | "inApp") {
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [channel]: !p[channel] } : p)),
    );
  }

  const grouped = useMemo(() => {
    const map = new Map<string, NotificationPref[]>();
    prefs.forEach((p) => {
      const list = map.get(p.category) ?? [];
      list.push(p);
      map.set(p.category, list);
    });
    return Array.from(map.entries());
  }, [prefs]);

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Notification preferences saved");
    }, 800);
  }

  return (
    <div className="max-w-2xl space-y-5">
      {/* Channel legend */}
      <div className="flex items-center gap-6 mb-1">
        <span
          className="flex items-center gap-1.5"
          style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
        >
          <Mail size={12} /> Email
        </span>
        <span
          className="flex items-center gap-1.5"
          style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
        >
          <Smartphone size={12} /> Push
        </span>
        <span
          className="flex items-center gap-1.5"
          style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
        >
          <MonitorSmartphone size={12} /> In-App
        </span>
      </div>

      {grouped.map(([category, items]) => (
        <SectionCard key={category} title={category}>
          <div className="space-y-0">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 py-3 ${idx < items.length - 1 ? "border-b border-[#F1F5F9]" : ""}`}
              >
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <ToggleSwitch
                    checked={item.email}
                    onChange={() => toggle(item.id, "email")}
                    small
                    label="Email"
                  />
                  <ToggleSwitch
                    checked={item.push}
                    onChange={() => toggle(item.id, "push")}
                    small
                    label="Push"
                  />
                  <ToggleSwitch
                    checked={item.inApp}
                    onChange={() => toggle(item.id, "inApp")}
                    small
                    label="In-App"
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      ))}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: "#7D152D", fontSize: "0.8125rem" }}
        >
          {saving ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Check size={14} />
          )}
          {saving ? "Saving..." : "Save Preferences"}
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// 3. Team Tab
// =============================================================================

function TeamTab() {
  const [members, setMembers] = useState<TeamMember[]>([...INITIAL_TEAM]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [showInvite, setShowInvite] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = members;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q),
      );
    }
    if (roleFilter !== "all")
      result = result.filter((m) => m.role === roleFilter);
    return result;
  }, [members, search, roleFilter]);

  const roleCounts = useMemo(() => {
    const map: Record<string, number> = {};
    members.forEach((m) => {
      map[m.role] = (map[m.role] ?? 0) + 1;
    });
    return map;
  }, [members]);

  function handleInvite(email: string, role: TeamRole) {
    const initials = email.substring(0, 2).toUpperCase();
    const newMember: TeamMember = {
      id: "tm-new-" + Date.now(),
      name: email.split("@")[0],
      email,
      role,
      status: "invited",
      lastActive: "",
      initials,
      color: "#2563EB",
    };
    setMembers((prev) => [...prev, newMember]);
    setShowInvite(false);
    toast.success(`Invitation sent to ${email}`);
  }

  function handleRemove(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setRemovingId(null);
    toast.success("Team member removed");
  }

  function handleRoleChange(id: string, role: TeamRole) {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
    toast.success("Role updated");
  }

  const STATUS_STYLE: Record<
    string,
    { bg: string; text: string; label: string }
  > = {
    active: { bg: "#ECFDF5", text: "#0F766E", label: "Active" },
    invited: { bg: "#EFF6FF", text: "#2563EB", label: "Invited" },
    deactivated: { bg: "#F1F5F9", text: "#94A3B8", label: "Deactivated" },
  };

  return (
    <div className="space-y-4">
      {/* Role summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total",
            value: members.length,
            color: "#0F172A",
            bg: "#F8FAFC",
          },
          {
            label: "Active",
            value: members.filter((m) => m.status === "active").length,
            color: "#0F766E",
            bg: "#ECFDF5",
          },
          {
            label: "Invited",
            value: members.filter((m) => m.status === "invited").length,
            color: "#2563EB",
            bg: "#EFF6FF",
          },
          {
            label: "Field Educators",
            value: roleCounts["Field Educator"] ?? 0,
            color: "#7C3AED",
            bg: "#F5F3FF",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl px-4 py-3 border border-[#E2E8F0]"
            style={{ background: s.bg }}
          >
            <p
              style={{
                fontSize: "0.6875rem",
                color: "#94A3B8",
                letterSpacing: "0.03em",
              }}
            >
              {s.label}
            </p>
            <p
              className="mt-0.5"
              style={{ fontSize: "1.25rem", color: s.color }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          <div className="relative flex-1 max-w-xs">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "#94A3B8" }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E2E8F0] bg-white outline-none transition-colors focus:border-[#7D152D]"
              style={{ fontSize: "0.8125rem", color: "#0F172A" }}
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white cursor-pointer outline-none"
            style={{ fontSize: "0.8125rem", color: "#64748B" }}
          >
            <option value="all">All Roles</option>
            {TEAM_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowInvite(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
          style={{ background: "#7D152D", fontSize: "0.8125rem" }}
        >
          <Plus size={14} /> Invite Member
        </button>
      </div>

      {/* Member count */}
      <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
        {filtered.length} member{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Members table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table
            className="w-full min-w-[640px]"
            style={{ borderCollapse: "separate", borderSpacing: 0 }}
          >
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                {["Member", "Role", "Status", "Last Active", ""].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left"
                    style={{
                      fontSize: "0.6875rem",
                      color: "#94A3B8",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => {
                const st = STATUS_STYLE[m.status] ?? STATUS_STYLE.active;
                return (
                  <tr
                    key={m.id}
                    className="border-b border-[#F8FAFC] last:border-0 hover:bg-[#FAFBFC] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
                          style={{ background: m.color, fontSize: "0.6875rem" }}
                        >
                          {m.initials}
                        </div>
                        <div className="min-w-0">
                          <p
                            className="truncate"
                            style={{ fontSize: "0.8125rem", color: "#0F172A" }}
                          >
                            {m.name}
                          </p>
                          <p
                            className="truncate"
                            style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
                          >
                            {m.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={m.role}
                        onChange={(e) =>
                          handleRoleChange(m.id, e.target.value as TeamRole)
                        }
                        className="px-2 py-1 rounded-md border border-[#E2E8F0] bg-white outline-none cursor-pointer"
                        style={{ fontSize: "0.75rem", color: "#64748B" }}
                        disabled={m.email === CURRENT_USER.email}
                      >
                        {TEAM_ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded-md"
                        style={{
                          fontSize: "0.6875rem",
                          background: st.bg,
                          color: st.text,
                        }}
                      >
                        {st.label}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                    >
                      {m.lastActive ? fmtRelative(m.lastActive) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {m.email !== CURRENT_USER.email && (
                        <button
                          onClick={() => setRemovingId(m.id)}
                          className="p-1.5 rounded-md hover:bg-[#FEF2F2] transition-colors"
                        >
                          <Trash2 size={13} style={{ color: "#B91C1C" }} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite modal */}
      {showInvite && (
        <InviteModal
          onInvite={handleInvite}
          onClose={() => setShowInvite(false)}
        />
      )}

      {/* Remove confirm */}
      {removingId && (
        <ConfirmDialog
          title="Remove team member?"
          description={`"${members.find((m) => m.id === removingId)?.name}" will lose access to this workspace.`}
          confirmLabel="Remove"
          onConfirm={() => handleRemove(removingId)}
          onCancel={() => setRemovingId(null)}
        />
      )}
    </div>
  );
}

function InviteModal({
  onInvite,
  onClose,
}: {
  onInvite: (email: string, role: TeamRole) => void;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamRole>("Field Educator");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    onInvite(email, role);
  }

  return (
    <Overlay onClose={onClose}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        <h3 style={{ fontSize: "1rem", color: "#0F172A" }}>
          Invite Team Member
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-[#F1F5F9] rounded-md transition-colors"
        >
          <X size={16} style={{ color: "#64748B" }} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <FieldGroup label="Email address">
          <Input
            value={email}
            onChange={setEmail}
            type="email"
            placeholder="colleague@company.com"
          />
        </FieldGroup>
        <FieldGroup label="Role">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as TeamRole)}
            className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D] bg-white"
            style={{ fontSize: "0.8125rem" }}
          >
            {TEAM_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </FieldGroup>
        <p style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
          An invitation email will be sent. The member can sign in after
          accepting.
        </p>
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors"
            style={{ fontSize: "0.8125rem", color: "#64748B" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
            style={{ background: "#7D152D", fontSize: "0.8125rem" }}
          >
            Send Invitation
          </button>
        </div>
      </form>
    </Overlay>
  );
}

// =============================================================================
// 4. Preferences Tab
// =============================================================================

function PreferencesTab() {
  const [dashDefault, setDashDefault] = useState("Last 30 days");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [productView, setProductView] = useState<"grid" | "list">("grid");
  const [compactMode, setCompactMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [saving, setSaving] = useState(false);

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Preferences saved");
    }, 800);
  }

  return (
    <div className="max-w-2xl space-y-5">
      {/* Dashboard defaults */}
      <SectionCard title="Dashboard">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "#F1F5F9" }}
              >
                <LayoutDashboard size={16} style={{ color: "#64748B" }} />
              </div>
              <div>
                <p style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
                  Default timeframe
                </p>
                <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                  Initial timeframe filter when you open the dashboard
                </p>
              </div>
            </div>
            <select
              value={dashDefault}
              onChange={(e) => setDashDefault(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white cursor-pointer outline-none"
              style={{ fontSize: "0.8125rem", color: "#0F172A" }}
            >
              {DASHBOARD_DEFAULTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </SectionCard>

      {/* Display */}
      <SectionCard title="Display">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "#F1F5F9" }}
              >
                <CalendarDays size={16} style={{ color: "#64748B" }} />
              </div>
              <div>
                <p style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
                  Date format
                </p>
                <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                  How dates are displayed across the application
                </p>
              </div>
            </div>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white cursor-pointer outline-none"
              style={{ fontSize: "0.8125rem", color: "#0F172A" }}
            >
              {DATE_FORMATS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "#F1F5F9" }}
              >
                <LayoutGrid size={16} style={{ color: "#64748B" }} />
              </div>
              <div>
                <p style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
                  Product Library view
                </p>
                <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                  Default view mode for the Brand Assets product library
                </p>
              </div>
            </div>
            <div className="inline-flex rounded-lg border border-[#E2E8F0] overflow-hidden">
              <button
                onClick={() => setProductView("grid")}
                className="px-3 py-1.5 transition-colors"
                style={{
                  fontSize: "0.75rem",
                  background: productView === "grid" ? "#7D152D" : "#fff",
                  color: productView === "grid" ? "#fff" : "#64748B",
                }}
              >
                Grid
              </button>
              <button
                onClick={() => setProductView("list")}
                className="px-3 py-1.5 transition-colors"
                style={{
                  fontSize: "0.75rem",
                  background: productView === "list" ? "#7D152D" : "#fff",
                  color: productView === "list" ? "#fff" : "#64748B",
                }}
              >
                List
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "#F1F5F9" }}
              >
                <SlidersHorizontal size={16} style={{ color: "#64748B" }} />
              </div>
              <div>
                <p style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
                  Compact mode
                </p>
                <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                  Reduce spacing and padding for denser layouts
                </p>
              </div>
            </div>
            <ToggleSwitch checked={compactMode} onChange={setCompactMode} />
          </div>
        </div>
      </SectionCard>

      {/* Behavior */}
      <SectionCard title="Behavior">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "#F1F5F9" }}
            >
              <CheckCircle2 size={16} style={{ color: "#64748B" }} />
            </div>
            <div>
              <p style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
                Auto-save drafts
              </p>
              <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                Automatically save event and campaign drafts as you edit
              </p>
            </div>
          </div>
          <ToggleSwitch checked={autoSave} onChange={setAutoSave} />
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: "#7D152D", fontSize: "0.8125rem" }}
        >
          {saving ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Check size={14} />
          )}
          {saving ? "Saving..." : "Save Preferences"}
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// 5. Integrations Tab
// =============================================================================

function IntegrationsTab() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    ...INITIAL_INTEGRATIONS,
  ]);
  const [syncing, setSyncing] = useState<string | null>(null);

  function toggleConnect(id: string) {
    const int = integrations.find((i) => i.id === id);
    if (!int) return;
    if (int.connected) {
      setIntegrations((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, connected: false, lastSync: null } : i,
        ),
      );
      toast.success(`${int.name} disconnected`);
    } else {
      // Simulate connection flow
      setSyncing(id);
      setTimeout(() => {
        setIntegrations((prev) =>
          prev.map((i) =>
            i.id === id
              ? { ...i, connected: true, lastSync: new Date().toISOString() }
              : i,
          ),
        );
        setSyncing(null);
        toast.success(`${int.name} connected successfully`);
      }, 1500);
    }
  }

  function handleSync(id: string) {
    setSyncing(id);
    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, lastSync: new Date().toISOString() } : i,
        ),
      );
      setSyncing(null);
      toast.success("Sync completed");
    }, 1200);
  }

  const connected = integrations.filter((i) => i.connected);
  const available = integrations.filter((i) => !i.connected);

  return (
    <div className="space-y-6">
      {/* Connected */}
      {connected.length > 0 && (
        <div>
          <p
            className="mb-3 flex items-center gap-2"
            style={{ fontSize: "0.8125rem", color: "#0F172A" }}
          >
            <Link2 size={14} style={{ color: "#0F766E" }} />
            Connected ({connected.length})
          </p>
          <div className="space-y-3">
            {connected.map((int) => (
              <div
                key={int.id}
                className="bg-white rounded-xl border border-[#E2E8F0] px-5 py-4 flex items-center gap-4 hover:shadow-sm transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "#ECFDF5", fontSize: "1.25rem" }}
                >
                  {int.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
                      {int.name}
                    </p>
                    <span
                      className="px-1.5 py-0.5 rounded-md"
                      style={{
                        fontSize: "0.5625rem",
                        background: "#ECFDF5",
                        color: "#0F766E",
                      }}
                    >
                      Connected
                    </span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                    {int.description}
                  </p>
                  {int.lastSync && (
                    <p
                      className="mt-0.5 flex items-center gap-1"
                      style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
                    >
                      <Clock size={9} /> Last synced {fmtRelative(int.lastSync)}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleSync(int.id)}
                    disabled={!!syncing}
                    className="p-2 rounded-lg hover:bg-[#F1F5F9] transition-colors disabled:opacity-50"
                    title="Sync now"
                  >
                    {syncing === int.id ? (
                      <Loader2
                        size={14}
                        className="animate-spin"
                        style={{ color: "#0F766E" }}
                      />
                    ) : (
                      <RefreshCw size={14} style={{ color: "#64748B" }} />
                    )}
                  </button>
                  <button
                    onClick={() => toggleConnect(int.id)}
                    className="px-3 py-1.5 rounded-lg border border-[#FEE2E2] hover:bg-[#FEF2F2] transition-colors"
                    style={{ fontSize: "0.75rem", color: "#B91C1C" }}
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available */}
      {available.length > 0 && (
        <div>
          <p
            className="mb-3 flex items-center gap-2"
            style={{ fontSize: "0.8125rem", color: "#0F172A" }}
          >
            <Link2Off size={14} style={{ color: "#94A3B8" }} />
            Available ({available.length})
          </p>
          <div className="space-y-3">
            {available.map((int) => (
              <div
                key={int.id}
                className="bg-white rounded-xl border border-[#E2E8F0] px-5 py-4 flex items-center gap-4 hover:shadow-sm transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "#F1F5F9", fontSize: "1.25rem" }}
                >
                  {int.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
                    {int.name}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                    {int.description}
                  </p>
                </div>
                <button
                  onClick={() => toggleConnect(int.id)}
                  disabled={!!syncing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0F766E] hover:bg-[#ECFDF5] transition-colors disabled:opacity-50 flex-shrink-0"
                  style={{ fontSize: "0.75rem", color: "#0F766E" }}
                >
                  {syncing === int.id ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Plus size={12} />
                  )}
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* API Key section */}
      <SectionCard title="API Access">
        <p className="mb-3" style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
          Use your API key to integrate Hart Agency data with external tools.
          Keep it secret.
        </p>
        <APIKeyField />
      </SectionCard>
    </div>
  );
}

function APIKeyField() {
  const [visible, setVisible] = useState(false);
  const key = "hart_live_sk_a3f8c2d1e7b94f6a0123456789abcdef";

  function handleCopy() {
    navigator.clipboard?.writeText(key).then(
      () => toast.success("API key copied to clipboard"),
      () => toast.error("Failed to copy — try selecting manually"),
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 relative">
        <input
          readOnly
          value={
            visible ? key : key.replace(/./g, "•").substring(0, 32) + "..."
          }
          className="w-full px-3 py-2 pr-9 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] font-mono outline-none"
          style={{ fontSize: "0.75rem", color: "#64748B" }}
        />
        <button
          onClick={() => setVisible(!visible)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2"
        >
          {visible ? (
            <EyeOff size={13} style={{ color: "#94A3B8" }} />
          ) : (
            <Eye size={13} style={{ color: "#94A3B8" }} />
          )}
        </button>
      </div>
      <button
        onClick={handleCopy}
        className="p-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors"
        title="Copy key"
      >
        <Copy size={14} style={{ color: "#64748B" }} />
      </button>
    </div>
  );
}

// =============================================================================
// Shared UI Primitives
// =============================================================================

function SectionCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
      {title && (
        <p className="mb-4" style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block mb-1.5"
        style={{
          fontSize: "0.6875rem",
          color: "#64748B",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#7D152D]"
      style={{ fontSize: "0.8125rem", color: "#0F172A" }}
    />
  );
}

function ToggleSwitch({
  checked,
  onChange,
  small,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  small?: boolean;
  label?: string;
}) {
  const w = small ? 32 : 40;
  const h = small ? 18 : 22;
  const dot = small ? 14 : 18;
  const pad = 2;
  return (
    <button
      onClick={() => onChange(!checked)}
      className="rounded-full transition-colors flex-shrink-0 relative"
      style={{
        width: w,
        height: h,
        background: checked ? "#0F766E" : "#CBD5E1",
      }}
      title={label}
      aria-label={label}
    >
      <span
        className="absolute rounded-full bg-white shadow-sm transition-all"
        style={{
          width: dot,
          height: dot,
          top: pad,
          left: checked ? w - dot - pad : pad,
        }}
      />
    </button>
  );
}

function Overlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function ConfirmDialog({
  title,
  description,
  confirmLabel,
  onConfirm,
  onCancel,
}: {
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)" }}
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#FEF2F2" }}
          >
            <AlertTriangle size={18} style={{ color: "#B91C1C" }} />
          </div>
          <div>
            <p style={{ fontSize: "0.9375rem", color: "#0F172A" }}>{title}</p>
            <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors"
            style={{ fontSize: "0.8125rem", color: "#64748B" }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
            style={{ background: "#B91C1C", fontSize: "0.8125rem" }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
