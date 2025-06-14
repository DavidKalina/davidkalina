'use client';

import React from 'react';
import { aboutContent } from '../data/aboutContent';

const MapMojiFeatures = () => {
    // Map icon names to emojis
    const emojiMap: { [key: string]: string } = {
        // Basic actions
        Zap: '⚡',
        Camera: '📷',
        Search: '🔍',
        Shield: '🛡️',
        Globe: '🌍',
        MapPin: '📍',
        Users: '👥',
        Heart: '❤️',
        Star: '⭐',
        Target: '🎯',
        Compass: '🧭',
        Eye: '👁️',
        Share: '📤',
        Navigation: '🧭',
        Smartphone: '📱',
        Wifi: '📶',
        Lock: '🔒',
        Unlock: '🔓',
        Clock: '⏰',
        CheckCircle: '✅',
        AlertCircle: '⚠️',
        Info: 'ℹ️',
        Settings: '⚙️',

        // Transportation
        Home: '🏠',
        Building: '🏢',
        Car: '🚗',
        Plane: '✈️',
        Train: '🚂',
        Bus: '🚌',
        Bike: '🚲',

        // Objects
        Trophy: '🏆',
        Gift: '🎁',
        Music: '🎵',
        Video: '🎬',
        Image: '🖼️',
        File: '📄',
        Folder: '📁',
        Database: '🗄️',
        Server: '🖥️',
        Cloud: '☁️',
        Download: '⬇️',
        Upload: '⬆️',
        Send: '📤',
        Mail: '📧',
        Phone: '📞',
        Bell: '🔔',
        Calendar: '📅',

        // Nature
        Sun: '☀️',
        Moon: '🌙',
        Umbrella: '☂️',
        Snowflake: '❄️',
        Flame: '🔥',
        Leaf: '🍃',
        Trees: '🌳',
        Flower: '🌸',
        Bug: '🐛',
        Fish: '🐟',
        Bird: '🐦',
        Dog: '🐕',
        Cat: '🐱',

        // Media
        Gamepad: '🎮',
        Headphones: '🎧',
        Speaker: '🔊',
        Mic: '🎤',
        Volume: '🔊',
        VolumeX: '🔇',
        Play: '▶️',
        Pause: '⏸️',
        SkipBack: '⏮️',
        SkipForward: '⏭️',
        Rewind: '⏪',
        FastForward: '⏩',
        Shuffle: '🔀',
        Repeat: '🔁',

        // Layout
        List: '📋',
        Grid: '⊞',
        Columns: '⊟',
        Rows: '⊞',
        Layout: '📐',
        Sidebar: '📊',
        Menu: '☰',
        X: '❌',
        Plus: '➕',
        Minus: '➖',
        Edit: '✏️',
        Trash: '🗑️',
        Copy: '📋',
        Save: '💾',
        RefreshCw: '🔄',
        RotateCcw: '🔄',
        RotateCw: '🔄',
        ZoomIn: '🔍',
        ZoomOut: '🔍',
        Maximize: '⛶',
        Minimize: '⛶',
        ExternalLink: '🔗',
        Link: '🔗',
        Unlink: '🔗',
        Anchor: '⚓',
        Tag: '🏷️',
        Hash: '#',
        AtSign: '@',

        // Finance
        DollarSign: '💵',
        Percent: '%',
        Euro: '💶',
        PoundSterling: '💷',
        Bitcoin: '₿',
        CreditCard: '💳',
        Wallet: '👛',
        ShoppingCart: '🛒',
        ShoppingBag: '🛍️',
        Package: '📦',
        Truck: '🚚',
        Store: '🏪',

        // Buildings
        Building2: '🏢',
        Factory: '🏭',
        Warehouse: '🏭',
        School: '🏫',
        University: '🎓',
        Hospital: '🏥',
        Church: '⛪',

        // Geography
        Mountain: '⛰️',
        Square: '⬜',
        Circle: '⭕',

        // Shapes
        Triangle: '🔺',
        Diamond: '💎',
        Hexagon: '⬡',
        Octagon: '⯃',

        // Default fallback
        default: '✨'
    };

    const gradientColors = [
        "from-blue-500 to-cyan-500",
        "from-purple-500 to-pink-500",
        "from-green-500 to-emerald-500",
        "from-orange-500 to-red-500",
        "from-indigo-500 to-purple-500",
        "from-yellow-500 to-orange-500"
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-space-mono mb-4">
                        Powerful Features 🚀
                    </h2>
                    <p className="text-xl text-gray-300 font-space-mono max-w-3xl mx-auto">
                        Discover the advanced capabilities that make MapMoji the ultimate event discovery platform
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