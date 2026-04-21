"use client";

import { useEffect, useState } from "react";
import { PROCESS_STEPS } from "@/constants/hero";

const BEAT_MS_NORMAL = 500;
// Longer dwell when the particle arrives at a column junction (3 o'clock / 9 o'clock).
const BEAT_MS_PAUSE = 1000;
const BEATS_PER_CYCLE = 12;
// Columns advance only when the particle reaches a junction — every 6 beats, offset by 3.
const BEATS_PER_ACTIVATION = 6;
const CONNECTION_OFFSET = 3;
const FONT = "var(--font-mono), ui-monospace, monospace";

const HeroGraph = () => {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let b = 0;
    let timer: number | undefined;
    const atJunction = (x: number) =>
      x % BEATS_PER_ACTIVATION === CONNECTION_OFFSET;
    const tick = () => {
      const wait = atJunction(b) ? BEAT_MS_PAUSE : BEAT_MS_NORMAL;
      timer = window.setTimeout(() => {
        b += 1;
        setBeat(b);
        tick();
      }, wait);
    };
    tick();
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  const n = PROCESS_STEPS.length;
  const activeIdx =
    Math.floor((beat + CONNECTION_OFFSET) / BEATS_PER_ACTIVATION) % n;
  const orbitAngle = beat * (360 / BEATS_PER_CYCLE);
  // Monotonic counters — increment only when the particle reaches that junction,
  // so each connector's flash remounts independently.
  const rightFlashKey = Math.floor((beat + 9) / 12); // advances at beats 3, 15, 27…
  const leftFlashKey = Math.floor((beat + 3) / 12); // advances at beats 9, 21, 33…
  const active = PROCESS_STEPS[activeIdx];

  // Tasks not currently in the stack, positioned by distance from active.
  // distance 1 → slot 0 (front of queue), distance n-1 → slot n-2 (back).
  const queue = PROCESS_STEPS.map((step, i) => {
    const distance = (i - activeIdx + n) % n;
    if (distance === 0) return null;
    return { step, slot: distance - 1, key: i };
  }).filter((t): t is { step: (typeof PROCESS_STEPS)[number]; slot: number; key: number } => t !== null);

  const slotStep = 78;
  const queueStartY = 50;

  return (
    <svg
      viewBox="0 0 500 500"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <clipPath id="hg-queue-clip">
          <rect x={336} y={38} width={148} height={436} />
        </clipPath>
        <radialGradient id="hg-reactor-halo">
          <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.16" />
          <stop offset="50%" stopColor="var(--signal)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--signal)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hg-reactor-core">
          <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.13" />
          <stop offset="55%" stopColor="var(--bg-card)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--bg-card)" stopOpacity="0.6" />
        </radialGradient>
      </defs>

      {/* CALL STACK */}
      <g>
        {/* 3-sided container — inner edge left open so the column feeds into the reactor */}
        <path
          d="M 160 40 L 20 40 L 20 474 L 160 474"
          fill="none"
          stroke="var(--border)"
          strokeDasharray="2 6"
          opacity={0.7}
        />
        {/* Connector lane — reactor delivery junction */}
        <line
          x1={150}
          y1={256}
          x2={162}
          y2={256}
          stroke="var(--border)"
          strokeDasharray="2 3"
          opacity={0.55}
        />
        <line
          key={`flash-left-${leftFlashKey}`}
          x1={150}
          y1={256}
          x2={162}
          y2={256}
          stroke="var(--signal)"
          strokeWidth={1.2}
          className="el-connector-flash"
        />

        {/* Ghost slot dividers — hint that the stack can grow */}
        {[1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={30}
            y1={400 - i * slotStep}
            x2={150}
            y2={400 - i * slotStep}
            stroke="var(--border)"
            strokeDasharray="1 5"
            opacity={0.5}
          />
        ))}

        {/* Ground plate */}
        <line x1={20} y1={464} x2={160} y2={464} stroke="var(--fg-mute)" />

        {/* Sub-frames (pushed on top of the active frame) — render first so they stagger in */}
        {active.sub.map((subStep, i) => {
          const frameY = 400 - (i + 1) * slotStep;
          const SubIcon = subStep.icon;
          return (
            <g
              key={`sub-${activeIdx}-${i}`}
              className="el-pulse"
              style={{ animationDelay: `${0.18 * (i + 1)}s` }}
              transform={`translate(30, ${frameY})`}
            >
              <rect
                width={120}
                height={64}
                fill="var(--bg-card)"
                stroke="none"
                opacity={0.2}
              />
              <g transform="translate(14, 22)" color="var(--fg-dim)">
                <SubIcon size={20} strokeWidth={1.5} />
              </g>
              <text
                x={42}
                y={40}
                fontFamily={FONT}
                fontSize={16}
                fill="var(--fg-dim)"
              >
                {subStep.fn}
              </text>
            </g>
          );
        })}

        {/* Active (bottom) frame */}
        {(() => {
          const ActiveIcon = active.icon;
          return (
            <g
              key={`main-${activeIdx}`}
              className="el-pulse"
              transform={`translate(30, 400)`}
            >
              <rect
                width={120}
                height={64}
                fill="var(--bg-card)"
                stroke="none"
                opacity={0.5}
              />
              <rect
                x={0}
                y={0}
                width={2}
                height={64}
                fill="var(--signal)"
                opacity={0.85}
              />
              <g transform="translate(14, 21)" color="var(--fg)">
                <ActiveIcon size={22} strokeWidth={1.5} />
              </g>
              <text
                x={44}
                y={40}
                fontFamily={FONT}
                fontSize={17}
                fontWeight={500}
                fill="var(--fg)"
              >
                {active.fn}
              </text>
            </g>
          );
        })()}
      </g>

      {/* EVENT LOOP — reactor */}
      <g transform="translate(250, 256)">
        {/* Warm halo — makes the reactor feel powered */}
        <circle
          r={112}
          fill="url(#hg-reactor-halo)"
          className="el-breath"
          style={{ opacity: 0.22 }}
        />

        {/* Rotating housing */}
        <g className="el-spin" style={{ transformOrigin: "0px 0px" }}>
          <circle
            r={88}
            fill="none"
            stroke="var(--border)"
            strokeDasharray="3 8"
            opacity={0.75}
          />
        </g>

        {/* Inner housing ring */}
        <circle r={64} fill="none" stroke="var(--border)" opacity={0.5} />

        {/* Core — gradient disc with signal-tinted center */}
        <circle
          r={48}
          fill="url(#hg-reactor-core)"
          stroke="var(--border)"
          strokeOpacity={0.5}
          strokeWidth={1}
        />
        {/* Pulsing core glow */}
        <circle
          r={26}
          fill="var(--signal)"
          className="el-core-pulse"
          style={{ opacity: 0.08 }}
        />

        {/* Processing flash — expanding ring on every activation */}
        <circle
          key={`reactor-flash-${activeIdx}`}
          r={48}
          fill="none"
          stroke="var(--signal)"
          strokeWidth={1}
          className="el-core-flash"
        />

        {/* Orbiting particle — angle is JS-driven so column updates lock to beats */}
        <g
          style={{
            transform: `rotate(${orbitAngle}deg)`,
            transformOrigin: "0px 0px",
            transition:
              "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <circle cx={0} cy={-88} r={9} fill="var(--signal)" opacity={0.22} />
          <circle cx={0} cy={-88} r={4.5} fill="var(--signal)" opacity={0.95} />
        </g>
      </g>

      {/* CALLBACK QUEUE */}
      <g>
        {/* 3-sided container — inner edge open toward the reactor */}
        <path
          d="M 340 40 L 480 40 L 480 474 L 340 474"
          fill="none"
          stroke="var(--border)"
          strokeDasharray="2 6"
          opacity={0.7}
        />
        <line x1={340} y1={464} x2={480} y2={464} stroke="var(--fg-mute)" />

        {/* Connector lane — reactor pickup junction */}
        <line
          x1={338}
          y1={256}
          x2={350}
          y2={256}
          stroke="var(--border)"
          strokeDasharray="2 3"
          opacity={0.55}
        />
        <line
          key={`flash-right-${rightFlashKey}`}
          x1={338}
          y1={256}
          x2={350}
          y2={256}
          stroke="var(--signal)"
          strokeWidth={1.2}
          className="el-connector-flash"
        />

        <g clipPath="url(#hg-queue-clip)">
          {queue.map(({ step, slot, key }) => {
            const y = queueStartY + slot * slotStep;
            const atFront = slot === 0;
            const QueueIcon = step.icon;
            return (
              <g
                key={key}
                className="el-queue-item"
                style={{
                  transform: `translate(350px, ${y}px)`,
                  transition:
                    "transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1)",
                }}
              >
                <rect
                  width={120}
                  height={64}
                  fill="var(--bg-card)"
                  stroke="none"
                  opacity={atFront ? 0.5 : 0.18}
                />
                {atFront && (
                  <rect
                    x={0}
                    y={0}
                    width={2}
                    height={64}
                    fill="var(--fg-mute)"
                    opacity={0.7}
                  />
                )}
                <g
                  transform="translate(14, 22)"
                  color={atFront ? "var(--fg)" : "var(--fg-dim)"}
                >
                  <QueueIcon size={20} strokeWidth={1.5} />
                </g>
                <text
                  x={42}
                  y={40}
                  fontFamily={FONT}
                  fontSize={16}
                  fontWeight={atFront ? 500 : 400}
                  fill={atFront ? "var(--fg)" : "var(--fg-dim)"}
                >
                  {step.fn}
                </text>
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
};

export default HeroGraph;
