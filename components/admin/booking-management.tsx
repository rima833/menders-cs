"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Filter, Eye, Edit, Calendar, MapPin, Phone, Mail } from "lucide-react"

interface Booking {
  id: string
  customer: {
    name: string
    email: string
    phone: string
  }
  service: string
  date: string
  time: string
  address: string
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
  amount: string
  notes: string
  assignedTeam?: string
}

export function BookingManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const bookings: Booking[] = [
    {
      id: "BK001",
      customer: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+234 801 234 5678",
      },
      service: "Deep Cleaning",
      date: "2024-01-25",
      time: "10:00 AM",
      address: "123 Victoria Island, Lagos",
      status: "pending",
      amount: "₦45,000",
      notes: "Customer requested eco-friendly products",
    },
    {
      id: "BK002",
      customer: {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+234 802 345 6789",
      },
      service: "Regular Cleaning",
      date: "2024-01-24",
      time: "2:00 PM",
      address: "456 Ikoyi, Lagos",
      status: "confirmed",
      amount: "₦25,000",
      notes: "Weekly recurring service",
      assignedTeam: "Team A",
    },
    {
      id: "BK003",
      customer: {
        name: "Mike Johnson",
        email: "mike@example.com",
        phone: "+234 803 456 7890",
      },
      service: "Office Cleaning",
      date: "2024-01-23",
      time: "6:00 PM",
      address: "789 Lekki Phase 1, Lagos",
      status: "in-progress",
      amount: "₦75,000",
      notes: "After hours cleaning required",
      assignedTeam: "Team B",
    },
    {
      id: "BK004",
      customer: {
        name: "Sarah Wilson",
        email: "sarah@example.com",
        phone: "+234 804 567 8901",
      },
      service: "Post-Construction",
      date: "2024-01-22",
      time: "9:00 AM",
      address: "321 Ajah, Lagos",
      status: "completed",
      amount: "₦120,000",
      notes: "Heavy duty cleaning after renovation",
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "outline",
      confirmed: "secondary",
      "in-progress": "default",
      completed: "default",
      cancelled: "destructive",
    } as const

    const colors = {
      pending: "text-yellow-600",
      confirmed: "text-blue-600",
      "in-progress": "text-purple-600",
      completed: "text-green-600",
      cancelled: "text-red-600",
    }

    return (
      <Badge variant={variants[status as keyof typeof variants]} className={colors[status as keyof typeof colors]}>
        {status.replace("-", " ")}
      </Badge>
    )
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateBookingStatus = (bookingId: string, newStatus: string) => {
    // In a real app, this would make an API call
    console.log(`Updating booking ${bookingId} to status: ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Booking Management</h2>
          <p className="text-gray-600">Manage customer bookings and assignments</p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
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

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
          <CardDescription>Manage and track all customer bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.customer.name}</p>
                        <p className="text-sm text-gray-500">{booking.customer.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>
                      <div>
                        <p>{booking.date}</p>
                        <p className="text-sm text-gray-500">{booking.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell className="font-medium">{booking.amount}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Booking Details - {booking.id}</DialogTitle>
                              <DialogDescription>View and manage booking information</DialogDescription>
                            </DialogHeader>
                            {selectedBooking && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-4">
                                    <div>
                                      <Label className="text-sm font-medium">Customer Information</Label>
                                      <div className="mt-2 space-y-2">
                                        <div className="flex items-center space-x-2">
                                          <Mail className="h-4 w-4 text-gray-400" />
                                          <span className="text-sm">{selectedBooking.customer.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <Phone className="h-4 w-4 text-gray-400" />
                                          <span className="text-sm">{selectedBooking.customer.phone}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <MapPin className="h-4 w-4 text-gray-400" />
                                          <span className="text-sm">{selectedBooking.address}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <div>
                                      <Label className="text-sm font-medium">Service Details</Label>
                                      <div className="mt-2 space-y-2">
                                        <p className="text-sm">
                                          <strong>Service:</strong> {selectedBooking.service}
                                        </p>
                                        <p className="text-sm">
                                          <strong>Date:</strong> {selectedBooking.date}
                                        </p>
                                        <p className="text-sm">
                                          <strong>Time:</strong> {selectedBooking.time}
                                        </p>
                                        <p className="text-sm">
                                          <strong>Amount:</strong> {selectedBooking.amount}
                                        </p>
                                        {selectedBooking.assignedTeam && (
                                          <p className="text-sm">
                                            <strong>Assigned Team:</strong> {selectedBooking.assignedTeam}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium">Status</Label>
                                  <div className="mt-2">
                                    <Select
                                      value={selectedBooking.status}
                                      onValueChange={(value) => updateBookingStatus(selectedBooking.id, value)}
                                    >
                                      <SelectTrigger className="w-48">
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

                                <div>
                                  <Label className="text-sm font-medium">Notes</Label>
                                  <Textarea
                                    className="mt-2"
                                    value={selectedBooking.notes}
                                    placeholder="Add notes about this booking..."
                                    rows={3}
                                  />
                                </div>

                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline">Cancel</Button>
                                  <Button>Save Changes</Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
