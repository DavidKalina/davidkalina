'use client';

import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { aboutContent } from '../data/aboutContent';

// Comprehensive icon mapping using TypeScript to ensure type safety
const iconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
    // Basic actions
    Zap: LucideIcons.Zap,
    Camera: LucideIcons.Camera,
    Search: LucideIcons.Search,
    Shield: LucideIcons.Shield,
    Globe: LucideIcons.Globe,
    MapPin: LucideIcons.MapPin,
    Users: LucideIcons.Users,
    Heart: LucideIcons.Heart,
    Star: LucideIcons.Star,
    Target: LucideIcons.Target,
    Compass: LucideIcons.Compass,
    Eye: LucideIcons.Eye,
    Share: LucideIcons.Share,
    Navigation: LucideIcons.Navigation,
    Smartphone: LucideIcons.Smartphone,
    Wifi: LucideIcons.Wifi,
    Lock: LucideIcons.Lock,
    Unlock: LucideIcons.Unlock,
    Clock: LucideIcons.Clock,
    CheckCircle: LucideIcons.CheckCircle,
    AlertCircle: LucideIcons.AlertCircle,
    Info: LucideIcons.Info,
    Settings: LucideIcons.Settings,

    // Transportation
    Home: LucideIcons.Home,
    Building: LucideIcons.Building,
    Car: LucideIcons.Car,
    Plane: LucideIcons.Plane,
    Train: LucideIcons.Train,
    Bus: LucideIcons.Bus,
    Bike: LucideIcons.Bike,

    // Objects
    Trophy: LucideIcons.Trophy,
    Gift: LucideIcons.Gift,
    Music: LucideIcons.Music,
    Video: LucideIcons.Video,
    Image: LucideIcons.Image,
    File: LucideIcons.File,
    Folder: LucideIcons.Folder,
    Database: LucideIcons.Database,
    Server: LucideIcons.Server,
    Cloud: LucideIcons.Cloud,
    Download: LucideIcons.Download,
    Upload: LucideIcons.Upload,
    Send: LucideIcons.Send,
    Mail: LucideIcons.Mail,
    Phone: LucideIcons.Phone,
    Bell: LucideIcons.Bell,
    Calendar: LucideIcons.Calendar,

    // Nature
    Sun: LucideIcons.Sun,
    Moon: LucideIcons.Moon,
    Umbrella: LucideIcons.Umbrella,
    Snowflake: LucideIcons.Snowflake,
    Flame: LucideIcons.Flame,
    Leaf: LucideIcons.Leaf,
    Trees: LucideIcons.Trees,
    Flower: LucideIcons.Flower,
    Bug: LucideIcons.Bug,
    Fish: LucideIcons.Fish,
    Bird: LucideIcons.Bird,
    Dog: LucideIcons.Dog,
    Cat: LucideIcons.Cat,

    // Media
    Gamepad: LucideIcons.Gamepad,
    Headphones: LucideIcons.Headphones,
    Speaker: LucideIcons.Speaker,
    Mic: LucideIcons.Mic,
    Volume: LucideIcons.Volume,
    VolumeX: LucideIcons.VolumeX,
    Play: LucideIcons.Play,
    Pause: LucideIcons.Pause,
    SkipBack: LucideIcons.SkipBack,
    SkipForward: LucideIcons.SkipForward,
    Rewind: LucideIcons.Rewind,
    FastForward: LucideIcons.FastForward,
    Shuffle: LucideIcons.Shuffle,
    Repeat: LucideIcons.Repeat,

    // Layout
    List: LucideIcons.List,
    Grid: LucideIcons.Grid,
    Columns: LucideIcons.Columns,
    Rows: LucideIcons.Rows,
    Layout: LucideIcons.Layout,
    Sidebar: LucideIcons.Sidebar,
    Menu: LucideIcons.Menu,
    X: LucideIcons.X,
    Plus: LucideIcons.Plus,
    Minus: LucideIcons.Minus,
    Edit: LucideIcons.Edit,
    Trash: LucideIcons.Trash,
    Copy: LucideIcons.Copy,
    Save: LucideIcons.Save,
    RefreshCw: LucideIcons.RefreshCw,
    RotateCcw: LucideIcons.RotateCcw,
    RotateCw: LucideIcons.RotateCw,
    ZoomIn: LucideIcons.ZoomIn,
    ZoomOut: LucideIcons.ZoomOut,
    Maximize: LucideIcons.Maximize,
    Minimize: LucideIcons.Minimize,
    ExternalLink: LucideIcons.ExternalLink,
    Link: LucideIcons.Link,
    Unlink: LucideIcons.Unlink,
    Anchor: LucideIcons.Anchor,
    Tag: LucideIcons.Tag,
    Hash: LucideIcons.Hash,
    AtSign: LucideIcons.AtSign,

    // Finance
    DollarSign: LucideIcons.DollarSign,
    Percent: LucideIcons.Percent,
    Euro: LucideIcons.Euro,
    PoundSterling: LucideIcons.PoundSterling,
    Bitcoin: LucideIcons.Bitcoin,
    CreditCard: LucideIcons.CreditCard,
    Wallet: LucideIcons.Wallet,
    ShoppingCart: LucideIcons.ShoppingCart,
    ShoppingBag: LucideIcons.ShoppingBag,
    Package: LucideIcons.Package,
    Truck: LucideIcons.Truck,
    Store: LucideIcons.Store,

    // Buildings
    Building2: LucideIcons.Building2,
    Factory: LucideIcons.Factory,
    Warehouse: LucideIcons.Warehouse,
    School: LucideIcons.School,
    University: LucideIcons.University,
    Hospital: LucideIcons.Hospital,
    Church: LucideIcons.Church,

    // Geography
    Mountain: LucideIcons.Mountain,
    Square: LucideIcons.Square,
    Circle: LucideIcons.Circle,

    // Shapes
    Triangle: LucideIcons.Triangle,
    Diamond: LucideIcons.Diamond,
    Hexagon: LucideIcons.Hexagon,
    Octagon: LucideIcons.Octagon
};

// Color mapping for different icon types
const getIconColor = (iconName: string): string => {
    const colorMap: { [key: string]: string } = {
        // Action icons
        Zap: 'text-blue-400',
        Camera: 'text-purple-400',
        Search: 'text-green-400',
        Shield: 'text-indigo-400',
        Globe: 'text-cyan-400',
        MapPin: 'text-red-400',
        Users: 'text-pink-400',
        Heart: 'text-red-400',
        Star: 'text-yellow-400',
        Target: 'text-orange-400',
        Compass: 'text-blue-400',
        Eye: 'text-emerald-400',
        Share: 'text-blue-400',
        Navigation: 'text-purple-400',
        Smartphone: 'text-gray-400',
        Wifi: 'text-blue-400',
        Lock: 'text-red-400',
        Unlock: 'text-green-400',
        Clock: 'text-blue-400',
        CheckCircle: 'text-green-400',
        AlertCircle: 'text-red-400',
        Info: 'text-blue-400',
        Settings: 'text-gray-400',

        // Transportation
        Home: 'text-blue-400',
        Building: 'text-gray-400',
        Car: 'text-blue-400',
        Plane: 'text-sky-400',
        Train: 'text-blue-400',
        Bus: 'text-green-400',
        Bike: 'text-green-400',

        // Objects
        Trophy: 'text-yellow-400',
        Gift: 'text-pink-400',
        Music: 'text-purple-400',
        Video: 'text-red-400',
        Image: 'text-green-400',
        File: 'text-gray-400',
        Folder: 'text-yellow-400',
        Database: 'text-blue-400',
        Server: 'text-gray-400',
        Cloud: 'text-blue-400',
        Download: 'text-green-400',
        Upload: 'text-blue-400',
        Send: 'text-blue-400',
        Mail: 'text-blue-400',
        Phone: 'text-green-400',
        Bell: 'text-yellow-400',
        Calendar: 'text-blue-400',

        // Nature
        Sun: 'text-yellow-400',
        Moon: 'text-blue-400',
        Umbrella: 'text-blue-400',
        Snowflake: 'text-blue-400',
        Flame: 'text-red-400',
        Leaf: 'text-green-400',
        Trees: 'text-green-400',
        Flower: 'text-pink-400',
        Bug: 'text-green-400',
        Fish: 'text-blue-400',
        Bird: 'text-blue-400',
        Dog: 'text-orange-400',
        Cat: 'text-orange-400',

        // Media
        Gamepad: 'text-purple-400',
        Headphones: 'text-purple-400',
        Speaker: 'text-blue-400',
        Mic: 'text-red-400',
        Volume: 'text-blue-400',
        VolumeX: 'text-red-400',
        Play: 'text-green-400',
        Pause: 'text-yellow-400',
        SkipBack: 'text-blue-400',
        SkipForward: 'text-blue-400',
        Rewind: 'text-blue-400',
        FastForward: 'text-blue-400',
        Shuffle: 'text-purple-400',
        Repeat: 'text-purple-400',

        // Layout
        List: 'text-gray-400',
        Grid: 'text-gray-400',
        Columns: 'text-gray-400',
        Rows: 'text-gray-400',
        Layout: 'text-gray-400',
        Sidebar: 'text-gray-400',
        Menu: 'text-gray-400',
        X: 'text-red-400',
        Plus: 'text-green-400',
        Minus: 'text-red-400',
        Edit: 'text-blue-400',
        Trash: 'text-red-400',
        Copy: 'text-blue-400',
        Save: 'text-green-400',
        RefreshCw: 'text-blue-400',
        RotateCcw: 'text-blue-400',
        RotateCw: 'text-blue-400',
        ZoomIn: 'text-blue-400',
        ZoomOut: 'text-blue-400',
        Maximize: 'text-green-400',
        Minimize: 'text-yellow-400',
        ExternalLink: 'text-blue-400',
        Link: 'text-blue-400',
        Unlink: 'text-red-400',
        Anchor: 'text-gray-400',
        Tag: 'text-purple-400',
        Hash: 'text-gray-400',
        AtSign: 'text-blue-400',

        // Finance
        DollarSign: 'text-green-400',
        Percent: 'text-blue-400',
        Euro: 'text-blue-400',
        PoundSterling: 'text-blue-400',
        Bitcoin: 'text-orange-400',
        CreditCard: 'text-blue-400',
        Wallet: 'text-green-400',
        ShoppingCart: 'text-blue-400',
        ShoppingBag: 'text-blue-400',
        Package: 'text-orange-400',
        Truck: 'text-gray-400',
        Store: 'text-blue-400',

        // Buildings
        Building2: 'text-gray-400',
        Factory: 'text-gray-400',
        Warehouse: 'text-gray-400',
        School: 'text-blue-400',
        University: 'text-blue-400',
        Hospital: 'text-red-400',
        Church: 'text-purple-400',

        // Geography
        Mountain: 'text-gray-400',
        Square: 'text-gray-400',
        Circle: 'text-gray-400',

        // Shapes
        Triangle: 'text-yellow-400',
        Diamond: 'text-purple-400',
        Hexagon: 'text-blue-400',
        Octagon: 'text-orange-400',

        // Default fallback
        default: 'text-gray-400'
    };

    return colorMap[iconName] || colorMap.default;
};

const MapMojiAbout = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
                {/* Section Header */}
                <div className="flex items-center gap-4 lg:gap-6 mb-8 lg:mb-16">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 lg:p-4 rounded-xl lg:rounded-2xl">
                        <LucideIcons.Globe size={20} className="text-white lg:hidden" />
                        <LucideIcons.Globe size={24} className="text-white hidden lg:block" />
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
                                const IconComponent = iconMap[point.icon] || LucideIcons.Shield;
                                const iconColor = getIconColor(point.icon);

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