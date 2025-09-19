"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X, Expand, Minimize2, MapPin, Navigation } from 'lucide-react';

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

interface NearbyPlace {
  place_id: string;
  name: string;
  type: string;
  rating?: number;
  vicinity: string;
  lat: number;
  lng: number;
  opening_hours?: {
    open_now?: boolean;
  };
  photos?: any[];
}

interface GoogleMapProps {
  touristSpots: TouristSpot[];
  onLocationSelect: (locationId: string) => void; // Required for right-hand side panel
  onMapLoaded?: () => void; // Callback when map loads successfully
  onError?: () => void; // Callback when map fails to load
  showNearbyAmenities?: boolean; // New prop to enable/disable nearby amenities
}

declare global {
  interface Window {
    google: any;
    initGoogleMaps: () => void;
  }
}

export function GoogleMap({ touristSpots, onLocationSelect, onMapLoaded, onError, showNearbyAmenities = true }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const nearbyMarkersRef = useRef<any[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [clickMarker, setClickMarker] = useState<any>(null);
  const [clickedLocation, setClickedLocation] = useState<{lat: number, lng: number} | null>(null);
  
  // Nearby amenities state
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [loadingNearbyPlaces, setLoadingNearbyPlaces] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(['hospital', 'gas_station', 'restaurant', 'police', 'shopping_mall']));
  const [showFilterPanel, setShowFilterPanel] = useState(true);

  // Constants - Exact geographical limits of Jharkhand
  const JHARKHAND_BOUNDS = {
    north: 25.4333, // 25°26' N
    south: 21.9667, // 21°58' N
    east: 87.9167,  // 87°55' E
    west: 83.3167   // 83°19' E
  };
  const JHARKHAND_CENTER = { lat: 23.7, lng: 85.6167 }; // Updated center based on exact bounds
  
  // Amenity filter configurations
  const AMENITY_FILTERS = {
    hospital: { 
      label: 'Hospitals', 
      icon: '🏥', 
      color: '#dc2626', 
      types: ['hospital', 'doctor', 'pharmacy', 'health'] 
    },
    gas_station: { 
      label: 'Fuel Stations', 
      icon: '⛽', 
      color: '#f59e0b', 
      types: ['gas_station'] 
    },
    restaurant: { 
      label: 'Restaurants', 
      icon: '🍽️', 
      color: '#059669', 
      types: ['restaurant', 'meal_takeaway', 'food'] 
    },
    police: { 
      label: 'Police Stations', 
      icon: '🚓', 
      color: '#3b82f6', 
      types: ['police'] 
    },
    shopping_mall: { 
      label: 'Markets', 
      icon: '🛒', 
      color: '#8b5cf6', 
      types: ['shopping_mall', 'supermarket', 'grocery_or_supermarket'] 
    }
  };

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
  
  // Clean up nearby markers
  const clearNearbyMarkers = () => {
    nearbyMarkersRef.current.forEach(marker => {
      if (marker.setMap) {
        marker.setMap(null);
      }
    });
    nearbyMarkersRef.current = [];
  };
  
  // Get amenity info for a place type
  const getAmenityInfo = (types: string[]) => {
    for (const filterKey in AMENITY_FILTERS) {
      const filter = AMENITY_FILTERS[filterKey as keyof typeof AMENITY_FILTERS];
      if (types.some(type => filter.types.includes(type))) {
        return { ...filter, key: filterKey };
      }
    }
    return { label: 'Place', icon: '📍', color: '#6b7280', key: 'other' };
  };

  // Create info window content for nearby amenities
  const createAmenityInfoWindowContent = (place: NearbyPlace): string => {
    const amenityInfo = getAmenityInfo(place.type ? [place.type] : []);
    const isOpen = place.opening_hours?.open_now;
    const rating = place.rating ? place.rating.toFixed(1) : null;
    
    return `
      <div style="min-width: 280px; max-width: 350px; padding: 0; font-family: system-ui, -apple-system, sans-serif; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.12);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, ${amenityInfo.color}, ${amenityInfo.color}dd); color: white; padding: 16px; position: relative; overflow: hidden;">
          <div style="position: absolute; top: -20px; right: -20px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>
          <div style="position: absolute; bottom: -10px; left: -10px; width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.2;"></div>
          <div style="position: relative; z-index: 2;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
              <span style="font-size: 24px; filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.3));">${amenityInfo.icon}</span>
              <div>
                <h3 style="margin: 0; font-size: 16px; font-weight: 700; line-height: 1.2; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">${place.name}</h3>
                <div style="font-size: 12px; opacity: 0.9; margin-top: 2px;">${amenityInfo.label}</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; font-size: 12px; opacity: 0.9;">
              ${rating ? `<div style="display: flex; align-items: center; gap: 3px;">⭐ <strong>${rating}</strong></div>` : ''}
              ${isOpen !== undefined ? `<div style="display: flex; align-items: center; gap: 3px; padding: 2px 6px; background: ${isOpen ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}; border-radius: 8px; border: 1px solid ${isOpen ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)'};">🕒 ${isOpen ? 'Open' : 'Closed'}</div>` : ''}
            </div>
          </div>
        </div>
        
        <!-- Content -->
        <div style="padding: 16px; background: white;">
          <div style="margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
              <span style="font-size: 14px;">📍</span>
              <div style="font-size: 12px; color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">Address</div>
            </div>
            <div style="font-size: 13px; color: #374151; line-height: 1.4;">${place.vicinity}</div>
          </div>
          
          <!-- Action Button -->
          <button 
            onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}&destination_place_id=${place.place_id}', '_blank')"
            style="width: 100%; padding: 12px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 3px 6px rgba(37, 99, 235, 0.3); margin-bottom: 8px;"
            onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 5px 12px rgba(37, 99, 235, 0.4)';" 
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 3px 6px rgba(37, 99, 235, 0.3)';"
          >
            🧭 Get Directions
          </button>
          
          <div style="display: flex; gap: 6px;">
            <button 
              onclick="window.open('https://www.google.com/maps/place/?q=place_id:${place.place_id}', '_blank')"
              style="flex: 1; padding: 8px; background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.2s ease;"
              onmouseover="this.style.background='#e2e8f0'; this.style.borderColor='#cbd5e1';" 
              onmouseout="this.style.background='#f1f5f9'; this.style.borderColor='#e2e8f0';"
            >
              ℹ️ Details
            </button>
            <button 
              onclick="window.open('https://www.google.com/maps/@${place.lat},${place.lng},3a,75y,90t/data=!3m6!1e1!3m4!1s0x0:0x0!2e0!7i16384!8i8192', '_blank')"
              style="flex: 1; padding: 8px; background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.2s ease;"
              onmouseover="this.style.background='#e2e8f0'; this.style.borderColor='#cbd5e1';" 
              onmouseout="this.style.background='#f1f5f9'; this.style.borderColor='#e2e8f0';"
            >
              👁️ Street View
            </button>
          </div>
        </div>
      </div>
    `;
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
              onclick="window.open('https://www.google.com/maps/@${spot.lat},${spot.lng},3a,75y,90t/data=!3m6!1e1!3m4!1s0x0:0x0!2e0!7i16384!8i8192', '_blank')"
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

  // Street View functionality now redirects directly to Google Maps

  // Position synchronization removed since Street View opens in external tab

  // Search for nearby amenities
  const searchNearbyAmenities = useCallback(async (centerLat: number, centerLng: number, radius: number = 5000) => {
    if (!mapInstanceRef.current || !showNearbyAmenities) return;

    try {
      setLoadingNearbyPlaces(true);
      const service = new window.google.maps.places.PlacesService(mapInstanceRef.current);
      const allNearbyPlaces: NearbyPlace[] = [];

      // Search for each type of amenity
      const searchPromises = Object.entries(AMENITY_FILTERS).map(([key, filter]) => {
      return new Promise<void>((resolve) => {
        const request = {
          location: new window.google.maps.LatLng(centerLat, centerLng),
          radius: radius,
          type: filter.types[0], // Use primary type for the search
        };

        service.nearbySearch(request, (results: any[], status: any) => {
          try {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
              const filteredResults = results
                .filter(place => {
                  try {
                    return place.geometry && place.geometry.location && isWithinJharkhand(
                      place.geometry.location.lat(),
                      place.geometry.location.lng()
                    );
                  } catch (err) {
                    console.warn('Error filtering place:', place, err);
                    return false;
                  }
                })
                .slice(0, 5) // Limit results per category
                .map(place => ({
                  place_id: place.place_id || '',
                  name: place.name || 'Unknown Place',
                  type: key,
                  rating: place.rating || undefined,
                  vicinity: place.vicinity || place.formatted_address || 'Address not available',
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                  opening_hours: place.opening_hours || undefined,
                  photos: place.photos || undefined
                }));
              
              allNearbyPlaces.push(...filteredResults);
            } else if (status !== window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
              console.warn(`Places API request failed for ${key}:`, status);
            }
          } catch (error) {
            console.error(`Error processing nearby places for ${key}:`, error);
          }
          resolve();
        });
      });
    });

      await Promise.all(searchPromises);
      
      // Remove duplicates and sort by distance
      const uniquePlaces = allNearbyPlaces.filter((place, index, self) => 
        index === self.findIndex(p => p.place_id === place.place_id)
      );
      
      setNearbyPlaces(uniquePlaces);
      console.log(`Found ${uniquePlaces.length} unique nearby places`);
    } catch (error) {
      console.error('Error searching nearby amenities:', error);
      setNearbyPlaces([]);
    } finally {
      setLoadingNearbyPlaces(false);
    }
  }, [showNearbyAmenities]);

  // Display nearby amenity markers
  const displayNearbyMarkers = useCallback(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing nearby markers
    clearNearbyMarkers();

    // Create markers for filtered nearby places
    nearbyPlaces.forEach(place => {
      const amenityInfo = getAmenityInfo([place.type]);
      
      // Only show if this amenity type is active
      if (!activeFilters.has(place.type)) return;

      const marker = new window.google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map: mapInstanceRef.current,
        title: place.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: amenityInfo.color,
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 8
        },
        zIndex: 100 // Lower than tourist spots
      });

      // Add click listener for amenity markers
      marker.addListener('click', (event: any) => {
        if (event) {
          if (typeof event.stop === 'function') {
            event.stop();
          }
          if (event.domEvent) {
            event.domEvent.preventDefault();
            event.domEvent.stopPropagation();
          }
        }

        // Close any existing info window
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }

        // Create and show info window for amenity
        const content = createAmenityInfoWindowContent(place);
        
        if (!infoWindowRef.current) {
          infoWindowRef.current = new window.google.maps.InfoWindow({
            maxWidth: 350,
            pixelOffset: new window.google.maps.Size(0, -10)
          });
        }
        
        infoWindowRef.current.setContent(content);
        infoWindowRef.current.open({
          anchor: marker,
          map: mapInstanceRef.current,
          shouldFocus: false
        });
      });

      nearbyMarkersRef.current.push(marker);
    });
    
    // After displaying nearby markers, adjust map bounds to show both tourist spots and nearby places
    if (touristSpots.length === 1 && nearbyPlaces.filter(place => activeFilters.has(place.type)).length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      
      // Add tourist spot
      touristSpots.forEach(spot => {
        bounds.extend(new window.google.maps.LatLng(spot.lat, spot.lng));
      });
      
      // Add filtered nearby places
      nearbyPlaces
        .filter(place => activeFilters.has(place.type))
        .forEach(place => {
          bounds.extend(new window.google.maps.LatLng(place.lat, place.lng));
        });
      
      // Fit bounds with padding
      mapInstanceRef.current.fitBounds(bounds, {
        padding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 320 // Extra padding on left for filter panel
        }
      });
      
      // Ensure minimum zoom level for readability
      const listener = window.google.maps.event.addListener(mapInstanceRef.current, 'bounds_changed', () => {
        if (mapInstanceRef.current.getZoom() > 16) {
          mapInstanceRef.current.setZoom(16);
        }
        if (mapInstanceRef.current.getZoom() < 12) {
          mapInstanceRef.current.setZoom(12);
        }
        window.google.maps.event.removeListener(listener);
      });
    }
  }, [nearbyPlaces, activeFilters, touristSpots]);

  // Toggle amenity filter
  const toggleAmenityFilter = (filterKey: string) => {
    setActiveFilters(prev => {
      const newFilters = new Set(prev);
      if (newFilters.has(filterKey)) {
        newFilters.delete(filterKey);
      } else {
        newFilters.add(filterKey);
      }
      return newFilters;
    });
  };

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
    
    // Street View handler - redirects to Google Maps Street View
    (window as any)[`handleStreetView_${uniqueId}`] = () => {
      console.log('Street View clicked for:', spot.name);
      const streetViewUrl = `https://www.google.com/maps/@${spot.lat},${spot.lng},3a,75y,90t/data=!3m6!1e1!3m4!1s0x0:0x0!2e0!7i16384!8i8192`;
      window.open(streetViewUrl, '_blank');
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

    // Determine initial center and zoom based on tourist spots and context
    let initialCenter = JHARKHAND_CENTER;
    let initialZoom = 7;
    
    if (touristSpots.length === 1) {
      // Single tourist spot (individual place page) - zoom in on it
      const spot = touristSpots[0];
      initialCenter = { lat: spot.lat, lng: spot.lng };
      initialZoom = 14; // Zoom in to show local area around the place
    } else if (touristSpots.length > 1) {
      // Multiple tourist spots (general map page) - show state view
      initialCenter = JHARKHAND_CENTER;
      initialZoom = 7; // Show entire Jharkhand state
    }

    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: initialCenter,
      zoom: initialZoom,
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
      
      // Automatically redirect to Google Maps Street View after a short delay (to show the marker animation)
      setTimeout(() => {
        const streetViewUrl = `https://www.google.com/maps/@${clickedLat},${clickedLng},3a,75y,90t/data=!3m6!1e1!3m4!1s0x0:0x0!2e0!7i16384!8i8192`;
        window.open(streetViewUrl, '_blank');
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
        optimized: false, // Disable optimization for better event handling
        zIndex: 1000 // Ensure tourist spots appear above amenities
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
        
        // Handle double-click immediately - open Street View in Google Maps
        const streetViewUrl = `https://www.google.com/maps/@${spot.lat},${spot.lng},3a,75y,90t/data=!3m6!1e1!3m4!1s0x0:0x0!2e0!7i16384!8i8192`;
        window.open(streetViewUrl, '_blank');
        
        // Restore overflow after a brief delay
        setTimeout(() => {
          document.body.style.overflow = 'unset';
        }, 100);
      });

      markersRef.current.push(marker);
    });

    // After creating all markers, adjust view based on context
    if (touristSpots.length === 1) {
      // Single tourist spot - center on it with local zoom (for individual place pages)
      const spot = touristSpots[0];
      mapInstanceRef.current.setCenter({ lat: spot.lat, lng: spot.lng });
      mapInstanceRef.current.setZoom(15); // Good zoom level to see nearby amenities
    } else if (touristSpots.length > 1) {
      // Multiple spots - fit bounds to show all (for general map page)
      const bounds = new window.google.maps.LatLngBounds();
      
      touristSpots.forEach(spot => {
        bounds.extend(new window.google.maps.LatLng(spot.lat, spot.lng));
      });
      
      mapInstanceRef.current.fitBounds(bounds);
      
      // Ensure we don't zoom in too much for state view
      const listener = window.google.maps.event.addListener(mapInstanceRef.current, 'bounds_changed', () => {
        if (mapInstanceRef.current.getZoom() > 10) {
          mapInstanceRef.current.setZoom(10);
        }
        window.google.maps.event.removeListener(listener);
      });
    }

    setIsMapLoaded(true);
    // Notify parent component that map has loaded successfully
    onMapLoaded?.();
  }, [touristSpots, mapType, handleMarkerClick, clickMarker, onMapLoaded, showNearbyAmenities]);

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
      onError?.();
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
          onError?.();
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
        onError?.();
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
      clearNearbyMarkers();
    };
  }, [initializeMap]);
  
  // Update nearby markers when places or filters change
  useEffect(() => {
    displayNearbyMarkers();
  }, [displayNearbyMarkers]);
  
  // Reset nearby places when tourist spots change
  useEffect(() => {
    if (touristSpots.length > 0) {
      setNearbyPlaces([]); // Clear previous results
      clearNearbyMarkers(); // Clear markers from map
    }
  }, [touristSpots]);
  
  // Search for nearby amenities when map is loaded and we have tourist spots
  useEffect(() => {
    if (isMapLoaded && showNearbyAmenities && touristSpots.length > 0 && !loadingNearbyPlaces && nearbyPlaces.length === 0) {
      const centerSpot = touristSpots[0];
      searchNearbyAmenities(centerSpot.lat, centerSpot.lng, 3000);
    }
  }, [isMapLoaded, showNearbyAmenities, touristSpots, loadingNearbyPlaces, nearbyPlaces.length, searchNearbyAmenities]);

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

      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 space-y-3">
        {/* Satellite Toggle */}
        <Button
          onClick={toggleMapType}
          className="px-4 py-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg block w-full"
        >
          {mapType === 'roadmap' ? '🛰️ Satellite' : '🗺️ Map View'}
        </Button>
        
        {/* Amenity Filters */}
        {showNearbyAmenities && (
          <div className="bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg p-3 max-w-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">Nearby Places</h3>
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showFilterPanel ? '−' : '+'}
              </button>
            </div>
            
            {showFilterPanel && (
              <div className="space-y-2">
                {Object.entries(AMENITY_FILTERS).map(([key, filter]) => {
                  const isActive = activeFilters.has(key);
                  const count = nearbyPlaces.filter(place => place.type === key).length;
                  
                  return (
                    <button
                      key={key}
                      onClick={() => toggleAmenityFilter(key)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        isActive 
                          ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{filter.icon}</span>
                        <span className="font-medium">{filter.label}</span>
                      </div>
                      {count > 0 && (
                        <Badge 
                          className={`text-xs px-2 py-0.5 ${
                            isActive 
                              ? 'bg-blue-200 text-blue-800' 
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {count}
                        </Badge>
                      )}
                    </button>
                  );
                })}
                
                {loadingNearbyPlaces && (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2" />
                    <span className="text-sm text-gray-600">Loading nearby places...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Map Container - Clean background for focused view */}
      <div 
        className="w-full h-full min-h-[600px] relative bg-gradient-to-br from-gray-50 to-gray-100"
        style={{
          minHeight: '600px',
          width: '100%',
          height: '100%'
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
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Large marker: Main tourist destination</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>Small markers: Nearby amenities (3km radius)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Click any marker for details & directions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>Click map for 360° Street View</span>
            </div>
            {showNearbyAmenities && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Local Focus:</span> Map shows immediate area around destination
                </div>
              </div>
            )}
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

    </div>
  );
}
