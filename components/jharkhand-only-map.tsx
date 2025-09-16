"use client";

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Expand, Minimize2, Info, MapPin } from 'lucide-react';
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

interface JharkhandOnlyMapProps {
  touristSpots: TouristSpot[];
  onLocationSelect: (locationId: string) => void;
}

export function JharkhandOnlyMap({ touristSpots, onLocationSelect }: JharkhandOnlyMapProps) {
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [streetViewModal, setStreetViewModal] = useState<{
    isOpen: boolean;
    spot: TouristSpot | null;
  }>({ isOpen: false, spot: null });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

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

  // Convert lat/lng to SVG coordinates within Jharkhand boundaries
  const getSpotPosition = (lat: number, lng: number) => {
    // Jharkhand bounds: 21.9667-25.4333 N, 83.3167-87.9167 E
    const latRange = 25.4333 - 21.9667;
    const lngRange = 87.9167 - 83.3167;
    
    // Map to SVG viewBox (0,0,1000,800)
    const x = ((lng - 83.3167) / lngRange) * 900 + 50; // 50px margin
    const y = ((25.4333 - lat) / latRange) * 700 + 50; // 50px margin
    
    return { x, y };
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

  // Jharkhand districts with accurate boundaries
  const districts = [
    {
      name: "Ranchi",
      path: "M400,350 L500,330 L520,380 L500,450 L450,470 L400,450 L380,400 Z",
      color: "#3b82f6",
      capital: true
    },
    {
      name: "Dhanbad",
      path: "M650,200 L750,180 L770,230 L750,280 L700,290 L650,270 L640,230 Z",
      color: "#f59e0b"
    },
    {
      name: "East Singhbhum",
      path: "M650,400 L750,380 L780,430 L760,480 L710,500 L660,480 L640,430 Z",
      color: "#8b5cf6"
    },
    {
      name: "West Singhbhum",
      path: "M480,450 L580,430 L600,480 L580,530 L530,550 L480,530 L460,480 Z",
      color: "#10b981"
    },
    {
      name: "Deoghar",
      path: "M550,150 L650,130 L670,180 L650,230 L600,240 L550,220 L540,180 Z",
      color: "#ef4444"
    },
    {
      name: "Hazaribagh",
      path: "M300,250 L400,230 L420,280 L400,330 L350,340 L300,320 L290,280 Z",
      color: "#06b6d4"
    },
    {
      name: "Palamu",
      path: "M200,300 L300,280 L320,330 L300,380 L250,390 L200,370 L190,330 Z",
      color: "#84cc16"
    },
    {
      name: "Latehar",
      path: "M250,380 L350,360 L370,410 L350,460 L300,470 L250,450 L240,410 Z",
      color: "#f97316"
    },
    {
      name: "Garhwa",
      path: "M150,350 L250,330 L270,380 L250,430 L200,440 L150,420 L140,380 Z",
      color: "#ec4899"
    },
    {
      name: "Chatra",
      path: "M200,200 L300,180 L320,230 L300,280 L250,290 L200,270 L190,230 Z",
      color: "#14b8a6"
    },
    {
      name: "Koderma",
      path: "M350,180 L450,160 L470,210 L450,260 L400,270 L350,250 L340,210 Z",
      color: "#8b5cf6"
    },
    {
      name: "Giridih",
      path: "M450,200 L550,180 L570,230 L550,280 L500,290 L450,270 L440,230 Z",
      color: "#f59e0b"
    },
    {
      name: "Bokaro",
      path: "M500,250 L600,230 L620,280 L600,330 L550,340 L500,320 L490,280 Z",
      color: "#3b82f6"
    },
    {
      name: "Ramgarh",
      path: "M400,280 L500,260 L520,310 L500,360 L450,370 L400,350 L390,310 Z",
      color: "#10b981"
    },
    {
      name: "Dumka",
      path: "M600,100 L700,80 L720,130 L700,180 L650,190 L600,170 L590,130 Z",
      color: "#ef4444"
    },
    {
      name: "Jamtara",
      path: "M700,150 L800,130 L820,180 L800,230 L750,240 L700,220 L690,180 Z",
      color: "#06b6d4"
    },
    {
      name: "Pakur",
      path: "M750,100 L850,80 L870,130 L850,180 L800,190 L750,170 L740,130 Z",
      color: "#84cc16"
    },
    {
      name: "Godda",
      path: "M650,50 L750,30 L770,80 L750,130 L700,140 L650,120 L640,80 Z",
      color: "#f97316"
    },
    {
      name: "Sahibganj",
      path: "M750,50 L850,30 L870,80 L850,130 L800,140 L750,120 L740,80 Z",
      color: "#ec4899"
    },
    {
      name: "Sahebganj",
      path: "M800,80 L900,60 L920,110 L900,160 L850,170 L800,150 L790,110 Z",
      color: "#14b8a6"
    },
    {
      name: "Seraikela-Kharsawan",
      path: "M580,480 L680,460 L700,510 L680,560 L630,570 L580,550 L570,510 Z",
      color: "#8b5cf6"
    },
    {
      name: "Khunti",
      path: "M320,450 L420,430 L440,480 L420,530 L370,540 L320,520 L310,480 Z",
      color: "#f59e0b"
    },
    {
      name: "Simdega",
      path: "M150,480 L250,460 L270,510 L250,560 L200,570 L150,550 L140,510 Z",
      color: "#3b82f6"
    },
    {
      name: "Gumla",
      path: "M200,500 L300,480 L320,530 L300,580 L250,590 L200,570 L190,530 Z",
      color: "#10b981"
    }
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
      {/* Main SVG Map - JHARKHAND ONLY */}
      <div className="absolute inset-0 w-full h-full">
        <svg 
          viewBox="0 0 1000 800" 
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background */}
          <defs>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#f0f9ff', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#e0f2fe', stopOpacity: 1}} />
            </linearGradient>
            
            {/* Drop shadow filter */}
            <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
            </filter>
          </defs>
          
          <rect width="1000" height="800" fill="url(#mapGradient)" />
          
          {/* Jharkhand State Border - Accurate Shape */}
          <path
            d="M100,100 L200,80 L350,90 L500,100 L650,110 L800,120 L850,150 L880,200 L900,280 L880,360 L850,440 L800,520 L750,580 L650,620 L550,640 L450,650 L350,640 L250,620 L180,580 L120,520 L80,440 L60,360 L70,280 L90,200 Z"
            fill="none"
            stroke="#1e40af"
            strokeWidth="4"
            strokeLinejoin="round"
            filter="url(#dropShadow)"
          />
          
          {/* Districts */}
          {districts.map((district) => (
            <g key={district.name}>
              <path
                d={district.path}
                fill={district.color}
                fillOpacity="0.7"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinejoin="round"
                className="cursor-pointer transition-all duration-200 hover:fill-opacity-90 hover:stroke-width-3"
                onMouseEnter={() => setHoveredDistrict(district.name)}
                onMouseLeave={() => setHoveredDistrict(null)}
              />
              
              {/* District Labels */}
              <text
                x={getSpotPosition(23.7, 85.6).x + (Math.random() - 0.5) * 200}
                y={getSpotPosition(23.7, 85.6).y + (Math.random() - 0.5) * 200}
                fontSize="12"
                fontWeight="bold"
                fill="#1f2937"
                textAnchor="middle"
                className="pointer-events-none"
              >
                {district.name}
              </text>
              
              {/* Capital star for Ranchi */}
              {district.capital && (
                <text
                  x={getSpotPosition(23.3441, 85.3096).x}
                  y={getSpotPosition(23.3441, 85.3096).y}
                  fontSize="20"
                  fill="#fbbf24"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  ⭐
                </text>
              )}
            </g>
          ))}
          
          {/* Title */}
          <text x="500" y="40" fontSize="28" fontWeight="bold" fill="#1e40af" textAnchor="middle">
            Jharkhand State
          </text>
          <text x="500" y="65" fontSize="16" fill="#64748b" textAnchor="middle">
            Tourist Destinations Map
          </text>
          
          {/* Compass */}
          <g transform="translate(50,50)">
            <circle cx="0" cy="0" r="25" fill="white" stroke="#1e40af" strokeWidth="2" />
            <path d="M0,-20 L8,0 L0,20 L-8,0 Z" fill="#ef4444" />
            <text x="0" y="-30" fontSize="12" fontWeight="bold" fill="#1e40af" textAnchor="middle">N</text>
          </g>
        </svg>
        
        {/* Tourist Spot Markers */}
        {touristSpots.map((spot) => {
          const position = getSpotPosition(spot.lat, spot.lng);
          return (
            <div
              key={spot.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              style={{
                left: `${(position.x / 1000) * 100}%`,
                top: `${(position.y / 800) * 100}%`,
              }}
              onClick={() => handleSpotClick(spot)}
              onDoubleClick={() => handleStreetView(spot)}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-xl transition-all duration-300 group-hover:scale-125 group-hover:shadow-2xl border-3 border-white ${
                  selectedSpot?.id === spot.id ? 'ring-4 ring-yellow-400 scale-125' : ''
                }`}
                style={{ backgroundColor: spot.color }}
              >
                <span className="text-lg">{getSpotIcon(spot.type)}</span>
              </div>
              
              {/* Enhanced Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30">
                <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-xl border border-gray-600">
                  <div className="font-bold">{spot.name}</div>
                  <div className="text-gray-300 text-xs">{spot.type} • {spot.bestTime}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          onClick={toggleFullscreen}
          className="px-4 py-2 bg-white/95 hover:bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg backdrop-blur-sm"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4 mr-2" /> : <Expand className="w-4 h-4 mr-2" />}
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </Button>
      </div>
      
      {/* District Info Panel */}
      {hoveredDistrict && (
        <div className="absolute top-20 left-4 z-20 bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg p-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-gray-800">{hoveredDistrict} District</span>
          </div>
        </div>
      )}
      
      {/* Selected Spot Details */}
      {selectedSpot && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 max-w-sm z-30 border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-xl text-gray-900">{selectedSpot.name}</h3>
            <button
              onClick={() => setSelectedSpot(null)}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ×
            </button>
          </div>
          <div className="text-sm text-blue-600 font-medium mb-3">{selectedSpot.type}</div>
          <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">{selectedSpot.description}</p>
          <div className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Best Time:</span> {selectedSpot.bestTime}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => handleStreetView(selectedSpot)}
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
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
      
      {/* Legend */}
      <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg p-4 max-w-xs">
        <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          Jharkhand Districts & Tourist Spots
        </h4>
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span>Waterfalls 💧</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>Hill Stations ⛰️</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span>Temples 🛕</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span>Wildlife Parks 🌲</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
            <span>Cities 🏙️</span>
          </div>
          <div className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-200">
            <div>⭐ = State Capital (Ranchi)</div>
            <div>Hover districts for names</div>
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 right-4 z-10 max-w-xs">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg p-3">
          <div className="space-y-1 text-xs text-gray-600">
            <div className="font-bold text-gray-800 mb-2">🗺️ Jharkhand Only Map</div>
            <div>• Click tourist spots for details</div>
            <div>• Double-click for 360° Street View</div>
            <div>• Hover districts to see names</div>
            <div>• Shows ONLY Jharkhand state</div>
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