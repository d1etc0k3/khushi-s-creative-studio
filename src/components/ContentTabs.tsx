import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface ContentTabsProps {
  tabs: Tab[];
  onActiveTabChange?: (tabId: string) => void;
}

export function ContentTabs({ tabs, onActiveTabChange }: ContentTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onActiveTabChange?.(tabId);
  };

  return (
    <div className="w-full">
      {/* Tab buttons */}
      <div className="flex gap-2 mb-6 p-1 glass rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "relative flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
              activeTab === tab.id
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary rounded-lg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="relative min-h-[200px]">
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
