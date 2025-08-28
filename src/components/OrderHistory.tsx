import { useState } from 'react'
import { FaHistory } from 'react-icons/fa'
import { useAppState } from '../context/AppContext'
import { type Order } from '../utils/localStorage'

export default function OrderHistory() {
  const [isOpen, setIsOpen] = useState(false)
  const { orders, addToCart } = useAppState()

  const handleReorder = (order: Order) => {
    if (order.cartItems) {
      order.cartItems.forEach((item) => {
        addToCart({ ...item })
      })
    }
    setIsOpen(false)
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50'
      case 'cancelled':
        return 'text-red-600 bg-red-50'
      case 'in-progress':
        return 'text-blue-600 bg-blue-50'
      case 'preparing':
        return 'text-yellow-600 bg-yellow-50'
    }
  }

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'Delivered'
      case 'cancelled':
        return 'Cancelled'
      case 'in-progress':
        return 'In Progress'
      case 'preparing':
        return 'Preparing'
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <FaHistory className="text-2xl text-gray-700" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Order History</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {orders.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No orders yet</div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">{order.restaurant}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      {order.items.join(', ')}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">{order.id}</p>
                      <p className="font-semibold">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {order.status === 'delivered' && (
                    <button
                      onClick={() => handleReorder(order)}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      Reorder
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          {orders.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700">
                View All Orders
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
