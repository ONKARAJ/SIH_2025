"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavigationIcon, Camera, Search, X, MapPin, Eye } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import "../styles/map-search.css";
import "../styles/polygon-mask.css";
import { StreetViewModal } from "./street-view-modal";
import * as turf from '@turf/turf';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';

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

interface InteractiveMapProps {
  touristSpots: TouristSpot[];
  onLocationSelect: (locationId: string) => void;
}

export function InteractiveMap({ touristSpots, onLocationSelect }: InteractiveMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [MapContainer, setMapContainer] = useState<any>(null);
  const [TileLayer, setTileLayer] = useState<any>(null);
  const [Marker, setMarker] = useState<any>(null);
  const [Popup, setPopup] = useState<any>(null);
  const [customIcon, setCustomIcon] = useState<any>(null);
  const [searchIcon, setSearchIcon] = useState<any>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMarker, setSearchMarker] = useState<any>(null);
  const [isSatelliteView, setIsSatelliteView] = useState(false);
  const [satelliteTileLayer, setSatelliteTileLayer] = useState<any>(null);
  const [osmTileLayer, setOsmTileLayer] = useState<any>(null);
  const [currentSearchResult, setCurrentSearchResult] = useState<any>(null);
  const [showStreetView, setShowStreetView] = useState(false);
  const [selectedStreetViewSpot, setSelectedStreetViewSpot] = useState<TouristSpot | null>(null);
  const [jharkhandBoundary, setJharkhandBoundary] = useState<any>(null);
  const [GeoJSON, setGeoJSON] = useState<any>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Dynamically import react-leaflet and leaflet only on the client side
    const loadMap = async () => {
      if (typeof window !== "undefined") {
        const leaflet = await import("leaflet");
        const reactLeaflet = await import("react-leaflet");

        // Fix for default markers in production
        delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: "/leaflet-images/marker-icon-2x.png",
          iconUrl: "/leaflet-images/marker-icon.png",
          shadowUrl: "/leaflet-images/marker-shadow.png",
        });

        // Create custom icon
        const icon = new leaflet.Icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        });

        // Create search result icon (red color for search results)
        const searchResultIcon = new leaflet.Icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          iconSize: [35, 35],
          iconAnchor: [17, 35],
          className: 'search-result-marker'
        });

        setMapContainer(() => reactLeaflet.MapContainer);
        setTileLayer(() => reactLeaflet.TileLayer);
        setMarker(() => reactLeaflet.Marker);
        setPopup(() => reactLeaflet.Popup);
        setGeoJSON(() => reactLeaflet.GeoJSON);
        setCustomIcon(icon);
        setSearchIcon(searchResultIcon);
        
        // Load Jharkhand boundary data
        fetch('/data/jharkhand-boundary.json')
          .then(response => response.json())
          .then(data => {
            setJharkhandBoundary(data);
            setMapLoaded(true);
          })
          .catch(error => {
            console.error('Error loading Jharkhand boundary:', error);
            setMapLoaded(true); // Still load map even if boundary fails
          });
      }
    };

    loadMap();
  }, []);

  // Removed 360° view functionality

  // Helper function to categorize POI results
  const getCategoryFromResult = useCallback((result: any) => {
    const { class: osmClass, type: osmType, extratags = {} } = result;
    
    // Tourism and attractions
    if (osmClass === 'tourism') {
      if (osmType === 'hotel' || osmType === 'guest_house' || osmType === 'hostel') return 'accommodation';
      if (osmType === 'attraction' || osmType === 'museum' || osmType === 'zoo') return 'tourism';
      if (osmType === 'restaurant') return 'amenity';
      return 'tourism';
    }
    
    // Amenities
    if (osmClass === 'amenity') {
      if (osmType === 'restaurant' || osmType === 'cafe' || osmType === 'fast_food') return 'amenity';
      if (osmType === 'hospital' || osmType === 'clinic' || osmType === 'pharmacy') return 'healthcare';
      if (osmType === 'bank' || osmType === 'atm') return 'finance';
      if (osmType === 'fuel' || osmType === 'charging_station') return 'transport';
      return 'amenity';
    }
    
    // Shopping
    if (osmClass === 'shop') {
      if (osmType === 'mall' || osmType === 'supermarket' || osmType === 'department_store') return 'shop';
      return 'shop';
    }
    
    // Leisure and recreation
    if (osmClass === 'leisure') {
      if (osmType === 'park' || osmType === 'garden') return 'leisure';
      if (osmType === 'swimming_pool' || osmType === 'fitness_centre') return 'leisure';
      return 'leisure';
    }
    
    // Transportation
    if (osmClass === 'highway' || osmClass === 'railway' || osmClass === 'aeroway') {
      return 'transport';
    }
    
    // Places (cities, towns, villages)
    if (osmClass === 'place') {
      return 'place';
    }
    
    // Buildings
    if (osmClass === 'building') {
      if (extratags.building === 'hotel') return 'accommodation';
      if (extratags.building === 'retail' || extratags.building === 'commercial') return 'shop';
      return 'building';
    }
    
    // Default fallback
    return 'place';
  }, []);
  
  // Helper function to get icons for categories
  const getIconForCategory = useCallback((category: string) => {
    const icons: { [key: string]: string } = {
      accommodation: '🏨',
      tourism: '🏛️',
      amenity: '🍽️',
      shop: '🛍️',
      leisure: '🌳',
      healthcare: '🏥',
      finance: '🏧',
      transport: '🚊',
      place: '📍',
      building: '🏢',
      default: '📍'
    };
    return icons[category] || icons.default;
  }, []);
  
  // Helper function to format addresses
  const formatAddress = useCallback((address: any) => {
    if (!address) return '';
    
    const parts = [];
    if (address.house_number && address.road) {
      parts.push(`${address.house_number} ${address.road}`);
    } else if (address.road) {
      parts.push(address.road);
    }
    
    if (address.suburb || address.neighbourhood) {
      parts.push(address.suburb || address.neighbourhood);
    }
    
    if (address.city || address.town || address.village) {
      parts.push(address.city || address.town || address.village);
    }
    
    if (address.state && address.state !== 'Jharkhand') {
      parts.push(address.state);
    }
    
    return parts.join(', ');
  }, []);
  
  // Helper function to get category display name
  const getCategoryDisplayName = useCallback((category: string) => {
    const names: { [key: string]: string } = {
      accommodation: 'Hotel',
      tourism: 'Tourism',
      amenity: 'Restaurant',
      shop: 'Shopping',
      leisure: 'Recreation',
      healthcare: 'Healthcare',
      finance: 'Banking',
      transport: 'Transport',
      place: 'Place',
      building: 'Building',
      default: 'Location'
    };
    return names[category] || names.default;
  }, []);

  // Helper function to check if coordinates are within Jharkhand polygon boundary
  const isWithinJharkhandBounds = useCallback((lat: number, lng: number) => {
    if (!jharkhandBoundary || !jharkhandBoundary.features || !jharkhandBoundary.features[0]) {
      // Fallback to rectangular bounds if GeoJSON not loaded
      return lat >= 21.972 && lat <= 25.25 && lng >= 83.333 && lng <= 88.12;
    }
    
    try {
      const point = turf.point([lng, lat]);
      const polygon = jharkhandBoundary.features[0];
      return booleanPointInPolygon(point, polygon);
    } catch (error) {
      console.error('Error checking point in polygon:', error);
      // Fallback to rectangular bounds on error
      return lat >= 21.972 && lat <= 25.25 && lng >= 83.333 && lng <= 88.12;
    }
  }, [jharkhandBoundary]);

  // Enhanced search functionality with POI support and bounds filtering
  const searchLocation = useCallback(async (query: string) => {
    if (!query.trim() || typeof window === 'undefined') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      // Enhanced search with POI categories and Jharkhand bounds
      // Using viewbox to restrict search results to Jharkhand state bounds
      const jharkhandViewbox = 'viewbox=83.333,25.25,88.12,21.972&bounded=1';
      
      const searches = [
        // Primary search with Jharkhand bias and bounds
        {
          query: `${query}, Jharkhand, India`,
          params: `format=json&limit=8&countrycodes=in&addressdetails=1&extratags=1&${jharkhandViewbox}`
        },
        // POI-specific searches within Jharkhand bounds
        {
          query: `${query} hotel, Jharkhand`,
          params: `format=json&limit=3&countrycodes=in&addressdetails=1&extratags=1&${jharkhandViewbox}`
        },
        {
          query: `${query} restaurant, Jharkhand`,
          params: `format=json&limit=3&countrycodes=in&addressdetails=1&extratags=1&${jharkhandViewbox}`
        },
        {
          query: `${query} mall shopping, Jharkhand`,
          params: `format=json&limit=3&countrycodes=in&addressdetails=1&extratags=1&${jharkhandViewbox}`
        },
        {
          query: `${query} park garden, Jharkhand`,
          params: `format=json&limit=3&countrycodes=in&addressdetails=1&extratags=1&${jharkhandViewbox}`
        }
      ];

      const allResults: any[] = [];
      const seenPlaces = new Set<string>();

      // Execute searches in parallel
      const responses = await Promise.all(
        searches.map(search => 
          fetch(`https://nominatim.openstreetmap.org/search?${search.params}&q=${encodeURIComponent(search.query)}`, {
            headers: { 'User-Agent': 'JharkhandTourismApp/1.0' }
          }).then(res => res.json())
        )
      );

      // Combine and deduplicate results
      responses.forEach((results: any[]) => {
        results.forEach((result: any) => {
          const key = `${result.lat}-${result.lon}`;
          if (!seenPlaces.has(key)) {
            seenPlaces.add(key);
            allResults.push({
              ...result,
              category: getCategoryFromResult(result),
              icon: getIconForCategory(getCategoryFromResult(result)),
              formattedAddress: formatAddress(result.address)
            });
          }
        });
      });

      // Filter and sort results by relevance and category
      const sortedResults = allResults
        .filter((result) => {
          const lat = parseFloat(result.lat);
          const lng = parseFloat(result.lon);
          return isWithinJharkhandBounds(lat, lng);
        })
        .sort((a, b) => {
          // Prioritize exact name matches
          const aExact = a.display_name.toLowerCase().includes(query.toLowerCase());
          const bExact = b.display_name.toLowerCase().includes(query.toLowerCase());
          if (aExact !== bExact) return bExact ? 1 : -1;
          
          // Then by category importance
          const categoryOrder = ['tourism', 'accommodation', 'amenity', 'shop', 'leisure', 'place'];
          const aIndex = categoryOrder.indexOf(a.category);
          const bIndex = categoryOrder.indexOf(b.category);
          return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
        })
        .slice(0, 10); // Limit to top 10 results

      setSearchResults(sortedResults);
      setShowResults(sortedResults.length > 0);
      
      if (sortedResults.length === 0) {
        // Fallback: broader search without location bias
        const fallbackResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=8&countrycodes=in&addressdetails=1&extratags=1`,
          {
            headers: {
              'User-Agent': 'JharkhandTourismApp/1.0'
            }
          }
        );
        const fallbackData = await fallbackResponse.json();
        const enhancedFallback = fallbackData
          .map((result: any) => ({
            ...result,
            category: getCategoryFromResult(result),
            icon: getIconForCategory(getCategoryFromResult(result)),
            formattedAddress: formatAddress(result.address)
          }))
          .filter((result: any) => {
            const lat = parseFloat(result.lat);
            const lng = parseFloat(result.lon);
            return isWithinJharkhandBounds(lat, lng);
          });
        
        setSearchResults(enhancedFallback);
        setShowResults(enhancedFallback.length > 0);
        
        if (enhancedFallback.length === 0 && typeof window !== 'undefined') {
          // Show a more helpful error message for Jharkhand-specific searches
          alert(`No results found for "${query}" within Jharkhand state. Try searching for:\n• Cities: Ranchi, Dhanbad, Jamshedpur, Bokaro\n• Districts: Hazaribagh, Giridih, Deoghar\n• Attractions: Betla National Park, Hundru Falls\n• Hotels or restaurants in Jharkhand cities\n\nAll searches are limited to Jharkhand state boundaries.`);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      if (typeof window !== 'undefined') {
        alert('Search failed. Please check your internet connection and try again.');
      }
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Toggle satellite view
  const toggleSatelliteView = useCallback(() => {
    if (!mapInstance || typeof window === 'undefined') return;

    import('leaflet').then((L) => {
      if (isSatelliteView) {
        // Switch back to OpenStreetMap
        if (satelliteTileLayer && mapInstance.hasLayer(satelliteTileLayer)) {
          mapInstance.removeLayer(satelliteTileLayer);
        }
        if (!osmTileLayer) {
          const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(mapInstance);
          setOsmTileLayer(osmLayer);
        } else if (!mapInstance.hasLayer(osmTileLayer)) {
          osmTileLayer.addTo(mapInstance);
        }
        setIsSatelliteView(false);
      } else {
        // Switch to satellite view
        if (osmTileLayer && mapInstance.hasLayer(osmTileLayer)) {
          mapInstance.removeLayer(osmTileLayer);
        }
        if (!satelliteTileLayer) {
          const satLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          }).addTo(mapInstance);
          setSatelliteTileLayer(satLayer);
        } else if (!mapInstance.hasLayer(satelliteTileLayer)) {
          satelliteTileLayer.addTo(mapInstance);
        }
        setIsSatelliteView(true);
      }
    }).catch((error) => {
      console.error('Error toggling satellite view:', error);
    });
  }, [mapInstance, isSatelliteView, satelliteTileLayer, osmTileLayer]);

  // Handle street view opening
  const openStreetView = useCallback((spotId: string) => {
    const spot = touristSpots.find(s => s.id === spotId);
    if (spot) {
      setSelectedStreetViewSpot(spot);
      setShowStreetView(true);
    }
  }, [touristSpots]);

  // Ensure global functions are always available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).toggleMapSatellite = toggleSatelliteView;
      (window as any).openStreetView = openStreetView;
      return () => {
        if (typeof window !== 'undefined') {
          delete (window as any).toggleMapSatellite;
          delete (window as any).openStreetView;
        }
      };
    }
  }, [toggleSatelliteView, openStreetView]);

  // Get Google Maps URL for directions
  const getGoogleMapsUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  // Get Google Maps satellite URL
  const getGoogleMapsSatelliteUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps/@${lat},${lng},15z/data=!3m1!1e3`;
  };

  // Create enhanced popup content with POI information
  const createSearchPopupContent = useCallback((result: any) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    const directionsUrl = getGoogleMapsUrl(lat, lng);
    const satelliteUrl = getGoogleMapsSatelliteUrl(lat, lng);
    
    const placeName = result.name || result.display_name.split(',')[0];
    const categoryIcon = result.icon || getIconForCategory(result.category || 'place');
    const categoryName = getCategoryDisplayName(result.category || 'place');
    const address = result.formattedAddress || result.display_name.split(',').slice(1).join(',').trim();
    
    const categoryColors: { [key: string]: string } = {
      accommodation: '#8b5cf6',
      tourism: '#10b981',
      amenity: '#f59e0b',
      shop: '#ec4899',
      leisure: '#34d399',
      healthcare: '#ef4444',
      finance: '#3b82f6',
      transport: '#6366f1',
      place: '#6b7280',
      building: '#64748b',
      default: '#6b7280'
    };
    
    const categoryColor = categoryColors[result.category] || categoryColors.default;
    
    return `
      <div style="font-family: system-ui, sans-serif; min-width: 240px; max-width: 280px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <span style="font-size: 20px;" role="img" aria-label="${categoryName}">${categoryIcon}</span>
          <div style="flex: 1;">
            <strong style="color: #1f2937; font-size: 15px; display: block; line-height: 1.3;">${placeName}</strong>
            <span style="color: ${categoryColor}; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${categoryName}</span>
          </div>
        </div>
        
        ${address ? `
          <div style="background: #f9fafb; padding: 8px; border-radius: 6px; margin-bottom: 12px; border-left: 3px solid ${categoryColor};">
            <div style="color: #6b7280; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">Address</div>
            <div style="color: #374151; font-size: 12px; line-height: 1.4;">📍 ${address}</div>
          </div>
        ` : ''}
        
        ${result.class && result.type ? `
          <div style="background: #f0f9ff; padding: 6px 10px; border-radius: 4px; margin-bottom: 12px; border: 1px solid #e0f2fe;">
            <div style="color: #0369a1; font-size: 11px; font-weight: 500;">🏷️ ${result.type.replace(/_/g, ' ').toUpperCase()}</div>
          </div>
        ` : ''}
        
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <a href="${directionsUrl}" target="_blank" 
             style="display: inline-flex; align-items: center; justify-content: center; gap: 6px;
                    background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 10px 16px; 
                    border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 500;
                    transition: all 0.2s; box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);">
            <span>🧭</span> Get Directions
          </a>
          <a href="${satelliteUrl}" target="_blank"
             style="display: inline-flex; align-items: center; justify-content: center; gap: 6px;
                    background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 10px 16px;
                    border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 500;
                    transition: all 0.2s; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);">
            <span>📷</span> Satellite View
          </a>
        </div>
        
        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
          <div style="color: #9ca3af; font-size: 10px; text-align: center; font-weight: 500;">
            ✨ ${result.osm_type} • ${result.osm_id} ✨
          </div>
        </div>
      </div>
    `;
  }, [getIconForCategory, getCategoryDisplayName]);

  // Handle search result selection
  const selectSearchResult = useCallback((result: any) => {
    if (!mapInstance) return;

    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    
    // Double-check that the result is within Jharkhand bounds
    if (!isWithinJharkhandBounds(lat, lng)) {
      if (typeof window !== 'undefined') {
        alert('This location is outside Jharkhand. Please search for locations within Jharkhand state.');
      }
      return;
    }
    
    // Store current search result for popup actions
    setCurrentSearchResult(result);
    
    // Remove previous search marker if it exists
    if (searchMarker && mapInstance.hasLayer(searchMarker)) {
      mapInstance.removeLayer(searchMarker);
    }

    // Add new search marker with enhanced popup
    if (searchIcon && typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        const newSearchMarker = L.marker([lat, lng], {
          icon: searchIcon
        }).addTo(mapInstance);

        const popupContent = createSearchPopupContent(result);
        newSearchMarker.bindPopup(popupContent, {
          maxWidth: 250,
          className: 'custom-popup'
        });
        
        // Open popup immediately
        newSearchMarker.openPopup();
        
        setSearchMarker(newSearchMarker);
      }).catch((error) => {
        console.error('Error creating search marker:', error);
      });
    }

    // Pan and zoom to the location
    mapInstance.setView([lat, lng], 14, {
      animate: true,
      duration: 1
    });

    // Clear search
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  }, [mapInstance, searchMarker, searchIcon, createSearchPopupContent]);

  // Handle search input with proper debouncing
  const handleSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear previous results immediately when typing
    setSearchResults([]);
    setShowResults(false);
    
    // Only search if we have at least 4 characters and it's not just spaces
    if (value.trim().length < 4) {
      return;
    }
    
    // Clear any existing timeout to prevent multiple searches
    if ((window as any).searchTimeout) {
      clearTimeout((window as any).searchTimeout);
    }
    
    // Set new timeout for debounced search
    (window as any).searchTimeout = setTimeout(() => {
      if (searchInputRef.current?.value.trim() === value.trim() && value.trim().length >= 4) {
        searchLocation(value.trim());
      }
    }, 800); // Increased delay to 800ms for better UX
  }, [searchLocation]);

  // Handle search submit - immediate search on enter or button click
  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any pending debounced search
    if ((window as any).searchTimeout) {
      clearTimeout((window as any).searchTimeout);
    }
    
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery.length >= 2) { // Allow manual search with just 2 characters
      setIsSearching(true);
      searchLocation(trimmedQuery);
    } else if (trimmedQuery.length === 0) {
      // Clear results if empty search
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery, searchLocation]);

  // Clear search and cancel any pending searches
  const clearSearch = useCallback(() => {
    // Clear any pending search timeout
    if ((window as any).searchTimeout) {
      clearTimeout((window as any).searchTimeout);
    }
    
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
    setIsSearching(false);
    
    if (searchMarker && mapInstance && mapInstance.hasLayer(searchMarker)) {
      mapInstance.removeLayer(searchMarker);
      setSearchMarker(null);
    }
  }, [searchMarker, mapInstance]);

  if (!mapLoaded || !MapContainer || !TileLayer || !Marker || !Popup || !GeoJSON) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="p-0">
          <div 
            style={{ height: "600px", width: "100%" }}
            className="flex items-center justify-center bg-muted"
          >
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-0 relative jharkhand-map-container">
        {/* Clean Floating Search Bar */}
        <div className="absolute top-6 right-6 z-[1000] w-80 max-w-[calc(100vw-3rem)]">
          {/* Main Search Container */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/30 transition-all duration-200 hover:shadow-xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                {/* Search Icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                
                {/* Search Input */}
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search places in Jharkhand…"
                  value={searchQuery}
                  onChange={handleSearchInput}
                  disabled={isSearching}
                  className="w-full h-12 pl-11 pr-11 bg-transparent border-none rounded-2xl text-gray-800 placeholder-gray-500 font-normal text-sm transition-all duration-200 focus:outline-none disabled:opacity-50"
                  style={{ fontFamily: 'Poppins, Roboto, system-ui, sans-serif' }}
                />
                
                {/* Loading Spinner */}
                {isSearching && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* Clear Button */}
                {searchQuery && !isSearching && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </form>
          </div>
          
          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="mt-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/30 max-h-80 overflow-hidden">
              <div className="py-2">
                <div className="px-4 py-2 border-b border-gray-200/50">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Poppins, Roboto, system-ui, sans-serif' }}>
                    Search Results
                  </p>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {searchResults.map((result, index) => {
                    const categoryIcon = result.icon || getIconForCategory(result.category || 'place');
                    const categoryName = getCategoryDisplayName(result.category || 'place');
                    const placeName = result.name || result.display_name.split(',')[0];
                    const address = result.formattedAddress || result.display_name.split(',').slice(1).join(',').trim();
                    
                    return (
                      <button
                        key={index}
                        onClick={() => selectSearchResult(result)}
                        className="w-full text-left p-3 hover:bg-gray-50 transition-all duration-200 border-b border-gray-100/50 last:border-b-0 group/item"
                      >
                        <div className="flex items-start gap-3">
                          {/* Category Icon */}
                          <div className="flex-shrink-0 w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center group-hover/item:bg-gray-100 transition-all duration-200">
                            <span className="text-base" role="img" aria-label={categoryName}>
                              {categoryIcon}
                            </span>
                          </div>
                          
                          {/* Content */}
                          <div className="min-w-0 flex-1">
                            {/* Place Name */}
                            <p className="text-sm font-medium text-gray-800 truncate group-hover/item:text-blue-600 transition-colors duration-200" style={{ fontFamily: 'Poppins, Roboto, system-ui, sans-serif' }}>
                              {placeName}
                            </p>
                            
                            {/* Category Badge */}
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                result.category === 'accommodation' ? 'bg-purple-100 text-purple-700' :
                                result.category === 'tourism' ? 'bg-green-100 text-green-700' :
                                result.category === 'amenity' ? 'bg-orange-100 text-orange-700' :
                                result.category === 'shop' ? 'bg-pink-100 text-pink-700' :
                                result.category === 'leisure' ? 'bg-emerald-100 text-emerald-700' :
                                'bg-blue-100 text-blue-700'
                              }`} style={{ fontFamily: 'Poppins, Roboto, system-ui, sans-serif' }}>
                                {categoryName}
                              </span>
                              {result.class && result.type && (
                                <span className="text-xs text-gray-400 capitalize" style={{ fontFamily: 'Poppins, Roboto, system-ui, sans-serif' }}>
                                  {result.type.replace(/_/g, ' ')}
                                </span>
                              )}
                            </div>
                            
                            {/* Address */}
                            {address && (
                              <p className="text-xs text-gray-500 truncate mt-1" style={{ fontFamily: 'Poppins, Roboto, system-ui, sans-serif' }}>
                                📍 {address}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          {/* Search Status */}
          {isSearching && (
            <div className="mt-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/30 p-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Poppins, Roboto, system-ui, sans-serif' }}>Searching locations...</p>
              </div>
            </div>
          )}
          
          {/* No Results */}
          {showResults && searchResults.length === 0 && searchQuery.length > 2 && !isSearching && (
            <div className="mt-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/30 p-6 text-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1" style={{ fontFamily: 'Poppins, Roboto, system-ui, sans-serif' }}>No results found in Jharkhand</p>
              <p className="text-xs text-gray-500" style={{ fontFamily: 'Poppins, Roboto, system-ui, sans-serif' }}>Try searching for cities, attractions, or places within Jharkhand state</p>
            </div>
          )}
        </div>

        {/* Jharkhand Focus Indicator Badge */}
        <div className="jharkhand-focus-indicator">
          <div className="flex items-center gap-2">
            <div className="status-dot"></div>
            <span className="main-text">
              📍 Jharkhand State
            </span>
          </div>
          <div className="sub-text">
            {jharkhandBoundary ? 'Jharkhand-focused map' : 'Loading map...'}
          </div>
        </div>

        <MapContainer
          center={[23.35, 85.33]} // Accurate Jharkhand center (Ranchi coordinates)
          zoom={9}
          minZoom={8}
          maxZoom={16}
          style={{ height: "600px", width: "100%" }}
          ref={setMapInstance}
          whenCreated={(mapInstance) => {
            // Set initial view based on Jharkhand boundary if available
            if (jharkhandBoundary && jharkhandBoundary.features && jharkhandBoundary.features[0]) {
              try {
                const bbox = turf.bbox(jharkhandBoundary.features[0]);
                const bounds = [
                  [bbox[1], bbox[0]], // Southwest [lat, lng]
                  [bbox[3], bbox[2]]  // Northeast [lat, lng]
                ];
                mapInstance.fitBounds(bounds, {
                  padding: [30, 30],
                  maxZoom: 11
                });
              } catch (error) {
                console.error('Error fitting to polygon bounds:', error);
                // Accurate Jharkhand bounds fallback
                const bounds = [
                  [21.95, 83.32], // Southwest - more accurate
                  [25.35, 87.9]   // Northeast - more accurate
                ];
                mapInstance.fitBounds(bounds, {
                  padding: [30, 30],
                  maxZoom: 11
                });
              }
            } else {
              // Accurate Jharkhand bounds fallback
              const bounds = [
                [21.95, 83.32], // Southwest - more accurate
                [25.35, 87.9]   // Northeast - more accurate
              ];
              mapInstance.fitBounds(bounds, {
                padding: [30, 30],
                maxZoom: 11
              });
            }
            
            // Add event handlers to enforce polygon bounds
            mapInstance.on('moveend', () => {
              if (!jharkhandBoundary || !jharkhandBoundary.features || !jharkhandBoundary.features[0]) {
                return; // Skip if boundary not loaded
              }
              
              try {
                const center = mapInstance.getCenter();
                const centerPoint = turf.point([center.lng, center.lat]);
                const polygon = jharkhandBoundary.features[0];
                
                // Check if center is outside Jharkhand polygon
                if (!booleanPointInPolygon(centerPoint, polygon)) {
                  // Find the centroid of Jharkhand polygon to navigate back
                  const polygonCentroid = turf.centroid(polygon);
                  const [lng, lat] = polygonCentroid.geometry.coordinates;
                  
                  // Gently guide back to Jharkhand center
                  mapInstance.setView([lat, lng], Math.max(mapInstance.getZoom(), 8), {
                    animate: true,
                    duration: 1
                  });
                }
              } catch (error) {
                console.error('Error in moveend handler:', error);
              }
            });
            
            setMapInstance(mapInstance);
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors | Jharkhand Tourism"
          />
          
          {/* Jharkhand Boundary GeoJSON Layer */}
          {jharkhandBoundary && GeoJSON && (
            <GeoJSON
              data={jharkhandBoundary}
              style={{
                color: 'transparent',
                weight: 0,
                opacity: 0,
                fillColor: 'transparent',
                fillOpacity: 0,
                stroke: false
              }}
              onEachFeature={(feature, layer) => {
                // Hidden boundary for point-in-polygon checking only
                // No popup or interaction
              }}
            />
          )}
          {touristSpots
            .filter((spot) => {
              const inBounds = isWithinJharkhandBounds(spot.lat, spot.lng);
              if (!inBounds && typeof window !== 'undefined') {
                console.warn(`Tourist spot "${spot.name}" is outside Jharkhand bounds: [${spot.lat}, ${spot.lng}]`);
              }
              return inBounds;
            })
            .map((spot) => {
            const directionsUrl = getGoogleMapsUrl(spot.lat, spot.lng);
            const satelliteUrl = getGoogleMapsSatelliteUrl(spot.lat, spot.lng);
            
            return (
              <Marker
                key={spot.id}
                position={[spot.lat, spot.lng]}
                icon={customIcon}
                eventHandlers={{
                  click: () => onLocationSelect(spot.id),
                }}
              >
                <Popup className="custom-popup" maxWidth={400}>
                  <div style={{fontFamily: 'system-ui, sans-serif', minWidth: '350px', maxWidth: '380px'}}>
                    {/* Header */}
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid ' + spot.color}}>
                      <div style={{width: '40px', height: '40px', background: spot.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '16px'}}>
                        {spot.type[0]}
                      </div>
                      <div>
                        <h3 style={{margin: '0', color: '#1f2937', fontSize: '16px', fontWeight: '600'}}>{spot.name}</h3>
                        <span style={{color: spot.color, fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px'}}>{spot.type}</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div style={{marginBottom: '12px'}}>
                      <div style={{maxHeight: '120px', overflowY: 'auto', padding: '8px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
                        <p style={{margin: '0', fontSize: '12px', color: '#374151', lineHeight: '1.5', textAlign: 'justify'}}>
                          {spot.description.length > 300 ? spot.description.substring(0, 300) + '...' : spot.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Best Time Info */}
                    <div style={{background: '#ecfdf5', padding: '8px', borderRadius: '6px', margin: '8px 0', borderLeft: '3px solid ' + spot.color}}>
                      <div style={{color: '#065f46', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Best Time to Visit</div>
                      <div style={{color: '#047857', fontSize: '12px', fontWeight: '500', marginTop: '2px'}}>📅 {spot.bestTime}</div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div style={{marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px'}}>
                      <a href={directionsUrl} target="_blank" 
                         style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white', padding: '8px 12px', 
                                borderRadius: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: '500',
                                transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'}}>
                        🧭 Get Directions
                      </a>
                      <a href={satelliteUrl} target="_blank"
                         style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '8px 12px',
                                borderRadius: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: '500',
                                transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)'}}>
                        📷 Satellite View
                      </a>
                      <button 
                        onClick={() => {
                          setSelectedStreetViewSpot(spot);
                          setShowStreetView(true);
                        }}
                        style={{
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: '8px',
                          background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', 
                          color: 'white', 
                          padding: '8px 12px',
                          border: 'none', 
                          borderRadius: '8px', 
                          fontSize: '12px', 
                          fontWeight: '500', 
                          cursor: 'pointer',
                          transition: 'all 0.2s', 
                          boxShadow: '0 2px 4px rgba(139, 92, 246, 0.3)'
                        }}
                      >
                        🌐 360° View
                      </button>
                    </div>
                    
                    {/* Footer Info */}
                    <div style={{marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #e5e7eb', textAlign: 'center'}}>
                      <div style={{color: '#9ca3af', fontSize: '10px'}}>
                        📍 {spot.lat.toFixed(4)}, {spot.lng.toFixed(4)}
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </CardContent>
      
      {/* 360° Street View Modal */}
      {selectedStreetViewSpot && (
        <StreetViewModal
          isOpen={showStreetView}
          onClose={() => {
            setShowStreetView(false);
            setSelectedStreetViewSpot(null);
          }}
          title={selectedStreetViewSpot.name}
          description={selectedStreetViewSpot.description}
          location={`${selectedStreetViewSpot.type} • Jharkhand, India`}
          lat={selectedStreetViewSpot.lat}
          lng={selectedStreetViewSpot.lng}
        />
      )}
    </Card>
  );
}
