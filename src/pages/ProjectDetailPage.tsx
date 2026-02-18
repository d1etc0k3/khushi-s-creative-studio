import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { projects } from "@/data/projects";
import { ModelViewer } from "@/components/ModelViewer";
import { ContentTabs } from "@/components/ContentTabs";
import { withBase } from "@/lib/assets";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [activeTab, setActiveTab] = useState("renders");

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Special-case: project-2 should open the Level Design PDF by itself
  if (project.id === "project-2") {
    return (
      <main className="min-h-screen bg-background">
        <iframe
          src={withBase("level-design.pdf")}
          title="Level Design PDF"
          className="w-full min-h-screen"
          style={{ border: "none" }}
        />
      </main>
    );
  }

  // Determine which model to display based on active tab
  const getActiveModelPath = () => {
    switch (activeTab) {
      case "mesh":
        return project.meshModelPath || project.modelPath || "";
      case "wireframe":
        return project.meshModelPath || project.modelPath || "";
      default:
        return project.modelPath || "";
    }
  };

  const tabs = [
    {
      id: "renders",
      label: "Renders",
      content: (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Renders
          </h3>
          {project.id === "project-1" ? (
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                This is a stylized miniature environment exploring vertical architecture within a compact space. The structure rises through layered platforms, balconies, and mechanical elements, creating a dynamic silhouette and strong visual hierarchy.
              </p>
              <p>
                The oversized wheel and stacked forms guide the viewer’s eye upward, while grounded base details add realism and weight to the composition. The scene focuses on asymmetry, structural storytelling, and warm cinematic lighting to create an immersive small-scale world.
              </p>
              <div>
                <p className="font-semibold text-foreground mb-2">This project highlights:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Vertical composition</li>
                  <li>Silhouette design</li>
                  <li>Prop detailing</li>
                  <li>Stylized architectural modeling</li>
                  <li>Mood-driven lighting</li>
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground leading-relaxed">
              {project.renders}
            </p>
          )}
        </div>
      ),
    },
    {
      id: "mesh",
      label: "Mesh",
      content: (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Mesh
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {project.mesh}
          </p>
          {/* Mesh images */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="aspect-square glass rounded-xl overflow-hidden">
              <img
                src={
                  project.id === "project-1"
                    ? withBase("images/mesh1.png")
                    : project.id === "project-3"
                    ? withBase("images/mesh11.png")
                    : withBase("placeholder.svg")
                }
                alt="Mesh view 1"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            <div className="aspect-square glass rounded-xl overflow-hidden">
              <img
                src={
                  project.id === "project-1"
                    ? withBase("images/mesh2.png")
                    : project.id === "project-3"
                    ? withBase("images/mesh12.png")
                    : withBase("placeholder.svg")
                }
                alt="Mesh view 2"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      ),
    },
    ...(project.id === "project-1"
      ? [
          {
            id: "wireframe",
            label: "Wireframe",
            content: (
              <div className="space-y-4">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Wireframe
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Wireframe pass highlighting topology and UV layout for the diorama model.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {["UV1.png", "UV2.png", "UV3.png"].map((img) => (
                    <div key={img} className="aspect-square glass rounded-lg overflow-hidden">
                      <img
                        src={withBase(`images/${img}`)}
                        alt={img.replace(".png", "")}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-4 py-4 pt-16 md:pt-6 flex flex-col"
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
          to="/floating"
          className="flex items-center gap-2 px-4 py-2 glass rounded-full hover:glow-soft transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-primary group-hover:text-accent transition-colors" />
          <span className="text-sm text-foreground">Back to Projects</span>
        </Link>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10 flex-1 flex flex-col">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 flex-shrink-0"
        >
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            {project.title}
          </h1>
          <p className="mt-2 text-muted-foreground text-sm max-w-2xl mx-auto">
            {project.shortDescription}
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-4 items-stretch flex-1 min-h-0">
          {/* Left - Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 min-h-0"
          >
            {project.type === "3d" ? (
              <div className="h-full min-h-[300px]">
                <ModelViewer
                  modelPath={getActiveModelPath()}
                  lighting={project.lighting}
                  tabType={activeTab as "renders" | "mesh"}
                  projectId={project.id}
                />
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
            className="glass rounded-2xl p-4 overflow-y-auto h-full min-h-0"
          >
            <ContentTabs tabs={tabs} onActiveTabChange={setActiveTab} />
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
