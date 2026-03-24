# Meeting Synthesis — HEMs Prototype Review

**Date:** 24 Mar 2026  
**Generated from:** Gemini transcript, Gemini AI notes, Joe's structured notes, Luis's post-meeting Slack message  
**Attendees:** Joe Green (Ambar), Luis Galeas (Ambar), Rafael Ricco (Ambar), Ethan Brown (Ambar), Chris Azrak (Hart/Ambar liaison), Leah Guidarelli (Hart CEO), Stephanie Karamanoglou (Hart CMO — 3 weeks in), Larry Golus (Hart, 32 years), unnamed Hart staff member ("Hart Agency NYC" in transcript)

---

## Summary

First prototype review with Hart stakeholders. Rafa demoed the staff platform (campaign/event creation, activity templates, educator assignment), educator manager view (assignment, event states, finalization queue), and educator mobile app (check-in, consumer profiling, sales tracking, venue survey, checkout). Reception was strongly positive — Leah called it "fantastic" and "on the right track."

Hart raised a dense set of operational requirements that weren't yet in the prototypes: territory-based filtering for managers, evaluation/sample pickup tracking, receipt collection, OCM-specific photo compliance, social media content capture, and bonus logic.

Luis flagged post-meeting that the multi-tenant model is more complex than assumed — trial clients may share Hart's educators and manage their own downstream clients, adding a layer to the hierarchy.

---

## Open Questions / Decisions to Be Made

- **Shared educator pool across organisations** — Luis's Slack flag. Trial clients may draw on Hart's educators rather than bringing their own. Architecture likely handles this but needs explicit review. *Owner: Ethan + Luis*
- **Downstream client layer** — Some agencies may manage their own clients through the platform, creating an extra hierarchy level (Agency → Agency's Client → Events). Needs scoping. *Owner: Joe + Chris*
- **Educator score visibility** — Consensus to show educators their own ratings in the mobile app (like Uber). Open question is what inputs feed the score (account surveys, punctuality, sales conversion, category expertise) and what's Phase 1 vs. Phase 2+. *Owner: Chris + Leah*
- **Account master integration** — Location field must pull from Hart's account master (license numbers, distributor account numbers). Trial clients use Hart's list. How is this data imported/maintained? *Owner: Chris*
- **Evaluation forms + sample pickup tracking** — Chris flagged as missing from prototype. Leah taking offline. Needs scoping before implementation. *Owner: Chris + Leah*
- **Receipt collection verification** — Leah flagged alongside evaluation forms. Same offline discussion. *Owner: Chris + Leah*
- **Educator rating accuracy** — Stephanie noted venues rarely fill out the post-event email survey, making current scores unreliable. Worth investigating whether the new platform can improve response rates or supplement with other signals. *Owner: Stephanie + Chris*
- **OCM photo compliance (Phase 2+)** — 1,000 OCM promotions/year require geotagged photos printed on the image, matching reference setups. Currently uses external app. Joe noted it's technically feasible but likely Phase 2+. *Owner: Joe (roadmap placement)*
- **Social media photo capture with filters** — Stephanie requested. Distinct from mandatory product/setup photos. Needs scoping as a campaign-level configuration. *Owner: Stephanie + Chris*
- **Bonus tracking logic** — "Sell 12 bottles, get $25 bonus." Needs to live at campaign level. Not yet in prototype. *Owner: Chris*

---

## Mental Model Impact

### New Features

- **Territory-based filtering (Educator Manager)** — Managers need to filter events by geography (borough, state) and venue type (on-premise, off-premise). Not in current prototype. *Relates to: MM8 (Educator Manager Experience) — add filtering/views section.*
- **Finalization queue (Educator Manager)** — Batch approval of completed events. Demonstrated in prototype. *Relates to: MM8 — add post-event approval workflow.*
- **Reference image matching for photo compliance** — AI comparison of educator-uploaded photo against a reference setup image, blocking progress if mismatch. Phase 2+ feature. *Relates to: `educator-mobile-experience.yaml` section 5_8 (AI-powered assistance) — add as future capability.*
- **Social media content capture** — Campaign-configurable task requiring a "hero image" from the educator, with optional filter/enhancement. Distinct from compliance photos. *Relates to: `educator-mobile-experience.yaml` section 5_5 (task types) — add as optional task module.*
- **Bonus logic** — Campaign-level sales thresholds triggering bonus compensation. *Relates to: new concept needed in MM6 (Campaign/Event Configuration) or whichever model holds compensation rules.*
- **Shared educator pool** — Educators belonging to Hart but assignable to events from other organisations on the platform. *Relates to: MM1 (Platform Architecture) and MM3 (Multi-Tenancy) — hierarchy needs a "shared resource" concept.*
- **Downstream client management** — Agencies on the platform may manage their own clients, adding a hierarchy layer. *Relates to: MM1 (Platform Architecture) and MM3 (Multi-Tenancy) — organisation hierarchy needs review.*

### Feature Updates

- **Location field (Event Creation)** — Must connect to account master with license numbers and distributor IDs, not just Google Places autocomplete. *Relates to: MM6 (Campaign/Event Configuration) — location is a pick-list from account master, not free text.*
- **Activity templates** — Confirmed working as designed. Templates pre-fill event creation. Leah confirmed the mental model: campaign = box, activities and events roll into campaign. *No change needed.*
- **Educator assignment scoring** — Prototype showed distance. Chris confirmed score and category preference weighting are planned. Underlying data exists but is currently in offline spreadsheets. *Relates to: MM8 (Educator Manager Experience) — assignment logic section needs scoring inputs (distance, performance score, category expertise, punctuality).*
- **Event timer and punctuality flags** — Timer tracks attendance duration. Hart wants conditional flags visible **on the educator's own screen in real-time**: yellow for late check-in, red for early departure. Flags also feed into educator score and are visible to managers. *Relates to: `educator-mobile-experience.yaml` section 5_9 (checkout) — add real-time flag visibility to educator view, not just manager view; MM8 — add flag visibility for managers.*
- **Task mandatory/optional designation** — Confirmed as planned. Some tasks block checkout, others are optional. Campaign-level configuration. *Relates to: `educator-mobile-experience.yaml` section 5_5 — already modelled but confirm mandatory gate is explicit.*
- **Compensation visibility** — Educators see per-event compensation in the mobile app. Hart confirmed this is the right level (per-event, not pay-period). *Relates to: `educator-mobile-experience.yaml` — confirm compensation is event-scoped.*
- **In-app photo capture** — Photos taken within the app, not from phone gallery. Eliminates the current two-step workflow. Hart confirmed this is a significant improvement. *Relates to: `educator-mobile-experience.yaml` section 5_7 (venue survey/photos) — already modelled, no change needed.*

---

## Tasks

### Joe Green

- [ ] Investigate reference image matching technology for photo compliance (AI comparison against setup reference). Scope feasibility and place on Phase 2/3 roadmap.
- [ ] Produce Loom video walkthroughs of prototype flows not fully covered in meeting.
- [ ] Prepare initial guide for stakeholders as prototype links are shared.
- [ ] Complete master capabilities matrix with Chris — finer details for Phase 1 scope.

### Chris Azrak

- [ ] Scope evaluation forms and sample pickup tracking with Leah (offline discussion agreed).
- [ ] Scope receipt collection verification requirements with Leah.
- [ ] Define account master import/maintenance process — how does data get in, who updates it, what happens when trial clients onboard.
- [ ] Review bonus logic requirements and place in capabilities matrix.
- [ ] Continue weekly update sessions; begin opening focused sessions to other stakeholders once capabilities matrix is aligned.

### Leah Guidarelli

- [ ] Provide Chris with offline notes on evaluation forms, sample pickups, receipts, and other operational checks missing from prototype.
- [ ] Confirm which OCM-specific requirements should be scoped for Phase 2.

### Stephanie Karamanoglou

- [ ] Define social media content capture requirements — what quality/format, which campaigns, filter expectations.
- [ ] Investigate whether improved survey delivery (e.g., in-app prompt to venue staff vs. email) could improve educator rating accuracy.

### Luis Galeas / Ethan Brown

- [ ] Review platform architecture for shared educator pool model — can an educator belong to Hart but be assigned to a trial client's events?
- [ ] Assess hierarchy implications of agencies managing their own downstream clients through the platform.

### Rafael Ricco

- [ ] Add territory-based filtering to educator manager prototype (borough, state, venue type).
- [ ] Add educator score display to assignment list (distance + score + category weighting).
- [ ] Add configurable pre-event equipment/materials checklist to educator mobile app (confirm required items like mixers, tablecloths, ice buckets before check-in; optionally block check-in until confirmed). Campaign/activity-level configuration.
- [ ] Add educator-visible rating/score display to mobile app profile section (score composition TBD — account surveys, punctuality, sales conversion, category expertise). Phase 1 vs. Phase 2+ inputs to be defined by Chris + Leah.
- [ ] Add real-time punctuality flags to educator mobile app (yellow flag on late check-in, red flag on early checkout — visible to the educator during the event, not just managers).
- [ ] Add in-event sales target indicator to educator mobile app (target units, current progress, conversion rate — sampled vs. sold). Distinct from compensation visibility; this is a motivational/operational tool confirmed by Leah as matching current system capabilities.

---

## Risks & Dependencies

- **Account master is a hard dependency for event creation** — the location pick-list, billing identifiers, and license numbers all flow from this data. If the master data import isn't solved, event creation can't function as designed.
- **Educator scoring data is currently in offline spreadsheets** — migrating or integrating this data is a prerequisite for the assignment scoring feature working in production.
- **Rating system has low signal** — Stephanie flagged low survey response rates. Building features on top of unreliable scores (e.g., assignment prioritisation, educator-visible ratings) carries risk. Consider whether Phase 1 should collect the data but defer surfacing scores until accuracy improves.
- **Multi-tenant complexity just grew** — Luis's shared-educator and downstream-client observations may require schema changes. Better to address now in Definition than discover during Implementation.
