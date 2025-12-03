export default function Notepad({ title }) {
  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-white font-mono">
      <div
        className="flex-1 p-4 outline-none resize-none bg-transparent"
        contentEditable
        suppressContentEditableWarning
      >
        {/* Placeholder content for new files */}
        <p className="text-gray-400">// {title}</p>
        <p className="text-gray-400">
          // Created on {new Date().toLocaleDateString()}
        </p>
        <br />
        <p>Start typing here...</p>
      </div>
      <div className="h-6 bg-[#007acc] text-xs flex items-center px-2 justify-between">
        <span>UTF-8</span>
        <span>JavaScript</span>
      </div>
    </div>
  );
}
