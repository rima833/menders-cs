"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, UserPlus, Edit, Trash2, Shield, Mail, Phone } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "manager" | "cleaner" | "customer"
  status: "active" | "inactive"
  lastLogin: string
  joinDate: string
  avatar?: string
  permissions: string[]
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const users: User[] = [
    {
      id: "1",
      name: "Admin User",
      email: "admin@menderscleaning.ng",
      phone: "+234 801 234 5678",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-20 10:30 AM",
      joinDate: "2023-01-15",
      permissions: ["all"],
    },
    {
      id: "2",
      name: "John Manager",
      email: "manager@menderscleaning.ng",
      phone: "+234 802 345 6789",
      role: "manager",
      status: "active",
      lastLogin: "2024-01-19 2:15 PM",
      joinDate: "2023-03-20",
      permissions: ["bookings", "gallery", "users"],
    },
    {
      id: "3",
      name: "Sarah Cleaner",
      email: "cleaner@menderscleaning.ng",
      phone: "+234 803 456 7890",
      role: "cleaner",
      status: "active",
      lastLogin: "2024-01-18 8:45 AM",
      joinDate: "2023-06-10",
      permissions: ["bookings"],
    },
    {
      id: "4",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+234 804 567 8901",
      role: "cleaner",
      status: "inactive",
      lastLogin: "2024-01-10 4:20 PM",
      joinDate: "2023-08-05",
      permissions: ["bookings"],
    },
    {
      id: "5",
      name: "Jane Customer",
      email: "jane@example.com",
      phone: "+234 805 678 9012",
      role: "customer",
      status: "active",
      lastLogin: "2024-01-19 11:00 AM",
      joinDate: "2023-12-01",
      permissions: [],
    },
  ]

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: "destructive",
      manager: "default",
      cleaner: "secondary",
      customer: "outline",
    } as const

    return <Badge variant={variants[role as keyof typeof variants]}>{role}</Badge>
  }

  const getStatusBadge = (status: string) => {
    return <Badge variant={status === "active" ? "default" : "secondary"}>{status}</Badge>
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const toggleUserStatus = (userId: string) => {
    // In a real app, this would make an API call
    console.log(`Toggling status for user ${userId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-gray-600">Manage team members and user accounts</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="cleaner">Cleaner</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
          <CardDescription>Manage team members and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{user.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm">{user.lastLogin}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit User - {user.name}</DialogTitle>
                              <DialogDescription>Manage user information and permissions</DialogDescription>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="name">Full Name</Label>
                                      <Input id="name" value={selectedUser.name} className="mt-1" />
                                    </div>
                                    <div>
                                      <Label htmlFor="email">Email</Label>
                                      <Input id="email" type="email" value={selectedUser.email} className="mt-1" />
                                    </div>
                                    <div>
                                      <Label htmlFor="phone">Phone</Label>
                                      <Input id="phone" value={selectedUser.phone} className="mt-1" />
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="role">Role</Label>
                                      <Select value={selectedUser.role}>
                                        <SelectTrigger className="mt-1">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="admin">Admin</SelectItem>
                                          <SelectItem value="manager">Manager</SelectItem>
                                          <SelectItem value="cleaner">Cleaner</SelectItem>
                                          <SelectItem value="customer">Customer</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Switch
                                        id="status"
                                        checked={selectedUser.status === "active"}
                                        onCheckedChange={() => toggleUserStatus(selectedUser.id)}
                                      />
                                      <Label htmlFor="status">Active Status</Label>
                                    </div>
                                    <div>
                                      <Label>Join Date</Label>
                                      <p className="text-sm text-gray-600 mt-1">{selectedUser.joinDate}</p>
                                    </div>
                                    <div>
                                      <Label>Last Login</Label>
                                      <p className="text-sm text-gray-600 mt-1">{selectedUser.lastLogin}</p>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <Label>Permissions</Label>
                                  <div className="mt-2 space-y-2">
                                    {selectedUser.role === "admin" ? (
                                      <Badge variant="destructive">Full Access - All Permissions</Badge>
                                    ) : (
                                      <div className="grid grid-cols-2 gap-2">
                                        <div className="flex items-center space-x-2">
                                          <Switch
                                            id="bookings-perm"
                                            checked={selectedUser.permissions.includes("bookings")}
                                          />
                                          <Label htmlFor="bookings-perm" className="text-sm">
                                            Manage Bookings
                                          </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <Switch
                                            id="gallery-perm"
                                            checked={selectedUser.permissions.includes("gallery")}
                                          />
                                          <Label htmlFor="gallery-perm" className="text-sm">
                                            Manage Gallery
                                          </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <Switch
                                            id="users-perm"
                                            checked={selectedUser.permissions.includes("users")}
                                          />
                                          <Label htmlFor="users-perm" className="text-sm">
                                            Manage Users
                                          </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <Switch
                                            id="settings-perm"
                                            checked={selectedUser.permissions.includes("settings")}
                                          />
                                          <Label htmlFor="settings-perm" className="text-sm">
                                            Site Settings
                                          </Label>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline">Cancel</Button>
                                  <Button>Save Changes</Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Role Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">1</div>
            <p className="text-sm text-gray-600">Admins</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">1</div>
            <p className="text-sm text-gray-600">Managers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-gray-600">Cleaners</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-gray-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">1</div>
            <p className="text-sm text-gray-600">Customers</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
