"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Github, Terminal, Coffee, MessageSquare } from "lucide-react";
import Link from "next/link";
import { ABOUT_CONSTANTS } from "@/constants/about";

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
              {ABOUT_CONSTANTS.section.number} / ABOUT
            </p>
            <h2 className="text-2xl lg:text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-200">
              {ABOUT_CONSTANTS.section.title}
            </h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Main Bio */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <h3 className="font-mono text-lg lg:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {ABOUT_CONSTANTS.bio.heading}
              </h3>
              <div className="space-y-4">
                {ABOUT_CONSTANTS.bio.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-mono md:text-md lg:text-base text-zinc-700 dark:text-zinc-200 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Terminal size={18} className="text-zinc-400 dark:text-zinc-300 lg:hidden" />
                <Terminal size={20} className="text-zinc-400 dark:text-zinc-300 hidden lg:block" />
                <p className="font-mono md:text-md font-bold text-zinc-900 dark:text-zinc-200">
                  {ABOUT_CONSTANTS.stats.coreSkills.title}
                </p>
                <p className="font-mono md:text-sm lg:md:text-md text-zinc-600 dark:text-zinc-300 whitespace-pre-line">
                  {ABOUT_CONSTANTS.stats.coreSkills.content}
                </p>
              </div>
              <div className="space-y-2">
                <Coffee size={18} className="text-zinc-400 dark:text-zinc-500 lg:hidden" />
                <Coffee size={20} className="text-zinc-400 dark:text-zinc-500 hidden lg:block" />
                <p className="font-mono md:text-md font-bold text-zinc-900 dark:text-zinc-200">
                  {ABOUT_CONSTANTS.stats.interests.title}
                </p>
                <p className="font-mono md:text-sm lg:md:text-md text-zinc-600 dark:text-zinc-200 whitespace-pre-line">
                  {ABOUT_CONSTANTS.stats.interests.content}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-6">
              <Link href="/#contact">
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
                  {ABOUT_CONSTANTS.cta.contact}
                  <MessageSquare
                    className="ml-2 transition-transform group-hover:translate-x-1"
                    size={18}
                  />
                </Button>
              </Link>
              <Link href="https://github.com/DavidKalina" target="_blank">
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900
                    text-black dark:text-white rounded-full font-mono font-bold md:text-md 2xl:text-lg 
                    px-6 lg:px-8 py-6 w-full sm:w-auto
                    border-2 border-zinc-200 dark:border-zinc-700
                    transition-all duration-300 
                    hover:border-black dark:hover:border-white
                    hover:from-zinc-50 hover:to-white dark:hover:from-zinc-700 dark:hover:to-zinc-800
                    hover:shadow-md hover:-translate-y-0.5"
                >
                  <Github className="mr-2" size={18} />
                  {ABOUT_CONSTANTS.cta.github}
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
                <p className="font-mono md:text-sm lg:md:text-md text-white/90">
                  {ABOUT_CONSTANTS.featuredWork.title}
                </p>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <Badge className="bg-gradient-to-r from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 text-white px-3 lg:px-4 py-2 rounded-full text-[10px] lg:md:text-sm font-mono w-fit">
                      {ABOUT_CONSTANTS.featuredWork.project.name}
                    </Badge>
                    <span className="font-mono md:text-sm lg:md:text-md text-white/90">
                      {ABOUT_CONSTANTS.featuredWork.project.year}
                    </span>
                  </div>
                  <p className="font-mono md:text-md lg:text-base text-white/80">
                    {ABOUT_CONSTANTS.featuredWork.project.description}
                  </p>
                </div>
              </div>

              {/* Current Focus */}
              <div className="space-y-4">
                <p className="font-mono md:text-sm lg:md:text-md text-white/90">
                  {ABOUT_CONSTANTS.currentFocus.title}
                </p>
                <div className="grid grid-cols-1 gap-3 lg:gap-4">
                  {ABOUT_CONSTANTS.currentFocus.items.map((focus, index) => (
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
