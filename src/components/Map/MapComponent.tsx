import 'mapbox-gl/dist/mapbox-gl.css'
import { useCallback, useEffect, useState } from 'react'
import Map, {
  Source,
  Layer,
  GeolocateControl,
  NavigationControl,
} from 'react-map-gl/mapbox'
import type { Feature, LineString } from 'geojson'

type RouteFeature = Feature<LineString> | null

const apiKey = import.meta.env.VITE_MAPBOX_TOKEN
const start = [-74.006, 40.7128] // New York City
const end = [-77.0369, 38.9072] // Washington, D.C.

// Define the layer properties for the route line
const layerStyle = {
  id: 'route',
  type: 'line',
  source: 'mapbox-streets',
  'source-layer': 'water',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'fill-color': '#00ffff',
    'line-color': '#1191ec',
    'line-width': 6,
    'line-opacity': 0.7,
  },
}

const MapComponent = () => {
  const [viewState, setViewState] = useState({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 10,
  })

  const [route, setRoute] = useState<RouteFeature>(null)
  const [routeInfo, setRouteInfo] = useState({ distance: 0, duration: 0 })

  const getRoute = useCallback(async () => {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${apiKey}`,
      { method: 'GET' }
    )
    const json = await query.json()
    const data = json.routes[0]
    const route = data.geometry.coordinates

    // Extract distance and duration
    const distance = data.distance // in meters
    const duration = data.duration // in seconds

    setRouteInfo({ distance, duration })

    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route,
      },
    }

    setRoute(geojson)
  }, [])

  // Use useEffect to fetch the route data when the component mounts
  useEffect(() => {
    getRoute()
  }, [getRoute])

  const formatDistance = (meters: number) => {
    const miles = meters / 1609.34
    return `${miles.toFixed(2)} miles`
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours} hr ${minutes} min`
  }

  return (
    <div className="w-[75vw] h-screen p-5 bg-gray-100">
      <Map
        mapboxAccessToken={apiKey}
        initialViewState={viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: '75vw', height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="top-left" />
        {route && (
          <Source type="geojson" data={route}>
            <Layer {...layerStyle} />
          </Source>
        )}
      </Map>
      <div className="p-5 bg-white border border-gray-300 mx-5 mt-5 rounded-lg shadow-md">
        {routeInfo.distance > 0 && (
          <>
            <p>
              <strong>Distance:</strong> {formatDistance(routeInfo.distance)}
            </p>
            <p>
              <strong>Duration:</strong> {formatDuration(routeInfo.duration)}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default MapComponent
