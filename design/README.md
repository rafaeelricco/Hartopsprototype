# Hart Ops Design System

This directory holds the source design system artifacts for the Hart Ops project.

## File Map

| File | Purpose | Primary Audience |
| :--- | :------ | :--------------- |
| `tokens.json` | Machine-readable design tokens for colors, typography, spacing, components, images, and platform metadata. | Developers, scripts, AI agents |
| `design-system.md` | Human-readable design system reference covering visual rules, component guidance, and usage constraints. | Designers, developers, AI agents |

## Usage Guide

- Use `tokens.json` when you need structured values for implementation, generation, validation, or automation.
- Use `design-system.md` when you need narrative guidance, design intent, or a quick human review of the system.
- Treat `tokens.json` as the canonical source for reusable token values such as colors, spacing, typography, and image metadata.

## Extension Rules

- Add new machine-readable assets in subdirectories grouped by type as this directory grows, such as `icons/`, `components/`, or `illustrations/`.
- Keep role-based filenames at the root when they are canonical entry points, following the current `tokens.json` and `design-system.md` pattern.
- Prefer colocating related documentation with new asset folders when the content is too detailed for this README.
