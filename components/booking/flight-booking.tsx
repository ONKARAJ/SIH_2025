'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { 
  Search, 
  Plane, 
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  Loader2,
  CreditCard,
  ArrowRight
} from 'lucide-react'
import { format } from 'date-fns'
import PaymentCheckout from '@/components/payment/payment-checkout'

interface Flight {
  id: string
  airline: string
  flightNumber: string
  departure: string
  arrival: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: number
  availableSeats: number
  aircraft: string
}

interface Passenger {
  firstName: string
  lastName: string
  age: number
  gender: 'male' | 'female'
}

interface BookingForm {
  contactEmail: string
  contactPhone: string
  passengers: Passenger[]
}

export default function FlightBooking() {
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    departureDate: undefined as Date | undefined,
    passengers: 1
  })
  const [flights, setFlights] = useState<Flight[]>([])
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    contactEmail: '',
    contactPhone: '',
    passengers: [{ firstName: '', lastName: '', age: 30, gender: 'male' }]
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [bookingId, setBookingId] = useState('')

  const searchFlights = async () => {
    if (!searchForm.from.trim() || !searchForm.to.trim() || !searchForm.departureDate) {
      toast.error('Please fill in all search fields')
      return
    }

    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        from: searchForm.from,
        to: searchForm.to,
        departureDate: searchForm.departureDate.toISOString().split('T')[0],
        passengers: searchForm.passengers.toString()
      })

      const response = await fetch(`/api/bookings/flights/search?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setFlights(data.flights)
        if (data.flights.length === 0) {
          toast.info('No flights found for this route and date')
        }
      } else {
        toast.error('Failed to search flights')
      }
    } catch (error) {
      console.error('Error searching flights:', error)
      toast.error('Failed to search flights')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight)
    // Initialize passengers based on search
    const passengers = Array.from({ length: searchForm.passengers }, () => ({
      firstName: '',
      lastName: '',
      age: 30,
      gender: 'male' as const
    }))
    setBookingForm({ ...bookingForm, passengers })
    setShowBookingForm(true)
  }

  const updatePassenger = (index: number, field: keyof Passenger, value: string | number) => {
    const updatedPassengers = [...bookingForm.passengers]
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value }
    setBookingForm({ ...bookingForm, passengers: updatedPassengers })
  }

  const handleBookingSubmit = async () => {
    if (!selectedFlight) {
      toast.error('Please select a flight')
      return
    }

    if (!bookingForm.contactEmail || !bookingForm.contactPhone) {
      toast.error('Please fill in contact information')
      return
    }

    // Validate all passengers have names
    const invalidPassengers = bookingForm.passengers.some(p => !p.firstName.trim() || !p.lastName.trim())
    if (invalidPassengers) {
      toast.error('Please fill in all passenger names')
      return
    }

    setIsBooking(true)
    try {
      const totalAmount = selectedFlight.price * bookingForm.passengers.length

      const response = await fetch('/api/bookings/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flightId: selectedFlight.id,
          passengers: bookingForm.passengers,
          contactEmail: bookingForm.contactEmail,
          contactPhone: bookingForm.contactPhone,
          totalAmount
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setBookingId(result.booking.id)
        setShowBookingForm(false)
        setShowPayment(true)
        toast.success('Flight booking created! Proceed to payment.')
      } else {
        toast.error('Failed to create booking: ' + result.error)
      }
    } catch (error) {
      console.error('Error creating booking:', error)
      toast.error('Failed to create booking')
    } finally {
      setIsBooking(false)
    }
  }

  const calculateTotal = () => {
    if (!selectedFlight) return 0
    return selectedFlight.price * bookingForm.passengers.length
  }

  const handlePaymentSuccess = () => {
    toast.success('Payment successful! Your flight booking is confirmed.')
    // Reset form
    setSelectedFlight(null)
    setBookingForm({
      contactEmail: '',
      contactPhone: '',
      passengers: [{ firstName: '', lastName: '', age: 30, gender: 'male' }]
    })
    setShowPayment(false)
    setShowBookingForm(false)
    setBookingId('')
  }

  const handlePaymentError = (error: string) => {
    toast.error(`Payment failed: ${error}`)
  }

  const formatDuration = (duration: string) => {
    return duration.replace('h', 'h ').replace('m', 'm')
  }

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Search Flights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                placeholder="Departure city"
                value={searchForm.from}
                onChange={(e) => setSearchForm({ ...searchForm, from: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                placeholder="Arrival city"
                value={searchForm.to}
                onChange={(e) => setSearchForm({ ...searchForm, to: e.target.value })}
              />
            </div>
            <div>
              <Label>Departure Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {searchForm.departureDate ? format(searchForm.departureDate, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={searchForm.departureDate}
                    onSelect={(date) => setSearchForm({ ...searchForm, departureDate: date })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="passengers">Passengers</Label>
              <Select value={searchForm.passengers.toString()} onValueChange={(value) => setSearchForm({ ...searchForm, passengers: parseInt(value) })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num} Passenger{num > 1 ? 's' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={searchFlights} disabled={isLoading} className="w-full mt-4">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Searching Flights...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Search Flights
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Flights List */}
      {flights.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Available Flights</h3>
          {flights.map((flight) => (
            <Card key={flight.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{flight.departureTime}</div>
                        <div className="text-sm text-gray-600">{flight.departure}</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <div className="flex-1 border-t border-gray-300"></div>
                          <Plane className="w-4 h-4 text-gray-400" />
                          <div className="flex-1 border-t border-gray-300"></div>
                        </div>
                        <div className="text-sm text-gray-600">{formatDuration(flight.duration)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{flight.arrivalTime}</div>
                        <div className="text-sm text-gray-600">{flight.arrival}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Plane className="w-3 h-3" />
                        {flight.airline} {flight.flightNumber}
                      </span>
                      <span>{flight.aircraft}</span>
                      <Badge variant="outline">
                        {flight.availableSeats} seats available
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-right ml-6">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">
                      ₹{flight.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 mb-3">per person</div>
                    <Button onClick={() => handleFlightSelect(flight)}>
                      Select Flight
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Booking Form Dialog */}
      {showBookingForm && selectedFlight && (
        <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Complete Your Booking</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Flight Summary */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg">{selectedFlight.airline} {selectedFlight.flightNumber}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{selectedFlight.departure}</span>
                        <ArrowRight className="w-4 h-4" />
                        <span>{selectedFlight.arrival}</span>
                        <span>•</span>
                        <span>{formatDuration(selectedFlight.duration)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-emerald-600">
                        ₹{selectedFlight.price.toLocaleString()} × {bookingForm.passengers.length}
                      </div>
                      <div className="text-sm text-gray-600">per person</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Email Address *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={bookingForm.contactEmail}
                      onChange={(e) => setBookingForm({ ...bookingForm, contactEmail: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Phone Number *</Label>
                    <Input
                      id="contactPhone"
                      value={bookingForm.contactPhone}
                      onChange={(e) => setBookingForm({ ...bookingForm, contactPhone: e.target.value })}
                      placeholder="+91 9876543210"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Passenger Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Passenger Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {bookingForm.passengers.map((passenger, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-4">Passenger {index + 1}</h4>
                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <Label htmlFor={`firstName-${index}`}>First Name *</Label>
                          <Input
                            id={`firstName-${index}`}
                            value={passenger.firstName}
                            onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                            placeholder="First name"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`lastName-${index}`}>Last Name *</Label>
                          <Input
                            id={`lastName-${index}`}
                            value={passenger.lastName}
                            onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                            placeholder="Last name"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`age-${index}`}>Age</Label>
                          <Input
                            id={`age-${index}`}
                            type="number"
                            value={passenger.age}
                            onChange={(e) => updatePassenger(index, 'age', parseInt(e.target.value) || 0)}
                            min={1}
                            max={120}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`gender-${index}`}>Gender</Label>
                          <Select 
                            value={passenger.gender} 
                            onValueChange={(value: 'male' | 'female') => updatePassenger(index, 'gender', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Separator />

              {/* Booking Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>Flight fare ({bookingForm.passengers.length} passenger{bookingForm.passengers.length > 1 ? 's' : ''}):</span>
                  <span>₹{(selectedFlight.price * bookingForm.passengers.length).toLocaleString()}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total Amount:</span>
                  <span className="text-emerald-600">₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <Button
                onClick={handleBookingSubmit}
                disabled={isBooking}
                className="w-full"
                size="lg"
              >
                {isBooking ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Booking...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Payment
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Payment Dialog */}
      {showPayment && bookingId && selectedFlight && (
        <Dialog open={showPayment} onOpenChange={setShowPayment}>
          <DialogContent className="max-w-md">
            <PaymentCheckout
              bookingId={bookingId}
              bookingType="flight"
              amount={calculateTotal()}
              bookingDetails={{
                title: `${selectedFlight.airline} ${selectedFlight.flightNumber}`,
                description: `${selectedFlight.departure} → ${selectedFlight.arrival} (${bookingForm.passengers.length} passenger${bookingForm.passengers.length > 1 ? 's' : ''})`,
                reference: bookingId.substring(0, 8).toUpperCase(),
                customerInfo: {
                  name: bookingForm.passengers[0]?.firstName + ' ' + bookingForm.passengers[0]?.lastName,
                  email: bookingForm.contactEmail,
                  phone: bookingForm.contactPhone
                }
              }}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
