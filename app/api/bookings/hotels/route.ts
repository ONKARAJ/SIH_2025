import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    const bookingRef = searchParams.get('bookingRef')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    const where: any = {}

    if (userId) {
      where.userId = userId
    }

    if (status) {
      where.status = status
    }

    if (bookingRef) {
      where.bookingRef = bookingRef
    }

    const bookings = await prisma.hotelBooking.findMany({
      where,
      include: {
        hotel: {
          select: {
            id: true,
            name: true,
            city: true,
            address: true,
            phone: true,
            checkInTime: true,
            checkOutTime: true,
            policies: true
          }
        },
        room: {
          select: {
            id: true,
            name: true,
            type: true,
            images: true,
            amenities: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    })

    const totalCount = await prisma.hotelBooking.count({ where })

    return NextResponse.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page,
          limit,
          total: totalCount,
          pages: Math.ceil(totalCount / limit)
        }
      }
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
      hotelId,
      hotelName,
      roomType,
      checkIn,
      checkOut,
      guests = 1,
      guestName,
      guestEmail,
      guestPhone,
      totalAmount,
      specialRequests
    } = body

    console.log('Hotel booking request:', body)

    if (!hotelId || !hotelName || !roomType || !checkIn || !checkOut || !guestName || !guestEmail || !guestPhone) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: ' + JSON.stringify({
          hotelId: !!hotelId,
          hotelName: !!hotelName,
          roomType: !!roomType,
          checkIn: !!checkIn,
          checkOut: !!checkOut,
          guestName: !!guestName,
          guestEmail: !!guestEmail,
          guestPhone: !!guestPhone
        })
      }, { status: 400 })
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

    const bookingRef = generateBookingRef()
    
    // Create simplified booking record (without complex database relations)
    const bookingId = uuidv4()
    const booking = {
      id: bookingId,
      bookingRef,
      hotelId,
      hotelName,
      roomType,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights,
      guests,
      totalAmount: totalAmount || 0,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests: specialRequests || '',
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date(),
      cancellationPolicy: 'Free cancellation up to 24 hours before check-in'
    }

    return NextResponse.json({
      success: true,
      booking,
      paymentRequired: true,
      paymentAmount: totalAmount || 0
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating hotel booking:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create hotel booking'
    }, { status: 500 })
  }
}

function generateBookingRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let result = 'HTL'
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
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
      dynamicPrice: null
    }
  }

  const availableCount = Math.min(
    ...inventoryData.map(inv => inv.totalRooms - inv.bookedRooms - inv.blockedRooms)
  )

  return {
    available: availableCount >= roomsNeeded,
    availableRooms: availableCount,
    dynamicPrice: inventoryData[0]?.dynamicPrice
  }
}

async function updateRoomInventory(
  roomId: string,
  checkIn: Date,
  checkOut: Date,
  roomsBooked: number
) {
  const dates = []
  const currentDate = new Date(checkIn)
  
  while (currentDate < checkOut) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  for (const date of dates) {
    await prisma.roomInventory.upsert({
      where: {
        roomId_date: {
          roomId,
          date
        }
      },
      update: {
        bookedRooms: {
          increment: roomsBooked
        }
      },
      create: {
        roomId,
        date,
        totalRooms: 1,
        bookedRooms: roomsBooked,
        blockedRooms: 0
      }
    })
  }
}

async function calculatePromoDiscount(promoCode: string, baseAmount: number): Promise<number> {
  // Simple promo code logic - can be extended
  const promoCodes: Record<string, number> = {
    'WELCOME10': 0.1,
    'SAVE20': 0.2,
    'FIRSTBOOKING': 0.15
  }
  
  const discount = promoCodes[promoCode.toUpperCase()]
  return discount ? Math.round(baseAmount * discount) : 0
}
