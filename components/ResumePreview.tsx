"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const ModernResume = () => {
  const skills = {
    frontend: ["React", "React Native", "Next.js", "TypeScript", "CSS", "HTML"],
    backend: ["Node.js", "API Integration", "SQL", "Supabase"],
    other: ["Docker", "WebSocket", "OpenAI", "D3.js", "Firebase", "Git"],
  };

  return (
    <div className="bg-white/80 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-16">
        {/* Header Section */}
        <div className="relative bg-indigo-500 rounded-3xl p-6 sm:p-12 mb-8 sm:mb-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.1),rgba(255,255,255,0))] rounded-3xl" />
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-mono font-bold text-white mb-4">
                  David Kalina
                </h1>
                <h2 className="text-lg sm:text-xl font-mono text-white/80 mb-6">
                  Full Stack Developer
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/60">
                    <Mail size={16} />
                    <a
                      href="mailto:davidkalina@proton.me"
                      className="font-mono text-sm hover:text-white break-all"
                    >
                      davidkalina@proton.me
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <Phone size={16} />
                    <span className="font-mono text-sm">385-225-6102</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <MapPin size={16} />
                    <span className="font-mono text-sm">Orem, UT</span>
                  </div>
                </div>
              </div>
              <Button
                className="bg-white/80 text-indigo-500 hover:bg-white/80/90 rounded-full px-4 py-4 sm:px-6 sm:py-6 font-mono text-sm w-full sm:w-auto"
                onClick={() => window.print()}
              >
                <Download className="mr-2" size={18} />
                DOWNLOAD PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Skills Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {Object.entries(skills).map(([category, items]) => (
            <Card key={category} className="border-2 border-zinc-100 rounded-2xl overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-mono text-sm text-zinc-400 mb-4 uppercase">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-zinc-100 text-zinc-900 rounded-full px-3 py-1 text-xs font-mono"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Experience */}
        <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <div className="bg-orange-500 p-3 sm:p-4 rounded-2xl">
              <Briefcase size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold">Experience</h2>
          </div>

          {/* Experience Cards */}
          {[
            {
              title: "Full Stack Developer",
              company: "ProStrategix Web Development",
              date: "09/2024 - Present",
              achievements: [
                "Designed and implemented a scalable web content analysis pipeline for Kent State University's OEOC",
                "Built a real-time monitoring dashboard using React, WebSocket, and D3.js",
                "Developed an AI-powered content optimization tool using OpenAI's GPT-4",
              ],
            },
            {
              title: "Full Stack Developer",
              company: "K-Optional Software",
              date: "05/2022 - 06/2024",
              achievements: [
                "Transformed complex UI/UX designs into responsive, maintainable React components",
                "Created a real-time Notification Center with Firebase and TypeScript, boosting user engagement",
                "Designed and launched Alfaphox/Revive Ratings, contributing to a $400,000 product sale",
                "Delivered a Progressive Web App (PWA) for Maxwell Pipeline Services with thousands of monthly users",
              ],
            },
            {
              title: "Full Stack Developer",
              company: "Samba Scientific - Longmont, CO",
              date: "03/2020 - 03/2021",
              achievements: [
                "Automated email distribution processes using SendGrid API, reducing processing time from 4-5 hours to 20-30 minutes",
                "Built a Python-based system to automate job board postings, optimizing response times",
                "Designed client-facing landing pages with interactive, data-driven graphics using D3.js",
              ],
            },
          ].map((job, index) => (
            <Card
              key={index}
              className="border-2 border-zinc-100 rounded-2xl hover:border-orange-500 transition-colors duration-300"
            >
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                  <div>
                    <h3 className="font-mono text-lg sm:text-xl font-bold mb-2">{job.title}</h3>
                    <p className="font-mono text-zinc-600">{job.company}</p>
                  </div>
                  <Badge className="bg-orange-500 text-white rounded-full px-4 py-2 font-mono text-xs w-fit">
                    {job.date}
                  </Badge>
                </div>
                <ul className="space-y-3 font-mono text-sm text-zinc-600">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-2">
                      <ExternalLink size={16} className="mt-1 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Education */}
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <div className="bg-purple-500 p-3 sm:p-4 rounded-2xl">
              <GraduationCap size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold">Education</h2>
          </div>

          <Card className="border-2 border-zinc-100 rounded-2xl hover:border-purple-500 transition-colors duration-300">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                <div>
                  <h3 className="font-mono text-lg sm:text-xl font-bold mb-2">
                    Software Engineering Certificate
                  </h3>
                  <p className="font-mono text-zinc-600">General Assembly - Denver, CO</p>
                </div>
                <Badge className="bg-purple-500 text-white rounded-full px-4 py-2 font-mono text-xs w-fit">
                  11/2019 - 02/2020
                </Badge>
              </div>
              <p className="font-mono text-sm text-zinc-600">
                Completed an intensive 500-hour program in Full Stack Web Development, mastering
                foundational and advanced software development concepts.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModernResume;
