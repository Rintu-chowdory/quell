'use client'

import dynamic from 'next/dynamic'
import '../src/index.css'

const ChatforgeApp = dynamic(
  () =>
    import('../src/App.jsx').then(({ default: App }) => {
      return function ClientChatforge() {
        const { BrowserRouter } = require('react-router-dom')
        return (
          <BrowserRouter>
            <App />
          </BrowserRouter>
        )
      }
    }),
  { ssr: false },
)

export default function Page() {
  return <ChatforgeApp />
}
