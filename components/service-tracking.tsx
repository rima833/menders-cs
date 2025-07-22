"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Camera, 
  CheckCircle, 
  AlertCircle,
  Navigation,
  Star,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  Eye,
  Download,
  Share2,
  Timer
} from "lucide-react"

interface ServiceStep {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  startTime?: Date
  endTime?: Date
  estimatedDuration: number
  photos?: string[]
  notes?: string
}

interface CleanerInfo {
  id: string
  name: string
  avatar: string
  rating: number
  phone: string
  location: { lat: number; lng: number }
  eta: string
}

export function ServiceTracking() {
  const [activeBookingId, setActiveBookingId] = useState("BK002")
  const [currentStep, setCurrentStep] = useState(1)
  const [serviceProgress, setServiceProgress] = useState(25)
  const [isLiveTracking, setIsLiveTracking] = useState(true)
  
  // Mock data - in real app would come from API
  const booking = {
    id: "BK002",
    service: "Deep Kitchen Cleaning",
    date: "2024-01-25",
    time: "2:00 PM - 5:00 PM",
    address: "123 Victoria Island, Lagos",
    totalAmount: "₦22,000",
    status: "in-progress"
  }

  const cleaner: CleanerInfo = {
    id: "CLEAN001",
    name: "John Doe",
    avatar: "/cleaner-1.jpg",
    rating: 4.9,
    phone: "+234 803 456 7890",
    location: { lat: 6.4281, lng: 3.4219 },
    eta: "Arrived at location"
  }

  const serviceSteps: ServiceStep[] = [
    {
      id: "1",
      title: "Arrival & Setup",
      description: "Cleaner arrives and sets up equipment",
      status: "completed",
      startTime: new Date(Date.now() - 60 * 60000),
      endTime: new Date(Date.now() - 45 * 60000),
      estimatedDuration: 15,
      photos: ["/before-1.jpg", "/setup-1.jpg"],
      notes: "Arrived on time. All equipment ready."
    },
    {
      id: "2", 
      title: "Kitchen Assessment",
      description: "Initial assessment and planning",
      status: "completed",
      startTime: new Date(Date.now() - 45 * 60000),
      endTime: new Date(Date.now() - 30 * 60000),
      estimatedDuration: 15,
      photos: ["/assessment-1.jpg", "/assessment-2.jpg"],
      notes: "Kitchen requires deep cleaning of appliances and cabinets."
    },
    {
      id: "3",
      title: "Appliance Cleaning",
      description: "Deep cleaning of all kitchen appliances", 
      status: "in-progress",
      startTime: new Date(Date.now() - 30 * 60000),
      estimatedDuration: 60,
      photos: ["/progress-1.jpg"]
    },
    {
      id: "4",
      title: "Surface & Cabinet Cleaning",
      description: "Cleaning countertops, cabinets, and surfaces",
      status: "pending",
      estimatedDuration: 45
    },
    {
      id: "5",
      title: "Floor Cleaning & Mopping",
      description: "Deep cleaning and sanitizing floors",
      status: "pending", 
      estimatedDuration: 30
    },
    {
      id: "6",
      title: "Final Inspection",
      description: "Quality check and customer approval",
      status: "pending",
      estimatedDuration: 15
    }
  ]

  const liveUpdates = [
    {
      id: "1",
      time: "2:45 PM",
      message: "Started cleaning the oven - it's looking much better already!",
      photo: "/live-update-1.jpg"
    },
    {
      id: "2", 
      time: "2:30 PM",
      message: "Moving on to appliance cleaning. Refrigerator exterior completed.",
      photo: "/live-update-2.jpg"
    },
    {
      id: "3",
      time: "2:15 PM", 
      message: "Assessment complete. Starting with appliance cleaning.",
      photo: null
    },
    {
      id: "4",
      time: "2:00 PM",
      message: "Arrived at your location and beginning service.",
      photo: null
    }
  ]

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (isLiveTracking) {
        setServiceProgress(prev => Math.min(prev + 1, 85))
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [isLiveTracking])

  const getStepIcon = (step: ServiceStep) => {
    switch (step.status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins > 0 ? mins + 'm' : ''}`
  }

  const calculateElapsedTime = (startTime: Date) => {
    const now = new Date()
    const diff = now.getTime() - startTime.getTime()
    return Math.floor(diff / (1000 * 60))
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Service Tracking</h1>
          <p className="text-muted-foreground">Track your cleaning service in real-time</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Tracking Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{booking.service}</CardTitle>
                    <p className="text-muted-foreground">
                      Booking #{booking.id} • {booking.date}
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    In Progress
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Overall Progress</span>
                    <span className="text-sm font-medium">{serviceProgress}%</span>
                  </div>
                  <Progress value={serviceProgress} className="h-3" />
                  
                  <div className="grid md:grid-cols-3 gap-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium">{booking.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Time Slot</p>
                        <p className="text-sm font-medium">{booking.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Timer className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Est. Completion</p>
                        <p className="text-sm font-medium">4:30 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Service Progress
                  <Button variant="outline" size="sm" onClick={() => setIsLiveTracking(!isLiveTracking)}>
                    {isLiveTracking ? <PauseCircle className="w-4 h-4 mr-2" /> : <PlayCircle className="w-4 h-4 mr-2" />}
                    {isLiveTracking ? "Pause" : "Resume"} Tracking
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {serviceSteps.map((step, index) => (
                    <div key={step.id} className="flex space-x-4">
                      <div className="flex flex-col items-center">
                        {getStepIcon(step)}
                        {index < serviceSteps.length - 1 && (
                          <div className={`w-0.5 h-16 mt-2 ${
                            step.status === "completed" ? "bg-green-200" : "bg-gray-200"
                          }`} />
                        )}
                      </div>
                      
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{step.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            {step.status === "completed" && step.startTime && step.endTime && (
                              <span>{calculateElapsedTime(step.endTime) - calculateElapsedTime(step.startTime)}m</span>
                            )}
                            {step.status === "in-progress" && step.startTime && (
                              <span>{calculateElapsedTime(step.startTime)}m elapsed</span>
                            )}
                            <span>({formatDuration(step.estimatedDuration)} est.)</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                        
                        {step.notes && (
                          <p className="text-sm italic text-blue-600 mb-3">"{step.notes}"</p>
                        )}
                        
                        {step.photos && step.photos.length > 0 && (
                          <div className="flex space-x-2 mb-3">
                            {step.photos.map((photo, photoIndex) => (
                              <div key={photoIndex} className="relative group">
                                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <Camera className="w-6 h-6 text-gray-400" />
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                  <Button size="sm" variant="ghost" className="p-1 text-white">
                                    <Eye className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="p-1 text-white">
                                    <Download className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="w-5 h-5 mr-2 text-green-500" />
                  Live Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {liveUpdates.map((update) => (
                    <div key={update.id} className="flex space-x-3 p-3 rounded-lg bg-gray-50">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{update.time}</span>
                          {update.photo && (
                            <Button variant="ghost" size="sm" className="p-1">
                              <Camera className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{update.message}</p>
                        {update.photo && (
                          <div className="mt-2">
                            <div className="w-32 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Camera className="w-6 h-6 text-gray-400" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cleaner Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Cleaner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={cleaner.avatar} />
                      <AvatarFallback>{cleaner.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{cleaner.name}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{cleaner.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge className="bg-green-100 text-green-800">{cleaner.eta}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="flex items-center justify-center">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Navigation className="w-5 h-5 mr-2" />
                  Live Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Interactive Map</p>
                    </div>
                  </div>
                  
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distance from you</span>
                      <span className="font-medium">At location</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last update</span>
                      <span className="font-medium">2 min ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Type</span>
                    <span className="font-medium">{booking.service}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">3 hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Started</span>
                    <span className="font-medium">2:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Est. Completion</span>
                    <span className="font-medium">4:30 PM</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Total Amount</span>
                      <span className="font-bold text-lg">{booking.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Progress
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Photos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Report Issue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}