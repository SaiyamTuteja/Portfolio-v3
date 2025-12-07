import { useState, useMemo } from "react";
import {
  Folder,
  Clock,
  HardDrive,
  Cloud,
  Download,
  FileText,
  Image as ImageIcon,
  ArrowLeft,
  ArrowRight,
  Github,
} from "lucide-react";

// --- DATA CONFIGURATION ---

const githubProjects = [
  {
    id: "proj_eval",
    name: "Faculty_Evaluation_System",
    type: "folder",
    icon: Folder,
    color: "text-blue-400",
    tags: ["work"],
  },
  {
    id: "proj_diwali",
    name: "Diwali_Sales_Analysis",
    type: "folder",
    icon: Folder,
    color: "text-blue-400",
    tags: ["work"],
  },
  {
    id: "proj_unigo",
    name: "UniGo_Ride_Sharing",
    type: "folder",
    icon: Folder,
    color: "text-blue-400",
    tags: ["work", "important"],
  },
  {
    id: "proj_todo",
    name: "To_Do_List_JS",
    type: "folder",
    icon: Folder,
    color: "text-blue-400",
    tags: ["personal"],
  },
  {
    id: "proj_captcha",
    name: "Contact_Form_Captcha",
    type: "folder",
    icon: Folder,
    color: "text-blue-400",
    tags: ["personal"],
  },
  {
    id: "proj_virat",
    name: "Virat_Kohli_Dashboard",
    type: "folder",
    icon: Folder,
    color: "text-blue-400",
    tags: ["work"],
  },
  {
    id: "proj_cars",
    name: "Car_Sales_Forecast",
    type: "folder",
    icon: Folder,
    color: "text-blue-400",
    tags: ["work"],
  },
];

const fileSystem = {
  // --- ROOT FOLDERS (Sidebar Roots) ---
  root: [],
  recents: [
    {
      id: "resume_pdf",
      name: "Saiyam_Tuteja_CV.pdf",
      type: "pdf",
      icon: FileText,
      color: "text-red-500",
      tags: ["important", "work"],
    },
    {
      id: "cover_letter",
      name: "Cover_Letter.docx",
      type: "doc",
      icon: FileText,
      color: "text-blue-500",
      tags: ["work"],
    },
    {
      id: "profile_pic",
      name: "saiyam_profile.png",
      type: "image",
      icon: ImageIcon,
      color: "text-purple-500",
      src: "https://github.com/SaiyamTuteja.png",
      tags: ["personal"],
    },
  ],
  desktop: [
    /* Populated via props from App.jsx */
  ],
  documents: [
    {
      id: "resume_folder",
      name: "Resume Versions",
      type: "folder",
      icon: Folder,
      color: "text-blue-400",
      tags: ["work"],
    },
    {
      id: "certs_folder",
      name: "Certificates",
      type: "folder",
      icon: Folder,
      color: "text-blue-400",
      tags: ["important"],
    },
    {
      id: "notes",
      name: "Project_Ideas.txt",
      type: "doc",
      icon: FileText,
      color: "text-gray-500",
      tags: ["personal"],
    },
  ],
  downloads: [
    {
      id: "installer",
      name: "VSCode_Setup.dmg",
      type: "unknown",
      icon: HardDrive,
      color: "text-gray-400",
      tags: [],
    },
    {
      id: "meme",
      name: "debugging_meme.jpg",
      type: "image",
      icon: ImageIcon,
      color: "text-green-500",
      src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=200&auto=format&fit=crop",
      tags: ["personal"],
    },
    {
      id: "dataset",
      name: "sales_data.csv",
      type: "sheet",
      icon: FileText,
      color: "text-green-600",
      tags: ["work"],
    },
  ],
  projects_root: githubProjects,

  // --- SUB FOLDERS (Content) ---
  resume_folder: [
    {
      id: "resume_pdf_v1",
      name: "Resume_v1.pdf",
      type: "pdf",
      icon: FileText,
      color: "text-red-500",
      tags: ["work"],
    },
    {
      id: "resume_pdf_final",
      name: "Resume_Final.pdf",
      type: "pdf",
      icon: FileText,
      color: "text-red-500",
      tags: ["important", "work"],
    },
  ],
  certs_folder: [
    {
      id: "cert_google",
      name: "Google_Data_Analytics.jpg",
      type: "image",
      icon: ImageIcon,
      color: "text-orange-500",
      tags: ["important", "work"],
    },
    {
      id: "cert_hr",
      name: "HackerRank_SQL.png",
      type: "image",
      icon: ImageIcon,
      color: "text-green-500",
      tags: ["work"],
    },
  ],

  // --- GITHUB PROJECTS CONTENT ---
  proj_eval: [
    {
      id: "link_eval",
      name: "View Repository",
      type: "link",
      icon: Github,
      url: "https://github.com/SaiyamTuteja/ProfPraisal",
      color: "text-black",
    },
    {
      id: "code_eval",
      name: "index.php",
      type: "code",
      icon: FileText,
      color: "text-purple-500",
    },
  ],
  proj_diwali: [
    {
      id: "link_diwali",
      name: "View Repository",
      type: "link",
      icon: Github,
      url: "https://github.com/SaiyamTuteja/Diwali_Sales_Analysis",
      color: "text-black",
    },
    {
      id: "nb_diwali",
      name: "Analysis.ipynb",
      type: "code",
      icon: FileText,
      color: "text-orange-500",
    },
  ],
  proj_unigo: [
    {
      id: "link_unigo",
      name: "View Repository",
      type: "link",
      icon: Github,
      url: "https://github.com/SaiyamTuteja",
      color: "text-black",
    },
    {
      id: "app_unigo",
      name: "server.js",
      type: "code",
      icon: FileText,
      color: "text-yellow-500",
    },
  ],
  proj_todo: [
    {
      id: "link_todo",
      name: "View Repository",
      type: "link",
      icon: Github,
      url: "https://github.com/SaiyamTuteja/To-Do-List",
      color: "text-black",
    },
  ],
  proj_captcha: [
    {
      id: "link_cap",
      name: "View Repository",
      type: "link",
      icon: Github,
      url: "https://github.com/SaiyamTuteja/Contact-Form-with-Captcha",
      color: "text-black",
    },
  ],
  proj_virat: [
    {
      id: "link_virat",
      name: "View Repository",
      type: "link",
      icon: Github,
      url: "https://github.com/SaiyamTuteja",
      color: "text-black",
    },
  ],
  proj_cars: [
    {
      id: "link_cars",
      name: "View Repository",
      type: "link",
      icon: Github,
      url: "https://github.com/SaiyamTuteja",
      color: "text-black",
    },
  ],
};

export default function Finder({ onOpenFile, desktopItems = [] }) {
  const [activeTab, setActiveTab] = useState("desktop");
  const [currentPath, setCurrentPath] = useState(["desktop"]);
  const [viewMode, setViewMode] = useState("folder");

  // Dynamically merge Desktop items (About, Projects etc) into the File System
  const dynamicFileSystem = useMemo(() => {
    const mappedApps = desktopItems.map((item) => ({
      id: item.id,
      name: item.title,
      type: item.id === "resume" ? "pdf" : item.id.includes("file") ? "doc" : "app",
      icon: item.icon,
      color: "text-blue-500",
      tags: ["personal"],
    }));

    return {
      ...fileSystem,
      desktop: mappedApps,
    };
  }, [desktopItems]);

  // Logic to determine which files to display
  let displayFiles = [];
  if (viewMode === "tag") {
    const allFiles = Object.values(dynamicFileSystem).flat();
    displayFiles = allFiles.filter((f) => f.tags && f.tags.includes(activeTab));
    displayFiles = [
      ...new Map(displayFiles.map((item) => [item.id, item])).values(),
    ];
  } else {
    const currentFolderId = currentPath[currentPath.length - 1];
    displayFiles = dynamicFileSystem[currentFolderId] || [];
  }

  const handleNavigate = (item) => {
    if (item.type === "folder") {
      setViewMode("folder");
      setCurrentPath([...currentPath, item.id]);
    } else if (item.type === "link") {
      window.open(item.url, "_blank");
    } else {
      if (onOpenFile) {
        onOpenFile(item);
      }
    }
  };

  const handleSidebarClick = (tabId, mode = "folder") => {
    setActiveTab(tabId);
    setViewMode(mode);
    if (mode === "folder") setCurrentPath([tabId]);
  };

  const handleBack = () => {
    if (viewMode === "folder" && currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  const sidebarGroups = {
    favorites: [
      { id: "recents", label: "Recents", icon: Clock },
      { id: "desktop", label: "Desktop", icon: Cloud },
      { id: "documents", label: "Documents", icon: FileText },
      { id: "downloads", label: "Downloads", icon: Download },
      { id: "projects_root", label: "GitHub Projects", icon: Github },
    ],
    tags: [
      { id: "important", label: "Important", color: "bg-red-500" },
      { id: "work", label: "Work", color: "bg-orange-500" },
      { id: "personal", label: "Personal", color: "bg-green-500" },
    ],
  };

  return (
    <div className="flex h-full w-full bg-white text-gray-900 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <div className="w-48 bg-[#f5f5f7]/95 backdrop-blur-xl border-r border-gray-200 flex flex-col pt-3 pb-3 shrink-0">
        <div className="px-4 mb-1 text-[11px] font-semibold text-gray-500/80">Favorites</div>
        <div className="flex-1 overflow-y-auto space-y-0.5 px-2 mb-4">
          {sidebarGroups.favorites.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSidebarClick(item.id, "folder")}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-[6px] text-[13px] transition-colors ${
                activeTab === item.id ? "bg-gray-300/50 font-medium text-black" : "text-gray-600 hover:bg-gray-200/50"
              }`}
            >
              <item.icon size={16} className={activeTab === item.id ? "text-blue-600" : "text-gray-500"} />
              {item.label}
            </button>
          ))}
        </div>
        <div className="px-4 mt-2 mb-1 text-[11px] font-semibold text-gray-500/80">Tags</div>
        <div className="px-2 space-y-0.5">
          {sidebarGroups.tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleSidebarClick(tag.id, "tag")}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-[6px] text-[13px] transition-colors ${
                activeTab === tag.id ? "bg-gray-300/50 font-medium text-black" : "text-gray-600 hover:bg-gray-200/50"
              }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${tag.color}`}></div>
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col bg-white min-w-0">
        <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-[#ffffff] shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex gap-1 text-gray-500">
              <button
                onClick={handleBack}
                disabled={viewMode === "tag" || currentPath.length <= 1}
                className={`p-1 rounded hover:bg-gray-100 ${
                  viewMode === "tag" || currentPath.length <= 1 ? "opacity-30 cursor-default" : "cursor-pointer"
                }`}
              >
                <ArrowLeft size={18} />
              </button>
              <button className="p-1 rounded hover:bg-gray-100 opacity-30 cursor-default">
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="flex items-center text-sm font-semibold text-gray-700 select-none">
              {viewMode === "tag"
                ? `Tag: ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`
                : currentPath.length > 1
                ? dynamicFileSystem[currentPath[currentPath.length - 1]]?.name || "Folder"
                : sidebarGroups.favorites.find((i) => i.id === activeTab)?.label || "Home"}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {displayFiles.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
              {displayFiles.map((file) => (
                <button
                  key={file.id}
                  onDoubleClick={() => handleNavigate(file)}
                  className="flex flex-col items-center gap-1.5 group p-3 rounded-md hover:bg-[#e4eefb] focus:bg-[#ccdcf5] focus:outline-none transition-colors border border-transparent hover:border-[#d0e0f5]"
                >
                  {/* --- FIX: CHECK IF ICON IS STRING (IMAGE PATH) OR COMPONENT --- */}
                  {file.type === "image" && file.src ? (
                    <img
                      src={file.src}
                      alt={file.name}
                      className="w-12 h-12 rounded object-cover shadow-sm pointer-events-none"
                    />
                  ) : typeof file.icon === "string" ? (
                    <img
                      src={file.icon}
                      alt={file.name}
                      className="w-12 h-12 object-contain drop-shadow-sm pointer-events-none"
                    />
                  ) : (
                    <file.icon
                      strokeWidth={1}
                      size={48}
                      className={`${file.color || "text-blue-500"} fill-current/10 drop-shadow-sm`}
                    />
                  )}
                  {/* ----------------------------------------------------------- */}
                  
                  <span className="text-[12px] text-center text-gray-700 font-medium w-full truncate px-1 rounded leading-tight">
                    {file.name}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-300 select-none">
              <Folder size={64} strokeWidth={1} className="mb-2 opacity-50" />
              <p>Folder is empty</p>
            </div>
          )}
        </div>

        <div className="h-6 border-t border-gray-200 bg-[#f5f5f7] text-[11px] text-gray-500 flex items-center px-4 shrink-0 select-none">
          {displayFiles.length} item{displayFiles.length !== 1 && "s"}
        </div>
      </div>
    </div>
  );
}