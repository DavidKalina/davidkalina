"use client";

import Link from "next/link";

const META_COLUMNS = [
  {
    label: "Navigate",
    items: [
      { href: "/#work", text: "Work" },
      { href: "/#stack", text: "Stack" },
      { href: "/#about", text: "About" },
      { href: "/blog", text: "Journal" },
    ],
  },
  {
    label: "Elsewhere",
    items: [
      { href: "https://github.com/DavidKalina", text: "GitHub", external: true },
      {
        href: "https://www.linkedin.com/in/david-kalina-b68854342/",
        text: "LinkedIn",
        external: true,
      },
    ],
  },
  {
    label: "Say hi",
    items: [{ href: "mailto:davidkalina@proton.me", text: "davidkalina@proton.me" }],
  },
];

const ModernFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="pt-24 pb-10"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-page mx-auto px-6 md:px-8">
        <div className="display text-[48px] md:text-[96px] leading-[0.9] text-fg">
          <span className="italic-serif">david</span> kalina.
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {META_COLUMNS.map((col) => (
            <div key={col.label}>
              <div className="eyebrow mb-3">{col.label}</div>
              <ul className="space-y-2 font-mono text-[13px]">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={"external" in item && item.external ? "_blank" : undefined}
                      className="arrow-link text-fg"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="eyebrow mb-3">Colophon</div>
            <p className="font-mono text-[13px] leading-[1.6] text-fg-dim">
              Set in Instrument Serif &amp; JetBrains Mono. Built with Next.js &amp; care.
            </p>
          </div>
        </div>

        <div
          className="mt-16 pt-5 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span
            className="font-mono text-[11px] tracking-[0.1em]"
            style={{ color: "var(--fg-mute)" }}
          >
            © {year} DAVID KALINA — ALL RIGHTS RESERVED.
          </span>
          <span
            className="font-mono text-[11px] tracking-[0.1em]"
            style={{ color: "var(--fg-mute)" }}
          >
            V. 03 · <span className="caret">█</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
