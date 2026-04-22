// V1 — ASCII architecture diagram under the chips
// Shows data flow: user -> React Native UI -> AI Agent -> MCP tools -> Google Places -> back

const ArchAscii = () => {
  // Using grid chars. Keep monospace alignment tight.
  return (
<pre className="pc-ascii">
{`  ┌──────────────────────┐        ┌───────────────────────┐        ┌──────────────────────┐
  │ `}<span className="blue">React Native</span>{`         │        │ `}<span className="accent">AI Agent</span>{`  `}<span className="faint">(loop)</span>{`    │        │ `}<span className="dim">Google Places</span>{`        │
  │ ·  onboarding quiz   │  ───▶  │ ·  plan next quest    │  ───▶  │ ·  nearby venues     │
  │ ·  quest card stack  │        │ ·  call MCP tools     │        │ ·  hours · ratings   │
  │ ·  check-in + streak │  ◀───  │ ·  adapt to feedback  │  ◀───  │ ·  photos · geo      │
  └──────────┬───────────┘        └──────────┬────────────┘        └──────────────────────┘
             │                               │
             │  `}<span className="faint">typed payloads</span>{`               │  `}<span className="faint">tool protocol</span>{`
             ▼                               ▼
  ┌──────────────────────┐        ┌───────────────────────┐
  │ `}<span className="ts">TypeScript</span>{`           │        │ `}<span className="accent">MCP Server</span>{`            │
  │ ·  zod schemas       │        │ ·  places.search      │
  │ ·  shared models     │        │ ·  calendar.book      │
  │ ·  end-to-end types  │        │ ·  profile.recall     │
  └──────────────────────┘        └───────────────────────┘`}
</pre>
  );
};

const V1 = ({ data }) => (
  <div className="pc-card" data-variant="v1">
    <ProjectMeta data={data} />
    <div className="pc-right">
      <div className="pc-v1">
        <Chip icon="react" label="React Native" className="chip-rn" />
        <Chip icon="ts" label="TypeScript" className="chip-ts" />
        <Chip icon="gp" label="Google Places" className="chip-gp" />
        <Chip icon="ai" label="AI Agents" className="chip-ai" />
        <Chip icon="mcp" label="MCP" className="chip-mcp" />

        <div className="pc-arch">
          <div className="pc-arch-label">ARCHITECTURE · data flow</div>
          <ArchAscii />
        </div>

        <div className="pc-status">
          <div><span className="dot" />BUILDING · TESTFLIGHT BETA APR 2026</div>
          <div className="right">v0.4.2 · sf bay area pilot</div>
        </div>
      </div>
    </div>
  </div>
);

window.V1 = V1;
