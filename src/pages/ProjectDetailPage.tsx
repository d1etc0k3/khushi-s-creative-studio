import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import { ModelViewer } from "@/components/ModelViewer";
import { ContentTabs } from "@/components/ContentTabs";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const tabs = [
    {
      id: "concept",
      label: "Concept",
      content: (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Project Concept
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {project.concept}
          </p>
        </div>
      ),
    },
    {
      id: "uv",
      label: "UV Pack-Unwrap",
      content: (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground">
            UV Mapping & Texturing
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {project.uvDescription}
          </p>
          {/* Placeholder for UV images */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="aspect-square glass rounded-xl overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="UV Layout"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
            <div className="aspect-square glass rounded-xl overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Texture Map"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "renders",
      label: "Renders",
      content: (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Final Renders
          </h3>
          <div className="grid gap-4">
            {project.renders.map((render, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="aspect-video glass rounded-xl overflow-hidden"
              >
                <img
                  src={render}
                  alt={`Render ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-6 py-20"
    >
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-[150px]" />
      </div>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          to="/projects"
          className="flex items-center gap-2 px-4 py-2 glass rounded-full hover:glow-soft transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-primary group-hover:text-accent transition-colors" />
          <span className="text-sm text-foreground">Back to Projects</span>
        </Link>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full mb-4">
            {project.type === "3d" ? "3D Model" : "2D Artwork"}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            {project.title}
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            {project.shortDescription}
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left - Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="sticky top-24"
          >
            {project.type === "3d" ? (
              <div className="aspect-square">
                <ModelViewer modelPath={project.modelPath || ""} />
              </div>
            ) : (
              <div className="aspect-square glass rounded-2xl overflow-hidden">
                <img
                  src={project.imagePath}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </motion.div>

          {/* Right - Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <ContentTabs tabs={tabs} />
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
