"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, UserPlus, Search, Filter, Edit, Trash2, Mail, Phone, Shield, CheckCircle, XCircle } from "lucide-react"

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)

  const users = [
    {
      id: "USR001",
      name: "John Doe",
      email: "john.doe@menderscleaning.ng",
      phone: "+234 801 111 1111",
      role: "Admin",
      status: "active",
      joinDate: "2023-01-15",
      lastLogin: "2024-01-20 10:30 AM",
      avatar: "/placeholder.svg?height=40&width=40&text=JD",
      permissions: ["all"],
    },
    {
      id: "USR002",
      name: "Sarah Manager",
      email: "sarah.manager@menderscleaning.ng",
      phone: "+234 801 222 2222",
      role: "Manager",
      status: "active",
      joinDate: "2023-02-20",
      lastLogin: "2024-01-20 09:15 AM",
      avatar: "/placeholder.svg?height=40&width=40&text=SM",
      permissions: ["bookings", "gallery", "users"],
    },
    {
      id: "USR003",
      name: "Mike Cleaner",
      email: "mike.cleaner@menderscleaning.ng",
      phone: "+234 801 333 3333",
      role: "Cleaner",
      status: "active",
      joinDate: "2023-03-10",
      lastLogin: "2024-01-19 08:45 AM",
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
      permissions: ["bookings"],
    },
    {
      id: "USR004",
      name: "Lisa Team Lead",
      email: "lisa.lead@menderscleaning.ng",
      phone: "+234 801 444 4444",
      role: "Team Lead",
      status: "active",
      joinDate: "2023-04-05",
      lastLogin: "2024-01-20 07:30 AM",
      avatar: "/placeholder.svg?height=40&width=40&text=LT",
      permissions: ["bookings", "gallery"],
    },
    {
      id: "USR005",
      name: "David Inactive",
      email: "david.inactive@menderscleaning.ng",
      phone: "+234 801 555 5555",
      role: "Cleaner",
      status: "inactive",
      joinDate: "2023-05-12",
      lastLogin: "2024-01-10 03:20 PM",
      avatar: "/placeholder.svg?height=40&width=40&text=DI",
      permissions: ["bookings"],
    },
  ]

  const roles = ["Admin", "Manager", "Team Lead", "Cleaner"]

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800"
      case "Manager":
        return "bg-blue-100 text-blue-800"
      case "Team Lead":
        return "bg-purple-100 text-purple-800"
      case "Cleaner":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const toggleUserStatus = (userId: string) => {
    // In a real app, this would make an API call
    console.log(`Toggling status for user ${userId}`)
  }

  const deleteUser = (userId: string) => {
    // In a real app, this would make an API call
    console.log(`Deleting user ${userId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600">Manage team members and their permissions</p>
        </div>
        <Button onClick={() => setIsAddUserOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{users.length}</div>
                <div className="text-sm text-gray-600">Total Members</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{users.filter((u) => u.role === "Admin").length}</div>
                <div className="text-sm text-gray-600">Admins</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{users.filter((u) => u.role === "Cleaner").length}</div>
                <div className="text-sm text-gray-600">Cleaners</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({filteredUsers.length})</CardTitle>
          <CardDescription>Manage team members, roles, and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
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
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-1 h-3 w-3" />
                          {user.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="mr-1 h-3 w-3" />
                          {user.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>
                        <span className="flex items-center space-x-1">
                          {user.status === "active" ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <XCircle className="h-3 w-3" />
                          )}
                          <span className="capitalize">{user.status}</span>
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Team Member</DialogTitle>
                              <DialogDescription>Update member information and permissions</DialogDescription>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="edit-name">Name</Label>
                                    <Input
                                      id="edit-name"
                                      value={selectedUser.name}
                                      onChange={(e) =>
                                        setSelectedUser({
                                          ...selectedUser,
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-role">Role</Label>
                                    <Select
                                      value={selectedUser.role}
                                      onValueChange={(value) =>
                                        setSelectedUser({
                                          ...selectedUser,
                                          role: value,
                                        })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {roles.map((role) => (
                                          <SelectItem key={role} value={role}>
                                            {role}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="edit-email">Email</Label>
                                  <Input
                                    id="edit-email"
                                    type="email"
                                    value={selectedUser.email}
                                    onChange={(e) =>
                                      setSelectedUser({
                                        ...selectedUser,
                                        email: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-phone">Phone</Label>
                                  <Input
                                    id="edit-phone"
                                    value={selectedUser.phone}
                                    onChange={(e) =>
                                      setSelectedUser({
                                        ...selectedUser,
                                        phone: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="flex justify-between">
                                  <Button
                                    variant={selectedUser.status === "active" ? "destructive" : "default"}
                                    onClick={() => toggleUserStatus(selectedUser.id)}
                                  >
                                    {selectedUser.status === "active" ? "Deactivate" : "Activate"}
                                  </Button>
                                  <div className="space-x-2">
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Save Changes</Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" onClick={() => deleteUser(user.id)}>
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

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Team Member</DialogTitle>
            <DialogDescription>Add a new team member to your cleaning service</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-name">Full Name</Label>
                <Input id="new-name" placeholder="Enter full name" />
              </div>
              <div>
                <Label htmlFor="new-role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="new-email">Email Address</Label>
              <Input id="new-email" type="email" placeholder="Enter email address" />
            </div>
            <div>
              <Label htmlFor="new-phone">Phone Number</Label>
              <Input id="new-phone" placeholder="Enter phone number" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddUserOpen(false)}>Add Team Member</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
