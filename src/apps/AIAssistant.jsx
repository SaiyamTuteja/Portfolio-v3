import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { RESUME_CONTEXT } from "../data/resumeData";

// NOTE: This uses Google Gemini API (Generative Language)
// You must set VITE_AI_API_KEY in your .env file

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Hi! I'm Saiyam's AI Assistant. Ask me anything about his projects, experience, or skills!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    const apiKey = import.meta.env.VITE_AI_API_KEY;

    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content:
            "Error: API Key is missing. Please add VITE_AI_API_KEY to your .env file.",
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      // Using Gemini API format
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful assistant for Saiyam Tuteja's portfolio. 
                        Here is Saiyam's resume data in JSON format: ${RESUME_CONTEXT}.
                        
                        Strictly answer questions based ONLY on this data. Be polite and professional. 
                        If the answer isn't in the data, say you don't know. 
                        Keep answers concise.
                        
                        User Question: ${userMsg}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const botReply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't process that.";

      setMessages((prev) => [...prev, { role: "system", content: botReply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "system", content: "Sorry, I encountered a network error." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "system" ? "bg-purple-600" : "bg-blue-600"
              }`}
            >
              {msg.role === "system" ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div
              className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                msg.role === "system"
                  ? "bg-white/10 rounded-tl-none"
                  : "bg-blue-600 rounded-tr-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
              <Loader2 size={16} className="animate-spin" />
            </div>
            <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none text-sm italic opacity-70">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="p-4 border-t border-white/10 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my skills..."
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-colors disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
