import { motion } from "framer-motion";

// High-quality, reliable Unsplash wallpapers
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

export default function WallpaperSelector({
  currentWallpaper,
  onWallpaperChange,
  onClose,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="w-[600px] max-w-[90vw] bg-[#1e1e1e]/90 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/10 overflow-hidden z-[9999] select-none"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-2">
          <button
            className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e33e32] hover:brightness-110"
            onClick={onClose}
          />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#dba521]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1da62b]" />
        </div>
        <span className="text-sm font-medium text-white/90 absolute left-1/2 -translate-x-1/2 pointer-events-none">
          Desktop & Screen Saver
        </span>
      </div>

      {/* Content */}
      <div className="p-5 max-h-[60vh] overflow-y-auto custom-scrollbar">
        <h2 className="text-lg font-semibold text-white mb-4">
          Dynamic Wallpapers
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {wallpapers.map((wp) => {
            const isSelected = currentWallpaper === wp.url;
            return (
              <button
                key={wp.id}
                onClick={() => onWallpaperChange(wp.url)}
                className="group flex flex-col gap-2 text-center"
              >
                <div
                  className={`
                    aspect-video rounded-lg overflow-hidden border-2 transition-all relative w-full
                    ${
                      isSelected
                        ? "border-blue-500 ring-2 ring-blue-500/30"
                        : "border-transparent hover:border-white/30"
                    }
                  `}
                >
                  <img
                    src={wp.url}
                    alt={wp.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay for selection */}
                  <div
                    className={`absolute inset-0 transition-colors ${
                      isSelected
                        ? "bg-blue-500/10"
                        : "bg-transparent group-hover:bg-black/10"
                    }`}
                  />
                </div>
                <span
                  className={`text-[11px] font-medium truncate w-full ${
                    isSelected
                      ? "text-blue-400"
                      : "text-white/80 group-hover:text-white"
                  }`}
                >
                  {wp.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
