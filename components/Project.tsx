"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Github, Network, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ModernFeaturedProject = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="bg-zinc-50/80 dark:bg-zinc-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
        {/* Minimal Header */}
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="bg-[#333] dark:bg-zinc-700 p-3 lg:p-4 rounded-2xl">
              <Star size={20} className="text-white lg:hidden" />
              <Star size={24} className="text-white hidden lg:block" />
            </div>
            <div>
              <p className="text-xs lg:text-sm font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                003 / FEATURED
              </p>
              <h2 className="text-2xl lg:text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-200">
                WebMine | Distributed Web Scraping
              </h2>
            </div>
          </div>
        </div>

        {/* Main Project Display */}
        <Card
          className="bg-white/80 dark:bg-zinc-800/80 shadow-lg dark:shadow-zinc-900/30 rounded-3xl overflow-hidden transition-all duration-300 
  hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.01] hover:-translate-y-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Project Visual */}
              <div className="relative bg-blue-600 dark:bg-blue-500 p-6 sm:p-8 lg:p-16 min-h-[320px] lg:min-h-[480px] flex items-center">
                <div
                  className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.08),rgba(255,255,255,0))] transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div className="relative z-10 w-full">
                  <div className="space-y-4 lg:space-y-6">
                    <div className="inline-block bg-[#333] dark:bg-zinc-700 rounded-xl lg:rounded-2xl p-2 lg:p-3">
                      <Network size={24} className="text-white lg:hidden" />
                      <Network size={32} className="text-white hidden lg:block" />
                    </div>
                    <div>
                      <p className="text-white/80 font-mono text-xs lg:text-sm tracking-wider mb-2 lg:mb-3">
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
              <div className="p-6 sm:p-8 lg:p-16 bg-white/80 dark:bg-zinc-800/80">
                <div className="space-y-8 lg:space-y-12">
                  <div className="space-y-4 lg:space-y-6">
                    <div className="flex flex-wrap gap-2 lg:gap-3">
                      <Badge className="bg-[#333] dark:bg-zinc-700 text-white px-3 lg:px-4 py-2 rounded-full text-[10px] lg:text-xs font-mono hover:bg-[#333] dark:hover:bg-zinc-600">
                        MICROSERVICES
                      </Badge>
                      <Badge className="bg-[#333] dark:bg-zinc-700 text-white px-3 lg:px-4 py-2 rounded-full text-[10px] lg:text-xs font-mono hover:bg-[#333] dark:hover:bg-zinc-600">
                        DISTRIBUTED
                      </Badge>
                      <Badge className="bg-[#333] dark:bg-zinc-700 text-white px-3 lg:px-4 py-2 rounded-full text-[10px] lg:text-xs font-mono hover:bg-[#333] dark:hover:bg-zinc-600">
                        FULL-STACK
                      </Badge>
                    </div>
                    <p className="font-mono text-sm lg:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
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
                        <p className="font-mono text-2xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-200">
                          {stat.value}
                        </p>
                        <p className="font-mono text-[10px] lg:text-xs text-zinc-500 dark:text-zinc-400">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-6">
                    <Link href="https://webmine.davidkalina.com" target="_blank">
                      <Button
                        className="bg-[#333] dark:bg-white text-white dark:text-black 
             hover:bg-zinc-900 dark:hover:bg-white rounded-full 
             font-mono font-bold md:text-md 2xl:text-lg px-8 py-6 group disabled:opacity-50 
             transition-all duration-300 
             hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                      >
                        VIEW PROJECT
                        <ArrowRight
                          className="ml-2 transition-transform group-hover:translate-x-1"
                          size={18}
                        />
                      </Button>
                    </Link>
                    <Link href="https://github.com/DavidKalina/crawler-server">
                      <Button
                        variant="outline"
                        className="border-2 border-zinc-200 dark:border-zinc-700 hover:border-black dark:hover:border-white hover:bg-white/80 dark:hover:bg-zinc-800/80 text-zinc-900 dark:text-white rounded-full font-mono font-bold md:text-md 2xl:text-lg px-6 lg:px-8 py-6 group w-full sm:w-auto"
                      >
                        <Github className="mr-2" size={18} />
                        SOURCE
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ModernFeaturedProject;
