"use client"

import { useEffect } from "react"
import { AdminProvider } from "@/components/admin/admin-provider"
import { AdminAuth } from "@/components/admin/admin-auth"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { db } from "@/lib/database"

export default function AdminPage() {
  useEffect(() => {
    // Initialize Supabase connection on page load
    const initializeApp = async () => {
      try {
        // Test connection by fetching site settings
        await db.getSiteSettings()
      } catch (error) {
        console.error("Failed to connect to Supabase:", error)
      }
    }

    initializeApp()
  }, [])

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminAuth>
          <AdminDashboard />
        </AdminAuth>
      </div>
    </AdminProvider>
  )
}
