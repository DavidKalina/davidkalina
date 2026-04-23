"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

const LINKS = [
  { href: "/#work", label: "WORK" },
  { href: "/#about", label: "ABOUT" },
];

const ModernNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const resolvedLinks = LINKS.map((link) => {
    if (pathname !== "/" && link.href.startsWith("/#")) return link;
    return link;
  });

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[999]"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "color-mix(in srgb, var(--bg) 75%, transparent)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-page mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--signal)" }}
            aria-hidden
          />
          <span className="font-mono text-[13px] font-medium tracking-tight text-fg">
            david kalina
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {resolvedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[12px] tracking-[0.08em] arrow-link text-fg-dim hover:text-fg transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden md:inline-flex font-mono text-[11px] tracking-[0.1em] items-center gap-2 text-fg-dim hover:text-fg transition-colors"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--fg)" }}
              aria-hidden
            />
            {theme === "dark" ? "DARK" : "LIGHT"}
          </button>

          <a
            href="/resume.pdf"
            download
            className="hidden md:inline-flex font-mono text-[12px] tracking-[0.08em] items-center gap-2 px-4 py-2 rounded-full text-fg-dim hover:text-fg transition-colors"
          >
            RESUME
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M5 1V8M5 8L1.5 4.5M5 8L8.5 4.5M1 9H9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>

          <Link
            href="/#contact"
            className="hidden md:inline-flex font-mono text-[12px] tracking-[0.08em] items-center gap-2 px-4 py-2 rounded-full text-fg border border-[var(--border)] hover:bg-signal hover:text-[var(--bg)] hover:border-signal transition-colors duration-300"
          >
            CONTACT
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </Link>

          <button
            type="button"
            className="md:hidden w-10 h-10 flex items-center justify-center text-fg"
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            aria-label="toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            borderTop: "1px solid var(--border)",
            background: "var(--bg)",
          }}
        >
          <div className="px-6 py-6 space-y-5">
            {resolvedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block font-mono text-[13px] tracking-[0.08em] text-fg"
              >
                {link.label}
              </Link>
            ))}
            <div
              className="pt-5 flex items-center justify-between"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="font-mono text-[11px] tracking-[0.1em] text-fg-dim inline-flex items-center gap-2"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--fg)" }}
                  aria-hidden
                />
                {theme === "dark" ? "DARK" : "LIGHT"}
              </button>
              <div className="flex items-center gap-3">
                <a
                  href="/resume.pdf"
                  download
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-mono text-[12px] tracking-[0.08em] inline-flex items-center gap-2 px-4 py-2 rounded-full text-fg-dim"
                >
                  RESUME
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                    <path d="M5 1V8M5 8L1.5 4.5M5 8L8.5 4.5M1 9H9" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </a>
                <Link
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-mono text-[12px] tracking-[0.08em] inline-flex items-center gap-2 px-4 py-2 rounded-full text-fg border border-[var(--border)]"
                >
                  CONTACT
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                    <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default ModernNavbar;
