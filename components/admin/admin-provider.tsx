"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "manager" | "cleaner"
  status: "active" | "inactive"
  joinDate: string
  lastLogin: string
}

interface Booking {
  id: string
  customerName: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
  amount: number
  city: string
  address: string
  assignedTeam?: string
  notes?: string
}

interface BeforeAfterImage {
  id: string
  title: string
  location: string
  serviceType: string
  beforeImage: string
  afterImage: string
  description: string
  duration: string
  client: string
  rating: number
  isPublished: boolean
  uploadDate: string
}

interface AdminContextType {
  // Users
  users: User[]
  addUser: (user: Omit<User, "id">) => void
  updateUser: (id: string, user: Partial<User>) => void
  deleteUser: (id: string) => void

  // Bookings
  bookings: Booking[]
  updateBookingStatus: (id: string, status: Booking["status"]) => void
  assignTeam: (bookingId: string, team: string) => void
  addBookingNote: (bookingId: string, note: string) => void

  // Before/After Images
  beforeAfterImages: BeforeAfterImage[]
  addBeforeAfterImage: (image: Omit<BeforeAfterImage, "id" | "uploadDate">) => void
  updateBeforeAfterImage: (id: string, image: Partial<BeforeAfterImage>) => void
  deleteBeforeAfterImage: (id: string) => void
  toggleImagePublished: (id: string) => void

  // Stats
  getStats: () => {
    totalBookings: number
    pendingBookings: number
    completedBookings: number
    totalRevenue: number
    activeUsers: number
    publishedImages: number
  }
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider")
  }
  return context
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Admin",
      email: "admin@menderscleaning.ng",
      phone: "08012345678",
      role: "admin",
      status: "active",
      joinDate: "2024-01-01",
      lastLogin: "2024-01-20",
    },
    {
      id: "2",
      name: "Sarah Manager",
      email: "sarah@menderscleaning.ng",
      phone: "08087654321",
      role: "manager",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-01-19",
    },
  ])

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      customerName: "Mrs. Adebayo",
      email: "adebayo@email.com",
      phone: "08011111111",
      service: "Deep Cleaning",
      date: "2024-01-25",
      time: "10:00 AM",
      status: "confirmed",
      amount: 25000,
      city: "Abuja",
      address: "123 Maitama District",
      assignedTeam: "Team A",
    },
    {
      id: "2",
      customerName: "Tunde O.",
      email: "tunde@email.com",
      phone: "08022222222",
      service: "Post-Construction",
      date: "2024-01-26",
      time: "2:00 PM",
      status: "pending",
      amount: 45000,
      city: "Lagos",
      address: "456 Victoria Island",
    },
  ])

  const [beforeAfterImages, setBeforeAfterImages] = useState<BeforeAfterImage[]>([
    {
      id: "1",
      title: "Living Room Deep Clean",
      location: "Abuja",
      serviceType: "Deep Cleaning",
      beforeImage: "/placeholder.svg?height=300&width=400&text=Before+Living+Room",
      afterImage: "/placeholder.svg?height=300&width=400&text=After+Living+Room",
      description: "Complete transformation of a family living room with deep carpet cleaning and furniture polishing.",
      duration: "3 hours",
      client: "Mrs. Adebayo",
      rating: 5,
      isPublished: true,
      uploadDate: "2024-01-15",
    },
  ])

  const addUser = (user: Omit<User, "id">) => {
    setUsers((prev) => [...prev, { ...user, id: Date.now().toString() }])
  }

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)))
  }

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  const updateBookingStatus = (id: string, status: Booking["status"]) => {
    setBookings((prev) => prev.map((booking) => (booking.id === id ? { ...booking, status } : booking)))
  }

  const assignTeam = (bookingId: string, team: string) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, assignedTeam: team } : booking)),
    )
  }

  const addBookingNote = (bookingId: string, note: string) => {
    setBookings((prev) => prev.map((booking) => (booking.id === bookingId ? { ...booking, notes: note } : booking)))
  }

  const addBeforeAfterImage = (image: Omit<BeforeAfterImage, "id" | "uploadDate">) => {
    setBeforeAfterImages((prev) => [
      ...prev,
      { ...image, id: Date.now().toString(), uploadDate: new Date().toISOString().split("T")[0] },
    ])
  }

  const updateBeforeAfterImage = (id: string, updatedImage: Partial<BeforeAfterImage>) => {
    setBeforeAfterImages((prev) => prev.map((image) => (image.id === id ? { ...image, ...updatedImage } : image)))
  }

  const deleteBeforeAfterImage = (id: string) => {
    setBeforeAfterImages((prev) => prev.filter((image) => image.id !== id))
  }

  const toggleImagePublished = (id: string) => {
    setBeforeAfterImages((prev) =>
      prev.map((image) => (image.id === id ? { ...image, isPublished: !image.isPublished } : image)),
    )
  }

  const getStats = () => ({
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    completedBookings: bookings.filter((b) => b.status === "completed").length,
    totalRevenue: bookings.filter((b) => b.status === "completed").reduce((sum, b) => sum + b.amount, 0),
    activeUsers: users.filter((u) => u.status === "active").length,
    publishedImages: beforeAfterImages.filter((i) => i.isPublished).length,
  })

  const value = {
    users,
    addUser,
    updateUser,
    deleteUser,
    bookings,
    updateBookingStatus,
    assignTeam,
    addBookingNote,
    beforeAfterImages,
    addBeforeAfterImage,
    updateBeforeAfterImage,
    deleteBeforeAfterImage,
    toggleImagePublished,
    getStats,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}
