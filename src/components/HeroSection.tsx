import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { Link } from "react-router-dom";

export function HeroSection() {
  const { displayText } = useTypewriter({
    words: ["I Design.", "I Create.", "I Build."],
    typingSpeed: 120,
    deletingSpeed: 80,
    pauseDuration: 2000,
  });

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative aspect-[3/4] max-w-sm mx-auto">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            
            {/* Portrait container */}
            <div className="relative glass rounded-2xl overflow-hidden glow-soft">
              <img
              src="/images/bla.jpeg"
              alt="Khushi Gupta"
              className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Right - Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-center md:text-left"
        >
          {/* Typewriter headline */}
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">{displayText}</span>
            <span className="animate-pulse text-primary">|</span>
          </h1>

          {/* Name */}
          <h2 className="text-2xl md:text-3xl font-display text-foreground mb-4">
            <b>Khushi Gupta</b>

          </h2>

          {/* Introduction */}
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
            <b>Animation & Game Design student at World University of Design,</b> 
            <b>passionate about bringing imaginative worlds to life through </b> 
            <b>3D modeling, texturing, and environment design.</b>
          </p>

          {/* Skills badges */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
            {["Autodesk Maya", "Substance Painter", "Unreal Engine", "Photoshop"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 glass rounded-full text-sm text-accent font-bold"
                >
                  {skill}
                </span>
              )
            )}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="#projects"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="text-lg font-bold">Explore My Work</span>
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
