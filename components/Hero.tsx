"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useContainerDimensions } from "@/hooks/useContainerDimensions";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { RefObject, useCallback, useRef, useState } from "react";
import ForceGraph from "./ForceGraph";
import WaveText from "./WaveText";
import { AnimatePresence, motion } from "framer-motion";

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
    <div className="bg-white/80 dark:bg-zinc-800/95 md:h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-12 lg:py-24">
          {/* Content Section */}
          <div className="space-y-6 lg:space-y-8 pt-10 lg:pt-12">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 bg-zinc-100 px-3 sm:px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs">AVAILABLE FOR PROJECTS</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="font-mono font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug">
                <span className="text-yellow-500">Human-Centered Innovation</span>
                <span className="text-zinc-600 dark:text-zinc-200"> with Scalable Tech</span>
              </h1>
            </div>

            {/* Description */}
            <p className="font-mono text-md sm:text-lg text-zinc-700 dark:text-zinc-100 leading-relaxed max-w-xl">
              I build scalable, real-time systems and intuitive digital experiences—blending AI’s
              power with human intuition to create technology that feels alive and retains the spark
              of <WaveText text="human divinity" />.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              {["TYPESCRIPT", "REACT", "NODE.JS", "DOCKER", "EXPRESS", "PSQL"].map((tech) => (
                <Badge
                  key={tech}
                  className="bg-zinc-100 hover:text-white text-black px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-xs font-mono"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="#projects">
                <Button
                  className="bg-[#FACC15] font-medium dark:bg-[#FACC15] text-white hover:bg-[#222] dark:hover:bg-[#FDE047] rounded-full font-mono text-sm px-6 sm:px-8 py-6 group w-full sm:w-auto 
                  shadow-[0px_0px_8px_rgba(255,215,0,0.4)] group-hover:shadow-[0px_0px_14px_rgba(255,215,0,0.6)] transition-all duration-300"
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
                  className="border-2 border-zinc-20 dark:border-zinc-700 hover:border-black hover:bg-white/80 text-black dark:text-white rounded-full font-mono text-sm px-6 sm:px-8 py-6 w-full sm:w-auto"
                >
                  CONTACT ME
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Section */}
          <div ref={graphContainerRef} className="relative min-h-[400px] lg:min-h-[600px]">
            {width > 0 && height > 0 && (
              <ForceGraph
                width={width}
                height={height}
                onPopupRequest={handlePopupRequest}
                activePopupNodeId={popupData?.node.id}
                onPopupMove={(x, y) => {
                  setPopupData((prev) => (prev ? { ...prev, x: x, y: y - 80 } : prev));
                }}
              />
            )}

            {/* Overlay Popup rendered on top of the graph */}
            <AnimatePresence>
              {popupData && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: -120,
                    x: "-50%",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    y: 20,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 0.5,
                  }}
                  className="absolute hidden md:block bg-zinc-900/90 text-white p-4 rounded-md shadow-lg pointer-events-none origin-bottom min-w-[300px]"
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
