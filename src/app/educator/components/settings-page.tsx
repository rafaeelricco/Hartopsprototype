import { useState } from "react";
import { useNavigate } from "react-router";
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
  Save,
  Camera,
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
      "Navigate to Events \u2192 click the event \u2192 in the Pre-Event view, click \u2018Assign Educator\u2019. Select an educator from your roster, review their availability, then confirm the assignment.",
  },
  {
    question: "What happens when I finalize an event?",
    answer:
      "Finalization locks the event record permanently for all actors (you, the educator, and Trial Client Staff). It also terminates the educator\u2019s 24-hour post-event editing window immediately. This action is irreversible.",
  },
  {
    question: "Can I undo event finalization?",
    answer:
      "No. Event finalization is irreversible in the current version. Please review all event data carefully before clicking \u2018Approve & Finalize\u2019.",
  },
  {
    question: "Why can\u2019t I see all educators or events?",
    answer:
      "Your dashboard and data views are scoped to your assigned educators and events only. This is by design to keep your view focused. If you believe you\u2019re missing data, contact your Hart Ops administrator.",
  },
  {
    question: "How do I contact an educator?",
    answer:
      "Go to Educators \u2192 click the educator \u2192 use the email or phone contact links. These will open your email client or phone dialer directly.",
  },
  {
    question: "What does the \u2018Events Requiring Attention\u2019 card mean?",
    answer:
      "This shows events that need your action \u2014 either unstaffed events (no educator assigned) or completed events awaiting your finalization review.",
  },
];

const INITIAL_PROFILE = {
  firstName: "Maria",
  lastName: "Lopez",
  email: "maria@hartagency.com",
  phone: "(555) 123-4567",
  avatarUrl: "/avatars/maria-lopez.jpg",
};

// ---------------------------------------------------------------------------
// Password strength helper
// ---------------------------------------------------------------------------

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters", met: password.length >= 8 },
    { label: "Uppercase", met: /[A-Z]/.test(password) },
    { label: "Number", met: /[0-9]/.test(password) },
    { label: "Special char", met: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.met).length;
  const barColor =
    score <= 1
      ? "bg-red-500"
      : score === 2
        ? "bg-amber-500"
        : score === 3
          ? "bg-emerald-400"
          : "bg-emerald-500";
  const labelColor =
    score <= 1
      ? "text-red-600"
      : score === 2
        ? "text-amber-600"
        : "text-emerald-600";
  const labels = ["Weak", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="space-y-2 pt-1">
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < score ? barColor : "bg-muted"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${labelColor}`}>{labels[score]}</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
        {checks.map((c) => (
          <p
            key={c.label}
            className={`text-xs ${c.met ? "text-emerald-600" : "text-muted-foreground"}`}
          >
            {c.met ? "\u2713" : "\u2022"} {c.label}
          </p>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function SettingsPage() {
  const navigate = useNavigate();

  // Profile state
  const [profile, setProfile] = useState({ ...INITIAL_PROFILE });
  const [saving, setSaving] = useState(false);

  // Password modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Notification state
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
    useState(true);
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(
      notificationCategories.map((c) => [c.id, c.defaultEnabled]),
    ),
  );

  // FAQ state
  const [faqSearch, setFaqSearch] = useState("");

  // Handlers
  const handleToggle = (id: string) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveProfile = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Profile updated successfully");
    }, 900);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const checks = [
      newPassword.length >= 8,
      /[A-Z]/.test(newPassword),
      /[0-9]/.test(newPassword),
      /[^A-Za-z0-9]/.test(newPassword),
    ];
    if (!checks.every(Boolean)) {
      toast.error("Password does not meet all requirements");
      return;
    }
    setSavingPassword(true);
    setTimeout(() => {
      setSavingPassword(false);
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated successfully");
    }, 900);
  };

  const filteredFaqs = faqItems.filter(
    (faq) =>
      !faqSearch ||
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase()),
  );

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

      {/* ================================================================= */}
      {/* Account & Profile (mm-ui-005)                                     */}
      {/* ================================================================= */}
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">Account</CardTitle>
              <CardDescription className="text-xs">
                Manage your profile information
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-4">
          {/* Avatar row */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Avatar className="size-16 rounded-xl">
                <AvatarImage
                  src={profile.avatarUrl}
                  className="rounded-xl"
                />
                <AvatarFallback className="rounded-xl text-lg">
                  ML
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {profile.firstName} {profile.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{profile.email}</p>
            </div>
          </div>

          <Separator />

          {/* Form fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">First Name</Label>
              <Input
                value={profile.firstName}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, firstName: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Last Name</Label>
              <Input
                value={profile.lastName}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, lastName: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Email Address</Label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile((p) => ({ ...p, email: e.target.value }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Phone Number</Label>
            <Input
              type="tel"
              value={profile.phone}
              onChange={(e) =>
                setProfile((p) => ({ ...p, phone: e.target.value }))
              }
            />
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPasswordModal(true)}
              className="cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              Change Password
            </Button>
            <Button
              onClick={handleSaveProfile}
              disabled={saving}
              className="cursor-pointer"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================= */}
      {/* Notification Preferences (mm-ui-004)                              */}
      {/* ================================================================= */}
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

      {/* ================================================================= */}
      {/* Help & Support (mm-ui-004)                                        */}
      {/* ================================================================= */}
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

      {/* ================================================================= */}
      {/* Logout (mm-ui-004)                                                */}
      {/* ================================================================= */}
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

      {/* ================================================================= */}
      {/* Change Password Modal (mm-ui-005)                                 */}
      {/* ================================================================= */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Current Password</Label>
              <div className="relative">
                <Input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
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

            <div className="space-y-1.5">
              <Label className="text-xs">New Password</Label>
              <div className="relative">
                <Input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {showNew ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {newPassword.length > 0 && (
                <PasswordStrength password={newPassword} />
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Confirm New Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
              />
              {confirmPassword.length > 0 &&
                newPassword !== confirmPassword && (
                  <p className="text-xs text-red-600">
                    Passwords do not match
                  </p>
                )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  savingPassword || !currentPassword || !newPassword || !confirmPassword
                }
                className="cursor-pointer"
              >
                {savingPassword ? (
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
    </div>
  );
}
