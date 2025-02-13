"use client";

import { Coffee, Terminal, User } from "lucide-react";
import { ExcalidrawCard } from "./ExcalidrawCard";
import ExcalidrawFeatureCard from "./ExcalidrawFeatureCard";
import ExcalidrawFeaturedWork from "./ExcalidrawFeaturedWork";
import ExcalidrawSectionHeader from "./ExcalidrawSectionHeader";
import ExcalidrawStatCard from "./ExcalidrawStatCard";

const ModernAbout = () => {
  return (
    <section className="bg-white/80" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
        {/* Section Header */}
        <ExcalidrawSectionHeader
          icon={User}
          title="About Me"
          subtitle="002 / ABOUT"
          iconBgColor="bg-rose-500"
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <h3 className="text-lg lg:text-xl font-bold text-zinc-900">
                Full-stack developer crafting thoughtful solutions that put people first
              </h3>
              <div className="space-y-4">
                <p className="md:text-md lg:text-base text-zinc-600 leading-relaxed">
                  I believe in building technology that enhances rather than replaces human
                  capabilities. With over four years of experience, I focus on creating applications
                  that are both powerful and intuitive.
                </p>
                <p className="md:text-md lg:text-base text-zinc-600 leading-relaxed">
                  My approach combines technical expertise with a deep appreciation for human needs
                  and experiences. I enjoy mentoring others and building tools that make a real
                  difference in people&apos;s daily lives.
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ExcalidrawStatCard icon={Terminal} title="Core Skills">
                React, Next.js, TypeScript
                <br />
                Node.js, SQL, Supabase
              </ExcalidrawStatCard>

              <ExcalidrawStatCard icon={Coffee} title="Interests">
                Human-Centered Design
                <br />
                Tool Creation
              </ExcalidrawStatCard>
            </div>

            {/* CTA buttons... */}
          </div>

          {/* Right Column */}
          <ExcalidrawCard className="bg-rose-500 p-8 lg:p-12">
            {/* Gradient overlay... */}

            <div className="relative z-10 space-y-12">
              <ExcalidrawFeaturedWork
                title="ALFAPHOX/REVIVE"
                year="2024"
                description="Designed and launched a white-label review management tool, contributing to a $400k+ product sale"
              />

              <div className="space-y-4">
                <p className="font-sketch text-sm text-white/90">CURRENT FOCUS</p>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "Building tools that amplify human capabilities",
                    "Creating intuitive, accessible interfaces",
                    "Fostering collaborative development environments",
                  ].map((focus, index) => (
                    <ExcalidrawFeatureCard key={index}>{focus}</ExcalidrawFeatureCard>
                  ))}
                </div>
              </div>
            </div>
          </ExcalidrawCard>
        </div>
      </div>
    </section>
  );
};

export default ModernAbout;
