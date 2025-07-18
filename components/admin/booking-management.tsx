"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Filter, Eye, Phone, Mail, MapPin, Calendar, Clock, Users } from "lucide-react"

interface Booking {
  id: number
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  service: {
    type: string
    rooms: number
    bathrooms: number
    frequency: string
  }
  date: string
  time: string
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
  team: string
  amount: string
  notes: string
}

export function BookingManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const bookings: Booking[] = [
    {
      id: 1,
      customer: {
        name: "John Adebayo",
        email: "john.adebayo@email.com",
        phone: "+234 801 234 5678",
        address: "15 Victoria Island, Lagos",
      },
      service: {
        type: "Deep Cleaning",
        rooms: 3,
        bathrooms: 2,
        frequency: "One-time",
      },
      date: "2024-01-22",
      time: "10:00 AM",
      status: "confirmed",
      team: "Team A",
      amount: "₦45,000",
      notes: "Customer prefers eco-friendly products",
    },
    {
      id: 2,
      customer: {
        name: "Sarah Okafor",
        email: "sarah.okafor@email.com",
        phone: "+234 802 345 6789",
        address: "8 Lekki Phase 1, Lagos",
      },
      service: {
        type: "Regular Cleaning",
        rooms: 2,
        bathrooms: 1,
        frequency: "Weekly",
      },
      date: "2024-01-21",
      time: "2:00 PM",
      status: "completed",
      team: "Team B",
      amount: "₦25,000",
      notes: "Regular customer, has spare key",
    },
    {
      id: 3,
      customer: {
        name: "Mike Johnson",
        email: "mike.johnson@email.com",
        phone: "+234 803 456 7890",
        address: "22 Ikoyi, Lagos",
      },
      service: {
        type: "Move-in Cleaning",
        rooms: 4,
        bathrooms: 3,
        frequency: "One-time",
      },
      date: "2024-01-23",
      time: "9:00 AM",
      status: "in-progress",
      team: "Team C",
      amount: "₦60,000",
      notes: "New apartment, needs thorough cleaning",
    },
    {
      id: 4,
      customer: {
        name: "Grace Eze",
        email: "grace.eze@email.com",
        phone: "+234 804 567 8901",
        address: "5 Surulere, Lagos",
      },
      service: {
        type: "Office Cleaning",
        rooms: 6,
        bathrooms: 2,
        frequency: "Bi-weekly",
      },
      date: "2024-01-24",
      time: "8:00 AM",
      status: "pending",
      team: "Unassigned",
      amount: "₦80,000",
      notes: "Office building, coordinate with security",
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
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateBookingStatus = (bookingId: number, newStatus: string) => {
    // In a real app, this would update the database
    console.log(`Updating booking ${bookingId} to status: ${newStatus}`)
  }

  const assignTeam = (bookingId: number, team: string) => {
    // In a real app, this would update the database
    console.log(`Assigning booking ${bookingId} to team: ${team}`)
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Management</h2>
        <p className="text-gray-600">Manage customer bookings and assign teams</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search bookings by customer name or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
          <CardDescription>Manage and track all customer bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Service</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Team</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{booking.customer.name}</p>
                        <p className="text-sm text-gray-600">{booking.customer.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{booking.service.type}</p>
                        <p className="text-sm text-gray-600">
                          {booking.service.rooms}R, {booking.service.bathrooms}B
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{booking.date}</p>
                        <p className="text-sm text-gray-600">{booking.time}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Select value={booking.status} onValueChange={(value) => updateBookingStatus(booking.id, value)}>
                        <SelectTrigger className="w-32">
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-4">
                      <Select value={booking.team} onValueChange={(value) => assignTeam(booking.id, value)}>
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Team A">Team A</SelectItem>
                          <SelectItem value="Team B">Team B</SelectItem>
                          <SelectItem value="Team C">Team C</SelectItem>
                          <SelectItem value="Unassigned">Unassigned</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-4 font-medium">{booking.amount}</td>
                    <td className="py-3 px-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Booking Details</DialogTitle>
                            <DialogDescription>Complete information for booking #{booking.id}</DialogDescription>
                          </DialogHeader>
                          {selectedBooking && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="font-semibold mb-3 flex items-center">
                                  <Users className="h-4 w-4 mr-2" />
                                  Customer Information
                                </h3>
                                <div className="space-y-2 text-sm">
                                  <p>
                                    <strong>Name:</strong> {selectedBooking.customer.name}
                                  </p>
                                  <p className="flex items-center">
                                    <Mail className="h-4 w-4 mr-2" />
                                    {selectedBooking.customer.email}
                                  </p>
                                  <p className="flex items-center">
                                    <Phone className="h-4 w-4 mr-2" />
                                    {selectedBooking.customer.phone}
                                  </p>
                                  <p className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {selectedBooking.customer.address}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-3 flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Service Details
                                </h3>
                                <div className="space-y-2 text-sm">
                                  <p>
                                    <strong>Service:</strong> {selectedBooking.service.type}
                                  </p>
                                  <p>
                                    <strong>Rooms:</strong> {selectedBooking.service.rooms}
                                  </p>
                                  <p>
                                    <strong>Bathrooms:</strong> {selectedBooking.service.bathrooms}
                                  </p>
                                  <p>
                                    <strong>Frequency:</strong> {selectedBooking.service.frequency}
                                  </p>
                                  <p className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2" />
                                    {selectedBooking.date} at {selectedBooking.time}
                                  </p>
                                  <p>
                                    <strong>Amount:</strong> {selectedBooking.amount}
                                  </p>
                                </div>
                              </div>
                              <div className="md:col-span-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                  id="notes"
                                  value={selectedBooking.notes}
                                  placeholder="Add notes about this booking..."
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
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
