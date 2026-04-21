import Link from "next/link";
import { Fragment } from "react";
import type { Project } from "@/constants/projectGrid";

interface ProjectCardProps {
  project: Project;
  isFirst?: boolean;
  isLast?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isFirst, isLast }) => {
  const clientHue = `oklch(0.7 0.08 ${project.hue})`;

  const borderStyle: React.CSSProperties = {
    borderTop: isFirst ? "1px solid var(--border)" : undefined,
    borderBottom: "1px solid var(--border)",
  };
  if (!isFirst && !isLast) borderStyle.borderTop = "1px solid var(--border)";
  if (!isFirst) borderStyle.borderTop = "1px solid var(--border)";

  return (
    <article
      className="group grid grid-cols-12 gap-8 py-14"
      style={borderStyle}
    >
      <div className="col-span-12 md:col-span-2">
        <div
          className="font-mono text-[11px] tracking-[0.14em]"
          style={{ color: "var(--fg-mute)" }}
        >
          — {project.num}
        </div>
        <div
          className="mt-2 font-mono text-[11px] tracking-[0.1em]"
          style={{ color: "var(--fg-mute)" }}
        >
          {project.year}
        </div>
      </div>

      <div className="col-span-12 md:col-span-5">
        <div
          className="font-mono text-[11px] tracking-[0.12em] mb-3"
          style={{ color: clientHue }}
        >
          {project.client.toUpperCase()}
        </div>
        <h3 className="serif text-[26px] md:text-[30px] leading-[1.15] text-fg">
          {project.title}
        </h3>
        <p className="mt-5 text-[15px] leading-[1.6] max-w-[42ch] text-fg-dim">
          {project.blurb}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1">
          {project.stack.map((tech, i) => (
            <Fragment key={tech}>
              {i > 0 && (
                <span
                  className="font-mono text-[11px]"
                  style={{ color: "var(--border)" }}
                  aria-hidden
                >
                  /
                </span>
              )}
              <span
                className="font-mono text-[11px] tracking-[0.08em]"
                style={{ color: "var(--fg-mute)" }}
              >
                {tech.toUpperCase()}
              </span>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="col-span-12 md:col-span-4">
        <div className="eyebrow mb-4">Metrics</div>
        <dl className="space-y-3">
          {project.metrics.map(([k, v]) => (
            <div
              key={k}
              className="flex items-baseline justify-between gap-4 pb-1.5"
              style={{ borderBottom: "1px dotted var(--border)" }}
            >
              <dt className="text-[13px] text-fg-dim">{k}</dt>
              <dd className="serif text-[22px] text-fg">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="col-span-12 md:col-span-1 flex md:justify-end items-start">
        <Link
          href={project.href}
          target={project.href.startsWith("http") ? "_blank" : undefined}
          className="font-mono text-[11px] tracking-[0.12em] inline-flex items-center gap-2 text-fg group-hover:text-[color:var(--signal)] transition-colors"
        >
          <span className="hidden md:inline">VIEW</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"
            aria-hidden
          >
            <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
