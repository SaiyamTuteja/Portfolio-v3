import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function MacOSCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isPointer, setIsPointer] = useState(false);
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

      // Check for pointer cursor
      const isClickable =
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.tagName === "A" ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer") ||
        target.closest(".desktop-icon") ||
        target.closest(".window-header") ||
        target.closest(".cc-toggle");

      setIsPointer(!!isClickable && !isTextInput);
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
        ) : isPointer ? (
          /* AUTHENTIC MAC POINTER HAND (Updated) */
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: "-10px", marginTop: "-2px" }}
          >
            <g filter="url(#handShadow)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5 2C10.5 2 10.5 4.5 10.5 11H9.5C7.5 11 7 13 8.5 14.5L12 18H17.5C18.5 18 19.5 17 19.5 16V12C19.5 11 18.5 11 18.5 12V13H17.5V10C17.5 9.5 17 9 16.5 9C16 9 15.5 9.5 15.5 10V13H14.5V8.5C14.5 8 14 7.5 13.5 7.5C13 7.5 12.5 8 12.5 8.5V12H11.5V3C11.5 2.5 11 2 10.5 2Z"
                fill="white"
                stroke="black"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <filter
                id="handShadow"
                x="-2"
                y="-2"
                width="30"
                height="30"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feDropShadow
                  dx="0"
                  dy="1.2"
                  stdDeviation="1.2"
                  floodOpacity="0.35"
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
