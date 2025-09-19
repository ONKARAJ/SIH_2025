import { NextRequest, NextResponse } from 'next/server'

// Mock hotel data - replacing database functionality
const mockHotels = [
  {
    id: '1',
    name: 'Hotel Ranchi Plaza',
    description: 'A luxurious hotel in the heart of Ranchi',
    address: 'Main Road, Ranchi',
    city: 'Ranchi',
    state: 'Jharkhand',
    pincode: '834001',
    phone: '+91-651-2345678',
    email: 'info@ranchiplaza.com',
    rating: 4.5,
    reviewCount: 120,
    images: ['/hotel-ranchi-plaza.jpg'],
    amenities: ['wifi', 'parking', 'restaurant', 'gym'],
    priceRange: 'luxury',
    isActive: true,
    isFeatured: true,
    rooms: [
      {
        id: 'r1',
        name: 'Deluxe Room',
        type: 'deluxe',
        maxGuests: 2,
        basePrice: 3500,
        discountPrice: 3000,
        images: ['/room-deluxe.jpg'],
        amenities: ['ac', 'tv', 'minibar'],
        totalRooms: 10,
        size: '400 sq ft',
        bedType: 'king',
        view: 'city'
      }
    ]
  },
  {
    id: '2',
    name: 'Jamshedpur Inn',
    description: 'Budget-friendly accommodation in Jamshedpur',
    address: 'Steel City, Jamshedpur',
    city: 'Jamshedpur',
    state: 'Jharkhand',
    pincode: '831001',
    phone: '+91-657-1234567',
    email: 'info@jamshedpurinn.com',
    rating: 4.0,
    reviewCount: 85,
    images: ['/hotel-jamshedpur.jpg'],
    amenities: ['wifi', 'parking', 'restaurant'],
    priceRange: 'budget',
    isActive: true,
    isFeatured: false,
    rooms: [
      {
        id: 'r2',
        name: 'Standard Room',
        type: 'standard',
        maxGuests: 2,
        basePrice: 1500,
        discountPrice: 1200,
        images: ['/room-standard.jpg'],
        amenities: ['ac', 'tv'],
        totalRooms: 20,
        size: '300 sq ft',
        bedType: 'double',
        view: 'garden'
      }
    ]
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const guests = parseInt(searchParams.get('guests') || '1')
    const minPrice = parseFloat(searchParams.get('minPrice') || '0')
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '50000')
    const priceRange = searchParams.get('priceRange')
    const featured = searchParams.get('featured') === 'true'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    // Filter mock hotels based on query parameters
    let filteredHotels = mockHotels.filter(hotel => {
      if (city && !hotel.city.toLowerCase().includes(city.toLowerCase())) {
        return false
      }
      if (priceRange && hotel.priceRange !== priceRange) {
        return false
      }
      if (featured && !hotel.isFeatured) {
        return false
      }
      
      // Filter rooms by price and guests
      hotel.rooms = hotel.rooms.filter(room => 
        room.maxGuests >= guests &&
        room.basePrice >= minPrice &&
        room.basePrice <= maxPrice
      )
      
      return hotel.rooms.length > 0
    })

    // Pagination
    const totalCount = filteredHotels.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    filteredHotels = filteredHotels.slice(startIndex, endIndex)

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
          cities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro'],
          priceRanges: ['budget', 'mid-range', 'luxury'],
          amenities: ['wifi', 'parking', 'restaurant', 'gym', 'pool', 'spa']
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

    // Mock hotel creation - in a real app, this would be saved to a database
    const newHotel = {
      id: Date.now().toString(),
      name,
      description,
      address,
      city,
      state: 'Jharkhand',
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
      priceRange: priceRange || 'budget',
      rating: 4.0,
      reviewCount: 0,
      isActive: true,
      isFeatured: false,
      rooms: []
    }

    return NextResponse.json({
      success: true,
      message: 'Hotel creation simulated (database disabled)',
      data: newHotel
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating hotel:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create hotel'
    }, { status: 500 })
  }
}
