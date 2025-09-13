import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { v4 as uuidv4 } from 'uuid'

function generateBookingRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')

    let whereClause: any = {}

    if (userId) {
      whereClause.userId = userId
    }

    if (status) {
      whereClause.status = status
    }

    const bookings = await db.flightBooking.findMany({
      where: whereClause,
      include: {
        flight: {
          select: {
            airline: true,
            flightNumber: true,
            departure: true,
            arrival: true,
            departureTime: true,
            arrivalTime: true,
            duration: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      bookings
    })
  } catch (error) {
    console.error('Error fetching flight bookings:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch flight bookings'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      flightId,
      passengers,
      contactEmail,
      contactPhone
    } = body

    if (!userId || !flightId || !passengers || !contactEmail || !contactPhone) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    if (!Array.isArray(passengers) || passengers.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'At least one passenger is required'
      }, { status: 400 })
    }

    for (const passenger of passengers) {
      if (!passenger.firstName || !passenger.lastName || !passenger.gender || !passenger.age) {
        return NextResponse.json({
          success: false,
          error: 'Incomplete passenger information'
        }, { status: 400 })
      }
    }

    const flight = await db.flight.findUnique({
      where: { id: flightId }
    })

    if (!flight) {
      return NextResponse.json({
        success: false,
        error: 'Flight not found'
      }, { status: 404 })
    }

    if (flight.availableSeats < passengers.length) {
      return NextResponse.json({
        success: false,
        error: 'Not enough seats available'
      }, { status: 409 })
    }

    const totalAmount = flight.price * passengers.length
    const bookingRef = generateBookingRef()

    const booking = await db.flightBooking.create({
      data: {
        userId,
        flightId,
        passengers: JSON.stringify(passengers),
        totalAmount,
        bookingRef,
        contactEmail,
        contactPhone
      },
      include: {
        flight: {
          select: {
            airline: true,
            flightNumber: true,
            departure: true,
            arrival: true,
            departureTime: true,
            arrivalTime: true,
            duration: true
          }
        }
      }
    })

    await db.flight.update({
      where: { id: flightId },
      data: {
        availableSeats: flight.availableSeats - passengers.length
      }
    })

    return NextResponse.json({
      success: true,
      booking
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating flight booking:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create flight booking'
    }, { status: 500 })
  }
}
