import { X } from "lucide-react";

export default function ImageViewer({ src, name }) {
  return (
    <div className="h-full w-full flex flex-col bg-black/90 text-white relative">
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={src}
          alt={name}
          className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
        />
      </div>
      <div className="h-12 bg-gray-900/50 backdrop-blur-md flex items-center justify-center border-t border-white/10 shrink-0 select-none">
        <span className="text-sm font-medium opacity-80">{name}</span>
      </div>
    </div>
  );
}
