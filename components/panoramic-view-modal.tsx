"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Maximize2, Minimize2, RotateCcw, Settings, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

declare global {
  interface Window {
    pannellum: {
      viewer: (containerId: string, config: any) => PannellumViewer;
    };
  }
}

interface PannellumViewer {
  destroy(): void;
  getPitch(): number;
  getYaw(): number;
  setPitch(pitch: number): void;
  setYaw(yaw: number): void;
  getHfov(): number;
  setHfov(hfov: number): void;
  startAutoRotate(speed?: number): void;
  stopAutoRotate(): void;
  toggleFullscreen(): void;
  loadScene(sceneId: string, pitch?: number, yaw?: number, hfov?: number): void;
  on(event: string, callback: Function): void;
  off(event: string, callback: Function): void;
}

interface PanoramicViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  location?: string;
  panoramaUrl: string;
  initialPitch?: number;
  initialYaw?: number;
  initialHfov?: number;
  autoRotate?: boolean;
  hotSpots?: Array<{
    pitch: number;
    yaw: number;
    type: 'info' | 'scene';
    text?: string;
    URL?: string;
    sceneId?: string;
    cssClass?: string;
  }>;
}

export function PanoramicViewModal({
  isOpen,
  onClose,
  title,
  description,
  location,
  panoramaUrl,
  initialPitch = 0,
  initialYaw = 0,
  initialHfov = 100,
  autoRotate = false,
  hotSpots = []
}: PanoramicViewModalProps) {
  const panoramaRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PannellumViewer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate);
  const [controls, setControls] = useState({
    pitch: initialPitch,
    yaw: initialYaw,
    hfov: initialHfov
  });
  const [showControls, setShowControls] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load Pannellum library
  const loadPannellum = useCallback(async () => {
    if (typeof window !== 'undefined' && !window.pannellum) {
      try {
        // Load Pannellum CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
        document.head.appendChild(link);

        // Load Pannellum JS
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
        script.async = true;
        
        return new Promise<void>((resolve, reject) => {
          script.onload = () => {
            setTimeout(() => {
              if (window.pannellum) {
                resolve();
              } else {
                reject(new Error('Pannellum failed to initialize'));
              }
            }, 100);
          };
          script.onerror = () => reject(new Error('Failed to load Pannellum'));
          document.head.appendChild(script);
        });
      } catch (error) {
        throw new Error('Failed to load Pannellum library');
      }
    }
  }, []);

  // Initialize panorama viewer
  const initializePanorama = useCallback(async () => {
    if (!panoramaRef.current || !isOpen) return;

    try {
      setIsLoading(true);
      setError(null);

      await loadPannellum();

      // Clean up previous viewer
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }

      // Clear container
      if (panoramaRef.current) {
        panoramaRef.current.innerHTML = '';
      }

      // Wait for next tick to ensure DOM is ready
      await new Promise(resolve => setTimeout(resolve, 100));

      if (!panoramaRef.current) return;

      // Configure panorama
      const config = {
        type: 'equirectangular',
        panorama: panoramaUrl,
        autoLoad: true,
        autoRotate: isAutoRotating ? 2 : false,
        pitch: initialPitch,
        yaw: initialYaw,
        hfov: initialHfov,
        minHfov: 50,
        maxHfov: 120,
        showControls: true,
        showFullscreenCtrl: false,
        showZoomCtrl: true,
        keyboardZoom: true,
        mouseZoom: true,
        doubleClickZoom: true,
        draggable: true,
        friction: 0.15,
        hfovBounds: [-180, 180],
        backgroundColor: [0, 0, 0],
        hotSpots: hotSpots.map(spot => ({
          ...spot,
          cssClass: spot.cssClass || 'custom-hotspot'
        })),
        compass: true,
        northOffset: 0,
        preview: '',
        loadButtonLabel: 'Click to Load Panorama',
        loadingLabel: 'Loading...',
        noPanoramaError: 'No panorama image was specified.',
        fileAccessError: 'The file %s could not be accessed.',
        malformedURLError: 'There was an error with the panorama URL.',
        iOS: false
      };

      // Create viewer
      const viewer = window.pannellum.viewer(panoramaRef.current, config);
      
      if (!viewer) {
        throw new Error('Failed to create panorama viewer');
      }

      viewerRef.current = viewer;

      // Event listeners
      viewer.on('load', () => {
        setIsLoading(false);
        setHasLoaded(true);
        setControls({
          pitch: viewer.getPitch(),
          yaw: viewer.getYaw(),
          hfov: viewer.getHfov()
        });
      });

      viewer.on('error', (error: any) => {
        setError(error.message || 'Failed to load panoramic view');
        setIsLoading(false);
      });

      viewer.on('mousedown', () => {
        if (isAutoRotating) {
          viewer.stopAutoRotate();
          setIsAutoRotating(false);
        }
      });

      // Update controls on view change
      viewer.on('animatefinished', () => {
        setControls({
          pitch: viewer.getPitch(),
          yaw: viewer.getYaw(),
          hfov: viewer.getHfov()
        });
      });

    } catch (error) {
      console.error('Error initializing panorama:', error);
      setError('Failed to load 360° view. Please try again.');
      setIsLoading(false);
    }
  }, [isOpen, panoramaUrl, initialPitch, initialYaw, initialHfov, isAutoRotating, hotSpots, loadPannellum]);

  // Initialize when modal opens
  useEffect(() => {
    if (isOpen && !hasLoaded) {
      initializePanorama();
    }
  }, [isOpen, initializePanorama, hasLoaded]);

  // Cleanup on unmount or close
  useEffect(() => {
    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch (error) {
          console.error('Error destroying panorama viewer:', error);
        }
        viewerRef.current = null;
      }
    };
  }, []);

  // Handle close
  const handleClose = useCallback(() => {
    if (viewerRef.current) {
      try {
        viewerRef.current.destroy();
      } catch (error) {
        console.error('Error destroying viewer on close:', error);
      }
      viewerRef.current = null;
    }
    setHasLoaded(false);
    setIsLoading(true);
    setError(null);
    onClose();
  }, [onClose]);

  // Control functions
  const handleReset = useCallback(() => {
    if (viewerRef.current) {
      viewerRef.current.setPitch(initialPitch);
      viewerRef.current.setYaw(initialYaw);
      viewerRef.current.setHfov(initialHfov);
      setControls({ pitch: initialPitch, yaw: initialYaw, hfov: initialHfov });
    }
  }, [initialPitch, initialYaw, initialHfov]);

  const toggleAutoRotate = useCallback(() => {
    if (viewerRef.current) {
      if (isAutoRotating) {
        viewerRef.current.stopAutoRotate();
        setIsAutoRotating(false);
      } else {
        viewerRef.current.startAutoRotate(2);
        setIsAutoRotating(true);
      }
    }
  }, [isAutoRotating]);

  const handleFullscreen = useCallback(() => {
    if (viewerRef.current) {
      viewerRef.current.toggleFullscreen();
      setIsFullscreen(!isFullscreen);
    }
  }, [isFullscreen]);

  const handleControlChange = useCallback((type: 'pitch' | 'yaw' | 'hfov', value: number) => {
    if (viewerRef.current) {
      switch (type) {
        case 'pitch':
          viewerRef.current.setPitch(value);
          break;
        case 'yaw':
          viewerRef.current.setYaw(value);
          break;
        case 'hfov':
          viewerRef.current.setHfov(value);
          break;
      }
      setControls(prev => ({ ...prev, [type]: value }));
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-7xl h-full max-h-[90vh] bg-card rounded-xl overflow-hidden shadow-2xl">
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

        {/* Controls Panel */}
        <div className="absolute top-6 right-20 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowControls(!showControls)}
            className="text-white hover:bg-white/20 mb-2"
          >
            <Settings className="h-4 w-4 mr-2" />
            Controls
          </Button>
          
          {showControls && (
            <Card className="w-64 bg-black/80 border-white/20">
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-white text-sm">Pitch: {controls.pitch.toFixed(1)}°</label>
                  <Slider
                    value={[controls.pitch]}
                    onValueChange={([value]) => handleControlChange('pitch', value)}
                    min={-90}
                    max={90}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white text-sm">Yaw: {controls.yaw.toFixed(1)}°</label>
                  <Slider
                    value={[controls.yaw]}
                    onValueChange={([value]) => handleControlChange('yaw', value)}
                    min={-180}
                    max={180}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white text-sm">Zoom: {controls.hfov.toFixed(0)}</label>
                  <Slider
                    value={[controls.hfov]}
                    onValueChange={([value]) => handleControlChange('hfov', value)}
                    min={50}
                    max={120}
                    step={5}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-6 left-6 z-10 flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleReset}
            className="bg-black/50 text-white border-white/20 hover:bg-black/70"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset View
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={toggleAutoRotate}
            className={`border-white/20 ${
              isAutoRotating 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-black/50 text-white hover:bg-black/70'
            }`}
          >
            {isAutoRotating ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {isAutoRotating ? 'Stop' : 'Auto'} Rotate
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleFullscreen}
            className="bg-black/50 text-white border-white/20 hover:bg-black/70"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4 mr-2" /> : <Maximize2 className="h-4 w-4 mr-2" />}
            {isFullscreen ? 'Exit' : 'Full'} Screen
          </Button>
        </div>

        {/* Panorama Container */}
        <div className="w-full h-full relative">
          {isLoading && (
            <div className="absolute inset-0 bg-background flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Loading 360° View</h3>
                <p className="text-muted-foreground">Preparing immersive experience...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 bg-background flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Unable to Load 360° View</h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={initializePanorama} variant="outline">
                  Try Again
                </Button>
              </div>
            </div>
          )}
          
          <div
            ref={panoramaRef}
            className="w-full h-full"
            style={{ minHeight: '500px' }}
          />
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 text-center shadow-2xl">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-800">Loading 360° panoramic view...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// CSS for custom hotspots (inject into head)
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .custom-hotspot {
      width: 30px;
      height: 30px;
      background: rgba(59, 130, 246, 0.8);
      border: 3px solid white;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    .custom-hotspot:hover {
      background: rgba(59, 130, 246, 1);
      transform: scale(1.2);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    }
    .pnlm-container {
      font-family: system-ui, sans-serif;
    }
  `;
  document.head.appendChild(style);
}
