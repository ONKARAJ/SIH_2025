"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Star, Users, Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";

interface Hotel {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  rating: number;
  images: string[];
  amenities: string[];
  rooms: Room[];
}

interface Room {
  id: string;
  name: string;
  type: string;
  description: string;
  maxGuests: number;
  basePrice: number;
  images: string[];
  amenities: string[];
}

export default function HotelsBookingPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    minPrice: "",
    maxPrice: ""
  });

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      Object.entries(searchFilters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`/api/hotels?${queryParams}`);
      const data = await response.json();
      
      if (data.success) {
        const parsedHotels = data.hotels.map((hotel: any) => ({
          ...hotel,
          images: JSON.parse(hotel.images || '[]'),
          amenities: JSON.parse(hotel.amenities || '[]'),
          rooms: hotel.rooms.map((room: any) => ({
            ...room,
            images: JSON.parse(room.images || '[]'),
            amenities: JSON.parse(room.amenities || '[]')
          }))
        }));
        setHotels(parsedHotels);
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleSearch = () => {
    fetchHotels();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Book Hotels in Jharkhand
          </h1>
          <p className="text-lg text-muted-foreground">
            Find and book the best hotels across Jharkhand for your perfect stay
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Hotels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  City
                </label>
                <Input
                  placeholder="Enter city"
                  value={searchFilters.city}
                  onChange={(e) => setSearchFilters({...searchFilters, city: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Check-in
                </label>
                <Input
                  type="date"
                  value={searchFilters.checkIn}
                  onChange={(e) => setSearchFilters({...searchFilters, checkIn: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Check-out
                </label>
                <Input
                  type="date"
                  value={searchFilters.checkOut}
                  onChange={(e) => setSearchFilters({...searchFilters, checkOut: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Guests
                </label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={searchFilters.guests}
                  onChange={(e) => setSearchFilters({...searchFilters, guests: e.target.value})}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Min Price (₹)
                </label>
                <Input
                  type="number"
                  placeholder="Min price"
                  value={searchFilters.minPrice}
                  onChange={(e) => setSearchFilters({...searchFilters, minPrice: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Max Price (₹)
                </label>
                <Input
                  type="number"
                  placeholder="Max price"
                  value={searchFilters.maxPrice}
                  onChange={(e) => setSearchFilters({...searchFilters, maxPrice: e.target.value})}
                />
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={handleSearch} className="w-full md:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Search Hotels
              </Button>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-muted-foreground">Loading hotels...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {hotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <img
                    src={hotel.images[0] || "/placeholder.jpg"}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      {hotel.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hotel.address}, {hotel.city}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {hotel.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-foreground mb-2">Available Rooms</h4>
                    <div className="space-y-2">
                      {hotel.rooms.slice(0, 2).map((room) => (
                        <div key={room.id} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{room.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              Max {room.maxGuests} guests
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-foreground">₹{room.basePrice}</div>
                            <div className="text-xs text-muted-foreground">per night</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{hotel.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <Button className="w-full">
                    View Details & Book
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && hotels.length === 0 && (
          <div className="text-center py-12">
            <div className="text-lg text-muted-foreground mb-4">
              No hotels found matching your criteria
            </div>
            <Button variant="outline" onClick={() => {
              setSearchFilters({
                city: "",
                checkIn: "",
                checkOut: "",
                guests: "2",
                minPrice: "",
                maxPrice: ""
              });
              fetchHotels();
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
