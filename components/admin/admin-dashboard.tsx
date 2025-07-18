"use client"

import { useState } from "react"
import { AdminHeader } from "./admin-auth"
import { StatsOverview } from "./stats-overview"
import { BookingManagement } from "./booking-management"
import { ImageManagement } from "./image-management"
import { SiteSettings } from "./site-settings"
import { UserManagement } from "./user-management"
import { BarChart3, Calendar, ImageIcon, Settings, Users } from "lucide-react"

type TabType = "overview" | "bookings" | "gallery" | "users" | "settings"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
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
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">{renderContent()}</div>
      </div>
    </div>
  )
}
