"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, ArrowRight, Github, Terminal, Coffee } from "lucide-react";

const ModernAbout = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-8 py-32">
        {/* Section Header */}
        <div className="flex items-center gap-6 mb-16">
          <div className="bg-rose-500 p-4 rounded-2xl">
            <User size={24} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-mono text-zinc-500 mb-1">003 / ABOUT</p>
            <h2 className="text-3xl font-mono font-bold text-zinc-900">About Me</h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Main Bio */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="font-mono text-xl font-bold text-zinc-900">
                Full-stack developer focused on building products that people love
              </h3>
              <div className="space-y-4">
                <p className="font-mono text-zinc-600 leading-relaxed">
                  With over 5 years of experience in web development, I specialize in creating
                  scalable applications that combine clean code with exceptional user experiences.
                </p>
                <p className="font-mono text-zinc-600 leading-relaxed">
                  My journey in tech started with a fascination for building things. Today, I
                  channel that same passion into crafting digital solutions that make a difference.
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Terminal size={20} className="text-zinc-400" />
                <p className="font-mono text-sm font-bold text-zinc-900">Background</p>
                <p className="font-mono text-sm text-zinc-600">
                  Computer Science, BSc
                  <br />
                  Full-stack Development
                </p>
              </div>
              <div className="space-y-2">
                <Coffee size={20} className="text-zinc-400" />
                <p className="font-mono text-sm font-bold text-zinc-900">Interests</p>
                <p className="font-mono text-sm text-zinc-600">
                  Open Source
                  <br />
                  UI/UX Design
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-4 pt-6">
              <Button className="bg-black text-white hover:bg-zinc-900 rounded-full font-mono text-sm px-8 py-6 group">
                VIEW RESUME
                <ArrowRight
                  className="ml-2 transition-transform group-hover:translate-x-1"
                  size={18}
                />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-zinc-200 hover:border-black hover:bg-white text-black rounded-full font-mono text-sm px-8 py-6"
              >
                <Github className="mr-2" size={18} />
                GITHUB
              </Button>
            </div>
          </div>

          {/* Right Column - Visual Section */}
          <div
            className="relative bg-rose-500 rounded-3xl p-12"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.04),rgba(255,255,255,0))] transition-opacity duration-500 rounded-3xl ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Content */}
            <div className="relative z-10 space-y-12">
              {/* Featured Work */}
              <div className="space-y-4">
                <p className="font-mono text-sm text-white/60">FEATURED WORK</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge className="bg-white/10 text-white px-4 py-2 rounded-full text-xs font-mono">
                      ACME INC
                    </Badge>
                    <span className="font-mono text-sm text-white/60">2023</span>
                  </div>
                  <p className="font-mono text-white/80">
                    Led development of e-commerce platform serving 100k+ monthly users
                  </p>
                </div>
              </div>

              {/* Current Focus */}
              <div className="space-y-4">
                <p className="font-mono text-sm text-white/60">CURRENT FOCUS</p>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/5 rounded-2xl p-6">
                    <p className="font-mono text-white">Building scalable React applications</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6">
                    <p className="font-mono text-white">Contributing to open source</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6">
                    <p className="font-mono text-white">Exploring new technologies</p>
                  </div>
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
