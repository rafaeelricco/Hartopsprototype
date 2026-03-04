# Hart Ops Branding & Design System

This document defines the core design constraints and branding rules for the Hart Ops platform. All UI components and screens must adhere to these specifications.

## 1. Core Principles

- **Aesthetic**: Flat, border-based design.
- **Shadows**: Avoid usage of shadows (Elevation 0).
- **Alignment**: Prefer left-aligned text and elements by default or whenever logically feasible.

## 2. Color Palette

Derived from the primary burgundy and neutral slate palette:

| Token                 | Value     | Usage                                           |
| :-------------------- | :-------- | :---------------------------------------------- |
| **Primary Action**    | `#7D152D` | Primary buttons, active indicators, highlights. |
| **App Background**    | `#F8FAFC` | Main application background (Slate 50).         |
| **Foreground / Text** | `#0F172A` | Primary text, headings (Slate 900).             |
| **Card Background**   | `#FFFFFF` | Container backgrounds.                          |
| **Muted Accent**      | `#F1F5F9` | Secondary buttons, hover states (Slate 100).    |
| **Muted Foreground**  | `#64748B` | Secondary text, placeholders (Slate 500).       |
| **Borders**           | `#E2E8F0` | Component borders (Slate 200).                  |

### Shadcn/UI Integration

To seamlessly use shadcn/ui components, define the following variables in your global stylesheet (`globals.css`):

- `--background`: `#F8FAFC` (App Background)
- `--foreground`: `#0F172A` (Foreground / Text)
- `--card`: `#FFFFFF` (Card Background)
- `--card-foreground`: `#0F172A`
- `--popover`: `#FFFFFF`
- `--popover-foreground`: `#0F172A`
- `--primary`: `#7D152D` (Primary Action)
- `--primary-foreground`: `#FFFFFF`
- `--secondary`: `#F1F5F9` (Muted Accent)
- `--secondary-foreground`: `#0F172A`
- `--muted`: `#F1F5F9` (Muted Accent)
- `--muted-foreground`: `#64748B` (Muted Foreground)
- `--accent`: `#0F766E`
- `--accent-foreground`: `#0F172A`
- `--destructive`: `#EF4444`
- `--destructive-foreground`: `#FFFFFF`
- `--border`: `#E2E8F0` (Borders)
- `--input`: `#E2E8F0`
- `--ring`: `#7D152D`

## 3. Typography

- **Heading Font**: `Inter`
- **Body Font**: `Inter`
- **Alignment**: Always **Left-Aligned**.

## 4. Spacing & Padding

- **Card Internal Padding**: **16px** (Customized constraint).
- **Element Padding (Buttons/Inputs)**: `8px` to `16px` horizontal, `8px` to `12px` vertical.
- **Layout Gaps**: `16px` to `24px` for major sections; `8px` for groupings.

## 5. Border Radius

- **Cards & Modals**: `12px` (0.75rem).
- **Buttons & Inputs**: `6px` or `8px` (0.5rem).

### Shadcn/UI Integration

Shadcn calculates border-radius by cascading a base `--radius` variable. Set the global `--radius` to `0.75rem` (12px) to match the card and modal constraints, ensuring standard shadcn components scale proportionally.

- `--radius`: `0.75rem` (12px)
