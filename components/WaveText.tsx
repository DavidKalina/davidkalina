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
    <span className={`relative inline-block ${className}`}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{
            scale: 1,
            color: "inherit",
            opacity: 0.7,
            textShadow: "none",
          }}
          animate={{
            scale: [1, 1.5, 1.3],
            color: "#FFD700",
            opacity: [0.7, 1, 1],
            textShadow: [
              "none",
              "0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.6)",
              "0 0 10px rgba(255, 215, 0, 0.4)",
            ],
            transition: {
              duration: 0.8,
              delay: index * 0.1,
              times: [0, 0.6, 1],
              ease: "easeOut",
            },
          }}
          style={{
            display: "inline-block",
            backfaceVisibility: "hidden",
          }}
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
            background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.8), transparent)",
            pointerEvents: "none",
            zIndex: 1,
          }}
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            delay: text.length * 0.1 + 0.4,
            duration: 0.8,
            ease: "easeInOut",
          }}
        />
      )}
    </span>
  );
};

export default WaveText;
