// Type for emoji mapping
interface EmojiMap {
    [key: string]: string;
}

// Type for the features content
interface MapMojiFeaturesContent {
    header: {
        title: string;
        subtitle: string;
    };
    emojiMap: EmojiMap;
    gradientColors: string[];
}

export const mapMojiFeaturesContent: MapMojiFeaturesContent = {
    header: {
        title: "Powerful Features 🚀",
        subtitle: "Discover the advanced capabilities that make MapMoji the ultimate event discovery platform"
    },
    emojiMap: {
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
    },
    gradientColors: [
        "from-blue-500 to-cyan-500",
        "from-purple-500 to-pink-500",
        "from-green-500 to-emerald-500",
        "from-orange-500 to-red-500",
        "from-indigo-500 to-purple-500",
        "from-yellow-500 to-orange-500"
    ]
}; 