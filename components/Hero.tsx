"use client";

import { Button } from "@/components/ui/button";
import { useContainerDimensions } from "@/hooks/useContainerDimensions";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { RefObject, useCallback, useRef, useState } from "react";
import ForceGraph from "./ForceGraph";
import TechBadges from "./TechStackBadges";
import WaveText from "./WaveText";
import { HERO_CONSTANTS } from "@/constants/hero";

interface NodeDatum {
  id: string;
  label: string;
  emoji: string;
  group?: number;
  description: string;
}

interface PopupData {
  node: NodeDatum;
  x: number;
  y: number;
}

const ModernHero = () => {
  // Container ref for the graph area.
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useContainerDimensions(graphContainerRef as RefObject<HTMLElement>);

  // Store the popup data (node info and coordinates).
  const [popupData, setPopupData] = useState<PopupData | null>(null);

  // Callback passed to ForceGraph.
  const handlePopupRequest = useCallback((node: NodeDatum, x: number, y: number) => {
    setPopupData({ node, x, y });
    // Automatically dismiss the popup after 3 seconds.
    setTimeout(() => {
      setPopupData(null);
    }, 3000);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white/80 to-zinc-50/80 dark:from-zinc-800/95 dark:to-zinc-900/95 md:h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-12 lg:py-24">
          {/* Content Section */}
          <div className="space-y-5 lg:space-y-6 pt-10 lg:pt-12">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-700 px-3 sm:px-4 py-2 rounded-full shadow-sm">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs text-zinc-900 dark:text-zinc-100 font-medium">
                {HERO_CONSTANTS.status.text}
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="font-mono font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug">
                <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                  {HERO_CONSTANTS.heading.highlight}
                </span>
                <span className="text-zinc-600 dark:text-zinc-200">
                  {HERO_CONSTANTS.heading.rest}
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="font-mono text-lg sm:text-md text-zinc-700 dark:text-zinc-100 leading-relaxed max-w-xl mb-2">
              {HERO_CONSTANTS.description.text}{" "}
              <WaveText text={HERO_CONSTANTS.description.waveText} />.
            </p>

            {/* Tech Stack Pills */}
            <div className="mt-4">
              <TechBadges />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="#projects">
                <Button
                  className="bg-gradient-to-r from-[#EAB308] to-[#D97706] dark:from-[#FACC15] dark:to-[#F59E0B]
                    font-bold text-black hover:from-[#D97706] hover:to-[#B45309] dark:hover:from-[#F59E0B] dark:hover:to-[#D97706]
                    rounded-full font-mono md:text-lg px-6 sm:px-8 py-6 group w-full sm:w-auto 
                    shadow-[0px_0px_8px_rgba(255,215,0,0.4)] group-hover:shadow-[0px_0px_14px_rgba(255,215,0,0.6)] 
                    transition-all duration-300"
                >
                  VIEW PROJECTS
                  <ArrowRight
                    className="ml-2 transition-transform group-hover:translate-x-1"
                    size={18}
                  />
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-700
                    text-black hover:from-zinc-300 hover:to-zinc-200 dark:text-white dark:hover:from-zinc-700 dark:hover:to-zinc-600
                    rounded-full font-mono font-bold md:text-md 2xl:text-lg px-6 sm:px-8 py-6 w-full sm:w-auto 
                    transition-all duration-300 border-0 shadow-sm hover:shadow-md"
                >
                  {HERO_CONSTANTS.cta.contact}
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Section */}
          <div ref={graphContainerRef} className="relative min-h-[400px] lg:min-h-[600px]">
            {width > 0 && height > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1], // Custom easing for smooth animation
                  delay: 0.3, // Slight delay to let other elements settle
                }}
                className="w-full h-full"
              >
                <ForceGraph
                  width={width}
                  height={height}
                  onPopupRequest={handlePopupRequest}
                  activePopupNodeId={popupData?.node.id}
                  onPopupMove={(x, y) => {
                    setPopupData((prev) => (prev ? { ...prev, x: x, y: y - 80 } : prev));
                  }}
                />
              </motion.div>
            )}

            {/* Overlay Popup rendered on top of the graph */}
            <AnimatePresence>
              {popupData && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    y: 20,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: -100,
                    x: "-50%",
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    y: 20,
                    filter: "blur(4px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    mass: 0.8,
                    delay: 0.1, // Slight delay after graph appears
                  }}
                  className="absolute hidden md:block bg-gradient-to-br from-zinc-900/95 to-zinc-800/95 text-white p-4 rounded-md shadow-lg pointer-events-none origin-bottom md:min-w-[300px] backdrop-blur-sm"
                  style={{
                    left: popupData.x + width / 2,
                    top: popupData.y + height / 2,
                    transformOrigin: "bottom center",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-mono">{popupData.node.emoji}</span>
                    <span className="font-bold font-mono">{popupData.node.label}</span>
                  </div>
                  <p className="mt-2 text-sm font-mono">{popupData.node.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHero;
