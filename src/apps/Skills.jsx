import { resumeData } from "../data/resumeData";
import { Cpu, Globe, Database, PenTool } from "lucide-react";

const icons = {
  languages: Cpu,
  frameworks: Globe,
  tools: Database,
  soft: PenTool,
};

export default function Skills() {
  return (
    <div className="p-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Technical Arsenal
        </h2>
        <p className="text-gray-400">
          Tools, languages, and technologies I use.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(resumeData.skills).map(([category, items]) => {
          const Icon = icons[category] || Cpu;
          return (
            <div
              key={category}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
            >
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold capitalize text-white">
                  {category.replace("_", " ")}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-black/30 rounded-full border border-white/10 text-sm text-gray-200 hover:border-blue-500/50 hover:text-blue-300 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
