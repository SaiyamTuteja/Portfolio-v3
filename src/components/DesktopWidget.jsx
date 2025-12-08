import { Eye, TrendingUp } from "lucide-react";
import { useVisitorCount } from "../hooks/useVisitorCount";

export default function DesktopWidget() {
  const { count, loading } = useVisitorCount();

  return (
    <div className="absolute top-12 right-6 w-48 p-4 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl text-white select-none group hover:bg-black/30 transition-all duration-300 z-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 opacity-70 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-bold uppercase tracking-wider">
          Portfolio Insights
        </span>
        <div className="bg-green-500/20 p-1 rounded-full">
          <TrendingUp size={12} className="text-green-400" />
        </div>
      </div>

      {/* Main Stat */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
          <Eye size={20} className="text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold leading-none tracking-tight">
            {loading ? (
              <span className="animate-pulse">...</span>
            ) : (
              count?.toLocaleString() || "0"
            )}
          </span>
          <span className="text-xs text-white/60 font-medium mt-0.5">
            Total Visitors
          </span>
        </div>
      </div>

      {/* Footer / Decor */}
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-[10px] text-white/40 font-medium">
          Live Analytics
        </span>
      </div>
    </div>
  );
}
