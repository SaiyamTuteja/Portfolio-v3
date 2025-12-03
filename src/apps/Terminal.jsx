export default function Terminal() {
  return (
    <div className="h-full w-full flex flex-col bg-black text-lime-400 font-mono text-sm p-4">
      <p className="mb-2">
        Last login: {new Date().toLocaleDateString()} on console
      </p>
      <p className="mb-1">
        saiyam-tuteja@portfolio ~ %{" "}
        <span className="text-white">git status</span>
      </p>
      <p>On branch main</p>
      <p>Your branch is up to date with 'origin/main'.</p>
      <p>nothing to commit, working tree clean</p>
      <p className="mt-2">
        saiyam-tuteja@portfolio ~ % <span className="typing-cursor"></span>
      </p>

      <style jsx>{`
        .typing-cursor {
          display: inline-block;
          width: 8px;
          height: 14px;
          background-color: white;
          margin-left: 2px;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          from,
          to {
            visibility: visible;
          }
          50% {
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
}
