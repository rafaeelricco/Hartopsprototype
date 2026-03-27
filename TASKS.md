<!-- Phase legend: 🟢 P1 = Phase 1 (V1, first 8 weeks)  ·  🔵 P2 = Phase 2 ("Swagger", post-launch)  ·  ⚪ P3 = Future / TBD -->
<!-- Status legend: [x] Done  ·  [~] Partial  ·  [ ] Not started  ·  🔴 Blocked -->

---

## 1. Mobile App – Educator `🟢 P1`

> **Status: Design specs finalized.** Native mobile app — no code yet. `[x]` marks below indicate requirements confirmed during client calls, not implemented features.

- [x] `🟢 P1` Make availability/calendar a primary tab and core flow; design reminders/pings to update availability.
      → See §3 "Educator availability calendar" for manager-facing view.
      Source: `Call 1/4 00:23:52 – "The big thing that needs to be front and center is availability and having a calendar functionality built into here."`

- [x] `🟢 P1` Treat location, push notifications, and camera as mandatory; design a non-optional permissions flow.
      Source: `Call 1/4 00:26:16 – "all those things need to be mandatory or else it just doesn't work."`

- [x] `🟢 P1` Sales tracking as simple product counter (+/- per SKU) — calculates profit from units sold.
      → See §2 "Product sales counter model" for data module.
      Source: `Call 1/4 00:21:55 – "for that sales tracker, I would just want to be able to click off how many I think I sold during the event."`

- [x] `🟢 P1` Rename "Sales Tracking" to "Survey" — fold shelf-recognition into venue intelligence / survey flows.
      Source: `Call 1/4 00:16:11 – "I think we need to have rename it to survey as opposed to sales tracking."`

- [x] `🟢 P1` Quick photo capture of shelf, backbar, coolers with offline save & complete-later support.
      → Phased with §5 "Survey AI integration surface" (P2 data pipes) and §8 "Survey AI Integration" (P3 AI).
      Source: `Call 1/4 00:20:16 – "we might need them to take a picture and walk away and come back and fill it out later."` + `00:30:42 – "having an offline mode, having the ability to save the pictures and then upload it later is extremely important, extremely."`

- [x] `🟢 P1` Brand guide section in-app — serving instructions, brand scripts, setup info (PDF-equivalent).
      → See §2 "Brand education content" for admin-side document management.
      Source: `Call 1/4 00:27:25 – "What drinks are served? Information about the brand... that is a sheet of paper that has all the brand information, the setup information."`

- [x] `🟢 P1` **Educator score/rating in mobile app** — Display the educator's own `avgRating` (numeric + star visual) on the educator mobile dashboard and profile screen for transparency and self-improvement.
      Source: `Prototype Review 00:33:36 – "if you're a 2.7, you know you got to up your game. If you're a five, you know you're doing great."`

- [x] `🟢 P1` **Sales target & bonus display in tracking** — In the Sales Volume Tracker, add visible target and optional bonus threshold with progress bar. Add `target` and `bonusThreshold` fields to the `sales-volume` data module.
      Source: `Prototype Review 00:43:48 – "expectation is six bottles. If you want the bonus, you sell 12 bottles."`

- [x] `🟢 P1` **Mandatory photo upload enforcement** — Educators cannot progress through event tasks without uploading required photos. Disabled "Next" button until all mandatory photo slots are filled.
      Source: `Prototype Review 00:28:12 – Larry: "Is there a way there could be a conditional or some kind of system that they can't progress without putting that photo in?"`

- [x] `🟢 P1` **Per-event compensation visible in educator app** — Display clear per-event compensation amount (rate, hours, total) on event detail view. Not aggregated by pay period — scoped to individual events.
      Source: `Prototype Review 00:32:22 – Larry: "Does compensation work via our pay periods or does it tie back to every event?"` + `Leah: "I would want it every event."`

- [ ] `🔵 P2` Educator certification / pre-qualification per brand used in assignment priority.
      Source: `Call 1/4 00:27:25 – "having educators pre-qualified like knowing who's been qualified for this so that they get priority"`

- [ ] `🔵 P2` **Pre-event checklist (setup materials verification)** — Checklist for educators to verify all materials before an event (mixers, tablecloths, corkscrews, ice buckets, over-21 tent cards). Configurable per campaign.
      Source: `Prototype Review 00:47:42 – Larry: "making sure they're bringing everything they need — tablecloth, ice bucket, corkscrew, shaker."`

---

## 2. Staff Platform – Campaigns, Events & Reports `🟢 P1`

Campaign creation, event management, data foundations, and reporting.

- [x] `🟢 P1` **Expand campaign creation** — Added: supplier, distributors, target markets/geography, anticipated event count, linked products, objectives, channels. Campaign detail shows context panel.
      Source: `Call 1/4 00:34:50 – "linking that over to more things like which suppliers, which distributors, what markets... all that information is important."`

- [x] `🟢 P1` **Event creation inherits from campaign** — Events pre-populate objectives, products, venue type from parent campaign/activity. Campaign → Activity → Event hierarchy implemented with `activity-data.ts`.
      Source: `Call 1/4 00:51:06 – "having as much detail in the campaign easier for creating the events because then that's just pull from the campaign and regurgitate it."`

  > ⚠️ **Account assignment at activity/event level is not yet implemented.** 🔴 Blocked on Account Master — staging DB not publicly accessible, distributor flat-file import not set up.

- [x] `🟢 P1` **Output-first report preview** — Projected impact merged into objectives step (step 3) as a live sidebar. Wizard reduced from 5 to 4 steps.
      Source: `Call 1/4 00:50:03 – "showing the outputs up front is extremely important and that's going to flip everyone's thinking."`

- [x] `🟢 P1` **Structured questionnaire system** — Implemented in `questionnaire-data.ts` with default questions, campaign-specific templates, multiple question types.
      Source: `Call 1/4 00:29:31 – "it being a catchall is a problem because then we're not capturing this information as data."`

- [x] `🟢 P1` **Questionnaire hardcoded answer options** — Added selectable dropdown answers for event questionnaire templates alongside free-form text.
      Source: `Call 4/4 ~00:32:17 – "there's some hardcoded stuff that I think would be good to have in there as a selection for the answers"`

- [x] `🟢 P1` **Brand education content** — Expand brand assets beyond SKUs to include serving instructions, brand scripts, setup info, evaluation sheets. Link to campaigns.
      → See §1 "Brand guide section in-app" for mobile consumption.
      Source: `Call 1/4 00:27:25 – "that is a sheet of paper that has all the brand information, the setup information."`

- [x] `🟢 P1` **Connect item master to campaigns/events** — `EventItem` has `linkedProductIds`, Activities define product subsets. Products at campaign level flow to events.
      → See §4 "Hart-level Item Master" (CRUD UI) and §5 "Shared data models".
      Source: `Call 1/4 00:21:55 – "from an event structure is going back to the item master being linked into there with this campaign."`

- [x] `🟢 P1` **Account profile data model** — Track per-account: displays, cold boxes, windows, venue characteristics. Shared `Account` entity in `@/lib/account-types.ts`.
      → See §4 "Hart-level Account Master" (UI, blocked) and §5 "Shared data models".
      Source: `Call 1/4 00:20:16 – "for the account profile we want to track how many displays are in the account."`

- [x] `🟢 P1` **Product sales counter model** — Sales Volume Tracker data module in `event-data.ts` tracks units sold by SKU.
      → See §1 "Sales tracking as simple product counter" for mobile UI.
      Source: `Call 1/4 00:21:55 – "I would just want to be able to click off how many I think I sold during the event."`

- [x] `🟢 P1` **Reports prototype — Staff & Ops basic reporting views** — Mimic current HEMS reports in prototype. **Staff:** campaign-level and cross-campaign analytics, time period selectors, performance trend charts, campaign comparison tables, PDF/CSV export. **Ops:** platform-wide stats, data quality score, growth charts, time-range filter + export. Complex analytics deferred to PowerBI for first 8 weeks; in-app dashboards deferred to P2.
      Source: `Briefing Doc – "Campaign-level and cross-campaign analytics with time period selectors, performance trend charts, campaign comparison tables, and exportable reports."` + `Call 2/4 00:44:15 – Chris: "I punted the reporting into PowerBI for the first eight weeks."` + `Call 3/4 00:13:50 – Chris: "for the MVP the team should mimic the reports available in the current application."`

- [ ] `🔵 P2` **"What if" adjustment suggestions** — When projections are weak, suggest what to change. Depends on real account/event history data.
      Source: `Call 1/4 00:41:02 – "if this is not going to be projected as good what do I need to do to make this better?"`

- [ ] `🔵 P2` **AI prescriptive suggestion engine** — Suggest accounts, days, event types based on history. Chris: "no one's doing that right now." Requires account/event history.
      Source: `Call 1/4 00:50:03 – "knowing the competition, no one's doing that right now."`

- [ ] `🔵 P2` **Distributor depletions integration surface** — Placeholder in reports for "Event Impact vs. Distributor Sales." Design the UI slot now, integrate P2.
      Source: `Call 1/4 00:04:36 – "lining that up with those sales and saying... We can start driving the actual sales velocity and put a dollar figure on it."`

---

## 3. Ops Platform – Educator & Assignment Management `🟢 P1`

Educator management is core to Hart operations — largest area. Includes roster, scoring, assignments, and cancellations.

- [x] `🟢 P1` **Educator roster page** — `educators-page.tsx` with metrics, search, multi-filters, quality scores, pagination. `educator-data.ts` with 12 mock educators.
      Source: `Call 1/4 00:52:05 – "having that the educators to pull from as to who's available who matches the geography... here's the score of the educators."`

- [x] `🟢 P1` **Manager edit-before-finalize** — Allow educator managers to edit educator notes and free-form questionnaire text before approving/finalizing an event.
      Source: `Call 4/4 ~00:31:09 – "the free form text. We definitely need opportunity for the manager to change that before approving."`

- [x] `🟢 P1` **Educator full address in profile** — Replace "home area" with actual street address. Required for drive-distance calculation to event venues.
      Source: `Call 4/4 ~00:34:48 – "It would need to be an actual address because what we do is we take their home address to know the drive distance."`

- [x] `🟢 P1` **Admin access to educator manager features** — Admin role has access to educator manager assignment view to cover for absent managers. ✅ Added Educator Assignment section to ops event-detail-page.
      Source: `Call 4/4 ~00:38:39 – "an admin should have access to the manager assignments as well because there may be a time where they need to cover somebody who's out."`

- [x] `🟢 P1` **Samples pickup & evaluations checkboxes** — In the manager finalization flow (Approve & Finalize queue), add pre-approval checkboxes: `☐ Samples Picked Up`, `☐ Evaluations Received`.
      Source: `Prototype Review 00:29:04 – Chris: "evaluations and samples pickups because that's also part of this process here for the managers."`

- [x] `🟢 P1` **Late check-in / early check-out visual flags** — Conditional badges: 🟨 _Late Check-in_ / 🟥 _Early Check-out_ on manager's event detail. Feeds into educator scoring.
      Source: `Prototype Review 00:39:32 – "If I check in at 3:20, maybe a yellow flag pops up… I leave at 4:45, a red flag pops up."`

- [x] `🟢 P1` **Educator scoring & metrics** — Quality score display in `educators-page.tsx` with color coding and trend tracking. Performance Scorecard in `educator-detail-page.tsx` with 6 P1 metrics, SVG ring indicator, progress bars, and trend arrows. Scoring utility in `educator-scoring.ts`.
  - **Metrics to capture per educator (P1):** Retail Sales Reported Average, Preferred Brands/Categories, Check-in Score, Event Completed to End Time Average, Retailer Survey Score, Cancellation Rating.
  - **Phase 2:** Reliability scoring from cancellations, certifications, on-time rate. Mobile data capture points feeding into this foundation.
    Source: `Call 1/4 00:54:10 – "it needs to be part of a scoring process with the educators."` + `Enhancement Doc – Educator Mgmt – Metrics section` + `Call 1/4 01:09:02 – "there was an educator rating which we're not really utilizing yet."`

- [x] `🟢 P1` **Educator availability calendar** — Calendar view by day/week. Highest-priority educator feature. Chris: "the big thing that needs to be front and center."
      → See §1 "Availability/calendar" for educator-facing mobile view.
      Source: `Call 1/4 00:23:52 – "The big thing that needs to be front and center is availability and having a calendar functionality."`

- [ ] `🟢 P1` **Geography-based educator-event matching** — Match by proximity (home address vs venue), availability, skill set. Surface ranked list for manager selection.
      Source: `Call 1/4 00:52:05 – "we try to put the educators that from their home address close to the event so they don't have to drive two three hours away."`

- [ ] `🟢 P1` **Assignment offer flow** — Educators are contractors. Show pending offers, accepted/declined. Chris: "a suggestion saying hey we have this opportunity."
      Source: `Call 1/4 00:52:05 – "it's basically a suggestion saying hey we have this opportunity. Do you accept it or not?"`

- [ ] `🟢 P1` **Educator list sort by geography** — Roster sortable by neighborhoods/zip codes and by manager geography/territory.
      Source: `Enhancement Doc – Educator Mgmt: "Sorts by Areas of Geography aligned by Neighborhoods"`

- [ ] `🟢 P1` **Mobile: Educator day-of cancel tagging** — Educator can tag event as cancelled _only on day of event_. Forces direct communication (call/text/chat) with manager before status change. Educator cannot unilaterally cancel.
      Source: `Enhancement Doc – Cancellation Process: "Allow for Educator to tag Event as Cancelled with Manager Approval"`

- [ ] `🟢 P1` **Web: Manager formal cancellation approval** — Formal approval flow for cancellation requests. Captures structured reason, handles partial educator compensation, triggers supplier billing adjustments.
      Source: `Enhancement Doc – Cancellation Process: "Manager needs formal approval process for the Canceled Event"`

- [ ] `🟢 P1` **Clean cancelled-event data in reports** — Cancelled events use structured cancellation reason fields. Reports distinguish "cancelled" from "failed." Campaign reviews don't show blank data for cancellations.
      Source: `Enhancement Doc – Cancellation Process: "HEMs Application retained cancelled events even in Reporting (shows blanks without any reason for cancelation)"`

- [ ] `🔵 P2` **Auto-suggestion for educator assignment** — Use address proximity, cancellation rate, preferred category/brand, and average sales rate to auto-rank educators for manager selection.
      Source: `Capabilities Matrix – "Educator Scores / Auto Assignment" = Phase 2` + `Enhancement Doc – Educator Mgmt`

---

## 4. Ops Platform – Monitoring, Accounts & Masters

Expand ops beyond organization/event monitoring into data stewardship.

- [~] `🟢 P1` 🔴 **Hart-level Account Master** — `accounts-page.tsx` created with type/status filters, contact info, events hosted. **Partial:** Not linked in ops sidebar; `account-data.ts` missing. **Blocked on staging DB + distributor flat-file import.**
  → See §2 "Account profile data model" (type created) and §5 "Shared data models". > ⚠️ `accounts-page.tsx` exists but is NOT linked in the ops sidebar — inaccessible to users.
  Source: `Call 1/4 00:02:15 – "we would have our own master... everyone's structure is going to be the same."`

- [ ] `🟢 P1` **Hart-level Item Master** — Simple UI to add new items (product name, distributor_id, supplier_id, hart_item_id). New items globally available.
      → See §2 "Connect item master" (done — products linked to campaigns) and §5 "Shared data models".
      Source: `Call 1/4 00:02:15 – "having an item master where we're capturing the right information."`

- [ ] `🟢 P1` **Educator-related dashboard metrics** — Add to ops dashboard: total educators, active assignments today, unassigned events, cancellation rate, availability coverage.
      Source: Derived from educator management discussion (§3 sources).

- [ ] `🟢 P1` **Account metrics & profiling** — Track per-account: Retail Sales avg, Preferred Brands/Categories, Check-in Score, Event Execution Score, Cancellation Rating.
      Source: `Enhancement Doc – Account Mgmt – Acceptance Criteria: Metrics section`

- [ ] `🟢 P1` **Account data linkage keys** — Handle key identifiers for Distributor, Supplier, and Data Provider clients. Prepare VIP Master Account Data setup. Enable geo-coding and address standardization.
      Source: `Enhancement Doc – Account Mgmt: "Handle Key Identifiers for Distributor, Supplier, Data Provider"`

- [ ] `🟢 P1` **Location field tied to Account Master pick-list** — Replace free-text location in event creation with searchable pick-list from Account Master. Depends on Account Master being populated.
      Source: `Prototype Review 00:16:51 – Leah: "is that tied to an account list?"` + `Chris: "this eventually should be a pick list off the account master."`

- [ ] `🔵 P2` **Campaign drill-through from ops events** — Link events back to campaign context for cross-org rollups.
      Source: `Call 1/4 00:34:50 – "the campaign is then the higher level from an event execution."`

- [ ] `🔵 P2` **Operational analytics in reports** — Educator utilization, cancellation analytics, event fill rate, campaign ROI rollups. Deferred to in-app reporting phase.
      Source: Derived from scoring/cancellation discussion at `Call 1/4 00:54:10` and depletions at `00:04:36`.

- [ ] `🔵 P2` **Draft events review pipeline** — Dedicated page for operators to review, edit, approve/reject draft events before going live. Includes review checklist, missing-field highlighting, approve/reject flow.
      Source: `Call 3/4 [00:27:25] – "event requests come in via emails, are fed into forms, and land in a holding table (draft events)."`

---

## 5. Cross-Cutting – Data, Schema & Integrations

- [x] `🟢 P1` API-ready schema with industry-standard identifiers for external BI integration (PowerBI in P1).
      Source: `Call 1/4 00:01:13 – "us having a good item master, not with just keys that are industry standard or identifiers that are industry standard."`

- [ ] `🟢 P1` Shared data models for account/item masters (imported by both ops and staff). Hierarchies as deep as possible now.
      → See §2 "Account profile data model" and §4 "Hart-level Account Master".
      Source: `Call 2/4 ~00:03 – "hierarchies as deep as possible now so we don't have to go back in and build it in later on."`

- [ ] `🟢 P1` Harmonize ops `EventRecord` and staff `EventItem` into shared base type.
      Source: Technical need derived from codebase review.

- [ ] `🟢 P1` **Nomenclature audit & updates** — Full audit: (1) Hart staff → "Operators" (cross-org view), (2) Org-scoped users → "Organization Members", (3) "Sales Tracking" → "Survey". Three standard org roles: Admin, Educator Manager, Educator. Role labels configurable per org. Covers sidebar labels, page titles, breadcrumbs across `ops/`, `staff/`, `educator/` components.
      Source: `Call 4/4 ~00:21:49 – "we call those operators to distinguish from organization members"` + `Prototype Review 00:16:11 – Chris: "rename it to survey as opposed to sales tracking."`

- [ ] `🔵 P2` Survey AI integration surface (Chris has existing tool — prepare data pipes and UI slots).
      → Phased with §1 "Quick photo capture" (P1 capture) and §8 "Survey AI Integration" (P3 AI).
      Source: `Call 1/4 00:13:39 – "I can tell you we're launching it now over the next two weeks."`

---

## 6. Process & Collaboration

- [ ] `🟢 P1` Obtain HEMS app demo access and AWS data access (reference only, don't clone).
      Source: `Call 1/4 00:05:46 – "I have a VIO that has all those tables of what's available. That'll be helpful for you guys."`

- [ ] `🟢 P1` **Capability Matrix & stakeholder alignment** — Formalized checklist of all current HEMS capabilities cross-referenced against new platform build status. Align with Chris's CSV matrix. Used for leadership updates and stakeholder sessions.
      Source: `Call 1/4 00:38:13` + `Call 4/4 ~00:09:52 – "I think it'd be good to have that lined up"` + `~00:13:43 – "I just want to start focusing on getting this all documented"`

- [ ] `🟢 P1` **Stakeholder demo prep** — Prepare prototypes and capability matrix for sessions with Leah and Larry. Anticipate "what's next" questions with roadmap visibility. Focus on pain points, avoid replicating old workflows.
      Source: `Call 1/4 01:00:32 – "Leah and Larry are probably the best ones to start off with."` + `Call 4/4 ~00:41:56 – "I want to nail down a timing for the stakeholder meeting."`

---

## 7. Platform Tiers `🔵 P2`

> Per Call 2/4 (~00:45-46), affiliate/market-ready expansion is Phase 2 ("Swagger").

- [ ] `🔵 P2` **Core / SaaS / Affiliate tier model** — Core (Hart): full view of all items, clients, campaigns. SaaS: scoped to single org/supplier. Affiliate: read-only of core-defined master data.

- [ ] `🔵 P2` **Visibility model** — Items added in SaaS become part of global Hart item master. Core view sees where items are used across tenants.

---

## 8. Future / At-Risk AI Work `⚪ P2–P3 / TBD`

> Items deferred to Phase 2+ or pending confirmation from Chris.

- [ ] `🔵 P2` **AI reference-image matching for setup photos (OCM)** — Match uploaded event photos against a reference image to validate correct table/display setup. Joe confirmed feasibility — deferred to Phase 2.
      Source: `Prototype Review 00:44:32 – Larry: "if we put a picture in of what an OCM table needs to look like and we match it up."`

- [ ] `⚪ TBD` **Social media photo task with optional filter** — Optional social-media-quality photo capture step, possibly with image filter for poor phone cameras. Phase/priority to be determined.
      Source: `Prototype Review 00:48:39 – Stephanie: "if we could also have some kind of social media picture required in this step."`

- [ ] `⚪ P3` **Email AI Management UI** — Standalone UI for inbound event request emails. Emails → AI draft → Human review → Push to HEMS.
      Source: `Call 2/4 00:49:03 – "I am calling a little bit of risk on our AI projects release... The UI sucks."`

- [ ] `⚪ P3` **Survey AI Integration (MVP)** — Mobile-friendly frontend for existing Survey AI. AI counts facings, identifies brands, reads prices from shelf photos.
      → Phased with §1 "Quick photo capture" (P1 capture) and §5 "Survey AI integration surface" (P2 data pipes).
      Source: `Call 2/4 00:50:12 – "the AI works as intended where it identifies how many facings are on a shelf... It's just the setup and the UI on it is not good."`

---

## Progress Summary

| Section                                 | Phase     | Done   | Partial | Not Started | Total  |
| --------------------------------------- | --------- | ------ | ------- | ----------- | ------ |
| §1 Mobile App – Educator                | P1/P2     | 10     | 0       | 2           | 12     |
| §2 Staff – Campaigns, Events & Reports  | P1/P2     | 10     | 0       | 3           | 13     |
| §3 Ops – Educator & Assignment Mgmt     | P1/P2     | 7      | 1       | 7           | 15     |
| §4 Ops – Monitoring, Accounts & Masters | P1/P2     | 0      | 1       | 8           | 9      |
| §5 Cross-Cutting                        | P1/P2     | 1      | 0       | 4           | 5      |
| §6 Process & Collaboration              | P1        | 0      | 0       | 3           | 3      |
| §7 Platform Tiers                       | P2        | 0      | 0       | 2           | 2      |
| §8 Future / AI Work                     | P2/P3/TBD | 0      | 0       | 4           | 4      |
| **Total**                               |           | **28** | **2**   | **33**      | **63** |

**Phase 1 tasks:** 47 total — 28 done, 2 partial, 17 not started (1 blocked)
**Phase 2 tasks:** 12 total — all not started
**Phase 3 / TBD tasks:** 4 total — all not started
