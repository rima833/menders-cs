"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, DollarSign, Users, Camera, TrendingUp, Clock } from "lucide-react"

export function StatsOverview() {
  const stats = [
    {
      title: "Total Bookings",
      value: "156",
      change: "+12%",
      icon: CalendarDays,
      color: "text-blue-600",
    },
    {
      title: "Monthly Revenue",
      value: "₦2,450,000",
      change: "+8%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Active Users",
      value: "89",
      change: "+5%",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Gallery Photos",
      value: "234",
      change: "+15%",
      icon: Camera,
      color: "text-orange-600",
    },
  ]

  const recentBookings = [
    {
      id: "BK001",
      customer: "John Adebayo",
      service: "Deep Cleaning",
      date: "2024-01-18",
      status: "confirmed",
      amount: "₦45,000",
    },
    {
      id: "BK002",
      customer: "Sarah Okafor",
      service: "Regular Cleaning",
      date: "2024-01-18",
      status: "pending",
      amount: "₦25,000",
    },
    {
      id: "BK003",
      customer: "Mike Johnson",
      service: "Move-in Cleaning",
      date: "2024-01-17",
      status: "completed",
      amount: "₦60,000",
    },
    {
      id: "BK004",
      customer: "Grace Emeka",
      service: "Office Cleaning",
      date: "2024-01-17",
      status: "confirmed",
      amount: "₦80,000",
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

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Revenue Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>₦2,450,000 / ₦3,000,000</span>
            </div>
            <Progress value={82} className="h-2" />
            <p className="text-sm text-muted-foreground">82% of monthly goal achieved. ₦550,000 remaining.</p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-sm">Add Photos</div>
                <div className="text-xs text-muted-foreground">Upload before/after</div>
              </button>
              <button className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-sm">New Booking</div>
                <div className="text-xs text-muted-foreground">Create manually</div>
              </button>
              <button className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-sm">Add Team</div>
                <div className="text-xs text-muted-foreground">New team member</div>
              </button>
              <button className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-sm">Update Prices</div>
                <div className="text-xs text-muted-foreground">Modify pricing</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium">{booking.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.service} • {booking.date}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  <span className="font-medium">{booking.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
