import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Database, Laptop, Layers } from "lucide-react";

const ModernTechStack = () => {
  const technologies = {
    frontend: {
      icon: <Laptop size={24} className="text-zinc-800" />,
      title: "FRONTEND DEVELOPMENT",
      description: "Crafting responsive and intuitive user interfaces with modern web technologies",
      skills: [
        { name: "TYPESCRIPT", level: "Advanced", years: 4 },
        { name: "REACT", level: "Advanced", years: 4 },
      ],
    },
    backend: {
      icon: <Database size={24} className="text-zinc-800" />,
      title: "BACKEND DEVELOPMENT",
      description: "Building robust and scalable server-side applications and APIs",
      skills: [
        { name: "NODE.JS", level: "Advanced", years: 3 },
        { name: "EXPRESS", level: "Advanced", years: 3 },
      ],
    },
    database: {
      icon: <Layers size={24} className="text-zinc-800" />,
      title: "DATABASE & INFRASTRUCTURE",
      description: "Managing data and infrastructure with modern cloud solutions",
      skills: [{ name: "SUPABASE", level: "Advanced", years: 2 }],
    },
  };

  return (
    <section className="bg-white/80 border-t border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-8 py-32">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-black p-4 rounded-2xl">
              <Code2 size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-mono text-zinc-500 mb-1">002 / EXPERTISE</p>
              <h2 className="text-3xl font-mono font-bold text-zinc-900">Technical Expertise</h2>
            </div>
          </div>
          <p className="font-mono text-zinc-600 leading-relaxed mb-16">
            Specialized in modern web development with a focus on scalable applications. Experienced
            in both frontend and backend technologies with a strong emphasis on code quality and
            performance.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(technologies).map(([key, category]) => (
            <Card
              key={key}
              className="border-2 border-zinc-100 rounded-3xl hover:border-black transition-colors duration-300 group overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Card Header */}
                <div className="p-8 pb-6">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="bg-zinc-100 p-4 rounded-xl group-hover:bg-black transition-colors duration-300">
                      <div className="group-hover:text-white transition-colors duration-300">
                        {category.icon}
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-mono text-sm font-bold text-zinc-900 mb-1">
                        {category.title}
                      </h3>
                      <p className="font-mono text-sm text-zinc-600 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills List */}
                <div className="border-t border-zinc-100">
                  {category.skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className={`
                        p-8 hover:bg-zinc-50 transition-colors duration-300
                        ${index !== category.skills.length - 1 ? "border-b border-zinc-100" : ""}
                      `}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="space-y-2">
                          <Badge className="bg-black text-white px-4 py-2 rounded-full text-xs font-mono">
                            {skill.name}
                          </Badge>
                          <p className="font-mono text-xs text-zinc-500 pl-1">
                            {skill.years} YEARS EXPERIENCE
                          </p>
                        </div>
                        <span className="font-mono text-sm font-bold text-zinc-900">
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

        {/* Experience Stats */}
        <div className="mt-24 pt-24 border-t border-zinc-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-3">
              <p className="font-mono text-5xl font-bold text-zinc-900">5+</p>
              <p className="font-mono text-sm text-zinc-500">
                YEARS OF
                <br />
                DEVELOPMENT
              </p>
            </div>
            <div className="space-y-3">
              <p className="font-mono text-5xl font-bold text-zinc-900">100+</p>
              <p className="font-mono text-sm text-zinc-500">
                PROJECTS
                <br />
                COMPLETED
              </p>
            </div>
            <div className="space-y-3">
              <p className="font-mono text-5xl font-bold text-zinc-900">50K+</p>
              <p className="font-mono text-sm text-zinc-500">
                LINES OF
                <br />
                CODE
              </p>
            </div>
            <div className="space-y-3">
              <p className="font-mono text-5xl font-bold text-zinc-900">12+</p>
              <p className="font-mono text-sm text-zinc-500">
                OPEN SOURCE
                <br />
                CONTRIBUTIONS
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernTechStack;
