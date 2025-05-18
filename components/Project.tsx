"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Network, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PROJECT_CONSTANTS } from "@/constants/project";

const ModernFeaturedProject = () => {
  const [isHovered, setIsHovered] = useState(false);

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
        <Card
          className="relative bg-gradient-to-br from-white/80 to-zinc-50/80 dark:from-zinc-800/80 dark:to-zinc-700/80 
            shadow-lg dark:shadow-zinc-900/30 rounded-3xl overflow-hidden transition-all duration-300 
            hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.01] hover:-translate-y-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.04),rgba(255,255,255,0))] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardContent className="p-0 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Project Visual */}
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 p-6 sm:p-8 lg:p-16 min-h-[320px] lg:min-h-[480px] flex items-center">
                <div
                  className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.12),rgba(255,255,255,0))] transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div className="relative z-10 w-full">
                  <div className="space-y-4 lg:space-y-6">
                    <div className="inline-block bg-gradient-to-br from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 rounded-xl lg:rounded-2xl p-2 lg:p-3">
                      <Network size={24} className="text-white lg:hidden" />
                      <Network size={32} className="text-white hidden lg:block" />
                    </div>
                    <div>
                      <p className="text-white/80 font-mono text-xs lg:text-sm tracking-wider mb-2 lg:mb-3">
                        {PROJECT_CONSTANTS.project.techStack}
                      </p>
                      <h3 className="text-2xl lg:text-4xl text-white font-mono font-bold leading-tight">
                        {PROJECT_CONSTANTS.project.heading.line1}
                        <br />
                        {PROJECT_CONSTANTS.project.heading.line2}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 sm:p-8 lg:p-16 bg-gradient-to-br from-white/80 to-zinc-50/80 dark:from-zinc-800/80 dark:to-zinc-700/80">
                <div className="space-y-8 lg:space-y-12">
                  <div className="space-y-4 lg:space-y-6">
                    <div className="flex flex-wrap gap-2 lg:gap-3">
                      {PROJECT_CONSTANTS.project.badges.map((badge, index) => (
                        <Badge
                          key={index}
                          className="bg-gradient-to-r from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 
                            text-white px-3 lg:px-4 py-2 rounded-full text-[10px] lg:text-xs font-mono 
                            hover:from-[#444] hover:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-500
                            transition-all duration-300"
                        >
                          {badge.text}
                        </Badge>
                      ))}
                    </div>
                    <p className="font-mono text-sm lg:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {PROJECT_CONSTANTS.project.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 lg:gap-6">
                    {PROJECT_CONSTANTS.project.stats.map((stat, index) => (
                      <div key={index} className="space-y-1 lg:space-y-2">
                        <p className="font-mono text-xl lg:text-2xl font-bold text-zinc-900 dark:text-zinc-200">
                          {stat.value}
                        </p>
                        <p className="font-mono text-[10px] lg:text-xs text-zinc-500 dark:text-zinc-400">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-6">
                    <Link href={PROJECT_CONSTANTS.project.links.source.url}>
                      <Button
                        variant="outline"
                        className="bg-gradient-to-r from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-700
                          text-black dark:text-white rounded-full font-mono font-bold md:text-md 2xl:text-lg 
                          px-6 lg:px-8 py-6 w-full sm:w-auto transition-all duration-300
                          hover:from-zinc-200 hover:to-zinc-100 dark:hover:from-zinc-700 dark:hover:to-zinc-600
                          border-0 shadow-sm hover:shadow-md"
                      >
                        <Github className="mr-2" size={18} />
                        {PROJECT_CONSTANTS.project.links.source.text}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ModernFeaturedProject;
