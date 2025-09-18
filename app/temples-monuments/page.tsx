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

// Data for Temples & Monuments in Jharkhand
const templesMonuments = [
  {
    id: 1,
    name: "Baidyanath Temple (Baidyanath Dham)",
    location: "Deoghar, Jharkhand",
    type: "Jyotirlinga Temple",
    rating: 4.8,
    coordinates: { lat: 24.4848, lng: 86.7037 },
    images: [
      "https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80"
    ],
    description: "Baidyanath Temple, also known as Baidyanath Dham, is one of the twelve sacred Jyotirlingas dedicated to Lord Shiva. This ancient temple holds immense religious significance and attracts millions of devotees annually, especially during the holy month of Shravan.",
    history: "The temple has a rich history dating back several centuries. Legend has it that the demon king Ravana worshipped Lord Shiva here to gain immortality. The temple complex showcases beautiful traditional architecture with intricate carvings.",
    significance: "As one of the 12 Jyotirlingas, this temple is considered extremely sacred in Hinduism. Devotees believe that visiting this temple and offering prayers can fulfill their wishes and provide spiritual salvation.",
    timings: "4:00 AM - 12:00 PM, 6:00 PM - 9:00 PM",
    bestTimeToVisit: "October to March, Shravan Month (July-August)",
    nearbyAttractions: ["Nandan Pahar", "Tapovan Hills", "Satsang Ashram"],
    facilities: ["Parking", "Prasad Shop", "Accommodation", "Medical Facility"]
  },
  {
    id: 2,
    name: "Parasnath Hill Temples",
    location: "Giridih, Jharkhand",
    type: "Jain Temple Complex",
    rating: 4.6,
    coordinates: { lat: 23.9643, lng: 86.1642 },
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      "https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80"
    ],
    description: "Parasnath Hills, standing at 1,365 meters, is the highest peak in Jharkhand and holds immense religious significance for the Jain community. The hill houses 20 Jain temples dedicated to various Tirthankaras.",
    history: "According to Jain scriptures, 20 of the 24 Jain Tirthankaras attained salvation (moksha) on this sacred hill. The temples were built over centuries by various Jain communities and showcase exquisite architectural craftsmanship.",
    significance: "This is the most important Jain pilgrimage site in eastern India. The hill is believed to be the place where multiple Tirthankaras achieved nirvana, making it extremely sacred for Jain devotees worldwide.",
    timings: "5:00 AM - 7:00 PM",
    bestTimeToVisit: "October to March",
    nearbyAttractions: ["Madhuban", "Jain Glass Temple", "Parasnath Railway Station"],
    facilities: ["Dharamshala", "Food Court", "Trekking Guides", "Medical Aid"]
  },
  {
    id: 3,
    name: "Rajrappa Temple",
    location: "Ramgarh, Jharkhand",
    type: "Shakti Peeth",
    rating: 4.5,
    coordinates: { lat: 23.6302, lng: 85.5131 },
    images: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      "https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80"
    ],
    description: "Rajrappa Temple is an ancient shrine dedicated to Goddess Chinnamasta, one of the ten Mahavidyas in Hinduism. The temple is situated at the confluence of Damodar and Bhairavi rivers, creating a mystical atmosphere.",
    history: "The temple has ancient origins and is mentioned in various Puranas. It's believed to be a powerful Tantrik center where Goddess Chinnamasta manifested. The temple has been renovated multiple times while preserving its spiritual essence.",
    significance: "This temple is famous for its tantric traditions and is considered one of the 51 Shakti Peeths. Devotees visit here seeking blessings for power, prosperity, and spiritual awakening.",
    timings: "5:00 AM - 8:00 PM",
    bestTimeToVisit: "September to March",
    nearbyAttractions: ["Damodar River", "Bhairavi River", "Ramgarh Cantonment"],
    facilities: ["River Bathing Ghats", "Prasad Counter", "Rest House", "Security"]
  },
  {
    id: 4,
    name: "Jagannath Temple Ranchi",
    location: "Ranchi, Jharkhand",
    type: "Vaishnavite Temple",
    rating: 4.4,
    coordinates: { lat: 23.3441, lng: 85.3096 },
    images: [
      "https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80"
    ],
    description: "The Jagannath Temple in Ranchi is a beautiful replica of the world-famous Jagannath Temple of Puri, Odisha. Built in traditional Kalinga architectural style, this temple is dedicated to Lord Jagannath, Lord Balabhadra, and Goddess Subhadra.",
    history: "The temple was constructed in the 1990s to provide devotees in Jharkhand with a place to worship Lord Jagannath without traveling to Puri. The architecture closely follows the traditional Odishan temple design.",
    significance: "The temple is famous for its annual Rath Yatra festival, which attracts thousands of devotees. It serves as a cultural bridge connecting Jharkhand with Odisha's rich traditions.",
    timings: "5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM",
    bestTimeToVisit: "Year-round, Special during Rath Yatra",
    nearbyAttractions: ["Kanke Dam", "Rock Garden", "Jagannath Temple Park"],
    facilities: ["Ample Parking", "Wheelchair Access", "Prasadam", "Information Center"]
  },
  {
    id: 5,
    name: "Pahari Mandir",
    location: "Ranchi, Jharkhand",
    type: "Hill Temple",
    rating: 4.3,
    coordinates: { lat: 23.3654, lng: 85.3308 },
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      "https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80"
    ],
    description: "Pahari Mandir is a famous hilltop temple dedicated to Lord Shiva, located on Ranchi Hill. The temple requires visitors to climb 468 steps to reach the top, offering breathtaking panoramic views of Ranchi city.",
    history: "The temple has been a place of worship for centuries, with local legends associating it with various mythological stories. The current structure has been renovated multiple times while maintaining its spiritual significance.",
    significance: "The temple is not just a religious site but also offers spectacular views of the entire Ranchi city. It's a perfect combination of spiritual experience and natural beauty.",
    timings: "5:00 AM - 8:00 PM",
    bestTimeToVisit: "October to March, Early morning for sunrise views",
    nearbyAttractions: ["Ranchi Lake", "Tagore Hill", "State Museum"],
    facilities: ["Steps with Railings", "Rest Points", "Water Facility", "Security"]
  },
  {
    id: 6,
    name: "Maluti Temples",
    location: "Dumka, Jharkhand",
    type: "Historical Temple Complex",
    rating: 4.7,
    coordinates: { lat: 24.7644, lng: 87.2433 },
    images: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80",
      "https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80"
    ],
    description: "Maluti is a small village home to 72 ancient terracotta temples built during the 17th-18th centuries. These temples showcase exquisite terracotta art and represent unique architectural heritage of the Bengal-Jharkhand border region.",
    history: "These temples were built by local kings and wealthy merchants during the 17th and 18th centuries. The terracotta work depicts scenes from Hindu epics, daily life, and various deities, showcasing the artistic excellence of that era.",
    significance: "The Maluti temples are considered architectural marvels and represent one of the finest examples of terracotta temple art in eastern India. They provide insights into the cultural and religious practices of bygone eras.",
    timings: "Sunrise to Sunset",
    bestTimeToVisit: "October to March",
    nearbyAttractions: ["Dumka Town", "Mayurbhanj Palace", "Santhal Villages"],
    facilities: ["Local Guides", "Photography Allowed", "Village Hospitality", "Basic Facilities"]
  }
];

// Google Maps component with real map and interactive marker
const GoogleMap = ({ temple }: { temple: any }) => {
  const [showMarkerPopup, setShowMarkerPopup] = useState(false);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${temple.coordinates.lat},${temple.coordinates.lng}`;
  
  // Enhanced embed URL with marker parameter
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${temple.coordinates.lng}!3d${temple.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(temple.name)}!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`;
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg relative">
      {/* Real Google Maps Embed with Marker */}
      <div className="h-80 relative">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${temple.name}`}
          className="rounded-xl"
        />
        
        {/* Interactive Marker Overlay - Positioned at center of map */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div 
            className="relative cursor-pointer group"
            onClick={() => setShowMarkerPopup(!showMarkerPopup)}
          >
            {/* Main Marker Pin */}
            <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center transform -translate-y-4 hover:scale-110 transition-transform duration-200 animate-bounce">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            
            {/* Marker Shadow/Base */}
            <div className="w-3 h-3 bg-red-500/30 rounded-full transform -translate-x-1/2 left-1/2 absolute top-4 blur-sm"></div>
            
            {/* Pulsing Ring Animation */}
            <div className="absolute inset-0 w-8 h-8 bg-red-500/20 rounded-full animate-ping transform -translate-y-4"></div>
          </div>
          
          {/* Marker Popup */}
          {showMarkerPopup && (
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 min-w-[250px] border border-gray-200 animate-fade-in">
              <div className="text-center">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{temple.name}</h4>
                <p className="text-gray-600 text-xs mb-3">{temple.location}</p>
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
              
              {/* Popup Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/95"></div>
            </div>
          )}
        </div>
        
        {/* Temple Info Card - Top Left */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">{temple.type.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-xs leading-tight mb-1">
                {temple.name}
              </h4>
              <p className="text-gray-600 text-xs mb-2 leading-relaxed">
                {temple.type} • Rating: {temple.rating}⭐
              </p>
              <div className="text-xs text-orange-600 font-medium">
                📍 Click the red marker to get directions
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions - Bottom Right */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${temple.coordinates.lat},${temple.coordinates.lng}`, '_blank')}
            className="bg-white/95 backdrop-blur-sm text-gray-700 hover:bg-white text-xs h-8 px-3 shadow-lg"
          >
            <Globe className="h-3 w-3 mr-1" />
            Open in Google Maps
          </Button>
        </div>
        
        {/* Click overlay to close popup when clicking outside */}
        {showMarkerPopup && (
          <div 
            className="absolute inset-0 z-0" 
            onClick={() => setShowMarkerPopup(false)}
          />
        )}
      </div>
      
      {/* Enhanced Quick Actions Bar */}
      <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-red-500" />
              <span className="font-mono">{temple.coordinates.lat.toFixed(4)}, {temple.coordinates.lng.toFixed(4)}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-xs">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span>{temple.rating} Rating</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(`${temple.coordinates.lat}, ${temple.coordinates.lng}`);
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

// Image Carousel Component
const ImageCarousel = ({ images, currentIndex, onNext, onPrev }: any) => (
  <div className="relative h-80 overflow-hidden rounded-xl group">
    <div 
      className="flex transition-transform duration-500 ease-in-out h-full"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {images.map((image: string, index: number) => (
        <div key={index} className="w-full h-full flex-shrink-0 relative">
          <Image
            src={image}
            alt={`Temple view ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
    
    {/* Navigation Buttons */}
    <Button
      variant="ghost"
      size="icon"
      onClick={onPrev}
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      <ChevronLeft className="h-5 w-5" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={onNext}
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      <ChevronRight className="h-5 w-5" />
    </Button>

    {/* Dots Indicator */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      {images.map((_: any, index: number) => (
        <button
          key={index}
          onClick={() => {}}
          className={`w-2 h-2 rounded-full transition-all duration-200 ${
            index === currentIndex ? 'bg-white scale-125' : 'bg-white/60'
          }`}
        />
      ))}
    </div>
  </div>
);

// Temple Card Component
const TempleCard = ({ temple, index }: { temple: any; index: number }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % temple.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + temple.images.length) % temple.images.length);
  };

  return (
    <div className="mb-20">
      <Card className="overflow-hidden bg-white shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: Image Carousel */}
          <div className="relative">
            <ImageCarousel
              images={temple.images}
              currentIndex={currentImageIndex}
              onNext={nextImage}
              onPrev={prevImage}
            />
            
            {/* Overlay Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className={`rounded-full backdrop-blur-sm ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600'
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/80 text-gray-600 backdrop-blur-sm"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Temple Type Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-orange-500 text-white">
                {temple.type}
              </Badge>
            </div>

            {/* Rating */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium text-sm">{temple.rating}</span>
            </div>
          </div>

          {/* Right: Temple Details */}
          <CardContent className="p-8 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{temple.name}</h2>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{temple.location}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-gray-600 leading-relaxed">{temple.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Historical Significance</h3>
                  <p className="text-gray-600 leading-relaxed">{temple.history}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Religious Importance</h3>
                  <p className="text-gray-600 leading-relaxed">{temple.significance}</p>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Timings</p>
                    <p className="text-xs text-gray-600">{temple.timings}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Best Time</p>
                    <p className="text-xs text-gray-600">{temple.bestTimeToVisit}</p>
                  </div>
                </div>
              </div>

              {/* Facilities */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  {temple.facilities.map((facility: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Nearby Attractions */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Nearby Attractions</h3>
                <div className="flex flex-wrap gap-2">
                  {temple.nearbyAttractions.map((attraction: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {attraction}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Google Map Section */}
        <div className="border-t border-gray-200">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Location & Directions
            </h3>
            <GoogleMap temple={temple} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default function TemplesMonumentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-orange-100 text-orange-700 border-orange-200 px-6 py-2">
            🕉️ Sacred Heritage
          </Badge>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent leading-tight mb-8">
            Temples & Monuments
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Discover the spiritual heritage of Jharkhand through its magnificent temples and ancient monuments. 
            Each site tells a story of devotion, architecture, and timeless traditions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Camera className="h-5 w-5 mr-2" />
              Virtual Tour
            </Button>
            <Button variant="outline" size="lg">
              <MapPin className="h-5 w-5 mr-2" />
              View All Locations
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-orange-600">{templesMonuments.length}</div>
              <div className="text-sm text-gray-600">Sacred Sites</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">12+</div>
              <div className="text-sm text-gray-600">Centuries Old</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600">1000+</div>
              <div className="text-sm text-gray-600">Daily Visitors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Temples & Monuments List */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {templesMonuments.map((temple, index) => (
            <TempleCard key={temple.id} temple={temple} index={index} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Plan Your Spiritual Journey</h2>
          <p className="text-xl mb-8 text-white/90 leading-relaxed">
            Ready to explore these sacred sites? Let us help you plan the perfect pilgrimage 
            or cultural tour of Jharkhand's magnificent temples and monuments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <Link href="/book-tour">Plan Your Visit</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Get Travel Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
