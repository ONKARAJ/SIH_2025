"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, Users, Search } from "lucide-react";
import { useState, useEffect } from "react";

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  aircraft: string;
}

export default function FlightsBookingPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    departure: "",
    arrival: "",
    departureDate: "",
    passengers: "1",
    maxPrice: ""
  });

  const cities = [
    "Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", 
    "Hyderabad", "Pune", "Ahmedabad", "Guwahati", "Patna",
    "Ranchi", "Deoghar", "Jamshedpur", "Dhanbad", "Bokaro", 
    "Hazaribagh", "Giridih", "Latehar"
  ];

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      Object.entries(searchFilters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`/api/flights?${queryParams}`);
      const data = await response.json();
      
      if (data.success) {
        setFlights(data.flights);
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleSearch = () => {
    fetchFlights();
  };

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateTime: string) => {
    return new Date(dateTime).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Book Flights to Jharkhand
          </h1>
          <p className="text-lg text-muted-foreground">
            Find and book the best flights to explore the beauty of Jharkhand
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Flights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  From
                </label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={searchFilters.departure}
                  onChange={(e) => setSearchFilters({...searchFilters, departure: e.target.value})}
                >
                  <option value="">Select departure city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  To
                </label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={searchFilters.arrival}
                  onChange={(e) => setSearchFilters({...searchFilters, arrival: e.target.value})}
                >
                  <option value="">Select arrival city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Departure Date
                </label>
                <Input
                  type="date"
                  value={searchFilters.departureDate}
                  onChange={(e) => setSearchFilters({...searchFilters, departureDate: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Passengers
                </label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={searchFilters.passengers}
                  onChange={(e) => setSearchFilters({...searchFilters, passengers: e.target.value})}
                >
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4+ Passengers</option>
                </select>
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
                Search Flights
              </Button>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-muted-foreground">Loading flights...</div>
          </div>
        ) : (
          <div className="space-y-4">
            {flights.map((flight) => (
              <Card key={flight.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Plane className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-foreground">
                            {flight.airline}
                          </span>
                        </div>
                        <Badge variant="outline">{flight.flightNumber}</Badge>
                        {flight.aircraft && (
                          <Badge variant="secondary">{flight.aircraft}</Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 items-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">
                            {formatTime(flight.departureTime)}
                          </div>
                          <div className="text-sm font-semibold text-foreground">
                            {flight.departure}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(flight.departureTime)}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <div className="h-px bg-border flex-1"></div>
                            <Clock className="h-4 w-4 mx-2 text-muted-foreground" />
                            <div className="h-px bg-border flex-1"></div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {flight.duration}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">
                            {formatTime(flight.arrivalTime)}
                          </div>
                          <div className="text-sm font-semibold text-foreground">
                            {flight.arrival}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(flight.arrivalTime)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:w-64 text-center lg:text-right">
                      <div className="text-3xl font-bold text-foreground mb-2">
                        ₹{flight.price.toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm text-muted-foreground mb-3 flex items-center justify-center lg:justify-end gap-1">
                        <Users className="h-4 w-4" />
                        {flight.availableSeats} seats left
                      </div>
                      <Button className="w-full lg:w-auto px-8">
                        Select Flight
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && flights.length === 0 && (
          <div className="text-center py-12">
            <div className="text-lg text-muted-foreground mb-4">
              No flights found matching your criteria
            </div>
            <Button variant="outline" onClick={() => {
              setSearchFilters({
                departure: "",
                arrival: "",
                departureDate: "",
                passengers: "1",
                maxPrice: ""
              });
              fetchFlights();
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
