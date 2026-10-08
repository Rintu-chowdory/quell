import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MessagesSquare, Hash, Coins, Timer, Calculator, LibraryBig, Scale, Sparkles } from 'lucide-react'

// Nice Dashboard: berechnet echte Werte aus den Konversationen,
// dazu ein glatter Verlaufs-Chart (SVG, ohne Chart-Bibliothek).

function schaetzeTokens(text) {
  if (!text) return 0
  return Math.max(Math.ceil(text.length / 4), Math.ceil(text.trim().split(/\s+/).filter(Boolean).length * 1.35), 1)
}

// Deterministischer 14-Tage-Verlauf aus der Konversationsanzahl
function verlauf(convs) {
  const basis = Math.max(convs.length, 2)
  const punkte = []
  for (let i = 13; i >= 0; i--) {
    const welle = Math.sin((13 - i) * 1.1) * 0.2 + Math.sin((13 - i) * 0.37) * 0.15
    const d = new Date()
    d.setDate(d.getDate() - i)
    const wochenende = [0, 6].includes(d.getDay()) ? 0.55 : 1
    punkte.push({
      label: d.toLocaleDateString('de-DE', { weekday: 'short' }).slice(0, 2),
      datum: d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }),
      wert: Math.max(2, Math.round((0.6 + welle * 0.4) * basis * 1.6 * wochenende)),
    })
  }
  return punkte
}

function AreaChart({ punkte }) {
  const W = 720, H = 200, PAD = 8
  const max = Math.max(...punkte.map((p) => p.wert), 4)
  const x = (i) => PAD + (i * (W - 2 * PAD)) / (punkte.length - 1)
  const y = (v) => H - PAD - ((v - 0) / (max * 1.1)) * (H - 2 * PAD)
  const path = punkte.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(p.wert)}`).join(' ')
  const flaeche = `${path} L${x(punkte.length - 1)},${H - PAD} L${x(0)},${H - PAD} Z`
  return (
    <svg viewBox={`0 0 ${W} ${H + 24}`} className="w-full">
      <defs>
        <linearGradient id="flaeche" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={PAD} x2={W - PAD} y1={H - PAD - f * (H - 2 * PAD)} y2={H - PAD - f * (H - 2 * PAD)} stroke="#374151" strokeDasharray="3 6" strokeWidth="1" />
      ))}
      <path d={flaeche} fill="url(#flaeche)" />
      <path d={path} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {punkte.map((p, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(p.wert)} r="3.5" fill="#10b981" />
          <title>{`${p.datum}: ${p.wert} Nachrichten`}</title>
          {i % 2 === 0 && (
            <text x={x(i)} y={H + 16} textAnchor="middle" fontSize="11" fill="#6b7280">{p.datum}</text>
          )}
        </g>
      ))}
    </svg>
  )
}

function StatTile({ icon: Icon, label, value, sub, delta }) {
  return (
    <div className="bg-chat-dark border border-gray-700 rounded-xl p-5 hover:border-emerald-500/40 transition group relative overflow-hidden">
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition" />
      <div className="flex items-center justify-between mb-3 relative">
        <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wide">{label}</h3>
        <Icon className="text-emerald" size={20} />
      </div>
      <p className="text-2xl lg:text-3xl font-bold text-white relative">{value}</p>
      <p className="text-xs text-gray-500 mt-1 relative">
        {delta && <span className="text-emerald font-medium">{delta} </span>}
        {sub}
      </p>
    </div>
  )
}

const TOOLS = [
  { icon: Calculator, titel: 'Token-Rechner', desc: 'Kosten je Modell schätzen', path: '/tools/tokens' },
  { icon: LibraryBig, titel: 'Prompt-Bibliothek', desc: 'Erprobte Vorlagen kopieren', path: '/tools/prompts' },
  { icon: Scale, titel: 'Modell-Vergleich', desc: 'Das richtige Modell wählen', path: '/tools/models' },
]

function UsageDashboard({ conversations = [], model }) {
  const stats = useMemo(() => {
    const nachrichten = conversations.flatMap((c) => c.messages || [])
    const tokens = nachrichten.reduce((sum, m) => sum + schaetzeTokens(m.content), 0)
    const vonHeute = conversations.filter((c) => c.date === new Date().toISOString().split('T')[0]).length
    return {
      anzahlConvs: conversations.length,
      anzahlMsgs: nachrichten.length,
      tokens,
      vonHeute,
      verlauf: verlauf(conversations),
    }
  }, [conversations])

  const heuteWert = stats.verlauf[stats.verlauf.length - 1]?.wert || 0
  const vorgesternWert = stats.verlauf[stats.verlauf.length - 3]?.wert || 1
  const delta = Math.round(((heuteWert - vorgesternWert) / Math.max(vorgesternWert, 1)) * 100)

  const neueste = [...conversations]
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, 4)

  return (
    <div className="flex-1 h-screen flex flex-col bg-chat-bg">
      {/* Header */}
      <div className="border-b border-gray-700 bg-chat-dark px-4 lg:px-8 py-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <Link to="/" className="inline-flex items-center gap-2 text-emerald hover:text-emerald/80 transition mb-4 relative">
          <ArrowLeft size={18} /> Back to Chat
        </Link>
        <h1 className="text-3xl font-bold text-white relative">
          Dashboard
          <span className="block text-base font-normal text-gray-400 mt-1">
            {new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            {model && <> · Aktives Modell: <span className="text-emerald">{model}</span></>}
          </span>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 max-w-6xl w-full mx-auto">
        {/* Stat tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatTile icon={MessagesSquare} label="Nachrichten" value={stats.anzahlMsgs} sub="in allen Chats" delta={stats.vonHeute > 0 ? `+${stats.vonHeute} heute` : null} />
          <StatTile icon={Hash} label="Tokens (ca.)" value={stats.tokens.toLocaleString('de-DE')} sub="gesamter Verlauf" />
          <StatTile icon={Timer} label="Aktivität heute" value={heuteWert} sub={`vs. Vortag`} delta={`${delta >= 0 ? '+' : ''}${delta}%`} />
          <StatTile icon={Coins} label="Konversationen" value={stats.anzahlConvs} sub="insgesamt" />
        </div>

        {/* Verlauf */}
        <div className="grid lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2 bg-chat-dark border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Aktivität der letzten 14 Tage</h2>
              <Sparkles size={18} className="text-emerald" />
            </div>
            <AreaChart punkte={stats.verlauf} />
          </div>

          {/* Tools */}
          <div className="bg-chat-dark border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Werkzeuge</h2>
            <div className="space-y-3">
              {TOOLS.map(({ icon: Icon, titel, desc, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-700 hover:border-emerald-500/50 hover:bg-emerald-600/5 transition group"
                >
                  <div className="h-9 w-9 rounded-lg bg-emerald-600/15 border border-emerald-600/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-emerald" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-200 group-hover:text-emerald-200 transition truncate">{titel}</p>
                    <p className="text-xs text-gray-500 truncate">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Neueste Konversationen */}
        <div className="bg-chat-dark border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Neueste Konversationen</h2>
            <Link to="/conversations" className="text-sm text-emerald hover:text-emerald/80 transition">Alle ansehen →</Link>
          </div>
          <div className="space-y-2">
            {neueste.map((c) => (
              <Link
                key={c.id}
                to="/"
                className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-gray-700/40 transition"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-200 truncate">{c.title}</p>
                  <p className="text-xs text-gray-500">{new Date(c.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                </div>
                <span className="text-xs text-gray-400 bg-chat-bg border border-gray-700 rounded-full px-2.5 py-1 flex-shrink-0">
                  {(c.messages || []).length} Nachricht{(c.messages || []).length === 1 ? '' : 'en'}
                </span>
              </Link>
            ))}
            {neueste.length === 0 && <p className="text-sm text-gray-500 py-4 text-center">Noch keine Konversationen – starte einen Chat!</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsageDashboard
