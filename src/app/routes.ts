import { createBrowserRouter } from "react-router";
import { SignIn } from "./components/sign-in";
import { ForgotPassword } from "./components/forgot-password";
import { ResetPassword } from "./components/reset-password";
import { ActivateAccount } from "./components/activate-account";
import { AppShell } from "./components/app-shell";
import { Dashboard } from "./components/dashboard";
import { OrganizationsPage } from "./components/organizations-page";
import { OrganizationDetailPage } from "./components/organization-detail-page";
import { EventsPage } from "./components/events-page";
import { ReportsPage } from "./components/reports-page";
import { SettingsPage } from "./components/settings-page";
import { HelpPage } from "./components/help-page";
import { NotFound } from "./components/not-found";

export const router = createBrowserRouter([
  { path: "/", Component: SignIn, ErrorBoundary: NotFound },
  { path: "/forgot-password", Component: ForgotPassword },
  { path: "/reset-password", Component: ResetPassword },
  { path: "/activate", Component: ActivateAccount },
  {
    path: "/dashboard",
    Component: AppShell,
    ErrorBoundary: NotFound,
    children: [
      { index: true, Component: Dashboard },
      { path: "organizations", Component: OrganizationsPage },
      { path: "organizations/:id", Component: OrganizationDetailPage },
      { path: "events", Component: EventsPage },
      { path: "reports", Component: ReportsPage },
      { path: "settings", Component: SettingsPage },
      { path: "help", Component: HelpPage },
      { path: "*", Component: NotFound },
    ],
  },
]);