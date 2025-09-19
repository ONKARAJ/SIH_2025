"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Clock,
  Users,
  Camera,
  Navigation as NavigationIcon,
  Phone,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Plane,
  Train,
  Hotel
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { allPlaces } from "@/data/places-data";
import type { Place } from "@/types/place";
import { GoogleMap } from '@/components/google-map';
import { EmergencyContacts } from '@/components/places/emergency-contacts';

// Function to get category page URL
function getCategoryPageUrl(category: string): string {
  const categoryMap: { [key: string]: string } = {
    'Waterfall': '/waterfall',
    'Hill Station': '/hill-station', 
    'National Park': '/national-park',
    'Adventure Sports': '/adventure-sports',
    'Lake': '/lake',
    'Dam': '/dam',
    'Historic Site': '/historic-site',
    'Park': '/park',
    'Religious Site': '/religious-site',
    'Valley': '/valley',
    'Wildlife Sanctuary': '/wildlife-sanctuary',
    'Temple': '/temples-monuments',
    'Monument': '/temples-monuments',
    'Temples & Monuments': '/temples-monuments'
  };
  return categoryMap[category] || '/places';
}

// Helper function to get coordinates for places
function getPlaceCoordinates(title: string, location: string): { lat: number; lng: number } {
  const coordinateMap: { [key: string]: { lat: number; lng: number } } = {
    // 🌊 Waterfalls
    'Hundru Falls': { lat: 23.2683, lng: 85.4469 },
    'Dassam Falls': { lat: 23.2167, lng: 85.4333 },
    'Jonha Falls': { lat: 23.2833, lng: 85.4667 },
    'Hirni Falls': { lat: 23.2950, lng: 85.4200 },
    'Lodh Falls': { lat: 23.4167, lng: 84.2333 },
    'Sita Falls': { lat: 23.4500, lng: 84.2500 },
    'Usri Falls': { lat: 24.2167, lng: 86.1833 },
    'Panchghagh Falls': { lat: 23.4800, lng: 84.2700 },
    
    // 🏔️ Hill Stations
    'Netarhat': { lat: 23.4667, lng: 84.2667 },
    'Parasnath Hills': { lat: 23.9663, lng: 86.1641 },
    'Parasnath Hill': { lat: 23.9663, lng: 86.1641 },
    'Dalma Hills': { lat: 22.8500, lng: 86.1167 },
    'Tagore Hill': { lat: 23.3547, lng: 85.3148 },
    'Trikut Hills': { lat: 24.4854, lng: 86.6992 },
    
    // 🏛️ Temples & Religious Sites
    'Baba Baidyanath Temple': { lat: 24.4854, lng: 86.6992 },
    'Baidyanath Temple': { lat: 24.4854, lng: 86.6992 },
    'Rajrappa Temple': { lat: 23.6333, lng: 85.5167 },
    'Jagannath Temple': { lat: 23.3547, lng: 85.3348 },
    'Pahari Mandir': { lat: 23.3547, lng: 85.3348 },
    'Sun Temple': { lat: 23.6500, lng: 85.9500 },
    'Dewri Temple': { lat: 24.1901, lng: 86.3000 },
    'Chhinnamasta Temple': { lat: 23.6333, lng: 85.5167 },
    
    // 🌳 National Parks & Wildlife Sanctuaries
    'Betla National Park': { lat: 23.8833, lng: 84.1833 },
    'Hazaribagh National Park': { lat: 23.9833, lng: 85.3667 },
    'Parasnath Wildlife Sanctuary': { lat: 23.9667, lng: 86.1667 },
    'Dalma Wildlife Sanctuary': { lat: 22.8500, lng: 86.1167 },
    'Koderma Wildlife Sanctuary': { lat: 24.4667, lng: 85.5833 },
    'Gautam Buddha Wildlife Sanctuary': { lat: 23.9833, lng: 85.3667 },
    'Lawalong Wildlife Sanctuary': { lat: 23.8833, lng: 84.1833 },
    
    // 💧 Lakes & Dams
    'Dimna Lake': { lat: 22.7833, lng: 86.2167 },
    'Rock Garden': { lat: 23.3547, lng: 85.3348 },
    'Kanke Dam': { lat: 23.4167, lng: 85.3833 },
    'Getalsud Dam': { lat: 23.3000, lng: 85.2500 },
    'Maithon Dam': { lat: 23.6500, lng: 86.8000 },
    'Panchet Dam': { lat: 23.6167, lng: 86.6833 },
    'Tenughat Dam': { lat: 24.0833, lng: 85.5167 },
    'Tilaiya Dam': { lat: 24.2500, lng: 85.4167 },
    'Massanjore Dam': { lat: 24.4500, lng: 87.3000 },
    
    // 🏙️ Major Cities
    'Ranchi': { lat: 23.3441, lng: 85.3096 },
    'Jamshedpur': { lat: 22.8046, lng: 86.2029 },
    'Deoghar': { lat: 24.4854, lng: 86.6992 },
    'Dhanbad': { lat: 23.7957, lng: 86.4304 },
    'Bokaro': { lat: 23.7000, lng: 85.9600 },
    'Hazaribagh': { lat: 23.9929, lng: 85.3644 },
    'Giridih': { lat: 24.1901, lng: 86.3000 },
    'Daltonganj': { lat: 24.0405, lng: 84.0665 },
    'Chaibasa': { lat: 22.5541, lng: 85.8088 },
    'Dumka': { lat: 24.2687, lng: 87.2496 },
    'Godda': { lat: 24.8267, lng: 87.2142 },
    'Sahebganj': { lat: 25.2500, lng: 87.6500 },
    
    // 🏰 Historical Sites & Museums
    'Palamau Fort': { lat: 24.0405, lng: 84.0665 },
    'McCluskieganj': { lat: 23.6167, lng: 85.1833 },
    'Tribal Research Institute Museum': { lat: 23.3441, lng: 85.3096 },
    'Jagannath Temple': { lat: 23.3547, lng: 85.3348 },
    'Birsa Zoological Park': { lat: 23.4000, lng: 85.3000 },
    
    // 🎯 Adventure & Recreation Sites
    'Birla Mandir': { lat: 23.3441, lng: 85.3096 },
    'Nakshatra Van': { lat: 23.3700, lng: 85.3200 },
    'Science Centre': { lat: 23.3441, lng: 85.3096 },
    'Deer Park': { lat: 23.3700, lng: 85.3200 },
    'Oxygen Park': { lat: 23.3600, lng: 85.3100 },
    
    // Default coordinates for central Jharkhand
    'default': { lat: 23.6102, lng: 85.2799 }
  };

  // Try to match by title first
  for (const [key, coords] of Object.entries(coordinateMap)) {
    if (title.toLowerCase().includes(key.toLowerCase())) {
      return coords;
    }
  }

  // Try to match by location
  for (const [key, coords] of Object.entries(coordinateMap)) {
    if (location.toLowerCase().includes(key.toLowerCase())) {
      return coords;
    }
  }

  // Return default coordinates with slight randomization
  const defaultCoords = coordinateMap.default;
  return {
    lat: defaultCoords.lat + (Math.random() - 0.5) * 0.1,
    lng: defaultCoords.lng + (Math.random() - 0.5) * 0.1
  };
}

export default function PlaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const placeId = params.id as string;
  
  const [place, setPlace] = useState<Place | null>(null);
  const [placeWithCoords, setPlaceWithCoords] = useState<Place | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isBookingPopupOpen, setIsBookingPopupOpen] = useState(false);

  useEffect(() => {
    const foundPlace = allPlaces.find(p => p.id === placeId);
    if (foundPlace) {
      setPlace(foundPlace);
      
      // Add coordinates to the place for map integration
      const enhancedPlace = {
        ...foundPlace,
        coordinates: foundPlace.coordinates || getPlaceCoordinates(foundPlace.title, foundPlace.location)
      };
      setPlaceWithCoords(enhancedPlace);
    } else {
      setPlace(null);
      setPlaceWithCoords(null);
    }
  }, [placeId]);

  if (!place) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-pink-50">
        <Navigation />
        <div className="pt-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Place Not Found</h1>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn't find the place you're looking for.
            </p>
            <Button asChild>
              <Link href="/places">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Places
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const allImages = place.images || [place.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: place.title,
        text: place.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Booking handlers
  const handleBookFlight = () => {
    setIsBookingPopupOpen(false);
    router.push('/book-flights');
  };

  const handleBookTrain = () => {
    setIsBookingPopupOpen(false);
    router.push('/book-trains');
  };

  const handleBookHotel = () => {
    setIsBookingPopupOpen(false);
    router.push('/book-hotels');
  };

  const handleBookBus = () => {
    setIsBookingPopupOpen(false);
    router.push('/book-buses');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-pink-50">
      <Navigation />
      
      {/* Emergency Contacts - Fixed positioning */}
      {place && <EmergencyContacts placeName={place.title} />}
      
      <div className="pt-20">
        {/* Back Button */}
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto">
            <Button 
              onClick={() => router.back()}
              variant="ghost" 
              className="flex items-center gap-2 hover:bg-white/60 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-3xl bg-gradient-to-br from-sky-100 to-blue-100">
              {!imageError ? (
                <Image
                  src={allImages[currentImageIndex]}
                  alt={place.title}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-sky-100 via-pink-50 to-mint-100 flex items-center justify-center">
                  <Camera className="h-24 w-24 text-gray-300" />
                </div>
              )}
              
              {/* Image Navigation */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors backdrop-blur-sm z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors backdrop-blur-sm z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Top Actions */}
              <div className="absolute top-6 right-6 flex gap-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-200 ${
                    isLiked 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <Badge className="bg-white/90 backdrop-blur-sm text-gray-700 border-0 shadow-sm px-4 py-2 text-sm">
                  {place.category}
                </Badge>
              </div>
            </div>
            
            {/* Horizontal Scrollable Thumbnails */}
            {allImages.length > 1 && (
              <div className="mt-6">
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
                  {allImages.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'ring-4 ring-orange-500 ring-offset-2 scale-105'
                          : 'ring-2 ring-white/20 hover:ring-orange-300 hover:scale-105'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${place.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        onError={() => setImageError(true)}
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Header Info */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {place.title}
                      </h1>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-5 h-5" />
                          <span className="text-lg font-medium">{place.location}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-yellow-50 rounded-full px-4 py-2">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="font-semibold text-yellow-700">{place.rating}</span>
                          <span className="text-sm text-yellow-600">({place.reviews?.length || 0} reviews)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                        <Calendar className="w-4 h-4" />
                        <span>Best time to visit: {place.bestTimeToVisit}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Place</h2>
                    <p className="text-lg leading-relaxed text-gray-700 mb-4">
                      {place.shortDescription}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {place.overview}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Attractions */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Experience</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {place.attractions.map((attraction, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-white/60 rounded-xl">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                        <span className="text-gray-700">{attraction}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Reviews */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">What Travelers Say</h2>
                  <div className="space-y-4">
                    {place.reviews?.slice(0, 6).map((review, index) => (
                      <Card key={index} className="bg-white/60">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold text-gray-900">{review.name}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-medium">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">{review.comment}</p>
                          <span className="text-sm text-gray-400">{review.date}</span>
                        </CardContent>
                      </Card>
                    )) || (
                      <p className="text-gray-500 italic">No reviews yet. Be the first to share your experience!</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                
                {/* Quick Info */}
                <Card className="bg-blue-50/60">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-900">Quick Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-blue-800">
                      <Calendar className="w-4 h-4" />
                      <span>Best Time: {place.bestTimeToVisit}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-800">
                      <Users className="w-4 h-4" />
                      <span>{place.reviews?.length || 0} Reviews</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-800">
                      <MapPin className="w-4 h-4" />
                      <span>{place.location}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Booking Section */}
                <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-gray-200/50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Plan Your Visit</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 mb-6">
                      Ready to explore {place.title}? Book your travel and accommodation now.
                    </p>
                    
                    <div className="space-y-3">
                      <Button
                        onClick={handleBookFlight}
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl"
                      >
                        <Plane className="w-4 h-4 mr-2" />
                        Book Flight
                      </Button>
                      
                      <Button
                        onClick={handleBookTrain}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl"
                      >
                        <Train className="w-4 h-4 mr-2" />
                        Book Train
                      </Button>

                      <Button
                        onClick={handleBookBus}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl"
                      >
                        <NavigationIcon className="w-4 h-4 mr-2" />
                        Book Bus
                      </Button>
                      
                      <Button
                        onClick={handleBookHotel}
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl"
                      >
                        <Hotel className="w-4 h-4 mr-2" />
                        Book Hotel
                      </Button>
                    </div>

                    <div className="pt-4 border-t text-center">
                      <p className="text-xs text-gray-500">
                        Secure booking • Instant confirmation
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Places */}
                <Card className="bg-green-50/60">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-900">Explore Similar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-100">
                      <Link href={getCategoryPageUrl(place.category)}>
                        View All {place.category}s
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Section Separator */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative py-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gradient-to-br from-sky-50 via-white to-pink-50 px-6 py-2 text-sm text-gray-500 rounded-full">
                  Continue exploring
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map Section */}
        {placeWithCoords && (
          <div className="relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30"></div>
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
            
            <div className="relative px-4 sm:px-6 lg:px-8 py-16">
              <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
                    <span className="text-2xl text-white">🗺️</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Explore {place?.title} & 
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Nearby Places
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    Discover amazing attractions, essential services, and hidden gems around {place?.title}. 
                    Get real-time directions and make the most of your visit.
                  </p>
                </div>
                
                {/* Map Container */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-20"></div>
                  <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/50">
                    <div className="h-[650px] relative">
                      <GoogleMap 
                        touristSpots={placeWithCoords ? [{
                          id: placeWithCoords.id,
                          name: placeWithCoords.title,
                          type: placeWithCoords.category,
                          color: '#3b82f6',
                          description: placeWithCoords.description,
                          bestTime: placeWithCoords.bestTimeToVisit || 'Year Round',
                          lat: placeWithCoords.coordinates?.lat || 23.6102,
                          lng: placeWithCoords.coordinates?.lng || 85.2799,
                          googleMaps: `https://maps.google.com/?q=${placeWithCoords.coordinates?.lat || 23.6102},${placeWithCoords.coordinates?.lng || 85.2799}`
                        }] : []}
                        onLocationSelect={(locationId) => console.log('Selected:', locationId)}
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none rounded-3xl"></div>
                    </div>
                  </div>
                </div>
                
                {/* Feature Cards */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-6 shadow-lg">
                        <span className="text-2xl text-white">🎯</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Filtering</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Use intelligent filter buttons to discover specific types of places - from tourist attractions to essential services.
                      </p>
                    </div>
                  </div>
                  
                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mb-6 shadow-lg">
                        <span className="text-2xl text-white">📍</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Detailed Information</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Click any marker to reveal comprehensive details, ratings, opening hours, and user reviews.
                      </p>
                    </div>
                  </div>
                  
                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-6 shadow-lg">
                        <span className="text-2xl text-white">🧭</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Live Directions</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Get real-time, turn-by-turn directions with multiple travel modes - driving, walking, or public transit.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Pro Tips Section */}
                <div className="mt-12 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-3xl p-8 border border-gray-200/50 backdrop-blur-sm">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl mb-4 shadow-lg">
                      <span className="text-xl text-white">💡</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Travel Tips</h3>
                    <p className="text-gray-600">Make the most of your visit with these insider recommendations</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl mb-3">⏰</div>
                      <h4 className="font-semibold text-gray-900 mb-2">Best Time</h4>
                      <p className="text-sm text-gray-600">Visit during {place?.bestTimeToVisit} for optimal experience</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-3">🎒</div>
                      <h4 className="font-semibold text-gray-900 mb-2">Pack Smart</h4>
                      <p className="text-sm text-gray-600">Check nearby amenities and plan accordingly</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-3">🚗</div>
                      <h4 className="font-semibold text-gray-900 mb-2">Transportation</h4>
                      <p className="text-sm text-gray-600">Multiple travel modes available for easy access</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-3">⭐</div>
                      <h4 className="font-semibold text-gray-900 mb-2">Local Favorites</h4>
                      <p className="text-sm text-gray-600">Discover highly-rated nearby attractions</p>
                    </div>
                  </div>
                </div>
                
                {/* Call to Action */}
                <div className="mt-16 text-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm"></div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-4">Ready for Your Adventure?</h3>
                      <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        Start planning your visit to {place?.title} and make unforgettable memories. 
                        Book your journey today!
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button 
                          onClick={handleBookFlight}
                          className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <Plane className="w-5 h-5 mr-2" />
                          Book Your Trip
                        </Button>
                        <Button 
                          asChild
                          className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <Link href="/places">
                            Explore More Places
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Final spacer */}
      <div className="h-20"></div>
    </div>
  );
}
