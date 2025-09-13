import { NextRequest, NextResponse } from 'next/server'
import { razorpay } from '@/lib/razorpay'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bookingId, bookingType, amount, currency = 'INR' } = body

    if (!bookingId || !bookingType || !amount) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    let booking
    if (bookingType === 'hotel') {
      booking = await db.hotelBooking.findUnique({
        where: { id: bookingId },
        include: {
          hotel: { select: { name: true } },
          user: { select: { email: true, phone: true } }
        }
      })
    } else if (bookingType === 'flight') {
      booking = await db.flightBooking.findUnique({
        where: { id: bookingId },
        include: {
          flight: { select: { airline: true, flightNumber: true } },
          user: { select: { email: true, phone: true } }
        }
      })
    }

    if (!booking) {
      return NextResponse.json({
        success: false,
        error: 'Booking not found'
      }, { status: 404 })
    }

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paisa
      currency: currency,
      receipt: `booking_${bookingId}_${Date.now()}`,
      payment_capture: true,
      notes: {
        bookingId,
        bookingType,
        userEmail: booking.user.email
      }
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_sandbox'
    })
  } catch (error) {
    console.error('Error creating payment order:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create payment order'
    }, { status: 500 })
  }
}
