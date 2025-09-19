"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation, RotateCcw, ZoomIn, ZoomOut, AlertCircle } from "lucide-react";

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

interface SimpleMapProps {
  touristSpots: TouristSpot[];
  onLocationSelect: (locationId: string) => void;
  selectedLocationId?: string | null;
}

export function SimpleMap({ touristSpots, onLocationSelect, selectedLocationId }: SimpleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [leafletMap, setLeafletMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        // Import CSS first
        if (typeof document !== 'undefined') {
          const existingLink = document.querySelector('link[href*="leaflet"]');
          if (!existingLink) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
            link.crossOrigin = '';
            document.head.appendChild(link);
          }
        }

        // Dynamic import of Leaflet
        const L = (await import("leaflet")).default;

        if (mapRef.current && !leafletMap) {
          console.log('Initializing Leaflet map...');
          // Initialize map
          const map = L.map(mapRef.current).setView([23.6102, 85.2799], 8);
          
          // Add tile layer
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);

          // Create markers
          const newMarkers: any[] = [];
          
          touristSpots.forEach((spot) => {
            const customIcon = L.divIcon({
              html: `<div style="
                background-color: ${spot.color};
                width: 16px;
                height: 16px;
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              "></div>`,
              className: 'custom-marker',
              iconSize: [16, 16],
              iconAnchor: [8, 8]
            });

            const marker = L.marker([spot.lat, spot.lng], { icon: customIcon }).addTo(map);
            
            marker.bindPopup(`
              <div style="max-width: 200px;">
                <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">${spot.name}</h3>
                <p style="margin: 0 0 8px 0; background: #f3f4f6; padding: 4px 8px; border-radius: 12px; display: inline-block; font-size: 12px; color: #6b7280;">${spot.type}</p>
                <p style="margin: 0 0 8px 0; font-size: 13px; line-height: 1.4; color: #4b5563;">${spot.description.substring(0, 100)}${spot.description.length > 100 ? '...' : ''}</p>
                <p style="margin: 0; font-size: 12px; font-weight: 500; color: #059669;">Best Time: ${spot.bestTime}</p>
              </div>
            `);

            marker.on('click', () => {
              onLocationSelect(spot.id);
            });

            newMarkers.push({ marker, spot });
          });

          setMarkers(newMarkers);
          setLeafletMap(map);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error('Error loading map:', error);
        setIsLoaded(true); // Show error state instead of infinite loading
      }
    };

    loadLeaflet();
  }, []);

  // Handle selected location
  useEffect(() => {
    if (leafletMap && selectedLocationId) {
      const selectedSpot = touristSpots.find(spot => spot.id === selectedLocationId);
      if (selectedSpot) {
        leafletMap.setView([selectedSpot.lat, selectedSpot.lng], 12);
        
        // Find and open the marker popup
        const markerData = markers.find(m => m.spot.id === selectedLocationId);
        if (markerData) {
          markerData.marker.openPopup();
        }
      }
    }
  }, [selectedLocationId, leafletMap, touristSpots, markers]);

  const resetView = () => {
    if (leafletMap) {
      leafletMap.setView([23.6102, 85.2799], 8);
    }
  };

  const zoomIn = () => {
    if (leafletMap) {
      leafletMap.zoomIn();
    }
  };

  const zoomOut = () => {
    if (leafletMap) {
      leafletMap.zoomOut();
    }
  };

  const fitAllMarkers = () => {
    if (leafletMap && touristSpots.length > 0) {
      const group = markers.map(m => m.marker);
      const leafletGroup = (window as any).L?.featureGroup(group);
      if (leafletGroup) {
        leafletMap.fitBounds(leafletGroup.getBounds(), { padding: [20, 20] });
      }
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-0">
        <div className="relative">
          <div 
            ref={mapRef} 
            className="w-full rounded-lg"
            style={{ height: '600px' }}
          />
          
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading map...</p>
              </div>
            </div>
          )}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={resetView}
              className="bg-white/90 hover:bg-white"
              title="Reset View"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button
              size="sm"
              variant="secondary"
              onClick={zoomIn}
              className="bg-white/90 hover:bg-white"
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
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
              onClick={fitAllMarkers}
              className="bg-white/90 hover:bg-white"
              title="Fit All Locations"
            >
              <Navigation className="h-4 w-4" />
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
      </CardContent>
    </Card>
  );
}