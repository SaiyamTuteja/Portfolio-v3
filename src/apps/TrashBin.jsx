import { useState } from "react";
import { FileText, RefreshCcw, Trash2, FolderOpen } from "lucide-react";

export default function TrashBin({ items = [], onRestore, onEmpty }) {
  return (
    <div className="h-full flex flex-col bg-white text-black font-sans">
      {/* Header */}
      <div className="h-12 bg-[#f5f5f7] border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2 text-gray-500">
          <Trash2 size={18} />
          <span className="font-semibold text-sm">Bin</span>
        </div>
        {items.length > 0 && (
          <button
            onClick={onEmpty}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-xs font-medium rounded-md transition-colors text-gray-700"
          >
            Empty Bin
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 select-none">
            <FolderOpen size={48} strokeWidth={1} className="mb-2 opacity-50" />
            <p className="text-sm">Trash is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-blue-50 cursor-default"
              >
                <div className="relative">
                  <FileText
                    size={48}
                    className="text-gray-400"
                    strokeWidth={1}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                    <Trash2 size={12} className="text-red-500" />
                  </div>
                </div>
                <span className="text-xs text-center font-medium truncate w-full px-1">
                  {item.title}
                </span>

                <button
                  onClick={() => onRestore(item.id)}
                  className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-md hover:scale-110 transition-all"
                  title="Restore"
                >
                  <RefreshCcw size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="h-6 bg-[#f5f5f7] border-t border-gray-200 flex items-center px-4 text-[10px] text-gray-500 select-none">
        {items.length} item{items.length !== 1 && "s"}
      </div>
    </div>
  );
}
