import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DesktopContextMenu({
  x,
  y,
  isOpen,
  onClose,
  onNewFile,
  onRefresh,
  onOpenWallpaper,
  onOpenAbout, // Received props
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

  const menuItems = [
    {
      label: "New Folder",
      action: () => {
        console.log("New Folder");
        onClose();
      },
      disabled: false,
    },
    {
      label: "New File",
      action: () => {
        onNewFile();
        onClose();
      },
      disabled: false,
    },
    { type: "separator" },
    {
      label: "Get Info",
      action: () => {
        onOpenAbout();
        onClose();
      },
      disabled: false,
    }, // Opens About Me
    {
      label: "Change Desktop Background...",
      action: () => {
        onOpenWallpaper();
        onClose();
      },
      disabled: false,
    }, // Opens Wallpaper Selector
    { type: "separator" },
    { label: "Use Stacks", disabled: true },
    { label: "Sort By", disabled: true },
    { label: "Clean Up", disabled: true },
    { label: "Clean Up By", disabled: true },
    { type: "separator" },
    { label: "Show View Options", disabled: true },
    { type: "separator" },
    {
      label: "Refresh",
      action: () => {
        onRefresh();
        onClose();
      },
      disabled: false,
    },
  ];

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
          className="absolute z-[9999] w-64 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl py-1.5 overflow-hidden font-sans select-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          {menuItems.map((item, idx) =>
            item.type === "separator" ? (
              <div key={idx} className="h-[1px] bg-white/10 my-1 mx-3"></div>
            ) : (
              <button
                key={idx}
                disabled={item.disabled}
                onClick={item.action}
                className={`w-full text-left px-4 py-1 text-[13px] flex justify-between items-center group transition-colors
                  ${
                    item.disabled
                      ? "text-gray-500 cursor-default"
                      : "text-white hover:bg-blue-600 active:bg-blue-700 cursor-pointer"
                  }
                `}
              >
                {item.label}
              </button>
            )
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
