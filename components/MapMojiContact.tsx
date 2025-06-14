'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const MapMojiContact = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-space-mono mb-4">
                        Scan to Connect 📱
                    </h2>
                    <p className="text-xl text-gray-300 font-space-mono max-w-3xl mx-auto">
                        Ready to explore the world with MapMoji? Scan the QR code to join our TestFlight beta!
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-12">
                        <div className="flex justify-center">
                            <div className="bg-white p-6 rounded-lg relative overflow-hidden">
                                <QRCodeSVG
                                    value="https://testflight.apple.com/join/TZaPHE4j"
                                    size={320}
                                    level="M"
                                    marginSize={1}
                                    bgColor="#ffffff"
                                    fgColor="#000000"
                                />
                                {/* Sheen effect overlay */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-sheen"></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-gray-300 font-space-mono text-lg mb-2">
                                Scan to download MapMoji TestFlight build
                            </p>
                            <p className="text-blue-300 font-space-mono text-sm">
                                Limited to 500 beta testers - Help shape the future of MapMoji!
                            </p>
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