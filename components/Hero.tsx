"use client";

import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AnimatedPieChart from "./AnimatedPieChart";
import { ExcalidrawBadge } from "./ExcalidrawBadge";
import { ExcalidrawButton } from "./ExcalidrawButton";

const ModernHero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-12 lg:py-24">
          {/* Content Section */}
          <div className="space-y-6 lg:space-y-8 pt-4 lg:pt-12">
            {/* Status Badge */}
            <ExcalidrawBadge variant="green">AVAILABLE FOR PROJECTS</ExcalidrawBadge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="font-sketch font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
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
            <p className="font-sketch text-md sm:text-lg text-zinc-600 leading-relaxed max-w-xl">
              Full-stack developer with real-time systems, scalable web applications, intuitive and
              creative UI/UX experiences, and utilizing the power of AI while retaining the spark of
              human divinity. Passionate about merging user-centric design with cutting-edge
              technology to create impactful digital experiences.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              {["TYPESCRIPT", "REACT", "NODE.JS"].map((tech) => (
                <ExcalidrawBadge key={tech}>{tech}</ExcalidrawBadge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="#projects">
                <ExcalidrawButton>
                  VIEW PROJECTS
                  <ArrowRight
                    className="ml-2 transition-transform group-hover:translate-x-1"
                    size={18}
                  />
                </ExcalidrawButton>
              </Link>
              <Link href="#contact">
                <ExcalidrawButton variant="blue">CONTACT ME</ExcalidrawButton>
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
