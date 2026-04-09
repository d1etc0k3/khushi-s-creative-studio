import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";
import { LoadingBarOverlay } from "@/components/ui/LoadingBarOverlay";

type LeftTab = "asset-turntable" | "renders";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [activeTab, setActiveTab] = useState<LeftTab>("asset-turntable");
  const [activeRenderIndex, setActiveRenderIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [rendersReady, setRendersReady] = useState(false);
  const [loadedRenderCount, setLoadedRenderCount] = useState(0);
  const [turntableFallbackLoading, setTurntableFallbackLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfSessionKey, setPdfSessionKey] = useState(() => Date.now());
  const preloadedProjectsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!project) {
      return;
    }
    setActiveTab("asset-turntable");
    setActiveRenderIndex(0);
    setVideoFailed(false);
    setTurntableFallbackLoading(true);
    setPdfLoading(true);
    setPdfSessionKey(Date.now());
  }, [project]);

  const renderImages = useMemo(() => {
    if (!project) {
      return [];
    }
    return project.renderImages.length > 0 ? project.renderImages : [project.imagePath];
  }, [project]);

  useEffect(() => {
    if (renderImages.length === 0) {
      return;
    }
    setActiveRenderIndex((prev) => prev % renderImages.length);
  }, [renderImages.length]);

  useEffect(() => {
    if (!project) {
      return;
    }

    const total = renderImages.length;
    const alreadyPreloaded = preloadedProjectsRef.current.has(project.id);

    if (alreadyPreloaded) {
      setLoadedRenderCount(total);
      setRendersReady(true);
      return;
    }

    if (activeTab !== "renders") {
      setLoadedRenderCount(0);
      setRendersReady(false);
      return;
    }

    if (total === 0) {
      setLoadedRenderCount(0);
      setRendersReady(true);
      preloadedProjectsRef.current.add(project.id);
      return;
    }

    let isCancelled = false;
    setLoadedRenderCount(0);
    setRendersReady(false);

    const preloadAllRenders = async () => {
      let loaded = 0;

      await Promise.all(
        renderImages.map(
          (src) =>
            new Promise<void>((resolve) => {
              const img = new window.Image();

              const handleDone = () => {
                loaded += 1;
                if (!isCancelled) {
                  setLoadedRenderCount(loaded);
                }
                resolve();
              };

              img.onload = handleDone;
              img.onerror = handleDone;
              img.src = src;
            }),
        ),
      );

      if (isCancelled) {
        return;
      }

      preloadedProjectsRef.current.add(project.id);
      setRendersReady(true);
    };

    preloadAllRenders();

    return () => {
      isCancelled = true;
    };
  }, [project, renderImages, activeTab]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const totalImages = Math.max(renderImages.length, 1);
  const currentImage = renderImages[activeRenderIndex % totalImages] ?? project.imagePath;

  const showPrev = () => {
    setActiveRenderIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const showNext = () => {
    setActiveRenderIndex((prev) => (prev + 1) % totalImages);
  };

  const onTouchStart = (x: number) => {
    setTouchStartX(x);
  };

  const onTouchEnd = (x: number) => {
    if (touchStartX === null) {
      return;
    }

    const delta = x - touchStartX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        showPrev();
      } else {
        showNext();
      }
    }
    setTouchStartX(null);
  };

  const pdfSrc = `${project.pdfPath}${project.pdfPath.includes("?") ? "&" : "?"}session=${pdfSessionKey}#view=FitH&toolbar=0&navpanes=0&statusbar=0`;
  const renderProgress = totalImages > 0 ? (Math.min(loadedRenderCount, totalImages) / totalImages) * 100 : 100;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen px-4 py-4 pt-16 md:pt-6 flex flex-col"
    >
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="fixed top-6 left-6 z-50">
        <Link
          to="/projects"
          className="flex items-center gap-2 px-4 py-2 glass rounded-full hover:glow-soft transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-primary group-hover:text-accent transition-colors" />
          <span className="text-sm text-foreground">Back to Projects</span>
        </Link>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10 flex-1 flex flex-col min-h-0 w-full">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4 flex-shrink-0">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{project.title}</h1>
          <p className="mt-2 text-muted-foreground text-sm max-w-2xl mx-auto">{project.shortDescription}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
          <motion.section
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-3 md:p-4 flex flex-col min-h-[360px] lg:min-h-0"
          >
            <div className="grid grid-cols-2 gap-2 rounded-xl border border-border/50 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("asset-turntable")}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeTab === "asset-turntable" ? "bg-primary text-primary-foreground" : "bg-background/60 text-foreground"
                }`}
              >
                Asset Turntable
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("renders")}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeTab === "renders" ? "bg-primary text-primary-foreground" : "bg-background/60 text-foreground"
                }`}
              >
                Renders
              </button>
            </div>

            <div className="relative mt-[5px] flex-1 min-h-[280px] rounded-xl overflow-hidden border border-border/50 bg-black/25">
              <AnimatePresence mode="wait">
                {activeTab === "asset-turntable" ? (
                  <motion.div
                    key="turntable"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="h-full"
                  >
                    {project.turntableVideoPath && !videoFailed ? (
                      <video
                        src={project.turntableVideoPath}
                        className="w-full h-full object-contain"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        onError={() => setVideoFailed(true)}
                      />
                    ) : (
                      <div className="relative w-full h-full flex items-center justify-center bg-background/50">
                        <LoadingBarOverlay visible={turntableFallbackLoading} label="Loading preview..." />
                        <img
                          src={project.imagePath}
                          alt={`${project.title} preview`}
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                          decoding="async"
                          onLoad={() => setTurntableFallbackLoading(false)}
                          onError={() => setTurntableFallbackLoading(false)}
                        />
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="renders"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full p-2"
                    onTouchStart={(event) => onTouchStart(event.changedTouches[0]?.clientX ?? 0)}
                    onTouchEnd={(event) => onTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
                  >
                    {!rendersReady ? (
                      <div className="h-full w-full flex flex-col items-center justify-center gap-3 bg-background/30">
                        <div className="w-[76%] max-w-sm space-y-2">
                          <LoadingBarOverlay
                            visible
                            inline
                            progress={renderProgress}
                            label={`Loading renders ${Math.min(loadedRenderCount, totalImages)} / ${totalImages}`}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="relative w-full h-full overflow-hidden">
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={currentImage}
                              src={currentImage}
                              alt={`${project.title} render ${activeRenderIndex + 1}`}
                              className="absolute inset-0 w-full h-full object-contain"
                              loading="lazy"
                              decoding="async"
                              initial={{ opacity: 0.2, scale: 0.99 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0.2, scale: 1.01 }}
                              transition={{ duration: 0.28, ease: "easeInOut" }}
                            />
                          </AnimatePresence>
                        </div>

                        <button
                          type="button"
                          onClick={showPrev}
                          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 hover:bg-background p-2 transition-colors"
                          aria-label="Previous render"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={showNext}
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 hover:bg-background p-2 transition-colors"
                          aria-label="Next render"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-background/70 px-3 py-1 text-xs text-foreground/90">
                          {activeRenderIndex + 1} / {totalImages}
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.16 }}
            className="glass rounded-2xl overflow-hidden min-h-[420px] lg:min-h-0 h-[70vh] lg:h-full"
          >
            <div className="relative h-full w-full">
              <LoadingBarOverlay visible={pdfLoading} label="Loading PDF..." />
              <iframe
                src={pdfSrc}
                title={`${project.title} PDF`}
                className="w-full h-full"
                style={{ border: "none" }}
                loading="lazy"
                onLoad={() => setPdfLoading(false)}
              />
            </div>
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
}
