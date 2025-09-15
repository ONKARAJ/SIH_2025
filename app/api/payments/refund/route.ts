import { NextRequest, NextResponse } from 'next/server'
import { razorpay } from '@/lib/razorpay'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentId, amount, reason = 'Booking cancellation' } = body

    if (!paymentId) {
      return NextResponse.json({
        success: false,
        error: 'Missing paymentId'
      }, { status: 400 })
    }

    // Find the payment record
    const payment = await db.payment.findUnique({
      where: { id: paymentId },
      include: {
        hotelBooking: {
          include: {
            hotel: { select: { name: true } },
            user: { select: { name: true, email: true } }
          }
        },
        flightBooking: {
          include: {
            flight: { select: { airline: true, flightNumber: true } },
            user: { select: { name: true, email: true } }
          }
        }
      }
    })

    if (!payment) {
      return NextResponse.json({
        success: false,
        error: 'Payment not found'
      }, { status: 404 })
    }

    if (payment.status !== 'completed') {
      return NextResponse.json({
        success: false,
        error: 'Can only refund completed payments'
      }, { status: 400 })
    }

    if (!payment.transactionId) {
      return NextResponse.json({
        success: false,
        error: 'No transaction ID found for refund'
      }, { status: 400 })
    }

    // Calculate refund amount (use partial amount if provided, otherwise full amount)
    const refundAmount = amount || payment.amount
    
    if (refundAmount > payment.amount) {
      return NextResponse.json({
        success: false,
        error: 'Refund amount cannot exceed payment amount'
      }, { status: 400 })
    }

    // Create refund in Razorpay
    const refund = await razorpay.payments.refund(payment.transactionId, {
      amount: Math.round(refundAmount * 100), // Convert to paise
      notes: {
        reason,
        bookingId: payment.bookingId,
        bookingType: payment.bookingType
      }
    })

    // Create refund record in database
    const refundRecord = await db.refund.create({
      data: {
        paymentId: payment.id,
        amount: refundAmount,
        reason,
        status: 'processing',
        refundId: refund.id,
        metadata: JSON.stringify({
          razorpayRefund: refund,
          initiatedAt: new Date().toISOString()
        })
      }
    })

    // Update payment status
    await db.payment.update({
      where: { id: payment.id },
      data: {
        status: refundAmount === payment.amount ? 'refunded' : 'partially_refunded'
      }
    })

    // Update booking status
    if (payment.bookingType === 'hotel') {
      await db.hotelBooking.update({
        where: { id: payment.bookingId },
        data: {
          status: 'cancelled',
          paymentStatus: refundAmount === payment.amount ? 'refunded' : 'partially_refunded',
          updatedAt: new Date()
        }
      })
    } else if (payment.bookingType === 'flight') {
      await db.flightBooking.update({
        where: { id: payment.bookingId },
        data: {
          status: 'cancelled',
          paymentStatus: refundAmount === payment.amount ? 'refunded' : 'partially_refunded',
          updatedAt: new Date()
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        refundId: refundRecord.id,
        razorpayRefundId: refund.id,
        amount: refundAmount,
        status: 'processing',
        message: 'Refund initiated successfully. It may take 5-7 business days to reflect in your account.'
      }
    })
  } catch (error) {
    console.error('Error processing refund:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process refund',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
