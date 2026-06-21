"use client";

import Link from "next/link";

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 .5C5.37.5 0 5.78 0 12.292c0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.171 0 1.567-.015 2.83-.015 3.214 0 .315.21.683.825.566C20.565 21.917 24 17.498 24 12.292 24 5.78 18.63.5 12 .5z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const NAV_LINKS = [
  { href: "/#work", text: "Work" },
  { href: "/#about", text: "About" },
];

const SOCIAL_LINKS = [
  {
    href: "https://github.com/DavidKalina",
    label: "GitHub",
    Icon: GithubIcon,
  },
  {
    href: "https://www.linkedin.com/in/david-kalina-b68854342/",
    label: "LinkedIn",
    Icon: LinkedInIcon,
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
        <div className="display text-[48px] md:text-[96px] leading-[0.9] text-fg text-right">
          <span className="italic-serif">david</span> kalina.
        </div>

        <div className="mt-16 flex flex-col md:flex-row md:justify-between gap-8">
          <div>
            <div className="eyebrow mb-3">Navigate</div>
            <ul className="space-y-2 font-mono text-[13px]">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="arrow-link text-fg">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-3">Elsewhere</div>
            <ul className="space-y-2 font-mono text-[13px]">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="arrow-link text-fg inline-flex items-center gap-2"
                  >
                    <Icon />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-3">Say hi</div>
            <ul className="space-y-2 font-mono text-[13px]">
              <li>
                <Link
                  href="mailto:davidkalina@proton.me"
                  className="arrow-link text-fg"
                >
                  davidkalina@proton.me
                </Link>
              </li>
            </ul>
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
