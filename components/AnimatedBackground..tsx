"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ParallaxProvider } from "react-scroll-parallax";

// Helper to get a random floating–point number between min and max.
const getRandomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

// Generates a random movement path for a shape.
// It randomly chooses one edge to start from and sets the end position on the opposite edge.
const getRandomMovement = () => {
  // (These offset numbers push the shape fully offscreen before/after.)
  const offset = 100;

  // Check if window is defined (i.e. code is running in the browser)
  if (typeof window === "undefined") {
    // Return default values when server-side rendering.
    return {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
      duration: 30,
    };
  }

  // (These offset numbers push the shape fully offscreen before/after.)
  const { innerWidth: width, innerHeight: height } = window;
  const edge = Math.floor(Math.random() * 4);
  let start, end;
  switch (edge) {
    case 0: // Start at top, float downward.
      start = { x: getRandomFloat(0, width), y: -offset };
      end = { x: getRandomFloat(0, width), y: height + offset };
      break;
    case 1: // Start at right, float leftward.
      start = { x: width + offset, y: getRandomFloat(0, height) };
      end = { x: -offset, y: getRandomFloat(0, height) };
      break;
    case 2: // Start at bottom, float upward.
      start = { x: getRandomFloat(0, width), y: height + offset };
      end = { x: getRandomFloat(0, width), y: -offset };
      break;
    case 3: // Start at left, float rightward.
    default:
      start = { x: -offset, y: getRandomFloat(0, height) };
      end = { x: width + offset, y: getRandomFloat(0, height) };
      break;
  }
  // A random duration between 20 and 40 seconds.
  const duration = getRandomFloat(20, 40);
  return { start, end, duration };
};

const AnimatedBackground = () => {
  // Base shapes definitions.
  // (Feel free to tweak the classes and clip-paths as needed.)
  const baseShapes = [
    {
      shape: "circle",
      className: "w-16 h-16 md:w-32 md:h-32 bg-zinc-500 rounded-full",
      animation: "animate-float-slow",
      style: {},
    },
    {
      shape: "square",
      className: "w-40 h-40 bg-zinc-500 rotate-12",
      animation: "animate-float-medium",
      style: {},
    },
    {
      shape: "rectangle",
      className: "w-64 h-24 bg-zinc-500 -rotate-6",
      animation: "animate-float-fast",
      style: {},
    },
    {
      shape: "triangle",
      className: "w-16 h-16 md:w-32 md:h-32 bg-zinc-100",
      style: { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" },
      animation: "animate-float-medium",
    },
    {
      shape: "abstract",
      className: "w-48 h-48 bg-zinc-500",
      style: {
        clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
      },
      animation: "animate-float-slow",
    },
  ];

  // Augment each shape with a random movement object.
  const shapes = useMemo(() => {
    return baseShapes.map((shape) => {
      const movement = getRandomMovement();
      return { ...shape, movement };
    });
  }, []);

  // Define additional “floating” effects.
  // (We removed horizontal translation here so that the outer motion controls the main movement.)
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
      {/* The fixed container ensures the shapes are rendered behind other content */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {shapes.map((shape, index) => {
          const { start, end, duration } = shape.movement;
          const { animate, transition } = getAnimationProps(shape.animation);
          return (
            // Outer motion.div animates from the random start to the random end,
            // making the shape float across the entire viewport.
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
              {/* Inner motion.div applies extra floating effects (rotation and scaling) */}
              <motion.div
                className={`${shape.className} opacity-50`}
                style={shape.style}
                animate={animate}
                transition={transition}
              />
            </motion.div>
          );
        })}
      </div>
    </ParallaxProvider>
  );
};

export default AnimatedBackground;
