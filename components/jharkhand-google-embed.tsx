"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Expand, Minimize2, RotateCcw, AlertCircle, X } from 'lucide-react';
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

interface JharkhandGoogleEmbedProps {
  touristSpots: TouristSpot[];
  onLocationSelect: (locationId: string) => void;
}

export function JharkhandGoogleEmbed({ touristSpots, onLocationSelect }: JharkhandGoogleEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [streetViewModal, setStreetViewModal] = useState<{
    isOpen: boolean;
    spot: TouristSpot | null;
  }>({ isOpen: false, spot: null });

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  // Get placeholder image URL for tourist spots
  const getSpotImage = (spot: TouristSpot) => {
    // For demo purposes, using placeholder images. In production, you'd have actual images
    const imageMap: { [key: string]: string } = {
      'Waterfall': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      'Hill Station': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      'Temple': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
      'Wildlife': 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=250&fit=crop',
      'City': 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=250&fit=crop',
      'Dam': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop'
    };
    return imageMap[spot.type] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop';
  };
  
  // Jharkhand coordinates as specified
  const jharkhandCenter = {
    lat: 23.6102,
    lng: 85.2799
  };

  // Create Google Maps URL with Jharkhand focus
  const getJharkhandMapUrl = () => {
    if (!apiKey) {
      console.warn('Google Maps API key not found. Using fallback URL.');
      // Fallback URL without API key (limited functionality but still works)
      // Fallback with basic Jharkhand focus
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1855849.6!2d85.28!3d23.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e104aa5db7dd%3A0x69d72c84e3d6e200!2sJharkhand!5e0!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin`;
    }
    
    // Use the search mode to show Jharkhand state with proper boundaries
    // This will show Jharkhand with its boundaries clearly marked
    return `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=Jharkhand+India&zoom=8&center=23.6102,85.2799`;
  };

  const handleIframeLoad = () => {
    console.log('Jharkhand Google Maps loaded successfully');
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    console.error('Failed to load Jharkhand Google Maps');
    setIsLoading(false);
    setHasError(true);
  };

  const reloadMap = () => {
    setIsLoading(true);
    setHasError(false);
    // Force iframe reload by changing the src
    const iframe = document.getElementById('jharkhand-map') as HTMLIFrameElement;
    if (iframe) {
      const currentSrc = iframe.src;
      iframe.src = '';
      setTimeout(() => {
        iframe.src = currentSrc;
      }, 100);
    }
  };

  const toggleFullscreen = () => {
    const mapContainer = document.getElementById('map-container');
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

  // Listen for fullscreen changes
  React.useEffect(() => {
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
              To display the Jharkhand map, please configure your Google Maps API key in the environment variables.
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
    <div 
      id="map-container"
      className={`relative w-full h-full bg-gray-100 rounded-lg overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Jharkhand Map</h3>
            <p className="text-gray-600 mb-4">
              Google Maps Embed API • Jharkhand, India
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
              Unable to load the Jharkhand map. This might be due to network issues or API limitations.
            </p>
            <Button onClick={reloadMap} className="bg-blue-600 hover:bg-blue-700 text-white">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* Google Maps Iframe - Exact specifications as requested */}
      <iframe
        id="jharkhand-map"
        src={getJharkhandMapUrl()}
        width="100%"
        height="600px"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Jharkhand State Map - Google Maps Embed"
        className="w-full h-full"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />

      {/* Tourist Spots Quick Access Panel */}
      {!isLoading && !hasError && (
        <div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm">
          <h4 className="text-sm font-bold text-gray-800 mb-3">🎯 Tourist Spots</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {touristSpots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setSelectedSpot(spot)}
                className="w-full text-left p-2 hover:bg-gray-100 rounded text-xs transition-colors flex items-center gap-2"
                title={`Click to view ${spot.name} details`}
              >
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: spot.color }}
                >
                  {spot.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{spot.name}</div>
                  <div className="text-gray-500">{spot.type}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500 text-center">
            📍 Click any spot to get directions and explore
          </div>
        </div>
      )}

      {/* Detailed Spot Information Modal */}
      {selectedSpot && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header with Image */}
            <div className="relative">
              <img 
                src={getSpotImage(selectedSpot)}
                alt={selectedSpot.name}
                className="w-full h-48 object-cover rounded-t-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop';
                }}
              />
              <button
                onClick={() => setSelectedSpot(null)}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded-full">
                <span className="text-white text-sm font-medium">
                  {selectedSpot.type === 'Waterfall' ? '💧' : 
                   selectedSpot.type === 'Hill Station' ? '⛰️' : 
                   selectedSpot.type === 'Temple' ? '🛕' : 
                   selectedSpot.type === 'Wildlife' ? '🌲' : 
                   selectedSpot.type === 'City' ? '🏙️' : 
                   selectedSpot.type === 'Dam' ? '🌊' : '📍'} {selectedSpot.type}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedSpot.name}</h2>
              
              {/* Brief Description */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">About</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {selectedSpot.description.length > 200 
                    ? selectedSpot.description.substring(0, 200) + '...' 
                    : selectedSpot.description
                  }
                </p>
              </div>

              {/* Best Time */}
              <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-blue-800">
                  <span>📅</span>
                  <span className="font-medium">Best Time to Visit:</span>
                  <span>{selectedSpot.bestTime}</span>
                </div>
              </div>

              {/* Three Action Options */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Explore Options</h3>
                
                {/* 1. Satellite View */}
                <Button
                  onClick={() => {
                    const satelliteUrl = `https://www.google.com/maps/@${selectedSpot.lat},${selectedSpot.lng},18z/data=!3m1!1e3`;
                    window.open(satelliteUrl, '_blank');
                  }}
                  className="w-full flex items-center justify-start gap-3 p-4 bg-green-500 hover:bg-green-600 text-white"
                >
                  <span className="text-xl">🛰️</span>
                  <div className="text-left">
                    <div className="font-semibold">Satellite View</div>
                    <div className="text-sm opacity-90">See aerial view of this location</div>
                  </div>
                </Button>

                {/* 2. Street View */}
                <Button
                  onClick={() => {
                    setStreetViewModal({ isOpen: true, spot: selectedSpot });
                    setSelectedSpot(null);
                  }}
                  className="w-full flex items-center justify-start gap-3 p-4 bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <span className="text-xl">👁️</span>
                  <div className="text-left">
                    <div className="font-semibold">Street View</div>
                    <div className="text-sm opacity-90">360° view on this page</div>
                  </div>
                </Button>

                {/* 3. Navigate */}
                <Button
                  onClick={() => {
                    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${selectedSpot.lat},${selectedSpot.lng}`;
                    window.open(directionsUrl, '_blank');
                  }}
                  className="w-full flex items-center justify-start gap-3 p-4 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <span className="text-xl">🧭</span>
                  <div className="text-left">
                    <div className="font-semibold">Navigate</div>
                    <div className="text-sm opacity-90">Get directions in Google Maps</div>
                  </div>
                </Button>
              </div>

              {/* Coordinates Info */}
              <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
                <span className="font-mono">{selectedSpot.lat.toFixed(6)}, {selectedSpot.lng.toFixed(6)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button
          onClick={reloadMap}
          className="px-4 py-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg backdrop-blur-sm"
          title="Reload map"
          disabled={isLoading}
        >
          <RotateCcw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Reload
        </Button>

        <Button
          onClick={toggleFullscreen}
          className="px-4 py-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg backdrop-blur-sm"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4 mr-2" /> : <Expand className="w-4 h-4 mr-2" />}
          {isFullscreen ? 'Exit' : 'Fullscreen'}
        </Button>
      </div>






    </div>
  );
}