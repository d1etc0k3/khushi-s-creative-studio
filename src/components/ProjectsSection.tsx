import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, LayoutGrid } from "lucide-react";

export function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        {/* Section title */}
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
          View My <span className="text-gradient">Projects</span>
        </h2>
        
        <p className="text-muted-foreground text-lg mb-12">
          Choose how you'd like to explore my work
        </p>

        {/* View options */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {/* Floating View Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/floating"
              className="group flex flex-col items-center gap-4 p-8 glass rounded-2xl hover:glow-primary transition-all duration-300 min-w-[200px]"
            >
              <div className="relative">
                <Sparkles className="w-12 h-12 text-primary group-hover:text-accent transition-colors" />
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-primary/50 rounded-full"
                      style={{
                        top: `${Math.sin((i * 120 * Math.PI) / 180) * 30 + 20}px`,
                        left: `${Math.cos((i * 120 * Math.PI) / 180) * 30 + 20}px`,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Floating View
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Interactive experience
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Standard View Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/projects"
              className="group flex flex-col items-center gap-4 p-8 glass rounded-2xl hover:glow-soft transition-all duration-300 min-w-[200px]"
            >
              <LayoutGrid className="w-12 h-12 text-primary group-hover:text-accent transition-colors" />
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Standard View
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Classic grid layout
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
