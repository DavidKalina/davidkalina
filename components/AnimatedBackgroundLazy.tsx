"use client";

import dynamic from "next/dynamic";

// Purely decorative, renders only after mount, and pulls in framer-motion.
// Load it client-side so it never blocks first paint of page content.
const AnimatedBackground = dynamic(() => import("./AnimatedBackground"), {
  ssr: false,
});

export default function AnimatedBackgroundLazy() {
  return <AnimatedBackground />;
}
