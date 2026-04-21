"use client";

import { TECH_STACK_CONSTANTS } from "@/constants/techStack";
import { useReveal } from "@/hooks/useReveal";
import TechStackMarquee from "./TechStackBadges";

const ModernTechStack = () => {
  useReveal();
  const { section, categories } = TECH_STACK_CONSTANTS;

  return (
    <>
      <TechStackMarquee />
      <section id="stack" className="py-32 md:py-48">
        <div className="max-w-page mx-auto px-6 md:px-8">
          <div className="flex items-center gap-3 mb-20 reveal">
            <span className="idx">— {section.number} · {section.eyebrow}</span>
            <div className="flex-1 dotline" />
          </div>

          <div className="grid grid-cols-12 gap-8 mb-24">
            <div className="col-span-12 md:col-span-5">
              <h2 className="display text-[36px] md:text-[52px] leading-[1] reveal text-fg">
                {section.headlinePrefix}
                <span className="italic-serif">{section.headlineAccent}</span>
                {section.headlineSuffix}
                <br />
                {section.headlineLine2}
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 pt-4">
              <p className="text-[16px] leading-[1.6] reveal text-fg-dim">{section.paragraph}</p>
              <p className="mt-6 text-[14px] italic-serif reveal" style={{ color: "var(--fg-mute)" }}>
                {section.quote}
              </p>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {categories.map((cat, i) => (
              <div
                key={cat.idx}
                className="grid grid-cols-12 gap-8 py-12 reveal"
                style={i > 0 ? { borderTop: "1px solid var(--border)" } : undefined}
              >
                <div className="col-span-12 md:col-span-3">
                  <div
                    className="font-mono text-[11px] tracking-[0.14em] mb-3"
                    style={{ color: "var(--fg-mute)" }}
                  >
                    — {cat.idx}
                  </div>
                  <h3 className="serif text-[36px] leading-[1.05] text-fg">{cat.title}</h3>
                  <p
                    className="mt-3 italic-serif text-[15px] max-w-[24ch]"
                    style={{ color: "var(--fg-mute)" }}
                  >
                    {cat.lede}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="group">
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="serif text-[22px] text-fg">{skill.name}</span>
                          <span
                            className="font-mono text-[10px] tracking-[0.1em]"
                            style={{ color: "var(--fg-mute)" }}
                          >
                            {skill.yrs}
                          </span>
                        </div>
                        <p className="text-[14px] leading-[1.5] text-fg-dim">{skill.note}</p>
                        <div
                          className="mt-4 h-px w-full"
                          style={{ background: "var(--border)" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ModernTechStack;
