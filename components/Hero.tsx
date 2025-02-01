"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code2 } from "lucide-react";

const ModernHero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-12 lg:py-24">
          {/* Content Section */}
          <div className="space-y-6 lg:space-y-8 pt-4 lg:pt-12">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 bg-zinc-100 px-3 sm:px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs">AVAILABLE FOR PROJECTS</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="font-mono font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                Building digital
                <br />
                experiences with
                <br />
                <span className="inline-flex items-center gap-2 sm:gap-4">
                  precision
                  <Code2 size={32} className="text-zinc-400 sm:hidden" />
                  <Code2 size={48} className="text-zinc-400 hidden sm:block" />
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="font-mono text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl">
              Full-stack developer specializing in crafting modern web applications with a focus on
              performance and user experience.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              {["TYPESCRIPT", "REACT", "NODE.JS"].map((tech) => (
                <Badge
                  key={tech}
                  className="bg-zinc-100 text-black px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-xs font-mono"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="bg-black text-white hover:bg-zinc-900 rounded-full font-mono text-sm px-6 sm:px-8 py-6 group w-full sm:w-auto">
                VIEW PROJECTS
                <ArrowRight
                  className="ml-2 transition-transform group-hover:translate-x-1"
                  size={18}
                />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-zinc-200 hover:border-black hover:bg-white/80 text-black rounded-full font-mono text-sm px-6 sm:px-8 py-6 w-full sm:w-auto"
              >
                CONTACT ME
              </Button>
            </div>
          </div>

          {/* Visual Section */}
          <div
            className="relative bg-indigo-500 rounded-3xl p-6 sm:p-8 lg:p-12 min-h-[400px] lg:min-h-[600px] flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.04),rgba(255,255,255,0))] transition-opacity duration-500 rounded-3xl ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Code Stats */}
            <div className="relative z-10 w-full grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {[
                { value: "5+", label: "YEARS OF EXPERIENCE" },
                { value: "50+", label: "PROJECTS COMPLETED" },
                { value: "98%", label: "CLIENT SATISFACTION" },
                { value: "12K", label: "GITHUB COMMITS" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1 sm:space-y-2">
                  <p className="font-mono text-3xl sm:text-4xl lg:text-6xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="font-mono text-[10px] sm:text-xs text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHero;
