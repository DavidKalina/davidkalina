'use client';

import React, { useState, useEffect, useRef } from 'react';
import Map, { ViewState, MapRef, Marker as MapboxMarker } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapMojiMarker, Marker } from './MapMojiMarker';

// Custom hook for camera animation around user location
const useCameraAnimation = (mapRef: React.RefObject<MapRef | null>, userLocation: [number, number] | null, radiusMiles: number = 5) => {
    const animationRef = useRef<number>(0);
    const isAnimatingRef = useRef<boolean>(false);

    const startAnimation = React.useCallback(() => {
        if (!mapRef.current || !userLocation) return;

        const map = mapRef.current.getMap();
        if (!map || isAnimatingRef.current) return;

        // Set the map center to user location
        map.setCenter(userLocation);

        // Set appropriate zoom and pitch for the radius
        const zoomLevel = Math.max(12, 16 - Math.log2(radiusMiles));
        map.setZoom(zoomLevel);
        map.setPitch(45);

        isAnimatingRef.current = true;

        const rotateCamera = (timestamp: number) => {
            if (!isAnimatingRef.current) return;
            map.rotateTo((timestamp / 600) % 360, { duration: 0 });
            animationRef.current = requestAnimationFrame(rotateCamera);
        };

        animationRef.current = requestAnimationFrame(rotateCamera);
    }, [userLocation, radiusMiles]);

    const stopAnimation = React.useCallback(() => {
        isAnimatingRef.current = false;
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = 0;
        }
    }, []);

    useEffect(() => {
        return () => stopAnimation();
    }, [stopAnimation]);

    return { startAnimation, stopAnimation };
};

const radiusMiles = 5;

const MapMojiHero = () => {
    const mapRef = useRef<MapRef>(null);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [isLocationLoading, setIsLocationLoading] = useState(true);

    const [isLoaded, setIsLoaded] = useState(false);
    const [isMapReady, setIsMapReady] = useState(false);
    const [allMarkers, setAllMarkers] = useState<Marker[]>([]);
    const [visibleMarkers, setVisibleMarkers] = useState<Set<string>>(new Set());

    const [viewState, setViewState] = useState({
        longitude: -74.006,
        latitude: 40.7128,
        zoom: 13,
        pitch: 65,
        bearing: -180
    });

    const { startAnimation } = useCameraAnimation(mapRef, userLocation, radiusMiles);

    // Generate random markers within current map bounds
    const generateMarkersInBounds = (): Marker[] => {
        const markers: Marker[] = [];
        const emojis = ['🍕', '🎵', '☕', '🎨', '🏃', '📚', '🎭', '🍺', '🎮', '🎪', '🏖️', '🎯', '🎲', '🎸', '🎤', '🎬'];
        const titles = [
            'Pizza Night', 'Music Session', 'Coffee Meetup', 'Art Workshop',
            'Running Club', 'Book Club', 'Theater Night', 'Pub Crawl',
            'Gaming Night', 'Circus Show', 'Beach Day', 'Dart Tournament',
            'Board Games', 'Live Music', 'Karaoke Night', 'Movie Night'
        ];

        if (!userLocation) {
            console.log('User location not available');
            return markers;
        }

        // Define the radius in degrees (approximately 0.01 degrees ≈ 1km)
        const circleRadiusDegrees = 0.1; // About 10km radius

        console.log('Generating markers within circle:', {
            center: userLocation,
            radius: circleRadiusDegrees
        });

        // Generate 12 markers randomly within the circle
        for (let i = 0; i < 12; i++) {
            // Generate random angle and radius within the circle
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.sqrt(Math.random()) * circleRadiusDegrees; // Square root for uniform distribution

            // Calculate position relative to user location
            const lng = userLocation[0] + radius * Math.cos(angle);
            const lat = userLocation[1] + radius * Math.sin(angle);

            console.log(`Marker ${i} coordinates:`, [lng, lat]);

            markers.push({
                id: `marker-${i}`,
                data: {
                    emoji: emojis[i % emojis.length], // Use modulo to cycle through emojis
                    title: titles[i % titles.length], // Use modulo to cycle through titles
                    eventDate: new Date(Date.now() + (i + 1) * 60 * 60 * 1000).toISOString(),
                    endDate: new Date(Date.now() + (i + 3) * 60 * 60 * 1000).toISOString(),
                    isPrivate: Math.random() > 0.7
                },
                coordinates: [lng, lat] as [number, number]
            });
        }

        return markers;
    };

    // Simulate markers dropping onto the map
    useEffect(() => {
        if (isMapReady && userLocation) {
            const dropMarkers = () => {
                console.log('Generating markers...');
                const markers = generateMarkersInBounds();
                console.log('Generated markers:', markers);

                // Set all markers first
                setAllMarkers(markers);

                // Start with no visible markers
                setVisibleMarkers(new Set());

                // Stagger the appearance of markers
                markers.forEach((marker, index) => {
                    // Base delay: 1 second initial + 2 seconds between each marker
                    const baseDelay = index * 2000 + 1000;
                    // Add random delay between 0-3 seconds
                    const randomDelay = Math.random() * 3000;
                    const totalDelay = baseDelay + randomDelay;

                    setTimeout(() => {
                        setVisibleMarkers(prev => new Set([...prev, marker.id]));
                        console.log(`Added marker ${index}:`, marker);
                    }, totalDelay);
                });
            };

            // Add a longer delay to ensure map is fully loaded
            const timer = setTimeout(dropMarkers, 3000);
            return () => clearTimeout(timer);
        }
    }, [isMapReady, userLocation]);

    // Handle marker press
    const handleMarkerPress = (marker: Marker) => {
        console.log('Marker pressed:', marker);
        // Add your marker interaction logic here
    };

    // Get user location on component mount
    useEffect(() => {
        const getUserLocation = () => {
            if (!navigator.geolocation) {
                setLocationError('Geolocation is not supported by this browser.');
                setIsLocationLoading(false);
                return;
            }


            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { longitude, latitude } = position.coords;
                    setUserLocation([longitude, latitude]);
                    setViewState(prev => ({
                        ...prev,
                        longitude,
                        latitude
                    }));
                    setIsLocationLoading(false);
                },
                () => {
                    setLocationError('Unable to get your location. Please enable location services.');
                    setIsLocationLoading(false);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000
                }
            );
        };

        getUserLocation();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isMapReady && userLocation) {
            const timer = setTimeout(() => {
                startAnimation();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isMapReady, userLocation, startAnimation]);

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!mapboxToken) {
        return (
            <section className="relative w-full h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
                <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl mx-4">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-white font-space-mono mb-2">
                            MapMoji
                        </h1>
                        <p className="text-gray-300 font-space-mono text-sm mb-4">
                            A Third Space in Your Pocket
                        </p>
                        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                            <p className="text-yellow-200 font-space-mono text-sm">
                                ⚠️ Mapbox token not configured. Please add your Mapbox access token to <code className="bg-black/30 px-2 py-1 rounded">.env.local</code> as <code className="bg-black/30 px-2 py-1 rounded">NEXT_PUBLIC_MAPBOX_TOKEN</code>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Full-screen Mapbox map with 3D pitch and camera animation */}
            <Map
                ref={mapRef}
                {...viewState}
                onMove={(evt: { viewState: ViewState }) => setViewState(evt.viewState)}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/outdoors-v12"
                mapboxAccessToken={mapboxToken}
                attributionControl={false}
                pitchWithRotate={true}
                dragRotate={true}
                interactive={false}
                onLoad={() => {
                    setIsMapReady(true);
                }}
            >
                {/* User Location Marker (for debugging) */}
                {userLocation && (
                    <MapboxMarker
                        longitude={userLocation[0]}
                        latitude={userLocation[1]}
                        anchor="center"
                    >
                        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                    </MapboxMarker>
                )}

                {/* MapMoji Markers */}
                {allMarkers.map((marker, index) => {
                    const isVisible = visibleMarkers.has(marker.id);
                    if (!isVisible) return null;

                    console.log(`Rendering marker ${index}:`, marker);
                    return (
                        <MapboxMarker
                            key={marker.id}
                            longitude={marker.coordinates[0]}
                            latitude={marker.coordinates[1]}
                            anchor="bottom"
                        >
                            <div
                                className="animate-dropInWithShadow relative z-20"
                                style={{
                                    animationDelay: '0s', // No delay since we control timing with visibility
                                    animationFillMode: 'both',
                                }}
                            >
                                <MapMojiMarker
                                    event={marker}
                                    onPress={() => handleMarkerPress(marker)}
                                />
                            </div>
                        </MapboxMarker>
                    );
                })}
            </Map>

            {/* Dim overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-10"></div>

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20 animate-pulse-slow z-10"></div>

            {/* Hero content */}
            <div className="absolute inset-0 flex items-center justify-center p-4 z-30">
                <div className={`text-center transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h1 className={`text-6xl md:text-8xl font-bold text-white font-space-mono mb-4 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        MapMoji 🗺️
                    </h1>
                    <p className={`text-xl md:text-2xl text-gray-300 font-space-mono mb-8 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        A Third Space in Your Pocket
                    </p>

                    {/* Location Status */}
                    <div className={`transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {isLocationLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                                <p className="text-blue-300 font-space-mono text-sm">Getting your location...</p>
                            </div>
                        ) : locationError ? (
                            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 max-w-md mx-auto">
                                <p className="text-red-300 font-space-mono text-sm">{locationError}</p>
                            </div>
                        ) : userLocation ? (
                            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 max-w-md mx-auto">
                                <p className="text-green-300 font-space-mono text-sm">
                                    📍 Location captured! Animating around your area
                                </p>
                            </div>
                        ) : null}
                    </div>

                    <div className={`mt-8 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <p className="text-blue-300 font-space-mono text-lg">
                            📷 Scan • 🏷️ Save • 📤 Share
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapMojiHero; 