"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { X, Maximize2, Minimize2, MapPin, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface StreetViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  location?: string;
  lat: number;
  lng: number;
  onPositionChange?: (lat: number, lng: number) => void; // Callback for position changes
}

export function StreetViewModal({
  isOpen,
  onClose,
  title,
  description,
  location,
  lat,
  lng,
  onPositionChange
}: StreetViewModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true);
  const [currentLat, setCurrentLat] = useState(lat);
  const [currentLng, setCurrentLng] = useState(lng);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Handle close
  const handleClose = useCallback(() => {
    setIsFullscreen(false);
    setIsLoading(true);
    setShowFallback(false); // Reset fallback state
    // Reset position to original coordinates
    setCurrentLat(lat);
    setCurrentLng(lng);
    onClose();
  }, [onClose, lat, lng]);

  // Check if Google Maps API key is available
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    console.log('API Key check:', {
      hasKey: !!apiKey,
      keyLength: apiKey?.length,
      keyStart: apiKey?.substring(0, 8)
    });
    
    if (!apiKey) {
      console.warn('Google Maps API key not found');
      setHasApiKey(false);
      setShowFallback(true);
    } else {
      setHasApiKey(true);
    }
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  // Initialize Street View when modal opens
  useEffect(() => {
    if (isOpen) {
      console.log('Street View modal opening:', { lat, lng, hasApiKey });
      setIsLoading(true);
      
      if (hasApiKey) {
        // Always start with regular Google Maps view for better reliability
        setShowFallback(true);
        
        // Try Street View after a short delay
        const streetViewTimer = setTimeout(() => {
          console.log('Attempting to load Street View...');
          setShowFallback(false);
          setIsLoading(true);
          
          // Fallback to map view if Street View fails to load
          const fallbackTimer = setTimeout(() => {
            console.log('Street View load timeout, falling back to map view');
            setIsLoading(false);
          }, 6000);
          
          return () => clearTimeout(fallbackTimer);
        }, 1000);
        
        return () => clearTimeout(streetViewTimer);
      } else {
        setShowFallback(true);
        setIsLoading(false);
      }
    } else {
      // Reset states when modal closes
      setIsLoading(true);
      setShowFallback(false);
    }
  }, [isOpen, lat, lng, hasApiKey]);

  // Reset Street View (try again)
  const handleReset = useCallback(() => {
    setShowFallback(false); // Try Street View again
    setIsLoading(true);
    // Reset to original coordinates
    setCurrentLat(lat);
    setCurrentLng(lng);
    setTimeout(() => setIsLoading(false), 3000);
  }, [lat, lng]);

  // Toggle fullscreen with error handling
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
      // Fallback: just toggle the fullscreen state for UI purposes
      setIsFullscreen(!isFullscreen);
    }
  }, [isFullscreen]);

  if (!isOpen) return null;

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
                {(currentLat !== lat || currentLng !== lng) && (
                  <Badge variant="outline" className="bg-yellow-500/20 text-yellow-100 border-yellow-400/30">
                    📍 Moved from original position
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

        {/* Control Buttons */}
        <div className="absolute bottom-6 right-6 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleReset}
            disabled={isLoading}
            className="bg-black/50 text-white border-white/20 hover:bg-black/70 disabled:opacity-50"
            title="Reset Street View to initial position"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleFullscreen}
            className="bg-black/50 text-white border-white/20 hover:bg-black/70"
            title="Toggle fullscreen mode"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4 mr-2" /> : <Maximize2 className="h-4 w-4 mr-2" />}
            {isFullscreen ? 'Exit' : 'Full'}
          </Button>
        </div>

        {/* Street View Container */}
        <div className="w-full h-full relative">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center z-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Street View</h3>
                <p className="text-gray-600 mb-4">Initializing 360° panoramic view for {title}...</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span className="font-mono">{lat.toFixed(4)}, {lng.toFixed(4)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Street View Iframe - Try Street View first */}
          {!showFallback && hasApiKey ? (
            <div className="w-full h-full relative">
              <iframe
                key={`streetview-${currentLat}-${currentLng}-${Date.now()}`}
                ref={iframeRef}
                src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=${currentLat},${currentLng}&heading=0&pitch=0&fov=90`}
                className="w-full h-full rounded-b-xl border-0"
                style={{ minHeight: '500px', border: 'none' }}
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                title={`360° Street View of ${title}`}
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                onLoad={() => {
                  console.log('Street View iframe loaded');
                  // Give it extra time to fully render
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 2000);
                }}
                onError={() => {
                  console.log('Street View iframe failed, switching to map fallback');
                  setShowFallback(true);
                  setIsLoading(false);
                }}
              />
              
              {/* Overlay to detect if Street View actually loaded content */}
              {!isLoading && (
                <div 
                  className="absolute inset-0 pointer-events-none"
                  onLoad={() => {
                    // Additional check for Street View content
                    console.log('Street View content check');
                  }}
                />
              )}
            </div>
          ) : hasApiKey ? (
            // Fallback to regular map if Street View not available
            <div className="w-full h-full relative">
              <iframe
                key={`fallback-${currentLat}-${currentLng}-${Date.now()}`}
                ref={iframeRef}
                src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${currentLat},${currentLng}&zoom=18&maptype=satellite`}
                className="w-full h-full rounded-b-xl border-0"
                style={{ minHeight: '500px', border: 'none' }}
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Satellite View of ${title}`}
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                onLoad={() => {
                  console.log('Fallback map loaded successfully');
                  setIsLoading(false);
                }}
                onError={() => {
                  console.log('Fallback map also failed');
                  setIsLoading(false);
                }}
              />
              
              {/* Map View Controls */}
              <div className="absolute top-4 left-4 z-10 space-y-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    const newSrc = `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${currentLat},${currentLng}&zoom=18&maptype=roadmap`;
                    if (iframeRef.current) {
                      iframeRef.current.src = newSrc;
                    }
                  }}
                  className="bg-white/90 text-gray-700 hover:bg-white text-xs"
                >
                  🗺️ Road Map
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    const newSrc = `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${currentLat},${currentLng}&zoom=18&maptype=satellite`;
                    if (iframeRef.current) {
                      iframeRef.current.src = newSrc;
                    }
                  }}
                  className="bg-white/90 text-gray-700 hover:bg-white text-xs"
                >
                  🛰️ Satellite
                </Button>
              </div>
            </div>
          ) : (
            // Error state when API key is missing
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="text-center p-8 max-w-md">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Maps Unavailable</h3>
                <p className="text-gray-600 mb-6">
                  Street View and Maps are temporarily unavailable. Please check back later or visit the location directly.
                </p>
                <div className="bg-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{title}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 font-mono">
                    {currentLat.toFixed(6)}, {currentLng.toFixed(6)}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Status indicator and controls */}
          {!isLoading && (
            <>
              {/* Location info */}
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
              
              {/* View mode indicator */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-medium">
                  {!hasApiKey ? '⚠️ Unavailable' : showFallback ? '🗺️ Map View' : '🌍 Street View'}
                  {showFallback && hasApiKey && <span className="ml-2 text-yellow-400">• Fallback</span>}
                </div>
              </div>
              
              {/* Switch View button - always visible */}
              {hasApiKey && (
                <div className="absolute top-4 left-4 z-10 space-y-2">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 space-y-1">
                    <Button
                      variant={!showFallback ? "default" : "secondary"}
                      size="sm"
                      onClick={() => {
                        console.log('Switching to Street View');
                        setShowFallback(false);
                        setIsLoading(true);
                        setTimeout(() => setIsLoading(false), 6000);
                      }}
                      className={`w-full text-xs ${
                        !showFallback 
                          ? "bg-blue-500 hover:bg-blue-600 text-white" 
                          : "bg-white/20 hover:bg-white/30 text-white"
                      }`}
                      disabled={isLoading}
                    >
                      🌍 Street View
                    </Button>
                    
                    <Button
                      variant={showFallback ? "default" : "secondary"}
                      size="sm"
                      onClick={() => {
                        console.log('Switching to Map View');
                        setShowFallback(true);
                        setIsLoading(true);
                        setTimeout(() => setIsLoading(false), 2000);
                      }}
                      className={`w-full text-xs ${
                        showFallback 
                          ? "bg-green-500 hover:bg-green-600 text-white" 
                          : "bg-white/20 hover:bg-white/30 text-white"
                      }`}
                      disabled={isLoading}
                    >
                      🗺️ Satellite Map
                    </Button>
                    
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => window.open(`https://maps.google.com/?q=${currentLat},${currentLng}&layer=c&cbll=${currentLat},${currentLng}`, '_blank')}
                      className="w-full bg-white/20 hover:bg-white/30 text-white text-xs"
                      title="Open in Google Maps (external)"
                    >
                      🔗 Google Maps
                    </Button>
                    
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        // Open debug in new window
                        const debugUrl = `/debug-street-view?lat=${currentLat}&lng=${currentLng}&title=${encodeURIComponent(title)}`;
                        window.open(debugUrl, '_blank', 'width=1200,height=800');
                      }}
                      className="w-full bg-white/20 hover:bg-white/30 text-white text-xs"
                      title="Debug Street View issues"
                    >
                      🔧 Debug
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
