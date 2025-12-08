"use client";

import { useVisitorCount } from "../hooks/useVisitorCount"; // Check this path matches your folder structure

export default function VisitorCounter() {
  const { count, loading } = useVisitorCount();

  if (loading) return null; // Or return <span className="text-gray-500">...</span>
  if (count === null) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-sm">
      <span className="text-xs font-mono text-gray-600 dark:text-gray-300">
        👀 {count}
      </span>
    </div>
  );
}
