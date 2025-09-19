"use client";

import { useState, useEffect } from "react";
import { InteractiveJharkhandMap } from "./interactive-jharkhand-map";
import { SimpleMap } from "./simple-map";
import { StaticMap } from "./static-map";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, MapPin } from "lucide-react";

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

interface MapWrapperProps {
  touristSpots: TouristSpot[];
  onLocationSelect: (locationId: string) => void;
  selectedLocationId?: string | null;
}

export function MapWrapper({ touristSpots, onLocationSelect, selectedLocationId }: MapWrapperProps) {
  const [isClient, setIsClient] = useState(false);
  const [useGoogleMaps, setUseGoogleMaps] = useState(true); // Try Google Maps first
  const [mapError, setMapError] = useState(false);
  const [mapLoadTimeout, setMapLoadTimeout] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check the Google Maps API key
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (apiKey && apiKey.trim().length > 30) {
      // Try Google Maps first with a timeout
      setUseGoogleMaps(true);
      setMapError(false);
      
      const timeout = setTimeout(() => {
        console.log('Google Maps taking too long, switching to fallback');
        setMapLoadTimeout(true);
        setUseGoogleMaps(false);
      }, 8000);
      
      return () => clearTimeout(timeout);
    } else {
      // Use StaticMap directly if no proper API key
      setUseGoogleMaps(false);
    }
  }, []);

  if (!isClient) {
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

  // Handler for when Google Maps fails to load
  const handleMapError = () => {
    console.log('MapWrapper: Google Maps failed to load, switching to StaticMap');
    setMapError(true);
    setUseGoogleMaps(false);
  };
  
  // Handler for when Google Maps loads successfully
  const handleMapSuccess = () => {
    console.log('MapWrapper: Google Maps loaded successfully');
    setMapError(false);
  };

  // If Google Maps should be used and no error occurred
  if (useGoogleMaps && !mapError && !mapLoadTimeout) {
    return (
      <div>
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <p className="text-sm text-blue-700">
              <span className="font-medium">Loading Google Maps...</span> This may take a few seconds. Map includes 360° Street View for tourist attractions.
            </p>
          </div>
        </div>
        <Card className="border-border bg-card">
          <CardContent className="p-0">
            <div style={{ height: "600px", width: "100%" }}>
              <InteractiveJharkhandMap
                touristSpots={touristSpots} 
                onLocationSelect={onLocationSelect}
                selectedLocationId={selectedLocationId}
                onError={handleMapError}
                onSuccess={handleMapSuccess}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Use StaticMap as fallback when Google Maps is not available
  return (
    <div>
      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <p className="text-sm text-amber-700">
            <span className="font-medium">Fallback Map:</span> 
            {mapLoadTimeout ? 'Google Maps timed out after 5 seconds.' : 
             mapError ? 'Google Maps failed to load.' : 'Google Maps unavailable.'}
            {' '}Using interactive fallback map with all tourist attractions.
          </p>
        </div>
      </div>
      <StaticMap
        touristSpots={touristSpots}
        onLocationSelect={onLocationSelect}
        selectedLocationId={selectedLocationId}
      />
    </div>
  );
}
