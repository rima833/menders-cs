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
  avatar?: string
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
  createdAt: string
  updatedAt: string
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
  tags: string[]
}

interface ServicePrice {
  id: string
  name: string
  basePrice: number
  description: string
  category: "residential" | "commercial" | "specialized"
  isActive: boolean
  addOns: { name: string; price: number }[]
}

interface AdminContextType {
  // Users
  users: User[]
  addUser: (user: Omit<User, "id" | "joinDate" | "lastLogin">) => void
  updateUser: (id: string, user: Partial<User>) => void
  deleteUser: (id: string) => void

  // Bookings
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, "id" | "createdAt" | "updatedAt">) => void
  updateBooking: (id: string, booking: Partial<Booking>) => void
  deleteBooking: (id: string) => void
  updateBookingStatus: (id: string, status: Booking["status"]) => void
  assignTeam: (bookingId: string, team: string) => void
  addBookingNote: (bookingId: string, note: string) => void

  // Before/After Images
  beforeAfterImages: BeforeAfterImage[]
  addBeforeAfterImage: (image: Omit<BeforeAfterImage, "id" | "uploadDate">) => void
  updateBeforeAfterImage: (id: string, image: Partial<BeforeAfterImage>) => void
  deleteBeforeAfterImage: (id: string) => void
  toggleImagePublished: (id: string) => void

  // Service Prices
  servicePrices: ServicePrice[]
  addServicePrice: (price: Omit<ServicePrice, "id">) => void
  updateServicePrice: (id: string, price: Partial<ServicePrice>) => void
  deleteServicePrice: (id: string) => void
  calculatePrice: (serviceId: string, size: string, frequency: string, addOns: string[]) => number

  // Stats
  getStats: () => {
    totalBookings: number
    pendingBookings: number
    completedBookings: number
    totalRevenue: number
    activeUsers: number
    publishedImages: number
    monthlyRevenue: number
    averageBookingValue: number
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
      name: "Menders Admin",
      email: "admin@menderscleaning.ng",
      phone: "+234 803 123 4567",
      role: "admin",
      status: "active",
      joinDate: "2024-01-01",
      lastLogin: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.manager@menderscleaning.ng",
      phone: "+234 803 234 5678",
      role: "manager",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-01-19T10:30:00Z",
    },
    {
      id: "3",
      name: "David Okafor",
      email: "david.cleaner@menderscleaning.ng",
      phone: "+234 803 345 6789",
      role: "cleaner",
      status: "active",
      joinDate: "2024-02-01",
      lastLogin: "2024-01-19T14:20:00Z",
    },
    {
      id: "4",
      name: "Grace Adebayo",
      email: "grace.cleaner@menderscleaning.ng",
      phone: "+234 803 456 7890",
      role: "cleaner",
      status: "active",
      joinDate: "2024-02-10",
      lastLogin: "2024-01-19T09:15:00Z",
    },
  ])

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      customerName: "Mrs. Adebayo Funmi",
      email: "funmi.adebayo@email.com",
      phone: "+234 801 111 1111",
      service: "Deep Cleaning",
      date: "2024-01-25",
      time: "10:00 AM",
      status: "confirmed",
      amount: 45000,
      city: "Lagos",
      address: "15 Admiralty Way, Lekki Phase 1, Lagos",
      assignedTeam: "Team A (David & Grace)",
      notes: "Customer prefers eco-friendly products",
      createdAt: "2024-01-20T08:00:00Z",
      updatedAt: "2024-01-21T10:30:00Z",
    },
    {
      id: "2",
      customerName: "Tunde Ogundimu",
      email: "tunde.ogundimu@email.com",
      phone: "+234 802 222 2222",
      service: "Post-Construction Cleaning",
      date: "2024-01-26",
      time: "2:00 PM",
      status: "pending",
      amount: 120000,
      city: "Lagos",
      address: "Plot 456, Victoria Island, Lagos",
      createdAt: "2024-01-22T14:00:00Z",
      updatedAt: "2024-01-22T14:00:00Z",
    },
    {
      id: "3",
      customerName: "Kemi Adesola",
      email: "kemi.adesola@email.com",
      phone: "+234 803 333 3333",
      service: "Office Cleaning",
      date: "2024-01-24",
      time: "6:00 PM",
      status: "completed",
      amount: 75000,
      city: "Lagos",
      address: "12th Floor, UBA Building, Marina, Lagos",
      assignedTeam: "Team B",
      notes: "Weekly recurring service",
      createdAt: "2024-01-15T12:00:00Z",
      updatedAt: "2024-01-24T18:30:00Z",
    },
  ])

  const [beforeAfterImages, setBeforeAfterImages] = useState<BeforeAfterImage[]>([
    {
      id: "1",
      title: "Luxury Living Room Transformation",
      location: "Lekki Phase 1, Lagos",
      serviceType: "Deep Cleaning",
      beforeImage: "/placeholder.svg?height=300&width=400&text=Before+Living+Room",
      afterImage: "/placeholder.svg?height=300&width=400&text=After+Living+Room",
      description:
        "Complete transformation of a luxury family living room with deep carpet cleaning, furniture polishing, and window cleaning.",
      duration: "4 hours",
      client: "Mrs. Adebayo Funmi",
      rating: 5,
      isPublished: true,
      uploadDate: "2024-01-15",
      tags: ["living room", "deep cleaning", "luxury"],
    },
    {
      id: "2",
      title: "Office Space Deep Clean",
      location: "Victoria Island, Lagos",
      serviceType: "Office Cleaning",
      beforeImage: "/placeholder.svg?height=300&width=400&text=Before+Office",
      afterImage: "/placeholder.svg?height=300&width=400&text=After+Office",
      description: "Professional office cleaning including workstations, conference rooms, and common areas.",
      duration: "6 hours",
      client: "Tech Solutions Ltd",
      rating: 5,
      isPublished: true,
      uploadDate: "2024-01-18",
      tags: ["office", "commercial", "workstation"],
    },
  ])

  const [servicePrices, setServicePrices] = useState<ServicePrice[]>([
    {
      id: "1",
      name: "Regular Home Cleaning",
      basePrice: 25000,
      description: "Standard cleaning for homes including dusting, vacuuming, mopping, and bathroom cleaning",
      category: "residential",
      isActive: true,
      addOns: [
        { name: "Window Cleaning", price: 5000 },
        { name: "Carpet Deep Clean", price: 8000 },
        { name: "Appliance Cleaning", price: 6000 },
      ],
    },
    {
      id: "2",
      name: "Deep Home Cleaning",
      basePrice: 45000,
      description: "Comprehensive deep cleaning including all regular services plus detailed cleaning of all surfaces",
      category: "residential",
      isActive: true,
      addOns: [
        { name: "Window Cleaning", price: 5000 },
        { name: "Carpet Deep Clean", price: 8000 },
        { name: "Appliance Cleaning", price: 6000 },
        { name: "Upholstery Cleaning", price: 12000 },
      ],
    },
    {
      id: "3",
      name: "Office Cleaning",
      basePrice: 75000,
      description: "Professional office cleaning including workstations, meeting rooms, and common areas",
      category: "commercial",
      isActive: true,
      addOns: [
        { name: "Window Cleaning", price: 8000 },
        { name: "Carpet Cleaning", price: 15000 },
        { name: "Kitchen Deep Clean", price: 10000 },
      ],
    },
    {
      id: "4",
      name: "Post-Construction Cleaning",
      basePrice: 120000,
      description: "Specialized cleaning for newly constructed or renovated spaces",
      category: "specialized",
      isActive: true,
      addOns: [
        { name: "Paint Splatter Removal", price: 20000 },
        { name: "Debris Removal", price: 15000 },
        { name: "Window Installation Clean", price: 10000 },
      ],
    },
  ])

  // User Management Functions
  const addUser = (user: Omit<User, "id" | "joinDate" | "lastLogin">) => {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      joinDate: new Date().toISOString().split("T")[0],
      lastLogin: new Date().toISOString(),
    }
    setUsers((prev) => [...prev, newUser])
  }

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)))
  }

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  // Booking Management Functions
  const addBooking = (booking: Omit<Booking, "id" | "createdAt" | "updatedAt">) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setBookings((prev) => [...prev, newBooking])
  }

  const updateBooking = (id: string, updatedBooking: Partial<Booking>) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, ...updatedBooking, updatedAt: new Date().toISOString() } : booking,
      ),
    )
  }

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id))
  }

  const updateBookingStatus = (id: string, status: Booking["status"]) => {
    updateBooking(id, { status })
  }

  const assignTeam = (bookingId: string, team: string) => {
    updateBooking(bookingId, { assignedTeam: team })
  }

  const addBookingNote = (bookingId: string, note: string) => {
    updateBooking(bookingId, { notes: note })
  }

  // Image Management Functions
  const addBeforeAfterImage = (image: Omit<BeforeAfterImage, "id" | "uploadDate">) => {
    const newImage: BeforeAfterImage = {
      ...image,
      id: Date.now().toString(),
      uploadDate: new Date().toISOString().split("T")[0],
    }
    setBeforeAfterImages((prev) => [...prev, newImage])
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

  // Service Price Management Functions
  const addServicePrice = (price: Omit<ServicePrice, "id">) => {
    const newPrice: ServicePrice = {
      ...price,
      id: Date.now().toString(),
    }
    setServicePrices((prev) => [...prev, newPrice])
  }

  const updateServicePrice = (id: string, updatedPrice: Partial<ServicePrice>) => {
    setServicePrices((prev) => prev.map((price) => (price.id === id ? { ...price, ...updatedPrice } : price)))
  }

  const deleteServicePrice = (id: string) => {
    setServicePrices((prev) => prev.filter((price) => price.id !== id))
  }

  const calculatePrice = (serviceId: string, size: string, frequency: string, addOns: string[]): number => {
    const service = servicePrices.find((s) => s.id === serviceId)
    if (!service) return 0

    const basePrice = service.basePrice

    // Size multipliers
    const sizeMultipliers = {
      small: 1,
      medium: 1.5,
      large: 2,
      "extra-large": 2.5,
    }

    // Frequency discounts
    const frequencyDiscounts = {
      "one-time": 1,
      weekly: 0.85,
      "bi-weekly": 0.9,
      monthly: 0.95,
    }

    const sizeMultiplier = sizeMultipliers[size as keyof typeof sizeMultipliers] || 1
    const frequencyDiscount = frequencyDiscounts[frequency as keyof typeof frequencyDiscounts] || 1

    // Calculate add-ons
    const addOnTotal = addOns.reduce((total, addOnName) => {
      const addOn = service.addOns.find((a) => a.name === addOnName)
      return total + (addOn ? addOn.price : 0)
    }, 0)

    const totalPrice = basePrice * sizeMultiplier * frequencyDiscount + addOnTotal
    return Math.round(totalPrice)
  }

  // Stats Function
  const getStats = () => {
    const totalBookings = bookings.length
    const pendingBookings = bookings.filter((b) => b.status === "pending").length
    const completedBookings = bookings.filter((b) => b.status === "completed").length
    const totalRevenue = bookings.filter((b) => b.status === "completed").reduce((sum, b) => sum + b.amount, 0)
    const activeUsers = users.filter((u) => u.status === "active").length
    const publishedImages = beforeAfterImages.filter((i) => i.isPublished).length

    // Calculate monthly revenue (current month)
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const monthlyRevenue = bookings
      .filter((b) => {
        const bookingDate = new Date(b.date)
        return (
          b.status === "completed" &&
          bookingDate.getMonth() === currentMonth &&
          bookingDate.getFullYear() === currentYear
        )
      })
      .reduce((sum, b) => sum + b.amount, 0)

    const averageBookingValue = completedBookings > 0 ? totalRevenue / completedBookings : 0

    return {
      totalBookings,
      pendingBookings,
      completedBookings,
      totalRevenue,
      activeUsers,
      publishedImages,
      monthlyRevenue,
      averageBookingValue,
    }
  }

  const value = {
    users,
    addUser,
    updateUser,
    deleteUser,
    bookings,
    addBooking,
    updateBooking,
    deleteBooking,
    updateBookingStatus,
    assignTeam,
    addBookingNote,
    beforeAfterImages,
    addBeforeAfterImage,
    updateBeforeAfterImage,
    deleteBeforeAfterImage,
    toggleImagePublished,
    servicePrices,
    addServicePrice,
    updateServicePrice,
    deleteServicePrice,
    calculatePrice,
    getStats,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}
