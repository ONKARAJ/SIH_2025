"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Search, 
  MapPin, 
  Filter, 
  Star,
  Clock,
  Users,
  Heart,
  Share2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  X,
  TrendingUp,
  Camera,
  Calendar,
  Plane,
  Train,
  Hotel
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Place } from "@/types/place";
import Image from "next/image";
import "./modern-animations.css";

interface SearchResponse {
  places: Place[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    categories: { name: string; count: number }[];
    appliedCategory: string;
    appliedQuery: string;
  };
  suggestions: string[];
  stats: {
    totalPlaces: number;
    averageRating: string;
    topCategory: string;
  };
}

const PlaceCard = ({ place, index }: { place: Place; index: number }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingPopupOpen, setIsBookingPopupOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();
  
  const allImages = place.images || [place.image];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Booking navigation handlers
  const handleBookFlight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookingPopupOpen(false);
    router.push('/book-flights');
  };

  const handleBookTrain = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookingPopupOpen(false);
    router.push('/book-trains');
  };

  const handleBookHotel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookingPopupOpen(false);
    router.push('/book-hotels');
  };

  // Function to get attraction page URL based on category
  const getAttractionPageUrl = (category: string): string => {
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
      'Monument': '/temples-monuments'
    };
    return categoryMap[category] || '/places';
  };

  // Handle card click to navigate to attraction page
  const handleCardClick = () => {
    const attractionUrl = getAttractionPageUrl(place.category);
    router.push(attractionUrl);
  };

  // Handle explore details click
  const handleExploreDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    const attractionUrl = getAttractionPageUrl(place.category);
    router.push(attractionUrl);
  };

  // Handle book now click
  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookingPopupOpen(true);
  };

  return (
    <>
      <Card 
        className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-soft hover:shadow-intense transition-all duration-300 ease-out hover:-translate-y-2 animate-fade-in-up rounded-2xl cursor-pointer"
        style={{ 
          animationDelay: `${index * 100}ms`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}
        onClick={handleCardClick}
      >
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden rounded-t-2xl bg-gradient-to-br from-sky-100 to-blue-100">
          {!imageError ? (
            <Image
              src={place.image}
              alt={place.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-sky-100 via-pink-50 to-mint-100 flex items-center justify-center">
              <Camera className="h-12 w-12 text-gray-300" />
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Top right actions */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              className={`p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-200 ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200">
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white transition-all duration-200 border-0 shadow-sm">
              {place.category}
            </Badge>
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{place.rating}</span>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
              {place.title}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{place.location}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {place.shortDescription}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{place.bestTimeToVisit}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{place.reviews?.length || 0} reviews</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleBookNow}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              Book Now
              <Plane className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
            <Button 
              onClick={handleExploreDetails}
              variant="outline"
              className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              Explore Details
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              {place.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Image Carousel */}
            {allImages.length > 0 && (
              <div className="relative">
                <div className="relative h-64 md:h-80 overflow-hidden rounded-xl">
                  {!imageError ? (
                    <Image
                      src={allImages[currentImageIndex]}
                      alt={`${place.title} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-sky-100 via-pink-50 to-mint-100 flex items-center justify-center">
                      <Camera className="h-16 w-16 text-gray-300" />
                    </div>
                  )}
                  
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors backdrop-blur-sm"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors backdrop-blur-sm"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {allImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentImageIndex 
                                ? 'bg-white scale-125' 
                                : 'bg-white/60 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            
            {/* Place Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                {/* Location and Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">{place.location}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-yellow-700">{place.rating}</span>
                    <span className="text-sm text-yellow-600">({place.reviews?.length || 0} reviews)</span>
                  </div>
                </div>
                
                {/* Category and Best Time */}
                <div className="flex items-center gap-4">
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                    {place.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Best time: {place.bestTimeToVisit}</span>
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-600 leading-relaxed">{place.overview}</p>
                </div>
                
                {/* Booking buttons */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Your Journey</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      onClick={handleBookFlight}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white border-0 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 py-3"
                    >
                      <Plane className="h-4 w-4" />
                      <span className="text-sm font-medium">Flight</span>
                    </Button>
                    <Button
                      onClick={handleBookTrain}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 py-3"
                    >
                      <Train className="h-4 w-4" />
                      <span className="text-sm font-medium">Train</span>
                    </Button>
                    <Button
                      onClick={handleBookHotel}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 py-3"
                    >
                      <Hotel className="h-4 w-4" />
                      <span className="text-sm font-medium">Hotel</span>
                    </Button>
                  </div>
                </div>
                
                {/* Attractions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Attractions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {place.attractions.map((attraction, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                        <span>{attraction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Reviews */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Reviews</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {place.reviews?.slice(0, 3).map((review, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm text-gray-900">{review.name}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-medium">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{review.comment}</p>
                      <span className="text-xs text-gray-400 mt-1">{review.date}</span>
                    </div>
                  )) || (
                    <p className="text-sm text-gray-500 italic">No reviews yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Popup */}
      <Dialog open={isBookingPopupOpen} onOpenChange={setIsBookingPopupOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
              🚀 Book Your Journey
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-gray-600 text-center mb-6">Choose how you'd like to travel to {place.title}</p>
            
            <div className="space-y-3">
              <Button
                onClick={handleBookFlight}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white border-0 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 py-4 text-lg"
              >
                <Plane className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-semibold">Book Flight</div>
                  <div className="text-xs opacity-90">Fastest way to reach</div>
                </div>
              </Button>
              
              <Button
                onClick={handleBookTrain}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 py-4 text-lg"
              >
                <Train className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-semibold">Book Train</div>
                  <div className="text-xs opacity-90">Scenic and comfortable</div>
                </div>
              </Button>
              
              <Button
                onClick={handleBookHotel}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 py-4 text-lg"
              >
                <Hotel className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-semibold">Book Hotel</div>
                  <div className="text-xs opacity-90">Perfect stay options</div>
                </div>
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsBookingPopupOpen(false)}
                className="w-full rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default function ModernPlacesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [popularSearches] = useState([
    'waterfalls', 'temples', 'wildlife', 'hills', 'heritage',
    'Ranchi', 'Deoghar', 'adventure', 'spiritual', 'nature'
  ]);

  // Debounced search function
  const debounceSearch = useCallback((searchTerm: string, category: string) => {
    const timeoutId = setTimeout(() => {
      performSearch(searchTerm, category);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  // Perform search API call
  const performSearch = async (query: string = searchTerm, category: string = selectedCategory) => {
    setIsSearching(true);
    try {
      const params = new URLSearchParams({
        q: query,
        category: category,
        limit: '50',
        page: '1'
      });

      const response = await fetch(`/api/places/search?${params}`);
      if (!response.ok) throw new Error('Search failed');
      
      const data: SearchResponse = await response.json();
      setSearchData(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    performSearch('', 'All');
  }, []);

  // Handle search input change
  useEffect(() => {
    const cleanup = debounceSearch(searchTerm, selectedCategory);
    return cleanup;
  }, [searchTerm, selectedCategory, debounceSearch]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowSuggestions(false);
  };

  const handleSearchSelect = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setShowSuggestions(false);
  };

  const filteredDestinations = searchData?.places || [];
  const categories = searchData?.filters.categories || [];
  const stats = searchData?.stats || { totalPlaces: 0, averageRating: '0', topCategory: 'Waterfall' };

  if (isLoading && !searchData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-pink-50 flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-pink-100 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <Loader2 className="relative h-16 w-16 animate-spin text-blue-500 mx-auto mb-6" />
          </div>
          <p className="text-xl text-gray-600 font-medium">Discovering amazing places...</p>
          <p className="text-sm text-gray-400 mt-2">Please wait while we load the best destinations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-pink-50 relative overflow-hidden">
      <Navigation />

      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-100/30 to-yellow-100/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-100/20 to-blue-100/20 rounded-full blur-2xl animate-pulse-glow"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {/* Main heading */}
            <div className="space-y-4 mb-12">
              <div className="inline-block">
                <Badge className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 border-blue-200/30 px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                  ✨ Discover Amazing Places
                </Badge>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Beautiful Jharkhand
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                Explore breathtaking destinations, from serene waterfalls to ancient temples. 
                Your perfect adventure awaits in the heart of India.
              </p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-soft hover:shadow-md transition-all duration-300 rounded-2xl group hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stats.totalPlaces}</div>
                  <div className="text-sm text-gray-500 font-medium">Amazing Places</div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-soft hover:shadow-md transition-all duration-300 rounded-2xl group hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Star className="h-6 w-6 text-white fill-current" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stats.averageRating}</div>
                  <div className="text-sm text-gray-500 font-medium">Avg Rating</div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-soft hover:shadow-md transition-all duration-300 rounded-2xl group hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Filter className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{categories.length}</div>
                  <div className="text-sm text-gray-500 font-medium">Categories</div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-soft hover:shadow-md transition-all duration-300 rounded-2xl group hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">50K+</div>
                  <div className="text-sm text-gray-500 font-medium">Happy Travelers</div>
                </CardContent>
              </Card>
            </div>

            {/* Search section */}
            <Card className="bg-white/70 backdrop-blur-md border-0 shadow-intense rounded-3xl p-8 max-w-5xl mx-auto">
              <div className="space-y-8">
                {/* Search bar */}
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-2xl blur opacity-30"></div>
                  <div className="relative">
                    <Search className={`absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${isSearching ? 'text-blue-600 animate-pulse' : 'text-gray-400'}`} />
                    <Input
                      type="text"
                      placeholder="Search destinations, temples, waterfalls..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      className="pl-14 pr-12 py-6 text-lg bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-blue-300 rounded-2xl shadow-sm transition-all duration-200 placeholder:text-gray-400"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setShowSuggestions(false);
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    {isSearching && (
                      <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                      </div>
                    )}
                  </div>

                  {/* Search suggestions dropdown */}
                  {showSuggestions && (searchData?.suggestions.length || popularSearches.length) && (
                    <div className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-md border-0 rounded-2xl shadow-intense z-50 overflow-hidden">
                      {searchData?.suggestions && searchData.suggestions.length > 0 && (
                        <div className="p-4 border-b border-gray-100">
                          <div className="text-xs font-semibold text-gray-500 mb-3 flex items-center gap-2 uppercase tracking-wide">
                            <Search className="h-3 w-3" />
                            Suggestions
                          </div>
                          {searchData.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSearchSelect(suggestion)}
                              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200 capitalize"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {popularSearches.length > 0 && (
                        <div className="p-4">
                          <div className="text-xs font-semibold text-gray-500 mb-3 flex items-center gap-2 uppercase tracking-wide">
                            <TrendingUp className="h-3 w-3" />
                            Popular
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {popularSearches.slice(0, 8).map((search, index) => (
                              <button
                                key={index}
                                onClick={() => handleSearchSelect(search)}
                                className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-100 rounded-full text-sm text-gray-600 hover:text-gray-800 transition-all duration-200 capitalize"
                              >
                                {search}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Category filters */}
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Explore by Category</h3>
                  </div>
                  
                  <div className="flex gap-3 flex-wrap justify-center">
                    <Badge
                      variant={selectedCategory === "All" ? "default" : "outline"}
                      className={`cursor-pointer px-6 py-3 text-sm font-medium transition-all duration-300 rounded-full border-0 ${
                        selectedCategory === "All"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg transform hover:scale-105" 
                          : "bg-white/80 hover:bg-blue-50 text-gray-600 hover:text-blue-700 shadow-sm hover:shadow-md"
                      }`}
                      onClick={() => handleCategorySelect("All")}
                    >
                      All Places ({stats.totalPlaces})
                    </Badge>
                    
                    {categories.map((category) => (
                      <Badge
                        key={category.name}
                        variant={selectedCategory === category.name ? "default" : "outline"}
                        className={`cursor-pointer px-6 py-3 text-sm font-medium transition-all duration-300 rounded-full border-0 ${
                          selectedCategory === category.name
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg transform hover:scale-105" 
                            : "bg-white/80 hover:bg-blue-50 text-gray-600 hover:text-blue-700 shadow-sm hover:shadow-md"
                        }`}
                        onClick={() => handleCategorySelect(category.name)}
                      >
                        {category.name} ({category.count})
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Results section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Results header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold text-gray-800">
                {isSearching ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Searching...
                  </div>
                ) : (
                  `${filteredDestinations.length} Amazing ${filteredDestinations.length === 1 ? 'Place' : 'Places'}`
                )}
              </h2>
              {searchTerm && (
                <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                  "{searchTerm}"
                </Badge>
              )}
            </div>
            
            {(searchTerm || selectedCategory !== "All") && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="rounded-full border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Places grid */}
          {isSearching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <Card key={index} className="animate-pulse bg-white/60 rounded-2xl border-0 shadow-soft">
                  <div className="h-56 bg-gray-200 rounded-t-2xl"></div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-16 bg-gray-200 rounded"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredDestinations.map((place, index) => (
                <PlaceCard key={place.id} place={place} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No places found</h3>
                <p className="text-gray-600 mb-8">
                  {searchTerm 
                    ? `No results for "${searchTerm}". Try different keywords or explore all categories.`
                    : `No places found in the ${selectedCategory} category.`
                  }
                </p>
                <Button 
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full px-8 py-3 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Explore All Places
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA section */}
      {filteredDestinations.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 border-0 rounded-3xl shadow-intense overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
              <CardContent className="relative p-12 text-center text-white">
                <h3 className="text-4xl font-bold mb-6">Ready for an Adventure?</h3>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Start planning your perfect getaway to these incredible destinations. 
                  Book flights, hotels, and experiences all in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-white text-gray-800 hover:bg-gray-100 rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    ↑ Back to Top
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-800 rounded-full px-8 py-4 transition-all duration-200 font-semibold"
                    onClick={() => {
                      clearFilters();
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                  >
                    🌍 Discover More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Click outside to close suggestions */}
      {showSuggestions && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
}

// Add custom styles for animations and shadows
const styles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(3deg);
    }
  }

  @keyframes pulse-glow {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.05);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
    opacity: 0;
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-pulse-glow {
    animation: pulse-glow 4s ease-in-out infinite;
  }

  .shadow-soft {
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .shadow-intense {
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }

  .line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;
