"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Database, Laptop, Layers, Cloud } from "lucide-react";
import {
  SiDocker,
  SiExpress,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTypescript,
} from "react-icons/si";
import ExperienceStats from "./ExperienceStats";
import { TECH_STACK_CONSTANTS } from "@/constants/techStack";
import { motion } from "framer-motion";

// Helper function to map icon names to components
const getIconComponent = (iconName: string, size: number = 24) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    Laptop: <Laptop size={size} />,
    Database: <Database size={size} />,
    Layers: <Layers size={size} />,
    Cloud: <Cloud size={size} />,
    Code2: <Code2 size={size} />,
    SiTypescript: <SiTypescript size={size} className="text-blue-500 dark:text-blue-400" />,
    SiReact: <SiReact size={size} className="text-blue-400 dark:text-blue-300" />,
    SiNextdotjs: <SiNextdotjs size={size} className="text-black dark:text-white" />,
    SiNodedotjs: <SiNodedotjs size={size} className="text-emerald-500 dark:text-emerald-400" />,
    SiExpress: <SiExpress size={size} className="text-zinc-500 dark:text-zinc-300" />,
    SiDocker: <SiDocker size={size} className="text-blue-400 dark:text-blue-300" />,
    SiSupabase: <SiSupabase size={size} className="text-emerald-500 dark:text-emerald-400" />,
    SiRedis: <SiRedis size={size} className="text-red-500 dark:text-red-400" />,
  };
  return iconMap[iconName] || null;
};

const MotionDiv = motion.div;

const getCategoryGradient = (category: string) => {
  const gradients = {
    frontend: "from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20",
    backend:
      "from-emerald-500/10 to-emerald-600/10 dark:from-emerald-500/20 dark:to-emerald-600/20",
    database: "from-purple-500/10 to-purple-600/10 dark:from-purple-500/20 dark:to-purple-600/20",
    cloud: "from-orange-500/10 to-orange-600/10 dark:from-orange-500/20 dark:to-orange-600/20",
  };
  return (
    gradients[category as keyof typeof gradients] ||
    "from-zinc-500/10 to-zinc-600/10 dark:from-zinc-500/20 dark:to-zinc-600/20"
  );
};

const getCategoryHoverGradient = (category: string) => {
  const gradients = {
    frontend:
      "hover:from-blue-500/20 hover:to-blue-600/20 dark:hover:from-blue-500/30 dark:hover:to-blue-600/30",
    backend:
      "hover:from-emerald-500/20 hover:to-emerald-600/20 dark:hover:from-emerald-500/30 dark:hover:to-emerald-600/30",
    database:
      "hover:from-purple-500/20 hover:to-purple-600/20 dark:hover:from-purple-500/30 dark:hover:to-purple-600/30",
    cloud:
      "hover:from-orange-500/20 hover:to-orange-600/20 dark:hover:from-orange-500/30 dark:hover:to-orange-600/30",
  };
  return (
    gradients[category as keyof typeof gradients] ||
    "hover:from-zinc-500/20 hover:to-zinc-600/20 dark:hover:from-zinc-500/30 dark:hover:to-zinc-600/30"
  );
};

type Skill = {
  name: string;
  level: string;
  proficiency: string;
  icon: string;
  iconColor: string;
  details: string;
};

const CompactSkillCard = ({ skill }: { skill: Skill }) => (
  <div
    className="flex items-center justify-between gap-2 bg-white/80 dark:bg-zinc-800/80 rounded-xl p-2.5
    border border-zinc-200 dark:border-zinc-700/50
    hover:bg-white dark:hover:bg-zinc-800
    hover:border-zinc-300 dark:hover:border-zinc-600
    transition-all duration-300 backdrop-blur-sm group"
  >
    <div className="flex-shrink-0">{getIconComponent(skill.icon, 20)}</div>
    <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
      {skill.level}
    </span>
  </div>
);

const ModernTechStack = () => {
  return (
    <section
      className="bg-gradient-to-b from-white/80 to-zinc-50/80 dark:from-zinc-800/95 dark:to-zinc-900/95"
      id="tech-stack"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
        {/* Section Header */}
        <div className="flex items-center gap-4 lg:gap-6 mb-8 lg:mb-16">
          <div className="bg-gradient-to-br from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3 lg:p-4 rounded-xl lg:rounded-2xl">
            <Code2 size={20} className="text-white lg:hidden" />
            <Code2 size={24} className="text-white hidden lg:block" />
          </div>
          <div>
            <p className="md:text-sm lg:md:text-md font-mono text-zinc-500 dark:text-zinc-400 mb-1">
              {TECH_STACK_CONSTANTS.section.number} / EXPERTISE
            </p>
            <h2 className="text-2xl lg:text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-200">
              {TECH_STACK_CONSTANTS.section.title}
            </h2>
          </div>
        </div>

        <p className="font-mono text-lg sm:text-md text-zinc-700 dark:text-zinc-100 leading-relaxed max-w-2xl mb-16">
          {TECH_STACK_CONSTANTS.section.description}
        </p>

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
          {Object.entries(TECH_STACK_CONSTANTS.categories).map(([key, category], index) => (
            <MotionDiv
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1,
              }}
            >
              <Card
                className={`relative bg-gradient-to-br ${getCategoryGradient(key)} 
                  shadow-lg rounded-3xl 
                  transition-all duration-300 group overflow-hidden 
                  dark:shadow-zinc-900/30
                  hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50
                  hover:-translate-y-1 hover:scale-[1.02]
                  ${getCategoryHoverGradient(key)}`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.12),rgba(255,255,255,0))] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-0 relative z-10">
                  {/* Mobile Compact View */}
                  <div className="lg:hidden p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-gradient-to-br from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3 rounded-xl">
                        <div className="text-white">{getIconComponent(category.icon, 20)}</div>
                      </div>
                      <div>
                        <h3 className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-200">
                          {category.title}
                        </h3>
                        <p className="font-mono text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <MotionDiv
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                            delay: index * 0.1 + skillIndex * 0.05,
                          }}
                        >
                          <CompactSkillCard skill={skill} />
                        </MotionDiv>
                      ))}
                    </div>
                  </div>

                  {/* Desktop Full View */}
                  <div className="hidden lg:block p-8">
                    <div className="flex items-start gap-6 mb-8">
                      <div className="bg-gradient-to-br from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-4 rounded-xl group-hover:from-[#444] group-hover:to-zinc-600 dark:group-hover:from-zinc-600 dark:group-hover:to-zinc-500 transition-colors duration-300">
                        <div className="text-white">{getIconComponent(category.icon)}</div>
                      </div>
                      <div className="flex-1 pt-2">
                        <h3 className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-200 mb-1">
                          {category.title}
                        </h3>
                        <p className="font-mono text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {category.skills.map((skill, skillIndex) => (
                        <MotionDiv
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                            delay: index * 0.1 + skillIndex * 0.05,
                          }}
                        >
                          <div
                            className="group/skill relative bg-white/80 dark:bg-zinc-800/80 rounded-2xl p-4 
                            border border-zinc-200 dark:border-zinc-700/50
                            hover:bg-white dark:hover:bg-zinc-800
                            hover:border-zinc-300 dark:hover:border-zinc-600
                            transition-all duration-300
                            hover:shadow-md backdrop-blur-sm"
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1">{getIconComponent(skill.icon, 20)}</div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1.5">
                                  <h4 className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                    {skill.name}
                                  </h4>
                                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                                    {skill.level}
                                  </span>
                                </div>
                                <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">
                                  {skill.proficiency}
                                </p>
                                <p className="font-mono text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-2">
                                  {skill.details}
                                </p>
                              </div>
                            </div>
                          </div>
                        </MotionDiv>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </div>

        <div className="mt-24 pt-24 border-t border-zinc-200 dark:border-zinc-700/50">
          <ExperienceStats />
        </div>
      </div>
    </section>
  );
};

export default ModernTechStack;
