import { motion } from "framer-motion";

export default function BootScreen({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 3, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center text-white"
    >
      {/* Monogram Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mb-8"
      >
        <div className="w-24 h-24 rounded-[2rem] bg-white text-black flex items-center justify-center text-4xl font-bold shadow-[0_0_40px_rgba(255,255,255,0.3)]">
          ST
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          className="h-full bg-white rounded-full"
        />
      </div>
    </motion.div>
  );
}
