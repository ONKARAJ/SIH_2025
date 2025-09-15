"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Train, 
  Plane, 
  Hotel, 
  Download,
  Home,
  Calendar,
  User,
  Phone,
  Mail,
  CreditCard
} from "lucide-react";

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [bookingData, setBookingData] = useState<any>(null);
  const bookingType = searchParams.get('type');
  const paymentId = searchParams.get('payment_id');

  useEffect(() => {
    // Load booking data based on type
    if (bookingType === 'train') {
      const storedData = localStorage.getItem('trainBookingPayload');
      if (storedData) {
        setBookingData({ ...JSON.parse(storedData), type: 'train' });
      }
    } else if (bookingType === 'hotel') {
      // Load hotel booking data if needed
    } else if (bookingType === 'flight') {
      // Load flight booking data if needed
    }
  }, [bookingType]);

  const getBookingIcon = () => {
    switch (bookingType) {
      case 'train': return <Train className="w-8 h-8 text-blue-600" />;
      case 'flight': return <Plane className="w-8 h-8 text-blue-600" />;
      case 'hotel': return <Hotel className="w-8 h-8 text-purple-600" />;
      default: return <CheckCircle className="w-8 h-8 text-green-600" />;
    }
  };

  const getBookingTitle = () => {
    switch (bookingType) {
      case 'train': return 'Train Booking';
      case 'flight': return 'Flight Booking';
      case 'hotel': return 'Hotel Booking';
      default: return 'Booking';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Success Header */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <CheckCircle className="w-16 h-16" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Booking Confirmed!</h1>
              <p className="text-green-100 text-lg">Your {getBookingTitle().toLowerCase()} has been successfully booked</p>
            </div>
          </div>
          
          {paymentId && (
            <div className="bg-green-700 inline-block px-4 py-2 rounded-full">
              <p className="text-sm">Payment ID: {paymentId}</p>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Booking Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {getBookingIcon()}
                  {getBookingTitle()} Confirmation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {bookingData && bookingType === 'train' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-3">Train Journey Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-blue-700"><strong>From:</strong> {bookingData.departureStation}</p>
                          <p className="text-blue-700"><strong>To:</strong> {bookingData.arrivalStation}</p>
                          <p className="text-blue-700"><strong>Travel Date:</strong> {
                            bookingData.travelDate 
                              ? new Date(bookingData.travelDate).toLocaleDateString('en-IN', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric'
                                })
                              : 'Not specified'
                          }</p>
                        </div>
                        <div>
                          <p className="text-blue-700"><strong>Class:</strong> {bookingData.class}</p>
                          <p className="text-blue-700"><strong>Passengers:</strong> {bookingData.passengers?.length || 0}</p>
                          {bookingData.mealPreference && (
                            <p className="text-blue-700"><strong>Meal:</strong> {bookingData.mealPreference}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Passenger Details */}
                    <div>
                      <h4 className="font-semibold mb-3">Passenger Details</h4>
                      <div className="space-y-2">
                        {bookingData.passengers?.map((passenger: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">{passenger.name}</p>
                                <p className="text-sm text-gray-600">{passenger.age} years, {passenger.gender}</p>
                              </div>
                            </div>
                            <Badge variant="outline">{passenger.berth || 'No preference'}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                {bookingData && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{bookingData.contactEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{bookingData.contactPhone}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Special Requests */}
                {bookingData?.specialRequests && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Special Requests</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {bookingData.specialRequests}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary & Actions */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bookingData?.pricing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base Fare</span>
                      <span>₹{bookingData.pricing.baseAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Convenience Fee</span>
                      <span>₹{bookingData.pricing.convenienceFee}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>GST</span>
                      <span>₹{bookingData.pricing.gst}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Paid</span>
                        <span className="text-green-600">₹{bookingData.pricing.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800 text-center">
                    ✅ Payment completed successfully
                  </p>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      // In a real app, this would download the actual ticket
                      alert('Download ticket functionality would be implemented here');
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download E-Ticket
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.push('/')}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• E-ticket sent to your email</p>
                  <p>• Carry valid ID proof during travel</p>
                  <p>• Check cancellation policy for refunds</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <section className="bg-yellow-50 border-t border-yellow-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-yellow-800 mb-4">Important Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-yellow-700">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Travel Date</p>
                  <p>Please arrive 30 minutes before departure</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">ID Requirements</p>
                  <p>Carry original photo ID proof during travel</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Support</p>
                  <p>Contact us for any assistance needed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <BookingSuccessContent />
    </Suspense>
  );
}
