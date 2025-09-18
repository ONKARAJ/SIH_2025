"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Download,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  Bus,
  Train,
  Clock,
  ArrowRight,
  Home,
  FileText
} from "lucide-react";
import { format } from "date-fns";

interface BookingDetails {
  id: number;
  type: string;
  busId?: string;
  trainId?: string;
  busName?: string;
  trainName?: string;
  operator?: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  travelDate: Date;
  passengers: any[];
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
  status: string;
}

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingType = searchParams.get('type') || 'bus';
  const [latestBooking, setLatestBooking] = useState<BookingDetails | null>(null);

  useEffect(() => {
    // Get the latest booking from localStorage
    const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    if (bookings.length > 0) {
      const latest = bookings[bookings.length - 1];
      setLatestBooking(latest);
    }

    // Clear the booking data from localStorage
    localStorage.removeItem('busBookingData');
    localStorage.removeItem('trainBookingData');
  }, []);

  const handleDownloadTicket = () => {
    // In a real application, this would generate and download a PDF ticket
    alert('Ticket download will be available in the full version. Check your email for booking confirmation.');
  };

  const getBookingIcon = () => {
    return bookingType === 'bus' ? <Bus className="w-8 h-8" /> : <Train className="w-8 h-8" />;
  };

  const getServiceName = () => {
    return bookingType === 'bus' ? 'Bus' : 'Train';
  };

  if (!latestBooking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p>Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Your {getServiceName().toLowerCase()} ticket has been successfully booked
          </p>
          <p className="text-sm text-gray-500">
            Booking ID: <span className="font-mono font-semibold">#{latestBooking.id}</span>
          </p>
        </div>

        {/* Booking Details Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                {getBookingIcon()}
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {latestBooking.busName || latestBooking.trainName}
                </h2>
                <p className="text-sm text-gray-600">{latestBooking.operator}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Journey Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Journey Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg">{latestBooking.departureTime}</p>
                      <p className="text-sm text-gray-600">Departure</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <div className="text-right">
                      <p className="font-semibold text-lg">{latestBooking.arrivalTime}</p>
                      <p className="text-sm text-gray-600">Arrival</p>
                    </div>
                  </div>
                  <div className="text-center py-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {latestBooking.route}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Travel Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">
                      {format(new Date(latestBooking.travelDate), "EEEE, MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">
                      {latestBooking.passengers.length} {latestBooking.passengers.length === 1 ? 'Passenger' : 'Passengers'}
                    </span>
                  </div>
                  {latestBooking.selectedBoardingPoint && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">Boarding: {latestBooking.selectedBoardingPoint}</span>
                    </div>
                  )}
                  {latestBooking.selectedDroppingPoint && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">Dropping: {latestBooking.selectedDroppingPoint}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Passenger Details */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Passenger Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {latestBooking.passengers.map((passenger, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{passenger.name}</p>
                        <p className="text-sm text-gray-600">
                          {passenger.age} years • {passenger.gender}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                        Seat {latestBooking.selectedSeats[index]}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Contact Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{latestBooking.contactInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{latestBooking.contactInfo.phone}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Amount</span>
                    <span className="font-semibold text-green-600">₹{latestBooking.totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment Status</span>
                    <Badge className="bg-green-100 text-green-800 text-xs">Paid</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Booking Date</span>
                    <span>{format(new Date(latestBooking.bookingDate), "MMM dd, yyyy HH:mm")}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="mb-6 border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-orange-900 mb-3">Important Information</h3>
            <div className="text-sm text-orange-800 space-y-2">
              <p>• Please carry a valid ID proof during your journey</p>
              <p>• Reach the boarding point at least 15 minutes before departure</p>
              <p>• Keep your ticket/booking confirmation handy</p>
              <p>• Contact customer support for any changes or cancellations</p>
              {bookingType === 'bus' && (
                <p>• Bus timings may vary due to traffic conditions</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleDownloadTicket}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download className="w-4 h-4" />
            Download Ticket
          </Button>
          
          <Button
            onClick={() => router.push('/profile/bookings')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            View All Bookings
          </Button>
          
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        {/* Support Information */}
        <div className="text-center mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            Need help? Contact our customer support
          </p>
          <div className="flex justify-center gap-4 text-sm">
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
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p>Loading booking details...</p>
        </div>
      </div>
    }>
      <BookingSuccessContent />
    </Suspense>
  );
}
