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
  Train, 
  Clock, 
  MapPin, 
  Users, 
  CalendarIcon,
  ArrowRight,
  Star,
  Wifi,
  Coffee,
  Zap,
  Car,
  Filter,
  SortAsc
} from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface TrainData {
  id: string;
  trainNumber: string;
  trainName: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distance: number;
  frequency: number[];
  trainType: string;
  classes: string[];
  basePrice: number;
  priceMultiplier: { [key: string]: number };
  totalSeats: number;
  availableSeats: number;
  route: string[];
  amenities: string[];
  isActive: boolean;
  isFeatured: boolean;
}

const trainClasses = [
  { value: 'SL', label: 'Sleeper (SL)', description: 'Non-AC sleeper with side berths' },
  { value: '3A', label: '3rd AC (3A)', description: 'AC 3-tier with bedding' },
  { value: '2A', label: '2nd AC (2A)', description: 'AC 2-tier with bedding' },
  { value: '1A', label: '1st AC (1A)', description: 'Premium AC with meals' },
  { value: 'CC', label: 'Chair Car (CC)', description: 'AC seating only' },
  { value: 'EC', label: 'Executive Chair Car (EC)', description: 'Premium AC seating' }
];

const popularDestinations = [
  'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro Steel City', 'Deoghar', 'Dumka', 'Hazaribagh', 'Chaibasa', 'Giridih', 'Lohardaga', 'Medininagar', 'Daltonganj'
];

const popularSources = [
  'New Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Howrah', 'Patna', 'Lucknow', 'Bhubaneswar', 'Puri', 'Cuttack', 'Berhampur', 'Rourkela', 'Sambalpur'
];

const getAmenityIcon = (amenity: string) => {
  if (amenity.toLowerCase().includes('wifi')) return <Wifi className="w-4 h-4" />;
  if (amenity.toLowerCase().includes('pantry') || amenity.toLowerCase().includes('catering')) return <Coffee className="w-4 h-4" />;
  if (amenity.toLowerCase().includes('charging')) return <Zap className="w-4 h-4" />;
  if (amenity.toLowerCase().includes('ac')) return <Car className="w-4 h-4" />;
  return <Star className="w-4 h-4" />;
};

export default function BookTrainsPage() {
  const router = useRouter();
  const [trains, setTrains] = useState<TrainData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState<Date>();
  const [passengers, setPassengers] = useState("1");
  const [trainClass, setTrainClass] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [showFilters, setShowFilters] = useState(false);
  
  // Load featured trains on component mount
  useEffect(() => {
    fetchTrains({ featured: 'true' });
  }, []);

  const fetchTrains = async (params: any = {}) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      
      if (params.search) queryParams.append('search', params.search);
      if (params.source) queryParams.append('source', params.source);
      if (params.destination) queryParams.append('destination', params.destination);
      if (params.featured) queryParams.append('featured', params.featured);

      const response = await fetch(`/api/trains?${queryParams.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        let sortedTrains = data.data;
        
        // Apply sorting
        if (sortBy === 'price') {
          sortedTrains = sortedTrains.sort((a: TrainData, b: TrainData) => a.basePrice - b.basePrice);
        } else if (sortBy === 'duration') {
          sortedTrains = sortedTrains.sort((a: TrainData, b: TrainData) => {
            const aDuration = parseInt(a.duration.split('h')[0]);
            const bDuration = parseInt(b.duration.split('h')[0]);
            return aDuration - bDuration;
          });
        } else if (sortBy === 'departure') {
          sortedTrains = sortedTrains.sort((a: TrainData, b: TrainData) => 
            a.departureTime.localeCompare(b.departureTime)
          );
        }
        
        setTrains(sortedTrains);
      }
    } catch (error) {
      console.error('Error fetching trains:', error);
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
    
    fetchTrains(params);
  };

  const handleBookTrain = (train: TrainData) => {
    // Store train and booking details in localStorage
    const bookingData = {
      train,
      travelDate,
      passengers: parseInt(passengers),
      trainClass: trainClass || 'SL',
      source: train.departure,
      destination: train.arrival
    };
    
    localStorage.setItem('trainBookingData', JSON.stringify(bookingData));
    router.push(`/booking/train/${train.id}`);
  };

  const calculatePrice = (train: TrainData, selectedClass: string) => {
    const classMultiplier = train.priceMultiplier[selectedClass] || 1;
    return Math.round(train.basePrice * classMultiplier);
  };

  const getDayNames = (frequency: number[]) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return frequency.map(day => days[day === 7 ? 0 : day]).join(', ');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <Train className="inline-block w-12 h-12 mr-4 text-blue-600" />
              Book Train Tickets to Jharkhand
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover 115+ trains connecting major cities across India to Jharkhand's beautiful destinations. 
              Including trains from Odisha, intra-Jharkhand routes, and major Indian cities.
            </p>
            
            {/* Quick Search Suggestions */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="text-sm text-gray-500">Popular routes:</span>
              {[
                'Puri → Ranchi',
                'Bhubaneswar → Jamshedpur', 
                'Delhi → Dhanbad',
                'Mumbai → Bokaro',
                'Ranchi → Deoghar'
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
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full transition-colors"
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
                    placeholder="Enter source station (e.g., New Delhi, Mumbai, Puri...)"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="pr-8"
                    list="source-suggestions"
                  />
                  {source && (
                    <button
                      onClick={() => setSource('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      type="button"
                    >
                      ×
                    </button>
                  )}
                  <datalist id="source-suggestions">
                    {popularSources.map((city) => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
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
                    placeholder="Enter destination (e.g., Ranchi, Jamshedpur, Dhanbad...)"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pr-8"
                    list="destination-suggestions"
                  />
                  {destination && (
                    <button
                      onClick={() => setDestination('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      type="button"
                    >
                      ×
                    </button>
                  )}
                  <datalist id="destination-suggestions">
                    {popularDestinations.map((city) => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
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
                  placeholder="Search by train name, number, or station..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>

            {/* Class and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Select value={trainClass} onValueChange={setTrainClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {trainClasses.map((cls) => (
                      <SelectItem key={cls.value} value={cls.value}>
                        <div>
                          <div className="font-medium">{cls.label}</div>
                          <div className="text-xs text-gray-500">{cls.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleSearch} 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search Trains"}
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
                {trains.length > 0 ? `${trains.length} Trains Found` : 'Featured Trains to Jharkhand'}
              </h2>
              <p className="text-gray-600">
                {source && destination 
                  ? `${source} to ${destination}` 
                  : 'Popular routes from major cities'
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

          {/* Train Results */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {trains.map((train) => (
                <Card key={train.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Train Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Train className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">
                              {train.trainName}
                            </h3>
                            <p className="text-gray-600">#{train.trainNumber}</p>
                          </div>
                          {train.isFeatured && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              Featured
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-blue-600 border-blue-200">
                            {train.trainType}
                          </Badge>
                        </div>

                        {/* Route Info */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">
                              {train.departureTime}
                            </p>
                            <p className="text-sm text-gray-600">{train.departure}</p>
                          </div>
                          
                          <div className="flex-1 text-center">
                            <div className="flex items-center justify-center mb-1">
                              <div className="h-px bg-gray-300 flex-1"></div>
                              <ArrowRight className="w-5 h-5 mx-2 text-gray-400" />
                              <div className="h-px bg-gray-300 flex-1"></div>
                            </div>
                            <p className="text-sm text-gray-600">{train.duration}</p>
                            <p className="text-xs text-gray-500">{train.distance} km</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">
                              {train.arrivalTime}
                            </p>
                            <p className="text-sm text-gray-600">{train.arrival}</p>
                          </div>
                        </div>

                        {/* Frequency */}
                        <div className="mb-4">
                          <p className="text-sm text-gray-600">
                            <Clock className="inline w-4 h-4 mr-1" />
                            Runs: {getDayNames(train.frequency)}
                          </p>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2">
                          {train.amenities.slice(0, 4).map((amenity, index) => (
                            <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                              {getAmenityIcon(amenity)}
                              <span>{amenity}</span>
                            </div>
                          ))}
                          {train.amenities.length > 4 && (
                            <div className="text-xs text-gray-500 px-2 py-1">
                              +{train.amenities.length - 4} more
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Classes and Pricing */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Available Classes</h4>
                        <div className="space-y-2">
                          {train.classes.map((cls) => (
                            <div key={cls} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm font-medium">{cls}</span>
                              <span className="font-bold text-green-600">
                                ₹{calculatePrice(train, cls)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-600">
                            <Users className="inline w-4 h-4 mr-1" />
                            {train.availableSeats} seats available
                          </p>
                        </div>
                      </div>

                      {/* Book Button */}
                      <div className="flex flex-col justify-between">
                        <div className="text-right mb-4">
                          <p className="text-sm text-gray-600">Starting from</p>
                          <p className="text-2xl font-bold text-green-600">
                            ₹{train.basePrice}
                          </p>
                        </div>
                        
                        <Button
                          onClick={() => handleBookTrain(train)}
                          className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                          size="lg"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {trains.length === 0 && !loading && (
                <div className="text-center py-12">
                  <Train className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No trains found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or browse our featured trains.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSource("");
                      setDestination("");
                      fetchTrains({ featured: 'true' });
                    }}
                    variant="outline"
                  >
                    View Featured Trains
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
