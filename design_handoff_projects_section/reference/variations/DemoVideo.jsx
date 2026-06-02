/* DemoVideo — a placeholder product "screen recording" that reads as a SaaS
   walkthrough: window chrome, an auto-filling form loop, shimmer sweep, and a
   scrubbing progress bar. variant="panel" = crisp framed demo on the right;
   variant="ambient" = big blurred dim wash for the background.
   Swap .demo-stage for a real <video> later. Exposes DemoVideo on window. */

function DemoVideo({ project, caption, variant = "panel" }) {
  const host = (project.links && project.links[0] && project.links[0].label)
    || (project.title.toLowerCase().replace(/[^a-z]+/g, "") + ".app");
  // row value widths for visual variety
  const rows = [62, 84, 48, 73, 90];

  const frame = (
    <div className="demo-frame">
      <div className="demo-bar">
        <div className="demo-dots"><i /><i /><i /></div>
        <div className="demo-urlchip">{host}</div>
        <div className="demo-rec"><b />LIVE</div>
      </div>
      <div className="demo-stage">
        <div className="demo-nav"><span /><span /><span /><span /><span /></div>
        <div className="demo-main">
          <div className="demo-mainhead"><b /><em /></div>
          {rows.map((w, i) => (
            <div className="demo-row" key={i}>
              <div className="lab" />
              <div className="val" style={{ "--w": w + "%" }} />
            </div>
          ))}
          <div className="demo-scan" />
          <div className="demo-shimmer" />
          <div className="demo-vignette" />
          {variant === "panel" && caption && (
            <div className="demo-caption"><b />{caption}</div>
          )}
        </div>
      </div>
      <div className="demo-progress">
        <span className="play">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><rect x="1.5" y="1" width="2.2" height="8" /><rect x="6.3" y="1" width="2.2" height="8" /></svg>
        </span>
        <div className="demo-track"><i /></div>
        <span className="demo-time">0:14 / 0:42</span>
      </div>
    </div>
  );

  if (variant === "ambient") {
    return <div className="demo-ambient" aria-hidden="true">{frame}</div>;
  }
  return <div className="demo-tilt">{frame}</div>;
}

window.DemoVideo = DemoVideo;
