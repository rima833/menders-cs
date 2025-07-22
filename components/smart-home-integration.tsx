"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Home, 
  Wifi, 
  Camera, 
  Lock, 
  Thermometer, 
  Lightbulb, 
  Fan,
  Smartphone,
  Shield,
  Eye,
  EyeOff,
  Play,
  Pause,
  Settings,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Robot,
  Gauge,
  Bell,
  Battery,
  Signal,
  Power
} from "lucide-react"

interface SmartDevice {
  id: string
  name: string
  type: "camera" | "lock" | "thermostat" | "light" | "fan" | "sensor"
  room: string
  status: "online" | "offline" | "busy"
  battery?: number
  connected: boolean
  lastSeen: Date
  features: string[]
}

interface AutomationRule {
  id: string
  name: string
  trigger: string
  action: string
  enabled: boolean
  conditions: string[]
}

export function SmartHomeIntegration() {
  const [connectedDevices, setConnectedDevices] = useState<SmartDevice[]>([
    {
      id: "cam1",
      name: "Front Door Camera",
      type: "camera",
      room: "Entrance",
      status: "online",
      battery: 85,
      connected: true,
      lastSeen: new Date(),
      features: ["Motion Detection", "Night Vision", "Two-way Audio"]
    },
    {
      id: "lock1", 
      name: "Smart Door Lock",
      type: "lock",
      room: "Entrance",
      status: "online",
      connected: true,
      lastSeen: new Date(),
      features: ["Remote Access", "Auto Lock", "Guest Codes"]
    },
    {
      id: "therm1",
      name: "Living Room Thermostat",
      type: "thermostat",
      room: "Living Room",
      status: "online",
      connected: true,
      lastSeen: new Date(),
      features: ["Smart Scheduling", "Remote Control", "Energy Saving"]
    },
    {
      id: "light1",
      name: "Smart Lights",
      type: "light",
      room: "Multiple Rooms",
      status: "online",
      connected: true,
      lastSeen: new Date(),
      features: ["Dimming", "Color Control", "Motion Activation"]
    }
  ])

  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: "rule1",
      name: "Cleaning Service Arrival",
      trigger: "Cleaner arrives (GPS + Time)",
      action: "Unlock door, turn on lights, disable alarm",
      enabled: true,
      conditions: ["Scheduled service confirmed", "Cleaner within 100m"]
    },
    {
      id: "rule2", 
      name: "Service Completion",
      trigger: "Cleaning service marked complete",
      action: "Lock doors, set alarm, adjust thermostat",
      enabled: true,
      conditions: ["Service rated", "No motion detected for 10 mins"]
    },
    {
      id: "rule3",
      name: "Pre-Service Preparation",
      trigger: "2 hours before service",
      action: "Turn on lights, unlock specific areas",
      enabled: false,
      conditions: ["Weather good", "Customer confirmed"]
    }
  ])

  const [isMonitoring, setIsMonitoring] = useState(true)
  const [securityLevel, setSecurityLevel] = useState("medium")
  const [activeTab, setActiveTab] = useState("overview")

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "camera": return <Camera className="w-5 h-5" />
      case "lock": return <Lock className="w-5 h-5" />
      case "thermostat": return <Thermometer className="w-5 h-5" />
      case "light": return <Lightbulb className="w-5 h-5" />
      case "fan": return <Fan className="w-5 h-5" />
      default: return <Home className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500"
      case "offline": return "bg-red-500"
      case "busy": return "bg-yellow-500"
      default: return "bg-gray-500"
    }
  }

  const toggleDeviceConnection = (deviceId: string) => {
    setConnectedDevices(devices => 
      devices.map(device => 
        device.id === deviceId 
          ? { ...device, connected: !device.connected, status: device.connected ? "offline" : "online" }
          : device
      )
    )
  }

  const toggleAutomationRule = (ruleId: string) => {
    setAutomationRules(rules =>
      rules.map(rule =>
        rule.id === ruleId
          ? { ...rule, enabled: !rule.enabled }
          : rule
      )
    )
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Smart Home Integration</h1>
          <p className="text-muted-foreground">Connect your smart devices for seamless cleaning service integration</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Status */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Connected Devices</p>
                      <p className="text-2xl font-bold">{connectedDevices.filter(d => d.connected).length}</p>
                      <p className="text-xs text-green-600 mt-1">All systems operational</p>
                    </div>
                    <Wifi className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Automations</p>
                      <p className="text-2xl font-bold">{automationRules.filter(r => r.enabled).length}</p>
                      <p className="text-xs text-blue-600 mt-1">Smart routines active</p>
                    </div>
                    <Robot className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Security Status</p>
                      <p className="text-2xl font-bold capitalize">{securityLevel}</p>
                      <p className="text-xs text-yellow-600 mt-1">Enhanced protection</p>
                    </div>
                    <Shield className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Energy Efficiency</p>
                      <p className="text-2xl font-bold">92%</p>
                      <p className="text-xs text-green-600 mt-1">Optimized settings</p>
                    </div>
                    <Zap className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Monitoring */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Live Home Monitoring
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={isMonitoring ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {isMonitoring ? "Active" : "Paused"}
                    </Badge>
                    <Switch 
                      checked={isMonitoring} 
                      onCheckedChange={setIsMonitoring}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Current Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Camera className="w-5 h-5 text-blue-500" />
                          <span className="text-sm">Security Cameras</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Recording</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Lock className="w-5 h-5 text-purple-500" />
                          <span className="text-sm">Door Locks</span>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">Secured</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Thermometer className="w-5 h-5 text-orange-500" />
                          <span className="text-sm">Climate Control</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">24°C</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="justify-start">
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Control Lights
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Lock className="w-4 h-4 mr-2" />
                        Lock/Unlock
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Camera className="w-4 h-4 mr-2" />
                        View Cameras
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        System Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Integration */}
            <Card>
              <CardHeader>
                <CardTitle>Service Integration Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Next Service</h3>
                    <p className="text-sm text-blue-700">Tomorrow at 2:00 PM</p>
                    <p className="text-xs text-blue-600 mt-1">Deep Kitchen Cleaning</p>
                    <div className="mt-3">
                      <Badge className="bg-blue-100 text-blue-800">Auto-prepared</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-medium text-green-900 mb-2">Smart Preparation</h3>
                    <p className="text-sm text-green-700">2 hours before service</p>
                    <p className="text-xs text-green-600 mt-1">Lights on, doors unlocked</p>
                    <div className="mt-3">
                      <Badge className="bg-green-100 text-green-800">Configured</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-medium text-purple-900 mb-2">Security Protocol</h3>
                    <p className="text-sm text-purple-700">During service hours</p>
                    <p className="text-xs text-purple-600 mt-1">Cameras active, restricted access</p>
                    <div className="mt-3">
                      <Badge className="bg-purple-100 text-purple-800">Enhanced</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Connected Devices</CardTitle>
                  <Button variant="outline">
                    <Power className="w-4 h-4 mr-2" />
                    Add Device
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  {connectedDevices.map((device) => (
                    <div key={device.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            device.type === 'camera' ? 'bg-blue-100' :
                            device.type === 'lock' ? 'bg-purple-100' :
                            device.type === 'thermostat' ? 'bg-orange-100' :
                            'bg-green-100'
                          }`}>
                            {getDeviceIcon(device.type)}
                          </div>
                          <div>
                            <h3 className="font-medium">{device.name}</h3>
                            <p className="text-sm text-muted-foreground">{device.room}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status)}`}></div>
                          <Switch 
                            checked={device.connected}
                            onCheckedChange={() => toggleDeviceConnection(device.id)}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        {device.battery && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Battery</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={device.battery} className="w-16 h-2" />
                              <span className="text-sm">{device.battery}%</span>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Signal</span>
                          <div className="flex items-center space-x-1">
                            <Signal className="w-4 h-4 text-green-500" />
                            <span className="text-sm">Strong</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Last Seen</span>
                          <span className="text-sm">
                            {device.status === 'online' ? 'Now' : '5 mins ago'}
                          </span>
                        </div>

                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground mb-2">Features:</p>
                          <div className="flex flex-wrap gap-1">
                            {device.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Settings className="w-3 h-3 mr-1" />
                            Configure
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Gauge className="w-3 h-3 mr-1" />
                            Monitor
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Device Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Lighting Control</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Living Room</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Kitchen</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Bedroom</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm">Brightness</span>
                        <Slider defaultValue={[75]} max={100} step={1} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Climate Control</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Temperature</span>
                        <span className="text-sm font-medium">24°C</span>
                      </div>
                      <Slider defaultValue={[24]} min={16} max={30} step={1} />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto Mode</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Energy Saving</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Security Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto Lock</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Motion Alerts</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Recording</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm">Sensitivity</span>
                        <Slider defaultValue={[60]} max={100} step={1} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Automation Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automationRules.map((rule) => (
                    <div key={rule.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{rule.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            When: {rule.trigger}
                          </p>
                        </div>
                        <Switch 
                          checked={rule.enabled}
                          onCheckedChange={() => toggleAutomationRule(rule.id)}
                        />
                      </div>

                      <div className="space-y-2 mb-3">
                        <p className="text-sm">
                          <span className="font-medium">Action:</span> {rule.action}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {rule.conditions.map((condition, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Settings className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Play className="w-3 h-3 mr-1" />
                          Test
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Create New Automation */}
            <Card>
              <CardHeader>
                <CardTitle>Create New Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Popular Triggers</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Clock className="w-4 h-4 mr-2" />
                        Service Scheduled
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MapPin className="w-4 h-4 mr-2" />
                        Cleaner Nearby
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Service Complete
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Bell className="w-4 h-4 mr-2" />
                        Motion Detected
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Lock className="w-4 h-4 mr-2" />
                        Lock/Unlock Doors
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Control Lighting
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Camera className="w-4 h-4 mr-2" />
                        Start Recording
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Thermometer className="w-4 h-4 mr-2" />
                        Adjust Temperature
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Templates</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Home className="w-4 h-4 mr-2" />
                        Welcome Guest
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        Security Mode
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Zap className="w-4 h-4 mr-2" />
                        Energy Save
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Robot className="w-4 h-4 mr-2" />
                        Service Mode
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security & Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Security Level</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <input 
                          type="radio" 
                          name="security" 
                          value="low"
                          checked={securityLevel === "low"}
                          onChange={(e) => setSecurityLevel(e.target.value)}
                        />
                        <div>
                          <p className="font-medium">Basic</p>
                          <p className="text-sm text-muted-foreground">Standard device access</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input 
                          type="radio" 
                          name="security" 
                          value="medium"
                          checked={securityLevel === "medium"}
                          onChange={(e) => setSecurityLevel(e.target.value)}
                        />
                        <div>
                          <p className="font-medium">Enhanced</p>
                          <p className="text-sm text-muted-foreground">Additional monitoring during service</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input 
                          type="radio" 
                          name="security" 
                          value="high"
                          checked={securityLevel === "high"}
                          onChange={(e) => setSecurityLevel(e.target.value)}
                        />
                        <div>
                          <p className="font-medium">Maximum</p>
                          <p className="text-sm text-muted-foreground">Full surveillance and restricted access</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Privacy Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Share location with cleaners</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Allow remote device access</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Record during service</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Data analytics</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Log */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Security Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Service completed successfully</p>
                        <p className="text-xs text-muted-foreground">Today at 4:30 PM</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Secure</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Door locked automatically</p>
                        <p className="text-xs text-muted-foreground">Today at 4:45 PM</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Automated</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium">Camera went offline briefly</p>
                        <p className="text-xs text-muted-foreground">Yesterday at 2:15 PM</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Resolved</Badge>
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