## **I. Hart Operations**

### **1\. Authentication**

**Context:** Hart Ops administrators are the platform's gatekeepers. Authentication is invitation-only. The first account is manually seeded, creating a trust chain.

**In Scope:** Sign-up activation, sign-in, forgot password, and invitation email trigger.

**Out of Scope:** Role-based permissions within Hart Ops (Phase 1), MFA/2FA.

**Shared Layout:** Centered white card with rounded corners on a full-screen background. Logo centered above the card.

* **Form Structure:** Single-column vertical stack.  
* **Field Design:** Labels positioned above inputs. The Password field includes an inline "Forgot your password?" link aligned to the right.  
* **Primary Action:** Full-width rounded button with high-contrast styling (e.g., dark forest green).  
* **Page Footer:** Centered links for "Terms of Service" and "Privacy Policy" positioned at the bottom of the viewport.  
* **1.1 Sign Up (Invitation Only)**  
  * **Trigger:** Existing member sends invitation email.  
  * **Flow:** Email → Activation Link → Activation Screen (email pre-filled) → Set Password → Redirect to Sign In.  
  * **Validations:** Password: min 8 chars, 1 uppercase, 1 number, 1 special char.  
  * **Edge Case:** Expired link shows "Contact administrator" error.  
* **1.2 Sign In**  
  * **Trigger:** Direct URL or "Sign In" link.  
  * **Flow:** Enter Credentials → Auth Service → Redirect to Dashboard.  
  * **Validations:** Email format required; account must be in 'Active' state.  
  * **Edge Case:** Inactive account shows "Account locked" error instead of generic "Invalid credentials".  
* **1.3 Forgot Password**  
  * **Trigger:** "Forgot your password?" link on Sign In page.  
  * **Flow:** Enter Email → Reset Link sent → Reset Link clicked → Password Reset Screen → Set New Password → Redirect to Sign In.  
  * **Validations:** Email must exist in the system and be associated with an Active account.  
  * **Edge Case:** Token expiration (x hours); token reuse prevention.

### **2\. Navigation & Sidebar**

**Context:** The sidebar maps to strategic questions: "**How are my tenants doing?**" (Organizations), "**What's happening now?**" (Events).

**Shared Layout:** Fixed left sidebar (collapsed icon \+ label) \+ main content area.

* **Dashboard:** Default landing page with five stat cards: Total Orgs, Active Events, Top Orgs, Recent Events, and Platform Growth chart.  
* **Organizations:** Client management interface.  
* **Events:** Link to Cross-Org Monitoring view.  
* **Reports:** Platform-wide stats with PDF/Excel export.  
* **Settings:** Team management and profile.

### **3\. Organizations Management**

**Context:** Core tenant unit. Setup involves a 3-step wizard for trial clients.

**Shared Layout:** Searchable list view. Wizard with stepper indicator.

* **Add Organization Wizard**  
  * **Trigger:** "Add Organization" button in Organizations list.  
  * **Step 1 (Details):** Company Name, Logo, Industry, Primary Contact.  
    * **Validations:** Logo format (PNG/SVG), unique Name requirement.  
  * **Step 2 (Users):** Invite the initial Trial Client Staff email.  
    * **Validations:** Email format; domain blacklisting.  
  * **Step 3 (Review):** Review configuration and finalize invitations.  
* **Detail Page**  
  * **Trigger:** Clicking an Organization card in the list view.  
  * **Flow:** Organization Header details → Sub-tabs (Overview, Campaigns, Events, Team).  
  * **Rationale:** Read-only drill-down view for Hart Ops to monitor specific tenant health.

### **4\. Events Monitoring (Cross-Org)**

**Context:** The "omni view" where Hart monitors events across all organizations simultaneously.

* **Summary Stats Bar:** Key metrics including events Today, This Week, and Live Now.  
* **Filterable List View**  
  * **Trigger:** Navigating to the Cross-Org Monitoring section.  
  * **Interaction:** Clicking an event provides a read-only detail view for Hart surveillance.  
  * **Validations:** Server-side sorting and pagination mandatory.

### **5\. Platform Reports & Data Quality**

**Context:** The primary KPI for Hart to identify poor-quality submissions.

* **Reports Dashboard:** Multi-line growth charts and top performer tables.  
* **Data Quality Score**  
  * **Flow:** System aggregates completeness (Photos, Questions, Inventory) → Calculates platform-wide percentage → Displays trend indicators per organization.

## **II. Operating Staff (Client Staff)**

### **1\. Dashboard & Navigation**

* **Side Nav:** Dashboard, Campaigns, Events, Reports, Brand Assets, Settings.  
* **Dashboard:** 4 Stat Cards \+ Performance Trend Chart. Includes timeframe filters (30 days, 3/6/12 months) that update all components in real-time.

### **2\. Campaign Management**

* **Campaign Library:** Card-based grid view showing campaign name and event counts.  
* **Create Campaign:** Simple form (Name, Description). Validates that Name is unique within the Organization.

### **3\. Event Creation Workflow (The Core UX)**

**Context:** A "report-first" approach where operators see the end result via a preview.

* **Step 1: Event Basics:** Name, Location, Date, Duration, Venue Type.  
* **Step 2: Objectives:** Checkboxes for Brand Awareness, Drive Sales, Competitive Intel, etc.  
* **Step 3: Intelligent Report Preview**  
  * **Flow:** System maps Objectives to Data Modules and renders a Mock-up Report.  
  * **Interaction:** Toggle "View Educator Experience" to see mobile app preview.  
* **Step 4: Advanced Customization:** Optional checkbox modules (Shelf Analysis, Menu Analysis, etc.).

### **4\. Event Monitoring**

* **List & Calendar Views:** Toggle between list and monthly grid views (essential for weekend clustering).  
* **Detail Lifecycle:** Transitions from Editable Configuration → Live Data Feed → Locked Final Report.

### **5\. Reports & Analytics**

* **Quick Stats:** Real-time roll-up of Samples, Consumer Reach, and Total Sales.  
* **Campaign Comparison:** Side-by-side performance table for ROI analysis.  
* **Photo Proof Gallery:** Visual grid of event photos for venue intelligence.  
* **Exports:** PDF (for brand presentations) and CSV (for raw data processing).

### **6\. Brand Assets & Settings**

* **Product Library:** SKU management with "Auto Upload" (AI-prefilled processing).  
* **Help Resources:** Client-managed FAQs and links pushed to field teams.

## **III. Educators (Mobile App)**

### **1\. Authentication & Setup**

* **Activation:** Email deep link → Activation Screen → Password Set → Mandatory Permission Prompts (Biometrics, Geo, Notifications, Photo).  
* **Sign In:** Launches with Native Biometric Prompt (FaceID/Fingerprint). Fallback to Email/Password if biometric fails.

### **2\. Event Execution**

* **Check-in:** Geolocation verification (must be within 500ft of venue). Starts Event Timer and Task Checklist.  
* **Live Interface:** Countdown timer and progress tracking.  
* **Data Collection Cards:**  
  * **Profiling:** Tap-based flow (Gender → Age → Rating → Intent). No typing required; \<30 seconds per consumer.  
  * **Sales Tracking:** Camera AR overlay detects bottles/skus. Manual numeric entry available as fallback.  
  * **Venue Intel:** Photo capture for shelves/menus with optional voice-to-text notes.  
* **Check-out:** Final geolocation check. Locked until all mandatory tasks are completed.

### **3\. AI & Offline Mode**

* **Voice-to-Data:** Hold-to-record voice notes transcribed into structured data (e.g., sentiment analysis).  
* **Offline Mode:** Full local SQLite storage. "Working Offline" banner appears. Data auto-syncs immediately upon connectivity restoration.

## **IV. Educator Managers**

### **1\. Dashboard & Events Lifecycle**

* **Dashboard:** "Needs Attention" card highlights unstaffed events or failed check-ins.  
* **Assignment:** Search/Filter roster to select and assign an 'Active' educator without conflicts.  
* **Finalization:** "Approve & Finalize" locks the event record. This terminates the educator's 24h edit window immediately.

### **2\. Educator Roster**

* **Roster View:** List grouped by status; sortable by Completed Events, Ratings, and Punctuality.  
* **Contact Action:** One-tap "tel" or "mailto" icons for immediate communication to facilitate scheduling.

## **V. Platform Assumptions & Rules**

1. **AI Analysis:** Automatic extraction from photos/voice; manual fallback always provided.  
2. **Permissions:** Geolocation is mandatory for accountability.  
3. **Security:** Invitation-only ecosystem; accounts created via trusted invitation chain.  
4. **Editing Window:** 24-hour window for Educators; overridden by Manager finalization.  
5. **Offline-First:** Mobile app must function with zero connectivity for the duration of an event.  
6. **Multi-Tenant:** Strict data isolation between organizations.

