import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// This API route uses dynamic parameters
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('bookingId')
    const bookingType = searchParams.get('bookingType')
    const paymentId = searchParams.get('paymentId')

    if (!bookingId || !bookingType) {
      return NextResponse.json({
        success: false,
        error: 'Missing bookingId or bookingType'
      }, { status: 400 })
    }

    let payment
    if (paymentId) {
      // Get specific payment by ID
      payment = await db.payment.findUnique({
        where: { id: paymentId }
      })
    } else {
      // Get latest payment for booking
      payment = await db.payment.findFirst({
        where: {
          bookingId,
          bookingType
        },
        orderBy: { createdAt: 'desc' }
      })
    }

    if (!payment) {
      return NextResponse.json({
        success: false,
        error: 'Payment not found'
      }, { status: 404 })
    }

    // Get booking details
    let booking
    if (bookingType === 'hotel') {
      booking = await db.hotelBooking.findUnique({
        where: { id: bookingId },
        select: {
          id: true,
          bookingRef: true,
          status: true,
          paymentStatus: true,
          totalAmount: true,
          hotel: { select: { name: true } },
          room: { select: { name: true, type: true } },
          checkIn: true,
          checkOut: true,
          guests: true
        }
      })
    } else if (bookingType === 'flight') {
      booking = await db.flightBooking.findUnique({
        where: { id: bookingId },
        select: {
          id: true,
          pnr: true,
          status: true,
          paymentStatus: true,
          totalAmount: true,
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
          passengers: true
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        payment: {
          id: payment.id,
          status: payment.status,
          amount: payment.amount,
          currency: payment.currency,
          paymentGateway: payment.paymentGateway,
          orderId: payment.orderId,
          transactionId: payment.transactionId,
          createdAt: payment.createdAt,
          completedAt: payment.completedAt
        },
        booking,
        bookingType
      }
    })
  } catch (error) {
    console.error('Error fetching payment status:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch payment status'
    }, { status: 500 })
  }
}
