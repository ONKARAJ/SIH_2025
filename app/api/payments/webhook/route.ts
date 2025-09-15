import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { db } from '@/lib/db'
import { RAZORPAY_WEBHOOK_SECRET } from '@/lib/razorpay'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature')

    if (!signature) {
      return NextResponse.json({
        success: false,
        error: 'Missing signature'
      }, { status: 400 })
    }

    // Verify webhook signature
    const hmac = createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
    hmac.update(body)
    const generated_signature = hmac.digest('hex')

    if (generated_signature !== signature) {
      console.error('Invalid webhook signature')
      return NextResponse.json({
        success: false,
        error: 'Invalid signature'
      }, { status: 400 })
    }

    const event = JSON.parse(body)
    const { entity: eventType, payload } = event

    if (eventType === 'payment.captured') {
      const payment = payload.payment.entity
      const orderId = payment.order_id
      const paymentId = payment.id
      const amount = payment.amount / 100 // Convert from paise to rupees

      // Find the payment record
      const paymentRecord = await db.payment.findFirst({
        where: {
          orderId: orderId,
          status: 'pending'
        }
      })

      if (!paymentRecord) {
        console.error(`Payment record not found for order: ${orderId}`)
        return NextResponse.json({
          success: false,
          error: 'Payment record not found'
        }, { status: 404 })
      }

      // Update payment record
      await db.payment.update({
        where: { id: paymentRecord.id },
        data: {
          status: 'completed',
          transactionId: paymentId,
          completedAt: new Date(),
          metadata: JSON.stringify({
            ...JSON.parse(paymentRecord.metadata || '{}'),
            webhookData: payment,
            capturedAt: new Date().toISOString()
          })
        }
      })

      // Update booking status
      if (paymentRecord.bookingType === 'hotel') {
        await db.hotelBooking.update({
          where: { id: paymentRecord.bookingId },
          data: {
            paymentStatus: 'completed',
            status: 'confirmed',
            updatedAt: new Date()
          }
        })
      } else if (paymentRecord.bookingType === 'flight') {
        await db.flightBooking.update({
          where: { id: paymentRecord.bookingId },
          data: {
            paymentStatus: 'completed',
            status: 'confirmed',
            updatedAt: new Date()
          }
        })
      }

      console.log(`Payment completed for booking: ${paymentRecord.bookingId}`)
    } else if (eventType === 'payment.failed') {
      const payment = payload.payment.entity
      const orderId = payment.order_id

      // Find and update payment record
      const paymentRecord = await db.payment.findFirst({
        where: {
          orderId: orderId,
          status: 'pending'
        }
      })

      if (paymentRecord) {
        await db.payment.update({
          where: { id: paymentRecord.id },
          data: {
            status: 'failed',
            metadata: JSON.stringify({
              ...JSON.parse(paymentRecord.metadata || '{}'),
              failureReason: payment.error_description,
              failedAt: new Date().toISOString()
            })
          }
        })

        // Update booking status
        if (paymentRecord.bookingType === 'hotel') {
          await db.hotelBooking.update({
            where: { id: paymentRecord.bookingId },
            data: {
              paymentStatus: 'failed',
              updatedAt: new Date()
            }
          })
        } else if (paymentRecord.bookingType === 'flight') {
          await db.flightBooking.update({
            where: { id: paymentRecord.bookingId },
            data: {
              paymentStatus: 'failed',
              updatedAt: new Date()
            }
          })
        }

        console.log(`Payment failed for booking: ${paymentRecord.bookingId}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully'
    })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({
      success: false,
      error: 'Webhook processing failed'
    }, { status: 500 })
  }
}
