# Hart Agency Design System

Tokens live in [`/app/frontend/src/globals.css`](../app/frontend/src/globals.css). This folder describes what those tokens mean, how they're used, and what principles drive them. It does not author tokens — the running code does.

That inversion is deliberate: Hart Agency has one frontend consumer and no separate Figma handoff pipeline, so the canonical source is the thing that actually ships. Everything here is descriptive.

## Where to start

| I am a…                             | Go to…                                                                                                                           |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Designer / developer / reviewer** | [`design-system.md`](design-system.md) — the complete design language on one page.                                               |
| **Mobile designer**                 | [`educator-mobile.md`](educator-mobile.md) — the PWA spec (frame, primitives, screens).                                          |
| **Browsing visually**               | Open [`index.html`](index.html) in a browser — single-page catalog with every preview card inlined.                              |
| **Changing a token**                | Edit [`/app/frontend/src/globals.css`](../app/frontend/src/globals.css), then resync [`preview/tokens.css`](preview/tokens.css). |
| **AI agent / Claude Code**          | [`SKILL.md`](SKILL.md) is the skill manifest.                                                                                    |

## Layout

```
design/
├── README.md           ← you are here
├── SKILL.md            ← Claude Code skill manifest
├── design-system.md    ← THE design language (one page)
├── educator-mobile.md  ← Mobile PWA spec
├── index.html          ← Unified visual catalog (iframes every preview card)
├── preview/            ← Static HTML cards + tokens.css mirror
└── assets/             ← Logo, mobile screenshots, fonts.md
```

## Drift hygiene

`globals.css` authors tokens. `preview/tokens.css` is a manual mirror consumed by the HTML preview cards — resync it whenever a token value changes. Drift is a review signal, not a bug, but keep it tight.

No `tokens.json`, no Style Dictionary, no build step.
