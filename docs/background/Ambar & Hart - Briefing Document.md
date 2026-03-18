# Ambar & Hart \- Briefing Document

This document provides information about Ambar and Hart's engagement. Namely background about the project, Hart's first milestone, and a plan to make that first milestone happen.

## Background

Hart is a marketing agency focusing on the beverage industry, and working from New York, for customers across the US. Hart executes marketing and sampling events on behalf of clients in the beverage industry. The cycle works like this:

1. A beverage company sends Hart a campaign request via email.
2. Hart designs a campaign, then reaches out to Educator Managers, who recruit and coordinate Educators (the people who actually show up at supermarkets, bars, and festivals to run the event).
3. Educators sample products, collect consumer data (names, opinions, photos, sales figures), and send it back to Hart via a mobile app.
4. Hart pays the Educators and Educator Managers, then delivers campaign results and recommendations to the client.

The communication stack today is fragmented: email and phone with clients, a website plus email and phone with Educator Managers, phone and email between Managers and Educators, and a mobile app for Educators to submit data. Hart has existing software, but it was built for internal backend management, not for a multi-tenant or B2B use case. Its workflows, questions, and product configurations are hard-coded, its architecture makes new features painful to ship, and changing it in place would risk Hart's live operations.

Hart has been remarkably successful with this model. Now they want to scale it, not just by running more events themselves, but by turning the model into a product others can use. To do that, they need a new platform built from scratch.

Hart has chosen Ambar as its implementation partner. Ambar will derisk the build by dividing the work into four milestones that let Hart gauge the viability of its goals in steps.

## The Vision

Hart's ambitions go well beyond improving their own operations. There are three goals:

1. **A SaaS platform for others like Hart.** Other marketing agencies should be able to reproduce Hart's events-and-educators model on the platform, configured for their own needs; i.e., their own clients, products, campaigns, and educator networks.
2. **A data institute for the beverage industry.** Every event generates rich data: consumer preferences, competitive intelligence, venue profiles, sales performance, geolocated photos. Aggregated across thousands of events, this data becomes an asset Hart can expose and sell to the wider industry.
3. **Expansion into other verticals.** Once the model works for beverages, the same platform should extend to other consumables: food, cannabis (where legal in the US), and beyond.

Everything Ambar builds should be understood in the context of these three goals. Phase 1 is the foundation; nothing we design should make Phases 2–4 harder than they need to be.

## **The 4 Phases**

The path to Hart's vision is divided into four phases. Each is scoped as a distinct milestone so Hart can evaluate viability at every step.

**Phase 1** — A SaaS platform and mobile application that allows two trial clients to reproduce Hart's operations in a way that's flexible for their custom needs. This is the focus of this briefing document.

**Phase 2** — Extension of the platform to onboard Hart's own operations. This includes migrating data and users from the existing software and mobile app into the new system.

**Phase 3** — Extension of the platform to support thousands of clients, with features such as subscriptions, integrations with beverage industry ERPs (for automated payment collection and perhaps even campaign placements), and AI automations.

**Phase 4** — Extension of the platform so that it becomes the data institute. Data from photos (parsed with AI), consumer feedback, and geolocation will already be stored from earlier phases, but Phase 4 makes the necessary adjustments so that data can be exposed, queried, and sold.

## **Phase 1: The First Milestone**

Phase 1 delivers a working SaaS platform (web) and a mobile application, piloted with two trial clients. The platform must be flexible enough that each trial client can configure campaigns and events to their own needs; this is the fundamental test of whether the model works as a product, not just as Hart's internal tool. We’ve got a rough idea of what that functionality should be (IMPORTANT: it’s very much subject to change, and you as engineers should be part of improving it).

### **Hart Operations (Web Platform)**

Hart Ops is the platform administrator. They onboard trial client organizations, monitor pilot events across both clients, and access aggregated data for quality assurance. Think of this as the superadmin layer.

Key experiences:

- **Onboarding organizations.** Hart Ops creates a new organization by entering company details, adding ops staff users, and sending invitation emails. The flow is stepped: organization details → add users → review and finalize.
- **Dashboard.** A homepage with platform-wide stats: total organizations, active events this week, top-performing organizations, recent events, and platform growth over time.
- **Event monitoring.** A cross-organization view of all events (today's, this week's, and live) with filters by organization, status, date range, and search.
- **Reports.** Platform-wide analytics: growth charts, top performers (clients, campaigns, educators), and a data quality score that measures the completeness of photos, questions, and inventory across the platform. Reports can be exported.
- **Settings and team management.** Hart Ops users can invite other Hart Ops users. The first account is seeded by Ambar directly.

### **Trial Client Staff (Web Platform)**

This is the core product experience. Trial client staff / operators will create campaigns, set up events, configure what data gets collected, and review results. The platform should feel dynamic and intelligent, not like filling out static forms.

Key experiences:

- **Campaigns.** A campaign is best thought of as a group of events in service of common objectives. Operators create campaigns (name and description), then create events within them. The campaign detail view shows aggregated metrics: events completed, consumers reached, samples distributed, sales generated.
- **Event creation.** This is the most complex flow and the area where the platform needs to shine. Event creation walks through several steps: basics (name, location, date, time, products from the brand asset library, venue type, instructions, compensation), objectives (brand awareness, drive sales, competitive intelligence, product testing, etc.), a tentative event report preview, and optionally direct editing of the event mechanics. The tentative report step is important: the operator sees what a concluded event report _would_ look like given their configuration, and can add or remove data points. If that's not enough control, they can directly configure events.
- **Event monitoring and results.** Before an event, operators see configuration details. During, they see live updates: real-time data, photo uploads, educator progress. After, they see the full picture: inventory, sales, aggregated consumer data, notes, and photos. Event data can be exported.
- **Brand assets.** A product library where operators add products (manually or via bulk upload with AI-assisted prefill) and a questionnaire template library for reuse across campaigns and events.
- **Reports.** Campaign-level and cross-campaign analytics with time period selectors, performance trend charts, campaign comparison tables, and exportable reports.
- **Team management.** Client staff can invite other staff, Educators, and Educator Managers. Depending on the role, the invitation directs to either the web platform or mobile app.
- **Help resources.** Client staff can create FAQs and resource links that appear in the Help section for their Educators and Educator Managers.

### **Educator Managers (Web Platform)**

Educator Managers are the coordination layer between client staff and the educators on the ground. They view events assigned to them, assign educators, and monitor and finalize event submissions.

Key experiences:

- **Dashboard.** Stats for their assigned events: total this week, active now, events requiring attention. Each stat is clickable and filters into the event list.
- **Event management.** A list of events (live first, then upcoming, then completed) with search, filters, and calendar view. Event detail pages show pre-event information (product details, instructions, goals, compensation), live data during the event (check-in timestamps, real-time inventory and sales, consumer questionnaire counts, notes, photos), and post-event summaries. Managers can assign or reassign educators to events and finalize completed events with an approve button — finalization locks the event for everyone.
- **Educator management.** A list of their educators with contact details, event counts, and performance metrics. Educator detail views show stats (total events, average rating, average sales per event) and upcoming assignments.
- **Settings.** Profile, notification preferences (new events, unassigned events, check-in failures, events ready for review), and a help section managed by client staff.

Note: coordination of educator availability (accepting, declining events) happens outside the platform for now. The platform tracks assignment and execution, not scheduling negotiation.

### **Educators (Mobile Application)**

Educators are the people on the ground. The mobile app is their tool for executing events — checking in, collecting data, and checking out. The app must require minimal attention while facilitating the capture of a lot of information. AI is a key part of this: voice-to-data transcription, photo-based bottle counting, smart contextual notifications, and structured data extraction from freeform inputs.

Key experiences:

- **Events list.** A simple homepage with two tabs: upcoming and past events. Event cards show name, location, date/time, and a dynamic status (not started, check-in available, in progress, completed). Live events surface with a live indicator.
- **Pre-event details.** Read-only: event name, location (with a link to maps), date/time (with a link to calendar), product details, instructions, materials/kit pickup info, goals, compensation, and contact info for the manager and venue contact. Top section stays pinned while scrolling.
- **Live event execution.** This is where the mobile app earns its keep. The live event screen shows a countdown timer and progress indicator, with cards that appear based on what the client configured. Each card is a single-tap entry to a full-screen focused workflow: passive counting (simple \+/- counter), active consumer profiling (large tap-friendly buttons for gender, age range, rating, purchase intent — scaled to the configured depth), sales tracking (camera opens with AI bottle detection overlay), venue intelligence (adapted to venue type — large buttons, photo capture), product feedback (flavor sliders, A/B comparison, voice notes transcribed by AI), and a QR code generator for incentivized capture. AI-powered assistance runs throughout: voice notes on any task are transcribed and structured, and smart notifications nudge educators based on event progress (e.g., time without a sample, sales target reminders).
- **Check-out.** The check-out button is disabled until all required tasks are complete, with a visible checklist. Geolocation is verified at both check-in and check-out.
- **Post-event.** Basic stats, notes, photo gallery, compensation details. Events become read-only after 24 hours or when a manager finalizes them.
- **Offline mode.** Previously opened events are cached locally. Check-in/check-out, data entry, and notes all work offline with local timestamps. Data auto-syncs when connectivity returns. Photos can be taken on the phone and uploaded after reconnection. A banner indicates offline status and syncing state.
- **Settings.** Profile, password management, help (FAQs configured by client staff), notification/geolocation/biometric toggles that link to native device settings.

## Making It Happen

In order to deliver the first milestone, we have a tentative schedule. We’ll do our best to keep to it, but if the schedule is at risk, we will discuss internally before communicating to the customer. Two implementation engineers will work on this project: Ethan and Rafael, both very experienced; but Ethan will hold client meetings. In addition to that, Joe (joins Ambar on 23 February 2026\) will project manage this engagement.

- Preparation
  - Starting 18 February 2026, lasting 3 weeks
  - As many internal calls as needed between Ethan and Rafael
  - 5 internal check in calls on February 24 and 26th with Joe and Luis
  - Ambar engineers study this brief for tentative ideas on functionality
  - Ambar engineers study [2026-01-22 Draft of Proposed Functionality.pdf](https://drive.google.com/open?id=1E7DEVu4Zhzo5v8_Na04su2goOANpRSMR&usp=drive_copy) which contains more detailed ideas about functionality (written by Denisa from Ambar)
  - Ambar engineers study [2026-02-05 Draft of Amendments to Event Creation Experience.pdf](https://drive.google.com/open?id=177O5Uqp1H9kRS89ktN7kd0P-_VK2poun&usp=drive_copy) which proposes changes to the 2026-01-22 functionality for event creation (written by Denisa from Ambar)
  - Ambar engineers study three meeti[2026-02-05 Draft of Amendments to Event Creation Experience.pdf](https://drive.google.com/open?id=177O5Uqp1H9kRS89ktN7kd0P-_VK2poun&usp=drive_copy)ng recordings for background on the project
    - [2025-11-11 Meeting Part 1 (Recording).wav](https://drive.google.com/open?id=1UP4Rb11b5ZSiUYh6KjKBQeyfrBeuq54h&usp=drive_copy)
    - [2025-11-11 Meeting Part 2 (Recording).wav](https://drive.google.com/open?id=1hLSHaLxnphY_HQktX2n5pOiVZ5UXokeI&usp=drive_copy)
    - [2025-12-04 Meeting with Demo.mp4](https://drive.google.com/open?id=1WKhm4sUmgMM1QVhP89yucjMQWpKUValw&usp=drive_copy)
  - Ambar engineers document their mental models about the business (in YAML files; [read about mental models here](https://docs.google.com/document/d/1NxEeYiZIw-jUpcAiOGI1IOCO44hEje83iZm1IVo0nBo/edit?tab=t.0))
  - After the initial mental models are finished, Ambar engineers write mental models that define the experiences of each participant of the application’s first version. This is used to produce drafts of low fidelity wireframes.
    - How are these mental models different form the drafts 2026-01-22 and 2026-02-05?
      - These mental models should look more like the mental models in the “Working with Mental Models” [document](https://docs.google.com/document/d/1NxEeYiZIw-jUpcAiOGI1IOCO44hEje83iZm1IVo0nBo/edit?tab=t.0) as opposed to a long scope document.
      - These mental models should include modifications that Ambar engineers think make sense once they’ve thought more about the product. We can (and should) steer Hart towards the best way to make his vision be successful.
  - Note that in this phase, engineers should use their sense of taste, and commercial acumen to ideate a great product that will help Philip achieve his commercial goals.
- Definition
  - Starting 11 March 2026, lasting 2 weeks
  - Four-1-hour calls between Chris (Hart’s CTO) & Ambar (not yet scheduled)
  - Ambar engineers present low fidelity wireframes to Chris, and amend their mental models and wireframes as they discuss with Chris.
  - During this time, engineers are also preparing implementation of the event sourcing DSLs (suggestion to do it in YAML too), to prepare for easy coding later on. And they begin thinking of a plan on the mobile apps (Android / IOS \- React Native is fine; we’ll have to discuss more about this at some point in Preparation Stage Check Ins)
  - Joe prepares tickets to keep track of progress (high level, implementation is up to engineers)
- Implement
  - Starting 25 March 2026, lasting 7 weeks
  - Weekly 30 minute progress check-in calls between Chris & Ambar (not yet scheduled)
