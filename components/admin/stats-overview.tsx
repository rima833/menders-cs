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
      change: "+8",
      changeType: "positive" as const,
      icon: Calendar,
      description: "Pending completion",
    },
    {
      title: "Total Customers",
      value: "1,234",
      change: "+23",
      changeType: "positive" as const,
      icon: Users,
      description: "This month",
    },
    {
      title: "Completion Rate",
      value: "98.5%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Last 30 days",
    },
  ]

  const recentBookings = [
    {
      id: "BK001",
      customer: "John Doe",
      service: "Deep Cleaning",
      date: "2024-01-20",
      status: "completed" as const,
      amount: "₦45,000",
    },
    {
      id: "BK002",
      customer: "Jane Smith",
      service: "Regular Cleaning",
      date: "2024-01-19",
      status: "in-progress" as const,
      amount: "₦25,000",
    },
    {
      id: "BK003",
      customer: "Mike Johnson",
      service: "Office Cleaning",
      date: "2024-01-18",
      status: "pending" as const,
      amount: "₦75,000",
    },
    {
      id: "BK004",
      customer: "Sarah Wilson",
      service: "Post-Construction",
      date: "2024-01-17",
      status: "completed" as const,
      amount: "₦120,000",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      "in-progress": "secondary",
      pending: "outline",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "outline"}>{status.replace("-", " ")}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span className={`font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

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
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(booking.status)}
                    <div>
                      <p className="font-medium text-sm">{booking.customer}</p>
                      <p className="text-xs text-gray-500">{booking.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{booking.amount}</p>
                    <div className="flex items-center space-x-2">{getStatusBadge(booking.status)}</div>
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
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule New Booking
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Star className="mr-2 h-4 w-4" />
              Upload Gallery Images
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Key business metrics for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">98.5%</div>
              <p className="text-sm text-gray-600">Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">4.8</div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">156</div>
              <p className="text-sm text-gray-600">Jobs Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
