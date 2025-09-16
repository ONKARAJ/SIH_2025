"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, Maximize2, Minimize2, MapPin, RotateCcw, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface IframeStreetViewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  location?: string;
  lat: number;
  lng: number;
}

export function IframeStreetView({
  isOpen,
  onClose,
  title,
  description,
  location,
  lat,
  lng
}: IframeStreetViewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentApproach, setCurrentApproach] = useState(0);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Multiple approaches to try for iframe Street View
  const approaches = [
    // Approach 1: Google Maps Embed API Street View
    {
      name: "Google Maps Embed Street View",
      url: `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${lat},${lng}&heading=210&pitch=10&fov=90`,
      description: "Official Google Maps Embed API"
    },
    // Approach 2: Google Maps Embed API with different parameters
    {
      name: "Street View Alternative Parameters",
      url: `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${lat},${lng}&heading=0&pitch=0&fov=75`,
      description: "Different view parameters"
    },
    // Approach 3: Google Maps Place Embed with Street View bias
    {
      name: "Place Embed with Street View",
      url: `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}&zoom=18&maptype=roadmap`,
      description: "Place view that may show Street View option"
    },
    // Approach 4: Custom Google Maps embed with Street View parameters
    {
      name: "Custom Maps Embed",
      url: `https://www.google.com/maps/embed?pb=!1m0!3m2!1sen!2sus!4v1600000000000!6m8!1m7!1s0x0:0x0!2m2!1d${lat}!2d${lng}!3f0!4f0!5f0.7820865974627469`,
      description: "Custom embed parameters"
    }
  ];

  const currentUrl = approaches[currentApproach]?.url || '';
  const currentName = approaches[currentApproach]?.name || '';

  // Handle close
  const handleClose = useCallback(() => {
    setIsFullscreen(false);
    setIsLoading(true);
    setCurrentApproach(0);
    setHasError(false);
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

  // Try next approach
  const tryNextApproach = useCallback(() => {
    if (currentApproach < approaches.length - 1) {
      console.log(`Trying next approach: ${approaches[currentApproach + 1].name}`);
      setCurrentApproach(prev => prev + 1);
      setIsLoading(true);
      setHasError(false);
    } else {
      console.log('All approaches failed');
      setHasError(true);
      setIsLoading(false);
    }
  }, [currentApproach, approaches]);

  // Reset to first approach
  const resetApproaches = useCallback(() => {
    console.log('Resetting to first approach');
    setCurrentApproach(0);
    setIsLoading(true);
    setHasError(false);
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
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  // Auto-advance to next approach on timeout
  useEffect(() => {
    if (isOpen && isLoading && !hasError) {
      const timeout = setTimeout(() => {
        console.log(`Approach "${currentName}" timed out, trying next...`);
        tryNextApproach();
      }, 8000); // 8 second timeout per approach
      
      return () => clearTimeout(timeout);
    }
  }, [isOpen, isLoading, currentApproach, hasError, tryNextApproach, currentName]);

  // Handle iframe load
  const handleIframeLoad = () => {
    console.log(`Approach "${currentName}" loaded successfully`);
    setIsLoading(false);
    setHasError(false);
  };

  // Handle iframe error
  const handleIframeError = () => {
    console.log(`Approach "${currentName}" failed, trying next...`);
    setTimeout(tryNextApproach, 1000);
  };

  if (!isOpen) return null;

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
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-black/30 text-white border-white/30">
                  📍 {lat.toFixed(6)}, {lng.toFixed(6)}
                </Badge>
                <Badge variant="outline" className="bg-blue-500/30 text-blue-100 border-blue-400/30 text-xs">
                  {currentName}
                </Badge>
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

        {/* Main Content */}
        <div className="w-full h-full relative">
          {/* Loading State */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center z-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Loading Street View
                </h3>
                <p className="text-gray-600 mb-4">
                  Trying: {currentName}
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span className="font-mono">{lat.toFixed(6)}, {lng.toFixed(6)}</span>
                </div>
                <div className="mt-4">
                  <div className="text-xs text-gray-400">
                    Approach {currentApproach + 1} of {approaches.length}
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mx-auto mt-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentApproach + 1) / approaches.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center z-20">
              <div className="text-center p-8 max-w-md">
                <div className="text-6xl mb-4">🚫</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Street View Unavailable</h3>
                <p className="text-gray-600 mb-6">
                  Unable to load Street View in iframe for this location. This may be due to:
                </p>
                <div className="text-sm text-gray-500 text-left mb-6">
                  • No Street View imagery available
                  • Location restrictions
                  • API limitations for iframe embedding
                </div>
                <div className="space-y-2">
                  <Button
                    onClick={resetApproaches}
                    size="sm"
                    className="mr-2"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    onClick={() => window.open(directStreetViewUrl, '_blank')}
                    size="sm"
                    variant="outline"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in Google Maps
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Iframe Container */}
          {apiKey && !hasError && (
            <iframe
              key={`streetview-${currentApproach}-${lat}-${lng}`}
              ref={iframeRef}
              src={currentUrl}
              className="w-full h-full rounded-b-xl border-0"
              style={{ minHeight: '500px', border: 'none' }}
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Street View of ${title}`}
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          )}

          {/* No API Key */}
          {!apiKey && (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="text-center p-8 max-w-md">
                <div className="text-6xl mb-4">🔑</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">API Key Required</h3>
                <p className="text-gray-600 mb-6">
                  Google Maps API key is required for iframe Street View.
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
          {!hasError && !isLoading && currentApproach < approaches.length - 1 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={tryNextApproach}
              className="bg-black/50 text-white border-white/20 hover:bg-black/70"
              title="Try next approach"
            >
              🔄 Next Method
            </Button>
          )}
          
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

        {/* Debug Info */}
        {!isLoading && !hasError && (
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
        {!isLoading && !hasError && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-medium">
              ✅ {currentName}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}