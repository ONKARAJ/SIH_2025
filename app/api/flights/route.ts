import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const departure = searchParams.get('departure')
    const arrival = searchParams.get('arrival')
    const departureDate = searchParams.get('departureDate')
    const returnDate = searchParams.get('returnDate')
    const passengers = parseInt(searchParams.get('passengers') || '1')
    const classType = searchParams.get('class') || 'economy'
    const sortBy = searchParams.get('sortBy') || 'price'
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '50000')
    const airline = searchParams.get('airline')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const skip = (page - 1) * limit

    let where: any = {
      isActive: true,
      basePrice: {
        lte: maxPrice
      }
    }

    if (departure) {
      where.departure = {
        contains: departure,
        mode: 'insensitive'
      }
    }

    if (arrival) {
      where.arrival = {
        contains: arrival,
        mode: 'insensitive'
      }
    }

    if (airline) {
      where.airline = {
        contains: airline,
        mode: 'insensitive'
      }
    }

    if (departureDate) {
      const date = new Date(departureDate)
      where.departureDate = {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999))
      }
    }

    const orderBy: any = {}
    switch (sortBy) {
      case 'price':
        orderBy.basePrice = 'asc'
        break
      case 'duration':
        orderBy.duration = 'asc'
        break
      case 'departure':
        orderBy.departureTime = 'asc'
        break
      default:
        orderBy.basePrice = 'asc'
    }

    const flights = await prisma.flight.findMany({
      where,
      orderBy,
      skip,
      take: limit
    })

    const totalCount = await prisma.flight.count({ where })

    const filteredFlights = flights
      .filter(flight => flight.availableSeats >= passengers)
      .map(flight => ({
        ...flight,
        finalPrice: calculateFlightPrice(flight, classType, passengers),
        availableClasses: getAvailableClasses(flight, passengers)
      }))

    const filters = {
      airlines: await getUniqueAirlines(),
      cities: await getFlightCities(),
      maxPrice: await getMaxFlightPrice(),
      classes: ['economy', 'business', 'first']
    }

    return NextResponse.json({
      success: true,
      data: {
        flights: filteredFlights,
        pagination: {
          page,
          limit,
          total: totalCount,
          pages: Math.ceil(totalCount / limit)
        },
        filters,
        searchParams: {
          departure,
          arrival,
          departureDate,
          returnDate,
          passengers,
          class: classType
        }
      }
    })
  } catch (error) {
    console.error('Error fetching flights:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch flights'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      airline,
      flightNumber,
      departure,
      arrival,
      departureDate,
      departureTime,
      arrivalDate,
      arrivalTime,
      duration,
      basePrice,
      discountPrice,
      totalSeats = 180,
      availableSeats,
      aircraft = 'Boeing 737',
      flightType = 'domestic',
      classTypes = ['economy', 'business'],
      amenities = [],
      baggage = {},
      operatingDays = [1,2,3,4,5,6,7]
    } = body

    if (!airline || !flightNumber || !departure || !arrival || !departureDate || !basePrice) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    const flight = await prisma.flight.create({
      data: {
        airline,
        flightNumber,
        departure,
        arrival,
        departureDate: new Date(departureDate),
        departureTime: new Date(departureTime),
        arrivalDate: new Date(arrivalDate),
        arrivalTime: new Date(arrivalTime),
        duration,
        basePrice,
        discountPrice,
        totalSeats,
        availableSeats: availableSeats || totalSeats,
        aircraft,
        flightType,
        classTypes,
        amenities,
        baggage,
        operatingDays
      }
    })

    return NextResponse.json({
      success: true,
      data: flight
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating flight:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create flight'
    }, { status: 500 })
  }
}

function calculateFlightPrice(flight: any, classType: string, passengers: number) {
  let multiplier = 1
  switch (classType) {
    case 'business':
      multiplier = 2.5
      break
    case 'first':
      multiplier = 4
      break
    default:
      multiplier = 1
  }
  
  const basePrice = flight.discountPrice || flight.basePrice
  return Math.round(basePrice * multiplier * passengers)
}

function getAvailableClasses(flight: any, passengers: number) {
  const classTypes = Array.isArray(flight.classTypes) ? flight.classTypes : JSON.parse(flight.classTypes || '[]')
  return classTypes.filter((cls: string) => {
    const availableSeats = Math.floor(flight.availableSeats * getClassRatio(cls))
    return availableSeats >= passengers
  })
}

function getClassRatio(classType: string) {
  switch (classType) {
    case 'first': return 0.1
    case 'business': return 0.2
    case 'economy': return 0.7
    default: return 0.7
  }
}

async function getUniqueAirlines() {
  const airlines = await prisma.flight.findMany({
    where: { isActive: true },
    select: { airline: true },
    distinct: ['airline']
  })
  return airlines.map(a => a.airline)
}

async function getFlightCities() {
  const departures = await prisma.flight.findMany({
    where: { isActive: true },
    select: { departure: true },
    distinct: ['departure']
  })
  
  const arrivals = await prisma.flight.findMany({
    where: { isActive: true },
    select: { arrival: true },
    distinct: ['arrival']
  })
  
  const allCities = [...departures.map(d => d.departure), ...arrivals.map(a => a.arrival)]
  return [...new Set(allCities)]
}

async function getMaxFlightPrice() {
  const result = await prisma.flight.aggregate({
    where: { isActive: true },
    _max: {
      basePrice: true
    }
  })
  return result._max.basePrice || 50000
}
