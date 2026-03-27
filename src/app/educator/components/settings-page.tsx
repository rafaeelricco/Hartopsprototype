import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import {
  Bell,
  CalendarPlus,
  AlertTriangle,
  Clock,
  XCircle,
  CheckSquare,
  HelpCircle,
  Search,
  Mail,
  Phone,
  User,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Loader2,
  Camera,
  Pencil,
  Check,
} from "lucide-react";
import { Input } from "@/app/shared/components/ui/input";
import { Switch } from "@/app/shared/components/ui/switch";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/shared/components/ui/accordion";
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
import { Separator } from "@/app/shared/components/ui/separator";
import { Button } from "@/app/shared/components/ui/button";
import { Label } from "@/app/shared/components/ui/label";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/shared/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/shared/components/ui/tabs";
import {
  CURRENT_EDUCATOR_MANAGER,
  type EducatorManagerProfile,
} from "./settings-data";

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

interface NotificationCategory {
  id: string;
  title: string;
  description: string;
  icon: typeof Bell;
  defaultEnabled: boolean;
}

const notificationCategories: NotificationCategory[] = [
  {
    id: "new-events",
    title: "New Events Available",
    description:
      "Notified when Trial Client Staff creates an event within your geographic scope.",
    icon: CalendarPlus,
    defaultEnabled: true,
  },
  {
    id: "unstaffed-warning",
    title: "Unstaffed Events Warning",
    description:
      "Alert when an event is 7 days away with no educator assigned.",
    icon: AlertTriangle,
    defaultEnabled: true,
  },
  {
    id: "event-starting",
    title: "Event Starting Soon",
    description: "Notified when an assigned event starts in 1 hour.",
    icon: Clock,
    defaultEnabled: true,
  },
  {
    id: "failed-checkin",
    title: "Failed Educator Check-In",
    description:
      "Alert when an educator has not completed geolocated check-in by event start time.",
    icon: XCircle,
    defaultEnabled: true,
  },
  {
    id: "ready-review",
    title: "Event Ready for Review",
    description:
      "Notified when an event is completed and awaiting your finalization.",
    icon: CheckSquare,
    defaultEnabled: true,
  },
];

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "How do I assign an educator to an event?",
    answer:
      "Navigate to Events → click the event → in the Pre-Event view, click 'Assign Educator'. Select an educator from your roster, review their availability, then confirm the assignment.",
  },
  {
    question: "What happens when I finalize an event?",
    answer:
      "Finalization locks the event record permanently for all actors (you, the educator, and Trial Client Staff). It also terminates the educator's 24-hour post-event editing window immediately. This action is irreversible.",
  },
  {
    question: "Can I undo event finalization?",
    answer:
      "No. Event finalization is irreversible in the current version. Please review all event data carefully before clicking 'Approve & Finalize'.",
  },
  {
    question: "Why can't I see all educators or events?",
    answer:
      "Your dashboard and data views are scoped to your assigned educators and events only. This is by design to keep your view focused. If you believe you're missing data, contact your Hart Ops administrator.",
  },
  {
    question: "How do I contact an educator?",
    answer:
      "Go to Educators → click the educator → use the email or phone contact links. These will open your email client or phone dialer directly.",
  },
  {
    question: "What does the 'Events Requiring Attention' card mean?",
    answer:
      "This shows events that need your action — either unstaffed events (no educator assigned) or completed events awaiting your finalization review.",
  },
];

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
    searchParams.get("tab") === "notifications" ? "notifications" : "account";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync tab state when searchParams change (e.g. sidebar dropdown click)
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "notifications" || tabParam === "account") {
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
          Manage your account, notification preferences, and access help
          resources.
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="account">
            <User className="w-4 h-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4" />
            Notifications & Help
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountTab />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsHelpTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// =============================================================================
// Account Tab (mm-ui-005)
// =============================================================================

function AccountTab() {
  const [profile, setProfile] = useState<EducatorManagerProfile>({
    ...CURRENT_EDUCATOR_MANAGER,
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
    setProfile({ ...CURRENT_EDUCATOR_MANAGER });
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
// Notifications & Help Tab (mm-ui-004)
// =============================================================================

function NotificationsHelpTab() {
  const navigate = useNavigate();
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
    useState(true);
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(
      notificationCategories.map((c) => [c.id, c.defaultEnabled]),
    ),
  );
  const [faqSearch, setFaqSearch] = useState("");

  const handleToggle = (id: string) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = faqItems.filter(
    (faq) =>
      !faqSearch ||
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase()),
  );

  return (
    <div className="space-y-6 pt-4">
      {/* Notification Preferences */}
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bell className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">
                Notification Preferences
              </CardTitle>
              <CardDescription className="text-xs">
                Control which notifications you receive. All are enabled by
                default.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-4">
          {/* Global email notifications toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Enable Email Notifications
                </p>
                <p className="text-xs text-muted-foreground">
                  Also deliver notifications via email.
                </p>
              </div>
            </div>
            <Switch
              checked={emailNotificationsEnabled}
              onCheckedChange={setEmailNotificationsEnabled}
            />
          </div>

          <Separator />

          {/* Individual category toggles */}
          <div className="divide-y divide-border">
            {notificationCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {category.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={toggles[category.id] ?? false}
                    onCheckedChange={() => handleToggle(category.id)}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">
                Help & Support
              </CardTitle>
              <CardDescription className="text-xs">
                Frequently asked questions and contact information.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-4">
          {/* FAQ search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search FAQs..."
              className="pl-9"
            />
          </div>

          {/* FAQs */}
          {filteredFaqs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <HelpCircle className="w-8 h-8 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">
                No FAQs match your search.
              </p>
            </div>
          ) : (
            <Accordion
              type="single"
              collapsible
              className="rounded-lg border border-border overflow-hidden"
            >
              {filteredFaqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger className="px-4 text-sm font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-xs text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          <Separator />

          {/* Contact Support */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Contact Support
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="mailto:support@hartagency.com"
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/50 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Email
                  </p>
                  <p className="text-xs text-muted-foreground">
                    support@hartagency.com
                  </p>
                </div>
              </a>
              <a
                href="tel:+18005551234"
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/50 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Phone
                  </p>
                  <p className="text-xs text-muted-foreground">
                    (800) 555-1234
                  </p>
                </div>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logout */}
      <Separator />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Log Out</p>
          <p className="text-xs text-muted-foreground">
            End your session and return to the sign-in screen.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/educator")}
          className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
