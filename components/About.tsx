"use client";

import Link from "next/link";
import { ABOUT_CONSTANTS } from "@/constants/about";
import { useReveal } from "@/hooks/useReveal";
import TechStackMarquee from "./TechStackBadges";

const ModernAbout = () => {
  useReveal();
  const { headline, paragraphs, stats, featured, focus, offClock } =
    ABOUT_CONSTANTS;

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

            <div className="mt-14 reveal">
              <TechStackMarquee />
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
              className="reveal py-10"
              style={{
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div className="eyebrow mb-7">{featured.eyebrow}</div>
              <p className="italic-serif text-[26px] md:text-[28px] leading-[1.25] text-fg">
                {featured.quoteBefore}
                <span style={{ color: "var(--signal)" }}>{featured.quoteAccent}</span>
                {featured.quoteAfter}
              </p>
              <div
                className="mt-9 pt-5 flex items-center justify-between"
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

            <div className="mt-14 reveal">
              <div className="eyebrow mb-6">{focus.label}</div>
              <ul className="space-y-5">
                {focus.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 text-[15px] leading-[1.55] text-fg"
                  >
                    <span
                      className="font-mono text-[11px] tracking-[0.14em] mt-1.5 shrink-0"
                      style={{ color: "var(--fg-mute)" }}
                    >
                      — {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14 reveal">
              <div className="eyebrow mb-6">{offClock.label}</div>
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {offClock.items.map((item, i) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-5 py-5"
                    style={
                      i > 0 ? { borderTop: "1px solid var(--border)" } : undefined
                    }
                  >
                    <div
                      className="h-14 w-14 shrink-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundColor:
                          "color-mix(in srgb, var(--fg-mute) 15%, transparent)",
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="eyebrow mb-2">{item.eyebrow}</div>
                      <div className="serif text-[18px] leading-tight text-fg truncate">
                        {item.title}
                      </div>
                    </div>
                    <span
                      className="font-mono text-[11px] tracking-[0.12em] shrink-0"
                      style={{ color: "var(--fg-mute)" }}
                    >
                      {item.sub.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernAbout;
