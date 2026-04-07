Tasks extracted from the [Hart / Ambar Prototype Walkthrough – 2026-04-02](docs/background/Hart%20_%20Ambar%20Prototype%20Walkthrough%20%E2%80%93%202026_04_02%2011_58%20PDT%20%E2%80%93%20Notes%20by%20Gemini.md) call, reorganized by prototype layer with phase tagging.

---

## Ops (Operator / Hart Super Admin)

- ~~**Add filters to the Events view**: Right now the operator has to go into each event to see details. Needs filters by organization, region/territory, and assignment status so they can get a bird's-eye view across all agencies. **Phase 1.** *(~00:09:01 – 00:10:58)*~~ **Done — 2026-04-07** — Added Region column + filter (5 territories), Assignment filter (assigned/unassigned/pending), and quick-assign educator dialog with inline table updates.

- ~~**Add ability to assign/reassign ambassadors**: Luis flagged that the operator level should also have the capability to assign and reassign ambassadors to events (not just the educator manager). Quick-action buttons on the list view. **Phase 1.** *(~00:34:27 – 00:36:47)*~~ **Done — 2026-04-07**

- ~~**User roles section in capability matrix**: Stephanie asked for a section mapping what each user type can access in Phase 1. Ethan confirmed it'll be added. **Phase 1 (documentation task).** *(~00:03:22 – 00:04:29)*~~ **Done — 2026-04-07** — Added `/ops/dashboard/capability-matrix` page with tabbed role-vs-capability matrix; linked from Help page "Security & Permissions" card.

- **Tiered subscription / differentiated access per affiliate type**: Stephanie asked about structuring different feature tiers for affiliates vs. suppliers. **Phase 3.** *(~01:00:52 – 01:02:03)*

- **HubSpot / Slack integrations at the platform level**: Stephanie wants HubSpot for internal Hart use and Slack for agency comms. **Phase 3.** *(~01:04:37 – 01:05:39)*

- **Upsell campaigns to affiliates** (based on ambassador count, event volume, etc.): Luis said this makes sense once there's scale. **Phase 3.** *(~01:06:54 – 01:07:57)*

- **Help desk / support ticket system**: Minimal ticket-raising functionality TBD. Chris is deciding on outsourcing vs. AI involvement. **Not Phase 1 (phase TBD).** *(~01:04:37)*

---

## Staff (Agency Admin / Op Staff)

- **Robust filters on the Events page — critical**: Filter by geography (state → metro → borough/county), event type (on-premise, off-premise, cannabis), assignment status. Leah said without this, she can't manage her business. **Phase 1.** *(~00:29:09 – 00:30:10, ~00:37:45 – 00:39:33)*

- **Configurable geographic regions per organization**: Each agency divides territories differently (NY boroughs vs. Florida lower/mid). Ethan confirmed this is in the capabilities spreadsheet. Leah will send screenshots of current territory structure. **Phase 1.** *(~00:37:45 – 00:39:33)*

- **Quick-assign ambassadors from the events list view**: A "+" button or inline action to assign an ambassador without clicking into each event. "Too many clicks" kills efficiency. **Phase 1.** *(~00:31:18 – 00:32:19)*

- **Smart location resolution for event creation**: Location input should use auto-suggestions instead of a plain text box, to enable accurate geographic filtering and search. **Phase 1.** *(~00:39:33 – 00:40:35)*

- **Billing/payroll export (campaign → invoice → QuickBooks)**: Leah made it absolutely clear this is non-negotiable for Phase 1. Luis confirmed it's included. What's NOT included is automated billing of affiliates. **Phase 1.** *(~01:02:52 – 01:03:54)*

- **Automated charging of affiliates**: Billing the agencies that use the SaaS platform. **Phase 2.** *(~01:03:54)*

- **Terminology configurable per agency**: "Educator" → "Ambassador" / "Brand Ambassador." Ethan confirmed each org can choose their own term. **Phase 1 (already accounted for).** *(~00:02:23)*

---

## Educator Manager

- **Same filters as staff view**: Territory, geography, event type, assignment status — so managers only see what they're responsible for (e.g., only Brooklyn, only on-premise). **Phase 1.** *(~00:29:09 – 00:30:10)*

- **Quick-assign from the events list**: Same as staff — a "+" button next to "unassigned" that opens the ambassador dropdown filtered by availability and geographic proximity. Leah was explicit: "they shouldn't have to click in it." **Phase 1.** *(~00:46:40 – 00:47:49)*

- **Cancellation approval workflow**: Ambassador requests cancellation → manager gets notified immediately → approves or denies. Already demoed and confirmed. **Phase 1.** *(~00:58:46 – 00:59:46)*

---

## Educator (Mobile App)

- **Consumer profiling UX — allow cumulative entry**: Leah raised concern that per-interaction profiling (gender/age) keeps ambassadors on their phones too long, which looks bad on-site. Decision: keep current tap-per-consumer flow for now, but revisit if needed. Sales tracking and venue survey photos remain required before checkout. **Phase 1 (design decision — revisit if feedback warrants).** *(~00:55:07 – 00:57:59)*