import { supabase } from "./supabase"
import type { User, Service, Booking, GalleryImage, SiteSetting } from "./supabase"

// User operations
export const userOperations = {
  async getAll(): Promise<User[]> {
    const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<User | null> {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

    if (error) throw error
    return data
  },

  async getByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

    if (error && error.code !== "PGRST116") throw error
    return data
  },

  async create(user: Omit<User, "id" | "created_at" | "updated_at">): Promise<User> {
    const { data, error } = await supabase.from("users").insert(user).select().single()

    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase.from("users").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("users").delete().eq("id", id)

    if (error) throw error
  },
}

// Service operations
export const serviceOperations = {
  async getAll(): Promise<Service[]> {
    const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  },

  async getActive(): Promise<Service[]> {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  },

  async create(service: Omit<Service, "id" | "created_at" | "updated_at">): Promise<Service> {
    const { data, error } = await supabase.from("services").insert(service).select().single()

    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<Service>): Promise<Service> {
    const { data, error } = await supabase.from("services").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("services").delete().eq("id", id)

    if (error) throw error
  },
}

// Booking operations
export const bookingOperations = {
  async getAll(): Promise<Booking[]> {
    const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  },

  async getByStatus(status: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  },

  async create(booking: Omit<Booking, "id" | "created_at" | "updated_at">): Promise<Booking> {
    const { data, error } = await supabase.from("bookings").insert(booking).select().single()

    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<Booking>): Promise<Booking> {
    const { data, error } = await supabase.from("bookings").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("bookings").delete().eq("id", id)

    if (error) throw error
  },
}

// Gallery operations
export const galleryOperations = {
  async getAll(): Promise<GalleryImage[]> {
    const { data, error } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  },

  async getFeatured(): Promise<GalleryImage[]> {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("is_featured", true)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  },

  async create(image: Omit<GalleryImage, "id" | "created_at" | "updated_at">): Promise<GalleryImage> {
    const { data, error } = await supabase.from("gallery_images").insert(image).select().single()

    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<GalleryImage>): Promise<GalleryImage> {
    const { data, error } = await supabase.from("gallery_images").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("gallery_images").delete().eq("id", id)

    if (error) throw error
  },
}

// Site settings operations
export const settingsOperations = {
  async getAll(): Promise<SiteSetting[]> {
    const { data, error } = await supabase.from("site_settings").select("*").order("key")

    if (error) throw error
    return data || []
  },

  async getByKey(key: string): Promise<string | null> {
    const { data, error } = await supabase.from("site_settings").select("value").eq("key", key).single()

    if (error && error.code !== "PGRST116") throw error
    return data?.value || null
  },

  async set(key: string, value: string, description?: string): Promise<SiteSetting> {
    const { data, error } = await supabase.from("site_settings").upsert({ key, value, description }).select().single()

    if (error) throw error
    return data
  },

  async delete(key: string): Promise<void> {
    const { error } = await supabase.from("site_settings").delete().eq("key", key)

    if (error) throw error
  },
}

// Authentication helper
export const authOperations = {
  async login(email: string, password: string): Promise<User | null> {
    const user = await userOperations.getByEmail(email)
    if (!user) return null

    // In a real app, you'd use bcrypt to compare passwords
    // For demo purposes, we'll use a simple comparison
    const isValidPassword = password === "MendersAdmin2024!" || password === "Manager123!" || password === "Cleaner123!"

    return isValidPassword ? user : null
  },
}
