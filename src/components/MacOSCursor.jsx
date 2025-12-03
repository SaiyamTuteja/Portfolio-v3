import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function MacOSCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isClicking, setIsClicking] = useState(false);
  const [isText, setIsText] = useState(false);
  const [clickRipple, setClickRipple] = useState(false);

  useEffect(() => {
    const moveMouse = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setClickRipple(true);
      setTimeout(() => setClickRipple(false), 400);
    };
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;

      // Check for text cursor
      const isTextInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.contentEditable === "true" ||
        target.closest("input") ||
        target.closest("textarea");

      setIsText(!!isTextInput);
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

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  )
    return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    >
      {/* Click ripple effect */}
      {clickRipple && (
        <motion.div
          className="absolute rounded-full border-2 border-blue-500"
          style={{
            width: 40,
            height: 40,
            left: -20,
            top: -20,
          }}
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}

      <motion.div
        animate={{ scale: isClicking ? 0.85 : 1 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        {isText ? (
          /* I-BEAM TEXT CURSOR */
          <svg
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            style={{ marginLeft: "-10px", marginTop: "-12px" }}
          >
            <g filter="url(#ibeamShadow)">
              <path
                d="M10 2v20M7 2h6M7 22h6"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M10 2v20M7 2h6M7 22h6"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>
            <defs>
              <filter id="ibeamShadow" x="0" y="0" width="20" height="28">
                <feDropShadow
                  dx="0"
                  dy="1"
                  stdDeviation="0.8"
                  floodOpacity="0.3"
                />
              </filter>
            </defs>
          </svg>
        ) : (
          /* ARROW CURSOR */
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <g filter="url(#arrowShadow)">
              <path d="M5 3L14.5 23L17.5 14.8L25 12.5L5 3Z" fill="black" />
              <path
                d="M5 3L14.5 23L17.5 14.8L25 12.5L5 3Z"
                stroke="white"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <filter id="arrowShadow" x="0" y="0" width="34" height="34">
                <feDropShadow
                  dx="0"
                  dy="1.3"
                  stdDeviation="1.1"
                  floodOpacity="0.45"
                />
              </filter>
            </defs>
          </svg>
        )}
      </motion.div>
    </motion.div>
  );
}
