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
import Link from "next/link";

// Data for National Park destinations in Jharkhand
const nationalParkPlaces = [
  {
    id: 1,
    name: "Betla National Park",
    location: "Palamu, Jharkhand",
    type: "First National Park of Jharkhand",
    rating: 4.5,
    coordinates: { lat: 23.8667, lng: 84.2000 },
    images: [
      "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80"
    ],
    description: "Betla National Park, established in 1986, was the first national park of Jharkhand and is part of the Palamu Tiger Reserve. Covering an area of 226 square kilometers, this park is home to tigers, elephants, leopards, wild boars, sambars, and numerous species of birds. The park offers exciting jungle safaris where visitors can spot wildlife in their natural habitat.",
    history: "Established in 1986 as part of Project Tiger, Betla National Park was created from the Palamu Wildlife Sanctuary. The area has ancient significance with the historic Betla Fort located within the park premises, dating back to the 16th century.",
    significance: "As Jharkhand's first national park and part of the Palamu Tiger Reserve, Betla plays a crucial role in tiger conservation. The park is also significant for its historical value, housing the ancient Betla Fort within its boundaries.",
    timings: "6:00 AM - 11:00 AM, 2:00 PM - 5:00 PM",
    bestTimeToVisit: "November to April (Ideal for wildlife spotting)",
    nearbyAttractions: ["Betla Fort", "Palamu Fort", "Netarhat Hill Station"],
    facilities: ["Jungle Safari", "Tiger Spotting", "Elephant Rides", "Forest Rest Houses", "Nature Guide", "Photography Permits"]
  },
  {
    id: 2,
    name: "Hazaribagh National Park",
    location: "Hazaribagh, Jharkhand",
    type: "Dense Forest Wildlife Sanctuary",
    rating: 4.3,
    coordinates: { lat: 23.9833, lng: 85.3667 },
    images: [
      "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80"
    ],
    description: "Hazaribagh National Park spans over 186 square kilometers of dense deciduous forests and grasslands. The park is known for its significant tiger population and serves as an important wildlife corridor. Besides tigers, the park is home to leopards, sambars, nilgais, wild boars, and various species of deer.",
    history: "Originally established as a wildlife sanctuary, Hazaribagh National Park was upgraded to national park status to provide better protection to its diverse wildlife. The park has been a significant area for wildlife conservation in Jharkhand.",
    significance: "Hazaribagh National Park serves as a crucial wildlife corridor and is known for its tiger conservation efforts. The park offers excellent opportunities for wildlife photography and nature enthusiasts seeking to explore pristine wilderness areas.",
    timings: "6:00 AM - 11:00 AM, 3:00 PM - 6:00 PM",
    bestTimeToVisit: "October to March (Pleasant weather for safaris)",
    nearbyAttractions: ["Hazaribagh Lake", "Konar Dam", "Local Tribal Villages"],
    facilities: ["Wildlife Safaris", "Bird Watching", "Nature Photography", "Forest Lodges", "Expert Guides", "Binocular Rental"]
  }
];

// Google Maps component with interactive marker
const GoogleMap = ({ place }: { place: any }) => {
  const [showMarkerPopup, setShowMarkerPopup] = useState(false);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lng}`;
  
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${place.coordinates.lng}!3d${place.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(place.name)}!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`;
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg relative">
      <div className="h-80 relative">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${place.name}`}
          className="rounded-xl"
        />
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div 
            className="relative cursor-pointer group"
            onClick={() => setShowMarkerPopup(!showMarkerPopup)}
          >
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
                <p className="text-gray-500 text-xs mb-4">Click below to get directions</p>
                
                <div className="space-y-2">
                  <Button 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(directionsUrl, '_blank');
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white w-full text-xs h-8"
                  >
                    <NavigationIcon className="h-3 w-3 mr-2" />
                    Get Directions
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMarkerPopup(false);
                    }}
                    className="w-full text-xs h-7"
                  >
                    Close
                  </Button>
                </div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/95"></div>
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
              <p className="text-gray-600 text-xs mb-2 leading-relaxed">{place.type} • Rating: {place.rating}⭐</p>
              <div className="text-xs text-green-600 font-medium">📍 Click the red marker to get directions</div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${place.coordinates.lat},${place.coordinates.lng}`, '_blank')}
            className="bg-white/95 backdrop-blur-sm text-gray-700 hover:bg-white text-xs h-8 px-3 shadow-lg"
          >
            <Globe className="h-3 w-3 mr-1" />
            Open in Google Maps
          </Button>
        </div>
        
        {showMarkerPopup && (
          <div 
            className="absolute inset-0 z-0" 
            onClick={() => setShowMarkerPopup(false)}
          />
        )}
      </div>
      
      <div className="p-4 bg-gradient-to-r from-gray-50 to-green-50 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-red-500" />
              <span className="font-mono">{place.coordinates.lat.toFixed(4)}, {place.coordinates.lng.toFixed(4)}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-xs">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span>{place.rating} Rating</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(`${place.coordinates.lat}, ${place.coordinates.lng}`);
                alert('GPS coordinates copied to clipboard!');
              }}
              className="text-xs h-8 px-3 hover:bg-green-50"
            >
              📋 Copy GPS
            </Button>
            <Button
              size="sm"
              onClick={() => window.open(directionsUrl, '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white text-xs h-8 px-3"
            >
              <NavigationIcon className="h-3 w-3 mr-1" />
              Navigate Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function NationalParkPage() {
  const [selectedPlace, setSelectedPlace] = useState(nationalParkPlaces[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedPlace.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedPlace.images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextImage, 5000);
    return () => clearInterval(timer);
  }, [selectedPlace]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🦌 National Parks of Jharkhand
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Wildlife 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"> National Parks</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore Jharkhand's pristine national parks - home to majestic tigers, elephants, and diverse wildlife. Experience thrilling jungle safaris, spot rare species, and immerse yourself in untouched wilderness.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge className="bg-green-100 text-green-800 px-4 py-2">🐅 Tiger Spotting</Badge>
            <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2">🦌 Wildlife Safari</Badge>
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">🦅 Bird Watching</Badge>
            <Badge className="bg-orange-100 text-orange-800 px-4 py-2">📸 Nature Photography</Badge>
          </div>
        </div>
      </section>

      {/* National Park Selection */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Choose a National Park to Explore</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {nationalParkPlaces.map((place, index) => (
              <Card 
                key={place.id} 
                className={`cursor-pointer transition-all duration-300 ${
                  selectedPlace.id === place.id ? 'ring-2 ring-green-500 shadow-xl' : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedPlace(place)}
              >
                <CardContent className="p-4">
                  <div className="relative h-40 mb-3 rounded-lg overflow-hidden">
                    <Image src={place.images[0]} alt={place.name} fill className="object-cover" />
                    <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 text-xs font-semibold">
                      {place.name === "Betla National Park" ? "226 km²" : "186 km²"}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{place.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{place.location}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">{place.type}</Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3 w-3 fill-current text-yellow-400" />
                      <span>{place.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Images and Gallery */}
            <div className="space-y-6">
              <Card className="overflow-hidden shadow-xl">
                <div className="relative h-96">
                  <Image
                    src={selectedPlace.images[currentImageIndex]}
                    alt={selectedPlace.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-all duration-200 shadow-lg"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-all duration-200 shadow-lg"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {selectedPlace.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{selectedPlace.name}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{selectedPlace.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span>{selectedPlace.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <div className="grid grid-cols-3 gap-3">
                {selectedPlace.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative h-24 cursor-pointer rounded-lg overflow-hidden ${
                      index === currentImageIndex ? 'ring-2 ring-green-500' : ''
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${selectedPlace.name} ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Information */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPlace.name}</h2>
                      <p className="text-gray-600 flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {selectedPlace.location}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-green-800 mb-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-semibold">Rating</span>
                      </div>
                      <p className="text-green-900 font-bold">{selectedPlace.rating}/5.0</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-blue-800 mb-1">
                        <Calendar className="h-4 w-4" />
                        <span className="font-semibold">Best Time</span>
                      </div>
                      <p className="text-blue-900 font-bold">{selectedPlace.bestTimeToVisit}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                      <p className="text-gray-700 leading-relaxed">{selectedPlace.description}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Facilities</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPlace.facilities.map((facility, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Safari Timings</h3>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="h-4 w-4" />
                        <span>{selectedPlace.timings}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Book Safari
                </Button>
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  View Gallery
                </Button>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              📍 Location & Directions
            </h3>
            <GoogleMap place={selectedPlace} />
          </div>

          {/* Additional Information */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">History & Significance</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{selectedPlace.history}</p>
                <p className="text-gray-700 leading-relaxed">{selectedPlace.significance}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Nearby Attractions</h3>
                <ul className="space-y-2">
                  {selectedPlace.nearbyAttractions.map((attraction, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <ChevronRight className="h-4 w-4 text-green-500" />
                      {attraction}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
