import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

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
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-12">
          <span className="mr-3">View my</span>
          <Link
            to="/floating"
            className="group inline-flex items-center gap-4 px-8 py-4 glass rounded-2xl hover:glow-primary transition-all duration-300 align-middle"
          >
            <div className="relative">
              <Sparkles className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
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
                      top: `${Math.sin((i * 120 * Math.PI) / 180) * 22 + 14}px`,
                      left: `${Math.cos((i * 120 * Math.PI) / 180) * 22 + 14}px`,
                    }}
                  />
                ))}
              </motion.div>
            </div>
            <span className="text-gradient text-5xl pb-2">Projects</span>
          </Link>
        </h2>
      </motion.div>
    </section>
  );
}
