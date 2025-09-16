"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Maximize2, Minimize2, MapPin, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AdvancedStreetViewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  location?: string;
  lat: number;
  lng: number;
  onPositionChange?: (lat: number, lng: number) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

export function AdvancedStreetView({
  isOpen,
  onClose,
  title,
  description,
  location,
  lat,
  lng,
  onPositionChange
}: AdvancedStreetViewProps) {
  const streetViewRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [streetViewAvailable, setStreetViewAvailable] = useState(true);
  const [currentLat, setCurrentLat] = useState(lat);
  const [currentLng, setCurrentLng] = useState(lng);
  const [hasApiKey, setHasApiKey] = useState(true);

  // Initialize Street View panorama when component opens
  useEffect(() => {
    if (isOpen && streetViewRef.current && window.google) {
      console.log('Initializing Street View panorama at:', lat, lng);
      setIsLoading(true);
      setCurrentLat(lat);
      setCurrentLng(lng);

      // Check if API key is available
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        setHasApiKey(false);
        setIsLoading(false);
        return;
      }

      // Initialize Street View Service to check availability
      const streetViewService = new window.google.maps.StreetViewService();
      
      streetViewService.getPanorama({
        location: { lat, lng },
        radius: 50 // Search within 50 meters
      }, (data: any, status: any) => {
        if (status === 'OK' && data && data.location) {
          console.log('Street View available at:', data.location.latLng.lat(), data.location.latLng.lng());
          
          // Create panorama
          panoramaRef.current = new window.google.maps.StreetViewPanorama(
            streetViewRef.current!,
            {
              position: data.location.latLng,
              pov: {
                heading: 0,
                pitch: 0
              },
              zoom: 0,
              fullscreenControl: false,
              addressControl: true,
              linksControl: true,
              panControl: true,
              zoomControl: true,
              motionTracking: false,
              motionTrackingControl: false
            }
          );

          // Add position change listener
          panoramaRef.current.addListener('position_changed', () => {
            if (panoramaRef.current) {
              const newPosition = panoramaRef.current.getPosition();
              if (newPosition) {
                const newLat = newPosition.lat();
                const newLng = newPosition.lng();
                console.log('Street View position changed to:', newLat, newLng);
                
                setCurrentLat(newLat);
                setCurrentLng(newLng);
                
                // Notify parent component about position change
                if (onPositionChange) {
                  onPositionChange(newLat, newLng);
                }
              }
            }
          });

          setStreetViewAvailable(true);
          setIsLoading(false);
        } else {
          console.log('Street View not available, status:', status);
          setStreetViewAvailable(false);
          setIsLoading(false);
        }
      });
    }
  }, [isOpen, lat, lng, onPositionChange]);

  // Reset to original position
  const handleReset = useCallback(() => {
    if (panoramaRef.current) {
      console.log('Resetting Street View to original position:', lat, lng);
      panoramaRef.current.setPosition({ lat, lng });
      setCurrentLat(lat);
      setCurrentLng(lng);
    }
  }, [lat, lng]);

  // Handle close
  const handleClose = useCallback(() => {
    if (panoramaRef.current) {
      // Clean up listeners
      window.google.maps.event.clearInstanceListeners(panoramaRef.current);
      panoramaRef.current = null;
    }
    setIsFullscreen(false);
    setIsLoading(true);
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
            title="Reset Street View to original position"
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
                  <span className="font-mono">{lat.toFixed(6)}, {lng.toFixed(6)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Street View Panorama Container */}
          {hasApiKey ? (
            <div
              ref={streetViewRef}
              className="w-full h-full rounded-b-xl"
              style={{ minHeight: '500px' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="text-center p-8 max-w-md">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Street View Unavailable</h3>
                <p className="text-gray-600 mb-6">
                  Street View is temporarily unavailable. Please check back later.
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

          {/* Street View not available message */}
          {!isLoading && hasApiKey && !streetViewAvailable && (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center z-20">
              <div className="text-center p-8 max-w-md">
                <div className="text-6xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Street View Not Available</h3>
                <p className="text-gray-600 mb-6">
                  Street View imagery is not available for this location. This might be due to privacy restrictions, remote location, or limited coverage.
                </p>
                <div className="bg-amber-100 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-amber-800">
                    <MapPin className="h-4 w-4" />
                    <span>{title}</span>
                  </div>
                  <div className="text-xs text-amber-700 mt-1 font-mono">
                    {currentLat.toFixed(6)}, {currentLng.toFixed(6)}
                  </div>
                </div>
                <Button 
                  onClick={() => window.open(`https://maps.google.com/?q=${currentLat},${currentLng}`, '_blank')}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  View on Google Maps
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

          {/* View mode indicator */}
          {!isLoading && hasApiKey && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-medium">
                {streetViewAvailable ? '🌍 Street View' : '⚠️ Not Available'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}