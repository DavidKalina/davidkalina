'use client';

import React, { useState } from 'react';
import { Globe, Shield, Zap } from 'lucide-react';
import { aboutContent } from '../data/aboutContent';

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
                            {aboutContent.header.sectionNumber}
                        </p>
                        <h2 className="text-2xl lg:text-3xl font-mono font-bold text-white">
                            {aboutContent.header.title}
                        </h2>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left Column - Main Content */}
                    <div className="space-y-6 lg:space-y-8">
                        <div className="space-y-4 lg:space-y-6">
                            <h3 className="font-mono text-lg lg:text-xl font-bold text-white">
                                {aboutContent.mainContent.title}
                            </h3>
                            <div className="space-y-4">
                                {aboutContent.mainContent.description.map((paragraph, index) => (
                                    <p key={index} className="font-mono md:text-md lg:text-base text-gray-300 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Key Points */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {aboutContent.keyPoints.map((point, index) => {
                                const IconComponent = point.icon === 'Zap' ? Zap : Shield;
                                const iconColor = point.icon === 'Zap' ? 'text-blue-400' : 'text-purple-400';

                                return (
                                    <div key={index} className="space-y-2">
                                        <IconComponent size={18} className={`${iconColor} lg:hidden`} />
                                        <IconComponent size={20} className={`${iconColor} hidden lg:block`} />
                                        <p className="font-mono md:text-md font-bold text-white">
                                            {point.title}
                                        </p>
                                        <p className="font-mono md:text-sm lg:md:text-md text-gray-300">
                                            {point.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Technology Stack */}
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-1">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white font-mono mb-2">
                                        {aboutContent.technology.title}
                                    </h3>
                                    <p className="text-gray-300 font-mono">
                                        {aboutContent.technology.description}
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
                                    {aboutContent.mission.title}
                                </p>
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4">🗺️</div>
                                        <h3 className="text-2xl font-bold text-white font-mono">
                                            {aboutContent.mission.subtitle}
                                        </h3>
                                    </div>
                                    <p className="font-mono md:text-md lg:text-base text-white/80">
                                        {aboutContent.mission.description}
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="space-y-4">
                                <p className="font-mono md:text-sm lg:md:text-md text-white/90">
                                    {aboutContent.stats.title}
                                </p>
                                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                                    {aboutContent.stats.metrics.map((metric, index) => {
                                        const colorClasses = {
                                            blue: 'text-blue-400',
                                            purple: 'text-purple-400',
                                            green: 'text-green-400',
                                            orange: 'text-orange-400'
                                        };

                                        return (
                                            <div key={index} className="bg-gradient-to-r from-[#333] to-zinc-700 rounded-xl lg:rounded-2xl p-4 lg:p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-125">
                                                <div className="text-center">
                                                    <div className={`text-3xl font-bold ${colorClasses[metric.color as keyof typeof colorClasses]} font-mono`}>
                                                        {metric.value}
                                                    </div>
                                                    <div className="text-sm text-white/80 font-mono">
                                                        {metric.label}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
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