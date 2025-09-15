'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { 
  Search, 
  MapPin, 
  Calendar as CalendarIcon,
  Users, 
  Star,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Loader2,
  CreditCard
} from 'lucide-react'
import { format } from 'date-fns'
import PaymentCheckout from '@/components/payment/payment-checkout'

interface Hotel {
  id: string
  name: string
  location: string
  description: string
  rating: number
  amenities: string[]
  images: string[]
  pricePerNight: number
  rooms: {
    id: string
    name: string
    type: string
    capacity: number
    pricePerNight: number
    amenities: string[]
    available: boolean
  }[]
}

interface BookingForm {
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: Date | undefined
  checkOut: Date | undefined
  guests: number
  specialRequests: string
}

const amenityIcons: { [key: string]: any } = {
  'WiFi': Wifi,
  'Parking': Car,
  'Restaurant': Utensils,
  'Gym': Dumbbell
}

export default function HotelBooking() {
  const [searchLocation, setSearchLocation] = useState('')
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<string>('')
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkIn: undefined,
    checkOut: undefined,
    guests: 1,
    specialRequests: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [bookingId, setBookingId] = useState('')

  const searchHotels = async () => {
    if (!searchLocation.trim()) {
      toast.error('Please enter a location to search')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/bookings/hotels/search?location=${encodeURIComponent(searchLocation)}`)
      const data = await response.json()
      
      if (data.success) {
        setHotels(data.hotels)
        if (data.hotels.length === 0) {
          toast.info('No hotels found in this location')
        }
      } else {
        toast.error('Failed to search hotels')
      }
    } catch (error) {
      console.error('Error searching hotels:', error)
      toast.error('Failed to search hotels')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookingSubmit = async () => {
    if (!selectedHotel || !selectedRoom) {
      toast.error('Please select a hotel and room')
      return
    }

    if (!bookingForm.guestName || !bookingForm.guestEmail || !bookingForm.checkIn || !bookingForm.checkOut) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsBooking(true)
    try {
      const room = selectedHotel.rooms.find(r => r.id === selectedRoom)
      if (!room) {
        toast.error('Selected room not found')
        return
      }

      const nights = Math.ceil((bookingForm.checkOut!.getTime() - bookingForm.checkIn!.getTime()) / (1000 * 60 * 60 * 24))
      const totalAmount = room.pricePerNight * nights

      const response = await fetch('/api/bookings/hotels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelId: selectedHotel.id,
          roomId: selectedRoom,
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
        setShowBookingForm(false)
        setShowPayment(true)
        toast.success('Booking created! Proceed to payment.')
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

  const calculateNights = () => {
    if (!bookingForm.checkIn || !bookingForm.checkOut) return 0
    return Math.ceil((bookingForm.checkOut.getTime() - bookingForm.checkIn.getTime()) / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = () => {
    if (!selectedHotel || !selectedRoom) return 0
    const room = selectedHotel.rooms.find(r => r.id === selectedRoom)
    if (!room) return 0
    return room.pricePerNight * calculateNights()
  }

  const handlePaymentSuccess = () => {
    toast.success('Payment successful! Your hotel booking is confirmed.')
    // Reset form
    setSelectedHotel(null)
    setSelectedRoom('')
    setBookingForm({
      guestName: '',
      guestEmail: '',
      guestPhone: '',
      checkIn: undefined,
      checkOut: undefined,
      guests: 1,
      specialRequests: ''
    })
    setShowPayment(false)
    setBookingId('')
  }

  const handlePaymentError = (error: string) => {
    toast.error(`Payment failed: ${error}`)
  }

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Hotels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter city or location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchHotels()}
              />
            </div>
            <Button onClick={searchHotels} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Search'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hotels List */}
      {hotels.length > 0 && (
        <div className="grid gap-6">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={hotel.images[0] || '/placeholder-hotel.jpg'}
                    alt={hotel.name}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{hotel.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{hotel.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hotel.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 4).map((amenity, index) => {
                      const Icon = amenityIcons[amenity] || Wifi
                      return (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          <Icon className="w-3 h-3" />
                          {amenity}
                        </Badge>
                      )
                    })}
                    {hotel.amenities.length > 4 && (
                      <Badge variant="outline">+{hotel.amenities.length - 4} more</Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-emerald-600">
                        ₹{hotel.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-gray-600 text-sm ml-1">per night</span>
                    </div>
                    <Button onClick={() => setSelectedHotel(hotel)}>
                      Select Rooms
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Room Selection Dialog */}
      {selectedHotel && !showPayment && (
        <Dialog open={!!selectedHotel} onOpenChange={() => setSelectedHotel(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedHotel.name} - Select Room</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Room Selection */}
              <div className="grid gap-4">
                {selectedHotel.rooms.map((room) => (
                  <Card key={room.id} className={`cursor-pointer transition-colors ${
                    selectedRoom === room.id ? 'border-emerald-500 bg-emerald-50' : ''
                  }`} onClick={() => setSelectedRoom(room.id)}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold">{room.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{room.type}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">Up to {room.capacity} guests</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {room.amenities.map((amenity, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold text-emerald-600">
                            ₹{room.pricePerNight.toLocaleString()}
                          </span>
                          <div className="text-sm text-gray-600">per night</div>
                          <Badge variant={room.available ? "default" : "destructive"} className="mt-1">
                            {room.available ? 'Available' : 'Booked'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Booking Form */}
              {selectedRoom && (
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="guestName">Guest Name *</Label>
                        <Input
                          id="guestName"
                          value={bookingForm.guestName}
                          onChange={(e) => setBookingForm({ ...bookingForm, guestName: e.target.value })}
                          placeholder="Enter guest name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="guestEmail">Email *</Label>
                        <Input
                          id="guestEmail"
                          type="email"
                          value={bookingForm.guestEmail}
                          onChange={(e) => setBookingForm({ ...bookingForm, guestEmail: e.target.value })}
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="guestPhone">Phone Number</Label>
                        <Input
                          id="guestPhone"
                          value={bookingForm.guestPhone}
                          onChange={(e) => setBookingForm({ ...bookingForm, guestPhone: e.target.value })}
                          placeholder="+91 9876543210"
                        />
                      </div>
                      <div>
                        <Label>Check-in Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {bookingForm.checkIn ? format(bookingForm.checkIn, 'PPP') : 'Select date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={bookingForm.checkIn}
                              onSelect={(date) => setBookingForm({ ...bookingForm, checkIn: date })}
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
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {bookingForm.checkOut ? format(bookingForm.checkOut, 'PPP') : 'Select date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={bookingForm.checkOut}
                              onSelect={(date) => setBookingForm({ ...bookingForm, checkOut: date })}
                              disabled={(date) => date <= (bookingForm.checkIn || new Date())}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="guests">Number of Guests</Label>
                        <Select value={bookingForm.guests.toString()} onValueChange={(value) => setBookingForm({ ...bookingForm, guests: parseInt(value) })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num} Guest{num > 1 ? 's' : ''}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        value={bookingForm.specialRequests}
                        onChange={(e) => setBookingForm({ ...bookingForm, specialRequests: e.target.value })}
                        placeholder="Any special requirements or requests..."
                        rows={3}
                      />
                    </div>

                    <Separator />

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span>Nights:</span>
                        <span>{calculateNights()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Rate per night:</span>
                        <span>₹{selectedHotel.rooms.find(r => r.id === selectedRoom)?.pricePerNight.toLocaleString()}</span>
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
                  </CardContent>
                </Card>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Payment Dialog */}
      {showPayment && bookingId && selectedHotel && (
        <Dialog open={showPayment} onOpenChange={setShowPayment}>
          <DialogContent className="max-w-md">
            <PaymentCheckout
              bookingId={bookingId}
              bookingType="hotel"
              amount={calculateTotal()}
              bookingDetails={{
                title: `${selectedHotel.name}`,
                description: `${calculateNights()} nights at ${selectedHotel.rooms.find(r => r.id === selectedRoom)?.name}`,
                reference: bookingId.substring(0, 8).toUpperCase(),
                customerInfo: {
                  name: bookingForm.guestName,
                  email: bookingForm.guestEmail,
                  phone: bookingForm.guestPhone
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
