import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppErrorBoundary } from "@/components/AppErrorBoundary";

const HomePage = lazy(() => import("@/pages/HomePage"));
const FloatingViewPage = lazy(() => import("@/pages/FloatingViewPage"));
const ProjectDetailPage = lazy(() => import("@/pages/ProjectDetailPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();
const PageLoader = (
  <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
    Loading...
  </div>
);

const App = () => (
  <AppErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Suspense fallback={PageLoader}><HomePage /></Suspense>} />
              <Route path="/projects" element={<Suspense fallback={PageLoader}><FloatingViewPage /></Suspense>} />
              {/* <Route path="/projects" element={<ProjectsPage />} /> */}
              <Route path="/projects/:id" element={<Suspense fallback={PageLoader}><ProjectDetailPage /></Suspense>} />
              <Route path="*" element={<Suspense fallback={PageLoader}><NotFound /></Suspense>} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AppErrorBoundary>
);

export default App;
