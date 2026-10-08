import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, LibraryBig, Search, Copy, Check } from 'lucide-react'

// Prompt-Bibliothek: kuratierte Vorlagen, direkt kopierbar.

const PROMPTS = [
  // Schreiben
  {
    kategorie: 'Schreiben',
    titel: 'Text verbessern & kürzen',
    prompt: 'Verbessere den folgenden Text: klare Sprache, kürzere Sätze, keine Füllwörter. Behalte Bedeutung und Ton bei. Gib danach eine kurze Liste der größten Änderungen.\n\nText: [TEXT]',
  },
  {
    kategorie: 'Schreiben',
    titel: 'E-Mail schreiben',
    prompt: 'Schreibe eine professionelle E-Mail.\n\nAn: [EMPFÄNGER]\nZiel: [WAS SOLL ERREICHT WERDEN]\nTon: [förmlich / freundlich / dringend]\nKontext: [HINTERGRUND]\n\nBitte 2 Varianten: kurz und ausführlich.',
  },
  {
    kategorie: 'Schreiben',
    titel: 'Zusammenfassen',
    prompt: 'Fasse den folgenden Text zusammen. Struktur:\n1. Kernbotschaft in einem Satz\n2. Die 3 wichtigsten Punkte\n3. Offene Fragen / fehlende Infos\n\nText: [TEXT]',
  },
  // Lernen
  {
    kategorie: 'Lernen',
    titel: 'ELI5 + Fachniveau',
    prompt: 'Erkläre [THEMA] in drei Stufen:\n1. Wie für ein 5-jähriges Kind\n2. Für Einsteiger mit Beispielen\n3. Für Fortgeschrittene mit Fachbegriffen\n\nEnde mit 3 Verständnisfragen.',
  },
  {
    kategorie: 'Lernen',
    titel: 'Lernplan erstellen',
    prompt: 'Erstelle einen Lernplan für [THEMA].\n\nZeit: [X STUNDEN PRO WOCHE]\nDauer: [X WOCHEN]\nNiveau: [ANFÄNGER / FORTGESCHRITTEN]\n\nAls Wochenplan mit konkreten Aufgaben, Ressourcen-Typen und Wochentests (Selbstcheck).',
  },
  {
    kategorie: 'Lernen',
    titel: 'Aktives Abfragen (Feynman)',
    prompt: 'Ich erkläre dir jetzt [THEMA] mit meinen Worten. Prüfe meine Erklärung auf Fehler und Lücken, stelle mir 5 Rückfragen und bewerte mein Verständnis von 1–10.\n\nMeine Erklärung: [MEINE ERKLÄRUNG]',
  },
  // Coding
  {
    kategorie: 'Coding',
    titel: 'Code reviewen',
    prompt: 'Reviewe den folgenden Code. Prüfe: Bugs, Sicherheitsprobleme, Performance, Lesbarkeit. Gib Verbesserungen als nummerierte Liste mit Code-Beispielen. Kein Rewrite des ganzen Codes.\n\n```[SPRACHE]\n[CODE]\n```',
  },
  {
    kategorie: 'Coding',
    titel: 'Bug debuggen',
    prompt: 'Ich habe einen Bug. Gib mir eine systematische Debug-Anleitung mit Hypothesen (wahrscheinlichste zuerst) und wie ich jede prüfe.\n\nErwartet: [WAS SOLLTE PASSIEREN]\nPassiert: [WAS PASSIERT STATTDRESSEN]\nFehlermeldung: [FEHLER]\nCode: [RELEVANTER CODE]',
  },
  {
    kategorie: 'Coding',
    titel: 'Funktion mit Tests schreiben',
    prompt: 'Schreibe eine Funktion in [SPRACHE]: [BESCHREIBUNG].\n\nAnforderungen:\n- Klare Namen, kleine Helferfunktionen\n- Kommentare nur wo nötig\n- Danach 5 Testfälle (auch Grenzfälle)\n\nErkläre kurz deine Entscheidungen.',
  },
  // Produktivität
  {
    kategorie: 'Produktivität',
    titel: 'Meeting-Notizen strukturieren',
    prompt: 'Strukturiere meine rohen Meeting-Notizen in:\n1. Zusammenfassung (3 Sätze)\n2. Entscheidungen\n3. Aufgaben (mit Verantwortlichem, falls in Notizen)\n4. Offene Punkte\n\nNotizen: [NOTIZEN]',
  },
  {
    kategorie: 'Produktivität',
    titel: 'Priorisieren (Eisenhower)',
    prompt: 'Sortiere meine Aufgabenliste nach der Eisenhower-Matrix (wichtig/dringend). Gib pro Aufgabe: Quadrant, kurze Begründung, nächsten konkreten Schritt.\n\nAufgaben: [LISTE]',
  },
  {
    kategorie: 'Produktivität',
    titel: 'Vorbereitung auf schwieriges Gespräch',
    prompt: 'Ich habe ein schwieriges Gespräch mit [PERSON] über [THEMA].\n\nMeine Ziele: [ZIELE]\nMeine Sorgen: [SORGEN]\n\nErstelle: Gesprächsleitfaden mit Einstieg, 3 Kernbotschaften, Einwänden mit Antworten, und einem Exit-Plan wenn es eskaliert.',
  },
]

const KATEGORIEN = ['Alle', ...new Set(PROMPTS.map((p) => p.kategorie))]

export default function PromptBibliothek() {
  const [suche, setSuche] = useState('')
  const [kategorie, setKategorie] = useState('Alle')
  const [kopiert, setKopiert] = useState(null)

  const gefiltert = useMemo(
    () =>
      PROMPTS.filter(
        (p) =>
          (kategorie === 'Alle' || p.kategorie === kategorie) &&
          (suche.trim() === '' ||
            (p.titel + ' ' + p.prompt).toLowerCase().includes(suche.toLowerCase()))
      ),
    [suche, kategorie]
  )

  const kopieren = async (p) => {
    try {
      await navigator.clipboard.writeText(p.prompt)
      setKopiert(p.titel)
      setTimeout(() => setKopiert(null), 2000)
    } catch { /* ignore */ }
  }

  return (
    <div className="flex-1 h-screen flex flex-col bg-chat-bg">
      <div className="border-b border-gray-700 bg-chat-dark px-4 lg:px-8 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-emerald hover:text-emerald/80 transition mb-4">
          <ArrowLeft size={18} /> Back to Chat
        </Link>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <LibraryBig className="text-emerald" size={28} /> Prompt-Bibliothek
        </h1>
        <p className="text-gray-400 mt-2">Erprobte Prompt-Vorlagen – kopieren, anpassen, im Chat nutzen</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 max-w-4xl w-full mx-auto">
        {/* Suche + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={suche}
              onChange={(e) => setSuche(e.target.value)}
              placeholder="Prompts durchsuchen …"
              className="w-full bg-chat-dark border border-gray-600 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {KATEGORIEN.map((k) => (
              <button
                key={k}
                onClick={() => setKategorie(k)}
                className={`px-3.5 py-2 rounded-lg text-sm transition ${
                  kategorie === k
                    ? 'bg-emerald-600 text-white font-medium'
                    : 'bg-chat-dark border border-gray-600 text-gray-300 hover:border-emerald-500'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {gefiltert.map((p) => (
            <div key={p.titel} className="bg-chat-dark border border-gray-700 rounded-lg p-5 flex flex-col hover:border-emerald-500/50 transition group">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="inline-block text-xs text-emerald bg-emerald-600/15 border border-emerald-600/30 rounded-full px-2.5 py-0.5 mb-2">
                    {p.kategorie}
                  </span>
                  <h3 className="font-semibold text-white">{p.titel}</h3>
                </div>
              </div>
              <pre className="text-xs text-gray-400 whitespace-pre-wrap bg-chat-bg rounded-lg p-3 border border-gray-700/60 mb-4 flex-1 overflow-y-auto max-h-44">{p.prompt}</pre>
              <button
                onClick={() => kopieren(p)}
                className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-600/90 text-white rounded-lg py-2 text-sm font-medium transition"
              >
                {kopiert === p.titel ? <Check size={15} /> : <Copy size={15} />}
                {kopiert === p.titel ? 'Kopiert!' : 'Prompt kopieren'}
              </button>
            </div>
          ))}
        </div>

        {gefiltert.length === 0 && (
          <p className="text-center text-gray-500 py-12">Keine Prompts gefunden – anderer Suchbegriff?</p>
        )}
      </div>
    </div>
  )
}
