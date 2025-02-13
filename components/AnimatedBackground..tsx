"use client";

import React, { useMemo, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ParallaxProvider } from "react-scroll-parallax";

// Helper to get a random floating–point number between min and max.
const getRandomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

// Generates a random movement path for a shape.
const getRandomMovement = () => {
  const offset = 100;
  if (typeof window === "undefined") {
    return {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
      duration: 30,
    };
  }
  const { innerWidth: width, innerHeight: height } = window;
  const edge = Math.floor(Math.random() * 4);
  let start, end;
  switch (edge) {
    case 0: // Top -> Bottom
      start = { x: getRandomFloat(0, width), y: -offset };
      end = { x: getRandomFloat(0, width), y: height + offset };
      break;
    case 1: // Right -> Left
      start = { x: width + offset, y: getRandomFloat(0, height) };
      end = { x: -offset, y: getRandomFloat(0, height) };
      break;
    case 2: // Bottom -> Top
      start = { x: getRandomFloat(0, width), y: height + offset };
      end = { x: getRandomFloat(0, width), y: -offset };
      break;
    case 3:
    default: // Left -> Right
      start = { x: -offset, y: getRandomFloat(0, height) };
      end = { x: width + offset, y: getRandomFloat(0, height) };
      break;
  }
  const duration = getRandomFloat(20, 40);
  return { start, end, duration };
};

// A wrapper component that applies an occasional scale change and holds that state for a bit.
const RandomPulse: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;

    const pulse = async () => {
      while (isMounted) {
        // Wait for a random interval between 8 and 20 seconds.
        const delay = getRandomFloat(8000, 20000);
        await new Promise((resolve) => setTimeout(resolve, delay));
        if (!isMounted) break;

        // Choose a random target scale: either scaled down (0.9) or scaled up (1.1).
        const targetScale = Math.random() < 0.5 ? 0.9 : 1.1;
        // Animate to the target scale quickly.
        await controls.start({ scale: targetScale, transition: { duration: 0.3 } });
        if (!isMounted) break;

        // Hold the new scale for 2 seconds.
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!isMounted) break;

        // Animate back to the original scale.
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

const AnimatedBackground = () => {
  const baseShapes = [
    {
      shape: "circle",
      className: "w-16 h-16 md:w-32 md:h-32 bg-zinc-400 rounded-full",
      animation: "animate-float-slow",
      style: {},
    },
    {
      shape: "square",
      className: "w-20 h-20 md:w-40 md:h-40 bg-zinc-300 rotate-12",
      animation: "animate-float-medium",
      style: {},
    },
    {
      shape: "rectangle",
      className: "w-32 h-12 md:w-64 md:h-24 bg-zinc-500 -rotate-6",
      animation: "animate-float-fast",
      style: {},
    },
    {
      shape: "triangle",
      className: "w-16 h-16 md:w-32 md:h-32 bg-zinc-200",
      style: { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" },
      animation: "animate-float-medium",
    },
    {
      shape: "abstract",
      className: "w-24 h-24 md:w-48 md:h-48 bg-zinc-500",
      style: {
        clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
      },
      animation: "animate-float-slow",
    },
  ];

  // Augment each shape with a random movement.
  const shapes = useMemo(() => {
    return baseShapes.map((shape) => {
      const movement = getRandomMovement();
      return { ...shape, movement };
    });
  }, []);

  // Define continuous floating effects.
  const getAnimationProps = (animation: string) => {
    switch (animation) {
      case "animate-float-slow":
        return {
          animate: {
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          },
          transition: {
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      case "animate-float-medium":
        return {
          animate: {
            rotate: [0, -180, -360],
            scale: [1, 1.05, 1],
          },
          transition: {
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      case "animate-float-fast":
        return {
          animate: {
            rotate: [0, 90, 180],
            scale: [1, 1.15, 1],
          },
          transition: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      default:
        return {
          animate: {},
          transition: {},
        };
    }
  };

  return (
    <ParallaxProvider>
      {/* Fixed container to render shapes behind content */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {shapes.map((shape, index) => {
          const { start, end, duration } = shape.movement;
          const { animate, transition } = getAnimationProps(shape.animation);
          return (
            // Outer motion.div for continuous movement.
            <motion.div
              key={index}
              initial={start}
              animate={end}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute"
            >
              {/* Wrap the shape with RandomPulse to add the occasional held scale change */}
              <RandomPulse>
                <motion.div
                  className={`${shape.className} opacity-50`}
                  style={shape.style}
                  animate={animate}
                  transition={transition}
                />
              </RandomPulse>
            </motion.div>
          );
        })}
      </div>
    </ParallaxProvider>
  );
};

export default AnimatedBackground;
