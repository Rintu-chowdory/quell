import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, Save, CheckCircle, ExternalLink } from 'lucide-react'

const GROQ_MODELS = [
  { label: 'Llama 3.3 70B', value: 'llama-3.3-70b-versatile', desc: 'Best quality, great for complex tasks' },
  { label: 'Llama 3.1 8B', value: 'llama-3.1-8b-instant', desc: 'Fastest, great for simple Q&A' },
  { label: 'Mixtral 8x7B', value: 'mixtral-8x7b-32768', desc: 'Long context (32K), good for documents' },
  { label: 'Gemma 2 9B', value: 'gemma2-9b-it', desc: 'Google model, efficient and capable' },
]

function Settings() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('Llama 3.3 70B')
  const [temperature, setTemperature] = useState(0.7)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const k = localStorage.getItem('chatforge_groq_key')
    if (k) setApiKey(k)
    const m = localStorage.getItem('chatforge_model')
    if (m) setModel(m)
    const t = localStorage.getItem('chatforge_temperature')
    if (t) setTemperature(parseFloat(t))
  }, [])

  const handleSave = () => {
    localStorage.setItem('chatforge_groq_key', apiKey)
    localStorage.setItem('chatforge_model', model)
    localStorage.setItem('chatforge_temperature', temperature)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex-1 h-screen flex flex-col bg-chat-bg">
      <div className="border-b border-gray-700 bg-chat-dark px-4 lg:px-8 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-emerald hover:text-emerald/80 transition mb-4">
          <ArrowLeft size={18} />
          Back to Chat
        </Link>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 max-w-2xl">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-1">Groq API Key</h2>
          <p className="text-sm text-gray-400 mb-4">Stored only in your browser. Never sent to any server except Groq directly.</p>
          <div className="bg-chat-dark border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="gsk_..."
                className="flex-1 bg-chat-bg border border-gray-600 rounded-lg px-4 py-2 text-gray-200 font-mono text-sm focus:outline-none focus:border-emerald transition"
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="text-gray-400 hover:text-gray-200 transition p-2 rounded hover:bg-gray-700"
              >
                {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <a
              href="https://console.groq.com/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-emerald hover:underline"
            >
              Get your API key from Groq Console <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Model</h2>
          <div className="bg-chat-dark border border-gray-700 rounded-lg p-6 space-y-3">
            {GROQ_MODELS.map((m) => (
              <label key={m.value} className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="model"
                  value={m.label}
                  checked={model === m.label}
                  onChange={() => setModel(m.label)}
                  className="mt-1 accent-emerald"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-100 group-hover:text-white transition">{m.label}</p>
                  <p className="text-xs text-gray-400">{m.value} · {m.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Temperature: {temperature}</h2>
          <div className="bg-chat-dark border border-gray-700 rounded-lg p-6">
            <input
              type="range" min="0" max="2" step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald"
            />
            <p className="text-xs text-gray-400 mt-2">0 = Focused & deterministic · 2 = Creative & varied</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-emerald hover:bg-emerald/90 text-white font-semibold px-6 py-3 rounded-lg transition mb-8"
        >
          {saved ? <CheckCircle size={18} /> : <Save size={18} />}
          {saved ? 'Saved!' : 'Save Settings'}
        </button>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
          <div className="bg-red-950/20 border border-red-900 rounded-lg p-6">
            <button
              onClick={() => { localStorage.removeItem('chatforge_groq_key'); setApiKey('') }}
              className="text-red-400 hover:text-red-300 transition font-semibold"
            >
              Remove API Key
            </button>
            <p className="text-xs text-gray-400 mt-2">Removes your stored Groq key from this browser.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
