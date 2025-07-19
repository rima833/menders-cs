import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - Menders Cleaning Services",
  description: "Administrative dashboard for managing cleaning services",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="admin-layout">{children}</div>
}
