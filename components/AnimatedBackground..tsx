"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ParallaxProvider } from "react-scroll-parallax";

// Base shape style
const excalidrawShape = `
  relative
  border
  border-zinc-400
  overflow-visible
  bg-[length:4px_4px]
  bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.02)_0px,transparent_1px,transparent_2px,rgba(0,0,0,0.02)_3px)]
  before:absolute
  before:inset-0
  before:border
  before:border-zinc-400
  before:translate-x-[0.5px]
  before:-translate-y-[0.5px]
  before:opacity-20
  after:absolute
  after:inset-0
  after:border
  after:border-zinc-400
  after:-translate-x-[0.5px]
  after:translate-y-[0.5px]
  after:opacity-20
`;

// Special style for circle to ensure rounded borders on pseudo-elements
const circleShape = `
  relative
  border
  border-zinc-400
  overflow-visible
  rounded-full
  bg-[length:4px_4px]
  bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.02)_0px,transparent_1px,transparent_2px,rgba(0,0,0,0.02)_3px)]
  before:absolute
  before:inset-0
  before:border
  before:border-zinc-400
  before:rounded-full
  before:translate-x-[0.5px]
  before:-translate-y-[0.5px]
  before:opacity-20
  after:absolute
  after:inset-0
  after:border
  after:border-zinc-400
  after:rounded-full
  after:-translate-x-[0.5px]
  after:translate-y-[0.5px]
  after:opacity-20
`;

const getRandomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

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
    case 0:
      start = { x: getRandomFloat(0, width), y: -offset };
      end = { x: getRandomFloat(0, width), y: height + offset };
      break;
    case 1:
      start = { x: width + offset, y: getRandomFloat(0, height) };
      end = { x: -offset, y: getRandomFloat(0, height) };
      break;
    case 2:
      start = { x: getRandomFloat(0, width), y: height + offset };
      end = { x: getRandomFloat(0, width), y: -offset };
      break;
    case 3:
    default:
      start = { x: -offset, y: getRandomFloat(0, height) };
      end = { x: width + offset, y: getRandomFloat(0, height) };
      break;
  }

  const duration = getRandomFloat(20, 40);
  return { start, end, duration };
};

const AnimatedBackground = () => {
  const baseShapes = [
    {
      shape: "circle",
      className: `${circleShape} w-16 h-16 md:w-32 md:h-32 bg-blue-200`,
      animation: "animate-float-slow",
      style: {},
    },
    {
      shape: "square",
      className: `${excalidrawShape} w-20 h-20 md:w-40 md:h-40 rotate-12 bg-green-200`,
      animation: "animate-float-medium",
      style: {},
    },
    {
      shape: "rectangle",
      className: `${excalidrawShape} w-32 h-12 md:w-64 md:h-24 -rotate-6 bg-yellow-200`,
      animation: "animate-float-fast",
      style: {},
    },
    {
      shape: "triangle",
      className: `${excalidrawShape} w-16 h-16 md:w-32 md:h-32 bg-red-200`,
      style: {
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      },
      animation: "animate-float-medium",
    },
    {
      shape: "abstract",
      className: `${excalidrawShape} w-24 h-24 md:w-48 md:h-48 bg-purple-200`,
      style: {
        clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
      },
      animation: "animate-float-slow",
    },
  ];

  const shapes = useMemo(() => {
    return baseShapes.map((shape) => {
      const movement = getRandomMovement();
      return { ...shape, movement };
    });
  }, []);

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
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {shapes.map((shape, index) => {
          const { start, end, duration } = shape.movement;
          const { animate, transition } = getAnimationProps(shape.animation);
          return (
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
              <motion.div
                className={`${shape.className} opacity-80`}
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
