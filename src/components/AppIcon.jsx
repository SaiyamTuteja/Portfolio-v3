// import { useState } from "react";
// import {
//   Folder,
//   Settings,
//   User,
//   Code2,
//   Briefcase,
//   Cpu,
//   MessageSquare,
//   FileText,
//   Image as ImageIcon,
// } from "lucide-react";

// // STABLE ICON ASSETS (Hosted on GitHub)
// const iconMap = {
//   // Core System
//   finder:
//     "https://raw.githubusercontent.com/puru29/macOS-React/master/src/assets/icons/finder.png",
//   settings:
//     "https://raw.githubusercontent.com/puru29/macOS-React/master/src/assets/icons/preferences.png",
//   // ... (other images remain same)
//   about:
//     "https://raw.githubusercontent.com/puru29/macOS-React/master/src/assets/icons/contacts.png",
//   projects:
//     "https://raw.githubusercontent.com/puru29/macOS-React/master/src/assets/icons/vscode.png",
//   experience:
//     "https://raw.githubusercontent.com/puru29/macOS-React/master/src/assets/icons/pages.png",
//   skills:
//     "https://raw.githubusercontent.com/puru29/macOS-React/master/src/assets/icons/terminal.png",
//   ai: "https://raw.githubusercontent.com/puru29/macOS-React/master/src/assets/icons/siri.png",
//   resume:
//     "https://raw.githubusercontent.com/puru29/macOS-React/master/src/assets/icons/notes.png",
//   folder:
//     "https://raw.githubusercontent.com/puru29/macOS-React/master/src/assets/icons/folder.png",
//   preview:
//     "https://raw.githubusercontent.com/puru29/macOS-React/master/src/assets/icons/preview.png",
//   launchpad:
//     "https://raw.githubusercontent.com/puru29/macOS-React/master/src/assets/icons/launchpad.png",
//   trash:
//     "https://raw.githubusercontent.com/puru29/macOS-React/master/src/assets/icons/trash.png",
// };

// // Helper to get a stable gradient color for the fallback
// const getFallbackGradient = (tid) => {
//   if (tid?.includes("about"))
//     return "linear-gradient(180deg, #9FA5D5 0%, #7d84a7 100%)";
//   if (tid?.includes("project"))
//     return "linear-gradient(180deg, #0077c9 0%, #005aa3 100%)"; // Dark Blue VS Code
//   if (tid?.includes("experience"))
//     return "linear-gradient(180deg, #ffc977 0%, #ff8c00 100%)"; // Orange/Brown Briefcase
//   if (tid?.includes("skills"))
//     return "linear-gradient(180deg, #333 0%, #000 100%)"; // Terminal Black
//   if (tid?.includes("ai"))
//     return "linear-gradient(180deg, #6c5ce7 0%, #a29bfe 100%)"; // Purple AI
//   if (tid?.includes("resume"))
//     return "linear-gradient(180deg, #fff 0%, #e0e0e0 100%)"; // White/Gray Document
//   if (tid?.includes("set"))
//     return "linear-gradient(180deg, #c4c4c4 0%, #888 100%)"; // Settings Grey
//   return "linear-gradient(180deg, #2ecc71 0%, #27ae60 100%)"; // Default Green
// };

// export default function AppIcon({ icon: Icon, id, title, size = 50 }) {
//   const [imageLoadError, setImageLoadError] = useState(false); // State to track loading failure

//   // 1. Determine Image URL
//   let imageUrl = iconMap[id];

//   // Fuzzy matching and Fallback logic
//   if (!imageUrl) {
//     if (id?.includes("project")) imageUrl = iconMap.projects;
//     if (id?.includes("about")) imageUrl = iconMap.about;
//     if (id?.includes("resume")) imageUrl = iconMap.resume;
//     if (id?.includes("skill") || id?.includes("stack"))
//       imageUrl = iconMap.skills;
//     if (id?.includes("experi")) imageUrl = iconMap.experience;
//     if (id?.includes("ai")) imageUrl = iconMap.ai;
//     if (id?.includes("set")) imageUrl = iconMap.settings;
//     if (title === "Spotlight" || title === "Launchpad")
//       imageUrl = iconMap.launchpad;
//     if (title === "Trash") imageUrl = iconMap.trash;
//   }

//   // --- A. IMAGE RENDERING PATH ---
//   if (imageUrl && !imageLoadError) {
//     return (
//       <div
//         className="relative transition-transform duration-200 active:scale-95"
//         style={{ width: size, height: size }}
//       >
//         <img
//           src={imageUrl}
//           alt={title}
//           // Set error state if image fails to load
//           onError={() => setImageLoadError(true)}
//           className="w-full h-full object-cover rounded-[22%] transition-transform duration-200"
//           style={{
//             filter:
//               "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 1px rgba(255, 255, 255, 0.1))",
//             transform: "scale(1.05)",
//             boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
//           }}
//         />
//       </div>
//     );
//   }

//   // --- B. CSS FALLBACK PATH (If image URL is broken or not defined) ---

//   // 1. Fallback for Folders (Use CSS Folder Path to avoid relying on image URL)
//   if (Icon === Folder || title?.toLowerCase().includes("folder")) {
//     // This ensures a blue folder is visible even if the image link fails.
//     return (
//       <div
//         className="relative drop-shadow-lg"
//         style={{ width: size, height: size }}
//       >
//         <svg
//           viewBox="0 0 100 100"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-full h-full"
//         >
//           <path
//             d="M5 25C5 19.4772 9.47715 15 15 15H35L45 25H90C92.7614 25 95 27.2386 95 30V80C95 85.5228 90.5228 90 85 90H10C4.47715 90 0 85.5228 0 80V30C0 27.2386 2.23858 25 5 25Z"
//             fill="#007AFF"
//           />
//           <path
//             d="M5 25C5 19.4772 9.47715 15 15 15H35L45 25H90C92.7614 25 95 27.2386 95 30V38H0V30C0 27.2386 2.23858 25 5 25Z"
//             fill="#4facfe"
//             fillOpacity="0.3"
//           />
//         </svg>
//       </div>
//     );
//   }

//   // 2. Final Generic App Fallback (using Lucide Icon + Solid Gradient)
//   const fallbackBg = getFallbackGradient(id);

//   return (
//     <div
//       className="relative rounded-[22%] overflow-hidden shadow-lg flex items-center justify-center border border-white/10"
//       style={{ width: size, height: size, background: fallbackBg }}
//     >
//       {/* Shine Reflection */}
//       <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

//       {/* Lucide Icon as Glyph */}
//       <Icon
//         className="text-white drop-shadow-md w-[55%] h-[55%]"
//         strokeWidth={2}
//       />
//     </div>
//   );
// }

import { useState } from "react";
import { Folder, FileText } from "lucide-react";

// --- IMPORT LOCAL IMAGES ---
// Ensure these files exist in your 'src/image/' folder
import aboutIcon from "../image/aboutme.png";
import projectsIcon from "../image/code.png";
import experienceIcon from "../image/folder.png"; // Suitcase icon
// import skillsIcon from "../image/stack.png"; // Tech Chip icon
import skillsIcon from "../image/stack1.png";
import aiIcon from "../image/generative.png";
import resumeIcon from "../image/pdf.png";
import finderIcon from "../image/finder.png";
import settingsIcon from "../image/setting.png"; // Gear icon
import terminalIcon from "../image/terminal.png"; // Terminal icon
import folderIcon from "../image/folder.png";
import podcastIcon from "../image/podcast.png";
import chatIcon from "../image/podcast.png";
import spotlightIcon from "../image/Spotlight-Search.png";
import safariIcon from "../image/safari.png"; // Ensure this file exists
import mailIcon from "../image/mail.png"; // Ensure this file exists

const iconMap = {
  // Apps
  about: aboutIcon,
  projects: projectsIcon,
  experience: experienceIcon,
  skills: skillsIcon,
  ai: aiIcon,
  resume: resumeIcon,

  // System
  finder: finderIcon,
  settings: settingsIcon,
  terminal: terminalIcon,
  folder: folderIcon,
  safari: safariIcon,
  mail: mailIcon,

  // Fallback mapping if needed
  chat: chatIcon,
  podcast: podcastIcon,
  spotlight: spotlightIcon,
  launchpad: spotlightIcon,
};

export default function AppIcon({ icon: Icon, id, title, size = 50 }) {
  const [imageLoadError, setImageLoadError] = useState(false);

  // 1. Determine Image URL
  let imageUrl = iconMap[id];

  // Fuzzy matching to find correct icon
  if (!imageUrl) {
    if (id?.includes("project")) imageUrl = iconMap.projects;
    if (id?.includes("about")) imageUrl = iconMap.about;
    if (id?.includes("resume")) imageUrl = iconMap.resume;
    if (id?.includes("skill") || id?.includes("stack"))
      imageUrl = iconMap.skills;
    if (id?.includes("experi")) imageUrl = iconMap.experience;
    if (id?.includes("ai")) imageUrl = iconMap.ai;
    if (id?.includes("set")) imageUrl = iconMap.settings;
    if (id?.includes("terminal")) imageUrl = iconMap.terminal;
    if (id?.includes("find")) imageUrl = iconMap.finder;
    if (id?.includes("safari")) imageUrl = iconMap.safari; // Fallback check
    if (id?.includes("mail")) imageUrl = iconMap.mail;

    if (id?.includes("search") || id?.includes("spotlight"))
      imageUrl = iconMap.spotlight;
  }

  // 2. Render Image Icon
  if (imageUrl && !imageLoadError) {
    return (
      <div
        className="relative transition-transform duration-200 hover:scale-110 active:scale-95"
        style={{ width: size, height: size }}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain drop-shadow-xl"
          onError={() => setImageLoadError(true)}
        />
      </div>
    );
  }

  // 3. Fallback for Folders
  if (Icon === Folder || title?.toLowerCase().includes("folder")) {
    return (
      <div
        className="relative hover:scale-105 transition-transform"
        style={{ width: size, height: size }}
      >
        <img
          src={iconMap.folder}
          alt="Folder"
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </div>
    );
  }

  // 4. Generic Fallback (Blue Box)
  return (
    <div
      className="relative flex items-center justify-center bg-blue-500 rounded-xl shadow-md"
      style={{ width: size, height: size }}
    >
      {Icon ? (
        <Icon className="text-white w-1/2 h-1/2" />
      ) : (
        <FileText className="text-white w-1/2 h-1/2" />
      )}
    </div>
  );
}
