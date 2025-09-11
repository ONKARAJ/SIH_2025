"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import "leaflet/dist/leaflet.css";

import { MapPin, NavigationIcon, Camera } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const touristSpots = [
    // Waterfalls
    {
      id: "dassam-falls",
      name: "Dassam Falls",
      type: "Waterfall",
      color: "#3b82f6",
      description:
        "Known as the 'Niagara of Jharkhand', this 44-meter waterfall creates a mesmerizing curtain of water.",
      bestTime: "Jul - Feb",
      lat: 23.63,
      lng: 85.46,
      googleMaps: "https://maps.google.com/?q=Dassam+Falls+Jharkhand",
    },
    {
      id: "jonha-falls",
      name: "Jonha Falls",
      type: "Waterfall",
      color: "#3b82f6",
      description:
        "Also known as Gautamdhara, this 43-meter waterfall is associated with Lord Buddha.",
      bestTime: "Jul - Mar",
      lat: 23.61,
      lng: 85.28,
      googleMaps: "https://maps.google.com/?q=Jonha+Falls+Jharkhand",
    },
    {
      id: "hirni-falls",
      name: "Hirni Falls",
      type: "Waterfall",
      color: "#3b82f6",
      description:
        "A picturesque waterfall amidst dense forests, perfect for picnics.",
      bestTime: "Jul - Feb",
      lat: 22.8,
      lng: 84.48,
      googleMaps: "https://maps.google.com/?q=Hirni+Falls+Jharkhand",
    },
    {
      id: "lodh-falls",
      name: "Lodh Falls",
      type: "Waterfall",
      color: "#3b82f6",
      description: "The highest waterfall in Jharkhand at 143 meters.",
      bestTime: "Jul - Feb",
      lat: 23.75,
      lng: 85.43,
      googleMaps: "https://maps.google.com/?q=Lodh+Falls+Jharkhand",
    },
    {
      id: "nakti-falls",
      name: "Nakti Falls",
      type: "Waterfall",
      color: "#3b82f6",
      description:
        "A hidden gem waterfall near Latehar, surrounded by serene forests.",
      bestTime: "Jul - Feb",
      lat: 23.8,
      lng: 84.55,
      googleMaps: "https://maps.google.com/?q=Nakti+Falls+Jharkhand",
    },

    // Hill Stations
    {
      id: "netarhat",
      name: "Netarhat Hill Station",
      type: "Hill Station",
      color: "#10b981",
      description:
        "The 'Queen of Chotanagpur', offering breathtaking sunrise and sunset views.",
      bestTime: "Oct - May",
      lat: 23.4,
      lng: 84.2,
      googleMaps: "https://maps.google.com/?q=Netarhat+Jharkhand",
    },
    {
      id: "parasnath-hill",
      name: "Parasnath Hill",
      type: "Hill Station",
      color: "#10b981",
      description:
        "The highest peak in Jharkhand at 1,365 meters, sacred to Jains.",
      bestTime: "Oct - Mar",
      lat: 24.2,
      lng: 86.68,
      googleMaps: "https://maps.google.com/?q=Parasnath+Hill+Jharkhand",
    },
    {
      id: "patratu-valley",
      name: "Patratu Valley",
      type: "Hill Station",
      color: "#10b981",
      description:
        "Scenic valley with winding roads, lush greenery, and the Patratu Dam.",
      bestTime: "Oct - Apr",
      lat: 23.82,
      lng: 85.35,
      googleMaps: "https://maps.google.com/?q=Patratu+Valley+Jharkhand",
    },

    // Wildlife Parks
    {
      id: "betla-national-park",
      name: "Betla National Park",
      type: "Wildlife",
      color: "#f59e0b",
      description:
        "Home to tigers, elephants, and diverse wildlife across 979 sq km.",
      bestTime: "Nov - Apr",
      lat: 23.62,
      lng: 84.42,
      googleMaps: "https://maps.google.com/?q=Betla+National+Park+Jharkhand",
    },
    {
      id: "hazaribagh",
      name: "Hazaribagh National Park",
      type: "Wildlife",
      color: "#f59e0b",
      description:
        "A wildlife sanctuary known for its diverse flora and fauna.",
      bestTime: "Nov - Apr",
      lat: 23.97,
      lng: 85.36,
      googleMaps: "https://maps.google.com/?q=Hazaribagh+National+Park",
    },
    {
      id: "dalma-wildlife",
      name: "Dalma Wildlife Sanctuary",
      type: "Wildlife",
      color: "#f59e0b",
      description: "Famous for its elephant population and diverse wildlife.",
      bestTime: "Nov - Apr",
      lat: 22.88,
      lng: 86.13,
      googleMaps: "https://maps.google.com/?q=Dalma+Wildlife+Sanctuary",
    },
    {
      id: "udhuwa-lake",
      name: "Udhuwa Lake",
      type: "Wildlife",
      color: "#f59e0b",
      description:
        "A bird sanctuary near Sahibganj, home to migratory and resident birds.",
      bestTime: "Nov - Mar",
      lat: 24.67,
      lng: 87.23,
      googleMaps: "https://maps.google.com/?q=Udhuwa+Lake+Jharkhand",
    },

    // Temples
    {
      id: "deoghar",
      name: "Deoghar Baidyanath Temple",
      type: "Temple",
      color: "#ef4444",
      description:
        "One of the 12 Jyotirlingas, this ancient Shiva temple is a major pilgrimage site.",
      bestTime: "Oct - Mar",
      lat: 24.48,
      lng: 86.7,
      googleMaps: "https://maps.google.com/?q=Baidyanath+Temple+Deoghar",
    },
    {
      id: "rajrappa",
      name: "Rajrappa Temple",
      type: "Temple",
      color: "#ef4444",
      description:
        "A unique temple dedicated to Goddess Chhinnamasta at river confluence.",
      bestTime: "Oct - Mar",
      lat: 23.63,
      lng: 85.54,
      googleMaps: "https://maps.google.com/?q=Rajrappa+Temple+Jharkhand",
    },

    // Cities
    {
      id: "ranchi",
      name: "Ranchi (Capital)",
      type: "City",
      color: "#8b5cf6",
      description:
        "The capital city featuring Jagannath Temple and urban attractions.",
      bestTime: "Oct - Mar",
      lat: 23.34,
      lng: 85.33,
      googleMaps: "https://maps.google.com/?q=Ranchi+Jharkhand",
    },
    {
      id: "rock-garden",
      name: "Ranchi Rock Garden",
      type: "City",
      color: "#8b5cf6",
      description:
        "Popular tourist spot with sculptures, gardens, and a lake view.",
      bestTime: "Oct - Mar",
      lat: 23.36,
      lng: 85.31,
      googleMaps: "https://maps.google.com/?q=Rock+Garden+Ranchi",
    },
    {
      id: "tagore-hill",
      name: "Tagore Hill",
      type: "City",
      color: "#8b5cf6",
      description:
        "Historic site in Ranchi associated with Rabindranath Tagore, offering panoramic views.",
      bestTime: "Oct - Mar",
      lat: 23.34,
      lng: 85.32,
      googleMaps: "https://maps.google.com/?q=Tagore+Hill+Ranchi",
    },

    // Dams
    {
      id: "maithon-dam",
      name: "Maithon Dam",
      type: "Dam",
      color: "#06b6d4",
      description:
        "A huge dam on the Barakar River, offering boating and scenic views.",
      bestTime: "Oct - Mar",
      lat: 23.78,
      lng: 86.11,
      googleMaps: "https://maps.google.com/?q=Maithon+Dam+Jharkhand",
    },
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
          <div className="lg:col-span-1 flex flex-col space-y-6">
            {/* Popular Destinations */}
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Popular Destinations
                </h3>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                  {touristSpots.map((spot) => (
                    <button
                      key={spot.id}
                      onClick={() => setSelectedLocation(spot.id)}
                      className="w-full text-left p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: spot.color || "#6b7280" }}
                        />
                        <div>
                          <p className="text-sm font-medium text-card-foreground">
                            {spot.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {spot.type}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Spot Details */}
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
                    Click on any marker or destination to view details and
                    directions.
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
