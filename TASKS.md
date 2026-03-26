<!-- Phase legend: 🟢 P1 = Phase 1 (V1, first 8 weeks)  ·  🔵 P2 = Phase 2 ("Swagger", post-launch)  ·  ⚪ P3 = Future / TBD -->
<!-- Status legend: [x] Done  ·  [~] Partial  ·  [ ] Not started  ·  🔴 Blocked -->

---

## 1. Mobile App – Educator `🟢 P1`

> **Status: Design specs finalized.** Native mobile app — no code yet. `[x]` marks below indicate requirements confirmed during client calls, not implemented features.

- [x] `🟢 P1` Make availability/calendar a primary tab and core flow; design reminders/pings to update availability.
      → See §4 "Educator availability calendar" for manager-facing view.
      Source: `CONTEXT.md 00:23:52 – "The big thing that needs to be front and center is um availability and having a calendar functionality built into here because one of the things that we're I'm instituting is from a process standpoint is to have the educators communicate via the app more"` + `00:25:09 – "we're moving that as a tab front and center. So that's a reminder and we and some of the ideas came up with some of the managers maybe even having something that pings them once in a while to hey don't forget to update update your availability"`

- [x] `🟢 P1` Treat location, push notifications, and camera as mandatory; design a non-optional permissions flow.
      Source: `CONTEXT.md 00:26:16 – "all those things need to be mandatory and it's one of the things we were talking about with the push notifications and location. And we've had issues just from a process standpoint where where the app doesn't work because of those functions because of those things were turned off. So I think having all that is mandatory or else it just doesn't work."`

- [x] `🟢 P1` Sales tracking as simple product counter (+/- per SKU) — calculates profit from units sold.
      → See §3 "Product sales counter model" for data module.
      Source: `CONTEXT.md 00:21:55 – "for that sales tracker, I would just want to be able to click off how many I think I I sold during the event."` + `00:11:14 – "So then that that creates a counter for each one."`

- [x] `🟢 P1` Rename "Sales Tracking" to "Survey" — fold shelf-recognition into venue intelligence / survey flows (photo now, process later).
  - Note: Chris confirmed the current prototype survey UI (take photos, review later) is exactly what he wants. AI backend processing is a separate standalone project (see §9).
    Source: `CONTEXT.md 00:16:11 – "I think we need to have rename it to survey as opposed to sales tracking."` + `00:20:16 – "we might need them to take a picture and walk away and come back and fill it out later"` + `00:35:47 – "the UI sucks. And in a matter of days, you guys have put together a better UI than they have in three months."`

- [x] `🟢 P1` Quick photo capture of shelf, backbar, coolers with offline save & complete-later support.
  - Chris: "extremely important, extremely."
    → Phased with §6 "Survey AI integration surface" (P2 data pipes) and §9 "Survey AI Integration" (P3 AI).
    Source: `CONTEXT.md 00:20:16 – "we might need them to take a picture and walk away and come back and fill it out later because if they have the picture, they can see what's there."` + `00:30:42 – "So having an offline mode, having the ability to save the pictures and then upload it later is extremely important, extremely."`

- [x] `🟢 P1` Brand guide section in-app — serving instructions, brand scripts, setup info (PDF-equivalent).
      → See §2 "Brand education content" for admin-side document management.
      Source: `CONTEXT.md 00:27:25 – "What drinks are served? Information about the brand... having educators pre-qualified like knowing who's been been qualified for this so that they get priority um would be helpful... that is a sheet of paper that has all the brand information, the setup information."` + `00:46:25 – "when you go back to the mobile app, you can then communicate visually to the educator what the bottle looks like, not making any assumptions of that and we're utilizing the brand assets."`

- [ ] `🔵 P2` Educator certification / pre-qualification per brand used in assignment priority.
      Source: `CONTEXT.md 00:27:25 – "having educators pre-qualified like knowing who's been been qualified for this so that they get priority um would be helpful"`

- [ ] `🔵 P2` Educator scoring capture in mobile event flows (reliability, cancellations, certifications). Actual scoring is phase 2, but data capture points should exist.
      → See §4 "Educator scoring foundation" — §4 is the foundation this builds on.
      Source: `CONTEXT.md 00:54:10 – "we're tagging that this this educator canceled... it needs to be part of a scoring process with the educators."` + `01:09:02 – "educator profiles there is a lot of detail in the educators we currently capture... there was an educator rating which we're not really utilizing yet. All that's definitely important important with that."`

---

## 2. Staff Platform – Campaign & Event Depth `🟢 P1`

Campaign creation was too shallow and events didn't inherit from campaigns. Chris's biggest feedback area — **largely addressed.**

- [x] `🟢 P1` **Expand campaign creation** — Added: supplier, distributors, target markets/geography, anticipated event count, linked products, objectives, channels. Campaign detail shows context panel.
      Source: `CONTEXT.md 00:34:50 – "So like with the campaigns, linking that over to more more more things like um which which suppliers, which distributors, what what markets... Like all that information is important because that that will all trickle into the events."`

- [x] `🟢 P1` **Event creation inherits from campaign** — Events pre-populate objectives, products, venue type from parent campaign/activity. Old `event-wizard.tsx` removed; events created via `/staff/events/create?campaign={id}`. Campaign → Activity → Event hierarchy implemented with `activity-data.ts`.
      Source: `CONTEXT.md 00:51:06 – "That's why I was saying having as much detail in the campaign easier for for creating the events because then that's just pull from the campaign and regurgitate it. Just assign sign the account and the date and time."`

  > ⚠️ **Account assignment at activity/event level is not yet implemented.** 🔴 Blocked on Account Master — staging DB not publicly accessible, distributor flat-file import not set up. Once accounts exist, they should be assignable at the activity/event level (Call 2, ~06:21).

- [x] `🟢 P1` **Output-first report preview** — Projected impact merged into objectives step (step 3) as a live sidebar. Wizard reduced from 5 to 4 steps.
      Source: `CONTEXT.md 00:50:03 – "showing the outputs up front is extremely important and that's going to flip everyone's thinking... from their perspective, seeing how effective this is going to be and some projections off of that is going to be very powerful as you start build these campaigns."`

- [ ] `🔵 P2` **"What if" adjustment suggestions** — When projections are weak, suggest what to change (account, day, venue type). Depends on having real account/event history data.
      Source: `CONTEXT.md 00:41:02 – "if this is not not going to be projected as good what do I need to do to make this better?"`

- [x] `🟢 P1` **Structured questionnaire system** — Implemented in `questionnaire-data.ts` with default questions, campaign-specific templates, multiple question types (rating, yes-no, multiple-choice, open-text), and `getQuestionnaireForCampaign()` helper.
      Source: `CONTEXT.md 00:29:31 – "it being a catchall is a problem because then we're not capturing this information as data."` + `00:48:55 – "there's stuff I I call questionnaires where it's specific to that those those campaigns and events that would need to be tweaked."`

- [x] `🟢 P1` **Brand education content** — Expand brand assets beyond SKUs to include serving instructions, brand scripts, setup info, evaluation sheets. Link to campaigns. Admin-side ability to attach/manage documents per brand/campaign/event.
      → See §1 "Brand guide section in-app" for mobile consumption.
      Source: `CONTEXT.md 00:27:25 – "one of the things that we also include is um PDFs on the information of the event like how do you how do you serve the drink? What drinks are served? Information about the brand... that is a sheet of paper that has all the brand information, the setup information."`

- [x] `🟢 P1` **Connect item master to campaigns/events** — `EventItem` has `linkedProductIds`, Activities define product subsets. Products at campaign level flow to events.
      → See §5 "Hart-level Item Master" (CRUD UI) and §6 "Shared data models".
      Source: `CONTEXT.md 00:21:55 – "from a from an event structure is going back to the item master being linked into there with this campaign. We know what products I'm going to be done going to be sampled in this this campaign."`

---

## 3. Staff Platform – Data Foundations & AI

New capabilities Chris identified as key differentiators.

- [x] `🟢 P1` 🟢 **Account profile data model** — Track per-account: displays, cold boxes, windows, venue characteristics. Shared `Account` entity created in `@/lib/account-types.ts` with mock data.
      → See §5 "Hart-level Account Master" (UI, blocked) and §6 "Shared data models" (shared types).
      Source: `CONTEXT.md 00:20:16 – "for the account profile we want to track how many displays are in the account how many cold boxes if there's wind windows so all the things that we're surveying we're keeping tabs and creating a profile as to what that account is."`

- [ ] `🔵 P2` **AI prescriptive suggestion engine (mock)** — Suggest accounts, days, event types based on history. Chris: "no one's doing that right now." Key differentiator but requires account/event history.
      Source: `CONTEXT.md 00:50:03 – "knowing the competition, no one's doing that right now."` + `00:42:01 – "if we have an account master and these account profiles and now we know more about these accounts... the AI can then learn more about the types of accounts."`

- [x] `🟢 P1` **Product sales counter model** — Sales Volume Tracker data module in `event-data.ts` tracks units sold by SKU. Mapped to "Drive Sales" objective.
      → See §1 "Sales tracking as simple product counter" for mobile UI.
      Source: `CONTEXT.md 00:21:55 – "I would just want to be able to click off how many I think I I sold during the event."`

- [ ] `🔵 P2` **Distributor depletions integration surface** — Placeholder in reports for "Event Impact vs. Distributor Sales." Phase 2 integration, but design the UI slot now.
      Source: `CONTEXT.md 00:04:36 – "lining that up with those sales and saying... We can start and then driving deriving the actual sales velocity and the influence of doing these events and put a dollar figure on it."`

- [x] `🟢 P1` **PowerBI for Phase 1 Reporting** — Punt complex in-app reporting to PowerBI for first 8 weeks. In-app dashboards deferred to P2.
      Source: `CONTEXT.md 00:44:15 – "I punted the reporting into PowerBI for for the this goound for the first eight weeks and then it would be like for swagger that would be integrated into a web portal"`

---

## 4. Ops Platform – Educator & Assignment Management `🟢 P1`

Chris spent the most time on this — largest missing area. Educator management is core to Hart operations.

- [x] `🟢 P1` **Educator roster page** — `educators-page.tsx` with metrics, search, multi-filters, quality scores, pagination. `educator-data.ts` created with 12 mock educators. Linked in ops sidebar navigation and routed at `/ops/dashboard/educators`.
      Source: `CONTEXT.md 00:52:05 – "having that the educators to pull from as to who's available who matches the the geography... here's availability and here's the score of the educators. These are the people you should you should consider."`

- [ ] `🟢 P1` **Educator availability calendar** — Calendar view by day/week. Chris: "the big thing that needs to be front and center." Highest-priority educator feature.
      → See §1 "Make availability/calendar a primary tab" for educator-facing mobile view.
      Source: `CONTEXT.md 00:23:52 – "The big thing that needs to be front and center is um availability and having a calendar functionality built into here because one of the things that we're I'm instituting is from a process standpoint is to have the educators communicate via the app more."`

- [ ] `🟢 P1` **Geography-based educator-event matching** — Match by proximity (home address vs venue), availability, skill set. Surface ranked list for manager selection.
      Source: `CONTEXT.md 00:52:05 – "we try to to put and put the educators that from their home their home address close to the event so they don't have to drive two three hours away. So have having that geol location where it knows the address of the the account and the address of the the educator."`

- [ ] `🟢 P1` **Cancellation & change management flow** — Educator reports issue → manager decides → re-assignment → reason tagged to educator record.
      Source: `CONTEXT.md 00:54:10 – "that cancellation process needs to be captured... the educator does not have the the power to cancel it, but we're capturing what's going on and at least it's communicated. The manager makes that that that end call."`

- [~] `🟢 P1` **Educator scoring foundation** — Quality score display in `educators-page.tsx` with color coding and trend tracking. **Partial:** UI displays scores but no data capture flow for cancellations, certifications, or on-time rate.
  → See §1 "Educator scoring capture" — mobile data capture points (P2) that build on this foundation.
  Source: `CONTEXT.md 00:54:10 – "we're tagging that this this educator canceled... it needs to be part of a scoring process with the educators."`

- [ ] `🟢 P1` **Assignment offer flow** — Educators are contractors. Show pending offers, accepted assignments, declined offers. Chris: "a suggestion saying hey we have this opportunity."
      Source: `CONTEXT.md 00:52:05 – "it's basically a suggestion saying hey we have this opportunity. Do you accept it or not? And that's done in the app."`

---

## 5. Ops Platform – Monitoring & Masters

Expand ops beyond organization/event monitoring into data stewardship.

- [~] `🟢 P1` 🔴 **Hart-level Account Master** — `accounts-page.tsx` created with type/status filters, contact info, events hosted. **Partial:** Not linked in ops sidebar; `account-data.ts` missing. **Blocked on staging DB + distributor flat-file import.** Chris: "Heart would have our own master... everyone's structure is going to be the same."
  → See §3 "Account profile data model" (type created) and §6 "Shared data models". > ⚠️ `accounts-page.tsx` exists with filters & detail view but is NOT linked in the ops sidebar — inaccessible to users.
  Source: `CONTEXT.md 00:02:15 – "we would have our own so heart would have our own master... everyone's everyone's structure is going to be the same."`

- [ ] `🟢 P1` **Hart-level Item Master** — Simple UI to add new items (product name, distributor_id, supplier_id, hart_item_id). New items globally available. Central product catalog with industry-standard identifiers.
      → See §2 "Connect item master" (done — products linked to campaigns) and §6 "Shared data models".
      Source: `CONTEXT.md 00:02:15 – "having an item master where we're capturing the right information. Same thing with the account account information so that this can then be lined up with with other data insights and analytics."` · `HART_CLIENT_CALL_NOTES §2`

- [ ] `🟢 P1` **Educator-related dashboard metrics** — Add to ops dashboard: total educators, active assignments today, unassigned events (gap alerts), cancellation rate, availability coverage.
      Source: Derived from educator management discussion (§4 sources). No single quote — aggregated need.

- [ ] `🔵 P2` **Campaign drill-through from ops events** — Link events back to campaign context for cross-org rollups. `EventRecord` currently has `campaignName` as a string only.
      Source: `CONTEXT.md 00:34:50 – "the campaign is then the higher level from an event execution and all the events are all like the activities that go along with that campaign."`

- [ ] `🔵 P2` **Operational analytics in reports** — Educator utilization, cancellation analytics, event fill rate, campaign ROI rollups. Deferred to in-app reporting phase (PowerBI handles P1).
      Source: Derived from scoring/cancellation discussion at `CONTEXT.md 00:54:10` and depletions at `00:04:36`. No single quote — aggregated need.

- [ ] `🔵 P2` **Draft events review pipeline** — Dedicated page in ops for operators to review, edit, and approve/reject draft events before they are pushed live. Draft events may originate from manual/Excel upload or (future) AI email processor. Includes review checklist, missing-field highlighting, and approve/reject flow.
      Source: `Call 3/4 [00:27:25] – "event requests come in via emails, are fed into forms, and land in a holding table (draft events). The operator then ensures everything is set up correctly, approves it, and sends it off."` + `[00:45:16] – "The operator will then primarily use the draft section to quickly check and finalize events."`

---

## 6. Cross-Cutting – Data Schema & Integrations

- [ ] `🟢 P1` Shared data models for account/item masters (imported by both ops and staff). Hierarchies as deep as possible now — Chris: "so we don't have to go back in and build it in later."
      → See §3 "Account profile data model" and §5 "Hart-level Account Master".
      Source: `CONTEXT.md 00:02:15 – "heart would have our own master... everyone's structure is going to be the same."` · Call 2 ~00:03 – "hierarchies as deep as possible now so we don't have to go back in and build it in later on when we need to start slicing and dicing the information"

- [x] `🟢 P1` API-ready schema with industry-standard identifiers for external BI integration (PowerBI in P1).
      Source: `CONTEXT.md 00:01:13 – "us having a good item master, not with just keys that are industry standard or identifiers that are industry standard... this can then be lined up with with other data insights and analytics."`

- [ ] `🔵 P2` Survey AI integration surface (Chris has existing tool — prepare data pipes and UI slots).
      → Phased with §1 "Quick photo capture" (P1 capture) and §9 "Survey AI Integration" (P3 AI).
      Source: `CONTEXT.md 00:13:39 – "So on this part I can tell you and we're launching it now over the next two weeks."`

- [ ] `🟢 P1` Harmonize ops `EventRecord` and staff `EventItem` into shared base type.
      Source: Technical need derived from codebase review — no direct Chris quote.

---

## 7. Platform Tier Structure `🔵 P2`

> Per Call 2 (~00:45-46), affiliate/market-ready expansion is Phase 2 ("Swagger").

- [ ] `🔵 P2` **Core / SaaS / Affiliate tier model** — Core (Hart): full view of all items, clients, campaigns. SaaS: scoped to single org/supplier. Affiliate: read-only of core-defined master data.
      Source: `HART_CLIENT_CALL_NOTES §3`

- [ ] `🔵 P2` **Visibility model** — Items added in SaaS become part of global Hart item master. Core view sees where items are used across tenants.
      Source: `HART_CLIENT_CALL_NOTES §3`

---

## 8. Process & Collaboration

- [ ] `🟢 P1` Obtain HEMS app demo access and AWS data access (reference only, don't clone).
      Source: `CONTEXT.md 00:05:46 – "I'm moving everything over into into that that folder... I have a VIO that has all those tables of what's available. That'll be helpful for you guys at least to see what it is."`

- [ ] `🟢 P1` Prepare stakeholder sessions with Leah and Larry — focus on pain points, avoid replicating old workflows.
      Source: `CONTEXT.md 01:00:32 – "I'm going to say Leah and Larry are probably the best ones for us to start off with."`

- [ ] `🟢 P1` **Capability Matrix / Product Spec** — Formalized document logging all capabilities in V1 vs future phases. Align with Chris's capability matrix for leadership updates.
      Source: `CONTEXT.md 00:38:13 – "I can have something I can go back to leadership and saying this is what we're doing and this is where we are"` + `00:43:11 – "we're going off of the same list and we're checking things off"` + `00:46:32 – "we can reformat it fairly easily to give you like what you need."`

---

## 9. Optional / At-Risk AI Work `⚪ P3 / TBD`

> Chris flagged existing AI features as "at risk" due to poor UI. Wait for Chris's confirmation before starting. Create tickets only if agreed to pick up.

- [ ] `⚪ P3` **Email AI Management UI** — Standalone UI for inbound event request emails. Emails → AI draft → Human review → Push to HEMS.
      Source: `CONTEXT.md 00:49:03 – "I am calling a little bit of risk on our AI projects release... The UI sucks"` + `00:51:32 – "the way that process works is it's capturing the emails trying to determine if there's enough information... It could be a separate management points. It doesn't have to be like native within it."`

- [ ] `⚪ P3` **Survey AI Integration (MVP)** — Mobile-friendly frontend for existing Survey AI. AI counts facings, identifies brands, reads prices from shelf photos.
      → Phased with §1 "Quick photo capture" (P1 capture) and §6 "Survey AI integration surface" (P2 data pipes).
      Source: `CONTEXT.md 00:50:12 – "the AI works as intended where it identifies how many facings are on a shelf. It tries to identify the brand... It's just the setup and the UI on it is not good."` + `00:51:32 – "It wouldn't even be a full roll out. it just be an MVP that would be tested just to get the feedback... just solely focus on the survey part of it"`

---

## 10. Tasks Definition Call 4/4 `🟢 P1`

> Tasks, polishments, and enhancements identified during Definition Call 4/4 (March 20, 2026) and the Enhancement Documents (Account Management, Educator Management, Cancellation Process) shared by Chris.

### Prototype Polishments

- [x] `🟢 P1` **Manager edit-before-finalize** — Allow educator managers to edit educator notes and free-form questionnaire text before approving/finalizing an event. Needed to fix unprofessional language before submissions reach clients.
      Source: `Call 4/4 ~00:31:09 – "the free form text. We definitely need opportunity for the manager to be able to change that before approving and submitting so that there isn't any, oh, the customers hate it."`

- [x] `🟢 P1` **Questionnaire hardcoded answer options** — Add selectable dropdown answers for event questionnaire templates alongside free-form text. Chris will share the specific answer sets.
      Source: `Call 4/4 ~00:32:17 – "there's some hardcoded stuff that I think would be good to have in there as a selection for the answers"`

- [x] `🟢 P1` **Educator full address in profile** — Replace "home area" with actual street address in educator profile. Required for accurate drive-distance calculation to event venues (e.g., cross-borough travel in NYC). Distance display moved to event detail page's assigned educators card for proper context.
      Source: `Call 4/4 ~00:34:48 – "It would need to be an actual address because what we do is we take their home address to know the drive distance or travel distance to an event"`

- [x] `🟢 P1` **Admin access to educator manager features** — Admin role should have access to the educator manager assignment view to cover for absent/sick managers. ✅ Added Educator Assignment section to ops event-detail-page with assignment modal, status badges, and manage/remove actions.
      Source: `Call 4/4 ~00:38:39 – "If I'm an admin, an admin should have access to the manager assignments as well because there may be a time where they need like to cover somebody who's out"`

### Cancellation Process

> Detailed flow from the Enhancement Doc: "Manager Event Cancellation Process (Mobile App - HEMS)". Currently entirely manual (phone/text/email) with no in-app support.

- [ ] `🟢 P1` **Mobile: Educator day-of cancel tagging** — Educator can tag an event as cancelled _only on the day of the event_ upon arrival/attempt to arrive. This action forces direct communication (phone call, text, or chat) with the manager before any status change. Educator cannot unilaterally cancel.
      Source: `Enhancement Doc – Cancellation Process: "Allow for Educator to tag Event as Cancelled with Manager Approval" + "Force direction communication with Manager to confirm via conversation (text, Phone Call, or chat Only)"`

- [ ] `🟢 P1` **Web: Manager formal cancellation approval** — Manager receives a formal approval flow in the web portal for cancellation requests. Captures structured cancellation reason, handles partial educator compensation (travel time/kit pickup), and triggers supplier billing adjustments. Replaces the current email-based manual process.
      Source: `Enhancement Doc – Cancellation Process: "Manager needs formal approval process for the Canceled Event" + "Billing for Educator process is in place" + "Supplier / Client Billing for cancelled process"`

- [ ] `🟢 P1` **Clean cancelled-event data in reports** — Cancelled events must use structured cancellation reason fields instead of empty surveys with zeros. Reports must clearly distinguish "cancelled" from "failed" events. Campaign reviews should not show blank data for cancellations.
      Source: `Enhancement Doc – Cancellation Process: "HEMs Application retained cancelled events even in Reporting (shows blanks without any reason for cancelation), Event shows executed and doesn't have any proper tagging for Cancelation"`

### Educator Management Enhancements

- [ ] `🟢 P1` **Educator list sort by geography** — Educator roster must be sortable by neighborhoods/zip codes and by manager geography/territory.
      Source: `Enhancement Doc – Educator Mgmt: "Sorts by Areas of Geography aligned by Neighborhoods (Needs zip codes or reference Table)" + "Sorts by Manager Geography"`

- [ ] `🟢 P1` **Educator metrics data capture** — Capture per educator: Retail Sales Reported Average, Preferred Brands, Preferred Categories, Check-in Score, Event Completed to End Time Average, Retailer Survey Score, Cancellation Rating.
      Source: `Enhancement Doc – Educator Mgmt – Acceptance Criteria: Metrics section`

- [ ] `🔵 P2` **Auto-suggestion for educator assignment** — Use address proximity, cancellation rate, preferred category/brand/event type, and average sales rate to auto-rank educators for manager selection. Show short list + access to full list.
      Source: `Capabilities Matrix – "Educator Scores / Auto Assignment" = Phase 2` + `Enhancement Doc – Educator Mgmt: "Uses Address of Educator and Events to provide closest Educator" + "Highlights Educators with Poor Cancellation Rate or Poor Score"`

### Account Management Enhancements

- [ ] `🟢 P1` **Account metrics & profiling** — Track per-account: Retail Sales avg, Preferred Brands, Preferred Categories, Check-in Score, Event Execution Score, Cancellation Rating. Prepare foundation for event insights and campaign reviews.
      Source: `Enhancement Doc – Account Mgmt – Acceptance Criteria: Metrics section`

- [ ] `🟢 P1` **Account data linkage keys** — Handle key identifiers for Distributor, Supplier, and Data Provider clients. Prepare VIP Master Account Data setup. Enable geo-coding and address standardization.
      Source: `Enhancement Doc – Account Mgmt: "Handle Key Identifiers for Distributor, Supplier, Data Provider" + "Handle VIP Master Account Data Setup" + "Geo Coding / Address"`

### Nomenclature & Process

- [ ] `🟢 P1` **Nomenclature updates** — Top-level Hart staff = "Operators" (cross-org view). Org-scoped users = "Organization Members". Three standard org roles: Admin, Educator Manager, Educator. Role labels (e.g., "Educator" vs "Brand Ambassador" vs "Salesperson") configurable per organization.
      Source: `Call 4/4 ~00:21:49 – Ethan proposed, Chris approved: "we call those operators to distinguish from organization members" + "should be configurable at an organization level"`

- [ ] `🟢 P1` **Capability Matrix / Stakeholder Checklist** — Create a visual checklist of all current HEMS capabilities cross-referenced against the new platform build status. Used for leadership updates and stakeholder sessions. Align with the CSV matrix Chris shared.
      Source: `Call 4/4 ~00:09:52 – "I think it'd be good to have that lined up just to be prepared so that we're more buttoned up and talking about, okay, here's what we're building out"` + `~00:13:43 – "I just want to start focusing on getting this all documented"`

- [ ] `🟢 P1` **Stakeholder demo prep** — Prepare current prototypes and capabilities matrix for upcoming stakeholder sessions. Anticipate "what's next" questions with roadmap visibility. Chris wants sessions as early as next week.
      Source: `Call 4/4 ~00:41:56 – "I want to nail down a timing that we can do the stakeholder meeting... show where we're at right now"`

---

## 11. Prototype Review – Quick Wins `🟢 P1`

> Tasks identified during the HEMs Prototype Review call (March 24, 2026) — stakeholder feedback translated into focused, low-risk UI/UX improvements.

- [X] `🟢 P1` **Educator score/rating in mobile app** — Display the educator's own `avgRating` (numeric + star visual) on the educator mobile dashboard and profile screen. Score data already exists in `educator-roster-data.ts` and is shown to managers; surface it to the educator themselves for transparency and self-improvement.
      Source: `Prototype Review 00:33:36 – "if you're a 2.7, you know you got to up your game. If you're a five, you know you're doing great. I think it would incentivize them to improve their performance."`

- [X] `🟢 P1` **Sales target & bonus display in tracking** — In the Sales Volume Tracker (educator mobile event flow), add a visible target (e.g., "Target: 6 bottles") and optional bonus threshold (e.g., "Bonus at: 12 bottles") with a progress bar or % indicator. Add `target` and `bonusThreshold` fields to the `sales-volume` data module in `event-data.ts`.
      Source: `Prototype Review 00:43:48 – "expectation is six bottles. If you want the bonus, you sell 12 bottles."` + `Stephanie: "it would encourage them to reach at least a certain amount of units sold."`

- [X] `🟢 P1` **Samples pickup & evaluations checkboxes** — In the manager finalization flow (Approve & Finalize queue in `events-page.tsx`), add pre-approval checkboxes: `☐ Samples Picked Up`, `☐ Evaluations Received`. These confirm physical items were collected before the event can be approved.
      Source: `Prototype Review 00:29:04 – Chris: "evaluations and samples pickups because that's also part of this process here for the managers to ensure that the samples and the evaluation form is picked up."`

- [X] `🟢 P1` **Late check-in / early check-out visual flags** — On the educator manager's event detail view, display conditional badges: 🟨 *Late Check-in* (checked in > threshold after scheduled start) / 🟥 *Early Check-out* (checked out before scheduled end). Add `scheduledStart`, `actualCheckIn`, `scheduledEnd`, `actualCheckOut` mock timestamps to event data. Feeds into educator scoring.
      Source: `Prototype Review 00:39:32 – "If I check in at 3:20, maybe a yellow flag pops up … I leave at 4:45, a red flag pops up. I love those conditionals."` + `Joe: "that can feed into the scoring mechanism as well."`

- [ ] `🟢 P1` **Nomenclature audit & updates** — Full audit and update of user-facing labels across all platforms: (1) Top-level Hart staff → "Operators" (cross-org view), (2) Org-scoped users → "Organization Members", (3) "Sales Tracking" → "Survey" where applicable. Covers sidebar labels, page titles, breadcrumbs across `ops/`, `staff/`, `educator/` components.
      → Extends §10 nomenclature item with actionable scope.
      Source: `Prototype Review 00:16:11 – Chris: "I think we need to rename it to survey as opposed to sales tracking."` + `Call 4/4 ~00:21:49 – "we call those operators to distinguish from organization members."`

---

## Progress Summary

| Section                       | Phase | Done   | Partial | Not Started | Total  |
| ----------------------------- | ----- | ------ | ------- | ----------- | ------ |
| §1 Mobile App – Educator      | P1/P2 | 6      | 0       | 2           | 8      |
| §2 Staff – Campaign & Event   | P1/P2 | 6      | 0       | 1           | 7      |
| §3 Staff – Data Foundations   | P1/P2 | 3      | 0       | 2           | 5      |
| §4 Ops – Educator Mgmt        | P1    | 1      | 1       | 4           | 6      |
| §5 Ops – Monitoring & Masters | P1/P2 | 0      | 1       | 5           | 6      |
| §6 Cross-Cutting              | P1/P2 | 1      | 0       | 3           | 4      |
| §7 Platform Tiers             | P2    | 0      | 0       | 2           | 2      |
| §8 Process & Collaboration    | P1    | 0      | 0       | 3           | 3      |
| §9 At-Risk AI Work            | P3    | 0      | 0       | 2           | 2      |
| §10 Tasks Definition Call 4/4 | P1/P2 | 1      | 0       | 14          | 15     |
| §11 Prototype Review Wins     | P1    | 0      | 0       | 5           | 5      |
| **Total**                     |       | **18** | **2**   | **43**      | **63** |

**Phase 1 tasks:** 50 total — 18 done, 2 partial, 30 not started (1 blocked)
**Phase 2 tasks:** 11 total — all not started
**Phase 3 / TBD tasks:** 2 total — all not started
