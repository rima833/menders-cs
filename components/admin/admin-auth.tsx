"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, LogOut, User } from "lucide-react"
import { db, type User as UserType } from "@/lib/database"

interface AuthContextType {
  user: UserType | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Initialize database
    db.initializeDatabase()

    // Check for stored auth on mount
    const storedUser = localStorage.getItem("menders_admin_session")
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        // Verify user still exists in database
        const users = db.getUsers()
        const currentUser = users.find((u) => u.id === userData.id)
        if (currentUser) {
          setUser(currentUser)
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem("menders_admin_session")
        }
      } catch (error) {
        localStorage.removeItem("menders_admin_session")
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const authenticatedUser = db.authenticateUser(email, password)

      if (authenticatedUser) {
        // Remove password from session data for security
        const { password: _, ...userWithoutPassword } = authenticatedUser
        setUser(userWithoutPassword as UserType)
        setIsAuthenticated(true)
        localStorage.setItem("menders_admin_session", JSON.stringify(userWithoutPassword))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("menders_admin_session")
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
        setError("Invalid email or password. Please check your credentials and try again.")
      }
    } catch (err) {
      setError("Login failed. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Quick login function for demo
  const quickLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-gray-900">Menders Admin</CardTitle>
            <CardDescription className="text-gray-600 mt-2 text-base">
              Professional Cleaning Services Dashboard
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-base"
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
                  className="h-12 pr-12 text-base"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In to Dashboard"}
            </Button>
          </form>

          <div className="border-t pt-6">
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Demo Access Credentials:</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-700">Admin Access</p>
                      <p className="text-xs text-gray-500">admin@menderscleaning.ng</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => quickLogin("admin@menderscleaning.ng", "MendersAdmin2024!")}
                    className="text-xs"
                  >
                    Use
                  </Button>
                </div>

                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-700">Manager Access</p>
                      <p className="text-xs text-gray-500">manager@menderscleaning.ng</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => quickLogin("manager@menderscleaning.ng", "Manager123!")}
                    className="text-xs"
                  >
                    Use
                  </Button>
                </div>

                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-700">Cleaner Access</p>
                      <p className="text-xs text-gray-500">cleaner@menderscleaning.ng</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => quickLogin("cleaner@menderscleaning.ng", "Cleaner123!")}
                    className="text-xs"
                  >
                    Use
                  </Button>
                </div>
              </div>

              <div className="text-xs text-gray-500 text-center pt-2 border-t">
                <p>💡 Click "Use" to auto-fill credentials or enter your own</p>
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
    <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2 bg-white hover:bg-gray-50">
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Logout</span>
      <span className="text-xs text-gray-500 hidden md:inline">({user?.name})</span>
    </Button>
  )
}
