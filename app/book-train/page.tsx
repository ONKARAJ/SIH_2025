'use client'

import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Train, Clock, MapPin, ArrowRight } from 'lucide-react'

export default function BookTrainPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-600/10 to-blue-600/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Train className="w-12 h-12 text-green-600" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Book Train Tickets to Jharkhand
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Travel to Jharkhand by train with convenient connections to major cities. 
            Book your railway tickets and explore the beautiful state comfortably.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="text-center p-8 border-2 border-dashed border-green-200">
              <CardContent className="space-y-6">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Train className="w-12 h-12 text-green-600" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Train Booking Coming Soon!
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    We're working on integrating railway booking services to help you plan your 
                    train journey to Jharkhand. This feature will be available soon with real-time 
                    train schedules, seat availability, and instant booking.
                  </p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">Major Railway Stations in Jharkhand:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Ranchi Railway Station (RNC)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Dhanbad Junction (DHN)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Jamshedpur Railway Station (TATA)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Bokaro Steel City (BKSC)</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => window.history.back()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Go Back to Places
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Temporary Alternatives */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meanwhile, Book Your Stay & Flights
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              While we prepare train booking services, you can book hotels and flights 
              for your Jharkhand trip.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Train className="w-5 h-5 text-blue-600" />
                  Book Flights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Fly to Ranchi or Deoghar airports with multiple daily flights from major cities.
                </p>
                <Button 
                  onClick={() => window.location.href = '/book-flights'}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Book Flights Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Train className="w-5 h-5 text-purple-600" />
                  Book Hotels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Find comfortable accommodations across Jharkhand's beautiful destinations.
                </p>
                <Button 
                  onClick={() => window.location.href = '/book-hotels'}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Book Hotels Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
