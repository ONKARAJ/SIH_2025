'use client'

import { Navigation } from '@/components/navigation'
import HotelBooking from '@/components/booking/hotel-booking'
import { Hotel, MapPin, Star, Wifi, Car, Utensils, Dumbbell, Calendar, CreditCard, Phone, Mail, CheckCircle, Search, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { citiesData, getCityBySlug } from '@/lib/cities-data'

// Function to get all hotels from cities data
function getAllHotels() {
  const hotels = [];
  let hotelId = 1;
  
  citiesData.forEach(city => {
    city.hotels.forEach(hotel => {
      // Extract price as number (remove ₹ and 'per night', convert to number)
      const priceMatch = hotel.price.match(/(\d{1,3}(?:,\d{3})*)/); 
      const price = priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : 3000;
      
      hotels.push({
        id: `hotel-${String(hotelId).padStart(3, '0')}`,
        name: hotel.name,
        location: city.name,
        description: hotel.description,
        rating: hotel.rating,
        reviews: Math.floor(Math.random() * 150) + 50, // Random reviews count
        price: price,
        originalPrice: Math.floor(price * 1.25), // 25% higher original price
        image: hotel.image,
        amenities: hotel.amenities,
        rooms: [
          { 
            type: hotel.category === 'luxury' ? 'Luxury Suite' : hotel.category === 'business' ? 'Business Room' : 'Standard Room', 
            price: price, 
            capacity: 2 
          }
        ],
        cityId: city.id
      });
      hotelId++;
    });
  });
  
  return hotels;
}

// Get all hotels from cities data
const featuredHotels = getAllHotels();

export default function BookHotelsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  
  // Handle city filtering from URL parameter
  useEffect(() => {
    const cityParam = searchParams?.get('city');
    if (cityParam) {
      const city = getCityBySlug(cityParam);
      if (city) {
        setSelectedCity(cityParam);
        setSearchQuery(city.name);
        setIsSearching(true);
      }
    }
  }, [searchParams]);
  
  // Filter hotels based on search query and city
  const filteredHotels = useMemo(() => {
    let hotels = featuredHotels;
    
    // Filter by city if a city is selected
    if (selectedCity) {
      hotels = hotels.filter(hotel => hotel.cityId === selectedCity);
    }
    
    // Filter by search query
    if (!searchQuery.trim()) {
      return hotels;
    }
    
    const query = searchQuery.toLowerCase();
    return hotels.filter(hotel => 
      hotel.name.toLowerCase().includes(query) ||
      hotel.location.toLowerCase().includes(query) ||
      hotel.description.toLowerCase().includes(query)
    );
  }, [searchQuery, selectedCity]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setSelectedCity('');
    // Clear URL parameters
    const url = new URL(window.location.href);
    url.searchParams.delete('city');
    window.history.replaceState({}, '', url);
  };
  
  // Helper function to highlight search terms
  const highlightText = (text: string, query: string) => {
    if (!query.trim() || !text) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={index} className="bg-yellow-200 font-semibold">{part}</span> : part
    );
  };

  const handleBookNow = (hotel) => {
    // Store hotel data in localStorage for the booking page
    localStorage.setItem('selectedHotel', JSON.stringify(hotel));
    // Navigate to the dedicated booking page
    router.push(`/booking/hotel/${hotel.id}`);
  };

  if (showBooking && selectedHotel) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <HotelBooking preselectedHotel={selectedHotel} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600/10 to-blue-600/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Hotel className="w-12 h-12 text-emerald-600" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Book Hotels in Jharkhand
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover comfortable accommodations across Jharkhand's most beautiful destinations. 
            From luxury resorts to eco-lodges, find the perfect stay for your adventure.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search hotels by destination (e.g., Ranchi, Netarhat, Deoghar...)"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 pr-12 py-6 text-lg border-2 border-emerald-200 focus:border-emerald-400 rounded-full shadow-lg"
              />
              {searchQuery && (
                <Button
                  onClick={clearSearch}
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            {/* Popular destinations */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-sm text-gray-500">Popular:</span>
              {['Ranchi', 'Jamshedpur', 'Bokaro', 'Dhanbad', 'Deoghar'].map((destination) => (
                <Button
                  key={destination}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSearch(destination)}
                  className="text-xs rounded-full border-emerald-200 hover:bg-emerald-50 hover:border-emerald-400"
                >
                  {destination}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Results / Featured Hotels Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            {isSearching ? (
              <>
                <h2 className="text-3xl font-bold mb-4">
                  {selectedCity ? `Hotels in ${getCityBySlug(selectedCity)?.name || searchQuery}` : `Search Results for "${searchQuery}"`}
                </h2>
                <p className="text-muted-foreground mb-4">
                  Found {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} {selectedCity ? `in ${getCityBySlug(selectedCity)?.name}` : 'matching your search'}
                </p>
                {filteredHotels.length === 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
                    <p className="text-yellow-800 font-medium mb-2">
                      {selectedCity ? `No hotels found in ${getCityBySlug(selectedCity)?.name}` : `No hotels found for "${searchQuery}"`}
                    </p>
                    <p className="text-yellow-600 text-sm mb-4">
                      {selectedCity ? 
                        'This city might not have hotel listings yet. Try browsing other cities.' :
                        'Try searching for popular destinations like Ranchi, Jamshedpur, or Deoghar'
                      }
                    </p>
                    <Button 
                      onClick={clearSearch}
                      variant="outline" 
                      size="sm"
                      className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                    >
                      View All Hotels
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4">Featured Hotels in Jharkhand</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Handpicked accommodations offering the best of Jharkhand's hospitality and comfort
                </p>
              </>
            )}
          </div>

          {filteredHotels.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredHotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                  />
                  {hotel.originalPrice > hotel.price && (
                    <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                      Save ₹{hotel.originalPrice - hotel.price}
                    </Badge>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white/90 text-black font-medium">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                      {hotel.rating} ({hotel.reviews} reviews)
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                      {highlightText(hotel.name, searchQuery)}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {highlightText(hotel.location, searchQuery)}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {highlightText(hotel.description, searchQuery)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{hotel.amenities.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-emerald-600">
                          ₹{hotel.price.toLocaleString()}
                        </span>
                        {hotel.originalPrice > hotel.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{hotel.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">per night</span>
                    </div>
                    <Button 
                      onClick={() => handleBookNow(hotel)}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-sm">Prime Locations</h3>
              <p className="text-xs text-muted-foreground">Near tourist attractions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm">Quality Assured</h3>
              <p className="text-xs text-muted-foreground">Verified properties</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-sm">Instant Booking</h3>
              <p className="text-xs text-muted-foreground">Real-time availability</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wifi className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-sm">Modern Amenities</h3>
              <p className="text-xs text-muted-foreground">WiFi, AC, & more</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Book Hotels With Us?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              We partner with the best accommodations across Jharkhand to ensure your stay is comfortable, 
              safe, and memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hotel className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Best Price Guarantee</h3>
              <p className="text-muted-foreground">
                We offer the best rates for quality accommodations across Jharkhand. 
                No hidden fees, transparent pricing.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">
                All our partner hotels are personally verified and meet our high standards 
                for cleanliness and service.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Flexible Booking</h3>
              <p className="text-muted-foreground">
                Easy cancellation policies and flexible check-in/check-out timings 
                to suit your travel plans.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
