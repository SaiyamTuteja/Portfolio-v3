export default function Notepad({ title }) {
  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-white font-mono">
      <div
        className="flex-1 p-4 outline-none resize-none bg-transparent overflow-auto custom-scrollbar"
        contentEditable
        suppressContentEditableWarning
      >
        <p className="text-gray-400">// {title}</p>
        <p className="text-gray-400 mb-4">
          // Created on {new Date().toLocaleDateString()}
        </p>
        <p>Start typing here...</p>
      </div>
      <div className="h-6 bg-[#007acc] text-xs flex items-center px-2 justify-between select-none shrink-0">
        <span>UTF-8</span>
        <span>JavaScript</span>
      </div>
    </div>
  );
}
