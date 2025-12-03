import { useState, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { X, Minus, Maximize2, Minimize2 } from "lucide-react";

export default function Window({
  id,
  title,
  content,
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  originRect,
  dockIndex,
  totalDockItems,
}) {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check if this window needs full-bleed layout (No padding/default bg)
  // Finder, Resume, Notepad handle their own layout.
  const isFullBleedApp = ["finder", "resume", "notepad"].some((appId) =>
    id.includes(appId)
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dockItemWidth = 60;
  const dockWidth = totalDockItems * dockItemWidth;
  const dockOffset =
    dockIndex * dockItemWidth - dockWidth / 2 + dockItemWidth / 2;
  const initialX = originRect ? originRect.x - (isMobile ? 0 : 400) : 0;
  const initialY = originRect ? originRect.y - 300 : 0;

  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: initialX,
      y: initialY,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      width: isMobile ? "95vw" : "800px",
      height: isMobile ? "75vh" : "600px",
      top: isMobile ? "10vh" : "calc(50vh - 300px)",
      left: isMobile ? "2.5vw" : "calc(50vw - 400px)",
      borderRadius: "12px",
      filter: "blur(0px)",
      transitionEnd: { transform: "none" },
      transition: { type: "spring", damping: 25, stiffness: 350, mass: 0.8 },
    },
    maximized: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      top: "32px",
      left: 0,
      width: "100vw",
      height: "calc(100vh - 32px - 90px)",
      borderRadius: "0px 0px 12px 12px",
      filter: "blur(0px)",
      transitionEnd: { transform: "none" },
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
    minimized: {
      opacity: 0,
      scale: 0,
      scaleY: 0,
      y: window.innerHeight / 2 + 300,
      x: dockOffset,
      filter: "blur(10px)",
      transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
      transition: { duration: 0.2 },
    },
  };

  const toggleMaximize = (e) => {
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };
  const startDrag = (e) => {
    if (!isMaximized) dragControls.start(e);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={id}
          initial="hidden"
          animate={
            isMinimized ? "minimized" : isMaximized ? "maximized" : "visible"
          }
          exit="exit"
          variants={variants}
          drag={!isMinimized && !isMaximized}
          dragListener={false}
          dragControls={dragControls}
          dragMomentum={false}
          onMouseDown={() => onFocus(id)}
          style={{ zIndex }}
          // Dynamic Background: Solid color for Finder/Notepad, Glass for others
          className={`absolute flex flex-col overflow-hidden shadow-2xl border border-white/20 
            ${
              isMaximized ? "bg-[#1e1e1e]" : "bg-slate-900/85 backdrop-blur-2xl"
            }`}
        >
          {/* Header */}
          <div
            className="window-header h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 shrink-0 touch-none select-none"
            onPointerDown={startDrag}
            onDoubleClick={toggleMaximize}
            style={{ cursor: isMaximized ? "default" : "grab" }}
          >
            <div className="flex gap-2 group z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(id);
                }}
                className="w-3 h-3 rounded-full bg-[#FF5F57] flex items-center justify-center hover:shadow-lg transition-all active:scale-90"
              >
                <X className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize(id);
                }}
                className="w-3 h-3 rounded-full bg-[#FEBC2E] flex items-center justify-center hover:shadow-lg transition-all active:scale-90"
              >
                <Minus className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={toggleMaximize}
                className="w-3 h-3 rounded-full bg-[#28C840] flex items-center justify-center hover:shadow-lg transition-all active:scale-90"
              >
                {isMaximized ? (
                  <Minimize2 className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" />
                ) : (
                  <Maximize2 className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" />
                )}
              </button>
            </div>
            <span className="absolute left-0 right-0 text-center text-white/80 text-sm font-medium pointer-events-none">
              {title}
            </span>
            <div className="w-10"></div>
          </div>

          {/* Content Area */}
          {/* If FullBleed App (Finder), remove default padding/bg styles */}
          <div
            className={`flex-1 overflow-auto custom-scrollbar 
            ${
              isFullBleedApp
                ? "bg-white text-gray-900"
                : "text-white bg-black/20"
            }`}
          >
            {content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
