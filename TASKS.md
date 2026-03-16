## 1. Mobile App – Educator

- Make availability/calendar a primary tab and core flow; design reminders/pings to update availability.
  Source: `CONTEXT.md 00:23:52 – "The big thing that needs to be front and center is um availability and having a calendar functionality built into here because one of the things that we're I'm instituting is from a process standpoint is to have the educators communicate via the app more"` + `00:25:09 – "we're moving that as a tab front and center. So that's a reminder and we and some of the ideas came up with some of the managers maybe even having something that pings them once in a while to hey don't forget to update update your availability"`

- Treat location, push notifications, and camera as mandatory for using the app; design a clear, non-optional permissions flow.
  Source: `CONTEXT.md 00:26:16 – "all those things need to be mandatory and it's one of the things we were talking about with the push notifications and location. And we've had issues just from a process standpoint where where the app doesn't work because of those functions because of those things were turned off. So I think having all that is mandatory or else it just doesn't work."`

- Clarify and refine task types:
  - Current Sales Tracking should change to function as a counter for products — this then calculates the profit.
  Source: `CONTEXT.md 00:21:55 – "for that sales tracker, I would just want to be able to click off how many I think I I sold during the event."` + `00:11:14 – "So then that that creates a counter for each one."`

- Fold the current Sales Tracking AI shelf-recognition into "venue intelligence" / survey flows (photo now, process and fill in later).
  Source: `CONTEXT.md 00:16:11 – "I think we need to have rename it to survey as opposed to sales tracking."` + `00:20:16 – "we might need them to take a picture and walk away and come back and fill it out later because if they have the picture, they can see what's there."`

- Support quick photo capture of shelf, backbar, coolers, etc., with the option to complete details later (e.g. from the car).
  Source: `CONTEXT.md 00:20:16 – "we might need them to take a picture and walk away and come back and fill it out later because if they have the picture, they can see what's there."` + `00:30:42 – "So having an offline mode, having the ability to save the pictures and then upload it later is extremely important, extremely."`

- Include brand info and "evaluation" content (PDF-equivalent) in-app:
  - Serving instructions, brand scripts, setup info.
  - Consider educator certification / pre-qualification per brand and use that in assignment/priority.
  Source: `CONTEXT.md 00:27:25 – "What drinks are served? Information about the brand... having educators pre-qualified like knowing who's been been qualified for this so that they get priority um would be helpful... that is a sheet of paper that has all the brand information, the setup information."` + `00:46:25 – "when you go back to the mobile app, you can then communicate visually to the educator what the bottle looks like, not making any assumptions of that and we're utilizing the brand assets."`

- Consider how to handle educator scoring (reliability, cancellations, certifications) and make sure event flows capture the data needed.
  - Actual scoring could be phase 2.
  Source: `CONTEXT.md 00:54:10 – "we're tagging that this this educator canceled... it needs to be part of a scoring process with the educators."` + `01:09:02 – "educator profiles there is a lot of detail in the educators we currently capture... there was an educator rating which we're not really utilizing yet. All that's definitely important important with that."`

---

## 2. Staff Platform – Campaign & Event Depth

Campaign creation is too shallow (only name + description in `create-campaign-modal.tsx`) and events don't inherit from campaigns. Chris's biggest feedback area.

1. **Expand campaign creation** — Add fields: supplier, distributors, target markets/geography, anticipated event count, linked products (from item master), objectives. Campaign interface in `campaign-data.ts` currently only has `id, name, description, eventCount, status, createdAt`.
   Source: `CONTEXT.md 00:34:50 – "So like with the campaigns, linking that over to more more more things like um which which suppliers, which distributors, what what markets... Like all that information is important because that that will all trickle into the events."`

2. **Event creation inherits from campaign** — Pre-populate objectives, products, venue type from parent campaign. Currently the wizard (`event-wizard.tsx`) asks everything from scratch. Chris: "just assign the account and the date and time."
   Source: `CONTEXT.md 00:51:06 – "That's why I was saying having as much detail in the campaign easier for for creating the events because then that's just pull from the campaign and regurgitate it. Just assign sign the account and the date and time."`

3. **Output-first report preview** — Move projected impact display earlier in the wizard (step 2 or persistent sidebar). Currently buried in step 4 (Report Preview). Chris + Lewis both emphasized this.
   Source: `CONTEXT.md 00:50:03 – "showing the outputs up front is extremely important and that's going to flip everyone's thinking... from their perspective, seeing how effective this is going to be and some projections off of that is going to be very powerful as you start build these campaigns."`

4. **"What if" adjustment suggestions** — When projections are weak, suggest what to change (account, day, venue type). Chris: "what do I need to do to make this better?"
   Source: `CONTEXT.md 00:41:02 – "if this is not not going to be projected as good what do I need to do to make this better?"`

5. **Structured questionnaire system** — Replace notes catch-all with canned responses + campaign-specific questions. Chris: "being a catchall is a problem because then we're not capturing this information as data."
   Source: `CONTEXT.md 00:29:31 – "it being a catchall is a problem because then we're not capturing this information as data."` + `00:48:55 – "there's stuff I I call questionnaires where it's specific to that those those campaigns and events that would need to be tweaked."`

6. **Brand education content** — Expand brand assets beyond SKUs to include serving instructions, brand scripts, setup info, evaluation sheets. Link to campaigns.
   Source: `CONTEXT.md 00:27:25 – "one of the things that we also include is um PDFs on the information of the event like how do you how do you serve the drink? What drinks are served? Information about the brand... that is a sheet of paper that has all the brand information, the setup information."`

7. **Connect item master to campaigns/events** — `EventItem` currently has no `productIds` field. Products at campaign level should flow to events and educator app.
   Source: `CONTEXT.md 00:21:55 – "from a from an event structure is going back to the item master being linked into there with this campaign. We know what products I'm going to be done going to be sampled in this this campaign."`

---

## 3. Staff Platform – Data Foundations & AI

New capabilities that don't exist yet but Chris identified as key differentiators.

1. **Account profile data model** — Track per-account: displays, cold boxes, windows, venue characteristics. Currently events only have a `location` string. No `Account` entity exists in the codebase.
   Source: `CONTEXT.md 00:20:16 – "for the account profile we want to track how many displays are in the account how many cold boxes if there's wind windows so all the things that we're surveying we're keeping tabs and creating a profile as to what that account is."`

2. **AI prescriptive suggestion engine (mock)** — Suggest accounts, days, event types based on history. Chris: "no one's doing that right now." Prototype as mock panel during event creation.
   Source: `CONTEXT.md 00:50:03 – "knowing the competition, no one's doing that right now."` + `00:42:01 – "if we have an account master and these account profiles and now we know more about these accounts... the AI can then learn more about the types of accounts."`

3. **Product sales counter model** — Simple per-product unit counter for events. Chris: "click off how many I think I sold." Currently no per-SKU sales tracking in `EventItem`.
   Source: `CONTEXT.md 00:21:55 – "I would just want to be able to click off how many I think I I sold during the event."`

4. **Distributor depletions integration surface** — Placeholder in reports for "Event Impact vs. Distributor Sales." Phase 2 integration, but design the UI slot now.
   Source: `CONTEXT.md 00:04:36 – "lining that up with those sales and saying, 'These accounts bought x amount of product. We did this in this event. The next month they bought and bought more.' We can start and then driving deriving the actual sales velocity and the influence of doing these events and put a dollar figure on it."`

---

## 4. Ops Platform – Educator & Assignment Management

Largest missing area. Zero educator management exists — no `/ops/dashboard/educators` route, no educator entity. Chris spent the most time on this.

1. **Educator roster page** — New `/ops/dashboard/educators` route. List all educators with profile, geography, certifications, availability, reliability score. Add "Educators" to ops sidebar (currently only Dashboard, Organizations, Events, Settings, Reports).
   Source: `CONTEXT.md 00:52:05 – "having that the educators to pull from as to who's available who matches the the geography... here's availability and here's the score of the educators. These are the people you should you should consider."`

2. **Educator availability calendar** — Calendar view of educator availability by day/week. Chris: "the big thing that needs to be front and center."
   Source: `CONTEXT.md 00:23:52 – "The big thing that needs to be front and center is um availability and having a calendar functionality built into here because one of the things that we're I'm instituting is from a process standpoint is to have the educators communicate via the app more."`

3. **Geography-based educator-event matching** — Match educators to events by proximity (home address vs venue), availability, skill set, certification. Surface ranked list for manager selection.
   Source: `CONTEXT.md 00:52:05 – "we try to to put and put the educators that from their home their home address close to the event so they don't have to drive two three hours away. So have having that geol location where it knows the address of the the account and the address of the the educator."`

4. **Cancellation & change management flow** — Educator reports issue → manager decides → re-assignment triggered → reason tagged to educator record. Chris described the full flow.
   Source: `CONTEXT.md 00:54:10 – "that cancellation process needs to be captured... the educator does not have the the power to cancel it, but we're capturing what's going on and at least it's communicated. The manager makes that that that end call."`

5. **Educator scoring foundation** — Track cancellations, certifications, on-time rate. Actual scoring is phase 2, but capture points must exist now.
   Source: `CONTEXT.md 00:54:10 – "we're tagging that this this educator canceled... it needs to be part of a scoring process with the educators."`

6. **Assignment offer flow** — Educators are contractors, not employees. Show pending offers, accepted assignments, declined offers. Chris: "a suggestion saying hey we have this opportunity."
   Source: `CONTEXT.md 00:52:05 – "it's basically a suggestion saying hey we have this opportunity. Do you accept it or not? And that's done in the app."`

---

## 5. Ops Platform – Monitoring & Masters

Expand ops beyond organization/event monitoring into data stewardship.

1. **Hart-level Account Master** — Central account catalog managed at ops level. Chris: "Heart would have our own master... everyone's structure is going to be the same." Not per-client.
   Source: `CONTEXT.md 00:02:15 – "we would have our own so heart would have our own master... everyone's everyone's structure is going to be the same."`

2. **Hart-level Item Master** — Central product catalog with industry-standard identifiers, supplier/distributor linkage. Supersedes staff-level brand assets as the source of truth.
   Source: `CONTEXT.md 00:02:15 – "having an item master where we're capturing the right information. Same thing with the account account information so that this can then be lined up with with other data insights and analytics."`

3. **Educator-related dashboard metrics** — Add to ops dashboard: total educators, active assignments today, unassigned events (gap alerts), cancellation rate, availability coverage.
   Source: Derived from educator management discussion (§4 sources). No single quote — aggregated need.

4. **Campaign drill-through from ops events** — Link events back to campaign context for cross-org rollups. `EventRecord` currently has `campaignName` as a string only.
   Source: `CONTEXT.md 00:34:50 – "the campaign is then the higher level from an event execution and all the events are all like the activities that go along with that campaign."`

5. **Operational analytics in reports** — Educator utilization, cancellation analytics, event fill rate, campaign ROI rollups.
   Source: Derived from scoring/cancellation discussion at `CONTEXT.md 00:54:10` and depletions at `00:04:36`. No single quote — aggregated need.

---

## 6. Cross-Cutting – Data Schema & Integrations

1. Shared data models for account/item masters (imported by both ops and staff).
   Source: `CONTEXT.md 00:02:15 – "heart would have our own master... everyone's structure is going to be the same."`

2. API-ready schema with industry-standard identifiers for external BI integration.
   Source: `CONTEXT.md 00:01:13 – "us having a good item master, not with just keys that are industry standard or identifiers that are industry standard... this can then be lined up with with other data insights and analytics."`

3. Survey AI integration surface (Chris has existing tool, launching in ~2 weeks — prepare data pipes and UI slots).
   Source: `CONTEXT.md 00:13:39 – "So on this part I can tell you and we're launching it now over the next two weeks."`

4. Harmonize ops `EventRecord` and staff `EventItem` into shared base type.
   Source: Technical need derived from codebase review — no direct Chris quote.

---

## 7. Process & Collaboration

1. Obtain HEMS app demo access and AWS data access (reference only, don't clone).
   Source: `CONTEXT.md 00:05:46 – "I'm moving everything over into into that that folder... I have a VIO that has all those tables of what's available. That'll be helpful for you guys at least to see what it is."`

2. Prepare stakeholder sessions with Leah and Larry — focus on pain points, avoid replicating old workflows.
   Source: `CONTEXT.md 01:00:32 – "I'm going to say Leah and Larry are probably the best ones for us to start off with."`

3. Co-create critical path wireframes: campaign → event → assignment → execution → report.
   Source: Derived from overall call structure — no single quote.