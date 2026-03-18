import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Camera,
  Pencil,
  Check,
  Mail,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { Input } from "@/app/shared/components/ui/input";
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
import { Button } from "@/app/shared/components/ui/button";
import { Label } from "@/app/shared/components/ui/label";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/shared/components/ui/avatar";
import { Badge } from "@/app/shared/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/shared/components/ui/tabs";
import {
  CURRENT_OPS_ADMIN,
  TEAM_MEMBERS,
  type OpsAdminProfile,
  type OpsTeamMember,
} from "./settings-data";

// ---------------------------------------------------------------------------
// Password rules
// ---------------------------------------------------------------------------

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "1 uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "1 number", test: (v: string) => /[0-9]/.test(v) },
  { label: "1 special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

// ---------------------------------------------------------------------------
// Password strength helper
// ---------------------------------------------------------------------------

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
// Main component
// ---------------------------------------------------------------------------

export function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab =
    searchParams.get("tab") === "team" ? "team" : "account";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync tab state when searchParams change
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "team" || tabParam === "account") {
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
          Manage your account, team members, and security preferences.
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="account">
            <User className="w-4 h-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="w-4 h-4" />
            Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountTab />
        </TabsContent>

        <TabsContent value="team">
          <TeamTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// =============================================================================
// Account Tab
// =============================================================================

function AccountTab() {
  const [profile, setProfile] = useState<OpsAdminProfile>({
    ...CURRENT_OPS_ADMIN,
  });
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
    setProfile({ ...CURRENT_OPS_ADMIN });
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
                <p className="text-foreground font-medium" style={{ fontSize: "1.0625rem" }}>
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
              <p className="mt-0.5" style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                {profile.phone}
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
        <CardContent className="px-5 pb-5">
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
              <p className="text-xs text-destructive">
                Passwords do not match
              </p>
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
// Team Tab
// =============================================================================

function TeamTab() {
  const [members] = useState<OpsTeamMember[]>([...TEAM_MEMBERS]);

  return (
    <div className="space-y-6 pt-4">
      {/* Team Management */}
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
                  Invite and manage Hart Ops administrators
                </CardDescription>
              </div>
            </div>
            <Button size="sm" className="cursor-pointer">
              <Mail className="w-3.5 h-3.5" />
              Invite Member
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="divide-y divide-border">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="size-9">
                    <AvatarFallback
                      className="text-xs"
                      style={{
                        backgroundColor:
                          member.role === "Super Admin" ? "#7D152D" : "#E2E8F0",
                        color:
                          member.role === "Super Admin" ? "#FFFFFF" : "#64748B",
                      }}
                    >
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p
                      className="text-foreground truncate"
                      style={{ fontSize: "0.875rem", fontWeight: 500 }}
                    >
                      {member.name}
                    </p>
                    <p
                      className="text-muted-foreground truncate"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant="secondary"
                    className={
                      member.status === "Active"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }
                    style={{ fontSize: "0.6875rem" }}
                  >
                    {member.status}
                  </Badge>
                  <Badge variant="outline" style={{ fontSize: "0.6875rem" }}>
                    <Shield className="size-3 mr-0.5" />
                    {member.role}
                  </Badge>
                  {member.role !== "Super Admin" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-destructive cursor-pointer"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
