// =============================================================================
// Settings — Hart Agency Operating Staff dashboard.
// 6 tabs: Profile, Notifications, Team, Geography, Preferences, Integrations.
// Follows the educator settings-page pattern (Shadcn UI components).
// =============================================================================

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import {
  User,
  Bell,
  Users,
  SlidersHorizontal,
  Puzzle,
  Pencil,
  Trash2,
  Plus,
  Search,
  Check,
  Shield,
  Smartphone,
  Copy,
  Eye,
  EyeOff,
  Camera,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Link2,
  Link2Off,
  Lock,
  Clock,
  CalendarDays,
  LayoutDashboard,
  LayoutGrid,
  CheckCircle2,
  Cloud,
  Cpu,
  MessageSquare,
  Zap,
  Table,
  MapPin,
} from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import { Label } from "@/app/shared/components/ui/label";
import { Switch } from "@/app/shared/components/ui/switch";
import { Separator } from "@/app/shared/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/shared/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/shared/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/shared/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/shared/components/ui/tabs";
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
  INITIAL_REGIONS,
  type GeoRegion,
} from "./settings-data";

// ---------------------------------------------------------------------------
// Lucide icon map for integrations
// ---------------------------------------------------------------------------

const INTEGRATION_ICONS: Record<string, React.ElementType> = {
  smartphone: Smartphone,
  cpu: Cpu,
  cloud: Cloud,
  table: Table,
  "message-square": MessageSquare,
  zap: Zap,
};

function IntegrationIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = INTEGRATION_ICONS[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

// ---------------------------------------------------------------------------
// Password rules & strength
// ---------------------------------------------------------------------------

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "1 uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "1 number", test: (v: string) => /[0-9]/.test(v) },
  { label: "1 special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

function PasswordStrength({ password }: { password: string }) {
  const score = PASSWORD_RULES.filter((r) => r.test(password)).length;
  const colors = ["#B91C1C", "#D97706", "#0F766E", "#0F766E"];
  const labels = ["Weak", "Fair", "Good", "Strong"];

  return (
    <div className="space-y-2 pt-1">
      <div className="flex items-center gap-2">
        <div className="flex gap-1 flex-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-colors"
              style={{
                background: i < score ? colors[score - 1] : "#E2E8F0",
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontSize: "0.625rem",
            color: colors[score - 1] ?? "#94A3B8",
          }}
        >
          {labels[score - 1] ?? "Too short"}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-1">
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
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

// =============================================================================
// Main
// =============================================================================

type SettingsTab =
  | "profile"
  | "notifications"
  | "team"
  | "geography"
  | "preferences"
  | "integrations";

const VALID_TABS: SettingsTab[] = [
  "profile",
  "notifications",
  "team",
  "geography",
  "preferences",
  "integrations",
];

export function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramTab = searchParams.get("tab") as SettingsTab | null;
  const initialTab =
    paramTab && VALID_TABS.includes(paramTab) ? paramTab : "profile";
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get("tab") as SettingsTab | null;
    if (tabParam && VALID_TABS.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value }, { replace: true });
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account, team, and application preferences.
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="profile">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="w-4 h-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="geography">
            <MapPin className="w-4 h-4" />
            Geography
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <SlidersHorizontal className="w-4 h-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Puzzle className="w-4 h-4" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
        <TabsContent value="team">
          <TeamTab />
        </TabsContent>
        <TabsContent value="geography">
          <GeographyTab />
        </TabsContent>
        <TabsContent value="preferences">
          <PreferencesTab />
        </TabsContent>
        <TabsContent value="integrations">
          <IntegrationsTab />
        </TabsContent>
      </Tabs>
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

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setEditing(false);
      toast.success("Profile updated successfully");
    }, 900);
  };

  const handleCancel = () => {
    setProfile({ ...CURRENT_USER });
    setEditing(false);
  };

  return (
    <div className="space-y-6 pt-4">
      {/* Profile Card — read-only view */}
      <Card className="gap-0">
        <CardContent className="px-5 py-5">
          <div className="flex items-start gap-4">
            {/* Avatar with camera overlay */}
            <div className="relative group flex-shrink-0">
              <Avatar className="size-20 rounded-xl">
                <AvatarImage
                  src={profile.avatarUrl}
                  className="rounded-xl object-cover"
                />
                <AvatarFallback className="rounded-xl text-lg">
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() =>
                  toast.info(
                    "Avatar upload is simulated — no file will be stored.",
                  )
                }
                className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p
                  className="text-foreground font-medium"
                  style={{ fontSize: "1.0625rem" }}
                >
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

            {/* Edit button */}
            {!editing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(true)}
                className="flex-shrink-0 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Form — shown when editing */}
      {editing && (
        <Card className="gap-0">
          <CardHeader className="px-5 pt-5 pb-4">
            <CardTitle className="text-sm font-medium">Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  First Name
                </Label>
                <Input
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, firstName: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Last Name
                </Label>
                <Input
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Email Address
              </Label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, email: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Phone Number
              </Label>
              <Input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Timezone</Label>
              <select
                value={profile.timezone}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, timezone: e.target.value }))
                }
                className="w-full h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Save / Cancel */}
            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="cursor-pointer"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security */}
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium">Security</CardTitle>
              <CardDescription className="text-xs">
                Manage your password and account security.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Password</p>
              <p className="text-xs text-muted-foreground">
                Last changed 45 days ago
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPasswordModal(true)}
              className="cursor-pointer"
            >
              Change Password
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                <Shield className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-foreground">
                  Two-factor authentication
                </p>
                <p className="text-xs text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <Switch
              checked={false}
              onCheckedChange={() =>
                toast.info("2FA setup is simulated in this demo.")
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="gap-0">
        <CardContent className="px-5 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-destructive">
                Delete account
              </p>
              <p className="text-xs text-muted-foreground">
                Permanently remove your account and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                toast.error("Account deletion is disabled in this demo.")
              }
              className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
            >
              Delete account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password Modal */}
      <ChangePasswordModal
        open={showPasswordModal}
        onOpenChange={setShowPasswordModal}
      />
    </div>
  );
}

// =============================================================================
// Change Password Modal
// =============================================================================

function ChangePasswordModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [saving, setSaving] = useState(false);

  const resetFields = () => {
    setCurrent("");
    setNext("");
    setConfirm("");
    setShowCurrent(false);
    setShowNext(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!current) {
      toast.error("Current password is required.");
      return;
    }

    const failedRules = PASSWORD_RULES.filter((r) => !r.test(next));
    if (!next) {
      toast.error("New password is required.");
      return;
    }
    if (failedRules.length > 0) {
      toast.error("Password does not meet all requirements.");
      return;
    }

    if (!confirm) {
      toast.error("Please confirm your new password.");
      return;
    }
    if (next !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      resetFields();
      onOpenChange(false);
      toast.success("Password changed successfully");
    }, 1000);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) resetFields();
        onOpenChange(value);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and choose a new one.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current password */}
          <div className="space-y-1.5">
            <Label className="text-xs">Current Password</Label>
            <div className="relative">
              <Input
                type={showCurrent ? "text" : "password"}
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="Enter current password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {showCurrent ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* New password */}
          <div className="space-y-1.5">
            <Label className="text-xs">New Password</Label>
            <div className="relative">
              <Input
                type={showNext ? "text" : "password"}
                value={next}
                onChange={(e) => setNext(e.target.value)}
                placeholder="Min. 8 characters"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNext((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {showNext ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {next.length > 0 && <PasswordStrength password={next} />}
          </div>

          {/* Confirm new password */}
          <div className="space-y-1.5">
            <Label className="text-xs">Confirm New Password</Label>
            <Input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter new password"
            />
            {confirm.length > 0 && next !== confirm && (
              <p className="text-xs text-destructive">Passwords do not match</p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving || !current || !next || !confirm}
              className="cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
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
    <div className="space-y-6 pt-4">
      {/* Channel legend */}
      {/* <div className="flex items-center gap-6">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Mail className="w-3 h-3" /> Email
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Smartphone className="w-3 h-3" /> Push
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MonitorSmartphone className="w-3 h-3" /> In-App
        </span>
      </div> */}

      {grouped.map(([category, items]) => (
        <Card key={category} className="gap-0">
          <CardHeader className="px-5 pt-5 pb-4">
            <CardTitle className="text-sm font-semibold">{category}</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="divide-y divide-border">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex flex-col items-center gap-1">
                      <Switch
                        checked={item.email}
                        onCheckedChange={() => toggle(item.id, "email")}
                      />
                      <span className="text-[0.5625rem] text-muted-foreground">
                        Email
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Switch
                        checked={item.push}
                        onCheckedChange={() => toggle(item.id, "push")}
                      />
                      <span className="text-[0.5625rem] text-muted-foreground">
                        Push
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Switch
                        checked={item.inApp}
                        onCheckedChange={() => toggle(item.id, "inApp")}
                      />
                      <span className="text-[0.5625rem] text-muted-foreground">
                        In-App
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="cursor-pointer"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          {saving ? "Saving..." : "Save Preferences"}
        </Button>
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

  function handleInvite(email: string, role: TeamRole) {
    const initials = email.substring(0, 2).toUpperCase();
    const newMember: TeamMember = {
      id: "tm-new-" + Date.now(),
      name: email.split("@")[0] ?? email,
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

  const STATUS_STYLE: Record<string, { className: string; label: string }> = {
    active: {
      className: "bg-green-50 text-green-700 border-green-200",
      label: "Active",
    },
    invited: {
      className: "bg-blue-50 text-blue-700 border-blue-200",
      label: "Invited",
    },
    deactivated: {
      className: "bg-muted text-muted-foreground",
      label: "Deactivated",
    },
  };

  return (
    <div className="space-y-6 pt-4">
      {/* Toolbar */}
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">Team</CardTitle>
                <CardDescription className="text-xs">
                  Invite and manage team members
                </CardDescription>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => setShowInvite(true)}
              className="cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Invite Member
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-4">
          {/* Search & filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="pl-9"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="all">All Roles</option>
              {TEAM_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <p className="text-xs text-muted-foreground">
            {filtered.length} member{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Members list */}
          <div className="divide-y divide-border">
            {filtered.map((m) => {
              const st = STATUS_STYLE[m.status] ?? STATUS_STYLE["active"];
              return (
                <div
                  key={m.id}
                  className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="size-9">
                      <AvatarFallback
                        className="text-xs text-white"
                        style={{ backgroundColor: m.color }}
                      >
                        {m.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {m.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {m.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={m.role}
                      onChange={(e) =>
                        handleRoleChange(m.id, e.target.value as TeamRole)
                      }
                      disabled={m.email === CURRENT_USER.email}
                      className="h-7 px-2 rounded-md border border-input bg-transparent text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
                    >
                      {TEAM_ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[0.6875rem] border ${st!.className}`}
                    >
                      {st!.label}
                    </span>
                    <span className="text-xs text-muted-foreground w-14 text-right">
                      {m.lastActive ? fmtRelative(m.lastActive) : "—"}
                    </span>
                    {m.email !== CURRENT_USER.email && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setRemovingId(m.id)}
                        className="size-8 text-muted-foreground hover:text-destructive cursor-pointer"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Invite modal */}
      <InviteModal
        open={showInvite}
        onOpenChange={setShowInvite}
        onInvite={handleInvite}
      />

      {/* Remove confirm */}
      <ConfirmRemoveDialog
        open={!!removingId}
        memberName={members.find((m) => m.id === removingId)?.name ?? ""}
        onConfirm={() => removingId && handleRemove(removingId)}
        onCancel={() => setRemovingId(null)}
      />
    </div>
  );
}

function InviteModal({
  open,
  onOpenChange,
  onInvite,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvite: (email: string, role: TeamRole) => void;
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
    setEmail("");
    setRole("Field Educator");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            An invitation email will be sent. The member can sign in after
            accepting.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Email address
            </Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="colleague@company.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Role</Label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as TeamRole)}
              className="w-full h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {TEAM_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer">
              Send Invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ConfirmRemoveDialog({
  open,
  memberName,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  memberName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Remove team member?</DialogTitle>
              <DialogDescription>
                "{memberName}" will lose access to this workspace.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onCancel}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="cursor-pointer"
          >
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// =============================================================================
// 3b. Geography Tab
// =============================================================================

const REGION_COLOR_PRESETS = [
  "#7D152D",
  "#2563EB",
  "#7C3AED",
  "#D97706",
  "#0F766E",
  "#E11D48",
  "#4F46E5",
  "#059669",
];

function GeographyTab() {
  const [regions, setRegions] = useState<GeoRegion[]>([...INITIAL_REGIONS]);
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const groups = useMemo(() => {
    const set = new Set<string>();
    regions.forEach((r) => {
      if (r.parentGroup) set.add(r.parentGroup);
    });
    return Array.from(set).sort();
  }, [regions]);

  const filtered = useMemo(() => {
    let result = regions;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description ?? "").toLowerCase().includes(q),
      );
    }
    if (groupFilter === "ungrouped") {
      result = result.filter((r) => !r.parentGroup);
    } else if (groupFilter !== "all") {
      result = result.filter((r) => r.parentGroup === groupFilter);
    }
    return result;
  }, [regions, search, groupFilter]);

  function handleAdd(region: Omit<GeoRegion, "id">) {
    const newRegion: GeoRegion = {
      ...region,
      id: "reg-new-" + Date.now(),
    };
    setRegions((prev) => [...prev, newRegion]);
    setShowAddDialog(false);
    toast.success("Region added");
  }

  function handleUpdate(updated: GeoRegion) {
    setRegions((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setEditingId(null);
    toast.success("Region updated");
  }

  function handleRemove(id: string) {
    setRegions((prev) => prev.filter((r) => r.id !== id));
    setRemovingId(null);
    toast.success("Region removed");
  }

  function handleToggleActive(id: string) {
    setRegions((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)),
    );
  }

  return (
    <div className="space-y-6 pt-4">
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">
                  Regions & Territories
                </CardTitle>
                <CardDescription className="text-xs">
                  Define the geographic areas your organization uses for event
                  assignment and filtering.
                </CardDescription>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => setShowAddDialog(true)}
              className="cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Region
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-4">
          {/* Search & group filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search regions..."
                className="pl-9"
              />
            </div>
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="all">All Groups</option>
              {groups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
              <option value="ungrouped">Ungrouped</option>
            </select>
          </div>

          <p className="text-xs text-muted-foreground">
            {filtered.length} region{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Region list */}
          <div className="divide-y divide-border">
            {filtered.map((region) => (
              <div
                key={region.id}
                className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: region.color }}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {region.name}
                    </p>
                    {region.description && (
                      <p className="text-xs text-muted-foreground truncate">
                        {region.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {region.parentGroup && (
                    <span className="px-2 py-0.5 rounded-md text-[0.6875rem] border bg-muted text-muted-foreground">
                      {region.parentGroup}
                    </span>
                  )}
                  <Switch
                    checked={region.isActive}
                    onCheckedChange={() => handleToggleActive(region.id)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingId(region.id)}
                    className="size-8 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setRemovingId(region.id)}
                    className="size-8 text-muted-foreground hover:text-destructive cursor-pointer"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground py-6 text-center">
                No regions found.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add dialog */}
      <RegionFormDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        groups={groups}
        onSubmit={(data) => handleAdd(data)}
        title="Add Region"
        description="Create a new geographic region for your organization."
      />

      {/* Edit dialog */}
      <RegionFormDialog
        open={!!editingId}
        onOpenChange={(v) => !v && setEditingId(null)}
        groups={groups}
        region={regions.find((r) => r.id === editingId) ?? undefined}
        onSubmit={(data) => {
          if (editingId) handleUpdate({ ...data, id: editingId } as GeoRegion);
        }}
        title="Edit Region"
        description="Update the region details."
      />

      {/* Remove confirm */}
      <Dialog
        open={!!removingId}
        onOpenChange={(v) => !v && setRemovingId(null)}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <DialogTitle>Remove region?</DialogTitle>
                <DialogDescription>
                  "{regions.find((r) => r.id === removingId)?.name}" will be
                  removed. Events tagged with this region will become untagged.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRemovingId(null)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => removingId && handleRemove(removingId)}
              className="cursor-pointer"
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function RegionFormDialog({
  open,
  onOpenChange,
  groups,
  region,
  onSubmit,
  title,
  description,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: string[];
  region?: GeoRegion;
  onSubmit: (data: Omit<GeoRegion, "id">) => void;
  title: string;
  description: string;
}) {
  const [name, setName] = useState("");
  const [groupMode, setGroupMode] = useState<"existing" | "new">("existing");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [newGroup, setNewGroup] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState(REGION_COLOR_PRESETS[0]!);

  useEffect(() => {
    if (open && region) {
      setName(region.name);
      setDesc(region.description ?? "");
      setColor(region.color);
      if (region.parentGroup && groups.includes(region.parentGroup)) {
        setGroupMode("existing");
        setSelectedGroup(region.parentGroup);
      } else if (region.parentGroup) {
        setGroupMode("new");
        setNewGroup(region.parentGroup);
      } else {
        setGroupMode("existing");
        setSelectedGroup("");
      }
    } else if (open) {
      setName("");
      setDesc("");
      setColor(REGION_COLOR_PRESETS[0]!);
      setGroupMode("existing");
      setSelectedGroup("");
      setNewGroup("");
    }
  }, [open, region, groups]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Region name is required.");
      return;
    }
    const parentGroup =
      groupMode === "new"
        ? newGroup.trim() || undefined
        : selectedGroup || undefined;

    onSubmit({
      name: name.trim(),
      parentGroup,
      color,
      description: desc.trim() || undefined,
      isActive: region?.isActive ?? true,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Region Name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Manhattan, Lower Florida"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Group</Label>
            <select
              value={groupMode === "new" ? "__new__" : selectedGroup}
              onChange={(e) => {
                if (e.target.value === "__new__") {
                  setGroupMode("new");
                } else {
                  setGroupMode("existing");
                  setSelectedGroup(e.target.value);
                }
              }}
              className="w-full h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">No Group (ungrouped)</option>
              {groups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
              <option value="__new__">+ New Group...</option>
            </select>
            {groupMode === "new" && (
              <Input
                value={newGroup}
                onChange={(e) => setNewGroup(e.target.value)}
                placeholder="e.g. NYC Boroughs"
                className="mt-1.5"
              />
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Description (optional)
            </Label>
            <Input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="e.g. Midtown, Downtown, Upper East/West Side"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Color</Label>
            <div className="flex items-center gap-2">
              {REGION_COLOR_PRESETS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className="w-7 h-7 rounded-full border-2 transition-all cursor-pointer"
                  style={{
                    backgroundColor: c,
                    borderColor: color === c ? "#1E293B" : "transparent",
                    transform: color === c ? "scale(1.15)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer">
              {region ? "Save Changes" : "Add Region"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
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
    <div className="space-y-6 pt-4">
      {/* Dashboard defaults */}
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">Dashboard</CardTitle>
              <CardDescription className="text-xs">
                Default dashboard timeframe and layout preferences.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Default timeframe</p>
              <p className="text-xs text-muted-foreground">
                Initial timeframe filter when you open the dashboard
              </p>
            </div>
            <select
              value={dashDefault}
              onChange={(e) => setDashDefault(e.target.value)}
              className="h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {DASHBOARD_DEFAULTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Display */}
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <LayoutGrid className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">Display</CardTitle>
              <CardDescription className="text-xs">
                Customize how data is displayed across the application.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-foreground">Date format</p>
                <p className="text-xs text-muted-foreground">
                  How dates are displayed across the application
                </p>
              </div>
            </div>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {DATE_FORMATS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                <LayoutGrid className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-foreground">Product Library view</p>
                <p className="text-xs text-muted-foreground">
                  Default view mode for the Brand Assets product library
                </p>
              </div>
            </div>
            <div className="inline-flex rounded-md border border-input overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setProductView("grid")}
                className={`rounded-none h-8 cursor-pointer ${
                  productView === "grid"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : ""
                }`}
              >
                Grid
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setProductView("list")}
                className={`rounded-none h-8 cursor-pointer ${
                  productView === "list"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : ""
                }`}
              >
                List
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-foreground">Compact mode</p>
                <p className="text-xs text-muted-foreground">
                  Reduce spacing and padding for denser layouts
                </p>
              </div>
            </div>
            <Switch checked={compactMode} onCheckedChange={setCompactMode} />
          </div>
        </CardContent>
      </Card>

      {/* Behavior */}
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">Behavior</CardTitle>
              <CardDescription className="text-xs">
                Application behavior and auto-save settings.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Auto-save drafts</p>
              <p className="text-xs text-muted-foreground">
                Automatically save event and campaign drafts as you edit
              </p>
            </div>
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="cursor-pointer"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          {saving ? "Saving..." : "Save Preferences"}
        </Button>
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
    <div className="space-y-6 pt-4">
      {/* Connected */}
      {connected.length > 0 && (
        <Card className="gap-0">
          <CardHeader className="px-5 pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                <Link2 className="w-4 h-4 text-green-700" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">
                  Connected ({connected.length})
                </CardTitle>
                <CardDescription className="text-xs">
                  Active integrations syncing with your workspace.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="divide-y divide-border">
              {connected.map((int) => (
                <div
                  key={int.id}
                  className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <IntegrationIcon
                      name={int.iconName}
                      className="w-5 h-5 text-green-700"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium text-foreground">
                        {int.name}
                      </p>
                      <span className="px-1.5 py-0.5 rounded-md text-[0.5625rem] bg-green-50 text-green-700">
                        Connected
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {int.description}
                    </p>
                    {int.lastSync && (
                      <p className="mt-0.5 flex items-center gap-1 text-[0.6875rem] text-muted-foreground">
                        <Clock className="w-2.5 h-2.5" /> Last synced{" "}
                        {fmtRelative(int.lastSync)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSync(int.id)}
                      disabled={!!syncing}
                      className="size-8 cursor-pointer"
                      title="Sync now"
                    >
                      {syncing === int.id ? (
                        <Loader2 className="w-4 h-4 animate-spin text-green-700" />
                      ) : (
                        <RefreshCw className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleConnect(int.id)}
                      className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available */}
      {available.length > 0 && (
        <Card className="gap-0">
          <CardHeader className="px-5 pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                <Link2Off className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">
                  Available ({available.length})
                </CardTitle>
                <CardDescription className="text-xs">
                  Integrations ready to connect.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="divide-y divide-border">
              {available.map((int) => (
                <div
                  key={int.id}
                  className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <IntegrationIcon
                      name={int.iconName}
                      className="w-5 h-5 text-muted-foreground"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {int.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {int.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleConnect(int.id)}
                    disabled={!!syncing}
                    className="cursor-pointer"
                  >
                    {syncing === int.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Key section */}
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">
                API Access
              </CardTitle>
              <CardDescription className="text-xs">
                Use your API key to integrate Hart Agency data with external
                tools. Keep it secret.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <APIKeyField />
        </CardContent>
      </Card>
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
        <Input
          readOnly
          value={
            visible ? key : key.replace(/./g, "•").substring(0, 32) + "..."
          }
          className="pr-10 font-mono bg-muted"
        />
        <button
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          {visible ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={handleCopy}
        className="size-9 cursor-pointer"
        title="Copy key"
      >
        <Copy className="w-4 h-4" />
      </Button>
    </div>
  );
}
