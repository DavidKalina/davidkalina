"use client";

import { useId } from "react";
import type { ComponentType, SVGProps } from "react";
import {
  SiAnthropic,
  SiBun,
  SiDocker,
  SiExpress,
  SiGooglemaps,
  SiGraphql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiStorybook,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import type { PipelineLayer } from "@/constants/systems";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

type NodeShape =
  | "client"
  | "api"
  | "service"
  | "queue"
  | "database"
  | "external"
  | "tooling";

type NodeMeta = { shape: NodeShape; icon?: IconComponent; color?: string };

const NODE_META: Record<string, NodeMeta> = {
  "Next.js": { shape: "client", icon: SiNextdotjs },
  React: { shape: "client", icon: SiReact, color: "#61DAFB" },
  "React Native": { shape: "client", icon: SiReact, color: "#61DAFB" },
  "Vue.js": { shape: "client", icon: SiVuedotjs, color: "#4FC08D" },
  TypeScript: { shape: "tooling", icon: SiTypescript, color: "#3178C6" },
  Storybook: { shape: "tooling", icon: SiStorybook, color: "#FF4785" },
  Tailwind: { shape: "tooling", icon: SiTailwindcss, color: "#06B6D4" },
  Terraform: { shape: "tooling", icon: SiTerraform, color: "#7B42BC" },
  Docker: { shape: "tooling", icon: SiDocker, color: "#2496ED" },
  "Claude Code": { shape: "tooling", icon: SiAnthropic, color: "#D97757" },
  "Node.js": { shape: "service", icon: SiNodedotjs, color: "#5FA04E" },
  Bun: { shape: "service", icon: SiBun },
  Express: { shape: "service", icon: SiExpress },
  Lambda: { shape: "service", icon: FaAws, color: "#FF9900" },
  "Vercel AI SDK": { shape: "service", icon: SiVercel },
  "Anthropic Agent SDK": { shape: "service", icon: SiAnthropic, color: "#D97757" },
  Vercel: { shape: "service", icon: SiVercel },
  AWS: { shape: "service", icon: FaAws, color: "#FF9900" },
  GraphQL: { shape: "api", icon: SiGraphql, color: "#E10098" },
  API: { shape: "api" },
  SQS: { shape: "queue", icon: FaAws, color: "#FF9900" },
  PostgreSQL: { shape: "database", icon: SiPostgresql, color: "#4169E1" },
  Redis: { shape: "database", icon: SiRedis, color: "#DC382D" },
  "Google Places": { shape: "external", icon: SiGooglemaps, color: "#4285F4" },
};

const NODE_W = 72;
const NODE_H = 44;
const LABEL_H = 22;
const LAYER_GAP = 42;
const NODE_GAP = 22;
const ICON_SIZE = 18;
const PADDING = 28;

const shapeAttrs = {
  stroke: "var(--border)",
  fill: "var(--bg-card)",
  strokeWidth: 1,
  strokeLinejoin: "round" as const,
  fillOpacity: 0.35,
  strokeOpacity: 0.45,
  strokeDasharray: "2 4",
};

const points = (pts: Array<[number, number]>) =>
  pts.map(([x, y]) => `${x},${y}`).join(" ");

const renderShape = (shape: NodeShape, x: number, y: number) => {
  switch (shape) {
    case "client":
      return (
        <rect
          x={x}
          y={y}
          width={NODE_W}
          height={NODE_H}
          rx={8}
          ry={8}
          {...shapeAttrs}
        />
      );
    case "api":
      return (
        <polygon
          points={points([
            [x + NODE_W / 2, y],
            [x + NODE_W, y + NODE_H / 2],
            [x + NODE_W / 2, y + NODE_H],
            [x, y + NODE_H / 2],
          ])}
          {...shapeAttrs}
        />
      );
    case "service":
      return (
        <rect x={x} y={y} width={NODE_W} height={NODE_H} {...shapeAttrs} />
      );
    case "queue": {
      const o = 12;
      return (
        <polygon
          points={points([
            [x + o, y],
            [x + NODE_W - o, y],
            [x + NODE_W, y + NODE_H / 2],
            [x + NODE_W - o, y + NODE_H],
            [x + o, y + NODE_H],
            [x, y + NODE_H / 2],
          ])}
          {...shapeAttrs}
        />
      );
    }
    case "database": {
      const ry = 5;
      return (
        <g>
          <path
            d={`M ${x} ${y + ry} L ${x} ${y + NODE_H - ry} A ${NODE_W / 2} ${ry} 0 0 0 ${x + NODE_W} ${y + NODE_H - ry} L ${x + NODE_W} ${y + ry}`}
            {...shapeAttrs}
          />
          <ellipse
            cx={x + NODE_W / 2}
            cy={y + ry}
            rx={NODE_W / 2}
            ry={ry}
            {...shapeAttrs}
          />
        </g>
      );
    }
    case "external":
      return (
        <rect
          x={x}
          y={y}
          width={NODE_W}
          height={NODE_H}
          rx={NODE_H / 2}
          ry={NODE_H / 2}
          {...shapeAttrs}
        />
      );
    case "tooling": {
      const skew = 10;
      return (
        <polygon
          points={points([
            [x + skew, y],
            [x + NODE_W, y],
            [x + NODE_W - skew, y + NODE_H],
            [x, y + NODE_H],
          ])}
          {...shapeAttrs}
        />
      );
    }
  }
};

type Positioned = { node: string; x: number; y: number };

const layerOffset = (i: number) => {
  const seq = [0, 10, -12, 6, -6, 14, -10];
  return seq[i % seq.length];
};

const SystemDiagram = ({
  pipeline,
}: {
  pipeline: ReadonlyArray<PipelineLayer>;
}) => {
  const rawId = useId();
  const haloId = `sd-halo-${rawId.replace(/:/g, "")}`;

  const rowWidths = pipeline.map(
    (layer) => layer.nodes.length * NODE_W + (layer.nodes.length - 1) * NODE_GAP,
  );
  const maxRowW = Math.max(...rowWidths);
  const canvasW = maxRowW + PADDING * 2 + 40;
  const centerX = canvasW / 2;

  const positioned: Positioned[][] = pipeline.map((layer, li) => {
    const rowW = rowWidths[li];
    const startX = centerX - rowW / 2 + layerOffset(li);
    const y = PADDING + li * (NODE_H + LABEL_H + LAYER_GAP);
    return layer.nodes.map((node, ni) => ({
      node,
      x: startX + ni * (NODE_W + NODE_GAP),
      y,
    }));
  });

  const canvasH =
    PADDING * 2 +
    pipeline.length * (NODE_H + LABEL_H + LAYER_GAP) -
    LAYER_GAP;

  const connectors: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  for (let i = 0; i < positioned.length - 1; i++) {
    const layerA = positioned[i];
    const layerB = positioned[i + 1];
    layerB.forEach((nb) => {
      let nearest = layerA[0];
      let nearestDist = Infinity;
      for (const na of layerA) {
        const d = Math.abs(na.x + NODE_W / 2 - (nb.x + NODE_W / 2));
        if (d < nearestDist) {
          nearest = na;
          nearestDist = d;
        }
      }
      connectors.push({
        x1: nearest.x + NODE_W / 2,
        y1: nearest.y + NODE_H + LABEL_H - 6,
        x2: nb.x + NODE_W / 2,
        y2: nb.y - 2,
      });
    });
  }

  return (
    <svg
      viewBox={`0 0 ${canvasW} ${canvasH}`}
      className="w-full h-auto max-w-[22rem]"
      role="img"
      aria-label="System architecture diagram"
    >
      <defs>
        <radialGradient id={haloId}>
          <stop offset="0%" stopColor="var(--signal)" stopOpacity="1" />
          <stop offset="55%" stopColor="var(--signal)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--signal)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halos — breathing glow behind each node */}
      {positioned.map((layer, li) =>
        layer.map((p, ni) => (
          <ellipse
            key={`halo-${li}-${ni}`}
            cx={p.x + NODE_W / 2}
            cy={p.y + NODE_H / 2}
            rx={NODE_W / 2 + 22}
            ry={NODE_H / 2 + 18}
            fill={`url(#${haloId})`}
            className="el-breath"
            style={{
              animationDelay: `${((li * 0.45 + ni * 0.25) % 2.8).toFixed(2)}s`,
            }}
          />
        )),
      )}

      {/* Connectors — faint dashed threads */}
      {connectors.map((c, i) => (
        <line
          key={`c-${i}`}
          x1={c.x1}
          y1={c.y1}
          x2={c.x2}
          y2={c.y2}
          stroke="var(--border)"
          strokeWidth={1}
          strokeDasharray="2 4"
          strokeOpacity={0.5}
        />
      ))}

      {/* Nodes — shape + icon + label */}
      {positioned.map((layer, li) =>
        layer.map((p, ni) => {
          const meta = NODE_META[p.node] ?? { shape: "service" as NodeShape };
          const Icon = meta.icon;
          return (
            <g key={`n-${li}-${ni}`}>
              {renderShape(meta.shape, p.x, p.y)}
              {Icon && (
                <foreignObject
                  x={p.x + NODE_W / 2 - ICON_SIZE / 2}
                  y={p.y + NODE_H / 2 - ICON_SIZE / 2}
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                >
                  <div
                    style={{
                      width: ICON_SIZE,
                      height: ICON_SIZE,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: meta.color ?? "var(--fg-dim)",
                      opacity: 0.7,
                    }}
                  >
                    <Icon size={ICON_SIZE} aria-hidden focusable="false" />
                  </div>
                </foreignObject>
              )}
              <text
                x={p.x + NODE_W / 2}
                y={p.y + NODE_H + 13}
                textAnchor="middle"
                fontSize={8.5}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                letterSpacing="0.06em"
                style={{ fill: "var(--fg-mute)", fillOpacity: 0.75 }}
              >
                {p.node.toUpperCase()}
              </text>
            </g>
          );
        }),
      )}
    </svg>
  );
};

export default SystemDiagram;
