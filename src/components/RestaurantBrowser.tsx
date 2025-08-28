import { useState } from 'react'
import { type Restaurant } from '../data/restaurants'
import RestaurantsGrid from './RestaurantsGrid'
import RestaurantMenu from './RestaurantMenu'
import { ArrowLeft } from 'lucide-react'

export default function RestaurantBrowser() {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null)
  const [showMenu, setShowMenu] = useState(false)

  const handleViewMenu = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant)
    setShowMenu(true)
  }

  const handleBackToRestaurants = () => {
    setShowMenu(false)
    setSelectedRestaurant(null)
  }

  if (showMenu && selectedRestaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <button
              onClick={handleBackToRestaurants}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Restaurants</span>
            </button>
          </div>
        </div>
        <RestaurantMenu restaurant={selectedRestaurant} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantsGrid onViewMenu={handleViewMenu} />
    </div>
  )
}
