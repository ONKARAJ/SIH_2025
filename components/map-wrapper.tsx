"use client";

import { useState, useEffect } from "react";
import { InteractiveMap } from "./interactive-map";
import { Card, CardContent } from "@/components/ui/card";

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

interface MapWrapperProps {
  touristSpots: TouristSpot[];
  onLocationSelect: (locationId: string) => void;
}

export function MapWrapper({ touristSpots, onLocationSelect }: MapWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="p-0">
          <div 
            style={{ height: "600px", width: "100%" }}
            className="flex items-center justify-center bg-muted"
          >
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <InteractiveMap 
      touristSpots={touristSpots} 
      onLocationSelect={onLocationSelect}
    />
  );
}
