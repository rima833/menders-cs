"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminProvider } from "./admin-provider"
import { LogoutButton, useAuth } from "./admin-auth"
import { StatsOverview } from "./stats-overview"
import { BookingManagement } from "./booking-management"
import { ImageManagement } from "./image-management"
import { UserManagement } from "./user-management"
import { SiteSettings } from "./site-settings"
import { PricingManagement } from "./pricing-management"
import { LayoutDashboard, Calendar, ImageIcon, Users, Settings, DollarSign, Shield, Building2 } from "lucide-react"

function DashboardContent() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "manager":
        return "bg-blue-100 text-blue-800"
      case "cleaner":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const hasPermission = (permission: string) => {
    if (!user) return false
    return user.permissions.includes("all") || user.permissions.includes(permission)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Menders Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Professional Cleaning Services Management</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{user?.name}</span>
              <Badge className={getRoleColor(user?.role || "")}>{user?.role?.toUpperCase()}</Badge>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            {hasPermission("bookings") && (
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Bookings</span>
              </TabsTrigger>
            )}
            {hasPermission("pricing") && (
              <TabsTrigger value="pricing" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Pricing</span>
              </TabsTrigger>
            )}
            {hasPermission("gallery") && (
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Gallery</span>
              </TabsTrigger>
            )}
            {hasPermission("users") && (
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
            )}
            {hasPermission("all") && (
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
              <p className="text-gray-600">
                Welcome back, {user?.name}! Here's what's happening with your cleaning business.
              </p>
            </div>
            <StatsOverview />
          </TabsContent>

          {hasPermission("bookings") && (
            <TabsContent value="bookings" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Management</h2>
                <p className="text-gray-600">Manage customer bookings, assign teams, and track service progress.</p>
              </div>
              <BookingManagement />
            </TabsContent>
          )}

          {hasPermission("pricing") && (
            <TabsContent value="pricing" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Pricing Management</h2>
                <p className="text-gray-600">Manage service prices, add-ons, and calculate customer quotes.</p>
              </div>
              <PricingManagement />
            </TabsContent>
          )}

          {hasPermission("gallery") && (
            <TabsContent value="gallery" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Gallery Management</h2>
                <p className="text-gray-600">Manage before/after photos to showcase your cleaning transformations.</p>
              </div>
              <ImageManagement />
            </TabsContent>
          )}

          {hasPermission("users") && (
            <TabsContent value="users" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">User Management</h2>
                <p className="text-gray-600">Manage team members, roles, and access permissions.</p>
              </div>
              <UserManagement />
            </TabsContent>
          )}

          {hasPermission("all") && (
            <TabsContent value="settings" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Site Settings</h2>
                <p className="text-gray-600">
                  Configure business information, contact details, and system preferences.
                </p>
              </div>
              <SiteSettings />
            </TabsContent>
          )}

          {/* Access Denied Message */}
          {!hasPermission("bookings") &&
            !hasPermission("gallery") &&
            !hasPermission("users") &&
            !hasPermission("all") && (
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Access Restricted</CardTitle>
                    <CardDescription>
                      Your current role ({user?.role}) has limited access to this dashboard.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Please contact your administrator to request additional permissions.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
        </Tabs>
      </main>
    </div>
  )
}

export function AdminDashboard() {
  return (
    <AdminProvider>
      <DashboardContent />
    </AdminProvider>
  )
}
