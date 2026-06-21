"use client";

import { useReveal } from "@/hooks/useReveal";

const ModernCTA = () => {
  useReveal();

  return (
    <section id="contact" className="py-32 md:py-48">
      <div className="max-w-page mx-auto px-6 md:px-8">
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="display text-[44px] md:text-[72px] leading-[0.98] reveal text-fg">
              Let&apos;s build
              <br />
              something
              <br />
              <span className="italic-serif" style={{ color: "var(--signal)" }}>
                worth using.
              </span>
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="reveal">
              <a
                href="mailto:davidkalina@proton.me"
                className="group flex items-center justify-between py-5"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div>
                  <div className="eyebrow mb-2">Email — preferred</div>
                  <div className="serif text-[28px] leading-none text-fg">
                    davidkalina@proton.me
                  </div>
                </div>
                <span
                  className="font-mono text-[11px] tracking-[0.1em] group-hover:translate-x-1 transition-transform"
                  style={{ color: "var(--fg-mute)" }}
                >
                  WRITE →
                </span>
              </a>
              <a
                href="https://github.com/DavidKalina"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between py-5"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div>
                  <div className="eyebrow mb-2">GitHub</div>
                  <div className="serif text-[28px] leading-none text-fg">
                    github.com/DavidKalina
                  </div>
                </div>
                <span
                  className="font-mono text-[11px] tracking-[0.1em] group-hover:translate-x-1 transition-transform"
                  style={{ color: "var(--fg-mute)" }}
                >
                  VISIT →
                </span>
              </a>
              <div
                className="flex items-center justify-between py-5"
                style={{
                  borderTop: "1px solid var(--border)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div>
                  <div className="eyebrow mb-2">Location</div>
                  <div className="serif text-[28px] leading-none text-fg">
                    Colorado
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCTA;
