# Hart Client Call Notes

Tasks to accommodate in the prototype and create Linear tickets for:

## 1. Data & Item Master / Campaign Structure
- Implement master hierarchy model in the app:
  - Organization (distributor) → Supplier (brand) → Market (geography) → Channel → ~~Chain~~ → Brand → Line → Item — 🟡 **Partially done.** Organization, Supplier, Market, Channel, Brand, Line, Item all exist as Campaign/ProductRef fields. Chain (account groupings like Tesco, TGI Fridays) is pending — depends on Account Master.
- ~~Allow campaign setup to:~~
  - ~~Select single organization/supplier per campaign~~ ✅
  - ~~Select geography, channels, account segments~~ ✅ (geography + channels done; account segments pending — depends on account master, see §4)
  - ~~Template activities under a campaign, referencing item master (brand/line/item)~~ ✅
- ~~Support campaign → activity → event structure:~~ ✅
  - ~~Activities pull from campaign-selected brands/lines/items~~ ✅
  - ~~Allow sub-sets (e.g. Smirnoff Flavors vs Smirnoff Classic) per activity~~ ✅

> ⚠️ **Account assignment at activity/event level is not yet implemented.** This depends on the Account Master, which isn't available — the staging DB isn't publicly accessible yet and the distributor flat-file import hasn't been set up (see §6). Once accounts exist, they should be assignable at the activity/event level per Chris's description (Call 2, ~06:21).

## 2. Item Master Management
- Simple UI to add new items to Item Master:
  - Fields aligned with “current” minimal requirements (product name / naming convention, and IDs: distributor_id, supplier_id, hart_item_id)
  - New items become globally available (visible to all clients / campaigns)
- Flow for clients adding new products:
  - UI flow where client-side addition becomes part of Hart master
  - (Future) placeholder/flag for later review/clean-up of duplicates

## 3. Platform “Tier” Structure (Core / SaaS / Affiliate)
- Data model to distinguish:
  - Core (Hart): full view of all items, clients, and campaigns
  - SaaS: scoped to a single org/supplier’s data
  - Affiliate: read-only of core-defined master data, no item-creation rights
- Visibility model:
  - Items added in SaaS become part of global Hart item master
  - Core view that can see where an item is used across SaaS/affiliate tenants

## 4. Account & Channel Model
- Account model aligned with:
  - Distributor → Organization → Account (with distributor/retailer IDs) — 🔴 **Blocked.** No account entity exists. Requires staging DB access + distributor flat-file data (both pending, see §6).
  - Geography, channel, chain derived/linked from account where possible — 🔴 **Phase 2.** Depends on account model above.
- Channel model:
  - ~~Four core channel groupings (on-premise chain, off-premise, etc.)~~ ✅
  - ~~Channel selection wired into campaign/activity/event creation~~ ✅
- Support for flat-file import of accounts (NY distributor feeds) as a first pass — 🔴 **Blocked.** Backend/data engineering task; requires DB access that Hart devs are still configuring (Call 2, ~28:23).

## 5. Educator Mobile App – Prototype Features
Rafael’s prototype needs to be backed by real flows / APIs:

- Availability & Scheduling:
  - Calendar with all-day / unavailable / available states
  - Support for blocking time ranges (planned refinement)
- Brand Guide:
  - Section in the app to surface campaign/brand docs and instructions
  - Admin-side ability to attach/manage documents per brand/campaign/event
- Sales Tracking:
  - Item list per event, with simple +/- quantity adjustment
  - Persist event-level sales metrics back to core system
- Vendor Survey (Photo-based):
  - Capture photos for an event (shelves, POS, etc.)
  - “Save & review later” state; review screen listing photos + notes/products
  - Data model to store photos, notes, and associated products per event
  - Structure aligned with future AI shelf-analysis (but AI itself can be later)

## 6. Technical Access & Environment
- Staging DB access remediation:
  - Work with Hart devs to open staging DB to Ambar IPs / VPN / security group
  - Alternatively, provision AWS access to let Ambar configure DB access
- Internal tools:
  - Import Hart’s existing item master + account data into our environment
  - Basic schema alignment / migration scripts

## 7. Documentation & Capability Map
- Produce a “capability map” / short product spec for:
  - Educator app MVP features
  - Campaign / activity / event lifecycle
  - Item master / account hierarchy and permissions by tier
- Align this map with Chris’s capability matrix:
  - Mark what’s in V1 (8-week), what’s explicitly out, and later phases

## 8. Optional / At-Risk AI Work (if pulled into this scope)
Create tickets only if we agree to pick this up:

- Email AI assistant UI:
  - Management UI for inbound emails → AI draft → human review → HEMS staging/drafts
  - Statuses, filters, basic triage & reply workflow
- Survey AI integration:
  - Use vendor-survey UI as front-end for an AI that processes images
  - Show AI output (facings, brand IDs, prices) against captured photos
