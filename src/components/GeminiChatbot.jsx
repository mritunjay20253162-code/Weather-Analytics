import React, { useState, useEffect, useRef } from 'react'
import {
  Sparkles,
  Bot,
  User,
  Send,
  X,
  Trash2,
  ChevronDown,
  AlertCircle,
  CloudSunRain,
  ShieldCheck,
  Compass,
  RefreshCw
} from 'lucide-react'
import { sendMessageToGemini } from '../services/geminiService'

const QUICK_PROMPTS = [
  { icon: '🌧️', label: 'Rainfall & Flood Risks', prompt: 'What are the current severe rainfall and flood risk indicators in India?' },
  { icon: '⚠️', label: 'Severe Weather Safety', prompt: 'What safety precautions should I take during a severe thunderstorm and heavy rain?' },
  { icon: '🛰️', label: 'INSAT Telemetry Info', prompt: 'How does INSAT-3D satellite telemetry integrate with ground observation data?' },
  { icon: '📝', label: 'How to Submit Reports', prompt: 'How do I submit ground-truth weather observation reports on this platform?' }
]

export default function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('gemini_chat_history')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (err) {
        console.error('Failed to parse chat history:', err)
      }
    }
    return [
      {
        id: 'welcome-1',
        sender: 'ai',
        text: 'Hello! I am **Astra**, your AI Weather Assistant powered by Google Gemini. How can I help you with weather observations, INSAT satellite telemetry, or severe weather safety today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
  })

  const messagesEndRef = useRef(null)

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isLoading])

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem('gemini_chat_history', JSON.stringify(messages))
  }, [messages])

  const handleSend = async (textToSend = null) => {
    const text = textToSend || inputMessage
    if (!text || !text.trim() || isLoading) return

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInputMessage('')
    setIsLoading(true)

    try {
      const responseText = await sendMessageToGemini(messages, text.trim())
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages((prev) => [...prev, aiMsg])
    } catch (err) {
      console.error('Gemini error:', err)
      let errorText = 'Sorry, I encountered an issue connecting to Gemini AI.'

      if (err.message === 'API_KEY_MISSING') {
        errorText = '⚠️ **Gemini API Key Missing**: Please configure `VITE_GEMINI_API_KEY` in your project `.env` file.'
      } else if (err.message && err.message.includes('API key')) {
        errorText = '⚠️ **Invalid API Key**: Please check `VITE_GEMINI_API_KEY` in your `.env` file.'
      }

      const errorMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        isError: true,
        text: errorText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearHistory = () => {
    const initialWelcome = [
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: 'Chat history cleared. How can I assist you with weather telemetry and forecasts?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
    setMessages(initialWelcome)
    localStorage.removeItem('gemini_chat_history')
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-none">

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-xl shadow-sky-500/30 border border-sky-300/30 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group relative cursor-pointer"
        aria-label="Toggle Gemini Weather AI Assistant"
        title="Open Weather AI Assistant (Gemini)"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-200" />
        ) : (
          <>
            <Sparkles className="w-6 h-6 text-amber-300 group-hover:rotate-12 transition-transform duration-200" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-950 rounded-full animate-pulse" />
          </>
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="pointer-events-auto mb-3 w-[92vw] sm:w-[400px] h-[520px] max-h-[82vh] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">

          {/* Header */}
          <div className="px-4 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white tracking-tight">Astra AI</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    Gemini 2.5
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  National Weather Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Clear Chat History"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Minimize Assistant"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-semibold ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white'
                      : msg.isError
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-tr-xs shadow-md shadow-sky-500/10'
                      : msg.isError
                      ? 'bg-rose-500/10 border border-rose-500/30 text-rose-200 rounded-tl-xs'
                      : 'bg-slate-800/90 border border-slate-700/60 text-slate-100 rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-sky-100/80' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 animate-spin text-sky-400" />
                </div>
                <div className="p-3 rounded-2xl rounded-tl-xs bg-slate-800/90 border border-slate-700/60 text-xs text-slate-300 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-400" />
                  <span>Astra AI is analyzing weather telemetry...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions (Rendered when history is short) */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/80 shrink-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Suggested Topics:
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {QUICK_PROMPTS.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(qp.prompt)}
                    className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-[11px] text-slate-300 hover:text-white transition-colors text-left truncate flex items-center gap-1 cursor-pointer"
                  >
                    <span>{qp.icon}</span>
                    <span className="truncate">{qp.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask Astra AI about weather, radar, safety..."
              className="flex-1 px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 focus:border-sky-500 rounded-xl text-white placeholder-slate-400 outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 disabled:opacity-50 text-white flex items-center justify-center transition-all cursor-pointer shadow-md shadow-sky-500/20"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  )
}
