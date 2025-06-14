import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Github, Network } from "lucide-react";

interface ProjectSplitCardProps {
    title: string;
    description: string;
    badges: { text: string }[];
    stats: { value: string; label: string }[];
    sourceUrl: string;
    mapmojiUrl: string;
    qrUrl: string;
}

const QRCodeSVG = dynamic(() => import("qrcode.react").then(mod => ({ default: mod.QRCodeSVG })), {
    loading: () => (
        <div className="w-32 h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
            <div className="text-gray-500 text-xs">QR</div>
        </div>
    ),
});

const ProjectSplitCard = ({
    title,
    description,
    badges,
    stats,
    sourceUrl,
    mapmojiUrl,
    qrUrl,
}: ProjectSplitCardProps) => {
    return (
        <Card className="overflow-hidden rounded-3xl border-2 border-zinc-100 dark:border-zinc-700/50 shadow-xl flex flex-col lg:flex-row w-full mx-auto bg-white/90 dark:bg-zinc-900/90">
            {/* Left: Blue QR Section */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 p-8 lg:p-12 w-full lg:w-1/2">
                <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
                    <Suspense fallback={<div className="w-32 h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center"><div className="text-gray-500 text-xs">QR</div></div>}>
                        <div className="w-32 h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 flex items-center justify-center">
                            <QRCodeSVG
                                value={qrUrl}
                                size={224}
                                level="M"
                                marginSize={1}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                className="w-full h-full max-w-full max-h-full"
                            />
                        </div>
                    </Suspense>
                </div>
                <div className="text-center">
                    <p className="font-mono text-sm text-blue-100 font-bold">TestFlight Beta</p>
                    <p className="font-mono text-xs text-blue-200">Scan to join</p>
                </div>
            </div>

            {/* Right: Project Info Section */}
            <div className="flex flex-col justify-between p-8 lg:p-12 w-full lg:w-1/2 bg-white/80 dark:bg-zinc-900/80">
                <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {badges.map((badge, idx) => (
                            <Badge
                                key={idx}
                                className="bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-700 dark:to-zinc-600 text-black dark:text-white px-3 py-2 rounded-full text-xs font-mono"
                            >
                                {badge.text}
                            </Badge>
                        ))}
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h2>
                    <p className="font-mono text-base text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">{description}</p>
                    <div className="flex gap-8 mb-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <p className="font-mono text-xl lg:text-2xl font-bold text-zinc-900 dark:text-zinc-200">{stat.value}</p>
                                <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Link href={sourceUrl} target="_blank">
                        <Button
                            variant="outline"
                            className="bg-gradient-to-r from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-700 text-black dark:text-white rounded-full font-mono font-bold px-6 py-6 w-full sm:w-auto border-0 shadow-sm hover:shadow-md"
                        >
                            <Github className="mr-2" size={18} />
                            Source
                        </Button>
                    </Link>
                    <Link href={mapmojiUrl}>
                        <Button
                            variant="outline"
                            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full font-mono font-bold px-6 py-6 w-full sm:w-auto border-0 shadow-sm hover:shadow-lg"
                        >
                            <Network className="mr-2" size={18} />
                            Try MapMoji
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
};

export default ProjectSplitCard; 