'use client';

import React from 'react';
import { aboutContent } from '../data/aboutContent';
import { mapMojiFeaturesContent } from '../data/mapMojiFeaturesContent';

const MapMojiFeatures = () => {
    const { emojiMap, gradientColors, header } = mapMojiFeaturesContent;

    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-space-mono mb-4">
                        {header.title}
                    </h2>
                    <p className="text-xl text-gray-300 font-space-mono max-w-3xl mx-auto">
                        {header.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {aboutContent.keyPoints.map((feature, index) => {
                        const emoji = emojiMap[feature.icon] || emojiMap.default;
                        const colorClass = gradientColors[index % gradientColors.length];

                        return (
                            <div
                                key={index}
                                className="group bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-black/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                <div className={`w-16 h-16 bg-gradient-to-r ${colorClass} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {emoji}
                                </div>
                                <h3 className="text-2xl font-bold text-white font-space-mono mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300 font-space-mono leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default MapMojiFeatures; 