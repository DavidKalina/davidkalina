"use client";

import ProjectSplitCard from "@/components/ProjectSplitCard";
import { PROJECT_CONSTANTS } from "@/constants/project";
import { Star } from "lucide-react";

const ModernFeaturedProject = () => {
  return (
    <section className="bg-gradient-to-b from-white/80 to-zinc-50/80 dark:from-zinc-800/95 dark:to-zinc-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
        {/* Minimal Header */}
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="bg-gradient-to-br from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3 lg:p-4 rounded-2xl">
              <Star size={20} className="text-white lg:hidden" />
              <Star size={24} className="text-white hidden lg:block" />
            </div>
            <div>
              <p className="text-xs lg:text-sm font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                {PROJECT_CONSTANTS.section.number} / FEATURED
              </p>
              <h2 className="text-2xl lg:text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-200">
                {PROJECT_CONSTANTS.section.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Main Project Display */}
        <ProjectSplitCard
          title={`${PROJECT_CONSTANTS.project.heading.line1} ${PROJECT_CONSTANTS.project.heading.line2}`}
          description={PROJECT_CONSTANTS.project.description}
          badges={[...PROJECT_CONSTANTS.project.badges]}
          stats={[...PROJECT_CONSTANTS.project.stats]}
          sourceUrl={PROJECT_CONSTANTS.project.links.source.url}
          mapmojiUrl="/mapmoji"
          qrUrl="https://testflight.apple.com/join/TZaPHE4j"
        />
      </div>
    </section>
  );
};

export default ModernFeaturedProject;
