"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Calendar,
  Clock,
  Camera,
  Navigation as NavigationIcon,
  Phone,
  Globe,
  Heart,
  Share2
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const wildlifePlaces = [
  {
    id: 1,
    name: "Dalma Hills Wildlife Sanctuary",
    location: "Jamshedpur, Jharkhand",
    type: "Elephant Migration Corridor",
    rating: 4.1,
    coordinates: { lat: 22.8046, lng: 86.1029 },
    images: [
      "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80"
    ],
    description: "Dalma Hills Wildlife Sanctuary spans over 193 square kilometers and serves as a crucial corridor for elephant migration between Jharkhand and Odisha. The sanctuary is home to elephants, leopards, sambars, and various species of birds. The hills offer excellent trekking opportunities and scenic viewpoints.",
    history: "Established to protect the elephant migration corridor, Dalma Hills has been crucial for wildlife conservation in the region. The sanctuary maintains the natural habitat for diverse species.",
    significance: "This sanctuary plays a vital role in elephant conservation and serves as an important wildlife corridor connecting different forest areas.",
    timings: "6:00 AM - 5:00 PM",
    bestTimeToVisit: "November to February (Wildlife spotting season)",
    nearbyAttractions: ["Dimna Lake", "Jubilee Park", "Jamshedpur"],
    facilities: ["Wildlife Safari", "Trekking", "Bird Watching", "Photography", "Nature Guides"]
  }
];

const GoogleMap = ({ place }: { place: any }) => {
  const [showMarkerPopup, setShowMarkerPopup] = useState(false);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lng}`;
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${place.coordinates.lng}!3d${place.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(place.name)}!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`;
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg relative">
      <div className="h-80 relative">
        <iframe src={embedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`Map of ${place.name}`} className="rounded-xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative cursor-pointer group" onClick={() => setShowMarkerPopup(!showMarkerPopup)}>
            <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center transform -translate-y-4 hover:scale-110 transition-transform duration-200 animate-bounce">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <div className="w-3 h-3 bg-red-500/30 rounded-full transform -translate-x-1/2 left-1/2 absolute top-4 blur-sm"></div>
            <div className="absolute inset-0 w-8 h-8 bg-red-500/20 rounded-full animate-ping transform -translate-y-4"></div>
          </div>
          {showMarkerPopup && (
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 min-w-[250px] border border-gray-200 animate-fade-in">
              <div className="text-center">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{place.name}</h4>
                <p className="text-gray-600 text-xs mb-3">{place.location}</p>
                <div className="space-y-2">
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); window.open(directionsUrl, '_blank'); }} className="bg-green-600 hover:bg-green-700 text-white w-full text-xs h-8">
                    <NavigationIcon className="h-3 w-3 mr-2" />Get Directions
                  </Button>
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setShowMarkerPopup(false); }} className="w-full text-xs h-7">Close</Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">🦌</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-xs leading-tight mb-1">{place.name}</h4>
              <p className="text-gray-600 text-xs mb-2 leading-relaxed">{place.type} • {place.rating}⭐</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-r from-gray-50 to-green-50 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-red-500" />
              <span className="font-mono">{place.coordinates.lat.toFixed(4)}, {place.coordinates.lng.toFixed(4)}</span>
            </div>
          </div>
          <Button size="sm" onClick={() => window.open(directionsUrl, '_blank')} className="bg-green-600 hover:bg-green-700 text-white text-xs h-8 px-3">
            <NavigationIcon className="h-3 w-3 mr-1" />Navigate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function WildlifeSanctuaryPage() {
  const [selectedPlace, setSelectedPlace] = useState(wildlifePlaces[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navigation />
      
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🦌 Wildlife Sanctuaries of Jharkhand
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Wildlife <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Sanctuaries</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore Jharkhand's pristine wildlife sanctuaries - home to diverse flora and fauna. Experience close encounters with elephants, leopards, and exotic birds in their natural habitat.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Card className="overflow-hidden shadow-xl">
                <div className="relative h-96">
                  <Image src={selectedPlace.images[currentImageIndex]} alt={selectedPlace.name} fill className="object-cover" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{selectedPlace.name}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{selectedPlace.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedPlace.name}</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">{selectedPlace.description}</p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Facilities</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPlace.facilities.map((facility, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">{facility}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Timings</h3>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="h-4 w-4" />
                        <span>{selectedPlace.timings}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">📍 Location & Directions</h3>
            <GoogleMap place={selectedPlace} />
          </div>
        </div>
      </section>
    </div>
  );
}
