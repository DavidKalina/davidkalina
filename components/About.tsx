"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, ArrowRight, Github, Terminal, Coffee } from "lucide-react";
import Link from "next/link";

const ModernAbout = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="bg-gradient-to-b from-white/80 to-zinc-50/80 dark:from-zinc-800/95 dark:to-zinc-900/95"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
        {/* Section Header */}
        <div className="flex items-center gap-4 lg:gap-6 mb-8 lg:mb-16">
          <div className="bg-gradient-to-br from-rose-500 to-rose-600 dark:from-rose-600 dark:to-rose-700 p-3 lg:p-4 rounded-xl lg:rounded-2xl">
            <User size={20} className="text-white lg:hidden" />
            <User size={24} className="text-white hidden lg:block" />
          </div>
          <div>
            <p className="md:text-sm lg:md:text-md font-mono text-zinc-500 dark:text-zinc-400 mb-1">
              002 / ABOUT
            </p>
            <h2 className="text-2xl lg:text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-200">
              About Me
            </h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Main Bio */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <h3 className="font-mono text-lg lg:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Full-stack developer crafting thoughtful solutions that put people first
              </h3>
              <div className="space-y-4">
                <p className="font-mono md:text-md lg:text-base text-zinc-700 dark:text-zinc-200 leading-relaxed">
                  I believe in building technology that enhances rather than replaces human
                  capabilities. With over four years of experience, I focus on creating applications
                  that are both powerful and intuitive.
                </p>
                <p className="font-mono md:text-md lg:text-base text-zinc-700 dark:text-zinc-200 leading-relaxed">
                  My approach combines technical expertise with a deep appreciation for human needs
                  and experiences. I enjoy mentoring others and building tools that make a real
                  difference in people&apos;s daily lives.
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Terminal size={18} className="text-zinc-400 dark:text-zinc-300 lg:hidden" />
                <Terminal size={20} className="text-zinc-400 dark:text-zinc-300 hidden lg:block" />
                <p className="font-mono md:text-md font-bold text-zinc-900 dark:text-zinc-200">
                  Core Skills
                </p>
                <p className="font-mono md:text-sm lg:md:text-md text-zinc-600 dark:text-zinc-300">
                  React, Next.js, TypeScript
                  <br />
                  Node.js, SQL, Supabase
                </p>
              </div>
              <div className="space-y-2">
                <Coffee size={18} className="text-zinc-400 dark:text-zinc-500 lg:hidden" />
                <Coffee size={20} className="text-zinc-400 dark:text-zinc-500 hidden lg:block" />
                <p className="font-mono md:text-md font-bold text-zinc-900 dark:text-zinc-200">
                  Interests
                </p>
                <p className="font-mono md:text-sm lg:md:text-md text-zinc-600 dark:text-zinc-200">
                  Human-Centered Design
                  <br />
                  Tool Creation
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-6">
              <Link href="/resume" target="_blank">
                <Button
                  className="bg-gradient-to-r from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800
                    text-white rounded-full font-mono font-bold md:text-md 2xl:text-lg px-8 py-6 group 
                    disabled:opacity-50 transition-all duration-300 
                    hover:from-[#444] hover:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-500
                    hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                >
                  VIEW RESUME
                  <ArrowRight
                    className="ml-2 transition-transform group-hover:translate-x-1"
                    size={18}
                  />
                </Button>
              </Link>
              <Link href="https://github.com/DavidKalina" target="_blank">
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-700
                    text-black dark:text-white rounded-full font-mono font-bold md:text-md 2xl:text-lg 
                    px-6 lg:px-8 py-6 w-full sm:w-auto transition-all duration-300
                    hover:from-zinc-200 hover:to-zinc-100 dark:hover:from-zinc-700 dark:hover:to-zinc-600
                    border-0 shadow-sm hover:shadow-md"
                >
                  <Github className="mr-2" size={18} />
                  GITHUB
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Visual Section */}
          <div
            className="relative bg-gradient-to-br from-rose-500 to-rose-600 dark:from-rose-600 dark:to-rose-700 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 transform hover:scale-[1.02] transition-all duration-500 ease-out"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.08),rgba(255,255,255,0))] transition-opacity duration-500 rounded-2xl lg:rounded-3xl ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
            {/* Content */}
            <div className="relative z-10 space-y-8 lg:space-y-12">
              {/* Featured Work */}
              <div className="space-y-4">
                <p className="font-mono md:text-sm lg:md:text-md text-white/90">FEATURED WORK</p>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <Badge className="bg-gradient-to-r from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 text-white px-3 lg:px-4 py-2 rounded-full text-[10px] lg:md:text-sm font-mono w-fit">
                      ALFAPHOX/REVIVE
                    </Badge>
                    <span className="font-mono md:text-sm lg:md:text-md text-white/90">2024</span>
                  </div>
                  <p className="font-mono md:text-md lg:text-base text-white/80">
                    Designed and launched a white-label review management tool, contributing to a
                    $400k+ product sale
                  </p>
                </div>
              </div>

              {/* Current Focus */}
              <div className="space-y-4">
                <p className="font-mono md:text-sm lg:md:text-md text-white/90">CURRENT FOCUS</p>
                <div className="grid grid-cols-1 gap-3 lg:gap-4">
                  {[
                    "Building tools that amplify human capabilities",
                    "Creating intuitive, accessible interfaces",
                    "Fostering collaborative development environments",
                  ].map((focus, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-125"
                    >
                      <p className="font-mono md:text-md text-white">{focus}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernAbout;
