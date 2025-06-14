'use client';

import React from 'react';

const CameraCaptureFrame = () => {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <div className="relative inline-block">
                    {/* Camera Body */}
                    <div className="w-24 h-24 bg-black rounded-2xl border-4 border-white/20 flex items-center justify-center relative overflow-hidden">
                        {/* Shutter Effect */}
                        <div className="absolute inset-0 bg-black animate-shutter"></div>

                        {/* Camera Lens */}
                        <div className="w-16 h-16 bg-gray-800 rounded-full border-2 border-white/30 flex items-center justify-center relative z-10">
                            <div className="w-12 h-12 bg-gray-900 rounded-full border border-white/20"></div>
                        </div>

                        {/* Flash */}
                        <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse opacity-0 animate-flash"></div>

                        {/* Recording Light */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                    </div>

                    {/* Captured Image Preview */}
                    <div className="mt-4 bg-white/10 rounded-lg p-3 border border-white/20">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg">📷</span>
                            <p className="font-mono text-sm text-white/90">Captured Image</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg p-2 text-center">
                            <div className="text-2xl mb-1">🎪</div>
                            <p className="font-mono text-xs text-white font-bold">STREET FESTIVAL</p>
                            <p className="font-mono text-xs text-white/80">Live Music • Food Trucks</p>
                        </div>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white font-mono mt-4">
                    📸 Capturing Event
                </h3>
            </div>
            <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                        <p className="font-mono text-sm text-white/90">Camera active...</p>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                        <p className="font-mono text-sm text-white/90">Detecting QR code...</p>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                        <p className="font-mono text-sm text-white/90">📍 Location: 40.7128°N, 74.0060°W</p>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-3 border border-green-400/30">
                    <div className="flex items-center justify-between">
                        <p className="font-mono text-sm text-white/90">✅ Image captured successfully</p>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes shutter {
                    0% { opacity: 0; }
                    10% { opacity: 1; }
                    20% { opacity: 0; }
                    100% { opacity: 0; }
                }
                .animate-shutter {
                    animation: shutter 3s ease-in-out infinite;
                }
                
                @keyframes flash {
                    0% { opacity: 0; transform: scale(0.5); }
                    50% { opacity: 1; transform: scale(1.2); }
                    100% { opacity: 0; transform: scale(0.5); }
                }
                .animate-flash {
                    animation: flash 3s ease-in-out infinite;
                    animation-delay: 0.5s;
                }
            `}</style>
        </div>
    );
};

export default CameraCaptureFrame; 