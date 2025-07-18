"use client"

import { useState } from "react"
import { useAuth } from "./admin-auth"
import { StatsOverview } from "./stats-overview"
import { BookingManagement } from "./booking-management"
import { ImageManagement } from "./image-management"
import { UserManagement } from "./user-management"
import { SiteSettings } from "./site-settings"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Calendar, ImageIcon, Users, Settings, LogOut, Menu, X } from "lucide-react"

type TabType = "dashboard" | "bookings" | "gallery" | "users" | "settings"

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, permission: "all" },
    { id: "bookings", label: "Bookings", icon: Calendar, permission: "bookings" },
    { id: "gallery", label: "Gallery", icon: ImageIcon, permission: "gallery" },
    { id: "users", label: "Users", icon: Users, permission: "users" },
    { id: "settings", label: "Settings", icon: Settings, permission: "settings" },
  ]

  const hasPermission = (permission: string) => {
    if (!user) return false
    return user.permissions.includes("all") || user.permissions.includes(permission)
  }

  const filteredTabs = tabs.filter((tab) => hasPermission(tab.permission))

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <StatsOverview />
      case "bookings":
        return <BookingManagement />
      case "gallery":
        return <ImageManagement />
      case "users":
        return <UserManagement />
      case "settings":
        return <SiteSettings />
      default:
        return <StatsOverview />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{user?.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-sm">{user?.name}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {user?.role}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <nav className="px-4 space-y-2">
          {filteredTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab(tab.id as TabType)
                  setSidebarOpen(false)
                }}
              >
                <Icon className="mr-3 h-4 w-4" />
                {tab.label}
              </Button>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="outline" className="w-full justify-start bg-transparent" onClick={logout}>
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center px-6">
          <Button variant="ghost" size="sm" className="lg:hidden mr-4" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab}</h2>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
