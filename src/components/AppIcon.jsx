import { useState } from "react";
import { Folder, FileText } from "lucide-react";

// --- IMPORT LOCAL IMAGES ---
import aboutIcon from "../image/aboutme.png";
import projectsIcon from "../image/code.png";
import experienceIcon from "../image/folder.png";
import skillsIcon from "../image/folder.png";
import aiIcon from "../image/ai.png";
import resumeIcon from "../image/pdf.png";
import finderIcon from "../image/finder.png";
import settingsIcon from "../image/setting.png";
import terminalIcon from "../image/terminal.png";
import folderIcon from "../image/folder.png";
import podcastIcon from "../image/podcast.png";
import chatIcon from "../image/podcast.png";
import spotlightIcon from "../image/Spotlight-Search.png";
import safariIcon from "../image/safari.png";
import mailIcon from "../image/mail.png";
import trashIcon from "../image/Trash.png"; // Imported Trash Image

const iconMap = {
  about: aboutIcon,
  projects: projectsIcon,
  experience: experienceIcon,
  skills: skillsIcon,
  ai: aiIcon,
  resume: resumeIcon,
  finder: finderIcon,
  settings: settingsIcon,
  terminal: terminalIcon,
  folder: folderIcon,
  chat: chatIcon,
  podcast: podcastIcon,
  spotlight: spotlightIcon,
  launchpad: spotlightIcon,
  safari: safariIcon,
  mail: mailIcon,
  trash: trashIcon, // Added to map
};

export default function AppIcon({ icon: Icon, id, title, size = 50 }) {
  const [imageLoadError, setImageLoadError] = useState(false);

  let imageUrl = iconMap[id];

  // Logic to find image based on ID or Title if not in map
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
    if (id?.includes("safari")) imageUrl = iconMap.safari;
    if (id?.includes("mail")) imageUrl = iconMap.mail;

    // Trash Check
    if (id?.includes("trash") || title?.toLowerCase() === "trash") {
      imageUrl = iconMap.trash;
    }

    if (id?.includes("search") || id?.includes("spotlight"))
      imageUrl = iconMap.spotlight;
  }

  // 1. Render Image (Preferred)
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

  // 2. Render Folder Logic
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

  // 3. Fallback: Render Icon Component (Safely)
  const ValidIcon =
    typeof Icon === "function" || typeof Icon === "object" ? Icon : FileText;

  return (
    <div
      className="relative flex items-center justify-center bg-blue-500 rounded-xl shadow-md"
      style={{ width: size, height: size }}
    >
      <ValidIcon className="text-white w-1/2 h-1/2" />
    </div>
  );
}
