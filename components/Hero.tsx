"use client";

import { Button } from "@/components/ui/button";
import { useContainerDimensions } from "@/hooks/useContainerDimensions";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { RefObject, useCallback, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { HERO_CONSTANTS } from "@/constants/hero";

// Lazy load heavy components with optimized loading states
const TechBadges = dynamic(() => import("./TechStackBadges"), {
  loading: () => (
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="h-6 w-16 bg-gradient-to-r from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 rounded-full animate-pulse"
        />
      ))}
    </div>
  ),
  ssr: false
});

const WaveText = dynamic(() => import("./WaveText"), {
  loading: () => <span className="text-zinc-700 dark:text-zinc-100">interactive experiences</span>,
  ssr: false
});

// Lazy load ForceGraph with intersection observer
const ForceGraph = dynamic(() => import("./ForceGraph"), {
  loading: () => <GraphSkeleton />,
  ssr: false,
});

// Optimized skeleton component
const GraphSkeleton = () => (
  <div className="w-full h-full min-h-[400px] lg:min-h-[600px] flex items-center justify-center">
    <div className="space-y-6">
      <div className="flex justify-center space-x-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-10 h-10 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
      <div className="flex justify-center space-x-8">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="w-6 h-6 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 rounded-full animate-pulse"
            style={{ animationDelay: `${(i + 3) * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

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
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useContainerDimensions(graphContainerRef as RefObject<HTMLElement>);

  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const [shouldLoadGraph, setShouldLoadGraph] = useState(false);
  const [isGraphVisible, setIsGraphVisible] = useState(false);

  // Optimized popup handler with debouncing
  const handlePopupRequest = useCallback((node: NodeDatum, x: number, y: number) => {
    setPopupData({ node, x, y });
    // Use requestIdleCallback for non-critical popup dismissal
    const timeoutId = setTimeout(() => {
      setPopupData(null);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Optimized intersection observer with better thresholds
  useEffect(() => {
    if (!graphContainerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsGraphVisible(true);
          // Use requestIdleCallback for non-critical graph loading
          if (window.requestIdleCallback) {
            window.requestIdleCallback(() => {
              setShouldLoadGraph(true);
            });
          } else {
            setTimeout(() => {
              setShouldLoadGraph(true);
            }, 50);
          }
          observer.disconnect();
        }
      },
      {
        threshold: 0.05, // Smaller threshold for earlier loading
        rootMargin: "100px", // Larger margin for smoother UX
      }
    );

    observer.observe(graphContainerRef.current);
    return () => observer.disconnect();
  }, [width, height]);

  // Preload critical resources for better performance
  useEffect(() => {
    // Preconnect to external domains if needed
    const preconnectLink = document.createElement('link');
    preconnectLink.rel = 'preconnect';
    preconnectLink.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnectLink);

    return () => {
      if (document.head.contains(preconnectLink)) {
        document.head.removeChild(preconnectLink);
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-white/80 to-zinc-50/80 dark:from-zinc-800/95 dark:to-zinc-900/95 md:h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-12 lg:py-24">
          {/* Content Section - Render immediately for better FCP */}
          <div className="space-y-5 lg:space-y-6 pt-10 lg:pt-12">
            {/* Status Badge - Simplified for faster render */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-700 px-3 sm:px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-mono text-[10px] sm:text-xs text-zinc-900 dark:text-zinc-100 font-medium">
                {HERO_CONSTANTS.status.text}
              </span>
            </div>

            {/* Main Heading - Critical content, render immediately */}
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

            {/* Description - Load WaveText component lazily */}
            <p className="font-mono text-lg sm:text-md text-zinc-700 dark:text-zinc-100 leading-relaxed max-w-xl mb-2">
              {HERO_CONSTANTS.description.text}{" "}
              <WaveText text={HERO_CONSTANTS.description.waveText} />.
            </p>

            {/* Tech Stack Pills - Load lazily */}
            <div className="mt-4">
              <TechBadges />
            </div>

            {/* CTA Buttons - Critical for engagement, render immediately */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="#projects" prefetch={false}>
                <Button
                  className="bg-gradient-to-r from-[#EAB308] to-[#D97706] dark:from-[#FACC15] dark:to-[#F59E0B]
                    font-bold text-black hover:from-[#D97706] hover:to-[#B45309] dark:hover:from-[#F59E0B] dark:hover:to-[#D97706]
                    rounded-full font-mono md:text-lg px-6 sm:px-8 py-6 group w-full sm:w-auto 
                    transition-all duration-300"
                >
                  VIEW PROJECTS
                  <ArrowRight
                    className="ml-2 transition-transform group-hover:translate-x-1"
                    size={18}
                  />
                </Button>
              </Link>
              <Link href="#contact" prefetch={false}>
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-700
                    text-black hover:from-zinc-300 hover:to-zinc-200 dark:text-white dark:hover:from-zinc-700 dark:hover:to-zinc-600
                    rounded-full font-mono font-bold md:text-md 2xl:text-lg px-6 sm:px-8 py-6 w-full sm:w-auto 
                    transition-all duration-300 border-0"
                >
                  {HERO_CONSTANTS.cta.contact}
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Section - Lazy loaded with intersection observer */}
          <div ref={graphContainerRef} className="relative min-h-[400px] lg:min-h-[600px]">
            {!isGraphVisible && <GraphSkeleton />}

            {shouldLoadGraph && width > 0 && height > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.1,
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

            {/* Popup - Optimized with reduced motion */}
            <AnimatePresence mode="wait">
              {popupData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: -80, x: "-50%" }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.6,
                  }}
                  className="absolute hidden md:block bg-gradient-to-br from-zinc-900/95 to-zinc-800/95 text-white p-4 rounded-md pointer-events-none origin-bottom md:min-w-[300px] backdrop-blur-sm"
                  style={{
                    left: popupData.x + width / 2,
                    top: popupData.y + height / 2,
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