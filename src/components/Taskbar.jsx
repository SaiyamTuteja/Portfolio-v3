// import { motion, useAnimation } from "framer-motion";
// import AppIcon from "./AppIcon";

// export default function Taskbar({ apps, onOpen, onSearch }) {
//   return (
//     <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[10000]">
//       {/* Dock Background */}
//       <div
//         className="px-2 py-2.5 rounded-[24px] flex items-end gap-2 h-auto shadow-2xl border border-white/10"
//         style={{
//           background: "rgba(255, 255, 255, 0.15)",
//           backdropFilter: "blur(20px)",
//           WebkitBackdropFilter: "blur(20px)",
//         }}
//       >
//         {/* Running Apps from Props */}
//         {apps.map((app) => (
//           <DockItem
//             key={app.id}
//             onClick={() => onOpen(app.id)}
//             isOpen={app.isOpen}
//             label={app.title}
//           >
//             <AppIcon icon={app.icon} id={app.id} title={app.title} size={48} />
//           </DockItem>
//         ))}

//         {/* Separator Line */}
//         <div className="w-[1px] h-10 bg-white/20 mx-1 self-center rounded-full"></div>

//         {/* Spotlight Icon - UPDATED ID */}
//         <DockItem onClick={onSearch} label="Spotlight">
//           <AppIcon id="spotlight" title="Spotlight" size={48} />
//         </DockItem>
//       </div>
//     </div>
//   );
// }

// // Sub-component for individual Dock Items
// function DockItem({ children, onClick, isOpen, label }) {
//   const controls = useAnimation();

//   const handleClick = async () => {
//     onClick();
//     // Bounce Animation
//     await controls.start({
//       y: [0, -20, 0, -10, 0],
//       transition: { duration: 0.8, ease: "easeOut" },
//     });
//   };

//   return (
//     <motion.button
//       onClick={handleClick}
//       animate={controls}
//       whileHover={{ y: -10, scale: 1.15, margin: "0 5px" }}
//       whileTap={{ scale: 0.9 }}
//       className="relative group flex flex-col items-center transition-all duration-200 ease-out"
//     >
//       {children}

//       {/* Open Indicator Dot */}
//       {isOpen && (
//         <div className="absolute -bottom-2 w-1 h-1 bg-white/90 rounded-full shadow-sm" />
//       )}

//       {/* Tooltip */}
//       <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#1e1e1e]/90 backdrop-blur-md text-white text-[12px] font-medium py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-xl">
//         {label}
//       </span>
//     </motion.button>
//   );
// }

import { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import AppIcon from "./AppIcon";

export default function Taskbar({ apps, onOpen, onSearch }) {
  const handleSafariClick = () => onOpen("safari");
  const handleMailClick = () =>
    (window.location.href = "mailto:saiyamtuteja@gmail.com");

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[10000]">
      <div
        className="px-2 py-2.5 rounded-[24px] flex items-end gap-2 h-auto shadow-2xl border border-white/10"
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Pinned Apps */}
        <DockItem
          onClick={() => onOpen("finder")}
          label="Finder"
          isOpen={apps.find((a) => a.id === "finder")?.isOpen}
        >
          <AppIcon id="finder" title="Finder" size={48} />
        </DockItem>

        <DockItem
          onClick={handleSafariClick}
          label="Safari"
          isOpen={apps.find((a) => a.id === "safari")?.isOpen}
        >
          <AppIcon id="safari" title="Safari" size={48} />
        </DockItem>

        <DockItem onClick={handleMailClick} label="Mail">
          <AppIcon id="mail" title="Mail" size={48} />
        </DockItem>

        <div className="w-[1px] h-10 bg-white/20 mx-1 self-center rounded-full"></div>

        {/* Running Apps */}
        {apps.map((app) => {
          if (["finder", "safari", "trash"].includes(app.id)) return null;
          return (
            <DockItem
              key={app.id}
              onClick={() => onOpen(app.id)}
              isOpen={app.isOpen}
              label={app.title}
            >
              <AppIcon
                icon={app.icon}
                id={app.id}
                title={app.title}
                size={48}
              />
            </DockItem>
          );
        })}

        {apps.filter((a) => !["finder", "safari", "trash"].includes(a.id))
          .length > 0 && (
          <div className="w-[1px] h-10 bg-white/20 mx-1 self-center rounded-full"></div>
        )}

        {/* --- SYSTEM --- */}

        {/* TRASH ICON WITH ID FOR DROP TARGET */}
        <div id="trash-dock-icon">
          <DockItem
            onClick={() => onOpen("trash")}
            label="Trash"
            isOpen={apps.find((a) => a.id === "trash")?.isOpen}
          >
            <AppIcon id="trash" title="Trash" size={48} />
          </DockItem>
        </div>

        <DockItem onClick={onSearch} label="Spotlight">
          <AppIcon id="launchpad" title="Spotlight" size={48} />
        </DockItem>
      </div>
    </div>
  );
}

function DockItem({ children, onClick, isOpen, label }) {
  const controls = useAnimation();

  const handleClick = async () => {
    if (onClick) onClick();
    await controls.start({
      y: [0, -20, 0, -10, 0],
      transition: { duration: 0.8, ease: "easeOut" },
    });
  };

  return (
    <motion.button
      onClick={handleClick}
      animate={controls}
      whileHover={{ y: -10, scale: 1.15, margin: "0 5px" }}
      whileTap={{ scale: 0.9 }}
      className="relative group flex flex-col items-center transition-all duration-200 ease-out"
    >
      {children}
      {isOpen && (
        <div className="absolute -bottom-2 w-1 h-1 bg-white/90 rounded-full shadow-sm" />
      )}
      <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#1e1e1e]/90 backdrop-blur-md text-white text-[12px] font-medium py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-xl">
        {label}
      </span>
    </motion.button>
  );
}
