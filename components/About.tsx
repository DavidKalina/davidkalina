"use client";

import Link from "next/link";
import { ABOUT_CONSTANTS } from "@/constants/about";
import { useReveal } from "@/hooks/useReveal";

const ModernAbout = () => {
  useReveal();
  const { section, headline, paragraphs, stats, featured, focus } = ABOUT_CONSTANTS;

  return (
    <section
      id="about"
      className="py-32 md:py-48 relative"
      style={{
        background: "color-mix(in srgb, var(--bg-elev) 85%, transparent)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <div className="max-w-page mx-auto px-6 md:px-8">
        <div className="flex items-center gap-3 mb-20 reveal">
          <span className="idx">— {section.number} · {section.eyebrow}</span>
          <div className="flex-1 dotline" />
        </div>

        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="display text-[32px] md:text-[44px] leading-[1.05] max-w-[22ch] reveal text-fg">
              {headline.before}
              <span className="italic-serif" style={{ color: "var(--signal)" }}>
                {headline.accent}
              </span>
              {headline.after}
            </h2>

            <div className="mt-14 space-y-6 max-w-[58ch] text-[16px] leading-[1.65] reveal text-fg-dim">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-10 reveal">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="eyebrow mb-3">{stat.label}</div>
                  <p className="text-[15px] leading-[1.6] whitespace-pre-line text-fg">
                    {stat.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div
              className="reveal p-10"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <div className="eyebrow mb-8">{featured.eyebrow}</div>
              <p className="italic-serif text-[28px] leading-[1.25] text-fg">
                {featured.quoteBefore}
                <span style={{ color: "var(--signal)" }}>{featured.quoteAccent}</span>
                {featured.quoteAfter}
              </p>
              <div
                className="mt-10 flex items-center justify-between pt-6"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <span
                  className="font-mono text-[11px] tracking-[0.1em]"
                  style={{ color: "var(--fg-mute)" }}
                >
                  {featured.meta}
                </span>
                <Link
                  href="#work"
                  className="font-mono text-[11px] tracking-[0.1em] arrow-link text-fg"
                >
                  {featured.action} →
                </Link>
              </div>
            </div>

            <div className="mt-8 reveal">
              <div className="eyebrow mb-5">{focus.label}</div>
              <ul className="space-y-4">
                {focus.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 text-[15px] leading-[1.55] text-fg"
                  >
                    <span
                      className="font-mono text-[11px] mt-1.5"
                      style={{ color: "var(--fg-mute)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernAbout;
