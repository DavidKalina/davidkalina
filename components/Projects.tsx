"use client";

import {
  type ComponentType,
  type CSSProperties,
  type RefObject,
  type SVGProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Radio } from "lucide-react";
import { FaAws } from "react-icons/fa";
import {
  SiExpress,
  SiPostgresql,
  SiReact,
  SiTrpc,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";
import { PROJECT_GRID_CONSTANTS, type Project } from "@/constants/projectGrid";

/* Maps the per-step journey `tech` labels (e.g. "AWS Lambda", "tRPC") to real
   brand glyphs. Both react-icons and lucide render as <svg> that inherits
   `currentColor`, so each chip sets the brand color on the icon directly. */
type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const TECH_ICONS: Record<string, { Icon: IconComponent; color: string }> = {
  Vue: { Icon: SiVuedotjs, color: "#4FC08D" },
  Express: { Icon: SiExpress, color: "var(--fg)" },
  SQS: { Icon: FaAws, color: "#FF9900" },
  "AWS Lambda": { Icon: FaAws, color: "#FF9900" },
  "Vercel AI SDK": { Icon: SiVercel, color: "var(--fg)" },
  "React Native": { Icon: SiReact, color: "#61DAFB" },
  tRPC: { Icon: SiTrpc, color: "#2596BE" },
  SSE: { Icon: Radio, color: "var(--signal)" },
  PostGIS: { Icon: SiPostgresql, color: "#4169E1" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
};

/* ── Projects · "Scrubber" (V3) ───────────────────────────────────────────
   One project at a time. The left column holds the essentials (title, blurb,
   metrics) and the current journey beat; a scrubber along the bottom steps
   through the build/user journey. The right column is a tilted product-demo
   "video" whose caption is driven by the scrubber, with a blurred copy washed
   into the background. Dark-only — the stage scopes the dark theme tokens
   locally (see .pv-stage in globals.css). */

const AUTO_ADVANCE_MS = 3600;

function Chevron({
  dir = "right",
  size = 13,
}: {
  dir?: "left" | "right";
  size?: number;
}) {
  const d = dir === "left" ? "M11 3L5 9l6 6" : "M7 3l6 6-6 6";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

/* Always-visible "at a glance" line. Metrics if present, else the status. */
function MetricStrip({ project }: { project: Project }) {
  if (project.metrics.length) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0 36px" }}>
        {project.metrics.map(([label, value]) => (
          <div key={label} style={{ minWidth: 0 }}>
            <div
              className="pv-display"
              style={{
                fontSize: 36,
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "var(--fg)",
              }}
            >
              {value}
            </div>
            <div className="pv-eyebrow" style={{ marginTop: 8, fontSize: 10 }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <span className="pv-dot" />
      <div>
        <div
          style={{ fontSize: 16, letterSpacing: "-0.02em", color: "var(--fg)" }}
        >
          {project.status?.primary}
        </div>
        <div className="pv-eyebrow" style={{ marginTop: 6, fontSize: 10 }}>
          {project.status?.secondary}
        </div>
      </div>
    </div>
  );
}

/* mm:ss for the demo progress readout. */
function fmtTime(s: number) {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return `${m}:${String(ss).padStart(2, "0")}`;
}

/* Real-video plumbing handed down to DemoVideo when a project ships a
   `demoVideoSrc`. The <video> becomes the source of truth: its `timeupdate`
   drives the scrubber upstream, and ProjectBody feeds the derived progress/time
   back down here so the chrome reflects live playback. */
type DemoMedia = {
  src: string;
  poster?: string;
  progress: number; // 0..1, for the progress-bar fill
  timeLabel: string; // "0:14 / 0:42"
  autoPlay: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
  onTimeUpdate: () => void;
  onLoadedMetadata: () => void;
  onPlay: () => void;
  onPause: () => void;
};

/* Product "screen recording". With `media` it renders a real muted <video>
   whose timeline drives the scrubber; without it, the CSS placeholder loop
   (window chrome, auto-filling form, shimmer sweep). variant="panel" = crisp
   tilted demo; "ambient" = blurred background wash (always the placeholder). */
function DemoVideo({
  project,
  caption,
  variant = "panel",
  media,
}: {
  project: Project;
  caption?: string;
  variant?: "panel" | "ambient";
  media?: DemoMedia;
}) {
  const host =
    project.links?.[0]?.label ??
    `${project.title.toLowerCase().replace(/[^a-z]+/g, "")}.app`;
  const rows = [62, 84, 48, 73, 90];
  // Phone-shaped (9:16) frame for footage shot on a mobile device. Only the
  // crisp panel honors it; the ambient wash stays the landscape placeholder.
  const portrait =
    variant === "panel" && project.demoOrientation === "portrait";

  const captionEl =
    variant === "panel" && caption ? (
      <div className="demo-caption">
        <b />
        {caption}
      </div>
    ) : null;

  const frame = (
    <div className={`demo-frame${portrait ? " demo-frame--portrait" : ""}`}>
      <div className="demo-bar">
        <div className="demo-dots">
          <i />
          <i />
          <i />
        </div>
        <div className="demo-urlchip">{host}</div>
        <div className="demo-rec">
          <b />
          LIVE
        </div>
      </div>
      <div className={`demo-stage${media ? " demo-stage--video" : ""}`}>
        {media ? (
          <div className="demo-videowrap">
            <video
              ref={media.videoRef}
              className="demo-video"
              src={media.src}
              poster={media.poster}
              muted
              playsInline
              loop
              preload="metadata"
              autoPlay={media.autoPlay}
              onTimeUpdate={media.onTimeUpdate}
              onLoadedMetadata={media.onLoadedMetadata}
              onPlay={media.onPlay}
              onPause={media.onPause}
            />
            <div className="demo-vignette" />
            {captionEl}
          </div>
        ) : (
          <>
            <div className="demo-nav">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="demo-main">
              <div className="demo-mainhead">
                <b />
                <em />
              </div>
              {rows.map((w, i) => (
                <div className="demo-row" key={i}>
                  <div className="lab" />
                  <div
                    className="val"
                    style={{ ["--w" as string]: `${w}%` } as CSSProperties}
                  />
                </div>
              ))}
              <div className="demo-scan" />
              <div className="demo-shimmer" />
              <div className="demo-vignette" />
              {captionEl}
            </div>
          </>
        )}
      </div>
      <div className="demo-progress">
        <span className="play">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <rect x="1.5" y="1" width="2.2" height="8" />
            <rect x="6.3" y="1" width="2.2" height="8" />
          </svg>
        </span>
        <div className="demo-track">
          <i
            style={
              media
                ? { width: `${media.progress * 100}%`, animation: "none" }
                : undefined
            }
          />
        </div>
        <span className="demo-time">{media ? media.timeLabel : "0:14 / 0:42"}</span>
      </div>
    </div>
  );

  if (variant === "ambient") {
    return (
      <div className="demo-ambient" aria-hidden="true">
        {frame}
      </div>
    );
  }
  return (
    <div className={`demo-tilt${portrait ? " demo-tilt--portrait" : ""}`}>
      {frame}
    </div>
  );
}

/* Per-project body — remounted on project change (key={i}) so the reveal and
   the scrubber state reset cleanly. */
function ProjectBody({ project }: { project: Project }) {
  const steps = project.journey?.steps ?? [];
  const n = steps.length;
  const hasVideo = !!project.demoVideoSrc;
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [media, setMedia] = useState({ t: 0, d: 0 }); // live video time/duration
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Respect reduced-motion: don't auto-advance / autoplay the story.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setReduceMotion(true);
      setPlaying(false);
      videoRef.current?.pause();
    }
  }, []);

  // Auto-advance timer — only the fallback (no real video) uses it.
  useEffect(() => {
    if (hasVideo || !playing || n === 0) return;
    timer.current = setTimeout(() => setStep((s) => (s + 1) % n), AUTO_ADVANCE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [step, playing, n, hasVideo]);

  // Map a playback time to the active step: the last marker we've reached.
  // Steps without a `time` don't gate, so an unmarked video stays on step 0.
  const stepFromTime = useCallback(
    (t: number) => {
      let next = 0;
      for (let k = 0; k < steps.length; k++) {
        const mark = steps[k]?.time;
        if (mark == null) continue;
        if (t + 1e-3 >= mark) next = k;
      }
      return next;
    },
    [steps],
  );

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setMedia({ t: v.currentTime, d: v.duration || 0 });
    setStep(stepFromTime(v.currentTime));
  }, [stepFromTime]);

  const onLoadedMetadata = useCallback(() => {
    const v = videoRef.current;
    if (v) setMedia({ t: v.currentTime, d: v.duration || 0 });
  }, []);

  const pick = (idx: number) => {
    if (hasVideo) {
      const v = videoRef.current;
      if (v) v.currentTime = steps[idx]?.time ?? 0; // timeupdate echoes back the step
      setStep(idx);
      return;
    }
    setPlaying(false);
    setStep(idx);
  };

  const togglePlay = () => {
    if (hasVideo) {
      const v = videoRef.current;
      if (!v) return;
      if (v.paused) void v.play();
      else v.pause();
      return; // onPlay/onPause keep `playing` in sync
    }
    setPlaying((p) => !p);
  };

  const demoMedia = hasVideo
    ? {
        src: project.demoVideoSrc as string,
        poster: project.demoPoster,
        progress: media.d > 0 ? media.t / media.d : 0,
        timeLabel: `${fmtTime(media.t)} / ${fmtTime(media.d)}`,
        autoPlay: !reduceMotion,
        videoRef,
        onTimeUpdate,
        onLoadedMetadata,
        onPlay: () => setPlaying(true),
        onPause: () => setPlaying(false),
      }
    : undefined;

  const cur = steps[step];
  // Journey labels carry a "USER JOURNEY · " prefix in the data; the step
  // eyebrow shows just the trailing summary.
  const journeyLabel = (project.journey?.label ?? "").replace(
    /^USER JOURNEY · /,
    "",
  );
  const techList = cur?.tech ? cur.tech.split(" · ") : [];

  return (
    <div className="pv-bodygrid">
      {/* ── left column: essentials + current step + scrubber ── */}
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div className="pv-eyebrow" style={{ marginBottom: 14 }}>
          {project.client}
        </div>
        <h3
          className="pv-display"
          style={{
            fontSize: 40,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            margin: 0,
            color: "var(--fg)",
          }}
        >
          {project.title}
        </h3>
        <p
          className="pv-italic"
          style={{
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--fg-dim)",
            margin: "16px 0 0",
            maxWidth: "42ch",
          }}
        >
          {project.blurb}
        </p>
        <div style={{ marginTop: 22 }}>
          <MetricStrip project={project} />
        </div>

        {/* current step detail — remounts per step for the fade-up enter */}
        {cur ? (
          <div
            key={step}
            className="pv-fade"
            style={{ marginTop: "auto", paddingTop: 24 }}
          >
            <div
              className="pv-eyebrow"
              style={{ color: "var(--signal)", marginBottom: 12 }}
            >
              {`Step ${String(step + 1).padStart(2, "0")} / ${String(
                n,
              ).padStart(2, "0")} — ${journeyLabel}`}
            </div>
            <div
              className="pv-italic"
              style={{
                fontSize: 28,
                color: "var(--fg)",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}
            >
              {cur.title}
            </div>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.65,
                color: "var(--fg-dim)",
                margin: "12px 0 0",
                maxWidth: "46ch",
              }}
            >
              {cur.sub}
            </p>
            {techList.length ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "8px 18px",
                  marginTop: 16,
                }}
              >
                {techList.map((t) => {
                  const meta = TECH_ICONS[t];
                  const Icon = meta?.Icon;
                  return (
                    <span
                      key={t}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        fontSize: 11.5,
                        letterSpacing: "0.02em",
                        color: "var(--fg-dim)",
                      }}
                    >
                      {Icon ? (
                        <Icon
                          size={14}
                          aria-hidden
                          style={{ color: meta.color, flexShrink: 0 }}
                        />
                      ) : null}
                      {t}
                    </span>
                  );
                })}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* scrubber */}
        {n > 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 26,
            }}
          >
            <button
              className="pv-navbtn"
              style={{ borderRadius: "50%", width: 30, height: 30 }}
              onClick={togglePlay}
              aria-label={playing ? "Pause journey" : "Play journey"}
            >
              {playing ? (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 11 11"
                  fill="currentColor"
                  aria-hidden
                >
                  <rect x="2" y="1.5" width="2.4" height="8" />
                  <rect x="6.6" y="1.5" width="2.4" height="8" />
                </svg>
              ) : (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 11 11"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M2.5 1.5l7 4-7 4z" />
                </svg>
              )}
            </button>
            <div
              style={{
                position: "relative",
                flex: 1,
                height: 24,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                className="pv-dotline"
                style={{ position: "absolute", left: 0, right: 0 }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  height: 1,
                  background: "var(--signal)",
                  width: `${n > 1 ? (step / (n - 1)) * 100 : 0}%`,
                  transition: "width .6s cubic-bezier(.2,.7,.2,1)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {steps.map((s, idx) => (
                  <button
                    key={s.title}
                    onClick={() => pick(idx)}
                    style={{
                      appearance: "none",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      padding: 0,
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                    }}
                    aria-label={`Step ${idx + 1}: ${s.title}`}
                    aria-current={idx === step ? "step" : undefined}
                  >
                    <span
                      style={{
                        width: idx <= step ? 8 : 5,
                        height: idx <= step ? 8 : 5,
                        borderRadius: "50%",
                        background:
                          idx <= step ? "var(--signal)" : "var(--bg)",
                        border: "1.5px solid",
                        borderColor:
                          idx <= step ? "var(--signal)" : "var(--fg-mute)",
                        transition: "all .3s",
                        boxShadow:
                          idx === step ? "0 0 8px var(--signal)" : "none",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* ── right column: product demo ── */}
      <div className="pv-demo-col" style={{ minWidth: 0 }}>
        <DemoVideo
          project={project}
          caption={cur ? `Now: ${cur.title}` : undefined}
          media={demoMedia}
        />
      </div>
    </div>
  );
}

const ModernProjects = () => {
  const { projects } = PROJECT_GRID_CONSTANTS;
  const n = projects.length;
  const [i, setI] = useState(0);
  const go = useCallback(
    (d: number) => setI((x) => Math.min(n - 1, Math.max(0, x + d))),
    [n],
  );
  const project = projects[i];

  return (
    <section id="work" className="pv-stage">
      {/* ambient background — a blurred, dimmed copy of the demo */}
      <div
        key={`bg-${i}`}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <DemoVideo project={project} variant="ambient" />
      </div>

      {/* inner frame — keeps the editorial content from sprawling on ultra-wide
          screens while the dark stage itself runs full-bleed */}
      <div className="pv-inner">
        {/* top chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flex: "0 0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="pv-eyebrow">Selected work</span>
            <span className="pv-dotline" style={{ width: 64 }} />
            <span className="pv-idx">{project.year}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span className="pv-idx" style={{ fontSize: 12 }}>
              <span style={{ color: "var(--fg)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ margin: "0 8px", color: "var(--border)" }}>/</span>
              <span>{String(n).padStart(2, "0")}</span>
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="pv-navbtn"
                onClick={() => go(-1)}
                disabled={i === 0}
                aria-label="Previous project"
              >
                <Chevron dir="left" />
              </button>
              <button
                className="pv-navbtn"
                onClick={() => go(1)}
                disabled={i === n - 1}
                aria-label="Next project"
              >
                <Chevron dir="right" />
              </button>
            </div>
          </div>
        </div>

        {/* body — remounts per project */}
        <div
          key={i}
          className="pv-fade"
          style={{
            flex: "1 1 auto",
            minHeight: 0,
            position: "relative",
            zIndex: 1,
            marginTop: 30,
          }}
        >
          <ProjectBody project={project} />
        </div>
      </div>
    </section>
  );
};

export default ModernProjects;
