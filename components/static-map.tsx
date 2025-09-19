"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";

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
  streetViewUrl?: string;
}

interface StaticMapProps {
  touristSpots: TouristSpot[];
  onLocationSelect: (locationId: string) => void;
  selectedLocationId?: string | null;
}

export function StaticMap({ touristSpots, onLocationSelect, selectedLocationId }: StaticMapProps) {
  const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);
  
  // Jharkhand bounds
  const bounds = {
    north: 25.433,
    south: 21.967,
    east: 87.917,
    west: 83.317,
  };

  // SVG dimensions
  const svgWidth = 800;
  const svgHeight = 600;

  // Convert lat/lng to SVG coordinates
  const latLngToSvg = (lat: number, lng: number) => {
    const x = ((lng - bounds.west) / (bounds.east - bounds.west)) * svgWidth;
    const y = svgHeight - ((lat - bounds.south) / (bounds.north - bounds.south)) * svgHeight;
    return { x, y };
  };

  const selectedSpot = selectedLocationId 
    ? touristSpots.find(spot => spot.id === selectedLocationId)
    : null;

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-0">
        <div className="relative">
          <svg 
            width="100%" 
            height="600" 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="bg-green-50"
          >
            {/* Definitions - Must come first */}
            <defs>
              <linearGradient id="jharkhandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4f1d4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.8" />
              </linearGradient>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e5e7eb" strokeWidth="1" opacity="0.2"/>
              </pattern>
            </defs>
            
            {/* Grid background */}
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Jharkhand outline (more accurate simplified shape) */}
            <path
              d="M120 200 L180 150 L280 140 L380 130 L480 140 L580 160 L650 180 L720 220 L730 280 L720 340 L700 400 L680 450 L650 480 L600 510 L520 530 L420 540 L320 535 L250 520 L180 480 L140 430 L110 370 L100 310 L110 250 Z"
              fill="url(#jharkhandGradient)"
              stroke="#059669"
              strokeWidth="3"
              opacity="0.8"
              className="drop-shadow-sm"
            />

            {/* Tourist spots */}
            {touristSpots.map((spot) => {
              const { x, y } = latLngToSvg(spot.lat, spot.lng);
              const isSelected = selectedLocationId === spot.id;
              const isHovered = hoveredSpot === spot.id;
              
              return (
                <g key={spot.id}>
                  {/* Marker circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 12 : isHovered ? 10 : 8}
                    fill={spot.color}
                    stroke="white"
                    strokeWidth="3"
                    className="cursor-pointer transition-all duration-200 drop-shadow-md"
                    onClick={() => onLocationSelect(spot.id)}
                    onMouseEnter={() => setHoveredSpot(spot.id)}
                    onMouseLeave={() => setHoveredSpot(null)}
                  />
                  
                  {/* Pulse animation for selected */}
                  {isSelected && (
                    <circle
                      cx={x}
                      cy={y}
                      r="15"
                      fill={spot.color}
                      opacity="0.3"
                      className="animate-ping"
                    />
                  )}
                  
                  {/* Label on hover */}
                  {(isHovered || isSelected) && (
                    <g>
                      <rect
                        x={Math.max(5, Math.min(svgWidth - 105, x - 50))}
                        y={Math.max(5, y - 35)}
                        width="100"
                        height="20"
                        rx="3"
                        fill="white"
                        stroke="#d1d5db"
                        strokeWidth="1"
                        className="drop-shadow-sm"
                      />
                      <text
                        x={Math.max(55, Math.min(svgWidth - 55, x))}
                        y={Math.max(17, y - 22)}
                        textAnchor="middle"
                        className="text-xs font-medium fill-gray-800"
                        style={{ fontSize: '11px' }}
                      >
                        {spot.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/95 p-3 rounded-lg shadow-lg border">
            <h4 className="text-sm font-semibold mb-2 text-gray-800">Tourist Attractions</h4>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Waterfalls</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Hill Stations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span>Wildlife</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Temples</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span>Cities</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                <span>Dams</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute top-4 right-4 bg-white/95 p-3 rounded-lg shadow-lg border max-w-xs">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-semibold text-gray-800">Interactive Map</span>
            </div>
            <p className="text-xs text-gray-600">
              Click on any marker to view details and get directions to tourist spots across Jharkhand.
            </p>
          </div>
        </div>
        
          {/* Selected spot details below map */}
        {selectedSpot && (
          <div className="p-6 border-t bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">{selectedSpot.name}</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">{selectedSpot.type}</Badge>
                  <span className="text-sm text-green-600 font-medium bg-green-100 px-2 py-1 rounded">
                    📅 Best Time: {selectedSpot.bestTime}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-4 mb-4">
                  {selectedSpot.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <a href={selectedSpot.googleMaps} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </a>
                  {selectedSpot.streetViewUrl && (
                    <a href={selectedSpot.streetViewUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline">
                        🌍 360° View
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}