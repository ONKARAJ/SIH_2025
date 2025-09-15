'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Hotel, Plane, Calendar, User, Mail, Phone, Download, ArrowRight } from 'lucide-react'

function BookingSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [bookingDetails, setBookingDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const bookingType = searchParams.get('type')
  const bookingId = searchParams.get('id')

  useEffect(() => {
    if (bookingId && bookingType) {
      // In a real app, you would fetch booking details from API
      // For now, we'll show a success message
      setBookingDetails({
        id: bookingId,
        type: bookingType,
        status: 'confirmed'
      })
    }
    setLoading(false)
  }, [bookingId, bookingType])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Booking Not Found</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't find the booking details.
              </p>
              <Button onClick={() => router.push('/')}>
                Return Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Your {bookingType} booking has been successfully confirmed and payment received.
            </p>
          </div>

          {/* Booking Details Card */}
          <Card className="mb-8">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2 text-green-800">
                {bookingType === 'hotel' ? (
                  <Hotel className="w-5 h-5" />
                ) : (
                  <Plane className="w-5 h-5" />
                )}
                {bookingType === 'hotel' ? 'Hotel Booking' : 'Flight Booking'} Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Booking Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Booking ID:</span>
                      <span className="font-medium">{bookingId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className="bg-green-100 text-green-800">
                        Confirmed
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Booking Date:</span>
                      <span className="font-medium">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">What's Next?</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 mt-0.5 text-blue-600" />
                      <span>Confirmation email sent to your registered email address</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 mt-0.5 text-green-600" />
                      <span>You may receive a confirmation call within 24 hours</span>
                    </div>
                    {bookingType === 'hotel' && (
                      <div className="flex items-start gap-2">
                        <Hotel className="w-4 h-4 mt-0.5 text-purple-600" />
                        <span>Check-in details will be shared 1 day before your stay</span>
                      </div>
                    )}
                    {bookingType === 'flight' && (
                      <div className="flex items-start gap-2">
                        <Plane className="w-4 h-4 mt-0.5 text-orange-600" />
                        <span>E-ticket will be emailed shortly. Check-in opens 24 hours before departure</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => window.print()}
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => router.push('/contact')}
              className="flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Contact Support
            </Button>
            
            <Button
              onClick={() => router.push('/')}
              className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
            >
              Continue Exploring
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Important Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                {bookingType === 'hotel' && (
                  <>
                    <div>
                      <h4 className="font-semibold mb-1">Check-in Policy</h4>
                      <p className="text-muted-foreground">
                        Standard check-in time is 2:00 PM and check-out is 11:00 AM. 
                        Valid ID proof is required at check-in.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Cancellation Policy</h4>
                      <p className="text-muted-foreground">
                        Free cancellation until 24 hours before check-in. 
                        Contact our support team for any modifications.
                      </p>
                    </div>
                  </>
                )}
                
                {bookingType === 'flight' && (
                  <>
                    <div>
                      <h4 className="font-semibold mb-1">Check-in Information</h4>
                      <p className="text-muted-foreground">
                        Online check-in opens 24 hours before departure. 
                        Arrive at airport 2 hours before domestic flights.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Baggage Policy</h4>
                      <p className="text-muted-foreground">
                        Check airline-specific baggage policies. Additional charges may apply for excess baggage.
                      </p>
                    </div>
                  </>
                )}
                
                <div>
                  <h4 className="font-semibold mb-1">Need Help?</h4>
                  <p className="text-muted-foreground">
                    Our customer support team is available 24/7 to assist you. 
                    Contact us at support@jharkhndtourism.com or call +91-XXXX-XXXX-XX
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </div>
    }>
      <BookingSuccessContent />
    </Suspense>
  )
}
