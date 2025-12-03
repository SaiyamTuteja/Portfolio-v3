import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function MacOSCursor() {
  // Motion values for smooth physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics (The "Premium/Lag" feel)
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveMouse = (e) => {
      // Direct updates for instant feel, or use spring for smooth
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      // Check if hovering over clickable elements
      const target = e.target;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.tagName === "A" ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer");

      setIsPointer(!!isClickable);
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
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] drop-shadow-2xl"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div
        animate={{
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        {isPointer ? (
          // Hand Cursor SVG
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.25 18.5C10.25 18.5 7.5 19 6 17.5C4.5 16 2.5 12 3.5 9.5C4.5 7 8 7 8 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect
              x="8"
              y="3"
              width="3"
              height="10"
              rx="1.5"
              fill="white"
              stroke="black"
              strokeWidth="1"
            />
            <rect
              x="12"
              y="1.5"
              width="3"
              height="11.5"
              rx="1.5"
              fill="white"
              stroke="black"
              strokeWidth="1"
            />
            <rect
              x="16"
              y="3.5"
              width="3"
              height="9.5"
              rx="1.5"
              fill="white"
              stroke="black"
              strokeWidth="1"
            />
            <rect
              x="20"
              y="6"
              width="3"
              height="7"
              rx="1.5"
              fill="white"
              stroke="black"
              strokeWidth="1"
            />
          </svg>
        ) : (
          // Default Arrow Cursor SVG (Mac Style)
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3L10.07 19.97L12.9 12.9L19.97 10.07L3 3Z"
              fill="black"
            />
            <path
              d="M3 3L10.07 19.97L12.9 12.9L19.97 10.07L3 3Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </motion.div>
    </motion.div>
  );
}
