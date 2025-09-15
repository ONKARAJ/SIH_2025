'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  Plane, 
  MapPin, 
  Star, 
  Calendar as CalendarIcon, 
  Users, 
  CreditCard,
  Phone,
  Mail,
  User,
  UserPlus,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Clock
} from 'lucide-react'
import { format } from 'date-fns'
import PaymentCheckout from '@/components/payment/payment-checkout'

interface FlightData {
  id: string
  airline: string
  flightNumber: string
  departure: string
  departureCode: string
  arrival: string
  arrivalCode: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: number
  originalPrice?: number
  availableSeats: number
  aircraft: string
  type: string
  rating: number
}

interface PassengerDetails {
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: Date | undefined
  nationality: string
}

interface BookingForm {
  contactName: string
  contactEmail: string
  contactPhone: string
  passengers: PassengerDetails[]
  travelDate: Date | undefined
  classType: string
  specialRequests: string
}

export default function FlightBookingPage() {
  const params = useParams()
  const router = useRouter()
  const flightId = params.id as string
  
  const [flight, setFlight] = useState<FlightData | null>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState<'details' | 'payment'>('details')
  const [bookingId, setBookingId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passengerCount, setPassengerCount] = useState(1)
  
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    passengers: [
      {
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: undefined,
        nationality: 'Indian'
      }
    ],
    travelDate: undefined,
    classType: 'economy',
    specialRequests: ''
  })

  // Get flight data from localStorage
  useEffect(() => {
    const storedFlightData = localStorage.getItem('selectedFlight')
    if (storedFlightData) {
      const flightData = JSON.parse(storedFlightData)
      if (flightData.id === flightId) {
        setFlight(flightData)
      }
    }
    setLoading(false)
  }, [flightId])

  // Update passengers array when count changes
  useEffect(() => {
    const currentPassengers = [...bookingForm.passengers]
    
    if (passengerCount > currentPassengers.length) {
      // Add new passengers
      const newPassengers = Array(passengerCount - currentPassengers.length).fill(null).map(() => ({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: undefined,
        nationality: 'Indian'
      }))
      setBookingForm(prev => ({
        ...prev,
        passengers: [...currentPassengers, ...newPassengers]
      }))
    } else if (passengerCount < currentPassengers.length) {
      // Remove excess passengers
      setBookingForm(prev => ({
        ...prev,
        passengers: currentPassengers.slice(0, passengerCount)
      }))
    }
  }, [passengerCount])

  const calculateClassPrice = () => {
    if (!flight) return 0
    
    let multiplier = 1
    switch (bookingForm.classType) {
      case 'business':
        multiplier = 2.5
        break
      case 'first':
        multiplier = 4
        break
      default:
        multiplier = 1
    }
    
    return Math.round(flight.price * multiplier)
  }

  const calculateTotal = () => {
    return calculateClassPrice() * passengerCount
  }

  const updatePassenger = (index: number, field: keyof PassengerDetails, value: any) => {
    setBookingForm(prev => ({
      ...prev,
      passengers: prev.passengers.map((passenger, i) => 
        i === index ? { ...passenger, [field]: value } : passenger
      )
    }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!flight) return
    
    // Validation
    if (!bookingForm.contactName.trim()) {
      toast.error('Please enter contact name')
      return
    }
    if (!bookingForm.contactEmail.trim() || !bookingForm.contactEmail.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    if (!bookingForm.contactPhone.trim()) {
      toast.error('Please enter phone number')
      return
    }
    if (!bookingForm.travelDate) {
      toast.error('Please select travel date')
      return
    }

    // Validate all passengers
    for (let i = 0; i < bookingForm.passengers.length; i++) {
      const passenger = bookingForm.passengers[i]
      if (!passenger.firstName.trim()) {
        toast.error(`Please enter first name for passenger ${i + 1}`)
        return
      }
      if (!passenger.lastName.trim()) {
        toast.error(`Please enter last name for passenger ${i + 1}`)
        return
      }
      if (!passenger.gender) {
        toast.error(`Please select gender for passenger ${i + 1}`)
        return
      }
      if (!passenger.dateOfBirth) {
        toast.error(`Please enter date of birth for passenger ${i + 1}`)
        return
      }
    }

    setIsSubmitting(true)
    
    try {
      const totalAmount = calculateTotal()
      const response = await fetch('/api/bookings/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flightId: flight.id,
          airline: flight.airline,
          flightNumber: flight.flightNumber,
          departure: flight.departure,
          arrival: flight.arrival,
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime,
          travelDate: bookingForm.travelDate.toISOString().split('T')[0],
          classType: bookingForm.classType,
          passengers: bookingForm.passengers,
          contactName: bookingForm.contactName,
          contactEmail: bookingForm.contactEmail,
          contactPhone: bookingForm.contactPhone,
          totalAmount,
          specialRequests: bookingForm.specialRequests
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setBookingId(result.booking.id)
        setStep('payment')
        toast.success('Booking details saved! Please proceed to payment.')
      } else {
        toast.error('Failed to create booking: ' + (result.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error creating booking:', error)
      toast.error('Failed to create booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePaymentSuccess = () => {
    toast.success('Payment successful! Your flight booking is confirmed.')
    localStorage.removeItem('selectedFlight')
    router.push('/bookings/success?type=flight&id=' + bookingId)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  if (!flight) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Flight Not Found</h3>
              <p className="text-muted-foreground mb-4">
                The selected flight could not be found. Please go back and select a flight.
              </p>
              <Button onClick={() => router.push('/book-flights')}>
                Back to Flights
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === 'payment' && bookingId) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setStep('details')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Details
              </Button>
              <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
              <p className="text-muted-foreground">
                Secure your flight booking with our safe payment system
              </p>
            </div>
            
            <PaymentCheckout
              bookingId={bookingId}
              bookingType="flight"
              amount={calculateTotal()}
              onSuccess={handlePaymentSuccess}
              bookingDetails={{
                airline: flight.airline,
                flightNumber: flight.flightNumber,
                route: `${flight.departure} → ${flight.arrival}`,
                departureTime: flight.departureTime,
                travelDate: bookingForm.travelDate ? format(bookingForm.travelDate, 'PPP') : '',
                passengers: passengerCount,
                classType: bookingForm.classType,
                contactName: bookingForm.contactName
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.push('/book-flights')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Flights
            </Button>
            <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
            <p className="text-muted-foreground">
              Enter passenger details for {flight.airline} {flight.flightNumber}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input
                          id="contactName"
                          value={bookingForm.contactName}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, contactName: e.target.value }))}
                          placeholder="Enter contact name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactPhone">Phone Number *</Label>
                        <Input
                          id="contactPhone"
                          value={bookingForm.contactPhone}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                          placeholder="Enter phone number"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="contactEmail">Email Address *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={bookingForm.contactEmail}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Flight Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="w-5 h-5" />
                    Flight Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Travel Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {bookingForm.travelDate ? format(bookingForm.travelDate, 'PPP') : 'Select date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={bookingForm.travelDate}
                            onSelect={(date) => setBookingForm(prev => ({ ...prev, travelDate: date }))}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label>Passengers</Label>
                      <Select
                        value={passengerCount.toString()}
                        onValueChange={(value) => setPassengerCount(parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Passenger' : 'Passengers'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Class</Label>
                      <Select
                        value={bookingForm.classType}
                        onValueChange={(value) => setBookingForm(prev => ({ ...prev, classType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">
                            Economy - ₹{flight.price.toLocaleString()}
                          </SelectItem>
                          <SelectItem value="business">
                            Business - ₹{Math.round(flight.price * 2.5).toLocaleString()}
                          </SelectItem>
                          <SelectItem value="first">
                            First Class - ₹{Math.round(flight.price * 4).toLocaleString()}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Passenger Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Passenger Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {bookingForm.passengers.map((passenger, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4">
                      <h4 className="font-semibold">Passenger {index + 1}</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>First Name *</Label>
                          <Input
                            value={passenger.firstName}
                            onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                            placeholder="Enter first name"
                            required
                          />
                        </div>
                        <div>
                          <Label>Last Name *</Label>
                          <Input
                            value={passenger.lastName}
                            onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                            placeholder="Enter last name"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Gender *</Label>
                          <Select
                            value={passenger.gender}
                            onValueChange={(value) => updatePassenger(index, 'gender', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Date of Birth *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {passenger.dateOfBirth ? format(passenger.dateOfBirth, 'PP') : 'Select date'}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={passenger.dateOfBirth}
                                onSelect={(date) => updatePassenger(index, 'dateOfBirth', date)}
                                disabled={(date) => date > new Date()}
                                initialFocus
                                captionLayout="dropdown-buttons"
                                fromYear={1940}
                                toYear={new Date().getFullYear()}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div>
                          <Label>Nationality</Label>
                          <Input
                            value={passenger.nationality}
                            onChange={(e) => updatePassenger(index, 'nationality', e.target.value)}
                            placeholder="Enter nationality"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div>
                    <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                    <Textarea
                      id="specialRequests"
                      value={bookingForm.specialRequests}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, specialRequests: e.target.value }))}
                      placeholder="Any special requests, meal preferences, etc..."
                      rows={3}
                    />
                  </div>

                  <Button 
                    onClick={handleFormSubmit}
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Proceed to Payment
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Flight Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {flight.airline === 'IndiGo' ? '🟦' : 
                         flight.airline === 'SpiceJet' ? '🟡' : 
                         flight.airline === 'Air India' ? '🔴' : 
                         flight.airline === 'Vistara' ? '🟣' : '✈️'}
                      </span>
                      <div>
                        <h3 className="font-semibold">{flight.airline}</h3>
                        <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{flight.departureTime}</div>
                        <div className="text-xs text-muted-foreground">{flight.departure}</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="flex items-center justify-center">
                          <div className="flex-1 border-t"></div>
                          <Plane className="w-4 h-4 mx-2 text-muted-foreground" />
                          <div className="flex-1 border-t"></div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{flight.duration}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{flight.arrivalTime}</div>
                        <div className="text-xs text-muted-foreground">{flight.arrival}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm pt-4 border-t">
                    <div className="flex justify-between">
                      <span>Travel Date:</span>
                      <span>{bookingForm.travelDate ? format(bookingForm.travelDate, 'PP') : 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Passengers:</span>
                      <span>{passengerCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Class:</span>
                      <span className="capitalize">{bookingForm.classType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Aircraft:</span>
                      <span>{flight.aircraft}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {flight.rating}
                      </div>
                    </div>
                  </div>

                  {passengerCount > 0 && (
                    <div className="pt-4 border-t">
                      <div className="flex justify-between text-sm mb-1">
                        <span>₹{calculateClassPrice().toLocaleString()} × {passengerCount} passengers</span>
                        <span>₹{calculateTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount:</span>
                        <span>₹{calculateTotal().toLocaleString()}</span>
                      </div>
                      {flight.originalPrice && flight.originalPrice > flight.price && (
                        <div className="text-sm text-green-600 mt-1">
                          You save: ₹{((flight.originalPrice - flight.price) * passengerCount).toLocaleString()}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
