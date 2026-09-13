import React from 'react'
import { X } from 'lucide-react'

function SettingsPanel({ settings, onSettingsChange, onClose }) {
  const handleTemperatureChange = (e) => {
    onSettingsChange({
      ...settings,
      temperature: parseFloat(e.target.value)
    })
  }

  const handleMaxTokensChange = (e) => {
    onSettingsChange({
      ...settings,
      maxTokens: parseInt(e.target.value)
    })
  }

  return (
    <div className="absolute right-0 top-0 h-screen w-96 bg-chat-dark border-l border-gray-700 shadow-lg flex flex-col z-50">
      {/* Header */}
      <div className="border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Model Settings</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-200 transition p-1"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {/* Temperature */}
        <div>
          <label className="block text-sm font-semibold text-gray-100 mb-2">
            Temperature
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.temperature}
            onChange={handleTemperatureChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>More Focused</span>
            <span className="text-emerald font-semibold">{settings.temperature.toFixed(1)}</span>
            <span>More Creative</span>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Higher values make the output more random and creative. Lower values make it more focused and deterministic.
          </p>
        </div>

        {/* Max Tokens */}
        <div>
          <label className="block text-sm font-semibold text-gray-100 mb-2">
            Max Tokens
          </label>
          <input
            type="range"
            min="100"
            max="4000"
            step="100"
            value={settings.maxTokens}
            onChange={handleMaxTokensChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Brief</span>
            <span className="text-emerald font-semibold">{settings.maxTokens}</span>
            <span>Detailed</span>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Controls the maximum length of the response. More tokens allow for longer and more detailed responses.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700"></div>

        {/* Info */}
        <div className="bg-emerald/10 border border-emerald/30 rounded-lg p-3">
          <p className="text-xs text-emerald">
            These settings apply to your current conversation. Changes will affect future messages in this chat.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
