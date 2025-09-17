"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Bus, 
  Clock, 
  MapPin, 
  Users, 
  CreditCard,
  ArrowRight,
  Star,
  Wifi,
  Snowflake,
  Zap,
  Coffee,
  Bed,
  CheckCircle,
  User,
  Phone,
  Mail,
  Calendar
} from "lucide-react";
import { format } from "date-fns";

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
  busType: string;
  totalSeats: number;
  availableSeats: number;
  basePrice: number;
  route: string[];
  amenities: string[];
  boardingPoints: { location: string; time: string }[];
  droppingPoints: { location: string; time: string }[];
}

interface BookingData {
  bus: BusData;
  travelDate: Date;
  passengers: number;
  busType: string;
  source: string;
  destination: string;
}

interface PassengerInfo {
  name: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other';
  seatNumber?: string;
}

export default function BusBookingPage() {
  const params = useParams();
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [passengers, setPassengers] = useState<PassengerInfo[]>([]);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState('');
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    // Load booking data from localStorage
    const storedData = localStorage.getItem('busBookingData');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setBookingData(parsed);
      
      // Initialize passengers array
      const passengerArray = Array.from({ length: parsed.passengers }, (_, index) => ({
        name: '',
        age: '',
        gender: 'Male' as const,
        seatNumber: ''
      }));
      setPassengers(passengerArray);
      
      // Initialize seat selection
      const seatNumbers = Array.from({ length: parsed.passengers }, (_, index) => `A${index + 1}`);
      setSelectedSeats(seatNumbers);
      
      // Set default boarding and dropping points
      if (parsed.bus.boardingPoints.length > 0) {
        setSelectedBoardingPoint(parsed.bus.boardingPoints[0].location);
      }
      if (parsed.bus.droppingPoints.length > 0) {
        setSelectedDroppingPoint(parsed.bus.droppingPoints[0].location);
      }
    }
  }, []);

  const updatePassenger = (index: number, field: keyof PassengerInfo, value: string) => {
    setPassengers(prev => prev.map((passenger, i) => 
      i === index ? { ...passenger, [field]: value } : passenger
    ));
  };

  const getTotalPrice = () => {
    if (!bookingData) return 0;
    return bookingData.bus.basePrice * bookingData.passengers;
  };

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wifi')) return <Wifi className="w-4 h-4" />;
    if (amenity.toLowerCase().includes('ac') || amenity.toLowerCase().includes('luxury')) return <Snowflake className="w-4 h-4" />;
    if (amenity.toLowerCase().includes('charging')) return <Zap className="w-4 h-4" />;
    if (amenity.toLowerCase().includes('meals') || amenity.toLowerCase().includes('snacks')) return <Coffee className="w-4 h-4" />;
    if (amenity.toLowerCase().includes('sleeper') || amenity.toLowerCase().includes('berth')) return <Bed className="w-4 h-4" />;
    return <Star className="w-4 h-4" />;
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

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBooking = () => {
    // Create booking object
    const booking = {
      busId: bookingData?.bus.id,
      busName: bookingData?.bus.busName,
      operator: bookingData?.bus.operator,
      route: `${bookingData?.bus.departure} → ${bookingData?.bus.arrival}`,
      departureTime: bookingData?.bus.departureTime,
      arrivalTime: bookingData?.bus.arrivalTime,
      travelDate: bookingData?.travelDate,
      passengers,
      contactInfo,
      selectedBoardingPoint,
      selectedDroppingPoint,
      selectedSeats,
      totalPrice: getTotalPrice(),
      bookingDate: new Date(),
      status: 'Confirmed'
    };

    // Store booking in localStorage (in a real app, this would be sent to backend)
    const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    existingBookings.push({ ...booking, id: Date.now(), type: 'bus' });
    localStorage.setItem('userBookings', JSON.stringify(existingBookings));

    // Redirect to payment or success page
    router.push('/booking/success?type=bus');
  };

  if (!bookingData) {
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            <Bus className="inline-block w-8 h-8 mr-3 text-orange-600" />
            Complete Your Bus Booking
          </h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                </div>
                <div className="ml-3 mr-8">
                  <p className={`font-medium ${currentStep >= step ? 'text-orange-600' : 'text-gray-500'}`}>
                    {step === 1 ? 'Passenger Details' : step === 2 ? 'Travel Info' : 'Payment'}
                  </p>
                </div>
                {step < 3 && <div className="w-16 h-px bg-gray-300 mr-8" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Passenger Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {passengers.map((passenger, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Passenger {index + 1} - Seat {selectedSeats[index]}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <Input
                            value={passenger.name}
                            onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                            placeholder="Enter full name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Age *
                          </label>
                          <Input
                            type="number"
                            value={passenger.age}
                            onChange={(e) => updatePassenger(index, 'age', e.target.value)}
                            placeholder="Age"
                            min="1"
                            max="100"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gender *
                          </label>
                          <select
                            value={passenger.gender}
                            onChange={(e) => updatePassenger(index, 'gender', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Contact Information */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Name *
                        </label>
                        <Input
                          value={contactInfo.name}
                          onChange={(e) => setContactInfo(prev => ({...prev, name: e.target.value}))}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <Input
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo(prev => ({...prev, email: e.target.value}))}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone *
                        </label>
                        <Input
                          type="tel"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo(prev => ({...prev, phone: e.target.value}))}
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Travel Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Boarding Point *
                      </label>
                      <select
                        value={selectedBoardingPoint}
                        onChange={(e) => setSelectedBoardingPoint(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      >
                        {bookingData.bus.boardingPoints.map((point) => (
                          <option key={point.location} value={point.location}>
                            {point.location} - {point.time}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dropping Point *
                      </label>
                      <select
                        value={selectedDroppingPoint}
                        onChange={(e) => setSelectedDroppingPoint(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      >
                        {bookingData.bus.droppingPoints.map((point) => (
                          <option key={point.location} value={point.location}>
                            {point.location} - {point.time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Seat Selection Display */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Selected Seats</h3>
                    <div className="flex gap-2 flex-wrap">
                      {selectedSeats.map((seat, index) => (
                        <Badge key={seat} variant="outline" className="bg-green-100 text-green-800">
                          Seat {seat} - {passengers[index]?.name || `Passenger ${index + 1}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600 mb-4">
                      Complete your payment to confirm your bus booking.
                    </p>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-900 mb-2">Payment Methods</h3>
                      <div className="space-y-2 text-sm text-blue-800">
                        <p>• UPI (Google Pay, PhonePe, Paytm)</p>
                        <p>• Credit/Debit Cards</p>
                        <p>• Net Banking</p>
                        <p>• Mobile Wallets</p>
                      </div>
                    </div>

                    <Button
                      onClick={handleBooking}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                      size="lg"
                    >
                      Pay ₹{getTotalPrice()} & Confirm Booking
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      By proceeding, you agree to our terms and conditions and privacy policy.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                onClick={handleBack}
                variant="outline"
                disabled={currentStep === 1}
                className="px-6"
              >
                Back
              </Button>
              {currentStep < 3 && (
                <Button
                  onClick={handleNext}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6"
                >
                  Next
                </Button>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Bus Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Bus className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{bookingData.bus.busName}</h3>
                      <p className="text-xs text-gray-600">{bookingData.bus.operator}</p>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className={`${getBusTypeColor(bookingData.bus.busType)} text-xs`}>
                    {bookingData.bus.busType}
                  </Badge>
                </div>

                <Separator />

                {/* Route Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg">{bookingData.bus.departureTime}</p>
                      <p className="text-sm text-gray-600">{bookingData.bus.departure}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <div className="text-right">
                      <p className="font-semibold text-lg">{bookingData.bus.arrivalTime}</p>
                      <p className="text-sm text-gray-600">{bookingData.bus.arrival}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{bookingData.bus.duration}</p>
                    <p className="text-xs text-gray-500">{bookingData.bus.distance} km</p>
                  </div>
                </div>

                <Separator />

                {/* Travel Date */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">
                    {bookingData.travelDate && format(new Date(bookingData.travelDate), "MMM dd, yyyy")}
                  </span>
                </div>

                {/* Passengers */}
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">
                    {bookingData.passengers} {bookingData.passengers === 1 ? 'Passenger' : 'Passengers'}
                  </span>
                </div>

                <Separator />

                {/* Amenities */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-1">
                    {bookingData.bus.amenities.slice(0, 4).map((amenity, index) => (
                      <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Base Price × {bookingData.passengers}</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span className="text-green-600">₹{getTotalPrice()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
