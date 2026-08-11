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
import { CampaignDetailPage } from "./ops/components/campaign-detail-page";
import { OrgActivityDetailPage } from "./ops/components/org-activity-detail-page";
import { ActivitiesPage as OpsActivitiesPage } from "./ops/components/activities-page";
import { ActivityDetailPage as OpsActivityDetailPage } from "./ops/components/activity-detail-page";
import { ReportsPage as OpsReportsPage } from "./ops/components/reports-page";
import { SettingsPage as OpsSettingsPage } from "./ops/components/settings-page";
import { AccountsPage } from "./ops/components/accounts-page";
import { BrandAmbassadorsPage } from "./ops/components/brand-ambassadors-page";
import { BrandAmbassadorDetailPage } from "./ops/components/brand-ambassador-detail-page";
import { DraftActivitiesPage } from "./ops/components/draft-activities-page";
import { AvailabilityCalendarPage } from "./ops/components/availability-calendar-page";
import { HelpPage } from "./ops/components/help-page";
import { CapabilityMatrixPage } from "./ops/components/capability-matrix-page";
import { BillingWorkspacePage } from "./ops/components/billing-workspace-page";
import { BillingCodesPage } from "./ops/components/billing-codes-page";
import { PayrollWorkspacePage } from "./ops/components/payroll-workspace-page";
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
import { ActivitiesPage as StaffActivitiesPage } from "./staff/components/activities-page";
import { ActivityDetailPage as StaffActivityDetailPage } from "./staff/components/activity-detail-page";
import {
  ActivityDetailReportPage,
  CompanySalesReportPage,
  SupplierBasedReportPage,
} from "./shared/components/report-pages";
import { BrandAssetsPage } from "./staff/components/brand-assets-page";
import { SettingsPage as StaffSettingsPage } from "./staff/components/settings-page";
import { CreateActivityPage } from "./staff/components/create-activity-page";

// ---- BRAND_AMBASSADOR MANAGER IMPORTS ----
import { DashboardLayout as MarketManagerDashboardLayout } from "./market-manager/components/dashboard-layout";
import { Dashboard as MarketManagerDashboard } from "./market-manager/components/dashboard";
import { ActivitiesPage as MarketManagerActivitiesPage } from "./market-manager/components/activities-page";
import { ActivityDetailPage as MarketManagerActivityDetailPage } from "./market-manager/components/activity-detail-page";
import { BrandAmbassadorsPage as MarketManagerBrandAmbassadorsPage } from "./market-manager/components/brand-ambassadors-page";
import { BrandAmbassadorDetailPage as MarketManagerBrandAmbassadorDetailPage } from "./market-manager/components/brand-ambassador-detail-page";
import { SettingsPage as MarketManagerSettingsPage } from "./market-manager/components/settings-page";

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
      {
        path: "organizations/:id/campaigns/:campaignId",
        Component: CampaignDetailPage,
      },
      {
        path: "organizations/:id/activities/:activityId",
        Component: OrgActivityDetailPage,
      },
      { path: "activities", Component: OpsActivitiesPage },
      { path: "activities/:activityId", Component: OpsActivityDetailPage },
      { path: "billing", Component: BillingWorkspacePage },
      { path: "billing-codes", Component: BillingCodesPage },
      { path: "payroll", Component: PayrollWorkspacePage },
      { path: "reports", Component: OpsReportsPage },
      { path: "reports/activity-detail", Component: ActivityDetailReportPage },
      { path: "reports/company-sales", Component: CompanySalesReportPage },
      { path: "reports/supplier-based", Component: SupplierBasedReportPage },
      { path: "settings", Component: OpsSettingsPage },
      { path: "accounts", Component: AccountsPage },
      { path: "brand-ambassadors", Component: BrandAmbassadorsPage },
      { path: "brand-ambassadors/:id", Component: BrandAmbassadorDetailPage },
      { path: "availability", Component: AvailabilityCalendarPage },
      { path: "draft-activities", Component: DraftActivitiesPage },
      { path: "help", Component: HelpPage },
      { path: "capability-matrix", Component: CapabilityMatrixPage },
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
      { path: "activities", Component: StaffActivitiesPage },
      { path: "activities/create", Component: CreateActivityPage },
      { path: "activities/:activityId", Component: StaffActivityDetailPage },
      { path: "reports/activity-detail", Component: ActivityDetailReportPage },
      { path: "reports/company-sales", Component: CompanySalesReportPage },
      { path: "reports/supplier-based", Component: SupplierBasedReportPage },
      { path: "brand-assets", Component: BrandAssetsPage },
      { path: "settings", Component: StaffSettingsPage },
    ],
  },

  // ---- MARKET MANAGER PLATFORM (/market-manager) ----
  { path: "/market-manager", Component: OpsSignIn },
  { path: "/market-manager/activate", Component: OpsActivateAccount },
  { path: "/market-manager/forgot-password", Component: OpsForgotPassword },
  { path: "/market-manager/reset-password", Component: OpsResetPassword },
  {
    path: "/market-manager",
    Component: MarketManagerDashboardLayout,
    children: [
      { path: "dashboard", Component: MarketManagerDashboard },
      { path: "activities", Component: MarketManagerActivitiesPage },
      { path: "activities/:activityId", Component: MarketManagerActivityDetailPage },
      { path: "brand-ambassadors", Component: MarketManagerBrandAmbassadorsPage },
      { path: "brand-ambassadors/:id", Component: MarketManagerBrandAmbassadorDetailPage },
      { path: "settings", Component: MarketManagerSettingsPage },
    ],
  },

  // ---- ROOT REDIRECT ----
  { path: "/", Component: OpsSignIn },
  { path: "*", Component: NotFound },
]);
