"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavigationIcon, Camera } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import "leaflet/dist/leaflet.css";

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

interface InteractiveMapProps {
  touristSpots: TouristSpot[];
  onLocationSelect: (locationId: string) => void;
}

export function InteractiveMap({ touristSpots, onLocationSelect }: InteractiveMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [MapContainer, setMapContainer] = useState<any>(null);
  const [TileLayer, setTileLayer] = useState<any>(null);
  const [Marker, setMarker] = useState<any>(null);
  const [Popup, setPopup] = useState<any>(null);
  const [customIcon, setCustomIcon] = useState<any>(null);

  useEffect(() => {
    // Dynamically import react-leaflet and leaflet only on the client side
    const loadMap = async () => {
      if (typeof window !== "undefined") {
        const leaflet = await import("leaflet");
        const reactLeaflet = await import("react-leaflet");

        // Fix for default markers in production
        delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: "/leaflet-images/marker-icon-2x.png",
          iconUrl: "/leaflet-images/marker-icon.png",
          shadowUrl: "/leaflet-images/marker-shadow.png",
        });

        // Create custom icon
        const icon = new leaflet.Icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        });

        setMapContainer(() => reactLeaflet.MapContainer);
        setTileLayer(() => reactLeaflet.TileLayer);
        setMarker(() => reactLeaflet.Marker);
        setPopup(() => reactLeaflet.Popup);
        setCustomIcon(icon);
        setMapLoaded(true);
      }
    };

    loadMap();
  }, []);

  if (!mapLoaded || !MapContainer || !TileLayer || !Marker || !Popup) {
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
    <Card className="border-border bg-card">
      <CardContent className="p-0">
        <MapContainer
          center={[23.6102, 85.2799]} // Jharkhand center
          zoom={7}
          style={{ height: "600px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {touristSpots.map((spot) => (
            <Marker
              key={spot.id}
              position={[spot.lat, spot.lng]}
              icon={customIcon}
              eventHandlers={{
                click: () => onLocationSelect(spot.id),
              }}
            >
              <Popup>
                <div className="flex flex-col space-y-2">
                  <strong>{spot.name}</strong>
                  <p>{spot.description}</p>
                  <p>
                    <span className="font-medium">Best Time:</span>{" "}
                    {spot.bestTime}
                  </p>
                  <Link href={spot.googleMaps} target="_blank">
                    <Button size="sm" className="w-full">
                      <NavigationIcon className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </Link>
                  <Link href={`${spot.googleMaps}&t=k`} target="_blank">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Satellite View
                    </Button>
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </CardContent>
    </Card>
  );
}
