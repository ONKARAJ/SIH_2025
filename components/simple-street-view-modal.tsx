"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { X, Maximize2, Minimize2, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SimpleStreetViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  location?: string;
  lat: number;
  lng: number;
}

export function SimpleStreetViewModal({
  isOpen,
  onClose,
  title,
  description,
  location,
  lat,
  lng
}: SimpleStreetViewModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'satellite' | 'streetview'>('satellite');
  const [streetViewError, setStreetViewError] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Handle close
  const handleClose = useCallback(() => {
    setIsFullscreen(false);
    setIsLoading(true);
    setCurrentView('satellite');
    setStreetViewError(false);
    onClose();
  }, [onClose]);

  // Toggle fullscreen
  const handleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.log('Fullscreen not supported:', error);
      setIsFullscreen(!isFullscreen);
    }
  }, [isFullscreen]);

  // Handle keyboard events
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  // Reset loading when view changes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setStreetViewError(false);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentView]);

  if (!isOpen) return null;

  // Generate URLs
  const satelliteUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${lat},${lng}&zoom=19&maptype=satellite`
    : '';

  const streetViewUrl = apiKey
    ? `https://maps.googleapis.com/maps/api/streetview?size=1200x800&location=${lat},${lng}&heading=0&pitch=0&fov=90&key=${apiKey}`
    : '';

  const directStreetViewUrl = `https://www.google.com/maps/@${lat},${lng},3a,75y,90t/data=!3m6!1e1!3m4!1s0x0:0x0!2e0!7i16384!8i8192`;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`relative w-full h-full bg-card rounded-xl overflow-hidden shadow-2xl ${
        isFullscreen ? 'max-w-full max-h-full' : 'max-w-7xl max-h-[90vh]'
      }`}>
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
              {location && (
                <Badge variant="secondary" className="mb-2">
                  📍 {location}
                </Badge>
              )}
              <Badge variant="outline" className="bg-black/30 text-white border-white/30">
                📍 {lat.toFixed(6)}, {lng.toFixed(6)}
              </Badge>
              {description && (
                <p className="text-white/90 text-sm max-w-2xl mt-2">{description}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-white hover:bg-white/20 h-10 w-10 p-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* View Switcher */}
        <div className="absolute top-20 left-4 z-10">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2 space-y-1">
            <Button
              variant={currentView === 'satellite' ? "default" : "secondary"}
              size="sm"
              onClick={() => setCurrentView('satellite')}
              className={`w-full text-xs ${
                currentView === 'satellite' 
                  ? "bg-green-500 hover:bg-green-600 text-white" 
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
            >
              🛰️ Satellite
            </Button>
            
            <Button
              variant={currentView === 'streetview' ? "default" : "secondary"}
              size="sm"
              onClick={() => setCurrentView('streetview')}
              className={`w-full text-xs ${
                currentView === 'streetview' 
                  ? "bg-blue-500 hover:bg-blue-600 text-white" 
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
            >
              🌍 Street View
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full h-full relative">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center z-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Loading {currentView === 'streetview' ? 'Street View' : 'Satellite View'}
                </h3>
                <p className="text-gray-600 mb-4">Initializing view for {title}...</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span className="font-mono">{lat.toFixed(6)}, {lng.toFixed(6)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          {apiKey ? (
            <div className="w-full h-full">
              {currentView === 'satellite' ? (
                // Satellite view - always reliable
                <iframe
                  key={`satellite-${lat}-${lng}`}
                  src={satelliteUrl}
                  className="w-full h-full rounded-b-xl border-0"
                  style={{ minHeight: '500px', border: 'none' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Satellite View of ${title}`}
                  allowFullScreen
                  onLoad={() => {
                    console.log('Satellite view loaded successfully');
                    setTimeout(() => setIsLoading(false), 1000);
                  }}
                />
              ) : (
                // Street View as image
                <div className="w-full h-full bg-black flex items-center justify-center relative">
                  <img
                    key={`streetview-${lat}-${lng}`}
                    src={streetViewUrl}
                    alt={`Street View of ${title}`}
                    className="max-w-full max-h-full object-contain"
                    onLoad={() => {
                      console.log('Street View image loaded');
                      setStreetViewError(false);
                      setTimeout(() => setIsLoading(false), 500);
                    }}
                    onError={() => {
                      console.log('Street View not available for this location');
                      setStreetViewError(true);
                      setTimeout(() => setIsLoading(false), 500);
                    }}
                  />
                  
                  {/* Street View Error Message */}
                  {streetViewError && !isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                      <div className="text-center text-white p-8">
                        <div className="text-6xl mb-4">🚫</div>
                        <h3 className="text-xl font-bold mb-4">Street View Not Available</h3>
                        <p className="text-gray-300 mb-6">
                          Street View imagery is not available for this location.<br/>
                          This area may not have been mapped by Google Street View.
                        </p>
                        <div className="space-y-2">
                          <Button
                            onClick={() => setCurrentView('satellite')}
                            className="bg-green-500 hover:bg-green-600 text-white mr-2"
                          >
                            🛰️ View Satellite Image
                          </Button>
                          <Button
                            onClick={() => window.open(directStreetViewUrl, '_blank')}
                            variant="outline"
                            className="text-white border-white hover:bg-white hover:text-black"
                          >
                            🔗 Try Google Maps
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="text-center p-8 max-w-md">
                <div className="text-6xl mb-4">🔑</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">API Key Required</h3>
                <p className="text-gray-600 mb-6">
                  Google Maps API key is required to display views.
                </p>
                <Button 
                  onClick={() => window.open(directStreetViewUrl, '_blank')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Open in Google Maps
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="absolute bottom-6 right-6 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.open(directStreetViewUrl, '_blank')}
            className="bg-black/50 text-white border-white/20 hover:bg-black/70"
            title="Open in Google Maps"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Google Maps
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={handleFullscreen}
            className="bg-black/50 text-white border-white/20 hover:bg-black/70"
            title="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4 mr-2" /> : <Maximize2 className="h-4 w-4 mr-2" />}
            {isFullscreen ? 'Exit' : 'Full'}
          </Button>
        </div>

        {/* Location Info */}
        {!isLoading && (
          <div className="absolute bottom-4 left-4 z-10">
            <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{title}</span>
                <span className="text-gray-300">|</span>
                <span className="font-mono text-xs">{lat.toFixed(6)}, {lng.toFixed(6)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Status indicator */}
        {!isLoading && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-medium">
              {currentView === 'streetview' ? '🌍 Street View' : '🛰️ Satellite'}
              {streetViewError && currentView === 'streetview' && (
                <span className="text-red-400 ml-2">• Not Available</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}