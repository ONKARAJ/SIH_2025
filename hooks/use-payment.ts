import { useState } from 'react'

interface PaymentOptions {
  bookingId: string
  bookingType: 'hotel' | 'flight'
  amount: number
  currency?: string
  customerInfo?: {
    name: string
    email: string
    phone: string
  }
}

interface PaymentResult {
  success: boolean
  paymentId?: string
  transactionId?: string
  error?: string
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: any) => void
  prefill: {
    name: string
    email: string
    contact: string
  }
  theme: {
    color: string
  }
  modal: {
    ondismiss: () => void
  }
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export function usePayment() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const initiatePayment = async (options: PaymentOptions): Promise<PaymentResult> => {
    setIsLoading(true)
    setError(null)

    try {
      // Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript()
      if (!isScriptLoaded) {
        throw new Error('Failed to load payment gateway')
      }

      // Create payment order
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      })

      const orderData = await response.json()

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create payment order')
      }

      // Initialize Razorpay
      return new Promise((resolve) => {
        const razorpayOptions: RazorpayOptions = {
          key: orderData.data.keyId,
          amount: orderData.data.amount,
          currency: orderData.data.currency,
          name: 'Jharkhand Tourism',
          description: `${options.bookingType === 'hotel' ? 'Hotel' : 'Flight'} Booking Payment`,
          order_id: orderData.data.orderId,
          handler: async (response: any) => {
            try {
              // Verify payment
              const verifyResponse = await fetch('/api/payments/verify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  bookingId: options.bookingId,
                  bookingType: options.bookingType,
                }),
              })

              const verifyData = await verifyResponse.json()

              if (verifyData.success) {
                resolve({
                  success: true,
                  paymentId: orderData.data.paymentId,
                  transactionId: response.razorpay_payment_id,
                })
              } else {
                resolve({
                  success: false,
                  error: verifyData.error || 'Payment verification failed',
                })
              }
            } catch (error) {
              resolve({
                success: false,
                error: 'Payment verification failed',
              })
            }
          },
          prefill: {
            name: orderData.data.customerDetails?.name || options.customerInfo?.name || '',
            email: orderData.data.customerDetails?.email || options.customerInfo?.email || '',
            contact: orderData.data.customerDetails?.contact || options.customerInfo?.phone || '',
          },
          theme: {
            color: '#10B981', // Emerald green
          },
          modal: {
            ondismiss: () => {
              resolve({
                success: false,
                error: 'Payment cancelled by user',
              })
            },
          },
        }

        const razorpay = new window.Razorpay(razorpayOptions)
        razorpay.open()
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed'
      setError(errorMessage)
      return {
        success: false,
        error: errorMessage,
      }
    } finally {
      setIsLoading(false)
    }
  }

  const checkPaymentStatus = async (bookingId: string, bookingType: string) => {
    try {
      const response = await fetch(`/api/payments/status?bookingId=${bookingId}&bookingType=${bookingType}`)
      const data = await response.json()
      
      if (data.success) {
        return data.data
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error checking payment status:', error)
      return null
    }
  }

  const initiateRefund = async (paymentId: string, amount?: number, reason?: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/payments/refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentId,
          amount,
          reason,
        }),
      })

      const data = await response.json()

      if (data.success) {
        return {
          success: true,
          refundId: data.data.refundId,
          message: data.data.message,
        }
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Refund failed'
      setError(errorMessage)
      return {
        success: false,
        error: errorMessage,
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    initiatePayment,
    checkPaymentStatus,
    initiateRefund,
    isLoading,
    error,
  }
}
