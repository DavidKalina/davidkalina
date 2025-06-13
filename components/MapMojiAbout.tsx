'use client';

import React, { useState } from 'react';
import { Globe, Shield, Zap } from 'lucide-react';

const MapMojiAbout = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
                {/* Section Header */}
                <div className="flex items-center gap-4 lg:gap-6 mb-8 lg:mb-16">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 lg:p-4 rounded-xl lg:rounded-2xl">
                        <Globe size={20} className="text-white lg:hidden" />
                        <Globe size={24} className="text-white hidden lg:block" />
                    </div>
                    <div>
                        <p className="md:text-sm lg:md:text-md font-mono text-gray-400 mb-1">
                            02 / ABOUT
                        </p>
                        <h2 className="text-2xl lg:text-3xl font-mono font-bold text-white">
                            About MapMoji 🌍
                        </h2>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left Column - Main Content */}
                    <div className="space-y-6 lg:space-y-8">
                        <div className="space-y-4 lg:space-y-6">
                            <h3 className="font-mono text-lg lg:text-xl font-bold text-white">
                                Revolutionary Mapping Platform
                            </h3>
                            <div className="space-y-4">
                                <p className="font-mono md:text-md lg:text-base text-gray-300 leading-relaxed">
                                    MapMoji is a revolutionary mapping platform that combines the power of interactive maps with the fun and expressiveness of emojis. We believe that exploring the world should be both informative and delightful.
                                </p>
                                <p className="font-mono md:text-md lg:text-base text-gray-300 leading-relaxed">
                                    Built with cutting-edge technology and designed with user experience in mind, MapMoji transforms how you interact with geographic data and location-based services.
                                </p>
                            </div>
                        </div>

                        {/* Key Points */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Zap size={18} className="text-blue-400 lg:hidden" />
                                <Zap size={20} className="text-blue-400 hidden lg:block" />
                                <p className="font-mono md:text-md font-bold text-white">
                                    Interactive Experience
                                </p>
                                <p className="font-mono md:text-sm lg:md:text-md text-gray-300">
                                    Engage with maps like never before with our innovative camera animations and location-based features.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Shield size={18} className="text-purple-400 lg:hidden" />
                                <Shield size={20} className="text-purple-400 hidden lg:block" />
                                <p className="font-mono md:text-md font-bold text-white">
                                    Privacy First
                                </p>
                                <p className="font-mono md:text-sm lg:md:text-md text-gray-300">
                                    Your location data stays on your device. We believe in transparency and user privacy above all else.
                                </p>
                            </div>
                        </div>

                        {/* Technology Stack */}
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-1">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white font-mono mb-2">
                                        Modern Technology
                                    </h3>
                                    <p className="text-gray-300 font-mono">
                                        Built with React, Next.js, and Mapbox for optimal performance and beautiful visualizations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Visual Section */}
                    <div
                        className="relative bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 transform hover:scale-[1.02] transition-all duration-500 ease-out"
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
                            {/* Mission Statement */}
                            <div className="space-y-4">
                                <p className="font-mono md:text-sm lg:md:text-md text-white/90">
                                    Our Mission
                                </p>
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4">🗺️</div>
                                        <h3 className="text-2xl font-bold text-white font-mono">
                                            Geographic Exploration Made Fun
                                        </h3>
                                    </div>
                                    <p className="font-mono md:text-md lg:text-base text-white/80">
                                        To make geographic exploration accessible, engaging, and fun for everyone through innovative technology and beautiful design.
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="space-y-4">
                                <p className="font-mono md:text-sm lg:md:text-md text-white/90">
                                    Key Metrics
                                </p>
                                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                                    <div className="bg-gradient-to-r from-[#333] to-zinc-700 rounded-xl lg:rounded-2xl p-4 lg:p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-125">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-blue-400 font-mono">100%</div>
                                            <div className="text-sm text-white/80 font-mono">Privacy Focused</div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-[#333] to-zinc-700 rounded-xl lg:rounded-2xl p-4 lg:p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-125">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-purple-400 font-mono">24/7</div>
                                            <div className="text-sm text-white/80 font-mono">Available</div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-[#333] to-zinc-700 rounded-xl lg:rounded-2xl p-4 lg:p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-125">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-400 font-mono">0</div>
                                            <div className="text-sm text-white/80 font-mono">Registration Required</div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-[#333] to-zinc-700 rounded-xl lg:rounded-2xl p-4 lg:p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-125">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-orange-400 font-mono">∞</div>
                                            <div className="text-sm text-white/80 font-mono">Possibilities</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating emojis */}
                        <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🚀</div>
                        <div className="absolute -bottom-4 -left-4 text-3xl animate-pulse">🎯</div>
                        <div className="absolute top-1/2 -right-8 text-2xl animate-spin" style={{ animationDuration: '3s' }}>🌟</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapMojiAbout; 