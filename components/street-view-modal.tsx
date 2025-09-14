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
}

export function StreetViewModal({
  isOpen,
  onClose,
  title,
  description,
  location,
  lat,
  lng
}: StreetViewModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Handle close
  const handleClose = useCallback(() => {
    setIsFullscreen(false);
    setIsLoading(true);
    setShowFallback(false); // Reset fallback state
    onClose();
  }, [onClose]);

  // Check if Google Maps API key is available
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      console.warn('Google Maps API key not found');
      setHasApiKey(false);
      setShowFallback(true);
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
      setIsLoading(true);
      if (hasApiKey) {
        setShowFallback(false);
      }
      
      // Timeout to hide loading and ensure fallback if Street View doesn't load
      const timer = setTimeout(() => {
        setIsLoading(false);
        // If still no Street View after timeout, try fallback
        if (!showFallback && hasApiKey) {
          console.log('Street View timeout, enabling fallback option');
          // Don't auto-switch to fallback, just hide loading so user can try fallback button
        }
      }, 4000); // Increased to 4 seconds
      
      return () => clearTimeout(timer);
    } else {
      // Reset states when modal closes
      setIsLoading(true);
      setShowFallback(false);
    }
  }, [isOpen, lat, lng, hasApiKey, showFallback]);

  // Reset Street View (try again)
  const handleReset = useCallback(() => {
    setShowFallback(false); // Try Street View again
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

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
            <iframe
              key={`streetview-${lat}-${lng}-${showFallback}`}
              ref={iframeRef}
              src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=${lat},${lng}`}
              className="w-full h-full rounded-b-xl border-0"
              style={{ minHeight: '500px' }}
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              title={`360° Street View of ${title}`}
              allowFullScreen
              onLoad={() => {
                console.log('Street View loaded successfully');
                setIsLoading(false);
              }}
              onError={() => {
                console.log('Street View failed, trying fallback');
                if (!showFallback) {
                  setShowFallback(true);
                }
                setIsLoading(false);
              }}
            />
          ) : hasApiKey ? (
            // Fallback to regular map if Street View not available
            <iframe
              key={`fallback-${lat}-${lng}-${showFallback}`}
              ref={iframeRef}
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${lat},${lng}&zoom=16`}
              className="w-full h-full rounded-b-xl border-0"
              style={{ minHeight: '500px' }}
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map View of ${title}`}
              allowFullScreen
              onLoad={() => {
                console.log('Fallback map loaded');
                setIsLoading(false);
              }}
            />
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
                    {lat.toFixed(4)}, {lng.toFixed(4)}
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
                    <span className="font-mono text-xs">{lat.toFixed(4)}, {lng.toFixed(4)}</span>
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
                <div className="absolute top-4 left-4 z-10">
                  {showFallback ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        console.log('Switching to Street View');
                        setShowFallback(false);
                        setIsLoading(true);
                        setTimeout(() => setIsLoading(false), 4000);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs"
                    >
                      🌍 Street View
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        console.log('Switching to Map View');
                        setShowFallback(true);
                        setIsLoading(true);
                        setTimeout(() => setIsLoading(false), 2000);
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white text-xs"
                      title="Switch to Map if Street View shows blank screen"
                    >
                      🗺️ Map View
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
