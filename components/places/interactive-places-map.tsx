"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  Star, 
  Loader2, 
  ExternalLink,
  Route,
  X
} from 'lucide-react';
import { Place, NearbyPlace, Coordinates, DirectionsInfo, PlaceCategory, TravelMode } from '@/types/place';
import { placesService } from '@/lib/places-service';
import Image from 'next/image';

interface InteractivePlacesMapProps {
  selectedPlace: Place | null;
  onPlaceSelect?: (place: Place) => void;
  className?: string;
}

const libraries: ("places" | "geometry")[] = ["places", "geometry"];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '500px'
};

// Default center on Jharkhand
const defaultCenter = {
  lat: 23.6102,
  lng: 85.2799
};

const mapOptions = {
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
};

export function InteractivePlacesMap({ selectedPlace, onPlaceSelect, className }: InteractivePlacesMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [selectedNearbyPlace, setSelectedNearbyPlace] = useState<NearbyPlace | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [activeTravelMode, setActiveTravelMode] = useState<'DRIVING' | 'WALKING' | 'TRANSIT'>('DRIVING');
  const [showDirections, setShowDirections] = useState(false);
  const [placeCategories, setPlaceCategories] = useState<PlaceCategory[]>([]);
  const [travelModes, setTravelModes] = useState<TravelMode[]>([]);

  // Initialize place categories and travel modes
  useEffect(() => {
    setPlaceCategories(placesService.getPlaceCategories());
    setTravelModes(placesService.getTravelModes());
  }, []);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn('Could not get user location:', error);
        }
      );
    }
  }, []);

  // Fetch nearby places when selected place changes
  useEffect(() => {
    if (selectedPlace?.coordinates) {
      fetchNearbyPlaces(selectedPlace.coordinates, activeCategory);
    }
  }, [selectedPlace, activeCategory]);

  const fetchNearbyPlaces = useCallback(async (center: Coordinates, category: string) => {
    setIsLoadingPlaces(true);
    try {
      const places = await placesService.fetchNearbyPlaces(center, category, 10000);
      setNearbyPlaces(places);
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      setNearbyPlaces([]);
    } finally {
      setIsLoadingPlaces(false);
    }
  }, []);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Handle category filter change
  const handleCategoryChange = useCallback((categoryKey: string) => {
    setActiveCategory(categoryKey);
    setSelectedNearbyPlace(null);
    setDirections(null);
    setShowDirections(false);
  }, []);

  // Handle nearby place selection
  const handleNearbyPlaceSelect = useCallback((place: NearbyPlace) => {
    setSelectedNearbyPlace(place);
    if (map) {
      map.panTo(place.coordinates);
      map.setZoom(16);
    }
  }, [map]);

  // Get directions to a nearby place
  const handleGetDirections = useCallback(async (destination: NearbyPlace) => {
    if (!selectedPlace?.coordinates) return;

    try {
      const directionsService = new google.maps.DirectionsService();
      
      const result = await directionsService.route({
        origin: selectedPlace.coordinates,
        destination: destination.coordinates,
        travelMode: google.maps.TravelMode[activeTravelMode],
        unitSystem: google.maps.UnitSystem.METRIC
      });

      setDirections(result);
      setShowDirections(true);
    } catch (error) {
      console.error('Error getting directions:', error);
    }
  }, [selectedPlace, activeTravelMode]);

  // Get marker icon for place type
  const getMarkerIcon = useCallback((type: NearbyPlace['type']) => {
    const category = placeCategories.find(cat => cat.key === type);
    return {
      url: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="${category?.color || '#6366f1'}" stroke="white" stroke-width="2"/>
          <text x="16" y="20" text-anchor="middle" font-size="16" fill="white">${category?.icon || '📍'}</text>
        </svg>
      `)}`,
      scaledSize: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 16)
    };
  }, [placeCategories]);

  // Format distance for display
  const formatDistance = useCallback((distance?: number) => {
    if (!distance) return '';
    if (distance < 1000) {
      return `${Math.round(distance)}m away`;
    }
    return `${(distance / 1000).toFixed(1)}km away`;
  }, []);

  if (loadError) {
    return (
      <Card className="w-full h-[500px] flex items-center justify-center">
        <CardContent className="text-center">
          <p className="text-red-600 mb-2">Error loading Google Maps</p>
          <p className="text-sm text-gray-500">Please check your internet connection and try again</p>
        </CardContent>
      </Card>
    );
  }

  if (!isLoaded) {
    return (
      <Card className="w-full h-[500px] flex items-center justify-center">
        <CardContent className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p className="text-gray-600">Loading interactive map...</p>
        </CardContent>
      </Card>
    );
  }

  const mapCenter = selectedPlace?.coordinates || defaultCenter;

  return (
    <div className={`relative w-full h-full min-h-[500px] ${className}`}>
      {/* Filter Controls */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Nearby Places
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {placeCategories.map((category) => (
              <Button
                key={category.key}
                variant={activeCategory === category.key ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category.key)}
                className={`text-xs px-3 py-1 rounded-full transition-all ${
                  activeCategory === category.key
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white hover:bg-gray-50 text-gray-700'
                }`}
                disabled={isLoadingPlaces}
              >
                <span className="mr-1">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>

          {isLoadingPlaces && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              Finding places...
            </div>
          )}
        </div>
      </div>

      {/* Travel Mode Controls (shown when directions are active) */}
      {showDirections && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Route className="h-4 w-4" />
              <span className="text-sm font-medium">Travel Mode</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowDirections(false);
                  setDirections(null);
                }}
                className="ml-auto p-1 h-6 w-6"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex gap-1">
              {travelModes.map((mode) => (
                <Button
                  key={mode.mode}
                  variant={activeTravelMode === mode.mode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTravelMode(mode.mode)}
                  className="text-xs px-2 py-1"
                  disabled={!mode.available}
                >
                  <span className="mr-1">{mode.icon}</span>
                  {mode.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={selectedPlace ? 14 : 8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {/* Main destination marker */}
        {selectedPlace?.coordinates && (
          <Marker
            position={selectedPlace.coordinates}
            title={selectedPlace.title}
            icon={{
              url: `data:image/svg+xml,${encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" fill="#dc2626" stroke="white" stroke-width="2"/>
                  <text x="20" y="26" text-anchor="middle" font-size="20" fill="white">📍</text>
                </svg>
              `)}`,
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 20)
            }}
          />
        )}

        {/* User location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            title="Your Location"
            icon={{
              url: `data:image/svg+xml,${encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#2563eb" stroke="white" stroke-width="2"/>
                  <circle cx="12" cy="12" r="4" fill="white"/>
                </svg>
              `)}`,
              scaledSize: new google.maps.Size(24, 24),
              anchor: new google.maps.Point(12, 12)
            }}
          />
        )}

        {/* Nearby places markers */}
        {nearbyPlaces.map((place) => (
          <Marker
            key={place.id}
            position={place.coordinates}
            title={place.name}
            icon={getMarkerIcon(place.type)}
            onClick={() => handleNearbyPlaceSelect(place)}
          />
        ))}

        {/* Info window for selected nearby place */}
        {selectedNearbyPlace && (
          <InfoWindow
            position={selectedNearbyPlace.coordinates}
            onCloseClick={() => setSelectedNearbyPlace(null)}
          >
            <div className="max-w-xs p-2">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-lg">
                  {placeCategories.find(cat => cat.key === selectedNearbyPlace.type)?.icon || '📍'}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {selectedNearbyPlace.name}
                  </h3>
                  
                  {selectedNearbyPlace.vicinity && (
                    <p className="text-xs text-gray-600 mb-2">
                      {selectedNearbyPlace.vicinity}
                    </p>
                  )}

                  <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                    {selectedNearbyPlace.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{selectedNearbyPlace.rating}</span>
                      </div>
                    )}
                    
                    {selectedNearbyPlace.openNow !== undefined && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className={selectedNearbyPlace.openNow ? 'text-green-600' : 'text-red-600'}>
                          {selectedNearbyPlace.openNow ? 'Open' : 'Closed'}
                        </span>
                      </div>
                    )}

                    {selectedNearbyPlace.distance && (
                      <span>{formatDistance(selectedNearbyPlace.distance)}</span>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <Button
                      size="sm"
                      onClick={() => {
                        const origin = selectedPlace?.coordinates ? `${selectedPlace.coordinates.lat},${selectedPlace.coordinates.lng}` : '';
                        const destination = `${selectedNearbyPlace.coordinates.lat},${selectedNearbyPlace.coordinates.lng}`;
                        const directionsUrl = `https://www.google.com/maps/dir/${origin}/${destination}`;
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

        {/* Directions renderer */}
        {directions && showDirections && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: '#2563eb',
                strokeWeight: 4,
                strokeOpacity: 0.8
              }
            }}
          />
        )}
      </GoogleMap>

      {/* Places List (Bottom Sheet on Mobile, Side Panel on Desktop) */}
      {nearbyPlaces.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 z-10">
          <Card className="bg-white/95 backdrop-blur-sm shadow-lg max-h-60 overflow-y-auto">
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-3">
                Found {nearbyPlaces.length} places nearby
              </h4>
              
              <div className="space-y-2">
                {nearbyPlaces.slice(0, 5).map((place) => (
                  <div
                    key={place.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleNearbyPlaceSelect(place)}
                  >
                    <div className="flex-shrink-0 text-sm">
                      {placeCategories.find(cat => cat.key === place.type)?.icon}
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <h5 className="font-medium text-sm text-gray-900 truncate">
                        {place.name}
                      </h5>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {place.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{place.rating}</span>
                          </div>
                        )}
                        {place.distance && (
                          <span>{formatDistance(place.distance)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {nearbyPlaces.length > 5 && (
                  <p className="text-xs text-gray-500 text-center pt-2">
                    And {nearbyPlaces.length - 5} more places...
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}