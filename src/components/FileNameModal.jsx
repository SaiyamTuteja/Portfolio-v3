import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X } from "lucide-react";

export default function FileNameModal({ isOpen, onClose, onConfirm }) {
  const [fileName, setFileName] = useState("Untitled.txt");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fileName.trim()) {
      onConfirm(fileName);
      setFileName("Untitled.txt"); // Reset
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-80 bg-[#1e1e1e] border border-white/10 rounded-xl shadow-2xl overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="h-10 bg-[#252526] flex items-center justify-between px-4 border-b border-black/50">
              <span className="text-xs font-semibold text-gray-300">
                Create New File
              </span>
              <button
                onClick={onClose}
                className="hover:bg-white/10 p-1 rounded transition-colors"
              >
                <X size={14} className="text-gray-400" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-400 ml-1">
                  File Name
                </label>
                <div className="relative group">
                  <FileText
                    size={16}
                    className="absolute left-3 top-2.5 text-blue-400 group-focus-within:text-blue-300 transition-colors"
                  />
                  <input
                    autoFocus
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full bg-[#2d2d2d] border border-white/10 rounded-lg py-2 pl-10 pr-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="e.g. notes.txt"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-gray-300 hover:bg-white/5 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                >
                  Create File
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
