import type { ComponentType, SVGProps } from "react";
import {
  SiD3,
  SiDocker,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { HERO_MARQUEE } from "@/constants/hero";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const ICONS: Record<string, { icon: IconComponent; color?: string }> = {
  TYPESCRIPT: { icon: SiTypescript, color: "#3178C6" },
  REACT: { icon: SiReact, color: "#61DAFB" },
  "NEXT.JS": { icon: SiNextdotjs },
  NODE: { icon: SiNodedotjs, color: "#5FA04E" },
  POSTGRES: { icon: SiPostgresql, color: "#4169E1" },
  SUPABASE: { icon: SiSupabase, color: "#3ECF8E" },
  REDIS: { icon: SiRedis, color: "#DC382D" },
  DOCKER: { icon: SiDocker, color: "#2496ED" },
  AWS: { icon: FaAws, color: "#FF9900" },
  TAILWIND: { icon: SiTailwindcss, color: "#06B6D4" },
  OPENAI: { icon: SiOpenai },
  D3: { icon: SiD3, color: "#F9A03C" },
};

const TILED_BRANDS = new Set(["TYPESCRIPT"]);

const MarqueeRow = () => (
  <span className="flex items-center gap-10 pr-10">
    {HERO_MARQUEE.map((tech, i) => {
      const entry = ICONS[tech];
      const Icon = entry?.icon;
      const tiled = TILED_BRANDS.has(tech);
      return (
        <span key={`${tech}-${i}`} className="contents">
          <span className="inline-flex items-center gap-2.5">
            {Icon ? (
              tiled ? (
                <span
                  className="inline-flex items-center justify-center"
                  style={{
                    background: entry?.color ?? "var(--fg)",
                    width: 16,
                    height: 16,
                    borderRadius: 2,
                    color: "#ffffff",
                  }}
                >
                  <Icon size={11} aria-hidden focusable="false" />
                </span>
              ) : (
                <Icon
                  size={14}
                  style={{ color: entry?.color ?? "var(--fg)" }}
                  aria-hidden
                  focusable="false"
                />
              )
            ) : null}
            <span>{tech}</span>
          </span>
          <span aria-hidden>·</span>
        </span>
      );
    })}
  </span>
);

const TechStackMarquee = () => {
  return (
    <div
      className="py-6 overflow-hidden"
      style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div
        className="flex marquee-track whitespace-nowrap font-mono text-[12px] tracking-[0.2em]"
        style={{ color: "var(--fg-mute)" }}
      >
        <MarqueeRow />
        <span aria-hidden="true" className="contents">
          <MarqueeRow />
        </span>
      </div>
    </div>
  );
};

export default TechStackMarquee;
