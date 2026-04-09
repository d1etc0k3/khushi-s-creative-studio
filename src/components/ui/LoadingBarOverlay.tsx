import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingBarOverlayProps {
  visible: boolean;
  label?: string;
  progress?: number;
  className?: string;
  inline?: boolean;
}

export function LoadingBarOverlay({ visible, label = "Loading...", progress, className, inline = false }: LoadingBarOverlayProps) {
  if (!visible) {
    return null;
  }

  const hasProgress = typeof progress === "number";
  const clampedProgress = hasProgress ? Math.min(100, Math.max(0, progress)) : 0;

  return (
    <div
      className={cn(
        inline
          ? "flex items-center justify-center"
          : "absolute inset-0 z-20 flex items-center justify-center bg-background/55 backdrop-blur-[1px]",
        className,
      )}
    >
      <div className="w-[78%] max-w-sm space-y-2">
        <p className="text-xs text-foreground/85 text-center">{label}</p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary/20">
          {hasProgress ? (
            <div className="h-full rounded-full bg-primary transition-all duration-300 ease-out" style={{ width: `${clampedProgress}%` }} />
          ) : (
            <motion.div
              className="h-full w-1/2 rounded-full bg-primary"
              animate={{ x: ["-120%", "220%"] }}
              transition={{ duration: 1.05, ease: "easeInOut", repeat: Infinity }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
