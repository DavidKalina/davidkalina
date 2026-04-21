"use client";

import { PROJECT_GRID_CONSTANTS } from "@/constants/projectGrid";
import { useReveal } from "@/hooks/useReveal";
import ProjectCard from "./ProjectCard";

const ModernProjectGrid = () => {
  useReveal();
  const { section, projects } = PROJECT_GRID_CONSTANTS;

  return (
    <section id="work" className="py-32 md:py-48">
      <div className="max-w-page mx-auto px-6 md:px-8">
        <div className="flex items-center gap-3 mb-20 reveal">
          <span className="idx">— {section.number} · {section.eyebrow}</span>
          <div className="flex-1 dotline" />
          <span className="idx">{section.counter}</span>
        </div>

        <div className="grid grid-cols-12 gap-8 mb-20">
          <div className="col-span-12 md:col-span-5">
            <h2 className="display text-[36px] md:text-[52px] leading-[1] reveal text-fg">
              {section.headlineLine1}
              <br />
              <span className="italic-serif">{section.headlineAccent}</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 pt-4">
            <p className="text-[16px] leading-[1.6] reveal text-fg-dim">{section.paragraph}</p>
          </div>
        </div>

        <div className="reveal-stagger">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.num}
              project={project}
              isFirst={i === 0}
              isLast={i === projects.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernProjectGrid;
