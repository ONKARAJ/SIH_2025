import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const hotelId = searchParams.get('hotelId')
    const type = searchParams.get('type')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const guests = searchParams.get('guests')

    let whereClause: any = {
      isActive: true,
    }

    if (hotelId) {
      whereClause.hotelId = hotelId
    }

    if (type) {
      whereClause.type = {
        contains: type
      }
    }

    if (minPrice) {
      whereClause.basePrice = { ...whereClause.basePrice, gte: parseFloat(minPrice) }
    }

    if (maxPrice) {
      whereClause.basePrice = { ...whereClause.basePrice, lte: parseFloat(maxPrice) }
    }

    if (guests) {
      whereClause.maxGuests = { gte: parseInt(guests) }
    }

    const rooms = await db.room.findMany({
      where: whereClause,
      include: {
        hotel: {
          select: {
            id: true,
            name: true,
            city: true,
            rating: true
          }
        }
      },
      orderBy: {
        basePrice: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      rooms
    })
  } catch (error) {
    console.error('Error fetching rooms:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch rooms'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      hotelId,
      name,
      type,
      description,
      maxGuests = 2,
      basePrice,
      images = [],
      amenities = []
    } = body

    if (!hotelId || !name || !type || !basePrice) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    const hotel = await db.hotel.findUnique({
      where: { id: hotelId }
    })

    if (!hotel) {
      return NextResponse.json({
        success: false,
        error: 'Hotel not found'
      }, { status: 404 })
    }

    const room = await db.room.create({
      data: {
        hotelId,
        name,
        type,
        description,
        maxGuests,
        basePrice,
        images: JSON.stringify(images),
        amenities: JSON.stringify(amenities)
      }
    })

    return NextResponse.json({
      success: true,
      room
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating room:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create room'
    }, { status: 500 })
  }
}
