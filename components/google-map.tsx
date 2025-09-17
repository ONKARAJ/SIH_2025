"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X, Expand, Minimize2 } from 'lucide-react';
import { IframeStreetView } from './iframe-street-view';

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
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [clickMarker, setClickMarker] = useState<any>(null);
  const [clickedLocation, setClickedLocation] = useState<{lat: number, lng: number} | null>(null);

  // Constants - Exact geographical limits of Jharkhand
  const JHARKHAND_BOUNDS = {
    north: 25.4333, // 25°26' N
    south: 21.9667, // 21°58' N
    east: 87.9167,  // 87°55' E
    west: 83.3167   // 83°19' E
  };
  const JHARKHAND_CENTER = { lat: 23.7, lng: 85.6167 }; // Updated center based on exact bounds

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

  // Street View modal functionality removed - now opens directly in Google Maps

  // Open Street View in iframe modal with multiple approaches
  const openStreetViewAtCoordinates = useCallback((lat: number, lng: number) => {
    console.log('Opening Street View iframe modal for coordinates:', lat, lng);
    
    // Create a temporary spot object for the clicked location
    const clickedSpot: TouristSpot = {
      id: `clicked-${lat}-${lng}`,
      name: 'Street View Location',
      type: 'Location',
      color: '#4285f4',
      description: `360° Street View at coordinates ${lat.toFixed(6)}, ${lng.toFixed(6)}`,
      bestTime: '',
      lat: lat,
      lng: lng,
      googleMaps: `https://maps.google.com/?q=${lat},${lng}`
    };
    
    setStreetViewModal({
      isOpen: true,
      spot: clickedSpot,
      hasStreetView: true
    });
  }, []);

  // Position synchronization removed since Street View opens in external tab

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
    
    // Street View handler - opens iframe modal
    (window as any)[`handleStreetView_${uniqueId}`] = () => {
      console.log('Street View clicked for:', spot.name);
      setStreetViewModal({
        isOpen: true,
        spot: spot,
        hasStreetView: true
      });
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
  }, []); // No dependencies needed since all references are now direct

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

    // Add map click listener to handle clicks anywhere on the map
    mapInstanceRef.current.addListener('click', (event: any) => {
      // Close any open info windows first
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
      
      // Get the clicked coordinates
      const clickedLat = event.latLng.lat();
      const clickedLng = event.latLng.lng();
      
      console.log('Map clicked at:', clickedLat, clickedLng);
      
      // Remove any existing click marker
      if (clickMarker) {
        clickMarker.setMap(null);
      }
      
      // Create a new marker at the clicked location with enhanced styling
      const newClickMarker = new window.google.maps.Marker({
        position: { lat: clickedLat, lng: clickedLng },
        map: mapInstanceRef.current,
        title: `Street View Location (${clickedLat.toFixed(6)}, ${clickedLng.toFixed(6)})`,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#ff4757',
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 3,
          scale: 12
        },
        animation: window.google.maps.Animation.BOUNCE,
        zIndex: 1000 // Ensure it appears above other markers
      });
      
      // Store the marker and coordinates
      setClickMarker(newClickMarker);
      setClickedLocation({ lat: clickedLat, lng: clickedLng });
      
      // Stop the bounce animation after 1 second
      setTimeout(() => {
        if (newClickMarker) {
          newClickMarker.setAnimation(null);
        }
      }, 1000);
      
      // Automatically open Street View modal after a short delay (to show the marker animation)
      setTimeout(() => {
        openStreetViewAtCoordinates(clickedLat, clickedLng);
      }, 800);
    });

    clearMarkers();
    
    // Clear any existing click marker
    if (clickMarker) {
      clickMarker.setMap(null);
      setClickMarker(null);
    }

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
        
        // Handle double-click immediately - open Street View iframe modal
        setStreetViewModal({
          isOpen: true,
          spot: spot,
          hasStreetView: true
        });
        
        // Restore overflow after a brief delay
        setTimeout(() => {
          document.body.style.overflow = 'unset';
        }, 100);
      });

      markersRef.current.push(marker);
    });

    setIsMapLoaded(true);
  }, [touristSpots, mapType, handleMarkerClick, openStreetViewAtCoordinates, clickMarker]);

  // Load Google Maps API
  useEffect(() => {
    // Get API key from env
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    // Debug logging for deployment (key presence only)
    console.log('Google Maps API Key available:', !!apiKey);
    console.log('Environment:', process.env.NODE_ENV);
    
    if (!apiKey) {
      console.error('Google Maps API key is missing!');
      console.error('Make sure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set in your deployment environment');
      setMapError('Google Maps API key is missing. Please check your environment configuration.');
      setIsMapLoading(false);
      return;
    }
    
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        try {
          console.log('Google Maps API loaded successfully');
          setMapError(null);
          setIsMapLoading(false);
          initializeMap();
        } catch (error) {
          console.error('Error initializing map:', error);
          setMapError(`Failed to initialize map: ${error instanceof Error ? error.message : 'Unknown error'}`);
          setIsMapLoading(false);
        }
      };
      
      script.onerror = (error) => {
        console.error('Failed to load Google Maps API:', error);
        console.error('Check if:');
        console.error('1. API key is valid');
        console.error('2. Maps JavaScript API is enabled');
        console.error('3. Places API is enabled');
        console.error('4. Domain restrictions are properly configured');
        setMapError('Failed to load Google Maps. Please check your internet connection and API configuration.');
        setIsMapLoading(false);
      };
      
      // Avoid duplicate script tags
      const existing = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]') as HTMLScriptElement | null;
      if (!existing) {
        document.head.appendChild(script);
      } else {
        if (window.google) {
          setIsMapLoading(false);
          initializeMap();
        } else {
          existing.addEventListener('load', () => {
            setIsMapLoading(false);
            initializeMap();
          });
        }
      }
    } else {
      console.log('Google Maps API already loaded');
      setIsMapLoading(false);
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

      {/* Map Container - Static Jharkhand Map */}
      <div 
        className="w-full h-full min-h-[600px] relative bg-gradient-to-br from-green-50 to-blue-50"
        style={{
          minHeight: '600px',
          width: '100%',
          height: '100%',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="800" height="600" fill="%23f0f9ff"/%3E%3Cg transform="translate(100,80)"%3E%3C!-- Jharkhand State Outline --%3E%3Cpath d="M50,100 L150,50 L300,80 L400,120 L450,200 L400,350 L300,380 L200,360 L100,320 L50,250 Z" fill="%2322c55e" stroke="%23166534" stroke-width="2" opacity="0.7"/%3E%3C!-- District boundaries --%3E%3Cpath d="M150,120 L250,100 L320,140 L300,200 L200,220 L150,180 Z" fill="%2334d399" stroke="%23065f46" stroke-width="1" opacity="0.6"/%3E%3Cpath d="M250,150 L350,130 L380,190 L340,240 L250,220 Z" fill="%236ee7b7" stroke="%23065f46" stroke-width="1" opacity="0.6"/%3E%3Cpath d="M150,200 L280,180 L320,240 L280,300 L180,320 L150,260 Z" fill="%2394f3e4" stroke="%23065f46" stroke-width="1" opacity="0.6"/%3E%3Ctext x="225" y="30" font-family="Arial" font-size="18" font-weight="bold" fill="%23166534" text-anchor="middle"%3EJharkhand State%3C/text%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        {/* Interactive overlay for markers */}
        <div 
          ref={mapRef}
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'transparent'
          }}
        />
        
        {/* Fallback to Google Maps if needed */}
        {isMapLoaded && window.google && (
          <div className="absolute inset-0 opacity-0 pointer-events-none">
            <div id="google-map-fallback" style={{ width: '100%', height: '100%' }} />
          </div>
        )}
      </div>

      {/* Instructions Panel */}
      <div className="absolute bottom-4 right-4 z-10 max-w-sm">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <span className="text-lg">👆</span> How to use
          </h3>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Click anywhere on the map for 360° Street View</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Click markers for info, double-click for Street View</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>Red markers show your clicked locations</span>
            </div>
          </div>
        </div>
      </div>

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

      {/* Loading and Error Overlay */}
      {(isMapLoading || mapError) && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            {mapError ? (
              <>
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Map Loading Error</h3>
                <p className="text-gray-600 mb-4">{mapError}</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                  <p className="font-semibold mb-2">Common solutions:</p>
                  <ul className="text-left space-y-1">
                    <li>• Check your internet connection</li>
                    <li>• Verify Google Maps API key is configured</li>
                    <li>• Ensure Maps JavaScript API is enabled</li>
                    <li>• Check domain restrictions in Google Cloud Console</li>
                  </ul>
                </div>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Reload Page
                </Button>
              </>
            ) : (
              <>
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-gray-600">Loading Jharkhand map...</p>
                <p className="text-sm text-gray-500 mt-2">Please wait while we load Google Maps</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Robust Street View Modal with multiple iframe approaches */}
      {streetViewModal.isOpen && streetViewModal.spot && (
        <IframeStreetView
          isOpen={streetViewModal.isOpen}
          onClose={() => setStreetViewModal({ isOpen: false, spot: null, hasStreetView: false })}
          title={streetViewModal.spot.name}
          description={streetViewModal.spot.description}
          location={`${streetViewModal.spot.type} • Jharkhand, India`}
          lat={streetViewModal.spot.lat}
          lng={streetViewModal.spot.lng}
        />
      )}
    </div>
  );
}
