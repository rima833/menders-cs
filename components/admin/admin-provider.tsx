"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  db,
  type User,
  type Booking,
  type BeforeAfterImage,
  type ServicePrice,
  type SiteSettings,
} from "@/lib/database"

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

  // Site Settings
  siteSettings: SiteSettings
  updateSiteSettings: (settings: Partial<SiteSettings>) => void

  // Refresh data
  refreshData: () => void

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

  // User session management
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
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
  const [users, setUsers] = useState<User[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [beforeAfterImages, setBeforeAfterImages] = useState<BeforeAfterImage[]>([])
  const [servicePrices, setServicePrices] = useState<ServicePrice[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({} as SiteSettings)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize database and load data
  useEffect(() => {
    db.initializeDatabase()
    refreshData()

    // Check for stored session
    const storedUser = localStorage.getItem("menders_admin_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("menders_admin_user")
      }
    }
    setIsLoading(false)
  }, [])

  const refreshData = () => {
    setUsers(db.getUsers())
    setBookings(db.getBookings())
    setBeforeAfterImages(db.getBeforeAfterImages())
    setServicePrices(db.getServicePrices())
    setSiteSettings(db.getSiteSettings())
  }

  // User Management Functions
  const addUser = (user: Omit<User, "id" | "joinDate" | "lastLogin">) => {
    db.addUser(user)
    refreshData()
  }

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    db.updateUser(id, updatedUser)
    refreshData()
  }

  const deleteUser = (id: string) => {
    db.deleteUser(id)
    refreshData()
  }

  // Booking Management Functions
  const addBooking = (booking: Omit<Booking, "id" | "createdAt" | "updatedAt">) => {
    db.addBooking(booking)
    refreshData()
  }

  const updateBooking = (id: string, updatedBooking: Partial<Booking>) => {
    db.updateBooking(id, updatedBooking)
    refreshData()
  }

  const deleteBooking = (id: string) => {
    db.deleteBooking(id)
    refreshData()
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
    db.addBeforeAfterImage(image)
    refreshData()
  }

  const updateBeforeAfterImage = (id: string, updatedImage: Partial<BeforeAfterImage>) => {
    db.updateBeforeAfterImage(id, updatedImage)
    refreshData()
  }

  const deleteBeforeAfterImage = (id: string) => {
    db.deleteBeforeAfterImage(id)
    refreshData()
  }

  const toggleImagePublished = (id: string) => {
    const image = beforeAfterImages.find((img) => img.id === id)
    if (image) {
      updateBeforeAfterImage(id, { isPublished: !image.isPublished })
    }
  }

  // Service Price Management Functions
  const addServicePrice = (price: Omit<ServicePrice, "id">) => {
    db.addServicePrice(price)
    refreshData()
  }

  const updateServicePrice = (id: string, updatedPrice: Partial<ServicePrice>) => {
    db.updateServicePrice(id, updatedPrice)
    refreshData()
  }

  const deleteServicePrice = (id: string) => {
    db.deleteServicePrice(id)
    refreshData()
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

  // Site Settings Functions
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    const updated = db.updateSiteSettings(settings)
    setSiteSettings(updated)
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
    siteSettings,
    updateSiteSettings,
    refreshData,
    getStats,
    user,
    setUser: (newUser: User | null) => {
      setUser(newUser)
      if (newUser) {
        localStorage.setItem("menders_admin_user", JSON.stringify(newUser))
      } else {
        localStorage.removeItem("menders_admin_user")
      }
    },
    isLoading,
    setIsLoading,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}
