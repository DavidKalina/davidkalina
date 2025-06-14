import * as LucideIcons from 'lucide-react';

// Type for available Lucide icons
type LucideIconName = keyof typeof LucideIcons;

// Type for key point with type-safe icon
interface KeyPoint {
    icon: LucideIconName;
    title: string;
    description: string;
}

// Type for metric with type-safe color
interface Metric {
    value: string;
    label: string;
    color: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'yellow' | 'gray' | 'pink' | 'indigo' | 'cyan' | 'emerald' | 'sky';
}

// Type for the entire about content
interface AboutContent {
    header: {
        sectionNumber: string;
        title: string;
    };
    mainContent: {
        title: string;
        description: string[];
    };
    keyPoints: KeyPoint[];
    technology: {
        title: string;
        description: string;
    };
    mission: {
        title: string;
        subtitle: string;
        description: string;
    };
    stats: {
        title: string;
        metrics: Metric[];
    };
}

export const aboutContent: AboutContent = {
    header: {
        sectionNumber: "02 / ABOUT",
        title: "About MapMoji 🌍"
    },
    mainContent: {
        title: "There's more to your location than meets the eye",
        description: [
            "A lot of events don't appear on major event-discovery platforms. What if there were an app that enabled you to discovery events hidden in every nook and cranny of the world?",
            "MapMoji is a revolutionary mapping platform that utilizes the power of AI to discover events hidden in every nook and cranny of the world and share them with others in real-time.",
            "Simply snap a photo of an event, let the AI analyze it, and have it appear on the map for others to see."
        ]
    },
    keyPoints: [
        {
            icon: "Zap",
            title: "AI Classification",
            description: "Advanced AI automatically analyzes and categorizes events from photos, making discovery effortless and accurate."
        },
        {
            icon: "Clock",
            title: "Real-Time Events",
            description: "See events happening around you in real-time with live updates and instant notifications."
        },
        {
            icon: "Search",
            title: "Robust Search",
            description: "Powerful search capabilities with filters for location, category, time, and personal preferences."
        },
        {
            icon: "Users",
            title: "Friend's Events",
            description: "Discover what events your friends have saved and join them for shared experiences."
        },
        {
            icon: "CheckCircle",
            title: "RSVP to Events",
            description: "Easily RSVP to events, manage your schedule, and coordinate with friends seamlessly."
        },
        {
            icon: "Target",
            title: "Show up",
            description: "Get directions, arrive on time, and make the most of every event with integrated navigation and reminders."
        }
    ],
    technology: {
        title: "Modern Technology",
        description: "Built with React, Next.js, and Mapbox for optimal performance and beautiful visualizations."
    },
    mission: {
        title: "Our Mission",
        subtitle: "Another tool to get out into the world",
        description: "We want to leverage the power of modern technology to help people get out there and do people things"
    },
    stats: {
        title: "Key Metrics",
        metrics: [
            {
                value: "100%",
                label: "Real-time Events",
                color: "blue"
            },
            {
                value: "24/7",
                label: "Discovery",
                color: "purple"
            },
            {
                value: "0",
                label: "Barriers to Entry",
                color: "green"
            },
            {
                value: "∞",
                label: "Connections Made",
                color: "orange"
            }
        ]
    }
}; 