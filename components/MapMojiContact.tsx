'use client';

import React, { useState } from 'react';

const MapMojiContact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [radiusMiles, setRadiusMiles] = useState(5);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRadius = parseInt(e.target.value);
        setRadiusMiles(newRadius);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Here you can add your form submission logic
    };

    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-space-mono mb-4">
                        Get In Touch 📧
                    </h2>
                    <p className="text-xl text-gray-300 font-space-mono max-w-3xl mx-auto">
                        Ready to explore the world with MapMoji? Let&apos;s start a conversation!
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-white font-space-mono mb-6">
                                Send us a message 💬
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 font-space-mono mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-space-mono placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white/15"
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 font-space-mono mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-space-mono placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white/15"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 font-space-mono mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-space-mono placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none hover:bg-white/15"
                                        placeholder="Tell us about your project..."
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-space-mono font-bold py-4 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black/80 transition-all transform hover:scale-105 hover:shadow-lg active:scale-95"
                                >
                                    Send Message 🚀
                                </button>
                            </form>
                        </div>

                        {/* Settings & Info */}
                        <div className="space-y-8">
                            {/* Radius Control */}
                            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold text-white font-space-mono mb-6">
                                    Animation Settings ⚙️
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="radius" className="block text-sm font-medium text-gray-300 font-space-mono mb-2">
                                            Animation Radius: {radiusMiles} miles
                                        </label>
                                        <input
                                            type="range"
                                            id="radius"
                                            min="1"
                                            max="20"
                                            value={radiusMiles}
                                            onChange={handleRadiusChange}
                                            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                                        />
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span>1 mi</span>
                                            <span>10 mi</span>
                                            <span>20 mi</span>
                                        </div>
                                    </div>

                                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                                        <p className="text-blue-300 font-space-mono text-sm">
                                            💡 Adjust the radius to control how far the camera animation explores around your location
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold text-white font-space-mono mb-6">
                                    Connect With Us 🌟
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">📧</span>
                                        <div>
                                            <p className="text-white font-space-mono font-semibold">Email</p>
                                            <p className="text-gray-300 font-space-mono text-sm">hello@mapmoji.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">🌐</span>
                                        <div>
                                            <p className="text-white font-space-mono font-semibold">Website</p>
                                            <p className="text-gray-300 font-space-mono text-sm">www.mapmoji.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">📱</span>
                                        <div>
                                            <p className="text-white font-space-mono font-semibold">Social</p>
                                            <p className="text-gray-300 font-space-mono text-sm">@mapmoji</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer message */}
                <div className="mt-16 text-center">
                    <p className="text-gray-400 font-space-mono text-sm">
                        Ready to explore the world? Let&apos;s connect! 🌍
                    </p>
                    <div className="mt-4 flex justify-center space-x-4">
                        <span className="text-blue-400 text-lg">🗺️</span>
                        <span className="text-purple-400 text-lg">🎯</span>
                        <span className="text-green-400 text-lg">🌟</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapMojiContact; 