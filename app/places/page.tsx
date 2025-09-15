"use client";

import { Navigation } from "@/components/navigation";
import { PlaceCardModal } from "@/components/place-card-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { allPlaces } from "@/data/places-data";
import type { Place } from "@/types/place";
import "./animations.css";

export default function PlacesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Extract unique categories from the places data
  const categories = [
    "All",
    ...Array.from(new Set(allPlaces.map(place => place.category))).sort()
  ];

  // Simulate loading for smooth experience
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredDestinations = allPlaces.filter((place) => {
    const matchesSearch =
      place.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.attractions.some(attraction => 
        attraction.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="relative py-24 bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-100 rounded-full opacity-10 blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Main Heading with decorative elements */}
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-200 to-blue-200 rounded-full opacity-20 blur-lg animate-pulse-glow"></div>
              <div className="flex items-center justify-center gap-3 mb-2">
                <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-emerald-500 animate-float" style={{ animationDelay: '0.5s' }} />
                <h1 className="relative text-5xl md:text-7xl font-bold gradient-text">
                  Glimpse of Jharkhand
                </h1>
                <Sparkles className="w-6 h-6 md:w-10 md:h-10 text-blue-500 animate-float" style={{ animationDelay: '1s' }} />
              </div>
            </div>
            
            {/* Subtitle with elegant styling */}
            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent flex-1 max-w-24"></div>
                <div className="px-4 text-emerald-600 font-medium text-sm uppercase tracking-wider">{allPlaces.length} Spectacular Destinations</div>
                <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent flex-1 max-w-24"></div>
              </div>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 font-light">
                Embark on a journey through Jharkhand's most breathtaking landscapes and cultural treasures. 
                From thundering waterfalls that cascade through ancient forests to sacred temples that echo with centuries of devotion, 
                each destination tells a unique story of natural wonder and cultural heritage.
              </p>
              
              {/* Stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="bg-white/70 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">{allPlaces.length}</div>
                  <div className="text-sm text-gray-600 font-medium">Total Destinations</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{Array.from(new Set(allPlaces.map(place => place.category))).length}</div>
                  <div className="text-sm text-gray-600 font-medium">Unique Categories</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm border border-yellow-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl font-bold text-yellow-600 mb-1">{(allPlaces.reduce((sum, place) => sum + place.rating, 0) / allPlaces.length).toFixed(1)}⭐</div>
                  <div className="text-sm text-gray-600 font-medium">Average Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-xl p-8 mb-12">
            <div className="space-y-8">
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-200 to-blue-200 rounded-full opacity-20 blur-sm"></div>
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-emerald-500 w-6 h-6" />
                  <Input
                    type="text"
                    placeholder="Discover places by name, location, or attractions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-14 pr-6 py-4 text-lg bg-white border-2 border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 rounded-full shadow-sm transition-all duration-200 placeholder:text-gray-400"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-16"></div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
                    <Filter className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Explore Categories</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-16"></div>
                </div>
                
                <div className="flex gap-3 flex-wrap justify-center">
                  {categories.map((category) => {
                    const isSelected = selectedCategory === category
                    const count = allPlaces.filter(place => place.category === category).length
                    return (
                      <Badge
                        key={category}
                        variant={isSelected ? "default" : "outline"}
                        className={`cursor-pointer px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-full ${
                          isSelected
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transform scale-105" 
                            : "bg-white hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 border-gray-200 text-gray-600 hover:shadow-md"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category} {category !== "All" && `(${count})`}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xl font-semibold text-gray-900">
                    {filteredDestinations.length} {filteredDestinations.length === 1 ? 'Destination' : 'Destinations'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedCategory === "All" ? "All categories" : selectedCategory} • {allPlaces.length} total places
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Active Filters */}
                <div className="flex items-center gap-2">
                  {searchTerm && (
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                      🔍 "{searchTerm}"
                    </Badge>
                  )}
                  {selectedCategory !== "All" && (
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
                      🏷️ {selectedCategory}
                    </Badge>
                  )}
                </div>
                
                {(searchTerm || selectedCategory !== "All") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                    }}
                    className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200"
                  >
                    ✕ Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="pb-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDestinations.length > 0 && (
            <div className="mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"></div>
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {selectedCategory === "All" ? "Explore All Destinations" : `${selectedCategory} Destinations`}
                </h2>
                <p className="text-gray-600">
                  {searchTerm 
                    ? `Discover places matching "${searchTerm}"`
                    : "Each destination offers unique experiences and unforgettable memories"
                  }
                </p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDestinations.map((place, index) => (
              <div 
                key={place.id} 
                className="animate-fade-in-up" 
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <PlaceCardModal place={place} />
              </div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-20">
              <div className="mx-auto max-w-lg">
                {/* Animated search icon */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 animate-pulse">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full mx-auto opacity-20"></div>
                  </div>
                  <div className="relative bg-white rounded-full w-24 h-24 mx-auto flex items-center justify-center shadow-lg border border-gray-100">
                    <Search className="h-10 w-10 text-emerald-500" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  🌍 No destinations found
                </h3>
                
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {searchTerm 
                      ? (
                        <>
                          <span className="font-medium">No results for "{searchTerm}"</span>
                          {selectedCategory !== "All" && (
                            <span className="text-gray-600"> in {selectedCategory} category</span>
                          )}
                          <br />
                          <span className="text-gray-600 text-base">Try different keywords or explore all categories</span>
                        </>
                      )
                      : `We couldn't find any destinations in the ${selectedCategory} category.`
                    }
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    🌍 Explore All {allPlaces.length} Destinations
                  </Button>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      💡 Popular search suggestions:
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {['waterfalls', 'temples', 'wildlife', 'hills', 'heritage'].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => setSearchTerm(suggestion)}
                          className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors capitalize"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA Section */}
      {filteredDestinations.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-white/20 rounded-3xl blur-lg"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Ready to Explore Jharkhand?
                </h3>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Start planning your perfect journey through these incredible destinations. 
                  Book your flights, hotels, and trains with just a few clicks.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full text-lg shadow-lg"
                  >
                    ↑ Back to Top
                  </Button>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold px-8 py-3 rounded-full text-lg"
                  >
                    🔍 Explore More Places
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
