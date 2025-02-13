"use client";

import { cn } from "@/lib/utils";
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
import { ExcalidrawBadge } from "./ExcalidrawBadge";
import { ExcalidrawCard } from "./ExcalidrawCard";
import { ExcalidrawIconWrapper } from "./ExcalidrawIconWrapper";
import ExperienceStats from "./ExperienceStats";

const ModernTechStack = () => {
  const technologies = {
    frontend: {
      icon: Laptop,
      title: "FRONTEND DEVELOPMENT",
      description:
        "Developing responsive and intuitive user interfaces using cutting-edge web technologies",
      skills: [
        {
          name: "TYPESCRIPT",
          level: "Advanced",
          years: 4,
          icon: <SiTypescript size={16} className="text-blue-500" />,
        },
        {
          name: "REACT",
          level: "Advanced",
          years: 4,
          icon: <SiReact size={16} className="text-blue-200" />,
        },
        {
          name: "NEXT.JS",
          level: "Advanced",
          years: 4,
          icon: <SiNextdotjs size={16} className="text-white" />,
        },
      ],
    },
    backend: {
      icon: Database,
      title: "BACKEND DEVELOPMENT",
      description:
        "Creating robust and scalable server-side applications with efficient API design",
      skills: [
        {
          name: "NODE.JS",
          level: "Advanced",
          years: 3,
          icon: <SiNodedotjs size={16} className="text-emerald-500" />,
        },
        {
          name: "EXPRESS",
          level: "Advanced",
          years: 3,
          icon: <SiExpress size={16} className="text-zinc-500" />,
        },
        {
          name: "DOCKER",
          level: "Advanced",
          years: 3,
          icon: <SiDocker size={16} className="text-blue-400" />,
        },
      ],
    },
    database: {
      icon: Layers,
      title: "DATABASE & INFRASTRUCTURE",
      description:
        "Implementing modern cloud solutions for efficient data management and infrastructure",
      skills: [
        {
          name: "SUPABASE",
          level: "Advanced",
          years: 3,
          icon: <SiSupabase size={16} className="text-emerald-500" />,
        },
        {
          name: "REDIS",
          level: "Advanced",
          years: 3,
          icon: <SiRedis size={16} className="text-red-500" />,
        },
      ],
    },
  };

  return (
    <section className="bg-zinc-50/80">
      <div className="max-w-7xl mx-auto px-8 py-32">
        {/* Section Header stays the same */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-6 mb-8">
            <ExcalidrawIconWrapper icon={Code2} />
            <div>
              <p className="text-sm font-sketch text-zinc-500 mb-1">001 / EXPERTISE</p>
              <h2 className="text-3xl font-sketch font-bold text-zinc-900">Technical Expertise</h2>
            </div>
          </div>
          <p className="font-sketch xl:text-lg text-zinc-600 leading-relaxed mb-16">
            Specialized in modern web development with a focus on scalable applications. Experienced
            in both frontend and backend technologies with a strong emphasis on code quality and
            performance.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(technologies).map(([key, category]) => (
            <ExcalidrawCard key={key} className="bg-white group">
              {/* Card Header */}
              <div className="p-8 pb-6">
                <div className="flex items-start gap-6 mb-6">
                  <ExcalidrawIconWrapper icon={category.icon} />
                  <div className="flex-1 pt-2">
                    <h3 className="font-sketch text-sm font-bold text-zinc-900 mb-1">
                      {category.title}
                    </h3>
                    <p className="font-sketch text-sm text-zinc-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills List */}
              <div className="border-t border-zinc-200">
                {category.skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className={cn(
                      "p-8 hover:bg-zinc-50/50 transition-colors duration-300",
                      index !== category.skills.length - 1 && "border-b border-zinc-200"
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-2">
                        <ExcalidrawBadge className="bg-zinc-900 text-white px-4 py-2 rounded-full text-xs font-sketch flex items-center gap-2 hover:bg-black">
                          {skill.icon}
                          {skill.name}
                        </ExcalidrawBadge>
                        <p className="font-sketch text-xs text-zinc-500 pl-1">
                          {skill.years} YEARS EXPERIENCE
                        </p>
                      </div>
                      <span className="font-sketch text-sm font-bold text-zinc-900">
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ExcalidrawCard>
          ))}
        </div>

        {/* Experience Stats */}
        <div className="mt-24 pt-24 border-t border-zinc-200">
          <ExperienceStats />
        </div>
      </div>
    </section>
  );
};

export default ModernTechStack;
