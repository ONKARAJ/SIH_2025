"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Train, 
  Clock, 
  MapPin, 
  Users, 
  CreditCard,
  ArrowRight,
  User,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { format } from "date-fns";

interface TrainBookingData {
  train: {
    id: string;
    trainNumber: string;
    trainName: string;
    departure: string;
    arrival: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    trainType: string;
    classes: string[];
    basePrice: number;
    priceMultiplier: { [key: string]: number };
  };
  travelDate: Date;
  passengers: number;
  trainClass: string;
  source: string;
  destination: string;
}

interface PassengerInfo {
  name: string;
  age: string;
  gender: string;
  berth: string;
}

export default function TrainBookingPage() {
  const params = useParams();
  const router = useRouter();
  const [bookingData, setBookingData] = useState<TrainBookingData | null>(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [passengers, setPassengers] = useState<PassengerInfo[]>([]);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [mealPreference, setMealPreference] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Load booking data from localStorage
    const storedData = localStorage.getItem('trainBookingData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setBookingData(data);
      setSelectedClass(data.trainClass);
      
      // Initialize passenger info
      const passengerList = Array.from({ length: data.passengers }, () => ({
        name: '',
        age: '',
        gender: '',
        berth: 'No Preference'
      }));
      setPassengers(passengerList);
    } else {
      // Redirect to book trains if no booking data
      router.push('/book-trains');
    }
  }, [router]);

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const calculatePrice = () => {
    const classMultiplier = bookingData.train.priceMultiplier[selectedClass] || 1;
    const baseAmount = bookingData.train.basePrice * classMultiplier * bookingData.passengers;
    const convenienceFee = Math.round(baseAmount * 0.02); // 2% convenience fee
    const gst = Math.round(baseAmount * 0.05); // 5% GST
    
    return {
      baseAmount,
      convenienceFee,
      gst,
      totalAmount: baseAmount + convenienceFee + gst
    };
  };

  const updatePassenger = (index: number, field: keyof PassengerInfo, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const validateStep1 = () => {
    const emailValid = contactEmail && contactEmail.includes('@') && contactEmail.includes('.');
    const phoneValid = contactPhone && contactPhone.length >= 10;
    return selectedClass && emailValid && phoneValid;
  };

  const validateStep2 = () => {
    return passengers.every(p => p.name && p.age && p.gender);
  };

  const handleBooking = async () => {
    if (!validateStep2()) {
      alert("Please fill in all passenger details");
      return;
    }

    setLoading(true);
    
    try {
      const pricing = calculatePrice();
      const bookingPayload = {
        trainId: bookingData.train.id,
        travelDate: bookingData.travelDate,
        passengers: passengers.map((p, index) => ({
          ...p,
          age: parseInt(p.age),
          passengerNumber: index + 1
        })),
        class: selectedClass,
        departureStation: bookingData.source,
        arrivalStation: bookingData.destination,
        contactEmail,
        contactPhone,
        mealPreference,
        specialRequests,
        pricing
      };

      // Store booking details for payment
      localStorage.setItem('trainBookingPayload', JSON.stringify(bookingPayload));
      
      // Redirect to payment
      router.push('/test-payment?type=train');
      
    } catch (error) {
      console.error('Booking error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const pricing = calculatePrice();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <section className="bg-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Train className="w-8 h-8" />
            <h1 className="text-2xl md:text-3xl font-bold">Complete Your Train Booking</h1>
          </div>
          
          {/* Train Details */}
          <div className="bg-blue-700 rounded-xl p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-lg">{bookingData.train.trainName}</h3>
                <p className="text-blue-200">#{bookingData.train.trainNumber} • {bookingData.train.trainType}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold">{bookingData.train.departureTime}</p>
                  <p className="text-blue-200 text-sm">{bookingData.source}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-300" />
                <div className="text-center">
                  <p className="text-xl font-bold">{bookingData.train.arrivalTime}</p>
                  <p className="text-blue-200 text-sm">{bookingData.destination}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-blue-200">Travel Date</p>
                <p className="font-bold">
                  {bookingData.travelDate ? format(new Date(bookingData.travelDate), "MMM dd, yyyy") : "Date not selected"}
                </p>
                <p className="text-blue-200 text-sm">{bookingData.passengers} Passengers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Class & Contact</span>
            </div>
            <div className={`w-12 h-px ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Passenger Details</span>
            </div>
            <div className={`w-12 h-px ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Train className="w-5 h-5" />
                    Select Class & Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Class Selection */}
                  <div>
                    <Label className="text-base font-semibold">Choose Travel Class *</Label>
                    {!selectedClass && (
                      <p className="text-red-500 text-xs mt-1">Please select a travel class</p>
                    )}
                    <RadioGroup 
                      value={selectedClass} 
                      onValueChange={setSelectedClass}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3"
                    >
                      {bookingData.train.classes.map((cls) => {
                        const price = Math.round(bookingData.train.basePrice * (bookingData.train.priceMultiplier[cls] || 1));
                        return (
                          <div key={cls} className="flex items-center space-x-2">
                            <RadioGroupItem value={cls} id={cls} />
                            <Label htmlFor={cls} className="flex-1 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{cls}</p>
                                  <p className="text-sm text-gray-600">
                                    {cls === 'SL' && 'Sleeper Class'}
                                    {cls === '3A' && '3rd AC'}
                                    {cls === '2A' && '2nd AC'}
                                    {cls === '1A' && '1st AC'}
                                    {cls === 'CC' && 'Chair Car'}
                                    {cls === 'EC' && 'Executive Chair Car'}
                                  </p>
                                </div>
                                <p className="font-bold text-green-600">₹{price}</p>
                              </div>
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </div>

                  {/* Contact Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="your@email.com"
                        className={`mt-1 ${contactEmail && (!contactEmail.includes('@') || !contactEmail.includes('.')) ? 'border-red-500 focus:border-red-500' : ''}`}
                      />
                      {contactEmail && (!contactEmail.includes('@') || !contactEmail.includes('.')) && (
                        <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className={`mt-1 ${contactPhone && contactPhone.length < 10 ? 'border-red-500 focus:border-red-500' : ''}`}
                      />
                      {contactPhone && contactPhone.length < 10 && (
                        <p className="text-red-500 text-xs mt-1">Please enter at least 10 digits</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="meal">Meal Preference (Optional)</Label>
                    <Select value={mealPreference} onValueChange={setMealPreference}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select meal preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="veg">Vegetarian</SelectItem>
                        <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                        <SelectItem value="jain">Jain</SelectItem>
                        <SelectItem value="none">No Meal Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={() => {
                        console.log('Button clicked, validating step 1...');
                        console.log('Selected class:', selectedClass);
                        console.log('Contact email:', contactEmail);
                        console.log('Contact phone:', contactPhone);
                        console.log('Validation result:', validateStep1());
                        
                        if (validateStep1()) {
                          console.log('Validation passed, moving to step 2');
                          setStep(2);
                        } else {
                          // Show validation errors
                          if (!selectedClass) {
                            alert('Please select a travel class');
                          } else if (!contactEmail || !contactEmail.includes('@') || !contactEmail.includes('.')) {
                            alert('Please enter a valid email address');
                          } else if (!contactPhone || contactPhone.length < 10) {
                            alert('Please enter a valid phone number (minimum 10 digits)');
                          }
                        }
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Continue to Passenger Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Passenger Details ({bookingData.passengers} Passengers)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {passengers.map((passenger, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-4">Passenger {index + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                          <Label>Full Name *</Label>
                          <Input
                            value={passenger.name}
                            onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                            placeholder="Enter full name"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Age *</Label>
                          <Input
                            type="number"
                            value={passenger.age}
                            onChange={(e) => updatePassenger(index, 'age', e.target.value)}
                            placeholder="Age"
                            min="1"
                            max="120"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Gender *</Label>
                          <Select 
                            value={passenger.gender}
                            onValueChange={(value) => updatePassenger(index, 'gender', value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Label>Berth Preference</Label>
                        <Select 
                          value={passenger.berth}
                          onValueChange={(value) => updatePassenger(index, 'berth', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="No Preference">No Preference</SelectItem>
                            <SelectItem value="Lower">Lower Berth</SelectItem>
                            <SelectItem value="Middle">Middle Berth</SelectItem>
                            <SelectItem value="Upper">Upper Berth</SelectItem>
                            <SelectItem value="Side Lower">Side Lower</SelectItem>
                            <SelectItem value="Side Upper">Side Upper</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}

                  <div>
                    <Label htmlFor="requests">Special Requests (Optional)</Label>
                    <Textarea
                      id="requests"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Any special requests or requirements..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button 
                      onClick={handleBooking}
                      disabled={!validateStep2() || loading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {loading ? "Processing..." : "Proceed to Payment"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base Fare ({bookingData.passengers} × ₹{Math.round(bookingData.train.basePrice * (bookingData.train.priceMultiplier[selectedClass] || 1))})</span>
                    <span>₹{pricing.baseAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Convenience Fee</span>
                    <span>₹{pricing.convenienceFee}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>GST</span>
                    <span>₹{pricing.gst}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span className="text-green-600">₹{pricing.totalAmount}</span>
                    </div>
                  </div>
                </div>

                {selectedClass && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Selected Class: {selectedClass}</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      {selectedClass === 'SL' && <li>• Non-AC sleeper berths</li>}
                      {selectedClass === '3A' && <li>• AC 3-tier with bedding</li>}
                      {selectedClass === '2A' && <li>• AC 2-tier with bedding</li>}
                      {selectedClass === '1A' && <li>• Premium AC with meals</li>}
                      {selectedClass === 'CC' && <li>• AC seating only</li>}
                      {selectedClass === 'EC' && <li>• Premium AC seating</li>}
                    </ul>
                  </div>
                )}

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Tickets will be sent to your email</p>
                  <p>• Cancellation charges apply</p>
                  <p>• Carry valid ID proof during travel</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
