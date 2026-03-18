import { useState } from "react";
import {
  Bell,
  CalendarPlus,
  AlertTriangle,
  Clock,
  XCircle,
  CheckSquare,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/app/shared/components/ui/input";

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
    title: "New Events Assigned",
    description:
      "Get notified when Trial Client Staff assigns new events to your scope.",
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
    description:
      "Notified when an assigned event starts in 1 hour.",
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

export function SettingsPage() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(
      notificationCategories.map((c) => [c.id, c.defaultEnabled]),
    ),
  );
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
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
    <div className="p-6 space-y-8 max-w-3xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p
          className="text-muted-foreground mt-1"
          style={{ fontSize: "0.875rem" }}
        >
          Manage your notification preferences and access help resources.
        </p>
      </div>

      {/* Notification Preferences */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            Notification Preferences
          </h2>
        </div>
        <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
          Control which notifications you receive. All are enabled by default.
        </p>
        <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
          {notificationCategories.map((category) => {
            const Icon = category.icon;
            const isEnabled = toggles[category.id];
            return (
              <div
                key={category.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium" style={{ fontSize: "0.875rem" }}>
                      {category.title}
                    </p>
                    <p
                      className="text-muted-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {category.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(category.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    isEnabled ? "bg-primary" : "bg-muted"
                  }`}
                  role="switch"
                  aria-checked={isEnabled}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                      isEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Help & Support */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            Help & Support
          </h2>
        </div>

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
        <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
          {filteredFaqs.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No FAQs match your search.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div key={idx}>
                  <button
                    onClick={() =>
                      setExpandedFaq(isExpanded ? null : idx)
                    }
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <span className="text-foreground font-medium pr-4" style={{ fontSize: "0.875rem" }}>
                      {faq.question}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <p
                        className="text-muted-foreground"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Contact Support */}
        <a
          href="mailto:support@hartagency.com"
          className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-muted/50 transition-all group"
        >
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <ExternalLink className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-foreground font-medium group-hover:text-primary transition-colors" style={{ fontSize: "0.875rem" }}>
              Contact Support
            </p>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "0.8125rem" }}
            >
              Can't find an answer? Reach out to the support team.
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
