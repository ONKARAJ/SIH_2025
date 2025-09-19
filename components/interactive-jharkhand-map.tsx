"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Expand,
  Minimize2,
  RotateCcw,
  X,
  ZoomOut,
  Focus,
} from "lucide-react";

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
  streetViewUrl?: string;
}

interface InteractiveJharkhandMapProps {
  touristSpots: TouristSpot[];
  onLocationSelect: (locationId: string) => void;
  selectedLocationId?: string | null;
  onError?: () => void;
  onSuccess?: () => void;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
    jharkhandMap: any;
  }
}

export function InteractiveJharkhandMap({
  touristSpots,
  onLocationSelect,
  selectedLocationId,
  onError,
  onSuccess,
}: InteractiveJharkhandMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [markers, setMarkers] = useState<any[]>([]);
  const hasInitializedRef = useRef(false); // ✅ merged from main (avoid double init in dev)

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [useOpenStreetMap, setUseOpenStreetMap] = useState(false);

  const jharkhandBounds = {
    north: 25.433,
    south: 21.967,
    east: 87.917,
    west: 83.317,
  };

  const jharkhandCenter = {
    lat: 23.6102,
    lng: 85.2799,
  };

  // Load Google Maps Script
  useEffect(() => {
    console.log('InteractiveJharkhandMap: API Key check:', apiKey ? 'Present' : 'Missing');
    
    if (!apiKey) {
      console.error('Google Maps API key is missing');
      setHasError(true);
      setIsLoading(false);
      onError?.();
      return;
    }

    const onLoaded = () => {
      console.log('Google Maps script loaded successfully');
      setIsLoaded(true);
      initializeMap();
    };

    if (
      typeof window !== "undefined" &&
      window.google &&
      window.google.maps
    ) {
      console.log('Google Maps already loaded, initializing...');
      onLoaded();
      return;
    }

    const existing = document.querySelector(
      'script[src*="maps.googleapis.com"]'
    ) as HTMLScriptElement | null;

    if (existing) {
      console.log('Google Maps script already exists, waiting for load...');
      if (existing.getAttribute('data-loaded') === 'true') {
        onLoaded();
      } else {
        existing.addEventListener("load", () => {
          existing.setAttribute('data-loaded', 'true');
          onLoaded();
        }, { once: true });
      }
      return;
    }

    console.log('Loading Google Maps script...');
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
    script.async = true;
    script.defer = true;

    script.addEventListener("load", () => {
      script.setAttribute('data-loaded', 'true');
      onLoaded();
    }, { once: true });
    
    script.addEventListener(
      "error",
      (error) => {
        console.error('Failed to load Google Maps script:', error);
        setHasError(true);
        setIsLoading(false);
        onError?.();
      },
      { once: true }
    );

    document.head.appendChild(script);

    return () => {
      // Cleanup function
      if (!script.getAttribute('data-loaded')) {
        script.removeEventListener("load", onLoaded);
      }
    };
  }, [apiKey]);

  // Recenter on selected location
  useEffect(() => {
    if (map && selectedLocationId) {
      const selectedSpot = touristSpots.find(
        (spot) => spot.id === selectedLocationId
      );
      if (selectedSpot) {
        map.setCenter({ lat: selectedSpot.lat, lng: selectedSpot.lng });
        map.setZoom(12);

        setTimeout(() => {
          const marker = markers.find((m) => m.title === selectedSpot.name);
          if (marker) {
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            setTimeout(() => {
              marker.setAnimation(null);
            }, 2000);
          }
        }, 500);
      }
    }
  }, [selectedLocationId, map, touristSpots]);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    try {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: jharkhandCenter,
        zoom: 8,
        minZoom: 6,
        maxZoom: 18,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        restriction: {
          latLngBounds: {
            north: jharkhandBounds.north + 1,
            south: jharkhandBounds.south - 1,
            east: jharkhandBounds.east + 1,
            west: jharkhandBounds.west - 1,
          },
          strictBounds: false,
        },
        gestureHandling: "cooperative",
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: true,
        zoomControl: true,
        scaleControl: true,
        rotateControl: false,
      });

      setMap(mapInstance);
      window.jharkhandMap = mapInstance;

      // Create markers and info windows
      const infoWindow = new window.google.maps.InfoWindow();
      const createdMarkers: any[] = [];

      touristSpots.forEach((spot) => {
        const marker = new window.google.maps.Marker({
          position: { lat: spot.lat, lng: spot.lng },
          map: mapInstance,
          title: spot.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: spot.color,
            fillOpacity: 0.9,
            strokeColor: '#ffffff',
            strokeWeight: 3,
          },
        });

        marker.addListener('click', () => {
          onLocationSelect(spot.id);
          setSelectedSpot(spot);
          
          const content = `
            <div style="max-width: 300px; padding: 16px;">
              <h3 style="margin: 0 0 12px 0; color: #1f2937; font-weight: bold; font-size: 18px;">${spot.name}</h3>
              <div style="margin-bottom: 12px;">
                <span style="background: ${spot.color}; color: white; padding: 4px 12px; border-radius: 16px; font-size: 12px; font-weight: 500;">${spot.type}</span>
              </div>
              <p style="margin: 0 0 12px 0; color: #4b5563; font-size: 14px; line-height: 1.5;">${spot.description.substring(0, 150)}${spot.description.length > 150 ? '...' : ''}</p>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
                <span style="color: #059669; font-size: 12px; font-weight: 600;">📅 Best Time: ${spot.bestTime}</span>
              </div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <a href="${spot.googleMaps}" target="_blank" style="text-decoration: none;">
                  <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer;">🧭 Directions</button>
                </a>
                <button 
                  onclick="window.dispatchEvent(new CustomEvent('openStreetView', { detail: { spot: ${JSON.stringify(spot).replace(/"/g, '&quot;')} } }))"
                  style="background: #10b981; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer;">
                  🌍 360° View
                </button>
                ${spot.streetViewUrl ? `
                  <a href="${spot.streetViewUrl}" target="_blank" style="text-decoration: none;">
                    <button style="background: #6b7280; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer;">🔗 External</button>
                  </a>
                ` : ''}
              </div>
            </div>
          `;
          
          infoWindow.setContent(content);
          infoWindow.open(mapInstance, marker);
        });

        createdMarkers.push(marker);
      });

      setMarkers(createdMarkers);
      setIsLoading(false);
      setHasError(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error initializing map:", error);
      setHasError(true);
      setIsLoading(false);
      onError?.();
    }
  };

  const toggleFullscreen = () => {
    const mapContainer = mapRef.current?.parentElement;
    if (!document.fullscreenElement && mapContainer) {
      mapContainer
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.error("Enable fullscreen error:", err));
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) => console.error("Exit fullscreen error:", err));
    }
  };

  const resetMap = () => {
    if (map) {
      map.setCenter(jharkhandCenter);
      map.setZoom(8);
    }
  };

  const zoomOut = () => {
    if (map) {
      const currentZoom = map.getZoom();
      map.setZoom(Math.max(currentZoom - 1, 6));
    }
  };

  const zoomToFitAllSpots = () => {
    if (map && touristSpots.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      touristSpots.forEach((spot) =>
        bounds.extend(new window.google.maps.LatLng(spot.lat, spot.lng))
      );
      map.fitBounds(bounds, { padding: 50 });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Create markers after map is initialized
  useEffect(() => {
    if (!map || !window.google) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers: any[] = [];

    const infoWindow = new window.google.maps.InfoWindow();

    touristSpots.forEach((spot) => {
      const marker = new window.google.maps.Marker({
        position: { lat: spot.lat, lng: spot.lng },
        map: map,
        title: spot.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: spot.color,
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      marker.addListener('click', () => {
        onLocationSelect(spot.id);
        setSelectedSpot(spot);
        
        const content = `
          <div style="max-width: 250px; padding: 10px;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-weight: bold;">${spot.name}</h3>
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; background: #f3f4f6; padding: 4px 8px; border-radius: 12px; display: inline-block;">${spot.type}</p>
            <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 13px; line-height: 1.4;">${spot.description.substring(0, 120)}${spot.description.length > 120 ? '...' : ''}</p>
            <p style="margin: 0; color: #059669; font-size: 12px; font-weight: 500;">Best Time: ${spot.bestTime}</p>
          </div>
        `;
        
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [map, touristSpots]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading interactive map...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-50">
        <div className="text-center p-6">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-700 mb-2">Map Loading Error</h3>
          <p className="text-red-600 mb-4">Unable to load the map. Please check your internet connection.</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Reload Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: '600px' }}
      />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={resetMap}
          className="bg-white/90 hover:bg-white"
          title="Reset View"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        
        <Button
          size="sm"
          variant="secondary"
          onClick={zoomOut}
          className="bg-white/90 hover:bg-white"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        
        <Button
          size="sm"
          variant="secondary"
          onClick={zoomToFitAllSpots}
          className="bg-white/90 hover:bg-white"
          title="Fit All Locations"
        >
          <Focus className="h-4 w-4" />
        </Button>
        
        <Button
          size="sm"
          variant="secondary"
          onClick={toggleFullscreen}
          className="bg-white/90 hover:bg-white"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
        </Button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-lg">
        <h4 className="text-sm font-semibold mb-2">Map Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Waterfalls</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Hill Stations</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>Wildlife</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Temples</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Cities</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span>Dams</span>
          </div>
        </div>
      </div>
    </div>
  );
}
