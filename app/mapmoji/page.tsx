'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';

// Dynamic imports for client components with loading fallbacks
const MapMojiHero = dynamic(() => import('@/components/MapMojiHero'), {
    loading: () => (
        <section className="relative w-full h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
            <div className="text-center">
                <div className="text-6xl md:text-8xl font-bold text-white font-space-mono mb-4 animate-pulse">
                    MapMoji
                </div>
                <p className="text-xl md:text-2xl text-gray-300 font-space-mono">
                    Loading your world...
                </p>
            </div>
        </section>
    ),
});

const MapMojiAbout = dynamic(() => import('@/components/MapMojiAbout'), {
    loading: () => (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-space-mono mb-4">
                        About MapMoji 🌍
                    </h2>
                    <div className="animate-pulse bg-gray-700 h-6 rounded max-w-3xl mx-auto"></div>
                </div>
            </div>
        </section>
    ),
});

const MapMojiFeatures = dynamic(() => import('@/components/MapMojiFeatures'), {
    loading: () => (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-space-mono mb-4">
                        Powerful Features 🚀
                    </h2>
                    <div className="animate-pulse bg-gray-700 h-6 rounded max-w-3xl mx-auto"></div>
                </div>
            </div>
        </section>
    ),
});

const MapMojiContact = dynamic(() => import('@/components/MapMojiContact'), {
    loading: () => (
        <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-space-mono mb-4">
                        Scan to Connect 📱
                    </h2>
                    <div className="animate-pulse bg-gray-700 h-6 rounded max-w-3xl mx-auto"></div>
                </div>
            </div>
        </section>
    ),
});

// Client component for interactive content
const MapMojiLandingPage = () => {
    return (
        <>
            {/* Performance optimization */}
            <PerformanceOptimizer
                preloadUrls={[
                    '/api/events',
                    'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js',
                ]}
                prefetchUrls={[
                    'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap',
                ]}
            />

            <Suspense fallback={
                <section className="relative w-full h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-6xl md:text-8xl font-bold text-white font-space-mono mb-4 animate-pulse">
                            MapMoji
                        </div>
                        <p className="text-xl md:text-2xl text-gray-300 font-space-mono">
                            Loading your world...
                        </p>
                    </div>
                </section>
            }>
                <MapMojiHero />
            </Suspense>

            <Suspense fallback={
                <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white font-space-mono mb-4">
                                About MapMoji 🌍
                            </h2>
                            <div className="animate-pulse bg-gray-700 h-6 rounded max-w-3xl mx-auto"></div>
                        </div>
                    </div>
                </section>
            }>
                <MapMojiAbout />
            </Suspense>

            <Suspense fallback={
                <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white font-space-mono mb-4">
                                Powerful Features 🚀
                            </h2>
                            <div className="animate-pulse bg-gray-700 h-6 rounded max-w-3xl mx-auto"></div>
                        </div>
                    </div>
                </section>
            }>
                <MapMojiFeatures />
            </Suspense>

            <Suspense fallback={
                <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-space-mono mb-4">
                                Scan to Connect 📱
                            </h2>
                            <div className="animate-pulse bg-gray-700 h-6 rounded max-w-3xl mx-auto"></div>
                        </div>
                    </div>
                </section>
            }>
                <MapMojiContact />
            </Suspense>
        </>
    );
};

export default MapMojiLandingPage;