"use client";

import { useEffect } from "react";

/**
 * Attaches a single shared IntersectionObserver that adds `in` to every
 * `.reveal` / `.reveal-stagger` element as it scrolls into view.
 */
export function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(".reveal, .reveal-stagger");
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
