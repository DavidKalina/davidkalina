'use client';

import { useEffect } from 'react';

interface PerformanceOptimizerProps {
    preloadUrls?: string[];
    prefetchUrls?: string[];
}

const PerformanceOptimizer = ({
    preloadUrls = [],
    prefetchUrls = []
}: PerformanceOptimizerProps) => {
    useEffect(() => {
        // Preload critical resources
        preloadUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = url;
            link.as = 'fetch';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });

        // Prefetch non-critical resources
        prefetchUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        });

        // DNS prefetch for external domains
        const externalDomains = [
            '//api.mapbox.com',
            '//fonts.googleapis.com',
            '//fonts.gstatic.com',
        ];

        externalDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });

        // Preconnect to critical external domains
        const criticalDomains = [
            '//api.mapbox.com',
        ];

        criticalDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            document.head.appendChild(link);
        });

        // Performance monitoring
        if (typeof window !== 'undefined' && 'performance' in window) {
            // Monitor Core Web Vitals
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'navigation') {
                        const navEntry = entry as PerformanceNavigationTiming;
                        console.log('Navigation timing:', {
                            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
                            loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
                            totalTime: navEntry.loadEventEnd - navEntry.fetchStart,
                        });
                    }
                }
            });

            observer.observe({ entryTypes: ['navigation', 'paint'] });

            return () => {
                observer.disconnect();
            };
        }
    }, [preloadUrls, prefetchUrls]);

    return null; // This component doesn't render anything
};

export default PerformanceOptimizer; 