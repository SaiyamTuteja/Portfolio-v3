import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  User,
  Code2,
  Briefcase,
  Cpu,
  MessageSquare,
  FileText,
  Folder,
  Settings,
  Terminal as TerminalIcon,
  Image as ImageIcon,
  Trash2,
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
import FileNameModal from "./components/FileNameModal";

// Apps
import Safari from "./apps/Safari";
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
import TrashBin from "./apps/TrashBin";

import safariIcon from "./image/safari.png";

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isWallpaperSelectorOpen, setIsWallpaperSelectorOpen] = useState(false);
  const [isFileNameModalOpen, setIsFileNameModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // UI States
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isActionCenterOpen, setIsActionCenterOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isShutDown, setIsShutDown] = useState(false);

  const [maxZIndex, setMaxZIndex] = useState(20);
  const [activeWindowId, setActiveWindowId] = useState(null);

  const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0 });
  const [fileContextMenu, setFileContextMenu] = useState({
    isOpen: false,
    x: 0,
    y: 0,
    fileId: null,
  });

  const [themeColor, setThemeColor] = useState("rgba(243, 243, 243, 0.9)");
  const [accentColor, setAccentColor] = useState("#0078D4");
  const [isDarkText, setIsDarkText] = useState(false);

  const [wallpaper, setWallpaper] = useState(
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2560&auto=format&fit=crop"
  );

  const [systemState, setSystemState] = useState({
    wifi: true,
    bluetooth: true,
    brightness: 100,
    volume: 75,
  });

  const [trashItems, setTrashItems] = useState([]);

  // Initial Windows/Icons
  const [windows, setWindows] = useState([
    {
      id: "finder",
      title: "Finder",
      icon: Folder,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
    },
    {
      id: "safari",
      title: "Safari",
      icon: safariIcon,
      content: <Safari />,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
    },
    {
      id: "settings",
      title: "Settings",
      icon: Settings,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
    },
    {
      id: "terminal",
      title: "Terminal",
      icon: TerminalIcon,
      content: <Terminal />,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
    },
    {
      id: "about",
      title: "About Me",
      icon: User,
      content: <About />,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
    },
    {
      id: "projects",
      title: "Projects",
      icon: Code2,
      content: <Projects />,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
    },
    {
      id: "experience",
      title: "Experience",
      icon: Briefcase,
      content: <Experience />,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
    },
    {
      id: "skills",
      title: "Tech Stack",
      icon: Cpu,
      content: <Skills />,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
    },
    {
      id: "ai",
      title: "AI Assistant",
      icon: MessageSquare,
      content: <AIAssistant />,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
    },
    {
      id: "resume",
      title: "Resume.pdf",
      icon: FileText,
      content: <ResumeDoc />,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
    },
    {
      id: "trash",
      title: "Trash",
      icon: Trash2,
      isOpen: false,
      isMinimized: false,
      zIndex: 20,
    },
  ]);

  const handleBootComplete = () => {
    setIsBooting(false);
    setIsLocked(true);
  };
  const handleLock = () => {
    setIsStartOpen(false);
    setIsLocked(true);
  };
  const handleShutDown = () => {
    setIsStartOpen(false);
    setIsShutDown(true);
  };
  const handleRestart = () => {
    setIsStartOpen(false);
    setIsShutDown(true);
    setTimeout(() => {
      setIsShutDown(false);
      setIsBooting(true);
    }, 2000);
  };

  const handleThemeChange = (color, accent, isDark) => {
    setThemeColor(color);
    setAccentColor(accent);
    setIsDarkText(isDark);
  };

  const openWindow = (id) => {
    setWindows((prev) =>
      prev.map((win) => {
        if (win.id === id) {
          return {
            ...win,
            isOpen: true,
            isMinimized: false,
            zIndex: maxZIndex + 1,
          };
        }
        return win;
      })
    );
    setMaxZIndex((prev) => prev + 1);
    setActiveWindowId(id);
    setIsStartOpen(false);
    setIsCalendarOpen(false);
    setIsActionCenterOpen(false);
  };

  const closeWindow = (id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
    if (activeWindowId === id) setActiveWindowId(null);
  };
  const minimizeWindow = (id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    if (activeWindowId === id) setActiveWindowId(null);
  };
  const focusWindow = (id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w))
    );
    setMaxZIndex((prev) => prev + 1);
    setActiveWindowId(id);
  };

  // --- FILE & DRAG OPERATIONS ---

  const handleNewFileClick = () => setIsFileNameModalOpen(true);

  const handleCreateFile = (fileName) => {
    const newId = `file-${Date.now()}`;
    setWindows((prev) => [
      ...prev,
      {
        id: newId,
        title: fileName,
        icon: FileText,
        fileContent: "",
        isOpen: true,
        isMinimized: false,
        zIndex: maxZIndex + 1,
      },
    ]);
    setMaxZIndex((prev) => prev + 1);
    setActiveWindowId(newId);
  };

  const handleUpdateFile = (id, newContent) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, fileContent: newContent } : w))
    );
  };

  const handleMoveToTrash = (id) => {
    const file = windows.find((w) => w.id === id);
    if (file) {
      const fileToTrash = { ...file, isOpen: false };
      setTrashItems((prev) => [...prev, fileToTrash]);
      setWindows((prev) => prev.filter((w) => w.id !== id));
    }
    setFileContextMenu({ ...fileContextMenu, isOpen: false });
  };

  // --- DRAG TO DELETE LOGIC ---
  const handleIconDrop = (id, point) => {
    // Only allow user-created files to be dragged to trash
    if (!id.startsWith("file-")) return;

    // Get Trash Icon bounds
    const trashElement = document.getElementById("trash-dock-icon");
    if (trashElement) {
      const rect = trashElement.getBoundingClientRect();
      // Check if dropped point is within Trash bounds
      if (
        point.x >= rect.left &&
        point.x <= rect.right &&
        point.y >= rect.top &&
        point.y <= rect.bottom
      ) {
        handleMoveToTrash(id);
      }
    }
  };

  const handleRestoreFromTrash = (id) => {
    const file = trashItems.find((t) => t.id === id);
    if (file) {
      setWindows((prev) => [...prev, file]);
      setTrashItems((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleEmptyTrash = () => setTrashItems([]);

  const handleDesktopContextMenu = (e) => {
    e.preventDefault();
    if (e.target.closest(".desktop-icon") || e.target.closest("button")) return;
    setContextMenu({ isOpen: true, x: e.clientX, y: e.clientY });
    setFileContextMenu({ ...fileContextMenu, isOpen: false });
  };

  const handleIconContextMenu = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (id.startsWith("file-")) {
      setFileContextMenu({
        isOpen: true,
        x: e.clientX,
        y: e.clientY,
        fileId: id,
      });
      setContextMenu({ ...contextMenu, isOpen: false });
    }
  };

  const handleDesktopClick = () => {
    if (contextMenu.isOpen) setContextMenu({ ...contextMenu, isOpen: false });
    if (fileContextMenu.isOpen)
      setFileContextMenu({ ...fileContextMenu, isOpen: false });
    if (isSearchOpen) setIsSearchOpen(false);
    if (isStartOpen) setIsStartOpen(false);
    if (isActionCenterOpen) setIsActionCenterOpen(false);
    if (isCalendarOpen) setIsCalendarOpen(false);
  };

  const handleOpenFile = (file) => {
    if (file.type === "app") {
      openWindow(file.id);
      return;
    }
  };

  if (isShutDown)
    return (
      <div className="h-screen w-screen bg-black cursor-none flex items-center justify-center text-white/50 text-sm">
        System is down. Refresh to manual start.
      </div>
    );

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-black text-white relative font-sans cursor-none"
      onContextMenu={handleDesktopContextMenu}
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

      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out z-0"
        style={{
          backgroundImage: `url('${wallpaper}')`,
          filter: `brightness(${systemState.brightness}%)`,
        }}
      />

      {!isBooting && !isLocked && (
        <>
          <FileNameModal
            isOpen={isFileNameModalOpen}
            onClose={() => setIsFileNameModalOpen(false)}
            onConfirm={handleCreateFile}
          />

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

          <div className="relative z-50">
            <MenuBar
              onSearchClick={() => setIsSearchOpen(true)}
              activeWindowId={activeWindowId}
              onCloseWindow={() =>
                activeWindowId && closeWindow(activeWindowId)
              }
              onRestart={() => setIsBooting(true)}
              onOpenAbout={() => openWindow("about")}
              onNewFile={handleNewFileClick}
              onOpenSettings={() => openWindow("settings")}
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
              onOpenApp={(id) => openWindow(id)}
            />

            <DesktopContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              isOpen={contextMenu.isOpen}
              onClose={() => setContextMenu({ ...contextMenu, isOpen: false })}
              onNewFile={handleNewFileClick}
              onRefresh={() => window.location.reload()}
              onOpenWallpaper={() => setIsWallpaperSelectorOpen(true)}
              onOpenAbout={() => openWindow("about")}
            />

            <AnimatePresence>
              {fileContextMenu.isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="fixed z-[9999] w-48 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl py-1 overflow-hidden"
                  style={{ top: fileContextMenu.y, left: fileContextMenu.x }}
                >
                  <button
                    onClick={() => openWindow(fileContextMenu.fileId)}
                    className="w-full text-left px-4 py-2 text-[13px] text-white hover:bg-blue-600 transition-colors"
                  >
                    Open
                  </button>
                  <div className="h-[1px] bg-white/10 my-1 mx-2"></div>
                  <button
                    onClick={() => handleMoveToTrash(fileContextMenu.fileId)}
                    className="w-full text-left px-4 py-2 text-[13px] text-red-400 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={14} /> Move to Trash
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DESKTOP ICONS - UPDATED for Free Movement & Drag */}
          {/* Changed grid layout to relative/absolute handling for drag */}
          <div className="absolute top-10 left-0 right-0 bottom-24 p-6 z-0 pointer-events-none">
            <div className="relative w-full h-full">
              {/* 1. Grid Apps (Standard) - Using Grid Layout */}
              <div className="absolute top-0 left-0 grid grid-flow-col grid-rows-[repeat(auto-fill,100px)] gap-4 h-full pointer-events-auto">
                {windows.map((win, index) => {
                  if (
                    [
                      "settings",
                      "finder",
                      "terminal",
                      "trash",
                      "safari",
                    ].includes(win.id) ||
                    win.id.startsWith("file-")
                  )
                    return null;
                  return (
                    <div key={win.id}>
                      <DesktopIcon
                        id={win.id}
                        icon={win.icon}
                        label={win.title}
                        delay={index}
                        onOpen={() => openWindow(win.id)}
                      />
                    </div>
                  );
                })}
              </div>

              {/* 2. User Files (Draggable) - Absolute Positioned initially in grid area but movable */}
              {windows
                .filter((w) => w.id.startsWith("file-"))
                .map((win, index) => {
                  // Calculate initial grid position for files if not moved
                  // For simplicity, we just stack them or put them in a secondary flow
                  return (
                    <div
                      key={win.id}
                      onContextMenu={(e) => handleIconContextMenu(e, win.id)}
                      className="pointer-events-auto absolute"
                      style={{ top: 0, left: 100 + index * 90 }} // Simple initial offset to avoid overlap
                    >
                      <DesktopIcon
                        id={win.id}
                        icon={FileText}
                        label={win.title}
                        onOpen={() => openWindow(win.id)}
                        isFile={true}
                        onDrop={handleIconDrop} // Enables Drag-to-Trash
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Windows Manager */}
          <div style={{ filter: `brightness(${systemState.brightness}%)` }}>
            {windows.map((win, index) => {
              let content = win.content;

              if (win.id === "terminal") {
                content = (
                  <Terminal
                    onOpenApp={(id) =>
                      id === "mail"
                        ? (window.location.href =
                            "mailto:saiyamtuteja@gmail.com")
                        : openWindow(id)
                    }
                  />
                );
              } else if (win.id === "settings") {
                content = (
                  <SystemPreferences
                    currentWallpaper={wallpaper}
                    onWallpaperChange={setWallpaper}
                    onLock={() => setIsLocked(true)}
                  />
                );
              } else if (win.id === "finder") {
                content = (
                  <Finder
                    onOpenFile={handleOpenFile}
                    desktopItems={windows.filter(
                      (w) =>
                        !["finder", "settings", "safari", "trash"].includes(
                          w.id
                        )
                    )}
                  />
                );
              } else if (win.id === "trash") {
                content = (
                  <TrashBin
                    items={trashItems}
                    onRestore={handleRestoreFromTrash}
                    onEmpty={handleEmptyTrash}
                  />
                );
              } else if (win.id.startsWith("file-")) {
                content = (
                  <Notepad
                    title={win.title}
                    initialContent={win.fileContent}
                    onSave={(val) => handleUpdateFile(win.id, val)}
                  />
                );
              }

              return (
                <Window
                  key={win.id}
                  {...win}
                  zIndex={win.zIndex}
                  content={content}
                  onClose={closeWindow}
                  onMinimize={minimizeWindow}
                  onFocus={focusWindow}
                  dockIndex={index}
                  totalDockItems={windows.length}
                  themeColor={themeColor}
                />
              );
            })}
          </div>

          <div className="relative z-50">
            <Taskbar
              apps={windows.filter(
                (w) =>
                  !["settings", "trash"].includes(w.id) &&
                  !w.id.startsWith("file-")
              )}
              onOpen={openWindow}
              onSearch={() => setIsSearchOpen(true)}
              onOpenWallpaper={() => setIsWallpaperSelectorOpen(true)}
            />
          </div>
        </>
      )}
    </div>
  );
}
