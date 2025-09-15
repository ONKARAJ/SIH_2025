import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get total bookings count
    const totalHotelBookings = await db.hotelBooking.count()
    const totalFlightBookings = await db.flightBooking.count()
    const totalBookings = totalHotelBookings + totalFlightBookings

    // Get revenue stats
    const hotelRevenue = await db.hotelBooking.aggregate({
      _sum: {
        totalAmount: true
      },
      where: {
        paymentStatus: 'completed'
      }
    })

    const flightRevenue = await db.flightBooking.aggregate({
      _sum: {
        totalAmount: true
      },
      where: {
        paymentStatus: 'completed'
      }
    })

    const totalRevenue = (hotelRevenue._sum.totalAmount || 0) + (flightRevenue._sum.totalAmount || 0)

    // Get payment stats
    const completedPayments = await db.payment.count({
      where: { status: 'completed' }
    })

    const pendingPayments = await db.payment.count({
      where: { status: 'pending' }
    })

    // Get recent bookings (last 10)
    const recentHotelBookings = await db.hotelBooking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        hotel: { select: { name: true } },
        user: { select: { name: true, email: true } }
      }
    })

    const recentFlightBookings = await db.flightBooking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        flight: { select: { airline: true, flightNumber: true } },
        user: { select: { name: true, email: true } }
      }
    })

    // Combine and sort recent bookings
    const recentBookings = [
      ...recentHotelBookings.map(booking => ({
        ...booking,
        type: 'hotel',
        guestName: booking.guestName || booking.user?.name
      })),
      ...recentFlightBookings.map(booking => ({
        ...booking,
        type: 'flight'
      }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    const stats = {
      totalBookings,
      totalRevenue,
      hotelBookings: totalHotelBookings,
      flightBookings: totalFlightBookings,
      pendingPayments,
      completedPayments,
      recentBookings: recentBookings.slice(0, 10)
    }

    return NextResponse.json({
      success: true,
      stats
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch dashboard stats'
    }, { status: 500 })
  }
}
