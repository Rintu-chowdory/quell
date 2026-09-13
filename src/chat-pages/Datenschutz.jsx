import { Shield, Mail, Brain, Lock, Zap, Users, FileText } from 'lucide-react'

const Datenschutz = () => {
  const sections = [
    {
      num: 1,
      title: 'Verantwortlicher',
      content: 'ChatForge ist verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten gemäß Datenschutz-Grundverordnung (DSGVO).'
    },
    {
      num: 2,
      title: 'Erhobene Daten',
      content: 'Wir erheben und verarbeiten folgende personenbezogenen Daten: Authentifizierungsdaten und Kontoinfos (Name, E-Mail), Gesprächsverläufe und Nachrichtinhalte, Google OAuth-Authentifizierungsdaten, Nutzungsstatistiken und Analytikdaten.'
    },
    {
      num: 3,
      title: 'Zweck der Verarbeitung',
      content: 'Ihre Daten werden verarbeitet zur: Bereitstellung von AI-Chat-Funktionen, Authentifizierung und Kontozugriff, Verbesserung der KI-Modelle und Dienste, Einhaltung gesetzlicher Anforderungen, Sicherheit und Betrugsprävention.'
    },
    {
      num: 4,
      title: 'Rechtsgrundlage',
      content: 'Die Verarbeitung basiert auf: Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), Erfüllung eines Vertrags (Art. 6 Abs. 1 lit. b DSGVO), berechtigten Interessen (Art. 6 Abs. 1 lit. f DSGVO).'
    },
    {
      num: 5,
      title: 'Datenspeicherung',
      content: 'Wir speichern Ihre Gesprächsverläufe und Kontoinfos solange Ihr Konto aktiv ist. Nach Kontolöschung werden Daten gemäß gesetzlichen Aufbewahrungsfristen und unseren Richtlinien gelöscht.'
    },
    {
      num: 6,
      title: 'Datenschutzrechte',
      content: 'Sie haben das Recht auf: Auskunft über Ihre Daten (Art. 15 DSGVO), Berichtigung falscher Daten (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenportabilität (Art. 20 DSGVO), Widerspruch gegen Verarbeitung (Art. 21 DSGVO).'
    },
    {
      num: 7,
      title: 'AI-Verarbeitung und Modellverbesserung',
      content: 'ChatForge nutzt KI-Modelle zur Erzeugung von Antworten. Ihre Gesprächsinhalte können zur Modellverbesserung und Qualitätskontrolle verarbeitet werden, jedoch ausschließlich unter Beachtung dieser Datenschutzrichtlinien und nach vorheriger Zustimmung.'
    },
    {
      num: 8,
      title: 'Google OAuth',
      content: 'Wir verwenden Google OAuth für sichere Authentifizierung. Google verarbeitet dabei Daten gemäß ihrer Datenschutzerklärung. Sie können Ihre Zustimmung jederzeit in Ihren Google-Kontoeinstellungen widerrufen.'
    },
    {
      num: 9,
      title: 'Weitergabe an Dritte',
      content: 'Ihre Daten werden nicht an Dritte weitergegeben, außer soweit rechtlich erforderlich oder mit Ihrer Zustimmung. Dienstleister verarbeiten Daten nur auf Grundlage von Auftragsverarbeitungsverträgen.'
    },
    {
      num: 10,
      title: 'Sicherheit',
      content: 'Wir implementieren technische und organisatorische Maßnahmen zum Schutz Ihrer Daten gegen Missbrauch, Verlust und unautorisierten Zugriff, einschließlich Verschlüsselung, sichere Authentifizierung und Zugriffskontrolle.'
    },
    {
      num: 11,
      title: 'Datenschutzbeauftragter',
      content: 'Bei Fragen zum Datenschutz kontaktieren Sie uns unter datenschutz@chatforge.ai oder nutzen Sie das Kontaktformular in den Einstellungen.'
    },
    {
      num: 12,
      title: 'Beschwerderecht',
      content: 'Sie haben das Recht, sich bei einer Datenschutzbehörde zu beschweren, wenn Sie denken, dass Ihre Rechte verletzt werden.'
    },
    {
      num: 13,
      title: 'Änderungen dieser Datenschutzerklärung',
      content: 'Wir behalten uns vor, diese Datenschutzerklärung zu aktualisieren. Änderungen werden auf dieser Seite veröffentlicht und treten mit ihrer Veröffentlichung in Kraft.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-emerald-400" />
            <h1 className="text-4xl font-bold text-white">Datenschutzerklärung</h1>
          </div>
          <p className="text-gray-400 text-lg">ChatForge - DSGVO Datenschutzerklärung</p>
          <p className="text-gray-500 text-sm mt-2">Zuletzt aktualisiert: Juni 2026</p>
        </div>

        {/* Introduction */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <p className="text-gray-300 leading-relaxed">
            Diese Datenschutzerklärung informiert Sie über die Verarbeitung Ihrer personenbezogenen Daten bei der Nutzung von ChatForge. Wir nehmen den Schutz Ihrer Daten ernst und verarbeiten diese nur im Rahmen der geltenden Datenschutzgesetze, insbesondere der Datenschutz-Grundverordnung (DSGVO).
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.num} className="border border-gray-700 rounded-lg overflow-hidden hover:border-emerald-500 transition">
              <div className="bg-gray-800 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-emerald-500/20 rounded-full p-3 h-fit">
                    <span className="text-emerald-400 font-bold text-lg">{section.num}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>
                    <p className="text-gray-300 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-8">
          <div className="flex items-start gap-3 mb-4">
            <Mail className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Fragen zum Datenschutz?</h3>
              <p className="text-gray-300 mb-4">Wenn Sie Fragen zu dieser Datenschutzerklärung oder Ihren Datenschutzrechten haben, kontaktieren Sie uns:</p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400"><span className="font-semibold text-gray-300">Email:</span> datenschutz@chatforge.ai</p>
                <p className="text-gray-400"><span className="font-semibold text-gray-300">Webseite:</span> www.chatforge.ai</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-700 pt-8">
          <p>© 2026 ChatForge. Alle Rechte vorbehalten. | Diese Datenschutzerklärung unterliegt der DSGVO (Datenschutz-Grundverordnung)</p>
        </div>
      </div>
    </div>
  )
}

export default Datenschutz
