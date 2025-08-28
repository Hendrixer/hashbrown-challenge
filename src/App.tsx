import { useUiChat, exposeComponent } from '@hashbrownai/react'
import { s } from '@hashbrownai/core'
import { useState } from 'react'
import './App.css'
import MarkdownResponse from './components/MarkdownResponse'
import { useChatTools } from './tools'
import MapComponent from './components/Map/MapComponent'
import OrderDetails from './components/OrderDetails'
import Cart from './components/Cart'
import OrderHistory from './components/OrderHistory'
import { AppProvider } from './context/AppContext'

function App() {
  const [inputValue, setInputValue] = useState('')
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
      exposeComponent(MarkdownResponse, {
        children: 'any',
        name: 'MarkdowResponse',
        description:
          'This component is for rendering your response text if no other option to respond fits. Its markdown',
        props: {
          markdown: s.string(
            'the markdown text response you want to show the user'
          ),
        },
      }),
      exposeComponent(MapComponent, {
        name: 'MapComponent',
        description:
          'Show a map with delivery route when user asks about order status, delivery tracking, or where their order is',
        props: {
          pointA: s.object('starting point latitude and longitude', {
            lat: s.number('latitude of the destination location'),
            long: s.number('longitude of the destination location'),
          }),
          pointB: s.object('destination latitude and longitude', {
            lat: s.number('latitude of the destination location'),
            long: s.number('longitude of the destination location'),
          }),
        },
      }),
      exposeComponent(OrderDetails, {
        name: 'OrderDetails',
        description:
          'Display order status information with delivery time estimates. Use this when users ask about their order status or delivery timeline.',
        props: {
          pointA: s.object('starting point (restaurant) latitude and longitude', {
            lat: s.number('latitude of the restaurant location'),
            long: s.number('longitude of the restaurant location'),
          }),
          pointB: s.object('destination (delivery) latitude and longitude', {
            lat: s.number('latitude of the delivery location'),
            long: s.number('longitude of the delivery location'),
          }),
          status: s.string('Order status: preparing, in-progress, on-the-way, delivered, or cancelled'),
        },
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
            placeholder="Ask about your order status..."
          />
        </form>
        {message ? <div className="assistant">{message.ui}</div> : null}
      </div>
    </div>
  )
}

function AppWrapper() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  )
}

export default AppWrapper
