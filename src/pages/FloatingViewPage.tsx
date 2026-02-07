import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CuteCharacter } from "@/components/CuteCharacter";
import { FloatingBubble } from "@/components/FloatingBubble";
import { projects } from "@/data/projects";
import { useState } from "react";

export default function FloatingViewPage() {
  const [hoveringBubble, setHoveringBubble] = useState(false);
  const floatingProjects = projects.slice(0, 4);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Ambient glow backdrop */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-[180px]" />
      </div>

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
        className="fixed top-6 inset-x-0 z-40 flex justify-center"
      >
        <h1 className="font-display text-2xl md:text-5xl font-bold text-gradient text-center pb-2">
          Projects
        </h1>
      </motion.div>

      {/* Hint text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
      >
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
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-[80px]" />
          <CuteCharacter className="w-48 h-48 md:w-64 md:h-64" isHappy={hoveringBubble} />
        </motion.div>

        {/* Floating bubbles */}
        {floatingProjects.map((project, index) => (
          <div key={project.id}>
            <FloatingBubble
              project={project}
              index={index}
              totalBubbles={floatingProjects.length}
              onHoverChange={setHoveringBubble}
            />
          </div>
        ))}
      </div>
    </motion.main>
  );
}
