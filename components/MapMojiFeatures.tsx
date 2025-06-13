const MapMojiFeatures = () => {
    const features = [
        {
            icon: "🗺️",
            title: "Interactive Maps",
            description: "Explore the world with beautiful, interactive map visualizations powered by Mapbox.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: "🎯",
            title: "Location Intelligence",
            description: "Smart location-based features that adapt to your surroundings and preferences.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: "🎨",
            title: "Beautiful Design",
            description: "Modern, responsive design with smooth animations and intuitive user experience.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: "🚀",
            title: "Modern Technology",
            description: "Built with cutting-edge technologies for optimal performance and scalability.",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: "🌍",
            title: "Global Reach",
            description: "Connect with users worldwide through our innovative mapping platform.",
            color: "from-indigo-500 to-purple-500"
        },
        {
            icon: "⚡",
            title: "Lightning Fast",
            description: "Optimized for speed with efficient rendering and smooth interactions.",
            color: "from-yellow-500 to-orange-500"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-space-mono mb-4">
                        Why Choose MapMoji? 🎯
                    </h2>
                    <p className="text-xl text-gray-300 font-space-mono max-w-3xl mx-auto">
                        Discover the features that make MapMoji the ultimate mapping experience
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-black/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                            <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white font-space-mono mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-gray-300 font-space-mono leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Additional info section */}
                <div className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-white font-space-mono mb-4">
                            Ready to Get Started? 🚀
                        </h3>
                        <p className="text-gray-300 font-space-mono text-lg mb-6">
                            Join thousands of users who are already exploring the world with MapMoji
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 font-space-mono">
                            <span className="flex items-center space-x-2">
                                <span className="text-green-400">✓</span>
                                <span>Free to use</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <span className="text-green-400">✓</span>
                                <span>No registration required</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <span className="text-green-400">✓</span>
                                <span>Privacy focused</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapMojiFeatures; 