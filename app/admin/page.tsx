'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import DashboardOverview from '@/components/admin/dashboard-overview'
import { 
  LayoutDashboard, 
  Hotel, 
  Plane, 
  CreditCard, 
  Users, 
  Settings,
  Calendar
} from 'lucide-react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const navigation = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Manage your tourism business</p>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-7 mb-8 w-full">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="flex items-center gap-2 text-xs sm:text-sm"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="hotels">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hotel className="w-5 h-5" />
                  Hotel Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Hotel className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Hotel Management</h3>
                  <p className="text-gray-600 mb-6">Manage hotels, rooms, and availability</p>
                  <div className="space-y-3">
                    <Button className="w-full max-w-sm">
                      Add New Hotel
                    </Button>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-sm mx-auto">
                      <Button variant="outline" size="sm">View Hotels</Button>
                      <Button variant="outline" size="sm">Room Types</Button>
                      <Button variant="outline" size="sm">Inventory</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flights">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5" />
                  Flight Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Plane className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Flight Management</h3>
                  <p className="text-gray-600 mb-6">Manage flights, schedules, and pricing</p>
                  <div className="space-y-3">
                    <Button className="w-full max-w-sm">
                      Add New Flight
                    </Button>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-sm mx-auto">
                      <Button variant="outline" size="sm">View Flights</Button>
                      <Button variant="outline" size="sm">Schedules</Button>
                      <Button variant="outline" size="sm">Airlines</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Booking Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Booking Management</h3>
                  <p className="text-gray-600 mb-6">View and manage all bookings</p>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto">
                      <Button variant="outline">Hotel Bookings</Button>
                      <Button variant="outline">Flight Bookings</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Management</h3>
                  <p className="text-gray-600 mb-6">Monitor payments and transactions</p>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-sm mx-auto">
                      <Button variant="outline" size="sm">All Payments</Button>
                      <Button variant="outline" size="sm">Refunds</Button>
                      <Button variant="outline" size="sm">Reports</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
                  <p className="text-gray-600 mb-6">Manage customer accounts and data</p>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto">
                      <Button variant="outline">All Users</Button>
                      <Button variant="outline">User Analytics</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">System Settings</h3>
                  <p className="text-gray-600 mb-6">Configure system settings and preferences</p>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-sm mx-auto">
                      <Button variant="outline" size="sm">General</Button>
                      <Button variant="outline" size="sm">Payment</Button>
                      <Button variant="outline" size="sm">Notifications</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
