import { useState } from 'react'
import { Restaurant, portlandBreakfastRestaurants } from '../data/restaurants'
import RestaurantCard from './RestaurantCard'
import RestaurantFilters from './RestaurantFilters'
import { Search, Grid, List } from 'lucide-react'

interface RestaurantsGridProps {
  restaurants?: Restaurant[]
  onViewMenu?: (restaurant: Restaurant) => void
  onCallRestaurant?: (phone: string) => void
}

export default function RestaurantsGrid({ 
  restaurants = portlandBreakfastRestaurants,
  onViewMenu,
  onCallRestaurant 
}: RestaurantsGridProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'priceLevel'>('rating')
  const [filterRating, setFilterRating] = useState<number>(0)
  const [filterPriceLevel, setFilterPriceLevel] = useState<number>(4)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter and sort restaurants
  const filteredAndSortedRestaurants = restaurants
    .filter((restaurant) => {
      const matchesSearch = 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesRating = restaurant.rating >= filterRating
      const matchesPriceLevel = restaurant.priceLevel <= filterPriceLevel
      
      return matchesSearch && matchesRating && matchesPriceLevel
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'rating':
          return b.rating - a.rating // Higher ratings first
        case 'priceLevel':
          return a.priceLevel - b.priceLevel // Lower price levels first
        default:
          return 0
      }
    })

  const handleCallRestaurant = (phone: string) => {
    onCallRestaurant?.(phone)
    // For demo purposes, just show an alert
    window.alert(`Calling ${phone}`)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Portland Breakfast Restaurants
        </h1>
        <p className="text-gray-600">
          Discover {restaurants.length} amazing breakfast spots in Portland, Oregon
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search restaurants by name, description, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <RestaurantFilters
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterRating={filterRating}
          setFilterRating={setFilterRating}
          filterPriceLevel={filterPriceLevel}
          setFilterPriceLevel={setFilterPriceLevel}
        />

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">View:</span>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredAndSortedRestaurants.length} of {restaurants.length} restaurants
        </p>
      </div>

      {/* No Results */}
      {filteredAndSortedRestaurants.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No restaurants found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}

      {/* Restaurants Grid/List */}
      <div className={
        viewMode === 'grid'
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
      }>
        {filteredAndSortedRestaurants.map((restaurant) => (
          <div key={restaurant.id} className={viewMode === 'list' ? 'max-w-2xl' : ''}>
            <RestaurantCard
              restaurant={restaurant}
              onViewMenu={onViewMenu}
              onCallRestaurant={handleCallRestaurant}
            />
          </div>
        ))}
      </div>
    </div>
  )
}