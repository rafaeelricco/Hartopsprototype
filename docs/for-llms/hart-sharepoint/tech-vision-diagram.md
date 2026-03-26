# HART Tech Vision — Platform & Architecture Diagrams

> Converted from: `HART - TECH VISION Diagram and Platfrom.vsdx`
> Source: SharePoint / Ambar-Development / 1 Technical Outlines
> Pages: 16

---

## Page 1 — Strategic Vision & Three Pillars

Hart's mission, vision, and three strategic areas of attack.

```mermaid
graph TB
    subgraph MISSION_VISION["HART Identity"]
        MISSION["<b>MISSION:</b><br/>Leader of consumer education providing<br/>brands directed, deep, actionable, and timely<br/>competitive insight into the US Market"]
        VISION["<b>VISION:</b><br/>Redefine brands competitive advantage fusing<br/>in-person experiences, with timely market vision,<br/>and digital mastery into actionable insights"]
    end

    STRATEGY["<b>STRATEGY:</b><br/>Three areas to attack and redefine what it means<br/>to be a 'Marketing Promotions Company'"]

    subgraph PILLAR1["🔴 Pillar 1: Operations Effectiveness"]
        direction TB
        P1A["REV – SAVE MAN HOURS"]
        P1B["Internal / Operational Efficiencies"]
        P1C["Foundation / Client Value"]
        P1_APPS["HART HEMs – Educator Management<br/>HART Ai – Events (Chat / Processing)<br/>HART Ai – Event Deep Insights (Analytics)"]
    end

    subgraph PILLAR2["🟢 Pillar 2: Client Value – New Revenue"]
        direction TB
        P2A["Who do we now serve?"]
        P2B["How / What do we offer?"]
        P2C["What makes us a more sexy partner?"]
        P2_APPS["HART Ai – Events Booking Guidance<br/>HART Ai – Analytics<br/>HART Market Guide Data (rev)<br/>HART Survey App – Market Data"]
    end

    subgraph PILLAR3["🔵 Pillar 3: HEMs Platform / Affiliate Future"]
        direction TB
        P3A["Global Suppliers"]
        P3B["ALL Distributors"]
        P3C["HEMs Platform Transformation"]
        P3_APPS["HART Platform – Event Management<br/>HART Ai – Event Deep Insights<br/>HART Market Guide Data (rev)"]
    end

    MISSION_VISION --> STRATEGY
    STRATEGY --> PILLAR1
    STRATEGY --> PILLAR2
    STRATEGY --> PILLAR3
```

---

## Page 2 — Current HEMs Architecture (As-Is)

The current system showing the HEMs application, data flow, and all actors.

```mermaid
graph TB
    subgraph AWS["Cloud AWS"]
        HEMS_DB[("HEMs App<br/>Database")]
        CROSSBOX_DB[("Crossbox<br/>Database")]
    end

    subgraph HEMS_CURRENT["HEMs Application - Current"]
        direction TB
        HEM_WEB["HEM Application Web"]
        EDU_MGT["Event / Educator Management"]
    end

    subgraph EVENT_ASSIGNMENT["Market – Event Execution Assignment"]
        direction TB
        ASSIGN["Assign Event /<br/>Account to Educator / Date"]
        CALENDAR["Calendar –<br/>Date and Time"]
        PROMO_TYPE["Event –<br/>Promotion Type"]
    end

    subgraph EVENT_RESULTS["Event Activities - Data Collection and Event Results"]
        direction TB
        subgraph FIELD_ACTORS["Field Actors"]
            EDUCATORS["Educators"]
            RETAIL_OFF["Retail Account<br/>Off Premise"]
            RETAIL_ON["Retail Account<br/>On Premise"]
            CONSUMERS["Consumers Sampling"]
            ACCT_SURVEY["Account Survey"]
            SPECIAL["Special Events<br/>(Trade Shows, etc)"]
        end
        ACTIVITIES["Event Activities"]
        COST["$ Cost"]
    end

    subgraph CLIENTS["Client Layer"]
        direction LR
        DIST_CLIENT["Distributor Client"]
        SUPP_CLIENT["Supplier Client"]
    end

    subgraph CLIENT_ROLES["Client Roles"]
        SUPP_COMMERCIAL["Supplier Commercial Team"]
        DIST_TRADE["Distributor - Trade Development"]
        DIST_SALES["Distributor - Sales Manager"]
        EDU_MANAGERS["Educator - Managers"]
        HART_OPS["HART Office Operations"]
    end

    subgraph BILLING["Billing Flows"]
        DIST_BILLING["Distributor - Billing (SLA)"]
        SUPP_FINANCE["Supplier – Finance (Billing)"]
        BUDGETS["Billing and Budgets"]
    end

    subgraph SURVEY["Survey Retail - Data Collection"]
        SURVEY_ACCTS["Survey of Accounts"]
    end

    %% Flows
    CLIENTS --> HEMS_CURRENT
    HEMS_CURRENT --> HEMS_DB
    HEMS_CURRENT --> EVENT_ASSIGNMENT
    EVENT_ASSIGNMENT --> EVENT_RESULTS

    EVENT_RESULTS -->|"Event Activities Requests"| DIST_CLIENT
    EVENT_RESULTS -->|"Event Activities RESULTS"| DIST_CLIENT
    EVENT_RESULTS -->|"Event Activities Requests"| SUPP_CLIENT
    EVENT_RESULTS -->|"Event Activities RESULTS"| SUPP_CLIENT

    ACTIVITIES --> DIST_BILLING --> BUDGETS
    ACTIVITIES --> SUPP_FINANCE --> BUDGETS
    HEMS_DB --> CROSSBOX_DB
```

---

## Page 3 — Platform Portal Addition (Phase 1 Enhancement)

Same as Page 2 but adds the **HEMS Platform Portal** and **AI Helpdesk** components.

```mermaid
graph TB
    subgraph AWS["Cloud AWS"]
        HEMS_DB[("HEMs App<br/>Database")]
        CROSSBOX_DB[("Crossbox<br/>Database")]
        PORTAL["<b>HEMS PLATFORM PORTAL</b>"]
    end

    subgraph HEMS_APP["HEMs Application - Current"]
        HEM_WEB["HEM Application Web"]
        EDU_MGT["Event / Educator Management"]
    end

    subgraph HELPDESK["AI Helpdesk Layer (New)"]
        direction LR
        HD1["Helpdesk / How To Ai"]
        HD2["Helpdesk / How To Ai"]
        HD3["Helpdesk / How To Ai"]
        HD4["Helpdesk / How To Ai"]
        HD5["Helpdesk / How To Ai"]
    end

    PORTAL --> HEMS_APP
    HEMS_APP --> HEMS_DB
    HEMS_DB --> CROSSBOX_DB
    PORTAL --> HELPDESK
```

---

## Pages 4-5 — AI Survey App & Image Recognition Pipeline

Pages 4 and 5 add the **HART AI Survey Management** system with image recognition for shelf audits.

```mermaid
flowchart TB
    subgraph PRE_EXECUTION["Pre-Execution: Product AI Learning"]
        direction LR
        subgraph BRAND_SURVEY["Brand Survey Setup"]
            ID_BRANDS["ID Brands to<br/>Be Surveyed<br/>(e.g., Moet Henn)"]
            ADD_MASTER["Add Data to<br/>Master Item Data"]
            SGPROOF1["SGProof Website<br/>Train on Images"]
        end
        subgraph COMP_SURVEY["Competitor Setup"]
            ID_COMP["ID Comp Brands to<br/>Be Surveyed<br/>(e.g., Mumm)"]
            ADD_COMP["Add Data to<br/>Master Item Data"]
            SGPROOF2["SGProof Website<br/>Train on Images"]
        end
        ITEM_MASTER[("Item Master")]
        SUPPLIER_MASTER[("Supplier Master")]
        AI_RECON1[("AI Image<br/>Recon Data")]
    end

    subgraph SURVEY_MGMT["HART AI Survey Management"]
        SETUP["Survey Template Setup"]
        SET_DATE["Set Survey Activation Date"]
        ACCT_MASTER[("Account Master")]
    end

    subgraph EDUCATOR_FLOW["Single Account Survey - Educator"]
        direction TB
        E1["Educator Enters Account"]
        E2["Select Account Location"]
        E3["Take Photo"]
        E4["AI Form Fill"]
        E5["Accept / Change Form Inputs"]
        E6["Select Next Location (in-store)"]
        E7["Repeat for all Tasks on Survey"]
    end

    subgraph RESULTS["Results"]
        SINGLE["Single Location<br/>Single Point in Retail"]
        VERIFIED["Survey Results<br/>Completed and Verified"]
        OUTPUT["Listed Output of Data"]
    end

    subgraph DOWNSTREAM["Data Destinations"]
        CROSSBOX[("Crossbox Database")]
        SURVEY_DATA["Survey of Accounts"]
    end

    PRE_EXECUTION --> SURVEY_MGMT
    SURVEY_MGMT --> EDUCATOR_FLOW
    E1 --> E2 --> E3 --> E4 --> E5 --> E6 --> E7
    E7 -->|"More locations"| E6
    EDUCATOR_FLOW --> RESULTS
    RESULTS --> DOWNSTREAM
    AI_RECON1 --> E4
    ACCT_MASTER --> E2
```

---

## Page 6 — Use Cases & AI Capabilities

```mermaid
graph LR
    subgraph USE_CASES["Use Cases / Needs / Pain / Revenue Sources"]
        UC1["AI CHAT BOT"]
        UC2["AI Event Processing"]
        UC3["Emailed Events"]
    end
```

---

## Pages 7-8 — AI Email Event Processing Flow

This is the detailed AI-powered event creation flow from email requests. Page 7 is the simplified version; Page 8 is the full detailed version with all decision branches.

```mermaid
flowchart TB
    START["📧 Email Received"]
    VALIDATE["Validate Email Account User"]
    CONFIRM{"Confirm Email<br/>or Reject?"}

    START --> VALIDATE --> CONFIRM
    CONFIRM -->|"Reject"| END1["End"]

    CONFIRM -->|"Accept"| DETERMINE_SOURCE{"Determine:<br/>Supplier or<br/>Distributor?"}

    DETERMINE_SOURCE -->|"Supplier"| SUPP_TYPE{"Type of Request?"}
    DETERMINE_SOURCE -->|"Distributor"| DIST_TYPE{"Type of Request?"}

    SUPP_TYPE -->|"New"| NEW_EVENT["New Event Request"]
    SUPP_TYPE -->|"Change"| CHANGE_EVENT["Change Event Request"]
    DIST_TYPE -->|"New"| NEW_EVENT
    DIST_TYPE -->|"Change"| CHANGE_EVENT

    subgraph IMAGE_CHECK["Attachment Processing"]
        CHECK_IMG["Determine if Email contains<br/>Images or Attachments<br/>(filter out signature images)"]
        VIRUS["Scan for Virus?"]
    end

    NEW_EVENT --> CHECK_IMG
    CHANGE_EVENT --> CHECK_IMG
    CHECK_IMG --> VIRUS

    subgraph AI_EXTRACTION["AI Data Extraction"]
        direction TB
        DETERMINE_NUM["Determine number of Events<br/>Requested (By Product,<br/>by Location, by Date)"]
        EXTRACT["AI Read Email,<br/>Match to Form Data"]
        CAPTURE_NOTES["Capture Email Notes"]
        SAVE_EMAIL["Save Email &<br/>Create Hyperlink"]
    end

    VIRUS --> AI_EXTRACTION

    subgraph FORM_DATA["Event Field Form Data (per event)"]
        direction TB
        FD["Supplier (determined by Sender) → CB Match Supplier Key<br/>Product → CB Match Product Key<br/># Sample Bottles<br/>Event Name (Optional)<br/>Date of Event<br/>Time of Event From and To<br/>Account Location Name → CB Account Key<br/>Distributor (by Product v Location) → CB Match Distributor Key<br/>Assign Event Email Key ID (Each Event)"]
    end

    AI_EXTRACTION --> CHECK_CROSSBOX["Check Data against<br/>Crossbox MDM"]

    CHECK_CROSSBOX --> ALL_FIELDS{"Can all Fields<br/>be ID'd via AI<br/>or Crossbox?"}

    ALL_FIELDS -->|"Yes"| PUSH["Push Form Event Data<br/>to HEMs"]
    ALL_FIELDS -->|"No"| REPLIES

    subgraph REPLIES["AI Reply Branches"]
        R1["1) Reply: Missing Field(s)"]
        R2["2) Reply: Unrecognized Field Data"]
        R3["3) Reply: Event Dates too close<br/>to current date"]
        R4["4) Reply: Event Undetermined"]
        R5["5) Reply: Event Updated – need more info"]
        R1A["1a) Reply: New Event(s) –<br/>Confirmation of Receipt"]
    end

    PUSH --> MANAGER_LIST["Add Each Event to<br/>Manager List"]
    PUSH --> R1A

    subgraph APPROVAL["HEMs Application - Hart Team Event Approval"]
        HUMAN_APPROVAL["HEMs App Human<br/>Management / Approval"]
        MANUAL_EDIT["Human Edit Email /<br/>Field Data"]
        APPROVE{"Approve Event?"}
        MANUAL_ADD["Manual Add<br/>Educator Assignment"]
    end

    MANAGER_LIST --> HUMAN_APPROVAL
    HUMAN_APPROVAL --> APPROVE
    APPROVE -->|"Yes"| MANUAL_ADD
    APPROVE -->|"No"| MANUAL_EDIT --> AI_EXTRACTION

    subgraph RESPONSE["Final Response"]
        AI_EMAIL["AI Generate Email Response<br/>Summary of Event Request"]
        CONFIRM_EMAIL["Email Confirmation"]
        MATCH_KEY["Match Email with<br/>AI Email ID Key"]
    end

    MANUAL_ADD --> AI_EMAIL --> CONFIRM_EMAIL

    subgraph OUTPUTS["Data Updates"]
        UPDATE_EVENT[("Update Event Data")]
        UPDATE_MASTER[("Update Event Master Data")]
        HEMS_APP["HEMs App<br/>Event Confirmation"]
        CROSSBOX[("Crossbox Database")]
    end

    CONFIRM_EMAIL --> OUTPUTS

    subgraph AI_LEARNING["AI Learning"]
        LEARN["AI Learns on Edits<br/>and Changes to Email"]
    end

    MANUAL_EDIT --> AI_LEARNING

    subgraph LEGEND["Tree Key"]
        direction LR
        L1["🟢 Hart AI"]
        L2["👤 Hart Team"]
        L3["🗄️ Data Action"]
        L4["⚡ Hart AI Action"]
        L5["📦 Process"]
        L6["📦 Sub Process"]
    end
```

---

## Page 9 — Full Database Schema (Table Definitions)

This page contains the complete database schema with all column definitions. Key tables:

```mermaid
erDiagram
    accounts_details {
        int id PK
        int user_id FK
        varchar company
        varchar secondary_name
        varchar account_affluency
        varchar liquor_license
        varchar manhattan_beer_id
        varchar winebow_id
        varchar opici_id
        varchar empire_id
        varchar southern_id
        varchar southern_td_cd
        int premise_id FK
        text transportation_notes
        text private_admin_notes
        int blacklist_status
        text blacklist_notes
        varchar logo
        varchar referred_by
        timestamp created_at
        timestamp updated_at
    }

    companies {
        int id PK
        text company
        varchar hart_company
        varchar secondary_name
        varchar account_affluency
        varchar image
        tinyint image_default
        text email
        varchar email_hash
        text phone
        varchar website
        text fax
        text cell_phone
        varchar liquor_license
        varchar manhattan_beer_id
        varchar winebow_id
        varchar opici_id
        varchar empire_id
        varchar southern_id
        varchar southern_td_cd
        int premise_id
        int account_size
        text transportation_notes
        varchar referred_by
        int company_address_id
        enum company_type "supplier | distributor | account"
        int division_id
        tinyint status
        tinyint rating_enabled
        tinyint has_email
        timestamp created_at
        timestamp updated_at
    }

    evaluations {
        int id PK
        int event_id FK
        int educator_id FK
        tinyint status
        text notes
        int consumers_sampled
        int consumers_approached
        enum promotion_location "front | back"
        varchar other_location
        varchar general_market
        enum weather "sunny | cloudy | rain | warm | cold"
        enum weather1 "warm | cold | hot"
        enum door_traffic "heavy | moderate | slow"
        int account_size
        text educator_feedback
        text consumer_feedback
        text competitors
        text competitors_pricing
        text setup_location
        text pos
        decimal male_percent
        decimal female_percent
        text cocktail_featured
        int approved_user
        tinyint drink_menu
        tinyint back_bar
        decimal feature_drink_price
        tinyint is_complete
        tinyint is_primary
        varchar source
        tinyint rebate
        tinyint ibotta
        tinyint consumer_education
        tinyint bar_spend
        varchar engraver_on_site
        timestamp created_at
        timestamp updated_at
    }

    event_invoices {
        int id PK
        int bill_to_id FK
        int bill_to_contact_id FK
        varchar company
        varchar address1
        varchar address2
        varchar city
        varchar state
        varchar zip
        text invoice_amount
        varchar billing_promo
        varchar billing_company
        varchar billing_account
        int batch_id
        varchar invoice_id
        int transaction_id
        date transaction_date
        int created_by
        timestamp created_at
        timestamp updated_at
    }

    distributor_details {
        int id PK
        int user_id FK
        varchar company
        varchar hart_company
        text private_admin_note
        int blacklist_status
        text blacklist_notes
        varchar avatar
        varchar referred_by
        timestamp created_at
        timestamp updated_at
    }

    events {
        int id PK
        varchar event_name
        int event_status_id
        int premise_id
        tinyint grand_or_large
        enum wet_dry "W | D"
        date date
        date parent_event_date
        time time_from
        time time_to
        tinyint approve_event
        tinyint special_event
        tinyint cancelled_event
        tinyint engraving_event
        int event_type_id
        text note_to_educators
        int educator_id FK
        int distributor_id FK
        int distributor_contact
        int distributor_contact_division
        int supplier_id FK
        int supplier_contact
        int supplier_contact_division
        int reconciliation_status
    }

    products {
        int id PK
        varchar name
        varchar image
        tinyint image_default
        int type
        int sub_type
        int distributor_id FK
        int supplier_id FK
        text summary
        tinyint status
        int inventory
        varchar website
        timestamp created_at
        timestamp updated_at
    }

    event_products {
        int id PK
        int event_id FK
        int product_id FK
        int sample_bottles
        tinyint kit_issued
        tinyint out_of_stock
        timestamp created_at
        timestamp updated_at
    }

    supplier_details {
        int id PK
        int user_id FK
        varchar company
        text private_admin_note
        int blacklist_status
        text blacklist_notes
        varchar logo
        varchar referred_by
        timestamp created_at
        timestamp updated_at
    }

    companies ||--o{ accounts_details : "account type"
    companies ||--o{ distributor_details : "distributor type"
    companies ||--o{ supplier_details : "supplier type"
    events ||--o{ evaluations : "evaluated via"
    events ||--o{ event_products : "features"
    events ||--o{ event_invoices : "billed via"
    products ||--o{ event_products : "used in"
```

### Additional Tables (from Page 9 & 10)

```mermaid
erDiagram
    job_roles {
        int id PK
        varchar name
        varchar slug
        tinyint is_multiple
    }
    programs {
        int id PK
        varchar name
        tinyint status
    }
    states {
        int id PK
        varchar state_code
        varchar state_name
    }
    promo_codes {
        int id PK
        varchar promo_code
        int user_id FK
    }
    divisions {
        int id PK
        varchar name
        tinyint status
    }
    permissions {
        int id PK
        varchar name
        varchar guard_name
        int reorder
    }
    premises {
        int id PK
        varchar name
        varchar slug
        int display_order
    }
    territories {
        int id PK
        text territory_abbrev
        text territory_name
        int region_id FK
    }
    quickbook_batches {
        int id PK
        varchar batch_name
        varchar type
        tinyint status
        longtext batch_info
        int created_by
        int approved_by
        timestamp approved_at
    }
    quickbook_options {
        int id PK
        text territory_abbrev
        text territory_name
        int region_id
    }
    migrations {
        int id PK
        varchar migration
        int batch
    }
```

---

## Page 10 — Database Domain Organization

Page 10 provides the section headers that organize the schema into logical domains:

1. **HEMs Application - Support Tables** (lookup/reference)
2. **Dimensions** (Suppliers, Distributors, Geography)
3. **Supplier Product - Item**
4. **Event / Promotion / Billing / HART Org – Educators**
5. **Account Evaluation – HEMs Educator Results**
6. **Assets Links – Educators** (Videos, Training, Presentation decks)
7. **HEMs Educator Profile / Employee Profiles**
8. **Accounts (Retailers)** — Assets Links

---

## Page 11 — Strategic Product Mapping

Shows current clients (SGWS, Pernod) mapped to systems (Crossbox, HEMs) with task placeholders for the three pillars.

```mermaid
graph TB
    subgraph CURRENT_CLIENTS["Current Key Clients"]
        SGWS["SGWS"]
        PERNOD["Pernod"]
    end

    subgraph SYSTEMS["Systems"]
        CROSSBOX["Crossbox"]
        HEMS["HEMs"]
    end

    subgraph PILLAR1["Internal / Operational Efficiencies"]
        T1["Task 1..8"]
    end

    subgraph PILLAR3["HEMs Platform Transformation"]
        T3["Task 1..8"]
    end

    CURRENT_CLIENTS --> SYSTEMS
    SYSTEMS --> PILLAR1
    SYSTEMS --> PILLAR3
```

---

## Page 12 — Data Architecture: Crossbox & Integrations

Shows the data flow from HEMs PROD through Crossbox to reporting outputs.

```mermaid
graph TB
    subgraph SOURCES["Data Sources"]
        HEMS_PROD[("HEMS Prod<br/>Database")]
        PINATA["PINATA"]
        GSC["GSC"]
        SGWS_ACCT["SGWS Account Data"]
    end

    subgraph CROSSBOX["AWS CROSS BOX Database"]
        direction TB
        MASTER["MASTER TABLE DATA"]
        HEM_DATA["HEM APP DATA"]
        TRADE_DATA["Trade / Event<br/>Marketing Data"]
    end

    subgraph REPORTING["Reporting"]
        API["API"]
        VIEWS["Reporting Views"]
        POWER_BI["POWER BI"]
    end

    subgraph OUTPUTS["Outputs"]
        SLA_EXPORT["SGWS SLA EXPORT"]
        SLA_DOCS["SLA EXCEL DOCS"]
        SUPP_PORTAL["Supplier Portal"]
        DIST_PORTAL["Distributor Portal"]
        COOPERCAST["CooperCast Integration"]
    end

    subgraph DATA_TYPES["Data Categories"]
        SGWS_SLA["SGWS SLA Data"]
        PROGRAM_EVT["Program Event Data"]
        EVT_RESULTS["Event Results Data"]
    end

    SOURCES --> CROSSBOX
    CROSSBOX --> REPORTING
    CROSSBOX --> OUTPUTS
    CROSSBOX --> DATA_TYPES

    HEMS_PROD --> HEM_DATA
    PINATA --> MASTER
    GSC --> MASTER
    SGWS_ACCT --> MASTER

    HART_MGMT["HART Management"]
    CROSSBOX --> HART_MGMT
```

---

## Page 13 — Full Ecosystem: Event Execution + Data Partners + AI

Shows the complete ecosystem including external data partners.

```mermaid
graph TB
    subgraph ACCOUNT_TYPES["Retailer / Chain / Event / On-Prem Account"]
        RETAIL_OFF["Retail Account<br/>Off Premise"]
        RETAIL_ON["Retail Account<br/>On Premise"]
        CONSUMERS["Consumers Sampling"]
        ACCT_SURVEY["Account Survey"]
        SPECIAL["Special Events<br/>(Trade Shows, etc)"]
    end

    subgraph HEMS_CORE["Event / Educator Management"]
        HEM_WEB["HEM Application Web"]
        EDUCATORS["Educators"]
        CALENDAR["Calendar – Date and Time"]
        PROMO_TYPE["Event – Promotion Type"]
        AI_EDU["AI Educator Management"]
        BILLING["$ Cost / Billing and Budgets"]
    end

    subgraph EXTERNAL_DATA["External Data Partners"]
        HIPSTR["HIPSTR"]
        MASTER_VISUAL["Master Visual Item Data"]
        GOOGLE_ANALYTICS["Google Analytics"]
    end

    subgraph DATA_OUTPUTS["Data Outputs"]
        CONSUMER_DATA["Consumer Data"]
        SURVEY_DATA["Survey Data"]
        RETAILER_DATA["Retailer Data"]
        EVENT_EXEC_DATA["Event Execution Data"]
        RETAIL_DEPLETION["Retail Depletions<br/>Sales Data"]
    end

    HART_OPS["HART Office Operations"]

    ACCOUNT_TYPES --> HEMS_CORE
    HEMS_CORE --> DATA_OUTPUTS
    EXTERNAL_DATA --> HEMS_CORE
    HIPSTR --> CONSUMERS
    HIPSTR --> DATA_OUTPUTS
    GOOGLE_ANALYTICS --> CONSUMER_DATA
```

---

## Pages 14-15 — HEMs Application: Back Management + Mobile App

Shows the two-tier architecture: back-office management web app and educator mobile app.

```mermaid
graph TB
    subgraph AWS["Cloud AWS"]
        HEMS_DB[("HEMs App<br/>Database")]
        CROSSBOX_DB[("Crossbox<br/>Database")]
    end

    subgraph BACK_MGMT["HEMs Application – Back Management"]
        direction TB
        HEM_WEB["HEM Application Web"]
        EVT_EDU_MGT["Event / Educator Management"]

        subgraph MGMT_ACTORS["Management Actors"]
            EDU_MANAGERS["Educator - Managers"]
            HART_OPS["HART Office Operations"]
        end

        subgraph MGMT_FUNCTIONS["Management Functions"]
            ASSIGN["Assign Event / Account<br/>to Educator / Date"]
            CALENDAR["Calendar – Date and Time"]
            PROMO_TYPE["Event – Promotion Type"]
            BILLING["$ Cost / Billing and Budgets"]
        end
    end

    subgraph MOBILE_APP["HEM – Apple App / Android App"]
        direction TB
        subgraph MOBILE_LEVEL["Educator Manager Level"]
            M_EDUCATORS["Educators"]
            M_ASSIGN["Assign Event / Account<br/>to Educator / Date"]
            M_CALENDAR["Calendar – Date and Time"]
            M_PROMO["Event – Promotion Type"]
        end

        subgraph FIELD_EXECUTION["Field Execution"]
            RETAIL_ON["Retail Account<br/>On Premise"]
            RETAIL_OFF["Retail Account<br/>Off Premise"]
            SPECIAL["Special Events<br/>(Trade Shows, etc)"]
            CONSUMERS["Consumers Sampling"]
            ACCT_SURVEY["Account Survey"]
        end
    end

    BACK_MGMT --> AWS
    MOBILE_APP --> HEMS_DB
    HEMS_DB --> CROSSBOX_DB

    BACK_MGMT -->|"Assigns & Manages"| MOBILE_APP

    style BACK_MGMT fill:#f0f4ff,stroke:#1565c0
    style MOBILE_APP fill:#e8f5e9,stroke:#2e7d32
```

---

## Page 16 — Crossbox Data Warehouse & Master Data Architecture

The most detailed data architecture page showing the full Crossbox schema, master data hierarchy, and multi-tenant organization model.

```mermaid
graph TB
    subgraph ORG_MODEL["Organization Model"]
        direction LR
        subgraph ORG_TYPES["Organization Types (×3)"]
            SAAS["SaaS Client"]
            CORE["HART Core"]
            AFFILIATE["Affiliate"]
        end
        HART_CRM["HART CRM MASTER"]
    end

    subgraph MASTER_HIERARCHY["Product / Account Hierarchy"]
        direction TB
        DIST_CLIENTS["Distributor Clients"]
        SUPPLIER_NODE["Supplier"]

        subgraph HIERARCHY["Client / Distributor / Supplier"]
            REGION["Region"]
            GEO["Geography"]
            STATE["State"]
            MARKET["Market"]
            CHANNEL["Channel"]
            CHAIN["Chain"]
            ACCOUNT["Account"]
        end

        subgraph PRODUCT_HIERARCHY["Product Hierarchy"]
            BRAND["Brand"]
            LINE["Line"]
            ITEM["Item"]
        end

        ITEM_MASTER[("Item Master")]
        ACCT_MASTER[("Account Master")]

        PRODUCT_CLASS["Product Classification<br/>(Cannabis, Beer, Wine/Spirits,<br/>Food, Beverage)"]
    end

    subgraph MASTER_DATA_SOURCES["Master Data Sources"]
        direction LR
        STATE_BOARD["State Alcohol Board"]
        WEB_SCRAPE["Web Scraping<br/>Item Port from Distributor"]
        DIST_API["Distributor API /<br/>Manual File"]
        SUPP_API["Supplier API /<br/>Manual File"]
        DIST_DATA["Distributor Data"]
        SUPP_DATA["Supplier Data"]
    end

    subgraph CROSSBOX_IDS["Key Identifiers"]
        ITEM_CODES["Distributor and Supplier<br/>Item Code"]
        INVOICE_CODES["Invoice Market Code /<br/>Distributor Warehouse Location"]
        SALES_IDS["Sales / Supplier ID"]
        TDLINK["TDLink / Distributor"]
    end

    subgraph HART_TEAM["HART Educator Team"]
        EDUCATORS_TBL["HART Educators Table"]
        MANAGERS_TBL["HART Manager Table"]
    end

    subgraph ANALYTICS["Analytics & Reporting"]
        direction TB
        subgraph KEY_ACCTS["Key Account Management"]
            KA_SEG["Key Account Segmentation"]
            KA_REPORT["Key Account<br/>Segmentation Reporting"]
            GAP["Gap Total<br/>Account Universe"]
            VIP["Reporting Hierarchy -<br/>VIP Universe Outlet File"]
        end

        subgraph ACTIVITY_DATA["Activity Data"]
            CAMPAIGN["Campaign"]
            ACTIVITIES["Activities<br/>(Events / Surveys)"]
            ACTIVITY_DETAIL["Activity Details"]
            ACTIVITY_RESULTS["Activity Results"]
            EVT_SURVEY["Event / Activity Survey"]
        end

        subgraph PERFORMANCE["Performance"]
            CAMPAIGN_ROI["Campaign / Event ROI<br/>$ vs Sales"]
            ACCT_DEPLETIONS["Account Depletions"]
            DIST_SALES["Distributor Sales Persons"]
        end

        KGI_DASH["KGI - Dashboards"]
    end

    subgraph DATA_INTELLI["HART Data Intelli"]
        direction LR
        DI_SUPP["HART Supplier"]
        DI_DIST["Distributor"]
        DI_CAMPAIGN["Campaign"]
    end

    subgraph SINGLE_SUPPLIER["Single Supplier View"]
        SS_DATA["Data Origin"]
    end

    subgraph AZURE["Azure Data Tables"]
        AZURE_TABLES["Azure Data Tables"]
    end

    subgraph CHAIN_DATA["Chain Management"]
        CHAIN_GROUP["Chain Grouping Table"]
    end

    subgraph COLLECTION["HART Data Collection"]
        direction TB
        DC_ORG["Organization<br/>(SaaS / Core / Affiliate)"]
        DC_CHANNELS["Channels"]
        DC_SUPPLIER["Supplier Profile"]
    end

    %% Connections
    ORG_MODEL --> MASTER_HIERARCHY
    MASTER_DATA_SOURCES --> ITEM_MASTER
    MASTER_DATA_SOURCES --> ACCT_MASTER
    MASTER_HIERARCHY --> CROSSBOX_IDS
    CROSSBOX_IDS --> ANALYTICS
    HART_TEAM --> ANALYTICS
    ANALYTICS --> KGI_DASH
    ANALYTICS --> DATA_INTELLI
    ITEM_MASTER --> ANALYTICS
    ACCT_MASTER --> ANALYTICS
    AZURE --> ANALYTICS
    CHAIN_DATA --> KEY_ACCTS
    COLLECTION --> ACTIVITY_DATA
    SINGLE_SUPPLIER --> SS_DATA

    DIST_CLIENTS --> DIST_DATA
    SUPPLIER_NODE --> SUPP_DATA

    style ORG_MODEL fill:#1a2744,color:#fff
    style ANALYTICS fill:#f0f8ff,stroke:#1565c0
    style MASTER_HIERARCHY fill:#fffff0,stroke:#666
    style MASTER_DATA_SOURCES fill:#f5f5f5,stroke:#999
```

---

## Composite: End-to-End System Flow

```mermaid
flowchart LR
    subgraph ENTRY["Entry Points"]
        EMAIL["📧 Email Request"]
        WEB["🌐 Web Portal<br/>(yourHART)"]
        MOBILE["📱 Mobile App<br/>(iOS/Android)"]
        API_IN["🔗 Affiliate API"]
    end

    subgraph AI_PROCESSING["AI Layer"]
        AI_EMAIL["AI Email Processing<br/>(intake_api)"]
        AI_CLASSIFY["Classifier"]
        AI_MENU["Menu Extractor"]
        AI_SURVEY["AI Survey<br/>Image Recognition"]
        AI_HELPDESK["AI Helpdesk"]
    end

    subgraph PLATFORM["HART Platform"]
        AUTH["Auth & Roles"]
        EVENT_MGT["Event Management"]
        EDU_MGT["Educator Management"]
        ACCOUNT_MGT["Account Management"]
        QUEST["Questionnaire Engine"]
        BILLING_SYS["Billing / QuickBooks"]
    end

    subgraph EXECUTION["Field Execution"]
        ASSIGN["Assignment"]
        CHECKIN["Check-In GPS"]
        SAMPLING["Sampling / Event"]
        DATA_CAP["Data Capture"]
        PHOTOS["Photo Upload"]
        EVAL["Evaluation"]
    end

    subgraph REVIEW["Review"]
        MGR_REVIEW["Manager Review"]
        APPROVE["Approval"]
    end

    subgraph DATA["Data Layer (AWS)"]
        HEMS_DB[("HEMs PROD<br/>RDS MySQL")]
        S3[("S3 myhems-prod<br/>Photos/Assets")]
        CROSSBOX[("Crossbox DB<br/>Master Tables<br/>Event Data<br/>Trade Data")]
        AZURE[("Azure<br/>Data Tables")]
    end

    subgraph OUTPUTS["Outputs & Integrations"]
        POWER_BI["Power BI"]
        SLA_EXPORT["SGWS SLA Export"]
        SUPP_PORTAL["Supplier Portal"]
        DIST_PORTAL["Distributor Portal"]
        COOPERCAST["CooperCast"]
        CLIENT_PKG["Client Packages"]
        KGI["KGI Dashboards"]
        DATA_INTELLI["HART Data Intelli"]
    end

    EMAIL --> AI_EMAIL --> AI_CLASSIFY --> PLATFORM
    WEB --> AUTH --> PLATFORM
    MOBILE --> AUTH
    API_IN --> AUTH

    PLATFORM --> EXECUTION
    AI_SURVEY --> DATA_CAP
    EXECUTION --> REVIEW --> BILLING_SYS

    EVAL --> HEMS_DB
    PHOTOS --> S3
    BILLING_SYS --> HEMS_DB
    HEMS_DB --> CROSSBOX
    CROSSBOX --> AZURE

    CROSSBOX --> OUTPUTS
    HEMS_DB --> OUTPUTS
    S3 --> CLIENT_PKG

    style AI_PROCESSING fill:#e8f5e9,stroke:#2e7d32
    style PLATFORM fill:#e3f2fd,stroke:#1565c0
    style DATA fill:#fff3e0,stroke:#e65100
    style OUTPUTS fill:#fce4ec,stroke:#c62828
```

---

## AWS Infrastructure

```mermaid
graph TB
    subgraph AWS["AWS us-east-1 (N. Virginia)"]
        VPC["VPC: vpc-cf77a7b5"]

        subgraph PROD["Production"]
            EC2_PROD["EC2: HEMs Web App"]
            RDS_PROD[("RDS MySQL<br/>portal-myhems-prod<br/>.cz90ylzkqopr.us-east-1<br/>.rds.amazonaws.com")]
            S3_PROD[("S3: myhems-prod")]
        end

        subgraph STAGING["Staging"]
            EC2_STAGE["EC2: HEMs Demo"]
            MYSQL_LOCAL[("Local MySQL on EC2")]
            S3_STAGE[("S3: myhems-demo")]
        end

        subgraph AI["AI Services (In Dev)"]
            INTAKE["intake_api"]
            CLASSIFIER["classifier"]
            MENU_EXT["menu_extractor"]
        end
    end

    EC2_PROD --> RDS_PROD
    EC2_PROD --> S3_PROD
    EC2_STAGE --> MYSQL_LOCAL
    EC2_STAGE --> S3_STAGE
    AI --> RDS_PROD

    PINATA["PINATA"] --> RDS_PROD
    GSC["GSC"] --> RDS_PROD
    SGWS["SGWS Account Data"] --> RDS_PROD
```
