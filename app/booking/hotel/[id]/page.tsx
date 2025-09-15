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
  Hotel, 
  MapPin, 
  Star, 
  Calendar as CalendarIcon, 
  Users, 
  CreditCard,
  Phone,
  Mail,
  User,
  ArrowLeft,
  ArrowRight,
  Loader2
} from 'lucide-react'
import { format } from 'date-fns'
import PaymentCheckout from '@/components/payment/payment-checkout'

interface HotelData {
  id: string
  name: string
  location: string
  description: string
  rating: number
  reviews: number
  price: number
  originalPrice?: number
  image: string
  amenities: string[]
  rooms: {
    type: string
    price: number
    capacity: number
  }[]
}

interface BookingForm {
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: Date | undefined
  checkOut: Date | undefined
  guests: number
  roomType: string
  specialRequests: string
}

export default function HotelBookingPage() {
  const params = useParams()
  const router = useRouter()
  const hotelId = params.id as string
  
  const [hotel, setHotel] = useState<HotelData | null>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState<'details' | 'payment'>('details')
  const [bookingId, setBookingId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkIn: undefined,
    checkOut: undefined,
    guests: 1,
    roomType: '',
    specialRequests: ''
  })

  // Get hotel data from URL params or localStorage
  useEffect(() => {
    const storedHotelData = localStorage.getItem('selectedHotel')
    if (storedHotelData) {
      const hotelData = JSON.parse(storedHotelData)
      if (hotelData.id === hotelId) {
        setHotel(hotelData)
        setBookingForm(prev => ({
          ...prev,
          roomType: hotelData.rooms[0]?.type || ''
        }))
      }
    }
    setLoading(false)
  }, [hotelId])

  const calculateNights = () => {
    if (!bookingForm.checkIn || !bookingForm.checkOut) return 0
    return Math.ceil((bookingForm.checkOut.getTime() - bookingForm.checkIn.getTime()) / (1000 * 60 * 60 * 24))
  }

  const getSelectedRoomPrice = () => {
    if (!hotel || !bookingForm.roomType) return 0
    const room = hotel.rooms.find(r => r.type === bookingForm.roomType)
    return room?.price || hotel.price
  }

  const calculateTotal = () => {
    const roomPrice = getSelectedRoomPrice()
    const nights = calculateNights()
    return roomPrice * nights
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!hotel) return
    
    // Validation
    if (!bookingForm.guestName.trim()) {
      toast.error('Please enter guest name')
      return
    }
    if (!bookingForm.guestEmail.trim() || !bookingForm.guestEmail.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    if (!bookingForm.guestPhone.trim()) {
      toast.error('Please enter phone number')
      return
    }
    if (!bookingForm.checkIn) {
      toast.error('Please select check-in date')
      return
    }
    if (!bookingForm.checkOut) {
      toast.error('Please select check-out date')
      return
    }
    if (bookingForm.checkIn >= bookingForm.checkOut) {
      toast.error('Check-out date must be after check-in date')
      return
    }
    if (!bookingForm.roomType) {
      toast.error('Please select a room type')
      return
    }

    setIsSubmitting(true)
    
    try {
      const totalAmount = calculateTotal()
      const response = await fetch('/api/bookings/hotels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelId: hotel.id,
          hotelName: hotel.name,
          roomType: bookingForm.roomType,
          checkIn: bookingForm.checkIn.toISOString().split('T')[0],
          checkOut: bookingForm.checkOut.toISOString().split('T')[0],
          guests: bookingForm.guests,
          guestName: bookingForm.guestName,
          guestEmail: bookingForm.guestEmail,
          guestPhone: bookingForm.guestPhone,
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
    toast.success('Payment successful! Your hotel booking is confirmed.')
    localStorage.removeItem('selectedHotel')
    router.push('/bookings/success?type=hotel&id=' + bookingId)
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

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Hotel Not Found</h3>
              <p className="text-muted-foreground mb-4">
                The selected hotel could not be found. Please go back and select a hotel.
              </p>
              <Button onClick={() => router.push('/book-hotels')}>
                Back to Hotels
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
                Secure your hotel booking with our safe payment system
              </p>
            </div>
            
            <PaymentCheckout
              bookingId={bookingId}
              bookingType="hotel"
              amount={calculateTotal()}
              onSuccess={handlePaymentSuccess}
              bookingDetails={{
                hotelName: hotel.name,
                roomType: bookingForm.roomType,
                checkIn: bookingForm.checkIn ? format(bookingForm.checkIn, 'PPP') : '',
                checkOut: bookingForm.checkOut ? format(bookingForm.checkOut, 'PPP') : '',
                nights: calculateNights(),
                guests: bookingForm.guests,
                guestName: bookingForm.guestName
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
              onClick={() => router.push('/book-hotels')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Hotels
            </Button>
            <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
            <p className="text-muted-foreground">
              Enter your details to book {hotel.name}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Guest Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="guestName">Full Name *</Label>
                        <Input
                          id="guestName"
                          value={bookingForm.guestName}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, guestName: e.target.value }))}
                          placeholder="Enter full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="guestPhone">Phone Number *</Label>
                        <Input
                          id="guestPhone"
                          value={bookingForm.guestPhone}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, guestPhone: e.target.value }))}
                          placeholder="Enter phone number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="guestEmail">Email Address *</Label>
                      <Input
                        id="guestEmail"
                        type="email"
                        value={bookingForm.guestEmail}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, guestEmail: e.target.value }))}
                        placeholder="Enter email address"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Check-in Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {bookingForm.checkIn ? format(bookingForm.checkIn, 'PPP') : 'Select date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={bookingForm.checkIn}
                              onSelect={(date) => setBookingForm(prev => ({ ...prev, checkIn: date }))}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div>
                        <Label>Check-out Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {bookingForm.checkOut ? format(bookingForm.checkOut, 'PPP') : 'Select date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={bookingForm.checkOut}
                              onSelect={(date) => setBookingForm(prev => ({ ...prev, checkOut: date }))}
                              disabled={(date) => date <= (bookingForm.checkIn || new Date())}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label>Guests</Label>
                        <Select
                          value={bookingForm.guests.toString()}
                          onValueChange={(value) => setBookingForm(prev => ({ ...prev, guests: parseInt(value) }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6].map(num => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? 'Guest' : 'Guests'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Room Type *</Label>
                      <Select
                        value={bookingForm.roomType}
                        onValueChange={(value) => setBookingForm(prev => ({ ...prev, roomType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select room type" />
                        </SelectTrigger>
                        <SelectContent>
                          {hotel.rooms.map((room) => (
                            <SelectItem key={room.type} value={room.type}>
                              {room.type} - ₹{room.price.toLocaleString()}/night (up to {room.capacity} guests)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                      <Textarea
                        id="specialRequests"
                        value={bookingForm.specialRequests}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, specialRequests: e.target.value }))}
                        placeholder="Any special requests or requirements..."
                        rows={3}
                      />
                    </div>

                    <Button 
                      type="submit" 
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
                  </form>
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
                  <div className="flex items-center gap-3">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{hotel.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {hotel.location}
                      </p>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {hotel.rating} ({hotel.reviews} reviews)
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Check-in:</span>
                      <span>{bookingForm.checkIn ? format(bookingForm.checkIn, 'PPP') : 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-out:</span>
                      <span>{bookingForm.checkOut ? format(bookingForm.checkOut, 'PPP') : 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nights:</span>
                      <span>{calculateNights()} nights</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests:</span>
                      <span>{bookingForm.guests}</span>
                    </div>
                    {bookingForm.roomType && (
                      <div className="flex justify-between">
                        <span>Room:</span>
                        <span>{bookingForm.roomType}</span>
                      </div>
                    )}
                  </div>

                  {calculateNights() > 0 && bookingForm.roomType && (
                    <div className="pt-4 border-t">
                      <div className="flex justify-between text-sm mb-1">
                        <span>₹{getSelectedRoomPrice().toLocaleString()} × {calculateNights()} nights</span>
                        <span>₹{calculateTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount:</span>
                        <span>₹{calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {hotel.amenities.slice(0, 4).map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {hotel.amenities.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{hotel.amenities.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
