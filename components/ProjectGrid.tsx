import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bell, Brain, Github, Globe, Layout, Mail, Star, Wrench } from "lucide-react";
import Link from "next/link";
import React from "react";

const ModernProjectGrid = () => {
  const projects = [
    {
      id: 1,
      title: "WebMine",
      description: "Real-time analytics dashboard for tracking sales, inventory, and customer data",
      tags: ["REACT", "NODE.JS", "TYPESCRIPT", "STRIPE"],
      icon: <Layout size={24} className="text-white" />,
      bgColor: "bg-emerald-500",
      metrics: {
        technology: "Cutting Edge",
        architecture: "Modular",
        ui: "Modern",
      },
      year: "2023",
      href: `https://webmine.davidkalina.com`,
      source: null,
    },
    {
      id: 6,
      title: "Flowty.io Real-Time Notification Center",
      description:
        "Built with Firebase and TypeScript, significantly improving engagement and retention.",
      tags: ["FIREBASE", "TYPESCRIPT", "REACT"],
      icon: <Bell size={24} className="text-white" />,
      bgColor: "bg-orange-500",
      metrics: {
        notificationsSent: "1M+",
        retentionIncrease: "15%",
      },
      year: "2022",
      href: `https://flowty.io`,
      source: null,
    },
    {
      id: 2,
      title: "AI Content Optimization Tool",
      description:
        "AI-powered content categorization tool using OpenAI’s GPT-4, enhancing engagement workflows for Kent State University's OEOC.",
      tags: ["OPENAI", "NEXT.JS", "SUPABASE", "D3.JS"],
      icon: <Brain size={24} className="text-white" />,
      bgColor: "bg-blue-500",
      metrics: {
        contentAnalyzed: "100K+",
        accuracy: "95%",
        performance: "97",
      },
      year: "2024",
      source: null,
    },
    {
      id: 3,
      title: "Alfaphox/Revive Ratings",
      description:
        "A white-label review management tool that contributed to a product sale valued at over $400,000.",
      tags: ["REACT", "NODE.JS", "TYPESCRIPT", "FIREBASE"],
      icon: <Star size={24} className="text-white" />,
      bgColor: "bg-red-500",
      metrics: {
        users: "5K+",
        revenue: "$400K+",
        retention: "80%",
      },
      year: "2023",
      source: null,
    },
    {
      id: 4,
      title: "Progressive Web App for Maxwell Pipeline Services",
      description:
        "A PWA designed to streamline operations, achieving several thousand monthly uses.",
      tags: ["REACT", "PWA", "SUPABASE"],
      icon: <Globe size={24} className="text-white" />,
      bgColor: "bg-green-500",
      metrics: {
        monthlyUsers: "10K+",
        efficiencyBoost: "40%",
      },
      year: "2023",
      source: null,
    },
    {
      id: 5,
      title: "Automated Email Distribution System",
      description:
        "SendGrid API-based automation reducing email processing time from 4-5 hours to 20-30 minutes.",
      tags: ["PYTHON", "SENDGRID", "NODE.JS"],
      icon: <Mail size={24} className="text-white" />,
      bgColor: "bg-indigo-500",
      metrics: {
        emailsProcessed: "500K+",
        speedImprovement: "10x",
      },
      year: "2021",
      source: null,
    },
  ];

  return (
    <section className="bg-white/80" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-[#ffd43b] p-3 lg:p-4 rounded-xl lg:rounded-2xl">
              <Wrench size={20} className="text-white lg:hidden" />
              <Wrench size={24} className="text-white hidden lg:block" />
            </div>
            <div>
              <p className="text-xs lg:text-sm font-mono text-zinc-500 mb-1">004 / WORK</p>
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
                      <div className="inline-block bg-black rounded-lg lg:rounded-xl p-2">
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
                      {project.href && (
                        <Link target="_blank" href={project.href}>
                          <Button className="bg-black text-white hover:bg-zinc-900 rounded-full font-mono text-xs lg:text-sm px-4 lg:px-6 py-5 lg:py-6 group w-full sm:w-auto">
                            VIEW PROJECT
                            <ArrowRight
                              className="ml-2 transition-transform group-hover:translate-x-1"
                              size={14}
                            />
                          </Button>
                        </Link>
                      )}
                      {project.source && (
                        <Link target="_blank" href={project.source}>
                          <Button
                            variant="outline"
                            className="border-2 border-zinc-200 hover:border-black hover:bg-white/80 text-black rounded-full font-mono text-xs lg:text-sm px-4 lg:px-6 py-5 lg:py-6 w-full sm:w-auto"
                          >
                            <Github className="mr-2" size={14} />
                            SOURCE
                          </Button>
                        </Link>
                      )}
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
