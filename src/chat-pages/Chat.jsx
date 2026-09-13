import React, { useState, useRef, useEffect } from 'react'
import { Send, Menu, Settings, AlertCircle } from 'lucide-react'
import MessageBubble from '../components/MessageBubble'
import SettingsPanel from '../components/SettingsPanel'

const GROQ_MODELS = {
  'GPT OSS 120B': 'openai/gpt-oss-120b',
  'GPT OSS 20B': 'openai/gpt-oss-20b',
  'Llama 4 Scout': 'meta-llama/llama-4-scout-17b-16e-instruct',
  'Qwen 3 32B': 'qwen/qwen3-32b',
}

const DEFAULT_GROQ_MODEL = 'openai/gpt-oss-120b'

function Chat({ conversation, onUpdateConversation, model, sidebarOpen, onToggleSidebar }) {
  const [messages, setMessages] = useState(conversation?.messages || [])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [error, setError] = useState(null)
  const [settings, setSettings] = useState({ temperature: 0.7, maxTokens: 2048 })
  const messagesEndRef = useRef(null)

  useEffect(() => { setMessages(conversation?.messages || []) }, [conversation?.id, conversation?.messages])
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, isTyping])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const apiKey = localStorage.getItem('chatforge_groq_key')
    if (!apiKey) {
      setError('No Groq API key found. Go to Settings and add your key.')
      return
    }

    setError(null)
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsTyping(true)

    try {
      const groqModel = GROQ_MODELS[model] || DEFAULT_GROQ_MODEL
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: groqModel,
          messages: newMessages.map(m => ({ role: m.role === 'ai' ? 'assistant' : m.role, content: m.content })),
          temperature: settings.temperature,
          max_tokens: settings.maxTokens,
        })
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error?.message || 'Groq API request failed')
      }

      const data = await response.json()
      const aiContent = data.choices[0]?.message?.content || 'No response'
      const aiMessage = {
        id: Date.now() + 1,
        role: 'ai',
        content: aiContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tokens: data.usage?.total_tokens
      }
      const finalMessages = [...newMessages, aiMessage]
      setMessages(finalMessages)
      if (conversation) {
        onUpdateConversation({ ...conversation, messages: finalMessages, title: userMessage.content.substring(0, 50) })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-chat-bg">
      <div className="border-b border-gray-700 bg-chat-dark px-4 lg:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onToggleSidebar} className="lg:hidden text-gray-400 hover:text-gray-200 transition">
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-white">{conversation?.title || 'New Conversation'}</h1>
            <p className="text-xs text-gray-500">{GROQ_MODELS[model] || model} · Groq</p>
          </div>
        </div>
        <button onClick={() => setShowSettings(!showSettings)} className="text-gray-400 hover:text-emerald transition p-2 rounded-lg hover:bg-gray-700/50">
          <Settings size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-emerald/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">⚡</span>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">ChatForge</h2>
            <p className="text-gray-400 max-w-md mb-2">Powered by Groq — blazing fast inference.</p>
            <p className="text-gray-500 text-sm mb-4">Add your Groq API key in Settings to start chatting.</p>
            <a href="/settings" className="text-emerald hover:underline text-sm">Go to Settings</a>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} model={model} />
            ))}
            {isTyping && (
              <div className="flex gap-2 items-center px-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-emerald rounded-full animate-bounce" style={{animationDelay:'0ms'}}></div>
                  <div className="w-2 h-2 bg-emerald rounded-full animate-bounce" style={{animationDelay:'150ms'}}></div>
                  <div className="w-2 h-2 bg-emerald rounded-full animate-bounce" style={{animationDelay:'300ms'}}></div>
                </div>
                <span className="text-xs text-gray-500">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {error && (
        <div className="mx-4 mb-2 p-3 bg-red-950/50 border border-red-800 rounded-lg flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="border-t border-gray-700 bg-chat-dark px-4 lg:px-8 py-4">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-chat-bg border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-emerald hover:bg-emerald/90 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg px-4 py-3 transition flex items-center justify-center"
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">Calls Groq API directly · Ultra-fast inference ⚡</p>
      </div>

      {showSettings && (
        <SettingsPanel settings={settings} onSettingsChange={setSettings} onClose={() => setShowSettings(false)} />
      )}
    </div>
  )
}

export default Chat
