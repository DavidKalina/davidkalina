'use client';

import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Share2, Users, Loader2, CheckCircle, Zap } from 'lucide-react';
import CameraCaptureFrame from './CameraCaptureFrame';

const MapMojiHowItWorks = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);

    // Auto-advance frames every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame((prev) => (prev + 1) % 4);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const steps = [
        {
            icon: Camera,
            title: "Scan & Capture",
            description: "Use your camera to scan QR codes or capture location-based events happening around you.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: MapPin,
            title: "Save & Tag",
            description: "Automatically save events to your personal map with custom emoji tags and descriptions.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: Share2,
            title: "Share & Connect",
            description: "Share your discoveries with friends and connect with others at the same events.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Users,
            title: "Build Community",
            description: "Create and join communities around shared interests and locations.",
            color: "from-orange-500 to-red-500"
        }
    ];

    const frames = [
        {
            title: "Frame 1: Capturing Image",
            content: <CameraCaptureFrame />
        },
        {
            title: "Frame 2: Processing Image",
            content: (
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="relative inline-block">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                                <Loader2 size={32} className="text-white animate-spin" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white font-mono mt-4">
                            ⚙️ Processing Data
                        </h3>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                                <p className="font-mono text-sm text-white/90">OCR Processing</p>
                                <div className="w-16 bg-white/20 rounded-full h-2">
                                    <div className="bg-green-400 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                                <p className="font-mono text-sm text-white/90">Event Classification</p>
                                <div className="w-16 bg-white/20 rounded-full h-2">
                                    <div className="bg-blue-400 h-2 rounded-full animate-pulse" style={{ width: '45%' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                                <p className="font-mono text-sm text-white/90">Metadata Extraction</p>
                                <div className="w-16 bg-white/20 rounded-full h-2">
                                    <div className="bg-purple-400 h-2 rounded-full animate-pulse" style={{ width: '90%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Frame 3: Job Queue / Worker",
            content: (
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="relative inline-block">
                            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                                <Zap size={32} className="text-white animate-pulse" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white font-mono mt-4">
                            🔄 Worker Queue
                        </h3>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-3 border border-green-400/30">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <p className="font-mono text-sm text-white/90">Worker #3</p>
                                </div>
                                <p className="font-mono text-xs text-green-400">Processing</p>
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                    <p className="font-mono text-sm text-white/90">Worker #7</p>
                                </div>
                                <p className="font-mono text-xs text-yellow-400">Queued</p>
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    <p className="font-mono text-sm text-white/90">Worker #12</p>
                                </div>
                                <p className="font-mono text-xs text-blue-400">Idle</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-3 border border-purple-400/30">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle size={16} className="text-purple-400" />
                                    <p className="font-mono text-sm text-white/90">Event Created</p>
                                </div>
                                <p className="font-mono text-xs text-purple-400">Complete</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Frame 4: Event on Map",
            content: (
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="relative inline-block">
                            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                                <MapPin size={32} className="text-white" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white font-mono mt-4">
                            🗺️ Event Live on Map
                        </h3>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-3 border border-orange-400/30">
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-2xl">🎪</span>
                                <div>
                                    <p className="font-mono text-sm font-bold text-white">Street Festival</p>
                                    <p className="font-mono text-xs text-white/70">2 blocks away</p>
                                </div>
                            </div>
                            <p className="font-mono text-xs text-white/80">Live music, food trucks, art displays</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-xl">🎨</span>
                                <div>
                                    <p className="font-mono text-sm font-bold text-white">Art Gallery Opening</p>
                                    <p className="font-mono text-xs text-white/70">0.5 miles away</p>
                                </div>
                            </div>
                            <p className="font-mono text-xs text-white/80">Contemporary art exhibition</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-xl">🍕</span>
                                <div>
                                    <p className="font-mono text-sm font-bold text-white">Food Truck Rally</p>
                                    <p className="font-mono text-xs text-white/70">1.2 miles away</p>
                                </div>
                            </div>
                            <p className="font-mono text-xs text-white/80">International cuisine festival</p>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
                {/* Section Header */}
                <div className="flex items-center gap-4 lg:gap-6 mb-8 lg:mb-16">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 lg:p-4 rounded-xl lg:rounded-2xl">
                        <Camera size={20} className="text-white lg:hidden" />
                        <Camera size={24} className="text-white hidden lg:block" />
                    </div>
                    <div>
                        <p className="md:text-sm lg:md:text-md font-mono text-gray-400 mb-1">
                            03 / HOW IT WORKS
                        </p>
                        <h2 className="text-2xl lg:text-3xl font-mono font-bold text-white">
                            How MapMoji Works 🚀
                        </h2>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left Column - Steps */}
                    <div className="space-y-6 lg:space-y-8">
                        <div className="space-y-4 lg:space-y-6">
                            <h3 className="font-mono text-lg lg:text-xl font-bold text-white">
                                Simple 4-Step Process
                            </h3>
                            <p className="font-mono md:text-md lg:text-base text-gray-300 leading-relaxed">
                                MapMoji makes discovering and sharing local events as easy as taking a photo. Follow these simple steps to start exploring your world.
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="space-y-6">
                            {steps.map((step, index) => {
                                const IconComponent = step.icon;
                                return (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center text-white font-bold text-lg mt-1`}>
                                            {index + 1}
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-3">
                                                <IconComponent size={20} className="text-gray-400" />
                                                <h4 className="font-mono md:text-md font-bold text-white">
                                                    {step.title}
                                                </h4>
                                            </div>
                                            <p className="font-mono md:text-sm lg:md:text-md text-gray-300 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column - Animated Process */}
                    <div
                        className="relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 transform hover:scale-[1.02] transition-all duration-500 ease-out"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Gradient Overlay */}
                        <div
                            className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.08),rgba(255,255,255,0))] transition-opacity duration-500 rounded-2xl lg:rounded-3xl ${isHovered ? "opacity-100" : "opacity-0"
                                }`}
                        />

                        {/* Frame Indicator */}
                        <div className="absolute top-4 right-4 flex space-x-1">
                            {[0, 1, 2, 3].map((index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentFrame === index
                                        ? 'bg-white scale-125'
                                        : 'bg-white/30'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Animated Content */}
                        <div className="relative z-10">
                            <div className="min-h-[400px] flex items-center justify-center">
                                <div className="w-full animate-fadeIn">
                                    {frames[currentFrame].content}
                                </div>
                            </div>
                        </div>

                        {/* Floating emojis */}
                        <div className="absolute -top-4 -right-4 text-4xl animate-bounce">📸</div>
                        <div className="absolute -bottom-4 -left-4 text-3xl animate-pulse">🎪</div>
                        <div className="absolute top-1/2 -right-8 text-2xl animate-spin" style={{ animationDuration: '4s' }}>✨</div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </section>
    );
};

export default MapMojiHowItWorks; 