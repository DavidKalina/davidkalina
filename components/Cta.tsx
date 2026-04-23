"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { sendContactEmail } from "../app/actions";
import { useReveal } from "@/hooks/useReveal";

const ArrowGlyph = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path
      d="M1 11L11 1M11 1H3M11 1V9"
      stroke="currentColor"
      strokeWidth="1.3"
    />
  </svg>
);

const ModernCTA = () => {
  useReveal();
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await sendContactEmail(formState);
      if (result.error) {
        setStatus({ type: "error", message: result.error });
      } else {
        setStatus({
          type: "success",
          message: "Message sent. I'll reply within 24 hours.",
        });
        setFormState({ name: "", email: "", message: "" });
      }
    });
  };

  return (
    <section id="contact" className="py-32 md:py-48">
      <div className="max-w-page mx-auto px-6 md:px-8">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
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
            <p className="mt-10 max-w-[52ch] text-[16px] leading-[1.6] reveal text-fg-dim">
              Currently open to mid-level or senior full-stack roles.
            </p>

            <div className="mt-14 space-y-5 reveal">
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
                    Colorado · UTC−7
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <form className="reveal" onSubmit={handleSubmit}>
              <div className="eyebrow mb-8">Or — send a note</div>
              <div className="space-y-2">
                <label className="block">
                  <span className="eyebrow">01 · Name</span>
                  <input
                    className="field"
                    type="text"
                    required
                    placeholder="Your name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, name: e.target.value }))
                    }
                  />
                </label>
                <label className="block mt-8">
                  <span className="eyebrow">02 · Email</span>
                  <input
                    className="field"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                  />
                </label>
                <label className="block mt-8">
                  <span className="eyebrow">03 · Project</span>
                  <textarea
                    className="field"
                    rows={4}
                    required
                    placeholder="Tell me a bit about what you're building…"
                    style={{ resize: "none" }}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                  />
                </label>
              </div>

              {status.message && (
                <div
                  className="mt-8 p-4 font-mono text-[12px]"
                  style={{
                    border: `1px solid ${
                      status.type === "success"
                        ? "var(--signal)"
                        : "var(--destructive)"
                    }`,
                    color:
                      status.type === "success"
                        ? "var(--signal)"
                        : "var(--destructive)",
                  }}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="mt-12 font-mono text-[12px] tracking-[0.1em] inline-flex items-center gap-3 px-7 py-4 rounded-full transition-opacity disabled:opacity-60"
                style={{ background: "var(--fg)", color: "var(--bg)" }}
              >
                {isPending ? "SENDING…" : "SEND MESSAGE"}
                <ArrowGlyph />
              </button>
            </form>
            <p
              className="mt-6 font-mono text-[11px] tracking-[0.1em]"
              style={{ color: "var(--fg-mute)" }}
            >
              Prefer email?{" "}
              <Link
                href="mailto:davidkalina@proton.me"
                className="arrow-link text-fg"
              >
                davidkalina@proton.me
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCTA;
