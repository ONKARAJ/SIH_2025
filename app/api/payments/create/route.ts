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

    if (amount <= 0) {
      return NextResponse.json({
        success: false,
        error: 'Invalid amount'
      }, { status: 400 })
    }

    // Validate booking exists and get details
    let booking
    if (bookingType === 'hotel') {
      booking = await db.hotelBooking.findUnique({
        where: { id: bookingId },
        include: {
          hotel: { select: { name: true, location: true } },
          room: { select: { name: true, type: true } },
          user: { select: { name: true, email: true, phone: true } }
        }
      })
    } else if (bookingType === 'flight') {
      booking = await db.flightBooking.findUnique({
        where: { id: bookingId },
        include: {
          flight: { 
            select: { 
              airline: true, 
              flightNumber: true,
              departure: true,
              arrival: true,
              departureTime: true,
              arrivalTime: true
            } 
          },
          user: { select: { name: true, email: true, phone: true } }
        }
      })
    }

    if (!booking) {
      return NextResponse.json({
        success: false,
        error: 'Booking not found'
      }, { status: 404 })
    }

    if (booking.paymentStatus === 'completed' || booking.paymentStatus === 'paid') {
      return NextResponse.json({
        success: false,
        error: 'Booking already paid'
      }, { status: 400 })
    }

    if (booking.status === 'cancelled') {
      return NextResponse.json({
        success: false,
        error: 'Cannot process payment for cancelled booking'
      }, { status: 400 })
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paisa
      currency: currency,
      receipt: `${bookingType}_${bookingId}_${Date.now()}`,
      payment_capture: true,
      notes: {
        bookingId,
        bookingType,
        userEmail: booking.user.email,
        userName: booking.user.name,
        bookingRef: booking.bookingRef || booking.pnr || bookingId
      }
    }

    const order = await razorpay.orders.create(options)

    // Create payment record in database
    const payment = await db.payment.create({
      data: {
        bookingId,
        bookingType,
        amount,
        currency,
        paymentGateway: 'razorpay',
        orderId: order.id,
        status: 'pending',
        metadata: JSON.stringify({
          razorpayOrderId: order.id,
          receipt: order.receipt,
          customerDetails: {
            name: booking.user.name,
            email: booking.user.email,
            phone: booking.user.phone
          }
        })
      }
    })

    // Update booking with payment ID and set payment status to pending
    if (bookingType === 'hotel') {
      await db.hotelBooking.update({
        where: { id: bookingId },
        data: { 
          paymentId: payment.id,
          paymentStatus: 'pending'
        }
      })
    } else if (bookingType === 'flight') {
      await db.flightBooking.update({
        where: { id: bookingId },
        data: { 
          paymentId: payment.id,
          paymentStatus: 'pending'
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        paymentId: payment.id,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_sandbox',
        customerDetails: {
          name: booking.user.name,
          email: booking.user.email,
          contact: booking.user.phone
        },
        bookingDetails: {
          id: bookingId,
          type: bookingType,
          reference: booking.bookingRef || booking.pnr || bookingId
        }
      }
    })
  } catch (error) {
    console.error('Error creating payment order:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create payment order',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
