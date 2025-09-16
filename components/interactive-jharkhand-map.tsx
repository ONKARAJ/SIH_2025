"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Expand, Minimize2, RotateCcw, X, ZoomOut, Focus } from 'lucide-react';

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

interface InteractiveJharkhandMapProps {
  touristSpots: TouristSpot[];
  onLocationSelect: (locationId: string) => void;
}

// Declare Google Maps types
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export function InteractiveJharkhandMap({ touristSpots, onLocationSelect }: InteractiveJharkhandMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Jharkhand boundaries (exact geographical limits)
  const jharkhandBounds = {
    north: 25.433, // 25°26' N
    south: 21.967, // 21°58' N
    east: 87.917,  // 87°55' E
    west: 83.317   // 83°19' E
  };

  // Jharkhand center coordinates
  const jharkhandCenter = {
    lat: 23.6102,
    lng: 85.2799
  };

  // Load Google Maps Script
  useEffect(() => {
    if (!apiKey) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    if (window.google) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsLoaded(true);
      initializeMap();
    };
    
    script.onerror = () => {
      setHasError(true);
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [apiKey]);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    try {
      // Create map with Jharkhand-specific settings but allow zoom out
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: jharkhandCenter,
        zoom: 8,
        minZoom: 6, // Allow zooming out to see neighboring states/countries
        maxZoom: 18, // Allow zooming in for detailed views
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        restriction: {
          latLngBounds: {
            north: jharkhandBounds.north + 1, // Add buffer for zoom out
            south: jharkhandBounds.south - 1,
            east: jharkhandBounds.east + 1,
            west: jharkhandBounds.west - 1,
          },
          strictBounds: false, // Allow some panning outside bounds when zoomed out
        },
        gestureHandling: 'cooperative',
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: true,
        zoomControl: true,
        scaleControl: true,
        rotateControl: false,
      });

      setMap(mapInstance);

      // Store map reference globally for button functionality
      (window as any).jharkhandMap = mapInstance;

      // Add markers for all tourist spots
      const infoWindow = new window.google.maps.InfoWindow();
      
      touristSpots.forEach((spot) => {
        // Create custom marker icon based on type
        const getMarkerIcon = (type: string, color: string) => {
          const icons: { [key: string]: string } = {
            'Waterfall': '💧',
            'Hill Station': '⛰️',
            'Temple': '🛕',
            'Wildlife': '🌲',
            'City': '🏙️',
            'Dam': '🌊'
          };
          
          return {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg width="40" height="50" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0C12 0 5 7 5 15c0 8 15 35 15 35s15-27 15-35c0-8-7-15-15-15z" 
                      fill="${color}" stroke="#fff" stroke-width="2"/>
                <circle cx="20" cy="15" r="8" fill="white"/>
                <text x="20" y="20" text-anchor="middle" font-size="12" fill="black">
                  ${icons[type] || '📍'}
                </text>
              </svg>
            `)}`,
            scaledSize: new window.google.maps.Size(40, 50),
            anchor: new window.google.maps.Point(20, 50)
          };
        };

        const marker = new window.google.maps.Marker({
          position: { lat: spot.lat, lng: spot.lng },
          map: mapInstance,
          title: spot.name,
          icon: getMarkerIcon(spot.type, spot.color),
          animation: window.google.maps.Animation.DROP,
        });

        // Get image for the tourist spot
        const getSpotImage = (spotType: string, spotName: string) => {
          // Tourist spot images based on type and name
          const imageMap: { [key: string]: string } = {
            // Waterfalls
            'Dassam Falls': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop&auto=format',
            'Jonha Falls': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&auto=format',
            'Hirni Falls': 'https://images.unsplash.com/photo-1508248307373-1b6cbddb4e05?w=300&h=200&fit=crop&auto=format',
            'Lodh Falls': 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200&fit=crop&auto=format',
            'Nakti Falls': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop&auto=format',
            
            // Hill Stations
            'Netarhat Hill Station': 'https://images.unsplash.com/photo-1506069810914-4d4d55ad4238?w=300&h=200&fit=crop&auto=format',
            'Parasnath Hill': 'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=300&h=200&fit=crop&auto=format',
            'Patratu Valley': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop&auto=format',
            
            // Wildlife
            'Betla National Park': 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=300&h=200&fit=crop&auto=format',
            'Hazaribagh National Park': 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=300&h=200&fit=crop&auto=format',
            'Dalma Wildlife Sanctuary': 'https://images.unsplash.com/photo-1517104382669-16d8e09cc6b3?w=300&h=200&fit=crop&auto=format',
            'Udhuwa Lake': 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=200&fit=crop&auto=format',
            
            // Temples
            'Deoghar Baidyanath Temple': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&auto=format',
            'Rajrappa Temple': 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=300&h=200&fit=crop&auto=format',
            
            // Cities
            'Ranchi (Capital)': 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&h=200&fit=crop&auto=format',
            'Ranchi Rock Garden': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop&auto=format',
            'Tagore Hill': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&auto=format',
            
            // Dams
            'Maithon Dam': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop&auto=format'
          };
          
          // Return specific image or fallback based on type
          return imageMap[spotName] || {
            'Waterfall': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&auto=format',
            'Hill Station': 'https://images.unsplash.com/photo-1506069810914-4d4d55ad4238?w=300&h=200&fit=crop&auto=format',
            'Temple': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&auto=format',
            'Wildlife': 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=300&h=200&fit=crop&auto=format',
            'City': 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&h=200&fit=crop&auto=format',
            'Dam': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop&auto=format'
          }[spotType] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&auto=format';
        };

        const spotImage = getSpotImage(spot.type, spot.name);
        
        // Enhanced info window content with image and better UI
        const infoContent = `
          <div style="max-width: 320px; padding: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <!-- Header Image -->
            <div style="position: relative; height: 160px; overflow: hidden;">
              <img src="${spotImage}" 
                   alt="${spot.name}" 
                   style="width: 100%; height: 100%; object-fit: cover;"
                   onerror="this.src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&auto=format'" />
              <div style="position: absolute; top: 12px; right: 12px; background: ${spot.color}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; backdrop-filter: blur(4px);">
                ${spot.type === 'Waterfall' ? '💧' : 
                  spot.type === 'Hill Station' ? '⛰️' : 
                  spot.type === 'Temple' ? '🛕' : 
                  spot.type === 'Wildlife' ? '🌲' : 
                  spot.type === 'City' ? '🏙️' : 
                  spot.type === 'Dam' ? '🌊' : '📍'} ${spot.type}
              </div>
              <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.7)); padding: 20px 16px 12px; color: white;">
                <h3 style="margin: 0; font-size: 18px; font-weight: 700; text-shadow: 0 1px 3px rgba(0,0,0,0.3);">
                  ${spot.name}
                </h3>
              </div>
            </div>
            
            <!-- Content -->
            <div style="padding: 16px;">
              <p style="margin: 0 0 12px 0; color: #4b5563; font-size: 13px; line-height: 1.5;">
                ${spot.description.length > 120 ? spot.description.substring(0, 120) + '...' : spot.description}
              </p>
              
              <div style="margin: 12px 0; padding: 10px; background: linear-gradient(135deg, #e0f7fa 0%, #e8f5e8 100%); border-radius: 8px; border-left: 3px solid #00acc1;">
                <div style="display: flex; align-items: center; gap: 6px; font-size: 12px; color: #00695c; font-weight: 600;">
                  <span>📅</span>
                  <span>Best Time to Visit: ${spot.bestTime}</span>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div style="margin-top: 16px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
                <!-- Directions Button -->
                <a href="https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}" 
                   target="_blank" 
                   style="display: flex; flex-direction: column; align-items: center; padding: 12px 8px; background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%); color: white; text-decoration: none; border-radius: 8px; transition: transform 0.2s; text-align: center; box-shadow: 0 2px 4px rgba(25,118,210,0.3);"
                   onmouseover="this.style.transform='translateY(-2px)'"
                   onmouseout="this.style.transform='translateY(0)'">
                  <span style="font-size: 16px; margin-bottom: 4px;">🧭</span>
                  <span style="font-size: 11px; font-weight: 600;">Directions</span>
                </a>
                
                <!-- Street View Button -->
                <button onclick="window.parent.postMessage({type: 'streetView', spotId: '${spot.id}'}, '*')"
                        style="display: flex; flex-direction: column; align-items: center; padding: 12px 8px; background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); color: white; border: none; border-radius: 8px; cursor: pointer; transition: transform 0.2s; box-shadow: 0 2px 4px rgba(124,58,237,0.3);"
                        onmouseover="this.style.transform='translateY(-2px)'"
                        onmouseout="this.style.transform='translateY(0)'">
                  <span style="font-size: 16px; margin-bottom: 4px;">👁️</span>
                  <span style="font-size: 11px; font-weight: 600;">Street View</span>
                </button>
                
                <!-- Explore More Button -->
                <button onclick="window.parent.postMessage({type: 'selectSpot', spotId: '${spot.id}'}, '*')"
                        style="display: flex; flex-direction: column; align-items: center; padding: 12px 8px; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; border: none; border-radius: 8px; cursor: pointer; transition: transform 0.2s; box-shadow: 0 2px 4px rgba(5,150,105,0.3);"
                        onmouseover="this.style.transform='translateY(-2px)'"
                        onmouseout="this.style.transform='translateY(0)'">
                  <span style="font-size: 16px; margin-bottom: 4px;">📍</span>
                  <span style="font-size: 11px; font-weight: 600;">Explore</span>
                </button>
              </div>
              
              <!-- Coordinates Footer -->
              <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb; text-align: center;">
                <span style="font-family: monospace; font-size: 11px; color: #9ca3af;">
                  ${spot.lat.toFixed(4)}°N, ${spot.lng.toFixed(4)}°E
                </span>
              </div>
            </div>
          </div>
        `;

        marker.addListener('click', () => {
          infoWindow.setContent(infoContent);
          infoWindow.open(mapInstance, marker);
          onLocationSelect(spot.id);
        });
      });

      // Listen for messages from info windows
      window.addEventListener('message', (event) => {
        if (event.data.type === 'selectSpot') {
          const spot = touristSpots.find(s => s.id === event.data.spotId);
          if (spot) {
            setSelectedSpot(spot);
          }
        } else if (event.data.type === 'streetView') {
          const spot = touristSpots.find(s => s.id === event.data.spotId);
          if (spot) {
            // Open Street View in a new tab
            const streetViewUrl = `https://www.google.com/maps/@${spot.lat},${spot.lng},3a,75y,90t/data=!3m6!1e1!3m4!1s${Math.random().toString(36)}!2e0!7i16384!8i8192`;
            window.open(streetViewUrl, '_blank');
          }
        }
      });

      setIsLoading(false);
      setHasError(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      setHasError(true);
      setIsLoading(false);
    }
  };

  const toggleFullscreen = () => {
    const mapContainer = mapRef.current?.parentElement;
    if (!document.fullscreenElement && mapContainer) {
      mapContainer.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error('Error attempting to exit fullscreen:', err);
      });
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
      map.setZoom(Math.max(currentZoom - 1, 6)); // Zoom out by 1 level, minimum zoom 6
    }
  };

  const zoomToFitAllSpots = () => {
    if (map && touristSpots.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      touristSpots.forEach(spot => {
        bounds.extend(new window.google.maps.LatLng(spot.lat, spot.lng));
      });
      map.fitBounds(bounds, { padding: 50 }); // Add 50px padding
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  if (!apiKey) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg overflow-hidden">
        <div className="flex items-center justify-center h-full min-h-[600px]">
          <div className="text-center p-8 max-w-md">
            <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-4">Google Maps API Key Required</h3>
            <p className="text-gray-600 mb-6">
              To display the interactive Jharkhand map with tourist spots, please configure your Google Maps API key.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 mb-4">
              <p className="font-semibold mb-2">Add to your .env.local:</p>
              <code className="block">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here</code>
            </div>
            <Button 
              onClick={() => window.open('https://console.cloud.google.com/apis/credentials', '_blank')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Get API Key
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full rounded-lg overflow-hidden ${
      isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
    }`}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Interactive Jharkhand Map</h3>
            <p className="text-gray-600 mb-4">
              Google Maps JavaScript API • Tourist Spots Markers
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span className="font-mono">{jharkhandCenter.lat}° N, {jharkhandCenter.lng}° E</span>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center z-20">
          <div className="text-center p-8 max-w-md">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-4">Failed to Load Map</h3>
            <p className="text-gray-600 mb-6">
              Unable to load the Google Maps JavaScript API. Please check your API key and try again.
            </p>
            <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 text-white">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[600px]"
        style={{ height: isFullscreen ? '100vh' : '600px' }}
      />

      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
        <Button
          onClick={resetMap}
          className="px-3 py-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg backdrop-blur-sm"
          title="Reset to Jharkhand center view"
          disabled={isLoading}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>

        <Button
          onClick={zoomOut}
          className="px-3 py-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg backdrop-blur-sm"
          title="Zoom out to see wider area"
          disabled={isLoading}
        >
          <ZoomOut className="w-4 h-4 mr-2" />
          Zoom Out
        </Button>

        <Button
          onClick={zoomToFitAllSpots}
          className="px-3 py-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg backdrop-blur-sm"
          title="Fit all tourist spots in view"
          disabled={isLoading}
        >
          <Focus className="w-4 h-4 mr-2" />
          Fit All
        </Button>

        <Button
          onClick={toggleFullscreen}
          className="px-3 py-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg backdrop-blur-sm"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4 mr-1" /> : <Expand className="w-4 h-4 mr-1" />}
          {isFullscreen ? 'Exit' : 'Full'}
        </Button>
      </div>

      {/* Map Info */}
      {!isLoading && !hasError && (
        <div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg p-3">
          <div className="text-sm text-gray-700 text-center">
            <div className="font-semibold mb-1">🗺️ Interactive Jharkhand Map</div>
            <div className="text-xs text-gray-500 mb-1">
              {touristSpots.length} Tourist Spots • Click markers for details
            </div>
          </div>
        </div>
      )}

      {/* Selected Spot Modal */}
      {selectedSpot && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedSpot.name}</h2>
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: selectedSpot.color }}
                  >
                    {selectedSpot.type}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSpot(null)}
                  className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {selectedSpot.description}
              </p>

              <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-blue-800">
                  <span>📅</span>
                  <span className="font-medium">Best Time:</span>
                  <span>{selectedSpot.bestTime}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${selectedSpot.lat},${selectedSpot.lng}`;
                    window.open(directionsUrl, '_blank');
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  🧭 Get Directions
                </Button>
                
                <Button
                  onClick={() => {
                    const satelliteUrl = `https://www.google.com/maps/@${selectedSpot.lat},${selectedSpot.lng},18z/data=!3m1!1e3`;
                    window.open(satelliteUrl, '_blank');
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  🛰️ Satellite View
                </Button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
                <span className="font-mono">{selectedSpot.lat.toFixed(6)}, {selectedSpot.lng.toFixed(6)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}