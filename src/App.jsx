import React, { useState, useEffect } from "react"
// build-bust
import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Chat from "./chat-pages/Chat"
import Conversations from "./chat-pages/Conversations"
import Settings from "./chat-pages/Settings"
import UsageDashboard from "./chat-pages/UsageDashboard"
import Datenschutz from "./chat-pages/Datenschutz"
import Impressum from "./chat-pages/Impressum"

function App() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "React Component Design",
      date: "2024-06-20",
      messages: [
        { id: 1, role: "user", content: "How do I structure a React component?", timestamp: "2:30 PM" },
        { id: 2, role: "ai", content: "React components should be functional, reusable, and follow the single responsibility principle. Here are best practices:\n\n- Keep components small and focused\n- Use hooks for state management\n- Pass props for configuration\n- Memoize expensive computations\n\n```jsx\nconst MyComponent = ({ data, onUpdate }) => {\n  const [state, setState] = useState(null);\n  return <div>{state}</div>;\n};\n```", timestamp: "2:31 PM" },
      ]
    },
    {
      id: 2,
      title: "JavaScript Async/Await",
      date: "2024-06-19",
      messages: [
        { id: 1, role: "user", content: "Explain async/await patterns", timestamp: "1:15 PM" },
        { id: 2, role: "ai", content: "Async/await makes asynchronous code look synchronous and is easier to understand than promises.", timestamp: "1:16 PM" },
      ]
    },
    {
      id: 3,
      title: "CSS Grid Layout",
      date: "2024-06-18",
      messages: [
        { id: 1, role: "user", content: "What is CSS Grid?", timestamp: "10:45 AM" },
      ]
    },
    {
      id: 4,
      title: "API Design Patterns",
      date: "2024-06-17",
      messages: [
        { id: 1, role: "user", content: "Best practices for REST API design", timestamp: "3:20 PM" },
      ]
    }
  ])

  const [selectedConversation, setSelectedConversation] = useState(1)
  const [model, setModel] = useState("GPT OSS 120B")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const savedModel = localStorage.getItem("chatforge_model")
    const supportedModels = ["GPT OSS 120B", "GPT OSS 20B", "Llama 4 Scout", "Qwen 3 32B"]
    if (savedModel && supportedModels.includes(savedModel)) setModel(savedModel)
  }, [])

  const createNewConversation = () => {
    const newId = Math.max(...conversations.map(c => c.id), 0) + 1
    const newConversation = {
      id: newId,
      title: "New Conversation",
      date: new Date().toISOString().split("T")[0],
      messages: []
    }
    setConversations([newConversation, ...conversations])
    setSelectedConversation(newId)
  }

  const updateConversation = (updatedConversation) => {
    setConversations(conversations.map(c =>
      c.id === updatedConversation.id ? updatedConversation : c
    ))
  }

  const deleteConversation = (id) => {
    setConversations(conversations.filter(c => c.id !== id))
    if (selectedConversation === id && conversations.length > 0) {
      setSelectedConversation(conversations[0].id)
    }
  }

  const currentConversation = conversations.find(c => c.id === selectedConversation)

  return (
    <div className="flex h-screen bg-chat-bg text-gray-100">
      <Sidebar
        conversations={conversations}
        selectedConversation={selectedConversation}
        onSelectConversation={setSelectedConversation}
        onNewChat={createNewConversation}
        onDeleteConversation={deleteConversation}
        model={model}
        onModelChange={setModel}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Chat
              conversation={currentConversation}
              onUpdateConversation={updateConversation}
              model={model}
              sidebarOpen={sidebarOpen}
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />
          }
        />
        <Route path="/conversations" element={<Conversations conversations={conversations} onSelectConversation={setSelectedConversation} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/usage" element={<UsageDashboard />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/impressum" element={<Impressum />} />
      </Routes>
    </div>
  )
}

export default App
