import { useState, useEffect } from "react";

export default function Notepad({ title, initialContent = "", onSave }) {
  const [content, setContent] = useState(initialContent);

  // Update internal state if initialContent changes (e.g. opening a different file)
  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleChange = (e) => {
    const newText = e.target.value;
    setContent(newText);
    // Auto-save to parent state
    if (onSave) onSave(newText);
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm leading-6">
      <textarea
        className="flex-1 p-4 bg-transparent outline-none resize-none border-none custom-scrollbar selection:bg-[#264f78]"
        value={content}
        onChange={handleChange}
        placeholder="// Start typing here..."
        spellCheck={false}
        autoFocus
      />

      <div className="h-6 bg-[#007acc] text-white text-[11px] flex items-center px-3 justify-between select-none shrink-0 cursor-default">
        <div className="flex gap-4">
          <span>
            Ln {content.split("\n").length}, Col {content.length}
          </span>
        </div>
        <div className="flex gap-4 opacity-90">
          <span>UTF-8</span>
          <span>
            {title?.includes(".")
              ? title.split(".").pop().toUpperCase()
              : "TXT"}
          </span>
        </div>
      </div>
    </div>
  );
}
