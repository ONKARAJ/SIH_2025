import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
      bookingType 
    } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId || !bookingType) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    // Verify signature
    const hmac = createHmac('sha256', process.env.RAZORPAY_SECRET || 'sandbox_secret')
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const generated_signature = hmac.digest('hex')

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({
        success: false,
        error: 'Invalid payment signature'
      }, { status: 400 })
    }

    // Update booking with payment details
    let updatedBooking
    if (bookingType === 'hotel') {
      updatedBooking = await db.hotelBooking.update({
        where: { id: bookingId },
        data: {
          paymentId: razorpay_payment_id,
          paymentStatus: 'completed',
          status: 'confirmed'
        }
      })
    } else if (bookingType === 'flight') {
      updatedBooking = await db.flightBooking.update({
        where: { id: bookingId },
        data: {
          paymentId: razorpay_payment_id,
          paymentStatus: 'completed',
          status: 'confirmed'
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      booking: updatedBooking
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json({
      success: false,
      error: 'Payment verification failed'
    }, { status: 500 })
  }
}
