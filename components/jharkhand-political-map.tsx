"use client";

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Expand, Minimize2 } from 'lucide-react';
import { IframeStreetView } from './iframe-street-view';

interface TouristSpot {
  id: string;
  name: string;
  type: string;
  color: string;
  description: string;
  bestTime: string;
  lat: number;
  lng: number;
  googleMaps: string;
}

interface JharkhandPoliticalMapProps {
  touristSpots: TouristSpot[];
  onLocationSelect: (locationId: string) => void;
}

export function JharkhandPoliticalMap({ touristSpots, onLocationSelect }: JharkhandPoliticalMapProps) {
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [streetViewModal, setStreetViewModal] = useState<{
    isOpen: boolean;
    spot: TouristSpot | null;
  }>({ isOpen: false, spot: null });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleSpotClick = useCallback((spot: TouristSpot) => {
    setSelectedSpot(spot);
    onLocationSelect(spot.id);
  }, [onLocationSelect]);

  const handleStreetView = useCallback((spot: TouristSpot) => {
    setStreetViewModal({ isOpen: true, spot });
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // Map coordinates to screen positions (relative to the Jharkhand map)
  const getSpotPosition = (lat: number, lng: number) => {
    // Jharkhand bounds: 21.9667-25.4333 N, 83.3167-87.9167 E
    const latRange = 25.4333 - 21.9667;
    const lngRange = 87.9167 - 83.3167;
    
    // Convert to percentage positions on the map
    const x = ((lng - 83.3167) / lngRange) * 100;
    const y = ((25.4333 - lat) / latRange) * 100; // Inverted Y for screen coordinates
    
    return { x: `${x}%`, y: `${y}%` };
  };

  const getSpotIcon = (type: string): string => {
    const iconMap: { [key: string]: string } = {
      'Waterfall': '💧',
      'Hill Station': '⛰️',
      'Temple': '🛕',
      'Wildlife': '🌲',
      'City': '🏙️',
      'Dam': '🌊'
    };
    return iconMap[type] || '📍';
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden">
      {/* Jharkhand Political Map SVG */}
      <div className="absolute inset-0 w-full h-full">
        <svg 
          viewBox="0 0 800 600" 
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background */}
          <rect width="800" height="600" fill="#f0f9ff" />
          
          {/* Jharkhand State with Districts */}
          <g transform="translate(50, 50)">
            {/* Main Jharkhand boundary */}
            <path
              d="M100,50 L200,30 L350,50 L450,80 L550,120 L600,180 L580,280 L520,380 L450,420 L350,450 L250,430 L150,400 L80,350 L60,280 L70,200 L100,120 Z"
              fill="#22c55e"
              stroke="#166534"
              strokeWidth="3"
              opacity="0.8"
            />
            
            {/* Districts - Different colors like your reference image */}
            {/* Ranchi District */}
            <path
              d="M280,200 L380,180 L420,240 L380,300 L320,320 L260,300 L240,250 Z"
              fill="#3b82f6"
              stroke="#1e40af"
              strokeWidth="1.5"
              opacity="0.7"
            />
            
            {/* Dhanbad District */}
            <path
              d="M420,120 L520,100 L550,160 L520,200 L460,180 L420,150 Z"
              fill="#f59e0b"
              stroke="#d97706"
              strokeWidth="1.5"
              opacity="0.7"
            />
            
            {/* Jamshedpur District */}
            <path
              d="M480,250 L550,230 L580,280 L550,330 L480,310 L450,280 Z"
              fill="#8b5cf6"
              stroke="#7c3aed"
              strokeWidth="1.5"
              opacity="0.7"
            />
            
            {/* Deoghar District */}
            <path
              d="M350,80 L450,70 L480,120 L450,150 L380,140 L350,110 Z"
              fill="#ef4444"
              stroke="#dc2626"
              strokeWidth="1.5"
              opacity="0.7"
            />
            
            {/* Hazaribagh District */}
            <path
              d="M200,120 L300,100 L350,150 L320,200 L260,180 L200,160 Z"
              fill="#10b981"
              stroke="#059669"
              strokeWidth="1.5"
              opacity="0.7"
            />
            
            {/* Palamu District */}
            <path
              d="M120,180 L200,160 L240,220 L200,280 L150,260 L120,220 Z"
              fill="#06b6d4"
              stroke="#0891b2"
              strokeWidth="1.5"
              opacity="0.7"
            />
            
            {/* Garhwa District */}
            <path
              d="M80,250 L150,230 L180,280 L150,330 L100,310 L80,280 Z"
              fill="#f97316"
              stroke="#ea580c"
              strokeWidth="1.5"
              opacity="0.7"
            />
            
            {/* Other districts */}
            <path
              d="M350,300 L450,280 L480,330 L450,380 L380,360 L350,330 Z"
              fill="#ec4899"
              stroke="#db2777"
              strokeWidth="1.5"
              opacity="0.7"
            />
            
            {/* District labels */}
            <text x="350" y="240" fontSize="14" fontWeight="bold" fill="#1f2937" textAnchor="middle">Ranchi</text>
            <text x="480" y="140" fontSize="12" fontWeight="bold" fill="#1f2937" textAnchor="middle">Dhanbad</text>
            <text x="520" y="280" fontSize="12" fontWeight="bold" fill="#1f2937" textAnchor="middle">East Singhbhum</text>
            <text x="410" y="100" fontSize="12" fontWeight="bold" fill="#1f2937" textAnchor="middle">Deoghar</text>
            <text x="250" y="140" fontSize="12" fontWeight="bold" fill="#1f2937" textAnchor="middle">Hazaribagh</text>
            <text x="170" y="200" fontSize="12" fontWeight="bold" fill="#1f2937" textAnchor="middle">Palamu</text>
            <text x="120" y="280" fontSize="12" fontWeight="bold" fill="#1f2937" textAnchor="middle">Garhwa</text>
            
            {/* Title */}
            <text x="350" y="30" fontSize="22" fontWeight="bold" fill="#166534" textAnchor="middle">
              Jharkhand State - Tourist Map
            </text>
          </g>
        </svg>
        
        {/* Interactive Tourist Spot Markers */}
        {touristSpots.map((spot) => {
          const position = getSpotPosition(spot.lat, spot.lng);
          return (
            <div
              key={spot.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
              style={{
                left: position.x,
                top: position.y,
              }}
              onClick={() => handleSpotClick(spot)}
              onDoubleClick={() => handleStreetView(spot)}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl ${
                  selectedSpot?.id === spot.id ? 'ring-4 ring-white scale-110' : ''
                }`}
                style={{ backgroundColor: spot.color }}
              >
                <span className="text-sm">{getSpotIcon(spot.type)}</span>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
                  {spot.name}
                  <div className="text-gray-300">{spot.type}</div>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Selected Spot Info Popup */}
        {selectedSpot && (
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-xl p-4 max-w-sm z-20 border border-gray-200">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-lg text-gray-900">{selectedSpot.name}</h3>
              <button
                onClick={() => setSelectedSpot(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="text-sm text-gray-600 mb-2">{selectedSpot.type}</div>
            <p className="text-sm text-gray-700 mb-3 line-clamp-3">{selectedSpot.description}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleStreetView(selectedSpot)}
                className="flex-1"
              >
                👁️ 360° View
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(selectedSpot.googleMaps, '_blank')}
                className="flex-1"
              >
                🧭 Directions
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          onClick={toggleFullscreen}
          className="px-4 py-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4 mr-2" /> : <Expand className="w-4 h-4 mr-2" />}
          {isFullscreen ? 'Exit' : 'Fullscreen'}
        </Button>
      </div>
      
      {/* Legend */}
      <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg p-4 max-w-xs">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Legend</h4>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span>Waterfalls</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>Hill Stations</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span>Temples</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span>Wildlife</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
            <span>Cities</span>
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 right-4 z-10 max-w-sm">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg p-3">
          <div className="space-y-1 text-xs text-gray-600">
            <div>• Click markers for details</div>
            <div>• Double-click for 360° Street View</div>
            <div>• Districts shown in different colors</div>
          </div>
        </div>
      </div>
      
      {/* Street View Modal */}
      {streetViewModal.isOpen && streetViewModal.spot && (
        <IframeStreetView
          isOpen={streetViewModal.isOpen}
          onClose={() => setStreetViewModal({ isOpen: false, spot: null })}
          title={streetViewModal.spot.name}
          description={streetViewModal.spot.description}
          location={`${streetViewModal.spot.type} • Jharkhand, India`}
          lat={streetViewModal.spot.lat}
          lng={streetViewModal.spot.lng}
        />
      )}
    </div>
  );
}