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
        title: "Empowering communities through intelligent civic engagement",
        description: [
            "Traditional civic engagement platforms often miss the grassroots events that truly connect communities. What if there were a platform that could capture and amplify every local gathering, from neighborhood meetings to city-wide initiatives?",
            "MapMoji is a next-generation civic engagement platform that leverages AI and real-time technology to illuminate community events and foster meaningful civic participation.",
            "From scanning local events to creating official civic gatherings, MapMoji bridges the gap between digital discovery and real-world community engagement."
        ]
    },
    keyPoints: [
        {
            icon: "Camera",
            title: "Event Scanning",
            description: "Crowd source events with the snap of a photo. The AI will automatically parse the information, generate categories, and the event will be shared with the rest of the community in real-time."
        },
        {
            icon: "BarChart3",
            title: "Analytics Dashboard",
            description: "Comprehensive analytics showing event trends, engagement metrics, and community participation insights. Track event engagement, feedback, and more."
        },
        {
            icon: "Search",
            title: "Query Insights",
            description: "Gain insights into what type of events your community is searching for to help improve resident satisfaction."
        },
        {
            icon: "Calendar",
            title: "Official Events",
            description: "Create and manage official civic events, community gatherings, and public activities with ease."
        },
        {
            icon: "Zap",
            title: "Instant Broadcasting",
            description: "Beam official events directly into the app for immediate community visibility and engagement."
        },
        {
            icon: "Users",
            title: "Civic Engagement",
            description: "Foster community connections through shared events, local initiatives, and civic participation tracking."
        }
    ],
    technology: {
        title: "Modern Technology",
        description: "Built with React, Next.js, and Mapbox for optimal performance and beautiful visualizations."
    },
    mission: {
        title: "Our Mission",
        subtitle: "Building stronger communities through civic participation",
        description: "We believe that vibrant communities are built through active civic engagement. MapMoji empowers citizens to discover, participate in, and create meaningful civic events that strengthen local connections and drive positive change."
    },
    stats: {
        title: "Community Impact",
        metrics: [
            {
                value: "100%",
                label: "Civic Events",
                color: "blue"
            },
            {
                value: "24/7",
                label: "Community Access",
                color: "purple"
            },
            {
                value: "0",
                label: "Barriers to Participation",
                color: "green"
            },
            {
                value: "∞",
                label: "Community Connections",
                color: "orange"
            }
        ]
    }
}; 