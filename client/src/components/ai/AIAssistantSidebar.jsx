import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, X, MessageSquare, Sparkles } from 'lucide-react'
import { aiService } from '../../services/resumeService'
import { staggerItem, fadeInUp } from '../../animations/variants'

export function AIAssistantSidebar({ context = {}, isOpen, onToggle }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: "Hi! I'm your AI Resume Coach. Ask me anything about improving your resume, understanding your match score, or optimizing for ATS systems.",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage = { id: Date.now(), role: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    try {
      const res = await aiService.chat(input, context)
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', text: res.message },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', text: 'Sorry, I encountered an error. Please try again.' },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-cyan-500 text-white shadow-lg flex items-center justify-center"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Bot className="w-6 h-6" />}
      </motion.button>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 320 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 320 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-30 w-80 bg-white border-l border-slate-100 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-primary-50 to-cyan-50">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">AI Resume Coach</h3>
                <p className="text-xs text-slate-500">Powered by AI</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-slate-400">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  variants={staggerItem}
                  initial="hidden"
                  animate="visible"
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary-600 text-white rounded-br-md'
                        : 'bg-slate-100 text-slate-700 rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1 items-center">
                    {[0, 0.15, 0.3].map((delay, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-slate-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, delay, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask anything..."
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
