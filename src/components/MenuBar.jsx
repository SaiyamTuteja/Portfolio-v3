import { useState, useEffect, useRef } from "react";
import {
  Apple,
  Wifi,
  Battery,
  BatteryCharging,
  Search,
  WifiOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ControlCenter from "./ControlCenter";

// Custom Icons (Definitions remain outside the component for efficiency)
const AppleIcon = () => (
  <svg
    width="15"
    height="18"
    viewBox="0 0 17 20"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.56381 20C10.7073 20 11.0601 18.2323 12.8757 18.2323C14.6391 18.2323 14.5029 20 16.5912 20C18.2255 20 19.3499 17.1691 20 15.6983C17.9122 14.5222 17.5852 11.2335 20 9.87503C19.3499 7.72242 17.4491 5.37871 15.1568 5.37871C13.2496 5.37871 12.4402 6.55517 10.7482 6.55517C9.00445 6.55517 8.04616 5.37871 6.30237 5.37871C3.93192 5.37871 0.771573 8.3658 0.771573 13.9063C0.771573 18.2323 4.2041 20 6.30237 20C8.01893 20 8.04616 18.2323 8.56381 18.2323V20ZM10.5302 4.90812C12.3585 4.90812 13.2842 2.37871 12.8757 0C11.0772 0.176471 9.03169 1.76471 9.03169 4.2353C9.03169 6.20589 10.5302 4.90812 10.5302 4.90812Z"
      transform="translate(-1.5 0) scale(0.85)"
    />
  </svg>
);

const ControlCenterIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="5"
      width="20"
      height="5"
      rx="2.5"
      stroke="white"
      strokeWidth="1.5"
    />
    <circle cx="8" cy="7.5" r="1.5" fill="white" />
    <rect
      x="2"
      y="14"
      width="20"
      height="5"
      rx="2.5"
      stroke="white"
      strokeWidth="1.5"
    />
    <circle cx="16" cy="16.5" r="1.5" fill="white" />
  </svg>
);

export default function MenuBar({
  onSearchClick,
  activeWindowId,
  onCloseWindow,
  onRestart,
  onOpenAbout,
  onNewFile,
  onOpenSettings,
  onLock,
  systemState,
  setSystemState,
  onOpenWallpaper,
}) {
  const [time, setTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);

  const [activeMenu, setActiveMenu] = useState(null);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);

  const menuRef = useRef(null);
  const ccRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target))
        setActiveMenu(null);
      if (
        ccRef.current &&
        !ccRef.current.contains(event.target) &&
        !event.target.closest(".cc-toggle")
      )
        setIsControlCenterOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (navigator.getBattery) {
      navigator.getBattery().then((bat) => {
        setBatteryLevel(Math.round(bat.level * 100));
        setIsCharging(bat.charging);

        const updateCharge = () => setIsCharging(bat.charging);
        const updateLevel = () => setBatteryLevel(Math.round(bat.level * 100));

        bat.addEventListener("chargingchange", updateCharge);
        bat.addEventListener("levelchange", updateLevel);
      });
    }
  }, []);

  const formatTime = (date) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const dateStr = date.toLocaleDateString("en-US", options).replace(/,/g, "");
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateStr}   ${timeStr}`;
  };

  const menuItems = {
    apple: [
      {
        label: "About This Portfolio",
        action: () => {
          onOpenAbout();
          setActiveMenu(null);
        },
      },
      {
        label: "System Preferences...",
        action: () => {
          onOpenSettings();
          setActiveMenu(null);
        },
      },
      { type: "separator" },
      {
        label: "Lock Screen",
        shortcut: "^⌘Q",
        action: () => {
          onLock();
          setActiveMenu(null);
        },
      },
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
      },
    ],
    file: [
      {
        label: "New File...",
        shortcut: "N",
        action: () => {
          onNewFile();
          setActiveMenu(null);
        },
      },
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
    view: [
      {
        label: "Enter Full Screen",
        shortcut: "^⌘F",
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
    <div className="fixed top-0 left-0 w-full h-[32px] bg-[#1e1e1e]/40 backdrop-blur-xl z-[5000] flex items-center justify-between px-4 text-white text-[13px] shadow-sm select-none border-b border-white/5">
      <div className="flex items-center gap-1" ref={menuRef}>
        <div className="relative">
          <button
            onClick={() =>
              setActiveMenu(activeMenu === "apple" ? null : "apple")
            }
            className={`h-[28px] px-3 rounded flex items-center justify-center transition-colors ${
              activeMenu === "apple" ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
            <AppleIcon />
          </button>
          <Dropdown isOpen={activeMenu === "apple"} items={menuItems.apple} />
        </div>
        {["File", "View", "Help"].map((menu) => (
          <div className="relative" key={menu}>
            <button
              onClick={() =>
                setActiveMenu(
                  activeMenu === menu.toLowerCase() ? null : menu.toLowerCase()
                )
              }
              className={`h-[28px] px-3 rounded font-medium transition-colors ${
                activeMenu === menu.toLowerCase()
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
            >
              {menu}
            </button>
            <Dropdown
              isOpen={activeMenu === menu.toLowerCase()}
              items={menuItems[menu.toLowerCase()]}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 font-medium relative" ref={ccRef}>
        <div
          className="flex items-center gap-2"
          title={`${batteryLevel}% ${isCharging ? "Charging" : ""}`}
        >
          <span className="text-xs text-white/90 hidden sm:block">
            {batteryLevel}%
          </span>
          {isCharging ? (
            <BatteryCharging className="w-[20px] h-[16px] text-green-400" />
          ) : (
            <Battery className="w-[20px] h-[16px] text-white/80" />
          )}
        </div>

        {systemState?.wifi ? (
          <Wifi className="w-[18px] h-[18px] text-white/90" strokeWidth={2} />
        ) : (
          <WifiOff className="w-[18px] h-[18px] opacity-50" />
        )}

        <button
          onClick={onSearchClick}
          className="hover:bg-white/10 p-1 rounded transition-colors"
        >
          <Search
            className="w-[16px] h-[16px] text-white/90"
            strokeWidth={2.5}
          />
        </button>

        <button
          onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
          className={`cc-toggle hover:bg-white/10 p-1 rounded transition-colors ${
            isControlCenterOpen ? "bg-white/20" : ""
          }`}
        >
          <ControlCenterIcon />
        </button>

        <span className="text-[13px] font-medium tracking-wide">
          {formatTime(time)}
        </span>

        <AnimatePresence>
          {isControlCenterOpen && (
            <div className="absolute top-10 right-0 origin-top-right">
              <ControlCenter
                state={
                  systemState || {
                    wifi: true,
                    bluetooth: true,
                    brightness: 100,
                    volume: 75,
                  }
                }
                updateState={setSystemState || (() => {})}
                onOpenWallpaper={onOpenWallpaper}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Dropdown({ isOpen, items }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.1 }}
          className="absolute top-8 left-0 w-60 bg-gray-900/95 backdrop-blur-2xl border border-white/20 rounded-lg shadow-2xl py-1.5 overflow-hidden z-[5001]"
        >
          {items.map((item, idx) =>
            item.type === "separator" ? (
              <div key={idx} className="h-[1px] bg-white/15 my-1 mx-3"></div>
            ) : (
              <button
                key={idx}
                disabled={item.disabled}
                onClick={item.action}
                className={`w-full text-left px-4 py-1 text-[13px] flex justify-between items-center group transition-colors ${
                  item.disabled
                    ? "text-gray-500 cursor-default"
                    : "text-white hover:bg-blue-600"
                }`}
              >
                <span>{item.label}</span>
                {item.shortcut && (
                  <span className="text-[11px] opacity-50 font-light tracking-wide">
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
