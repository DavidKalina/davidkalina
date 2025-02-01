"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code2, Github, MonitorSmartphone } from "lucide-react";
import { useState } from "react";

const ModernFeaturedProject = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-8 py-32">
      {/* Minimal Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-6">
          <div className="bg-zinc-100 p-4 rounded-2xl">
            <Code2 size={24} className="text-black" />
          </div>
          <div>
            <p className="text-sm font-mono text-zinc-400 mb-1">001 / FEATURED</p>
            <h2 className="text-2xl font-mono font-bold">E-Commerce Platform</h2>
          </div>
        </div>
      </div>

      {/* Main Project Display */}
      <Card
        className="border-0 rounded-3xl overflow-hidden transition-all duration-300 bg-zinc-50 hover:shadow-[24px_24px_64px_rgba(0,0,0,0.06)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Project Visual */}
            <div className="relative bg-blue-500 p-16 min-h-[480px] flex items-center">
              <div
                className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.04),rgba(255,255,255,0))] transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="relative z-10 w-full">
                <div className="space-y-6">
                  <div className="inline-block border-2 border-white/20 rounded-2xl p-3">
                    <MonitorSmartphone size={32} className="text-white/80" />
                  </div>
                  <div>
                    <p className="text-white/60 font-mono text-sm tracking-wider mb-3">
                      NEXT.JS · TYPESCRIPT · STRIPE
                    </p>
                    <h3 className="text-4xl text-white font-mono font-bold leading-tight">
                      Modern solutions for
                      <br />
                      digital commerce
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-16 bg-white">
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <Badge className="bg-zinc-100 text-black px-4 py-2 rounded-full text-xs font-mono">
                      E-COMMERCE
                    </Badge>
                    <Badge className="bg-zinc-100 text-black px-4 py-2 rounded-full text-xs font-mono">
                      FULL-STACK
                    </Badge>
                  </div>
                  <p className="font-mono text-zinc-600 leading-relaxed">
                    A cutting-edge platform engineered for scale. Features real-time inventory
                    tracking, secure payments, and headless CMS integration—all optimized for
                    performance.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="font-mono text-4xl font-bold">98</p>
                    <p className="font-mono text-xs text-zinc-400">LIGHTHOUSE</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-mono text-4xl font-bold">5K+</p>
                    <p className="font-mono text-xs text-zinc-400">DAILY USERS</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-mono text-4xl font-bold">
                      99.9<span className="text-zinc-400">%</span>
                    </p>
                    <p className="font-mono text-xs text-zinc-400">UPTIME</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button className="bg-black text-white hover:bg-zinc-900 rounded-full font-mono text-sm px-8 py-6 group">
                    VIEW PROJECT
                    <ArrowRight
                      className="ml-2 transition-transform group-hover:translate-x-1"
                      size={18}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-zinc-200 hover:border-black hover:bg-white text-black rounded-full font-mono text-sm px-8 py-6 group"
                  >
                    <Github className="mr-2" size={18} />
                    SOURCE
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center mt-12 pt-12 border-t border-zinc-100">
        <Button variant="ghost" className="text-zinc-400 hover:text-black font-mono text-sm group">
          ← PREVIOUS PROJECT
        </Button>
        <Button variant="ghost" className="text-zinc-400 hover:text-black font-mono text-sm group">
          NEXT PROJECT →
        </Button>
      </div>
    </div>
  );
};

export default ModernFeaturedProject;
