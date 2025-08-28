import { useState } from 'react'
import { type Restaurant, type MenuItem } from '../data/restaurants'
import { useAppState } from '../context/AppContext'
import {
  Star,
  MapPin,
  Phone,
  X,
  Plus,
  Minus,
} from 'lucide-react'

interface RestaurantsViewProps {
  restaurants: Restaurant[]
}

interface MenuItemRowProps {
  item: MenuItem
  onAddToCart: (item: MenuItem, quantity: number) => void
}

function MenuItemRow({ item, onAddToCart }: MenuItemRowProps) {
  const [quantity, setQuantity] = useState(1)

  const handleAdd = () => {
    onAddToCart(item, quantity)
    setQuantity(1) // Reset after adding
  }

  return (
    <div className="flex items-start justify-between py-3 px-4 hover:bg-gray-50 rounded">
      <div className="flex-1 mr-4">
        <div className="flex items-baseline justify-between mb-1">
          <h4 className="font-medium text-gray-900">{item.name}</h4>
          <span className="font-bold text-green-600 ml-2">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {item.category}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-1 hover:bg-gray-100"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="px-2 text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-1 hover:bg-gray-100"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  )
}

interface MenuModalProps {
  restaurant: Restaurant
  isOpen: boolean
  onClose: () => void
  onAddToCart: (item: MenuItem, quantity: number) => void
}

function MenuModal({ restaurant, isOpen, onClose, onAddToCart }: MenuModalProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-4 md:inset-x-auto md:inset-y-10 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-3xl md:max-h-[80vh] bg-white rounded-lg shadow-xl z-50 flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{restaurant.rating}</span>
                </div>
                <span className="text-green-600 font-bold">
                  {'$'.repeat(restaurant.priceLevel || 2)}
                </span>
                <span className="text-gray-600">{restaurant.menuItems.length} items</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Modal Body - Scrollable Menu */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-2">
            {restaurant.menuItems.map((item) => (
              <MenuItemRow
                key={item.id}
                item={item}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t bg-gray-50 rounded-b-lg">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <MapPin className="w-4 h-4 inline mr-1" />
              {restaurant.address}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const { addToCart } = useAppState()
  const [showMenu, setShowMenu] = useState(false)
  const priceLevel = '$'.repeat(restaurant.priceLevel || 2)

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    const cartItem = {
      id: `cart-${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      quantity: quantity,
      customizations: [],
    }

    addToCart(cartItem)
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900">{restaurant.name}</h3>
            <div className="flex items-center space-x-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{restaurant.rating}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-3">
            <span className="text-green-600 font-bold">{priceLevel}</span>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-600">
              {restaurant.menuItems.length} items
            </span>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {restaurant.description}
          </p>

          <div className="flex items-center text-xs text-gray-500 mb-3">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="line-clamp-1">{restaurant.address}</span>
          </div>

          {/* View Menu Button */}
          <button
            onClick={() => setShowMenu(true)}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            View Menu
          </button>
        </div>
      </div>

      {/* Menu Modal */}
      <MenuModal
        restaurant={restaurant}
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  )
}

export default function RestaurantsView({ restaurants }: RestaurantsViewProps) {
  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No restaurants found</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-gray-600">
          Found {restaurants.length} restaurant
          {restaurants.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  )
}
