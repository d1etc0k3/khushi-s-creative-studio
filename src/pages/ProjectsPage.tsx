import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-6 py-20"
    >
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-[150px]" />
      </div>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            My <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            A collection of 3D art and game design work
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link
                to={`/projects/${project.id}`}
                className="block group"
              >
                <motion.div
                  className="relative glass rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Image container */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.imagePath}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    
                    {/* Glow on hover */}
                    <motion.div
                      className="absolute inset-0 bg-primary/10"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                        {project.type === "3d" ? "3D Model" : "2D Art"}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Border glow on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
                    whileHover={{ 
                      borderColor: "hsl(263 70% 50% / 0.5)",
                      boxShadow: "0 0 30px hsl(263 70% 50% / 0.2)"
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.main>
  );
}
