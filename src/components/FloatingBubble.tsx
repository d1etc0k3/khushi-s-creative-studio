import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMousePosition } from "@/hooks/useMousePosition";
import { Project } from "@/data/projects";

interface FloatingBubbleProps {
  project: Project;
  index: number;
  totalBubbles: number;
}

export function FloatingBubble({ project, index, totalBubbles }: FloatingBubbleProps) {
  const navigate = useNavigate();
  const { normalizedX, normalizedY } = useMousePosition();

  // Calculate position in a circle around center
  const angle = (index / totalBubbles) * 2 * Math.PI - Math.PI / 2;
  const radius = 180; // Distance from center
  const baseX = Math.cos(angle) * radius;
  const baseY = Math.sin(angle) * radius;

  // Parallax effect based on mouse position
  const parallaxFactor = 0.1 + index * 0.02;
  const parallaxX = normalizedX * 30 * parallaxFactor;
  const parallaxY = normalizedY * 30 * parallaxFactor;

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{
        left: `calc(50% + ${baseX}px)`,
        top: `calc(50% + ${baseY}px)`,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        x: parallaxX,
        y: parallaxY,
      }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 3 + index * 0.5,
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
