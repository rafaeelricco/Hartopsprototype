# Refinements — HEMs Prototype Review

**Date:** 24 Mar 2026
**Purpose:** Captures items from the HEMs Prototype Review transcript that are missing or underrepresented in `MEETING_SYNTHESIS.md`. Each item includes the source timestamp and speaker for traceability.

---

## New Features (not captured in synthesis)

### 1. Sales Target Visibility for Educators

**What's missing:** Educators should see their sales targets during the event in the mobile app — not just in post-event reporting. This is distinct from the already-captured "Compensation visibility" item, which covers per-event pay. Sales targets and conversion rate tracking are a separate motivational and operational tool.

**What to build:** A visible sales target indicator within the educator mobile event view, showing target units and current progress. Leah confirmed they already track conversion rate (sampled vs. sold) and educators see it in the current system, so the new platform must at minimum match that.

**Rationale from meetings:**

> **Source — Prototype Review [00:42:41]:** Stephanie Karamanoglou: "Is there like a section where you could put target like sales target as well?"

> **Source — Prototype Review [00:43:48]:** Stephanie: "I think so because it would encourage them to keep on like to reach at least a certain amount of like units sold or sales."

> **Source — Prototype Review [00:43:48]:** Leah Guidarelli: "Yeah, because right now we have their conversion rate, which is basically the sales target [...] how many people they sampled versus how many they sold. So they can see that now. So we would want that."

**Relates to:** `educator-mobile-experience.yaml` section 5_5 (task types) or a new sales tracking section — add target display alongside the existing sales counter.

---

### 2. Equipment / Materials Pre-Event Checklist

**What's missing:** Larry raised that educators sometimes arrive at events without required materials (mixers, tablecloths, ice buckets, corkscrews, shakers). He proposed the platform enforce a pre-event preparation checklist. This is distinct from in-event tasks — it's about confirming readiness before the educator arrives at the venue.

**What to build:** A configurable pre-event checklist at the campaign or activity level. Educators would confirm required items before check-in. Could optionally block check-in until all items are confirmed.

**Rationale from meetings:**

> **Source — Prototype Review [00:47:42]:** Larry Golus: "Like if we said we showed them the tech, you know, what we need for a setup, make sure that [...] permits there, the over 21 table tents there, mixes. [...] we're making sure that we're dotting the eyes and crossing the tees and that they're bringing everything that they need to bring. Tablecloth, ice bucket, corkscrew, shaker, etc."

**Relates to:** `educator-mobile-experience.yaml` — new pre-check-in verification step. Also relates to MM6 (Campaign/Event Configuration) for defining required materials per campaign.

---

### 3. Phase Roadmap (Strategic Context)

**What's missing:** Luis outlined the full four-phase vision during the meeting. This strategic framing was not captured in the synthesis and is important for scoping decisions — it clarifies what belongs in Phase 1 vs. later.

**Phase plan as stated:**

- **Phase 1:** Deploy platform with two trial clients to validate the configurable SaaS model
- **Phase 2:** Onboard Hart itself as a client of its own platform
- **Phase 3:** Expand to additional clients beyond the original two trial clients
- **Phase 4:** Data institute — expose collected data for external consumption and monetization

**Rationale from meetings:**

> **Source — Prototype Review [00:59:55]:** Luis Galeas: "At the beginning you wouldn't move all of Hart's operations today to this, right? You would start with the true trial clients [...] in the second phase the goal would be to move Hart itself as if it were a client of its own platform [...] third phase would be getting more clients [...] fourth phase would be to take all the data that we've collected and expose it as a data institute so that other people can consume and benefit from it."

**Relates to:** Overall project scoping. Useful for any Phase 1 vs. Phase 2+ placement decisions throughout the synthesis.

---

## Feature Updates (underrepresented in synthesis)

### 4. Punctuality Flags — Educator-Facing, Not Just Manager-Side

**What's underrepresented:** The synthesis captures the punctuality flag concept but frames it primarily as a manager-side and scoring input. The transcript makes clear that Hart wants the flags to appear **on the educator's own screen in real-time** — a visual cue that they know they've been flagged.

**Specifics from the meeting:** Yellow flag if check-in is late. Red flag if checkout is early. Visible to the educator during the event.

**Rationale from meetings:**

> **Source — Prototype Review [00:39:32]:** Hart Agency NYC: "Let's say I'm supposed to be at 3 o'clock. If I check in at 3:20, maybe a yellow flag pops up or something pops up on my screen and then I'm supposed to leave at 6:00, but I leave at 4:45, a red flag pops up. Like, I love those conditionals because then it, you know, they know it."

> **Source — Prototype Review [00:40:14]:** Hart Agency NYC: "If you're late all the time, that's okay because we're going to pay you by the hour. So you're going to make less money."

> **Source — Prototype Review [00:40:14]:** Leah Guidarelli: "And you're not going to get staffed because your rating sucks."

**Relates to:** `educator-mobile-experience.yaml` section 5_9 (checkout) — add real-time flag visibility to the educator view, not just the manager view.

---

### 5. Educator-Visible Ratings — Consensus Is Stronger Than Captured

**What's underrepresented:** The synthesis says "agreed in principle but no final decision." The transcript shows a clear consensus from all Hart stakeholders that educators should see their score. The actual open question is **what inputs compose the score** (account surveys, punctuality, sales conversion), not whether to show it.

**Rationale from meetings:**

> **Source — Prototype Review [00:33:36]:** Hart Agency NYC: "Should they see their reviews? [...] If you're a 2.7, you know you got to up your game. If you're a five, you know you're doing great."

> **Source — Prototype Review [00:34:14]:** Leah Guidarelli: "They see it now."

> **Source — Prototype Review [00:34:14]:** Stephanie Karamanoglou: "I think it would incentivize them to improve their performance. So I think it's a good idea."

> **Source — Prototype Review [00:35:09]:** Leah Guidarelli: "It's like an Uber app."

**Suggested update to synthesis:** Change "Agreed in principle but no final decision on what's included" → "Consensus to show ratings. Open question is what inputs feed the score (account surveys, punctuality, sales conversion, category expertise) and what's Phase 1 vs. Phase 2+."

**Relates to:** `educator-mobile-experience.yaml` — educator profile section. Also MM8 (Educator Manager Experience) for score composition.

---

### 6. Role-Based Access Control — Explicit Requirement

**What's underrepresented:** Joe described the operator/subtype model for controlling visibility per user type. Leah explicitly confirmed this as a requirement ("we need those securities"). This is an architectural concern that should be called out as either a confirmed feature or validated against the existing multi-tenancy model.

**Rationale from meetings:**

> **Source — Prototype Review [00:58:54]:** Joe Green: "We're able to set up different types of operators or admin users and control what they can see and can't see."

> **Source — Prototype Review [00:58:54]:** Leah Guidarelli: "That's basically what we're going to need [...] the way able to change views based on who the user and the user type [...] with an affiliate stuff, they'll be able to only view this. So yeah, that's how we have to have those securities."

**Relates to:** MM1 (Platform Architecture) and MM3 (Multi-Tenancy) — confirm that the operator subtype model with permission-based view restrictions is explicitly modelled, not just implicit.
