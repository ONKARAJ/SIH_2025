'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import HotelBooking from '@/components/booking/hotel-booking'
import FlightBooking from '@/components/booking/flight-booking'
import { Hotel, Plane, Calendar, CreditCard } from 'lucide-react'

function BookingsContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('hotels')

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'hotels' || tab === 'flights') {
      setActiveTab(tab)
    }
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Book Your Travel</h1>
        <p className="text-gray-600">Find and book hotels and flights for your Jharkhand adventure</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="hotels" className="flex items-center gap-2">
            <Hotel className="w-4 h-4" />
            Hotels
          </TabsTrigger>
          <TabsTrigger value="flights" className="flex items-center gap-2">
            <Plane className="w-4 h-4" />
            Flights
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="hotels">
          <HotelBooking />
        </TabsContent>
        
        <TabsContent value="flights">
          <FlightBooking />
        </TabsContent>
      </Tabs>

      {/* Benefits Section */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Instant Booking</h3>
            <p className="text-sm text-gray-600">
              Book hotels and flights instantly with real-time availability and confirmation
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <CreditCard className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
            <p className="text-sm text-gray-600">
              Safe and secure payment processing with multiple payment options
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Hotel className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
            <p className="text-sm text-gray-600">
              Competitive prices with no hidden fees and transparent pricing
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function BookingsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    }>
      <BookingsContent />
    </Suspense>
  )
}
