"use client";

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Expand, Minimize2, Map, Satellite, RotateCcw } from 'lucide-react';
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

interface JharkhandGoogleMapsIframeProps {
  touristSpots: TouristSpot[];
  onLocationSelect: (locationId: string) => void;
}

export function JharkhandGoogleMapsIframe({ touristSpots, onLocationSelect }: JharkhandGoogleMapsIframeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [streetViewModal, setStreetViewModal] = useState<{
    isOpen: boolean;
    spot: TouristSpot | null;
  }>({ isOpen: false, spot: null });
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  // Jharkhand center coordinates
  const jharkhandCenter = {
    lat: 23.7,
    lng: 85.6167
  };

  // Create Google Maps Embed URL for Jharkhand
  const getMapUrl = () => {
    if (!apiKey) return '';
    
    const baseUrl = 'https://www.google.com/maps/embed/v1/view';
    const params = new URLSearchParams({
      key: apiKey,
      center: `${jharkhandCenter.lat},${jharkhandCenter.lng}`,
      zoom: '10', // Much higher zoom to show ONLY Jharkhand state
      maptype: mapType,
      language: 'en',
      region: 'IN'
    });
    
    return `${baseUrl}?${params.toString()}`;
  };

  // Alternative URLs to try for better Jharkhand focus
  const getAlternativeMapUrls = () => {
    if (!apiKey) return [];
    
    return [
      // Main Jharkhand view
      {
        name: "Jharkhand State View",
        url: `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${jharkhandCenter.lat},${jharkhandCenter.lng}&zoom=10&maptype=${mapType}`
      },
      // Search-based approach for Jharkhand
      {
        name: "Jharkhand Search",
        url: `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=Jharkhand+India&zoom=10&maptype=${mapType}`
      },
      // Place-based approach for Ranchi (capital)
      {
        name: "Ranchi Centered",
        url: `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Ranchi,Jharkhand&zoom=9&maptype=${mapType}`
      },
      // Custom embed with tight Jharkhand bounds only
      {
        name: "Jharkhand Only View",
        url: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d927924.8180922821!2d85.11670000000001!3d23.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e104aa5db7dd%3A0x69d72c84e3d6e200!2sJharkhand!5e0!3m2!1sen!2sin!4v1642678901234!5m2!1sen!2sin`
      }
    ];
  };

  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const alternativeUrls = getAlternativeMapUrls();
  const currentMapUrl = alternativeUrls[currentUrlIndex]?.url || getMapUrl();

  const handleIframeLoad = () => {
    console.log('Google Maps iframe loaded successfully');
    setIsLoading(false);
  };

  const handleIframeError = () => {
    console.log('Google Maps iframe failed to load, trying next approach...');
    if (currentUrlIndex < alternativeUrls.length - 1) {
      setCurrentUrlIndex(prev => prev + 1);
    } else {
      setIsLoading(false);
    }
  };

  const toggleMapType = () => {
    setMapType(prev => prev === 'roadmap' ? 'satellite' : 'roadmap');
  };

  const resetToFirst = () => {
    setCurrentUrlIndex(0);
    setIsLoading(true);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const handleSpotClick = useCallback((spot: TouristSpot) => {
    setSelectedSpot(spot);
    onLocationSelect(spot.id);
    // Create a focused map URL for this specific location
    window.open(`https://www.google.com/maps/place/${spot.lat},${spot.lng}/@${spot.lat},${spot.lng},15z`, '_blank');
  }, [onLocationSelect]);

  const handleStreetView = useCallback((spot: TouristSpot) => {
    setStreetViewModal({ isOpen: true, spot });
  }, []);

  if (!apiKey) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-red-50 to-orange-100 rounded-lg overflow-hidden">
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🔑</div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">API Key Required</h3>
            <p className="text-gray-600 mb-6">Google Maps API key is required to display the map.</p>
            <Button onClick={() => window.open('https://console.cloud.google.com/apis/credentials', '_blank')}>
              Get API Key
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Jharkhand Map</h3>
            <p className="text-gray-600 mb-4">
              {alternativeUrls[currentUrlIndex]?.name || 'Google Maps'}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span className="font-mono">{jharkhandCenter.lat.toFixed(4)}, {jharkhandCenter.lng.toFixed(4)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Google Maps Iframe */}
      <iframe
        key={`jharkhand-map-${currentUrlIndex}-${mapType}`}
        src={currentMapUrl}
        className="w-full h-full border-0"
        style={{ minHeight: '600px' }}
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        title="Jharkhand State Map - Google Maps"
        allowFullScreen
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />

      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button
          onClick={toggleMapType}
          className="px-4 py-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg"
          title={`Switch to ${mapType === 'roadmap' ? 'Satellite' : 'Map'} view`}
        >
          {mapType === 'roadmap' ? (
            <>
              <Satellite className="w-4 h-4 mr-2" />
              Satellite
            </>
          ) : (
            <>
              <Map className="w-4 h-4 mr-2" />
              Map
            </>
          )}
        </Button>

        <Button
          onClick={resetToFirst}
          className="px-4 py-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg"
          title="Reset map view"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Fullscreen Button */}
      <div className="absolute bottom-4 left-4 z-10">
        <Button
          onClick={toggleFullscreen}
          className="px-4 py-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4 mr-2" /> : <Expand className="w-4 h-4 mr-2" />}
          {isFullscreen ? 'Exit' : 'Fullscreen'}
        </Button>
      </div>


      {/* Instructions */}
      <div className="absolute top-4 right-4 z-10 max-w-xs">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg p-3">
          <div className="space-y-1 text-xs text-gray-600">
            <div className="font-semibold text-gray-800 mb-1">📍 Jharkhand State Map</div>
            <div>• Interactive Google Maps focused on Jharkhand</div>
            <div>• Use sidebar for tourist spot details</div>
            <div>• Switch between Map and Satellite view</div>
            <div>• Zoom level optimized for Jharkhand only</div>
          </div>
        </div>
      </div>

      {/* Map Type Indicator */}
      <div className="absolute top-16 left-4 z-10">
        <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-medium">
          {alternativeUrls[currentUrlIndex]?.name || 'Google Maps'} - {mapType === 'roadmap' ? 'Map' : 'Satellite'} View
        </div>
      </div>

      {/* Street View Modal */}
      {streetViewModal.isOpen && streetViewModal.spot && (
        <IframeStreetView
          isOpen={streetViewModal.isOpen}
          onClose={() => setStreetViewModal({ isOpen: false, spot: null })}
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