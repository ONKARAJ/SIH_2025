'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { CityData } from '@/lib/cities-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Navigation, Star, Clock, MapPin } from 'lucide-react'

// Essential services data structure
interface EssentialService {
  id: string
  name: string
  type: 'hospital' | 'fuel_station' | 'restaurant' | 'police_station'
  position: { lat: number; lng: number }
  rating?: number
  description: string
  distance?: string
  openNow?: boolean
}

interface InteractiveCityMapProps {
  city: CityData
  height?: string
  className?: string
}

const libraries: ("places" | "geometry")[] = ["places", "geometry"];

export function InteractiveCityMap({ city, height = '400px', className = '' }: InteractiveCityMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<EssentialService | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [essentialServices, setEssentialServices] = useState<EssentialService[]>([])

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries
  });

  const center = {
    lat: city.coordinates.lat,
    lng: city.coordinates.lng
  }

  const mapContainerStyle = {
    width: '100%',
    height: height
  }

  // Generate essential services around the city
  useEffect(() => {
    const generateEssentialServices = (): EssentialService[] => {
      const services: EssentialService[] = []
      const serviceTypes = [
        { type: 'hospital' as const, count: 3, names: [`${city.name} General Hospital`, 'Emergency Medical Center', 'District Health Center'] },
        { type: 'fuel_station' as const, count: 4, names: ['Bharat Petroleum', 'Indian Oil', 'HP Petrol Pump', 'Reliance Fuel Station'] },
        { type: 'restaurant' as const, count: 5, names: ['Local Dhaba', 'Thali House', 'Bengali Restaurant', 'Multi-Cuisine Restaurant', 'Fast Food Corner'] },
        { type: 'police_station' as const, count: 2, names: [`${city.name} Police Station`, 'Traffic Police Post'] }
      ]

      serviceTypes.forEach(serviceType => {
        for (let i = 0; i < serviceType.count; i++) {
          const latOffset = (Math.random() - 0.5) * 0.02  // Within ~2km radius
          const lngOffset = (Math.random() - 0.5) * 0.02
          
          services.push({
            id: `${serviceType.type}-${i}`,
            name: serviceType.names[i] || `${serviceType.type.replace('_', ' ')} ${i + 1}`,
            type: serviceType.type,
            position: {
              lat: city.coordinates.lat + latOffset,
              lng: city.coordinates.lng + lngOffset
            },
            rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10, // Random rating between 3.5-5
            description: getServiceDescription(serviceType.type),
            distance: `${(Math.random() * 3 + 0.5).toFixed(1)} km`,
            openNow: Math.random() > 0.2 // 80% chance of being open
          })
        }
      })

      return services
    }

    setEssentialServices(generateEssentialServices())
  }, [city.coordinates, city.name])

  // Get service descriptions
  const getServiceDescription = (type: EssentialService['type']): string => {
    const descriptions = {
      hospital: 'Medical facility with emergency services available',
      fuel_station: 'Fuel station with petrol, diesel, and basic services',
      restaurant: 'Local dining establishment with regional cuisine',
      police_station: 'Law enforcement facility providing public safety services'
    }
    return descriptions[type]
  }

  // Filter services based on active filter
  const filteredServices = activeFilter === 'all' 
    ? essentialServices 
    : essentialServices.filter(service => service.type === activeFilter)

  // Service categories for filtering
  const serviceCategories = [
    { key: 'all', label: 'All Services', icon: '🗺️', color: 'bg-gray-600' },
    { key: 'hospital', label: 'Hospitals', icon: '🏥', color: 'bg-red-600' },
    { key: 'fuel_station', label: 'Fuel Stations', icon: '⛽', color: 'bg-orange-600' },
    { key: 'restaurant', label: 'Restaurants', icon: '🍽️', color: 'bg-green-600' },
    { key: 'police_station', label: 'Police Stations', icon: '🚔', color: 'bg-blue-600' }
  ]

  // Get marker icon based on service type
  const getMarkerIcon = (type: EssentialService['type']) => {
    const iconMap = {
      hospital: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      fuel_station: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
      restaurant: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      police_station: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    }
    return iconMap[type]
  }

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  if (loadError) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`} style={mapContainerStyle}>
        <div className="text-red-600 mb-4">
          <MapPin className="mx-auto h-12 w-12 mb-2" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Map Unavailable</h3>
        <p className="text-gray-600 mb-4">Failed to load Google Maps. Please check your internet connection.</p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`} style={mapContainerStyle}>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading essential services map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Filter Controls */}
      <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Essential Services
        </h3>
        <div className="flex flex-wrap gap-2">
          {serviceCategories.map((category) => (
            <Button
              key={category.key}
              variant={activeFilter === category.key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(category.key)}
              className={`text-xs px-3 py-1 rounded-full transition-all ${
                activeFilter === category.key
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        }}
      >
        {/* City center marker */}
        <Marker
          position={center}
          title={city.name}
          icon="https://maps.google.com/mapfiles/ms/icons/purple-dot.png"
        />

        {/* Essential services markers */}
        {filteredServices.map((service) => (
          <Marker
            key={service.id}
            position={service.position}
            title={service.name}
            icon={getMarkerIcon(service.type)}
            onClick={() => setSelectedMarker(service)}
          />
        ))}

        {/* InfoWindow for selected service */}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="max-w-xs p-2">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-lg">
                  {serviceCategories.find(cat => cat.key === selectedMarker.type)?.icon || '📍'}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {selectedMarker.name}
                  </h3>
                  
                  <p className="text-xs text-gray-600 mb-2">
                    {selectedMarker.description}
                  </p>

                  <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                    {selectedMarker.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{selectedMarker.rating}</span>
                      </div>
                    )}
                    
                    {selectedMarker.openNow !== undefined && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className={selectedMarker.openNow ? 'text-green-600' : 'text-red-600'}>
                          {selectedMarker.openNow ? 'Open' : 'Closed'}
                        </span>
                      </div>
                    )}

                    {selectedMarker.distance && (
                      <span>{selectedMarker.distance} away</span>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <Button
                      size="sm"
                      onClick={() => {
                        const directionsUrl = `https://www.google.com/maps/dir/${city.coordinates.lat},${city.coordinates.lng}/${selectedMarker.position.lat},${selectedMarker.position.lng}`;
                        window.open(directionsUrl, '_blank');
                      }}
                      className="text-xs px-3 py-1.5 h-7 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <Navigation className="h-3 w-3 mr-1.5" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Services Summary */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 text-xs max-w-48">
        <h4 className="font-bold mb-2 text-gray-800">Services Found</h4>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span>Hospitals</span>
            </div>
            <span className="font-medium">{essentialServices.filter(s => s.type === 'hospital').length}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
              <span>Fuel Stations</span>
            </div>
            <span className="font-medium">{essentialServices.filter(s => s.type === 'fuel_station').length}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Restaurants</span>
            </div>
            <span className="font-medium">{essentialServices.filter(s => s.type === 'restaurant').length}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span>Police Stations</span>
            </div>
            <span className="font-medium">{essentialServices.filter(s => s.type === 'police_station').length}</span>
          </div>
          <div className="flex items-center justify-between border-t pt-1 mt-1">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span>City Center</span>
            </div>
            <span className="font-medium">1</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveCityMap