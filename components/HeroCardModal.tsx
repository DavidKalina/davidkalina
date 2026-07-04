"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { DECK, HeroCardFace } from "./HeroCardFace";

const TILT_MAX_DEG = 14;
const SPRING = { stiffness: 170, damping: 20, mass: 0.6 };

const HeroCardModal = ({
  topIdx,
  onShuffle,
  onClose,
}: {
  topIdx: number;
  onShuffle: () => void;
  onClose: () => void;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  const entry = DECK[topIdx];
  const project = entry.project;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      dialog?.close();
    };
  }, []);

  // Pointer position over the stage, normalized 0..1. Centered at rest.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);

  const rotateX = useTransform(sy, [0, 1], [TILT_MAX_DEG, -TILT_MAX_DEG]);
  const rotateY = useTransform(sx, [0, 1], [-TILT_MAX_DEG, TILT_MAX_DEG]);

  // The sheen sits opposite the pointer, like a fixed light source the card
  // tilts toward, and only shows once the card is actually tilted.
  const sheenX = useTransform(sx, (v) => 100 - v * 100);
  const sheenY = useTransform(sy, (v) => 100 - v * 100);
  const sheenOpacity = useTransform([sx, sy], (v: number[]) =>
    Math.min(1, Math.hypot(v[0] - 0.5, v[1] - 0.5) * 2.4) * 0.85
  );
  const sheen = useMotionTemplate`radial-gradient(58% 58% at ${sheenX}% ${sheenY}%, rgba(255, 255, 255, 0.2) 0%, color-mix(in srgb, var(--signal) 16%, transparent) 38%, transparent 72%)`;

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const recenter = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const goToCaseStudy = () => {
    onClose();
    // Wait a frame so the dialog unmounts and the scroll lock lifts first.
    requestAnimationFrame(() => {
      document
        .getElementById("work")
        ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    });
  };

  return (
    <dialog
      ref={dialogRef}
      className="hc-modal"
      aria-label={`${entry.title} — project card inspector`}
      onCancel={onClose}
    >
      <div
        className="w-full h-full flex items-center justify-center gap-14"
        onPointerMove={onPointerMove}
        onPointerLeave={recenter}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close card inspector"
          className="absolute top-5 right-6 font-mono text-[12px] px-3 py-2"
          style={{ letterSpacing: "0.1em", color: "var(--fg-mute)" }}
        >
          ESC ✕
        </button>

        <div className="flex flex-col items-center gap-6">
          <div className="hc-pop" style={{ perspective: "1100px" }}>
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
            <button
              type="button"
              onClick={onShuffle}
              aria-label="Show next project card"
              className="relative block text-left cursor-pointer rounded-[14px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8"
              style={{
                width: "min(86vw, 400px, calc(74vh * 5 / 7))",
                aspectRatio: "5 / 7",
                outlineColor: "var(--signal)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={topIdx}
                  className="absolute inset-0"
                  initial={reduced ? false : { opacity: 0, y: 14, rotate: 2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -14, rotate: -2 }}
                  transition={{ duration: reduced ? 0 : 0.18, ease: "easeOut" }}
                >
                  <HeroCardFace entry={entry} hint="↻ SHUFFLE" />
                </motion.div>
              </AnimatePresence>
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-[14px] pointer-events-none"
                style={{ background: sheen, opacity: sheenOpacity }}
              />
            </button>
            </motion.div>
          </div>

          <div
            className="hc-pop font-mono text-[10px]"
            style={{ letterSpacing: "0.14em", color: "var(--fg-mute)" }}
          >
            {topIdx + 1} / {DECK.length} · MOVE TO TILT · CLICK TO SHUFFLE
          </div>
        </div>

        <aside className="hc-pop w-[280px]" aria-label="Project details">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={topIdx}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.18, ease: "easeOut" }}
              className="pl-6 space-y-5"
              style={{
                borderLeft:
                  "1px solid color-mix(in srgb, var(--fg) 14%, transparent)",
              }}
            >
              <div>
                <div
                  className="font-mono text-[9px]"
                  style={{ letterSpacing: "0.14em", color: "var(--fg-mute)" }}
                >
                  ROLE
                </div>
                <p
                  className="font-mono text-[12px] mt-1.5 leading-[1.5]"
                  style={{ color: "var(--fg)" }}
                >
                  {project.role}
                </p>
              </div>

              <p
                className="text-[13px] leading-[1.6]"
                style={{ color: "var(--fg-dim)" }}
              >
                {project.blurb}
              </p>

              {project.status && (
                <div
                  className="font-mono text-[10px]"
                  style={{ letterSpacing: "0.12em", color: "var(--signal)" }}
                >
                  {project.status.primary}
                </div>
              )}

              {project.links?.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="block font-mono text-[11px]"
                  style={{ letterSpacing: "0.06em", color: "var(--fg-dim)" }}
                >
                  {label} ↗
                </a>
              ))}

              <button
                type="button"
                onClick={goToCaseStudy}
                className="font-mono text-[11px] tracking-[0.1em] arrow-link text-fg cursor-pointer"
              >
                FULL CASE STUDY
              </button>
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>

      <style jsx>{`
        dialog.hc-modal {
          width: 100vw;
          height: 100vh;
          max-width: none;
          max-height: none;
          margin: 0;
          padding: 0;
          border: none;
          background: transparent;
          overflow: hidden;
        }
        dialog.hc-modal::backdrop {
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }
        dialog.hc-modal[open] .hc-pop {
          animation: hc-pop 0.26s cubic-bezier(0.32, 0, 0.36, 1);
        }
        @keyframes hc-pop {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(8px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          dialog.hc-modal[open] .hc-pop {
            animation: none;
          }
        }
      `}</style>
    </dialog>
  );
};

export default HeroCardModal;
