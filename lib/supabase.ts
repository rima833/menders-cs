import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface User {
  id: string
  email: string
  password_hash: string
  role: "admin" | "manager" | "cleaner"
  name: string
  phone?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name: string
  description?: string
  base_price: number
  category: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  service_type: string
  property_size: string
  frequency: string
  preferred_date: string
  preferred_time: string
  total_amount?: number
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  assigned_cleaner_id?: string
  special_requests?: string
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: string
  title: string
  before_image_url: string
  after_image_url: string
  description?: string
  service_type?: string
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value: string
  description?: string
  created_at: string
  updated_at: string
}
