// V2 — Annotated tech (what each does in the real app) + user journey column

const AnnotRow = ({ icon, label, role, body }) => (
  <div className="pc-annot">
    <div className="pc-annot-head">
      <div className="left">
        <span className="icon"><TechIcon name={icon} /></span>
        <span>{label}</span>
      </div>
      <span className="role">{role}</span>
    </div>
    <div className="pc-annot-body" dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

const JourneyStep = ({ n, title, sub, tech }) => (
  <div className="pc-step">
    <div className="n">{String(n).padStart(2, "0")}</div>
    <div className="content">
      {title}
      <span className="sub">{sub}</span>
      {tech && <span className="tech">{tech}</span>}
    </div>
  </div>
);

const V2 = ({ data }) => (
  <div className="pc-card" data-variant="v2">
    <ProjectMeta data={data} />
    <div className="pc-right">
      <div className="pc-v2">
        <div className="pc-annot-list">
          <AnnotRow
            icon="react"
            label="React Native"
            role="CLIENT"
            body="Quest card stack, check-in flow, <b>streak calendar</b>. Expo + Reanimated for low-friction micro-interactions."
          />
          <AnnotRow
            icon="ts"
            label="TypeScript"
            role="CONTRACT"
            body="<b>Zod</b> schemas shared between app and agent. One source of truth for quests, venues, and user profile."
          />
          <AnnotRow
            icon="ai"
            label="AI Agents"
            role="PLANNER"
            body="Onboarding interviewer + quest generator. Reads social anxiety profile, proposes <b>low-pressure</b> outings tuned to energy level."
          />
          <AnnotRow
            icon="mcp"
            label="MCP"
            role="TOOLS"
            body="Agent exposes <b>places.search</b>, <b>calendar.book</b>, <b>profile.recall</b> as tools. Clean boundary between reasoning and side-effects."
          />
          <AnnotRow
            icon="gp"
            label="Google Places"
            role="REALITY"
            body="Grounds every suggestion in a real venue — hours, crowd level, photos. <b>No hallucinated spots.</b>"
          />
        </div>

        <div className="pc-journey">
          <div className="pc-journey-label">USER JOURNEY · 7 min first session</div>
          <JourneyStep n={1} title="Guided onboarding" sub="Agent asks about interests, comfort zone, energy." tech="AI · React Native" />
          <JourneyStep n={2} title="Quest proposed" sub="'Walk past the Sunday market. Stay 10 min. No need to buy.'" tech="AI · MCP" />
          <JourneyStep n={3} title="Grounded in real venue" sub="Pulled hours, photos, and walking time from Places." tech="Google Places" />
          <JourneyStep n={4} title="Low-pressure check-in" sub="One tap. How'd it feel? 1–5." tech="React Native" />
          <JourneyStep n={5} title="Next quest adapts" sub="Agent tunes difficulty based on feedback + streak." tech="AI · TypeScript" />
        </div>

        <div className="pc-status">
          <div><span className="dot" />BUILDING · TESTFLIGHT BETA APR 2026</div>
          <div className="right">role: solo · design + eng + ai</div>
        </div>
      </div>
    </div>
  </div>
);

window.V2 = V2;
