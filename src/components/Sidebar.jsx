import React from "react"
import { Link } from "react-router-dom"
import { Plus, MessageSquare, Settings, BarChart3, ChevronLeft, ChevronRight, Trash2, Shield } from "lucide-react"

function Sidebar({
  conversations,
  selectedConversation,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  model,
  onModelChange,
  sidebarOpen,
  onToggleSidebar
}) {
  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={onToggleSidebar}
        className="lg:hidden fixed left-4 top-4 z-50 bg-emerald-600 hover:bg-emerald-600/90 p-2 rounded-lg text-white transition"
      >
        {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative lg:flex w-64 bg-chat-dark border-r border-gray-700 flex-col
          transition-transform duration-300 ease-in-out h-screen
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:translate-x-0 z-40
        `}
      >
        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          className="m-4 bg-emerald-600 hover:bg-emerald-600/90 text-white rounded-lg p-3 font-medium flex items-center justify-center gap-2 transition"
        >
          <Plus size={20} />
          New Chat
        </button>

        {/* Model Selector */}
        <div className="px-4 py-2">
          <label className="text-sm text-gray-400">Model</label>
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            className="w-full mt-1 bg-chat-bg border border-gray-600 rounded-lg p-2 text-sm text-gray-200 hover:border-emerald-500 transition cursor-pointer"
          >
            <option value="GPT OSS 120B">GPT OSS 120B</option>
            <option value="GPT OSS 20B">GPT OSS 20B</option>
            <option value="Llama 4 Scout">Llama 4 Scout</option>
            <option value="Qwen 3 32B">Qwen 3 32B</option>
          </select>
        </div>

        {/* Divider */}
        <div className="px-4 my-2">
          <div className="border-t border-gray-700"></div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider px-2 py-2 font-semibold">Conversations</p>
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => {
                onSelectConversation(conv.id)
                if (window.innerWidth < 1024) onToggleSidebar()
              }}
              className={`
                w-full text-left p-3 rounded-lg mb-2 transition truncate text-sm
                ${selectedConversation === conv.id
                  ? "bg-emerald-600/20 border border-emerald-500 text-emerald-200"
                  : "hover:bg-gray-700/50 text-gray-300 hover:text-gray-100"
                }
              `}
            >
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="flex-shrink-0" />
                <span className="truncate">{conv.title}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1 px-6">{conv.date}</div>
            </button>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-700 p-4 space-y-2">
          <Link
            to="/conversations"
            className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700/50 transition text-gray-300 hover:text-gray-100"
          >
            <MessageSquare size={18} />
            <span className="text-sm">Conversations</span>
          </Link>
          <Link
            to="/usage"
            className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700/50 transition text-gray-300 hover:text-gray-100"
          >
            <BarChart3 size={18} />
            <span className="text-sm">Usage</span>
          </Link>
          <Link
            to="/settings"
            className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700/50 transition text-gray-300 hover:text-gray-100"
          >
            <Settings size={18} />
            <span className="text-sm">Settings</span>
          </Link>
          <Link
            to="/datenschutz"
            className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700/50 transition text-gray-300 hover:text-gray-100"
          >
            <Shield size={18} />
            <span className="text-sm">Datenschutz</span>
          </Link>
          <Link
            to="/impressum"
            className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700/50 transition text-gray-300 hover:text-gray-100"
          >
            <Shield size={18} />
            <span className="text-sm">Impressum</span>
          </Link>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onToggleSidebar}
        ></div>
      )}
    </>
  )
}

export default Sidebar
