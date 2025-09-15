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

    // Find the payment record
    const payment = await db.payment.findFirst({
      where: {
        bookingId,
        bookingType,
        orderId: razorpay_order_id,
        status: 'pending'
      }
    })

    if (!payment) {
      return NextResponse.json({
        success: false,
        error: 'Payment record not found or already processed'
      }, { status: 404 })
    }

    // Update payment record
    const updatedPayment = await db.payment.update({
      where: { id: payment.id },
      data: {
        status: 'completed',
        transactionId: razorpay_payment_id,
        completedAt: new Date(),
        metadata: JSON.stringify({
          ...JSON.parse(payment.metadata || '{}'),
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          verifiedAt: new Date().toISOString()
        })
      }
    })

    // Update booking with payment details
    let updatedBooking
    if (bookingType === 'hotel') {
      updatedBooking = await db.hotelBooking.update({
        where: { id: bookingId },
        data: {
          paymentStatus: 'completed',
          status: 'confirmed',
          updatedAt: new Date()
        }
      })
    } else if (bookingType === 'flight') {
      updatedBooking = await db.flightBooking.update({
        where: { id: bookingId },
        data: {
          paymentStatus: 'completed',
          status: 'confirmed',
          updatedAt: new Date()
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        payment: updatedPayment,
        booking: updatedBooking,
        transactionId: razorpay_payment_id
      }
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json({
      success: false,
      error: 'Payment verification failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
