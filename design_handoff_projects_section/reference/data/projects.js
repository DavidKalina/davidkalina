/* Real project data, transcribed from constants/projectGrid.ts.
   Exposed on window for the babel variation scripts. */
window.PV_SECTION = {
  line1: "Recent",
  accent: "work.",
  paragraph:
    "Compact case studies on what I built, how I built it, and the impact it had.",
};

window.PV_PROJECTS = [
  {
    num: "01",
    year: "2025",
    title: "AI Document Processing Pipeline",
    client: "Eel Data Systems",
    role: "Full-stack — pipeline, infra, GraphQL API",
    blurb:
      "AI-powered pipeline for TMS software saving $2k+ a month. Extracts structured data from shipping documents in a non-blocking, asynchronous workflow.",
    metrics: [
      ["Token cost", "1/50th"],
      ["Saved annually", "$20k+"],
      ["Uses per day", "100s"],
    ],
    stack: ["Vue", "Express", "SQS", "AWS Lambda", "Vercel AI SDK", "Terraform"],
    tech: [
      { label: "Vue", role: "CLIENT", glyph: "▲",
        body: "PDF upload form, job status polling, and the <b>auto-fill</b> flow that saves operators hours of manual entry." },
      { label: "Express", role: "API", glyph: "■",
        body: "Plain REST — endpoints for upload, poll, and hydrate. Form fills the moment the worker finishes writing." },
      { label: "SQS", role: "QUEUE", glyph: "◆",
        body: "Upload writes a job row, drops a message, returns in <b>milliseconds</b>. Heavy work happens off the request path." },
      { label: "AWS Lambda", role: "WORKER", glyph: "●",
        body: "Consumes the queue. Rasterizes the PDF with <b>Ghostscript</b>, calls the AI SDK, writes results back to the DB." },
      { label: "Vercel AI SDK", role: "EXTRACTION", glyph: "✦",
        body: "<b>Structured outputs</b> turn the page image into typed shipment JSON. No regex, no fragile templates." },
      { label: "Terraform", role: "INFRA", glyph: "⬟",
        body: "Whole stack as code. Remote state in <b>S3</b>, apply gated behind a <b>GitHub Actions</b> runner — no one ships from a laptop." },
    ],
    journey: {
      label: "Upload → auto-filled form",
      steps: [
        { title: "Upload PDF", sub: "Operator drops a shipping document into the web app.", tech: "Vue" },
        { title: "Job queued", sub: "Record written, SQS message fired, response returns instantly.", tech: "SQS · Express" },
        { title: "Worker picks up", sub: "Lambda pulls the message and rasterizes the PDF via Ghostscript.", tech: "AWS Lambda" },
        { title: "AI extracts fields", sub: "Page image in, structured shipment JSON out.", tech: "Vercel AI SDK" },
        { title: "Form auto-fills", sub: "Frontend poll resolves; extracted data populates the operator's form.", tech: "Vue · Express" },
      ],
    },
    status: { primary: "SHIPPED · 1/50TH TOKEN COST", secondary: "role: full-stack · pipeline + infra + api" },
    links: [{ label: "app.cudacartagetms.com", href: "https://app.cudacartagetms.com" }],
  },
  {
    num: "02",
    year: "2026",
    title: "Side Quests",
    client: "Independent",
    role: "Sole developer — design, architecture, implementation",
    blurb:
      "Mobile app that turns real-world venues and activities into digital 'side quests' that challenge people to step out of their comfort zone and help them build a life they respect.",
    metrics: [],
    stack: ["React Native", "TypeScript", "OpenAI", "MCP", "Google Places", "Redis"],
    tech: [
      { label: "React Native", role: "CLIENT", glyph: "▲",
        body: "Quest card stack, check-in flow, <b>streak calendar</b>. Expo + Reanimated for low-friction micro-interactions." },
      { label: "TypeScript", role: "LANGUAGE", glyph: "■",
        body: "Language of the entire <b>monorepo</b> — app, agent, tools, shared types. One toolchain top to bottom." },
      { label: "OpenAI", role: "PLANNER", glyph: "✦",
        body: "Onboarding interviewer + quest generator tuned to energy level. <b>MCP</b> exposes places.search, calendar.book, profile.recall — clean boundary between reasoning and side-effects." },
      { label: "Google Places", role: "REALITY", glyph: "◆",
        body: "Grounds every suggestion in a real venue — hours, crowd level, photos. <b>No hallucinated spots.</b>" },
      { label: "Redis", role: "CACHE", glyph: "●",
        body: "Caches Places responses per venue and query. Hot lookups skip the API entirely — <b>trimming spend</b> on repeat suggestions." },
    ],
    journey: {
      label: "7 min first session",
      steps: [
        { title: "Guided onboarding", sub: "Agent asks about interests, comfort zone, energy.", tech: "OpenAI · React Native" },
        { title: "Quest proposed", sub: "'Walk past the Sunday market. Stay 10 min. No need to buy.'", tech: "OpenAI · MCP" },
        { title: "Grounded in real venue", sub: "Hours, photos, and walking time from Places — hot venues served from Redis.", tech: "Google Places · Redis" },
        { title: "Low-pressure check-in", sub: "One tap. How'd it feel? 1–5.", tech: "React Native" },
        { title: "Next quest adapts", sub: "Agent tunes difficulty based on feedback + streak.", tech: "OpenAI · TypeScript" },
      ],
    },
    status: { primary: "BUILDING · TESTFLIGHT BETA APR 2026", secondary: "role: solo · design + eng + ai" },
    links: [],
  },
];
