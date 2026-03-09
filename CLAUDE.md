# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
```

No test framework is configured.

## Architecture

Next.js 15 (App Router) + React 19 + TypeScript portfolio site deployed on Vercel.

### Routing

- `/` — Homepage (hero, tech stack, about, projects, blog preview, CTA)
- `/blog` — Blog listing (static generation, ISR revalidate=3600)
- `/blog/[slug]` — Blog post pages with markdown rendering
- `/resume` — Resume page

### Data Layer

- **`content/blog/`** — Markdown files with YAML front matter (title, excerpt, date, category, tags)
- **`lib/blog-data.ts`** — Blog fetching functions (`getBlogPosts`, `getBlogPost`), reads from filesystem, markdown→HTML
- **`lib/markdown.ts`** — Markdown parsing with gray-matter + remark
- **`app/actions.ts`** — Server Action for contact form email via Resend API
- **`constants/`** — Static data (tech stack, projects, about content, hero config, force graph config)

### Rendering Strategy

- Server Components by default; Client Components marked with `"use client"`
- Dynamic imports with `next/dynamic` for heavy components (Hero, ForceGraph, TechBadges, WaveText)
- ISR with 3600s revalidation on blog pages
- Static params generation for blog slugs

### Styling

- **Tailwind CSS** with class-based dark mode and CSS variables (HSL format)
- **shadcn/ui** (New York style) — components in `components/ui/` (badge, button, card, dialog, input, textarea)
- **`lib/utils.ts`** — `cn()` helper (clsx + tailwind-merge) for conditional classes
- **Framer Motion** for animations
- **D3** for interactive ForceGraph visualization in hero section

### Key Patterns

- `context/ThemeProvider.tsx` manages dark/light mode via React Context + localStorage
- `hooks/useContainerDimensions.ts` — custom hook for responsive container sizing
- Intersection Observer used for viewport-based lazy rendering
- Blog content uses remark/rehype pipeline with Prism.js syntax highlighting

### Environment Variables

```
RESEND_API_KEY
```
