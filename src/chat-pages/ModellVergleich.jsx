import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Scale, Zap, Check, X } from 'lucide-react'

// Modell-Vergleich: die 4 unterstützten Groq-Modelle im direkten Vergleich.
// Werte sind Orientierungswerte – Specs auf console.groq.com prüfen.

const MODELLE = [
  {
    name: 'GPT OSS 120B',
    id: 'openai/gpt-oss-120b',
    groesse: '120B Parameter (MXFP4)',
    speed: 'Sehr schnell (~300+ tok/s)',
    staerken: ['Beste Qualität im Vergleich', 'Gut bei Reasoning & Analyse', 'Multilingual stark'],
    schwaechen: ['Teurer bei Massennutzung', 'Für einfache Aufgaben overkill'],
    perfekt: 'Komplexe Aufgaben: Code-Reviews, Analysen, lange Dokumente, schwieriges Reasoning.',
  },
  {
    name: 'GPT OSS 20B',
    id: 'openai/gpt-oss-20b',
    groesse: '20B Parameter (MXFP4)',
    speed: 'Extrem schnell',
    staerken: ['Sehr günstig', 'Schnellste Antworten', 'Gut für kurze Tasks'],
    schwaechen: ['Weniger tiefgründig', 'Bei komplexen Aufgaben schwächer'],
    perfekt: 'Alltagsfragen, Zusammenfassungen, schnelle Iteration, hohe Volumen.',
  },
  {
    name: 'Llama 4 Scout',
    id: 'meta-llama/llama-4-scout-17b-16e-instruct',
    groesse: '109B gesamt (17B aktiv, MoE)',
    speed: 'Sehr schnell (MoE-Architektur)',
    staerken: ['Effizient durch Mixture-of-Experts', 'Gutes Preis-Leistungs-Verhältnis', 'Starke Generalleistung'],
    schwaechen: ['Spezialisiert weniger stark als 120B', 'Weniger verbreitet in Tutorials'],
    perfekt: 'Ausgewogener Standard: gut für die meisten Chats, ohne 120B-Kosten.',
  },
  {
    name: 'Qwen 3 32B',
    id: 'qwen/qwen3-32b',
    groesse: '32B Parameter',
    speed: 'Schnell',
    staerken: ['Sehr stark in Chinesisch & mehrsprachig', 'Gut bei Mathematik & Coding', 'Denk-Modus (Reasoning) optional'],
    schwaechen: ['Etwas teurer bei Input', 'Antworten teils ausführlicher nötig'],
    perfekt: 'Mehrsprachige Projekte, Mathe/Logik, Coding-Hilfe mit Reasoning.',
  },
]

export default function ModellVergleich() {
  const [a, setA] = useState('GPT OSS 120B')
  const [b, setB] = useState('GPT OSS 20B')
  const modA = MODELLE.find((m) => m.name === a)
  const modB = MODELLE.find((m) => m.name === b)

  return (
    <div className="flex-1 h-screen flex flex-col bg-chat-bg">
      <div className="border-b border-gray-700 bg-chat-dark px-4 lg:px-8 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-emerald hover:text-emerald/80 transition mb-4">
          <ArrowLeft size={18} /> Back to Chat
        </Link>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Scale className="text-emerald" size={28} /> Modell-Vergleich
        </h1>
        <p className="text-gray-400 mt-2">Welches Modell passt zu welcher Aufgabe?</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 max-w-5xl w-full mx-auto">
        {/* All models table */}
        <div className="bg-chat-dark border border-gray-700 rounded-lg p-6 mb-8 overflow-x-auto">
          <h2 className="text-lg font-semibold text-white mb-5">Überblick</h2>
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3 pr-4 font-semibold">Modell</th>
                <th className="pb-3 pr-4 font-semibold">Größe</th>
                <th className="pb-3 pr-4 font-semibold">Tempo</th>
                <th className="pb-3 font-semibold">Perfekt für</th>
              </tr>
            </thead>
            <tbody>
              {MODELLE.map((m) => (
                <tr key={m.id} className="border-b border-gray-700/50 last:border-0">
                  <td className="py-3 pr-4 font-semibold text-white">{m.name}</td>
                  <td className="py-3 pr-4 text-gray-300">{m.groesse}</td>
                  <td className="py-3 pr-4 text-gray-300">{m.speed}</td>
                  <td className="py-3 text-gray-400">{m.perfekt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Head-to-head */}
        <div className="bg-chat-dark border border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <Zap className="text-emerald" size={18} /> Direktvergleich
          </h2>
          <p className="text-xs text-gray-500 mb-5">Wähle zwei Modelle</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <select value={a} onChange={(e) => setA(e.target.value)} className="bg-chat-bg border border-gray-600 rounded-lg p-2.5 text-sm text-gray-200 focus:outline-none focus:border-emerald-500 transition">
              {MODELLE.map((m) => <option key={m.id} value={m.name}>{m.name}</option>)}
            </select>
            <select value={b} onChange={(e) => setB(e.target.value)} className="bg-chat-bg border border-gray-600 rounded-lg p-2.5 text-sm text-gray-200 focus:outline-none focus:border-emerald-500 transition">
              {MODELLE.map((m) => <option key={m.id} value={m.name}>{m.name}</option>)}
            </select>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[modA, modB].map((m, i) => (
              <div key={m.id} className="border border-gray-700 rounded-lg p-5 bg-chat-bg">
                <h3 className="font-bold text-white mb-1">{m.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{m.groesse} · {m.speed}</p>
                <p className="text-xs font-semibold text-emerald uppercase tracking-wide mb-2">Stärken</p>
                <ul className="mb-4 space-y-1.5">
                  {m.staerken.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check size={14} className="text-emerald flex-shrink-0 mt-0.5" /> {s}
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Schwächen</p>
                <ul className="mb-4 space-y-1.5">
                  {m.schwaechen.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-gray-400">
                      <X size={14} className="text-gray-500 flex-shrink-0 mt-0.5" /> {s}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-300 bg-emerald-600/10 border border-emerald-600/25 rounded-lg p-3">{m.perfekt}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Werte sind Orientierungsangaben und können sich ändern. Verbindliche Specs & Preise: console.groq.com/docs.
        </p>
      </div>
    </div>
  )
}
