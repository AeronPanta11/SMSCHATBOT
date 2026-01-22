import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import "../css/smschatbot.css"; // Make sure this path is correct

const PHISHING_WORDS = [
  "urgent",
  "urgently",
  "verify",
  
  "login",
  "account",
  "bank",
  "password",
  "click",
  "immediately",
  "suspicious",
  "locked",
  "security",
];

function containsPhishingWord(text) {
  if (!text) return [];
  const lower = text.toLowerCase();
  return PHISHING_WORDS.filter((word) => lower.includes(word));
}

function highlightText(text, riskyWords = []) {
  if (!text || !riskyWords.length) return text;

  const regex = new RegExp(`(${riskyWords.join("|")})`, "gi");

  return text.split(regex).map((part, i) =>
    riskyWords.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
      <span
        key={i}
        className="bg-red-200 text-red-800 font-semibold px-1 rounded"
      >
        {part}
      </span>
    ) : (
      part
    )
  );
}

function getTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SmsChatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        "Hello! I'm SMS Guardian, your message security assistant. I'll help analyze your messages for potential risks.",
      time: getTime(),
    },
  ]);

  // auto scroll ref
  const chatEndRef = useRef(null);

  // auto scroll effect
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const riskyWords = containsPhishingWord(input);

    setMessages((prev) => [
      ...prev,
      {
        from: "user",
        text: input,
        riskyWords,
        time: getTime(),
      },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            riskyWords.length > 0
              ? "This message looks suspicious!! Please be cautious and avoid clicking any links or providing personal information."
              : "This message seems safe.",
          time: getTime(),
        },
      ]);
    }, 600);

    setInput("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">

      {/* Mobile frame */}
      <div className="relative w-[340px] h-[640px] rounded-[40px] bg-blue-300 p-[3px] shadow-2xl">
        <div className="w-full h-full bg-white rounded-[36px] flex flex-col overflow-hidden">

          {/* Notch */}
          <div className="h-6 flex justify-center mt-2">
            <div className="w-24 h-4 bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between border-b">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <div>
                <div className="font-semibold text-sm">SMS Guardian</div>
                <div className="text-xs text-gray-500">Protected conversation</div>
              </div>
            </div>
            <div className="text-gray-400 text-xl">⋯</div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
            {messages.map((msg, idx) => {
              if (msg.from === "user") {
                const isRisky = msg.riskyWords?.length > 0;

                return (
                  <div key={idx} className="flex justify-end">
                    <div className="relative max-w-[80%]">

                      {/* Animated border */}
                      <div
                        className={`absolute -inset-[2px] rounded-xl bg-gradient-to-r ${
                          isRisky
                            ? "from-red-500 via-red-300 to-red-500"
                            : "from-green-500 via-green-300 to-green-500"
                        } animate-borderSpin`}
                      />

                      <div className="relative bg-white rounded-xl px-4 py-2 text-sm text-right shadow">
                        {highlightText(msg.text, msg.riskyWords)}
                        <div className="text-[10px] text-gray-400 mt-1">{msg.time}</div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Bot message
              return (
                <div key={idx} className="flex justify-start">
                  <div className="max-w-[80%] bg-yellow-100 text-yellow-900 rounded-xl px-4 py-3 text-sm shadow">
                    {msg.text}
                    <div className="text-[10px] text-gray-500 mt-1">{msg.time}</div>
                  </div>
                </div>
              );
            })}

            {/* Auto scroll anchor */}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div className="px-4 py-3 border-t bg-blue-50 flex items-center gap-3">
            <textarea
              rows={1}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 resize-none rounded-full border px-4 py-2 text-sm"
            />
            <button
              onClick={handleSend}
              className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>

          <div className="text-center text-[10px] text-gray-400 pb-2">
            Press Enter to send · Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
}
