import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Calculator, Copy, Check, Coins, Type, Hash, Info } from 'lucide-react'

// Groq-Preise je 1M Tokens (USD) – Schätzwerte, Stand 2026.
// Preise können sich ändern – prüfe die aktuellen Preise auf console.groq.com.
const MODELLE = [
  { name: 'GPT OSS 120B', id: 'openai/gpt-oss-120b', inKosten: 0.15, outKosten: 0.75, kontext: '131k' },
  { name: 'GPT OSS 20B', id: 'openai/gpt-oss-20b', inKosten: 0.10, outKosten: 0.30, kontext: '131k' },
  { name: 'Llama 4 Scout', id: 'meta-llama/llama-4-scout-17b-16e-instruct', inKosten: 0.11, outKosten: 0.34, kontext: '131k' },
  { name: 'Qwen 3 32B', id: 'qwen/qwen3-32b', inKosten: 0.29, outKosten: 0.34, kontext: '131k' },
]

// Grobe Token-Schätzung: ~4 Zeichen pro Token (EN), deutsch etwas mehr.
function schaetzeTokens(text) {
  if (!text) return 0
  const chars = text.length
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const ausChars = Math.ceil(chars / 4)
  const ausWords = Math.ceil(words * 1.35)
  return Math.max(ausChars, ausWords, 1)
}

const fmt = (n) => n.toLocaleString('de-DE')
const usd = (n) => `$${n < 0.01 && n > 0 ? n.toFixed(4) : n.toFixed(2)}`

export default function TokenRechner() {
  const [text, setText] = useState('')
  const [outFaktor, setOutFaktor] = useState(1)
  const [kopiert, setKopiert] = useState(false)

  const stats = useMemo(() => {
    const inTokens = schaetzeTokens(text)
    const outTokens = inTokens * outFaktor
    const words = text.trim().split(/\s+/).filter(Boolean).length
    const minuten = Math.ceil((words || 0) / 130) // ~130 Wörter pro Minute
    return { inTokens, outTokens, words, chars: text.length, minuten }
  }, [text, outFaktor])

  const kopieren = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setKopiert(true)
      setTimeout(() => setKopiert(false), 2000)
    } catch { /* ignore */ }
  }

  return (
    <div className="flex-1 h-screen flex flex-col bg-chat-bg">
      <div className="border-b border-gray-700 bg-chat-dark px-4 lg:px-8 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-emerald hover:text-emerald/80 transition mb-4">
          <ArrowLeft size={18} /> Back to Chat
        </Link>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Calculator className="text-emerald" size={28} /> Token-Rechner
        </h1>
        <p className="text-gray-400 mt-2">Text einfügen – Tokens, Wörter und Kosten je Modell schätzen</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 max-w-4xl w-full mx-auto">
        {/* Stat tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Hash, label: 'Tokens (ca.)', value: fmt(stats.inTokens) },
            { icon: Type, label: 'Wörter', value: fmt(stats.words) },
            { icon: Coins, label: 'Zeichen', value: fmt(stats.chars) },
            { icon: Calculator, label: 'Lesezeit', value: text ? `~${stats.minuten} min` : '–' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-chat-dark border border-gray-700 rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wide">{label}</h3>
                <Icon className="text-emerald" size={18} />
              </div>
              <p className="text-2xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Text input */}
        <div className="bg-chat-dark border border-gray-700 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Dein Text</h2>
            <div className="flex gap-2">
              {text && (
                <button onClick={kopieren} className="flex items-center gap-1.5 text-sm text-emerald hover:text-emerald/80 transition">
                  {kopiert ? <Check size={14} /> : <Copy size={14} />} {kopiert ? 'Kopiert!' : 'Kopieren'}
                </button>
              )}
              {text && (
                <button onClick={() => setText('')} className="text-sm text-gray-400 hover:text-gray-200 transition">
                  Leeren
                </button>
              )}
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Füge hier deinen Text, Prompt oder deine Dokumente ein …"
            className="w-full bg-chat-bg border border-gray-600 rounded-lg p-4 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 transition resize-y"
          />
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-sm text-gray-400 flex-shrink-0">
              Erwartete Antwortlänge (× Eingabe): <span className="text-emerald font-semibold">{outFaktor}×</span>
            </label>
            <input
              type="range" min="0" max="5" step="0.5" value={outFaktor}
              onChange={(e) => setOutFaktor(parseFloat(e.target.value))}
              className="flex-1 accent-emerald"
            />
          </div>
        </div>

        {/* Cost table */}
        <div className="bg-chat-dark border border-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-1">Geschätzte Kosten pro Modell</h2>
          <p className="text-xs text-gray-500 mb-5">Einmal senden: {fmt(stats.inTokens)} Tokens rein · ~{fmt(Math.round(stats.outTokens))} Tokens raus</p>
          <div className="space-y-3">
            {MODELLE.map((m) => {
              const kosten = (stats.inTokens * m.inKosten + stats.outTokens * m.outKosten) / 1_000_000
              const maxKosten = Math.max(
                ...MODELLE.map((x) => (stats.inTokens * x.inKosten + stats.outTokens * x.outKosten) / 1_000_000),
                0.000001
              )
              const pct = Math.max(4, (kosten / maxKosten) * 100)
              return (
                <div key={m.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <p className="font-semibold text-white text-sm">{m.name}</p>
                      <p className="text-xs text-gray-500">
                        ${m.inKosten}/1M in · ${m.outKosten}/1M out
                      </p>
                    </div>
                    <p className="font-semibold text-emerald">{usd(kosten)}</p>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-emerald h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-5 flex gap-2 text-xs text-gray-400">
            <Info size={14} className="flex-shrink-0 mt-0.5" />
            <p>Schätzung über Zeichen/Wörter (ca. 4 Zeichen je Token). Echte Werte variieren je nach Modell und Sprache. Preise sind Beispielwerte – aktuelle Preise auf console.groq.com prüfen.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
