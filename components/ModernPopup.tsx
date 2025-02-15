import { Card, CardContent } from "@/components/ui/card";

interface PopupProps {
  x: number;
  y: number;
  node: {
    emoji: string;
    label: string;
    description?: string;
  };
}

const ModernPopup = ({ x, y, node }: PopupProps) => {
  return (
    <div
      className="absolute pointer-events-none z-50"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -100%)",
      }}
    >
      <Card className="bg-zinc-900/95 dark:bg-zinc-800/95 border-zinc-800 dark:border-zinc-700 shadow-lg backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{node.emoji}</span>
              <span className="font-mono font-bold text-sm text-white dark:text-zinc-100">
                {node.label}
              </span>
            </div>
            {node.description && (
              <p className="font-mono text-xs text-zinc-300 dark:text-zinc-400 max-w-[200px]">
                {node.description}
              </p>
            )}
          </div>

          {/* Visual indicator */}
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-2 h-2 bg-zinc-900 dark:bg-zinc-800 rotate-45 transform origin-center" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernPopup;
