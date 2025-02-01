"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code2, Github, Network } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ModernFeaturedProject = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
      {/* Minimal Header */}
      <div className="flex items-center justify-between mb-8 lg:mb-12">
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="bg-zinc-100 p-3 lg:p-4 rounded-2xl">
            <Code2 size={20} className="text-black lg:hidden" />
            <Code2 size={24} className="text-black hidden lg:block" />
          </div>
          <div>
            <p className="text-xs lg:text-sm font-mono text-zinc-400 mb-1">003 / FEATURED</p>
            <h2 className="text-xl lg:text-2xl font-mono font-bold">
              WebMine | Distributed Web Scraping
            </h2>
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
            <div className="relative bg-blue-500 p-6 sm:p-8 lg:p-16 min-h-[320px] lg:min-h-[480px] flex items-center">
              <div
                className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.04),rgba(255,255,255,0))] transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="relative z-10 w-full">
                <div className="space-y-4 lg:space-y-6">
                  <div className="inline-block border-2 border-white/20 rounded-xl lg:rounded-2xl p-2 lg:p-3">
                    <Network size={24} className="text-white/80 lg:hidden" />
                    <Network size={32} className="text-white/80 hidden lg:block" />
                  </div>
                  <div>
                    <p className="text-white/60 font-mono text-xs lg:text-sm tracking-wider mb-2 lg:mb-3">
                      NEXT.JS · TYPESCRIPT · DOCKER · REDIS
                    </p>
                    <h3 className="text-2xl lg:text-4xl text-white font-mono font-bold leading-tight">
                      Distributed web scraping
                      <br />
                      powerful & simple
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-6 sm:p-8 lg:p-16 bg-white/80">
              <div className="space-y-8 lg:space-y-12">
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    <Badge className="bg-zinc-100 hover:text-white text-black px-3 lg:px-4 py-2 rounded-full text-[10px] lg:text-xs font-mono">
                      MICROSERVICES
                    </Badge>
                    <Badge className="bg-zinc-100 hover:text-white text-black px-3 lg:px-4 py-2 rounded-full text-[10px] lg:text-xs font-mono">
                      DISTRIBUTED
                    </Badge>
                    <Badge className="bg-zinc-100 hover:text-white text-black px-3 lg:px-4 py-2 rounded-full text-[10px] lg:text-xs font-mono">
                      FULL-STACK
                    </Badge>
                  </div>
                  <p className="font-mono text-sm lg:text-base text-zinc-600 leading-relaxed">
                    A scalable web scraping platform built with Docker and Redis. Features
                    distributed task processing, real-time progress tracking, and a modern Next.js
                    frontend for searching and managing scraped data.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 lg:gap-6">
                  {[
                    { value: "98", label: "LIGHTHOUSE" },
                    { value: "5K+", label: "DAILY USERS" },
                    { value: "99.9%", label: "UPTIME" },
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-1 lg:space-y-2">
                      <p className="font-mono text-2xl lg:text-4xl font-bold">{stat.value}</p>
                      <p className="font-mono text-[10px] lg:text-xs text-zinc-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-6">
                  <Link href="https://webmine.davidkalina.com" target="_blank">
                    <Button className="bg-black text-white hover:bg-zinc-900 rounded-full font-mono text-sm px-6 lg:px-8 py-6 group w-full sm:w-auto">
                      VIEW PROJECT
                      <ArrowRight
                        className="ml-2 transition-transform group-hover:translate-x-1"
                        size={18}
                      />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-2 border-zinc-200 hover:border-black hover:bg-white/80 text-black rounded-full font-mono text-sm px-6 lg:px-8 py-6 group w-full sm:w-auto"
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
      Bottom Navigation
      <div className="flex justify-between items-center mt-8 lg:mt-12 pt-8 lg:pt-12 border-t border-zinc-100">
        <Button
          variant="ghost"
          className="text-zinc-400 hover:text-black font-mono text-xs lg:text-sm group"
        >
          ← PREV
        </Button>
        <Button
          variant="ghost"
          className="text-zinc-400 hover:text-black font-mono text-xs lg:text-sm group"
        >
          NEXT →
        </Button>
      </div>
    </div>
  );
};

export default ModernFeaturedProject;
