"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Search, 
  Bus, 
  Clock, 
  MapPin, 
  Users, 
  CalendarIcon,
  ArrowRight,
  Star,
  Wifi,
  Snowflake,
  Zap,
  Coffee,
  Filter,
  SortAsc,
  Bed,
  AirVent
} from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface BusData {
  id: string;
  busNumber: string;
  busName: string;
  operator: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distance: number;
  frequency: number[];
  busType: 'Volvo AC' | 'Semi-Sleeper AC' | 'Sleeper AC' | 'Non-AC Seater' | 'AC Seater' | 'Luxury';
  totalSeats: number;
  availableSeats: number;
  basePrice: number;
  route: string[];
  amenities: string[];
  isActive: boolean;
  isFeatured: boolean;
  boardingPoints: { location: string; time: string }[];
  droppingPoints: { location: string; time: string }[];
}

const busTypes = [
  { value: 'All', label: 'All Bus Types' },
  { value: 'Luxury', label: 'Luxury' },
  { value: 'Volvo AC', label: 'Volvo AC' },
  { value: 'Sleeper AC', label: 'Sleeper AC' },
  { value: 'Semi-Sleeper AC', label: 'Semi-Sleeper AC' },
  { value: 'AC Seater', label: 'AC Seater' },
  { value: 'Non-AC Seater', label: 'Non-AC Seater' }
];

const popularDestinations = [
  'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro Steel City', 'Deoghar', 'Dumka', 'Hazaribagh', 'Chaibasa', 'Giridih'
];

const popularSources = [
  'Kolkata', 'Patna', 'Bhubaneswar', 'Puri', 'Gaya', 'Asansol', 'Durgapur', 'Cuttack', 'Berhampur', 'Rourkela', 'Siliguri'
];

const getAmenityIcon = (amenity: string) => {
  if (amenity.toLowerCase().includes('wifi')) return <Wifi className="w-4 h-4" />;
  if (amenity.toLowerCase().includes('ac') || amenity.toLowerCase().includes('luxury')) return <Snowflake className="w-4 h-4" />;
  if (amenity.toLowerCase().includes('charging')) return <Zap className="w-4 h-4" />;
  if (amenity.toLowerCase().includes('meals') || amenity.toLowerCase().includes('snacks')) return <Coffee className="w-4 h-4" />;
  if (amenity.toLowerCase().includes('sleeper') || amenity.toLowerCase().includes('berth')) return <Bed className="w-4 h-4" />;
  if (amenity.toLowerCase().includes('entertainment')) return <AirVent className="w-4 h-4" />;
  return <Star className="w-4 h-4" />;
};

export default function BookBusesPage() {
  const router = useRouter();
  const [buses, setBuses] = useState<BusData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState<Date>();
  const [passengers, setPassengers] = useState("1");
  const [busType, setBusType] = useState("All");
  const [sortBy, setSortBy] = useState("price");
  const [showFilters, setShowFilters] = useState(false);
  
  // Load featured buses on component mount
  useEffect(() => {
    fetchBuses({ featured: 'true' });
  }, []);

  const fetchBuses = async (params: any = {}) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      
      if (params.search) queryParams.append('search', params.search);
      if (params.source) queryParams.append('source', params.source);
      if (params.destination) queryParams.append('destination', params.destination);
      if (params.featured) queryParams.append('featured', params.featured);
      if (params.busType && params.busType !== 'All') queryParams.append('busType', params.busType);

      const response = await fetch(`/api/buses?${queryParams.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        let sortedBuses = data.data;
        
        // Apply sorting
        if (sortBy === 'price') {
          sortedBuses = sortedBuses.sort((a: BusData, b: BusData) => a.basePrice - b.basePrice);
        } else if (sortBy === 'duration') {
          sortedBuses = sortedBuses.sort((a: BusData, b: BusData) => {
            const aDuration = parseInt(a.duration.split('h')[0]);
            const bDuration = parseInt(b.duration.split('h')[0]);
            return aDuration - bDuration;
          });
        } else if (sortBy === 'departure') {
          sortedBuses = sortedBuses.sort((a: BusData, b: BusData) => 
            a.departureTime.localeCompare(b.departureTime)
          );
        }
        
        setBuses(sortedBuses);
      }
    } catch (error) {
      console.error('Error fetching buses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const params: any = {};
    
    if (searchTerm) {
      params.search = searchTerm;
    } else {
      if (source) params.source = source;
      if (destination) params.destination = destination;
    }
    
    if (busType && busType !== 'All') params.busType = busType;
    
    fetchBuses(params);
  };

  const handleBookBus = (bus: BusData) => {
    // Store bus and booking details in localStorage
    const bookingData = {
      bus,
      travelDate,
      passengers: parseInt(passengers),
      busType: bus.busType,
      source: bus.departure,
      destination: bus.arrival
    };
    
    localStorage.setItem('busBookingData', JSON.stringify(bookingData));
    router.push(`/booking/bus/${bus.id}`);
  };

  const getDayNames = (frequency: number[]) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return frequency.map(day => days[day === 7 ? 0 : day]).join(', ');
  };

  const getBusTypeColor = (type: string) => {
    switch (type) {
      case 'Luxury': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Volvo AC': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Sleeper AC': return 'bg-green-100 text-green-800 border-green-200';
      case 'Semi-Sleeper AC': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'AC Seater': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Non-AC Seater': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <Bus className="inline-block w-12 h-12 mr-4 text-orange-600" />
              Book Bus Tickets
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Travel comfortably across Bihar, Odisha, West Bengal, and Jharkhand with our premium bus services. 
              Choose from AC Volvo, Sleeper, and Luxury buses for your perfect journey.
            </p>
            
            {/* Quick Search Suggestions */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="text-sm text-gray-500">Popular routes:</span>
              {[
                'Kolkata → Ranchi',
                'Patna → Jamshedpur', 
                'Bhubaneswar → Dhanbad',
                'Puri → Ranchi',
                'Ranchi → Jamshedpur'
              ].map((route) => {
                const [src, dest] = route.split(' → ');
                return (
                  <button
                    key={route}
                    onClick={() => {
                      setSource(src);
                      setDestination(dest);
                      setTimeout(() => handleSearch(), 100);
                    }}
                    className="text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 px-3 py-1 rounded-full transition-colors"
                  >
                    {route}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Source Station */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter source station"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="pr-8"
                    list="source-suggestions"
                  />
                  <datalist id="source-suggestions">
                    {popularSources.map((city) => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                  {source && (
                    <button
                      onClick={() => setSource('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      type="button"
                    >
                      ×
                    </button>
                  )}
                </div>
                {source && (
                  <div className="mt-1 text-xs text-gray-500">
                    Popular: {popularSources.filter(city => 
                      city.toLowerCase().includes(source.toLowerCase())
                    ).slice(0, 3).join(', ')}
                  </div>
                )}
              </div>

              {/* Destination Station */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pr-8"
                    list="destination-suggestions"
                  />
                  <datalist id="destination-suggestions">
                    {popularDestinations.map((city) => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                  {destination && (
                    <button
                      onClick={() => setDestination('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      type="button"
                    >
                      ×
                    </button>
                  )}
                </div>
                {destination && (
                  <div className="mt-1 text-xs text-gray-500">
                    Popular: {popularDestinations.filter(city => 
                      city.toLowerCase().includes(destination.toLowerCase())
                    ).slice(0, 3).join(', ')}
                  </div>
                )}
              </div>

              {/* Travel Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {travelDate ? format(travelDate, "MMM dd, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={travelDate}
                      onSelect={setTravelDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Passengers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                <Select value={passengers} onValueChange={setPassengers}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advanced Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by bus name, operator, or route..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>

            {/* Bus Type and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Select value={busType} onValueChange={setBusType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bus type" />
                  </SelectTrigger>
                  <SelectContent>
                    {busTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleSearch} 
                size="lg" 
                className="bg-orange-600 hover:bg-orange-700 text-white px-8"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search Buses"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {buses.length > 0 ? `${buses.length} Buses Found` : 'Featured Buses'}
              </h2>
              <p className="text-gray-600">
                {source && destination 
                  ? `${source} to ${destination}` 
                  : 'Popular routes across Bihar, Odisha, West Bengal & Jharkhand'
                }
              </p>
            </div>

            {/* Sort and Filter */}
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <Select value={sortBy} onValueChange={(value) => {
                setSortBy(value);
                handleSearch();
              }}>
                <SelectTrigger className="w-40">
                  <SortAsc className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Sort by Price</SelectItem>
                  <SelectItem value="duration">Sort by Duration</SelectItem>
                  <SelectItem value="departure">Sort by Departure</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Bus Results */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {buses.map((bus) => (
                <Card key={bus.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Bus Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <Bus className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">
                              {bus.busName}
                            </h3>
                            <p className="text-gray-600">{bus.operator}</p>
                          </div>
                          {bus.isFeatured && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              Featured
                            </Badge>
                          )}
                          <Badge variant="outline" className={`${getBusTypeColor(bus.busType)}`}>
                            {bus.busType}
                          </Badge>
                        </div>

                        {/* Route Info */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">
                              {bus.departureTime}
                            </p>
                            <p className="text-sm text-gray-600">{bus.departure}</p>
                          </div>
                          
                          <div className="flex-1 text-center">
                            <div className="flex items-center justify-center mb-1">
                              <div className="h-px bg-gray-300 flex-1"></div>
                              <ArrowRight className="w-5 h-5 mx-2 text-gray-400" />
                              <div className="h-px bg-gray-300 flex-1"></div>
                            </div>
                            <p className="text-sm text-gray-600">{bus.duration}</p>
                            <p className="text-xs text-gray-500">{bus.distance} km</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">
                              {bus.arrivalTime}
                            </p>
                            <p className="text-sm text-gray-600">{bus.arrival}</p>
                          </div>
                        </div>

                        {/* Frequency */}
                        <div className="mb-4">
                          <p className="text-sm text-gray-600">
                            <Clock className="inline w-4 h-4 mr-1" />
                            Runs: {getDayNames(bus.frequency)}
                          </p>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2">
                          {bus.amenities.slice(0, 4).map((amenity, index) => (
                            <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                              {getAmenityIcon(amenity)}
                              <span>{amenity}</span>
                            </div>
                          ))}
                          {bus.amenities.length > 4 && (
                            <div className="text-xs text-gray-500 px-2 py-1">
                              +{bus.amenities.length - 4} more
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Boarding/Dropping Points */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Boarding & Dropping</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <p className="font-medium text-green-600">Boarding Points</p>
                            {bus.boardingPoints.slice(0, 2).map((point, index) => (
                              <p key={index} className="text-gray-600">{point.location} • {point.time}</p>
                            ))}
                          </div>
                          <div>
                            <p className="font-medium text-red-600">Dropping Points</p>
                            {bus.droppingPoints.slice(0, 2).map((point, index) => (
                              <p key={index} className="text-gray-600">{point.location} • {point.time}</p>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-600">
                            <Users className="inline w-4 h-4 mr-1" />
                            {bus.availableSeats} seats available
                          </p>
                        </div>
                      </div>

                      {/* Book Button */}
                      <div className="flex flex-col justify-between">
                        <div className="text-right mb-4">
                          <p className="text-sm text-gray-600">Starting from</p>
                          <p className="text-2xl font-bold text-green-600">
                            ₹{bus.basePrice}
                          </p>
                        </div>
                        
                        <Button
                          onClick={() => handleBookBus(bus)}
                          className="bg-orange-600 hover:bg-orange-700 text-white w-full"
                          size="lg"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {buses.length === 0 && !loading && (
                <div className="text-center py-12">
                  <Bus className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No buses found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or browse our featured buses.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSource("");
                      setDestination("");
                      fetchBuses({ featured: 'true' });
                    }}
                    variant="outline"
                  >
                    View Featured Buses
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
