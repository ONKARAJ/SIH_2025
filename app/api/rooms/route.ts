import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const hotelId = searchParams.get('hotelId')
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')
    const guests = parseInt(searchParams.get('guests') || '1')
    const roomsNeeded = parseInt(searchParams.get('rooms') || '1')
    const minPrice = parseFloat(searchParams.get('minPrice') || '0')
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '50000')
    const type = searchParams.get('type')

    const where: any = {
      isActive: true,
    }

    if (hotelId) {
      where.hotelId = hotelId
    }

    if (type) {
      where.type = {
        contains: type,
        mode: 'insensitive'
      }
    }

    if (guests > 0) {
      where.maxGuests = {
        gte: guests
      }
    }

    where.basePrice = {
      gte: minPrice,
      lte: maxPrice
    }

    const rooms = await prisma.room.findMany({
      where,
      include: {
        hotel: {
          select: {
            id: true,
            name: true,
            city: true,
            rating: true,
            checkInTime: true,
            checkOutTime: true,
            policies: true
          }
        }
      },
      orderBy: {
        basePrice: 'asc'
      }
    })

    const roomsWithAvailability = await Promise.all(
      rooms.map(async (room) => {
        if (checkIn && checkOut) {
          const availability = await checkRoomAvailability(
            room.id,
            new Date(checkIn),
            new Date(checkOut),
            roomsNeeded
          )
          
          return {
            ...room,
            availability,
            finalPrice: availability.dynamicPrice || room.discountPrice || room.basePrice
          }
        }
        
        return {
          ...room,
          availability: { available: true, availableRooms: room.totalRooms },
          finalPrice: room.discountPrice || room.basePrice
        }
      })
    )

    const availableRooms = checkIn && checkOut 
      ? roomsWithAvailability.filter(room => room.availability.available)
      : roomsWithAvailability

    return NextResponse.json({
      success: true,
      data: {
        rooms: availableRooms,
        searchParams: {
          checkIn,
          checkOut,
          guests,
          rooms: roomsNeeded
        }
      }
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
      discountPrice,
      size,
      bedType = 'double',
      view,
      totalRooms = 1,
      images = [],
      amenities = []
    } = body

    if (!hotelId || !name || !type || !basePrice) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId }
    })

    if (!hotel) {
      return NextResponse.json({
        success: false,
        error: 'Hotel not found'
      }, { status: 404 })
    }

    const room = await prisma.room.create({
      data: {
        hotelId,
        name,
        type,
        description,
        maxGuests,
        basePrice,
        discountPrice,
        size,
        bedType,
        view,
        totalRooms,
        images,
        amenities
      }
    })

    return NextResponse.json({
      success: true,
      data: room
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating room:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create room'
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
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      select: { totalRooms: true }
    })
    
    return {
      available: (room?.totalRooms || 1) >= roomsNeeded,
      availableRooms: room?.totalRooms || 1,
      dates: []
    }
  }

  const availableCount = Math.min(
    ...inventoryData.map(inv => inv.totalRooms - inv.bookedRooms - inv.blockedRooms)
  )

  const dynamicPrice = inventoryData[0]?.dynamicPrice

  return {
    available: availableCount >= roomsNeeded,
    availableRooms: availableCount,
    dynamicPrice,
    dates: inventoryData
  }
}
