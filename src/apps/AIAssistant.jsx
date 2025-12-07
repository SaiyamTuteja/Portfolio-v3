import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  Trash2,
  Search,
  Globe,
} from "lucide-react";
import { RESUME_CONTEXT, resumeData } from "../data/resumeData";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! I'm Saiyam's AI Assistant. 🤖\n\nI can answer questions about his **Experience**, **Projects** (like UniGo), or **Technical Skills**. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("thinking");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // --- 🧠 IMPROVED LOCAL INTELLIGENCE ENGINE ---
  const generateLocalResponse = (query) => {
    const q = query.toLowerCase().trim();

    // Helper: Format Project Detail
    const formatProject = (p) => {
      return (
        `🚀 **Project Spotlight: ${p.title}**\n\n` +
        `📝 **Overview:** ${p.description}\n\n` +
        `💡 **Deep Dive:** ${p.deepDive}\n\n` +
        `🛠 **Tech Stack:** ${p.tech.join(" • ")}\n\n` +
        `_Would you like to explore another project?_`
      );
    };

    // 1. SUMMARY / ABOUT ME (New)
    if (
      q.includes("summary") ||
      q.includes("about") ||
      q.includes("who is") ||
      q.includes("describe") ||
      q.includes("bio")
    ) {
      return (
        `👋 **About Saiyam Tuteja**\n\n` +
        `${resumeData.profile.summary}\n\n` +
        `📍 **Location:** ${resumeData.profile.location}\n` +
        `🎓 **Role:** ${resumeData.profile.role}`
      );
    }

    // 2. ACHIEVEMENTS (New)
    if (
      q.includes("achievement") ||
      q.includes("award") ||
      q.includes("certif") ||
      q.includes("patent") ||
      q.includes("win")
    ) {
      return (
        `🏆 **Key Achievements**\n\n` +
        resumeData.achievements.map((a) => `• ${a}`).join("\n") +
        `\n\n*Including a filed Patent for an IoT Library System!*`
      );
    }

    // 3. SPECIFIC PROJECT DETECTION
    if (q.includes("unigo") || q.includes("ride"))
      return formatProject(resumeData.projects[1]);
    if (q.includes("profpraisal") || q.includes("faculty"))
      return formatProject(resumeData.projects[0]);
    if (
      q.includes("library") ||
      (q.includes("patent") && q.includes("project"))
    )
      return formatProject(resumeData.projects[2]);
    if (
      q.includes("employment") ||
      (q.includes("data") && q.includes("analysis") && q.includes("project"))
    )
      return formatProject(resumeData.projects[3]);

    // 4. SKILLS & TECH STACK
    if (
      q.includes("skill") ||
      q.includes("stack") ||
      q.includes("tech") ||
      q.includes("know") ||
      q.includes("react") ||
      q.includes("python") ||
      q.includes("framework") ||
      q.includes("language")
    ) {
      return (
        `💻 **Technical Arsenal**\n\n` +
        `**Languages:** ${resumeData.skills.languages.join(", ")}\n` +
        `**Frameworks:** ${resumeData.skills.frameworks.join(", ")}\n` +
        `**Tools:** ${resumeData.skills.tools.join(", ")}\n\n` +
        `Saiyam specializes in **Data Analytics** and **Full Stack Development**.`
      );
    }

    // 5. SPECIFIC JOB EXPERIENCE
    // Handle specific company queries first
    if (q.includes("capzora")) {
      const job = resumeData.experience[0];
      return `🏢 **Experience at ${job.company}**\n*${job.role} (${job.duration})*\n\n${job.description}\n\nThis role honed Saiyam's skills in AI integration and mentorship.`;
    }
    if (q.includes("noxalgo")) {
      const job = resumeData.experience[1];
      return `🏢 **Experience at ${job.company}**\n*${job.role} (${job.duration})*\n\n${job.description}`;
    }
    if (q.includes("coer") && q.includes("work")) {
      // Distinguish work vs education at COER
      const job = resumeData.experience[2];
      return `🏢 **Experience at ${job.company}**\n*${job.role} (${job.duration})*\n\n${job.description}`;
    }

    // 6. GENERAL EXPERIENCE (Fixes Typo "experince")
    if (
      q.includes("experience") ||
      q.includes("experince") ||
      (q.includes("work") && !q.includes("framework")) ||
      q.includes("job") ||
      q.includes("intern")
    ) {
      const jobs = resumeData.experience
        .map((e) => `🏢 **${e.company}**\n*${e.role} (${e.duration})*`)
        .join("\n\n");
      return `💼 **Professional Journey**\n\n${jobs}\n\n*Ask about a specific company (e.g., "Capzora") for details.*`;
    }

    // 7. EDUCATION (Fixes Typo "eductaion")
    if (
      q.includes("education") ||
      q.includes("eductaion") ||
      q.includes("college") ||
      q.includes("degree") ||
      q.includes("study") ||
      q.includes("mca") ||
      q.includes("bca")
    ) {
      return (
        `🎓 **Education Timeline**\n\n` +
        `**MCA:** ${resumeData.education[0].institution} (Current)\n*CGPA: ${resumeData.education[0].details}*\n\n` +
        `**BCA:** ${resumeData.education[1].institution}\n*${resumeData.education[1].details}*`
      );
    }

    // 8. CONTACT
    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("reach") ||
      q.includes("hire") ||
      q.includes("github") ||
      q.includes("linkedin")
    ) {
      return (
        `📬 **Let's Connect!**\n\n` +
        `• **Email:** ${resumeData.profile.email}\n` +
        `• **LinkedIn:** [Saiyam Tuteja](${resumeData.profile.linkedin})\n` +
        `• **GitHub:** [SaiyamTuteja](${resumeData.profile.github})`
      );
    }

    // 9. GENERAL PROJECTS LIST
    if (q.includes("project") || q.includes("built")) {
      return (
        `📂 **Featured Projects**\n\n` +
        resumeData.projects
          .map((p) => `• **${p.title.split(" - ")[0]}**: ${p.description}`)
          .join("\n\n") +
        `\n\n*Tip: Ask "Tell me about UniGo" for a deep dive.*`
      );
    }

    // 10. GREETINGS
    if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
      return "Hello! 👋 I'm ready to answer questions about Saiyam's **Patent**, **Work Experience**, or **Tech Skills**. What's on your mind?";
    }

    // 11. FALLBACK
    return (
      `I didn't quite catch that. 🤔\n\n` +
      `You can ask me about:\n` +
      `• **Summary** / Bio\n` +
      `• **Achievements** / Awards\n` +
      `• **Specific Projects** like "UniGo"\n` +
      `• **Skills** like "Python"\n` +
      `• **Experience** at "Capzora"`
    );
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
    setStatus("searching");

    // Simulate "Processing" delay
    await new Promise((r) => setTimeout(r, 800));
    setStatus("thinking");

    const apiKey = import.meta.env.VITE_AI_API_KEY;

    // --- EXECUTION STRATEGY ---
    if (!apiKey) {
      const localReply = generateLocalResponse(userMsg);
      setMessages((prev) => [...prev, { role: "model", text: localReply }]);
      setLoading(false);
      return;
    }

    try {
      const history = messages.map((m) => ({
        role: m.role === "model" ? "model" : "user",
        parts: [{ text: m.text }],
      }));
      history.push({ role: "user", parts: [{ text: userMsg }] });

      const systemPrompt = {
        role: "user",
        parts: [
          {
            text: `
          SYSTEM INSTRUCTION:
          You are Saiyam Tuteja's expert AI Portfolio Agent.
          
          KNOWLEDGE BASE:
          ${RESUME_CONTEXT}

          BEHAVIOR:
          1. Answer based ONLY on the resume data.
          2. Use emojis and bold text for key points.
          3. Be professional, concise, and helpful.
        `,
          },
        ],
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [systemPrompt, ...history] }),
        }
      );

      if (!response.ok) throw new Error("API Error");

      const data = await response.json();
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text;

      setMessages((prev) => [...prev, { role: "model", text: botReply }]);
    } catch (error) {
      console.warn("Falling back to local intelligence");
      const localReply = generateLocalResponse(userMsg);
      setMessages((prev) => [...prev, { role: "model", text: localReply }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] text-black font-sans">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white/80 backdrop-blur-md flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-800">
              Saiyam's AI Agent
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-[10px] text-gray-500 font-medium">
                Online & Ready
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() =>
            setMessages([
              { role: "model", text: "History cleared. Start a new topic!" },
            ])
          }
          className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
          title="Clear History"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-white/50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white shadow-md ${
                msg.role === "model" ? "bg-black" : "bg-indigo-600"
              }`}
            >
              {msg.role === "model" ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div
              className={`p-3.5 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${
                msg.role === "model"
                  ? "bg-white border border-gray-100 rounded-tl-none text-gray-800"
                  : "bg-indigo-600 text-white rounded-tr-none"
              }`}
            >
              {msg.text.split("\n").map((line, idx) => (
                <p
                  key={idx}
                  className={`${
                    line.trim().startsWith("•") ? "ml-4 mb-1" : "mb-2"
                  } ${line.includes("**") ? "" : ""}`}
                >
                  {line.split("**").map((part, j) =>
                    j % 2 === 1 ? (
                      <strong
                        key={j}
                        className={
                          msg.role === "model" ? "text-indigo-900" : "font-bold"
                        }
                      >
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              ))}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
              <Loader2 size={16} className="animate-spin" />
            </div>
            <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none text-xs font-medium text-gray-500 shadow-sm flex items-center gap-2">
              {status === "searching" ? (
                <>
                  <Globe size={12} className="animate-spin text-blue-500" />
                  <span>Analyzing Profile...</span>
                </>
              ) : (
                <span>Thinking...</span>
              )}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSend}
        className="p-4 bg-white border-t border-gray-200 flex gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about 'Summary', 'Skills', or 'Experience'..."
          className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg transition-all disabled:opacity-50 active:scale-95"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
