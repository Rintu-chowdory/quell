import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, MessageSquare, Calendar, ArrowLeft } from 'lucide-react'

function Conversations({ conversations, onSelectConversation }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex-1 h-screen flex flex-col bg-chat-bg">
      {/* Header */}
      <div className="border-b border-gray-700 bg-chat-dark px-4 lg:px-8 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-emerald hover:text-emerald/80 transition mb-4"
        >
          <ArrowLeft size={18} />
          Back to Chat
        </Link>
        <h1 className="text-3xl font-bold text-white mb-4">Conversations</h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-chat-bg border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald transition"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageSquare size={48} className="text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-300 mb-2">No Conversations</h2>
            <p className="text-gray-500">
              {searchTerm ? 'No conversations match your search.' : 'Start a new conversation to begin.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConversations.map((conv) => (
              <Link
                key={conv.id}
                to="/"
                onClick={() => onSelectConversation?.(conv.id)}
                className="p-4 bg-chat-dark border border-gray-700 rounded-lg hover:border-emerald transition hover:shadow-lg hover:shadow-emerald/20"
              >
                <div className="flex items-start justify-between mb-2">
                  <MessageSquare size={20} className="text-emerald" />
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {conv.date}
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-2 line-clamp-2">
                  {conv.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {conv.messages.length} message{conv.messages.length !== 1 ? 's' : ''}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Conversations
