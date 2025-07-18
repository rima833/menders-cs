"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, Users, TrendingUp, Clock, CheckCircle, AlertCircle, Star } from "lucide-react"

export function StatsOverview() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₦2,450,000",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "This month",
    },
    {
      title: "Active Bookings",
      value: "47",
      change: "+3",
      changeType: "positive" as const,
      icon: Calendar,
      description: "Pending & confirmed",
    },
    {
      title: "Team Members",
      value: "12",
      change: "+2",
      changeType: "positive" as const,
      icon: Users,
      description: "Active cleaners",
    },
    {
      title: "Customer Rating",
      value: "4.9",
      change: "+0.1",
      changeType: "positive" as const,
      icon: Star,
      description: "Average rating",
    },
  ]

  const recentBookings = [
    {
      id: "BK001",
      customer: "Sarah Johnson",
      service: "Deep Cleaning",
      date: "2024-01-20",
      time: "10:00 AM",
      status: "confirmed",
      amount: "₦45,000",
    },
    {
      id: "BK002",
      customer: "Michael Chen",
      service: "Regular Cleaning",
      date: "2024-01-20",
      time: "2:00 PM",
      status: "pending",
      amount: "₦25,000",
    },
    {
      id: "BK003",
      customer: "Emma Wilson",
      service: "Move-in Cleaning",
      date: "2024-01-21",
      time: "9:00 AM",
      status: "completed",
      amount: "₦65,000",
    },
    {
      id: "BK004",
      customer: "David Brown",
      service: "Office Cleaning",
      date: "2024-01-21",
      time: "11:00 AM",
      status: "confirmed",
      amount: "₦85,000",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "confirmed":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <span
                    className={`flex items-center ${
                      stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </span>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest customer bookings and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{booking.customer}</span>
                      <Badge variant="outline" className={getStatusColor(booking.status)}>
                        <span className="flex items-center space-x-1">
                          {getStatusIcon(booking.status)}
                          <span className="capitalize">{booking.status}</span>
                        </span>
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {booking.service} • {booking.date} at {booking.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{booking.amount}</div>
                    <div className="text-xs text-gray-500">{booking.id}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Bookings
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <Calendar className="h-5 w-5" />
                <span className="text-sm">New Booking</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <Users className="h-5 w-5" />
                <span className="text-sm">Add Team Member</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <DollarSign className="h-5 w-5" />
                <span className="text-sm">Update Pricing</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>This Month's Performance</CardTitle>
          <CardDescription>Key metrics and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">156</div>
              <div className="text-sm text-gray-600">Jobs Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">4.2hrs</div>
              <div className="text-sm text-gray-600">Avg. Job Duration</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
