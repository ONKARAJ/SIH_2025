"use client";

import { Navigation } from "@/components/navigation";
import { PlaceCardModal } from "@/components/place-card-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  MapPin, 
  Filter, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Star,
  Users,
  Loader2,
  ChevronDown,
  X
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import type { Place } from "@/types/place";
import "./animations.css";

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

export default function EnhancedPlacesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);

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
    
    // Load popular searches
    setPopularSearches([
      'waterfalls', 'temples', 'wildlife', 'hills', 'heritage',
      'Ranchi', 'Deoghar', 'adventure', 'spiritual'
    ]);
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading amazing destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Enhanced Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full opacity-20 blur-3xl animate-float"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-100 rounded-full opacity-10 blur-2xl animate-pulse-glow"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Enhanced Main Heading */}
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-200 to-blue-200 rounded-full opacity-20 blur-lg animate-pulse-glow"></div>
              <div className="flex items-center justify-center gap-3 mb-2">
                <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-emerald-500 animate-float" />
                <h1 className="relative text-5xl md:text-7xl font-bold gradient-text">
                  Discover Jharkhand
                </h1>
                <Sparkles className="w-6 h-6 md:w-10 md:h-10 text-blue-500 animate-float" style={{ animationDelay: '1s' }} />
              </div>
              <p className="text-lg text-emerald-600 font-medium">Your Gateway to Natural Wonders</p>
            </div>
            
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              <Card className="bg-white/70 backdrop-blur-sm border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mx-auto mb-3">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-bold text-emerald-600 mb-1">{stats.totalPlaces}</div>
                  <div className="text-sm text-gray-600 font-medium">Places</div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3">
                    <Star className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stats.averageRating}⭐</div>
                  <div className="text-sm text-gray-600 font-medium">Rating</div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-yellow-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-3">
                    <TrendingUp className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-600 mb-1">{categories.length}</div>
                  <div className="text-sm text-gray-600 font-medium">Categories</div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">10K+</div>
                  <div className="text-sm text-gray-600 font-medium">Visitors</div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Search Section */}
            <Card className="bg-white/80 backdrop-blur-md border-gray-100 shadow-2xl p-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                {/* Advanced Search Bar */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-200 to-blue-200 rounded-2xl opacity-20 blur-sm"></div>
                  <div className="relative">
                    <Search className={`absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 transition-colors ${isSearching ? 'text-emerald-600 animate-pulse' : 'text-emerald-500'}`} />
                    <Input
                      type="text"
                      placeholder="Search by name, location, category, or attractions..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      className="pl-14 pr-12 py-4 text-lg bg-white border-2 border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 rounded-2xl shadow-sm transition-all duration-200 placeholder:text-gray-400"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setShowSuggestions(false);
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                    {isSearching && (
                      <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                        <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
                      </div>
                    )}
                  </div>

                  {/* Search Suggestions Dropdown */}
                  {showSuggestions && (searchData?.suggestions.length || popularSearches.length) && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto">
                      {searchData?.suggestions && searchData.suggestions.length > 0 && (
                        <div className="p-3 border-b border-gray-100">
                          <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-2">
                            <Search className="h-3 w-3" />
                            SUGGESTIONS
                          </div>
                          {searchData.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSearchSelect(suggestion)}
                              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors capitalize"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {popularSearches.length > 0 && (
                        <div className="p-3">
                          <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-2">
                            <TrendingUp className="h-3 w-3" />
                            POPULAR SEARCHES
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {popularSearches.slice(0, 6).map((search, index) => (
                              <button
                                key={index}
                                onClick={() => handleSearchSelect(search)}
                                className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-600 transition-colors capitalize"
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
                
                {/* Enhanced Category Filter */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-16"></div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
                      <Filter className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Categories</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-16"></div>
                  </div>
                  
                  <div className="flex gap-3 flex-wrap justify-center">
                    <Badge
                      variant={selectedCategory === "All" ? "default" : "outline"}
                      className={`cursor-pointer px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-full ${
                        selectedCategory === "All"
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transform scale-105" 
                          : "bg-white hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 border-gray-200 text-gray-600 hover:shadow-md"
                      }`}
                      onClick={() => handleCategorySelect("All")}
                    >
                      All ({stats.totalPlaces})
                    </Badge>
                    
                    {categories.map((category) => (
                      <Badge
                        key={category.name}
                        variant={selectedCategory === category.name ? "default" : "outline"}
                        className={`cursor-pointer px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-full ${
                          selectedCategory === category.name
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transform scale-105" 
                            : "bg-white hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 border-gray-200 text-gray-600 hover:shadow-md"
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

          {/* Enhanced Results Header */}
          <Card className="bg-white/60 backdrop-blur-sm border-gray-100 p-6 mb-8 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-100 rounded-full">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      {isSearching ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        filteredDestinations.length
                      )} 
                      {filteredDestinations.length === 1 ? 'Place' : 'Places'}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {selectedCategory === "All" ? "All categories" : selectedCategory} • Updated now
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 flex-wrap">
                {/* Active Filters */}
                <div className="flex items-center gap-2 flex-wrap">
                  {searchTerm && (
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 flex items-center gap-1">
                      <Search className="h-3 w-3" />
                      "{searchTerm}"
                    </Badge>
                  )}
                  {selectedCategory !== "All" && (
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1 flex items-center gap-1">
                      <Filter className="h-3 w-3" />
                      {selectedCategory}
                    </Badge>
                  )}
                </div>
                
                {(searchTerm || selectedCategory !== "All") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 flex items-center gap-1"
                  >
                    <X className="h-4 w-4" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Enhanced Destinations Grid */}
      <section className="pb-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDestinations.length > 0 && (
            <div className="mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"></div>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  {selectedCategory === "All" ? "🌍 Explore All Destinations" : `🏷️ ${selectedCategory} Destinations`}
                </h2>
                <p className="text-gray-600 text-lg">
                  {searchTerm 
                    ? `Discover places matching "${searchTerm}"`
                    : "Each destination offers unique experiences and unforgettable memories"
                  }
                </p>
              </div>
            </div>
          )}
          
          {isSearching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
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
          )}

          {filteredDestinations.length === 0 && !isSearching && (
            <div className="text-center py-20">
              <div className="mx-auto max-w-lg">
                <div className="relative mb-8">
                  <div className="absolute inset-0 animate-pulse">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full mx-auto opacity-20"></div>
                  </div>
                  <div className="relative bg-white rounded-full w-24 h-24 mx-auto flex items-center justify-center shadow-lg border border-gray-100">
                    <Search className="h-10 w-10 text-emerald-500" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  🌍 No destinations found
                </h3>
                
                <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 p-6 mb-8">
                  <CardContent className="p-0">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {searchTerm ? (
                        <>
                          <span className="font-medium">No results for "{searchTerm}"</span>
                          {selectedCategory !== "All" && (
                            <span className="text-gray-600"> in {selectedCategory} category</span>
                          )}
                          <br />
                          <span className="text-gray-600 text-base">Try different keywords or explore all categories</span>
                        </>
                      ) : (
                        `We couldn't find any destinations in the ${selectedCategory} category.`
                      )}
                    </p>
                  </CardContent>
                </Card>
                
                <div className="space-y-4">
                  <Button
                    onClick={clearFilters}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    🌍 Explore All {stats.totalPlaces} Destinations
                  </Button>
                  
                  <Card className="bg-gray-50 p-4">
                    <CardContent className="p-0">
                      <div className="text-sm font-medium text-gray-700 mb-3">
                        💡 Popular search suggestions:
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {popularSearches.slice(0, 5).map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => handleSearchSelect(suggestion)}
                            className="px-3 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors capitalize hover:shadow-sm"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Footer CTA Section */}
      {filteredDestinations.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8 shadow-2xl">
              <CardContent className="p-0">
                <h3 className="text-4xl font-bold text-white mb-4">
                  Ready to Explore Jharkhand?
                </h3>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Start planning your perfect journey through these incredible destinations. 
                  Book your flights, hotels, and trains with just a few clicks.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    ↑ Back to Top
                  </Button>
                  <Button
                    onClick={() => {
                      clearFilters();
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold px-8 py-4 rounded-full text-lg transform hover:scale-105 transition-all duration-200"
                  >
                    🔍 Discover More Places
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
