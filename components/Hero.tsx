"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AnimatedPieChart from "./AnimatedPieChart";
import WaveText from "./WaveText";

const ModernHero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-12 lg:py-24">
          {/* Content Section */}
          <div className="space-y-6 lg:space-y-8 pt-10 lg:pt-12">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 bg-zinc-100 px-3 sm:px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs">AVAILABLE FOR PROJECTS</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="font-mono font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                Bridging Innovation
                <br />
                with Scalable
                <br />
                <span className="inline-flex items-center gap-2 sm:gap-4">
                  Web Solutions
                  <Code2 size={32} className="text-zinc-400 sm:hidden" />
                  <Code2 size={48} className="text-zinc-400 hidden sm:block" />
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="font-mono text-md sm:text-lg text-zinc-600 leading-relaxed max-w-xl">
              Full-stack developer specializing in developing real-time systems, scalable web
              applications, intuitive and creative UI/UX experiences, and utilizing the power of AI
              while retaining the spark of <WaveText text="human divinity" />. Passionate about
              merging user-centric design with cutting-edge technology to create impactful digital
              experiences.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              {["TYPESCRIPT", "REACT", "NODE.JS"].map((tech) => (
                <Badge
                  key={tech}
                  className="bg-zinc-100 hover:text-white text-black px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-xs font-mono"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="#projects">
                <Button className="bg-[#333] text-white hover:bg-[#333] rounded-full font-mono text-sm px-6 sm:px-8 py-6 group w-full sm:w-auto">
                  VIEW PROJECTS
                  <ArrowRight
                    className="ml-2 transition-transform group-hover:translate-x-1"
                    size={18}
                  />
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="border-2 border-zinc-200 hover:border-black hover:bg-white/80 text-black rounded-full font-mono text-sm px-6 sm:px-8 py-6 w-full sm:w-auto"
                >
                  CONTACT ME
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Section */}
          <div
            className="relative rounded-3xl p-6 sm:p-8 lg:p-12 min-h-[400px] lg:min-h-[600px] flex flex-col items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.04),rgba(255,255,255,0))] transition-opacity duration-500 rounded-3xl ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
            {/* Animated Pie Chart and Title */}
            <div className="relative z-10">
              <AnimatedPieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHero;
