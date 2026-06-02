# Handoff: Projects Section — "Scrubber" (V3, dark, with product demo)

## Overview
A redesign of the **Recent Work / Projects** section for David Kalina's portfolio. It replaces the old information-dense project rows (which showed a blurb, metrics, six tech annotations, a five-step journey, a status bar and links **all at once**) with a calmer, **one-project-at-a-time editorial layout**.

The core idea (V3, "Scrubber"):
- The left column always shows only the **essentials** — title, one-line blurb, key metrics.
- The five-step **build/user journey** is presented as an interactive **story player**: a scrubber along the bottom-left steps through the journey one beat at a time.
- A **product-demo video** sits on the right (angled, lensed, dreamlike) and a large blurred copy of it washes into the **background**. The scrubber drives the video's caption so the demo feels "seeked" to the current step.
- Navigation arrows switch between the (2–3 curated) projects.

## About the Design Files
The files in `reference/` are **design references created in HTML/React + Babel** — a prototype that communicates the intended look, motion, and behavior. **They are not production code to ship directly.** Babel-in-the-browser, the `window.*` globals, and the auto-fit scaling wrapper are prototype scaffolding only.

The task is to **recreate this design in the target codebase** — David's portfolio is **Next.js + React + TypeScript + Tailwind CSS** (with the existing CSS-variable token system in `app/globals.css` and `tailwind.config.ts`). Reuse those tokens and conventions rather than re-importing the values here. The component should slot in alongside the existing `Hero`, `TechStack`, `About`, `Cta` sections (see `app/page.tsx`) and consume the existing `constants/projectGrid.ts` data.

## Fidelity
**High-fidelity.** Colors, typography, spacing, motion timings and easings are final. Recreate pixel-for-pixel using the codebase's Tailwind tokens and `Space Mono` setup. The product-demo "video" is the one **placeholder** — see **Assets**.

---

## Design Tokens

All values below already exist in the repo's `.dark` theme (`app/globals.css`). Use the existing CSS variables (`var(--bg)`, etc.) / Tailwind aliases (`bg-bg`, `text-fg`, `text-signal`, `border-border`…). Listed here for completeness.

### Colors (dark theme — the design is dark-only)
| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#0c0c08` | Stage background |
| `--bg-elev` | `#16160f` | (drawers/elevated — not used in V3) |
| `--bg-card` | `#1b1b15` | Demo video panel background |
| `--border` | `#2a2a22` | Hairlines, dividers, button borders |
| `--fg` | `#ecece5` | Primary text |
| `--fg-dim` | `#a3a39c` | Body/blurb/sub text |
| `--fg-mute` | `#71716b` | Eyebrows, labels, inactive |
| `--signal` | `#e5a93a` | THE accent — amber. Active states, metric-fill, progress, tags |

### Typography
- **Single family: `Space Mono`** (Google Font, weights 400/700, plus italics). The repo aliases serif/sans/mono all to mono on purpose.
- Display/title: weight **500–700**, letter-spacing **−0.03em to −0.05em**, line-height ~0.95–1.1.
- Italic is used for blurbs and step titles (`font-style: italic`, letter-spacing −0.02em).
- **Eyebrow** style: 11px, `letter-spacing: 0.16em`, `text-transform: uppercase`, color `--fg-mute`.
- **Index/idx** style: 11–12px, `letter-spacing: 0.18em`, `font-variant-numeric: tabular-nums`, color `--fg-mute`.

### Spacing / shape
- **Border radius: `0` everywhere** (the brand uses zero radius). The only exceptions are intentional circles (`border-radius: 50%`) on nav-buttons-as-dots, the play button, status dots, and journey nodes.
- Stage padding: **56px**.
- Hairlines are `1px solid var(--border)`; some dividers are dashed.

### Motion (durations / easings)
| Name | Spec | Where |
|---|---|---|
| Primary easing | `cubic-bezier(.2,.7,.2,1)` | Most transitions/reveals |
| Project swap fade | `pv-fade-up` 0.6s — `opacity 0→1, translateY(10px)→0` | Body remount on project change & step change. **Base state is visible**; animation is enhancement-only so content never gets stuck hidden. |
| Scrubber progress/nodes | `width`/`all` 0.6s `cubic-bezier(.2,.7,.2,1)` | Progress line + node grow |
| Step auto-advance | `setTimeout` **3600ms**, loops `(s+1) % n` while `playing` | Scrubber |
| Demo form auto-fill | `demo-typein` **7s** infinite, staggered delays 0.2/0.9/1.6/2.3/3.0s | Demo rows |
| Demo shimmer sweep | `demo-sweep` **4.5s** `cubic-bezier(.4,0,.2,1)` infinite | Diagonal light band |
| Demo progress fill | `demo-fill` **9s** linear infinite (0→100% width) | Demo scrubber bar |
| Demo "LIVE" blink | `demo-blink` 1.6s steps(1) infinite | Rec dot |
| Demo scan highlight | `demo-scan` 7s steps(1) infinite (steps down rows) | Active-row marker |
| Status pulse dot | `pv-pulse` 2.2s ease-in-out infinite (opacity 1↔0.35) | No-metrics fallback |
| Demo panel tilt hover | `transform` 0.6s `cubic-bezier(.2,.7,.2,1)` | Eases tilt toward flat on hover |

All looping/decorative motion is disabled under `@media (prefers-reduced-motion: reduce)`; auto-fill/progress fall back to static partial widths.

---

## Layout

The section is a **fixed editorial frame, 1180 × 760** in the prototype (treat as the design's intrinsic proportions; in-app it should be a full-width section with comparable internal spacing — roughly a `max-width: 1280px` container like the rest of the site, `min-height` ~`760px` / `~80vh`).

### Stage (outer)
- `position: relative; overflow: hidden; padding: 56px;` background `--bg`, font `Space Mono`, color `--fg`.
- **Grain overlay** (optional, matches site): a fixed fractal-noise SVG at `opacity: 0.022`, `mix-blend-mode: overlay` — already present as `body::after` in the repo, so the section may not need its own.
- **Ambient background layer** (z-index 0): a large, heavily blurred, dimmed copy of the demo video (see DemoVideo → ambient). Biased toward the copy side so it reads as "a video playing behind." Spec: `position:absolute; inset:-12% 22% -12% -24%; opacity:0.3; filter: blur(44px) saturate(1.35); transform: scale(1.2); pointer-events:none;`
- Top chrome and body sit at `z-index: 1`.

### Top chrome (row, space-between, flex: 0 0 auto)
- **Left group** (flex, gap 12, align center): eyebrow `SELECTED WORK` · a 64px **dotted leader** (`radial-gradient` dots, 8px×1px tile) · the current project **year** in idx style.
- **Right group** (flex, gap 16, align center):
  - Index readout: `01` (current, color `--fg`) ` / ` (slash in `--border`) `02` (total, color `--fg-mute`), 12px tabular.
  - Prev / Next buttons: **34×34**, `1px solid var(--border)`, transparent bg, chevron icon. Hover → border + icon become `--signal`. Disabled at ends → opacity 0.3.

### Body (below chrome, `margin-top: 30px`, flex: 1, remounts per project via React `key`)
Two-column CSS grid: **`grid-template-columns: minmax(0,0.82fr) minmax(0,1.18fr); gap: 44px; height: 100%`**.

#### Left column (flex column)
1. **Client eyebrow** — `project.client` (e.g. "EEL DATA SYSTEMS"), eyebrow style, margin-bottom 14.
2. **Title** `h2` — `project.title`, 30px, weight 500, letter-spacing −0.03em, color `--fg`.
3. **Blurb** — `project.blurb`, italic 14px, line-height 1.6, color `--fg-dim`, margin-top 14.
4. **Metric strip** — margin-top 22 (see MetricStrip).
5. **Step detail** (`margin-top: auto; padding-top: 24` so it sits above the scrubber; **remounts per step** via React `key={step}` with the `pv-fade-up` enter):
   - Step eyebrow in `--signal`: `Step 02 / 05 — {journey.label}` (label e.g. "Upload → auto-filled form"), margin-bottom 12.
   - Step title — italic 24px, color `--fg`, letter-spacing −0.025em, line-height 1.1. (`journey.steps[step].title`)
   - Step sub — 13.5px, line-height 1.6, `--fg-dim`, margin-top 12. (`journey.steps[step].sub`)
   - Tech tags — from `journey.steps[step].tech` split on `" · "`; each: 10.5px, letter-spacing 0.04em, color `--signal`, padding 4px 9px, `1px solid var(--signal)`; flex gap 7; margin-top 16.
6. **Scrubber** (flex row, gap 14, margin-top 26):
   - **Play/Pause button** — 30×30 circle, same border style as nav buttons. Toggles `playing`. Pause glyph (two bars) when playing, play triangle when paused.
   - **Track** (flex 1, height 24, relative): a full-width dotted leader; a `--signal` **progress line** (height 1px) whose width = `step/(n−1) × 100%` (transition 0.6s); and **N nodes** spaced `space-between`. Each node is a 13px circular hit target containing a dot: 5px default / **8px** when `index ≤ step`; `1.5px` border `--fg-mute` default / `--signal` when reached; the **active** node (index === step) gets `box-shadow: 0 0 8px var(--signal)`. Clicking a node sets `playing=false` and `step=index`.

#### Right column
- The **DemoVideo** panel (`variant="panel"`), captioned `Now: {journey.steps[step].title}`. Fills the column height; the tilt wrapper centers it.

---

## Component: DemoVideo (the product-demo "video")

A placeholder SaaS **screen-recording**. Two variants from one markup:

### Frame (`.demo-frame`)
`position:relative; height:100%; background: var(--bg-card); border:1px solid var(--border); overflow:hidden; display:flex; flex-direction:column.`

1. **Chrome bar** (`flex:0 0 auto`, padding 11×14, bottom hairline): three 8px dot "traffic lights" in `--border`; a **URL chip** (10.5px, `--fg-mute`, faint fill + border) showing the product host (`project.links[0].label` e.g. `app.cudacartagetms.com`, else `<title>.app`); a **`● LIVE`** indicator (9.5px, `--signal`) with a 6px blinking glowing dot.
2. **Stage** (`flex:1`, `display:grid; grid-template-columns:64px 1fr; filter: blur(0.5px)` for soft focus):
   - **Nav rail**: 5 stacked 7px bars (first is `--signal` @ 0.8 opacity, rest faint fg).
   - **Main** (padding 18×20): a header row (a 120×10 title block + a 54×18 outlined `--signal` "button"); then **5 auto-filling form rows**. Each row = `grid 86px 1fr`, a faint **label** bar + a **value** bar (`--signal` @ 55%) whose width animates 0 → ~48–90% and resets (`demo-typein` 7s, staggered) — reads as fields being auto-filled.
   - **Scan highlight**: a `--signal` left-bordered band that steps down the rows (`demo-scan`).
   - **Shimmer**: a diagonal white-7% gradient band sweeping L→R (`demo-sweep`), `z-index:2`.
   - **Vignette** (`z-index:3`, pointer-events none): `radial-gradient(130% 120% at 50% 40%, transparent 48%, rgba(0,0,0,.62) 100%)` plus a faint top sheen — the lensed/dreamlike darkening.
   - **Caption chip** (`z-index:4`, bottom-left): uppercase 10px, `--bg`@78% fill + border, `backdrop-filter: blur(4px)`, a glowing `--signal` dot + the synced text.
3. **Progress bar** (`flex:0 0 auto`, top hairline): pause glyph + a 3px track with a `--signal` fill looping 0→100% (`demo-fill` 9s) + a timestamp `0:14 / 0:42` (10px tabular `--fg-mute`).

### Panel tilt (`.demo-tilt` wrapper, panel variant only)
`perspective: 1700px; height:100%; display:flex; align-items:center; justify-content:center.` The frame inside:
`height:95%; transform: rotateY(-12deg) rotateX(4deg) scale(.95); transform-origin:center; box-shadow: -30px 38px 70px -26px rgba(0,0,0,.75), 0 0 0 1px var(--border); transition: transform .6s.` On hover eases to `rotateY(-7deg) rotateX(2deg) scale(.97)`. This is the "angled, floating product shot" look.

### Ambient variant (`.demo-ambient`)
Same frame, no border/transparent bar backgrounds, wrapped and blurred/dimmed per the Stage's ambient spec above. `aria-hidden`.

---

## MetricStrip (key metrics — always visible)
- If `project.metrics` is non-empty: a flex row (gap `0 36px` at the small size used in V3) of pairs — **value** (30px, weight 500, letter-spacing −0.03em, `--fg`) over an **eyebrow label** (10px, margin-top 8). Data is `metrics: [label, value][]`, rendered as value-on-top.
- **No-metrics fallback** (e.g. *Side Quests*): a pulsing `--signal` status dot + `status.primary` (16px, `--fg`) over `status.secondary` (eyebrow). This keeps the "at a glance" line meaningful when a project has no numbers yet.

---

## Interactions & Behavior
- **Project navigation**: Prev/Next arrows change project index `i` (clamped 0…n−1). Body is keyed by `i` → remounts with the `pv-fade-up` enter. Year + index readout update.
- **Scrubber / story player**:
  - `playing` defaults **true**; a `setTimeout(…, 3600)` advances `step = (step+1) % n` and re-arms on each `step`/`playing` change.
  - Play/Pause toggles `playing`.
  - Clicking any node **or** the implicit step jump sets `playing=false` and `step=index`.
  - On every `step` change: the left **step detail** remounts/fades, the **progress line + nodes** animate, and the demo **caption** updates to `Now: {step title}`.
- **Demo panel**: hover eases the tilt slightly flatter (purely cosmetic). All inner motion is autonomous CSS loops.
- **Reduced motion**: disable loops; show static end states (content always legible).

## State Management
- `i: number` — current project index (0…n−1).
- `step: number` — current journey step (0…steps.length−1).
- `playing: boolean` — scrubber autoplay.
- Auto-advance timer keyed off `[step, playing, n]`. No data fetching — data is static from `constants/projectGrid.ts`.

## Data
Source of truth is the repo's **`constants/projectGrid.ts`** (`PROJECT_GRID_CONSTANTS.projects`). Each project provides: `num, year, title, client, role, blurb, metrics: [label,value][], stack[], tech[] ({label, role, body}), journey ({label, steps:[{title, sub, tech}]}), status ({primary, secondary}), links[] ({label, href})`. V3 consumes: `client, title, blurb, metrics` (or `status` fallback), `journey.label`, `journey.steps[]`, and `links[0].label` (demo host). The prototype's `reference/data/projects.js` is a transcribed snapshot — **use the real `constants/projectGrid.ts` in-app.**

> Note: the prototype uses small geometric glyphs (▲ ■ ◆ ● ✦ ⬟) as stand-ins for tech logos to avoid trademark issues. Swap for the repo's real tech icons (the `TechIconKey` set in `projectGrid.ts`) when implementing.

## Assets
- **Product demo video** — currently a CSS placeholder (`.demo-frame`). Replace `.demo-stage`'s faux UI with a real muted, looping screen recording (or poster image) of the actual product (e.g. Cudacartage TMS auto-fill flow). Keep it inside the tilted/vignetted frame. Ideal: a short MP4/WebM loop, or per-step poster frames that swap with the scrubber.
- **Fonts** — `Space Mono` (already loaded by the site).
- No other image assets.

## Files (in `reference/`)
- `V3 Reference.html` — open this to see the design running standalone (full V3, both projects via the ‹ › arrows). Babel-in-browser; just open in a browser.
- `variations/V3Journey.jsx` — the V3 section component (layout, scrubber, state).
- `variations/Shell.jsx` — `ProjectShell` (stage, dark theme class, top chrome, project nav, ambient slot), `MetricStrip`, `Chevron`, `TechGlyph`.
- `variations/DemoVideo.jsx` — the product-demo placeholder (panel + ambient).
- `styles/tokens.css` — all tokens + the `demo-*`, `pv-*` classes and keyframes referenced above (the authoritative source for exact values/animations).
- `data/projects.js` — transcribed project data (use the real `constants/projectGrid.ts` instead).

## Suggested implementation notes
- Build as a client component (`"use client"`) — it has timers and interactive state.
- Port `tokens.css`'s `demo-*` / `pv-*` rules into the app's CSS (or Tailwind `@layer components`), referencing existing `var(--*)` tokens; don't hardcode hexes.
- Honor `prefers-reduced-motion`.
- The left/right grid collapses to a single column on narrow viewports (stack: essentials + scrubber, then the demo) — mirror the repo's existing breakpoints.
