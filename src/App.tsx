import { useUiChat, exposeComponent } from '@hashbrownai/react'
import { s } from '@hashbrownai/core'
import { useState } from 'react'
import './App.css'
import Hello from './components/Hello'
import { useChatTools } from './tools'
import MapComponent from './components/Map/MapComponent'
import Cart from './components/Cart'
import OrderHistory from './components/OrderHistory'

function App() {
  const [inputValue, setInputValue] = useState('')
  const tools = useChatTools()
  const chat = useUiChat({
    model: 'gpt-4.1',
    system: 'Be helpful and use your tools outputs to help the user.',
    tools,
    components: [
      exposeComponent(Hello, {
        name: 'Hello',
        description: 'This component renders a hello text',
        props: { data: s.string('md') },
      }),
    ],
  })

  const message = chat.lastAssistantMessage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      chat.sendMessage({
        role: 'user',
        content: inputValue.trim(),
      })
      setInputValue('')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative">
      <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
        <OrderHistory />
        <Cart />
      </div>
      <div className="w-full max-w-2xl px-4">
        <h1 className="text-6xl font-bold text-center mb-12 text-gray-800">
          Git 'n Grits
        </h1>
        {chat.isSending ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex space-x-2">
              <div
                className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              ></div>
              <div
                className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              ></div>
              <div
                className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              ></div>
            </div>
          </div>
        ) : null}
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full shadow-lg hover:shadow-xl focus:shadow-xl focus:outline-none focus:border-blue-500 transition-all duration-200"
            placeholder="Search..."
          />
        </form>
        {message ? <div className="assistant">{message.ui}</div> : null}
      </div>
    </div>
  )
}

export default App
