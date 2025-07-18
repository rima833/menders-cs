"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Search, UserPlus, Edit, Trash2, Mail, Phone } from "lucide-react"

interface User {
  id: string
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
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const [users, setUsers] = useState<User[]>([
    {
      id: "USR001",
      name: "Admin User",
      email: "admin@menderscleaning.ng",
      phone: "+234 901 234 5678",
      role: "admin",
      status: "active",
      joinDate: "2024-01-01",
      lastLogin: "2024-01-18",
    },
    {
      id: "USR002",
      name: "John Manager",
      email: "john.manager@menderscleaning.ng",
      phone: "+234 902 345 6789",
      role: "manager",
      status: "active",
      joinDate: "2024-01-05",
      lastLogin: "2024-01-17",
    },
    {
      id: "USR003",
      name: "Sarah Cleaner",
      email: "sarah.cleaner@menderscleaning.ng",
      phone: "+234 903 456 7890",
      role: "cleaner",
      status: "active",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-16",
    },
    {
      id: "USR004",
      name: "Mike Cleaner",
      email: "mike.cleaner@menderscleaning.ng",
      phone: "+234 904 567 8901",
      role: "cleaner",
      status: "inactive",
      joinDate: "2024-01-12",
      lastLogin: "2024-01-15",
    },
  ])

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "cleaner" as User["role"],
    status: "active" as User["status"],
  })

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
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const deleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId))
    }
  }

  const addNewUser = () => {
    const newId = `USR${String(users.length + 1).padStart(3, "0")}`
    const userToAdd: User = {
      id: newId,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      status: newUser.status,
      joinDate: new Date().toISOString().split("T")[0],
      lastLogin: "Never",
    }

    setUsers([...users, userToAdd])
    setNewUser({
      name: "",
      email: "",
      phone: "",
      role: "cleaner",
      status: "active",
    })
    setIsAddUserOpen(false)
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage team members and their access levels</p>
        </div>
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
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label>Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({ ...newUser, role: value as User["role"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="cleaner">Cleaner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newUser.status === "active"}
                  onCheckedChange={(checked) => setNewUser({ ...newUser, status: checked ? "active" : "inactive" })}
                />
                <Label>Active User</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addNewUser}>Add User</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4 justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{user.name}</h3>
                    <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </p>
                    <p className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {user.phone}
                    </p>
                    <p>📅 Joined: {user.joinDate}</p>
                    <p>🔐 Last login: {user.lastLogin}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit User - {selectedUser?.name}</DialogTitle>
                      </DialogHeader>
                      {selectedUser && (
                        <div className="space-y-4">
                          <div>
                            <Label>Full Name</Label>
                            <Input
                              value={selectedUser.name}
                              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Email Address</Label>
                            <Input
                              value={selectedUser.email}
                              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Phone Number</Label>
                            <Input
                              value={selectedUser.phone}
                              onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Role</Label>
                            <Select
                              value={selectedUser.role}
                              onValueChange={(value) =>
                                setSelectedUser({ ...selectedUser, role: value as User["role"] })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="cleaner">Cleaner</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={selectedUser.status === "active"}
                              onCheckedChange={(checked) =>
                                setSelectedUser({ ...selectedUser, status: checked ? "active" : "inactive" })
                              }
                            />
                            <Label>Active User</Label>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setSelectedUser(null)}>
                              Cancel
                            </Button>
                            <Button
                              onClick={() => {
                                setUsers(users.map((u) => (u.id === selectedUser.id ? selectedUser : u)))
                                setSelectedUser(null)
                              }}
                            >
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm" onClick={() => toggleUserStatus(user.id)}>
                    {user.status === "active" ? "Deactivate" : "Activate"}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteUser(user.id)}
                    disabled={user.role === "admin"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No users found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
