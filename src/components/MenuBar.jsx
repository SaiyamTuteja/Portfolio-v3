import { useState, useEffect, useRef } from "react";
import {
  Apple,
  Wifi,
  Battery,
  BatteryCharging,
  Search,
  Command,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuBar({
  onSearchClick,
  activeWindowId,
  onCloseWindow,
  onRestart,
  onOpenAbout,
}) {
  const [time, setTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);

  // Dropdown State
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  // Time Update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Click Outside to Close Menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Battery API
  useEffect(() => {
    let battery;
    const updateBattery = () => {
      setBatteryLevel(Math.round(battery.level * 100));
      setIsCharging(battery.charging);
    };

    if (navigator.getBattery) {
      navigator.getBattery().then((bat) => {
        battery = bat;
        updateBattery();
        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingchange", updateBattery);
      });
    }

    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", updateBattery);
        battery.removeEventListener("chargingchange", updateBattery);
      }
    };
  }, []);

  const formatTime = (date) => {
    return date
      .toLocaleTimeString("en-US", {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(/,/g, "");
  };

  const menuItems = {
    file: [
      {
        label: "New File...",
        shortcut: "N",
        action: () => {
          onNewFile();
          setActiveMenu(null);
        },
      }, // Added
      { type: "separator" },
      {
        label: "Close Window",
        shortcut: "⌘W",
        disabled: !activeWindowId,
        action: () => {
          onCloseWindow();
          setActiveMenu(null);
        },
      },
    ],
    apple: [
      {
        label: "About This Portfolio",
        action: () => {
          onOpenAbout();
          setActiveMenu(null);
        },
      },
      { label: "System Preferences...", action: () => setActiveMenu(null) },
      { type: "separator" },
      {
        label: "Restart...",
        action: () => {
          onRestart();
          setActiveMenu(null);
        },
      },
      {
        label: "Shut Down...",
        action: () => {
          window.close();
        },
      }, // Won't work in browser usually, but good for UI
    ],
    file: [
      { label: "New Window", shortcut: "⌘N", disabled: true },
      { type: "separator" },
      {
        label: "Close Window",
        shortcut: "⌘W",
        disabled: !activeWindowId, // Disable if no window focused
        action: () => {
          onCloseWindow();
          setActiveMenu(null);
        },
      },
    ],
    view: [
      {
        label: "Enter Full Screen",
        shortcut: "⌃⌘F",
        action: () => {
          if (!document.fullscreenElement)
            document.documentElement.requestFullscreen();
          else document.exitFullscreen();
          setActiveMenu(null);
        },
      },
    ],
    help: [
      {
        label: "Search",
        shortcut: "⌘Space",
        action: () => {
          onSearchClick();
          setActiveMenu(null);
        },
      },
      { type: "separator" },
      {
        label: "View Source Code",
        action: () => window.open("https://github.com/SaiyamTuteja", "_blank"),
      },
      {
        label: "Contact Developer",
        action: () => window.open("mailto:saiyamtuteja@gmail.com"),
      },
    ],
  };

  return (
    <div className="fixed top-0 left-0 w-full h-8 bg-black/40 backdrop-blur-md z-[5000] flex items-center justify-between px-4 text-white text-sm shadow-sm border-b border-white/5 select-none">
      {/* Left Menu Items */}
      <div className="flex items-center gap-1" ref={menuRef}>
        {/* Apple Menu */}
        <div className="relative">
          <button
            onClick={() =>
              setActiveMenu(activeMenu === "apple" ? null : "apple")
            }
            className={`px-3 h-8 flex items-center rounded hover:bg-white/10 ${
              activeMenu === "apple" ? "bg-white/10" : ""
            }`}
          >
            <Apple className="w-4 h-4 fill-white" />
          </button>
          <Dropdown isOpen={activeMenu === "apple"} items={menuItems.apple} />
        </div>

        {/* File */}
        <div className="relative">
          <button
            onClick={() => setActiveMenu(activeMenu === "file" ? null : "file")}
            className={`px-3 h-8 rounded hover:bg-white/10 font-medium ${
              activeMenu === "file" ? "bg-white/10" : ""
            }`}
          >
            File
          </button>
          <Dropdown isOpen={activeMenu === "file"} items={menuItems.file} />
        </div>

        {/* View */}
        <div className="relative">
          <button
            onClick={() => setActiveMenu(activeMenu === "view" ? null : "view")}
            className={`px-3 h-8 rounded hover:bg-white/10 font-medium hidden md:block ${
              activeMenu === "view" ? "bg-white/10" : ""
            }`}
          >
            View
          </button>
          <Dropdown isOpen={activeMenu === "view"} items={menuItems.view} />
        </div>

        {/* Help */}
        <div className="relative">
          <button
            onClick={() => setActiveMenu(activeMenu === "help" ? null : "help")}
            className={`px-3 h-8 rounded hover:bg-white/10 font-medium hidden md:block ${
              activeMenu === "help" ? "bg-white/10" : ""
            }`}
          >
            Help
          </button>
          <Dropdown isOpen={activeMenu === "help"} items={menuItems.help} />
        </div>
      </div>

      {/* Right Menu Items (Status) */}
      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-2"
          title={`${batteryLevel}% ${isCharging ? "Charging" : ""}`}
        >
          <span className="text-xs text-gray-300 hidden sm:block">
            {batteryLevel}%
          </span>
          {isCharging ? (
            <BatteryCharging className="w-5 h-5 text-green-400" />
          ) : (
            <Battery className="w-5 h-5" />
          )}
        </div>

        <Wifi className="w-4 h-4" />

        <button
          onClick={onSearchClick}
          className="hover:bg-white/10 p-1 rounded"
        >
          <Search className="w-4 h-4" />
        </button>

        <span className="cursor-default">{formatTime(time)}</span>
      </div>
    </div>
  );
}

// Dropdown Sub-component
function Dropdown({ isOpen, items }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          className="absolute top-8 left-0 w-56 bg-gray-900/90 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl py-1 overflow-hidden"
        >
          {items.map((item, idx) =>
            item.type === "separator" ? (
              <div key={idx} className="h-[1px] bg-white/10 my-1 mx-2"></div>
            ) : (
              <button
                key={idx}
                disabled={item.disabled}
                onClick={item.action}
                className={`w-full text-left px-4 py-1.5 text-sm flex justify-between items-center group
                  ${
                    item.disabled
                      ? "text-gray-500 cursor-default"
                      : "text-white hover:bg-blue-600"
                  }`}
              >
                <span>{item.label}</span>
                {item.shortcut && (
                  <span className="text-xs opacity-50 font-light tracking-wider">
                    {item.shortcut}
                  </span>
                )}
              </button>
            )
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
