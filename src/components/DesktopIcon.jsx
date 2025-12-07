import { useRef } from "react";
import { motion } from "framer-motion";
import AppIcon from "./AppIcon";

export default function DesktopIcon({
  id,
  icon,
  label,
  onOpen,
  onDrop,
  style, // Accept style from parent
  className, // Accept className from parent
}) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      drag
      dragMomentum={false}
      onDragEnd={(event, info) => {
        if (onDrop) onDrop(id, info.point);
      }}
      onDoubleClick={() => onOpen(null)}
      // Allow parent to pass classNames (like 'absolute' or positioning classes)
      className={`flex flex-col items-center gap-1.5 w-[80px] group cursor-default p-2 rounded-md hover:bg-white/10 active:bg-white/20 transition-colors border border-transparent focus:border-white/20 active:opacity-80 desktop-icon ${
        className || ""
      }`}
      // Allow parent to pass styles (like top/left coordinates)
      style={style}
    >
      <div className="filter drop-shadow-md pointer-events-none">
        <AppIcon icon={icon} id={id} title={label} size={48} />
      </div>
      <span className="text-white text-[12px] font-medium drop-shadow-md text-center leading-tight px-1 rounded-sm bg-black/0 group-hover:bg-black/20 group-focus:bg-blue-600 line-clamp-2 select-none">
        {label}
      </span>
    </motion.div>
  );
}
