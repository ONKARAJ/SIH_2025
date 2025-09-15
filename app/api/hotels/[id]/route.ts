import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const hotelId = params.id

    const hotel = await prisma.hotel.findUnique({
      where: {
        id: hotelId,
        isActive: true
      },
      include: {
        rooms: {
          where: {
            isActive: true
          },
          orderBy: {
            basePrice: 'asc'
          }
        },
        reviews: {
          take: 10,
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            user: {
              select: {
                name: true,
                avatar: true
              }
            }
          }
        },
        _count: {
          select: {
            reviews: true,
            bookings: true
          }
        }
      }
    })

    if (!hotel) {
      return NextResponse.json({
        success: false,
        error: 'Hotel not found'
      }, { status: 404 })
    }

    const reviewStats = await prisma.hotelReview.groupBy({
      by: ['rating'],
      where: {
        hotelId: hotelId
      },
      _count: {
        rating: true
      }
    })

    const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
      rating,
      count: reviewStats.find(stat => stat.rating === rating)?._count.rating || 0
    }))

    return NextResponse.json({
      success: true,
      data: {
        hotel,
        ratingDistribution
      }
    })
  } catch (error) {
    console.error('Error fetching hotel details:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch hotel details'
    }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const hotelId = params.id
    const body = await request.json()

    const hotel = await prisma.hotel.update({
      where: {
        id: hotelId
      },
      data: {
        ...body,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      data: hotel
    })
  } catch (error) {
    console.error('Error updating hotel:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update hotel'
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const hotelId = params.id

    await prisma.hotel.update({
      where: {
        id: hotelId
      },
      data: {
        isActive: false
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Hotel deactivated successfully'
    })
  } catch (error) {
    console.error('Error deactivating hotel:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to deactivate hotel'
    }, { status: 500 })
  }
}
