"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import "leaflet/dist/leaflet.css";

import { MapPin, NavigationIcon, Camera } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet"; // Correct import for Leaflet

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const touristSpots = [
    {
      id: "dassam-falls",
      name: "Dassam Falls",
      type: "Waterfall",
      description:
        "Known as the 'Niagara of Jharkhand', this 44-meter waterfall creates a mesmerizing curtain of water.",
      bestTime: "Jul - Feb",
      lat: 23.63,
      lng: 85.46,
      googleMaps: "https://maps.google.com/?q=Dassam+Falls+Jharkhand",
    },
    {
      id: "netarhat",
      name: "Netarhat Hill Station",
      type: "Hill Station",
      description:
        "The 'Queen of Chotanagpur', offering breathtaking sunrise and sunset views.",
      bestTime: "Oct - May",
      lat: 23.4,
      lng: 84.2,
      googleMaps: "https://maps.google.com/?q=Netarhat+Jharkhand",
    },
    {
      id: "betla-national-park",
      name: "Betla National Park",
      type: "Wildlife",
      description:
        "Home to tigers, elephants, and diverse wildlife across 979 sq km.",
      bestTime: "Nov - Apr",
      lat: 23.62,
      lng: 84.42,
      googleMaps: "https://maps.google.com/?q=Betla+National+Park+Jharkhand",
    },
    // Add more spots here with lat/lng coordinates
  ];

  const selectedSpot = selectedLocation
    ? touristSpots.find((spot) => spot.id === selectedLocation)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-16 bg-card">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-card-foreground mb-4">
            Interactive Map of Jharkhand
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore Jharkhand’s waterfalls, hill stations, temples, and wildlife
            sanctuaries. Click on any marker to learn more and get directions.
          </p>
        </div>
      </section>

      {/* Map & Sidebar */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map */}
          <div className="lg:col-span-3">
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
                        click: () => setSelectedLocation(spot.id),
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
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {selectedSpot ? (
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold">{selectedSpot.name}</h3>
                  <Badge className="mt-1">{selectedSpot.type}</Badge>
                  <p className="text-muted-foreground my-4">
                    {selectedSpot.description}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">Best Time:</span>{" "}
                    {selectedSpot.bestTime}
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Link href={selectedSpot.googleMaps} target="_blank">
                      <Button size="sm" className="w-full">
                        <NavigationIcon className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                    </Link>
                    <Link
                      href={`${selectedSpot.googleMaps}&t=k`}
                      target="_blank"
                    >
                      <Button size="sm" variant="outline" className="w-full">
                        <Camera className="h-4 w-4 mr-2" />
                        Satellite View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border bg-card">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Select a Location
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any marker to view details and directions.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
