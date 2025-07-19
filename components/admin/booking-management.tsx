"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAdmin } from "./admin-provider"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
} from "lucide-react"

export function BookingManagement() {
  const { bookings, addBooking, updateBooking, deleteBooking, updateBookingStatus, assignTeam, addBookingNote, users } =
    useAdmin()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingBooking, setEditingBooking] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const [newBooking, setNewBooking] = useState({
    customerName: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    status: "pending" as const,
    amount: 0,
    city: "",
    address: "",
    assignedTeam: "",
    notes: "",
  })

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleAddBooking = () => {
    if (newBooking.customerName && newBooking.email && newBooking.service) {
      addBooking(newBooking)
      setNewBooking({
        customerName: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        time: "",
        status: "pending",
        amount: 0,
        city: "",
        address: "",
        assignedTeam: "",
        notes: "",
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditBooking = () => {
    if (editingBooking) {
      updateBooking(editingBooking.id, editingBooking)
      setIsEditDialogOpen(false)
      setEditingBooking(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-orange-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const teamMembers = users.filter((user) => user.role === "cleaner" && user.status === "active")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Booking Management</h2>
          <p className="text-gray-600">Manage customer bookings and service requests</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Booking</DialogTitle>
              <DialogDescription>Create a new customer booking</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Customer Name</Label>
                <Input
                  value={newBooking.customerName}
                  onChange={(e) => setNewBooking((prev) => ({ ...prev, customerName: e.target.value }))}
                  placeholder="Full name"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={newBooking.email}
                  onChange={(e) => setNewBooking((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="customer@email.com"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={newBooking.phone}
                  onChange={(e) => setNewBooking((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+234 801 234 5678"
                />
              </div>
              <div>
                <Label>Service</Label>
                <Select
                  value={newBooking.service}
                  onValueChange={(value) => setNewBooking((prev) => ({ ...prev, service: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Regular Home Cleaning">Regular Home Cleaning</SelectItem>
                    <SelectItem value="Deep Home Cleaning">Deep Home Cleaning</SelectItem>
                    <SelectItem value="Office Cleaning">Office Cleaning</SelectItem>
                    <SelectItem value="Post-Construction Cleaning">Post-Construction Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newBooking.date}
                  onChange={(e) => setNewBooking((prev) => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={newBooking.time}
                  onChange={(e) => setNewBooking((prev) => ({ ...prev, time: e.target.value }))}
                />
              </div>
              <div>
                <Label>Amount (₦)</Label>
                <Input
                  type="number"
                  value={newBooking.amount}
                  onChange={(e) => setNewBooking((prev) => ({ ...prev, amount: Number.parseInt(e.target.value) }))}
                  placeholder="25000"
                />
              </div>
              <div>
                <Label>City</Label>
                <Input
                  value={newBooking.city}
                  onChange={(e) => setNewBooking((prev) => ({ ...prev, city: e.target.value }))}
                  placeholder="Lagos"
                />
              </div>
              <div className="col-span-2">
                <Label>Address</Label>
                <Input
                  value={newBooking.address}
                  onChange={(e) => setNewBooking((prev) => ({ ...prev, address: e.target.value }))}
                  placeholder="Full address"
                />
              </div>
              <div className="col-span-2">
                <Label>Notes</Label>
                <Textarea
                  value={newBooking.notes}
                  onChange={(e) => setNewBooking((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Special instructions or notes"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBooking}>Add Booking</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bookings</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{booking.customerName}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    {getStatusIcon(booking.status)}
                    <span className="ml-1 capitalize">{booking.status}</span>
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {booking.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {booking.phone}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {booking.date} at {booking.time}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {booking.city}
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />₦{booking.amount.toLocaleString()}
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="font-medium text-sm">{booking.service}</p>
                {booking.assignedTeam && (
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Users className="h-4 w-4 mr-1" />
                    {booking.assignedTeam}
                  </div>
                )}
              </div>

              {booking.notes && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-gray-600">{booking.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingBooking(booking)
                    setIsEditDialogOpen(true)
                  }}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>

                <Select value={booking.status} onValueChange={(value) => updateBookingStatus(booking.id, value as any)}>
                  <SelectTrigger className="h-8 text-xs">
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

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Booking</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this booking? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteBooking(booking.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Booking Dialog */}
      {editingBooking && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Booking</DialogTitle>
              <DialogDescription>Update booking details</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Customer Name</Label>
                <Input
                  value={editingBooking.customerName}
                  onChange={(e) => setEditingBooking((prev: any) => ({ ...prev, customerName: e.target.value }))}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={editingBooking.email}
                  onChange={(e) => setEditingBooking((prev: any) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={editingBooking.phone}
                  onChange={(e) => setEditingBooking((prev: any) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label>Service</Label>
                <Select
                  value={editingBooking.service}
                  onValueChange={(value) => setEditingBooking((prev: any) => ({ ...prev, service: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Regular Home Cleaning">Regular Home Cleaning</SelectItem>
                    <SelectItem value="Deep Home Cleaning">Deep Home Cleaning</SelectItem>
                    <SelectItem value="Office Cleaning">Office Cleaning</SelectItem>
                    <SelectItem value="Post-Construction Cleaning">Post-Construction Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={editingBooking.date}
                  onChange={(e) => setEditingBooking((prev: any) => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={editingBooking.time}
                  onChange={(e) => setEditingBooking((prev: any) => ({ ...prev, time: e.target.value }))}
                />
              </div>
              <div>
                <Label>Amount (₦)</Label>
                <Input
                  type="number"
                  value={editingBooking.amount}
                  onChange={(e) =>
                    setEditingBooking((prev: any) => ({ ...prev, amount: Number.parseInt(e.target.value) }))
                  }
                />
              </div>
              <div>
                <Label>Assigned Team</Label>
                <Select
                  value={editingBooking.assignedTeam || "No team assigned"}
                  onValueChange={(value) => setEditingBooking((prev: any) => ({ ...prev, assignedTeam: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No team assigned">No team assigned</SelectItem>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label>Address</Label>
                <Input
                  value={editingBooking.address}
                  onChange={(e) => setEditingBooking((prev: any) => ({ ...prev, address: e.target.value }))}
                />
              </div>
              <div className="col-span-2">
                <Label>Notes</Label>
                <Textarea
                  value={editingBooking.notes || ""}
                  onChange={(e) => setEditingBooking((prev: any) => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditBooking}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first booking"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
