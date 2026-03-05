import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../shared/components/ui/card";
import { Button } from "../../shared/components/ui/button";
import { Separator } from "../../shared/components/ui/separator";
import { Badge } from "../../shared/components/ui/badge";
import {
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  Video,
  Zap,
  Shield,
  Users,
  BarChart3,
} from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How do I add a new organization?",
    answer:
      'Navigate to the Organizations page from the sidebar and click the "Add Organization" button. Fill in the required details such as name, type, and contact information, then click Save.',
    category: "Organizations",
  },
  {
    id: 2,
    question: "How do I create and manage events?",
    answer:
      'Go to the Events page and click "Create Event". You can set the event name, date, location, and assign it to an organization. Once created, you can edit or cancel events from the event list.',
    category: "Events",
  },
  {
    id: 3,
    question: "How do I generate reports?",
    answer:
      "Visit the Reports page to access pre-built report templates. You can filter by date range, organization, and event type. Reports can be exported as PDF or CSV for offline use.",
    category: "Reports",
  },
  {
    id: 4,
    question: "How do I invite team members?",
    answer:
      'Go to Settings > Team and click "Invite Member". Enter their email address and assign a role. They\'ll receive an activation email to set up their account.',
    category: "Team",
  },
  {
    id: 5,
    question: "What user roles are available?",
    answer:
      "Hart Ops supports two roles: Super Admin (full access including team management and system settings) and Admin (can manage organizations, events, and reports but cannot modify system settings or invite users).",
    category: "Team",
  },
  {
    id: 6,
    question: "How do I reset my password?",
    answer:
      'Click "Forgot password?" on the sign-in page and enter your email. You\'ll receive a link to reset your password. The link expires after 24 hours for security.',
    category: "Account",
  },
];

const resources = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of Hart Ops in under 10 minutes",
    icon: Zap,
    type: "Guide",
  },
  {
    title: "Managing Organizations",
    description: "Create, edit, and organize your partner organizations",
    icon: Users,
    type: "Documentation",
  },
  {
    title: "Events & Scheduling",
    description: "Set up events and manage your calendar",
    icon: FileText,
    type: "Documentation",
  },
  {
    title: "Reports & Analytics",
    description: "Generate insights from your operational data",
    icon: BarChart3,
    type: "Documentation",
  },
  {
    title: "Security & Permissions",
    description: "Understand roles, access controls, and best practices",
    icon: Shield,
    type: "Guide",
  },
  {
    title: "Video Walkthrough",
    description: "Watch a full platform walkthrough with tips",
    icon: Video,
    type: "Video",
  },
];

export function HelpPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Page Header */}
      <div>
        <h1 className="text-foreground">Get Help</h1>
        <p
          className="text-muted-foreground mt-1"
          style={{ fontSize: "0.875rem" }}
        >
          Find answers, browse documentation, or reach out to our support team.
        </p>
      </div>

      {/* Contact & Support Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gap-0">
          <CardContent className="p-5 flex flex-col items-start gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-[#7D152D]/10">
              <MessageCircle className="size-5 text-[#7D152D]" />
            </div>
            <div>
              <p
                className="text-foreground"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                Live Chat
              </p>
              <p
                className="text-muted-foreground mt-0.5"
                style={{ fontSize: "0.8125rem" }}
              >
                Chat with our support team in real time.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-auto cursor-pointer"
              style={{ fontSize: "0.8125rem" }}
            >
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card className="gap-0">
          <CardContent className="p-5 flex flex-col items-start gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-[#7D152D]/10">
              <Mail className="size-5 text-[#7D152D]" />
            </div>
            <div>
              <p
                className="text-foreground"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                Email Support
              </p>
              <p
                className="text-muted-foreground mt-0.5"
                style={{ fontSize: "0.8125rem" }}
              >
                We typically respond within 24 hours.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-auto cursor-pointer"
              style={{ fontSize: "0.8125rem" }}
            >
              support@hartops.com
            </Button>
          </CardContent>
        </Card>

        <Card className="gap-0">
          <CardContent className="p-5 flex flex-col items-start gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-[#7D152D]/10">
              <Phone className="size-5 text-[#7D152D]" />
            </div>
            <div>
              <p
                className="text-foreground"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                Phone Support
              </p>
              <p
                className="text-muted-foreground mt-0.5"
                style={{ fontSize: "0.8125rem" }}
              >
                Mon–Fri, 9 AM – 6 PM EST
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-auto cursor-pointer"
              style={{ fontSize: "0.8125rem" }}
            >
              +1 (800) 555-0199
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQs */}
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-4">
          <CardTitle
            style={{
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Frequently Asked Questions
          </CardTitle>
          <CardDescription style={{ fontSize: "0.8125rem" }}>
            Quick answers to common questions about Hart Ops
          </CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={faq.id}>
                {index > 0 && <Separator />}
                <Button
                  variant="ghost"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between gap-4 py-3.5 text-left cursor-pointer bg-transparent border-none hover:bg-accent/50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="text-foreground truncate"
                      style={{ fontSize: "0.875rem", fontWeight: 500 }}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" style={{ fontSize: "0.6875rem" }}>
                      {faq.category}
                    </Badge>
                    {expandedFaq === faq.id ? (
                      <ChevronUp className="size-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="size-4 text-muted-foreground" />
                    )}
                  </div>
                </Button>
                {expandedFaq === faq.id && (
                  <div className="pb-3.5 pl-0 pr-8">
                    <p
                      className="text-muted-foreground"
                      style={{ fontSize: "0.8125rem", lineHeight: 1.6 }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documentation & Resources */}
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-4">
          <CardTitle
            style={{
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Documentation & Resources
          </CardTitle>
          <CardDescription style={{ fontSize: "0.8125rem" }}>
            Browse guides, tutorials, and reference documentation
          </CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {resources.map((resource) => (
              <Button
                key={resource.title}
                variant="ghost"
                className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors text-left cursor-pointer bg-transparent h-auto"
                asChild
              >
                <a href="#">
                  <div className="flex items-center justify-center size-9 rounded-md bg-muted shrink-0 mt-0.5">
                    <resource.icon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-foreground truncate"
                        style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                      >
                        {resource.title}
                      </span>
                      <ExternalLink className="size-3 text-muted-foreground shrink-0" />
                    </div>
                    <p
                      className="text-muted-foreground mt-0.5"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {resource.description}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="shrink-0 mt-0.5"
                    style={{ fontSize: "0.625rem" }}
                  >
                    {resource.type}
                  </Badge>
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
