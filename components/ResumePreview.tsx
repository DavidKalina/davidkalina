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
  Star,
  Code,
} from "lucide-react";

const ModernResume = () => {
  const skills = {
    frontend: ["React", "React Native", "Next.js", "TypeScript", "CSS", "HTML"],
    backend: ["Node.js", "API Integration", "SQL", "Supabase"],
    other: ["Docker", "WebSocket", "OpenAI", "D3.js", "Firebase", "Git", "WordPress"],
  };

  const keyStrengths = [
    "Strong problem-solving and analytical abilities",
    "Advanced technical proficiency in both frontend and backend technologies",
    "Exceptional communication and teamwork skills",
    "Leadership in mentoring and guiding development teams",
    "Intuitive design sense for user-focused applications",
  ];

  return (
    <div className="bg-white/80 dark:bg-zinc-800/95 min-h-screen pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-16">
        {/* Header Section */}
        <div className="relative bg-indigo-500 dark:bg-indigo-400 rounded-3xl p-6 sm:p-12 mb-8 sm:mb-12">
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
                className="bg-white text-indigo-500 hover:bg-white/80 rounded-full px-4 py-4 sm:px-6 sm:py-6 font-mono text-sm w-full sm:w-auto"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/resume.pdf";
                  link.download = "David_Kalina_Resume.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="mr-2" size={18} />
                DOWNLOAD PDF
              </Button>
            </div>

            {/* Professional Summary */}
            <div className="mt-8 text-white/80 font-mono text-sm leading-relaxed">
              <p>
                Innovative and detail-oriented Full Stack Developer with over four years of
                experience designing and deploying scalable web applications and AI-driven
                solutions. Skilled in bridging user-centric design with advanced technical
                capabilities to deliver impactful, cutting-edge products. Adept at fostering
                collaboration, mentoring teams, and driving innovation to ensure project success.
              </p>
            </div>
          </div>
        </div>

        {/* Key Strengths */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-500 dark:bg-green-400 p-3 sm:p-4 rounded-2xl">
              <Star size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-200">
              Key Strengths
            </h2>
          </div>
          <Card className="border-2 border-zinc-100 dark:border-zinc-700/50 rounded-2xl">
            <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keyStrengths.map((strength, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Star
                    size={16}
                    className="text-green-500 dark:text-green-400 mt-1 flex-shrink-0"
                  />
                  <span className="font-mono text-sm text-zinc-600 dark:text-zinc-300">
                    {strength}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Skills Overview */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-500 dark:bg-blue-400 p-3 sm:p-4 rounded-2xl">
              <Code size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-200">
              Technical Skills
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <Card
                key={category}
                className="border-2 border-zinc-100 dark:border-zinc-700/50 rounded-2xl overflow-hidden bg-white/80 dark:bg-zinc-800/80"
              >
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-mono text-sm text-zinc-400 dark:text-zinc-500 mb-4 uppercase">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-200 rounded-full px-3 py-1 text-xs font-mono"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <div className="bg-orange-500 dark:bg-orange-400 p-3 sm:p-4 rounded-2xl">
              <Briefcase size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-200">
              Experience
            </h2>
          </div>

          {/* Experience Cards */}
          {[
            {
              title: "Full Stack Developer",
              company: "ProStrategix Web Development",
              date: "09/2024 - Present",
              achievements: [
                "Designed and implemented a scalable web content analysis pipeline for Kent State University's OEOC, integrating AI-driven insights to modernize web infrastructure",
                "Built a real-time monitoring dashboard using React, WebSocket, and D3.js, improving visibility into system health and processing metrics",
                "Developed an AI-powered content optimization tool using OpenAI's GPT-4, enabling personalized educational content categorization",
                "Engineered a modular database architecture with Supabase, streamlining data management and integration",
              ],
            },
            {
              title: "Full Stack Developer",
              company: "K-Optional Software",
              date: "05/2022 - 06/2024",
              achievements: [
                "Transformed complex UI/UX designs into responsive, maintainable React components, leading to improved satisfaction scores",
                "Created a real-time Notification Center with Firebase and TypeScript, boosting user engagement and retention",
                "Designed and launched Alfaphox/Revive Ratings, contributing to a $400,000 product sale",
                "Delivered a Progressive Web App (PWA) for Maxwell Pipeline Services with thousands of monthly users",
                "Mentored junior developers and conducted dozens of technical and behavioral interviews",
              ],
            },
            {
              title: "Full Stack Developer",
              company: "Samba Scientific - Longmont, CO",
              date: "03/2020 - 03/2021",
              achievements: [
                "Automated email distribution processes using SendGrid API, reducing processing time from 4-5 hours to 20-30 minutes",
                "Built a Python-based system to automate job board postings, optimizing response times to under five minutes",
                "Designed client-facing landing pages with interactive, data-driven graphics using D3.js",
              ],
            },
          ].map((job, index) => (
            <Card
              key={index}
              className="border-2 border-zinc-100 dark:border-zinc-700/50 rounded-2xl hover:border-orange-500 dark:hover:border-orange-400 transition-colors duration-300 bg-white/80 dark:bg-zinc-800/80"
            >
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                  <div>
                    <h3 className="font-mono text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-200 mb-2">
                      {job.title}
                    </h3>
                    <p className="font-mono text-zinc-600 dark:text-zinc-300">{job.company}</p>
                  </div>
                  <Badge className="bg-orange-500 dark:bg-orange-400 text-white rounded-full px-4 py-2 font-mono text-xs w-fit">
                    {job.date}
                  </Badge>
                </div>
                <ul className="space-y-3 font-mono text-sm text-zinc-600 dark:text-zinc-300">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-2">
                      <ExternalLink
                        size={16}
                        className="mt-1 flex-shrink-0 text-orange-500 dark:text-orange-400"
                      />
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
            <div className="bg-purple-500 dark:bg-purple-400 p-3 sm:p-4 rounded-2xl">
              <GraduationCap size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-200">
              Education
            </h2>
          </div>

          <Card className="border-2 border-zinc-100 dark:border-zinc-700/50 rounded-2xl hover:border-purple-500 dark:hover:border-purple-400 transition-colors duration-300 bg-white/80 dark:bg-zinc-800/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                <div>
                  <h3 className="font-mono text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-200 mb-2">
                    Software Engineering Certificate
                  </h3>
                  <p className="font-mono text-zinc-600 dark:text-zinc-300">
                    General Assembly - Denver, CO
                  </p>
                </div>
                <Badge className="bg-purple-500 dark:bg-purple-400 text-white rounded-full px-4 py-2 font-mono text-xs w-fit">
                  11/2019 - 02/2020
                </Badge>
              </div>
              <p className="font-mono text-sm text-zinc-600 dark:text-zinc-300">
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
