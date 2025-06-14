'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const MapMojiContact = () => {
    return (
        <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-space-mono mb-4">
                        Scan to Connect 📱
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 font-space-mono max-w-3xl mx-auto px-4">
                        Ready to explore the world with MapMoji? Scan the QR code to join our TestFlight beta!
                    </p>
                </div>

                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-12">
                        <div className="flex justify-center">
                            <div className="bg-white p-3 md:p-6 lg:p-8 rounded-lg relative overflow-hidden">
                                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] flex items-center justify-center">
                                    <QRCodeSVG
                                        value="https://testflight.apple.com/join/TZaPHE4j"
                                        size={320}
                                        level="M"
                                        marginSize={1}
                                        bgColor="#ffffff"
                                        fgColor="#000000"
                                        className="w-full h-full max-w-full max-h-full"
                                    />
                                </div>
                                {/* Sheen effect overlay */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-sheen"></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 md:mt-8 text-center">
                            <p className="text-gray-300 font-space-mono text-base md:text-lg mb-2">
                                Scan to download MapMoji TestFlight build
                            </p>
                            <p className="text-blue-300 font-space-mono text-sm">
                                Limited to 500 beta testers - Help shape the future of MapMoji!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer message */}
                <div className="mt-12 md:mt-16 text-center">
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