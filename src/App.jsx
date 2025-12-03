import { useState, useEffect } from "react";
import {
  User,
  Code2,
  Briefcase,
  Cpu,
  MessageSquare,
  FileText,
  File,
} from "lucide-react";

// Components
import BootScreen from "./components/BootScreen";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import Taskbar from "./components/Taskbar";
import MacOSCursor from "./components/MacOSCursor";
import MenuBar from "./components/MenuBar";
import SpotlightSearch from "./components/SpotlightSearch";
import DesktopContextMenu from "./components/DesktopContextMenu";

// Apps
import About from "./apps/About";
import Projects from "./apps/Projects";
import Experience from "./apps/Experience";
import Skills from "./apps/Skills";
import AIAssistant from "./apps/AIAssistant";
import ResumeDoc from "./apps/ResumeDoc"; // New Resume App
import Notepad from "./apps/Notepad"; // New Notepad App

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeWindowId, setActiveWindowId] = useState(null);

  // Context Menu State
  const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0 });

  const [windows, setWindows] = useState([
    // Standard Apps
    {
      id: "about",
      title: "About Me",
      icon: User,
      content: <About />,
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      originRect: null,
    },
    {
      id: "projects",
      title: "Projects",
      icon: Code2,
      content: <Projects />,
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      originRect: null,
    },
    {
      id: "experience",
      title: "Experience",
      icon: Briefcase,
      content: <Experience />,
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      originRect: null,
    },
    {
      id: "skills",
      title: "Tech Stack",
      icon: Cpu,
      content: <Skills />,
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      originRect: null,
    },
    {
      id: "ai",
      title: "AI Assistant",
      icon: MessageSquare,
      content: <AIAssistant />,
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      originRect: null,
    },
    // "Files" on Desktop
    {
      id: "resume",
      title: "Resume.pdf",
      icon: FileText,
      content: <ResumeDoc />,
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      originRect: null,
    },
  ]);

  // Keyboard Shortcuts
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

  // Right Click Handler for Desktop
  const handleContextMenu = (e) => {
    // Only trigger if clicking on the background (not a window/icon)
    if (e.target === e.currentTarget) {
      e.preventDefault();
      setContextMenu({
        isOpen: true,
        x: e.clientX,
        y: e.clientY,
      });
    } else {
      // If clicking elsewhere, close menu
      setContextMenu({ ...contextMenu, isOpen: false });
    }
  };

  // Close context menu on click anywhere
  const handleDesktopClick = () => {
    if (contextMenu.isOpen) setContextMenu({ ...contextMenu, isOpen: false });
  };

  // Create New File Logic
  const handleNewFile = () => {
    const fileName = prompt("Enter file name:", "New File.txt");
    if (fileName) {
      const newId = `file-${Date.now()}`;
      const newFile = {
        id: newId,
        title: fileName,
        icon: File, // Generic file icon
        content: <Notepad title={fileName} />,
        isOpen: false,
        isMinimized: false,
        zIndex: maxZIndex + 1,
        originRect: null,
      };

      // Add to windows list
      setWindows((prev) => [...prev, newFile]);
    }
  };

  const openWindow = (id, originRect) => {
    setWindows((prev) =>
      prev.map((win) => {
        if (win.id === id) {
          if (win.isMinimized)
            return { ...win, isMinimized: false, zIndex: maxZIndex + 1 };
          if (win.isOpen) return { ...win, zIndex: maxZIndex + 1 };
          return {
            ...win,
            isOpen: true,
            isMinimized: false,
            zIndex: maxZIndex + 1,
            originRect: originRect,
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

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-black text-white relative font-sans"
      onContextMenu={handleContextMenu}
      onClick={handleDesktopClick}
    >
      {isBooting && <BootScreen onComplete={() => setIsBooting(false)} />}

      <MacOSCursor />

      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out hover:scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop')",
        }}
      />

      {!isBooting && (
        <>
          <MenuBar
            onSearchClick={() => setIsSearchOpen(true)}
            activeWindowId={activeWindowId}
            onCloseWindow={() => activeWindowId && closeWindow(activeWindowId)}
            onRestart={() => setIsBooting(true)}
            onOpenAbout={() => openWindow("about", null)}
            onNewFile={handleNewFile} // Pass handler
          />

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
          />

          {/* Desktop Layer */}
          <div className="absolute top-10 left-0 p-6 pt-12 md:p-8 grid grid-flow-col auto-cols-min grid-rows-[repeat(auto-fill,110px)] gap-6 h-[calc(100vh-140px)] w-full pointer-events-none z-10">
            <div className="pointer-events-auto flex flex-col gap-6 flex-wrap">
              {windows.map((win, index) => (
                <DesktopIcon
                  key={win.id}
                  icon={win.icon}
                  label={win.title}
                  delay={index}
                  onOpen={(origin) => openWindow(win.id, origin)}
                />
              ))}
            </div>
          </div>

          {/* Windows Layer */}
          {windows.map((win, index) => (
            <Window
              key={win.id}
              {...win}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onFocus={focusWindow}
              dockIndex={index}
              totalDockItems={windows.length + 1}
            />
          ))}

          {/* Dock */}
          <Taskbar
            apps={windows}
            onOpen={(id) => openWindow(id, null)}
            onSearch={() => setIsSearchOpen(true)}
          />
        </>
      )}
    </div>
  );
}
