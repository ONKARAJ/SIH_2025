"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Expand, Minimize2, RotateCcw, AlertCircle } from 'lucide-react';

interface TouristSpot {
  id: string;
  name: string;
  type: string;
  color: string;
  description: string;
  bestTime: string;
  lat: number;
  lng: number;
  googleMaps: string;
}

interface JharkhandInteractiveMapProps {
  touristSpots: TouristSpot[];
  onLocationSelect: (locationId: string) => void;
}

declare global {
  interface Window {
    google: any;
    initJharkhandMap: () => void;
  }
}

export function JharkhandInteractiveMap({ touristSpots, onLocationSelect }: JharkhandInteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasError, setHasError] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  // Jharkhand coordinates
  const jharkhandCenter = { lat: 23.6102, lng: 85.2799 };
  const jharkhandBounds = {
    north: 25.4333,
    south: 21.9667,
    east: 87.9167,
    west: 83.3167
  };

  // Get marker icon based on spot type
  const getMarkerIcon = (spot: TouristSpot) => {
    const icons = {
      'Waterfall': '💧',
      'Hill Station': '⛰️',
      'Temple': '🛕',
      'Wildlife': '🌲',
      'City': '🏙️',
      'Dam': '🌊'
    };
    return icons[spot.type as keyof typeof icons] || '📍';
  };

  // Clear existing markers
  const clearMarkers = () => {
    markersRef.current.forEach(marker => {
      if (marker.setMap) {
        marker.setMap(null);
      }
    });
    markersRef.current = [];
  };

  // Create markers for all tourist spots
  const createMarkers = useCallback(() => {
    if (!mapInstanceRef.current) return;

    clearMarkers();

    touristSpots.forEach((spot, index) => {
      // Create custom marker
      const marker = new window.google.maps.Marker({
        position: { lat: spot.lat, lng: spot.lng },
        map: mapInstanceRef.current,
        title: spot.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: spot.color,
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 3,
          scale: 12
        },
        clickable: true,
        cursor: 'pointer',
        optimized: false
      });

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="min-width: 250px; padding: 8px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="font-size: 20px;">${getMarkerIcon(spot)}</span>
              <div>
                <h3 style="margin: 0; font-size: 16px; font-weight: bold; color: #1f2937;">${spot.name}</h3>
                <p style="margin: 0; font-size: 12px; color: ${spot.color}; font-weight: 600;">${spot.type}</p>
              </div>
            </div>
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #4b5563; line-height: 1.4;">${spot.description.substring(0, 120)}${spot.description.length > 120 ? '...' : ''}</p>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
              <span style="font-size: 11px; color: #6b7280;"><strong>Best Time:</strong> ${spot.bestTime}</span>
              <button 
                onclick="window.open('${spot.googleMaps}', '_blank')"
                style="background: ${spot.color}; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 11px; cursor: pointer;"
              >
                View Details
              </button>
            </div>
          </div>
        `,
        maxWidth: 300
      });

      // Add click listener
      marker.addListener('click', () => {
        // Close all other info windows
        markersRef.current.forEach(m => {
          if (m.infoWindow) {
            m.infoWindow.close();
          }
        });
        
        // Open this info window
        infoWindow.open(mapInstanceRef.current, marker);
        onLocationSelect(spot.id);
      });

      // Store marker and info window
      marker.infoWindow = infoWindow;
      markersRef.current.push(marker);
    });

    console.log(`Created ${markersRef.current.length} markers for tourist spots`);
  }, [touristSpots, onLocationSelect]);

  // Initialize Google Maps
  const initializeMap = useCallback(() => {
    if (!window.google || !mapRef.current) return;

    console.log('Initializing Jharkhand interactive map...');

    // Create bounds for Jharkhand
    const bounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(jharkhandBounds.south, jharkhandBounds.west),
      new window.google.maps.LatLng(jharkhandBounds.north, jharkhandBounds.east)
    );

    // Create map instance
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: jharkhandCenter,
      zoom: 9, // Good zoom for Jharkhand state
      minZoom: 7,
      maxZoom: 18,
      mapTypeId: 'roadmap',
      restriction: {
        latLngBounds: bounds,
        strictBounds: false // Allow slight panning outside for better UX
      },
      zoomControl: true,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: false,
      clickableIcons: true,
      gestureHandling: 'greedy'
    });

    // Create markers after map is loaded
    createMarkers();
    
    setIsLoading(false);
    setHasError(false);
  }, [createMarkers]);

  // Load Google Maps API
  useEffect(() => {
    if (!apiKey) {
      console.error('Google Maps API key is missing!');
      setHasError(true);
      setIsLoading(false);
      return;
    }

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initJharkhandMap`;
      script.async = true;
      script.defer = true;
      
      window.initJharkhandMap = () => {
        try {
          console.log('Google Maps API loaded for Jharkhand map');
          initializeMap();
        } catch (error) {
          console.error('Error initializing Jharkhand map:', error);
          setHasError(true);
          setIsLoading(false);
        }
      };
      
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
        setHasError(true);
        setIsLoading(false);
      };
      
      document.head.appendChild(script);
    } else {
      console.log('Google Maps API already loaded, initializing map...');
      initializeMap();
    }

    return () => {
      clearMarkers();
    };
  }, [apiKey, initializeMap]);

  const toggleFullscreen = () => {
    const mapContainer = document.getElementById('jharkhand-map-container');
    if (!document.fullscreenElement && mapContainer) {
      mapContainer.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const reloadMap = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => {
      initializeMap();
    }, 100);
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!apiKey) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg overflow-hidden">
        <div className="flex items-center justify-center h-full min-h-[600px]">
          <div className="text-center p-8 max-w-md">
            <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-4">Google Maps API Key Required</h3>
            <p className="text-gray-600 mb-6">
              Please configure your Google Maps API key to display the interactive Jharkhand map.
            </p>
            <Button onClick={() => window.open('https://console.cloud.google.com/apis/credentials', '_blank')}>
              Get API Key
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="jharkhand-map-container"
      className={`relative w-full h-full bg-gray-100 rounded-lg overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Interactive Map</h3>
            <p className="text-gray-600 mb-4">
              Google Maps JavaScript API • Jharkhand Tourist Spots
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center z-20">
          <div className="text-center p-8 max-w-md">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-4">Map Loading Error</h3>
            <p className="text-gray-600 mb-6">Unable to load the interactive map.</p>
            <Button onClick={reloadMap}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* Google Maps Container */}
      <div 
        ref={mapRef}
        className="w-full h-full"
        style={{ minHeight: '600px' }}
      />

      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button
          onClick={reloadMap}
          className="px-4 py-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg backdrop-blur-sm"
          disabled={isLoading}
        >
          <RotateCcw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Reload
        </Button>

        <Button
          onClick={toggleFullscreen}
          className="px-4 py-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg backdrop-blur-sm"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4 mr-2" /> : <Expand className="w-4 h-4 mr-2" />}
          {isFullscreen ? 'Exit' : 'Fullscreen'}
        </Button>
      </div>

      {/* Legend */}
      {!isLoading && !hasError && (
        <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg p-3">
          <h4 className="text-xs font-bold text-gray-800 mb-2">🗺️ Tourist Destinations</h4>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
            <div className="flex items-center gap-1">
              <span className="text-blue-500">💧</span>
              <span>Waterfalls</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-500">⛰️</span>
              <span>Hill Stations</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-red-500">🛕</span>
              <span>Temples</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-600">🌲</span>
              <span>Wildlife</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-purple-500">🏙️</span>
              <span>Cities</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-cyan-500">🌊</span>
              <span>Dams</span>
            </div>
          </div>
        </div>
      )}

      {/* Status */}
      {!isLoading && !hasError && (
        <div className="absolute top-16 left-4 z-10">
          <div className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            Interactive Map • {touristSpots.length} Destinations
          </div>
        </div>
      )}
    </div>
  );
}