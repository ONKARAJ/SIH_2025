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

interface JharkhandRestrictedMapProps {
  touristSpots: TouristSpot[];
  onLocationSelect: (locationId: string) => void;
}

declare global {
  interface Window {
    google: any;
    initJharkhandRestrictedMap: () => void;
  }
}

export function JharkhandRestrictedMap({ touristSpots, onLocationSelect }: JharkhandRestrictedMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const jharkhandBorderRef = useRef<any>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasError, setHasError] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Step 2: Define Jharkhand's exact bounding rectangle
  const JHARKHAND_BOUNDS = {
    north: 25.4333, // 25°26' N
    south: 21.9667, // 21°58' N  
    east: 87.9167,  // 87°55' E
    west: 83.3167   // 83°19' E
  };

  // Step 4: Center coordinates for Jharkhand
  const JHARKHAND_CENTER = { 
    lat: (JHARKHAND_BOUNDS.north + JHARKHAND_BOUNDS.south) / 2, // 23.7°N
    lng: (JHARKHAND_BOUNDS.east + JHARKHAND_BOUNDS.west) / 2   // 85.6167°E
  };

  // Step 5: Jharkhand border coordinates (simplified polygon for the state boundary)
  const JHARKHAND_BORDER_COORDINATES = [
    // Northern border (with Bihar)
    { lat: 25.42, lng: 83.32 },
    { lat: 25.43, lng: 84.5 },
    { lat: 25.41, lng: 85.8 },
    { lat: 25.38, lng: 86.8 },
    { lat: 25.35, lng: 87.9 },
    
    // Eastern border (with West Bengal)
    { lat: 25.1, lng: 87.92 },
    { lat: 24.5, lng: 87.91 },
    { lat: 23.8, lng: 87.85 },
    { lat: 23.2, lng: 87.8 },
    { lat: 22.5, lng: 87.7 },
    { lat: 22.0, lng: 87.5 },
    
    // Southern border (with Odisha/Chhattisgarh)
    { lat: 21.97, lng: 87.2 },
    { lat: 21.96, lng: 86.5 },
    { lat: 21.98, lng: 85.8 },
    { lat: 22.1, lng: 85.0 },
    { lat: 22.3, lng: 84.2 },
    { lat: 22.5, lng: 83.5 },
    
    // Western border (with Chhattisgarh)
    { lat: 22.8, lng: 83.32 },
    { lat: 23.2, lng: 83.33 },
    { lat: 23.8, lng: 83.35 },
    { lat: 24.3, lng: 83.38 },
    { lat: 24.8, lng: 83.4 },
    { lat: 25.2, lng: 83.35 },
    
    // Close the polygon
    { lat: 25.42, lng: 83.32 }
  ];

  // Get marker color and icon based on tourist spot type
  const getMarkerConfig = (spot: TouristSpot) => {
    const config = {
      'Waterfall': { icon: '💧', color: '#3b82f6' },
      'Hill Station': { icon: '⛰️', color: '#10b981' },
      'Temple': { icon: '🛕', color: '#ef4444' },
      'Wildlife': { icon: '🌲', color: '#f59e0b' },
      'City': { icon: '🏙️', color: '#8b5cf6' },
      'Dam': { icon: '🌊', color: '#06b6d4' }
    };
    return config[spot.type as keyof typeof config] || { icon: '📍', color: '#6b7280' };
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

  // Create tourist destination markers
  const createTouristMarkers = useCallback(() => {
    if (!mapInstanceRef.current || !window.google) return;

    clearMarkers();

    touristSpots.forEach((spot) => {
      const markerConfig = getMarkerConfig(spot);
      
      // Create marker with custom styling
      const marker = new window.google.maps.Marker({
        position: { lat: spot.lat, lng: spot.lng },
        map: mapInstanceRef.current,
        title: spot.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: markerConfig.color,
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 3,
          scale: 12
        },
        clickable: true,
        cursor: 'pointer'
      });

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="min-width: 280px; padding: 12px; font-family: system-ui;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
              <span style="font-size: 24px;">${markerConfig.icon}</span>
              <div>
                <h3 style="margin: 0; font-size: 18px; font-weight: bold; color: #1f2937;">${spot.name}</h3>
                <p style="margin: 2px 0 0 0; font-size: 13px; color: ${markerConfig.color}; font-weight: 600;">${spot.type}</p>
              </div>
            </div>
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #4b5563; line-height: 1.5;">
              ${spot.description.length > 150 ? spot.description.substring(0, 150) + '...' : spot.description}
            </p>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
              <span style="font-size: 12px; color: #6b7280;"><strong>Best Time:</strong> ${spot.bestTime}</span>
            </div>
            <button 
              onclick="window.open('${spot.googleMaps}', '_blank')"
              style="background: ${markerConfig.color}; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; width: 100%;"
              onmouseover="this.style.opacity='0.9'" 
              onmouseout="this.style.opacity='1'"
            >
              View Details & Directions
            </button>
          </div>
        `,
        maxWidth: 320
      });

      // Add click listener
      marker.addListener('click', () => {
        // Close all other info windows
        markersRef.current.forEach(m => {
          if (m.infoWindow && m.infoWindow !== infoWindow) {
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

    console.log(`Created ${markersRef.current.length} tourist destination markers`);
  }, [touristSpots, onLocationSelect]);

  // Step 5: Create Jharkhand border overlay
  const createJharkhandBorder = useCallback(() => {
    if (!mapInstanceRef.current || !window.google) return;

    // Remove existing border if any
    if (jharkhandBorderRef.current) {
      jharkhandBorderRef.current.setMap(null);
    }

    // Create polygon for Jharkhand border
    jharkhandBorderRef.current = new window.google.maps.Polygon({
      paths: JHARKHAND_BORDER_COORDINATES,
      strokeColor: '#dc2626', // Red border
      strokeOpacity: 1.0,
      strokeWeight: 3,
      fillColor: '#fef2f2', // Very light red fill
      fillOpacity: 0.1,
      clickable: false,
      geodesic: true
    });

    jharkhandBorderRef.current.setMap(mapInstanceRef.current);
    console.log('Jharkhand border overlay created');
  }, []);

  // Step 1 & 3: Initialize Google Maps with restrictions
  const initializeMap = useCallback(() => {
    if (!window.google || !mapRef.current) return;

    console.log('Initializing restricted Jharkhand map...');

    // Step 2 & 3: Create bounds and restrictions
    const bounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(JHARKHAND_BOUNDS.south, JHARKHAND_BOUNDS.west),
      new window.google.maps.LatLng(JHARKHAND_BOUNDS.north, JHARKHAND_BOUNDS.east)
    );

    // Step 1: Create map instance with JavaScript API
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      // Step 4: Center on Jharkhand with appropriate zoom
      center: JHARKHAND_CENTER,
      zoom: 8, // Shows full state clearly
      minZoom: 6, // Allow zoom out while maintaining strict boundaries
      maxZoom: 18, // Allow detailed zoom
      
      // Step 3: Strict boundary restrictions - PREVENTS PANNING OUTSIDE JHARKHAND
      restriction: {
        latLngBounds: bounds,
        strictBounds: true // STRICT - Cannot pan outside Jharkhand boundaries
      },
      
      // Map settings
      mapTypeId: 'roadmap',
      zoomControl: true,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: false, // We'll use our custom fullscreen
      clickableIcons: true,
      gestureHandling: 'greedy',
      
      // Style to make Jharkhand stand out
      styles: [
        {
          featureType: 'administrative.province',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#dc2626' }, { weight: 2 }]
        },
        {
          featureType: 'administrative.country',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#6b7280' }, { weight: 1 }]
        }
      ]
    });

    // Border overlay removed as per user request
    
    // Add tourist destination markers
    createTouristMarkers();
    
    // Don't use fitBounds as it overrides zoom settings
    // Map will use the zoom and center settings defined above
    
    setIsLoading(false);
    setHasError(false);
    console.log('Jharkhand restricted map initialized successfully');
  }, [createJharkhandBorder, createTouristMarkers]);

  // Load Google Maps JavaScript API
  useEffect(() => {
    if (!apiKey) {
      console.error('Google Maps API key is missing!');
      setHasError(true);
      setIsLoading(false);
      return;
    }

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&callback=initJharkhandRestrictedMap`;
      script.async = true;
      script.defer = true;
      
      window.initJharkhandRestrictedMap = () => {
        try {
          console.log('Google Maps JavaScript API loaded');
          initializeMap();
        } catch (error) {
          console.error('Error initializing Jharkhand restricted map:', error);
          setHasError(true);
          setIsLoading(false);
        }
      };
      
      script.onerror = () => {
        console.error('Failed to load Google Maps JavaScript API');
        setHasError(true);
        setIsLoading(false);
      };
      
      document.head.appendChild(script);
    } else {
      console.log('Google Maps API already loaded');
      initializeMap();
    }

    return () => {
      clearMarkers();
    };
  }, [apiKey, initializeMap]);

  // Control functions
  const toggleFullscreen = () => {
    const mapContainer = document.getElementById('jharkhand-restricted-container');
    if (!document.fullscreenElement && mapContainer) {
      mapContainer.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  const reloadMap = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(initializeMap, 100);
  };

  const fitToBounds = () => {
    if (mapInstanceRef.current) {
      const bounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(JHARKHAND_BOUNDS.south, JHARKHAND_BOUNDS.west),
        new window.google.maps.LatLng(JHARKHAND_BOUNDS.north, JHARKHAND_BOUNDS.east)
      );
      mapInstanceRef.current.fitBounds(bounds);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
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
              Please configure your Google Maps API key to display the restricted Jharkhand map.
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
      id="jharkhand-restricted-container"
      className={`relative w-full h-full bg-gray-100 rounded-lg overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Jharkhand Map</h3>
            <p className="text-gray-600 mb-4">Restricted to Jharkhand boundaries only</p>
            <div className="text-sm text-gray-500">
              <div>🗺️ Google Maps JavaScript API</div>
              <div>🚧 Strict boundary restrictions enabled</div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center z-20">
          <div className="text-center p-8 max-w-md">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-4">Map Loading Error</h3>
            <p className="text-gray-600 mb-6">Unable to load the Jharkhand restricted map.</p>
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
          className="px-3 py-2 bg-white/95 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg"
          disabled={isLoading}
          title="Reload map"
        >
          <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>

        <Button
          onClick={fitToBounds}
          className="px-3 py-2 bg-white/95 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg"
          title="Fit to Jharkhand"
        >
          🎯
        </Button>

        <Button
          onClick={toggleFullscreen}
          className="px-3 py-2 bg-white/95 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
        </Button>
      </div>

      {/* Map Info */}
      {!isLoading && !hasError && (
        <div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg p-3">
          <div className="text-xs text-gray-600">
            <div className="font-bold text-gray-800 mb-1">🗺️ Jharkhand State Map</div>
            <div>✅ Restricted to state boundaries</div>
            <div>🚧 Cannot pan outside Jharkhand</div>
            <div>📍 {touristSpots.length} tourist destinations</div>
          </div>
        </div>
      )}
    </div>
  );
}