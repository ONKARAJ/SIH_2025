'use client';

import { useState } from 'react';
import { Calendar, Users, Clock, MapPin, Star, Phone, Mail, User, CreditCard, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface TourPackage {
  id: string;
  title: string;
  description: string;
  duration: string;
  groupSize: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  includes: string[];
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    activities: string[];
  }[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  category: string;
  image: string;
}

const tourPackages: TourPackage[] = [
  {
    id: 'sohrai-experience',
    title: 'Sohrai Festival Cultural Immersion',
    description: 'Experience the authentic Sohrai festival with local tribal families, learn traditional wall painting, and participate in cattle worship ceremonies.',
    duration: '3 Days, 2 Nights',
    groupSize: '4-12 people',
    price: 4500,
    originalPrice: 5500,
    rating: 4.8,
    reviews: 127,
    includes: [
      'Accommodation in tribal homestay',
      'All meals with traditional cuisine',
      'Sohrai painting workshop',
      'Festival ceremony participation',
      'Local guide and interpreter',
      'Transportation from Ranchi'
    ],
    highlights: [
      'Live Sohrai wall painting demonstration',
      'Participate in cattle worship rituals',
      'Traditional Jhumair dance performance',
      'Authentic tribal meals',
      'Village cultural walk',
      'Interaction with local artisans'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Village Immersion',
        activities: [
          'Pick-up from Ranchi and transfer to village',
          'Welcome ceremony with tribal community',
          'Traditional lunch with local family',
          'Village orientation and cultural introduction',
          'Evening folk music and storytelling'
        ]
      },
      {
        day: 2,
        title: 'Sohrai Festival Celebration',
        activities: [
          'Early morning cattle decoration ceremony',
          'Sohrai wall painting workshop',
          'Traditional breakfast preparation',
          'Festival procession participation',
          'Jhumair dance performance and lessons',
          'Community feast and celebrations'
        ]
      },
      {
        day: 3,
        title: 'Cultural Learning and Departure',
        activities: [
          'Bamboo craft workshop',
          'Traditional cooking class',
          'Visit to local artisan families',
          'Cultural presentation and certificate',
          'Return journey to Ranchi'
        ]
      }
    ],
    difficulty: 'Easy',
    category: 'Festival Experience',
    image: '/festivals/sohrai-tour.jpg'
  },
  {
    id: 'tribal-heritage-trail',
    title: 'Jharkhand Tribal Heritage Trail',
    description: 'Comprehensive journey through multiple tribal communities, exploring diverse cultures, traditions, and artistic heritage across Jharkhand.',
    duration: '7 Days, 6 Nights',
    groupSize: '6-15 people',
    price: 12500,
    originalPrice: 15000,
    rating: 4.9,
    reviews: 89,
    includes: [
      'Accommodation in heritage properties',
      'All meals featuring regional cuisines',
      'Multiple cultural workshops',
      'Professional cultural guide',
      'Air-conditioned transportation',
      'Entry fees to cultural sites',
      'Traditional craft souvenirs'
    ],
    highlights: [
      'Visit 5 different tribal communities',
      'Master classes in traditional crafts',
      'Exclusive access to sacred groves',
      'Traditional music and dance performances',
      'Authentic tribal cooking experiences',
      'Cultural documentation workshop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Ranchi - Santhal Culture',
        activities: [
          'Arrival and briefing session',
          'Transfer to Santhal village',
          'Introduction to Santhal culture',
          'Traditional welcome ceremony',
          'Evening cultural program'
        ]
      },
      {
        day: 2,
        title: 'Munda Traditions',
        activities: [
          'Journey to Munda territory',
          'Sacred grove visit and rituals',
          'Traditional archery demonstration',
          'Munda music workshop',
          'Homestay experience'
        ]
      }
      // Additional days would continue...
    ],
    difficulty: 'Moderate',
    category: 'Heritage Tour',
    image: '/tours/heritage-trail.jpg'
  },
  {
    id: 'festival-calendar-tour',
    title: 'Year-Round Festival Calendar Tour',
    description: 'Customizable tour package to experience different tribal festivals throughout the year based on the festival calendar.',
    duration: 'Flexible (2-5 days)',
    groupSize: '2-20 people',
    price: 3500,
    rating: 4.7,
    reviews: 203,
    includes: [
      'Festival-specific accommodation',
      'Cultural guide and interpreter',
      'Festival participation access',
      'Traditional meal experiences',
      'Photography permissions',
      'Cultural workshop sessions'
    ],
    highlights: [
      'Attend authentic tribal festivals',
      'Seasonal cultural experiences',
      'Festival-specific workshops',
      'Community interaction opportunities',
      'Traditional ceremony participation',
      'Cultural photography sessions'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Festival Preparation and Arrival',
        activities: [
          'Festival briefing and cultural orientation',
          'Village arrival and welcome',
          'Festival preparation observation',
          'Traditional costume trying',
          'Pre-festival community meal'
        ]
      }
    ],
    difficulty: 'Easy',
    category: 'Festival Tour',
    image: '/tours/festival-calendar.jpg'
  }
];

interface BookingFormData {
  tourId: string;
  name: string;
  email: string;
  phone: string;
  groupSize: number;
  preferredDate: string;
  specialRequests: string;
  emergencyContact: string;
  dietaryRestrictions: string;
  accommodationType: 'Standard' | 'Premium' | 'Luxury';
  addOns: string[];
}

export default function CulturalTourBooking({ initialTourId }: { initialTourId?: string }) {
  const [selectedTour, setSelectedTour] = useState<TourPackage>(
    initialTourId ? tourPackages.find(t => t.id === initialTourId) || tourPackages[0] : tourPackages[0]
  );
  const [bookingStep, setBookingStep] = useState<'select' | 'details' | 'payment' | 'confirmation'>('select');
  const [formData, setFormData] = useState<Partial<BookingFormData>>({
    tourId: selectedTour.id,
    groupSize: 2,
    accommodationType: 'Standard',
    addOns: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleTourSelection = (tour: TourPackage) => {
    setSelectedTour(tour);
    setFormData(prev => ({ ...prev, tourId: tour.id }));
  };

  const handleFormUpdate = (field: keyof BookingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotalPrice = () => {
    let basePrice = selectedTour.price * (formData.groupSize || 1);
    
    // Accommodation upgrades
    if (formData.accommodationType === 'Premium') basePrice *= 1.3;
    if (formData.accommodationType === 'Luxury') basePrice *= 1.6;
    
    // Add-ons
    const addOnPrices = {
      'photography': 1500,
      'cooking-class': 800,
      'craft-workshop': 1200,
      'private-guide': 2000
    };
    
    const addOnTotal = (formData.addOns || []).reduce((total, addOn) => 
      total + (addOnPrices[addOn as keyof typeof addOnPrices] || 0), 0
    );

    return basePrice + addOnTotal;
  };

  const handleBookingSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setBookingStep('confirmation');
    setIsLoading(false);
  };

  if (bookingStep === 'confirmation') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-6">
            Your cultural tour booking has been successfully confirmed. You will receive a detailed itinerary and confirmation email shortly.
          </p>
          
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Booking Summary</h3>
            <div className="text-sm space-y-1">
              <p><strong>Tour:</strong> {selectedTour.title}</p>
              <p><strong>Date:</strong> {formData.preferredDate}</p>
              <p><strong>Group Size:</strong> {formData.groupSize} people</p>
              <p><strong>Total Amount:</strong> ₹{calculateTotalPrice().toLocaleString()}</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => window.print()} variant="outline">
              Print Confirmation
            </Button>
            <Button onClick={() => setBookingStep('select')}>
              Book Another Tour
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {['select', 'details', 'payment'].map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                bookingStep === step 
                  ? 'bg-primary text-primary-foreground' 
                  : ['select', 'details', 'payment'].indexOf(bookingStep) > index
                  ? 'bg-green-500 text-white'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {index + 1}
              </div>
              {index < 2 && <div className="w-8 h-px bg-muted mx-2" />}
            </div>
          ))}
        </div>
      </div>

      <Tabs value={bookingStep} onValueChange={(value) => setBookingStep(value as any)}>
        {/* Tour Selection */}
        <TabsContent value="select" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Choose Your Cultural Experience</h2>
            <p className="text-muted-foreground">
              Select from our curated cultural tour packages designed to immerse you in Jharkhand's rich tribal heritage
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {tourPackages.map((tour) => (
              <Card 
                key={tour.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTour.id === tour.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleTourSelection(tour)}
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <Calendar className="h-12 w-12 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">{tour.category}</p>
                    </div>
                  </div>
                  {tour.originalPrice && (
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                      Save ₹{tour.originalPrice - tour.price}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={`text-xs ${
                      tour.difficulty === 'Easy' ? 'border-green-500 text-green-700' :
                      tour.difficulty === 'Moderate' ? 'border-yellow-500 text-yellow-700' :
                      'border-red-500 text-red-700'
                    }`}>
                      {tour.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{tour.rating}</span>
                      <span className="text-xs text-muted-foreground">({tour.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-2">{tour.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {tour.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {tour.groupSize}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">₹{tour.price.toLocaleString()}</span>
                        {tour.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">₹{tour.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">per person</span>
                    </div>
                  </div>

                  {selectedTour.id === tour.id && (
                    <div className="mt-4 space-y-3">
                      <Separator />
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Highlights:</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {tour.highlights.slice(0, 3).map((highlight, index) => (
                            <li key={index}>• {highlight}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => setBookingStep('details')}
              size="lg"
              disabled={!selectedTour}
            >
              Continue with {selectedTour.title}
            </Button>
          </div>
        </TabsContent>

        {/* Booking Details */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input 
                          id="name"
                          value={formData.name || ''}
                          onChange={(e) => handleFormUpdate('name', e.target.value)}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email"
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => handleFormUpdate('email', e.target.value)}
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone"
                          value={formData.phone || ''}
                          onChange={(e) => handleFormUpdate('phone', e.target.value)}
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergency">Emergency Contact</Label>
                        <Input 
                          id="emergency"
                          value={formData.emergencyContact || ''}
                          onChange={(e) => handleFormUpdate('emergencyContact', e.target.value)}
                          placeholder="Emergency contact number"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Tour Preferences */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Tour Preferences
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="date">Preferred Date *</Label>
                        <Input 
                          id="date"
                          type="date"
                          value={formData.preferredDate || ''}
                          onChange={(e) => handleFormUpdate('preferredDate', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="groupSize">Group Size *</Label>
                        <Select 
                          value={formData.groupSize?.toString() || '2'}
                          onValueChange={(value) => handleFormUpdate('groupSize', parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(num => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? 'person' : 'people'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="accommodation">Accommodation</Label>
                        <Select 
                          value={formData.accommodationType || 'Standard'}
                          onValueChange={(value) => handleFormUpdate('accommodationType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Standard">Standard</SelectItem>
                            <SelectItem value="Premium">Premium (+30%)</SelectItem>
                            <SelectItem value="Luxury">Luxury (+60%)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dietary">Dietary Restrictions</Label>
                    <Input 
                      id="dietary"
                      value={formData.dietaryRestrictions || ''}
                      onChange={(e) => handleFormUpdate('dietaryRestrictions', e.target.value)}
                      placeholder="Any dietary restrictions or preferences"
                    />
                  </div>

                  <div>
                    <Label htmlFor="requests">Special Requests</Label>
                    <Textarea 
                      id="requests"
                      value={formData.specialRequests || ''}
                      onChange={(e) => handleFormUpdate('specialRequests', e.target.value)}
                      placeholder="Any special requests or requirements for your tour"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">{selectedTour.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{selectedTour.duration}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.groupSize || 2} people</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base price × {formData.groupSize || 2}</span>
                      <span>₹{(selectedTour.price * (formData.groupSize || 2)).toLocaleString()}</span>
                    </div>
                    {formData.accommodationType !== 'Standard' && (
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{formData.accommodationType} upgrade</span>
                        <span>
                          +₹{Math.round(selectedTour.price * (formData.groupSize || 2) * 
                            (formData.accommodationType === 'Premium' ? 0.3 : 0.6)
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-primary">₹{calculateTotalPrice().toLocaleString()}</span>
                  </div>

                  <Button 
                    onClick={() => setBookingStep('payment')}
                    className="w-full"
                    disabled={!formData.name || !formData.email || !formData.phone || !formData.preferredDate}
                  >
                    Proceed to Payment
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Need Help?</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>+91 8210349503</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>tours@jharkhand-tourism.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Payment */}
        <TabsContent value="payment" className="space-y-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Secure Payment</h4>
                  <p className="text-blue-700 text-sm">
                    Your payment information is encrypted and secure. We accept all major credit cards, 
                    debit cards, and UPI payments.
                  </p>
                </div>

                <div className="text-center py-8">
                  <CreditCard className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    Payment integration would be implemented here with services like Razorpay, PayU, or Stripe
                  </p>
                  <div className="bg-muted/30 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold mb-2">Final Amount</h3>
                    <p className="text-3xl font-bold text-primary">₹{calculateTotalPrice().toLocaleString()}</p>
                  </div>
                  <Button 
                    onClick={handleBookingSubmit}
                    size="lg"
                    disabled={isLoading}
                    className="px-8"
                  >
                    {isLoading ? 'Processing...' : 'Complete Booking'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
