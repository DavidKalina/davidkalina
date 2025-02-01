import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Database,
  Github,
  Layers,
  Layout,
  MonitorSmartphone,
  Wrench,
} from "lucide-react";
import React from "react";

const ModernProjectGrid = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Dashboard",
      description: "Real-time analytics dashboard for tracking sales, inventory, and customer data",
      tags: ["REACT", "NODE.JS", "TYPESCRIPT"],
      icon: <Layout size={24} className="text-white" />,
      bgColor: "bg-emerald-500",
      metrics: {
        users: "50K+",
        performance: "98",
        uptime: "99.9%",
      },
      year: "2023",
    },
    {
      id: 2,
      title: "Task Management API",
      description: "RESTful API service for managing project tasks and team collaboration",
      tags: ["EXPRESS", "TYPESCRIPT", "POSTGRESQL"],
      icon: <Database size={24} className="text-white" />,
      bgColor: "bg-pink-500",
      metrics: {
        requests: "1M+",
        latency: "120ms",
        uptime: "99.9%",
      },
      year: "2023",
    },
    {
      id: 3,
      title: "Social Platform",
      description: "Mobile-first social platform for connecting professionals in tech",
      tags: ["REACT", "NODE.JS", "MONGODB"],
      icon: <MonitorSmartphone size={24} className="text-white" />,
      bgColor: "bg-purple-500",
      metrics: {
        users: "10K+",
        engagement: "85%",
        retention: "76%",
      },
      year: "2022",
    },
    {
      id: 4,
      title: "Data Pipeline",
      description: "Automated data processing pipeline for real-time analytics",
      tags: ["PYTHON", "AWS", "KAFKA"],
      icon: <Layers size={24} className="text-white" />,
      bgColor: "bg-cyan-500",
      metrics: {
        throughput: "5TB+",
        latency: "50ms",
        accuracy: "99.9%",
      },
      year: "2022",
    },
  ];

  return (
    <section className="bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-[#ffd43b] p-3 lg:p-4 rounded-xl lg:rounded-2xl">
              <Wrench size={20} className="text-white lg:hidden" />
              <Wrench size={24} className="text-white hidden lg:block" />
            </div>
            <div>
              <p className="text-xs lg:text-sm font-mono text-zinc-500 mb-1">003 / WORK</p>
              <h2 className="text-2xl lg:text-3xl font-mono font-bold text-zinc-900">
                Recent Projects
              </h2>
            </div>
          </div>
          <p className="font-mono text-sm lg:text-base text-zinc-600 leading-relaxed mb-8 lg:mb-16">
            A selection of recent projects showcasing my expertise in full-stack development, from
            interactive user interfaces to robust backend systems.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="border-2 border-zinc-100 rounded-2xl lg:rounded-3xl overflow-hidden hover:border-black transition-colors duration-300 group"
            >
              <CardContent className="p-0">
                {/* Project Header */}
                <div className={`relative ${project.bgColor} p-6 lg:p-8`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.04),rgba(255,255,255,0))] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4 lg:mb-6">
                      <div className="inline-block border-2 border-white/20 rounded-lg lg:rounded-xl p-2">
                        <div className="lg:hidden">
                          {React.cloneElement(project.icon, { size: 20 })}
                        </div>
                        <div className="hidden lg:block">{project.icon}</div>
                      </div>
                      <Badge className="bg-white/80/10 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs font-mono">
                        {project.year}
                      </Badge>
                    </div>
                    <h3 className="font-mono text-lg lg:text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs lg:text-sm text-white/60 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 lg:p-8 bg-white/80">
                  <div className="space-y-6 lg:space-y-8">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-zinc-100 text-black hover:text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs font-mono"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 lg:gap-6">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <p className="font-mono text-lg lg:text-2xl font-bold text-zinc-900">
                            {value}
                          </p>
                          <p className="font-mono text-[10px] lg:text-xs text-zinc-400 uppercase">
                            {key}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                      <Button className="bg-black text-white hover:bg-zinc-900 rounded-full font-mono text-xs lg:text-sm px-4 lg:px-6 py-5 lg:py-6 group w-full sm:w-auto">
                        VIEW PROJECT
                        <ArrowRight
                          className="ml-2 transition-transform group-hover:translate-x-1"
                          size={14}
                        />
                      </Button>
                      <Button
                        variant="outline"
                        className="border-2 border-zinc-200 hover:border-black hover:bg-white/80 text-black rounded-full font-mono text-xs lg:text-sm px-4 lg:px-6 py-5 lg:py-6 w-full sm:w-auto"
                      >
                        <Github className="mr-2" size={14} />
                        SOURCE
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernProjectGrid;
