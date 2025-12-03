import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, FileText, Briefcase, Code2 } from "lucide-react";
import { resumeData } from "../data/resumeData";

export default function SpotlightSearch({ isOpen, onClose, onOpenApp }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Flatten resume data for searching
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const hits = [];

    // Search Projects
    resumeData.projects.forEach((p) => {
      if (
        p.title.toLowerCase().includes(lowerQuery) ||
        p.desc.toLowerCase().includes(lowerQuery)
      ) {
        hits.push({
          type: "Project",
          title: p.title,
          subtitle: p.desc,
          icon: Code2,
          appId: "projects",
        });
      }
    });

    // Search Experience
    resumeData.experience.forEach((e) => {
      if (
        e.role.toLowerCase().includes(lowerQuery) ||
        e.company.toLowerCase().includes(lowerQuery)
      ) {
        hits.push({
          type: "Experience",
          title: e.role,
          subtitle: e.company,
          icon: Briefcase,
          appId: "experience",
        });
      }
    });

    // Search Skills
    Object.entries(resumeData.skills).forEach(([category, skills]) => {
      skills.forEach((skill) => {
        if (skill.toLowerCase().includes(lowerQuery)) {
          hits.push({
            type: "Skill",
            title: skill,
            subtitle: category,
            icon: FileText,
            appId: "skills",
          });
        }
      });
    });

    setResults(hits);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-start justify-center pt-[20vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-[600px] max-w-[90vw] bg-slate-900/90 backdrop-blur-2xl border border-white/20 rounded-xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 p-4 border-b border-white/10">
              <Search className="w-6 h-6 text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search Resume (e.g., 'React', 'Intern', 'Project')..."
                className="flex-1 bg-transparent text-xl text-white placeholder-gray-500 outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400">
                ESC
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {results.length > 0
                ? results.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        onOpenApp(item.appId);
                        onClose();
                      }}
                      className="w-full flex items-center gap-4 p-3 hover:bg-blue-600/50 transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-400 group-hover:text-gray-200 line-clamp-1">
                          {item.subtitle}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/50 opacity-0 group-hover:opacity-100" />
                    </button>
                  ))
                : query && (
                    <div className="p-8 text-center text-gray-500">
                      No results found in resume.
                    </div>
                  )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
