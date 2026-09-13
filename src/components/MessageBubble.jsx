import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Copy, ThumbsUp, ThumbsDown } from 'lucide-react'
import CodeBlock from './CodeBlock'

function MessageBubble({ message, model }) {
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-2xl ${isUser ? 'mr-4' : 'ml-4'}`}>
        {/* Message Bubble */}
        <div
          className={`
            chat-bubble rounded-2xl px-4 py-3 inline-block
            ${isUser
              ? 'bg-emerald text-white'
              : 'bg-chat-dark text-gray-100 border border-gray-700'
            }
          `}
        >
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-invert max-w-none text-sm">
              <ReactMarkdown
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '')
                    if (!inline && match) {
                      return (
                        <CodeBlock
                          language={match[1]}
                          code={String(children).replace(/\n$/, '')}
                        />
                      )
                    }
                    return (
                      <code
                        className={`${className} bg-chat-bg px-2 py-1 rounded text-emerald text-xs`}
                        {...props}
                      >
                        {children}
                      </code>
                    )
                  },
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                  li: ({ children }) => <li>{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-emerald hover:underline">
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-emerald pl-4 italic my-2">
                      {children}
                    </blockquote>
                  ),
                  h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-bold mb-2">{children}</h3>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Message Controls */}
        <div className={`flex items-center gap-2 mt-2 ${isUser ? 'justify-end' : 'justify-start'} text-xs text-gray-500`}>
          <span>{message.timestamp}</span>
          {!isUser && (
            <>
              <button
                onClick={handleCopy}
                className="text-gray-400 hover:text-emerald transition p-1.5 rounded hover:bg-gray-700/50"
                title="Copy message"
              >
                <Copy size={14} />
              </button>
              <div className="flex gap-1">
                <button
                  onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
                  className={`p-1.5 rounded transition ${
                    feedback === 'up'
                      ? 'text-emerald bg-emerald/20'
                      : 'text-gray-400 hover:text-emerald hover:bg-gray-700/50'
                  }`}
                  title="This is helpful"
                >
                  <ThumbsUp size={14} />
                </button>
                <button
                  onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
                  className={`p-1.5 rounded transition ${
                    feedback === 'down'
                      ? 'text-red-400 bg-red-400/20'
                      : 'text-gray-400 hover:text-red-400 hover:bg-gray-700/50'
                  }`}
                  title="This needs improvement"
                >
                  <ThumbsDown size={14} />
                </button>
              </div>
            </>
          )}
          {copied && <span className="text-emerald">Copied!</span>}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
