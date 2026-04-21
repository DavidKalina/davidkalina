"use client";

import React, { useMemo, useEffect, useState, type CSSProperties } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";

const getRandomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

type Movement = {
  start: { x: number; y: number };
  end: { x: number; y: number };
  duration: number;
};

type ShapeConfig = {
  className: string;
  style: CSSProperties;
  animation: "animate-float-slow" | "animate-float-medium" | "animate-float-fast";
  parallax: number;
};

/**
 * Gives each shape its own viewport zone so they stay spatially distributed.
 * Pings back and forth within the zone instead of traversing edge-to-edge.
 */
const getZoneMovement = (index: number, total: number): Movement => {
  const { innerWidth: width, innerHeight: height } = window;
  const cols = Math.ceil(Math.sqrt(total));
  const rows = Math.ceil(total / cols);

  const shuffled = (index * 5) % total;
  const col = shuffled % cols;
  const row = Math.floor(shuffled / cols);

  const zoneW = width / cols;
  const zoneH = height / rows;
  const cx = zoneW * (col + 0.5);
  const cy = zoneH * (row + 0.5);

  const driftX = zoneW * 0.75;
  const driftY = zoneH * 0.75;

  const ox = (Math.random() - 0.5) * 2 * driftX;
  const oy = (Math.random() - 0.5) * 2 * driftY;
  const start = { x: cx + ox, y: cy + oy };
  const end = { x: cx - ox, y: cy - oy };
  const duration = getRandomFloat(10, 20);
  return { start, end, duration };
};

const getAnimationProps = (animation: ShapeConfig["animation"]) => {
  switch (animation) {
    case "animate-float-slow":
      return {
        animate: { rotate: [0, 180, 360], scale: [1, 1.1, 1] },
        transition: {
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };
    case "animate-float-medium":
      return {
        animate: { rotate: [0, -180, -360], scale: [1, 1.05, 1] },
        transition: {
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };
    case "animate-float-fast":
      return {
        animate: { rotate: [0, 90, 180], scale: [1, 1.15, 1] },
        transition: {
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };
  }
};

const RandomPulse: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;

    const pulse = async () => {
      while (isMounted) {
        const delay = getRandomFloat(8000, 20000);
        await new Promise((resolve) => setTimeout(resolve, delay));
        if (!isMounted) break;

        const targetScale = Math.random() < 0.5 ? 0.9 : 1.1;
        await controls.start({ scale: targetScale, transition: { duration: 0.3 } });
        if (!isMounted) break;

        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!isMounted) break;

        await controls.start({ scale: 1, transition: { duration: 0.3 } });
      }
    };

    pulse();

    return () => {
      isMounted = false;
    };
  }, [controls]);

  return <motion.div animate={controls}>{children}</motion.div>;
};

/**
 * A single shape with its own zone drift + parallax scroll offset.
 * Hook-per-shape so each can own its own useTransform safely.
 */
const Shape: React.FC<{
  shape: ShapeConfig;
  movement: Movement;
}> = ({ shape, movement }) => {
  const { scrollY } = useScroll();
  // Parallax: far layers barely move, near layers move fastest.
  const parallaxY = useTransform(scrollY, (y) => -y * shape.parallax);
  const { animate, transition } = getAnimationProps(shape.animation);
  const { start, end, duration } = movement;

  return (
    <motion.div
      style={{ y: parallaxY }}
      className="absolute inset-0 pointer-events-none"
    >
      <motion.div
        initial={start}
        animate={end}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut" as const,
        }}
        className="absolute"
      >
        <RandomPulse>
          <motion.div
            className={shape.className}
            style={shape.style}
            animate={animate}
            transition={transition}
          />
        </RandomPulse>
      </motion.div>
    </motion.div>
  );
};

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const baseShapes: ShapeConfig[] = useMemo(
    () => [
      // Far layer — soft, heavily blurred lights. Barely parallaxes.
      {
        className: "w-40 h-40 md:w-[22rem] md:h-[22rem] rounded-full",
        animation: "animate-float-slow",
        parallax: 0.05,
        style: {
          background: "radial-gradient(circle at 35% 35%, var(--bg-card), transparent 70%)",
          filter: "blur(48px)",
          opacity: 1,
        },
      },
      {
        className: "w-32 h-32 md:w-80 md:h-80 rounded-full",
        animation: "animate-float-slow",
        parallax: 0.08,
        style: {
          background: "radial-gradient(circle at 50% 50%, var(--signal), transparent 65%)",
          filter: "blur(70px)",
          opacity: 0.22,
        },
      },
      {
        className: "w-28 h-28 md:w-72 md:h-72 rounded-full",
        animation: "animate-float-medium",
        parallax: 0.06,
        style: {
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--fg) 25%, transparent), transparent 70%)",
          filter: "blur(56px)",
          opacity: 0.5,
        },
      },

      // Mid layer — moderate parallax.
      {
        className: "w-12 h-12 md:w-24 md:h-24 rounded-full",
        animation: "animate-float-slow",
        parallax: 0.2,
        style: {
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          filter: "blur(5px)",
          opacity: 0.85,
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.35)",
        },
      },
      {
        className: "w-14 h-14 md:w-28 md:h-28 rotate-12",
        animation: "animate-float-medium",
        parallax: 0.24,
        style: {
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          filter: "blur(3px)",
          opacity: 0.85,
          boxShadow: "0 24px 48px -16px rgba(0,0,0,0.3)",
        },
      },
      {
        className: "w-24 h-9 md:w-44 md:h-16 -rotate-6",
        animation: "animate-float-fast",
        parallax: 0.28,
        style: {
          background: "var(--bg-elev)",
          border: "1px solid var(--border)",
          filter: "blur(1.5px)",
          opacity: 0.8,
          boxShadow: "0 16px 32px -8px rgba(0,0,0,0.25)",
        },
      },

      // Near layer — strongest parallax.
      {
        className: "w-10 h-10 md:w-16 md:h-16",
        parallax: 0.4,
        style: {
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          background: "var(--border)",
          filter: "blur(1px)",
          opacity: 0.7,
        },
        animation: "animate-float-medium",
      },
      {
        className: "w-1.5 h-1.5 md:w-2 md:h-2 rounded-full",
        parallax: 0.5,
        style: {
          background: "var(--signal)",
          boxShadow: "0 0 10px var(--signal)",
          opacity: 0.85,
        },
        animation: "animate-float-fast",
      },
      {
        className: "w-16 h-16 md:w-32 md:h-32 rounded-full",
        parallax: 0.35,
        style: {
          background: "transparent",
          border: "1px dashed var(--signal)",
          opacity: 0.3,
          filter: "blur(0.5px)",
        },
        animation: "animate-float-slow",
      },
    ],
    [],
  );

  const movements = useMemo(() => {
    if (!mounted) return null;
    return baseShapes.map((_, i) => getZoneMovement(i, baseShapes.length));
  }, [baseShapes, mounted]);

  if (!movements) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {baseShapes.map((shape, i) => (
        <Shape key={i} shape={shape} movement={movements[i]} />
      ))}
    </motion.div>
  );
};

export default AnimatedBackground;
