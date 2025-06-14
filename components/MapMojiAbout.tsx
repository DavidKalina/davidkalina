'use client';

import React from 'react';
import { aboutContent } from '../data/aboutContent';

const MapMojiAbout = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-space-mono mb-4">
                        About MapMoji 🌍
                    </h2>
                    <p className="text-xl text-gray-300 font-space-mono max-w-3xl mx-auto">
                        Discover the story behind the ultimate mapping experience
                    </p>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                        <h3 className="font-space-mono text-2xl font-bold text-white mb-6">
                            {aboutContent.mainContent.title}
                        </h3>
                        <div className="space-y-6">
                            {aboutContent.mainContent.description.map((paragraph, index) => (
                                <p key={index} className="font-space-mono text-base lg:text-lg text-gray-200 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-white font-space-mono mb-4">
                            {aboutContent.mission.title} 🚀
                        </h3>
                        <p className="text-gray-300 font-space-mono text-lg mb-4">
                            {aboutContent.mission.subtitle}
                        </p>
                        <p className="text-gray-300 font-space-mono text-base">
                            {aboutContent.mission.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapMojiAbout; 