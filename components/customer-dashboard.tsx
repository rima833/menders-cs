"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  CreditCard, 
  User, 
  Settings,
  History,
  Award,
  Gift,
  Bell,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react"

export function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data - in real app would come from API
  const customerData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+234 803 123 4567",
    address: "123 Victoria Island, Lagos",
    memberSince: "January 2024",
    totalBookings: 12,
    loyaltyPoints: 850,
    nextReward: 1000,
    tier: "Gold",
  }

  const recentBookings = [
    {
      id: "BK001",
      service: "Regular Home Cleaning",
      date: "2024-01-20",
      time: "10:00 AM",
      status: "completed",
      amount: "₦15,000",
      cleaner: "Kemi A.",
      rating: 5,
    },
    {
      id: "BK002",
      service: "Deep Kitchen Cleaning",
      date: "2024-01-25",
      time: "2:00 PM",
      status: "upcoming",
      amount: "₦22,000",
      cleaner: "John D.",
      rating: null,
    },
    {
      id: "BK003",
      service: "Post-Event Cleanup",
      date: "2024-01-18",
      time: "8:00 AM",
      status: "completed",
      amount: "₦18,000",
      cleaner: "Grace O.",
      rating: 4,
    },
  ]

  const rewards = [
    { points: 500, reward: "Free Window Cleaning", claimed: true },
    { points: 750, reward: "10% Off Next Service", claimed: true },
    { points: 1000, reward: "Free Deep Cleaning Session", claimed: false },
    { points: 1500, reward: "Premium Service Package", claimed: false },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800"
      case "upcoming": return "bg-blue-100 text-blue-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />
      case "upcoming": return <Clock className="w-4 h-4" />
      case "cancelled": return <XCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your cleaning services and account</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-lg">{customerData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{customerData.name}</CardTitle>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <Award className="w-3 h-3 mr-1" />
                  {customerData.tier} Member
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Loyalty Points</p>
                    <p className="text-2xl font-bold text-primary">{customerData.loyaltyPoints}</p>
                    <Progress 
                      value={(customerData.loyaltyPoints / customerData.nextReward) * 100} 
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {customerData.nextReward - customerData.loyaltyPoints} points to next reward
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Bookings</span>
                      <span className="font-semibold">{customerData.totalBookings}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-muted-foreground">Member Since</span>
                      <span className="font-semibold">{customerData.memberSince}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Next Booking</p>
                          <p className="text-lg font-semibold">Jan 25, 2:00 PM</p>
                        </div>
                        <Calendar className="w-8 h-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">This Month</p>
                          <p className="text-lg font-semibold">₦42,000 Saved</p>
                        </div>
                        <CreditCard className="w-8 h-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Avg Rating</p>
                          <p className="text-lg font-semibold flex items-center">
                            4.8 <Star className="w-4 h-4 ml-1 fill-yellow-400 text-yellow-400" />
                          </p>
                        </div>
                        <Star className="w-8 h-8 text-yellow-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Recent Bookings
                      <Button variant="outline" size="sm">
                        View All <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(booking.status)}
                            <div>
                              <p className="font-medium">{booking.service}</p>
                              <p className="text-sm text-muted-foreground">
                                {booking.date} at {booking.time} • {booking.cleaner}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                            <p className="text-sm font-medium mt-1">{booking.amount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>All Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-4">
                            {getStatusIcon(booking.status)}
                            <div>
                              <p className="font-medium">{booking.service}</p>
                              <p className="text-sm text-muted-foreground">
                                Booking ID: {booking.id}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {booking.date} at {booking.time}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Cleaner: {booking.cleaner}
                              </p>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                            <p className="font-medium">{booking.amount}</p>
                            {booking.rating && (
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-3 h-3 ${i < booking.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                            )}
                            <div className="flex space-x-2">
                              {booking.status === "upcoming" && (
                                <>
                                  <Button size="sm" variant="outline">Edit</Button>
                                  <Button size="sm" variant="destructive">Cancel</Button>
                                </>
                              )}
                              {booking.status === "completed" && !booking.rating && (
                                <Button size="sm">Rate Service</Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rewards" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Gift className="w-5 h-5 mr-2" />
                      Loyalty Rewards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {rewards.map((reward, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              reward.claimed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {reward.claimed ? <CheckCircle className="w-5 h-5" /> : <Gift className="w-5 h-5" />}
                            </div>
                            <div>
                              <p className="font-medium">{reward.reward}</p>
                              <p className="text-sm text-muted-foreground">{reward.points} points required</p>
                            </div>
                          </div>
                          <div>
                            {reward.claimed ? (
                              <Badge className="bg-green-100 text-green-800">Claimed</Badge>
                            ) : customerData.loyaltyPoints >= reward.points ? (
                              <Button size="sm">Claim Now</Button>
                            ) : (
                              <Badge variant="outline">
                                {reward.points - customerData.loyaltyPoints} more points
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Full Name</label>
                        <p className="text-sm text-muted-foreground mt-1">{customerData.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <p className="text-sm text-muted-foreground mt-1">{customerData.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <p className="text-sm text-muted-foreground mt-1">{customerData.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Address</label>
                        <p className="text-sm text-muted-foreground mt-1">{customerData.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4 pt-4 border-t">
                      <Button>Edit Profile</Button>
                      <Button variant="outline">Change Password</Button>
                      <Button variant="outline">Notification Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}