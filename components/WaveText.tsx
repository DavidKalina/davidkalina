"use client";

import React, { FC } from "react";
import { motion } from "framer-motion";

interface SequentialTextProps {
  text: string;
  className?: string;
  addSheen?: boolean;
}

const WaveText: FC<SequentialTextProps> = ({ text, className = "", addSheen = false }) => {
  return (
    // The container is set as relative to position the sheen overlay correctly.
    <span className={`relative inline-block ${className}`}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          // Each letter starts at normal scale and its inherited color.
          initial={{ scale: 1, color: "inherit" }}
          // Each letter animates to a scaled-up size and golden color.
          animate={{
            scale: 1.5, // More noticeable scale factor
            color: "#FFD700",
            transition: {
              duration: 0.2, // Faster animation speed
              delay: index * 0.1, // Each letter animates sequentially faster
            },
          }}
          // Inline-block is required so that scaling applies per letter.
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      {addSheen && (
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            // A diagonal gradient that will create the sheen effect.
            background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.8), transparent)",
            pointerEvents: "none", // Allows clicks to pass through.
          }}
          // Start fully to the left.
          initial={{ x: "-100%" }}
          // Animate to fully to the right.
          animate={{ x: "100%" }}
          transition={{
            // Adjust delay so that the sheen starts after all letters animate
            delay: text.length * 0.1 + 0.1,
            duration: 0.8,
            ease: "easeInOut",
          }}
        />
      )}
    </span>
  );
};

export default WaveText;
