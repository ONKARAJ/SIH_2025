"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Bus,
  Train,
  Plane,
  Search,
  Filter,
  ArrowRight,
  Download,
  Phone,
  Mail,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";

interface Booking {
  id: number;
  type: string;
  busId?: string;
  trainId?: string;
  busName?: string;
  trainName?: string;
  tourName?: string;
  operator?: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  travelDate: Date;
  passengers: Array<{
    name: string;
    age: string;
    gender: string;
  }>;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  selectedBoardingPoint?: string;
  selectedDroppingPoint?: string;
  selectedSeats: string[];
  totalPrice: number;
  bookingDate: Date;
  status: 'Confirmed' | 'Cancelled' | 'Completed' | 'Pending';
}

export default function ProfileBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Load bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    setBookings(storedBookings);
    setFilteredBookings(storedBookings);
  }, []);

  useEffect(() => {
    // Filter bookings based on search term, status, and tab
    let filtered = bookings;

    // Filter by tab (booking type)
    if (activeTab !== "all") {
      filtered = filtered.filter(booking => booking.type === activeTab);
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter(booking => 
        booking.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.busName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.trainName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.tourName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.operator?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, filterStatus, activeTab]);

  const getBookingIcon = (type: string) => {
    switch (type) {
      case 'bus': return <Bus className="w-5 h-5" />;
      case 'train': return <Train className="w-5 h-5" />;
      case 'flight': return <Plane className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'Completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getBookingTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'bus': return 'bg-orange-100 text-orange-800';
      case 'train': return 'bg-blue-100 text-blue-800';
      case 'flight': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadTicket = (booking: Booking) => {
    // In a real app, this would generate and download a PDF
    alert(`Downloading ticket for ${booking.busName || booking.trainName || booking.tourName}`);
  };

  const handleCancelBooking = (bookingId: number) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      const updatedBookings = bookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'Cancelled' as const }
          : booking
      );
      setBookings(updatedBookings);
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
    }
  };

  const getTabCount = (type: string) => {
    if (type === "all") return bookings.length;
    return bookings.filter(booking => booking.type === type).length;
  };

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No bookings yet
            </h2>
            <p className="text-gray-600 mb-8">
              Start exploring Jharkhand and make your first booking!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push('/book-buses')}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Bus className="w-4 h-4 mr-2" />
                Book Bus Tickets
              </Button>
              <Button
                onClick={() => router.push('/book-tour')}
                variant="outline"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Cultural Tour
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage and track all your travel bookings</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search bookings by route, operator, or service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-background"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                    setActiveTab("all");
                  }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for booking types */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All ({getTabCount("all")})
            </TabsTrigger>
            <TabsTrigger value="bus">
              Buses ({getTabCount("bus")})
            </TabsTrigger>
            <TabsTrigger value="train">
              Trains ({getTabCount("train")})
            </TabsTrigger>
            <TabsTrigger value="tour">
              Tours ({getTabCount("tour")})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredBookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No bookings found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredBookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                            {getBookingIcon(booking.type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {booking.busName || booking.trainName || booking.tourName}
                            </CardTitle>
                            <p className="text-sm text-gray-600">{booking.operator}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className={getBookingTypeBadgeColor(booking.type)}>
                                {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}
                              </Badge>
                              <Badge variant="outline" className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Booking #{booking.id}</p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(booking.bookingDate), "MMM dd, yyyy")}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Journey Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Journey Details</h4>
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold">{booking.departureTime}</p>
                              <p className="text-sm text-gray-600">Departure</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                            <div className="text-right">
                              <p className="font-semibold">{booking.arrivalTime}</p>
                              <p className="text-sm text-gray-600">Arrival</p>
                            </div>
                          </div>
                          <div className="text-center">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              {booking.route}
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Travel Information</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3 text-gray-600" />
                              <span>{format(new Date(booking.travelDate), "EEEE, MMM dd, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-3 h-3 text-gray-600" />
                              <span>{booking.passengers.length} Passengers</span>
                            </div>
                            {booking.selectedBoardingPoint && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-gray-600" />
                                <span>From: {booking.selectedBoardingPoint}</span>
                              </div>
                            )}
                            {booking.selectedDroppingPoint && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-gray-600" />
                                <span>To: {booking.selectedDroppingPoint}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Passengers and Seats */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Passengers & Seats</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {booking.passengers.map((passenger, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <div>
                                <p className="font-medium text-sm">{passenger.name}</p>
                                <p className="text-xs text-gray-600">
                                  {passenger.age} years • {passenger.gender}
                                </p>
                              </div>
                              {booking.selectedSeats[index] && (
                                <Badge variant="outline" className="text-xs">
                                  Seat {booking.selectedSeats[index]}
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Actions and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadTicket(booking)}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          {booking.status === 'Confirmed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Cancel Booking
                            </Button>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-green-600">
                            ₹{booking.totalPrice}
                          </p>
                          <p className="text-xs text-gray-500">Total Paid</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Support Section */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
                <p className="text-sm text-blue-800 mb-3">
                  Our customer support team is here to help with your bookings, cancellations, or any questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 text-sm">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    +91 98765 43210
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    support@jharkhandtourism.com
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
