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
  Share2,
  Plane
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { BookingPopup } from "@/components/booking-popup";
import Link from "next/link";

// Data for Waterfall destinations in Jharkhand
const waterfallPlaces = [
  {
    id: 1,
    name: "Hundru Falls",
    location: "Ranchi, Jharkhand",
    type: "98-meter Spectacular Waterfall",
    rating: 4.5,
    coordinates: { lat: 23.2599, lng: 85.6191 },
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80"
    ],
    description: "Hundru Falls is one of the most magnificent waterfalls in Jharkhand, plunging 98 meters down the rocky terrain. Located about 45 km from Ranchi, this natural wonder is formed by the Subarnarekha River. The falls are surrounded by dense forests and rocky hills, creating a picturesque landscape that attracts thousands of visitors every year.",
    history: "The waterfall has been a natural landmark for centuries and has great significance in local folklore. The name 'Hundru' is derived from the local tribal language and means 'thunderous sound', referring to the roaring sound of water crashing down the rocks.",
    significance: "Hundru Falls is considered the most iconic waterfall in Jharkhand and serves as a major tourist attraction. During the monsoon season, the falls are at their most spectacular, with maximum water flow creating a breathtaking curtain of white water against the dark rocks.",
    timings: "6:00 AM - 6:00 PM",
    bestTimeToVisit: "October to March (Post-monsoon for best views)",
    nearbyAttractions: ["Jonha Falls", "Ranchi Lake", "Tagore Hill"],
    facilities: ["Parking", "Food Stalls", "Photography Points", "Trekking Trails", "Viewing Platforms"]
  },
  {
    id: 2,
    name: "Dassam Falls",
    location: "Ranchi, Jharkhand", 
    type: "44-meter Tiered Waterfall",
    rating: 4.3,
    coordinates: { lat: 23.3333, lng: 85.5667 },
    images: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80"
    ],
    description: "Dassam Falls, locally known as the 'Niagara of Jharkhand,' is a stunning 44-meter waterfall formed by the Kanchi River. Located approximately 40 km from Ranchi, this natural wonder cascades down in multiple tiers, creating a spectacular sight especially during the monsoon season. The falls are surrounded by dense forests and rocky terrain.",
    history: "Dassam Falls has been a popular destination for centuries among local tribes and later became famous during the British colonial period. The multi-tiered structure of the falls makes it unique among Jharkhand's waterfalls.",
    significance: "Known as the 'Niagara of Jharkhand' due to its wide cascade, Dassam Falls is famous for adventure activities like rock climbing, rappelling, and trekking. The area offers excellent opportunities for photography and nature exploration.",
    timings: "6:00 AM - 7:00 PM",
    bestTimeToVisit: "July to February (Monsoon and post-monsoon)",
    nearbyAttractions: ["Hundru Falls", "Kanchi River", "Local Tribal Villages"],
    facilities: ["Adventure Sports", "Rock Climbing", "Parking", "Food Courts", "Rest Areas"]
  },
  {
    id: 3,
    name: "Jonha Falls (Gautamdhara)",
    location: "Ranchi, Jharkhand",
    type: "43-meter Sacred Waterfall",
    rating: 4.2,
    coordinates: { lat: 23.2927, lng: 85.4361 },
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
    ],
    description: "Jonha Falls, also known as Gautamdhara, is a magnificent 43-meter waterfall with deep religious significance. Legend has it that Lord Buddha once meditated at this very spot, making it a sacred pilgrimage site. The falls cascade down from a considerable height into a deep pool surrounded by rocky terrain and lush greenery.",
    history: "The waterfall is steeped in Buddhist history and local legends suggest that Gautama Buddha meditated here during his spiritual journey. The site has been a place of worship and meditation for centuries.",
    significance: "As a sacred Buddhist site, Jonha Falls attracts both pilgrims and nature lovers. The area is perfect for meditation and spiritual contemplation, offering visitors a chance to connect with nature and find inner peace.",
    timings: "5:00 AM - 7:00 PM",
    bestTimeToVisit: "July to March (Ideal for meditation and photography)",
    nearbyAttractions: ["Hundru Falls", "Buddhist Monasteries", "Meditation Centers"],
    facilities: ["Meditation Areas", "Parking", "Religious Facilities", "Natural Pools", "Walking Trails"]
  },
  {
    id: 4,
    name: "Lodh Falls",
    location: "Latehar, Jharkhand",
    type: "143-meter Highest Waterfall",
    rating: 4.6,
    coordinates: { lat: 23.8167, lng: 84.6500 },
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80"
    ],
    description: "Lodh Falls, standing at an impressive 143 meters, is the highest waterfall in Jharkhand and one of the tallest in India. Located near Netarhat, this magnificent waterfall cascades down in multiple tiers through dense forest terrain. During monsoon season, the falls are at their most spectacular, creating a thunderous sound that can be heard from kilometers away.",
    history: "Lodh Falls has been known to local tribal communities for generations and was later discovered by British officers during the colonial period. The waterfall remained relatively unknown until recent decades when it gained popularity among adventure tourists.",
    significance: "As Jharkhand's highest waterfall, Lodh Falls is a crown jewel of the state's natural attractions. The surrounding area is rich in flora and fauna, making it a paradise for nature lovers and photographers seeking pristine wilderness experiences.",
    timings: "6:00 AM - 5:00 PM (Limited access during monsoon)",
    bestTimeToVisit: "July to February (Best during post-monsoon)",
    nearbyAttractions: ["Netarhat Hill Station", "Dense Forests", "Tribal Villages"],
    facilities: ["Trekking Guides", "Forest Permits", "Basic Accommodation", "Photography Points"]
  },
  {
    id: 5,
    name: "Nakti Falls",
    location: "Ranchi, Jharkhand",
    type: "25-meter Hidden Gem",
    rating: 4.1,
    coordinates: { lat: 23.1833, lng: 85.3167 },
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
    ],
    description: "Nakti Falls is a hidden gem located approximately 65 km from Ranchi, nestled deep within pristine forests. This 25-meter waterfall cascades down rocky cliffs into crystal-clear pools below, creating a perfect natural swimming spot. The falls are surrounded by dense vegetation and offer a tranquil escape from urban life.",
    history: "Nakti Falls remained relatively unknown for decades due to its remote location. It was primarily known to local tribal communities and has only recently gained popularity among adventure seekers and nature photographers.",
    significance: "This hidden waterfall offers one of the most pristine and untouched natural experiences in Jharkhand. The trek to reach Nakti Falls takes visitors through scenic forest paths rich with indigenous flora and fauna.",
    timings: "Sunrise to Sunset (No artificial lighting)",
    bestTimeToVisit: "June to October (During and after monsoon)",
    nearbyAttractions: ["Dense Forests", "Wildlife Spotting", "Tribal Hamlets"],
    facilities: ["Natural Swimming Pools", "Trekking Trails", "Basic Camping", "Forest Exploration"]
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
            <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">💧</span>
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
      
      <div className="p-4 bg-gradient-to-r from-gray-50 to-teal-50 border-t">
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
              className="text-xs h-8 px-3 hover:bg-teal-50"
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

// Agent data for contact guide functionality
const agentData = {
  name: "Rajesh Kumar Singh",
  phone: "+91 94314 85627",
  description: "Experienced local guide specializing in Jharkhand waterfalls and nature tours"
};

export default function WaterfallPage() {
  const [selectedPlace, setSelectedPlace] = useState(waterfallPlaces[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingPopupOpen, setIsBookingPopupOpen] = useState(false);
  const [isContactGuidePopupOpen, setIsContactGuidePopupOpen] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-blue-500/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            💧 Waterfalls of Jharkhand
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Majestic 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-500"> Waterfalls</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover Jharkhand's spectacular waterfalls - from the thundering Hundru Falls to the sacred Jonha Falls. Experience nature's raw power and beauty cascading through pristine forest landscapes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge className="bg-teal-100 text-teal-800 px-4 py-2">🏔️ Mountain Cascades</Badge>
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">🏊 Natural Pools</Badge>
            <Badge className="bg-green-100 text-green-800 px-4 py-2">📸 Photography</Badge>
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2">🥾 Trekking</Badge>
          </div>
        </div>
      </section>

      {/* Waterfall Selection */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Choose a Waterfall to Explore</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {waterfallPlaces.map((place, index) => (
              <Card 
                key={place.id} 
                className={`cursor-pointer transition-all duration-300 ${
                  selectedPlace.id === place.id ? 'ring-2 ring-teal-500 shadow-xl' : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedPlace(place)}
              >
                <CardContent className="p-4">
                  <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                    <Image src={place.images[0]} alt={place.name} fill className="object-cover" />
                    <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 text-xs font-semibold">
                      {place.type.split(' ')[0]}m
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
                      index === currentImageIndex ? 'ring-2 ring-teal-500' : ''
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
                    <div className="bg-teal-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-teal-800 mb-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-semibold">Rating</span>
                      </div>
                      <p className="text-teal-900 font-bold">{selectedPlace.rating}/5.0</p>
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
                    
                    <div className="pt-4 border-t border-gray-200">
                      <Button 
                        onClick={() => setIsBookingPopupOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full flex items-center justify-center gap-2 mb-4"
                      >
                        <Plane className="h-4 w-4" />
                        Book Now - {selectedPlace.name}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="w-full">
                <Button 
                  onClick={() => setIsContactGuidePopupOpen(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white w-full"
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
                      <ChevronRight className="h-4 w-4 text-teal-500" />
                      {attraction}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <BookingPopup 
        isOpen={isBookingPopupOpen}
        onClose={() => setIsBookingPopupOpen(false)}
        placeName={selectedPlace.name}
      />
      
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
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 px-6 py-8 text-white">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Contact Your Guide</h3>
                  <p className="text-teal-100 text-sm">Local expert for {selectedPlace.name}</p>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {agentData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{agentData.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{agentData.description}</p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center gap-3">
                    <Phone className="h-5 w-5 text-teal-600" />
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
