import { resumeData } from "../data/resumeData";

export default function About() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Header Section with Photo */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8 animate-fade-in-up">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <img
            src="https://github.com/SaiyamTuteja.png"
            alt="Saiyam Tuteja"
            className="relative w-40 h-40 rounded-full object-cover border-4 border-white/10 shadow-2xl"
          />
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2">
            {resumeData.profile.name}
          </h1>
          <p className="text-xl text-blue-300 font-light">
            {resumeData.profile.role}
          </p>
          <p className="text-gray-400 text-sm mt-1 flex items-center justify-center md:justify-start gap-2">
            📍 {resumeData.profile.location}
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4 text-white/90">
            Biography
          </h2>
          <p className="leading-relaxed text-gray-300 font-light">
            {resumeData.profile.summary}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center">
          <h3 className="font-semibold text-white/90 mb-4">Connect</h3>
          <div className="space-y-3">
            <a
              href={resumeData.profile.linkedin}
              target="_blank"
              className="block w-full text-center py-2 rounded-lg bg-[#0077b5] hover:bg-[#006396] text-white text-sm font-medium transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={resumeData.profile.github}
              target="_blank"
              className="block w-full text-center py-2 rounded-lg bg-[#24292e] hover:bg-[#1b1f23] text-white text-sm font-medium transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${resumeData.profile.email}`}
              className="block w-full text-center py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
            >
              Email Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
