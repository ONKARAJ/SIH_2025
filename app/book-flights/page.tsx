'use client'

import { Navigation } from '@/components/navigation'
import FlightBooking from '@/components/booking/flight-booking'
import { Plane, MapPin, Clock, Users, Shield, Calendar, CreditCard, Star, ArrowRight, Search, RotateCcw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

// Featured flights data
const featuredFlights = [
  // Flights to Ranchi
  {
    id: 'flight-001',
    airline: 'IndiGo',
    flightNumber: '6E-123',
    departure: 'Delhi',
    departureCode: 'DEL',
    arrival: 'Ranchi',
    arrivalCode: 'IXR',
    departureTime: '06:30',
    arrivalTime: '08:45',
    duration: '2h 15m',
    price: 8500,
    originalPrice: 10200,
    availableSeats: 45,
    aircraft: 'Airbus A320',
    type: 'Direct',
    rating: 4.2
  },
  {
    id: 'flight-002',
    airline: 'IndiGo',
    flightNumber: '6E-247',
    departure: 'Delhi',
    departureCode: 'DEL',
    arrival: 'Ranchi',
    arrivalCode: 'IXR',
    departureTime: '14:15',
    arrivalTime: '16:30',
    duration: '2h 15m',
    price: 9200,
    originalPrice: 11000,
    availableSeats: 38,
    aircraft: 'Airbus A320',
    type: 'Direct',
    rating: 4.2
  },
  {
    id: 'flight-003',
    airline: 'SpiceJet',
    flightNumber: 'SG-456',
    departure: 'Mumbai',
    departureCode: 'BOM',
    arrival: 'Ranchi',
    arrivalCode: 'IXR',
    departureTime: '14:20',
    arrivalTime: '16:50',
    duration: '2h 30m',
    price: 7800,
    originalPrice: 9500,
    availableSeats: 42,
    aircraft: 'Boeing 737',
    type: 'Direct',
    rating: 4.0
  },
  {
    id: 'flight-004',
    airline: 'Air India',
    flightNumber: 'AI-789',
    departure: 'Kolkata',
    departureCode: 'CCU',
    arrival: 'Ranchi',
    arrivalCode: 'IXR',
    departureTime: '11:15',
    arrivalTime: '12:25',
    duration: '1h 10m',
    price: 6500,
    originalPrice: 8000,
    availableSeats: 52,
    aircraft: 'ATR 72',
    type: 'Direct',
    rating: 3.9
  },
  {
    id: 'flight-005',
    airline: 'Vistara',
    flightNumber: 'UK-673',
    departure: 'Bangalore',
    departureCode: 'BLR',
    arrival: 'Ranchi',
    arrivalCode: 'IXR',
    departureTime: '13:25',
    arrivalTime: '16:10',
    duration: '2h 45m',
    price: 9800,
    originalPrice: 12000,
    availableSeats: 36,
    aircraft: 'Airbus A320neo',
    type: 'Direct',
    rating: 4.5
  },
  // Flights to Deoghar
  {
    id: 'flight-006',
    airline: 'IndiGo',
    flightNumber: '6E-789',
    departure: 'Delhi',
    departureCode: 'DEL',
    arrival: 'Deoghar',
    arrivalCode: 'DGH',
    departureTime: '07:00',
    arrivalTime: '09:20',
    duration: '2h 20m',
    price: 9500,
    originalPrice: 11500,
    availableSeats: 42,
    aircraft: 'Airbus A320',
    type: 'Direct',
    rating: 4.2
  },
  {
    id: 'flight-007',
    airline: 'Air India',
    flightNumber: 'AI-567',
    departure: 'Kolkata',
    departureCode: 'CCU',
    arrival: 'Deoghar',
    arrivalCode: 'DGH',
    departureTime: '09:45',
    arrivalTime: '11:00',
    duration: '1h 15m',
    price: 7200,
    originalPrice: 8800,
    availableSeats: 48,
    aircraft: 'ATR 72',
    type: 'Direct',
    rating: 3.9
  },
  {
    id: 'flight-008',
    airline: 'SpiceJet',
    flightNumber: 'SG-691',
    departure: 'Mumbai',
    departureCode: 'BOM',
    arrival: 'Deoghar',
    arrivalCode: 'DGH',
    departureTime: '11:30',
    arrivalTime: '14:05',
    duration: '2h 35m',
    price: 8800,
    originalPrice: 10500,
    availableSeats: 40,
    aircraft: 'Boeing 737',
    type: 'Direct',
    rating: 4.0
  },
  {
    id: 'flight-009',
    airline: 'Vistara',
    flightNumber: 'UK-945',
    departure: 'Chennai',
    departureCode: 'MAA',
    arrival: 'Deoghar',
    arrivalCode: 'DGH',
    departureTime: '08:15',
    arrivalTime: '11:05',
    duration: '2h 50m',
    price: 10500,
    originalPrice: 12800,
    availableSeats: 32,
    aircraft: 'Airbus A320neo',
    type: 'Direct',
    rating: 4.5
  }
];

const getAirlineLogo = (airline) => {
  const logos = {
    'IndiGo': '🟦',
    'SpiceJet': '🟡',
    'Air India': '🔴', 
    'Vistara': '🟣',
    'Air India Express': '🔴'
  };
  return logos[airline] || '✈️';
};

export default function BookFlightsPage() {
  const router = useRouter();
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Get unique cities for dropdown options
  const cities = useMemo(() => {
    const departureCities = [...new Set(featuredFlights.map(f => f.departure))];
    const arrivalCities = [...new Set(featuredFlights.map(f => f.arrival))];
    const allCities = [...new Set([...departureCities, ...arrivalCities])];
    return allCities.sort();
  }, []);
  
  // Filter flights based on search criteria
  const filteredFlights = useMemo(() => {
    if (!departureCity && !arrivalCity) {
      return featuredFlights;
    }
    
    return featuredFlights.filter(flight => {
      const matchesDeparture = !departureCity || flight.departure === departureCity;
      const matchesArrival = !arrivalCity || flight.arrival === arrivalCity;
      return matchesDeparture && matchesArrival;
    });
  }, [departureCity, arrivalCity]);
  
  const handleSearch = () => {
    setIsSearching(departureCity !== '' || arrivalCity !== '');
  };
  
  const clearSearch = () => {
    setDepartureCity('');
    setArrivalCity('');
    setIsSearching(false);
  };
  
  const swapCities = () => {
    const temp = departureCity;
    setDepartureCity(arrivalCity);
    setArrivalCity(temp);
  };

  const handleBookNow = (flight) => {
    // Store flight data in localStorage for the booking page
    localStorage.setItem('selectedFlight', JSON.stringify(flight));
    // Navigate to the dedicated booking page
    router.push(`/booking/flight/${flight.id}`);
  };

  if (showBooking && selectedFlight) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <FlightBooking preselectedFlight={selectedFlight} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600/10 to-emerald-600/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Plane className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Book Flights to Jharkhand
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Fly to Jharkhand with ease! Book flights to Ranchi (IXR) and Deoghar (DGH) airports. 
            Compare prices from multiple airlines and find the best deals for your journey.
          </p>
          
          {/* Flight Search Toolbar */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 shadow-xl border-2 border-blue-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {/* From */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">From</Label>
                  <Select value={departureCity || 'all'} onValueChange={(value) => setDepartureCity(value === 'all' ? '' : value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select departure city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All departure cities</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Swap Button */}
                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={swapCities}
                    className="h-12 w-12 rounded-full border-2 border-blue-200 hover:bg-blue-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* To */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">To</Label>
                  <Select value={arrivalCity || 'all'} onValueChange={(value) => setArrivalCity(value === 'all' ? '' : value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select destination city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All destinations</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Search Button */}
                <div className="flex gap-2">
                  <Button
                    onClick={handleSearch}
                    className="h-12 flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search Flights
                  </Button>
                  {(departureCity || arrivalCity) && (
                    <Button
                      onClick={clearSearch}
                      variant="outline"
                      className="h-12 px-3"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Popular Routes */}
              <div className="flex flex-wrap justify-center gap-2 mt-6 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500 mr-2">Popular routes:</span>
                {[
                  { from: 'Delhi', to: 'Ranchi' },
                  { from: 'Mumbai', to: 'Ranchi' },
                  { from: 'Kolkata', to: 'Deoghar' },
                  { from: 'Chennai', to: 'Deoghar' }
                ].map((route) => (
                  <Button
                    key={`${route.from}-${route.to}`}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDepartureCity(route.from);
                      setArrivalCity(route.to);
                      handleSearch();
                    }}
                    className="text-xs rounded-full border-blue-200 hover:bg-blue-50 hover:border-blue-400"
                  >
                    {route.from} → {route.to}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Airport Information */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Plane className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Ranchi Airport (IXR)</h3>
                  <p className="text-sm text-muted-foreground">Birsa Munda Airport</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Main gateway to Jharkhand, serving the capital city with connections to major Indian cities. 
                Located 7km from Ranchi city center.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Plane className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Deoghar Airport (DGH)</h3>
                  <p className="text-sm text-muted-foreground">Baba Baidyanath Dham Airport</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Gateway to the holy city of Deoghar, connecting pilgrims and tourists to the famous 
                Baidyanath Temple and surrounding attractions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm">Multiple Airlines</h3>
              <p className="text-xs text-muted-foreground">Compare all options</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-sm">Flexible Timing</h3>
              <p className="text-xs text-muted-foreground">Multiple daily flights</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-sm">Group Booking</h3>
              <p className="text-xs text-muted-foreground">Special group rates</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-sm">Secure Booking</h3>
              <p className="text-xs text-muted-foreground">Safe & guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results / Featured Flights Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            {isSearching || departureCity || arrivalCity ? (
              <>
                <h2 className="text-3xl font-bold mb-4">
                  Flight Search Results
                  {departureCity && arrivalCity && (
                    <span className="block text-2xl text-blue-600 mt-2">
                      {departureCity} → {arrivalCity}
                    </span>
                  )}
                </h2>
                <p className="text-muted-foreground mb-4">
                  Found {filteredFlights.length} flight{filteredFlights.length !== 1 ? 's' : ''}
                  {departureCity && !arrivalCity && ` from ${departureCity}`}
                  {!departureCity && arrivalCity && ` to ${arrivalCity}`}
                  {departureCity && arrivalCity && ` from ${departureCity} to ${arrivalCity}`}
                </p>
                {filteredFlights.length === 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
                    <p className="text-yellow-800 font-medium mb-2">
                      No flights found for the selected route
                    </p>
                    <p className="text-yellow-600 text-sm mb-4">
                      Try selecting different cities or check our popular routes above
                    </p>
                    <Button 
                      onClick={clearSearch}
                      variant="outline" 
                      size="sm"
                      className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                    >
                      View All Flights
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4">Available Flights to Jharkhand</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Choose from multiple daily flights to Ranchi and Deoghar with competitive prices
                </p>
              </>
            )}
          </div>

          {filteredFlights.length > 0 && (
            <div className="space-y-4">
              {filteredFlights.map((flight) => (
              <Card key={flight.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Flight Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        {/* Airline */}
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getAirlineLogo(flight.airline)}</span>
                          <div>
                            <div className="font-semibold">{flight.airline}</div>
                            <div className="text-sm text-muted-foreground">{flight.flightNumber}</div>
                          </div>
                        </div>

                        {/* Route */}
                        <div className="flex-1 flex items-center justify-center gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold">{flight.departureTime}</div>
                            <div className="text-sm text-muted-foreground">
                              {flight.departure} ({flight.departureCode})
                            </div>
                          </div>
                          <div className="flex-1 relative">
                            <div className="flex items-center justify-center">
                              <div className="flex-1 border-t border-gray-300"></div>
                              <div className="mx-2 text-muted-foreground">
                                <Plane className="w-4 h-4" />
                              </div>
                              <div className="flex-1 border-t border-gray-300"></div>
                            </div>
                            <div className="text-center text-xs text-muted-foreground mt-1">
                              {flight.duration} • {flight.type}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{flight.arrivalTime}</div>
                            <div className="text-sm text-muted-foreground">
                              {flight.arrival} ({flight.arrivalCode})
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Flight Details */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Plane className="w-3 h-3" />
                          {flight.aircraft}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {flight.availableSeats} seats available
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{flight.rating}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {flight.type}
                        </Badge>
                      </div>
                    </div>

                    {/* Price and Booking */}
                    <div className="lg:text-right">
                      <div className="mb-3">
                        <div className="flex items-center gap-2 lg:justify-end">
                          <span className="text-2xl font-bold text-blue-600">
                            ₹{flight.price.toLocaleString()}
                          </span>
                          {flight.originalPrice > flight.price && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{flight.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">per person</div>
                        {flight.originalPrice > flight.price && (
                          <Badge className="mt-1 bg-red-500 text-white">
                            Save ₹{flight.originalPrice - flight.price}
                          </Badge>
                        )}
                      </div>
                      <Button 
                        onClick={() => handleBookNow(flight)}
                        className="bg-blue-600 hover:bg-blue-700 w-full lg:w-auto"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Airlines & Routes */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Routes & Airlines</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              We work with all major airlines to bring you the best flight options to Jharkhand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Plane className="w-5 h-5 text-blue-600" />
                To Ranchi (IXR)
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Delhi → Ranchi</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">2h 15m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mumbai → Ranchi</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">2h 30m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Kolkata → Ranchi</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">1h 10m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bangalore → Ranchi</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">2h 45m</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Plane className="w-5 h-5 text-emerald-600" />
                To Deoghar (DGH)
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Delhi → Deoghar</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">2h 20m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Kolkata → Deoghar</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">1h 15m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mumbai → Deoghar</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">2h 35m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Chennai → Deoghar</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">2h 50m</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Our Promise
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Best price guarantee</span>
                </div>
                <div className="flex items-start gap-2">
                  <CreditCard className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Secure payment processing</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">24/7 customer support</span>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Instant booking confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
