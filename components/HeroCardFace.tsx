import { memo } from "react";
import {
  Crown,
  MapPin,
  Radio,
  Route,
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
  SiMaplibre,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiTerraform,
  SiTrpc,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";
import { PROJECT_GRID_CONSTANTS } from "@/constants/projectGrid";

type Tone = "gold" | "white";

export type DeckEntry = {
  project: (typeof PROJECT_GRID_CONSTANTS.projects)[number];
  tone: Tone;
  category: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  stats: ReadonlyArray<{ label: string; value: string }>;
  moves: ReadonlyArray<{ icon: LucideIcon; name: string; desc: string }>;
  tech: ReadonlyArray<string>;
  flavor: string;
};

export const DECK: ReadonlyArray<DeckEntry> = [
  {
    project: PROJECT_GRID_CONSTANTS.projects[1],
    tone: "gold",
    category: "MOBILE · REALTIME",
    icon: Route,
    title: "Route King",
    subtitle: "INDEPENDENT",
    stats: [
      { label: "STACK", value: "6" },
      { label: "ROLE", value: "SOLO" },
      { label: "SHIP", value: "BETA" },
    ],
    moves: [
      { icon: Radio, name: "BROADCAST", desc: "Crew watches you ride live." },
      { icon: MapPin, name: "OFFLINE", desc: "Rides captured on-device." },
      { icon: Crown, name: "KINGS", desc: "Best gate-to-gate time wins." },
    ],
    tech: ["React Native", "TypeScript", "tRPC", "PostGIS", "Redis", "MapLibre"],
    flavor: "Ride together, even when you ride alone.",
  },
  {
    project: PROJECT_GRID_CONSTANTS.projects[0],
    tone: "white",
    category: "PIPELINE",
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
  },
];

type TechChip = { icon?: IconType; text: string; color: string };

const TECH: Record<string, TechChip> = {
  "React Native": { icon: SiReact, text: "RN", color: "#61DAFB" },
  TypeScript: { icon: SiTypescript, text: "TS", color: "#3178C6" },
  tRPC: { icon: SiTrpc, text: "tRPC", color: "#2596BE" },
  PostGIS: { icon: SiPostgresql, text: "PG", color: "#4169E1" },
  MapLibre: { icon: SiMaplibre, text: "ML", color: "#3F73DF" },
  Redis: { icon: SiRedis, text: "RDS", color: "#DC382D" },
  Vue: { icon: SiVuedotjs, text: "V", color: "#4FC08D" },
  Express: { icon: SiExpress, text: "EX", color: "var(--fg)" },
  SQS: { icon: FaAws, text: "SQS", color: "#FF9900" },
  "AWS Lambda": { text: "λ", color: "#FF9900" },
  "Vercel AI SDK": { icon: SiVercel, text: "V-AI", color: "var(--fg)" },
  Terraform: { icon: SiTerraform, text: "TF", color: "#7B42BC" },
};

// line: alpha for borders derived from the tone accent. Gold needs a stronger
// mix than white to register at the same perceived weight.
const TONE: Record<Tone, { accent: string; line: string }> = {
  gold: { accent: "var(--signal)", line: "42%" },
  white: { accent: "var(--fg)", line: "24%" },
};

export const HeroCardFace = memo(function HeroCardFace({
  entry,
  hint,
}: {
  entry: DeckEntry;
  hint: string;
}) {
  const { project, tone, category, icon: ArtIcon, title, subtitle, stats, moves, tech, flavor } = entry;
  const t = TONE[tone];

  return (
    <div
      className="relative w-full h-full rounded-[14px] overflow-hidden flex flex-col"
      style={
        {
          "--card-accent": t.accent,
          background: "var(--bg-card)",
          border: `1px solid color-mix(in srgb, var(--card-accent) ${t.line}, transparent)`,
          boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.4)",
        } as React.CSSProperties
      }
    >
      {/* HEADER */}
      <div
        className="flex items-center gap-1.5 px-4 pt-3 pb-2 font-mono text-[10px]"
        style={{ letterSpacing: "0.12em" }}
      >
        <span style={{ color: "var(--signal)" }}>{project.year}</span>
        <span style={{ color: "var(--fg-mute)" }}>·</span>
        <span style={{ color: "var(--card-accent)" }}>{category}</span>
      </div>

      {/* ART ZONE */}
      <div
        className="relative mx-4 mt-1 rounded-[8px]"
        style={{
          height: 80,
          border: `1px solid color-mix(in srgb, var(--card-accent) ${t.line}, transparent)`,
        }}
      >
        <div
          aria-hidden
          className="absolute top-1.5 left-2 font-mono text-[9px]"
          style={{
            letterSpacing: "0.1em",
            color: "var(--card-accent)",
            opacity: 0.8,
          }}
        >
          № {project.num}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ArtIcon
            size={52}
            strokeWidth={1.4}
            aria-hidden
            style={{ color: "var(--card-accent)" }}
          />
        </div>
      </div>

      {/* TITLE */}
      <div className="px-4 pt-4 pb-0.5">
        <div
          className="font-mono font-semibold text-[22px] leading-[1.1]"
          style={{ color: "var(--fg)" }}
        >
          {title}
        </div>
        <div
          className="font-mono text-[11px] mt-1"
          style={{ letterSpacing: "0.08em", color: "var(--fg-mute)" }}
        >
          {subtitle}
        </div>
      </div>

      {/* STATS */}
      <div className="px-4 pt-3 grid grid-cols-3 gap-1.5">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center py-1.5 rounded-[6px]"
            style={{
              border: `1px solid color-mix(in srgb, var(--card-accent) ${t.line}, transparent)`,
            }}
          >
            <div
              className="font-mono text-[9px]"
              style={{ letterSpacing: "0.12em", color: "var(--fg-mute)" }}
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

      {/* MOVES */}
      <div className="px-4 pt-4 space-y-2.5">
        {moves.map(({ icon: MoveIcon, name, desc }) => (
          <div key={name} className="flex items-center gap-2.5">
            <MoveIcon
              size={14}
              strokeWidth={1.8}
              className="shrink-0"
              style={{ color: "var(--card-accent)" }}
              aria-hidden
            />
            <div className="flex-1 min-w-0 flex items-baseline gap-2">
              <span
                className="font-mono font-bold text-[11px] shrink-0"
                style={{ letterSpacing: "0.08em", color: "var(--card-accent)" }}
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
      <div className="px-4 mt-auto mb-2">
        <div
          className="italic-serif text-[14px] leading-snug"
          style={{ color: "var(--fg-dim)" }}
        >
          &ldquo;{flavor}&rdquo;
        </div>
      </div>

      {/* FOOTER */}
      <div
        className="flex items-center gap-2 px-4 pb-3 pt-2 font-mono text-[8px]"
        style={{
          letterSpacing: "0.14em",
          color: "var(--fg-mute)",
          borderTop: "1px solid color-mix(in srgb, var(--fg) 14%, transparent)",
        }}
      >
        <span>{hint}</span>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          {tech.map((name) => {
            const chip = TECH[name];
            const Icon = chip?.icon;
            return Icon ? (
              <Icon
                key={name}
                size={12}
                title={name}
                aria-label={name}
                style={{ color: chip.color }}
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
                  color: chip?.color ?? "var(--fg-mute)",
                }}
              >
                {chip?.text ?? name.slice(0, 2).toUpperCase()}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
});
