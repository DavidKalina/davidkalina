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

const ModernTechStack = () => {
  const technologies = {
    frontend: {
      icon: <Laptop size={24} />,
      title: "FRONTEND DEVELOPMENT",
      description: "Specializing in modern, user-centric web applications",
      skills: [
        {
          name: "TYPESCRIPT",
          level: "Advanced",
          proficiency: "4+ years of production experience",
          icon: <SiTypescript size={16} className="text-blue-500 dark:text-blue-400" />,
        },
        {
          name: "REACT",
          level: "Advanced",
          proficiency: "Enterprise-level applications",
          icon: <SiReact size={16} className="text-blue-400 dark:text-blue-300" />,
        },
        {
          name: "NEXT.JS",
          level: "Advanced",
          proficiency: "Full-stack applications",
          icon: <SiNextdotjs size={16} className="text-black dark:text-white" />,
        },
      ],
    },
    backend: {
      icon: <Database size={24} />,
      title: "BACKEND DEVELOPMENT",
      description: "Building scalable server-side solutions",
      skills: [
        {
          name: "NODE.JS",
          level: "Proficient",
          proficiency: "Production microservices",
          icon: <SiNodedotjs size={16} className="text-emerald-500 dark:text-emerald-400" />,
        },
        {
          name: "EXPRESS",
          level: "Proficient",
          proficiency: "REST API development",
          icon: <SiExpress size={16} className="text-zinc-500 dark:text-zinc-300" />,
        },
        {
          name: "DOCKER",
          level: "Intermediate",
          proficiency: "Container orchestration",
          icon: <SiDocker size={16} className="text-blue-400 dark:text-blue-300" />,
        },
      ],
    },
    database: {
      icon: <Layers size={24} />,
      title: "DATABASE & INFRASTRUCTURE",
      description: "Database design and infrastructure management",
      skills: [
        {
          name: "SUPABASE",
          level: "Proficient",
          proficiency: "Full-stack integration",
          icon: <SiSupabase size={16} className="text-emerald-500 dark:text-emerald-400" />,
        },
        {
          name: "REDIS",
          level: "Intermediate",
          proficiency: "Caching & queuing",
          icon: <SiRedis size={16} className="text-red-500 dark:text-red-400" />,
        },
      ],
    },
  };

  return (
    <section className="bg-zinc-50/80 dark:bg-zinc-900/95">
      <div className="max-w-7xl mx-auto px-8 py-32">
        <div className="max-w-2xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-[#333] dark:bg-zinc-700 p-4 rounded-2xl">
              <Code2 size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                001 / EXPERTISE
              </p>
              <h2 className="text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-200">
                Technical Skills
              </h2>
            </div>
          </div>
          <p className="font-mono xl:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-16">
            Focused on delivering high-performance web applications with modern technologies.
            Committed to continuous learning and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(technologies).map(([key, category]) => (
            <Card
              key={key}
              className="bg-white/80 dark:bg-zinc-800/80 shadow-lg rounded-3xl 
                transition-all duration-300 group overflow-hidden 
                dark:shadow-zinc-900/30
                hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50
                hover:-translate-y-1 hover:scale-[1.02]"
            >
              <CardContent className="p-0">
                <div className="p-8 pb-6">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="bg-[#333] dark:bg-zinc-700 p-4 rounded-xl group-hover:bg-[#333] dark:group-hover:bg-zinc-600 transition-colors duration-300">
                      <div className="text-white">{category.icon}</div>
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
                              bg-[#333] dark:bg-zinc-700 
                              text-white px-4 py-2 
                              rounded-full text-xs font-mono 
                              flex items-center gap-2 
                              border border-zinc-600 dark:border-zinc-500
                              shadow-md transition-all duration-200
                              hover:bg-[#444] dark:hover:bg-zinc-600 
                              hover:border-zinc-400 dark:hover:border-zinc-300 
                              hover:shadow-lg
                            "
                          >
                            {skill.icon}
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
