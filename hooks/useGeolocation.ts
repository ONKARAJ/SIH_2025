"use client";

import { useState, useEffect } from 'react';

export interface GeolocationPosition {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface GeolocationState {
  position: GeolocationPosition | null;
  error: string | null;
  loading: boolean;
  supported: boolean;
  permissionGranted: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    error: null,
    loading: false,
    supported: typeof navigator !== 'undefined' && 'geolocation' in navigator,
    permissionGranted: false
  });

  const requestLocation = async () => {
    if (!state.supported) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by this browser'
      }));
      return false;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Check permission status first
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        
        if (permission.state === 'denied') {
          setState(prev => ({
            ...prev,
            loading: false,
            error: 'Location access denied. Please enable location permissions in your browser settings.',
            permissionGranted: false
          }));
          return false;
        }
      }

      // Request current position
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: pos.coords.accuracy
            });
          },
          (error) => {
            let errorMessage = 'Unable to get your location';
            
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = 'Location access denied by user. Please allow location access and try again.';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location information unavailable. Please try again.';
                break;
              case error.TIMEOUT:
                errorMessage = 'Location request timed out. Please try again.';
                break;
            }
            
            reject(new Error(errorMessage));
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 minutes cache
          }
        );
      });

      setState(prev => ({
        ...prev,
        position,
        loading: false,
        error: null,
        permissionGranted: true
      }));
      
      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to get location',
        permissionGranted: false
      }));
      
      return false;
    }
  };

  const clearLocation = () => {
    setState(prev => ({
      ...prev,
      position: null,
      error: null
    }));
  };

  const getCurrentLocationName = async (position: GeolocationPosition): Promise<string> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.latitude},${position.longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Geocoding failed');
      }
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        // Try to find a locality, administrative area, or formatted address
        const result = data.results[0];
        const components = result.address_components || [];
        
        // Look for city/locality first
        const city = components.find((comp: any) => 
          comp.types.includes('locality') || comp.types.includes('administrative_area_level_2')
        );
        
        if (city) {
          return city.long_name;
        }
        
        // Fallback to formatted address
        return result.formatted_address.split(',')[0] || 'Current Location';
      }
      
      return 'Current Location';
    } catch (error) {
      console.error('Geocoding error:', error);
      return 'Current Location';
    }
  };

  return {
    ...state,
    requestLocation,
    clearLocation,
    getCurrentLocationName
  };
}