"use client";

import type { ComponentType, SVGProps } from "react";
import {
  SiAnthropic,
  SiExpress,
  SiGooglemaps,
  SiGraphql,
  SiNodedotjs,
  SiOpenai,
  SiReact,
  SiRedis,
  SiStorybook,
  SiTerraform,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import {
  PROJECT_GRID_CONSTANTS,
  type Project,
  type TechAnnotation,
  type TechIconKey,
} from "@/constants/projectGrid";
import { useReveal } from "@/hooks/useReveal";
import TechStackMarquee from "./TechStackBadges";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const ICON_MAP: Record<TechIconKey, { icon: IconComponent; color?: string }> = {
  react: { icon: SiReact, color: "#61DAFB" },
  ts: { icon: SiTypescript, color: "#3178C6" },
  ai: { icon: SiAnthropic, color: "#D97757" },
  mcp: { icon: SiAnthropic, color: "#D97757" },
  gp: { icon: SiGooglemaps, color: "#4285F4" },
  aws: { icon: FaAws, color: "#FF9900" },
  terraform: { icon: SiTerraform, color: "#7B42BC" },
  graphql: { icon: SiGraphql, color: "#E10098" },
  storybook: { icon: SiStorybook, color: "#FF4785" },
  node: { icon: SiNodedotjs, color: "#5FA04E" },
  realtime: { icon: SiReact, color: "var(--signal)" },
  vercel: { icon: SiVercel },
  vue: { icon: SiVuedotjs, color: "#4FC08D" },
  openai: { icon: SiOpenai },
  redis: { icon: SiRedis, color: "#DC382D" },
  express: { icon: SiExpress },
};

const TechIcon = ({ name }: { name: TechIconKey }) => {
  const entry = ICON_MAP[name];
  if (!entry) return null;
  const { icon: Icon, color } = entry;
  return (
    <Icon
      size={14}
      style={{ color: color ?? "var(--fg)" }}
      aria-hidden
      focusable="false"
    />
  );
};

const AnnotRow = ({ icon, label, role, body }: TechAnnotation) => (
  <div className="pc-annot">
    <div className="pc-annot-head">
      <div className="pc-annot-left">
        <span className="pc-annot-icon">
          <TechIcon name={icon} />
        </span>
        <span>{label}</span>
      </div>
      {role ? <span className="pc-annot-role">{role}</span> : null}
    </div>
    {body ? (
      <div
        className="pc-annot-body"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    ) : null}
  </div>
);

const JourneyStepRow = ({
  n,
  title,
  sub,
  tech,
}: {
  n: number;
  title: string;
  sub: string;
  tech?: string;
}) => (
  <div className="pc-step">
    <div className="pc-step-n">{String(n).padStart(2, "0")}</div>
    <div className="pc-step-content">
      {title}
      <span className="pc-step-sub">{sub}</span>
      {tech ? <span className="pc-step-tech">{tech}</span> : null}
    </div>
  </div>
);

const ProjectCard = ({
  project,
  isFirst,
}: {
  project: Project;
  isFirst?: boolean;
}) => {
  const hasJourney = Boolean(
    project.journey && project.journey.steps.length > 0,
  );
  return (
    <article
      className="pc-card reveal py-16 md:py-20"
      style={isFirst ? undefined : { borderTop: "1px solid var(--border)" }}
    >
      <div className="pc-meta">
        <div className="pc-index">{project.num}</div>
        <h3 className="pc-title">{project.title}</h3>
        <p className="pc-desc">{project.blurb}</p>
        {project.metrics.length > 0 ? (
          <div className="pc-metrics">
            {project.metrics.map(([label, value]) => (
              <div key={label}>
                <div className="pc-metric-value">{value}</div>
                <div className="pc-metric-label">{label}</div>
              </div>
            ))}
          </div>
        ) : null}
        {project.tags ? (
          <div className="pc-tags">
            {project.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        ) : null}
        {project.links && project.links.length > 0 ? (
          <div className="pc-links">
            <div className="pc-links-label">Links</div>
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="pc-link arrow-link"
              >
                <span>{link.label}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 12L12 2M12 2H4M12 2V10"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                </svg>
              </a>
            ))}
          </div>
        ) : null}
      </div>
      <div className="pc-right">
        <div className={`pc-v2 ${hasJourney ? "" : "pc-v2--single"}`}>
          {project.tech ? (
            <div className="pc-annot-list">
              {project.tech.map((t) => (
                <AnnotRow key={t.label} {...t} />
              ))}
            </div>
          ) : null}
          {hasJourney && project.journey ? (
            <div className="pc-journey">
              <div className="pc-journey-label">{project.journey.label}</div>
              {project.journey.steps.map((step, i) => (
                <JourneyStepRow key={step.title} n={i + 1} {...step} />
              ))}
            </div>
          ) : null}
          {project.status ? (
            <div className="pc-status">
              <div>
                <span className="pc-status-dot" />
                {project.status.primary}
              </div>
              <div className="pc-status-right">{project.status.secondary}</div>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
};

const ModernTechStack = () => {
  useReveal();
  const { section, projects } = PROJECT_GRID_CONSTANTS;

  return (
    <>
      <TechStackMarquee />
      <section id="work" className="py-32 md:py-48">
        <div className="max-w-page mx-auto px-6 md:px-8">
          <div className="mb-24 max-w-[58ch]">
            <h2 className="display text-[36px] md:text-[52px] leading-[1] reveal text-fg">
              {section.headlineLine1}
              <br />
              <span className="italic-serif">{section.headlineAccent}</span>
            </h2>
            <p className="mt-8 text-[16px] leading-[1.65] reveal text-fg-dim">
              {section.paragraph}
            </p>
          </div>

          <div
            style={{
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.num}
                project={project}
                isFirst={i === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ModernTechStack;
