import 'mapbox-gl/dist/mapbox-gl.css'
import { useState } from 'react'
import Map from 'react-map-gl/mapbox'

const MapComponent = () => {
  const [viewState, setViewState] = useState({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 10,
  })
  const apiKey = import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN
console.log(apiKey)
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map
        mapboxAccessToken={import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN}
        initialViewState={viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  )
}

export default MapComponent
