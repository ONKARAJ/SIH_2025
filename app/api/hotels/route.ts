import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')
    const guests = searchParams.get('guests')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const amenities = searchParams.get('amenities')

    let whereClause: any = {
      isActive: true,
    }

    if (city) {
      whereClause.city = {
        contains: city
      }
    }

    const hotels = await db.hotel.findMany({
      where: whereClause,
      include: {
        rooms: {
          where: {
            isActive: true,
            ...(minPrice && { basePrice: { gte: parseFloat(minPrice) } }),
            ...(maxPrice && { basePrice: { lte: parseFloat(maxPrice) } }),
            ...(guests && { maxGuests: { gte: parseInt(guests) } })
          }
        }
      },
      orderBy: {
        rating: 'desc'
      }
    })

    const filteredHotels = hotels.filter(hotel => hotel.rooms.length > 0)

    return NextResponse.json({
      success: true,
      hotels: filteredHotels
    })
  } catch (error) {
    console.error('Error fetching hotels:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch hotels'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      address,
      city,
      state = 'Jharkhand',
      pincode,
      phone,
      email,
      rating = 4.0,
      images = [],
      amenities = [],
      latitude,
      longitude
    } = body

    if (!name || !description || !address || !city || !pincode || !phone) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    const hotel = await db.hotel.create({
      data: {
        name,
        description,
        address,
        city,
        state,
        pincode,
        phone,
        email,
        rating,
        images: JSON.stringify(images),
        amenities: JSON.stringify(amenities),
        latitude,
        longitude
      }
    })

    return NextResponse.json({
      success: true,
      hotel
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating hotel:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create hotel'
    }, { status: 500 })
  }
}
