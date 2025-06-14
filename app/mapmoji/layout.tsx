import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';

const spaceMono = Space_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-space-mono',
});

export const metadata: Metadata = {
    title: 'MapMoji - A Third Space in Your Pocket | Event Discovery Platform',
    description: 'Discover hidden events and third spaces around you with MapMoji. AI-powered event discovery platform that lets you scan, save, and share local events in real-time.',
    keywords: [
        'MapMoji',
        'event discovery',
        'local events',
        'AI mapping',
        'third spaces',
        'event platform',
        'real-time events',
        'location-based',
        'social mapping',
        'event sharing'
    ],
    authors: [{ name: 'MapMoji Team' }],
    creator: 'MapMoji',
    publisher: 'MapMoji',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://davidkalina.com'),
    alternates: {
        canonical: '/mapmoji',
    },
    openGraph: {
        title: 'MapMoji - A Third Space in Your Pocket',
        description: 'Discover hidden events and third spaces around you with MapMoji. AI-powered event discovery platform.',
        url: 'https://davidkalina.com/mapmoji',
        siteName: 'MapMoji',
        images: [
            {
                url: '/mapmoji-og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'MapMoji - Event Discovery Platform',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'MapMoji - A Third Space in Your Pocket',
        description: 'Discover hidden events and third spaces around you with MapMoji. AI-powered event discovery platform.',
        images: ['/mapmoji-og-image.jpg'],
        creator: '@mapmoji',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
};

// Structured data for better SEO
const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MapMoji',
    description: 'AI-powered event discovery platform that lets you discover hidden events and third spaces around you.',
    applicationCategory: 'SocialNetworkingApplication',
    operatingSystem: 'iOS',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
    author: {
        '@type': 'Organization',
        name: 'MapMoji',
    },
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '150',
    },
    featureList: [
        'AI-powered event classification',
        'Real-time event discovery',
        'Location-based search',
        'Social event sharing',
        'QR code integration',
        'Interactive mapping'
    ],
};

export default function MapMojiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <div className={spaceMono.variable}>
                {children}
            </div>
        </>
    );
} 