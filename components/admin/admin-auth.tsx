"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield } from "lucide-react"

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

// Demo users for authentication
const demoUsers: User[] = [
  {
    id: "1",
    email: "admin@menderscleaning.ng",
    name: "Admin User",
    role: "admin",
    permissions: ["all"],
  },
  {
    id: "2",
    email: "manager@menderscleaning.ng",
    name: "Manager User",
    role: "manager",
    permissions: ["bookings", "gallery", "users"],
  },
  {
    id: "3",
    email: "cleaner@menderscleaning.ng",
    name: "Cleaner User",
    role: "cleaner",
    permissions: ["bookings"],
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem("admin_user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication logic
    const validCredentials = [
      { email: "admin@menderscleaning.ng", password: "admin123" },
      { email: "manager@menderscleaning.ng", password: "manager123" },
      { email: "cleaner@menderscleaning.ng", password: "cleaner123" },
    ]

    const isValid = validCredentials.some((cred) => cred.email === email && cred.password === password)

    if (isValid) {
      const userData = demoUsers.find((u) => u.email === email)
      if (userData) {
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem("admin_user", JSON.stringify(userData))
        return true
      }
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("admin_user")
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
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>Sign in to access the Menders Cleaning admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@menderscleaning.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>
                <strong>Admin:</strong> admin@menderscleaning.ng / admin123
              </p>
              <p>
                <strong>Manager:</strong> manager@menderscleaning.ng / manager123
              </p>
              <p>
                <strong>Cleaner:</strong> cleaner@menderscleaning.ng / cleaner123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
