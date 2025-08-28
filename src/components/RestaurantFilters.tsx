import { ChevronDown, Star, DollarSign } from 'lucide-react'

interface RestaurantFiltersProps {
  sortBy: 'name' | 'rating' | 'priceLevel'
  setSortBy: (sortBy: 'name' | 'rating' | 'priceLevel') => void
  filterRating: number
  setFilterRating: (rating: number) => void
  filterPriceLevel: number
  setFilterPriceLevel: (priceLevel: number) => void
}

export default function RestaurantFilters({
  sortBy,
  setSortBy,
  filterRating,
  setFilterRating,
  filterPriceLevel,
  setFilterPriceLevel,
}: RestaurantFiltersProps) {
  return (
    <div className="flex flex-wrap items-center space-x-4 space-y-2 sm:space-y-0">
      {/* Sort By */}
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">Sort by:</label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as 'name' | 'rating' | 'priceLevel')
            }
            className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="rating">Rating (High to Low)</option>
            <option value="name">Name (A-Z)</option>
            <option value="priceLevel">Price (Low to High)</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="flex items-center space-x-2">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <label className="text-sm font-medium text-gray-700">Min Rating:</label>
        <div className="relative">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(Number(e.target.value))}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={0}>Any</option>
            <option value={3.0}>3.0+ Stars</option>
            <option value={3.5}>3.5+ Stars</option>
            <option value={4.0}>4.0+ Stars</option>
            <option value={4.5}>4.5+ Stars</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Price Level Filter */}
      <div className="flex items-center space-x-2">
        <DollarSign className="w-4 h-4 text-green-600" />
        <label className="text-sm font-medium text-gray-700">Max Price:</label>
        <div className="relative">
          <select
            value={filterPriceLevel}
            onChange={(e) => setFilterPriceLevel(Number(e.target.value))}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={4}>Any Price</option>
            <option value={1}>$ (Budget)</option>
            <option value={2}>$$ (Moderate)</option>
            <option value={3}>$$$ (Upscale)</option>
            <option value={4}>$$$$ (Fine Dining)</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => {
          setFilterRating(0)
          setFilterPriceLevel(4)
          setSortBy('rating')
        }}
        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        Clear Filters
      </button>
    </div>
  )
}
