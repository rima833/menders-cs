"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, LogOut } from "lucide-react"

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "manager" | "cleaner"
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Real admin users with your details
const adminUsers: User[] = [
  {
    id: "1",
    email: "admin@menderscleaning.ng",
    name: "Menders Admin",
    role: "admin",
    permissions: ["all"],
  },
  {
    id: "2",
    email: "manager@menderscleaning.ng",
    name: "Sarah Johnson",
    role: "manager",
    permissions: ["bookings", "gallery", "users", "pricing"],
  },
  {
    id: "3",
    email: "cleaner@menderscleaning.ng",
    name: "David Okafor",
    role: "cleaner",
    permissions: ["bookings"],
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem("menders_admin_user")
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem("menders_admin_user")
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Real authentication logic with your credentials
    const validCredentials = [
      { email: "admin@menderscleaning.ng", password: "MendersAdmin2024!" },
      { email: "manager@menderscleaning.ng", password: "Manager123!" },
      { email: "cleaner@menderscleaning.ng", password: "Cleaner123!" },
    ]

    const isValid = validCredentials.some((cred) => cred.email === email && cred.password === password)

    if (isValid) {
      const userData = adminUsers.find((u) => u.email === email)
      if (userData) {
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem("menders_admin_user", JSON.stringify(userData))
        return true
      }
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("menders_admin_user")
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(email, password)
      if (!success) {
        setError("Invalid email or password. Please check your credentials.")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-gray-900">Menders Admin</CardTitle>
            <CardDescription className="text-gray-600 mt-2">Professional Cleaning Services Dashboard</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@menderscleaning.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In to Dashboard"}
            </Button>
          </form>

          <div className="border-t pt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Demo Access Credentials:</p>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium">Admin:</span>
                  <span>admin@menderscleaning.ng</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Password:</span>
                  <span>MendersAdmin2024!</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <span className="font-medium">Manager:</span>
                  <span>manager@menderscleaning.ng</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Password:</span>
                  <span>Manager123!</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function LogoutButton() {
  const { logout, user } = useAuth()

  return (
    <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2 bg-transparent">
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Logout</span>
      <span className="text-xs text-gray-500">({user?.name})</span>
    </Button>
  )
}
