/* V3 — Journey Scrubber × product demo (dark).
   Left: essentials + the current journey step. Right: the product demo video.
   The scrubber drives BOTH — stepping the narrative and the demo caption in
   sync. A blurred copy of the demo washes the background. */
const { ProjectShell: V3Shell, MetricStrip: V3Metrics, DemoVideo: V3Demo } = window;
const { useState: useState3, useEffect: useEffect3, useRef: useRef3 } = React;

function V3Body({ project }) {
  const steps = project.journey.steps;
  const n = steps.length;
  const [step, setStep] = useState3(0);
  const [playing, setPlaying] = useState3(true);
  const timer = useRef3(null);

  useEffect3(() => {
    if (!playing) return;
    timer.current = setTimeout(() => setStep((s) => (s + 1) % n), 3600);
    return () => clearTimeout(timer.current);
  }, [step, playing, n]);

  const pick = (idx) => { setPlaying(false); setStep(idx); };
  const cur = steps[step];
  const techList = cur.tech.split(" · ");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.82fr) minmax(0,1.18fr)", gap: 44, height: "100%" }}>
      {/* ── left column ── */}
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div className="pv-eyebrow" style={{ marginBottom: 14 }}>{project.client}</div>
        <h2 className="pv-display" style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.03em", margin: 0, color: "var(--fg)" }}>{project.title}</h2>
        <p className="pv-italic" style={{ fontSize: 14, lineHeight: 1.6, color: "var(--fg-dim)", margin: "14px 0 0" }}>{project.blurb}</p>
        <div style={{ marginTop: 22 }}><V3Metrics project={project} size="sm" /></div>

        {/* current step detail */}
        <div key={step} className="pv-fade" style={{ marginTop: "auto", paddingTop: 24 }}>
          <div className="pv-eyebrow" style={{ color: "var(--signal)", marginBottom: 12 }}>
            Step {String(step + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} — {project.journey.label}
          </div>
          <div className="pv-italic" style={{ fontSize: 24, color: "var(--fg)", letterSpacing: "-0.025em", lineHeight: 1.1 }}>{cur.title}</div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--fg-dim)", margin: "12px 0 0" }}>{cur.sub}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 16 }}>
            {techList.map((t) => (
              <span key={t} style={{ fontSize: 10.5, letterSpacing: "0.04em", color: "var(--signal)", padding: "4px 9px", border: "1px solid var(--signal)" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* scrubber */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 26 }}>
          <button className="pv-navbtn" style={{ borderRadius: "50%", width: 30, height: 30 }} onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Play"}>
            {playing
              ? <svg width="10" height="10" viewBox="0 0 11 11" fill="currentColor"><rect x="2" y="1.5" width="2.4" height="8" /><rect x="6.6" y="1.5" width="2.4" height="8" /></svg>
              : <svg width="10" height="10" viewBox="0 0 11 11" fill="currentColor"><path d="M2.5 1.5l7 4-7 4z" /></svg>}
          </button>
          <div style={{ position: "relative", flex: 1, height: 24, display: "flex", alignItems: "center" }}>
            <div className="pv-dotline" style={{ position: "absolute", left: 0, right: 0 }} />
            <div style={{ position: "absolute", left: 0, height: 1, background: "var(--signal)", width: `${(step / (n - 1)) * 100}%`, transition: "width .6s cubic-bezier(.2,.7,.2,1)" }} />
            <div style={{ position: "absolute", left: 0, right: 0, display: "flex", justifyContent: "space-between" }}>
              {steps.map((s, idx) => (
                <button key={idx} onClick={() => pick(idx)} style={{ appearance: "none", border: "none", background: "transparent", cursor: "pointer", padding: 0, width: 13, height: 13, borderRadius: "50%", display: "grid", placeItems: "center" }} aria-label={s.title}>
                  <span style={{ width: idx <= step ? 8 : 5, height: idx <= step ? 8 : 5, borderRadius: "50%", background: idx <= step ? "var(--signal)" : "var(--bg)", border: "1.5px solid", borderColor: idx <= step ? "var(--signal)" : "var(--fg-mute)", transition: "all .3s", boxShadow: idx === step ? "0 0 8px var(--signal)" : "none" }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── right column: product demo ── */}
      <div style={{ minWidth: 0 }}>
        <V3Demo project={project} caption={`Now: ${cur.title}`} />
      </div>
    </div>
  );
}

function V3Journey() {
  return (
    <V3Shell eyebrow="Selected work" background={(p) => <V3Demo project={p} variant="ambient" />}>
      {(p) => <V3Body project={p} />}
    </V3Shell>
  );
}
window.V3Journey = V3Journey;
