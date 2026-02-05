import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

interface CuteCharacterProps {
  className?: string;
}

export function CuteCharacter({ className = "" }: CuteCharacterProps) {
  const { normalizedX, normalizedY } = useMousePosition();

  // Calculate eye movement (limited range)
  const eyeX = normalizedX * 8;
  const eyeY = normalizedY * 6;

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-2xl"
        style={{ filter: "drop-shadow(0 0 30px hsl(263 70% 50% / 0.3))" }}
      >
        {/* Body - rounded blob shape */}
        <motion.ellipse
          cx="100"
          cy="120"
          rx="70"
          ry="60"
          className="fill-secondary"
          animate={{ ry: [60, 62, 60] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Head */}
        <motion.circle
          cx="100"
          cy="80"
          r="55"
          className="fill-card"
          stroke="hsl(263 70% 50% / 0.3)"
          strokeWidth="2"
          animate={{ r: [55, 56, 55] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Inner glow on head */}
        <circle
          cx="85"
          cy="65"
          r="30"
          fill="url(#headGlow)"
          opacity="0.3"
        />

        {/* Left Eye */}
        <g>
          {/* Eye socket */}
          <ellipse cx="75" cy="75" rx="18" ry="20" className="fill-background" />
          
          {/* Eye iris */}
          <motion.circle
            cx={75 + eyeX}
            cy={75 + eyeY}
            r="10"
            className="fill-primary"
            animate={{ scale: [1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          {/* Eye pupil */}
          <motion.circle
            cx={75 + eyeX}
            cy={75 + eyeY}
            r="5"
            className="fill-background"
          />
          
          {/* Eye highlight */}
          <motion.circle
            cx={72 + eyeX * 0.5}
            cy={72 + eyeY * 0.5}
            r="3"
            className="fill-foreground"
          />

          {/* Blink animation overlay */}
          <motion.ellipse
            cx="75"
            cy="75"
            rx="18"
            ry="20"
            className="fill-card"
            animate={{
              scaleY: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 0.92, 0.94, 0.96, 1],
            }}
            style={{ transformOrigin: "75px 75px" }}
          />
        </g>

        {/* Right Eye */}
        <g>
          <ellipse cx="125" cy="75" rx="18" ry="20" className="fill-background" />
          
          <motion.circle
            cx={125 + eyeX}
            cy={75 + eyeY}
            r="10"
            className="fill-primary"
          />
          
          <motion.circle
            cx={125 + eyeX}
            cy={75 + eyeY}
            r="5"
            className="fill-background"
          />
          
          <motion.circle
            cx={122 + eyeX * 0.5}
            cy={72 + eyeY * 0.5}
            r="3"
            className="fill-foreground"
          />

          <motion.ellipse
            cx="125"
            cy="75"
            rx="18"
            ry="20"
            className="fill-card"
            animate={{
              scaleY: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 0.92, 0.94, 0.96, 1],
            }}
            style={{ transformOrigin: "125px 75px" }}
          />
        </g>

        {/* Cute blush marks */}
        <ellipse cx="55" cy="90" rx="10" ry="5" className="fill-primary/30" />
        <ellipse cx="145" cy="90" rx="10" ry="5" className="fill-primary/30" />

        {/* Small smile */}
        <path
          d="M 85 100 Q 100 115 115 100"
          fill="none"
          className="stroke-muted-foreground"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Small sparkles around character */}
        <motion.g
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <polygon
            points="35,50 38,55 35,60 32,55"
            className="fill-accent"
          />
          <polygon
            points="165,45 168,50 165,55 162,50"
            className="fill-primary"
          />
          <polygon
            points="50,140 53,145 50,150 47,145"
            className="fill-accent"
          />
        </motion.g>

        {/* Gradient definitions */}
        <defs>
          <radialGradient id="headGlow" cx="0.3" cy="0.3" r="0.7">
            <stop offset="0%" stopColor="hsl(263 70% 70%)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
