import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Project } from "@/data/projects";

interface FloatingBubbleProps {
  project: Project;
  index: number;
  totalBubbles: number;
  normalizedX: number;
  normalizedY: number;
  onHoverChange?: (hovering: boolean) => void;
}

export function FloatingBubble({
  project,
  index,
  totalBubbles,
  normalizedX,
  normalizedY,
  onHoverChange,
}: FloatingBubbleProps) {
  const navigate = useNavigate();
  const [constraints, setConstraints] = useState({ left: -320, right: 320, top: -240, bottom: 240 });
  const [slots, setSlots] = useState([
    { x: -220, y: -140 },
    { x: -140, y: 120 },
    { x: 220, y: -140 },
    { x: 140, y: 120 },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [hasPointerMoved, setHasPointerMoved] = useState(false);
  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;

      // Match rendered bubble size (w-28/h-28 on mobile, md:w-36/h-36 on larger screens)
      const bubbleSize = isMobile ? 112 : 144;
      const padding = isMobile ? 28 : 60;

      const halfW = Math.max(80, width / 2 - padding - bubbleSize / 2);
      const halfH = Math.max(80, height / 2 - padding - bubbleSize / 2);

      setConstraints({
        left: -halfW,
        right: halfW,
        top: -halfH,
        bottom: halfH,
      });

      // Spread bubbles within the safe area so they never spawn off-screen or cover the character
      const primaryX = Math.min(halfW, isMobile ? 190 : 260);
      const secondaryX = Math.min(halfW * 0.7, isMobile ? 150 : 200);
      const spreadY = Math.min(halfH, isMobile ? 150 : 200);
      const mobileShiftX = isMobile ? -30 : 0; // nudge all bubbles left on small screens

      const extraLeftShift = -80; // additional nudge for left-side bubbles
      const globalUpShift = -50; // lift all bubbles upward

      setSlots([
        { x: -primaryX + mobileShiftX + extraLeftShift, y: -spreadY + globalUpShift },
        { x: -secondaryX + mobileShiftX + extraLeftShift, y: spreadY * 0.8 + globalUpShift },
        { x: primaryX + mobileShiftX, y: -spreadY + globalUpShift },
        { x: secondaryX + mobileShiftX, y: spreadY * 0.8 + globalUpShift },
      ]);
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);

    const firstPointer = () => setHasPointerMoved(true);
    window.addEventListener("pointermove", firstPointer, { once: true });

    return () => {
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("pointermove", firstPointer);
    };
  }, []);

  // Fixed 4-bubble layout: 2 left, 2 right, roughly even vertical spacing
  const fallbackAngle = (index / totalBubbles) * 2 * Math.PI - Math.PI / 2;
  const baseX = slots[index]?.x ?? Math.cos(fallbackAngle) * 200;
  const baseY = slots[index]?.y ?? Math.sin(fallbackAngle) * 200;
  const clampedBaseX = clamp(baseX, constraints.left, constraints.right);
  const clampedBaseY = clamp(baseY, constraints.top, constraints.bottom);

  // Parallax effect based on mouse position
  const parallaxFactor = 0.1 + index * 0.02;
  const parallaxX = hasPointerMoved ? normalizedX * 30 * parallaxFactor : 0;
  const parallaxY = hasPointerMoved ? normalizedY * 30 * parallaxFactor : 0;

  return (
    <motion.div
      initial={false}
      className="absolute cursor-pointer group"
      style={{
        left: `calc(50% + ${clampedBaseX}px)`,
        top: `calc(50% + ${clampedBaseY}px)`,
        transform: "translate(-50%, -50%)",
      }}
      animate={
        isDragging
          ? {}
          : {
              x: parallaxX,
              y: parallaxY,
            }
      }
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      drag
      dragConstraints={constraints}
      dragElastic={0.2}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onHoverStart={() => onHoverChange?.(true)}
      onHoverEnd={() => onHoverChange?.(false)}
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={{
          y: [-28, 28, -28],
        }}
        transition={{
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
          whileHover={{ scale: 1.3, opacity: 1 }}
          initial={{ scale: 1, opacity: 0.5 }}
        />

        {/* Bubble container */}
        <motion.div
          className="relative w-28 h-28 md:w-36 md:h-36 rounded-full glass glow-soft overflow-hidden"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 40px hsl(263 70% 50% / 0.6), 0 0 80px hsl(263 70% 50% / 0.3)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Project image */}
          <img
            src={project.imagePath}
            alt={project.title}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

          {/* Title on hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-3"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <span className="text-center font-display text-sm md:text-base font-semibold text-foreground">
              {project.title}
            </span>
          </motion.div>

          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            whileHover={{ borderColor: "hsl(263 70% 50% / 0.8)" }}
          />
        </motion.div>

        {/* Project number indicator */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary/80 flex items-center justify-center text-xs font-bold text-primary-foreground">
          {index + 1}
        </div>
      </motion.div>
    </motion.div>
  );
}
