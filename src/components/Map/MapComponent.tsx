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
    <div>
      <div className="w-[75vw] h-screen p-5 bg-gray-100">
        <Map
          mapboxAccessToken={apiKey}
          initialViewState={{
            longitude: centerLng,
            latitude: centerLat,
            zoom: zoom
          }}
          style={{ width: '75vw', height: 400 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <NavigationControl position="bottom-right" />
          
          {/* Pickup point marker */}
          <Marker
            longitude={pointA.long}
            latitude={pointA.lat}
            color="green"
          />
          
          {/* Delivery point marker */}
          <Marker
            longitude={pointB.long}
            latitude={pointB.lat}
            color="red"
          />
          
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
