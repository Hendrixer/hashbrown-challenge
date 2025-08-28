import { useState } from 'react'
import { Restaurant, MenuItem } from '../data/restaurants'
import { useAppState } from '../context/AppContext'
import { Star, MapPin, Phone, Plus, ShoppingCart } from 'lucide-react'

interface RestaurantMenuProps {
  restaurant: Restaurant
}

interface MenuItemCardProps {
  item: MenuItem
  restaurantId: number
  onAddToCart: (item: MenuItem) => void
}

function MenuItemCard({ item, restaurantId, onAddToCart }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-900 text-lg">{item.name}</h4>
        <span className="text-xl font-bold text-green-600">${item.price.toFixed(2)}</span>
      </div>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {item.category}
          </span>
          <span className="text-xs text-gray-400">ID: {item.id}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-3 py-1 border-x border-gray-300">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 py-1 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          
          <button
            onClick={() => onAddToCart(item)}
            className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function RestaurantMenu({ restaurant }: RestaurantMenuProps) {
  const { addToCart, getCartItemCount } = useAppState()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    'all',
    ...Array.from(new Set(restaurant.menuItems.map(item => item.category)))
  ]

  const filteredItems = selectedCategory === 'all' 
    ? restaurant.menuItems 
    : restaurant.menuItems.filter(item => item.category === selectedCategory)

  const handleAddToCart = (item: MenuItem) => {
    const cartItem = {
      id: `cart-${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      quantity: 1,
      customizations: [],
    }
    
    addToCart(cartItem)
    
    // Show a toast or notification (for now just an alert)
    alert(`Added ${item.name} to cart!`)
  }

  const cartItemCount = getCartItemCount()
  const priceLevel = '$'.repeat(restaurant.priceLevel)

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Restaurant Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
            <p className="text-gray-600 mb-3">{restaurant.description}</p>
            
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{restaurant.rating}</span>
              </div>
              <span className="text-green-600 font-bold text-lg">{priceLevel}</span>
            </div>
            
            <div className="flex flex-col space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{restaurant.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{restaurant.phone}</span>
              </div>
            </div>
          </div>
          
          {cartItemCount > 0 && (
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">
                {cartItemCount} items in cart
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category === 'all' ? 'All Items' : category}
              {category !== 'all' && (
                <span className="ml-1 text-sm opacity-75">
                  ({restaurant.menuItems.filter(item => item.category === category).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {selectedCategory === 'all' ? 'All Menu Items' : selectedCategory}
          </h2>
          <span className="text-gray-600">
            {filteredItems.length} items
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              restaurantId={restaurant.id}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No items found in this category.</p>
        </div>
      )}
    </div>
  )
}