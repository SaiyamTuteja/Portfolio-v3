import { useState } from "react";
import {
  Wifi,
  Bluetooth,
  Share2,
  Moon,
  Sun,
  Volume2,
  Music,
  FastForward,
  Rewind,
  Play,
  Pause,
  Keyboard,
  Image as ImageIcon,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ControlCenter({ state, updateState, onOpenWallpaper }) {
  // Destructure system state with safe defaults
  const {
    wifi = true,
    bluetooth = true,
    brightness = 100,
    volume = 75,
  } = state || {};

  // Local state for non-system toggles
  const [airdrop, setAirdrop] = useState(true);
  const [dnd, setDnd] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handlers
  const toggleWifi = () =>
    updateState((prev) => ({ ...prev, wifi: !prev.wifi }));
  const toggleBluetooth = () =>
    updateState((prev) => ({ ...prev, bluetooth: !prev.bluetooth }));
  const changeBrightness = (val) =>
    updateState((prev) => ({ ...prev, brightness: parseInt(val) }));
  const changeVolume = (val) =>
    updateState((prev) => ({ ...prev, volume: parseInt(val) }));

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-80 bg-[#1e1e1e]/80 backdrop-blur-3xl rounded-2xl shadow-2xl p-3 text-white border border-white/10 grid grid-cols-4 gap-3 select-none cursor-default z-[9999]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* --- Connectivity Module (Top Left) --- */}
      <div className="col-span-2 row-span-2 bg-[#2b2b2b]/50 rounded-2xl p-3 flex flex-col justify-between border border-white/5 shadow-sm">
        <ControlToggle
          icon={Wifi}
          label="Wi-Fi"
          subLabel={wifi ? "Home" : "Off"}
          isOn={wifi}
          onClick={toggleWifi}
          color="bg-blue-500"
        />
        <div className="h-[1px] bg-white/10 my-1 ml-9" />
        <ControlToggle
          icon={Bluetooth}
          label="Bluetooth"
          subLabel={bluetooth ? "On" : "Off"}
          isOn={bluetooth}
          onClick={toggleBluetooth}
          color="bg-blue-500"
        />
        <div className="h-[1px] bg-white/10 my-1 ml-9" />
        <ControlToggle
          icon={Share2}
          label="AirDrop"
          subLabel={airdrop ? "Contacts Only" : "Off"}
          isOn={airdrop}
          onClick={() => setAirdrop(!airdrop)}
          color="bg-blue-500"
        />
      </div>

      {/* --- Do Not Disturb (Top Right) --- */}
      <div
        className="col-span-2 bg-[#2b2b2b]/50 rounded-2xl p-3 flex items-center gap-3 h-[68px] border border-white/5 shadow-sm hover:bg-white/10 transition-colors cursor-pointer"
        onClick={() => setDnd(!dnd)}
      >
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-md ${
            dnd ? "bg-indigo-500 text-white" : "bg-[#3a3a3a] text-white"
          }`}
        >
          <Moon fill="currentColor" size={18} />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-[13px] leading-tight">
            Do Not Disturb
          </span>
          <span className="text-[11px] text-gray-400">
            {dnd ? "On" : "Off"}
          </span>
        </div>
      </div>

      {/* --- Keyboard Brightness --- */}
      <div className="bg-[#2b2b2b]/50 rounded-2xl flex flex-col items-center justify-center h-[68px] gap-1 border border-white/5 shadow-sm hover:bg-white/10 transition-colors cursor-pointer">
        <Keyboard size={22} className="text-white" />
        <span className="text-[10px] text-white font-medium">Keyboard</span>
      </div>

      {/* --- Wallpaper Switcher (Replaces Mirroring) --- */}
      <div
        className="bg-[#2b2b2b]/50 rounded-2xl flex flex-col items-center justify-center h-[68px] gap-1 border border-white/5 shadow-sm hover:bg-white/10 transition-colors cursor-pointer"
        onClick={() => {
          if (onOpenWallpaper) onOpenWallpaper();
        }}
      >
        <ImageIcon size={20} className="text-white" />
        <span className="text-[10px] text-white font-medium">Wallpaper</span>
      </div>

      {/* --- Sliders (Display & Sound) --- */}
      <div className="col-span-4 bg-[#2b2b2b]/50 rounded-2xl p-3 space-y-3 border border-white/5 shadow-sm">
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold ml-1 text-gray-300">
            Display
          </span>
          <ControlSlider
            icon={Sun}
            value={brightness}
            onChange={changeBrightness}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold ml-1 text-gray-300">
            Sound
          </span>
          <ControlSlider
            icon={Volume2}
            value={volume}
            onChange={changeVolume}
          />
        </div>
      </div>

      {/* --- Music Player --- */}
      <div className="col-span-4 bg-[#2b2b2b]/50 rounded-2xl p-3 flex items-center gap-3 border border-white/5 shadow-sm hover:bg-white/10 transition-colors cursor-pointer">
        <div className="w-11 h-11 bg-gradient-to-br from-[#ff2d55] to-[#ff5c86] rounded-lg flex items-center justify-center shadow-lg shrink-0">
          <Music size={22} className="text-white" />
        </div>

        <div className="flex-1 overflow-hidden min-w-0">
          <h4 className="font-semibold truncate text-[13px]">Music</h4>
          <p className="text-[11px] text-gray-400 truncate">
            {isPlaying ? "Blinding Lights - The Weeknd" : "Not Playing"}
          </p>
        </div>

        <div className="flex items-center gap-1 text-gray-200">
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
            <Rewind size={20} fill="currentColor" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            {isPlaying ? (
              <Pause size={24} fill="currentColor" />
            ) : (
              <Play size={24} fill="currentColor" />
            )}
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
            <FastForward size={20} fill="currentColor" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// --- Sub-components ---

function ControlToggle({ icon: Icon, label, subLabel, isOn, onClick, color }) {
  return (
    <div
      className="flex items-center gap-3 group cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-md ${
          isOn ? `${color} text-white` : "bg-blue-500/20 text-blue-400"
        }`}
      >
        <Icon size={16} strokeWidth={2.5} />
      </div>
      <div className="flex flex-col">
        <span className="text-[13px] font-semibold leading-tight">{label}</span>
        {subLabel && (
          <span className="text-[10px] text-gray-400 leading-tight truncate w-20">
            {subLabel}
          </span>
        )}
      </div>
    </div>
  );
}

function ControlSlider({ icon: Icon, value, onChange }) {
  return (
    <div className="flex items-center gap-3 bg-[#000000]/40 rounded-full p-1 border border-white/5 h-8 relative group">
      <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-gray-300 shadow-sm z-20 pointer-events-none shrink-0 ml-0.5">
        <Icon size={12} />
      </div>

      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-100 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>

      <input
        type="range"
        min="10"
        max="100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing z-30"
      />
    </div>
  );
}
