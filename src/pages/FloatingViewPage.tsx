import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CuteCharacter } from "@/components/CuteCharacter";
import { FloatingBubble } from "@/components/FloatingBubble";
import { ParticleBackground } from "@/components/ParticleBackground";
import { projects } from "@/data/projects";

export default function FloatingViewPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen overflow-hidden"
    >
      <ParticleBackground />

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 glass rounded-full hover:glow-soft transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-primary group-hover:text-accent transition-colors" />
          <span className="text-sm text-foreground">Back to Home</span>
        </Link>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-40"
      >
        <h1 className="font-display text-xl md:text-2xl font-bold text-gradient">
          My Projects
        </h1>
      </motion.div>

      {/* Hint text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
      >
        <p className="text-sm text-muted-foreground text-center">
          Click on a bubble to view project details
        </p>
      </motion.div>

      {/* Center content area */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Character */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="relative z-10"
        >
          <CuteCharacter className="w-48 h-48 md:w-64 md:h-64" />
        </motion.div>

        {/* Floating bubbles */}
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.15, type: "spring" }}
          >
            <FloatingBubble
              project={project}
              index={index}
              totalBubbles={projects.length}
            />
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
