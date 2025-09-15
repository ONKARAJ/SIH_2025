'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PaymentCheckout from '@/components/payment/payment-checkout'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { CreditCard, TestTube, CheckCircle, XCircle } from 'lucide-react'

export default function TestPaymentPage() {
  const [formData, setFormData] = useState({
    bookingType: 'hotel' as 'hotel' | 'flight',
    amount: 2500,
    customerName: 'Test Customer',
    customerEmail: 'test@example.com',
    customerPhone: '+919876543210'
  })
  
  const [showPayment, setShowPayment] = useState(false)
  const [mockBookingId, setMockBookingId] = useState<string>('')
  const [paymentResult, setPaymentResult] = useState<any>(null)

  const generateMockBooking = async () => {
    try {
      // Create a mock booking for testing
      const endpoint = formData.bookingType === 'hotel' 
        ? '/api/bookings/hotels' 
        : '/api/bookings/flights'
      
      const bookingData = formData.bookingType === 'hotel' 
        ? {
            hotelId: 'test-hotel-001',
            roomId: 'test-room-001',
            checkIn: new Date().toISOString().split('T')[0],
            checkOut: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            guests: 2,
            guestName: formData.customerName,
            guestEmail: formData.customerEmail,
            guestPhone: formData.customerPhone,
            totalAmount: formData.amount,
            specialRequests: 'Test booking for payment integration'
          }
        : {
            flightId: 'test-flight-001',
            passengers: [{
              firstName: formData.customerName.split(' ')[0] || 'Test',
              lastName: formData.customerName.split(' ')[1] || 'Customer',
              age: 30,
              gender: 'male'
            }],
            contactEmail: formData.customerEmail,
            contactPhone: formData.customerPhone,
            totalAmount: formData.amount
          }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      })

      const result = await response.json()
      
      if (result.success) {
        setMockBookingId(result.booking.id)
        setShowPayment(true)
        toast.success('Mock booking created! Ready for payment test.')
      } else {
        toast.error('Failed to create mock booking: ' + result.error)
      }
    } catch (error) {
      console.error('Error creating mock booking:', error)
      toast.error('Failed to create mock booking')
    }
  }

  const handlePaymentSuccess = (paymentData: any) => {
    setPaymentResult({ success: true, data: paymentData })
    toast.success('Payment test completed successfully!')
  }

  const handlePaymentError = (error: string) => {
    setPaymentResult({ success: false, error })
    toast.error('Payment test failed: ' + error)
  }

  const resetTest = () => {
    setShowPayment(false)
    setMockBookingId('')
    setPaymentResult(null)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
          <TestTube className="w-8 h-8 text-emerald-600" />
          Payment Gateway Testing
        </h1>
        <p className="text-gray-600">Test the Razorpay payment integration with mock bookings</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Test Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Test Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bookingType">Booking Type</Label>
              <Select
                value={formData.bookingType}
                onValueChange={(value: 'hotel' | 'flight') => 
                  setFormData({ ...formData, bookingType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hotel Booking</SelectItem>
                  <SelectItem value="flight">Flight Booking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="customerEmail">Email</Label>
              <Input
                id="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="customerPhone">Phone</Label>
              <Input
                id="customerPhone"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              />
            </div>

            <Button 
              onClick={generateMockBooking}
              className="w-full"
              disabled={showPayment}
            >
              {showPayment ? 'Booking Created' : 'Create Test Booking & Pay'}
            </Button>

            {mockBookingId && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Mock Booking ID:</strong> {mockBookingId}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Component */}
        {showPayment && mockBookingId && (
          <PaymentCheckout
            bookingId={mockBookingId}
            bookingType={formData.bookingType}
            amount={formData.amount}
            bookingDetails={{
              title: `Test ${formData.bookingType === 'hotel' ? 'Hotel' : 'Flight'} Booking`,
              description: 'This is a test booking for payment gateway integration',
              reference: mockBookingId.substring(0, 8).toUpperCase(),
              customerInfo: {
                name: formData.customerName,
                email: formData.customerEmail,
                phone: formData.customerPhone
              }
            }}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        )}
      </div>

      {/* Payment Result */}
      {paymentResult && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {paymentResult.success ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Payment Test Result: Success
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-600" />
                  Payment Test Result: Failed
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paymentResult.success ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Payment ID:</span>
                  <Badge variant="outline">{paymentResult.data.paymentId}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Transaction ID:</span>
                  <Badge variant="outline">{paymentResult.data.transactionId}</Badge>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">
                    ✅ Payment gateway integration is working correctly!
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">
                  ❌ Error: {paymentResult.error}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Test Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Test Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-semibold">How to Test:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Fill in the test form with mock data</li>
              <li>Click "Create Test Booking & Pay" to generate a mock booking</li>
              <li>The payment checkout component will appear</li>
              <li>Click "Pay" button to open Razorpay payment gateway</li>
              <li>Use Razorpay test card details for testing</li>
            </ol>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Test Card Details (Razorpay):</h4>
            <div className="bg-gray-50 p-3 rounded-md text-sm font-mono">
              <p><strong>Card Number:</strong> 4111 1111 1111 1111</p>
              <p><strong>Expiry:</strong> Any future date</p>
              <p><strong>CVV:</strong> Any 3 digits</p>
              <p><strong>Name:</strong> Any name</p>
            </div>
          </div>

          <Button onClick={resetTest} variant="outline" className="mt-4">
            Reset Test
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
