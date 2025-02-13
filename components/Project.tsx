"use client";

import { ArrowRight, Github, Network, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ExcalidrawBadge } from "./ExcalidrawBadge";
import { ExcalidrawButton } from "./ExcalidrawButton";
import { ExcalidrawCard } from "./ExcalidrawCard";
import { ExcalidrawIconWrapper } from "./ExcalidrawIconWrapper";
import ExcalidrawSectionHeader from "./ExcalidrawSectionHeader";

const ModernFeaturedProject = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="bg-zinc-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
        {/* Section Header */}
        <ExcalidrawSectionHeader
          icon={Star}
          title="WebMine | Distributed Web Scraping"
          subtitle="003 / FEATURED"
          className="mb-12"
        />

        {/* Main Project Display */}
        <ExcalidrawCard
          className="h-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Project Visual */}
            <ExcalidrawCard className="bg-blue-500 p-8 lg:p-16 min-h-[320px] lg:min-h-[480px] flex items-center">
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.04),rgba(255,255,255,0))] transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="relative z-10 w-full space-y-6">
                <ExcalidrawIconWrapper
                  icon={Network}
                  className="bg-black"
                  iconClassName="text-white"
                  iconSize={32}
                />
                <div>
                  <p className="text-white/80 font-sketch text-sm tracking-wider mb-3">
                    NEXT.JS · TYPESCRIPT · DOCKER · REDIS
                  </p>
                  <h3 className="text-3xl lg:text-4xl text-white font-sketch font-bold leading-tight">
                    Distributed web scraping
                    <br />
                    powerful & simple
                  </h3>
                </div>
              </div>
            </ExcalidrawCard>

            {/* Project Details */}
            <ExcalidrawCard className="p-8 lg:p-16 bg-white/80">
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    {["MICROSERVICES", "DISTRIBUTED", "FULL-STACK"].map((tag) => (
                      <ExcalidrawBadge key={tag} className="bg-black text-white">
                        {tag}
                      </ExcalidrawBadge>
                    ))}
                  </div>
                  <p className="font-sketch text-base text-zinc-600 leading-relaxed">
                    A scalable web scraping platform built with Docker and Redis. Features
                    distributed task processing, real-time progress tracking, and a modern Next.js
                    frontend for searching and managing scraped data.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {[
                    { value: "98", label: "LIGHTHOUSE" },
                    { value: "5K+", label: "DAILY USERS" },
                    { value: "99.9%", label: "UPTIME" },
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-2">
                      <p className="font-sketch text-3xl lg:text-4xl font-bold text-zinc-900">
                        {stat.value}
                      </p>
                      <p className="font-sketch text-xs text-zinc-500">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link href="https://webmine.davidkalina.com" target="_blank">
                    <ExcalidrawButton className="w-full sm:w-auto">
                      VIEW PROJECT
                      <ArrowRight
                        className="ml-2 transition-transform group-hover:translate-x-1"
                        size={18}
                      />
                    </ExcalidrawButton>
                  </Link>
                  <Link href="https://github.com/DavidKalina/crawler-server">
                    <ExcalidrawButton variant="blue" className="w-full sm:w-auto">
                      <Github className="mr-2" size={18} />
                      SOURCE
                    </ExcalidrawButton>
                  </Link>
                </div>
              </div>
            </ExcalidrawCard>
          </div>
        </ExcalidrawCard>
      </div>
    </section>
  );
};

export default ModernFeaturedProject;
