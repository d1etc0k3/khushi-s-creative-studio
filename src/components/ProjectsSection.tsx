import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { projects } from "@/data/projects";
import { LoadingBarOverlay } from "@/components/ui/LoadingBarOverlay";

export function ProjectsSection() {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const markLoaded = (projectId: string) => {
    setLoadedImages((prev) => (prev[projectId] ? prev : { ...prev, [projectId]: true }));
  };

  return (
    <section id="projects" className="px-6 py-20 md:py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">My Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 md:gap-10">
          {projects.slice(0, 2).map((project, index) => {
            const peekOne = project.renderImages[0] ?? project.imagePath;
            const peekTwo = project.renderImages[1] ?? project.imagePath;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                className="group"
              >
                <Link to={`/projects/${project.id}`} className="block relative h-[22rem] md:h-[25rem]">
                  <div className="pointer-events-none absolute inset-x-8 top-8 h-28 rounded-3xl bg-primary/20 blur-3xl opacity-70 group-hover:opacity-100 transition-opacity" />

                  <img
                    src={peekTwo}
                    alt={`${project.title} render preview`}
                    className="absolute inset-x-10 top-14 h-[46%] w-auto max-w-[82%] mx-auto object-cover rounded-2xl border border-white/25 shadow-2xl rotate-[-7deg] translate-y-[-10px] md:translate-y-[-10 px] md:group-hover:translate-y-[-65px] md:group-hover:rotate-[-11deg] transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src={peekOne}
                    alt={`${project.title} featured render`}
                    className="absolute inset-x-10 top-16 h-[48%] w-auto max-w-[84%] mx-auto object-cover rounded-2xl border border-white/35 shadow-2xl rotate-[6deg] translate-y-[-10px] md:translate-y-[-8px] md:group-hover:translate-y-[-65px] md:group-hover:rotate-[10deg] transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="absolute inset-x-4 md:inset-x-6 bottom-0 h-[66%] rounded-3xl border border-[#ffffff36] bg-background/35 backdrop-blur-xl shadow-[0_24px_44px_rgba(0,0,0,0.35)] overflow-hidden">
                    

                    <div className="absolute inset-0">
                      <LoadingBarOverlay visible={!loadedImages[project.id]} label="Opening folder..." />
                      <img
                        src={project.imagePath}
                        alt={project.title}
                        className="h-full w-full object-cover opacity-50 blur-[1.5px]"
                        loading="lazy"
                        decoding="async"
                        onLoad={() => markLoaded(project.id)}
                        onError={() => markLoaded(project.id)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-background/20" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="mt-1 font-display text-2xl md:text-3xl text-foreground">{project.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{project.shortDescription}</p>
                        </div>
                        <div className="mt-1 rounded-full border border-primary/40 bg-primary/10 p-2 text-primary group-hover:bg-primary/20 transition-colors">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
