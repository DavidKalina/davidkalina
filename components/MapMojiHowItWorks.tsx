'use client';

import React, { useState } from 'react';
import { Camera, MapPin, Share2, Users } from 'lucide-react';

const MapMojiHowItWorks = () => {
    const [isHovered, setIsHovered] = useState(false);

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

                    {/* Right Column - Visual Section */}
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

                        {/* Content */}
                        <div className="relative z-10 space-y-8 lg:space-y-12">
                            {/* Demo Process */}
                            <div className="space-y-4">
                                <p className="font-mono md:text-sm lg:md:text-md text-white/90">
                                    Demo Process
                                </p>
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4">📱</div>
                                        <h3 className="text-2xl font-bold text-white font-mono">
                                            Your Phone, Your World
                                        </h3>
                                    </div>
                                    <p className="font-mono md:text-md lg:text-base text-white/80">
                                        Everything you need is right in your pocket. No complicated setup, no registration required - just point, scan, and explore.
                                    </p>
                                </div>
                            </div>

                            {/* Features Highlight */}
                            <div className="space-y-4">
                                <p className="font-mono md:text-sm lg:md:text-md text-white/90">
                                    Key Features
                                </p>
                                <div className="grid grid-cols-1 gap-3 lg:gap-4">
                                    <div className="bg-gradient-to-r from-[#333] to-zinc-700 rounded-xl lg:rounded-2xl p-4 lg:p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-125">
                                        <p className="font-mono md:text-md text-white">🎯 Real-time location tracking</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-[#333] to-zinc-700 rounded-xl lg:rounded-2xl p-4 lg:p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-125">
                                        <p className="font-mono md:text-md text-white">🔒 Privacy-first design</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-[#333] to-zinc-700 rounded-xl lg:rounded-2xl p-4 lg:p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-125">
                                        <p className="font-mono md:text-md text-white">⚡ Instant event discovery</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-[#333] to-zinc-700 rounded-xl lg:rounded-2xl p-4 lg:p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-125">
                                        <p className="font-mono md:text-md text-white">🌍 Global community access</p>
                                    </div>
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
        </section>
    );
};

export default MapMojiHowItWorks; 