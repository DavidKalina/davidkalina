"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { DECK, HeroCardFace } from "./HeroCardFace";
import HeroCardModal from "./HeroCardModal";

// Deck positions. pos 0 = top (face up), subsequent = further back.
const STACK_POS = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: 12, y: 12, rotate: 3.5, scale: 0.97, opacity: 0.85 },
  { x: -10, y: 18, rotate: -4, scale: 0.94, opacity: 0.7 },
];

const HeroCard = () => {
  const reduced = useReducedMotion();
  const [topIdx, setTopIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const N = DECK.length;
  const topEntry = DECK[topIdx];

  return (
    <div className="w-full h-full flex items-center justify-center py-2">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`${topEntry.title} — inspect card`}
        className="block group text-left cursor-pointer rounded-[14px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8"
        style={{
          width: "min(100%, 310px)",
          aspectRatio: "5 / 7",
          outlineColor: "var(--signal)",
          transform: "rotate(-1.4deg)",
        }}
      >
        <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:-translate-y-1">
          {DECK.map((entry, i) => {
            const pos = (i - topIdx + N) % N;
            const stack = STACK_POS[pos] ?? STACK_POS[STACK_POS.length - 1];
            return (
              <motion.div
                key={entry.project.num}
                className="absolute inset-0"
                initial={false}
                animate={stack}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 0.5, ease: [0.32, 0, 0.36, 1] }
                }
                style={{ transformOrigin: "50% 50%", zIndex: N - pos }}
              >
                <HeroCardFace entry={entry} hint="⤢ INSPECT" />
              </motion.div>
            );
          })}
        </div>
      </button>

      {open && (
        <HeroCardModal
          topIdx={topIdx}
          onShuffle={() => setTopIdx((i) => (i + 1) % N)}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default HeroCard;
