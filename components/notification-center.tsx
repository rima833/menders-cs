"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Bell, 
  Check, 
  X, 
  Calendar, 
  MapPin, 
  Star,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  Gift,
  Zap,
  MessageCircle,
  Camera,
  Lock,
  Home,
  Smartphone,
  Settings,
  Filter,
  MarkAsUnread
} from "lucide-react"

interface Notification {
  id: string
  type: "service" | "reminder" | "promotion" | "system" | "security" | "reward"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high"
  actionRequired?: boolean
  link?: string
  imageUrl?: string
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "service",
      title: "Service Starting Soon",
      message: "Your Deep Kitchen Cleaning service starts in 30 minutes. John D. is on his way!",
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
      priority: "high",
      actionRequired: true,
      link: "/tracking"
    },
    {
      id: "2", 
      type: "reminder",
      title: "Prepare for Service",
      message: "Don't forget to clear your kitchen countertops before the cleaning service arrives.",
      timestamp: new Date(Date.now() - 30 * 60000),
      read: false,
      priority: "medium"
    },
    {
      id: "3",
      type: "promotion",
      title: "Loyalty Reward Unlocked!",
      message: "You've earned a free window cleaning service! Claim it now.",
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      read: true,
      priority: "medium",
      actionRequired: true,
      link: "/dashboard"
    },
    {
      id: "4",
      type: "system", 
      title: "Smart Home Connected",
      message: "Your front door camera has been successfully connected to your cleaning service.",
      timestamp: new Date(Date.now() - 4 * 60 * 60000),
      read: true,
      priority: "low"
    },
    {
      id: "5",
      type: "security",
      title: "Service Completed",
      message: "Your cleaning service has been completed. All devices have been secured automatically.",
      timestamp: new Date(Date.now() - 24 * 60 * 60000),
      read: true,
      priority: "medium",
      imageUrl: "/service-complete.jpg"
    }
  ])

  const [filter, setFilter] = useState<"all" | "unread" | "service" | "system">("all")
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    serviceUpdates: true,
    promotions: true,
    security: true,
    reminders: true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      // Add a new notification occasionally
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: "system",
          title: "System Update",
          message: "Your smart home integration has been optimized for better performance.",
          timestamp: new Date(),
          read: false,
          priority: "low"
        }
        setNotifications(prev => [newNotification, ...prev])
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return !notification.read
    if (filter === "service") return notification.type === "service" || notification.type === "reminder"
    if (filter === "system") return notification.type === "system" || notification.type === "security"
    return true
  })

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = `w-5 h-5 ${
      priority === "high" ? "text-red-500" :
      priority === "medium" ? "text-yellow-500" :
      "text-blue-500"
    }`

    switch (type) {
      case "service": return <Calendar className={iconClass} />
      case "reminder": return <Clock className={iconClass} />
      case "promotion": return <Gift className={iconClass} />
      case "system": return <Settings className={iconClass} />
      case "security": return <Lock className={iconClass} />
      case "reward": return <Star className={iconClass} />
      default: return <Info className={iconClass} />
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  const NotificationBell = () => (
    <Button 
      variant="ghost" 
      size="sm" 
      className="relative p-2"
      onClick={() => setIsOpen(true)}
    >
      <Bell className="w-5 h-5" />
      {unreadCount > 0 && (
        <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
          {unreadCount > 9 ? "9+" : unreadCount}
        </Badge>
      )}
    </Button>
  )

  return (
    <>
      <NotificationBell />
      
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:w-[480px]">
          <SheetHeader className="space-y-4">
            <SheetTitle className="flex items-center justify-between">
              <span>Notifications</span>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    <Check className="w-4 h-4 mr-1" />
                    Mark all read
                  </Button>
                )}
                <Badge variant="secondary">{unreadCount} unread</Badge>
              </div>
            </SheetTitle>

            {/* Filters */}
            <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="service">Service</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>
            </Tabs>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-200px)] mt-6">
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No notifications found</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`transition-all duration-200 ${
                      !notification.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type, notification.priority)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className={`text-sm font-medium ${
                                !notification.read ? 'text-blue-900' : 'text-gray-900'
                              }`}>
                                {notification.title}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              
                              {notification.imageUrl && (
                                <div className="mt-2">
                                  <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                                    <Camera className="w-4 h-4 text-gray-400" />
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-500">
                                    {formatTimeAgo(notification.timestamp)}
                                  </span>
                                  {notification.priority === "high" && (
                                    <Badge variant="destructive" className="text-xs">
                                      Urgent
                                    </Badge>
                                  )}
                                  {notification.actionRequired && (
                                    <Badge variant="outline" className="text-xs">
                                      Action Required
                                    </Badge>
                                  )}
                                </div>
                                
                                <div className="flex items-center space-x-1">
                                  {!notification.read && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="p-1"
                                      onClick={() => markAsRead(notification.id)}
                                    >
                                      <Check className="w-3 h-3" />
                                    </Button>
                                  )}
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="p-1"
                                    onClick={() => deleteNotification(notification.id)}
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                              
                              {notification.actionRequired && (
                                <div className="mt-3">
                                  <Button size="sm" className="w-full">
                                    {notification.link ? "View Details" : "Take Action"}
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Settings */}
          <div className="absolute bottom-4 left-4 right-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Push Notifications</span>
                  <Switch 
                    checked={notificationSettings.push}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, push: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Service Updates</span>
                  <Switch 
                    checked={notificationSettings.serviceUpdates}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, serviceUpdates: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Promotions</span>
                  <Switch 
                    checked={notificationSettings.promotions}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, promotions: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

// Inline notification component for important alerts
export function InlineNotification() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900">
                Service Update
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                Your cleaner is running 5 minutes early and will arrive at 1:55 PM.
              </p>
              <div className="flex space-x-2 mt-3">
                <Button size="sm" variant="outline" className="text-xs">
                  View Tracking
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-xs"
                  onClick={() => setVisible(false)}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}