import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const hotel = await db.hotel.findUnique({
      where: {
        id: params.id,
        isActive: true
      },
      include: {
        rooms: {
          where: {
            isActive: true
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

    return NextResponse.json({
      success: true,
      hotel
    })
  } catch (error) {
    console.error('Error fetching hotel:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch hotel'
    }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      address,
      city,
      state,
      pincode,
      phone,
      email,
      rating,
      images,
      amenities,
      latitude,
      longitude,
      isActive
    } = body

    const hotel = await db.hotel.update({
      where: {
        id: params.id
      },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(address && { address }),
        ...(city && { city }),
        ...(state && { state }),
        ...(pincode && { pincode }),
        ...(phone && { phone }),
        ...(email && { email }),
        ...(rating && { rating }),
        ...(images && { images: JSON.stringify(images) }),
        ...(amenities && { amenities: JSON.stringify(amenities) }),
        ...(latitude !== undefined && { latitude }),
        ...(longitude !== undefined && { longitude }),
        ...(isActive !== undefined && { isActive })
      }
    })

    return NextResponse.json({
      success: true,
      hotel
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
    await db.hotel.update({
      where: {
        id: params.id
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
