"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsOverview } from "./stats-overview"
import { BookingManagement } from "./booking-management"
import { UserManagement } from "./user-management"
import { PricingManagement } from "./pricing-management"
import { ImageManagement } from "./image-management"
import { SiteSettings } from "./site-settings"
import { useAdmin } from "./admin-provider"
import { BarChart3, Calendar, Users, DollarSign, ImageIcon, Settings, Shield } from "lucide-react"

export function AdminDashboard() {
  const { user } = useAdmin()
  const [activeTab, setActiveTab] = useState("overview")

  const canAccess = (requiredRole: string[]) => {
    if (!user) return false
    return requiredRole.includes(user.role)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4" />
          <span className="text-sm text-muted-foreground">Connected to Supabase</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>

          {canAccess(["admin", "manager"]) && (
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
          )}

          {canAccess(["admin"]) && (
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
          )}

          {canAccess(["admin", "manager"]) && (
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Pricing</span>
            </TabsTrigger>
          )}

          <TabsTrigger value="gallery" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Gallery</span>
          </TabsTrigger>

          {canAccess(["admin"]) && (
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <StatsOverview />
        </TabsContent>

        {canAccess(["admin", "manager"]) && (
          <TabsContent value="bookings" className="space-y-4">
            <BookingManagement />
          </TabsContent>
        )}

        {canAccess(["admin"]) && (
          <TabsContent value="users" className="space-y-4">
            <UserManagement />
          </TabsContent>
        )}

        {canAccess(["admin", "manager"]) && (
          <TabsContent value="pricing" className="space-y-4">
            <PricingManagement />
          </TabsContent>
        )}

        <TabsContent value="gallery" className="space-y-4">
          <ImageManagement />
        </TabsContent>

        {canAccess(["admin"]) && (
          <TabsContent value="settings" className="space-y-4">
            <SiteSettings />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
