<!-- Phase legend: 🟢 P1 = Phase 1 (V1, first 8 weeks)  ·  🔵 P2 = Phase 2 ("Swagger", post-launch)  ·  ⚪ P3 = Future / TBD -->
<!-- Status legend: [x] Done  ·  [~] Partial  ·  [ ] Not started  ·  🔴 Blocked -->

---

## 1. Mobile App – Educator `🟢 P1`

> **Status: Not started.** Native mobile app scope — none of these are in the current web prototype. All are Phase 1 requirements per Chris (Call 1).

- [x] `🟢 P1` Make availability/calendar a primary tab and core flow; design reminders/pings to update availability.
      Source: `CONTEXT.md 00:23:52 – "The big thing that needs to be front and center is um availability and having a calendar functionality built into here because one of the things that we're I'm instituting is from a process standpoint is to have the educators communicate via the app more"` + `00:25:09 – "we're moving that as a tab front and center. So that's a reminder and we and some of the ideas came up with some of the managers maybe even having something that pings them once in a while to hey don't forget to update update your availability"`

- [x] `🟢 P1` Treat location, push notifications, and camera as mandatory; design a non-optional permissions flow.
      Source: `CONTEXT.md 00:26:16 – "all those things need to be mandatory and it's one of the things we were talking about with the push notifications and location. And we've had issues just from a process standpoint where where the app doesn't work because of those functions because of those things were turned off. So I think having all that is mandatory or else it just doesn't work."`

- [x] `🟢 P1` Sales tracking as simple product counter (+/- per SKU) — calculates profit from units sold.
      Source: `CONTEXT.md 00:21:55 – "for that sales tracker, I would just want to be able to click off how many I think I I sold during the event."` + `00:11:14 – "So then that that creates a counter for each one."`

- [x] `🟢 P1` Rename "Sales Tracking" to "Survey" — fold shelf-recognition into venue intelligence / survey flows (photo now, process later).
  - Note: Chris confirmed the current prototype survey UI (take photos, review later) is exactly what he wants. AI backend processing is a separate standalone project (see §9).
    Source: `CONTEXT.md 00:16:11 – "I think we need to have rename it to survey as opposed to sales tracking."` + `00:20:16 – "we might need them to take a picture and walk away and come back and fill it out later"` + `00:35:47 – "the UI sucks. And in a matter of days, you guys have put together a better UI than they have in three months."`

- [x] `🟢 P1` Quick photo capture of shelf, backbar, coolers with offline save & complete-later support.
  - Chris: "extremely important, extremely."
    Source: `CONTEXT.md 00:20:16 – "we might need them to take a picture and walk away and come back and fill it out later because if they have the picture, they can see what's there."` + `00:30:42 – "So having an offline mode, having the ability to save the pictures and then upload it later is extremely important, extremely."`

- [x] `🟢 P1` Brand guide section in-app — serving instructions, brand scripts, setup info (PDF-equivalent).
      Source: `CONTEXT.md 00:27:25 – "What drinks are served? Information about the brand... having educators pre-qualified like knowing who's been been qualified for this so that they get priority um would be helpful... that is a sheet of paper that has all the brand information, the setup information."` + `00:46:25 – "when you go back to the mobile app, you can then communicate visually to the educator what the bottle looks like, not making any assumptions of that and we're utilizing the brand assets."`

- [ ] `🔵 P2` Educator certification / pre-qualification per brand used in assignment priority.
      Source: `CONTEXT.md 00:27:25 – "having educators pre-qualified like knowing who's been been qualified for this so that they get priority um would be helpful"`

- [ ] `🔵 P2` Educator scoring capture in mobile event flows (reliability, cancellations, certifications). Actual scoring is phase 2, but data capture points should exist.
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
      Source: `CONTEXT.md 00:27:25 – "one of the things that we also include is um PDFs on the information of the event like how do you how do you serve the drink? What drinks are served? Information about the brand... that is a sheet of paper that has all the brand information, the setup information."`

- [x] `🟢 P1` **Connect item master to campaigns/events** — `EventItem` has `linkedProductIds`, Activities define product subsets. Products at campaign level flow to events.
      Source: `CONTEXT.md 00:21:55 – "from a from an event structure is going back to the item master being linked into there with this campaign. We know what products I'm going to be done going to be sampled in this this campaign."`

---

## 3. Staff Platform – Data Foundations & AI

New capabilities Chris identified as key differentiators.

- [ ] `🟢 P1` 🔴 **Account profile data model** — Track per-account: displays, cold boxes, windows, venue characteristics. No `Account` entity exists yet. **Blocked on staging DB access and Account Master (§5.1).**
      Source: `CONTEXT.md 00:20:16 – "for the account profile we want to track how many displays are in the account how many cold boxes if there's wind windows so all the things that we're surveying we're keeping tabs and creating a profile as to what that account is."`

- [ ] `🔵 P2` **AI prescriptive suggestion engine (mock)** — Suggest accounts, days, event types based on history. Chris: "no one's doing that right now." Key differentiator but requires account/event history.
      Source: `CONTEXT.md 00:50:03 – "knowing the competition, no one's doing that right now."` + `00:42:01 – "if we have an account master and these account profiles and now we know more about these accounts... the AI can then learn more about the types of accounts."`

- [x] `🟢 P1` **Product sales counter model** — Sales Volume Tracker data module in `event-data.ts` tracks units sold by SKU. Mapped to "Drive Sales" objective.
      Source: `CONTEXT.md 00:21:55 – "I would just want to be able to click off how many I think I I sold during the event."`

- [ ] `🔵 P2` **Distributor depletions integration surface** — Placeholder in reports for "Event Impact vs. Distributor Sales." Phase 2 integration, but design the UI slot now.
      Source: `CONTEXT.md 00:04:36 – "lining that up with those sales and saying... We can start and then driving deriving the actual sales velocity and the influence of doing these events and put a dollar figure on it."`

- [ ] `🟢 P1` **PowerBI for Phase 1 Reporting** — Punt complex in-app reporting to PowerBI for first 8 weeks. In-app dashboards deferred to P2.
      Source: `CONTEXT.md 00:44:15 – "I punted the reporting into PowerBI for for the this goound for the first eight weeks and then it would be like for swagger that would be integrated into a web portal"`

---

## 4. Ops Platform – Educator & Assignment Management `🟢 P1`

Chris spent the most time on this — largest missing area. Educator management is core to Hart operations.

- [~] `🟢 P1` **Educator roster page** — `educators-page.tsx` created with metrics, search, multi-filters, quality scores, pagination. **Partial:** Not linked in ops sidebar navigation; backing `educator-data.ts` file missing (imported but not created).
  Source: `CONTEXT.md 00:52:05 – "having that the educators to pull from as to who's available who matches the the geography... here's availability and here's the score of the educators. These are the people you should you should consider."`

- [ ] `🟢 P1` **Educator availability calendar** — Calendar view by day/week. Chris: "the big thing that needs to be front and center." Highest-priority educator feature.
      Source: `CONTEXT.md 00:23:52 – "The big thing that needs to be front and center is um availability and having a calendar functionality built into here because one of the things that we're I'm instituting is from a process standpoint is to have the educators communicate via the app more."`

- [ ] `🟢 P1` **Geography-based educator-event matching** — Match by proximity (home address vs venue), availability, skill set. Surface ranked list for manager selection.
      Source: `CONTEXT.md 00:52:05 – "we try to to put and put the educators that from their home their home address close to the event so they don't have to drive two three hours away. So have having that geol location where it knows the address of the the account and the address of the the educator."`

- [ ] `🟢 P1` **Cancellation & change management flow** — Educator reports issue → manager decides → re-assignment → reason tagged to educator record.
      Source: `CONTEXT.md 00:54:10 – "that cancellation process needs to be captured... the educator does not have the the power to cancel it, but we're capturing what's going on and at least it's communicated. The manager makes that that that end call."`

- [~] `🟢 P1` **Educator scoring foundation** — Quality score display in `educators-page.tsx` with color coding and trend tracking. **Partial:** UI displays scores but no data capture flow for cancellations, certifications, or on-time rate.
  Source: `CONTEXT.md 00:54:10 – "we're tagging that this this educator canceled... it needs to be part of a scoring process with the educators."`

- [ ] `🟢 P1` **Assignment offer flow** — Educators are contractors. Show pending offers, accepted assignments, declined offers. Chris: "a suggestion saying hey we have this opportunity."
      Source: `CONTEXT.md 00:52:05 – "it's basically a suggestion saying hey we have this opportunity. Do you accept it or not? And that's done in the app."`

---

## 5. Ops Platform – Monitoring & Masters

Expand ops beyond organization/event monitoring into data stewardship.

- [~] `🟢 P1` 🔴 **Hart-level Account Master** — `accounts-page.tsx` created with type/status filters, contact info, events hosted. **Partial:** Not linked in ops sidebar; `account-data.ts` missing. **Blocked on staging DB + distributor flat-file import.** Chris: "Heart would have our own master... everyone's structure is going to be the same."
  Source: `CONTEXT.md 00:02:15 – "we would have our own so heart would have our own master... everyone's everyone's structure is going to be the same."`

- [ ] `🟢 P1` **Hart-level Item Master** — Simple UI to add new items (product name, distributor_id, supplier_id, hart_item_id). New items globally available. Central product catalog with industry-standard identifiers.
      Source: `CONTEXT.md 00:02:15 – "having an item master where we're capturing the right information. Same thing with the account account information so that this can then be lined up with with other data insights and analytics."` · `HART_CLIENT_CALL_NOTES §2`

- [ ] `🟢 P1` **Educator-related dashboard metrics** — Add to ops dashboard: total educators, active assignments today, unassigned events (gap alerts), cancellation rate, availability coverage.
      Source: Derived from educator management discussion (§4 sources). No single quote — aggregated need.

- [ ] `🔵 P2` **Campaign drill-through from ops events** — Link events back to campaign context for cross-org rollups. `EventRecord` currently has `campaignName` as a string only.
      Source: `CONTEXT.md 00:34:50 – "the campaign is then the higher level from an event execution and all the events are all like the activities that go along with that campaign."`

- [ ] `🔵 P2` **Operational analytics in reports** — Educator utilization, cancellation analytics, event fill rate, campaign ROI rollups. Deferred to in-app reporting phase (PowerBI handles P1).
      Source: Derived from scoring/cancellation discussion at `CONTEXT.md 00:54:10` and depletions at `00:04:36`. No single quote — aggregated need.

---

## 6. Cross-Cutting – Data Schema & Integrations

- [ ] `🟢 P1` Shared data models for account/item masters (imported by both ops and staff). Hierarchies as deep as possible now — Chris: "so we don't have to go back in and build it in later."
      Source: `CONTEXT.md 00:02:15 – "heart would have our own master... everyone's structure is going to be the same."` · Call 2 ~00:03 – "hierarchies as deep as possible now so we don't have to go back in and build it in later on when we need to start slicing and dicing the information"

- [ ] `🟢 P1` API-ready schema with industry-standard identifiers for external BI integration (PowerBI in P1).
      Source: `CONTEXT.md 00:01:13 – "us having a good item master, not with just keys that are industry standard or identifiers that are industry standard... this can then be lined up with with other data insights and analytics."`

- [ ] `🔵 P2` Survey AI integration surface (Chris has existing tool — prepare data pipes and UI slots).
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
      Source: `CONTEXT.md 00:50:12 – "the AI works as intended where it identifies how many facings are on a shelf. It tries to identify the brand... It's just the setup and the UI on it is not good."` + `00:51:32 – "It wouldn't even be a full roll out. it just be an MVP that would be tested just to get the feedback... just solely focus on the survey part of it"`

---

## Progress Summary

| Section                       | Phase | Done  | Partial | Not Started | Total  |
| ----------------------------- | ----- | ----- | ------- | ----------- | ------ |
| §1 Mobile App – Educator      | P1/P2 | 0     | 0       | 8           | 8      |
| §2 Staff – Campaign & Event   | P1/P2 | 5     | 0       | 2           | 7      |
| §3 Staff – Data Foundations   | P1/P2 | 1     | 0       | 4           | 5      |
| §4 Ops – Educator Mgmt        | P1    | 0     | 2       | 4           | 6      |
| §5 Ops – Monitoring & Masters | P1/P2 | 0     | 1       | 4           | 5      |
| §6 Cross-Cutting              | P1/P2 | 0     | 0       | 4           | 4      |
| §7 Platform Tiers             | P2    | 0     | 0       | 2           | 2      |
| §8 Process & Collaboration    | P1    | 0     | 0       | 3           | 3      |
| §9 At-Risk AI Work            | P3    | 0     | 0       | 2           | 2      |
| **Total**                     |       | **6** | **3**   | **33**      | **42** |

**Phase 1 tasks:** 28 total — 6 done, 3 partial, 19 not started (2 blocked)
**Phase 2 tasks:** 10 total — all not started
**Phase 3 / TBD tasks:** 4 total — all not started
