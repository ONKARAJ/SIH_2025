import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')
    const guests = parseInt(searchParams.get('guests') || '1')
    const rooms = parseInt(searchParams.get('rooms') || '1')
    const minPrice = parseFloat(searchParams.get('minPrice') || '0')
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '50000')
    const amenities = searchParams.get('amenities')?.split(',') || []
    const priceRange = searchParams.get('priceRange')
    const featured = searchParams.get('featured') === 'true'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    const skip = (page - 1) * limit

    const where: any = {
      isActive: true,
    }

    if (city) {
      where.city = {
        contains: city,
        mode: 'insensitive'
      }
    }

    if (priceRange) {
      where.priceRange = priceRange
    }

    if (featured) {
      where.isFeatured = true
    }

    const hotels = await prisma.hotel.findMany({
      where,
      include: {
        rooms: {
          where: {
            isActive: true,
            maxGuests: {
              gte: guests
            },
            basePrice: {
              gte: minPrice,
              lte: maxPrice
            }
          },
          select: {
            id: true,
            name: true,
            type: true,
            maxGuests: true,
            basePrice: true,
            discountPrice: true,
            images: true,
            amenities: true,
            totalRooms: true,
            size: true,
            bedType: true,
            view: true
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      },
      skip,
      take: limit,
      orderBy: [
        { isFeatured: 'desc' },
        { rating: 'desc' },
        { reviewCount: 'desc' }
      ]
    })

    const totalCount = await prisma.hotel.count({ where })

    const hotelsWithAvailability = await Promise.all(
      hotels.map(async (hotel) => {
        const availableRooms = []
        
        for (const room of hotel.rooms) {
          if (checkIn && checkOut) {
            const availability = await checkRoomAvailability(
              room.id, 
              new Date(checkIn), 
              new Date(checkOut), 
              rooms
            )
            if (availability.available) {
              availableRooms.push({
                ...room,
                availability: availability.details
              })
            }
          } else {
            availableRooms.push(room)
          }
        }

        return {
          ...hotel,
          rooms: availableRooms,
          hasAvailability: availableRooms.length > 0
        }
      })
    )

    const filteredHotels = checkIn && checkOut 
      ? hotelsWithAvailability.filter(hotel => hotel.hasAvailability)
      : hotelsWithAvailability

    return NextResponse.json({
      success: true,
      data: {
        hotels: filteredHotels,
        pagination: {
          page,
          limit,
          total: totalCount,
          pages: Math.ceil(totalCount / limit)
        },
        filters: {
          cities: await getUniqueCities(),
          priceRanges: ['budget', 'mid-range', 'luxury'],
          amenities: await getUniqueAmenities()
        }
      }
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
      pincode,
      phone,
      email,
      website,
      latitude,
      longitude,
      images,
      amenities,
      policies,
      checkInTime,
      checkOutTime,
      priceRange
    } = body

    if (!name || !description || !address || !city || !pincode || !phone) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    const hotel = await prisma.hotel.create({
      data: {
        name,
        description,
        address,
        city,
        pincode,
        phone,
        email,
        website,
        latitude,
        longitude,
        images: images || [],
        amenities: amenities || [],
        policies: policies || {},
        checkInTime: checkInTime || '14:00',
        checkOutTime: checkOutTime || '11:00',
        priceRange: priceRange || 'budget'
      }
    })

    return NextResponse.json({
      success: true,
      data: hotel
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating hotel:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create hotel'
    }, { status: 500 })
  }
}

async function checkRoomAvailability(
  roomId: string, 
  checkIn: Date, 
  checkOut: Date, 
  roomsNeeded: number
) {
  const dates = []
  const currentDate = new Date(checkIn)
  
  while (currentDate < checkOut) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  const inventoryData = await prisma.roomInventory.findMany({
    where: {
      roomId,
      date: {
        in: dates
      }
    }
  })

  if (inventoryData.length === 0) {
    return {
      available: true,
      details: {
        availableRooms: 1,
        dates: []
      }
    }
  }

  const availableCount = Math.min(
    ...inventoryData.map(inv => inv.totalRooms - inv.bookedRooms - inv.blockedRooms)
  )

  return {
    available: availableCount >= roomsNeeded,
    details: {
      availableRooms: availableCount,
      dates: inventoryData
    }
  }
}

async function getUniqueCities() {
  const cities = await prisma.hotel.findMany({
    where: { isActive: true },
    select: { city: true },
    distinct: ['city']
  })
  return cities.map(c => c.city)
}

async function getUniqueAmenities() {
  return [
    'Free WiFi',
    'Swimming Pool',
    'Fitness Center',
    'Spa',
    'Restaurant',
    'Room Service',
    'Parking',
    'Air Conditioning',
    'Pet Friendly',
    'Business Center'
  ]
}
