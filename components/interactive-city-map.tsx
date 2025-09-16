'use client'

import React, { useState, useCallback } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { CityData } from '@/lib/cities-data'
import Image from 'next/image'

interface InteractiveCityMapProps {
  city: CityData
  height?: string
  className?: string
}

export function InteractiveCityMap({ city, height = '400px', className = '' }: InteractiveCityMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<any>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  const center = {
    lat: city.coordinates.lat,
    lng: city.coordinates.lng
  }

  const mapContainerStyle = {
    width: '100%',
    height: height
  }

  const mapStyles = [
    {
      featureType: 'all',
      elementType: 'geometry.fill',
      stylers: [{ weight: '2.00' }]
    },
    {
      featureType: 'all',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#9c9c9c' }]
    },
    {
      featureType: 'all',
      elementType: 'labels.text',
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [{ color: '#f2f2f2' }]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ffffff' }]
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ffffff' }]
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [{ saturation: -100 }, { lightness: 45 }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [{ color: '#eeeeee' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#7b7b7b' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#ffffff' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [{ visibility: 'simplified' }]
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [{ color: '#46bcec' }, { visibility: 'on' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{ color: '#c8d7d4' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#070707' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#ffffff' }]
    }
  ]

  // Create markers for attractions
  const attractionMarkers = city.attractions.map((attraction, index) => {
    // Generate coordinates near the city center for each attraction
    const latOffset = (Math.random() - 0.5) * 0.05 // Random offset within ~5km
    const lngOffset = (Math.random() - 0.5) * 0.05
    
    return {
      id: `attraction-${index}`,
      position: {
        lat: city.coordinates.lat + latOffset,
        lng: city.coordinates.lng + lngOffset
      },
      title: attraction.name,
      description: attraction.description,
      category: attraction.category,
      rating: attraction.rating,
      distance: attraction.distance,
      image: attraction.image,
      type: 'attraction'
    }
  })

  // Create markers for hotels
  const hotelMarkers = city.hotels.map((hotel, index) => {
    const latOffset = (Math.random() - 0.5) * 0.03 // Smaller offset for hotels
    const lngOffset = (Math.random() - 0.5) * 0.03
    
    return {
      id: `hotel-${index}`,
      position: {
        lat: city.coordinates.lat + latOffset,
        lng: city.coordinates.lng + lngOffset
      },
      title: hotel.name,
      description: hotel.description,
      rating: hotel.rating,
      price: hotel.price,
      amenities: hotel.amenities,
      image: hotel.image,
      category: hotel.category,
      type: 'hotel'
    }
  })

  const allMarkers = [
    {
      id: 'city-center',
      position: center,
      title: city.name,
      description: city.description,
      type: 'city'
    },
    ...attractionMarkers,
    ...hotelMarkers
  ]

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker)
  }

  const handleInfoWindowClose = () => {
    setSelectedMarker(null)
  }

  const getMarkerIcon = (type: string) => {
    const baseUrl = 'https://maps.google.com/mapfiles/ms/icons/'
    switch (type) {
      case 'city':
        return `${baseUrl}red-dot.png`
      case 'attraction':
        return `${baseUrl}green-dot.png`
      case 'hotel':
        return `${baseUrl}blue-dot.png`
      default:
        return `${baseUrl}red-dot.png`
    }
  }

  const handleLoadError = (error: Error) => {
    console.error('Google Maps load error:', error)
    setLoadError('Failed to load Google Maps. Please check your internet connection and try again.')
  }

  if (loadError) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`} style={mapContainerStyle}>
        <div className="text-red-600 mb-4">
          <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Map Unavailable</h3>
        <p className="text-gray-600 mb-4">{loadError}</p>
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-medium text-gray-900 mb-2">City Location</h4>
          <p className="text-sm text-gray-600">
            {city.name}, {city.district} District<br />
            Coordinates: {city.coordinates.lat}, {city.coordinates.lng}
          </p>
        </div>
      </div>
    )
  }

  // Check if Google Maps API key is available
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`} style={mapContainerStyle}>
        <div className="text-yellow-600 mb-4">
          <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Map Configuration Required</h3>
        <p className="text-gray-600 mb-4">Google Maps API key is required to display the interactive map.</p>
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-medium text-gray-900 mb-2">{city.name} Location</h4>
          <p className="text-sm text-gray-600">
            {city.district} District, Jharkhand<br />
            Coordinates: {city.coordinates.lat}, {city.coordinates.lng}
          </p>
          <div className="mt-3 text-sm text-gray-500">
            <strong>Attractions:</strong> {city.attractions.length} places to visit<br />
            <strong>Hotels:</strong> {city.hotels.length} accommodation options
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <LoadScript 
        googleMapsApiKey={apiKey}
        onError={handleLoadError}
        loadingElement={
          <div className="bg-gray-100 rounded-lg p-8 text-center" style={mapContainerStyle}>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
              <p className="text-gray-600">Loading interactive map...</p>
            </div>
          </div>
        }
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            styles: mapStyles,
            disableDefaultUI: false,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: true
          }}
        >
          {allMarkers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              title={marker.title}
              icon={getMarkerIcon(marker.type)}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={handleInfoWindowClose}
            >
              <div className="p-3 max-w-sm">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{selectedMarker.title}</h3>
                {selectedMarker.image && (
                  <div className="mb-3">
                    <Image
                      src={selectedMarker.image}
                      alt={selectedMarker.title}
                      width={200}
                      height={120}
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                )}
                <p className="text-gray-700 text-sm mb-3">{selectedMarker.description}</p>
                
                {selectedMarker.type === 'attraction' && (
                  <div className="text-xs text-gray-600 mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {selectedMarker.category}
                      </span>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{selectedMarker.rating}</span>
                      </div>
                    </div>
                    <div>Distance: {selectedMarker.distance}</div>
                  </div>
                )}
                
                {selectedMarker.type === 'hotel' && (
                  <div className="text-xs text-gray-600 mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-green-600">{selectedMarker.price}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{selectedMarker.rating}</span>
                      </div>
                    </div>
                    {selectedMarker.amenities && selectedMarker.amenities.length > 0 && (
                      <div className="mt-1">
                        <span className="font-medium">Amenities: </span>
                        {selectedMarker.amenities.slice(0, 3).join(', ')}
                        {selectedMarker.amenities.length > 3 && '...'}
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      window.open(`https://www.google.com/maps/dir//${selectedMarker.position.lat},${selectedMarker.position.lng}`, '_blank')
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs transition-colors flex-1"
                  >
                    Get Directions
                  </button>
                  <button
                    onClick={() => {
                      const coords = `${selectedMarker.position.lat}, ${selectedMarker.position.lng}`
                      navigator.clipboard.writeText(coords)
                      alert('Coordinates copied to clipboard!')
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors"
                    title="Copy Coordinates"
                  >
                    📋
                  </button>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 text-xs">
        <h4 className="font-bold mb-2">Map Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span>City Center</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span>Attractions</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span>Hotels</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveCityMap
