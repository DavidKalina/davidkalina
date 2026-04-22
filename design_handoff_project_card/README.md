# Handoff: Portfolio Project Card (V2 — Annotated Tech + User Journey)

## Overview
A reusable portfolio project card component designed for a personal portfolio site. Each card represents one project and showcases:
1. **Left column** — project title, index, description, and tag list
2. **Right column** — tech stack with per-item role annotations, plus a numbered user-journey column

Currently populated with the "Side Quests" project (a mobile app for social anxiety). The layout is data-driven and designed to be reused across multiple project cards.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing intended look and behavior, not production code to copy directly. The task is to **recreate this design in the target codebase's existing environment** (React, Next.js, Astro, SwiftUI, or whatever the portfolio is built in) using its established patterns, design tokens, and styling approach. If no environment exists yet, choose the most appropriate framework for a content-driven portfolio (Next.js / Astro recommended) and implement the designs there.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions. Recreate pixel-perfectly using the codebase's patterns.

## Screens / Views

### Project Card — V2

**Purpose**: A single portfolio entry showing what the project is, what tech was used, *how each piece of tech was used*, and a step-by-step user journey through the product.

**Overall Layout**
- Container: full-width card, min-height 420px, padding `40px 48px`
- CSS Grid, 2 columns: `280px 1fr`, gap `56px`
- Background: layered radial gradients (warm amber glow bottom-right, subtle blue top-left) over a dark gradient from `#0b0b0c` → `#111113`
- 1px border `#2a2721`
- A 1px-spaced horizontal scanline overlay (`repeating-linear-gradient`, opacity ~0.012) sits above the background for subtle CRT texture

**Left Column — Project Meta (`.pc-meta`)**
- Index line: `— 04`, 11px, letter-spacing `0.2em`, color `#8b857a`
- Title: `Side Quests`, Instrument Serif 52px / line-height 0.95 / letter-spacing `-0.01em`, color `#e8e6e1`
- Description: JetBrains Mono italic, 13px, line-height 1.65, color `#8b857a`, max-width 260px
- Tags: hash-prefixed (`# react-native`), 10.5px, letter-spacing `0.12em`, color `#4a463e`, wrap with `gap: 6px 10px`

**Right Column — Annotated Tech + Journey (`.pc-v2`)**
- 2-column grid: `1.2fr 1fr`, gap 36px
- Left sub-column: list of 5 annotated tech rows
- Right sub-column: dashed left border `#2a2721`, padding-left 28px — the user journey

**Annotated Tech Row (`.pc-annot`)** — 5 instances, each:
- Bottom border `1px solid #2a2721`, padding-bottom 14px, margin-bottom 14px
- Head row: flex, space-between
  - Left: 14px icon + label (15px, `#e8e6e1`), gap 10px
  - Right: role tag — 9.5px, letter-spacing `0.2em`, color `#4a463e` (e.g. `CLIENT`, `CONTRACT`, `PLANNER`, `TOOLS`, `REALITY`)
- Body: 11.5px, line-height 1.6, color `#8b857a`, padding-left 24px
  - `↳` glyph pseudo-element at left:6px, color `#f5a25d` opacity 0.7
  - Inline `<b>` styled as `color: #e8e6e1; font-weight: 500`

**Journey Step (`.pc-step`)** — 5 instances:
- Grid: `28px 1fr`, gap 10px, margin-bottom 14px
- Number cell: zero-padded (`01`, `02`…), 10px, color `#f5a25d` (accent)
- Content cell:
  - Title line: 11.5px, `#e8e6e1`
  - Sub line: 10.5px, `#8b857a`, margin-top 2px
  - Tech chip: inline-block, 1px solid `#2a2721`, border-radius 2px, padding `1px 6px`, 9.5px, letter-spacing `0.1em`, color `#4a463e`, margin-top 4px

**Status Strip (`.pc-status`)**
- Full width at bottom of right column
- Top: 1px dashed `#2a2721`, padding-top 14px, margin-top 22px
- Flex, space-between
- Left: 6px × 6px circular pulsing dot (accent color, 8px accent glow), animation `opacity 1 → 0.35 → 1` over 2.2s ease-in-out infinite
- Content: `BUILDING · TESTFLIGHT BETA APR 2026` and `role: solo · design + eng + ai`
- 10.5px, letter-spacing `0.15em`

## Content (Side Quests instance)

**Meta**
- Index: `04`
- Title: `Side Quests`
- Description: "A mobile app helping people with social anxiety and habitual homebodies build the confidence and routine to get out, explore their interests, and find community. Agentic AI workflow combines guided onboarding with Google Places data to generate personalized, low-pressure activities. Targeting TestFlight beta April 2026."
- Tags: `react-native`, `typescript`, `ai-agents`, `mcp`, `google-places`

**Annotated Tech (5 rows)**
1. **React Native** · role `CLIENT` — "Quest card stack, check-in flow, **streak calendar**. Expo + Reanimated for low-friction micro-interactions."
2. **TypeScript** · role `CONTRACT` — "**Zod** schemas shared between app and agent. One source of truth for quests, venues, and user profile."
3. **AI Agents** · role `PLANNER` — "Onboarding interviewer + quest generator. Reads social anxiety profile, proposes **low-pressure** outings tuned to energy level."
4. **MCP** · role `TOOLS` — "Agent exposes **places.search**, **calendar.book**, **profile.recall** as tools. Clean boundary between reasoning and side-effects."
5. **Google Places** · role `REALITY` — "Grounds every suggestion in a real venue — hours, crowd level, photos. **No hallucinated spots.**"

**User Journey (label: "USER JOURNEY · 7 min first session")**
1. **Guided onboarding** — "Agent asks about interests, comfort zone, energy." — `AI · React Native`
2. **Quest proposed** — "'Walk past the Sunday market. Stay 10 min. No need to buy.'" — `AI · MCP`
3. **Grounded in real venue** — "Pulled hours, photos, and walking time from Places." — `Google Places`
4. **Low-pressure check-in** — "One tap. How'd it feel? 1–5." — `React Native`
5. **Next quest adapts** — "Agent tunes difficulty based on feedback + streak." — `AI · TypeScript`

## Interactions & Behavior
- **Pulsing status dot**: CSS `@keyframes` — opacity oscillates 1 → 0.35 → 1 over 2.2s, ease-in-out, infinite.
- **No hover/click states** on the card itself in the current design (static display card). If extending to make the card clickable as a case-study link: add a hover state that lifts the border color to `#3a3528` and subtly brightens the title. Use 200ms ease transitions.
- **Responsive**: At viewport widths < 900px, collapse to a single column; meta section stacks above the right panel. Tech + journey sub-columns stack vertically below 700px.

## State Management
The card itself is stateless. Content comes from a single `project` data object:

```ts
type ProjectCardData = {
  index: string;             // "04"
  title: string;             // "Side Quests"
  description: string;       // paragraph
  tags: string[];            // ["react-native", ...]
  tech: {
    icon: 'react' | 'ts' | 'ai' | 'mcp' | 'gp';
    label: string;
    role: string;            // "CLIENT", "CONTRACT", etc.
    body: string;            // may contain <b> for emphasis
  }[];
  journey: {
    label: string;           // "USER JOURNEY · 7 min first session"
    steps: {
      title: string;
      sub: string;
      tech: string;          // "AI · React Native"
    }[];
  };
  status: {
    primary: string;         // "BUILDING · TESTFLIGHT BETA APR 2026"
    secondary: string;       // "role: solo · design + eng + ai"
  };
};
```

A portfolio page should map over an array of these and render one card each.

## Design Tokens

**Colors**
| Token | Value | Use |
|---|---|---|
| `--pc-bg` | `#0b0b0c` | card bg top |
| `--pc-bg-2` | `#111113` | card bg bottom |
| `--pc-fg` | `#e8e6e1` | primary text |
| `--pc-fg-dim` | `#8b857a` | secondary text |
| `--pc-fg-faint` | `#4a463e` | faint meta text |
| `--pc-rule` | `#2a2721` | borders + rules |
| `--pc-accent` | `#f5a25d` | warm amber accent |
| `--pc-accent-glow` | `rgba(245, 162, 93, 0.18)` | bg glow |
| `--pc-accent-2` | `#6ea8ff` | React icon |
| `--pc-accent-3` | `#3178c6` | TypeScript icon |

**Typography**
- Display: `Instrument Serif`, regular 400 — used only for project title (52px)
- Mono: `JetBrains Mono`, weights 300/400/500 — used for everything else
- Sizes: 52 / 18 / 15 / 13 / 11.5 / 11 / 10.5 / 10 / 9.5 px
- Letter-spacing: `-0.01em` (title), `0em` (chips, body), `0.1em–0.2em` (uppercase meta)

**Spacing (px)**: 4 · 6 · 10 · 12 · 14 · 16 · 18 · 22 · 24 · 28 · 36 · 40 · 48 · 56

**Borders / radius**: 1px solid or dashed, radius 0 (sharp corners) or 2px (tiny chips only)

**Shadows**: none on card. Accent dot uses `box-shadow: 0 0 8px var(--pc-accent)` for soft glow.

## Assets
- **Fonts**: Google Fonts — `Instrument Serif` and `JetBrains Mono` (weights 300/400/500). Load via `@import` or `<link>`.
- **Icons**: Inline SVG components for React / TypeScript / AI / MCP / Google Places. Recreate from `project-card-components.jsx` or substitute with icons from the target codebase's existing icon library if one exists.
- **No external images** — the design is entirely CSS + SVG + text.

## Files in this bundle
- `Project Card.html` — root HTML with the design canvas wrapper and Tweaks panel (demo shell only; not needed for production)
- `project-card.css` — all card styles. **This is the primary reference.**
- `project-card-components.jsx` — React components: `TechIcon`, `Chip`, `ProjectMeta`. **Reference for component structure.**
- `variant-2.jsx` — the V2 layout: `AnnotRow`, `JourneyStep`, `V2`. **This is the chosen variant — implement this.**
- `design-canvas.jsx` — canvas wrapper used for the design exploration. **Not needed for production**; ignore.
- `variant-1.jsx` — alternate (not chosen). **Ignore** unless you want to compare.

## Implementation Notes
1. Start by porting `project-card.css` into your styling system (CSS Modules, Tailwind `@layer`, styled-components, etc.). Keep the CSS custom properties — they're the theming surface.
2. Port `TechIcon`, `AnnotRow`, `JourneyStep`, and the card container into your component system. Keep props aligned with the `ProjectCardData` type above.
3. Wire up a `projects` array at the portfolio-page level and `map` over it.
4. The `<b>` tags inside annotation bodies are styling hints — either preserve the HTML or switch to a richer content model (e.g. an array of text segments with emphasis flags).
5. The card is designed at full-viewport width (1000px+). If embedding in a narrower layout, scale the left column width (`280px`) proportionally and collapse earlier.
