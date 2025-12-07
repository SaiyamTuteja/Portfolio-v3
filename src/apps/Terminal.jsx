import { useState, useEffect, useRef } from "react";

// --- FILE SYSTEM MOCK ---
const fileSystem = {
  "~": {
    type: "dir",
    children: {
      projects: { type: "dir", children: {} },
      "skills.txt": {
        type: "file",
        content: "React, Node.js, Python, Power BI, SQL, Tableau",
      },
      "about.txt": {
        type: "file",
        content:
          "Hi, I'm Saiyam Tuteja. A Data Analytics Specialist & Software Engineer.",
      },
      "contact.txt": {
        type: "file",
        content: "Email: saiyamtuteja@gmail.com | LinkedIn: saiyam-tuteja",
      },
      "resume.pdf": {
        type: "file",
        content: "[Binary Data] Use 'open resume' to view.",
      },
    },
  },
  "~/projects": {
    type: "dir",
    children: {
      "unigo.txt": {
        type: "file",
        content: "UniGo: University Ride Sharing App using MERN Stack.",
      },
      "profpraisal.txt": {
        type: "file",
        content: "ProfPraisal: Faculty Evaluation System using PHP/MySQL.",
      },
      "library_iot.txt": {
        type: "file",
        content: "IoT Library System: RFID based book tracking (Patent Filed).",
      },
    },
  },
};

export default function Terminal({ onOpenApp }) {
  const [history, setHistory] = useState([
    { type: "output", content: "Welcome to SaiyamOS Terminal v1.0.0" },
    { type: "output", content: "Type 'help' to see available commands." },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]); // For Up/Down arrow
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState("~");

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Focus input on click anywhere
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd) => {
    const args = cmd.trim().split(" ");
    const command = args[0].toLowerCase();
    const arg1 = args[1];

    // Add to visual history
    const newEntry = { type: "input", path: currentPath, content: cmd };
    let output = null;

    switch (command) {
      case "help":
        output =
          "Available commands:\n  ls        List directory contents\n  cd [dir]  Change directory\n  cat [file] Read file content\n  clear     Clear terminal\n  whoami    Print current user\n  date      Print current date\n  open [app] Open a system app (e.g., 'open safari')";
        break;

      case "clear":
        setHistory([]);
        return; // Skip adding to history

      case "whoami":
        output = "saiyam-tuteja";
        break;

      case "date":
        output = new Date().toString();
        break;

      case "ls":
        const dir = fileSystem[currentPath];
        if (dir) {
          output = Object.keys(dir.children)
            .map((k) => {
              const isDir = dir.children[k].type === "dir";
              return isDir ? `${k}/` : k;
            })
            .join("  ");
        } else {
          output = "Error: Directory not found.";
        }
        break;

      case "cd":
        if (!arg1 || arg1 === "~") {
          setCurrentPath("~");
        } else if (arg1 === "..") {
          // Simple logic for going back
          if (currentPath !== "~") setCurrentPath("~");
        } else {
          const newPath =
            currentPath === "~" ? `~/${arg1}` : `${currentPath}/${arg1}`;
          if (fileSystem[newPath]) {
            setCurrentPath(newPath);
          } else {
            output = `cd: no such file or directory: ${arg1}`;
          }
        }
        break;

      case "cat":
        if (!arg1) {
          output = "usage: cat [file]";
        } else {
          const currentDir = fileSystem[currentPath];
          const file = currentDir.children[arg1];
          if (file && file.type === "file") {
            output = file.content;
          } else if (file && file.type === "dir") {
            output = `cat: ${arg1}: Is a directory`;
          } else {
            output = `cat: ${arg1}: No such file`;
          }
        }
        break;

      case "open":
        if (!arg1) {
          output = "usage: open [app_name] (e.g. finder, safari, mail)";
        } else {
          const appName = arg1.toLowerCase();
          if (onOpenApp) {
            onOpenApp(appName);
            output = `Opening ${appName}...`;
          } else {
            output = "Error: Cannot open apps from this context.";
          }
        }
        break;

      case "":
        break;

      default:
        output = `zsh: command not found: ${command}`;
    }

    setHistory((prev) => [
      ...prev,
      newEntry,
      ...(output ? [{ type: "output", content: output }] : []),
    ]);
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };

  return (
    <div
      className="h-full w-full bg-[#1e1e1e]/95 text-[#33ff00] font-mono text-sm p-4 overflow-y-auto custom-scrollbar"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="space-y-1">
        {history.map((entry, i) => (
          <div key={i} className="break-words">
            {entry.type === "input" ? (
              <div>
                <span className="text-blue-400 font-bold">
                  saiyam-tuteja@portfolio
                </span>
                <span className="text-white mx-1">:</span>
                <span className="text-cyan-400">{entry.path}</span>
                <span className="text-white mx-1">%</span>
                <span className="text-white">{entry.content}</span>
              </div>
            ) : (
              <div className="whitespace-pre-wrap text-gray-300">
                {entry.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Line */}
      <div className="flex mt-1">
        <span className="text-blue-400 font-bold whitespace-nowrap">
          saiyam-tuteja@portfolio
        </span>
        <span className="text-white mx-1">:</span>
        <span className="text-cyan-400 whitespace-nowrap">{currentPath}</span>
        <span className="text-white mx-1">%</span>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none text-white border-none p-0 m-0 absolute top-0 left-0 h-full opacity-0 z-10 cursor-text"
            autoComplete="off"
            spellCheck="false"
          />
          {/* Visual Cursor simulation */}
          <span className="text-white whitespace-pre-wrap">{currentInput}</span>
          <span className="inline-block w-2.5 h-4 bg-gray-400 align-middle animate-pulse ml-0.5" />
        </div>
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
