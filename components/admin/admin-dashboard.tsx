"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Camera, Settings, Users, Home, Menu, X } from "lucide-react"
import { LogoutButton, useAuth } from "./admin-auth"
import { StatsOverview } from "./stats-overview"
import { BookingManagement } from "./booking-management"
import { ImageManagement } from "./image-management"
import { SiteSettings } from "./site-settings"
import { UserManagement } from "./user-management"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: Home },
    { id: "bookings", name: "Bookings", icon: Calendar },
    { id: "gallery", name: "Gallery", icon: Camera },
    { id: "users", name: "Team", icon: Users },
    { id: "settings", name: "Settings", icon: Settings },
  ]

  const canAccess = (section: string) => {
    if (user?.role === "Admin") return true
    if (user?.role === "Manager") {
      return ["dashboard", "bookings", "gallery", "users"].includes(section)
    }
    if (user?.role === "Cleaner") {
      return ["dashboard", "bookings"].includes(section)
    }
    return false
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              if (!canAccess(item.id)) return null

              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab(item.id)
                    setSidebarOpen(false)
                  }}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Button>
              )
            })}
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{user?.email?.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                  <Badge variant="secondary" className="text-xs">
                    {user?.role}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold text-gray-900 capitalize">
                {navigation.find((nav) => nav.id === activeTab)?.name || "Dashboard"}
              </h2>
            </div>
            <LogoutButton />
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {activeTab === "dashboard" && <StatsOverview />}
          {activeTab === "bookings" && <BookingManagement />}
          {activeTab === "gallery" && <ImageManagement />}
          {activeTab === "users" && canAccess("users") && <UserManagement />}
          {activeTab === "settings" && canAccess("settings") && <SiteSettings />}
        </main>
      </div>
    </div>
  )
}
