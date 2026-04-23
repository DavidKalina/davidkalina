"use client";

import { SYSTEMS_CONSTANTS } from "@/constants/systems";
import { useReveal } from "@/hooks/useReveal";
import SystemDiagram from "./SystemDiagram";
import TechStackMarquee from "./TechStackBadges";

const ModernSystems = () => {
  useReveal();
  const { section, systems } = SYSTEMS_CONSTANTS;

  return (
    <>
      <TechStackMarquee />
      <section id="work" className="py-32 md:py-48">
        <div className="max-w-page mx-auto px-6 md:px-8">
          <div className="flex items-center gap-3 mb-20 reveal">
            <span className="idx">— {section.eyebrow}</span>
            <div className="flex-1 dotline" />
          </div>

          <div className="grid grid-cols-12 gap-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <h2 className="display text-[36px] md:text-[52px] leading-[1] reveal text-fg">
                {section.headlineLine1}
                <br />
                <span className="italic-serif">{section.headlineAccent}</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 pt-4">
              <p className="text-[16px] leading-[1.6] reveal text-fg-dim">
                {section.paragraph}
              </p>
            </div>
          </div>

          <div
            className="reveal-stagger"
            style={{
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {systems.map((system, i) => (
              <article
                key={system.num}
                className="grid grid-cols-12 gap-8 py-14"
                style={
                  i > 0 ? { borderTop: "1px solid var(--border)" } : undefined
                }
              >
                <div className="col-span-12 md:col-span-2">
                  <div
                    className="font-mono text-[11px] tracking-[0.14em]"
                    style={{ color: "var(--fg-mute)" }}
                  >
                    — {system.num}
                  </div>
                  <div
                    className="mt-2 font-mono text-[11px] tracking-[0.1em]"
                    style={{ color: "var(--fg-mute)" }}
                  >
                    {system.year}
                  </div>
                </div>

                <div className="col-span-12 md:col-span-10">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-start">
                    <div>
                      <div
                        className="font-mono text-[11px] tracking-[0.12em] mb-3"
                        style={{ color: "var(--fg-mute)" }}
                      >
                        {system.client.toUpperCase()}
                      </div>
                      <h3 className="serif text-[26px] md:text-[30px] leading-[1.15] text-fg">
                        {system.title}
                      </h3>
                      <p className="mt-5 text-[15px] leading-[1.6] max-w-[60ch] text-fg-dim">
                        {system.blurb}
                      </p>
                      {system.infra && (
                        <p
                          className="mt-5 font-mono text-[11px] tracking-[0.14em]"
                          style={{ color: "var(--fg-mute)" }}
                        >
                          ↳ {system.infra.toUpperCase()}
                        </p>
                      )}
                    </div>
                    <div className="md:pt-1">
                      <div className="eyebrow mb-3">Architecture</div>
                      <SystemDiagram pipeline={system.pipeline} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ModernSystems;
