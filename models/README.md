# Models

This directory stores the Hart mental model graph in four groups:

- `business/`: globally unique business-layer models (`mm1` to `mm5`)
- `experience/`: globally unique role/experience models (`mm6` to `mm9`)
- `ui/`: role-scoped UI and feature models
- `templates/`: starter templates for new model authoring

## Structure

```text
models/
├── business/
├── experience/
├── ui/
│   ├── hart-ops/
│   ├── client-staff/
│   └── educator-mobile/
└── templates/
```

## Naming Rules

- Filenames use lowercase kebab-case.
- Business and experience model IDs are globally unique: `mm1`, `mm2`, ..., `mm9`.
- UI model IDs are scoped to their role directory: `ui/client-staff/mm-ui-001-dashboard-navigation.yml`, `ui/hart-ops/mm-ui-001-authentication.yml`, etc.
- `depends_on` means "read before this model".
- `feeds_into` means "read after this model".
- Hart Ops UI models use the standard header:

```yaml
# =============================================================================
# UI & FEATURE MENTAL MODEL — <Title>
# =============================================================================
```

## Dependency Graph

Solid lines below come from explicit `depends_on` or `feeds_into` relationships in the files. Dotted lines indicate the parent experience model that gives a UI stream its context. Some Hart Ops and client-staff UI dependencies are still marked `TBD` in the source files and are therefore not shown as solid edges.

```mermaid
graph TD
  mm1["mm1 Business Environment"] --> mm2["mm2 Business Model"]
  mm2 --> mm3["mm3 Current Campaign Operations"]
  mm3 --> mm4["mm4 Vision and Transformation Strategy"]
  mm4 --> mm5["mm5 Phase 1 Scope"]
  mm5 --> mm6["mm6 Hart Ops Experience"]
  mm6 --> mm7["mm7 Trial Client Staff Experience"]
  mm7 --> mm8["mm8 Educator Manager Experience"]
  mm8 --> mm9["mm9 Educator Mobile Experience"]
  mm5 --> mm9

  subgraph HartOps["ui/hart-ops"]
    ho1["mm-ui-001 Authentication"]
    ho2["mm-ui-002 Navigation Sidebar"]
    ho3["mm-ui-003 Organizations Management"]
    ho4["mm-ui-004 Events Monitoring"]
    ho5["mm-ui-005 Reports Data Quality"]
  end

  subgraph ClientStaff["ui/client-staff"]
    cs1["mm-ui-001 Dashboard Navigation"]
    cs2["mm-ui-002 Campaign Management"]
    cs3["mm-ui-003 Event Creation Workflow"]
    cs4["mm-ui-004 Event Monitoring"]
    cs5["mm-ui-005 Reports Analytics"]
    cs6["mm-ui-006 Brand Assets Settings"]
  end

  subgraph EducatorMobile["ui/educator-mobile"]
    em1["mm-ui-001 Authentication"]
    em2["mm-ui-002 Event Execution"]
    em3["mm-ui-003 AI Offline"]
    em4["mm-ui-004 Availability"]
  end

  mm6 -. context .-> ho1
  mm6 -. context .-> ho2
  mm6 -. context .-> ho3
  mm6 -. context .-> ho4
  mm6 -. context .-> ho5

  mm7 -. context .-> cs1
  mm7 -. context .-> cs2
  mm7 -. context .-> cs3
  mm7 -. context .-> cs4
  mm7 -. context .-> cs5
  mm7 -. context .-> cs6
  cs1 --> cs2
  cs1 --> cs3
  cs1 --> cs4
  cs1 --> cs5
  cs1 --> cs6
  cs2 --> cs3
  cs3 --> cs4
  cs4 --> cs5

  mm9 -. context .-> em1
  mm9 -. context .-> em2
  mm9 -. context .-> em3
  mm9 -. context .-> em4
  em1 --> em2
  em2 --> em3
  em2 --> em4
  em3 --> em2
```

## Authoring Notes

- Put new business-layer models in `business/`.
- Put new role/experience models in `experience/`.
- Put new UI models under the correct role directory in `ui/`.
- Start from the matching file in `templates/`.
- When a UI model references another UI model, keep the reference within the same role stream unless the file explicitly needs a cross-role link.
