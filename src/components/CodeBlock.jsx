import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  let highlightedCode = code
  try {
    if (language) {
      highlightedCode = hljs.highlight(code, { language, ignoreIllegals: true }).value
    } else {
      highlightedCode = hljs.highlightAuto(code).value
    }
  } catch (error) {
    highlightedCode = code
  }

  return (
    <div className="bg-chat-bg rounded-lg overflow-hidden my-3 border border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <span className="text-xs text-gray-400 font-semibold uppercase">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-emerald transition p-1 rounded hover:bg-gray-700"
          title="Copy code"
        >
          <Copy size={14} />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code
          className={`hljs language-${language || 'plaintext'} text-sm`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  )
}

export default CodeBlock
