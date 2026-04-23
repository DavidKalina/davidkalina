"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { memo, useEffect, useRef, useState } from "react";
import {
  CircleCheck,
  Compass,
  MapPin,
  MessageCircle,
  Sparkles,
  Upload,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiExpress,
  SiGooglemaps,
  SiOpenai,
  SiReact,
  SiRedis,
  SiTerraform,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";
import { PROJECT_GRID_CONSTANTS } from "@/constants/projectGrid";

type Tone = "gold" | "white";

type DeckEntry = {
  project: (typeof PROJECT_GRID_CONSTANTS.projects)[number];
  tone: Tone;
  category: string;
  theme: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  stats: ReadonlyArray<{ label: string; value: string }>;
  moves: ReadonlyArray<{ icon: LucideIcon; name: string; desc: string }>;
  tech: ReadonlyArray<string>;
  flavor: string;
  serial: string;
  tag: string;
};

const DECK: ReadonlyArray<DeckEntry> = [
  {
    project: PROJECT_GRID_CONSTANTS.projects[0],
    tone: "gold",
    category: "MOBILE · AI",
    theme: "AI × UX",
    icon: Compass,
    title: "Side Quests",
    subtitle: "INDEPENDENT",
    stats: [
      { label: "STACK", value: "6" },
      { label: "ROLE", value: "SOLO" },
      { label: "SHIP", value: "BETA" },
    ],
    moves: [
      { icon: MessageCircle, name: "ONBOARDING", desc: "Interviews interests + energy." },
      { icon: MapPin, name: "GROUNDED", desc: "Real Places venues only." },
      { icon: CircleCheck, name: "CHECK-IN", desc: "Tap to adapt next quest." },
    ],
    tech: ["React Native", "TypeScript", "OpenAI", "MCP", "Google Places", "Redis"],
    flavor: "Helping people get out, one small quest at a time.",
    serial: "SQ · 001",
    tag: "BETA · Q2",
  },
  {
    project: PROJECT_GRID_CONSTANTS.projects[1],
    tone: "white",
    category: "PIPELINE",
    theme: "DATA × AI",
    icon: Workflow,
    title: "AI Doc Pipeline",
    subtitle: "EEL DATA SYSTEMS",
    stats: [
      { label: "COST", value: "1/50×" },
      { label: "SAVED", value: "$20K" },
      { label: "USES", value: "100/D" },
    ],
    moves: [
      { icon: Upload, name: "INGEST", desc: "PDF in, SQS fires in ms." },
      { icon: Sparkles, name: "EXTRACT", desc: "Typed JSON from page image." },
      { icon: Zap, name: "DELIVER", desc: "Form auto-fills on poll." },
    ],
    tech: ["Vue", "Express", "SQS", "AWS Lambda", "Vercel AI SDK", "Terraform"],
    flavor: "Event-driven pipeline at 1/50× the token cost.",
    serial: "DP · 002",
    tag: "SHIPPED",
  },
];

type TechChip = { icon?: IconType; text: string; color: string };

const TECH: Record<string, TechChip> = {
  "React Native": { icon: SiReact, text: "RN", color: "#61DAFB" },
  TypeScript: { icon: SiTypescript, text: "TS", color: "#3178C6" },
  OpenAI: { icon: SiOpenai, text: "AI", color: "#10A37F" },
  MCP: { text: "MCP", color: "#D97757" },
  "Google Places": { icon: SiGooglemaps, text: "GP", color: "#4285F4" },
  Redis: { icon: SiRedis, text: "RDS", color: "#DC382D" },
  Vue: { icon: SiVuedotjs, text: "V", color: "#4FC08D" },
  Express: { icon: SiExpress, text: "EX", color: "var(--fg)" },
  SQS: { icon: FaAws, text: "SQS", color: "#FF9900" },
  "AWS Lambda": { text: "λ", color: "#FF9900" },
  "Vercel AI SDK": { icon: SiVercel, text: "V-AI", color: "var(--fg)" },
  Terraform: { icon: SiTerraform, text: "TF", color: "#7B42BC" },
};

const TONE_VARS: Record<Tone, {
  accent: string;
  artBorder: string;
  artBg: string;
  circleBorder: string;
  circleBg: string;
  bottomWash: string;
}> = {
  gold: {
    accent: "var(--signal)",
    artBorder: "42%",
    artBg: "22%",
    circleBorder: "48%",
    circleBg: "12%",
    bottomWash: "16%",
  },
  white: {
    accent: "var(--fg)",
    artBorder: "26%",
    artBg: "5%",
    circleBorder: "30%",
    circleBg: "4%",
    bottomWash: "0%",
  },
};

// Deck positions. pos 0 = top (face up), subsequent = further back.
const STACK_POS = [
  { x: 0, y: 0, z: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: 12, y: 10, z: -26, rotate: 4, scale: 0.96, opacity: 0.78 },
  { x: -10, y: 16, z: -48, rotate: -5, scale: 0.92, opacity: 0.62 },
];

const DWELL_MS = 6500;
const EXIT_MS = 1100;
const SHUFFLE_EASE = [0.32, 0, 0.36, 1] as const;

const HeroCard = () => {
  const [reduced, setReduced] = useState(false);
  const [topIdx, setTopIdx] = useState(0);
  const [leavingIdx, setLeavingIdx] = useState<number | null>(null);
  const topIdxRef = useRef(0);

  useEffect(() => {
    topIdxRef.current = topIdx;
  }, [topIdx]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced || DECK.length < 2) return;
    const clears: Array<ReturnType<typeof setTimeout>> = [];
    const id = window.setInterval(() => {
      setLeavingIdx(topIdxRef.current);
      setTopIdx((i) => (i + 1) % DECK.length);
      clears.push(setTimeout(() => setLeavingIdx(null), EXIT_MS));
    }, DWELL_MS);
    return () => {
      window.clearInterval(id);
      clears.forEach((t) => clearTimeout(t));
    };
  }, [reduced]);

  const N = DECK.length;
  const topEntry = DECK[topIdx];

  return (
    <div className="w-full h-full flex items-center justify-center py-2">
      <Link
        href="#work"
        aria-label={`${topEntry.project.title} — ${topEntry.project.client}`}
        className="block group"
        style={{ width: "min(100%, 310px)", aspectRatio: "5 / 7" }}
      >
        <div className="w-full h-full transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <div
            className="relative w-full h-full"
            style={{
              perspective: "1400px",
              perspectiveOrigin: "50% 35%",
              animation: reduced ? undefined : "hc-bob 4.2s ease-in-out infinite",
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                transform: "rotateX(7deg) rotateY(-4deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {DECK.map((entry, i) => {
                const pos = (i - topIdx + N) % N;
                const stack = STACK_POS[pos] ?? STACK_POS[STACK_POS.length - 1];
                const isLeaving = leavingIdx === i;
                const target = isLeaving
                  ? {
                      x: [0, 52, stack.x],
                      y: [0, 12, stack.y],
                      z: [0, -70, stack.z],
                      rotate: [0, 13, stack.rotate],
                      scale: [1, 0.87, stack.scale],
                      opacity: [1, 0.55, stack.opacity],
                    }
                  : {
                      x: stack.x,
                      y: stack.y,
                      z: stack.z,
                      rotate: stack.rotate,
                      scale: stack.scale,
                      opacity: stack.opacity,
                    };
                return (
                  <motion.div
                    key={entry.project.num}
                    className="absolute inset-0"
                    initial={false}
                    animate={target}
                    transition={
                      isLeaving
                        ? {
                            duration: EXIT_MS / 1000,
                            times: [0, 0.55, 1],
                            ease: SHUFFLE_EASE,
                          }
                        : {
                            duration: EXIT_MS / 1000,
                            ease: SHUFFLE_EASE,
                            delay: 0.12,
                          }
                    }
                    style={{ transformOrigin: "50% 50%" }}
                  >
                    <HeroCardFace
                      entry={entry}
                      isTop={pos === 0}
                      reduced={reduced}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Link>

      <style jsx>{`
        @keyframes hc-bob {
          0%,
          100% {
            transform: translateY(-3px);
          }
          50% {
            transform: translateY(3px);
          }
        }
        @keyframes hc-sheen {
          0% {
            background-position: 200% 0%;
          }
          50% {
            background-position: -100% 100%;
          }
          100% {
            background-position: 200% 0%;
          }
        }
      `}</style>
    </div>
  );
};

const HeroCardFace = memo(function HeroCardFace({
  entry,
  isTop,
  reduced,
}: {
  entry: DeckEntry;
  isTop: boolean;
  reduced: boolean;
}) {
  const { project, tone, category, theme, icon: ArtIcon, title, subtitle, stats, moves, tech, flavor, serial } = entry;
  const t = TONE_VARS[tone];

  return (
    <div
      className="relative w-full h-full"
      style={
        {
          "--card-accent": t.accent,
        } as React.CSSProperties
      }
    >
      {/* Gold halo — dimmer on back cards */}
      <div
        aria-hidden
        className="absolute -inset-10 -z-10"
        style={{
          background: `radial-gradient(52% 44% at 50% 58%, color-mix(in srgb, var(--signal) ${isTop ? 34 : 18}%, transparent) 0%, transparent 72%)`,
          filter: "blur(26px)",
        }}
      />

      {/* Contact shadow — top card only */}
      {isTop && (
        <div
          aria-hidden
          className="absolute left-[8%] right-[8%] -z-10"
          style={{
            bottom: "-14px",
            height: "22px",
            background:
              "radial-gradient(50% 100% at 50% 0%, rgba(0,0,0,0.45) 0%, transparent 80%)",
            filter: "blur(8px)",
            opacity: 0.7,
          }}
        />
      )}

      {/* Golden frame */}
      <div
        className="absolute inset-0 rounded-[14px]"
        style={{
          padding: "1.5px",
          background:
            "linear-gradient(155deg, color-mix(in srgb, var(--signal) 85%, var(--bg-card)) 0%, color-mix(in srgb, var(--signal) 38%, var(--bg-card)) 48%, color-mix(in srgb, var(--signal) 100%, var(--bg-card)) 100%)",
          boxShadow: [
            "0 40px 72px -32px color-mix(in srgb, var(--signal) 50%, transparent)",
            "0 22px 36px -18px rgba(0,0,0,0.42)",
            "0 8px 16px -8px rgba(0,0,0,0.32)",
            "0 1px 0 color-mix(in srgb, var(--signal) 65%, transparent)",
          ].join(", "),
        }}
      >
        {/* Inner surface — gold bloom at top, tone-specific wash at bottom */}
        <div
          className="relative w-full h-full rounded-[12.5px] overflow-hidden flex flex-col"
          style={{
            background: `radial-gradient(110% 55% at 50% 0%, color-mix(in srgb, var(--signal) 9%, var(--bg-card)) 0%, var(--bg-card) 55%), radial-gradient(90% 55% at 50% 100%, color-mix(in srgb, var(--card-accent) ${t.bottomWash}, transparent) 0%, transparent 72%)`,
          }}
        >
          {/* Top-edge specular */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--signal) 70%, white) 35%, color-mix(in srgb, var(--signal) 55%, white) 65%, transparent 100%)",
              opacity: 0.75,
            }}
          />

          {/* Sheen — top card only */}
          {isTop && !reduced && (
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(115deg, transparent 42%, color-mix(in srgb, var(--signal) 65%, transparent) 49%, color-mix(in srgb, var(--signal) 85%, white) 50%, color-mix(in srgb, var(--signal) 65%, transparent) 51%, transparent 58%)",
                backgroundSize: "240% 240%",
                opacity: 0.6,
                animation: "hc-sheen 6.5s ease-in-out infinite",
              }}
            />
          )}

          {/* HEADER — gold year, project-accent category, muted theme */}
          <div
            className="relative flex items-center gap-1.5 px-4 pt-3 pb-2 font-mono text-[10px]"
            style={{ letterSpacing: "0.14em" }}
          >
            <span style={{ color: "var(--signal)" }}>★ {project.year}</span>
            <span style={{ color: "var(--fg-mute)" }}>·</span>
            <span style={{ color: "var(--card-accent)" }}>{category}</span>
            <div className="flex-1" />
            <span style={{ color: "var(--fg-mute)" }}>{theme}</span>
          </div>

          {/* ART ZONE — tone-tinted border/bg, tone-colored icon */}
          <div
            className="relative mx-4 mt-1 rounded-[8px]"
            style={{
              height: 80,
              border: `1px solid color-mix(in srgb, var(--card-accent) ${t.artBorder}, transparent)`,
              background: `radial-gradient(78% 80% at 50% 50%, color-mix(in srgb, var(--card-accent) ${t.artBg}, transparent) 0%, transparent 76%)`,
            }}
          >
            <div
              aria-hidden
              className="absolute top-1.5 left-2 font-mono text-[9px]"
              style={{
                letterSpacing: "0.1em",
                color: "var(--card-accent)",
                opacity: 0.85,
              }}
            >
              № {project.num}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ArtIcon
                size={54}
                strokeWidth={1.3}
                aria-hidden
                style={{
                  color: "var(--card-accent)",
                  filter: `drop-shadow(0 3px 10px color-mix(in srgb, var(--card-accent) 42%, transparent))`,
                }}
              />
            </div>
          </div>

          {/* TITLE */}
          <div className="relative px-4 pt-4 pb-0.5">
            <div
              className="font-mono font-semibold text-[22px] leading-[1.1]"
              style={{ color: "var(--fg)" }}
            >
              {title}
            </div>
            <div
              className="font-mono text-[11px] mt-1"
              style={{ letterSpacing: "0.1em", color: "var(--fg-mute)" }}
            >
              {subtitle}
            </div>
          </div>

          {/* STATS — 3 labeled value chips */}
          <div className="relative px-4 pt-3 grid grid-cols-3 gap-1.5">
            {stats.map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center py-1.5 rounded-[6px]"
                style={{
                  border: `1px solid color-mix(in srgb, var(--card-accent) ${t.circleBorder}, transparent)`,
                  background: `color-mix(in srgb, var(--card-accent) ${t.circleBg}, transparent)`,
                }}
              >
                <div
                  className="font-mono text-[9px]"
                  style={{ letterSpacing: "0.14em", color: "var(--fg-mute)" }}
                >
                  {label}
                </div>
                <div
                  className="font-mono font-semibold text-[16px] leading-tight"
                  style={{ color: "var(--card-accent)" }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* MOVES — trading-card ability list */}
          <div className="relative px-4 pt-3.5 space-y-2.5">
            {moves.map(({ icon: MoveIcon, name, desc }) => (
              <div key={name} className="flex items-center gap-2.5">
                <div
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{
                    width: 24,
                    height: 24,
                    border: `1px solid color-mix(in srgb, var(--card-accent) ${t.circleBorder}, transparent)`,
                    background: `color-mix(in srgb, var(--card-accent) ${t.circleBg}, transparent)`,
                  }}
                >
                  <MoveIcon
                    size={13}
                    strokeWidth={1.8}
                    style={{ color: "var(--card-accent)" }}
                    aria-hidden
                  />
                </div>
                <div className="flex-1 min-w-0 flex items-baseline gap-2">
                  <span
                    className="font-mono font-bold text-[11px] shrink-0"
                    style={{
                      letterSpacing: "0.1em",
                      color: "var(--card-accent)",
                    }}
                  >
                    {name}
                  </span>
                  <span
                    className="font-mono text-[11px] truncate"
                    style={{ color: "var(--fg-dim)" }}
                  >
                    {desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* FLAVOR */}
          <div className="relative px-4 mt-auto mb-2">
            <div
              className="italic-serif text-[14px] leading-snug"
              style={{ color: "var(--fg-dim)" }}
            >
              &ldquo;{flavor}&rdquo;
            </div>
          </div>

          {/* FOOTER — serial + brand-colored tech icons */}
          <div
            className="relative flex items-center gap-2 px-4 pb-3 pt-2 font-mono text-[8px]"
            style={{
              letterSpacing: "0.16em",
              color: "var(--fg-mute)",
              borderTop:
                "1px solid color-mix(in srgb, var(--signal) 24%, transparent)",
            }}
          >
            <span style={{ opacity: 0.75 }}>{serial}</span>
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              {tech.map((name) => {
                const t = TECH[name];
                const Icon = t?.icon;
                return Icon ? (
                  <Icon
                    key={name}
                    size={12}
                    title={name}
                    aria-label={name}
                    style={{ color: t.color }}
                  />
                ) : (
                  <span
                    key={name}
                    title={name}
                    aria-label={name}
                    className="font-mono font-bold"
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.04em",
                      color: t?.color ?? "var(--fg-mute)",
                    }}
                  >
                    {t?.text ?? name.slice(0, 2).toUpperCase()}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HeroCard;
