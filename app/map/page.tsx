"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  NavigationIcon,
  Camera,
  Mountain,
  TreePine,
  Building,
  Waves,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const touristSpots = [
    {
      id: "dassam-falls",
      name: "Dassam Falls",
      type: "Waterfall",
      description:
        "Known as the 'Niagara of Jharkhand', this 44-meter waterfall creates a mesmerizing curtain of water.",
      bestTime: "Jul - Feb",
      coordinates: { x: 42, y: 58 },
      googleMaps: "https://maps.google.com/?q=Dassam+Falls+Jharkhand",
      icon: Waves,
      color: "#3B82F6",
    },
    {
      id: "netarhat",
      name: "Netarhat Hill Station",
      type: "Hill Station",
      description:
        "The 'Queen of Chotanagpur', offering breathtaking sunrise and sunset views.",
      bestTime: "Oct - May",
      coordinates: { x: 25, y: 70 },
      googleMaps: "https://maps.google.com/?q=Netarhat+Jharkhand",
      icon: Mountain,
      color: "#10B981",
    },
    {
      id: "betla-national-park",
      name: "Betla National Park",
      type: "Wildlife",
      description:
        "Home to tigers, elephants, and diverse wildlife across 979 sq km.",
      bestTime: "Nov - Apr",
      coordinates: { x: 30, y: 75 },
      googleMaps: "https://maps.google.com/?q=Betla+National+Park+Jharkhand",
      icon: TreePine,
      color: "#059669",
    },
    {
      id: "deoghar",
      name: "Deoghar Baidyanath Temple",
      type: "Temple",
      description:
        "One of the 12 Jyotirlingas, this ancient Shiva temple is a major pilgrimage site.",
      bestTime: "Oct - Mar",
      coordinates: { x: 65, y: 35 },
      googleMaps: "https://maps.google.com/?q=Baidyanath+Temple+Deoghar",
      icon: Building,
      color: "#F59E0B",
    },
    {
      id: "ranchi",
      name: "Ranchi (Capital)",
      type: "City",
      description:
        "The capital city featuring Jagannath Temple and urban attractions.",
      bestTime: "Oct - Mar",
      coordinates: { x: 50, y: 60 },
      googleMaps: "https://maps.google.com/?q=Ranchi+Jharkhand",
      icon: Building,
      color: "#EF4444",
    },
    {
      id: "parasnath-hill",
      name: "Parasnath Hill",
      type: "Hill Station",
      description:
        "The highest peak in Jharkhand at 1,365 meters, sacred to Jains.",
      bestTime: "Oct - Mar",
      coordinates: { x: 70, y: 45 },
      googleMaps: "https://maps.google.com/?q=Parasnath+Hill+Jharkhand",
      icon: Mountain,
      color: "#10B981",
    },
    {
      id: "hazaribagh",
      name: "Hazaribagh National Park",
      type: "Wildlife",
      description:
        "A wildlife sanctuary known for its diverse flora and fauna.",
      bestTime: "Nov - Apr",
      coordinates: { x: 55, y: 50 },
      googleMaps: "https://maps.google.com/?q=Hazaribagh+National+Park",
      icon: TreePine,
      color: "#059669",
    },
    {
      id: "jonha-falls",
      name: "Jonha Falls",
      type: "Waterfall",
      description:
        "Also known as Gautamdhara, this 43-meter waterfall is associated with Lord Buddha.",
      bestTime: "Jul - Mar",
      coordinates: { x: 48, y: 62 },
      googleMaps: "https://maps.google.com/?q=Jonha+Falls+Jharkhand",
      icon: Waves,
      color: "#3B82F6",
    },
    {
      id: "rajrappa",
      name: "Rajrappa Temple",
      type: "Temple",
      description:
        "A unique temple dedicated to Goddess Chhinnamasta at river confluence.",
      bestTime: "Oct - Mar",
      coordinates: { x: 40, y: 45 },
      googleMaps: "https://maps.google.com/?q=Rajrappa+Temple+Jharkhand",
      icon: Building,
      color: "#F59E0B",
    },
    {
      id: "dalma-wildlife",
      name: "Dalma Wildlife Sanctuary",
      type: "Wildlife",
      description: "Famous for its elephant population and diverse wildlife.",
      bestTime: "Nov - Apr",
      coordinates: { x: 35, y: 65 },
      googleMaps: "https://maps.google.com/?q=Dalma+Wildlife+Sanctuary",
      icon: TreePine,
      color: "#059669",
    },
    {
      id: "lodh-falls",
      name: "Lodh Falls",
      type: "Waterfall",
      description: "The highest waterfall in Jharkhand at 143 meters.",
      bestTime: "Jul - Feb",
      coordinates: { x: 28, y: 68 },
      googleMaps: "https://maps.google.com/?q=Lodh+Falls+Jharkhand",
      icon: Waves,
      color: "#3B82F6",
    },

    {
      id: "patratu-valley",
      name: "Patratu Valley",
      type: "Hill Station",
      description:
        "Scenic valley with winding roads, lush greenery, and the Patratu Dam.",
      bestTime: "Oct - Apr",
      coordinates: { x: 45, y: 50 },
      googleMaps: "https://maps.google.com/?q=Patratu+Valley+Jharkhand",
      icon: Mountain,
      color: "#10B981",
    },
    {
      id: "hirni-falls",
      name: "Hirni Falls",
      type: "Waterfall",
      description:
        "A picturesque waterfall amidst dense forests, perfect for picnics.",
      bestTime: "Jul - Feb",
      coordinates: { x: 38, y: 60 },
      googleMaps: "https://maps.google.com/?q=Hirni+Falls+Jharkhand",
      icon: Waves,
      color: "#3B82F6",
    },
    {
      id: "rock-garden",
      name: "Ranchi Rock Garden",
      type: "City",
      description:
        "Popular tourist spot with sculptures, gardens, and a lake view.",
      bestTime: "Oct - Mar",
      coordinates: { x: 52, y: 63 },
      googleMaps: "https://maps.google.com/?q=Rock+Garden+Ranchi",
      icon: Building,
      color: "#EF4444",
    },
    {
      id: "nakti-falls",
      name: "Nakti Falls",
      type: "Waterfall",
      description:
        "A hidden gem waterfall near Latehar, surrounded by serene forests.",
      bestTime: "Jul - Feb",
      coordinates: { x: 32, y: 72 },
      googleMaps: "https://maps.google.com/?q=Nakti+Falls+Jharkhand",
      icon: Waves,
      color: "#3B82F6",
    },
    {
      id: "maithon-dam",
      name: "Maithon Dam",
      type: "City",
      description:
        "A huge dam on the Barakar River, offering boating and scenic views.",
      bestTime: "Oct - Mar",
      coordinates: { x: 75, y: 40 },
      googleMaps: "https://maps.google.com/?q=Maithon+Dam+Jharkhand",
      icon: Building,
      color: "#EF4444",
    },
    {
      id: "tagore-hill",
      name: "Tagore Hill",
      type: "City",
      description:
        "Historic site in Ranchi associated with Rabindranath Tagore, offering panoramic views.",
      bestTime: "Oct - Mar",
      coordinates: { x: 53, y: 61 },
      googleMaps: "https://maps.google.com/?q=Tagore+Hill+Ranchi",
      icon: Building,
      color: "#EF4444",
    },
    {
      id: "udhuwa-lake",
      name: "Udhuwa Lake",
      type: "Wildlife",
      description:
        "A bird sanctuary near Sahibganj, home to migratory and resident birds.",
      bestTime: "Nov - Mar",
      coordinates: { x: 78, y: 42 },
      googleMaps: "https://maps.google.com/?q=Udhuwa+Lake+Jharkhand",
      icon: TreePine,
      color: "#059669",
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
                <div className="relative">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-[600px] bg-gradient-to-br from-green-50 to-blue-50"
                  >
                    {/* State Outline */}
                    <path
                      d="M15,25 L85,25 L85,35 L80,40 L85,45 L85,55 L80,60 L85,65 L85,75 L75,85 L25,85 L15,75 L10,65 L15,55 L10,45 L15,35 Z"
                      fill="#E5F3E5"
                      stroke="#10B981"
                      strokeWidth="0.5"
                      className="opacity-60"
                    />

                    {/* Tourist Spots */}
                    {touristSpots.map((spot) => (
                      <g key={spot.id}>
                        <circle
                          cx={spot.coordinates.x}
                          cy={spot.coordinates.y}
                          r={
                            selectedLocation === spot.id
                              ? "2.5"
                              : hoveredLocation === spot.id
                              ? "2"
                              : "1.5"
                          }
                          fill={spot.color}
                          stroke="white"
                          strokeWidth="0.3"
                          className="cursor-pointer transition-colors duration-200"
                          onMouseEnter={() => setHoveredLocation(spot.id)}
                          onMouseLeave={() => setHoveredLocation(null)}
                          onClick={() =>
                            setSelectedLocation(
                              selectedLocation === spot.id ? null : spot.id
                            )
                          }
                        />

                        {/* Pulse effect */}
                        {selectedLocation === spot.id && (
                          <circle
                            cx={spot.coordinates.x}
                            cy={spot.coordinates.y}
                            r="3"
                            fill="none"
                            stroke={spot.color}
                            strokeWidth="0.2"
                            className="animate-ping opacity-75"
                          />
                        )}

                        {/* Label */}
                        {(hoveredLocation === spot.id ||
                          selectedLocation === spot.id) && (
                          <g pointerEvents="none">
                            <rect
                              x={spot.coordinates.x - 10}
                              y={spot.coordinates.y - 8}
                              width="20"
                              height="5"
                              fill="rgba(0,0,0,0.8)"
                              rx="1"
                            />
                            <text
                              x={spot.coordinates.x}
                              y={spot.coordinates.y - 5}
                              textAnchor="middle"
                              className="text-[1.5px] fill-white"
                            >
                              {spot.name}
                            </text>
                          </g>
                        )}
                      </g>
                    ))}
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {selectedSpot ? (
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{selectedSpot.name}</h3>
                      <Badge className="mt-1">{selectedSpot.type}</Badge>
                    </div>
                    {(() => {
                      const SpotIcon = selectedSpot.icon;
                      return (
                        <SpotIcon
                          className="h-6 w-6"
                          style={{ color: selectedSpot.color }}
                        />
                      );
                    })()}
                  </div>

                  <p className="text-muted-foreground mb-4">
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

            {/* Popular Destinations */}
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Popular Destinations
                </h3>
                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                  {[
                    "Waterfall",
                    "Hill Station",
                    "Wildlife",
                    "Temple",
                    "City",
                  ].map((category) => {
                    const filteredSpots = touristSpots.filter(
                      (spot) => spot.type === category
                    );
                    if (filteredSpots.length === 0) return null;

                    return (
                      <div key={category}>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                          {category}s
                        </h4>
                        <div className="space-y-2">
                          {filteredSpots.map((spot) => (
                            <button
                              key={spot.id}
                              onClick={() => setSelectedLocation(spot.id)}
                              className="w-full text-left p-2 rounded-md hover:bg-muted transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className="w-3 h-3 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: spot.color }}
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
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
