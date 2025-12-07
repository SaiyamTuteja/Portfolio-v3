import { useState } from "react";
import {
  Download,
  Printer,
  CheckCircle2,
  ChevronDown,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- IMPORT YOUR PDF FILES HERE ---
// Ensure you place these two files in your 'src/image/' folder
import dataAnalystPdf from "../Resumes/Saiyam_Tuteja-Data_Analyst_Resume.pdf";
import softwareEngPdf from "../Resumes/Saiyam_Tuteja_Resume.pdf";

export default function ResumeDoc() {
  const [activeRole, setActiveRole] = useState("Data Analyst");
  const [showToast, setShowToast] = useState(false);

  // Select the correct PDF based on the dropdown
  const currentPdf =
    activeRole === "Data Analyst" ? dataAnalystPdf : softwareEngPdf;

  // --- HANDLERS ---
  const handlePrint = () => {
    // Open PDF in a new window to print cleanly
    const printWindow = window.open(currentPdf, "_blank");
    // Note: Some browsers block automatic print calls, but opening the PDF allows the user to print easily.
  };

  const handleDownload = () => {
    // Trigger Download
    const link = document.createElement("a");
    link.href = currentPdf;
    link.download = `Saiyam_Tuteja_${activeRole.replace(" ", "_")}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show Thank You Message
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="h-full flex flex-col bg-[#525659] text-gray-900 font-sans relative overflow-hidden">
      {/* --- TOOLBAR --- */}
      <div className="h-14 bg-[#323639] border-b border-black flex items-center justify-between px-4 shrink-0 shadow-md z-10 text-gray-100">
        {/* Role Selector Dropdown */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <button className="flex items-center gap-2 bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border border-white/10">
              <FileText size={14} className="text-blue-400" />
              {activeRole} Resume
              <ChevronDown size={14} className="opacity-50" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 w-56 bg-[#2a2d30] border border-gray-600 rounded-lg shadow-2xl py-2 hidden group-hover:block z-50">
              <div className="px-3 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Select Version
              </div>
              <button
                onClick={() => setActiveRole("Data Analyst")}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  activeRole === "Data Analyst"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                Data Analyst Specialist
              </button>
              <button
                onClick={() => setActiveRole("Software Engineer")}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  activeRole === "Software Engineer"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                Software Engineer
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white"
            title="Print Resume"
          >
            <Printer size={18} />
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg transition-all active:scale-95"
          >
            <Download size={16} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* --- PDF PREVIEW AREA --- */}
      <div className="flex-1 bg-[#525659] overflow-hidden flex items-center justify-center p-0 md:p-4">
        {/* We use an iframe to render the PDF natively. 
            #toolbar=0 hides the default Chrome PDF toolbar for a cleaner look */}
        <iframe
          key={activeRole} // Re-render when role changes
          src={`${currentPdf}#toolbar=0&navpanes=0`}
          className="w-full h-full max-w-[1000px] shadow-2xl bg-white md:rounded-sm"
          title="Resume PDF Preview"
        />
      </div>

      {/* --- TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="absolute bottom-8 left-1/2 bg-[#1e1e1e] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-50 border border-white/10"
          >
            <div className="bg-green-500/20 p-2 rounded-full">
              <CheckCircle2 size={24} className="text-green-500" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Download Started</h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Thanks for downloading Saiyam's Resume! 🚀
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
