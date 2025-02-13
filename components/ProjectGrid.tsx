import { ArrowRight, Bell, Brain, Github, Globe, Layout, Mail, Star, Wrench } from "lucide-react";
import Link from "next/link";
import { ExcalidrawBadge } from "./ExcalidrawBadge";
import { ExcalidrawButton } from "./ExcalidrawButton";
import { ExcalidrawCard } from "./ExcalidrawCard";
import { ExcalidrawIconWrapper } from "./ExcalidrawIconWrapper";

const ModernProjectGrid = () => {
  const projects = [
    {
      id: 1,
      title: "WebMine",
      description: "Real-time analytics dashboard for tracking sales, inventory, and customer data",
      tags: ["REACT", "NODE.JS", "TYPESCRIPT", "STRIPE"],
      icon: Layout,
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
      icon: Bell,
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
      icon: Brain,
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
      icon: Star,
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
      icon: Globe,
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
      icon: Mail,
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
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-6 mb-8">
            <ExcalidrawIconWrapper icon={Wrench} className="bg-[#ffd43b]" />
            <div>
              <p className="text-sm font-sketch text-zinc-500 mb-1">004 / WORK</p>
              <h2 className="text-3xl font-sketch font-bold text-zinc-900">Recent Projects</h2>
            </div>
          </div>
          <p className="font-sketch text-base text-zinc-600 leading-relaxed">
            A selection of recent projects showcasing my expertise in full-stack development, from
            interactive user interfaces to robust backend systems.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ExcalidrawCard
              key={project.id}
              className={`${project.bgColor} group h-full flex flex-col`}
            >
              {/* Project Header */}
              <div className="relative p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.04),rgba(255,255,255,0))] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <ExcalidrawIconWrapper
                      icon={project.icon}
                      className="bg-black"
                      iconClassName="text-white"
                    />
                    <ExcalidrawBadge>{project.year}</ExcalidrawBadge>
                  </div>
                  <h3 className="font-sketch text-xl font-bold text-white mb-3 min-h-[56px] flex items-center">
                    {project.title}
                  </h3>
                  <p className="font-sketch text-sm text-white/70 leading-relaxed min-h-[80px]">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Project Details - Refined styling */}
              <ExcalidrawCard
                className="p-8 bg-zinc-50/90 mt-auto relative overflow-hidden"
                hidePattern={false}
              >
                {/* Subtle texture overlay */}
                <div className="absolute inset-0 bg-[length:4px_4px] bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.015)_0px,transparent_1px,transparent_2px,rgba(0,0,0,0.015)_3px)] opacity-50" />

                <div className="space-y-8 relative z-10">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 min-h-[32px]">
                    {project.tags.map((tag) => (
                      <ExcalidrawBadge
                        key={tag}
                        className="bg-white/80 text-zinc-700 text-xs border border-zinc-200"
                      >
                        {tag}
                      </ExcalidrawBadge>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-6 min-h-[80px]">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <p className="font-sketch text-2xl font-bold text-zinc-800 leading-none">
                          {value}
                        </p>
                        <p className="font-sketch text-xs text-zinc-500 uppercase leading-tight">
                          {key}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    {project.href && (
                      <Link target="_blank" href={project.href} className="sm:flex-1">
                        <ExcalidrawButton variant="solid">
                          VIEW PROJECT
                          <ArrowRight
                            className="ml-2 transition-transform group-hover:translate-x-1"
                            size={16}
                          />
                        </ExcalidrawButton>
                      </Link>
                    )}
                    {project.source && (
                      <Link target="_blank" href={project.source} className="sm:flex-1">
                        <ExcalidrawButton variant="solid">
                          <Github className="mr-2" size={16} />
                          SOURCE
                        </ExcalidrawButton>
                      </Link>
                    )}
                  </div>
                </div>
              </ExcalidrawCard>
            </ExcalidrawCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernProjectGrid;
