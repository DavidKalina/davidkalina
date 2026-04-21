import type { ComponentType, SVGProps } from "react";
import {
  SiBun,
  SiDocker,
  SiGraphql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { HERO_GRAPH_EDGES, HERO_GRAPH_NODES } from "@/constants/hero";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const ICONS: Record<string, IconComponent> = {
  ts: SiTypescript,
  react: SiReact,
  next: SiNextdotjs,
  node: SiNodedotjs,
  pg: SiPostgresql,
  tw: SiTailwindcss,
  vue: SiVuedotjs,
  bun: SiBun,
  gql: SiGraphql,
  rd: SiRedis,
  aws: FaAws,
  tf: SiTerraform,
  ai: SiOpenai,
};

// Brand hues for secondary nodes. The primary (ts) node stays amber per the design.
// `next` and `ai` intentionally fall through to `--fg` so they pick up the theme ink.
const ICON_COLORS: Record<string, string> = {
  react: "#61DAFB",
  node: "#5FA04E",
  pg: "#4169E1",
  tw: "#06B6D4",
  vue: "#4FC08D",
  bun: "#FBF0DF",
  gql: "#E10098",
  rd: "#DC382D",
  aws: "#FF9900",
  tf: "#7B42BC",
};

const nodeMap = new Map(HERO_GRAPH_NODES.map((n) => [n.id, n]));

const HeroGraph = () => {
  return (
    <svg
      viewBox="0 0 500 500"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <circle
        cx="250"
        cy="250"
        r="200"
        stroke="var(--border)"
        strokeWidth="1"
        fill="none"
        strokeDasharray="2 6"
      />
      <circle
        cx="250"
        cy="250"
        r="140"
        stroke="var(--border)"
        strokeWidth="1"
        fill="none"
        strokeDasharray="2 6"
      />
      <circle cx="250" cy="250" r="80" stroke="var(--border)" strokeWidth="1" fill="none" />

      <g stroke="var(--border)" strokeWidth="1" fill="none">
        {HERO_GRAPH_EDGES.map(([a, b]) => {
          const A = nodeMap.get(a);
          const B = nodeMap.get(b);
          if (!A || !B) return null;
          return <line key={`${a}-${b}`} x1={A.x} y1={A.y} x2={B.x} y2={B.y} />;
        })}
      </g>

      <g>
        {HERO_GRAPH_NODES.map((n, i) => {
          const Icon = ICONS[n.id];
          const isTs = n.id === "ts";
          const fill = isTs
            ? "#3178C6"
            : n.primary
              ? "var(--signal)"
              : "var(--bg-card)";
          const stroke = isTs
            ? "#3178C6"
            : n.primary
              ? "var(--signal)"
              : "var(--border)";
          const iconColor = isTs
            ? "#ffffff"
            : n.primary
              ? "#0c0c08"
              : ICON_COLORS[n.id] ?? "var(--fg)";
          const box = n.r * 1.1;
          const iconSize = Math.round(n.r * 0.95);

          return (
            <g key={n.id} transform={`translate(${n.x},${n.y})`}>
              <g
                className="floaty"
                style={{ animationDelay: `${(i * 0.4) % 6}s` }}
              >
                <circle r={n.r} fill={fill} stroke={stroke} strokeWidth="1" />
                {Icon ? (
                  <foreignObject
                    x={-box / 2}
                    y={-box / 2}
                    width={box}
                    height={box}
                    style={{ pointerEvents: "none", overflow: "visible" }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: iconColor,
                      }}
                    >
                      <Icon size={iconSize} aria-hidden focusable="false" />
                    </div>
                  </foreignObject>
                ) : (
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily="var(--font-mono), monospace"
                    fontSize={n.r * 0.55}
                    fontWeight={500}
                    fill={iconColor}
                  >
                    {n.label}
                  </text>
                )}
              </g>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default HeroGraph;
