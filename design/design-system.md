# Hart Ops Design System

This document defines the core design constraints and branding rules for the Hart Ops platform. All UI components and screens must adhere to these specifications.

## 1. Core Principles

- **Aesthetic**: Flat, border-based design.
- **Shadows**: Avoid usage of shadows (Elevation 0).
- **Alignment**: Prefer left-aligned text and elements by default or whenever logically feasible.
- **Borders**: Use `1px solid #E2E8F0` for all containers, cards, and dividers.

## 2. Color Palette

### Core Colors

Derived from the primary burgundy and neutral slate palette:

| Token                 | Value     | Usage                                           |
| :-------------------- | :-------- | :---------------------------------------------- |
| **Primary Action**    | `#7D152D` | Primary buttons, active indicators, highlights. |
| **Accent**            | `#0F766E` | Links, secondary CTAs, teal accents.            |
| **App Background**    | `#F8FAFC` | Main application background (Slate 50).         |
| **Foreground / Text** | `#0F172A` | Primary text, headings (Slate 900).             |
| **Card Background**   | `#FFFFFF` | Container backgrounds.                          |
| **Muted Accent**      | `#F1F5F9` | Secondary buttons, hover states (Slate 100).    |
| **Muted Foreground**  | `#64748B` | Secondary text, placeholders (Slate 500).       |
| **Borders**           | `#E2E8F0` | Component borders (Slate 200).                  |

### Primary Scale (50–900)

| Step | Value     |
| :--- | :-------- |
| 50   | `#f8f3f4` |
| 100  | `#f5e4e8` |
| 200  | `#efc1cc` |
| 300  | `#ec8ca2` |
| 400  | `#ec4a70` |
| 500  | `#7D152D` |
| 600  | `#b61036` |
| 700  | `#850d29` |
| 800  | `#5a0b1d` |
| 900  | `#340913` |

### Secondary Scale (50–900)

| Step | Value     |
| :--- | :-------- |
| 50   | `#f9f3f4` |
| 100  | `#f6e3e8` |
| 200  | `#f2bfcb` |
| 300  | `#f286a0` |
| 400  | `#f5416b` |
| 500  | `#f4053d` |
| 600  | `#c00632` |
| 700  | `#8d0626` |
| 800  | `#5e071b` |
| 900  | `#360611` |

### Neutral Scale (50–900)

| Step | Value     |
| :--- | :-------- |
| 50   | `#f6f5f5` |
| 100  | `#eeebec` |
| 200  | `#dbd6d7` |
| 300  | `#c1b8ba` |
| 400  | `#a29497` |
| 500  | `#857478` |
| 600  | `#6a5c5f` |
| 700  | `#4f4447` |
| 800  | `#362f31` |
| 900  | `#201c1d` |

### Text Colors

| Token     | Value     | Usage                    |
| :-------- | :-------- | :----------------------- |
| Primary   | `#0F172A` | Main body text, headings |
| Secondary | `#64748B` | Labels, supporting text  |
| Tertiary  | `#94A3B8` | Placeholders, hints      |
| Disabled  | `#CBD5E1` | Disabled element text    |
| Inverse   | `#FFFFFF` | Text on dark backgrounds |
| Link      | `#0F766E` | Clickable links          |

### Background Colors

| Token    | Value             | Usage                   |
| :------- | :---------------- | :---------------------- |
| Default  | `#F8FAFC`         | App background          |
| Subtle   | `#F1F5F9`         | Hover states, sections  |
| Muted    | `#E2E8F0`         | Table headers, dividers |
| Emphasis | `#7D152D`         | Hero sections, CTAs     |
| Overlay  | `rgba(0,0,0,0.5)` | Modal overlays          |

### Border Colors

| Token    | Value     | Usage                    |
| :------- | :-------- | :----------------------- |
| Default  | `#E2E8F0` | Cards, inputs, dividers  |
| Strong   | `#CBD5E1` | Active borders           |
| Emphasis | `#7D152D` | Focus rings, highlighted |

## 3. Semantic Colors

| Token   | Value     | Usage                          |
| :------ | :-------- | :----------------------------- |
| Success | `#22C55E` | Confirmations, positive states |
| Warning | `#F59E0B` | Cautions, pending states       |
| Error   | `#EF4444` | Errors, destructive actions    |
| Info    | `#3B82F6` | Informational highlights       |

## 4. Status Badges

| State                | Background | Text      |
| :------------------- | :--------- | :-------- |
| Active / Live        | `#DCFCE7`  | `#16A34A` |
| Trial / Upcoming     | `#FEF9C3`  | `#CA8A04` |
| Completed / Inactive | `#F1F5F9`  | `#64748B` |

## 5. Typography

- **Heading Font**: `Inter`
- **Body Font**: `Inter`
- **Mono Font**: `JetBrains Mono`
- **Alignment**: Always **Left-Aligned** (`text-align: start`).

### Type Scale

| Token | Size       |
| :---- | :--------- |
| xs    | `0.75rem`  |
| sm    | `0.875rem` |
| base  | `1rem`     |
| lg    | `1.125rem` |
| xl    | `1.25rem`  |
| 2xl   | `1.5rem`   |
| 3xl   | `1.875rem` |
| 4xl   | `2.25rem`  |
| 5xl   | `3rem`     |

### Font Weights

| Token     | Value |
| :-------- | ----: |
| Light     |   300 |
| Normal    |   400 |
| Medium    |   500 |
| Semibold  |   600 |
| Bold      |   700 |
| Extrabold |   800 |

### Line Heights

| Token   | Value |
| :------ | ----: |
| None    |     1 |
| Tight   |  1.25 |
| Snug    | 1.375 |
| Normal  |   1.5 |
| Relaxed | 1.625 |
| Loose   |     2 |

### Type Styles (as applied in `theme.css`)

| Style   | Size     | Weight | Line Height |
| :------ | :------- | -----: | ----------: |
| h1      | 1.5rem   |    500 |         1.5 |
| h2      | 1.25rem  |    500 |         1.5 |
| h3      | 1.125rem |    500 |         1.5 |
| h4      | 1rem     |    500 |         1.5 |
| body    | 1rem     |    400 |         1.5 |
| body-sm | 0.875rem |    400 |         1.5 |
| caption | 0.75rem  |    400 |         1.5 |
| label   | 1rem     |    500 |         1.5 |

## 6. Spacing & Padding

- **Base Unit**: `4px`
- **Card Internal Padding**: **16px**.
- **Element Padding (Buttons/Inputs)**: `8px` to `16px` horizontal, `8px` to `12px` vertical.
- **Layout Gaps**: `16px` to `24px` for major sections; `8px` for groupings.

### Spacing Scale

| Token | Value |
| :---- | :---- |
| 0     | 0px   |
| 0.5   | 2px   |
| 1     | 4px   |
| 1.5   | 6px   |
| 2     | 8px   |
| 3     | 12px  |
| 4     | 16px  |
| 5     | 20px  |
| 6     | 24px  |
| 8     | 32px  |
| 10    | 40px  |
| 12    | 48px  |
| 16    | 64px  |

## 7. Border Radius

| Token | Value                 | Usage            |
| :---- | :-------------------- | :--------------- |
| none  | `0px`                 | Sharp corners    |
| sm    | `calc(0.75rem - 4px)` | Buttons, inputs  |
| md    | `calc(0.75rem - 2px)` | Small cards      |
| lg    | `0.75rem` (12px)      | Cards, modals    |
| xl    | `calc(0.75rem + 4px)` | Large containers |
| full  | `9999px`              | Circles, pills   |

**Shadcn Integration**: Set `--radius: 0.75rem` globally.

## 8. Component Tokens

### Buttons

| Variant     | Background | Text      | Height | Radius | Weight |
| :---------- | :--------- | :-------- | -----: | -----: | -----: |
| Primary     | `#7D152D`  | `#FFFFFF` |   42px |    6px |    600 |
| Secondary   | `#F1F5F9`  | `#0F172A` |   42px |    6px |    500 |
| Destructive | `#EF4444`  | `#FFFFFF` |   42px |    6px |    600 |

### Input Fields

| Property      | Value               |
| :------------ | :------------------ |
| Height        | `40px`              |
| Border        | `1px solid #E2E8F0` |
| Border Radius | `6px`               |
| Background    | `#FFFFFF`           |
| Placeholder   | `#94A3B8`           |
| Label Size    | `0.875rem`          |
| Label Weight  | `500`               |

### Navigation States

| State    | Background  | Text      | Weight |
| :------- | :---------- | :-------- | -----: |
| Active   | `#F1F5F9`   | `#7D152D` |    600 |
| Inactive | transparent | `#64748B` |    500 |

## 9. Breakpoints

| Token | Value    |
| :---- | :------- |
| sm    | `640px`  |
| md    | `768px`  |
| lg    | `1024px` |
| xl    | `1280px` |
| 2xl   | `1536px` |

## 10. Transitions

### Durations

| Token  | Value |
| :----- | :---- |
| Fast   | 100ms |
| Normal | 200ms |
| Slow   | 300ms |
| Slower | 500ms |

### Easing

| Token      | Value                               |
| :--------- | :---------------------------------- |
| Linear     | `cubic-bezier(0, 0, 1, 1)`          |
| Ease In    | `cubic-bezier(0.4, 0, 1, 1)`        |
| Ease Out   | `cubic-bezier(0, 0, 0.2, 1)`        |
| Ease InOut | `cubic-bezier(0.4, 0, 0.2, 1)`      |
| Spring     | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

## 11. Shadcn/UI Integration

Define the following CSS custom properties in your global stylesheet:

### Colors

- `--background`: `#F8FAFC`
- `--foreground`: `#0F172A`
- `--card`: `#FFFFFF`
- `--card-foreground`: `#0F172A`
- `--popover`: `#FFFFFF`
- `--popover-foreground`: `#0F172A`
- `--primary`: `#7D152D`
- `--primary-foreground`: `#FFFFFF`
- `--secondary`: `#F1F5F9`
- `--secondary-foreground`: `#0F172A`
- `--muted`: `#F1F5F9`
- `--muted-foreground`: `#64748B`
- `--accent`: `#0F766E`
- `--accent-foreground`: `#0F172A`
- `--destructive`: `#EF4444`
- `--destructive-foreground`: `#FFFFFF`
- `--border`: `#E2E8F0`
- `--input`: `#E2E8F0`
- `--ring`: `#7D152D`

### Radius

- `--radius`: `0.75rem`

### Z-Index Scale

| Token    | Value |
| :------- | ----: |
| hide     |    -1 |
| base     |     0 |
| raised   |     1 |
| dropdown |  1000 |
| sticky   |  1100 |
| banner   |  1200 |
| overlay  |  1300 |
| modal    |  1400 |
| popover  |  1500 |
| toast    |  1700 |
| tooltip  |  1800 |
