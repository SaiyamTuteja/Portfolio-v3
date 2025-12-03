import { useRef } from "react";
import { motion } from "framer-motion";
import AppIcon from "./AppIcon";

export default function DesktopIcon({ icon, label, onOpen, delay, id }) {
  const iconRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
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
      transition={{ delay: delay * 0.05, duration: 0.3 }}
      className="flex flex-col items-center gap-1 p-2 w-[100px] cursor-none group"
      onClick={handleClick}
    >
      {/* Icon Image */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="filter drop-shadow-2xl"
      >
        <AppIcon icon={icon} id={id} title={label} size={64} />
      </motion.div>

      {/* Text Label with Shadow */}
      <span
        className="
          text-[13px] font-medium text-white text-center leading-tight tracking-wide
          drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]
          px-2 py-0.5 rounded-md
          group-hover:bg-[#0058d0] transition-colors
        "
        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}
