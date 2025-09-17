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
  Mountain
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const valleyPlaces = [
  {
    id: 1,
    name: "Patratu Valley",
    location: "Ramgarh, Jharkhand",
    type: "Scenic Valley",
    rating: 4.3,
    coordinates: { lat: 23.6500, lng: 85.1500 },
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80"
    ],
    description: "Patratu Valley is a breathtaking valley known for its scenic beauty, rolling hills, and the pristine Patratu Dam. The valley offers panoramic views of the surrounding landscape and is a popular destination for nature lovers and photographers. The area is perfect for picnics and peaceful retreats.",
    history: "The valley was formed by natural geological processes over thousands of years. The construction of Patratu Dam in the area has enhanced its beauty and made it a significant water reservoir for the region.",
    significance: "Patratu Valley serves as an important ecological zone and water catchment area. It's also gaining popularity as an eco-tourism destination, offering visitors a chance to connect with nature.",
    timings: "24 Hours (Open Valley)",
    bestTimeToVisit: "October to March (Pleasant weather for exploration)",
    nearbyAttractions: ["Patratu Dam", "Ramgarh", "McCluskieganj"],
    facilities: ["Photography", "Picnic Spots", "Nature Walks", "Bird Watching", "Viewpoints", "Parking"]
  },
  {
    id: 2,
    name: "Hundru Valley",
    location: "Ranchi, Jharkhand",
    type: "Valley with Waterfalls",
    rating: 4.1,
    coordinates: { lat: 23.4200, lng: 85.6200 },
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80"
    ],
    description: "Hundru Valley is famous for the spectacular Hundru Falls, one of Jharkhand's highest waterfalls. The valley offers stunning views of cascading water surrounded by lush green hills and rocky terrain. It's a perfect spot for adventure enthusiasts and nature photographers.",
    history: "The valley has been carved by the Subarnarekha River over centuries. The area has been a natural attraction for locals and has recently gained recognition as a major tourist destination.",
    significance: "Hundru Valley is significant for its biodiversity and serves as an important watershed area. The falls and surrounding valley are crucial for the local ecosystem and water cycle.",
    timings: "6:00 AM - 6:00 PM",
    bestTimeToVisit: "July to February (During and after monsoon for best waterfall view)",
    nearbyAttractions: ["Hundru Falls", "Jonha Falls", "Ranchi"],
    facilities: ["Trekking", "Photography", "Waterfall View", "Nature Trails", "Parking", "Rest Areas"]
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
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{place.name}</h4>
                <p className="text-gray-600 text-xs mb-3">{place.location}</p>
                <div className="space-y-2">
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); window.open(directionsUrl, '_blank'); }} className="bg-emerald-600 hover:bg-emerald-700 text-white w-full text-xs h-8">
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
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-700 rounded-full flex items-center justify-center flex-shrink-0">
              <Mountain className="h-3 w-3 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-xs leading-tight mb-1">{place.name}</h4>
              <p className="text-gray-600 text-xs mb-2 leading-relaxed">{place.type} • {place.rating}⭐</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-r from-gray-50 to-emerald-50 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-red-500" />
              <span className="font-mono">{place.coordinates.lat.toFixed(4)}, {place.coordinates.lng.toFixed(4)}</span>
            </div>
          </div>
          <Button size="sm" onClick={() => window.open(directionsUrl, '_blank')} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 px-3">
            <NavigationIcon className="h-3 w-3 mr-1" />Navigate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function ValleyPage() {
  const [selectedPlace, setSelectedPlace] = useState(valleyPlaces[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactGuidePopupOpen, setIsContactGuidePopupOpen] = useState(false);
  
  // Agent data for Contact Guide popup
  const agentData = {
    name: "Manoj Singh",
    phone: "999999999",
    description: "Adventure guide and trek leader specializing in Jharkhand's valleys and scenic trekking routes with 12+ years experience."
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedPlace.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedPlace.images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedPlace.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedPlace.images.length) % selectedPlace.images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <Navigation />
      
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-green-600/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            ⛰️ Valleys of Jharkhand
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Scenic <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">Valleys</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore Jharkhand's breathtaking valleys and gorges. Experience the serenity of rolling hills, pristine landscapes, and natural beauty that offers perfect escape from urban life.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {valleyPlaces.map((place) => (
              <Card 
                key={place.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedPlace.id === place.id ? 'ring-2 ring-emerald-500 shadow-xl' : ''
                }`}
                onClick={() => {setSelectedPlace(place); setCurrentImageIndex(0);}}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image src={place.images[0]} alt={place.name} fill className="object-cover transition-transform duration-300 hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold mb-1">{place.name}</h3>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{place.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{place.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700 text-xs">
                      {place.type}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Card className="overflow-hidden shadow-xl">
                <div className="relative h-96">
                  <Image src={selectedPlace.images[currentImageIndex]} alt={selectedPlace.name} fill className="object-cover" />
                  <Button variant="ghost" size="icon" onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white h-10 w-10">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white h-10 w-10">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex justify-center gap-2 mb-4">
                      {selectedPlace.images.map((_, index) => (
                        <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                      ))}
                    </div>
                    <div className="text-white text-center">
                      <h3 className="text-2xl font-bold mb-2">{selectedPlace.name}</h3>
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedPlace.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{selectedPlace.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-3 gap-2">
                {selectedPlace.images.map((image, index) => (
                  <div key={index} className={`relative h-20 cursor-pointer overflow-hidden rounded-lg ${index === currentImageIndex ? 'ring-2 ring-emerald-500' : ''}`} onClick={() => setCurrentImageIndex(index)}>
                    <Image src={image} alt={`${selectedPlace.name} ${index + 1}`} fill className="object-cover transition-all duration-200 hover:scale-110" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPlace.name}</h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedPlace.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{selectedPlace.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-9 w-9 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-9 w-9 p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">{selectedPlace.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Access Hours
                      </h3>
                      <p className="text-gray-700">{selectedPlace.timings}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Best Time to Visit
                      </h3>
                      <p className="text-gray-700">{selectedPlace.bestTimeToVisit}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Activities & Facilities</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPlace.facilities.map((facility, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">{facility}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button 
                      onClick={() => setIsContactGuidePopupOpen(true)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Valley Information</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{selectedPlace.history}</p>
                  <p className="text-gray-700 leading-relaxed">{selectedPlace.significance}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Nearby Attractions</h3>
                  <div className="space-y-2">
                    {selectedPlace.nearbyAttractions.map((attraction, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <MapPin className="h-3 w-3 text-emerald-600" />
                        <span className="text-sm">{attraction}</span>
                      </div>
                    ))}
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
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-8 text-white">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Contact Your Guide</h3>
                  <p className="text-emerald-100 text-sm">Valley guide for {selectedPlace.name}</p>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {agentData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{agentData.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{agentData.description}</p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center gap-3">
                    <Phone className="h-5 w-5 text-emerald-600" />
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
                  onClick={() => window.open(`https://wa.me/${agentData.phone.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in visiting ${selectedPlace.name}. Can you help me plan my valley trek?`, '_blank')}
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
