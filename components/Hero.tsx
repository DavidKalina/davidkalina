"use client";

import Link from "next/link";
import { HERO_CONSTANTS } from "@/constants/hero";
import { useReveal } from "@/hooks/useReveal";
import HeroCard from "./HeroCard";

const ArrowGlyph = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path
      d="M1 11L11 1M11 1H3M11 1V9"
      stroke="currentColor"
      strokeWidth="1.3"
    />
  </svg>
);

const ModernHero = () => {
  useReveal();
  const { headline, description, stats } = HERO_CONSTANTS;

  return (
    <section className="relative pt-36 pb-28 md:pt-44 md:pb-40" id="top">
      <div className="max-w-page mx-auto px-6 md:px-8">
        <div className="flex items-center gap-3 mb-14 reveal">
          <span className="idx">— 000 · INDEX</span>
          <div className="flex-1 dotline" />
          <span className="idx flex items-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ background: "var(--signal)" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "var(--signal)" }}
              />
            </span>
            {HERO_CONSTANTS.availability}
          </span>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="eyebrow mb-6 reveal">{HERO_CONSTANTS.eyebrow}</p>

            <h1 className="display text-[40px] sm:text-[56px] md:text-[72px] leading-[0.95] reveal text-fg">
              {headline.line1}
              <br />
              <span className="italic-serif" style={{ color: "var(--signal)" }}>
                {headline.accent}
              </span>
              {headline.line2After}
              <br />
              {headline.line3}
            </h1>

            <p className="mt-10 max-w-[54ch] text-[17px] leading-[1.55] reveal text-fg-dim">
              {description.before}
              <span className="italic-serif text-fg">{description.accent}</span>
              {description.after}
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-8 reveal">
              <Link
                href="#work"
                className="font-mono text-[12px] tracking-[0.1em] inline-flex items-center gap-3 px-6 py-4 rounded-full"
                style={{ background: "var(--fg)", color: "var(--bg)" }}
              >
                {HERO_CONSTANTS.cta.primary}
                <ArrowGlyph />
              </Link>
              <Link
                href="#contact"
                className="font-mono text-[12px] tracking-[0.1em] arrow-link text-fg"
              >
                {HERO_CONSTANTS.cta.secondary}
              </Link>
              <Link
                href="/resume"
                className="font-mono text-[12px] tracking-[0.1em] arrow-link text-fg-dim"
              >
                {HERO_CONSTANTS.cta.tertiary} ↓
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 relative min-h-[500px] reveal">
            <HeroCard />
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 reveal">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="eyebrow mb-2">{stat.label}</div>
              <div className="serif text-[40px] leading-none text-fg">
                {stat.value}
                <span style={{ color: "var(--fg-mute)" }}>{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
