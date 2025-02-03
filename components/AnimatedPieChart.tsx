"use client";

import React, { useState, useEffect } from "react";

type Slice = {
  label: string;
  value: number;
  color: string;
};

const AnimatedPieChart: React.FC = () => {
  const slices: Slice[] = [
    { label: "Developer", value: 40, color: "#3b82f6" },
    { label: "Designer", value: 25, color: "#f87171" },
    { label: "Mentor", value: 20, color: "#34d399" },
    { label: "Innovator", value: 15, color: "#fbbf24" },
  ];

  // progress goes from 0 to 1 over the course of the animation
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1500; // animation duration in milliseconds
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

  // Calculate the total so that each slice is proportional
  const totalValue = slices.reduce((sum, slice) => sum + slice.value, 0);
  const cx = 50;
  const cy = 50;
  const r = 45;
  let cumulativeAngle = 0;

  // Calculate the SVG paths for each slice based on progress
  const paths = slices.map((slice) => {
    const sliceAngle = (slice.value / totalValue) * 360;
    const drawnAngle = Math.max(0, Math.min(sliceAngle, progress * 360 - cumulativeAngle));
    const path = drawnAngle > 0 ? describeArc(cx, cy, r, cumulativeAngle, drawnAngle) : null;
    cumulativeAngle += sliceAngle;
    return { path, color: slice.color, label: slice.label };
  });

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 100 100"
        // Responsive sizes: small screens get w-40, then sm, md, lg upsize accordingly
        className="w-40 sm:w-48 md:w-64 lg:w-80 h-40 sm:h-48 md:h-64 lg:h-80"
      >
        {paths.map((slice, idx) =>
          slice.path ? <path key={idx} d={slice.path} fill={slice.color} /> : null
        )}
      </svg>
      {/* Responsive legend with a grid layout */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        {slices.map((slice, idx) => (
          <div key={idx} className="flex items-center justify-center gap-2 text-sm">
            <span className="w-3 h-3 inline-block" style={{ backgroundColor: slice.color }}></span>
            <span className="font-mono text-zinc-700">{slice.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Converts polar coordinates to Cartesian.
 */
function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

/**
 * Returns an SVG path description for a pie slice (wedge) given a start angle and arc length.
 */
function describeArc(cx: number, cy: number, r: number, startAngle: number, arcAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, startAngle + arcAngle);
  const largeArcFlag = arcAngle > 180 ? 1 : 0;
  return [
    `M ${cx} ${cy}`, // Move to circle center
    `L ${start.x} ${start.y}`, // Line to start of arc
    `A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`, // Arc
    "Z", // Close path
  ].join(" ");
}

export default AnimatedPieChart;
