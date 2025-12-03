import { useState } from "react";
import { User, Monitor } from "lucide-react";
import { resumeData } from "../data/resumeData";

const wallpapers = [
  // 1. Ventura (Abstract Orange/Blue)

  {
    id: 1,
    name: "Expanse",
    url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2560&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Monterey",
    url: "https://512pixels.net/downloads/macos-wallpapers-6k/12-Light.jpg",
  },

  // 3. Big Sur (Abstract Curves)
  {
    id: 3,
    name: "Big Sur",
    url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2560&auto=format&fit=crop",
  },

  // 4. Dark Nebula (Default)
  {
    id: 4,
    name: "Dark Nebula",
    url: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2560&auto=format&fit=crop",
  },

  // 5. Solar Grad (Replaces broken Solar)
  {
    id: 5,
    name: "Solar Grad",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560&auto=format&fit=crop",
  },

  // 6. Yosemite (Mountains)
  {
    id: 6,
    name: "Yosemite",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2560&auto=format&fit=crop",
  },

  // 7. Sierra (Snowy Peaks)
  {
    id: 7,
    name: "Sierra",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2560&auto=format&fit=crop",
  },

  // 8. Mojave (Desert Day)
  {
    id: 8,
    name: "Mojave",
    url: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=2560&auto=format&fit=crop",
  },

  // 9. Northern Lights (Aurora)
  {
    id: 9,
    name: "Aurora",
    url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2560&auto=format&fit=crop",
  },

  // 10. Midnight (Dark Blue Abstract)
  {
    id: 10,
    name: "Midnight",
    url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2560&auto=format&fit=crop",
  },

  // 11. Minimal (Clean Gradient)
  {
    id: 11,
    name: "Minimal",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2560&auto=format&fit=crop",
  },

  // 12. The Lake (Nature)
  {
    id: 12,
    name: "The Lake",
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2560&auto=format&fit=crop",
  },

  // 15. Fluid (Abstract Paint)
  {
    id: 14,
    name: "Fluid",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2560&auto=format&fit=crop",
  },

  {
    id: 18,
    name: "Canyon Glow",
    url: "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?q=80&w=2560&auto=format&fit=crop",
  },

  // 19. Geometric Flow (Abstract Shapes/Sci-fi)
  {
    id: 19,
    name: "Geometric Flow",
    url: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2560&auto=format&fit=crop",
  },
];

export default function SystemPreferences({
  currentWallpaper,
  onWallpaperChange,
}) {
  const [activeTab, setActiveTab] = useState("general");

  const sidebarItems = [
    { id: "general", icon: User, label: "General", color: "bg-blue-500" },
    { id: "desktop", icon: Monitor, label: "Desktop", color: "bg-purple-500" },
  ];

  return (
    <div className="flex h-full bg-[#f5f5f7] text-gray-900 font-sans">
      {/* Sidebar */}
      <div className="w-48 border-r border-gray-200 bg-gray-100/50 backdrop-blur-xl flex flex-col py-4 px-2 shrink-0">
        {/* User Badge */}
        <div className="flex flex-col items-center mb-6 pb-4 border-b border-gray-200/50">
          <div className="w-16 h-16 rounded-full overflow-hidden mb-2 shadow-sm border border-gray-200">
            <img
              src="https://github.com/SaiyamTuteja.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-sm">{resumeData.profile.name}</h3>
            <p className="text-xs text-gray-500">Apple ID</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-sm transition-colors ${
                activeTab === item.id ? "bg-black/10" : "hover:bg-black/5"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-md ${item.color} flex items-center justify-center text-white shadow-sm`}
              >
                <item.icon size={14} />
              </div>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {activeTab === "general" && (
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold mb-6">General</h2>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium">Name</span>
                <span className="text-sm text-gray-500">
                  {resumeData.profile.name}
                </span>
              </div>
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium">Role</span>
                <span className="text-sm text-gray-500">
                  {resumeData.profile.role}
                </span>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="text-sm font-medium">Location</span>
                <span className="text-sm text-gray-500">
                  {resumeData.profile.location}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">About Me</h4>
                  <p className="text-xs text-gray-500 leading-snug mt-1 line-clamp-2">
                    {resumeData.profile.summary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "desktop" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Desktop & Wallpaper</h2>
            <div className="grid grid-cols-3 gap-4">
              {wallpapers.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => onWallpaperChange(wp.url)}
                  className={`group relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                    currentWallpaper === wp.url
                      ? "border-blue-500 shadow-md ring-2 ring-blue-500/20"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={wp.url}
                    alt={wp.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-medium text-white/90 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    {wp.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
