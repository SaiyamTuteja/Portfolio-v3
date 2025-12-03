import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for the outer ring (The "Lag" effect)
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveMouse = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      // Check if hovering over clickable elements
      if (
        e.target.tagName === "BUTTON" ||
        e.target.closest("button") ||
        e.target.tagName === "A" ||
        e.target.closest(".window-header") ||
        e.target.closest(".desktop-icon")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Hide on touch devices
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  )
    return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] mix-blend-difference">
      {/* Inner Dot (Instant Follow) */}
      <motion.div
        className="absolute w-2 h-2 bg-white rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: 12, // Center inside the 32x32 box
          translateY: 12,
        }}
      />

      {/* Outer Ring (Smooth Follow) */}
      <motion.div
        className="absolute w-8 h-8 border border-white rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          backgroundColor: isHovering
            ? "rgba(255, 255, 255, 0.1)"
            : "transparent",
        }}
      />
    </div>
  );
}
