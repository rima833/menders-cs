"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Edit,
  Eye,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"

export function BookingManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)

  const bookings = [
    {
      id: "BK001",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+234 801 234 5678",
      },
      service: "Deep Cleaning",
      date: "2024-01-20",
      time: "10:00 AM",
      duration: "4 hours",
      address: "15 Victoria Island, Lagos",
      status: "confirmed",
      amount: "₦45,000",
      assignedTeam: "Team A",
      notes: "Customer requested eco-friendly products",
      createdAt: "2024-01-15",
    },
    {
      id: "BK002",
      customer: {
        name: "Michael Chen",
        email: "michael.chen@email.com",
        phone: "+234 802 345 6789",
      },
      service: "Regular Cleaning",
      date: "2024-01-20",
      time: "2:00 PM",
      duration: "2 hours",
      address: "8 Ikoyi Road, Lagos",
      status: "pending",
      amount: "₦25,000",
      assignedTeam: null,
      notes: "First-time customer",
      createdAt: "2024-01-18",
    },
    {
      id: "BK003",
      customer: {
        name: "Emma Wilson",
        email: "emma.wilson@email.com",
        phone: "+234 803 456 7890",
      },
      service: "Move-in Cleaning",
      date: "2024-01-19",
      time: "9:00 AM",
      duration: "6 hours",
      address: "22 Lekki Phase 1, Lagos",
      status: "completed",
      amount: "₦65,000",
      assignedTeam: "Team B",
      notes: "New apartment, thorough cleaning required",
      createdAt: "2024-01-12",
    },
    {
      id: "BK004",
      customer: {
        name: "David Brown",
        email: "david.brown@email.com",
        phone: "+234 804 567 8901",
      },
      service: "Office Cleaning",
      date: "2024-01-21",
      time: "11:00 AM",
      duration: "3 hours",
      address: "45 Allen Avenue, Ikeja",
      status: "confirmed",
      amount: "₦85,000",
      assignedTeam: "Team C",
      notes: "Weekly recurring service",
      createdAt: "2024-01-10",
    },
  ]

  const teams = ["Team A", "Team B", "Team C", "Team D"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
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
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
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

  const assignTeam = (bookingId: string, team: string) => {
    // In a real app, this would make an API call
    console.log(`Assigning ${team} to booking ${bookingId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
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
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
                  <TableHead>Team</TableHead>
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
                        <div className="font-medium">{booking.customer.name}</div>
                        <div className="text-sm text-gray-500">{booking.customer.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>
                      <div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {booking.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-1 h-3 w-3" />
                          {booking.time}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(booking.status)}>
                        <span className="flex items-center space-x-1">
                          {getStatusIcon(booking.status)}
                          <span className="capitalize">{booking.status}</span>
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {booking.assignedTeam ? (
                        <Badge variant="outline">{booking.assignedTeam}</Badge>
                      ) : (
                        <span className="text-gray-400">Unassigned</span>
                      )}
                    </TableCell>
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
                                  <div>
                                    <h3 className="font-semibold mb-2">Customer Information</h3>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex items-center">
                                        <span className="font-medium w-20">Name:</span>
                                        {selectedBooking.customer.name}
                                      </div>
                                      <div className="flex items-center">
                                        <Mail className="mr-2 h-4 w-4" />
                                        {selectedBooking.customer.email}
                                      </div>
                                      <div className="flex items-center">
                                        <Phone className="mr-2 h-4 w-4" />
                                        {selectedBooking.customer.phone}
                                      </div>
                                      <div className="flex items-center">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        {selectedBooking.address}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h3 className="font-semibold mb-2">Service Details</h3>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <span className="font-medium">Service:</span> {selectedBooking.service}
                                      </div>
                                      <div>
                                        <span className="font-medium">Date:</span> {selectedBooking.date}
                                      </div>
                                      <div>
                                        <span className="font-medium">Time:</span> {selectedBooking.time}
                                      </div>
                                      <div>
                                        <span className="font-medium">Duration:</span> {selectedBooking.duration}
                                      </div>
                                      <div>
                                        <span className="font-medium">Amount:</span> {selectedBooking.amount}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="font-semibold mb-2">Management</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="status">Status</Label>
                                      <Select
                                        value={selectedBooking.status}
                                        onValueChange={(value) => updateBookingStatus(selectedBooking.id, value)}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="pending">Pending</SelectItem>
                                          <SelectItem value="confirmed">Confirmed</SelectItem>
                                          <SelectItem value="completed">Completed</SelectItem>
                                          <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div>
                                      <Label htmlFor="team">Assigned Team</Label>
                                      <Select
                                        value={selectedBooking.assignedTeam || ""}
                                        onValueChange={(value) => assignTeam(selectedBooking.id, value)}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select team" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {teams.map((team) => (
                                            <SelectItem key={team} value={team}>
                                              {team}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <Label htmlFor="notes">Notes</Label>
                                  <Textarea
                                    id="notes"
                                    value={selectedBooking.notes}
                                    onChange={(e) => {
                                      setSelectedBooking({
                                        ...selectedBooking,
                                        notes: e.target.value,
                                      })
                                    }}
                                    placeholder="Add notes about this booking..."
                                    className="mt-1"
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
