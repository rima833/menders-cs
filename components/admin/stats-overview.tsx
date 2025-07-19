"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAdmin } from "./admin-provider"
import {
  Calendar,
  DollarSign,
  Users,
  Camera,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
} from "lucide-react"

export function StatsOverview() {
  const { getStats, bookings, users, beforeAfterImages } = useAdmin()
  const stats = getStats()

  const recentBookings = bookings.slice(0, 5)
  const recentImages = beforeAfterImages.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Menders Admin Dashboard</h1>
        <p className="text-blue-100">
          Manage your cleaning business operations, track performance, and grow your revenue.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₦{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From {stats.completedBookings} completed jobs</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">₦{stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month's earnings</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingBookings}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Team</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Team members</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Booking Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{Math.round(stats.averageBookingValue).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Per completed job</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">All time bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
            <Camera className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedImages}</div>
            <p className="text-xs text-muted-foreground">Published photos</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest customer bookings and their status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{booking.customerName}</p>
                  <p className="text-sm text-gray-600">{booking.service}</p>
                  <p className="text-xs text-gray-500">
                    {booking.date} at {booking.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₦{booking.amount.toLocaleString()}</p>
                  <Badge
                    variant={
                      booking.status === "completed"
                        ? "default"
                        : booking.status === "confirmed"
                          ? "secondary"
                          : booking.status === "pending"
                            ? "outline"
                            : "destructive"
                    }
                    className="text-xs"
                  >
                    {booking.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                    {booking.status === "pending" && <AlertCircle className="w-3 h-3 mr-1" />}
                    {booking.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Gallery Uploads</CardTitle>
            <CardDescription>Latest before/after photos added to gallery</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentImages.map((image) => (
              <div key={image.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{image.title}</p>
                  <p className="text-sm text-gray-600">{image.location}</p>
                  <p className="text-xs text-gray-500">{image.serviceType}</p>
                </div>
                <Badge variant={image.isPublished ? "default" : "secondary"} className="text-xs">
                  {image.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center hover:bg-gray-50 cursor-pointer">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-medium">New Booking</p>
            </div>
            <div className="p-4 border rounded-lg text-center hover:bg-gray-50 cursor-pointer">
              <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium">Add Team Member</p>
            </div>
            <div className="p-4 border rounded-lg text-center hover:bg-gray-50 cursor-pointer">
              <Camera className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-sm font-medium">Upload Photos</p>
            </div>
            <div className="p-4 border rounded-lg text-center hover:bg-gray-50 cursor-pointer">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-sm font-medium">Update Pricing</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
