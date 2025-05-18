import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Database, Laptop, Layers } from "lucide-react";
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

// Helper function to map icon names to components
const getIconComponent = (iconName: string, size: number = 24) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    Laptop: <Laptop size={size} />,
    Database: <Database size={size} />,
    Layers: <Layers size={size} />,
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

const ModernTechStack = () => {
  return (
    <section className="bg-gradient-to-b from-white/80 to-zinc-50/80 dark:from-zinc-800/95 dark:to-zinc-900/95">
      <div className="max-w-7xl mx-auto px-8 py-32">
        <div className="max-w-2xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-gradient-to-br from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-4 rounded-2xl">
              <Code2 size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                {TECH_STACK_CONSTANTS.section.number} / EXPERTISE
              </p>
              <h2 className="text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-200">
                {TECH_STACK_CONSTANTS.section.title}
              </h2>
            </div>
          </div>
          <p className="font-mono xl:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-16">
            {TECH_STACK_CONSTANTS.section.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(TECH_STACK_CONSTANTS.categories).map(([key, category]) => (
            <Card
              key={key}
              className="relative bg-gradient-to-br from-white/80 to-zinc-50/80 dark:from-zinc-700/80 dark:to-zinc-800/80 
                shadow-lg rounded-3xl 
                transition-all duration-300 group overflow-hidden 
                dark:shadow-zinc-900/30
                hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50
                hover:-translate-y-1 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.04),rgba(255,255,255,0))] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-0 relative z-10">
                <div className="p-8 pb-6">
                  <div className="flex items-start gap-6 mb-6">
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
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-700/50">
                  {category.skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className={`
                        p-8 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors duration-300
                        ${
                          index !== category.skills.length - 1
                            ? "border-b border-zinc-200 dark:border-zinc-700/50"
                            : ""
                        }
                      `}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="space-y-2">
                          <Badge
                            className="
                              bg-gradient-to-r from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800
                              text-white px-4 py-2 
                              rounded-full text-xs font-mono 
                              flex items-center gap-2 
                              border border-zinc-600 dark:border-zinc-500
                              shadow-md transition-all duration-200
                              hover:from-[#444] hover:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-500
                              hover:border-zinc-400 dark:hover:border-zinc-300 
                              hover:shadow-lg w-min
                            "
                          >
                            {getIconComponent(skill.icon, 16)}
                            {skill.name}
                          </Badge>
                          <p className="font-mono text-xs text-zinc-500 dark:text-zinc-200 pl-1">
                            {skill.proficiency}
                          </p>
                        </div>
                        <span className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
