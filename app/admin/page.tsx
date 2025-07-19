"use client"

import { AuthProvider, useAuth, LoginForm } from "@/components/admin/admin-auth"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

function AdminPageContent() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <AdminDashboard />
}

export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminPageContent />
    </AuthProvider>
  )
}
