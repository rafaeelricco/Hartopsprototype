import { createBrowserRouter } from "react-router";

// ---- OPS IMPORTS ----
import { SignIn as OpsSignIn } from "./ops/components/sign-in";
import { ForgotPassword as OpsForgotPassword } from "./ops/components/forgot-password";
import { ResetPassword as OpsResetPassword } from "./ops/components/reset-password";
import { ActivateAccount as OpsActivateAccount } from "./ops/components/activate-account";
import { AppShell as OpsAppShell } from "./ops/components/app-shell";
import { Dashboard as OpsDashboard } from "./ops/components/dashboard";
import { OrganizationsPage } from "./ops/components/organizations-page";
import { OrganizationDetailPage } from "./ops/components/organization-detail-page";
import { EventsPage as OpsEventsPage } from "./ops/components/events-page";
import { ReportsPage as OpsReportsPage } from "./ops/components/reports-page";
import { SettingsPage as OpsSettingsPage } from "./ops/components/settings-page";
import { HelpPage } from "./ops/components/help-page";
import { TermsOfServicePage } from "./ops/components/terms-of-service";
import { PrivacyPolicyPage } from "./ops/components/privacy-policy";
import { NotFound } from "./ops/components/not-found";

// ---- STAFF IMPORTS ----
import { SignUp as StaffSignUp } from "./staff/components/sign-up";
import { ForgotPassword as StaffForgotPassword } from "./staff/components/forgot-password";
import { DashboardLayout as StaffDashboardLayout } from "./staff/components/dashboard-layout";
import { DashboardContent as StaffDashboardContent } from "./staff/components/dashboard-content";
import { Campaigns } from "./staff/components/campaigns";
import { CampaignDetail } from "./staff/components/campaign-detail";
import { EventsPage as StaffEventsPage } from "./staff/components/events-page";
import { EventDetailPage as StaffEventDetailPage } from "./staff/components/event-detail-page";
import { ReportsPage as StaffReportsPage } from "./staff/components/reports-page";
import { BrandAssetsPage } from "./staff/components/brand-assets-page";
import { SettingsPage as StaffSettingsPage } from "./staff/components/settings-page";

export const router = createBrowserRouter([
  // ---- OPS PLATFORM (/ops) ----
  { path: "/ops", Component: OpsSignIn, ErrorBoundary: NotFound },
  { path: "/ops/forgot-password", Component: OpsForgotPassword },
  { path: "/ops/reset-password", Component: OpsResetPassword },
  { path: "/ops/activate", Component: OpsActivateAccount },
  { path: "/ops/terms", Component: TermsOfServicePage },
  { path: "/ops/privacy", Component: PrivacyPolicyPage },
  {
    path: "/ops/dashboard",
    Component: OpsAppShell,
    ErrorBoundary: NotFound,
    children: [
      { index: true, Component: OpsDashboard },
      { path: "organizations", Component: OrganizationsPage },
      { path: "organizations/:id", Component: OrganizationDetailPage },
      { path: "events", Component: OpsEventsPage },
      { path: "reports", Component: OpsReportsPage },
      { path: "settings", Component: OpsSettingsPage },
      { path: "help", Component: HelpPage },
      { path: "*", Component: NotFound },
    ],
  },

  // ---- STAFF PLATFORM (/staff) ----
  { path: "/staff", Component: OpsSignIn },
  { path: "/staff/sign-up", Component: StaffSignUp },
  { path: "/staff/forgot-password", Component: StaffForgotPassword },
  {
    path: "/staff",
    Component: StaffDashboardLayout,
    children: [
      { path: "dashboard", Component: StaffDashboardContent },
      { path: "campaigns", Component: Campaigns },
      { path: "campaigns/:id", Component: CampaignDetail },
      { path: "events", Component: StaffEventsPage },
      { path: "events/:eventId", Component: StaffEventDetailPage },
      { path: "reports", Component: StaffReportsPage },
      { path: "brand-assets", Component: BrandAssetsPage },
      { path: "settings", Component: StaffSettingsPage },
    ],
  },

  // ---- ROOT REDIRECT ----
  { path: "/", Component: OpsSignIn },
  { path: "*", Component: NotFound },
]);
