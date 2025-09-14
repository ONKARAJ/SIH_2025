"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X, Expand, Minimize2 } from 'lucide-react';
import { StreetViewModal } from './street-view-modal';

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

interface GoogleMapProps {
  touristSpots: TouristSpot[];
  onLocationSelect: (locationId: string) => void; // Required for right-hand side panel
}

declare global {
  interface Window {
    google: any;
    initGoogleMaps: () => void;
  }
}

export function GoogleMap({ touristSpots, onLocationSelect }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [streetViewModal, setStreetViewModal] = useState<{
    isOpen: boolean;
    spot: TouristSpot | null;
    hasStreetView: boolean;
  }>({ isOpen: false, spot: null, hasStreetView: false });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Constants
  const JHARKHAND_BOUNDS = {
    north: 25.35,
    south: 21.95,
    east: 87.57,
    west: 83.32
  };
  const JHARKHAND_CENTER = { lat: 23.6102, lng: 85.2799 };

  // Utility functions
  const getSpotIcon = (type: string): string => {
    const iconMap: { [key: string]: string } = {
      'National Park': '🌲',
      'Wildlife Sanctuary': '🦎',
      'Temple': '🛕',
      'Waterfall': '💧',
      'Hill Station': '⛰️',
      'Historical Site': '🏛️',
      'Archaeological Site': '🏺',
      'Fort': '🏰',
      'Museum': '🏛️',
      'Lake': '🏞️',
      'Dam': '🌊',
      'Tribal Village': '🏘️'
    };
    return iconMap[type] || '📍';
  };

  const getSpotColor = (type: string): string => {
    const colorMap: { [key: string]: string } = {
      'National Park': '#059669',
      'Wildlife Sanctuary': '#0891b2',
      'Temple': '#dc2626',
      'Waterfall': '#2563eb',
      'Hill Station': '#7c3aed',
      'Historical Site': '#ea580c',
      'Archaeological Site': '#b45309',
      'Fort': '#991b1b',
      'Museum': '#7c2d12',
      'Lake': '#0369a1',
      'Dam': '#1e40af',
      'Tribal Village': '#16a34a'
    };
    return colorMap[type] || '#6b7280';
  };

  const isWithinJharkhand = (lat: number, lng: number): boolean => {
    return lat >= JHARKHAND_BOUNDS.south && lat <= JHARKHAND_BOUNDS.north &&
           lng >= JHARKHAND_BOUNDS.west && lng <= JHARKHAND_BOUNDS.east;
  };

  // Clean up markers
  const clearMarkers = () => {
    markersRef.current.forEach(marker => {
      if (marker.setMap) {
        marker.setMap(null);
      }
    });
    markersRef.current = [];
  };

  // Create comprehensive info window content for map-only display
  const createInfoWindowContent = (spot: TouristSpot): string => {
    const uniqueId = spot.id.replace(/[^a-zA-Z0-9]/g, '');
    return `
      <div style="min-width: 320px; max-width: 400px; padding: 0; font-family: system-ui, -apple-system, sans-serif; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        <!-- Header with gradient background -->
        <div style="background: linear-gradient(135deg, ${getSpotColor(spot.type)}, ${getSpotColor(spot.type)}dd); color: white; padding: 18px; margin: -8px -8px 0 -8px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 28px; filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.3));">${getSpotIcon(spot.type)}</span>
            <div>
              <h3 style="margin: 0; font-size: 20px; font-weight: 700; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">${spot.name}</h3>
              <div style="font-size: 13px; opacity: 0.9; margin-top: 3px; font-weight: 500;">${spot.type} • Jharkhand, India</div>
            </div>
          </div>
        </div>
        
        <!-- Content section -->
        <div style="padding: 16px; background: white;">
          <!-- Full description for map popup -->
          <div style="margin-bottom: 16px;">
            <h4 style="margin: 0 0 8px 0; color: #1f2937; font-size: 14px; font-weight: 600;">Description</h4>
            <div style="max-height: 200px; overflow-y: auto; margin: 0; color: #374151; font-size: 14px; line-height: 1.6; scrollbar-width: thin; scrollbar-color: #cbd5e1 #f1f5f9;">
              <p style="margin: 0;">${spot.description}</p>
            </div>
          </div>
          
          <!-- Best time to visit -->
          <div style="margin-bottom: 18px; padding: 12px; background: linear-gradient(135deg, #f8fafc, #e2e8f0); border-radius: 8px; border-left: 4px solid ${getSpotColor(spot.type)};">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="font-size: 16px;">🕒</span>
              <div style="font-size: 12px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Best Time to Visit</div>
            </div>
            <div style="font-size: 14px; color: #1e293b; font-weight: 600;">${spot.bestTime}</div>
          </div>
          
          <!-- Action buttons -->
          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <button 
              onclick="window.handleStreetView_${uniqueId}()"
              style="flex: 1; padding: 12px 8px; background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; border: none; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.3);"
              onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(220, 38, 38, 0.4)';" 
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(220, 38, 38, 0.3)';"
            >
              👁️ 360° View
            </button>
            
            <button 
              onclick="window.handleSatellite_${uniqueId}()"
              style="flex: 1; padding: 12px 8px; background: linear-gradient(135deg, #059669, #047857); color: white; border: none; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(5, 150, 105, 0.3);"
              onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(5, 150, 105, 0.4)';" 
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(5, 150, 105, 0.3)';"
            >
              🛰️ Satellite
            </button>
            
            <button 
              onclick="window.open('${spot.googleMaps}', '_blank')"
              style="flex: 1; padding: 12px 8px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.3);"
              onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(37, 99, 235, 0.4)';" 
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(37, 99, 235, 0.3)';"
            >
              🧭 Directions
            </button>
          </div>
          
          <!-- Footer info -->
          <div style="text-align: center; margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
            <small style="color: #9ca3af; font-size: 11px;">
              💡 Double-click marker for instant 360° view • Click map to close popup
            </small>
          </div>
        </div>
      </div>
    `;
  };

  // Check Street View availability and open modal
  const checkStreetViewAndOpen = useCallback((spot: TouristSpot) => {
    console.log('Opening Street View modal for:', spot.name);
    
    // Always open the modal - the StreetViewModal component handles availability checking internally
    setStreetViewModal({
      isOpen: true,
      spot: spot,
      hasStreetView: true // The modal component will handle fallback if needed
    });
  }, []);

  // Handle marker click with map popup only (no side panel update)
  const handleMarkerClick = useCallback((spot: TouristSpot, marker: any) => {
    console.log('Marker clicked:', spot.name);
    
    // Close any existing info window first
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }

    // Create the info window content for map popup only
    const content = createInfoWindowContent(spot);
    
    // Ensure info window exists and set content
    if (!infoWindowRef.current) {
      infoWindowRef.current = new window.google.maps.InfoWindow({
        maxWidth: 350,
        pixelOffset: new window.google.maps.Size(0, -10)
      });
    }
    
    infoWindowRef.current.setContent(content);
    
    // Open the info window anchored to the marker (map-only display)
    infoWindowRef.current.open({
      anchor: marker,
      map: mapInstanceRef.current,
      shouldFocus: false // Prevent focus issues that might cause map jumping
    });

    // Create unique handlers for the popup buttons
    const uniqueId = spot.id.replace(/[^a-zA-Z0-9]/g, '');
    
    // Street View handler
    (window as any)[`handleStreetView_${uniqueId}`] = () => {
      console.log('Street View clicked for:', spot.name);
      checkStreetViewAndOpen(spot);
    };
    
    // Satellite view handler
    (window as any)[`handleSatellite_${uniqueId}`] = () => {
      console.log('Satellite clicked for:', spot.name);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setMapTypeId('satellite');
        mapInstanceRef.current.panTo({ lat: spot.lat, lng: spot.lng });
        mapInstanceRef.current.setZoom(16); // Moderate zoom for better context
        setMapType('satellite');
      }
    };
    
    console.log('Map popup opened for:', spot.name);
  }, [checkStreetViewAndOpen]);

  // Initialize map
  const initializeMap = useCallback(() => {
    if (!window.google || !mapRef.current) return;

    const bounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(JHARKHAND_BOUNDS.south, JHARKHAND_BOUNDS.west),
      new window.google.maps.LatLng(JHARKHAND_BOUNDS.north, JHARKHAND_BOUNDS.east)
    );

    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: JHARKHAND_CENTER,
      zoom: 7,
      minZoom: 6,
      maxZoom: 18,
      mapTypeId: mapType,
      restriction: {
        latLngBounds: bounds,
        strictBounds: true
      },
      zoomControl: true,
      mapTypeControl: false, // Disable built-in map type control
      streetViewControl: true,
      fullscreenControl: false, // Disable built-in fullscreen control
      clickableIcons: false, // Disable clickable POI icons to prevent conflicts
      gestureHandling: 'greedy' // Allow smooth gestures
    });

    infoWindowRef.current = new window.google.maps.InfoWindow();

    // Add map click listener to close info windows when clicking on map
    mapInstanceRef.current.addListener('click', () => {
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
    });

    clearMarkers();

    touristSpots.forEach((spot, index) => {
      console.log(`Creating marker ${index + 1} for:`, spot.name);
      
      const marker = new window.google.maps.Marker({
        position: { lat: spot.lat, lng: spot.lng },
        map: mapInstanceRef.current,
        title: spot.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: getSpotColor(spot.type),
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 3,
          scale: 12 // Slightly larger for better visibility
        },
        clickable: true, // Ensure marker is clickable
        cursor: 'pointer', // Show pointer cursor on hover
        optimized: false // Disable optimization for better event handling
      });

      // Add click listener with enhanced event handling to prevent page jumping
      marker.addListener('click', (event: any) => {
        // Comprehensive event prevention
        if (event) {
          if (typeof event.stop === 'function') {
            event.stop();
          }
          if (event.domEvent) {
            event.domEvent.preventDefault();
            event.domEvent.stopPropagation();
            event.domEvent.stopImmediatePropagation();
          }
        }
        
        // Prevent any scrolling or page movement
        document.body.style.overflow = 'hidden';
        
        // Handle marker click immediately without setTimeout
        handleMarkerClick(spot, marker);
        
        // Restore overflow after a brief delay
        setTimeout(() => {
          document.body.style.overflow = 'unset';
        }, 100);
      });

      // Add double-click listener for Street View with enhanced event handling
      marker.addListener('dblclick', (event: any) => {
        // Comprehensive event prevention
        if (event) {
          if (typeof event.stop === 'function') {
            event.stop();
          }
          if (event.domEvent) {
            event.domEvent.preventDefault();
            event.domEvent.stopPropagation();
            event.domEvent.stopImmediatePropagation();
          }
        }
        
        // Prevent any scrolling or page movement
        document.body.style.overflow = 'hidden';
        
        // Handle double-click immediately
        checkStreetViewAndOpen(spot);
        
        // Restore overflow after a brief delay
        setTimeout(() => {
          document.body.style.overflow = 'unset';
        }, 100);
      });

      markersRef.current.push(marker);
    });

    setIsMapLoaded(true);
  }, [touristSpots, mapType, handleMarkerClick, checkStreetViewAndOpen]);

  // Load Google Maps API
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      (window as any).initMap = () => {
        initializeMap();
      };
      
      script.onerror = () => console.error('Failed to load Google Maps');
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      clearMarkers();
    };
  }, [initializeMap]);

  // Search functionality
  const handleSearch = useCallback((query: string) => {
    if (!query.trim() || !mapInstanceRef.current) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    setIsSearching(true);
    
    const localMatches = touristSpots.filter(spot => 
      spot.name.toLowerCase().includes(query.toLowerCase()) ||
      spot.type.toLowerCase().includes(query.toLowerCase())
    ).map(spot => ({
      name: spot.name,
      formatted_address: spot.type,
      geometry: { location: { lat: () => spot.lat, lng: () => spot.lng } },
      place_id: spot.id,
      isLocal: true,
      spot: spot
    }));

    const service = new window.google.maps.places.PlacesService(mapInstanceRef.current);
    service.textSearch({
      query: query + ' Jharkhand India',
      locationBias: {
        radius: 200000,
        center: JHARKHAND_CENTER
      }
    }, (results: any, status: any) => {
      setIsSearching(false);
      
      let allResults = [...localMatches];
      
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        const filteredResults = results.filter((place: any) => {
          const lat = typeof place.geometry.location.lat === 'function' ? place.geometry.location.lat() : place.geometry.location.lat;
          const lng = typeof place.geometry.location.lng === 'function' ? place.geometry.location.lng() : place.geometry.location.lng;
          return isWithinJharkhand(lat, lng);
        }).slice(0, 5);
        
        allResults = [...allResults, ...filteredResults.map((place: any) => ({ ...place, isLocal: false }))];
      }
      
      setSearchResults(allResults.slice(0, 8));
      setShowSearchDropdown(allResults.length > 0);
    });
  }, [touristSpots]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    clearTimeout((window as any).searchTimeout);
    (window as any).searchTimeout = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  const handleSearchSubmit = () => {
    if (searchResults.length > 0) {
      handlePlaceSelect(searchResults[0]);
    } else if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  const handlePlaceSelect = useCallback((place: any) => {
    if (!mapInstanceRef.current) return;
    
    let lat, lng;
    
    if (place.isLocal && place.spot) {
      lat = place.spot.lat;
      lng = place.spot.lng;
      
      // Find the marker and trigger its popup (no side panel update)
      const marker = markersRef.current.find(m => m.getTitle() === place.spot.name);
      if (marker) {
        handleMarkerClick(place.spot, marker);
      }
    } else {
      lat = typeof place.geometry.location.lat === 'function' ? place.geometry.location.lat() : place.geometry.location.lat;
      lng = typeof place.geometry.location.lng === 'function' ? place.geometry.location.lng() : place.geometry.location.lng;
      
      const tempMarker = new window.google.maps.Marker({
        position: { lat, lng },
        map: mapInstanceRef.current,
        title: place.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#4285f4',
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 8
        },
        animation: window.google.maps.Animation.BOUNCE
      });
      
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="max-width: 280px; padding: 12px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px;">📍 ${place.name}</h3>
            <p style="margin: 0 0 10px 0; color: #666; font-size: 13px;">${place.formatted_address}</p>
            <div style="display: flex; gap: 8px;">
              <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}', '_blank')" 
                      style="padding: 6px 12px; background: #059669; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">
                🧭 Get Directions
              </button>
              <button onclick="window.open('https://www.google.com/maps/place/?q=place_id:${place.place_id}', '_blank')" 
                      style="padding: 6px 12px; background: #2563eb; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">
                🗺️ View Details
              </button>
            </div>
          </div>
        `,
        maxWidth: 300,
        pixelOffset: new window.google.maps.Size(0, -10)
      });
      
      infoWindow.open({
        anchor: tempMarker,
        map: mapInstanceRef.current,
        shouldFocus: false // Prevent focus issues that might cause map jumping
      });
      setTimeout(() => tempMarker.setAnimation(null), 2000);
    }
    
    mapInstanceRef.current.panTo({ lat, lng });
    mapInstanceRef.current.setZoom(15);
    
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchDropdown(false);
  }, [handleMarkerClick]);

  const toggleMapType = () => {
    const newType = mapType === 'roadmap' ? 'satellite' : 'roadmap';
    setMapType(newType);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setMapTypeId(newType);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Search Bar */}
      <div className="absolute top-4 right-4 z-10" ref={searchInputRef}>
        <div className="relative">
          <div className="flex">
            <Input
              type="text"
              placeholder="Search places in Jharkhand..."
              value={searchQuery}
              onChange={handleSearchInput}
              onKeyPress={handleKeyPress}
              className="w-80 pl-10 pr-4 py-2 bg-white/95 backdrop-blur-sm border border-gray-300 rounded-l-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Button
              onClick={handleSearchSubmit}
              disabled={!searchQuery.trim() || isSearching}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-r-lg shadow-lg"
            >
              {isSearching ? (
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Search Results Dropdown */}
          {showSearchDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto z-20">
              {searchResults.map((result, index) => (
                <div
                  key={result.place_id || index}
                  onClick={() => handlePlaceSelect(result)}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {result.isLocal ? (
                        <span className="text-lg">{getSpotIcon(result.spot?.type || 'Unknown')}</span>
                      ) : (
                        <span className="text-lg">📍</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 truncate">{result.name}</div>
                      <div className="text-sm text-gray-500 truncate">{result.formatted_address}</div>
                      {result.isLocal && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full mt-1">
                          ⭐ Tourist Spot
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {showSearchDropdown && searchResults.length === 0 && !isSearching && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg p-4 text-center text-gray-500">
              <div className="text-4xl mb-2">🔍</div>
              <div>No places found for "{searchQuery}"</div>
            </div>
          )}
        </div>
      </div>

      {/* Satellite Toggle Button */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          onClick={toggleMapType}
          className="px-4 py-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg"
        >
          {mapType === 'roadmap' ? '🛰️ Satellite' : '🗺️ Map View'}
        </Button>
      </div>

      {/* Map Container */}
      <div 
        ref={mapRef}
        className="w-full h-full min-h-[600px]"
        style={{
          minHeight: '600px',
          width: '100%',
          height: '100%'
        }}
      />

      {/* Fullscreen Button */}
      <div className="absolute bottom-4 left-4 z-10">
        <Button
          onClick={toggleFullscreen}
          className="px-4 py-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4 mr-2" /> : <Expand className="w-4 h-4 mr-2" />}
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </Button>
      </div>

      {/* Loading Overlay */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600">Loading Jharkhand map...</p>
          </div>
        </div>
      )}

      {/* Street View Modal - Using the advanced modal component */}
      {streetViewModal.isOpen && streetViewModal.spot && (
        <StreetViewModal
          isOpen={streetViewModal.isOpen}
          onClose={() => setStreetViewModal({ isOpen: false, spot: null, hasStreetView: false })}
          title={streetViewModal.spot.name}
          description={streetViewModal.spot.description.length > 150 
            ? streetViewModal.spot.description.substring(0, 150) + '...' 
            : streetViewModal.spot.description}
          location={`${streetViewModal.spot.type} • Jharkhand, India`}
          lat={streetViewModal.spot.lat}
          lng={streetViewModal.spot.lng}
        />
      )}
    </div>
  );
}
