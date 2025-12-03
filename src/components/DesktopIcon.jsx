import { useRef } from "react";
import { motion } from "framer-motion";

export default function DesktopIcon({ icon: Icon, label, onOpen, delay }) {
  const iconRef = useRef(null);

  const handleClick = (e) => {
    // Capture the exact position of the icon for the window "Zoom out" effect
    const rect = iconRef.current.getBoundingClientRect();
    const origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    onOpen(origin);
  };

  return (
    <motion.div
      ref={iconRef}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.4 }}
      className="desktop-icon flex flex-col items-center gap-2 p-2 rounded-lg cursor-pointer w-24 group animate-float"
      style={{ animationDelay: `${delay * 0.5}s` }}
      onClick={handleClick} // Using single click for better mobile UX, can be onDoubleClick
    >
      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-[1.2rem] flex items-center justify-center shadow-lg border border-white/20 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-105 group-active:scale-95">
        <Icon className="w-8 h-8 text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]" />
      </div>
      <span className="text-white text-xs font-medium px-2 py-1 rounded-md bg-black/20 backdrop-blur-sm shadow-sm group-hover:text-blue-200">
        {label}
      </span>
    </motion.div>
  );
}
