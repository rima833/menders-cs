"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Filter, Eye, Users } from "lucide-react"

interface Booking {
  id: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  service: string
  date: string
  time: string
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
  amount: string
  rooms: number
  bathrooms: number
  frequency: string
  team?: string
  notes: string
}

export function BookingManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "BK001",
      customer: {
        name: "John Adebayo",
        email: "john@email.com",
        phone: "+234 801 234 5678",
        address: "15 Victoria Island, Lagos",
      },
      service: "Deep Cleaning",
      date: "2024-01-20",
      time: "10:00 AM",
      status: "confirmed",
      amount: "₦45,000",
      rooms: 3,
      bathrooms: 2,
      frequency: "One-time",
      team: "Team A",
      notes: "Customer prefers eco-friendly products",
    },
    {
      id: "BK002",
      customer: {
        name: "Sarah Okafor",
        email: "sarah@email.com",
        phone: "+234 802 345 6789",
        address: "22 Ikeja GRA, Lagos",
      },
      service: "Regular Cleaning",
      date: "2024-01-21",
      time: "2:00 PM",
      status: "pending",
      amount: "₦25,000",
      rooms: 2,
      bathrooms: 1,
      frequency: "Weekly",
      notes: "New customer, first cleaning",
    },
    {
      id: "BK003",
      customer: {
        name: "Mike Johnson",
        email: "mike@email.com",
        phone: "+234 803 456 7890",
        address: "8 Lekki Phase 1, Lagos",
      },
      service: "Move-in Cleaning",
      date: "2024-01-19",
      time: "9:00 AM",
      status: "completed",
      amount: "₦60,000",
      rooms: 4,
      bathrooms: 3,
      frequency: "One-time",
      team: "Team B",
      notes: "Excellent service, customer very satisfied",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-purple-100 text-purple-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateBookingStatus = (bookingId: string, newStatus: Booking["status"]) => {
    setBookings(bookings.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)))
  }

  const assignTeam = (bookingId: string, team: string) => {
    setBookings(bookings.map((booking) => (booking.id === bookingId ? { ...booking, team } : booking)))
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold">Booking Management</h2>
          <p className="text-muted-foreground">Manage all customer bookings and assignments</p>
        </div>
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Add Manual Booking
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer name or booking ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="grid gap-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4 justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{booking.customer.name}</h3>
                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <p>📧 {booking.customer.email}</p>
                    <p>📞 {booking.customer.phone}</p>
                    <p>🏠 {booking.customer.address}</p>
                    <p>🧹 {booking.service}</p>
                    <p>
                      📅 {booking.date} at {booking.time}
                    </p>
                    <p>💰 {booking.amount}</p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span>🏠 {booking.rooms} rooms</span>
                    <span>🚿 {booking.bathrooms} bathrooms</span>
                    <span>🔄 {booking.frequency}</span>
                    {booking.team && <span>👥 {booking.team}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Booking Details - {booking.id}</DialogTitle>
                        </DialogHeader>
                        {selectedBooking && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Customer Name</Label>
                                <p className="font-medium">{selectedBooking.customer.name}</p>
                              </div>
                              <div>
                                <Label>Service</Label>
                                <p className="font-medium">{selectedBooking.service}</p>
                              </div>
                              <div>
                                <Label>Date & Time</Label>
                                <p className="font-medium">
                                  {selectedBooking.date} at {selectedBooking.time}
                                </p>
                              </div>
                              <div>
                                <Label>Amount</Label>
                                <p className="font-medium">{selectedBooking.amount}</p>
                              </div>
                            </div>
                            <div>
                              <Label>Address</Label>
                              <p className="font-medium">{selectedBooking.customer.address}</p>
                            </div>
                            <div>
                              <Label>Notes</Label>
                              <Textarea
                                value={selectedBooking.notes}
                                onChange={(e) => setSelectedBooking({ ...selectedBooking, notes: e.target.value })}
                                placeholder="Add notes about this booking..."
                              />
                            </div>
                            <div className="flex gap-2">
                              <Select
                                value={selectedBooking.status}
                                onValueChange={(value) =>
                                  updateBookingStatus(selectedBooking.id, value as Booking["status"])
                                }
                              >
                                <SelectTrigger className="flex-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                              <Select
                                value={selectedBooking.team || ""}
                                onValueChange={(value) => assignTeam(selectedBooking.id, value)}
                              >
                                <SelectTrigger className="flex-1">
                                  <SelectValue placeholder="Assign Team" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Team A">Team A</SelectItem>
                                  <SelectItem value="Team B">Team B</SelectItem>
                                  <SelectItem value="Team C">Team C</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Select
                      value={booking.status}
                      onValueChange={(value) => updateBookingStatus(booking.id, value as Booking["status"])}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No bookings found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
