import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useEffect, useState } from "react";
import { Project } from "@/data/projects";

interface FloatingBubbleProps {
  project: Project;
  index: number;
  totalBubbles: number;
  onHoverChange?: (hovering: boolean) => void;
}

export function FloatingBubble({ project, index, totalBubbles, onHoverChange }: FloatingBubbleProps) {
  const navigate = useNavigate();
  const { normalizedX, normalizedY } = useMousePosition();
  const [constraints, setConstraints] = useState({ left: -320, right: 320, top: -240, bottom: 240 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasPointerMoved, setHasPointerMoved] = useState(false);

  useEffect(() => {
    const updateConstraints = () => {
      const padding = 60; // keep bubbles inside viewport
      const halfW = window.innerWidth / 2 - padding;
      const halfH = window.innerHeight / 2 - padding;
      setConstraints({
        left: -halfW,
        right: halfW,
        top: -halfH,
        bottom: halfH,
      });
    };
    updateConstraints();
    window.addEventListener("resize", updateConstraints);

    const firstPointer = () => setHasPointerMoved(true);
    window.addEventListener("pointermove", firstPointer, { once: true });

    return () => {
      window.removeEventListener("resize", updateConstraints);
      window.removeEventListener("pointermove", firstPointer);
    };
  }, []);

  // Fixed 4-bubble layout: 2 left, 2 right, roughly even vertical spacing
  const slots = [
    { x: -440, y: -140 },
    { x: -220, y: 120 },
    { x: 360, y: -140 },
    { x: 220, y: 120 },
  ];
  const fallbackAngle = (index / totalBubbles) * 2 * Math.PI - Math.PI / 2;
  const baseX = slots[index]?.x ?? Math.cos(fallbackAngle) * 200;
  const baseY = slots[index]?.y ?? Math.sin(fallbackAngle) * 200;

  // Parallax effect based on mouse position
  const parallaxFactor = 0.1 + index * 0.02;
  const parallaxX = hasPointerMoved ? normalizedX * 30 * parallaxFactor : 0;
  const parallaxY = hasPointerMoved ? normalizedY * 30 * parallaxFactor : 0;

  return (
    <motion.div
      initial={false}
      className="absolute cursor-pointer group"
      style={{
        left: `calc(50% + ${baseX}px)`,
        top: `calc(50% + ${baseY}px)`,
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
