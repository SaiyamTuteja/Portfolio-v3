import { useState } from "react";
import {
  Search,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Lock,
  Shield,
} from "lucide-react";

export default function Safari() {
  const [url, setUrl] = useState("google.com/search?q=Saiyam+Tuteja");

  return (
    <div className="flex flex-col h-full bg-white text-black font-sans">
      {/* --- SAFARI TOOLBAR --- */}
      <div className="h-12 bg-[#f5f5f5] flex items-center px-4 gap-4 border-b border-[#d1d1d1] shrink-0">
        <div className="flex gap-4 text-gray-500">
          <ArrowLeft size={18} className="cursor-pointer hover:text-black" />
          <ArrowRight size={18} className="cursor-pointer hover:text-black" />
          <RotateCw size={16} className="cursor-pointer hover:text-black" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-2xl mx-auto h-8 bg-white border border-[#d1d1d1] rounded-lg flex items-center justify-center relative shadow-sm group hover:shadow-md transition-shadow">
          <Shield size={12} className="text-gray-500 absolute left-3" />
          <input
            type="text"
            value={url}
            readOnly
            className="w-full text-center text-sm bg-transparent outline-none text-black font-medium selection:bg-blue-200"
          />
          <Lock size={12} className="text-gray-500 absolute right-3" />
        </div>
      </div>

      {/* --- CONTENT AREA (Google Search Simulation) --- */}
      <div className="flex-1 bg-white overflow-y-auto custom-scrollbar">
        <div className="max-w-[800px] mx-auto p-6 md:p-10">
          {/* Google Logo Header */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
              className="h-8"
            />
            <div className="flex-1 bg-white border border-gray-200 rounded-full h-11 flex items-center px-4 shadow-sm hover:shadow-md transition-shadow">
              <input
                type="text"
                value="Saiyam Tuteja"
                readOnly
                className="flex-1 outline-none text-black text-base"
              />
              <Search className="text-blue-500 cursor-pointer" />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-6 text-sm text-gray-600 border-b border-gray-200 pb-3 mb-6">
            <span className="text-blue-600 font-medium border-b-2 border-blue-600 pb-3 -mb-3 px-1 cursor-pointer">
              All
            </span>
            <span className="hover:text-black cursor-pointer">Images</span>
            <span className="hover:text-black cursor-pointer">News</span>
            <span className="hover:text-black cursor-pointer">Videos</span>
            <span className="hover:text-black cursor-pointer">Maps</span>
          </div>

          {/* Search Results */}
          <div className="space-y-8">
            {/* Result 1: LinkedIn */}
            <div className="group cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-[#f1f3f4] p-1 rounded-full">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                    className="w-4 h-4"
                  />
                </div>
                <div className="text-sm text-[#202124]">
                  <span>LinkedIn</span>
                  <span className="text-gray-500 mx-1">›</span>
                  <span>in › saiyam-tuteja</span>
                </div>
              </div>
              <h3 className="text-xl text-[#1a0dab] group-hover:underline font-normal mb-1">
                Saiyam Tuteja - Data Analytics Specialist & Mentor
              </h3>
              <p className="text-sm text-[#4d5156] leading-relaxed">
                Data Analytics Specialist | Full Stack Developer. Experienced in
                Python, Power BI, and MERN stack. Currently pursuing MCA at
                Graphic Era Hill University.
              </p>
            </div>

            {/* Result 2: GitHub */}
            <div className="group cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-[#f1f3f4] p-1 rounded-full">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                    className="w-4 h-4"
                  />
                </div>
                <div className="text-sm text-[#202124]">
                  <span>GitHub</span>
                  <span className="text-gray-500 mx-1">›</span>
                  <span>SaiyamTuteja</span>
                </div>
              </div>
              <h3 className="text-xl text-[#1a0dab] group-hover:underline font-normal mb-1">
                SaiyamTuteja (Saiyam Tuteja) · GitHub
              </h3>
              <p className="text-sm text-[#4d5156] leading-relaxed">
                Saiyam Tuteja. Data Analyst & Software Engineer. 15 public
                repositories. Python, JavaScript, Jupyter Notebook.
              </p>
            </div>

            {/* Result 3: Portfolio */}
            <div className="group cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                  P
                </div>
                <div className="text-sm text-[#202124]">Portfolio</div>
              </div>
              <h3 className="text-xl text-[#1a0dab] group-hover:underline font-normal mb-1">
                Saiyam Tuteja | Personal Portfolio
              </h3>
              <p className="text-sm text-[#4d5156] leading-relaxed">
                Welcome to my digital space. Explore my projects in Data
                Analytics (Power BI, Tableau) and Web Development (MERN Stack).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
