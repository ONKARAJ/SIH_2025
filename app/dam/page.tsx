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

// Data for Dam destinations in Jharkhand
const damPlaces = [
  {
    id: 1,
    name: "Maithon Dam",
    location: "Dhanbad, Jharkhand",
    type: "Multi-purpose Dam",
    rating: 4.0,
    coordinates: { lat: 23.8329, lng: 86.8822 },
    images: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80"
    ],
    description: "Maithon Dam is a major dam constructed on the Damodar River, creating one of the largest reservoirs in Jharkhand. This engineering marvel not only serves important functions like flood control and power generation but also creates a beautiful recreational destination. The large water body offers excellent opportunities for boating, water sports, and fishing.",
    history: "Built as part of the Damodar Valley Corporation (DVC) project in the 1950s, Maithon Dam was constructed to control floods and generate hydroelectric power. The dam has played a crucial role in the industrial development of the Damodar valley region.",
    significance: "As one of the key dams in the DVC project, Maithon Dam serves multiple purposes including flood control, irrigation, and power generation. It has transformed the landscape and economy of the region while creating recreational opportunities.",
    timings: "6:00 AM - 6:00 PM",
    bestTimeToVisit: "November to February",
    nearbyAttractions: ["Panchet Dam", "Dhanbad Coal Mines", "Topchachi Lake"],
    facilities: ["Boating", "Fishing", "Picnic Areas", "Parking", "Restrooms", "Food Stalls"]
  },
  {
    id: 2,
    name: "Panchet Dam",
    location: "Dhanbad, Jharkhand",
    type: "Hydroelectric Dam",
    rating: 3.8,
    coordinates: { lat: 23.6000, lng: 87.0500 },
    images: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
    ],
    description: "Panchet Dam is another significant dam on the Damodar River system, creating a beautiful reservoir surrounded by hills and forests. The dam site offers peaceful environment perfect for relaxation and nature appreciation. Visitors can enjoy fishing, boating, and photography while taking in the scenic beauty of the water body and surrounding landscape.",
    history: "Completed as part of the Damodar Valley Corporation project, Panchet Dam was built to work in conjunction with other dams in the valley to control floods and generate electricity. The dam has been instrumental in flood management for the region.",
    significance: "Panchet Dam plays a vital role in the integrated water management system of the Damodar valley. It provides irrigation water to thousands of acres and generates clean energy while offering recreational opportunities to visitors.",
    timings: "6:00 AM - 7:00 PM",
    bestTimeToVisit: "October to March",
    nearbyAttractions: ["Maithon Dam", "Coal Mining Areas", "Local Villages"],
    facilities: ["Reservoir Views", "Fishing", "Photography", "Parking", "Basic Amenities"]
  },
  {
    id: 3,
    name: "Tilaiya Dam",
    location: "Koderma, Jharkhand",
    type: "Multi-purpose Dam",
    rating: 4.1,
    coordinates: { lat: 24.4167, lng: 85.8667 },
    images: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80"
    ],
    description: "Tilaiya Dam, built on the Barakar River, creates a beautiful reservoir that serves multiple purposes including irrigation, power generation, and recreation. The dam site offers excellent opportunities for water sports, boating, and fishing. The scenic beauty of the reservoir, especially during sunset, makes it a popular destination for photography enthusiasts.",
    history: "Constructed in the 1950s as part of the Damodar Valley Corporation project, Tilaiya Dam was built to harness the waters of the Barakar River. The dam has been a cornerstone of regional development and water management.",
    significance: "Tilaiya Dam is crucial for irrigation in the surrounding agricultural areas and contributes to the power grid. Its reservoir has become an important ecological habitat and recreational resource for local communities and tourists.",
    timings: "5:30 AM - 6:30 PM",
    bestTimeToVisit: "October to March",
    nearbyAttractions: ["Koderma Wildlife Sanctuary", "Buddhist Monasteries", "Local Markets"],
    facilities: ["Water Sports", "Boating", "Sunset Views", "Parking", "Refreshments", "Photography Points"]
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
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
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
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full text-xs h-8"
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
            <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">🌊</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-xs leading-tight mb-1">{place.name}</h4>
              <p className="text-gray-600 text-xs mb-2 leading-relaxed">{place.type} • Rating: {place.rating}⭐</p>
              <div className="text-xs text-blue-600 font-medium">📍 Click the red marker to get directions</div>
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
      
      <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t">
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
              className="text-xs h-8 px-3 hover:bg-blue-50"
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

export default function DamPage() {
  const [selectedPlace, setSelectedPlace] = useState(damPlaces[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactGuidePopupOpen, setIsContactGuidePopupOpen] = useState(false);
  
  // Agent data for Contact Guide popup
  const agentData = {
    name: "Rajesh Kumar",
    phone: "222222222",
    description: "Experienced local guide with 8+ years expertise in Jharkhand dam tourism and water sports activities."
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🌊 Dams of Jharkhand
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Magnificent 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"> Dams & Reservoirs</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover Jharkhand's engineering marvels - massive dams that serve multiple purposes from power generation to recreation. Experience scenic reservoirs, water sports, and the harmony of technology with nature.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">⚡ Hydroelectric Power</Badge>
            <Badge className="bg-cyan-100 text-cyan-800 px-4 py-2">🚤 Water Recreation</Badge>
            <Badge className="bg-green-100 text-green-800 px-4 py-2">🌾 Irrigation</Badge>
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2">🎣 Fishing</Badge>
          </div>
        </div>
      </section>

      {/* Dam Selection */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Choose a Dam to Explore</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {damPlaces.map((place, index) => (
              <Card 
                key={place.id} 
                className={`cursor-pointer transition-all duration-300 ${
                  selectedPlace.id === place.id ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedPlace(place)}
              >
                <CardContent className="p-4">
                  <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                    <Image src={place.images[0]} alt={place.name} fill className="object-cover" />
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
                      index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
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
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-blue-800 mb-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-semibold">Rating</span>
                      </div>
                      <p className="text-blue-900 font-bold">{selectedPlace.rating}/5.0</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-green-800 mb-1">
                        <Calendar className="h-4 w-4" />
                        <span className="font-semibold">Best Time</span>
                      </div>
                      <p className="text-green-900 font-bold">{selectedPlace.bestTimeToVisit}</p>
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
                      <h3 className="font-semibold text-gray-900 mb-2">Timings</h3>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="h-4 w-4" />
                        <span>{selectedPlace.timings}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-4">
                <Button 
                  onClick={() => setIsContactGuidePopupOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Guide
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
                      <ChevronRight className="h-4 w-4 text-blue-500" />
                      {attraction}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Contact Guide Popup */}
      {isContactGuidePopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setIsContactGuidePopupOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 hover:bg-gray-200 p-2 transition-all duration-200"
            >
              <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-8 text-white">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Contact Your Guide</h3>
                  <p className="text-blue-100 text-sm">Local expert for {selectedPlace.name}</p>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {agentData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{agentData.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{agentData.description}</p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center gap-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span className="text-lg font-semibold text-gray-900 font-mono">{agentData.phone}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={() => window.open(`tel:${agentData.phone}`, '_self')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </Button>
                
                <Button 
                  onClick={() => window.open(`https://wa.me/${agentData.phone.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in visiting ${selectedPlace.name}. Can you help me plan my trip?`, '_blank')}
                  variant="outline"
                  className="w-full border-green-500 text-green-600 hover:bg-green-50 py-3 text-lg font-semibold"
                >
                  <span className="mr-2">📱</span>
                  WhatsApp
                </Button>
                
                <Button 
                  onClick={() => setIsContactGuidePopupOpen(false)}
                  variant="outline"
                  className="w-full py-2"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
