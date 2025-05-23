import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Github, Layout, Bell, Brain, Star, Globe, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Project } from "@/constants/projectGrid";

// Helper function to map icon names to components
const getIconComponent = (iconName: string, size: number = 24): React.ReactElement => {
  const iconMap: { [key: string]: React.ReactElement } = {
    Layout: <Layout size={size} className="text-white" />,
    Bell: <Bell size={size} className="text-white" />,
    Brain: <Brain size={size} className="text-white" />,
    Star: <Star size={size} className="text-white" />,
    Globe: <Globe size={size} className="text-white" />,
    Mail: <Mail size={size} className="text-white" />,
  };
  return iconMap[iconName] || <Layout size={size} className="text-white" />;
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card
      className="relative border-2 border-zinc-100 dark:border-zinc-700/50 
        rounded-2xl lg:rounded-3xl overflow-hidden bg-white dark:bg-zinc-800
        hover:border-transparent dark:hover:border-transparent
        transition-all duration-300 group shadow-md
        hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50
        hover:-translate-y-1 hover:scale-[1.01]"
    >
      <CardContent className="p-0 h-full relative z-10">
        {/* Project Header */}
        <div
          className="p-6 lg:p-8 h-[180px] lg:h-[220px] relative"
          style={{
            background:
              project.bgColor === "bg-gradient-to-br from-[#10B981] to-[#059669]"
                ? "linear-gradient(to bottom right, #10B981, #059669)"
                : project.bgColor === "bg-gradient-to-br from-[#F59E0B] to-[#D97706]"
                ? "linear-gradient(to bottom right, #F59E0B, #D97706)"
                : project.bgColor === "bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED]"
                ? "linear-gradient(to bottom right, #8B5CF6, #7C3AED)"
                : project.bgColor === "bg-gradient-to-br from-[#EC4899] to-[#DB2777]"
                ? "linear-gradient(to bottom right, #EC4899, #DB2777)"
                : project.bgColor === "bg-gradient-to-br from-[#14B8A6] to-[#0D9488]"
                ? "linear-gradient(to bottom right, #14B8A6, #0D9488)"
                : "linear-gradient(to bottom right, #0EA5E9, #0284C7)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.12),rgba(255,255,255,0))]" />
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <div className="inline-block bg-gradient-to-br from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 rounded-lg lg:rounded-xl p-2">
                <div className="lg:hidden">{getIconComponent(project.icon, 20)}</div>
                <div className="hidden lg:block">{getIconComponent(project.icon)}</div>
              </div>
              <Badge className="bg-gradient-to-r from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs font-mono">
                {project.year}
              </Badge>
            </div>
            <h3 className="font-mono text-lg lg:text-xl font-bold text-white mb-2 line-clamp-2">
              {project.title}
            </h3>
            <p className="font-mono text-xs lg:text-sm text-white/60 leading-relaxed line-clamp-3 flex-grow">
              {project.description}
            </p>
          </div>
        </div>

        {/* Project Details */}
        <div className="p-6 lg:p-8 bg-white dark:bg-zinc-800 h-full">
          <div className="space-y-6 lg:space-y-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-700 dark:to-zinc-600 
                    text-black dark:text-white hover:text-white dark:hover:text-white 
                    px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs font-mono
                    hover:from-[#333] hover:to-zinc-700 dark:hover:from-zinc-600 dark:hover:to-zinc-500
                    transition-all duration-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 lg:gap-6">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <p className="font-mono text-lg lg:text-2xl font-bold text-zinc-900 dark:text-zinc-200">
                    {value}
                  </p>
                  <p className="font-mono text-[10px] lg:text-xs text-zinc-400 dark:text-zinc-500 uppercase">
                    {key}
                  </p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              {project.href && (
                <Link target="_blank" href={project.href}>
                  <Button
                    className="bg-gradient-to-r from-[#333] via-zinc-800 to-[#333] dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700
                      text-white rounded-full font-mono font-bold md:text-md 2xl:text-lg px-8 py-6 group 
                      border-2 border-zinc-800 dark:border-zinc-600
                      transition-all duration-300 
                      hover:border-white dark:hover:border-zinc-400
                      hover:from-[#444] hover:via-zinc-700 hover:to-[#444] 
                      dark:hover:from-zinc-600 dark:hover:via-zinc-700 dark:hover:to-zinc-600
                      hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.9)]
                      hover:-translate-y-0.5 disabled:opacity-50"
                  >
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
                    className="bg-gradient-to-r from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900
                      text-black dark:text-white rounded-full font-mono text-xs lg:text-sm 
                      px-4 lg:px-6 py-5 lg:py-6 w-full sm:w-auto
                      border-2 border-zinc-200 dark:border-zinc-700
                      transition-all duration-300 
                      hover:border-black dark:hover:border-white
                      hover:from-zinc-50 hover:to-white dark:hover:from-zinc-700 dark:hover:to-zinc-800
                      hover:shadow-md hover:-translate-y-0.5"
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
  );
};

export default ProjectCard;
