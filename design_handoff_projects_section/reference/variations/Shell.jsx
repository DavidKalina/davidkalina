/* Shared editorial shell + small helpers for every project variation.
   Exposes ProjectShell, Chevron, TechGlyph, MetricStrip on window. */
const { useState, useEffect, useRef, useCallback } = React;

function Chevron({ dir = "right", size = 13 }) {
  const d = dir === "left" ? "M11 3L5 9l6 6" : "M7 3l6 6-6 6";
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

/* A small geometric mark standing in for a tech logo — strictly on-brand,
   no copyrighted glyphs. */
function TechGlyph({ glyph, size = 13 }) {
  return (
    <span className="pv-glyph" style={{ fontSize: size, width: size + 4, height: size + 4 }}>
      {glyph}
    </span>
  );
}

/* The always-visible metric strip. Falls back to the status line for
   projects with no metrics (e.g. Side Quests). */
function MetricStrip({ project, size = "lg" }) {
  const big = size === "lg";
  if (project.metrics.length) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: big ? "0 56px" : "0 36px" }}>
        {project.metrics.map(([label, value]) => (
          <div key={label} style={{ minWidth: 0 }}>
            <div className="pv-display" style={{
              fontSize: big ? 40 : 30, fontWeight: 500, letterSpacing: "-0.03em", color: "var(--fg)",
            }}>{value}</div>
            <div className="pv-eyebrow" style={{ marginTop: 8, fontSize: 10 }}>{label}</div>
          </div>
        ))}
      </div>
    );
  }
  // No metrics → show role + status as the "at a glance" fact.
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <span className="pv-dot" />
      <div>
        <div style={{ fontSize: big ? 19 : 16, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          {project.status.primary}
        </div>
        <div className="pv-eyebrow" style={{ marginTop: 6, fontSize: 10 }}>{project.status.secondary}</div>
      </div>
    </div>
  );
}

/* ProjectShell — paper stage + top chrome + project switcher.
   children is a render prop: (project, index) => node.
   The body is keyed by index so a project swap remounts it (clean reveal reset). */
function ProjectShell({ eyebrow = "Selected work", children, background, pad = 56, dark = true }) {
  const projects = window.PV_PROJECTS;
  const [i, setI] = useState(0);
  const n = projects.length;
  const go = useCallback((d) => setI((x) => Math.min(n - 1, Math.max(0, x + d))), [n]);

  return (
    <div className={"pv-stage" + (dark ? " pv-dark" : "")} style={{ padding: pad }}>
      {background && (
        <div key={"bg" + i} style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          {background(projects[i], i)}
        </div>
      )}
      {/* top chrome */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flex: "0 0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="pv-eyebrow">{eyebrow}</span>
          <span className="pv-dotline" style={{ width: 64 }} />
          <span className="pv-idx">{projects[i].year}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="pv-idx" style={{ fontSize: 12 }}>
            <span style={{ color: "var(--fg)" }}>{projects[i].num}</span>
            <span style={{ margin: "0 8px", color: "var(--border)" }}>/</span>
            <span>{String(n).padStart(2, "0")}</span>
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="pv-navbtn" onClick={() => go(-1)} disabled={i === 0} aria-label="Previous project">
              <Chevron dir="left" />
            </button>
            <button className="pv-navbtn" onClick={() => go(1)} disabled={i === n - 1} aria-label="Next project">
              <Chevron dir="right" />
            </button>
          </div>
        </div>
      </div>

      {/* body — remounts per project */}
      <div key={i} className="pv-fade" style={{ flex: "1 1 auto", minHeight: 0, position: "relative", zIndex: 1, marginTop: 30 }}>
        {children(projects[i], i)}
      </div>
    </div>
  );
}

Object.assign(window, { Chevron, TechGlyph, MetricStrip, ProjectShell });
