"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Users, ImageIcon, TrendingUp } from "lucide-react"

export function StatsOverview() {
  const stats = [
    {
      title: "Total Bookings",
      value: "156",
      change: "+12%",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Monthly Revenue",
      value: "₦2,450,000",
      change: "+8%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Users",
      value: "23",
      change: "+3",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Gallery Photos",
      value: "89",
      change: "+15",
      icon: ImageIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const recentBookings = [
    {
      id: 1,
      customer: "John Adebayo",
      service: "Deep Cleaning",
      date: "2024-01-20",
      status: "confirmed",
      amount: "₦45,000",
    },
    {
      id: 2,
      customer: "Sarah Okafor",
      service: "Regular Cleaning",
      date: "2024-01-19",
      status: "completed",
      amount: "₦25,000",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      service: "Move-in Cleaning",
      date: "2024-01-18",
      status: "in-progress",
      amount: "₦60,000",
    },
    {
      id: 4,
      customer: "Grace Eze",
      service: "Office Cleaning",
      date: "2024-01-17",
      status: "pending",
      amount: "₦80,000",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome to your Menders Cleaning Services admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Goal</CardTitle>
            <CardDescription>₦2,450,000 of ₦3,000,000 target</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={81.7} className="mb-4" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>81.7% Complete</span>
              <span>₦550,000 remaining</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 flex items-center">
              <Calendar className="h-5 w-5 mr-3 text-blue-600" />
              <div>
                <p className="font-medium">View Today's Bookings</p>
                <p className="text-sm text-gray-600">8 bookings scheduled</p>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 flex items-center">
              <ImageIcon className="h-5 w-5 mr-3 text-green-600" />
              <div>
                <p className="font-medium">Upload New Photos</p>
                <p className="text-sm text-gray-600">Add before/after images</p>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 flex items-center">
              <Users className="h-5 w-5 mr-3 text-purple-600" />
              <div>
                <p className="font-medium">Manage Team</p>
                <p className="text-sm text-gray-600">Add or edit team members</p>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Latest customer bookings and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Service</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{booking.customer}</td>
                    <td className="py-3 px-4 text-gray-600">{booking.service}</td>
                    <td className="py-3 px-4 text-gray-600">{booking.date}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </td>
                    <td className="py-3 px-4 font-medium">{booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
