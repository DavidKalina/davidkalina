export const PROJECT_CONSTANTS = {
  section: {
    number: "003",
    title: "MapMoji | Event Discovery",
  },
  project: {
    techStack: "REACT NATIVE · TYPESCRIPT · DOCKER · REDIS · BUN · PSQL · AI · WEBSOCKETS",
    heading: {
      line1: "Next Gen",
      line2: "mobile app",
    },
    badges: [
      {
        text: "LLM-POWERED",
      },
      {
        text: "GOOGLE PLACES API",
      },
      {
        text: "REAL-TIME",
      },
    ],
    description:
      "A next-gen mobile app that revolutionizes the way people discover and attend events. Simply snap a photo of an event flyer, and the app will utilize AI to determine the details and the Google Places API will find the best location for the event. All of this is done in real-time.",
    stats: [
      {
        value: "Modern",
        label: "UI/UX",
      },
      {
        value: "Real-Time",
        label: "Search",
      },
      {
        value: "Map",
        label: "Integration",
      },
    ],
    links: {
      source: {
        text: "SOURCE",
        url: "https://github.com/DavidKalina/realtime-markers-demo",
      },
    },
  },
} as const;
