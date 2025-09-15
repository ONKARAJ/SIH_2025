import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

// Lazy load db to avoid issues during build time
let db: any = null

async function getDb() {
  if (!db) {
    try {
      const dbModule = await import('@/lib/db')
      db = dbModule.db
    } catch (error) {
      console.error('Failed to initialize database:', error)
      throw new Error('Database initialization failed')
    }
  }
  return db
}

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
    const database = await getDb()
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

    const bookings = await database.flightBooking.findMany({
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
      flightId,
      airline,
      flightNumber,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      travelDate,
      classType,
      passengers,
      contactName,
      contactEmail,
      contactPhone,
      totalAmount,
      specialRequests
    } = body

    console.log('Flight booking request:', body)

    if (!flightId || !airline || !passengers || !contactEmail || !contactPhone || !contactName) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: ' + JSON.stringify({
          flightId: !!flightId,
          airline: !!airline,
          passengers: !!passengers,
          contactEmail: !!contactEmail,
          contactPhone: !!contactPhone,
          contactName: !!contactName
        })
      }, { status: 400 })
    }

    if (!Array.isArray(passengers) || passengers.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'At least one passenger is required'
      }, { status: 400 })
    }

    for (const passenger of passengers) {
      if (!passenger.firstName || !passenger.lastName || !passenger.gender) {
        return NextResponse.json({
          success: false,
          error: 'Incomplete passenger information'
        }, { status: 400 })
      }
    }

    const bookingRef = 'FL' + generateBookingRef()
    const pnr = 'PNR' + generateBookingRef()
    
    // Create simplified booking record
    const bookingId = uuidv4()
    const booking = {
      id: bookingId,
      pnr,
      bookingRef,
      flightId,
      airline,
      flightNumber,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      travelDate: new Date(travelDate),
      classType,
      passengers,
      contactName,
      contactEmail,
      contactPhone,
      totalAmount: totalAmount || 0,
      specialRequests: specialRequests || '',
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date()
    }

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
