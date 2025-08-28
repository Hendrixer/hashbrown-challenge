import { useUiChat, exposeComponent } from '@hashbrownai/react'
import { s } from '@hashbrownai/core'
import { useState } from 'react'
import './App.css'
import Hello from './components/Hello'
import { useChatTools } from './tools'
import MapComponent from './components/Map/MapComponent'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [showMap, setShowMap] = useState(false)
  const tools = useChatTools()
  const chat = useUiChat({
    model: 'gpt-4.1',
    system: `You are a helpful food delivery assistant. When users ask about their order status, delivery tracking, or "where is my order", you should:
    1. Use the showOrderStatus tool to display the delivery map
    2. Or render the MapComponent to show their delivery route
    3. Provide helpful information about their order
    
    The map shows their food delivery route from the restaurant to their location. Be friendly and informative about delivery updates.`,
    tools,
    components: [
      exposeComponent(Hello, {
        name: 'Hello',
        description: 'This component renders a hello text',
        props: { data: s.string('md') },
      }),
      exposeComponent(MapComponent, {
        name: 'MapComponent',
        description: 'Show a map with delivery route when user asks about order status, delivery tracking, or where their order is',
        props: {},
      }),
    ],
  })

  const message = chat.lastAssistantMessage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      const query = inputValue.trim().toLowerCase()
      
      // Check if user is asking about order status
      const orderStatusKeywords = ['order status', 'where is my order', 'delivery', 'tracking', 'my order']
      const isOrderStatusQuery = orderStatusKeywords.some(keyword => query.includes(keyword))
      
      if (isOrderStatusQuery) {
        setShowMap(true)
      }
      
      chat.sendMessage({
        role: 'user',
        content: inputValue.trim(),
      })
      setInputValue('')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
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
            placeholder="Ask about your order status..."
          />
        </form>
        {message ? <div className="assistant">{message.ui}</div> : null}
        
        {/* Show MapComponent when user asks about order status */}
        {showMap && (
          <div className="mt-8 w-full">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">📍 Your Order Status</h2>
              <p className="text-blue-700">Your food is on the way! Here's your delivery route:</p>
            </div>
            <MapComponent />
            <button 
              onClick={() => setShowMap(false)}
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Hide Map
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
