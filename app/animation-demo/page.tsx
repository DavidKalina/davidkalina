import WalkingToEventAnimation from '@/components/WalkingToEventAnimation';

export default function AnimationDemoPage() {
    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        🚶‍♂️ Walking to Event Animation
                    </h1>
                    <p className="text-white/70 text-lg">
                        Animated visualization of someone walking up to an event post with a bobbing camera
                    </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 shadow-2xl">
                    <WalkingToEventAnimation />
                </div>

                <div className="mt-8 text-center">
                    <p className="text-white/60 text-sm">
                        Watch as the character walks from left to right, approaching the event post with a realistic bobbing camera animation
                    </p>
                </div>
            </div>
        </div>
    );
} 