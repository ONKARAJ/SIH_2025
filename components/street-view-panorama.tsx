"use client";

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { AlertCircle, MapPin } from 'lucide-react';

// Declare Google Maps types
declare global {
  interface Window {
    google: {
      maps: {
        StreetViewPanorama: any;
        LatLng: any;
        StreetViewStatus: any;
        StreetViewService: any;
        event: any;
      };
    };
  }
}

interface StreetViewPanoramaProps {
  lat: number;
  lng: number;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: (panorama: any) => void;
  onError?: (error: string) => void;
  options?: {
    pov?: { heading: number; pitch: number };
    zoom?: number;
    addressControl?: boolean;
    linksControl?: boolean;
    panControl?: boolean;
    zoomControl?: boolean;
    fullscreenControl?: boolean;
  };
}

export function StreetViewPanorama({
  lat,
  lng,
  className = "w-full h-96",
  style,
  onLoad,
  onError,
  options = {}
}: StreetViewPanoramaProps) {
  const panoramaRef = useRef<HTMLDivElement>(null);
  const panoramaInstance = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Load Google Maps API
  const loadGoogleMapsAPI = useCallback(async () => {
    if (typeof window !== 'undefined' && !window.google) {
      try {
        const script = document.createElement('script');
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
          throw new Error('Google Maps API key not found in environment variables');
        }
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry&v=3.55`;
        script.async = true;
        script.defer = true;
        
        return new Promise<void>((resolve, reject) => {
          script.onload = () => {
            setTimeout(() => {
              if (window.google && window.google.maps) {
                resolve();
              } else {
                reject(new Error('Google Maps API failed to load'));
              }
            }, 100);
          };
          script.onerror = () => reject(new Error('Failed to load Google Maps API'));
          document.head.appendChild(script);
        });
      } catch (error) {
        throw new Error('Failed to load Google Maps API');
      }
    }
  }, []);

  // Initialize Street View Panorama
  const initializeStreetView = useCallback(async () => {
    if (!panoramaRef.current) return;

    try {
      setIsLoading(true);
      setHasError(false);
      setErrorMessage('');

      await loadGoogleMapsAPI();

      // Clean up previous panorama
      if (panoramaInstance.current) {
        try {
          window.google?.maps?.event?.clearInstanceListeners?.(panoramaInstance.current);
        } catch (error) {
          console.warn('Error cleaning up previous panorama:', error);
        }
        panoramaInstance.current = null;
      }

      // Clear container
      if (panoramaRef.current) {
        panoramaRef.current.innerHTML = '';
      }

      // Wait for next tick to ensure DOM is ready
      await new Promise(resolve => setTimeout(resolve, 100));

      if (!panoramaRef.current) return;

      const position = new window.google.maps.LatLng(lat, lng);

      // Default panorama options
      const defaultOptions = {
        position: position,
        pov: options.pov || { heading: 0, pitch: 0 },
        zoom: options.zoom || 1,
        visible: true,
        enableCloseButton: false,
        fullscreenControl: options.fullscreenControl !== undefined ? options.fullscreenControl : false,
        addressControl: options.addressControl !== undefined ? options.addressControl : true,
        linksControl: options.linksControl !== undefined ? options.linksControl : true,
        panControl: options.panControl !== undefined ? options.panControl : true,
        zoomControl: options.zoomControl !== undefined ? options.zoomControl : true,
        motionTracking: false,
        motionTrackingControl: false
      };

      // Create Street View panorama
      const panorama = new window.google.maps.StreetViewPanorama(
        panoramaRef.current,
        defaultOptions
      );

      panoramaInstance.current = panorama;

      // Check if Street View is available at this location with expanded search
      const streetViewService = new window.google.maps.StreetViewService();
      
      // First try with 50m radius
      streetViewService.getPanorama({
        location: position,
        radius: 50
      }, (data: any, status: any) => {
        if (status === window.google.maps.StreetViewStatus.OK) {
          panorama.setPano(data.location.pano);
          panorama.setPov(options.pov || { heading: 0, pitch: 0 });
          panorama.setZoom(options.zoom || 1);
          setIsLoading(false);
          onLoad?.(panorama);
        } else {
          // Try with larger radius (1km) for remote areas
          streetViewService.getPanorama({
            location: position,
            radius: 1000
          }, (dataLarge: any, statusLarge: any) => {
            if (statusLarge === window.google.maps.StreetViewStatus.OK) {
              panorama.setPano(dataLarge.location.pano);
              panorama.setPov(options.pov || { heading: 0, pitch: 0 });
              panorama.setZoom(options.zoom || 1);
              setIsLoading(false);
              onLoad?.(panorama);
            } else {
              // Try even larger radius (5km) as last resort
              streetViewService.getPanorama({
                location: position,
                radius: 5000
              }, (dataXL: any, statusXL: any) => {
                if (statusXL === window.google.maps.StreetViewStatus.OK) {
                  panorama.setPano(dataXL.location.pano);
                  panorama.setPov(options.pov || { heading: 0, pitch: 0 });
                  panorama.setZoom(options.zoom || 1);
                  setIsLoading(false);
                  onLoad?.(panorama);
                } else {
                  const error = 'Street View is not available within 5km of this location';
                  setHasError(true);
                  setErrorMessage(error);
                  setIsLoading(false);
                  onError?.(error);
                }
              });
            }
          });
        }
      });

      // Add event listeners
      window.google.maps.event.addListener(panorama, 'status_changed', () => {
        if (panorama.getStatus() !== window.google.maps.StreetViewStatus.OK) {
          const error = 'Street View failed to load';
          setHasError(true);
          setErrorMessage(error);
          setIsLoading(false);
          onError?.(error);
        }
      });

    } catch (error) {
      console.error('Error initializing Street View:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to initialize Street View';
      setHasError(true);
      setErrorMessage(errorMsg);
      setIsLoading(false);
      onError?.(errorMsg);
    }
  }, [lat, lng, loadGoogleMapsAPI, onLoad, onError, options]);

  // Initialize when coordinates change
  useEffect(() => {
    initializeStreetView();
  }, [lat, lng, initializeStreetView]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (panoramaInstance.current) {
        try {
          window.google?.maps?.event?.clearInstanceListeners?.(panoramaInstance.current);
        } catch (error) {
          console.warn('Error cleaning up Street View on unmount:', error);
        }
        panoramaInstance.current = null;
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`} style={style}>
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm">Loading Street View...</p>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-2">
              <MapPin className="h-3 w-3" />
              <span className="font-mono">{lat.toFixed(4)}, {lng.toFixed(4)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-xs px-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-gray-700 text-sm font-medium mb-2">Street View Unavailable</p>
            <p className="text-gray-500 text-xs mb-4">{errorMessage}</p>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
              <MapPin className="h-3 w-3" />
              <span className="font-mono">{lat.toFixed(4)}, {lng.toFixed(4)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Street View Container */}
      <div
        ref={panoramaRef}
        className="w-full h-full"
        style={{
          display: isLoading || hasError ? 'none' : 'block'
        }}
      />
    </div>
  );
}
