import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Loader2,
  MessageSquare,
  Plus,
} from "lucide-react";
import { getChatbotAnswer } from "../../services/chatbotService";
import bgImage from "../../assets/screens/1.jpg";
import ScrollToTop from "../Common/ScrollToTop.jsx";

export default function Chatbot() {
  const initialMessage = {
    role: "bot",
    content: "Hello! I'm your cybersecurity assistant. How can I help you today?",
    timestamp: new Date(),
  };

  /* ================= Load Chats ================= */
  const [chatSessions, setChatSessions] = useState(() => {
    const saved = localStorage.getItem("chat_sessions");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeChatId, setActiveChatId] = useState(() => {
    return localStorage.getItem("active_chat_id");
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  /* ================= Active Chat ================= */
  const activeChat = chatSessions.find(
    (chat) => chat.id === activeChatId
  );

  const messages = activeChat?.messages || [];

  /* ================= Auto Scroll ================= */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= Save ================= */
  useEffect(() => {
    localStorage.setItem("chat_sessions", JSON.stringify(chatSessions));
    localStorage.setItem("active_chat_id", activeChatId || "");
  }, [chatSessions, activeChatId]);

  /* ================= New Chat ================= */
  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [initialMessage],
      createdAt: new Date(),
    };

    setChatSessions((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  /* ================= Send ================= */
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading || !activeChat) return;

    const userMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setInput("");
    setLoading(true);

    updateChatMessages([...messages, userMessage]);

    try {
      const response = await getChatbotAnswer(userMessage.content);

      const botMessage = {
        role: "bot",
        content:
          response.data?.answer ||
          response.data?.message ||
          "I couldn't process your request.",
        timestamp: new Date(),
      };

      updateChatMessages([...messages, userMessage, botMessage], true);
    } catch (err) {
      updateChatMessages(
        [
          ...messages,
          userMessage,
          {
            role: "bot",
            content: "Something went wrong. Please try again.",
            timestamp: new Date(),
            isError: true,
          },
        ],
        true
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= Update Chat ================= */
  const updateChatMessages = (newMessages, updateTitle = false) => {
    setChatSessions((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: newMessages,
              title:
                updateTitle && chat.title === "New Chat"
                  ? newMessages.find((m) => m.role === "user")?.content.slice(0, 20) + "..."
                  : chat.title,
            }
          : chat
      )
    );
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  /* ================= Auto Create First Chat ================= */
  useEffect(() => {
    if (chatSessions.length === 0) {
      handleNewChat();
    }
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative flex"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* ================= Sidebar ================= */}
      <div className="relative z-10 w-72 bg-black/60 border-r border-white/10 p-4 hidden md:flex flex-col">
        <button
          onClick={handleNewChat}
          className="flex items-center gap-2 mb-4 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold"
        >
          <Plus size={18} /> New Chat
        </button>

        <div className="flex-1 overflow-y-auto space-y-2">
          {chatSessions.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm truncate ${
                chat.id === activeChatId
                  ? "bg-cyan-500/20 text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              {chat.title}
            </button>
          ))}
        </div>
      </div>

      {/* ================= Chat ================= */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl h-[90vh] bg-white/10 backdrop-blur-xl rounded-3xl flex flex-col border border-white/20">
          {/* Header */}
          <div className="p-6 border-b border-white/20 flex items-center gap-3">
            <Bot className="text-cyan-400" />
            <h1 className="text-xl font-bold text-white">
              Cybersecurity Assistant
            </h1>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "bot" && <Bot className="text-cyan-400" />}
                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-cyan-500 text-white"
                      : msg.isError
                      ? "bg-red-500/20 text-red-200"
                      : "bg-gray-800 text-gray-100"
                  }`}
                >
                  {msg.content}
                  <div className="text-xs opacity-60 mt-1">
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
                {msg.role === "user" && <User className="text-white" />}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 text-cyan-400">
                <Loader2 className="animate-spin" />
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-6 border-t border-white/20">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded-xl bg-gray-800 px-4 py-3 text-white"
                placeholder="Ask me about cybersecurity..."
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-cyan-500 text-white"
              >
                <Send />
              </button>
            </div>
          </form>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
}
