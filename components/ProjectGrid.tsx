import { Wrench } from "lucide-react";
import React from "react";
import { PROJECT_GRID_CONSTANTS } from "@/constants/projectGrid";
import ProjectCard from "./ProjectCard";

const ModernProjectGrid = () => {
  return (
    <section
      className="bg-gradient-to-b from-white/80 to-zinc-50/80 dark:from-zinc-800/95 dark:to-zinc-900/95"
      id="projects"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-gradient-to-br from-[#ffd43b] to-[#fcc419] dark:from-[#ffd43b]/90 dark:to-[#fcc419]/90 p-3 lg:p-4 rounded-xl lg:rounded-2xl">
              <Wrench size={20} className="text-white lg:hidden" />
              <Wrench size={24} className="text-white hidden lg:block" />
            </div>
            <div>
              <p className="text-xs lg:text-sm font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                {PROJECT_GRID_CONSTANTS.section.number} / WORK
              </p>
              <h2 className="text-2xl lg:text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-200">
                {PROJECT_GRID_CONSTANTS.section.title}
              </h2>
            </div>
          </div>
          <p className="font-mono text-sm lg:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8 lg:mb-16">
            {PROJECT_GRID_CONSTANTS.section.description}
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROJECT_GRID_CONSTANTS.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernProjectGrid;
