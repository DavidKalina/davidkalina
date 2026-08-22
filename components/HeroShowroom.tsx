"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { SHOWROOM_DECK } from "@/constants/showroom";
import { createSpin, DRAG_SENSITIVITY, SWAP_KICK, type Spin } from "@/components/showroom/spin";

/**
 * THE HERO'S RIGHT-HAND COLUMN — a project on a turntable, and the chrome
 * around it.
 *
 * This half owns everything the DOM is better at: which project is showing, the
 * label under the plinth, the buttons, the keyboard route through it. The
 * canvas owns the picture. They meet at exactly two things — the entry, and the
 * `spin` ref that the pointer writes and the render loop reads.
 *
 * The ref is deliberate. Yaw changes every frame, and yaw in React state is a
 * re-render of this subtree sixty times a second to move a number that no DOM
 * node reads.
 */

// three.js and the models are ~200KB of the hero's weight and none of it is
// above the fold on a phone, where this column does not render at all. Keeping
// it out of the critical path is what lets the headline paint first.
//
// Which is also why the spin constants come from `showroom/spin`, and not from
// `showroom/Showroom` where they used to live: a value import from the module
// this line is lazily loading would have pulled the whole of three.js back into
// the entry chunk and quietly cancelled the split.
const Showroom = dynamic(() => import("@/components/showroom/Showroom"), {
  ssr: false,
  loading: () => <PlinthSkeleton />,
});

/** What stands in while the canvas loads: the plinth's footprint and nothing
 *  else. A spinner here would be motion at idle. */
function PlinthSkeleton() {
  return (
    <div className="w-full h-full flex items-end justify-center pb-[18%]" aria-hidden>
      <div
        className="w-[62%] rounded-[50%]"
        style={{ height: 14, border: "1px solid color-mix(in srgb, var(--fg) 12%, transparent)" }}
      />
    </div>
  );
}

const Chevron = ({ dir }: { dir: -1 | 1 }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
    <path
      d={dir === 1 ? "M3 1L7 5L3 9" : "M7 1L3 5L7 9"}
      stroke="currentColor"
      strokeWidth="1.3"
    />
  </svg>
);

export default function HeroShowroom() {
  const [index, setIndex] = useState(0);
  const spin = useRef<Spin>(createSpin());
  // Where the pointer was last frame, and whether it has moved far enough to
  // count as a drag. Null means no button is down.
  const drag = useRef<{ x: number; moved: boolean } | null>(null);

  const entry = SHOWROOM_DECK[index];
  const { project } = entry;

  const step = useCallback((dir: -1 | 1) => {
    setIndex((i) => (i + dir + SHOWROOM_DECK.length) % SHOWROOM_DECK.length);
    // The turntable acknowledges the press. Direction follows the button, so
    // "next" sends the model round the way the eye is already travelling.
    spin.current.velocity += SWAP_KICK * dir;
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, moved: false };
    spin.current.held = true;
    spin.current.velocity = 0;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 2) d.moved = true;
    spin.current.yaw += dx * DRAG_SENSITIVITY;
    // The flick the release will spend. Derived from this frame's movement
    // rather than accumulated: what matters is how fast the pointer was going
    // when it let go, not how far it travelled getting there.
    spin.current.velocity = dx * DRAG_SENSITIVITY * 12;
    d.x = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    drag.current = null;
    spin.current.held = false;
  };

  return (
    <div className="w-full h-full flex flex-col justify-center gap-5">
      {/* THE BOX. `touch-action: none` because on a touch device a horizontal
          drag on the model is a turn, and the browser's default is to read it
          as the start of a page pan and then swallow every move event. */}
      <div
        className="relative w-full cursor-grab active:cursor-grabbing select-none"
        style={{ height: "min(46vh, 360px)", touchAction: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerEnter={() => {
          // Hover drift is an interaction, but only for people who have not
          // asked for less of it.
          spin.current.hovered = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        }}
        onPointerLeave={() => {
          spin.current.hovered = false;
        }}
      >
        <Showroom model={entry.model} accent={entry.accent} spin={spin} />
      </div>

      {/* THE PLATE. Under the plinth, where a showroom puts it. */}
      <div className="px-1">
        <div
          className="flex items-center gap-1.5 font-mono text-[10px]"
          style={{ letterSpacing: "0.12em" }}
        >
          <span style={{ color: "var(--signal)" }}>{project.year}</span>
          <span style={{ color: "var(--fg-mute)" }}>·</span>
          <span style={{ color: "var(--fg-dim)" }}>{entry.category}</span>
        </div>

        <Link
          href={project.href}
          className="mt-2 block font-mono font-semibold text-[20px] leading-[1.15] text-fg arrow-link"
        >
          {project.title}
        </Link>

        <p className="mt-2 text-[14px] leading-[1.5] text-fg-dim max-w-[36ch]">{entry.caption}</p>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous project"
              className="grid place-items-center w-7 h-7 rounded-full text-fg-dim hover:text-fg transition-colors"
              style={{ border: "1px solid color-mix(in srgb, var(--fg) 16%, transparent)" }}
            >
              <Chevron dir={-1} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next project"
              className="grid place-items-center w-7 h-7 rounded-full text-fg-dim hover:text-fg transition-colors"
              style={{ border: "1px solid color-mix(in srgb, var(--fg) 16%, transparent)" }}
            >
              <Chevron dir={1} />
            </button>
          </div>

          {/* Which of the two you are on. Dots rather than "1 / 2" because the
              count is the least interesting thing about it. */}
          <div className="flex items-center gap-1.5" role="presentation">
            {SHOWROOM_DECK.map((d, i) => (
              <span
                key={d.project.num}
                className="block w-1.5 h-1.5 rounded-full transition-colors"
                style={{
                  background: i === index ? "var(--signal)" : "var(--fg-mute)",
                  opacity: i === index ? 1 : 0.4,
                }}
              />
            ))}
          </div>

          <span
            className="font-mono text-[10px] text-fg-mute"
            style={{ letterSpacing: "0.1em" }}
          >
            DRAG TO TURN
          </span>
        </div>
      </div>
    </div>
  );
}
