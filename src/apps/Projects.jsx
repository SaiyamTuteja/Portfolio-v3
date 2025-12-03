import { resumeData } from "../data/resumeData";
import { ExternalLink, Github, FolderOpen, Award } from "lucide-react";

export default function Projects() {
  return (
    <div className="p-8 space-y-10">
      {/* Introduction */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
          <FolderOpen className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">Project Gallery</h2>
          <p className="text-gray-400">Selected works and experiments</p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {resumeData.projects.map((project, idx) => (
          <div
            key={idx}
            className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300 flex flex-col"
          >
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                  {project.title}
                </h3>
                <a
                  href={project.link}
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github size={20} />
                </a>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">
                {project.desc}
              </p>
              <div className="flex gap-2 mt-auto">
                <a
                  href={project.link}
                  target="_blank"
                  className="flex-1 bg-white/10 hover:bg-white/20 text-center py-2 rounded-lg text-sm font-medium transition-colors border border-white/5"
                >
                  View Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements Section */}
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-white">
            Achievements & Certifications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resumeData.achievements.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
              <span className="text-gray-200 text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
