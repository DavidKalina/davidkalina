import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Code2,
  Database,
  Github,
  Layers,
  Layout,
  MonitorSmartphone,
} from "lucide-react";

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
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-8 py-32">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-black p-4 rounded-2xl">
              <Code2 size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-mono text-zinc-500 mb-1">005 / WORK</p>
              <h2 className="text-3xl font-mono font-bold text-zinc-900">Recent Projects</h2>
            </div>
          </div>
          <p className="font-mono text-zinc-600 leading-relaxed mb-16">
            A selection of recent projects showcasing my expertise in full-stack development, from
            interactive user interfaces to robust backend systems.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="border-2 border-zinc-100 rounded-3xl overflow-hidden hover:border-black transition-colors duration-300 group"
            >
              <CardContent className="p-0">
                {/* Project Header */}
                <div className={`relative ${project.bgColor} p-8`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.04),rgba(255,255,255,0))] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="inline-block border-2 border-white/20 rounded-xl p-2">
                        {project.icon}
                      </div>
                      <Badge className="bg-white/10 text-white px-4 py-2 rounded-full text-xs font-mono">
                        {project.year}
                      </Badge>
                    </div>
                    <h3 className="font-mono text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="font-mono text-sm text-white/60 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-8 bg-white">
                  <div className="space-y-8">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-zinc-100 text-black px-4 py-2 rounded-full text-xs font-mono"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-6">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <p className="font-mono text-2xl font-bold text-zinc-900">{value}</p>
                          <p className="font-mono text-xs text-zinc-400 uppercase">{key}</p>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                      <Button className="bg-black text-white hover:bg-zinc-900 rounded-full font-mono text-sm px-6 group">
                        VIEW PROJECT
                        <ArrowRight
                          className="ml-2 transition-transform group-hover:translate-x-1"
                          size={16}
                        />
                      </Button>
                      <Button
                        variant="outline"
                        className="border-2 border-zinc-200 hover:border-black hover:bg-white text-black rounded-full font-mono text-sm px-6"
                      >
                        <Github className="mr-2" size={16} />
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
