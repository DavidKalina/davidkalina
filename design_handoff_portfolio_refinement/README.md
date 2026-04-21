# Handoff — Portfolio Refinement

## Overview

This bundle refines the look, feel, and typography of **davidkalina.com** (the Next.js 15 / React 19 / Tailwind / shadcn/ui site in `github.com/DavidKalina/davidkalina`). It is a **refinement pass**, not a redesign — the existing information architecture, routes, content, and data layer stay. The visual language becomes calmer, more editorial, and more senior-engineer.

## About the Design Files

`David Kalina — Portfolio.html` is a **design reference** built as a single static HTML file. It is not production code to copy directly. The task is to recreate this design inside the existing Next.js codebase, updating the React components in `components/` and the tokens in `app/globals.css` + `tailwind.config.ts` — preserving server/client component boundaries, the content constants in `constants/`, the shadcn primitives, the blog pipeline, and the Resend contact action.

## Fidelity

**High-fidelity.** All colors, type, spacing, and interactions are final. Recreate pixel-perfect inside the existing codebase — do not ship the HTML directly.

## Scope

Refine these existing components/sections:
- `components/Navbar.tsx`
- `components/Hero.tsx` + `components/ForceGraph.tsx` + `components/WaveText.tsx` + `components/TechStackBadges.tsx`
- `components/TechStack.tsx` + `components/ExperienceStats.tsx`
- `components/About.tsx`
- `components/ProjectGrid.tsx` + `components/ProjectCard.tsx` + `components/ProjectSplitCard.tsx`
- `components/Blog.tsx` (journal teaser on the homepage)
- `components/Cta.tsx` (contact)
- `components/Footer.tsx`
- `app/globals.css` + `tailwind.config.ts` (tokens, fonts)
- `app/layout.tsx` (Google font imports replace Geist + Space Mono)

Out of scope: `/blog`, `/blog/[slug]`, `/resume` — apply the same tokens but layout is up to you.

---

## Design Tokens

### Fonts

Replace Geist/Geist Mono/Space Mono with:

| Family | Role | Weights |
|---|---|---|
| **Instrument Serif** | Display headlines, pull quotes, stats, large project titles | 400, 400 italic |
| **JetBrains Mono** | Eyebrows, nav, labels, tags, metrics, buttons, mono runs | 400, 500, 700 |
| **Inter** | Body copy, form fields, paragraphs | 400, 500, 600 |

In `app/layout.tsx`, swap the `next/font/google` imports to these three. Expose CSS variables `--font-serif`, `--font-sans`, `--font-mono`. Map `font-serif` / `font-sans` / `font-mono` in `tailwind.config.ts`.

### Color tokens

Use CSS variables in `app/globals.css`. Both modes share the same variable names; only values differ.

**Dark (default):**
```
--bg:       #0c0c08
--bg-elev:  #16160f
--bg-card:  #1b1b15
--border:   #2a2a22
--fg:       #ecece5
--fg-dim:   #a3a39c
--fg-mute:  #71716b
--signal:   #e5a93a
```

**Light:**
```
--bg:       #faf9f5
--bg-elev:  #ffffff
--bg-card:  #ffffff
--border:   #e7e4dc
--fg:       #16160f
--fg-dim:   #52524c
--fg-mute:  #8a8a82
--signal:   #a86f18
```

Add a single ink scale (`ink-50` → `ink-950`) and `signal` to `tailwind.config.ts`. The existing shadcn `--background`/`--foreground` variables should be aliased to `--bg`/`--fg` so shadcn primitives continue working.

**Remove all the vivid gradient backgrounds** currently used on project cards, about panel, skill categories, and CTAs. One restrained amber accent (`--signal`) replaces the full rainbow. Project cards may use a single small monospace label tinted with a muted category hue (`oklch(0.7 0.08 <hue>)`) — hues: 75 (amber), 265 (violet), 340 (rose), 175 (teal), 210 (blue).

### Spacing & layout

- Container: `max-w-[1280px] mx-auto px-8`
- Vertical section rhythm: `py-32 md:py-48` (was `py-16 lg:py-32`)
- Grid: 12 columns, `gap-8`
- Radii: **0** almost everywhere. Cards are sharp rectangles with 1px borders. Buttons are pills (`rounded-full`). Nothing uses `rounded-2xl` / `rounded-3xl` anymore.
- Dividers: hairlines (`border-top: 1px solid var(--border)`) and a dotted pattern for decorative dividers (radial-gradient dots, 8px spacing).

### Typography scale

| Token | Size | Line | Tracking | Family |
|---|---|---|---|---|
| Hero display | `clamp(64px, 9vw, 110px)` | 0.95 | -0.02em | Serif |
| Section H2 | 56–72px | 1.0 | -0.02em | Serif |
| Card title | 40px | 1.05 | -0.015em | Serif |
| Sub-card title | 26–28px | 1.15 | -0.015em | Serif |
| Body | 16–17px | 1.55–1.65 | 0 | Sans |
| Small body | 14–15px | 1.5–1.6 | 0 | Sans |
| Eyebrow | 11px | 1 | **0.14em** UPPERCASE | Mono |
| Index mark | 11px | 1 | 0.16em | Mono |
| Tag / meta | 10–12px | 1 | 0.08–0.12em UPPERCASE | Mono |

Italic (`<em>` or `.italic-serif`) is used as an accent inside serif headlines — keep sparingly (one phrase per headline), tinted with `--signal` about half the time.

### Motion

- Scroll reveals: IntersectionObserver, `opacity 0→1` + `translateY(14px→0)`, `900ms cubic-bezier(.2,.7,.2,1)`. Stagger grid children by 60ms.
- Hover on project rows: serif title flips to italic over 500ms; arrow icon moves up-right.
- Hover on buttons: no scale/shadow spam. Just color shift on the pill background.
- Marquee tech strip: `translateX(0 → -50%)`, 45s linear infinite.
- Hero graph nodes: subtle 6s floating animation, staggered `animationDelay` (0–6s).
- Respect `prefers-reduced-motion`.

### Imagery/assets

None added. The hero force graph stays (it's a signature) but simplified: one amber primary node, the rest neutral, concentric guide rings. Reuse the existing `ForceGraph` component but simplify its palette and remove the popup chrome to use hairline style.

---

## Screens / Sections

### Nav (fixed header)

- Height 64px, `backdrop-filter: blur(12px)`, background `color-mix(in srgb, var(--bg) 75%, transparent)`, `border-bottom: 1px solid var(--border)`.
- Logo: 2px signal-colored dot + `david kalina` in mono 13px.
- Center links: `WORK · STACK · ABOUT · JOURNAL` — mono 12px, `tracking-[0.08em]`, animated underline that sweeps left-to-right on hover (`::after` pseudo, `right: 100% → 0`, 500ms).
- Right: DARK/LIGHT toggle (mono label + dot) and a pill-shaped `CONTACT →` button with 1px border that inverts to signal on hover.

### 000 — Hero

- Section eyebrow row: `— 000 · INDEX` on the left, dotted line, `AVAILABLE — Q2 2026` with a pulsing signal dot on the right.
- Headline: 3 lines in Instrument Serif at 110px. Line 2 contains italic serif word `innovation` tinted `--signal`.
  - Copy: `Human-centered / innovation, built on / scalable tech.`
- Supporting paragraph: 17px Inter, `max-w-[54ch]`, `color: var(--fg-dim)`. Contains `<em>scalable, high-performing, non-blocking</em>` in italic serif for emphasis.
- CTAs: pill `VIEW SELECTED WORK →` (filled with `--fg`, text `--bg`); arrow-link `GET IN TOUCH`; arrow-link `RESUME ↓` dimmed.
- Right column: SVG graph at aspect 1:1, viewBox 500×500, nodes at absolute positions. One amber node (TS, r=30), supporting nodes (r=20 or 14). Edges at `--border`, concentric dashed rings.
- Below hero: 4-column stats — `5yrs`, `$400k+`, `24+`, `10+` — each serif 40px + mono eyebrow.

### Marquee

Thin strip between hero and stack, border-top + border-bottom, 12 tech names in mono 12px `tracking-[0.2em]`, animating left at 45s.

### 001 — Tech Stack

- Eyebrow row `— 001 · EXPERTISE`.
- Split headline: `The tools / I reach for.` (72px serif, "tools" italic).
- Right column: 16px body paragraph + a short italic pull-quote (attributed or not, `color: var(--fg-mute)`).
- Category rows (4 of them): 12-col grid, hairline dividers between rows.
  - Left (3 cols): `— 01`, serif 36px title (`Frontend`, `Backend`, `Data & Infrastructure`, `Cloud & DevOps`), italic serif lede.
  - Right (9 cols): 3-col grid of skills. Each skill: serif name (22px) + mono years (10px) on top row; dim 14px note; hairline underneath.
- No colored category gradients. No skill cards. Just typography on hairlines.

### 002 — About

- Section has `background: var(--bg-elev)` to create a tonal shift.
- Split 7/5.
- Left: 64px serif headline with italic `thoughtful` tinted signal; two-paragraph body at 16px dim; 2×2 quick-stats grid (Core skills / Interests / Based in / Currently).
- Right: pull-quote card — 1px border, 40px padding, no radius, Mono eyebrow `FEATURED — 2023`, italic serif 28px quote with `$400k+ product sale` tinted signal. Then a `CURRENT FOCUS` list with `01 / 02 / 03` numbering in mono.

### 003 — Selected Work

- Eyebrow row with `05 / 05` counter on the right.
- Headline split: `Recent / work.` (work italic).
- 5 project rows, each a 12-col grid separated by hairlines.
  - Col 1 (2): `— NN` project number + year in mono.
  - Col 2 (5): small mono client tag (hued), 40px serif title (italic on row hover), 15px blurb (`max-w-[42ch]`), tech stack as mono words separated by `/`.
  - Col 3 (4): `Metrics` eyebrow + 2–3 metric rows (dotted underline, label dim, value serif 22px).
  - Col 4 (1): arrow link `VIEW →`, translates up-right on hover.
- No colored gradient header blocks. No emoji icons. The row itself is the card.

Projects (order matches existing constants, `num` is the display label, `hue` is the client-tag tint):

| num | year | title | client | hue |
|---|---|---|---|---|
| 05 | 2024 | Real-time Notification Center | Flowty.io | 75 |
| 04 | 2024 | AI Content Optimization Tool | Kent State OEOC | 265 |
| 03 | 2023 | Alfaphox / Revive Ratings | White-label SaaS | 340 |
| 02 | 2023 | Maxwell Pipeline PWA | Maxwell Pipeline Services | 175 |
| 01 | 2021 | Email Distribution Automation | Internal operations | 210 |

### 004 — Journal

- Same tonal shift as About (`bg-elev`).
- Headline `Notes from the workbench.` (workbench italic).
- Three post cards in a 3-col grid, each separated by a top hairline. Each: date + readtime row, signal-tinted category eyebrow, 26px serif title (italic on hover), `READ ENTRY →`.
- Feed from existing `getBlogPosts()` — `ArticleCard` component gets restyled to this shape.

### 005 — Contact

- Split 7/5.
- Left: 96px serif headline `Let's build / something / worth using.` (last line italic + signal). Supporting paragraph. Contact rows as big hairline-separated links (email, GitHub, location) — eyebrow + serif 28px + mono action hint on the right.
- Right: form — no boxy inputs. Each field is just a bottom-hairline with a mono eyebrow `01 · Name` / `02 · Email` / `03 · Project`. Border-color animates to `--signal` on focus. Submit button: filled pill in `--fg`.
- Keep the existing Resend server action — only the visual layer changes.

### Footer

- Massive wordmark `david kalina.` in serif at ~140px (responsive down to 80px).
- 4-col meta grid: Navigate / Elsewhere / Say hi / Colophon.
- Bottom hairline row: © 2026 left, version mark + blinking caret right.

---

## Interactions & Behavior

- **Theme toggle** — persist to `localStorage` key `dk-theme`. Use the existing `context/ThemeProvider.tsx`; only the trigger UI changes.
- **Tweaks panel** in the HTML is a prototype-only feature — do not port.
- **Graph popup** — keep existing hover/tap behavior from `ForceGraph.tsx`; restyle the popup to hairline card (no gradient, no backdrop blur shadow chrome).
- **Form validation** — keep existing client-side `required` + Resend action result states. Restyle status banners with hairline borders + signal/red tint.
- **Respect `prefers-reduced-motion`** — all reveals/marquee/floaty disable.

## State Management

No new state. Existing `useState`/`useTransition` in Cta and Navbar remain. Theme continues through `ThemeProvider`.

## Implementation Notes for Claude Code

1. Start with `app/globals.css` and `tailwind.config.ts` — get tokens + fonts right before touching components.
2. Delete all `bg-gradient-to-*` usages and `from-[#XXX]` color stops. Replace with `bg-[var(--bg-elev)]`, `border border-[var(--border)]`, or the single `bg-signal` where accent is warranted.
3. Drop all `rounded-2xl` / `rounded-3xl` — use `rounded-none` (or just nothing) for cards, keep `rounded-full` only on pills.
4. Strip hover chrome: `hover:shadow-[0_0_20px_...]`, `hover:scale-[1.02]`, glow animations. Replace with the subtle patterns described above.
5. `ExperienceStats` — the hero now owns its own stats row; this component can be deleted or repurposed.
6. `WaveText` is optional — keep if you like, but the refined hero uses italic serif for emphasis instead.
7. Re-test the `ForceGraph` against the simplified palette — don't let the d3 sim drift into saturated colors.
8. Font performance: preconnect + `display=swap`, load only the 3 families × needed weights above.

## Files in this bundle

- `David Kalina — Portfolio.html` — the full static design reference. Open in any browser. The tweaks panel is prototype-only.
- `screenshots/` — section-by-section reference images:
  - `00-hero.png`
  - `01-tech-stack.png`
  - `02-about.png`
  - `03-projects.png`
  - `04-journal.png`
  - `05-contact.png`
  - `06-footer.png`
- `README.md` — this document.
