"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, UserPlus, Edit, Trash2, Mail, Phone, Shield, User, Users } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  email: string
  phone: string
  role: "admin" | "manager" | "cleaner"
  status: "active" | "inactive"
  joinDate: string
  lastLogin: string
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@menderscleaning.ng",
      phone: "+234 801 234 5678",
      role: "admin",
      status: "active",
      joinDate: "2023-01-15",
      lastLogin: "2024-01-20 10:30 AM",
    },
    {
      id: 2,
      name: "Sarah Manager",
      email: "sarah.manager@menderscleaning.ng",
      phone: "+234 802 345 6789",
      role: "manager",
      status: "active",
      joinDate: "2023-03-20",
      lastLogin: "2024-01-19 2:15 PM",
    },
    {
      id: 3,
      name: "John Cleaner",
      email: "john.cleaner@menderscleaning.ng",
      phone: "+234 803 456 7890",
      role: "cleaner",
      status: "active",
      joinDate: "2023-06-10",
      lastLogin: "2024-01-18 8:45 AM",
    },
    {
      id: 4,
      name: "Mary Cleaner",
      email: "mary.cleaner@menderscleaning.ng",
      phone: "+234 804 567 8901",
      role: "cleaner",
      status: "inactive",
      joinDate: "2023-08-05",
      lastLogin: "2024-01-10 4:20 PM",
    },
  ]

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "manager":
        return <Users className="h-4 w-4" />
      case "cleaner":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    const matchesStatus = statusFilter === "all" || member.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const toggleUserStatus = (userId: number) => {
    // In a real app, this would update the database
    console.log(`Toggling status for user ${userId}`)
  }

  const deleteUser = (userId: number) => {
    // In a real app, this would delete from database
    console.log(`Deleting user ${userId}`)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">User Management</h2>
        <p className="text-gray-600">Manage team members and their access permissions</p>
      </div>

      {/* Add User Button */}
      <div className="mb-6">
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>Create a new user account for your team</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="new-name">Full Name</Label>
                  <Input id="new-name" placeholder="Enter full name..." />
                </div>
                <div>
                  <Label htmlFor="new-role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="cleaner">Cleaner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="new-email">Email Address</Label>
                <Input id="new-email" type="email" placeholder="Enter email address..." />
              </div>
              <div>
                <Label htmlFor="new-phone">Phone Number</Label>
                <Input id="new-phone" placeholder="Enter phone number..." />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddUserOpen(false)}>Add User</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="cleaner">Cleaner</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({filteredMembers.length})</CardTitle>
          <CardDescription>Manage your team members and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Last Login</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          {getRoleIcon(member.role)}
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600">Joined {member.joinDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="flex items-center text-sm">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          {member.email}
                        </p>
                        <p className="flex items-center text-sm text-gray-600 mt-1">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {member.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{member.lastLogin}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => toggleUserStatus(member.id)}>
                          {member.status === "active" ? "Deactivate" : "Activate"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deleteUser(member.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions Info */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Understanding different user roles and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <Shield className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="font-semibold text-red-600">Admin</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Full system access</li>
                <li>• Manage all users</li>
                <li>• Site settings control</li>
                <li>• Financial reports</li>
                <li>• System configuration</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-blue-600">Manager</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Manage bookings</li>
                <li>• Assign teams</li>
                <li>• View reports</li>
                <li>• Manage gallery</li>
                <li>• Customer communication</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <User className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-green-600">Cleaner</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• View assigned jobs</li>
                <li>• Update job status</li>
                <li>• Upload completion photos</li>
                <li>• Basic profile management</li>
                <li>• Time tracking</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
