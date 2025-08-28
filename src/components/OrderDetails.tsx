import { useEffect, useState } from 'react'

type Point = {
  lat: number;
  long: number;
}

type OrderDetailsProps = {
  pointA: Point;
  pointB: Point;
  status: string;
}

const apiKey = import.meta.env.VITE_MAPBOX_TOKEN

const OrderDetails = ({ pointA, pointB, status }: OrderDetailsProps) => {
  const [duration, setDuration] = useState<number | null>(null)
  const [distance, setDistance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Calculate straight-line distance between two points (Haversine formula)
  const calculateDistance = (point1: Point, point2: Point): number => {
    const R = 3959 // Earth's radius in miles
    const dLat = (point2.lat - point1.lat) * (Math.PI / 180)
    const dLon = (point2.long - point1.long) * (Math.PI / 180)
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(point1.lat * (Math.PI / 180)) * Math.cos(point2.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  useEffect(() => {
    const fetchRouteDetails = async () => {
      if (!apiKey) {
        // Fallback to straight-line distance calculation
        const straightDistance = calculateDistance(pointA, pointB)
        setDistance(straightDistance * 1609.34) // Convert to meters for consistency
        setDuration(straightDistance * 60 * 2) // Rough estimate: 2 minutes per mile
        return
      }

      setLoading(true)
      setError(null)

      try {
        const query = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${pointA.long},${pointA.lat};${pointB.long},${pointB.lat}?access_token=${apiKey}`,
          { method: 'GET' }
        )

        if (!query.ok) {
          throw new Error(`HTTP error! status: ${query.status}`)
        }

        const json = await query.json()
        
        if (json.routes && json.routes.length > 0) {
          const route = json.routes[0]
          setDuration(route.duration) // in seconds
          setDistance(route.distance) // in meters
        } else {
          // Fallback to straight-line calculation
          const straightDistance = calculateDistance(pointA, pointB)
          setDistance(straightDistance * 1609.34)
          setDuration(straightDistance * 60 * 2)
        }
      } catch (err) {
        console.warn('Failed to fetch route details:', err)
        // Fallback to straight-line calculation
        const straightDistance = calculateDistance(pointA, pointB)
        setDistance(straightDistance * 1609.34)
        setDuration(straightDistance * 60 * 2)
      } finally {
        setLoading(false)
      }
    }

    fetchRouteDetails()
  }, [pointA, pointB])

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const formatDistance = (meters: number) => {
    const miles = meters / 1609.34
    return `${miles.toFixed(1)} mi`
  }

  const getStatusMessage = (status: string) => {
    switch (status.toLowerCase()) {
      case 'preparing':
        return 'Your order is being prepared by the restaurant'
      case 'in-progress':
      case 'on-the-way':
        return 'Your driver is on the way!'
      case 'delivered':
        return 'Your order has been delivered'
      case 'cancelled':
        return 'Your order has been cancelled'
      default:
        return `Order status: ${status}`
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'preparing':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      case 'in-progress':
      case 'on-the-way':
        return 'text-blue-700 bg-blue-50 border-blue-200'
      case 'delivered':
        return 'text-green-700 bg-green-50 border-green-200'
      case 'cancelled':
        return 'text-red-700 bg-red-50 border-red-200'
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'preparing':
        return '👨‍🍳'
      case 'in-progress':
      case 'on-the-way':
        return '🚗'
      case 'delivered':
        return '✅'
      case 'cancelled':
        return '❌'
      default:
        return '📦'
    }
  }

  return (
    <div className={`border rounded-lg p-4 mb-4 ${getStatusColor(status)}`}>
      <h2 className="text-lg font-semibold mb-2">
        {getStatusIcon(status)} Order Status
      </h2>
      
      <p className="mb-3 font-medium">
        {getStatusMessage(status)}
      </p>

      {loading && (
        <p className="text-sm opacity-75">Calculating delivery time...</p>
      )}
      
      {error && (
        <p className="text-red-600 text-sm">Note: Using estimated delivery time</p>
      )}
      
      {duration !== null && distance !== null && !loading && (
        <div className="text-sm space-y-1">
          <p><strong>Distance:</strong> {formatDistance(distance)}</p>
          <p><strong>Estimated delivery time:</strong> {formatDuration(duration)}</p>
          
          {status.toLowerCase() === 'in-progress' || status.toLowerCase() === 'on-the-way' ? (
            <p className="mt-2 font-medium">
              🕐 Your food should arrive in approximately {formatDuration(duration)}
            </p>
          ) : status.toLowerCase() === 'preparing' ? (
            <p className="mt-2 font-medium">
              🕐 Estimated total time: {formatDuration(duration + 900)} (including prep time)
            </p>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default OrderDetails