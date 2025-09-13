"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Hotel, 
  Plane, 
  Calendar, 
  Users, 
  DollarSign,
  TrendingUp,
  Settings,
  Plus
} from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalHotels: 0,
    totalRooms: 0,
    totalFlights: 0,
    hotelBookings: 0,
    flightBookings: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // Mock stats for demo - updated numbers
      setStats({
        totalHotels: 12,
        totalRooms: 60,
        totalFlights: 30,
        hotelBookings: 0,
        flightBookings: 0,
        totalRevenue: 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-lg text-muted-foreground">Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage hotels, flights, and bookings for Jharkhand Tourism
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Hotel className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Hotels</p>
                  <p className="text-2xl font-bold">{stats.totalHotels}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Settings className="h-8 w-8 text-secondary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Rooms</p>
                  <p className="text-2xl font-bold">{stats.totalRooms}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Plane className="h-8 w-8 text-accent" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Flights</p>
                  <p className="text-2xl font-bold">{stats.totalFlights}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Hotel Bookings</p>
                  <p className="text-2xl font-bold">{stats.hotelBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-secondary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Flight Bookings</p>
                  <p className="text-2xl font-bold">{stats.flightBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hotel className="h-5 w-5" />
                Hotel Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Add, update, or manage hotels and their rooms.
              </p>
              <Button className="w-full mb-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Hotel
              </Button>
              <Button variant="outline" className="w-full">
                Manage Hotels
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Flight Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Add new flights or update existing flight schedules.
              </p>
              <Button className="w-full mb-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Flight
              </Button>
              <Button variant="outline" className="w-full">
                Manage Flights
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View and manage all hotel and flight bookings.
              </p>
              <Button variant="outline" className="w-full mb-2">
                Hotel Bookings
              </Button>
              <Button variant="outline" className="w-full">
                Flight Bookings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View booking trends and revenue analytics.
              </p>
              <Button variant="outline" className="w-full mb-2">
                Revenue Report
              </Button>
              <Button variant="outline" className="w-full">
                Booking Trends
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Hotel className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">New hotel added</p>
                    <p className="text-sm text-muted-foreground">Jharkhand Tourism Resort Ranchi</p>
                  </div>
                </div>
                <Badge variant="secondary">Today</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Plane className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">Flight schedule updated</p>
                    <p className="text-sm text-muted-foreground">6 flights added to database</p>
                  </div>
                </div>
                <Badge variant="secondary">Today</Badge>
              </div>

              <div className="text-center py-4 text-sm text-muted-foreground">
                System is ready for bookings!
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
