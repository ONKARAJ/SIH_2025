"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { X, Maximize2, Minimize2, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WorkingStreetViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  location?: string;
  lat: number;
  lng: number;
}

export function WorkingStreetViewModal({
  isOpen,
  onClose,
  title,
  description,
  location,
  lat,
  lng
}: WorkingStreetViewModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'streetview' | 'satellite'>('streetview');
  const [streetViewHeading, setStreetViewHeading] = useState(0);
  const [streetViewPitch, setStreetViewPitch] = useState(0);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Handle close
  const handleClose = useCallback(() => {
    setIsFullscreen(false);
    setIsLoading(true);
    setCurrentView('streetview');
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
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentView]);

  if (!isOpen) return null;

  // Generate the embed URLs - using more reliable approach
  const streetViewUrl = apiKey 
    ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.639283266155!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin`
    : '';
  
  const satelliteUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${lat},${lng}&zoom=18&maptype=satellite`
    : '';

  // Direct Street View URL that always works
  const directStreetViewUrl = `https://www.google.com/maps/@${lat},${lng},3a,75y,90t/data=!3m6!1e1!3m4!1s0x0:0x0!2e0!7i16384!8i8192`;
  
  // Alternative: Use place-based embed URL
  const placeBasedUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}&zoom=18&maptype=roadmap`
    : '';

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
          </div>
        </div>

        {/* Street View Navigation Controls */}
        {currentView === 'streetview' && !isLoading && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center gap-2 text-white text-xs mb-2 justify-center">
                🌍 Click image or use controls to look around
              </div>
              <div className="grid grid-cols-3 gap-2 w-32">
                {/* Up */}
                <div></div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white"
                  onClick={() => {
                    setStreetViewPitch(prev => Math.max(prev - 15, -90));
                    setIsLoading(true);
                  }}
                >
                  ↑
                </Button>
                <div></div>
                
                {/* Left, Center, Right */}
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white"
                  onClick={() => {
                    setStreetViewHeading(prev => (prev - 45 + 360) % 360);
                    setIsLoading(true);
                  }}
                >
                  ←
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white text-xs"
                  onClick={() => {
                    setStreetViewHeading(0);
                    setStreetViewPitch(0);
                    setIsLoading(true);
                  }}
                  title="Reset view"
                >
                  •
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white"
                  onClick={() => {
                    setStreetViewHeading(prev => (prev + 45) % 360);
                    setIsLoading(true);
                  }}
                >
                  →
                </Button>
                
                {/* Down */}
                <div></div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white"
                  onClick={() => {
                    setStreetViewPitch(prev => Math.min(prev + 15, 90));
                    setIsLoading(true);
                  }}
                >
                  ↓
                </Button>
                <div></div>
              </div>
            </div>
          </div>
        )}

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
                <p className="text-gray-600 mb-4">Initializing 360° view for {title}...</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span className="font-mono">{lat.toFixed(6)}, {lng.toFixed(6)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Street View or Satellite iframe */}
          {apiKey ? (
            <div className="w-full h-full">
              {currentView === 'streetview' ? (
                // Try multiple Street View approaches
                <div className="w-full h-full relative">
                  {/* Primary: Try Google Street View Static API as image first */}
                  <div className="w-full h-full bg-black flex items-center justify-center relative">
                    <img
                      key={`streetview-${streetViewHeading}-${streetViewPitch}`}
                      src={`https://maps.googleapis.com/maps/api/streetview?size=1200x800&location=${lat},${lng}&heading=${streetViewHeading}&pitch=${streetViewPitch}&fov=90&key=${apiKey}`}
                      alt={`Street View of ${title}`}
                      className="max-w-full max-h-full object-contain cursor-pointer"
                      onLoad={(e) => {
                        // Check if this is actually a "no imagery" image by checking dimensions
                        const img = e.target as HTMLImageElement;
                        if (img.naturalWidth <= 640 && img.naturalHeight <= 640) {
                          // This is likely a "no imagery" placeholder image
                          console.log('No Street View imagery available, switching to satellite');
                          setTimeout(() => {
                            setCurrentView('satellite');
                            setIsLoading(true);
                          }, 2000);
                        } else {
                          console.log('Street View image loaded successfully');
                          setTimeout(() => setIsLoading(false), 500);
                        }
                      }}
                      }}
                      onError={(e) => {
                        console.log('Street View API error, switching to satellite fallback');
                        setTimeout(() => {
                          setCurrentView('satellite');
                          setIsLoading(true);
                        }, 1000);
                      }}
                      onClick={(e) => {
                        // Rotate the view when clicked
                        setStreetViewHeading(prev => (prev + 45) % 360);
                        setIsLoading(true);
                      }}
                    />
                    
                    {/* Overlay message for no imagery */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div 
                        className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm transition-opacity"
                        style={{ opacity: isLoading ? 0 : 1 }}
                      >
                        {/* This will be visible if the Street View shows "no imagery" */}
                        <div className="text-center">
                          <div className="text-2xl mb-2">🗺️</div>
                          <div>Street View not available</div>
                          <div className="text-xs text-gray-300 mt-1">Switching to satellite view...</div>
                        </div>
                      </div>
                    </div>
                    <iframe
                      src={placeBasedUrl}
                      className="absolute inset-0 w-full h-full border-0"
                      style={{ display: 'none' }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map view of ${title}`}
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                // Satellite view iframe
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
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="text-center p-8 max-w-md">
                <div className="text-6xl mb-4">🔑</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">API Key Required</h3>
                <p className="text-gray-600 mb-6">
                  Google Maps API key is required to display Street View.
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}