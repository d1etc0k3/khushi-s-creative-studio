import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useState } from "react";
import { LoadingBarOverlay } from "@/components/ui/LoadingBarOverlay";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const [portraitLoading, setPortraitLoading] = useState(true);
  const { displayText } = useTypewriter({
    words: ["I Design.", "I Create.", "I Build."],
    typingSpeed: 120,
    deletingSpeed: 80,
    pauseDuration: 2000,
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="absolute inset-x-0 top-4 z-20 flex justify-center gap-3 px-4 sm:justify-end sm:px-0">
        <Button
          variant="default"
          size="sm"
          className="min-w-[140px]"
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          Explore My Work
        </Button>
        <Button
          variant="default"
          size="sm"
          className="min-w-[140px]"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          Contact
        </Button>
      </div>
      <div className="max-w-7xl w-full grid justify-items-center md:justify-items-stretch md:grid-cols-2 gap-12 items-center -translate-y-5 md:-translate-y-9">
        {/* Left - Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative translate-y-5 sm:translate-y-0"
        >
          <div className="relative aspect-[2/3] max-w-[220px] sm:max-w-[260px] md:max-w-sm mx-auto">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            
            {/* Portrait container */}
            <div className="relative glass rounded-2xl overflow-hidden glow-soft">
              <LoadingBarOverlay visible={portraitLoading} label="Loading portrait..." />
              <img
                src="/images/lol.webp"
                alt="Khushi Gupta"
                className="w-full h-full object-cover "
                loading="lazy"
                decoding="async"
                onLoad={() => setPortraitLoading(false)}
                onError={() => setPortraitLoading(false)}
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
            {["Autodesk Maya", "Substance Painter", "Unreal Engine", "Photoshop","Unity","KeyShot","Marmoset","Illustrator"].map(
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
        </motion.div>
      </div>
    </section>
  );
}
