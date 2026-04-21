import type { ComponentType, SVGProps } from "react";
import {
  SiBun,
  SiDocker,
  SiGraphql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { HERO_MARQUEE } from "@/constants/hero";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const ICONS: Record<string, { icon: IconComponent; color?: string }> = {
  TYPESCRIPT: { icon: SiTypescript, color: "#3178C6" },
  REACT: { icon: SiReact, color: "#61DAFB" },
  "NEXT.JS": { icon: SiNextdotjs },
  VUE: { icon: SiVuedotjs, color: "#4FC08D" },
  NODE: { icon: SiNodedotjs, color: "#5FA04E" },
  BUN: { icon: SiBun, color: "#FBF0DF" },
  GRAPHQL: { icon: SiGraphql, color: "#E10098" },
  POSTGRES: { icon: SiPostgresql, color: "#4169E1" },
  REDIS: { icon: SiRedis, color: "#DC382D" },
  AWS: { icon: FaAws, color: "#FF9900" },
  TERRAFORM: { icon: SiTerraform, color: "#7B42BC" },
  DOCKER: { icon: SiDocker, color: "#2496ED" },
  TAILWIND: { icon: SiTailwindcss, color: "#06B6D4" },
  "REACT NATIVE": { icon: SiReact, color: "#61DAFB" },
};

const TILED_BRANDS = new Set(["TYPESCRIPT"]);

const MarqueeRow = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
  <ul
    className="flex items-center shrink-0"
    aria-hidden={ariaHidden || undefined}
  >
    {HERO_MARQUEE.map((tech, i) => {
      const entry = ICONS[tech];
      const Icon = entry?.icon;
      const tiled = TILED_BRANDS.has(tech);
      return (
        <li key={`${tech}-${i}`} className="inline-flex items-center pr-10">
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
          <span aria-hidden className="ml-10">·</span>
        </li>
      );
    })}
  </ul>
);

const TechStackMarquee = () => {
  return (
    <div
      className="marquee-mask py-6 overflow-hidden group"
      style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div
        className="flex marquee-track w-max whitespace-nowrap font-mono text-[12px] tracking-[0.2em]"
        style={{ color: "var(--fg-mute)" }}
      >
        <MarqueeRow />
        <MarqueeRow ariaHidden />
      </div>
    </div>
  );
};

export default TechStackMarquee;
