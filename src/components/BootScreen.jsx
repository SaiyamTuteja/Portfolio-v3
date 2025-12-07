// import { motion } from "framer-motion";

// export default function BootScreen({ onComplete }) {
//   return (
//     <motion.div
//       initial={{ opacity: 1 }}
//       animate={{ opacity: 0 }}
//       transition={{ duration: 1, delay: 3, ease: "easeInOut" }}
//       onAnimationComplete={onComplete}
//       className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center text-white"
//     >
//       {/* Monogram Logo */}
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="mb-8"
//       >
//         <div className="w-24 h-24 rounded-[2rem] bg-white text-black flex items-center justify-center text-4xl font-bold shadow-[0_0_40px_rgba(255,255,255,0.3)]">
//           ST
//         </div>
//       </motion.div>

//       {/* Progress Bar */}
//       <div className="w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden">
//         <motion.div
//           initial={{ width: 0 }}
//           animate={{ width: "100%" }}
//           transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
//           className="h-full bg-white rounded-full"
//         />
//       </div>
//     </motion.div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- IMPORTS ---
import appleLogo from "../image/apple-logo.png"; // Ensure path is correct
import startupSoundUrl from "../image/mac_startup.mp3";

export default function BootScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("black_screen"); // Start black
  const [typedText, setTypedText] = useState("");

  const welcomeMessage = "Welcome";
  const audioRef = useRef(new Audio(startupSoundUrl));

  // 1. Auto-Start Logic (Audio + Fullscreen)
  useEffect(() => {
    const initSystem = async () => {
      // Try to enter Full Screen automatically (might be blocked)
      if (
        !document.fullscreenElement &&
        document.documentElement.requestFullscreen
      ) {
        document.documentElement.requestFullscreen().catch(() => {});
      }

      // Try to play sound
      try {
        await audioRef.current.play();
        // If successful, start loading immediately
        setStage("loading");
      } catch (err) {
        // If blocked, we MUST wait for a click (browser policy)
        console.warn("Autoplay blocked. Waiting for user interaction.");
        setStage("click_to_start");
      }
    };

    // Small delay to ensure mount
    setTimeout(initSystem, 500);
  }, []);

  // 2. Manual Trigger (Fallback)
  const handleUserStart = () => {
    // Retry Audio
    audioRef.current.play().catch(() => {});

    // Retry Fullscreen
    if (
      !document.fullscreenElement &&
      document.documentElement.requestFullscreen
    ) {
      document.documentElement.requestFullscreen().catch(() => {});
    }

    setStage("loading");
  };

  // 3. Loading Bar Animation
  useEffect(() => {
    if (stage === "loading") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStage("welcome"), 800);
            return 100;
          }
          // Realistic non-linear loading
          const increment = prev < 30 ? 5 : prev < 70 ? 2 : 0.5;
          return prev + increment;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [stage]);

  // 4. Typing Animation
  useEffect(() => {
    if (stage === "welcome") {
      let index = 0;
      setTypedText("");

      const typeInterval = setInterval(() => {
        // Slice ensures we get "W", "We", "Wel", etc. correctly
        setTypedText(welcomeMessage.slice(0, index + 1));
        index++;

        if (index === welcomeMessage.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            onComplete();
          }, 2500);
        }
      }, 150);

      return () => clearInterval(typeInterval);
    }
  }, [stage, onComplete]);

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center text-white cursor-none select-none"
      onClick={stage === "click_to_start" ? handleUserStart : undefined}
    >
      <AnimatePresence mode="wait">
        {/* STAGE 0: Fallback if Autoplay is blocked */}
        {stage === "click_to_start" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 cursor-pointer"
          >
            <img
              src={appleLogo}
              alt="Apple"
              className="w-16 h-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
            />
            <p className="text-gray-500 text-xs tracking-widest animate-pulse uppercase">
              Click to Boot
            </p>
          </motion.div>
        )}

        {/* STAGE 1: Apple Logo & Loading Bar */}
        {stage === "loading" && (
          <motion.div
            key="apple-load"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-12"
          >
            {/* Local Apple Image */}
            <img
              src={appleLogo}
              alt="Apple Logo"
              className="w-24 h-24 object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            />

            {/* macOS Progress Bar */}
            <div className="w-48 h-1.5 bg-[#333] rounded-full overflow-hidden border border-[#444]">
              <motion.div
                className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}

        {/* STAGE 2: Welcome Text */}
        {stage === "welcome" && (
          <motion.div
            key="welcome-text"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-6xl md:text-7xl font-semibold tracking-tight font-sans text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-2xl">
              {typedText}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
