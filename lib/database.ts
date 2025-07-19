// Database simulation using localStorage for demo
// In production, replace with actual database (Supabase, MongoDB, etc.)

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "manager" | "cleaner"
  status: "active" | "inactive"
  joinDate: string
  lastLogin: string
  avatar?: string
  password?: string
}

export interface Booking {
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

export interface BeforeAfterImage {
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

export interface ServicePrice {
  id: string
  name: string
  basePrice: number
  description: string
  category: "residential" | "commercial" | "specialized"
  isActive: boolean
  addOns: { name: string; price: number }[]
}

export interface SiteSettings {
  id: string
  companyName: string
  email: string
  phone: string
  address: string
  website: string
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  businessHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  emergencyContact: string
  taxRate: number
  currency: string
}

class Database {
  private getStorageKey(table: string): string {
    return `menders_${table}`
  }

  // Generic CRUD operations
  private getAll<T>(table: string): T[] {
    try {
      const data = localStorage.getItem(this.getStorageKey(table))
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }

  private save<T>(table: string, data: T[]): void {
    localStorage.setItem(this.getStorageKey(table), JSON.stringify(data))
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
  }

  // Users
  getUsers(): User[] {
    return this.getAll<User>("users")
  }

  addUser(user: Omit<User, "id" | "joinDate" | "lastLogin">): User {
    const users = this.getUsers()
    const newUser: User = {
      ...user,
      id: this.generateId(),
      joinDate: new Date().toISOString().split("T")[0],
      lastLogin: new Date().toISOString(),
    }
    users.push(newUser)
    this.save("users", users)
    return newUser
  }

  updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers()
    const index = users.findIndex((u) => u.id === id)
    if (index === -1) return null

    users[index] = { ...users[index], ...updates }
    this.save("users", users)
    return users[index]
  }

  deleteUser(id: string): boolean {
    const users = this.getUsers()
    const filtered = users.filter((u) => u.id !== id)
    if (filtered.length === users.length) return false

    this.save("users", filtered)
    return true
  }

  authenticateUser(email: string, password: string): User | null {
    const users = this.getUsers()
    const user = users.find((u) => u.email === email && u.password === password)
    if (user) {
      this.updateUser(user.id, { lastLogin: new Date().toISOString() })
      return user
    }
    return null
  }

  // Bookings
  getBookings(): Booking[] {
    return this.getAll<Booking>("bookings")
  }

  addBooking(booking: Omit<Booking, "id" | "createdAt" | "updatedAt">): Booking {
    const bookings = this.getBookings()
    const newBooking: Booking = {
      ...booking,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    bookings.push(newBooking)
    this.save("bookings", bookings)
    return newBooking
  }

  updateBooking(id: string, updates: Partial<Booking>): Booking | null {
    const bookings = this.getBookings()
    const index = bookings.findIndex((b) => b.id === id)
    if (index === -1) return null

    bookings[index] = { ...bookings[index], ...updates, updatedAt: new Date().toISOString() }
    this.save("bookings", bookings)
    return bookings[index]
  }

  deleteBooking(id: string): boolean {
    const bookings = this.getBookings()
    const filtered = bookings.filter((b) => b.id !== id)
    if (filtered.length === bookings.length) return false

    this.save("bookings", filtered)
    return true
  }

  // Before/After Images
  getBeforeAfterImages(): BeforeAfterImage[] {
    return this.getAll<BeforeAfterImage>("images")
  }

  addBeforeAfterImage(image: Omit<BeforeAfterImage, "id" | "uploadDate">): BeforeAfterImage {
    const images = this.getBeforeAfterImages()
    const newImage: BeforeAfterImage = {
      ...image,
      id: this.generateId(),
      uploadDate: new Date().toISOString().split("T")[0],
    }
    images.push(newImage)
    this.save("images", images)
    return newImage
  }

  updateBeforeAfterImage(id: string, updates: Partial<BeforeAfterImage>): BeforeAfterImage | null {
    const images = this.getBeforeAfterImages()
    const index = images.findIndex((i) => i.id === id)
    if (index === -1) return null

    images[index] = { ...images[index], ...updates }
    this.save("images", images)
    return images[index]
  }

  deleteBeforeAfterImage(id: string): boolean {
    const images = this.getBeforeAfterImages()
    const filtered = images.filter((i) => i.id !== id)
    if (filtered.length === images.length) return false

    this.save("images", filtered)
    return true
  }

  // Service Prices
  getServicePrices(): ServicePrice[] {
    return this.getAll<ServicePrice>("prices")
  }

  addServicePrice(price: Omit<ServicePrice, "id">): ServicePrice {
    const prices = this.getServicePrices()
    const newPrice: ServicePrice = {
      ...price,
      id: this.generateId(),
    }
    prices.push(newPrice)
    this.save("prices", prices)
    return newPrice
  }

  updateServicePrice(id: string, updates: Partial<ServicePrice>): ServicePrice | null {
    const prices = this.getServicePrices()
    const index = prices.findIndex((p) => p.id === id)
    if (index === -1) return null

    prices[index] = { ...prices[index], ...updates }
    this.save("prices", prices)
    return prices[index]
  }

  deleteServicePrice(id: string): boolean {
    const prices = this.getServicePrices()
    const filtered = prices.filter((p) => p.id !== id)
    if (filtered.length === prices.length) return false

    this.save("prices", filtered)
    return true
  }

  // Site Settings
  getSiteSettings(): SiteSettings {
    const settings = this.getAll<SiteSettings>("settings")
    return settings[0] || this.getDefaultSettings()
  }

  updateSiteSettings(updates: Partial<SiteSettings>): SiteSettings {
    const currentSettings = this.getSiteSettings()
    const updatedSettings = { ...currentSettings, ...updates }
    this.save("settings", [updatedSettings])
    return updatedSettings
  }

  private getDefaultSettings(): SiteSettings {
    return {
      id: "1",
      companyName: "Menders Cleaning Services",
      email: "info@menderscleaning.ng",
      phone: "+234 803 123 4567",
      address: "Lagos, Nigeria",
      website: "https://menderscleaning.ng",
      socialMedia: {
        facebook: "https://facebook.com/menderscleaning",
        instagram: "https://instagram.com/menderscleaning",
        twitter: "https://twitter.com/menderscleaning",
      },
      businessHours: {
        monday: "8:00 AM - 6:00 PM",
        tuesday: "8:00 AM - 6:00 PM",
        wednesday: "8:00 AM - 6:00 PM",
        thursday: "8:00 AM - 6:00 PM",
        friday: "8:00 AM - 6:00 PM",
        saturday: "9:00 AM - 4:00 PM",
        sunday: "Closed",
      },
      emergencyContact: "+234 803 123 4567",
      taxRate: 7.5,
      currency: "NGN",
    }
  }

  // Initialize database with default data
  initializeDatabase(): void {
    // Check if already initialized
    if (localStorage.getItem("menders_initialized")) return

    // Add default admin user with your real credentials
    const defaultUsers: User[] = [
      {
        id: "admin-001",
        name: "Menders Admin", // Replace with your real name
        email: "admin@menderscleaning.ng", // Replace with your real email
        phone: "+234 803 123 4567", // Replace with your real phone
        role: "admin",
        status: "active",
        joinDate: "2024-01-01",
        lastLogin: new Date().toISOString(),
        password: "MendersAdmin2024!", // Replace with your real password
      },
      {
        id: "manager-001",
        name: "Sarah Johnson",
        email: "manager@menderscleaning.ng",
        phone: "+234 803 234 5678",
        role: "manager",
        status: "active",
        joinDate: "2024-01-15",
        lastLogin: "2024-01-19T10:30:00Z",
        password: "Manager123!",
      },
      {
        id: "cleaner-001",
        name: "David Okafor",
        email: "cleaner@menderscleaning.ng",
        phone: "+234 803 345 6789",
        role: "cleaner",
        status: "active",
        joinDate: "2024-02-01",
        lastLogin: "2024-01-19T14:20:00Z",
        password: "Cleaner123!",
      },
    ]

    const defaultBookings: Booking[] = [
      {
        id: "booking-001",
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
        id: "booking-002",
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
    ]

    const defaultPrices: ServicePrice[] = [
      {
        id: "price-001",
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
        id: "price-002",
        name: "Deep Home Cleaning",
        basePrice: 45000,
        description:
          "Comprehensive deep cleaning including all regular services plus detailed cleaning of all surfaces",
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
        id: "price-003",
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
    ]

    const defaultImages: BeforeAfterImage[] = [
      {
        id: "image-001",
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
    ]

    // Save all default data
    this.save("users", defaultUsers)
    this.save("bookings", defaultBookings)
    this.save("prices", defaultPrices)
    this.save("images", defaultImages)
    this.save("settings", [this.getDefaultSettings()])

    // Mark as initialized
    localStorage.setItem("menders_initialized", "true")
  }

  // Reset database (for testing)
  resetDatabase(): void {
    localStorage.removeItem("menders_initialized")
    localStorage.removeItem("menders_users")
    localStorage.removeItem("menders_bookings")
    localStorage.removeItem("menders_prices")
    localStorage.removeItem("menders_images")
    localStorage.removeItem("menders_settings")
    this.initializeDatabase()
  }
}

export const db = new Database()
