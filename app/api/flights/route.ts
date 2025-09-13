import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const departure = searchParams.get('departure')
    const arrival = searchParams.get('arrival')
    const departureDate = searchParams.get('departureDate')
    const passengers = searchParams.get('passengers')
    const maxPrice = searchParams.get('maxPrice')

    let whereClause: any = {
      isActive: true,
    }

    if (departure) {
      whereClause.departure = {
        contains: departure
      }
    }

    if (arrival) {
      whereClause.arrival = {
        contains: arrival
      }
    }

    if (departureDate) {
      const date = new Date(departureDate)
      const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000)
      whereClause.departureTime = {
        gte: date,
        lt: nextDay
      }
    }

    if (maxPrice) {
      whereClause.price = { lte: parseFloat(maxPrice) }
    }

    if (passengers) {
      whereClause.availableSeats = { gte: parseInt(passengers) }
    }

    const flights = await db.flight.findMany({
      where: whereClause,
      orderBy: [
        { price: 'asc' },
        { departureTime: 'asc' }
      ]
    })

    return NextResponse.json({
      success: true,
      flights
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
      departureTime,
      arrivalTime,
      duration,
      price,
      availableSeats,
      aircraft
    } = body

    if (!airline || !flightNumber || !departure || !arrival || !departureTime || !arrivalTime || !duration || !price || !availableSeats) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    const flight = await db.flight.create({
      data: {
        airline,
        flightNumber,
        departure,
        arrival,
        departureTime: new Date(departureTime),
        arrivalTime: new Date(arrivalTime),
        duration,
        price,
        availableSeats,
        aircraft
      }
    })

    return NextResponse.json({
      success: true,
      flight
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating flight:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create flight'
    }, { status: 500 })
  }
}
