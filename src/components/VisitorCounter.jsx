"use client";
import { useVisitorCount } from "../hooks/useVisitorCount";

export default function VisitorCounter() {
  const { count, loading } = useVisitorCount();

  if (loading) return null;
  if (count === null) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span className="text-xs font-mono font-bold text-white">
        {count} Visits
      </span>
    </div>
  );
}
