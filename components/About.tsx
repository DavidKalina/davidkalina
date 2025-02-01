"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, ArrowRight, Github, Terminal, Coffee } from "lucide-react";

const ModernAbout = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="bg-white/80/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
        {/* Section Header */}
        <div className="flex items-center gap-4 lg:gap-6 mb-8 lg:mb-16">
          <div className="bg-rose-500 p-3 lg:p-4 rounded-xl lg:rounded-2xl">
            <User size={20} className="text-white lg:hidden" />
            <User size={24} className="text-white hidden lg:block" />
          </div>
          <div>
            <p className="md:text-sm lg:md:text-md font-mono text-zinc-500 mb-1">003 / ABOUT</p>
            <h2 className="text-2xl lg:text-3xl font-mono font-bold text-zinc-900">About Me</h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Main Bio */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <h3 className="font-mono text-lg lg:text-xl font-bold text-zinc-900">
                Full-stack developer focused on building products that people love
              </h3>
              <div className="space-y-4">
                <p className="font-mono md:text-md lg:text-base text-zinc-600 leading-relaxed">
                  With over 5 years of experience in web development, I specialize in creating
                  scalable applications that combine clean code with exceptional user experiences.
                </p>
                <p className="font-mono md:text-md lg:text-base text-zinc-600 leading-relaxed">
                  My journey in tech started with a fascination for building things. Today, I
                  channel that same passion into crafting digital solutions that make a difference.
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Terminal size={18} className="text-zinc-400 lg:hidden" />
                <Terminal size={20} className="text-zinc-400 hidden lg:block" />
                <p className="font-mono md:text-md font-bold text-zinc-900">Background</p>
                <p className="font-mono md:text-sm lg:md:text-md text-zinc-600">
                  Computer Science, BSc
                  <br />
                  Full-stack Development
                </p>
              </div>
              <div className="space-y-2">
                <Coffee size={18} className="text-zinc-400 lg:hidden" />
                <Coffee size={20} className="text-zinc-400 hidden lg:block" />
                <p className="font-mono md:text-md font-bold text-zinc-900">Interests</p>
                <p className="font-mono md:text-sm lg:md:text-md text-zinc-600">
                  Open Source
                  <br />
                  UI/UX Design
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-6">
              <Button className="bg-black text-white hover:bg-zinc-900 rounded-full font-mono md:text-md px-6 lg:px-8 py-6 group w-full sm:w-auto">
                VIEW RESUME
                <ArrowRight
                  className="ml-2 transition-transform group-hover:translate-x-1"
                  size={18}
                />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-zinc-200 hover:border-black hover:bg-white/80 text-black rounded-full font-mono md:text-md px-6 lg:px-8 py-6 w-full sm:w-auto"
              >
                <Github className="mr-2" size={18} />
                GITHUB
              </Button>
            </div>
          </div>

          {/* Right Column - Visual Section */}
          <div
            className="relative bg-rose-500 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.04),rgba(255,255,255,0))] transition-opacity duration-500 rounded-2xl lg:rounded-3xl ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Content */}
            <div className="relative z-10 space-y-8 lg:space-y-12">
              {/* Featured Work */}
              <div className="space-y-4">
                <p className="font-mono md:text-sm lg:md:text-md text-white/60">FEATURED WORK</p>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <Badge className="bg-white/80/10 text-white px-3 lg:px-4 py-2 rounded-full text-[10px] lg:md:text-sm font-mono w-fit">
                      ACME INC
                    </Badge>
                    <span className="font-mono md:text-sm lg:md:text-md text-white/60">2023</span>
                  </div>
                  <p className="font-mono md:text-md lg:text-base text-white/80">
                    Led development of e-commerce platform serving 100k+ monthly users
                  </p>
                </div>
              </div>

              {/* Current Focus */}
              <div className="space-y-4">
                <p className="font-mono md:text-sm lg:md:text-md text-white/60">CURRENT FOCUS</p>
                <div className="grid grid-cols-1 gap-3 lg:gap-4">
                  {[
                    "Building scalable React applications",
                    "Contributing to open source",
                    "Exploring new technologies",
                  ].map((focus, index) => (
                    <div key={index} className="bg-white/80/5 rounded-xl lg:rounded-2xl p-4 lg:p-6">
                      <p className="font-mono md:text-md lg:text-base text-white">{focus}</p>
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
