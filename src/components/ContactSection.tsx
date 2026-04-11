import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="px-6 py-20 md:py-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Let’s connect and bring your next project to life.
          </h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-background/80 p-8 shadow-[0_28px_80px_rgba(0,0,0,0.16)] backdrop-blur-xl md:p-10">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-3xl">
            I’m always open to collaborations, freelance work, and creative projects. Reach out by email, review my latest work on ArtStation, or open my resume directly.
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-3 rounded-3xl border border-white/10 bg-background/60 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Email</p>
              <a
                href="mailto:khushi13212gupta@gmail.com"
                className="text-lg font-semibold text-foreground hover:text-primary transition-colors break-all"
              >
                khushi13212gupta@gmail.com
              </a>
            </div>
            <div className="space-y-3 rounded-3xl border border-white/10 bg-background/60 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">ArtStation</p>
              <a
                href="https://www.artstation.com/yappi_barrraaaa4"
                target="_blank"
                rel="noreferrer"
                className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
              >
                artstation.com/yappi_barrraaaa4
              </a>
            </div>
            <div className="space-y-3 rounded-3xl border border-white/10 bg-background/60 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Resume</p>
              <a
                href="/resume_.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
              >
                Open Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
