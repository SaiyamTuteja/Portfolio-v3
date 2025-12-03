import { resumeData } from "../data/resumeData";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export default function Experience() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
          <Briefcase className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">Work Experience</h2>
          <p className="text-gray-400">Professional journey and internships</p>
        </div>
      </div>

      <div className="relative space-y-12">
        {/* Vertical Timeline Line */}
        <div className="absolute left-[19px] top-2 bottom-0 w-0.5 bg-white/10 md:left-1/2 md:-ml-[1px]"></div>

        {resumeData.experience.map((job, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col md:flex-row gap-8 ${
              idx % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-0 w-10 h-10 flex items-center justify-center md:left-1/2 md:-ml-5 z-10">
              <div className="w-4 h-4 bg-purple-500 rounded-full border-4 border-slate-900 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
            </div>

            {/* Content Card */}
            <div className="ml-12 md:ml-0 md:w-1/2 relative group">
              <div
                className={`p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] ${
                  idx % 2 === 0 ? "md:text-left" : "md:text-right"
                }`}
              >
                <h3 className="text-xl font-bold text-white mb-1">
                  {job.role}
                </h3>
                <h4 className="text-lg text-blue-300 mb-4 font-medium">
                  {job.company}
                </h4>

                <div
                  className={`flex flex-wrap gap-4 text-xs text-gray-400 mb-4 ${
                    idx % 2 === 0
                      ? "justify-start"
                      : "md:justify-end justify-start"
                  }`}
                >
                  <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                    <Calendar size={12} /> {job.period}
                  </span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed opacity-90">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Empty space for the other side of timeline */}
            <div className="md:w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
