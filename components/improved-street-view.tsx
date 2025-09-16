"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Maximize2, Minimize2, MapPin, RotateCcw, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ImprovedStreetViewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  location?: string;
  lat: number;
  lng: number;
  onPositionChange?: (lat: number, lng: number) => void;
}

export function ImprovedStreetView({
  isOpen,
  onClose,
  title,
  description,
  location,
  lat,
  lng,
  onPositionChange
}: ImprovedStreetViewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'streetview' | 'satellite' | 'roadmap' | 'static'>('streetview');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentLat, setCurrentLat] = useState(lat);
  const [currentLng, setCurrentLng] = useState(lng);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const staticImageRef = useRef<HTMLImageElement>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Reset coordinates when props change
  useEffect(() => {
    if (isOpen) {
      setCurrentLat(lat);
      setCurrentLng(lng);
    }
  }, [isOpen, lat, lng]);

  // Handle close
  const handleClose = useCallback(() => {
    setIsFullscreen(false);
    setIsLoading(true);
    setCurrentView('streetview');
    setLoadError(null);
    setCurrentLat(lat);
    setCurrentLng(lng);
    onClose();
  }, [onClose, lat, lng]);

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

  // Generate URLs for different view modes
  const generateUrls = useCallback(() => {
    if (!apiKey) return {};

    return {
      streetview: `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${currentLat},${currentLng}&heading=0&pitch=0&fov=90`,
      satellite: `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${currentLat},${currentLng}&zoom=19&maptype=satellite`,
      roadmap: `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${currentLat},${currentLng}&zoom=17&maptype=roadmap`,
      staticStreetView: `https://maps.googleapis.com/maps/api/streetview?size=800x600&location=${currentLat},${currentLng}&heading=0&pitch=0&fov=90&key=${apiKey}`,
      directLink: `https://maps.google.com/?q=${currentLat},${currentLng}&layer=c&cbll=${currentLat},${currentLng}`
    };
  }, [apiKey, currentLat, currentLng]);

  // Handle iframe load
  const handleIframeLoad = useCallback(() => {
    console.log(`${currentView} iframe loaded successfully`);
    setIsLoading(false);
    setLoadError(null);
  }, [currentView]);

  // Handle iframe error
  const handleIframeError = useCallback(() => {
    console.log(`${currentView} iframe failed to load`);
    setLoadError(`Failed to load ${currentView} view`);
    setIsLoading(false);
    
    // Auto-fallback strategy
    if (currentView === 'streetview') {
      console.log('Falling back to static Street View image');
      setCurrentView('static');
    }
  }, [currentView]);

  // Handle static image load
  const handleStaticImageLoad = useCallback(() => {
    console.log('Static Street View image loaded successfully');
    setIsLoading(false);
    setLoadError(null);
  }, []);

  // Handle static image error
  const handleStaticImageError = useCallback(() => {
    console.log('Static Street View image failed to load');
    setLoadError('Street View not available for this location');
    setIsLoading(false);
    // Final fallback to satellite view
    setTimeout(() => {
      setCurrentView('satellite');
      setLoadError(null);
      setIsLoading(true);
    }, 2000);
  }, []);

  // Switch view mode
  const switchView = useCallback((newView: typeof currentView) => {
    console.log(`Switching to ${newView} view`);
    setCurrentView(newView);
    setIsLoading(true);
    setLoadError(null);
  }, []);

  // Reset to original position
  const handleReset = useCallback(() => {
    console.log('Resetting to original position');
    setCurrentLat(lat);
    setCurrentLng(lng);
    setIsLoading(true);
    setLoadError(null);
  }, [lat, lng]);

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

  // Auto-hide loading after timeout
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        console.log('Loading timeout reached');
        setIsLoading(false);
      }, 8000);
      
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (!isOpen) return null;

  const urls = generateUrls();

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
              <div className="flex items-center gap-4 mb-2">
                <Badge variant="outline" className="bg-black/30 text-white border-white/30">
                  📍 {currentLat.toFixed(6)}, {currentLng.toFixed(6)}
                </Badge>
                {currentView === 'streetview' && (
                  <Badge variant="outline" className="bg-blue-500/30 text-blue-100 border-blue-400/30">
                    🌍 Street View
                  </Badge>
                )}
                {currentView === 'satellite' && (
                  <Badge variant="outline" className="bg-green-500/30 text-green-100 border-green-400/30">
                    🛰️ Satellite
                  </Badge>
                )}
                {currentView === 'static' && (
                  <Badge variant="outline" className="bg-yellow-500/30 text-yellow-100 border-yellow-400/30">
                    📸 Static View
                  </Badge>
                )}
              </div>
              {description && (
                <p className="text-white/90 text-sm max-w-2xl">{description}</p>
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

        {/* View Content */}
        <div className="w-full h-full relative">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center z-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Loading {currentView === 'streetview' ? 'Street View' : currentView === 'static' ? 'Static View' : 'Map View'}
                </h3>
                <p className="text-gray-600 mb-4">Initializing view for {title}...</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span className="font-mono">{currentLat.toFixed(6)}, {currentLng.toFixed(6)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {loadError && !isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center z-20">
              <div className="text-center p-8 max-w-md">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Load Error</h3>
                <p className="text-gray-600 mb-6">{loadError}</p>
                <div className="space-y-2">
                  <Button onClick={() => switchView('satellite')} size="sm" className="mr-2">
                    Try Satellite View
                  </Button>
                  <Button onClick={() => switchView('roadmap')} size="sm" variant="outline">
                    Try Road Map
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          {apiKey ? (
            <div className="w-full h-full">
              {/* Static Image View */}
              {currentView === 'static' ? (
                <div className="w-full h-full flex items-center justify-center bg-black">
                  <img
                    ref={staticImageRef}
                    src={urls.staticStreetView}
                    alt={`Street View of ${title}`}
                    className="max-w-full max-h-full object-contain rounded-b-xl"
                    onLoad={handleStaticImageLoad}
                    onError={handleStaticImageError}
                    style={{ minHeight: '400px', minWidth: '600px' }}
                  />
                </div>
              ) : (
                /* Iframe Views */
                <iframe
                  key={`${currentView}-${currentLat}-${currentLng}-${Date.now()}`}
                  ref={iframeRef}
                  src={currentView === 'streetview' ? urls.streetview : currentView === 'satellite' ? urls.satellite : urls.roadmap}
                  className="w-full h-full rounded-b-xl border-0"
                  style={{ minHeight: '500px', border: 'none' }}
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${currentView} view of ${title}`}
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                />
              )}
            </div>
          ) : (
            /* No API Key */
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="text-center p-8 max-w-md">
                <div className="text-6xl mb-4">🔑</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">API Key Missing</h3>
                <p className="text-gray-600 mb-6">
                  Google Maps API key is required to display Street View and maps.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="absolute bottom-6 right-6 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleReset}
            disabled={isLoading}
            className="bg-black/50 text-white border-white/20 hover:bg-black/70 disabled:opacity-50"
            title="Reset to original position"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.open(urls.directLink, '_blank')}
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

        {/* View Switcher */}
        {apiKey && (
          <div className="absolute top-20 left-4 z-10">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2 space-y-1">
              <Button
                variant={currentView === 'streetview' ? "default" : "secondary"}
                size="sm"
                onClick={() => switchView('streetview')}
                disabled={isLoading}
                className={`w-full text-xs ${
                  currentView === 'streetview' 
                    ? "bg-blue-500 hover:bg-blue-600 text-white" 
                    : "bg-white/20 hover:bg-white/30 text-white"
                }`}
              >
                🌍 Street View
              </Button>
              
              <Button
                variant={currentView === 'static' ? "default" : "secondary"}
                size="sm"
                onClick={() => switchView('static')}
                disabled={isLoading}
                className={`w-full text-xs ${
                  currentView === 'static' 
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white" 
                    : "bg-white/20 hover:bg-white/30 text-white"
                }`}
              >
                📸 Static View
              </Button>
              
              <Button
                variant={currentView === 'satellite' ? "default" : "secondary"}
                size="sm"
                onClick={() => switchView('satellite')}
                disabled={isLoading}
                className={`w-full text-xs ${
                  currentView === 'satellite' 
                    ? "bg-green-500 hover:bg-green-600 text-white" 
                    : "bg-white/20 hover:bg-white/30 text-white"
                }`}
              >
                🛰️ Satellite
              </Button>
              
              <Button
                variant={currentView === 'roadmap' ? "default" : "secondary"}
                size="sm"
                onClick={() => switchView('roadmap')}
                disabled={isLoading}
                className={`w-full text-xs ${
                  currentView === 'roadmap' 
                    ? "bg-purple-500 hover:bg-purple-600 text-white" 
                    : "bg-white/20 hover:bg-white/30 text-white"
                }`}
              >
                🗺️ Road Map
              </Button>
            </div>
          </div>
        )}

        {/* Location Info */}
        {!isLoading && (
          <div className="absolute bottom-4 left-4 z-10">
            <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{title}</span>
                <span className="text-gray-300">|</span>
                <span className="font-mono text-xs">{currentLat.toFixed(6)}, {currentLng.toFixed(6)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}