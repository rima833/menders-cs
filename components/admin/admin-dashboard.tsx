"use client"

import { useState } from "react"
import { useAuth } from "./admin-auth"
import { StatsOverview } from "./stats-overview"
import { BookingManagement } from "./booking-management"
import { ImageManagement } from "./image-management"
import { UserManagement } from "./user-management"
import { SiteSettings } from "./site-settings"
import { PricingManagement } from "./pricing-management"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Calendar, ImageIcon, Users, Settings, DollarSign, LogOut, Menu, X } from "lucide-react"

type TabType = "dashboard" | "bookings" | "gallery" | "users" | "pricing" | "settings"

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, permission: "all" },
    { id: "bookings", label: "Bookings", icon: Calendar, permission: "bookings" },
    { id: "pricing", label: "Pricing", icon: DollarSign, permission: "pricing" },
    { id: "gallery", label: "Gallery", icon: ImageIcon, permission: "gallery" },
    { id: "users", label: "Team", icon: Users, permission: "users" },
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
      case "pricing":
        return <PricingManagement />
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
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b bg-gradient-to-r from-blue-600 to-blue-700">
          <h1 className="text-xl font-bold text-white">Menders Admin</h1>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-blue-800"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{user?.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {user?.role}
                  </Badge>
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
                className={`w-full justify-start ${
                  activeTab === tab.id ? "bg-blue-600 text-white hover:bg-blue-700" : "hover:bg-gray-100"
                }`}
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
          <Button
            variant="outline"
            className="w-full justify-start bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
            onClick={logout}
          >
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
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab}</h2>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="hidden sm:flex">
              {user?.role} Access
            </Badge>
            <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">{renderContent()}</main>
      </div>
    </div>
  )
}
