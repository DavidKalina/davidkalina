"use client";

import React, { useState, useEffect } from "react";

type Slice = {
  label: string;
  value: number;
  color: string;
  lightColor: string;
};

const AnimatedPieChart: React.FC = () => {
  const slices: Slice[] = [
    {
      label: "Developer",
      value: 40,
      color: "#3b82f6",
      lightColor: "#bfdbfe", // blue-200
    },
    {
      label: "Designer",
      value: 25,
      color: "#f87171",
      lightColor: "#fecaca", // red-200
    },
    {
      label: "Mentor",
      value: 20,
      color: "#34d399",
      lightColor: "#a7f3d0", // green-200
    },
    {
      label: "Innovator",
      value: 15,
      color: "#fbbf24",
      lightColor: "#fde68a", // yellow-200
    },
  ];

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1500;
    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);
      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, []);

  const totalValue = slices.reduce((sum, slice) => sum + slice.value, 0);
  const cx = 50;
  const cy = 50;
  const r = 42; // Slightly smaller radius to accommodate stroke

  let cumulativeAngle = 0;
  const paths = slices.map((slice) => {
    const sliceAngle = (slice.value / totalValue) * 360;
    const drawnAngle = Math.max(0, Math.min(sliceAngle, progress * 360 - cumulativeAngle));
    const path = drawnAngle > 0 ? describeArc(cx, cy, r, cumulativeAngle, drawnAngle) : null;
    cumulativeAngle += sliceAngle;
    return { path, ...slice };
  });

  // Define the texture pattern

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 100 100"
        className="w-40 sm:w-48 md:w-64 lg:w-80 h-40 sm:h-48 md:h-64 lg:h-80"
      >
        <defs>
          {/* Single texture pattern that we'll reuse */}
          <pattern
            id="sketchPattern"
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="4"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.15"
            />
          </pattern>
        </defs>

        {/* Background circle with sketch effect */}
        <circle
          cx={cx}
          cy={cy}
          r={r + 0.5}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="1"
          className="opacity-50"
        />

        {/* Pie slices */}
        {paths.map((slice, idx) =>
          slice.path ? (
            <g key={idx}>
              {/* Main slice */}
              <path
                d={slice.path}
                fill={slice.lightColor}
                stroke={slice.color}
                strokeWidth="1"
                className="transition-colors"
              />
              {/* Texture overlay using the pattern */}
              <path
                d={slice.path}
                fill="url(#sketchPattern)"
                stroke="none"
                style={{ color: slice.color }} // This affects the pattern color through currentColor
                className="opacity-40"
              />
            </g>
          ) : null
        )}

        {/* Center dot */}
        <circle cx={cx} cy={cy} r="1" fill="#374151" className="opacity-50" />
      </svg>
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        {slices.map((slice, idx) => (
          <div key={idx} className="flex items-center justify-center gap-2 text-sm">
            <span className="w-3 h-3 inline-block" style={{ backgroundColor: slice.color }}></span>
            <span className="font-mono text-zinc-700">{slice.label}</span>
          </div>
        ))}
      </div>{" "}
    </div>
  );
};

function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, arcAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, startAngle + arcAngle);
  const largeArcFlag = arcAngle > 180 ? 1 : 0;
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

export default AnimatedPieChart;
