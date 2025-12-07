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

import { motion, useAnimation } from "framer-motion";
import AppIcon from "./AppIcon";

export default function Taskbar({ apps, onOpen, onSearch }) {
  // Handler for Safari: Opens Google Search
  const handleSafariClick = () => {
    window.open("https://www.google.com/search?q=Saiyam+Tuteja", "_blank");
  };

  // Handler for Mail: Opens Default Mail Client
  const handleMailClick = () => {
    window.location.href = "mailto:saiyamtuteja@gmail.com";
  };

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[10000]">
      {/* Dock Background: macOS style glass */}
      <div
        className="px-2 py-2.5 rounded-[24px] flex items-end gap-2 h-auto shadow-2xl border border-white/10"
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Divider between Pinned and Running Apps */}
        {/* {apps.length > 0 && ( */}
        {/* <div className="w-[1px] h-10 bg-white/20 mx-1 self-center rounded-full"></div> */}
        {/* )} */}

        {/* --- 2. RUNNING APPS (From Props) --- */}
        {apps.map((app) => (
          <DockItem
            key={app.id}
            onClick={() => onOpen(app.id)}
            isOpen={app.isOpen}
            label={app.title}
          >
            <AppIcon icon={app.icon} id={app.id} title={app.title} size={48} />
          </DockItem>
        ))}
        {/* --- 1. STATIC PINNED APPS --- */}

        {/* Safari */}
        <DockItem onClick={handleSafariClick} label="Safari">
          <AppIcon id="safari" title="Safari" size={48} />
        </DockItem>

        {/* Mail */}
        <DockItem onClick={handleMailClick} label="Mail">
          <AppIcon id="mail" title="Mail" size={48} />
        </DockItem>

        {/* Separator Line */}
        <div className="w-[1px] h-10 bg-white/20 mx-1 self-center rounded-full"></div>

        {/* --- 3. SYSTEM TOOLS --- */}

        {/* Spotlight / Launchpad */}
        <DockItem onClick={onSearch} label="Spotlight">
          <AppIcon id="launchpad" title="Spotlight" size={48} />
        </DockItem>
      </div>
    </div>
  );
}

// Sub-component for individual Dock Items (Animation Logic)
function DockItem({ children, onClick, isOpen, label }) {
  const controls = useAnimation();

  const handleClick = async () => {
    if (onClick) onClick();
    // Bounce Animation
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

      {/* Open Indicator Dot */}
      {isOpen && (
        <div className="absolute -bottom-2 w-1 h-1 bg-white/90 rounded-full shadow-sm" />
      )}

      {/* Tooltip */}
      <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#1e1e1e]/90 backdrop-blur-md text-white text-[12px] font-medium py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-xl">
        {label}
      </span>
    </motion.button>
  );
}
