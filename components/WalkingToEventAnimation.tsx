import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const WalkingCameraSimulation = () => {
    const [isWalking, setIsWalking] = useState(false);
    const [showFlash, setShowFlash] = useState(false);
    const cameraControls = useAnimation();
    const wallControls = useAnimation();
    const shutterControls = useAnimation();

    // Larger, more distinct shake values for bigger steps
    const generateShake = () => ({
        x: (Math.random() - 0.5) * 2.5,
        y: (Math.random() - 0.5) * 3,
        rotate: (Math.random() - 0.5) * 1.2
    });

    const startWalking = async () => {
        setIsWalking(true);

        const walkingAnimation = async () => {
            for (let i = 0; i < 30; i++) {
                const shake = generateShake();
                const progress = i / 30;

                const intensity = 0.4 + progress * 0.2;

                await Promise.all([
                    cameraControls.start({
                        x: shake.x * intensity,
                        y: shake.y * intensity,
                        rotate: shake.rotate * intensity,
                        transition: { duration: 0.08, ease: "easeOut" }
                    }),
                    // Wall grows larger as we approach - larger steps
                    wallControls.start({
                        scale: 1 + progress * 4,
                        transition: { duration: 0.08, ease: "easeOut" }
                    })
                ]);

                // Longer intervals for bigger steps
                await new Promise(resolve => setTimeout(resolve, 75));
            }
        };

        await walkingAnimation();

        // Small pause before taking the photo
        await new Promise(resolve => setTimeout(resolve, 500));

        // Camera shutter effect
        await shutterControls.start({
            scaleY: [0, 1, 0],
            transition: { duration: 0.15, times: [0, 0.5, 1] }
        });

        // Camera flash
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 100);

        setIsWalking(false);
    };

    const resetAnimation = () => {
        cameraControls.start({ x: 0, y: 0, rotate: 0, transition: { duration: 0.4 } });
        wallControls.start({ scale: 1, transition: { duration: 0.4 } });
        setShowFlash(false);
    };

    return (
        <div className="w-full h-screen bg-gray-200 overflow-hidden relative">


            {/* Camera shutter effect */}
            <motion.div
                className="absolute inset-0 bg-black pointer-events-none z-50"
                animate={shutterControls}
                initial={{ scaleY: 0 }}
                style={{ transformOrigin: "center" }}
            />

            {/* Camera flash */}
            {showFlash && (
                <div className="absolute inset-0 bg-white pointer-events-none z-40 opacity-80" />
            )}

            {/* Camera shake container */}
            <motion.div
                className="w-full h-full flex items-center justify-center"
                animate={cameraControls}
                style={{ transformOrigin: "center center" }}
            >
                {/* Wall with flyer */}
                <motion.div
                    className="relative"
                    animate={wallControls}
                    style={{ transformOrigin: "center center" }}
                >
                    {/* Wall */}
                    <div className="w-64 h-48 bg-gray-300 border-l-4 border-r-4 border-gray-500">
                        {/* Wall texture lines */}
                        <div className="absolute top-12 left-0 w-full h-px bg-gray-400"></div>
                        <div className="absolute top-24 left-0 w-full h-px bg-gray-400"></div>
                        <div className="absolute top-36 left-0 w-full h-px bg-gray-400"></div>
                    </div>

                    {/* Flyer on wall */}
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-white border border-gray-400 shadow-md">
                        {/* Simple flyer content */}
                        <div className="p-1">
                            <div className="w-full h-2 bg-black mb-1"></div>
                            <div className="w-3/4 h-1 bg-gray-500 mb-1"></div>
                            <div className="w-full h-1 bg-gray-500"></div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Control buttons */}
            <div className="absolute top-4 left-4 space-y-2">
                <button
                    onClick={startWalking}
                    disabled={isWalking}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {isWalking ? 'Walking...' : 'Walk to Wall'}
                </button>

                <button
                    onClick={resetAnimation}
                    disabled={isWalking}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors block"
                >
                    Reset
                </button>
            </div>

            {/* Status indicator */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${isWalking ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                    <span className="font-mono text-sm">
                        {isWalking ? 'WALKING' : 'STOPPED'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default WalkingCameraSimulation;