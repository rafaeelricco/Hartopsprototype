# Educator Manager Route (`/educator`) — Implementation Plan

Build a new `/educator` route for the Educator Manager persona, following the same structural patterns as the existing `/ops` and `/staff` routes. The educator manager is the coordination layer between Trial Client Staff and field educators — they receive assigned events, staff educators, monitor live execution, and finalize completed events.

## Context Sources

- **4 UI mental models**: `mm-ui-001` (auth/nav), `mm-ui-002` (events management), `mm-ui-003` (educator roster), `mm-ui-004` (settings/notifications)
- **Experience model**: [mm8-educator-manager-experience.yml](file:///d:/Projects/Hartopsprototype/models/experience/mm8-educator-manager-experience.yml)
- **Definition Call 1/4**: Educator manager geography-based assignment, cancellation mgmt, availability calendar
- **Definition Call 2/4**: Campaign hierarchy (Campaign → Activity → Event), data/item master

---

## Proposed Changes

### Scaffolding — App Shell & Navigation

#### [NEW] [app-sidebar.tsx](file:///d:/Projects/Hartopsprototype/src/app/educator/components/app-sidebar.tsx)
- Mirror [staff/app-sidebar.tsx](file:///d:/Projects/Hartopsprototype/src/app/staff/components/app-sidebar.tsx) pattern
- Nav items: **Dashboard**, **Events**, **Educators**, **Settings** (per mm-ui-001 §Side Navigation Structure)
- User: mock educator manager identity (e.g., "Maria Lopez", "maria@hartagency.com")
- Team: `{ name: "Hart Agency", plan: "Educator Manager" }`
- Future-proof: anticipate Analytics and Training nav items for later phases (per mm8)

#### [NEW] [app-shell.tsx](file:///d:/Projects/Hartopsprototype/src/app/educator/components/app-shell.tsx)
- Clone from [staff/app-shell.tsx](file:///d:/Projects/Hartopsprototype/src/app/staff/components/app-shell.tsx)
- Uses `SidebarProvider`, `SidebarInset`, Breadcrumbs, Notification bell, `<Outlet />`
- Breadcrumb root: `"Educator Manager"` linking to `/educator/dashboard`

#### [NEW] [dashboard-layout.tsx](file:///d:/Projects/Hartopsprototype/src/app/educator/components/dashboard-layout.tsx)
- Simple re-export: `export { AppShell as DashboardLayout } from "./app-shell"`

---

### Auth Pages

> [!NOTE]
> All auth pages import and use the **existing** [ops/auth-layout.tsx](file:///d:/Projects/Hartopsprototype/src/app/ops/components/auth-layout.tsx) component. This provides the shared visual pattern: centered white card, logo, single-column form, full-width CTA button, and Terms/Privacy links (per mm-ui-001 §Shared Auth Layout).

#### [NEW] [sign-in.tsx](file:///d:/Projects/Hartopsprototype/src/app/educator/components/sign-in.tsx)
- Import `AuthLayout` from `@/app/ops/components/auth-layout`
- Links to `/educator/forgot-password`
- On success → redirect to `/educator/dashboard`
- Inactive accounts show specific "Account locked" error (per mm-ui-001)

#### [NEW] [activate-account.tsx](file:///d:/Projects/Hartopsprototype/src/app/educator/components/activate-account.tsx)
- Invitation-based activation flow (per mm-ui-001): password creation form
- On success → redirect to sign-in (design principle: don't auto-login)
- Expired link shows "Contact your administrator" error

#### [NEW] [forgot-password.tsx](file:///d:/Projects/Hartopsprototype/src/app/educator/components/forgot-password.tsx)
- Step 1: Email entry form → sends reset link

#### [NEW] [reset-password.tsx](file:///d:/Projects/Hartopsprototype/src/app/educator/components/reset-password.tsx)
- Step 2: Password reset form (after clicking email link)
- On success → redirect to sign-in
- Expired/used tokens show appropriate error

---

### Dashboard

#### [NEW] [dashboard-data.ts](file:///d:/Projects/Hartopsprototype/src/app/educator/components/dashboard-data.ts)
- Mock data for educator manager dashboard stats
- 3 stat cards: **Total Events This Week**, **Active Events Now**, **Events Requiring Attention** (per mm-ui-001 §Dashboard)
- Each stat is scoped to the manager's assigned educator/event slice
- Zero-state values for newly activated managers with no events

#### [NEW] [dashboard.tsx](file:///d:/Projects/Hartopsprototype/src/app/educator/components/dashboard.tsx)
- 3 clickable stat cards at the top linking to filtered Events views
- Upcoming events list below stats — each row clickable → event detail
- Action-oriented design: surfaces "what needs my attention right now?" (per mm8)
- "Events Requiring Attention" list (unstaffed or ready-for-review events)

---

### Events Management

#### [NEW] [events-data.ts](file:///d:/Projects/Hartopsprototype/src/app/educator/components/events-data.ts)
- Mock event data with lifecycle states: `Upcoming`, `Live`, `Completed`
- Events include: name, date/time, venue, assigned educator, status, campaign ref
- Scoped to the manager's educator set only

#### [NEW] [events-page.tsx](file:///d:/Projects/Hartopsprototype/src/app/educator/components/events-page.tsx)
- **List View** (default): tabular format with columns: Event Name, Date, Venue, Educator, Status
- **Calendar View** (toggle): monthly grid with month navigation (prev/next)
- **Filters**: Live, Upcoming, Completed tabs
- Sortable columns (date, status, educator)
- Click event → navigate to event detail (phase-dependent view)

#### [NEW] [event-detail-page.tsx](file:///d:/Projects/Hartopsprototype/src/app/educator/components/event-detail-page.tsx)
- **Lifecycle phase indicator badge** at the top — clear visual showing `Upcoming`, `Live`, or `Completed` state (per mm-ui-002 implications)
- Three-phase view based on event lifecycle state:
  - **Pre-Event (Upcoming)**: read-only event details (products, instructions, goals) + Educator Assignment CTA
  - **During Event (Live)**: live monitoring dashboard — check-in status, live metrics, photo stream (read-only)
  - **Post-Event (Completed)**: final stats summary, photo gallery, **"Approve & Finalize"** CTA with confirmation dialog
- Educator assignment inline panel: select from roster → view availability → confirm → notification sent
  - Reassignment notifies both outgoing and incoming educator (per mm-ui-002)
- Finalization is irreversible — locks for all actors, terminates 24-hour editing window (per mm-ui-002)

---

### Educator Roster

#### [NEW] [educator-roster-data.ts](file:///d:/Projects/Hartopsprototype/src/app/educator/components/educator-roster-data.ts)
- Mock roster data with: name, email, phone, status (Active/Inactive), Quick Stats (avg rating, sales/event, punctuality)
- Scoped to the authenticated manager's assigned educators

#### [NEW] [educators-page.tsx](file:///d:/Projects/Hartopsprototype/src/app/educator/components/educators-page.tsx)
- Sortable table: Name, Contact, Status, Avg Rating, Sales/Event, Punctuality
- Filter by Active/Inactive
- Click row → Educator Detail View

#### [NEW] [educator-detail-page.tsx](file:///d:/Projects/Hartopsprototype/src/app/educator/components/educator-detail-page.tsx)
- Contact section: `mailto:` and `tel:` action links
- Quick Stats panel: cards showing avg rating, sales per event, punctuality
- Status indicator (Active/Inactive)
- Read-only view — managers are coordinators, no editing (per mm-ui-003)

---

### Settings & Notifications

#### [NEW] [settings-page.tsx](file:///d:/Projects/Hartopsprototype/src/app/educator/components/settings-page.tsx)
- **Notification Preferences**: 5 toggleable categories (per mm-ui-004):
  1. New Events Assigned
  2. Unstaffed Events Warning (7-day)
  3. Event Starting Soon (1 hour)
  4. Failed Educator Check-In
  5. Event Ready for Review
- Each category shows trigger description + toggle
- **Help & Support** section: expandable FAQ list with search/filter + "Contact Support" fallback link

---

### Routing

#### [MODIFY] [routes.tsx](file:///d:/Projects/Hartopsprototype/src/app/routes.tsx)
Add a new `/educator` route block following the same pattern as `/ops` and `/staff`:

```tsx
// ---- EDUCATOR MANAGER PLATFORM (/educator) ----
{ path: "/educator", Component: EducatorSignIn },
{ path: "/educator/activate", Component: EducatorActivateAccount },
{ path: "/educator/forgot-password", Component: EducatorForgotPassword },
{ path: "/educator/reset-password", Component: EducatorResetPassword },
{
  path: "/educator",
  Component: EducatorDashboardLayout,
  children: [
    { path: "dashboard", Component: EducatorDashboard },
    { path: "events", Component: EducatorEventsPage },
    { path: "events/:eventId", Component: EducatorEventDetailPage },
    { path: "educators", Component: EducatorEducatorsPage },
    { path: "educators/:id", Component: EducatorEducatorDetailPage },
    { path: "settings", Component: EducatorSettingsPage },
  ],
},
```

---

## File Summary

| # | File | Type |
|---|------|------|
| 1 | `educator/components/app-sidebar.tsx` | NEW |
| 2 | `educator/components/app-shell.tsx` | NEW |
| 3 | `educator/components/dashboard-layout.tsx` | NEW |
| 4 | `educator/components/sign-in.tsx` | NEW |
| 5 | `educator/components/activate-account.tsx` | NEW |
| 6 | `educator/components/forgot-password.tsx` | NEW |
| 7 | `educator/components/reset-password.tsx` | NEW |
| 8 | `educator/components/dashboard-data.ts` | NEW |
| 9 | `educator/components/dashboard.tsx` | NEW |
| 10 | `educator/components/events-data.ts` | NEW |
| 11 | `educator/components/events-page.tsx` | NEW |
| 12 | `educator/components/event-detail-page.tsx` | NEW |
| 13 | `educator/components/educator-roster-data.ts` | NEW |
| 14 | `educator/components/educators-page.tsx` | NEW |
| 15 | `educator/components/educator-detail-page.tsx` | NEW |
| 16 | `educator/components/settings-page.tsx` | NEW |
| 17 | [src/app/routes.tsx](file:///d:/Projects/Hartopsprototype/src/app/routes.tsx) | MODIFY |

---

## Key Design Decisions

> [!IMPORTANT]
> **Scoped data**: The educator manager sees ONLY their assigned educators and events — not the full tenant/platform data. All mock data and UI should reflect this narrow scope.

> [!IMPORTANT]
> **Read-only event details**: Educator managers do NOT create events or campaigns. They receive events from Trial Client Staff and manage staffing/monitoring/finalization only.

> [!NOTE]
> **Finalization is irreversible**: The "Approve & Finalize" action locks the event record permanently. The UI must include a confirmation dialog before this action.

> [!NOTE]
> **Speed-to-Finalize**: Events cluster on weekends. The events list should support efficient Monday batch review of completed events.

---

## Verification Plan

### Build Verification
```bash
pnpm run build
```
Confirms all new files compile without TypeScript errors and the build succeeds.

### Browser Verification
Navigate through all routes in the running dev server (`pnpm run dev`):

1. **`/educator`** → Sign-in page renders
2. **`/educator/activate`** → Activation page renders
3. **`/educator/forgot-password`** → Forgot password page renders
4. **`/educator/reset-password`** → Reset password page renders
5. **`/educator/dashboard`** → Dashboard with 3 stat cards renders, sidebar navigation works
6. **`/educator/events`** → Events list renders with filter tabs and calendar toggle
7. **`/educator/events/:eventId`** → Event detail page renders with **phase badge** and phase-appropriate content
8. **`/educator/educators`** → Educator roster table renders with sortable columns
9. **`/educator/educators/:id`** → Educator detail renders with contact links and Quick Stats
10. **`/educator/settings`** → Notification toggles and Help & FAQ section render

### Manual Visual Checks
- Sidebar highlights active nav item correctly
- Breadcrumbs update on navigation
- Stat cards on dashboard are clickable
- Calendar view shows events on date cells with month navigation
- Event detail shows lifecycle phase badge (Upcoming/Live/Completed)
- All pages follow the existing visual design language (dark theme, card-based layouts)
