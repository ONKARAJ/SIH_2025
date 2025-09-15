'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Hotel, 
  Plane, 
  CreditCard, 
  Users, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Eye
} from 'lucide-react'
import { format } from 'date-fns'

interface DashboardStats {
  totalBookings: number
  totalRevenue: number
  hotelBookings: number
  flightBookings: number
  pendingPayments: number
  completedPayments: number
  recentBookings: any[]
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalRevenue: 0,
    hotelBookings: 0,
    flightBookings: 0,
    pendingPayments: 0,
    completedPayments: 0,
    recentBookings: []
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats')
      const data = await response.json()
      
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Hotel Bookings',
      value: stats.hotelBookings,
      icon: Hotel,
      color: 'text-purple-600'
    },
    {
      title: 'Flight Bookings',
      value: stats.flightBookings,
      icon: Plane,
      color: 'text-orange-600'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-48 bg-gray-200 rounded"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold">{card.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${card.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Completed Payments</span>
              <Badge className="bg-green-100 text-green-800">{stats.completedPayments}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Pending Payments</span>
              <Badge className="bg-yellow-100 text-yellow-800">{stats.pendingPayments}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Hotel className="w-4 h-4 mr-2" />
              Manage Hotels
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Plane className="w-4 h-4 mr-2" />
              Manage Flights
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Recent Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentBookings.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No recent bookings</p>
          ) : (
            <div className="space-y-4">
              {stats.recentBookings.slice(0, 5).map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {booking.type === 'hotel' ? (
                        <Hotel className="w-4 h-4 text-purple-600" />
                      ) : (
                        <Plane className="w-4 h-4 text-orange-600" />
                      )}
                      <span className="font-medium">
                        {booking.type === 'hotel' ? booking.hotel?.name : 
                         `${booking.flight?.airline} ${booking.flight?.flightNumber}`}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {booking.type === 'hotel' ? booking.guestName : 
                       booking.passengers?.[0]?.firstName + ' ' + booking.passengers?.[0]?.lastName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(booking.createdAt), 'MMM dd, yyyy HH:mm')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-emerald-600">
                      ₹{booking.totalAmount?.toLocaleString()}
                    </div>
                    <div className="flex gap-2 mt-1">
                      <Badge className={getStatusColor(booking.status)} variant="secondary">
                        {booking.status}
                      </Badge>
                      <Badge className={getPaymentStatusColor(booking.paymentStatus)} variant="secondary">
                        {booking.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-2">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
