import { motion, useAnimation } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect } from "react";

export default function Taskbar({ apps, onOpen, onSearch }) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[10000]">
      <div className="glass-panel px-4 py-2 rounded-2xl flex items-end gap-3 h-[70px] bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl">
        {/* Search App */}
        <DockItem onClick={onSearch} label="Spotlight">
          <div className="w-12 h-12 bg-gray-100/10 rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
            <Search className="w-6 h-6 text-white" />
          </div>
        </DockItem>

        {/* Separator */}
        <div className="w-[1px] h-8 bg-white/20 mb-4 mx-1"></div>

        {/* Running Apps */}
        {apps.map((app) => (
          <DockItem
            key={app.id}
            onClick={() => onOpen(app.id)}
            isOpen={app.isOpen}
            label={app.title}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 shadow-lg transition-colors ${
                app.isOpen ? "bg-white/20" : "bg-white/5"
              }`}
            >
              <app.icon className="w-6 h-6 text-white" />
            </div>
          </DockItem>
        ))}
      </div>
    </div>
  );
}

// Sub-component for individual Dock Items to handle their own animation state
function DockItem({ children, onClick, isOpen, label }) {
  const controls = useAnimation();

  const handleClick = async () => {
    onClick();
    // macOS Jump Animation Sequence
    await controls.start({
      y: [0, -20, 0, -10, 0],
      transition: { duration: 0.6, ease: "easeOut" },
    });
  };

  return (
    <motion.button
      onClick={handleClick}
      animate={controls}
      whileHover={{ y: -10, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative group pb-2"
    >
      {children}

      {/* Open Indicator Dot */}
      {isOpen && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/80 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
      )}

      {/* Tooltip */}
      <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
        {label}
      </span>
    </motion.button>
  );
}
