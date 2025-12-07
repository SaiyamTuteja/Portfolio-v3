import { resumeData } from "../data/resumeData";
import { Download, Printer } from "lucide-react";

export default function ResumeDoc() {
  return (
    <div className="h-full flex flex-col bg-neutral-100 text-gray-900 font-serif">
      {/* Toolbar */}
      <div className="h-12 bg-gray-200 border-b border-gray-300 flex items-center justify-between px-4 shrink-0">
        <span className="text-sm font-semibold text-gray-600">Resume.pdf</span>
        <div className="flex gap-2">
          <button
            className="p-1.5 hover:bg-gray-300 rounded text-gray-700"
            title="Print"
          >
            <Printer size={16} />
          </button>
          <button
            className="p-1.5 hover:bg-gray-300 rounded text-gray-700"
            title="Download"
          >
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Document View */}
      <div className="flex-1 overflow-y-auto p-8 bg-gray-500/10 custom-scrollbar">
        <div className="max-w-[210mm] mx-auto bg-white shadow-xl min-h-[297mm] p-[20mm]">
          {/* Header */}
          <div className="border-b-2 border-gray-800 pb-6 mb-6">
            <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
              {resumeData.profile.name}
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              {resumeData.profile.role}
            </p>
            <div className="text-sm text-gray-500 flex flex-wrap gap-4">
              <span>{resumeData.profile.email}</span> |
              <span>{resumeData.profile.location}</span> |
              <a
                href={resumeData.profile.linkedin}
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-8">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              {resumeData.profile.summary}
            </p>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">
              Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((job, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800">{job.role}</h3>
                    <span className="text-sm text-gray-500">{job.period}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">
                    {job.company}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-8">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">
              Projects
            </h2>
            <div className="space-y-4">
              {resumeData.projects.map((proj, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-800">{proj.title}</h3>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mt-1">
                    {proj.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-800">{edu.school}</h3>
                    <span className="text-sm text-gray-500">{edu.period}</span>
                  </div>
                  <div className="text-sm text-gray-700">{edu.degree}</div>
                  <div className="text-xs text-gray-500 italic mt-1">
                    {edu.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
