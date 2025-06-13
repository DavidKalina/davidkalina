const MapMojiAbout = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-white font-space-mono mb-6">
                                    About MapMoji 🌍
                                </h2>
                                <p className="text-xl text-gray-300 font-space-mono leading-relaxed mb-6">
                                    MapMoji is a revolutionary mapping platform that combines the power of interactive maps with the fun and expressiveness of emojis. We believe that exploring the world should be both informative and delightful.
                                </p>
                                <p className="text-lg text-gray-300 font-space-mono leading-relaxed">
                                    Built with cutting-edge technology and designed with user experience in mind, MapMoji transforms how you interact with geographic data and location-based services.
                                </p>
                            </div>

                            {/* Key Points */}
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-1">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white font-space-mono mb-2">
                                            Interactive Experience
                                        </h3>
                                        <p className="text-gray-300 font-space-mono">
                                            Engage with maps like never before with our innovative camera animations and location-based features.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-1">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white font-space-mono mb-2">
                                            Privacy First
                                        </h3>
                                        <p className="text-gray-300 font-space-mono">
                                            Your location data stays on your device. We believe in transparency and user privacy above all else.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-1">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white font-space-mono mb-2">
                                            Modern Technology
                                        </h3>
                                        <p className="text-gray-300 font-space-mono">
                                            Built with React, Next.js, and Mapbox for optimal performance and beautiful visualizations.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Elements */}
                        <div className="relative">
                            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                                <div className="text-center space-y-6">
                                    <div className="text-6xl mb-4">🗺️</div>
                                    <h3 className="text-2xl font-bold text-white font-space-mono">
                                        Our Mission
                                    </h3>
                                    <p className="text-gray-300 font-space-mono leading-relaxed">
                                        To make geographic exploration accessible, engaging, and fun for everyone through innovative technology and beautiful design.
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 mt-8">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-blue-400 font-space-mono">100%</div>
                                            <div className="text-sm text-gray-400 font-space-mono">Privacy Focused</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-purple-400 font-space-mono">24/7</div>
                                            <div className="text-sm text-gray-400 font-space-mono">Available</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-400 font-space-mono">0</div>
                                            <div className="text-sm text-gray-400 font-space-mono">Registration Required</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-orange-400 font-space-mono">∞</div>
                                            <div className="text-sm text-gray-400 font-space-mono">Possibilities</div>
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
            </div>
        </section>
    );
};

export default MapMojiAbout; 