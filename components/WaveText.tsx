"use client";

import React, { FC } from "react";
import { motion } from "framer-motion";

interface SequentialTextProps {
  text: string;
  className?: string;
}

const letterVariants = {
  initial: { scale: 1, color: "inherit" },
  animate: (i: number) => ({
    scale: 1.2, // Adjust scale as needed
    color: "#FFD700",
    transition: {
      duration: 0.3,
      delay: i * 0.15, // Each letter's animation is delayed by its index
    },
  }),
};

const SequentialText: FC<SequentialTextProps> = ({ text, className = "" }) => {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          initial="initial"
          animate="animate"
          variants={letterVariants}
          style={{ display: "inline-block" }} // Ensure transforms work correctly
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

export default SequentialText;
