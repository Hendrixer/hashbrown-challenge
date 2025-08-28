import 'mapbox-gl/dist/mapbox-gl.css'
import { useMemo } from 'react'
import Map, {
  Source,
  Layer,
  Marker,
  NavigationControl,
} from 'react-map-gl/mapbox'
import type { Feature, LineString } from 'geojson'

type Point = {
  lat: number;
  long: number;
}

type MapComponentProps = {
  pointA: Point;
  pointB: Point;
}

type RouteFeature = Feature<LineString>

const apiKey = import.meta.env.VITE_MAPBOX_TOKEN

// Define the layer properties for the route line
const layerStyle = {
  id: 'route',
  type: 'line' as const,
  layout: {
    'line-join': 'round' as const,
    'line-cap': 'round' as const,
  },
  paint: {
    'line-color': '#1191ec',
    'line-width': 6,
    'line-opacity': 0.7,
  },
}

const MapComponent = ({ pointA, pointB }: MapComponentProps) => {
  // Calculate center point between the two locations
  const centerLng = (pointA.long + pointB.long) / 2
  const centerLat = (pointA.lat + pointB.lat) / 2
  
  // Calculate zoom level based on distance between points
  const latDiff = Math.abs(pointA.lat - pointB.lat)
  const lngDiff = Math.abs(pointA.long - pointB.long)
  const maxDiff = Math.max(latDiff, lngDiff)
  const zoom = maxDiff > 0.1 ? 10 : maxDiff > 0.05 ? 12 : 14

  // Create static route line between the two points
  const route: RouteFeature = useMemo(() => ({
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: [
        [pointA.long, pointA.lat],
        [pointB.long, pointB.lat]
      ],
    },
  }), [pointA, pointB])

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4">
          <h3 className="text-lg font-semibold">🚚 Delivery Route</h3>
          <p className="text-sm opacity-90">Track your order from restaurant to your location</p>
        </div>
        <Map
          mapboxAccessToken={apiKey}
          initialViewState={{
            longitude: centerLng,
            latitude: centerLat,
            zoom: zoom
          }}
          style={{ width: '100%', height: 400 }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
        >
          <NavigationControl position="bottom-right" />
          
          {/* Pickup point marker (Restaurant) */}
          <Marker
            longitude={pointA.long}
            latitude={pointA.lat}
          >
            <div className="flex flex-col items-center">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-white">
                🏪
              </div>
              <div className="bg-white text-xs px-2 py-1 rounded shadow-md font-medium text-green-700 mt-1">
                Restaurant
              </div>
            </div>
          </Marker>
          
          {/* Delivery point marker */}
          <Marker
            longitude={pointB.long}
            latitude={pointB.lat}
          >
            <div className="flex flex-col items-center">
              <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-white">
                📍
              </div>
              <div className="bg-white text-xs px-2 py-1 rounded shadow-md font-medium text-red-700 mt-1">
                Delivery
              </div>
            </div>
          </Marker>
          
          {/* Route line */}
          <Source type="geojson" data={route}>
            <Layer {...layerStyle} />
          </Source>
        </Map>
      </div>
    </div>
  )
}

export default MapComponent
