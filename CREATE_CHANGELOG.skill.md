---
description: Create new changelog entries as MDX files in the Ambar changelog site.
globs: "src/module/changelog/content/**/*.mdx"
alwaysApply: false
---

Create changelog entries as `.mdx` files in `src/module/changelog/content/`. Files are auto-discovered -- no manual registration needed.

- Use date-based filenames (`MM-DD-YY.mdx`) or descriptive slugs (`feature-name.mdx`)
- Write all content body in **English**.
- Every entry must have YAML frontmatter with all 5 required fields: `title`, `description`, `date`, `slug`, `order`
- `slug` must be unique across all entries. It maps to `/changelog/{slug}`
- `order` controls display position (ascending: `1` = first on page). Must be unique across entries.
- Before creating any entry, read all existing `.mdx` files in the content directory to determine current `order` values
- When adding an entry to the top, set `order: 1` and increment every existing entry's `order` by 1
- When adding an entry to the bottom, use the next number after the current highest `order`

## Frontmatter

```yaml#example.mdx
---
title: "Entry title"
description: "Short description"
date: "2026-04-01"
slug: "04-01-26"
order: 1
---
```

- `title` -- Entry title (string, required)
- `description` -- Short summary (string, required)
- `date` -- Publication date in `YYYY-MM-DD` format (string, required)
- `slug` -- Unique URL path segment, maps to `/changelog/{slug}` (string, required)
- `order` -- Display sort position, ascending; `1` = first (number, required)

## Custom Components

Use `<MediaBorder>` to wrap images with a styled rounded border. Do not use raw `<img>` without it when the image is a main visual.

```mdx#entry.mdx
<MediaBorder>
  <img
    src="https://example.com/image.png"
    alt="Image description"
  />
</MediaBorder>
```

Use `<CollapsibleSection>` for expandable/collapsible content blocks. The `title` prop is required and displayed as the toggle text.

```mdx#entry.mdx
<CollapsibleSection title="Section heading">
  Collapsible content here.
</CollapsibleSection>
```

Use `<DetailOnly>` to wrap content that should only appear on the detail page (`/changelog/:slug`). On the list page (`/changelog`), this component renders nothing — no DOM, no image loading.

**Convention:** The intro paragraph + first `<MediaBorder>` block = summary (shown on list page). Everything after goes inside `<DetailOnly>`.

```mdx#entry.mdx
Intro paragraph shown on both list and detail pages.

<MediaBorder>
  <img src="..." alt="First screenshot — visible on list page" />
</MediaBorder>

<DetailOnly>

## Next Section

More content only visible on the detail page...

<MediaBorder>
  <img src="..." alt="Additional screenshot — detail page only" />
</MediaBorder>

</DetailOnly>
```

A "Read more →" link is automatically added after the summary on the list page.

Standard markdown is supported: headings, bold, italic, links, lists, code blocks, tables.

## Images

Store screenshots in `public/changelog/<slug>/` and reference them as `/changelog/<slug>/filename.png`. Vite serves `public/` at the URL root.

```
public/changelog/
└── my-feature/
    ├── screenshot-01-overview.png
    ├── screenshot-02-detail.png
    └── screenshot-03-result.png
```

In MDX, reference as:

```mdx#entry.mdx
<MediaBorder>
  <img
    src="/changelog/my-feature/screenshot-01-overview.png"
    alt="Feature overview"
  />
</MediaBorder>
```

## Entry Structure

Every entry has two rendering contexts:

- **List page** (`/changelog`) -- shows only the **summary**: intro paragraph + first `<MediaBorder>` image + an auto-generated "Read more →" link
- **Detail page** (`/changelog/:slug`) -- shows the **full content**

Structure your MDX file like this:

1. **Intro paragraph** (1-2 sentences) -- always visible
2. **First `<MediaBorder>` image** -- the hero screenshot, always visible
3. **`<DetailOnly>` wrapper** -- everything inside only renders on the detail page

For **single-image entries** (e.g. a dashboard with one screenshot + bullet list), wrap the bullet list in `<DetailOnly>` so the list page shows just the intro + image.

For **multi-image entries** (e.g. a step-by-step walkthrough), place `<DetailOnly>` after the first `</MediaBorder>` and wrap all remaining sections through to the end.

## MDX Gotchas

- **Escape `<` and `>` in prose** -- MDX interprets `<10` as an HTML/JSX tag. Use `&lt;` and `&gt;` instead (e.g. `&lt;10 mi`, `&gt;25 mi`).
- **Blank lines around custom components** -- MDX requires a blank line after `<DetailOnly>` / `<CollapsibleSection>` and before their closing tags for markdown inside to be parsed correctly.
- **No raw `<img>` for main visuals** -- always wrap in `<MediaBorder>`.

## Full Example

Below is a complete multi-image entry showing the summary/detail split, local images, `<CollapsibleSection>`, and all conventions.

```mdx#src/module/changelog/content/my-feature.mdx
---
title: "New Feature Name"
description: "Short description of the feature for metadata and previews."
date: "2026-04-01"
slug: "my-feature"
order: 1
---

Brief intro paragraph explaining the feature. This text and the first image below appear on the list page as the summary.

<MediaBorder>
  <img
    src="/changelog/my-feature/screenshot-01-overview.png"
    alt="Overview of the new feature"
  />
</MediaBorder>

<DetailOnly>

## Step-by-Step Walkthrough

Description of the first detailed section.

<MediaBorder>
  <img
    src="/changelog/my-feature/screenshot-02-detail.png"
    alt="Detailed view of step one"
  />
</MediaBorder>

## Result

Final state after using the feature.

<MediaBorder>
  <img
    src="/changelog/my-feature/screenshot-03-result.png"
    alt="Final result after completing the workflow"
  />
</MediaBorder>

<CollapsibleSection title="Reference: Status Codes">

| Status | Meaning |
|--------|---------|
| `active` | Feature is enabled |
| `pending` | Awaiting approval |
| `disabled` | Feature is turned off |

</CollapsibleSection>

</DetailOnly>
```

And a single-image entry:

```mdx#src/module/changelog/content/simple-feature.mdx
---
title: "Simple Feature"
description: "A concise feature with one screenshot."
date: "2026-04-01"
slug: "simple-feature"
order: 2
---

Brief intro paragraph explaining the feature.

<MediaBorder>
  <img
    src="/changelog/simple-feature/screenshot-01.png"
    alt="Feature screenshot"
  />
</MediaBorder>

<DetailOnly>

**Key features:**

- **Highlight 1:** Description of the first highlight
- **Highlight 2:** Description of the second highlight
- **Highlight 3:** Description of the third highlight

</DetailOnly>
```

## Key Files

- Content directory: `src/module/changelog/content/*.mdx`
- Loader (auto-discovery + sorting): `src/module/changelog/helpers/changelog-loader.ts`
- Entry component (rendering + MDX provider): `src/module/changelog/components/changelog-entry.tsx`
- Media border component: `src/module/changelog/components/changelog-media.tsx`
- Collapsible section component: `src/module/changelog/components/changelog-collapsible-section.tsx`
- Detail-only component: `src/module/changelog/components/changelog-detail-only.tsx`
- View context (list vs detail): `src/module/changelog/components/changelog-view-context.tsx`
- List page: `src/pages/changelog.tsx`
- Detail page: `src/pages/changelog-entry.tsx`

Pagination is automatic (5 entries per page). Do not modify the loader or pages to add entries.
