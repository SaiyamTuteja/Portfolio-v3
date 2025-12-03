import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DesktopContextMenu({
  x,
  y,
  isOpen,
  onClose,
  onNewFile,
  onRefresh,
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          style={{ top: y, left: x }}
          className="absolute z-[9999] w-48 bg-gray-900/90 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl py-1 overflow-hidden"
          onContextMenu={(e) => e.preventDefault()} // Prevent native menu inside custom menu
        >
          <MenuItem label="New Folder" disabled />
          <MenuItem
            label="New File"
            onClick={() => {
              onNewFile();
              onClose();
            }}
          />
          <div className="h-[1px] bg-white/10 my-1 mx-2"></div>
          <MenuItem label="Get Info" disabled />
          <MenuItem label="Change Wallpaper..." disabled />
          <div className="h-[1px] bg-white/10 my-1 mx-2"></div>
          <MenuItem
            label="Refresh"
            onClick={() => {
              onRefresh();
              onClose();
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MenuItem({ label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left px-4 py-1.5 text-sm flex justify-between items-center group
        ${
          disabled
            ? "text-gray-500 cursor-default"
            : "text-white hover:bg-blue-600 cursor-pointer"
        }`}
    >
      {label}
    </button>
  );
}
