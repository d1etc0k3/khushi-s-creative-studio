import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

interface CuteCharacterProps {
  className?: string;
  isHappy?: boolean;
}

// Bright, cute-but-professional mascot with eye tracking
export function CuteCharacter({ className = "", isHappy = false }: CuteCharacterProps) {
  const { normalizedX, normalizedY } = useMousePosition();

  // Eye movement range
  const eyeX = normalizedX * 10;
  const eyeY = normalizedY * 8;

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 220 240" className="w-full h-full drop-shadow-2xl">
        <defs>
          <radialGradient id="bodyGlow" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.35)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="suit" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--card) / 0.9)" />
            <stop offset="100%" stopColor="hsl(var(--card) / 0.7)" />
          </linearGradient>
        </defs>

        {/* Glow aura */}
        <circle cx="110" cy="110" r="90" fill="url(#bodyGlow)" />

        {/* Penguin body */}
        <motion.ellipse
          cx="110"
          cy="150"
          rx="78"
          ry="70"
          fill="hsl(var(--card) / 0.95)"
          stroke="hsl(var(--primary) / 0.25)"
          strokeWidth="2.5"
          animate={{ ry: [70, 73, 70] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Belly */}
        <ellipse cx="110" cy="155" rx="58" ry="55" fill="white" opacity="0.9" />
        {/* Flippers */}
        <path
          d="M38 150 Q28 145 36 125 Q64 110 70 140 Z"
          fill="hsl(var(--card) / 0.95)"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="2"
        />
        <path
          d="M182 150 Q192 145 184 125 Q156 110 150 140 Z"
          fill="hsl(var(--card) / 0.95)"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="2"
        />

        {/* Head */}
        <motion.circle
          cx="110"
          cy="90"
          r="62"
          fill="hsl(var(--card) / 0.98)"
          stroke="hsl(var(--primary) / 0.35)"
          strokeWidth="3"
          animate={{ r: [62, 63, 62] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* White face patch */}
        <ellipse cx="110" cy="92" rx="48" ry="46" fill="white" opacity="0.92" />

        {/* Left eye */}
        <g>
          <ellipse cx="80" cy="85" rx="20" ry="22" fill="white" />
          <motion.circle
            cx={80 + eyeX}
            cy={85 + eyeY}
            r="11"
            fill="hsl(var(--primary))"
          />
          <motion.circle
            cx={80 + eyeX}
            cy={85 + eyeY}
            r="5"
            fill="hsl(var(--background))"
          />
          <motion.circle
            cx={77 + eyeX * 0.4}
            cy={82 + eyeY * 0.4}
            r="3"
            fill="white"
          />
        </g>

        {/* Right eye */}
        <g>
        <ellipse cx="140" cy="85" rx="20" ry="22" fill="white" />
        <motion.circle
          cx={140 + eyeX}
          cy={85 + eyeY}
          r="11"
          fill="hsl(var(--primary))"
        />
          <motion.circle
            cx={140 + eyeX}
            cy={85 + eyeY}
            r="5"
            fill="hsl(var(--background))"
          />
          <motion.circle
            cx={137 + eyeX * 0.4}
            cy={82 + eyeY * 0.4}
          r="3"
          fill="white"
        />
      </g>

        {/* Beak */}
        <path
          d="M102 102 L118 102 L110 112 Z"
          fill="hsl(var(--primary))"
          stroke="hsl(var(--primary) / 0.7)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Brows */}
        <path
          d="M65 62 Q80 58 95 62"
          stroke="hsl(var(--card) / 0.4)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M125 62 Q140 58 155 62"
          stroke="hsl(var(--card) / 0.4)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Feet */}
        <path d="M78 204 Q82 214 92 214 L72 214 Z" fill="hsl(var(--primary) / 0.8)" />
        <path d="M128 204 Q132 214 142 214 L122 214 Z" fill="hsl(var(--primary) / 0.8)" />

        {/* Smile */}
        <motion.path
          initial={false}
          animate={{
            d: isHappy ? "M88 108 Q110 132 132 108" : "M88 112 Q110 112 132 112",
            strokeWidth: isHappy ? 5 : 4,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          stroke="hsl(var(--primary))"
          strokeLinecap="round"
          fill="none"
        />

        {/* Blush */}
        <ellipse cx="65" cy="105" rx="12" ry="6" fill="hsl(var(--primary) / 0.35)" />
        <ellipse cx="155" cy="105" rx="12" ry="6" fill="hsl(var(--primary) / 0.35)" />
      </svg>
    </motion.div>
  );
}
