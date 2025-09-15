'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, CreditCard, Shield, Clock } from 'lucide-react'
import { usePayment } from '@/hooks/use-payment'
import { toast } from 'sonner'

interface PaymentCheckoutProps {
  bookingId: string
  bookingType: 'hotel' | 'flight'
  amount: number
  currency?: string
  bookingDetails: any // Make this flexible to handle different structures
  onSuccess?: (paymentData: any) => void
  onError?: (error: string) => void
  // Legacy support
  onPaymentSuccess?: (paymentData: any) => void
  onPaymentError?: (error: string) => void
}

export default function PaymentCheckout({
  bookingId,
  bookingType,
  amount,
  currency = 'INR',
  bookingDetails,
  onSuccess,
  onError,
  onPaymentSuccess,
  onPaymentError
}: PaymentCheckoutProps) {
  const { initiatePayment, isLoading, error } = usePayment()
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle')
  
  // Helper function to get customer info from flexible structure
  const getCustomerInfo = () => {
    if (bookingDetails.customerInfo) {
      return bookingDetails.customerInfo
    }
    // Handle new flexible structure
    return {
      name: bookingDetails.guestName || bookingDetails.contactName || 'Guest',
      email: bookingDetails.guestEmail || bookingDetails.contactEmail || '',
      phone: bookingDetails.guestPhone || bookingDetails.contactPhone || ''
    }
  }
  
  const customerInfo = getCustomerInfo()

  const handlePayment = async () => {
    setPaymentStatus('processing')

    try {
      const result = await initiatePayment({
        bookingId,
        bookingType,
        amount,
        currency,
        customerInfo
      })

      if (result.success) {
        setPaymentStatus('success')
        toast.success('Payment completed successfully!')
        // Call both new and legacy callback functions
        onSuccess?.(result)
        onPaymentSuccess?.(result)
      } else {
        setPaymentStatus('failed')
        toast.error(result.error || 'Payment failed')
        onError?.(result.error || 'Payment failed')
        onPaymentError?.(result.error || 'Payment failed')
      }
    } catch (error) {
      setPaymentStatus('failed')
      const errorMessage = error instanceof Error ? error.message : 'Payment failed'
      toast.error(errorMessage)
      onError?.(errorMessage)
      onPaymentError?.(errorMessage)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Checkout
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Booking Details */}
        <div className="space-y-3">
          {bookingType === 'hotel' && (
            <>
              <h3 className="font-semibold text-lg">{bookingDetails.hotelName || bookingDetails.title}</h3>
              <p className="text-sm text-gray-600">{bookingDetails.roomType ? `Room: ${bookingDetails.roomType}` : bookingDetails.description}</p>
              {bookingDetails.checkIn && (
                <div className="text-sm text-gray-600">
                  Check-in: {bookingDetails.checkIn} | Check-out: {bookingDetails.checkOut} | {bookingDetails.nights} nights
                </div>
              )}
            </>
          )}
          
          {bookingType === 'flight' && (
            <>
              <h3 className="font-semibold text-lg">{bookingDetails.airline} {bookingDetails.flightNumber}</h3>
              <p className="text-sm text-gray-600">{bookingDetails.route}</p>
              {bookingDetails.travelDate && (
                <div className="text-sm text-gray-600">
                  Travel Date: {bookingDetails.travelDate} | Class: {bookingDetails.classType} | Passengers: {bookingDetails.passengers}
                </div>
              )}
            </>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Customer:</span>
            <span className="text-sm font-medium">{customerInfo.name}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Email:</span>
            <span className="text-sm">{customerInfo.email}</span>
          </div>
        </div>

        <hr />

        {/* Payment Amount */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Amount:</span>
            <span className="text-2xl font-bold text-emerald-600">
              {currency} {amount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Payment Status */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-600 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Payment completed successfully!
            </p>
          </div>
        )}

        {/* Payment Button */}
        <Button
          onClick={handlePayment}
          disabled={isLoading || paymentStatus === 'processing' || paymentStatus === 'success'}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
          size="lg"
        >
          {isLoading || paymentStatus === 'processing' ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing Payment...
            </>
          ) : paymentStatus === 'success' ? (
            'Payment Completed'
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Pay {currency} {amount.toLocaleString()}
            </>
          )}
        </Button>

        {/* Security Notice */}
        <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
          <Shield className="w-3 h-3" />
          <span>Secured by Razorpay</span>
          <Clock className="w-3 h-3 ml-2" />
          <span>256-bit SSL encryption</span>
        </div>

        {/* Payment Methods Info */}
        <div className="text-xs text-gray-400 text-center">
          Accepts all major credit/debit cards, UPI, net banking, and wallets
        </div>
      </CardContent>
    </Card>
  )
}
