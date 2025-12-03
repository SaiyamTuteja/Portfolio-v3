import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import { resumeData } from "../data/resumeData";

export default function LockScreen({ onUnlock, wallpaper }) {
  const [time, setTime] = useState(new Date());
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // --- HELPER: Trigger Full Screen safely ---
  const triggerFullScreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch((err) => {
          console.log("Full screen blocked by browser until interaction:", err);
        });
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard Listener
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Attempt Full Screen on ANY key press
      triggerFullScreen();

      if (!isPasswordVisible) {
        setIsPasswordVisible(true);
      } else if (e.key === "Escape") {
        setIsPasswordVisible(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPasswordVisible]);

  // Click Handler wrapper
  const handleInteraction = () => {
    triggerFullScreen();
    setIsPasswordVisible(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    triggerFullScreen(); // Ensure full screen on submit
    onUnlock();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center text-white bg-cover bg-center select-none"
      style={{ backgroundImage: `url('${wallpaper}')` }}
      onClick={triggerFullScreen} // Catch-all click listener
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      {/* --- CLOCK SECTION (Absolute Top) --- */}
      {!isPasswordVisible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="absolute top-24 left-0 right-0 flex flex-col items-center z-10 cursor-pointer"
          onClick={handleInteraction}
        >
          <h1 className="text-8xl font-thin tracking-tighter drop-shadow-2xl">
            {time.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: false,
            })}
          </h1>
          <p className="text-2xl font-medium mt-2 drop-shadow-md text-white/90">
            {time.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>
      )}

      {/* --- CENTER SECTION (Login Form) --- */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-md">
        {isPasswordVisible && (
          <motion.form
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-6"
            onSubmit={handleLogin}
          >
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-purple-600 shadow-2xl">
              <img
                src="https://github.com/SaiyamTuteja.png"
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-black/50"
              />
            </div>

            <h2 className="text-2xl font-semibold text-white drop-shadow-md">
              {resumeData.profile.name}
            </h2>

            <div className="flex gap-2">
              <input
                type="password"
                placeholder="Enter Password"
                className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-md px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-48 text-center"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-md transition-colors border border-white/10"
              >
                <ArrowRight size={20} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsPasswordVisible(false)}
              className="text-sm text-white/70 hover:text-white mt-4"
            >
              Cancel
            </button>
          </motion.form>
        )}
      </div>

      {/* --- BOTTOM SECTION (Hint) --- */}
      {!isPasswordVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 flex flex-col items-center animate-pulse cursor-pointer z-10"
          onClick={handleInteraction}
        >
          <p className="text-sm font-medium tracking-widest uppercase opacity-80 mb-2">
            Press Space to Unlock
          </p>
          <Lock size={16} className="opacity-70" />
        </motion.div>
      )}
    </motion.div>
  );
}
