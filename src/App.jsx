import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  User,
  Code2,
  Briefcase,
  Cpu,
  MessageSquare,
  FileText,
  File,
  Folder,
  Image as ImageIcon,
  Settings,
  Terminal as TerminalIcon,
} from "lucide-react";

// Components
import BootScreen from "./components/BootScreen";
import LockScreen from "./components/LockScreen";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import Taskbar from "./components/Taskbar";
import MacOSCursor from "./components/MacOSCursor";
import MenuBar from "./components/MenuBar";
import SpotlightSearch from "./components/SpotlightSearch";
import DesktopContextMenu from "./components/DesktopContextMenu";
import ImageViewer from "./components/ImageViewer";
import WallpaperSelector from "./components/WallpaperSelector";
import Safari from "./apps/Safari"; // IMPORT THIS
import safariIcon from "./image/safari.png"; // IMPORT THIS
// Apps
import About from "./apps/About";
import Projects from "./apps/Projects";
import Experience from "./apps/Experience";
import Skills from "./apps/Skills";
import AIAssistant from "./apps/AIAssistant";
import ResumeDoc from "./apps/ResumeDoc";
import Notepad from "./apps/Notepad";
import Finder from "./apps/Finder";
import SystemPreferences from "./apps/SystemPreferences";
import Terminal from "./apps/Terminal";

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isWallpaperSelectorOpen, setIsWallpaperSelectorOpen] = useState(false);
  const [maxZIndex, setMaxZIndex] = useState(20); // Windows start at 20
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0 });
  const [wallpaper, setWallpaper] = useState(
    "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2874&auto=format&fit=crop"
  );

  const [systemState, setSystemState] = useState({
    wifi: true,
    bluetooth: true,
    brightness: 100,
    volume: 75,
  });

  const [windows, setWindows] = useState([
    {
      id: "finder",
      title: "Finder",
      icon: Folder,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
      originRect: null,
    },
    {
      id: "settings",
      title: "System Settings",
      icon: Settings,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
      originRect: null,
    },
    {
      id: "terminal",
      title: "Terminal",
      icon: TerminalIcon,
      content: <Terminal />,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
      originRect: null,
    },
    {
      id: "about",
      title: "About Me",
      icon: User,
      content: <About />,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
      originRect: null,
    },
    {
      id: "projects",
      title: "Projects",
      icon: Code2,
      content: <Projects />,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
      originRect: null,
    },
    {
      id: "experience",
      title: "Experience",
      icon: Briefcase,
      content: <Experience />,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
      originRect: null,
    },
    {
      id: "skills",
      title: "Tech Stack",
      icon: Cpu,
      content: <Skills />,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
      originRect: null,
    },
    {
      id: "ai",
      title: "AI Assistant",
      icon: MessageSquare,
      content: <AIAssistant />,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
      originRect: null,
    },
    {
      id: "safari",
      title: "Safari",
      icon: safariIcon,
      content: <Safari />,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
      originRect: null,
    },
    {
      id: "resume",
      title: "Resume.pdf",
      icon: FileText,
      content: <ResumeDoc />,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
      originRect: null,
    },
  ]);

  const handleBootComplete = () => {
    setIsBooting(false);
    setIsLocked(true);
  };

  const openWindow = (id, originRect) => {
    setWindows((prev) =>
      prev.map((win) => {
        if (win.id === id) {
          return {
            ...win,
            isOpen: true,
            isMinimized: false,
            zIndex: maxZIndex + 1,
            originRect: originRect || win.originRect,
          };
        }
        return win;
      })
    );
    setMaxZIndex((prev) => prev + 1);
    setActiveWindowId(id);
  };

  const closeWindow = (id) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, isOpen: false } : win))
    );
    if (activeWindowId === id) setActiveWindowId(null);
  };
  const minimizeWindow = (id) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, isMinimized: true } : win))
    );
    if (activeWindowId === id) setActiveWindowId(null);
  };
  const focusWindow = (id) => {
    setWindows((prev) =>
      prev.map((win) =>
        win.id === id ? { ...win, zIndex: maxZIndex + 1 } : win
      )
    );
    setMaxZIndex((prev) => prev + 1);
    setActiveWindowId(id);
  };

  const handleOpenFile = (file) => {
    if (file.type === "app") {
      openWindow(file.id, null);
      return;
    }
    if (file.type === "pdf" || file.id.includes("resume")) {
      openWindow("resume", null);
      return;
    }
    if (file.type === "image") {
      const imageId = `img-${file.id}`;
      if (!windows.find((w) => w.id === imageId))
        setWindows((prev) => [
          ...prev,
          {
            id: imageId,
            title: file.name,
            icon: ImageIcon,
            content: <ImageViewer src={file.src} name={file.name} />,
            isOpen: true,
            isMinimized: false,
            zIndex: maxZIndex + 1,
            originRect: null,
          },
        ]);
      openWindow(imageId, null);
      return;
    }
    const noteId = `note-${file.id}`;
    if (!windows.find((w) => w.id === noteId)) {
      setWindows((prev) => [
        ...prev,
        {
          id: noteId,
          title: file.name,
          icon: FileText,
          content: <Notepad title={file.name} />,
          isOpen: true,
          isMinimized: false,
          zIndex: maxZIndex + 1,
          originRect: null,
        },
      ]);
    }
    openWindow(noteId, null);
  };

  const handleNewFile = () => {
    const fileName = prompt("Enter file name:", "New File.txt");
    if (fileName)
      setWindows((prev) => [
        ...prev,
        {
          id: `file-${Date.now()}`,
          title: fileName,
          icon: File,
          content: <Notepad title={fileName} />,
          isOpen: false,
          isMinimized: false,
          zIndex: maxZIndex + 1,
          originRect: null,
        },
      ]);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    const clickedIcon =
      e.target.closest(".desktop-icon") || e.target.closest("button");
    if (!clickedIcon) {
      setContextMenu({ isOpen: true, x: e.clientX, y: e.clientY });
    }
  };
  const handleDesktopClick = () => {
    if (contextMenu.isOpen) setContextMenu({ ...contextMenu, isOpen: false });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.code === "Space") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        !document.fullscreenElement
          ? document.documentElement.requestFullscreen()
          : document.exitFullscreen();
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setContextMenu({ ...contextMenu, isOpen: false });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [contextMenu]);

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-black text-white relative font-sans cursor-none"
      onContextMenu={handleContextMenu}
      onClick={handleDesktopClick}
    >
      {isBooting && <BootScreen onComplete={handleBootComplete} />}
      <AnimatePresence>
        {!isBooting && isLocked && (
          <LockScreen
            onUnlock={() => setIsLocked(false)}
            wallpaper={wallpaper}
          />
        )}
      </AnimatePresence>
      <MacOSCursor />

      {/* Background (Z-0) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out hover:scale-105 z-0"
        style={{
          backgroundImage: `url('${wallpaper}')`,
          filter: `brightness(${systemState.brightness}%)`,
        }}
      />

      {!isBooting && !isLocked && (
        <>
          <div className="relative z-50">
            <MenuBar
              onSearchClick={() => setIsSearchOpen(true)}
              activeWindowId={activeWindowId}
              onCloseWindow={() =>
                activeWindowId && closeWindow(activeWindowId)
              }
              onRestart={() => setIsBooting(true)}
              onOpenAbout={() => openWindow("about", null)}
              onNewFile={handleNewFile}
              onOpenSettings={() => openWindow("settings", null)}
              onLock={() => setIsLocked(true)}
              onOpenWallpaper={() => setIsWallpaperSelectorOpen(true)}
              systemState={systemState}
              setSystemState={setSystemState}
            />
          </div>

          <div className="relative z-50">
            <SpotlightSearch
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              onOpenApp={(id) => openWindow(id, null)}
            />
            <DesktopContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              isOpen={contextMenu.isOpen}
              onClose={() => setContextMenu({ ...contextMenu, isOpen: false })}
              onNewFile={handleNewFile}
              onRefresh={() => window.location.reload()}
              onOpenWallpaper={() => setIsWallpaperSelectorOpen(true)}
              onOpenAbout={() => openWindow("about", null)}
            />
          </div>

          {/* Desktop Icons - FIXED: Z-INDEX 0 (Bottom Layer) */}
          <div
            className="absolute top-10 left-0 p-6 pt-12 md:p-8 grid grid-flow-col auto-rows-[110px] gap-4 h-[calc(100vh-140px)] w-full pointer-events-none z-0"
            style={{ filter: `brightness(${systemState.brightness}%)` }}
          >
            <div className="pointer-events-auto flex flex-col gap-6 flex-wrap content-start h-full desktop-icon-grid">
              {windows.map((win, index) => {
                if (
                  ["settings", "finder", "terminal"].includes(win.id) ||
                  win.id.startsWith("img-") ||
                  win.id.startsWith("note-")
                )
                  return null;
                return (
                  <div key={win.id} className="pointer-events-auto">
                    <DesktopIcon
                      id={win.id}
                      icon={win.icon}
                      label={win.title}
                      delay={index}
                      onOpen={(origin) => openWindow(win.id, origin)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Windows (Z-20+) - Dynamic Z-Index */}
          <div style={{ filter: `brightness(${systemState.brightness}%)` }}>
            {windows.map((win, index) => {
              let content = win.content;
              if (win.id === "settings") {
                content = (
                  <SystemPreferences
                    currentWallpaper={wallpaper}
                    onWallpaperChange={setWallpaper}
                    onLock={() => setIsLocked(true)}
                  />
                );
              } else if (win.id === "finder") {
                const desktopApps = windows.filter(
                  (w) =>
                    !["finder", "settings"].includes(w.id) &&
                    !w.id.startsWith("img-") &&
                    !w.id.startsWith("note-")
                );
                content = (
                  <Finder
                    onOpenFile={handleOpenFile}
                    desktopItems={desktopApps}
                  />
                );
              }
              // Base Z-Index for windows is 20 (above icons at 0)
              const baseZ = 20;
              const dynamicZ = win.zIndex < baseZ ? baseZ + index : win.zIndex;

              return (
                <Window
                  key={win.id}
                  {...win}
                  zIndex={dynamicZ} // Pass safe Z-Index
                  content={content}
                  onClose={closeWindow}
                  onMinimize={minimizeWindow}
                  onFocus={focusWindow}
                  dockIndex={index}
                  totalDockItems={windows.length + 1}
                />
              );
            })}
          </div>

          <div className="relative z-50">
            <Taskbar
              apps={windows.filter(
                (w) => !w.id.startsWith("img-") && !w.id.startsWith("note-")
              )}
              onOpen={(id) => openWindow(id, null)}
              onSearch={() => setIsSearchOpen(true)}
            />
          </div>

          <AnimatePresence>
            {isWallpaperSelectorOpen && (
              <div
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm"
                onClick={() => setIsWallpaperSelectorOpen(false)}
              >
                <WallpaperSelector
                  currentWallpaper={wallpaper}
                  onWallpaperChange={setWallpaper}
                  onClose={() => setIsWallpaperSelectorOpen(false)}
                />
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
