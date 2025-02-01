"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code2 } from "lucide-react";

const ModernHero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-24">
          {/* Content Section */}
          <div className="space-y-8 pt-12">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 bg-zinc-100 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-xs">AVAILABLE FOR PROJECTS</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="font-mono font-bold text-5xl lg:text-6xl leading-tight">
                Building digital
                <br />
                experiences with
                <br />
                <span className="inline-flex items-center gap-4">
                  precision
                  <Code2 size={48} className="text-zinc-400" />
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="font-mono text-lg text-zinc-600 leading-relaxed max-w-xl">
              Full-stack developer specializing in crafting modern web applications with a focus on
              performance and user experience.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-zinc-100 text-black px-4 py-2 rounded-full text-xs font-mono">
                TYPESCRIPT
              </Badge>
              <Badge className="bg-zinc-100 text-black px-4 py-2 rounded-full text-xs font-mono">
                REACT
              </Badge>
              <Badge className="bg-zinc-100 text-black px-4 py-2 rounded-full text-xs font-mono">
                NODE.JS
              </Badge>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-6">
              <Button className="bg-black text-white hover:bg-zinc-900 rounded-full font-mono text-sm px-8 py-6 group">
                VIEW PROJECTS
                <ArrowRight
                  className="ml-2 transition-transform group-hover:translate-x-1"
                  size={18}
                />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-zinc-200 hover:border-black hover:bg-white text-black rounded-full font-mono text-sm px-8 py-6"
              >
                CONTACT ME
              </Button>
            </div>
          </div>

          {/* Visual Section */}
          <div
            className="relative bg-indigo-500 rounded-3xl p-12 min-h-[600px] flex items-center"
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
            <div className="relative z-10 w-full grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="font-mono text-6xl font-bold text-white">5+</p>
                <p className="font-mono text-xs text-white/60">YEARS OF EXPERIENCE</p>
              </div>
              <div className="space-y-2">
                <p className="font-mono text-6xl font-bold text-white">50+</p>
                <p className="font-mono text-xs text-white/60">PROJECTS COMPLETED</p>
              </div>
              <div className="space-y-2">
                <p className="font-mono text-6xl font-bold text-white">
                  98<span className="text-white/40">%</span>
                </p>
                <p className="font-mono text-xs text-white/60">CLIENT SATISFACTION</p>
              </div>
              <div className="space-y-2">
                <p className="font-mono text-6xl font-bold text-white">12K</p>
                <p className="font-mono text-xs text-white/60">GITHUB COMMITS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHero;
