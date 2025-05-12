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
  Layers, // Added for Projects section
} from "lucide-react";

const ModernResume = () => {
  const skills = {
    frontend: ["React", "Vue", "Next.js", "React Native", "CSS", "HTML"],
    backend: ["Node.js", "SQL", "Supabase", "Firebase", "Docker", "API Design"],
    "tools & platforms": ["TypeScript", "AWS", "Twilio", "D3.js", "WordPress"],
  };

  const keyStrengths = [
    "Eye for Design",
    "Strong Problem Solver",
    "Team Player",
    "Intuitive Thinker",
    "Clear Communicator",
  ];

  const experience = [
    {
      title: "Full Stack Developer",
      company: "Spontigo | Vineyard, UT",
      date: "Mar 2025 - Present",
      achievements: [
        "Developed an Al-powered QA system using natural language processing to flag risky client interactions in real time.",
        "Built dynamic, schema-driven form builder in Vue for concierge itineraries, enhancing data accuracy and productivity.",
        "Created responsive marketing pages and custom dashboards with Vue + React.",
        "Wrote global middleware to track API route health via AWS CloudWatch.",
        "Built a lead generation script installed on client sites (e.g., Hotel Park City).",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "K-Optional Software | Brooklyn, NY",
      date: "May 2022 - Jun 2024",
      achievements: [
        "Translated complex UI/UX designs into scalable React components.",
        "Built a Notification Center using Firebase and TypeScript to increase engagement.",
        "Integrated Twilio for secure phone provisioning; maintained robust API reliability.",
        "Led development of white-label review platform (Alfaphox/Revive Ratings).",
        "Mentored junior devs and conducted technical interviews to grow the team.",
        "Delivered a cross-platform PWA for operational efficiency at Maxwell Pipeline Services.",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Samba Scientific | Longmont, CO",
      date: "Mar 2020 - Mar 2021",
      achievements: [
        "Automated cold-email flows using SendGrid API, streamlining marketing efforts.",
        "Built Python-based system to manage job board postings across platforms.",
        "Launched multiple landing pages and data-driven D3.js visualizations for clients.",
      ],
    },
  ];

  const projects = [
    {
      name: "MapMoji",
      description:
        "A mobile-first event discovery platform that allows users to scan real-world flyers and instantly turn them into live map pins. Built with React Native and Expo, it leverages AI to extract event data from images using OpenAI-powered LLMs, and geolocates events with Google Maps and Mapbox APIs.",
      features: [
        "Designed a scalable, containerized backend with PostgreSQL, Redis, and a multi-service architecture using Docker Compose.",
        "Implemented real-time WebSocket updates for map interactions and event publishing.",
        "Used text embeddings to enable intelligent search and filtering across thousands of events.",
        "Created a gamified leveling system to encourage user engagement, built with modular microservices.",
        "Developed custom image parsing logic and integrated cloud storage with DigitalOcean Spaces for fast, reliable event flyer handling.",
      ],
    },
  ];

  return (
    <div className="bg-white/80 dark:bg-zinc-800/95 min-h-screen pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-16">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <h1 className="text-3xl sm:text-4xl font-mono font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
                  David Kalina
                </h1>
                <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400">/</span>
                <h2 className="text-lg sm:text-xl font-mono text-zinc-700 dark:text-zinc-300">
                  Full Stack Developer
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-mono text-zinc-600 dark:text-zinc-400">
                <a
                  href="mailto:davidkalina@proton.me"
                  className="flex items-center gap-1.5 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                >
                  <Mail size={14} />
                  davidkalina@proton.me
                </a>
                <span className="flex items-center gap-1.5">
                  <Phone size={14} />
                  385-225-6102
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  Provo, UT
                </span>
              </div>
            </div>
            <Button
              className="bg-zinc-950 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-950 hover:bg-zinc-900 dark:hover:bg-zinc-100 rounded-full px-4 py-2 font-mono text-sm font-medium transition-colors shadow-sm"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/resume.pdf";
                link.download = "David_Kalina_Resume.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="mr-1.5" size={14} />
              PDF
            </Button>
          </div>

          {/* Professional Summary */}
          <div className="mt-8 text-zinc-600 dark:text-zinc-400 font-mono text-sm leading-relaxed max-w-2xl">
            <p>
              Full Stack Developer blending strong design instincts with deep technical acumen. Over
              4 years turning ambitious product ideas into scalable, polished software—from
              AI-backed QA systems to real-time dashboards. I thrive in fast-moving teams where I
              can own end-to-end delivery and build tools that make users&apos; lives easier.
              Passionate about bridging user empathy with engineering excellence to ship impactful
              products.
            </p>
          </div>
        </div>

        {/* Key Strengths */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-indigo-500/10 dark:bg-indigo-400/10 p-3 sm:p-4 rounded-2xl">
              <Star size={20} className="text-indigo-600 dark:text-indigo-400 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-200">
              Key Strengths
            </h2>
          </div>
          <Card className="border border-zinc-200 dark:border-zinc-700/50 rounded-2xl bg-white/90 dark:bg-zinc-800/90 shadow-sm">
            <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keyStrengths.map((strength, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Star
                    size={16}
                    className="text-indigo-500 dark:text-indigo-400 mt-1 flex-shrink-0"
                  />
                  <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
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
                    {category.replace("-", " & ")} {/* Display "tools & platforms" nicely */}
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
          {experience.map((job, index) => (
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

        {/* Projects Section */}
        <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <div className="bg-teal-500 dark:bg-teal-400 p-3 sm:p-4 rounded-2xl">
              <Layers size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-200">
              Projects
            </h2>
          </div>
          {projects.map((project, index) => (
            <Card
              key={index}
              className="border-2 border-zinc-100 dark:border-zinc-700/50 rounded-2xl hover:border-teal-500 dark:hover:border-teal-400 transition-colors duration-300 bg-white/80 dark:bg-zinc-800/80"
            >
              <CardContent className="p-6 sm:p-8">
                <h3 className="font-mono text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-200 mb-2">
                  {project.name}
                </h3>
                <p className="font-mono text-sm text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <ul className="space-y-3 font-mono text-sm text-zinc-600 dark:text-zinc-300">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex gap-2">
                      <Star
                        size={16}
                        className="mt-1 flex-shrink-0 text-teal-500 dark:text-teal-400"
                      />
                      <span>{feature}</span>
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
                    Software Engineering Immersive
                  </h3>
                  <p className="font-mono text-zinc-600 dark:text-zinc-300">
                    General Assembly | Denver, CO
                  </p>
                </div>
                <Badge className="bg-purple-500 dark:bg-purple-400 text-white rounded-full px-4 py-2 font-mono text-xs w-fit">
                  Nov 2020 - Feb 2021
                </Badge>
              </div>
              <p className="font-mono text-sm text-zinc-600 dark:text-zinc-300">
                Completed 500+ hours of hands-on training in full stack web development. Built
                real-world applications using modern technologies and agile workflows.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModernResume;
