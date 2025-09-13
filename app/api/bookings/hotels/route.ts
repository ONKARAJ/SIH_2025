import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { v4 as uuidv4 } from 'uuid'

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

    const bookings = await db.hotelBooking.findMany({
      where: whereClause,
      include: {
        hotel: {
          select: {
            id: true,
            name: true,
            city: true,
            address: true
          }
        },
        room: {
          select: {
            id: true,
            name: true,
            type: true
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
    console.error('Error fetching hotel bookings:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch hotel bookings'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      hotelId,
      roomId,
      checkIn,
      checkOut,
      guests,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests
    } = body

    if (!userId || !hotelId || !roomId || !checkIn || !checkOut || !guests || !guestName || !guestEmail || !guestPhone) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    const room = await db.room.findUnique({
      where: { id: roomId },
      include: { hotel: true }
    })

    if (!room) {
      return NextResponse.json({
        success: false,
        error: 'Room not found'
      }, { status: 404 })
    }

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))

    if (nights <= 0) {
      return NextResponse.json({
        success: false,
        error: 'Invalid date range'
      }, { status: 400 })
    }

    const conflictingBookings = await db.hotelBooking.findMany({
      where: {
        roomId,
        status: { in: ['confirmed', 'pending'] },
        OR: [
          {
            AND: [
              { checkIn: { lte: checkInDate } },
              { checkOut: { gt: checkInDate } }
            ]
          },
          {
            AND: [
              { checkIn: { lt: checkOutDate } },
              { checkOut: { gte: checkOutDate } }
            ]
          },
          {
            AND: [
              { checkIn: { gte: checkInDate } },
              { checkOut: { lte: checkOutDate } }
            ]
          }
        ]
      }
    })

    if (conflictingBookings.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Room not available for selected dates'
      }, { status: 409 })
    }

    const totalAmount = room.basePrice * nights

    const booking = await db.hotelBooking.create({
      data: {
        userId,
        hotelId,
        roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: parseInt(guests),
        totalAmount,
        guestName,
        guestEmail,
        guestPhone,
        specialRequests
      },
      include: {
        hotel: {
          select: {
            name: true,
            city: true,
            address: true
          }
        },
        room: {
          select: {
            name: true,
            type: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      booking
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating hotel booking:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create hotel booking'
    }, { status: 500 })
  }
}
