"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Star, 
  Leaf,
  Calendar,
  Target,
  Award,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Zap,
  Droplets,
  Users
} from "lucide-react"

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("6months")
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data - in real app would come from API
  const monthlyData = [
    { month: "Jan", bookings: 4, spending: 85000, saved: 12000, satisfaction: 4.8 },
    { month: "Feb", bookings: 3, spending: 65000, saved: 8000, satisfaction: 4.9 },
    { month: "Mar", bookings: 5, spending: 95000, saved: 15000, satisfaction: 4.7 },
    { month: "Apr", bookings: 2, spending: 45000, saved: 6000, satisfaction: 5.0 },
    { month: "May", bookings: 6, spending: 125000, saved: 18000, satisfaction: 4.8 },
    { month: "Jun", bookings: 4, spending: 88000, saved: 14000, satisfaction: 4.9 }
  ]

  const serviceTypeData = [
    { name: "Regular Home Cleaning", value: 45, amount: 285000, color: "#3B82F6" },
    { name: "Deep Cleaning", value: 25, amount: 175000, color: "#10B981" },
    { name: "Post-Construction", value: 20, amount: 140000, color: "#F59E0B" },
    { name: "Event Cleaning", value: 10, amount: 70000, color: "#EF4444" }
  ]

  const timeSlotData = [
    { time: "8-10 AM", bookings: 8, preference: 32 },
    { time: "10-12 PM", bookings: 12, preference: 48 },
    { time: "12-2 PM", bookings: 6, preference: 24 },
    { time: "2-4 PM", bookings: 15, preference: 60 },
    { time: "4-6 PM", bookings: 9, preference: 36 }
  ]

  const cleanerRatings = [
    { name: "Kemi A.", rating: 4.9, services: 8, tips: 15000 },
    { name: "John D.", rating: 4.8, services: 6, tips: 12000 },
    { name: "Grace O.", rating: 5.0, services: 4, tips: 10000 },
    { name: "Mike S.", rating: 4.7, services: 5, tips: 8000 }
  ]

  const environmentalData = {
    waterSaved: 1250, // liters
    chemicalReduction: 85, // percentage
    wasteReduced: 45, // kg
    carbonOffset: 125 // kg CO2
  }

  const totalStats = {
    totalBookings: 24,
    totalSpent: 503000,
    totalSaved: 73000,
    avgRating: 4.85,
    timeSpentCleaning: 0, // hours saved by using service
    favoriteService: "Regular Home Cleaning",
    preferredTime: "2-4 PM",
    loyaltyTier: "Gold"
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Insights into your cleaning service usage and savings</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="environmental">Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Bookings</p>
                      <p className="text-2xl font-bold">{totalStats.totalBookings}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-600">+15% vs last period</span>
                      </div>
                    </div>
                    <BarChart3 className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Saved</p>
                      <p className="text-2xl font-bold">₦{totalStats.totalSaved.toLocaleString()}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-600">+8% savings rate</span>
                      </div>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Rating</p>
                      <p className="text-2xl font-bold">{totalStats.avgRating}</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                        <span className="text-xs text-gray-600">Excellent service</span>
                      </div>
                    </div>
                    <Star className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Time Saved</p>
                      <p className="text-2xl font-bold">48h</p>
                      <div className="flex items-center mt-1">
                        <Clock className="w-3 h-3 text-blue-500 mr-1" />
                        <span className="text-xs text-blue-600">This month</span>
                      </div>
                    </div>
                    <Clock className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Booking Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="bookings" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={serviceTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {serviceTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Quick Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900">Most Popular Service</h3>
                    <p className="text-sm text-blue-700 mt-1">{totalStats.favoriteService}</p>
                    <p className="text-xs text-blue-600 mt-2">45% of your bookings</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-medium text-green-900">Best Savings Month</h3>
                    <p className="text-sm text-green-700 mt-1">May 2024</p>
                    <p className="text-xs text-green-600 mt-2">₦18,000 saved</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-medium text-purple-900">Preferred Time</h3>
                    <p className="text-sm text-purple-700 mt-1">{totalStats.preferredTime}</p>
                    <p className="text-xs text-purple-600 mt-2">60% of bookings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spending" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Spending vs Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, '']} />
                      <Bar dataKey="spending" fill="#3B82F6" name="Spending" />
                      <Bar dataKey="saved" fill="#10B981" name="Saved" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {serviceTypeData.map((service, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{service.name}</span>
                        <span className="text-sm">₦{service.amount.toLocaleString()}</span>
                      </div>
                      <Progress value={(service.amount / 670000) * 100} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Savings Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Total Savings: ₦73,000</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Bulk booking discount</span>
                        <span className="text-sm font-medium">₦35,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Loyalty rewards</span>
                        <span className="text-sm font-medium">₦22,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Referral bonuses</span>
                        <span className="text-sm font-medium">₦16,000</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Cost vs DIY</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Service cost</span>
                        <span className="text-sm font-medium">₦503,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">DIY estimate</span>
                        <span className="text-sm font-medium">₦425,000</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span className="text-sm font-medium">Time saved value</span>
                        <span className="text-sm font-medium">₦240,000</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Future Projections</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Next month estimated</span>
                        <span className="text-sm font-medium">₦85,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Potential savings</span>
                        <span className="text-sm font-medium text-green-600">₦12,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Year-end total</span>
                        <span className="text-sm font-medium">₦950,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preferred Time Slots</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={timeSlotData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Frequency</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>Weekly Regular Cleaning</span>
                    <Badge>8 bookings</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>Monthly Deep Cleaning</span>
                    <Badge>6 bookings</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>Quarterly Post-Construction</span>
                    <Badge>5 bookings</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>Event-based Cleaning</span>
                    <Badge>2 bookings</Badge>
                  </div>
                </div>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Service Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {serviceTypeData.map((service, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">{service.name}</h3>
                        <Badge>{service.value}% of bookings</Badge>
                      </div>
                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Total Spent</p>
                          <p className="font-medium">₦{service.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Avg Rating</p>
                          <p className="font-medium">4.{8 + index}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Completion Rate</p>
                          <p className="font-medium">{95 + index}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Rebooking Rate</p>
                          <p className="font-medium">{80 + index * 2}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cleaner Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cleanerRatings.map((cleaner, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{cleaner.name}</p>
                          <p className="text-sm text-muted-foreground">{cleaner.services} services completed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{cleaner.rating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">₦{cleaner.tips.toLocaleString()} tips</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Quality Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[4.5, 5]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="satisfaction" stroke="#10B981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>On-time Arrival Rate</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={96} className="w-20" />
                      <span className="text-sm font-medium">96%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Service Completion Rate</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={98} className="w-20" />
                      <span className="text-sm font-medium">98%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Customer Satisfaction</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={95} className="w-20" />
                      <span className="text-sm font-medium">95%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rebooking Rate</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={87} className="w-20" />
                      <span className="text-sm font-medium">87%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          </TabsContent>

          <TabsContent value="environmental" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Water Saved</p>
                      <p className="text-2xl font-bold">{environmentalData.waterSaved}L</p>
                      <p className="text-xs text-blue-600 mt-1">vs traditional methods</p>
                    </div>
                    <Droplets className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Chemical Reduction</p>
                      <p className="text-2xl font-bold">{environmentalData.chemicalReduction}%</p>
                      <p className="text-xs text-green-600 mt-1">eco-friendly products</p>
                    </div>
                    <Leaf className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Waste Reduced</p>
                      <p className="text-2xl font-bold">{environmentalData.wasteReduced}kg</p>
                      <p className="text-xs text-orange-600 mt-1">packaging & materials</p>
                    </div>
                    <Target className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Carbon Offset</p>
                      <p className="text-2xl font-bold">{environmentalData.carbonOffset}kg</p>
                      <p className="text-xs text-purple-600 mt-1">CO₂ equivalent</p>
                    </div>
                    <Zap className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Eco-Friendly Practices</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Green cleaning products used</span>
                          <Badge className="bg-green-100 text-green-800">100%</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Microfiber cloths (reusable)</span>
                          <Badge className="bg-blue-100 text-blue-800">Always</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Water-efficient methods</span>
                          <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Minimal packaging approach</span>
                          <Badge className="bg-orange-100 text-orange-800">Implemented</Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Carbon Footprint Reduction</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Route optimization</span>
                          <span className="text-sm font-medium">-45kg CO₂</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Electric vehicle usage</span>
                          <span className="text-sm font-medium">-60kg CO₂</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Efficient equipment</span>
                          <span className="text-sm font-medium">-20kg CO₂</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Resource Conservation</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Water efficiency</span>
                            <span className="text-sm">85% saved</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Chemical reduction</span>
                            <span className="text-sm">85% less</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Waste minimization</span>
                            <span className="text-sm">70% reduced</span>
                          </div>
                          <Progress value={70} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Environmental Badge Earned</h4>
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-green-800">Eco-Conscious Customer</span>
                      </div>
                      <p className="text-xs text-green-700 mt-2">
                        You've saved more water than 50 households use in a day!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}