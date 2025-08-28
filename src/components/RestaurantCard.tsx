import { Restaurant } from '../data/restaurants'
import { Star, MapPin, Phone, Clock } from 'lucide-react'

interface RestaurantCardProps {
  restaurant: Restaurant
  onViewMenu?: (restaurant: Restaurant) => void
  onCallRestaurant?: (phone: string) => void
}

export default function RestaurantCard({ 
  restaurant, 
  onViewMenu,
  onCallRestaurant 
}: RestaurantCardProps) {
  const priceLevel = '$'.repeat(restaurant.priceLevel)
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      {/* Restaurant Header */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
            {restaurant.name}
          </h3>
          <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {restaurant.rating}
            </span>
          </div>
        </div>

        {/* Price Level */}
        <div className="flex items-center mb-3">
          <span className="text-green-600 font-bold text-lg">{priceLevel}</span>
          <span className="text-gray-400 ml-1">
            {'$'.repeat(4 - restaurant.priceLevel)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {restaurant.description}
        </p>

        {/* Location */}
        <div className="flex items-start space-x-2 mb-3">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-600 line-clamp-2">
            {restaurant.address}
          </span>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-2 mb-4">
          <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <button
            onClick={() => onCallRestaurant?.(restaurant.phone)}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            {restaurant.phone}
          </button>
        </div>

        {/* Menu Preview */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Popular Items ({restaurant.menuItems.length} total)
          </h4>
          <div className="space-y-1">
            {restaurant.menuItems.slice(0, 2).map((item) => (
              <div key={item.id} className="flex justify-between text-xs">
                <span className="text-gray-600 truncate mr-2">{item.name}</span>
                <span className="text-gray-900 font-medium">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
            {restaurant.menuItems.length > 2 && (
              <div className="text-xs text-gray-500">
                +{restaurant.menuItems.length - 2} more items
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={() => onViewMenu?.(restaurant)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            View Menu
          </button>
          <button
            onClick={() => onCallRestaurant?.(restaurant.phone)}
            className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm text-gray-700"
          >
            Call
          </button>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>Breakfast & Brunch</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>{restaurant.menuItems.length} items</span>
            <span>ID: {restaurant.id}</span>
          </div>
        </div>
      </div>
    </div>
  )
}